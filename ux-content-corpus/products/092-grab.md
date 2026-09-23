# 092. Grab

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Southeast Asian super-app (ride-hailing + delivery + payments + financial services) |
| Primary URL | https://www.grab.com/ |
| Corpus rank | 092 |
| Benchmark strength (source list) | Multi-service navigation |
| Locale / market observed | **en-SG** (grab.com redirects to `/sg/`; `og:locale` declares `en_US` while copy is British-spelled) and **id-ID** (`/id/`, Bahasa Indonesia) for the cross-market naming comparison |
| Platform observed | Web (desktop marketing, WordPress/Elementor). Help centre **not reachable** — JS-only. |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | SG: GPay Network (S) Pte Ltd, PCI DSS Level 1, IMDA Data Protection Trustmark (DPTM), Singapore Fintech Association Payments Industry Code of Conduct self-declared adherent, LTA child-restraint rule cited, Platform Workers Act 2025 referenced. ID: Bank Indonesia/OJK ecosystem via OVO, Kementerian Perdagangan consumer-complaint routing surfaced in the footer. |
| Harvest date | 2026-09-21 |
| Pages inspected | 8 reachable (+2 blocked) |
| Harvest completeness | **Partial — help centre blocked.** `help.grab.com` returns a JS-required error page on both the index and a category URL, so T6/T7/T11 are thin and reconstructed from marketing FAQ blocks rather than help IA. T1 and T13, the priority sections, are complete and cross-market. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (SG) | https://www.grab.com/sg/ | Four-audience mega-menu, six-cluster service grid — the T1 core |
| GrabX 2026 | https://www.grab.com/sg/grabx/ | Annual product event page; newest feature names, all-caps kickers |
| Rides (transport) | https://www.grab.com/sg/transport/ | **Ride-tier naming system** — the T13 core |
| GrabFood | https://www.grab.com/sg/food/ | Delivery-tier naming, 10-question FAQ |
| GrabExpress | https://www.grab.com/sg/express/ | Parcel tiers, prohibited-items list, cancellation wording |
| GrabPay Wallet | https://www.grab.com/sg/consumer/finance/pay/ | Wallet vocabulary + the `GrabPay` vs `GrabPay Wallet` disambiguation |
| Trust and Safety | https://www.grab.com/sg/about/trust-and-safety/ | Safety-feature name inventory, policy list |
| Homepage (ID) | https://www.grab.com/id/ | Bahasa Indonesia; the cross-market naming divergence |
| Help Centre (passenger) | https://help.grab.com/passenger/en-sg/ | **BLOCKED** — "Oops! Something went wrong / Please enable Javascript in your browser options" |
| Help Centre: Transport | https://help.grab.com/passenger/en-sg/115001244167-Transport/ | **BLOCKED** — same JS gate |

---

## T1 Navigation & IA labels — PRIORITY

**The top-level model is four *audiences*, then services inside each.** `[observed]`

Mega-menu tabs: `About` · `Consumer` · `Driver` · `Merchant` · `Enterprise`

This is the defining IA decision. Grab does not present its ~20 services as one list; it presents four marketplace roles, and the *same service name appears under more than one role with a different description*. `GrabExpress` appears three times:

| Under | Description (verbatim) |
|---|---|
| `Consumer` | "Send things easily and quickly" |
| `Merchant` | "An on-demand delivery service that fulfils your customers' orders seamlessly" |
| `Enterprise` | "Book and manage package deliveries for your company" |

One brand, three audiences, three value propositions, zero name change. Same for `Financial services` (three entries, three descriptions), `Help Centre` (three entries, three different URLs), `What's New` (four entries). **The service name is the constant; the description is the variable.** That is the whole Grab navigation grammar in one line.

**Every mega-menu item is a name + a one-line scope sentence** `[observed]` — the Wise pattern, applied at greater scale:

| Item | Scope line (verbatim) |
|---|---|
| `Rides` | "Everything to do with getting you from A to B" |
| `GrabFood` | "Everyday food options for every occasion" |
| `GrabMart` | "Find everything you need" |
| `GrabExpress` | "Send things easily and quickly" |
| `Grab DineOut` | "Discover restaurants, book tables and save with deals" |
| `GrabCoins` | "Exclusive privileges you'll enjoy as a Grab user" |
| `GrabGifts` | "Give the Gift of Grab! Practical gifts don't have to be boring" |
| `Grab For Family` | "Now you can track and pay for family's rides" |
| `GrabExec Limo` | "Your seamless and luxurious rides in Singapore" |
| `GrabDefence` | "Protect your mobile app from fraud" |
| `GrabMaps` | "Hyperlocal mapping technology and location data solutions for businesses" |
| `GrabAcademy` | "The one-stop to your training needs, through every phase of your partnership with us." |
| `Grab Financial Group` | "Financial services that are accessible and affordable to all" |
| `GrabForGood Fund` | "Our endowment fund empowering the communities of Southeast Asia" |

The scope line is doing load-bearing work precisely because the coined names are opaque — `GrabCoins` and `GrabGifts` are not self-describing, and `GrabDefence` would be unguessable. The scope sentence is the disambiguation mechanism that makes a 20-name brand system navigable.

**The homepage body uses a *different* label set from the mega-menu.** `[observed]`

Homepage service grid, grouped into six clusters with the brand prefix **stripped**:

- `Deliveries` → `Food` · `Mart` · `Express`
- `Mobility` → `Rides`
- `Dining` → `Dine Out`
- `Financial Services` → `Pay` · `Insurance`
- `Others` → `Grab Experiences` · `Gift cards` · `Rewards`
- `Earn with Grab` → `Drive with us` · `Deliver with us`
- `Grow your business` → `Sell with us` · `Payments with us` · `Deliver with us`
- `GrabForBusiness` → `Express` · `Food` · `Business rides` · `Financial services` · `Gift cards` · `Ads`
- `GrabDefence` → `Fraud Management`

So `GrabFood` in the nav is `Food` on the homepage; `GrabPay` is `Pay`; `GrabCoins` is `Rewards`; `GrabGifts` is `Gift cards`. **Two complete naming registers for one service catalogue, on one page.** The mega-menu is the brand register; the homepage grid is the plain register. The user meets both within one scroll.

Note also that `Deliver with us` appears **twice on the same homepage**, once under `Earn with Grab` (courier recruitment) and once under `Grow your business` (merchant fulfilment) — same label, two entirely different audiences and destinations.

**Cluster headings are category abstractions, not products** `[observed]`: `Deliveries` · `Mobility` · `Dining` · `Financial Services` · `Others`. `Others` as a live cluster heading containing three real products (`Grab Experiences`, `Gift cards`, `Rewards`) is a visible IA capitulation — the taxonomy ran out before the catalogue did.

**Progressive disclosure on the service grid** `[observed]`: `Show More Services` / `Show Less Services`. The plural noun is inside the toggle label, so the control names what it reveals.

**Utility nav** `[observed]`: `GrabX` · `Be Our Partner` · `Help Centre` · country selector (`Grab Singapore`). `GrabX` — an annual product-event brand — occupies the first utility slot, ahead of Help. `Be Our Partner` is the only nav label in the imperative-request mood.

**`Be Our Partner` submenu is role-first, and the roles are named as jobs** `[observed]`: `Grab Driver` · `Food Delivery Driver` · `Express Delivery Driver` · `Food / Mart Merchant` · `Pay Merchant`. Note `Pay Merchant` — the payments-acceptance merchant is a distinct recruited role from the food merchant, and the label compounds a service name with a role noun.

**Footer repeats the four-audience structure plus `Quick Links`** `[observed]`: `About` · `Consumer` · `Driver` · `Merchant` · `Enterprise` · `Quick Links`. `Quick Links` holds `Help Centre`, `Food Menu`, `Developer Portal`, `Tech Blog` — a consumer support route and a developer route in the same four-item box.

**Indonesian navigation localises the *structure* labels but keeps the *brand* names** `[observed]`, and this is the sharpest cross-market finding:

| SG label | ID label | What happened |
|---|---|---|
| `About` | `Tentang Grab` | Translated |
| `Consumer` | `Pengguna` | Translated |
| `Driver` | `Pengemudi` | Translated |
| `Merchant` | `Mitra Penjual` | Translated ("selling partner") |
| `Enterprise` | `Perusahaan` | Translated |
| `Rides` | `Transportasi` | Translated |
| `GrabFood` | `GrabFood` | **Kept** |
| `GrabMart` | `GrabMart` | **Kept** |
| `GrabExpress` | `GrabExpress` | **Kept** |
| `GrabPay` (SG consumer finance) | `Pembayaran Grab` | **Un-branded and translated** — "Grab Payment" |
| `GrabCoins` | `GrabRewards` | **Different brand entirely** |
| `Help Centre` | `Pusat Bantuan` | Translated |
| `GrabDefence` | `Grab Defense` (in body copy) | **Respelled and re-spaced** |

`Pembayaran Grab` is the one that matters: the wallet — the most brand-critical asset in the portfolio — is the *only* service whose coined name was dissolved into a descriptive phrase in Indonesian. (The wallet brand in Indonesia is `OVO`, named separately on the same page, which explains it: Grab could not own the payment brand in that market, so the nav label retreated to a generic.) **The naming system holds everywhere except where a local brand already occupies the slot.**

**ID-only services with no SG equivalent** `[observed]`: `GrabKios` · `GrabJastip` · `GrabMart Kilat` · `Clean & Fix` · `Paket Hemat` · `Pulsa / Token` · `Pembayaran Tagihan` · `Kesehatan` · `Hotel`. Two of these break the naming rule outright — `Clean & Fix` carries no brand prefix at all, and `Paket Hemat` ("value package") is a plain Indonesian noun phrase where Singapore would use `GrabUnlimited`.

## T2 Value proposition & headline patterns

**Hero is a three-word claim with an internal line break** `[observed]`

> `Grab. Making every day better.` (SG)
> `Grab. Jadikan Setiap Hari Lebih Istimewa.` (ID) [*"Grab. Make every day more special."*]

Brand name, full stop, gerund phrase. The Indonesian is *not* a literal translation — `Istimewa` ("special") is a stronger claim than `better`, and the mood shifts from participle to imperative. Transcreated, not translated.

**Self-description evolves across three surfaces** `[observed]`:
- Page title: `Grab. The Everyday Everything App`
- Meta: "Grab is Southeast Asia's leading superapp."
- Homepage subhead: "From essential services to earning opportunities. We're an all-in-one platform."
- ID meta: "Grab adalah superapp terdepan Asia Tenggara" [*"Grab is Southeast Asia's leading superapp"*]
- ID tagline: `Grab. Satu aplikasi semua bisa` [*"Grab. One app, everything's possible"*]

Four labels for what the thing is: `The Everyday Everything App`, `superapp`, `all-in-one platform`, `Satu aplikasi semua bisa`. The Indonesian tagline is the clearest of the four.

**GrabX reframes the category away from services entirely** `[observed]`:

> `GrabX 2026: Your Everyday Guide`
> "We're no longer just the app that gets you from A to B, or brings food to your door. Today, Grab is your intelligent guide for daily life, working in the background to anticipate your needs and helping your day run a little smoother."

This is a **category-exit paragraph** — it names the two things the brand is known for, negates them as sufficient, and installs a new noun (`guide`). Note `working in the background` and `anticipate` — the value prop moves from on-demand to ambient. A content designer should read this as the strategic pivot the naming system will have to absorb next.

**Product-page headlines are long, SEO-shaped, and tonally inconsistent with the homepage** `[observed]`:
- `Going somewhere? Let our reliable taxi service transport you there`
- `Satisfy every craving with our exceptional online food delivery service`
- `Send your items easily and quickly across the city with express delivery`
- `Go Cashless, Be Rewarded`

The first three carry visible keyword freight ("reliable taxi service", "online food delivery service", "express delivery"). `Go Cashless, Be Rewarded` is the only one written as a proposition rather than a search target — two imperatives, parallel, four words.

**The "Why X is the best…" numbered-benefit pattern is used on all three service pages** `[observed]`, with numbers rendered as the visual anchor:

| Page | Heading | Benefits |
|---|---|---|
| Rides | `Why Grab is the best ride hailing app in Singapore` | `Upfront pricing` · `Stay on top of your rides` · `Cashless convenience` |
| Food | `Why GrabFood is the best food delivery app in Singapore` | `Discover your next meal` · `Something for everyone` · `Wallet-friendly, palate-pleasing` |
| Express | `Why GrabExpress is the best parcel & courier delivery service in Singapore` | `Delivery for items big and small` · `Competitive pricing` · `Track your delivery in real time` · `Default cover for up to S$500` |

`Wallet-friendly, palate-pleasing` is the only one with any craft in it — parallel compound adjectives, alliterative. The rest are functional.

**GrabX feature headlines are the strongest copy on the estate** `[observed]` — each is a full sentence with a rhythm:
- `First built for driver-partners, now for everyone.`
- `Food inspo, community, and action in one place.`
- `All the savings of sharing a ride, none of the hassle.`
- `More choices, one order, happier mealtimes.`
- `Messy notes to a full cart in seconds.`
- `Quick funds for life's unexpected moments.`
- `A trusted travel partner that's always two steps ahead.`
- `Booking a last-minute hotel is now as easy as getting a ride.`
- `One way to pay. Across local QRs in Southeast Asia.`
- `CCTVs, upgraded with an AI brain.`
- `Turning smartphones into card machines.`
- `Orders go straight to the chef. No more bottlenecks.`

Two recurring devices: **before→after compression** (`Messy notes to a full cart in seconds`, `Turning smartphones into card machines`, `CCTVs, upgraded with an AI brain`) and **have-without-cost** (`All the savings of sharing a ride, none of the hassle`). The body copy under them is unusually colloquial for Grab — "Ahh, peace at the dinner table restored", "It's grocery shopping with a lot of the 'ugh' taken out", "basically anyone but a robot".

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Download App` | Homepage hero, every product hero | Title-cased both words |
| `Download Grab app` | GrabPay page | **Different capitalisation and article** for the same action |
| `Read About Us` | Homepage hero | CTA text = destination page title |
| `Book A Ride` | Rides hero | `A` capitalised mid-phrase |
| `Book Now` | Rides page foot | |
| `Book now` | Express hero | **Same words, different case, adjacent pages** |
| `Book a delivery` | Express page foot | |
| `Order Now` | Food hero | |
| `order now` | Food page foot | **Lowercase variant of its own hero CTA on the same page** |
| `Start using GrabPay` | GrabPay hero and foot | Verb + product |
| `Join Grab Early Access` | GrabX | Names a programme |
| `Learn more` | Trust page, insurance tiles, GrabX ×12 | Bare, high-frequency |
| `Learn More` | Homepage impact cards, About block | **Capitalised variant of the same bare CTA** |
| `Read More` | Newsroom cards | |
| `Show More Services` / `Show Less Services` | Homepage grid | |
| `Show other rides` / `Show less rides` | Rides tier grid | Ungrammatical (`less rides`) |
| `Be Our Partner` | Utility nav | |
| `Drive with us` / `Deliver with us` / `Sell with us` / `Payments with us` | Homepage earn grid | Consistent `<verb> with us` family — the best-governed CTA set on the site |
| `Partner with us` | Merchant mega-menu | Fifth member of that family, different surface |
| `Explore all restaurants` | — | (Careem; not Grab) |
| `Access Dine Out Deals` | Food FAQ answer | CTA embedded inside an FAQ answer |
| `Subscribe now` | — | (Careem; not Grab) |

**The finding:** Grab's `<verb> with us` CTA family (`Drive with us`, `Deliver with us`, `Sell with us`, `Payments with us`, `Partner with us`) is genuinely well-governed — one frame, five instances, immediately legible as "become a supply-side participant". Everything else is not: `Book Now`/`Book now`, `Order Now`/`order now`, `Learn more`/`Learn More`, `Download App`/`Download Grab app` are four casing collisions, two of them **on a single page**. And `Payments with us` is the odd member — a noun where the other four have verbs.

`Show less rides` is a live grammatical error in a production UI control.

## T4 Onboarding & getting-started

No numbered how-it-works sequence on any consumer surface. The closest is `[documented]` inside FAQ answers, where Grab writes procedural steps in bolded-step prose:

**Express tracking, seven bolded steps in one FAQ answer** `[documented]`: `Open the Grab App:` → `Log In:` → `Select "Express":` → `Place a Delivery Order:` → `Track Your Delivery:` → `Receive Notifications:`. Each step is a bolded imperative with a colon, followed by a sentence. The same shape recurs in the Food "order for later" answer (seven steps) and the Rides "how to book" answer (one run-on sentence).

This is a **content-ops signal worth flagging**: a seven-step procedure with screen-by-screen instructions is living inside an accordion on a marketing page, and its answer ends with a hedge — "Keep in mind that specific details may vary based on the app's updates, so it's recommended to check the app for the most accurate information". The copy knows it will go stale and says so. Two of the Express FAQ answers are also visibly broken: `What kind of GrabExpress services are there?` begins mid-sentence ("which offers logistics solutions for your business.."), and `What hours does GrabFood online delivery operate?` is answered with delivery-fee information rather than hours. **Three defects in two FAQ blocks.**

**GrabX onboarding for the beta programme** `[observed]`: "Want to try new features before anyone else? / Scan to join Grab Early Access" — question, then instruction, then a QR code. The question-as-qualifier is doing segmentation work before the ask.

## T5 Form & field labels

`[absent]` on the consumer surfaces harvested — no unauthenticated form. All booking and payment entry is app-gated.

Adjacent artefacts `[documented]` from FAQ answers, where in-app control labels are quoted:
- `"Payment method"` — checkout page control (Food)
- `"Cash"` — payment-method option (Food)
- `"Message"` then `"Chat"` — two-step control to reach the driver (Rides)
- `Activity` — "tap Activity on the bottom navigation bar" (Express) — names the tab bar and one of its items
- `Cancel` — "Simply tap on your booking and select Cancel." (Express)
- `Book Another Delivery` (Express)
- `"ASAP"` or `"Schedule"` — delivery-time options, quoted with the note "depending on the app's interface" (Food)
- `Pickup` — "Select Pickup as you checkout as an alternative to Delivery." (Food)

The hedging around `"ASAP" or "Schedule"` ("This may be labeled as…") is a marketing page admitting it does not know its own product's label. Recorded as a negative finding.

## T6 Status & state language

`[documented]` only, and thin because the help centre is blocked.

**Delivery-tier states, GrabFood** `[observed]`: `Standard`, `Priority` and `Saver Delivery` are named speed tiers — "Now you can choose between Standard, Priority or Saver Delivery, depending on how hungry you are." The selection criterion offered to the user is an appetite state, not a time or a price. Also `Instant & scheduled delivery` and `Pickup` as fulfilment modes, and `order up to 2 days in advance`.

**Express tiers are vehicle-and-time nouns** `[observed]`: `Bike` · `Car` · `Large` · `4-hour`. Three of the four name the vehicle; the fourth names the SLA. Each carries its own operating window, published as a list:

> Bike: 7 am to 11 pm / Car: 8 am to 10 pm / Large: 8 am to 9 pm / 4 Hours: 9 am to 6 pm (deliveries may be made up to 10 pm)

The parenthetical on the last line is the interesting bit — the booking window closes at 6 pm but delivery may land at 10 pm, and Grab states the gap rather than eliding it. Note also the casing drift `4-hour` (tier name) vs `4 Hours` (hours table) on one page.

**Concurrency is a named, numbered state** `[documented]`: "you can schedule up to 10 concurrent GrabExpress bookings" and "you can also book one transport service and make GrabFood order(s) while you have ongoing GrabExpress deliveries." A super-app has to document *which services can be in flight simultaneously* — a state-model problem single-service apps never face. Grab publishes it as a rule with a number.

**Payment states** `[documented]`: `Outstanding payments` and `temporary authorisation hold` are not Grab terms observed here (those are Careem's). Grab's observed payment-state vocabulary is `GrabPay balance`, `topped-up balance`, `transaction history`, `instant payment notifications`.

**Safety monitoring named as a continuous state** `[observed]`: `Trip monitoring` — "Grab continuously monitors the ride to detect unsafe scenarios and sends an alert to users in case they need any support." And `Fatigue Nudge` — a driver-side state trigger with a threshold: "if drivers have exceeded the recommended threshold of hours".

## T7 Error, failure & recovery

`[absent]` as a help-centre corpus — blocked. What is reachable is limited and marketing-framed:

**Cancellation wording, Express** `[observed]` — the only genuine unhappy-path copy in the harvest, and it is good:

> "You can cancel your booking any time before the delivery-partner picks up your item. Simply tap on your booking and select Cancel.
> If your delivery-partner asked you to cancel the booking, you are under no obligation to do so. The delivery-partners agree to honour accepted bookings and are encouraged not to cancel except in an emergency."

Two moves worth stealing. First, it names a **specific adversarial scenario** (the courier pressuring the customer to cancel, which shifts the cancellation penalty) and tells the user their position: `you are under no obligation to do so`. Second, it states the counterparty's obligation in the same breath, so the user knows the norm they are being asked to breach. Most platforms handle courier-initiated-cancellation pressure silently in ops. Grab writes it into consumer-facing copy.

**No cancellation fee is stated anywhere in the harvest** — not for rides, not for food, not for Express. Recorded as `[absent]`, not as "free". The fee schedule presumably lives in the blocked help centre or the Terms of Service.

**Prohibited-items list, Express** `[observed]` — a 14-item "cannot be delivered" list against a 5-item "can be delivered" list, with parenthetical examples on the ambiguous ones: "Valuable items and documents (e.g. cash, passport, or other official identification documents)", "Illegal items and substances (e.g. pornographic magazines and imitation weapons)", "Items that cannot be reproduced (e.g. photos, film)". The last of those is a genuinely thoughtful category — it defines the risk by *irreplaceability* rather than by object type, which covers cases a list never could. Also a value ceiling stated twice in different units: "Items of an aggregate value exceeding S$500" in the list, and "Default cover for up to S$500 … Top up for cover of up to S$2,000 with Delivery Guarantee" in the benefits.

**Food-quality reporting named as a feature** `[observed]`: `Food standards report` — "Make a report about the safety and quality of the food delivered to you, and provide feedback to help us and our merchant-partners improve."

## T8 Empty states

`[absent]`. None reachable. The one no-content state observed is the blocked help centre's own error page, which is worth recording as an artefact of Grab's error writing even though it is not a product state:

> `Oops! Something went wrong`
> "Please enable Javascript in your browser options or try another browser."
> `Please enable Javascript` (link) · `Refresh` (button)

`Oops!` plus a generic title plus a technically-specific instruction, rendered twice on the same page with two different action sets. The error tells the user to change a browser setting — an instruction most users cannot action — and the `Refresh` button will not fix the stated cause. A negative example: the title is tonally light, the diagnosis is accurate, and the remedy is useless.

## T9 Notifications & system messages

`[observed]`, mostly as feature descriptions rather than message strings:

- `Security email alerts` — "Alerts are sent to the email address on the user's account when a device change is detected or a new social account is linked." Two named triggers.
- `instant payment notifications` (GrabPay)
- `Fatigue Nudge` — "timely reminders to get sufficient rest will be sent". `Nudge` used as a product noun for a driver-welfare message type.
- `Driving Safety Report` — "Drivers are provided a customised safety report in-app, with detailed breakdowns of where exactly the unsafe event took place." An after-the-fact report as a named artefact, with location specificity as the differentiator.
- `Receive Notifications:` — in the Express tracking steps, "Grab may also send you notifications or updates about the delivery status, including when the driver is on the way and when the delivery is completed." Two named delivery-notification moments.
- `Notifikasi pembelian GoFood Pickup` — (Gojek, not Grab)

**ID-only, and the most striking notification-adjacent copy in the harvest** `[observed]` — the Indonesian footer publishes an anti-impersonation notice as standing content:

> "Grab Indonesia hanya akan menghubungi Anda melalui nomor berikut:" [*"Grab Indonesia will only contact you via the following numbers:"*]
> `Konsumen & Mitra Pengemudi: +62 21 2350 7078` · `Mitra GrabMerchant: +62 21 2350 7045` · `Tim Cepat Tanggap Grab: +62 21 2350 7077`

A whitelist of legitimate outbound numbers, segmented by audience, in the footer of every page. `Tim Cepat Tanggap Grab` ["Grab Rapid Response Team"] is a named internal team surfaced to users with its own phone number. This is scam-defence content design, and Singapore's footer has no equivalent — a market-specific content response to a market-specific fraud pattern.

## T10 Disclosures, legal & compliance

**The payments code-of-conduct self-declaration is the most distinctive disclosure** `[observed]`, sitting at the foot of the GrabPay page under the heading `Payment Code of Conduct`:

> "GPay Network (S) Pte Ltd declares that it has conducted a self-assessment of its internal policies, processes, systems, and controls against the principles and standards set out in the Payments Industry Code of Conduct (the "Code"), as reviewed by members of the Singapore Fintech Association ("SFA"). As at the date of this self-assessment, GPay Network (S) Pte Ltd considers itself to be a Code Adherent, as defined in the Code…"

Three hedges stacked: `self-assessment`, `as at the date of`, `considers itself to be`. The legal entity (`GPay Network (S) Pte Ltd`) is named rather than the brand, and the coined status (`Code Adherent`) is defined by reference. This is a voluntary-code disclosure written to be precisely as strong as it actually is — useful as a model for any self-certification claim.

**The `GrabPay` vs `GrabPay Wallet` disambiguation is shipped as an FAQ** `[observed]`:

> Q: `What is the difference between GrabPay and GrabPay Wallet?`
> A: "GrabPay is the collective umbrella term for all of our payment services, such as payments via credit/debit cards, partner wallets (e.g. PayPal), and your GrabPay balance. GrabPay Wallet is a licensed e-money wallet containing a topped-up balance."

A brand architecture problem solved with a help answer rather than with a rename. `GrabPay` is the umbrella, `GrabPay Wallet` is one instrument under it, and `GrabPay balance` is the money inside that instrument — three tiers, one prefix, distinguished only by a suffix noun. Note that `PayPal` is named as a `partner wallet`, and that the Food FAQ separately lists accepted methods as "Debit/Credit Cards, GrabPay, Cash, and even PayPal" — using `GrabPay` there in the umbrella sense while sitting beside PayPal as a peer.

**Regulatory/standards name-drops, SG** `[observed]`: `PCI DSS level 1 compliant` (stated three times across two pages, twice with the gloss "the highest standard of security for payments"), `IMDA Data Protection Trustmark (DPTM)`, `ISO 9001:2015 Quality Certification` ("First in the ride-hailing industry globally"), `Florin Awards 2016, Global Payment Summit`. Grab treats certifications as award-shaped trust content, displayed under the heading `Awards and accreditations`.

**Third-party regulatory citation used to justify a product** `[observed]`, the best disclosure line in the harvest:

> Q: `Why is it important to book a GrabFamily ride for my child?`
> A: "The Land Transport Authority (LTA) requires all passengers below 1.35 m to be restrained with age-appropriate safety devices, when travelling in a private vehicle. GrabFamily rides are guaranteed to have compliant restraints."

Regulator named, threshold given in the unit a parent can measure (height, not age), then the product positioned as the compliance route. Two sentences, no hedging.

**Premium pricing justified rather than asserted** `[observed]`:

> Q: `Why does GrabPet cost more than a normal Grab ride?`
> A: "A premium is included in GrabPet fares as it's a specialised, on-demand service. GrabPet rides come with added insurance for all pets onboard, as well as a fur-friendly seat cover. Our GrabPet driver partners also receive additional training to transport your pet safely and comfortably."

The question is written from the customer's suspicion (`Why does X cost more`), and the answer itemises three things the premium buys. Compare this to the many products that simply publish a price table.

**Fee transparency claim with an exclusion in the same sentence** `[observed]`: `Upfront pricing` — "Know how much your trip will cost (excluding tolls and surcharges) before you book." The parenthetical undercuts the headline claim inline rather than in a footnote. Honest, and slightly self-defeating; a Wise-style qualifier placed *after* the promise would read better.

**Policies listed as a named set** `[observed]`, on the Trust and Safety page under `Our policies` — "These policies help create a safer everyday for everyone": `Terms of Service: Transport, delivery and logistics` · `Terms of Service: Payment and Rewards` · `Terms of Service: PayLater` · `Terms of Service: Insurance` · `Privacy Policy`. Four separate Terms of Service documents, split by product line and named with a colon-suffix convention. **Every entry in the list is rendered twice in the DOM.**

**ID-only consumer-redress disclosure** `[observed]`: the Indonesian footer names the government consumer-protection body and gives its WhatsApp number — `Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga / Kementerian Perdagangan Republik Indonesia / Whatsapp Ditjen PKTN: +62 853 1111 1010`. A regulator escalation path in the page footer, absent from Singapore.

## T11 Help-centre architecture

`[absent]` — **blocked**. `help.grab.com/passenger/en-sg/` and a category URL both return the JS-required error page. What is recoverable is the *shape* of the help IA from link structure only:

- Three separate help centres by audience, on three URL patterns: `help.grab.com/passenger/en-sg/`, `help.grab.com/driver/`, `help.grab.com/merchant/en-sg/`
- Locale is in the passenger and merchant paths (`en-sg`, `id-id`) but **not** in the driver path
- Category URLs are ID-plus-slug: `115001244167-Transport`, `115002258448-Food`, `360000020627-Delivery`, `4405166181657-GrabPay`, `115001244167-Transport`
- So four top-level passenger categories are inferable from deep links on the marketing pages: **Transport**, **Food**, **Delivery**, **GrabPay**. Note `Delivery` (not `Express`) as the help category for a service branded `GrabExpress` — a fifth register for that service.
- ID-specific deep link: `4402993263001-Bagaimana-cara-menghubungi-Kementerian-Perdagangan-terkait-pengaduan-konsumen` [*"How to contact the Ministry of Trade regarding consumer complaints"*] — a help article about escalating to a government regulator, linked from the Indonesian footer.
- Routing furniture on marketing pages is consistent: `Got questions? We've got answers.` then "For more questions, please visit our Help Centre" with a **deep link to the relevant category**, not the help home. Self-service is routed by topic, not dumped at the index.

## T12 FAQs

Three FAQ blocks harvested, all accordion, all with server-rendered answers.

**Rides — `FAQs` / `Got questions? We've got answers.`, 9 questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How can I pay for my ride? |
| 2 | How can I contact my driver? |
| 3 | Can the driver see my number? |
| 4 | Why is it important to book a GrabFamily ride for my child? |
| 5 | Why does GrabPet cost more than a normal Grab ride? |
| 6 | What are the services and coverage of the Grab taxi mobility app in Singapore? |
| 7 | How to book a grab taxi in Singapore? |
| 8 | Can I pay for my taxi ride using a credit card or mobile payment methods? |
| 9 | Can I book a taxi in advance for a specific time or location? |

**Two visibly different authorship batches.** Q1–Q5 are product questions in natural user voice, two of them `Why…?` questions about specific named services. Q6–Q9 are SEO questions — keyword-stuffed ("the Grab taxi mobility app in Singapore"), ungrammatical ("How to book a grab taxi in Singapore?" with lowercase `grab`), and redundant with Q1 and Q8, Q9. Q8 re-asks Q1. The block has been extended for search and the join is visible.

**Food — 10 questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How much does it cost to order food delivery from GrabFood? |
| 2 | What hours does GrabFood online delivery operate? |
| 3 | What are your hours? |
| 4 | How can I pay for GrabFood? |
| 5 | How does Cash on Delivery work? |
| 6 | How do I use GrabFood for Dine Out Deals and Pickup? |
| 7 | What food delivery app works in Singapore? |
| 8 | Can I order food for someone else in Singapore? |
| 9 | How do I order grab food for later? |
| 10 | How much is food delivery in Singapore? |

Q2 and Q3 ask the same thing in two registers, **and Q2's answer is about delivery fees, not hours** — the Q3 answer is the correct one for both. Q7 ("What food delivery app works in Singapore?") is an SEO question the brand answers by naming itself. Q9 renders the brand as lowercase two words (`grab food`). Q1 and Q10 are the same question.

Q5's answer is the best-written in the set — it anticipates a specific friction: "do remember to prepare sufficient cash for your order, to avoid any delays… while all delivery-partners carry change, do drop them a message via GrabChat if you're planning to use larger notes, so they can ensure that they have enough change." It names the tool (`GrabChat`), the trigger (`larger notes`) and the reason (`so they can ensure`).

**Express — 8 questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What kind of GrabExpress services are there? |
| 2 | Where do you deliver? |
| 3 | What are your operating hours? |
| 4 | Can I make more than one GrabExpress booking? |
| 5 | What items can I send with GrabExpress? |
| 6 | Can I cancel my GrabExpress delivery? |
| 7 | How long does express delivery take in Singapore? |
| 8 | How do I track my GrabExpress delivery? |
| 9 | Is Grab Express a door to door service? |

Q1's answer is **truncated at the front** ("which offers logistics solutions for your business..") — a live content defect. Q9 spells the brand `Grab Express` with a space, the only such instance in the harvest. The block is otherwise the best-ordered of the three: what → where → when → how many → what's allowed → how to stop → how long → how to watch.

**Cross-block structural note.** All three blocks sit under the identical heading pair `FAQs` / `Got questions? We've got answers.` with an identical routing line beneath. The furniture is templated and governed; the questions inside it are not.

## T13 Terminology & glossary — PRIORITY

### The naming grammar

**The rule: `Grab` + a capitalised English noun, closed up, no space.** `GrabFood`, `GrabMart`, `GrabExpress`, `GrabPay`, `GrabCoins`, `GrabGifts`, `GrabAds`, `GrabMaps`, `GrabDefence`, `GrabFinance`, `GrabAcademy`, `GrabChat`, `GrabPIN`, `GrabRewards`, `GrabBenefits`, `GrabSupport`, `GrabScholar`, `GrabStays`, `GrabMore`, `GrabUnlimited`, `GrabKios`, `GrabJastip`, `GrabGrosir`, `GrabModal`, `GrabPet`, `GrabFamily`, `GrabMerchant`.

Two structural properties of the rule:
1. **The second element is almost always a noun, never a verb.** Unlike Bolt (`Bolt Drive`, `Bolt Send`) and Gojek (`GoRide`, `GoSend`, `GoShop` — all verbs), Grab compounds with the *object* or *category*, not the action. `GrabFood`, not "GrabEat". `GrabExpress`, not "GrabSend". This is the single clearest cross-product distinction in the three super-apps in this corpus.
2. **The noun is English even in non-English markets** — `GrabFood` and `GrabExpress` are unchanged in the Indonesian nav. Where a *local* noun is used, it is a new coinage, not a translation: `GrabKios` (kiosk/warung), `GrabJastip` (from *jasa titip*, proxy-buying), `GrabGrosir` (wholesale). So Indonesia gets Indonesian-language brands for Indonesia-specific services, and English-language brands for the global ones.

### Verbatim service-name inventory (observed only)

**Consumer, SG** `[observed]`: `GrabFood` · `GrabMart` · `GrabExpress` · `Grab DineOut` · `GrabCoins` · `GrabGifts` · `GrabPay` · `GrabPay Wallet` · `GrabPay Card` · `GrabRewards` · `GrabUnlimited` · `Grab For Family` · `GrabFamily` · `GrabPet` · `GrabExec Limo` · `Grab Experiences` · `Ride Cover` · `PayLater` · `Advance Booking` · `Grab Culinary Tours` · `Dine Out Deals`

**Business/enterprise, SG** `[observed]`: `Grab for Business` · `GrabForBusiness` · `GrabAds` · `GrabFinance` · `GrabDefence` · `GrabMaps` · `GrabMerchant` · `Business Delivery Service`

**Partner-facing, SG** `[observed]`: `GrabAcademy` · `GrabBenefits` · `GrabBenefits 2.0` · `Driver Centre` · `Grab Emerald Circle Scholarships & Bursaries` · `GrabAcademy RideSafe 2026`

**Safety and platform, SG** `[observed]`: `GrabChat` · `GrabPIN` · `AudioProtect` · `Quiet Ride` · `Safety Centre` / `24/7 Safety Centre` · `Trip monitoring` · `Fatigue Nudge` · `Driving Safety Report` · `Food standards report` · `Fairplay programme` / `Grab FairPlay programme` · `Safe Communications` · `Number masking` · `Share my ride` · `Emergency button`

**GrabX 2026 launches** `[observed]`: `GRABMAPS FOR CONSUMERS` · `DISCOVER BY GRAB` · `GROUP RIDE` · `GRABMORE` · `GRAB SHOPPING AGENT` · `CASH LOAN` · `PERSONALISED TRAVEL EXPERIENCE` · `GRABSTAYS` · `GRABPAY FOR TRAVEL` · `VIRTUAL STORE MANAGER` · `TAP TO PAY` · `CLOUD PRINTER` · `Grab Early Access`

**ID-only** `[observed]`: `GrabKios` · `GrabJastip` · `GrabMart Kilat` · `GrabGrosir` · `GrabModal` · `GrabScholar` · `GrabMerchant` · `Grab Defense` · `Clean & Fix` · `Pembayaran Grab` · `Paket Hemat` · `GEBUK JUDOL` · `Grab Ventures Velocity (GVV)` · `Kota Masa Depan` · `PAKEM` · `Jaminan On Time Kejar Pesawat` · `OVO` · `OVO Modal Usaha`

### Where the naming system breaks down

**1. The flagship ride services have lost their brand names entirely.** `[observed]` — the most important finding in this file.

The Singapore rides page lists thirteen ride options, and **not one of them uses the `Grab`+noun form**. They use a pipe-delimited descriptive system instead:

`Standard | Car or taxi` · `Standard | 4 seater (Car)` · `Metered Taxi` · `Standard | Taxi (fixed fare)` · `Premium` · `Premium | Executive` · `Limo | Executive` · `Saver | Share` · `Saver | Hitch` · `Kid | 4 seater (age 4-7)` · `Pet | 4 seater` · `Wheelchair | Storage only` · `Wheelchair | Storage + assistance` · `Wheelchair | Ramp + assistance` · `Rent by the hour`

Grouped under six category headings: `Everyday` · `Premium` · `Saver` · `Kid-friendly` · `Pet-friendly` · `Wheelchair-friendly` · `Value-added`.

The grammar is `<Tier> | <Vehicle or capability> (<qualifier>)`. It is systematic, self-describing, and completely unrelated to the brand-compound system used everywhere else in the app. A user reading the nav sees `GrabFood`, `GrabMart`, `GrabExpress`; the same user opening rides sees `Saver | Hitch` and `Wheelchair | Ramp + assistance`.

**And the old brand names survive only in the FAQ underneath.** The same page's FAQ says `GrabFamily ride` and `GrabPet`, and the tier grid says `Kid | 4 seater (age 4-7)` and `Pet | 4 seater`. **The product has been renamed and the FAQ has not.** A user who reads the FAQ answer "book a GrabFamily ride for my child" and then goes to book will not find that label. This is the clearest documented instance in this corpus of a naming system being retired in one layer and left standing in another.

Note also: `GrabCar` and `GrabBike` — the names most associated with this product globally — **do not appear anywhere in the harvest**, in either market. Indonesia's nav says `Pengemudi Car` and `Pengemudi Bike` (role + English vehicle noun), not `GrabCar`/`GrabBike`. Recorded as not-observed rather than as retired; an in-app pass would be needed to confirm.

**2. The prefix is applied inconsistently even within one brand.** `[observed]`

| Collision | Where |
|---|---|
| `GrabDefence` vs `Grab Defense` | SG nav vs ID body copy — spelling *and* spacing |
| `Grab for Business` vs `GrabForBusiness` | Mega-menu vs homepage grid heading |
| `GrabExpress` vs `Grab Express` | Product page vs its own FAQ Q9 |
| `GrabCoins` vs `GrabRewards` | SG consumer nav vs ID nav vs the SG homepage label `Rewards` — three names, one loyalty product |
| `Grab For Family` vs `GrabFamily` | Nav (spaced, capital F) vs FAQ (closed up) |
| `Grab DineOut` vs `Dine Out Deals` vs `Grab Dine Out` | Nav vs Food page vs ID merchant nav |
| `Fairplay programme` vs `Grab FairPlay programme` | Two capitalisations in two consecutive sentences on one page |
| `GrabPay` (umbrella) vs `GrabPay` (a payment method peer to PayPal) | Same string, two scopes, on two pages |

**3. The homepage strips the prefix; the nav keeps it.** Covered in T1 — `Food`/`GrabFood`, `Pay`/`GrabPay`, `Rewards`/`GrabCoins`. Two registers, one page.

**4. Un-prefixed products sit inside the prefixed catalogue.** `[observed]`: `PayLater`, `Ride Cover`, `Advance Booking`, `Quiet Ride`, `AudioProtect`, `Clean & Fix`, `Moka` — no `Grab`. `AudioProtect` is the interesting one: a *new* 2020s feature name built on a completely different pattern (noun+verb, camel-cased, no brand). The naming system is not being extended to safety features.

**5. The 2026 launches abandon the prefix for descriptive names.** `[observed]`: `GROUP RIDE`, `CASH LOAN`, `TAP TO PAY`, `CLOUD PRINTER`, `VIRTUAL STORE MANAGER`, `PERSONALISED TRAVEL EXPERIENCE` carry no brand element at all, while `GRABMORE`, `GRABSTAYS`, `GRABMAPS FOR CONSUMERS` and `GRABPAY FOR TRAVEL` do. `DISCOVER BY GRAB` uses a third form — a `<noun> by <brand>` construction that appears nowhere else. **Four naming patterns in one twelve-item launch slate.**

### Role and audience terminology

| Term | Grab's usage | Note |
|---|---|---|
| `driver-partner` | Always hyphenated, always compounded — `Grab driver-partners`, `GrabFood delivery-partner` | Never "driver" alone in partner-facing copy |
| `delivery-partner` | The courier | |
| `merchant-partner` | The restaurant/shop | |
| `Driver` (nav) vs `driver-partner` (body) | Unhyphenated in IA, hyphenated in prose | |
| `Mitra Pengemudi` / `Mitra Penjual` | ID equivalents — *mitra* = partner, applied identically | The `-partner` convention survives translation |
| `passenger` / `consumer` / `user` | Three terms for the demand side, used interchangeably | `Consumer` is the nav label; `passengers` in safety copy; `users` in security copy |
| `platform workers` | Used in the Singapore policy content (`Platform Workers Trilateral Group`, `Platform Workers Act 2025`) | The regulatory term adopted alongside the brand term |

The `-partner` suffix is the most consistently applied terminology decision in the entire Grab estate — more consistent than the service names. It is doing employment-classification work: `driver-partner` presupposes a partnership rather than employment, and it appears in every single reference including press releases and welfare-programme descriptions.

### Register split

`Forward Together` (footer motto, both markets) · `Making every day better.` (hero) · `The Everyday Everything App` (title) · `Your Everyday Guide` (GrabX). `Everyday` is the recurring modifier across four different positioning lines — the brand's one stable adjective.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the user; first-person plural for the company, heavily. "We're an all-in-one platform", "We mask the personal contact numbers", "Grab is always on standby", "We're no longer just the app that…". The company frequently refers to itself in the **third person by name** in safety copy ("Grab is always on standby", "Grab continuously monitors the ride") — a distancing move that appears precisely in the sections about monitoring the user.

**Spelling is British, `og:locale` says `en_US`.** `[observed]` — `fulfils`, `prioritise`, `recognised`, `Centre`, `Defence`, `programme`, `customise`, `utilise`. But the Express FAQ uses `labeled` and `prioritize` in two answers, and `Defense` in Indonesian body copy. The SEO-batch FAQ answers are American-spelled; the hand-written copy is British. A second visible authorship seam.

**Register gradient.** GrabX is the loosest copy Grab writes — "Ahh, peace at the dinner table restored", "a lot of the 'ugh' taken out", "basically anyone but a robot", "No IOUs. No chasing. Just savings." Product pages are flat and SEO-shaped. Safety and payments pages are formal and noun-heavy ("best-in-class security frameworks", "stringent processes", "industry-acclaimed standards"). Disclosures are the flattest. The gradient is real and correctly directed — light where nothing is at stake, heavy where money and safety are.

**Numbers as trust devices** `[observed]`, and they are geography-specific: `S$5.2 billion` · `117,000 earning opportunities` · `S$2.5 billion` · `S$4 million annually` · `74 scholarships` · `2,812 bursaries` · `160,000+ trainings` · `23,000+ partners upskilled` · `5,200+` · `400+` · `700+` · `76% of merchant-partners` · `20%` fare saving · `442 airports`. Indonesia's set is entirely different and larger: `99%`, `3.474 pelajar di 171 kota`, `71%`, `Rp382,62 triliun`, `2% dari PDB`, `Rp100 miliar`, `20.000 penerima manfaat`, `Rp50 juta per orang`, `11.000 kendaraan listrik`, `30.000 ton emisi`, `75.000 mitra pengemudi`, `700 mitra pengemudi penyandang disabilitas`, `20.000 mitra pengemudi perempuan`, `4,6 juta peluang kerja`, `Rp6 triliun kepada 445.000 UMKM`, `75 juta interaksi`, `500.000 kunjungan`.

The Indonesian homepage carries roughly **three times the volume of socio-economic-impact content** of the Singapore homepage, and the framing differs: Singapore leads with economic contribution and awards; Indonesia leads with employment, disability inclusion, women's participation, MSME digitisation and an anti-online-gambling programme. This is a licence-to-operate content strategy tuned per market, and it is the clearest evidence in the harvest that Grab's content is regionally authored rather than translated.

**Accessibility content** — no accessibility statement page found in the harvest. `[absent]`

What exists is **accessibility as a ride product**, and it is unusually granular `[observed]`: three distinct wheelchair tiers with different service levels —

- `Wheelchair | Storage only` — "Guaranteed boot space for 1 foldable mobility device"
- `Wheelchair | Storage + assistance` — "Additional assistance for seniors and persons with disabilities who may need extra help"
- `Wheelchair | Ramp + assistance` — "Dedicated service for non-critical wheelchair users"

Three tiers where most platforms ship one. `Guaranteed` is the operative word in the first (it is a reservation of space, not a promise of help). The third uses `non-critical` — a clinical qualifier that tells the user this is not medical transport, without saying so.

**Accessibility defects in the served markup** `[observed]`:
- Every homepage and product-page service tile has its **description duplicated inside the link text**: `FoodHave all your cravings delivered to your doorstep.Have all your cravings delivered to your doorstep.` A screen-reader user hears each tile's description twice inside one link. This affects roughly forty links per page and is systematic, not incidental.
- Every CTA label is doubled the same way: `Book A Ride Book A Ride`, `Download App Download App`, `Learn More Learn More`, `order now order now`. **Every primary action on the site announces itself twice.**
- Carousel content is rendered twice in full (once as slides, once as a list) on the homepage, Rides page, Food page, Express page and Trust page.
- The entire `Our policies` list is duplicated item-for-item.
- A trailing testimonial block (`Komsan Chiyadis / GrabFood delivery-partner, Thailand`) is appended twice to the end of **every single page** harvested, including the Indonesian homepage — with the Singapore content, in English.
- No `Skip to content` link observed.
- Decorative icons and photographs carry empty alt, which is correct.

The doubled link text is the significant one: it is not a rendering artefact of the fetch, it is present in the delivered HTML for every service tile and every button, and it makes the primary navigation surface roughly twice as long to traverse by screen reader.

**Negative findings, recorded honestly**
- Eight brand-name collisions (T13)
- The rides tier grid and its own FAQ use two different, incompatible naming systems for the same products (T13)
- `Show less rides` — live grammatical error in a UI control
- Two FAQ answers are wrong or truncated (Food Q2 answers the wrong question; Express Q1 begins mid-sentence)
- Duplicate questions within blocks (Food Q1/Q10, Food Q2/Q3, Rides Q1/Q8)
- Four casing collisions on CTAs, two of them within a single page
- British and American spelling within one page
- Marketing copy hedging about its own product's labels ("This may be labeled as…")
- Systematic doubled link text and doubled CTA labels across the whole estate
- A Thai delivery-partner testimonial appended to the Indonesian homepage in English
- Help centre entirely inaccessible without JavaScript, with an error page whose suggested remedy cannot fix the stated cause

---

## Transferable patterns

1. **One name, many descriptions — audience-switch the scope line, not the brand.** `GrabExpress` appears under Consumer, Merchant and Enterprise with three different one-liners and no rename. This is the correct way to make a single service legible to multiple marketplace roles, and it is cheaper and safer than sub-branding. Condition: requires a governed one-line scope sentence for every service, which is the actual work.
2. **Coined names need a scope sentence attached at every nav appearance.** `GrabCoins`, `GrabDefence` and `GrabJastip` are unguessable; the nav works only because the scope line is always present. Any product with more than about six coined names should treat the descriptor as part of the label, not as optional chrome.
3. **Compound with the object, not the action, if you want breadth.** `GrabFood`/`GrabMart`/`GrabExpress` (noun) scales to a catalogue in a way `GoRide`/`GoSend`/`GoShop` (verb) does not, because the verb form forces you to have a verb for every new category. Note the trade-off: the noun form is less self-explanatory at first encounter.
4. **Retire a name in every layer or in none.** The rides grid says `Pet | 4 seater`; its own FAQ two screens below says `GrabPet`. When a naming system changes, help and FAQ content is where the old system survives longest and does the most damage — a user who searches the term they read cannot find it.
5. **Name the adversarial scenario in cancellation copy.** "If your delivery-partner asked you to cancel the booking, you are under no obligation to do so" tells the user their rights in a situation the platform would rather not discuss. Transfers to any two-sided marketplace where one side can shift a penalty onto the other — refunds, chargebacks, disputes.
6. **Justify the premium with an itemised answer to the suspicious question.** `Why does GrabPet cost more than a normal Grab ride?` → insurance, seat cover, driver training. Write the question from the customer's doubt, answer it with a list of what the money buys.
7. **Hedge a self-certification exactly as much as it deserves.** "conducted a self-assessment… as at the date of this self-assessment… considers itself to be a Code Adherent" is more credible than a bare compliance badge, and it is reusable wherever a voluntary code, self-attestation or unaudited standard is being claimed.
8. **Regional impact content is not translation work.** Singapore leads on GDP contribution and awards; Indonesia leads on employment, disability inclusion, women drivers and anti-gambling enforcement, with a scam-number whitelist and a regulator escalation path in the footer. Licence-to-operate content must be authored per market against local political salience — translating the Singapore page into Indonesian would have been worse than useless.

## Caveats & gaps

- **The help centre is blocked and this is the dominant gap.** `help.grab.com` is fully client-rendered and returns a JS-required error page on both the index and a category deep link. T6 (status language), T7 (error and recovery), T8 (empty states) and T11 (help IA) are therefore thin or absent, and everything in them is reconstructed from marketing-page FAQ blocks. For a product of this scale that is a substantial hole; the four passenger category names (`Transport`, `Food`, `Delivery`, `GrabPay`) are inferred from deep-link URLs, not observed as rendered labels.
- **No cancellation fee, no-show fee or surge/peak-pricing copy was found anywhere.** Recorded as `[absent]`, and it should not be read as "Grab does not charge these" — the fee language presumably sits in the blocked help centre or in the four Terms of Service documents, none of which were opened.
- **`GrabCar` and `GrabBike` were not observed.** They do not appear on any harvested page in either market. Whether they survive in-app is unverified; an app-store or authenticated pass is needed before treating them as retired.
- **Only two of eight markets harvested.** Grab operates in Singapore, Malaysia, Indonesia, Thailand, Vietnam, Philippines, Myanmar and Cambodia. Thai, Vietnamese and Khmer naming decisions — which would test whether the English-noun rule survives non-Latin scripts — are unharvested. That is the single most valuable next fetch for the naming question.
- **Driver and merchant help centres unharvested** (same JS block). The partner-facing vocabulary, which is where the `-partner` convention and the earnings/incentive language live, is represented here only by nav labels.
- **Grab DineOut, GrabMart, Grab for Business, GrabAds, GrabMaps, GrabDefence, GrabFinance, GrabUnlimited and the insurance pages are unharvested.** The insurance and PayLater surfaces in particular would carry the regulated-product disclosure language that is currently underrepresented.
- **T5 is absent** — no unauthenticated form surface exists; all field labels here are quoted from FAQ prose, not observed.
- The DOM-duplication and doubled-link-text findings are from the served HTML only; how the CSS and ARIA layer handle them was not verified, so the screen-reader impact is **strongly suspected, not confirmed**.
- Indonesian glosses in this file are the harvester's working translations, marked in square brackets. The original strings are quoted verbatim and are the artefact; the glosses are not authoritative.

## Sources

1. https://www.grab.com/sg/
2. https://www.grab.com/sg/grabx/
3. https://www.grab.com/sg/transport/
4. https://www.grab.com/sg/food/
5. https://www.grab.com/sg/express/
6. https://www.grab.com/sg/consumer/finance/pay/
7. https://www.grab.com/sg/about/trust-and-safety/
8. https://www.grab.com/id/
9. https://help.grab.com/passenger/en-sg/ — **blocked (JS required)**
10. https://help.grab.com/passenger/en-sg/115001244167-Transport/ — **blocked (JS required)**
