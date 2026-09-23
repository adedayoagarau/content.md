# 088. Citymapper

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Multimodal transit navigation / urban journey planning (consumer app + `ENTERPRISE` routing data; part of Via since 2023) |
| Primary URL | https://citymapper.com/ |
| Corpus rank | 088 |
| Benchmark strength (source list) | Transit directions and service alerts |
| Locale / market observed | en-GB register, en-US content (NYC/MTA material); pricing quoted in `£` |
| Platform observed | Web marketing site + news/blog. **All app UI is `[documented]` via screenshots and prose in release posts — never `[observed]` as live UI** |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a — no regulated product. One voluntary data-processing disclosure for the AI routing feature (third-party LLM, enumerated data-minimisation claims); GDPR-adjacent but not framed as a legal notice |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 attempted, 12 retrieved |
| Harvest completeness | Partial — **Citymapper publishes no help centre, no FAQ, no support page and no accessibility statement.** The entire content estate is a marketing homepage plus a release-notes blog. `/cities` is client-rendered and empty; `/support` 404s. Everything in T5–T9 is reconstructed from release posts |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://citymapper.com/ | Hero, three cards, news feed. ~20 lines of copy total |
| News index | https://citymapper.com/news | ~75 post titles + standfirsts — the best single source of voice |
| Cities | https://citymapper.com/cities | **BLOCKED — client-rendered, server HTML contains only `<head>`** |
| Support | https://citymapper.com/support | **404 — returns bare `Not Found` as `text/plain`** |
| Making bus rides better | https://citymapper.com/news/2809/making-bus-rides-better | Diversions, live location, live traffic — richest service-state page |
| AI best route | https://citymapper.com/news/2838/citymapper-now-uses-ai-powers-to-help-you-choose-the-best-route | `Best for you` sort, AI privacy disclosure |
| Introducing 'Routing Powers' | https://citymapper.com/news/2296/introducing-routing-powers | The filter taxonomy, with per-filter rationale copy |
| Routing Power – WALK LESS | https://citymapper.com/news/2548/routing-power-walk-less | Single-filter post; shows the reusable activation-sentence shape |
| NYC subway disruptions | https://citymapper.com/i/2254/… → https://medium.com/citymapper/routing-around-nycs-subway-disruptions-in-realtime-fd8862f6f82d | **Redirects off-domain to Medium.** The single most valuable page in this file — a critique of transit-authority alert copy |
| Taking the pain out of the bus | https://citymapper.com/news/2270/taking-the-pain-out-of-taking-the-bus | Crowding, stop closures, stop moves |
| Step-free routes | https://citymapper.com/news/2262/inclusive-navigation-citymappers-step-free-routes | Accessibility routing |
| CLUB features for all | https://citymapper.com/news/2589/citymapper-club-features-are-now-available-to-all | Pricing, subscription, feature roll-up |
| Best Section + train direction | https://citymapper.com/news/2635/best-section-now-includes-train-direction | Platform-level micro-guidance |
| Main Roads walk route | https://citymapper.com/news/2407/pick-main-roads-for-your-walk-route | Safety-by-routing, after-dark framing |
| Citymapper in your Ear | https://citymapper.com/news/2395/citymapper-in-your-ear | Voice instruction design; one verbatim spoken string |

---

## T1 Navigation & IA labels

**Three nav items. That is the entire site IA.** `[observed]`

`Home` · `News` · `Cities` (https://citymapper.com/, repeated as the footer)

There is no product page, no features page, no pricing page, no help, no about, no
contact. The homepage and the blog *are* the estate. This is the defining
structural fact about Citymapper as a content product: the app is the product
surface, and the web exists only to route you into the app store.

**Homepage cards — three audiences, each with the same CTA** `[observed]`

| Card title | Audience |
|---|---|
| `Our Cities` | Consumer |
| `Citymapper for Cities` | Transit agencies (links off-site to ridewithvia.com) |
| `Advertise with Us` | Advertisers |

`Citymapper for Cities` and `Advertise with Us` both end `Tell me more` — first
person, on a button, twice.

**Footer** `[observed]`: `Citymapper` / `Making Cities Usable` / `iPhone` `Android`.
The tagline is used as the footer's only sub-heading, so the brand promise doubles
as navigational furniture.

**In-app IA is `[documented]` only**, named across release posts:
`Lines/Status` (NYC) · `Preferences` · `Report Issue` · `Clubhouse`
(a `citymapper://clubhouse` deep link appears in the CLUB post).

## T2 Value proposition & headline patterns

**Hero is three words with one italicised** `[observed]`

> `Making Cities *Usable*`

Not a benefit, not a task, not a feature — a mission statement, with the emphasis
on the one word that carries the argument. `Usable` is a UX term used as a
consumer promise, which is unusual and works because the alternative
("navigable", "easy") would be weaker.

Immediately below: `Download Our App`, then the social proof
`One of the most loved apps on mobile` with `most loved` hyperlinked to a
testimonials page. Awards rendered as attributed fragments:
`Apps of the Year   5 years in a row` (Apple) and
`Editors' Choice +   Apps of the Year` (Google).

**Post headlines are the pattern library.** Three recurring shapes across the
news index `[observed]`:

| Shape | Examples |
|---|---|
| Gerund + the user's pain | `Taking the 😓 pain out of taking the 🚌 bus` · `Making bus rides better` · `Making Scooters Usable` |
| `Introducing` / `Citymapper now…` | `Introducing 'Routing Powers'` · `Introducing... Citymapper PASS!` · `Citymapper now uses AI powers to help you choose the BEST route!` |
| All-caps feature name after an em-dash | `Routing Power – WALK LESS` · `New Routing Power - TURBO` · `New Routing Power - PRICE` |

`Making X Usable` recurs three times (`Cities`, `Scooters`, and implicitly buses),
so the tagline is being used as a productised headline template rather than a
one-off slogan. That is the most disciplined thing in Citymapper's content.

**Standfirsts carry the argument, headlines carry the tone** `[observed]`

`Bus departure times are now 35% more accurate` · `Minimise your outdoor walk time` ·
`Choose the route to match your mood` · `Helping you navigate the city after dark` ·
`Compare the fare, find the cheapest route.` · `Find the absolute fastest route, right NOW.`

Every standfirst is a verb phrase in the imperative or a flat factual claim. The
playfulness is quarantined in the H1.

**Section headers written as the user's internal monologue** `[observed]`

`Sometimes, the fastest way to get there isn't the best way to get there`
(https://citymapper.com/news/2407/pick-main-roads-for-your-walk-route) —
a thesis sentence as a heading, stating the premise the feature depends on before
naming the feature. Compare `Moving beyond efficiency` and
`We don't all move the same.` on the Routing Powers post.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `iPhone` · `Android` | Hero and footer | **The platform name *is* the button.** No "Download", no "Get the app" |
| `Download Our App` | Hero sub-heading, not a button | Capitalised Title Case; the actual buttons are the two above |
| `Tell me more` | Both B2B homepage cards | First person, user's voice |
| `All News` / `All news` | Homepage / post footer | **Two casings of one label** |
| `Read more` | Every news-index entry | Bare |
| `Prev` `Next` | Post pagination | Abbreviated, no article context |
| `Home` `News` `Cities` | Footer nav | |
| `Report Issue` `[documented]` | In-app | Title Case; named in two separate posts as the feedback route |
| `GO` `[documented]` | In-app | The navigation-start verb, always capitalised |
| `Preferences` `[documented]` | In-app, `top right` | Named in prose as the route to turn AI personalisation off |
| `👍` / `👎` `[documented]` | In-app AI feedback | Emoji as button labels |
| `Step-free` · `Walk Less` · `Main Roads` · `Simple` · `Mixed` `[documented]` | In-app filter chips | See T5 |

**Observation.** There is no "Sign up", no "Learn more", no "Get started"
anywhere on the site. The CTA set is four items wide, because there is only one
conversion (app install) and one micro-conversion (read a post).

## T4 Onboarding & getting-started

**No onboarding content exists on the web.** `[absent]`

What exists instead is a **single reusable activation sentence**, repeated
verbatim in shape across every feature post `[observed]`:

- `Plan a trip and tap on 'Walk Less'` (walk-less post)
- `Plan a journey and tap on 'Walk'` → `Select 'Main Roads' on the map to recalculate your route` (main-roads post)
- `plan a trip and tap "Step-free"` (step-free post)
- `Just tap on the ✨ sparkle to get a dose of the good stuff.` (AI post)
- `Plan a trip to see which Powers are launched in your city.` (Routing Powers post)

Shape: **[plan a trip] + [tap the exact label]**, with the label in quotation
marks. The user is never told what the feature does before being told how to
reach it. This is a defensible choice for an app where the feature is one tap
deep, and it is applied with real consistency — the quotation marks around the
label are doing the work an inline UI chip would do in a help article.

**The one numbered sequence in the harvest** `[observed]`
(https://citymapper.com/news/2395/citymapper-in-your-ear):

> `1️⃣ Plan a trip  2️⃣ Hit GO  3️⃣ Tap the SOUND icon`

Three steps, rendered as a single heading, numbered with keycap emoji rather than
a list. Two verbs are colloquial (`Hit`, `Tap`), one is neutral (`Plan`). The
component is named in caps (`SOUND icon`) to signal it is a literal label.

## T5 Filter & control labels — PRIORITY

Citymapper has no forms. Its equivalent of a form is the **route filter set**,
branded `Routing Powers` `[documented]`
(https://citymapper.com/news/2296/introducing-routing-powers).

**The filter taxonomy, with the rationale copy shipped alongside each**

| Filter label | The rationale copy Citymapper wrote for it |
|---|---|
| `BUS ONLY` | "Buses are your preferred mode, and that's all you want to use." |
| `TRAIN ONLY` | "For people who seek speed, directness, and with a general dislike for getting-stuck-in-traffic." |
| `SIMPLE` | "Focuses on journeys with the fewest transfers involved." |
| `MIXED` | "Combines the best of private and public options into one swift, scintillating transit experience." |
| `STEP-FREE` | "Gives you only journeys with NO stairs." |
| `TURBO` | `Find the absolute fastest route, right NOW.` |
| `PRICE` | `Compare the fare, find the cheapest route.` |
| `WALK LESS` | `Minimise your outdoor walk time` |
| `Main Roads` | Walk-mode sub-filter; "usually a good proxy for being well-lit" |
| `Best for you` | AI-ranked tab, replacing `Classic` |

**This is the transferable artefact.** Every filter is named for the *trip
property the user wants*, not for the algorithm parameter. `SIMPLE` is
"fewest transfers"; `TURBO` is "fastest"; `WALK LESS` is "least outdoor walking".
The engineering name is never surfaced. And critically, each filter ships with a
one-sentence rationale written in the second person — so the label answers
"what does this do" and the rationale answers "is this me".

**`SIMPLE` is the best-named filter in the corpus so far.** The alternative
("Fewest transfers", "Direct") describes the route. `SIMPLE` describes how the
journey will feel, and the rationale line ("Settle into your podcast, no mental
acrobatics, just relax") names the cognitive load the user is actually avoiding.

**Sort-tab rename recorded as content** `[observed]`: the section header
`From 'Classic' to 'Best for you'` announces the old label and the new one in a
single line. Naming the retired label is rare and correct — it lets an existing
user map their old mental model onto the new one.

**Negative finding — casing is not governed.** Launch posts render Powers in
ALL CAPS (`BUS ONLY`, `STEP-FREE`, `WALK LESS`); later posts and screenshots
render the same labels in sentence case (`Step-free`, `Walk Less`, `Mixed routes`,
`Simple routes`). Likewise `Best Section` (post title) vs `'best section'`
(body copy, same article). The label set is stable; its typography is not.

## T6 Status & state language — PRIORITY

All `[documented]`. Citymapper's state vocabulary is about **the vehicle and the
network**, not about an order or a booking — which makes it structurally different
from every other product in this domain.

**Vehicle state**

- `Live bus location` — "Bus locations are updated every minute" (refresh cadence
  disclosed to the user, which is unusual and good)
- Crowding: `See how crowded your bus is` — a computed state, framed as a decision
  input ("so you can make 🧠 smarter decisions on which bus you want to take")
- Traffic: "shows congestion on the map", with travel and arrival times
  recalculated live rather than shown as a static estimate
- Train direction: "The arrow indicates the train's direction of travel when you
  are standing on the platform and facing the track." — a state statement written
  from the user's physical position rather than the map's orientation

**Stop and route state** (https://citymapper.com/news/2270/…)

- `Find out if your stop has been closed 👷🛠️`
- `Or if your stop has been moved temporarily`

Two adjacent states — *closed* and *moved* — that most apps collapse into one
"disrupted" badge. Separating them is correct because the user's next action
differs completely.

**Diversion state — three questions answered in order** `[documented]`
(https://citymapper.com/news/2809/making-bus-rides-better)

> - `The exact path you're on`
> - `Which stops are skipped`
> - `Where the bus rejoins its normal route`

This is the single best piece of disruption microcopy in the file. A diversion is
decomposed into exactly the three facts a stranded passenger needs — where am I,
what did I lose, when does normal service resume — in that order. It is
transferable verbatim to any "your thing has been rerouted" state: current path,
what is skipped, where it rejoins.

**Network state** `[documented]`, NYC: `Lines/Status` is the named in-app section;
Citymapper describes showing "at-a-glance service statuses *and* affected
stations", and a map "highlighting affected parts" and "updating in realtime".
The internal concept is named `State of the City`.

**Navigation state, spoken aloud** `[documented]`
(https://citymapper.com/news/2395/citymapper-in-your-ear) — four voice events for
walking:

`Previews so you know what's coming` · `Turn alerts when it's time to turn` ·
`Automatic rerouting, if you went off-piste` · `Arrival preview & announcement`

and for transit: hear when the bus/train is due → platform and best-carriage info
before entering the station → `Get an alert when it's time to get off!`

One spoken string is quoted verbatim: `"You have arrived at your destination."`
Full sentence, full stop, no personality — the only flat string Citymapper
publishes, and correctly so, because it is the one the user hears hundreds of
times.

## T7 Disruption & issue recovery — PRIORITY

The NYC disruption post is the artefact this corpus exists to find: **a product
publishing a structural critique of another organisation's alert microcopy, and
then shipping a product to translate it.**

**The problem, as Citymapper states it** `[observed]`
(https://medium.com/citymapper/routing-around-nycs-subway-disruptions-in-realtime-fd8862f6f82d)

> "MTA's service changes are complicated, long pieces of text that are hard to
> decipher, especially when you're in a hurry, and only concerned about your
> specific journey."

Two conditions are named — *in a hurry* and *only concerned about your specific
journey* — which is the correct diagnosis. The alert is not too long in the
abstract; it is too long relative to the reader's attention and too broad relative
to the reader's need.

**The failure modes it enumerates**, summarised — this is the reusable checklist:

1. **Inconsistent entity naming.** The same station appears under multiple and
   abbreviated names (`Plz` for Plaza).
2. **Directional synonyms.** Quoting the post: `"Southbound" means "Downtown"` —
   which can also mean Brooklyn-bound, which can also mean Bay Ridge-bound. Four
   words for one axis, mixing compass, colloquial and destination-based framing.
3. **Range grammar.** "between X and Y" used where "from X to Y" is meant.
4. **Redundant verbosity.** "northbound and southbound" where "in both directions"
   is shorter and clearer.
5. **Entity errors.** A named line does not stop at the station the alert says it
   does (Queens Plaza vs Queensboro Plaza).
6. **Typos**, which Citymapper flags by deliberately misspelling the word:
   "they sometimes make sbelleng miztakes."

A worked example is quoted from MTA and then decomposed: an alert beginning
`Due to FDNY activity at 23St` is resolved into "stations between West 4th Street
and 42nd Street Bryant Park are closed" *but* "the rest of the F line is running"
— the *but* clause being the part the raw alert buries.

**Citymapper's stated recovery posture** `[observed]`

> Section header: `Don't worry, just Route`

and, in the body, that rerouting "happens in the background… without you having
to read or decipher anything!"

This is a genuinely contrarian content position and worth stating plainly:
**Citymapper's answer to a badly-written alert is not to rewrite the alert for the
user, but to remove the need to read it.** The rewritten alert (shown in
`Lines/Status`) is the fallback; the primary response is a re-ranked route list.
Compare Trainline, which answers disruption with a long explanatory guide. Both
are defensible; the difference is whether your user is deciding or executing.

**The failure agent is named and personified** `[observed]`: `Gobot`, "Gobot the
robot", "Gobot's got your back", "Gobot is quite busy in NYC". Giving the
disruption-parsing system a name, a gender and a workload is a deliberate choice —
it makes an opaque NLP pipeline something the user can hold an expectation of.

**In-product issue reporting** `[documented]`: `Report Issue` is the named route,
cited in the CLUB post and the step-free post ("we… encourage you to report any
issues through the app to help us improve"). No email, no form, no ticket, no
severity — one label.

## T8 Empty states

`[absent]` for the app. No no-results, no-data or first-run copy is published.

One observed error state, and it is a defect `[observed]`:
https://citymapper.com/support returns a bare `Not Found` served as
`text/plain` — no styled page, no navigation, no search, no suggestion. A user
guessing the obvious support URL hits an unbranded plain-text error. Given that
Citymapper has no support surface at all, this is the most likely URL a stuck user
would try.

## T9 Notifications & system messages

`[documented]` throughout.

- **Voice announcements** are the primary notification channel and are designed
  per mode. The design constraint is stated: "we kept all of our instructions
  super-brief, to not disturb your music or podcast flow." A content rule
  (brevity) justified by a user context (you are already listening to something).
- **Lock Screen Navigation** and Dynamic Island: "track your GO trip and get
  step-by-step guidance without unlocking your iPhone… so you don't miss a thing
  while using other apps." The benefit is framed as *not having to look*, which is
  the same argument as the voice feature — a consistent thesis across two features.
- **Timing is the stated design principle**: "It gives you the info you need,
  exactly when you need it, depending on your travelling speed." Notification
  content varying by the user's *velocity* is a rare and specific commitment.
- **AI feedback prompt**: `Hit the 👍 or 👎 button and leave some feedback` —
  emoji-as-control, plus an explicit invitation to write prose.

## T10 Disclosures, legal & compliance

Citymapper has no legal-notice register. What it has instead is **disclosure
written in the same voice as the feature copy**, which is the interesting finding.

**AI data-handling, disclosed by enumerating what is *not* sent** `[observed]`
(https://citymapper.com/news/2838/…, under the header `Privacy first AI`)

The post states a third-party AI tool generates the insights, names what *is*
sent (journey time, the list of search results, journey attributes), then lists
the exclusions: `No start or end location, no current location, no home or work
address`, and no name, email or device information.

Two things worth stealing. First, the **negative enumeration** — listing the
specific sensitive fields by name is far more convincing than "we don't share
personal data", because the user can check their own worry against the list.
Second, the disclosure sits **inside the feature announcement**, at the point of
excitement, rather than in a linked policy. There is no "Learn more about
privacy" link; the answer is on the page.

**Accuracy claims are bounded by naming the comparator** `[observed]`:
"predictions that are 35% more accurate than official sources", with the method
stated in the same breath ("crunching traffic data from transport agencies and
studying every vehicle's movements"). Compare the vaguer standfirst on the index,
`Bus departure times are now 35% more accurate`, which drops the comparator — the
claim degrades as it moves to the shorter surface.

**Availability is bounded three different ways** `[observed]`:
- `Plan a trip to see which Powers are launched in your city.`
- `We are gradually rolling it out so look out for it in your city soon. 👀`
- `(This feature is only available on Android. iOS folks, should we build it for you, too?)`

The third is the notable one: a platform gap disclosed as a question to the
excluded users. It converts a limitation into a research prompt.

**Pricing and subscription** `[observed]` (https://citymapper.com/news/2589/…)

Header: `Ads keep the app free… but you can remove them for £1.49` — the business
model stated as the headline of its own section, with the trade named explicitly.
Body: "an ad-free Citymapper for only £1.49 a month — a 50% price cut!" and
"The discount applies to all regions and currencies."
Renewal terms for existing subscribers are stated plainly: three free months,
then "your subscription will renew with the reduced pricing. That's it."

`That's it.` as the closing sentence of a subscription-terms paragraph is doing
real work — it signals there is no further condition, which is exactly the
reassurance a renewal disclosure usually withholds.

**Accessibility commitment stated as a pricing decision** `[observed]`:
"step-free routes are always free" — said in the same post that describes
paywalling the other Routing Powers behind `CLUB`. Putting the accessibility
carve-out inside the monetisation announcement, rather than in a separate
accessibility page, is a stronger signal than a statement would be.

**Where a disclosure would normally go, there is a joke** `[observed]`:
the voice-instructions post ends with `* Ear sold separately`. An asterisked
footnote slot used for a gag. Harmless here; recorded because it shows the
register does not flatten for fine print the way Wise's or Trainline's does.

## T11 Help-centre architecture

`[absent]` — and this is the headline finding.

There is no help centre, no knowledge base, no FAQ page, no contact page, no
troubleshooting content, no status page for the app itself. `/support` 404s.
The only support affordances that exist are `Report Issue` inside the app and
"let us know on Twitter".

The **news blog is doing the job a help centre would do**: it is the only place
feature labels, activation steps, availability rules, pricing terms and privacy
handling are written down. It is reverse-chronological, has no search, no
categories, and no way to find "how do I turn on step-free routes" other than
scrolling ~75 posts. Several posts are superseded (the step-free post says
`27 regions`; the CLUB post says `20 regions and counting` and links to the same
article) with no dating and no correction.

For a corpus of content practice this is the negative exemplar: excellent
sentence-level craft with no information architecture underneath it.

## T12 FAQs

`[absent]`. No FAQ block appears on any page inspected.

## T13 Terminology & glossary

| Term | Citymapper's usage | The alternative it rejected |
|---|---|---|
| `Routing Powers` / `Powers` | The filter set, treated as a collectable series ("Uncover them as they launch") | "filters", "preferences", "options" |
| `GO` | Start navigation; also `GO trip`, `GO Trip Stats` | "Start", "Navigate" |
| `Best Section` | Which part of the train to board | "optimal carriage", "best car" |
| `Best for you` | AI-ranked results tab, replacing `Classic` | "Recommended", "Smart" |
| `Gobot` | The named disruption-parsing agent | an unnamed backend |
| `State of the City` | Aggregate realtime network condition | "service status", "network overview" |
| `CLUB` | Subscription tier, always caps; `Clubhouse` is the in-app destination | "Premium", "Plus", "Pro" |
| `Citymapper PASS` | Discontinued transit payment card | |
| `Step-free` | Accessibility routing mode | "wheelchair accessible" — used in *prose* but not as the label |
| `Main Roads` | Well-lit walking preference | "Safe route", "Lit streets" |
| `Walk Less` | Minimise outdoor walking | "Shortest walk", "Covered route" |
| `floating transport` / `floating cycles` | Dockless bikes and scooters | "dockless", "free-floating" |
| `Making Cities Usable` | Tagline, reused as a headline template | |
| `Citymapper Everywhere` | Coverage-expansion campaign name | |
| `ENTERPRISE` | B2B routing offer, always caps | |
| `Busmapper` | The company's own original name, disclosed as a "fun fact" | |

**The `Step-free` / `wheelchair-accessible` split is the most instructive entry.**
The in-app control says `Step-free`; the prose and metadata say
"wheelchair-accessible routes… which also benefit travellers with luggage or
prams." The label describes the *route property* (no stairs) so it reads as
useful to everyone; the surrounding copy names the primary audience and then
widens it. Naming the constraint rather than the user is the reusable move — it
avoids making the control feel like it is not for you.

**`Powers` as a collectable.** "This is just the beginning. Uncover them as they
launch." Framing a filter set as a series to be unlocked is a game mechanic
applied to a settings screen. It works here because the set genuinely grows.

## T14 Voice, tone & accessibility

**Register.** The most distinctive voice in this corpus. First-person plural
throughout, extremely informal, high emoji density, heavy use of pop-culture
pastiche. Sign-offs are affectionate and varied: `Team Citymapper 💚` ·
`Much love,` · `Lots of love,` · `Take care,` · `Always got your back ✌️` ·
`Let us know your thoughts,`.

**Song-lyric parody is a recurring structural device** `[observed]`. The bus post
closes on a Sound of Music pastiche ("These are a few of our favourite things 🎶")
and opens a section with "Your wrist, stop watchin', that bus is comin'!"; the
traffic section is headed `*Thank u, next*`; the Best Section post is built
entirely on a One Direction parody, with the joke landing on the feature name
("end your trip in the best one direction"). This is a real, repeated pattern, not
an accident — headings are written to be sung.

**Other observed voice moves:**
- Direct address with regional colour: `Oi oi friends`
- Self-mockery: `Gee thanks, just built it!` · `This isn't our first bus rodeo.` ·
  `So much wow. How does Gobot do it?`
- Anthropomorphising infrastructure: `Silly bus stops, always jumping around...`
- Deliberate error as illustration: `sbelleng miztakes`
- Aphorism used as a design justification: `The best user interface is NO user interface.`
- Naming the shared frustration before the fix: "We know bus trips suck way too
  often. Delays, detours, skipped stops, moved stops, overcrowded buses, and
  seeing your bus drive away just as you arrive at the stop"

**The tone does flatten — in exactly two places.** The step-free post is written
plainly, with no jokes, no emoji beyond a closing ♿️, and short declarative
sentences. And the one spoken UI string quoted,
`"You have arrived at your destination."`, is entirely neutral. So the register
gradient exists: it is voice-forward in announcements, plain in accessibility
copy, and flat in the strings the user actually hears in the street.

**Feedback-seeking is a tone feature, not a footer link.** Five distinct
invitations across the posts: `Hit the 👍 or 👎 button`, `tap on Report Issue in
the app`, "let us know on Twitter what you want to see next", "let us know which
ones we should build next", "iOS folks, should we build it for you, too?". The
product asks more questions than it answers.

**Accessibility content** `[observed]`

- **No published accessibility statement.** `[absent]`
- Step-free routing is substantively documented: it "prioritize[s] simplicity over
  travel times", "walking times are adjusted for people with reduced mobility",
  routes "avoid stairs or wide gaps", "direct users to the right station entrances
  and exits", and "avoid complicated transfers and wide gaps between trains and
  platforms". Note the **wide gaps** detail — a platform-train interface hazard
  most products never name.
- The multi-benefit framing ("which also benefit travellers with luggage or prams")
  appears only in the page description, not the body.
- `Main Roads` is a personal-safety feature described without ever using the word
  "safety" — "well-lit streets", "after dark", "navigate your city confidently".
  Restrained, and arguably better for it.

**Accessibility defects, recorded honestly**

- **Instructional screenshots carry empty alt throughout.** Every release post is
  built around annotated UI screenshots, and every one observed has empty alt text.
  For posts that function as the product's only documentation, the non-visual
  reader gets the prose and none of the labelled controls.
- One non-empty alt observed on a decorative GIF: `HarryStyles-Tube;` — a filename
  fragment with a stray trailing semicolon, applied to a purely decorative image
  that should have had empty alt. Exactly inverted from correct practice.
- No `Skip to content` link observed on the homepage or on post pages.
- Emoji used as load-bearing content in headings (`1️⃣ Plan a trip 2️⃣ Hit GO
  3️⃣ Tap the SOUND icon`) and as button labels (`👍` / `👎`) — screen readers
  will announce these as their Unicode names, which degrades a numbered sequence
  into "keycap digit one".
- `/cities`, a primary nav destination, serves no server-rendered content.

**Other negative findings**

- `All News` (homepage) vs `All news` (post pages) — two casings, one label
- `Best Section` (title) vs `'best section'` (body, same page)
- Routing Power labels in ALL CAPS in launch posts, sentence case in later posts
- Undated posts: no post inspected carries a visible publication date, and the
  `og:article:published_time` meta is literally `None`. Two posts state different
  step-free coverage figures (`27 regions` and `20 regions and counting`) and link
  to each other, so the reader cannot tell which is current.
- `https://citymapper.com/i/2254/…` silently redirects off-domain to Medium, where
  the content sits behind Medium's sign-in furniture and an unrelated
  recommendation feed. The company's most substantive piece of content design
  thinking is hosted on a third-party platform with a decaying first-party link.

---

## Transferable patterns

1. **Decompose a disruption into three questions, in order.** `The exact path
   you're on` / `Which stops are skipped` / `Where the bus rejoins its normal
   route`. Current state, what was lost, when normal resumes. Transfers to any
   rerouted, degraded or partially-failed process — a delayed payout, a partial
   shipment, a service incident.
2. **Ship a one-sentence rationale with every filter label.** The label answers
   "what does this do"; the rationale answers "is this me". `SIMPLE` →
   "fewest transfers… no mental acrobatics". Costs one line per facet and removes
   almost all filter-label ambiguity.
3. **Name the route property, not the user.** `Step-free` rather than
   "Wheelchair accessible" as the control label, with the audience named in
   surrounding prose. Applies to any accessibility or accommodation control where
   labelling by audience would suppress use.
4. **Disclose by negative enumeration, at the point of excitement.** Listing
   `No start or end location, no current location, no home or work address` inside
   the feature announcement beats "we respect your privacy" behind a policy link.
   Directly applicable to AI-feature disclosures.
5. **Name the retired label when you rename a control.** `From 'Classic' to 'Best
   for you'` lets the existing user re-map. Most products ship the new label and
   let the old one evaporate.
6. **One activation sentence shape, used everywhere.** `Plan a trip and tap
   'X'`, with the label in quotes. Repetition of the *shape* is what makes each
   new feature instantly learnable.
7. **Personify the system that handles the mess.** `Gobot` converts an opaque
   pipeline into something the user can form an expectation about. Condition: only
   works where the system genuinely acts on the user's behalf — do not name a
   system that fails visibly.
8. **Negative lesson: sentence craft does not substitute for IA.** Citymapper
   writes better microcopy than almost anything else in this corpus and has no
   searchable place to put it. The activation instruction for a feature exists
   exactly once, in an undated blog post, findable only by scrolling.

## Caveats & gaps

- **No in-product UI was observed.** Every string in T5, T6, T7, T8 and T9 is
  `[documented]` — quoted or described inside a release post, or read off an
  embedded screenshot's prose description. None is confirmed as the live app
  label. Screenshot *images* were not OCR'd; nothing in this file is derived from
  reading pixels.
- **No help centre, FAQ or support surface exists** to harvest. T11 and T12 are
  genuinely `[absent]`, not unreached.
- **`/cities` is client-rendered and returned no body.** The city-coverage
  vocabulary and any per-city content are unharvested.
- **The web app (citymapper.com/london, /nyc, /nyc/status) was not fetched.**
  Citymapper's NYC post names `citymapper.com/nyc/status` as a live disruption
  surface; that page is the most likely place to observe real service-alert copy
  as live UI, and it is the single highest-value gap in this file.
- **Posts are undated.** Ordering on `/news` implies recency but no post carries a
  visible date. Coverage figures and pricing quoted here may be superseded.
- **Pricing observed only in `£`.** The CLUB post claims the discount applies "to
  all regions and currencies" but no other currency was seen.
- **Medium dependency.** The NYC disruption analysis is a Medium post reached via
  a citymapper.com redirect; its long-term availability is outside Citymapper's
  control, and the Medium wrapper contributed unrelated navigation furniture that
  was excluded from this extraction.
- **App-store listing copy and in-app onboarding not harvested** — outside the
  public web surface.

## Sources

1. https://citymapper.com/
2. https://citymapper.com/news
3. https://citymapper.com/cities (blocked — client-rendered, empty body)
4. https://citymapper.com/support (404, `text/plain`, body `Not Found`)
5. https://citymapper.com/news/2809/making-bus-rides-better
6. https://citymapper.com/news/2838/citymapper-now-uses-ai-powers-to-help-you-choose-the-best-route
7. https://citymapper.com/news/2296/introducing-routing-powers
8. https://citymapper.com/news/2548/routing-power-walk-less
9. https://medium.com/citymapper/routing-around-nycs-subway-disruptions-in-realtime-fd8862f6f82d (reached via https://citymapper.com/i/2254/blog-routing-you-around-nycs-subway-disruptions-in-realtime)
10. https://citymapper.com/news/2270/taking-the-pain-out-of-taking-the-bus
11. https://citymapper.com/news/2262/inclusive-navigation-citymappers-step-free-routes
12. https://citymapper.com/news/2589/citymapper-club-features-are-now-available-to-all
13. https://citymapper.com/news/2635/best-section-now-includes-train-direction
14. https://citymapper.com/news/2407/pick-main-roads-for-your-walk-route
15. https://citymapper.com/news/2395/citymapper-in-your-ear
