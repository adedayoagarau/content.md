# 144. YouTube

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | User-generated video platform (two-sided: viewer + creator), with subscription tier, live, Shorts, podcasts, games and commerce |
| Primary URL | https://www.youtube.com/ |
| Corpus rank | 144 |
| Benchmark strength (source list) | Viewer and creator states |
| Locale / market observed | en-US (`?hl=en`; US tax copy, USD thresholds). Help centre offers **~80 language variants** per article |
| Platform observed | Web (help centre, shared Google Help Center chassis), YouTube Premium marketing page (client-rendered) |
| Auth state | Unauthenticated public surfaces only. No sign-in, no Studio access. |
| Regulatory posture | Not a regulated financial/health product, but the **most compliance-dense content set in this domain**: DMCA (counter notification, retraction, "Filing a counter notification begins a legal process"), US tax withholding on non-resident creator earnings (IRS W-8/W-9 via AdSense), COPPA (`Made for Kids` designation), EU/UK sanctions posture (Russia ad pause), UN-adjacent policy framing in Community Guidelines, per-country tax articles (Tanzania, Kenya), `Do Not Sell` state-privacy via Google |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Full for T9 (enforcement) and creator-side monetization. **Viewer-side commercial copy is blocked** — `youtube.com/premium` renders client-side and returned no body copy, so plan names, pricing, and the ad-supported-tier framing are `[absent]`. Community Guidelines policy-family articles (12 sub-policies) captured as titles only. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help centre home | https://support.google.com/youtube/?hl=en | 8 top-level categories, 45 sub-topics |
| Community Guidelines | https://support.google.com/youtube/answer/9288567 | 5 policy families + EDSA exception, 12 sub-policy links |
| **CG strike basics** | https://support.google.com/youtube/answer/2802032 | **The central enforcement artefact.** Warning → 1st/2nd/3rd strike ladder |
| Channel/account terminations | https://support.google.com/youtube/answer/2802168 | Termination reasons, appeal flow, circumvention prohibition |
| Appeal a CG strike or removal | https://support.google.com/youtube/answer/185111 | Appeal windows, the three outcomes |
| Understand copyright strikes | https://support.google.com/youtube/answer/2814000 | The *second*, parallel strike system |
| Learn about copyright claims | https://support.google.com/youtube/answer/6013276 | Content ID claim policies and remedies |
| YPP overview & eligibility | https://support.google.com/youtube/answer/72851 | Thresholds, review, re-apply windows |
| How to earn money on YouTube | https://support.google.com/youtube/answer/72857 | Six monetization features + per-feature eligibility matrix |
| Partner earnings overview | https://support.google.com/youtube/answer/72902 | Revenue-share percentages, payment timeline |
| Supervised accounts for teens | https://support.google.com/youtube/topic/15279671 | Teen-supervision article titles + Family Center |
| YouTube Premium | https://www.youtube.com/premium | **Client-rendered — body blocked.** Footer nav only. |

---

## T1 Navigation & IA labels

**The product's global nav is client-rendered and was not retrievable** `[observed]`. `youtube.com/premium` returned only the **left-rail utility footer**, which is itself the stable IA of youtube.com:

`About` · `Press` · `Copyright` · `Contact us` · `Creators` · `Advertise` · `Developers` · `Terms` · `Privacy` · `Policy & Safety` · `How YouTube works` · `Test new features`

Three of these are notable. **`Copyright` is a top-level nav item** — promoted to the same rail as `About` and `Press`, which no other product in this domain does. **`Policy & Safety`** is a single combined item rather than separate legal and safety links. And **`Test new features`** is a standing opt-in surface in the primary footer — feature experimentation as navigation.

`Creators` and `Advertise` sit between consumer links, so the footer serves three audiences (viewer, creator, advertiser) in one undifferentiated row. Compare Spotify (141), which groups its seven non-consumer audiences under a `Communities` heading.

**Help centre — 8 categories, 45 sub-topics, and the two-audience split is visible in the IA** `[observed]`

| Category (verbatim) | Sub-topics |
|---|---|
| `Fix a problem` | `Troubleshoot problems playing videos` · `Troubleshoot account issues` · `Fix upload problems` · `Get help with the YouTube Partner Program` · `Learn about recent updates on YouTube` · `Get help with YouTube` |
| `Watch videos` | `Find videos to watch` · `Change video settings` · `Watch videos on different devices` · `Comment, subscribe, & connect with creators` · `Save or share videos & playlists` · `Troubleshoot problems playing videos` · `Purchase & manage movies, TV shows & products on YouTube` |
| `Manage your account & settings` | `Sign up and manage your account` · `Manage account settings` · `Manage privacy settings` · `Manage ad settings` · `Manage accessibility settings` · `Troubleshoot account issues` · `YouTube updates` |
| `Supervised experiences on YouTube` | `Supervised accounts for kids` · `Supervised accounts for teens` |
| `YouTube Premium` | `Join YouTube Premium` · `YouTube Premium benefits` · `Manage your Premium membership` · `Manage Premium billing & payments` · `Fix YouTube Premium issues` |
| `Create & grow your channel` | 13 sub-topics incl. `Upload videos`, `Create Shorts`, `Edit videos with YouTube Create`, `Live stream on YouTube`, `Become a podcast creator on YouTube`, `Get started with Player for Education` |
| `Monetize your content` | `YouTube Partner Program` · `Make money on YouTube` · `Get paid` · `Understand ads and related policies` · `Get help with the YouTube Partner Program` · `YouTube for Content Managers` |
| `Policy, safety, & copyright` | `YouTube's Community Guidelines` · `YouTube policies` · `Reporting and enforcement` · `Privacy and safety center` · `Copyright and rights management` |

**The IA is the clearest statement of YouTube's two-audience problem.** Four categories are viewer-side (`Watch videos`, `Manage your account & settings`, `Supervised experiences`, `YouTube Premium`), two are creator-side (`Create & grow your channel`, `Monetize your content`), and two are shared (`Fix a problem`, `Policy, safety, & copyright`). The shared ones are where the friction lives: `Fix a problem` contains both `Troubleshoot problems playing videos` (viewer) and `Get help with the YouTube Partner Program` (creator) as sibling items, and `Get help with the YouTube Partner Program` appears **twice in the tree** (under `Fix a problem` and under `Monetize your content`) — deliberate duplication, because creators arrive from both mental models.

**`Supervised experiences on YouTube` as a top-level category** — the only product in this domain set to promote child/teen supervision to the root of the help IA, level with `Watch videos`. It splits by age band (`kids` / `teens`), not by control type, which is the right axis (see T10).

**Article-level nav — the Google Help chassis** `[observed]`. Every article carries:
- a category strip of all 8 categories (persistent)
- `Help Center` / `Community` / `Creator Tips` as three peer tabs — **`Creator Tips` is a third support channel alongside docs and forum**, unusual and creator-specific
- a bottom `Was this helpful? / How can we improve it? / Yes / No / Submit` block
- a `Need more help?` / `Try these next steps:` block whose **only option is `Post to the help community`** — described as `Get answers from community members`
- a **sequential topic pager** on many articles: `1 of 8`, `2 of 8` … with the current item rendered as `#`, so the article set is walkable as an ordered curriculum

**The pager reveals the enforcement curriculum** `[observed]` — two ordered topic sets:

`Learn about enforcements` (8 articles, in order): `How YouTube reviews content` → `Community Guidelines strike basics on YouTube` → `Age-restricted content` → `Your YouTube content & Restricted Mode` → `Watch age-restricted videos` → `Videos locked as private` → `Channel or account terminations` → `Strikes FAQ`

`Manage enforcements` (5 articles): `Respond to enforcements` → `Appeal a Community Guidelines strike or video removal` → `Appeal the age restriction on your video` → `Age-restrict your own video on YouTube` → `Troubleshoot video removals`

The split is the content-design decision worth stealing: **`Learn about` (understand what happened) and `Manage` (do something about it) are separate ordered sets**, and `Learn` is ordered from *how review works* → *what a strike is* → *softer outcomes* → *termination* → *FAQ*. The user is walked from process to worst case. `Manage` opens with `Respond to enforcements` — a verb the user can act on immediately.

`Age-restrict your own video on YouTube` sitting inside `Manage enforcements` is a nice touch: **self-imposed restriction filed as an enforcement-management action**, not as an upload setting.

**Missing from the IA** `[observed]`: there is no top-level `Contact us` anywhere in the help centre. `Need more help?` resolves only to the community forum. Human support is named (`Creator Support` teams) but only inside YPP articles, as a YPP *benefit* — "The YouTube Partner Program (YPP) gives creators… access to our Creator Support teams." **Human support is a monetization perk.** That is the single most consequential IA fact in this file.

## T2 Value proposition & headline patterns

**Viewer-side value proposition is `[absent]`** — `youtube.com/premium` is client-rendered; the body returned only `YouTube Premium` as bare text. No hero, no plan copy, no pricing.

**Creator-side value proposition is fully observable, and it is framed as access, not money** `[observed]`:

> "The YouTube Partner Program (YPP) gives creators **greater access to YouTube resources and monetization features**, and access to our **Creator Support teams**. It also allows revenue sharing from ads being served on your content."

Money is the third clause. `greater access to YouTube resources` is first, and `Creator Support teams` — human help — is given equal billing with the revenue share. For a programme whose entire purpose is payment, leading with access and support is a deliberate reframe.

**Help-centre headline** `[observed]`:

> `How can we help you?`
> `Describe your issue to find information that might help you.`

Note the hedge in the instruction: `information that **might** help you`. The search prompt pre-lowers expectations in its own subhead. Compare Netflix's `If Netflix isn't working, enter the error code/message or describe the problem in the search bar.` — same natural-language invitation, but Netflix promises the mechanism and YouTube hedges the outcome.

`Browse help topics` as the category heading — `Browse` explicitly offered as the alternative to search.

**Headline patterns in enforcement copy — the ladder headings** `[observed]`. The strike article's section headings are the enforcement vocabulary itself, rendered as a progression:

> `Warning` → `Optional policy trainings` → `First Strike` → `Second Strike` → `Third Strike`

Title Case on the strike headings, sentence case on `Optional policy trainings`. Capitalising `First Strike` / `Second Strike` / `Third Strike` turns them into **named states** rather than counts — which is correct, because each carries a different, specified penalty.

**The most important framing sentence in the file** `[observed]`, opening the `Warning` section:

> "**We understand mistakes happen and you don't mean to violate our policies** — that's why the first violation is typically only a warning."

Presumption of good faith, stated explicitly, in the company's voice, before any penalty is described. Then the exception immediately: "However, if your content violates the same policy within that 90 day window, the warning may not expire and your channel may be given a strike." Good faith, then the condition on which it is withdrawn. Claim-then-bound, applied to enforcement rather than to pricing.

**Community Guidelines opening** `[observed]`:

> "When you use YouTube, you join a community of people from all over the world. The guidelines below help keep YouTube fun and enjoyable for everyone."

Two sentences, then immediately a reporting CTA. And the emphasis line at the foot, italicised and asterisked in the source:

> "***Please take these rules seriously**. If a YouTube creator's on- and/or off-platform behavior harms our users, community, employees or ecosystem, we may respond based on a number of factors including, but not limited to, the egregiousness of their actions and whether a pattern of harmful behavior exists. Our response will range from suspending a creator's privileges to account termination.*"

`Please take these rules seriously` is a direct imperative plea — unusual register for a policy document — followed by the **off-platform-conduct clause**, which names four protected parties (`our users, community, employees or ecosystem`) including YouTube's own employees. And the response is expressed as a **range** ("will range from suspending a creator's privileges to account termination") rather than a schedule, which preserves discretion while disclosing the bounds.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Skip to main content` | First in DOM, every help page | Accessibility |
| `Sign in` | Help header | |
| `Browse help topics` | Help home | `Browse` offered against search |
| `Was this helpful?` / `How can we improve it?` / `Yes` / `No` / `Submit` | Every article foot | Two-stage feedback: binary, then free text |
| `Post to the help community` — `Get answers from community members` | `Need more help?`, every article | **The only escalation route.** Label + explanatory sub-line |
| `Submit feedback` / `Send feedback on...` / `This help content & information` / `General Help Center experience` | Header utility | Feedback scoped to two targets |
| `Get notified` | YPP eligibility — "select **Get notified** in the Earn area of YouTube Studio" | Subscribe-to-eligibility |
| `Apply Now` | Studio › Earn | Title Case |
| `Start` → `Accept` | YPP terms acceptance | `Start` twice, for two separate steps |
| `In Progress` | Post-application status label | State rendered as a UI string |
| `View agreement` | Studio › Settings › Agreements | |
| `Review issues` → `Appeal` | Studio app, video restriction | |
| `Review content` → `Take action` → `Appeal` | YouTube app, `You` tab | Three taps to appeal |
| `Share your thoughts with us (optional)` | Appeal free-text field | **Field label carries `(optional)` inline** |
| `APPEAL` | Studio › Channel violations card | **All caps** — inconsistent with `Appeal` elsewhere |
| `Begin Review` → `Start Appeal` → `Next` → `Submit` | Termination appeal (Studio) | Four labelled steps |
| `See details` | Copyright claim / strike detail | Used at **two nesting levels** — "Click `See details`… Click `See details` to see the claimant's name" |
| `Erase song` / `Trim out segment` / `Replace song` | Content ID remedies | Three named editor actions, verb-first |
| `Remove app` / `Remove` | (Netflix-style device steps absent here) | — |
| `Copyright School` | Strike remedy, a named destination | A course as a CTA |
| `Get Help` | (TV client, referenced in Netflix; n/a here) | — |
| `Contact Us` | **Absent from the help centre** | See T1 |

**Observations.** The appeal path has **three different entry labels on three surfaces** — `Review issues` (Studio app), `Review content` → `Take action` (YouTube app), and `APPEAL` on a `Channel violations` card (Studio web). Same action, three vocabularies, and one of them in caps. For the highest-stakes action a creator can take, that is a real inconsistency.

`Share your thoughts with us (optional)` as the label for the **appeal justification field** is the weakest string in the enforcement set. A creator appealing a strike is not sharing thoughts; they are submitting evidence. Compare the termination flow, which says "explain your **reason for appeal**" — the correct framing, used in a different flow.

`Get notified` is a small, good pattern: rather than making creators poll their subscriber count against a threshold, YouTube offers an **eligibility-reached notification opt-in**. Transferable to any threshold-gated programme.

## T4 Onboarding & getting-started

**Two distinct onboarding sequences, both creator-side.**

### YPP application — a six-step numbered flow with the review time disclosed

`[observed]` Prerequisites first, as a six-item numbered list under `What you need to join`:

1. `Follow the YouTube channel monetization policies.` — glossed inline: "These are a collection of policies and guidelines that allow you to monetize on YouTube, and compliance with them is required when you accept a partner agreement with YouTube."
2. `Live in a country/region where the YouTube Partner Program is available.`
3. `Have no active Community Guidelines strikes on your channel.`
4. `Make sure 2-Step Verification is turned on for your Google Account.`
5. `Have advanced features access on YouTube.`
6. `Have one active AdSense for YouTube account linked to your channel` — with a parenthetical warning: "(only create a new AdSense for YouTube account in YouTube Studio—learn more)".

Then eligibility, as a two-branch OR under `How you can become eligible`:

> 1. `Get 1,000 subscribers with 4,000 qualified watch hours in the last 12 months`, **or**
> 2. `Get 1,000 subscribers with 10 million qualified Shorts views in the last 90 days.`

And immediately the exclusion that trips everyone: "Keep in mind that any qualified watch hours from Shorts views in the Shorts Feed **won't count towards** the 4,000 qualified public watch hours threshold." The two paths do not pool.

Then the actual steps, `Where to apply`, six numbered UI actions. Then `How we review your application`, which is the best-written section:

> "Our automated systems **and** human reviewers will review your channel **as a whole**…"
> "We'll get back to you with a decision once your channel is reviewed (**typically in about 1 month**)."
> "Keep in mind delays are possible due to higher-than-usual application volumes, system issues, or resource limitations. All YPP applications are serviced **in the order they're received by us**. Sometimes channels require multiple reviews, **especially when several reviewers disagree on your channel's suitability for YPP**."

Four disclosures in four sentences: the review mechanism (automated + human), the unit of review (the channel as a whole, not the video), the expected duration with a hedge, the queue discipline, and — remarkably — **that reviewers sometimes disagree with each other and that this causes delay.** Admitting internal disagreement as a documented cause of latency is exceptional transparency and is the single most quotable line in this file.

Then the rejection path, with three distinct waiting periods:

> "If your first application wasn't successful, don't worry - you can **appeal the decision within 21 days** or keep uploading original content and you'll be able to **re-apply after a 30-day period**. If this isn't your first application to be rejected, or you've previously re-applied, you can try again **after a 90-day period**."

Two remedies (appeal or re-apply), three clocks (21 / 30 / 90 days), and an escalating penalty for repeat rejection. Then the diagnosis, stated as a probability: "Our reviewers **likely** found that a significant portion of your channel doesn't currently follow our policies and guidelines."

### Policy trainings — remediation as onboarding

`[observed]` The `Optional policy trainings` mechanism is an **education-for-clemency trade**, and the copy specifies it precisely:

> "Policy trainings are **short in-product educational experiences based on the specific Community Guidelines policy you've violated.**"
> "If you complete an optional policy training, your warning will **expire after 90 days**. The 90-day period **starts from when the training is completed, not when the warning is issued.**"
> "If you violate a different policy after completing the training, you will get another warning."
> "**Note:** Not all Community Guidelines warnings are eligible for policy trainings."
> "We may prevent **repeat offenders** from taking trainings in the future."

The clock-start clarification (`from when the training is completed, not when the warning is issued`) is the detail that prevents the most likely misreading, and it is stated in the same sentence as the rule. And the eligibility caveat and the repeat-offender carve-out are both disclosed rather than discovered.

The parallel copyright mechanism is `Copyright School`, and its scope is disclosed with almost comic brevity in an FAQ:

> **`What is Copyright School?`**
> "Copyright School consists of **4 questions** about how copyright works on YouTube."

A remediation programme that gates a 90-day strike expiry, disclosed as four questions. Whether that is reassuring or alarming depends on the reader, but it is honest, and "you only have to complete Copyright School once" is stated too.

### Getting-started, viewer-side

`[documented]` only via IA labels: `Sign up and manage your account`, `Find videos to watch`, `Join YouTube Premium`. No sequence copy retrievable.

## T5 Form & field labels

No pre-auth forms exist. All field labels are `[documented]` from help articles:

| Label | Context |
|---|---|
| `Share your thoughts with us (optional)` | CG appeal free-text field |
| `Here's what we found` | Appeal flow — the **heading above the violation summary** the creator must read before appealing |
| `Channel violations` | Studio dashboard card |
| `Active copyright strikes` | Studio dashboard section |
| `Restrictions` (column) | Studio › Content table |
| `Visibility` (column) | Studio › Content table |
| `Claims` / `Copyright—Takedown` | Two values in the `Restrictions` column |
| `Removed` | A value in the `Visibility` column |
| `Claimant` | Field showing who claimed a video |
| `Infringing audio track` | Field shown when a strike targets a specific audio track |
| `Content used` | Section in claim details |
| `Claims details` | Page name |
| `Made for Kids` | Video- and channel-level designation |
| `Earn` | Studio left-menu item and the area name |
| `Agreements` | Studio › Settings |
| `In Progress` | Application status value |
| `Get Reviewed` | A named application step |
| `Base terms` | The first YPP contract object |

**`Here's what we found` is the notable one.** It is the heading YouTube puts above its own finding, in the appeal flow, before the creator can contest it. First person plural, past tense, no hedge, no verdict language. It frames enforcement as a *finding* rather than a *judgment* — which leaves room for the appeal without conceding the point.

**Column semantics worth noting**: `Restrictions` and `Visibility` are two separate columns, so a video can be `Removed` (visibility) for a `Copyright—Takedown` (restriction). Separating *what happened to the video* from *why* into two orthogonal columns is good information design, and the em-dash compound `Copyright—Takedown` (glossed in the same line as `also known as a "takedown"`) handles the legal-vs-colloquial naming in one cell.

## T6 Status & state language

YouTube runs **two parallel enforcement state machines plus a monetization state machine**, and keeps their vocabularies separate. This is the richest state taxonomy in the domain.

### Community Guidelines state machine

| State | Duration / expiry | Consequence |
|---|---|---|
| clean | — | — |
| `Warning` | "typically only a warning" for a first violation; expires after 90 days **only if** an optional policy training is completed; otherwise persists | No upload restriction |
| `First Strike` | "remains on your channel for 90 days"; full privileges auto-restored after **1 week** | 1-week posting freeze (8 named prohibitions) |
| `Second Strike` | 90 days from issue | **2-week** posting freeze |
| `Third Strike` | 90 days from issue | "may result in your channel being **permanently removed** from YouTube" |
| termination (severe) | — | "a single case of severe abuse will result in channel termination **without warning**" |

**The First Strike penalty is enumerated, not summarised** `[observed]` — eight specific prohibitions:

> `Upload videos or live streams` · `Start a scheduled live stream` · `Schedule a video to become public` · `Create a Premiere` · `Add a trailer to an upcoming Premiere or live stream` · `Create custom thumbnails or posts` · `Create, edit, or add collaborators to playlists` · `Add or remove playlists from the watch page using the "Save" button`

Eight items, including edge cases (`add collaborators to playlists`, the `"Save"` button) that a summary would drop. A creator can check whether their specific workflow is blocked. **This is the model for any capability-suspension notice**: enumerate, don't summarise.

Then the collateral consequence and its resolution: "Your scheduled public content is set to **"private"** for the penalty period duration. **You have to reschedule it when the freeze period ends.**" The state change to existing content is disclosed *and* the manual remediation burden is named — most products would leave the creator to discover that their scheduled premiere silently went private.

And the clock-start, stated as a Note: "**Note:** Penalty starts from the date of **acknowledgement**." So the 1-week freeze begins when the creator acknowledges, not when the strike issues — which means an unread strike does not start its own clock. A materially important mechanic disclosed in eight words.

**Two secondary consequences named** `[observed]`: "A strike may also result in losing access to **advanced features**." And: "If your **Official Artist Channel** gets a Community Guidelines strike, the channel will be **suspended and become a standard channel**." A channel *type* downgrade as an enforcement outcome — an entity-level state change, not just a capability one.

**Deletion does not clear state** `[observed]`, stated three times across three articles: "**Note:** Deleting your content doesn't remove a strike. We may also issue a Community Guidelines strike on **deleted content**." And in the appeal article: "If you delete your video, the strike will remain on your channel **and you won't be able to appeal again**." So deletion is not only ineffective but forfeits the remedy. The strongest anti-misconception copy in the file.

### Copyright state machine — separate, and the article says so first

`[observed]` Both copyright articles **open with a disambiguation sentence**:

> "This article is about Community Guidelines strikes. To find info about copyright strikes, which are different from Community Guidelines strikes, go to our copyright strike basics." (CG article)
> "Copyright strikes are different from Community Guideline strikes and copyright claims." (copyright strike article)
> "Copyright claims are different from copyright removal requests and **copyright strikes**." (claims article)

Three articles, each opening by naming what it is *not*. And a **three-way distinction** the copy maintains rigorously throughout:

| Concept | What triggers it | Effect on channel |
|---|---|---|
| `copyright claim` (Content ID) | Automated match against Content ID | "affect videos, but usually **don't impact your channel or account**" |
| `copyright removal request` / `takedown` | A legal request from a rights holder | Content removed |
| `copyright strike` | A **valid** removal request | Channel-level penalty |

The bridge between them is stated as a **causal chain with a warning**: "if you **dispute a copyright claim without a valid reason**, the copyright owner has the option to submit a copyright removal request… If the copyright removal request appears valid, your content would be removed from YouTube and your channel would get a copyright strike." So disputing is disclosed as a risk-bearing action, twice, in two articles.

Copyright strike states:

| State | Copy |
|---|---|
| `1 copyright strike` | "We remove the content from YouTube. You can complete Copyright School to have the strike **expire in 90 days**, otherwise it will **remain active** on your channel." |
| `2 copyright strikes` | "Same steps as above." |
| `3 copyright strikes` | "Your account, along with any associated channels, is **subject to termination**… You **can't create new YouTube channels**." |

Note `subject to termination` rather than "will be terminated" — the discretion hedge, used consistently. And the state is `active` / expired, not counted-and-forgotten: an uncompleted Copyright School means the strike never expires.

**Per-video constraint** `[observed]`: "Videos can only have **1 copyright strike at a time**."

**Live-stream-specific state** `[observed]`: "if your active live stream is removed for copyright, your channel will get a copyright strike and **your live streaming access will be restricted for 7 days**. If your channel gets another copyright strike, the live stream restriction will last **14 days**." A parallel 7/14-day ladder specific to live, distinct from the CG 1-week/2-week ladder.

**Linked-channel contagion** `[observed]`, stated symmetrically: "If a channel linked to yours has 3 active copyright strikes, **your channel is also subject to termination**. Similarly, if your channel has 3 active copyright strikes, other channels linked to yours are subject to termination." The bidirectionality is spelled out rather than left to inference.

**The 7-day pre-strike window** `[observed]` — a state most creators never learn exists: "If the copyright removal request was **scheduled**, it means you have **7 days to delete your content and avoid the copyright strike.** To see if you have this option, check the copyright strike email sent from `no-reply@youtube.com`. **In all other cases, deleting a video doesn't resolve a copyright strike.**" A conditional grace state, with the check-instruction and the general rule in the same paragraph.

### Content ID claim policies — three named states

`[observed]` The claimant chooses one of three, each rendered in bold in the source:

- **`Block`** a video from being viewed
- **`Monetize`** the video by running ads on it, sometimes sharing revenue with the uploader
- **`Track`** the video's viewership statistics

And the geography caveat: "Any of these actions can be **geography-specific**. For example, a video with a copyright claim can be monetized in one country/region and blocked or tracked in a different country/region." So a video's state is a *per-territory* value, not a single value. Plus: "if the content has different copyright claimants in different countries or regions, you can get **multiple claims on the same video or segment**."

**Length-dependent behaviour** `[observed]`, with a dated change:

- "**Videos longer than three minutes in length:** When a claimed video is tracked or monetized, it stays viewable… '**Monetize**' is the most common policy applied to music claims."
- "**Shorts 1-3 minutes in length:** Claimed videos will be **blocked** if there is an active claim applied, **regardless of policy**."
- "Starting on **September 24, 2026**, new Shorts longer than one minute with an active copyright claim will **no longer be automatically blocked** and may remain playable."

A **forward-dated policy change published three days after the harvest date** — the article is simultaneously describing the current rule and the rule that supersedes it. Dual-state documentation, handled by labelling both with dates.

### Monetization state machine

`[observed]`

| State | Copy |
|---|---|
| ineligible | "If you don't meet the requirements yet, keep working to make original content and build your audience." |
| eligible, not applied | `Get notified` opt-in |
| `In Progress` / `Get Reviewed` | "you'll see **In Progress** in the Get Reviewed step, which means we have your application!" |
| accepted | "you may get access to these monetization features" |
| rejected | 21-day appeal / 30-day or 90-day re-apply |
| `suspended` / `paused` | Two distinct named states, both blocking payment |
| inactive → demonetized | "we may turn off monetization on channels that haven't uploaded a video or posted to the Posts tab for **6 months or more**" |
| terminated | "Participants of the YouTube Partner Program are **no longer entitled to earn any revenue** if their channel is terminated. We may also **withhold unpaid earnings** and refund advertisers or viewers." |

**The inactivity state is disclosed with its rationale** `[observed]`: "As the YouTube Partner Program continues to grow, it's important to maintain a healthy, active ecosystem of channels. To focus our support for creators who are active and engaged with the community, we may turn off monetization on channels that haven't uploaded… for 6 months or more." A use-it-or-lose-it rule, with the reason given, in a section headed **`Stay active to keep making money`** — an imperative heading that states the consequence in the heading.

**And a decoupling most creators get wrong, stated flatly** `[observed]`: "Channels will lose monetization when they violate any of the YouTube channel monetization policies. **This loss of monetization will happen regardless of their watch hours and subscriber count.**" Metrics do not protect you. One sentence.

**The ads-without-revenue state** `[observed]` — an FAQ that answers an awkward question honestly:

> **`I'm no longer in YPP (or I was never in the program) and I'm seeing ads on my videos. Am I earning revenue from those ads?`**
> "According to our Terms of Service, **YouTube retains the right to serve ads on all content on the platform.** If you do not currently meet the higher eligibility criteria of YPP you may still see ads being served on your content. In this case, **you are not yet eligible to receive a share of the revenue.**"

The platform monetizes unmonetized creators' content and says so, in a question written in the creator's own aggrieved first person. `not yet eligible` is the softening; the substance is unhedged.

**`qualified watch hours` / `qualified Shorts views` — a defined metric with an explicit exclusion list** `[observed]`:

Counts: public long-form videos (watch hours); public Shorts appearing in the Shorts Feed (views).
Does **not** count: `Private videos` · `Unlisted videos` · `Deleted videos` · `Ad campaigns` · `YouTube Shorts` (for the watch-hours path) · `Livestreams that are unlisted, deleted, or not converted to VOD` · `Image Posts appearing in the Shorts Feed`.

Defining a threshold metric by **enumerating what does not count** is the right way round — creators optimise against thresholds, so the exclusions are the operative content. `Image Posts appearing in the Shorts Feed` is the kind of specific exclusion that only exists because creators found the loophole.

**Threshold-drop reassurance** `[observed]`: "it doesn't matter if your subscriber or watch hour counts **drop below the threshold while waiting for review**." Followed by the counter-caveat: "Changes to your video privacy settings or deletion of video **might impact the status of your application**." Reassurance, then the one thing that does break it.

## T7 Error, failure & recovery

YouTube publishes **no error-code taxonomy** on the surfaces reached, and no error strings were observable. `[absent]` for coded errors. Compare Netflix (142), which is the opposite pole.

What exists instead is a **failure-diagnosis routing layer** `[documented]`:

- `Fix a problem` as a top-level category, containing `Troubleshoot problems playing videos`, `Troubleshoot account issues`, `Fix upload problems`
- `Troubleshoot video removals` — filed under `Manage enforcements`, i.e. removals are treated as enforcement outcomes rather than errors
- `Videos locked as private` — a named failure state with its own article
- `Fix YouTube Premium issues`
- `Get help with the YouTube Partner Program` (×2 in the tree)

**The important recovery pattern here is disambiguation-as-recovery** `[observed]`. YouTube's most common creator failure is not an error but a *misattribution* — the creator does not know which of four systems acted on them. So the recovery copy is built to route:

> "**Note**: Videos can be taken down for many reasons. If you're having trouble appealing a video removal, **it may have been removed for reasons other than a Community Guidelines violation.** You can troubleshoot video takedowns in this Help Center article."

And in the CG strike article: "**Note:** We may remove content for reasons **other than** Community Guidelines violations. For example, a first-party **privacy complaint** or a **court order**. In these cases, **your channel won't get a strike.**"

Naming two non-strike removal causes (privacy complaint, court order) *and* confirming they carry no strike is precisely the reassurance a panicking creator needs, and it is placed in the second paragraph of the strike article rather than buried.

**Access-recovery when locked out** `[observed]`:
- "You may need to **re-authenticate when logging in**." (termination appeal)
- "**Note:** You may need to complete a **verification step**."
- "If you can't submit an appeal using the steps above, appeal using **this form**." — a fallback route for a broken primary route
- "If you don't have access to your channel, you can find info about your copyright strike **in the email YouTube sent (from `no-reply@youtube.com`)**." — the email as the system of record when the UI is unreachable
- "If your channel is terminated, you **can no longer download your YouTube content**. However, you **do maintain the ability to download your Google data**." Capability loss and residual capability, in two sentences.

**Recovery-step grammar.** Numbered, UI-path imperatives with bolded control labels: `Sign in to YouTube Studio` → `In the left menu, click Earn` → `Select Apply Now to get started`. Terse, no rationale sentences (contrast Netflix, which explains why each step works). YouTube assumes procedural competence; Netflix assumes none.

## T8 Empty states

`[absent]` — no empty state reachable pre-auth.

Two adjacent artefacts `[observed]`:

- **The below-threshold state is filled with a growth curriculum rather than a message.** `What if I don't meet the program threshold?` resolves not to "come back later" but to four routed resources: the `YouTube Help Forum`, the `Creator Tips` hub, `youtube.com/creators`, and two named YouTube channels (`YouTube Help channel`, `YouTube Creators channel`). The zero-state of monetization is treated as an education opportunity.
- **The `Was this helpful?` block is the universal terminal state** of every article, and its failure branch (`No` → `How can we improve it?` → free text → `Submit`) is the only feedback mechanism, since there is no `Contact us`.

## T9 Notifications & system messages — **PRIORITY SECTION**

This is YouTube's strongest content surface and the highest-stakes enforcement-communication artefact in the corpus.

### What a strike notification contains — specified as a four-item contract

`[observed]` The single most transferable block in this file:

> **`What happens when you get a strike`**
> "When you get a strike, you're told via email. You can also choose to have notifications sent to you through your mobile and computer notifications, and in your channel settings. We'll also tell you:"
> - `What content was removed`
> - `Which policies it violated` (for example harassment or violence)
> - `How it affects your channel`
> - `What you can do next`

Four elements: **the object, the rule, the consequence, the remedy.** That is a complete adverse-action notice reduced to four nouns, published as a promise to the user about what the notification will contain. Every enforcement notification in any product should be auditable against this list.

Note the ordering. `What content was removed` first — the creator's most urgent question is *which video*, not *which rule*. And `What you can do next` last, so the notice ends on agency rather than on penalty.

Note also that the delivery channels are **stated and partly opt-in**: email is mandatory, mobile/desktop notifications and the channel-settings alert are "you can also choose". The user is told where the notice will and can appear.

### Channel-level notification, restated per system

`[observed]` The same promise is repeated, with variation, across four articles — and the variation is informative:

| System | Notification copy |
|---|---|
| CG strike | "you'll get an **email**, **notifications on mobile and desktop**, and an **alert in your channel settings** the next time you sign in to YouTube." |
| Copyright strike | "we'll **email you and explain why**. We'll also explain how to resolve the copyright strike. **Official notifications come from `no-reply@youtube.com`.**" |
| Copyright claim | "If your video gets a copyright claim, **YouTube will email you.**" |
| Termination | "If your channel is terminated, you will get **an email explaining the reason** for the termination." / "You may be notified of a channel termination through a termination email, **or be notified upon signing in to YouTube Studio**." |
| Claimed 1–3 min Short | "If a claim is found when you upload a 1–3-minute Short, **you'll get a notification.**" |

**`Official notifications come from no-reply@youtube.com`** is an anti-phishing disclosure placed inside the enforcement article, where a panicked creator is maximally vulnerable to a fake takedown email. Naming the exact sending address in the help article — and then referring back to it twice ("check the copyright strike email sent from `no-reply@youtube.com`") — is excellent practice. (Compare Spotify's `Is this Spotify email legit?`, which solves the same problem with a dedicated article.)

`or be notified upon signing in to YouTube Studio` covers the case where the email never arrives. A second, unavoidable channel for the most severe outcome.

### Appeal outcome notification — three named outcomes, one of them a third way

`[observed]` The best-structured outcome copy in the file:

> "You'll get an email from YouTube letting you know the result of your appeal request. **One of the following will happen:**"
>
> - "If we find that your content **followed our Community Guidelines**, we'll reinstate it and remove the strike from your channel. If you appeal a warning and the appeal is granted, **the next offense will be a warning.**"
> - "If we find your content followed our Community Guidelines, **but isn't appropriate for all audiences**, we'll apply an **age-restriction**. If it's a video, it won't be visible to users who are signed out, are under 18 years of age, or have **Restricted Mode** turned on. If it's a custom thumbnail, **it will be removed.**"
> - "If we find that your content was in violation of our Community Guidelines, the strike will stay and the video will remain down from the site. **There's no additional penalty for appeals that are rejected.**"

Three things to steal.

**The middle outcome is a partial win, and it is specified.** Most appeal processes are binary. YouTube publishes a third outcome — content reinstated but age-restricted — and then enumerates exactly who loses access (signed-out users, under-18s, Restricted Mode users) plus the divergent handling for thumbnails. A named middle verdict with its precise consequences.

**`There's no additional penalty for appeals that are rejected.`** Eight words that remove the single biggest deterrent to appealing. Any appeals process with no downside should say so explicitly, because users assume there is one.

**The warning-reset rule**: "If you appeal a warning and the appeal is granted, the next offense will be a warning." The appeal does not just clear the record, it restores the *grace slot* — and that second-order consequence is stated.

**The appeal limit, stated twice**: "**You may appeal each strike only once.**" and, in the termination article, "There is also a limit on how many times you can appeal a single channel termination." The first is exact; the second is vague. Inconsistent precision on the same mechanic across two articles.

### Appeal windows — four different clocks

`[observed]` and they do not align:

| Object | Window |
|---|---|
| Warning | `6 months` from issue |
| CG strike | `6 months` from issue |
| Content removal (videos, posts, playlists, thumbnails, URLs) | `1 year` from removal |
| Channel termination | `1 year` from termination date |
| YPP application rejection | `21 days` |

The content-removal window is explicitly scoped: "This 1 year window applies to **all types of content removals including videos, posts, playlists, thumbnails and URLs.**" Enumerating the five content types the window covers removes exactly the ambiguity a creator would hit.

### Termination communication

`[observed]` Three reasons, named:

> - "**Repeated violations** of the Community Guidelines or Terms of Service across any form of content (like repeatedly posting abusive, hateful, and/or harassing videos or comments)"
> - "**A single case of severe abuse** (such as predatory behavior, spam, or pornography)"
> - "**Dedication to a policy violation** (like hate speech, harassment, or impersonation)"

`Dedication to a policy violation` is a distinct third category — a channel whose *purpose* is the violation, as opposed to a channel that has accumulated violations or committed one severe one. Naming intent-as-a-category, separately from frequency and severity, is a genuinely useful enforcement distinction and I have not seen it articulated this cleanly elsewhere.

**The circumvention prohibition, stated twice and scoped three ways** `[observed]`:

> "If your YouTube channel is terminated, you are prohibited from using, possessing, or creating any other YouTube channels. You are also prohibited from letting others whose YouTube channels have been terminated use your YouTube channel to bypass their termination. This applies to **all of your existing channels, any new channels you create or acquire, and any channels in which you are repeatedly or prominently featured.**"

Three verbs (`using, possessing, or creating`), a reciprocal prohibition (don't host someone else's circumvention), and a three-part scope including the remarkable `any channels in which you are repeatedly or prominently featured` — enforcement reaching channels the user does not own. And the near-identical clause appears in the CG strike article, where it is explicitly labelled: "Violation of this restriction is considered **circumvention** under our Terms of Service."

**Financial consequence of termination** `[observed]`: "Participants of the YouTube Partner Program are no longer entitled to earn any revenue if their channel is terminated. We may also **withhold unpaid earnings and refund advertisers or viewers** for purchases where appropriate and possible." Money already earned but unpaid may be withheld, and third parties refunded. Disclosed in the second paragraph of the termination article, not in a footnote.

**Appeal status is checkable** `[observed]`: "View confirmation of your appeal submission, and **check your appeal's anticipated review time**." An estimated-review-time surface for an appeal — the thing users most want and most rarely get. And the outcome UX is specified: "If your appeal is accepted, you'll be directed to return to your YouTube Studio dashboard. **If your appeal is rejected, you'll be signed out once you accept the decision.**" Being signed out as the terminal state of a rejected termination appeal is a bleak but unambiguous piece of interaction copy.

### Platform-level banners

`[observed]` Two persistent banners appear at the top of monetization articles:

> "Starting **February 1, 2027**, we are introducing **updates to the YouTube Partner Program (YPP)**. To continue fully monetizing your content, **review and accept the updated terms in YouTube Studio by January 31, 2027.**"

Structure: effective date → what is changing → required action → deadline (one day before the effective date). Four elements, one sentence each. The deadline is expressed as an absolute date, not "before the change" — no arithmetic required. `continue **fully** monetizing` is the hedge doing the work: partial monetization presumably survives non-acceptance, but the banner does not say what is lost, which is the gap.

> "Due to the **ongoing war in Ukraine**, we will be **temporarily pausing** Google and YouTube ads from serving to users located in Russia. Learn more."

A geopolitical service-suspension notice rendered as a standing banner on creator earnings documentation. Cause named plainly (`the ongoing war in Ukraine`), action named, duration hedged (`temporarily`), scope precise (`users located in Russia`). Notable for what it does *not* do: no euphemism, no "current events", no passive voice about who decided.

### Revenue-fluctuation notification

`[observed]` A rare and good disclosure of *why a number will change after you look at it*:

> "**Monthly estimated revenue is subject to adjustments** due to invalid traffic, Content ID claims and disputes, or certain ad campaign types (like cost-per-day campaigns). If your monthly estimated revenue appears to be fluctuating, it may be due to those adjustments. They happen **two times after revenue generation: after 1 week** (giving a more complete estimate), **and in the middle of the following month** reflecting your finalized earnings."

Three causes, then the exact schedule of the two adjustment passes. This pre-empts the "my earnings went down overnight" support ticket by publishing the mechanism and the calendar. And the estimate/final distinction is enforced terminologically throughout: `monthly estimated revenue` (Analytics) vs `finalized earnings` (AdSense), never conflated.

## T10 Disclosures, legal & compliance

### Monetization eligibility and revenue disclosure

**Revenue share stated as three exact percentages, each bound to a named contract module** `[observed]`:

| Module (verbatim) | Share | Scope |
|---|---|---|
| `Commerce Product Module` | "YouTube will pay them **70% of net revenues**" | channel memberships, Super Chat, Super Stickers, Super Thanks |
| `Watch Page Monetization Module` | "**55% of net revenues** from ads displayed or streamed on their public videos on their content Watch Page" — "This revenue share rate also applies when their public videos are streamed within the YouTube Video Player on other websites or applications" | watch-page ads, incl. embeds |
| `Shorts Monetization Module` | "**45% of the revenue allocated to them based on their share of views from the Creator Pool allocation**" | Shorts Feed ads |

Publishing the actual split, per product line, is unusual. Note the Shorts formulation is materially vaguer — `45% of the revenue allocated to them based on their share of views from the Creator Pool allocation` is a percentage of an undisclosed pool, not a percentage of the ad revenue on the creator's own content. The copy is honest about the difference by describing the mechanism rather than smoothing it, but `Creator Pool allocation` is an unglossed term doing heavy lifting.

`net revenues` (not gross) in the first two; and the tax exclusion stated separately: "**Note**: Transaction taxes such as sales tax, VAT, GST, etc. are **not revenue to Google** and are not included in the partner revenue share calculation."

**The no-guarantee disclaimer** `[observed]`: "**There are no guarantees under the YouTube partner agreement about how much or whether you'll be paid.** Earnings are generated based on a share of advertising revenue from viewers watching your video." Placed in the first substantive paragraph of the earnings article, before any mechanism.

**Per-feature eligibility matrix** `[observed]`, six features each with its own gate. The two thresholds visible:

- Ad revenue: `Be at least 18 years old, or have a legal guardian older than 18 years of age who can handle your payments via AdSense` · live in a YPP country · `Accept the relevant contract Modules` · `Create content that meets our advertiser-friendly content guidelines`
- Shopping: `Get 500 subscribers with 3 valid public uploads in the last 90 days` **and** `3,000 qualified watch hours in the last 12 months **or** 3 million qualified Shorts views in the last 90 days`
- Channel memberships / Super Chat / Super Stickers / Super Thanks: `Be at least 18 years old` + country + `Commerce Product Module or formerly available Commerce Product Addendum`

And two recurring exclusions written into multiple rows: "Channel isn't set as **Made for Kids** and doesn't have a significant number of ineligible videos. Videos set as made for Kids, or videos with music claims are considered ineligible" · "**Not a music channel under SRAV**" · "Channel is not a music channel, an Official Artist Channel, or associated with music partners. Music partners may include music labels, distributors, publishers, or VEVO."

**`SRAV` is used unglossed** — an acronym appearing twice in the eligibility matrix with no expansion anywhere on the page. A real defect in a document creators must parse to understand their own eligibility.

`formerly available Commerce Product Addendum` is a nice piece of legacy-contract handling: the superseded instrument is named so that creators holding it recognise themselves.

**Why the extra thresholds exist, explained** `[observed]`: "These extra thresholds exist for two main reasons. The most important one is that **we have to meet legal requirements in every area where the feature is available.** Then, because we want to reward good creators, **we need to make sure we have enough context on your channel.** Generally, this context means **we need more content to review.**" Legal necessity first, reviewability second, with `context` glossed into plain terms (`more content to review`).

**The "higher standard" framing** `[observed]`: "We won't tell you what you can create on YouTube, but we do have a responsibility to do right by our viewers, creators and advertisers. If you're in the YouTube Partner Program, you can earn money through YouTube. **When in the YouTube Partner Program, we hold you to a higher standard.**" Freedom asserted, then conditioned on monetization. The clearest statement of the two-tier policy regime.

**Continuous review disclosed three times** `[observed]`: "We also **constantly review** channels to make sure you're meeting all our policies" · "Keep in mind that **we constantly review channels** to make sure your content is in line with our policies" · "Keep in mind **we continuously check channels** in YPP to make sure they continue to meet our policies and guidelines over time." Three near-identical sentences in two articles — repetitive, but the message (acceptance is not permanent) is the one creators most need to hear.

### Tax disclosure

`[observed]` Unusually prominent for a media product:

> "Google withholds U.S. taxes on earnings that you generate from viewers in the U.S. If you haven't already, **submit your U.S. tax info** in your AdSense for YouTube account so Google can determine your correct withholding rate. **If tax info isn't provided, Google may be required to withhold at the maximum rate.**"
> "Submitting U.S. tax info is **required for all monetizing creators, regardless of their location in the world.**"

Consequence of inaction stated (`the maximum rate`), universality stated (`regardless of their location`). Plus a disclaimer of advice: "**Note:** YouTube and Google can't give you advice on tax issues. Consult a tax professional to better understand your tax situation." And per-country articles in the topic pager (`Tanzania tax information`, `Kenya tax information`, `Country pass-throughs`, `Rights clearance adjustments`) — jurisdiction-specific tax content as ordinary help articles.

**Payment gating stated as a five-condition list** `[observed]`: "you'll be paid when the following criteria are met: Your earnings reach your local **payment threshold** · There are no **holds** on your account · You've provided your **U.S. tax info** · Monetization is not **suspended** or **paused** for your channel · You're in compliance with YouTube monetization policies." Five named blockers, each linked to its own article. A creator whose payment has not arrived can check five things.

**Payment calendar, with a worked example** `[observed]`: "Finalized YouTube earnings for the previous month are added to your YouTube payment account balance in AdSense for YouTube **between the 7th and 12th** of the current month. **For example, if you're in the United States and you earn $100 in June, you'll see this balance between July 7th-12th.** The earnings are paid out by the **21st-26th** of the current month." A date range, then a concrete worked example with a round number. That example is why the paragraph works.

### Copyright and rights disclosure

**The three remedies for a claim, and the three for a strike**, each enumerated `[observed]`:

Claim remedies: `Leave it as is` · `Remove the claimed content` (via `Erase song` / `Trim out segment` / `Replace song`) · `Share revenue` · `Dispute the claim`
Strike remedies: `Complete Copyright School and wait 90 days` · `Get a retraction` · `Submit a valid counter notification`

`Erase song` / `Trim out segment` / `Replace song` is a strong set — three verb-first labels naming exactly what happens to the audio, with `Replace song` routed to the `YouTube Audio Library` so the remedy comes with the replacement inventory.

**Counter notification carries a legal warning** `[observed]`: "**Note:** Filing a counter notification **begins a legal process.**" Five words, bolded label, no elaboration. The right amount of warning for a DMCA counter-notice, which exposes the filer to suit.

**And YouTube declines to arbitrate** `[observed]`: "Keep in mind that **YouTube doesn't mediate copyright disputes.**" A platform stating the limit of its own role in the dispute it is hosting.

**Manual Claiming accountability, disclosed to the claimed-against party** `[observed]`:

> "Manual claims **must have accurate timestamps** so creators know exactly what content is being claimed. Copyright claimants **can't use the Manual Claiming tool for any other purpose.**"
> "Copyright claimants who repeatedly select inaccurate timestamps can have their **Manual Claiming tool access revoked** or, if applicable, **have their partnership with YouTube terminated.** If you believe the timestamps claimed in your video are inaccurate, you can get in touch with our **Creator Support team**."

This is the rarest item in the file: **enforcement against the enforcer, disclosed to the person being enforced against.** YouTube tells creators that claimants face penalties for abuse, names the two penalties (tool revocation, partnership termination), and gives the creator a reporting route. Any product with a two-sided reporting or claiming mechanism should publish the abuse consequences on the *reported* party's page, not only in the claimant's terms.

**Claimant identity, with a caveat against false confidence** `[observed]`: "You can see who claimed your video under **Claimant**. **If you don't recognize the copyright owner, it doesn't necessarily mean that the claim is invalid.**" And: "if your video has a claim from **'one or more music publishing rights collecting societies'**, you may want to learn more about collecting societies." The quoted opaque claimant string is reproduced verbatim so the creator recognises it.

**Likeness claims, split off as a new category** `[observed]`: "Copyright claims are **different from likeness claims**. If your channel receives a **likeness claim**, go to the likeness claims article." A new claim type carved out of the copyright namespace and given its own article — the AI-era addition to the taxonomy, handled by disambiguation-first, same as the other three.

### Community Guidelines structure

`[observed]` **Five policy families**, each a card with a scope sentence and 2–6 sub-policy links:

| Family | Scope sentence (verbatim, abridged) | Sub-policies |
|---|---|---|
| `Spam & deceptive practices` | "The YouTube Community is one that's built on trust. Content that intends to scam, mislead, spam, or defraud other users isn't allowed" | `Spam policy` · `Impersonation policy` · `External links policy` · `Fake engagement policy` · `Playlists policy` · `Additional policies` |
| `Sensitive content` | "We hope to protect viewers, creators, and especially minors." | `Nudity & sexual content policies` · `Thumbnails policy` · `Child safety policy` · `Suicide, self-harm, and eating disorders policy` · `Vulgar language policy` |
| `Violent or dangerous content` | "Hate speech, predatory behavior, graphic violence, malicious attacks, and content that promotes harmful or dangerous behavior isn't allowed" | `Harmful or dangerous content policies` · `Violent or graphic content policies` · `Violent criminal organizations policy` · `Hate speech policy` · `Harassment & cyberbullying policies` |
| `Regulated goods` | "Certain goods can't be sold on YouTube. Find out what's allowed and what isn't." | `Sale of illegal or regulated goods or services policies` · `Firearms policy` |
| `Misinformation` | "Certain types of misleading or deceptive content **with serious risk of egregious harm** are not allowed" | `Misinformation policies` · `Elections misinformation policies` · `Medical misinformation policies` |
| `Educational, Documentary, Scientific, and Artistic (EDSA) content` | (the exception, not a prohibition) | `How YouTube evaluates EDSA content` |

Five prohibition families and **one exemption family given equal visual weight as a sixth card.** `EDSA` is the notable artefact: a named, acronymised carve-out for content that would otherwise violate the rules.

> "Sometimes, content that would otherwise violate our Community Guidelines may stay on YouTube when it has **Educational, Documentary, Scientific, or Artistic (EDSA) context**, including content that is in the public's interest. In these cases, the content gets an **EDSA exception**."
> "We may also make exceptions for content that is in the public's interest, such as **congressional or parliamentary proceedings, campaign speeches, or debates over ongoing government actions.**"
> "**This is not a pass to violate our Community Guidelines.**"

Acronym, four-word expansion, three worked examples of public interest, and then a one-sentence anti-abuse clause. The closing line is the craft: having created an exception, the copy immediately forecloses its rhetorical use.

**Policy scope statement, repeated verbatim in two articles** `[observed]`: "These policies apply to **all types of content** on our platform, including, for example, **unlisted and private content, comments, links, posts, and thumbnails. This list isn't complete.**"

`unlisted and private content` first in the list — the two categories creators assume are exempt. And `This list isn't complete` as an explicit non-exhaustiveness marker rather than "including but not limited to". Plainer, same legal effect.

### Child and teen safety (viewer-side)

`[observed]` — **article titles only**; bodies unharvested. `Supervised experiences on YouTube` splits into two age bands:

`Supervised accounts for kids` (topic, contents unharvested)

`Supervised accounts for teens` — seven articles:
- `Supervised teen account`
- `Set up a supervised teen account`
- `Teen supervision features in Family Center`
- `Explore your Family Center`
- `Tips & resources for parents of teens on YouTube`
- `Tips & resources for teens`
- `Best practices for teen content`

Three observations. `Family Center` is the named control surface (a Google-level rather than YouTube-level property, inferred from the naming but not confirmed). **`Tips & resources for teens` is addressed to the teen, not the parent** — the supervised party gets their own article, a sibling to the parent's. And `Best practices for teen content` is addressed to **creators**, about content aimed at teens: a third audience inside a supervision topic. Three audiences (parent, teen, creator) served from one branch of the IA.

`Made for Kids` is the COPPA designation, and it recurs in the monetization matrix as a **disqualifier**: "Channel isn't set as Made for Kids and doesn't have a significant number of ineligible videos. Videos set as made for Kids… are considered ineligible." Child-directed content is monetization-restricted, and this is disclosed in the eligibility table rather than in a separate policy page.

Age-related enforcement states named in the enforcement pager: `Age-restricted content` · `Watch age-restricted videos` · `Your YouTube content & Restricted Mode` · `Age-restrict your own video on YouTube` · `Appeal the age restriction on your video`. Five articles covering age restriction from four positions: the restricted creator, the viewer trying to watch, the creator self-restricting, and the creator appealing.

### Ad-supported-tier framing

**`[absent]`** — `youtube.com/premium` is client-rendered and returned no body copy. YouTube's ad-supported/ad-free framing, plan names, and pricing were not observable. The only adjacent artefact is the creator-side statement that "**YouTube retains the right to serve ads on all content on the platform**" (see T6), which is the supply-side mirror of the ad tier.

## T11 Help-centre architecture

**Three-level: category → sub-topic → article**, on the shared Google Help Center chassis, with two structural features not seen elsewhere in this domain.

**1. The ordered topic pager.** Many articles render `1 of 8` … `8 of 8` with the current article as `#`, turning a topic into a **walkable sequence**. Observed sets: `Learn about enforcements` (8), `Manage enforcements` (5), `Copyright claim basics` (7), `Overview` [monetization] (13). This is a curriculum, not a library — and the *ordering* is the content design (see T1).

`Copyright claim basics` in order: `What is a claim?` → `About copyright removal requests` → `Understand copyright strikes` → `Learn about copyright claims` → `Dispute a copyright claim` → `Appeal a copyright claim` → `Monetization during copyright claim disputes`. Definition → mechanism → penalty → detail → remedy → escalation → money. **Note that `Dispute` and `Appeal` are separate, sequential articles** — two distinct remedies with different mechanics, ordered.

**2. Platform tabs on the same article.** Most how-to articles render `Computer` / `Android` / `iPhone & iPad` as sibling URLs of the same `answer` ID (`?co=GENIE.Platform%3DDesktop`), so the article is one node with three bodies. The canonical URL and the `<title>` both carry the platform: `Appeal a Community Guidelines strike or video removal - Android - YouTube Help`. **Defect worth noting**: fetching `answer/185111?hl=en` without a platform parameter served the **Android** variant by default, so the platform-neutral URL has an arbitrary default rather than a chooser.

**Article-title grammar — seven shapes** `[observed]`:

| Shape | Examples |
|---|---|
| `<Concept> basics` | `Community Guidelines strike basics on YouTube` · `Copyright claim basics` |
| `Understand <X>` | `Understand copyright strikes` · `Understand ads and related policies` |
| `Learn about <X>` | `Learn about copyright claims` · `Learn about enforcements` · `Learn about recent updates on YouTube` |
| `How to <verb>` / `How <X> works` | `How to earn money on YouTube` · `How Content ID works` · `How YouTube reviews content` |
| `<Verb> <object>` (imperative) | `Appeal a copyright claim` · `Dispute a copyright claim` · `Respond to enforcements` · `Troubleshoot video removals` · `Age-restrict your own video on YouTube` · `Submitting your U.S. tax info to Google` |
| `<X> overview` / `<X> overview & eligibility` | `YouTube Partner Program overview & eligibility` · `YouTube partner earnings overview` |
| Question | `What is a claim?` · `What is Copyright School?` |

The **`Understand` / `Learn about` split** is the interesting one, and it looks deliberate: `Understand copyright strikes` (the thing that happens to you) vs `Learn about copyright claims` (the mechanism you need to know). `Understand` for consequences, `Learn about` for systems. It is not perfectly held (`Learn about enforcements` is a consequences topic) but the tendency is visible.

**Routing furniture, in order** `[observed]`: natural-language search (`Describe your issue…`) → `Browse help topics` (8 categories) → within-article topic pager → `Was this helpful?` → `Need more help?` → `Post to the help community`. There is **no `Contact us`** and no phone number anywhere. `Creator Support` is named as a YPP entitlement, and `get in touch with our Creator Support team` appears once, as the remedy for **claimant timestamp abuse** — i.e. human support is surfaced at exactly one point, for one specific grievance, to one audience.

## T12 FAQs

**Placement:** inline collapsible FAQ blocks at the foot of long articles, under `Frequently asked questions (FAQ)`, `FAQs around applying and more`, or unheaded expandable questions. Answers are present in server HTML. No FAQ exists on a marketing surface (`youtube.com/premium` blocked).

**YPP eligibility article — `FAQs around applying and more`, 5 questions**

| # | Question (verbatim) | Answer summarised |
|---|---|---|
| 1 | What if I don't meet the program threshold? | Four routed growth resources; then the strike rule — apply after strikes expire or after a successful appeal; and the reassurance that existing members aren't removed for strikes |
| 2 | What do "qualified watch hours" and "qualified Shorts views" mean? | Two definition blocks, each an inclusion line plus a 5–6-item exclusion list |
| 3 | If I meet the threshold, do I automatically get into YPP? | `No.` — then the review process and the no-active-strikes requirement |
| 4 | What happens if my counts drop below the threshold after I apply? | Counts dropping is fine; privacy changes and deletions are not; status checkable in Studio |
| 5 | I'm no longer in YPP (or I was never in the program) and I'm seeing ads on my videos. Am I earning revenue from those ads? | No — YouTube reserves the right to serve ads on all content; revenue share requires YPP |

**Copyright strike article — `Frequently asked questions (FAQ)`, 5 questions**

| # | Question (verbatim) |
|---|---|
| 1 | What is Copyright School? |
| 2 | Do I need to complete Copyright School to clear a copyright strike? |
| 3 | Can live streams get copyright strikes? |
| 4 | I got a claim on my video, does that mean I'll get a copyright strike? |
| 5 | What happens if a channel that's linked to mine gets a copyright strike? |

**Copyright claims article — `Frequently asked questions (FAQs)`, 4 questions**

| # | Question (verbatim) |
|---|---|
| 1 | Am I in trouble if my video has a copyright claim? |
| 2 | What can I do if a copyright claim is wrong? |
| 3 | Does my channel get a copyright strike if my video has a copyright claim? |
| 4 | What to know about manual claims? |

**Structural notes.**

**Four of the fourteen questions are in the creator's anxious first person**: `What if I don't meet the program threshold?` · `I got a claim on my video, does that mean I'll get a copyright strike?` · `Am I in trouble if my video has a copyright claim?` · `I'm no longer in YPP… Am I earning revenue from those ads?` The last two are the best: `Am I in trouble…` is the question as felt, not as formulated, and its answer opens `**Probably not.**` — a two-word hedged reassurance, then the explanation.

Q4 of the copyright-strike set (`I got a claim on my video, does that mean I'll get a copyright strike?`) is a **comma-spliced run-on** written the way a person types it into a search box, rather than as a grammatical question. Deliberately or not, that is the query it is matching.

**Three of the fourteen are disambiguation questions** between the claim/strike/removal systems (`Does my channel get a copyright strike if my video has a copyright claim?`, `I got a claim… does that mean…`, `Am I in trouble…`). Roughly a fifth of YouTube's copyright FAQ surface is spent disentangling its own two similarly-named penalties. That is the cost of having shipped `copyright strike` and `Community Guidelines strike` as parallel systems with the same noun.

**`What to know about manual claims?`** is ungrammatical as a question (`What to know` is not an interrogative), and its answer is a four-bullet list rather than a prose answer — the FAQ slot being used as a container for policy content that had nowhere else to live.

**Answer-opening discipline** is strong: `No.` (Q3, YPP) · `Probably not.` (Q1, claims) · `Yes,` (Q2, Copyright School) · `Yes, if your active live stream is removed…` (Q3, strikes) · `No. Copyright strikes happen as a result of…` (Q3, claims). Five of fourteen answers lead with a one-word verdict before explaining. Compare Netflix's `How much does Netflix cost?`, whose answer opens with a device list.

## T13 Terminology & glossary

| Term | YouTube's usage | The alternative it rejected |
|---|---|---|
| `strike` | The unit of channel-level penalty — but **two incompatible systems use the same word**: `Community Guidelines strike` and `copyright strike` | one word per system |
| `Warning` | The pre-strike grace state, capitalised | "first offence", "notice" |
| `Optional policy trainings` | Remediation-for-clemency | "education module", "course" |
| `Copyright School` | The copyright equivalent, 4 questions | — |
| `termination` | Permanent channel removal | "ban", "suspension" (`suspended` is reserved for monetization) |
| `circumvention` | Evading a termination via another channel | "ban evasion" |
| `Dedication to a policy violation` | A termination ground based on channel *purpose* | "intent", "bad faith" |
| `EDSA` — `Educational, Documentary, Scientific, or Artistic` | The named exception to the guidelines | "newsworthiness", "public interest exception" |
| `EDSA exception` | The granted status | — |
| `copyright claim` | Automated Content ID match; video-level | "copyright flag" |
| `copyright removal request` / `takedown` | Legal request; both terms used, one glossing the other | — |
| `counter notification` | The DMCA rebuttal; "begins a legal process" | "appeal" (deliberately *not* used here) |
| `retraction` | Claimant withdrawal | "withdrawal" |
| `dispute` vs `appeal` | **Two sequential, distinct remedies** for a claim — separate articles in the pager | one remedy |
| `Block` / `Monetize` / `Track` | The three Content ID claim policies | "actions", "responses" |
| `Manual Claiming tool` | Human claiming outside Content ID | — |
| `likeness claim` | The new non-copyright claim type | "AI claim", "deepfake report" |
| `Claimant` | The party asserting rights | "rights holder", "owner" |
| `qualified watch hours` / `qualified Shorts views` | Threshold metrics, defined by exclusion | "watch time", "views" |
| `Creator Pool allocation` | The Shorts revenue basis — **unglossed** | — |
| `Modules` — `Base terms`, `Commerce Product Module`, `Watch Page Monetization Module`, `Shorts Monetization Module` | Separately-acceptable contract objects | one terms document |
| `Commerce Product Addendum` | `formerly available` — the superseded instrument, still named | — |
| `Supers` — `Super Chat`, `Super Stickers`, `Super Thanks` | Three fan-payment products under one collective shorthand | "tips", "donations" |
| `Made for Kids` | The COPPA designation, video- and channel-level | "child-directed" |
| `supervised teen account` / `Family Center` | Teen oversight | "parental controls" |
| `advanced features` | A capability tier gated by verification and forfeited on strike | "verified status" |
| `advertiser-friendly content guidelines` | The monetization content standard, distinct from Community Guidelines | "monetization policy" |
| `SRAV` | **Used twice, never expanded** | — |
| `invalid traffic` | The revenue-adjustment cause | "fraud", "bot views" |
| `estimated revenue` vs `finalized earnings` | Analytics figure vs AdSense figure — never conflated | — |
| `withhold` | What may happen to unpaid earnings on termination | "forfeit" |
| `Here's what we found` | The framing of an enforcement finding | "violation detected", "your video broke the rules" |

**`strike` doing double duty is the central terminological problem in this file**, and YouTube knows it: every one of the three relevant articles opens by disambiguating, and three of fourteen FAQ questions exist only to separate the two systems. The systems differ in trigger (community vs legal), expiry mechanism (training vs Copyright School vs retraction vs counter-notice), remedy vocabulary (`appeal` vs `dispute`/`counter notification`), and penalty shape (posting freeze vs content removal). Sharing the noun `strike` across them generates a permanent support cost, visibly.

**`dispute` vs `appeal` is held rigorously** and is the better half of the vocabulary: you `dispute` a Content ID claim (a private-party disagreement), you `appeal` an enforcement decision (a platform judgment), and you file a `counter notification` against a legal takedown (a statutory process). Three words, three counterparties, three risk profiles. That distinction is worth stealing wholesale for any product with multiple contest paths.

**`suspended` / `paused` / `terminated` / `withheld`** are likewise kept distinct and each attached to a different object: monetization is `suspended` or `paused`, channels are `terminated`, earnings are `withheld`.

**Unglossed jargon**, recorded as defects: `SRAV` (twice, no expansion), `Creator Pool allocation`, `advanced features` (linked but not defined in situ), `Content Owner` (in "channels linked to a music Content Owner"), `VOD` (expanded once, in parentheses, in an exclusion list only), `pay-tv provider` authentication.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the creator throughout, first-person plural for YouTube — and the `we` is used at the moments of judgment, not avoided: `We understand mistakes happen` · `If we find your content followed our Community Guidelines` · `Our reviewers likely found…` · `we hold you to a higher standard` · `We may prevent repeat offenders from taking trainings` · `we may respond based on a number of factors` · `We may also withhold unpaid earnings`.

This is the most striking voice decision in the file. **YouTube writes its enforcement copy in the active first person, as an actor making decisions**, rather than in the passive institutional voice (`your content was found to violate…`). `Here's what we found` and `Our reviewers likely found` name a human process. It makes the copy accountable and it makes the appeal legible — you can argue with a `we`.

Compare the one place the voice goes passive, and note it is the money: `Ads will be served` — no. That is Disney+ (143). YouTube's equivalent is `Earnings are generated based on a share of advertising revenue`, which is agentless, and `Finalized earnings… are added to your AdSense for YouTube account balance`. **The enforcement copy has an agent; the revenue copy does not.**

**Register.** Plain and procedural, with contractions throughout (`won't`, `don't`, `isn't`, `you'll`, `we'll`). Register warms slightly for creators in distress — `don't worry` (after a rejected YPP application), `Probably not.` (after a copyright claim), `We understand mistakes happen` — and cools to flat declarative for consequences: `You may appeal each strike only once.` `You can't create new YouTube channels.` `Filing a counter notification begins a legal process.`

**Exclamation marks:** exactly two, both in the same register-slot — `which means we have your application!` and (on the Community Guidelines) none. YouTube reserves exclamation for the one moment of relief in the application flow.

**One direct plea:** `**Please take these rules seriously**.` Bolded, italicised, imperative, with `please`. The only instance of politeness-as-emphasis in the corpus.

**No apology anywhere.** No "sorry", no "unfortunately", in any enforcement, rejection, or termination copy. `There's no additional penalty for appeals that are rejected` does the reassurance work that an apology would otherwise attempt, and does it with information instead of sentiment.

**Numbers are all rule parameters** `[observed]`: `1,000 subscribers` · `4,000 qualified watch hours` · `10 million qualified Shorts views` · `500 subscribers` · `3,000 watch hours` · `3 million Shorts views` · `90 days` (×6 distinct uses) · `6 months` · `1 year` · `21 days` · `30 days` · `7 days` · `14 days` · `1 week` / `2 weeks` · `3 strikes` · `70% / 55% / 45%` · `7th–12th` / `21st–26th` · `8 minutes` (ad mid-roll eligibility) · `4 questions`. Not one persuasive number — no view counts, no creator counts, no payout totals. Every figure is something a creator must comply with or can compute against.

**The `90 days` overload is a real clarity problem**: 90 days is simultaneously the warning expiry (post-training), the strike expiry, the strike-accumulation window, the copyright-strike expiry, the copyright-strike accumulation window, the YPP Shorts measurement window, the Shopping upload window, and the repeat-rejection re-apply period. Eight different clocks, one duration, and the copy relies on context to distinguish them.

**Accessibility content** `[observed]`

- `Skip to main content` first in DOM on every help page
- `Manage accessibility settings` is a named sub-topic under `Manage your account & settings` — accessibility as a settings category in the help IA
- `Translate videos, subtitles, & captions` under `Create & grow your channel` — captioning framed as a creator capability
- `Enable Dark Mode` control present in the help footer
- **No accessibility statement, no conformance claim, and no accessibility feedback route was found** on any reachable surface. `[absent]` — weaker than both Netflix (142, a ten-feature article plus a changelog) and Spotify (141, a four-section Accessibility Center). YouTube's accessibility content is a settings topic, not a statement.

**Accessibility defects observed in markup** `[observed]`:

- **Icon images with no alt text, used mid-sentence as the only representation of a control.** Help steps read `From the left menu, select **Settings** ![]` and `In the top right, click your profile picture ![and then] **YouTube Studio**`. The recurring "and then" arrow glyph has `and then` as its alt — which is actually correct and rather good, because it preserves the step sequence for a screen reader. But the `Settings`, `Content`, `Analytics`, `filter bar`, `Edit`, `My Netflix`-equivalent icons render with **empty alt** while the adjacent bold text supplies the label, so this is defensible. The `filter bar ![] ![and then] **Copyright**` construction is the weak case: two consecutive images between two labels.
- **The language selector renders ~80 language names as a flat undelimited run** in server HTML (`Afrikaans‎ azərbaycan‎ bosanski‎ català‎ …`), with the current language marked only by a leading `*`. As a control this is presumably a `<select>`; as text it is an 80-item wall. Suspected, not confirmed.
- **Numeric debug artefacts render in the page body**: every help page ends with a bare integer (`16173508292424988781`, `2359791021960353127`, `9367252255998237781`) followed by a run of `true`/`false` tokens (`true Search Help Center false true true true true true 59 false false false false false`). Template state leaking into the DOM as text — harmless visually, noise in the accessibility tree and in any text extraction.
- **`Send feedback on... / This help content & information / General Help Center experience / Close / Next`** renders as loose text in the header on every page, outside any visible dialog — a modal's contents flattened into the document.

**Negative findings, recorded honestly**

- **`strike` names two incompatible enforcement systems**; three articles open by disambiguating and 3 of 14 FAQ questions exist only to separate them
- `Appeal` / `APPEAL` / `Review issues` / `Review content` → `Take action` — the appeal entry point has four labels across three surfaces, one in caps
- `Share your thoughts with us (optional)` as the label on an appeal-justification field, versus `explain your reason for appeal` in the termination flow
- `You may appeal each strike only once` (exact) vs "There is also a limit on how many times you can appeal a single channel termination" (vague) — inconsistent precision on the same mechanic
- `SRAV` used twice with no expansion, inside an eligibility matrix
- `Creator Pool allocation` unglossed, and it is the basis of the Shorts revenue share
- `90 days` used for eight distinct clocks
- `Get help with the YouTube Partner Program` appears twice in the help tree (arguably deliberate)
- Three near-identical "we constantly review channels" sentences across two articles
- `What to know about manual claims?` — ungrammatical as a question; its answer is a policy bullet list
- Platform-neutral article URLs default to an arbitrary platform (`answer/185111?hl=en` served the **Android** variant)
- `Related`/pager duplication and modal text flattened into the header on every page
- Numeric template-state debug tokens render as body text on every help page
- **No `Contact us` anywhere**; `Need more help?` resolves only to the community forum; human `Creator Support` is a YPP entitlement
- **No accessibility statement or conformance claim**
- **Viewer-side commercial copy unobtainable** — `youtube.com/premium` client-rendered
- The YPP-terms banner says accept-or-lose-`full`-monetization without saying what partial monetization retains
- Enforcement copy has a first-person agent; revenue copy is agentless

---

## Transferable patterns

1. **Publish what an enforcement notification will contain, as a four-item promise: the object, the rule, the consequence, the remedy.** `What content was removed` / `Which policies it violated` / `How it affects your channel` / `What you can do next`. Object first (users need to know *which* thing), remedy last (end on agency). Audit every adverse-action notice against this list.
2. **Enumerate a capability suspension; never summarise it.** Eight specific prohibitions for a First Strike, including the edge cases (`add collaborators to playlists`, the `"Save"` button). A user must be able to check whether *their* workflow is blocked.
3. **Name the collateral state change and the manual remediation it creates.** "Your scheduled public content is set to 'private' for the penalty period duration. You have to reschedule it when the freeze period ends."
4. **State the clock start when it isn't obvious.** "Penalty starts from the date of acknowledgement." "The 90-day period starts from when the training is completed, not when the warning is issued." Eight words each; both prevent the most likely misreading.
5. **Publish a named middle verdict for appeals.** Reinstated-but-age-restricted, with the precise audience loss enumerated (signed-out, under-18, Restricted Mode) and the divergent thumbnail handling. Binary appeal outcomes are a design failure where a partial remedy exists.
6. **Say "there is no penalty for a rejected appeal" explicitly.** Users assume there is one, and that assumption suppresses legitimate appeals.
7. **Presume good faith in writing, then state the condition on which it is withdrawn.** "We understand mistakes happen and you don't mean to violate our policies — that's why the first violation is typically only a warning. However, if your content violates the same policy within that 90 day window…"
8. **Disclose that your reviewers sometimes disagree, and that this causes delay.** "Sometimes channels require multiple reviews, especially when several reviewers disagree on your channel's suitability." Exceptional and cheap.
9. **Open every article in a confusable family by naming what it is not.** All three copyright/CG articles do this in sentence one. Disambiguation-first is mandatory when two systems share a noun — and better still, don't share the noun.
10. **Keep separate words for separate contest paths.** `dispute` (private-party claim), `appeal` (platform judgment), `counter notification` (statutory process, "begins a legal process"). Three counterparties, three risk profiles, three words.
11. **Define a threshold metric by enumerating what does *not* count.** `qualified watch hours` excludes private, unlisted, deleted, ad-campaign, Shorts, and non-VOD livestreams. Users optimise against thresholds, so exclusions are the operative content.
12. **Publish enforcement against the enforcer, on the enforced-against party's page.** Claimants who misuse timestamps lose tool access or their partnership, and the claimed-against creator is told so and given a route. Any two-sided reporting or claiming system should do this.
13. **Name the exact sending address of official notices inside the enforcement article.** `no-reply@youtube.com`, repeated twice. Enforcement moments are peak phishing exposure.
14. **Create a named, acronymised exception — then foreclose its abuse in one sentence.** `EDSA exception`, three worked examples, then `This is not a pass to violate our Community Guidelines.`
15. **State the limit of your own role in a dispute you host.** "YouTube doesn't mediate copyright disputes."
16. **Give a payment or adjustment calendar a worked example with a round number.** "if you're in the United States and you earn $100 in June, you'll see this balance between July 7th-12th."
17. **Disclose why a number you already showed will change, and when.** The two revenue-adjustment passes (after 1 week; mid-following-month) with their three causes. Pre-empts the whole "my earnings dropped" ticket class.
18. **Offer a threshold-reached notification instead of making users poll.** `Get notified` in the Earn area.
19. **Order enforcement articles as a curriculum, split into `Learn about` and `Manage`.** Understand-what-happened and do-something-about-it are different jobs and should be different ordered sets.
20. **Counter-example: do not reuse one noun for two enforcement systems.** `strike` costs YouTube a disambiguation sentence in three articles and a fifth of its copyright FAQ, permanently.
21. **Counter-example: `Share your thoughts with us (optional)` is the wrong label for an appeal field.** A user contesting a penalty is submitting a reason, not sharing thoughts.

## Caveats & gaps

- **Viewer-side commercial surfaces are blocked.** `youtube.com/premium` is client-rendered and returned only the footer nav. **YouTube Premium plan names, pricing, family/student plan copy, cancellation wording, and the ad-supported-tier framing are all `[absent]`** — the brief's "pricing / plans page including cancellation wording and the ad-supported-tier framing" could not be fulfilled for this product. `youtube.com/` itself was not fetched (also client-rendered). A browser-rendered pass is required.
- **The 12 Community Guidelines sub-policy articles were captured as titles only** (`Hate speech policy`, `Child safety policy`, `Harassment & cyberbullying policies`, `Misinformation policies`, `Elections misinformation policies`, `Medical misinformation policies`, etc.). Their internal structure — which is where the actual prohibited-conduct taxonomy lives — is unharvested.
- **`Supervised accounts for kids` and all seven teen-supervision article bodies are unharvested.** Only the topic and article titles were observed. So the teen/kid **control vocabulary, PIN copy, age bands, and `Family Center` feature labels are `[absent]`**. `Family Center` being a Google-level rather than YouTube-level property is **inferred from naming and not confirmed**.
- **All in-product strings are `[documented]`, not observed.** `Here's what we found`, `Channel violations`, `Active copyright strikes`, `Restrictions`/`Visibility` columns, `APPEAL`, `Share your thoughts with us (optional)`, `In Progress`, `Get Reviewed`, `Erase song`/`Trim out segment`/`Replace song` are all quoted from help articles. None was seen in situ; Studio is behind auth.
- **The actual notification bodies are unobserved.** T9 describes what YouTube *says* its strike, termination, claim and appeal-outcome emails contain. The emails themselves are not public. The four-item notification contract is a published promise, not a verified artefact.
- **`Strikes FAQ` (`answer/9235777`) was not opened** — it is the eighth article in the `Learn about enforcements` pager and is likely to contain further strike mechanics.
- **`How YouTube reviews content` (`answer/13304829`) and `Respond to enforcements` (`answer/13304628`) were not opened** — the first articles of each enforcement pager, and both likely high-value.
- **No error-code taxonomy was found**, and none is claimed. T7 is thin by comparison with Netflix (142) and this reflects the product, not the harvest — YouTube's creator-facing failures are enforcement outcomes, not client errors.
- **`SRAV` and `Creator Pool allocation` are recorded as observed, unglossed terms.** Their meanings are **not** inferred here.
- The `tvq-`/`NW-` style prefix semantics question does not arise for YouTube; no codes exist.
- **Locale is en-US only.** USD thresholds, US tax withholding copy, and the `hl=en` renders. The ~80-language help variants and the per-country tax articles (`Tanzania tax information`, `Kenya tax information`, `Country pass-throughs`) indicate substantial locale variance, unharvested.
- **No status page was found** and none is claimed.
- Copyright Center (`youtube.com/yt/copyright/`), `youtube.com/howyoutubeworks`, `youtube.com/creators`, and the Community forum are all linked and unharvested.
- **Two forward-dated policy changes** are live in the harvested copy and will change the content: the YPP terms update (effective 1 Feb 2027, acceptance deadline 31 Jan 2027) and the Shorts copyright-blocking change (24 Sep 2026, three days after harvest). Anything in T6 about 1–3-minute Shorts blocking should be re-verified.

## Sources

1. https://support.google.com/youtube/?hl=en
2. https://support.google.com/youtube/answer/9288567 — YouTube's Community Guidelines
3. https://support.google.com/youtube/answer/2802032 — Community Guidelines strike basics on YouTube
4. https://support.google.com/youtube/answer/2802168 — Channel or account terminations
5. https://support.google.com/youtube/answer/185111 — Appeal a Community Guidelines strike or video removal
6. https://support.google.com/youtube/answer/2814000 — Understand copyright strikes
7. https://support.google.com/youtube/answer/6013276 — Learn about copyright claims
8. https://support.google.com/youtube/answer/72851 — YouTube Partner Program overview & eligibility
9. https://support.google.com/youtube/answer/72857 — How to earn money on YouTube
10. https://support.google.com/youtube/answer/72902 — YouTube partner earnings overview
11. https://support.google.com/youtube/topic/15279671 — Supervised accounts for teens (titles only)
12. https://www.youtube.com/premium — *client-rendered; footer nav only*
