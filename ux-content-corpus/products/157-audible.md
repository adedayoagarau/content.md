# 157. Audible

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Audiobook subscription / spoken-word entitlement marketplace |
| Primary URL | https://www.audible.com/ |
| Corpus rank | 157 |
| Benchmark strength (source list) | Listening progress and membership states |
| Locale / market observed | en-US (marketplace switcher and `EnglishEspañol` toggle present) |
| Platform observed | Web (audible.com marketing), Salesforce-hosted help centre (help.audible.com) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Consumer-law carve-out stated explicitly in the returns terms ("This return option doesn't affect any rights you have under consumer law"); Apple App Store and Google Play billing rules disclosed as a separate cancellation regime; Amazon-group privacy notice and interest-based-ads notice; no sector regulator |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 (1 partially blocked) |
| Harvest completeness | Partial — the entitlement layer (credits, plans, pause, cancel, returns, locked titles) is captured in unusual depth because Audible documents it exhaustively in public help articles. The membership *pricing* page (`/ep/memberships`) returned nav and promo furniture only; its body is client-rendered. All in-product player, library and progress UI is `[documented]` from help articles. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.audible.com/ | Promo strip, hero offer with auto-renew disclosure, category rail, section headings |
| Memberships / pricing | https://www.audible.com/ep/memberships | **Partially blocked** — body client-rendered; global nav, promo strip and footer captured |
| Help centre home | https://help.audible.com/s/ | Six-item nav, six popular articles, seven device entries, six topics, CSAT widget |
| Help category: Plans & benefits | https://help.audible.com/s/plans-and-benefits | Three sub-groups (`Plans`, `Benefits`, `Your plan`) with per-article view counts |
| Help category: Listening | https://help.audible.com/s/listening | Five sub-groups (`Ways to listen`, `Library`, `Player`, `Reviews & social sharing`, `Profiles`) |
| Learn about credits | https://help.audible.com/s/article/learn-about-credits | **The credit-vocabulary artefact** — eight named credit types with expiry rules |
| Learn about the Audible Premium Membership | https://help.audible.com/s/article/learn-about-premium-plus | Plan matrix with prices; mid-rename banner |
| Learn about the Plus Catalog | https://help.audible.com/s/article/learn-about-the-plus-catalog | Mid-rename banner; `Included until` label; unlimited-access framing |
| Cancel membership | https://help.audible.com/s/article/cancel-membership | Cancellation consequence copy, six-question structure |
| Before you cancel your Audible membership | https://help.audible.com/s/article/before-you-cancel-your-audible-membership | **Keep/lose tables** — the best entitlement-disclosure artefact in the file |
| Pause your membership | https://help.audible.com/s/article/pause-your-membership | Per-plan pause-entitlement matrix; three conflicting statements of the pause rule |
| Return a title | https://help.audible.com/s/article/return-a-title | Eligibility list, discretionary-revocation terms, consumer-law carve-out |
| Title in Library is locked | https://help.audible.com/s/article/title-in-library-is-locked | Lock-state explanation; purchased vs included distinction |
| View listening log | https://help.audible.com/s/article/view-listening-log | **Listening-progress vocabulary**; the "find your place" use cases |
| Accessibility at Audible | https://www.audible.com/ep/accessibility | Three design principles; descriptive alt text; human accessibility-support channel |

---

## T1 Navigation & IA labels

**Global nav — a flat 20-item strip, mixing content types, merchandising windows and corporate links** `[observed]`

`Sign in` · `Audiobooks` · `Podcasts` · `Audible Originals` · `Latino and Hispanic voices` ·
`All categories` · `Plans & Pricing` · `Bestsellers` · `Coming Soon` · `New Releases` ·
`Best of the Year` · `Best of #BookTok` · `Plus Catalog` · `Gifts` · `Help Center` ·
`About Audible` · `Blog` · `Sales & Deals` · `Audible for Business` · `Accessibility`
plus `Change marketplace` and an `EnglishEspañol` language toggle.

Analysis. Four distinct label grammars coexist in one flat list: **format nouns** (`Audiobooks`, `Podcasts`), **time windows** (`Coming Soon`, `New Releases`, `Best of the Year`), a **social-platform reference** (`Best of #BookTok` — a hashtag in a top-level nav item), and **audience/corporate** entries (`Audible for Business`, `About Audible`). `Latino and Hispanic voices` is the only identity-based content label in the nav, which makes its presence a deliberate merchandising and inclusion decision rather than a taxonomy one.

Two findings. `Accessibility` is a **top-level global nav item**, not a footer link — a genuinely unusual and creditable placement for a company whose product is itself an assistive technology (see T14). And `Plus Catalog` remains in the nav while the help centre has announced that the catalog is being renamed to `included catalog` — the rename has reached the documentation but not the navigation.

**Footer — eleven links, heavily legal** `[observed]`

`Help Center` · `Contact Us` · `Conditions of Use` · `Privacy Policy` · `Interest-Based Ads` ·
`Cookies` · `Accessibility` · `United States (English)` · `License` · `Your ads privacy choices` ·
`Audible for Business`

`License` as a standalone footer item is notable: the licence agreement is surfaced as a peer of the privacy policy, which is honest for a product where **what you "own" is a licence, not a file**. Note `Interest-Based Ads` and `Your ads privacy choices` are two separate ad-privacy entries, and `Privacy Policy` / `Cookies` both resolve to amazon.com rather than audible.com — the corporate parent's policy surface, with no Audible-specific privacy notice.

**Help centre — two coexisting topic taxonomies** `[observed]`

Nav (six items): `Home` · `Account management` · `Plans & benefits` · `Listening` · `Troubleshooting` · `Getting started` · `More`

"Browse all topics" grid (six items): `Account & billing` · `Getting started` · `Listening` · `Plans & benefits` · `Troubleshooting` · `Purchases & returns`

These do not match. `Account management` (nav) versus `Account & billing` (grid) is one label divergence; `Purchases & returns` appears in the grid but not the nav; the nav's `More` is an unnamed overflow. Recorded as a defect: **the primary and secondary help taxonomies disagree on two of six items.** Breadcrumbs then use the *grid* vocabulary (`Home > Account & billing`), so the nav label a user clicked is not the label they land under.

**Third-level topic groupings are the real artefact** `[observed]`

Under `Plans & benefits`: `Plans` · `Benefits` · `Your plan` — a three-way split between *what we sell*, *what it gets you*, and *what you have*. The possessive `Your plan` as a sibling of the generic `Plans` is a smart distinction: it separates evaluation content from management content, and every lifecycle action (`Pause`, `Restart`, `Switch plans`, `Cancel membership`, and the two store-billing articles) lives under `Your plan`.

Under `Listening`: `Ways to listen` · `Library` · `Player` · `Reviews & social sharing` · `Profiles`. `Player` as a named IA node — the playback surface treated as a distinct object with its own ten articles — is what allows the progress and position vocabulary in T6 to have a home.

Under `Troubleshooting`: `Library issues` is one named sub-topic (from the breadcrumb on the locked-title article). The IA has a slot named for the object that breaks.

**`Browse by device` as a parallel axis** `[observed]`

`iOS` · `Android` · `Fire Devices` · `Kindle` · `MP3 Player` · `Windows` · `Alexa`

A second routing dimension alongside topic. `MP3 Player` is a legacy entry preserved in a 2026 help centre — a device class most products dropped a decade ago, and a signal about the actual installed base. `Fire Devices` (plural, capitalised) sits beside `Kindle` (singular) — inconsistent, and the user has to know Kindle is not a Fire Device.

**Per-article view counts exposed in category listings** `[observed]`
`Cancel membership` · **20,982,295 Views**; `Pause your membership` · 5,821,232; `Learn about credits` · 4,139,475; `Learn about the Plus Catalog` · 2,020,216; `Learn about the Audible Premium Membership` · 1,495,049; `Learn about Audible Rewards` · 1,186.

This is the single most revealing number in the file. Publishing view counts turns the help centre into a **public demand signal**: the cancellation article is viewed ~21 million times, five times more than any other article, and 3.6× the pause article. A content team reading its own IA can see that the highest-traffic page in the entire knowledge base is the exit. `Learn about Audible Rewards` at 1,186 views is the opposite signal — a documented feature almost nobody looks for.

## T2 Value proposition & headline patterns

**Promo strip is the top-of-page hero, and it is priced before it is described** `[observed]`

> `Prime Member Exclusive | $0.99/mo for 4 months`
> `$8.99/mo thereafter—terms apply.`
> `Prime Exclusive: Save over 80% on our best deal of the year.`
> CTAs: `Get this deal` · `See all plans`
> Disclosure: "Auto-renews at $8.99/mo after 4 months. Offer ends October 7, 2026 at 11:59PM PT. Cancel anytime."

Structure worth recording: **eligibility gate → promotional price → duration → go-to price → percentage saving → two CTAs → four-part disclosure.** The disclosure is unusually complete for a promo strip: it names the renewal price, the renewal trigger ("after 4 months"), the offer deadline **to the minute and timezone**, and the exit ("Cancel anytime"). The em-dash construction `$8.99/mo thereafter—terms apply` compresses go-to price and legal hook into six words.

`Save over 80% on our best deal of the year` is a superlative bounded by a period ("of the year") rather than an absolute — a mild self-limitation.

**Hero section headline — a pun that is also a value proposition** `[observed]`

> `Read as many books as you can hear`
> Subhead: "Bestsellers, new releases, exclusives, and Audible Originals"

This is the best single line on the site. It resolves the category's central tension — *is listening reading?* — by simply asserting that it is, and turns the format difference into the unit of measurement. It also implies unlimited-ness without promising it. The subhead is a bare four-item noun list with no verb, which lets the headline carry all the work.

**Title-level CTA with inline disclosure** `[observed]`
> `Try for $0.00` · "Auto renews for $8.99 a month after 30 days. Cancel anytime."

`Try for $0.00` rather than "Start free trial" — the **numeral zero with decimals** is doing work: it makes the price a price rather than an absence of one, which pre-empts the "free means catch" reflex while still being literally free. Note the inconsistency with the promo strip: `$8.99/mo` (strip) versus `$8.99 a month` (hero) — abbreviated and spelled-out in the same viewport.

**Section headings mix merchandising and editorial voice** `[observed]`
`Read as many books as you can hear` · `Best of #BookTok` ·
`New genres that make you take the long way home` · `Only from Audible`

`New genres that make you take the long way home` is the standout editorial line — it names a *behaviour* the product causes (driving further to keep listening) rather than a feature. `Only from Audible` is the exclusivity claim, three words, no elaboration.

**Category labels** `[observed]`: `Literature & Fiction` · `Sci-Fi & Fantasy` · `Comedy & Humour` · `Mystery & Thriller` · `Romance` · `Children` · `Teen` · `Education` · `Self Development` · `Arts & Entertainment` · `Health & Wellness` · `Science & Engineering`

**Defect:** `Comedy & Humour` uses British spelling on a US marketplace, next to eleven US-spelled siblings. A single un-localised string in a category rail.

**Help-article introductions use a conditional-fit pattern** `[observed]`
> "If you like to listen to bestsellers and new releases, you might like this plan."

`you might like this plan` — hedged, second person, no superlative, inside a help article whose job is partly to sell. The plan articles open by describing **who the plan is for** rather than what it costs, which is the right order for a product with four overlapping plans.

**Category-page standfirsts are task inventories** `[observed]`
- `Plans & benefits`: "Learn about the different types of membership plans we offer and what benefits are included with each one."
- `Listening`: "Explore essential tips for listening across all devices, making the most out of your personal Library, using the player, and making your opinion about specific titles known."

The second one is a comma-run mapping one-to-one onto the five sub-groups below it — the same self-routing device the Wise exemplar records, but the phrasing degrades: "making your opinion about specific titles known" is a nine-word circumlocution for "reviewing".

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try for $0.00` | Homepage hero, trial signup flow | Price-as-zero framing |
| `Get this deal` | Promo strip | Deal, not product |
| `See all plans` | Promo strip, secondary | Comparison offered beside the push |
| `Start my free trial` | Desktop plan page | `[documented]` — **different wording from `Try for $0.00` for the same step** |
| `Start now` | App signup, twice in one flow | `[documented]` — appears at steps 4 and 5 of the same sequence |
| `Join` | App, unauthenticated | `[documented]` |
| `Sign in` / `Sign in with Amazon` | Global nav, auth strip | Parent-account dependency surfaced in the label |
| `Confirm your subscription` | Desktop signup | `[documented]` |
| `Buy now` | Extra-credit purchase, web | `[documented]` |
| `Buy Now` | Extra-credit purchase, Android | `[documented]` — **casing differs by platform in one article** |
| `Add to Library` | Included-catalog title, Premium/Plus | `[documented]` — the non-purchase acquisition verb |
| `Select as monthly title` | Standard plan monthly benefit | `[documented]` — a third acquisition verb |
| `Play` | Included-catalog title detail | `[documented]` |
| `Membership details` | Account nav, ~12 occurrences | `[documented]` — the entitlement hub |
| `Membership Details` | Return-a-title desktop steps | `[documented]` — **casing differs from the above in a sibling article** |
| `Credit summary` | Membership details sub-page | `[documented]` |
| `Purchase history` | Account nav | `[documented]` |
| `Listen History` | Desktop account nav | `[documented]` |
| `Listening History` | App profile | `[documented]` — **singular/gerund split for one concept across platforms** |
| `Listen Log` | Player, below cover art | `[documented]` |
| `Activity & Stats` | App profile section | `[documented]` |
| `Pause membership` | Membership details link **and** the confirm button | `[documented]` — same label for the entry point and the commit |
| `Pause your membership` | Trial-pause flow | `[documented]` — possessive variant in the same article |
| `Pause for 30 days` | Trial-pause confirm | `[documented]` |
| `Resume membership` | Paused-state account nav | `[documented]` |
| `Cancel membership` | Membership details link | `[documented]` |
| `Confirm cancellation` | Cancellation commit | `[documented]` — noun form, not "Yes, cancel" |
| `Switch plans` | Plan-change entry | `[documented]` |
| `Manage` | App membership tab | `[documented]` |
| `Details` | App membership section | `[documented]` — bare noun |
| `Return this title` | Purchase history row | `[documented]` — scoped to the row, not "Return" |
| `Remove` | Library, locked title, web | `[documented]` |
| `Remove from Library` | Library, locked title, app | `[documented]` — **web says `Remove`, app says `Remove from Library`** |
| `Included` | Site top nav, filter | `[documented]` — the entitlement filter as a one-word CTA |
| `Included in your membership` | App search filter | `[documented]` — long-form of the same filter |
| `Explore Audible` → `Plus Catalog` | Mobile-web menu | `[documented]` — **still the old catalog name** |
| `Contact us` | Help centre foot, every page | |
| `Chat now` | Help article foot, **only some articles** | Appears on `Return a title` and `Pause your membership`, absent from `Cancel membership` |
| `Call our Accessibility Specialist team` | Accessibility page | Names the team, not the channel |
| `Contact an Accessibility Specialist` | Accessibility page, feature card | |
| `Learn more about Audible on Alexa` / `Learn more about Whispersync for Voice` | Accessibility page | Fully specified `Learn more` |
| `Discover more great listens` | Accessibility page, collections | Uses the coined noun `listens` |
| `View all` | Accessibility page, bestseller rail | Bare |
| `Load more` | Help category listing | |
| `Change marketplace` | Global nav | Appears twice adjacently in the served markup |
| `Skip to Main Content` | Top of help DOM | Title-cased; `href="javascript:void(0);"` — see T14 |
| `Refresh` | JS error dialog | See T7 |
| `Share link` / `Download PDF` | Help article foot | Article-as-artefact affordances |
| `Like` / `Dislike` | Help article feedback | Paired with thumb icons |

**Observations.** The CTA set is large and internally inconsistent in a way that maps onto the entitlement model's complexity. There are **three distinct verbs for acquiring a title** — `Add to Library` (included catalog, Premium/Plus), `Select as monthly title` (Standard), and buying with a credit or cash — and the difference between them is the whole basis of what gets locked later. That the verbs differ is correct; that the *consequences* are only explained in a separate help article is the gap.

The trial-entry CTA is `Try for $0.00` on the homepage, `Start my free trial` on the plan page, and `Join` then `Start now` in the app — four labels for one funnel. And `Pause membership` serves as both the link that opens the flow and the button that commits it, which means the user clicks the same words twice with very different effect.

## T4 Onboarding & getting-started

**Getting started is a named help topic but the marketing onboarding is a single-step purchase** `[observed]`. There is no multi-step "how it works" sequence on the homepage; the flow is promo → `Try for $0.00` → Amazon sign-in.

**Signup is documented as a five-to-six-step sequence per surface** `[documented]`

Desktop trial:
1. Go to the Audible site.
2. Select the `Premium` plan.
3. Select `Start my free trial`.
4. Sign in with your Amazon account.
5. Select your payment method.
6. Select `Try for $0.00`.

Note step 5: **a payment method is collected inside a "free trial"**, and step 6 then re-labels the commit as `Try for $0.00`. The zero-price button appears *after* the card is attached. Recorded as an observation about sequencing rather than a defect — but the copy does not acknowledge the card requirement anywhere in the step list, and the trial disclosure ("After 30 days, your membership will automatically renew and you'll be charged the regular monthly price") sits above the steps rather than beside step 5.

**In-app signup discloses that it leaves the app** `[documented]`
> "**Note:** You will be taken out of the app momentarily and redirected to Audible.com to complete the enrollment."

"momentarily" is doing expectation-setting work on an app-to-web handoff most products perform silently. Good practice. The same note appears twice in one article for the two app paths.

**Trial terms are restated at every entry point** `[documented]` — the phrase "your membership will automatically renew and you'll be charged the regular monthly price after 30 days. You can cancel anytime from your Account details page" appears three times in the Premium article alone, once per signup path. Repetitive, but it means no path lacks the disclosure.

**Store-billing pre-emption inside onboarding** `[documented]`
> "If your membership is billed through Google Play or the Apple you will need to cancel from your App Store or Google Play Store settings at least 24 hours in advance."

Cancellation mechanics disclosed *during signup* — the exit is explained before entry. The `24 hours in advance` figure is specific. Defect: "the Apple" is a grammatical error, and it recurs verbatim in two places in the same article.

**Onboarding-as-checklist: the "Before you cancel" article is the strongest onboarding-adjacent artefact** `[observed]`, inverted — a **structured offboarding checklist**. Opening: "If you are thinking about canceling your Audible membership, take a moment to review this checklist. A few quick steps can help you make the most of your account before you go, and you might even discover a better option."

Three named checklists inside it:
- `Your cancellation credit checklist`
- `Your billing checklist`
- `Your pause checklist`

Each is three bullets. The possessive `Your … checklist` naming converts retention content into a service. "before you go" is a soft, non-blocking acknowledgement of the decision — no "Are you sure?", no guilt. This is a retention flow written as help content, and it is far more persuasive for it.

## T5 Form & field labels

Pre-auth forms are essentially absent (signup delegates to Amazon), so this section is thin and mostly `[documented]`.

**Selection controls in entitlement flows** `[documented]`

| Control | Values | Notes |
|---|---|---|
| Pause duration | `30`, `60`, or `90 days` | Three fixed options, no free entry |
| Trial pause duration | `Pause for 30 days` only | Single option, expressed as the button label |
| Extra credit quantity (app) | `1 credit`, `3 credits`, `5 credits` | Odd numbers only |
| Extra credit quantity (Amazon PDP) | `3 extra credits` | A fourth, different bundle on a third surface |

**Help-centre CSAT widget** `[observed]`
> `How satisfied were you with our Help Center today?`
> Scale: `Worst` `1 2 3 4 5 6 7` `Best`

A **seven-point scale with the poles labelled `Worst` and `Best`** — not "Very dissatisfied / Very satisfied", not a five-point Likert, not NPS. `Worst` as a scale anchor is unusually blunt and is the kind of label that suppresses mid-range honesty by making point 1 feel like an accusation. Recorded as a questionable choice. The trailing `today?` correctly scopes the rating to the session rather than the product.

**Article-level feedback** `[observed]`: `Did this answer your question?` → `Like` / `Dislike`. The question asks about *answering* (task success) while the buttons ask about *liking* (sentiment) — a mismatch between the prompt and the response vocabulary.

**Region/language selectors** `[observed]`: `Region: United States`, `Language: English` rendered as static labelled values at the foot of every help page; `Change marketplace` and `EnglishEspañol` (unspaced, as served) in the global nav.

**Search** `[observed]`: the help search placeholder is `Search`, and the empty-state affordance renders as the literal string `Search ""` — see T8.

## T6 Status & state language

**PRIORITY-ADJACENT SECTION.** Audible's state model has two axes that must be held simultaneously: **membership state** and **title state**. Almost every support article exists because those two axes interact.

### Membership states

| State | Vocabulary and gloss |
|---|---|
| `active` | "active Audible Premium member", "active membership (not paused or canceled)" |
| `in good standing` | A second, orthogonal condition — see below |
| `trial` / `Premium trial member` | A named state with its own pause rule (30 days only) and its own exclusions |
| `paused` | "on pause", "during your pause", `Resume membership` |
| `canceled` | "your membership has ended", "former Premium or Plus members" |
| `Legacy memberships` | Explicitly named: "Legacy memberships created prior to December 2005" |

`in good standing` is the notable one. It appears as a **separate eligibility condition from `active`** — "You must be an active Audible Premium member in good standing" and "Customers who cancel or fail to maintain their membership in good standing are not eligible to make returns." The phrase is never defined anywhere in the harvested set. An undefined entitlement-gating state is a real content defect: the user cannot determine whether they are in it.

**`former` as a state prefix** `[documented]` — "for former Premium or Plus members", "For former Audible Standard members". Audible writes about ex-members as a named cohort with residual, plan-specific consequences. Most products stop describing users at cancellation.

### Title states — the four-way entitlement grid

| Title state | How it is acquired | What ends it |
|---|---|---|
| **Purchased** (credit, credit card, or debit card) | `1 credit` badge, or cash | Nothing, except the title leaving Audible entirely |
| **Included** (Premium/Plus) | `Add to Library` | Membership ending or pausing, **or the title leaving the catalog** |
| **Monthly selection** (Standard) | `Select as monthly title` | Membership ending or pausing |
| **Locked** | — | Rejoining restores access |

The load-bearing sentence `[documented]`:
> "You can add included catalog titles to your Library and keep them **if your membership is active and the title remains in the included catalog.**"

Two conditions, both outside the user's control, expressed in one conditional clause. This is the honest version of "add to library".

**Named title-state labels** `[documented]`
- `1 credit` badge / `1 CREDIT` label — the purchase-eligibility marker. **Both casings appear**, in two articles.
- `Included until` — a label shown "next to the title on the title's detail page, the home screen, and the search results page" when a title is leaving the catalog within the next month. **This is the best state label in the file** (see T9/T10).
- `🔒 lock icon` — rendered as a literal emoji in the help copy, next to affected titles
- "the title is no longer available" — the in-product message on attempting to play a locked title
- "a title is no longer included in your membership" — the catalog-removal message

**The absence of a `1 CREDIT` label is itself a state** `[documented]`:
> "Titles without a **1 CREDIT** label are in the included catalog or already part of your Library."

A negative-space rule: the missing badge means one of two things, and the user must disambiguate. This is the kind of inference-by-absence that generates support volume.

### Listening progress states

`[documented]` from the Listen Log article — the richest progress vocabulary in the corpus for an audio product:

| Term | Meaning |
|---|---|
| `Listen Log` | "a day-to-day record of your listening activity for a particular title" — per-title session history |
| `Listening History` (app) / `Listen History` (web) | All titles listened to over time |
| `Listening Stats` | Aggregate stats, under `Activity & Stats` |
| `listening session` | The unit: "when you started listening, when you paused, and how long your listening session lasted" |
| `scrubber bar` | The position control, named in user-facing copy |
| `Page Sync` | Position sync between audio and text |
| `narration speed` | The playback-rate setting |
| `auto-play` | Named setting |
| `chapters and episodes` | Two structural units, one for books and one for podcasts, in a single article title |
| `Listening reminders` | Opt-in nudges |
| `listening challenges` | Gamified goals |
| `your last intentional listening section` | See below |

**`your last intentional listening section` is the single best progress phrase in this corpus.** Full context: "Using the Listen Log, you can get back to the starting point of your last intentional listening section."

The word *intentional* does enormous work. It concedes that playback position and **listening position are different things** — that the system's "where you are" is frequently not the user's "where I was", and that the gap is caused by ordinary life. The three enumerated causes are unusually candid:
- "you fell asleep while listening and the book advanced without you"
- "you went back to an earlier chapter to re-listen to something, but didn't note where you had left off"
- "you accidentally moved the scrubber bar in the player and the book is now in a different section altogether"

All three are written in the second person, past tense, as things the user did (or that happened to them) — the Wise "confession title" register applied to a progress feature. "the book advanced without you" personifies the book as having continued in the user's absence, which is exactly the felt experience and is far better than "playback continued".

The feature's stated purpose leads with the emotional case before the functional one: **"The Listen Log can help you find your place if you get lost."** *Find your place* is the bookmark metaphor carried into audio; *if you get lost* names the anxiety.

**Constraint disclosed twice** `[documented]`: "Listen Log data cannot be downloaded or exported" and "Listening History data cannot be downloaded or exported." A portability limitation stated plainly in two places rather than omitted.

## T7 Error, failure & recovery

**A live, user-visible JavaScript error on every help page** `[observed]` — the most significant negative finding in this file.

Every `help.audible.com` page served during this harvest rendered an error dialog above the content:

> Heading: `Sorry to interrupt`
> Body (variant 1): "This page has an error. You might just need to refresh it." followed by `[Cannot read properties of undefined (reading 'bind')]`
> Body (variant 2): `Uncaught TypeError: Cannot read properties of null (reading 'style')`
> Action: `Refresh` · dismiss control titled `Cancel and close`

Three separate problems. First, `Sorry to interrupt` is a Salesforce platform default, not Audible's voice, and it apologises for *interrupting* rather than for failing. Second, **a raw JavaScript exception string is rendered to consumers** — `Cannot read properties of undefined (reading 'bind')` is developer output leaking into a consumer help centre, and variant 2 has no friendly wrapper at all. Third, `You might just need to refresh it` is hedged to the point of uselessness ("might", "just") and the error recurred on refresh across all nine articles fetched. The dismiss control's accessible title is `Cancel and close` for a dialog with nothing to cancel.

This appeared on 9 of 9 help pages fetched, across two rendering dates in the served markup. It is not transient.

**`No articles found` rendered inside populated lists** `[observed]` — on both category pages, every sub-group's article list is followed by the literal string `No articles found`, immediately after five to ten articles. A template's empty-state string rendering unconditionally. A user reading `Plans & benefits` sees ten articles and then a statement that there are none. See T8.

**Failure-shaped article titles** `[observed]`

| Title | Grammar |
|---|---|
| `Title in Library is locked` | **Object + state**, no verb, no question |
| `Missing title issues` | Noun + `issues` |
| `Audio quality issues` | Noun + `issues` |
| `Credits issues` | Noun + `issues` — ungrammatical plural ("Credit issues" would be correct) |
| `Included catalog issues` | Noun + `issues` |
| `Sign up issues` | Noun + `issues` |
| `Library issues` | Sub-topic name |
| `List is only partly shared` | **Object + partial-failure state** |
| `Audible App Download Discontinued on Windows 11` | Title Case, passive, platform-scoped |

The `<noun> issues` pattern is applied with unusual consistency — six instances — and it is genuinely useful: it creates a predictable landing page per failure domain and gives the in-article cross-references a stable destination ("Learn how to troubleshoot credit issues if you have lost your credits, you want to buy extra credits, you don't know when your credits expire, or if you want to send or gift credits"). That cross-reference sentence is itself a pattern worth noting: **the link is preceded by an enumeration of the specific symptoms behind it**, so the user can self-select before clicking.

`List is only partly shared` is the best of the set — it names a **partial** failure state explicitly rather than treating sharing as binary.

**Pre-emptive failure copy placed above the instruction** `[documented]`

- `Return a title` opens with, before anything else: "Remember, you cannot return titles directly from the Audible app. You must use the website to initiate the return process."
- `Cancel membership` includes: "Note: Deleting the Audible app will not cancel a membership." — repeated verbatim in `Before you cancel`.
- Cancellation troubleshooting: "If you don't see the cancel option, verify that you're signed into the account with the active membership. If you still don't see the option to cancel, you might have multiple accounts. Please try signing in with a different email address."

That last one is the strongest recovery copy in the file: it diagnoses a **missing UI element** (the hardest thing for a user to troubleshoot), offers two ordered hypotheses, and names the second one as a likely root cause ("you might have multiple accounts") rather than blaming the user. "Deleting the app will not cancel a membership" pre-empts the single most expensive user misconception in subscription products, and it is stated twice.

**Recovery framed as restoration, not purchase** `[documented]`
> "**Important**: You will regain access to locked titles if you rejoin an Audible membership."

`regain` rather than "get" — the lock is framed as reversible and the user's prior state as recoverable. Paired throughout with the honest terminal case: **"If no purchase options are available, we no longer carry the title."** That sentence appears **four times** across three articles. It is the only genuinely unrecoverable state, it is stated in seven words with the company as the subject ("we no longer carry"), and it does not pretend to offer a remedy. Repeating it at every point where the user might hit it is correct.

## T8 Empty states

**`No articles found` rendered beneath populated lists** `[observed]` — the file's clearest empty-state defect. On `/s/plans-and-benefits` and `/s/listening`, each of the eight sub-group listings ends with the literal string `No articles found` directly after its articles. The template emits the empty-state string unconditionally rather than conditionally. Eight occurrences across two pages.

**`Search ""` as the search affordance's rendered label** `[observed]` — the help centre's search control serves as a list item reading `Search ""` (with empty quotation marks) before any query is entered. This is the same interpolation-with-empty-value failure the Wise exemplar records, but here it appears in the *pre-query* state rather than the no-results state: the UI is announcing a search for nothing. Present on all nine help pages fetched.

**Genuine empty-state copy, found in the entitlement layer** `[documented]`

Audible's real empty states are entitlement-driven rather than data-driven, and they are written as explanations:

| Situation | Copy |
|---|---|
| Locked title, membership ended | "you will see a message that the title is no longer available" |
| Title removed from catalog | "a message that a title is no longer included in your membership" |
| No purchase route exists | "If no purchase options are available, we no longer carry the title." |
| Credits gone after cancellation | "If you cancel your membership, you will lose your remaining credits." |

Each pairs the absence with a cause and, where one exists, a route. The pattern is **state + reason + remedy-or-honest-terminus**. The fourth is the honest terminus.

**Zero-credit state is addressed as an eligibility condition, not an empty state** `[documented]`:
> "you can buy extra credits if: … **You have no credits left.**"

Having zero credits is written as a *qualifying condition for a purchase*, which is a commercially-motivated framing of an empty state. The empty balance is the thing that unlocks the upsell.

**`Unused monthly selections don't roll over to the next month`** `[documented]` — from the Standard plan row. A pre-emptive statement about a benefit **expiring unused**, placed in the plan's own feature list rather than in the terms. Stating the non-rollover in the sales table is creditable.

**Regional empty state** `[observed]`, on the help home:
> "If you're based in Mexico, please visit our MX Help Center for the support that's right for you."

An out-of-scope state handled as a redirect with a reason ("the support that's right for you") rather than a block.

**Library, wish-list, and player first-run empty states** `[absent]` — behind auth.

## T9 Notifications & system messages

**Two product-rename banners, running simultaneously, in mid-migration** `[observed]` — the most interesting notification artefact in this file.

> On `Learn about the Plus Catalog`: "The name of our Plus Catalog is changing to the included catalog. You may see both names used while our site is updated. Nothing else has changed and your access to the catalog remains the same."
> On `Learn about the Audible Premium Membership`: "The name of our Premium Plus plan is changing to Premium. You may see both names used while our site is updated. Don't worry, nothing else has changed and your member benefits remain the same."

Structure, identical in both: **name is changing → you will see both names → nothing else changed → your entitlement is unaffected.** Four clauses, in the order of the user's likely anxiety. Conceding "You may see both names used while our site is updated" is the honest move most rebrands skip; it converts a consistency defect into a disclosed transition state.

Note the second adds `Don't worry,` and the first does not — the same template, one with a reassurance opener and one without. And note the rename genuinely has not landed: the global nav still says `Plus Catalog`, the mobile-web path is still `Explore Audible > Plus Catalog`, the Premium article body still says "Premium Plus monthly membership" and "stream all you want from the Plus Catalog", the returns page's social description still says "Audible Premium Plus members", and the plan table still lists `Audible Premium – 1 Credit`. The banner is doing real work because the migration is genuinely incomplete across at least five surfaces.

**`Included until` — a scheduled-loss label, shown in three places** `[documented]`
> "If a title is leaving the included catalog in the next month, we display an **Included until** label next to the title on the title's detail page, the home screen, and the search results page."

This is the strongest proactive-notification pattern in the file. Content loss is announced **a month ahead**, with a date, on the shelf itself — not by email, not in a settings page, but at the point of browsing and at the point of decision. The three named surfaces (detail page, home screen, search results) mean the warning follows the title rather than sitting in one place. Directly transferable to any product where an entitlement, offer, rate or coverage window is about to close.

**Credit-expiry email with a stated lead time** `[documented]`
> "You also get a monthly credit summary email that lets you know when you have credits expiring within 30 days."

A recurring notification whose trigger threshold (30 days) and cadence (monthly) are both disclosed in the help article, with a link to the notification-preferences page. Naming the threshold lets the user reason about whether they will be warned in time.

**Confirmation notifications named at the point of the action** `[documented]`
- Cancellation: "After you cancel, you'll get an email confirmation. Your membership status on your Membership details page will also reflect this change." — **two confirmation channels named**, one push (email) and one pull (status page), so the user knows where to verify.
- Linked-refund case: "This refund will be issued to your original payment method, and you will receive a notification when this action occurs." — an automatic, system-initiated removal of a title from the library is disclosed together with its notification.
- Returns: "After confirming your return, 1 credit will be added back to your account." — the restored balance stated in the instruction.

**Platform-native confirmation copy reproduced** `[documented]`
> "Confirm your purchase by double-pressing the Side Button." (iOS)
> "Confirm your purchase by selecting Buy Now and following the instructions." (Android)

Audible documents *Apple's and Google's* confirmation gestures inside its own help article, in italics. Useful, and the opposite of the Mozilla policy of never transcribing third-party steps — a defensible divergence given that the payment confirmation is the step most likely to strand a user.

**Regional and lifecycle banners** `[observed]`: the Mexico redirect (T8); `Audible App Download Discontinued on Windows 11` as a listed article; `Offer ends October 7, 2026 at 11:59PM PT.` in the promo strip.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** Audible's entitlement disclosure is the reason this product is in the corpus, and the `Before you cancel` article is the artefact.

### The keep/lose tables — a bilateral entitlement disclosure

`[documented]` The section heading is a direct question in the user's terms:
> `What do I keep vs. what do I lose when I cancel Audible?`
> "Understanding what happens after canceling your Audible membership helps you make an informed decision."

Then **two separate tables**, one headed `What you keep after canceling Audible` with a `✓` column, one headed `What you lose when you cancel Audible` with a `✗` column.

| ✓ What you keep | Detail (summarised) |
|---|---|
| `Purchased audiobooks` | Anything bought with a credit or card, available "as long as it's available on Audible" |
| `Unlimited re-downloads` | Re-downloadable any number of times, post-cancellation |
| `Your Audible account` | Stays active; full-price purchasing continues |
| `App Store / Google Play credits` | Don't expire, survive cancellation |

| ✗ What you lose | Detail (summarised) |
|---|---|
| `Unused Audible credits` | Forfeited at the end of the final billing cycle |
| `Included catalog access` | Unlimited listening ends; titles show a lock icon |
| `Member-only promotions` | Exclusive discounts and BOGO-type sales end |
| `Standard plan monthly selections` | Past monthly selections become inaccessible and lock |

Why this is the strongest pattern here. Most subscription products disclose loss (if at all) in a cancellation interstitial designed to deter. Audible publishes **both sides as symmetrical, glyph-marked tables in a public help article**, with the *keep* table first. Leading with what survives is both more reassuring and more accurate: the single most important fact about Audible's model is that credit-purchased titles are permanent, and putting that first means the loss table is read in context rather than as a threat. The word `forfeited` is used for credits — a deliberately strong verb, not softened to "will no longer be available".

Each loss row also carries its remedy or its consequence marker (`lock icon`), and the section closes with the restoration promise: "**Important**: You will regain access to locked titles if you rejoin an Audible membership."

### Credit disclosure — eight named credit types with individual expiry rules

`[documented]` The `Learn about credits` article contains a three-column table (`Credit type` / `Explanation` / `Expiration date`) covering:

| Credit type | Expiry |
|---|---|
| `Membership credit` | 12 months from issue, or upon cancellation |
| `Extra purchased credits` | 12 months from issue, or upon cancellation — **except** those bought in the iOS or Android app, which do not expire and survive cancellation |
| `Gift membership credit` | 12 months from issue, or upon cancellation |
| `App Store credit` | Do not expire |
| `Google Play Store credit` | Do not expire |
| `Complimentary credit` | 12 months from issue, or upon cancellation |
| `Special credit` | 12 months from issue, or upon cancellation |
| `Return credits` | 12 months from issue, or upon cancellation — **except** returns of App Store / Google Play purchases |

This is an exceptional disclosure artefact and an exceptional product-design problem. Eight named types, three distinct expiry behaviours, and the determining variable is **which storefront processed the original transaction** — a fact most users will not remember. Audible's response is to name each type, define it in one sentence, and state its rule in its own cell. That is the right content response to an irreducibly complex entitlement model: **when you cannot simplify the rule, tabulate it by name.**

The distinctions `Complimentary credit` ("from a special offer or as a courtesy") versus `Special credit` ("as part of a promotional offer") are, however, functionally indistinguishable in both definition and expiry — two named types with no user-visible difference. Recorded as over-decomposition.

**Additional credit rules, each stated as a bounded fact** `[documented]`
- "Credits cannot be gifted or transferred." — then immediately: "You can use credits to buy audiobooks as gifts." The prohibition and the workaround in adjacent sentences.
- "There is no limit to how many credits you can have on your account at once." — an explicit absence of a cap, stated rather than left silent.
- "Changing from a Premium to Standard plan will allow you to retain your credits, but they will keep their original expiration date." — the concession and its limit in one sentence, joined by `but`.
- Extra-credit eligibility is three simultaneous conditions: membership includes credits, no credits left, and "been on the same membership for at least 30 days".
- Two explicit exclusions: "Legacy memberships created prior to December 2005 and Audible Plus memberships aren't eligible" and "Members who are in their trial period aren't eligible to purchase extra credits at a discounted price."
- "Credits can't be used to purchase audiobooks with Amazon Music Unlimited."

**A direct contradiction between two articles** `[observed]` — recorded as the sharpest factual defect found:
- `Learn about credits`, Return credits row: "Credits you receive from returning a title that was purchased with an App Store credit or Google Play Store credit **do not expire**."
- `Return a title`, both platform sections: "Refunded credits will expire 12 months after being issued, **regardless of the original credit type**."

These cannot both be true. A user who returns an App Store purchase gets opposite answers from the credits article and the returns article. This is exactly the failure mode that eight-type entitlement models produce, and it is why the tabulation in one article is insufficient without single-sourcing across articles.

### Pause disclosure — three mutually inconsistent statements of one rule

`[observed]` The pause rule is stated three different ways within a single article and its metadata:

1. Social description: "You can pause your membership **once every 12 months**, for a period of up to 90 days."
2. Body opening: "You can pause your membership for a total of **up to 90 days every 12 months**."
3. `How often can I pause my Audible membership?`: "You can pause your monthly membership **up to 3 times** within a 12-month period as long as the total pause time doesn't exceed 90 days."

Statement 1 says once; statement 3 says up to three times. Statement 3 is evidently correct, since it is elaborated with a worked example ("3 x 30 days, 60 days + 30 days, or a single 90-day pause"). The social description — the string that appears in search results and link previews — carries the wrong rule. A user planning around "once every 12 months" will under-use a benefit they are entitled to.

**The pause clock is defined with unusual precision** `[documented]`: "Your 12-month period starts the day the membership resumes from its first pause." Defining the window's start relative to *resumption of the first pause* rather than to the calendar year or the billing anniversary is the kind of rule that must be stated or cannot be reasoned about. Paired with: "You're only eligible to pause after 30 days of paid membership."

**The promotional-period interaction — a disclosure most products would omit** `[documented]`
> "When you pause your membership, any reduced price promotional period continues to run and is not extended. Example: If you have a 3-month promotional offer and pause your membership after 30 days for 2 months, you'll be charged the full membership price when your membership resumes. The promotional period will have ended while your membership was paused."

A rule, then a **fully worked numeric example with the adverse outcome spelled out**. This is the single most user-protective disclosure in the file: the interaction between two benefits (promo pricing and pause) produces a trap, and Audible walks the user through the trap arithmetic rather than stating the rule abstractly. Transferable to any product where a promotional window and a suspension feature can overlap — BNPL deferral periods, interest-free windows, fee waivers.

**Per-plan pause-entitlement matrix** `[documented]` — a nine-row × three-plan table (`Audible Standard` / `Audible Premium` / `Audible Plus`) covering: listen to purchased titles, access to sales, member discount, purchase with cash, use existing credits, buy credit bundles / 2-for-1 deals, receive new credits, access to included/podcast catalog, access to monthly listens. Cells use `Yes`, `No`, `N/A`, `No (locked)`, `Yes (if carried over from a previous plan)`.

`No (locked)` as a cell value is good: it does not merely deny the benefit, it names the *state the user will observe*. `N/A` is used correctly to mean "this plan has no such benefit" as distinct from `No` meaning "suspended". And `Yes (if carried over from a previous plan)` encodes a historical dependency in a single cell.

### Returns — eligibility, and a frank statement of discretionary revocation

`[documented]` Eligibility is three simultaneous conditions:
- "You must be an active Audible Premium member in good standing."
- "You're making the return within **365 days** of its purchase date."
- "You purchased the title with an Audible credit."

Then the terms note, which is unusually direct about the company's discretion:
> "We reserve the right to limit the number of returns or revoke return privileges at our discretion. Based on your return history, the self-service refund option may not be available. Audible may cancel or modify the terms of our returns option with respect to any or all participants at any time. Customers who cancel or fail to maintain their membership in good standing are not eligible to make returns. **This return option doesn't affect any rights you have under consumer law.**"

Four sentences of unilateral discretion, then a statutory-rights backstop. The final sentence is the important one and is correctly placed last: it prevents the preceding discretion language from being read as a waiver. The word `privileges` (rather than "rights" or "options") frames returns as revocable by design.

The benefit is framed emotionally before it is bounded legally: "This option lets you return titles purchased in error **or explore different narrators and stories risk-free**" — and the social description adds "take a chance on a new narrator or story without losing a credit". Returns are positioned as a **discovery mechanism**, not a refund mechanism. That framing is why the discretionary-revocation language is necessary.

**Channel-locking disclosed** `[documented]`: "Returns may only be made through the same method in which you purchased the title." With a worked example naming both stores.

**Linked-product refund cascade** `[documented]` — the `Add Narration` case: buying an Audible title at a discount alongside its Kindle eBook links the two, and an eligible eBook return causes Audible to "automatically process a refund for the Audible title and **remove it from your Library**", refunded to the original payment method, with a notification. A disclosed automatic removal of content from a user's library, triggered by an action on a different product in a different store. Complex, and disclosed.

### Plan and pricing disclosure

`[documented]` A six-row plan table with price and benefits:

| Plan | Price | Key benefit language |
|---|---|---|
| `Audible Plus` | `$7.95/month` | Unlimited streaming from the catalog; "**Available only for current Audible Plus members**" |
| `Audible Premium – 1 Credit` | `$14.95/month` | 1 credit/month + unlimited catalog + exclusive sales |
| `Audible Premium – 2 Credits` | `$22.95/month` | 2 credits/month + same |
| `Audible Standard` | `$ 8.99 /month` | 1 audiobook/month from the entire collection; "Unused monthly selections don't roll over" |
| `Audible Premium Annual – 12 Credits` | `$149.50/year` | 12 credits at time of purchase |
| `Audible Premium Annual – 24 Credits` | `$229.50/year` | 24 credits at time of purchase |

`Available only for current Audible Plus members` is a **closed-to-new-joiners plan still listed in the pricing table** — a grandfathered tier disclosed rather than hidden. Good practice; mildly confusing placement.

**Pricing defect:** `Audible Standard` is `$ 8.99 /month` in this table (with stray spaces around the number) and `$9.99/month` in the `Before you cancel` comparison table, in the same help centre, both updated within seven weeks of each other. The homepage promo's go-to price is `$8.99/mo`. A one-dollar discrepancy in a published price across two support articles.

**Store-price disclaimer** `[documented]`: "If your subscription is billed through the Google Play or App Store, the price may differ from what's shown here. Payments are handled directly by Google or Apple." Audible disclaims its own published prices for two of its three billing channels — necessary, and correctly placed immediately below the table.

**Annual-plan value claim, reasoned rather than asserted** `[documented]`: "The best value comes from annual Premium plans… When you look at all these benefits together and compare the membership cost of an annual plan to a monthly plan, you get more for your money with an annual plan." A value claim with its reasoning exposed and no number attached — weaker than it should be (the arithmetic is available: $149.50/year versus $14.95×12 = $179.40) but honest in construction.

**Member-discount disclosure with variance acknowledged** `[documented]`: "Your member discount is applied automatically to every audiobook in our collection. The discount **varies by title**, so you'll save more on some audiobooks and less on others—**but you'll always pay less than the non-member price**." Claim → variance → floor guarantee. The Wise "claim, then bound the claim" pattern, executed well.

**Prime relationship stated as a negation first** `[documented]`: "Audible is **not** included with an Amazon Prime subscription. You will need to purchase a separate Audible membership. However, Prime members do get some Audible benefits." Denies the likely wrong mental model before describing the actual one — the same structure as the Wise "not an FDIC-insured bank" pattern.

**Cancellation-consequence copy, stated four times across three articles** `[documented]`: at the end of the final billing cycle, Premium members lose unused credits and member benefits including exclusive discounts and included titles. Restated in `Cancel membership` (twice), `Before you cancel`, and `Learn about the Audible Premium Membership`. The same fact, single-sourced in substance if not in wording — and the wording does drift ("lose access to all unused credits" / "will be lost" / "forfeited" / "you'll lose access to member benefits like exclusive discounts, included titles in the Plus Catalog, and credits").

## T11 Help-centre architecture

**Platform:** Salesforce Experience Cloud (`/s/` paths, `0TO4z...` topic IDs, `meta-x-sfdc-render-time` of 3.4–4.6 seconds). This shapes the content in visible ways: articles carry `Knowledge` as a type label, a `Related topics` tag chip row, a `Title` and `URL Name` field printed as body content, and the platform's own error and empty strings (see T7, T8).

**Three-level structure:** topic → sub-topic → article, with breadcrumbs (`Home > Plans & benefits > Benefits`). Two topic vocabularies coexist (T1).

**Article-title grammar — five consistent shapes**

| Shape | Examples |
|---|---|
| `Learn about <X>` | `Learn about credits`, `Learn about the Plus Catalog`, `Learn about Audible Plus`, `Learn about Read & Listen`, `Learn about immersion reading`, `Learn about Audible Rewards`, `Learn about sales & deals`, `Learn about Audible listening challenges` |
| `Manage <X>` | `Manage your Library`, `Manage your Lists`, `Manage your Wish List`, `Manage clips & notes`, `Manage your reviews`, `Manage Family Library Sharing`, `Manage App Store subscription`, `Manage Listening reminders`, `Manage your auto-play settings` |
| `<Imperative verb> <object>` | `Return a title`, `Cancel membership`, `Pause your membership`, `Restart your membership`, `Switch plans`, `Download titles`, `Share a title`, `Set narration speed`, `Use timer`, `Use Page Sync`, `Create a Kids Profile` |
| `View <X>` | `View listening log`, `View accompanying PDF`, `View your transaction history`, `View Your Listening Stats` |
| `<Noun> issues` / state | `Credits issues`, `Missing title issues`, `Title in Library is locked`, `List is only partly shared` |

This is a disciplined four-verb system — **Learn / Manage / View / (do)** — mapping cleanly onto understand / configure / inspect / act. It is more predictable than most help centres and lets a user infer an article's type from its first word. Two articles break it: `Before you cancel your Audible membership` (a clause, and the only one addressed as advice) and `Audible App Download Discontinued on Windows 11` (Title Case, passive).

**Casing is inconsistent within the system**: `View Your Listening Stats` (Title Case) beside `View listening log` (sentence case); `Manage your Library` beside `Manage Family Library Sharing`. `Learn about the Audible Premium Membership` is Title Case in the title but the slug is `learn-about-premium-plus` — the slug preserves the **pre-rename** name, so the URL is now a false friend.

**In-article structure is uniformly question-based** `[observed]` — every substantial article opens with a standfirst, then an `In this article:` anchor list of **first-person questions**, then one H2 per question. This is the FAQ pattern used as the article's spine rather than as a separate page type (see T12). The anchor list doubles as a scannable summary and as a routing device, and it is the reason these articles are usable despite their length.

**Per-article furniture** `[observed]`: date stamp (`Sep 3, 2026`), `Knowledge` type label, `Related topics` chips with a `+N` overflow (`AccountAndroidAsk A QuestionBenefitsCancel+6`), `Did this answer your question?` with `Like`/`Dislike`, `Back to top`, `Share link`, `Download PDF`, five `Related articles`, `Need more assistance?` → `Contact us` (and `Chat now` on some articles only), then the seven-point CSAT widget.

`Download PDF` on every article is worth noting — the help article is offered as a portable artefact, which matters for a product whose users include people who need offline or screen-reader-friendly formats.

**Routing furniture on the help home** `[observed]`: `How can we help you?` (search) → `Popular articles` → `Browse by device` → `Browse all topics` → `Need more help?` → `Contact us`.

The `Popular articles` list is the most revealing IA decision:
`Cancel membership` · `Pause your membership` · `Return a title` · `Learn about credits` · `Manage App Store subscription` · `Title in Library is locked`

**Four of six are exits or entitlement-loss recovery.** The help centre's own front page is organised around cancellation, suspension, refunds, and locked content. Ordered first is `Cancel membership`. Audible has chosen not to bury the exit — a company optimising for deflection would have led with `Learn about credits`. Recorded as a deliberate and creditable IA decision, and consistent with the 21-million view count.

**Escalation ladder**: self-serve search → popular → device → topic → `Contact us`, with `Chat now` appearing inconsistently and a **dedicated `Accessibility Specialist` phone line** as a separate, better-staffed path (T14). Human support exists and is reachable — unlike Firefox's peer-forum terminus.

## T12 FAQs

**There is no standalone FAQ page.** The FAQ is the internal structure of every help article — `[observed]` and unusually consistent.

**Verbatim questions from the credit article** (the entitlement core):

| # | Question (verbatim) |
|---|---|
| 1 | How can I use my credits? |
| 2 | Do Audible credits expire? |
| 3 | Where can I see my credits? |
| 4 | Can I buy more credits? |
| 5 | How much are Audible credits? |
| 6 | How can I check when my credits expire? |
| 7 | How many credits can I have? |

Answers summarised. Q1: usable in the app, on the site, or on Amazon; excluded for Amazon Music Unlimited purchases. Q2: twelve months from issue or at cancellation, whichever comes first, with the eight-type table as the real answer. Q3: three surfaces named (app profile, site header, credit summary page) with click paths. Q4: yes for active Premium members only, with three simultaneous eligibility conditions, three bundle sizes, three purchase surfaces, and two exclusion classes. Q5: declines to give a number and redirects to plan value. Q6: the credit-summary page shows per-credit expiry dates; a monthly email warns at 30 days. Q7: no limit.

Structural note: **Q2 and Q6 are the same topic split into "what is the rule" and "how do I check my instance of the rule"** — policy and personalisation as separate questions. That split is the right one for any entitlement with per-item dates, and most products collapse it into one unanswerable question.

**Verbatim questions from the cancellation article:**

| # | Question (verbatim) |
|---|---|
| 1 | How do I cancel my membership on the Audible site? |
| 2 | How do I cancel my Audible membership billed through Apple or Google? |
| 3 | What happens if I cancel? |
| 4 | Can I still access my Library when I cancel? |
| 5 | Do I keep my credits when I cancel? |
| 6 | Can I purchase titles after I cancel? |

Ordering analysis: mechanism (Q1–2), then consequence (Q3), then the three specific anxieties in descending order of likely importance — *my books* (Q4), *my credits* (Q5), *my future* (Q6). Q5's answer opens with the bare word **"No."** before any softening, then immediately offers the compensating fact ("Any title you get with a credit is yours to keep, though, so use your credits before the end of your final billing period"). Answering an adverse question with a one-word negative and then a usable remedy is better practice than hedging.

**Verbatim questions from the pause article:**

| # | Question (verbatim) |
|---|---|
| 1 | Can I put my membership on pause? |
| 2 | Can I put my membership on pause during my free trial? |
| 3 | What happens to my monthly listen if I pause my Audible Standard membership? |
| 4 | What happens when I pause my membership? |
| 5 | How often can I pause my Audible membership? |
| 6 | How do I resume my membership? |
| 7 | What happens if I cancel while my membership is paused? |

Q7 is the exceptional one: **the interaction of two lifecycle actions, asked as a question.** Cancelling *while already paused* is a compound state most products never document. Answer: not billed, benefits retained to the end of the current billing period.

Note that Q1 is phrased as a capability question ("Can I…") but answered with a procedure ("You can pause your membership by completing the following steps") — the question and the answer type are mismatched, which is why the actual eligibility rules end up in Q5 and in the notes.

**Verbatim questions from the included-catalog article:**

| # | Question (verbatim) |
|---|---|
| 1 | Why are some titles only included with membership? |
| 2 | How do I listen to the included catalog? |
| 3 | Why can't I play titles in the included catalog? |
| 4 | Is there a limit on how many included titles I can play? |
| 5 | Why are some titles no longer included? |

Three of five are `Why` questions about restriction. Q3 and Q5 both address *inability to play* but split by cause — membership state versus catalog state — which is exactly the disambiguation a user cannot make for themselves. Q4's answer is a flat "No." followed by an unusually emphatic elaboration ("as many audiobooks, podcasts, and Audible Originals as you want without restrictions").

**Verbatim questions from the locked-title and listening-log articles:**
`Why do I see locked titles in my Library?` · `What is the difference between purchased titles and included titles?` · `How do I remove a locked title from my Library?` · `What is the Listen Log?` · `What is the purpose of the Listen Log?` · `How do I find my Listen Log?`

`What is the purpose of the Listen Log?` as a distinct question from `What is the Listen Log?` is a small, good decision — definition and motivation separated, with the motivation answer carrying the three "you got lost" scenarios.

**Overall FAQ grammar:** first person singular throughout (`my credits`, `my Library`, `my membership`), present tense, and a heavy `Why can't I…` / `What happens if…` skew. The questions are written from inside the user's uncertainty about their own entitlement, which is the correct posture for this product.

## T13 Terminology & glossary

**PRIORITY SECTION.**

| Term | Audible's usage | The alternative it rejected |
|---|---|---|
| `credit` | The core entitlement unit: one credit = any title, any price | "token", "book allowance", "monthly pick" |
| `Membership credit` / `Extra purchased credits` / `Gift membership credit` / `App Store credit` / `Google Play Store credit` / `Complimentary credit` / `Special credit` / `Return credits` | **Eight named credit sub-types**, each with its own expiry rule | one undifferentiated "credits" balance |
| `credit balance` / `available credits` / `Credit summary` | Three names for the same figure on three surfaces | |
| `credit bundles` | Multi-credit purchase | "credit packs", "top-up" |
| `1 credit` badge / `1 CREDIT` label | The purchase-eligibility marker on a title | "Redeemable", "Member price" |
| `Premium selections` | The credit-eligible catalog | "premium catalog", "full catalog" |
| `included catalog` (formerly `Plus Catalog`) | The unlimited-streaming tier — **mid-rename** | "Plus Catalog", "streaming library" |
| `included titles` | Titles held under membership, not purchase | "streaming titles", "borrowed" |
| `Included until` | Scheduled-removal label with a date | "Leaving soon", "Expiring" |
| `monthly listen` / `monthly audiobook selection` / `monthly title` | **Three names for the Standard plan's single monthly entitlement**, all in one article | one name |
| `Select as monthly title` | The Standard acquisition verb | |
| `Add to Library` | The Premium/Plus included-catalog acquisition verb | "Borrow", "Save", "Stream" |
| `yours to keep` | The permanence formula, used ~8 times across articles | "you own it", "permanent licence" |
| `locked` / `🔒 lock icon` | Present-but-inaccessible title state | "unavailable", "expired", "removed" |
| `forfeited` | What happens to unused credits at cancellation | "lost", "expire" |
| `in good standing` | An **undefined** eligibility state gating returns | |
| `return privileges` | Returns framed as revocable | "return policy", "refund rights" |
| `Listen Log` | Per-title session history | "playback history", "position history" |
| `Listening History` / `Listen History` | All-titles history — **two names, app vs web** | |
| `your last intentional listening section` | The position the user meant to be at | "last playback position", "bookmark" |
| `scrubber bar` | The position control, named to users | "seek bar", "progress bar", "timeline" |
| `narration speed` | Playback rate | "speed", "playback speed" |
| `Page Sync` | Audio↔text position sync | |
| `Whispersync for Voice` / `Read & Listen` | **The same feature under two names** — the article is titled `Learn about Read & Listen` at slug `listen-with-whispersync-for-voice`, and the accessibility page uses the old name | |
| `immersion reading` | Simultaneous read-and-listen | |
| `listens` (noun) | Coined plural for audio works: "Discover more great listens", "libraries are full of listens" | "titles", "audiobooks" |
| `title` | The universal content noun, covering audiobooks, podcasts and Originals | "book", "item", "product" |
| `Audible Originals` | Exclusive commissioned content | |
| `Lists` (formerly Collections) | User-organised groupings — article slug is still `manage-collections` | |
| `Wish List` | Separate from `Lists` | |
| `clips & notes` | Saved excerpts and annotations | "bookmarks", "highlights" |
| `Kids Profile` | Sub-profile with its own four articles | "child account" |
| `Maven` | A named discovery feature/agent | |
| `Audible Rewards` | A loyalty programme (1,186 views) | |
| `marketplace` | The country storefront: `Change marketplace` | "region", "country", "store" |
| `2-for-1 deals` / `BOGO offers` | **Two names for the same promotion type** in adjacent articles | |
| `Accessibility Specialist` | A named human support role | "accessibility support agent" |

**The credit is the terminology decision the whole product rests on.** One credit buys any title at any retail price — Audible states this explicitly and repeatedly ("Each credit lets you choose any title in our library, regardless of its retail price — whether it's $20, $30, or even $40"). Naming the unit `credit` rather than "book" or "token" is what makes that price-blindness legible: a credit is a *currency*, so it can be earned, bought, bundled, refunded, expired and forfeited — and every one of those operations then needs its own name, which is how eight credit sub-types come into existence. The vocabulary is complex because the unit is a currency rather than a quantity.

**`yours to keep` is the load-bearing phrase of the entire entitlement model.** It appears in the credits article, the cancellation article, the returns-adjacent copy, the locked-title article, and the pre-cancellation checklist — always attached to credit- or cash-purchased titles, never to included titles. It is a non-legal formula (contrast "perpetual licence") that answers the user's actual question, and its **consistent scoping** is the discipline: Audible never says "yours to keep" about anything that can be taken away. The `Before you cancel` article escalates it to "yours for good" and "yours permanently" in the same section — three variants of one promise, which weakens the formula slightly.

**`locked` versus `removed`.** Audible keeps unavailable titles visible in the Library with a lock icon rather than removing them. The vocabulary follows: the title is `locked`, not "expired" or "gone", and access is `regained` on rejoining. Keeping the object visible and naming its state is both a retention device and an honest representation — the user's shelf reflects what they once had. The cost is that the Library now contains items the user cannot use, which is why `How do I remove a locked title from my Library?` exists as a question.

**Three names for one Standard entitlement** — `monthly listen`, `monthly audiobook selection`, `monthly title` — all within the pause article and the plan table. For the *single defining benefit* of a plan, this is a material naming failure. Compare the credit, which has one name and eight typed variants; the Standard benefit has three names and no types.

**Register split:** marketing says `Plus Catalog`, `Audible Originals`, `listens`; help says `included catalog`, `titles`, `included titles`; the plan table says `Premium selections`. The formal/legal register appears only in the returns terms (`privileges`, `at our discretion`, `consumer law`) and the footer (`License`, `Conditions of Use`).

## T14 Voice, tone & accessibility

**Published style guidance:** `[absent]`. No public Audible content style guide, voice-and-tone documentation, or design system was found. Everything below is inferred from the shipped copy.

### Observed register

**Person.** Second person for the user, first-person plural for the company, and first person singular in the FAQ questions — so a single article contains all three: "**I** cancel" (question) → "**You** can cancel" (answer) → "**We** reserve the right" (terms). The shift is consistent and functional: `I` for the user's question, `you` for the instruction, `we` for policy and constraint. `we` is used as the subject of adverse facts ("**we** no longer carry the title", "**We** reserve the right to limit the number of returns"), which is creditable — the company does not hide behind the passive at the points where it is withdrawing something.

**Tense and mood.** Present tense, imperative for steps, and a heavy use of **`will` for consequences** ("titles will be locked", "credits will be lost", "you will regain access"). The future tense is doing disclosure work: it marks statements about what happens after the user's action, distinguishing them from statements about the present.

**Contractions** used throughout, including in the terms ("don't roll over", "aren't eligible", "doesn't affect"). Register is conversational even in entitlement copy.

**Reassurance formulas, used sparingly:** `Don't worry, nothing else has changed` (rename banner), `Remember,` (pre-emptive constraints, twice), `Keep in mind that` (eligibility), `take a moment to review this checklist`, `before you go`, `we'll be happy to guide you to the right plan`. The register softens precisely where the content is about loss — which is the opposite of the Wise gradient (tone flattens as stakes rise) and is a defensible alternative when the stakes are emotional (my books) rather than financial.

**No exclamation marks** observed in the help centre. No `Oops!`. The one place the voice becomes enthusiastic is the pause article's "It's a great way to take a break from payments without canceling" — a self-assessment ("great way") inside an explanatory sentence.

**Emphasis via bold is used semantically, not decoratively** `[documented]`: UI element names are bolded in steps (`Select **Membership details**`), plan names and credit counts are bolded in the note (`**1 credit a month or 2 credits a month**`), and the key permanence fact is bolded in full (`**Any audiobook you get with your credits is yours to keep, even after you cancel.**`). One instance of bold markup breaking mid-word — `**purchas****e**  **made** **with credits**` — a copy-paste artefact rendered to users.

**Numbers are specific and load-bearing:** `12 months`, `90 days`, `30 days`, `365 days`, `24 hours`, `3 times`, `$0.99/mo for 4 months`, `11:59PM PT`, `20,982,295 Views`, `prior to December 2005`, `$20, $30, or even $40`. Almost every number in this file is a rule rather than a claim — the opposite of marketing numerology.

### Accessibility

**`Accessibility` is a top-level global nav item and a footer link** `[observed]` — present on every page in both positions.

**The framing is the strongest thing on the page** `[observed]`:
> "Audio storytelling is itself an accessibility tool. It's made resources and entertainment more accessible for people around the world. This has been true since the first recorded audiobook. We're committed to working on assistive technology advancements, evolving accessibility design guidelines and the issues that matter most to the disability community."

Opening with the claim that **the product category is itself assistive technology**, and grounding it historically ("since the first recorded audiobook"), earns the page the right to exist. Note the commitment sentence promises three things — technology advancement, evolving guidelines, and "the issues that matter most to the disability community" — without claiming conformance to any standard.

**Three named accessibility design principles, each a single imperative verb** `[observed]`

| Principle | Statement |
|---|---|
| `Listen` | "We design **with** people with disabilities, not **for** them. Our customers are the experts on their own lives, and their real experiences and insights shape the product decisions we make." |
| `Include` | "Accessible design is inclusive design. We meet people where they are by providing multiple ways to engage with our products because there's no single 'right' way to listen." |
| `Empower` | "We empower our listeners to reach their goals. We challenge assumptions and advocate tirelessly for what's possible so that every customer has the best experience." |

`Listen` as the name of the first accessibility principle is a genuine piece of craft: it is simultaneously the company's core verb, the user's core action, and the correct first principle of inclusive design. The with/not-for construction and "Our customers are the experts on their own lives" are the substantive commitments. `Include`'s "there's no single 'right' way to listen" — scare quotes around *right* — extends the principle from disability accommodation to format preference generally, which is how Audible justifies Whispersync, Alexa and immersion reading as accessibility features rather than conveniences. `Empower` is the weakest of the three: "advocate tirelessly for what's possible" and "the best experience" are unfalsifiable.

**A staffed human accessibility channel, with a documented call script** `[observed]`

> `Talk to an Accessibility Specialist` — "Accessibility Specialists can add titles to your Library, help you with using Audible, and more."
> `Here's how to reach us` → `Call our Accessibility Specialist team`
> "Request to be connected to the Accessibility Support team by **pressing option #1**."
> "Describe the accessibility issue or question you need help with."
> `Our specialists can assist with`: `Screen reader compatibility` · `App navigation` · `Alternative format requests` · `Other accessibility needs`

This is the best accessibility-support content pattern in the corpus. Three reasons. It names a **role** (`Accessibility Specialist`) rather than a queue. It states a concrete capability most products would never offer — specialists "can **add titles to your Library**", i.e. they will perform the task on the user's behalf if the interface is the barrier. And it gives the **IVR navigation step verbatim** (`pressing option #1`) plus a prompt for what to say, which removes the two hardest parts of using a phone channel. The four assist categories are scoped and end with a catch-all.

**Accessibility features are presented as features for everyone** `[observed]` — the section is headed `Features for everyone`, and the three cards are `Ask Alexa to play your next title`, `Listen while you read`, `Talk to an Accessibility Specialist`. Framing voice control and read-along as universal rather than assistive is the curb-cut argument made structurally rather than argued.

**Alt text is descriptive, scene-level, and identifies people without diagnosing them** `[observed]`

- "Person with long hair and beard holding phone and mug, looking away from phone, in front of wooden cabinets."
- "Person in read headphones and red sweatshirt with glasses looking at phone in front solid grey background."
- "Person in multicolored robe and ponytail smiling at phone in a kitchen setting."

These are genuinely good: gender-neutral (`Person`), behaviour-specific (`looking away from phone` — which is the point of the Alexa card), and environmentally situated. They also appear as `title` attributes duplicating the `alt` text, which causes double announcement in some screen readers — a common defect. And "Person in **read** headphones" is a typo for "red", published in alt text, which only screen-reader users will encounter.

**Content-collection accessibility work** `[observed]` — `Explore stories by and about people with disabilities`, with three curated collections: `DISABILITY AWARENESS Nonfiction & Memoir`, `Kids & Teens`, `Fiction`. The descriptions are careful: "Real-life accounts and the stories behind the disabilities"; "Fiction that features vibrant characters living with disability"; "Stories brought to life by disabled protagonists and supporting characters". `disabled protagonists` uses identity-first language while `people with disabilities` uses person-first — both appear on one page, which reflects genuine community disagreement rather than error, though an explicit note on the choice would be better. The framing sentence — "Our libraries are full of listens that probe what it means to be human from all perspectives, backgrounds, and abilities" — avoids inspiration framing.

**Accessibility defects and gaps**

- **No conformance statement.** No VPAT, no ACR, no WCAG or Section 508 claim anywhere on the accessibility page. Compare Firefox (156), which publishes a dated VPAT. Audible commits to "evolving accessibility design guidelines" without naming one.
- **`Skip to Main Content` is implemented as `href="javascript:void(0);"`** — a skip link that is not an anchor to a target. Present on every help page. This is a real keyboard-navigation defect on the pages a screen-reader user is most likely to need.
- **The persistent JS error dialog** (T7) sits above the content on every help page, injecting a modal-ish error region into the reading order, with a raw exception string as its body.
- **`Search ""`** (T8) exposes an empty interpolation as a link label.
- **Accessibility content is on audible.com, support is by phone, and the help centre has no `Accessibility` topic** — the twelve-topic Firefox help centre has one; Audible's six-topic taxonomy does not. A screen-reader user searching the help centre has no category to land in.
- The accessibility page's `meta-description` is the **generic site description** ("Download Audio Books from Audible. Start your Free Trial… 180,000+ downloadable Audible audiobooks by best-selling authors.") — the page about accessibility has no description of its own in search results.

### Negative findings, recorded honestly

- **Pause rule stated three incompatible ways** (once / up to 90 days / up to 3 times) in one article; the wrong version is in the social description
- **Return-credit expiry directly contradicted** between `Learn about credits` and `Return a title`
- **`Audible Standard` priced at `$8.99/month` in one help article and `$9.99/month` in another**
- `in good standing` used as a gating eligibility state and never defined
- Three names for the Standard plan's single benefit: `monthly listen` / `monthly audiobook selection` / `monthly title`
- Two names for one feature: `Read & Listen` (title) / `Whispersync for Voice` (slug, accessibility page)
- `Listening History` (app) vs `Listen History` (web) for one concept
- `Complimentary credit` and `Special credit` are functionally identical types
- `2-for-1 deals` and `BOGO offers` for one promotion type
- `Membership details` vs `Membership Details`; `Buy now` vs `Buy Now`; `Remove` vs `Remove from Library`; `1 credit` vs `1 CREDIT`
- Four labels for one trial funnel: `Try for $0.00` / `Start my free trial` / `Join` / `Start now`
- Help nav taxonomy and help grid taxonomy disagree on two of six items; breadcrumbs follow the grid
- Persistent JavaScript error with a raw exception string on 9 of 9 help pages
- `No articles found` rendered beneath eight populated article lists
- `Search ""` rendered as a link label
- `Skip to Main Content` bound to `javascript:void(0);`
- `Comedy & Humour` — British spelling in a US category rail
- "billed through Google Play or **the Apple**" — grammatical error, twice in one article
- `**purchas****e**  **made**` — broken bold markup rendered to users
- `$ 8.99 /month` — stray spaces inside a price
- `Plus Catalog` still in global nav and mobile-web path after the documented rename
- Article slug `learn-about-premium-plus` preserves the superseded plan name
- Alt text typo: "Person in **read** headphones"
- `Chat now` appears on some help articles and not others, with no evident rule
- `Change marketplace` rendered twice adjacently in the served nav markup
- The accessibility page inherits the site-wide generic meta description

---

## Transferable patterns

1. **When you cannot simplify an entitlement rule, tabulate it by name.** Eight named credit types × three expiry behaviours, in one table with a definition column and a rule column. Naming each variant gives support, product and users a shared referent. Condition: it only works if the table is the **single source** — Audible's own contradiction between the credits and returns articles shows what happens when the rule is restated in prose elsewhere. Directly applicable to PayPal balance types, promotional-credit mechanics, and refund-destination rules.
2. **Publish the keep/lose pair as symmetrical tables, and lead with *keep*.** `What you keep after canceling` before `What you lose when you cancel`, both glyph-marked, each row with its consequence and its remedy. Reframes a deterrence moment as an informed-decision moment, and the ordering means the loss list is read in context. Transfers to account closure, plan downgrade, protection-programme lapse, and subscription cancellation generally.
3. **Announce scheduled loss on the object, a month ahead, in three places.** `Included until` appears on the detail page, the home screen, and search results. Content leaving a catalog, an offer expiring, a rate window closing — surface the deadline where the user is deciding, not in a settings page or an email.
4. **State the interaction between two benefits, with worked arithmetic.** "When you pause your membership, any reduced price promotional period continues to run and is not extended" plus a three-sentence numeric example ending in the adverse outcome. Any product where a promotional window and a suspension, deferral, or hold feature can overlap needs this paragraph, and needs the example rather than just the rule.
5. **Separate policy from instance: "does it expire?" and "when does *mine* expire?" are two questions.** Audible splits `Do Audible credits expire?` from `How can I check when my credits expire?`, and routes the second to a per-item date page plus a 30-day warning email. Essential for anything with per-item dates — vouchers, points, guarantees, holds.
6. **One consistent permanence formula, scoped with discipline.** `yours to keep` is applied to purchased titles and **never** to included titles. The value is entirely in the consistency of the scoping. Pick one phrase for "this cannot be taken away", and never let it drift onto things that can.
7. **`locked`, not `removed`.** Keep the unavailable item visible with a named state and a restoration path ("You will regain access… if you rejoin"). Honest about history, and reversible by construction. Condition: you must also answer "how do I get rid of it", which Audible does.
8. **Name the position the user *meant* to be at.** "your last intentional listening section", and the three candid reasons they lost it (fell asleep, re-listened, nudged the scrubber). Concedes the gap between system state and user reality — the Wise "complete but not arrived" insight applied to progress. Transfers to any resumable flow: partially completed applications, abandoned carts, multi-session onboarding.
9. **Put the exit first in the help centre, and publish the view count.** `Cancel membership` is the first popular article and is viewed 21 million times. A help IA that hides the exit does not reduce cancellations, it reduces successful ones. Publishing counts also turns the knowledge base into a public demand signal a content team can act on.
10. **Offboarding as a named checklist, not an objection.** `Your cancellation credit checklist` / `Your billing checklist` / `Your pause checklist`, opening with "take a moment" and "before you go". Retention content written as service content, with no dark-pattern friction.
11. **Concede a rename in progress.** "You may see both names used while our site is updated. Nothing else has changed and your access remains the same." Four clauses in order of the user's anxiety. Converts an inconsistency defect into a disclosed transition, and buys the migration time.
12. **Name a support *role* and publish its IVR step and its capabilities.** `Accessibility Specialist`, reachable by "pressing option #1", who "can add titles to your Library". Naming what the human will *do for you* — not just that they exist — is what makes a support channel usable by someone the interface has already failed.
13. **A four-verb help-title system.** `Learn about` / `Manage` / `View` / bare imperative, mapping to understand / configure / inspect / act. Predictable enough that a user infers the article type from the first word. Cheap to adopt, and Audible's two exceptions prove it holds.

## Caveats & gaps

- **The membership/pricing page body was not retrievable.** `https://www.audible.com/ep/memberships` returned global nav, promo strip and footer only; the plan cards, comparison table and their disclosures are client-rendered. All plan pricing in this file comes from the `Learn about the Audible Premium Membership` and `Before you cancel` help articles — which is why the `$8.99` / `$9.99` Standard discrepancy could be observed but not adjudicated. `/ep/memberbenefits` and `/mk/b/benefits` were referenced by the help articles but not fetched.
- **Recorded as partially blocked, not blocked:** help.audible.com served content on every request, but always beneath a JavaScript error dialog, and category listings showed signs of incomplete hydration (`Loading`, `Load more`, `No articles found`). Some sub-group listings may be truncated relative to what a browser would render.
- **All in-product UI is `[documented]`.** The player, Listen Log, Library, credit summary, Membership details, purchase history, and every lock icon and `Included until` label are described by help articles, never observed. This is the dominant limitation on T5, T6 and T8.
- **Listening *progress* copy is the thinnest part of a section the brief prioritised.** The Listen Log article gives excellent conceptual and diagnostic language but almost no literal UI strings — no "N hours left", no percentage-complete format, no `Finished` / `In progress` badge names. `View Your Listening Stats` and `Learn about Audible listening challenges` were identified but not opened; both would likely carry the numeric progress vocabulary. A significant remaining gap.
- **`Learn about the Audible Standard Membership` and `Learn about Audible Plus` were not opened.** Standard's benefit is described only second-hand through the pause, cancel and Premium articles — which is precisely where the three-names problem (`monthly listen` / `monthly audiobook selection` / `monthly title`) was detected, so the primary article may resolve or worsen it.
- **`Switch plans`, `Restart your membership`, `Credits issues`, `Manage your Library`, `Manage Family Library Sharing` not opened.** Plan-change credit-retention rules, and the whole Family Library Sharing entitlement layer, are unexamined.
- **No Audible-specific privacy notice exists to harvest.** `Privacy Policy` and `Cookies` resolve to amazon.com; `Interest-Based Ads`, `Your ads privacy choices`, `Conditions of Use` and `License` were not fetched. T10 therefore covers entitlement and commercial disclosure only, not data disclosure.
- **No status page found.** No `Service status` or `System status` link appears in the global nav, help nav or footer. Marked `[absent]`.
- **No published content style guide or design system found** for Audible or for Amazon's audio properties. T14's voice analysis is entirely inferred from shipped copy.
- **Search behaviour untested.** The help search field was not exercised, so the no-results string is unknown — only the pre-query `Search ""` defect was observed.
- **en-US only.** An `EnglishEspañol` toggle and a `Change marketplace` control exist; the Mexico help centre is referenced but not visited. Credit rules are known to vary by marketplace and none of that variation is captured.
- **Mobile app strings unharvested** beyond what help articles quote, and the app is where the Listen Log, progress UI and most of the listening experience live.
- **View counts are point-in-time** and were read from server-rendered markup; they are used here as relative signals, not audited figures.

## Sources

1. https://www.audible.com/
2. https://www.audible.com/ep/memberships — **partially blocked (body client-rendered)**
3. https://help.audible.com/s/
4. https://help.audible.com/s/plans-and-benefits?language=en_US
5. https://help.audible.com/s/listening?language=en_US
6. https://help.audible.com/s/article/learn-about-credits?language=en_US
7. https://help.audible.com/s/article/learn-about-premium-plus?language=en_US
8. https://help.audible.com/s/article/learn-about-the-plus-catalog?language=en_US
9. https://help.audible.com/s/article/cancel-membership?language=en_US
10. https://help.audible.com/s/article/before-you-cancel-your-audible-membership?language=en_US
11. https://help.audible.com/s/article/pause-your-membership?language=en_US
12. https://help.audible.com/s/article/return-a-title?language=en_US
13. https://help.audible.com/s/article/title-in-library-is-locked?language=en_US
14. https://help.audible.com/s/article/view-listening-log?language=en_US
15. https://www.audible.com/ep/accessibility
