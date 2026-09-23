# 149. Discord

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Community chat platform (voice, video and text) with a coined spatial object model |
| Primary URL | https://discord.com/ |
| Corpus rank | 149 |
| Benchmark strength (source list) | Server and channel onboarding |
| Locale / market observed | en-US; marketing site offers 31 locales, help centre 17 |
| Platform observed | Web — marketing site, Safety Center, policy pages, help centre (Zendesk), status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | NCMEC reporting for CSAM and grooming; age-gating and country-specific minimum ages; publishes a Transparency Hub with enforcement reporting; Monetization Policy and Developer Terms as separate regimes |
| Harvest date | 2026-09-22 |
| Pages inspected | 13 |
| Harvest completeness | **Full for the public surface.** Every page attempted rendered completely, including all article bodies and all FAQ answers. This is the most complete harvest in the batch. Only in-product live strings remain unobserved. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home (marketing) | https://discord.com/ | Full nav tree, hero, six feature sections, footer |
| Community Guidelines | https://discord.com/guidelines | 27 numbered rules in three named groups; enforcement preamble |
| Safety Center | https://discord.com/safety | Eight hub cards with scope paragraphs |
| Help Center home | https://support.discord.com/hc/en-us | Nine categories, each with a **joke** gloss — see T1 |
| Discord Basics (category) | https://support.discord.com/hc/en-us/categories/115000217151 | Five sections; article-count labels |
| Server Settings (category) | https://support.discord.com/hc/en-us/categories/200404378 | Five sections; the structural-vocabulary inventory |
| Beginner's Guide to Discord | https://support.discord.com/hc/en-us/articles/360045138571 | The canonical newcomer document; source of most T13 teaching copy |
| Discord Warning System | https://support.discord.com/hc/en-us/articles/18210965981847 | **The key document.** Five account standings, violation lifecycle, review request, 9-question FAQ |
| Time Out FAQ | https://support.discord.com/hc/en-us/articles/4413305239191 | Server-level timeout durations and consequences; 7-question FAQ |
| AutoMod FAQ | https://support.discord.com/hc/en-us/articles/4421269296535 | Filter taxonomy, wildcard syntax, 12-question FAQ |
| Forum Channels FAQ | https://support.discord.com/hc/en-us/articles/6208479917079 | Channel-type vocabulary; forum vs thread distinction; 9-question FAQ |
| Community Onboarding FAQ | https://support.discord.com/hc/en-us/articles/11074987197975 | **Priority source** for the onboarding brief; setup sequence and 7-question FAQ |
| Status page | https://discordstatus.com/ | 28 named components; four-stage incident vocabulary |

---

## T1 Navigation & IA labels

**Marketing nav — nine items, and each carries a screen-reader position counter** `[observed]`

`Download` · `Nitro` · `Discover` · `Safety` · `Quests` · `Support` · `Blog` · `Developers` · `Careers` — rendered as `Download1 of 9`, `Nitro2 of 9`, `Discover 3 of 9` … `Careers9 of 9`.

The `N of 9` suffixes are an accessibility affordance baked into the link text itself (announcing menu position), and they are visible in the markup rather than hidden — worth noting as an unusual implementation choice. `Skip to main content` is first in DOM.

Each expandable item uses a **two-tier label structure — `Resources` / `Hubs` / `Learn` / `Build` / `Collections`** — rather than a flat list:

| Nav item | Group label | Children (verbatim) |
|---|---|---|
| `Discover` | `Resources` | `Server Directory` · `Trending Games` |
| `Safety` | `Resources` | `Family Center` · `Safety Library` · `Safety News` · `Teen Charter` · `Discord Player's Guide` |
| `Safety` | `Hubs` | `Parent Hub` · `Policy Hub` · `Privacy Hub` · `Transparency Hub` · `Wellbeing Hub` |
| `Quests` | `Resources` | `Advertising` · `Success Stories` · `Quests FAQ` |
| `Support` | `Resources` | `Help Center` · `Feedback` · `Submit a Request` |
| `Blog` | `Collections` | `Featured` · `Community` · `Discord HQ` · `Engineering & Developers` · `How to Discord` · `Policy & Safety` · `Product & Features` |
| `Developers` | `Learn` / `Build` | `Discord for Game Developers` · `Integration` · `Social Commerce` · `Apps & Activities` · … / `Official Game Communities` · `Developer Portal` · `Documentation` · `Developer Help Center` |

**`Safety` is the largest nav item in the product** — ten children across two groups, more than `Developers`. And the split between `Resources` (things to read) and `Hubs` (destinations to explore) is a genuine IA distinction, consistently applied. Five items are literally suffixed `Hub`, which makes the noun a navigational type: `Parent Hub`, `Policy Hub`, `Privacy Hub`, `Transparency Hub`, `Wellbeing Hub`. A reader learns the pattern once and can predict the rest.

`How to Discord` as a blog collection name is the product name verbed — see T13.

**Help Centre home — nine categories, each glossed with a joke** `[observed]`

This is the single most distinctive IA artefact in the batch. Discord's help-centre category descriptions are not scope lines; they are gags.

| Category | Gloss (verbatim) |
|---|---|
| `Announcements` | "We've got our ear to the ground. Here's what you need to know." |
| `Discord Basics` | "Start off on the right foot! Not the left one!" |
| `Account Settings` | "Personalize your profile, security, notifications, and more." |
| `Server Settings` | "Almost as exciting as interior decorating." |
| `Nitro, Shop & Server Boosting` | "Please don't shop until you drop. Let us help." |
| `Quests & Promotions` | "Welcome, weary traveler! Would you like to see our quests?" |
| `Payments & Billing` | "That feel when you look at your bank account." |
| `Safety, Privacy & Policy` | "Keep things safe & sound for you and your buddies." |
| `Known Issues, Bugs & Troubleshooting` | "All you can eat self-serve problem solving." |

Only `Account Settings` has a functional, informative gloss. The other eight prioritise voice over routing. Compare Wise, whose six help topics each carry a comma-run of the verbs inside them, or Reddit, whose six scope lines are all descriptive. **Discord has traded self-routing value for brand voice at the top level of its support IA** — and notably it does so *including on the payments and safety categories*, where a distressed user is least likely to want a joke. "That feel when you look at your bank account" is the gloss on the category a user with a billing dispute must click. Recorded as a deliberate, defensible-but-costly voice decision, and the clearest tone-versus-task tension in this batch.

Header copy sets the same register: H1 `Help Center`, then `Need help?   We've got your back.`, then "From account settings to permissions, find help for everything Discord" — and a routing line: "If you're new to Discord and looking for tips, check out our `Beginner's Guide`."

**`Other ways to find help`** `[observed]` — a secondary routing row with three destinations, each with a functional gloss:
- `Developer Support` — "Your home for support with developing bots, apps, & games using our API and SDK!"
- `Apps Center` — "Read all about how you can use, discover, and add Apps as a Discord user!"
- `X` — "Have a quick question? Hit us up on X!"

**Safety Center — eight hubs, each with a real scope paragraph** `[observed]`

`Safety Library` · `Privacy Hub` · `Parent Hub` · `Transparency Hub` · `Safety News Hub` · `Policy Hub` · `Teen Charter` · `Wellbeing Hub` — each followed by two to four sentences and an `Explore More` CTA.

The Safety Center glosses are **functional, warm and joke-free**, in direct contrast to the help centre's. Discord clearly operates two register policies: comedy in support IA, sincerity in safety IA. The `Privacy Hub` gloss is the best-written sentence on the Discord surface:

> "**Privacy is an essential part of feeling safe.** No matter what, we build privacy into our products and keep you informed about what's happening with your data."

Privacy is justified by the *feeling* it produces rather than by rights or compliance. One clause, and it reframes an abstract category as an emotional precondition.

**Server Settings category — five sections, and this is the structural-vocabulary map** `[observed]`

`Server Features` (30 articles) · `Roles, Permissions, and Moderation` (26) · `Integrations` (8) · `Communities and Discovery` (24) · `Invites` (6)

**`Roles, Permissions, and Moderation` is one section, not three.** Discord files the identity system and the enforcement system together, because in its model they are the same system — moderation is exercised *through* permissions. That is the single most revealing IA decision in the file and it is the reason T13's structural vocabulary is inseparable from T6's state vocabulary.

**Discord Basics — five sections** `[observed]`
`Getting Started` (11 articles) · `Messaging and Chat` (30) · `Voice, Video, and Streaming` (22) · `Friends` (6) · `Features` (20)

Note **article counts are interpolated into the label**: `See all 30 articles`, `See all 11 articles`. Same pattern as Reddit. Users know the size of the set before clicking.

**Footer — four groups** `[observed]`: `Product` (`Download` · `Nitro` · `Status` · `App Directory` · `Gift Cards`) · `Company` (`About` · `Jobs` · `Brand` · `Newsroom`) · `Resources` (`Support` · `Safety` · `Blog` · `Creators` · `Community` · `Developers` · `Quests` · `Official 3rd Party Merch` · `Feedback`) · `Policies` (`Terms` · `Privacy` · `Cookie Settings` · `Guidelines` · `Acknowledgements` · `Licenses` · `Company Information`).

`Official 3rd Party Merch` is a nicely honest label — it tells you the merch store is not Discord's. `Acknowledgements` and `Licenses` as peers of `Terms` is a developer-culture artefact surfacing in a consumer footer.

**Defect:** the footer group headings (`Product`, `Company`, `Resources`, `Policies`) are each rendered **twice** in the markup, and the entire footer plus language selector plus social row is duplicated. Screen-reader users may encounter the footer twice.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> H1: `Group chat that's all fun & games`
> Body: "Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out."

The headline is a **pun on the category noun** — "all fun and games" as idiom, plus "games" as the literal use case. The subhead then does the scaling work that the headline refuses: "chilling with friends" *or* "building a worldwide community", i.e. two wildly different scales in one sentence. `Customize your own space` introduces the spatial metaphor that governs the entire product vocabulary (see T13).

**Section headers are lowercase or SHOUTING, never sentence case** `[observed]`

- `find your friends on discord.` (all lowercase, with a full stop)
- `MAKE YOUR GROUP CHATS MORE FUN` (caps)
- `stream like you're in the same room` (lowercase)
- `Hop in when you're free, no need to call` (sentence case)
- `See who's around to chill` (sentence case)
- `always have something to do together` (lowercase)
- `wherever YOU GAME, HANG OUT HERE` (mixed, mid-sentence caps)
- `YOU CAN'T SCROLL ANYMORE.  BETTER GO CHAT.` (caps, two sentences, at the page foot)

Eight headers, four casing conventions, no discernible rule. This is styled as deliberate anti-polish — the casing chaos *is* the brand — but it is genuinely inconsistent and would fail any style-guide audit. Recorded as observed, with the note that the effect depends entirely on the reader accepting the register.

**The best-constructed benefit line on the page** `[observed]`:

> `Hop in when you're free, no need to call`
> "Easily hop in and out of voice or text chats **without having to call or invite anyone**, so your party chat lasts **before, during, and after your game session.**"

Header states the behaviour, body states the removed friction (no call, no invite), then bounds the benefit temporally with a three-beat phrase. `Hop in` is also doing terminology work — it is the verb Discord wants users to have for joining a voice channel, and it appears in the header, the body and the product (`Hop In` is a real control). Naming a *low-commitment* entry gesture is the whole product thesis.

**Register-defining body copy** `[observed]`:

> "High quality and low latency streaming makes it feel like you're hanging out on the couch with friends while playing a game, watching shows, looking at photos, **or idk doing homework or something**."

`idk` in marketing body copy. And: "just scroll together and **spam memes**". Discord writes as its users type — lowercase internet register, abbreviations unglossed, deliberate trailing vagueness. This is the furthest from corporate voice in the entire 200-product corpus so far, and it is applied consistently across the marketing surface and *not at all* in the Community Guidelines.

**Marquee animation as copy** `[observed]`: a scrolling strip of four words repeated — `talk` · `play` · `chat` · `hang out`. The product's four verbs, rendered as motion. Note `hang out` recurs across hero, marquee and section headers — it is the load-bearing verb.

**Final CTA section is an anti-CTA** `[observed]`: `YOU CAN'T SCROLL ANYMORE.  BETTER GO CHAT.` — the page foot tells you the page has ended and instructs you to leave. Followed by `Download for Mac` pointing at `#`. **Dead link on the page's terminal CTA** — a real defect.

**Safety Center positioning statement** `[observed]`:

> "Discord is a communication platform built for meaningful connections through voice, video, and text, especially around gaming. Find the resources you need **whether you're a teen, parent, educator, or long-time user.**"

Four audiences enumerated, teen first. Compare the marketing hero, which addresses no one in particular. The Safety Center is the only Discord surface that segments its reader explicitly.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Download for Windows` | Hero, primary | **OS-interpolated** |
| `Open Discord in your browser` | Hero, secondary | Full sentence; names the alternative surface rather than saying "Web" |
| `Download` | Mid-page, feature section | Bare; **points to `/login`, not `/download`** — mislabelled destination |
| `Download for Mac` | Page foot, terminal CTA | **Points to `#` — dead link** |
| `Log In` / `Log in` | Nav (twice, two casings) | Both present in the same nav markup |
| `Skip to main content` | First in DOM | Correct |
| `Explore More` | Safety Center, eight times | Bare and repeated eight times on one page — the weakest CTA set on the Discord surface |
| `Submit a Request` / `Submit a request` | Marketing nav / help centre | Two casings for one destination |
| `Feedback` | Nav and footer | Routes to a Zendesk ticket form with a `ticket_form_id` — a "feedback" label on a support-ticket URL |
| `Sign in` | Help centre, top right | **A third label for authentication**, alongside `Log In` and `Log in` |
| `See all 30 articles` / `See all 11 articles` | Category pages | Count interpolated — good |
| `See more` | Article sidebar, section lists | Bare |
| `Return to top` | Article foot | |
| `Was this article helpful?` → `Yes` / `No` | Article foot | Followed by a helpfulness ratio: "**17213 out of 42841 found this helpful**" (Warning System), "284012 out of 340833" (Beginner's Guide), "46423 out of 88674" (Time Out), "1229 out of 3100" (Forum Channels), "578 out of 1228" (Community Onboarding) |
| `Set Up` | AutoMod configuration | `[documented]` |
| `Edit Custom Message` | AutoMod block-message config | `[documented]` |
| `Flag Word` | Right-click context menu, AutoMod | `[documented]` — verb+object, three syllables |
| `Preview` | Community Onboarding setup | `[documented]` — "Use the 'Preview' button at the top to test out the look and feel" |
| `Set recommended permissions` | Forum channel creation | `[documented]` — a **defaults-suggesting CTA**, not a blank config |
| `Create post guidelines` | Forum channel setup | `[documented]` |
| `Create Channel` | Channel creation | `[documented]` |
| `Edit Tags` | Forum post context menu | `[documented]` |
| `Close Post` | Forum post context menu | `[documented]` |
| `Add to Post` | Forum thumbnail flow | `[documented]` |
| `Invite Mod` | Server member management | `[documented]` |
| `Remove Timeout` | Member context menu (mobile) | `[documented]` |
| `Report Issues` | AutoMod alert footer | `[documented]` — appears three times in the AutoMod article as the feedback route for false positives |
| `Ask before member joins` / `Allow multiple answers` / `Make Required` | Onboarding question toggles | `[documented]` — see T5 |
| `Subscribe to Updates` → `Subscribe` | Status page | |
| `Contact Us:` | Beginner's Guide foot | "Please reach out to our Support team through here: `dis.gd/contact`" — a **vanity short-link** used as user-facing copy |

**Observation:** Discord's *in-product* CTA labels (`Set recommended permissions`, `Flag Word`, `Close Post`, `Add to Post`, `Remove Timeout`) are short, verb-first and specific — genuinely good. Its *marketing and help* CTAs are the weakest in the batch: `Explore More` eight times on one page, `Download` pointing at `/login`, `Download for Mac` pointing at `#`, and three different labels for signing in. The gap between the two suggests two different teams with two different standards.

## T4 Onboarding & getting-started

**PRIORITY SECTION** (per the brief). Discord has two distinct onboarding problems and two distinct content solutions: teaching the *platform's* object model to a new user, and teaching a *specific server's* structure to a new member. It ships separate documentation for each.

### 4a. Platform onboarding — the `Beginner's Guide to Discord`

**Structure — seven sections, each a question or a task** `[observed]`

1. `What is Discord?`
2. `Account Setup and Troubleshooting`
3. `What is a Discord Server?`
4. `What are Text and Voice Channels?`
5. `How to Share your Screen`
6. `Additional Discord Features` (→ `Account Connections`)
7. `How to Customize your Discord User Profile`

Opens with `Welcome to the comprehensive beginner's guide to Discord!` then a `What this article covers:` contents list. **Three of seven headings are `What is/are…?` questions** — the guide's primary job is definitional, and it says so structurally. Sections 2 and 5-7 are tasks; sections 1, 3 and 4 are concept definitions. The interleaving (concept → task → concept → concept → task) tracks what a newcomer needs when.

**Note the ordering choice:** `Account Setup and Troubleshooting` is section **2**, before the product is explained. Signup friction is handled before the object model, which is pragmatic but means a reader who has not yet signed up is sent to three troubleshooting articles before learning what a server is.

**The definitional copy is the important artefact** `[observed]`

> **`What is Discord?`** — "Discord is a communication platform that allows users to interact through **text, voice, and video**. Users can join or create their own communities, which can be organized around various topics, interests, or gaming groups."

One sentence for the medium, one for the social structure. Note "communities" is used here as the generic, before `server` is introduced — Discord teaches the *concept* first and the *coined term* second.

> **`What is a Discord Server?`** — "Discord servers provide you with the ability to create **private, invite-only spaces** for your friends or community—places where you can connect, collaborate, and enjoy meaningful conversations together. **These dedicated spaces are what we call servers.**"

**"These dedicated spaces are what we call servers"** is the key sentence in Discord's entire terminology strategy. The pattern is: describe the thing in plain words → then name it → explicitly attributing the name to Discord ("what *we* call"). The coined term is presented as Discord's label for a concept the reader already understands, not as a thing the reader must learn cold. That construction is reusable for any invented product noun.

It is then immediately de-technicalised with four non-gaming examples: "Whether you're organizing a **book club** 📚, coordinating with classmates in a **study group** 🖊️, managing a **dance class** 💃, or simply staying connected with close friends". Emoji inline. For a product whose hero says "all fun & games", the beginner's guide works hard to say *not only games*.

> **`What are Text and Voice Channels?`** — "Your server is **made up of** text channels and voice channels. This allows you to communicate with the other members of the server."

The compositional relationship is stated in four words ("made up of"), then each type is defined by what it *organises*:

- **Text channels**: "provide dedicated spaces for written conversations, **helping to keep discussions organized and ensuring everyone has room to participate.** You can create individual channels for each topic your group enjoys discussing—whether that's planning fishing trips, sharing cooking tips, or any other shared interests."
- **Voice channels**: "allow you to connect with others through voice and video chat. **Simply click on a voice channel to join—no calling or ringing necessary.** Other members of your server can see when you're in a voice channel and easily **drop in** to chat, say hello on video, or share their screen with the group."

The voice-channel definition leads with the **absent friction** ("no calling or ringing necessary") because that is the thing a newcomer's mental model gets wrong — they expect a call. Naming what does *not* happen is how Discord corrects an imported mental model. And `drop in` joins `hop in` as the vocabulary of low-commitment entry.

Every section closes with a **captioned screenshot**: `Example of a Discord server` · `Example of what a Text Channel is in a Discord server` · `Example of what a Voice Channel is in a Discord server` · `Example of what it looks like when someone is streaming on Discord`. The caption grammar `Example of what X is in a Discord server` is clumsy but consistent.

**Each section ends with a labelled link list, gloss-first** `[observed]` — e.g. "`Setting Up Permissions FAQ`: Learn more about how to set up Server Permissions to manage and moderate your server members." Title-colon-gloss, repeated ~20 times. The glosses are functional here, not jokey — the register shifts the moment Discord moves from IA labels to instructional copy.

### 4b. Community onboarding — the server-side solution

**The problem statement is the best piece of user-empathy writing in this batch** `[observed]`

> "More and more people come to Discord every year to experience awesome communities like yours. But sometimes the experience of joining a new community can feel like **being cannon-blasted into a strange, foreign land** that gets new people asking **'Sooo… what am I supposed to do here?'** or **'Why are there so many channels?!'**"

> "The truth is, many new people on Discord trying to join your community **don't understand what 'bots' are, what roles do, or which of your many channels to check out. And when they get confused and overwhelmed, they just leave.**"

Discord states, in its own documentation to its own community operators, that **its coined structural vocabulary is a barrier to entry** — naming the three specific terms that fail (`bots`, `roles`, `channels`) and the specific behavioural consequence (they leave). Two invented user quotes carry the emotional register, complete with elongated "Sooo…" and an interrobang-adjacent "?!".

This is a product publicly conceding that its object model does not teach itself, and then shipping a feature to paper over it. For a content designer the transferable move is the **quoted-user-confusion device**: putting the failure in the user's voice, verbatim and ungrammatical, makes the case for the fix better than any metric.

**The five-step setup sequence** `[observed]`

1. `Add Default Channels`
2. `Create Customization Questions`
3. `Make sure most of your member channels are assignable through Onboarding`
4. `Review and publish`
5. `Remove verification steps that overwhelm or lock new members from joining your server`

Step titles 1, 2 and 4 are imperative verb phrases; **step 3 and step 5 are full sentences with embedded justification.** The two steps that ask the operator to *undo* prior work (assign leftover channels; remove bot gates) are the ones written as sentences — the longer form carries the persuasion the imperative cannot.

Step 5 is remarkable: Discord asks server operators to **delete the bot-powered verification gates they built**, anticipates the objection in the operator's own voice, and answers it:

> *"But Discord, wouldn't that make my server more vulnerable to raiders also trying to join my server?!"*
> "To that, we have the solution: **Raid Protection**"

The objection is set in italics, addressed to Discord by name, with the same "?!" as the earlier user quotes. A **rhetorical-objection pattern** used twice in one article, both times to move a reluctant operator.

**What the feature does, in the member's terms** `[observed]`

> "new members get to **pick out their own roles and channels** and enjoy a **personalized channel list** in your server by answering a few simple questions. Once they're in, they can adjust their answers to your questions to swap roles or channels at any time in a new **`Channels & Roles`** tab above their channel list."

Onboarding output is a *personalised channel list*, and the settings are permanently revisitable via a named tab. The reversibility is stated in the same sentence as the mechanism.

**Three question-level toggles, each with guidance on when to use it** `[observed]`

| Toggle | What it does | Discord's guidance |
|---|---|---|
| `Ask before a member joins` | Shows the question pre-join | "Questions that assign channels and important roles **should** be asked before a member joins." Questions without it land in `Channels & Roles` — "Use this for questions around non-urgent customizations, **like vanity roles**." |
| `Allow multiple answers` | Multi-select | "Great for those 'Choose all that apply' questions." |
| `Make Required` | Blocks entry until answered | "If a question assigns important channels, **consider making it required!**" |

`vanity roles` is a coined sub-type appearing only here — a role with no permission effect, purely decorative. Naming the *cosmetic* class of role is how Discord tells operators which questions are low-stakes.

**Content guidance for the operator — a genuine microcopy style guide** `[observed]`

> "Avoid including too many answer options or **members will feel overwhelmed**."
> "**Don't make answer options or descriptions too long!** Keep them **short and sweet** where possible so new members can read and answer them easily."
> "Try using a question like **'What would you like to do here?'** to assign your main channels"
> "You can also ask a question like **'What off-topic channels do you want?'** to assign off-topic channels"

Discord ships **exemplar question wording** to its volunteer operators, plus brevity rules and an overwhelm warning. This is a platform doing content design *on behalf of* its unpaid community managers — the same move Reddit makes with its automod snippet library. The two model questions are both second-person and both about intent rather than identity ("What would you like to do here?" not "Who are you?"), which is a defensible and teachable choice.

**Publishing gate, stated as a numeric threshold** `[observed]`

> "You must have selected **at least 7 Default Channels** · At least **5 of these channels must allow @everyone to View and Send Messages**"

A quality floor expressed as two numbers and a permission condition. The operator cannot ship an onboarding that leaves new members with nothing to do. Compare most platforms, which let you publish an empty config.

**Server Guide** `[observed]` — "we've begun testing a new feature within Community Onboarding called `Server Guide`." A second onboarding surface, in test, named as a *guide* rather than a flow. Not further documented in the harvested set.

**Re-onboarding is disclosed** `[observed]`: "Q: Will members who leave my server and rejoin have to go through my onboarding process again? **A: Yes.**" One word.

### 4c. Onboarding for forum channels

A third, smaller onboarding pattern `[observed]`: forum channels have `Post Guidelines` — operator-authored rules shown at post time — and Discord recommends a **staged rollout to the community**, with its own five-step sequence: create a private mod-only forum to test → identify existing text channels that fit → create new forums with guidelines and tags → **announce the change and ask for feedback** → if feedback is positive, migrate the "core" channels.

> "we recommend rolling out forums to your community **gradually**. This way, your community won't experience **big, jarring changes**, and they'll have time to get used to it."

Discord documents change-management for community operators. "big, jarring changes" is the concern named, and the remedy is announce-then-listen. Reusable framing for any feature migration.

## T5 Form & field labels

`[documented]` — from configuration procedures quoted in help articles. Discord's settings vocabulary is unusually well captured because its help articles are written as click-paths.

**Server configuration paths** `[documented]`

| Path | Terminal control |
|---|---|
| `Server Settings` > `Onboarding` | `Add Default Channels`; `Customization Questions`; `Preview`; publish |
| `Server Settings` > `AutoMod` | `Commonly Flagged Words` → `Set Up`; `Custom Keyword Rule` → `Set Up`; `Add exempt words`; `Edit Custom Message` |
| `Server Settings` > `Safety Setup` | `Edit` next to `Auto Mod`; under `Members`, `Block Words in Member Profile Names`; `Raid Protection` |
| `Mod Tools` (Reddit) | — |
| Member context menu | `Timeout` → duration + reason; `Remove Timeout` |
| Channel creation | channel type `Forum`; channel name; `Create Channel`; `Set recommended permissions`; `Create post guidelines`; `Edit Tags` |

**AutoMod filter and rule names** `[documented]`

Keyword filters: `Commonly Flagged Words Rule` · `Custom Keywords Rule`
Word-list categories, each with a one-line consequence:
- `Insults and Slurs` — "Protect members of your Community from personally insulting material targeted at them, including terms that may be considered slurs or hate speech."
- `Sexual Content` — "Keep sexually explicit language out of your server to keep your Community family-friendly."
- `Severe Profanity` — "**Block the more egregious forms of profanity, while still allowing for mild forms of cursing or swearing.**"

`Severe Profanity` is the standout label: the filter name contains its own severity threshold, and the gloss explicitly preserves mild swearing. Discord is naming a *calibration*, not a category — which is exactly what a community operator needs to know before switching it on.

Spam filters: `Block Spam Content Rule` · `Block Mention Spam Rule`
Response actions: block the message (with a custom message up to **150 characters**), send an alert to a chosen channel, and/or `time out users`.
Exemptions: `Add exempt roles or channels`; "Users with **Admin** and **Manage Server** permissions are always exempt from filter rules."

**Wildcard syntax taught with a three-strategy vocabulary** `[documented]`

> "1. **Prefix** -- at least one word in the message must start with keyword
> 2. **Suffix** -- at least one word in the message must end with keyword
> 3. **Anywhere** -- keyword can show up in any part of the message in the middle of any word"
>
> "Examples: `cat*` ⇒ get a **cat**-sitter · `*cat` ⇒ cool bob**cat** · `*ana*` ⇒ b**ana**nas"

Three named matching strategies, defined in one line each, then demonstrated with three worked examples where the match is bolded in situ. This is the clearest piece of technical-syntax teaching in the batch — it teaches a pattern language to non-technical volunteers in nine lines. Directly transferable to any product exposing a rule or filter syntax.

Hard limits stated: "The number of terms you can enter in each Custom Keyword Rule is capped at **1,000** with a **60 character limit** for each term." · mention limit "up to a maximum of **50** per message".

**Permission names surfaced as capitalised objects** `[documented]`: `Time Out Members` · `Manage Server` · `Manage Roles` · `Administrator` · `View` · `Send Messages` · `View Server As Role` · `Priority Speaker` · `@everyone`. Permissions are proper nouns in Discord's copy, which is consistent with the `Roles, Permissions, and Moderation` IA grouping.

**Forum-channel config** `[documented]`: `Post Guidelines` · `Tags` (can be made "a requirement before a member of your server makes a post") · `Hide After Inactivity` (options `1 hour` · `24 hours` · `3 days (this setting is selected by default)` · `1 week`) · default layout `List View` / `Gallery View`.

The layout options carry usage guidance rather than descriptions: `List View` — "works better for text-based discussions and allows users to easily jump in"; `Gallery View` — "tends to work better for media-focused forum channels." **Options glossed by fit, not by appearance.**

Live placeholders, validation and error text: `[absent]`.

## T6 Account, content and community states

**PRIORITY SECTION.** Discord has the most formalised account-standing model in this batch — five named standings, a violation lifecycle with an expiry, and a deliberate separation between the violation and its restriction.

### 6a. The five account standings, verbatim

> - **All good**: The user has no active violations and has access to all Discord features
> - **Limited**: The user has an active violation that temporarily limited access to some features. Further violations will result in more or longer limits.
> - **Very Limited**: The user has one or more active violations that temporarily limited access to more features for a longer period of time. Further violations may put the account at risk.
> - **At Risk**: The user has one or more active violations. Any further violations may result in a permanent suspension.
> - **Permanent suspension**: The user no longer has access to Discord due to severe or repeated violations.

Five states, and **each definition ends with the consequence of the next violation.** `Limited` → "more or longer limits"; `Very Limited` → "may put the account at risk"; `At Risk` → "may result in a permanent suspension". The ladder is self-documenting: a user reading their own standing is simultaneously told what happens next. That forward-pointing definition structure is the single most transferable element of Discord's enforcement copy.

The naming is also worth dissecting. `All good` is colloquial and reassuring. `Limited` and `Very Limited` are an **intensifier pair** rather than two distinct concepts — Discord chose "very" over inventing a second word, which keeps the ladder legible at the cost of sounding informal. `At Risk` shifts frame entirely: the first three states describe *what you can do*, `At Risk` describes *what might happen to you*. The register hardens at exactly the point the stakes do. And `Permanent suspension` is formal, four syllables longer than the rest, and is the state Discord explicitly renamed from `ban` (see T13).

Surface: `User Settings` > `My Account` > `Standing`. And: "For most users, they will see that they're all good, **and not much else**." The empty-standing state is designed to be uninformative — a deliberate choice to avoid teaching users the enforcement system they are not in.

### 6b. The violation lifecycle — two clocks, disaggregated

This is the most careful piece of state modelling in the batch:

> "It's important to understand that **violations and their associated restrictions are two separate things.** A restriction (such as a temporary limit on messaging or posting) **may lift before the violation itself fully expires.** Until a violation expires, it will remain listed under **Active Violations** and may continue to affect your account standing, **even if its associated restriction is no longer active.**"

> "Most violations expire after **90 days**, at which point they move to the **Expired Violations** section and no longer impact your account standing. More severe violations may remain active longer — **check the violation detail for its specific expiration date.**"

Two independent clocks — the *restriction* clock and the *violation* clock — and the copy exists precisely because users conflate them ("I served my week, why is my standing still Limited?"). Discord identified the misreading and wrote the reconciling paragraph rather than renaming the states. Same move as Wise's "why does it say complete when the money hasn't arrived" article.

Named sections: `Active Violations` · `Expired Violations` · `Account Standing`. And a per-violation expiry date is exposed in the detail view.

### 6c. Restriction states — feature-level, with published durations

> "if a user posted an image that broke the rules, they may **temporarily lose the ability to post images**. If the violation was not particularly severe, they may lose these features **for a few hours**. If it was a repeated violation or higher severity violation, they may lose some features **for a few days or up to one year.**"

Restrictions are **capability-scoped** (lose image posting, not lose the account) and **matched to the offence** (broke a rule with an image → lose images). Discord publishes the range — hours to one year — without publishing a tariff. Compare Reddit, which publishes exact durations (3-day, 7-day, permanent), and Twitch, which publishes only state names.

Feature-specific enforcement is also named: "violations related to specific Discord features, such as **Quests** may result in loss of eligibility for that feature or **removal of rewards obtained through prohibited behavior.**"

### 6d. Suspension states

> "This suspension can be **temporary (i.e. temp ban) or permanent (i.e. ban)**."
> "Temporary suspensions can last **up to 1 year**. A user's account and username will be preserved for that time. They will regain access at the end of the suspension."
> "**Permanent suspensions (formerly called 'bans') do not expire.** The user will lose their account. They will have a **grace period to appeal, after which their username will be made available again.**"

Three details worth recording. The parenthetical glosses (`i.e. temp ban`, `i.e. ban`) teach the *old* vocabulary alongside the new — Discord renamed the state and kept the legacy term as a translation aid, which is the opposite of Pinterest's approach (three names, no hierarchy). Username preservation is stated as a *property of the state*, which is what a suspended user actually wants to know. And the grace period is defined by its **terminal consequence** — after it expires your username is released — rather than by a duration, which is a slightly evasive but honest construction.

A suspended user retains partial access: "A suspended user will still be able to **log-in to review their Account Standing**, and see both their violations and the duration of their suspension. This view will be available for the duration of the suspension." **The enforcement surface survives the enforcement.** Most platforms lock the door entirely; Discord keeps the appeal room open.

### 6e. Server (community) states

> "When a server is focused on or contains a lot of content that breaks Discord's rules, **the owner will receive a violation and the guild may be removed or restricted.**"
> "The server **may be removed or lose access to certain features.** The owner **may lose the ability to create more servers** or be permanently suspended."
> "When a server is engaged in serious violations of Discord rules, **the server's members may also receive a violation that affects their account standing.**"
> "**Only the server owner can request a review of server violations.**"

Four distinct planes from one server-level action: the server, the owner's account, the owner's *future* server-creation capability, and **the members' individual standings**. That last one is the sharp edge — membership of a bad server can damage your own record. And the appeal right is scoped to the owner alone, so members carry a consequence they cannot contest. Discord states both facts plainly and does not reconcile them. Recorded as an observed asymmetry, and arguably the most consequential unfairness disclosed in this batch.

Note `guild` appears here — the API-layer term for a server — leaking into consumer-facing help copy. See T13.

### 6f. Server-level member states (moderator-applied)

| State | Consequence as worded |
|---|---|
| `time out` | "the affected user won't be able to **send messages, react to messages, join voice channels or video calls** while in time out." Can still "view/read channels"; "they have not been removed from the server"; "they will be able to react to messages that already have reactions, **but cannot add new reactions.**" |
| Durations | `60 seconds`, `5 minutes`, `10 minutes`, `1 hour`, `1 day`, `1 week` — six published options |
| Reason | Recorded in the **audit log** |
| Visibility | "Moderators and Admins with the ability to timeout users will see an **icon after the time stamp**. All other server members will see the message unchanged and the timed out users messages will appear **'normal'**." |
| Removal | `Remove Timeout`, available at any time |
| Scope limit | "Right now the feature only allows you to **mute them from all channels**" — a per-channel option does not exist, and Discord says so |
| Where to see them | The server's `Members` page lists timed-out members |
| Who can apply | Requires the `Time Out Members` permission; AutoMod can also apply it |

The **asymmetric visibility** is the notable design: the timeout is invisible to ordinary members, visible as an icon to moderators, and visible as a state to the timed-out user themselves. Three audiences, three renderings, documented. Discord also explicitly notes that the timed-out user's *existing* messages look normal — so a timeout does not retroactively mark their history. That is precisely the kind of detail that prevents a community from turning a moderation action into a social punishment.

`Slowmode` is a named adjacent state (own FAQ). `Older Posts` is a forum-level inactivity state: "Once a post has been inactive for a certain period of time, it'll automatically be moved to the `Older Posts` section." And forum posts can be **closed** or **locked** — "Unless a forum post is locked, the post can be reopened at any time. Even if it's closed." Two distinct terminal states with different reversibility, distinguished in one sentence.

### 6g. Platform status states

`[observed]` from `discordstatus.com`: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Plus per-day history states `No downtime recorded on this day.` / `No data exists for this day.` / `had a major outage.` / `had a partial outage.`

**Live/presence states** `[documented, partial]` — the marketing site describes seeing "who's around, playing games, or just hanging out", a `Custom Status`, and "For supported games, you can see what modes or characters your friends are playing". The presence-state *labels* (Online/Idle/Do Not Disturb/Invisible) were **not observed** and are not recorded.

## T7 Error, failure & recovery

`[observed / documented]`, and strong on the moderation-failure side.

**False positives are a first-class topic with a dedicated control** `[observed]`

The AutoMod article addresses filter failure four separate times, each time routing to the same named affordance:

> "This filter is not perfect so **it might not catch everything** that you may consider spam; for example, nonsensical words across multiple messages or 'copy/pasta' messages."
> "if you come across a message that was **incorrectly flagged as spam**, click the `Report Issues` button below the flagged message to let us know."
> "**Q: I found spam that Discord missed, what should I do?**"
> "**Q: I have the Commonly Flagged Words rule enabled - why am I still seeing undesirable words?**"

The last question is answered with a genuinely thoughtful explanation rather than a deflection: "we understand every Community has their own rules and tolerance for certain words. Some communities prefer to maintain a more family-friendly environment, while others accept and encourage rowdier language. And **oftentimes it's not the word itself that causes harm, but the intent with which it's being used.** Because of these considerations, our Commonly Flagged Words filters **may not catch everything.**"

A machine-learning limitation explained via a *semantic* argument (intent, not tokens) rather than a technical one. That is the right register for a volunteer operator and it forestalls the "your filter is broken" complaint by reframing it as an irreducible property of language.

**A refusal, with the reason given** `[observed]`

> "**Q: How can I see all the words that the Commonly Flagged Words filters contain?**
> A: We understand you want to see the words in these word lists to decide whether they'll be effective… **However, for the time being we will not publicize words in these word lists in order to maintain their protective efficacy.** This is to ensure those with malicious intent can't easily develop means to circumvent them… We value providing transparency into the thinking that went into making these word lists, and will address those topics in a future post on our blog."

Acknowledge the need → refuse → give the security rationale → commit to partial future transparency. Four moves in a short paragraph. This is how to decline a legitimate transparency request without stonewalling, and it is directly applicable to fraud-rule and risk-model questions.

**Language-evolution as a documented limitation** `[observed]`: "we recognize that **language is fluid and always evolving, and the words of today may not carry the same meaning tomorrow.** We'll continue to explore ways to offer communities further customization with our filters, and will regularly refine them using your reports and feedback."

**Lockout recovery** `[documented]` — article titles only: `Help! I'm old enough to use Discord in my country but I got locked out?` (exclamation *and* question mark, first person, in a help title — the most emotionally rendered title in the batch), `Why isn't my DM going through?`, `Discord Login & Email Troubleshooting Guide`, `Command Permissions Lockout`, `Invalid Invite Links`, `Limited Access FAQ`.

`Command Permissions Lockout` is notable: a named failure state where a server operator locks *themselves* out of their own commands. Discord documents self-inflicted misconfiguration as a first-class recovery topic.

**Incident communication** `[observed]` — `discordstatus.com` uses a rigid four-stage vocabulary, with the stage name bolded as the sentence's subject:

> **Investigating** - "We are currently investigating this issue."
> **Identified** - "The issue has been identified and a fix is being implemented."
> **Monitoring** - "A fix has been implemented and we are monitoring the results."
> **Resolved** - "This incident has been resolved."

Four stages, one canonical sentence each, reused verbatim across incidents. Variants appear where the situation differs: "we are monitoring **recovery of services**", "The issue has been identified and we are **working to restore service**", "We are currently investigating an issue involving **high error-rates for image downloads**."

**The best incident update in the harvest** `[observed]` — the Google Pay outage, in the `Identified` stage:

> "We're currently experiencing an issue that prevents users from completing purchases (including Nitro subscriptions and Shop items) through the Android app. **This is caused by an ongoing outage with Google Play.**
> Purchases on other platforms (iOS, web, and desktop) **are unaffected, and existing subscriptions remain active.**
> We're monitoring Google's status and will post an update as soon as service is restored. **No action is needed on your part — please try again later.**"

Five moves in three short paragraphs: symptom, **named external cause with a link to the third party's own status page**, explicit scope of what is *not* affected, what Discord is doing, and what the user should do (nothing). "No action is needed on your part" is the sentence most incident comms omit and every user wants. Attributing the fault to Google by name, with a link, is a transparency choice most platforms avoid. This is the strongest single artefact in the Discord harvest and the most directly transferable to PayPal payment-incident comms.

Incident titles are short noun phrases: `API Errors` · `Session Unavailability` · `Media Proxy Latency High` · `Google Pay Outage` · `Issue establishing voice call` · `Issue / Delay in establishing call connection`. Note the last two are two titles for near-identical incidents on consecutive days — and `Media Proxy Latency High` is written in adjective-final ops-speak while the others are readable. Minor inconsistency.

## T8 Empty states

`[observed]`, limited but real.

**Status-page empty states** `[observed]`:
- `No incidents reported today.` — used for the current day
- `No incidents reported.` — used for prior days
- `All Systems Operational` — the aggregate healthy state
- `No downtime recorded on this day.`
- `No data exists for this day.`
- `No incidents or maintenance related to this downtime.`
- `Fetching` — the loading state of the API-response-time graph

The today/prior-day split (`No incidents reported today.` vs `No incidents reported.`) is a small, correct touch: the present tense gets the temporal qualifier. And `No data exists for this day.` is distinguished from `No downtime recorded on this day.` — **absence of data is not reported as absence of problems.** That distinction is frequently botched on status pages and Discord gets it right.

**Account-standing empty state** `[documented]`: "For most users, they will see that they're **all good, and not much else.**" A deliberately sparse empty state for the enforcement surface.

**Forum-channel empty state** `[documented]`, implied: the publishing gate prevents an empty onboarding config ("at least 7 Default Channels"), and unassigned channels are surfaced to the operator as a warning — "**We'll let you know which channels haven't been assigned.**" A **partial-configuration** state, reported to the operator as an incomplete-setup nudge rather than an error.

In-product empty states (no servers, no friends, no messages): `[absent]`.

## T9 Enforcement notification and appeal copy

**PRIORITY SECTION.** Discord's `Discord Warning System` is the most complete enforcement-communication document in this batch, and its distinguishing feature is that it explains the *design philosophy* of the system before the mechanics.

**The philosophy statement, which frames everything after it** `[observed]`

> "The **Discord Warning System** informs users **when they have broken our rules, what actions we have taken, and how it may impact their overall account standing.** This system includes **multiple touchpoints** for users to have more transparency into Discord interventions in order to better understand what happens when our rules are broken and **how to avoid receiving a warning or violation in the future.**"

> "This system is built to be **fair and transparent** to users. **We want users to learn our rules and stay on the platform, whenever possible.** We have designed the system to **show users what they did wrong, provide more educational resources about our rules, and to place appropriate restrictions on accounts so that Discord users get a chance to make things right.**"

> "The system gives users **room to learn from their mistakes and change their behavior.** We believe that **helping people learn how to follow Discord's rules makes the platform safer.**"

> "**However**, because protecting our users is a top priority, when we become aware of a user engaging in **repeated violations or particularly egregious harms**, we will take **swift action to permanently remove** that user and the violating content."

Four paragraphs: the system's informational purpose → its rehabilitative intent → its tolerance for error → the hard limit. The pivot on "However" is doing structural work — three paragraphs of generosity, then the exception, in that order. **Rehabilitation-first framing with the exception last** is the inverse of the usual enforcement preamble, and it changes how every subsequent restriction reads.

"get a chance to make things right" is the operative phrase. Compare Reddit's "foster and encourage positive contributions" (same intent, more institutional) and Twitch's "remorse, taking responsibility" (same intent, more penitential).

**The violation notification — channel, format and contents** `[observed]`

> "Users who break the rules will receive a **system direct message (DM) from Discord** letting them know they received a violation. Users will receive a DM **each time** they break our rules."
> "Within the DM, users will see a **card that summarizes the violation. Pressing on the card will reveal further details.**"

Card contents, enumerated:
> - "which **specific policy** they violated"
> - "it may include detail about **which content** broke our rules"
> - "it lists **any actions that Discord has taken** on the user"
> - "a link to a **policy explanation** for the relevant Discord Community Guidelines"

**Four-element notification spec: rule, evidence, consequence, education.** The evidence element is hedged ("may include"), which is honest. The fourth element — a link to a *policy explainer* rather than to the policy itself — is the rehabilitative intent made operational: the user is sent to an explanation, not a legal text. Discord maintains a full set of these (`Bullying, Harassment, and Threats Policy Explainer`, `Doxxing Policy Explainer`, `Hateful Conduct Policy Explainer`, `Platform Manipulation Policy Explainer`, `Deceptive Practices Policy Explainer`, `Identity and Authenticity Policy Explainer`, `Misinformation Policy Explainer`, `Sexual Content Policy Explainer`, `Non-Consensual Adult Intimate Media Policy Explainer`, `Suicide and Self-Harm Policy Explainer`, `Violence and Graphic Content Policy Explainer`, `Teen and Child Safety Policy Explainer`, `Dangerous and Regulated Goods Policy Explainer`, `Gambling Policy Explainer`, `Human Trafficking Policy Explainer`, `Sexual Solicitation Policy Explainer`, `Violent Extremism Policy Explainer`, `Discord Support Abuse Policy Explainer`, `Off-Platform Behaviors Policy Explainer`, `Copyright & Trademark Policy Explainer`). **Twenty policy explainers as a parallel content set to the guidelines themselves** — one per harm category, each linked from the rule it explains. That is a substantial content-ops commitment and the reason the notification can afford to link to an explanation.

**How the action is chosen, disclosed** `[observed]`

> "Our system determines a relevant and specific set of actions to take for a particular violation… When weighing what action to take, we consider **the severity of the harm, the type of user content (i.e. text, image, behavior), and the user's history of past violations.**"

Three named factors, one of them unusual: the **type** of content matters, which is why an image violation costs you image posting. The consequence is matched to the modality of the offence — an enforcement design Discord explains with a worked example rather than a principle.

**Warnings vs violations — two instruments, explicitly distinguished** `[observed]`

> "Discord sends **warnings** to inform users about our rules. We issue these warnings **if a user was in a server that violated our rules or if they interacted with rule-breaking content—even if they didn't participate in the violation themselves.**"
> "**Warnings do not impact account standing** but are still important for users to understand our rules so they can correct future behavior."

And the FAQ restates the distinction:

> "**Q: What's the difference between a violation and a warning?**
> A: Discord issues **violations** when we become aware of users who have broken our rules. Discord will take action on their account and their account standing will be impacted… **Warnings** may be issued when a user was in a server that broke our rules or engaged with content that broke our rules, **but the user did not do anything themselves.** Warnings do not affect account standing. They provide users with more information about the rules."

A **no-fault notice**. Discord has built and named an instrument for telling a user "something happened near you, here are the rules" without penalising them. Sending an adverse-looking message with an explicit "this does not count against you" is a real content-design achievement — and it needs the FAQ restatement precisely because the notification will still frighten people.

**Requesting a review — the appeal copy** `[observed]`

> "**Sometimes we get it wrong.** Every violation notice includes a **link to our webform**, where users can provide feedback or ask that Discord review a violation and penalty applied to their account. **While it may take time to respond to every request, we prioritize helping users that believe they have been permanently suspended in error.**"
> "Users can **let us know** if they feel Discord took an **unwarranted action** against their account."

"Sometimes we get it wrong." Three words, full stop, opening the appeal section. The most economical error-admission in the batch — compare Instagram's "We know we don't always get it right when we decide to remove a post" (thirteen words) and Reddit's institutional "we reverse our original decision if we determine that our initial assessment was incorrect."

Then a **published triage rule**: permanent suspensions are prioritised. Discord tells users the queue is not FIFO and which cases jump it. No turnaround time is given — recorded as a gap, though the triage disclosure partly compensates.

**Appeal scope, bounded** `[observed]`

> "**Q: Can I appeal my account standing overall?**
> A: **No, you cannot appeal your account standing overall. You should appeal specific violations that contribute to your account standing.**"

A "no" that immediately supplies the correct action. And for servers: "**Only the server owner can request a review of server violations.**"

**The "no strikes" clarification** `[observed]`

> "**Q: How many chances do I get? What are the penalties for one violation or five violations?**
> A: **Discord's violations are not strikes and there is no simple formula from number of violations to specific penalties.** We weigh the severity and context of each violation and we look at a user's history of past violations when calculating the user's account standing."

A compound question (the user's real question plus its arithmetical form), answered by **rejecting the premise** and naming the competing model (`strikes`) it is not. Discord is explicitly differentiating from YouTube/Instagram-style strike systems. Contrast Instagram, which *does* use `strike` as a countable unit with a 12-month window — the two products in this batch have opposite models and both explain theirs in terms the other would recognise.

**The standing-jump question** `[observed]`

> "**Q: Why did my account standing jump from 'All Good' to a permanent suspension?**
> A: Each violation is weighed differently – depending on the severity of the incident. A high severity violation may cause the account standing to change more dramatically. **The most severe violations lead straight to a permanent suspension (i.e. violations ofto a child safety policy).**"

The ladder's own exception, asked in the user's words. Note the typo — "**violations ofto** a child safety policy" — a live defect in the highest-stakes sentence of Discord's enforcement documentation.

**Scanning disclosure, prompted by the system's launch** `[observed]`

> "**Q: Are you now scanning all my messages in servers, group chats and DMs?**
> A: **Our Warning System doesn't introduce any new scanning of content or messages.** This feature is a new way for users to have more transparency into Discord content moderation decisions…"
> "Discord **does** scan all spaces for high harm content like malware and child sexual abuse material, and we **may** scan for other policy violations in **large communities**. We do ***not*** scan all content in smaller spaces such as direct messages (DM), group chats, and small/non-community servers–for other violations of our Community Guidelines."

A privacy question the *feature launch itself* provoked, answered with a three-tier scanning map: universal scanning for the highest harms, conditional scanning in large communities, no general scanning in small/private spaces. The "not" is italicised. This is a precise and falsifiable privacy disclosure inside an enforcement FAQ — an unusual place to find one, and exactly where the anxious reader is.

**Escalation ladder, assembled** `[observed]`: warning (no standing impact) → violation DM with card → feature restriction (hours to 1 year) + standing change → repeated/severe → temporary suspension (up to 1 year, account preserved) → permanent suspension (account lost, grace period to appeal, then username released). Appeal via webform per-violation at any rung; suspended users retain login access to the standing page for the duration. Server violations run a parallel track affecting owner, server, owner's creation rights and members' standings.

**Rollout disclosed with a date** `[observed]`: "The Warning System started rolling out on **October 24th, 2023** in **select regions**." Plus a forward pointer: "`View our Safety News Hub` for many more updates to our Warning System in the future."

**Sitewide enforcement preamble** `[observed]`, from the Community Guidelines:

> "Our Trust & Safety team reviews reports by **users, moderators, trusted third-party partners, or where required by law.** When we proactively or reactively discover a violation of these Guidelines, we may take **a number of enforcement steps** based on the severity of the violation, including **issuing warnings, removing content, temporarily suspending account access to Discord, or permanently removing violative accounts and servers, and even reporting them to law enforcement.** We may also consider relevant **off-platform behavior**."

Four report sources named (including "trusted third-party partners", which is unusual to disclose), five enforcement steps in ascending order, and an off-platform-conduct clause with its own linked explainer.

**Anti-vigilantism clause** `[observed]` — and this is a distinctive one:

> "please note that we **strongly discourage and may take action against vigilantism**, as this behavior can put individuals in harm's way and can also **interfere with our investigations and ability to report to law enforcement.**"

Discord penalises users for *enforcing the rules themselves*, and gives two reasons — user safety and investigation integrity. Also a named violation in its own right: "Do not submit **false, misleading, or abusive reports or requests** to Discord's support teams."

**Spirit-of-the-rules clause** `[observed]`: "we may take action against an account, server, or content that **violates the spirit of these Guidelines** when we encounter a new threat or harm that is not explicitly covered in the current version." An explicit reservation of discretion beyond the written rules, disclosed rather than hidden.

**Closing line of the Community Guidelines** `[observed]`: "we will always make our best effort to notify you when we update these Guidelines, but **it is up to you to follow them** and to use Discord responsibly: Keep Discord safe and help us ensure it remains a great place to build friendships around the joy of playing games. **Thanks for doing your part.**"

A policy document that ends by thanking you. The register shift back to warmth in the final sentence is the same move as the Safety Center's, and it is Discord's signature.

## T10 Disclosures, legal & compliance

**Community Guidelines structure — 27 numbered rules in three named groups** `[observed]`

| Group | Rules | Theme |
|---|---|---|
| `Respect Each Other` | 1-12 | Harms to people: harassment, threats, doxxing, hate, extremism, child safety, teen safety, sexual content, NCII, self-harm, gore |
| `Respect Discord` | 13-23 | Harms to the platform: spam, self-bots, inauthentic engagement, asset sales, misinformation, impersonation, evasion, security, scams, fraud, support abuse |
| `Follow Applicable Laws` | 24-27 | Legal compliance: IP, regulated goods, gambling, dignity/trafficking |

**Three groups, three objects of respect: people, platform, law.** The group names are imperatives addressed to the reader (`Respect Each Other`, `Respect Discord`) then a flat instruction (`Follow Applicable Laws`). The escalating formality across the three headings mirrors the escalating externality of the obligation. Clean, memorable, and it gives every rule a home.

**Every rule follows the same three-part shape** `[observed]`: **bold imperative prohibition** → clarifying sentence(s) with examples → parenthetical cross-reference to a policy explainer. E.g.:

> "**1. Do not promote, coordinate, or engage in harassment.** We do not allow any type of harassing behavior, including sexual harassment, **ban or block evasion**, or coordinating server joins for the purpose of harassing server members, **also referred to as 'server raiding.'** (See our `Bullying, Harassment, and Threats Policy Explainer` for more.)"

Note the in-line gloss of community slang: `server raiding` is defined inside the rule that prohibits it. Same device Reddit uses. `raid` recurs as both a prohibited behaviour here and a *product feature* on Twitch (150) — the same word, opposite valence, across two platforms in one batch.

The numbering has a **defect**: the table of contents at the top lists items `1.` through `17.` with bullet sub-markers, while the body runs to **27** numbered rules. The TOC and the body disagree.

**Definitions inside rules** `[observed]` — Discord defines its key terms in the rule text rather than a glossary:
- "We consider **hate speech** to be any form of expression that either attacks other people or promotes hatred or violence against them based on their **protected characteristics.**"
- "A **financial scam** is any intentionally deceptive act taken with the intent to receive an illegal, unethical, or otherwise dishonest gain."
- "**Regulated goods** have laws in place that restrict the purchase, sale, trade, or ownership of the goods. **Dangerous goods** have a reasonable potential to cause real-world, physical harm to individuals."
- "A report or request will be considered **false or misleading** if it contains demonstrably untrue information submitted with the intent to manipulate staff into taking a desired action."
- "**personally identifiable information (PII)**" — expanded on first use.

**Age and teen-safety disclosure** `[observed]`

- Rule 7 addresses the teen **directly, in the second person, inside a policy document**: "**If you are under the age of 18, you may not engage in sexual conduct** or any other conduct using Discord that puts your online or physical safety at risk." Every other rule says "Do not…"; this one says "you may not". The grammatical shift marks the protected reader.
- Rule 7 also bans teen dating spaces with a stated rationale: "**We want teens to be able to express themselves as authentically as possible on Discord. However, given the risks associated with online dating, we will remove spaces that encourage or facilitate dating between teens.**" Concession, pivot, rule.
- Rule 9 establishes the age-restriction mechanic: "Discord users must be aged **18 or older** to view, gain access to, or participate in adult sexual content… Server owners must apply an **age-restricted label** to any channels that contain sexually explicit content… Users may not post sexually explicit content **in any space that cannot be age-restricted, including in avatars, custom statuses or bios, server banners, server icons, invite splashes, emoji, and stickers.**" **Eight surfaces enumerated as un-gateable.** That enumeration is the useful artefact: it tells operators exactly where the label cannot save them.
- Named teen-safety features: `Teen Safety Assist`, `Family Center`, `Teen Charter`, `Discord Sensitive Content Filters`, `Discord Safety Alerts`.
- Related article titles evidence the age-gating friction: `Why is Discord asking for my birthday?` · `Help! I'm old enough to use Discord in my country but I got locked out?` · `How to Access an Age-Restricted Server FAQ` · `What are Age-Restricted Servers on Discord?`

**NCMEC reporting, stated twice** `[observed]`: "We report child sexual abuse material (CSAM) and grooming to the `National Center for Missing & Exploited Children`, which may subsequently work with local law enforcement." Repeated verbatim under rules 6 and 8 — deliberate redundancy on the highest-stakes disclosure.

**Policy versioning** `[observed]`

> `Effective: September 29, 2025` · `Last Updated: August 29, 2025` · `Archived Versions`

**Two dates and a link to an archive.** The effective date is a month *after* the last-updated date, so Discord publishes a one-month notice period between finalising a policy and enforcing it — the same forward-dating pattern Pinterest uses, implemented as a date pair rather than a banner. And `Archived Versions` means the user can read what the rules used to say. Together these are the best policy-versioning disclosure in the batch.

**Separate regimes named** `[observed]`: `Terms of Service` · `Monetization Policy` · `Monetization Terms` · `Discord Developer Terms of Service` · `Discord Developer Policy` · `Copyright & Intellectual Property Policy` · `Discovery Guidelines` · `Community Guidelines`. Note the Monetization Policy and Monetization Terms are given **the same URL** in the guidelines' prose — two named documents, one link. A real defect on a commercial-compliance reference.

**Transparency Hub** `[observed]`: "Transparency reports cover information about **enforcement of our platform policies, as well as our response to user data and intellectual property requests.**"

**Status-page subscription disclosures** `[observed]`: "Message and data rates may apply." · "This site is protected by reCAPTCHA and the Google `Privacy Policy` and `Terms of Service` apply." · Atlassian Statuspage terms disclosed for the SMS channel. Third-party dependencies named at the point of consent.

## T11 Help-centre architecture

**Three-level tree:** Category (9) → Section (named, with article counts) → Article. Breadcrumbs on every article, e.g. `Discord` → `Safety, Privacy, and Policy` → `Server Safety`, and `Discord` → `Server Settings` → `Roles, Permissions, and Moderation`.

Note the breadcrumb root is `Discord`, not `Help Center` — a small oddity that makes the first crumb uninformative.

**Sidebar `Articles in this section` module** `[observed]` — rendered **twice** on every article page (once above the breadcrumb, once below), listing ten sibling articles plus `See more`. The duplication is a template defect affecting every help article.

**Section names, harvested** `[observed]`

Under `Discord Basics`: `Getting Started` · `Messaging and Chat` · `Voice, Video, and Streaming` · `Friends` · `Features`
Under `Server Settings`: `Server Features` · `Roles, Permissions, and Moderation` · `Integrations` · `Communities and Discovery` · `Invites`
Under `Safety, Privacy, and Policy`: `Server Safety` (evidenced via breadcrumb)
Also evidenced: `Video Tutorials` (a category), `Connections` (a section)

**Article-title grammar — six shapes, with a strong FAQ bias** `[observed]`

| Shape | Examples |
|---|---|
| `<Feature> FAQ` | `Time Out FAQ` · `AutoMod FAQ` · `Forum Channels FAQ` · `Polls FAQ` · `Threads FAQ` · `Guilds FAQ` · `Spoiler Channels FAQ` · `Stage Channels FAQ` · `Pause Invites FAQ` · `Audio Bitrate FAQ` · `Server Guide FAQ` · `Community Onboarding FAQ` · `Limited Access FAQ` · `Discord Admin FAQ` · `You Bar FAQ` · `Custom Typing Indicator FAQ` · `Voice Channels FAQs` (note the plural) |
| `<Topic> 101` | `Invites 101` · `Channel Permissions Settings 101` · `Notifications Settings 101` · `Friends List 101` · `Profile Badges 101` · `How to Protect Your Server from Raids 101` · `Instant Invite 102 - Group Invites` |
| `<Topic> Guide` | `Beginner's Guide to Discord` · `Discord Server Setup Guide` · `Discord Sign-Up and Registration Guide` · `Discord Commands, Shortcuts, and Navigation Guide` · `View Server As Role Permission Guide` · `Discord Login & Email Troubleshooting Guide` · `Discord Voice and Video Troubleshooting Guide` |
| `How to <verb>…` | `How to Verify Your Discord Account` · `How to Log In to your Discord Account` · `How to Screen Share on MacOS` · `How to Use Voice Filters on Discord` · `How to Use the LFG Channels to Find Game Sessions on Discord` |
| `How do I…?` | `How do I join a Server?` · `How do I add friends on Discord?` · `How do I invite friends to my server?` · `How can I change Discord's Language?` · `[iOS] How do I create an Invite link on my iOS device?` |
| Bare noun/feature | `Members Page` · `Server Profile` · `Custom Emojis` · `Avatar Decorations` · `Profile Effects` · `Message Forwarding` · `Clarifying Server Types` |

**`FAQ` and `101` are the two dominant suffixes**, and together they define Discord's help register: `101` for foundational concepts (course-catalogue metaphor, extended to `102` for the sequel), `FAQ` for feature-specific detail. That is a legible two-tier system — a user learns that `101` means "start here" and `FAQ` means "the details" — and it is applied consistently across ~40 observed titles.

**Inconsistencies recorded:** `Voice Channels FAQs` (plural) against `Forum Channels FAQ` (singular). `How to Log In to your Discord Account` — mid-title case drop on "your". `[iOS]` as a bracketed platform prefix on one title and `How to Screen Share on MacOS` as a suffix on another. `Clarifying Server Types` is the one title in the set that reads as an internal note rather than a user need.

**Article metadata** `[observed]` — each article shows an **author avatar and handle** (`kynthia`, `Buffy`, `Librarian`) plus a date and `Updated`. Named, personified support authors with Discord-flavoured handles and mascot avatars. Reddit shows only a date; Pinterest shows nothing. Discord's help centre has a byline culture, which is consistent with its voice strategy and unusual at this scale.

Date spread observed: `June 05, 2026`, `June 15, 2026`, `July 03, 2025`, `October 01, 2024`, `October 24, 2024`, `March 31, 2023`. The Community Onboarding FAQ — a priority document for this brief — was last updated **March 2023** and still describes `Server Guide` as a new test. **Three-year-old copy on a flagship onboarding feature.** Recorded as a content-ops defect.

**Helpfulness ratios are public** `[observed]`, and they are damning in places:

| Article | Ratio | Rate |
|---|---|---|
| `Beginner's Guide to Discord` | 284012 / 340833 | 83% |
| `Time Out FAQ` | 46423 / 88674 | 52% |
| `AutoMod FAQ` | 3581 / 5487 | 65% |
| `Discord Warning System` | 17213 / 42841 | **40%** |
| `Forum Channels FAQ` | 1229 / 3100 | **40%** |
| `Community Onboarding FAQ` | 578 / 1228 | **47%** |

Discord publishes the fact that **60% of the 42,841 people who rated its enforcement article did not find it helpful.** That is a remarkable transparency choice and a remarkable diagnostic: the best-written enforcement document in this batch is the worst-rated article on its own help centre. The likely reading is that users arriving at an enforcement article want their account back, not an explanation — no amount of content quality satisfies that. Worth carrying as a caution: **helpfulness scores on adverse-outcome articles measure outcome satisfaction, not content quality.**

## T12 FAQs

Discord is FAQ-saturated: `FAQ` is a title suffix on ~17 observed articles, and the long-form articles each end with a `Frequently Asked Questions` block whose answers **render in full**.

### Discord Warning System — 9 questions `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Are suspensions temporary or permanent? | Both; temp up to 1 year with account/username preserved; permanent never expires, grace period to appeal, then username released |
| 2 | Do any current or past violations I received before the launch of the Warning System count against my account standing? | No — only post-launch violations count |
| 3 | Why did my account standing jump from "All Good" to a permanent suspension? | Severity weighting; most severe violations skip the ladder (contains a typo) |
| 4 | How many chances do I get? What are the penalties for one violation or five violations? | Rejects the premise: "violations are not strikes and there is no simple formula" |
| 5 | What to do if I want to report another Discord user's actions? | Routes to the reporting article |
| 6 | Can I appeal my account standing overall? | No — appeal the specific violations |
| 7 | What's the difference between a violation and a warning? | Violation = you did it, affects standing; warning = happened near you, does not |
| 8 | Are you now scanning all my messages in servers, group chats and DMs? | No new scanning; three-tier disclosure of what is and isn't scanned |

**Ordering:** duration → grandfathering → the ladder's exception → the arithmetic question → reporting others → appeal scope → the warning/violation distinction → privacy. It opens on "how long" and closes on "are you reading my messages" — the first and last questions a suspended user actually has. Q2 (grandfathering) placed second is a launch-era artefact that has never been re-sorted.

Q4 is a **compound question in the user's own idiom** ("How many chances do I get?") followed by its formal restatement — Discord writes both the emotional and the analytical version of the question into one label, then answers the analytical one. Same device Wise uses in its compound FAQ questions.

### Time Out FAQ — 7 questions `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What are the time limits I can put on time out? | Six options, 60 seconds to 1 week |
| 2 | Can I mute people from specific channels instead of the whole server? | "Right now the feature only allows you to mute them from all channels" |
| 3 | Can I see a list of which members have been muted? | Yes, the `Members` page |
| 4 | Can users who have been Timed Out still view/read channels? | Yes; can react to existing reactions but not add new ones |
| 5 | Can I remove Time Out before the original time period? | Yes, whenever you want |
| 6 | Can Automod time out server members? | Yes, via configured filters |
| 7 | Can apps access this feature? | Yes, via the API |

Six of seven begin with `Can I` / `Can users` / `Can apps` — a **capability-probing FAQ**. Q2 is a documented feature gap answered honestly ("Right now"). Note the terminology drift *within the FAQ*: Q2 and Q3 say `mute`/`muted` while the article's own term is `time out`. Two words for one state in one FAQ block.

### AutoMod FAQ — 12 questions `[observed]`

Availability (who has it, what filters exist, what languages), then mechanics (what it detects, who can edit, how keyword matching works, how wildcards work, does it cover threads and voice text, does it flag app messages), then limitations (why am I still seeing bad words, can I see the word lists, will the lists be updated, what does the spam filter miss, I found spam you missed, how will you use my feedback).

**Twelve questions, and the last five are all about the feature's failure modes.** The FAQ is structured availability → mechanics → limitations, with limitations given the most space. For a machine-learning feature sold to volunteers, weighting the FAQ toward "here is what it will not do" is the right call.

`Q: What languages does AutoMod support?` gets an honest split answer: custom keywords work in any language, but "the word lists of Commonly Flagged Words, as well as the Spam Content filter, are **currently only available in English.**" A localisation gap disclosed in the FAQ rather than buried.

### Forum Channels FAQ — 9 questions `[observed]`

The two **definitional** questions are the valuable ones:

> "**Q: What's the difference between Forums and Text channels?**
> A: While Text channels are great for **in-the-moment** discussions, Forum channels provide a place for **more drawn-out** discussion around specific topics. Discussions are tied to individual posts so they are more organized and easier for members of your community to get up to speed and join a conversation."

> "**Q: What's the difference between Forums and Threads?**
> A: The main difference is that **Forums are a type of *channel*, while threads are a type of *message*.** While they are similar in that they both create dedicated spaces for organized discussions, **Forum Channels are more persistent, while threads are more temporary.**"

The second answer is the best terminology sentence in the Discord harvest: it resolves a confusion between two coined terms by placing each in the **object hierarchy** (channel vs message) with the distinguishing word italicised, then restates the difference as a property (persistent vs temporary). Two frames — structural and behavioural — for one distinction. Directly reusable for any pair of adjacent coined objects.

Also: `Q: Is there a way to close or lock a post in a forum channel?` — answered with the `Close Post` control and its effect (removed from new-posts list, locked, only moderators can reopen). And `Q: How many posts can be pinned to the top? How long do they stay pinned?` — "**only support having one pinned post**. Pinned posts aren't on a timer, so they will remain pinned until it's unpinned or another post is pinned (replacing the original pinned post)." A limitation and a silent-replacement behaviour, both disclosed.

### Community Onboarding FAQ — 7 questions `[observed]`

Access path, required permissions, availability, device support (note: "admins can only configure and enable Community Onboarding **on desktop**"), examples, what happens to unassigned channels, what unmarking `Ask before member joins` does, and re-onboarding on rejoin. Two of seven are **configuration-consequence** questions ("What happens to channels that I don't assign…", "What's the point of unmarking…") — the FAQ is doing design-rationale work the setup steps could not carry.

**Across all five FAQ blocks:** answers are prefixed `A:` and questions `Q:` in bold; every block is titled `Frequently Asked Questions`; and several blocks omit the `A:` prefix inconsistently (the Community Onboarding block alternates). Minor, but visible.

## T13 Coined structural terminology

**PRIORITY SECTION.** Discord's vocabulary is the most invented in this batch — a spatial object model that a newcomer must learn before they can participate at all — and Discord knows it (see T4b, where it names its own terminology as a churn cause).

### The core object model

| Term | Discord's usage and how it is taught | The alternative it rejected / notes |
|---|---|---|
| `server` | The top-level space. Taught by describing first, naming second: "private, invite-only spaces… **These dedicated spaces are what we call servers.**" Lowercase in prose, capitalised in some titles (`How do I join a Server?`) | "group", "community", "space". The word is borrowed from infrastructure and means nothing spatial to a newcomer — the least intuitive term in the model and the one Discord works hardest to teach |
| `guild` | **The API-layer synonym for `server`, which leaks into consumer help copy**: "the **guild** may be removed or restricted" (Warning System) and `Guilds FAQ` as an article title | A genuine dual vocabulary: `guild` is the internal/developer term, `server` the user term. The Warning System article — read by users in trouble — uses `guild` once, unglossed. Recorded as a defect |
| `channel` | The subdivision. Taught compositionally: "Your server is **made up of** text channels and voice channels" | "room", "topic", "thread" |
| `text channel` | Written conversation; "dedicated spaces for written conversations" | |
| `voice channel` | Voice/video; defined by absent friction — "**no calling or ringing necessary**" | "call", "room" |
| `category` | Channel grouping; evidenced in the forum setup ("hover over the channel **category** where you want your Forum Channel") | "folder", "section" |
| `thread` | "a type of ***message***" — temporary, spun off a message | Explicitly contrasted with forums |
| `forum channel` / `post` | "a type of ***channel***" — persistent; contains `posts` with `Tags`, `Post Guidelines`, `Older Posts`, `List View` / `Gallery View` | The forum/thread distinction is resolved via the object hierarchy (see T12) |
| `Stage Channels` | A named channel type (own FAQ) | "auditorium", "broadcast" |
| `Spoiler Channels` | A named channel type (own FAQ) | |
| `LFG Channels` | "Looking For Group" channels — **initialism used in a help-article title without expansion**: `How to Use the LFG Channels to Find Game Sessions on Discord`. The expansion appears nowhere in the harvested set | Gaming-native jargon promoted to IA without a gloss. Defect |
| `role` | The identity/permission unit. Named as a newcomer blocker ("don't understand… what roles do"). Sub-types observed: `Linked Roles`, `vanity roles`, `Role-Exclusive channel` | "group", "tag", "permission set" |
| `permission` | Capability grant, treated as a proper noun (`Time Out Members`, `Manage Server`, `Manage Roles`, `Administrator`, `View`, `Send Messages`, `Priority Speaker`) | |
| `@everyone` | The default role, written as a mention in prose: "At least 5 of these channels must allow **@everyone** to View and Send Messages" | "all members" |
| `member` | A person in a server | "user" (reserved for the platform-level person) |
| `DM` / `group DM` | Direct message; initialism used as the primary nav-level product noun (`DMs`), expanded once in the Warning System ("system direct message (DM)") | |
| `invite` | The join mechanism; `Instant Invite`, `Custom Invite Link`, `Invalid Invite Links`, `Pause Invites`, `invite splashes` | |
| `Server Boosting` / `boost` | Paid server upgrades | |
| `Nitro` / `Nitro Basic` | The subscription tiers | |
| `Quests` | Sponsored activity product with its own enforcement consequences | |
| `Apps` | The current term for third-party integrations; `App Directory`, `Apps Center`, `Apps & Activities` | **Replacing `bot`** — see below |
| `bot` | The legacy term. Appears in **scare quotes** in the onboarding problem statement ("don't understand what 'bots' are") and in the Guidelines' rule 14 ("Do not use **self-bots or user-bots**") and 13 ("selling **spambots**, server 'raid' tools") | A live terminology migration: `bot` → `App` in product surfaces, `bot` retained in policy where the prohibited behaviour has no new name |
| `AutoMod` | The rule engine. Also written `Auto Mod` (two words) in the Safety Setup path, and `Automod` in the Time Out FAQ. **Three casings** | |
| `Raid Protection` | ML-driven join-raid defence | |
| `server raiding` / `join-raid` / `raid` | The prohibited behaviour, glossed inside rule 1; `raiders` as the actor noun; `How to Protect Your Server from Raids 101` | **The same word is a celebrated product feature on Twitch (150).** One batch, two platforms, opposite valence |
| `Community Onboarding` | The named server-onboarding feature | |
| `Default Channels` / `Customization Questions` / `Channels & Roles` / `Browse Channels` / `Server Guide` | The onboarding sub-objects | |
| `Community server` | A server type with extra features; `Enabling Your Community Server`, `Clarifying Server Types` | The existence of an article called `Clarifying Server Types` is itself evidence the type taxonomy confuses people |
| `Partnered` / `Verified` servers | Two badge tiers (`Partnered vs Verified Servers`) | |
| `Discover` / `Server Directory` / `Discovery Guidelines` / `Discover Tab` | The public-server discovery surface | |
| `Go Live` | Screen-share/streaming | "stream", "broadcast" |
| `Hop in` / `drop in` | The low-commitment voice-join verbs, used in marketing and in the Beginner's Guide | "join", "connect", "call" |
| `Time Out` / `time out` / `Timeout` / `Timed out` | **Four renderings of one state within one article**: title `Time Out FAQ`, prose "while in **time out**", mobile control `Timeout`, and "if you have been **Timed out**" | Also called `mute` twice in its own FAQ. See defects |
| `Account Standing` / `All good` / `Limited` / `Very Limited` / `At Risk` / `Permanent suspension` | The five standings | See T6 |
| `Active Violations` / `Expired Violations` | The two violation buckets | |
| `violation` vs `warning` | Two distinct notice instruments, explicitly differentiated | |
| `Policy Explainer` | The suffix for the 20 per-harm explanatory documents | "policy detail", "guidance" |
| `Wumpus` / `Clyde` / `Nelly` | Mascots, surfaced in asset filenames and marketing art | `Clyde` was formerly a bot/AI name; here it appears only as art |
| `dis.gd` | Vanity short-domain used in user-facing copy (`dis.gd/contact`) | |
| `How to Discord` | The product name **verbed**, as a blog collection name | |

### Three terminology defects worth recording

1. **`Time Out` has four renderings and a synonym.** `Time Out` (title), `time out` (prose), `Timeout` (mobile control), `Timed out` (state), plus `mute`/`muted` used for the same state in two FAQ answers. Five words for one moderation action, all inside one article. This is the worst terminology inconsistency in the batch and it sits on the most-used moderation tool.
2. **`guild` leaks into the enforcement article.** A user reading why their server was removed encounters "the **guild** may be removed or restricted" with no gloss. The developer vocabulary has not been fully firewalled from the consumer surface.
3. **`AutoMod` / `Auto Mod` / `Automod`** — three casings across three articles, on the tool whose name users must type to find help.

### One terminology strength worth stealing

**Discord teaches every coined noun by describing the concept first, naming it second, and attributing the name to itself.** "These dedicated spaces are what we call servers." "Forums are a type of *channel*, while threads are a type of *message*." "also referred to as 'server raiding.'" "Deactivation can also be referred to as…" (Pinterest's version of the same move). The construction lowers the cost of an invented word by presenting it as a *label for something you already understand* rather than as a thing to memorise. For any product shipping a coined object model — and that includes most fintech primitives — this is the single most useful pattern in the file.

**Register split:** marketing says `hang out`, `hop in`, `chill`, `idk`; the Beginner's Guide says `server`, `channel`, `permissions`, with warm glosses; the Guidelines say `violative`, `protected characteristics`, `personally identifiable information`; the help-centre *IA* says "That feel when you look at your bank account". The IA register is the outlier and it is the one surface where the voice fights the task.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company, used freely in adverse copy and in admission ("**Sometimes we get it wrong.**" · "We have designed the system to…" · "we will not publicize words in these word lists"). Server operators are addressed as partners with agency ("your community", "your mod team", "**you'll be able to save the day**"). Discord addresses volunteers with the grammar of collaborators, same as Reddit.

**Register — four distinct levels, and Discord moves between them deliberately.**

| Surface | Register | Example |
|---|---|---|
| Marketing | Lowercase internet, abbreviated, self-deprecating | "or idk doing homework or something" · "spam memes" · "YOU CAN'T SCROLL ANYMORE.  BETTER GO CHAT." |
| Help-centre IA | Joking, at the expense of routing | "Almost as exciting as interior decorating." · "That feel when you look at your bank account." |
| Instructional / operator docs | Warm, second-person, empathetic, emoji-using | "being cannon-blasted into a strange, foreign land" · "Sooo… what am I supposed to do here?" · "book club 📚" · "you can feel more comfortable" |
| Guidelines / enforcement | Flat, numbered, defined, unhedged | "Do not promote, coordinate, or engage in harassment." · "protected characteristics" · "violative accounts" |

The gradient is steep and mostly well-managed — **except** at the help-centre category level, where the joke glosses sit directly above billing disputes and safety reports. That is the one place Discord's voice costs the user something.

Notably, the enforcement article **ends** warmly ("Thanks for doing your part.") and **opens** philosophically ("We want users to learn our rules and stay on the platform"). The flat register is bracketed by warmth. That is a deliberate structure: the cold middle is where the rules live, and the warm edges are where the relationship is asserted.

**Emoji** used in instructional copy (📚 🖊️ 💃) and in incident updates (🛠 on Twitch's status page, not Discord's). Not used in guidelines.

**Contractions** throughout, including guidelines ("isn't allowed", "don't allow", "won't be able to"). No formality escalation in grammar.

**Exclamation marks** are frequent in help and operator copy ("Start off on the right foot! Not the left one!", "consider making it required!", "Now you can make your first post!", "Yup, check out…", "Thanks for doing your part.") and **absent from the Community Guidelines and from every enforcement state definition.** The one exception is a help title: `Help! I'm old enough to use Discord in my country but I got locked out?` — where the exclamation is the *user's*, not Discord's.

**`Yup` appears as an answer in a help FAQ** ("Q: Are there examples… A: Yup, check out Community Onboarding Examples."). One-word colloquial affirmative in official documentation.

**Numbers as bounds** `[observed]`: `90 days`, `up to 1 year`, `60 seconds` / `5 minutes` / `10 minutes` / `1 hour` / `1 day` / `1 week`, `150 characters`, `1,000 terms`, `60 character limit`, `50 mentions`, `7 Default Channels`, `5 channels`, `30 articles`, `October 24th, 2023`, `September 29, 2025`. Almost every figure is a limit, a duration or a threshold. The only scale claim on the marketing page is a five-star rating graphic with no accompanying number.

**Accessibility content** `[observed]`

- `Skip to main content` present and first in DOM on the marketing site.
- **Nav links carry embedded position announcements** — `Download1 of 9`, `Server Directory1 of 2`, `Family Center 1 of 10`, `Featured1 of 7`. Every nav item states its index and the menu size in its accessible name. Unusual, and genuinely useful for a screen-reader user navigating a nine-item menu with nested drawers. Worth noting as a positive pattern, though the missing space in `Download1 of 9` means it reads as one token.
- 31 locales on the marketing site, 17 on the help centre, each labelled in its own script. **Mismatch recorded:** a user reading the site in a locale the help centre does not serve will be dropped into a different language when they click `Support`.
- Screenshot captions are used systematically instead of relying on alt: `Example of a Discord server`, `Suspension Notification on Desktop (Left) and Mobile (Right)`, `Reviewing Account Standing in User Settings on Desktop`, `Warning Message Sent from Discord`, `Example of a Server Violation Notification`, `Set a mention limit, up to a maximum of 50 per message`, `Left: Set up to receive alerts when a possible join-raid has been detected in your server.  Right: What an alert looks like`. **These captions are the reason this file can describe Discord's enforcement notifications at all** — the images are not readable, but the captions name exactly what each one shows. A good practice that happens also to make the product harvestable.
- **Alt-text failure:** most article images carry filename-style alt (`timeout_2.png`, `automod_header.png`, `image4.png`, `automod_commonlyflagged_words.gif`, `example-GIF-community-onboarding.gif`) or empty alt. The screenshots that *show* the violation card, the suspension notice and the account-standing page are therefore inaccessible except via caption. Since the captions exist, the harm is mitigated — but it is mitigation, not compliance.
- **Two AutoMod screenshots are hosted on `googleusercontent.com`** with no alt text, one of which is the `Block Words in Member Profile Names` setting. Third-party image hosting in official documentation is a fragility as well as an accessibility gap.
- One screenshot is referenced as a markdown heading rather than an image: `#### additional-questions-community-onboarding-faq.png` — a broken embed that renders a filename as an H4. Live defect in the Community Onboarding article.
- Marketing site relies heavily on `.webp` decorative art with **empty alt**, which is correct, but the hero headline is also duplicated across responsive variants.
- Video content on the marketing page is `.mp4` with no caption or transcript reference. `[absent]`
- **No accessibility statement** was reachable. Footer `Policies` group lists `Terms`, `Privacy`, `Cookie Settings`, `Guidelines`, `Acknowledgements`, `Licenses`, `Company Information` — no accessibility entry. `[absent]`

**Negative findings, recorded honestly**

- `Download for Mac` (terminal CTA, page foot) points to `#`. Dead link.
- `Download` (mid-page) points to `/login`, not `/download`. Mislabelled destination.
- `Log In` and `Log in` both present in one nav; `Sign in` used on the help centre. Three labels for one action.
- `Submit a Request` / `Submit a request` — two casings.
- Community Guidelines table of contents lists 17 items; the body has 27 numbered rules.
- `Monetization Policy` and `Monetization Terms` are named as two documents and given the same URL.
- Typo in the highest-stakes FAQ answer: "violations **ofto** a child safety policy".
- `Time Out` / `time out` / `Timeout` / `Timed out` / `mute` — five terms, one state, one article.
- `AutoMod` / `Auto Mod` / `Automod` — three casings.
- `guild` used unglossed in the consumer enforcement article.
- `LFG Channels` in a help title with the initialism never expanded.
- `Voice Channels FAQs` (plural) vs every other `FAQ` (singular).
- `Explore More` used eight times as the only CTA on the Safety Center.
- Footer, language selector and social row each duplicated in the DOM; `Articles in this section` sidebar rendered twice per article page.
- Broken image embed rendering as an H4 filename heading in the Community Onboarding FAQ.
- Community Onboarding FAQ last updated **March 2023** and still describes `Server Guide` as newly in testing.
- Help-centre locale set (17) is narrower than the marketing-site set (31), with no notice at the handoff.
- `Discord Warning System` and `Forum Channels FAQ` both sit at a **40% helpfulness rate**, published on the page.

---

## Transferable patterns

1. **Define each state by naming what the *next* failure costs.** "`Limited`: …Further violations will result in more or longer limits." / "`At Risk`: …Any further violations may result in a permanent suspension." A user reading their current standing is simultaneously told the consequence of the next step. Converts a status label into a deterrent and removes the need for a separate warning message. Directly applicable to PayPal account limitations and risk-tier copy.
2. **Separate the penalty clock from the record clock, and explain why.** "violations and their associated restrictions are two separate things. A restriction may lift before the violation itself fully expires." Written specifically because users conflate them. Any system with both a temporary block and a durable record needs this paragraph, and most do not have it.
3. **Ship a no-fault notice.** Discord's `warning` tells a user that rule-breaking happened near them, with an explicit "this does not affect your standing". A way to educate without penalising — and note it needs an FAQ entry restating the distinction, because the message still alarms people.
4. **The external-cause incident update.** "This is caused by an ongoing outage with Google Play. Purchases on other platforms are unaffected, and existing subscriptions remain active… **No action is needed on your part — please try again later.**" Symptom → named third-party cause with link → explicit unaffected scope → what we're doing → what you should do (nothing). The best incident-comms template in this batch.
5. **Teach a coined noun by describing it first and naming it second, attributing the name to yourself.** "These dedicated spaces are what we call servers." And resolve confusion between two coined terms by placing each in the object hierarchy: "Forums are a type of *channel*, while threads are a type of *message*." Essential for any product with invented primitives.
6. **Quote the confused user verbatim to justify a fix.** "Sooo… what am I supposed to do here?" / "Why are there so many channels?!" Discord makes the case for its onboarding feature by putting the failure in the user's ungrammatical voice, then naming the three specific terms that fail and the behaviour that results ("they just leave"). More persuasive than a funnel metric in a design doc.
7. **Anticipate the operator's objection in their own voice and answer it immediately.** "*But Discord, wouldn't that make my server more vulnerable to raiders…?!*" → "To that, we have the solution: Raid Protection". Used twice in one article, both times to move a reluctant reader past a change they resist.
8. **Publish a two-date policy header plus an archive.** `Effective: September 29, 2025` / `Last Updated: August 29, 2025` / `Archived Versions`. A one-month notice window expressed as a date pair, and the ability to read what the rules used to say. Cleaner than a banner and better than either alone.
9. **Refuse transparency requests with the reason, and commit to partial disclosure.** "we will not publicize words in these word lists in order to maintain their protective efficacy… We value providing transparency into the thinking… and will address those topics in a future post." Applicable verbatim to fraud-rule and risk-model questions.
10. **Negative pattern to avoid: a joke where the user needs a signpost.** "That feel when you look at your bank account" is the gloss on the billing category. Voice at the top of a support IA is voice spent at the moment of highest user cost. And `Time Out`/`Timeout`/`time out`/`Timed out`/`mute` in one article shows what happens when register discipline is not matched by terminology discipline.

## Caveats & gaps

- **No in-product strings were observed.** The five account standings, the violation card, the suspension notice, the warning DM, the timeout indicator and every AutoMod block message are `[documented]` — quoted or described in help articles and screenshot captions, never seen live. The captions are unusually descriptive, which is why T9 is as detailed as it is, but nothing in T6 or T9 is an observed UI string.
- **Presence-state labels are absent.** Discord's online/idle/DND/invisible vocabulary is well known but was not observed on any harvested page, so it is not recorded.
- **`Account Settings` and `Safety, Privacy & Policy` category pages were not fetched.** The former would carry privacy-setting vocabulary (DM filters, who-can-add-you, Safe Direct Messaging); the latter is the parent of the `Server Safety` section and would list the full safety-article inventory. Both are high-value next fetches.
- **The 20 `Policy Explainer` documents were not fetched.** They are the per-harm educational layer the violation notification links to, and they are the single largest unharvested content set in this file. `discord.com/safety-policies` (Policy Hub) would index them.
- **`Teen Charter`, `Family Center`, `Parent Hub`, `Wellbeing Hub`, `Privacy Hub`, `Transparency Hub`, `Safety Library` and `Discord Player's Guide` were identified in the nav but not fetched.** Discord's teen-safety and privacy vocabulary is therefore thinner here than Instagram's, despite Discord's safety IA being larger.
- **Community Onboarding FAQ is three years stale** (March 2023) and describes `Server Guide` as an in-test feature. `Server Guide FAQ` exists as a separate article and was not fetched, so the current state of Discord's server-onboarding feature set may differ from what is described in T4b.
- Server-creation, server-setup and role-configuration articles (`Discord Server Setup Guide`, `Setting Up Permissions FAQ`, `Channel Permissions Settings 101`, `Roles, Permissions, and Moderation` section) were identified but not opened — so the *permission* vocabulary in T5 and T13 is assembled from incidental mentions rather than from the canonical source.
- `Guilds FAQ` was not fetched, so the `guild`/`server` relationship is documented only via the leak in the Warning System article.
- Nitro, Shop, Server Boosting, Quests, Payments & Billing and the developer/apps help centres are unharvested — so Discord's monetisation and billing vocabulary is largely absent from this file.
- `discord.com/servers` (Server Directory) and `discord.com/community` were not fetched; the discovery-surface vocabulary is inferred from nav labels only.
- Helpfulness ratios are reported as observed on the page; they are a snapshot and will drift.
- Mobile app strings, the system DM itself, and email copy are out of the public web surface.

## Sources

1. https://discord.com/
2. https://discord.com/guidelines
3. https://discord.com/safety
4. https://support.discord.com/hc/en-us
5. https://support.discord.com/hc/en-us/categories/115000217151
6. https://support.discord.com/hc/en-us/categories/200404378
7. https://support.discord.com/hc/en-us/articles/360045138571-Beginner-s-Guide-to-Discord
8. https://support.discord.com/hc/en-us/articles/18210965981847-Discord-Warning-System
9. https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ
10. https://support.discord.com/hc/en-us/articles/4421269296535-AutoMod-FAQ
11. https://support.discord.com/hc/en-us/articles/6208479917079-Forum-Channels-FAQ
12. https://support.discord.com/hc/en-us/articles/11074987197975-Community-Onboarding-FAQ
13. https://discordstatus.com/
