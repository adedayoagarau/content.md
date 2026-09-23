# 160. Bandcamp

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Direct artist-to-fan music marketplace (digital + physical merch, DRM-free downloads) |
| Primary URL | https://bandcamp.com/ |
| Corpus rank | 160 |
| Benchmark strength (source list) | Artist-support and purchase content |
| Locale / market observed | en-US (help centre localised; `hc/fr`, `hc/pt-br` paths observed) |
| Platform observed | Web (bandcamp.com marketing and policy pages; Intercom-hosted help centre at get.bandcamp.help) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Marketplace-facilitator tax collection and remittance on physical orders; statutory tax-information collection above $5,000 USD annual sales; EU/UK right-of-withdrawal (an `Example Withdrawal Form` is published as a help article); publishing-royalty collection via named collection societies; DMCA-style copyright page; US tariff impact on merch disclosed |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Partial — the artist-support, revenue-split, purchase and download-format layers (the brief's priorities) are captured in depth, including three separate statements of the revenue split that disagree with each other. Copyright, privacy and terms pages were not fetched. All in-product UI is `[documented]` except the marketing surfaces. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://bandcamp.com/ | Live sales ticker with joke captions, lifetime-payment headline, editorial rails, merch format nav |
| About us | https://bandcamp.com/about | Mission statement, pie chart with alt text, press quote wall, `82%` figure |
| Bandcamp for Artists | https://bandcamp.com/artists | **The artist-support artefact** — `Artists first`, pricing, 12 feature cards |
| Bandcamp for Fans | https://bandcamp.com/fans | Fan-account benefits, four-question FAQ |
| Fair Trade Music Policy | https://bandcamp.com/fair_trade_music_policy | **The flagship revenue-split page** — 15%/10%, 4–7%, "usually 80-85%" |
| Help centre home | https://get.bandcamp.help/hc/en-us | Three-audience split; degraded-service banner |
| Help collection: Fans & Buyers | https://get.bandcamp.help/en/collections/19694684-fans-buyers | **88 articles across 8 sub-collections** — the richest first-person title set in the corpus |
| What are Bandcamp's fees? | https://get.bandcamp.help/en/articles/15263193-what-are-bandcamp-s-fees | The $5,000 fee drop, the $100 revenue-share cap, tip treatment, collection societies |
| How do I get paid on Bandcamp, and how often? | https://get.bandcamp.help/en/articles/15263080-how-do-i-get-paid-on-bandcamp-and-how-often | 24–48h default, monthly option, $8.07 PayPal threshold, 14-day manual review |
| In which formats can I download my purchases? | https://get.bandcamp.help/en/articles/15263234-in-which-formats-can-i-download-my-purchases | The eight-format list |
| Which audio format should I download? | https://get.bandcamp.help/en/articles/15263285-which-audio-format-should-i-download | **"audiophiles and nerds"** — the format-choice artefact |
| Download troubleshooting | https://get.bandcamp.help/en/articles/15263158-download-troubleshooting | The voice artefact; seven failure scenarios |

---

## T1 Navigation & IA labels

**Primary nav is a format shelf, and that is the positioning** `[observed]`

`Digital music` · `Vinyl` · `Compact discs` · `Cassettes` · `T-shirts` · `Gift cards` · `Editorial` · `Radio` · `Clubs`
plus `Sign up` / `Log in` and a search field placeholdered `Search for artist, album or track (optional)`.

Bandcamp's top-level navigation is **physical-media-first and unabbreviated**: `Compact discs`, not "CDs"; `Cassettes`, listed as a peer of `Vinyl`. The nav reads like a record-shop rack. Note that the merch cards further down the same page *do* abbreviate (`CDs`) — so the nav uses the full noun and the cards use the shorthand, on one page.

`Editorial` as a nav label for what is branded `Bandcamp Daily` is the odd one: the generic category word in the nav, the brand name on the page. `Clubs` appears in the nav on `/artists` and `/about` but **not on the homepage** — the nav is not consistent across pages.

**Footer — four groups, and one of them is a policy manifesto** `[observed]`

| Group | Items |
|---|---|
| (company) | `About` · `Buttons/Logos` · `Bandcamp Daily` · `Gift Cards` · `Bandcamp Merch` · `Help` · `Jobs` · `Press` |
| (social) | Bluesky · Facebook · Instagram · TikTok |
| (legal) | `Acceptable Use & Moderation Policy` · **`Fair Trade Music Policy`** · `Copyright` · `Privacy` · `Terms of Use` · `Cookie Settings` |
| (audience) | `Bandcamp for Artists` · `Bandcamp for Fans` · `Bandcamp for Labels` |

**`Fair Trade Music Policy` sitting in the legal footer group, between an acceptable-use policy and a copyright page, is the single most revealing IA decision in this file.** It is a revenue-split disclosure given the status and placement of a legal document — the same shelf as the terms and the privacy notice. Most marketplaces bury their take rate in a pricing page or a terms clause; Bandcamp names it as a *policy*, gives it a moral adjective (`Fair Trade`, borrowed wholesale from the coffee and cocoa certification movement), and links it from every page.

The three-way audience split (`for Artists` / `for Fans` / `for Labels`) is repeated in the footer of every page and in the help centre, so the same tripartite model governs marketing and support.

`Buttons/Logos` is an unusual footer item — downloadable embed assets, treated as a peer of `About`.

**Help centre — three audiences, and the help centre is on a separate domain with a separate brand** `[observed]`

`get.bandcamp.help` (Intercom-hosted). Top level:

| Group | Sub-groups |
|---|---|
| `Artists & Labels` | `Common artist/label topics` · `Account management & adding music` · `Money & selling` · `Managing your music` · `Labels, Pro, subscriptions, and Live` |
| `Fans & Buyers` | `Common fan/buyer topics` · `Buying & listening` · `Your purchases & account` |
| `General Help` | `Login help` · `General troubleshooting` |

Note `Artists & Labels` and `Fans & Buyers` are both **doubled audience nouns** — the same pattern as SoundCloud's `Fans & Listeners`. Bandcamp's second word in each pair is the *transactional* role (`Labels`, `Buyers`) and the first is the *identity* role (`Artists`, `Fans`). The help centre then reverses the emphasis in its collection descriptions: `Fans & Buyers` is glossed "Buying music and merch from your favorite artists" — the buying, not the fandom.

**`Common artist/label topics` and `Common fan/buyer topics` are promoted sections** `[observed]`, each with four hand-picked articles:

| Audience | Promoted articles |
|---|---|
| Artist/label | `Bandcamp design tutorial` · `Why won't my tracks upload?` · `How do I get paid on Bandcamp, and how often?` · `Track/album code tutorial` |
| Fan/buyer | `Where do I download my purchase?` · `Download troubleshooting` · `Where's my receipt email or download link?` · `What's the status of my merch order?` |

**All four fan-side promoted articles are about not having received something.** Download, download failure, missing receipt, missing parcel. The fan-side front door of a marketplace that sells files and physical objects is entirely composed of "where is my thing" — which is an honest and useful reading of what a buyer actually needs.

**`Fans & Buyers` sub-collections — eight, with an article count** `[observed]`

`Attending a Live Stream` (7) · `Buying & Paying` (20) · `Downloading Music` (22) · `Fan Accounts` (12) · `Fan App & Streaming` (10) · `Getting Started for Fans` (2) · `Merch Orders` (12) · `Playlists & Listening Clubs` (4) — **88 articles** total, with the count published on the collection page.

`Downloading Music` at 22 articles is the largest, ahead of `Buying & Paying` at 20. **A marketplace whose biggest support domain is not buying but *getting the file you bought*.** That is the structural consequence of selling DRM-free downloads rather than streaming access, and the IA reflects it honestly.

`Getting Started for Fans` has **two articles**, both of which are failure articles (`I'm having trouble activating my account.`, `Where do I get the app?`). A "getting started" section containing no getting-started content.

**Third-party nav in the help centre chrome** `[observed]`: `Back to Bandcamp` · `Bandcamp Daily` · **`Is It Bandcamp Friday Yet?`** (isitbandcampfriday.com) — a single-purpose external site, linked from the help-centre masthead on every page. A fan-community artefact promoted to first-class navigation.

## T2 Value proposition & headline patterns

**The one-sentence positioning, repeated verbatim across four surfaces** `[observed]`

> "Bandcamp is an online record store and music community where passionate fans discover, connect with, and **directly support** the artists they love."

Appears as the `/about` H1 standfirst, the `/artists` opening line, the site meta description on both, and — in condensed form — as the homepage meta and the persistent tagline:

> "Discover amazing music and **directly support** the artists who make it."

Two observations. `directly support` is **bolded or italicised every time it appears**, and on the tagline it is hyperlinked to the Fair Trade Music Policy — so the phrase that carries the whole value proposition is also the phrase that routes to the proof. A claim that hyperlinks to its own evidence is a genuinely strong pattern.

And the self-description leads with `online record store` before `music community`. Bandcamp calls itself a shop first. Compare SoundCloud (159), which never uses a retail noun.

**The homepage headline is a cumulative number and a daily number** `[observed]`

> `Fans have paid artists $1.8 billion using Bandcamp, and yesterday alone bought 63,136 records.`

Structure: **lifetime total → the word `and` → yesterday's unit count.** The big number establishes scale; the small, oddly-precise, *dated* number (`yesterday alone`, `63,136`) establishes that it is still happening. `records` rather than "items" or "purchases" — the retail noun again, applied to digital sales.

Note the subject is `Fans`, not Bandcamp. The company is the instrument (`using Bandcamp`), not the actor. Sustained throughout: "Fans have paid artists and independent labels $1.79 billion **using Bandcamp**", "In the past year, **fans have bought** 15.7 million digital albums".

**The live sales ticker, with a joke in the accessible caption** `[observed]`

Present on the homepage, `/about` and `/artists`:

> `selling right now` · `paused` · `(and yes, this really is a live feed — I can't believe you thought it was canned!)` · `(and yes, this really is a live feed — when you hear "nobody pays for music anymore," that's just The Man spreading his agenda)` · `pause` · `unpause`

Two alternating parenthetical captions, both pre-empting the same suspicion (that the feed is fake), one with a mock-offended joke and one with a political aside. `that's just The Man spreading his agenda` is the most editorially opinionated string in this batch of five products. The ticker is **pausable**, with `pause` / `unpause` as explicit controls — which is both a motion-accessibility accommodation and, per the caption, a proof device.

This is the clearest example in the corpus of **a data visualisation used as an argument**: the component's purpose is not to inform but to refute a belief ("nobody pays for music anymore") by continuously demonstrating the opposite.

**`Artists first` with a self-aware subhead** `[observed]`

> `## Artists first`
> `### (the money-where-mouth-is version)`
> "We believe that music is essential to humanity and that the welfare of the artist is paramount. The proof is in our business model: when a fan buys something on Bandcamp, an average of 82% of the money goes to you… In other words, **we only make money if you make a lot more money.**"

`(the money-where-mouth-is version)` is the standout construction — a parenthetical subhead that **pre-empts the reader's cynicism about the heading above it**. It concedes that "Artists first" is the kind of thing every platform says, and promises the section will substantiate it. A three-word idiom doing the work of a paragraph of hedging.

`we only make money if you make a lot more money` — the alignment argument in twelve words, with `a lot more` doing the load-bearing work. It appears verbatim on `/artists` and in near-identical form on `/about` and the Fair Trade Music Policy ("Since we only make money when artists make a lot more money, our interests remain aligned…"). **One canonical sentence for the highest-stakes claim, reused across three surfaces** — the same single-sourcing discipline Firefox (156) applies to its privacy promise.

**The mission statement, built on a borrowed quotation** `[observed]`

The `/about` mission section opens by quoting Prince's instruction to his autobiography's co-writer — "**Music is healing. Write that down first.**" — and then adopts it:

> "He said he wanted this to be the book's guiding principle, and that same principle guides and motivates our work at Bandcamp. Because if music heals, then clearly a system should exist that helps the broadest possible range of artists share that power with the world."
> "**Bandcamp's mission is to help spread the healing power of music by building a community where artists thrive through the direct support of their fans, and where fans gather to explore the amazing musical universe that their direct support helps create.**"

Structure: **third-party authority → the syllogism ("if music heals, then… a system should exist") → the mission sentence.** The syllogism is the interesting move: the mission is presented as a *consequence* of a premise the reader has just been given, rather than as an assertion. The mission sentence itself is 44 words and contains `direct support` twice.

**Section headings are plain, lowercase-ish, and occasionally jokes** `[observed]`

`Our mission` · `How Bandcamp works` · `Reach a whole new fan community` · `A big audience for both music and merch` · `Artists first` · `Pricing` · `More reasons to use Bandcamp` · `Fan nirvana` · `Fan accounts are free. Yep, it's free!` · `Bask in well-deserved prestige` · `Share your impeccable taste` · `Further unsolicited approbation that's more than 280 characters:`

`Further unsolicited approbation that's more than 280 characters:` is the press-quote-wall heading — mock-formal Latinate diction ("unsolicited approbation") plus a tweet-length joke. `Bask in well-deserved prestige` and `Share your impeccable taste` are flattery-as-benefit headings for fan-page features. `Fan nirvana` is the only heading that reads like marketing filler.

**The dual-benefit closing argument** `[observed]`, under `Fan nirvana`:
> "When a fan buys your music on Bandcamp (whether digital or physical), they get the convenience of **instant, unlimited streaming** from our Android and iOS apps, and the **permanence and fidelity** of a high-quality download."

Two abstract nouns per side — `convenience` versus `permanence and fidelity` — naming the exact trade-off between streaming and ownership and then claiming both. This is the clearest articulation of Bandcamp's product thesis in one sentence.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` / `sign up` | Nav, hero, footer of `/artists` and `/fans` | **Both casings on one page** |
| `Log in` / `log in` | Nav | Same |
| `Yep, it's free!` | Immediately below `Sign up` on `/fans` | A **reassurance as a caption**, not a CTA |
| `A desktop browser is required to sign up.` | Beneath a disabled `sign up` on `/artists` | Constraint disclosed at the control |
| `Learn more` / `Learn more and sign up` | `/artists` hero | Two variants adjacent |
| `Explore more editorial` | Homepage | |
| `Learn more about playlists` | Homepage | Fully specified |
| `View all shows` | Homepage, radio | |
| `View more albums` | Homepage, Album of the Day | |
| `Explore more genres` | Homepage | |
| `Learn more about our pricing` | `/artists`, pricing section | Fully specified; links to the fees article |
| `Skip to content` | Top of DOM | |
| `pause` / `unpause` | Live sales ticker | Lowercase; motion control |
| `cancel` | Search overlay | Lowercase |
| `See all results` | Search overlay | |
| `Change email / Send again` | Email-verification banner | Two actions, one slash-separated string |
| `Cookie Settings` | Footer | `Settings`, not "Manage" or "Preferences" |
| `Contact Us` | Help-centre footer | |
| `Back to Bandcamp` | Help-centre masthead | Names the destination, not "Home" |
| `Is It Bandcamp Friday Yet?` | Help-centre masthead | An external fan site as nav |
| `Did this answer your question?` → `Disappointed Reaction😞` / `Neutral Reaction😐` / `Smiley Reaction😃` | Every help article | **Three-point emoji scale with named accessible labels** |
| `Search for articles...` | Help-centre search | Ellipsis in the placeholder |
| `Search for artist, album or track (optional)` | Site search | **`(optional)` in a search placeholder** — see below |
| **In-product, `[documented]`** | | |
| `format` (dropdown beside the download link) | Download page | The format selector, named in lowercase |
| `Download` | Download page | |
| wishlist heart icon | Album/track page | "click the wishlist button on any artist's site (it's the heart icon below the cover art)" |
| `hide` | Collection item hover | Lowercase |
| `private` | Wishlist visibility dropdown | |
| `Create your account` | Fan-account creation from an existing artist account | |
| `Contact` | Artist page | The route to the artist for quality questions |

**`Search for artist, album or track (optional)`** is a genuine oddity: a search field whose placeholder tells the user the search is optional. It presumably means the field is optional within a filter form, but as rendered it reads as "you don't have to search" — a placeholder undermining its own control. Recorded as a defect.

**`Yep, it's free!`** placed directly beneath the `Sign up` button on `/fans` is the best micro-placement in the file: the objection ("what will this cost me?") is answered in three words at the exact point of hesitation, in the register of an aside rather than a claim.

**`A desktop browser is required to sign up.`** shown beside a non-functional `sign up` on `/artists` — the constraint is disclosed at the control rather than surfacing as a failure after the tap. Correct, and rarely done.

## T4 Onboarding & getting-started

**There is no step-numbered onboarding anywhere in the harvested set.** `[observed]` Bandcamp's onboarding content is a **benefit list plus a free-account reassurance**, on the theory that both signup flows are short.

**Fan onboarding is seven benefits, each a bold imperative-or-promise plus one sentence** `[observed]`

> `## Why sign up for a free Bandcamp fan account?`

| Benefit | Gloss |
|---|---|
| `Unlimited mobile streaming` | "Listen to your Bandcamp purchases via the free Bandcamp app for iOS & Android. Build queues and playlists for hours of curated, continuous listening." |
| `Re-download past purchases` | "Access to the high-quality download of all your purchases." |
| `Bask in well-deserved prestige` | "Your handsome mug appears on the sites of the artists you have supported." |
| `Create a wishlist` | "Easily keep track of the stuff you want." |
| `Never miss a release` | "Follow your favorite artists and be the first to know when they put out new music." |
| `Discover amazing new music` | "Your music feed shows you the activity of all the artists and fans you follow…" |
| `Share your impeccable taste` | "You get a beautiful, customizable page that lets you share your Bandcamp music collection with the world." |

`Bask in well-deserved prestige` / `Your handsome mug` is the tonal outlier and the most memorable line: a social-proof feature (your avatar appears on the artist's page when you buy) described as vanity, in deliberately archaic diction. It works because it is *honest about the motivation* rather than dressing it as community.

`Re-download past purchases` is the load-bearing one — for a DRM-free download store, the account's real function is permanent re-access, and this is the only benefit line that describes an entitlement rather than a feature.

**Artist onboarding is a twelve-card capability inventory plus five named benefits** `[observed]`

The five headed benefits on `/artists`:
`Direct communication with your fans, direct access to your data` · `Excellent support for you and your fans` · `Live events with an integrated merch table` · `Powerful tools for promotion` · `You control your pricing`

Then twelve short cards under `More reasons to use Bandcamp`:
`No advertising` · `Chart reporting` · `Sell in (just about) any currency` · `Dead-simple pre-orders` · `Search engine optimized` · `Real-time statistics` · `Fan nirvana` · `Album and track codes` · `Discount codes` · `Merch order management` · `Private streaming [Bandcamp Pro]` · `Custom domains [Bandcamp Pro]`

Two cards carry a `Bandcamp Pro` tag inline in the heading — **the paywall marked in the feature label itself** rather than in a footnote or a separate comparison table. Cheap, unambiguous, and it means the free/paid boundary is legible while scanning.

`Sell in (just about) any currency` — the parenthetical hedge inside the benefit heading, then the body names the actual set: "USD, AUD, GBP, CAD, EUR, JPY or **any of 12 other currencies**". Claim, hedge the claim in the heading, enumerate in the body.

`Dead-simple pre-orders` then explains the mechanism: "Give fans one or more tracks immediately when they order. The full album appears **instantly in their collection** as soon as you release it." The claim of simplicity is immediately substantiated by describing the two moments the fan experiences.

**`You control your pricing` carries a statistic that is the whole argument** `[observed]`
> "Sell for a fixed price, specify a minimum and let fans pay more if they want (**which they do, 50% of the time**), or give a track or album away in exchange for an email address."

Three pricing models in one sentence, and the parenthetical `(which they do, 50% of the time)` is the single most persuasive data point on the page — it tells an artist that name-your-price is not a discount mechanism. An inline statistic answering the objection the feature raises.

**`No advertising` is a positioning statement disguised as a feature card** `[observed]`
> "**Music is art, not 'content.'** You'll never see an ad on Bandcamp. At times, we partner with like-minded brands to bring more exposure to your music… all while keeping your fans' data protected."

`Music is art, not "content."` — five words, scare quotes on `content`, and it is an argument against the entire adjacent industry. The card then immediately qualifies the absolute claim ("You'll never see an ad") with a brand-partnership concession, which weakens it but is honest.

**Fan-account onboarding troubleshooting is the actual first-run content** `[observed]` — the `Getting Started for Fans` collection contains only `I'm having trouble activating my account.` and `Where do I get the app?`. The recovery content exists; the happy-path content does not, because there is no path to document.

## T5 Form & field labels

Pre-auth forms are minimal (search, newsletter, signup gates), so most of this section is `[documented]`.

**The format dropdown — the field that defines the product** `[documented]`

> "Just look for the **format dropdown** beside the download link"
> Values: `MP3 V0` · `MP3 320` · `FLAC` · `AAC` · `Ogg Vorbis` · `ALAC` · `WAV` · `AIFF`

Eight values, **seven of which are bare technical identifiers and one of which (`ALAC`) is glossed elsewhere as "Apple Lossless"**. The field label is the lowercase word `format`. No "quality", no "high / standard", no star ratings — Bandcamp exposes the codec directly and then writes a separate article to help the buyer choose (T10, T13).

`MP3 V0` and `MP3 320` are listed as two distinct formats rather than as one format with a quality setting. `V0` is a VBR preset identifier that essentially no consumer will recognise; `320` is a bitrate. Two encoding parameters surfaced as peer menu options. This is the file's central content tension and is addressed rather than hidden — see T13.

**Search fields** `[observed]`
- Site: `Search for artist, album or track (optional)` — see T3 for the `(optional)` defect
- Overlay: `Search all Bandcamp artists, tracks, and albums` with `cancel`
- Help: `Search for articles...`

**Verification banner** `[observed]`
> "Hey! Please verify your email by clicking the link we sent to [address]. `Change email / Send again`"

Opens with `Hey!`, gives both recovery actions in one slash-separated control, and interpolates the address. The `Hey!` is consistent with the house voice but sits oddly on a blocking account state.

**Documented settings and controls** `[documented]`: `hide` (per-collection-item), `private` (wishlist dropdown), `additional payment emails` (under the `fan` tab in settings), the wishlist heart icon, `Contact` on artist pages, and the monthly-payout toggle "selected from your Profile page".

**`additional payment emails`** is the notable one: a field whose entire purpose is to reconcile purchases made under different email addresses into one collection, and the `/fans` FAQ explains it (T12) because the underlying model — purchases attach to a *payment email*, not to an account — is invisible and surprising.

## T6 Status & state language

**Item states — the purchase/ownership model is unusually simple, and the vocabulary reflects it** `[documented]`

| State | Vocabulary |
|---|---|
| `wishlist` / `wishlisted` | Pre-purchase intent; a noun and a verb |
| `collection` | What you own — "Your collection consists of the music you've paid for on Bandcamp, **plus the items you wishlist**" |
| `hidden` | An item concealed within your collection (`hide` / `How do I unhide a hidden purchase in my collection?`) |
| `private` | Wishlist visibility |
| `deleted` | `How do I delete items from my collection?` |
| `pre-ordered` | With partial immediate delivery |
| `subscribed` | Artist/label subscription state |

**The collection includes the wishlist.** "Your collection consists of the music you've paid for on Bandcamp, plus the items you wishlist" — owned and wanted items in one container. That is an unusual data model and the FAQ has to state it explicitly because it contradicts the word `collection`.

Critically, **there is no locked, expired, revoked or unavailable state for a purchase.** Compare Audible (157), whose entire T6 is a four-way entitlement grid with a lock icon. Bandcamp's purchase model produces no such states, and the absence is itself the product claim: `Can I re-download my purchases?` and `Are downloads from Bandcamp free of DRM (digital rights management) software?` exist as articles precisely to confirm that nothing can be taken away.

The one expiry that does exist is on the *link*, not the entitlement: `My download link has expired. Help!` — and the answer is a re-issue, not a loss.

**Merch order states** `[documented]` — a physical fulfilment state machine, named only through article titles:
`What's the status of my merch order?` · `mark items as shipped` (seller-side) · `I haven't received my physical order` · `I received my physical order, but something is missing` · `The item I received is damaged or incorrect` · `Why did I get a notification about an older order now being shipped?`

That last one is a **notification-timing state**: an order shipped long after purchase produces a notification that looks like an error. Documenting the surprising-but-correct case is good practice (see T9).

**Payout states** `[documented]`, the richest state vocabulary in the file:
- Default: "processed first by Bandcamp and paid out to your PayPal account **24-48 hours** later"
- High-value: "(Higher-value purchases, like a track that sells for $500, are **manually reviewed** and may take up to **14 days**.)"
- `Monthly Payouts`: "paid to your PayPal account **in bulk on the 1st of each month**"
- A split-payout state: "Monthly payouts may result in **two payouts on the 1st of the month**… so you may receive one payout for smaller sales, and one for larger sales" — because PayPal processes sales differently above and below **$8.07**
- A boundary state: "sales made during the **last two days of each month** might still be processing when the monthly payout triggers, so those sales will not be included in the payout until the following month"

`$8.07` is the most specific threshold in this batch of five products — a third-party processor's internal fee boundary, surfaced to sellers because it produces a visibly confusing two-payout outcome. Explaining a *cosmetic* anomaly (why you got two deposits) rather than only material ones is the mark of a support team writing from ticket volume.

**Fee states** `[documented]`
- `revenue share` at `15%` digital, dropping to `10%` "as soon as you reach $5,000 USD in sales (**and stays there, provided you've made at least $5,000 in the past 12 months**)" — a **reversible** tier, with the maintenance condition stated
- `Collection Society Share` — a named line item appearing only "if your work is covered by a collection society"
- A `"tip"` — "For additional fan contribution on a sale, this amount is considered a 'tip' and is not taxed"

**Service state** `[observed]` — the help centre's standing banner is a degraded-service notice, not a status page:
> "Hey there! We're experiencing a high volume of emails at this time and our response times are slower than usual. In the meantime, we've put together a list of common questions to help. We appreciate your patience."

A **support-capacity state** disclosed in the help-centre chrome, with a self-service redirect in the middle clause. No status page or component table was found anywhere (`[absent]`) — Bandcamp discloses the state of its *support queue* and not the state of its *service*.

## T7 Error, failure & recovery

**PRIORITY-ADJACENT. This is Bandcamp's strongest section, and the reason is the article titles.**

**Failure articles are written in the user's first person, as complaints** `[observed]` — 40+ of the 88 fan-side articles, and the most sustained example of this pattern in the corpus:

| Title (verbatim) | Note |
|---|---|
| `I lost my cart.` | Four words, full stop, no hedge |
| `My card was declined, but you still charged me!` | **An accusation, with an exclamation mark** |
| `My card was declined. What should I do?` | The calm sibling of the above |
| `I can't download this massive discography I just purchased!` | `massive` — the user's own exaggeration retained |
| `My download link has expired. Help!` | `Help!` as part of the title |
| `Why is my download missing tracks?` | |
| `My downloads won't play in my audio player. What's up?` | `What's up?` |
| `I'm unhappy with the audio quality of my download. What should I do?` | Dissatisfaction, not malfunction |
| `Some tracks are only 30 seconds long or samples. What gives?` | **`What gives?`** |
| `I never received the activation email for my fan account. Now what?` | `Now what?` |
| `I accidentally made more than one fan account. How do I merge them?` | `accidentally` — the user's own error, named without blame |
| `I haven't received my physical order. What should I do?` | |
| `I received my physical order, but something is missing.` | |
| `The item I received is damaged or incorrect.` | |
| `I'd like to change or cancel my order.` | |
| `I missed some (or all) of the live stream!` | The parenthetical escalation |
| `I bought a ticket, but I can't access the live stream!` | |
| `I can't attend the live stream. Can I transfer my tickets to someone else?` | |
| `I need a refund for my live stream ticket.` | A demand, not a question |
| `I pre-ordered an album, and it's now been released, but I still haven't received my link to the full download.` | **26 words** — the whole situation in one title |
| `Some of my purchases are missing from my collection. What do I do?` | |
| `I submitted my email address to receive a free download, but the download link hasn't arrived.` | |
| `My download code is invalid or has already been redeemed.` | |
| `When are you going to add scrobbling to the app?` | **A feature request as a help article** |
| `Playback in the app is flaky, or it stops and starts.` | `flaky` |
| `I just subscribed to an artist or label, but I don't see any of their releases.` | |
| `Why won't my tracks upload?` | Artist-side |
| `I made a sale, why haven't I been paid yet?` | Artist-side; **comma splice retained** |
| `My payout was less than I expected. Why?` | Artist-side |
| `Why can't I buy the physical version of this release?` | |
| `I'm having trouble streaming tracks on the website.` | |
| `I can't see the live stream chat.` | |
| `I can't find my download on my computer. Help!` | In-article heading |

**Analysis.** This is the Wise exemplar's "first-person confession" pattern, extended much further — into **complaint, accusation, exasperation and demand**. Three things distinguish it.

First, **the register is not sanitised.** `What gives?`, `What's up?`, `Now what?`, `Help!`, `massive`, `flaky`, and a title that ends in an exclamation mark after accusing the company of double-charging. Most help centres would render `My card was declined, but you still charged me!` as "Understanding pending authorisations". Bandcamp keeps the accusation as the title and answers it — which is both better for search and an implicit statement that the complaint is legitimate.

Second, **titles carry the whole situation, not the topic.** `I pre-ordered an album, and it's now been released, but I still haven't received my link to the full download.` is 26 words and reproduces the full causal chain the user would type. It is unsearchable by keyword-stuffing logic and perfectly findable by someone describing their problem.

Third, **the user's own error is named without softening or blame**: `I accidentally made more than one fan account`, `I lost my cart`. `accidentally` is the user's word; the title does not say "duplicate accounts" or "cart recovery".

**The one boundary the pattern respects:** `When are you going to add scrobbling to the app?` is a feature request filed as a help article. Answering (or at least acknowledging) roadmap questions in the knowledge base rather than deflecting them is a deliberate choice.

**In-article failure headings are compound, listing every symptom** `[observed]`

> `# When I try to unzip my album...I get an error message....I get a message saying the zip file is empty....I'm prompted to enter a password....some of the tracks are missing.`

Five distinct symptoms concatenated with ellipses into one heading, then one answer: "All of these errors indicate the same thing: that the downloaded file is incomplete, probably due to a hiccup in your internet connection."

**This is a deliberate and clever findability pattern.** Rather than writing five articles or one vaguely-titled article, the heading enumerates every error string the user might have actually seen, so any of them matches. The answer then collapses them to a single root cause in one sentence. Crude typographically (the run-on ellipses render badly) and highly effective.

The same technique appears as: `My download stopped before completing. What should I do? - or - My download is taking forever. Suggestions?` — two questions joined by ` - or - `.

**Recovery copy is specific, sequenced, and honest about third parties** `[observed]`

From `Download troubleshooting`:
- "try clicking the link in the Bandcamp email receipt again (**and if you're on wireless, try plugging directly in**)"
- "it could be that a firewall or another internet security tool is blocking it. Temporarily disable what you can, then try again."
- "**some ISPs throttle the speed of large downloads**, and the album downloads from Bandcamp (particularly the lossless formats) can be downright huge"
- Verification step: "You can verify that your download is complete by right-clicking it and selecting Properties (or, on a Mac, clicking it and choosing File > Get Info). **The size should match the file size listed on the Bandcamp download page.**"
- Format fallback: "If you've been trying to download one of the larger formats like FLAC or ALAC and would like to try a more compact, yet still high-quality format like MP3, just click the **format** again and **choose a new flavor**."

Two things worth stealing. The **self-verification instruction** — compare the downloaded file size against the figure shown on the download page — gives the user a way to confirm the diagnosis themselves rather than guessing. And the **format downgrade offered as a remedy**: the fix for a failing FLAC download is to switch to MP3, framed as "a more compact, yet still high-quality format" so the user does not read it as settling.

**Named causes, including the platform's own** `[observed]`
- "Apple Music does not support FLAC, **but you already knew that, right? Good.**"
- "many older software programs can't handle FLACs with sample sizes greater than 16 bits or sample rates higher than 44.1kHz. **We encourage artists to upload the highest quality sources they can get their hands on**, and more and more tracks are 24-bit/96kHz"
- "Some albums have a mix of 16- and 24-bit audio, **which explains why you might be able to play some tracks but not others.**"
- "**Long album & track names** can cause trouble" on older Windows unzippers, with a workaround (`C:\temp`)
- "**Punctuation & unusual characters** can make that old unzipper of yours sneeze"

The FLAC section is the best failure-explanation content in this batch: it names the platform's *own* policy (encouraging high-resolution uploads) as the cause of the user's problem, explains the technical boundary (16-bit/44.1kHz), and then explains the *partial* failure case — some tracks play, some don't — which is exactly the symptom that makes a user think their file is corrupt. And it ends with a concession rather than a claim: "Software support for FLAC is still iffy, especially for the newer high-quality formats."

**The escape hatch is offered without shame** `[observed]`
> "If you've tried it all to no avail, you, like we, may be wondering, '**Why even bother?**' If you'd prefer to skip all this downloading, unzipping, and importing altogether, consider installing our free mobile listening app."

The company **joins the user in questioning its own product's workflow** ("you, like we, may be wondering, 'Why even bother?'") and then offers the alternative. Self-deprecating, disarming, and it converts a support dead-end into a product adoption.

**Artist-side failure titles** `[observed]`: `Why won't my tracks upload?` · `I made a sale, why haven't I been paid yet?` · `My payout was less than I expected. Why?` · `A fan opened a dispute against a merch order. What should I do?` · `Why are my merch orders not showing up in my PayPal account?`

`My payout was less than I expected. Why?` is the money-anxiety article, and its existence beside the fees article means the *rule* and the *anomaly* are separately documented.

## T8 Empty states

**PRIORITY SECTION.**

**The tumbleweed GIF — the only observed empty-state illustration in this batch** `[observed]`

The search overlay, present on `/fair_trade_music_policy` and `/fans`, renders:

> `No matching results`
> "Try a different filter or a new search keyword."
> `![](https://bandcamp.com/img/search/tumbleweed-emptystate-lightbg.gif)`

Three parts: a **two-word state name**, a **two-branch recovery instruction**, and an animated tumbleweed. Note the filename — `tumbleweed-emptystate-lightbg.gif` — and that a `lightbg` variant implies a dark-background sibling. An empty state with a theme-aware asset is an empty state someone owns.

The copy itself is good and unremarkable: `No matching results` avoids the interpolation trap that broke Wise, Firefox, Audible and Shazam (see below), and "Try a different filter or a new search keyword" gives **two distinct levers** rather than a generic "try again". The tumbleweed carries the tone the copy deliberately doesn't.

**Bandcamp is the only product in this batch whose search empty state does not leak pre-query** `[observed]` — and the finding is worth stating explicitly given the pattern across the other four. Wise renders empty quotes; Firefox renders an empty interpolation; Audible renders `No articles found` beneath populated lists and `Search ""` as a label; SoundCloud renders a stray `0`. Bandcamp's overlay renders `No matching results` and `See all results` as sibling states in the DOM, correctly conditioned. **One of five got it right.**

**Entitlement-adjacent empty states, handled as explanations** `[documented]`

| Situation | Copy / article |
|---|---|
| Purchases not in collection | "You probably bought the music using a different email address." — then a four-step fix ending `Magic!` |
| Subscribed but no releases visible | `I just subscribed to an artist or label, but I don't see any of their releases.` |
| Pre-order released, no download yet | `I pre-ordered an album, and it's now been released, but I still haven't received my link to the full download.` |
| Free download requested, nothing arrived | `I submitted my email address to receive a free download, but the download link hasn't arrived.` |
| 30-second tracks instead of full ones | `Some tracks are only 30 seconds long or samples. What gives?` |
| Physical version unavailable | `Why can't I buy the physical version of this release?` |
| Collection item hidden | `How do I unhide a hidden purchase in my collection?` |

`Some tracks are only 30 seconds long or samples. What gives?` is the notable one — a **partial-content empty state**, where the user has something but not the thing they expected. Naming it in the user's exasperated voice and filing it first in `Buying & Paying` (the top of the section) treats it as the most common buying confusion, which for a platform where artists control preview length it probably is.

The missing-purchases answer ends `Magic!` — a one-word exclamation after a four-step settings procedure. Characteristic, and slightly jarring after a paragraph about payment-email reconciliation.

**A zero-inventory nav state** `[observed]` — the `Discover merch` cards (`Vinyl`, `CDs`, `Cassettes`, `T-Shirts`) and the genre/location tag clouds are always-populated by construction, so no empty variant is reachable. Note a defect in the genre cloud: `techno` appears **twice**, and `folk` links to `/discover/indie-rock`. A mislabelled tag in the homepage's primary discovery affordance.

**Genuinely absent** `[absent]`: first-run collection, empty wishlist, empty fan feed, empty merch-order list, seller dashboard with no sales, empty cart (though `I lost my cart.` documents its recovery). All behind auth.

## T9 Notifications & system messages

**The degraded-support banner — a capacity disclosure with a redirect** `[observed]`

> "Hey there! We're experiencing a high volume of emails at this time and our response times are slower than usual. In the meantime, we've put together a list of common questions to help. We appreciate your patience."

Four sentences: greeting → the cause → **the mitigation offered to the user** ("we've put together a list of common questions") → the ask. Disclosing that support is slow, in the help centre, with a self-service route embedded, is honest and practically useful. `Hey there!` is the register the rest of the site uses.

**The email-verification banner** `[observed]`
> "Hey! Please verify your email by clicking the link we sent to [address]. `Change email / Send again`"

Both recovery paths (wrong address / didn't arrive) in one control, interpolated destination, and it is rendered in the header rather than as a modal.

**Notification-timing surprises are documented** `[observed]`
- `Why did I get a notification about an older order now being shipped?` — an alarming-but-correct notification explained
- `I no longer want to receive emails. How do I unsubscribe?`
- `Never miss a release` — "We automatically notify your Bandcamp followers whenever you release new music or merch" (artist-side framing of the same channel)
- Live events: "**We notify your followers automatically**, and they can easily buy your music and merch while enjoying the show."
- Artist messaging: "Fans receive your messages on Bandcamp and **via good old-fashioned email**, so they never miss a thing."

`good old-fashioned email` is the house voice applied to a delivery channel. The artist-side copy also discloses the **targeting capability** — "even target your messages by location and level of support" — which tells artists that "level of support" is a segmentable attribute, i.e. that Bandcamp knows how much each fan has spent. A capability disclosure on the artist page that is also, implicitly, a data disclosure to fans.

**Receipt email as the canonical artefact** `[documented]` — the receipt is referenced as the recovery mechanism throughout: "click the link in the Bandcamp email receipt again", "if you paid for it, click the link in your Bandcamp receipt", "you'll find a link to retry it in the receipt we emailed you". Plus its own articles: `Where's my receipt email or download link?`, `Do you provide invoices for purchases?`, `Where's my download link?`.

For a DRM-free download store with no mandatory account, **the receipt email is the entitlement**, and the content treats it as such — every download failure routes back to it. That is a coherent model, and it is why `Where's my receipt email or download link?` is one of four promoted fan articles.

**The live sales ticker as an ambient notification** `[observed]` — see T2. Pausable, with two rotating joke captions.

**No status page.** `[absent]` No service-status link, component table or incident log was found in the nav, footer or help centre. The only system-health disclosure is the support-volume banner.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** The revenue split is disclosed four times across four surfaces, and **the four disclosures do not agree.** That is both the strongest and the weakest finding in this file.

### The Fair Trade Music Policy

`[observed]` The whole page is six sentences plus a heading, and it is the flagship artefact:

> "Bandcamp believes that music is an indispensable part of culture, and for that culture to thrive, artists must be compensated **fairly and transparently** for their work."
>
> "We're proud of the fact that when you choose to pay an artist on Bandcamp, your money reaches them **quickly**, and in a way that is **simple to explain and understand**. Our business, which was founded in 2008, is based on taking a revenue share of sales. **Our share is 15% on digital items, and 10% on physical goods.** Payment processor fees are separate and vary depending on the size of the transaction, but for an average size purchase, amount to an **additional 4-7%**. The remainder, **usually 80-85%**, goes directly to the artist or their label, **and we pay out daily.**"
>
> "Since we only make money when artists make a lot more money, our interests remain aligned with those of the community we serve. It's a straightforward approach, and one we're happy to say works well. Fans have paid artists and independent labels **$1.79 billion** using Bandcamp, and **$19 million in the past 30 days** alone. Thank you for being a part of a fair, sustainable music economy!"

**What this does exceptionally well.** It states the take rate as a **number, in the second sentence, on a page named after fairness.** It separates the platform's share from the processor's share and gives the processor's range rather than folding it in. It arrives at the artist's remainder (`usually 80-85%`) by subtraction that the reader can check. It states the payout cadence. It names the founding year, so the reader can weigh the claim against the company's age. It closes with a rolling 30-day figure (`$19 million in the past 30 days`) rather than only a lifetime total — a **recency proof** alongside the scale proof. And the criteria it sets for itself in sentence one — `fairly and transparently` — are then met in sentence three.

`simple to explain and understand` is the self-imposed standard, and the page is 176 words.

### Where the four disclosures diverge

| Surface | Artist's share | Bandcamp's share | Processor fees | Lifetime total | Payout timing |
|---|---|---|---|---|---|
| Fair Trade Music Policy | "usually **80-85%**" | 15% digital / 10% physical | "**4-7%**" | **$1.79 billion** | "we pay out **daily**" |
| `/about` | "an average of **82%**" | (alt text: "about **12%**") | "a small sliver" (alt text) | **$1.8 billion** | "typically in **24-48 hours**" |
| `/artists` | "an average of **82%**" | 10% merch / 15% digital | "separate and vary by the transaction size" | **$1.8 billion** | "typically within **24 to 48 hours**" |
| Fees help article | (not stated) | 15% digital, **dropping to 10% after $5,000**; 10% physical | "typically range between **4 and 6%**" | — | — |
| Payout help article | — | "**10-15%** revenue share" | — | — | 24–48h default; **monthly option**; up to **14 days** for high-value |

Five divergences, recorded as defects:

1. **`80-85%` versus `82%`** — a range on the policy page, a point average on both marketing pages. Not contradictory, but the policy page's range is wider than the marketing pages' average implies, and a reader comparing the two gets different expectations.
2. **`4-7%` versus `4 and 6%`** for processor fees. The flagship policy page quotes a wider range than the help article.
3. **`$1.79 billion` versus `$1.8 billion`** — the policy page is one rounding step behind the homepage, `/about` and `/artists`. The page whose entire purpose is transparency carries the stalest number.
4. **`we pay out daily` versus `24-48 hours` versus a monthly option.** The policy page's "daily" is defensible shorthand for a rolling 24–48-hour payout, but it is not what the help article says, and it omits the monthly alternative and the 14-day manual-review case entirely.
5. **The $5,000 fee drop is absent from the Fair Trade Music Policy.** This is the most substantive omission. The help article states that the digital revenue share "drops to 10% as soon as you reach $5,000 USD in sales (and stays there, provided you've made at least $5,000 in the past 12 months)" — a **volume discount on the platform's own take rate**, which is a genuinely favourable term and the single most artist-positive fact in the fee structure. It appears nowhere on the policy page, the artists page, or the about page. A transparency page that omits the best news about its own pricing.

The `/about` pie-chart **alt text** is its own finding: "A pie chart showing that 82% goes to the artist/label share, **about 12%** goes to Bandcamp's share, and a small sliver goes to payment fees." A fourth figure for Bandcamp's share — 12% — appearing only in an image description, reconciling neither to 15% nor to 10%. (It is presumably a blended average across digital and physical, but nothing says so, and it is visible only to screen-reader users and anyone reading the markup.)

### The fees article — the genuinely complete disclosure

`[observed]` `What are Bandcamp's fees?` is where the real rule set lives, and it contains four disclosures that appear nowhere on the marketing surfaces:

1. **The volume tier and its maintenance condition**: 15% → 10% at $5,000, "and stays there, **provided** you've made at least $5,000 in the past 12 months". A reversible discount, with the reversal condition stated.
2. **The $100 revenue-share cap**: "Because expensive items (like deluxe packages and beat licenses) are sometimes sold through Bandcamp and because **fans occasionally use name-your-price to pay hundreds of dollars for a single album or track**, the revenue share applies to the **first $100 of an item only**." A cap on the platform's own take, with its two motivating scenarios named. So a $500 name-your-price payment yields Bandcamp $15, not $75.
3. **Tip treatment**: "For additional fan contribution on a sale, this amount is considered a '**tip**' and is not taxed. **Please note that Bandcamp still collects revenue share on the first $100 for additional contributions.**" A favourable fact (not taxed) followed immediately by its qualifier (revenue share still applies) — the concession and its limit in adjacent sentences.
4. **Collection Society Share**: "If your work is covered by a collection society, you will also see a fee attributed to the **Collection Society Share**. This is a percentage of the sale price, **determined by the location of the fan**." A third deduction, named as a line item, with its variable disclosed (the buyer's geography, not the seller's).

`Shipping and tax, if applicable, are not included when calculating this fee` — the physical revenue share is scoped to the goods, not the total. Stated in one clause.

### Payout disclosure

`[observed]` See T6 for the states. The disclosure quality is high:
- The default and the alternative are both named, with the reason to choose the alternative given: "Monthly payouts may simplify your accounting as they consolidate sales and decrease the number of payouts you receive. For certain sellers, monthly payouts may also decrease PayPal's **1% payout fee**, as that fee is capped at **$1USD per payout**." A third-party fee structure explained well enough for the seller to optimise against it.
- The two-payout anomaly and its cause (`$8.07`) are explained (T6).
- The month-boundary exclusion is explained, with the reconciliation route named: "Your **Payout Statements** will help you identify which sales were included in which payout."
- The tax threshold: "Marketplaces like Bandcamp are **required by law** to collect tax information for all accounts that sell over **$5000 USD** in a calendar year. **Providing this information is necessary to receive payouts.**" Obligation, threshold, and the consequence of non-compliance.
- Marketplace tax: "Bandcamp also collects and remits the necessary **marketplace taxes** on physical orders for sellers." The platform's facilitator role stated.

### Buyer-side disclosure

`[observed]` The `Buying & Paying` collection titles constitute a disclosure inventory:
`How are credit card payments kept secure?` · `Do you provide invoices for purchases?` · `Can I see prices in my currency and check shipping costs?` · `How do I request a refund?` · `How do I modify or remove my stored credit card details?` · **`Example Withdrawal Form`** · `What do US tariffs mean for my merch orders?`

**`Example Withdrawal Form`** is the standout: the EU/UK consumer right-of-withdrawal template, published as a help article in the ordinary flow of buying content rather than buried in the terms. A statutory artefact given the same status as "where's my receipt".

`What do US tariffs mean for my merch orders?` is a live-policy article — a geopolitical trade change surfaced as a buyer help topic, the same "FAQ as currency-of-policy surface" pattern the Wise exemplar records.

**Rights disclosure to buyers** `[observed]`
- `Are downloads from Bandcamp free of DRM (digital rights management) software?` — the initialism glossed in the title
- `Can I use the music that I bought in my YouTube video/commercial/podcast?` — the **licence-scope** question, asked in the buyer's three actual use cases rather than as "usage rights"
- `Publishing royalty collection on Bandcamp` (linked from the fees article)

`Can I use the music that I bought in my YouTube video/commercial/podcast?` is the right way to ask a licensing question: three concrete downstream uses in the title, so the buyer recognises their own situation.

**Quality disputes routed to the artist, not the platform** `[documented]`
> "If you have questions about the quality of specific track or album files, we recommend **getting in touch with the artist directly**. Just click the 'Contact' link on their Bandcamp page."

A marketplace declining to adjudicate product quality and naming the route to the seller. Paired with `I'm unhappy with the audio quality of my download. What should I do?` as a separate article, so the *feeling* and the *route* are both addressed.

### Chart and industry reporting

`[observed]` "We submit sales to **SoundScan, ARIA Charts, OfficialCharts (UK & Ireland), and the Official New Zealand Music Charts.**" Four named chart bodies across four territories — a disclosure that matters to artists and would be meaningless as "we report to industry charts".

### Advertising and data

`[observed]` "Music is art, not 'content.' **You'll never see an ad on Bandcamp.** At times, we partner with like-minded brands to bring more exposure to your music… all while **keeping your fans' data protected.**" The absolute claim, then the partnership concession, then an unspecified data assurance. `keeping your fans' data protected` is the weakest sentence on the artists page — a protection claim with no mechanism, on a page otherwise built on specifics.

### Press-contact boundary

`[observed]`
> "Please direct press inquiries to press@bandcamp.com"
> "**General support messages sent to this address will not receive a response** – if you're an artist, label, or fan and have a question about the site, please visit our Help Center."

A named channel with an explicit negative scope. Stating that off-topic mail will be ignored, rather than silently ignoring it, is a small courtesy most companies skip.

## T11 Help-centre architecture

**Platform:** Intercom Help Center on a separate domain (`get.bandcamp.help`) with a separate visual identity. Legacy Zendesk-style URLs (`/hc/en-us/articles/23020665520663-...`) 301-redirect to Intercom slugs (`/en/articles/15263193-...`) — a **migrated help centre with working redirects**, which is worth recording as good practice; the old IDs still resolve.

**Structure:** three levels — `All Collections` → collection → sub-collection → article, with breadcrumbs showing all four (`All Collections > Fans & Buyers > Downloading Music > Which audio format should I download?`). Some articles sit five deep (`… > Artists & Labels > Getting Paid > Payouts & Fees > What are Bandcamp's fees?`).

**Article-title grammar — three shapes, dominated by the first person**

| Shape | Share | Examples |
|---|---|---|
| **First-person complaint / question** | ~45% of the fan side | `I lost my cart.` · `My card was declined, but you still charged me!` · `Where's my download link?` · `I'm unhappy with the audio quality of my download. What should I do?` |
| `How do I <verb>…?` | ~30% | `How do I add music to my collection?` · `How do I request a refund?` · `How do I unzip my album download?` · `How do I delete my fan account?` |
| Statement / gerund | ~25% | `Paying with PayPal` · `Sending gifts` · `Gift cards` · `Download troubleshooting` · `Payment Troubleshooting` |

**The first-person share is the highest in the corpus.** And the titles are punctuated as sentences — full stops, question marks, and at least two exclamation marks (`My card was declined, but you still charged me!`, `I can't download this massive discography I just purchased!`). A help centre whose titles are punctuated utterances rather than labels.

Casing is **sentence case throughout**, consistently — one of the few products in this batch with a stable casing rule. Exceptions: `Payment Troubleshooting` and `Example Withdrawal Form` (Title Case) beside `Download troubleshooting` and `General troubleshooting` (sentence case). Three troubleshooting articles, two casings.

**Article furniture** `[observed]`: breadcrumb → H1 → **a one-to-two-sentence summary in the same position as the meta description** (Intercom renders the SEO summary as body text, so every article opens with its own abstract) → a date (`June 12, 2026`) → body → `Related Articles` (five) → `Did this answer your question?`

**The summary-as-standfirst is a genuine strength.** Every article begins with a complete answer in one or two sentences:
- "MP3 is the standard format for fast downloads and high compatibility. For optimal audio quality or burning a CD, choose FLAC, ALAC, AAC, Ogg Vorbis, WAV, or AIFF."
- "Bandcamp takes a share of each sale: 15% on digital items and 10% on physical goods. Payment processor fees are added on top and vary by transaction. Once an artist reaches $5,000 in sales, the digital fee drops to 10%."
- "You'll get paid through your connected PayPal account. By default, Bandcamp sends payouts 24–48 hours after a sale is processed, but you can also choose monthly payouts if you prefer. Some larger purchases may take longer to review."

A reader who stops after the standfirst has the answer. This is the **answer-first / details-after** pattern, and it is applied to every article rather than to the featured ones. Note that the standfirst on the fees article contains the $5,000 tier that the Fair Trade Music Policy omits — the summary of a help article is more complete than the policy page.

**Feedback widget** `[observed]`
> `Did this answer your question?`
> `Disappointed Reaction😞` · `Neutral Reaction😐` · `Smiley Reaction😃`

A **three-point emoji scale whose accessible labels are named** (`Disappointed Reaction`, `Neutral Reaction`, `Smiley Reaction`) rather than being bare emoji. Three points rather than binary is a small improvement on the Yes/No used by Firefox, Audible, Shazam and SoundCloud — it gives the "sort of" answer a home. The question asks about answering; the responses measure feeling, the same prompt/response mismatch recorded for Audible (157).

**Routing furniture** `[observed]`: `How can we help you?` → three audience buttons → promoted `Common … topics` → sub-collections. Escalation is `Contact Us` in the footer only, plus the standing slow-response banner. **No chat, no ticket form, no AI agent, no forum** — and no human-support promise beyond the artists page's claim of a "crack team of human experts".

**Cross-linking discipline** `[observed]` — the articles link densely and by name: the fees article links to the processor-fee article, the collection-society FAQ, the metadata article and the raw-data sales report; the download article links to general troubleshooting, the expiry article, two third-party unzip tools (7-Zip, Zipeg), VLC, the FLAC command-line tools, and Wikipedia's audio-file-format page. **Linking out to competitors' and third parties' tools** (VLC, 7-Zip) to solve a problem Bandcamp's own files caused is a service-over-territory decision.

**One broken and one leaking link** `[observed]`: the download article links `My download has expired. Help!` to `.../15263206-my-download-link-is-expired-help` while the collection index lists the slug as `...-my-download-link-has-expired-help` — a **slug mismatch between two references to one article**. And the article renders six empty anchor links exposing internal section IDs as bare href fragments: `#busted`, `#incomplete`, `#error`, `#flac_rash`, `#format_rash`, `#treasure_hunt`. The internal naming (`flac_rash`, `treasure_hunt`) is visible in the shipped page — a small, revealing leak of the writer's own section shorthand.

## T12 FAQs

**One inline FAQ block, four questions, on `/fans`** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How do I add music to my collection? |
| 2 | Some of the music I've purchased via Bandcamp isn't showing up in my collection. What do I do? |
| 3 | I already have a Bandcamp artist account, can I sign up for a fan account too? |
| 4 | Can I make my collection private? |

Answers summarised. Q1 defines the collection as purchased items **plus** wishlisted items, then gives the two ways to add (buy it, or click the heart below the cover art). Q2 diagnoses the cause in the first clause ("You probably bought the music using a different email address"), then gives a four-step settings path to add additional payment emails, closing `Magic!`. Q3 answers yes and explains how to make the artist and fan accounts one — with the parenthetical "(so there's no logging out of one and in to the other nonsense)". Q4 gives two separate privacy mechanisms: per-item `hide` on hover, and a `private` dropdown for the wishlist.

**Structural analysis.** Four questions, and **two of them are about account identity confusion** (Q2, Q3). That is the tell: Bandcamp's account model — purchases attach to a payment email, and artist and fan accounts are separate objects that can be merged — is the platform's principal source of user confusion, and the FAQ on the fan-signup page is largely devoted to it. Q1's answer has to *redefine the word `collection`* because the product's meaning differs from the English one.

Q3's parenthetical — "so there's no logging out of one and in to the other nonsense" — is the voice: the company names its own architecture's friction as `nonsense` in the copy that explains it.

Q1 is placed first despite being the most basic, and Q2 second despite being a failure — so the block runs **task → failure → identity → privacy**, which is roughly the order a new fan account holder encounters them.

**Question-shaped article titles across the help centre** are the real FAQ estate — 60+ of the 88 fan-side titles are questions or complaints (see T7 and T11). The notable clusters:

*Ownership and permanence:* `Can I re-download my purchases?` · `Are downloads from Bandcamp free of DRM (digital rights management) software?` · `Can I use the music that I bought in my YouTube video/commercial/podcast?` · `Can I download files directly to my device and listen to my collection with another app?`

*Format and quality:* `In which formats can I download my purchases?` · `Which audio format should I download?` · `I'm unhappy with the audio quality of my download. What should I do?` · `I downloaded FLAC, and I'm having trouble playing it back. Any advice?`

*Account identity:* `Can I unlink a payment email from my Fan account?` · `I accidentally made more than one fan account. How do I merge them?` · `How do I delete my fan account?`

The **ownership cluster is the distinctive one.** Four consecutive questions all asking, in different words, *is this really mine and can I do what I want with it?* — which is the question a DRM-free download store must answer repeatedly, and which a streaming service never faces. `Can I download files directly to my device and listen to my collection with another app?` is the purest version: a platform being asked whether you may leave it with your purchases, and answering.

**Artist-side questions** `[observed]`: `How do I get paid on Bandcamp, and how often?` (**a compound question pairing mechanism with cadence** — the Wise compound-question pattern) · `What are Bandcamp's fees?` · `Why won't my tracks upload?` · `I made a sale, why haven't I been paid yet?` · `My payout was less than I expected. Why?` · `How and why should I upload lossless files?` (**another compound — procedure and rationale in one title**) · `Can I upload higher resolution audio?` · `Which sales report should I use?`

`How and why should I upload lossless files?` is the best compound: the artist is told how to do it and why it matters in one title, so the instruction arrives with its motivation.

## T13 Terminology & glossary

**PRIORITY SECTION.**

| Term | Bandcamp's usage | The alternative it rejected |
|---|---|---|
| `directly support` | The core verb phrase; **bolded or italicised every occurrence**, and hyperlinked to the Fair Trade Music Policy | "stream", "listen", "follow" |
| `Fair Trade Music Policy` | The revenue-split disclosure, named as a policy with a moral certification borrowed from commodity ethics | "Pricing", "Fees", "Revenue share" |
| `revenue share` | Bandcamp's cut — "We call this fee **our revenue share**" | "commission", "platform fee", "take rate" |
| `Collection Society Share` | A named third deduction, varying by the **fan's** location | "publishing royalties", "PRO fee" |
| `online record store` | The self-description, before `music community` | "streaming platform", "marketplace" |
| `records` | The unit in the homepage headline, applied to digital sales | "purchases", "items", "albums" |
| `collection` | Purchased items **plus** wishlisted items | "library", "purchases" |
| `wishlist` | Noun and verb ("the items you wishlist") | "saved", "favourites" |
| `fan` / `Fan Page` / `fan account` / `Fans & Buyers` | The buyer identity; capitalised inconsistently | "customer", "user", "listener" |
| `Bandcamp Friday` | The community-originated monthly fee-waiver event, with a help article and an external site (`isitbandcampfriday.com`) | |
| `name-your-price` | The pay-what-you-want pricing mode, hyphenated as a unit | "pay what you want", "flexible pricing" |
| `tip` | Fan contribution above the set price — scare-quoted in the fees article | "donation", "additional payment" |
| `merch` | All physical goods, throughout, never "merchandise" | "physical goods" (used only in the policy page's fee sentence) |
| `Compact discs` (nav) / `CDs` (cards) | Two forms on one page | |
| `MP3 V0` / `MP3 320` | Two MP3 variants as peer menu options | "High quality" / "Standard" |
| `FLAC` · `ALAC (Apple Lossless)` · `AAC` · `Ogg Vorbis` · `WAV` · `AIFF` | Six further formats, only ALAC glossed | |
| `lossless` | The format class — `How and why should I upload lossless files?` | "high-resolution", "studio quality" |
| `"audiophiles and nerds"` | **The audience for non-MP3 formats, named in scare quotes with an `*ahem*`** | "advanced users", "enthusiasts" |
| `a new flavor` | What you pick when you change download format | "a different format" |
| `audio CD` / `data CD` | Two burn targets, distinguished and each linked to a how-to | "CD" |
| `DRM (digital rights management)` | Glossed in the article title | |
| `discography` | A whole-catalogue purchase — `I can't download this massive discography I just purchased!` | "bundle" |
| `Enhanced Payments` | The card/gift-card payment system | "checkout" |
| `Payout Statements` | The reconciliation artefact | "reports" |
| `Album and track codes` | Single-use redemption codes | "promo codes", "vouchers" |
| `Listening Clubs` / `Listening Parties` | Two similarly-named social features in two places | |
| `Bandcamp Pro` | The $10/month artist tier, tagged inline on gated features | |
| `Bandcamp Daily` (brand) / `Editorial` (nav label) | Two names, one destination | |
| `Buttons/Logos` | Embed assets, in the footer | "widgets", "embeds" |
| `tapeheads` | Cassette buyers, in the audience list: "vinyl collectors, **tapeheads**, digital audiophiles" | "cassette listeners" |
| `The Man` | The antagonist in the ticker caption | |
| `content` | **Used only pejoratively**: "Music is art, not 'content.'" | |

**`"audiophiles and nerds"` is the best piece of terminology in this file, and possibly in this batch.**

Full context, from `Which audio format should I download?`:
> "The default download format is MP3, and this is probably what you want."
> …
> "You can also download in FLAC, ALAC (Apple Lossless), AAC, Ogg Vorbis, WAV, and AIFF formats. These options are, *ahem*, for '**audiophiles and nerds**.' If you aspire to become either, [Wikipedia's audio file format page] isn't a bad place to start."

Why this works. The product exposes eight codec identifiers in a dropdown — a genuinely intimidating technical choice for a non-technical buyer. Bandcamp's solution is not to rename them, hide them, or add a "recommended" badge. It is to:

1. **Give the default and endorse it outright** — "this is probably what you want", which is the single most useful sentence a format-choice article can contain.
2. **Justify the default with the buyer's actual concerns** — "These files play back beautifully in Apple Music, Windows Media Player, your iPhone/Android phone, etc., and include high-quality cover art, accurate artist and track names, and lyrics when available." Compatibility and metadata, not bitrate.
3. **Explain the engineering choice in benefit terms** — "Our MP3s use variable bit-rate encoding (VBR) to reduce file size while maintaining the highest quality, so you get **faster downloads and can fit more songs on your phone**." The acronym is given, then immediately cashed out into two consequences the reader cares about.
4. **Name the other audience with a self-aware joke** — `*ahem*` signals the writer knows `nerds` is cheeky; scare quotes distance it further; and `nerds` is claimed as self-description rather than aimed at the reader.
5. **Offer a route in** — "If you aspire to become either, this isn't a bad place to start", linking to Wikipedia. The joke does not exclude; it invites.
6. **Handle the one concrete use case separately** — "**Burning a CD?** Your best bet would be to download in WAV or AIFF for an audio CD (most common) or in MP3 for a data CD", each linked to an external how-to.
7. **Route the failure** — "**Are you having trouble downloading?** Visit this page."

Seven moves, roughly 150 words. **This is the model for any interface that must expose a genuine technical choice to a mixed audience: endorse a default, justify it in the user's terms, name the expert audience with humour rather than jargon, and give the one concrete decision rule that most non-default users actually need.**

`choose a new flavor` (from the troubleshooting article) is the same instinct applied to the act of switching — a format becomes a flavour, which is both friendlier and accurate to how a buyer experiences the choice.

**`directly support` is the phrase the business is built on**, and its treatment is exemplary: always emphasised, always hyperlinked to the evidence, and never varied. Four surfaces, one phrase, one destination. Compare the three-name drift SoundCloud (159) shows for its single Standard-plan benefit, or the four trial-CTA labels in Audible (157).

**`revenue share` over `commission`** is a deliberate framing: a share implies a division of something jointly produced, a commission implies a fee for a service rendered. The Fair Trade Music Policy's arithmetic then makes the share literal.

**`content` used only as a pejorative** — "Music is art, not 'content.'" — is a terminology *prohibition* rather than a choice, and it is honoured: the word appears nowhere else in the harvested marketing copy as a descriptor of music.

**`tapeheads`** in the audience enumeration is a small act of subcultural fluency: "vinyl collectors, tapeheads, digital audiophiles, and people who just want to support their favorite artists". Four buyer types, three of them named in the community's own slang, and the fourth defined by motive rather than format.

**Register split.** Marketing and help share one voice — unusually, the help centre is *more* colloquial than the marketing pages (`What gives?`, `a new flavor`, `sneeze`, `flaky`). The only flattened register is the fees and payout articles, where the numbers are, and the Fair Trade Music Policy, which is plain and declarative. **Tone flattens where the money is** — the Wise gradient, correctly applied.

## T14 Voice, tone & accessibility

**Published style guidance:** `[absent]`. No Bandcamp content style guide, voice documentation or design system found. The voice is nonetheless the most distinctive and most consistent in this batch of five.

### Observed register

**Person.** Second person for the user; first-person plural for the company, and — notably — **first-person *singular* for the writer** in the help centre: "**I** ask: are you using an older version of Windows?", "you, like **we**, may be wondering". A help article with an authorial `I` is rare and signals that a person, not a content system, wrote it.

**The house voice is: a knowledgeable friend who is slightly amused, occasionally political, and never patronising.** Its devices:

*Hyperbole and mock-grandeur*
- "Even **Carl Sagan** could not compose an analogy sufficient to describe the number of reasons why this might be"
- "Further **unsolicited approbation** that's more than 280 characters:"
- "Bask in **well-deserved prestige**" / "Your **handsome mug**"
- "Share your **impeccable taste**"

*Self-deprecation about its own product*
- "If you've tried it all to no avail, you, like we, may be wondering, '**Why even bother?**'"
- "(so there's no logging out of one and in to the other nonsense)"
- "our **Bandcamp Limited Edition iPods**" (a joke about a product that does not exist)
- "**Software support for FLAC is still iffy**"

*Concession of ignorance and uncertainty*
- "Apple Music does not support FLAC, **but you already knew that, right? Good.**"
- "we're **not there yet**"
- "Chances are *very good* your browser or network is to blame"

*Colloquial physicality*
- "can make that old unzipper of yours **sneeze**"
- "album downloads… can be **downright huge**"
- "a **hiccup** in your internet connection"
- "choose a new **flavor**"

*Reassurance formulas*
- `Have no fear, just follow the instructions here.`
- `No problem: just click on the link in your receipt email…`
- `Magic!`
- `Yep, it's free!`

*Editorial opinion*
- "Music is art, not 'content.'"
- "when you hear 'nobody pays for music anymore,' that's just **The Man** spreading his agenda"
- "so that you, not **some cheesy lyric site or exploitative social network**, get first crack at engaging your fans"
- "**what a great world we live in**" (about 24-bit/96kHz uploads)

`some cheesy lyric site or exploitative social network` is the most pointed line on the artists page — naming two competitor categories with two different insults, inside an SEO feature description.

**Exclamation marks are used freely** (`Magic!`, `Help!`, `Yep, it's free!`, `Thank you for being a part of a fair, sustainable music economy!`, `What gives?`, and two in article titles) — the opposite of the Wise and Firefox discipline, and consistent with the register. No `Oops!`.

**Where the voice correctly withdraws:** the Fair Trade Music Policy (plain, declarative, no jokes), the fees article, the payout article, the tax paragraphs, the press-contact boundary. `Thank you for being a part of a fair, sustainable music economy!` is the single flourish permitted on the policy page, and it is the last line.

**Numbers are specific and abundant:** `$1.8 billion`, `$1.79 billion`, `$19 million in the past 30 days`, `63,136 records`, `15.7 million digital albums`, `11.4 million tracks`, `1.6 million vinyl records`, `850,000 CDs`, `250,000 cassettes`, `50,000 t-shirts`, `$225 million`, `82%`, `80-85%`, `15%`, `10%`, `4-7%`, `4 and 6%`, `12%`, `$5,000`, `$100`, `$8.07`, `1%`, `$1USD`, `24-48 hours`, `14 days`, `50% of the time`, `18 years`, `2008`, `12 other currencies`, `24-bit/96kHz`, `16 bits`, `44.1kHz`, `30 seconds`, `$10 per month`.

**`(which they do, 50% of the time)`** is the most rhetorically effective of them — a parenthetical statistic that answers the objection its own feature raises.

### Accessibility

**Bandcamp has the best incidental accessibility practice in this batch, and no accessibility statement at all.**

**What is genuinely good** `[observed]`

- **`Skip to content`** first in the DOM on the homepage, `/about` and `/artists`.
- **The live sales ticker is pausable**, with explicit `pause` / `unpause` controls and a rendered `paused` state. A continuously-animating, auto-updating component with a user-accessible stop is the correct handling of WCAG 2.2.2 (Pause, Stop, Hide), and it is the only such component in this batch.
- **Descriptive, informative alt text on the data visualisation**: "A pie chart showing that 82% goes to the artist/label share, about 12% goes to Bandcamp's share, and a small sliver goes to payment fees." The alt text **conveys the data**, not the chart type alone — which is correct practice and rarely done. (It also carries a figure that appears nowhere in the visible copy; see T10.)
- **Named accessible labels on emoji controls**: `Disappointed Reaction😞` / `Neutral Reaction😐` / `Smiley Reaction😃`, rather than bare emoji. Compare Audible's `Yes👍` / `No👎`.
- **Photo credits as alt text plus caption**: `![Smoking Time Jazz Club]` with the caption "*Smoking Time Jazz Club // Peter Broussard*" — subject and photographer both named.
- **Named `Previous`/`Next`-equivalent destinations** in the help centre breadcrumbs.
- **Constraint disclosed at the control**: `A desktop browser is required to sign up.`
- **Empty state is correctly conditioned** — `No matching results` does not leak pre-query (T8), the only one of five products in this batch to get this right.
- **The help centre migration preserved old URLs** with working 301s.

**What is missing or broken** `[observed]`

- **No accessibility statement, no VPAT, no conformance claim, no accessibility page, no accessibility help article.** `Accessibility` appears nowhere in the nav, the footer, the help-centre collections, or the 88 fan-side article titles. The footer's legal group has room for a `Fair Trade Music Policy` but not an accessibility policy.
- **The homepage headline's key numbers are inside `<strong>` on `/artists` but the homepage version is plain text** — inconsistent emphasis markup for identical content.
- **Images with empty `src` and empty `alt`** throughout the homepage editorial rails (`![](https://f4.bcbits.com/img/0047506298_0)` has a src but no alt; the search overlay and player render `![](<>)`). Album artwork on the homepage carries **no alt text at all**, where Audible's equivalent rails carry formulaic but present descriptions.
- **The `/fans` benefit images are linked with empty link text**: `[](/img/fans/fans-10-download2-big.jpg)` — four instances of a link whose entire content is nothing, announced as an unlabelled link.
- **Six empty anchor links exposing internal section IDs** in the download-troubleshooting article: `[](#busted)`, `[](#incomplete)`, `[](#error)`, `[](#flac_rash)`, `[](#format_rash)`, `[](#treasure_hunt)`. Six unlabelled links at the foot of the page, plus two more (`[](#h_76182639b8)`, `[](#h_43759adb0f)`) in the payout article.
- **`Search for artist, album or track (optional)`** — a placeholder that contradicts its control (T3/T5).
- **The compound ellipsis headings** (`When I try to unzip my album...I get an error message....I get a message saying the zip file is empty....`) are effective for search and hostile to a screen reader, which will announce five concatenated fragments as one heading. Two-, three- and four-dot ellipses in one string.
- **Gesture- and position-dependent instructions** with no alternatives: "click the **wishlist** button on any artist's site (it's the heart icon below the cover art)", "clicking the 'hide' link that appears on the item **when you hover over it**", "click your profile pic icon on the far right of the menu bar", "look for the **format dropdown** beside the download link". The `hide` control is **hover-only** as documented — no keyboard or touch path is given for a privacy feature.
- **Windows-and-Mac-only recovery instructions** in the download troubleshooting article; no Linux, iOS or Android desktop-equivalent path for the file-verification step.
- **The duplicated `/artists` sentence** ("Over our 18 years in business we've become an indispensable, growing source of income for cutting-edge artists and labels like:" followed immediately by a near-identical restatement) — a responsive-variant duplication that a screen reader may announce twice.
- **`techno` appears twice** in the homepage genre cloud, and **`folk` links to `/discover/indie-rock`** — a mislabelled navigation link in the primary discovery affordance.
- **Video content with no transcript note**: `/artists` embeds an MP4 loop of a performance; no caption or transcript reference.

### Negative findings, recorded honestly

- **Five divergent statements of the revenue split and payout timing** across the Fair Trade Music Policy, `/about`, `/artists`, the fees article and the payout article (T10). The policy page carries the stalest lifetime figure (`$1.79 billion` vs `$1.8 billion`), the widest processor-fee range (`4-7%` vs `4 and 6%`), a share range rather than the marketing pages' average (`80-85%` vs `82%`), and an over-simplified payout cadence (`daily`).
- **The $5,000 fee drop — the most artist-favourable term in the pricing — is absent from the Fair Trade Music Policy, `/about` and `/artists`**, appearing only in the help article.
- **A fourth Bandcamp-share figure (`about 12%`) appears only in pie-chart alt text**, reconciling to nothing in the visible copy.
- `Compact discs` (nav) vs `CDs` (merch cards) on one page
- `Editorial` (nav) vs `Bandcamp Daily` (brand) for one destination
- `Learn more` vs `Learn more and sign up` adjacent in the `/artists` hero
- `Sign up` / `sign up` and `Log in` / `log in` — both casings on one page
- `Listening Clubs` (help collection) vs `Listening Parties` (artists page feature) — two similarly-named social features
- `Payment Troubleshooting` / `Download troubleshooting` / `General troubleshooting` — three articles, two casings
- Slug mismatch between two references to the download-expiry article (`...-link-is-expired-...` vs `...-link-has-expired-...`)
- Eight empty anchor links exposing internal section IDs (`#flac_rash`, `#treasure_hunt`, `#h_76182639b8`)
- Four empty-text links wrapping images on `/fans`
- Album artwork on the homepage carries no alt text
- `Search for artist, album or track (optional)` — placeholder contradicts the control
- `techno` duplicated and `folk` mislinked in the homepage genre cloud
- Duplicated introductory sentence on `/artists`
- `Getting Started for Fans` contains two articles, both of which are failure articles
- `Clubs` appears in the nav on some pages and not others
- The compound ellipsis headings use two-, three- and four-dot ellipses in one string
- `keeping your fans' data protected` — a protection claim with no mechanism, on a page otherwise built on specifics
- No accessibility statement, page, article or conformance claim anywhere
- No status page or service-health disclosure; the only system message is a support-queue banner

---

## Transferable patterns

1. **Hyperlink your value-proposition phrase to its own proof.** `directly support` is emphasised on every surface and linked to the Fair Trade Music Policy, which states the take rate in its second sentence. A claim that routes to its evidence in one click is worth more than three paragraphs of substantiation. Condition: the evidence page must actually contain a number.
2. **Name the split as a *policy*, put it in the legal footer, and state the arithmetic so the reader can check it.** "Our share is 15% on digital items, and 10% on physical goods… payment processor fees… amount to an additional 4-7%. The remainder, usually 80-85%, goes directly to the artist." 176 words, one page, linked from every footer. Then — and Bandcamp fails this — **keep every other surface's numbers in sync with it.**
3. **Endorse a default, then name the expert audience with humour rather than jargon.** "The default download format is MP3, and **this is probably what you want.**" … "These options are, *ahem*, for 'audiophiles and nerds.' If you aspire to become either, [here] isn't a bad place to start." The full seven-move pattern in T13 is the model for exposing any genuine technical choice — codec, encryption level, payout rail, risk threshold — to a mixed audience.
4. **Cash out every acronym into two consequences the reader cares about.** "Our MP3s use variable bit-rate encoding (VBR) to reduce file size while maintaining the highest quality, **so you get faster downloads and can fit more songs on your phone.**" Not "learn more about VBR" — the benefit, immediately, twice.
5. **Write the complaint, not the topic — including the accusation and the exclamation mark.** `My card was declined, but you still charged me!` · `I lost my cart.` · `Some tracks are only 30 seconds long or samples. What gives?` · `I pre-ordered an album, and it's now been released, but I still haven't received my link to the full download.` The Wise confession pattern extended into complaint and demand. Condition: it only works if the answer then treats the complaint as legitimate.
6. **Concatenate every error string the user might have seen into one heading, then collapse them to one cause.** "When I try to unzip my album...I get an error message....the zip file is empty....I'm prompted to enter a password....some tracks are missing." → "**All of these errors indicate the same thing:** that the downloaded file is incomplete." Maximal findability, one maintained answer. Fix the typography.
7. **Give the user a way to verify the diagnosis themselves.** "You can verify that your download is complete by right-clicking it and selecting Properties… **The size should match the file size listed on the Bandcamp download page.**" A self-check converts a guess into a confirmation and halves the follow-up ticket.
8. **Offer the downgrade as a remedy, framed so it isn't a loss.** "If you've been trying to download one of the larger formats like FLAC or ALAC and would like to try a **more compact, yet still high-quality** format like MP3, just click the format again and choose a new flavor."
9. **Name your own policy as the cause of the user's problem.** "**We encourage artists to upload the highest quality sources they can get their hands on**, and more and more tracks are 24-bit/96kHz… On unsupported software, these FLACs sound wrecked by static." Then explain the partial-failure case ("Some albums have a mix of 16- and 24-bit audio, which explains why you might be able to play some tracks but not others"), which is the symptom users misread as corruption.
10. **Pre-empt cynicism about your own heading with a parenthetical subhead.** `## Artists first` / `### (the money-where-mouth-is version)`. Three words that concede the heading is a cliché and promise to substantiate it.
11. **Answer the cost objection in three words at the point of hesitation.** `Yep, it's free!` directly beneath `Sign up`. And disclose the constraint at the control: `A desktop browser is required to sign up.`
12. **Put an inline statistic in the parenthetical that answers the objection your feature raises.** "specify a minimum and let fans pay more if they want **(which they do, 50% of the time)**."
13. **Pair the lifetime number with a recency number.** "$1.8 billion using Bandcamp, **and yesterday alone bought 63,136 records**" / "$19 million in the past 30 days alone." Scale plus proof-of-life, in one sentence. And make the *user* the subject: `Fans have paid artists…`, not "we have paid out".
14. **Make the alt text carry the data, not the chart type.** "A pie chart showing that 82% goes to the artist/label share, about 12% goes to Bandcamp's share, and a small sliver goes to payment fees." Condition: the figures in the alt text must match the figures in the copy. Bandcamp's do not.
15. **Pause control on any auto-updating ambient component**, with a rendered `paused` state. Bandcamp's live ticker is the only component in this batch that does this.
16. **Disclose support-queue state, with a self-service route in the middle of the sentence.** "We're experiencing a high volume of emails… **In the meantime, we've put together a list of common questions to help.** We appreciate your patience."
17. **Give a contact channel an explicit negative scope.** "General support messages sent to this address will not receive a response – if you're an artist, label, or fan and have a question about the site, please visit our Help Center."
18. **Cap your own take rate and say why.** "the revenue share applies to the first $100 of an item only" — with the two motivating scenarios named (deluxe packages; name-your-price payments of hundreds of dollars). A self-limiting fee rule, disclosed with its reasoning.

## Caveats & gaps

- **Three policy pages were not fetched:** `bandcamp.com/copyright`, `bandcamp.com/privacy`, `bandcamp.com/terms_of_use`, and the `Acceptable Use & Moderation Policy` help article. T10 therefore covers commercial, fee, tax and consumer-rights disclosure but **no data-privacy or moderation disclosure at all**. The Acceptable Use & Moderation Policy in particular is the trust-and-safety artefact and is a significant omission.
- **`bandcamp.com/labels` and `bandcamp.com/pro` not fetched.** The third audience (labels) is entirely unexamined, and the paid artist tier's pricing page was not opened — `$10 per month` is known only from a sentence on `/artists`.
- **`bandcamp.com/guide` (the Bandcamp Artist Guide) not fetched.** It is referenced twice on `/artists` as the canonical guidance on "how to achieve financial success on the site" and is likely the richest single creator-content artefact on the site.
- **The `Artists & Labels` help collection index was not opened**, so the creator-side article count and sub-collection names are known only from the help-centre home page's summary list. The 88-article figure and the eight sub-collections are for `Fans & Buyers` only.
- **High-value articles identified but not opened:** `Bandcamp Friday Help`, `Publishing royalty collection on Bandcamp`, `How much are payment processor fees for digital sales?`, `My payout was less than I expected. Why?`, `Required Tax Information`, `What about taxes?`, `How do I request a refund?`, `Example Withdrawal Form`, `What do US tariffs mean for my merch orders?`, `Are downloads from Bandcamp free of DRM…?`, `Can I use the music that I bought in my YouTube video/commercial/podcast?`, `How and why should I upload lossless files?`, `Music Metadata on Bandcamp`, `I'm unhappy with the audio quality of my download`. `Bandcamp Friday Help` is the most conspicuous — it documents the monthly fee-waiver event that has its own external fan site linked from the help masthead.
- **All in-product UI is `[documented]`**: the format dropdown, the download page, the collection, wishlist, cart, fan page, seller dashboard, payout statements, merch order management. Only the marketing and help surfaces were observed.
- **No prices for goods were captured**, and none are quotable — Bandcamp's prices are artist-set per item, and per the brief no individual artist or album page was opened. `$10 per month` for Bandcamp Pro is the only price in this file.
- **Search behaviour not exercised.** The `No matching results` empty state was observed in the served markup of the search overlay rather than by submitting a query, so it is recorded as observed-in-DOM. The help centre's own search was not exercised.
- **No status page exists to harvest.** Marked `[absent]` after checking nav, footer and help centre.
- **No accessibility statement exists to harvest.** Marked `[absent]` after checking the same three locations plus all eight fan-side help sub-collections.
- **No published content style guide or design system.** T14 is inferred entirely from shipped copy — which in Bandcamp's case is unusually informative, because the voice is so consistent that the implicit rules are legible.
- **en-US only.** The help centre serves `hc/fr` and `hc/pt-br` paths; none were examined. The marketing site shows a `Language: English` control with no visible alternatives in the served markup.
- **Per the brief, no individual artist, album, track or fan page was opened.** All findings come from Bandcamp's own marketing, policy and help content. This means the purchase flow itself — the `name-your-price` field, the cart, the format selector in situ, and the checkout — is entirely unobserved, and is where most of the purchase vocabulary actually lives.
- **The `$1.79 billion` / `$1.8 billion` and `4-7%` / `4 and 6%` divergences are recorded as observed on the dates fetched**; one or more pages may simply be mid-update rather than wrong. The `$5,000` fee-tier omission from the Fair Trade Music Policy is not explicable that way.

## Sources

1. https://bandcamp.com/
2. https://bandcamp.com/about
3. https://bandcamp.com/artists
4. https://bandcamp.com/fans
5. https://bandcamp.com/fair_trade_music_policy
6. https://get.bandcamp.help/hc/en-us
7. https://get.bandcamp.help/en/collections/19694684-fans-buyers
8. https://get.bandcamp.help/en/articles/15263193-what-are-bandcamp-s-fees
9. https://get.bandcamp.help/en/articles/15263080-how-do-i-get-paid-on-bandcamp-and-how-often
10. https://get.bandcamp.help/en/articles/15263234-in-which-formats-can-i-download-my-purchases
11. https://get.bandcamp.help/en/articles/15263285-which-audio-format-should-i-download
12. https://get.bandcamp.help/en/articles/15263158-download-troubleshooting
