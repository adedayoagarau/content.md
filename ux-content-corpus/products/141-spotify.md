# 141. Spotify

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Music streaming (ad-supported freemium + subscription audio: music, podcasts, audiobooks) |
| Primary URL | https://www.spotify.com/ |
| Corpus rank | 141 |
| Benchmark strength (source list) | Personalization, playback, plan states |
| Locale / market observed | en-US (`/us/` paths; `support.spotify.com/us/`) |
| Platform observed | Web (marketing), web (support centre), accessibility centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a as a financial/health product. Visible regimes: CCPA (`Your Privacy Choices` + CCPA opt-out icon, `Notice at Collection`), COPPA-style parental-consent flow via third-party age assurance (Yoti), Canadian-style accessibility-plan structure (statement + plan + annual report + feedback process) |
| Harvest date | 2026-09-21 |
| Pages inspected | 7 |
| Harvest completeness | Partial — marketing, plan, help-IA, troubleshooting, parental-control and accessibility surfaces captured. No first-party status page exists (see T9). Help-article bodies sampled, not exhausted (~350 article titles observed in the persistent help mega-nav). |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Root (US) | https://www.spotify.com/us/ | **Redirects to `open.spotify.com`** — the web player, not a marketing page. No marketing hero at the root. |
| Premium (primary marketing) | https://www.spotify.com/us/premium/ | Hero, feature grid, plan table, offer disclosures, footer |
| Spotify Free | https://www.spotify.com/us/free/ | Free-tier value prop + 3-question FAQ |
| Support home | https://support.spotify.com/us/ | Six top-level categories, ~25 sub-sections, ~350 article titles, AI search disclosure |
| Troubleshooting article | https://support.spotify.com/us/article/spotify-not-playing/ | Highest-value T7 artefact |
| Managed accounts | https://support.spotify.com/us/article/managed-accounts/ | Highest-value T10 artefact — parental consent, age assurance, young-listener vocabulary |
| Accessibility Center | https://www.spotify.com/us/accessibility/ | Statement + plan IA |

---

## T1 Navigation & IA labels

**Global nav is a plan menu, not a feature menu** `[observed]`

`Premium plans` (dropdown) · `Support` · `Download` · `Sign up` · `Log in` · `Try 3 months for $0`

The dropdown items carry a **three-part label: plan name + seat count + audience clause**, all rendered as one link:

| Link text (verbatim) |
|---|
| `Premium Individual 1 account - For one person.` |
| `Premium Duo 2 accounts - For couples under one roof.` |
| `Premium Family Up to 6 accounts - For family under one roof.` |
| `Premium Student 1 account - Discount for eligible students.` |

Pattern worth stealing: the nav item answers *who is this for* and *how many seats* before the user clicks. `under one roof` does the residency-restriction work colloquially, and is repeated as the formal disclosure (`For couples who reside at the same address.`) further down the page. Same constraint, two registers, same page.

**Footer — four groupings, one of them audience-typed** `[observed]`

`Company` · `Communities` · `Useful links` · `Spotify Plans`

`Communities` is the notable one: it is not a content grouping but a **list of the other audiences Spotify serves** — `For Artists` · `For Creators` · `For Authors` · `Developers` · `Advertising` · `Investors` · `Vendors`. A single consumer footer routes seven non-consumer audiences off-site.

**Defect** `[observed]`: the footer's `Communities` block is **not stable across surfaces**. On `support.spotify.com/us/article/spotify-not-playing/` it renders `For Artists · Developers · Advertising · Investors · Vendors` (5 items), dropping `For Creators` and `For Authors` present in the same block on `support.spotify.com/us/` and on `/us/premium/`.

**Support-centre IA — six categories, ampersand-joined pairs** `[observed]`

| Category | Sub-sections |
|---|---|
| `Payments & billing` | `Recommended topics`, `Manage payments`, `Payment methods`, `Charge help` |
| `Manage your account` | `Logging In`, `Profile Help`, `Account settings`, `Security` |
| `Premium plans` | `Available plans`, `Plan settings`, `Premium Family`, `Premium Duo`, `Premium Student`, `Managed accounts` |
| `In-app features` | `Getting started`, `App settings`, `Troubleshooting`, `Playlists`, `Features`, `Social features`, `Podcasts`, `Audiobooks`, `Live events`, `Listening privacy` |
| `Devices & troubleshooting` | `Speakers`, `Smart watches`, `TVs`, `Gaming`, `Cars`, `Voice assistants` |
| `Safety & privacy` | flat (3 articles, no sub-sections) |

Two structural choices are unusual. First, `Devices & troubleshooting` is split **by device class, not by symptom** — the taxonomy assumes the user knows their hardware is the variable. Second, the whole six-category tree is **re-rendered in full at the foot of every article page** (~350 links), so every article ends with the entire help centre rather than a scoped "related" set. There *is* a scoped `Related Articles` block above it; the mega-nav duplicates it.

**Breadcrumb** `[observed]`: two levels only — `Home` › `In-app features`. The sub-section (`Troubleshooting`) is not in the breadcrumb even though it is in the IA.

## T2 Value proposition & headline patterns

**Hero — a rotating-noun slot machine** `[observed]`

> `The ultimate home for - music - artists - fans - live events - videos`

The headline is a single frame with a cycling object. It names five content classes in one line, which is how Spotify communicates catalogue expansion (video, live events) without a separate section. Rendered in server HTML as a dash-joined run, so a screen reader or text extractor receives all five nouns as one string — worth flagging as a suspected accessibility issue (not confirmed; ARIA handling not inspected).

**Section headers are declarative claims, each with a sub-claim beneath** `[observed]`

| Section header | Subhead |
|---|---|
| `As the world's music hub, Spotify is where fans and artists come together.` | "It's the place to discover the perfect song for the moment." |
| `With music that never stops` | (feature list follows) |
| `Made for how you listen` | `Where new music finds you first, and fandom goes deeper.` |
| `The best place to listen with your crew` | `Your friends and family are already here. Collaborating, sharing, and listening together.` |
| `Everything you love, right here` | `Dive into audiobooks, podcasts, and workouts too, all in one place.` |
| `Listen to Spotify anywhere` | "Spotify is compatible with over 2,000 devices." |
| `Shaping the big moments in music` | `Spotify is where music breaks and culture moves. Be here when history hits play.` |
| `The world is listening here.` | `Join the party with Premium.` |

The pattern is **header = positioning, subhead = mechanism**. Note `your crew` — the only slang in the header set, used for the social section.

**Free-tier page uses a completely different register** `[observed]`

> `Play millions of songs and podcasts for free`
> `Why Spotify?`
> `It's free. No credit card required.`
> `Ready? Let's play.`

Four benefit labels, all imperative or possessive fragments: `Play your favorites` · `Playlists made easy` · `Make it yours` · `Save mobile data`. The Free page is written for a first-time installer; the Premium page is written for a switcher. `No credit card required` is the one line doing real conversion work and it sits alone, unstyled, between the benefit grid and the FAQ.

**Feature framing on Premium — label + mechanism, with the limit named** `[observed]`

- `Ad-free music listening` — "All the music, without all the ads. Just nonstop beats."
- `Lossless music` — "Lose yourself in music with sound quality up to 24-bit/44.1 kHz."
- `Offline listening` — "Download thousands of songs, or let Offline Backup do it automatically."
- `Play songs in any order` — "Repeat songs, play albums in any order, and skip as many times as you want."

`Play songs in any order` is the sharpest of these: it is a **Premium benefit defined by the absence of a Free-tier restriction**. Spotify never says "Free is shuffle-only" on the marketing page; it says Premium lets you play in any order. The restriction is only stated plainly in the help centre (see T6).

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try 3 months for $0` | Global nav, hero, feature block, plan card | Appears **4×** on one page, always with the same disclosure paragraph beneath |
| `View all plans` | Hero, secondary | Anchor link to `#plans`, not a page |
| `Try 1 month for $0` | Student plan card | Same grammar, different number |
| `Get Premium Duo` | Duo plan card | Verb differs from the trial CTAs (`Get` vs `Try`) — because there is no trial |
| `Get Premium Family` | Family plan card | |
| `Learn more` | Audiobooks Access block | The one bare `Learn more` on the page |
| `Or sign up to Spotify for free.` | Below the plan table | **Sentence-case, full stop, leading `Or`** — a full sentence as a link |
| `Sign up free` | Free page, ×2 | |
| `Sign up` / `Log in` | Nav, all surfaces | |
| `Install App` | Support nav | **Inconsistent with `Download` in the marketing nav** — same destination family, two labels |
| `Explore Premium` | Support nav | Upsell inside support |
| `Manage your accountYour profile, payment and more.` | Article-top module | Label + description concatenated without separator in server HTML |
| `Go to Community` | Support home | |
| `Search or ask in Community` | Article foot | Same destination as `Go to Community`, different label |
| `Suggest a feature` | Help article title used as nav | |
| `Contact us` | Help, repeated in 4 sub-sections | Deliberately placed **last** inside `Charge help`, `Security`, `Troubleshooting`, `Manage your account` |
| `Skip to content` | First in DOM, marketing pages | Accessibility |
| `Terms apply` | Beneath every priced CTA | Disclosure link, treated as a CTA slot |

**Observation.** The `Try` / `Get` split is doing real work: `Try` is used only where a $0 period exists, `Get` where the user pays from day one. That is a rare instance of CTA verb encoding commercial state rather than being chosen for tone.

**Observation.** `Or sign up to Spotify for free.` is the free tier's entire representation on the Premium page — one sentence-case link under a four-column paid table. The ad-supported tier is not a column.

## T4 Onboarding & getting-started

No public step-by-step signup narrative on the marketing pages `[absent]`. Onboarding is documented in help `[documented]`:

`Getting started on Spotify` · `What is Spotify?` · `Your Library` · `Now Playing view` · `Where is Spotify available?` · `Your Premium benefits` · `Supported devices for Spotify`

The `Getting started` sub-section leads with orientation articles and **ends with two audience-switch articles** (`Spotify for Artists`, `Spotify for Creators`), so the consumer getting-started shelf doubles as a creator off-ramp.

**Managed-account setup is the one fully specified flow** `[documented]`, and it is branched by the parent's existing plan state before any step is given:

| Branch label (verbatim) | Consequence |
|---|---|
| `If you're a Premium Family plan manager` | "The managed account will be a member of your plan, unless your plan has no available slots." · `Uses 1 of your 6 available plan slots` |
| `Everyone else` | "the managed account will be on our free, ad-supported plan" · `Parents or legal guardians can manage up to 10 accounts` |

Then a terminal CTA per branch: `Set up a managed account on Premium Family` / `Set up a managed account on our free, ad-supported plan`. The CTA restates the whole condition rather than saying `Continue` — so a user who lands mid-page can still tell which branch they are in.

Numbered step copy inside the consent flow is bare imperative + UI label: `Select Continue.` · `Select Get started.` · `Select the type of ID you want to use, and Continue.` · `Select Continue to take a selfie.`

## T5 Form & field labels

Pre-auth forms are minimal. What is observable `[observed]`:

- Support search field is labelled **`Ask`** — not "Search". A one-word label that reframes the help centre as a conversational surface.
- Beneath it, a persistent disclosure: `You're engaging with an AI-powered tool.` followed by `Learn` (link) `how your data is managed and shared.` The link is the word `Learn`, mid-sentence, pointing at the Privacy Policy — a short link target inside a sentence, which is weak link text.
- Free-page FAQ answers quote in-product labels: `Tap Your Library.` · `Tap CREATE.` (all-caps in the original) · `Tap Home.` · `Tap Settings.` · `Tap Data Saver.` · `Switch on Data Saver.`

**Inconsistency** `[observed]`: `Tap CREATE.` (all caps) on the Free page vs `Select Continue`, `Tap Settings and privacy`, `Select Account`, `Tap Close my account` in the help centre (title case / sentence case). Two conventions for quoting a UI control.

Settings labels quoted in help `[documented]`: `Settings and privacy` · `About` · `Account Privacy` · `Request data` · `Close account and delete data` · `Close my account` · `Report` · `Submit` · `Done`.

## T6 Status & state language

**Plan states are the primary state vocabulary** `[documented]` via help titles:

`Your Spotify plan details` · `Premium not working` · `Can't join Family plan` · `Can't join Duo plan` · `Renew Premium Student` · `Premium Student verification not working` · `Spotify disabled accounts` · `Graduating to a self-managed account`

`Graduating to a self-managed account` is the standout: the account-type transition for a young listener reaching adulthood is named with a **positive life-stage verb** rather than a system verb (`upgrade`, `convert`, `migrate`). A content designer handling any age-gated account transition should steal this.

**Playback and availability states** `[documented]`:

- `Spotify is offline` — offline is modelled as a *state of Spotify*, not of the device
- `Tracks grayed out?` — the greyed-out track is named by its visual appearance, because that is all the user can see. Three causes are then listed: device in offline mode, network, or "not available in your market."
- `Missing music or podcasts` — catalogue withdrawal as a first-class help topic
- `Faulty or inaccurate metadata` — the platform documents its own data errors
- `Ongoing issues` — the substitute for a status page (see T9)

**Free-tier restriction, stated only in help** `[documented]`: "Listeners on our free plan can't always skip or choose songs. Songs will play in shuffle with similar songs included." The hedge `can't always` is doing a lot of work; the marketing page states the inverse as a Premium benefit instead.

**Billing states** `[documented]`: `Your billing date` · `Canceled but still charged` · `Charged for a free trial` · `Price updates` · `Failed payment help`.

## T7 Error, failure & recovery `[documented]` / `[observed]`

Spotify publishes **no error-code taxonomy**. There are no named codes anywhere on the public surfaces — a deliberate contrast with Netflix (142). Errors are instead addressed by **symptom-named articles**, and the in-product error strings are quoted inside them.

**In-product error strings, quoted in help** `[documented]` — only two exist publicly:

> "If you're having technical issues when playing something on the Spotify app, or see a `'Page not available'` or `'Something went wrong'` error, try these first:"

Both are generic. Spotify's entire consumer-facing playback error surface is two untyped strings, and the diagnosis burden is moved into the article.

**The article structure is a triage ladder, not a cause list** `[observed]` (`Spotify not playing`):

1. `Quick fix` — three actions, cheapest first: `Restart the Spotify app` → `Update the app` → `Reinstall the app`, with a cost warning attached to the most destructive step: "**Note:** You need to re-download any downloaded music and podcasts after reinstalling the app."
2. A locale caveat before anything else fails: "**Note:** If you're abroad and experiencing playback issues, you may need to change your account settings."
3. `Other things to try` — four generic device actions
4. Four **symptom-router sub-headings phrased as user questions**:
   - `Issues with the sound or volume?` → `Can't hear Spotify.`
   - `Problems with listening offline?` → `Listen offline.`
   - `Issues with local files?` → `Local files.`
   - `Tracks grayed out?` → inline causes
5. `Is it your device?` — an **isolation test** ("See if the issue happens on a different device, or when using the web player") followed by five device preconditions including `Your device has at least 250MB of available memory` and `Your SD card is not causing problems, try removing it (Android only)`
6. `Is this a known issue?` — escalation to `@SpotifyStatus` and the Community `Ongoing Issues board`
7. Handoff out: "If this didn't help, you may need to troubleshoot further with the device's manufacturer."

**Recovery-step grammar.** Bare imperative verb phrases, no subject, no politeness marker: `Restart the Spotify app` · `Make sure your internet connection is stable` · `Close any other apps you aren't using` · `Clear cache on your device`. Conditions are written as **assertions the user must confirm**, not as instructions: "Make sure: Your device is supported for Spotify and up-to-date / Your firewall isn't blocking Spotify (desktop only)". This "make sure + list of true statements" construction is compact but puts the verification burden on the reader.

**Failure-title grammar — four shapes** `[observed]`:

| Shape | Examples |
|---|---|
| `Can't <do thing>` | `Can't log in to Spotify` · `Can't play abroad` · `Can't join Family plan` · `Can't hear any sound on Spotify` · `Can't subscribe to Premium in the iOS app` |
| `<Thing> not working` / `not playing` | `Premium not working` · `Spotify not playing` · `Premium Student verification not working` |
| `Charged <adverbially>` | `Charged too much` · `Charged twice` · `Charged for a free trial` · `Canceled but still charged` · `Charged but don't use Spotify Premium` |
| `Why …?` / question | `Why has the app changed?` · `Think your account's been hacked?` · `Is this Spotify email legit?` |

The `Charged …` set is the best of these. Five titles, all past-participle fragments with no subject, each naming a *distinct billing grievance* rather than collapsing into one "billing problems" article. `Canceled but still charged` names the contradiction the user is experiencing; `Charged but don't use Spotify Premium` names a grievance that isn't even an error.

`Why has the app changed?` is rare — a help article for **the product having been redesigned**, i.e. for a failure the company caused deliberately.

`Is this Spotify email legit?` is written in the user's own suspicious register, second person implied, and sits under `Security` next to `Think your account's been hacked?` — both are questions, both pre-empt rather than instruct.

## T8 Empty states

`[absent]` on the surfaces reached. No search-no-results state was triggerable without submitting a query to the `Ask` tool, which was not done. In-app empty states are behind auth.

One adjacent artefact `[observed]`: the support home carries a `Quick help` module — five hard-coded article links (`Can't log in to Spotify`, `Failed payment help`, `Charged too much`, `Invite or remove Family plan members`, `How to change your payment details`) that function as a **pre-emptive high-frequency shortcut rail**, i.e. an anti-empty-state for the help landing page. Four of the five are failure articles.

## T9 Notifications & system messages

**No first-party status page.** `[observed]` This is the most significant negative finding on Spotify. The escalation path for a suspected outage is:

- `Check @SpotifyStatus for any ongoing issues` — a link to **x.com/spotifystatus**, a third-party social platform
- `Use our Community's Ongoing Issues board to find helpful tips and information`, with the caveat "**Note:** If you don't find your issue on the Community, you can post about it and get help from our Community members **in English**."

So outage communication is delegated to (a) a social network the user may not use and (b) a peer forum that is English-only. For a product with a 60+ locale footprint, the incident-communication layer is the weakest content surface in the file.

**AI-disclosure banner** `[observed]` — persistent, above the support search on every help page:

> `You're engaging with an AI-powered tool.` `Learn` how your data is managed and shared.

Short, present-continuous, second person. It discloses the *nature of the tool* before the user types, not after. Worth stealing as a pattern; the link text (`Learn`) is the weak part.

**Notification design documented to the user** `[documented]`: `Your Spotify notification settings` · `Your Updates` · `Presale and merch emails` · `Spotify Messages` · `Recent activity`. Data-readiness notification described explicitly: "Young listeners get an in-app notification when their data is ready for download. Then, they have **14 days** to complete the download."

**In-page marketing banner** `[observed]` — the `Reserved` live-events block:

> `Introducing Reserved`
> `Get exclusive access to live shows near you, with the artists you love most.`
> `Concert tickets, saved for real fans`

Then, immediately: `Limited eligibility; tickets not guaranteed; select tours; purchase required.` `Terms apply.` A four-clause semicolon-run that negates most of the promise directly beneath it. Compare the Wise "claim, then bound the claim" pattern — Spotify does the bounding but does **not** route to a personalised figure, so the user is left with an unresolvable "am I eligible?".

## T10 Disclosures, legal & compliance

**The repeated-offer-disclosure pattern** `[observed]`. The same paragraph appears **three times verbatim** on `/us/premium/`, once under each instance of `Try 3 months for $0`:

> `Premium Individual only. Free for 3 months, then $12.99 per month after. Offer only available if you haven't tried Premium before.` `Terms apply` `. Offer ends September 23, 2026.`

Five clauses in fixed order: **scope → price cliff → eligibility exclusion → terms link → expiry date.** The price cliff (`then $12.99 per month after`) is in the same sentence as the free period, not a footnote. The eligibility exclusion is stated positively-negatively ("only available if you haven't"). The hard expiry date makes the page **self-dating** — harvested 2026-09-21, the offer expires 2026-09-23, so this copy has a two-day shelf life.

**Plan table — disclosure lives inside the benefit list** `[observed]`

| Plan | Price | Benefit bullets (verbatim) |
|---|---|---|
| `Individual` | `$0 for 3 months` / `$12.99 / month after` | `1 Premium account` · `15 hours/month of listening time from our audiobooks subscriber catalog` · `Cancel anytime` |
| `Student` | `$0 for 1 month` / `$6.99 / month after` | `1 verified Premium account` · `Discount for eligible students` · `Access to Hulu` · `Cancel anytime` |
| `Duo` | `$18.99 / month` | `2 Premium accounts` · `15 hours/month … (plan manager only)` · `Cancel anytime` |
| `Family` | `$21.99 / month` | `Up to 6 Premium accounts` · `Parental controls over all plan members` · `15 hours/month … (plan manager only)` · `Plan members under 13 get Premium benefits` · `Cancel anytime` |

Three things to note. `Cancel anytime` is a **benefit bullet in all four plans**, not a footnote — cancellation is sold as a feature. The `(plan manager only)` qualifier is bracketed inline inside the audiobook bullet on the multi-seat plans, so the entitlement asymmetry is disclosed at the point of the entitlement rather than in a footnote. And `1 verified Premium account` on Student quietly discloses a verification gate inside a seat count.

**Residency restriction, twice, two registers** `[observed]`: nav says `For couples under one roof.`; plan footnote says `For couples who reside at the same address.` / `For up to 6 family members residing at the same address.`

**Ad-supported tier framing** `[observed]`. Spotify never calls it "the ad-supported tier" on the plan page. It is:
- `Spotify Free` in the footer and page title (`Play free on mobile`)
- `Or sign up to Spotify for free.` under the plan table
- `our free, ad-supported service` / `our free, ad-supported plan` in the help centre — the adjective pair only appears in support copy
- On the `Audiobooks Access` block, the ad tier is disclosed as a **downgrade consequence**: "Your music listening experience will be on our free, ad-supported service."

That last one is the most honest instance: buying the audiobooks plan puts your *music* on ads, and the disclosure says so in the product block.

**Parental-control and young-listener vocabulary — the strongest T10 material** `[documented]`

Profile / account types: `managed account` · `young listener` · `self-managed account` · `plan manager` · `plan member` · `Spotify Kids` (a separate, still-documented product). Framed audience line at the top of the article: **`For`: `Parents or legal guardians`** — a labelled audience field, not a sentence.

Scope sentence: "Managed accounts let young listeners explore music only, while you control the experience." `music only` is the entitlement boundary stated in two words.

The all-plans guarantee list is written as capability *and* restriction in one run:
- `Parental controls for explicit content, videos, specific artists or songs, and more`
- `Separate accounts with separate music recommendations`
- `You'll need to log in for them, but they won't be able to access your Spotify`
- `Profiles that can't be followed or searched by other users`
- `No in-app purchases`

Bullet three is the best line in the file: it names the parent's inconvenience (`You'll need to log in for them`) *before* the reassurance, in one sentence, with `but`. Most products would split these or drop the inconvenience.

**Age assurance and parental consent** `[documented]`. Two named methods, each a heading:

| Method (verbatim heading) | Copy substance |
|---|---|
| `Photo of your ID and a selfie` | Government ID + selfie verify adulthood. Retention disclosed: encrypted, "deleted by Yoti after the check is complete." |
| `Credit or debit card` | Card used for adulthood verification. "**Note:** We'll place a temporary authorization hold on your card. **This isn't a purchase or fee**, and is for verification purposes only. Your bank will automatically release the authorization, which may take several business days. We won't save your card details." |

The card note is a model disclosure: it names the mechanism, **pre-emptively negates the wrong interpretation** ("This isn't a purchase or fee"), states who resolves it (the bank, automatically), bounds the duration vaguely but honestly ("several business days"), and states the retention position. Directly transferable to any payment-method-verification hold.

Third party named explicitly: "This may include verification through Yoti, a trusted digital identity company." Naming the vendor, with a one-clause gloss, and linking to a dedicated `age-assurance` page.

**Child-safety reporting flow, with the device handoff written into it** `[documented]`:

> `Select Report.` An in-app message will ask young listeners to **hand the device to their parent or guardian**. Once the parent or guardian enters the PIN, they'll be directed to the 'report content' page.

A moderation flow that includes a **physical-world instruction** (hand over the device) as a step. Then PIN gate, then the parent completes the form "using their details". Prioritisation is stated rather than implied: "We always prioritize the review of reported content that impacts young listeners, presents a greater risk of offline harm, or may be illegal."

**Irreversibility warning** `[documented]`: "For managed accounts, all account data will be permanently deleted. If the account is part of a Premium Family plan, it will also be removed from the plan. **This action can't be undone.**" Three consequences then the finality line — consequences before the warning, which is the right order.

**Rights delegation stated symmetrically** `[documented]`: the parent can exercise the young listener's privacy rights, *and* "All young listeners can exercise their privacy rights within the app without parental support, including: Downloading their account data / Deleting their data and closing their account." A minor can close their own account without the parent. Stated plainly, not buried.

**Named legal/disclosure surfaces** `[observed]`: `Legal` · `Safety & Privacy Center` · `Privacy Policy` · `Cookies` · `About Ads` · `Accessibility` · `Notice at Collection` · `Your Privacy Choices` (+ CCPA opt-out icon) · `Platform Rules` · `Parental guide` · a separate `managed-account-plan-manager-privacy-policy`.

**Defect** `[observed]`: the support left-nav reads `Safety and Privacy Centre` (British `-tre`) while the footer on the same en-US page reads `Safety & Privacy Center` (US `-ter`). Same destination, two spellings, one locale. Also `Safety & privacy` (category) vs `Safety and Privacy Centre` (article) — ampersand vs word.

## T11 Help-centre architecture

Three-level: **category → sub-section → article**, with the full tree persistently re-rendered below every article (see T1).

**Article-title grammar — six shapes** `[observed]`:

| Shape | Example |
|---|---|
| `How to <verb>` | `How to cancel Premium plans` · `How to reset or change your Spotify password` · `How to enable private listening` |
| `<Gerund> your …` | `Reinstalling your Spotify app` · `Updating your Spotify app` · `Closing your account and deleting your data` |
| `Your <noun>` | `Your Spotify plan details` · `Your billing date` · `Your Premium benefits` · `Your Library` · `Your Updates` |
| `Can't <verb>` | `Can't log in to Spotify` · `Can't play abroad` |
| Bare noun/feature | `DJ` · `Equalizer` · `Play Queue` · `Local files` · `Offline Backup` · `Exclusive mode` |
| Question | `What is Spotify?` · `Why has the app changed?` · `Is this Spotify email legit?` · `Does the price for Premium include tax?` |

The `Your …` family is doing possessive-framing work: `Your billing date`, `Your plan details`, `Your Premium benefits` — the system's records described as the user's property. Compare `Check your receipts`, which switches to imperative for the same object class.

**Routing furniture, in order** `[observed]`: `Ask` (AI search, first and largest) → `Browse help articles` (the six categories) → `Quick help` (5 hard-coded high-frequency links) → `Visit our Community` / `Go to Community` → and `Contact us` **only as an article inside four sub-sections**, never as a top-level route. Human contact is not a nav item on this help centre. That is a deliberate and aggressive self-service posture; `Contact us` appearing four times inside category lists is how it is smuggled back in.

**One-third of the six categories are feature-shaped, not task-shaped** (`In-app features`, `Features` sub-section, plus the bare-noun article family). The bare-noun articles are a directory of coined product terms — useful as a glossary (T13) but low-signal for a user who does not know the term.

## T12 FAQs

**Placement 1 — Spotify Free page, heading `Got questions?`** `[observed]`. Three questions only. Answers are present in server HTML (unlike many accordion FAQs) and are numbered UI step lists rather than prose.

| # | Question (verbatim) | Answer shape |
|---|---|---|
| 1 | How do I create a playlist? | One-sentence purpose statement, then a 4-step tap sequence |
| 2 | How do I activate Data Saver mode? | 4-step tap sequence, no preamble |
| 3 | Where can I find Podcasts? | Two sentences, no numbering |

All three are **how-to, none are commercial**. A free-tier acquisition page whose FAQ contains no question about price, ads, limits, or upgrade. The nearest thing to a commercial answer is the unheaded line `It's free. No credit card required.` above the block. Either a deliberate choice to keep the free page frictionless, or a gap — the shuffle-only restriction (see T6) is the obvious unanswered question and it is not here.

Q1's answer opens with *why* before *how* ("Playlists are a great way to save collections of music, either for your own listening or to share.") — the only one of the three that does.

**Placement 2 — Premium page: no FAQ block at all** `[observed]`. The highest-intent commercial page has zero FAQ. All plan questions are pushed to `support.spotify.com` under `Premium plans`, which functions as the de-facto FAQ: `Premium Individual`, `Premium Student`, `Duo plan`, `Family plan`, `Basic plans`, `Hulu with Premium Student`, `Premium for Starbucks Partners`.

`Basic plans` and `Premium for Starbucks Partners` exist only in help — two plan families with no marketing surface, discoverable only by browsing support. A finding worth recording: the plan taxonomy in help is **larger than the plan taxonomy on the marketing page**.

## T13 Terminology & glossary

| Term | Spotify's usage | The alternative it rejected |
|---|---|---|
| `managed account` | Account type controlled by an adult | "child account", "kids account" |
| `young listener` | The person using a managed account | "child", "minor", "kid" |
| `self-managed account` | A normal adult account, named only in contrast | "regular account" |
| `Graduating to a self-managed account` | The age-out transition | "upgrading", "converting" |
| `plan manager` | Bill payer and controller on Duo/Family | "account owner", "admin" |
| `plan member` | The other seats | "user", "sub-account" |
| `Premium Individual` | The single-seat paid plan | "Personal", "Basic" (which Spotify uses for a *different*, help-only plan family) |
| `Audiobooks Access` | A plan that grants audiobook hours but not ad-free music | "audiobook add-on" |
| `audiobooks subscriber catalog` | The bounded audiobook library | "our audiobook library" |
| `listening time` | Audiobook entitlement unit, in hours/month | "credits", "titles per month" |
| `DJ` | AI-hosted personalised radio | "AI DJ" (used in press, not in the help title) |
| `daylist` | Time-of-day playlist | lowercase, one word — deliberately un-capitalised |
| `Jam` | Real-time shared listening session | "group session", "party" |
| `Blend` | Two-person taste-merge playlist | "shared mix" |
| `Wrapped` | Annual listening recap | "Year in review" |
| `Reserved` | Fan-priority concert-ticket access | "presale", "priority access" |
| `Offline Backup` | Automatic pre-download | "smart download" |
| `Exclusive mode` | (audio-device output mode) | — |
| `Spotify Connect` | Cross-device playback handoff | "cast", "remote control" |
| `Now Playing view` | The full-screen player | "player", "full screen" |
| `Your Library` | Saved-content area | "My Music", "Collection" |
| `taste profile` | The personalisation model, addressable by the user | "recommendation profile", "algorithm" |
| `Platform Rules` | Content policy | "Community Guidelines", "Terms" |
| `Ongoing issues` | Known-defect list | "Known issues", "Service status" |
| `Prompted Playlists` / `Mixed Playlists` / `Spotify Mixes` | Three separate named playlist classes | one umbrella term |

**`taste profile` is the most interesting coinage.** There is a help article titled `Exclude a playlist or track from your taste profile` — Spotify names its own personalisation model as a user-editable object and gives the user a verb (`exclude`) against it. Most recommender products have no public noun for the model at all. For any product where personalisation is the value prop, having a **user-facing name for the model** is the prerequisite to giving the user control over it.

**Register split:** marketing says `ad-free music listening`; help says `our free, ad-supported plan`. The positive framing lives on the paid page, the neutral-technical framing lives in support.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company, used freely in support (`our free, ad-supported service`, `We'll use your card`, `We always prioritize`, `We won't save your card details`). The company is a named actor in the consent and reporting flows — including in the sentences about its own data handling, which is where passive voice usually appears.

**Register gradient.** Colloquial in the feature sections (`Just nonstop beats`, `your crew`, `Be here when history hits play`, `Join the party with Premium`, `Ready? Let's play.`); completely flat in the plan disclosures, the consent flow, and the deletion warnings. `This action can't be undone.` sits three screens from `Join the party with Premium.` Same site, correctly different voices.

**Exclamation marks:** none observed on any surface, including the marketing hero. No `Oops!`, no `Great news!`. `Ready? Let's play.` is the high-water mark of enthusiasm and it uses a full stop.

**Numbers as trust devices** `[observed]`: `over 2,000 devices` · `1.4k additional classes, powered by Peloton` · `over 700,000 titles` · `24-bit/44.1 kHz` · `15 hours/month` · `250MB of available memory` · `up to 10 accounts` · `14 days`. Specific rather than rounded. `1.4k` is the outlier — SI-shorthand in body copy, inconsistent with `over 700,000` two bullets away.

**Accessibility content** `[observed]` — substantial and structurally unusual. `Accessibility Center` is an IA with four sections:

1. `Accessibility statement` — short, values-led, two short paragraphs. Notable phrasing: "we celebrate human creativity and strive for our platform to be usable by all people, including a million artists and billions of listeners", and "employing people with lived experiences in accessibility".
2. `Accessibility Plan` — seven named sub-pages: `Introduction` · `Statement of commitment` · `Consultation` · `Spotify's Plan` · `Feedback process` · `Progress reporting` · `Responsibilities and accountability`
3. `Annual reports` — `2026 report`
4. `Accessibility feedback`

The seven-part plan structure is a **compliance artefact shaped by the Accessible Canada Act** (statement of commitment / consultation / feedback process / progress reporting / accountability are the ACA's prescribed headings), published on an en-US path without saying so. So: a regulator-mandated document structure serving as the global public accessibility IA. That is the same "dual-format disclosure" tension seen at Wise, resolved the opposite way — here the compliant artefact *is* the primary artefact, and there is no user-optimised alternative view.

**Gap** `[observed]`: the statement contains **no WCAG conformance claim, no target level, no known-limitations section, and no contact address in the statement itself**. `Accessibility feedback` is a separate nav item with no visible mechanism in server HTML. A four-section accessibility centre that does not state a conformance target is a real omission for a product of this scale.

**Other accessibility practice** `[observed]`:
- `Skip to content` present, first in DOM, on marketing pages
- Alt text on editorial photography is scene-level and descriptive: "Addison Rae performing on stage with lights casting from both directions" · "Miley Cyrus on stage with her band behind her" · "Clipse stands posed at a slightly canted angle" · "Marshmello is on stage at a DJ set wearing his signature mask". These are genuinely good — they describe composition and staging, not just the subject.
- Several decorative/product images carry **empty alt** — but so do the four largest hero-adjacent images on `/premium/` (`![]` on the Renaissance illustration, rendered twice), which is defensible for decoration.
- Inline icon images in help steps carry alt text equal to the setting name (`Settings`, `3 horizontal dots`) — `3 horizontal dots` describes the glyph rather than the function, which is the classic icon-alt miss.
- The rotating-noun hero renders as one dash-joined string in server HTML (see T2) — suspected, not confirmed, as a screen-reader issue.

**Negative findings, recorded honestly**

- `Safety and Privacy Centre` (en-GB) vs `Safety & Privacy Center` (en-US) on the same en-US page
- `Download` (marketing nav) vs `Install App` (support nav) for the same action
- `Go to Community` vs `Search or ask in Community` for the same destination
- Footer `Communities` block loses two links on support article pages
- `Tap CREATE.` (all caps) vs sentence/title case for UI labels elsewhere
- No first-party status page; outage comms routed to X and an English-only forum
- `Spotify Kids` and `managed accounts` coexist as two parental-control vocabularies in the same help category with no article explaining which supersedes which
- `Basic plans` and `Premium for Starbucks Partners` exist in help with no marketing surface
- `/us/` root redirects to the web player, so there is no top-level marketing page
- Accessibility centre states no WCAG conformance level
- The primary offer disclosure carries a hard expiry two days after harvest

---

## Transferable patterns

1. **Encode commercial state in the CTA verb.** `Try` where a $0 period exists, `Get` where the user pays on day one. One-word signal, no extra copy, and it stops the plan table from over-promising. Transfers to any mixed trial/no-trial plan grid.
2. **Five-clause offer disclosure in fixed order: scope → price cliff → eligibility exclusion → terms → expiry.** Put the price cliff in the *same sentence* as the free period, never in a footnote. Directly applicable to promotional BNPL and subscription-trial copy.
3. **Name the inconvenience before the reassurance, in one sentence.** "You'll need to log in for them, but they won't be able to access your Spotify." Most products split these, which reads as spin. Condition: only works when the inconvenience is small and unavoidable.
4. **Pre-emptively negate the wrong interpretation of a payment hold.** "We'll place a temporary authorization hold on your card. This isn't a purchase or fee… Your bank will automatically release the authorization." Mechanism → negation → who resolves it → duration → retention. The single most reusable block in this file for payments work.
5. **Give the personalisation model a user-facing noun.** `taste profile`, plus a verb (`exclude`) the user can apply to it. You cannot offer control over an unnamed system.
6. **Name the age-out transition positively.** `Graduating to a self-managed account` beats "converting" or "upgrading" for any account-type change tied to a birthday.
7. **Split billing grievances into separately-titled articles rather than one "billing problems" page.** `Charged twice` / `Charged too much` / `Charged for a free trial` / `Canceled but still charged` / `Charged but don't use Spotify Premium`. Findability and tone both improve; each title names the user's actual complaint.
8. **Route symptoms with question sub-headings inside a troubleshooting article.** `Tracks grayed out?` `Is it your device?` `Is this a known issue?` — the reader scans for their symptom rather than reading a cause taxonomy. Condition: requires the sub-headings to be genuinely mutually exclusive.
9. **Counter-example to avoid: do not delegate outage communication to a social account and a peer forum.** Spotify's `Is this a known issue?` step routes to X and an English-only community board. For a multi-locale product this is the failure mode, not the pattern.

## Caveats & gaps

- **No status page exists**, so T9 incident copy could not be harvested; the absence is the finding.
- **No error-code taxonomy exists.** Only two in-product error strings (`'Page not available'`, `'Something went wrong'`) are quoted publicly. Anything more granular is behind auth.
- **Empty states not reachable** — all are post-auth. T8 is `[absent]`.
- **Help-article bodies sampled, not exhausted.** ~350 article titles were captured from the persistent mega-nav; two bodies were read in full (`Spotify not playing`, `Managed accounts for young listeners`). Titles are high-signal for IA and task phrasing but say nothing about answer structure.
- **Accessibility Plan sub-pages not opened** — the seven-page plan IA was captured from nav labels only; the plan content itself (including any conformance claim) is unread. A follow-up pass should open `plan-commitment` and `2026-report`.
- **Duo, Family, Student and Audiobooks landing pages unharvested** — plan detail may contain disclosures not present on `/premium/`.
- **Locale is en-US only.** Price points, the Hulu bundle, CCPA links and the `-tre`/`-ter` spelling inconsistency are all US-render artefacts.
- **Mobile app and in-app strings out of scope** — the in-product parental-control labels, PIN prompt copy, and the "hand the device to your parent" message are `[documented]` from the help article, never observed.
- **Offer copy is date-fragile**: `Offer ends September 23, 2026` will have rotated within days of harvest.

## Sources

1. https://www.spotify.com/us/ (redirects to https://open.spotify.com)
2. https://www.spotify.com/us/premium/
3. https://www.spotify.com/us/free/
4. https://support.spotify.com/us/
5. https://support.spotify.com/us/article/spotify-not-playing/
6. https://support.spotify.com/us/article/managed-accounts/
7. https://www.spotify.com/us/accessibility/
