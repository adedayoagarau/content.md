# 143. Disney+

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Family SVOD / bundled multi-service streaming aggregator (Disney+, Hulu, ESPN, HBO Max, NFL+) |
| Primary URL | https://www.disneyplus.com/ |
| Corpus rank | 143 |
| Benchmark strength (source list) | Profiles and parental controls |
| Locale / market observed | en-US (`meta-locale: en-us`, `U.S. residents only`, MPA/TV Parental Guidelines rating badges) |
| Platform observed | Web (marketing, plan comparison, bundle landing, legal shell) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated financial/health product. Visible regimes: **COPPA** (a dedicated `Children's Online Privacy Policy` promoted to the primary footer on every page), US state privacy laws (`Your US State Privacy Rights`, `Your Privacy Choices` — **broken link, see T10**), FCC closed-captioning complaint route (`Closed Captioning` in footer), MPA + TV Parental Guidelines rating badges, `18+ only.` age gate on the ESPN add-on |
| Harvest date | 2026-09-21 |
| Pages inspected | 7 attempted / 4 usable |
| Harvest completeness | **Partial — help centre blocked.** `help.disneyplus.com` is a Salesforce Experience Cloud site rendered entirely client-side; the index and both article URLs attempted returned metadata-only bodies with zero content. The `Subscriber Agreement` page is likewise a client-rendered shell. **The brief's priority section (T10 parental controls) is therefore reconstructed from marketing copy only** — the profile-type and PIN article bodies are unreachable. Four commercial/marketing pages were fully retrieved and are unusually rich for T10 plan disclosure. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (primary marketing) | https://www.disneyplus.com/ | Hero, `Top 10 in the US today` (with rating badges), plan comparison, `Watch the way you want` feature list incl. the parental-controls block, 9-question FAQ, full footer |
| Plans & Pricing | https://www.disneyplus.com/welcome/filter-plans | Sortable/filterable plan cards, add-on selection, 3-question FAQ, footnote apparatus |
| Bundle landing | https://www.disneyplus.com/welcome/disney-hulu-espn-bundle | Same plan comparison widget, **different prices** (see T10), 9-question FAQ under a different heading |
| Subscriber Agreement | https://www.disneyplus.com/legal/subscriber-agreement | **Shell only** — legal nav rendered, agreement body client-side. Blocked. |
| Help Centre index | https://help.disneyplus.com/ | **Blocked** — metadata only, no body |
| Parental controls article | https://help.disneyplus.com/article/disneyplus-parental-controls | **Blocked** — metadata only, no body |
| Error codes article | https://help.disneyplus.com/article/disneyplus-error-codes | **Blocked** — metadata only, no body |

Additionally attempted: `help.disneyplus.com/article/disneyplus-content-ratings` — fetch aborted (timeout).

---

## T1 Navigation & IA labels

**There is no global navigation.** `[observed]` The header on every marketing page is a Disney+ logo and one CTA: `LOG IN` (all caps). No products menu, no pricing link, no help link, no search. Like Netflix (142), the unauthenticated surface is a pure funnel — but Disney+ goes further: even the language switcher sits in the footer rather than the header.

**Footer is the entire IA — six groupings, ~50 links** `[observed]`

| Grouping (verbatim) | Contents |
|---|---|
| `Learn More` | `Privacy Policy` · `Children's Online Privacy Policy` · `Your US State Privacy Rights` · `Subscriber Agreement` · `Your Privacy Choices` · `Interest-Based Ads` |
| `Helpful Links` | `Watch Super Bowl LXI` · `Explore Disney+` · `Disney+ Perks` · `New Releases` · `What to Watch` · `Help Center` · `Supported Devices` · `About Us` · `Closed Captioning` · `Gift Disney+` · `Disney+ Partner Program` |
| `Bundles` | `Disney+ Student Discount` · `Bundle Options` · `Disney+, Hulu Bundle` · `Disney+, Hulu, ESPN Unlimited Bundle` · `Disney+, Hulu, HBO Max Bundle` · `NFL+ Premium and RedZone` · `Compare Plans & Pricing` |
| `Brands` | `Disney` · `Pixar` · `Marvel` · `Star Wars` · `National Geographic` |
| `Collections` | `All Collections` · `Musicals` · `Critically Acclaimed` · `Sports` · `Disney Shorts` · `Documentary` · `Pride` · `Princesses` |
| `Movies & Shows` | 10 named titles |

Three observations.

**`Learn More` as the label for the legal grouping** is the notable choice — six privacy and contract documents filed under a phrase normally used for marketing curiosity. Compare Netflix's flat ungrouped footer and Spotify's `Legal`. `Learn More` softens a compliance block into an invitation, which is either good tone or category-mislabelling depending on your view; for findability it is poor, because a user hunting for the subscriber agreement will not scan for "Learn More".

**`Brands` is a first-class IA level.** Five franchise labels promoted to the footer above content categories. Disney+ is organised by *rights-holder*, not by genre — which is the structural inverse of every other SVOD in this set. `Collections` (genre/theme) sits *below* `Brands`.

**`Closed Captioning` in the primary footer**, separately from any accessibility statement — this is the FCC-mandated closed-captioning contact route, surfaced as a standalone footer link. Netflix does the same via `Legal Notices`; Disney+ names it directly.

**Page-level IA is section-headed, not navigable** `[observed]`. The plan page uses a `Sort:` control with three options — `Recommended` · `Best Savings` · `Price: Low to High` — plus a `Filters` affordance. A **sortable plan list** rather than a static comparison table is unusual for a three-tier product; Disney+ needs it because it sells 11+ distinct plan/add-on permutations.

**Section headings observed** `[observed]`: `New and upcoming from Disney+ and Hulu` · `Top 10 in the US today` · `Choose your plan` · `Available Add-Ons` · `Looking for more?` · `Enjoy for Free From ESPN` · `Watch the way you want` · `Get the Disney+, Hulu, HBO Max Bundle` · `Get the Disney+, Hulu, ESPN Unlimited Bundle` · `Plans & Pricing` · `Select Add On`.

**Defect** `[observed]`: the FAQ block carries **two different headings on two pages** — `Frequently Asked Questions` (homepage) and `Answers to your questions` (bundle page) — for substantially the same question set. And the plan page uses a third, none at all, just the questions.

## T2 Value proposition & headline patterns

**There is no hero headline.** `[observed]` The homepage opens with a logo image and goes straight into `New and upcoming from Disney+ and Hulu` — a carousel of title artwork. No value proposition sentence, no price, no tagline, no CTA above the fold in server HTML. The positioning lives only in the `<meta description>`: "Disney+ is the streaming home for Disney, Hulu, ESPN, Pixar, Marvel, Star Wars, Nat Geo, and so much more."

That is a significant finding. Compared with Netflix's `Unlimited movies, TV shows, and more / Starts at $8.99. Cancel anytime.` and Spotify's rotating-noun hero, **Disney+ has delegated its entire value proposition to catalogue artwork and brand recognition.** The first words on the page are the names of other people's franchises.

**The plan page does have a headline** `[observed]`, and it is two lines:

> `Plans & Pricing`
> `Find your perfect bundle*`

Note the asterisk **inside the subhead**, on a four-word line. The disclosure apparatus begins in the H2.

**Bundle framing is arithmetic, not emotional** `[observed]`. Every plan card leads with two numbers in a fixed pair:

> `Price: $11.99/month‡‡`
> `Monthly savings when you bundle: 50%‡‡`

`Monthly savings when you bundle` is the repeated frame — savings is presented as a *property of bundling* rather than of the plan. And it is stated as a percentage first, with the dollar comparison only in the footnote. Percentage-first framing makes the 50%/52%/42%/41%/35% figures scannable as a ladder, which is what a sort-by-`Best Savings` control needs.

**Feature framing — heading repeated, then body** `[observed]`. The `Watch the way you want` list has a structural defect: each item's heading is rendered **twice**, once alone and once concatenated with its body text:

> `### Discover the all-new Disney+ Perks`
> `### Discover the all-new Disney+ PerksGet excited! Disney+ Perks has landed. Enjoy special discounts…`

This duplication appears on all six items, on both the homepage and the bundle page — a template bug that doubles every feature heading in the accessibility tree and in any text extraction.

The six feature headings: `Discover the all-new Disney+ Perks` · `Access all of ESPN's networks & services` · **`Set parental controls`** · `Watch on multiple devices at once` · `Stunning visuals and sound` · `Stream Hulu and ESPN on Disney+ with an eligible plan`.

`Set parental controls` is the only imperative in the set — the other five are noun phrases or gerunds. Parental control is the one feature framed as **an action the user takes** rather than a thing they receive.

**Tone marker** `[observed]`: `Get excited! Disney+ Perks has landed.` — the only exclamation mark and the only colloquialism (`has landed`) on the marketing surfaces. It sits in the Perks block, immediately above the parental-controls block, which is written completely flatly. A register gradient inside one list.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `LOG IN` | Header, every page | All caps |
| `SELECT` | Every plan card (×10+) | All caps. **The only purchase CTA.** Never `Subscribe`, `Get`, `Start`, or `Try` |
| `Add to plan` | ESPN Unlimited add-on | Sentence case — **inconsistent with the all-caps `SELECT` beside it** |
| `Bundle` | NFL+ Premium add-on | A noun used as a button label |
| `Get The Bundle` | ESPN bundle promo block | **Title Case with capitalised `The`** — a third casing convention |
| `Learn More` | Disney+ Perks block | |
| `Terms apply` / `Terms Apply` | Beneath most priced blocks | **Two casings of the same link on the same page** |
| `Additional terms apply` / `Additional Terms Apply` | ESPN and NFL+ footnotes | Same inconsistency again |
| `See full terms on page` | Student-discount card | A fourth disclosure-link variant |
| `Select Add On` | Add-on section label | Not a button — a section header written as an imperative |
| `Sort:` `Recommended` / `Best Savings` / `Price: Low to High` | Plan page | |
| `Filters` | Plan page | |
| `Compare Plans & Pricing` | Footer | |
| `Explore Disney+` / `What to Watch` / `New Releases` | Footer | Three discovery entry points, no stated difference |
| `Gift Disney+` | Footer | Brand name as verb object |
| `Watch Super Bowl LXI` | Footer, first `Helpful Links` item | A single event promoted above `Help Center` |

**Observations.** `SELECT` is the single most striking choice here. Disney+ has **one purchase verb across eleven plan permutations**, and it is the most neutral word available — no urgency, no trial framing, no price implication. With this many permutations that is probably correct: any commercially-loaded verb would be wrong for at least some cards. But it also means the highest-intent moment on the site is labelled with a word borrowed from form controls.

The casing is genuinely chaotic: `LOG IN` / `SELECT` (caps), `Add to plan` (sentence), `Get The Bundle` (title, capitalised article), `Terms apply` vs `Terms Apply`, `Additional terms apply` vs `Additional Terms Apply`. Five conventions, one page.

`Watch Super Bowl LXI` as the **first** item in `Helpful Links`, above `Explore Disney+` and `Help Center`, is a merchandising override of a utility navigation block.

## T4 Onboarding & getting-started

`[absent]` on the reachable surfaces. There is no "how it works", no step counter, no numbered sequence. Signup begins at `/identity/sign-up` or `/commerce/cadence` / `/commerce/billing`, all behind the `SELECT` CTA and not harvested (would require entering the purchase flow).

The nearest thing to onboarding guidance is inside two FAQ answers `[observed]`:

**Account-linking sequence** (`How and where can I access ESPN on Disney+?`), a four-bullet unnumbered list:
- `Open the Disney+ app or website`
- `Choose the ESPN icon on the Disney+ homepage to enter the ESPN hub`
- "You can also find select ESPN content by using the Search feature or by browsing the different rows on the Disney+ homepage."
- "Once you're in the ESPN hub, you can filter through Sports, Teams, Leagues, and Tournament pages."

Then a conditional escape: "Not sure if your accounts are linked? You can learn about how you can authenticate with your pay-tv provider here." — `authenticate with your pay-tv provider` is unglossed industry jargon (TV Everywhere auth) dropped into consumer FAQ copy.

**Signup branch by customer state** (`How do I sign up for a bundle plan?`): "**Awesome, excited to have you on board!** If you are a new subscriber, click the sign up button above… If you are an existing subscriber, you may be eligible to upgrade or switch to a different plan."

Two things: the answer opens with an exclamation of enthusiasm before answering, and it branches on new-vs-existing — but the existing-subscriber path resolves only to "you may be eligible" plus a link to the Help Center home (not to a specific article). The upgrade path is the weakest routing on the site.

## T5 Form & field labels

`[absent]` — no form fields are present on any reachable page. There is no email capture, no search input, no plan configurator field. The `Sort:` and `Filters` controls are the only interactive labels, and `Filters` has no visible options in server HTML.

Compare Netflix (142), which puts a single `Email address` field in the hero. Disney+ collects nothing pre-auth.

## T6 Status & state language

**Plan and entitlement states are the only state vocabulary reachable** `[observed]`:

| State language | Copy evidence |
|---|---|
| `(With Ads)` / `(No Ads*)` | Rendered **inside the plan name** — `Disney+ (With Ads)`, `Disney+ Premium (No Ads*)`. The asterisk is part of the plan name. |
| `Reg. monthly or 6 month plan options` | Two billing cadences named in a table row |
| `Regular monthly or 6-month price lock plans available.` | The same concept, different wording, same page — `price lock` appears here and nowhere else |
| `Effective at the end of billing period.` | The cancellation state transition, as a footnote |
| `Switch or cancel** anytime.` | `switch` and `cancel` as the two terminal actions |
| `new subscriber` / `existing subscriber` | The branch in the signup FAQ |
| `eligible` / `Valid for eligible subscribers only` | The recurring entitlement gate |
| `linked` (accounts) | "Subscribers with any linked ESPN plan can now stream live content" / "Once accounts are linked" / "Not sure if your accounts are linked?" |
| `hub` | An in-product content region gated by entitlement — `the Hulu hub`, `the all-new ESPN hub`, `the ESPN hub` |
| `livestream experience` | The surviving state of a withdrawn feature — "ABC News will remain available as a livestream experience" |

**`hub` is the most interesting state noun.** It names *a region of the app that exists whether or not you can use it*: "Access the Hulu hub on the Disney+ homepage to **preview** the Hulu on Disney+ experience" for non-bundle subscribers, versus "you can stream a more extensive collection" for bundle subscribers. So the hub is a permanently-visible container whose contents vary by entitlement — an upsell surface disclosed as a navigation concept. Directly comparable to Netflix's `lock icon` (142) but architecturally larger: Netflix marks individual unavailable titles; Disney+ ships a whole entitlement-gated section.

**Feature-withdrawal state, given its own FAQ** `[observed]`:

> **`What happened to Streams?`**
> "In the U.S., Playlists are replacing Streams, while ABC News will remain available as a livestream experience."

A one-sentence answer covering a rename, a replacement, and a carve-out. Like Wise's `Why can't I set up guaranteed rate transfers anymore?`, this is a product **documenting the removal of a capability** in its consumer FAQ — rare and good. The answer is thin (no migration guidance, no date) but the question exists, which is the harder decision.

**Download entitlement disclosed as variable, not boolean** `[observed]`: `Downloads††` where the footnote reads "Download restrictions vary across bundled services." So the feature matrix shows a checkmark whose meaning differs per service, and the footnote admits it rather than flattening it.

## T7 Error, failure & recovery

**`[absent]` — blocked.** `help.disneyplus.com/article/disneyplus-error-codes` returned a metadata-only body; the article title implies a code library exists but **no code, no error title, and no recovery step was observed**, so none is recorded. No error strings appear anywhere on the marketing surfaces.

This is the single largest gap in the file and the reason `Harvest completeness` is marked Partial. An authenticated or browser-rendered pass against `help.disneyplus.com` is required.

**One recovery-adjacent artefact on a reachable surface** `[observed]`: the `Subscriber Agreement` page renders its own legal sub-navigation (`Subscriber Agreement` · `Disney Terms of Use` · `Privacy Policy` · `US State Privacy Rights Notice` · `Your Privacy Choices` · `Children's Online Privacy Policy` · `Help` · `Closed Captioning` · `Supported Devices` · `Gift Disney+` · `About Us` · `Disney+ Partner Program` · `Interest-based Ads`) under the H1 `Legal` — and then **no agreement text at all**. A legal page that renders its chrome and not its contract is a failure state in itself, and one with contractual implications if a user is directed there to review terms.

Note also that this legal sub-nav uses `Interest-based Ads` (lowercase `based`) while the homepage footer uses `Interest-Based Ads` (capitalised), and `Help` versus `Help Center` — the same link set, relabelled between two templates.

## T8 Empty states

`[absent]` — none reachable. The `Filters` control on the plan page has no options and no result-count in server HTML, so a zero-result state could not be triggered.

One adjacent observation `[observed]`: `Enjoy for Free From ESPN` on the bundle page is a **free-content shelf shown to non-subscribers** — a populated-rather-than-empty state for an unentitled user, filled with ten free ESPN titles (`The Rich Eisen Show`, `SportsCenter+`, and eight named games/shows). Same technique as Netflix filling cold-start with popularity: the unentitled view is stocked rather than blank.

## T9 Notifications & system messages

`[absent]` for in-product notifications — all post-auth and the help centre is blocked.

**Two marketing-surface system messages** `[observed]`:

- A recurring page-foot line, on every page: `Content and platform availability may vary by region.` — a standing availability caveat rendered as site furniture rather than a footnote, immediately above the copyright line.
- `© 2026 Disney. All Rights Reserved.` and, inside individual promo blocks, `©2026 Disney and its related entities.` and `HBO Max ©2026 Home Box Office, Inc.` — **per-block copyright attribution**, because the page merchandises three companies' catalogues. Three copyright lines on one page is a rights-management artefact showing through the content layer.

**No status page found** `[observed]` — nothing in the footer or elsewhere points to a service-status or incident surface.

## T10 Disclosures, legal & compliance — **PRIORITY SECTION**

### The footnote apparatus

`[observed]` This is the defining content artefact of Disney+'s public surface, and it is worth recording in full because of its scale. **Nine distinct footnote markers** are in simultaneous use on a single page:

`*` · `**` · `^` · `^^` · `†` · `††` · `‡` · `‡‡` · `****`

Their bindings, on `/welcome/filter-plans`:

| Marker | Binds to |
|---|---|
| `*` | `Terms Apply` for the Bundle and the HBO Max Bundle |
| `**` | `18+ only.` + ESPN Select vs Unlimited scope + blackouts + "Additional features and functionalities available only in the ESPN App and on ESPN.com" |
| `^` | "Savings compared to the regular monthly price of each service." |
| `^^` | NFL+ Premium eligibility, device restriction, territory exclusion |
| `†` | "Ads will be served in select live and linear content. ESPN Unlimited includes ads." |
| `††` | "Download restrictions vary across bundled services." |
| `‡` | "Live Sports on HBO Max has select games and blackouts." |
| `‡‡` | The 6-month promo arithmetic and cancellation timing |
| `****` | "Ads will be served in select live and linear content." (on the homepage) |

And the markers **do not bind consistently across pages**. On the homepage, `^` carries the 6-month promo arithmetic that `‡‡` carries on the plan page; `****` carries the ad disclosure that `†` carries on the plan page. A user who reads the same plan table on two URLs is following two different footnote keys.

This is the negative lesson of the file: when a product sells eleven permutations of four services, the footnote system becomes the primary disclosure surface, and at nine markers it has exceeded what a reader can hold. The **same page** carries `*`, `**`, and `****` — a reader must count asterisks to find their caveat.

### The price inconsistency

`[observed]` **The most serious defect found in this harvest.** The same plans are priced differently on three pages of `disneyplus.com`, retrieved within minutes of each other on 2026-09-21:

| Plan | Homepage FAQ | `/welcome/filter-plans` | `/welcome/disney-hulu-espn-bundle` FAQ |
|---|---|---|---|
| `Disney+ (With Ads)` | **$12.49/month** | — | **$11.99/month** |
| `Disney+ Premium (No Ads*)` | **$21.49/month** or **$214.99/year** | — | **$18.99/month** or **$189.99/year** |
| `Disney+, Hulu Bundle Premium` | **$21.99/mo** (FAQ) | **$19.99/month** | **$19.99/mo** |
| `Disney+, Hulu, HBO Max Bundle (With Ads)` | **$21.99/month** | **$19.99/month** | **$19.99/month** |
| `Disney+, Hulu, HBO Max Bundle (No Ads)` | **$34.99/month** | **$32.99/month** | **$32.99/month** |
| `Hulu + Live TV, Disney+ and ESPN Select` | **$99.99/month** | — | **$89.99/month** |
| `Hulu Premium + Live TV, Disney+ Premium and ESPN Select` | **$109.99/month** | — | **$99.99/month** |

Seven plan prices disagree across pages, by $2–$10/month. The homepage plan-comparison *widget* also disagrees with the homepage's own *FAQ* on the HBO Max bundle ($21.99 in the widget-adjacent FAQ, $19.99 in the plan card on `/filter-plans`). And the 6-month promo footnote is internally inconsistent on the homepage, reading "Cost for Disney+, Hulu Bundle Premium for 6 months: **$107.94**, then renews to monthly plan at **$19.99**/month" while the adjacent table row shows the premium bundle at `$21.99 / month`.

I record this as observed fact without inferring the cause (stale cache, A/B test, page-level CMS drift, or a partial price change mid-rollout are all plausible). The content-design finding stands regardless: **a product that sells eleven permutations across three landing pages, with prices hard-coded into FAQ prose as well as into plan tables, will drift.** Price should be one source of truth rendered once; here it is duplicated into free-text FAQ answers on at least three pages.

### Ad-supported tier framing

`[observed]` Disney+ uses the **most explicit ad-tier naming of the three SVOD products in this set**: the ad state is inside the plan name, in parentheses, on every reference.

`Disney+ (With Ads)` · `Disney+ Premium (No Ads*)` · `Disney+, Hulu, HBO Max Bundle (With Ads)` · `Disney+, Hulu, HBO Max Bundle (No Ads)` · `Disney+, Hulu, ESPN Unlimited Bundle Premium` (ads state in the footnote) · `ESPN Unlimited (With Ads)`

Compare Netflix `Standard with ads` (lowercase, no parentheses, tier-name-integrated) and Spotify, which never names its ad tier commercially at all.

**But `No Ads` carries an asterisk**, and this is the disclosure that matters:

> `*Ads will be served in select live and linear content.`

and, expanded on the ESPN block:

> `**Ads will be served in select live and linear content for all Disney+ plans. Titles without ratings like live sports, news, and more, and the advertisements included therein, may feature mature themes, products, and services.*`

So `(No Ads*)` means *no ads in on-demand movies and series*, and the asterisk carries the exception for live and linear content. Netflix makes the identical carve-out in prose ("Ad-free experiences don't have commercial breaks in TV shows and movies, but they can have other types of commercial content"); Disney+ makes it in a footnote attached to the plan name. Netflix's version is more readable; Disney+'s is more prominent, because the asterisk travels with the name everywhere it appears.

The second sentence of that footnote is the more important one, and it is doing double duty — it is simultaneously an **ad disclosure and a content-maturity disclosure**, which is a compression worth noting: unrated live content means both unpredictable ads *and* unpredictable content.

**Feature-negative framing** `[observed]`: the plan comparison row reads `Movies and series without ad breaks******` — the benefit is phrased as the *absence of ad breaks* and is scoped to `Movies and series`, pre-empting the live/linear exception in the row label itself. That is better than `No ads` as a row label, and it is a genuinely transferable construction: **scope the negative claim in the label, not only in the footnote.**

### Cancellation wording

`[observed]` Three variants across the reachable pages:

1. Plan-widget subhead: `Use the drop-down menu to compare plans.* Switch or cancel** anytime.` — with `**` resolving to `Effective at the end of billing period.`
2. Promo footnote (full): "**Cancel anytime. If cancelled during the initial 6 month term, effective at the end of your 6 month term; if cancelled after initial term, effective at the end of your monthly billing period.**"
3. Plan-card bullet: `Regular monthly or 6-month price lock plans available.`

Variant 2 is the substantive one and it is doing something most products omit: it states that **cancelling inside a promotional term does not end the term**. You cancel, and you keep paying (or keep the service) until the 6-month period closes. That is a materially important consequence of the price-lock offer and it is disclosed — in a footnote, in a semicolon-joined sentence, behind a `‡‡`.

`Switch or cancel** anytime.` is the headline claim; the footnote is where "anytime" gets its meaning. Classic claim-then-bound, but unlike Wise the bounding is not adjacent — it is at the bottom of the page under a two-character marker.

**Spelling defect** `[observed]`: `cancel` (US) in the headline, `cancelled` (double-L, en-GB/Commonwealth) in the footnote, on a page whose `meta-locale` is `en-us` and which states `U.S. residents only`. The same sentence contains both spellings of the concept twice: "Cancel anytime. If **cancelled** during the initial 6 month term… if **cancelled** after initial term…"

### Parental-control and content-rating disclosure

**This is the brief's priority for 143, and the article-level content is blocked.** What follows is everything observable, and it is thinner than the section deserves. All of it comes from a single marketing block.

**The parental-controls block, in full** `[observed]` (`Watch the way you want` › `Set parental controls`):

> `Set parental controls`
> "With ESPN on Disney+, take control of which profiles can access **titles without ratings** like live sports, news, and more. Personalize the viewing experience for each **streamer** on Disney+ with **parental controls**, **content rating filters**, **PIN-protection**, and **Junior Mode**."
>
> "Note that ESPN includes regular TV broadcasts that may include mature commercials and content. **Manage access for each profile in Parental Controls.**"

**Four named mechanisms** `[observed]`, and these are the only parental-control terms observable:

| Term (verbatim) | What can be said about it from observed copy |
|---|---|
| `parental controls` / `Parental Controls` | Used both as the generic category (lowercase) and as a **named in-product settings location** (capitalised, "Manage access for each profile in Parental Controls") in adjacent sentences |
| `content rating filters` | The rating-ceiling mechanism. Plural `filters`. No labels, thresholds or behaviour observable. |
| `PIN-protection` | Hyphenated compound noun. **No PIN copy, no prompt string, no scope (profile-level vs account-level) observable.** |
| `Junior Mode` | A named profile/experience type. **No definition, age range, or capability list observable anywhere on the reachable surfaces.** |

`Junior Mode` is the product's distinctive profile-type coinage and I can record only that it exists and is listed fourth in a four-item list. Its relationship to `content rating filters` and to profiles — whether it is a profile type, a toggle, or an experience — **cannot be determined from observed content** and is not inferred here.

**The `titles without ratings` disclosure is the strongest observable artefact in this section** `[observed]`. It appears twice, in two registers:

- Marketing: "take control of which profiles can access titles without ratings like live sports, news, and more"
- Footnote: "Titles without ratings like live sports, news, and more, and the advertisements included therein, may feature mature themes, products, and services."

`titles without ratings` names an **entire content class defined by the absence of a rating**, and then treats that absence as a parental-control axis in its own right. This is a real content-design problem solved well: a family SVOD that adds live sports and news inherits content that no ratings body has classified, so the maturity ceiling cannot apply to it. Rather than hide the hole, Disney+ names the class, gives parents a switch for it, and discloses the two risks separately — the content (`mature themes`) and the advertising (`products, and services`). The phrase `and the advertisements included therein` is legalese, but it is legalese pointing at something real.

The second sentence of the block is the honest one: "**Note that ESPN includes regular TV broadcasts that may include mature commercials and content.**" A family brand stating that part of its catalogue is unfiltered linear TV.

**`streamer` as the noun for a viewer** `[observed]`: "Personalize the viewing experience for each **streamer** on Disney+". Not `viewer`, `profile`, `member`, or `family member`. `streamer` in 2026 consumer copy primarily denotes a *broadcaster* (Twitch/YouTube), so using it for a *consumer* is at best ambiguous and at worst backwards. Recorded as a terminology risk.

**Content-rating labels observed on the browse surface** `[observed]` — not from a ratings article (blocked) but from the `Top 10 in the US today` shelf, where each title card renders its rating inline with year and genre:

`PG-13` · `G` · `PG` · `TV-G` · `TV-MA`

So five US labels are confirmed in use (MPA film ratings `G`, `PG`, `PG-13` and TV Parental Guidelines `TV-G`, `TV-MA`), rendered as part of the card metadata string. **No rating-explanation copy, no glosses, no banding, and no locale variants were observable** — the entire explanatory layer that Netflix (142) publishes is in the blocked help centre. `TV-MA` appears on the public unauthenticated homepage of a family-branded service, alongside four `G`-rated Toy Story titles, with no accompanying explanation.

**Defect** `[observed]`: title-card link text is **duplicated** — `Star Wars: The Mandalorian and GroguStar Wars: The Mandalorian and GroguPG-132026•Action and Adventure, Science Fiction`. The title renders twice, then the rating, year and genres concatenate without separators. Every one of the ten cards does this. For a screen-reader user the rating badge is delivered as part of an unpunctuated run beginning with a doubled title.

### Other compliance findings

**`Your Privacy Choices` has a broken link** `[observed]`. On both the homepage and `/welcome/filter-plans`, the footer renders:

> `[Your Privacy Choices](< >)`

The `href` is a literal `< >` — an empty or placeholder value. This is the CCPA/CPRA-mandated opt-out link, required to be a functioning mechanism, and on the reachable surfaces it resolves to nothing. On the `Subscriber Agreement` page the same item renders as **plain text with no link at all**. Three renderings of a mandated control, none of them a working link in server HTML. (A client-side handler may attach on hydration; that was not verified. Recorded as observed in server HTML.)

**COPPA posture** `[observed]`: `Children's Online Privacy Policy` is a **top-level footer item on every page**, listed second in the `Learn More` group, immediately after `Privacy Policy`. For a family-first brand this placement is correct and notable — Netflix and Spotify have no equivalent standalone child-privacy link in their footers.

**Age gate on an add-on** `[observed]`: the ESPN Unlimited footnote opens `**18+ only.` — a hard age restriction on a purchasable add-on inside a family service, disclosed in a footnote.

**Bundle-service boundary disclosures**, repeated verbatim across pages `[observed]`:
- `†Select Hulu content available via Disney+; additional content only available via Hulu app.`
- `‡HBO content available on Hulu; additional content only available via HBO Max app.`
- `‡Live Sports on HBO Max has select games and blackouts.`
- "Access content from each service separately."
- "Additional features and functionalities available only in the ESPN App and on ESPN.com, and do not require purchasing through ESPN."
- "live local & primetime NFL+ Premium games available on phones & tablets only. **Not available in U.S. territories.**"
- "For personal and non-commercial use only. Blackouts and other terms & restrictions apply."

The recurring word is `select` — `select Hulu content`, `select HBO Max content`, `select live and linear content`, `select live ESPN College Football games`, `select tours`. It appears **nine times** across the two plan pages as the universal quantifier-hedge. It is doing enormous work and conveys almost nothing: the user cannot tell whether `select` means 5% or 95%. Compare Netflix's `a small number are not` / `the vast majority are available`, which at least bounds the magnitude.

**Internal product codenames leaking into public content** `[observed]`. Image alt text and URL parameters expose the internal plan taxonomy:
- Alt text: `Duo Bundle` · `Trio Logo` · `Max Bundle Logo` · `Disney+ Hulu ESPN Flagship` · `Aurora`
- URL params: `package=disney_duo_basic` · `package=disney_duo_premium` · `pref=espn_unlimited_bundle_premium` · `productType=MAX_ADS_BUNDLE` · `productType=FLAGSHIP_BUNDLE` · `pref=disney_bundle_trio_basic`

So the public-facing names (`Disney+, Hulu Bundle`, `Disney+, Hulu, ESPN Unlimited Bundle`) map to an internal `duo` / `trio` / `flagship` / `basic` / `premium` scheme that surfaces in alt text (read aloud by screen readers) and in shareable URLs. `Flagship` in particular is an internal positioning word, not a customer word. And `basic` persists in the URL for a plan Disney+ no longer calls Basic — the same discontinued-name problem Netflix discloses explicitly (`The Basic plan has been discontinued`) and Disney+ leaves in its query strings.

## T11 Help-centre architecture

**`[absent]` — blocked.** `help.disneyplus.com` is a client-rendered Salesforce Experience Cloud site. Three URLs were attempted (index, `disneyplus-parental-controls`, `disneyplus-error-codes`); all returned metadata-only bodies. A fourth (`disneyplus-content-ratings`) timed out.

What can be recorded about the help IA comes only from **link targets on the marketing pages**, which reveal a two-level `category` / `article` URL scheme and the following slugs `[observed]`:

- `help.disneyplus.com/article/disneyplus-downloads`
- `help.disneyplus.com/article/disneyplus-devices-supported`
- `help.disneyplus.com/article/disneyplus-introduction` (labelled `About Us`)
- `help.disneyplus.com/article/disneyplus-closed-captioning-inquiries` (labelled `Closed Captioning`)
- `help.disneyplus.com/article/disneyplus-access-espn-unlimited`
- `help.disneyplus.com/article/disneyplus-disney-bundle`
- `help.disneyplus.com/category/the-disney-bundle/`
- Legacy scheme also present: `help.disneyplus.com/csp?id=csp_article_content&article=devices-supported` and `&article=introduction`

Two findings from the slugs alone. First, **every article slug is prefixed `disneyplus-`** on its own domain — `disneyplus.com/article/disneyplus-downloads` — a redundant namespace that suggests a shared multi-brand help platform (Hulu/ESPN likely share the instance). Second, **two URL schemes coexist**: the modern `/article/<slug>` and a legacy ServiceNow-style `/csp?id=csp_article_content&article=<slug>`, both live and both linked from current pages (the `Subscriber Agreement` footer uses the legacy form while the homepage footer uses the modern form for the same two articles, `devices-supported` and `introduction`). A help-centre migration is visibly incomplete in the production footer.

`About Us` pointing at an article slugged `introduction`, and `Closed Captioning` pointing at `closed-captioning-inquiries`, are both cases of the **label and the slug describing different things** — the label names the topic, the slug names the support intent.

## T12 FAQs

**Three FAQ blocks across three pages, with overlapping but non-identical question sets and two different headings.** `[observed]` Answers are present in server HTML on all three.

**Homepage — `Frequently Asked Questions`, 9 questions**

| # | Question (verbatim) |
|---|---|
| 1 | What is ESPN Unlimited? How is it different from ESPN Select (formerly ESPN+)? |
| 2 | What is Disney+ and how much does it cost? |
| 3 | What can I watch on Disney+ and where can I watch Disney+? |
| 4 | What are the different bundle plans available and how much do they cost? What additional plan offerings can I choose from? |
| 5 | How and where can I access Hulu titles on Disney+? |
| 6 | How and where can I access ESPN on Disney+? |
| 7 | What are Playlists on Disney+? |
| 8 | What happened to Streams? |

**Bundle page — `Answers to your questions`, 9 questions** — Q1, Q5(variant), Q6, Q7, Q8 shared with the homepage, plus:

| Question (verbatim) |
|---|
| What are the different bundle plans available and how much do they cost? |
| How do I sign up for a bundle plan? |
| What content can I watch with the bundle plans? |
| How and where can I watch bundle content? |
| What are the other additional plan options available and how much do they cost? |
| What Hulu content can I stream on Disney+? |

**Plans page — no heading, 3 questions**

| Question (verbatim) |
|---|
| What are the different Disney+ plans and how much do they cost? |
| What add-ons are available? |
| What movies and shows are available on Disney+? |

**Structural notes.**

**Compound questions are the house style.** Four of the observed questions contain two questions joined by `and` or stacked as two sentences: `What is Disney+ and how much does it cost?` · `What can I watch on Disney+ and where can I watch Disney+?` · `What are the different bundle plans available and how much do they cost? What additional plan offerings can I choose from?` · `How and where can I access ESPN on Disney+?`. Q4 on the homepage is **two full sentences in one accordion label**. Wise uses compound questions deliberately to pair an expectation with its exception; Disney+ uses them to compress an over-large question set, which is a different and weaker use — the answers then have to serve two intents and Q4's answer runs to three numbered plan families.

**Question 1 on the primary marketing page is about ESPN.** The first FAQ a prospective Disney+ customer reads is a disambiguation of two ESPN product names, one of which has been renamed (`ESPN Select (formerly ESPN+)`). The Disney+ product itself is question 2. That ordering tells you where the support load is: the bundle taxonomy, not the service.

**`What happened to Streams?` is the best question in the set** — a feature-withdrawal FAQ, phrased in the past tense from the user's position, with no euphemism. (See T6.)

**`What are Playlists on Disney+?` answer is worth noting for structure**: it defines the object ("a curated collection of movies and episodes grouped around a theme, franchise, character, genre, or mood"), states the benefit, then names the **controls that survive** the continuous-play behaviour — "let the content play continuously, **with the flexibility to pause, skip and rewind**." Restriction-then-residual-capability, the same construction Netflix uses for ad breaks and paused memberships.

**Defects in the FAQ layer.** Prices are hard-coded into FAQ prose on all three pages and **disagree with each other and with the plan tables** (see T10). Q3's answer also contains an unglossed internal phrase — "Select live sports, studio shows, and more from ESPN Select in the **all-new ESPN hub** in Disney+" — where `hub` is used before the FAQ that explains hubs. And the bundle page's answer to `How do I sign up for a bundle plan?` opens `Awesome, excited to have you on board!`, a tonal outlier in an otherwise flat FAQ set, in an answer that then fails to route existing subscribers anywhere specific.

## T13 Terminology & glossary

| Term | Disney+'s usage | The alternative it rejected |
|---|---|---|
| `Junior Mode` | A named restricted experience/profile type (definition not observable) | "Kids profile" (Netflix), "Kids mode" |
| `content rating filters` | The maturity-ceiling mechanism, plural | "Maturity Rating" (Netflix), "age limit" |
| `PIN-protection` | Hyphenated noun for the PIN gate | "Profile Lock" (Netflix) |
| `titles without ratings` | A content class defined by absent classification — live sports, news | "unrated content", "live content" |
| `streamer` | **The viewer** — "each streamer on Disney+" | "viewer", "profile", "member" |
| `hub` | An entitlement-gated in-app content region: `the Hulu hub`, `the ESPN hub` | "section", "tab", "channel" |
| `Playlists` | Continuous-play curated collections; replaced `Streams` | "channels", "linear channels" |
| `Streams` | The withdrawn predecessor, named in its own FAQ | — |
| `livestream experience` | The surviving format for ABC News | "live channel" |
| `Disney+ Perks` | Subscriber benefits programme | "rewards", "loyalty" |
| `(With Ads)` / `(No Ads)` | Ad state as a parenthetical inside the plan name | `with ads` integrated into the tier name (Netflix) |
| `Premium` | The no-ads modifier, applied compositionally: `Disney+ Premium`, `Bundle Premium`, `Hulu Premium + Live TV` | a distinct tier name |
| `Bundle` | The product noun, capitalised, inside plan names | "package", "plan" |
| `select` | The universal quantifier-hedge — 9 uses | "some", "certain", or an actual bound |
| `eligible` | The universal entitlement hedge — `eligible plan`, `eligible subscribers`, `eligible country`, `Eligible bundle subscribers` | — |
| `Brands` | Top-level footer IA level for franchise owners | "Studios", "Channels" |
| `price lock` | The 6-month fixed-price cadence — used once, on one card | "introductory price", "promotional rate" |
| `linear content` | Broadcast-schedule content, in the ad footnote | "live TV", "broadcast" |
| `Flagship` / `duo` / `trio` / `basic` | **Internal codenames**, leaked via URL params and alt text | — |

**`titles without ratings` is the standout coinage** and the most transferable item in this file. Naming a content class by the *absence of a classification*, and then making that absence a user-configurable axis, solves a real problem for any product that mixes classified and unclassified inventory. Applies well beyond streaming — to marketplaces mixing verified and unverified listings, or to content platforms mixing moderated and unmoderated surfaces.

**`select` and `eligible` are the two words to avoid.** Between them they appear 15+ times across two pages, and neither ever resolves to a number, a list, or a checker. Netflix's `plan compatibility` checker and Wise's `Feature availability checker` are what these hedges should route to; Disney+ routes them to nothing.

**Register split:** marketing says `Set parental controls` and `PIN-protection`; the footnote says `and the advertisements included therein`. Consumer imperative and contract Latinate in adjacent sentences.

## T14 Voice, tone & accessibility

**Person and tense.** Second person imperative in feature headings (`Set parental controls`, `Access all of ESPN's networks & services`); second person in FAQ questions written as the user (`What can I watch`, `How do I cancel`); first-person plural almost absent — Disney+ rarely says `we`. The company is not a visible actor in this copy. Compare Netflix (`we ask for feedback`, `Netflix Customer Service can't assist`) and Spotify (`We'll place a temporary authorization hold`). Disney+'s disclosures are written in the **passive or agentless voice**: `Ads will be served in select live and linear content.` · `Blackouts and other terms & restrictions apply.` · `Content and platform availability may vary by region.` · `Terms Apply.`

`Ads will be served` is the emblematic construction — future passive, no agent. Nobody serves the ads; they will be served.

**Register.** Overwhelmingly flat and commercial. Two exceptions, both exclamatory and both in the same voice: `Get excited! Disney+ Perks has landed.` and `Awesome, excited to have you on board!`. Both appear adjacent to entirely unornamented compliance prose. There is no consistent brand voice detectable on the unauthenticated surfaces — which, for the most voice-forward brand portfolio in entertainment, is itself the finding. The copy is written by a commerce team, and the Disney voice lives entirely in the artwork.

**Numbers.** All commercial: prices, percentages (`Save 50%`, `Save 52%`, `Save 42%`, `Save 41%`, `Save 35%`), `95+ live TV channels`, `over 16%`, `savings of more than $13 per month`, `savings of $21 per month`. No trust-signal numbers (no subscriber counts, no catalogue size). The `Save X%` ladder is the page's primary persuasive device and it is rendered both as a table row and as a card line, which is part of why the price drift is so visible.

**Accessibility content** `[absent]`. **No accessibility statement was found on any reachable surface** — nothing in the footer, no `/accessibility` path linked, no conformance claim, no feedback route. `Closed Captioning` is present but it is an FCC captioning-complaint route, not an accessibility statement. This is a material gap: Netflix publishes a ten-feature accessibility article with a changelog, Spotify publishes a four-section Accessibility Center. Disney+'s only accessibility-adjacent public artefact is a captioning inquiry link whose destination is in the blocked help centre.

**Accessibility defects observed in markup** `[observed]`:

- **Feature headings duplicated.** Every item in `Watch the way you want` renders its `###` heading twice — once alone, once concatenated with its body (see T2). Six headings become twelve, on two pages.
- **Title-card link text duplicated and run together.** `Toy StoryToy StoryG1995•Action and Adventure, Buddy, Comedy, Animation` — all ten `Top 10` cards. Title twice, then rating, year and genre list concatenated with no sentence separators. The rating badge is not independently addressable.
- **Whole plan-comparison sections duplicated in the DOM.** The `Choose your plan` widget, the `Get the Disney+, Hulu, HBO Max Bundle` block, the ESPN promo block and the `Watch the way you want` list each appear **twice** in server HTML (responsive variants). A screen-reader user may encounter the entire plan table, every `SELECT` button, and every footnote twice. Flagged as **suspected** — CSS/`aria-hidden` handling was not inspected — but the duplication itself is confirmed in the source.
- **Internal codenames in alt text.** `Duo Bundle`, `Trio Logo`, `Max Bundle Logo`, `Disney+ Hulu ESPN Flagship`, `Aurora` are read aloud in place of the plan names the sighted user sees. `Aurora` (the hero image) conveys nothing. `Trio Logo` and `Max Bundle Logo` include the word "Logo", which is redundant-at-best in alt text.
- **Editorial artwork alt text is title-only.** `![Friends]`, `![Game of Thrones]`, `![Barbie]`, `![NFL]`, `![SportsCenter]` — bare titles with no description. Acceptable if the artwork is decorative alongside a text label, but here several carousels have **no adjacent text label at all**, so the alt text is the only content and it conveys the title without indicating that it is a poster or what tier it belongs to.
- **`Your Privacy Choices` has no working href** (see T10) — a mandated control unreachable by keyboard or screen reader in server HTML.
- Footnote markers `*`, `**`, `^`, `††`, `‡‡`, `****` are rendered as **bare typographic characters**, not as linked references with return anchors. A non-visual user encountering `Price: $11.99/month‡‡` has no programmatic route to the `‡‡` text at the page foot, and must locate it by searching for a double-dagger.

**Negative findings, recorded honestly**

- **Prices disagree across three pages of the same site** on the same day, for seven plans, by $2–$10/month (T10)
- Homepage plan table and homepage FAQ disagree with each other on the HBO Max bundle price
- `Your Privacy Choices` renders with `href` = `< >` on two pages and as unlinked plain text on a third — a CCPA-mandated control
- `Subscriber Agreement` page renders legal chrome and **no agreement text**
- Nine simultaneous footnote markers, with **different bindings on different pages** for the same table
- `cancel` (US) and `cancelled` (en-GB) in the same footnote sentence, on an `en-us` page marked `U.S. residents only`
- `Terms apply` vs `Terms Apply`; `Additional terms apply` vs `Additional Terms Apply`; `Interest-Based Ads` vs `Interest-based Ads`; `Help` vs `Help Center` — four label-casing inconsistencies across templates
- `SELECT` (caps) vs `Add to plan` (sentence) vs `Get The Bundle` (title case, capitalised article) — three CTA conventions in one section
- Two FAQ headings (`Frequently Asked Questions` / `Answers to your questions`) for overlapping question sets; a third block with no heading
- All six `Watch the way you want` headings render twice
- All ten `Top 10` title-card labels render the title twice, then concatenate rating/year/genre without separators
- Four major page sections duplicated in the DOM
- Internal codenames (`Flagship`, `duo`, `trio`, `basic`) leak into alt text and URL parameters
- `streamer` used to mean *viewer*
- `select` used 9 times and `eligible` 6+ times as unresolvable hedges, with no availability checker to route to
- **No accessibility statement exists** on any reachable surface
- **No status page** found
- `TV-MA` rating badges on the unauthenticated homepage of a family-branded service with no explanatory layer (the explanation is in the blocked help centre)
- `18+ only.` age restriction on a purchasable add-on, disclosed only in a footnote
- The existing-subscriber upgrade path routes to the Help Center home, not to an article

---

## Transferable patterns

1. **Name the class of content that has no classification, and make it a control.** `titles without ratings` — live sports, news — with its own parental switch and its own dual disclosure (mature themes *and* mature advertising). The best idea in this file, and it generalises to any product mixing classified and unclassified inventory.
2. **Scope a negative claim in the label, not only in the footnote.** `Movies and series without ad breaks` beats `No ads`, because the exception (live and linear) is pre-empted in the row label. Compare `(No Ads*)`, where the same exception hides behind an asterisk.
3. **Put the ad state inside the plan name.** `Disney+ (With Ads)` travels with the plan everywhere it is referenced — marketing, FAQ, URL, receipt. More robust than a tier name that has to be explained (`Standard with ads`) or a tier that is never named commercially at all (Spotify).
4. **Disclose that cancelling inside a promotional term does not end the term.** "If cancelled during the initial 6 month term, effective at the end of your 6 month term." Materially important and almost universally omitted. Should be adjacent to the offer, not under a `‡‡`.
5. **Give feature withdrawal its own FAQ, in the user's past tense.** `What happened to Streams?` Condition: the answer must carry migration guidance and a date, which this one does not.
6. **Promote child-privacy policy to the primary footer.** `Children's Online Privacy Policy` as a standalone top-level link, second only to the main privacy policy. Correct for any product with a family audience.
7. **Counter-example — the footnote ceiling.** Nine markers (`*`, `**`, `****`, `^`, `^^`, `†`, `††`, `‡`, `‡‡`) with page-dependent bindings is past the point of usable disclosure. Beyond roughly three markers, move to named, linked, and return-anchored footnotes, or fold the caveat into the label.
8. **Counter-example — never hard-code price into prose.** Prices duplicated into FAQ answers on three pages drifted by up to $10/month. Render price from one source, once, and reference it everywhere else.
9. **Counter-example — `select` and `eligible` are not disclosures.** Fifteen uses, zero resolutions. If you must hedge availability, route the hedge to a checker (Netflix's `plan compatibility`, Wise's `Feature availability checker`).
10. **Counter-example — do not let internal plan codenames reach alt text or URLs.** `Flagship`, `duo`, `trio`, `disney_duo_basic` are read aloud to screen-reader users and shared in links, and `basic` outlives the plan name it referred to.

## Caveats & gaps

- **The help centre is blocked and it holds the priority content.** `help.disneyplus.com` is client-rendered (Salesforce Experience Cloud); the index and two priority articles (`disneyplus-parental-controls`, `disneyplus-error-codes`) returned metadata-only bodies, and `disneyplus-content-ratings` timed out. Per the harvest rules no alternative retrieval route was attempted. **T7 (error taxonomy), T11 (help IA), and the article-level half of T10 (profile types, PIN copy, rating explanations) are therefore `[absent]`.** A browser-rendered pass is required.
- **`Junior Mode` cannot be defined from observed content.** It is named once, fourth in a four-item list, with no definition, age range, or capability description anywhere reachable. Its relationship to profiles and to `content rating filters` is **not inferred here**.
- **No profile-type vocabulary was observable** beyond the word `profile` itself and `streamer`. There is no observed equivalent of Netflix's `Kids profile` / `the Netflix Kids experience` / `Profile Lock` / `main profile` set. The absence is a harvest gap, not evidence that the vocabulary does not exist.
- **No PIN copy, prompt string, or PIN scope was observable.** `PIN-protection` is the only token.
- **Rating labels are confirmed only as browse-surface badges** (`G`, `PG`, `PG-13`, `TV-G`, `TV-MA` on the `Top 10` shelf). The rating *system*, its glosses, its banding, and its locale variants are unharvested. Non-US rating systems (BBFC, FSK, ClassInd, age-number schemes) **must not be assumed**.
- **The Subscriber Agreement text is unreadable** — the page renders navigation only. All contract-level disclosure is unharvested.
- **Signup and purchase flows not entered**, per the brief. `/identity/sign-up`, `/commerce/cadence`, `/commerce/billing` are unharvested, so the point-of-purchase disclosure (which may resolve the price discrepancy) is unseen.
- **The price inconsistency is recorded as observed, not explained.** Stale cache, live A/B test, page-level CMS drift, and a mid-rollout price change are all plausible causes; none is asserted.
- **DOM duplication of major sections is confirmed in source but its accessibility impact is suspected, not verified** — `aria-hidden` and CSS handling were not inspected.
- **Locale is en-US only.** Prices, bundle composition, the ESPN/HBO Max/NFL+ tie-ups, COPPA and state-privacy links, and the `U.S. residents only` restriction are all US artefacts. Disney+ operates a substantially different plan and parental-control structure in EMEA and APAC, entirely unharvested.
- **No accessibility statement was found.** Recorded as absence; it may exist behind the blocked help centre.
- Hulu and ESPN, though sold on these pages and rendered inside Disney+, are separate products with their own content surfaces and are out of scope for this file.

## Sources

1. https://www.disneyplus.com/
2. https://www.disneyplus.com/welcome/filter-plans
3. https://www.disneyplus.com/welcome/disney-hulu-espn-bundle
4. https://www.disneyplus.com/legal/subscriber-agreement — *shell only, no agreement text*

**Attempted and blocked (recorded in Caveats):**
5. https://help.disneyplus.com/ — metadata only
6. https://help.disneyplus.com/article/disneyplus-parental-controls — metadata only
7. https://help.disneyplus.com/article/disneyplus-error-codes — metadata only
8. https://help.disneyplus.com/article/disneyplus-content-ratings — fetch timed out
