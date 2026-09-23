# 152. Letterboxd

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Film logging and review community / personal media cataloguing |
| Primary URL | https://letterboxd.com/ |
| Corpus rank | 152 |
| Benchmark strength (source list) | Rating, list, and review microcopy |
| Locale / market observed | en (US spelling as product standard; company is NZ-based — "Made by fans in Aotearoa New Zealand") |
| Platform observed | Web (desktop); app behaviour documented in parallel answer variants |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a — no financial or health regulator. Payments via **Paddle** (web merchant of record) and Apple/Google IAP; TMDB as licensed data source |
| Harvest date | 2026-09-21 |
| Pages inspected | 7 |
| Harvest completeness | Partial — `letterboxd.com/` homepage fetch aborted; `/year-in-review/` exceeded retrieval limits. The public-modal strings in the page chrome are real observed UI; all in-account states are `[documented]` from the 115-question FAQ. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Pro / upgrade | https://letterboxd.com/pro/ | Three-tier comparison, price, Paddle disclosure. Also renders the logging modal in page chrome. |
| Welcome / how it works | https://letterboxd.com/welcome/ | Nine-step onboarding narrative, icon vocabulary, section descriptions |
| Frequent questions | https://letterboxd.com/about/faq/ | **115 questions, 17 sections** — the single richest artefact in this file |
| Paid subscriptions | https://letterboxd.com/about/pro/ | Benefit lists per tier, renewal and lapse language |
| Importing data | https://letterboxd.com/about/importing-data/ | The CSV schema — the product's own data model, named |
| Account deactivation | https://letterboxd.com/about/account-deactivation/ | Deactivate vs permanently delete, 90/30-day windows |
| Terms of use | https://letterboxd.com/legal/terms-of-use/ | Retrieved; only metadata and opening clauses read (see Caveats) |

---

## T1 Navigation & IA labels

**Global footer — eleven items, flat** `[observed]`

`About` · `Pro` · `News` · `Apps` · `Year in Review` · `Video Store` · `Gifts` · `Help` · `Terms` · `API` · `Contact`

Two things. `Help` points to `/welcome/` — the onboarding tour, not the FAQ. So the label promises support and delivers a product tour; the actual 115-question FAQ lives at `/about/faq/` and is reachable only via `About`. That is a genuine routing defect, and it means the richest help artefact on the site is two clicks off the footer.

`Year in Review`, `Video Store` and `Gifts` sit as peers to `About` and `Terms` — seasonal and commercial surfaces promoted to permanent global nav.

**`About` section sidebar — fifteen items** `[observed]`

`Frequent questions` · `Paid subscriptions` · `Paid subscriptions` · `Annual sale` · `HQ accounts` · `Film data` · `Importing data` · `Embed our ratings` · `Migrating from IMDb` · `Account deactivation` · `Letterboxd brand` · `Video Store brand` · `Security notices` · `Behind the scenes` · `Podcast transcripts`

**`Paid subscriptions` appears twice**, with identical label text, pointing at two different URLs (`/about/pro/` for web, `/about/pro-apps/` for apps). A duplicated nav label is the clearest IA defect on the property — the reader cannot tell which to click, and the distinction (web vs app billing) is not surfaced in either label.

`Behind the scenes` is the *team* page, not a making-of. `Security notices` as a first-class About item is good practice. `Podcast transcripts` in the About nav signals Letterboxd's editorial arm sitting inside the product IA.

**FAQ section headings — seventeen, and they are the real IA** `[observed]`

`About Letterboxd` · `Membership` · `General use` · `Profile and settings` · `Following and blocking` · `Reviews and tags` · `Lists and ownership` · `Posters and backdrops` · `Advanced search` · `Notifications and newsletters` · `Pro and Patron subscriptions` · `Data and privacy` · `Importing data` · `Film data` · `Average ratings` · `Apps and API` · `Miscellaneous`

Three of these are worth noting. `Following and blocking` pairs the social affordance with its inverse in one heading — the same category that lets you follow also handles the case where you want someone gone. `Lists and ownership` yokes a creative feature to a collection-state concept (do I own this film) that most products would file under settings. `Average ratings` gets its own top-level section for **three** questions, which tells you how much argument the rating algorithm generates.

**Profile section / tab names** `[documented]`: `Profile` · `Films` · `Diary` · `Watchlist` · `Lists` · `Likes` · `Ratings` · `Tags` · `Following` · `Followers` · `Activity` (with an `Incoming` tab) · `Stats` · `Year in Review`

**Browse section descriptions** `[observed]` — the four main sections each get a one-sentence scope line on `/welcome/`: `Homepage` · `Films` · `Lists` · `Members`. Each description leads with what the *community* is doing rather than what the user can do ("This section shows which films our members are watching and reviewing the most").

## T2 Value proposition & headline patterns

**The masthead tagline is the value prop** `[observed]`

> `Letterboxd — Your life in film`

Four words after the em-dash. Possessive second person, no verb, no claim. It appears in the `<h1>` link on every page.

**Homepage-equivalent hero (on `/welcome/`) is a film quotation** `[observed]`

> `Take your first step into a larger world…`

A *Star Wars* line, attributed at the page foot (`Header image from Star Wars (1977)`). The hero copy is a quotation from the medium the product catalogues — the boldest available register choice, and only legible to the audience it wants.

**The functional description is one long comma-run sentence** `[observed]`

> "We're your home for logging, rating and reviewing films, your watchlist of titles to see, your source for lists and inspiration, a cast and crew database and an activity stream of passionate film criticism, discussion and discovery."

Five appositive noun phrases, each beginning with a possessive (`your home`, `your watchlist`, `your source`) then switching to indefinite (`a cast and crew database`, `an activity stream`). It names the *five product surfaces* rather than five benefits. Note the deliberate pile-up of gerunds — `logging, rating and reviewing` — which is the verb triad the whole product runs on.

**`/pro/` hero is a film quotation too** `[observed]`

> `"Ad-free, question. Amaze. Amaze. Amaze."`

A mangled *Spaceballs*-adjacent construction used as the headline of a *pricing page*. Then, immediately below, the plain claim: "Show your support for Letterboxd by upgrading to Pro." The joke and the ask are adjacent, and the ask is the flatter sentence. This is the register discipline in miniature: play in the headline, plainness at the point of payment.

**Section headers on `/welcome/` are imperative task names, second person** `[observed]`

`Tell us what you've seen` · `Browse your watched films` · `Save films to watch later` · `Your account, profile and settings` · `Log a film` · `Following and activity` · `Make and share lists` · `Upgrade for stats + more!`

`Tell us what you've seen` is the interesting one. The first onboarding step is framed as the user *informing Letterboxd*, not as the user building their own record. It positions the data contribution as conversational, which then licenses the reciprocal "we" of the next clause: "We add all watched titles to your Films tab and then we can show you reviews containing spoilers (usually hidden) and other cool stuff."

**Benefit framing on `/about/pro/` opens with an ethical premise, not a feature** `[observed]`

> "In the spirit of encouraging payment in support of the online services we use and love, Letterboxd has a paid subscription tier in addition to its free membership tier (which will always remain available)."

The pricing page's first move is to argue that paying for software is good, in general, before mentioning what you get. And the free-tier guarantee is placed in a parenthesis inside that same sentence rather than in a separate reassurance block.

## T3 CTA inventory

This is a priority section. Letterboxd's entire product is the verb it picked for "add this to my list", and it picked **six**.

### The six collection verbs, and what each one does

| Verb / control | What it records | Where it lives |
|---|---|---|
| the `'eye'` icon | watched — "tells Letterboxd you've seen the film" | poster overlay, film page, review page |
| the `'heart'` icon | liked — "to show you enjoyed it" | poster overlay, film page |
| star selection | rated — 0.5–5 in half increments | film page, log form, poster `Actions menu` |
| the `clock` icon | watchlist — "a single-click add/remove toggle" | poster, film page, review page |
| `+ Log` (web) / `+` (app) | a dated Diary entry, with optional review, rating, tags | film page, app FAB |
| `Add a Review` | a review, with or without a date | film page |

**Four of the six are icon-only**, and Letterboxd's help copy names them by appearance in quotes (`the 'eye'`, `a 'like'`, `the 'clock'`, `the 'heart'`) rather than by function. The FAQ has to teach the icon vocabulary because the UI does not label it. This is the central accessibility cost of the design, and it is discussed in T14.

### Observed live UI strings

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign in` | Masthead | |
| `register` | Welcome page body — "Sign in or register to get started" | **lowercase**, mid-sentence |
| `create an account` | Welcome page foot — "Sign in or create an account to get started!" | **Third label** for the same action |
| `Create an account` | FAQ answer | Fourth casing |
| `Sign in to purchase` | Pro and Patron tier buttons | Names the blocker, not the product |
| `Sign in to add films` | Welcome, "Log a film" section | Same pattern |
| `Sign in to make lists` | Welcome, "Make and share lists" | Same pattern |
| `Forgotten username or password?` | Masthead sign-in form | `Forgotten`, not "Forgot" |
| `Remember me` | Masthead form | |
| `Apply` | Coupon field, `/pro/` | |
| `Save` | Logging modal | |
| `Delete` | Logging modal | Sits **beside** Save with no destructive styling cue in markup |
| `Save changes` | Poster/backdrop modals | Different casing from `Save` |
| `Reset poster` | Poster modal | |
| `Reset poster` | **Backdrop** modal | **Mislabelled control** — should read "Reset backdrop" |
| `Show more` | Not observed | — |
| `Learn more` | `/pro/` — "Learn more about upgrades." | A bare-ish `Learn more`, object supplied by the following words |
| `Upgrade to Pro today…` | `/about/pro/` foot | Trailing ellipsis |
| `manage it here` | `/about/pro/` foot, inside an italic aside | Link text is a locative phrase, not a label |
| `Read our IMDb migration guide` | Welcome, import block | Fully specific |
| `See the Letterboxd Top 500` | Welcome foot | |
| `Mobile site` | Footer | Rendered as `#` — a dead link in the fetched markup |

### CTAs documented in the FAQ

`Edit` · `Save Changes` · `Public` (checkbox) · `Sort By` · `Move To Position` · `Change Poster` / `Change Backdrop` · `Reset Poster` / `Reset Backdrop` · `Reset for item` · `Save for item` · `This item only` · `Transfer Subscription` · `Give as a Gift` · `Import your data` · `Copy profile link` · `Show QR code` · `Copy Link` · `View QR Code` · `Report` · `View in Carousel mode` · `Export this list` · `Hide watched films`

**Four casings for one action.** `Save` (log modal) / `Save changes` (poster modal) / `Save Changes` (FAQ, settings) / `Save for item` (poster scope). And **four labels for account creation**: `register`, `create an account`, `Create an account`, `Sign up` (implied by `/create-account/`). Recorded as defects.

**Platform label divergence, unacknowledged** `[documented]`: web says `Copy profile link` and `Show QR code`; the app says `Copy Link` and `View QR Code`. The FAQ prints both without noting that they are the same action.

**The `Sign in to <verb>` pattern is the strongest CTA decision here.** Rather than a generic `Sign in` gate, every locked affordance on `/welcome/` names the specific thing the sign-in unlocks: `Sign in to add films`, `Sign in to make lists`, `Sign in to purchase`. The user learns what they are buying with the account at the moment they are asked for it.

## T4 Onboarding & getting-started

**`/welcome/` is a nine-step narrative, not a wizard** `[observed]`

Under the heading `How Letterboxd works`, nine illustrated sections in this order:

1. `Tell us what you've seen`
2. `Browse your watched films`
3. `Save films to watch later`
4. `Your account, profile and settings`
5. `Log a film`
6. `Following and activity`
7. `Make and share lists`
8. `Upgrade for stats + more!`
9. `Here's what you'll find in our main sections…`

Then `More tips and tricks` (four cards: `Film actions`, `Tagging films`, `Reordering lists`, `Upgrade to Pro!`), then a "next up" line, then an import block, then a discovery block.

**Sequencing observation.** The sequence is *retrospective before prospective*: step 1 asks you to mark what you have already seen, step 3 asks what you want to see. Most catalogue products open with intent (wishlist, goals) because it is a smaller ask. Letterboxd opens with history because history is what powers its stats, recommendations, and social graph — and it says so: "We add all watched titles to your Films tab and then we can show you reviews containing spoilers (usually hidden) and other cool stuff."

**Each step routes to a concrete starting list.** Step 1 → `Popular`. Step 3 → `Most Anticipated`. Step 6 → `Members`. Step 8 → `Stats`. The onboarding never says "browse" without naming the destination page.

**Progress language** `[observed]`: the closing line is a heading, not a button — "`Next up: complete your profile and add some popular films you've seen…`". Trailing ellipsis, two inline links, no step counter anywhere on the page. There is no "Step 3 of 9", no progress bar, no completion percentage.

**Inline try-it affordances** `[observed]`: "Try logging a film now…" followed by `Sign in to add films`. The invitation and the gate are adjacent, so the user discovers the wall immediately rather than after investing.

**A back-fill concept is taught in onboarding, in scare quotes** `[documented]`

> "It's the best way to 'back-fill' films on the service, without having to recall exactly when you watched them"

`back-fill`, quoted, is Letterboxd naming the awkward act of retro-entering a life's viewing. See T6.

## T5 Form & field labels

**Sign-in form (observed on every page's chrome)** `[observed]`: `Username` · `Password` · `Remember me` · `Forgotten username or password?`

**The logging modal — the product's primary form, and it renders in page chrome on every About page** `[observed]`

| Label / string | Notes |
|---|---|
| `Add to your films…` | Modal title. Trailing ellipsis. Second-person possessive. |
| `Name of Film` | Field label — **title case, and oddly formal**. Not "Film", not "Search films". |
| `Anyone (public)` | Privacy option 1 |
| `Close Friends (selected by you)` | Privacy option 2 — the parenthesis defines the term inline |
| `You (private)` | Privacy option 3 |
| `Use account default` | Fourth option, after a rule |
| `Draft` | Checkbox |
| `Delete` | |
| `Save` | |

**The privacy options are a masterclass in inline definition.** Each of the three values names the audience *and* glosses it in parentheses: `Anyone (public)` teaches that "Anyone" means public; `Close Friends (selected by you)` pre-empts "who counts as a close friend?"; `You (private)` pre-empts "does 'You' mean visible to me only?". The label and its definition occupy one line each.

**And the consequences are stated as a four-line rule block beneath the picker** `[observed]`

> "Your diary date (if set) and watched status for this film remain publicly visible."
> "Ratings on *Close Friends* and *You* entries don't contribute to stats."
> "Add members to your Close Friends from their profile."
> "Set your account default for Privacy mode in Settings."

Line 1 is the important one. It is a **partial-privacy disclosure**: the entry is private but the *fact and date* of watching is not. Letterboxd tells you exactly which part of a "private" action leaks, in the modal, before you commit. Compare the industry norm of a padlock icon and a help-article link.

Line 2 discloses a *statistical* consequence of a privacy choice — choosing privacy silently degrades your own stats — which is exactly the kind of second-order effect products normally bury.

Lines 3 and 4 are pre-emptive routing: the two questions the picker raises ("how do I set up Close Friends?", "can I not choose every time?") answered in situ.

**Draft, with its own consequence line** `[observed]`

> `Draft`
> "Draft entries don't appear in your watched films or diary for others, and don't contribute to your stats."

Same pattern as the privacy rules: the state name, then the two things it withholds.

**Hover-reveal privacy tooltips in page chrome** `[observed]`: `Visible to anyone (with link)` · `Visible to the member's friends (with link)` · `Only visible to you`

Note the divergence from the picker labels: the picker says `Anyone (public)` / `Close Friends (selected by you)` / `You (private)`; the tooltips say `Visible to anyone (with link)` / `Visible to the member's friends (with link)` / `Only visible to you`. **Two different vocabularies for the same three states**, on the same screen — "Close Friends" becomes "the member's friends", and the tooltips add a material caveat (`with link`) that the picker labels omit. The `(with link)` qualifier means "public" is really "unlisted-plus" for the first two states, and only the tooltip says so. Recorded as a significant inconsistency.

**Import format field names — the data model, published** `[documented]`

`LetterboxdURI` · `tmdbID` · `imdbID` · `Title` · `Year` · `Directors` · `Rating` · `Rating10` · `WatchedDate` · `Rewatch` · `Tags` · `Review`

The CSV column names *are* the product's object model, and publishing them tells you what Letterboxd considers a first-class attribute of a viewing. `Rewatch` is a **Boolean field**, which is the answer to the re-watch question in T6. `Rating` is documented as "decimals from 0.5–5 including 0.5 increments" — and this is the **only place on the public site where the rating scale is stated numerically**.

**Validation and limit text** `[documented]`: "There is a file size limit of 1MB" · "a limit to the number of characters in a list title… (256 characters, or fewer if you use unicode characters)" · "140 characters or fewer" (bio-in-sidebar rule) · "you'll be warned if editing a tag will result in a merge, and given the option to cancel or proceed" · "There is *no undo* after the confirmation step. Be careful!"

## T6 Collection & publication states — PRIORITY

Letterboxd models a member's relationship to a film as **six independent, orthogonal flags**, not one lifecycle. This is the defining architectural decision and it drives all the vocabulary.

### The six states

| State | Set by | Removed by | Notes |
|---|---|---|---|
| `watched` | the `'eye'` icon; automatically on log/review/rate | clicking the **green** eye to toggle off — but only after removing diary entries, reviews and rating first | "films are also marked as watched when you log them, if that flag is not already set" |
| `liked` | the `'heart'` icon | toggling off | "You can 'like' a film any time to show you enjoyed it" |
| `rated` | 0.5–5 stars | — | "It's no problem to use both ratings and likes (or neither)." |
| in `watchlist` | the `clock` icon | **automatically** — "Films in your watchlist are automatically removed when you mark them as watched, or log, review or rate them." |
| `logged` (a Diary entry) | `+ Log` with a date | deleting the entry | "allows you to record that you watched a film on a particular date" |
| `owned` | tagging a list `own` or `owned` | untagging | Implemented as a **tag convention**, not a first-class field |

**The orthogonality is the whole product.** You can rate without watching ("by rating the film if you haven't already marked it as watched" — rating *sets* watched), like without rating, log without rating, and review without a date. The FAQ has to devote four separate questions to disambiguating pairs:

- `What's the difference between marking a film watched and logging it?`
- `What's the difference between liking and rating a film?`
- `What's the difference between my lists and my watchlist?`
- `Can I find films I've logged but not rated, or other combinations?`

Four "what's the difference" questions in one FAQ is a diagnostic: the model is powerful and it is **not self-evident from the UI**, and Letterboxd knows it.

### The counting distinction, stated precisely

> "Your 'Diary Entries' total counts every individual watch of a film"
> "Your 'Films' total counts each film *once* for the period"

Two totals, one object, and the difference explained with italic emphasis on `once`. This gets its own FAQ question (`Why does my films total differ from my diary entries total?`) — evidence the distinction confuses people even when documented.

### The awkward states

**Re-watch — first class, and quantified** `[documented]`

`Rewatch` is a Boolean on the diary entry and a documented flag in the import schema. The counting rule is stated: "a re-watch will still count towards your 'Films' total for the year the *first* time". So a re-watch increments Diary Entries every time and Films once. This is the cleanest re-watch handling in the cohort: the state exists, has a name, has a flag, and has an explicit arithmetic consequence.

**Did-not-finish / abandoned — COMPLETELY ABSENT** `[absent]`

This is the single most important negative finding in this file. Across 115 FAQ questions, a nine-step onboarding tour, a published CSV schema, and a twelve-column import format, there is **no** state for a film you walked out of, turned off, fell asleep during, or abandoned. No "unfinished", no "DNF", no "partial", no "started". The vocabulary is strictly binary: watched or not watched, plus watchlist.

Letterboxd's own filter set confirms the binary: `show-watched` / `hide-watched` and nothing between. The `Rewatch` flag exists but `Unfinished` does not. Users work around this with tags (the product supports arbitrary tags including nested `with:mom`-style tags), but Letterboxd has never promoted it to a state, never documented a convention for it as it did for `own`/`owned`, and never mentions it. **Compare Goodreads, which shipped a `Did Not Finish` default shelf (see 153).** For a product whose entire value is state fidelity, this is a conspicuous hole.

**Films watched before joining — named, normalised, and given a coined verb** `[documented]`

> "or just to keep track of films you've seen in the past"
> "the best way to 'back-fill' films on the service, without having to recall exactly when you watched them"
> "providing a watched date is optional"
> "Most members keep an up-to-date Diary only from the time they join the platform"
> "You can retrospectively add diary entries for films you've marked as watched, in order to complete your Diary."

Five separate reassurances about the same anxiety. `back-fill` is the coinage; "providing a watched date is optional" is the permission; and "Most members keep an up-to-date Diary only from the time they join" is **social proof used to license incompleteness** — you are not behind, this is what everyone does. That is a genuinely good piece of anxiety-reduction copy and it belongs in the transferable list.

**Un-watching — possible but effortful, and the asymmetry is unexplained** `[documented]`

> "you can unmark a film as watched by clicking the green 'eye' icon to toggle it off"
> "you'll need to remove any diary entries or reviews for the film, as well as its rating, before doing so"

Set against the watchlist behaviour — "Films in your watchlist are automatically removed when you mark them as watched, or log, review or rate them" — the asymmetry is stark. Adding cascades automatically; removing requires manual teardown of three dependent objects. The FAQ states both rules and never reconciles them. Recorded as a defect: the mental model is "the app tidies up after me", and it is only half true.

There is also an FAQ heading for the recovery case (`I've been marking films watched instead of logging them to my Diary. How can I fix this?`) — a *recovery article for a taxonomy misunderstanding*, which is what you have to write when your states are orthogonal and your icons are unlabelled.

**Draft as a publication state** `[documented]` / `[observed]`: `Draft` exists on a diary entry with the consequence stated ("don't appear in your watched films or diary for others, and don't contribute to your stats"). And on lists: "Deselect the 'Public' option when you first save a new list."

**Publication is a one-time event, and it is disclosed** `[documented]`: "Your followers will be notified that you've published a new list if this is the *first* time you've made it public." Also on `/welcome/`: "The first time you make a list public, it's shared with your followers." Telling the user that toggling public→private→public will not re-notify is a considerate and rarely-documented disclosure.

**Deletion states** `[documented]`

- "Older revisions of reviews and lists are not stored when you make updates, so it is not possible to restore an older version."
- "any content you delete will remain in your bundle for 30 days following its deletion"
- "permanently removed from our servers **no less than** 30 days after it is deleted"
- "We do not provide a mechanism to reinstate deleted content before it is permanently removed"
- Deleted reviews appear in an export folder literally named `deleted`

Note the inconsistency: `for 30 days` (a window) in one answer, `no less than 30 days` (a floor) in another. Two retention promises for one policy.

**Account states — the best-documented lifecycle on the site** `[observed]`

| State | What happens |
|---|---|
| active | — |
| **deactivated** | "The profile and content of deactivated accounts are hidden from view for all members, the account username is made available for other members to use, and signing into the account is disabled." |
| **deactivated + scheduled for deletion** | "scheduled for removal in 90 days, during which time it may still be reactivated" |
| **accelerated deletion** | "an additional email link that you can use to reduce the timeframe for permanent deletion to 30 days" |
| **permanently deleted** | "*Once your account is permanently deleted, it cannot be recovered by you or by Letterboxd support.*" |

Three specific practices worth stealing. (1) **The username is released on deactivation** — a consequence most products hide, stated in the same sentence as the hiding. (2) **The safety floor is justified, not just asserted**: "There is no way to have an account permanently removed from our service in less than 30 days, as a safety precaution." (3) **Letterboxd emails you the reactivation link immediately**, before you might want it, and then a *second* email whose only function is to let you speed up your own deletion. Giving the user a control to make the destruction faster, by email, after the fact, is an unusual and respectful piece of flow design.

**Subscription lapse framed as reversible, in five words** `[documented]`: "nothing is lost that can't be restored by renewing" — and elsewhere, "If they are not renewed, upgraded accounts revert to free accounts on their expiration date." Plus a recovery window: "within 90 days of expiring".

## T7 Error, failure & recovery

Letterboxd's FAQ *describes* failure states rather than quoting error strings, so most of this is structural.

**The one quoted validation state** `[documented]`: `unavailable` — from `My preferred username is showing as unavailable but there is no corresponding profile. Can I have it?`

That question is itself the pattern worth noting: it anticipates the user's *inference* from the error ("it says unavailable but I can see nobody has it, so you must be wrong") and answers the inference rather than the error.

**Recovery routes for cache-type failures** `[documented]`

- `Why is my number of watched films or diary entries incorrect?` → "try saving changes to your Settings page … to reset your account caches"
- `I've upgraded (or renewed a lapsed subscription) but my stats pages are missing. Can I get them back?` → "If your stats pages don't auto-generate following an upgrade or renewal, try hitting 'Save Changes'"

The same fix ("hit Save on Settings") is prescribed for two unrelated symptoms. A user-facing cache-flush ritual, documented twice, is a tell about the architecture — and it is honest to publish it rather than pretend the counts are always right.

**Blocked-capability answers, stated flatly** `[documented]`

- "we do not support SMS- or email-based 2FA at this time, nor do we provide backup codes"
- "List collaboration … is not supported at this time."
- "we are unable to restore access" (hacked accounts, in some cases)
- "HQ tier is in private beta at this time."

Three uses of `at this time` — a consistent hedge for "not yet", applied uniformly.

**Warning-before-destruction** `[documented]`: "*There is no undo for these actions, so please be careful!*" (bulk tag edit) · "There is *no undo* after the confirmation step. Be careful!" (import) · "Important: Batch editing carries a risk of data loss." — this last one is Goodreads; Letterboxd's equivalent is the import warning.

**Pre-commit review as the recovery mechanism** `[documented]`: rather than an undo, Letterboxd offers inspection before commit — "The importer shows a summary of the import file prior to completing the import, so you can fix any mismatched titles and/or remove any inappropriate entries (such as TV entries that have matched to similarly named films)." The parenthetical names the most likely specific failure (TV/film title collision) rather than gesturing at "errors".

**Failure articles for the platform's own removals** `[documented]`: `You removed a film I reviewed. Is my review lost?` and `You removed a film. Can I get my review back?` — **two questions, two sections, one answer**, with the first doing nothing but pointing at the second. A duplicate, and also a signal: Letterboxd deletes database entries and its users lose writing as a result, and it documents that twice.

**Two questions that are explicitly non-answers** `[documented]`

- `Does the site have protected/private accounts?` → "We are working on more granular privacy options, more news soon." The actual answer (no) appears only buried in the blocking answer: "Letterboxd does not have private accounts, which would be required to protect your content in this way".
- `Where should I report a security vulnerability?` → "Please email us" — **with no address and no link**.

Both recorded as defects. The second is the worse one: a security-disclosure question with no disclosure channel.

**A dangling interpolation** `[observed]`: one answer reads "please email details … to  and request a manual import" — the email address is missing, leaving "to  and". And elsewhere the obfuscation leaks into visible copy: "try adding *[email protected]* to your email contacts", which instructs the reader to allow-list a placeholder.

**Pre-emptive failure copy** `[observed]`: `Forgotten username or password?` sits inside the sign-in form itself, before any failed attempt.

## T8 Empty states

`[absent]` for observed. No empty-state strings are quoted anywhere in the FAQ, and the signed-out surfaces do not render them.

Two adjacent findings:

- **The gap is notable.** For a product whose entire first-run experience is an empty diary, an empty watchlist, zero followers and no stats, the public documentation contains **no** empty-state copy at all. `/welcome/` functions as the first-run experience, which may be why the in-product empty states are undocumented — the tour substitutes for them.
- The nearest thing to a zero-data message is the **stats eligibility threshold**, stated as a rule rather than a state: "A minimum of ten diary entries in a given year is required" for annual stats, and "annual stats for each year with at least ten films logged". A gated feature with a published numeric threshold, which at least tells the user what to do to leave the empty state.

## T9 Notifications & system messages

**Letterboxd publishes its full notification taxonomy as an FAQ answer** — `What notifications does Letterboxd send?` — with each type tagged by channel `[documented]`:

| Notification type (verbatim) | Channels |
|---|---|
| `New followers` | (email, push) |
| `New comments in subscribed threads—use the bell icon to subscribe` | (email, push) |
| `New likes for your reviews and lists` | (push only) |
| `General service and account alerts` | (email, push) |
| `Streaming service availability alerts` | (email, push—paid subscribers only) |
| `Other specialty newsletters` | (email) |

Plus "a weekly digest and/or monthly newsletter".

Publishing a per-type channel matrix, including which types are **push-only** and which are **paid-only**, is excellent practice. A reader can predict exactly what will reach them and where, before opting in. `New likes … (push only)` tells you Letterboxd deliberately withholds like-notifications from email — a restraint decision made visible.

**The subscribe affordance is named inside the notification type** — "use the bell icon to subscribe" is embedded in the row rather than filed separately.

**Two "why am I getting / not getting" companion questions** `[documented]`: `Why am I receiving notifications for someone else's content?` and `Why am I not receiving Letterboxd emails, despite being subscribed?`. The pair covers over- and under-delivery, which is the complete complaint space.

**A watchlist-availability alert product** `[documented]`: "Receive email and/or push notifications when films in your watchlist arrive on one of your favorite services" — the notification *is* the paid feature. And its own FAQ entry: `Can I get notified when films in my watchlist are ready to watch?` Note "ready to watch" in the question versus "arrive on one of your favorite services" in the benefit copy — the question uses the user's phrasing, the benefit uses the mechanism's.

**Renewal reminder, disclosed before purchase** `[observed]`: "Paid members are reminded via email when their subscription is nearing its renewal date." Stated on the pricing explainer, not buried in terms.

**A `**New:**` inline badge** `[documented]` is used to flag recently-added answers inside the FAQ, and `/pro/` uses a parenthetical for beta features: "(**now testing on the web:** one-click addition of all visible films to a list)".

## T10 Disclosures, legal & compliance

No financial regulator applies, so the disclosure work here is **pricing, platform-billing, data-provenance, and privacy-visibility**.

**Price and tax, adjacent** `[observed]`

> `$19.00[*]` `per year` — Pro
> `$49.00[*]` `per year` — Patron
> `*Price excludes any applicable sales tax.`

A footnote marker on the price itself, resolving to a one-line tax exclusion. And the merchant of record named at the foot of the pricing page: "Letterboxd subscriptions powered by Paddle."

**The free tier is guaranteed in writing, twice** `[observed]`

> "All accounts offer unlimited films, diary entries, reviews, ratings and lists." (`/pro/`)
> "its free membership tier (which will always remain available)" (`/about/pro/`)
> "Letterboxd will always remain free to use." (FAQ)

Three statements of the same promise across three pages, and the first one *enumerates* what free includes rather than describing it as a limitation. `unlimited` applied to five nouns is the whole pitch: Letterboxd does not paywall the core collection behaviour at all. Ads and stats are the paywall. That is an unusual and defensible monetisation line for a cataloguing product, and the copy makes it explicit rather than implicit.

**Revenue model stated plainly** `[documented]`: "Letterboxd is supported by membership fees as our chief source of income."

**Platform-specific billing consequences, disclosed per platform** `[documented]`

This is the strongest compliance-UX artefact in the file. The tier-change answer splits three ways because the three billing platforms behave differently, and Letterboxd documents each:

- Web/Paddle and iOS: "both our web (Paddle) and iOS subscriptions auto-renew unless cancelled prior"
- Apple upgrade: "Apple refunds the unused portion of your Pro fee and charges you for a full year of Patron."
- Apple downgrade: "There is no refund issued; Apple changes your subscription from Patron to Pro *the next time your subscription renews*."
- Google: "Google pro-rates the upgrade fee based on the time remaining on your subscription."
- General: "tier changes are pro-rated according to the time remaining in the current period"

**Refunds, with the limits of Letterboxd's own authority named** `[documented]`

> "we will refund your Paddle (web) or Google payment during the first 30 days of your subscription"
> "we are unable to issue refunds for Apple payments ourselves"
> "This offer is limited to **one refund per account**."

Telling the user which payment routes you *cannot* refund, and why, is the honest version of a refund policy. Most products write one policy and let the Apple case fail silently.

**Other pricing disclosures** `[documented]`: "All subscriptions are charged annually; there is no monthly option." · "Our legacy non-renewing PayPal subscriptions have been phased out." · "don't forget to turn off auto-renewal first!" (before gifting/transferring) · "including credit cards, PayPal and wire transfers" · "the payment authority for the subscription remains with you" vs "transfers the payment authority to the new account" · "Upgrading anywhere covers you for all use of our service, so there is no need to subscribe more than once!"

That last one is a **cross-platform double-charge warning**, phrased as a reassurance. It has its own FAQ question too (`Do I need to subscribe in the app and on the web?`).

**Data provenance, credited on every page** `[observed]`: "Film data from TMDB" in the global footer, plus a dedicated `/about/film-data/` page, plus five FAQ questions about TMDB behaviour (`Where does Letterboxd get its film data from?`, `Why does a film on TMDB have a different poster?`, `I see a film entry on TMDB, why isn't it on Letterboxd?`…). Letterboxd pushes data complaints upstream and documents the upstream.

**Privacy-visibility disclosure, stated bluntly in onboarding** `[observed]`

> "Note: your profile (and any other content you publish, with the exception of private lists) is visible to others, and to search engines."

On `/welcome/`, in step 4, as a `Note:`. **"and to search engines"** is the clause that matters and it is present. A social product telling a new member, during onboarding, that their reviews will be indexed by Google is doing the disclosure at the right moment rather than in a privacy policy.

The FAQ repeats it as a question (`Are my profile, reviews and lists publicly visible?`) and adds the blocking caveat: "Blocking a member does *not* hide your content from them".

**Data portability** `[documented]`: `Can I get a copy of my account data?` — an export "bundle", with the 30-day deleted-content retention inside it, and a `deleted` folder. And import is explicitly free: "Importing is free for all members."

**Rating-manipulation policy, published** `[documented]`

`What does Letterboxd do about campaigns designed to manipulate a film's rating up or down?` — answered with mechanism, not just assurance:

- "We use a weighted calculation to compute the average rating for each film, rather than using the true mean value"
- "Only one rating is considered per member (this is the most recent rating cast by the member for the film)."
- "a film with only a handful of five-star ratings has its average weighted down"
- "Our weighted-average calculations are formulated to reduce the effects of unusual rating patterns"
- "accurately represent the global consensus for each film"

Publishing the *direction* of the weighting ("weighted down" for low-volume) and the dedup rule ("only one rating per member… the most recent") is meaningful transparency about an algorithm users argue about. It stops short of publishing the formula, which is the correct stopping point.

**Brand and IP** `[documented]`: `Can I use your logo on my site, video or elsewhere?` with dedicated `/about/brand/` and `/about/video-store-brand/` pages, plus `Embed our ratings` as a first-class About item with its own page. Letterboxd documents how to use its marks rather than only prohibiting misuse.

## T11 Help-centre architecture

**There is no help centre.** There is one page: `/about/faq/`, titled `Frequent questions`, carrying **115 questions across 17 sections** on a single scrolling document with anchor links.

This is an architectural choice with real trade-offs, and both show.

**In favour:** everything is Ctrl-F-able; there is no category-guessing step; related answers sit adjacent (the six "poster and backdrop" questions form a coherent run); and cross-references work as on-page anchors.

**Against:** the page is enormous; two questions are duplicates across sections (`You removed a film I reviewed. Is my review lost?` in *Reviews and tags* vs `You removed a film. Can I get my review back?` in *Data and privacy*); one question (`What advanced search options are supported?`) carries a twelve-row table and a `### Tips and tricks` sub-section, making it wildly heavier than its 114 siblings; and there is no search, no "was this helpful", and no contact escalation on the page itself.

**Question grammar — six shapes** `[observed]`

| Shape | Example |
|---|---|
| `How do I …?` | `How do I close my account?` · `How do I pin content to my profile?` |
| `Can I …?` | `Can I block another member?` · `Can I review a trailer?` · `Can I use unicode tags?` |
| `What's the difference between X and Y?` | `What's the difference between liking and rating a film?` |
| `Why …?` | `Why is my number of watched films or diary entries incorrect?` |
| `I <did/experienced X>. <Follow-up question>` | `I've been marking films watched instead of logging them to my Diary. How can I fix this?` · `I deleted a review (or list). Can I retrieve it?` |
| `You <did X>. <Follow-up>` | `You removed a film I reviewed. Is my review lost?` |

**The `You <did X>` shape is the standout.** Two questions address Letterboxd in the second person as the agent of the user's loss: `You removed a film. Can I get my review back?` and `You removed a film I reviewed. Is my review lost?`. Where Wise writes `I sent money to the wrong person` (user as culprit), Letterboxd writes `You removed a film` (**company as culprit**), in the user's accusatory voice, as the question title. That is a harder thing to publish and it is the right call: the film removal genuinely was Letterboxd's action.

Compare the two adjacent shapes and the pattern becomes a rule: **first person for user error, second person for company error, and the question is always phrased the way the aggrieved party would phrase it.**

Two more in that vein: `Letterboxd is missing a vital feature! Who should I tell?` (exclamation mark included, user's frustration rendered verbatim) and `Someone else has access to my account. Have you been hacked?` (the user's actual suspicion, asked directly of the company).

**Answer structure defect — web and app variants are emitted simultaneously** `[observed]`

Roughly fourteen answers render both their web and app text at once, producing visible run-together strings: "…a Pro or Patron memberPro or Patron member, you can pin…" and "…and ProPro subscribers…". One answer (`Can I import films, ratings or lists from other services?`) says "there are **three** ways to import" and then lists **four** items, because step 1's web and app variants both emitted. This is a CMS/rendering defect, not authored copy, but it ships.

**Anchor-ID defects** `[observed]`: `#2fah` for the two-factor question (stray trailing `h`); `##deleted-content` with a doubled hash; `#url-filters` for a question about finding logged-but-unrated films; `#most-watched` for a question about a missing actor. Anchors do not track their headings, so deep links are fragile.

**Stale internal URL** `[observed]`: two different paths are cited for one guide — `/about/importing/` in one answer, `/about/importing-data/` in the sidebar and three other answers.

## T12 FAQs

The FAQ *is* the help system, so the full inventory is in T11. What follows is the structural analysis.

**Placement.** A standalone page at `/about/faq/`, first item in the About sidebar, titled `Frequent questions` (not "FAQ", not "Frequently asked questions"). Reachable from the footer only via `About` — the footer's own `Help` link goes elsewhere. Recorded as a routing defect.

**Ordering logic.** The 17 sections run roughly: identity (`About Letterboxd`, `Membership`) → core behaviour (`General use`) → self (`Profile and settings`) → social (`Following and blocking`) → creation (`Reviews and tags`, `Lists and ownership`) → customisation (`Posters and backdrops`) → discovery (`Advanced search`) → comms (`Notifications and newsletters`) → money (`Pro and Patron subscriptions`) → rights (`Data and privacy`) → data plumbing (`Importing data`, `Film data`, `Average ratings`) → platforms (`Apps and API`) → residue (`Miscellaneous`).

**Money is section 11 of 17.** On a subscription product, the pricing questions sit two-thirds down, after eight sections of how-to. The FAQ is written for existing members, not prospects — prospects are served by `/pro/` and `/about/pro/`.

**Section 2 (`Membership`) is where the two most revealing questions live** `[observed]`

- `Does it cost to use this service?`
- `Will I be paid for my reviews?`

The second one is the interesting one. Letterboxd pre-empts a creator-economy expectation — *do I get paid for the writing I do here* — and answers it in the membership section, immediately after the cost question. Placing "will you pay me" next to "will you charge me" frames the exchange as symmetrical and closes the question early. A product built on unpaid user writing, in 2026, has to answer this, and Letterboxd answers it in position 6 of 115 rather than burying it.

**The three "difference" questions clustered in `General use`** (Q11, Q14, and Q53's sibling) are the FAQ acting as **a glossary for a model the UI does not explain**. Their existence is the cost of the icon-only, orthogonal-flag design.

**`Average ratings` as a three-question top-level section** — `How is the average rating calculated for a film?`, `What does Letterboxd do about campaigns designed to manipulate a film's rating up or down?`, `Can I display or embed Letterboxd ratings on my site or app?` — treats the rating number as a product in its own right, with an algorithm, an integrity policy, and a licensing answer.

**`Miscellaneous` carries the personality** `[observed]`: `Why is the logo on your website bleeding?` (a seasonal Hallowe'en easter egg, documented in the FAQ) and `Why doesn't Letterboxd support old browsers?` sit beside `Where should I report a security vulnerability?`. A joke question and a security question in one section.

## T13 Terminology & glossary — PRIORITY

There is **no glossary page**. The vocabulary is defined in situ, mostly inside FAQ answers and modal rule-lines.

| Term | Letterboxd's usage | The alternative it rejected |
|---|---|---|
| `film` | Used exclusively and without exception, including in US-facing copy | **"movie"** — never appears as the product noun |
| `Diary` | The dated log. Capitalised as a proper noun. "a record of when you saw each film" | "history", "activity log", "timeline" |
| `to log` | The verb for creating a dated entry. `+ Log` is the button. | "check in", "add", "mark" |
| `Watchlist` | One word, no space. "films you'd like to see" | "wishlist", "saved", "queue", "to-watch" |
| `watched` | The binary seen-flag, set by the `'eye'` | "seen", "viewed", "completed" |
| `to like` / `'heart'` | Affective flag, independent of rating | "favourite" (which is a *different*, four-slot feature) |
| `favorites` | Exactly **four** slots on your profile — "the first of your four favorites", "members with those films in their four favorites" | "top films", "pinned" |
| `Rewatch` | A Boolean flag on a diary entry | "second viewing", "again" |
| `back-fill` | In scare quotes — retro-adding films seen before joining | "backlog", "import history" |
| `own` / `owned` | Ownership, implemented as a **tag convention** on a list | a first-class "collection" field |
| `tags` | Free-form, non-exclusive, with a nested syntax (`with:mom`) | "labels", "keywords", "shelves" |
| `lists` | Curated collections, optionally `ranked` | "collections", "boards" |
| `ranked` | A property of a list, with automatic renumbering | "ordered", "sorted" |
| `Pro` / `Patron` / `HQ` | Three paid tiers. `Patron` = "the pinnacle of support" | "Plus/Premium", "Silver/Gold" |
| `Close Friends` | A curated subset for privacy scoping — "selected by you" | "inner circle", "mutuals" |
| `member` | The person. Used throughout, including in third person ("the member's friends") | "user" — which appears only in the FAQ phrase "other Medium users"-style constructions, rarely |
| `cast and crew` | The people database | "credits", "filmography" |
| `Themes` and `Nanogenres` | Patron-tier stats dimensions | "moods", "micro-genres" |
| `boxd.it` | The short-link domain, also a search trigger (`boxd`) | — |
| `Carousel` / `Carousel mode` | A poster-browsing view ("a 'coverflow'-style depiction of three posters") | "gallery" |
| `Kicker` | n/a — that's Medium | — |
| `HQ accounts` | Organisational accounts, "available upon request" | "business", "brand", "team" |
| `Video Store` | "a curated digital video-rental service" with "regular drops of unreleased and/or hard-to-find titles" | "store", "rentals" |
| `fans` | The team describes itself as fans — "Made by fans in Aotearoa New Zealand" | "the team", "us" |

**`film`, never `movie`, is the single most consistent lexical decision in this file.** Across seven pages, a 115-question FAQ, a twelve-column import schema, and every CTA, the noun is `film`. The product is `Your life in film`. The data is `Film data`. The tab is `Films`. The URL is `/film/`. For a US-market-heavy product with US spelling elsewhere (`favorite`, `personalized`, `customize`, `analyze`), choosing the British/critical register for the *core noun* is a deliberate signal about who the product is for. It does audience-selection work that no marketing copy could.

**The rating scale is nearly undocumented.** `half-star` and `five-star` appear only inside the anti-manipulation answer. Ratings are "cast" (a voting verb). The 0.5–5 range with 0.5 increments is stated in exactly **one** place on the public site — the `Rating` column definition in the CSV import schema. A reader wanting to know what the stars mean has to read the import documentation. There are no descriptive rating labels at all: no "did not like it", no "masterpiece", no tooltip vocabulary. **Letterboxd deliberately leaves the stars unglossed**, which is a defensible critical-community choice (the number means whatever the member means) but is a real gap versus Goodreads' labelled scale.

**`fan` is not a state.** It appears only as a search alias for `favorite` (`favorite` / `fav` / `fave` / `favourite` / `fan`). Note that `favourite` — the British spelling the product otherwise rejects — is retained as a search alias. Spelling tolerance in search, spelling discipline in UI.

**Menu vocabulary is a mess** `[observed]`: one container is called, across different answers, `Actions menu`, `'More Options' menu`, `actions panel`, `actions menu`, `action sheet`, `ellipsis menu`, `fly-out menu`, and `'kebab' menu (three vertical dots)`. Eight names. Similarly `Filters menu` / `Filters screen` / `filters page`, and `page` / `screen` / `section` / `tab` / `view` used interchangeably for the same objects. Recorded as the largest terminology defect.

**`watched list` is a one-off ghost term** `[observed]`: the FAQ question `Can I remove a film from my watched list?` uses a noun phrase that appears nowhere else in the product (elsewhere it is always `watched films`) and that collides dangerously with `watchlist`. High-value fix candidate — it is the heading a confused user lands on.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the member; first-person plural for the company, and "we" is warm and present: "We're your home for…", "we compute detailed stats", "We add all watched titles…", "We hope you find them useful", "Big kisses to all subscribers—past, present and future!", "Plus the undying gratitude of everyone at Letterboxd HQ!"

**Register.** Conversational, film-literate, slightly clubby. Contractions throughout. Em-dashes used as asides. Ellipses used as invitations (`Add to your films…`, `Upgrade to Pro today…`, `Try logging a film now…`, `Here's what you'll find in our main sections…`) — the trailing ellipsis is a house tic, appearing in modal titles, headings and CTAs alike.

**In-jokes as headline copy.** Film quotations used as heroes (`Take your first step into a larger world…`, the `/pro/` Spaceballs-adjacent line), `"It's C-S-Veasy!"` attributed to a podcast host inside the **CSV import documentation**, `the 'Stan Lee Rule'` invented to explain cameo-role exclusion from stats, `Hallowe'en` spelled archaically in the bleeding-logo answer. The tone is *for insiders*, and Letterboxd is willing to cost itself legibility for it.

**But tone does flatten at money and at loss.** `/pro/`'s joke headline sits above plain tier lists and a flat tax footnote. The account-deactivation page is entirely sober, with the only italic in the document on the irreversibility line: "*Once your account is permanently deleted, it cannot be recovered by you or by Letterboxd support.*" The refund answers are procedural. Same gradient as Wise, achieved differently.

**Direct address to a named third party.** "The complete list of 500 is maintained by the tireless Dave Vis. How many have you seen?" — crediting a community member by name in product copy, then closing with a challenge question. And "The helper scripts and web apps listed below are created and maintained by third parties. We hope you find them useful, but please contact the individual authors for support." — Letterboxd links **thirty-plus** third-party migration tools from its own docs and disclaims support in one sentence. Generous and correctly bounded.

**Accessibility content** `[observed]` — and this is the weakest area on the property.

**There is no accessibility statement.** No footer link, no About-sidebar item, no FAQ question. Searching 115 questions and seven pages turns up **zero** mentions of screen readers, alt text, keyboard navigation, contrast, reduced motion, text sizing, or WCAG. `[absent]`

Worse, the documented interaction model leans hard on affordances that exclude:

- **Colour-only state encoding, documented as the mechanism.** The poster hover states are `White:` you haven't watched · `Green:` you have watched · `Blue:` in your watchlist. Three collection states distinguished by hue alone, with no textual equivalent offered anywhere. Plus "show with a blue outline … as opposed to the regular green outline". The FAQ has a question titled `What do the poster hover colors on your website mean?` — the *existence* of that question is the accessibility finding: the state is unreadable without a legend, and the legend is in the FAQ.
- **Hover-dependent disclosure.** The outline states require a pointer ("with a non-touch-based device", "when your pointer is placed over the poster"). Tag editing requires hover: "Place your pointer over any tag to reveal the Edit and Delete icons." Both are core actions with no documented keyboard or touch route.
- **Icon-only controls with no accessible names given.** `'eye'`, `'heart'`, `clock`, `flag`, `bell`, `kebab`, `drag handle`. The FAQ teaches them by glyph description, which is exactly what a sighted mouse user needs and exactly nothing for anyone else.
- **Filter state signalled visually only**: "a slash through the icon indicates that one or more filters are active".
- **Drag-only reordering, with the alternative framed as a convenience rather than an accommodation.** The question is `Is there an easy way to move items in a long list (aside from dragging them)?` and the answer offers "move it to a specific position in the list (by entering an integer value)". The keyboard-accessible path exists and is good — it is just positioned as a power-user shortcut, not as the accessible route.
- **QR-code sharing documented with no non-visual alternative** beyond the short link.
- **Alt text in the fetched markup is thin**: `Poster overlays`, `Member's films`, `Member's menu`, `Diary Entry screen`, `Activity stream`, `List`, `Stats`, `Film actions`, `Tags`, `Numbered list`, `Upgrade to Pro` — these are the onboarding instructional screenshots, and their alt text names the subject without describing what the screenshot demonstrates. `Member's films` appears as alt for **two different** screenshots. The Top-500 poster rail renders `![Harakiri]`, `![12 Angry Men]` etc. — film titles as alt, which is defensible since the link text is absent.
- The `/pro/` page image alt is `Still from Project Hail Mary (2026).` — descriptive, attributed, punctuated. The one good alt string found.
- **No `Skip to content` link** in the fetched markup on any page.
- `Mobile site` in the footer renders as `href="#"` — a dead control in the global footer.

**Negative findings, recorded honestly**

- `Paid subscriptions` appears **twice** in the About sidebar, identical label, two URLs
- Footer `Help` points to `/welcome/` (a product tour), not to the 115-question FAQ
- Four labels for account creation: `register`, `create an account`, `Create an account`, `Sign up`
- Four casings for save: `Save`, `Save changes`, `Save Changes`, `Save for item`
- The backdrop modal's reset button reads `Reset poster`
- Picker labels (`Anyone (public)`) and tooltips (`Visible to anyone (with link)`) use different vocabularies for the same three states, and only the tooltip discloses `(with link)`
- `watched list` used once, colliding with `watchlist`
- Eight names for the actions/ellipsis menu; five for page/screen/section/tab/view
- `hide-unreleaed` — a misspelled filter query value shipped in a documented URL
- "cutomizations" for *customizations*; "the number **or** ratings received" for *of*
- IMDb linked as `imdb.org` twice
- One answer has a missing email address: "email details … to  and request a manual import"
- Visible copy instructs the reader to allow-list `[email protected]`
- Web and app answer variants render simultaneously in ~14 answers, producing "ProPro" and a three-vs-four count mismatch
- `Does the site have protected/private accounts?` never answers the question
- `Where should I report a security vulnerability?` gives no address
- Deleted-content retention stated as both "for 30 days" and "no less than 30 days"
- Duplicate questions across two sections about film removal
- `Reset Poster` "does not remove cutomizations made inside individual lists" — the primary undo does not undo everything, conceded in the same answer
- Anchor IDs do not track their headings (`#2fah`, `##deleted-content`, `#url-filters`)
- **No accessibility statement; three collection states encoded by colour alone**

---

## Transferable patterns

1. **State the partial-privacy leak inside the privacy picker.** "Your diary date (if set) and watched status for this film remain publicly visible." Letterboxd tells you which component of a "private" action is still public, in the control, before you commit. Transfers directly to any privacy toggle whose scope is narrower than the user will assume — transaction privacy, profile visibility, hidden-order flows.

2. **Gloss the audience label in the label.** `Anyone (public)` / `Close Friends (selected by you)` / `You (private)`. The parenthesis carries the definition so the picker needs no help text. Cheap, and it eliminates the most common privacy misunderstanding.

3. **Disclose the second-order cost of a privacy choice.** "Ratings on *Close Friends* and *You* entries don't contribute to stats." Choosing privacy silently degrades a feature the user values, and Letterboxd says so at the point of choice. Any product where a privacy setting has an analytics, personalisation, or eligibility consequence should copy this sentence shape.

4. **Use social proof to license incompleteness.** "Most members keep an up-to-date Diary only from the time they join the platform." The new user's fear — my record will always be partial — answered by telling them everyone's is. Reusable wherever a product asks users to back-fill history: transaction categorisation, health logging, asset inventories.

5. **Second person for company error, first person for user error.** `You removed a film. Can I get my review back?` beside `I deleted a review (or list). Can I retrieve it?`. Name the actual agent in the question title, even when it is you. Harder than Wise's confession titles and more honest.

6. **Name the specific thing sign-in unlocks.** `Sign in to add films` / `Sign in to make lists` / `Sign in to purchase` instead of one generic `Sign in`. The user learns the value of the account at the moment of the ask.

7. **Publish a per-type notification channel matrix, including the restraints.** `New likes for your reviews and lists (push only)` tells the reader you chose not to email them. Predictability before opt-in.

8. **Document which payment routes you cannot refund, and why.** "we are unable to issue refunds for Apple payments ourselves" + the per-platform proration rules. Where a third-party store owns the billing relationship, say so rather than writing one policy that silently fails for a third of users.

9. **Publish the direction of your ranking weighting without publishing the formula.** "a film with only a handful of five-star ratings has its average weighted down" plus "only one rating is considered per member". Enough for a user to trust the number; not enough to game it.

10. **Give the user a control that speeds up their own deletion.** Letterboxd emails a reactivation link immediately *and* a second link that shortens the deletion window from 90 days to 30. Treating "I want this gone faster" as a legitimate need, served by email, after the fact.

11. **Enumerate what the free tier includes rather than what it lacks.** "All accounts offer unlimited films, diary entries, reviews, ratings and lists." Five nouns, one adjective, no asterisk. Then paywall the analytics.

12. **Pick one word for your core noun and never deviate.** `film`, never `movie`, across every surface. The noun does the audience-selection work that positioning copy usually fails at.

## Caveats & gaps

- **`letterboxd.com/` homepage was not retrieved** — the fetch aborted. The signed-out homepage would carry the primary hero, popular-content modules, and possibly a different CTA set. T2 leans on `/welcome/` and `/pro/` instead.
- **`/year-in-review/` exceeded retrieval limits** and was not read. It is a named global-footer surface and almost certainly carries distinctive annual-summary microcopy.
- **`/legal/terms-of-use/` was retrieved but only its metadata and opening clauses were read** (the body exceeded limits). Its content-licensing and account-termination clauses are unharvested; T10's legal coverage is therefore from `/about/` pages, not from Terms.
- **All in-account states are `[documented]`, not observed.** The logging modal, privacy picker, and poster modals *do* render in signed-out page chrome (so those strings are genuinely observed), but the diary, watchlist, filters, stats, Activity feed, and every empty state are behind auth. An authenticated pass is required for T8 entirely and for most of T7.
- **The star-rating UI was never seen.** No tooltip, alt, or hover vocabulary for the 0.5–5 scale was found on any public page. The scale itself is documented only in the CSV schema. If descriptive rating labels exist in product, they are not public.
- **The `Rewatch` flag's in-product label is unknown** — only the CSV column name was observed.
- **No member content was viewed or quoted**, per brief. Public profiles, reviews, and lists were not opened, so review-composer microcopy, spoiler-tag UI, and comment-moderation controls are unharvested.
- **Unharvested About pages:** `/about/`, `/about/pro-apps/`, `/about/annual-sale/`, `/about/hq/`, `/about/film-data/`, `/about/embed-our-ratings/`, `/about/migrating-from-imdb/`, `/about/brand/`, `/about/security-notices/`, `/about/crew/`, `/about/podcast-transcripts/`. Also `/apps/`, `/gift-guide/`, `/video-store/`, `/journal/`, `/api-beta/`, `/contact/`.
- **No community policy page was reached.** The FAQ has `Do you have a community policy?` and `Are there rules concerning what I can say?`, so one exists; it was not opened. T10's trust-and-safety coverage is thin as a result.
- **The FAQ's web/app dual-render defect** means some strings in this file may be the app variant, the web variant, or a concatenation. Where a string looked run-together it has been flagged rather than quoted.

## Sources

1. https://letterboxd.com/pro/
2. https://letterboxd.com/welcome/
3. https://letterboxd.com/about/faq/
4. https://letterboxd.com/about/pro/
5. https://letterboxd.com/about/importing-data/
6. https://letterboxd.com/about/account-deactivation/
7. https://letterboxd.com/legal/terms-of-use/
