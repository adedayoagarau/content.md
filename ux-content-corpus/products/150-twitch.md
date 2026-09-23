# 150. Twitch

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Live streaming platform with creator monetisation and real-time chat moderation |
| Primary URL | https://www.twitch.tv/ |
| Corpus rank | 150 |
| Benchmark strength (source list) | Live-state and community language |
| Locale / market observed | en-US (`/en/`); legal site offers 28 locales, Creator Camp offers a language switcher |
| Platform observed | Web — Creator Camp (creator education), developer docs, status page. Help centre and Safety Center unreachable |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | DMCA copyright regime with a published "Copyright School"; Monetized Streamer Agreement; Bits Acceptable Use policy; local subscription pricing by cost of living; Amazon-owned (Prime Gaming integration) |
| Harvest date | 2026-09-22 |
| Pages inspected | 18 URLs (10 returning usable content) |
| Harvest completeness | **Partial — the two most relevant domains are unreachable.** `help.twitch.tv` and `safety.twitch.tv` are Salesforce Lightning applications that return a `CSS Error` / `Sorry to interrupt` shell with no content. `legal.twitch.com` returns navigation and a build path but no policy body. `twitch.tv` returns an empty body. The Community Guidelines text was therefore **never obtained**. Everything usable comes from Creator Camp, the developer docs and the status page. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Twitch home | https://www.twitch.tv/ | **Empty body** — client-rendered; only meta description available |
| Help Portal | https://help.twitch.tv/s/?language=en_US | **Blocked** — Salesforce Lightning shell: `Loading`, `Sorry to interrupt`, `CSS Error`, `Refresh` |
| Community Guidelines (help path) | https://help.twitch.tv/s/article/community-guidelines?language=en_US | **Empty body** |
| Safety Center | https://safety.twitch.tv/s/?language=en_US | **Blocked** — same Lightning shell |
| Community Guidelines (safety path) | https://safety.twitch.tv/s/article/Community-Guidelines?language=en_US | **Blocked** — same Lightning shell |
| Community Guidelines (legal, no locale) | https://legal.twitch.com/legal/community-guidelines/ | Nav, locale list and footer render; **body absent**. Page ends with a leaked build path: `/home/ubuntu/actions-runner/_work/legal-hugo/legal-hugo/content/en/legal/community-guidelines.md` |
| Community Guidelines (legal, en) | https://legal.twitch.com/en/legal/community-guidelines/ | Identical — nav only, same leaked build path |
| Community Guidelines (twitch.tv path) | https://www.twitch.tv/p/en/legal/community-guidelines/ | 302 to `legal.twitch.com`; same empty body |
| Status page | https://status.twitch.tv/ | 302 to `status.twitch.com`; **rendered fully** — six components, incident history |
| Creator Camp home | https://www.twitch.tv/creatorcamp/en/ | **Rendered fully** — nine learning paths, chapter inventory, FAQ block |
| Twitch Etiquette | https://www.twitch.tv/creatorcamp/en/level1/get-to-know-twitch/twitch-etiquette/ | Rendered — chat-rules vocabulary, do/don't table |
| Assembling a Support Squad | https://www.twitch.tv/creatorcamp/en/level1/get-to-know-twitch/assembling-a-support-squad/ | Rendered — **the moderation-role and tooling source** |
| Policies, Guidelines, and Terms | https://www.twitch.tv/creatorcamp/en/level1/get-to-know-twitch/policies-guidelines-and-terms/ | Rendered — **the only enforcement and appeal copy obtained** |
| Raiding | https://www.twitch.tv/creatorcamp/en/level1/growing-your-community/raiding/ | Rendered — the raid state, in full |
| Subscriptions | https://www.twitch.tv/creatorcamp/en/level1/monetization/subscriptions/ | Rendered — sub tiers, benefit matrix, do/don't table |
| Bits | https://www.twitch.tv/creatorcamp/en/level1/monetization/bits/ | Rendered — Cheer, Cheermotes, Custom Power-Ups |
| Chat & Chatbots (dev docs) | https://dev.twitch.tv/docs/irc/ → /docs/chat | Rendered — chatter-list taxonomy, badge vocabulary, AutoMod mention |
| Chat Moderation (dev docs) | https://dev.twitch.tv/docs/chat/moderation/ | **Retrieved but unusable** — 85,234 characters, exceeded the tool's output limit; the spill file was not retrievable afterwards. Not read. |

---

## T1 Navigation & IA labels

`[absent]` for the product's own global nav — `twitch.tv` returned an empty body, so the signed-out nav, category browse and directory labels were not captured.

**Creator Camp nav — a course metaphor, not a product one** `[observed]`

`Home` · `Level 1` · `Level 2` · `Live Learning` · `Feedback` · `My Dashboard` · `My Channel` · `Languages` · `Log in` · `Sign up`

`Level 1` / `Level 2` is the primary IA axis, with `Live Learning` as a third, live-scheduled tier. The vocabulary is gamified throughout: `Paths` → `Chapters` → `Path Reward` → `Embark on this Path` → `Chapter Completed` → "Complete this path to unlock a **digital pin**!" A creator-education site structured as a game with unlockable cosmetics, for an audience of gamers. Coherent, and an unusually committed metaphor.

Also present: `Search`, `Reduce Motion` (a persistent accessibility control in the nav — see T14), and a breadcrumb chain rendered with arrow glyphs: `Paths` → `Growing your Community` → `Raiding`.

**Nine learning paths, each with a chapter count and duration** `[observed]`

| Path | Size | Scope line (verbatim) |
|---|---|---|
| `Get to Know Twitch` | `3 Chapters • 6 Minutes` | "This is where we'll cover the basics from setting up your channel page to some do's and don'ts straight from successful Partners." |
| `Going Live` | `8 Chapters • 11 Minutes` | "We have simplified the process of going live on Twitch, no matter how you stream." |
| `Establish Your Brand` | `4 Chapters • 12 Minutes` | "This is where we'll cover the basics of what to think about when building a brand." |
| `Growing your Community` | `7 Chapters • 18 Minutes` | "This is where we'll cover the basics on how to start and grow a community on Twitch." |
| `Content Categories on Twitch` | `9 Chapters • 37 Minutes` | "Whether you want to stream music, painting, gameplay, or outdoor hikes we will cover it here…" |
| `Monetization` | `6 Chapters • 19 Minutes` | "There are lots of tools to help you start making money on Twitch while building meaningful connections with your community." |
| `Copyrights & Your Channel` | `7 Chapters • 28 Minutes` | "Welcome to the Twitch Copyright School." |
| `Creator Sponsorships` (L2) | `5 Chapters • 10 Minutes` | "Explore Creator Sponsorships on Twitch. Learn about Twitch Sponsorship Certification and the benefits that come with it!" |
| `Better Broadcasts` (L2) | `4 Chapters • 10 Minutes` | "Learn why improving your stream quality is key to leveling up your content…" |

**Every path is labelled with its time cost, and so is every chapter** (`Twitch Etiquette` `2 minutes`, `Raiding` `2 minutes`, `Subscriptions` `3 minutes`). Duration-labelling at two levels of the IA is a strong commitment device for an audience being asked to read documentation instead of streaming.

Note **`Going Live` is path 2, before `Establish Your Brand` and `Growing your Community`.** Twitch teaches the mechanics of broadcasting before identity or audience — the opposite of Pinterest, which teaches consumption before creation. For a product where the unit of value is a live broadcast, getting the user live early is the right sequencing, and the IA encodes it.

`Copyrights & Your Channel` opens with "Welcome to the Twitch Copyright School." — a compliance regime given a school metaphor and a **quiz** (`Copyright School: Quiz`). Five of its seven chapters are prefixed `Copyright School:` as a namespace.

`Content Categories on Twitch` is the largest path at 37 minutes, and its chapters are the platform's own content taxonomy: `Gaming` · `IRL` · `Just Chatting, ASMR, & Talk Shows` · `Creative, Coding, & Co-working` · `Co-Streams & Sidecasting` · `Fitness & Health` · `Food & Drink` · `Music & DJs` · `VTubing`. That list is a genuine artefact — it is how Twitch names the things people do on it, and several of the names (`Just Chatting`, `IRL`, `Sidecasting`, `VTubing`) exist nowhere else. See T13.

**Footer** `[observed]` — Creator Camp: `Terms of Service` · `Privacy Policy` · `Ad Choices` · `Cookie Policy` · `Partners` · `Affiliate`. Note `Partners` and `Affiliate` — the two monetisation tiers — sit in the legal strip, which is where Twitch puts programme eligibility.

Developer-docs footer is organised by audience verb: `What We Do` (`Stream` · `Watch` · `Develop` · `Advertise` · `twitch.tv`), `Company`, `Newsroom`, `Products` (`Bits` · `Subs` · `Turbo` · `Prime` · `Extensions`), `Resources` (`Legal` · `Help Center` · `Security`), `Connect`.

**`Stream` / `Watch` / `Develop` / `Advertise` as the top-level "What We Do" labels** is the clearest statement of Twitch's audience model found in the harvest: two consumer-facing verbs and two commercial ones, with `Stream` first.

**Legal-site nav** `[observed]`: `Terms of Service` · `Terms of Sale` · `Privacy Notice` · `Privacy Choices` · `Monetized Streamer Agreement` · `Open Source Attribution`. `Monetized Streamer Agreement` as a top-level legal document names the creator as a contracting party. `Privacy Choices` (as distinct from `Privacy Notice`) is the consent-control surface given its own entry.

**Help-centre IA** `[absent]` — `help.twitch.tv` is a Salesforce Lightning app and served no content. Twitch's support category tree, article inventory and routing furniture are entirely unharvested. This is the largest gap in the file.

## T2 Value proposition & headline patterns

**The only product-level positioning statement obtained** `[observed]`, from the `twitch.tv` meta description:

> "Twitch is an **interactive livestreaming service** for content spanning gaming, entertainment, sports, music, and more."

`interactive livestreaming service` — the coined category noun, with `interactive` doing the differentiating work. Five verticals enumerated, gaming first. No hero headline, no subhead, no benefit framing was reachable.

**Creator Camp hero** `[observed]`

> H1: `Learn.  Create.  Thrive.`
> Body: "**Knowledge is power and Creator Camp will make you more powerful than ever.** Start your streaming journey today."
> CTAs: `Let's Go!` · `Log In`

Three one-word imperatives with full stops — a triptych headline. The body is a straightforward empowerment claim, and `Let's Go!` is the most enthusiastic primary CTA in this batch.

**Creator Camp's self-description sets the register** `[observed]`

> "Learn the basics of streaming, hone your skills, and get tips and tricks from streamers who have walked the same path you're on now. **All without bug spray, sunburns, and cheesy singalongs (ok, maybe a few singalongs).**"

A camp metaphor extended to a joke about camp, with a self-undercutting parenthetical. The "streamers who have walked the same path you're on now" clause is the positioning: peer authority, not platform authority.

**Section-header pattern — noun-phrase topics, sentence case** `[observed]`

`Get to Know Twitch` · `Going Live` · `Establish Your Brand` · `Growing your Community` · `Monetization` · `Choosing a Moderator` · `Additional Levers of Support` · `Community Safety` · `Incoming Raids` · `Suggested Channels` · `Bonus Sub Benefits` · `Best Practices` · `Custom Power-Ups Inspiration` · `Bits in Extensions` · `Bits Acceptable Use` · `What's Next`

Consistent, plain, and — notably — **casing drifts within the set**: `Growing your Community` (lowercase "your") against `Establish Your Brand` and `Get to Know Twitch`. The same drift appears in `Copyrights & Your Channel`. Minor but visible in a nine-item nav.

**`Additional Levers of Support` is the one piece of internal ops-speak** in Creator Camp's headers — "levers" is a strategy word, not a creator word, and it heads the section explaining `Editor`, `VIP` and `Artist` roles.

**Live-state framing on the status page** `[observed]`

> "**Twitch is always live—except for when it's not.**"
> "See which areas of Twitch are **thriving or having a bit of a rough day** below."

The status page headline is a joke about the product's own core claim, and its component-state framing is anthropomorphic ("thriving", "having a bit of a rough day"). Compare Discord's status page, which is entirely neutral. Twitch has extended its creator-facing voice onto its incident surface — which, like Discord's joke help-centre glosses, is voice spent at a moment of user cost. Recorded as observed.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Let's Go!` | Creator Camp hero, primary | Anchors to `#path-selector` — an in-page jump, not a destination |
| `Log In` / `Log in` | Hero / nav | **Two casings**, both present on one page |
| `Sign up` | Nav | |
| `Embark on this Path` | End of each path card, nine times | Metaphor-consistent; the most distinctive CTA in this batch |
| `Next Chapter` | Foot of every chapter | Plus a bare `←` glyph for the previous chapter — **the back-control has no accessible label**, only an arrow |
| `Chapter Completed` | Chapter list items | A state label rendered inside a link |
| `My Dashboard` / `My Channel` | Nav | First-person possessive |
| `Search` | Nav | |
| `Reduce Motion` | Nav, persistent | An accessibility toggle in the primary nav — see T14 |
| `Feedback` | Nav | Routes to `twitch.uservoice.com` — a third-party domain, not disclosed as such in the label |
| `Back` | Nav drawer | |
| `Skip to content` | First in DOM | Correct |
| `Twitch Help Page (opens in a new window)` | Creator Camp foot | **The new-window warning is inside the link text** — good practice, and unusual |
| `Twitch Safety Center (opens in a new window)` | Creator Camp foot | Same pattern |
| `Community Guidelines (opens in a new window)` | Creator Camp foot | Same pattern |
| `Twitch Blog (opens in a new window)` | Creator Camp foot | Same pattern |
| `Contact us` | Status page | "`Contact us` with any questions or concerns, or follow `@TwitchSupport` for updates" |
| `Help Portal` | Status page nav | A different label for the same destination the footer calls `Help Center` |
| `Subscribe to Updates` → `Subscribe` | Status page | |
| `Resend OTP` | Status page email/SMS subscribe | |
| `← Incident History` | Status page foot | |
| `Refresh` | Help/Safety Center error shell | **The only interactive control Twitch's help centre served** |
| `/raid` | Chat command | `[documented]` — "typing `/raid` followed by the channel name to start the raid count down" |
| `Stop Raids` | Stream Manager quick action | `[documented]` — "Add the `Stop Raids` quick action to your stream manager and use it at any time during your stream to disable all incoming raids" |
| `Shield Mode` | Moderation control | `[documented]` |
| `Add to Post` | (Discord) | — |

**Observation:** Twitch's four **`(opens in a new window)`** suffixes at the foot of Creator Camp are the best accessibility-in-link-text practice found in this batch — the warning is part of the accessible name rather than an icon. Against that, the chapter-back control is a bare `←` with no label, and `Let's Go!` is a same-page anchor dressed as a primary CTA.

`Embark on this Path` is worth keeping. It is nine words of brand voice doing the work of "Start" — and because the IA has already established `Paths` as the object, the CTA is also literally accurate.

## T4 Onboarding & getting-started

**Creator Camp *is* Twitch's onboarding content**, and it is onboarding for the **creator**, not the viewer. No viewer-side onboarding surface was reachable.

**The structure: Paths → Chapters → Path Reward** `[observed]`

Each path card carries: title, `N Chapters • N Minutes`, a scope sentence, a numbered chapter list with per-chapter durations, a `Path Reward` badge image, and `Embark on this Path`. Each chapter page carries a breadcrumb, a video, prose, and `Next Chapter`.

**`Going Live` is the onboarding spine and it is organised by hardware, not by task** `[observed]`

`Stream on PC` · `Stream on Mobile IRL` · `Stream Mobile Gaming` · `Stream on Playstation` · `Stream on Xbox` · `Creator Dashboard` · `Stream Manager` · `What You Need to Stream`

Five device paths, then two tool introductions, then — **last** — `What You Need to Stream`. The prerequisites chapter is at position 8 of 8. Either a deliberate "just start" ordering or an ordering accident; either way a user reading in sequence configures five platforms before being told what equipment they need.

Note the naming: `Stream on Mobile IRL` and `Stream Mobile Gaming` are two mobile chapters distinguished by *content type*, with `IRL` used unglossed in a chapter title.

**The three-chapter `Get to Know Twitch` path is the actual first-run content**, and its ordering is the interesting part:

1. `Twitch Etiquette` — how to behave
2. `Assembling a Support Squad` — how to protect yourself
3. `Policies, Guidelines, and Terms` — the rules and what happens if you break them

**Twitch's first onboarding chapter is about conduct, and its second is about moderation.** Before teaching a new creator how to stream, Twitch teaches them how to behave in other people's channels and how to build a moderation team. For a live medium where the failure mode is a hostile chat, front-loading conduct and moderation is defensible — and it is the inverse of Discord's Beginner's Guide, which front-loads the object model.

**`Twitch Etiquette` teaches rules-authoring as a creator task** `[observed]`

> "With every broadcast, you represent yourself, your brand, and your community. **Modeling the type of behavior you want your viewers to also champion can help curate a community that reflects you.**"

> `Rules` — "Establish a clear set of rules and boundaries to guide your chat and community interactions. **You can add a custom message to highlight guidelines that new chatters will have to agree to before they can begin chatting.**"

A **chat-rules consent gate** is described: new chatters must agree to the channel's rules before their first message. The exemplar rules are visible in the accompanying image alt text (see T14) and are a real artefact of community-rule conventions: `No hate speech`, `No racism or sexism`, `No homophobia or transphobia`, `No backseat gaming`, `No spamming messages`. Four of five are harm rules; the fifth (`No backseat gaming`) is a community-specific norm with no analogue outside live streaming. The welcome copy in the same image: "Welcome to the chat room! Make sure to follow the rules below to **keep the conversation fun and friendly for everyone.**"

**The Do/Don't table is Creator Camp's signature instructional device** `[observed]`, used in at least three chapters:

`Twitch Etiquette`:
| **Do** | **Don't** |
|---|---|
| Develop your own unique set of rules for your channel and chat to follow · Spend time in communities that are fun, inspiring, and encouraging · Connect with other creators on and off of Twitch · Consider what opportunities you have to celebrate your viewers, subscribers, and communities that raid | **Assume everyone will follow the rules you create** · Promote your own channel or others in another creator's chat or channel · Place personal expectations on how someone does or does not respond to you |

`Subscriptions`:
| **Do** | **Don't** |
|---|---|
| Set Sub and Bits goals for each stream · Acknowledge viewer support through visual alerts and a verbal "thank you" · Provide bonus Sub benefits and a reason to subscribe · Create custom Emotes, Sub Badges, and Bit Badges to recognize supporters | **Be afraid to talk about money. Your community wants to support you.** · Ignore or minimize small contributions · Make anyone feel guilty if they cannot Subscribe or use Bits |

The `Don't` columns are the valuable half. "**Don't be afraid to talk about money. Your community wants to support you**" is a *negated inhibition* rather than a prohibition — the Don't column is being used to give permission. And "Don't make anyone feel guilty if they cannot Subscribe or use Bits" is an ethical constraint on the creator's monetisation behaviour, placed inside the monetisation lesson. Twitch is doing solicitation-ethics content design for its own revenue feature.

**`TWITCH TIP:` as a recurring inline device** `[observed]` — italic, bold-labelled asides appearing in most chapters:

> ***TWITCH TIP:*** *Give your viewers a message to paste into the stream you will be raiding. Keep it positive and add an emote or two!*
> ***TWITCH TIP:*** *Pre-roll ads do not play when a raid begins in a channel. So you can send and receive raids worry free!*
> ***TWITCH TIP:*** *Set a Subscription goal in your Twitch Dashboard to encourage subscriptions from your community!*
> ***TWITCH TIP:*** *Highlight viewers that are a perfect fit for your community. Uplift and showcase members who positively contribute to your broadcast.*
> ***TWITCH TIP:*** *Many streamers keep their view count hidden while they stream. Bringing up how many viewers a streamer has, regardless of the number, is often not appreciated…*
> ***TWITCH TIP:*** *You can also block the users, even if they haven't broken the Terms of Service, to stop seeing their messages and prevent them from messaging you.*
> ***TWITCH TIP:*** *Creators that use monetized extensions tend to generate on average 280% more Bits revenue than those that don't.*

A single named callout type carrying tactics, social norms, product facts and one statistic. The view-count tip is the most interesting: it teaches an **unwritten community norm** (don't mention viewer counts) with the reason ("Creators set their rules to keep themselves and their community in good spirits"). Documenting a subculture's etiquette inside official onboarding is rare and valuable.

**`What's Next` as a chapter-closing pattern** `[observed]` — `Assembling a Support Squad` ends with three named homework items, each a task plus a reflective question:

> **`Check Rules for Broadcast`** — "Review your rules. Check to make sure they match the vibe of the community you are creating. **How many rules are too many?**"
> **`Check Moderation Settings`** — "Twitch recommends starting with **Automod Level 2** and adjusting as necessary. Are there key terms or phrases that may throw off your performance?…"
> **`Compare 5 Channels`** — "Each channel is unique on Twitch - compare how different channels create a welcoming environment for their communities. **Which channels do you feel most comfortable chatting in?** What are some elements you can add to your channel?"

Task, then an open question the documentation does not answer. Coursework structure, consistent with the `Level`/`Path`/`Chapter`/`Reward` metaphor. And a **published default recommendation** — "Twitch recommends starting with Automod Level 2" — which is the only place in this batch where a platform tells a moderator which setting to pick.

## T5 Form & field labels

`[documented]` — thin. No live form was reachable and the help centre, which would carry configuration paths, is blocked.

**Configuration surfaces named** `[documented]`

| Surface | What is set there |
|---|---|
| `Creator Dashboard` | The umbrella dashboard; contains `Stream Manager`, the `raid browser`, `Alerts`, `Power-Ups and Channel Points` |
| `Stream Manager` | Where a raid is started; where `Stop Raids` is added as a **quick action** |
| `incoming raid settings` | Parameters: "viewer count, account age, team mates, followed channels, Affiliate and Partner channels, and more" |
| `Twitch Dashboard` | Where a `Subscription goal` is set |
| Moderation settings | `AutoMod` with **levels** (`Automod Level 2` recommended); `block lists` for "key terms or phrases" |
| Channel settings | `Subscriber-only archives` toggle (enables Sub-Only VODs) |

**`incoming raid settings` is the most interesting configuration vocabulary in the file.** A creator can gate incoming raids on six named signals — viewer count, account age, team membership, whether they follow the channel, and whether the raider is an Affiliate or Partner. That is a **trust-signal filter** expressed as a settings screen, and the signals are exactly the ones a fraud or risk system would use. Directly analogous to velocity and account-age rules in payments risk.

`Custom Power-Ups` configuration is described with its own naming guidance rather than field labels: "The best rewards are things only you can deliver, like '**recommend who we raid**', '**select my hat**', '**customize a character**', or '**write a poem for me.**'" Four exemplar reward names, all first-person-plural or imperative, all specific. And a template library is offered, grouped by context:

| `Twitch` | `Game` | `IRL` |
|---|---|---|
| `Extend Stream by __ Min` · `Emote Only Chat` · `Request a Poll` · `Streamer Q&A` | `Ban an In-Game Action` · `Reset my Speedrun` · `Drop a Weapon` · `Choose a Character` | `Stop from Speaking` · `Give a Treat to my Pet` · `Dance Break` · `Singing Only, No Speaking` |

`Extend Stream by __ Min` shows the blank-field convention (`__`) in a template name. `Ban an In-Game Action` reuses `ban` in a non-moderation sense — see T13.

Live field labels, placeholders, validation and error text: `[absent]`.

## T6 Account, content and live states

**PRIORITY SECTION.** Live streaming has states no other medium has, and Twitch's vocabulary for them is the reason this product is in the corpus. The harvest captured the **creator-facing** state vocabulary well and the **enforcement** state vocabulary only in outline.

### 6a. Broadcast states

| State | Twitch's word(s) | How it is described |
|---|---|---|
| Live | `live`, `going live`, `broadcast` | The whole of path 2 is `Going Live`; the status page says "Twitch is **always live**—except for when it's not." Creator Camp's own live banner reads `LIVE` with "**Creator Camp is live right now!**" and the current programme title |
| Offline | `offline channel page`, `when you are not live` | Defined by what appears in its place: "`Suggested channels` appear as embeds on your channel carousel **when you are not live.** They allow broadcasters to choose a list of channels to be featured on their **offline channel page**." The offline state is a **curated surface**, not an absence |
| Raiding (outbound) | `raid`, `/raid`, `raid count down` | "a way to **send your viewers to another live channel at the end of your stream**" |
| Raided (inbound) | `Incoming Raids`, `raiders` | A distinct state with its own settings, its own etiquette guidance and its own kill switch |
| Past broadcast | `past broadcasts`, `VODs` | "Past broadcasts can be viewed by anyone." Both terms used for the same object in one table cell |
| Sub-gated VOD | `Sub-Only VODs`, `Subscriber-only archives` | Two names: the benefit is `Sub-Only VODs`, the setting is `Subscriber-only archives` |
| Clipped | — | **`[absent]`.** Clipping is referenced only obliquely, via a role permission ("Setting channel clipping permissions" appears inside an `Editor` role link fragment). The `clip` object, its states and its language were **not observed** and are not described here |
| Co-streaming | `Co-Streams & Sidecasting` | A chapter title; the states themselves not described |
| Dual format | `Dual Format` | A chapter title in `Better Broadcasts`; not described |
| Enhanced broadcasting | `Enhanced Broadcasting` | Chapter title only |

**The raid is the standout live state** because it is a *transition* rather than a condition, and Twitch describes it from both ends.

Outbound, from `Raiding`:
> "`Raids` are a way to **send your viewers to another live channel at the end of your stream.** When you raid, **your channel is introduced to a streamer and their audience.** Raiding builds relationships in the streaming community, which leads to new friendships, collaborations, follows, subs, and broadens your connection to new streamers."

The benefit is stated as a **reciprocal introduction** — you send your audience away and your channel gets introduced. That reframing is what makes an apparently self-harming action attractive, and it is the core piece of persuasion in the chapter.

Operational guidance: "A great strategy is making raiding part of your **sign-off routine**. Before ending your broadcast, take a minute to find someone to raid." Three discovery routes are named: browsing the category you streamed in, the `raid browser` in the Creator Dashboard, and friends' recommendations. And: "**Raided broadcasters benefit the most when the raiders engage in the chat.**"

Inbound, from `Incoming Raids`:
> "When someone raids you, **acknowledge them promptly and positively. Thank the raider by name and give them a shoutout if you're comfortable. Help new viewers feel welcome by greeting them and sharing a bit about yourself and your stream.** When viewers feel welcomed and like the vibe of your stream they may stick around and even become a part of your community."

**Twitch scripts the host's response to a state change.** "Thank the raider by name", "give them a shoutout if you're comfortable", "sharing a bit about yourself" — this is verbal-behaviour guidance for a real-time event, with an opt-out clause built in ("if you're comfortable"). No other product in this batch writes copy that tells the user what to *say*.

And the state has an emergency exit: "If needed, you can **stop raids** at any time **for an hour**. Add the `Stop Raids` quick action to your stream manager and use it at any time during your stream to **disable all incoming raids.**" A one-hour, one-click kill switch on an inbound social state — the raid is simultaneously a growth feature and an attack vector, and Twitch ships both the feature and the defence in the same chapter. (Compare Discord, where `raid` is *only* an attack. See T13.)

One monetisation interaction disclosed: "**Pre-roll ads do not play when a raid begins in a channel.** So you can send and receive raids worry free!" The friction a creator would fear — dumping your audience into an ad break — is pre-emptively removed and stated.

### 6b. Chat states

| State | Twitch's word(s) | Consequence as worded |
|---|---|---|
| Slow mode | `slow mode`, `slow chat` | Moderators can "slow chat"; `VIP`s "are not affected by slow mode"; subscribers may get `No Slow Mode` — "Subscribers of your channel can **bypass the slow mode filter** and post messages without timed restrictions" |
| Subscriber-only | `Subscriber-Only chat`, `sub-only` | "Anyone who meets the standard settings you establish for your channel can talk in your chat. **Subscriber-Only chat permits only those subscribed to your channel to post in the chat.**" |
| Emote-only | `Emote Only Chat` | Appears only as a Custom Power-Up template name |
| Held for review | (AutoMod) | "`AutoMod` can **hold potentially inappropriate or offensive messages** from the chat for you or your moderators to **review before they are posted.**" A pre-publication hold state |
| Shield Mode | `Shield Mode` | Named as a moderator capability; **not described.** Its actual effect was not obtained |
| Timed out | `timeout`, `time out or ban users`, `processing timeouts or bans` | Named as a moderator action; **duration options and consequences were not obtained** (the help article is blocked) |
| Banned | `ban`, `bans`, `chat bans` | Named; the article that defines it (`about-account-suspensions-dmca-suspensions-and-chat-bans`) is on the blocked domain |
| Blocked (by a user) | `block` | "You can also **block the users, even if they haven't broken the Terms of Service**, to stop seeing their messages and prevent them from messaging you." A **no-violation-required** user-level remedy, explicitly distinguished from reporting |

**The AutoMod hold state is the most distinctive chat state** because it is *pre-publication*: the message never appears, a moderator decides, and only then is it posted or discarded. From the developer docs: "**AutoMod analyzes chat messages and flags potentially risky messages for a channel moderator, who can then allow them to or prevent them from appearing in chat.**" And AutoMod has **levels** — "Twitch recommends starting with `Automod Level 2`" — a numeric aggressiveness dial rather than a category toggle. That is a meaningfully different moderation-content problem from Discord's rule-based AutoMod: the user is choosing a *sensitivity*, and the only guidance is a recommended starting number.

Verified bots are explicitly **not** exempt: "**Aren't exempt from AutoMod mode.**" Note `AutoMod mode` — a third name for the feature, appearing once in the dev docs.

### 6c. Chatter and role states

From the developer docs, the **chatter-list taxonomy** `[observed]`:

> "recategorization of the chatbot user in **`Users in Chat`**, also commonly referred to as the '**chatters list**,' to appear under the segment **`Chat Bots`**."

Two names for one surface (`Users in Chat` / `chatters list`, the second flagged as colloquial) and a named segment within it (`Chat Bots`). Also: `Chat Badge`, `Chat Bot Badge`, `global vanity badge` — a badge hierarchy where the bot badge **displaces** the vanity badge in the same slot. Referenced articles (blocked): `how-to-use-badges`, `twitch-chat-badges-guide`, `understanding-viewer-count-vs-users-in-chat`.

**`understanding-viewer-count-vs-users-in-chat` is a telling article slug** — a dedicated explainer for the gap between two numbers the product shows. Same species as Wise's "why does it say complete" article: the help centre patching a place where the platform's own metrics confuse people.

**The channel role ladder** `[observed]`

| Role | What it grants, as worded |
|---|---|
| `Moderator` | "greet new and returning viewers, engage with your chat, and help keep your channel safe." Recognised "with a **visible in-chat badge**"; can "slow chat, initiate `Shield Mode`, **time out or ban users**" |
| `Editor` | "can **access your dashboard**. They are able to run ads, edit information, upload videos and more." |
| `VIP` | "hold **special badges** in chat and are **not affected by slow mode, sub-only, rate limits** and more." |
| `Artist` | "members of your community who have **contributed to the brand or style of your channel.**" |
| `Broadcaster` | The channel owner; used as a permission tier throughout the dev docs |
| `Subscriber` | Paying supporter; tiered |
| `Chat Bot` | A segment, not a role |

**`Artist` is a purely honorific role** — it confers recognition for creative contribution and no functional capability is described. A role whose entire purpose is credit. Worth noting alongside Discord's `vanity roles`: both platforms have discovered they need a way to say thank you in the permission system.

`VIP` is defined **by the moderation states it is exempt from** — not affected by slow mode, sub-only, or rate limits. The role is a bundle of negations. That is an unusual and efficient way to define a privilege tier, and it only works because the restriction states are already named.

### 6d. Creator programme states

`Affiliate` and `Partner` are the two monetisation tiers, and eligibility is stated as a gate: "To start monetizing your Twitch channel, **you'll first need to achieve Affiliate status.**" Both appear in the legal-strip footer and both are usable as **raid-filter signals** ("Affiliate and Partner channels"), so programme status doubles as a trust signal. `Sponsorship Certification` is a third, separate credential with its own Level 2 chapter.

`Monetized Streamer Agreement` (legal nav) and `monetized users` (Creator Camp prose) indicate `monetized` is the adjectival state. `Monetization Moments` is a named chapter but the concept was not described.

### 6e. Platform status states

`[observed]` from `status.twitch.com`: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`.

**Six components, and the naming is the artefact:**

`Login` · `Web` · `Chat` · **`Video (Watching)`** · **`Video (Broadcasting)`** · `Purchases`

Twitch splits video into **watching** and **broadcasting** as separate status components. For a live platform that is the correct and non-obvious decomposition — a creator whose upload path is down has a completely different problem from a viewer whose playback is down, and the status page lets each self-diagnose. Compare Discord's 28 components, which decompose by infrastructure (API, Gateway, Media Proxy, plus 15 voice regions); Twitch's six decompose by **user job**. Six user-legible components beat 28 infrastructure-legible ones for a consumer status page.

Empty/healthy states: `All Systems Operational` · `No incidents reported today.` · `No incidents reported.`

## T7 Error, failure & recovery

`[observed / documented]`, thin — the help centre that would carry recovery copy is blocked.

**Twitch's own help centre is the largest failure state observed in this harvest** `[observed]`

`help.twitch.tv/s/` and `safety.twitch.tv/s/` both served:

> `Loading`
> `Sorry to interrupt`
> `CSS Error`
> `Refresh`

That is Salesforce Lightning's generic framework error, surfaced unbranded and untranslated to anyone whose client cannot execute the app. `Sorry to interrupt` is a strange apology — it is Twitch's page that has failed, not the user who has been interrupted — and `CSS Error` is a developer-facing diagnostic shown to a consumer. The only offered remedy is `Refresh`, which does not help. **A user seeking the Community Guidelines or the Safety Center from a low-capability client is shown a stylesheet error.** Recorded as the most consequential defect in this file.

**Incident communication** `[observed]` — `status.twitch.com` uses a two-stage vocabulary, narrower than Discord's four:

> **Investigating** - "🛠 We have identified an issue causing some users to be unable to checkout on Android devices. We're currently working to resolve this issue."
> **Resolved** - "🛠 We have resolved all known issues causing some users to be unable to checkout."

Note the **mismatch**: the update labelled `Investigating` says "We have identified an issue" — the stage label and the copy disagree. Discord's equivalent has a distinct `Identified` stage for exactly this. Twitch appears to use `Investigating` as a catch-all for everything pre-resolution, which makes the label less informative than the prose.

The 🛠 emoji prefixes both updates. Scope is stated ("some users", "on Android devices") and the incident title is plain (`Identified Checkout Issues` — note the stage name leaking into the *title*). Timestamps are UTC.

**Routing on failure** `[observed]`: "Need assistance? `Contact us` with any questions or concerns, or follow `@TwitchSupport` for updates." A live X/Twitter feed is embedded on the status page as a secondary channel.

**Documented recovery topics** `[documented]`, from article slugs referenced in Creator Camp and the dev docs — all on blocked domains, titles inferred from slugs and therefore **not quoted as UI strings**: `how-to-manage-harassment-in-chat` (with `#ShieldMode` and `#StopRaids` anchors), `about-account-suspensions-dmca-suspensions-and-chat-bans`, `how-to-file-a-user-report`, `understanding-viewer-count-vs-users-in-chat`, `local-subscription-pricing`, `Managing-Roles-for-your-Channel`.

**Developer-side failure copy** `[observed]` — the dev docs handle a paused process honestly:

> "Reviews for chatbot verification **continue to be temporarily paused while we revise our processes.** Reviews for Extensions, developer organizations, and game ownership **have resumed.** Thank you for your patience and understanding."

Blockquoted at the top of the page. States what is paused, states what is *not* paused, and gives a reason. The scope-of-the-outage-plus-scope-of-the-unaffected construction is the same one Discord uses in its Google Pay incident, and it is the right shape.

Rate-limit failure is stated as a consequence with a duration: "**If you exceed these limits, Twitch ignores the bot messages for 1 hour**, except in chats where the chatbot's user account is the broadcaster, a moderator, or a VIP." And the verified-bot request path ends with a non-committal outcome: "After Twitch reviews the request, Twitch sends its determination to the requestor **via email**." Plus, bluntly: "**note that verified bot status is rarely granted.**" Expectation-setting on an application before the user applies.

Error titles, validation messages and in-product recovery copy: `[absent]`.

## T8 Empty states

`[observed]`, limited.

**Status-page empty states** `[observed]`: `All Systems Operational` · `No incidents reported today.` · `No incidents reported.` — same today/prior-day split as Discord.

**Offline channel page is an empty state treated as a feature** `[observed]` — the most interesting empty-state design in this batch. When a channel is not live there is nothing to watch, and Twitch fills the gap with **creator-curated recommendations**:

> "`Suggested channels` appear as embeds on your channel carousel when you are not live. They allow broadcasters to choose a list of channels to be featured on their **offline channel page**. You can suggest any streamer and they can suggest you too."

The empty state is **populated by the creator, reciprocally, with competitors' channels.** A live product's dominant empty state is a channel that is off, and Twitch's answer is to let the absent creator hand the visitor to a peer — the same reciprocal-introduction logic as the raid, applied to the offline case. For any product with a recurring "nothing here right now" state, the pattern is: let the owner decide what fills it, and make the filling mutually beneficial.

**Creator Camp progress empty state** `[observed]`, partially: chapter lists render `Chapter Completed` labels and paths render `Completion:` with an empty value for a signed-out user, plus "Complete this path to unlock a digital pin!" as the unearned-reward state. The completion indicator renders with no value rather than a zero or a "not started" label — a minor unstyled-empty-value defect.

In-product empty states (no followed channels, no clips, empty chat, no VODs): `[absent]`.

## T9 Enforcement notification and appeal copy

**PRIORITY SECTION**, and **the weakest section in this file** — not because Twitch's enforcement copy is poor, but because the documents containing it are on blocked domains. What follows is everything obtainable, and it comes from a single Creator Camp chapter.

**The full enforcement statement obtained** `[observed]`

> ## `Enforcement`
> "When content is reported to us, we issue **enforcements** against accounts that we determine to have violated our Terms of Service and/or Community Guidelines. **Violations of our Community Guidelines carry different enforcement outcomes such as warnings, temporary suspension, and indefinite suspension.**"

Three named account states: `warnings` → `temporary suspension` → `indefinite suspension`.

**`indefinite suspension` is the notable term.** Not "permanent", not "ban" — *indefinite*. The word does not commit Twitch to irreversibility, and it does not promise the user a return. Compare Discord's `Permanent suspension` ("do not expire… The user will lose their account"), Reddit's `permanent ban`, and Pinterest's `deactivation`. Twitch alone chooses a term that is honestly open-ended: the suspension has no defined end, which is different from having a defined end at infinity. Whether that is kindness or evasion is arguable; it is certainly the most legally careful of the four.

No durations, no tariff, no ladder mechanics, and no notification copy were obtainable. The article that defines these states (`about-account-suspensions-dmca-suspensions-and-chat-bans`) is on the blocked help domain — and note from its slug that Twitch distinguishes **three** suspension species: account suspensions, **DMCA suspensions**, and chat bans. A copyright-specific enforcement track is a live-medium necessity (music on stream) and Twitch names it as its own state family. The states themselves are `[absent]`.

**The appeal copy, in full** `[observed]`

> ## `Appeals`
> "If you believe you incorrectly received account enforcement, you may appeal. **Successful appeals usually include remorse, taking responsibility, or additional context and deeper details on the specific incident that demonstrate an error was made.** To appeal, go to our appeals portal located at `https://appeals.twitch.tv`."

This is a remarkable and, in one respect, troubling piece of copy, and it is worth unpicking.

First, **Twitch tells the appellant what a winning appeal contains** — which is genuinely useful and almost unique. No other product in this batch coaches the user on how to appeal successfully.

Second, the list is **internally contradictory**. It offers four ingredients: `remorse`, `taking responsibility`, `additional context`, and `deeper details… that demonstrate an error was made`. The first two are admissions of guilt; the last is an assertion of innocence. The sentence opens by addressing someone who "believe[s] you incorrectly received account enforcement" — i.e. someone who thinks they did nothing wrong — and then advises them that successful appeals "usually include remorse." A user who is innocent is being told that contrition improves their odds.

That is either an honest disclosure of how the review process actually behaves, or an accidental admission that the appeal channel rewards submission over evidence. Either way it is the most consequential sentence in Twitch's public enforcement copy, and a content designer should read it as a warning: **do not describe the qualities of a successful appeal unless those qualities are strictly evidentiary.** "Remorse" is not evidence, and listing it first tells the appellant that the process is not primarily fact-finding.

Third, `appeals.twitch.tv` is a **dedicated subdomain for appeals** — a first-class surface, not a form buried in help. That is a structural commitment other platforms do not make (Discord uses a Zendesk `ticket_form_id`; Pinterest uses a Help Centre contact form).

**Reporting copy** `[observed]`

> ## `Reporting`
> "You can **report confidentially** through the reporting tools on each streamer's channel page. **Mass reporting or repeatedly reporting the same content will not increase the speed at which a report is investigated or increase the likelihood of enforcement.**"

Two moves in two sentences: confidentiality promised, and **brigading pre-empted with a flat statement that it does not work.** The second sentence is defending against coordinated reporting campaigns, which are a live-platform-specific problem (a hostile community mass-reporting a streamer). Reddit and Pinterest both publish *consequences* for report abuse; Twitch instead publishes its *ineffectiveness*. Telling users the tactic does not function is a lighter-touch deterrent than threatening them, and arguably more effective.

Also observed, in `Assembling a Support Squad`: "To make sure Twitch's Terms of Service and Community Guidelines are followed, our team of trained moderators are on the beat **24/7/365** to review **every report.**" A coverage claim and a completeness claim in one sentence. "on the beat" is police metaphor.

And a block/report distinction: "**You can also block the users, even if they haven't broken the Terms of Service**, to stop seeing their messages and prevent them from messaging you." The user-level remedy is explicitly available **without** a policy violation — so Twitch separates "I don't want to see this person" from "this person broke the rules". That distinction is well drawn and is the same one Instagram's `restrict`/`block`/report triad attempts less clearly.

**The three-document framing** `[observed]` — Creator Camp teaches the policy stack with a one-line definition each:

> **`Policies`** — "`Terms of Service` are rules that guide **all users** of Twitch."
> **`Guidelines`** — "`Community Guidelines` define **how users can participate on Twitch** in a way that promotes a friendly, positive experience for our global community."
> **`Terms`** — "`Terms of Sales` are rules about **purchases of products, services, and digital content** made available by Twitch."

Three documents, three scopes (everyone / participation / purchases), one sentence each. Clean — though the group labels are confusing: the ToS is filed under `Policies`, and `Terms of Sales` (sic — the document is `Terms of Sale`) is filed under `Terms`. **Twitch's own naming of its policy categories does not match the documents' names**, and the chapter title (`Policies, Guidelines, and Terms`) enshrines the mismatch.

**Bits-specific conduct rules** `[observed]`

> ## `Bits Acceptable Use`
> "**Do not solicit Bits in exchange for money, donations, items, or services. Selling, trading, bartering, or transferring Bits to other users in exchange for currency or using Bits to bet or wager is prohibited.**"

A virtual-currency anti-money-laundering and anti-gambling rule, stated in two sentences in a creator-education chapter, with a link to the full `bits-acceptable-use` policy. The enumeration (`selling, trading, bartering, or transferring`) and the explicit gambling prohibition (`bet or wager`) are the kind of specificity a payments product would recognise.

**What is entirely absent** `[absent]`: the Community Guidelines text; the suspension-notification copy; suspension durations; the DMCA-suspension state; chat-ban mechanics; timeout durations and consequences; `Shield Mode`'s actual effect; the appeal form's own copy; any turnaround time; any transparency-report vocabulary.

## T10 Disclosures, legal & compliance

**Copyright is Twitch's dominant compliance regime, and it is taught as a school** `[observed]`

The `Copyrights & Your Channel` path is seven chapters, five of them namespaced `Copyright School:`:

- `Copyright School: What do I need to know about copyright law?`
- `Copyright School: Why are copyright laws important for me to think about?`
- `Copyright School: What happens if you violate copyright law?`
- `Copyright School: Resources & Tools`
- `Copyright School: Quiz`
- `Understanding Copyright Law and the DMCA as a Twitch Streamer`
- `Resources and Tools to Help Streamers Build Good Habits`

Path scope line: "**Welcome to the Twitch Copyright School.**"

**Three question-shaped chapter titles in sequence — what, why, what-happens-if.** The third (`What happens if you violate copyright law?`) is the consequence chapter, and it is the longest at 6 minutes. A **quiz** at the end converts the education into a completion artefact. For a live medium where the commonest violation is background music, building a named school with a quiz is a proportionate content-ops response — and the phrase "Copyright School" is borrowed from YouTube's equivalent, so this is a genre convention rather than a Twitch invention.

Note the register split inside one path: "What do **I** need to know" (first person) sits beside "What happens if **you** violate" (second person). Two chapters, two persons, one path.

`Resources and Tools to Help Streamers Build Good Habits` frames compliance as **habit formation** rather than rule-following. That is the right frame for a repeated-live-broadcast risk and it is a reusable one for any recurring-compliance obligation.

**Cost-of-living-adjusted pricing, disclosed as a creator benefit** `[observed]`

> "**Twitch subscription prices are adjusted to reflect the cost of living where subscribers reside.** `Local subscription pricing` helps creators grow their community and revenue and **provides the same subscription benefits.**"

Geographic price discrimination disclosed to the *creator* (whose revenue per sub varies) with two reassurances: it grows revenue, and the benefits are identical everywhere. The second clause pre-empts the obvious objection — that cheaper subs are worth less. Named as a product (`Local subscription pricing`) with its own help article.

**Subscription mechanics disclosed** `[observed]`

- "A `Sub` allows a viewer to pay a **monthly rate** to support your channel. This can be either **recurring or on a one-time basis.**"
- "There are **multiple tiers** available to subscribers that want to provide additional levels of support by raising the monthly rate."
- `Gifted subscriptions` — "a way for viewers to **gift a sub to your channel to another user.** Gifted subs support your channel like a typical sub and **gift recipients have the option to become a regular subscriber after their gifted sub expires.**" Available "in single or multi month lengths."
- `Prime Gaming` — "**included with Amazon Prime** and includes **one free channel subscription per month.** Prime Gaming members are set up on a **non-recurring basis**, so it's always a great idea to use a **call-to-action (CTA)** to remind your Prime Gaming subscribers to **renew every month.**"

The Prime Gaming disclosure is doing three things at once: explaining a corporate-parent benefit, disclosing that it does not auto-renew, and giving the creator a revenue-protection tactic. Note **`call-to-action (CTA)` is expanded for the creator audience** — Twitch teaches marketing vocabulary to streamers.

**Bits disclosed as a purchasable virtual good** `[observed]`: "`Bits` are a **purchasable virtual good** that viewers can use to `Cheer` in chat to show support, celebrate moments, and amplify messages." The phrase "purchasable virtual good" is doing regulatory work — it classifies Bits as a good rather than as currency, which is consistent with the acceptable-use rules against transferring or wagering them.

**Revenue-share disclosure via Extensions** `[observed]`: "When Bits are used in an Extension, they **support both the creator and the Extension developer.**" A three-way split disclosed in one clause.

**A performance statistic used as a monetisation nudge** `[observed]`: "Creators that use monetized extensions tend to generate **on average 280% more Bits revenue** than those that don't." A correlational claim presented as a tip, with "on average" as the only hedge. No source, no denominator, no caveat about selection effects. Recorded as an unbounded claim — and notable because Wise, by contrast, bounds every one of its numbers.

**Developer-side rate-limit and eligibility disclosure** `[observed]` — the dev docs publish exact limits in tables (20 messages per 30 seconds for regular accounts, 100 for broadcaster/mod/VIP, 7,500 for verified bots, 1 message per second per channel, 100 concurrent channel joins as of a stated date, 20 join attempts per 10 seconds), plus a shared-account clarification: "**If 10 users are running the bot on a single bot account, the rate limit applies across all 10 users.**" And an authenticity rule stated as a one-liner: "**Each account must be associated with a human, not a bot.**"

**Legal documents named** `[observed]`: `Terms of Service` · `Terms of Sale` · `Privacy Notice` · `Privacy Choices` · `Monetized Streamer Agreement` · `Open Source Attribution` · `Ad Choices` · `Cookie Policy` · `bits-acceptable-use`. Note the footer of Creator Camp says `Privacy Policy` while the legal nav says `Privacy Notice` — **two names for the privacy document across two Twitch surfaces.**

**Status-page consent disclosures** `[observed]`: "By subscribing you agree to our `Privacy Policy`." · "Message and data rates may apply. By subscribing you agree to our `Privacy Policy`, the Atlassian `Terms of Service`, and the Atlassian `Privacy Policy`." · "This site is protected by reCAPTCHA and the Google `Privacy Policy` and `Terms of Service` apply." Three third parties named at the point of consent.

**Community Guidelines content** `[absent]` — never obtained. Twitch's harm taxonomy, its prohibited-conduct vocabulary and its rule grammar are entirely unharvested.

## T11 Help-centre architecture

`[absent]`. This is the most significant structural gap in the file.

`help.twitch.tv/s/` is a Salesforce Lightning single-page application. It served `Loading` / `Sorry to interrupt` / `CSS Error` / `Refresh` and nothing else. `safety.twitch.tv/s/` served the same. No category tree, no article inventory, no scope lines, no article-title grammar and no routing furniture were captured.

**What can be said about the architecture, from external evidence only:**

- The URL pattern is `help.twitch.tv/s/article/<Slug>` with an optional `?language=en_US`, and Twitch uses **two slug conventions inconsistently**: lowercase-hyphenated (`how-to-use-raids`, `guide-to-cheering-with-bits`, `local-subscription-pricing`, `how-to-manage-harassment-in-chat`, `about-account-suspensions-dmca-suspensions-and-chat-bans`) and Title-Case-hyphenated (`Community-Guidelines`, `Managing-Roles-for-your-Channel`). Two casing conventions in one help centre's URL space.
- A **legacy path survives**: `help.twitch.tv/customer/en/portal/articles/2883870` and `help.twitch.tv/customer/portal/articles/725568` are both linked from current Creator Camp copy — a previous help platform's numeric URLs, still in production links. One of them (`2883870#managing`) is the link behind the word `Moderators` in the moderation chapter.
- Anchor-links into article sub-sections are used (`#ShieldMode`, `#StopRaids`, `#managingraids`), so articles are long and internally navigable.
- The Community Guidelines exist at **three addresses** — `help.twitch.tv/s/article/community-guidelines`, `safety.twitch.tv/s/article/Community-Guidelines`, and `legal.twitch.com/en/legal/community-guidelines` — and Creator Camp links to the `safety.twitch.tv` one from two different chapters while the status page and dev docs link to `twitch.tv/p/legal/`. **Four link targets for one document across four Twitch surfaces.**
- `Help Portal` (status page) vs `Help Center` (dev docs footer) vs `Twitch Help Page` (Creator Camp footer) — **three names for the support destination.**

**Creator Camp's own architecture**, by contrast, is fully captured and well formed: `Level` → `Path` → `Chapter`, with durations at two levels, a chapter-select dropdown, a breadcrumb, `Next Chapter` / `←` navigation, per-path completion tracking and a `Path Reward`. A search page exists at `/creatorcamp/en/search`. It is a genuinely coherent learning IA — and it is a different information architecture from the help centre it links out to, with no shared vocabulary between them.

## T12 FAQs

**Placement:** a three-question block at the foot of the Creator Camp home page, **untitled** — there is no `Frequently Asked Questions` heading, just three bolded questions with answers. Answers render in full.

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | **How do I start streaming on Twitch?** | Routes to `Get to Know Twitch`; previews its contents as "from streaming level, to Emotes, and how to stay safe" |
| 2 | **How do I grow my channel on Twitch?** | Routes to `Grow Your Community`; previews "rewarding viewers, to utilizing calls to action, and how to plan fun events" |
| 3 | **How do I make money on Twitch?** | "To start monetizing your Twitch channel, **you'll first need to achieve Affiliate status.**" Then routes to `Monetization on Twitch`; previews "Subscriptions and Bits, as well as Ads and sponsorships" |

**Structural notes.** Three questions, all `How do I…?`, all in the creator's voice, and all answered by **routing rather than answering**. Each answer is a two-sentence pattern: an encouraging opener ("You'll need a solid foundation to start your streaming journey… and build your channel!" / "Growing your channel on Twitch involves many factors, **but we are here to help!**") followed by a link and a preview of what the destination covers.

Only Q3 contains an actual fact — the Affiliate-status gate — and it is the answer to the question a creator most wants answered. Placing the one piece of substance in the money question, and routing the other two, is either good prioritisation or an accident of which fact was easiest to state.

The answers also **misname their own destinations**: Q1 routes to "our article `Get to Know Twitch`" which is a *path*, not an article; Q2 says `Grow Your Community` when the path is `Growing your Community`; Q3 says `Monetization on Twitch` when the path is `Monetization`. **Three of three link labels disagree with the destination titles.** And all three URLs in the FAQ answers omit the `/en/` locale segment present everywhere else (`twitch.tv/creatorcamp//level1/...` — note the double slash in one).

**No FAQ block exists** on any other harvested Twitch surface, and the help centre — which would carry the product's real FAQ set — is blocked. The three questions above are the entirety of Twitch's captured FAQ content.

## T13 Coined structural terminology

**PRIORITY SECTION.** Twitch's vocabulary is the most *subculturally* derived in this batch — much of it originated in the community and was adopted by the platform, rather than the reverse — and Twitch capitalises its product nouns heavily.

### Live-medium states and events

| Term | Twitch's usage | Notes |
|---|---|---|
| `live` / `going live` / `broadcast` | The core state and its transition; `Going Live` is a path name; `broadcast` is the noun for a single session | `stream` used interchangeably as both noun and verb |
| `Raid` / `raiding` / `raiders` / `Incoming Raids` | **The signature coined event.** "send your viewers to another live channel at the end of your stream." Full verb paradigm: you *raid*, you *are raided*, the people are *raiders*, and there are `Incoming Raids` settings | **The same word is a prohibited attack on Discord** ("server raiding", `Raid Protection`, `raiders`). Two platforms in one batch, one word, opposite valence. Twitch has domesticated a hostile term into a growth feature and built a `Stop Raids` kill switch for when it reverts |
| `raid browser` | The discovery tool for finding a raid target | |
| `Suggested channels` | Creator-curated channel embeds on the **offline channel page** | Formerly `host mode` — the link behind `Suggested channels` points at `how-to-use-host-mode`, so `host`/`hosting` has been retired and the URL preserves it. A visible terminology migration |
| `offline channel page` | The named surface shown when a channel is not live | Naming the off state as a *page* rather than an absence |
| `VOD` | Video on demand; used interchangeably with `past broadcasts` in one table cell; `Sub-Only VODs` as a benefit, `Subscriber-only archives` as the setting | Three terms (`VOD`, `past broadcast`, `archive`) for one object |
| `clip` / `clipping` | **`[absent]` as user-facing vocabulary.** Appears only inside a role-permission link fragment ("Setting channel clipping permissions"). The clip object and its states were not observed | A significant gap — clipping is one of Twitch's defining mechanics |
| `Co-Streams` / `Sidecasting` | Two named multi-broadcaster formats | `Sidecasting` is a Twitch coinage; undefined in the harvest |
| `Dual Format` / `Enhanced Broadcasting` | Named broadcast modes | Chapter titles only |
| `IRL` | A content category and a streaming mode (`Stream on Mobile IRL`); **never expanded** | Community-origin initialism promoted to IA without a gloss |
| `Just Chatting` | A content category — a named category for *no activity*, which only a live medium needs | |
| `VTubing` | A content category | |
| `Monetization Moments` | A named chapter concept; undefined | |

### Monetisation vocabulary

| Term | Twitch's usage | Notes |
|---|---|---|
| `Sub` / `Subs` / `Subscriptions` | The recurring-support product; `Sub` is used as the primary short form **in body copy**, including capitalised mid-sentence ("Provide bonus Sub benefits") | Twitch uses the community's abbreviation in its own documentation |
| `Gifted Subscriptions` / `gift a sub` | Third-party-paid subscription | |
| `Prime Gaming Subscriptions` | The Amazon-Prime-bundled free monthly sub | Corporate-parent integration named as a sub type |
| `Bits` | "a **purchasable virtual good**" | Classified as a *good*, not currency — a deliberate regulatory framing |
| `Cheer` / `Cheering` | **The verb for spending Bits.** "viewers can use to `Cheer` in chat"; "Viewers `Cheer` Bits because they enjoy watching you!" | A coined verb for a payment gesture. Compare Pinterest's `Save`. Naming the *gesture* rather than the *transaction* is the key move |
| `Cheermotes` | "Using many Bits at once shows more support through cool animations called `Cheermotes`" | A portmanteau of Cheer + Emote — a coinage built from two other coinages |
| `Emotes` | Channel-specific chat images; "available to monetized users"; subscribers get them "globally across Twitch" | The most widely-borrowed Twitch coinage |
| `Sub Badges` / `subscriber badges` / `Bit Badges` / `Chat Badge` / `Chat Bot Badge` / `global vanity badge` / `Profile Badges` | A badge taxonomy with at least seven named types | `global vanity badge` is the slot the `Chat Bot Badge` displaces |
| `Custom Power-Ups` / `Power-Ups` | Bits-purchasable interactive rewards; "three default Power-Ups alongside any custom power-ups" | Casing drifts within one sentence: `Power-Ups` then `power-ups` |
| `Channel Points` | A separate non-monetary reward currency; surfaced only in a dashboard path (`viewer-rewards/channel-points/rewards`) and one moderator duty ("Encourage channel point redemptions") | Twitch's *second* currency, barely documented in the harvest |
| `Extensions` | Third-party in-stream interactive apps with Bits revenue share | |
| `Twitch Alerts` | On-stream notification overlays; own chapter; `Customizing Twitch Alerts` in Level 2 | The visible acknowledgement layer for monetisation events |
| `Affiliate` / `Partner` | The two monetisation tiers; also used as **raid-filter trust signals** | Programme status doubling as a trust signal |
| `monetized users` / `Monetized Streamer Agreement` | `monetized` as the adjectival state | |
| `Turbo` | A consumer ad-free subscription; footer only | |
| `Sponsorship Certification` | A creator credential | |
| `Drops` | A dev-docs product area; undescribed | |

### Moderation and role vocabulary

| Term | Twitch's usage | Notes |
|---|---|---|
| `Moderator` / `mods` | The volunteer chat enforcer; "your channel's best friend"; visible in-chat badge; can `slow chat`, `Shield Mode`, `time out or ban` | |
| `Editor` / `VIP` / `Artist` | Three non-moderator roles | `Artist` is purely honorific; `VIP` is defined by the restrictions it is exempt from |
| `AutoMod` / `Automod` / `AutoMod mode` | **Three renderings in one harvest** (Creator Camp uses both `AutoMod` and `Automod`; dev docs add `AutoMod mode`). Has numeric **levels** — "start with `Automod Level 2`" | Contrast Discord's AutoMod, which is rule-based; Twitch's is a sensitivity dial |
| `Shield Mode` | A named emergency moderation state; **effect not obtained** | |
| `Stop Raids` | The one-hour inbound-raid kill switch, addable as a **quick action** | |
| `timeout` / `time out` / `bans` / `chat bans` | Chat-level enforcement; mechanics on the blocked domain | `ban` also appears **non-punitively** as a Power-Up template (`Ban an In-Game Action`) — the word is overloaded |
| `slow mode` / `slow chat` / `No Slow Mode` | The rate-limit state, its verb, and the subscriber exemption | Three forms |
| `Subscriber-Only chat` / `sub-only` | The gated-chat state | |
| `Users in Chat` / `chatters list` | Two names for the participant list, the second flagged as colloquial ("also commonly referred to as") | |
| `Chat Bots` | A named segment within Users in Chat | |
| `warnings` / `temporary suspension` / `indefinite suspension` | The three account-enforcement outcomes | `indefinite` rather than `permanent` — see T9 |
| `DMCA suspensions` | A third suspension species, evidenced only in an article slug | |
| `enforcements` | Used as a **count noun** ("we issue enforcements against accounts") | Institutional; compare Discord's `violations` |
| `Copyright School` | The compliance-education namespace | |
| `Support Squad` | The chapter's collective noun for a creator's moderation team | A warm alternative to "mod team" |
| `Verified Bots` / `verified bot status` | A developer trust tier with higher rate limits; "rarely granted" | |
| `Cloud Chatbots` / `Installed Chatbots` / `Chat Clients` | Three named chatbot contexts in the dev docs, each defined | Clean developer taxonomy |

### Three terminology findings

1. **`raid` carries opposite valences on Twitch and Discord.** On Twitch it is a gift; on Discord it is an attack with a dedicated `Raid Protection` system. Both are correct within their product, and the collision is a genuine hazard for anyone writing cross-platform copy or for a user who moves between them. Note also that Twitch's own `Stop Raids` control exists precisely because the Twitch raid *can* be weaponised — the two meanings coexist inside Twitch itself.
2. **Three or more terms for several single objects.** `VOD` / `past broadcast` / `archive`. `AutoMod` / `Automod` / `AutoMod mode`. `Help Portal` / `Help Center` / `Twitch Help Page`. `Privacy Policy` / `Privacy Notice`. `Power-Ups` / `power-ups`. `Log In` / `Log in`. `Suggested channels` over a `host-mode` URL. Twitch's terminology discipline is the weakest in this batch, and the help-centre inaccessibility means much of it cannot even be checked against a canonical source.
3. **Twitch adopts community coinages as official vocabulary more readily than any other product here.** `Sub`, `Emote`, `IRL`, `Just Chatting`, `raid`, `chatters list`, `VOD` — all community-origin, all used in official documentation, several without expansion. That is a coherent strategy for a product whose identity is its subculture, and it has a cost: `IRL` and `LFG`-style initialisms enter the IA ungloseed, and a newcomer cannot look them up.

**Register split:** Creator Camp says `Sub`, `Cheer`, `raid`, `vibe`, `Support Squad`; the enforcement section says `enforcements`, `indefinite suspension`, `Terms of Service`; the dev docs say `broadcaster`, `rate limit bucket`, `EventSub`. Three vocabularies, and the enforcement one is the thinnest because its source documents are unreachable.

## T14 Voice, tone & accessibility

**Person and tense.** Second person throughout Creator Camp, addressing the creator as a peer and an owner ("your channel", "your community", "your chat", "your Support Squad"). First-person plural for Twitch ("we will cover it here", "Twitch recommends", "we issue enforcements"). Notably, **the community is addressed as the creator's possession** — "your viewers", "your subscribers", "your community" — which is a consistent ownership framing and the thing that makes the raid's "send your viewers to another channel" land as generous rather than careless.

**Register — three levels.**

| Surface | Register | Example |
|---|---|---|
| Creator Camp | Warm, encouraging, gamified, exclamatory | "Knowledge is power and Creator Camp will make you more powerful than ever." · "`Embark on this Path`" · "Now you can…" · "we are here to help!" · "vibe" used twice |
| Enforcement / legal | Flat, institutional, careful | "we issue enforcements against accounts that we determine to have violated…" · "indefinite suspension" |
| Status page | Jokey, anthropomorphic | "Twitch is always live—except for when it's not." · "thriving or having a bit of a rough day" |

**"vibe" appears twice** as a technical term for community fit: "When viewers feel welcomed and **like the vibe** of your stream they may stick around" and "Check to make sure they match **the vibe** of the community you are creating." Twitch uses a subcultural word for a thing it has no better word for — community atmosphere — and it works.

**Exclamation marks** are frequent in Creator Magazine-style copy ("Keep it positive and add an emote or two!", "Complete this path to unlock a digital pin!", "Let's Go!", "we are here to help!") and **absent from the enforcement and appeal sections.** Correct gradient.

**Numbers** `[observed]`: `280%`, `24/7/365`, `2 minutes`/`3 minutes`/`6 Minutes`/`37 Minutes`, `20 messages per 30 seconds`, `7500 messages`, `100` concurrent joins, `1 hour`, `Level 2`. Almost all are bounds or durations — with the exception of the `280% more Bits revenue` claim, which is an unbounded correlational statistic presented as advice.

**`24/7/365`** is a coverage claim with a redundant third term (365 adds nothing to 24/7) — a rhetorical intensifier rather than information.

**Accessibility content** `[observed]`

- **`Reduce Motion` is a persistent control in the Creator Camp primary nav**, rendered twice (desktop and mobile nav). A motion-sensitivity preference promoted to top-level navigation rather than buried in settings. For a site built on autoplaying video and animated GIFs this is the right call and it is the **best accessibility decision found in this batch**.
- **`(opens in a new window)` is written into the link text** of all four external links at the Creator Camp footer: `Twitch Help Page (opens in a new window)`, `Twitch Safety Center (opens in a new window)`, `Community Guidelines (opens in a new window)`, `Twitch Blog (opens in a new window)`. The warning is part of the accessible name, not an icon. Also best-in-batch.
- `Skip to content` present and first in DOM on Creator Camp.
- **Alt text on instructional images is genuinely descriptive and carries the content**, which is why this file can report the chat-rules exemplars at all:
  - `Twitch Chat Rules: Welcome to the chat room! Make sure to follow the rules below to keep the conversation fun and friendly for everyone.`
  - `Twitch Chat Rules card listing: No hate speech, No racism or sexism, No homophobia or transphobia, No backseat gaming, No spamming messages`
  - `SciAnts Stream chat scrolling showing a raid message and raid through Sery_Bot.`
  - `Cow Girl walking through door into space` (decorative path illustration, described)
  - `Path Icon`, `Get to Know Twitch path badge`, `Going Live path badge`, `Monetization path badge` — badge images named by their path
  
  The second one is exemplary: a **card listing its own contents in the alt text**, so a screen-reader user receives the five example rules rather than "image of chat rules". This is the pattern Reddit fails at (`image2.png`) and Discord only partially achieves (captions instead of alt).
- **Alt-text failures in the same set:** the Bonus Sub Benefits table uses filename-style alt on its six icons (`EmotesLarge@2x.png`, `SubscribeLarge@2x.png`, `CommentsLarge@2x.png`, `ViewsLarge@2x.png`, `VideoLarge@2x.png`, `HourglassLarge@2x.png`), and those icons are hosted on `googleusercontent.com` — third-party image hosting inside official creator documentation, a fragility as well as an accessibility gap. Same pattern in the Do/Don't tables.
- The **previous-chapter control is a bare `←`** with no accessible label, while `Next Chapter` is fully labelled. Asymmetric navigation labelling.
- Videos are YouTube embeds with query parameters (`autoplay=0&controls=1&mute=0`) — autoplay correctly disabled — but **no caption or transcript reference** appears in the markup. `[absent]`
- Creator Camp pages are served `noindex, nofollow` at chapter level, so the instructional content is deliberately excluded from search engines. A findability decision that also means a creator cannot Google into a chapter.
- **The help centre and Safety Center are inaccessible to any client that cannot run a Salesforce Lightning app**, and the failure message is `CSS Error`. This is the single largest accessibility failure in this batch: the Community Guidelines, the reporting instructions and the safety tooling documentation are all behind a JavaScript application that degrades to a developer diagnostic.
- **No accessibility statement** was reachable. The Creator Camp path `Increasing Accessibility` exists as a chapter title in `Growing your Community` — Twitch teaches accessibility *to creators* — but was not fetched, and there is no accessibility entry in any footer harvested. `[absent]`

**Negative findings, recorded honestly**

- `help.twitch.tv` and `safety.twitch.tv` serve `Sorry to interrupt` / `CSS Error` / `Refresh` to a non-JS client. The Community Guidelines are unreachable by four separate URLs.
- `legal.twitch.com` renders navigation but no policy body, and **leaks its build path** into the page: `/home/ubuntu/actions-runner/_work/legal-hugo/legal-hugo/content/en/legal/community-guidelines.md`. A CI runner path exposed to the public on a legal page.
- `legal.twitch.com` serves **empty `meta-description`, `meta-og:description`, `meta-og:image`, `meta-twitter:description` and `meta-twitter:image` tags** — present but blank.
- `Help Portal` / `Help Center` / `Twitch Help Page` — three names for one destination.
- `Privacy Policy` (Creator Camp footer) vs `Privacy Notice` (legal nav).
- `Log In` and `Log in` both on the Creator Camp hero/nav.
- `AutoMod` / `Automod` / `AutoMod mode` — three renderings.
- `VOD` / `past broadcasts` / `Subscriber-only archives` — three terms, one object, one table.
- `Power-Ups` / `power-ups` — casing drift within one sentence.
- `Terms of Sales` written in Creator Camp for a document named `Terms of Sale`.
- `Growing your Community` / `Copyrights & Your Channel` — lowercase "your" against `Establish Your Brand` and `Get to Know Twitch`.
- All three Creator Camp FAQ answers misname their destination paths, and their URLs omit the `/en/` locale segment (one contains a double slash).
- Status page: an update labelled `Investigating` whose text says "We have identified an issue" — stage label contradicts copy. And `Identified Checkout Issues` as an incident title embeds a stage name.
- Legacy `help.twitch.tv/customer/...` URLs from a retired help platform are still linked from current Creator Camp copy.
- `Suggested channels` links to a `how-to-use-host-mode` article — retired terminology preserved in a live URL.
- `IRL` and `LFG`-style initialisms used in IA without expansion.
- `clip` / `clipping` essentially undocumented despite being a core Twitch mechanic.
- `280% more Bits revenue` — an unbounded correlational claim used as advice.
- Six benefit-table icons and two AutoMod screenshots hosted on `googleusercontent.com` with filename alt text.
- Previous-chapter control is an unlabelled `←`.
- The appeal guidance lists `remorse` first among the qualities of a successful appeal, addressed to a user who believes they were wrongly enforced against.

---

## Transferable patterns

1. **Decompose a status page by user job, not by infrastructure.** `Login` · `Web` · `Chat` · `Video (Watching)` · `Video (Broadcasting)` · `Purchases`. Six components, and the watching/broadcasting split lets a viewer and a creator each self-diagnose in one glance. Compare Discord's 28 infrastructure components. For PayPal, the equivalent would be splitting by *paying* vs *getting paid* rather than by service.
2. **Make the empty state a reciprocal handoff.** The offline channel page is filled with `Suggested channels` the creator chooses, and "You can suggest any streamer and they can suggest you too." A "nothing here right now" state turned into a mutual-benefit surface. Applicable to any recurring absence — an out-of-stock page, an unavailable seller, a closed merchant.
3. **Script the user's verbal response to a real-time event.** "Thank the raider by name and give them a shoutout **if you're comfortable.** Help new viewers feel welcome by greeting them and sharing a bit about yourself." Twitch tells the host what to *say*, with an explicit opt-out for the socially anxious. Unique in this batch, and reusable anywhere a product asks a user to perform in front of others.
4. **Ship the feature and its kill switch in the same lesson.** `Raiding` teaches how to raid, how to receive a raid, how to filter incoming raids on six trust signals, and how to `Stop Raids` for an hour. Growth mechanic and abuse vector documented together, in that order. Condition: this only works if the defence is as easy as the feature — a "quick action" against a `/raid` command.
5. **Express a trust filter as a settings screen with named signals.** `incoming raid settings` gates on viewer count, account age, team membership, follow relationship and programme tier. Exactly the signal set a risk engine uses, exposed to a non-technical user as a preferences pane. Directly relevant to seller-side risk controls and to any "who can contact/pay/request from me" setting.
6. **Define a privilege tier by the restrictions it escapes.** `VIP`s are "not affected by slow mode, sub-only, rate limits and more." Efficient, and only possible because the restriction states are already named. A good test of whether your state vocabulary is complete: can you define your premium tier as a list of exemptions?
7. **Use the Don't column to grant permission, not only to prohibit.** "**Don't** be afraid to talk about money. Your community wants to support you." / "Don't make anyone feel guilty if they cannot Subscribe." A do/don't table used for solicitation ethics — telling the creator both to ask and how not to pressure. Reusable for any copy that asks a user to ask someone else for money.
8. **Put the new-window warning inside the link text.** `Community Guidelines (opens in a new window)`. And **put `Reduce Motion` in the primary nav** of any animation-heavy site. Two small, cheap, best-in-batch accessibility decisions.
9. **Negative pattern to avoid: never list contrition among the qualities of a successful appeal.** "Successful appeals usually include **remorse, taking responsibility**, or additional context…" — addressed to someone who "believe[s] you incorrectly received account enforcement". If the appeal is a fact-finding process, describe only evidentiary qualities. If remorse genuinely helps, that is a disclosure about the process, not advice to the innocent.
10. **Negative pattern to avoid: a JavaScript-only help centre.** Twitch's Community Guidelines, reporting instructions and safety documentation are unreachable without executing a Salesforce app, and the degraded state reads `CSS Error`. Policy and safety content is the content most likely to be accessed from a constrained device, a poor connection, a screen reader, an archive or a regulator. It should be the most robustly served content on the estate, and here it is the least.

## Caveats & gaps

- **The Community Guidelines were never obtained.** Four URLs were attempted across three domains; two returned a Salesforce error shell, one returned an empty body, one returned navigation plus a leaked build path. **Twitch's harm taxonomy, prohibited-conduct vocabulary, rule grammar and policy structure are entirely absent from this file.** Every statement here about Twitch's rules is second-hand via a single Creator Camp chapter.
- **`help.twitch.tv` and `safety.twitch.tv` are unharvestable by this method.** Consequences: T11 (help-centre architecture) is `[absent]`; T7 has almost no recovery copy; T5 has almost no form labels; and the moderation-state mechanics the brief asks for — **timeout durations, ban consequences, chat-ban vs account-suspension distinctions, `Shield Mode`'s actual effect, AutoMod level definitions** — are all named but undefined.
- **`dev.twitch.tv/docs/chat/moderation/` was retrieved but could not be read.** At 85,234 characters it exceeded the fetch tool's output limit; the spill file was not retrievable on a follow-up attempt. This page would have supplied the API-level moderation vocabulary (ban, timeout, blocked terms, AutoMod settings, shield mode, unban requests) and is the highest-value single re-fetch for this file. Recorded honestly: **it was fetched and not read.**
- **`twitch.tv` returned an empty body**, so there is no hero, no signed-out discovery copy, no category-browse labels and no in-product string. T2 rests on a meta description and Creator Camp.
- **Clipping is undocumented.** `clip` appears only inside a role-permission URL fragment. One of Twitch's defining mechanics, and its vocabulary and states are not in this file. Not invented.
- **Presence, follow and notification states were not observed** — no `Follow`, `Notify`, `Turbo`, `Watch Party`, `Squad Stream` or `Predictions` vocabulary was reachable.
- **All live states are creator-facing.** The viewer's experience of live, offline, raiding and VOD states — the interstitials, banners and labels a viewer actually reads — is entirely unharvested.
- **No enforcement notification copy exists in this file.** T9 has the three state names and the appeal guidance and nothing else. There is no suspension email, no in-product notice, no reason-code vocabulary and no published turnaround time.
- Creator Camp chapters not fetched (titles captured, bodies unharvested): all of `Going Live` (8), `Establish Your Brand` (4), `Content Categories on Twitch` (9), `Copyrights & Your Channel` (7), `Creator Sponsorships` (5), `Better Broadcasts` (4), and five of seven `Growing your Community` chapters — including **`Increasing Accessibility`**, which would be the source for Twitch's accessibility vocabulary, and `Rewarding Viewers` and `Twitch Alerts`, which carry the Channel Points and alert-copy vocabulary.
- `dev.twitch.tv` was sampled at one page. EventSub subscription types, the API reference and the Extensions docs would materially extend T6's state inventory with the machine-readable state names.
- Article titles inferred from **URL slugs** (e.g. `about-account-suspensions-dmca-suspensions-and-chat-bans`) are described as slugs and **have not been quoted as UI strings**, since the rendered titles were never seen.
- Helpfulness ratios, article dates and author bylines — available on Discord and Reddit — are unavailable here because the help centre did not render.
- Mobile app strings, the appeal form at `appeals.twitch.tv`, and email copy are out of the public web surface.

## Sources

1. https://www.twitch.tv/ (empty body)
2. https://help.twitch.tv/s/?language=en_US (Salesforce Lightning error shell — blocked)
3. https://help.twitch.tv/s/article/community-guidelines?language=en_US (empty body)
4. https://safety.twitch.tv/s/?language=en_US (Salesforce Lightning error shell — blocked)
5. https://safety.twitch.tv/s/article/Community-Guidelines?language=en_US (Salesforce Lightning error shell — blocked)
6. https://legal.twitch.com/legal/community-guidelines/ (nav only; body absent; leaked build path)
7. https://legal.twitch.com/en/legal/community-guidelines/ (nav only; body absent)
8. https://www.twitch.tv/p/en/legal/community-guidelines/ (302 to legal.twitch.com; body absent)
9. https://status.twitch.tv/ (302 to https://status.twitch.com)
10. https://www.twitch.tv/creatorcamp/en/
11. https://www.twitch.tv/creatorcamp/en/level1/get-to-know-twitch/twitch-etiquette/
12. https://www.twitch.tv/creatorcamp/en/level1/get-to-know-twitch/assembling-a-support-squad/
13. https://www.twitch.tv/creatorcamp/en/level1/get-to-know-twitch/policies-guidelines-and-terms/
14. https://www.twitch.tv/creatorcamp/en/level1/growing-your-community/raiding/
15. https://www.twitch.tv/creatorcamp/en/level1/monetization/subscriptions/
16. https://www.twitch.tv/creatorcamp/en/level1/monetization/bits/
17. https://dev.twitch.tv/docs/irc/ (302 to https://dev.twitch.tv/docs/chat)
18. https://dev.twitch.tv/docs/chat/moderation/ (retrieved, exceeded output limit, not read)
