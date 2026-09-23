# 154. Medium

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Publishing and reading platform / member-funded editorial marketplace |
| Primary URL | https://medium.com/ |
| Corpus rank | 154 |
| Benchmark strength (source list) | Reading and publishing prompts |
| Locale / market observed | en-US (help centre is en-us only; distribution is English-only by policy) |
| Platform observed | Web (desktop); help articles document Web and App in parallel tab pairs |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a sector-wise. Payment rails: **Stripe** (payouts), credit card and **PayPal** (member billing), Apple/Google IAP. Taxpayer-information and supported-country gates on the payout side; FTC endorsement-disclosure rules cited explicitly for affiliate links; Lumen database used for government takedown transparency; Santa Clara Principles endorsed |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Partial — the signed-out homepage is nearly contentless (one headline, one subhead, one CTA). Pricing, paywall and payout vocabulary are well covered; the story editor, stats surfaces, publication management and response/comment microcopy are unharvested. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (signed out) | https://medium.com/ | Hero, footer. Four content strings total. |
| Membership / pricing | https://medium.com/membership | Two tiers, welcome offer, benefit lists, `Member-only story` labels in situ |
| Help centre home | https://help.medium.com/hc/en-us | Eleven categories with scope lines |
| Medium Glossary | https://help.medium.com/hc/en-us/articles/360006341833 | **A published glossary — 14 terms defined** |
| Become a Medium Member | https://help.medium.com/hc/en-us/articles/115004545567 | Reader-side benefits, billing, cancellation, common questions |
| Partner Program enrollment | https://help.medium.com/hc/en-us/articles/115011694187 | Two-step enrolment, eligibility gate |
| Make a story eligible to earn | https://help.medium.com/hc/en-us/articles/115011928308 | **Paywall controls, per-platform label divergence** |
| Partner Program earnings calculation | https://help.medium.com/hc/en-us/articles/360036691193 | **Six earnings components, payout timing, FAQ** |
| Distribution Guidelines | https://help.medium.com/hc/en-us/articles/360006362473 | **Boost / General / Network, and the full disqualification list** |
| What happens to your story when you publish | https://help.medium.com/hc/en-us/articles/360018677974 | Two-system distribution model |
| Create and manage lists | https://help.medium.com/hc/en-us/articles/214993247 | Reader-side collection states |
| Medium Rules | https://policy.medium.com/medium-rules-30e5502c4eb4 | Conduct policy, enforcement, appeals, takedown transparency |

---

## T1 Navigation & IA labels

**Signed-out global nav — five items** `[observed]`

`Our story` · `Membership` · `Write` · `Sign in` · `Get started`

`Our story` in position one, ahead of the product. `Write` as a nav item that is really a signup wall (it links to `/m/signin?operation=register&redirect=/new-story`) — the CTA names the act, the URL names the gate. `Membership` rather than "Pricing" or "Plans".

**Homepage footer — nine items** `[observed]`

`Help` · `Status` · `About` · `Careers` · `Press` · `Blog` · `Store` · `Privacy` · `Rules` · `Terms` · `Text to speech`

`Status` as the second footer item is good practice. `Rules` sits as a peer to `Terms` and `Privacy` — Medium treats its conduct policy as a first-class legal document with its own name, not a subsection. `Text to speech` in the footer links to a **third-party** (`speechify.com/medium`) — an accessibility-adjacent affordance outsourced and surfaced in global nav.

Note the inline footer set on the hero (`About` · `Help` · `Terms` · `Privacy`) duplicates four of the nine.

**Help centre — eleven categories, each with a scope line** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Getting started` | "Learn more about Medium and set up your account" |
| `Managing your account` | "Everything you need to know about your account settings and profile page" |
| `Reading` | "Control your reading experience on Medium" |
| `Managing stories` | "Manage your content" |
| `Writing & editing` | "Master the story editor" |
| `Distribution` | "Learn more about distribution on Medium" |
| `Partner Program` | "Start earning for your content" |
| `Publications` | "Learn how to set up and manage a Medium publication" |
| `Terms & Policies` | "The fine print" |
| `Content` | "Content policies" |
| `Safety` | "Learn about Medium's safety tools" |

**The two-sided split is visible in the IA itself.** `Reading` is one category; `Managing stories`, `Writing & editing`, `Distribution`, `Partner Program` and `Publications` are five. The help centre is 5:1 weighted toward the writer, on a product whose revenue comes from readers.

Scope-line register is inconsistent: `The fine print` (colloquial, three words) sits beside `Everything you need to know about your account settings and profile page` (fifteen words, formal). `Content` → "Content policies" is a tautology; `Managing stories` → "Manage your content" is the same words reordered. Two of eleven scope lines add nothing.

**`Master the story editor`** is the one scope line with an aspirational verb — the editor is positioned as a craft tool.

**Category-to-URL mismatches** `[observed]`: `Getting started` and `Managing your account` **both** link to `/categories/203573748-Managing-your-account`. `Managing stories`, `Writing & editing` and `Distribution` **all three** link to `/categories/200058025-Writing`. So eleven visible categories resolve to seven real ones, and the reader cannot tell which "See all..." will take them somewhere new. A real IA defect.

**Help footer** `[observed]`: `Status` · `Writers` · `Blog` · `Careers` · `Privacy` · `Terms` · `About` · `Return to top`. `Writers` (→ `/creators`) is a footer-level audience surface; there is no matching `Readers`.

**Help chrome** `[observed]`: `Help Center` · `Back to medium.com` · `Submit a request` · `How can we help?` · `Popular:` · `See all...` · `Can't find what you're looking for?` · `Was this article helpful?` / `Yes` / `No` · `Skip to main content`

## T2 Value proposition & headline patterns

**The signed-out homepage carries four strings.** That is the whole page.

> Headline: `Human  stories & ideas`
> Subhead: `A place to read, write, and deepen your understanding`
> CTA: `Start reading`

**`Human` is the entire positioning, doing the work in one adjective.** Not "great", "original", "independent" — `Human`, which in 2026 is a claim about provenance, not quality. And note the **double space** between "Human" and "stories" in the rendered markup — a typographic defect in the largest string on the property.

`A place to read, write, and deepen your understanding` — three verbs, the third abstract and slightly odd as a coordinate (`read`, `write`, and `deepen your understanding` are not the same grammatical weight). The meta/og description is the fuller version: "On Medium, anyone can share insightful perspectives, useful knowledge, and life wisdom with the world." Three noun phrases, and `life wisdom` is the one that dates the copy.

**The CTA is `Start reading`, not `Sign up`.** On a page whose only other action is `Get started`, the primary button names the reader's activity. It renders **twice** in the markup (responsive variants).

**Membership page hero — an imperative about someone else** `[observed]`

> Headline: `Support human stories`
> Subhead: `Become a member to read without limits or ads, fund great writers, and join a global community of people who care about high-quality storytelling.`
> CTAs: `Get started` · `View plans`

The headline asks the reader to do something **altruistic** before anything self-interested. The subhead then orders the three benefits: self (`read without limits or ads`) → other (`fund great writers`) → belonging (`join a global community`). So the headline leads with the donation frame and the subhead immediately reassures that you also get something. That ordering is the whole two-sided pitch in two lines.

`fund` is the verb, not "support" or "pay". `read without limits` rather than "unlimited reading" — the negation of a constraint rather than the assertion of an abundance.

**Five benefit headers, each a verb phrase, in a deliberate order** `[observed]`

1. `Reward writers`
2. `Unlock every story`
3. `Enhance your reading experience`
4. `Elevate your writing`
5. `Support a mission that matters`

**`Reward writers` is first.** On a consumer pricing page, the first listed benefit of paying is that someone else gets paid. Then the mechanism is stated immediately: "A portion of your membership fee is allocated to the writers of the stories you read and interact with." Not "supports writers" — `allocated`, and scoped to `the stories you read and interact with`, which tells the reader their attention is the routing mechanism.

Header 4 (`Elevate your writing`) is the interesting structural move: a **reader** pricing page selling **writer** capabilities (publications, custom domain, "our simple but powerful publishing tools"). Medium's membership does not distinguish reader from writer, and the benefit list refuses to either.

Header 5's body carries the anti-competitor line: "As a member-supported platform, quality comes first, not ads or clickbait." `clickbait` named explicitly.

**Testimonials are attributed with employer and role, and one makes an explicit price comparison** `[observed]`

> "One good technology book could sell for over the Medium membership fee amount. It's your choice whether to buy one book, or buy hundreds and thousands of books by unlocking member-only reading on Medium."

A reader-supplied unit-economics argument, quoted on the pricing page. Medium is letting a member make the value case rather than making it itself.

**`Unlock a world of wisdom`** as the closing section header — and `wisdom` appears twice on the page (`life wisdom` in meta, `world of wisdom` at the foot), which is the strongest recurring value word after `human`.

**Member-only story cards render on the pricing page as live examples** `[observed]`

> `Member-only story`
> `The Case For Reforesting Our Cities` — `Clive Thompson` — "Writer at Wired magazine and author of Coders"

The paywall label is demonstrated in situ, above real headlines, with the author's credential as the third line. The reader sees the badge they will be buying access to, before they buy.

## T3 CTA inventory

### Observed live UI

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start reading` | Homepage, primary | Names the activity, not the transaction. Renders twice. |
| `Get started` | Nav, membership hero, membership foot | Three placements, one label |
| `View plans` | Membership hero, beside `Get started` | Secondary, no arrow, no styling cue in markup |
| `Sign in` | Nav | |
| `Sign up` | Membership page nav | **The homepage says `Get started` where membership says `Sign up`** — same action, two labels, two pages |
| `Write` | Nav | Verb-as-nav-item; destination is a signup gate |
| `Our story` | Nav | Links to `/about?autoplay=1` — **a nav link that auto-plays media** |
| `Select` | Both membership tier buttons | **Bare `Select` on both tiers, with no tier name** — two identical accessible names on the purchase screen |
| `Learn more` | Used ~7 times across help articles | Almost always object-supplied by the preceding sentence; see below |
| `Submit a request` | Help nav and help foot | |
| `Skip to main content` | Help centre, first in DOM | Present on help; **absent on medium.com** |
| `Return to top` | Help foot | |
| `Yes` / `No` | "Was this article helpful?" | |
| `See all...` | Each help category | **With a trailing ellipsis**, and several resolve to a category the reader has already seen (see T1) |
| `Sitemap` | First link in the homepage DOM | Before the logo |
| `Text to speech` | Footer | Third-party destination |
| `Open in app` | Policy page (Medium-hosted) | |
| `Listen` | Policy page | A paywalled audio control on a *policy* document |
| `Share` | Policy page | |

### Documented in-product CTAs

**Publishing and paywall** `[documented]`

| String | Platform | Notes |
|---|---|---|
| `Publish` | Web | |
| `Paywall your story` | Web — **a checkbox** | Verb-as-checkbox-label |
| `Publish now` | Web and App | |
| `Next` | App | Where web says `Publish` |
| `Members only` | App — **a toggle** | **Different label for the same control as web's `Paywall your story`** |
| `Edit story` | Web, three-dot menu | |
| `Edit` | App, three-dot menu | |
| `Manage paywall setting` | Web, three-dot menu in edit mode | |
| `eligible to earn` | Web, the option itself | **lowercase, inside a sentence** |
| `Save` | Web | |
| `Publish` | App — "Tap **Publish** to save your changes" | **`Publish` used as a save verb** on an already-published story |

**The paywall control has two names.** Web: `Paywall your story` (a checkbox, verb-first, naming the mechanism). App: `Members only` (a toggle, adjective phrase, naming the audience). These are the same setting on the same story, documented in the same article, in adjacent tabs, with no acknowledgement. The web label is about the wall; the app label is about who is inside it.

And a third name exists in the same article: the option to make a published story `eligible to earn`. So one concept — this story is paid — has three user-facing names: `Paywall your story`, `Members only`, and `eligible to earn`. The article's own title uses the third.

**Reading and collection** `[documented]`

`Save` (adds to a list) · `Reading list` (the default, undeletable list) · `Save list` (saves someone else's list) · `Saved lists` (the tab) · `New list` · `Create` · `Library` · `Edit list info` · `Copy link` · `Share` · `Download` (offline) · `Responses` · `What are your thoughts?` (web response placeholder) · `Write a response` (app equivalent) · `Respond` · `Upgrade` · `Become a member` (app) · `Start my membership` · `PayPal Checkout` · `Manage membership`

**`What are your thoughts?` (web) vs `Write a response` (app)** — the same field, one phrased as a question to the reader, one as an instruction. The web version is better and the app version is the one that matches the button (`Respond`).

**`Save` is doing double duty.** It is the list-add action for readers *and* the paywall-setting confirm for writers, in two different help articles.

### The `Learn more` finding

Medium ships **bare `Learn more` roughly seven times** on the membership help article alone, once per benefit bullet. Each is preceded by a sentence that supplies the object, so it is defensible in reading order — but seven identical link names on one page is a real accessibility problem (see T14), and it contrasts sharply with Wise, which almost never ships a bare `Learn more`. The one time Medium does write a specific link, it is excellent: `Read our IMDb migration guide` — no, that is Letterboxd. Medium's closest equivalent is `Learn more about cancellations`, which appears once.

## T4 Onboarding & getting-started

**There is no onboarding tour.** No `/welcome/`, no "how it works", no step sequence anywhere public. The homepage is a headline and a button.

**The onboarding work is done by two help constructs.**

**1. The glossary** — see T13. Medium is the only product in this cohort that ships a **published glossary of its own coined terms** (`Clap`, `Highlight`, `Note`, `Response`, `Kicker`, `Partner`, `Digest`…). That is the onboarding artefact: rather than a tour, Medium hands you a vocabulary list.

**2. `Getting started` as a help category** with four named entry articles `[observed]`: `Sign in or sign up to Medium` · `Using Medium` · `Medium membership` · `Medium glossary`. The fourth item in a getting-started list being a glossary is the tell.

**Writer enrolment is a genuine two-step sequence with an eligibility gate first** `[documented]`

> `Step 1: Check your eligibility`
> "Before enrolling, make sure you meet all eligibility requirements, including having a bank account and filing taxes in a supported country."
>
> `Step 2: Complete enrollment`
> "Connect a Stripe account, and submit your taxpayer information to start earning."

Two steps, numbered, with the **blocker before the work**. Step 1 names the two disqualifiers (bank account, tax-filing country) in the step body rather than deferring to a requirements page — though it then also links to one. A writer in an unsupported country learns it in sentence one.

**Subscription flow, documented per platform with the divergence exposed** `[documented]`

Web: `medium.com/membership` → `Upgrade` (existing account) or `Get Started` (new) → choose plan → choose payment method (`credit card or PayPal`) → `Start my membership` / `PayPal Checkout`.
App: profile picture → `Settings` → `Become a member` → choose plan → confirm.

Note `Upgrade` here versus `Get started` and `Select` on the live page — a fourth label for the same funnel entry.

**Progress language** `[absent]` — no step counters, no progress bars, no completion states documented anywhere.

## T5 Form & field labels

Very thin on observed strings; Medium's forms are all behind auth.

**Observed** `[observed]`: `How can we help?` (help search heading) · `Popular:` (a label followed by a colon, preceding the category grid) · `Pay monthly` / `Pay annually` (billing toggle) · `Save up to $75` (a benefit label attached to the annual option) · `Welcome Offer` (an eyebrow above the price block)

**Documented** `[documented]`

| Label | Notes |
|---|---|
| `Paywall your story` | Web checkbox |
| `Members only` | App toggle |
| `What are your thoughts?` | Web response placeholder — a question as placeholder |
| `Write a response` | App equivalent |
| List `name` and `description (optional)` | Optionality marked in the label |
| `public` / `private` | List visibility, defined inline (see T6) |
| `Add a note to appear above each story on the list` | A field whose label states where its content renders |
| `Manage paywall setting` | Menu item |
| `three-dot menu` | Named consistently by appearance across articles |
| `Publishing settings` | Where the account-level paywall default lives |
| `Membership and payment settings page` | |

**`Add a note to appear above each story on the list`** is a good field label: it names the input and its rendered position in one clause, so the writer knows what they are producing before they type.

## T6 Collection & publication states

Medium has **two** state systems — a reader-side collection model and a writer-side publication/paywall/distribution model. The second is far richer, and it is the one that matters.

### Reader-side collection states

| State | Set by | Notes |
|---|---|---|
| saved to `Reading list` | `Save` | **The default, and "cannot be deleted"** |
| saved to a custom list | `Save` → select lists | Multi-select — "Select all the lists you want to add the story to" |
| removed from a list | deselect | "To remove the story from a list, deselect it." |
| list is `public` | at creation | "can be shared with anyone and are visible on your profile page under the Lists tab" |
| list is `private` | at creation | "cannot be accessed by anyone but you" |
| someone else's list, `Save`d | `Save list` | Appears in `Saved lists` tab |
| `Download`ed for offline | `Download` | "Tap the button again to remove the downloaded content." |
| `muted` author/publication | `Mute an author or publication` | |
| `blocked` user | `Block a user` | |
| `highlight`ed passage | selection | "your followers will see the highlights on the post" |
| `clap`ped | tap, repeatable | "You can clap multiple times to show how much you liked it." |

**Lists are non-exclusive and multi-select** — a story can be on many lists at once, set in one interaction. Compare Goodreads' exclusive-shelf model and Letterboxd's orthogonal flags. Medium's is the loosest of the three, and consequently the least semantically loaded: a Medium list means nothing about the reader's relationship to the story except "I put it here".

**There is no read/unread state, no progress state, no finished state, and no abandoned state.** `[absent]` This is the notable gap. Medium knows reading time to the second — it is the entire basis of writer payment — and exposes **none** of it to the reader as a collection state. There is no "continue reading", no "you're 40% through", no "read" flag, no DNF. The reader's own relationship to a story is modelled only as *saved* / *not saved*.

That asymmetry is worth stating plainly: **Medium measures reading precisely for the writer's payout and models it not at all for the reader's library.** Goodreads gives the reader page-level progress and no payout; Medium gives the writer 30-second-granularity reads and the reader a bookmark.

**The two-tier privacy model is defined inline, in the creation flow** `[documented]`

> "**Public lists** can be shared with anyone and are visible on your profile page under the Lists tab."
> "**Private lists** cannot be accessed by anyone but you."

Both definitions given at the point of choice, each naming the audience *and* the surface. `cannot be accessed by anyone but you` is stronger and clearer than "only you can see it".

**`Reading list` is undeletable and Medium says so** `[documented]`: "Please note: 'Reading list' is your default list which cannot be deleted." A locked default, disclosed — same pattern as Goodreads' unrenameable shelves.

**Response moderation is a state the list owner controls** `[documented]`: "you have the ability to hide unwanted responses or close the response section so no further responses can be posted." Two states — `hide` (per-response) and `close` (per-object).

### Writer-side publication states

**Paywall state** `[documented]`

| State | Wording |
|---|---|
| free / not paywalled | "If the entire story will show up in the email if it has not been paywalled" *(sic — see defects)* |
| paywalled / `eligible to earn` | "When a story is made eligible to earn, it is placed behind the paywall and becomes accessible only to Medium members." |
| account default | "You can set the paywall to be enabled or disabled by default for all new stories in your Publishing settings." |
| made ineligible voluntarily | "any earnings accrued up to that point will still be paid out at the end of the month, provided your account is in good standing and your tax documents are approved" |
| made ineligible for policy violation | "Medium reserves the right to withhold payment." |
| `unlisted` | earnings stop; "Stories are eligible to earn only during periods when they are public and set to earn as part of the paywall." |
| deleted | same rule |

**The paywall/earning conflation is the key vocabulary decision.** Medium does not have a "paid story" state and a separate "earning" state — `eligible to earn` **is** `behind the paywall`. One sentence does the whole definition: "When a story is made eligible to earn, it is placed behind the paywall and becomes accessible only to Medium members." Writer incentive and reader restriction are the same switch, and the copy says so rather than presenting two settings.

**Distribution state — three named tiers, and this is the strongest state vocabulary in the file** `[observed]`

| Tier | Definition (verbatim, abridged) |
|---|---|
| `Network Distribution` | "stories that are matched to readers who are following that specific writer (and/or the publication…). **This is the baseline category** for any story on Medium which does not violate Medium rules." |
| `General Distribution` | "matched to readers based on their interests, and on related writers or publications they follow. These stories are also given Network Distribution." |
| `Boost` | "especially high-quality stories that meet our Boost Guidelines… These get a higher priority in being matched to readers and are also given General and Network Distribution." |

**The tiers are cumulative and the copy states the nesting.** Each higher tier explicitly inherits the lower ones ("are also given Network Distribution", "are also given General and Network Distribution"). A writer can read the three definitions and know exactly what they have and what they are missing.

And critically, **the floor is named and guaranteed**: `Network Distribution` is "the baseline category for any story… which does not violate Medium rules". A writer whose story is demoted knows it still reaches their followers. That is the single most reassuring sentence in the document, and it is placed first.

Then the scope of the whole system is bounded: "These distribution categories are only meaningful when a reader uses the Medium app, website, or Digest emails to find stories to read. Readers can find all stories on Medium, regardless of the category above, via direct links, search engines, social media, and other forms of off-Medium distribution."

**A ranking system that immediately tells you how little it controls.** Medium ships the tier taxonomy and then, in the same breath, says the tiers are irrelevant to every off-platform route. This is the `claim, then bound the claim` move from the Wise exemplar, applied to an algorithm rather than a price.

**`Network only` is a fourth name for the same thing** `[observed]` — the sibling article uses "`Network only`" as a heading ("we will also **remove low-quality stories** from distribution to Medium's network, though they will still be distributed to the writer's personal network. For more on distribution disqualifications, see the `Network only` section of our quality standards"). That section does not exist under that name; the guidelines call it `Network Distribution`. A cross-reference to a heading that was renamed. Recorded as a defect.

**Publication submission states** `[documented]`: `How to submit a story to a publication` · `How to manage story submissions` — a submit/review workflow exists with its own articles, unharvested.

**`Draft` state** `[documented]` — implied by `Create, edit, or delete a story` and "a draft post" references, but no draft-specific copy was captured. Partial.

### The earnings state machine

`[documented]` — six components, each named and defined:

| Component | Definition (abridged, verbatim fragments) |
|---|---|
| `Member reading time` | "Reading and listening times are combined into a single 'member reading time' metric. A **member read** is counted when a paying member reads or listens to your story for **30 seconds or more**." |
| `Engagement points` | "Calculated based on member reading and listening time, combined with the number of **claps, highlights, and replies** your story receives from members." |
| `Boost bonus` | "Stories that are Boosted earn engagement points at a higher rate… **Non-boosted stories now receive a larger share** of Partner Program earnings than before." |
| `External traffic bonus` | "**Any external source** — A 5% bonus… **Search engines** — an additional share… **Email notifications** — … earn at a higher rate than reads from the Medium app or feed." |
| `New member conversions` | "an additional **one-time** amount… Members who cancel their membership shortly after joining are excluded from this bonus." |
| `Member read ratio adjustment` | "*Member reads (30 seconds or more) ÷ Total member views*" — "Stories with a below-average read ratio are adjusted down; stories with an above-average read ratio are adjusted up." |

**A published formula component with an actual division expression in it.** The read-ratio adjustment is given as a named metric, a stated direction, and an italicised quotient. And its *purpose* is explained: "This adjustment helps account for stories that attract clicks but do not deliver on the promise of their title or preview."

Then the two most likely writer objections are pre-empted in the same paragraph: "This is **not** about scrolling to the end of the story, and does **not** penalize longer stories with longer estimated reading times."

**Two negations placed immediately after a penalising rule, answering the two fears the rule creates.** That construction is the best thing in this file and it belongs at the top of the transferable list.

**The model's own volatility is disclosed** `[documented]`: "Medium's earnings model is updated periodically. This article reflects the current calculation method." And a **superseded** scheme is documented rather than deleted: "This is different from the previous referral program (2021–2025), which paid a recurring share of the new member's subscription fee. Conversion earnings are a one-time amount, after which the member's subscription fees return to the general Partner Program pool."

Naming the old scheme, its date range, its mechanism, and the change in kind (recurring → one-time) is how you write a downgrade. Compare Wise's removed-feature article; Medium does the same for a payout formula.

**Timing and timezone** `[documented]`: "Earnings are updated daily, based on activity from midnight to 11:59 PM UTC. Calculations may take up to 48 hours to be finalized." A window, a timezone, and a settlement lag — three numbers where most products give none.

## T7 Error, failure & recovery

Thin on observed strings; Medium's error copy is behind auth.

**Documented failure states, phrased as questions the writer would ask** `[documented]`

- `Will I earn for a story that is no longer paywalled or has been deleted or unlisted?` — **three failure modes in one question title**, answered with a two-branch rule (voluntary vs policy violation)
- `Why am I unable to start a recurring membership?` — answered with an external cause and an explicit workaround: "Certain credit and debit cards are unable to initiate recurring charges based on geographical banking restrictions. As this is a banking regulation, it is beyond our control. We encourage you to contact your bank… To work around this restriction, you can buy a gift membership and send it to your own email address."
- `Why was my credit card charged $1?` — "our payment provider Stripe may make a temporary authorization of $1 to verify validity of the card. This temporary authorization will be credited back to you, and not charged."

**The `$1` article is a small masterpiece of anxiety management.** The user's exact observation is the title, the cause names the third party, and the resolution is stated twice in one sentence with a redundancy that exists purely to reassure: `will be credited back to you, and not charged`.

**The recurring-membership answer is the better structural pattern**: state the cause, disclaim responsibility honestly (`it is beyond our control`), route to the party who can fix it (`contact your bank`), **and then ship a workaround anyway**. Most products stop at the disclaimer.

**Enforcement and recovery, from Medium Rules** `[observed]`

- `If you break the rules` — "we reserve the right to suspend accounts or remove content, without notice, for any reason… If you attempt to evade suspension by creating new accounts or posts, we will suspend your new accounts and posts."
- `Notice` — "Upon investigating or disabling content associated with your account, we will notify you, **unless** we believe your account is automated or operating in bad faith, or that notifying you is likely to cause, maintain or exacerbate harm to someone."
- `Appeals` — "If you believe your content or account has been restricted or disabled in error, **or believe there is relevant context we were not aware of** in reaching our determination, you can write to us at trust@medium.com. We will consider all good faith efforts to appeal."

**The appeal ground list has two entries, and the second one is unusual.** Not just "we were wrong" but "there is relevant context we were not aware of" — an explicit invitation to supply mitigating information rather than to contest the facts. That opens a route for users whose content was technically in breach but contextually fine.

**A named non-appealable class** `[observed]`: "Users found in violation of our copyright rules are **not eligible for warning, appeal, or restoration**. Deletion of copyright violations is not grounds for reinstatement." Three withheld remedies, enumerated. Harsh, and clearly stated rather than discovered.

**Pre-failure routing** `[observed]`: `Block and mute:` is a section of Medium Rules placed **above** the rules themselves, with three self-service options ("Block them and move on", mute, remove responses). The conduct policy opens by telling you how to handle conflict without involving Medium.

## T8 Empty states

`[absent]` for observed. None are quoted in any harvested article.

Two adjacent findings:

- **A conditional-rendering defect leaks an empty-state-adjacent bug into the glossary** `[observed]`. The `Email subscription` definition reads: "The email will contain a preview and link to the story on Medium if it's been paywalled by the writer. **If the entire story will show up in the email if it has not been paywalled.**" The second sentence has a duplicated `if` and no main clause — a broken conditional in the product's own glossary. This is the clearest copy defect found on Medium.
- **`Can't find what you're looking for?` → `Submit a request`** is a pre-emptive no-results affordance on every help page, rendered unconditionally rather than on failure.

## T9 Notifications & system messages

**`Digest` is a defined product with its own glossary entry** `[documented]`

> "Daily or weekly email you receive from Medium with your story recommendations. Digests are based on what stories, publications, and topics you follow on the platform, and what you read in the past."

The glossary defines the notification, names its two cadences, and states its three inputs. Then routes to control: "You can always manage your email preferences in your Settings."

**Three distinct email types, distinguished in the glossary** `[documented]`

| Term | Definition |
|---|---|
| `Digest` | Medium's own recommendation email |
| `Newsletter` | "Email sent by a **publication**. Every publication can create a newsletter and send it to to subscribers." *(sic — `to to`)* |
| `Email subscription` | "Email sent by an **individual writer**." |

Publication-sent vs writer-sent vs platform-sent, as three separate terms. That is precise and it prevents the "why am I getting this" confusion that a single "emails" concept creates. The `to to` typo sits in the middle of it.

**Email notifications are a monetised distribution channel, and the writer is told** `[documented]`: "**Email notifications** — Member reads that come from email notifications sent to your subscribers earn at a higher rate than reads from the Medium app or feed." Followed by the instruction: "To take advantage of these bonuses, share your stories externally, optimize your SEO settings, and **enable email notifications when publishing**."

Medium is paying writers more for reads it did not have to route, and telling them to use the channel. The incentive and the instruction are adjacent.

**Distribution destinations enumerated as notification surfaces** `[observed]`: "On the 'Following' feed" · "In Medium Digest emails" · "Email notifications (optional)" · "The 'For you' feed" · "Medium topic pages" · "In the Explore section of Medium's app, as a trending or recommended story" · "In the 'More from Medium' (web) or 'Recommended for you' (app) sections on other Medium stories" · "On the version of the Medium homepage for logged-out users"

**Note the platform label divergence, disclosed in a parenthesis**: `More from Medium` (web) vs `Recommended for you` (app) — same module, two names, and Medium prints both. It is at least honest, but it is also a defect surfaced rather than fixed.

**Renewal and cancellation messaging** `[documented]`: "When you cancel, you will still be able to use all your membership benefits until the the end of the billing cycle." *(sic — `the the`)*. A second doubled-article typo, in the cancellation reassurance.

**`Presentations` — a metric named to the writer** `[documented]`: "we have added a new metric to your story stats: Presentations. This metric shows how many times Medium has suggested your stories to readers on the website or app." A new coined noun for algorithmic impressions, introduced with its definition.

## T10 Disclosures, legal & compliance — TWO-SIDED PAYMENT MODEL

This is Medium's strongest category and the priority for this product.

### Reader side — what you pay

**Two tiers, observed live** `[observed]`

| | `Medium Member` | `Friend of Medium` |
|---|---|---|
| Live page (welcome offer) | `$50` struck to `$35 for 1 year`, `then $50/year` | `$150` struck to `$105 for 1 year`, `then $150/year` |
| Help article | `$5/month or $50/year` | `$15/month or $150/year` |
| Button | `Select` | `Select` |

**The promotional price is written as a three-part string**: original price struck through, promo price with its duration (`for 1 year`), and the reversion price with its cadence (`then $50/year`). Nothing is hidden behind an asterisk — the post-promo price is on the price line itself, in the same size, adjacent to the offer. That is the correct way to present an introductory rate and it is rare.

The page eyebrow is `Welcome Offer` and the headline is `Access to everything. Now 30% off.` — a full-stop-separated two-sentence headline where the discount is the second sentence.

Billing toggle: `Pay monthly` / `Pay annually`, with `Save up to $75` attached to the annual option. `up to` is doing hedging work across two tiers.

**`Friend of Medium` — a tier named after a relationship, not a level** `[observed]`

Not "Premium", not "Pro", not "Plus" — `Friend of Medium`, which is the language of public broadcasting and museum patronage. And the tier's benefits are almost entirely *other-directed*:

- `Give 4x more to the writers you read` — a benefit whose beneficiary is someone else, listed first
- `Get access to TK, an app designed to help you write more, more often`
- `Share member-only stories with anyone and drive more earnings for writers`
- `Customize app icon`

**Three of the four premium benefits are about giving more or enabling others**, and the fourth is an app icon. Medium has built a price tier on generosity and priced it at 3× the base. The help article makes the pitch explicit: "**Support a healthy, open future for online publishing** … When you become a Friend of Medium, you're investing in this mission to create a better future for online publishing."

`TK` is a journalism newsroom placeholder ("to come") used as a product name — an in-joke only writers will get, on a tier aimed at writers.

**The 4× multiplier is explained mechanically, not asserted** `[documented]`

> "When you spend time reading member-only stories, you'll generate four times more earnings for those writers compared to a regular membership. This revenue share is calculated in the same way as our standard Medium membership: it's based on a combination of read and listen time, claps, highlights, replies, and follows. The difference is that it's multiplied by a factor of four."

Same formula, one multiplier, stated as such. The reader can verify the claim against the writer-side earnings article, and the two agree.

**Friend Links — a paywall bypass, with the writer's economics disclosed to the reader** `[documented]`

> "Friend Links used to be a writer-only feature… Now, we're opening this up to Friend members. Friends of Medium can create and share Friend Links for any paywalled story. **When non-members follow these links and bypass the paywall, their read time is factored into the writer's earnings.** This means you can drive more earnings and reach for writers you love by sharing Friend Links to their stories."

A deliberate hole in the paywall, sold as a benefit, with the payout consequence explained. And the corresponding writer-side answer confirms it in the earnings article: "Reads from a Friend Link are treated the same as regular reads. Members who read your story through the Friend Link will still contribute to your earnings, **while non-members' reads will still not contribute to them.**"

**The two sides of the same feature are documented in two articles and they are consistent but not identical.** The reader-facing article says a shared Friend Link "drives more earnings"; the writer-facing article says non-member reads via Friend Link do **not** contribute. Both can be true (the member sharer's own read counts; the non-member recipient's does not) but the reader-side copy reads as more generous than the mechanism. Recorded as a **soft inconsistency across the two-sided documentation** — the kind that only shows up when you read both sides.

**Reader billing disclosures** `[documented]`

- Cancellation: "Medium membership can be canceled at any time from your Settings page, or from the App Store for memberships purchased through the Medium iOS app and Google Play Store for Android."
- Post-cancellation access: "you will still be able to use all your membership benefits until the the end of the billing cycle"
- Frequency change: "you can also change your billing frequency by going to your Membership and payment settings page, and then clicking 'Manage membership.'"
- Invoices: `Can I receive an invoice for my purchase?` → yes, with a link
- Payment methods: "You can use your credit card or PayPal."
- The `$1` authorisation (see T7)
- Family sharing excluded: "In-app purchases such as Medium membership are not covered by Family Sharing."
- Gift membership as a **non-recurring alternative**: "The gift membership costs $50 and works just like a regular annual membership, but it's a one-time charge rather than a recurring one."

**`How easy is it to cancel my membership?`** as the first common question on the membership page is a confident choice — leading the FAQ with the exit.

### Writer side — how you get paid

**Eligibility gate, named before enrolment** `[documented]`: "having a bank account and filing taxes in a supported country". Two hard requirements, in the step that precedes any work.

**Payout rail and tax** `[documented]`: "Connect a Stripe account, and submit your taxpayer information to start earning." And the withholding condition: "provided your account is in good standing and **your tax documents are approved**."

**Payout timing** `[documented]`: "any earnings accrued up to that point will still be paid out **at the end of the month**". Plus the calculation cadence: daily, UTC-bounded, 48-hour finalisation.

**The full component list** is in T6. The disclosure quality points:

- **A percentage is given**: "A 5% bonus is applied to member reads that come from outside Medium".
- **A threshold is given twice**: "30 seconds or more", stated in the component definition and again in a pulled blockquote — "A read is counted when the reader has spent 30 seconds or more on your story."
- **The measurement method is described**: "Reading time is based on the time a viewer actively spends on the page, taking into account scrolling behavior and activity. Medium differentiates between natural pauses in reading and periods where the viewer has stepped away, so **idle time is not counted**."
- **A cap is disclosed**: "Since scroll pauses cannot be tracked during audio playback, a maximum of **two full listens per member** is applied toward earnings." A named technical limitation producing a named cap.
- **A direction of change is disclosed against interest**: "**Non-boosted stories now receive a larger share** of Partner Program earnings than before." Medium telling writers it reduced the Boost advantage.
- **The superseded referral scheme is documented with dates** (see T6).
- **Payment withholding for violations is stated**: "If a story is made ineligible due to a policy violation, Medium reserves the right to withhold payment."

**Publication-neutrality disclosed** `[documented]`: "Paywall eligibility is not affected by whether a story is published independently or within a publication."

### Curation and distribution disclosure

**Medium publishes a full disqualification taxonomy for its own algorithm** `[observed]`. `What disqualifies a story from being Boosted?` and `What disqualifies a story from General Distribution?` are both answered with named, headed categories:

*Boost disqualifiers:* `Title, subtitle, and/or cover image do not represent the story well` · `NSFW (Not Safe For Work) content` · `Stories in languages other than English`

*General Distribution disqualifiers:* `Clickbait title, subtitle, or cover image` · `Unconstructive negativity` · `Low-value content` · `NSFW content` · `Misinformation` · `Topic/mentions spamming` · `Rules violations` · `Shout-outs to your community on Medium` · `Stories about Medium`

Several are remarkable:

- **`Stories in languages other than English`** — "We can only review stories written in English at this time, so unfortunately stories in other languages will not be Boosted or be given General Distribution yet—it's something we hope to do in the future." A structural limitation on non-English writers' earning potential, stated flatly, with `unfortunately`, `yet`, and a non-commitment ("we hope to"). Honest and uncomfortable.
- **`Stories about Medium`** — "Posts about the Medium Partner Program, making money on Medium, or Boost itself are set to Network Distribution. This is how we prevent readers from being overrun by these stories; **readers have repeatedly told us they don't want this content** appearing in their feed or digests when they don't follow the writer or publication. We also often see inaccurate speculation or advice and are not able to respond in every case." A platform explaining why it suppresses discussion of itself, citing reader research as justification, and admitting a second motive (inaccurate speculation). Then it offers a consolation and a workaround: "We're happy for you to write about your experience using Medium—good or bad—and those stories will always be distributed to your network" and "We suggest that you tag these stories 'medium-meta'".
- **`Unconstructive negativity`** — defined by naming three genres with Wikipedia links: "outrage porn, misery lit, trolling, private disputes between individuals, and rants that don't bring insight or understanding to the reader." Linking to Wikipedia from a content policy to define your own criteria is an unusual move.
- **`Low-value content`** — a nine-item bulleted list including `AI-generated content`, `Crypto airdrop announcements`, `Reputation laundering` (also Wikipedia-linked), and "Stories that are so poorly written as to be incomprehensible to the reader".
- **`Misinformation`** — with a jurisdictional disclaimer up front: "Medium curation does **not** fact-check stories. However, when we do recognize misinformation or factually inaccurate stories, those stories are not eligible for General Distribution."

**The Boost criteria are published with an anti-checklist warning** `[observed]`

> "**We evaluate each story for how it fulfills the overall spirit of these guidelines in a broad, nuanced sense.** A story need not perfectly exemplify every one of the elements below to be Boosted. And **these elements should not be interpreted as a checklist of components that guarantee Boost.**"

Five named criteria follow: `Writer's experience` · `Value and impact` · `Respect for the reader` · `Non-derivative` · `Writing and craftsmanship`. Each is a paragraph of prose, not a rule.

**Publishing your editorial criteria and simultaneously disclaiming them as a checklist** is the right way to handle subjective curation. It gives writers direction without creating a gaming target, and it pre-empts the "I met all five and wasn't Boosted" complaint in advance.

**AI provenance is a stated Boost criterion** `[observed]`: "The story is human-created and does not appear to be generated by Artificial Intelligence, a large language model, or other text-generating technology." And under cover images: "AI-generated cover art sometimes works (if properly credited as such) but is often a turn-off to readers." A hedged, reader-preference-based position on AI imagery rather than a ban — different from the flat prohibition on AI text.

**Accessibility named as a curation criterion** `[observed]`: "We like to see **ALT text that makes images more accessible**, along with appropriate credits." Alt text as a quality signal that affects distribution and therefore earnings. That is the only place in this corpus so far where accessibility practice is tied to a payment outcome.

### Medium Rules — conduct and transparency

**Enforcement philosophy stated with a factor list** `[observed]`: "we will take into consideration things like newsworthiness, the context and nature of the posted information, the likelihood and severity of actual or potential harms, account history, and applicable laws." Five named factors. Then the authority claim: "Medium has the sole authority and final decision as to whether content or behavior violates our rules."

**Rule categories** `[observed]`: `Threats of violence and incitement` · `Hateful content` · `Harassment` · `Privacy and Reputation` · `Restricted categories` · `Related conduct` · `Graphic content` · `Exploitation of minors` · `Promotion and glorification of self-harm` · `Duplicate Content` · `Spam or Site Misuse` · `Copyright and trademark infringement` · `Deceptive conduct` · `Ads, Promotions, and Marketing` · `Embedded Content and Collection of Personal Information` · `Paid, automatic, bulk, or non-genuine interactions` · `Cryptocurrency Accounts, Posts, and Publications`

`Related conduct` is the off-platform clause: "We may consider off-platform actions in assessing a Medium account, and restrict access or availability to that account." Stated plainly rather than buried.

`Hateful content` includes an explicitly enumerated example most policies omit: "this may include targeted or intentional misgendering or deadnaming of transgender individuals, or harmfully ableist language."

**Advertising rules are written as a three-way permission split** `[observed]`

- "**First party promotion is allowed**, and you may promote and link to your own business, website, mailing list, or fundraiser."
- "**Third-party advertising and sponsorships are not allowed.**"
- "**Affiliate links … are allowed** in posts. However, per Federal Trade Commission law, you must disclose the inclusion of these links in your post. This can be a simple sentence in the footer."

Allowed / not allowed / allowed-with-disclosure, in that order, with the regulator named (`Federal Trade Commission`), the obligation stated, **and the minimum compliant implementation specified** ("This can be a simple sentence in the footer"). Telling a user the cheapest way to comply is a genuinely useful disclosure pattern.

**Embed rules require the writer to disclose off-platform data flows** `[observed]`: three numbered requirements, each specifying what the writer must tell their own reader about where a form sends data and whose privacy policy applies. Medium is deputising writers to make privacy disclosures to readers.

**Government takedown transparency** `[observed]`

> "If Medium receives a request from a government actor to restrict access to content associated with your account, we will notify you unless we are prohibited by law or believe doing so may endanger others. Where applicable, we will work to **limit legally-ordered content restrictions to jurisdictions** where we have a good faith belief that we are legally required to restrict the content. Medium submits to the **Lumen** database government requests to restrict access to content (redacted where appropriate to protect privacy or prevent harm to a person)."

Notification, geo-scoping, and third-party publication. Plus a stated framework endorsement: "Medium is committed to providing a transparent, open platform for expression and therefore supports the goals and spirit of **The Santa Clara Principles on Transparency and Accountability in Content Moderation** as a starting point for further discussion."

**And the policy is version-controlled in public** `[observed]`: "We also may change these rules at any time. We **track changes** to our rules on Github so you can see how they evolve." A conduct policy with a public git history.

**Immediately followed by the disclaimer that undercuts it** `[observed]`: "We may enforce, or not enforce, these policies at our sole discretion. These policies don't create a duty or contractual obligation for us to act."

The two sentences sit adjacent: *here is our public changelog and our endorsement of transparency principles* / *and none of this obliges us to do anything*. Worth recording as the honest but jarring seam in an otherwise strong document.

**Version-date defect** `[observed]`: the Medium Rules page shows `May 26, 2021` as its dateline, `2024-09-24` as its `article:published_time` meta, and `*Updated June 2023*` as its closing line. **Three different dates on one policy document.** For a document whose whole pitch is traceable versioning, that is a bad defect.

## T11 Help-centre architecture

**Platform: Zendesk. Three levels: category → section → article.** Eleven visible categories resolving to seven real ones (see T1).

**Category pages carry a `Popular:` label and four-to-five article previews each** — so the help home surfaces ~50 article titles above the fold-equivalent, without requiring a category click. That is a good discoverability decision for a product with a large corpus.

**Article-title grammar — six shapes** `[observed]`

| Shape | Example |
|---|---|
| Imperative task | `Adjust email preferences` · `Block a user` · `Manage responses` · `Report posts & users` · `Create and manage lists` · `Make a story eligible to earn` · `Mute an author or publication` |
| `Your <object>` | `Your profile page` · `Your profile page URL` · `Your homepage` |
| `About <feature>` | `About Audio` · `About Friend Links` |
| Gerund/noun topic | `Using Medium` · `Using topics` · `Using images` · `Using the story editor` · `Getting started with a Medium publication` · `Email subscriptions` · `Audience stats` |
| `How to <verb>` | `How to submit a story to a publication` · `How to manage story submissions` |
| Long explanatory sentence | `What happens to your story when you publish on Medium` · `Medium's Distribution guidelines: How curators review stories for Boost, General, and Network distribution` |

**Two title shapes for the same job**: `How to submit a story to a publication` beside `Create and manage lists` — bare imperative and `How to`-prefixed imperative, in one help centre.

**Casing drift in the Distribution Guidelines title itself** `[observed]`: the page title reads `…for Boost, General, and Network Distribution` (capital D) while the canonical URL slug reads `…Boost-General-and-Network-Distribution` and the sibling article's link text says `…Boost, General, and Network distribution` (lowercase d). The article's own body then uses `Network Distribution`, `General Distribution`, `Boost`, and `Network only` — four capitalisation treatments of a three-term taxonomy.

**Article body structure** is strong and consistent in the newer articles:

1. One-sentence purpose statement
2. `---` horizontal rule
3. `##` sections, each a named component or step
4. **Web / App tab pairs** for any procedural content
5. Pulled blockquotes for the single most important rule
6. `## Frequently asked questions` at the foot of long articles
7. `Was this article helpful?` / `Yes` / `No`

**The Web/App tab pattern is the notable one** `[observed]`. `Make a story eligible to earn` renders as `Web App` followed by two unlabelled numbered procedures. In the fetched markup the tabs collapse and **both procedures render consecutively with no divider** — so a reader sees "Click Publish… Click Publish now" immediately followed by "Tap Next… Tap Publish now" with nothing saying which is which. A tab component degrading into an undifferentiated double procedure is a real defect and it is exactly where the `Paywall your story` / `Members only` divergence becomes confusing.

**Routing furniture** `[observed]`: `Submit a request` (twice per page — nav and foot) · `Can't find what you're looking for?` · `See all...` · `Back to medium.com` · `Popular:` · `Related articles` (on some pages, as an `h6`) · `Want to learn more?` (a section of six external/internal links at the foot of the Distribution Guidelines)

**Cross-domain sprawl** `[observed]`: help content lives on **four** domains — `help.medium.com`, `medium.zendesk.com` (two links on the help home point at the raw vendor domain: `Stats`, `Manage your subscription`), `policy.medium.com`, and `blog.medium.com`. Plus `medium.com/policy/...` short-form aliases for the same documents (`medium.com/policy/9db0094a1e0f` and `policy.medium.com/medium-terms-of-service-9db0094a1e0f` are both linked from the same footer). **Four domains and two URL schemes for one body of documentation.**

**Policy documents are published as Medium posts** `[observed]` — `Medium Rules` lives at `policy.medium.com/medium-rules-30e5502c4eb4`, inside a publication called `Medium Policy`, authored by the account `Medium` (`1.5M followers`), with `11 min read`, tags (`Medium`, `Rules`, `Terms`), a clap button, a `Listen` control, and a `Published in Medium Policy` byline showing `Last published Nov 8, 2021`.

Dogfooding the product for legal documents is charming and it has two costs. **The clap/response affordances are attached to a conduct policy**, and the publication's "Last published" date (Nov 2021) contradicts the article's own dates. Also, the `Listen` control on a policy page routes to `/plans?dimension=post_audio_button` — **the policy document upsells membership through its audio button.**

## T12 FAQs

**Two distinct FAQ constructs, both embedded rather than standalone.** There is no `/faq` page.

**1. `Common questions` on the membership help article** `[observed]` — five questions, and the ordering is the finding:

| # | Question (verbatim) |
|---|---|
| 1 | How easy is it to cancel my membership? |
| 2 | Can I receive an invoice for my purchase? |
| 3 | Why am I unable to start a recurring membership? |
| 4 | Why was my credit card charged $1? |
| 5 | Can I share Medium membership with Apple Family Sharing? |

**Leading with cancellation, and phrasing it as `How easy is it…`** rather than "How do I cancel". The question presupposes ease and then delivers on it ("can be canceled at any time"). Then invoicing (a B2B/expense need), then two payment failures, then a sharing limitation. **Four of five are money-mechanics; none is about reading.** The membership FAQ is a billing FAQ, which is honest about what people actually ask after paying.

**2. `Frequently asked questions` on the earnings article** `[observed]` — three questions, all writer-side:

| # | Question (verbatim) |
|---|---|
| 1 | Can I still earn through a Friend Link? |
| 2 | Can I earn for stories in a publication? |
| 3 | Will I earn for a story that is no longer paywalled or has been deleted or unlisted? |

All three begin with a variant of "can/will I earn" — a deliberate stem. Q1's `still` presupposes a change (Friend Links were reworked). Q3 bundles three states into one question and answers with a two-branch rule, and its second branch (policy violation → withheld payment) is the answer nobody wants and it is given.

**Structural note.** Medium's two FAQ blocks are **audience-segregated**: one at the foot of a reader-pricing article, one at the foot of a writer-payout article, with no overlap in question or vocabulary. The two-sided product produces two FAQs, and the reader never sees the writer's questions or vice versa. That is arguably correct and it is also how the Friend Link inconsistency (T10) survived — nobody reading either block alone would spot it.

**The Distribution Guidelines has no FAQ block but ends with `Want to learn more?`** — six links, including two to Medium's own blog and one to an AI content policy. A reading list in place of a Q&A.

## T13 Terminology & glossary — PRIORITY

**Medium is the only product in this cohort that publishes a glossary.** `Medium Glossary` sits in `Getting started`, as the fourth of four entry articles, and defines fourteen terms.

### The published glossary, as shipped

| Term | Medium's own definition (abridged, verbatim) | The alternative it rejected |
|---|---|---|
| `Clap` | "a way to let the author know that you appreciated their story. You can clap multiple times" | "like", "upvote", "heart" |
| `Digest` | "Daily or weekly email you receive from Medium with your story recommendations" | "newsletter", "roundup" |
| `Highlight` | "highlight your favorite passages in stories to let the author know that you liked this passage" | "quote", "annotate" |
| `Newsletter` | "Email sent by a **publication**" | — |
| `Email subscription` | "Email sent by an **individual writer**" | — |
| `Member` | "Paid Medium subscriber. You can tell that someone is a subscriber if they have a **yellow star** on their profile picture." | "subscriber", "premium user" |
| `Note` | "**Private** way of commenting on someone's story. Notes are between you and the author" | "private comment", "DM" |
| `Partner` | "Author who participates in the Medium Partner Program… lets you earn money by publishing members-only stories" | "creator", "monetised writer" |
| `Publication` | "Similarly to blogs, publications are a way of grouping stories together from multiple writers" | "blog", "magazine", "collection" |
| `Response` | "Comment left underneath someone's post" | "comment", "reply" |
| `Story` | "Post published on Medium" | "article", "post", "piece" |
| `Topic` | "Pages with stories written around a particular interest. You can follow topics" | "tag", "category" |
| `Lists` | "an easy way to quickly organize and share stories" | "bookmarks", "saves", "collections" |
| `Kicker` | "Kickers appear above the headline usually in a different typeface and are intended to provoke interest in, editorialize about, or provide orientation for the matter in the copy heads." | "eyebrow", "overline", "dek" |

### Analysis

**`Story` is the load-bearing choice.** Every post on Medium — a tutorial, a policy document, a poem, a 10,000-word essay — is a `Story`. Not "article", not "post", not "piece". It carries a narrative claim about everything published on the platform and it reinforces the `Human stories & ideas` hero. It is used with total consistency across twelve pages, including in the Rules, the earnings formula, and the distribution taxonomy.

**`Clap` and `Response` are the two coinages that replaced industry standards**, and both were chosen for the same reason: they are *gradable* and *non-binary*. A clap is repeatable ("clap multiple times to show how much you liked it"), where a like is not. A `Response` is a full Story in its own right rather than a comment field, which the definition understates.

**`Note` versus `Response` is the sharpest distinction in the glossary** — `Note` is private-to-author, `Response` is public-underneath. Two comment mechanisms, two names, defined adjacently so the difference is unmissable. Compare Substack (155), which uses `Notes` to mean something entirely different (a public short-form feed). **The same coined word means "private message to author" on Medium and "public microblog post" on Substack** — a cross-product collision worth flagging for anyone writing in this space.

**`Member` is defined by its visual indicator**: "You can tell that someone is a subscriber if they have a yellow star on their profile picture." The glossary entry for a *status* explains how to *recognise* it — good for social legibility and a colour/glyph-only signal with no textual equivalent (see T14). Note that the definition also uses `subscriber` twice in the body of the entry defining `Member`, i.e. **the glossary defines `Member` using the word it is displacing.**

**`Kicker` is a pure newsroom term** — 44 words of definition, the longest entry, using `copy heads` (trade jargon) inside the explanation and specifying the UI affordance ("Select the text and click the small T icon") and a constraint ("Can be set only above the title line"). It is the one entry written for professional journalists, and it sits unmarked beside `Clap`.

### Terms *not* in the glossary that should be

The glossary is missing the vocabulary that governs money and reach — precisely the terms writers argue about:

`Boost` · `General Distribution` · `Network Distribution` · `Presentations` · `Engagement points` · `Member reading time` · `Member read` · `member read ratio` · `Friend Link` · `Friend of Medium` · `member-only story` · `paywall` · `eligible to earn` · `Partner Program` · `unlisted` · `Mute` · `Block` · `Reading list` · `medium-meta`

**Nineteen coined or semi-technical terms in active use, defined nowhere in the glossary.** Several are defined well *elsewhere* (the distribution tiers in the Guidelines, the earnings components in the earnings article) but a writer looking up "what is Boost" in the glossary finds nothing. The glossary covers the 2015-era reading vocabulary and not the 2026-era economics vocabulary.

### Other terminology findings

| Term | Notes |
|---|---|
| `member-only story` | The paywall badge, observed live on `/membership`. **Lowercase and hyphenated.** |
| `members-only stories` | Used in the glossary's `Partner` definition — **`members-only` plural-possessive**, a different form of the same compound |
| `Members only` | The app toggle label — **two words, no hyphen** |
| `Paywall your story` | The web checkbox — verb form |
| `eligible to earn` | The help-article and menu form |
| `Friend of Medium` / `Friend members` / `Friends of Medium` / `Friend Links` | Four forms of one tier name in one article |
| `Boost` / `Boosted` / `boosting` / `a boost in distribution` | Noun, participle, gerund and indefinite-article forms, all in use |
| `curator` / `curation team` / `human curation team` / `human curators` | Four names for the reviewers |
| `TK` | The Friend-of-Medium writing app, named after a newsroom placeholder |
| `me.dm` | Medium's Mastodon instance, named as a benefit |
| `Presentations` | Coined metric for algorithmic impressions |
| `medium-meta` | A **recommended tag** Medium asks writers to apply to posts about Medium |
| `writer` / `Partner` / `creator` | Three audience nouns; `/creators` is the URL, `Writers` is the footer label, `Partner` is the glossary term |

**`member-only story` has four written forms** (`member-only story`, `members-only stories`, `Members only`, plus `paywalled`) and **`Friend of Medium` has four** (`Friend of Medium`, `Friend members`, `Friends of Medium`, `Friend Links`). These are the two most commercially important terms on the platform. Recorded as the largest terminology defect in this file.

**Register split by surface:**
- Homepage: three words and an abstraction (`Human stories & ideas`)
- Membership: warm, altruistic, second person (`Support human stories`, `fund great writers`)
- Help: procedural, imperative, bolded UI labels
- Distribution Guidelines: **editorial-critical** — "narratively strong", "a pleasure to read", "show, don't tell", "hones in on a unique place at a unique time", "without tipping over into sentimentality". This is a literary-magazine voice, used to explain an algorithm.
- Rules: legal-but-plain, with occasional second-person warmth ("Block them and move on")

**The Distribution Guidelines register is the outlier and the most interesting.** Its Boost examples are written as short craft critiques — a curator's notes, published. "It's possible that the reader might not learn any new facts from this piece, but it's highly likely they haven't heard those facts related to each other in quite this way." That sentence is doing algorithmic transparency in the voice of an editor, and it is more informative to a writer than any rubric.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company, and Medium's "we" is **editorially opinionated** in a way no other product in this cohort attempts: "We value thoughtful, nuanced, knowledgeable perspectives — and know readers do, too." "We like to see ALT text…" "Boosted stories are stories **we're especially proud** to put in front of Medium readers." "readers have repeatedly told us they don't want this content."

That last one is the notable rhetorical move: Medium repeatedly attributes its policy decisions to **reader preference** rather than to its own judgement. "readers want to see this type of content in varying degrees and it's disrespectful to foist it upon them unexpectedly" (NSFW). The algorithm is presented as a reader advocate.

**Register.** Plain and warm on consumer surfaces, literary on curation surfaces, procedural in help, legal-plain in Rules. Contractions used freely. Very few exclamation marks — none found on the homepage or membership page; the only ones are in the Rules' conversational asides. **No `Oops!`, no `Great news!`.**

**Tone flattens at the right places.** The price line is bare numerals and a `then $50/year`. The withholding clause is one flat sentence. The earnings formula is arithmetic. And the one place Medium could have been warm and is not — the copyright non-appeal clause ("not eligible for warning, appeal, or restoration") — is correctly cold.

**Numbers as trust devices** `[observed]`: `30 seconds`, `5%`, `four times`, `two full listens`, `48 hours`, `midnight to 11:59 PM UTC`, `$1`, `$50`, `$150`, `30% off`, `1.5M followers`, `45K followers`, `11 min read`. Specific and unrounded, and every one attached to a rule it operationalises.

**Accessibility content** `[observed]`

Present and correct:
- `Skip to main content` on help-centre pages, first in DOM
- **Alt text is a published curation criterion**: "We like to see ALT text that makes images more accessible, along with appropriate credits." Accessibility practice tied to distribution and therefore to earnings — the only instance of this in the corpus so far.
- `How do I add alt text to an image on a Substack post?` — no, that's Substack; Medium's equivalent is `Using images`, unopened.
- `Text to speech` in the global footer (third-party, Speechify)
- `Listen` / audio narration as a first-class member benefit: "Use Medium's text-to-speech audio capabilities on website and mobile apps." And listening time is counted equally toward writer earnings — an accessibility feature that pays writers the same as reading.
- `og:image:alt: Medium` on policy pages
- Formatting cited as a craftsmanship signal, with `blockquotes` called out by name in one Boost example ("Proper use of blockquotes (had this story not been formatted properly, it would have been far less effective)") — Medium rewarding semantic structure

Absent or defective:
- **No accessibility statement.** No footer link, no help article, no VPAT reference, nothing at a guessable URL. `[absent]` — which is a sharp irony given alt text is a Boost criterion.
- **`Learn more` shipped bare ~7 times on one page** (the membership help article, once per benefit bullet). Seven identical link names in one document.
- **`Select` on both membership tier buttons** — two controls with the same accessible name on the purchase screen, differentiated only by position.
- **`Member` status is signalled by a yellow star on an avatar** — colour-plus-glyph, with no textual equivalent documented. The glossary teaches the visual and offers no alternative.
- **`See all...` used eleven times** on the help home, several resolving to duplicate destinations.
- **Web/App tabs collapse into consecutive undifferentiated procedures** in non-JS rendering — the reader gets two numbered lists with no indication which platform each belongs to (see T11).
- **No `Skip to content` on `medium.com`** itself; `Sitemap` is the first DOM link.
- **`Our story` nav link points to `/about?autoplay=1`** — a navigation link that triggers autoplaying media.
- **The `Listen` control on the Medium Rules page** routes to a membership upsell, so the audio affordance on a policy document is a paywall.
- `Start reading` renders twice (responsive variants) — may announce twice depending on CSS handling. Flagged as suspected, not confirmed.

**Negative findings, recorded honestly**

- **Broken conditional in the published glossary**: "If the entire story will show up in the email if it has not been paywalled." — duplicated `if`, no main clause
- `until the the end of the billing cycle` — doubled article, in the cancellation reassurance
- `send it to to subscribers` — doubled preposition, in the glossary
- Double space in the hero: `Human  stories & ideas`
- **Three different dates on Medium Rules**: `May 26, 2021` (dateline), `2024-09-24` (meta), `*Updated June 2023*` (footer)
- **Eleven help categories resolve to seven URLs**; `Getting started` and `Managing your account` share one, and three Writing-adjacent categories share another
- **Four domains** serving help/policy content, plus two URL schemes for the same documents
- Two links on the help home point at the raw vendor domain `medium.zendesk.com`
- `Network only` referenced as a section name that does not exist under that name
- Four capitalisation treatments of the three-term distribution taxonomy
- `Paywall your story` / `Members only` / `eligible to earn` — three names for one setting, two of them in one article
- `member-only story` / `members-only stories` / `Members only` — three forms of the paywall label
- `Friend of Medium` / `Friend members` / `Friends of Medium` — three forms of the tier name in one article
- `Get started` (homepage) vs `Sign up` (membership page) vs `Upgrade` (help) for one funnel entry
- `Post` — no, that's Goodreads; Medium's equivalent is `Publish` used as a **save** verb on an already-published story
- `What are your thoughts?` (web) vs `Write a response` (app) for one field
- `More from Medium` (web) vs `Recommended for you` (app), both printed, neither reconciled
- **Nineteen live coined terms absent from the published glossary**, including every term governing money and reach
- Friend Link earnings described more generously on the reader page than the writer page
- Policy documents published as Medium Stories, with clap buttons, an upselling `Listen` control, and a publication "Last published" date that contradicts the article's own
- "We may enforce, or not enforce, these policies at our sole discretion" placed immediately after the Santa Clara Principles endorsement
- No accessibility statement, on a platform that makes alt text a payment-affecting criterion

---

## Transferable patterns

1. **State the penalising rule, then negate the two fears it creates.** "Stories with a below-average read ratio are adjusted down… This is **not** about scrolling to the end of the story, and does **not** penalize longer stories with longer estimated reading times." Two pre-emptive negations, immediately adjacent to the rule. Transfers to any scoring, risk, or eligibility model where the user will assume the worst mechanism. This is the single best pattern in the file.

2. **Publish your criteria and disclaim them as a checklist in the same breath.** "these elements should not be interpreted as a checklist of components that guarantee Boost." Gives direction without creating a gaming target, and pre-empts the "I met every criterion" complaint before it arrives.

3. **Name and guarantee the floor before describing the tiers.** `Network Distribution` is "the baseline category for any story… which does not violate Medium rules". A demoted writer still knows what they keep. Applies to any tiering, ranking, or scoring system — state the worst case first and make it survivable.

4. **Bound your own algorithm's relevance.** "These distribution categories are only meaningful when a reader uses the Medium app, website, or Digest emails… Readers can find all stories on Medium, regardless of the category above, via direct links, search engines, social media." Telling users where your ranking does *not* apply reduces its perceived stakes and is almost always true.

5. **Write the introductory price as original / promo-with-duration / reversion, on one line.** `$50` → `$35 for 1 year` → `then $50/year`. No asterisk, no footnote, same type size. Directly applicable to any promotional pricing, and it is what most fee and rate disclosure regimes are trying to force.

6. **Lead the pricing FAQ with cancellation, and presuppose ease in the question.** `How easy is it to cancel my membership?` The question shape does the reassurance before the answer arrives.

7. **Explain the multiplier by reference to the base formula.** "This revenue share is calculated in the same way as our standard Medium membership… The difference is that it's multiplied by a factor of four." One sentence makes a premium tier auditable against the standard one.

8. **Document the superseded scheme with its dates and its mechanism.** "This is different from the previous referral program (2021–2025), which paid a recurring share… Conversion earnings are a one-time amount." How to write a downgrade: name the old thing, date it, state the change in kind.

9. **Disclose a change against your own interest when it is favourable to users.** "Non-boosted stories now receive a larger share of Partner Program earnings than before." Free credibility, and it makes the rest of the formula easier to believe.

10. **Disclaim responsibility honestly, route to who can fix it, and ship a workaround anyway.** The recurring-membership answer does all three: "it is beyond our control" / "contact your bank" / "you can buy a gift membership and send it to your own email address." Most products stop after the first two.

11. **Name the cheapest compliant implementation.** "per Federal Trade Commission law, you must disclose the inclusion of these links… This can be a simple sentence in the footer." Regulator, obligation, minimum viable compliance. Removes the excuse and the anxiety together.

12. **Separate publication-sent, writer-sent and platform-sent email as three named terms.** `Newsletter` / `Email subscription` / `Digest`. Prevents the entire class of "why am I receiving this" confusion that a single "emails" concept guarantees.

13. **Tie accessibility practice to a reward the user cares about.** Alt text is a Boost criterion, Boost affects distribution, distribution affects earnings. Incentive-aligned accessibility beats exhortation. (Condition: Medium then fails to publish an accessibility statement of its own, which is the cautionary half of the lesson.)

14. **Explain a curation decision in the voice of a critic, not a rubric.** The Boost examples are short craft notes ("The writer is vulnerable, showing honesty, humility, and humor in relaying her part in that experience"). More instructive to a writer than any scoring guide, and only possible because humans make the decision.

## Caveats & gaps

- **The signed-out homepage carries four content strings.** T2's analysis leans almost entirely on `/membership` and on help articles.
- **The two-sided model is well covered on both sides, but the seam is under-tested.** The Friend Link inconsistency was found only by reading the reader article and the writer article together. Other reader/writer contradictions may exist between articles not both harvested.
- **The story editor is entirely unharvested.** `Using the story editor`, `Using images`, `Using topics`, `Create, edit, or delete a story`, `Writing and publishing your first story` — the core writer surface. Draft states, autosave copy, formatting-toolbar labels, publish-dialog fields, and validation are all unknown.
- **Stats surfaces unharvested**: `Stats`, `Story's detailed stats page`, `Audience stats`, `Partner Program earnings dashboard`. These would carry the metric vocabulary that `Presentations` hints at.
- **Publication management unharvested**: `Getting started with a Medium publication`, `How to submit a story to a publication`, `How to manage story submissions`, `Publication settings and layout`. Submission/review states are named but undefined.
- **Response and comment microcopy unharvested** beyond the two placeholder strings. `Manage responses`, `Report posts & users`, `Block a user` not opened.
- **`About Friend Links` and `Email subscriptions` articles not opened** — both are cited repeatedly and would tighten T9 and T10.
- **`Medium's Terms of Service`, `Privacy Policy`, `Partner Program Terms`, `Medium Partner Program eligibility` (with the supported-country list), and `How to complete Medium Partner Program enrollment` not harvested.** The eligibility article in particular would name the supported countries — a material disclosure.
- **Content policies unharvested**: `COVID-19 Content Policy`, `Controversial, Suspect, and Extreme Content`, `Best practices for journalism on Medium`, `Artificial Intelligence (AI) content policy`, `Cryptocurrencies on Medium`, `Newsworthiness considerations`, `About the No Duplicate Content rule`, `Username Policy`.
- **No accessibility statement was found.** Absence is the finding; a deeper search (app-store listings, VPAT registries) was out of scope.
- **The Web/App tab collapse means some documented strings may be attributed to the wrong platform.** Where the tab boundary was ambiguous, both labels have been recorded and the ambiguity flagged rather than resolved.
- **No individual writer's story, response, or publication content was read or quoted**, per brief. The Boost examples in the Distribution Guidelines are Medium's own curatorial notes and are quoted as such; the story titles they reference are not reproduced beyond the two `Member-only story` card headlines that render as Medium's own marketing on `/membership`.
- **Prices and the 30% welcome offer are a snapshot** at harvest and are promotional.

## Sources

1. https://medium.com/
2. https://medium.com/membership
3. https://help.medium.com/hc/en-us
4. https://help.medium.com/hc/en-us/articles/360006341833 (Medium Glossary)
5. https://help.medium.com/hc/en-us/articles/115004545567 (Become a Medium Member)
6. https://help.medium.com/hc/en-us/articles/115011694187 (Partner Program enrollment)
7. https://help.medium.com/hc/en-us/articles/115011928308 (Make a story eligible to earn)
8. https://help.medium.com/hc/en-us/articles/360036691193 (Partner Program earnings calculation)
9. https://help.medium.com/hc/en-us/articles/360006362473 (Distribution Guidelines)
10. https://help.medium.com/hc/en-us/articles/360018677974 (What happens to your story when you publish)
11. https://help.medium.com/hc/en-us/articles/214993247 (Create and manage lists)
12. https://policy.medium.com/medium-rules-30e5502c4eb4 (Medium Rules)
