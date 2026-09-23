# 146. Instagram

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Photo/video social network (Meta family) |
| Primary URL | https://www.instagram.com/ |
| Corpus rank | 146 |
| Benchmark strength (source list) | Creation, sharing, privacy settings |
| Locale / market observed | en-US (`about.instagram.com` default); **one help page served fil-PH (Tagalog) against an en-US request** |
| Platform observed | Web (marketing site, help centre, transparency centre) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Meta Oversight Board appeal route; age-assurance regime driven by US state law, UK OSA and EU DSA (not named on the pages harvested); COPPA-adjacent 13+ minimum age |
| Harvest date | 2026-09-22 |
| Pages inspected | 20 URLs (13 returning usable content) |
| Harvest completeness | **Partial — significantly degraded.** `instagram.com` and `help.instagram.com` index return empty bodies to a plain fetch. Most help articles returned `<head>` metadata only (titles and meta-descriptions) with no article body; two help articles rendered fully, one of them in the wrong language. All privacy-setting *bodies* (private account, restrict, block) are therefore title-and-description level only. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Instagram home | https://www.instagram.com/ | **Empty body** — client-rendered app shell, no server HTML |
| About Instagram home | https://about.instagram.com/ | Metadata only; body client-rendered |
| Features | https://about.instagram.com/features | Rendered — hero, feature naming, CTAs |
| Privacy tools | https://about.instagram.com/safety/privacy | Rendered but near-empty: heading, alt text, cross-links only |
| Safety tools | https://about.instagram.com/safety/account-safety | Same pattern — heading and alt text only |
| Teen Accounts (product page) | https://about.instagram.com/community/teen-accounts | Rendered — default-settings inventory + 11-question FAQ |
| Teen Accounts announcement | https://about.instagram.com/blog/announcements/instagram-teen-accounts | Rendered — richest single source for default-settings vocabulary |
| Help centre index | https://help.instagram.com/ | **Empty body** |
| Community Guidelines | https://help.instagram.com/477434105621119 | Rendered **in Tagalog** despite en-US request — see Caveats |
| Community Guidelines (locale-forced) | https://help.instagram.com/477434105621119?locale=en_US | 302 to `transparency.meta.com/policies/community-standards`, which returned an empty body |
| Requesting a review of a content removal | https://help.instagram.com/280908123309761 | Rendered in English — the one full enforcement/appeal article captured |
| Make your account private | https://help.instagram.com/448523408565555 | Metadata only (`meta-title`, `meta-description`, `meta-keywords`) |
| About disabled Instagram accounts | https://help.instagram.com/366993040048856 | Metadata only |
| Restrict or unrestrict someone | https://help.instagram.com/2638385956221960 | Metadata only |
| Blocking People | https://help.instagram.com/426700567389543 | Metadata only |
| Remove a first-time strike | https://help.instagram.com/573546665408885 | Metadata only |
| Privacy Settings & Information | https://help.instagram.com/196883487377501 | Metadata only |
| About Instagram Teen Accounts (help) | https://help.instagram.com/995996839195964 | **Empty body** |
| Restricting accounts (Meta Transparency Centre) | https://transparency.meta.com/en-gb/enforcement/taking-action/restricting-accounts | Metadata only |
| Facebook help mirror | https://www.facebook.com/help/instagram/477434105621119 | **Empty body** |

---

## T1 Navigation & IA labels

**`about.instagram.com` global nav — three expandable groups plus four flat links** `[observed]`

`Features` · `Safety` · `Community` · `Our story` · `News` · `Threads` · `Edits` · `Log in`

Each group expands to a list whose first item is a scope-setting overview label:

| Group | Children (verbatim) |
|---|---|
| `Features` | `Our features` · `Reels` · `Stories` · `DMs` · `Search & explore` · `Instagram Plus` |
| `Safety` | `Overview` · `Safety tools` · `Privacy tools` · `Account security` |
| `Community` | `Our community` · `School Partnerships` · `Teen Accounts` · `Anti-Bullying` · `Parents` · `Programs` |

Two structural observations. First, **safety is split into three sibling concepts** — `Safety tools`, `Privacy tools`, `Account security` — and each of the three pages ends with an explicit cross-link to the other two ("In addition to Privacy, you can learn more about the tools we have to support Safety or Account Security on Instagram."). Instagram is conceding that users cannot reliably tell the three apart, and patching it with reciprocal navigation rather than merging them. That reciprocal-triad pattern is worth noting as a symptom: when every page in a set has to point at its siblings, the taxonomy is not doing its job.

Second, `Community` is an **audience-and-programme drawer, not a content drawer** — `Parents`, `School Partnerships`, `Teen Accounts` sit alongside `Anti-Bullying`. Teen safety is navigationally promoted to first-class IA, above `Our story`.

**Footer groupings** `[observed]` — six unlabelled columns:

1. `Our story` · `Leadership` · `Working at Instagram` · `Politics`
2. `Features` · `Reels` · `Stories` · `DMs` · `Search & explore`
3. `Safety` · `Safety tools` · `Privacy tools` · `Account security`
4. `Community` · `School Partnerships` · `Teen Accounts` · `Anti-Bullying` · `Parents` · `Programs`
5. `Threads` · `Edits` · `Business` · `Creators`
6. `News` · `Meta` · `Family Center` · `Help Center`

Note the columns have **no group headings** — the first link doubles as the label, which is why `Safety` appears both as a heading-equivalent and as a member of its own list. `Help Center` is the *last* link in the *last* column, and `Family Center` (the parental-supervision hub) sits beside it.

Legal strip `[observed]`: `API` · `Privacy` · `Terms` · `Sitemap` — duplicated twice in the DOM.

**Help-centre category tree** `[absent]` — `help.instagram.com` returned no server HTML, so the top-level help IA could not be captured.

## T2 Value proposition & headline patterns

**Features-page hero** `[observed]`

> `Share what you’re into with the people who get you`

Rendered twice in the DOM as two fragments (`Share what you’re into` / `with the people who get you`) with an image between them — a responsive/animation split that a screen reader may read as two separate headings. Flagged as a suspected accessibility defect, not confirmed.

The headline is notable for what it omits: no photos, no video, no audience size, no "world". It is entirely about **affinity** ("the people who get you"), which is a defensive repositioning away from reach and towards small-group intimacy.

**Section-header pattern — verb-first, feature-named** `[observed]`

- `Where everyday moments bring friends together`
- `Unlock creativity with Reels`
- `Share Stories` — "Post moments from your everyday life in your Stories. These are fun, casual, and only last 24 hours."
- `Start a conversation with DMs`
- `Discover More`

Each section header carries the feature's proper noun (`Reels`, `Stories`, `DMs`) and each body sentence explains the *mechanic* rather than the benefit — Stories' body leads with ephemerality ("only last 24 hours"), which is the thing a newcomer most needs told. `Discover More` is the one bare, object-less header on the page, and it is also the one section whose body ("Discover content and creators based on your interests") is the vaguest.

**Teen Accounts page headline** `[observed]`

> `Instagram Teen Accounts: Inspired by 13+ Content Ratings`

An analogy headline — it borrows the credibility of film/TV age ratings rather than describing the product. Compare the announcement-post headline, which is a two-audience promise:

> `Introducing Instagram Teen Accounts: Built-In Protections for Teens, Peace of Mind for Parents`

Colon-plus-two-benefits, each benefit addressed to a different reader. This is the clearest structural pattern in the Instagram set: **teen-safety copy is always written to two audiences in one sentence**, with the teen first and the parent second.

**Announcement post uses an explicit `Takeaways` block** `[observed]` — three bullets before the body, each a complete sentence, leading with the product change, then the mechanism, then the constraint (under-16s need parental permission to loosen settings). Summary-first, constraint-last.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Log in` | About-site nav, top right | Points to `#` on the About site — **dead anchor**, a real defect |
| `Reels` / `Stories` / `DMs` / `Search & Explore` | Features page, end of each section | CTA text = destination page title = feature name. No `Learn more` anywhere on the page |
| `Learn more about safety here` / `Learn more about account security here` | Safety/Privacy pages | **"here" is the link text** in the rendered markup — classic non-descriptive link-text failure, and inconsistent with the rest of the site's named-destination CTAs |
| `Explore More` | (Discord comparison; not Instagram) | — |
| `View More` | Foot of related-articles carousel | Bare, object-less |
| `Download for iOS/Android.` | Features page, above store badges | Punctuated with a full stop; slash-joined platforms |
| `Ask for a review` | In-product violation notification | `[documented]` — the primary appeal entry point |
| `Request a review` | Account Status screen | `[documented]` |
| `Submit request` → `Done` | Appeal confirmation | `[documented]` — two-tap confirm |
| `Request Review` → `Close` | Support Inbox route | `[documented]` — **note the capitalisation and word-order differ from `Request a review` on the Account Status route** |
| `More Options` | Support Inbox violation detail | `[documented]` |
| `Find a resource` | (Pinterest; not Instagram) | — |

**Defect worth recording:** the same action is labelled `Request a review` (Account Status path), `Request Review` (Support Inbox path) and `Ask for a review` (push notification) — three labels for one appeal action, all three quoted inside a single help article. For a flow where the user is already anxious and already confused about which surface they are on, the inconsistency is expensive.

## T4 Onboarding & getting-started

`[documented]`, and only for the *teen* path — the general signup flow was not reachable.

**The teen onboarding model is "defaults, then permission to loosen"** rather than a step sequence. The announcement post states the protections "are turned on automatically, and parents decide if teens under 16 can change any of these settings to be less strict." There is no numbered onboarding; the onboarding *is* the default state.

**Parental-supervision sequence** `[documented]` — described as: teen requests a setting change → teen must set up parental supervision → parent approves or denies → optionally the parent can be given standing permission for the teen to self-manage. The copy is careful to keep the teen as the actor who initiates ("teens will need to set up parental supervision"), which preserves teen agency in a flow that removes teen control.

**Help-centre task phrasing** `[documented]` via captured `meta-title` values — Instagram uses **noun-phrase and imperative article titles, not questions**:

- `How to make private Instagram accounts` (meta-title) for an article whose search-index title is `Make your Instagram account private`
- `About disabled Instagram accounts`
- `Remove a first-time strike from your Instagram account`
- `Restrict or unrestrict someone on Instagram`
- `Confirming your age on Instagram`

The `About X` / `Remove X` / `Restrict or unrestrict X` shapes are the three recurring grammars. `Restrict or unrestrict` pairing the action with its reversal in one title is a good pattern — it tells the user up front that the action is undoable.

## T5 Form & field labels

`[documented]` — only the settings-path labels quoted inside help articles were retrievable. No live form was reachable.

**Settings-path breadcrumbs quoted in help copy** `[documented]`:
`Settings` → `Privacy and Security` → `Account Privacy` → `Private Account` (toggle); and on web, "Below `Account Privacy`, click to check the box next to `Private Account`."

Note the platform divergence baked into the copy: **a toggle on mobile, a checkbox on web, for the same setting.** The help article has to describe both, which is a content cost created by a design inconsistency.

**Support-navigation labels** `[observed, quoted in help article]`:
`Below More info and support, tap Help.` → `Account Status` · `Support Requests` · `Violations`

`More info and support` as a settings section heading is doing two jobs (information *and* remediation) and is the label a user in trouble has to find. It is not the word "Help" or "Problem", which is a findability risk.

Live field labels, placeholders and validation text: `[absent]`.

## T6 Account, content and live states

**PRIORITY SECTION.** Instagram's state vocabulary splits across three planes — account *privacy* state, account *enforcement* state, and *relationship* state. All three are named in the surfaces harvested; only the first and third are described in any detail publicly.

**1. Account privacy states** `[documented]`

| State | Label | Consequence as worded |
|---|---|---|
| Public (default for adults) | — (the absence of `Private Account`) | Not named as a state; only implied by its opposite |
| Private | `Private Account` | "only followers you approve can see what you share"; follow requests required to see "your posts, your followers list or your following list" |
| Teen default | — | "If you're under 18, your Instagram account is private by default" |
| Business | — | "Business profiles aren't able to make their accounts private" |

**The public state has no name.** Instagram names only the restricted state (`Private Account`) and represents "public" as an un-ticked box. Compare Pinterest (150's sibling in this batch), which ships a `Profile visibility` setting with both poles named. Not naming the default is a real content-design decision with a cost: the user cannot search for or reason about the state they are currently in.

**2. Relationship / moderation-by-the-user states** `[documented]`

- `Restrict` / `Unrestrict` — consequence as worded: "they won't be able to see when you're online or if you've read their messages." Restrict is a **one-way-mirror** state: the restricted person is not told, and their comments become visible only to them. The article title pairs the action with its undo.
- `Block` / `Unblock` — `Blocking People` (help category title); article described as "blocking or unblocking people on Instagram".
- `Hidden Words` — a named filter state rather than a per-person state; teen accounts get "the most restrictive version" automatically so "offensive words and phrases will be filtered out of teens' comments and DM requests."
- `Mute` — **`[absent]`.** Widely known as an Instagram feature, but no mute article, label or consequence sentence was reachable in this harvest. **Not recorded, because it was not observed.**

The `restrict` / `block` / `mute` triad is the genuinely interesting content problem here: three adjacent severities with three different notification behaviours toward the other person, and the differentiating copy lives in article bodies that are not publicly served. This is the single biggest gap in the file.

**3. Account enforcement states** `[documented]` — see T9 for the notification copy.

- `disabled` — the umbrella term for account-level removal. The article is titled `About disabled Instagram accounts` and is described as covering "why an account might be disabled and how to recover it." Note the SEO keyword list attached to that page includes `instagram blocked`, `blocked instagram account`, `my insta account is blocked` — **users say "blocked" for what Instagram calls "disabled".** Instagram is buying the vocabulary gap in metadata rather than closing it in the UI.
- `strike` — a countable enforcement unit: "You may be able to remove a strike from your Instagram account if it's the first time we removed content for not following the Community Standards within the past year." A **12-month rolling window** and a **first-offence forgiveness** mechanic, both stated in one sentence.
- `Account Status` — the named surface where standing is displayed.
- `Violations` — the named inbox folder for enforcement notices.
- Content-level removal is described as applying to a "post, comment, story" — enumerated rather than abstracted to "content".

**Live states** `[absent]` — Instagram Live exists but no live-state vocabulary was reachable on these surfaces.

## T7 Error, failure & recovery

`[documented]`, thin.

**Recovery is framed as review, not correction.** The appeal article's operative promise: "If we find we've made a mistake, we'll let you know and your content will be reposted." First-person-plural admission of error, and the remedy is stated as an outcome the system performs ("your content will be reposted") rather than an action the user must take.

**Expectation-setting as the error-handling device** `[observed]`:

> "it may take up to 90 days to hear back from us about our decision, but your request may be closed before we can review it."

This is the most striking sentence in the Instagram harvest. It concedes, in one clause, that a request may be **closed without review** — and it places that concession immediately after the 90-day figure rather than burying it. Honest, and unusually blunt for a consumer platform. A content designer should note the construction: *state the worst-case duration, then state the worst-case non-outcome, in the same sentence.*

Also bounded honestly: "For some types of content, you can't request a review, but we're adding more options." The exception is admitted and dated as temporary.

**Non-Instagram-authored failure copy** `[observed]` — a defect: the `about.instagram.com` `Log in` control resolves to `#`. No error, no destination.

Recovery copy for login failure, upload failure, or network failure: `[absent]`.

## T8 Empty states

`[absent]` — all reachable in-product empty states are behind auth, and the help centre's own search surface did not render.

## T9 Enforcement notification and appeal copy

**PRIORITY SECTION.** This is the one Instagram area where a full article body was captured, so it can be described with confidence.

**The notification-to-appeal chain, as documented** `[documented]`

1. Content is removed. Instagram frames the trigger as "we find that it goes against our Community Guidelines."
2. A **violation notification** is sent. Its own copy is not quoted, but its affordance is: the user "tap[s] `Ask for a review` at the bottom and follow[s] the on-screen instructions."
3. The decision is also parked in two persistent surfaces the user can return to: `Account Status` and `Support Inbox`. Instagram explicitly states the appeal can be launched from either — a **three-entry-point design** (notification, status page, inbox).
4. Status is checkable at any time: "You can check the status of your review request at any time by opening `Account Status` or tapping the violation in your `Support Inbox`."
5. Outcome arrives as a **push notification**: "Once we've made a decision, you'll receive a push notification."
6. Escalation ladder: request a review → (if still disputed) appeal to the **Oversight Board**, with two bounds stated — "not all decisions are eligible" and "the board only selects a certain number of eligible appeals, so they may not choose yours to review."

**Pattern worth stealing: the escalation ladder is pre-disclaimed at every rung.** Each step forward is immediately paired with the reason it might not work (90 days, may be closed unreviewed, not all content eligible, board may not select you). Nowhere does the copy promise a hearing. For any regulated dispute or chargeback flow this is the right shape — *offer the route, bound the route, in adjacent sentences.*

**Who reviews** `[documented]`: "We use both technology and people around the globe to review content that we've been asked to look at again. Certain appeals may be prioritized for human review, which can limit the amount of requests we're able to look at." Human review is named as a *scarce* resource, and the scarcity is given as the reason for the 90-day figure. Causally honest.

**Platform-fragmented instructions** `[observed]` — the same article carries three separate numbered procedures: `Instagram app for Android and iPhone` (twice, once per entry point) and `Instagram Lite app for Android`. Six procedures in one article for one action. This is a content-scaling defect: appeal is the flow where a user is least able to tolerate branching.

**Strike-removal notification** `[documented]` — a distinct, positively-framed enforcement message: the user can remove a first-time strike, bounded by "within the past year". The metadata keyword list for that page includes `why can't i remove a strike`, which reveals the follow-on failure state exists and is common.

**Meta Transparency Centre** `[documented, title only]` — Meta publishes an enforcement taxonomy page titled `Restricting accounts` under an `enforcement/taking-action/` path, indicating `restricting` is the corporate-level verb for account-plane action even though the consumer-facing word is `disabled`. Page body did not render.

## T10 Disclosures, legal & compliance

**Age-assurance disclosure is the dominant compliance theme** `[observed]`.

- Minimum age stated obliquely via the guidelines: posts "will be seen by people as young as 13".
- Teen band defined as `13-17`, with a **sub-band at 16**: under-16s cannot loosen defaults without parental permission; 16-17s can, unless supervision is enabled. Two thresholds in one product.
- Age-falsification is disclosed rather than hidden: "We know teens may lie about their age and that's why we're taking steps to prevent it." Followed by the enforcement mechanism — using "information about a teen's original account to prevent them from using a new account with an adult age", and building technology "to proactively find accounts belonging to teens, even if the account lists an adult birthday."
- Dated updates inline: `Update on March 28, 2025:` appears twice, mid-body, in both the product page FAQ and the announcement post. **Policy amendments are stamped in place rather than reissued** — the reader sees the original claim and its correction adjacently.
- Availability: `Instagram Teen Accounts are available globally.` Rollout previously staged "in the US, UK, Canada and Australia" then EU then worldwide — a jurisdiction-ordered rollout disclosed as such.

**Third-party endorsement used as a compliance device** `[observed]` — three named-attribution pull quotes (National PTA; an associate professor of applied psychology at Northeastern; Project ROCKIT) are embedded between the settings inventory and the enforcement section. Expert validation placed at the exact point where the reader's scepticism peaks.

**Parental-access boundary, stated as a negative** `[observed]`:

> "No – parents still won't be able to read their teen's messages."

Answer-first with an em-dash, then the bound ("who their teen has been chatting with in the last 7 days, but not the content of those messages"), then the rationale ("designed to strike the balance between helping parents be more involved… while still protecting teens' privacy and autonomy"). **No → bound → rationale.** The best-constructed disclosure in the Instagram harvest.

**Community Guidelines structure** `[observed, in Tagalog]` — the page is built as two tiers, labelled (Tagalog) `Ang Maikli` ("the short") and `Ang Mahaba` ("the long"). The short tier is five imperative one-liners; the long tier is split into a **do list and a don't list** ("Ano ang dapat gawin" / "Ano ang hindi dapat gawin"), followed by an "additional things to remember" block and a closing paragraph advising users who cannot follow the rules to use a different service. The short/long two-tier construction is genuinely reusable for any long policy: ship a five-line version and a full version on the same page, in that order.

The long tier also carries a consequence sentence up front, before the prohibitions — i.e. the penalty is disclosed before the rules it attaches to. And the enforcement wording is unhedged: violations "may result in a disabled account, or termination of your access to Instagram, **without warning**."

## T11 Help-centre architecture

`[absent]` for the tree; `[documented]` for the article grammar.

The `help.instagram.com` index served no server HTML, so the top-level categories, category descriptions and routing furniture could not be captured. What is recoverable is the **article-title grammar**, from `meta-title` values:

| Shape | Example |
|---|---|
| `About <noun phrase>` | `About disabled Instagram accounts` |
| Imperative task | `Make your Instagram account private` · `Remove a first-time strike from your Instagram account` |
| Action-and-undo pair | `Restrict or unrestrict someone on Instagram` |
| Gerund topic | `Confirming your age on Instagram` · `Blocking People` |
| Category noun | `Privacy Settings & Information` |

Notably **no `How do I…?` and no `Why…?` shapes** appeared in anything captured. Instagram's help titles are declarative and task-named; they do not adopt the user's question voice. Compare Reddit (147), whose help IA is heavily question-shaped.

**A separate defect in the help IA:** the same article is titled differently in different places. `help.instagram.com/448523408565555` carries `meta-title: How to make private Instagram accounts` while its search-index title is `Make your Instagram account private` and an older canonical title for the same ID reads `How do I set my photos and videos to private so that only approved followers can see them?`. Three titles, one article, all live in some index.

## T12 FAQs

**Placement:** accordion block near the foot of `about.instagram.com/community/teen-accounts`, under the heading `FREQUENTLY ASKED QUESTIONS` (rendered in caps) with the standfirst "Get answers to all of your questions."

Answers **did** render here (unusually for this harvest) and are summarised, not quoted.

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | How are you ensuring teens don't lie about their age? | Dated update; describes cross-account signals preventing a teen re-registering with an adult birthday |
| 2 | What types of automatic protections are included with Instagram Teen Accounts? | Recaps the six default settings; ends "and more" |
| 3 | Can teens opt out of these protections? | No for 13-15 without parental permission; the `More Content` setting needs permission at any age; supervision overrides age |
| 4 | Do parents have to approve their teens using Instagram now? | No — approval is required only to loosen a setting, not to use the app |
| 5 | Can I change my teens' settings on their behalf? | Approve/deny today; direct parental change "soon" |
| 6 | What if I don't have an Instagram account? | Both parties need accounts for supervision |
| 7 | Where are Instagram Teen Accounts available? | One sentence: globally |
| 8 | How can I find help with Instagram Teen Accounts? | Routes to Help Center |
| 9 | When will Instagram Teen Accounts be available on other Meta apps? | Non-committal: "in the coming months" |
| 10 | Will parents be able to read their teen's messages through this feature? | No, with the 7-day metadata bound and an autonomy rationale |
| 11 | Will teens who are content creators get Instagram Teen Accounts? | Yes, all teens including creators; reframes the restriction as protection against spam/scam DMs and bullying |

**Structural notes.** Eleven questions, ordered: integrity of the mechanism (Q1) → what it does (Q2) → **can it be escaped (Q3)** → four questions on the parent's role (Q4-6, Q10) → availability and roadmap (Q7, Q9) → routing (Q8) → an edge-case audience (Q11).

Two things are unusual. First, the FAQ leads on **scepticism about the product's own efficacy** (Q1: teens lying about age) rather than on how to use it. That is the question the press asked, and Instagram has let the press set the running order. Second, **Q3 is the teen's question in a FAQ otherwise addressed to parents** — the block mixes audiences without signposting which questions are for whom, so a parent reads "Can teens opt out of these protections?" in the second person of a teen. A small but real audience-voice slip.

Q11's answer is the most interesting piece of framing in the file: a restriction on teen creators is re-described as a benefit to teen creators ("built to help address some of the issues we know creators may encounter"). Same setting, inverted valence, no new facts.

## T13 Coined structural terminology

**PRIORITY SECTION.**

| Term | Instagram's usage | The alternative it rejected |
|---|---|---|
| `Reels` | Short-form video product noun; capitalised, used as a mass noun | "short video", "clips" |
| `Stories` | 24-hour ephemeral posts; **always plural, even for one** ("Post moments… in your Stories") | "status", "moments" |
| `DMs` | Initialism used as the primary product noun in nav and headings, not spelled out anywhere on the Features page | "Direct", "Messages", "Inbox" |
| `Search & explore` | Nav label; `Explore` alone is the in-product surface name, used in the teen copy ("in Explore and their recommendations") | "Discover", "Browse" |
| `Instagram Plus` | A named tier in the Features drawer | — |
| `Edits` | A separate app, promoted in Instagram's own nav | — |
| `Teen Accounts` | Capitalised as a product, not a setting — "placed into Teen Accounts" (a container you are *put in*, not a mode you are *in*) | "teen mode", "youth settings" |
| `Hidden Words` | Named comment/DM filter, with strength levels ("the most restrictive version") | "word filter", "blocklist" |
| `Sleep mode` | Lowercase "mode" — a scheduled quiet state, 10 PM-7 AM | "do not disturb", "downtime" |
| `sensitive content control` | Lowercase, described as having settings from most to least restrictive | "content filter" |
| `More Content` | The *name of the loosened* sensitive-content setting requiring parental permission | "Show more", "less restricted" |
| `parental supervision` | The umbrella for the parent-teen link; lowercase | "parental controls" — deliberately avoided, since the feature is approval-based not control-based |
| `Account Status` | The user-facing enforcement-standing surface | "Strikes", "Record", "Standing" |
| `Support Inbox` | Where decisions are delivered and revisited | "Notifications", "Cases" |
| `Violations` | The folder name inside Support Inbox | "Reports", "Issues" |
| `strike` | Countable enforcement unit, 12-month rolling window | "warning", "point" |
| `disabled` | Account-level removal | "banned", "suspended" — and users *say* "blocked", per the page's own keyword metadata |
| `restrict` | A silent partial block | "shadow block", "limit" |
| `Community Guidelines` (Instagram) vs `Community Standards` (Meta) | **Both appear, for the same rulebook.** The appeal article says content is removed for going "against our Community Guidelines"; the strike article says removal was "for not following the Community Standards" | — |

**Two terminology defects worth recording.**

1. **`Community Guidelines` / `Community Standards` are used interchangeably across two help articles about the same enforcement action.** The Instagram-branded guidelines URL now 302s to Meta's `Community Standards`, so the rebrand is half-done: the redirect is in place but the article bodies still say both. A user reading their violation notice cannot tell whether one rulebook or two applies to them.
2. **`More Content` is a double negative in effect.** It is the *name* of the permission a teen must obtain, so the parental-approval dialogue is about granting "More Content" — a phrase that describes volume, not the sensitivity change it actually makes.

**Register split:** marketing says `DMs`, `Search & explore`, `Instagram Plus`; enforcement says `Community Standards`, `Account Status`, `Violations`. The tone gap between the two vocabularies is wide, and there is no transitional register between them.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, used freely in adverse copy: "We know we don't always get it right when we decide to remove a post." "We know teens may lie about their age." The company concedes fallibility in its own voice rather than passively ("mistakes can happen"). Note the **cross-audience second person**: on teen-safety pages "you" is sometimes the parent and sometimes the teen within the same page.

**Register.** Short declaratives; contractions throughout ("won't", "don't", "we'll", "that's"). Zero exclamation marks in enforcement copy. No `Oops`. Marketing copy uses a soft, affinity-led register ("the people who get you", "fun, casual"); enforcement copy is flat and procedural. Teen-safety copy sits in between and is the most cautious — every claim is hedged with "may", "designed to", "try to" ("we'll try to hide more content that may be inappropriate").

**Hedging inventory in teen-safety copy** `[observed]`: "we'll *try to* hide", "content that *may be* inappropriate", "*designed to* better support parents", "*potentially* offensive comments", "*may* result", "*in many cases* we hide this content altogether". The hedges are legally necessary and content-designed consistently — but the cumulative effect is that no safety claim on the page is unqualified. That is defensible as a compliance posture and worth naming as a deliberate one.

**Numbers as trust devices** `[observed]`: `13-17`, `under 16`, `60 minutes`, `10 PM and 7 AM`, `past seven days`, `60 days`, `up to 90 days`, `within the past year`. Every number is a bound on a behaviour, not a scale claim. Instagram does not cite user counts anywhere in the harvested set — a notable absence for a platform of its size, and consistent with the affinity-over-reach repositioning in T2.

**Accessibility content** `[observed]`

- Alt text is descriptive and scene-level, and sometimes describes the *UI being depicted* rather than the photo: `Two UI screens: teen safety settings and a modal for changing settings with a parent.` · `Two UI screens: one screen shows the time management settings screen and the other one shows who they have chats with.` · `Two UI screens: the first screen displays a list of topics, while the second screen shows a feed for the selected topic.` Describing screenshot *content* for a screen-reader user is good practice and is done consistently on the Teen Accounts pages.
- Marketing alt text is casual and person-centred: `guy blocking a photo with his hand` · `girl showing the peace sign` · `girl posing with her hair over her eyes` · `guy with a soccer ball on his head` · `girl with a hoodie on covering an eye` · `a boy and girl having a good time` · `Collection of colorful posts in search & explore`. Consistent, brief, non-redundant. But note the register drop: "guy"/"girl" and "having a good time" are vaguer than the UI descriptions, and "girl posing with her hair over her eyes" describes a pose without conveying why the image is on a privacy page.
- **No `Skip to content` link** was present in the `about.instagram.com` DOM. Discord, Reddit and Pinterest all ship one. Recorded as a gap.
- **No accessibility statement** was reachable on Instagram's own domains. `[absent]`
- Store badges carry correct alt (`Download on the App Store`, `Get it on Google Play`).

**Negative findings, recorded honestly**

- `Log in` on the About site resolves to `#` — dead control.
- `Learn more about safety here` / `…account security here` — "here" as link text, on a page set whose whole purpose is self-service routing.
- `Request a review` / `Request Review` / `Ask for a review` — three labels for one action inside one article.
- `Community Guidelines` / `Community Standards` used interchangeably for the same rulebook across two enforcement articles.
- `help.instagram.com/477434105621119` served **Tagalog** content to an en-US request with no language switcher and no notice. The same URL with `?locale=en_US` redirects away from the article entirely. A user in an enforcement situation may be shown the rules in a language they cannot read.
- Hero headline duplicated in the DOM as two fragments; language selector, social links and footer nav each duplicated twice.
- `Italiano` in the Features-page language selector points to `#` while every other locale has a real path.
- No public English rendering of the Community Guidelines was obtainable at all during this harvest.

---

## Transferable patterns

1. **Pre-disclaim every rung of the escalation ladder.** Instagram pairs each appeal route with its own limitation in the adjacent sentence — "up to 90 days… but your request may be closed before we can review it", "not all decisions are eligible", "they may not choose yours". Transfers directly to PayPal dispute, chargeback and case-escalation copy, where the honest constraint is currently often deferred to a separate page. Condition: only works if the constraint is stated *at* the offer, not after it.
2. **Answer-first, bound, then rationale — in that order — for privacy-boundary questions.** "No – parents still won't be able to read their teen's messages." → what they *can* see (7 days of metadata) → why the line sits there. Reusable for any data-access question where the answer is partly no.
3. **Two-tier policy on one page: five one-liners, then the full text.** The Community Guidelines' short/long construction is the cheapest comprehension win available for any long policy artefact, and it does not require rewriting the long version.
4. **Name the default state, not just the restricted one.** Instagram names `Private Account` and leaves "public" unnamed. The result is that users cannot search for, discuss or reason about the state they are actually in. Anywhere PayPal ships a privacy or visibility toggle, name both poles.
5. **Stamp policy corrections in place and date them.** `Update on March 28, 2025:` mid-body, with the original claim still visible above it. Preserves the audit trail in the user-facing artefact instead of silently editing.
6. **Describe screenshots for screen readers by their UI content.** "Two UI screens: teen safety settings and a modal for changing settings with a parent." A reusable alt-text pattern for any help or marketing page that shows product screens — and one most products get wrong.
7. **Negative pattern to avoid: three labels for one remediation action.** `Ask for a review` / `Request a review` / `Request Review` appear in one article. In a flow reached only by distressed users, label variance across entry points is a comprehension tax, not a stylistic one.

## Caveats & gaps

- **Severely degraded harvest.** `instagram.com`, `help.instagram.com` (index), `about.instagram.com` (home) and `facebook.com/help/instagram/*` all returned empty bodies to a plain unauthenticated fetch. This is a client-rendering property of Meta's surfaces, not a bot-check page, but the effect is the same.
- **Most help-article bodies were not retrievable.** Titles, `meta-title` and `meta-description` values were captured; article prose was not. Every T6 privacy-setting consequence in this file is therefore at description-sentence level, with the sole exception of the appeal article (`280908123309761`), which rendered in full.
- **`mute` is absent, not disproven.** Instagram is widely understood to have a mute feature; no page naming it was reachable. It has deliberately not been described, per the no-invention rule.
- **The English Community Guidelines were never obtained.** The only rendering was Tagalog, and the locale-forced URL redirects to a Meta Transparency Centre page that itself rendered empty. All Community Guidelines observations in T10 are therefore structural (from the Tagalog rendering) rather than verbatim-English.
- **Help-centre IA (T11 tree) is entirely absent**, as is the search/no-results surface (T8) and any live form (T5).
- **`transparency.meta.com` is effectively unharvested** — three pages attempted, metadata only. Meta's full enforcement taxonomy (restricting, reducing, removing) is documented there and would materially strengthen T6 and T9 on a browser-rendered pass.
- Article titles sourced via the search index (rather than a fetched `meta-title`) are marked in T4/T11 as such; where a title appears only in a search listing it has not been quoted as a UI string.
- Instagram Live, Shopping, Notes, Broadcast Channels and Close Friends are unharvested. `Close Friends` appeared only inside an unrelated blog-post title (`Close Friends Only: J Balvin & Ryan Castro Talk New Album`), which is a marketing campaign name, not the privacy-audience feature — so the `Close Friends` audience setting named in the brief is **not evidenced** in this harvest and has not been described.
- Mobile app strings, push-notification copy and email copy are out of the public web surface.

## Sources

1. https://www.instagram.com/ (empty body)
2. https://about.instagram.com/ (metadata only)
3. https://about.instagram.com/features
4. https://about.instagram.com/safety/privacy
5. https://about.instagram.com/safety/account-safety
6. https://about.instagram.com/community/teen-accounts
7. https://about.instagram.com/blog/announcements/instagram-teen-accounts
8. https://help.instagram.com/ (empty body)
9. https://help.instagram.com/477434105621119 (served in Tagalog)
10. https://help.instagram.com/477434105621119?locale=en_US (redirects to transparency.meta.com/policies/community-standards, empty body)
11. https://help.instagram.com/280908123309761
12. https://help.instagram.com/448523408565555 (metadata only)
13. https://help.instagram.com/366993040048856 (metadata only)
14. https://help.instagram.com/2638385956221960 (metadata only)
15. https://help.instagram.com/426700567389543 (metadata only)
16. https://help.instagram.com/573546665408885 (metadata only)
17. https://help.instagram.com/196883487377501 (metadata only)
18. https://help.instagram.com/995996839195964 (empty body)
19. https://transparency.meta.com/en-gb/enforcement/taking-action/restricting-accounts (metadata only)
20. https://www.facebook.com/help/instagram/477434105621119 (empty body)
