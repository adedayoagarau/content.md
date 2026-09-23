# 148. Pinterest

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Visual discovery and saving / intent-driven inspiration engine with native commerce |
| Primary URL | https://www.pinterest.com/ |
| Corpus rank | 148 |
| Benchmark strength (source list) | Intent-driven discovery labels |
| Locale / market observed | en-US (`/en`); help centre and policy site offer ~52 locales |
| Platform observed | Web — help centre (Drupal 10) and policy site; product surface unreachable |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | EU/UK under-18 ads opt-out stated explicitly; **Brazil Digital Child and Adolescent Act** named as changing report anonymity; NCMEC reporting; US sanctions/OFAC availability carve-outs; DAA self-regulatory opt-out; biannual transparency report |
| Harvest date | 2026-09-22 |
| Pages inspected | 14 URLs (9 returning usable content) |
| Harvest completeness | **Partial.** `pinterest.com` returns an empty body. The help centre serves article bodies reliably but its `/guide/` hub pages are inconsistent — one rendered fully, four returned empty. The policy site (`policy.pinterest.com`) rendered in full and is the strongest source in the file. Help-centre category tree not captured. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Pinterest home | https://www.pinterest.com/ | **Empty body** — client-rendered |
| Help centre home | https://help.pinterest.com/en | Rendered — nine task cards, each title + gloss + CTA |
| All about Pinterest (guide) | https://help.pinterest.com/en/guide/all-about-pinterest | Rendered — the canonical definitional article; source of most T13 vocabulary |
| Make your profile private or public | https://help.pinterest.com/en/article/make-your-profile-private | Rendered — privacy-state copy, teen and business carve-outs |
| Account deactivation | https://help.pinterest.com/en/article/account-suspension | Rendered — **URL says `suspension`, title says `deactivation`**; enforcement notice and appeal copy |
| Teen safety options | https://help.pinterest.com/en/article/teen-safety-options | Rendered — age-banded default matrix, written to the teen |
| Personalized ads on Pinterest | https://help.pinterest.com/en/article/personalized-ads-on-pinterest | Rendered — ad-disclosure and opt-out copy; `noindex` |
| Community guidelines | https://policy.pinterest.com/en/community-guidelines | Rendered in full — 13 harm categories, forward-dated revision notice |
| Enforcement | https://policy.pinterest.com/en/enforcement | Rendered in full — **the key document**: three enforcement regimes, action vocabulary, appeal copy |
| All about your privacy (guide) | https://help.pinterest.com/en/guide/all-about-your-privacy | **Empty body** |
| All about saving Pins (guide) | https://help.pinterest.com/en/guide/all-about-saving-pins | **Empty body** |
| All about shopping on Pinterest (guide) | https://help.pinterest.com/en/guide/all-about-shopping-on-pinterest | **Empty body** |
| All about your profile (guide) | https://help.pinterest.com/en/guide/all-about-your-profile | **Empty body** |
| Accessibility on Pinterest | https://help.pinterest.com/en/article/accessibility-on-pinterest | **Empty body** — URL guessed; existence unconfirmed |

---

## T1 Navigation & IA labels

**Policy-site nav — six groups, organised by document type, not by topic** `[observed]`

| Group | Children (verbatim) |
|---|---|
| `Terms` | `Terms of Service` |
| `Privacy` | `Privacy Policy` · `Non-User Notice` · `Sales` |
| `Guidelines` | `Community Guidelines` · `Merchant Guidelines` · `Advertising Guidelines` · `Developer Guidelines` · `Commercial and Branded Content Guidelines` · `GenAI Acceptable Use Guidelines` |
| `Intellectual Property` | `Copyright` · `Trademark` |
| `Enforcement` | `Enforcement` |
| `Transparency` | `Transparency` |

Two observations. **`Enforcement` is a top-level nav group with a single child of the same name** — Pinterest has given "what happens when you break the rules" the same navigational weight as "the rules". Very few platforms surface enforcement as a peer of policy; most bury it inside the guidelines document. The same is true of `Transparency`.

Second, the `Guidelines` group is segmented **by the reader's role** — Community (everyone), Merchant, Advertising, Developer, Commercial and Branded Content (creators doing paid work), GenAI Acceptable Use. Six audiences, six rulebooks, one nav group. `Non-User Notice` under Privacy is the notable outlier: a privacy document addressed to **people who are not customers**, which is a GDPR-shaped artefact given a plain-English label.

**Help-centre home is a nine-card task board, not a category tree** `[observed]`

Each card is `<Title>` + a one-to-two-sentence gloss + a CTA whose label differs from the title:

| Card title | Gloss (verbatim, abridged) | CTA (verbatim) |
|---|---|---|
| `AI at Pinterest` | "Learn about AI at Pinterest and how Gen AI labels help you spot images and ideas that were created or modified using artificial intelligence." | `Explore AI` |
| `Can't log into Pinterest` | "See common reasons people have trouble logging in and follow the steps to get back into your Pinterest account." | `Read troubleshooting tips` |
| `Use visual search features` | "Find inspiration faster with Pinterest's visual search features. Tap on any part of a Pin to explore similar ideas, products, and styles — no words needed." | `Try visual search` |
| `Make your profile private` | "Take control of who can see your profile, boards, and Pins by switching your profile to private." | `Review profile visibility` |
| `Shopping on Pinterest` | "Get your products in front of people on Pinterest who are already looking for ideas and things to buy." | `Explore shopping` |
| `Understand how billing works` | "Learn how billing works, when you're charged, and how to troubleshoot common payment issues." | `Review billing` |
| `Claim your website` | "Claim your website to get access to analytics and let people know where they can find more of your content." | `Claim your website` |
| `Review Pinterest Analytics` | "Learn what content, both paid and organic, resonates most with people on Pinterest." | `Review Pinterest Analytics` |

Then `Still need help? Contact us`.

**Pattern: verb-led CTAs with a four-verb vocabulary** — `Explore` / `Review` / `Try` / `Read` / `Claim`. Each verb signals the *nature* of the destination: `Explore` for open-ended browsing, `Review` for checking your own settings or records, `Try` for a feature to use now, `Read` for troubleshooting prose. That is a small, disciplined CTA verb set doing real expectation-setting work — a user knows from the verb whether they are about to learn something or change something.

**Defect:** the nine cards **mix audiences without signposting.** `Make your profile private` (consumer privacy) sits two cards from `Shopping on Pinterest` whose gloss is written entirely to a *merchant* ("Get your products in front of people"), and beside `Claim your website` and `Review Pinterest Analytics` (both creator/business tasks). A consumer scanning the help hub reads three business-audience cards in the middle of their own set. Compare Reddit (147), which splits by audience at the root.

Second defect: `Claim your website` and `Review Pinterest Analytics` have **CTAs identical to their titles**, so the card reads its own name twice.

**Policy-site footer** `[observed]`: `Company` (`About Pinterest` · `Newsroom` · `Careers` · `Investors`) and `More from Pinterest` (`Help Center` · `Businesses` · `Creators` · `Developers`) — the second group is an audience list. Legal strip: `Terms of Service` · `Copyright` & `Trademark` · `Privacy Policy` · `Non-user notice` · `Cookies policy` · `Personalized ads`. Note the casing drift: `Non-User Notice` in the nav, `Non-user notice` in the footer.

**Help-centre category tree** `[absent]` — no category listing was served; the `/guide/` hub pages that would carry it mostly returned empty bodies.

## T2 Value proposition & headline patterns

`[absent]` for the marketing hero — `pinterest.com` returned nothing.

The **definitional value proposition** is carried by the help centre instead, and it is unusually crisp `[observed]`:

> **`What is Pinterest?`**
> "Pinterest is a **visual discovery engine** for finding ideas like recipes, home and style inspiration, and more."

One sentence, one coined category noun (`visual discovery engine`), three concrete examples. Pinterest does not describe itself as a social network, a feed, or a platform. It describes itself as a **search tool for things you cannot name** — which is the whole intent thesis compressed into three words.

The second paragraph adds the mechanic and the scale claim in one breath: "With **billions of Pins** on Pinterest, you'll always find ideas to spark inspiration. When you discover Pins you love, **save** them to **boards** to keep your ideas organized and easy to find."

**Discover → save → organise.** That three-verb arc is the product, and it recurs as the section-header spine of the whole article (see T4).

**Mission statement, quoted twice** `[observed]`: "Pinterest's mission is to bring everyone the inspiration to create a life they love." It opens the Community Guidelines *and* the Enforcement page, and in both cases it is immediately followed by a pivot to constraint:

> "That being said, **not all content is inspiring** - so we have community guidelines to outline what we do and don't allow on Pinterest."

> "…and it's our **guiding light** in drafting and enforcing our policies."

The Community Guidelines version is the better sentence: the mission is stated, then undercut in the same sentence with a dry aside ("not all content is inspiring"), then converted into the reason a rulebook exists. **Mission → wry limitation → justification for the rules.** It is the tonal opposite of the usual "we believe in a safe community" preamble, and it earns the policy that follows.

**Harm-category header pattern — `Pinterest isn't a place for X`** `[observed]`

The Community Guidelines' most distinctive construction, used at least eight times:

- "Pinterest **isn't a place for** antagonistic, explicit, false or misleading, harmful, hateful, or violent content or behavior."
- "Pinterest **isn't a place for** sexual content or visible intimate body parts."
- "Pinterest **isn't a place to** attack or antagonize individuals or groups of people."
- "Pinterest **isn't a place for** hateful content or the people and groups that promote hateful activities."
- "Pinterest **isn't a place for** content that displays, rationalizes or encourages self-harm…"
- "Pinterest **isn't a place for** graphic violence or threatening language."
- "Pinterest **isn't a place for** violent content, groups or individuals."
- "Pinterest **isn't a place for** misinformation, disinformation, mal-information or the individuals or groups spreading or creating it."
- "Pinterest **isn't a place for** offering, manufacturing, or promoting substances, products, activities, or exploitative practices that risk harm…"

Every harm section opens with the same seven-word frame, then names the harm, then states the action ("We remove or limit the distribution of…"). **A spatial metaphor — "a place" — rather than a rules metaphor.** The prohibition is framed as *this isn't where that belongs*, which is softer than "you must not" and consistent with Pinterest's self-conception as a curated room rather than a public square. It also scales: a writer adding a fourteenth harm category has the sentence already.

The child-safety section is the deliberate exception and breaks the frame: "Pinterest **does not tolerate** child sexual exploitation of any kind. That means we enforce a strict, **zero-tolerance policy**…" Register hardens exactly where it should.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Explore AI` · `Explore shopping` | Help hub cards | `Explore` = open-ended |
| `Review profile visibility` · `Review billing` · `Review Pinterest Analytics` | Help hub cards | `Review` = inspect your own settings/records |
| `Try visual search` | Help hub card | `Try` = use the feature now |
| `Read troubleshooting tips` | Help hub card, login failure | `Read` = prose remedy |
| `Claim your website` | Help hub card | CTA = title, verbatim duplicate |
| `Still need help? Contact us` | Foot of help hub and every article | Question-then-offer; the question does the qualifying |
| `Save` | In-Pin control | `[documented]` — "click the **red** `Save` button". Colour is named in the instruction |
| `Report` | Content overflow menu | `[documented]` |
| `Block` | Profile overflow menu | `[documented]` |
| `Edit Pin comment settings` | Pin overflow menu | `[documented]` — long, fully specific |
| `Settings` → `Profile visibility` → `Private profile` | Settings path | `[documented]` |
| `Privacy and data` → `Use of partner info` | Ads opt-out path | `[documented]` |
| `Save` (settings confirm) | Ads opt-out, web only | `[documented]` — **the same word as the core product verb**, used as a form-submit label. See T13 |
| `Allow` / `Ask App Not to Track` | iOS ATT prompt | `[documented]` — Apple's strings, quoted and then interpreted in Pinterest's own words |
| `Find a resource` | Teen safety article, crisis-resource finder | Third-party (ThroughLine) widget, disclosed as such |
| `report it to us` / `please report it to us` | Inline, repeatedly, throughout guidelines | Verb-phrase inline links rather than buttons |
| `preview the updated Community Guidelines here` | Forward-dated revision notice | **"here" as link text** — non-descriptive, and on the single most important link on the page |
| `Was this article helpful?` | Article foot | Followed by `How can we make this article better?` |
| `Skip to footer` | Policy site, first in DOM | Unusual — see T14 |

**Observation:** Pinterest's CTA discipline is high on the help hub (the four-verb set) and low in the policy prose, where the recurring inline link text is "here" and "report it to us". The `preview the updated Community Guidelines here` instance is the worst of them: a forward-dated policy change, which is genuinely useful, hung off a three-letter pronoun.

## T4 Onboarding & getting-started

**The `All about Pinterest` guide is the onboarding narrative, and its section headers are the product's verb arc** `[observed]`

1. `What is Pinterest?`
2. `Browse your home feed`
3. `Discover ideas`
4. `Save, share and shop Pins`
5. `Create Pins`
6. `Create boards`
7. `View your profile`

Seven sections, **six of them imperative verb phrases**, and the ordering is deliberate: *consume before you contribute.* A new user is taught to browse (2), then search (3), then save (4), and only at step 5 to create. Most social products invert this and push creation early. Pinterest's IA encodes the fact that the majority of its users never post.

`Save, share and shop Pins` is the pivotal header — **three verbs in one section title, with commerce as the third**. Shopping is not a separate onboarding topic; it is taught as the natural third thing you do to a Pin you like, inside the same section as saving and sharing. That is a significant content decision: monetisation is normalised as a save-adjacent gesture rather than introduced as a mode.

**Definitional sentences carry the teaching load** `[observed]`

- "**Pins are bookmarks** that people use to save content they love on Pinterest. Pins can be images, videos or products."
- "The Pins you save **live on your boards.**"
- "Your **home feed** is where you'll find Pins, people and businesses we think you'll love, based on your recent activity."
- "To organize your Pins within boards, create **board sections**."

Each coined noun is defined by analogy to something already understood — a Pin is a *bookmark*, a board is where Pins *live*. And the home-feed definition is unusually candid about its own mechanism: "**we think you'll love, based on your recent activity**" plus "We'll also show you Pins from the people and boards you choose to follow." Algorithmic and followed content are distinguished in the definition itself, which is a recommender-transparency choice most feeds avoid.

**Worked examples, not abstractions** `[observed]` — the guide teaches search with a literal query: "Try typing '**birthday party**' in the search bar to see ideas for birthday party decor, party food recipes, and birthday gift ideas." The same example then recurs through the article as a spine — a "Birthday party" board with `"Decorations"` and `"Party games"` sections, a private board for a surprise party, and a cake-recipe comment. **One example threaded through seven sections.** That is a real technique: the reader carries a single mental model forward instead of re-orienting at each concept.

The private-board teaching is the best instance: "If you prefer to keep your Pins private **or you're throwing a surprise birthday party**, you can make your board private." The privacy feature is motivated by a *delightful* use case rather than a defensive one. Contrast Instagram, whose privacy copy is exclusively protective.

**Signup gate, stated inline** `[observed]`: "You have to meet **minimum age requirements** to sign up, and we have certain protections in place for teens." Placed at the end of the `What is Pinterest?` section — the age gate is part of the definition of the product, not a footnote.

**Step formatting** `[observed]` — every procedure is a bulleted (not numbered) list of imperatives, with the platform variant repeated as a separate list. The profile-visibility article carries three near-identical lists (web, then two mobile variants). Note the iconography is written into the copy: "Click the **more-options-refresh icon**", "tap the **ellipsis icon**", "click the **chevron-down icon**", "the **speech-ellipsis icon**", "the **dialog-ellipsis icon**". Pinterest names its icons with hyphenated compound descriptors in user-facing instructions — a design-system token leaking into help copy, and awkward to read ("speech-ellipsis icon"), but at least consistent and searchable.

## T5 Form & field labels

`[documented]` — no live form reached.

**Settings paths quoted in help copy** `[documented]`

| Path | Terminal control |
|---|---|
| `Settings` → `Profile visibility` | toggle `Private profile` |
| `Settings` → `Privacy and data` | checkbox / toggle `Use of partner info`, then `Save` (web only) |
| Pin overflow → `Edit Pin comment settings` | per-Pin comment control |
| Profile overflow → `Block` | |
| Content overflow → `Report` | then "Select the most accurate reason, then follow the prompts to provide details" |

**Platform divergence baked into the label copy** `[observed]` — for `Use of partner info`: web says "**Uncheck the box** next to Use of partner info" then "Click **Save**"; mobile says "**Toggle the switch** next to Use of partner info" and "Your changes **will save automatically**." Same setting, checkbox-plus-explicit-save on web, toggle-with-autosave on mobile. The help article has to teach both, and does, including the differing save semantics. Recorded as a design inconsistency that the content team is absorbing.

**`Profile visibility` is a well-named setting** `[observed]` — it names the *property* being controlled rather than the state, so both poles can be spoken about: the article is titled `Make your profile private or public` and the setting is `Profile visibility` with a `Private profile` toggle. Compare Instagram (146), which names only `Private Account` and leaves "public" unnamed. Pinterest's construction is the better one.

**Optionality stated as a privacy tip** `[observed]`: "Adding a last name to your profile is **optional**. You can use a nickname or leave off your last name to help keep your identity private." A field's optionality is reframed as a privacy affordance rather than a form convenience. Directly reusable.

Live placeholders, hint text and validation messages: `[absent]`.

## T6 Account, content and distribution states

**PRIORITY SECTION.** Pinterest's state model is distinctive because its primary enforcement action is **not removal** — it is a *distribution* state. That gives it three planes: content existence, content distribution, and account status.

**1. The two core enforcement actions, defined verbatim** `[observed]`

> - **Deactivation**: "When we deactivate content - such as Pins, boards, comments or user accounts - that content is no longer available to anyone on the platform. **Deactivation can also be referred to as 'removal;'**"
> - **Limiting distribution**: "When we limit the distribution of a Pin, board or account, it will continue to be accessible on Pinterest **to the user who posted it and to users with a direct link**, but it won't be featured in recommendation or discovery surfaces, such as search results or the home feed."

`Limiting distribution` is the most carefully specified state in this batch. Three facts in one sentence: it still exists, the owner can still see it, link-holders can still reach it, and it is absent from search and feed. **This is the state most platforms refuse to name** (it is what users call shadowbanning) and Pinterest defines it in plain language, with its exact visibility boundary, in a public policy document. That alone makes this the file's headline finding.

A second consequence is disclosed separately: "boards whose distribution has been limited **will not be visible when viewing someone else's profile.**" So the state has a profile-level effect as well as a discovery-level one.

**Cascade rules are stated explicitly** `[observed]` — the state propagates downward and Pinterest says so:

> "If we limit or remove a board or account, **that action applies to all of the Pins contained on the board or account.** For example, if we limit the distribution of a board, all of the Pins on that board will also be limited in distribution… If we deactivate an entire account, all of the content (Pins and boards) on that account also are deactivated."

Publishing the cascade is genuinely useful: it answers "why did my other Pins stop working" before the user asks it.

**2. A pre-deactivation intermediate state** `[observed]`

> "In certain circumstances, **before an account is deactivated, we may place additional restrictions on its use of Pinterest, such as limiting the account's ability to post or save content.**"

An unnamed but described holding state — capability restriction short of deactivation. Pinterest describes it without giving it a label, which is the one place its state vocabulary is weaker than Discord's (`Limited` / `Very Limited` / `At Risk`).

**3. Quality- and safety-driven states that are *not* enforcement** `[observed]`

This is an important distinction Pinterest draws explicitly:

> "Content that our systems predict may not meet those criteria **may be shown less often or less prominently, even if we haven't determined that the content necessarily goes against our Community Guidelines.**"

So there are *two* reasons distribution drops — policy violation, and predicted low quality — and Pinterest separates them rather than collapsing both into "enforcement". Plus two named feature-level states:

- **Sensitivity screen** — "we may apply a sensitivity screen in situations where our systems indicate that content might not be appropriate for all audiences." An interstitial state, not a removal.
- **Feature limitation** — "we may also limit certain features on Pins, such as **turning off comments or not showing related content**, when we think they may be unsafe or when appropriate to protect minors."

**4. Account states** `[observed / documented]`

| State | Label(s) used | Notes |
|---|---|---|
| Deactivated | `Account deactivation` (title) / `account-suspension` (URL) / "also known as deactivations or suspensions" | **Three names for one state, and Pinterest admits it.** See below |
| Private profile | `Private profile` (toggle), `private` (prose) | "Private profiles won't appear in search results on Pinterest or in search engines, but you can invite people you know to follow you." |
| Public profile | `public` | Both poles named — unlike Instagram |
| Teen-defaulted private | — | 13-15 private and **cannot be made public**; 16-17 private by default and may switch |
| Business | — | "Business profiles: Always public"; must convert to personal to go private |
| Blocked (by another user) | `Block` | Consequence: "stop them from following you, messaging you, or interacting with your Pins" |

**The three-names defect, stated by Pinterest itself** `[observed]`:

> "You can read more about **account removals (also known as deactivations or suspensions)**, here."

One clause, three synonyms, in a document whose purpose is to define the vocabulary. And the article it links to lives at `/article/account-suspension` while being titled `Account deactivation`. So the user encounters `removal` in the enforcement policy, `suspension` in the URL and in their own search query, and `deactivation` as the page title and in-product notice. Pinterest has chosen to *absorb* the ambiguity (naming all three) rather than resolve it — the opposite of Discord, which renamed `ban` to `permanent suspension` and then told users the old word in parentheses. Recorded as the clearest terminology defect in the batch.

**5. Advertising and merchant states** `[observed]` — a separate vocabulary for a separate regime:

- `Rejection` — "the advertisement… will not be shown to Pinners. We may reject an ad before ever showing it to anyone, **or after the campaign has already begun to run**."
- `Limited approval` — "an ad may run, but with restrictions - for example, it may only be shown to people in certain regions or to people over a certain age."
- `Advertiser removal` — "they no longer have access to Pinterest's advertising tools. **This doesn't affect their ability to use other Pinterest products, though.**"
- `Merchant rejection` — "they are denied access to Pinterest's merchant products."

`Limited approval` is an excellent state name: it is neither approved nor rejected, and the label says so in two words. And the advertiser-removal sentence explicitly **firewalls the commercial account from the personal one** — a scope bound users would otherwise assume the worst about.

**Live states** `[absent]` — Pinterest has no live medium.

## T7 Error, failure & recovery

`[observed / documented]`, moderate.

**Login failure is promoted to the help hub's second card** `[observed]`

> `Can't log into Pinterest` — "See common reasons people have trouble logging in and follow the steps to get back into your Pinterest account." → `Read troubleshooting tips`

Contracted, first-person-implied title (`Can't log into Pinterest`), and the gloss frames the content as *reasons* plus *steps* — diagnosis then remedy. The outcome is stated in the user's terms ("get back into your Pinterest account") rather than the system's ("restore access").

**The deactivation article routes the false positive** `[observed]` — its closing paragraph handles the user who is in the wrong article:

> "If your account **wasn't deactivated** and you're still having trouble logging in to Pinterest, read our tips for **common login issues**."

A "you may be in the wrong place" exit at the foot of an enforcement article. Cheap, and it prevents the worst support outcome (a user concluding they have been banned when they have forgotten a password).

**Failure copy for the report/appeal channel itself** `[observed]` — see T9; Pinterest discloses that it may throttle reports and appeals from abusive submitters.

**Wrong-birthday recovery** `[observed]`: "Added the wrong birthday to your account? Please contact us. We can help you verify your age and get your account set up correctly." Question-as-title, then an offer. Note this is one of the few places Pinterest routes to a human, and it does so for an **irreversible-looking** field.

Error titles, validation messages and network-failure copy: `[absent]`.

## T8 Empty states

`[absent]` — no in-product empty state was reachable and the help search surface did not render.

One **template defect** observed repeatedly, which is arguably an empty-state failure: every help article renders the literal string

> `End of Other articles Links`

at both the top and the bottom of the body, and

> `## collection_fields`

immediately after `How can we make this article better?`. These are unrendered template tokens leaking into the page. `End of Other articles Links` appears where a related-articles module presumably has no items — i.e. **an empty related-content region is announcing itself with its own closing marker.** Every Pinterest help article fetched in this harvest carried both strings. For a screen-reader user, each article opens with "End of Other articles Links."

Also observed on every article: `You must have JavaScript enabled to use this form.` — a genuine no-JS fallback for the feedback widget, correctly written, sitting adjacent to the broken template tokens.

## T9 Enforcement notification and appeal copy

**PRIORITY SECTION.** Pinterest's Enforcement page is the most *structurally* complete enforcement document in this batch — it separates procedures, systems and additional measures — though its notification copy is thinner than Discord's.

**Enforcement notice** `[observed]` — the only description of the notification itself:

> "If your account was deactivated, **you'll see a deactivation notice when you try to log in.**"

The notice is delivered *at the login attempt*, not by message. Terse, and the only in-product enforcement string described. Pinterest also references "the **one-click appeal link** in an enforcement notice **email** that we sent you", so there is a second channel with an embedded remedy.

**`one-click appeal` is the standout affordance** `[observed]`. The full appeal-channel inventory:

> "Appeals can be submitted **in-product, via the Help Center or by clicking the one-click appeal link in an enforcement notice email that we sent you.**"

Three entry points, one of them a single click from the adverse email. Naming it "one-click" in the policy document is a commitment to friction level, not just to the existence of a route.

**What an appeal *is*, defined in the user's own frame** `[observed]`

> "**Appeals are how you can tell us if you think we made an enforcement error.**"

Second person, plain, and — crucially — it defines the appeal as the user's channel for asserting *Pinterest's* mistake. Compare the sibling definition immediately above it: "**Reports are how you can tell us if you think something on Pinterest is in violation of our policies.**" Two parallel one-sentence definitions with the same `X are how you can tell us if you think…` frame, one pointed outward and one pointed at Pinterest. That symmetry is the best-designed pair of sentences on the page.

**Appeal outcomes, including a discretionary one** `[observed]`

> "We review appeal requests and update our enforcement decision if we determine that we made a mistake, **or in some cases to give people another chance to abide by our rules.**"

Pinterest publishes a **grace outcome** — reversal not because the decision was wrong but because the user is being given another chance. Very few platforms admit to mercy in policy text, and naming it prevents the "why did they reinstate that person" objection being read as inconsistency.

**Automation in the appeal loop, disclosed** `[observed]`

> "We may also use automation to handle appeals more efficiently, for example by **expanding a decision made on one Pin to other similar Pins.**"

So a *successful* appeal can propagate. The mechanism is the same one used for enforcement (see hybrid actions below), applied in the user's favour.

**Appeal availability is bounded, twice** `[observed]`: "Appeals availability **may vary for some product features or in some localities**; in addition, some Pinners may have **additional appeal options or mechanisms under their local law.**" Both directions — fewer rights in some places, more in others — stated in one sentence.

**Abuse of the remedy channel, disclosed in detail** `[observed]`

> "**Addressing misuse**: We may take actions to restrict or prevent the processing of reports or appeals from people who abuse our reporting or appeals channels by repeatedly submitting clearly unfounded reports or appeals. For example, we may take such actions where the same user submits high volumes of reports or appeals in a short period, the vast majority of which are not actionable… **To prevent abuse, we may limit the number of reports or appeals that one person can submit for a period of one year. We may also limit the number of times that a particular decision can be appealed.**"

A named sub-heading (`Addressing misuse`), a worked example of the triggering behaviour, and two concrete limits including a **one-year** window. Reddit publishes the same class of disclosure in one sentence; Pinterest publishes it as a titled procedure with examples. Between them this looks like an emerging DSA-era convention.

**The three moderation systems, each defined** `[observed]`

- `Automated actions` — "our machine learning models assign scores to content added to our platform. Our automated tools can then use those scores to perform appropriate enforcement actions."
- `Manual actions` — human review of internally-identified and user-reported Pins.
- `Hybrid actions` — "a team member determines that a Pin violates policy, and **automated systems help expand that decision to enforce against machine-identified matching Pins.** Depending on the prevalence of matching Pins, a hybrid action may result in a number of Pins actioned **or none at all.**"

`Hybrid actions` is a genuinely novel piece of public moderation vocabulary, and the closing clause ("or none at all") is a nice honesty beat — the same human decision can have wildly different blast radius, and Pinterest says so.

**Why removal vs limitation** `[observed]`

> "We determine whether content should be removed or limited in distribution based on **how much risk of harm it poses, particularly the severity of its impact and the vulnerability of its target.**"

Two named factors: severity, and target vulnerability. And an exception is worked: "we may allow content that would typically be deactivated… to instead remain on Pinterest, but we limit its distribution so that people don't come across it accidentally. For example, we may limit distribution of content where the context is acceptable (**such as condemnation or education**)."

**Local-law restriction as a distinct action** `[observed]`: "We may restrict access to such content **within the relevant country** if it violates local law but does not violate our policies. In limited circumstances, **due to the functionality of our tools, we may deactivate content in cases of local law violations.**" That second sentence is an unusually candid admission — the tooling cannot always geofence, so a local-law complaint can result in a global removal, and Pinterest attributes that to its own tooling rather than to policy.

**Enforcement targets beyond content** `[observed]` — `Links` and `Text` as additional moderation surfaces: Pinterest "may block the creation of a Pin that links to an inappropriate website" and may "decline to show search results or ads in response to queries that contain policy-violating or sensitive text." **Query-level moderation** is named. For an intent-driven search product, moderating the *query* rather than the results is the structurally significant move, and it belongs in T6 as a state too — some searches simply return nothing.

**Escalation ladder, assembled** `[documented]`: notice at login (or email) → one-click appeal / in-product / Help Centre → review (possibly automated, possibly propagated) → reinstatement, upheld decision, or grace → per-decision and per-year appeal caps → local-law additional mechanisms. Pinterest publishes no time commitment anywhere — "we'll take a look at it and get back to you" is as specific as it gets. Compare Instagram's published 90 days and Reddit's six-month window. **Recorded as a gap in Pinterest's appeal copy.**

## T10 Disclosures, legal & compliance

**Forward-dated policy revision with a preview — the best compliance-UX pattern in this file** `[observed]`

Rendered in italics at the top of both policy pages:

> *"We're updating our Community Guidelines, effective **November 12, 2026**. You can preview the updated Community Guidelines here."*

> *"We're updating our Enforcement page, effective November 12, 2026. You can preview the updated Enforcement page here."*

The current policy remains primary, the future policy is linked as a preview, and the switchover date is stated. Users are given advance notice *and* the ability to read the new rules before they bind. That is a straightforwardly reusable pattern for any T&C, fee-schedule or policy change — and materially better than the common "we've updated our terms" banner that points only at the new version. Plus a `Last updated:` stamp at the foot of each document (`May 2026` for the guidelines, `April 2025` for enforcement), so the reader can see the enforcement page is a year staler than the rules it enforces.

The only weakness is the link text: `here`.

**Age bands and defaults, as a table** `[observed]`

| Type of account | 13-15 year olds | 16-17 year olds |
|---|---|---|
| `Personal` | `Private` | `Private by default;` `Can choose to make their profile public` |
| `Business` | `You must be at least 16 to create a business account` | `Public` |

A 2x2 that resolves four states in one glance, including a cell that is a *prohibition sentence* rather than a state. Better than prose for exactly this kind of age-banded default. Restated in the Community Guidelines as: "Accounts for users under 16 are set to private, and we offer stricter privacy and safety settings for teens."

**Progressive-relaxation copy** `[observed]`: "If you're under 16, you can exchange messages with mutual followers. **As you get older, your settings will adjust to allow you to contact more people.** While our default settings are designed to allow safe connections with people you know, **you can always change your settings to make them more strict.**"

Three moves: the current restriction, the automatic future loosening, and the standing right to re-tighten. The last clause is the one most platforms omit — Pinterest tells a teen they can always go *stricter* than the default, which reframes the settings as the teen's tool rather than the platform's constraint.

Other age-banded defaults `[observed]`:
- "If you're under 18, **comments will be automatically turned off on Pins you create until you turn 18.** You can adjust this in your comment settings at any time." (A default with a stated expiry *and* an override.)
- "If you're under 18 in the **EU or UK**, note that you're **automatically opted out of all ads personalization settings. You'll be opted in when you turn 18**, but you can adjust this in your settings at any time." Jurisdiction-specific, and it discloses the **automatic opt-in at 18** — the adverse future change is stated at the same time as the present protection. Unusually forthcoming.
- "You can only be added to a group chat by people you follow and who follow you back."

**Report anonymity, with a jurisdictional exception** `[observed]`

> "In most cases, you can submit a report **without sharing your identity**. However, **in Brazil, if you submit a report under the Digital Child and Adolescent Act, it cannot be anonymous.**"

> "We'll remove or limit the distribution of content that contributes to an unsafe environment, and **people won't know if you've reported them.**"

The anonymity promise, the single named exception, and the reassurance sentence a frightened reporter actually needs ("people won't know if you've reported them"), all in one section headed `Send an anonymous report`. Excellent.

**Ad-personalisation disclosure** `[observed]` — the `Personalized ads on Pinterest` article leads with two concrete worked examples rather than a definition:

> "A company advertising on Pinterest might **share a list of customer email addresses** with us. And if their customers are on Pinterest, we can show them more relevant ads."
> "…this way you might get an ad for **a pair of shoes you checked out, but didn't buy.**"

Naming the actual mechanism (email-list matching, the Pinterest tag, app SDK signals) and then the recognisable symptom (retargeted shoes). Users know the symptom and not the cause; leading with the cause and closing with the symptom is the right order.

Bounds and residuals disclosed honestly:
- "Please note that this setting **does not apply to information about purchases you initiate on Pinterest.**"
- "each control only applies to data from the browser or device you implement it on"
- "if you clear your cookies, you'll have to opt out again"
- "If you want to opt out of **all** Pinterest ad personalization using your off-Pinterest activity, use your Pinterest account settings as described above" — i.e. Pinterest explicitly tells you the device-level controls are insufficient and directs you to the account-level one. Advising *against* the weaker control is a rare and trust-building move.
- For iOS ATT: "If you select '**Ask App Not to Track**', your ads will be less personalized. **Advertisers may still send us this activity information.** We will only use this information for advertising after we've removed or combined it with other information so it's no longer connected to you." The residual data flow is admitted rather than implied.

Note the disclosure article is served `noindex, nofollow` — the ad-transparency page is deliberately kept out of search.

**Availability carve-outs** `[observed]`: "You can't use Pinterest if it would be prohibited by **US sanctions**. **Personal accounts and business accounts are currently not available in North Korea. Business accounts are currently not available in Crimea, Cuba, Donetsk People's Republic, Iran, Luhansk People's Republic, North Korea or Syria.**" Two tiers of restriction, enumerated by territory, in a Community Guidelines document — placed under `Site security and access` rather than in the terms.

**AI disclosure** `[observed]` — a `GenAI Acceptable Use Guidelines` policy exists as a peer of the Community Guidelines, and the help hub's first card is `AI at Pinterest` whose gloss names the user-facing artefact: "**Gen AI labels** help you spot images and ideas that were created or modified using artificial intelligence." A labelling regime with a user-facing label name, promoted to the top of the help hub. The Community Guidelines also state: "Our policies apply to everyone and to all types of content, **including synthetically generated content**", and several harm categories name synthetic media specifically (nudifiers, manipulated degrading content, impersonation).

**Self-harm resource placement** `[observed]` — the self-injury section opens with a **bolded crisis-resource sentence before the policy**: "**If you or someone you know is struggling with suicidal thoughts or is considering hurting themselves, we have resources in our Help Center where you can get free, confidential and immediate support.**" Help before rules. The same inversion Reddit applies by placing crisis resources inside the reporting IA.

The teen article closes with a third-party resource finder, disclosed: "Your use of this resource finder is subject to the **ThroughLine Privacy Policy**." And a bolded escalation out of the product entirely: "**If you or someone you know is in danger, please contact your local law enforcement immediately.**"

**Screen-time nudge, disclosed as an experiment** `[observed]`

> `When to pause inspiration` — "We're proud to be a space to find inspiration, but we know there's a time and a place for scrolling. **We're running an experiment** and if you open the Pinterest app during the school day, you may see a reminder to put down your phone, pause notifications, and focus on school."

Pinterest tells teens they are in an A/B test, in the teen-facing article. `When to pause inspiration` as a section heading is also a neat piece of brand-consistent framing — the wellbeing feature is named in the vocabulary of the product's core value.

## T11 Help-centre architecture

`[absent]` for the category tree; `[observed]` for the URL taxonomy and title grammar.

**Two content types, distinguished by URL path** `[observed]`

| Path | Type | Example |
|---|---|---|
| `/en/guide/<slug>` | Multi-section overview ("guide") | `all-about-pinterest` |
| `/en/article/<slug>` | Single-task article | `make-your-profile-private` · `account-suspension` · `teen-safety-options` · `personalized-ads-on-pinterest` |

The guide slugs share a rigid prefix: **`all-about-<topic>`** (`all-about-pinterest`, and by inference `all-about-your-privacy`, `all-about-saving-pins`, `all-about-shopping-on-pinterest`, `all-about-your-profile` — four of which returned empty bodies and so are `[absent]` as content, though the slug pattern is evidenced by Pinterest's own internal links). A predictable, human-readable overview namespace.

**Article-title grammar — four shapes** `[observed]`

| Shape | Example |
|---|---|
| Imperative task | `Make your profile private or public` · `Claim your website` · `Block or unblock someone` |
| Gerund/noun topic | `Account deactivation` · `Teen safety options` · `Personalized ads on Pinterest` |
| `Can't <verb>` (user's failure, contracted) | `Can't log into Pinterest` |
| `What is/are…?` (inside guides, as section headers) | `What is Pinterest?` |

`Make your profile private or public` pairs the action with its reversal, like Reddit's `Restrict or unrestrict` and Pinterest's own `Block or unblock someone` — a consistent house style for reversible settings. Good.

**Cross-linked article slugs observed in policy prose** `[observed]`, useful as an inventory of Pinterest's self-service surface: `report-something-on-pinterest` · `combating-non-consensual-intimate-imagery` · `report-ncii` · `report-harassment-and-cyberbullying` · `suicide-and-self-harm-prevention` · `age-requirements-for-using-pinterest` · `teen-safety-options` · `manage-a-parental-passcode` · `block-or-unblock-someone` · `account-suspension` · `personalized-ads-on-pinterest` · `messages-comments-tries`.

`combating-non-consensual-intimate-imagery` is notable for the verb — the article is framed as the user *combating* the harm, not as Pinterest's policy on it. And `report-ncii` exists as a **dedicated short-path reporting route** alongside the general report article: the highest-urgency report type gets the shortest URL.

**`Still need help? Contact us`** is the universal routing terminus, on the hub and on every article. Single, consistent, and placed last.

## T12 FAQs

**No FAQ block was found on any harvested Pinterest surface.** `[absent]`

This is a real structural finding rather than a harvest gap. Pinterest does not use a question-accordion pattern on its help hub, its guide, its articles or its policy pages. Where the other four products in this batch all carry a `Frequently Asked Questions` block (Discord and Reddit extensively), Pinterest instead uses:

- **Question-shaped section headings inside guides** — `What is Pinterest?` is the only true interrogative captured.
- **Statement-shaped section headings** doing the job a question would — `How it works` · `Appealing an account deactivation` · `Age requirements for teens` · `Profile visibility` · `Your settings and options as a teen` · `Comments` · `Messages` · `Privacy and data` · `When to pause inspiration` · `Create a plan with your parent or guardian` · `What to do if you see something unsafe` · `Send an anonymous report` · `Block someone` · `Resources and support`.

The teen-safety article's headings are the closest thing to a FAQ in the set, and two of them *are* question-shaped in effect: `What to do if you see something unsafe` and `When to pause inspiration`. Both are noun-phrase-with-implied-question, and both are addressed to the teen in the second person.

**Structural note worth recording:** Pinterest's alternative to the FAQ is the **nine-card task board** on the help hub (T1) — the card title is the user's need, the gloss is the answer preview, and the CTA is the route. That is functionally an FAQ with the question converted to a task and the answer deferred to a click. It scans faster than an accordion and it commits to a next action, but it loses the FAQ's ability to answer in place.

## T13 Coined structural terminology

**PRIORITY SECTION.** Pinterest has the most *consistently maintained* coined vocabulary in this batch — every core noun is capitalised, defined on first use, and used without drift — with one large, visible exception (the deactivation/suspension/removal trio) and one interesting retreat (`Pinner`).

| Term | Pinterest's usage | The alternative it rejected / notes |
|---|---|---|
| `visual discovery engine` | The self-description, in the first sentence of `What is Pinterest?` | "social network", "feed", "inspiration app". A **search** framing, not a social one — the single most consequential word choice in the product |
| `Pin` | **Capitalised**, singular and plural, used as both noun and implicit verb; defined as "bookmarks that people use to save content they love"; "Pins can be images, videos or products" | "post", "card", "item". Note Pinterest defines a Pin by its *function* (a bookmark) not its *form* (an image) — which is how one noun covers image, video and product |
| `board` | **Lowercase**, the container; "The Pins you save live on your boards" | "collection", "album", "folder". The lowercase/capitalised split between `board` and `Pin` is consistent throughout and appears deliberate: the Pin is the branded atom, the board is a generic vessel |
| `board sections` | Sub-containers within a board; taught with a worked example (`"Decorations"`, `"Party games"`) | "sub-boards", "tags" |
| `Group boards` | **Capitalised**, collaborative boards; "Invite other people on Pinterest to collaborate on Group boards" | "shared boards". Inconsistent with lowercase `board` — recorded as a casing drift |
| `home feed` | Lowercase; the algorithmic surface, defined with its ranking signal disclosed ("based on your recent activity") | "For You", "Home" |
| `Save` | **The core verb, capitalised as a button label** ("click the red Save button") | "Pin it" — the legacy verb, now entirely absent from the harvested copy. Pinterest has migrated from *pinning* to *saving*, keeping `Pin` as the noun and giving up `pin` as the verb |
| `visual search` | The camera/crop discovery mode; "Tap on any part of a Pin to explore similar ideas, products, and styles — **no words needed**" | "image search", "Lens". The tagline "no words needed" is the intent thesis in three words |
| `Product Pin` | A Pin type in the merchant regime | "shopping post" |
| `Catalogs` | Merchant product-feed product, capitalised | |
| `Pinner` | The user noun — **used heavily in policy and merchant copy** ("relevant for Pinners", "the Pinner experience", "some Pinners may have additional appeal options") but **almost entirely absent from help-centre consumer copy**, which says "people on Pinterest", "you", "people you know" | A live register split: `Pinner` survives in legal/policy/B2B prose while consumer-facing copy has retreated to "people on Pinterest". Compare Reddit, which uses `redditor` in both |
| `Deactivation` | The removal action; "Deactivation can also be referred to as 'removal;'" | Officially co-exists with `removal` and `suspension` — see the defect below |
| `Limiting distribution` | The reduced-reach state, fully defined | "shadowban", "demotion", "downranking". Pinterest names the thing most platforms refuse to name |
| `Rejection` / `Limited approval` / `Advertiser removal` / `Merchant rejection` | The four ad/merchant enforcement actions | `Limited approval` is a genuinely useful third state between yes and no |
| `sensitivity screen` | The interstitial applied to possibly-inappropriate content | "content warning", "blur" |
| `Automated actions` / `Manual actions` / `Hybrid actions` | The three moderation systems | `Hybrid actions` — human decision, machine propagation — is novel public vocabulary |
| `one-click appeal` | The appeal link embedded in the enforcement email | Names the friction level, not just the route |
| `Addressing misuse` | The policy sub-heading for report/appeal abuse | |
| `Gen AI labels` | The user-facing AI-provenance label | "AI badge", "synthetic media label" |
| `parental passcode` | The teen-settings lock; "set up a passcode to lock certain settings related to account management, privacy and data, and social permissions" | "parental controls" — Pinterest's version is a *lock on settings*, and the name says so |
| `Profile visibility` | The setting name (property-named, so both poles can be discussed) | "Private account" — the Instagram approach, which cannot name its own default |
| `Use of partner info` | The ad-personalisation opt-out control | "Off-Pinterest activity", "Third-party data". Euphemistic — "partner info" does not tell the user it means their email address matched against an advertiser's list |
| `tries` | Appears only in a policy URL slug (`messages-comments-tries`) and in the guide's "Pins you try" | An apparently retired or semi-retired feature noun (`Tried it`), surviving in a slug and one clause. Flagged as observed-but-undefined |
| `more-options-refresh icon` · `speech-ellipsis icon` · `dialog-ellipsis icon` · `chevron-down icon` · `ellipsis icon` | Icon names written into user-facing instructions | Design-system tokens leaking into help copy. Consistent, searchable, but unreadable aloud |

**Three terminology findings.**

1. **`deactivation` / `removal` / `suspension` are three names for one state, and Pinterest concedes it in a parenthetical** ("account removals (also known as deactivations or suspensions)"). The URL says `account-suspension`, the title says `Account deactivation`, the enforcement policy says `Deactivation… also be referred to as 'removal'`. Pinterest is managing the ambiguity rather than resolving it — a defensible SEO decision (users search all three) and an indefensible UX one, since the in-product notice, the policy and the help article do not agree.
2. **`Save` is both the product's core verb and a form-submit label.** "Click the red Save button" (save a Pin) and "Click **Save**" (commit an ads-privacy setting) appear in the same help centre. For Pinterest's most-used word, overloading it onto a generic settings confirm is a real collision.
3. **`Pinner` is in retreat.** It remains the term of art in policy, enforcement and merchant copy but has been replaced by "people on Pinterest" in consumer help. That means the two audiences most likely to read the enforcement page — a deactivated user and a rejected advertiser — encounter a noun the consumer product no longer uses for them.

**Register split:** consumer help says `you`, `people on Pinterest`, `ideas`, `inspiration`; policy says `Pinner`, `deactivation`, `limiting distribution`, `actioned`. `actioned` as a verb ("a hybrid action may result in a number of Pins actioned") is the one piece of internal ops-speak that surfaces unglossed.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company, used in adverse copy without hedging ("**We remove or limit** the distribution of such content", "we may **deactivate** users who…"). Pinterest is a visible actor in its own enforcement — no passive "content may be removed".

The **teen article is written to the teen**, in the second person, throughout: "you should know that you need to be at least 13 years old", "Keep yourself—and your information—safe", "It's not always easy being a teen." That last sentence opens the resources section. Compare Instagram's teen pages, which mix parent and teen "you" within a page; Pinterest holds the teen's second person for the whole article and pushes the parent into a clearly-labelled section (`Create a plan with your parent or guardian`) whose bullets instruct the teen to *share pages with* the adult. **The teen is the agent throughout, including in the parental-controls section.** That is the sharpest audience discipline in the batch.

**Register — three levels, cleanly separated.**

| Surface | Register | Example |
|---|---|---|
| Brand/help | Warm, inspiration-vocabulary | "the positive corner of the internet" · "ideas to spark inspiration" · "pass the inspiration around" · "When to pause inspiration" |
| Policy | Flat, enumerative, unhedged | "Pinterest isn't a place for…" · "We remove or limit the distribution of…" |
| Legal/compliance | Formal, jurisdictional | sanctions list, DAA opt-out, Brazil ECA exception |

"the positive corner of the internet" is Pinterest's recurring self-description and it appears in the *teen-safety* article — the brand claim is deployed precisely where the reader is most likely to be anxious. Whether that reads as reassuring or as deflecting is a judgement call; recorded as observed.

**Contractions** used throughout including in policy ("isn't a place for", "don't allow", "won't be featured", "doesn't affect"). Pinterest does not formalise its grammar as stakes rise — it formalises its *vocabulary*, same as Reddit.

**No exclamation marks** in policy. Two in help copy: "As people upvote…" (not Pinterest) — in fact **zero** exclamation marks were observed anywhere in the Pinterest set. No `Oops`. The most exclamation-free product in this batch.

**Em-dash-and-clarification habit** `[observed]`: "Keep yourself—and your information—safe on Pinterest." · "no words needed" after an em-dash. Used sparingly, for emphasis by interruption.

**Numbers as bounds** `[observed]`: `13`, `16`, `18`, `November 12, 2026`, `one year`, `billions of Pins`. Only one scale claim (`billions of Pins`) and it is attached to a benefit ("you'll always find ideas"). Every other figure is an age band, a date or a limit.

**Accessibility content** `[observed]`

- **`Skip to footer`** is the first link in the DOM on `policy.pinterest.com`, with `Skip to navigation` at the foot. This is an **unusual and arguably wrong** skip-link pair: the conventional first skip target is main content, not the footer. A keyboard user tabbing into a policy page is offered a jump to the footer before a jump to the policy text. Recorded as a defect.
- The help centre (`help.pinterest.com`) served **no skip link at all** in the fetched markup. Recorded as a gap.
- **Alt text, one good instance:** `Image of a Pin pointing out the different parts of what makes a Pin.` — an annotated-diagram description that tells a screen-reader user what the diagram is *for*, though not what the parts *are*. Partial credit: the reader learns a diagram exists and is denied its content.
- **Icon-name instructions are an accessibility problem in themselves.** "Click the **more-options-refresh icon**" and "tap the **speech-ellipsis icon**" are hyphenated design-token names read aloud verbatim by a screen reader. They are also unmatched to any visible label, so a user who cannot see the glyph has no way to locate it. This affects every procedure in the harvested help set.
- **Template tokens leak into the accessible name of every article**: `End of Other articles Links` renders at the top and bottom of the body, and `## collection_fields` renders as a heading inside the feedback widget. A screen-reader user opens every Pinterest help article on the words "End of Other articles Links" and encounters a heading called "collection_fields". This is the most pervasive defect found in this file — it is on **every** article fetched.
- `You must have JavaScript enabled to use this form.` — a correct, plainly-worded no-JS fallback for the feedback widget.
- ~52 locales offered from an in-page select on the policy site, each labelled in its own script.
- Video content uses Vimeo embeds via an oEmbed proxy; **no transcript or caption reference** was present in the markup for the teen-safety video. `[absent]`
- **No accessibility statement was reachable.** `help.pinterest.com/en/article/accessibility-on-pinterest` was attempted and returned an empty body; the URL was inferred, so its existence is **unconfirmed**. `[absent]`
- Images in the help articles use an `imgix` CDN with query-string transforms; several inline icon references render as empty markup where an icon glyph should be, leaving instructions like "click the ellipsis icon  and select **Block**" with a visible double space and no icon. Suspected rendering artefact of the fetch rather than a live defect — flagged as unconfirmed.

**Negative findings, recorded honestly**

- `account-suspension` (URL) vs `Account deactivation` (title) vs `removal` (enforcement policy) — three names for one state, on one path.
- `Save` used both as the product's core verb and as a settings form-submit label.
- `Non-User Notice` (nav) vs `Non-user notice` (footer) — casing drift on a legal document name.
- `Group boards` capitalised while `board` is lowercase.
- `here` as link text on the forward-dated policy preview — the most important link on the policy pages.
- `Claim your website` and `Review Pinterest Analytics` cards have CTAs identical to their titles.
- The nine-card help hub mixes consumer and merchant audiences with no signposting.
- `End of Other articles Links` and `## collection_fields` template tokens render on every help article.
- `Skip to footer` as the first skip link on the policy site.
- Enforcement page `Last updated: April 2025` while the Community Guidelines it enforces is `Last updated: May 2026` — a 13-month gap between a rulebook and its enforcement doctrine.
- No published appeal turnaround time anywhere ("we'll take a look at it and get back to you").
- `tries` / "Pins you try" appears as an undefined feature noun.
- `actioned` used as a verb in user-facing policy.

---

## Transferable patterns

1. **Name the reduced-distribution state and define its exact visibility boundary.** "it will continue to be accessible on Pinterest to the user who posted it and to users with a direct link, but it won't be featured in recommendation or discovery surfaces." This is the state users call shadowbanning; naming it, and publishing who can still see the content, converts a conspiracy theory into a documented outcome. Transfers to any product that degrades rather than removes — search ranking, seller visibility, risk-based feature limitation.
2. **Forward-dated policy with a preview link and a switchover date.** "We're updating our Community Guidelines, effective November 12, 2026. You can preview the updated Community Guidelines here." Current policy stays primary; future policy is readable in advance. Directly applicable to fee schedules, T&C changes and PayPal user-agreement updates. Condition: give the link real text, not "here".
3. **Parallel one-sentence definitions for report and appeal.** "Reports are how you can tell us if you think something on Pinterest is in violation of our policies." / "Appeals are how you can tell us if you think we made an enforcement error." One frame, pointed outward and inward. Two sentences that make an entire dispute system legible.
4. **The age-banded default matrix as a table.** Four cells resolve two account types against two age bands, including a cell that is a prohibition. Faster and less ambiguous than the prose Instagram uses for the same information.
5. **Tell the user the weaker control is insufficient.** "If you want to opt out of all Pinterest ad personalization using your off-Pinterest activity, use your Pinterest account settings as described above." Pinterest actively routes users away from the device-level opt-outs it has just documented, because they do not fully work. Advising against your own partial remedy is a trust move most consent copy will not make.
6. **State the adverse future change alongside the present protection.** "you're automatically opted out of all ads personalization settings. **You'll be opted in when you turn 18**, but you can adjust this in your settings at any time." The re-opt-in is disclosed years before it happens.
7. **Hold one audience's second person for a whole document, and make the other audience a topic inside it.** The teen-safety article addresses the teen throughout and treats the parent as something the teen involves (`Create a plan with your parent or guardian`). Compare Instagram, which switches audience mid-page. Pick the more vulnerable reader and keep them as the grammatical subject.
8. **Negative pattern to avoid: absorbing a terminology conflict instead of resolving it.** Pinterest names all three of `deactivation`, `removal` and `suspension` for one state and lets the URL, the title and the policy each pick a different one. Naming the synonyms in a glossary is fine; letting the product surfaces disagree is not.

## Caveats & gaps

- **`pinterest.com` returned an empty body**, so there is no marketing hero, no value-proposition headline set, no signed-out discovery surface and no in-product string in this file. T2 is reconstructed from the help centre's definitional copy instead.
- **Four of five `/guide/` hub pages returned empty bodies** (`all-about-your-privacy`, `all-about-saving-pins`, `all-about-shopping-on-pinterest`, `all-about-your-profile`). The guide layer is where Pinterest's saving, board and shopping vocabulary would be taught in depth, so **T13's shopping and board-organisation terminology is thinner than it should be** and the brief's "how Pinterest words its shopping" requirement is only partly met — covered via the Community Guidelines' merchant sections, the Enforcement page's merchant regime, and the help hub's `Shopping on Pinterest` card gloss, not via a consumer shopping guide.
- **Help-centre category tree is absent (T11).** No category listing was served. The URL taxonomy (`/guide/all-about-*` vs `/article/*`) is documented, but the navigable IA is not.
- **No FAQ block exists** on any harvested surface (T12). Marked `[absent]` as a finding, not a gap — but it is possible an FAQ lives on an unharvested surface.
- **No appeal turnaround time is published anywhere**, so the T9 escalation ladder has no temporal dimension. Compare Instagram (90 days) and Reddit (six-month appeal window).
- **Accessibility statement unconfirmed.** `help.pinterest.com/en/article/accessibility-on-pinterest` was a guessed URL and returned empty. Its existence is neither confirmed nor disproven.
- **The forward-dated preview policies were not fetched.** `policy.pinterest.com/community-guidelines-preview` and `/enforcement-preview` contain the rules effective November 2026 and would be the highest-value next fetch — they are the *future* enforcement vocabulary.
- **`Merchant Guidelines`, `Advertising Guidelines`, `Commercial and Branded Content Guidelines`, `GenAI Acceptable Use Guidelines`, `Transparency`, `Copyright`, `Trademark` and `Non-User Notice` were all identified in the nav but not fetched.** Pinterest's ad-disclosure vocabulary in particular is likely richer in `Advertising Guidelines` and `Commercial and Branded Content Guidelines` than what is captured here.
- **All in-product states are documented, not observed.** The deactivation notice at login, the sensitivity screen, the `Save` button, the report flow and the one-click appeal email are `[documented]` at best. Only the "deactivation notice" is described at all, and it is described in eleven words.
- Several inline icon glyphs rendered as empty markup in the fetched HTML, producing double spaces in instruction sentences. Treated as a fetch artefact and flagged unconfirmed rather than reported as a live defect.
- Mobile app strings, email copy (including the one-click appeal email itself) and push copy are out of the public web surface.

## Sources

1. https://www.pinterest.com/ (empty body)
2. https://help.pinterest.com/en
3. https://help.pinterest.com/en/guide/all-about-pinterest
4. https://help.pinterest.com/en/article/make-your-profile-private
5. https://help.pinterest.com/en/article/account-suspension
6. https://help.pinterest.com/en/article/teen-safety-options
7. https://help.pinterest.com/en/article/personalized-ads-on-pinterest
8. https://policy.pinterest.com/en/community-guidelines
9. https://policy.pinterest.com/en/enforcement
10. https://help.pinterest.com/en/guide/all-about-your-privacy (empty body)
11. https://help.pinterest.com/en/guide/all-about-saving-pins (empty body)
12. https://help.pinterest.com/en/guide/all-about-shopping-on-pinterest (empty body)
13. https://help.pinterest.com/en/guide/all-about-your-profile (empty body)
14. https://help.pinterest.com/en/article/accessibility-on-pinterest (empty body; URL inferred, existence unconfirmed)
