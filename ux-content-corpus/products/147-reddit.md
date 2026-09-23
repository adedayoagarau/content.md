# 147. Reddit

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Pseudonymous community forum platform with federated volunteer moderation |
| Primary URL | https://www.reddit.com/ |
| Corpus rank | 147 |
| Benchmark strength (source list) | Community rules and moderation states |
| Locale / market observed | en-US (help centre offers 39 locales) |
| Platform observed | Web — help centre (Zendesk) only; product and corporate domains blocked |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | EU **Digital Services Act** (dedicated user-information and resolution-options articles); **UK Online Safety Act**; **AU Online Safety Act**; **US Take It Down Act**; **Brazil Digital ECA**; NCMEC reporting; publishes a recurring Transparency Report |
| Harvest date | 2026-09-22 |
| Pages inspected | 12 URLs (10 returning usable content) |
| Harvest completeness | **Partial — two domains blocked.** `reddit.com` and `redditinc.com` are both on the fetch blocklist, so the product surface and the sitewide **Reddit Rules** text itself were unreachable. Everything here comes from `support.reddithelp.com`, which rendered fully and is unusually rich. The federated-moderation *description* was captured in full; the sitewide rules *text* was not. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Reddit home | https://www.reddit.com/ | **HTTP 403 — on fetch blocklist** |
| Reddit Rules (sitewide policy) | https://redditinc.com/policies/reddit-rules | **HTTP 403 — on fetch blocklist** |
| Help centre home | https://support.reddithelp.com/hc/en-us | Two-audience split; 39-locale switcher |
| Redditor Help | https://support.reddithelp.com/hc/en-us/p/redditor_help_center | Six categories with scope lines + 8-question FAQ with full answers |
| Moderator Help | https://support.reddithelp.com/hc/en-us/p/mod_help_center | Five categories + 4-question FAQ; crisis-management playbook |
| Rules & Reporting (category) | https://support.reddithelp.com/hc/en-us/categories/360003247491 | Ten named sub-sections — the richest IA artefact in the file |
| Account and community restrictions (section) | https://support.reddithelp.com/hc/en-us/sections/360008810092 | 25 article titles = the enforcement-policy inventory |
| Content Moderation, Enforcement, and Appeals | https://support.reddithelp.com/hc/en-us/articles/23511059871252 | **The key document.** Full enforcement ladder and appeal window |
| Quarantined Communities | https://support.reddithelp.com/hc/en-us/articles/360043069012 | Full body — a community-level state with its own appeal standard |
| What are Reddit's rules? | https://support.reddithelp.com/hc/en-us/articles/360043503951 | Full body — the two-layer boundary statement |
| Getting Started (category) | https://support.reddithelp.com/hc/en-us/categories/200073949 | Five sub-sections, ~28 surfaced article titles |
| Moderation Tools (category) | https://support.reddithelp.com/hc/en-us/categories/15482740053780 | Four sub-sections; mod-tool naming |

---

## T1 Navigation & IA labels

**Help-centre nav is an audience switcher, not a topic nav** `[observed]`

`Moderator Help` · `Redditor Help` · `Ads Help` · `Reddit Pro Help` · `Submit a request`

Four audiences, and **`Moderator Help` is listed first** — before the ordinary user. On a platform where moderation is performed by unpaid volunteers, putting the volunteer's support centre ahead of the customer's is a statement about who the platform's operational dependency actually is. Worth recording as a deliberate IA choice, not an accident.

Help-centre H1: `How can we help you you?` — rendered as `How can we help you?` with standfirst `Welcome to Reddit's Help Center`. The two audience cards carry scope sentences:

| Card | Scope line (verbatim) |
|---|---|
| `Moderator Help` | "Information and answers to questions about moderating communities on Reddit." |
| `Redditor Help` | "Support and information about managing your Reddit account and using the platform." |

**Redditor Help — six categories, each with a scope line** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Account Status` | "Information on resolving account issues." |
| `Getting Started` | "The basics of how to use Reddit" |
| `Features & Experiences` | "Overviews and explanations of individual Reddit features." |
| `Rules & Reporting` | "Information on Reddit policies, submitting reports, and more." |
| `Privacy & Security` | "Guidance on how to manage your account security and data privacy." |
| `Reddit Mobile App` | "FAQs on Reddit's official iOS and Android mobile app." |

`Account Status` is **first** — above `Getting Started`. Reddit's help IA opens with "your account has a problem", not "here's how to use this". For a platform whose highest-volume support contact is enforcement-related, that is the right ordering and an unusual one.

Note the inconsistency: five of the six scope lines end in a full stop, `Getting Started`'s does not.

**Moderator Help — five categories** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Getting Started` | "The basics for starting a community on Reddit." |
| `Moderation Tools` | "Overviews and explanations of individual mod tools." |
| `Community Engagement` | "Tips for welcoming new members and encouraging participation." |
| `Advice & Resources` | "Answers to common questions, advice from other mods, and more." |
| `Mod Programs and Initiatives` | "Information on some of Reddit's moderator related programs and initiatives." |

`Community Engagement` is the notable one: Reddit ships a support category dedicated to **growing** a community, not just policing it. Volunteer moderators are treated as community *managers* with a growth remit, and the help centre resources them accordingly.

**`Rules & Reporting` sub-sections — ten, and the ordering is the story** `[observed]`

1. `Account and community restrictions`
2. `Minimum age requirements`
3. `Reporting`
4. `Underage & age-inappropriate reporting`
5. `Mental health and support resources`
6. `Responding to non-consensual sharing of intimate media`
7. `Responding to harassment and other difficult situations`
8. `Intellectual Property issues`
9. `Legal requests for account information`
10. `Country specific reporting procedures`

Three of the ten are named from the **harmed person's position** and begin with a gerund of coping: `Responding to non-consensual sharing of intimate media`, `Responding to harassment and other difficult situations`, and `Mental health and support resources`. Sub-section 7's "and other difficult situations" is a deliberately soft catch-all that lets the writer file distressing topics without enumerating them in a category label — a real content-design solve for an IA problem most platforms handle by proliferating categories.

`Mental health and support resources` sits **between** the two abuse-response sections, i.e. the support route is placed inside the reporting flow rather than after it. Someone scanning for how to report harassment passes the crisis resources on the way.

**Footer groupings** `[observed]`: `Company` (`About` · `Advertising` · `Careers` · `Investors` · `Press Contact` · `Reddit Blog` · `Vendor Help Center`) and `Resources` (`Policies` · `Developer Platform` · `Reddit App` · `Reddit Premium`). Legal strip: `Reddit Rules` | `Privacy Policy` | `User Agreement` — note **`Reddit Rules` occupies the slot where most platforms put "Terms"**, with `User Agreement` demoted to third.

**Routing furniture** `[observed]` — the standard footer block on every article:

> `Get in touch` — "Still have questions? If you didn't find what you need, contact us or visit r/modsupport or r/help for more help." → `Submit a request`

Then two cards, and their headings are the pattern:

- `Still need help as a user?` — "Come check out r/help and see if other redditors can help you out. **Although this isn't an official Reddit community, you'll find admins here as well.**"
- `Still need help as a moderator?` — routes to `r/ModSupport`

**Reddit routes support requests into its own user communities, and discloses which are official.** `Check platform status` · `Join us on r/reddit` · `Changelog` appear as a third routing row. The "although this isn't an official Reddit community" disclaimer is repeated verbatim on multiple pages — Reddit is consistently labelling the official/unofficial boundary inside its own help centre.

**Top-of-page tip banner** `[observed]`: `Quick tip How do I know if a message from Reddit is official? →` — a phishing-defence question promoted to a persistent banner on the Redditor Help landing page. Pre-empting the failure at the point of entry.

## T2 Value proposition & headline patterns

`[absent]` for the product marketing page — `reddit.com` is blocked. No hero, subhead or benefit framing was reachable.

What is observable is the **help centre's framing of the platform's governance model**, which functions as its value proposition to moderators:

> "Our unique, multi-layered approach to moderation harnesses the power of community… This approach is **akin to a democracy**, wherein everyone has the ability to vote and self-organize, follow a set of common rules, establish community-specific norms, and ultimately share some responsibility for how the platform works."

The governing metaphor is **democracy**, and the sentence enumerates the four civic acts (vote, self-organise, follow common rules, establish local norms) before landing on shared responsibility. The claim is then immediately grounded in a pragmatic justification rather than a values one: "Such self-moderation at the community level continues to be the most scalable solution we've seen to the challenges of moderating content and behavior online." Idealism followed by an operations argument — Reddit does not pretend the model is purely principled.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Submit a request` | Help nav (top) and every article foot | Same label in both positions — consistent |
| `Skip to main content` | First in DOM on every help page | Accessibility, correctly placed |
| `Moderator Help` / `Redditor Help` / `Ads Help` / `Reddit Pro Help` | Audience switcher | Nouns, not verbs |
| `Visit r/help` · `Visit r/bugs` · `Visit r/modnews` · `Visit r/modsupport` · `Visit r/redditrequest` | Community cards | `Visit` + community name; the destination is always the literal community handle |
| `Check platform status` | Routing row | Question-free, task-named; sub-line is a question: "Is Reddit down? Check the official status page…" |
| `Join us on r/reddit` | Routing row | First-person-plural invitation |
| `Changelog` | Routing row | Bare noun; sub-line "An ongoing log of changes made to Reddit." |
| `See all 25 articles` / `See all 14 articles` / `See all 39 articles` | Category pages | **Count is interpolated into the label** — the user knows the size of the set before clicking |
| `Return to top` | Article foot | |
| `Was this article helpful?` → `Yes` / `No` | Article foot | |
| `Copyright →` / `Trademark →` | Rules & Reporting, IP sub-section | Arrow glyph marks these as links to *sections* rather than articles — a typographic distinction between depths |
| `present an appeal` | Quarantined Communities article, inline | Verb phrase as inline link text, not a button |
| `Reset Password` / `Forgot password?` / `Continue` / `Verify Email` / `Yes, Remove My Email` | `[documented]` — quoted inside FAQ answers | See T5 |

**Observation:** Reddit almost never ships a bare `Learn more`. The one recurring generic is `See all N articles`, and it is redeemed by the interpolated count. `See all 39 articles` on the mod-tools section is doing real expectation-setting work.

**Negative finding:** `Yes, Remove My Email` is an unusually good confirm-button label — it restates the action in the first person, which is exactly right for a destructive-ish security action. It sits inside a FAQ answer about phishing defence, so it is `[documented]` rather than observed live.

## T4 Onboarding & getting-started

**`Getting Started` (Redditor) — five sub-sections** `[observed]`

1. `Your Reddit account`
2. `Basics`
3. `Posting & Commenting`
4. `Communities`
5. `Moderators`
6. `More answers`

The ordering is the onboarding narrative: get an account → understand the mechanics → contribute → find your places → understand who governs them. **`Moderators` is a getting-started topic**, i.e. Reddit treats "who are these people with power over my post" as day-one knowledge rather than an advanced concern. That is federated moderation being taught during onboarding, not after the first removal.

**`Basics` article titles — question-shaped, definitional** `[observed]`

`What is karma?` · `What is Reddit?` · `How do I sign up for a Reddit account?` · `How do I log in and out of my Reddit account?` · `What are upvotes and downvotes?` · `Is it ok to create multiple accounts?`

`What is Reddit?` is the **second** item, after `What is karma?`. Either an ordering accident or a frequency-driven sort; either way, a platform whose first onboarding article is about its own coined metric is telling you which concept blocks new users.

`Is it ok to create multiple accounts?` is a permission question in the Basics tier — Reddit answers it affirmatively ("you can create as many accounts as you'd like"), which is a pseudonymity-affirming stance placed at onboarding.

**`Communities` sub-section** `[observed]`

`What are communities or "subreddits"?` · `How to join or leave a community` · `Where can I find the list of communities I've joined?` · `What are public, restricted, private, and premium-only communities?` · `What is the community sidebar?` · `Understanding weekly visitors and contributions on Reddit`

The first title is the terminology-migration artefact — **`communities or "subreddits"`**, with the legacy term in scare quotes. Reddit is retiring `subreddit` in favour of `community` and has chosen to teach both, with the old term marked as the colloquial one. See T13.

**`Moderators` sub-section — the governance primer** `[observed]`

`What's a moderator?` · `How do I become a moderator?` · `How can I resolve a dispute with a moderator or moderator team?` · `What's mod mail and how do I send a message?` · `What is mod mail muting?`

Third article in: **how to fight a moderator.** `How can I resolve a dispute with a moderator or moderator team?` is placed inside the onboarding category, one item after "how do I become one". Reddit teaches, in the same breath, that you can become a moderator and that you can appeal against one — and it names the plural actor ("or moderator team"), acknowledging that the counterparty is often a group.

`What is mod mail muting?` sits last — the moderator's ability to silence *your appeal channel* is documented as a first-class onboarding concept. Very few platforms publish the limits of their own complaints channel at onboarding depth.

**Mod onboarding** `[documented]` — the Moderator Help FAQ describes a `new mod checklist` off-platform (`redditforcommunity.com`) plus a `Getting started moderating on Reddit` section. Recruitment is itself a documented onboarding topic (see T9), including a built-in `mod applications tool` reached via `Mod Tools` > `Mods & Members` > `Recruiting` and a `Recruiting new mods` toggle.

## T5 Form & field labels

`[documented]` — no live form was reachable; these are labels quoted inside help answers.

**Password-reset flow** `[documented]`
`Forgot password?` (link, below the username and password fields on web) · `Forgot password` (link, at the bottom of the login screen on iOS/Android — **note the missing question mark on mobile**) · `Reset Password` (button) · `Continue` (after entering and confirming the new password)

Consequence disclosed inline: "Resetting your password will log you out on all devices."

**Two-factor setup path** `[documented]`
`Settings` → `Account authorization` → `Two-factor authentication` → `Confirm` → `backup codes`
On Old Reddit the same path is `preferences` → `password/email` tab → `click to enable` → `next`. **Lowercase labels on Old Reddit, title case on new** — the help article carries both and the casing difference is visible in the copy.

**Email-verification and phishing-defence controls** `[documented]`
`Verify Email Address` → `Verify Email`; `let us know` → `Yes, Remove My Email`

**Mod-tools configuration labels** `[documented]`
`Mod Tools` > `Mods & Members` > `Recruiting`; toggle `Recruiting new mods`; `Suggested Mods` tab; `Invite Mod` flow

**Reddit's own security instruction, stated as a field-level rule** `[observed]`

> "*Reddit will never ask you for your password or 2FA codes, nor will we ask you via private messages to change your email address.*"

Rendered in italics at the top of the answer, before any procedure. And a hard bound stated as a limitation of support rather than a policy: "**We won't be able to help if your email address is out of date.**" Bolded. Reddit states the point at which support cannot rescue you — most platforms leave this implicit and absorb the contact volume.

## T6 Account, content and community states

**PRIORITY SECTION.** Reddit is the most state-rich product in this batch because it has **three planes of state** — content, account, and community — and the community plane is governed by two different authorities.

**1. Content states** `[observed / documented]`

- **Removed** — the baseline action, applied by either a community moderator *or* a Reddit admin. Reddit's word is consistently `remove`, not `delete` or `take down`.
- **Filtered / queued** — implied by `Moderation Queue`, `Harassment Filter`, `Crowd Control`, `Ban Evasion Filter` as named mod tools; content can be held rather than removed.
- **NSFW-tagged** — a state Reddit applies *without* removing: "We may also add NSFW tags to content or profiles in cases where such tagging is appropriate but missing." Note it applies to **profiles** as well as content.
- **Not visible to you yet** — a first-class documented state with its own article, `Why can't I see my post?`, and a companion `Post Check & Poster Eligibility Guide`. The gap between "posted" and "visible" is named and explained rather than left as a bug report.
- **Karma-gated** — a pre-emptive block state: "some communities require a certain amount of karma before allowing you to post there. This measure is taken to prevent spamming within the community." The post does not appear and the reason is a *community-set* threshold.

**2. Account states — the enforcement ladder, verbatim** `[observed]`

The escalation is stated as an explicit, ordered list of possible actions:

> - Remove the content
> - Send a warning to the user who posted it
> - Temporarily ban the user's account(s)
> - Permanently ban or terminate the user's account(s)
> - Restrict the creation of new accounts
> - Remove privileges from, or add restrictions to, the user's account(s)

And then the **numbered ladder**, which is the single most quotable enforcement sentence in this batch:

> "For other violations, a user may first receive a warning, followed by a **3-day ban, 7-day ban, and then a permanent ban**."

Three named durations. Reddit publishes the actual tariff. Immediately bounded in both directions: "Certain violations give rise to an immediate permanent ban of the account" and "certain first-time violations of certain Reddit Rules may merit a warning, while other more serious first-time violations of the same rule may merit an immediate suspension or ban."

Note the terminological slip in that last clause: `suspension` appears once, in a document that otherwise uses `ban` throughout and never defines `suspension` as a distinct state. Recorded as an inconsistency.

Additional account states named elsewhere:
- **Locked** — a *security* state, not an enforcement one, with its own FAQ: `My account has been locked as a security precaution`. Consequence as worded: "When you log in, you'll see a **red warning** and a security message asking you to reset your password. You'll also receive a notification in your Reddit inbox with more information." This is the only place in the harvest where Reddit describes the *visual* treatment of a state.
- **Ban-evading** — a named behaviour with its own article (`What is ban evasion?`) and its own mod tool (`Ban Evasion Filter`). Evasion is modelled as a distinct violation, not just a re-offence.
- **Username permanence** — "once a username is finalized, it can't be changed in any way, including its capitalization"; and post-deletion, "your username will not become available again and will be unusable." An irreversible state, stated twice for emphasis.

**3. Community states — the federated plane** `[observed]`

| State | Authority | Consequence as worded |
|---|---|---|
| `public` / `restricted` / `private` / `premium-only` | Moderator (configuration) | Titled `What are public, restricted, private, and premium-only communities?` — four named visibility tiers |
| **NSFW-tagged** | Admin or moderator | Reddit "may add restrictions to Reddit communities, such as adding NSFW tags" |
| **Quarantined** | Admin only | See below — the richest community state |
| **Banned** | Admin only | `Banned Communities` has its own article |
| **Inactive / requestable** | Community process | `r/redditrequest` exists "where you can request communities with inactive or nonexistent moderator teams" — an abandonment state with a claim procedure |

**`Quarantined` is the standout state in the whole batch.** Its purpose sentence:

> "The purpose of quarantining a community is to prevent its content from being accidentally viewed by those who do not knowingly wish to do so, or viewed without appropriate context."

And its consequences, enumerated:

> "Quarantined communities will display a warning that requires users to explicitly opt-in to viewing the content. They generate **no revenue**, do not appear in non-subscription-based feeds (eg Popular), and are not included in search or recommendations."

Five distinct consequences from one state: interstitial warning, opt-in gate, demonetisation, feed exclusion, and search/recommendation exclusion. Plus an open-ended clause — "Reddit may also enforce a number of additional product restrictions that exist currently or as they may develop in the future (eg removing custom styling tools)" — which is a rare admission that the state's consequence set is *not fixed*.

Critically: "Quarantined communities and their subscribers are still fully obliged to abide by the Reddit Rules and remain subject to enforcement measures." Quarantine is **not** a permission to break rules — a clarification Reddit evidently needs to make, and a good example of writing against a predictable misreading.

Notification channel is specified: "Moderators will be notified via **mod mail** if their community has been placed in quarantine." Note the asymmetry — the *community* gets the state, the *moderators* get the notice, and ordinary members learn about it only from the interstitial.

**4. Moderator states** `[observed]`
- Moderators who breach the `Moderator Code of Conduct` "may be subject to investigations and potential **revocation of moderation privileges**." A distinct enforcement plane with its own vocabulary — not banned, *de-modded*.
- `mod mail muting` — a moderator can mute a user's access to the appeal channel.
- `Mod Mode` — a named UI state for moderators (article title in the Moderation Tools section).

**Why does content take longer to appear?** Not observed. **Live states:** `[absent]`.

## T7 Error, failure & recovery

`[observed / documented]`, and strong.

**The "why can't I see my thing" family** `[observed]` — Reddit writes for the gap between action and visible result:

- `Why can't I see my post?`
- `Why haven't I received my password reset email?` — with a second article, `Why haven't I received my password reset email?`, cross-linked from the locked-account FAQ
- `Why can't I see the list of moderators in a community?`
- `Post Check & Poster Eligibility Guide`

`Why can't I see the list of moderators in a community?` is the most interesting of these: it documents a case where the platform **hides the identity of the people who removed your content**. Publishing an explainer for the opacity, rather than removing the opacity, is the same move Wise makes with its "complete" transfer state.

**Recovery articles named from the loss, not the fix** `[observed]`

- `Recovering a lost or forgotten username`
- `How do I log in to Reddit if I forgot my password?`
- `Someone who hasn't posted in a long time has the username I want, can I have it?`

The third is a **denial article with a sympathetic title** — it is written as the user's hopeful question, and the answer is no. Reddit spends a help article on a request it will refuse, phrased in the requester's own words. That is a findability decision (users search exactly that) and a tone decision (it does not scold).

**Hard limits stated bluntly** `[observed]`

- "Unfortunately, if you haven't added an email address to your account, **you're locked out until you can remember your password.**" No softening, no alternative offered, no "contact support" escape hatch. Given Reddit's pseudonymity model this is the honest answer, and it is given.
- "We won't be able to help if your email address is out of date." (bold in source)
- "No, once a username is finalized, it can't be changed in any way".

Three unambiguous "no" answers in the account-recovery FAQ. Reddit's failure copy does not manufacture hope.

**Time-sensitivity as an error cause** `[observed]`: "The links provided in these emails are time-sensitive, so if you click the link and it doesn't work, try requesting a new password reset." The cause and the remedy in one sentence, with no error code.

**Crisis recovery for moderators** `[observed]` — the `Crisis management` article is a full operational playbook whose *first* instruction is a named three-tool sequence: "The first thing you should do is turn on the `Harassment Filter`, `Crowd Control`, and `Ban Evasion Filter`." Bolded justification: "**These three mod tools are the quickest way to help stabilize moderation in your community**". Then, remarkably: "Turning on these tools will only take a few minutes and will allow you to **step back, take a deep breath**, and assess which tips and resources listed below may be helpful for you as well."

And it closes with a wellbeing section: "**Most importantly, take care of yourself.** … Don't feel obligated to moderate through the stress and anxiety you may be feeling. Take a break, breathe, and remember to be kind to yourself, your team, and your community." Reddit's operational documentation for volunteers includes permission to stop working. That is unique in this batch and arguably the single most distinctive piece of Reddit's content voice.

## T8 Empty states

`[absent]` — the help centre's search surface did not expose a no-results state in the fetched HTML, and all in-product empty states are behind auth or on the blocked domain.

One near-empty-state pattern `[observed]`: the article-feedback widget's negative path exposes its own reason list, which functions as a structured-input state:

> `We're sorry the article wasn't helpful. Please let us know why!` → `Inaccurate: information doesn't match what I'm seeing` · `Confusing: information is unclear or translation is wrong` · `Missing information: it's not comprehensive enough` · `Other: suggestions to improve content`

Then `Thanks for your feedback!`. The four options use a **label-colon-gloss** construction, and `Confusing` explicitly includes "or translation is wrong" — a 39-locale help centre naming its own localisation-quality risk in the feedback taxonomy. Worth stealing.

## T9 Enforcement notification and appeal copy

**PRIORITY SECTION**, and Reddit's strongest category.

**The two-layer boundary — stated explicitly and repeatedly** `[observed]`

This is the passage the brief asks for, and Reddit words it carefully:

> "Individual communities (also known as 'subreddits') have community-specific rules, which are created and enforced by community moderators ('mods') based on their community's unique and often highly specific topics. **Mods perform the majority of community moderation actions across the platform**, assisted by tools provided by Reddit."

> "Reddit's global **sitewide rules** also apply, **on top of** community-specific rules, to all product surfaces, users, and content on Reddit. Reddit employees (known as 'admins') are responsible for enforcing the Reddit Rules across the platform. Mods are **also expected to uphold** Reddit's global sitewide rules, in addition to making a concerted effort to remove and report violating content in their communities – as outlined in Reddit's **Moderator Code of Conduct**, which sets out Reddit's expectations for community moderators."

The boundary is drawn with four devices:

1. **Two named enforcer roles, each glossed on first use** — `moderators ('mods')` and `Reddit employees (known as 'admins')`. The parenthetical glosses teach the community's own slang inside formal policy prose.
2. **A spatial preposition for the layering** — sitewide rules apply "**on top of**" community rules. Not "in addition to", not "alongside". A stack, with Reddit's layer above.
3. **A volume admission** — mods "perform the majority of community moderation actions", so the user is told that most enforcement they experience is *not* Reddit's.
4. **A governing document for the volunteers themselves** — the `Moderator Code of Conduct` makes mods simultaneously enforcers and enforcees. The recursion is stated plainly: mods can lose "moderation privileges".

The user-facing short version, from `What are Reddit's rules?`, is two sentences:

> "All redditors and communities operate by a shared set of rules, found in the Reddit Rules. On top of this, **each community on Reddit may set its own rules, which are defined and enforced by the moderators of that community.** While using Reddit, follow the Reddit Rules as well as the rules of the community you're in."

And then the practical consequence, which is the most useful sentence for a newcomer:

> "some communities have very specific rules about things like how you should format a post or staying on-topic. If you're unsure whether your post belongs in a certain community, it's always a good idea to give the rules a quick look before you submit."

**Pattern:** the abstract two-layer model is followed immediately by its most mundane manifestation (post formatting, staying on-topic). Reddit grounds a governance concept in the trivial rule the user will actually trip over.

**Appeal copy and window** `[observed]`

> "When we remove a piece of content for violating the Reddit Rules or take an associated account-level enforcement action, the account that posted the content is **notified of the removal reason and provided instructions for how to appeal**. In our notifications, we aim to educate users about how and why they violated our rules, to foster and encourage positive contributions to the platform going forward. Users may submit an appeal **within six months** of receiving the notification. We process appeals in a **timely, non-discriminatory, diligent, and non-arbitrary manner**, and we reverse our original decision if we determine that our initial assessment was incorrect."

Three things to note. The appeal window is **six months** — far longer than Instagram's 15-day Oversight Board window, and published as a number. The four adverbs ("timely, non-discriminatory, diligent, and non-arbitrary") are lifted straight from **DSA Article 20 language**, which is a regulatory artefact surfacing in consumer-facing help copy. And the notification's stated purpose is *educational*, not merely procedural.

**Appeals abuse, disclosed** `[observed]`

> "To protect against abuse of our appeals systems, we may restrict the processing of appeals submitted by those who have engaged in appeals abuse. For example, we may limit the number of times that a particular decision can be appealed, and we may suspend the processing of appeals from people who frequently submit unfounded or abusive appeals."

Reddit publishes the counter-abuse limit on its own remedy channel. (Pinterest does the same — see 148 — suggesting this has become a DSA-era convention.)

**Community-level appeal has a *higher evidentiary standard* than user-level appeal** `[observed]` — the Quarantine appeal is the most demanding appeal copy in this batch:

> "To be removed from quarantine, community moderators may present an appeal. The appeal should include **a detailed accounting of changes to community moderation practices.** (Appropriate changes may vary from community to community and could include techniques such as adding more moderators, creating new rules, employing more aggressive auto-moderation tools, adjusting community styling, etc.) The appeal should also offer **evidence of sustained, consistent enforcement of these changes over a period of at least one month**, demonstrating meaningful reform of the community."

> "Moderators should only submit credible appeals that are supported by notable and sustained community transformation. **Moderators are encouraged to take the time they need to craft a successful appeal.**"

An appeal that requires a **one-month evidence period** and explicitly tells the appellant *not to hurry*. Compare a consumer appeal, which is a tap. The asymmetry is deliberate and well-written: the remedy standard scales with the scope of the enforcement.

**Who enforces, and how** `[observed]` — the article separates *Automation & Human Review* from *User Reports* under sub-headings set in italic. Notable disclosures: hashing is used for CSAM, terrorist content and NCII; and "Reddit also uses **large language models (LLMs) trained in-house** to automatically review certain categories of content that have been flagged for review via other automated content moderation systems." An LLM-in-the-loop disclosure inside a consumer help article, stated without hedging.

**Escalation route for user-vs-moderator conflict** `[documented]` — `How can I resolve a dispute with a moderator or moderator team?` plus `Contacting the admins`, whose article gives a bounded list of when admin escalation is appropriate: compromised account, ban evasion in your community, illegal or abusive content, Reddit Rules breaches, and "Issues that seriously impact your ability to moderate your community." Followed by a three-item submission checklist (clear description, direct links, usernames involved). Reddit tells escalators what evidence to bring.

**Official-message verification** `[observed]` — a full anti-impersonation spec in a FAQ answer: notices arrive from `u/reddit`; "That account and other admin accounts will have their usernames displayed **in red**"; a Snoo icon or a red `[A]` badge appears; emails come from `@reddit.com`, `@redditmail.com` or `@redditforcommunity.com`; and "Links in our messages will point back to reddit.com." Reddit publishes the visual and domain signature of its own enforcement notifications so users can authenticate them. Directly transferable to any product whose adverse notices are a phishing target — which is all of them.

## T10 Disclosures, legal & compliance

Reddit's compliance surface is the most jurisdiction-explicit in this batch.

**`Country specific reporting procedures` — six named regimes, each with its own article** `[observed]`

- `Digital Services Act (DSA): Information for EU users`
- `Digital Services Act (DSA): Resolution options for EU users`
- `UK Online Safety Act: Information for UK users`
- `AU Online Safety Act: Information for Australian users`
- `U.S. Take It Down Act: Information for people in the U.S.`
- `Brazil Digital ECA: Information for users in Brazil`

**Title grammar: `<Statute name>: Information for <population>`.** Rigidly consistent, and the population is described in the users' own terms (`EU users`, `UK users`, `Australian users`, `people in the U.S.`, `users in Brazil`) rather than as a jurisdiction abstraction. Note DSA gets *two* articles, split between information and `Resolution options` — the remedy is separated from the explanation.

Also note the inconsistency: five say "users", the US one says "**people in** the U.S." A small drift, but visible in a set whose whole value is its regularity.

**Legal-request disclosure** `[observed]`
`Legal requests overview for redditors` · `Guidelines for civil and non-government legal requests for account information`. Reddit documents, for the pseudonymous user, how third parties can try to unmask them — a privacy-forward disclosure choice.

**Local-law content restriction as a distinct state** `[observed]` — `Why is content being restricted in my country?` (user-facing title) alongside `Legal Restrictions on Content` (the title used when the same article is linked from the enforcement policy). **Two titles for one article, one user-voiced and one system-voiced** — probably a retitling in progress, and the old title survives in an inbound link.

**Transparency commitment** `[observed]`

> "We regularly share findings about how we enforce our policies through our recurring Reddit Transparency Report… In addition to making these reports available, we **communicate them proactively to our users and the public in our r/redditsecurity community.**"

Transparency reporting is delivered *into a community on the platform*, not only as a PDF. The distribution channel is itself part of the disclosure design.

**Age** `[observed]` — `Minimum age requirements` is a sub-section containing exactly one article, `How old do I need to be to use Reddit?`. A one-article category, which is an IA decision to give age its own top-level slot in the rules taxonomy rather than filing it under accounts.

**Crisis and harm resources as a published set** `[observed]` — seven articles with a rigid title grammar:

`Reddit Mental Health Support Resource Hub` · `Get support for yourself or others: Self-harm Resources` · `…: Eating Disorder Resources` · `…: Domestic Abuse Resources` · `…: Sexual Violence Resources` · `…: Substance Abuse Resources`

**`Get support for yourself or others: <Harm> Resources`** — the prefix does two things at once. It offers help *and* gives the reader a non-disclosing reason to be reading the page ("or others"). Anyone can open a self-harm resource page while telling themselves they are looking on behalf of a friend. That is a genuinely humane piece of content design and the best title pattern in the file.

**NCII handling** `[observed]` — `What should I do if someone has shared or threatened to share intimate images of me or somebody I know?` Full-sentence first-person title, includes the *threat* as well as the act, and includes the third party ("or somebody I know") in the same title.

## T11 Help-centre architecture

**Four-level tree, with an audience switch at the root:**

Audience (`Redditor` / `Moderator` / `Ads` / `Reddit Pro`) → Category (6 or 5, each with a scope line) → Sub-section (named, e.g. `Account and community restrictions`) → Article.

Breadcrumbs are rendered on every article: `Reddit Help` → `Rules & Reporting` → `Account and community restrictions`. Three levels, and the middle level uses the **category's display name with the ampersand**, matching the nav label exactly.

**`Account and community restrictions` — 25 articles that constitute the policy inventory** `[observed]`

The titles fall into five distinct grammars, and the mix is the notable thing:

| Shape | Examples |
|---|---|
| Bare policy noun | `Spam` · `Harassment` · `Violence` · `Hate` · `Impersonation` · `Disrupting Communities` · `Banned Communities` · `Quarantined Communities` · `Illegal or Prohibited Transactions` · `Manipulated Content and Misleading Behavior` |
| `What is/are…?` | `What are Reddit's rules?` · `What is ban evasion?` |
| User's anxious question | `Why is content being restricted in my country?` · `Why can't I see the list of moderators in a community?` · `What should I do if I see something I don't like on Reddit?` · `Is posting someone's private or personal information okay?` |
| **Imperative prohibition** | `Don't break the site` · `Never Post Intimate or Sexually Explicit Media of Someone Without Their Consent` · `Do not share sexual or suggestive content involving minors, or engage in any predatory or inappropriate behavior with minors` · `Do not share content depicting or promoting neglect, physical, or emotional abuse against minors` |
| `How does Reddit fight…?` | `How does Reddit fight the dissemination of terrorist content?` · `How does Reddit fight Child Sexual Exploitation?` |

Two of these are worth dwelling on.

**The imperative-prohibition titles are the rule itself, used as the article title.** `Don't break the site` is a genuine Reddit Rule rendered as a help-article H1 — casual, contracted, five words. Directly beside it sits `Never Post Intimate or Sexually Explicit Media of Someone Without Their Consent`, thirteen words in title case with "Never" as the intensifier. **The register tracks the severity of the harm, within one sub-section.** The trivial rule is colloquial and short; the severe rules are formal, long and title-cased. That is a defensible register gradient rather than a style-guide failure, and it is the same gradient Wise applies between app copy and fee tables.

**The `How does Reddit fight…?` shape is a company-accountability title, not a user-task title.** It answers "what are you doing about this" rather than "what should I do". Reddit ships that shape for exactly the two harms where public and regulatory scrutiny is highest (terrorist content, CSE) and nowhere else.

**Article-title grammar across the whole help centre — six recurring shapes:**

| Shape | Example |
|---|---|
| `How do I …?` | `How do I report a post or comment?` · `How do I block someone?` |
| `What is/are …?` | `What is karma?` · `What's a moderator?` |
| `Why …?` | `Why can't I see my post?` · `Why haven't I received my password reset email?` |
| `What should I do if …?` | `What should I do if I'm being harassed?` |
| Bare noun/gerund topic | `Spam` · `Automoderator` · `Mod Mode` · `Banner` |
| Imperative rule-as-title | `Don't break the site` |

`What should I do if I'm being harassed?` — first person, present continuous. The tense matters: the harassment is happening *now*, and the title matches that.

**`Reporting` sub-section — a per-object taxonomy** `[observed]`
`How do I report a post or comment?` · `How do I report a chat message?` · `How do I report a redditor?` · `How do I report an award?` · `How do I report an ad?` · `How do I report a community?` (+5 more)

Six parallel titles differing only in the reportable object. Reddit has an **object-complete reporting IA** — every entity type in the product has a named report article, including `an award` and `an ad`. A user never has to guess whether the thing in front of them is reportable.

**Moderation Tools sub-sections** `[observed]`: `Moderation tools` · `Community styling` · `Mod mail` · `Automoderator` · `Beta tools and programs`. Note `Automoderator` gets its own sub-section with four articles (`Automoderator` · `Writing basic automoderator rules` · `Full automoderator documentation` · `Automoderator standard conditions`) — a configuration language taught in a progression from concept → basic → full reference → condition dictionary. That is documentation-set design, not just article writing.

## T12 FAQs

**Two FAQ blocks, one per audience**, each under the heading `Frequently Asked Questions`, with **answers rendered inline** (unusually — most accordions in this batch did not serve their bodies).

**Redditor Help FAQ — 8 questions** `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | My account has been locked as a security precaution | Not a question — a *statement of the user's situation*. Explains the red warning, routes to password reset, and nests three sub-questions (see below) |
| 2 | How do I know if a message from Reddit is official? | Full anti-phishing spec: `u/reddit`, red usernames, `[A]` badge, three sender domains |
| 3 | Can I change my username? | No, irreversibly; deleted usernames never return; you may create additional accounts instead |
| 4 | Recovering a lost or forgotten username | Three routes: search your email, use password reset to list associated accounts, or tap your avatar in-app |
| 5 | How do I log in to Reddit if I forgot my password? | Per-platform procedure; hard "locked out" answer if no email on file |
| 6 | What is karma? | Defines karma as a reflection of votes; warns it is not 1:1; explains karma gates on posting |
| 7 | Helpful communities for redditors | Official vs unofficial community lists, each labelled |
| 8 | What is two-factor authentication and how do I set it up? | Defines the two factors explicitly, then per-surface setup including Old Reddit |

**Structural notes.** Items 1 and 4 are **not questions** — they are a situation statement and a gerund task. Reddit mixes declaratives into a block titled "Frequently Asked Questions" where the item is more likely to be scanned than asked. Q1 in particular (`My account has been locked as a security precaution`) is the user's own summary of their predicament, in the first person, used as an accordion label. That is the Wise "I sent the wrong amount" pattern applied to a security state.

Q1 also carries an internal `Jump to:` mini-nav with three anchors — `How do I know if my account was locked?` · `How do I unlock my account?` · `What do I do if I'm not receiving the email to reset my password?` — i.e. a three-question FAQ nested inside one FAQ item, ordered *diagnose → fix → fix-the-fix*. The third anchor is the failure of the second, pre-empted.

Q6's answer contains the most Reddit sentence in the harvest: "Don't set out to accumulate karma; just set out to be a good contributor, and let your karma simply be a reflection of your legacy. (**And please note: Reddit makes no guarantees about attaining Nirvana**)." A joke, in a parenthetical, immediately after sincere advice — and then the answer returns to a straight-faced section on karma gates. The tone whiplash is characteristic and is *only* deployed on low-stakes topics; there is no equivalent in any enforcement article.

**Moderator Help FAQ — 4 questions** `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What is an AMA and why would I host one? | Defines `AMA` and `OP`; cites engagement uplift figures; names example AMAs |
| 2 | Communities for moderators | Long labelled list, split `Official:` / `Unofficial:`, including five language-specific mod communities |
| 3 | Contacting the admins | Bounded escalation criteria + three-item evidence checklist |
| 4 | Recruiting new moderators | When to recruit, three recruiting approaches, tips |
| 5 | Crisis management | Operational playbook; three-tool stabilisation sequence; wellbeing close |

Q1's answer is the clearest example of Reddit teaching its own jargon inside prose: "AMAs, short for 'Ask Me Anything', are a long-held Reddit tradition. In an AMA, **OP (that stands for 'Original Poster')** sets the stage…". Two acronyms glossed in two sentences, both with the expansion in quotation marks.

Q1 also carries a **quantified benefit claim** — "AMAs can increase comments in a community by up to 5% and returning redditors by 8%!" — which is the only exclamation mark and the only performance statistic in the harvested mod documentation. Reddit is selling a feature to its volunteers with metrics, which reframes the moderator as an operator with KPIs.

**Ordering across both FAQ blocks:** the Redditor block leads with the **locked account** and the Moderator block leads with **hosting an AMA**. Users arrive broken; moderators arrive ambitious. The two blocks are pitched accordingly, and that audience-differentiated entry point is the sharpest content decision in Reddit's help centre.

## T13 Coined structural terminology

**PRIORITY SECTION.** Reddit's vocabulary is the most self-conscious in this batch: almost every coined term is glossed on first use *inside* formal policy prose, and several are visibly mid-migration.

| Term | Reddit's usage | The alternative it rejected / notes |
|---|---|---|
| `redditor` | The user noun, **lowercase**, used in policy prose ("All redditors and communities operate by…") and in an audience label (`Redditor Help`, capitalised there) | "user", "member" — and note the casing is inconsistent between prose and UI label |
| `community` | **The current official term** for a topic space | Actively replacing `subreddit` |
| `subreddit` | The legacy term, now consistently demoted: `What are communities or "subreddits"?` — in **scare quotes**; and in policy prose, "Individual communities (also known as 'subreddits')" | A live, visible, half-finished terminology migration. The article slug is still `.../360043069012-Quarantined-Subreddits` while the rendered title is `Quarantined Communities` — **the URL preserves the old term and 301s to the new one** |
| `r/<name>` | The addressing convention for a community, used as link text throughout (`Visit r/help`, `r/ModSupport`) | The slash-prefix is treated as part of the name, not as a path |
| `u/<name>` | The addressing convention for an account (`u/reddit`, `u/ModSupportBot`) | |
| `admin` | Reddit employee with sitewide enforcement authority; glossed as "Reddit employees (known as 'admins')" | "staff", "support agent" |
| `mod` | Volunteer community moderator; glossed as "community moderators ('mods')" | |
| `mod mail` | The moderator contact channel; **two words, lowercase** in most titles (`What is mod mail and how do I access it?`) but `Mod Mail` capitalised as a sub-section name | Casing inconsistency recorded |
| `modmail` variants | — | Not observed; Reddit uses the spaced form |
| `karma` | The reputation metric, lowercase, split into `post karma` and `comment karma` | "reputation", "score" |
| `upvote` / `downvote` | The voting verbs, with their own Basics article | "like/dislike" |
| `AMA` | "Ask Me Anything" — glossed | |
| `OP` | "Original Poster" — glossed | |
| `Snoo` | The mascot, used as a *verification signal* ("A Snoo icon or a red `[A]`") and with its own brand-usage article | |
| `quarantine` / `quarantined` | The community-level restriction state; used as both noun and verb ("Reddit Administrators may apply a quarantine", "placed in quarantine") | "restricted", "gated", "NSFW-walled" — a medical metaphor chosen over a permissions one |
| `sitewide rules` | Reddit's global layer, lowercase | vs `Reddit Rules` (title case) — **both used for the same document in the same paragraph** |
| `Reddit Rules` | The formal name of the sitewide policy; occupies the "Terms" slot in the footer | |
| `Moderator Code of Conduct` | The policy governing the volunteers | "mod rules" |
| `ban` | The account and community removal verb, with published durations (`3-day ban`, `7-day ban`, `permanent ban`) | `suspension` appears once and is never defined — recorded as a slip |
| `ban evasion` | A named distinct violation with its own filter tool | "circumvention" |
| `Automoderator` / `automod` | The rule engine; **capitalised as `Automoderator` in help titles, lowercase `automoderator`/`automod` in body prose**, and `AutoModerator` in the community name `r/AutoModerator` | Three casings for one tool, observable within a single article |
| `Crowd Control` | Named mod tool that limits low-affinity participation | |
| `Harassment Filter` | Named mod tool | |
| `Ban Evasion Filter` | Named mod tool | |
| `Moderation Queue` | Named surface for held content | "pending", "review" |
| `Mod Mode` | Named moderator UI state | |
| `Moderator Reserves` | A system for requesting "temporary assistance from experienced volunteer moderators" | A named mutual-aid mechanism between volunteer teams — unusual enough to be worth flagging |
| `Community Funds` | A named grant programme for communities | |
| `Community Digest` / `Community satisfaction surveys` | Named beta mod tools | |
| `Temporary events` | A named mod tool for time-boxed community changes | |
| `NSFW` | The content/profile tag applied by admins or mods | "age-restricted", "sensitive" — Reddit keeps the internet-native initialism |
| `megathread` / `daily thread` / `stickied post` / `sticky posts` | Community-management conventions taught as technique in the crisis playbook | Note `stickied post` and `sticky posts` both appear |
| `fellow helper` | A named informal role in `r/help` | |

**Three terminology findings worth recording as defects.**

1. **`subreddit` → `community` is mid-migration and the seams show.** Scare quotes in one title, "(also known as)" in policy prose, the old term still in the URL slug of a renamed article, and `redditrequest` copy referring to "communities". A user searching either term will land somewhere, which is the point of the dual-teaching, but the platform is currently maintaining two vocabularies.
2. **`sitewide rules` and `Reddit Rules` are used interchangeably within a single paragraph**, one lowercase-descriptive and one title-case-proper. Both link to the same (blocked) document. A reader cannot tell whether these are one thing or two.
3. **`Automoderator` has three casings in active use.** Trivial individually; cumulatively it means the tool's name cannot be searched reliably.

**Register split worth noting:** the community-facing voice uses `mods`, `karma`, `AMA`, `Snoo`, `r/`, `u/`; the policy-facing voice uses `community moderators`, `sitewide rules`, `enforcement actions`, `non-arbitrary`. The two are deliberately bridged by the parenthetical-gloss habit — formal term first, community term in quotes after. That single device is the mechanism by which Reddit's policy prose stays legible to its own subculture, and it is the most transferable thing in this section.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company, used in both directions — "we reverse our original decision if we determine that our initial assessment was incorrect" and "We may also add NSFW tags". Moderators are addressed in the second person as colleagues ("your community", "your mod team", "you're not alone"). Notably, Reddit addresses **volunteers with the grammar of staff**.

**Register — a three-way gradient, visible within one help centre.**

| Surface | Register | Example |
|---|---|---|
| Basics / karma / AMA | Colloquial, joking, exclamatory | "(And please note: Reddit makes no guarantees about attaining Nirvana)" · "AMAs can increase comments… by up to 5%!" · "communities may be dedicated to promoting hoaxes (**yes we used that word**)" |
| Mod operations | Warm, second-person, practical, wellbeing-aware | "step back, take a deep breath" · "Life gets busy!" · "Moderating is tough, but you're not alone!" · "Most importantly, take care of yourself." |
| Enforcement and legal | Flat, procedural, regulator-inflected | "timely, non-discriminatory, diligent, and non-arbitrary" · "Certain violations give rise to an immediate permanent ban" |

"(yes we used that word)" — a parenthetical aside defending the word `hoaxes` inside the Quarantined Communities policy — is the one place the colloquial register leaks into enforcement copy, and it is doing deliberate work: signalling that Reddit is knowingly taking a position on contested factual claims ("there are some things that are either verifiable or falsifiable and not seriously up for debate").

**Contractions** used freely in help and mod copy ("can't", "won't", "don't", "you'll", "isn't"), and **also** in enforcement copy ("can't be changed", "won't be able to help"). Reddit does not formalise its grammar as stakes rise; it formalises its *vocabulary*.

**No `Oops`, no `Uh oh`.** Failure states are described, not performed.

**Emphasis discipline.** Bold is used sparingly and always on a **consequence or a constraint**: "**We will never do so on any other platform.**" · "**We won't be able to help if your email address is out of date.**" · "**These three mod tools are the quickest way to help stabilize moderation**". Italics are reserved for UI-label references inside procedures (*Reset Password*, *Verify Email*, *Settings*) — a consistent typographic convention that separates "this is a thing on screen" from "this is important".

**Numbers as bounds, not boasts** `[observed]`: `3-day`, `7-day`, `six months`, `at least one month`, `6-digit`, `up to 5%`, `8%`, `39` locales. Every figure except the AMA uplift is a limit on a process. Reddit cites no user counts anywhere in the harvested set.

**Accessibility content** `[observed]`

- `Skip to main content` is present and **first in DOM** on every help page. Correct.
- 39 locales offered from an in-page switcher on every page, each link labelled in its own script (`العربية`, `日本語（日本）`, `Português do Brasil`). The current locale is rendered as plain text rather than a link — correct practice.
- Article-feedback taxonomy explicitly includes translation quality (`Confusing: information is unclear or translation is wrong`) — localisation defects are routed as content defects.
- Article metadata includes a visible `Updated <date> <time>` stamp on every policy article (`Updated August 06, 2026 15:31`, `Updated March 29, 2026 18:31`, `Updated January 13, 2025 20:00`). Timestamps to the minute. Users can see policy freshness, and the spread reveals which policies are stale.
- **Gap:** several inline images in the official-message FAQ carry filename-style alt text — `icon_-_snoo.png`, `image2.png`, `image3.png`, `image4.png`. These images carry the *verification signals* (the red `[A]` badge, the email screenshots) that the article exists to teach. A screen-reader user reading the anti-phishing article cannot perceive the thing it is describing. This is the most consequential accessibility defect found in the batch.
- **Gap:** theming-asset images on the routing cards have empty or missing alt, which is defensible (decorative), but the card headings are marked up inside link-plus-`###` constructions that render oddly (`### [Check platform status](< https://www.redditstatus.com/ >)`), suggesting a template escaping bug.
- Embedded YouTube video (karma explainer) uses `youtube-nocookie.com` — a privacy-preserving default.
- **No accessibility statement** was reachable in the harvested set. `[absent]`

**Negative findings, recorded honestly**

- `sitewide rules` vs `Reddit Rules` for the same document, in one paragraph.
- `Automoderator` / `automoderator` / `AutoModerator` — three casings.
- `mod mail` vs `Mod Mail` — sub-section heading disagrees with article titles.
- `suspension` used once in the enforcement ladder without ever being defined as distinct from `ban`.
- `Forgot password?` (web) vs `Forgot password` (mobile) — question mark dropped on mobile, both quoted in one article.
- `Why is content being restricted in my country?` and `Legal Restrictions on Content` are two titles for one article, both live in inbound links.
- `Quarantined Subreddits` survives as the URL slug of `Quarantined Communities`.
- Five of six Redditor category scope lines end in a full stop; `Getting Started`'s does not.
- `Information for EU/UK/Australian users` vs `Information for people in the U.S.` — population noun drifts in an otherwise rigid title template.
- Filename alt text (`image2.png`, `icon_-_snoo.png`) on the images that carry the anti-phishing verification signals.
- `stickied post` and `sticky posts` both used within the crisis-management article.

---

## Transferable patterns

1. **Publish the tariff.** "a warning, followed by a 3-day ban, 7-day ban, and then a permanent ban" — then bound it in both directions (immediate permanent ban for severe cases; discretion within a single rule). Naming the actual durations converts an opaque enforcement system into a predictable one, at the cost of some flexibility. Transfers to any account-restriction or limitation ladder, including PayPal account limitations, where the current copy names the state but not the schedule.
2. **Gloss your own subculture's term inside formal prose.** "community moderators ('mods')", "Reddit employees (known as 'admins')", "communities (also known as 'subreddits')", "OP (that stands for 'Original Poster')". Formal term first, community term in quotes after. This is how Reddit keeps policy documents readable to the people governed by them, and it is directly reusable anywhere an internal term has leaked into user vocabulary.
3. **`Get support for yourself or others: <Harm> Resources`.** A title that gives the reader plausible deniability for opening it. The single most humane content-design decision in this batch, and applicable to any sensitive self-service topic — debt, fraud victimhood, gambling harm.
4. **Scale the appeal standard to the scope of the enforcement.** A user appeals with a tap; a quarantined community must document a month of sustained reform and is explicitly told not to rush. Proportionality expressed through evidentiary burden rather than through tone.
5. **Publish the visual and domain signature of your own adverse notifications.** `u/reddit`, red usernames, a red `[A]`, three named sender domains, and "Links in our messages will point back to reddit.com." Enforcement notices are the highest-value phishing target in any product; Reddit hands users the authentication test. Immediately transferable — and Reddit's own accessibility failure on those images is the lesson in how *not* to ship it.
6. **Put the broken user first in your help IA.** `Account Status` ("Information on resolving account issues") above `Getting Started`; the Redditor FAQ opening on a locked account. Order categories by arrival state, not by product logic.
7. **Two-layer rule copy: abstract model, then the trivial rule the user will actually trip over.** "each community may set its own rules… " followed immediately by "rules about things like how you should format a post or staying on-topic." Ground the governance concept in the mundane instance.
8. **Name your remedy channel's own abuse limits.** Reddit and Pinterest both publish appeal-throttling policies. In a DSA-era disclosure environment this is becoming table stakes, and stating it pre-empts the "you ignored my tenth appeal" complaint.

## Caveats & gaps

- **`reddit.com` and `redditinc.com` are both on the fetch blocklist (HTTP 403).** Consequences: no marketing page, no hero or value-proposition copy (T2 is `[absent]`), and — most importantly — **the sitewide `Reddit Rules` text itself was never read.** Every statement in this file about what the Reddit Rules *say* is second-hand via help-centre summaries. The federated-moderation *architecture* is well evidenced; the sitewide rules *wording* is not.
- **Per-community rules were not sampled.** The brief asks for both layers of the federated model. Reddit's *description* of the community layer is captured in detail, but no actual community's rules were read — visiting a community would mean browsing user-generated content on the blocked domain, which was out of scope on both counts. So the volunteer-written layer is documented structurally and not evidenced by example.
- **`Moderator Code of Conduct`** is referenced repeatedly as the governing document for volunteers but lives on `redditinc.com` and was unreachable.
- **All in-product states are inferred from help documentation.** The quarantine interstitial, the red login warning, the violation notice, the Moderation Queue and the removal-reason copy are `[documented]` at best. No enforcement notification was observed as a live string.
- **T8 (empty states) is essentially absent.** The help search surface did not expose a no-results string.
- Article *bodies* were opened for only four articles (`Content Moderation, Enforcement, and Appeals`; `Quarantined Communities`; `What are Reddit's rules?`; plus the inline FAQ answers on the two audience landing pages). The remaining ~100 titles surfaced in this file are titles only — high-signal for IA and task phrasing, silent on answer structure.
- The six jurisdiction articles (`DSA`, `UK OSA`, `AU OSA`, `Take It Down Act`, `Brazil Digital ECA`) were **not opened**. Their titles are captured; their disclosure copy is unharvested and would be the highest-value next pass for regulatory-content reference.
- `redditstatus.com` was linked but not fetched, so Reddit's incident-communication copy is unharvested (unlike Discord's and Twitch's, both captured in this batch).
- Reddit Pro, Reddit Premium, Ads Help and the Developer Platform help centres are unharvested.
- Mobile app strings, email copy and push copy are out of the public web surface.

## Sources

1. https://www.reddit.com/ (HTTP 403 — blocklisted)
2. https://redditinc.com/policies/reddit-rules (HTTP 403 — blocklisted)
3. https://support.reddithelp.com/hc/en-us
4. https://support.reddithelp.com/hc/en-us/p/redditor_help_center
5. https://support.reddithelp.com/hc/en-us/p/mod_help_center
6. https://support.reddithelp.com/hc/en-us/categories/360003247491
7. https://support.reddithelp.com/hc/en-us/sections/360008810092
8. https://support.reddithelp.com/hc/en-us/articles/23511059871252-Content-Moderation-Enforcement-and-Appeals
9. https://support.reddithelp.com/hc/en-us/articles/360043069012-Quarantined-Communities
10. https://support.reddithelp.com/hc/en-us/articles/360043503951-What-are-Reddit-s-rules
11. https://support.reddithelp.com/hc/en-us/categories/200073949
12. https://support.reddithelp.com/hc/en-us/categories/15482740053780
