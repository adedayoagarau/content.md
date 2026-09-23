# 153. Goodreads

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Book cataloguing and review community / social reading |
| Primary URL | https://www.goodreads.com/ |
| Corpus rank | 153 |
| Benchmark strength (source list) | Collection and social-reading states |
| Locale / market observed | en-US |
| Platform observed | Web (desktop); help articles document iOS app, Android app, mobile web, desktop, and **Kindle e-reader** as five separate platforms |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a — no financial or health regulator. Amazon subsidiary ("An Amazon Company"); CCPA/interest-based-ads notices in footer (`Interest Based Ads`, `Ad Preferences`, `Your Ads Privacy Choices`) |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | Partial — `help.goodreads.com` is a Salesforce single-page app that returns "CSS Error" to plain HTTP fetch; articles were recovered via a rendering browser. The public book page render truncated mid-list, so the shelf dropdown, star tooltips, genre statistics and page footer were not captured from it. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (signed out) | https://www.goodreads.com/ | Hero, three value props, genre grid, quotes rail, Choice Awards, lists rail |
| About Goodreads | https://www.goodreads.com/about/us | Mission, "A Few Things You Can Do", founder letter |
| Book page (public) | https://www.goodreads.com/book/show/2429135.The_Girl_With_the_Dragon_Tattoo | Chrome only; **no member content read or quoted** |
| Help centre home | https://help.goodreads.com/s/ | Returns a JS shell to fetch; rendered via browser |
| Help topic catalog | https://help.goodreads.com/s/topiccatalog | The full category tree — 6 groups, 24 topics |
| Topic: Managing Books | https://help.goodreads.com/s/topic/0TO1H000000gjGKWAY/managing-books | 10+ articles, the shelf vocabulary source |
| Topic: Reading Challenge | https://help.goodreads.com/s/topic/0TO1H000000cowlWAA/reading-challenge | 5 articles |
| Article: Add or remove books from your shelves | https://help.goodreads.com/s/article/000001073 | **The four default shelves, exclusivity rules, shelf/tag distinction** |
| Article: Update your reading progress | https://help.goodreads.com/s/article/000001090 | Progress-update flow, page/percent toggle |
| Article: Rate and review published books | https://help.goodreads.com/s/article/000001076 | Rating and review flows, Kindle "Before you Go" |
| Article: Track owned books | https://help.goodreads.com/s/article/000001436 | Ownership as a checkbox, plus a documented workaround |
| Article: About Reading Challenge | https://help.goodreads.com/s/article/What-are-Reading-Challenges | Goals, achievements, Kindle sync |
| Article: Collect Reading Challenge achievements | https://help.goodreads.com/s/article/000001778 | Achievement eligibility, "bookmarks" |

---

## T1 Navigation & IA labels

**Global nav — five items, two with dropdowns** `[observed]`

`Home` · `My Books` · `Browse ▾` · `Community ▾` · `Sign In` · `Join`

`My Books` as the second nav item, ahead of any discovery surface, is the structural statement: Goodreads is a personal catalogue first. Note the possessive — not "Library", not "Shelves", not "Books". And note the `▾` chevrons rendered as literal text in the markup.

**`Browse ▾` dropdown** `[observed]`

`Recommendations` · `Choice Awards` · `Genres` · `Giveaways` · `New Releases` · `Lists` · `Explore` · `News & Interviews`

Then, inside the same dropdown, a second-level heading `Genres` followed by 29 genre links and `More Genres`. A dropdown containing a heading containing a 29-item list is heavy, and `Explore` links to `/book?ref=nav_brws_explore` — the **same destination as the parent `Browse ▾` link itself**. A child item that duplicates its own parent.

**`Community ▾` dropdown** `[observed]`

`Groups` · `Quotes` · `Ask the Author` · `People`

`Ask the Author` is a named feature in the nav — an author-Q&A surface promoted to global navigation. `Quotes` as a community surface (rather than a content type) is unusual and is reflected on the homepage, which devotes a large rail to it.

**Signed-in account menu, exposed in signed-out markup** `[observed]`

`View profile` · `Profile` · `Friends` · `Groups` · `Discussions` · `Comments` · `Reading Challenge` · `Kindle Notes & Highlights` · `Quotes` · `Favorite genres` · `Friends' recommendations` · `Account settings` · `Help` · `Sign out`

This is the real personal IA, and two items are notable. `Reading Challenge` sits as a peer to `Profile` and `Friends` — a gamification feature at the top level of the account menu. `Kindle Notes & Highlights` names the Amazon integration in the user's own menu, making the corporate relationship a navigational fact.

**Footer — three groupings** `[observed]`

| Group | Items |
|---|---|
| `Company` | `About us` · `Careers` · `Terms` · `Privacy` · `Interest Based Ads` · `Ad Preferences` · `Your Ads Privacy Choices` · `Help` |
| `Work with us` | `Authors` · `Advertise` · `Authors & ads blog` |
| `Connect` | Social icons, app badges |

**Three of the eight `Company` items are advertising-privacy controls** — `Interest Based Ads`, `Ad Preferences`, `Your Ads Privacy Choices`. The footer's largest group is dominated by ad-consent plumbing, which tells you what the business is. `Help` is the *last* item in `Company`, after the ad controls.

Below: `Mobile version` · `© 2026 Goodreads LLC` · `An Amazon Company` (as an image, with that alt text).

**About-page sidebar** `[observed]`: `Jobs` · `Blog` · `Authors & Advertisers Blog` · `Press` · `Contact` · `Advertisers` · `Author Program` · `Librarian Manual` · `Help`

`Librarian Manual` in the About sidebar is a real signal — Goodreads exposes its volunteer-metadata-editor documentation as a public, first-class page.

**Help centre topic tree — 6 groups, 24 topics** `[observed]`

| Group | Topics |
|---|---|
| *(ungrouped/account)* | `My Account` · `Managing Books` · `Notifications` · `Profile Settings` · `Reading Challenge` · `Your Year In Books` |
| `Friends, Community and Social` | `Friends` · `Groups` · `Recommendations` · `Social Sharing` · `Updates Feed` |
| `Goodreads Help` | *(group with no visible children in the render)* |
| `Authors and Book Marketing` | `Advertising` · `Using Ask The Author` · `Blogs` · `Book Edits` · `Giveaways` · `Goodreads Author Program` · `Goodreads Authors: How To Edit Your Books` |
| `Mobile Apps and Kindle` | `Android` · `Goodreads On Kindle` · `iOS` · `Mobile Web` |
| `Librarian Manual` | `About Librarians` · `Author Profile Edits` · `Book Page Edits` |
| *(ungrouped)* | `Privacy and Security` |

Every topic name is **Title Case With Every Word Capitalised**, including function words: `Your Year In Books`, `Using Ask The Author`, `Goodreads Authors: How To Edit Your Books`, `Goodreads On Kindle`. This is a consistent house style at topic level and it is **abandoned entirely at article level**, where titles are sentence case (`Add or remove books from your shelves`, `Update your reading progress`). Two casing regimes, one hierarchy, one click apart.

`Mobile Apps and Kindle` as a top-level group is the most revealing IA decision: **platform** is a first-class organising axis alongside feature, because the same task has five different procedures.

**Help centre furniture** `[observed]`: `All Topics` · `How can we help?` · `Search` · `Ask a question` · `Contact us` · `Articles` / `Questions & Answers` / `More` (tabs on each topic) · `Load more` · `Trending Articles by Topic` · `Skip to Main Content` · `Ideas` · `Back to Goodreads.com`

`Ask a question` beside `Contact us` is a two-channel split: a public community question versus a private support ticket. Both offered on every help page, adjacent, with no explanation of which to pick. Recorded as a routing gap.

## T2 Value proposition & headline patterns

**Hero — a three-word imperative fragment** `[observed]`

> `Discover & read more`

Then three signup buttons, then the terms line. That is the entire hero. No subhead, no claim, no numbers. Compare the meta description, which does the work the hero doesn't: "Find and read more books you'll love, and keep track of the books you want to read. Be part of the world's largest community of book lovers on Goodreads."

The `<title>` carries a third, better proposition: `Goodreads | Meet your next favorite book` — which personifies the book ("meet") and is the strongest string on the property. It appears **only** in the title tag and the Twitter card, never on the page.

**Three page-mid section headers, all questions or question-shaped** `[observed]`

1. `Deciding what to read next?`
2. `What are your friends reading?`
3. `What will *you* discover?` — with italic emphasis on `you`

Three consecutive interrogative headings. The first is a participial fragment addressed at a moment of indecision; the second outsources the value prop to the user's social graph; the third puts emphasis on the pronoun. Goodreads' marketing voice asks rather than claims.

**And each answer leads with reassurance, not features** `[observed]`

> "You're in the right place. Tell us what titles or genres you've enjoyed in the past, and we'll give you surprisingly insightful recommendations."

`You're in the right place.` as the first four words after a question heading is a neat arrival-anxiety move. Then the ask (`Tell us what…`), then the reciprocal promise (`and we'll give you…`). **Same "tell us / we'll give you" contract as Letterboxd's `Tell us what you've seen`** — both cataloguing products frame data entry as conversation.

`surprisingly insightful` is hedged self-praise; the FAQ-free homepage never substantiates it. Compare the About page, which does: "Our recommendation engine analyzes 20 billion data points to give suggestions tailored to your literary tastes."

**The friends section leads with an embarrassment-normalising parenthesis** `[observed]`

> "Chances are your friends are discussing their favorite (and least favorite) books on Goodreads."

`(and least favorite)` licenses negativity — it tells a prospective member that dunking on books is in-scope. For a review platform, that is a deliberate permission.

**The recommendation module is a labelled inference, shown live** `[observed]`

> `Because ♥Meagan♥ liked…` → [four covers] → `She discovered:` → `Mystery, Thriller` → [one cover]

The signed-out homepage demonstrates the recommendation *mechanism* — input books, inferred genre, output book — with the causal connector spelled out in two labels (`Because … liked…` / `She discovered:`) and an arrow image between them. Showing the reasoning chain rather than just the result is good explainable-recommendation copy. (The member name is a rendered example on Goodreads' own marketing surface; no member-authored content was read.)

**About page opens with a claim split across two lines** `[observed]`

> `The right book in the right hands at the right time`
> `can change the world.`

A tricolon (`right book` / `right hands` / `right time`) broken mid-sentence across a carousel. Then the flat version: "Goodreads is the world's largest site for readers and book recommendations. Our mission is to help readers discover books they love and get more out of reading."

**`A Few Things You Can Do On Goodreads` — four bullets, and the collection states are bullet two** `[observed]`

- "See what books your friends are reading."
- "Track the books you're reading, have read, and want to read."
- "Check out your personalized book recommendations. …"
- "Find out if a book is a good fit for you from our community's reviews."

Bullet two is the three shelves stated as **verb phrases in three tenses** — present progressive (`you're reading`), present perfect (`have read`), and desiderative (`want to read`). That is the shelf model expressed grammatically before it is expressed as labels. See T6.

**Founder letter as About-page copy** `[observed]`: a first-person narrative from Otis Chandler, co-founder, opening "When I was in second grade, I discovered the Hardy Boys series." Personal, anecdotal, and it does the origin-of-the-metaphor work: "One afternoon while I was scanning a friend's bookshelf for ideas, it struck me…" — the bookshelf metaphor is traced to a literal bookshelf. Then "You can create 'bookshelves' to organize what you've read (or want to read)" — **`bookshelves` in scare quotes**, the only place the product's central metaphor is marked as a metaphor. Closes on an aphorism: "Knowledge is power, and power is best shared among readers."

Also credits the copywriter: "Elizabeth, my co-founder (and now my wife) wrote the site copy and I wrote the code." A product naming its content designer in its About page.

## T3 CTA inventory — PRIORITY

### Signup / auth

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Continue with Amazon` | Homepage hero, button 1 | Amazon first |
| `Continue with Apple` | Homepage hero, button 2 | |
| `Sign up with email` | Homepage hero, button 3 | Email demoted to third |
| `Sign In` | Nav | Title case |
| `Sign in` | Book page nav | **Sentence case, same action** |
| `Join` | Nav | |
| `Sign up` | Homepage banner | |
| `Create a free account` | Book page, `Friends & Following` module | **Links to `/user/sign_in`, not a registration URL** |
| `Sign In` | "Already a member?" line | |
| `Sign out` | Account menu | |

**Five labels for "make an account"**: `Join`, `Sign up`, `Sign up with email`, `Create a free account`, plus the `/user/sign_up` destination. And `Sign In` / `Sign in` in two casings on two pages. The `Create a free account` defect is the worst of these: the label promises registration and the href goes to sign-in, with an empty `return_url` so the reader also loses their place.

### Collection / shelf CTAs — the core of the product

| CTA (verbatim) | Where | Notes |
|---|---|---|
| `Want to Read` | Book page primary button; poster; every platform | **Title case.** The default shelf doubles as the primary CTA |
| the `down arrow` beside it | Book page | Opens the full shelf picker — icon only, no label |
| `Continue to tags` | Mobile web, desktop shelf flow | The route to custom shelves and tags |
| `Done` | Android, mobile web, desktop shelf flow | |
| the `arrow` | iOS shelf flow | iOS uses an arrow where Android uses `Done` |
| `Remove book from My Books` | **iOS** removal | |
| `Remove book from shelves` | **Android** removal | |
| `Remove from my shelf` → `Remove` | **Mobile web** removal | Two-step |
| `Remove from my books` | **Desktop** removal | Sentence case |
| `Add to Goodreads` | **Kindle e-reader** | A different verb entirely |
| `Goodreads Shelves` → `Move` / `Delete` | Kindle three-dot menu | |
| `Edit` | Desktop, in the `My Activity` header | |
| `Batch Edit` | Desktop, My Books tab | |
| `add books to this shelf` | Batch edit | **lowercase** |
| `remove books from this shelf` | Batch edit | **lowercase** |
| `Update Progress` | iOS, under `Reading` | Title case |
| `Update Your Reading Progress` | Android, under My Books | **Longer, and every word capitalised** |
| `Update progress` | Mobile web / desktop, under `Currently Reading` | **Sentence case** |
| `View all books` | Mobile web / desktop, if book not shown | |
| `Page#` / `Percent` | Progress-entry toggle | `Page#` with a literal hash |
| `More details` | Desktop edit pop-up | |
| `I own a copy of this book` | Checkbox, More details | First-person checkbox label |
| `Post` | Ownership save, and iOS review submit | **`Post` to save an ownership flag** |
| `Write a review` | iOS/Android/mobile/desktop | Sentence case |
| `Write a Review` | **Book page, live UI** | Title case — same action |
| `Post` | iOS/Android review submit | |
| `Save` | Mobile web/desktop review submit | **Different verb from `Post` for the same action** |
| `Shop this series` | Book page | The only commerce CTA in the render |
| `Follow` | Book page, author and reviewer blocks | Renders **twice consecutively** per entity |
| `Search review text` | Book page | |
| `Filters` | Book page | No state, no count, no paired "Clear" |
| `Jump to ratings and reviews` | Book page, skip-style link | Targets a heading reading `Ratings & Reviews` |
| `...more` | Book page | Used for **three** different expanders |
| `Like` / `Comment` | Book page, per review | |
| `Load more` | Help topic listings | |
| `Refresh` | Help centre JS-failure shim | See T7 |

### The finding

**"Add this to my list" is `Want to Read` — and removing it is called four different things on four platforms.**

`Remove book from My Books` (iOS) · `Remove book from shelves` (Android) · `Remove from my shelf` (mobile web) · `Remove from my books` (desktop)

Four labels, four casings, three different objects named (`My Books`, `shelves`, `my shelf`, `my books`), and `shelf` singular on mobile web where the book may be on several. Goodreads' own help article prints all four side by side, in one article, without acknowledging the divergence. This is the single clearest CTA defect in the file and it sits on the most consequential action in a cataloguing product — the one that destroys the user's review as a side effect (see T6).

**`Update Progress` / `Update Your Reading Progress` / `Update progress`** is the same problem on the second-most-consequential action: three labels, three casings, three platforms, one article.

**`Post` is used to save an ownership checkbox.** The Track-owned-books flow ends "Click **Post**. The book is now marked as owned." `Post` implies publication; the action is a private metadata flag. And `Post` is simultaneously the review-submit verb on iOS/Android while `Save` is the review-submit verb on web. The verb set is not allocated to meanings at all.

**`Add to Goodreads` on Kindle** is the one genuinely good divergence — on a device where Goodreads is a guest, the CTA names the destination rather than the shelf, and the article states the consequence: "The book is added to your Want to Read shelf."

## T4 Onboarding & getting-started

**Signup is three buttons and a consent line; there is no tour** `[observed]`

> `Continue with Amazon` · `Continue with Apple` · `Sign up with email`
> "By creating an account, you agree to the Goodreads Terms of Service and Privacy Policy."
> "Already a member? Sign In"

Consent is stated as an inference from the act (`By creating an account, you agree…`) rather than as a checkbox — a passive-consent pattern. No progressive disclosure, no step count, no "it takes 30 seconds".

**The onboarding narrative lives on the About page, as four capability bullets** `[observed]` — see T2. There is no `/welcome/`-equivalent tour, no "how it works" page, and no first-run walkthrough documented in help.

**The shelf model is taught in a help article, not in onboarding** `[documented]`

The article `Add or remove books from your shelves` carries a section headed `How shelves work` that does the conceptual teaching. Its opening line is the model in one sentence:

> "You can move a book between default shelves, custom shelves, and tags."

Three object types introduced, then defined by their exclusivity property (see T6). **This is the most important paragraph Goodreads publishes, and it is the fourth section of a procedural article, below five platform-specific step lists.** A new user hits the procedures first and the concept last.

**The article does offer inline routing to it** `[documented]`: "To understand the difference between shelves, visit How shelves work." Placed in the article intro, before the platform tabs — so the concept is one click away even if it is far down the page.

**Reading Challenge onboarding** `[documented]`: "Reading challenges help you track and celebrate your reading. You can set annual reading goals, join challenges, and collect achievements." Three verbs (`set` / `join` / `collect`), three objects (`goals` / `challenges` / `achievements`), one sentence. Followed immediately by a platform-availability list and a version nag: "For the best experience, make sure you update your app to the latest version."

**The Amazon link is pitched as an onboarding step with two named benefits** `[documented]`

> `Link your Amazon account for more benefits`
> "Track all of your reading, including print and Kindle books."
> "Automatically sync your reading challenge progress across Goodreads and Kindle."

`Track all of your reading` — with `all` doing the work — frames the integration as completeness rather than as a corporate tie-in.

## T5 Form & field labels

**Observed on public surfaces** `[observed]`

| Label / placeholder | Where |
|---|---|
| `Title / Author / ISBN` | Homepage search — as the `title` attribute on the magnifying-glass image, i.e. a **tooltip, not a visible placeholder** |
| `Search review text` | Book page |
| `Filters` | Book page |
| `How can we help?` | Help centre search heading |
| `Search` | Help centre |
| `Coupon` | n/a — that's Letterboxd |

The homepage search field's only guidance (`Title / Author / ISBN`) is attached to an image's `title` attribute. A sighted mouse user gets it on hover; nobody else does, and no visible placeholder or label was found in the render. Recorded as a defect.

**Documented in help articles** `[documented]`

- `I own a copy of this book` — a checkbox phrased in the **first person**, which is unusual and good: the checkbox states the user's assertion rather than the system's flag ("Owned")
- `Page#` / `Percent` — the progress-unit toggle. `Page#` with a literal `#` is a developer-ism surfaced as a control label
- "Enter your page number or percentage" — the input instruction
- "Add a comment if you want to share a status update." — an **optional** field whose label names its consequence (it becomes a public status update)
- `Shelf` — the batch-edit selector label
- `Bookshelves` — the My Books sidebar section
- `Batch Edit` — a tab
- `More details` — the expander that reveals ownership
- "Search for the book by title or author in the search bar. For a specific edition, search by ISBN or ASIN." (Kindle) — **`ASIN`**, an Amazon-internal identifier, exposed to end users as a search input type

**The progress-comment field is the most interesting one.** "Add a comment if you want to share a status update" tells the user, in the field's own instruction, that filling it in *publishes*. The privacy consequence is in the label rather than in a help link — the same technique Letterboxd uses in its logging modal, achieved with fewer words.

## T6 Collection & publication states — PRIORITY

Goodreads models the user's relationship to a book as **one exclusive shelf plus optional non-exclusive tags**. This is the opposite architecture to Letterboxd's orthogonal flags, and it produces a completely different vocabulary.

### The four default shelves

> "The default shelves are: **Want to Read, Currently Reading, Read, and Did Not Finish**."

| Shelf | Grammatical form | Tense/aspect |
|---|---|---|
| `Want to Read` | Verb phrase, desiderative | future intent |
| `Currently Reading` | Adverb + present participle | present progressive |
| `Read` | Bare past participle | completed |
| `Did Not Finish` | **Negated past-tense clause** | abandoned |

**All four are verb phrases, not nouns.** No product has a "To Read" *list* here; it has a shelf named with the sentence the reader would say. `Want to Read` is first person without the pronoun. `Currently Reading` carries an adverb that no shelf strictly needs — `Reading` would suffice — and the adverb is doing reassurance work: it marks the state as *now*, temporary, in-flight.

And the four are exactly the four tenses of the reading relationship: **want / am / did / didn't**.

### `Did Not Finish` is the headline finding

**Goodreads has promoted abandonment to a default shelf.** This is the most significant single fact in this file and the sharpest contrast in the cohort — **Letterboxd (152) has no DNF state at all**, across 115 FAQ questions and a twelve-column import schema.

Three things about the wording:

1. **It is negated, past tense, and first-person-implied**: `Did Not Finish`, not "Abandoned", not "DNF", not "Unfinished", not "Gave Up", not "Paused". The subject is the reader and the verb is theirs.
2. **It does not editorialise.** "Abandoned" assigns blame to the reader; "Unfinished" assigns incompleteness to the book; `Did Not Finish` is a flat report of fact with no evaluative load in either direction. For a state that carries genuine social embarrassment on a public reading profile, that neutrality is the whole design.
3. **It is spelled out, not initialised.** The reading community's own term is "DNF" — Goodreads uses the expanded form as the label, which is longer but comprehensible to a first-time user, and leaves "DNF" to the community as slang.

Goodreads' own help copy does **not** explain when to use it, whether it counts toward the Reading Challenge, whether a partially-read book keeps its progress, or how it interacts with rating and review. The shelf exists and is named; its semantics are undocumented. Recorded as a gap — the hard part (naming it) is done and the easy part (explaining it) is not.

### The exclusivity model, stated as three rules

> "**Default shelves are exclusive.** A book can only be on one default shelf at a time. You can't delete or rename default shelves."
> "**Custom shelves are exclusive.** A book can only be on one custom shelf at a time. If you change a custom shelf to non-exclusive, it becomes a tag."
> "**Tags are non-exclusive.** A book can have multiple tags at once. If you change a tag to exclusive, it becomes a shelf."

This is a genuinely well-written piece of conceptual documentation, and the reason is the **third sentence of rules 2 and 3**. Each rule states the transformation that happens when you flip the property: a custom shelf that becomes non-exclusive *is* a tag; a tag that becomes exclusive *is* a shelf. The two objects are revealed as **one object with a switch**, and the copy makes that switch the definition rather than hiding it behind two separate feature explanations.

Contrast Letterboxd, which has `lists` and `tags` as genuinely distinct objects and needs a separate FAQ question to distinguish them. Goodreads has one object, two names, and one sentence explaining the rename.

Note also the rule that defaults **cannot be renamed or deleted**. Goodreads is asserting that `Want to Read` / `Currently Reading` / `Read` / `Did Not Finish` are not user vocabulary — they are the product's ontology, locked. For a platform whose social feed, recommendations, and Reading Challenge all depend on shelf semantics, that is a correct and consequential decision, and it is stated in one clause.

### The state-move guarantee

> "When you move a book, its reading progress, read dates, and reviews move with it."

One sentence answering the three things a user fears losing. Naming the three carried objects — `reading progress`, `read dates`, `reviews` — is more reassuring than "your data is preserved". This belongs in the transferable list.

### The state-destroy warning

> "**Note:** Removing a book from your shelves also removes your review for that book."

Placed in the article **intro**, before the platform tabs, before any procedure. Then re-stated at the end of each of the five platform procedures: "The book and any associated review are removed." — four times, verbatim, once per platform.

**A destructive side effect stated once up front and then four more times at each point of action.** That is the right amount of repetition for this consequence: the user is deleting a shelf entry and silently losing a piece of writing.

### Progress as a state

`[documented]`

- Location: "Under **Reading**, find the book you're currently reading" (iOS) / "Under **Currently Reading**" (web) — **the section is named differently per platform**, `Reading` vs `Currently Reading`
- Units: page number **or** percentage, switchable via `Page#` / `Percent`
- Optional social layer: "Add a comment if you want to share a status update."
- Confirmation: "Your progress appears on the book page." — stated at the end of all three platform procedures, verbatim
- There is a known-broken case with its own article title: `Why am I unable to update my reading progress as a percentage`

Progress is therefore a **quantified, unit-switchable, optionally-public** sub-state of `Currently Reading`. It is the only numeric state in the model.

### Ownership — a checkbox, with its own documented workaround

`[documented]`

`I own a copy of this book`, under `More details`, saved with `Post`, viewable by adding "the owned books column to your My Books view".

Then the caveat, placed **above the procedure as a `Note:`**:

> "**Note:** Owned books won't appear in your export file. As an alternative, create a custom shelf called Owned to track your collection."

**Goodreads documents that its own ownership feature is not exportable, and recommends you use a different mechanism instead.** In the article about the feature. Before teaching you the feature. That is an unusual piece of honesty — it amounts to "this field exists but a shelf is better" — and it is exactly the kind of data-portability disclosure most products suppress. (It also converges with Letterboxd, which implements ownership as a tag convention rather than a field.)

### Rating as a state

`[documented]`

- Set by tapping/selecting stars: "Below the book cover, tap the number of stars you want to give."
- Governed by a named policy: "All ratings and reviews must follow our **Rating and Review Guidelines**."
- Separate flow for pre-publication: `Rate and review advance book copies`
- Kindle: "When you reach the last page of your book, the **Before you Go** page opens. Tap the number of stars you want to give."
- Kindle asymmetry, disclosed: "You can rate a book from your Kindle e-reader, but you cannot post a review to Goodreads from it."

**`Before you Go`** is the best-named surface in this file — a rating prompt at the last page of a book, named after the moment rather than the action. Not "Rate this book", not "You finished!" — `Before you Go`, addressed to a reader about to close a book. (Note the casing: `Before you Go`, with a lowercase `you` between two capitals. Almost certainly a typo for `Before You Go`, and it is how Goodreads' help article renders it.)

**Rating labels are absent from every public surface.** The historic Goodreads star vocabulary (`did not like it`, `it was ok`, `liked it`, `really liked it`, `it was amazing`) does **not** appear on the rendered book page, in any help article, or anywhere else harvested. The book page's rating widget renders as a bare `Loading...` placeholder to a static fetch. Marked `[absent]` — if the descriptive labels still ship, they are behind JS and were not captured. What *is* observed on the book page is a bare average (`4.18`) and a distribution with numeric row labels only: `5 stars` / `4 stars` / `3 stars` / `2 stars` / `1 star`, each with a count and a parenthesised percentage. Correct pluralisation (`1 star` vs `5 stars`) is handled.

### Reading Challenge as a state machine

`[documented]`

| Concept | Verbatim wording |
|---|---|
| The goal | "set annual reading goals" · `Set, edit or delete your Reading Challenge goal` |
| Progress | "View your friends' reading progress from Reading Challenge home" |
| Friend scope | "Select **All friends** to see everyone's progress or select a friend to view the books contributing toward their reading challenges." |
| Achievements | "collect achievements" · "Achievements, shown as **bookmarks**" |
| Eligibility | "add qualifying books to your **Read** shelf with a **read date** set in the **eligibility period**" |
| Reinforcement | "help you reach your annual goal and discover new books" |
| Latency | "It might take 24 hours for completed achievements to appear." |
| Removal | `Remove a book from your Reading Challenge` |
| History | `View previous years' Reading Challenge` |
| Failure | `I can't see my Reading Challenge goal or achievements` |

**`Achievements, shown as bookmarks`** is the metaphor discipline paying off. The reward object in a reading product is not a badge, trophy, medal, or gem — it is a bookmark. One word, and the gamification layer stops looking like a game and starts looking like a bookshelf. This is the same metaphor commitment as `shelves` / `Bookshelves` / `Librarian`, extended into the reward system.

**The achievement eligibility rule is the tightest coupling in the model.** An achievement requires: the book on the `Read` shelf **and** a `read date` **and** that date inside an `eligibility period`. Three conditions, stated twice in the same short article ("To earn the achievement, add qualifying books to your Read shelf with a read date set in the eligibility period" and "The books must be marked as Read within the eligibility period"). The repetition is redundant rather than reinforcing — the two sentences say the same thing two paragraphs apart, and the second is vaguer. A defect, but a minor one, and it reveals that this is the rule support gets asked about.

**The latency disclosure is good practice**: "It might take 24 hours for completed achievements to appear." Pre-empting the "I did the thing and nothing happened" ticket, with a number.

### Structural comparison: Goodreads vs Letterboxd state models

| | Goodreads | Letterboxd |
|---|---|---|
| Model | one **exclusive** shelf + non-exclusive tags | six **orthogonal** flags |
| Default states | 4, named, locked, unrenameable | 0 named "shelves"; 6 flags |
| Abandonment | **`Did Not Finish`** — a default shelf | **absent entirely** |
| Re-read / re-watch | **undocumented** | `Rewatch` — a Boolean, with counting rules |
| Progress | page or percent, with optional public comment | **absent** — no partial state |
| Ownership | a checkbox (+ a recommended shelf workaround) | a tag convention (`own`/`owned`) |
| Rating scale | stated as `5 stars`…`1 star`; descriptive labels not public | `0.5–5`, 0.5 increments, stated **only** in the CSV schema |
| "Difference between X and Y" help questions | 0 | 4 |

The two products have solved the **opposite** hard cases. Goodreads names the abandoned state and leaves the re-read undocumented; Letterboxd flags the re-watch and has no abandoned state. Goodreads has quantified in-progress reading; Letterboxd has no partial state at all. And Goodreads' exclusive-shelf model needs zero disambiguation questions in help, while Letterboxd's orthogonal-flag model needs four — the simpler ontology costs expressiveness and buys comprehensibility.

## T7 Error, failure & recovery

**The help centre's own JS failure message is the best-observed error string** `[observed]`

A plain HTTP fetch of any `help.goodreads.com` page returns:

> `Sorry to interrupt`
> `CSS Error`
> `Refresh`

with `×` carrying the title attribute `Cancel and close`.

`Sorry to interrupt` is a Salesforce Lightning default, not Goodreads copy, and it is a **near-perfect example of a bad error string**: it apologises for the wrong thing (interrupting, rather than failing), names the failure in developer terms (`CSS Error`) that mean nothing to a reader and are almost certainly wrong, offers `Refresh` as the only action, and provides a `Cancel and close` control that leaves the user on a blank page. This is what the entire Goodreads help centre serves to any client that cannot run the app — including, plausibly, assistive and low-bandwidth contexts. Recorded as the most consequential defect in the file.

**Spoiler-hidden state, on the book page** `[observed]`

> `This entire review has been hidden because of spoilers.`

Rendered three times in one page. A **complete sentence**, passive voice, with the cause named (`because of spoilers`) and the scope quantified (`This entire review`, versus a partial mask). And a bare inline marker `Spoiler:` for in-line masking. Two spoiler mechanisms, one sentence-form and one label-form.

Note what is missing: **no reveal control text**. There is no "view spoiler", "show anyway", or "I've read this" affordance in the render — the sentence states the hiding and offers no documented way out of it.

**Help article titles for failure** `[observed]`

| Title (verbatim) | Shape |
|---|---|
| `I can't access my account` | first person, modal negation |
| `I can't see my Reading Challenge goal or achievements` | first person, compound object |
| `Why am I unable to update my reading progress as a percentage` | `Why am I unable to…` — **and no question mark** |
| `My reading challenge won't update my progress…` | possessive, object-misbehaves |
| `Why doesn't my challenge progress update when I mark a book as read?` | with question mark |

**Inconsistent question-mark usage on interrogative titles** — `Why am I unable to update my reading progress as a percentage` has none; `Why doesn't my challenge progress update…?` has one. Both are `/s/article/` knowledge titles.

`I can't access my account` is the **first** item in `Trending Articles by Topic` on every help page. Goodreads surfaces its highest-volume failure at the top of every article, permanently.

**Data-loss warning before a destructive bulk operation** `[documented]`

> "**Important:** Batch editing carries a risk of data loss. We recommend moving books one at a time when possible."
> "**Before you start:** We recommend exporting your books first. For steps, visit Import or export your books."

Two stacked pre-flight warnings — a risk statement with a recommended alternative, then a backup instruction with a link. Goodreads is telling the user not to use the feature it is about to document, and then how to insure against it. Honest, and it names the specific cheaper alternative ("one at a time") rather than just cautioning.

**Latency stated instead of a spinner** `[documented]`: "It may take a few minutes for the shelf to update." (batch edit) and "It might take 24 hours for completed achievements to appear." (achievements). Two different magnitudes, both named, both in the procedure where the user would otherwise assume failure.

**Escalation** `[observed]`: `Ask a question` and `Contact us` on every help page; `Submit a request` equivalent is not present. `Refresh` is the only recovery control in the error shim.

## T8 Empty states

`[absent]` for observed in-product empty states — all behind auth.

Two related findings:

- **`Loading...` leaks into rendered content on the public book page** `[observed]` — once as an `h3` **inside the `Browse ▾` dropdown**, and twice as bare body text sitting exactly where the shelf/rating widget and the book-details module belong. A loading placeholder promoted to a heading, with no accessible live-region phrasing ("Loading book details…"). Three instances on one page.
- **The signed-out `Friends & Following` module is effectively an empty state, and it is well written** `[observed]`:

> `Friends & Following`
> "Create a free account to discover what your friends think of this book!"

The module renders its own zero-data case as an acquisition prompt: the heading names what would be there, the sentence names the value of filling it (`discover what your friends think of this book` — specific to *this* book, not generic), and the CTA is inline. The exclamation mark and the `Create a free account` label mismatch (it links to sign-in) are the flaws; the structure is right.

## T9 Notifications & system messages

`[documented]` mostly, and thinner than the rest.

- `Notifications` is a top-level help topic, but its articles were not opened
- **Progress updates are the notification mechanism**: "Add a comment if you want to share a status update." — the user's progress entry becomes a feed item. `Updates Feed` is a named help topic.
- `Social Sharing` is a named help topic
- Reading-challenge visibility as an ambient signal: "View your friends' reading progress from Reading Challenge home" and "select a friend to view the books contributing toward their reading challenges" — progress is socially legible by default
- Two latency disclosures serve as pre-emptive "nothing is broken" messages (see T7)
- An "app is out of date" nag: "For the best experience, make sure you update your app to the latest version."
- Homepage promotional banner, delivered as an image with alt text (`Witchy Books for Fall`, `Hispanic Heritage Month 2026`, `Judge a Book by Its Cover! 6 Cover Art Trends We're Spotting This Year`) — the marketing message is **only** in alt text and a link, which is at least accessible by accident
- Social-proof counters on editorial content: `362 likes` on a blog module

`[absent]`: no toast, banner, email, or push copy was recoverable. No notification-type taxonomy is published (contrast Letterboxd, which publishes a full channel matrix).

## T10 Disclosures, legal & compliance

No sector regulator applies. The disclosure work here is **advertising consent, Amazon relationship, data portability, and review integrity** — and it is markedly thinner than either Letterboxd's or Substack's.

**Signup consent is passive and inferential** `[observed]`

> "By creating an account, you agree to the Goodreads Terms of Service and Privacy Policy."

No checkbox, no summary, no "what this means". Placed below the three signup buttons.

**Advertising-privacy controls are the densest disclosure cluster, and they are in the footer** `[observed]`

`Interest Based Ads` · `Ad Preferences` · `Your Ads Privacy Choices` (with a CCBA icon image)

Three separate ad-consent links, one of which (`Interest Based Ads`) points into the help centre — i.e. into the JS app that fails to render for non-JS clients. **A privacy notice reachable only through a client-side application.** Recorded as a defect with compliance implications.

**The Amazon relationship is disclosed structurally rather than in prose** `[observed]`

- `An Amazon Company` — a footer **image**, with that string as its alt text
- `Continue with Amazon` as the **first** signup option
- `Kindle Notes & Highlights` in the account menu
- `Goodreads On Kindle` as a help topic
- `Kindle e-reader` as a fifth documented platform in shelf and rating articles
- `ASIN` exposed as a user-facing search identifier
- "To rate Kindle books on Goodreads, you must link your Amazon and Goodreads accounts."

The ownership fact is stated once, as alt text on a logo. Everything else is functional integration. There is no explanatory page about what Amazon ownership means for a reader's data, and none was found.

**Data portability, disclosed honestly and against interest** `[documented]`

> "Owned books won't appear in your export file. As an alternative, create a custom shelf called Owned to track your collection."

A named field that does not export, disclosed in the article teaching the field, with a workaround. See T6.

And `Import or export your books` is the **second** item in `Trending Articles by Topic` on every help page — data portability as a permanently-surfaced top-five concern.

**Review integrity, named but not explained** `[documented]`

> "All ratings and reviews must follow our **Rating and Review Guidelines**."

Named, linked, and placed in the **first paragraph** of the rating article — before the procedure. Good placement. But the guidelines themselves were not reachable in this harvest, and there is **no published statement about rating-manipulation or review-bombing** anywhere found — a notable absence for a platform with a well-documented history of coordinated rating campaigns. Contrast Letterboxd, which publishes both the weighting direction and the one-rating-per-member dedup rule. Recorded as a gap.

**Advance-copy reviews are a separate documented class** `[documented]`: `Rate and review advance book copies` — a distinct article and flow for pre-publication titles, which is a disclosure-adjacent decision (galley reviews behave differently) that Goodreads handles by segregating the procedure.

**Librarian Manual as public governance documentation** `[observed]`: a top-level help group (`About Librarians` · `Author Profile Edits` · `Book Page Edits`) plus a `/librarian_manual` page linked from About. Goodreads publishes the rules by which volunteers edit its metadata. That is real governance transparency for a community-maintained database, and it is the strongest disclosure artefact in the file.

**Footer legal set** `[observed]`: `Terms` · `Privacy` · `Help` · `© 2026 Goodreads LLC` — no accessibility statement, no cookie banner in the render, no DSA/online-safety references.

## T11 Help-centre architecture

**Platform: Salesforce Experience Cloud, and the platform is the story.**

`help.goodreads.com/s/` returns a JavaScript shell to any plain HTTP request. The fetched body is:

> `Loading` · `Sorry to interrupt` · `CSS Error` · `Refresh`

Every article, every topic, and the topic catalog behave the same way. The content is real and good once rendered — but the *entire support corpus is invisible* to non-JS clients, and is served an error message that names a CSS problem.

**Three levels: group → topic → article.** Six groups, 24 topics, article counts in the dozens per topic.

**URL structure is opaque** `[observed]`: articles live at `/s/article/000001073`, `/s/article/000001090`, `/s/article/000001778` — **zero-padded numeric IDs**, no slug, no title. Some legacy articles keep a slug (`/s/article/What-are-Reading-Challenges`), so **two URL schemes coexist**. A numeric-ID help URL is unguessable, unshareable-with-context, and worthless for search. Topic URLs are worse: `/s/topic/0TO1H000000gjGKWAY/managing-books` — a Salesforce record ID with a slug bolted on.

**Community Q&A and knowledge articles are mixed** `[observed]`: each topic page has tabs `Articles` / `Questions & Answers` / `More`, and member questions live at `/s/question/0D51H00004NZAzwSAH/...`. A reader searching for shelf help will surface both Goodreads' own article and member-asked questions with member-written answers — two authority levels in one result set, distinguished only by a tab the reader may not notice.

**Article-title grammar — four shapes** `[observed]`

| Shape | Example |
|---|---|
| Imperative verb phrase (task) | `Add or remove books from your shelves` · `Update your reading progress` · `Track owned books` · `Rate and review published books` · `Add private notes to a book` · `View and filter reviews and ratings` · `Manage your ratings and reviews` · `Collect Reading Challenge achievements` · `Change your password` |
| `Set, edit or delete <object>` | `Set, edit or delete your Reading Challenge goal` — **three verbs in one title**, covering the whole CRUD surface |
| `About <feature>` | `About Reading Challenge` |
| `I can't / Why …` | `I can't access my account` · `I can't see my Reading Challenge goal or achievements` |

The dominant shape is **imperative, sentence case, second-person-possessive** (`your shelves`, `your reading progress`, `your ratings and reviews`). It is consistent and good. `Set, edit or delete your Reading Challenge goal` is the standout — one title covering create, update and destroy, so a user with any of three intents lands in the same place instead of guessing which of three articles applies.

But note the **casing break between levels**: topics are `Managing Books`, `Reading Challenge`, `Your Year In Books` (every word capitalised); articles are `Add or remove books from your shelves` (sentence case). And one topic mixes both regimes internally: `Goodreads Authors: How To Edit Your Books`.

**Article bodies are unusually well-structured** `[observed]`

The consistent template is:

1. One-sentence purpose statement ("Update how far you are in a book you're currently reading.")
2. `Note:` or `Important:` blocks carrying consequences and warnings — **before** the procedure
3. `Instructions for:` followed by a platform list (`iOS app` / `Android app` / `Mobile web` / `Desktop` / `Kindle e-reader`)
4. One numbered procedure per platform, with UI labels in bold or plain
5. A confirmation sentence per procedure ("The book appears on your selected shelf.", "Your progress appears on the book page.")
6. Conceptual sections last (`How shelves work`, `Edit books in bulk`)
7. `Learn more` — a list of sibling article titles
8. Metadata footer: article ID, title, topic breadcrumb

**Items 2 and 5 are the transferable bits.** Consequences and warnings are placed *above* the steps, not below them, in every article observed. And every procedure ends with a **confirmation sentence describing the observable result** — not "You're done!" but "The book appears on your selected shelf." The user can verify.

**`Instructions for:` with five named platforms** is a deliberate content-ops cost. It means one article carries five divergent label sets — which is exactly how the four `Remove book…` labels and three `Update progress` labels end up visible side by side. The structure surfaces the inconsistency it cannot fix.

**Freshness is published** `[observed]`: every article shows a date (`Sep 4, 2026`, `Jul 21, 2026`) and a record type (`Knowledge`). Topic listings show **view counts**: `934310 Views`, `713926 Views`, `318221 Views`, `114964 Views`. Publishing raw view counts on help articles is an unusual transparency choice and it doubles as a demand signal — `Add or remove a book on Goodreads` at 934k views and `Discover and buy books on Goodreads` at 714k views are the two most-read articles, which tells you the core loop and the commerce path are the two things people cannot figure out.

`Knowledge` rendered as a visible label beside the date is a **CMS record type leaking into the user-facing byline**. Every article says "Jul 21, 2026Knowledge" with no separator.

**Routing furniture** `[observed]`: `Ask a question` / `Contact us` (both, on every page, unexplained); `Trending Articles by Topic` (five items, identical on every page); `Learn more` sibling lists; `Load more`; `Skip to Main Content`; `Back to Goodreads.com`; `Ideas` (a feature-request surface, in the nav).

## T12 FAQs

`[absent]` — **there is no FAQ page anywhere on Goodreads.** No `/faq`, no accordion on the homepage, no FAQ block on the About page, no "common questions" section in any help article.

This is a real structural difference from the rest of the cohort. Letterboxd has one 115-question page; Medium and Substack have Zendesk centres with question-titled articles; BeReal has question-titled articles. Goodreads has **imperative task articles and a community Q&A tab**, and no curated question set at all.

The FAQ function is split two ways:

**1. `Trending Articles by Topic` — a five-item permanent list on every help page** `[observed]`

| # | Article (verbatim) |
|---|---|
| 1 | I can't access my account |
| 2 | Import or export your books |
| 3 | About Reading Challenge |
| 4 | Sync your Goodreads and Kindle reading experiences |
| 5 | Change your password |

This is the closest thing to an FAQ, and its composition is revealing: **two of five are account-recovery** (`I can't access my account`, `Change your password`), one is **data portability**, one is the **gamification feature**, one is the **Amazon integration**. Not one is about books, shelves, reviews, or reading. The five things Goodreads users most need help with are getting in, getting out, the challenge, and Kindle.

**2. Member-asked questions in the `Questions & Answers` tab** `[observed]` — real user questions at `/s/question/` URLs, e.g. `How do I put a book on a shelf I've set up?`, `Where to find my currently reading bookshelf`, `Updating Reading Progress - nowhere to do it`, `How do you update your reading challenge`, `Reading challenges not updating`.

These are **members' words, not Goodreads' copy**, so they are not quoted as product microcopy — but their existence is a finding. Three of the five above are about *finding* a control the help article says exists (`nowhere to do it`, `Where to find`). The community Q&A is functioning as a discoverability bug tracker for the shelf and progress UI.

## T13 Terminology & glossary — PRIORITY

There is no glossary page. The vocabulary is defined inside the `How shelves work` section and by usage.

| Term | Goodreads' usage | The alternative it rejected |
|---|---|---|
| `shelf` / `shelves` | The core container. "Add or remove books from your shelves" | "list", "collection", "library", "folder" |
| `Bookshelves` | The My Books sidebar section label | "Shelves", "My shelves" |
| `bookshelves` | In scare quotes in the founder letter — "You can create 'bookshelves' to organize what you've read" | — |
| `My Books` | The user's whole catalogue. Nav item, and the object in `Remove book from My Books` | "Library", "My Shelves", "Collection" |
| `Want to Read` | Default shelf 1 — and the primary CTA | "To Read", "Wishlist", "Saved", "Reading List" |
| `Currently Reading` | Default shelf 2 | "Reading", "In Progress", "Started" |
| `Read` | Default shelf 3 | "Finished", "Completed", "Done" |
| `Did Not Finish` | Default shelf 4 | **"DNF", "Abandoned", "Unfinished", "Gave Up", "Paused"** |
| `default shelves` | The four locked, exclusive shelves | "system shelves", "built-in shelves" |
| `custom shelves` | User-created, **exclusive** | "my shelves", "categories" |
| `tags` | User-created, **non-exclusive** | "labels", "keywords" |
| `exclusive` / `non-exclusive` | The property that distinguishes shelf from tag — **the load-bearing term** | "single-select / multi-select" |
| `read date` | The date attribute that qualifies a book for the challenge | "date finished", "completion date" |
| `reading progress` | Page- or percent-quantified position | "bookmark", "position" |
| `status update` | The public artefact created by a progress comment | "post", "activity" |
| `Reading Challenge` | The annual goal feature. Capitalised as a proper noun | "Reading Goal", "Goals" |
| `achievements`, `shown as bookmarks` | The reward objects | "badges", "trophies", "milestones" |
| `eligibility period` | The window in which a read date must fall | "challenge window", "date range" |
| `Your Year In Books` | The annual recap. Help-topic name | "Year in Review", "Wrapped" |
| `Librarian` / `Librarian Manual` | Volunteer metadata editors and their handbook | "moderator", "editor", "contributor" |
| `Before you Go` | The Kindle last-page rating prompt | "Rate this book", "You finished!" |
| `Ask the Author` | Author Q&A surface | "AMA", "Q&A" |
| `Giveaways` | Promotional book distribution | "sweepstakes", "promotions" |
| `Choice Awards` | The annual reader-voted awards. Also `Readers' Favorite <genre> 2025` | "Best of", "Awards" |
| `Readers' Favorite` | The award-category prefix, used 16 times on the homepage | "Best", "Top" |
| `Kindle Notes & Highlights` | Imported annotations | "highlights", "notes" |
| `ASIN` | Amazon identifier, exposed as a user-facing search input | — |
| `Explore` | A Browse child that points at Browse's own destination | — |
| `Ideas` | Feature-request surface in the help nav | "Feedback", "Roadmap" |
| `member` | The person — "Already a member?", "our community's reviews" | "user" |

**The shelf metaphor is the most disciplined vocabulary system in the cohort.** `shelf` → `Bookshelves` → `My Books` → `Librarian` → `achievements shown as bookmarks`. Five terms, one physical world, no mixed metaphors. Nothing is a "board", "stack", "vault", "queue", or "playlist". The founder letter documents where it came from (a literal friend's bookshelf) and marks it as a metaphor in scare quotes exactly once, which is the right number of times.

**`exclusive` / `non-exclusive` is the one abstract term, and it is unavoidable.** It is the property that makes a shelf a shelf and a tag a tag, and Goodreads uses it consistently in all three rules. It is jargon — a reader will not arrive knowing it — but the rules define it by demonstration ("A book can only be on one default shelf at a time") in the sentence immediately after each use. Jargon introduced and immediately glossed, three times, in one paragraph.

**Register split by surface:**
- Marketing (homepage, About): questions, second person, warm — `Deciding what to read next?`, `You're in the right place.`
- Help topic names: Title Case With Function Words Capitalised — `Your Year In Books`
- Help article titles and bodies: sentence case, imperative, procedural — `Update your reading progress`
- Platform labels: divergent and unreconciled — `Reading` vs `Currently Reading`, four `Remove…` variants

**Terminology defects:**
- `My Books` / `shelves` / `my shelf` / `my books` — four names for the container, in four platform labels in **one article**
- `Reading` (iOS section) vs `Currently Reading` (web section) for the same shelf
- `Write a review` (help) vs `Write a Review` (live book page)
- `Post` used for both review-submit and ownership-checkbox-save; `Save` used for review-submit on web
- `Sign In` / `Sign in`; `Join` / `Sign up` / `Sign up with email` / `Create a free account`
- `Before you Go` — almost certainly a typo for `Before You Go`
- `Knowledge` (a CMS record type) rendered in the article byline with no separator: `Jul 21, 2026Knowledge`
- `Page#` — a developer-ism as a control label

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the reader; first-person plural for the company and, notably, **for the community**: "our community's reviews", "our members", "Our mission is to help readers…". The founder letter is first-person singular, signed, and is the only place the company speaks as a person.

**Register on marketing surfaces.** Interrogative, warm, slightly gentle. Three consecutive question headings. Reassurance before instruction (`You're in the right place.`). Italic emphasis on pronouns (`What will *you* discover?`). One exclamation mark in the whole homepage-plus-About set, and it is in the book-page acquisition prompt (`…what your friends think of this book!`).

**Register on help surfaces.** Flat, imperative, procedural, and **completely voiceless** — which is correct. "Go to My Books and find the book you want to mark. Click Edit on the far right of the book record. A pop-up menu opens." No personality, no contractions in most steps, no jokes. The tone gradient between marketing and help is a cliff, and unlike BeReal's the cliff is in the right place.

**The one piece of tonal warmth in help copy** `[documented]`: "Reading challenges help you track and **celebrate** your reading." `celebrate` is the only affective verb found across six help articles.

**Numbers as trust devices** `[observed]`: `20 billion data points` · `world's largest site for readers` · `Goodreads launched in January 2007` · `15,509 books | 20,022 voters` · `3,529,727 ratings` · `362 likes` · `934310 Views`. Specific and unrounded, though `world's largest` is the one unsubstantiated superlative and it appears three times (homepage meta, About, About again).

**Accessibility content** `[observed]` — mixed, with several concrete defects.

Present and correct:
- `Skip to Main Content` on help-centre pages
- `Jump to ratings and reviews` on the book page — a functional in-page skip
- Pluralisation handled in the rating distribution: `1 star` vs `5 stars`
- Promotional banners carry meaningful alt text (`Witchy Books for Fall`, `Hispanic Heritage Month 2026`, full blog-post titles), which is better than the usual decorative-banner treatment
- Book cover thumbnails in rails carry `title` attributes in `Title by Author` form (`The Godfather by Mario Puzo`)
- Author avatar alt follows a consistent pattern: `Profile Image for {Name}.`
- `An Amazon Company` logo has alt text
- `Cancel and close` as the title on the error-shim `×`

Absent or defective:
- **No accessibility statement.** No footer link, no help topic, no article. `[absent]`
- **The book cover — the primary content image on a book page — has empty alt on both of its two renders.**
- **`Loading...` rendered as an `h3`** inside the Browse dropdown, and twice as bare body text where widgets should be. No accessible live-region phrasing.
- **The homepage search field's only guidance is a `title` attribute on an image** (`Title / Author / ISBN`) — hover-only, mouse-only.
- **Concatenated numeric labels with no separator** — `3,529,727 ratings86,885 reviews`, `101 books16.9k followers`, `651 reviews72.9k followers`. Visually separated by CSS; announced as "ratings86,885" and "books16.9k". This is the most-repeated accessibility defect on the page.
- **The rating summary is a single link containing five data points** (`4.18 3,529,727 ratings86,885 reviews`), producing one unparseable accessible name where there should be discrete labelled values.
- **`Follow` renders twice consecutively** for the author and for every reviewer block — a screen reader announces "Follow, Follow".
- **`Want to Read` and `Shop this series` each render twice** on the book page with identical labels and no differentiating state — two controls with the same accessible name.
- **`...more` reused for three semantically different expanders** (book description, genre-chip overflow, review body), ~6 instances, identical ambiguous link name.
- **Skip-link label does not match its target heading**: `Jump to ratings and reviews` (sentence case, spelled-out "and") lands on `Ratings & Reviews` (title case, ampersand). The user hears one phrase and arrives at another.
- **Avatar alt is redundant and mis-punctuated**: `Profile Image for Brad.` includes the word "Image" (which assistive tech already announces), capitalises it mid-phrase, and appends a full stop.
- **Literal `description` shipped as alt text** on images embedded in reviews.
- **`Filters` carries no state, no count, and no paired "Clear filters".**
- **Malformed markup leaking into user-visible output**: one book-page line ends with ~32 repetitions of the literal token `</["br"]>`.
- **`▾` chevrons rendered as literal text** in nav labels (`Browse ▾`, `Community ▾`).
- **The entire help centre is unreachable without JavaScript**, and serves `Sorry to interrupt` / `CSS Error` / `Refresh` when it is. This includes the `Interest Based Ads` privacy notice linked from the footer.

**Negative findings, recorded honestly**

- Four platform labels for removing a book, in one article, unreconciled
- Three platform labels for updating progress, in one article, unreconciled
- `Reading` vs `Currently Reading` for one shelf
- `Post` used to save a private ownership checkbox
- `Create a free account` links to `/user/sign_in` with an empty `return_url`
- Five labels for account creation; two casings for sign-in
- Two counts for the same object on one page: `86,885 reviews` in the header and `Displaying 1 - 30 of 86,764 reviews` in the list — a 121 discrepancy visible without scrolling
- `Displaying 1 - 30 of 86,764 reviews` uses a spaced hyphen for a range, and `Displaying` is clinical beside the adjacent `What do you think?`
- `Explore` in the Browse dropdown points at Browse's own destination
- Two coexisting help-URL schemes (numeric ID vs slug); numeric IDs are unguessable
- `Knowledge` CMS record type in the article byline, unseparated from the date
- `Before you Go` casing
- `Why am I unable to update my reading progress as a percentage` — missing question mark
- Achievement eligibility rule stated twice, two paragraphs apart, the second vaguer
- Member Q&A and official articles mixed in one result set
- `Ask a question` and `Contact us` offered together on every page with no guidance on which to use
- No FAQ page; no accessibility statement; no rating-manipulation policy published
- `Did Not Finish` exists as a shelf but its semantics (challenge counting, progress retention, rating interaction) are undocumented

---

## Transferable patterns

1. **Name your collection states as verb phrases in the reader's own tense.** `Want to Read` / `Currently Reading` / `Read` / `Did Not Finish` — desiderative, progressive, perfect, negated-past. Not nouns, not statuses. The user recognises the sentence they would say. Transfers to any product tracking a relationship over time: applications, courses, claims, onboarding stages.

2. **Ship the abandoned state, and name it without blame.** `Did Not Finish` is flat, past-tense, and assigns fault to neither reader nor book — unlike "Abandoned" (blames the reader) or "Unfinished" (blames the book). Where a user can reasonably quit partway, give them a state, and make the label neutral. This is the single highest-value pattern in this file, and Letterboxd's total absence of it is the control case.

3. **Define two objects as one object with a switch.** "If you change a custom shelf to non-exclusive, it becomes a tag. … If you change a tag to exclusive, it becomes a shelf." One paragraph replaces two feature explainers, and the reader leaves with a model rather than a list.

4. **Name the three things that survive a state change.** "When you move a book, its reading progress, read dates, and reviews move with it." Enumerating the carried objects beats "your data is preserved" because the user's specific fear is one of the three.

5. **State a destructive side effect once above the procedure, then again at each point of action.** "Removing a book from your shelves also removes your review" appears in the intro and then four more times, verbatim, once per platform. Repetition calibrated to consequence.

6. **End every procedure with the observable result, not a congratulation.** "The book appears on your selected shelf." / "Your progress appears on the book page." The user can verify they succeeded. Cheap, and it eliminates the "did that work?" follow-up.

7. **Put the latency in the copy instead of in a spinner.** "It may take a few minutes for the shelf to update." / "It might take 24 hours for completed achievements to appear." Two magnitudes, both named, in the step where the user would otherwise assume failure.

8. **Warn against your own feature when it is risky, and name the cheaper alternative.** "Batch editing carries a risk of data loss. We recommend moving books one at a time when possible." Plus "We recommend exporting your books first." A risk statement, an alternative, and a backup instruction, stacked above the procedure.

9. **Disclose that your own field does not export, in the article about the field.** "Owned books won't appear in your export file. As an alternative, create a custom shelf called Owned." Against interest, above the procedure, with a workaround. Applies to any product with partial data portability.

10. **Cover create, update and destroy in one help title.** `Set, edit or delete your Reading Challenge goal`. Three intents, one landing page, no guessing.

11. **Extend the core metaphor into the reward system.** `achievements, shown as bookmarks`. Not badges or trophies — the object a reader already uses. One word that keeps gamification inside the product's world.

12. **Name the prompt after the moment, not the action.** `Before you Go` for the last-page rating prompt. Transfers to exit surveys, cancellation flows, session-end prompts — anywhere the timing is the point.

13. **Put the privacy consequence in the field's own instruction.** "Add a comment if you want to share a status update." The optional field tells you that filling it in publishes.

## Caveats & gaps

- **`help.goodreads.com` cannot be fetched.** It is a Salesforce Lightning single-page app returning `Loading` / `Sorry to interrupt` / `CSS Error` / `Refresh` to plain HTTP. All help content in this file was recovered through a rendering browser, one article at a time. This is both a harvest constraint and a finding — and it means the `Interest Based Ads` privacy notice is also unreachable without JS.
- **The public book-page render truncated mid-review-list.** Not captured from it: the **shelf dropdown options**, the **star-rating widget and its tooltip/alt labels**, `Rate this book`, sort controls, pagination, the genre/shelf statistics (`people are currently reading`, `people want to read`), `Readers also enjoyed`, edition details, and the **entire page footer**. The rating widget rendered as `Loading...`.
- **Rating labels are `[absent]`, not confirmed absent.** The historic descriptive star vocabulary (`did not like it`, `it was ok`, `liked it`, `really liked it`, `it was amazing`) appears nowhere in this harvest. It may still ship behind JS. This file does not assert it has been removed.
- **`Did Not Finish` semantics are undocumented.** The shelf is named in the shelf article; nothing found explains whether it counts toward the Reading Challenge, whether progress is retained, or how it interacts with rating and review. The most interesting state in the model is the least explained.
- **Re-reading is entirely undocumented.** No article, no field, no state was found for reading a book a second time — a conspicuous gap given Letterboxd's explicit `Rewatch` Boolean. Whether Goodreads supports it at all could not be determined from public pages.
- **No member content was viewed or quoted**, per brief. Member reviews, profiles, custom shelf names, lists, and Q&A answers were deliberately excluded. Review-composer microcopy, spoiler-reveal controls, and shelf-naming validation are therefore unharvested.
- **Unopened help articles that would likely be high-value:** `Add or remove a book on Goodreads` (934k views — the most-read article on the site), `Manage your ratings and reviews`, `View and filter reviews and ratings`, `Add private notes to a book`, `Discover and buy books on Goodreads` (714k views), `Find sort and customize your shelves`, `Import or export your books`, `Set, edit or delete your Reading Challenge goal`, `Remove a book from your Reading Challenge`, `Sync your Goodreads and Kindle reading experiences`, and the whole `Notifications`, `Privacy and Security`, `Your Year In Books`, and `Librarian Manual` groups.
- **`Rating and Review Guidelines` was named but not reached.** T10's review-integrity coverage is consequently thin, and no rating-manipulation policy was found.
- **`/about/terms` and `/about/privacy` not harvested.**
- **Help-article view counts and dates are a snapshot** at harvest and will drift.
- **All in-account states are `[documented]`.** Empty states, toasts, validation messages, and the shelf picker itself require an authenticated pass.

## Sources

1. https://www.goodreads.com/
2. https://www.goodreads.com/about/us
3. https://www.goodreads.com/book/show/2429135.The_Girl_With_the_Dragon_Tattoo
4. https://help.goodreads.com/s/
5. https://help.goodreads.com/s/topiccatalog
6. https://help.goodreads.com/s/topic/0TO1H000000gjGKWAY/managing-books
7. https://help.goodreads.com/s/topic/0TO1H000000cowlWAA/reading-challenge
8. https://help.goodreads.com/s/article/000001073
9. https://help.goodreads.com/s/article/000001090
10. https://help.goodreads.com/s/article/000001076
11. https://help.goodreads.com/s/article/000001436
12. https://help.goodreads.com/s/article/What-are-Reading-Challenges
13. https://help.goodreads.com/s/article/000001778
