# 093. Gojek

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Indonesian super-app (motorbike ride-hailing + delivery + digital wallet + lending) |
| Primary URL | https://www.gojek.com/en-id |
| Corpus rank | 093 |
| Benchmark strength (source list) | Super-app service labels |
| Locale / market observed | **en-ID** (the `/en-id/` path — an English shell over an Indonesian product) and **id-ID** (`/id-id/`, Bahasa Indonesia) for comparison. Note: the en-ID homepage serves an **Indonesian `meta-description`** under an English page — locale leakage recorded in T14. |
| Platform observed | Web (desktop marketing + help centre, both server-rendered). GoPay's separate estate at `gopay.co.id` (Bahasa only). |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | PT GoTo Gojek Tokopedia Tbk. GoPay Indonesia "berizin dan diawasi oleh Bank Indonesia" [*licensed and supervised by Bank Indonesia*]; `GoPay Pinjam` (PT Mapan Global Reksa) and `GoPay Later` (PT Multifinance Anak Bangsa) "berizin dan diawasi oleh OJK" [*licensed and supervised by OJK*, the financial services authority]. KYC via **Dukcapil** (civil registry) and **eKTP** national ID surfaced in help titles. |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Full for T1/T13 (the priority sections) — the help centre is server-rendered and yielded ~200 article titles across four product topics. Article bodies not opened; T5 and T8 absent. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (EN) | https://www.gojek.com/en-id | Service-logo wall grouped into three clusters — the T13 core |
| Products | https://www.gojek.com/en-id/products | Full catalogue with one-line descriptors per service |
| Help Center index | https://www.gojek.com/en-id/help | **27 `Browse Topics` labels** — the T11 core |
| Help: GoRide | https://www.gojek.com/en-id/help/goride | ~57 article titles — the T6/T7 core |
| Help: GoPay | https://www.gojek.com/en-id/help/gopay | ~80 article titles — the richest payments-failure corpus in this domain |
| Help: GoPay Later | https://www.gojek.com/en-id/help/gopaylater | 20 titles; BNPL-specific failure vocabulary |
| Help: Safety and Emergency | https://www.gojek.com/en-id/help/safety-emergency | **Renders with an empty topic list** — recorded as a defect |
| GoRide (product) | https://www.gojek.com/en-id/goride | The only numbered how-it-works in the harvest |
| Help: GoFood (ID) | https://www.gojek.com/id-id/help/gofood | ~54 Indonesian titles, for the EN/ID comparison |
| GoPay | https://gopay.co.id (redirect from /en-id/gopay) | Separate brand estate, Bahasa only |

---

## T1 Navigation & IA labels — PRIORITY

**The global nav is startlingly small for a super-app: three groups, eight links.** `[observed]`

`Home` · **Partner with us** (`GoCorp`, `GoAds`, `Careers`) · **Company** (`Products`, `Blog`, `Help`) · locale toggle (`EN`)

Compare Grab, which ships a five-tab mega-menu with ~50 links. Gojek's website nav contains **no consumer services at all** — no GoRide, no GoFood, no GoPay. Every consumer service is reachable only via `Products` or `Help`. The website has been deliberately demoted to a corporate/recruitment surface, and the app is the product. This is a legitimate IA strategy for an app-first market and it is worth recording as the opposite pole from Grab's web-catalogue approach.

Note also that `Products` and `Blog` sit under a group called **`Company`**, not under a services group. The service catalogue is filed as corporate information.

**The homepage presents services as a logo wall under three cluster headings** `[observed]`:

| Cluster | Services (from logo filenames and the matching Products page) |
|---|---|
| `Transport and Logistics` | `GoRide` · `GoCar` · `GoTransit` · `GoBluebird` · `GoSend` · `GoBox` |
| `Food and Groceries` | `GoFood` · `GoDineIn` · `GoMart` · `GoShop` |
| `Business Solutions` | `GoFood Merchant` · `GoCorp` |

The services are rendered as **wordmark images with empty alt text** — there is no text label in the DOM. A screen-reader user gets the three cluster headings and nothing else. Recorded as an accessibility defect in T14 and as a content-strategy observation here: the brand system is so visually established that Gojek ships it as pure image.

**The Products page uses four clusters, and they do not match the homepage's three** `[observed]`:

`Transport & Logistics` · `Digital Wallet` · `Food & Shopping` · `Business`

| Homepage | Products page | What moved |
|---|---|---|
| `Transport and Logistics` | `Transport & Logistics` | `and` → `&` |
| — | `Digital Wallet` | **GoPay has a cluster on Products and no presence on the homepage wall** |
| `Food and Groceries` | `Food & Shopping` | Renamed |
| `Business Solutions` | `Business` | Shortened |

The wallet being absent from the homepage service wall while occupying its own cluster on Products is the structural tell: **GoPay has left the Gojek app's identity**. See T13.

**Cluster descriptors are written as user-need sentences** `[observed]`:

- `Transport & Logistics` — "Need an affordable, comfortable ride, or a fast delivery service? We're here for all your mobility and logistics needs."
- `Digital Wallet` — "Top-ups, bills payment, QRIS and transfers, everything made easy and secure."
- `Food & Shopping` — "Buying food and shopping comfortably. Just open the app."
- `Business` — "Manage your business, from daily operations to running ads and creating promotions."

The first is a question-then-answer; the second is a comma-run of functions (the Wise scope-line pattern); the third and fourth are gerund fragments. Four descriptors, three grammars — the shape is not governed.

Note `QRIS` shipped unglossed in an English-language descriptor. It is Indonesia's national QR payment standard and the copy assumes it needs no explanation, which for the actual audience is correct. A useful reminder that "plain language" is audience-relative, not absolute.

**Per-service descriptors on the Products page — the naming system's self-documentation** `[observed]`:

| Service | Descriptor (verbatim) |
|---|---|
| `GoRide` | "Quick and affordable trips to anywhere" |
| `GoCar` | "Comfortable ride for you, your family, and friends" |
| `GoSend` | "Fast & reliable delivery for your items" |
| `GoBox` | "Hassle-free moving and bulky-item delivery" |
| `GoBluebird` | "One tap away to book a trip with our partners" |
| (GoGreen tile) | "One tap away to book a trip with our partners" |
| `GoPay` | "A light app for sending money and paying for anything, anywhere" |
| `GoFood` | "Hungry? Buy and dine in at home" |
| `GoMart` | "Shop your daily essentials shopping faster and easier" |
| `GoShop` | "Buy anything you need from any store you choose instantly" |
| `GoFood Merchant` | "An app to grow your culinary business and reach Gojek customers through GoFood" |
| `GoPay Merchant` | "Create QRIS in 5 minutes, enjoy free transaction fees, and set payout schedule to any bank" |
| `GoPay Spiker` | "Accept QRIS payments securely with instant sound alert from GoPay Spiker" |
| `Moka` | "A cloud-based POS designed to streamline your business operations" |
| `Midtrans` | "Accept Payment and do disbursements easily" |
| `GoCorp` | "Easier to manage your company's operational cost" |

Three defects visible in this list. `GoBluebird` and the GoGreen tile carry the **identical descriptor**, and the GoGreen tile links to `/gocar` — a copy-paste error that has shipped. `GoMart`'s descriptor is ungrammatical ("Shop your daily essentials shopping faster and easier"). `GoFood`'s descriptor — "Buy and dine in at home" — collides conceptually with the sibling service `GoDineIn`, which is the *opposite* proposition.

**Help-centre topic list is the fullest IA artefact — 27 labels, flat, unordered** `[observed]`. See T11.

**Footer is four groups, all corporate** `[observed]`: `Company` (`About`, `Products`, `Blog`) · `Join with us` (`Driver Partners`, `Merchant Partners`) · `Careers` (`Student`, `Professional`) · `Get in touch` (`Help Center`, `Our Location`). Splitting careers into `Student` / `Professional` as a top-level footer group, while the entire consumer service catalogue gets one link, confirms the corporate-surface read.

**Indonesian nav localises structure and keeps every brand** `[observed]`: `Beranda` · `Gabung jadi Mitra` · `Perusahaan` · `Produk` · `Bantuan` · `Karir` · `Lokasi Kami` · `Mitra Driver` · `Mitra Usaha`. All 27 help topic labels stay in English-form brand names (`GoRide`, `GoPay`, `GoTagihan`) with only the generic labels translated (`My Account` → `Akun Saya`, `Join as Our Partner` → `Bergabung Menjadi Mitra Kami`). Two labels — `Safety and Emergency`, `App Issue`, `Promo Issue`, `Chat`, `GoFood Web` — remain **untranslated English on the Indonesian help centre**. Recorded in T14.

## T2 Value proposition & headline patterns

**Hero is a benefit-noun phrase, not a slogan or a task** `[observed]`

> `Gojek: Your solutions for removing life's daily frictions`

`frictions` is the operative word — an abstract, almost consultancy-register noun where competitors use `everyday`, `everything`, `anywhere`. The construction is `Brand: Your <noun> for <gerund> <abstract problem>`. It is the least concrete hero line of the five products in this cluster, and notably the CTA under it is `Explore Careers` — **the homepage hero converts to recruitment, not to the app.**

**Products-page headline is the strongest line in the harvest** `[observed]`

> `We build products that nations run on`

Plural `nations` (Gojek operates in Indonesia and Singapore), `run on` as infrastructure framing. Meta-description variant: "We build essential products that power nations and drive progress." The self-positioning is national infrastructure, not convenience — a very different claim from Grab's `Everyday Everything App` or Careem's `everything app`.

**App-download headline uses a brand pun** `[observed]`

> `Good to Go? Download the Gojek app today!`

`Go to Go` — the only place the `Go` prefix is played with as English rather than used as a morpheme. The exclamation mark is one of very few in the harvest.

**GoRide product page uses a `Why <service>?` frame with four adjective-pair headings** `[observed]`:

`Fast & Affordable Option` · `No Hassle & Comfortable Trip` · `Guaranteed Safety` · `Reliable Driver Partners`

Three of the four are `<adjective> & <adjective> <noun>`. The body under `Fast & Affordable Option` contains `EVERYDAY LOW PRICE` **in full caps mid-sentence** — "We have EVERYDAY LOW PRICE for your mobility needs." A retail-pricing term shouted inside a prose sentence, singular where English would want a plural. Recorded as a defect and as evidence of a pricing-programme name leaking into body copy.

**Scale numbers are the dominant trust device and they contradict each other** `[observed]`: the homepage says `3 millions driver-partners` in one card and `6,4 millions Merchants within the GoTo ecosystem` in another (both with the ungrammatical plural `millions`, and the Indonesian decimal comma `6,4` left unconverted in English copy). The GoRide page says "more than three million driver-partners"; the meta-description says "Lebih dari 1 juta driver Gojek" [*more than 1 million Gojek drivers*]. **Three different driver counts across three surfaces of one site.**

**Awards used as hero-adjacent proof** `[observed]`, quoted at length with the awarding body named in each: `Consumers' Choice Food Delivery Company (Bisnis Indonesia Logistics Awards 2024)`, `"Public's Favorite Online Transportation App"` and `"Best Online Transportion App That Support Public Transport Integration"` (2024 Jakarta Transportation Council Awards) — note `Transportion`, a typo in a quoted award name, and `Favorite` in US spelling on a page otherwise inconsistent.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Explore Careers` | Homepage hero | **The hero CTA is a jobs link** |
| `Scale with us` | Our scale section | Also a careers link |
| `Become an employee` | Join the ride | |
| `Become a driver-partner` | Join the ride | |
| `Become a merchant` | Join the ride | Three parallel `Become a…` CTAs — the best-governed set |
| `Let's Join` | GoRide driver block | **Fourth variant of the same action**, and ungrammatical |
| `View all products` | Homepage | |
| `View more` | Gojek PLUS block | |
| `Know more` | Products page, ×16 | Non-idiomatic English (`Learn more` is standard); used on every single product tile |
| `App store` / `Play store` | Download blocks | Lowercase `store` in both |
| `Contact Us` | GoRide page | Links to `/our-location` — a **CTA that promises contact and delivers an address page** |
| `FAQ` | GoRide page nav and body | Links to the help topic |
| `Driver Registration` | GoRide page sub-nav | |
| `Selengkapnya` | GoPay site, ×5 | [*"More details"*] |
| `Cek semua promo` | GoPay site | [*"Check all promos"*] |
| `Unduh` / `Download` | GoPay site | Both forms on one page |

**Findings.** `Know more` used sixteen times on the Products page is the signature CTA and it is not idiomatic English — a direct calque of Indonesian usage that has survived into the English locale. It is consistent, which is more than can be said for the `Become a…` family, which gains a fourth member (`Let's Join`) on the GoRide page.

`Contact Us` → `/our-location` is a genuine mis-labelled destination: the user asking to make contact is given a list of office addresses.

## T4 Onboarding & getting-started

**The GoRide five-step how-it-works is the only numbered onboarding sequence in the harvest, and it is unusually good** `[observed]`:

1. `Open Gojek app. Choose GoRide` — "(It's the motorbike icon right on your Gojek home screen.)"
2. `Type in your destination` — "You can type the address manually, or select the location from the map."
3. `Confirm your pickup location` — "Double check your pickup point, add details in the notes if needed. If you're in a public place, you can choose from which gate/specific meeting point you want to be picked up."
4. `Review your booking, choose a payment method, and click 'Find driver'` — "You can pay with cash or cashless method. Don't forget to double-check your addresses!"
5. `Driver is on their way to pick you up` — "Now sit tight 'cause your driver is arriving soon. Enjoy your trip with GoRide."

Four things worth taking. **Step 1 tells the user what the icon looks like** ("It's the motorbike icon right on your Gojek home screen") — in a twenty-service app, visual disambiguation belongs in the onboarding copy, not just in the design. **Step 3 anticipates the hardest coordination problem in Indonesian ride-hailing** — pickup ambiguity in malls, campuses and stations — and names the solution in the user's own terms ("which gate/specific meeting point"). **Step 4 quotes the literal button label** (`'Find driver'`), so the instruction maps to the screen. And **step 5 changes grammatical subject**: steps 1–4 are imperatives to the user, step 5 is a statement about the driver — the sequence hands over at exactly the point the user stops acting.

The register also shifts at step 5: "Now sit tight 'cause your driver is arriving soon." The elided `'cause` is the most colloquial construction in the entire Gojek English estate, and it appears precisely at the moment of waiting. Tone loosens where the user has nothing to do.

Steps are numbered with a **U+2024 one-dot leader** (`1․`, `2․`) rather than a full stop — a typographic choice that will not read correctly to some assistive tech.

**Onboarding appears again as a nine-step in-app procedure quoted inside a help title set** `[documented]`: the `GoPay` topic carries `How to set GoPay PIN`, `How to top up GoPay`, `How to transfer to bank`, `How to transfer to Gojek user`, `How to request GoPay balance`, `Upgrade to GoPay Plus` — a getting-started sequence distributed across the help IA rather than presented as a flow.

## T5 Form & field labels

`[absent]` — no unauthenticated form surface. One literal control label is quoted in onboarding copy: `'Find driver'` (GoRide step 4). Help titles name several in-app fields and features without quoting their labels: `Edit payment feature`, `Edit pick up location feature`, `Saved Addresses Feature in transport services`, `Multidestination feature`, `Fitur Alamat Favorit` [*Favourite Address feature*]. Note the recurring English pattern `<Thing> feature` / `Fitur <thing>` — Gojek's help IA names in-app affordances as "features" explicitly, which is a system-register choice rather than a user-register one.

## T6 Status & state language

The help IA is the map, and it is `[documented]` throughout.

**Trip states named in GoRide help titles** `[observed]`:
- `I can't find a driver` / `Saya tidak mendapatkan driver` — the unmatched state, present in both locales and in both GoRide and GoFood
- `How to cancel my order` — cancellation as a user action
- `Driver can't locate my pick up point` — a named coordination failure state
- `Driver didn't pick up but has completed my order` — **the system-state-versus-reality gap**, given its own article. This is Gojek's equivalent of Wise's "complete when the money hasn't arrived" article: the order status says one thing, the world says another, and rather than fixing the state machine they wrote the reconciling article.
- `On-Trip Report Feature` / `Fitur laporan perjalanan` — reporting *during* the trip is a named capability
- `Schedule a ride feature` / `Fitur jadwalin pesanan` — note the Indonesian slug uses the colloquial `jadwalin` rather than standard `menjadwalkan`
- `Create multiple orders at the same time` — concurrency, the super-app-specific state problem, named as a capability
- `Booking for someone in a different location` — the third-party-booking state

**Order states named in GoFood (ID) help titles** `[observed]`:
- `Kapan pesanan akan dikonfirmasi restoran?` [*When will the order be confirmed by the restaurant?*] — restaurant confirmation is a distinct, user-visible state
- `Kapan saya akan mendapatkan driver` [*When will I get a driver?*] — driver allocation as a separately timed state
- `Driver menyelesaikan transaksi tanpa mengantarkannya` [*Driver completed the transaction without delivering it*] — the GoFood twin of the GoRide article above
- `Pengantaran tanpa kontak langsung` [*Contactless delivery*]

The pair `Kapan pesanan akan dikonfirmasi restoran?` / `Kapan saya akan mendapatkan driver` is a clean piece of state modelling: the user waiting for food is waiting on **two independent actors in sequence**, and Gojek gives each its own "when" article rather than one generic "where is my order".

**Payment and wallet states, GoPay** `[observed]` — the richest state vocabulary in the harvest:
- `GoPay Plus` — a named upgraded wallet tier, with **six articles about its state transitions**: `Upgrade to GoPay Plus`, `Upgrade to GoPay plus is rejected`, `Upgrade to GoPay Plus is not processed`, `GoPay Plus upgrade is rejected because photo does not meet requirements`, `GoPay Plus upgrade is rejected because eKTP is not registered or matched with Dukcapil data`, `GoPay Plus upgrade was rejected due to ID has been registered`, `GoPay Plus status is downgraded to regular because the ID is used in another account`, and — the best of them — `Never upgraded GoPay, but the status is 'Approved'`
- `GoPay balance limit` — a named ceiling
- `Money Back Guarantee` / `Jaminan Saldo Kembali` — a named guarantee with two articles (`What is Money Back Guarantee`, `Money Back Guarantee claim`)
- `Will my balance be deducted on canceled and failed transactions?` — the canonical wallet-state question, asked in the user's words
- Approval status is a user-visible string: `'Approved'` is quoted with quotation marks inside an article title

**`Never upgraded GoPay, but the status is 'Approved'`** is the standout state article in this file. It is written from the position of a user who is *confused by good news* — the system has granted something they did not request, which reads as a security problem rather than a benefit. Almost no product writes help content for unexpected-positive states.

**BNPL states, GoPay Later** `[observed]`: `tenor options (loan periods)`, `Temporary Limit`, `limit` as a countable noun ("My limit was deducted for the failed transactions", "GoPay Later limit has been deducted but there is a transaction verification issue"), `blocked` (`Why am I being blocked?`), `rejected` (`Why was my GoPay Later application rejected?`), `partial payment`, `Early payment`, `unusual activity` (`GoPay Later transaction failed due to unusual activity`).

`tenor` is the Indonesian financial-services term for loan period, and Gojek ships it in an English title **with a parenthetical gloss**: `How many tenor options (loan periods) are available for using GoPay Later?`. Domain term retained, then immediately explained — the Wise `safeguarded` pattern.

## T7 Error, failure & recovery

The GoPay topic alone carries roughly **forty failure-state article titles**, making this the densest payments-failure corpus in the TRAV cluster. Four distinct grammatical shapes are in use.

**Shape 1 — `I <did/experienced>`, first person, confessional** `[observed]`
- `I transferred or topped up GoPay to the wrong phone number`
- `I transferred GoPay to the wrong account`
- `I paid twice for the same order`
- `I forgot to pay my booking to the driver`
- `I haven't received OTP code`
- `I haven't received my GoPay top up`
- `I haven't received my cashback`
- `I left my item`
- `I was harassed by the driver`
- `I was charged for a Platform fee`
- `I experienced a scam`
- `I can't add my credit/debit card`
- `I can't link my Gojek account to my company's GoCorp account`
- `My account was hijacked by someone else`
- `My friend has not received the GoPay transfer I sent`
- `My GoPay is unavailable for some transactions/service`
- `Lost my card balance after transaction got cancelled`
- `My balance was lost after cancelling transaction`

`I was harassed by the driver` sits in the same undifferentiated list as `I haven't received my cashback`. That is worth flagging: the most serious safety report in the GoRide topic has no visual or structural priority over a promo complaint, and the dedicated `Safety and Emergency` topic **renders with an empty list**. The routing for the highest-stakes case is the weakest in the IA.

**Shape 2 — `Driver <did something>`, counterparty as subject** `[observed]`
- `Driver drove unsafely`
- `Driver asked for more payment`
- `Driver is different from the app`
- `Driver was Impolite` (note the stray capital `I`)
- `Driver's vehicle is uncomfortable`
- `Driver didn't pick up but has completed my order`
- `Driver can't locate my pick up point`

Seven driver-behaviour articles, each naming one specific behaviour. `Driver is different from the app` is the sharpest — an identity-mismatch report phrased exactly as a passenger would describe it, and it is a safety article dressed as a factual one. `Driver asked for more payment` is the fare-integrity article that Bolt also ships (`Driver asked cash for in-app payment trip`) — both platforms have found the same failure mode worth its own door.

**Shape 3 — `Can't / Unable to <verb>`, capability failure** `[observed]`
- `Can't make transactions at merchant`
- `Can't pay after reset PIN`
- `Can't pay with credit/debit card`
- `Can't redeem promo code`
- `Unable to top up GoPay`
- `Unable to transfer balance to the bank`
- `I can't use LinkAja to pay order`
- `I can't use Jago to pay my order`
- `Cannot make transactions using GoPay Later`

**Shape 4 — `<Event> failed but <consequence>`, the compound-failure title** `[observed]` — the most distinctive shape in the set:
- `Transaction at online store or other applications failed but my balance was deducted`
- `Transaction at offline store failed but my balance was deducted`
- `GoPay linking to Tokopedia is failed`
- `Payment with GoPay code failed`
- `GoPay Later transaction failed due to unusual activity`
- `GoPay Later limit has been deducted but there is a transaction verification issue`
- `Limit terpotong untuk transaksi yang gagal` [*Limit deducted for failed transactions*]
- `Haven't received balance transfer to bank`
- `Merchant hasn't received my payment`

The `X failed but Y` construction names **both halves of the discrepancy in the title**, which is what the user actually needs to match against. "Transaction failed" alone would not be findable; "but my balance was deducted" is the searchable half. And Gojek ships the online and offline variants as **two separate articles** with otherwise identical wording — a deliberate duplication, because the resolution path differs.

**Reporting and escalation titles** `[observed]`: `Report unknown transaction`, `Report an unknown Apple Store transaction`, `Report an unknown Google Play transaction`, `Melaporkan transaksi yang tidak dikenal`. Three unknown-transaction articles split by **which third-party platform the charge originated on** — Apple, Google, and generic. That is a content-ops decision of the same kind as Wise's named-issuer decline article: specificity at the level of the actual third party.

**Fraud and account-security titles** `[observed]`: `I experienced a scam` (Indonesian slug is far more specific — `saya-mengalami-penipuan-yang-mengatasnamakan-gojek`, [*I experienced fraud committed in Gojek's name*]), `My account was hijacked by someone else`, `How to protect my Gojek account`, `How to protect my compromised account`, `Secure debit/credit card if you lost your phone`, `How to unlink apps that linked to GoPay / GoPayLater`.

**The Indonesian slug is more precise than the English title.** `I experienced a scam` versus *"fraud committed in the name of Gojek"* — the Indonesian names the impersonation vector, the English does not. This happens repeatedly (see T14) and is the clearest evidence that the English titles are a translation layer over an Indonesian-authored corpus.

**Recovery framing worth stealing** `[observed]`: `Secure debit/credit card if you lost your phone` — a conditional-title article that tells the user *when* to read it. The trigger is in the title, not in the body.

## T8 Empty states

`[observed]` — one, and it is a defect rather than a designed state:

The `Safety and Emergency` help topic (https://www.gojek.com/en-id/help/safety-emergency) renders the heading `Safety and Emergency`, then the sub-heading `Topics`, then **nothing**. No articles, no empty-state message, no routing to an alternative. The page is a structurally valid but content-empty shell.

This is the most consequential single finding in the Gojek harvest. The topic a distressed user would click first is the one topic in the help centre with no content and no empty-state copy. The same behaviour is present on the Indonesian path. Safety content does exist elsewhere in the IA — `I was harassed by the driver`, `Phone Number Masking feature`, `Share Location Feature`, `Safe Trip Kit feature`, `How to claim Safe Trip+` — but it is scattered across the `GoRide` and `GoCar` product topics, so the user who routes by urgency finds nothing and the user who routes by product finds it.

All other empty states are behind auth. `[absent]`

## T9 Notifications & system messages

`[documented]`, from help titles and product copy:

- `GoPay Spiker` — the strongest notification product in this cluster: "Accept QRIS payments securely with instant sound alert from GoPay Spiker." A **physical sound-alert device** for merchants who cannot watch a screen, productised and named. The name is Indonesian-English slang for "speaker". Notification design as hardware.
- `Notifikasi pembelian GoFood Pickup` [*GoFood Pickup order notification*] — pickup has its own notification article
- `I haven't received OTP code` / `Saya belum menerima kode OTP` — OTP non-delivery as a named failure
- `Fingerprint/Face ID feature for transaction` — biometric confirmation
- `Chat atau telepon driver setelah transaksi selesai` [*Chat or call the driver after the transaction is complete*] — a help article about post-completion contact, which implies a designed cut-off
- `Chat` as a standalone top-level help topic (see T11)
- `How to see Gojek and GoPay promo information` — a wayfinding article for promotional messages
- `Layanan bantuan 24/7` [*24/7 support service*] (GoPay site)

**GoPay's outbound-contact disclosure** `[observed]`, footer of gopay.co.id: `Call Center: 1500729` and `customerservice@gopay.co.id`, with the regulator statement adjacent. Shorter than Grab's Indonesian number-whitelist but serving the same anti-impersonation function.

## T10 Disclosures, legal & compliance

**The licensing disclosure is a single dense sentence naming three entities and two regulators** `[observed]`:

> "GoPay Indonesia berizin dan diawasi oleh Bank Indonesia. GoPay Pinjam oleh PT Mapan Global Reksa dan GoPay Later oleh PT Multifinance Anak Bangsa berizin dan diawasi oleh OJK."
> [*"GoPay Indonesia is licensed and supervised by Bank Indonesia. GoPay Pinjam by PT Mapan Global Reksa and GoPay Later by PT Multifinance Anak Bangsa are licensed and supervised by OJK."*]

Three brands, three legal entities, two regulators, split by product type — payments under the central bank, lending under the financial services authority. The disclosure maps brand to entity to regulator explicitly, which is the model to copy wherever a consumer brand fronts multiple regulated entities.

**Lending rates disclosed on the marketing page, not buried** `[observed]`:

> "Biaya cicilan GoPay Pinjam mulai dari 1.13% dan GoPay Later mulai dari 2%."
> [*"GoPay Pinjam instalment fees from 1.13% and GoPay Later from 2%."*]

Two products, two `mulai dari` [*starting from*] floors, on the homepage tile rather than behind a link. Note the decimal **point** in `1.13%` on a page that elsewhere uses Indonesian decimal commas — a formatting inconsistency inside a rate disclosure.

**Free-tier disclosure with a countable cap and a T&C pointer** `[observed]`:

> "Transfer ke mana aja, langsung masuk & gratis 100x/bulan … Syarat dan Ketentuan berlaku."
> [*"Transfer anywhere, arrives instantly & free 100x/month … Terms and Conditions apply."*]

`100x/bulan` — the free allowance is stated as a **count, not a value**, which is unusually concrete for a wallet. The `Syarat dan Ketentuan berlaku` tag is placed immediately after the claim, not as a page-foot asterisk.

**Identity-verification disclosure surfaced through failure titles** `[observed]` — Gojek does not publish a KYC explainer; it publishes the rejection reasons, and they are specific enough to function as one:
- `GoPay Plus upgrade is rejected because photo does not meet requirements`
- `GoPay Plus upgrade is rejected because eKTP is not registered or matched with Dukcapil data`
- `GoPay Plus upgrade was rejected due to ID has been registered`
- `GoPay Plus status is downgraded to regular because the ID is used in another account`

Four `rejected because <specific reason>` titles. The user learns the eligibility rules by reading the failure taxonomy. This is a legitimate inverse-documentation strategy, and it beats a generic "we may reject your application" clause — though the fourth title is ungrammatical (`due to ID has been registered`).

**Insurance named as three separate products with three names** `[observed]`: `GoRide & GoCar SafeTrip+ insurance`, `GoRide SafeTrip Basic Insurance`, `How to claim Safe Trip+`, `Safe Trip Kit feature`. See T13 — this is the clearest naming collapse in the file.

**Terms-of-review disclosure** `[observed]`: `Syarat & Ketentuan Ulasan dan Rating GoFood` [*GoFood Review and Rating Terms & Conditions*] and `Panduan memberi ulasan untuk restoran` [*Guidelines for reviewing restaurants*]. User-generated content gets its own published T&Cs *and* a separate softer guidelines article — the Bolt guidelines/terms split, applied to reviews.

**Carbon disclosure** `[observed]`: `About Carbon Offset` / `Tentang serapan jejak karbon`, and the homepage claim "GoGreener feature for a greener Indonesia - Enabled the planting of more than 200k trees in 2024, absorbing 14,938.48 tCO2e". The tCO2e figure is given to **two decimal places** — a precision claim that invites scrutiny it probably cannot bear.

**Trademark notice in the footer of every page** `[observed]`: "Gojek is a trademark of PT GoTo Gojek Tokopedia Tbk. Registered in the Directorate General of Intellectual Property of the Republic of Indonesia." Copyright reads `© 2023` on pages served in 2026 — a stale year in the footer of the whole estate.

## T11 Help-centre architecture

**One flat level. Twenty-seven topics. No grouping, no ordering, no scope lines.** `[observed]`

> `Need some help?` [search] · `Browse Topics`

`GoFood Web` · `Safety and Emergency` · `Join as Our Partner` · `App Issue` · `GoBox` · `GoFood` · `Promo Issue` · `Chat` · `My Account` · `GoMart` · `GoTagihan` · `GoSend` · `GoShop` · `GoRide` · `GoPay Later` · `GoPay` · `GoInvestasi` · `GoCar` · `GoPay Pinjam` · `GoPay Tabungan` · `GoPay Coins` · `GoSend E-commerce` · `Jago` · `GoBluebird` · `GoPulsa` · `Gojek in GoPay App` · `GoCar in GoPay App`

This is the single most informative IA artefact in the Gojek harvest, for four reasons.

**1. The list is unordered and un-grouped.** It is neither alphabetical, nor frequency-ranked, nor clustered by domain. `Safety and Emergency` sits at position two between `GoFood Web` and `Join as Our Partner`. `GoRide` — the flagship service — is at position fourteen, after `GoShop`. Twenty-seven flat items with no visual hierarchy is a routing problem the user solves by scanning, and the ordering gives them no help.

**2. Four different kinds of thing are mixed in one list.** Product brands (`GoRide`, `GoPay`), problem categories (`App Issue`, `Promo Issue`), account concepts (`My Account`), audiences (`Join as Our Partner`), a feature (`Chat`), a channel (`GoFood Web`), a third-party brand (`Jago` — a partner bank), and **two cross-app contexts** (`Gojek in GoPay App`, `GoCar in GoPay App`). A user with a problem must first decide whether their problem is a product, an issue type, or a context.

**3. `Gojek in GoPay App` and `GoCar in GoPay App` are the structural headline.** These two topics document **the Gojek app's own services as they appear inside a different app**. The wallet has been spun out into a standalone product (gopay.co.id, its own nav, its own regulator statement, its own call centre) and it now *hosts* ride-hailing. The help IA has had to grow two topics to explain a service to users who reached it through the sibling brand.

That inversion — the payments brand absorbing the mobility brand rather than the reverse — is the most significant super-app-architecture finding in this cluster, and the help centre is where it is visible. Grab's wallet is a feature of Grab; Gojek's wallet is a product that contains Gojek.

**4. Nine of twenty-seven topics are financial.** `GoPay`, `GoPay Later`, `GoPay Pinjam`, `GoPay Tabungan`, `GoPay Coins`, `GoInvestasi`, `GoTagihan`, `GoPulsa`, `Jago`. Payments, BNPL, cash lending, savings, loyalty currency, investment, bill payment, phone top-up, and a partner bank. The mobility topics number four (`GoRide`, `GoCar`, `GoBluebird`, `GoBox`). **By help-centre surface area, Gojek is a financial services company that also moves people.**

**Article-title grammar — five shapes:**

| Shape | Example |
|---|---|
| `How to <verb>` | `How to top up GoPay`, `How to book GoRide` |
| `What is <X>?` | `What is GoPay?`, `What is GoPay PIN?`, `What is Family Account?` |
| `I <did/can't>` | `I left my item`, `I can't find a driver` |
| `<Counterparty> <did>` | `Driver drove unsafely`, `Merchant hasn't received my payment` |
| `<X> feature` | `Multidestination feature`, `Share Location Feature`, `Edit payment feature` |

The `<X> feature` shape is Gojek-specific and appears ~12 times. It names an affordance rather than a task, and it produces titles that answer "what is this thing" rather than "how do I do this". Casing is not governed: `Multidestination feature` (lowercase f) sits beside `Share Location Feature` (capital F) and `Safe Trip Kit feature` in the same list.

**No `See all articles` pagination** — every topic renders its full article list. This is why the harvest is unusually complete for a help centre, and it is a deliberate (or at least fortunate) SEO/accessibility decision: the whole corpus is in server HTML.

**No article bodies were opened** — all T6/T7 content here is title-level.

## T12 FAQs

`[absent]` as a marketing-page FAQ block. Gojek ships **no accordion FAQ on any product page harvested**. The GoRide page instead carries a section headed `More Information` — "Click the link below for more information about GoRide or get in touch with us." — with two links, `FAQ` and `Contact Us`, both routing out to other pages. `FAQ` points at the GoRide help topic, and the link carries a **deep anchor to a specific Indonesian-slugged question** (`#bagaimana-cara-memesan-untuk-teman-saya-yang-berbeda-lokasi`, [*how to order for my friend in a different location*]) — an English page linking to an Indonesian anchor.

The absence is itself the finding: where Grab and Careem use marketing-page FAQ blocks as a second content surface (and fill them with SEO questions), Gojek routes everything to the help centre. The consequence is that Gojek's marketing pages are much thinner and its help centre much richer than its peers'.

## T13 Terminology & glossary — PRIORITY

### The naming grammar

**The rule: `Go` + a capitalised English word, closed up, no space.** The prefix is the Indonesian/English pun at the centre of the brand — `Go-Jek` from *ojek*, the Indonesian motorbike-taxi, reanalysed as the English verb `go`.

**The second element is overwhelmingly a VERB**, and this is the defining contrast with Grab:

| Gojek (verb-compounded) | Grab (noun-compounded) |
|---|---|
| `GoRide` | `GrabFood` |
| `GoSend` | `GrabMart` |
| `GoShop` | `GrabExpress` |
| `GoPay` | `GrabPay` (the one Grab verb) |
| `GoDineIn` | `GrabCoins` |

Verb-compounding gives you an immediately legible *action* name — `GoSend` tells you what happens. Its cost is that it does not scale: once you have used the obvious verbs, new categories have no verb available, and Gojek's catalogue shows exactly that breakdown (below).

### Verbatim service-name inventory (observed only)

**Transport & logistics** `[observed]`: `GoRide` · `GoCar` · `GoTransit` · `GoBluebird` · `GoSend` · `GoBox` · `GoGreen` / `GoGreener`

**Food & shopping** `[observed]`: `GoFood` · `GoDineIn` · `GoMart` · `GoShop` · `GoFood Pickup` · `GoFood Web` · `GoFood Partner` · `GoFood Super Partner` · `GoFood Merchant`

**Wallet & financial** `[observed]`: `GoPay` · `GoPay Plus` · `GoPay Later` · `GoPayLater` · `GoPay Pinjam` · `GoPay Pinjam BPKB` · `GoPay Tabungan` · `GoPay Tabungan by Jago` · `GoPay Coins` · `GoPay Saldo` · `GoPay Syariah` · `GoPay Games` · `GoPay Hadiah` · `GoPay Merchant` · `GoPay Spiker` · `GoPay PIN` · `GoPay Code` · `GoInvestasi` · `GoTagihan` · `GoPulsa` · `GoNearby`

**Business** `[observed]`: `GoCorp` · `GoAds` · `Moka` · `Midtrans`

**Programmes, features, other** `[observed]`: `Gojek PLUS` · `GoTroops` · `GoTo` · `Safe Trip+` · `SafeTrip+` · `SafeTrip Basic` · `Safe Trip Kit` · `Money Back Guarantee` / `Jaminan Saldo Kembali` · `Family Account` / `Akun Keluarga` · `Individual business profile` · `Multidestination` · `Phone Number Masking` · `Share Location` · `On-Time Pickup Guarantee Voucher` · `Carbon Offset`

**Partner/third-party brands carried inside the naming system** `[observed]`: `Jago` (bank; also `Jago Pocket` / `Kantong Jago`) · `LinkAja` (rival wallet, accepted as a payment method) · `Tokopedia` · `Bluebird` (taxi operator, absorbed into `GoBluebird`) · `QRIS` · `BCA OneKlik` · `Dukcapil` · `eKTP` · `Alfa Group` · `Indomaret`

### Where the naming system breaks down — five distinct failure modes

**1. The verb runs out, so the compound switches to nouns and proper names.**
`GoRide`/`GoSend`/`GoShop`/`GoPay` are verbs. `GoFood`/`GoMart`/`GoBox`/`GoCar` are nouns. `GoTransit` is an abstract noun. `GoBluebird` is **a third party's trademark** — `Go` + a partner brand, which no other product in this corpus attempts. `GoDineIn` is a phrasal verb crammed into camel case and it reads badly. `GoInvestasi`, `GoTagihan`, `GoPulsa` are `Go` + **Indonesian** nouns, so the prefix's English pun stops functioning mid-catalogue. `GoTroops` (employees) and `GoGreener` (comparative adjective) are off-pattern again.

Seven different grammatical categories occupy the second slot. The rule is "`Go` plus one word"; there is no rule about what kind of word.

**2. GoPay forms a second-tier naming system with different mechanics.**

Top-level services are **closed up**: `GoRide`, `GoFood`, `GoMart`.
GoPay sub-products are **spaced**: `GoPay Later`, `GoPay Pinjam`, `GoPay Tabungan`, `GoPay Coins`, `GoPay Saldo`, `GoPay Syariah`, `GoPay Games`, `GoPay Hadiah`, `GoPay Merchant`, `GoPay Spiker`, `GoPay Plus`.

So the space is carrying hierarchical meaning: closed-up = a service, spaced = a sub-product of GoPay. That is a genuinely elegant rule, **and it is broken in the same estate**: `GoPayLater` (closed up) appears in the article title `Difference between GoPayLater and GoPay`, in `Kombinasi GoPay/GoPayLater & uang tunai`, and in `How to unlink apps that linked to GoPay / GoPayLater` — while the help-centre topic label, the product page and the regulator disclosure all say `GoPay Later`. **Both forms ship, in the same help centre.**

Note also that the GoPay sub-names are **half English, half Indonesian**: `Later`, `Coins`, `Games`, `Merchant`, `Plus` against `Pinjam` [*borrow*], `Tabungan` [*savings*], `Saldo` [*balance*], `Syariah` [*sharia*], `Hadiah` [*gift*]. The split maps roughly to whether the concept is globally legible or locally regulated — `Syariah` and `Pinjam` could not be Englished without losing their regulatory and cultural precision.

**3. The insurance product has four names.** `[observed]`

| String | Where |
|---|---|
| `GoRide & GoCar SafeTrip+ insurance` | GoRide help article title |
| `How to claim Safe Trip+` | GoRide help article title |
| `GoRide SafeTrip Basic Insurance` | GoRide help article title |
| `Safe Trip Kit feature` | GoRide help article title |

Closed-up `SafeTrip`, spaced `Safe Trip`, with and without the `+`, one of them a "Kit" that may or may not be the same thing. **All four are in the same article list on the same page.** The Indonesian slugs confirm the confusion: `asuransi-perjalananaman-goride-dan-gocar` (note the missing space in `perjalananaman`), `cara-klaim-perjalanan-aman`, `panduan-keamanan-keadaan-darurat-untuk-gocar` — the last of which is [*safety guide for emergencies for GoCar*] and appears under the English title `Safe Trip Kit feature`, i.e. **the English title and the Indonesian slug describe different things**.

This is the single worst naming failure observed in the TRAV cluster, and it sits on the insurance product — the thing a user reads only when something has gone wrong.

**4. Feature names are not governed for case.** `Multidestination feature` · `Share Location Feature` · `Edit payment feature` · `Edit pick up location feature` · `Saved Addresses Feature in transport services` · `Phone Number Masking feature` · `Schedule a ride feature` · `On-Trip Report Feature` · `Safe Trip Kit feature`. Capital `F` and lowercase `f` alternate with no pattern, inside one list.

**5. The homepage and the Products page disagree about what exists.** `GoPay` is absent from the homepage service wall but has its own cluster on Products. `GoGreen` appears in the Products logo strip and as a tile whose link goes to `/gocar` with GoBluebird's descriptor. `GoTransit` and `GoDineIn` appear only in the homepage logo wall and are **absent from the detailed Products listing entirely** — two services that exist as logos and nothing else.

### Role and person terminology

| Term | Usage | Note |
|---|---|---|
| `driver-partner` / `driver partners` | Hyphenated and unhyphenated, both on the homepage | Same `-partner` convention as Grab |
| `Mitra Driver` | ID footer | *Mitra* = partner; the English loanword `Driver` is kept |
| `driver` | Used bare throughout the help centre (`Driver was Impolite`, `How to contact my driver`) | Register split: `driver-partner` in marketing, `driver` in support |
| `Merchant partners` / `Mitra Usaha` / `rekan usaha` | Three terms for sellers | `rekan usaha` [*business colleague*] appears in GoPay help slugs and is warmer than `merchant` |
| `GoTroops` | **Employees** | A coined internal term shipped in public recruitment copy: "Join the GoTroops!" |
| `Gojek customers` | The demand side | No coined consumer term — notably, given everyone else gets one |

`GoTroops` is the Gojek equivalent of Wise's `Wisers` — an internal identity term leaking (here, deliberately) into public copy. The militarised register is unusual and specific.

### Register split

Marketing says `driver-partner`, `GoPay Later`, `Safe Trip+`. Help says `driver`, `GoPayLater`, `SafeTrip+`. The shorter and rougher forms live where the user is already inside the problem — which is the right direction, but here it is accidental rather than designed, because the variants are not consistent within either register.

## T14 Voice, tone & accessibility

**Person and tense.** Second person to the user; first-person plural for the company, used in scale and mission copy ("We build products that nations run on", "We're here for all your mobility and logistics needs", "We have more than three million driver-partners"). Help-centre titles are overwhelmingly **first-person singular from the user's mouth** (`I can't find a driver`, `My account was hijacked`) — the register flips completely between marketing and support.

**The English locale is a thin layer over Indonesian.** `[observed]` This is the defining T14 finding, and it shows in six places:

1. **The en-ID homepage serves an Indonesian meta-description**: "Lebih dari 1 juta driver Gojek siap melayani ojek online, taksi online, pesan antar makanan, kirim barang, belanja & pembayaran." [*More than 1 million Gojek drivers ready to serve online motorbike taxi, online taxi, food delivery, item sending, shopping & payments.*] The search-results snippet for the English page is in Indonesian, and it cites a driver count (1 million) that contradicts the page body (3 million).
2. **The `meta-keywords` on the English pages are Indonesian and stale**: `ojek, online, indonesia, nadiem, driver, gofood, gomart, goshop, golife, gosend, gobox, gocar, goride` — including `golife`, a service that appears nowhere in the harvest, and `nadiem`, the founder's given name.
3. **Help-article URLs are Indonesian under English titles**, systematically: `I left my item` → `/barang-saya-tertinggal`; `How to book GoRide` → `/bagaimana-cara-memesan-transportasi-motor`; `I experienced a scam` → `/saya-mengalami-penipuan-yang-mengatasnamakan-gojek`. Roughly 70% of English-titled articles have Indonesian slugs. The corpus was authored in Indonesian and the titles were translated; the URLs were not.
4. **Several topic labels are never translated**, on either locale: `Safety and Emergency`, `App Issue`, `Promo Issue`, `Chat`, `GoFood Web`, `GoSend E-commerce` appear in English on the Indonesian help centre.
5. **The GoRide product page has an Indonesian `<title>` and meta-description on the English path**: `GoRide: Download Aplikasi Ojek Online Terbaik & Terpercaya`, and the canonical URL drops the locale entirely (`https://www.gojek.com/goride/`).
6. **The English FAQ link carries an Indonesian anchor** (T12).

The practical consequence for a content designer: the English strings on this estate are **not a reliable guide to the product's actual voice**. The Indonesian is the artefact; the English is a partial, inconsistent, sometimes ungrammatical rendering of it. Several Indonesian slugs are demonstrably more precise than their English titles (T7).

**English-language defects observed** `[observed]`: `3 millions` and `6,4 millions` (plural on a quantity adjective, Indonesian decimal comma retained); `Shop your daily essentials shopping faster and easier`; `EVERYDAY LOW PRICE` in caps mid-sentence, singular; `Driver was Impolite` (stray capital); `GoPay linking to Tokopedia is failed`; `Upgrade to GoPay Plus was rejected due to ID has been registered`; `Best Online Transportion App` (typo inside a quoted award name); `Favorite` (US) against `cancelled` and `favourite` elsewhere; `Operational Area` used as a statistic label whose value is a sentence ("Operations in Indonesia and Singapore"); `Know more` ×16.

**Register.** Short, plain, low-ornament. Contractions used ("It's the motorbike icon", "you're in a public place", "'cause your driver is arriving"). Very few exclamation marks (`Good to Go?… today!`, `Join the GoTroops!`, `Explore new offices, cultures, and a thousand islands!`), all in recruitment or download copy, none in support or payments. The tone-flattens-as-stakes-rise gradient holds: the GoPay and GoPay Later help corpora contain no colloquialism at all.

**The one deliberate colloquialism** is GoRide step 5 — "Now sit tight 'cause your driver is arriving soon." Placed at the single moment in the flow where the user can do nothing. Good instinct, whether or not it was deliberate.

**Numbers as trust devices** `[observed]`: `3 millions driver-partners` · `6,4 millions Merchants` · `1 juta driver` · `more than three million driver-partners` · `200k trees` · `14,938.48 tCO2e` · `100x/bulan` · `1.13%` · `2%` · `QRIS in 5 minutes`. The driver count appears in three mutually inconsistent forms across three surfaces (T2) — the number is being used as a trust device while itself being untrustworthy.

**Accessibility content** — no accessibility statement page found. `[absent]`

**Accessibility defects in the served markup** `[observed]`:
- **The entire homepage service catalogue is wordmark images with empty alt text.** `<img alt="">` on `goride_horizontal_logo_white`, `gocar_horizontal_logo_white`, `gofood_horizontal_logo_white`, `gopay_merchant`, and ~15 others. The three cluster headings (`Transport and Logistics`, `Food and Groceries`, `Business Solutions`) are the only text a screen reader receives. **A non-sighted user cannot discover a single Gojek service from the homepage.** This is the most serious accessibility finding in the TRAV cluster.
- The Products page repeats the pattern in its hero logo strip, though the tiles below it do carry text descriptors — so the page is recoverable where the homepage is not.
- Generic alt text used repeatedly where it carries no information: `alt="Info card image"` (×8), `alt="slider image"` (×4), `alt="tiny card"` (×3), `alt="achievement"` (×5), `alt="Product logo"` (×16), `alt="Product background"` (×4), `alt="hero image"`, `alt="Card color image"`. `alt="achievement"` is attached to icons whose adjacent text carries the award name, so it is merely useless rather than harmful; `alt="Product logo"` on the Products page is attached to the *only* identifier of each product tile above its descriptor.
- The five-step GoRide sequence uses **U+2024 ONE DOT LEADER** (`1․`) instead of a full stop, which some screen readers will announce incorrectly or not at all.
- `Need some help?` is a heading above a search input with **no visible label on the input itself** in the served markup.
- The homepage `Our scale` card set renders **five cards, then repeats two of them** (`3 millions driver-partners` and `6,4 millions Merchants` appear twice) — carousel duplication in the DOM.
- Two logo images have empty `src` on the GoPay page (`![Baru! Aplikasi GoPay](<>)`, `![Bayar apa aja pakai GoPay](<>)`) — broken images with populated alt.
- No `Skip to content` link observed.
- Footer copyright reads `© 2023` on every page in 2026.

**Negative findings, recorded honestly**
- `Safety and Emergency` help topic renders **completely empty**, with no empty-state copy (T8) — the highest-stakes door in the IA
- Four names for one insurance product, in one article list (T13)
- `GoPay Later` and `GoPayLater` both shipping in the same help centre
- `GoBluebird` and `GoGreen` share a descriptor; the `GoGreen` tile links to `/gocar`
- `GoTransit` and `GoDineIn` appear as logos only, absent from the product catalogue
- `Contact Us` links to an office-address page
- Three mutually inconsistent driver counts
- Indonesian meta-description and keywords on English pages; Indonesian slugs under ~70% of English titles
- Entire homepage service catalogue inaccessible to screen readers
- `© 2023` footer, three years stale

---

## Transferable patterns

1. **Name both halves of a discrepancy in the failure title.** `Transaction at offline store failed but my balance was deducted` is findable because the second clause is the thing the user is searching for. "Transaction failed" is not. Ship the online and offline variants separately if the resolution differs. Transfers directly to payments, refunds and reconciliation help content.
2. **Write help for unexpected-positive states.** `Never upgraded GoPay, but the status is 'Approved'` covers a user who is alarmed by something going *right*. Almost nobody writes this content, and in identity and account-status flows an unexplained grant reads as a compromise.
3. **Document eligibility through the rejection taxonomy.** Four `rejected because <specific cause>` titles teach the KYC rules better than a KYC explainer would, because the user reads them at the moment they need them. Condition: the reasons must be specific enough to act on (`eKTP is not registered or matched with Dukcapil data` is; "verification failed" is not).
4. **Put pickup-ambiguity resolution in the onboarding copy, not just in the map UI.** "If you're in a public place, you can choose from which gate/specific meeting point you want to be picked up" — the hardest coordination problem in dense-city ride-hailing, addressed in step 3 of a five-step explainer. Transfers to any meet-up, collection or delivery-handover flow.
5. **Quote the literal button label in procedural copy.** `click 'Find driver'` makes the instruction verifiable against the screen. Cheap, and it fails loudly (rather than silently) when the UI is renamed.
6. **Let the space carry hierarchy — then enforce it.** Closed-up `GoFood` = a service; spaced `GoPay Later` = a sub-product of GoPay. This is a good, learnable rule that costs nothing. Gojek broke it in its own help centre, which is the lesson: a typographic rule needs a linter, not a style-guide paragraph.
7. **Verb-compounding reads better and scales worse.** `GoSend` is instantly legible; `GrabExpress` is not. But once the obvious verbs are used, verb-compounding forces you into `GoDineIn`, `GoTransit`, `GoBluebird` and `GoInvestasi`. Choose noun-compounding for a catalogue you expect to grow past about eight services.
8. **Read the help-centre topic list as the org chart.** Nine of Gojek's twenty-seven help topics are financial; four are mobility. Two topics exist solely to explain the mobility product *inside the wallet's app*. Help-centre surface area is the least-spun statement a company makes about what it actually is.

## Caveats & gaps

- **Help-article bodies were not opened.** All of T6 and T7 is `[documented]` at title level. ~200 titles were captured, which is unusually complete for IA and task-phrasing analysis, but says nothing about answer structure, length or in-article tone.
- **The `Safety and Emergency` topic is empty**, so the safety-content corpus is missing entirely except for the scattered articles noted in T8. Whether the topic is genuinely empty or fails to hydrate without JS could not be determined — both the `/en-id/` and `/id-id/` paths render the same empty shell, which argues for genuinely empty.
- **Four of twenty-seven help topics harvested** (`GoRide`, `GoPay`, `GoPay Later`, plus `GoFood` in Indonesian). The eighteen unharvested topics include `GoPay Pinjam`, `GoPay Tabungan`, `GoInvestasi` and `Jago` — the lending, savings and investment corpora, which on the evidence of `GoPay Later` would be the richest remaining regulatory-disclosure source.
- **`Gojek in GoPay App` and `GoCar in GoPay App` were identified but not opened.** These two topics are the direct documentation of the wallet-hosts-mobility inversion described in T11 and are the highest-value next fetch in this file.
- **gopay.co.id is a separate estate and was harvested only at the homepage.** Its `Bantuan`, `Bantuan Merchant`, `gopay-aman`, `pinjam` and `dompet-digital` sections are Bahasa-only and unharvested; they hold the wallet's own T6/T7/T10 content, which is now organisationally distinct from Gojek's.
- **T5 absent** (no form surface), **T12 absent by design** (no marketing FAQ exists), **T8 effectively absent**.
- **Singapore operations unharvested.** Gojek states "Operations in Indonesia and Singapore"; only the Indonesian market was reached. A Singapore locale would test whether the `Go` naming system survives contact with Grab's home market.
- **Product pages for GoCar, GoSend, GoBox, GoFood, GoMart, GoShop, GoCorp and Gojek PLUS unharvested** — only `GoRide` was opened, so the five-step onboarding pattern is confirmed on one service only and may not generalise.
- Indonesian glosses throughout this file are the harvester's working translations, marked in square brackets. The Indonesian strings are quoted verbatim and are the artefact; the glosses are not authoritative and several idiomatic slugs (`jadwalin`, `rekan usaha`, `perjalanan aman`) carry register that the gloss does not capture.

## Sources

1. https://www.gojek.com/en-id
2. https://www.gojek.com/en-id/products
3. https://www.gojek.com/en-id/help
4. https://www.gojek.com/en-id/help/goride
5. https://www.gojek.com/en-id/help/gopay
6. https://www.gojek.com/en-id/help/gopaylater
7. https://www.gojek.com/en-id/help/safety-emergency
8. https://www.gojek.com/en-id/goride
9. https://www.gojek.com/id-id/help/gofood
10. https://gopay.co.id/ (served from https://www.gojek.com/en-id/gopay)
