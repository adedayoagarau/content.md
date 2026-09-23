# 097. Lime

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Shared micromobility (dockless e-scooter / e-bike) |
| Primary URL | https://www.li.me/ |
| Corpus rank | 097 |
| Benchmark strength (source list) | Safety onboarding and ride states |
| Locale / market observed | en-US (default); site offers 34 regions and ~20 languages, help centre offers 27 |
| Platform observed | Web (desktop marketing), Zendesk help centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a financial regulator context — the binding regimes are **municipal permit conditions** (parking, speed, no-go zones), national/state **helmet and age law**, and third-party liability / personal-accident insurance placed by Lime in selected markets; EU/UK data notices (Privacy Notice, Legal Bases, Imprint, third-party data-request guidelines) present in the footer |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Partial — marketing and help-centre surfaces harvested in depth, including full article bodies. The product itself is an app: the in-app Safety Center, the ride map, zone alerts, the end-ride photo prompt and all ride-state UI are unreachable on the web and are captured as `[documented]` only. Two help categories (`Account & Payment`, `Reporting & Complaints`) were reached only via cross-links, not opened at category level. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.li.me/ | Hero, 4-step "How to Lime", city grid, core principles, footer |
| Safety | https://www.li.me/why/safety | Vision Zero, vehicle design, parking, Training Mode, helmets, First Ride Academy |
| E-Scooter product | https://www.li.me/vehicles/scooter | 5-part "How to Ride", 6-question FAQ |
| Rider insurance | https://www.li.me/insurance | Personal accident + third-party liability, 3-step accident procedure |
| Help centre home | https://help.li.me/hc/en-us | 5 categories, 14 promoted articles |
| Help: Getting Started | https://help.li.me/hc/en-us/categories/360005899673-Getting-Started | 4 sections, incl. `Riding` (10 articles) and `Safety` |
| Help: Trouble With Your Ride | https://help.li.me/hc/en-us/categories/360004847754-Trouble-With-Your-Ride | 1 section, 3 articles |
| Help: Safety & Legal | https://help.li.me/hc/en-us/categories/360005899713-Safety-Legal | 2 sections, 7 articles |
| Article: Rules and regulations | .../articles/360001546234-Rules-and-regulations-for-riding-Lime | Two-list structure: must vs. encouraged |
| Article: Starting your ride | .../articles/115004745867-Starting-your-ride | Reserve → one-tap → scan; 4 named failure modes |
| Article: Ending your ride | .../articles/115004745967-Ending-your-ride | Parking pin flow, photo verification, 3 named failure modes |
| Article: Riding and parking zones | .../articles/360040206933-Riding-and-parking-zones | Six named zone types with colour codes and behaviours |
| Article: Helmet requirements | .../articles/115004915708-Helmet-requirements-and-recommendations | Certification standards, liability statement |
| Article: Age requirements / Parking penalty / How Lime works | .../115004915588 · .../5015858082331 · .../115004913928 | Age gating, penalty taxonomy, dispute route |

---

## T1 Navigation & IA labels

**Global nav — four nouns, one verb, one help link** `[observed]`

`About Us` · `Why Lime` · `Vehicles` · `Locations` · `Blog` · `Help` · `Download App`

`Why Lime` is the interesting slot: not `Features`, not `Company`, but a question stub. Its children are the four values Lime wants to be judged on — `Safety` · `Sustainability` · `Community` · `Innovation` — and they are re-surfaced on the homepage under the heading `Our Core Principles`. **Safety is the first child of the second nav item, and the first card in the principles grid.** A micromobility operator placing safety at that depth is making a regulatory as much as a marketing statement.

`Vehicles` → `E-Scooter` · `E-Bike` (with a third, `Seated E-Scooter`, reachable only from the homepage `Discover the Gen4` block — a nav gap).

**Footer — four groups, and the shape of the programmes group matters** `[observed]`

| Group | Members |
|---|---|
| `Join Us` | `Careers` · `Investors` · `Lime Times Blog` · `Press` · `Partners` |
| `About` | `Community` · `E-Bike` · `E-Scooter` · `Sustainability` · `Innovation` · `Safety` |
| `Programs` | `Advertise` · `Lime Access` · `Lime Hero` · `Lime Assist` · `Insurance` · `Our Cities` |
| (unlabelled) | `Find Location` · `Get help` · `Sitemap` · `Service Status` |

`Service Status` as a first-class footer link on a scooter company is a deliberate borrow from SaaS — it treats a physical fleet as an uptime-bearing service. `Insurance` sitting inside `Programs` alongside `Lime Access` (the low-income fare programme) and `Lime Hero` frames coverage as a benefit, not a legal artefact.

**Legal strip is unusually long** `[observed]`: `User Agreement` · `Privacy Notice` · `Data Request` · `Research` · `Legal Bases` · `My Information` · `Imprint` · `Trademarks`. `Legal Bases` and `Imprint` are GDPR/EU-statutory artefacts shipped to a US default locale.

**Help-centre top level — five categories, no scope lines** `[observed]`

1. `Getting Started`
2. `Trouble With Your Ride`
3. `Account & Payment`
4. `Reporting & Complaints`
5. `Safety & Legal`

The taxonomy is a **journey with two failure branches**: start → it went wrong during the ride → money → it went wrong and someone else is involved → the rules. `Trouble With Your Ride` is phrased from the rider's position and sits second, above money. Unlike Wise, the categories carry no scope sentence, so a user must open a category to learn what is inside — and `Trouble With Your Ride` contains only three articles, all about the app rather than about crashes, which is likely to mislead.

**Section names inside `Getting Started`** `[observed]`: `About Lime` · `Creating an account` · `Riding` (10 articles) · `Safety`. `Riding` is the deepest node in the whole help centre and holds the entire ride lifecycle.

## T2 Value proposition & headline patterns

**Hero is two words and a hashtag-adjacent verb phrase** `[observed]`

> Headline: `Ride Green`
> CTAs: `Locations` · `Download the App`

No subhead, no benefit statement, no price. The hero asserts an identity rather than a value proposition — the whole environmental argument is compressed into one word, and the product argument is absent. The page's actual value proposition lives in the `<meta description>`: "Go car-free with the world's largest shared electric vehicle company." `Go car-free` is the sharper line and it never appears on the rendered page.

**Section headers are possessive and plural-first-person** `[observed]`

`Our Vehicles` → `Discover the Gen4` · `How to Lime` · `Our U.S. Cities` · `Our Core Principles` · `Our Latest News` · `Download the App`

Five of six begin with `Our` or `How to`. The register is institutional, not conversational. `How to Lime` is the exception and the best line on the page — **the brand name verbed as an instruction**, which is both a positioning claim (Lime is a thing you do) and a functional heading for a four-step onboarding sequence.

**Safety page headline is a two-word assertion with an evidence number** `[observed]`

> `Safety First`, then a paragraph closing on "This is why **over 99.99% of Lime trips ended without a reported incident in 2025**."

The construction is: values claim → mechanism list → statistic → provenance ("informed by our more-than one billion rides"). The statistic is precise to four significant figures, dated, and scoped to *reported* incidents — all three qualifications matter and all three are present. Worth noting the honest weakness: `without a reported incident` is doing quiet work, and Lime does not gloss it.

**`Vision Zero` is adopted as a named external framework** `[observed]` — "We believe strongly in Vision Zero, the idea that crashes are ultimately preventable." Lime defines the borrowed term in an appositive clause immediately after naming it, then splits accountability explicitly: "with a goal of constant improvement in everything **we're able to control**. For things we cannot control, we work with cities…". Naming the boundary of one's own control, on a safety page, is a strong and transferable move.

**Product page opens on engineering specifics, not on freedom** `[observed]`: "Our e-scooters combine thoughtful engineering with rider-focused design—featuring ergonomic handlebars with an intuitive throttle, smooth mountain bike-inspired suspension and a wide footboard with a lower center of gravity for full control." Four named physical features before any emotional claim; the emotional claim (`every journey is an opportunity to #ridegreen`) is the final clause. Reversed from the usual marketing order, and appropriate for a product where physical stability is the purchase objection.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Download App` | Global nav, persistent | The only nav CTA — there is no web signup |
| `Download the App` | Hero, and a full page section | Longer form in body, shorter in nav |
| `Download app` | Scooter page, "Find scooter rentals near me" | **Third casing of the same action on one site** |
| `Locations` | Hero, beside the app CTA | A *browse* CTA given equal weight to the conversion CTA |
| `E-Scooter` / `E-Bike` / `Seated E-Scooter` | `Discover the Gen4` block | Product names used as buttons |
| `View More` | Blog block | Bare, but the surrounding cards supply the object |
| `View Certificates` | Insurance page, twice | Names the compliance artefact precisely |
| `Get help` | Footer | |
| `Find Location` | Footer | vs `Locations` in the hero — two labels, one destination |
| `Service Status` | Footer | |
| `Submit a request` | Help centre, header **and** footer of every article | Persistent, repeated — the escalation path never leaves the screen |
| `Click here` | Scooter FAQ ("How do I download the app?") | **Accessibility defect** in an FAQ answer |
| `Skip to main content` | Help centre only | Present on Zendesk pages, **absent** on the marketing site |
| `End ride` | In-app, quoted in help copy | `[documented]` — bolded in the article |
| `Reserve` | In-app | `[documented]` — holds a vehicle for 10 minutes |
| `Start ride` | In-app | `[documented]` — appears only on a reserved vehicle at close range |
| `Scan to start` | In-app | `[documented]` — the default unlock path |
| `Learn more about zones and parking` | In-app map sheet | `[documented]` — quoted verbatim and bolded in the help article |

**Observation:** the marketing site has essentially one conversion action (`Download App`) and ships it in three different casings. Meanwhile the in-app CTAs quoted inside help articles are tightly written and consistent (`Reserve`, `Start ride`, `End ride`, `Scan to start`) — the product vocabulary is more disciplined than the marketing vocabulary.

## T4 Onboarding & getting-started

**`How to Lime` — four steps, each an imperative sentence ending in a full stop** `[observed]`

1. `Get the app and create an account.` — "Download the Lime app for free, create your account and learn about pricing & ride safety in your area."
2. `Start your ride with a Lime nearby.` — "Starting a ride is easy - scan the QR code on an e-scooter or e-bike to get on your way"
3. `Lime Responsibly.` — "Follow local traffic rules, stick to bike lanes whenever possible and of course, enjoy the ride!"
4. `Park like a Pro and end your ride.` — "Follow instructions in the app for how to park out of the way of pedestrians, doorways and sidewalks. Once you've ended the ride, we'll charge the card on file with your account."

This is the highest-value sequence in the file and worth dissecting.

- **Step 1 bundles safety into signup.** "learn about pricing & ride safety in your area" — the onboarding promise is not just an account, it is a *local* briefing. `in your area` is the load-bearing phrase; Lime's whole safety-content problem is that the rules differ by city, and step 1 sets that expectation before the user ever sees a vehicle.
- **Step 3 is the brand name used as a verb in the imperative** (`Lime Responsibly.`) — a direct structural borrow from `Drink Responsibly`. That is a deliberate liability-adjacent register: it places the duty of care on the rider using a construction the reader already associates with personal responsibility for a regulated activity. Whether that is admirable or evasive is arguable; it is certainly the most consequential four words on the homepage.
- **Step 4 is the only step with two obligations in one heading** (`Park like a Pro` **and** `end your ride`) and it is also the only step that names a charge. Parking compliance and billing are joined in a single beat — which is exactly how the product works, since the photo gate sits between the two.
- Steps 2 and 3 have inconsistent terminal punctuation in their bodies (step 2 has no full stop, step 3 ends on an exclamation mark).

**The `How to Ride` block on the scooter page is a five-part physical skills briefing** `[observed]` — the register shifts from marketing to instruction manual, with nested bullets:

| Sub-head | Instructions |
|---|---|
| `Using the kickstand` | "Sweep the kickstand up with your foot before riding." / "Put the kickstand down when parking." |
| `Using the throttle` | "Ensure the throttle springs back after you press and release." / "The vehicle must be moving for the throttle to engage the motor." |
| `Getting moving` | "Place one foot on the vehicle's floorboard." / "Push off the ground using your other foot while pressing the throttle." |
| `Keeping yourself and your city safe` | "Wear a helmet when riding." / "Test the brakes before riding by squeezing the levers and rocking the e-scooter forward and back—the e-scooter should not move." / "Ride in bike lanes whenever possible." |
| `Parking responsibly` | "Park out of public pathways and upright with the kickstand down." / "You may be fined for improper parking." |

Two things stand out. First, **the brake test is given as a physical procedure with a pass condition** ("squeezing the levers and rocking the e-scooter forward and back—the e-scooter should not move"). That is genuine pre-flight-check copy, written to be executable by someone standing next to the vehicle. Second, `Keeping yourself **and your city** safe` as a heading — the dual object is the entire micromobility content problem in five words, and the same heading covers helmet, brakes and lane position without separating rider risk from bystander risk.

`Parking responsibly` ends on a penalty warning. The instructional block terminates on a consequence, not on encouragement.

**Three named onboarding safety programmes** `[observed]`

- **`Training Mode`** — "designed to make your first ride on a Lime smoother and more comfortable by reducing the max speed before the motor disengages, so first-time or early riders can get the feel for riding at a comfortable speed and build confidence from there." Note the mechanism is stated precisely (max speed before motor disengages), and the rationale is emotional (`build confidence`, `more apprehensive at first`). A speed limiter is sold as a confidence feature rather than a restriction — a textbook reframe.
- **`First Ride Academy`** — "Lime's signature scooter safety course", explicitly three-part: (1) "Informational training on how to use the Lime app and our core principles", (2) "Practical training teaches participants how to inspect electric scooters before riding (brakes, accelerator, etc.) and how to ride, along with safety exercises", (3) "The First Ride takes participants along a predetermined course for a guided ride in a public setting". Gated: "Riders must be 18 years or older to participate." Helmet framed as optional and BYO: "We encourage riders to bring their own helmet if they wish!"
- **`Safety Center`** — an in-app destination referenced from two separate FAQs ("Visit the Safety Center in the App to learn more", "View local rules for your location in the Lime App Safety Center"). `[documented]` — never described, only routed to.

**The onboarding gap worth recording:** the web has no first-ride briefing. A first-time rider's actual safety onboarding happens inside the app, in the Safety Center, and in city-specific rules Lime repeatedly declines to state on the web ("Abide by your local regulations and traffic laws. The Lime app can help you learn about your local regulations for riding."). Every high-stakes specific — speed limit, helmet requirement, sidewalk legality, minimum age — is deferred to the app or to the local User Agreement. This is defensible (the rules genuinely differ by jurisdiction) and it is also the single biggest limitation of Lime's public safety content: **the web can tell you that rules exist but never what they are.**

## T5 Form & field labels

Account creation requirements `[documented]`, from `Starting your ride`: "You'll need to provide a valid phone number or email address and a form of payment." Three inputs, one of which is an either/or.

The only other named field practice is the identity gate: `Age verification` is a help article in the `Riding` section, and its localised slug (`Why-do-I-have-to-scan-my-id`) reveals the original question form — **the URL preserves an earlier, better title than the current one.** `Age verification` is a system label; `Why do I have to scan my ID?` is what the user asks. Lime retitled toward the system and kept the user's phrasing in the permalink.

`Verifying your Lime account` is a separate article from `Age verification`, so identity and age are two distinct gates. All actual field labels, placeholders and validation messages are in-app. `[absent]`

## T6 Status & state language

This is the richest category in the file, because Lime's ride model is a **state machine expressed as map geometry**, and the help centre documents it fully.

**Ride states** `[documented]`, named by the article titles in `Riding`:

`Reserving a Lime vehicle` → `Starting your ride` → (`Pausing your ride`) → `Ending your ride`

Four states, one of which (`Pausing`) is an explicit mid-ride hold. Reservation is time-boxed and the number is public: "tap **Reserve** to hold it for 10 minutes." A vehicle is therefore in one of at least five conditions from the rider's point of view: available, reserved-by-you (10-minute clock), in ride, paused, ended.

**Zone states — six named types, each with a colour, a symbol, and a described vehicle behaviour** `[observed]`, from `Riding and parking zones`. This is an exemplary piece of state documentation and is reproduced here as a table because the *structure* is the artefact:

| Zone (verbatim) | Map treatment | What the vehicle does |
|---|---|---|
| `No go zones` | "red shading and a restricted symbol" | "your vehicle will gradually come to a stop. You must walk your vehicle out of the No Go zone to resume your ride." |
| `Low speed zones` | "yellow shading" | "Your vehicle will gradually slow down"; top speed discoverable by tapping the shaded area |
| `No parking zones` | "red shading with a no parking symbol" | "the app will alert you of parking restrictions and help you locate nearby parking" |
| `Mandatory parking zones` | "blue parking pins" | app alerts and locates nearby parking |
| `No locking zones` | (not colour-coded) | app alerts on "parking and locking guidelines" |
| `Service zones` | "a green line with gray shading surrounding the zone" | "your vehicle will gradually come to a stop. You'll need to walk it back to the Service zone to continue your ride." |

Three patterns worth stealing:

1. **Every zone answers "what will happen to me?" not "what is prohibited?"** The prohibition is implicit; the documented content is the *system's response*. `your vehicle will gradually come to a stop` is a consequence statement, and the adverb `gradually` is doing safety work — it pre-empts the rider's fear that the scooter will brake hard under them.
2. **The recovery action is stated in the same breath as the failure** — `You must walk your vehicle out` / `You'll need to walk it back`. There is no dead-end state.
3. **Colour is never the only channel.** `No go` and `No parking` share red shading and are distinguished by symbol; `Mandatory parking` uses a pin shape as well as blue. This is a WCAG 1.4.1 consideration handled correctly in the underlying design and, crucially, *described* correctly in the copy.

Two overlapping vocabularies exist for this concept. The article body says `Ride Zones` (capitalised, from `Starting your ride`: "familiarize yourself with **Ride Zones** on the map"), the article title says `Riding and parking zones`, the in-app CTA says `Learn more about zones and parking`, and the legacy slug says `What-are-the-shaded-areas-on-the-map-`. **Four names for one concept**, and again the retired slug is the most user-shaped of the four.

**Penalty states** `[observed]`, from `I was charged for a parking penalty`: the escalation is named as a two-step — "You may receive a **warning** or a **penalty** for improper parking" — and appears in three separate articles with identical phrasing ("may be subject to a warning or penalty"). A consistent two-tier enforcement vocabulary, applied uniformly.

**Vehicle-fault state** `[documented]`: "The app shows a vehicle error: Please try another nearby vehicle. Our team is aware and on their way to retrieve the vehicle." The error is named (`vehicle error`), the user is redirected, and the system's own remediation is disclosed unprompted.

## T7 Error, failure & recovery

Strong, and structured identically at both ends of the ride.

**`Trouble starting your ride` — four named failure modes, each with a distinct recovery** `[observed]`

| Failure (bolded lead) | Recovery |
|---|---|
| `The QR code is damaged or unreadable:` | "If the code isn't damaged, tap the flashlight icon on the screen and try again. If this doesn't work or the code is damaged, you can also enter the plate number from the vehicle." |
| `The plate number is damaged or unreadable:` | "please try another nearby vehicle while our local team fixes this issue." |
| `The app shows a vehicle error:` | "Please try another nearby vehicle. Our team is aware and on their way to retrieve the vehicle." |
| `The app shows a payment error:` | "You may need to add or update your payment method. After you do so, try again." |

**`Issues ending your ride` — three named failure modes, same construction** `[observed]`

| Failure (bolded lead) | Recovery |
|---|---|
| `Check your location.` | "If you have arrived at your parking spot but can't end your ride, check you are close enough to the pin… GPS accuracy can vary based on your network and location, so move as close as possible to the parking pin and try again." |
| `Check your internet connection.` | "Verify you have a stable internet connection… If you're connected to wi-fi, try switching to mobile data." |
| `Verify your payment information.` | "Check that your card on file isn't expired and has sufficient funds." |

**The pattern.** Both blocks use **bolded symptom → plain-language cause → concrete next action**, and both are ordered by likelihood rather than by severity. The start-of-ride block leads with the failure's *appearance* ("The QR code is damaged"); the end-of-ride block leads with the *user's action* ("Check your location"). That inversion is right: at the start the user is looking at a broken object, at the end the user is trying to escape a charge.

Three details are unusually good:

- **GPS is named as fallible, in plain language**: "GPS accuracy can vary based on your network and location." Most products silently retry; Lime tells the user the sensor is imperfect and gives them the physical remedy (stand closer).
- **The wi-fi-to-mobile-data suggestion** is a real-world diagnosis, not a generic "check your connection".
- **Escalation to a human is not offered** in either block. Every path is self-service or try-another-vehicle. The only escalation is the persistent `Submit a request` in the page furniture.

**The named failure categories in the IA** `[observed]`, all of them first-person or possessive:

- `I'm still getting charged after ending my ride` — first-person, present continuous, the exact sentence a panicking rider would type. This is the single best-titled article in the help centre and it is also the top promoted article on the home page.
- `Trouble locating a vehicle from the map`
- `Trouble starting your ride`
- `Was I charged incorrectly for my ride?`
- `I was charged for a parking penalty`
- `Do I pay if the vehicle is stolen？` — note the **full-width question mark (`？`)**, a CJK character surviving in an en-US article title. A real localisation defect, visible on a public surface.
- `What to do if you've been involved in an accident`

Four of seven are written in the rider's voice. The two `Trouble …` titles are the system's voice. The mix is inconsistent but the emotionally loaded ones (charging, penalty, accident) all sit on the rider's side, which is the right allocation.

**Accident recovery is a three-step ordered list with a human-safety-first ordering** `[observed]`, from the insurance page under `If You're in an Accident While Riding...`:

1. "Check to make sure you and anyone else involved are safe."
2. "Reach out to local emergency officials as needed."
3. "Contact the Lime **Customer Service Team** via our customer support channels in the app."

Lime is step three. Emergency services are step two. The other party's safety is in step one, before Lime is mentioned at all. For a product with genuine injury exposure, putting the platform last in its own recovery sequence is the correct and non-obvious choice.

**Dispute route is explicit and blame-neutral** `[observed]`: "If you believe you received a warning or a penalty in error, submit a request so our team can assist you." Conditional (`If you believe`), no defensiveness, one action.

## T8 Empty states

`[documented]` — one, from `How do I find a Lime near me?`: "Open the Lime app to see available Limes in your area. **If you don't see any Lime icons displayed on the in-app map, zoom out to search a wider area.**"

This documents an empty state's *recovery instruction* without quoting the state's own copy. The instruction itself (`zoom out`) is the right one and is the sort of thing that belongs in the empty state rather than in an FAQ. Whether the map says anything at all when empty is unknown. All other empty states are in-app. `[absent]`

## T9 Notifications & system messages

`[documented]` throughout — the copy is never quoted, but the *moments* are named with unusual precision:

- **Pre-end-of-ride parking notice**: "Before you end your ride, you'll be notified of local parking requirements." A just-in-time compliance prompt, fired at the decision point rather than at signup.
- **Zone entry alerts**: "the app will alert you of parking restrictions and help you locate nearby parking" (No parking zones); "the app will alert you of parking restrictions and help you locate nearby parking" (Mandatory parking zones — **identical string for two different zone types**); "the app will alert you of parking and locking guidelines" (No locking zones).
- **Photo verification prompt**: "Tap **End ride** and follow the prompts to take a photo of your parked vehicle."
- **Post-ride charge notice**: "Once you've ended the ride, we'll charge the card on file with your account."
- **Enforcement message**: `warning` as a distinct, lighter-weight notification preceding a `penalty`.
- **Service Status** page (`status.li.me`) exists as a public incident surface.

The alert copy being identical across `No parking` and `Mandatory parking` zones is a notable miss — those are opposite instructions (*don't park here* vs *you must park here*) receiving the same described message.

## T10 Disclosures, legal & compliance

**Helmet copy is the highest-liability content on the site, and it is stated three times in three registers** `[observed]`:

| Surface | Wording | Register |
|---|---|---|
| Safety page | "Wearing an approved and well fitted helmet is highly recommended any time you use our vehicles. Your helmet should be sized, fitted and fastened per manufacturer instructions. **Where helmets are required, you must wear one to use our Services.**" | Formal, capital-S `Services` |
| Scooter FAQ | "Wearing an approved, well-fitted helmet is highly recommended whenever you ride… **Where helmets are required, you must wear one to use our services.**" | Near-identical, lowercase `services` |
| Help article | "While helmet laws vary by region, country and city, we strongly recommend wearing one whenever you ride our e-bikes and e-scooters. **View local rules for your location in the Lime App Safety Center.**" | Routing, plus certification detail |

The help article is the only one that carries the compliance specifics — the helmet "should be **Snell, CPSC, ANSI or ASTM-approved**" with outbound links to each standards body — and the only one that states the liability position:

> "While helmets and other protective gear can't guarantee complete safety, they reduce the risk of injury. Choosing not to wear a helmet is your decision, but be aware that **we can't be held responsible for any injuries that may occur**."

Three moves in two sentences: bound the benefit (`can't guarantee complete safety`), affirm the benefit anyway (`they reduce the risk`), then transfer responsibility (`your decision` / `we can't be held responsible`). This is a genuinely hard piece of writing and it is done in plain language without a single legal term. The `but be aware that` hinge is where a lawyer's sentence would normally start, and the copy carries it through.

**The modal ladder is consistent and meaningful** `[observed]` — Lime distinguishes four levels and uses them precisely:

| Level | Construction | Applied to |
|---|---|---|
| Legal obligation | `you must` | helmets where required by law; age; walking out of a No Go zone |
| Prohibition | `Don't` | riding under the influence; texting while riding |
| Strong recommendation | `highly recommended` / `we strongly recommend` | helmets everywhere else |
| Encouragement | `We also encourage you to` | brake checks, night-riding caution, battery check |

**`Rules and regulations for riding Lime` is explicitly split into these two tiers** `[observed]`. The first list is prefaced "Follow these rules when you ride:" and contains five items; the second is prefaced "Your safety always comes first at Lime. **We also encourage you to do the following** when you ride:" and contains four. Crucially, **`Wear a helmet.` is in the second list — the encouraged tier — not the first.** The helmet is a recommendation, not a rule, at the global default. That is the single most consequential taxonomy decision in Lime's safety content, and putting the two lists adjacent makes the boundary legible rather than hiding it.

The rules list itself `[observed]`:
- `Abide by your local regulations and traffic laws.` (with "The Lime app can help you learn about your local regulations for riding.")
- `No more than one rider per vehicle is allowed.`
- `Don't ride if you're under the influence of drugs or alcohol.`
- `Be aware of cars, bikes, and pedestrians at all times.`
- `Don't text or call when you ride.`

The encouraged list `[observed]`: `Wear a helmet.` · `Check the brakes and wheels before riding.` · `Use caution and take your time when riding at night.` · `Check the battery life on your vehicle to ensure it is sufficient to reach your destination.`

Note the opening qualification on the whole article: "Except where permitted by local rules, you must be 18 or older to ride Lime, and have a valid driver's license or ID where required. **When you are riding, you ride at your own risk.**" Age gate, document gate, and a risk-assumption statement, in two sentences, before the first bullet.

**Age gating** `[observed]`: two mechanisms stated separately. The contractual one — "To create a Lime account, you must be the legal age to enter into binding contracts" — and the operational one — "In most countries, you must be 18 or older to ride Lime scooters or e-bikes." Both are then deferred to the local agreement: "Make sure to review the Lime User Agreement for your country, which states local age requirements." A separate `Age verification` article covers ID scanning.

**Insurance disclosure is heavily hedged and honest about it** `[observed]`. The qualifier "**Where applicable/available, coverages vary by country and region where you are riding**" appears **three times** on one page, once under each coverage type and once in the intro. Two products are named and defined:

- `Personal Accident Coverage` — "insures a rider for severe bodily injuries that happen while riding a Lime vehicle, **even if it is due to the rider's own mistake**. Riders are insured above certain thresholds, based on the type and severity of injury."
- `Third-Party Liability Coverage` — "provides insurance coverage to a rider for bodily injuries caused by the rider to other persons. Riders are also insured for damage they cause to other persons' property."

`even if it is due to the rider's own mistake` is the line a rider actually needs, and it is placed in the middle of the definition rather than at the end. `above certain thresholds` is a vague bound that is never quantified on the page — the quantification is pushed to `View Certificates`. The scope line "In select markets and countries, we have teamed up with leading micromobility insurance companies" names no insurer, which is a meaningful contrast with Turo's practice of naming Travelers on every surface.

**Pricing is not disclosed on the web at all** `[observed]`. The scooter FAQ `How much does it cost?` answers: "The price of the rides varies per city. Download the Lime app to see current pricing and offers. **The app is free—you're only charged when you ride.**" No rate, no range, no example. The one price fact given is a negation (the app costs nothing). For a benchmark corpus this is a notable absence: a transport product whose public surfaces contain no price.

**Parking penalty taxonomy** `[observed]` — three enumerated triggers, each with a definition:
1. "**Parking in a no parking zone.** No parking zones are restricted areas where riders cannot end rides or park Lime vehicles."
2. "**Not parking at a designated parking spot.** Some cities require riders to park in designated parking spots."
3. "**Blocking pedestrian walkways.** We enforce this rule to ensure that everyone has the ability to use the sidewalk or footpath."

Item 3 is the only one that states a *rationale* rather than a rule, and the rationale is about non-riders ("everyone has the ability to use the sidewalk"). Lime justifies the rule it is most likely to be resented for, and justifies it on behalf of third parties. `sidewalk or footpath` is a courtesy to non-US readers in an en-US article.

**Speed disclosure defers to the city** `[observed]`: "Your Lime's motor assists up to your city's approved speed, **but you may go faster when traveling downhill.** Always use our easy-to-use brakes to control speed down hills and for safe stopping." The downhill caveat is a genuine physics disclosure most operators would omit, and it is paired immediately with the mitigation.

## T11 Help-centre architecture

Three-level: **category → section → article**. Structure in T1; the architectural observations:

1. **`Riding` (10 articles) is the spine.** `Starting your ride` · `How to ride Lime vehicles` · `Ending your ride` · `Pausing your ride` · `Riding and parking zones` · `Age verification` · `Reserving a Lime vehicle` · `Using the cable lock` · `Starting a Group Ride` · `Using a parking station`. The section is ordered **chronologically by ride phase**, not alphabetically and not by popularity — start, ride, end, pause, zones, then the edge cases. A user can read the section top to bottom as a manual.
2. **`Safety` appears twice** — as a section under `Getting Started` (age + helmets) and as a section under `Safety & Legal` (accidents + rules). Rules-and-regulations is duplicated across both categories with **two different article IDs** (`360001546234` and `25378069433627`) — two articles with the same title in one help centre.
3. **The promoted-articles list on the help home is the real IA.** Fourteen items, and the ordering is diagnostic: rules → starting → how to ride → ending → **`I'm still getting charged after ending my ride`** → costs → payment method → `Was I charged incorrectly for my ride?` → account creation → LimePass → accidents → Lime Cash Terms → Privacy Policy → User Agreement. Two of the top eight are billing disputes. The promoted list is ordered by *actual contact drivers*, and it contradicts the category tree, where billing sits third.
4. **`Submit a request` is duplicated in the header and again at the foot of every article**, plus a third time under `Have more questions?`. Three escalation affordances per page.
5. **Helpfulness voting is public and unflattering.** Every article shows its score: `Ending your ride` reads **"838 out of 2671 found this helpful"** (31%), `I was charged for a parking penalty` reads **"44 out of 179 found this helpful"** (25%), `Starting your ride` reads 68%, `Rules and regulations` reads 88%. Leaving these visible is unusual transparency — and the two lowest-scoring articles are precisely the two where the user is being charged or penalised, which is a legible signal that the content is not solving the underlying grievance.

**Article-title grammar — five shapes, unevenly applied** `[observed]`

| Shape | Example |
|---|---|
| Gerund + object | `Starting your ride`, `Ending your ride`, `Creating a Lime account`, `Reserving a Lime vehicle` |
| `How to …` | `How to ride Lime vehicles` |
| `I <did/experienced X>` | `I'm still getting charged after ending my ride`, `I was charged for a parking penalty` |
| `<Question>?` | `Was I charged incorrectly for my ride?`, `Is it possible to purchase vehicles?`, `What is LimePass?` |
| `Trouble <gerund>` | `Trouble starting your ride`, `Trouble locating a vehicle from the map` |

The gerund shape dominates the happy path; the first-person and question shapes cluster on money. `Trouble <gerund>` is a useful third shape — softer than an error, more specific than a question.

## T12 FAQs

Placement: accordion at the foot of the e-scooter product page, headed `FAQ`. Answers present in server HTML.

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | How can I ride a Lime? | Four-beat sequence — download, create account, find on map, scan QR — closing "That's it!" |
| 2 | How do I download the app? | A deep link plus the manual fallback (search "Lime" in either store) |
| 3 | How do I find a Lime near me? | Open the app; if no icons, zoom out |
| 4 | Do I need to wear a helmet? | Recommendation, fitting guidance, and the conditional legal obligation |
| 5 | Are there any speed regulations I should know? | City-set motor assist, downhill caveat, brake guidance, pedestrian awareness, bike lanes, routes to in-app Safety Center |
| 6 | How much does it cost? | Varies by city; app is free; charged only when riding |

**Structural notes.** Six questions in a strict funnel order: **how → get the app → find a vehicle → safety → rules → price.** Price is last. Safety questions occupy positions 4 and 5, immediately before price and immediately after the user has (notionally) found a vehicle — i.e. at the moment of highest purchase intent. That placement is deliberate and it is the opposite of where most marketplaces put friction.

Q4 and Q5 are the only two with multi-sentence answers, and both end by routing to a destination the web reader cannot reach (`the Safety Center in the App`, "View local rules for your location"). **The FAQ's two safety answers both terminate in a redirect to an unreachable surface.** That is the structural weakness of Lime's public safety content, visible in miniature.

Q1's answer closes on "That's it!" — the only exclamation mark in the FAQ set, placed on the lowest-stakes question.

## T13 Terminology & glossary

| Term | Lime's usage | The alternative it rejected |
|---|---|---|
| `ride` | The unit of transaction, noun and verb | "trip", "rental", "journey" — though `Ride` is capitalised inconsistently in `Group Ride`, `Ride Zones`, `First Ride` |
| `a Lime` | The vehicle, brand as countable noun | "a scooter" — "Start your ride with a Lime nearby", "find a Lime near me", "How can I ride a Lime?" |
| `to Lime` | The brand as a verb | `How to Lime`, `Lime Responsibly.` |
| `vehicle` | The formal term in help and safety copy | "scooter" — deliberately generic so one article covers e-bikes and e-scooters |
| `Ride Zones` / `riding and parking zones` / `zones and parking` / `shaded areas on the map` | Four names for one concept across four surfaces | — an unresolved inconsistency |
| `No Go zone` | Geofenced exclusion | "restricted area", "prohibited zone" |
| `Low speed zone` | Geofenced throttle cap | "slow zone", "reduced-speed area" |
| `Service zone` | The rideable boundary | "operating area", "coverage area", "geofence" |
| `parking pin` | The map marker for a valid end point | "parking spot marker", "drop zone" |
| `parking station` | A physical fixture, distinct from a pin | |
| `warning` / `penalty` | The two-tier enforcement ladder | "fine", "violation" (though `fined` appears once on the scooter page — an inconsistency with the `penalty` term) |
| `Training Mode` | Speed-limited first-ride mode | "beginner mode", "learner mode" |
| `First Ride Academy` | In-person safety course | "safety training", "rider school" |
| `Safety Center` | In-app safety hub | US spelling retained globally |
| `Vision Zero` | Adopted external road-safety framework, defined in-line | |
| `micromobility` | Used in self-description ("largest global shared micromobility business") and in the insurance page ("leading micromobility insurance companies") | "scooter sharing" |
| `Gen4` | The current hardware generation, used as a consumer-facing product name | |
| `LimePass` · `Lime Cash` · `Lime Access` · `Lime Hero` · `Lime Assist` | Five `Lime`-prefixed programme names | — `Lime Access` (equity fare programme) and `Lime Hero` are undefined on any harvested page |
| `#ridegreen` | Hashtag used inside body copy | |
| `Limes` | Plural of the vehicle ("available Limes in your area", "Lime icons") | |

**Register split.** Marketing says `a Lime` and `scooter`; help says `vehicle` and `Lime vehicle`. The abstraction rises as the content becomes operational — the opposite of Wise's pattern, and correct here, because one help article must cover three form factors.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the rider, first-person plural for the company, and the company appears as an actor with named limits ("everything we're able to control", "For things we cannot control", "we can't be held responsible"). Present tense throughout; future only for consequences ("your vehicle will gradually come to a stop", "we'll charge the card on file").

**Register gradient, three bands.** Brand-voice colloquial in marketing (`Ride Green`, `Park like a Pro`, `you'll be a pro in no time`, `We've got you covered`, `get on your way`). Neutral-instructional in help (`Tap End ride and follow the prompts`). Flat and modal in compliance (`you must`, `where required`, `at your own risk`). The bands are well separated; there is no colloquialism in the helmet, insurance or penalty copy.

**The one tonal collision.** `Lime Responsibly.` sits in a homepage block whose fourth step is `Park like a Pro` — a legal-register borrowing and a jokey alliteration in adjacent cards. The mixed register within a single four-item component is the weakest tonal moment on the site.

**Sentence-level craft, three examples worth keeping:**
- "your vehicle will **gradually** come to a stop" — one adverb defusing a safety fear.
- "the e-scooter should not move" — a pass condition stated as an observable outcome, not as an instruction.
- "Choosing not to wear a helmet is your decision, but be aware that we can't be held responsible" — responsibility transferred without accusation.

**Numbers as trust devices** `[observed]`: `over 99.99%` (scoped and dated), `more-than one billion rides`, `81.4% carbon reduction`, `more than 230 cities, nearly 30 countries, and across five continents`, `10 minutes` (reservation hold), `12-inch front wheels`, `5" of extra legroom` (n/a — Alaska), `18 or older`. Mostly specific; `over 99.99%` and `more-than one billion` carry a hyphenation error in the latter.

**Accessibility content** `[observed]`

- `Skip to main content` present on the Zendesk help centre. **Absent from every marketing page harvested** (`/`, `/why/safety`, `/vehicles/scooter`, `/insurance`). A real gap on the higher-traffic surface.
- **Alt text is almost entirely missing on the marketing site.** Hero, "How to Lime" step images, city tiles, core-principle tiles and insurance illustrations all render with no alt attribute in the served markup. The only populated alt strings found are on social icons (`Twitter`, `Facebook`, `LinkedIn`, `YouTube`, `Instagram`) and the OG meta image (`Lime logo`). The four "How to Lime" step images are content-bearing — they illustrate the steps — and are unlabelled.
- **`javascript:void(0);` used as an href** on the safety page video embed and on the scooter page. Not keyboard- or screen-reader-friendly as a link target.
- `Click here` as link text in the scooter FAQ.
- **Zone documentation describes colour and symbol together**, which means the underlying map design does not rely on colour alone — good practice, and the copy makes it auditable.
- Full-width question mark `？` in the article title `Do I pay if the vehicle is stolen？` — a CJK character in an en-US string, likely a translation-memory leak.
- Locale coverage is genuinely broad: 27 help-centre languages including `Tiếng Việt`, `עברית`, `简体中文`; the US locale alone offers English, Español, Tiếng việt and 粵語. Language-switcher link text is in the target language, which is correct practice.

**Negative findings, recorded honestly**

- `Download App` / `Download the App` / `Download app` — three casings of one CTA
- `Locations` (hero) vs `Find Location` (footer) — two labels, one destination, and the footer one is singular
- `Ride Zones` / `riding and parking zones` / `zones and parking` / `shaded areas on the map` — four names for one concept
- `Rules and regulations for riding Lime` exists twice with two article IDs
- Identical in-app alert copy described for `No parking zones` and `Mandatory parking zones` — opposite instructions, same message
- `fined` (scooter page) vs `penalty` (help centre) — the enforcement noun diverges between surfaces
- No `Skip to main content` on marketing pages; content-bearing images without alt text
- `Click here` and `javascript:void(0);` links
- `？` full-width punctuation in an English article title
- `Seated E-Scooter` is reachable from the homepage but absent from the `Vehicles` nav
- Help-centre helpfulness scores of 31% and 25% on the two billing-adjacent articles, left publicly visible

---

## Transferable patterns

1. **Document a state by what the system will do to the user, not by what is forbidden.** "your vehicle will gradually come to a stop. You must walk your vehicle out of the No Go zone to resume your ride." Prohibition, consequence and recovery in two sentences, with an adverb that defuses the fear. Transfers to any geofenced, rate-limited or risk-scored product — including payment declines and velocity limits.
2. **Split rules from recommendations into two explicitly labelled lists, and let the boundary be visible.** "Follow these rules when you ride:" / "We also encourage you to do the following". Putting `Wear a helmet.` in the second list is a serious decision made legible rather than hidden. Condition: only do this if you are prepared for readers to notice which tier something sits in.
3. **Bound the benefit, affirm it anyway, then transfer the decision.** "can't guarantee complete safety, but they reduce the risk of injury. Choosing not to wear a helmet is your decision." Three moves, no legal vocabulary. Directly applicable to any optional protection product.
4. **Put the platform last in its own emergency sequence.** Safety of people → emergency services → contact us. For anything with real-world harm exposure, the ordering itself is the message.
5. **Sell a restriction as a confidence feature.** `Training Mode` is a speed limiter described entirely in terms of what the rider gains ("get the feel", "build confidence"). Condition: the mechanism must still be stated plainly, as Lime does.
6. **Name the failure by its symptom, in bold, then cause, then action.** Both of Lime's troubleshooting blocks use this and it scans in under two seconds.
7. **Justify the rule people resent, on behalf of the people it protects.** "We enforce this rule to ensure that everyone has the ability to use the sidewalk or footpath." The beneficiary is a non-customer, and saying so is what makes it land.
8. **Anti-pattern: deferring every jurisdiction-specific fact to an unreachable surface.** Lime's web safety content can tell you rules exist but never what they are. If your compliance content's every specific ends in "check the app", the web content is a signpost, not a resource — and the two most safety-critical FAQ answers on the site both terminate that way.

## Caveats & gaps

- **The product is an app; the web is a brochure.** Every ride state, every zone alert, every validation message, the end-ride photo gate, the Safety Center and all pricing are in-app and captured as `[documented]` at best. T5, T8 and T9 are thin for this reason and are marked accordingly.
- **No pricing anywhere on the public web.** "The price of the rides varies per city" is the whole of it. Any rate, discount or pass structure (`LimePass`, `Lime Cash`, `Lime Access`) is unharvested.
- **Two help categories not opened at category level** — `Account & Payment` and `Reporting & Complaints`. Their contents are known only from cross-links and the promoted list, so the billing and complaint vocabularies are under-sampled relative to `Riding`.
- **City-level content unharvested.** Lime runs per-city pages (`/locations/new-york` etc.) that are likely to carry the jurisdiction-specific rules absent from the global pages. That is where the real helmet/age/sidewalk copy probably lives, and it was not sampled.
- **Article currency varies widely.** Dates on harvested articles run from `April 25, 2024` to `July 06, 2026`. `Rules and regulations for riding Lime` was last updated `May 02, 2024` — the most safety-critical article is the second-oldest one harvested. Flagged as a staleness risk, not a proven error.
- **Accessibility findings are from served HTML**, not a rendered accessibility tree. The missing alt attributes are confirmed absent from the markup; whether any are supplied by CSS or ARIA at runtime was not verified.
- **`status.li.me` was not fetched** — the incident-communication vocabulary is unharvested.
- Non-US locales, the User Agreement, and the e-bike page are unharvested.

## Sources

1. https://www.li.me/
2. https://www.li.me/why/safety
3. https://www.li.me/vehicles/scooter
4. https://www.li.me/insurance
5. https://help.li.me/hc/en-us
6. https://help.li.me/hc/en-us/categories/360005899673-Getting-Started
7. https://help.li.me/hc/en-us/categories/360004847754-Trouble-With-Your-Ride
8. https://help.li.me/hc/en-us/categories/360005899713-Safety-Legal
9. https://help.li.me/hc/en-us/articles/360001546234-Rules-and-regulations-for-riding-Lime
10. https://help.li.me/hc/en-us/articles/115004745867-Starting-your-ride
11. https://help.li.me/hc/en-us/articles/115004745967-Ending-your-ride
12. https://help.li.me/hc/en-us/articles/360040206933-Riding-and-parking-zones
13. https://help.li.me/hc/en-us/articles/115004915708-Helmet-requirements-and-recommendations
14. https://help.li.me/hc/en-us/articles/115004915588-Age-requirements-to-ride-Lime
15. https://help.li.me/hc/en-us/articles/5015858082331-I-was-charged-for-a-parking-penalty
16. https://help.li.me/hc/en-us/articles/115004913928-How-Lime-works
