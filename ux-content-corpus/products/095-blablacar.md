# 095. BlaBlaCar

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Long-distance carpooling marketplace (peer-to-peer), plus coach and rail resale |
| Primary URL | https://www.blablacar.com/ |
| Corpus rank | 095 |
| Benchmark strength (source list) | Trust and rider coordination |
| Locale / market observed | **en-GB** (`blablacar.co.uk`, GBP) and **fr-FR** (`blablacar.fr`, EUR) for comparison. `blablacar.com` itself is a **country-selector splash only** — 40 locale links, no product. |
| Platform observed | Web (desktop marketing, server-rendered), legal estate (`legal.blablacar.com`). Help centre **not reachable** — JS-only. |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Comuto SA (France) plus named local entities in Brazil, Mexico, Ukraine, Poland. **Payouts via the `Hyperwallet Payment Solution`, whose provider is named as PayPal (Europe) S.à r.l. et Cie, S.C.A.** KYC run by the payment provider and explicitly separated from BlaBlaCar's own checks. EU Digital Services Act (`DSA`) contact points and active-recipient reporting published. Rail passenger-rights information under EU rules. Spanish CAE energy-certificate scheme and French carpooling premium disclosed. |
| Harvest date | 2026-09-21 |
| Pages inspected | 8 reachable (+2 blocked/empty) |
| Harvest completeness | **Partial — help centre blocked.** Marketing FAQ blocks were fully server-rendered and are unusually substantive (multi-paragraph answers). The Terms & Conditions were read in full and are the principal source for T6/T13. Article titles from the help centre are recoverable only via a search index and are marked as such. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Global splash | https://www.blablacar.com/ | Country/currency/language selector only — 40 markets |
| Homepage (UK) | https://www.blablacar.co.uk/ | Search form, `Automatic Ratings` announcement — the T6 core |
| Carpool (UK) | https://www.blablacar.co.uk/carpool | 6-question FAQ with full answers |
| Offer your ride (UK) | https://www.blablacar.co.uk/offer-seats | **Driver-side FAQ — the richest coordination copy in the harvest** |
| Bus (UK) | https://www.blablacar.co.uk/bus | 6-question FAQ; the bus/carpool contrast |
| Homepage (FR) | https://www.blablacar.fr/ | French-origin copy; three modes including `Train` |
| Terms & Conditions (UK) | https://legal.blablacar.com/en-gb/terms-and-conditions/ | Two full T&C versions; ~1,270 lines; read in full — the T13 core |
| About us | https://newsroom.blablacar.com/about-us | Scale figures, three-mode positioning |
| Help Centre | https://support.blablacar.com/hc/en-gb | **BLOCKED** — renders `Loading...` only |
| Carpool route page | https://www.blablacar.co.uk/carpool/routes/london/paris | **EMPTY** — returned no content |

---

## T1 Navigation & IA labels

**The global entry point is a country selector, not a product.** `[observed]` `blablacar.com` renders one heading — `Choose your country and language` — and forty links, each of the form `<Country (CURRENCY)><Language>`: `France (EUR)Français`, `United Kingdom (GBP)English`, `България (EUR)български език`, `ประเทศไทย (THB)ไทย`. Country name in the local language, ISO currency in parentheses, language name in the local language.

No product, no login, no nav. For a marketplace whose supply and demand must both be in the same country, forcing the market choice before anything else is defensible — but it means the brand's canonical URL shows the user nothing about what the brand does except a single line of body text beneath the list.

**Market nav is three items at most, and the third is market-dependent** `[observed]`:

| UK | France |
|---|---|
| `Carpool` · `Bus` | `Covoiturage` · `Bus` · `Train` |

France gets a third mode. The UK does not. The nav is therefore **a live statement of what is available in this market**, not a brand catalogue — and BlaBlaCar does not show the user the modes they cannot have. Compare the super-apps in this cluster, which list everything and disclaim availability in a footnote.

**The two primary actions sit opposite each other in the header** `[observed]`: `Search` and `Offer your ride` (FR: `Rechercher` and `Proposer un trajet`). This is the whole marketplace in two buttons — demand left, supply right, equal weight. Neither is subordinated. For a two-sided peer marketplace where every user is a potential participant on both sides, giving the supply action header-level parity is the correct and unusual call.

**The mode switcher is framed as a question** `[observed]`: `Travel by...` (FR: `Voyagez en...`) opening a list of `Carpool` / `Bus` (/ `Train`). Ellipsis-completion rather than a noun label.

**Footer is four accordion groups, and the fourth carries everything institutional** `[observed]`:
`Compare our ride options` · `Travel with BlaBlaCar Bus` · `Travel with carpool` · `Find out more`

The first three are SEO route lists. `Find out more` holds `Who we are` · `How does BlaBlaCar work?` · `More on BlaBlaCar Bus` · `Help Centre` · `Press` · `We're Hiring!`. The French footer adds three the UK lacks: `Covoiturage du quotidien` (daily commuting, → blablacardaily.com), `Nos bons plans`, `Blog de voyage`.

**The French footer publishes a DSA link the UK does not** `[observed]`: `Transparence des plateformes` [*Platform transparency*] → `legal.blablacar.com/fr-fr/transparency/`. An EU regulatory artefact surfaced as a footer link in the EU market and absent in the UK — the clearest example in this corpus of a footer changing shape because the regulation did.

**Breadcrumbs are two-level and shallow** `[observed]`: `BlaBlaCar › Carpool`, `BlaBlaCar › Book a bus`. Note `Book a bus` in the breadcrumb where the nav says `Bus` — the breadcrumb label is a verb phrase, the nav label a noun.

## T2 Value proposition & headline patterns

**The hero headline names both modes and refuses to choose** `[observed]`

> UK: `Bus and carpool: Travel your way with BlaBlaCar`
> FR: `Bus, train, covoiturage : BlaBlaCar vous emmène où vous voulez.` [*"Bus, train, carpool: BlaBlaCar takes you wherever you want."*]

The English is `<modes>: <benefit>`; the French is `<modes>: <brand> <verb> <benefit>` — the French makes BlaBlaCar the grammatical agent and the English does not. The French also ends in a full stop and the English does not.

**The carpool proposition is stated as a four-word imperative pair** `[observed]`:

> `Share your ride. Cut your costs.`

Two imperatives, two possessives, five words. The causal claim is implicit in the juxtaposition, and it is the cleanest statement of the carpooling value exchange in the harvest. The body beneath makes the mechanism explicit: "Carpool as a driver to turn your empty seats into lower travel costs. It's simple: publish your ride and get passengers to share your fuel and toll expenses." `empty seats` is the product's founding image and it appears again in the company's own origin story.

**The driver-recruitment page uses a three-word triptych** `[observed]`: `Drive. Share. Save.` — three one-word imperatives, each expanded beneath:

- `Drive.` — "Keep your plans! Hit the road just as you anticipated and make the most of your vehicle's empty seats."
- `Share.` — "Travel with good company. Share a memorable ride with travellers from all walks of life."
- `Save.` — "Tolls, petrol, electricity… Easily divvy up all the costs with other passengers."

`Keep your plans!` is the load-bearing line. It pre-empts the objection that carpooling means accommodating strangers: the driver's route, time and intentions are unchanged. This is a **precondition-preserving promise** and it is exactly right for a supply side that fears loss of control. `divvy up` is the most colloquial verb on the estate. `electricity` sits in the cost list alongside petrol and tolls — the list has been updated for EVs.

**The French equivalent leads with a number, not a verb** `[observed]`:

> `Récupérez 90 € par trajet` [*"Get back €90 per trip"*]
> "Vous avez une voiture ? Faites la travailler pour vous (et pas l'inverse). Récupérez jusqu'à 90 € en covoiturant sur un trajet de 300 km avec 3 passagers."
> [*"You have a car? Make it work for you (and not the other way round). Get back up to €90 by carpooling a 300 km trip with 3 passengers."*]

The headline says `90 €`; the body says `jusqu'à 90 €` [*up to €90*] and **states the three assumptions behind the figure** — 300 km, 3 passengers, one trip. Claim, then bound, then show the working, in two sentences. The UK page has no equivalent figure anywhere.

`Faites la travailler pour vous (et pas l'inverse)` [*Make it work for you, not the other way round*] is a reframe of car ownership as a liability, delivered in a parenthesis. The UK copy never makes this argument.

**The three homepage benefit blocks are the trust argument** `[observed]`:

- `Travel everywhere` — "Explore the world your way, with a huge choice of buses and countless carpool rides."
- `Your pick of rides at low prices` — "No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices."
- `Trust who you travel with` — "We take the time to get to know each of our members and bus partners. We check reviews, profiles and IDs, so you know who you're travelling with and can book your ride at ease on our secure platform."

`Trust who you travel with` is an **imperative-mood trust claim** — it tells the user to trust, then immediately supplies the three warrants (`reviews, profiles and IDs`). Note `We take the time to get to know each of our members` — a first-person-plural claim of individual attention that the Terms flatly contradict (verification is optional, and the Terms disclaim the truth of anything verified — see T10). That gap between marketing warmth and legal hedge is the central tension in peer-marketplace trust copy and it is fully visible here.

The carpool page's variant is tighter and drops the overclaim: "We check reviews, profiles and IDs, so you know who you're travelling with; and our app is both simple and secure thanks to powerful technology."

**Testimonials are used as the trust device in place of statistics** `[observed]`, attributed to first names and tenure:

> "5 years of using BlaBlaCar, dozens of journeys, as many meetings and exchanges, not a single disappointment. THANK YOU!" — *Simon*
> "The benefit is always mutual, it only takes one passenger to turn a simple ride into an unexpected journey." — *Valérie*
> "More than 400€ paid into my account thanks to BlaBlaCar, even though I've only been using it for a few months..." — *Daniel*

Three French first names on the UK site, with `400€` in a French-style currency position on a GBP page. The testimonials have been carried across from the French estate untranslated in form.

**The `Only on BlaBlaCar...` block is a named content slot for serendipity** `[observed]`:

> UK: "Perfect for me because I enjoy carpool AND bus! Carpool to meet new people and make the trip go faster. And BlaBlaCar Bus has good prices, so you feel happy when you travel." — *Anna, BlaBlaCar member since 2019*
> FR: `Ça n'arrive qu'en BlaBlaCar...` — "…Énorme surprise quand je tombe sur ma sœur que je n'avais pas vu depuis des mois dans le même covoit' : elle venait aussi pour l'anniversaire !" — *Lola de Clermont-Ferrand*

The French entry is a genuine story (running into her sister in the same carpool); the English is a preference statement. Same slot, same heading, two completely different content types — the French fills it with narrative, the UK with a review. The French also uses `covoit'` — the clipped colloquial form of *covoiturage* — inside a customer quote, which is a register the English has no equivalent for.

**Corporate positioning** `[observed]`: `Make everywhere possible for everyone` (mission) and "BlaBlaCar is the world's leading community-based travel app enabling 40 million active members a year to share a ride in 41 countries." The operative term is `community-based` — used in the global splash line too ("the world's leading community-based travel network"). BlaBlaCar positions on *who the counterparty is*, not on price or speed.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Search` / `Rechercher` | Header, both search forms | |
| `Offer your ride` / `Proposer un trajet` | Header, hero | The supply CTA at header level |
| `Share your ride` | Homepage carpool block | **Second label for the same destination** (`/offer-seats/departure`) |
| `Publish a ride` | Offer-seats page ×2 | **Third label for the same action** |
| `Publier vos trajets` | FR homepage | [*Publish your trips*] — plural |
| `Get going` | Automatic Ratings block | Vague; links to `/carpool` |
| `Discover more about bus` / `Discover more about carpool` | Mode cards | Fully specific |
| `En savoir plus sur le covoiturage` / `…sur le bus` / `…sur le train` | FR mode cards | |
| `Show stays` / `Afficher les hébergements` | Search form | An accommodation cross-sell inside the search widget |
| `Read more` | Every FAQ answer | Routes to the blocked help centre |
| `Read our Help Centre` | Carpool, Bus FAQ foot | Unusual construction — one *reads* a help centre |
| `See more answers` | Offer-seats FAQ foot | |
| `Find out more on BlaBlaCar Bus` | Bus page | |
| `Find a ticket sales point` | Bus page | |
| `Book your cross-border ride` | Bus page | |
| `Réservez votre train` / `Réservez votre trajet` | FR homepage | |
| `Log in` / `Sign up` (FR: `Connexion` / `Inscription`) | User menu | |
| `Discover our destinations` | Bus page | |
| `More carpool rides` | Carpool page | |

**The finding:** three labels — `Offer your ride`, `Share your ride`, `Publish a ride` — resolve to one destination (`/offer-seats/departure`) across two pages, and a fourth (`Publier vos trajets`) exists in French. The supply-side CTA is the single most important control on the site and it has no governed label.

`Read our Help Centre` is an odd construction that treats the help centre as a document. `Get going` is the one bare CTA on the estate, and it sits under the Automatic Ratings announcement — a trust-policy change followed by a vague call to action.

## T4 Onboarding & getting-started

**The driver onboarding is three steps, and each one is doing trust work rather than task work** `[observed]`:

1. `Create a BlaBlaCar account` — "Add your profile picture, a few words about you and your phone number to increase trust between members."
2. `Publish your ride` — "Indicate departure and arrival points, the date of the ride and check our recommended price to increase your chances of getting your first passengers and ratings."
3. `Accept booking requests` — "Review passenger profiles and accept their requests to ride with you. That's how easy it is to start saving on travel costs!"

**Every step states a trust consequence, not a completion state.** Step 1's profile fields exist "to increase trust between members" — the reason given for filling in a field is what it does to a stranger's confidence, not what it unlocks. Step 2's recommended price is justified by "your chances of getting your first passengers **and ratings**" — the reputational payoff is named alongside the commercial one. Step 3 is `Review passenger profiles` before `accept` — the sequence puts scrutiny before commitment.

This is the structural difference between a peer marketplace and a professional one, visible in three sentences. A Bolt or Careem driver onboarding names documents and compliance; a BlaBlaCar driver onboarding names the impression they will make on a stranger who has to decide whether to get into their car.

**The passenger-side booking onboarding is embedded in an FAQ answer** `[documented]`:

> "Simply search for your destination, choose the date you want to travel and pick the carpool that suits you best! **Some rides can be booked instantly, while other rides require manual approval from the driver.** Either way, booking a carpool ride is fast, simple and easy."

The bolded sentence is the one that matters: it names **two booking modes with different latencies** before the user encounters the difference. `manual approval from the driver` is the coordination reality of a peer marketplace stated plainly — your booking may not be a booking yet.

**Publishing onboarding, also in an FAQ answer** `[documented]`, names seven inputs in one sentence: "Indicate your departure and arrival points, the date and time of your departure, how many passengers you can take and the price per seat. You'll also need to choose how you want to accept bookings (either automatically or manually), and you have the option of adding any important details you think your passengers should know about. Then tap 'Publish ride' and you're done!"

Two things. The approval-mode choice is presented as a **publishing decision**, not a settings preference — it is part of creating the listing. And the free-text field is described as "any important details you think your passengers should know about" — an open slot for coordination information (see T13: this is where luggage, smoking and detour preferences actually live, because the Terms define none of them).

The literal button label is quoted: `'Publish ride'`.

**Support framing during onboarding** `[observed]` — three cards under `We're here every step of the way`:

- `At your service 24/7` — "Our team is at your disposal to answer any questions by email or social media. **You can also have a live chat directly with experienced members.**"
- `BlaBlaCar at your side` — "For just 2 €, benefit from the reimbursement of up to 1,500€ of your excess when you publish a ride as a driver on BlaBlaCar."
- `100% secure information` — "Our team is dedicated to the protection of your data, which is always 100% confidential thanks to monitoring tools, secure navigation and encrypted data."

The first card's second sentence is the notable one: **peer-to-peer support is offered as a first-class channel** — "live chat directly with experienced members". The community is presented as part of the support estate. The second card prices an insurance excess product in **euros on a GBP page** (`2 €`, `1,500€`), with two different symbol positions in one sentence.

## T5 Form & field labels

**The search form is the one public form surface, and its labels are terse** `[observed]`:

| UK | FR | Notes |
|---|---|---|
| `From` / placeholder `City, station, place` | `De` / `Ville, gare, lieu` | Three place-types in the placeholder |
| `To` / `City, station, place` | `Vers` / `Ville, gare, lieu` | |
| `Departure` / default `Today` | `Départ` / `Aujourd'hui` | Default value is a word, not a date |
| `Return` / `Date` | `Retour` / `Date` | Optional leg; placeholder is the field type |
| `Passengers` / `1 passenger` | `Passagers` / `1 passager` | Value-as-placeholder |
| `Show stays` | `Afficher les hébergements` | Accommodation toggle |

The placeholder `City, station, place` is doing real work — it tells the user the field accepts three granularities, which in carpooling matters because meeting points are often neither a city nor a station.

**The French passenger field is more specific than the English** `[observed]`: `1 Adulte (27 à 59 ans)` [*1 Adult (27 to 59 years)*] on the main search form, against `1 passenger` in English. France has age-banded fares (rail integration) and the field label has absorbed the band. The same French page's secondary form reverts to `1 passager` — **two passenger-field labels on one page**.

**The offer-a-ride form has its own label set** `[observed]`: `Leaving from...` / `Going to...` / `Passengers` / `Publish a ride`, with a control labelled `Switch point of origin and destination`. That control label is a full descriptive phrase rather than an icon name — good accessible-name practice, and notable because almost nothing else on the estate does it.

The offer form's placeholders are pre-populated with example values in the served markup (`Leaving fromLeaving from...London`, `Going toGoing to...Manchester`), so label, placeholder and value are all concatenated.

**Field labels named in Terms rather than observed** `[documented]`: `Account`, `Cost Contribution`, `Price`, `Seat`, `Booking`, `Advert`. The Terms also quote six literal UI strings: `"Continue with Facebook"`, `"Continue with an email address"`, `"Continue with Apple"`, `"Confirm and Pay"`, `"Account closure"`, `"Help"` → `"Contact"`. The superseded Terms quote the older forms — `"Login with Facebook"`, `"Register with an email address"` — so **the T&C document preserves a before-and-after of the signup screen's copy**. A legal document as an inadvertent UI-string archive.

`"Confirm and Pay"` is the commit label: two verbs, the second one naming the irreversible half.

## T6 Status & state language — PRIORITY

BlaBlaCar's state model is richer than a professional ride-hailing app's because **both parties can fail**, and the Terms define the consequences of each failure precisely.

### The ratings state machine

**`Automatic Ratings` — announced on the homepage as a live change** `[observed]`, and it is the single most content-designed feature in the harvest:

> `Automatic Ratings. More reliable rides.`
> "We're launching Automatic Ratings to make profiles fairer and more accurate. If no feedback is left after 14 days, smooth rides get 5 stars to reward great members. Late cancellations or no-shows will get 1 star, **except for the first time**. This keeps profiles accurate so you can book with more confidence!"

Four rules in fifty words: a timer (14 days), a default-positive (5 stars), a default-negative (1 star), and **a first-offence amnesty**. The amnesty clause — `except for the first time` — is the striking one. A trust system that forgives once, in public, in the announcement copy, is telling users something about how it intends to be used: the ratings are a behavioural signal, not a punishment ledger.

The Terms confirm and extend this `[documented]`: ratings are **double-blind**, visible only after both parties rate or 14 days after the first rating, whichever is sooner. Only counterparties may rate (`Passenger`→`Driver` or `Driver`→`Passenger`); passenger-to-passenger rating is not permitted. Every rating, manual or automatic, carries a **right of reply**, and the reply appears on the profile beside it.

**The suspension threshold is published** `[documented]`, Article 4.3.3: a Member with **three or more ratings** whose average, or any single rating, is **3 or below** may face account suspension, access limitation or termination. A numeric reputational cliff, stated in the public Terms.

**Terminology migration observed inside the document** `[documented]`: the superseded Terms (in force until 15 June 2026) say `review` and `review system`; the current Terms say `rating` and `rating system`. The word changed with the feature. `review` implies prose; `rating` implies a score — and the move to automatic star assignment makes `rating` the accurate noun. A clean example of terminology following a product change rather than lagging it.

### The cancellation and refund state machine

**Four passenger-cancellation tiers, each with a different money outcome** `[documented]`, Article 7.1.2:

| When the Passenger cancels | Passenger gets back | Driver gets |
|---|---|---|
| More than 24h before departure | Cost Contribution + Additional Payment; **Service Fees retained by BlaBlaCar** | nothing |
| ≤24h before, and >30 min after Booking Confirmation | **Half** the Cost Contribution | 50% + Additional Payment |
| ≤24h before, and ≤30 min after Booking Confirmation | Full Cost Contribution + Additional Payment | nothing |
| After the departure time | nothing | full compensation |

The third row is the one to note: a **30-minute cooling-off window after booking**, which overrides the 24-hour proximity rule. A passenger who books a ride leaving in two hours and cancels within thirty minutes is made whole. That is a mistake-correction state, deliberately carved out of a penalty schedule, and it is the kind of rule that a content designer should ensure is *visible at the point of booking* rather than only in the Terms.

**Driver cancellation has two branches** `[documented]`, Article 7.1.1, keyed on payment method: if the Cost Contribution is paid on board, the Service Fee is refunded within 24 hours **"only if the Passenger does not manage to book a new Trip within these 24 hours"**; if paid online, "full and automatic refund" of both.

The conditional on the first branch is unusual — the platform keeps its fee if the passenger successfully rebooks, on the reasoning that the service was ultimately delivered. Whether a passenger would find that reasonable is a separate question; it is at least stated.

**Cancelled seats return to market automatically** `[documented]`: released seats go back on sale. And BlaBlaCar reserves judgement on refund requests "at its sole discretion."

**The driver-facing cancellation answer is the best unhappy-path copy on the estate** `[observed]`, from the Offer-your-ride FAQ:

> Q: `How do I cancel a carpool ride as a driver of a ride?`
> A: "It only takes a minute to cancel a listed ride. However, if a driver cannot fulfill a ride that has been already booked, **it is their responsibility to cancel in a timely manner to allow the passenger time to adjust their plans**. Before cancelling we advise drivers to let passengers know by message that they cannot travel anymore."
> [five UI steps: `Your Rides` → select ride → `Your publication` → `Cancel your ride` → confirm]
> "If the ride was already booked, we'll let the passengers know by SMS/email about the cancellation and they will be automatically refunded."
> **Cancellation penalties**: "Drivers won't be penalised for cancelling, but when drivers cancel regularly and/or at the last minute, we can suspend them from offering rides to keep BlaBlaCar reliable."

Five moves in one answer, in order: ease ("only takes a minute"), **obligation to the counterparty** ("it is their responsibility… to allow the passenger time to adjust their plans"), a social recommendation that exceeds the system requirement ("let passengers know by message"), the mechanical steps, what the platform will do on the driver's behalf, and finally the consequence — with the reason attached ("to keep BlaBlaCar reliable").

`Drivers won't be penalised for cancelling, but…` is the sentence to steal. It separates **the single act** (no penalty) from **the pattern** (suspension), which is the only honest way to write a policy that is enforced statistically. Most platforms write either "you may be penalised" (chilling, and untrue for one-offs) or nothing (and then suspend without warning).

**Named UI states quoted in the driver answers** `[observed]`: `Your Rides`, `Your publication`, `Cancel your ride`, `Awaiting transfers`, `Transfer history`.

### The payout state machine

**`When do I get my money?`** `[observed]` — the answer is the clearest money-timing copy in the TRAV cluster:

> "We send your money 48 hours after the ride **if you travelled as planned**. You'll get your money 1 to 5 weekdays (not counting weekends and holidays) after we send it.
> **If you don't see any money in Awaiting transfers, it's because we already sent it.** You can check out what we've sent in your Transfer history."

Three things. The condition `if you travelled as planned` bounds the whole promise in four words. The two-stage timing is separated explicitly — *we send* at 48 hours, *you receive* 1–5 weekdays later — with the weekend carve-out spelled out, so the user can locate which half of the pipeline their money is in. And the second paragraph is **an empty-state explanation written into a help answer**: the absence of a row in `Awaiting transfers` is not an error, and the copy says so and then routes to where the record actually is.

That third move is rare and valuable. It is `[observed]` public copy that does the job of an in-product empty state.

### Trip and lifecycle states named in the Terms

`[documented]`: `Advert` (and `Carpooling Advert` / `Bus Advert` / `Train Advert`) · `Booking` · `Booking Confirmation` · `Booking request` · `Leg` · `Trip` · `Order` · `Seat` · `Ticket` · `Account` · `Member Content` · `Messages` · `Additional Payment`

**`Leg`** is defined as a section of a Carpooling Trip between intermediate cities — the multi-stop model. Stopover cities can be declared at publication, and legs are priced independently by **departure-city country**, which the Terms illustrate with a worked example: a London→Paris ride with a Calais stopover prices London→Paris and London→Calais in British pricing and Calais→Paris in French pricing. A pricing rule explained by example rather than by formula.

**`Booking Confirmation` is the state at which phone numbers are exchanged** `[documented]` — and only with the Member's consent. The identity-disclosure moment is bound to a named state.

### No-show

**Never called a "no-show" in BlaBlaCar's own copy.** `[documented]` The Terms describe it functionally and asymmetrically:

- Driver side: failing to turn up at the meeting point **15 minutes** after the agreed time (20 in Italy; 30 in Mexico, Serbia, Turkey, India) counts as a **Driver cancellation** — i.e. the no-show is reclassified as a cancellation and inherits the refund rules.
- Passenger side: failing to turn up within **15 minutes** means no refund and the Driver is compensated in full.
- Ratings side: "if a Member reports that the other Member did not show up after a trip, a negative rating (1/5) may be automatically published."

The word `no-show` appears only in the homepage Automatic Ratings announcement. So the **marketing surface uses the plain-English term and the legal surface avoids it**, describing the behaviour instead. Reclassifying a driver no-show as a cancellation is a neat piece of state design: it means there is one refund machine, not two.

**The 15/20/30-minute wait rule is restated three separate times in the Terms** (Articles 7.1.1, 8.2, 8.3.1) with the identical country list. A coordination rule that both parties need, repeated at each party's obligations section rather than cross-referenced. Deliberate redundancy in a legal document, and correct.

## T7 Error, failure & recovery — PRIORITY

**The error-correction answer is short and it is a decision tree** `[observed]`:

> Q: `What should I do if there's an error with my ride?`
> A: "You should edit your ride as soon as you spot the error.
> If you can't edit your ride because passengers have already booked, contact them explaining the mistake. If the changes don't suit them, you should cancel your ride and publish a new one."

Three sentences, three states. **Unbooked** → edit. **Booked** → contact the humans and explain. **Booked and they object** → cancel and republish. The middle branch is the peer-marketplace-specific one: the recovery action is *a conversation with a stranger*, and the copy names it as the step rather than routing to support.

`contact them explaining the mistake` — the user is instructed to admit fault to their counterparty. No platform-mediated correction flow, no apology template, no compensation. In a professional marketplace this branch would be handled by ops; here it is handed to the user, and the copy is honest that it will be awkward.

**The driver-cancellation answer** (quoted in full in T6) is the other major recovery artefact, and its structure — *ease, obligation, courtesy, steps, what we do, consequence* — is the reusable one.

**Help-centre article titles are recoverable only via a search index, not from the page.** `[documented — via search index, not observed on-page]` The help centre renders `Loading...` and nothing else. The following titles were returned by a web search of `support.blablacar.com` and are recorded with that provenance caveat:

- `How do I cancel a passenger's booking?`
- `How do I cancel a passenger's carpool booking?`
- `How do I cancel my carpool booking?` (indexed under two titles: also `How a passenger cancels a carpool booking`)
- `Carpool Cancellation Policy`
- `Carpool cancellation and refund policy`
- `Cancelling a carpool booking request`
- `Cancelling a booking request`
- `If a carpool driver cancels or doesn't show up`

Two observations even at this remove. **`If a carpool driver cancels or doesn't show up`** is a conditional-title article — the trigger is in the title, and it bundles the two failures the passenger cannot distinguish in the moment. And the same article appears under **two different titles in two different locales** (`How do I cancel my carpool booking?` on `en-gb`, `How a passenger cancels a carpool booking` on another index entry), alongside a parallel `en-in` variant and a Salesforce-style `/s/article/` URL pattern running beside the Zendesk-style `/hc/` pattern. **The help estate appears to be mid-migration across two platforms with divergent titles.**

**`Cancelling a carpool booking request` versus `How do I cancel my carpool booking?`** is the distinction that matters: a *request* (not yet accepted) and a *booking* (accepted) are separate objects with separate cancellation paths and separate money consequences. Two articles, because they are two states.

**Failure content that is conspicuously absent.** `[absent]` The Terms were read in full, and the following have **no coverage anywhere in the harvest**:

- **Smoking.** The string does not appear in the Terms at all. No smoking preference, no smoking rule.
- **Luggage, for carpooling.** The only mention of luggage in the entire Terms is `Procedures for recovering lost luggage` in the rail-passenger-rights list, which defers to the rail operator. There is **no carpool luggage policy, no bag-size rule, no boot-space concept**. (The Bus page, by contrast, is explicit: `3 suitcases included` — "Each passenger can bring two carry-on bags and one checked bag for free.")
- **Levels of experience.** No `Ambassador`, no `Expert`, no tenure ladder. The word `level` does not occur in the Terms. The only reputational mechanic is the rating.
- **A `Ladies Only` or women-only option.** The string does not appear.
- **Pets** appear only as prohibitions — booking a Seat "for the transport of an object, package, an animal travelling alone" is barred, and a Passenger must not bring "any object, goods, substance, animal of a nature to disturb the driving and the concentration of the Driver." There is no pets-allowed preference.

This is a significant finding for a product benchmarked on rider coordination. **The famous BlaBlaCar preference system — the smoking, music, chat and pet toggles the brand is known for — is not in the Terms, not in the FAQ, and not on any public marketing page.** It lives either in the app or in the blocked help centre. What the public surfaces do provide is the *container* for it: the publish flow's "any important details you think your passengers should know about" free-text field.

So the coordination model as publicly documented is: **structured rules for money and time; free text for everything about the ride itself.**

**Detours are the one in-ride negotiation that is formalised** `[documented]`, Article 4.4 `Negotiation by Message (if available)`. A Passenger may offer an `Additional Payment` via Messages "to share the costs induced by the special request solicited by the Passenger and accepted by the Driver, **such as a detour**." No Service Fee is taken on it, and BlaBlaCar caps the amount to preserve the non-professional character of the activity. Accepting an Additional Payment "may have the effect of reducing the number of seats offered on the same Trip."

That last clause is the good bit: a detour consumes route capacity, and the system reflects it by taking seats off sale. The commercial and the physical are linked.

## T8 Empty states

`[observed]` — one, and it is unusually well handled, though it appears as help-answer prose rather than in-product copy:

> "If you don't see any money in **Awaiting transfers**, it's because we already sent it. You can check out what we've sent in your **Transfer history**."

An empty state explained *before* the user encounters it, with the reassurance and the redirect in one sentence. The named states (`Awaiting transfers`, `Transfer history`) are the two halves of the payout model, and the copy uses the absence in one as evidence of presence in the other.

All in-product empty states are behind auth. `[absent]`

## T9 Notifications & system messages

`[documented]`:

- **Cancellation notification channel is named**: "we'll let the passengers know by SMS/email about the cancellation and they will be automatically refunded." Two channels, and the refund is stated as automatic in the same breath — the user is told what they will receive *and* what they need not do.
- The Terms confirm the same: passengers "will be notified by SMS/email".
- **Messages are algorithmically scanned** `[documented]`, Article 4.3.2: BlaBlaCar may "with the help of automated software and algorithms, detect the content of Messages" for fraud prevention, service improvement, customer support and contract enforcement, with three stated consequences — content not published, a warning to the sender, or account suspension. The scanning is disclosed with its purposes and its outcomes enumerated. Most platforms disclose the first and not the second.
- **Messages are purpose-bounded**: "solely intended to share information about Carpooling Trips", and Members must not contact one another "for any purpose other than to define the modalities of the carpooling". `modalities of the carpooling` is the Terms' term for the whole coordination conversation.
- **Anti-disintermediation** `[documented]`, Article 8.1: no swapping contact details to book off-platform and avoid Service Fees. The rule that makes the messaging constraint enforceable.
- `rate alerts` — (Careem, not BlaBlaCar).

## T10 Disclosures, legal & compliance

**The payout provider is named, and it is PayPal** `[documented]`. Article 2 defines the `Hyperwallet Payment Solution` and names the `Hyperwallet Payment Solution Provider` as **PayPal (Europe) S.à r.l. et Cie, S.C.A.** Article 5.4.1.2 splits the provider's `Know Your Customer (KYC)` checks from BlaBlaCar's own verification, explicitly: the KYC is "distinct from and independent of the verifications which BlaBlaCar may carry out", and failure to supply documents to the provider blocks payout of the Cost Contribution — not the ride.

Two disclosures worth the corpus owner's attention. The **separation of the platform's identity checks from the payment provider's** is stated rather than blurred, which pre-empts the common user assumption that one verification covers everything. And **the EU payment-services exclusions in the Hyperwallet terms are disclaimed as inapplicable "to Members of the Platform due to their non-professional status"** — the user's amateur status is load-bearing in payments law and the Terms say so.

**The verification disclaimer is the most important sentence in the trust estate** `[documented]`, Article 3.3:

> "verified" means only that "a Member has successfully completed the verification procedure", and BlaBlaCar "does not guarantee the truthfulness, reliability or validity of the information that has been the subject of the verification procedure."

Set this against the homepage: "We take the time to get to know each of our members… We check reviews, profiles and IDs, so you know who you're travelling with." The marketing says *you know who you're travelling with*; the Terms say *we do not guarantee the validity of what we verified*. That gap is the defining content-design problem of a peer marketplace, and BlaBlaCar has resolved it by putting warmth on the marketing surface and the disclaimer in the Terms.

Worth flagging as a **negative example**, not a pattern to copy: the Wise approach — claim, then bound the claim in the same place — would put a qualifier next to the badge.

**Document production is a peer obligation, not just a platform one** `[documented]`, Article 8.2/8.3.1: a Driver must supply, **to BlaBlaCar or to any Passenger who asks**, their driving licence, vehicle registration, insurance certificate and technical inspection certificate ("for example, the MoT Certificate in England"). A Passenger must likewise supply their identity card **to any Driver who asks**.

Mutual, peer-to-peer document rights. Neither party is a professional, so neither is presumed verified, and both carry a disclosure duty to the other. No professional ride-hailing platform has this clause because it does not need it. It is the clearest structural artefact of the counterparty-is-another-user problem.

**Non-professional status is enforced, with named triggers** `[documented]`, Article 6:

- Drivers must not ask more than costs actually borne and must bear their own share
- "you are a consumer and are not acting in a professional capacity" is a publication condition
- Drivers are "solely responsible for calculating the costs you bear", by reference to "the applicable fixed kilometric tax scale"
- **Vehicle-class trigger**: suspension where a Driver uses "a professional vehicle of the VTC or taxi type, a company or service car and thereby generate a benefit"
- **Pattern trigger**: suspension where "the nature of the trips offered, their frequency, the number of Passengers transported or the amount of the Cost Contribution requested" suggests profit
- Misrepresentation warning: presenting as a consumer while acting professionally risks sanctions "plus risks of reclassification of the operation"

Two independent detection axes — what you drive, and how you behave — with the enforcement consequence stated for each.

**The price recommendation is disclosed with its purpose and its unit** `[observed]`:

> "We recommend a contribution per passenger on your rides. These suggestions help you set fair contributions for your rides (those most likely to get your seats filled!), but can still be adjusted within a margin of our recommendation.
> **We help you with the price to make it easy to share your costs, but also to prevent people from profiting from carpooling.**
> The amount you see is calculated based on what will help you save the most on your travel costs (fuel, wear and tear, etc.) for a given ride. It's also specific to how far you're going, with a set amount for each mile you're travelling (**£0.11 / mile per passenger**)."

The bolded middle sentence states the **second, unflattering purpose of the price cap** — preventing profit — alongside the helpful one, to the very users being capped. Naming the constraint's real reason to the constrained party is unusual and it is the more credible for it. And `£0.11 / mile per passenger` is a publishable, checkable unit rate; the user can verify the recommendation themselves.

The cross-border pricing rule follows, with the London–Calais–Paris worked example (T6).

**Bus disclosures are professional-carrier disclosures and read completely differently** `[observed]`: "All bus tickets are exchangeable and refundable free of charge up to 30 days before departure" · `3 suitcases included` — "Each passenger can bring two carry-on bags and one checked bag for free" · seat assignment with a paid-choice option on some lines · "you can cancel your bus booking within the timeframe specified in the terms and conditions of the bus company".

The contrast is the point. Bus: fixed allowances, a single cancellation window, deferral to the operator. Carpool: a negotiated contribution, a four-tier refund schedule, mutual obligations, and no luggage rule at all. **One brand, two completely different disclosure regimes, because one side is a regulated carrier and the other is a stranger with a spare seat.**

**Jurisdictional variance is pervasive and visible** `[documented]`: dozens of Terms clauses gated by `(if available)`, `(if applicable)`, `(Only applicable in France)`, `(Only applicable in the European Union)`, `(Only applicable in India / Turkey / Ukraine / Brazil / Mexico / Poland / Germany)`, `(Only applicable for Carpooling Trips in Spain)`. Article 1 carries a boxed note that features "may vary depending on the country or the Platform that you use."

Specific variance constants worth recording: the wait rule (15/20/30 min by country); the minor-travelling-alone age floor (13 default, 16 Italy and Brazil, 18 Ukraine); the unclaimed-funds limitation period (3 years Germany; 5 France, Netherlands, Spain; 6 UK; 10 Belgium, Italy; 20 Portugal).

**Payment methods enumerated and market-specific** `[documented]`: `Credit card, PayPal, Voucher, Apple Pay, Google Pay, iDEAL, Oxxo, Kuponi, Blik, Pix, UPI` — eleven, including four national instruments (Oxxo, Blik, Pix, UPI). The superseded Terms list five. The list grew by six in one revision.

**DSA compliance published** `[documented]`, Article 18: average monthly active recipients in the EU, and contact points for authorities. Plus two help pages named in the Terms — `"How to report illegal content"` and `"How to contest a content removal or an account suspension"` — the notice-and-action and appeal routes, named as user-facing documents.

**Two green-subsidy schemes disclosed with conditions** `[documented]`: `BlaBlaBono Energético` (Spain, Energy Saving Certificates / CAE) and a `Carpooling premium in France`, each with dated eligibility windows, reward values and — for Spain — a requirement that both parties "activate geolocation on the mobile application and declare the pick-up and drop-off points". A subsidy that makes the meeting point a compliance artefact.

**The Terms publish both the current and the superseded version on one page** `[documented]` — "Terms and Conditions in force from June 15th 2026" followed by "Terms and Conditions in force until June 15th 2026". Version transparency by concatenation. It is genuinely useful (the `review`→`rating` migration is only visible because of it) and it is also why the page runs to ~1,270 lines, with the older version truncated mid-sentence at the end.

## T11 Help-centre architecture

`[absent]` — **blocked**. `support.blablacar.com/hc/en-gb`, a category URL, an article URL and an `/collections/` URL all return a page whose entire body is `Loading...`.

What is recoverable from link structure and search indexing:

- **At least two help platforms are live simultaneously**: a Zendesk-pattern estate (`/hc/en-gb/articles/360014590399-Carpool-Cancellation-Policy`) and a Salesforce-pattern estate (`/s/article/Carpool-cancellation-and-refund-policy-1729196970728?language=en_GB`), plus a third URL shape (`/en-us/contents/How-do-I-cancel-a-passenger-s-carpool-booking-OFAv2zX1`) and a collections shape (`/collections/zUraSHEI`). **The same policy appears under different titles on different platforms.**
- Locale is in the path in several forms: `/hc/en-gb`, `/hc/en-in`, `/en-gb`, `/fr-fr`, and as a query parameter (`?language=en_GB`).
- The UK footer links `How does BlaBlaCar work?` to `/collections/zUraSHEI`; the French footer links `Comment fonctionne BlaBlaCar ?` to `/fr-fr/collections/zUraSHEI` — the same collection ID, locale-prefixed.
- Marketing FAQ answers all end with `Read more` pointing into the help centre, and the blocks end with `Read our Help Centre` / `See more answers`. So the marketing FAQ is explicitly a **truncated view of help articles**, not separate content — which explains why the answers are multi-paragraph and unusually substantive compared with every other product in this cluster.

That last point is the useful architectural observation: BlaBlaCar's marketing FAQ is a help-content surface, not a marketing surface. Grab and Careem write bespoke (and in Grab's case, SEO-padded) FAQ copy; BlaBlaCar syndicates its help articles onto the marketing pages and truncates them with `Read more`. The result is that its public FAQ answers are the best in the cluster and its marketing pages carry real policy detail.

## T12 FAQs

Three blocks harvested, all server-rendered with full multi-paragraph answers.

**Carpool — `Carpool FAQ`, 6 questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How do I book a carpool ride? |
| 2 | How do I publish a carpool ride? |
| 3 | How do I cancel my carpool ride? |
| 4 | What are the benefits of travelling by carpool? |
| 5 | How much does a carpool ride cost? |
| 6 | How do I start carpooling? |

**Book → publish → cancel.** The third question in a consumer FAQ is how to stop, and it sits ahead of the benefits question. Q1 and Q2 also pair the two sides of the marketplace in adjacent slots — the same block serves passengers and drivers without segmenting them, which mirrors the header's equal treatment of `Search` and `Offer your ride`.

Q3's answer contains the cancellation rule in plain English: "The sooner you cancel, the better. That way the driver has time to accept new passengers. The amount of your refund will depend on how far in advance you cancel. If you cancel more than 24 hours before departure, for example, you'll receive a full refund, **excluding the service fee**." The *reason* to cancel early is given as the driver's interest, not the passenger's — a counterparty-centred justification. And the fee exclusion is stated inline.

Q4's answer carries a **stale claim**: "Taking a carpool ride is also a safe way to travel in the current times. Because there are only a few people in a car, you have fewer points of contact and there's less risk than other travel options." A COVID-era argument still shipping in 2026, with `in the current times` as an unanchored deictic.

Q5's answer refuses to give a number — "it's hard to put an exact price tag on a ride" — and routes to destination pages instead. Honest, and a missed opportunity given that the driver-side page publishes `£0.11 / mile per passenger`.

**Offer your ride — `Everything you need as a driver, in our Help Centre`, 4 questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How do I set the passenger contribution for my ride? |
| 2 | When do I get my money? |
| 3 | What should I do if there's an error with my ride? |
| 4 | How do I cancel a carpool ride as a driver of a ride? |

Four questions, and **three of them are about money or failure**. The heading is the giveaway: `Everything you need as a driver, in our Help Centre` — the block is openly framed as a help-content window, not as marketing.

Q1 uses the term `passenger contribution` where the Terms say `Cost Contribution` and the answer body says `contribution` — three forms. Q4's phrasing `as a driver of a ride` is redundant and ungrammatical, and it reads like a disambiguation against a sibling article (`as a passenger of a ride`), i.e. **the title is carrying help-centre routing logic onto a marketing page**.

**Bus — `Bus FAQ`, 6 questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How do I book a bus ride on BlaBlaCar? |
| 2 | Why travel by bus? |
| 3 | How much does it cost to travel by bus? |
| 4 | Do I have to print my bus ticket? |
| 5 | Can I choose my bus seat? |
| 6 | How do I cancel my booking? |

The bus block is **entirely about the logistics of a ticket**; the carpool block is about the mechanics of an agreement between people. Same brand, same page furniture, two different problem spaces — and the difference is legible from the question lists alone. Q4 and Q5 (printing, seat choice) have no carpool analogue; Q2 (`Why travel by bus?`) is a category-justification question that the carpool block also carries (Q4), so the "why this mode" question is the one thing both modes need.

Q6's answer defers entirely to the operator: "within the timeframe specified in the terms and conditions of the bus company" — against carpool's four-tier schedule.

**Cross-block note.** All three blocks use `Read more` per answer and route to the blocked help centre. The French carpool page's equivalent (`Comment fonctionne BlaBlaCar ?`) was not opened.

## T13 Terminology & glossary

The Terms supply a formal, capitalised glossary — unusual, and it makes BlaBlaCar's terminology the most inspectable in this cluster.

### Defined terms (Article 2, current Terms) `[documented]`

| Term | Usage | The alternative it rejected |
|---|---|---|
| `Member` | Any natural person who has created an Account | "user", "customer" |
| `Driver` | The Member offering to carry another "in exchange for the Cost Contribution, on a route and at a time **they alone set**" | "provider", "partner", "captain" |
| `Passenger` | The Member who accepted the Driver's offer, or the person they booked for | "rider" |
| `Customer` | Reserved for **bus and train ticket buyers**, Member or not | — |
| `Cost Contribution` | What the Driver asks and the Passenger accepts as a share of travel costs | **"fare", "price"** — see below |
| `Price` | Reserved for **bus and train**: the all-in, all-taxes amount | |
| `Additional Payment` | An optional extra offered via Messages for a special request "such as a detour" | "tip", "surcharge" |
| `Service Fee` / `Service Fees` | BlaBlaCar's own fee | "commission" |
| `Subscription Fee` | Monthly/annual charge replacing the per-booking fee | |
| `Advert` | The listing (umbrella over `Carpooling Advert`, `Bus Advert`, `Train Advert`) | "listing", "post" |
| `Trip` | Umbrella over `Carpooling Trip`, `Bus Trip`, `Train Trip` | "journey", "ride" |
| `Leg` | A section of a Trip between intermediate cities | "segment", "stopover" |
| `Seat` | The unit of inventory, in a car, coach or train | |
| `Booking` | The online seat-booking system and the reservation made through it | |
| `Booking Confirmation` | The post-payment, post-approval state | |
| `Member Content` | Booking requests, Adverts and their comments, bios, photos, ratings and replies | "UGC" |
| `Messages` | Member-to-member exchange via the Platform | "chat", "DM" |
| `Platform` | The website plus the apps | |
| `Booking Platform` | **The specific country platform on which the Booking is made** | — |
| `Bus Operator` / `Rail Operator` | "professional passenger transport company" | |
| `Help Centre` | A defined term, with its own Article | |
| `Contact Form` | The support route, defined | |
| `Hyperwallet Payment Solution` | The payout rail; provider named as PayPal (Europe) | |

### `Cost Contribution` is the keystone term

It is not a fare, and the whole legal and commercial architecture depends on that. It supports:

- Article 6's non-professional requirement (a contribution to costs cannot exceed costs)
- The `£0.11 / mile per passenger` recommendation cap
- The exclusion of EU payment-services professional rules "due to their non-professional status"
- The vehicle-class and behaviour-pattern suspension triggers

And BlaBlaCar keeps it consistent in the Terms while the marketing surface uses **three softer forms**: `passenger contribution` (FAQ question), `contribution` (FAQ body), `price per seat` (publish-flow description), `the price` (recommendation copy). Four registers for one concept, and the loosest of them (`price per seat`) is the one used in the onboarding instruction where the driver actually sets it.

That is the most consequential terminology inconsistency in the file: the term that makes the activity legal is softened into a commercial word at the exact moment the user performs the act it governs.

### The brand name is a coordination term

`BlaBlaCar` is onomatopoeic — from the chattiness slider the product is known for — and the brand is the only one in this cluster whose *name* encodes a social-coordination variable. The French copy carries the clipped community form **`covoit'`** inside a user quote (`dans le même covoit'`), and the French nav uses `Covoiturage` / `covoitureurs` [*carpoolers*] — a dedicated agent-noun for the participant that English lacks entirely. English has no word for a person who carpools, so the UK copy falls back to `members`, `travellers`, `drivers` and `passengers`.

### Product names

`[observed]`: `BlaBlaCar Bus` · `BlaBlaCar Daily` (French footer, `blablacardaily.com`) · `BlaBlaBono Energético` (Spanish subsidy, Terms) · `Automatic Ratings`. The train product has **no brand name at all** — `Train`, `Train Trip`, with the operators named instead (`SNCF, Renfe, Iryo et Trenitalia sans frais supplémentaires`).

Four product names total, across 41 countries and three modes. The naming restraint is extreme compared with Grab (~40 coined names) and Gojek (~45), and it is coherent with the plain-noun approach: the brand modifies the mode (`BlaBlaCar Bus`) or stands alone, and nothing else is coined.

`BlaBlaCar Bus` appears **once** in the current Terms and is absent from the rest of the document, which says plainly `Bus Trip` / `Bus Operator`. The superseded Terms used `BlaBlaCar Bus` in a definition. The legal register has been de-branded between versions.

### Terms that are notably absent

`[absent]`, verified against a full read of the Terms:
- `no-show` (marketing only; Terms describe the behaviour)
- `smoking`, and any smoking preference
- `luggage` for carpooling
- `level`, `experience level`, `Ambassador`, any tenure ladder
- `Ladies Only` or any women-only option
- Any pets-allowed preference (pets appear only as prohibitions)
- `Meeting Point` as a **capitalised defined term** — the Terms use lowercase `meeting point`, `meeting place`, `the agreed meeting place` and, in the superseded version, `collection point`. **Four lowercase variants for the single most important coordination object in the product, and it is the one concept the glossary does not define.**

That last one is the sharpest terminology finding in the file. Everything about money is capitalised and defined; the physical place where two strangers must find each other is neither.

### Terminology drift between Terms versions `[documented]`

| Superseded (until 15 Jun 2026) | Current (from 15 Jun 2026) |
|---|---|
| `review` / `review system` | `rating` / `rating system` |
| `GT&Cs of Sale` | `T&Cs of Sale` |
| `Website` (defined) | **removed** |
| `collection point` | `meeting point` |
| `Advert` = a Driver's ad | `Advert` = umbrella over three modes |
| `Login with Facebook` | `Continue with Facebook` |
| `Register with an email address` | `Continue with an email address` |
| 5 payment methods | 11 payment methods |
| No train concepts | `Train Advert`, `Train Trip`, `Rail Operator`, `Train T&Cs of Sale` |

The `Login`/`Register` → `Continue with` migration is a textbook auth-copy modernisation preserved in the legal record. And the superseded version contains a **capitalised-but-undefined `Ride`** in its `Carpooling Advert` definition, plus a typo (`Bus Operato`) — defects in a legal document that the current version cleaned up.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the user; first-person plural for the company, used with unusual warmth — "We take the time to get to know each of our members", "We're launching Automatic Ratings", "we'll let the passengers know", "We send your money", "We help you with the price". The company narrates its own operational actions in the present tense, which makes the platform feel like a participant rather than a system.

**The third person that matters is the counterparty.** BlaBlaCar's copy constantly refers to *the other user* — "so the driver has time to accept new passengers", "let passengers know by message", "contact them explaining the mistake", "Review passenger profiles", "to increase trust between members", "you know who you're travelling with". **No other product in this cluster writes this much second-person copy about a third person.** In a professional marketplace the counterparty is staff and needs no introduction; here, half the copy's job is to make a stranger legible and to explain what you owe them.

**Register.** Short, warm, exclamation-tolerant — `Keep your plans!`, `pick the carpool that suits you best!`, `and you're done!`, `That's how easy it is to start saving on travel costs!`, `there's a BlaBlaCar bus to take you there at a low price!`, `We're Hiring!`. Roughly one exclamation mark per FAQ answer, which is markedly more than Bolt (zero observed) or Careem. Contractions throughout. `divvy up` is the standout colloquialism.

**Tone flattens correctly as stakes rise.** The Terms are dry and precise. The cancellation-policy answer has no exclamation marks and no colloquialism. The price-recommendation answer states an unflattering purpose plainly. The exclamation marks live in onboarding and discovery copy and nowhere near money.

**Numbers as trust devices** `[observed]`: `40 million active members` · `41 countries` · `150 million carpool, bus and train passengers` · `15 000 bus and trains operators` (also stated as `over 6 000 operators` on the same page — **two figures, one page**) · `800 employees from 46 nationalities` · `4 million tonnes of CO2 avoided` · `€568 million saved by drivers` · `138 million carpool encounters` · `2.7 million meeting points served` · `21 million drivers` · `100 million members worldwide` · `40 million rides shared per year` · `15 European countries` · `£0.11 / mile`.

Two are distinctive. **`138 million carpool encounters`** — the metric is *meetings between people*, not trips completed. And **`2.7 million meeting points served`** — the coordination object the glossary refuses to define is the one they count. Both are marketplace-social metrics rather than transaction metrics, and they are the numerical expression of the `community-based` positioning.

The `over 6 000` / `15 000` operator discrepancy sits two paragraphs apart on the About page.

**Locale and currency defects** `[observed]`:
- The UK Offer-your-ride page prices the insurance excess product as `2 €` and `1,500€` — **euros, two symbol positions, on a GBP page**
- A UK testimonial cites `400€`
- The French homepage's primary search form says `1 Adulte (27 à 59 ans)`; its secondary form says `1 passager`
- The UK `youtube.com/c/BlaBlaCarUK` link carries the `title` attribute `"Link to www.youtube.com/c/BlaBlaCarFR"` — **a French link title on a UK social link**, repeated in both footer instances on every UK page
- The About page's social block carries **Brazilian** social links (`facebook.com/blablacar.br`, `twitter.com/BlaBlaCarBR`, `instagram.com/blablacarbr`, `youtube.com/c/BlaBlaCarBrasil`) under the heading `Seguir` [*Follow*, Portuguese] — on an English-language page, above an English footer that then repeats the correct global links under `Follow us`
- The About page serves a **French-language cookie consent notice** ("Le respect de votre vie privée nous tient à cœur… Accepter et poursuivre / Tout refuser / Personnaliser") on the English page
- Several About-page images are served from `newsroom.blablacar.fr` on the `.com` domain
- The UK footer links `Cookie policy`, `Privacy Policy` and `Terms & Conditions` to `blog.blablacar.co.uk/about-us/…` — a **blog subdomain** — while the product footer links Terms to `legal.blablacar.com`. Two legal estates.

The About page in particular appears to be a French/Brazilian template imperfectly localised, and it is the page linked as `Who we are` from every UK footer.

**Accessibility observations** `[observed]`:
- **Alt text is descriptive and scene-level** — the best in the TRAV cluster by a clear margin: `Two bus passengers saving money with BlaBlaCar` · `Two people who use BlaBlaCar and are ready to share the cost through carpooling` · `BlaBlaCar app with automatic ratings to ensure reliable rides` · `Membre BlaBlaCar en voyage` · `Utilisatrice BlaBlaCar qui enlasse sa soeur rencontrée par hasard dans un covoiturage` [*BlaBlaCar user hugging her sister met by chance in a carpool*] · `Bus to Paris` · `Options pour voyager vers Brussel`. These describe the scene **and its relevance**, which is correct practice and rare.
- One French alt contains a spelling error (`enlasse` for `enlace`).
- The origin/destination swap control has a full descriptive label: `Switch point of origin and destination` / `Switch point of origin and destination`.
- Decorative mode icons (`carpool_light`, `bus_light`, `train_light`) carry empty alt — correct.
- `Open the user menu` as an accessible name for the avatar control — correct.
- **Every search form is rendered twice in the DOM** (desktop and mobile variants), so all six fields and the `Search` button are duplicated on the homepage, carpool page, bus page and French homepage.
- The French `Récupérez 90 €` and testimonial carousels render with empty list items between entries.
- `Previous` / `Next` carousel controls are labelled, which is good.
- No `Skip to content` link observed.
- Currency and language selector rendered as `GB - £` / `FR - €` — a terse accessible name for a control that changes the entire market context.

**Negative findings, recorded honestly**
- Three English labels plus one French for the single most important CTA (`Offer your ride` / `Share your ride` / `Publish a ride` / `Publier vos trajets`)
- Four registers for `Cost Contribution`, with the loosest one used at the point of setting it
- `meeting point` / `meeting place` / `agreed meeting place` / `collection point` — four lowercase variants of an undefined core concept
- Euro amounts on a GBP page, twice
- French YouTube link title on UK pages
- Brazilian social links and a French cookie banner on the English About page
- `15 000` and `over 6 000` bus operators, two paragraphs apart
- A COVID-era safety claim (`in the current times`) still live in a carpool FAQ answer
- `How do I cancel a carpool ride as a driver of a ride?` — help-centre routing grammar leaking onto a marketing page
- Help centre entirely unavailable without JavaScript; the same policy published under different titles across at least two help platforms
- Marketing trust claim ("you know who you're travelling with") contradicted by the Terms' verification disclaimer
- Legal documents split across `legal.blablacar.com` and `blog.blablacar.co.uk`
- Duplicated search forms throughout the DOM

---

## Transferable patterns

1. **Write every onboarding step's benefit as a consequence for the counterparty.** "Add your profile picture… to increase trust between members." "check our recommended price to increase your chances of getting your first passengers and ratings." When the person on the other side is a peer rather than staff, the reason to complete a field is what it does to a stranger's willingness — not what it unlocks in the system. Transfers to any marketplace, community or P2P payments onboarding.
2. **Separate the single act from the pattern in policy copy.** "Drivers won't be penalised for cancelling, but when drivers cancel regularly and/or at the last minute, we can suspend them from offering rides to keep BlaBlaCar reliable." The only honest way to write a rule that is enforced statistically, and it avoids both chilling one-off users and blindsiding repeat offenders. Directly applicable to fraud thresholds, chargeback policy and account-limitation copy.
3. **Forgive the first offence, and say so in the announcement.** `Late cancellations or no-shows will get 1 star, except for the first time.` A publicly stated amnesty converts a penalty system into a behavioural signal and buys enormous goodwill for three words. Condition: it must be automatic and unconditional, or it becomes a negotiation.
4. **State the unflattering purpose of a constraint to the people it constrains.** "We help you with the price to make it easy to share your costs, but also to prevent people from profiting from carpooling." Naming the second, less generous reason alongside the first is more credible than concealing it, and it pre-empts the discovery.
5. **Explain the empty state before the user reaches it.** "If you don't see any money in Awaiting transfers, it's because we already sent it. You can check out what we've sent in your Transfer history." Absence-as-evidence, plus a redirect, in one sentence. Reusable wherever a pending queue drains into a history.
6. **Split a timing promise into the two systems that own it.** "We send your money 48 hours after the ride… You'll get your money 1 to 5 weekdays (not counting weekends and holidays) after we send it." The user can locate which half of the pipeline their money is in, which is the difference between waiting and worrying. Transfers directly to payouts, settlement and refund timing.
7. **Name the conversation as the recovery step.** "If you can't edit your ride because passengers have already booked, contact them explaining the mistake." In a peer marketplace the fix is often social, not systemic, and the copy should say so rather than routing to a support form that cannot help.
8. **Publish a checkable unit rate.** `£0.11 / mile per passenger` lets the driver verify the recommendation themselves. A rate the user can do arithmetic with beats an algorithmic suggestion they must trust.
9. **Count the social metric, not just the transaction.** `138 million carpool encounters` and `2.7 million meeting points served`. Choosing meetings and places over trips completed is a positioning decision expressed numerically, and it is the strongest evidence of the `community-based` claim anywhere on the estate.
10. **Negative pattern — do not put the warmth on the marketing page and the disclaimer in the Terms.** "We take the time to get to know each of our members… so you know who you're travelling with" against "BlaBlaCar does not guarantee the truthfulness, reliability or validity of the information that has been the subject of the verification procedure." The Wise approach — bound the claim where the claim is made — is the correction.

## Caveats & gaps

- **The help centre is blocked and this is the dominant gap.** `support.blablacar.com` renders `Loading...` on every URL shape tried (`/hc/en-gb`, a category, an article, `/collections/`). T11 is `[absent]`, and the T7 article titles listed are **recovered from a web search index, not observed on-page** — they are marked as such and should be re-verified before use. Given that the marketing FAQ answers are explicitly truncated help articles, the full help corpus is likely the single richest unharvested source in this file.
- **The in-app preference system — smoking, music, chat, pets, `Max 2 in the back` — is not on any public surface and is not in the Terms.** This was verified by a full read of the T&Cs. For a product benchmarked on rider coordination, the coordination *preferences* are entirely unharvested; only the coordination *rules* (time, money, obligations) are public. An authenticated or app-store pass is required, and it should be the next step for this product specifically.
- **No route-listing or ride-card page was reached.** `blablacar.co.uk/carpool/routes/london/paris` returned empty. Ride cards are where preference icons, `Instant Booking` badges, driver ratings and `Ladies only`-type markers would render, and none of that is represented here.
- **The Terms are the principal source for T6 and T13**, which means those sections are weighted toward the legal register. The consumer-facing wording for the same concepts (what a passenger actually sees when a driver cancels) is unobserved.
- **The superseded Terms version is truncated in the served page** at Article 7.1, so the older document's Articles 8+ could not be compared. The version-drift table in T13 is therefore complete for Articles 1–7 only.
- **Two of 41 markets harvested** (UK, France). BlaBlaCar's market variance is documented as extensive — wait rules, age floors, limitation periods, payment instruments, subsidy schemes and available modes all differ by country. Brazil, Mexico, Ukraine, Poland, Spain, India and Turkey all have named carve-outs in the Terms and none was harvested. The Spanish `BlaBlaBono Energético` surface and the Indian market (which has its own help locale, `en-in`) are the highest-value next fetches.
- **`BlaBlaCar Daily` unharvested** (`blablacardaily.com`) — a separate commuting product, French-footer-only, with presumably a distinct coordination model (recurring rides between the same two people).
- **T8 effectively absent** — the one empty-state artefact is help-answer prose, not observed in product.
- **T5 partial** — the search and publish forms were observed; the account, payment, profile and booking forms are all behind auth.
- French glosses throughout are the harvester's working translations, marked in square brackets. The French strings are quoted verbatim and are the artefact; the glosses are not authoritative, and the register of `covoit'` in particular has no English equivalent.

## Sources

1. https://www.blablacar.com/
2. https://www.blablacar.co.uk/
3. https://www.blablacar.co.uk/carpool
4. https://www.blablacar.co.uk/offer-seats
5. https://www.blablacar.co.uk/bus
6. https://www.blablacar.fr/
7. https://legal.blablacar.com/en-gb/terms-and-conditions/
8. https://newsroom.blablacar.com/about-us
9. https://support.blablacar.com/hc/en-gb — **blocked (JS required)**
10. https://www.blablacar.co.uk/carpool/routes/london/paris — **empty response**
