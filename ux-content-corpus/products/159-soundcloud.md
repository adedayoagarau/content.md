# 159. SoundCloud

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Creator-first audio platform (UGC hosting + streaming + music distribution + royalty payout) |
| Primary URL | https://soundcloud.com/ |
| Corpus rank | 159 |
| Benchmark strength (source list) | Creator and listener states |
| Locale / market observed | en-US (help centre localised into 8 languages) |
| Platform observed | Zendesk-hosted help centre (help.soundcloud.com); soundcloud.com marketing pages are client-rendered and did not serve content |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | DMCA-style notice-and-takedown with a three-strike repeat-infringer policy tied to the Terms of Use; US IRS withholding on royalty payments to non-US artists (Publication 515 cited); PayPal/bank payout KYC and tax-form collection; DJ and Go/Go+ availability gated by territory licensing |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 (1 blocked) |
| Harvest completeness | Partial — the creator estate (monetization, distribution, royalties, copyright, strikes, disputes) is captured in exceptional depth because SoundCloud documents it publicly and at length. The marketing site (`soundcloud.com/pro`, `/artists`, `/discover`) is client-rendered and returned empty bodies. All in-product UI is `[documented]` from help articles. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help centre home | https://help.soundcloud.com/hc/en-us | Nine top-level categories, twelve featured articles, standing FPR banner, `Status Page` link |
| Category: Creators on SoundCloud | https://help.soundcloud.com/hc/en-us/categories/31283161425563-Creators-on-SoundCloud | Eight sections; the creator IA |
| Category: SoundCloud Fans & Listeners | https://help.soundcloud.com/hc/en-us/categories/115000678928-SoundCloud-Fans-Listeners | Eight sections; the listener IA |
| Category: Copyright for SoundCloud Creators | https://help.soundcloud.com/hc/en-us/categories/46352081847323-Copyright-for-SoundCloud-Creators | **Seven sections, ~50 articles** — the richest copyright IA in the corpus |
| Fan-powered Royalties | https://help.soundcloud.com/hc/en-us/articles/1260801306810-Fan-powered-Royalties | The revenue-model artefact; pro-rata contrast; fraud argument |
| Getting Paid by SoundCloud for Artists | https://help.soundcloud.com/hc/en-us/articles/360051802713-Getting-Paid-by-SoundCloud-for-Artists | **100% royalty share, $25 threshold, two-month delay, Split Pay, withholding** |
| How to Distribute with SoundCloud | https://help.soundcloud.com/hc/en-us/articles/24320060389275-How-to-Distribute-with-SoundCloud | Six-step release flow; metadata field inventory; partner selection |
| Verify your Rights for Monetization & Distribution | https://help.soundcloud.com/hc/en-us/articles/39687296360091-Verify-your-Rights-for-Monetization-Distribution | Rights-clearance vocabulary; acceptable documentation list |
| Why was my track taken down from SoundCloud? | https://help.soundcloud.com/hc/en-us/articles/4402637287835-Why-was-my-track-taken-down-from-SoundCloud | Automated vs manual takedown distinction |
| How do copyright strikes work? | https://help.soundcloud.com/hc/en-us/articles/4402644695451-How-do-copyright-strikes-work | Three-strike penalty ladder with expiry |
| Choosing the Right Subscription | https://help.soundcloud.com/hc/en-us/articles/360051072534-Choosing-the-Right-Subscription | Two comparison tables (listener and creator); plan vocabulary |
| What happens when I cancel my Go subscription? | https://help.soundcloud.com/hc/en-us/articles/360051638314-What-happens-when-I-cancel-my-Go-subscription | Cancellation-consequence copy |
| SoundCloud Status | https://help.soundcloud.com/hc/en-us/articles/4413524848667-SoundCloud-Status | Eleven-component status table — as a manually-edited help article |
| *Blocked* | https://soundcloud.com/pro | Empty body (client-rendered) |

---

## T1 Navigation & IA labels

**The help centre's top level is split by *role*, not by topic — and this is the file's structural headline** `[observed]`

| # | Category (verbatim) |
|---|---|
| 1 | `SoundCloud Fans & Listeners` |
| 2 | `Creators on SoundCloud` |
| 3 | `My Account` |
| 4 | `Subscriptions & Billing` |
| 5 | `Vinyl Distribution` |
| 6 | `Share & Embed` |
| 7 | `Copyright for SoundCloud Creators` |
| 8 | `Legal, Safety & Reporting` |
| 9 | `External Rightsholders & Distribution via Supply Chain` |

Analysis. Categories 1 and 2 are **audience segments**; 3–6 and 8 are functional; 7 is an audience-scoped topic (`for SoundCloud Creators`); 9 is a **trade audience** most consumer help centres would never surface — `External Rightsholders & Distribution via Supply Chain` addresses labels, aggregators and rights administrators, in the same list as "how do I play a song". That single label tells you SoundCloud's help centre serves four distinct populations (listeners, creators, rightsholders, trade partners) from one front door.

`SoundCloud Fans & Listeners` is a **doubled audience noun** — fans and listeners named separately. The distinction is load-bearing: `fan` is the monetisation unit (fan-powered royalties, `Top & First Fans`, `Fan & Community Tools`), while `listener` is the product unit (playback, subscriptions). One word for the economics, one for the experience.

Giving copyright its own top-level category — rather than filing it under legal or under creators — is the correct weighting for a UGC audio platform, and it is the clearest IA decision in this file.

**`Creators on SoundCloud` — eight sections, ordered roughly by career stage** `[observed]`

`Creator Subscriptions` · `Upload on SoundCloud` · `SoundCloud for Artists` · `DJs` ·
`Get Heard` · `Creator Insights` · `Podcasts on SoundCloud` · `Premier (Legacy Program)`

`Get Heard` is the standout label — a **two-word imperative naming the creator's actual goal** rather than the feature set ("Promotion", "Marketing tools"). Its children are `Audience Growth & Promotion` and `Promote on SoundCloud`, both of which are duller than their parent.

`Premier (Legacy Program)` is the honest one: a deprecated monetisation programme kept in the IA with `(Legacy Program)` appended to the label. Most platforms silently delete superseded programmes; SoundCloud marks the label and keeps the three FAQ articles (`Premier Eligibility`, `Premier Monetization FAQs`, `Premier Payments FAQs`) reachable for the artists still on it. **Naming the legacy in the nav label is a reusable pattern** — see Transferable patterns.

`SoundCloud for Artists`'s own six children are the creator-economy vocabulary in order: `Get Started with SoundCloud for Artists` · `Artist Pro Tools & Benefits` · `Distribution with SoundCloud` · `Monetization on SoundCloud` · `Fan & Community Tools` · `Royalties & Earnings`.

**`SoundCloud Fans & Listeners` — eight sections, and the sequencing is playback-first** `[observed]`

`Playback Controls & Audio Experience` · `Listen Across Devices` · `Discovering Music & Your Feed` ·
`Filters & Personalization` · `Library, Likes & Social Features` · `Offline Listening & Downloads` ·
`Fan Subscriptions (SoundCloud Go & Go+)` · `Listening & App Troubleshooting`

Two things. `Fan Subscriptions (SoundCloud Go & Go+)` **glosses its own product names in parentheses inside the nav label** — the generic term first, the brand names second, because a user looking for "my subscription" will not search "Go+". And the listener IA has a dedicated troubleshooting section (`Listening & App Troubleshooting`) where the creator IA does not — creator failure is instead distributed across `Upload Errors & Common Issues` and the whole copyright category.

**`Copyright for SoundCloud Creators` — seven sections, and this is the best failure IA in the corpus** `[observed]`

| Section | What it is for |
|---|---|
| `Copyright Basics & Education` | 8 articles — what copyright is, before what went wrong |
| `Copyright Infringement & Takedowns` | 4 articles — the event |
| `Takedowns by Content Type` | 12 articles — **the same event, sliced by what the user made** |
| `Disputes & Appeals` | 5 articles — the recourse |
| `Reporting Copyright Infringement` | 4 articles — the user as claimant |
| `Best Practices to Avoid Copyright Issues` | 15 articles — prevention, by content type |
| `Protecting Your Content` | 1 article |

The ordering is a complete lifecycle: **understand → it happened → it happened to *your kind of thing* → fight it → do it to someone else → don't let it happen again → defend yourself.** And `Takedowns by Content Type` paired with `Best Practices to Avoid Copyright Issues` means the *same taxonomy of creative acts* (DJ mix, mashup, cover, remix, purchased track, original, collaboration) appears twice — once as a failure and once as a prevention. A creator can enter from either side and land on their own case.

Note that `Reporting Copyright Infringement` sits inside the *creator* copyright category, not in `Legal, Safety & Reporting`. SoundCloud treats "someone stole my track" as a creator concern rather than a legal one — which is right, because the person filing is an artist, not a lawyer.

**Featured articles — the front door is dominated by billing and failure** `[observed]`

`What happens when I cancel my Go subscription?` · `How to Distribute with SoundCloud` ·
`Migrating Catalog to SoundCloud for Artists` · `Verify your Rights for Monetization & Distribution` ·
`Introduction to SoundCloud` · `Unable to Sign In to Your Account` · `Creating an account on SoundCloud` ·
`Choosing the Right Subscription` · `Subscription Management` · `Why was my track taken down from SoundCloud?` ·
`Reporting on SoundCloud` · `Reporting a spam account`

Twelve items, of which the **first** is cancellation and four are failure or moderation. `Migrating Catalog to SoundCloud for Artists` is a competitive-switching article promoted to the help centre's front page — an acquisition play inside a support surface.

**Persistent header furniture** `[observed]`: a `Status Page` link on every page, and a standing banner:
> "We're the first music company to introduce fan-powered royalties, where independent artists can get paid more because of their dedicated fans. More info here."

A **marketing claim in the help centre chrome**, present on all fourteen pages fetched. `the first music company to` is an unhedged priority claim; `can get paid more` is correctly hedged with `can`. Putting the revenue model in the help-centre masthead is a positioning decision, not a support one.

**Footer** `[observed]`: `SoundCloud` · `For Artists` · `Terms of Use` · `Cookie Manager`, then a language list of eight, then five social links rendered as **raw URLs** (`https://www.facebook.com/SoundCloud/`) — the same defect as Shazam (158). No privacy-policy link in the help footer at all, only `Terms of Use` and `Cookie Manager`.

## T2 Value proposition & headline patterns

The marketing site did not serve content, so the value-proposition material here comes from help-article standfirsts — which turn out to be written in marketing register.

**Help-article openings are benefit-first, second-person, and often a promise** `[observed]`

| Article | Opening line |
|---|---|
| Getting Paid | "Receiving your royalties should be the easiest part of your release cycle." |
| How to Distribute | "Distributing your music should be as seamless as creating it." |
| Verify your Rights | "**Want your tracks approved on the first try?**" |
| Choosing the Right Subscription | "SoundCloud offers plans tailored to how you use the platform." |
| Fan-powered Royalties | "Fan-powered Royalties (FPR) are a more equitable way for independent artists to get paid." |

The `X should be the easiest part of Y` / `X should be as seamless as Y` construction appears twice — a **normative opening** that states how the task ought to feel before explaining it. It is aspirational rather than descriptive, which is unusual for help content and slightly risky (a reader whose payout is stuck reads "should be the easiest part" as a provocation).

`Want your tracks approved on the first try?` is the best of them: a **question that names the reader's goal and implies the article is the shortcut.** It converts a compliance article (upload your licence documents) into a self-interest argument.

**Section headings inside articles are marketing-weight** `[observed]`
`The Setup Checklist` · `Your Royalty Share` · `Payout Timeline & Minimums` · `Split Pay for Collaborators` ·
`Troubleshooting: Why wasn't I paid?` · `Taxes & Withholdings: Why are my earnings being taxed?` ·
`How Fan-powered Royalties Work` · `How to Qualify` · `FPR vs. External Distribution` · `How FPR Fights Fraud` ·
`Using samples? Here's what to know` · `Types of Acceptable Documentation` · `How to Submit Documentation`

Two patterns worth recording. **`Topic: Question` compound headings** (`Troubleshooting: Why wasn't I paid?`, `Taxes & Withholdings: Why are my earnings being taxed?`) give both a scannable label and the user's actual question in one string — the label serves the navigator, the question serves the searcher. And `Using samples? Here's what to know` is a **question-plus-promise heading**, the conversational register applied to a rights-clearance section.

**The plan-page framing is need-based, not tier-based** `[observed]`
> "Whether you are a listener looking for an ad-free experience or an artist ready to distribute your music globally, find your perfect fit below."
> Then two headed groups: `For Listeners & DJs` and `For Artists & Creators`, each with a one-line framing:
> — "Choose a plan that enhances your discovery and playback experience."
> — "Take your career to the next level with tools built for growth and monetization."

`Take your career to the next level` is the only outright cliché in the harvested set. But the structural decision — **split the pricing page by who the reader is before showing any price** — is correct for a platform where one person may hold both a listener and a creator subscription, and the article addresses that explicitly (see T12).

**The FPR argument is built as a contrast, and the contrast is named** `[observed]`
> "Instead of your fans' money going into a giant 'pool' shared by mega-stars, FPR ensures that your earnings are driven directly by your fans' actual listening habits."
> "In the traditional '**pro-rata**' model, revenue is pooled and paid out based on total stream market share. FPR changes the game by making it personal."

This is the single most transferable piece of persuasive content in the file. The structure is: **name the incumbent model with its industry term (`pro-rata`) in scare quotes → describe its mechanism → describe the harm in the reader's terms (`shared by mega-stars`) → state the alternative → state the personal consequence.** And the payoff sentence does the arithmetic:

> "If a fan spends 100% of their time listening to you, their subscription or ad revenue goes to *you*—not the top 1% of global artists."

`the top 1% of global artists` is the antagonist, named. `giant "pool"` and `mega-stars` are colloquial where the surrounding copy is technical — the register drops precisely at the point of grievance.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Submit a request` | Foot of every help article | Under `Have more questions?` |
| `Status Page` | Header, every page | |
| `Was this article helpful?` → `Yes` / `No` | Foot of every article | |
| `See all N articles` | Category sections | Count exposed |
| `Skip to main content` | Top of DOM | |
| `Toggle navigation menu` | Mobile nav | |
| `Cookie Manager` | Footer | **Named as a manager, not a banner** |
| `More info here.` | FPR banner | Bare `here` as link text — see T14 |
| `Ready to start earning?` → `Monetization tab` | Foot of FPR article | Question then a destination-named link |
| `Ready to upgrade?` → `Subscription Overview Page` | Foot of subscription article | |
| `Need more help?` → `Full Fees Outline` | Foot of payout article | |
| `talk to our AI Agent` | Foot of payout article | **The escalation path is an AI agent** — see T11 |
| **In-product, `[documented]`** | | |
| `Distribute` | Below the waveform of an uploaded track | The single most important creator CTA; positioned on the object |
| `Monetize this track` | Monetization tab, per-track | Object-scoped |
| `+Add Payout Method` | Earnings > Payouts | Leading plus glyph in the label |
| `Submit a Tax Form` | Payouts setup | |
| `Select Tracks` | Release creation | |
| `Create New Profile` | Profile mapping step | |
| `Submit` | Release review | Bare |
| `Edit` (icon) | Release track row | |
| `Payouts` / `Earnings` / `Monetization Tab` / `Distribution tab` / `Split Pay tab` | SC4A dashboard nav | Casing inconsistent: `Monetization Tab` vs `Distribution tab` |
| `Bank Transfer` / `PayPal` | Payout method picker | |
| `Individual` / `Business` | Filing status | |
| `E-Delivery` / `Mail` | Tax-form delivery preference | |
| `License Documentation` | Monetization upload section | |
| `Does this track require additional licenses?` | Distribution upload section | **A question as a form section label** |
| `file a dispute` | Takedown notification | Lowercase verb phrase |
| `Repost` / `React to Tracks` / `Follow` / `unfollow` | Listener social actions | |
| `Next up - Play Queue` | Player | Hyphenated compound |

**Observations.** The creator CTAs are consistently **object-scoped rather than global**: `Distribute` sits "below the waveform of your uploaded track", `Monetize this track` sits "adjacent to the relevant track", splits are set by clicking "the three dots on the right-hand side of your track". For a platform where the unit of work is a single track and the same track can be published, monetised, distributed and split independently, attaching every action to the object rather than to a menu is the right architecture — and the help copy consistently describes the action *by its position relative to the track*.

`Does this track require additional licenses?` as a form-section heading is worth stealing: a **question posed to the uploader at the moment of upload**, which both collects the file and educates the user that the question exists.

The lone bare `here` (`More info here.`) sits in the site-wide banner — the most-viewed link in the help centre has the least useful link text.

## T4 Onboarding & getting-started

**Two distinct onboardings, and the creator one is a six-step release flow** `[documented]`

`How to Distribute with SoundCloud` is the most substantial procedural content in the file. Its preconditions are stated in the opening sentence, before step 1:

> "Once you've **subscribed to Artist Pro**, signed our **Terms of Service**, and completed your **payout and tax information**, you're ready to send your tracks to the world."

Three gates named up front — subscription, contract, payment/tax identity — then:

| Step | Heading | What it collects |
|---|---|---|
| 1 | `Enter track details` | Track title, main artist, composer (legal name), content rating, audio language, songwriter info, ISRC, Preview Start Time |
| 2 | `Enter release details` | Release name, primary genre, record label (required), release date, artwork |
| 3 | `Select release partners` | Platform selection, defaulting to all |
| 4 | `Profile mapping` | Link to existing Spotify and Apple Music artist profiles |
| 5 | `Split Pay` | Assign collaborator percentages |
| 6 | `Review and submit` | |

Then a named outcome section: **`What happens next?`** — "Our team will review your release to ensure it meets partner guidelines. If your release is marked as **Rejected**, don't sweat it. Usually, it just means we need a quick fix—like a metadata correction or proof of license—before we can move forward."

This is the strongest onboarding pattern in the file. Three observations.

First, **the unhappy outcome is named and de-escalated in the same breath as the happy one.** `Rejected` is a state with a link to its own article, and the copy immediately reframes it ("don't sweat it… usually, it just means we need a quick fix") with two concrete examples of what the fix typically is. A submission flow that tells the user what rejection means *before* they submit removes most of the panic from the notification that follows.

Second, **each field that carries a downstream consequence gets its consequence attached inline**:
- `Record Label:` "This field is required. You can use your artist name or a custom label name. **Consistency helps fans find your catalog later.**"
- `Release Date:` "This must be in the future. We recommend setting your date **30–45 days ahead** to allow for review and give you enough time to pitch to platforms like Spotify."
- `Genre:` "Note that these categories may differ slightly from SoundCloud's internal genre list."
- `Profile mapping:` "Make sure your names match exactly—**capitalization and spaces matter.**"
- `ISRC` — "we can assign one for you if you don't have one"

`capitalization and spaces matter` is six words that prevent a support ticket. `30–45 days ahead` gives a number and then two reasons for it (internal review, and the user's own pitching window) — the second reason is about the artist's interests, not SoundCloud's.

Third, the flow includes **two `Pro Tip:` insets that are genuinely strategic rather than procedural**:
> "If you own 100% exclusive rights, you can enable YouTube Content ID. If your track includes samples or royalty-free elements, this wouldn't be eligible, but be sure to upload your license documentation to avoid any delays in approval."
> "Check SoundCloud to see if your artist name is already taken or similar to others. It's much easier to choose a unique name now than to change it later."

The second is career advice, not product instruction. Giving it at the profile-mapping step — the last moment before a name is permanently mapped to Spotify and Apple — is exactly the right placement.

**The payout onboarding is a named checklist plus a seven-step form walk** `[documented]`

> `The Setup Checklist` — "Before we can release your funds, you must complete these steps in your **Monetization Tab**:"
> 1. `Payout & Tax Info:` Add a PayPal or Bank Account and complete the digital tax form.
> 2. `Terms of Use:` Sign the SoundCloud for Artists agreement.

Two items, and the framing sentence leads with the consequence of *not* doing them ("Before we can release your funds"). Then a seven-step procedure with a `Tip:` that the section is returnable-to ("You can return to this section at any time to update your payment method or edit your tax information") — reassurance that the irreversible-feeling step is not irreversible.

**Listener onboarding** `[observed]` is thin by comparison: `Creating an account on SoundCloud`, `Introduction to SoundCloud`, `Get Started with SoundCloud Go+`, `Free trial for SoundCloud Go subscriptions`. The asymmetry is the point — SoundCloud invests its procedural content budget on the creator side.

## T5 Form & field labels

**The distribution metadata schema, exposed as a public field list** `[documented]` — the richest field inventory in this file.

| Field | Notes |
|---|---|
| `Track title` | |
| `Main artist` | `Main` distinguishes from featured/contributing |
| `Composer (legal name)` | **The parenthetical is doing rights work** — legal name, not stage name |
| `Content rating` | |
| `Audio language` | Not "language" — the audio is the object |
| `Songwriter info` | |
| `ISRC` | Unglossed initialism; "we can assign one for you if you don't have one" |
| `Preview Start Time` | "for platforms like TikTok and Instagram" — the field's purpose named |
| `Release Name` | With the singles/multi-track default behaviour explained |
| `Primary Genre` | With the divergence caveat |
| `Record Label` | Required; alternatives offered |
| `Release Date` | Must be future; recommended lead time given |
| `Artwork` | `.jpg or .png, 3000x3000px, and 300 dpi` |
| `Does this track require additional licenses?` | Section label, phrased as a question |
| `License Documentation` | Section label (monetization path) |

`Composer (legal name)` is the single best field label here. One parenthetical resolves the most common metadata error on a music distribution form — artists enter their stage name into a field that must carry the legal identity for royalty collection — and it does it without explaining why. Compare the alternative (a help link, a tooltip, or a validation error after submission).

`Audio language` rather than "Language" correctly scopes the attribute to the recording rather than to the listing. `Preview Start Time` names a field whose existence would otherwise be baffling, and the inline gloss ("for platforms like TikTok and Instagram") tells the user which downstream surface it controls.

**Payout and tax fields** `[documented]`
`+Add Payout Method` → `Bank Transfer` / `PayPal`; filing status `Individual` / `Business`; `Submit a Tax Form`; delivery preference `E-Delivery` / `Mail`; `primary email address` verification gate ("Verify your primary email address in order to add or change payout information").

The email-verification gate is stated as a **precondition with its reason attached** — the user learns why they are being asked to verify before they can change a bank account.

**Split Pay fields** `[documented]`: collaborator identified by **`SoundCloud Profile URL`** plus a percentage. The identifier choice is notable — not email, not username, but the profile URL, which is the one string a collaborator can copy unambiguously. And the entitlement is disclosed at the field: "They don't need a paid subscription to get paid; they just need to log in and provide their payout details."

**Search and feedback** `[observed]`: `Search` with the placeholder `Search our knowledge base or browse the topics below`; a stray `0` rendered beneath the search field on the help home (a result-count placeholder leaking pre-query — see T8); `Was this article helpful?` → `Yes` / `No`; `Have more questions?` → `Submit a request`.

## T6 Status & state language

**PRIORITY-ADJACENT SECTION.** SoundCloud runs three independent state machines — the track, the account, and the release — plus a fourth for subscriptions. The vocabulary is mostly good and occasionally collides.

### Track states

| State | Vocabulary and gloss |
|---|---|
| `blocked` | Automated content-ID outcome: "The track(s) will remain **blocked** on your account, will not count towards your upload quota, and will not be publicly visible." |
| `taken down` / `removed` | Manual rightsholder-reported outcome — two words for one event (see below) |
| `Rejected` | Distribution review outcome, with its own article |
| `Private` / public / `scheduled` | Publication states at upload |
| `flagged` | "My own content was flagged for copyright infringement and blocked" |

**`blocked` versus `taken down` is the most interesting state distinction in the file.** The same visible outcome (your track is gone) has two names depending on *how* it happened, and the difference carries real consequences:

> Automated: "We do not issue strikes for tracks that are blocked by our content ID system. If you uploaded content you do not have the rights to share and it has been blocked, **no further action is needed on your part.**"
> Manual: "A strike will be issued seven days after the takedown if you are unable to successfully dispute the claim."

So `blocked` is consequence-free and requires nothing; `taken down` starts a seven-day clock toward a penalty. Naming them differently is correct, and the automated path's copy is unusually merciful — "no further action is needed on your part" explicitly releases the user from anxiety, and the three-part gloss tells them the track is invisible, harmless, and **not consuming their upload quota**. That last clause pre-empts a question the user would otherwise have to ask.

The naming is not perfectly maintained: the article titles use `taken down` (`Why was my track taken down from SoundCloud?`, `Your DJ mix was taken down…`) and `removed` (`My track was removed from SoundCloud for copyright infringement`) interchangeably, and the latter title appears **twice in the copyright category under two different article IDs** — in `Copyright Infringement & Takedowns` and again in `Disputes & Appeals`. A duplicated title in one category tree.

### Account states — a three-strike ladder with expiry

`[documented]` The clearest penalty-state documentation in the corpus:

| Strikes | Consequence (verbatim, trimmed) |
|---|---|
| 1 | "The first strike does not affect the functionality of your account." |
| 2 | "The second strike results in a suspension of the download functionality on your account." |
| 3 | "we have to permanently terminate accounts that have reached more than two active strikes" |

Plus the mechanics: a strike is issued **seven days** after a manual takedown if not successfully disputed; strikes **expire 12 months from the date issued**; and — the good bit —

> "The reported track must remain blocked after a strike expires in compliance with copyright law, but any penalty will no longer be in effect. **For example, if you have two strikes and one expires, the download functionality is restored.**"

A worked example of **partial recovery**. The user is told exactly which capability comes back and which consequence is permanent (the track stays blocked). Separating "the penalty expires" from "the takedown is forever" is the distinction most strike systems leave ambiguous.

Note `active strikes` — the adjective implies a non-active (expired) strike still exists on the record, which is consistent with the 12-month expiry but is never defined. And the escalation ladder is framed with a stated purpose before the penalties: "Strikes are used to help communicate the importance of copyright and to ensure rightful ownership and permissions of all content uploaded to the platform." Educational framing before punitive detail.

**Self-service state lookup, with a fallback** `[documented]`: "You can find out if you have received a copyright strike in the last year by checking your email or in-product notifications. If you cannot access either, please contact copyrights@soundcloud.com." Two channels, then a named email for the case where both fail — because a terminated user may have lost in-product access.

### Release and payout states

`[documented]`
- `Rejected` — distribution review failure, pre-explained (T4)
- `approved` — "Want your tracks approved on the first try?"; "allow up to **3-5 business days** for approval" (monetization review SLA)
- **Payout states**, described rather than named: below-threshold balances "roll over to the next month"; first-time earners "typically won't see data for the first **45–60 days**"; ongoing earnings appear on a "**two-month delay**"; and the diagnostic state:

> **"My balance shows $0, but I haven't been paid."** "Don't panic. Royalty statements usually refresh a few days *before* the actual cash transfer. Payments are typically processed on the **last business day of the month**."

This is a **user-voiced state-confusion entry**, written as a quoted complaint and answered with the timing mechanism. It is the Wise "why does it say complete when the money hasn't arrived" pattern, applied to royalty reporting — the gap between the statement refreshing and the cash moving is named and dated.

### Subscription states

`[documented]` `Go` / `Go+` / `DJ` (listener); `Basic (Free)` / `Artist` / `Artist Pro` (creator); plus `expires` as a literal field name — "You can check the exact '**expires**' date on your Subscriptions page" — with the quotation marks in the help copy indicating the label is being reproduced from the UI.

Cancellation state transition: "your account will automatically **revert to our free, ad-supported experience.**" `revert` rather than "downgrade", and the destination named by its two defining properties (free, ad-supported) rather than by a tier name.

### Service states

`[observed]` Eleven components, each with the single value `Operational`:
`Website` · `iOS App` · `Android App` · `Sign in/Sign up` · `Uploading` · `RSS Feeds` · `Insights` · `Mastering` · `Feed` · `DJ Integrations` · `SoundCloud for Artists Dashboard`

The component list is the useful artefact — it is a **map of what SoundCloud considers separately breakable**, and it correctly separates creator infrastructure (`Uploading`, `Mastering`, `Insights`, `SC4A Dashboard`, `RSS Feeds`) from listener surfaces (`Website`, apps, `Feed`). Only one status value (`Operational`) is observable, so the degraded-state vocabulary is unknown. See T9 for the defect.

## T7 Error, failure & recovery

**PRIORITY-ADJACENT.** This is SoundCloud's strongest content area, and it is strong because failure is treated as a *content domain* with its own taxonomy rather than as a set of error strings.

**Failure is sliced by what the user made — twelve articles, one per creative act** `[observed]`

From `Takedowns by Content Type`:
- `My own content was flagged for copyright infringement and blocked`
- `Your DJ mix was taken down for copyright infringement`
- `Your mashup was taken down for copyright infringement`
- `Your cover version was taken down for copyright infringement`
- `Your remix was taken down for copyright infringement`
- `A track you bought was taken down for copyright infringement`
- (plus 6 more)

**This is the most quotable IA decision in the file.** The title pattern is `Your <thing you made> was taken down for copyright infringement` — second person, possessive, past tense, naming the *creative form* rather than the violation type. A DJ playing a club set, a producer flipping a sample, and a singer covering a song have three genuinely different legal situations and three genuinely different emotional reactions, and each gets its own article addressed to them.

Compare the alternative that most platforms ship: one article called "Copyright takedowns" with a bulleted list of content types inside it. SoundCloud's version is findable by the words the user would type ("my remix got taken down") and, critically, **each title validates that the user made something** before telling them it was removed. `A track you bought was taken down` is the most sympathetic of the six — it names the case where the user paid money and still lost the track, which is the most aggrieving version of this failure.

The mirror section, `Best Practices to Avoid Copyright Issues`, uses the same taxonomy in the preventative voice:
- `Best practices for creating and uploading your own original content`
- `Best practices for creating and uploading a track composed with someone else`
- `Best practices for creating and uploading a DJ mix`
- `Best practices for creating and uploading a mashup`
- `Best Practices for Creating and Uploading by Content Type` (the index)
- `How do I avoid infringing someone's copyright?`

**One taxonomy of creative acts, used twice — once for prevention, once for recovery.** A content designer can read this as a template: enumerate the things users actually make, then write the failure article and the prevention article for each.

Casing defect: `Best Practices for Creating and Uploading by Content Type` (Title Case) beside four sentence-cased siblings.

**The company explains *why* it removed the content, and concedes the feeling** `[observed]`

> Section heading: `So why does SoundCloud remove the content in the first place?`
> "We are required by copyright law to remove content reported to us as infringing. **We understand that this can be frustrating**, but we have a deep respect for others' intellectual property rights and must comply with all relevant laws and regulations."

Three moves. The heading is phrased as the **user's exasperated question**, including the idiom `in the first place` — which is how a frustrated person actually phrases it. The answer leads with obligation ("required by copyright law"), then acknowledges the emotion in five words, then states the position. `We understand that this can be frustrating` is the only explicit emotional acknowledgement in the harvested set, and it is placed at the single most frustrating moment in the product.

**Dispute content is a named sub-domain with a validity taxonomy** `[observed]`
`What is a dispute?` · `What are valid and invalid reasons for filing a dispute?` · `Dispute a content ownership-related takedown` · `Filling out the copyright claim form`

`What are valid and invalid reasons for filing a dispute?` is the standout. Publishing the **invalid** reasons alongside the valid ones is a genuine service: it lets a user self-triage out of a process that will fail, saves the seven-day clock, and pre-empts the "I disputed and lost" support ticket. Most platforms publish only the valid grounds, which maximises futile disputes.

The notification itself is documented as carrying the dispute route: "These notifications will provide you with information about **what your content matched against or was reported for**, and how to file a dispute if you have a valid reason." The notification content is specified — the *match* or the *report* is named, so the user knows which of the two paths they are on.

**Rejection is pre-framed** `[documented]` — see T4: "If your release is marked as **Rejected**, don't sweat it. Usually, it just means we need a quick fix—like a metadata correction or proof of license."

**Payout failure gets a three-blocker diagnostic** `[documented]`

> `Troubleshooting: Why didn't I receive a payment?`
> "If it's the end of the month and you haven't seen a deposit, check these three common blockers:"
> 1. `Incomplete Tax/Payout Info:` "**This is the #1 reason for 'stuck' payments.**"
> 2. `Below the $25 Threshold:` "If your earnings (after fees) are **$24.99**, the payment will not trigger until the following month."
> 3. `Reporting Cycles:` "Remember the two-month delay. **If you went viral in June, those earnings won't hit your payout method until the end of August.**"

Three named causes, **ordered by frequency with the ranking stated** ("This is the #1 reason"), and two of the three carry a worked example. `$24.99` as the illustrative figure is better than restating the $25 rule — it shows the user the exact boundary case. `If you went viral in June… end of August` names the scenario in which the delay hurts most and does the date arithmetic.

Note the heading in the body (`Why didn't I receive a payment?`) does not match the heading in the article's own quick-navigation list (`Troubleshooting: Why wasn't I paid?`) — two phrasings of one anchor in one article.

**Other failure-article families** `[observed]`
Listener side: `Can't find a track anymore` · `Unable to play tracks` · `Common Streaming Issues` · `Trouble with offline listening` · `Regional availability` · `Listen and discover troubleshooting` · `Hiding or removing other users' tracks`
Creator side: `Upload Errors & Common Issues` (a named section) · `Help with SoundCloud Insights` · `RSS Feed FAQs & Common Issues` · `List is only partly shared` (not observed here but the pattern holds)
Account side: `Unable to Sign In to Your Account` · `Why was my account terminated?`

`Can't find a track anymore` is the listener-voiced counterpart to the creator's takedown articles — the same event from the other side of the platform, named in the listener's words. Having both is a two-sided-marketplace content decision worth recording: **when content is removed, two different people need two different articles.**

## T8 Empty states

**PRIORITY SECTION.** SoundCloud's genuine empty states are mostly behind auth; what is observable is one clear defect and a set of well-handled zero-value disclosures.

**A stray `0` rendered beneath the help-centre search field** `[observed]` — on `help.soundcloud.com/hc/en-us`, the search block renders as:

> `## Search`
> `Search our knowledge base or browse the topics below`
> `0`

A **result-count value of zero rendered before any query is entered**, exactly the class of defect recorded for Wise (empty-quotes no-results), Firefox (empty interpolation), Audible (`No articles found` under populated lists) and Shazam (`Search ""`). Five of five products in this batch and the exemplar exhibit the same pre-query interpolation failure. That consistency is itself a finding: **the zero-state of a search widget is the single most reliably-broken string in shipped software.**

**Zero-value entitlement states, handled as rules rather than as empty screens** `[documented]`

| Zero state | Copy |
|---|---|
| Balance below payout minimum | "If your balance is lower, it will simply **roll over** to the next month until you hit the threshold." |
| No earnings data yet (new artist) | "You typically won't see data for the first **45–60 days**. We need this time to set up your profiles and begin collecting from partners." |
| Balance shows zero but payment is due | "Don't panic. Royalty statements usually refresh a few days *before* the actual cash transfer." |
| No minimum stream requirement | "There are **no 'minimum stream' requirements** to begin earning FPR. Once your tracks are monetized on SoundCloud, you're in." |

The first three are the best set. `it will simply roll over` — `simply` doing reassurance work on a non-payment. The 45–60-day blank period is explained **by the company's own workload** ("We need this time to set up your profiles and begin collecting from partners"), which converts an empty dashboard from a bug into a disclosed process. And "Don't panic" opening the $0-balance answer is the only place the copy addresses alarm directly.

The fourth is an **explicit absence of a gate**, stated because competitors have one: "no 'minimum stream' requirements… Once your tracks are monetized on SoundCloud, you're in." Naming a threshold you do *not* impose is a competitive disclosure.

**A blocked track is an empty state with a positive framing** `[documented]`
> "The track(s) will remain blocked on your account, **will not count towards your upload quota**, and will not be publicly visible."

The absent content is reframed as a quota that was not consumed. Three clauses, one of which is a benefit.

**Zero-data on the platform side, disclosed** `[documented]`
> `Why don't I see concert information…` — n/a here, but the equivalent: "Some stores like Pandora, iHeart, and Peloton are **curated**. We deliver all approved releases, but **it is ultimately up to those partners what they choose to carry.**"

A release can be approved, delivered, and still not appear — and the reason is a third party's editorial discretion. Stating this in the release flow rather than in a later support article is correct; a user who does not see their track on Pandora has already been told why.

**`Not at present`-class negative answers** `[observed]`, the closest equivalents:
- `Audible Plus`-style closed programme: `Premier (Legacy Program)` retained in the nav
- "Only 100% original or exclusive content can be delivered to these platforms" — a hard exclusion stated as a rule

**Genuinely absent** `[absent]`: first-run library, empty feed, empty Insights dashboard, no-results search string, empty playlist, zero-followers profile, empty Split Pay list. All behind auth.

## T9 Notifications & system messages

**Dual-channel takedown notification, with the channel and the payload both specified** `[documented]`

> "At the time of takedown for an automated or manual takedown, you will receive notification via **email as well as an in-platform notification.** These notifications will provide you with information about **what your content matched against or was reported for**, and how to file a dispute if you have a valid reason."

And in the strikes article, more precisely:
> "we'll take down the reported track and contact you through **an on-site notification and an email sent to the primary address listed on your account.**"

Two channels named, the email destination qualified ("the primary address listed on your account" — which matters, because an out-of-date address means a missed seven-day dispute window), and the notification's **content specified in advance**. A user reading this help article knows, before any takedown, exactly what they will be told and where. That is the right way to document a consequential notification: describe its payload, not just its existence.

Note the vocabulary drift across two articles for one thing: `in-platform notification` in one, `on-site notification` in the other, and `in-product notifications` in a third sentence of the same article. Three names for one channel.

**The standing marketing banner as a system message** `[observed]` — on every help page:
> "We're the first music company to introduce fan-powered royalties, where independent artists can get paid more because of their dedicated fans. More info here."

Persistent, undismissable, promotional, and in the help-centre chrome. Effective positioning; questionable as support furniture, and `here` as the link text (T3).

**The status page is a manually-edited help article, and it is stale** `[observed]` — recorded as a significant defect.

> `Current status:` `Operational`
> "Sept 3rd, 14:47 CEST: We're currently experiencing issues with Web Track Page, Artist Studio and Upload, our engineers are working on a fix."
> "Sept 3rd, 15:17 CEST: All clear. The issue has been resolved."

Then an eleven-row table in which every value is `Operational`.

Four problems. (1) It is a **Zendesk knowledge-base article**, not a status system — there is no automated component monitoring behind it, it carries a `Was this article helpful?` widget and `Related articles`, and it sits inside the `My Account` category with a breadcrumb. (2) **No year** on either timestamp; at a harvest date of 21 September 2026, "Sept 3rd" is ambiguous and the entry is at best 18 days stale. (3) The resolved incident is left in place above a table showing all-clear, so the page simultaneously reports a live-sounding incident ("We're **currently** experiencing issues") and a fully operational system. (4) The incident log is two lines with no root cause, no duration summary, and no affected-component mapping to the table below it.

The one creditable thing: the incident entry **names the specific affected surfaces** (`Web Track Page`, `Artist Studio`, `Upload`) rather than saying "some users may experience issues", and the resolution message is two words plus a sentence (`All clear. The issue has been resolved.`).

**Notification-adjacent content** `[observed]`: `Copyright methods and notifications` as an article title (notification design documented as a user-facing topic — the same good practice Wise shows); `Add & manage captions on reposts`; `React to Tracks`.

**Confirmation and timing messages** `[documented]`
- Monetization: "Submit your Monetization Review and allow up to **3-5 business days** for approval."
- Payouts: "Payments are typically processed on the **last business day of the month**."
- Cancellation: "You won't be charged again, **provided you canceled before your next scheduled billing date.**"

That last conditional is the honest one — the no-further-charge promise is bounded by the condition that makes it true, rather than stated flatly.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** SoundCloud's revenue and rights disclosure is the reason this product is in the corpus.

### The royalty share: a number, a date, and the exception

`[observed]` The cleanest money disclosure in this batch:

> `Your Royalty Share`
> "As of **November 2025**, SoundCloud has updated our royalty share to **100%**."
> "**You keep 100% of your earnings** from both SoundCloud and external DSPs."
> "**Processing Fees:** Our payout processor applies a small fee (starting as low as **$0.50 USD**) per transaction. You will see the **exact fee estimate** when you add or edit your payout method."

Four things worth recording.

**The headline number is 100%, and it is immediately bounded.** The sentence "You keep 100% of your earnings" would be misleading alone; the very next bullet names the processing fee, gives its floor (`starting as low as $0.50 USD`), and — critically — **routes the user to their own exact figure** ("You will see the exact fee estimate when you add or edit your payout method"). This is precisely the Wise exemplar's *claim, bound the claim, route to a personalised figure* pattern, executed on a revenue split. It is the strongest instance of that pattern in this batch.

**`starting as low as` is doing careful work.** The fee is variable by payout method and corridor; rather than averaging it or hiding it, the copy gives the floor and defers the actual number to the point of configuration.

**The change is dated.** "As of November 2025" tells an artist reading in 2026 that this supersedes whatever they remember, and gives them a date to reason about against their historical statements. Undated policy changes are the commonest cause of "but I thought…" support tickets.

**External DSP royalties are disclosed separately and completely.** From the FPR article: "While we don't control external models, we pay out **100% of the royalties** these partners send to us, **minus a small payout processing fee**." Two disclosures in one sentence: what SoundCloud controls (nothing, about Spotify's model) and what it does with what it receives (all of it, less the fee). The disclaimer of influence over third-party models comes *before* the commitment, which is the right order — it prevents the 100% claim being read as "100% of what Spotify earns".

### Fan-powered Royalties: a revenue model explained in three inputs

`[observed]`
> "**Your earnings are calculated based on:**
> 1. **Listening Time:** How much of a fan's total monthly listening was dedicated to *your* music.
> 2. **Ads & Subscriptions:** The number of ads that a fan viewed or whether they have a SoundCloud Go+ subscription.
> 3. **Revenue Share:** SoundCloud's share of advertising and subscription revenue."

Three named inputs, each one sentence, each expressed from the **fan's** side rather than the platform's. Input 1 is a ratio with the denominator named ("a fan's *total* monthly listening") — which is the entire mechanism of user-centric royalties, stated in fourteen words. Input 3 discloses that SoundCloud takes a share of the gross before the artist's share is computed, which sits in tension with the "100%" headline elsewhere and is nowhere reconciled. Recorded as an unresolved tension rather than a contradiction: 100% presumably refers to the artist's allocated royalty after SoundCloud's revenue share, but no sentence says so.

**The scope limitation is bolded and given its own section** `[observed]`
> `FPR vs. External Distribution`
> "It is important to note that **Fan-powered Royalties only apply to plays on SoundCloud.**"
> Then: external platforms "use their own royalty models (typically the traditional pooled model)".

A flagship differentiator, and the article devotes a section to saying where it does *not* apply. Naming the competitor platforms (Spotify, Apple Music, Amazon Music) and their model type, in an article selling your own model, is confident and honest.

**The fraud argument as a disclosure** `[observed]`
> `How FPR Fights Fraud`
> "Traditional pooled models are vulnerable to 'streaming fraud'—where bots play tracks on a loop to siphon money from the total pool. Under Fan-powered Royalties, bots have **significantly less influence.** Because royalties are tied to the actual contribution of a specific listener (subscription fee or ad views), a bot 'looping' a track doesn't create 'new' money from a shared pool."

`significantly less influence` rather than "eliminates fraud" — a hedged claim about a security property, which is the correct register. The mechanism is then explained in one sentence so the reader can verify the claim themselves. This is a good template for any "our architecture makes X harder" claim: **hedge the outcome, explain the mechanism, let the reader check.**

### Payout terms: threshold, delay, and the industry-standard defence

`[observed]`
> `**The $25 Rule:**` "Payments are automatically deposited once your balance reaches **$25 USD** (after processing fees). If your balance is lower, it will simply roll over to the next month until you hit the threshold."
> `**The "Standard Delay":**`
> — First-time earners: "you typically won't see data for the first **45–60 days**. We need this time to set up your profiles and begin collecting from partners."
> — Ongoing: "earnings appear on a **two-month delay**. (Example: January's streams are usually reported and paid at the end of March). **This is the global industry standard for royalty reporting.**"

Naming the rules (`The $25 Rule`, `The "Standard Delay"`) makes them referenceable — an artist and a support agent can say "the $25 rule" and mean the same thing. The threshold is qualified `(after processing fees)`, which is the difference between $25 gross and $25 net and is exactly where a user would otherwise be surprised.

`This is the global industry standard for royalty reporting` is a **normative defence of an adverse term**. It is a legitimate one (royalty reporting genuinely lags by ~two months platform-wide), and placing it immediately after the worked example rather than instead of it is the right order: show the user the delay, then explain that it is not SoundCloud's choice. Compare the weaker move of leading with "industry standard" as a reason not to explain.

### Tax withholding: reason, resource, and a recommendation to seek outside advice

`[observed]`
> `Taxes & Withholdings: Why are my earnings being taxed?`
> "To remain compliant with U.S. IRS regulations, SoundCloud must withhold a percentage of earnings from certain accounts."
> "**The Reason:** The U.S. government recognizes royalties as taxable income. For artists based outside of the U.S., we are legally required to withhold a portion of those payments to cover federal taxes on income earned 'abroad.'"
> "**The Resource:** …the official IRS resource here" (links IRS Publication 515)
> "**Pro-Tip:** Tax laws vary significantly by country and by your local tax treaties with the U.S. **We strongly recommend consulting a tax professional** to understand how this specifically affects your earnings."

Structure: obligation → reason → primary source → limit of our advice. Linking the actual IRS publication rather than paraphrasing it, and then explicitly declining to advise ("We strongly recommend consulting a tax professional"), is the correct posture for a platform that is not a tax adviser. The phrase "income earned 'abroad'" is scare-quoted — the copy is flagging that "abroad" is from the US government's perspective, not the artist's, which is a small act of care for a non-US reader.

No withholding **rate** is given, which is the notable omission: the article explains that withholding happens and why, but not how much. `a percentage` and `a portion` are the only quantifiers.

### Rights clearance: the most demanding creator disclosure in the file

`[observed]` `Verify your Rights for Monetization & Distribution` states the platform's position as a distributor, not a host:

> "**As a distributor, we can only approve releases when we can confirm you're the rightsholder.** This means you must either own or control all content in your track, or have proper permission to use it."

Then the specific, operational rules:
- "If your track includes anything you didn't create—such as a **beat, stem, or sample**—be sure to include the relevant licensing agreements."
- "If your track uses **non-exclusive** beats, samples, or stems, you must **remove YouTube Content ID and uncheck TikTok and Meta** from your selected platforms before submitting. **Only 100% original or exclusive content can be delivered to these platforms.**"
- "To ensure all contributors are properly credited, include accurate and complete contributor information in your track metadata."

The non-exclusive rule is the standout disclosure: it names **three specific downstream platforms** whose fingerprinting systems cannot accept non-exclusive content, tells the user exactly which checkboxes to change, and states the underlying principle. A licensing constraint expressed as a UI instruction.

**The two-rights explanation** `[observed]` — the clearest plain-language statement of music copyright in this corpus:
> "If you've used samples from other recordings, you'll typically need permission from:
> - The **songwriter** (composition rights), and
> - The owner of the **original recording** (master rights)
> Even if a melody is old or in the public domain, **the specific recording you sampled may still be protected by copyright.**"

Two rights, each named twice (role and legal term), then the counter-intuitive case that trips people up most — public-domain composition, protected recording — in one sentence. And the honest terminus: "If not, you may need to remove the sample and recreate that element yourself."

**`Types of Acceptable Documentation` — an enumerated evidence list** `[observed]`
- `Exclusive or non-exclusive beat license`
- `Purchase receipts for sound packs, beats, or samples`
- `Collaboration or remix agreements (if working with other artists)`
- `Mechanical licenses for cover songs (please be sure to license 100 downloads or more)`

Four evidence types with a parenthetical qualifier on two, including a **specific quantity** (`100 downloads or more`) for mechanical licences. Then, unusually, **three named third-party resources** to obtain the documentation: Splice (sample licences), Easy Song (mechanical licences), BeatStars (a licensing guide). A platform linking out to commercial services that solve the compliance problem it has just created for the user — helpful, and a disclosure of the ecosystem the rule depends on.

### Copyright policy, strikes and termination

`[observed]` See T6 and T7. The compliance frame is stated plainly — "We are required by copyright law to remove content reported to us as infringing" — and the termination clause is tied to the Terms: "In line with our **Terms of Use**, we have to permanently terminate accounts that have reached more than two active strikes", with the link anchored to `#repeated_infringement`. **Deep-linking to the specific Terms of Use anchor** rather than to the document root is good practice and rare.

### Subscription and cancellation disclosure

`[observed]`
> "When you cancel your SoundCloud Go subscription, you'll keep your premium features—including ad-free listening and offline downloads—**until your current billing cycle ends**. You can check the exact '**expires**' date on your Subscriptions page."
> "Once that period is over, your account will automatically **revert to our free, ad-supported experience.** You won't be charged again, provided you canceled before your next scheduled billing date."

Retained benefits named specifically (not "your benefits"), the end date routed to the user's own account page and quoted by its UI label, the destination state described by its properties, and the no-charge promise conditioned. Four sentences, no ambiguity. The one gap: nothing about what happens to **offline downloads already on the device** — the most likely user question after cancelling an offline-capable subscription.

**Plan-table disclosures** `[observed]`: region-gating ("Subscription availability depends on your region"), student discounts qualified `(where available)`, and the Artist Pro cross-benefit ("Artist Pro subscribers are eligible for **50% off** a SoundCloud Go+ subscription").

### Disclosure defects recorded

- **Upload-time contradiction.** The prose says "**Basic (Free):** The entry point. Upload up to **3 hours** of audio"; the table immediately below says `Basic (Free)` = `Up to 2 hours` and `Artist` = `Up to 3 hours`. A free-tier quota stated two different ways, three paragraphs apart, in the product's pricing article.
- **Distribution eligibility contradiction.** `How to Distribute with SoundCloud` opens "Once you've **subscribed to Artist Pro**… you're ready", and Step 5 says Split Pay "is available to **Artist Pro** subscribers". But the plan table grants `Artist` (the cheaper tier) "Distribution to other platforms: **2 tracks per month**". The how-to article effectively tells paying `Artist` subscribers that distribution is not for them.
- **Truncated sentence in the plan description:** "`Artist Pro`: The ultimate toolkit. Unlimited uploads, advanced analytics, custom profile branding, **and for collaborators.**" The sentence ends mid-clause — presumably "and Split Pay for collaborators".
- **Truncated list in the distribution article:** "Ensure your artwork meets all requirements put in place by our distribution partners, **including:**" — followed by nothing.
- **`100%` tension** between the headline royalty share and the FPR input that names "SoundCloud's share of advertising and subscription revenue" as a calculation factor. Not reconciled anywhere.
- **No withholding rate** given in the tax section.
- **No privacy-policy link** in the help-centre footer (only `Terms of Use` and `Cookie Manager`).

## T11 Help-centre architecture

**Platform:** Zendesk Guide (`/hc/en-us/` paths, `categories/sections/articles` hierarchy, base64 tracking payloads on `Related articles` links, per-article `Was this article helpful?`). Three levels are standard; SoundCloud frequently uses **four or five** — e.g. `Help Center > Creators on SoundCloud > SoundCloud for Artists > Royalties & Earnings > Fan-powered Royalties`, and the distribution article sits five deep (`… > Distribution with SoundCloud > Get Started with Distribution > How to Distribute with SoundCloud`).

**Deep nesting is a legibility cost and an accuracy benefit.** The breadcrumb tells a creator precisely where in the creator estate they are, but the section-above-the-title rendering is confusing: every article page renders its **parent section name as an H1-weight heading above the article's own H1**, so `Fan-powered Royalties` appears under a large `Royalties & Earnings`, and `Why was my track taken down from SoundCloud?` under `Copyright Infringement & Takedowns`. Two competing page headings, the parent first.

**Article-title grammar — five shapes, with audience marked in the title**

| Shape | Examples |
|---|---|
| `Why was/is my <object> <verbed>?` | `Why was my track taken down from SoundCloud?`, `Why was my account terminated?`, `Why don't I see…` |
| `Your <thing you made> was taken down for copyright infringement` | DJ mix, mashup, cover version, remix — the content-type family |
| `How do/does <X> work?` / `How to <verb>` | `How do copyright strikes work?`, `How to Distribute with SoundCloud`, `How do I avoid infringing someone's copyright?` |
| `<Gerund> <object>` | `Getting Paid by SoundCloud for Artists`, `Choosing the Right Subscription`, `Reporting a spam account`, `Downloading tracks`, `Creating an account on SoundCloud` |
| `<Verb> your <object>` | `Verify your Rights for Monetization & Distribution`, `Cancel your subscription`, `Protecting your content on SoundCloud` |

The `Your <creative act> was taken down` family (T7) is the distinctive one. Beyond it, the notable discipline is that **many titles carry their audience**: `Getting Paid by SoundCloud **for Artists**`, `Copyright **for SoundCloud Creators**`, `Benefits **for Artists** Subscribers`, `SoundCloud Go+ Discount **for Artist Pro**`, `Best Practices **for Creating and Uploading**`. On a platform where the same word (`track`, `subscription`, `royalties`) means different things to a listener and a creator, putting the audience in the title is load-bearing.

**Casing is inconsistent and visibly so.** Title Case and sentence case sit side by side throughout: `Choosing the Right Subscription` / `Creating an account on SoundCloud`; `Verify your Rights for Monetization & Distribution` (mixed within one title — `your` lowercase, `Rights` capitalised); `Best Practices for Creating and Uploading by Content Type` / `Best practices for creating and uploading a DJ mix`; `Getting Paid by SoundCloud for Artists` / `What happens when I cancel my Go subscription?`. There is no discernible rule, and adjacent siblings in the same section diverge.

**Section-name vocabulary drift** `[observed]`: `Copyright, Trademark & Takedowns` (under `Upload on SoundCloud`) versus `Copyright Infringement & Takedowns` (under the copyright category) — two similarly-named sections in two different parents, one of which adds trademark. And `Subscription Management` exists as an article in **two different categories** under two IDs (`360051642434` and `45971952592283`) — one for listeners, one for creators. Defensible (the procedures differ) but the identical title means search returns two indistinguishable results.

**In-article structure** `[observed]`: standfirst → an **embedded YouTube video** (`youtube-nocookie.com`, three of the seven long articles carry one or more) → `Quick Navigation` anchor list (on the payout article) → H3 sections with bolded lead-ins → `>` blockquoted `Tip:` / `Pro Tip:` / `Pro-Tip:` insets (**three spellings of one label**, one per article) → horizontal rules between sections → a closing `Ready to…?` / `Need more help?` CTA → feedback widget → `Have more questions? Submit a request` → five `Related articles`.

The **`Ready to start earning?` / `Ready to upgrade?` closing pattern** is consistent and good: every long article ends by naming the next action as a question plus a destination-named link, rather than trailing off.

**Escalation ladder** `[observed]`: search → category → section → article → `Was this article helpful?` → `Have more questions? Submit a request`. Plus, on the payout article only:

> "View our Full Fees Outline or **talk to our AI Agent to escalate a specific payment discrepancy to a support specialist.**"

**The AI agent is named as the escalation mechanism to a human.** This is a genuinely current artefact: the support path for a money problem is documented as *tell the AI agent, which will escalate to a specialist*. The copy is honest about the agent being a router rather than a resolver ("to escalate… to a support specialist"), which is the right framing and avoids implying the AI will fix a payment discrepancy. Noted as a pattern likely to recur across the corpus.

`copyrights@soundcloud.com` is the only direct human email address surfaced, and only for the case where a struck user cannot access email or in-product notifications.

## T12 FAQs

**No standalone FAQ page.** `[observed]` FAQs appear in three forms: `FAQs` as an article-title suffix, a `Frequent Questions` block inside a longer article, and question-form article titles throughout.

**`Frequent Questions` inside the subscription article — three questions, and the first one matters** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Can I have both an Artist and a Listener subscription? |
| 2 | *(framed as)* Bonus for Pros |
| 3 | Where are the Go, Go+, and DJ subscriptions available? |

Q1's answer: "**Absolutely.** Your **Artist Pro** subscription provides the tools to manage your career, while **SoundCloud Go+** is for your personal listening experience (ad-free and offline)."

This is the most important FAQ in the file, because it resolves the platform's central confusion: SoundCloud sells two orthogonal subscription products to what is often the same person, and a user reasonably assumes the paid creator tier includes the paid listener tier. The answer opens with `Absolutely.` — a one-word affirmation — then distinguishes the two by **purpose** ("tools to manage your career" vs "your personal listening experience") rather than by feature list. And the follow-on discloses the cross-subsidy: Artist Pro subscribers get 50% off Go+.

Q2 is not a question — `Bonus for Pros:` is a statement mis-filed into a question block. Q3's answer defers entirely to another article.

**`FAQs` as a title suffix** `[observed]`
`Premier Monetization FAQs` · `Premier Payments FAQs` · `SoundCloud Referral Program FAQ` · `RSS Feed FAQs & Common Issues` · `Help with SoundCloud Insights`

Note the inconsistency: `FAQs` (plural) on three, `FAQ` (singular) on one. And `RSS Feed FAQs & Common Issues` is the interesting compound — FAQ and troubleshooting merged into one section name, which is honest about the fact that most RSS questions *are* problems.

**Question-form article titles, listener side** `[observed]`
`What happens when I cancel my Go subscription?` · `What is Top Tracks?` · `Can't find a track anymore` · `Unable to play tracks`

**Question-form article titles, creator side** `[observed]`
`Why was my track taken down from SoundCloud?` · `Why was my account terminated?` · `How do copyright strikes work?` · `What happens when I upload my content?` · `What is copyright?` · `What are SoundCloud's copyright policies?` · `Do I need to copyright my content?` · `How do I avoid infringing someone's copyright?` · `What is a dispute?` · `What are valid and invalid reasons for filing a dispute?` · `How do I report content on SoundCloud that infringes my copyright?` · `What type of royalties does SoundCloud for Artists collect?`

**The copyright question set is the corpus's best example of an educational FAQ ladder.** It runs: `What is copyright?` → `Do I need to copyright my content?` → `What happens when I upload my content?` → `What are SoundCloud's copyright policies?` → `How do I avoid infringing someone's copyright?` → and only then into the failure and dispute questions. A platform whose users routinely break copyright by accident has built its help content to teach the concept before adjudicating it. `Do I need to copyright my content?` is the question a self-releasing artist actually has and almost no platform answers.

`What are valid and invalid reasons for filing a dispute?` remains the standout (T7) — a compound question that publishes the grounds for failure alongside the grounds for success.

**In-article question headings** `[observed]`
`Troubleshooting: Why wasn't I paid?` / `Why didn't I receive a payment?` (the same section, two phrasings) · `Taxes & Withholdings: Why are my earnings being taxed?` · `So why does SoundCloud remove the content in the first place?` · `Using samples? Here's what to know` · `Want your tracks approved on the first try?` · `"My balance shows $0, but I haven't been paid."`

That last one is formatted as a **quoted user utterance used as a heading** — the only instance in this batch. It is the purest form of the "write the sentence the user would say" pattern: not a paraphrased question, but the complaint in quotation marks.

## T13 Terminology & glossary

| Term | SoundCloud's usage | The alternative it rejected |
|---|---|---|
| `Fan-powered Royalties` / `FPR` | The user-centric royalty model; abbreviated after first full use | "user-centric royalties" (the industry term) |
| `pro-rata` | The incumbent pooled model, named in scare quotes to be argued against | leaving the alternative unnamed |
| `pool` / `the top 1% of global artists` / `mega-stars` | The antagonists in the FPR argument | "other platforms" |
| `fan` vs `listener` | Two words, kept distinct: `fan` is the economic unit, `listener` the product unit | one undifferentiated "user" |
| `Top & First Fans` | An Insights metric naming the earliest supporters | "top listeners" |
| `Royalty Share` | The artist's cut, `100%` as of Nov 2025 | "revenue split", "rev share" |
| `Split Pay` | Automated per-track earnings splits for collaborators | "revenue sharing", "collaborator payouts" |
| `The $25 Rule` | The named payout minimum | "minimum payout threshold" |
| `The "Standard Delay"` | The named two-month reporting lag | "reporting lag" |
| `roll over` | What a sub-threshold balance does | "carry forward", "remain pending" |
| `DSPs` | External streaming services, unglossed | "streaming platforms" |
| `blocked` | Automated content-ID outcome — **no strike** | "removed", "taken down" |
| `taken down` / `removed` | Manual rightsholder outcome — **strike clock starts**; two words used for one event | |
| `strike` / `active strikes` | The penalty unit, with 12-month expiry | "violation", "warning" |
| `dispute` | The creator's challenge to a takedown | "appeal", "counter-notice" |
| `Rejected` | Distribution review failure state | "declined", "not approved" |
| `rightsholder` | The party whose permission is needed | "copyright owner", "label" |
| `composition rights` (songwriter) / `master rights` (recording owner) | The two music copyrights, each double-named | leaving them unexplained |
| `beat, stem, or sample` | The three third-party elements a producer might use | "third-party content" |
| `non-exclusive` / `100% exclusive` | The licence grade that gates UGC-fingerprinting delivery | "licensed" |
| `UGC Fingerprinting services` | TikTok, Facebook/Instagram, YouTube Content ID as a class | "social platforms" |
| `curated` | Stores (Pandora, iHeart, Peloton) that choose what to carry | "editorial", "playlist-based" |
| `Editorial`-equivalent | — | (contrast Shazam's `Editorial Hides`) |
| `Preview Start Time` | The clip-start field for TikTok/Instagram | "hook", "snippet start" |
| `ISRC` | Unglossed recording identifier, with an offer to assign one | |
| `Mastering, powered by Dolby` | The mastering feature, with the partner in the label | "AI mastering" |
| `Mastering Credits` | The per-month mastering entitlement unit | "mastering runs" |
| `Spotlight tracks` | Pinned profile tracks | "featured", "pinned" |
| `Track boosting` | Paid/quota'd promotion | "promote" |
| `Repost` | The share-to-followers action (a SoundCloud-originated term) | "share", "retweet" |
| `Next up - Play Queue` | The queue | |
| `Daily Drops` / `Stations` / `Top Tracks` / `Related tracks` | Discovery surfaces | |
| `Insights` | The analytics product, three tiers (`Basic` / `Standard` / `Advanced`) | "Analytics", "Stats" |
| `Go` / `Go+` / `DJ` | Listener tiers | |
| `Basic (Free)` / `Artist` / `Artist Pro` | Creator tiers | "Pro", "Pro Unlimited" (the former names) |
| `SoundCloud for Artists` / `SC4A` | The creator dashboard; the initialism appears once, unglossed | |
| `Artist Studio` | Named in the status incident log — **a surface named nowhere else** | |
| `Premier (Legacy Program)` | The superseded monetisation programme, marked in the nav | silent deletion |
| `AI Agent` | The support escalation router | "chatbot", "virtual assistant" |
| `Vinyl Distribution` | A physical-product help category | |

**The `fan` / `listener` split is the terminology decision the business rests on.** Fan-powered Royalties, `Top & First Fans`, `Fan & Community Tools`, `Fan Subscriptions` — the word `fan` is used wherever money or relationship is involved, and `listener` wherever playback or plan is involved. `SoundCloud Fans & Listeners` as a help category names both because the category serves both purposes. This is a deliberate, sustained distinction that a single-audience platform would not need, and it is the vocabulary that makes the FPR argument possible: you cannot say "your fans' money goes to you" if your users are "listeners".

**`blocked` versus `taken down` is the consequential distinction and the maintained one is the wrong one.** The *consequence* difference (no strike vs. strike clock) is explained clearly and consistently. The *labels* are not: article titles use `taken down` and `removed` interchangeably for manual takedowns, and `blocked` and `flagged` for automated ones. Four words, two states.

**`Split Pay` is the best coined term in the file.** Two syllables, self-describing, and it names an action rather than a feature category. Compare "revenue sharing agreement" or "collaborator royalty allocation". It also survives being used as a noun, a tab name, and a step heading without strain.

**Naming a rule turns it into a referent.** `The $25 Rule` and `The "Standard Delay"` are both given proper-noun treatment, quotation marks and capitals. This is a small, cheap move with a real payoff: named rules can be cited by users, by support, and in the product, and they stop being re-explained from scratch each time. The scare quotes on `"Standard Delay"` are the odd part — they hedge the standardness of a delay the article goes on to defend as the global industry standard.

**`composition rights` / `master rights`, each double-named**, is how the rights explanation works: role first (`The songwriter`, `The owner of the original recording`), legal term in parentheses. A non-lawyer can hold the concept by the role and still recognise the term when they meet it in a licence.

**Register split by audience, not by surface.** The creator estate uses trade vocabulary freely and mostly unglossed — `DSPs`, `ISRC`, `stems`, `master rights`, `UGC Fingerprinting`, `pro-rata`, `mechanical licenses`, `Content ID`. The listener estate is plain — `Shuffling and Repeating tracks`, `Dark mode`, `Your Feed and how it works`. SoundCloud assumes its creators are semi-professional and its listeners are not, and the vocabulary follows. Defensible, and it is why `ISRC` can appear as a bare field label.

**Stale and orphan terms:** `Artist Studio` appears only in the status incident log; `SC4A` is used once without expansion; `Pro Tip` / `Pro-Tip` / `Tip` are three labels for one inset type.

## T14 Voice, tone & accessibility

**Published style guidance:** `[absent]`. No SoundCloud content style guide, voice-and-tone documentation, or design system was found publicly.

### Observed register

**Person.** Second person for the user, first-person plural for the company, used unusually assertively on both sides. The company is a visible actor in adverse copy — "**We** are required by copyright law to remove content", "**we** have to permanently terminate accounts", "**We** do not issue strikes", "**we** need a quick fix", "**We** need this time to set up your profiles" — and also in the promotional copy ("**We're** the first music company to introduce fan-powered royalties"). The passive voice is largely avoided even where it would be safer.

Possessives do a lot of work: `your tracks`, `your fans`, `your earnings`, `Your Royalty Share`, `your catalog`, `your release cycle`, `Your <thing you made> was taken down`. Ownership language is applied to the creator's work and the creator's money consistently — which is the whole positioning.

**Register is noticeably more colloquial than any other product in this batch, and it flexes by stakes in an unusual direction.** Idiom and informality cluster in the *high-stakes creator* content rather than away from it:

- `don't sweat it` (release rejection)
- `Don't panic.` ($0 balance)
- `Don't worry about manual bank transfers` (Split Pay)
- `FPR changes the game by making it personal.`
- `you're in.` (monetization eligibility)
- `"stuck" payments`
- `If you went viral in June…`
- `If you're dropping an EP` (`dropping` as the release verb)
- `send your tracks to the world`
- `Choose where your music lives.`
- `Take your career to the next level`
- `mega-stars`, `giant "pool"`
- `siphon money`

`Choose where your music lives.` is the best line in the file — five words for platform selection, and `lives` frames distribution as habitation rather than delivery. `If you're dropping an EP` uses the artist's own verb.

The colloquialism is **intentional register-matching to a music-maker audience**, and it mostly works. Where it fails is at the two points where money and law are at stake: `don't sweat it` about a commercial release rejection, and `Don't panic` about a missing payment, both slightly undercut the seriousness of what the reader is dealing with. And `Take your career to the next level` is pure filler. The tone does *not* flatten as stakes rise — the opposite of the Wise gradient — and unlike Firefox (156), where the humanised register sits in prose and the flat register in reference tables, SoundCloud keeps the colloquial voice inside the tables' own explanatory cells.

**Emphasis via bold is heavy and semantic.** Numbers, plan names, UI labels, rule names and key constraints are bolded throughout, often several times per paragraph. It makes the long payout and distribution articles genuinely scannable; it also means the bold has lost discriminating power by the third section.

**Numbers are specific, operational, and everywhere:** `100%`, `$25 USD`, `$0.50 USD`, `$24.99`, `45–60 days`, `two-month delay`, `3-5 business days`, `seven days`, `12 months`, `30–45 days`, `3000x3000px`, `300 dpi`, `100 downloads or more`, `50% off`, `2 tracks per month`, `30 tracks per day`, `November 2025`, `top 1%`. Almost every number is a rule or a threshold rather than a marketing claim — the same discipline as Audible (157) and the opposite of Shazam (158), which has almost no numbers at all.

**Punctuation and typography defects** `[observed]`: em-dashes used unspaced (`features—including ad-free listening`) in some places and spaced elsewhere; `3-5 business days` with a hyphen against `45–60 days` and `30–45 days` with en-dashes; `Pro Tip` / `Pro-Tip` / `Tip`; `Monetization Tab` / `Monetization tab`; inconsistent Title/sentence case in headings and article titles throughout.

### Accessibility

**`Skip to main content`** `[observed]` is present and first in the DOM on every help page, correctly anchored to `#page-container` (contrast Shazam's `javascript:void(0);`).

**Everything else is a gap.**

- **No accessibility statement, no VPAT, no conformance claim** found anywhere on soundcloud.com or help.soundcloud.com. There is no `Accessibility` link in the help footer (which carries only `SoundCloud`, `For Artists`, `Terms of Use`, `Cookie Manager`), no `Accessibility` help category, and no accessibility article in any of the fourteen pages' section listings. Compare Audible (157), which has `Accessibility` as a top-level nav item and three published design principles, and Firefox (156), which publishes a dated VPAT. **For a platform whose core object is audio and whose creator tools are visual (waveforms, spectrograms, analytics charts), the absence is conspicuous.**
- **`Dark mode` is the only accommodation-adjacent article** in the entire listener estate, filed under `Filters & Personalization` alongside `Mood & Genre Filters` — i.e. treated as a taste preference rather than a visual accommodation.
- **Five social links rendered as raw URLs** (`https://www.facebook.com/SoundCloud/`) as link text, in the footer of every page. A screen reader announces the full URL character by character, five times, on every page. Identical defect to Shazam (158).
- **A stray `0`** rendered beneath the help search field (T8) — announced as content with no context.
- **Instructions are position- and gesture-dependent with no alternatives given** `[documented]`: "click **Distribute** below the waveform", "click the three dots on the right-hand side of your track", "click the **Edit** icon", "Select **Monetize this track** adjacent to the relevant track", "the section labeled **License Documentation**". Every creator action is located by spatial relation to a visual element, and several are named only by icon (`the Edit icon`, `the three dots`). No keyboard path, no accessible name, no alternative route is documented for any of them.
- **The `Distribute` control is anchored to the waveform** — a purely visual, non-textual representation of audio — which is the single most accessibility-relevant UI decision in the product and is nowhere addressed.
- **Artwork requirements are visual-only** (`3000x3000px`, `300 dpi`) with no mention of alt text or image description for release artwork, which is the one place a distribution platform could easily require accessible metadata.
- **Three embedded YouTube videos** across the seven long articles, with no transcripts, captions statement, or text-alternative note. In the payout article the video sits between the standfirst and the `Quick Navigation` list, so a non-visual reader encounters an unlabelled embed before the article's structure.
- **A truncated sentence and a truncated list** (T10) mean two pages have content that is simply missing for every reader.
- **Deep breadcrumbs plus a parent-section heading above each article's H1** produce a doubled, ambiguous heading structure on every article page — two headings of similar visual weight, the first of which is not the page's subject.

**One accessibility-adjacent positive:** the help centre is localised into eight languages (`Deutsch`, `Español`, `Français`, `Italiano`, `Nederlands`, `Polski`, `Português do Brasil`, `Svenska`), with **per-article localised URLs** — the language switcher preserves the reader's position, so switching language does not dump the user at the home page. That is correctly implemented and rare.

### Negative findings, recorded honestly

- **`Basic (Free)` upload quota stated as `3 hours` in prose and `Up to 2 hours` in the table**, three paragraphs apart in the pricing article
- **Distribution eligibility contradicted**: the how-to requires `Artist Pro`; the plan table grants `Artist` two distributed tracks per month
- **Truncated sentence** in the `Artist Pro` plan description: "custom profile branding, and for collaborators."
- **Truncated list** in the distribution article: "…requirements put in place by our distribution partners, including:" followed by nothing
- **`100%` royalty share versus FPR's "SoundCloud's share of advertising and subscription revenue"** as a calculation input — never reconciled
- **No withholding rate** in the tax section
- **Status page is a stale Zendesk article** with no year on its timestamps, a resolved incident presented in present tense above an all-clear table, and no automated monitoring behind it
- `My track was removed from SoundCloud for copyright infringement` appears **twice** in the copyright category under two article IDs
- `Subscription Management` exists as **two articles with identical titles** in two categories
- `in-platform notification` / `on-site notification` / `in-product notifications` — three names for one channel
- `blocked` / `flagged` / `taken down` / `removed` — four words, two states
- `Pro Tip` / `Pro-Tip` / `Tip` — three spellings of one inset label
- `Monetization Tab` / `Monetization tab`; `Distribution tab`
- `Troubleshooting: Why wasn't I paid?` (nav anchor) vs `Why didn't I receive a payment?` (section heading) — one section, two titles, one article
- `FAQs` / `FAQ` inconsistently pluralised in article titles
- Title Case and sentence case mixed throughout article titles, including within a single title (`Verify your Rights for Monetization & Distribution`)
- `Copyright, Trademark & Takedowns` vs `Copyright Infringement & Takedowns` — two similar section names in two parents
- `Bonus for Pros:` filed as an entry in a `Frequent Questions` block despite not being a question
- `More info here.` — bare `here` as the link text in the site-wide banner, the most-viewed link in the help centre
- Five raw social URLs as link text in every footer
- Stray `0` under the help search field
- `Artist Studio` named only in the status incident log
- `SC4A` used once without expansion
- Offline-download fate after cancellation not addressed
- No accessibility statement, no accessibility category, no accessibility article, no conformance claim
- No privacy-policy link in the help-centre footer
- Parent section name rendered above each article's own H1

---

## Transferable patterns

1. **Split the help IA by audience before splitting it by topic.** `SoundCloud Fans & Listeners` / `Creators on SoundCloud` / `External Rightsholders & Distribution via Supply Chain` — three populations, three front doors, and the same words (`track`, `royalties`, `subscription`) safely mean different things in each. Then **put the audience in the article title** (`Getting Paid by SoundCloud for Artists`, `Copyright for SoundCloud Creators`). Essential for any two-sided marketplace; directly applicable to buyer/seller, payer/payee, consumer/merchant estates.
2. **Slice failure by what the user made, not by what rule they broke.** `Your DJ mix was taken down…` / `Your mashup…` / `Your cover version…` / `Your remix…` / `A track you bought…`. Then reuse the **same taxonomy in the preventative voice** (`Best practices for creating and uploading a DJ mix`). One list of the things users actually do, two articles each — one for prevention, one for recovery. The most reusable IA decision in this file.
3. **Publish the invalid grounds alongside the valid ones.** `What are valid and invalid reasons for filing a dispute?` lets a user self-triage out of a process that will fail them, saves the seven-day clock, and pre-empts the "I appealed and lost" ticket. Applies to disputes, chargebacks, claims, appeals and refund requests.
4. **Distinguish the consequence-free failure from the consequence-bearing one, and name them differently.** `blocked` (automated, no strike, "no further action is needed on your part") vs `taken down` (manual, seven-day dispute clock, then a strike). And tell the user the three things they most want to know about the harmless case: it's invisible, it's harmless, and **it didn't use up your quota**. Condition: maintain the labels — SoundCloud's own titles drift across four words for two states.
5. **Claim the headline number, then bound it, then route to the user's own figure.** "You keep 100% of your earnings" → "a small fee (starting as low as $0.50 USD) per transaction" → "You will see the **exact fee estimate** when you add or edit your payout method." The Wise pattern, executed on a revenue split. Also: **date the change** ("As of November 2025") so readers can reason against their own history.
6. **Name your rules.** `The $25 Rule`, `The "Standard Delay"`, `Split Pay`, `Fan-powered Royalties`. A named rule becomes a referent that users, support agents and the product can all cite, and stops being re-explained from scratch. Cheap, and it compounds.
7. **Explain an adverse term by mechanism, then defend it by norm — in that order.** The two-month royalty delay gets a worked example (January streams → paid end of March) *before* "This is the global industry standard for royalty reporting." Leading with the norm sounds like an excuse; leading with the arithmetic makes the norm a reassurance.
8. **Attach the consequence to the field, at the field.** `Composer (legal name)`. `Record Label: This field is required… Consistency helps fans find your catalog later.` `Make sure your names match exactly—capitalization and spaces matter.` `Release Date: must be in the future. We recommend 30–45 days ahead to allow for review and give you enough time to pitch.` Each is one clause that prevents a rejection.
9. **Name the rejection state before the user submits.** "If your release is marked as **Rejected**, don't sweat it. Usually, it just means we need a quick fix—like a metadata correction or proof of license." A submission flow that pre-explains its own failure mode removes most of the alarm from the notification that follows.
10. **Rank the causes of a failure and say which is most common.** "check these three common blockers… **This is the #1 reason for 'stuck' payments.**" Plus a boundary-case example (`$24.99`) rather than a restatement of the rule. Transferable to any payment, verification or eligibility failure.
11. **Quote the user's complaint as a heading.** `"My balance shows $0, but I haven't been paid."` The purest form of writing in the user's words — not a paraphrased question but the sentence itself, in quotation marks.
12. **Concede the emotion once, at the worst moment, in five words.** "We understand that this can be frustrating" — placed in the takedown article, under a heading phrased as the user's own exasperated question (`So why does SoundCloud remove the content in the first place?`). One acknowledgement, precisely located, beats apology sprinkled throughout.
13. **Mark the legacy in the nav label.** `Premier (Legacy Program)` keeps a superseded programme's documentation reachable for the users still on it, while telling everyone else not to bother. Better than silent deletion and better than leaving it indistinguishable from current content.
14. **Explain the two rights, role first and legal term second.** "The **songwriter** (composition rights)" / "The owner of the **original recording** (master rights)", then the counter-intuitive case: "Even if a melody is old or in the public domain, the specific recording you sampled may still be protected." Any domain with a confusing two-party structure (issuer/acquirer, merchant-of-record/seller, principal/agent) can use this shape.
15. **Name the AI agent as a router, not a resolver.** "talk to our **AI Agent** to escalate a specific payment discrepancy to a support specialist." Honest about what the agent will do, and it sets the expectation that a human is at the end of the path.

## Caveats & gaps

- **The marketing site did not serve content.** `soundcloud.com/pro` returned an empty body; `soundcloud.com` and `soundcloud.com/artists` are client-rendered single-page applications. **T2 (value proposition), T3 (marketing CTAs) and all pricing *figures* are therefore reconstructed from help-article standfirsts and comparison tables rather than from the pricing page itself** — which is why the `2 hours` / `3 hours` and `Artist` / `Artist Pro` distribution contradictions could be observed but not adjudicated against a canonical source. A browser-rendered pass on `/pro`, `/artists` and `checkout.soundcloud.com` is the highest-value follow-up.
- **No price figures at all were captured.** Unlike Audible (157), SoundCloud's help articles link to checkout rather than quoting prices, so `Go`, `Go+`, `DJ`, `Artist` and `Artist Pro` monthly costs are unknown from this harvest. Only relative facts (50% off Go+ for Artist Pro; quota differences) are recorded.
- **All in-product UI is `[documented]`.** The SC4A dashboard, the waveform `Distribute` control, the Monetization tab, Split Pay, Insights, the player, the Feed, the Library, every notification and every empty state are described by help prose, never observed.
- **Search behaviour not exercised**, so the no-results string is unknown; only the pre-query stray `0` was observed.
- **Categories not opened (5 of 9):** `My Account`, `Subscriptions & Billing`, `Vinyl Distribution`, `Share & Embed`, `Legal, Safety & Reporting`, `External Rightsholders & Distribution via Supply Chain`. The last two are the most significant omissions — `Legal, Safety & Reporting` would carry the community-guidelines, harassment and moderation vocabulary (only `Reporting on SoundCloud`, `Reporting a spam account` and `Reporting abuse or harassment` were seen as titles), and the rightsholder category is a whole trade-facing register unexamined. `Vinyl Distribution` is a physical-product content domain entirely unharvested.
- **High-value articles identified but not opened:** `What are valid and invalid reasons for filing a dispute?` (the single best remaining lead), `Why was my account terminated?`, `What happens when I upload my content?`, `Full Fees Outline` (article 42552179413787 — the authoritative fee schedule), `Rejected` (article 48881707977627 — the distribution-failure state), `Distribution Best Practices`, `Artist & Artist Pro Subscriptions`, `Benefits for Artists Subscribers`, `Insights on SoundCloud`, `Top & First Fans`, `What type of royalties does SoundCloud for Artists collect?`, `Audio Streaming Formats`, `Ads on SoundCloud`, `Your Feed and how it works`.
- **Terms of Use and the Distribution Terms of Service not fetched** (`soundcloud.com/terms-of-use`, `soundcloud.com/pages/artist/distribution-terms`), so the contractual framing behind `repeated_infringement`, the distribution agreement and the monetization terms is known only through help-article paraphrase.
- **No privacy notice harvested** — there is no privacy link in the help footer and `soundcloud.com/pages/privacy` was not attempted. T10 covers commercial, rights and tax disclosure only, not data disclosure.
- **Per-article view counts and dates are not exposed** by this Zendesk configuration, so the demand-signal analysis available for Audible (157) is not possible here. Featured-article ordering is the only popularity signal.
- **No published content style guide or design system** found for SoundCloud. T14's voice analysis is inferred entirely from shipped copy.
- **No accessibility statement, category or conformance report found.** Recorded as a substantive gap rather than a harvest failure — the absence was searched for across the help footer, all nine category listings and fourteen pages.
- **en-US only.** The help centre is localised into eight languages with per-article URL mapping; none of the localised registers were examined, and the FPR term itself is left untranslated in two of them (Polski, Nederlands keeps `Fan-powered Royalty's`).
- **Per the brief, no individual artist, track or user page was opened.** All creator-side findings come from the platform's own help, policy and marketing content.
- **The status page's incident log carries no year**, so the freshness assessment ("at best 18 days stale") is inferred from the harvest date and could understate the staleness by a year or more.

## Sources

1. https://help.soundcloud.com/hc/en-us
2. https://help.soundcloud.com/hc/en-us/categories/31283161425563-Creators-on-SoundCloud
3. https://help.soundcloud.com/hc/en-us/categories/115000678928-SoundCloud-Fans-Listeners
4. https://help.soundcloud.com/hc/en-us/categories/46352081847323-Copyright-for-SoundCloud-Creators
5. https://help.soundcloud.com/hc/en-us/articles/1260801306810-Fan-powered-Royalties
6. https://help.soundcloud.com/hc/en-us/articles/360051802713-Getting-Paid-by-SoundCloud-for-Artists
7. https://help.soundcloud.com/hc/en-us/articles/24320060389275-How-to-Distribute-with-SoundCloud
8. https://help.soundcloud.com/hc/en-us/articles/39687296360091-Verify-your-Rights-for-Monetization-Distribution
9. https://help.soundcloud.com/hc/en-us/articles/4402637287835-Why-was-my-track-taken-down-from-SoundCloud
10. https://help.soundcloud.com/hc/en-us/articles/4402644695451-How-do-copyright-strikes-work
11. https://help.soundcloud.com/hc/en-us/articles/360051072534-Choosing-the-Right-Subscription
12. https://help.soundcloud.com/hc/en-us/articles/360051638314-What-happens-when-I-cancel-my-Go-subscription
13. https://help.soundcloud.com/hc/en-us/articles/4413524848667-SoundCloud-Status
14. https://soundcloud.com/pro — **blocked (empty body, client-rendered)**
