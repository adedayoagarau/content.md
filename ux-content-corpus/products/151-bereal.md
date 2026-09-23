# 151. BeReal

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Daily-prompt social app / friends-only photo sharing |
| Primary URL | https://bereal.com/ |
| Corpus rank | 151 |
| Benchmark strength (source list) | Concise behavioral prompts |
| Locale / market observed | en-US (help centre offers de, es, fr, it, ja, ko, nl, pt-br, sv) |
| Platform observed | Web marketing site (Framer-built), Zendesk help centre. Product itself is mobile-only. |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | EU Digital Services Act (lead regulator **ARCOM**, France; BeReal SAS established in France); UK/AU online-safety regimes not named; COPPA-adjacent 13+ age floor stated on two separate pages |
| Harvest date | 2026-09-21 |
| Pages inspected | 17 |
| Harvest completeness | Partial — marketing site is near-contentless (four sections, one CTA); all product copy is reconstructed from help articles. The `Memories` article returned an aborted fetch. No accessibility statement exists. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing home | https://bereal.com/ | Hero, three value-prop sections, footer. One CTA on the entire page. |
| Community Standards | https://bereal.com/community-standards | 13 numbered categories, five "commitments", DSA remedies chapter |
| Child Safety | https://bereal.com/child-safety | Age floor, enforcement mechanics, a "For parents and carers" list |
| Help centre home | https://help.bereal.com/hc/en-us | Three categories only |
| Category: The Guide | https://help.bereal.com/hc/en-us/categories/7209052114973-The-Guide | Six sections |
| Category: Troubleshooting | https://help.bereal.com/hc/en-us/categories/7242450196253-Troubleshooting | Seven sections, first-person failure titles |
| Category: Safety | https://help.bereal.com/hc/en-us/categories/10449460450589-Safety | One section, three articles |
| Section: BeReal | https://help.bereal.com/hc/en-us/sections/7209075877917-BeReal | 14 articles — the coined-vocabulary index |
| Article: ⚠️Time to BeReal.⚠️ | https://help.bereal.com/hc/en-us/articles/7350386715165--Time-to-BeReal | The core mechanic article |
| Article: ⚠️Time to BeReal.⚠️ Notification | https://help.bereal.com/hc/en-us/articles/15416869159197--Time-to-BeReal-Notification | Notification design explained to the user |
| Article: Behind The Scenes (BTS) | https://help.bereal.com/hc/en-us/articles/15272815079453-Behind-The-Scenes-BTS | Toggle-state labels, irreversibility warning |
| Article: How Streaks Work | https://help.bereal.com/hc/en-us/articles/15951201919517-How-Streaks-Work | Streak state + restore flow |
| Article: Audience | https://help.bereal.com/hc/en-us/articles/10444893090205-Audience | Two audience options, stickiness warning |
| Article: RealMojis | https://help.bereal.com/hc/en-us/articles/7536240858653-RealMojis | Reaction model, one-per-post rule |
| Article: Friends of Friends | https://help.bereal.com/hc/en-us/articles/11773264475933-Friends-of-Friends | Reciprocity gate, Hidden Users |
| Article: Delete a BeReal | https://help.bereal.com/hc/en-us/articles/7539866178333-Delete-a-BeReal | Two-delete limit |
| Article: Captions & Comments | https://help.bereal.com/hc/en-us/articles/7536338534429-Captions-Comments | Caption/comment asymmetry |

---

## T1 Navigation & IA labels

**Global nav — five items, no product tabs at all** `[observed]`

`Ads` (dropdown) · `News` · `Jobs` · `Get Verified` · `Contact us`

Notable for what is missing: there is no `Features`, no `Pricing`, no `How it works`, no `Log in`. The marketing site is not an acquisition funnel with stages — it is a single page with one download link. BeReal ships no web product, so the nav is entirely corporate.

**Footer — three groupings** `[observed]`

| Group | Items |
|---|---|
| `Ads` | `BeReal Ads` · `Audience` · `Solutions` · `Ad Guidelines` |
| `Resources` | `Jobs` · `Help` · `News` · `Get Verified` · `Child Safety` |
| `Legal` | `Privacy Policy` · `Terms` · `Community Standards` · `Cookie Policy` · `Cookie Settings` · `DSA` |

`Child Safety` sits in `Resources` rather than `Legal` — a deliberate framing of child protection as a product fact rather than a compliance artefact. `DSA` is exposed as a bare acronym link, unexplained anywhere in the footer.

**Help centre top level — only three categories** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Troubleshooting` | "Have a problem?" |
| `The Guide` | "Learn all about BeReal." |
| `Safety` | *(no scope line — the only one of the three without one)* |

This is the most compressed help IA in the corpus so far: a **problem / learn / safety** triad. Compare Wise's six activity-named topics. BeReal's split is by *user intent state* (broken vs curious vs endangered) rather than by feature area, which works because the product has essentially one feature.

The missing scope line on `Safety` is a real defect — the parallel construction breaks at exactly the category where reassurance would matter most.

**Section names inside `The Guide`** `[observed]`

`RealPeople & RealBrands` · `BeReal` · `Friends` · `Profile` · `Settings` · `Everything else`

`Everything else` as a named section (holding `How Streaks Work`, `Minimum device requirements`, `Contact us`, and `Don't believe everything you hear…`) is an honest catch-all rather than a forced taxonomy. `BeReal` as a section *inside* the product called BeReal is the noun doing triple duty — company, app, and post — flagged again in T13.

**Section names inside `Troubleshooting`** `[observed]`

`Login / Signup` · `BeReal` · `Memories` · `Streak` · `Friends` · `Profile` · `Other`

The `Streak` troubleshooting section contains exactly one article, `Help! I lost my Streak because of a bug`. A whole IA node for one bug class — a content-ops signal that streak loss is a high-volume complaint.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Your daily dose  of real life.`
> CTA: `Get the app`

The headline is also the meta description, the og:description, and the footer tagline — one string doing five jobs across the site. Note the **double space** between "dose" and "of" in the rendered markup, a real typographic defect in the single most prominent string on the property.

**Three sections, each a noun phrase naming a mechanic, not a benefit** `[observed]`

1. `It's Time to BeReal` — the ritual
2. `The Front-Back phenomenon` — the format
3. `Meaningful Connections` — the outcome

Only the third is benefit-shaped. The first two name the *constraint* and sell it as the product, which is the whole BeReal positioning move.

**The constraint is described in units of time, not features** `[observed]`

> "Every day, the world gets to be themselves for a random two-minute window. It's more than a notification. It's a global ritual…"

`random two-minute window` · `global ritual` · `spontaneous and unfiltered slice of daily life` — the copy repeatedly refuses to call the notification a notification ("It's more than a notification"), which is a curious defensive move given the notification *is* the product.

**Differentiation by negation** `[observed]`

> "We reject filters, staging, and uploads"

A three-item list of *removed* capabilities as the feature claim. The verb is `reject`, first-person plural, present tense — a stated editorial position rather than a limitation.

**Competitor contrast without naming a competitor** `[observed]`

> "see what your friends are actually doing, not what they're pretending to do"
> "the only platform where real people post every day"

**Parenthetical aside as a positioning statement** `[observed]`

> `(P.S. no AIs allowed)`

A policy commitment delivered in the register of a note passed in class. It is load-bearing — the Terms of Service genuinely prohibit bot/AI use, and the Community Standards cross-reference it ("Section 1 of our Terms of Service also prohibits the use of our Services by AIs or bots"). Marketing copy and legal copy agree, which is rarer than it should be.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get the app` | Hero, only CTA on marketing site | Links to a deep-link redirector, not a store |
| `Get Verified` | Nav + footer | Appears **three times in the nav region** per render |
| `Contact us` | Nav, footer, and bottom of every help page | Three surfaces, one label — consistent |
| `Cookie Settings` | Footer, Legal group | Rendered as plain text, not a link, in the fetched markup |
| `Skip to main content` | First in help-centre DOM | Accessibility affordance present on help, **absent on marketing site** |
| `Search` | Help centre home, as an `h2` | A heading, not a placeholder |
| `See all articles` | Each help section preview | |
| `Refresh` | Goodreads-style error shim — n/a here | — |
| `Yes` / `No` | "Was this article helpful?" on every article | Bare two-button feedback, no free text |
| `Select Language` | Footer | Label above a single-item list (`English`) on the marketing site — **the selector offers nothing to select** |

**In-product CTAs, documented only** `[documented]`

| String | Source article | Notes |
|---|---|---|
| `SEND` | BTS article, step 6 | **All caps** |
| `Send` | Audience article step 4, Comments section | **Sentence case** for the same button |
| `Delete my BeReal` | Delete a BeReal | Possessive — "my", not "this" |
| `Yes, I'm sure` | Delete confirmation | First-person confirmation, not "Delete" |
| `Remove BTS` | Three-dot menu | |
| `Continue` | RealMoji capture, step 4 | |
| `Add a caption` | Under most recent BeReal | |
| `BTS On` / `BTS Off` | Camera screen, top right | State-as-label toggle |
| `My friends only` | Audience picker option 1 | |
| `My friends + their friends` | Audience picker option 2 | Uses `+`, not "and" |
| `Privacy` → `Hidden Users` | Profile three-dot menu path | |
| `Add to Goodreads` | — | n/a |

**The `SEND` / `Send` inconsistency is a real defect** — the same primary action is documented in two casings in two articles published by the same team about the same screen. `SEND` (BTS, step 6) versus `Tap 'Send' to post your BeReal` (Audience, step 4).

**Observation:** BeReal never uses `Post` as a verb in a CTA. It uses `Send`. The noun is "a BeReal"; the verb is "take" (take your BeReal) and then "send". "Post" appears only in prose ("you can post a BeReal anytime") and in the streak definition ("days in a row you've posted"). Three verbs — *take*, *send*, *post* — for one action chain, deliberately or not.

## T4 Onboarding & getting-started

No signup flow is publicly reachable (mobile-only). `[absent]` for observed onboarding.

**The "how it works" sequence is the help article `⚠️Time to BeReal.⚠️`, not a marketing page** `[observed]`

The article does the onboarding job in five moves, in this order:

1. **Urgency** — `Go, go, go! It's time to BeReal.`
2. **Mechanic** — everyone in your time zone gets it simultaneously; you have 2 minutes
3. **Format** — "A BeReal isn't just a photo. It uses front and back cameras…"
4. **Permission to fail** — "Missed the two-minute window? It happens!"
5. **Safety caveat** — "we **don't want you taking any risks**"

The ordering is the notable part: the failure case arrives fourth, *before* the reciprocity rule and before the safety warning, and it arrives as reassurance rather than as an error. Most products put the unhappy path last or hide it in a FAQ.

**Procedural articles use numbered imperative steps with the UI label in single quotes** `[observed]`

> 1. Open the camera to take your BeReal.
> 2. Verify the BTS option in the top right is enabled ('BTS On'). If it's off, tap 'BTS Off' once to enable it.
> 3. Take your BeReal when ready 📸.

Emoji inside a numbered procedural step (`📸`) is unusual and consistent with the register elsewhere (`⚠️`, `🔥`, `📌`, `⚡`).

## T5 Form & field labels

No public forms. `[absent]` for observed.

`[documented]` field-adjacent strings, all from help articles:

- `Verification Code` — capitalised as a proper noun, named in two troubleshooting titles
- `Username` — "I can't update my Username"
- `Date of Birth` — "I want to change my Date of Birth"
- `Time Zone` — "I can't change my Time Zone" (and the whole product is keyed to it)
- `@` + "their BeReal full name or username" — the mention syntax, with **two** identifier types accepted
- "Choose a reason for deleting your BeReal" — a *reason-capture* step inside a destructive flow, the closest thing to a form field documented anywhere

That deletion reason picker is worth flagging: BeReal instruments its own delete funnel with a mandatory reason before the confirm, which is both a data-collection decision and a friction decision.

## T6 Status & state language

This is the richest category for BeReal, and almost all of it is **time state** rather than object state.

**The post's own states** `[documented]`

| State | How it is worded | Where |
|---|---|---|
| On time | *unnamed* — the default, never labelled | — |
| Late | "your friends will know you posted late" | Time to BeReal |
| Retaken | "You can retake your BeReal as many times as you want before posting" | Time to BeReal |
| Deleted (once) | recoverable — you may post again | Delete a BeReal |
| Deleted (twice) | "you won't be able to take a new one until the next BeReal Notification" | Delete a BeReal |

**The late-post disclosure is the single most quotable pattern in this file.** BeReal does not hide, soften, or gate the lateness signal — it states plainly, in the onboarding article, that the social cost of lateness will be paid and visible: *"Missed the two-minute window? It happens! After receiving the notification, you can post a BeReal anytime, but your friends will know you posted late."*

The construction is: **normalise the failure, then disclose the consequence, in one sentence, with no apology and no mitigation offered.** The exclamation mark is on the forgiveness clause, not the consequence clause.

Note a gap though: the public help copy documents the *existence* of the late signal but **never quotes the label the app actually shows**. Whatever string renders on a late post (a delay counter, a "late" badge) is not in any public page. Marked `[absent]` for the label itself.

**Retake disclosure is weaker than late disclosure.** The help centre says you may retake freely "before posting" and mentions the timer, but — unlike lateness — it does not say that retake count is shown to friends. If the product does disclose retakes, BeReal does not document it publicly. Recorded as a **negative finding**: the two honesty mechanics are not documented symmetrically.

**Streak state** `[documented]`

- `A Streak is the number of days in a row you've posted a BeReal.`
- Growth is stated as a rule, not a reward: "Each day you post, your Streak grows by one."
- The indicator is named by its glyph: "you'll see a flame 🔥 icon on your profile"
- Visibility is disclosed: "Your active Streak is also visible to your BeReal friends"
- History is a location: `Memories Calendar`
- Loss has a named recovery state — "If you're eligible to get your Streak back, you'll see an option to restore it when the app opens."
- And a named terminal state — "your Streak can't be restored. This is usually because too much time has passed since it ended."
- Closing line: `Ready to start again? Your next Streak is just one BeReal away.`

That last string is the best piece of writing on the BeReal properties. It converts a loss state into a one-step re-entry, quantified (`one BeReal`), with no guilt and no re-engagement plea. Compare the standard streak-loss pattern (freeze offers, paid restores, "don't lose your progress!"). BeReal has no purchasable restore — the Child Safety page states there are "no in-app purchases, no virtual currency, no loot boxes and no premium tiers" — so it cannot monetise the loss and the copy reflects that.

**Audience / visibility state** `[documented]`

Two values, both first-person-possessive: `My friends only` · `My friends + their friends`. Both carry the same stickiness warning, repeated verbatim across two articles in bold: **"Your chosen audience is saved for future posts unless you modify it at a later time."**

Repeating a persistence warning verbatim in two places is deliberate. The state is sticky, the consequence is a privacy exposure, so the warning is duplicated rather than cross-linked.

**BTS (Behind The Scenes) state** `[documented]`

`BTS On` / `BTS Off` as a toggle whose label *is* its state. Two irreversibility disclosures, adjacent:

- "If you turn off BTS for a BeReal, you won't be able to turn it back on for this BeReal."
- "If you turn off BTS, it will remain off for future posts unless you modify it at a later time."

Per-post irreversible, plus account-level sticky. Both stated. The article also names the default explicitly: "BTS is enabled by default."

**Reaction state** `[documented]`

- "The rule is one RealMoji per BeReal."
- `Instant RealMoji` — "a one-time live reaction to a BeReal"
- "You cannot recover a RealMoji once deleted."
- "You cannot react to your own BeReal."

**Reciprocity gate — the state that governs all others** `[documented]`

> "You can't view your friends' BeReal or the Friends of Friends feed until you've posted yours. Fair's fair!"

and, on the Friends of Friends article:

> "To keep things fair and consistent with BeReal's values, you need to post to the Friends of Friends feed to view the feed."

`Fair's fair!` is a two-word justification for the product's central gate. The second phrasing ("consistent with BeReal's values") is the same rule argued from principle rather than from idiom — two registers for one rule, on two pages.

## T7 Error, failure & recovery

**Troubleshooting titles use three shapes, and two of them are first-person** `[observed]`

| Shape | Examples |
|---|---|
| `I <experienced failure>` | `I haven't received the Verification Code` · `I didn't receive the BeReal Notification` · `I can't see all my Memories` · `I can't update my Username` · `I can't change my Time Zone` · `I sent a Friend Request by mistake` |
| `My <object> <misbehaves>` | `My Memory doesn't show the correct date` · `Some of my Memories are missing` |
| `Why <can't I / am I> …?` | `Why can't I delete my BeReal?` · `Why am I receiving the Verification Code when I didn't request it?` |
| `I want to <change something blocked>` | `I want to change my Date of Birth` |

`I sent a Friend Request by mistake` is the Wise-style confession title. `I want to change my Date of Birth` is the more interesting one — it is a *request* title for a capability the product withholds, written from the user's wish rather than the system's restriction.

**One title carries an interjection** `[observed]`

> `Help! I lost my Streak because of a bug`

This is the only `Help!` in the help centre, and it is attached to the only article that attributes the failure to BeReal rather than the user. The exclamation is doing emotional mirroring on exactly the article where the user is most likely to be angry — and the title concedes the cause ("because of a bug") in the title itself, before the body. Most products would title this "Troubleshooting streaks".

**Recovery is offered conditionally and the failure branch is named** `[documented]`

Streak restore: "If you're eligible… you'll see an option to restore it… If you don't see this option, your Streak can't be restored." Then an escalation path with a cause qualifier: "Think a problem with BeReal prevented you from posting? Contact us here and we'll take a look."

Note `we'll take a look` — non-committal, no SLA, no promise of restoration. Honest, if thin.

**Destructive-action friction, documented** `[documented]`

Delete a BeReal is gated by: a three-dot menu → `Delete my BeReal` → a reason picker → `Yes, I'm sure` → "Confirm your choice." That is **two confirmations plus a reason capture** for one deletion. And the article opens, in bold, *before* the steps, with the consequence: **"Careful, if you delete your BeReal two times, you won't be able to take a new one until the next BeReal Notification."**

Leading a procedure with `Careful,` and the rate limit, before step 1, is good practice: the user learns the cost before they learn the mechanism.

**The RealMoji delete flow has no recovery and says so** `[documented]`: "You cannot recover a RealMoji once deleted." And the replace flow is honestly framed as a non-feature: "You cannot directly replace a RealMoji. You'll need to delete it by following the steps below and creating a new one."

**One article title suggests a rumour-control function** `[observed]`: `Don't believe everything you hear…` — sitting in `Everything else`. An ellipsis-titled article in a help centre is a content-strategy oddity worth recording; the title communicates tone but nothing about the topic, so it is unfindable by search intent.

## T8 Empty states

`[absent]` — no empty states are observable (mobile-only product) and none are quoted in any help article. No "no friends yet", no "no Memories", no first-run copy is documented publicly.

The nearest adjacent string is the help-centre routing line: `Can't find your answer?` followed by `Contact us`, which appears at the foot of **every** help page. It is a no-results affordance placed pre-emptively rather than conditionally.

## T9 Notifications & system messages

BeReal is the only product in this cohort whose **notification is the product**, and it documents the notification as a first-class topic with two dedicated articles.

**The notification string itself** `[observed]`

> `⚠️Time to BeReal.⚠️`

Rendered with warning emoji as bracketing delimiters, and with a **full stop inside the delimiters**. Variants observed across pages:

| Variant | Where |
|---|---|
| `⚠️Time to BeReal.⚠️` | Help article title, section listing |
| `⚠️Time to BeReal⚠️` (no full stop) | Body of the Notification article |
| `⚠️Time To BeReal⚠️` (capital T on "To") | "There's Only One ⚠️Time To BeReal⚠️ Notification" heading |
| `It's Time to BeReal` | Marketing site section header |
| `RealGroup ⚠️It's Time to BeReal.⚠️ notification` | Related-article title |

**Five renderings of the single most important string in the product.** Full stop present/absent, "To" capitalised/not, contraction present/absent. This is the sharpest defect in the file: the string is the brand, and it is not locked.

**The notification is explained to the user, including its unknowability** `[observed]`

> `ONE Notification. TWO Minutes to Post.`

Numerals spelled out and capitalised for rhythm. Then:

> "Everyone in your time zone (don't worry, we won't crash your beauty sleep in the middle of the night) receives the notification at the same time. We're clueless about the timing, so don't even bother asking."

Two parentheticals doing anxiety work: a reassurance about night-time delivery, and a **disclosure of the company's own ignorance** of the schedule. The same disclaimer appears in the other article in a different register: "(before you ask, we truly do not know when it's sent)". So BeReal pre-empts the same FAQ twice, in two voices — one flippant (`don't even bother asking`), one plain (`we truly do not know`).

**Scarcity asserted as a design rule** `[observed]`

> `There's Only One ⚠️Time To BeReal⚠️ Notification`
> "There will ever only be one ⚠️Time To BeReal⚠️ notification. Don't confuse it with Group BeReal notifications (although those are pretty cool too)."

Note the garbled word order in "There will ever only be one" — an error in the sentence asserting notification discipline. And the parenthetical self-promotion ("those are pretty cool too") immediately undercuts the scarcity claim being made.

**Closing cadence** `[observed]`: `Be Authentic. Be You. Be Real.` — three two-word imperatives, each a full sentence, resolving into the product name. Also `Why the name?` as an H4 inside the notification article — BeReal explains its own naming to the user.

**Notification suppression is documented as a feature of restraint** `[observed]`: "Forget planning your day around the notification. And don't even think about staging that perfect moment."

**Other system-message strings** `[documented]`: `Real tip!` is used as a recurring inline callout prefix (`Real tip! You cannot react to your own BeReal.` · `Real tip! Captions and comments are now saved to Memories.`) — a branded tip label, consistent across at least two articles. Also: "Your friend is not notified when you delete a comment." — an explicit *non*-notification disclosure, which is a good and rare thing to document.

## T10 Disclosures, legal & compliance

**The Community Standards are structured as five named commitments, then thirteen numbered prohibitions, then enforcement, then remedies** `[observed]`

Commitments: `Authenticity` · `Safety` · `Privacy` · `Dignity` · `Accountability` — each a single noun followed by a colon and a one-sentence promise in first-person plural.

Prohibition categories, in order: `Child Sexual Abuse Material (CSAM)` · `Harassment or Bullying` · `Incitement to Suicide or Self-Harm` · `Terrorism or Violent Extremism` · `Violence or Threats` · `Illegal Drugs or Regulated Goods` · `Hate Speech` · `Nudity or Sexual Content` · `Inappropriate Content` · `Scam or Fraud` · `Spam or Inauthentic Behaviour` · `Intellectual Property Infringement` · `Other`

**Every category uses the same three-part template** `[observed]`

1. A one-to-two-sentence rationale tying the rule back to the product's premise
2. `**What is prohibited.**` — the rule
3. `**Examples.** Do not post or do the following:` — a bulleted list of concrete acts

The rationale-first ordering is the transferable bit. Rule 2 (Harassment) opens "We want people to feel safe posting their real, unfiltered moments. Harassment and bullying directly undermine that sense of safety." Rule 7 (Hate Speech) opens "BeReal is meant to be a place where people show up as themselves, for their real friends. Hateful Content undermines the trust and authenticity our community depends on." **The policy is argued from the product thesis rather than from law**, in the user's language, before the legal formulation arrives.

Category 13, `Other`, is the notable structural choice — an explicit residual category, with its own named safeguard: "**Safeguard.** Where we act under this category, the statement of reasons provided under the Remedies section below identifies the specific conduct relied upon and the applicable legal ground." A catch-all rule that ships with its own due-process promise.

**Enforcement ladder, named and ordered** `[observed]`

`Content removal` · `Permanent suspension of the account` · `Deletion of the account` · `Preservation of evidence and referral to authorities`

With a stated proportionality principle ("in a diligent, objective, and proportionate manner, with due regard to your rights and legitimate interests, including your freedom of expression"), a recidivism rule ("Repeated violations result in increasingly serious measures"), and a first-offence exception ("Severe violations… result in immediate and permanent termination… even on a first occurrence").

**DSA remedies chapter, with jurisdiction-scoped copy** `[observed]`

Headings: `Report` · `Statement of reasons` · `Appeal` · `Out-of-Court Dispute Settlement and Judicial Redress`

The `Statement of reasons` section enumerates five things an EU user will be told, including — unusually — **whether a machine decided**: "whether the decision was made by our human moderators, with the assistance of automated tools, or by automated means alone". Disclosing the automation level of an individual moderation decision, as a numbered entitlement, is a genuinely reusable disclosure pattern.

Also disclosed: appeal is free (`free of charge`), time-boxed (`within six (6) months`), routed to a named address (`appeal@bereal.com`), reviewed by a different human ("qualified staff who were not involved in the initial decision, including where the initial decision was taken by automated means"), and **does not require exhausting internal process** before external escalation ("You do not need to complete BeReal's internal complaint process before doing so").

**Non-EU users get a lesser, honestly-labelled path** `[observed]`: "If you are located outside the European Union, you may request a review of a moderation decision through the support channels available in your jurisdiction." The two-tier reality is stated rather than obscured.

**Reporting does not require an account** `[observed]` — stated twice, on two pages: "You do not need a BeReal account to submit a report through the web form" (Community Standards) and "You do not need a BeReal account to raise a child safety concern with us" (Child Safety).

**Age floor stated as a bare sentence at the very top, before any framing** `[observed]`

> `No person under the age of 13 may access or use BeReal.`

Followed immediately by the most unusual line in the document:

> "If you are under 18 and do not understand any of these rules, please speak to a trusted adult before using BeReal. You may also contact us at contact@bere.al."

A policy document that instructs a minor to get help reading it, and gives them an email address. This belongs in the transferable-patterns list.

**Child Safety page — enforcement described mechanically, in bolded lead-ins** `[observed]`

`Every image is checked while it is published.` · `People review the decisions.` · `Reporting is built into the app.` · `Action is permanent.`

Four claims, each a complete sentence in bold, each followed by one or two sentences of mechanism. And each is falsifiable — "Automated classifiers scan all content at upload", "Reports involving young users are especially prioritised in a separate queue", "Reports are anonymous to the person being reported", "When we ban an account, the ban is permanent."

**The age-declaration limitation is conceded** `[observed]`: "We know a declared birthday is a filter rather than proof, so we keep looking after signup." A product admitting its own age gate is weak, and describing the compensating control, in the same sentence.

**Monetisation absence disclosed as a child-safety fact** `[observed]`: "BeReal has no in-app purchases, no virtual currency, no loot boxes and no premium tiers. There is nothing inside the app for a child to spend money on, and no mechanic designed to encourage them to try."

**"For parents and carers" — the whole product re-stated as seven privacy facts** `[observed]`

Second-person-plural-about-a-third-party ("this is what applies to their account"), each bullet a flat declarative:

- "They must be at least 13. If they are younger, tell us and we will suspend the account."
- "Their account is private, and they have no public profile that a stranger can find."
- "Nobody can find their account without already knowing their phone number or username, and your child has to accept."
- "They can block anyone instantly, and that person is never told."
- "No advertising is targeted at them, and there is nothing in the app to buy."
- "The app is one moment a day. There is no endless feed to get lost in."

That last bullet reframes the product's core constraint as a child-safety feature. It is the same fact as the marketing hero, addressed to a different reader, and it is more persuasive here.

**Regulator named and located** `[observed]`: "BeReal SAS is established in France, so our lead regulator under the EU Digital Services Act is ARCOM, the French audiovisual and digital regulator." Then a scope statement: "Our obligations under the Digital Services Act cover users across the European Union, but we apply similar protections globally." Note `similar`, not `identical` — a deliberately hedged word.

**Spelling register note**: Community Standards uses British spellings (`behaviour`, `prioritise`, `organise`, `apologise`-family, `minimise`) while the help centre is `en-US` and uses US spellings. The legal surface and the support surface are written in different Englishes.

## T11 Help-centre architecture

Three levels: **category → section → article**. Three categories, sixteen sections, and a visible article count in the low dozens — one of the smallest help centres in the corpus, matching one of the smallest products.

**Article-title grammar — five shapes** `[observed]`

| Shape | Example |
|---|---|
| Bare coined noun | `Memories` · `RealMojis` · `Resharing` · `Tagging` · `Audience` · `Pins 📌` |
| Verb phrase (task) | `Delete a BeReal` · `Block a user` · `Report inappropriate content or behavior` · `Share your Location` |
| `How <thing> Work(s)` | `How Streaks Work` · `How to Request a RealPeople or RealBrand Account` |
| `I <failed>` / `My <object> failed` | `I didn't receive the BeReal Notification` · `My Memory doesn't show the correct date` |
| `Who/Why/Can I …?` | `Who can view my Memories?` · `Why can't I delete my BeReal?` · `Can I delete Reactions left on my BeReal?` |

**Emoji inside article titles** `[observed]`: `⚠️Time to BeReal.⚠️` · `Pins 📌` · `RealGroup ⚠️It's Time to BeReal.⚠️ notification`. Emoji in a *title* (not body) affects search, URL slugs (`/articles/7350386715165--Time-to-BeReal` — note the **double hyphen** where the emoji was stripped), and screen-reader announcement. The double-hyphen slug is a visible artefact of emoji-in-title.

**Article-level social proof is published** `[observed]`: every article shows a raw helpfulness ratio, e.g. `32556 out of 45570 found this helpful` (Time to BeReal, ~71%), `13021 out of 27432 found this helpful` (Delete a BeReal, ~47%), `1293 out of 4946 found this helpful` (Friends of Friends, ~26%), `880 out of 2152` (Captions & Comments, ~41%).

Publishing unrounded, unflattering ratios is a transparency choice — and it makes the help centre self-diagnosing. Friends of Friends at 26% helpful over ~5,000 votes is a public signal that the article is failing. Recorded as a **negative finding** the platform is itself broadcasting.

**Routing furniture** `[observed]`: `Can't find your answer?` → `Contact us` at the foot of every page; `More articles` list of up to nine siblings on every article; `Skip to main content` first in DOM; a nine-language switcher in the footer.

**Cross-link defect** `[observed]`: internal links are inconsistently localised. Some use `/hc/en-us/articles/...`, others drop the locale (`https://help.bereal.com/hc/articles/7531349180829`). Both appear inside a single article (Behind The Scenes links `/hc/articles/...`; Captions & Comments links `/hc/en-us/articles/...`). A locale-stripped link will lose a non-English reader's language.

**Domain leak** `[observed]`: the `Contact us` link at the foot of every help page points at `https://berealapp.zendesk.com/hc/en-us/articles/7285146266269` — the raw vendor domain — while the identical article is also linked as `help.bereal.com/hc/en-us/articles/7285146266269-Contact-us` from inside the Streaks article. The branded domain and the vendor domain both ship, on the same page set.

**Content freshness defect** `[observed]`: the Captions & Comments article contains a stray heading `### Mentions 1.png` — an image filename rendered as an H3. A broken image reference promoted to a document heading.

## T12 FAQs

`[absent]` — there is **no FAQ page, no FAQ block, and no accordion** anywhere on the BeReal marketing site. The marketing site has four content sections and zero questions.

The FAQ function is entirely discharged by the help centre, where question-shaped article titles serve the purpose:

| Question-shaped titles (verbatim) |
|---|
| Who can view my Memories? |
| Why can't I delete my BeReal? |
| Can I delete Reactions left on my BeReal? |
| Why am I receiving the Verification Code when I didn't request it? |
| How do I change the Language in BeReal? |

Five question-titled articles across the whole help centre. Compared to the corpus norm this is very few — BeReal's help is overwhelmingly noun- and task-titled, with questions reserved for *permissions* (`Who can view…`, `Can I delete…`) and *anomalies* (`Why am I receiving…`).

The one embedded FAQ-like move is inside the Notification article, where `Why the name?` appears as a heading with a two-paragraph answer — a self-explanation of the brand, placed inside a functional article.

## T13 Terminology & glossary

BeReal has the densest coined-vocabulary set in this cohort, built almost entirely on one morpheme.

| Term | BeReal's usage | The alternative it rejected |
|---|---|---|
| `a BeReal` | The post. A countable noun: "take your BeReal", "delete my BeReal", "one RealMoji per BeReal" | "post", "photo", "snap" |
| `BeReal` | Also the company, the app, and a help-centre section name | — |
| `⚠️Time to BeReal.⚠️` | The notification, always with delimiters | "daily reminder" |
| `to BeReal` | The product name used as a **verb** ("It's time to BeReal") | "post" |
| `RealMoji` | A reaction — "personalized emojis created by you" | "reaction", "emoji" |
| `Instant RealMoji` | "a one-time live reaction" | "live reaction" |
| `BTS` / `Behind The Scenes` | The few seconds of video before the shot | "boomerang", "preroll" |
| `Memories` | The archive of all your posts | "archive", "history", "camera roll" |
| `Memories Calendar` | The dated view of Memories | "calendar view" |
| `Streak` | Consecutive posting days | "consistency", "chain" |
| `Friends of Friends` | Second-degree feed | "Discover", "Explore" |
| `RealGroup` | Group posting with its own notification | "group", "circle" |
| `RealPeople` / `RealBrands` | Verified public accounts (people / brands) | "verified", "creator", "business account" |
| `RealFans` | Followers of a RealPerson/RealBrand | "followers", "subscribers" |
| `Audience` | The visibility setting | "privacy", "who can see this" |
| `Hidden Users` | The unhide list under `Privacy` | "blocked", "muted" |
| `Pins 📌` | Pinned profile content | "highlights", "featured" |
| `Resharing` | A documented action with its own article | "repost", "share" |
| `Front-Back` | The dual-camera format ("The Front-Back phenomenon") | "dual camera" |
| `Real tip!` | Inline tip callout label | "Tip", "Note" |
| `Friend Request` / `friend invitation` | **Two labels for one thing** — "I sent a Friend Request by mistake" vs "you can send a friend invitation with just a tap" | pick one |

**The `Real-` prefix is the whole system.** `RealMoji`, `RealGroup`, `RealPeople`, `RealBrands`, `RealFans`, `Real tip!` — six coinages from one morpheme, plus `BeReal` itself, plus `real life` in the tagline, plus `be real` as the closing imperative. It is unusually disciplined branding of the object model.

But it carries two real costs, both observable:

1. **`BeReal` is overloaded four ways** — company, app, post, and help-section name — so "Delete a BeReal" and "BeReal Help Center" and "everywhere BeReal operates" all use one token for different referents. The help centre has to write `the BeReal Notification` and `your BeReal` and `BeReal friends` to disambiguate, adding words back.
2. **`Real-` coinages are opaque on first encounter and unsearchable in natural language.** A user who wants to react to a friend's photo will not search "RealMoji". The help centre mitigates this nowhere — there is no glossary article, unlike Medium's. Marked as a gap.

**Register split:** marketing says `Front-Back format`, `global ritual`, `spontaneous and unfiltered slice of daily life`. Help says `take your BeReal`, `tap the three-dot menu`, `long-press`. Legal says `Content`, `the Application`, `the Services`. Three distinct vocabularies, cleanly separated by surface.

**Third-party nouns retained**: `three-dot menu` (not "kebab", not "more options") consistently across five articles — a rare case of BeReal choosing the plain description over a coinage, and it is the right call.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout; first-person plural for the company, and the company is a **visible, opinionated actor**: "We reject filters", "we truly do not know", "We're clueless about the timing", "we will act on it", "we keep looking after signup". BeReal's "we" has attitude in a way Wise's does not.

**Register.** Short, imperative, clipped. Sentence fragments used as complete units (`ONE Notification. TWO Minutes to Post.` · `Be Authentic. Be You. Be Real.` · `Fair's fair!`). Contractions everywhere. Exclamation marks used freely — `Go, go, go!`, `It happens!`, `Fair's fair!`, `Real tip!`, `Help!`, `📸` — and this is the opposite of Wise's discipline. BeReal's tone does **not** flatten as stakes rise in help copy; it flattens only when it crosses into the legal surface, where it becomes formal to the point of a different authorship.

**The tone gradient is a cliff, not a slope.** Help: "don't even bother asking". Community Standards: "BeReal acts in a diligent, objective, and proportionate manner, with due regard to your rights and legitimate interests." Nothing bridges the two. The Child Safety page is the one page that does bridge them — plain declaratives on a grave topic, no jokes, no jargon — and it is the best-written page on the property.

**Anxiety management is the recurring tonal job.** Three distinct reassurance moves, all in parentheses or asides:

- Sleep: "(don't worry, we won't crash your beauty sleep in the middle of the night)"
- Competence: "Missed the two-minute window? It happens!"
- Restart: "Ready to start again? Your next Streak is just one BeReal away."

**Safety caveat in the middle of a fun article** `[observed]`: "It's good to be real, but we **don't want you taking any risks**. Be careful when taking your BeReal." A physical-safety warning, bolded, inside the onboarding article for a two-minute timed photo task. This is a considered decision — the timer creates real-world risk (driving, cooking, crossing roads) and the copy names it without naming the scenarios.

**Accessibility content** `[observed]`

- `Skip to main content` present and first in DOM on **help centre pages only**
- The marketing site (Framer-built) has **no skip link** in the fetched markup
- **Marketing hero image carries empty alt**: `![](https://framerusercontent.com/images/xnrhESCrP7j5HaDjtczkKq0Wn4.png...)` — as do the second and third section images and the Child Safety page image. Four content images, zero alt text.
- Help-article screenshots carry **filename alt text**, not descriptions: `BTS_Video.gif`, `4.png`, `Profile - Streak.png`, `Calendar - Streak.png`, `Friends of Friends 2.png`, `Mentions 1.png`. These are procedural screenshots inside step-by-step instructions — exactly where a non-sighted user most needs a description — and they announce as filenames.
- **No accessibility statement exists.** No `Accessibility` link in the footer, no article in the help centre, nothing at a guessable URL. `[absent]`
- Marketing page content is **duplicated four times** in the fetched markup (responsive variants of the header and footer), so the full nav and footer appear four times in the DOM. Whether this is announced repeatedly depends on CSS handling — flagged as suspected, not confirmed.
- Icon-only controls are described only by glyph in help copy: `flame 🔥 icon`, `smiley face icon`, `three-dot menu`, `the 'X' in the top right corner`, `the white button`, `the mute button`. No accessible names are given for any of them.
- Gesture-only interactions are documented with no stated alternative: `long-press` (BTS preview, comment delete, RealMoji delete), `double-tap` (open RealMoji view). Both are core actions; neither has a documented non-gestural route.
- `Select Language` on the marketing site presents a one-item list (`English`) — a selector with nothing to select, announced as a control.

**Negative findings, recorded honestly**

- Five inconsistent renderings of `⚠️Time to BeReal.⚠️` — the product's central string
- `SEND` (all caps) vs `Send` (sentence case) for the same button, in two articles
- `Friend Request` vs `friend invitation` for the same object
- Double space in the hero headline: `Your daily dose  of real life.`
- Garbled clause: "There will ever only be one ⚠️Time To BeReal⚠️ notification"
- `### Mentions 1.png` — an image filename rendered as an H3 heading
- `Safety` is the only help category with no scope line
- Locale-stripped internal help links sit beside locale-correct ones in the same article
- Vendor domain (`berealapp.zendesk.com`) exposed in the footer of every help page
- Article slug carries a `--` artefact from a stripped emoji: `/articles/7350386715165--Time-to-BeReal`
- Retake disclosure is documented far less fully than late disclosure, despite both being the same honesty mechanic
- Friends of Friends article has a **26% helpfulness rating over ~4,900 votes**, published on the page

---

## Transferable patterns

1. **Normalise the failure, then disclose the consequence, in one sentence.** "Missed the two-minute window? It happens! … but your friends will know you posted late." The exclamation mark goes on the forgiveness, the plain clause carries the cost. Transfers directly to any product where a user misses a window and a visible artefact results — late payment indicators, missed-deadline states, declined-transaction history. Condition: only works where the consequence is *social* rather than financial; a fee cannot be introduced this breezily.

2. **Quantify the re-entry, not the loss.** `Your next Streak is just one BeReal away.` One sentence, one unit, no guilt, no upsell. Contrast the standard streak-loss pattern. The condition that makes it work: BeReal has nothing to sell you at that moment, and the copy is only credible because of it. Any product monetising the recovery cannot use this tone honestly.

3. **Argue the policy from the product thesis before the legal formulation.** Every one of BeReal's thirteen prohibition categories opens with why the rule protects the thing the user came for, in the user's language, and only then states `What is prohibited.` Highly transferable to acceptable-use, dispute, and risk-policy copy.

4. **Disclose the automation level of an individual adverse decision.** BeReal tells EU users whether a human, a human-with-tools, or a machine alone made the call against them. As adverse-action explainability becomes a regulatory expectation, this is the sentence shape to copy.

5. **Tell a minor to get help reading your policy, and give them an address.** "If you are under 18 and do not understand any of these rules, please speak to a trusted adult before using BeReal. You may also contact us at contact@bere.al." Applies to any product with a teen cohort and a document written for lawyers.

6. **Concede the weakness of your own control in the same sentence as the compensating control.** "We know a declared birthday is a filter rather than proof, so we keep looking after signup." Reusable for KYC, age assurance, and identity-verification copy where the first gate is admittedly soft.

7. **Re-state the core constraint as a safety feature for a different reader.** "The app is one moment a day. There is no endless feed to get lost in." Same fact as the marketing hero, addressed to a parent, and more persuasive in the second context. A reminder that the limitation and the benefit can be one sentence pointed two ways.

8. **Publish your unrounded helpfulness ratios.** BeReal shows `1293 out of 4946 found this helpful`. It is uncomfortable and it makes the help centre self-diagnosing. Condition: only worth doing if someone acts on the number.

9. **Repeat a persistence warning verbatim rather than cross-linking it.** The audience-stickiness sentence appears in bold, word-for-word, on two articles. Where a sticky setting has a privacy consequence, duplication beats a link.

## Caveats & gaps

- **The marketing site carries almost no content.** Four sections, one CTA, no pricing, no FAQ, no features page. Nearly everything in this file above T2 is `[documented]` from help articles rather than `[observed]` in product.
- **The product is mobile-only.** All in-app states, empty states, validation messages, toasts, and the actual late/retake badge labels are unreachable. The late-post disclosure is documented as a *behaviour* but the string the app renders is not public. An authenticated mobile pass is required for T5, T6 labels, T7 error strings, and all of T8.
- **`Memories` article not retrieved** — the fetch was aborted. `Memories` is a core coined term appearing in six other articles, so its definition here is assembled from cross-references rather than from its own article.
- **`Resharing`, `Tagging`, `BeReal Audio`, `Instant RealMoji`, `Share your Location`, `RealGroup`, `RealPeople & RealBrands` articles not opened** — titles captured, bodies not. These would likely add coined vocabulary and further audience/visibility states.
- **No accessibility statement was found.** Absence is a finding, but a deeper search (app store listings, VPAT registries) was out of scope.
- **`Get Verified`, `Ads`, `News`, `DSA`, `Terms`, `Privacy`, `Cookie Policy` pages not harvested.** The DSA hub in particular is referenced twice in the Community Standards and would carry moderation-transparency copy.
- **Locale mixing:** Community Standards is written in British English, the help centre in en-US. Any register conclusion in this file should be attributed to its surface, not to BeReal globally.
- **Helpfulness ratios are a snapshot** at harvest and will drift.

## Sources

1. https://bereal.com/
2. https://bereal.com/community-standards
3. https://bereal.com/child-safety
4. https://help.bereal.com/hc/en-us
5. https://help.bereal.com/hc/en-us/categories/7209052114973-The-Guide
6. https://help.bereal.com/hc/en-us/categories/7242450196253-Troubleshooting
7. https://help.bereal.com/hc/en-us/categories/10449460450589-Safety
8. https://help.bereal.com/hc/en-us/sections/7209075877917-BeReal
9. https://help.bereal.com/hc/en-us/articles/7350386715165--Time-to-BeReal
10. https://help.bereal.com/hc/en-us/articles/15416869159197--Time-to-BeReal-Notification
11. https://help.bereal.com/hc/en-us/articles/15272815079453-Behind-The-Scenes-BTS
12. https://help.bereal.com/hc/en-us/articles/15951201919517-How-Streaks-Work
13. https://help.bereal.com/hc/en-us/articles/10444893090205-Audience
14. https://help.bereal.com/hc/en-us/articles/7536240858653-RealMojis
15. https://help.bereal.com/hc/en-us/articles/11773264475933-Friends-of-Friends
16. https://help.bereal.com/hc/en-us/articles/7539866178333-Delete-a-BeReal
17. https://help.bereal.com/hc/en-us/articles/7536338534429-Captions-Comments
