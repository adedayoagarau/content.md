# 158. Shazam

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Music recognition utility (single-interaction, audio-fingerprinting; Apple-owned) |
| Primary URL | https://www.shazam.com/ |
| Corpus rank | 158 |
| Benchmark strength (source list) | Instant recognition feedback |
| Locale / market observed | en-US (21-language selector present) |
| Platform observed | Web (shazam.com marketing and charts; shazam.com/privacy), Apple Support user guide (support.apple.com/guide/shazam) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR-shaped lawful-basis section in the privacy summary (contract, consent, legitimate interests, legal obligation); CCPA data-access, download and deletion request routes at `/privacy/login/*`; Apple Inc. as controller under the Apple Privacy Policy; DMCA/DSA infringement route for artists |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Partial — marketing, privacy, help IA and the recognition-flow documentation are captured in full. **The no-match state, which the brief identified as the priority target, is genuinely absent from every public surface**; that absence is the headline finding of this file rather than a harvest failure. All in-app strings are `[documented]` from the Apple user guide. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.shazam.com/ | Editorial insight rails, charts, app-download block, language selector, footer |
| Get the app | https://www.shazam.com/apps | Surface inventory (Control Center, Pop Up, notification, wearables, browser extension) |
| Shazam & Privacy (hub) | https://www.shazam.com/privacy | Three-question framing + three data-management CTAs |
| Shazam & Privacy (summary) | https://www.shazam.com/privacy/summary | **The full privacy disclosure** — account/no-account split, Shazam ID, lawful bases, label/artist sharing |
| Shazam User Guide — Welcome | https://support.apple.com/guide/shazam/welcome/web | Guide entry; 30-item table of contents |
| Shazam app at a glance | https://support.apple.com/guide/shazam/shazam-app-at-a-glance-dev9b5e0fa36/web | **Sixteen bold-lead-in capability lines** — the value-prop artefact |
| Before you use the Shazam app | https://support.apple.com/guide/shazam/before-you-use-the-shazam-app-dev9a6693847/web | Six-item prerequisite list; OS version scoping |
| Where are my identified songs saved? | https://support.apple.com/guide/shazam/where-are-my-identified-songs-saved-dev64d8cd51e/web | Library and playlist-sync destinations |
| Identify a song using the Shazam app on iPhone, iPad, or Android | https://support.apple.com/guide/shazam/shazam-app-iphone-ipad-android-device-dev9748744b6/web | **The core-interaction article** — seven entry points, Auto Shazam, `Wrong Song?` |
| Use Shazam when you're offline | https://support.apple.com/guide/shazam/use-shazam-when-youre-offline-devad6c028a7/web | The deferred-recognition model |
| Shazam app concert FAQ | https://support.apple.com/guide/shazam/shazam-app-concert-faq-dev46b2c07b8/web | Eight verbatim FAQ questions incl. two permission questions |
| Add your own music to the Shazam catalog | https://support.apple.com/guide/shazam/add-your-own-music-to-shazam-dev9313a6a31/web | Artist-side content; `Editorial Hides` and the implied catalog-gap causes |

---

## T1 Navigation & IA labels

**Global nav — five items, and none of them is the product's core function** `[observed]`

`Get the app` · `Concerts` · `Charts` · `Radio Spins` · `Fast Forward '26`
plus `Connect`, a `Download Shazam` button, and a single `Help` link.

This is the file's most structurally revealing observation. Shazam's defining interaction — identify the music playing right now — **cannot be navigated to on shazam.com at all**. The website is not the product; it is a chart publication plus an app-acquisition funnel. Every nav item is either an editorial destination (`Concerts`, `Charts`, `Radio Spins`, `Fast Forward '26`) or a route off the site (`Get the app`, `Download Shazam`, `Help`).

`Radio Spins` is a trade term (radio airplay counts) exposed in consumer navigation. `Fast Forward '26` is a year-stamped editorial franchise — nav furniture with a shelf life. `Connect` is an unlabelled social/link cluster.

**Footer — three groups, and the help estate is split by OS** `[observed]`

| Group | Items |
|---|---|
| `Company` | `About Us` · `Apps` · `Careers` · `Help for Apple Devices` · `Help for Android Devices` · `ShazamKit for Developers` |
| `Legal` | `Terms` · `Privacy Policy` · `Manage Your Data` |
| (unlabelled store row) | `Google Play Store` · `Apple App Store` · `Chrome Web Store` · `Galaxy Store` |
| `Follow Us` | Facebook · X · Instagram · Snapchat, all rendered as raw URLs |

`Help for Apple Devices` / `Help for Android Devices` as two separate footer entries is a platform-first help IA — the user must self-identify their OS before reaching any content. Both in fact resolve into Apple Support (the Android link goes to an Apple KB article), so the split promises more divergence than it delivers.

`Manage Your Data` as a footer link alongside `Privacy Policy` is good: it separates *read the policy* from *act on your data*, and the action link is the Shazam-specific one while the policy link goes to apple.com.

**Defect:** the `Follow Us` list renders four bare URLs (`https://www.facebook.com/Shazam`) as link text on every page — unreadable in a screen reader and visually raw. Present on all three shazam.com pages fetched. The footer also carries a stray glyph string (`instagramSharePathic_arrow_outGoogle􀆄 copy􀐅􀋲`) — unrendered icon-font placeholders leaking into the DOM as text, including private-use Unicode codepoints.

**Help centre IA — a linear, single-product Apple user guide** `[observed]`

Nine groups over 30 pages:

| Group | Items |
|---|---|
| (root) | `Welcome` |
| `Set up and get started` | `Shazam app at a glance` · `Before you use the Shazam app` · `Where are my identified songs saved?` · `Sync your identified songs to the Shazam app` |
| `Identify music` | `Discover music` · `Use the Shazam app on iPhone, iPad, or an Android device` · `Use the Shazam app with headphones or earphones` · `Use Shazam Music Recognition on Apple Watch` · `Identify a song on HomePod` · `Identify a song on Mac` · `Identify a song on Apple Vision Pro` · `Identify a song on the web` · `Identify a song with shortcuts` · `Use Shazam when you're offline` |
| `Play your identified songs, view lyrics and videos, and more` | `Listen to songs, view lyrics, and watch videos` · `Check out trending songs and recommended artists` · `Add songs` · `View artist information` · `Purchase your identified songs` |
| (root) | `Listen to your songs in Apple Music` |
| `Listen to your identified songs in other apps` | two Spotify-and-other-apps pages, split iOS/Android |
| `Discover and save concerts` | `Discover concerts` · `Shazam app concert FAQ` |
| (root) | `Share your songs` |
| `Modify Shazam app settings` | split iOS/Android |
| (root) | `Add your own music to Shazam` · `Copyright and trademarks` |

Two analytical points. First, the `Identify music` group has **ten articles, eight of which are the same task on a different device** — the IA is organised by *surface*, not by outcome, which is correct for a utility whose one action is available in nine places. Second, and critically: **there is no `Troubleshooting` group.** Thirty pages, one of which is a concert FAQ, and none of which is about the recognition failing. See T7 and T8.

`Where are my identified songs saved?` is the only question-form title in the contents list; the browser title is longer than the nav label (`Where are my songs identified using the Shazam app saved?` vs `Where are my identified songs saved?`) — a deliberate short-nav/long-title split.

**Breadcrumb** `[observed]`: `Support > Shazam User Guide > <page title>` — three levels, with the leaf unlinked. Every page also carries `Previous <title>` / `Next <title>` links, so the guide is explicitly linear as well as navigable.

## T2 Value proposition & headline patterns

**The value proposition is a time claim, twice, in two lengths** `[observed]`

> `Name songs in seconds` — homepage app-download block
> `Identify songs in an instant` — user guide welcome
> `Identify songs in seconds from your web browser` — browser-extension block
> `Identify, listen and discover songs with the Shazam app` — apps page hero

`in seconds` / `in an instant` is the whole pitch. Note the verb varies across four near-identical lines — `Name`, `Identify`, `Identify`, `Identify` — and `Name songs in seconds` is the best of them: four words, a verb the user would actually use ("what's this song called?"), and the promise measured in the unit that matters.

**Meta description as the canonical three-sentence pitch** `[observed]`
> "Identify the music playing around you. Explore the music you love. Discover songs, lyrics, and artists on Shazam."

Three imperative sentences, escalating scope: *identify* (the utility) → *explore* (the habit) → *discover* (the platform). The same escalation runs through the whole content set — Shazam consistently positions itself as a *discovery* product that happens to start with an identification.

**The homepage headline is not about the product at all** `[observed]`
> Eyebrow: `Updated Weekly`
> Headline: `What people are finding with Shazam right now`

A **collective, present-tense, third-person headline**. Not "find your song" — "what *people* are finding". The homepage's job is to be a cultural dashboard, and the headline says so. `right now` plus `Updated Weekly` is a mild internal contradiction (weekly is not "right now").

**Editorial category names with sub-line glosses — the strongest naming set here** `[observed]`

| Category | Gloss |
|---|---|
| `New and Rising` | "Fresh music, growing fast" |
| `Rediscovered` | "Older songs reaching new fans" |
| `Artist on the Move` | "Rising Fast on Shazam" |
| `As Heard on Screen` | "TV, Film, and Cultural Moments" |
| `Radio Reaction` | "Shazam discovery, driven by radio" |
| `Going Viral` | "The songs taking over your feed" |

Six two-to-four-word labels, each with a four-to-six-word gloss. `Rediscovered` is the standout: it names a phenomenon only a recognition product can observe — an old song being Shazamed by people who have just heard it for the first time — and the gloss ("Older songs reaching new fans") explains the mechanism in five words. `As Heard on Screen` turns the most common real-world trigger (a song in a TV show) into a chart category. `Radio Reaction` names the causal chain: radio play → Shazam query.

Casing defect: `Artist on the Move`'s gloss is title-cased (`Rising Fast on Shazam`) where the other five are sentence case.

**Chart-block copy follows a consistent three-part shape** `[observed]`
> Title: `Global Top 200 Chart`
> Standfirst: "Top songs being discovered around the world right now"
> Detail: "Featuring songs from GENER8ION & Yung Lean, Bronski Beat, Tame Impala and more"
> CTA: `View Chart`

The "Featuring songs from X, Y, Z and more" line is **dynamically populated from the chart's current top three**, so the teaser is always concretely specific rather than generic. Repeated across nine city charts. `Discovery United States` / "Rising tracks from new and upcoming artists" / "Be the first to listen to these future hit songs" — the second-person promise of earliness is the Discovery chart's whole pitch.

**The user guide's welcome paragraph is one 40-word sentence listing everything** `[observed]`
> "Use the Shazam app to quickly find out what's playing anywhere—on TV or radio, in a restaurant or gym, or in another app—and to play, save, and share songs, view lyrics, watch videos, make playlists, discover concerts, and more."

Structure: the core action → **four concrete situations** (TV, radio, restaurant, gym, another app) → a nine-verb capability run. The situational list is the useful part: naming "in a restaurant or gym" is how the copy tells the user *when* to reach for the product, which for a utility with one button is the actual onboarding problem.

**`Shazam app at a glance` — the sixteen-line capability inventory** `[observed]`

Every line is **a bold imperative or promise, then a linked instruction**. The bold lead-ins are the artefact:

`Identify almost any song within earshot.` · `Sync your songs to an Apple Music playlist.` ·
`Sync your songs to a Spotify playlist.` · `Listen to your songs in Apple Music or Apple Music Classical.` ·
`Listen to your songs in other music apps.` · `Never miss a gig.` · `Never miss a song.` ·
`Sing along.` · `Watch videos.` · `Spread the love.` · `Own it.` · `Discover new tunes.` ·
`Identify music in a browser tab.` · `Share your own songs.` · `Customize your Shazam experience.` ·
`Get a better view.`

Four of these are genuinely good short-form UX copy. `Never miss a gig.` / `Never miss a song.` is a **deliberate parallel pair** — the same construction applied to concerts and to offline capture, which makes the offline feature read as a promise rather than a limitation. `Own it.` for purchasing is two words and carries the full argument, then the body adds "to further support the artists you love" — the only artist-support framing on the consumer side. `Get a better view.` is the accessibility line, written in the same register as the feature lines rather than sectioned off. `Spread the love.` for sharing is the weakest — vague and un-actionable.

The article also carries two un-hedged voice moments: "There's much more to the Shazam app than you think" (a mild challenge to the reader) and "a single tap opens a whole world of music discovery (**and a little bit of magic**)". `a little bit of magic` in a parenthetical is the only overtly whimsical phrase in the entire harvested set, and it is immediately grounded at the foot of the same page by the mechanism sentence: "Shazam works by quickly matching a digital fingerprint of the music you're hearing to one of millions of songs in the Shazam catalog." **Magic claimed, then explained on the same page** — the pattern is: delight in the intro, mechanism in the outro.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Download Shazam` | Sticky nav button | |
| `Get the app` | Nav item **and** QR-block CTA | Same words as a nav label and a button |
| `Download the free App` | Apps page QR block | `App` capitalised mid-phrase |
| `Get the app` / "Scan the code with your smart phone camera to download the free app" | QR blocks, both pages | `free` repeated; `smart phone` as two words |
| `Discover More` | Homepage viral rail | With the sub-line "See the songs and artists trending this week, all around the world" |
| `View Chart` / `View` / `See All` | Chart blocks | **Three labels for one action** across adjacent rails |
| `Learn more` | Apps page, three times | Bare, on Control Center / Pop Up / Notification blocks — all three resolve to the same two Apple KB articles |
| `Help` | Nav, single item | |
| `Link Copied` | Homepage insight cards | A **state**, rendered as a persistent label rather than a transient toast — see T9 |
| `DOWNLOAD YOUR DATA CATEGORIES` | Privacy hub | All-caps |
| `DOWNLOAD YOUR DATA` | Privacy hub | All-caps |
| `DELETE YOUR ACCOUNT` | Privacy hub | All-caps; the destructive action is visually identical in weight to the two benign ones |
| `Manage Your Data` | Footer | Title case — same destination, different casing from the buttons on it |
| `Table of Contents` | User guide, every page | |
| `Search this guide` / `Clear Search` | User guide | |
| `Previous <title>` / `Next <title>` | User guide, every page | Destination named, not bare "Next" |
| `Helpful?` → `Yes` / `No` | User guide, every page | With a 250-character comment box |
| `Submit` | Feedback box | |
| `Choose your country or region` | Locale selector title attribute | |
| **In-app, `[documented]`** | | |
| `Start Shazam` (iOS) / `Shazam Now` (Android) | Long-press app-icon quick action | **Two labels for one action, split by OS** |
| Shazam button (the pulsing centre control) | App home screen | Unlabelled — icon only |
| `Auto Shazam` | Long-press toggle | |
| `Single result mode` / `Continuous mode` | Android Auto Shazam picker | |
| `Confirm` | Android Auto Shazam picker | |
| `Turn Off` / `Change` | Android "Auto Shazam is on" notification | |
| `Tap to Shazam` | Android persistent notification | Verb-as-brand; see T13 |
| `Shazam from Pop-up` | Android floating button | Awkward compound |
| `History` | Control Center long-press | |
| `Library` | App tab | |
| `Songs` | Android library tab | |
| `See lyrics` | Android notification expansion | |
| `Share` | Notification and track screen | |
| `Wrong Song?` → `Report` | Library row overflow menu | **The only failure-reporting affordance in the product** |
| `Reset Installation ID` | Settings > About | The privacy control, named technically |
| `Notification bar` / `Pop-up Shazam` / `Appear on top` | Android settings toggles | |
| `Saved` | Concert Guide button | Doubles as the notification opt-out |
| `Tickets` | Concert listing | |

**Observations.** The single most important control in the product — the Shazam button — **has no text label**; it is a pulsing icon, documented only as "the Shazam button". For a one-interaction product that is a defensible choice (the icon *is* the brand), but it means the app's primary CTA cannot be quoted, and it is why `Tap to Shazam` exists as a notification label: the verb has to be supplied somewhere.

`Start Shazam` (iOS) versus `Shazam Now` (Android) for the identical long-press action is a clean example of platform-forked microcopy with no functional reason. And the three bare `Learn more` links on the apps page all point at two general KB articles, so the specificity the surrounding cards establish is thrown away at the click.

The privacy hub's three all-caps buttons are worth flagging: `DELETE YOUR ACCOUNT` is given the same visual and lexical weight as `DOWNLOAD YOUR DATA`, with no confirmation language, no consequence statement, and no "this cannot be undone" on the hub page.

## T4 Onboarding & getting-started

**There is no onboarding sequence on the marketing site.** `[observed]` The homepage's acquisition block is a QR code plus two store links; the apps page adds a surface inventory. No "how it works", no step list, no numbered sequence. For a product whose interaction is one tap, this is arguably correct — but it means the *only* onboarding content is the prerequisite list in the user guide.

**`Before you use the Shazam app` — a six-item prerequisite list, and it is longer than the product** `[observed]`

Scoping sentence first: "This guide is for the Shazam app on iOS 26, iPadOS 26, macOS Tahoe, watchOS 26, visionOS 26, or later. This guide is also for the Shazam app on Android." **Five named OS versions before any instruction** — the documentation declares its own applicability boundary, which is the same discipline Firefox (156) applies to its privacy notice.

Then: "To ensure the best possible Shazam experience, do the following:"
1. Update your devices to the latest operating systems
2. Get the Shazam app for all your devices, or update it
3. *On Apple devices:* sign in to the same Apple Account on all devices, and configure iCloud and Shazam settings so Control Center / Siri / Shortcuts results sync
4. *On Android devices:* sign in with email or Google Account, and get the Apple Music app for Android
5. Join Apple Music "to listen to songs in full (on Apple devices) or song previews (on Android devices)"
6. Get Apple Music Classical if you're a classical fan

Analysis. This is the **entitlement disclosure of a free product**, and it is honest but uncomfortable. Item 5 tells the user that without an Apple Music subscription they get previews rather than full songs, and that Android users get previews *even as subscribers* in the Shazam app itself — a platform asymmetry stated plainly, in parentheses, rather than buried. Item 3 discloses that the product's most convenient entry points (Control Center, Siri, Shortcuts) **will silently fail to save results** unless iCloud sync is configured, which is the single highest-consequence prerequisite and is given no more emphasis than "update your devices".

The closing line — "Now that you're up to date, it's time to start discovering music!" — is the only exclamation mark in the guide.

**Just-in-time permission onboarding, mentioned once in one clause** `[documented]`
> "If this is your first time using Shazam, follow any onscreen instructions for microphone and location access."

This is the entire documented first-run permission experience: a conditional dependent clause inside step 2 of one identification method, telling the user to "follow any onscreen instructions". The actual permission-prompt copy — the microphone consent the product cannot function without — is **not documented anywhere in the guide**. `[absent]`

**Feature discovery is written as a use-case question** `[documented]`, in the Auto Shazam section:
> "Want to identify and save all the songs in an episode of a TV show? Or the songs playing around you at your favorite restaurant? Turn on Auto Shazam to have Shazam automatically identify music—even when you switch to another app or when your device is locked."

Two concrete scenario questions before the feature name. This is the guide's best onboarding pattern: **the user is given a situation to recognise before being given a control to find.** The "even when…" clause then states the two non-obvious capabilities (backgrounded, locked) that justify the feature.

## T5 Form & field labels

Pre-auth forms are absent from shazam.com; the product has no web form beyond search. This section is thin.

**User-guide feedback widget** `[observed]`
> `Helpful?` → `Yes` / `No`
> `Character limit: 250`
> `Please don't include any personal information in your comment.`
> `Maximum character limit is 250.`
> `Submit` → `Thanks for your feedback.`

Two notable strings. `Please don't include any personal information in your comment.` is a **pre-emptive data-minimisation instruction placed in a free-text field** — the product asks the user not to give it data it does not want, which is unusual and is consistent with Shazam/Apple's wider privacy posture. And the character limit is stated **twice in two different grammars** (`Character limit: 250` as a label, `Maximum character limit is 250.` as a sentence) — a redundancy that suggests one is a hint and one an error message, both rendered unconditionally.

**Search** `[observed]`: `Search this guide` (placeholder) with `Clear Search` as the reset. The guide's search is scoped in the label itself, distinguishing it from Apple's global support search in the same header.

**Settings labels** `[documented]`
`Notification bar` · `Pop-up Shazam` · `Appear on top` (an Android OS permission name reproduced in Shazam's instructions) · `Auto Shazam` · `Single result mode` · `Continuous mode` · `Reset Installation ID` · iCloud toggle for Shazam under `Settings > [your name] > iCloud`.

`Single result mode` / `Continuous mode` is a good pair: it names the *behaviour* (one match then stop, versus keep listening) rather than a duration or a toggle state. `Reset Installation ID` is the opposite — a technically accurate label for a privacy control that most users will not recognise as "forget everything you know about me" (see T10 and T13).

**Location-selector label** `[observed]`: `Choose your country or region` as the title attribute on the locale link, with `United States` as the visible label.

## T6 Status & state language

**The product has, in effect, four states, and only two of them are named.**

| State | Named? | Vocabulary |
|---|---|---|
| Listening (in progress) | No | The pulsing button; no documented string |
| Matched | Yes | `track screen`, "showing the identified song" |
| Queued (offline) | Partly | "the app remembers the request" |
| No match | **No** | `[absent]` — see T8 |

**`identified` is the canonical state adjective, used with near-total consistency** `[documented]`
`identified song` · `identified songs` · `incorrectly identified song` · `Where are my identified songs saved?` · `your recently identified songs` · `after the song is identified` · `Once a song is identified`.

The choice of `identified` over "found", "recognised", "detected" or "matched" is the vocabulary decision the whole product rests on. It is used as a **past participle attached to the song**, not to the user or the system — `identified songs`, not "your finds" or "your matches". This makes the library a collection of *songs that have been identified* rather than a log of *searches you performed*, which is why the library reads as a music collection rather than a history. Note that `matches` does appear once, on the artist side: "key metrics such as number of **Shazam matches**" — the trade-facing register uses the technical term.

**Named UI surfaces are treated as states of the flow** `[documented]`
`home screen` → `track screen` → `artist page` → `Library` → `History`.

`track screen` is the name of the success state, and it is defined by what it contains: "showing the identified song, which is also saved to the Shazam app", then "The artist's top songs or upcoming concerts are displayed below the song and artist in the track screen." The success state is immediately loaded with next actions — the result is never terminal.

**`Auto Shazam is on` — an ambient running-state notification** `[documented]`
An Android notification reading `Auto Shazam is on`, expandable to `Turn Off` and `Change`. A background-listening state that announces itself persistently and carries its own off switch. For a feature that holds the microphone open indefinitely, a persistent state notification with an inline kill switch is the right disclosure design, and the copy is three words.

**The deferred / offline state is the most interesting state language in the file** `[documented]`
> "When you're back online, the app **remembers the request**, identifies the song (if it's available in the Shazam music catalog), then adds it to your Shazam app library."

Three things. `remembers the request` personifies the app as holding an intention on the user's behalf — far better than "queues the query" or "retries". The parenthetical `(if it's available in the Shazam music catalog)` is **the only conditional-failure clause in the entire user guide**, and it is in a parenthesis. And the resolution is delivered by notification rather than by the user returning to check, with the notification prerequisite stated: "To receive a notification about an identified song after you're back online, do either of the following: Make sure Shazam app notifications are turned on."

**A third-order state disclosure** `[documented]`: "*Note:* To add songs identified using Control Center to your Shazam library, make sure iCloud Sync is turned on in Shazam app settings." So a song can be identified, notified, and **still not exist in the library** — a state (identified-but-unsaved) that the product does not name but does document. This is the clearest gap between the system's state model and the user's.

**Account-state vocabulary** `[observed]`, from the privacy summary: `with an account` / `without an account`, `signed in` / `signed out`, `Shazam ID`, `Installation ID`, `linked` (for Apple Music / Spotify). The account-state copy is unusually precise about consequences — see T10.

## T7 Error, failure & recovery

**The guide contains no troubleshooting section, and the recognition failure is never addressed.** `[absent]` — recorded as the file's central negative finding.

Thirty user-guide pages. One `concert FAQ`. Zero pages about the identification not working, the microphone being blocked, the audio being too noisy, the song being absent from the catalog, or the request timing out. There is no `Troubleshooting` group, no `<noun> issues` article family (compare Audible, 157), and no "if this doesn't work" section inside the core identification article.

**The one failure affordance that exists is for the *wrong* answer, not the *absent* answer** `[documented]`

> Section heading: `Report an incorrectly identified song`
> Body: "If you think Shazam has incorrectly identified a song, you can easily report it in the app."
> Path: Library → More → `Wrong Song?` → `Report`

`Wrong Song?` is excellent microcopy: two words, a question mark that makes it a hypothesis rather than an accusation, and it sits on the row of the specific song rather than in a settings menu. It is also the only place in the product where the user is invited to say the system was wrong. The framing "If you **think** Shazam has incorrectly identified a song" hedges appropriately — the user may be mistaken — without implying they are.

But note precisely what it covers: a **false positive**. Shazam returned a song and it was the wrong one. It does not cover the far more common failure — no result at all — because there is no row in the library to attach a report to. **The product's most frequent failure mode is unreportable by construction**, and the content set does not acknowledge it.

**Failure causes are documented, but only on the artist-facing page** `[observed]` — and this is the closest the public content gets to explaining a no-match.

`Add your own music to the Shazam catalog` states that "Shazam, Apple Music, and iTunes may **hide content for editorial reasons**, including misleading content or copyright infringement", and then enumerates the problem-content classes:

- `DJ mixes as a single audio file`
- `Megamixes`
- `Audio snippets of viral tracks`
- `Mash-up tracks`
- `Viral track edits from user-generated content platforms such as TikTok, Soundcloud, Instagram, or YouTube`

The named policy is `Editorial Hides`, linked to the Apple Music Style Guide. This list is, read from the consumer side, **a catalogue of the exact things a user will fail to Shazam** — a DJ mix at a club, a sped-up edit on TikTok, a mash-up on a reel. The explanation for the unhappy path exists, in public, on a page addressed to artists, and is never surfaced to the user who experiences it. That mismatch is the most useful finding in this file.

The artist page also carries the only escalation route for a content dispute: `Claims of Infringement (DMCA/DSA)` on the Apple Legal site.

**Third-party failure is disclaimed cleanly** `[observed]`, in the concert FAQ:
> "The Shazam app links to ticket providers and **is not involved in physical or digital ticket transactions.**"

Then a two-branch route: Bandsintown purchases go to Bandsintown's own troubleshooting and getting-started pages (both linked by name); anything else goes to "that vendor directly". A boundary statement, then a named route per branch. Correct structure for a referral product.

**Degradation is documented rather than errored** `[observed]`, also in the concert FAQ:
> "Without location permission, Shazam provides only upcoming concerts in your country or general upcoming concerts for the specified artist."

A denied permission produces a **named reduced service**, not a failure. "only… in your country or general… for the specified artist" tells the user exactly what they lose and exactly what they keep. This is the best permission-consequence sentence in the file and is the pattern the missing no-match copy should have followed.

**Availability caveats used as terminal disclaimers** `[observed]`
`Siri isn't available in all regions and languages.` (twice on one page — once inline, once as a standalone closing line) · `Not all features are available in all countries or regions.` (closing line of the concert FAQ) · `(Lyrics are not available for all songs.)` · "The availability of the App Store, subscriptions, and services vary by country or region."

Shazam/Apple ships an availability caveat as the **last line of a page** as a house convention. Unhelpfully placed — a user reading about Siri identification discovers at the end that it may not exist for them — but consistently applied.

## T8 Empty states

**PRIORITY SECTION. The finding is an absence, and it is the most important observation in this file.**

The brief identified Shazam's no-match copy as "the entire unhappy path of a single-purpose product". After eleven public pages — the full 30-page Apple user guide table of contents, the core identification article, the offline article, the privacy pages and both marketing pages — **no no-match string was found, and no page documents the no-match experience.**

What is documented instead, in full:

| Path | Documented outcome |
|---|---|
| App home screen, tap Shazam button | "The track screen opens, showing the identified song" |
| Long-press app icon | `Start Shazam` / `Shazam Now` → track screen |
| Auto Shazam | "Identified songs are saved to the library" |
| Control Center | "The identified song appears in a notification at the top of the screen" |
| Siri | "The identified song appears in a notification" |
| Widget | Opens the app and identifies the song |
| Android Quick Settings | "After the song is identified…" |
| Android notification bar | "After the song is identified…" |
| Android Pop-up Shazam | "Once a song is identified, the song name and album name appear" |
| Offline | "the app remembers the request, identifies the song (**if it's available in the Shazam music catalog**), then adds it" |

Nine of ten entry points are documented as **unconditionally succeeding**. The tenth — offline — carries the only conditional in the guide, in a parenthesis, and does not say what happens if the condition fails.

**Why this matters as a content finding, not just a documentation gap.** Shazam is the purest case in this corpus of a product with one interaction and a binary outcome. The failure is not an edge case: it is the outcome for any club mix, any TikTok-sped edit, any live performance, any unreleased track, any noisy room, any hummed melody. It is, by the product's own artist-facing admission (T7), the guaranteed outcome for five named content classes. And the public content estate treats it as though it does not occur. Every piece of copy, from `Name songs in seconds` to sixteen bold capability lines to ten always-succeeds procedures, is written for the match.

The consequence is visible in the ecosystem: third-party blogs, forums and competitor content have filled the vacuum with "Shazam not working", "why Shazam can't find a song" and "what to do when Shazam can't help" explainers, and Apple Support community threads carry user-reported strings. **A product that does not write its own unhappy path cedes that page to someone else.** (Third-party accounts of the failure and of user-reported strings were seen in search results during this harvest; they are deliberately not quoted or relied on here, because they are not the product's own copy and quoting them would risk recording an invented or stale string as verbatim. The honest record is: absent.)

**Other empty and zero-data states**

| State | Status |
|---|---|
| Empty library (first run, no songs yet) | `[absent]` — not documented |
| Empty History in Control Center | `[absent]` |
| No concerts for an artist | `[documented]` — see below |
| No lyrics for a song | `[documented]` — "(Lyrics are not available for all songs.)" |
| Library wiped by reinstall without an account | `[documented]` — see below |
| Guide search no-results | `[absent]` — search not exercised |

**No-concerts is the one zero-data state Shazam does explain** `[observed]`, and it explains it as a FAQ:
> `Why don't I see concert information in the Shazam app?`
> Answer: update the app; "Concert information is only displayed **if an artist is on tour (and the app has access to the tour data)**."

Two conditions, both named, one of which is a data-supply admission. This is a good zero-data explanation — and its existence makes the absence of an equivalent `Why didn't Shazam find my song?` more conspicuous, since the same author clearly knows how to write one.

**Live streams: a flat, three-word empty answer** `[observed]`
> `Does the Shazam app currently support live streams or virtual events?`
> "Not at present."

Three words. No apology, no roadmap promise, no "we're working on it". `Not at present` concedes the gap and leaves the door open without committing. The best short negative answer in this corpus.

**A destructive empty state, disclosed in the privacy summary rather than in the app docs** `[observed]`
> "When using Shazam without an account, **if you uninstall and reinstall the app, the list of songs you previously identified will be removed.** If you want to retain that history or sync it across devices, you can choose to use Shazam with an account."

A user's entire library can be emptied by a routine reinstall, and the only place this is stated is a privacy page. Correct disclosure, wrong location: this belongs in `Where are my identified songs saved?`, which does not mention it. The sentence itself is well built — consequence first, then the remedy, with `choose to` preserving agency.

## T9 Notifications & system messages

**The notification *is* the result.** `[documented]` For three of the product's entry points — Control Center, Siri, and Android Quick Settings — the identification's output is not a screen but a notification:

> "The identified song appears in a notification at the top of the screen and is saved to the Shazam app if your iCloud and Shazam app settings are correctly configured."

Then two documented actions inside the notification: tap the body to open the track screen, or tap the Apple Music button to open the song in Apple Music. So the notification carries **the answer plus two divergent next actions** — one back into Shazam, one out to the music service. For a utility whose value is a five-second answer, making the notification the primary result surface rather than a pointer to one is the right architecture, and the copy treats it that way.

**The offline deferred notification — the best-designed message in the product** `[documented]`
The model: identify offline → the app remembers → connectivity returns → the song is identified → **a notification arrives, possibly much later, about something the user did earlier**. The guide's handling is to state the prerequisite per surface:

> "*After using the Shazam app when you're offline on iPhone, iPad, or an Android device:* Make sure Shazam app notifications are turned on."
> "*After using Music Recognition in Control Center when you're offline on iPhone:* Make sure Music Recognition notifications are turned on."

Two separate notification permissions for two entry points into the same capability, both named. The actual deferred-result notification copy is `[absent]`, which is a real gap — this is the one message in the product that must explain *why it is arriving now*.

**`Auto Shazam is on` — a persistent running-state notification with inline controls** `[documented]`
Expandable to `Turn Off` and `Change` (the latter switching between `Single result` and `Continuous` modes). Three words of body copy, two actions, no dismissal — appropriate for a background microphone session.

**`Tap to Shazam` — a persistent invitation notification** `[documented]`
An Android notification, enabled by the `Notification bar` setting, whose entire copy is the imperative `Tap to Shazam`. Three words, brand-as-verb, and it turns the notification shade into a permanent launch surface. It is also the anchor for Pop-up Shazam: "swipe down from the top of the screen, then tap the Tap to Shazam notification."

**Concert notifications, with the opt-out routed through the save control** `[observed]`
> `How do I opt out of receiving concert notifications?`
> Answer: tap the `Saved` button in the Concert Guide.

The opt-out is the un-save, not a notification setting — the product models "I want to be told about this concert" and "I saved this concert" as the same act. Coherent, and worth noting: the notification preference is expressed as an object-level state rather than a channel-level toggle.

**Push notification disclosure in the privacy summary** `[observed]`
> "If you turn on Notifications for Shazam, we may send you push notifications **related to your Shazam activity**."

One sentence, scoped by content type ("related to your Shazam activity" — i.e. not marketing), gated on the user's own opt-in. Minimal and honest.

**`Link Copied` — a state label where a toast should be** `[observed]`
On the homepage, each editorial insight card carries the literal string `Link Copied` in the served markup, rendered unconditionally — six occurrences. This is a **success-confirmation string leaking into the pre-action DOM**: the page tells the user a link has been copied before they have copied anything. The same class of defect as Audible's `No articles found` and Firefox's empty-quotes no-results string, and it appears on the highest-traffic page of the site.

**Lyrics preview as an auto-replacing notification** `[documented]`, in Pop-up Shazam:
> "After a few seconds, a lyrics preview (if available) replaces the song name."

A notification whose content mutates on a timer, with the conditional stated. Documented twice in the same article (a duplication defect), and the guide's step 1 and step 2 for Pop-up Shazam are near-identical repeated blocks — clear editorial duplication in the source.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.**

### The microphone disclaimer, placed at the top of the core interaction article

`[documented]` The single most important disclosure in the product, and it is correctly located — a note immediately below the app screenshot in the identification article, before any instruction:

> "*Note:* Shazam **doesn't record or store the audio it detects**, and Apple **has no access to audio captured on device.** See Shazam & Privacy and the Apple Customer Privacy Policy for more information."

Two negations and two actors. It denies retention ("doesn't record or store") and denies parent-company access ("Apple has no access"), naming Apple explicitly rather than hiding behind "we". Placing it at the point where the user is about to grant microphone access — rather than in a privacy page they will never open — is the right call. Compare Firefox's "not even Mozilla should know" (156): same structure, the company names itself as the excluded party.

### The account / no-account split — a genuinely unusual identity disclosure

`[observed]` The privacy summary's opening bullets establish that Shazam is usable **without an account**, and then explain the data consequence of each choice in parallel:

> "You can use Shazam with or without an account. When you use Shazam with an account, your songs are saved to the account and your Shazam data will be associated with you. If you use Shazam without an account, your Shazam data will be associated with a **Shazam ID that is not associated with you**."

Then two named sections, `Using Shazam Without an Account` and `Using Shazam with an Account`, each stating:
- what identifier the data attaches to
- where the data lives
- how to reset or delete it
- what breaks as a result

The no-account section's full trade-off: data attaches to a `Shazam ID` "not linked to any of your personal data"; the ID is resettable at `Shazam Settings > About > Reset Installation ID`; **and** "if you uninstall and reinstall the app, the list of songs you previously identified will be removed"; and if you want history or cross-device sync, use an account.

This is the strongest pattern in the file: **privacy and functionality presented as a stated exchange rather than as a default with a hidden cost.** The user is told, in the privacy document, that anonymity costs them their library on reinstall. Most products present anonymous use as strictly better for the user and never mention what it forfeits; most others don't offer it at all. Directly transferable to guest-checkout, unauthenticated-session and pseudonymous-usage disclosures.

The with-account section is equally specific: songs use iCloud and attach to the Apple Account; deletion is by deleting in-app while signed in; iCloud sync is disableable at `Settings > [your name] > iCloud`; and the consequence of disabling is stated precisely — "the songs saved to iCloud will remain in your iCloud account, but new songs that you Shazam will not be added." **Turning off sync does not delete what is already synced**, said explicitly. That is the exact ambiguity users get wrong about every sync toggle.

**Defect:** that paragraph is then **repeated almost verbatim in the next paragraph**, with one word changed ("new songs that you Shazam" → "new songs that you find"). Two near-duplicate paragraphs in a privacy document, differing only in whether the brand is used as a verb.

**Third-party sign-in disclosure names the fields** `[observed]`
> "when you sign in to Shazam using Google, we may receive from Google your Google ID, email address, profile photo, whether your email was verified, and your Shazam account creation and last sign-in time."

Five named fields plus two timestamps, for one named identity provider, in consumer copy. Naming the exact payload of a social sign-in is rare and is the honest version of "we may receive some information from that network".

### Purpose-bound collection, stated per purpose

`[observed]` The summary states each collection with its purpose attached:

| Data | Stated purpose |
|---|---|
| Songs you identify | "to display the list of your discoveries in your Library, and to provide you with recommended music" |
| App usage (pages viewed, buttons tapped) | "to improve the service and user experience for all users"; "help us identify places in the app where users are encountering problems or popular features to make more prominent" |
| Device make/model, OS version, IP address | Improvement, fraud detection, "approximate your location to offer Shazam charts of trending songs" |
| Precise location (opt-in) | "to show you where your songs were discovered, display upcoming events in your area, and improve the quality of the service" |
| Deidentified aggregate (songs + city/country) | "to support related Apple products and services" |

The location purpose leads with the **delightful** use ("show you where your songs were discovered") rather than the commercial one, which is a defensible ordering since it is the user-visible feature. The disable path is given as a literal OS path: `Settings > Privacy & Security > Location Services`, set to `Never`.

`the list of your discoveries` is the phrase used for the library in the privacy document — a warmer noun than "your history" or "your queries", and consistent with the product's discovery framing.

### The label-and-artist data-sharing disclosure

`[observed]` The disclosure most specific to this product's business model:

> "We share deidentified, aggregate information, such as the songs identified using Shazam and the city and country of each Shazam, with our partners, including **music labels and artists**. This information allows our partners to understand which tracks are encountering success in the market."

Three things to record. The recipients are named by industry role, not as "partners" or "third parties". The purpose is stated in the *recipient's* terms ("which tracks are encountering success in the market") rather than the user's — unusual honesty about whose interest is served. And **`each Shazam` is used as a countable noun** here, in a legal-register document: "the city and country of each Shazam". The brand has become the unit of measurement (see T13).

The lawful-bases list then repeats this as a legitimate interest: "Provide reporting to publishers, artists, labels, and chart compilers" — `chart compilers` being a fourth named recipient class that appears nowhere else.

### Lawful bases and the four-purpose legitimate-interest list

`[observed]` Structure: contract as the general basis ("for performance of your contract with Apple, as necessary for providing the service"), plus legal obligation, plus consent "where consent is the appropriate legal basis… in accordance with applicable local law", plus legitimate interests for four enumerated purposes:

- Display relevant content to you
- Help improve and optimize Shazam for you and others
- Provide reporting to publishers, artists, labels, and chart compilers
- Prevent fraud and other malicious activity

Then a matching four-item list of the data used. The **purpose list and data list as parallel bullet sets** is a compact, legible construction — less thorough than Firefox's per-purpose table (156) but far more readable than prose.

### Data-subject-rights routing

`[observed]` The privacy hub is built as three questions with three CTAs:

| Question | CTA |
|---|---|
| `Learn about your data categories` | `DOWNLOAD YOUR DATA CATEGORIES` |
| `How do you download your data?` | `DOWNLOAD YOUR DATA` |
| `How do you delete your data?` | `DELETE YOUR ACCOUNT` |

Framing line: "If you have a Shazam account, you can request to download your Shazam data, or request that your account and associated data are deleted." Note `If you have a Shazam account` — the rights routing is gated on the account state the same page has just explained, and the no-account user's equivalent control is `Reset Installation ID`, documented elsewhere. Coherent, but the hub does not say so.

The hub's own framing is good: "We built this page to answer the questions you may have regarding your Shazam data—and show you how to easily manage your data." Two verbs (answer, show), with the acknowledgement that the user has questions.

**Defect:** the third CTA is `DELETE YOUR ACCOUNT` — a destructive, likely irreversible action — presented in identical all-caps styling and adjacent to two non-destructive ones, with no consequence statement, no "this cannot be undone", and no indication that deleting the account also removes the library. Given that the same organisation's privacy summary explains in detail what happens when sync is disabled, the silence about what happens on deletion is a real inconsistency.

### Artist-side and copyright disclosure

`[observed]` The `Add your own music` page carries:
- The distribution gate: work with an "Apple-approved distributor" — no direct upload
- Two self-verification methods (search on the web; identify it while playing) — the artist is given a way to confirm the disclosure themselves
- The `Editorial Hides` policy with five named excluded content classes (see T7)
- The infringement route: `Claims of Infringement (DMCA/DSA)`
- The analytics offer: `Apple Music for Artists`, with metrics named — "number of Shazam matches, plays, purchases, and video views" — plus playlist and chart inclusion, and "cities and countries or regions where your songs are discovered"

The framing paragraph, `Keep it real`, is the interesting bit: "From the initial idea to the recording, mixing, and mastering process, it takes effort to get everything just right. That's why Apple strives to present your music in **its most authentic form**." Authenticity is used to justify a content-exclusion policy — the reason DJ mixes and TikTok edits are hidden is framed as respect for the original work rather than as a catalog-hygiene rule. Defensible framing; it also means the user-facing consequence (you cannot Shazam a remix) is never stated as a consequence.

**Date defect** `[observed]`: the privacy summary is stamped `2026-19-02` — an invalid date (month 19). Either DD-MM inverted or a template error, on a legal document. Recorded.

### Availability and jurisdiction caveats

`[observed]` `Not all features are available in all countries or regions.` · `Siri isn't available in all regions and languages.` · "The availability of the App Store, subscriptions, and services vary by country or region." · "At all times, information collected by Apple will be treated in accordance with Apple's Privacy Policy." Plus a 21-language selector and a `Choose your country or region` control.

## T11 Help-centre architecture

**Shazam has no help centre of its own.** `[observed]` The `Help` nav link, both footer help links, and every in-product help route resolve into **Apple Support** — either the `support.apple.com/guide/shazam` user guide or Apple KB articles (`HT210331`, `HT211913`). There is no shazam.com support subdomain, no ticket form, no chat, and no community forum branded as Shazam's.

**Consequences for the content.** The help estate inherits Apple's user-guide genre wholesale: a linear book with a table of contents, `Previous`/`Next` navigation, a `Search this guide` field, a `Helpful? Yes/No` widget with a 250-character comment box, an Apple global nav and store bag above it, and an Apple footer below. This genre is **explanatory, not diagnostic** — Apple user guides document capabilities, and troubleshooting lives in separate KB articles. That structural fact is the mechanical reason the no-match state is undocumented (T8): there is no article type in this container for "it didn't work".

**Article-title grammar — three shapes, dominated by `Identify a song on <surface>`**

| Shape | Examples |
|---|---|
| `Identify a song on/with <surface>` | `Identify a song on HomePod`, `Identify a song on Mac`, `Identify a song on Apple Vision Pro`, `Identify a song on the web`, `Identify a song with shortcuts` |
| `Use <X>` / `<Verb> <object>` | `Use the Shazam app with headphones or earphones`, `Use Shazam Music Recognition on Apple Watch`, `Use Shazam when you're offline`, `Discover music`, `Discover concerts`, `Add songs`, `Share your songs`, `Purchase your identified songs`, `View artist information`, `Sync your identified songs to the Shazam app`, `Add your own music to Shazam`, `Modify Shazam app settings on iPhone or iPad` |
| Question | `Where are my identified songs saved?` |

The `Identify a song on X` family is a **surface-slot template**, and it is the right choice: the user's question is "how do I do this here", and the title answers it before the click. Adding a new device means adding a new title, not restructuring the IA.

Note the nav-label / page-title divergence, which is systematic and deliberate:

| Nav label | Page title |
|---|---|
| `Use the Shazam app on iPhone, iPad, or an Android device` | `Identify a song using the Shazam app on iPhone, iPad, or an Android device` |
| `Use Shazam when you're offline` | `Use the Shazam app or Shazam Music Recognition when you're offline` |
| `Where are my identified songs saved?` | `Where are my songs identified using the Shazam app saved?` |
| `Add your own music to Shazam` | `Add your own music to the Shazam catalog` |
| `Listen to songs, view lyrics, and watch videos` | `Listen to songs, view lyrics, and watch music videos` |
| `Modify Shazam app settings on iPhone or iPad` | (same) |

Short label in the sidebar, fully-qualified title on the page. This is good practice — the sidebar is scanned, the title is read — and Apple applies it consistently. The `Add your own music to Shazam` → `…to the Shazam catalog` pair is the most meaningful divergence: the nav undersells what the page is about (catalog ingestion via a distributor, not an upload).

**In-article structure** `[observed]`: H1 → a one-sentence scope line → a screenshot → a prerequisite or privacy note → H2 per method → numbered steps with platform-forked branches (`*On iPhone or iPad:*` / `*On an Android device:*`) → `**Tip:**` and `*Note:*` insets → a `**See also**` block → `Previous`/`Next`.

The **platform-forked italic-lead-in step** is the workhorse pattern: one numbered list serving two OSes, with the fork marked by an italicised platform label rather than duplicated lists. It keeps a single canonical procedure while acknowledging divergence — the opposite of Audible's approach (157), which duplicates whole step blocks per platform.

`**Tip:**` and `*Note:*` are used with a consistent distinction: `Tip` for an optional faster route, `Note` for a constraint or prerequisite. That discipline holds across all eight articles read.

**Routing furniture is Apple's, not Shazam's** `[observed]`: the global support search, `Table of Contents`, `Search this guide`, `Clear Search`, `Helpful?`, the locale selector, and an Apple Store nav bar. There is **no escalation path to a human** anywhere in the Shazam help estate — no contact, no chat, no forum link. The concert FAQ escalates to *Bandsintown's* support for ticket issues, and the artist page escalates to Apple Legal for infringement, but a user whose Shazam will not recognise a song has no documented route at all.

## T12 FAQs

**One FAQ page exists, and it is about concerts — not about recognition.** `[observed]` The `Shazam app concert FAQ` is the only FAQ-typed page in the 30-page guide.

| # | Question (verbatim) |
|---|---|
| 1 | I purchased tickets while using the Shazam app. Where are they? |
| 2 | Does the Shazam app support music festivals? |
| 3 | Does the Shazam app currently support live streams or virtual events? |
| 4 | Why don't I see concert information in the Shazam app? |
| 5 | How do I opt out of receiving concert notifications? |
| 6 | Can I access concert details when identifying songs via Control Center on iPhone or iPad? |
| 7 | Why is the Shazam app asking for permission to use my location when browsing a list of concerts? |
| 8 | Does the Shazam app track or store my location? |

Answers summarised. Q1: Shazam only links to ticket providers and handles no transactions; Bandsintown purchases route to Bandsintown's own troubleshooting and getting-started pages, other vendors direct. Q2: festival appearances appear as dated, located artist concerts; ticket details live on the vendor page. Q3: "Not at present." Q4: update the app, and concert data only appears if the artist is on tour and the app has the tour data. Q5: the opt-out is the `Saved` toggle in the Concert Guide. Q6: yes — long-press the Control Center button, tap `History`, open a track screen, and any concert info appears there. Q7: location is requested to show nearby concerts; without it the user gets country-level or artist-general listings. Q8: deflected to the Shazam & Privacy summary.

**Structural analysis.** Q1 is the transaction-anxiety question and is placed first — **"Where are they?"**, first person, present tense, the panicking user's exact words, and the answer leads with a boundary statement rather than a route. Q3's three-word answer is the model negative reply. Q4 is a zero-data explanation with two named conditions. 

The pair Q7 and Q8 is the real find: **two consecutive permission questions, one about why the prompt appears and one about what happens to the data.** Q7 is phrased from inside the user's suspicion — "Why is the Shazam app asking for permission to use my location when browsing a list of concerts?" — with the *situational trigger* included in the question, so the user recognises the moment. Answering the purpose *and* the degradation ("Without location permission, Shazam provides only…") in one short answer is the best permission-content pattern in this file. Q8 then separates the consent question from the retention question, which most products conflate.

**The asymmetry is the finding.** A product whose single function is song recognition publishes an eight-question FAQ about a secondary, referral-only feature — concerts — and publishes no FAQ about recognition. There is no `Why didn't Shazam find my song?`, no `Why does Shazam say the wrong song?`, no `Why won't Shazam hear anything?`, no `Does Shazam work with humming?`. The author demonstrably knows how to write a good zero-data answer (Q4) and a good permission answer (Q7); those patterns are simply never applied to the core interaction.

**Question-shaped content elsewhere** `[observed]`: `Where are my songs identified using the Shazam app saved?` (an article title), and the privacy hub's three question headings — `What data do we collect and how do we use it?`, `Who do we share your data with?`, `How do you download your data?` / `How do you delete your data?`. Note the **person shifts within one page**: the first two are first-person-plural (the company asking itself, as in Mozilla's policy), the second two are second-person-addressed-to-the-company (`How do *you* download *your* data?` — ambiguous whether "you" is the reader or Shazam). A small but real pronoun inconsistency in four adjacent headings.

## T13 Terminology & glossary

| Term | Shazam's usage | The alternative it rejected |
|---|---|---|
| `Shazam` (verb) | "new songs that you Shazam", `Tap to Shazam`, `Start Shazam`, `Shazam Now` | "scan", "search", "listen" |
| `a Shazam` / `each Shazam` (noun) | "the city and country of **each Shazam**" — the countable unit of one identification | "a query", "a match", "a lookup" |
| `identified` | The canonical past participle: `identified song`, `identified songs`, `incorrectly identified song` | "found", "recognised", "detected", "matched" |
| `Shazam matches` | The **artist-facing** metric name for the same event | consumer-facing "matches" |
| `discoveries` | The library's contents in the privacy document: "the list of your discoveries in your Library" | "history", "searches", "results" |
| `track screen` | The named success surface | "results page", "song page" |
| `artist page` | The named artist surface | |
| `Library` | Where identified songs live | "History", "Saved", "My Shazams" |
| `History` | The Control Center long-press list — **a second, shallower list, distinct from Library** | |
| `Auto Shazam` | Continuous background identification | "always-on listening", "auto-detect" |
| `Single result mode` / `Continuous mode` | The two Auto Shazam behaviours | "once" / "repeat" |
| `Shazam Music Recognition` | The OS-level (Control Center / Mac / Watch) capability, as distinct from the app | |
| `Pop-up Shazam` / `Shazam from Pop-up` | The Android floating button — **two names in one article** | |
| `Tap to Shazam` | The Android persistent notification | |
| `Shazam ID` | The pseudonymous identifier for account-free use | "device ID", "anonymous ID" |
| `Installation ID` | **The same thing under a different name** — the reset control is `Reset Installation ID` | |
| `Wrong Song?` | The false-positive report affordance | "Report an error", "Incorrect match" |
| `My Shazam Tracks` | The auto-created playlist name in **both** Apple Music and Spotify | "Shazams", "Discovered" |
| `Shazam catalog` / `Shazam music catalog` | The corpus of identifiable recordings | "database", "index", "library" |
| `digital fingerprint` | The matching mechanism, glossed once for consumers | "acoustic signature", "hash" |
| `Editorial Hides` | The named policy excluding mixes, mash-ups and viral edits | "content restrictions", "delisting" |
| `Radio Spins` | Airplay counts, in consumer nav | "airplay", "radio plays" |
| `Rediscovered` | Chart category for old songs finding new listeners | "throwbacks", "catalog" |
| `As Heard on Screen` | Chart category for sync placements | "TV & film", "soundtracks" |
| `Concert Guide` | The concerts surface | "Events", "Live" |
| `ShazamKit` | The developer SDK | |
| `within earshot` | The scope of the product's hearing: "Identify almost any song within earshot" | "nearby", "around you" |

**`Shazam` as a verb is the most successful piece of product naming in this corpus, and the content set uses it inconsistently.** It appears as: an imperative CTA (`Tap to Shazam`, `Shazam Now`), a transitive verb in the privacy document ("new songs that you Shazam"), a countable noun in the same document ("each Shazam"), and — in the very next paragraph of that document — replaced by a generic verb ("new songs that you **find** will not be added"). Two adjacent, otherwise-identical sentences, one using the brand as a verb and one avoiding it. That is a live and visible inconsistency in trademark-usage discipline: legal teams typically resist verbing a mark (it invites genericide), and the duplicated paragraph looks exactly like the artefact of that argument being settled twice.

**`identified` versus `matched` is a register split with a purpose.** The consumer surface says `identified` throughout; the artist surface says `Shazam matches`. `identified` attributes the act to the system and the result to the song ("the identified song"), which keeps the user's library reading as a collection. `matches` is a metric — it counts events, which is what an artist wants. One product, two vocabularies, correctly scoped by audience.

**`discoveries` is the warmest noun in the set** and appears only in the privacy summary — "to display the list of your discoveries in your Library". The user guide says `identified songs`; the privacy document says `discoveries`. The softer word appears in the document explaining data collection, which is either a deliberate warming of a cold context or an authorship inconsistency.

**`Shazam ID` and `Installation ID` are the same identifier under two names**, and the naming is backwards: the concept is introduced as `Shazam ID` ("your data is stored against a Shazam ID"), but the control is labelled `Reset Installation ID`. A user who reads the privacy page and then opens Settings looking for "Shazam ID" will not find it. A one-word fix, unfixed.

**`within earshot`** — "Identify almost any song within earshot" — is a precise, human scope statement, and note the hedge: `almost any`. It is the only place in the consumer copy where the catalog's incompleteness is even gestured at.

**`Editorial Hides`** is the term that would matter most to users and is addressed only to artists. Naming the policy makes it auditable; keeping it on the artist page keeps it invisible to the people who experience it.

## T14 Voice, tone & accessibility

**Published style guidance:** `[absent]` for Shazam specifically. Apple publishes an internal-facing `Apple Music Style Guide` (linked from the artist page for the `Editorial Hides` section) and, separately, the Apple Style Guide and HIG, but no Shazam voice-and-tone documentation was found. The observable voice is Apple Support's house register plus a thin Shazam editorial layer on the marketing site.

### Observed register

**Two distinct voices on two domains.** shazam.com is editorial, collective and elliptical — noun-phrase chart labels, present-participle glosses (`Fresh music, growing fast`), third-person framing (`What people are finding with Shazam right now`). support.apple.com is procedural, second-person and complete-sentence. The two do not share vocabulary: the marketing site never says `identified`, and the guide never says `Rediscovered`.

**Person.** Second person throughout the guide for the user; first-person plural in the privacy documents ("We collect data about which songs you identify", "We work hard to collect only the data we need"). The guide almost never says "we" — Apple Support's convention is to write the product as the actor ("Shazam doesn't record or store the audio it detects"), which usefully makes the *product* rather than the *company* the subject of capability and constraint statements.

**Mood.** Imperative for steps, present tense for outcomes ("The track screen opens"), and — notably — **outcomes are stated as facts, not predictions.** "The track screen opens, showing the identified song" rather than "you should see" or "the song will appear". That confidence is exactly what produces the no-match blindness in T8: a content register with no conditional mood has nowhere to put a failure.

**Contractions** used freely, including in the privacy summary ("it's important for you to know what we're collecting"). Register is conversational even in the legal-adjacent material.

**Exclamation marks: exactly one** in the harvested set — "it's time to start discovering music!" at the end of the prerequisites page. No `Oops!`, no `Great news!`, and no apology anywhere.

**Whimsy is rationed to one parenthesis.** "(and a little bit of magic)" is the only overtly playful phrase, and it is grounded at the foot of the same page by the fingerprint-matching explanation. `Never miss a gig.` / `Never miss a song.` / `Spread the love.` / `Own it.` / `Keep it real` are idiomatic but not whimsical. `Keep it real` as an H2 in an artist-facing document about content-exclusion policy is the most register-stretched heading in the file — colloquial framing for a delisting rule.

**Numbers are notably absent as trust devices.** No "X billion Shazams", no user count, no accuracy claim. The only numbers on the marketing site are chart counts belonging to songs (`6,072,973`), and the only numbers in the guide are OS versions and a character limit. For a product with famously large usage figures, the restraint is striking — and it means the value proposition rests entirely on the time claim (`in seconds`) rather than on scale.

**Deliberate hedging where hedging is warranted:** `almost any song within earshot`, `if you think Shazam has incorrectly identified a song`, `Lyrics are not available for all songs`, `if an artist is on tour (and the app has access to the tour data)`, `Not at present`, `may hide content for editorial reasons`. The content set *can* hedge; it simply never hedges the recognition itself.

### Accessibility

**Accessibility appears once, as one of sixteen capability lines** `[observed]`

> **`Get a better view.`** "Make it easier to read Shazam on your device's screen using accessibility features for vision"

Two things are creditable here. It is written in the **same register and format** as the fifteen other capability lines — bold imperative, then a linked instruction — rather than being sectioned into an accessibility ghetto. And `Get a better view.` is a benefit, not a category name.

Everything else is a gap:

- **Scope is vision only.** The linked aside is `using accessibility features for vision`. Nothing about hearing, motor, cognitive or speech accessibility — in a product whose interaction is a single large button (well suited to motor accessibility) and whose entire input is audio (with obvious implications for deaf and hard-of-hearing users, who are arguably a *primary* beneficiary of a "what song is this" service that returns text and lyrics). The content does not make that argument.
- **No accessibility statement, no VPAT, no conformance claim** was found for Shazam. Apple publishes accessibility material at the platform level; Shazam has no equivalent page, and `Accessibility` appears nowhere in shazam.com's nav or footer. Compare Audible (157), which has `Accessibility` as a top-level nav item and three named design principles, and Firefox (156), which publishes a dated VPAT.
- **The primary control is an unlabelled icon.** The Shazam button is documented only as "the Shazam button" with an inline image; no accessible label is quoted anywhere. For a one-button product, whether that button has a good accessible name is the single most consequential accessibility question, and it is unanswerable from public content.
- **Instructions are heavily gesture- and position-dependent** `[documented]`: "Touch and hold the Shazam button", "swipe down from the top-right corner of the screen", "drag it to the Delete button at the bottom of the screen", "tap the down arrow to the right of 'Auto Shazam is on'", "The pulsing Shazam from Pop-up button appears on the right edge of the screen". Long-press and drag-to-delete have no documented alternative path. The `Appear on top` permission requirement adds a further layer.
- **Icons are referenced by image with no text equivalent in the prose.** Steps read "tap ![the Microphone button] in the Dynamic Island" — the alt text is the only identification, so a text-only rendering (or a screen reader on a poorly-marked image) loses the referent. This is systematic across the guide.
- **shazam.com footer renders four raw URLs as link text** (`https://www.facebook.com/Shazam`) plus a string of unrendered icon-font placeholders including private-use Unicode codepoints (`􀆄 copy􀐅􀋲`). Both will be announced literally by a screen reader, on every page.
- **Homepage images carry empty `src` and `alt` in the served markup** (`![Nicole Kidman](<>)`, `![Album artwork for album titled Cuntology 101 by Lambrini Girls](<>)`). The album-artwork alt text that *is* present is good and formulaic — "Album artwork for album titled X by Y", "Listen to X by Y" — so a naming convention exists; the editorial insight cards' images have artist names as alt but no useful description.
- **`Link Copied` rendered unconditionally** (T9) means a screen-reader user encounters six false success announcements on the homepage.

**One accessibility-adjacent positive worth recording** `[observed]`: the user guide's feedback field carries "Please don't include any personal information in your comment." — a plain-language data-minimisation instruction at the point of input. And the `Previous <title>` / `Next <title>` links name their destinations rather than using bare arrows, which is correct link-text practice and the opposite of the `Learn more` problem on the apps page.

### Negative findings, recorded honestly

- **The no-match state is undocumented across the entire public content estate** — the central finding (T8)
- **No troubleshooting content of any kind**; 30 guide pages, zero failure articles, no `Troubleshooting` group
- **No escalation route to a human** for recognition problems; the only named support routes are Bandsintown's (tickets) and Apple Legal's (infringement)
- **The most frequent failure mode is unreportable** — `Wrong Song?` requires a library row, which a no-match does not create
- **The causes of no-match are published only to artists** (`Editorial Hides`, five named content classes) and never to users
- **Microphone permission-prompt copy is absent**; first-run permission is one dependent clause telling the user to "follow any onscreen instructions"
- `Shazam ID` (concept) vs `Reset Installation ID` (control) — one identifier, two names, and the control uses the name the docs don't
- `Pop-up Shazam` vs `Shazam from Pop-up` — two names in one article
- `Start Shazam` (iOS) vs `Shazam Now` (Android) — one action, two labels
- `View Chart` / `View` / `See All` — three labels for one action in adjacent homepage rails
- Three bare `Learn more` links on the apps page, all resolving to two general KB articles
- Two near-duplicate paragraphs in the privacy summary, differing only in `Shazam` vs `find` as the verb
- Pop-up Shazam steps 1 and 2 are near-identical duplicated blocks in the guide
- The lyrics-preview auto-replacement behaviour is documented twice in one article
- Privacy summary stamped **`2026-19-02`** — an invalid date on a legal document
- `DELETE YOUR ACCOUNT` given identical weight to two benign CTAs, with no consequence statement
- Library-loss-on-reinstall (account-free users) disclosed only in the privacy summary, not in `Where are my identified songs saved?`
- `Link Copied` rendered unconditionally on six homepage cards
- Raw social URLs and unrendered icon-font glyphs in the footer of every shazam.com page
- `Updated Weekly` above a headline claiming `right now`
- `Artist on the Move`'s gloss is title-cased against five sentence-cased siblings
- `Download the free App` — `App` capitalised mid-phrase; `smart phone` as two words
- Availability caveats placed as the **last line** of pages whose content they qualify
- Person shifts across four adjacent privacy-hub headings (`we`/`our` then `you`/`your` ambiguously addressed)
- No accessibility statement, no conformance report, and accessibility scoped to vision only

---

## Transferable patterns

1. **Write the unhappy path or someone else will.** This is the file's lesson, stated as an inverse. A product with one interaction and a binary outcome documented only the success, and the "why didn't it work" page is now owned by third parties, competitors and forum threads. Before shipping, count the outcomes your interaction can produce and check that each has copy. Condition: applies most sharply where failure is frequent and structural (catalog gaps, coverage limits, eligibility), not where it is rare.
2. **Answer a permission prompt's *why* and its *degraded alternative* in one short answer.** "The Shazam app requests permission to access your location in order to show upcoming concerts near you. Without location permission, Shazam provides only upcoming concerts in your country or general upcoming concerts for the specified artist." Purpose, then exactly what the user keeps if they decline. Directly reusable for camera, location, contacts, notification and biometric prompts.
3. **Put the data disclaimer at the moment of the grant, not in the policy.** "Shazam doesn't record or store the audio it detects, and Apple has no access to audio captured on device" sits at the top of the article where the user is about to enable the microphone. Two negations, both actors named, with links out for depth. Transfers to any sensor, document-upload or screen-recording permission.
4. **Present anonymity as a stated exchange, including what it costs.** The account/no-account sections name the identifier, the storage, the reset path, **and** the loss ("if you uninstall and reinstall the app, the list of songs you previously identified will be removed"). Guest checkout, pseudonymous sessions and unauthenticated trials should all carry the equivalent.
5. **Say what turning off sync does *not* do.** "the songs saved to iCloud will remain in your iCloud account, but new songs that you Shazam will not be added." Every sync toggle in every product has this ambiguity and almost none resolve it.
6. **"Not at present."** Three words for a capability you do not have. No roadmap promise, no apology, no "we're exploring". The best short negative answer in this corpus.
7. **Name recipients by role and state the purpose in their terms.** "with our partners, including music labels and artists… allows our partners to understand which tracks are encountering success in the market", plus `chart compilers` in the lawful-bases list. Naming who benefits, and why, beats "trusted third parties".
8. **Claim the magic in the intro; explain the mechanism in the outro.** "(and a little bit of magic)" at the top of the same page that ends "Shazam works by quickly matching a digital fingerprint of the music you're hearing to one of millions of songs in the Shazam catalog." Delight and legibility on one page, in that order.
9. **`Wrong Song?` — a two-word, question-marked, row-level error report.** The question mark makes it a hypothesis; the row scope removes any need to describe what went wrong. Adopt for any per-item correction affordance (wrong merchant, wrong category, wrong match).
10. **Short nav label, fully-qualified page title.** `Use Shazam when you're offline` in the sidebar; `Use the Shazam app or Shazam Music Recognition when you're offline` as the H1. Scanning and reading are different jobs; give them different strings.
11. **Platform-forked italic lead-ins inside one numbered list**, rather than duplicated step blocks per OS. Keeps one canonical procedure and one thing to maintain.
12. **Name the two modes of a background feature by behaviour.** `Single result mode` / `Continuous mode` — not "once"/"repeat", not a toggle. And pair a persistent background capability with a persistent state notification carrying its own kill switch (`Auto Shazam is on` → `Turn Off` / `Change`).
13. **Give a chart or feed category a name plus a five-word mechanism gloss.** `Rediscovered` — "Older songs reaching new fans". The gloss is what makes an invented category legible on first encounter.

## Caveats & gaps

- **The no-match copy — the brief's priority target — was not found and is believed not to exist publicly.** Eleven pages including the complete 30-page guide contents, the core identification article, the offline article and both privacy pages contain no no-match string and no no-match explanation. Third-party sources and Apple Support community threads discuss the failure and report strings; those are **deliberately not quoted or relied on**, because they are not the product's own copy and quoting them would risk recording a stale or invented string as verbatim. An authenticated, in-app pass (deny microphone, Shazam silence, Shazam a DJ mix) is the only way to capture the actual strings. Marked `[absent]`.
- **All in-app strings are `[documented]`** from Apple Support prose, never observed. The Shazam button, track screen, library, History, and every notification are described rather than quoted. The app is the product; the web is a chart publication.
- **Permission-prompt copy absent.** Microphone and location prompts are the product's only consent surfaces and neither is quoted anywhere.
- **Guide pages not opened (18 of 30):** `Discover music`, `Sync your identified songs to the Shazam app`, `Use the Shazam app with headphones or earphones`, `Use Shazam Music Recognition on Apple Watch`, `Identify a song on HomePod` / `Mac` / `Apple Vision Pro` / `the web` / `with shortcuts`, `Listen to songs, view lyrics, and watch videos`, `Check out trending songs and recommended artists`, `Add songs`, `View artist information`, `Purchase your identified songs`, `Listen to your songs in Apple Music`, both Spotify pages, `Discover concerts`, `Share your songs`, both `Modify Shazam app settings` pages, `Copyright and trademarks`. The two settings pages in particular would carry the full setting-label inventory (T5 is thin as a result), and `Discover music` may contain result-state copy not seen here.
- **Apple KB articles `HT210331` and `HT211913` not fetched** — these are the `Help` destinations from shazam.com's nav and the Android help route, and are the likeliest home for any troubleshooting content that exists outside the user guide. A real remaining lead.
- **The `Editorial Hides` page in the Apple Music Style Guide was not fetched** — it is the authoritative source for the catalog-exclusion classes that cause no-matches, and is linked from the artist page.
- **Apple Music for Artists (`artists.apple.com`) not harvested.** The artist-facing analytics vocabulary (`Shazam matches`, city/country discovery data) is known only from the one-paragraph summary on the `Add your own music` page.
- **Chart, concert, artist and song pages on shazam.com not harvested** beyond the homepage rails. Per the brief, individual artist and user pages were deliberately not opened.
- **`Fast Forward '26` and `Radio Spins` pages not fetched** — both are editorial surfaces with likely distinctive naming.
- **No status page found.** No service-status link in nav, footer or help. Marked `[absent]`.
- **No pricing or membership page** — Shazam is free with no subscription, so there is no cancellation wording to capture. The nearest entitlement content is the Apple Music prerequisite in `Before you use the Shazam app` (full songs vs previews, and the iOS/Android asymmetry), recorded in T4.
- **No Shazam accessibility statement or conformance report found**; accessibility content is one capability line scoped to vision. Marked as a gap rather than blocked.
- **No published Shazam content style guide.** T14 is inferred from shipped copy plus the observable conventions of the Apple Support user-guide genre.
- **en-US only.** A 21-language selector exists; none of the localised registers were examined.
- **Guide search not exercised**, so the no-results string for `Search this guide` is unknown.

## Sources

1. https://www.shazam.com/
2. https://www.shazam.com/apps
3. https://www.shazam.com/privacy
4. https://www.shazam.com/privacy/summary
5. https://support.apple.com/guide/shazam/welcome/web
6. https://support.apple.com/guide/shazam/shazam-app-at-a-glance-dev9b5e0fa36/web
7. https://support.apple.com/guide/shazam/before-you-use-the-shazam-app-dev9a6693847/web
8. https://support.apple.com/guide/shazam/where-are-my-identified-songs-saved-dev64d8cd51e/web
9. https://support.apple.com/guide/shazam/shazam-app-iphone-ipad-android-device-dev9748744b6/web
10. https://support.apple.com/guide/shazam/use-shazam-when-youre-offline-devad6c028a7/web
11. https://support.apple.com/guide/shazam/shazam-app-concert-faq-dev46b2c07b8/web
12. https://support.apple.com/guide/shazam/add-your-own-music-to-shazam-dev9313a6a31/web
