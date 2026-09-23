# 039. 1Password

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Consumer and business password manager / credential and secrets management, extended to enterprise access governance ("Unified Access") and AI-agent credential brokering |
| Primary URL | https://1password.com/ |
| Corpus rank | 039 |
| Benchmark strength (source list) | Calm, clear security communication |
| Locale / market observed | en (Canadian company; `og:locale: en_CA` on the blog). Marketing footer offers ten: `Deutsch` · `Español` · `Français` · `Italiano` · `日本語` · `한국어` · `Português` · `简体中文` · `繁體中文` · `English`. **The support site offers a different, smaller set**: `Deutsch` · `Español` · `Français` · `Italiano` · `日本語` · `Pусский` — see T14 |
| Platform observed | Web (marketing, Contentful-backed), support/KB site (`support.1password.com`), blog, Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | HIPAA (dedicated support article), SOC 2 implied via `Trust Center` at `trust.1password.io`; CCPA opt-out control in every footer; published third-party security audit programme; HackerOne bug bounty described as "the industry's largest". Canadian HQ address printed in every footer |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Full for the assigned focus — **the high-anxiety security register (breach, master-password loss, lost device, unrecognised sign-in, recovery) was captured directly across five dedicated articles plus a breach-explainer blog post.** Partial elsewhere: consumer/Business pricing tabs, the `1password.com/security` page, the Security Design White Paper PDF, and `trust.1password.io` were not harvested |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://1password.com/ | Hero, four product cards, Gartner placement, single customer quote |
| Pricing (Enterprise tab) | https://1password.com/pricing | Five quote-only product cards, six solution blocks, 5-question FAQ |
| Support home | https://support.1password.com/ | Two onboarding cards, ten category tiles, `Common topics` inline row, featured articles |
| Support category: `Get help` | https://support.1password.com/category/troubleshooting/ | **~31 troubleshooting titles, almost all in `If …` conditional form** |
| Support category: `Security and privacy` | https://support.1password.com/category/security/ | **~55 titles including ~30 in the `About the security of <feature>` pattern** |
| About the 1Password security model | https://support.1password.com/1password-security/ | Three-pillar structure; the canonical explainer |
| **If you forgot your 1Password account password…** | https://support.1password.com/forgot-account-password/ | **The master-password-loss article — the priority artefact for T14** |
| **If your device was lost or stolen…** | https://support.1password.com/lost-device/ | **Opens with reassurance, then tells the user *not* to act** |
| **If a device you don't recognize has signed in…** | https://support.1password.com/unrecognized-device/ | Branching decision tree, dedicated security escalation address |
| Get to know your Emergency Kit | https://support.1password.com/emergency-kit/ | Coined artefact; field inventory; the "should I write it down?" note |
| Status page | https://status.1password.com/ | **Components named as user tasks, not services**; four regions |
| Blog: How 1Password is designed to keep your data safe… | https://1password.com/blog/how-1password-protects-your-data | **The breach-communication artefact** |

---

## T1 Navigation & IA labels

**The primary nav is a two-audience toggle, and that is nearly all of it** `[observed]`

The homepage exposes `Business` and `Personal` as the top-level switch, with `Talk to sales` and `View plans` as the only buttons. There is no products mega-menu in the server HTML; the product inventory lives entirely in the footer. For a company selling to both a consumer and an enterprise buyer, the **first decision the site asks for is which of the two you are**, and everything else is deferred.

The support site carries a different and older nav: `Home` · `Tour` · `Families` · `Business` · `Developers` · `Pricing` · `Security` · `Download` · `Support` · `Blog` · `Sign in`. **Two navigation systems on one product**, and the support one still exposes `Tour` and `Families` as top-level items that the marketing site has retired. Recorded as a defect: a user who lands on a support article sees a site map that no longer matches the marketing site.

**Footer is the real IA, and it is ten groups** `[observed]`

`Downloads` · `Unified Access Platform` · `Products and Tools` · `Features` · `Solutions` · `Resources` · `Developers` · `Support` · `Company` · `Partners`

Two things are notable. `Downloads` comes **first**, before any product or feature group — an unusual priority that reflects the reality that most visitors are existing users wanting the app for a new device, and it lists seven platforms (`macOS`, `Windows`, `iOS`, `Android`, `Browser`, `Linux`, `CLI`) with `CLI` as a peer of the GUI apps.

And the split between `Unified Access Platform` and `Products and Tools` is a **business-model boundary made visible**: the first group is the enterprise platform (`Unified Access`, `Enterprise Password Manager`, `Credential Broker`, `Privileged Access`, `SaaS Manager`, `Device Trust`), the second is the consumer product plus free utilities (`Personal Password Manager`, `Password generator`, `Username generator`, `Comparison`, `Demos`, `Switch`, `Pricing`). `Switch` as a nav label — a one-word migration entry point — and `Comparison` as a peer of it, are both aimed squarely at users of competing password managers.

**`Off-by-1 Labs`** `[observed]` — the research group's name is a programmer's pun (off-by-one error) filed under `Resources` at `/research`. A coined internal brand that leaks, deliberately, into public navigation. Alongside it: `Bug bounty` linking straight to HackerOne, and `Trust Center` on a separate domain (`trust.1password.io`).

**Support-site IA: ten category tiles, each with a scope line** `[observed]`

| Tile | Scope line (verbatim) |
|---|---|
| `Using 1Password` | "Learn how to use 1Password to save and fill passwords and more." |
| `Families` | "Learn how to get the most out of 1Password Families." |
| `Billing and subscriptions` | "Learn how to manage your 1Password subscription." |
| `Businesses` | "Learn how to use and manage 1Password in your organization." |
| `Managed Service Providers` | "Learn how to set up an MSP account and manage companies." |
| `Developers` | "Learn about 1Password's developer tools and resources." |
| `SaaS Manager` | "Discover, manage, and secure the SaaS apps your organization uses." |
| `Device Trust (Kolide)` | "Make sure only secure, known devices can access your company's apps." |
| `Get help` | "Get help with common issues, like if you've lost your password." |
| `Security` | "Learn about 1Password's security model, settings, and more." |

Six of ten scope lines begin with `Learn how to` / `Learn about`. The two that break the pattern are the two acquired/newer products (`SaaS Manager`, `Device Trust (Kolide)`), whose lines are imperative capability statements rather than learning promises — a visible seam where acquired content has not been assimilated into the house grammar. `Device Trust (Kolide)` keeps the acquired brand in parentheses, which is honest transitional naming.

**`Get help` is the notable category label.** Not "Troubleshooting" (though the URL is still `/category/troubleshooting/`), not "Problems", not "Support" — `Get help`, an imperative addressed to a person who needs it. And its scope line names the worst case by example: "like if you've lost your password." **The category description volunteers the scariest thing in the category**, which is the opposite of the usual instinct to lead with the mildest.

**Inline `Common topics` row on the support home** `[observed]`: `Secret Key`, `lost account password`, `browser extension not working`. Three links, running as a sentence fragment under the welcome headline, covering one concept, one catastrophe and one nuisance. A deliberately tiny top-tasks list placed above the ten-tile grid.

**Two entry cards for two starting positions** `[observed]`:
- `Get started` — "Set up 1Password for yourself or your family." → CTA `Get started`
- `Team members: Get started` — "Set up 1Password at your workplace." → CTA `Join your organization`

The second card's **CTA differs from its title**: the heading says "Get started" (matching its sibling for scannability) and the button says `Join your organization` (describing the actual action). Title for recognition, button for accuracy.

**Breadcrumb defect** `[observed]`: articles in the `Get help` category render a two-level breadcrumb where both levels carry the same label — `Get help` → `Get help` (the second pointing at an in-page anchor, `#get-help`, because the category's own sub-section is also called `Get help`). A category containing a subsection of the same name produces a breadcrumb that says nothing twice.

## T2 Value proposition & headline patterns

**Hero: one sentence, two audiences, no verb** `[observed]`

> Headline: `Secure access for every human and AI agent`
> Subhead: "Visibility and control for humans and AI agents, built on the most trusted vault for identities, credentials, and secrets."

A noun phrase, not a claim or a command. The subhead's structure is the interesting part: **two abstract nouns the buyer wants (`Visibility and control`), then the concrete thing they already trust (`the most trusted vault`)**. 1Password's whole enterprise pitch rests on migrating an existing consumer-grade reputation into an access-governance purchase, and the subhead does that migration in one clause — "built on the most trusted vault".

Note `every human and AI agent` and then `humans and AI agents` in consecutive lines — the same pair, singular then plural. And note that `human` is used as a noun for people, three times on the homepage (`for every human and AI agent`, `for humans, AI agents, and machines`, `credentials used in your business` for "human, machine, and agent credentials"). **1Password has adopted `human` as a first-class identity category**, which is a real 2026 terminology shift: once agents and machines hold credentials, "user" stops being sufficient and the species has to be named.

**Product one-liners are all imperative or capability-first, and each names its unit of protection** `[observed]`

| Product | One-liner (verbatim) |
|---|---|
| `Unified Access` | "One secure platform for humans, AI agents, and machines." / "Unified Access is built to discover, secure, and audit." |
| `Enterprise Password Manager` | "Secure human, machine, and agent credentials used in your business." |
| `Credential Broker` | "Verify AI agents and machine workloads at runtime, then deliver only the credentials each is authorized to receive." |
| `Privileged Access` | "Zero standing privilege enforced through just-in-time, and just-enough access." |
| `SaaS Manager` | "Discover, secure access, and optimize spend on AI tokens and SaaS apps." |

`Credential Broker`'s line is the best-built sentence in the set: **a two-clause sequence with `then`**, where the first clause is the check and the second is the consequence, and the second clause contains the whole security guarantee ("only the credentials each is authorized to receive"). The word `only` is doing all the work. `Privileged Access` uses the industry term (`Zero standing privilege`) and then glosses it with the two mechanisms in the same breath ("just-in-time, and just-enough") — though the comma before "and" in a two-item list is a slip.

`Unified Access is built to discover, secure, and audit.` — a **three-verb capability triplet with no objects**, which is unusually terse and reads as a category definition rather than a pitch.

**Closing section header** `[observed]`: `Bring modern access under control` — "Keep people and AI agents moving with clarity and speed, while control and accountability are built into every action."

This is the enterprise-security tension stated in one sentence: **movement for the user, accountability for the auditor, and the word `while` holding them together.** Compare Auth0's equivalent ("Ship safely, with governance built in"). The 1Password version is calmer and more abstract; the Auth0 version is punchier and names the developer's pain.

**Pricing page value framing is entirely benefit-headed, with no prices** `[observed]`. The Enterprise tab shows five product cards, each labelled `PLATFORM` or `PRODUCT` in small caps, each with `Request a quote` and the subtext **`Pricing built for you`**. No numbers, no tiers, no per-seat figures. `Pricing built for you` is a euphemism for "we won't tell you", but it is at least a warm one and it is used consistently on all five cards rather than varying.

Section header on the pricing page: `Unleash productivity without compromising security` — the single most generic line in this harvest, followed by six solution blocks whose own copy is much better (`Verify every device is trusted. Let users self-remediate to restore compliance and access.` · `Discover all apps, managed or unmanaged, used across your organization.`).

**`Let users self-remediate to restore compliance and access`** is worth isolating as a content pattern: a security product describing its enforcement action by naming **what the blocked user gets to do about it**, not what the admin gets to do to them.

**The security-model explainer's headline pattern is claim-then-mechanism in three beats** `[observed]`, from `About the 1Password security model`:

- `End-to-end encryption` — "leaves the keys in your hands – and nowhere else."
- `Smart features` — "limit your exposure to threats outside 1Password."
- `Full transparency` — "makes sure 1Password can be and is audited by experts."

Three nouns, three verb phrases, and the third one carries the strongest construction in the file: **"can be and is audited"** — the modal and the indicative together, distinguishing *auditability* (a design property) from *having been audited* (a fact). Four words that a security buyer will read twice and a consumer will read once and still be reassured by. The three become the page's three H2s (`Encryption`, `Features`, `Transparency`), so the summary is also the table of contents.

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `Talk to sales` | Homepage hero and closing block | Lowercase `s`; the primary enterprise action |
| `View plans` | Homepage hero and closing block, secondary | Points at `/pricing/enterprise` |
| `Explore Unified Access` | Homepage, platform block | |
| `Try Enterprise Password Manager` | Homepage, product card 1 | |
| `Explore Credential Broker` | Homepage, product card 2 | |
| `Discover Privileged Access` | Homepage, product card 3 | |
| `Learn about SaaS Manager` | Homepage, product card 4 | **Four sibling cards, four different verbs** — `Try` / `Explore` / `Discover` / `Learn about` |
| `Request SaaS Manager demo` | Gartner block | |
| `Get the report` | Gartner block | |
| `Read the story` | Customer quote | |
| `Request a quote` ×5, with subtext `Pricing built for you` | Every pricing card | Consistent across all five; the subtext softens the gate |
| `Buy with AWS` | Pricing, marketplace block | |
| `Try 1Password FREE` | Support-site header | **All-caps `FREE`** — the only shouted word on any surface harvested |
| `Sign in` | Support and marketing headers | Not "Log in" |
| `Get started` | Support home card 1; blog foot | |
| `Join your organization` | Support home card 2 | Differs from its own card heading — see T1 |
| `Let's talk` | Blog foot, business-oriented | First-person-plural, contracted, warmer than `Talk to sales` |
| `Check out the support community.` | Support home | Trailing full stop inside the link text |
| `Contact 1Password Support.` | Foot of the forgot-password article | Trailing full stop inside the link |
| `contact us` | Feedback follow-ups | Lowercase, opens a chat via `?openChat` query param |
| `Subscribe` | Status page | |
| `View historical uptime.` | Status page | Trailing full stop inside the link |
| `How to find your region` | Status page footer | A **routing question placed below a region-partitioned status page** — good |
| `Skip to Main Content` | First in DOM, marketing and blog | Capital-M, capital-C |
| `Manage Account` · `Regenerate Secret Key` · `Save Emergency Kit` · `Got It` · `Deauthorize Device` · `Unlink` · `Change Password` · `More choices` | In-product, quoted in docs | `[documented]` — see T5 |
| `Was this article helpful?` → `Yes, thanks!` / `Not really` | Foot of every support article | **The most distinctive micro-copy in this file** — see T14 |

**Observations.** The four-verb product-card set (`Try` / `Explore` / `Discover` / `Learn about`) is the same unmanaged-variety problem seen on Auth0 and Retool, but 1Password's version is milder because the verbs are at least plausibly graded by commitment (`Try` for the flagship you can start today, `Learn about` for the newest acquisition). Whether that gradation is intentional cannot be established from the page.

`Try 1Password FREE` with the shouted `FREE` sits only on the support site — i.e. on the older, unmigrated surface. Every CTA on the current marketing site is sentence case and unshouted, which makes the support-site variant look like a legacy artefact rather than a live choice.

Three link labels end with a full stop inside the link (`Check out the support community.`, `Contact 1Password Support.`, `View historical uptime.`). Minor, but it means the clickable region includes punctuation, and it is inconsistent with the majority.

## T4 Onboarding & getting-started

**Onboarding is split by *who invited you*, not by platform** `[observed]`. The support home's two entry cards distinguish "I bought this" from "my employer bought this" — `Set up 1Password for yourself or your family.` versus `Set up 1Password at your workplace.` with the CTA `Join your organization`. That is the correct first fork for a product where the enterprise user has no account-creation step and a completely different set of constraints (admin-managed recovery, possibly no Emergency Kit, possibly SSO unlock).

**Platform onboarding is then a seven-way picker** `[observed]`, under the heading `Get to know the apps` — "Learn how to use the apps to manage your passwords, credit cards, secure notes, and more." Seven targets: `Mac`, `iOS`, `Windows`, `Android`, `Linux`, `ChromeOS`, `Command Line`, each linking to a `getting-started-<platform>` article. Note the scope line enumerates three item types and then `and more` — it teaches the reader that 1Password holds more than passwords, in the onboarding label, which is 1Password's perennial positioning problem in five words.

**The Emergency Kit article is the strongest onboarding artefact, and it is structured as three imperatives** `[observed]`

`Get it` → `Prepare it` → `Use it`

Three two-word in-page anchors, each a verb plus the same pronoun. The full H2s are `Get your Emergency Kit`, `Prepare your Emergency Kit`, `Use your Emergency Kit` — so the nav is the abbreviation and the headings are the expansion. A reader can hold the whole structure from the anchor list alone.

Inside `Prepare your Emergency Kit`, four bolded imperatives each with a concrete storage instruction:

- "**Print a copy** to keep in a safe deposit box or with your passport or birth certificate."
- "**Write your 1Password account password** in at least one printed copy of your Emergency Kit."
- "**Save it to your personal cloud storage**, so you always have a digital copy available."
- "**Give a copy to someone you trust**, like your spouse or someone in your will."

**"with your passport or birth certificate"** and **"like your spouse or someone in your will"** are the two phrases to study. The article is teaching a user to store a plaintext secret, which is counterintuitive for a security product, and it makes the instruction safe by **analogy to documents the reader already knows how to keep** — passport, birth certificate, will. The reader does not need a threat model; they need a shelf they already use. This is the clearest instance in the corpus of security instruction delivered through domestic analogy rather than through risk language.

**And the hardest question in the flow is asked as a heading** `[observed]`, inside a `Note` callout:

> `Should I write down my 1Password account password?`
> "Consider what would happen if you ever forgot it or how a loved one would access your account in an emergency. If you don't write it down, it's still important to keep a copy of your Emergency Kit, so you don't lose your Secret Key."

**1Password does not answer its own question.** It supplies the two considerations (your own forgetting; a loved one's access after your death) and then covers the branch where the reader declines. No "we recommend", no "best practice", no scolding. For a decision whose correct answer genuinely depends on the user's threat model — a journalist in a hostile state and a retiree with a safe have opposite right answers — declining to prescribe is the honest move, and giving the fallback for the riskier choice is the responsible one.

Note the register of `a loved one` and `in an emergency`: this is estate-planning language in a password-manager help article, and it is the moment the product admits that its worst failure mode is the user's death.

**Prerequisite/eligibility caveats are placed as `Tip` callouts, not buried** `[observed]`: "If your administrator turned off Emergency Kits for your organization or if you unlock 1Password with SSO, you won't be able to save one." The reader who cannot follow the procedure is told so before the procedure, and told who to blame (their administrator) rather than being left to conclude the product is broken.

## T5 Form & field labels

**The Emergency Kit's field inventory is the clearest labelled artefact 1Password publishes** `[observed]`, each with a one-line gloss:

| Field | Gloss (verbatim) |
|---|---|
| `Sign-in address` | "The web address you use to sign in to your account." |
| `Email address` | "The email address you used to create your account." |
| `Secret Key` | "A unique code which protects your data." |
| `Account password` | "A place to record your 1Password account password." |
| `Setup Code` | "A QR code that makes it easier to sign in on mobile devices." |

Five fields on a PDF, each glossed in one clause. `Account password` is the interesting one — its gloss describes **the field, not the value** ("A place to record…"), because on this artefact the field is blank by design and the user has to fill it. The label describes a slot; its four siblings describe contents.

`Sign-in address` rather than "URL" or "domain" or "server", for the string a user must type on a new device. `Setup Code` rather than "QR code" for the thing whose gloss then explains it *is* a QR code — the name describes its job, the gloss describes its form.

**In-product control labels, quoted in support articles** `[documented]`

Account management: `Manage Account` · `Manage Accounts` · `Save Emergency Kit` · `Regenerate Secret Key` · `Change Password` · `Got It` · `Linked to your account` · `Deauthorize Device` · `Unlink`

Unlock and recovery: `More choices` (Windows Hello fallback) · `Trusted Platform Module with Windows Hello` · the lock-screen message `1Password is trying to unlock.`

**`Linked to your account`** as a section label for the device/browser list is worth recording. Not "Devices", not "Sessions", not "Authorized clients" — a possessive relational phrase that covers apps *and* browsers *and* devices without having to pick a noun for the heterogeneous set. Its paired action is `Unlink`, so label and verb share a root.

**`Deauthorize Device` and `Unlink` are two different verbs for what a user might think is one action** `[documented]`, and the two articles use them in different places: `lost-device` says "Deauthorize Device"; `unrecognized-device` says "Unlink". The distinction is presumably real (authorisation vs. linkage), but neither article explains it and a panicking user reading both will not know whether they have done the right thing. **Recorded as the most consequential terminology defect in this file**, because it sits in exactly the two articles a user reads during a suspected compromise.

**`1Password is trying to unlock.`** `[documented]` — the biometric prompt string, quoted with its full stop, and immediately explained: "To approve and unlock 1Password, place your finger on the Touch ID sensor on your Mac or double-click the side button on your Apple Watch." A system-generated string whose grammar is odd (the app is trying to unlock *itself*) is quoted verbatim rather than paraphrased, so the reader can match it to what they see.

**Named settings surfaces** `[documented]`: `Manage Account` on 1Password.com; `Manage Accounts` in the apps (plural — a different surface, one letter apart); the `Personal` vault; a Login item named `1Password Account`.

That last one is a small masterpiece of recovery design and it appears four times across one article: "Look for a Login item in your Personal vault named "1Password Account". It may contain your password." **The product has, for years, been quietly saving the user's own account password as an item inside itself**, and the lockout article tells you to go looking for it. Note the hedge — `It may contain` — because 1Password cannot know whether that item exists for a given user, and does not pretend to.

## T6 Status & state language

**The status page names its components as user tasks, not as services.** `[observed]` This is the standout finding in this section and possibly the most transferable single decision in the file.

Within each region, alongside conventional service names (`Billing`, `Admin console`, `SSO (Single Sign On)`, `Command Line Interface (CLI)`, `1Password Connect`, `Service Accounts`, `Partnership API`, `Events API and Reporting`, `User & Group Provisioning`, `Support Portal`, `SaaS Manager`), three components are named as **things the user does**:

- `Syncing items between your devices`
- `Saving password and other items`
- `Access to passwords and other items`

Second person (`your devices`), gerund or noun-phrase form, no system nouns. A user whose autofill just failed does not know whether that is a "sync service", an "API gateway" or a "vault service" problem — but they know they were **saving a password**. Naming the component after the interrupted task lets a non-technical user self-diagnose from the status page, which is otherwise one of the least usable artefacts any consumer product ships.

`Access to passwords and other items` is also the one that answers the real question in a password-manager outage ("can I get at my stuff?"), and it is deliberately separated from `Sign in` and from `Syncing` so the answer is specific.

Two defects: `Saving password and other items` is missing a plural (`password` should be `passwords`, as its sibling `Access to passwords and other items` has), and the phrase `and other items` appears twice where 1Password's own term of art is simply `items` — so the copy hedges against its own vocabulary.

**Regional partition** `[observed]`: `USA/Global` · `Canada` · `Europe` · `Enterprise`. Three geographies and one **deployment class** in the same list — `Enterprise` is not a place. Defensible (it is a separately hosted tenancy) but taxonomically mixed, and the page's own remedy is the footer link `How to find your region`, which is the right piece of routing content to put under a region-partitioned status page.

Note that `Device Trust` components (`Device Trust Authentication Service`, `Device Trust Checks Server`, `Device Trust Portal`, `Device Trust API`) appear under `USA/Global` and `Europe` but **not** under `Canada` or `Enterprise` — an availability fact disclosed only by the shape of the status page. And those four are named in pure system-noun style, unlike their 1Password-native neighbours: the acquired product brought its own naming convention onto the status page.

**State legend** `[observed]`: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`, with the lower-case history variants `Major outage` / `Partial outage` / `had a major outage.` / `had a partial outage.` The same two-register capitalisation inconsistency inherited from Statuspage that appears on the DigitalOcean and Retool instances.

Roll-up: `All Systems Operational`. Uptime framing: `Uptime over the past 90 days.`

**Lifecycle / feature-maturity states** `[documented]`: `Try out exploratory features in 1Password` is a featured support article at `/labs`, so the beta programme is named `labs` and its contents `exploratory features` — softer than "beta" and more honest than "preview", and it sets the expectation that these are experiments rather than pre-releases.

## T7 Error, failure & recovery

**The article-title grammar is a single conditional construction, applied with near-total consistency.** `[observed]` Of ~31 titles in the `Get help` category, roughly 27 begin with `If`:

**`If you see "<literal string>"`** — the quoted-string pattern, thirteen instances:

- `If you see "1Password cannot be open during installation"`
- `If you see "1Password failed to connect to 1Password mini" when trying to open 1Password`
- `If you see "1Password has detected an error with your local app database" on your Mac`
- `If you see "1Password is damaged and can't be opened"`
- `If you see "1Password would like to record this screen" on your Mac`
- `If you see "extra copies of 1Password found"`
- `If you see "update your settings to export data" or you can't upload or download files in 1Password for Linux`
- `If you see "your items couldn't be moved automatically"`
- `If you see "can't store local data" in Firefox`
- `If you see "The 1Password browser extension needed to restart"`
- `If you see "unsecured HTTP page" when trying to fill a password`
- `If you see "1Password wants to use 1Password.com to sign in"`
- `If you see "you can't use an email address from this domain"`

**`If you can't <do thing>` / `If <thing> isn't working`** — the capability-loss pattern:

- `If you can't sign in to your 1Password account`
- `If you forgot your 1Password account password or you can't unlock the app`
- `If you can't update 1Password for Linux`
- `If you can't find your data, or it's not on all of your devices`
- `If 1Password isn't working in your browser`
- `If the 1Password browser extension doesn't unlock when you unlock the 1Password app`
- `If you don't see the 1Password icon in your browser's toolbar`
- `If 1Password cannot fill an item in your browser because its code signature or identity could not be verified`
- `If you used the password generator and can't find the password to sign in`
- `If you encounter an issue importing from LastPass`
- `If you have an issue when you try to sign in, create an account, or manage your subscription on 1Password.com`

**`If <bad thing happened>`** — the event pattern, and these are the security ones:

- `If a device you don't recognize has signed in to your 1Password account`
- `If your device was lost or stolen, and it has your 1Password data on it`

**Why the `If …` construction is the right one, and better than the alternatives.** Compare the three grammars now on record in this corpus:

| Product | Grammar | Example |
|---|---|---|
| Wise | first-person confession | `I sent money to the wrong person` |
| DigitalOcean | interrogative with the error string | `How do I fix the "Connection Refused" error…?` |
| 1Password | second-person conditional | `If you see "1Password is damaged and can't be opened"` |

The `If …` form does three things the others do not. It is **non-committal about blame** — "if you see X" attributes the string to the system, not the user, where "I did X" attributes it to the user and "how do I fix" implies the user must. It **reads correctly in a list**, because a browsing user is scanning for their own condition and each title is a testable predicate. And it **works for both symptoms and events** without changing shape, so `If you see "..."` and `If your device was lost or stolen` sit in the same list without a register break.

For a product whose failures are frightening rather than merely annoying, the conditional is also the calmest available construction: it does not assert that the bad thing has happened, only that it might have. **This is the grammatical foundation of 1Password's "calm" reputation**, and it is a cheap pattern to copy.

**Three titles break the pattern, and all three are instrumental rather than diagnostic**: `Find the version numbers for 1Password and your operating system`, `How to send a 1Password diagnostics report`, `Send an encrypted email to 1Password Support`. Imperatives, because they are things you do *in service of* getting help rather than conditions you are in. The distinction is consistent.

**One title omits its condition and is worse for it** `[observed]`: `Sign back in to 1Password after your account has been recovered` — filed under `1Password account` alongside the `If …` titles, and phrased as an imperative. Its condition (your account was recovered by an administrator) is in the subordinate clause where its siblings would have put it first. A minor inconsistency in an otherwise disciplined set.

### The three high-anxiety recovery articles, analysed

#### `If your device was lost or stolen, and it has your 1Password data on it`

**The structure is the content design.** Five H2s, in this order:

1. `Your 1Password data is safe`
2. `Don't change your 1Password account password`
3. `Change passwords for your other accounts`
4. `Access your data on other devices`
5. `Find your lost device or erase it`
6. `Regenerate your Secret Key and deauthorize the lost device`

**Section 1 is reassurance. Section 2 is a prohibition. The procedure does not start until section 6.** That ordering is deliberate and it is the single best piece of crisis content design in this harvest.

`Your 1Password data is safe` opens: "The secrets you keep in 1Password are safe from thieves and prying eyes, even if you lose a device." Then the mechanism, then — crucially — a **metadata-specific reassurance most products would never think to give**:

> "Any information *about* your passwords is also encrypted. An intruder won't be able to see, for example, that you have an account for a specific hotel website, and figure out where you stay when you travel. Everything about the items in your vaults is hidden."

The italicised *about* carries the whole point, and the worked example is domestic and specific (a hotel; where you stay when you travel) rather than abstract. A user in a panic has a concrete inference in their head — *they'll know where I bank, they'll know what I use* — and this paragraph answers that inference with a matching concrete case.

`Don't change your 1Password account password` is the prohibition, and it is remarkable. The instinct of a person who has lost a device is to change the master password; 1Password heads them off with a negative H2, then gives the reason and, in the same sentence, the exception:

> "You don't need to change your account password if you lose a device, **unless you have specific reason to believe that someone else knows it.**"

Then the mechanism ("Your account password is never stored on your device"), then a list of every unlock method that might make the reader doubt it (Touch ID, Apple Watch, Face ID, Windows Hello, biometric unlock, system authentication) — **enumerating the reader's possible objections and clearing each one** — and then an asterisked footnote that concedes the one case where the reassurance is weaker:

> "* If you use the Trusted Platform Module with Windows Hello, the password, PIN, or other method you use to unlock with Windows Hello could be used to unlock 1Password after your PC restarts."

**A footnote that partially undermines the section's own headline.** This is the Wise "claim, then bound the claim" pattern applied to a security reassurance, and it is much harder to do here because the stakes of the caveat are higher. 1Password ships it anyway, in small print, adjacent to the claim.

Section 3 then widens the scope *away* from 1Password — "Although your 1Password data is secure and private, other apps or services may not have been designed to safeguard your data in the same way. If you use other accounts on your lost device, you should change the passwords for those accounts." **The article tells the user their real problem is elsewhere**, and section 5 goes further and links out to Apple, Microsoft and Google's find-my-device tools. Four outbound links to competitors' support pages, in a 1Password help article, because that is what the user actually needs.

#### `If a device you don't recognize has signed in to your 1Password account`

Framed by its trigger: "If you receive an email from 1Password that a new device has accessed your 1Password account and you don't recognize the device, you can take steps to identify the device and secure your account, **if necessary**." The final two words do a lot — the article opens by allowing that no action may be needed.

The structure is a **numbered decision tree with explicit stop conditions**:

- `Step 1: Make sure you can sign in to your 1Password account` — three branches: can sign in → step 2; can't sign in but can unlock an app → step 2; can do neither → contact support
- `Step 2: Verify your linked apps and browsers` — two branches, and the benign one is a full stop: **"If you recognize the apps and browsers in the list, you can stop here."**
- `Step 3: Change your 1Password account password and Secret Key` — gated on "If you found linked apps or browsers you don't recognize"

**"you can stop here" is the sentence to steal.** Security-incident content overwhelmingly fails by making every reader complete every step, which trains people to ignore the whole genre. Giving the uncompromised reader explicit permission to stop, in the middle of the flow, is what makes it safe to write a long article for the minority who need it.

The `Step 3` procedure also contains a piece of **sequencing guidance that only matters because the artefacts collide**: regenerate the Secret Key, "Download a new copy of your Emergency Kit when prompted, **but don't fill in the account password field yet**", then change the password, then "You'll be prompted to download another copy of your new Emergency Kit, but you'll only need to use one. Choose either copy of your new Emergency Kit and fill in your new account password." Two operations each produce a PDF; the user ends up with two and needs one. Rather than fixing the flow, the content tells the user which to keep and when to write in it. Honest, and a reminder that this level of specificity is only reachable by someone who has actually done the task.

A `Tip` at the head of step 3 releases SSO users entirely: "If you sign in and unlock with SSO, you don't need to follow these steps. Sign back in on your devices with your identity provider." And an `Important` at the very top releases business users: "If you use 1Password as part of a team, contact your administrator for help." **Two audiences are routed out of the article before it starts.**

`Protect your data` then shifts from incident response to hygiene, in two grouped lists — three 1Password tools, three device measures (`Keep your devices, apps, and browsers up to date`, `Turn on the built-in system firewall protection`, `Scan your devices for malware using a reputable antivirus program`). The second list is generic security advice with no 1Password product attached, which is the right way to end an article for a frightened user: give them things to do that are not purchases.

**A dedicated escalation address**: `support+security@1password.com`, used three times in this article where other articles use the general contact form. A separate, memorable, plus-addressed channel for the security queue, exposed in public content.

#### `If you forgot your 1Password account password or you can't unlock the app`

**The hardest content problem in the product**, because the honest answer is "we cannot help you", and the article has to deliver that without either lying or abandoning the reader.

It does four things in order.

**1. It puts the escape hatches *before* the bad news.** A `Tip` callout, above everything: "You can ask a family or team member to recover your account, or use a recovery code if you've generated one." The two routes that actually work are offered in the first 20 words, before the article explains why the obvious route doesn't.

**2. It defines the term, then checks the easy case.** "The password you use to sign in to 1Password.com and unlock the 1Password apps is your account password." Then: "If you forgot your password and you prepared your Emergency Kit, check the password field." The cheapest possible fix, stated before any troubleshooting.

**3. `If you think you remember your account password` — a seven-item checklist of typing failures**, and it is unusually specific and unpatronising:

- "Make sure you're typing lowercase and uppercase letters correctly."
- "Type your password in another app, like a text editor, so you can see that you've entered it correctly. Then copy and paste it into 1Password."
- "If you've ever changed your account password, try previous ones."
- "If you have multiple 1Password accounts, try your other account passwords."
- "If your password has spaces, try it with and without spaces."
- "If your password has accents or special characters, try it with and without them."
- "If you use multiple languages, make sure you're using the correct keyboard layout when you enter your password."

Every one of these is a real, observed failure mode — spaces, accents, keyboard layout — and none of them is the user being stupid. **The second item tells the user to type their master password into a plain text editor**, which is against every reflex a security product has, and is correct, because the alternative is losing the vault. A calm risk trade made explicitly and without hedging.

**4. Then the flat statement, as a five-bullet list.** `If you don't know your account password or it isn't accepted` opens:

> "For your security, your account password is:
> - never transmitted over the internet
> - never logged locally
> - never known to us at 1Password
> - only known to you
> - the only way to decrypt your data"

Five short lines, lower-case, no terminal punctuation, four beginning with `never` or `only`. It reads like a specification, not like an apology. And then the consequence, in one sentence that holds both halves:

> "This makes sure that your data is safe from intruders, **but it also means that no one can reset your password.** However, you might be able to recover access to your data."

**Claim, cost, and residual hope, in three clauses.** The property is stated as a benefit; the cost is introduced with `but it also means`; and the third clause immediately prevents the reader from closing the tab. `you might be able to` is correctly hedged — not "you can", not "you can't".

The article then gives **platform-specific biometric recovery paths** (Mac/Windows/iOS/Android/Linux tabs), each ending in an `Important` callout with the same two-part structure:

> "Your ability to unlock the app with Touch ID or Apple Watch **will eventually expire**. Take action immediately to find your password or rescue your data:
> - Look for a Login item in your Personal vault named "1Password Account". It may contain your password.
> - **Export your data** from 1Password while you still have access. You can then create a new account and import your data into it."

**`will eventually expire` (bolded) plus `while you still have access`** is a time-pressure statement in a security product's help content, and it is the right one: a biometric unlock is a temporary reprieve, and a user who does not understand that will lose everything in a week. The phrase `rescue your data` is the only emotive verb in the article and it is doing deliberate work — this is a rescue, and the reader has a deadline.

The ending is a flat admission with a human next step:

> "If you tried all the steps above and still can't unlock 1Password, you'll need to start over. Contact 1Password Support."

**`you'll need to start over`.** Six words. No "unfortunately", no "we're sorry", no "we understand this is frustrating". The worst outcome in the product, named plainly, followed by a route to a person. Compare the amount of cushioning most products would apply to a total-data-loss message.

**A recovery-path option the article also documents** is data survival without account recovery: `If you can unlock the app with your previous password` walks a user through copying items into a brand-new account ("You'll need a different email address to create a new account"), five steps, ending with `Remove the old account` from the app. The article treats "keep your data, lose your account" as a legitimate and separately documented outcome.

### Cross-cutting recovery vocabulary `[observed]`

Four named recovery mechanisms, each with its own article and its own consequence disclosed:

- `Recover using a recovery code` — "After verifying your identity, you'll be able to choose a new password. **You'll also get a new Secret Key.**"
- `Recover using your family or team account` — "ask a family organizer or team administrator to recover your account, which will let you choose a new password. **You'll also get a new Secret Key.**"
- `Recover using Touch ID or Apple Watch` / `Face ID` / `Windows Hello` / `biometric unlock` / `system authentication` — temporary, expiring
- `Recover using another device` — try your password elsewhere

The repeated sentence **"You'll also get a new Secret Key."** is a consequence disclosed identically in both real recovery paths, because it invalidates every stored Emergency Kit the user has. Same sentence, both places, so a reader who skims either one still gets it.

## T8 Empty states

`[observed]` — five, all on the status page, and they include the verified/unmeasured distinction:

- `No incidents reported today.` (current day)
- `No incidents reported.` (prior days)
- `No downtime recorded on this day.` (uptime bar — measured, clean)
- `No data exists for this day.` (uptime bar — not measured)
- `No incidents or maintenance related to this downtime.` (`Related` panel)

The `No downtime recorded` / `No data exists` pair is the same good distinction recorded for Retool — inherited from the Statuspage product rather than authored by 1Password, but worth noting again because it is the pattern most in-house status pages miss.

No empty state was reachable in the support site's search or in the marketing surfaces. In-product empty states (empty vault, no search results, no Watchtower alerts, caught-up states) are behind auth. `[absent]`

## T9 Notifications & system messages

**The notification is the entry point to the security article, and the article says so** `[observed]`. `If a device you don't recognize has signed in to your 1Password account` opens: "If you receive an email from 1Password that a new device has accessed your 1Password account and you don't recognize the device, …". The help content is written **from the position of someone holding the email**, so the article and the notification are designed as one flow even though only one half is publicly visible.

**`Watchtower` is the named alerting product, and its privacy properties are published** `[observed]`

From the security model page: "**Watchtower vulnerability alerts.** 1Password can warn you when a website has been hacked – **without ever sending AgileBits a list of the websites you visit.** Learn more about how Watchtower protects your privacy."

**The alert feature's description contains its own privacy guarantee in the same sentence as its benefit.** For a breach-monitoring feature the obvious user objection is "so you know every site I have an account on" — and the sentence pre-empts it with an em-dash and a `without ever`. There is then a dedicated article, `About Watchtower privacy in 1Password`, and a second on `About rich icons and your privacy` (the icons feature has the same shape of objection: fetching favicons would reveal your sites).

In the incident-response article Watchtower is described by its job: "**Use Watchtower** to alert you about data breaches or security problems with the items you have saved in 1Password."

**Notification-channel hygiene is itself documented** `[observed]`: `1Password email and marketing domains` is a published support article. A password manager publishing the exact domains its mail comes from is anti-phishing content delivered as reference material — the user can verify a scary email is genuine without asking anyone.

**Status-page subscription copy** `[observed]`: email subscribers get "whenever 1Password **creates**, **updates** or **resolves** an incident"; SMS gets the narrower "**creates** or **resolves**"; and **webhook subscribers get a fourth event the humans do not** — "whenever 1Password **creates** an incident, **updates** an incident, **resolves** an incident or **changes** a component status." Three channels, three event sets, graded by the recipient's tolerance for volume. The webhook form also has two labelled fields with purpose-glosses: `Webhook URL` — "The URL we should send the webhooks to"; `Email address` — "We'll send you email if your endpoint fails". **A notification about the failure of your notifications**, labelled.

**Incident narrative** `[observed]`, from the 9 Sep Device Trust incident — three stages (**Investigating** → **Monitoring** → **Resolved**), timestamped in **EDT rather than UTC** (unlike every other status page in this set, which uses UTC — a customer-friendly choice for a single-HQ company and a hazard for global customers):

- *Investigating* — "We are currently investigating reports of an incident affecting Device Trust. Some customers may experience delays in device posture checks or authentication failures. We will provide an update as soon as we have more information."
- *Monitoring* — "We have identified the triggering change and have rolled it back. We are monitoring to confirm that this has completely resolved the issue."
- *Resolved* — "This incident has been resolved."

The *Monitoring* note is better than the Statuspage boilerplate: **"We have identified the triggering change and have rolled it back"** names a cause class (a change of theirs) and the remedy (rollback) in nine words. The *Investigating* note scopes impact with two named symptoms. The *Resolved* note is bare template, and — as with Retool — gives no impact window, no duration, and no cause. For a company whose flagged strength is security communication, the incident record is the thinnest content on any of its surfaces.

**In-product system message quoted** `[documented]`: `1Password is trying to unlock.` — see T5.

## T10 Disclosures, legal & compliance

**The security model page is organised as three disclosures, and the third one is the unusual one** `[observed]`: `Encryption` (what we do), `Features` (what else we do), `Transparency` (how you can check).

**`Transparency` as a peer of `Encryption`** — given equal structural weight, not appended as a trust-badge strip — is the disclosure decision to record. Its five bullets:

- "**Open data formats.** 1Password uses the open-source SQLite database format." + an outbound link to sqlite.org
- "**Trusted encryption algorithms.** 1Password uses algorithms that experts have examined and verified to keep information secure."
- "**Privacy-preserving telemetry.** Telemetry at 1Password is optional. 1Password only collects in-app usage data with your awareness and consent, using a system designed to protect your privacy."
- "**Principled privacy policy.** … Any information you share with us is only ever used to provide you with service and support."
- "**Straightforward export tools.** 1Password includes simple export tools that make it easy to move information out of 1Password. **Your data is yours, and you can leave if ever you choose to.**"

**"Your data is yours, and you can leave if ever you choose to."** — the exit right stated as a sentence, on the security page, in a paragraph about transparency rather than in terms of service. The slightly archaic `if ever you choose to` is the only ornamental construction on the page and it lands: it makes leaving sound unremarkable rather than adversarial. Directly comparable to Wise's `Your money, not ours` and arguably stronger, because it names the *action* (leave) rather than only the *ownership*.

`Telemetry at 1Password is optional.` — four words, opt-in stated before any explanation, with two dedicated articles behind it (`How to share your usage data with 1Password`, `How to manage sharing your organization's usage data with 1Password`). Note the article titles frame it as **sharing**, a thing the user does, not **collection**, a thing the company does.

**Encryption disclosures are specific to the algorithm and the parameter** `[observed]`: `256-bit AES encryption` glossed as `AES-GCM-256 authenticated encryption` ("The data you entrust to 1Password is effectively impossible to decrypt"); `PBKDF2 key strengthening` as `PBKDF2-HMAC-SHA256` ("A strong password could take decades to crack"); `128-bit Secret Key`; `Secure random numbers` ("Encryption keys, initialization vectors, and nonces are all generated using cryptographically secure pseudorandom number generators"); `Secure Remote Password (SRP)`.

**Every one of these carries a plain-language consequence clause**, so the page works for two readers simultaneously. And the SRP bullet begins by describing what *other* sites do wrong — "Most websites send your password to a server when you try to sign in, leaving it vulnerable to interception" — before stating the alternative. **Comparative disclosure: name the industry default, then the deviation.**

**The safe-deposit-box analogy is the load-bearing explanatory device** `[observed]`, and it appears in two places, developed further the second time.

On the security model page, as a small aside about key separation: "Taking this precaution is a bit like making sure the key to a safe isn't kept right next to it: Keeping the two separate makes everything more secure."

On the breach blog post, as the whole argument: "A password manager is like a safe deposit box: a secure container to put things in, stored at a fortified offsite bank, and locked with a key (your account password). If someone gains access to that bank, they can steal the box and try to pick the lock. At that point it's only a matter of time before they crack the password...and it's often much less time than we think. That's why with 1Password, your safe deposit box requires a combination of **two keys** to open, neither of which is ever seen (much less held) by 1Password."

**The analogy is set up so that the competitor's architecture is the naive version of it.** One key = box can be picked; two keys = cannot. The reader gets the differentiation and the mechanism from one image, and 1Password never has to say a competitor's name.

**Quantified, bounded risk claims** `[observed]`: "Trying to crack the combined encryption scheme provided by this dual-key approach – **even using every computer on Earth today** – would take, **conservatively, several times the known age of the universe.**"

Two hedges in one sentence (`even using every computer on Earth today`, `conservatively`) around an absurdly large number. The hedges are what make it credible: an unbounded "impossible" would be a weaker claim than a bounded, conservatively-stated, physically-framed one. And it is immediately followed by a self-aware beat — "Overkill? We don't think so. It's the least we can do…" — which pre-empts the reader's eye-roll.

**Verifiability disclosures** `[observed]`: a published Security Design White Paper as a direct PDF; a third-party security audit programme with its own support article (`Security audits of 1Password`); `How to verify the authenticity of the 1Password app` as a support article; a HackerOne bug bounty described as "our million-dollar bug bounty program is now the largest in the password manager space"; `About HIPAA and 1Password`; `About the 1Password Unencrypted Export format` (an article documenting the format of a *deliberately unencrypted* artefact — disclosure of the dangerous thing).

**Compliance and privacy furniture** `[observed]`: `Trust Center` (separate domain), `Legal Center`, `Terms of Service`, `Cookie Policy`, `Privacy Policy`, `Accessibility` (a legal-centre page, in every footer), `Your Privacy Choices` with the CCPA opt-out icon, a `Privacy support` email address distinct from customer support, and the physical HQ address printed in every footer.

**Pricing-page disclosure is the weak spot** `[observed]`. The Enterprise tab carries **no prices at all** — five `Request a quote` cards with `Pricing built for you`. The FAQ answers five structural questions about what Unified Access contains and how it differs from Enterprise Password Manager, and answers the price question with a routing sentence: "Unified Access pricing is tailored to your organization's needs and the capabilities you require. Contact our sales team to discuss your environment and receive a quote." For a product whose consumer tier has published per-month prices, the enterprise opacity is a sharp contrast, and `Pricing built for you` is doing euphemistic work.

## T11 Help-centre architecture

**Two-level: ten categories → named sub-sections → article lists.** `[observed]` The sub-section names inside the two harvested categories are the real artefact.

**`Get help` sub-sections** — named by *what broke*, in a deliberate order:

`1Password account` → `1Password app` → `1Password browser extension` → `Get help`

Account first (most consequential), then app, then extension (most common), then a residual `Get help` bucket containing the cross-cutting and the catastrophic: `Find the version numbers…`, `How to send a 1Password diagnostics report`, `If a device you don't recognize has signed in…`, `If you can't find your data…`, `If your device was lost or stolen…`, `Send an encrypted email to 1Password Support`.

**The two most frightening articles in the product are in the residual bucket**, alongside version-number lookup. That is an IA defect with real consequence: `If your device was lost or stolen` belongs at the top of the category, or in its own section, not filed under a heading that duplicates the category name.

**`Security and privacy` sub-sections**: `Get started` → `1Password features` → `1Password data formats` → `Learn more`. And `Get started` contains exactly five articles, which function as a **curated security curriculum**:

1. `About 1Password and your privacy`
2. `About the 1Password security model`
3. `About your Secret Key`
4. `How to choose a good 1Password account password`
5. `How to keep your 1Password account secure`

Privacy → architecture → the unique component → the user's one job → maintenance. Five articles, in the order a new user should read them, under a heading that says so.

**The `About the security of <feature>` programme is the most systematic content artefact in this file.** `[observed]` Roughly thirty titles follow it:

`About the security of 1Password Autofill in your browser` · `About the security of 1Password confidential computing` · `About the security of 1Password for Claude` · `About the security of 1Password in your browser` · `About the security of automated provisioning` · `About the security of linked accounts` · `About the security of recovery codes in 1Password` · `About the security of sharing items using a unique link` · `About the security of signing in to 1Password with a QR code` · `About the security of the 1Password Account Trust Log` · `About the security of the 1Password app and browser extension connection` · `About the security of unlocking 1Password with a passkey` · `About the security of using system authentication to unlock 1Password for Linux` · `About the security of using Touch ID or Apple Watch to unlock 1Password for Mac` · `About the security of using your device to unlock 1Password` · `About the security of your 1Password desktop app settings` · `About the security and privacy of adding a location to 1Password items`

Plus platform variants in a compressed form: `About Touch ID security in 1Password for iOS`, `About Face ID security in 1Password for iOS`, `About Windows Hello security in 1Password for Windows`, `About biometric unlock security in 1Password for Android`, `About Autofill security in 1Password for Android`, `About Autofill security in 1Password for iOS`, `About 1Password SCIM Bridge security`, `About 1Password Unlock with SSO security`. And design-level ones: `About the design of 1Password Credential Governance`, `About the design of 1Password item and app discovery`.

**What this represents is a content policy, not a set of articles: every feature that touches a credential ships a public security note.** Including a feature added in 2026 (`About the security of 1Password for Claude` — an AI integration) and including features whose security implications are subtle rather than obvious (`adding a location to 1Password items`; `rich icons`). A user or a security reviewer evaluating any individual convenience feature can find out what it costs them, at the feature's own name.

**Two title sub-patterns worth separating.** `About the security of X` is used for mechanisms and flows; `About the design of X` is used for two newer governance features. And `About X privacy` / `About X and your privacy` is used where the concern is disclosure rather than compromise (`About Watchtower privacy in 1Password`, `About rich icons and your privacy`, `About 1Password diagnostics information`, `About Android privacy settings and 1Password`). **Security and privacy are given different title verbs because they are different reader anxieties.**

**Article furniture** `[observed]`: breadcrumb → H1 → one-sentence deck → optional `Tip` / `Note` / `Important` callout → in-page anchor list → body → `Get more help` / `Get help` → `Learn more` link list → feedback block → `Published: <date>`.

**`Published: <date>` rather than "Updated"** — the opposite choice from DigitalOcean's `Last verified`. Dates observed: `May 14, 2026`, `July 28, 2026`, `August 17, 2026`. "Published" on a page that is demonstrably being revised (the security model page's content long predates July 2026) is the weaker label: it tells the reader when the current version shipped but not whether anyone has since confirmed it is still true.

**Callout taxonomy** `[observed]`: `Tip` (an easier route the reader may not know about), `Note` (a considered question or a caveat), `Important` (a time-limited window or a consequence). Three levels, used consistently, and — unlike Retool — named by severity rather than by topic. Here that is arguably right: in crisis content the reader needs to know *how much this matters* faster than *what it is about*.

**Routing furniture and the escalation ladder** `[observed]`: `Common topics` (three links) → ten category tiles → `Featured articles` (six) → `Visit the 1Password Support Community` → article-level `Get help` sections → `Contact 1Password Support` → `support+security@1password.com` for security. Plus `Send an encrypted email to 1Password Support` as its own documented procedure — a support channel for people who do not trust email, documented as an article.

**Learning is a separate property**: `1Password University` (`1password.university`), linked from the support footer.

## T12 FAQs

**Placement**: five questions at the foot of `/pricing` (Enterprise tab) under `Frequently Asked Questions`. Answers present in server HTML.

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | Can I buy Unified Access as a platform or purchase individual products separately? | `Yes`, then both routes confirmed and scoped to organisational need |
| 2 | Which products are included in the Unified Access platform? | Names the four constituent products |
| 3 | How is Unified Access different from Enterprise Password Manager? | A two-sentence contrast: EPM "protect and manage credentials"; Unified Access "builds on those capabilities to help govern access across people, AI agents, and machines" |
| 4 | Does Unified Access work with existing identity and security tools? | `Yes`, with two routes — browse the Marketplace, or contact sales |
| 5 | How do I get pricing for Unified Access? | Pricing is tailored; contact sales |

**Structural notes.** Five questions, and **four of the five are about the product boundary rather than about buying.** This is a packaging FAQ, and its job is to resolve the confusion created by 1Password shipping a platform whose name overlaps its flagship product. Q3 is the load-bearing one and it answers by **naming the verb difference**: `protect and manage` (EPM) versus `govern access` (Unified Access). Two verbs, one distinction, no feature list.

Q1's `Yes.` and Q4's `Yes.` both lead with the one-word answer before the qualification — the right order.

**The set is notably thin for a security product's pricing page.** Absent: anything about data residency (despite four status-page regions and three sign-up locations in the footer), anything about compliance certifications, anything about what happens to vault data at contract end, anything about migration, anything about SLA. All of those exist as content elsewhere on the site; none of it is surfaced where an enterprise buyer is deciding. **Recorded as a gap, and a contrast with Auth0**, whose pricing FAQ opens on trust and exit.

No FAQ block was found on the homepage, the security model page, or the support home. The support site's equivalent is the `Common topics` row and `Featured articles` list. `[absent]` for a general-purpose FAQ surface.

## T13 Terminology & glossary

| Term | 1Password's usage | The alternative it rejected |
|---|---|---|
| **`account password`** | The single password the user remembers, defined in place on the lockout article: "The password you use to sign in to 1Password.com and unlock the 1Password apps is your account password." | **`Master Password`** — 1Password's own former term, now fully retired from the surfaces harvested. See below. |
| `Secret Key` | The 128-bit machine-generated second factor of encryption; capitalised, always; has its own article and its own blog post | "recovery key", "device key", "account key" |
| `Emergency Kit` | The coined PDF artefact holding the sign-in address, email, Secret Key, a blank for the account password, and the Setup Code | "recovery sheet", "backup codes" |
| `Setup Code` | The QR code for mobile sign-in | "QR code" (used only in the gloss) |
| `item` | The universal noun for anything stored (a login, a card, a note, a passkey); `Login item` for the subtype | "entry", "record", "credential" (reserved for the enterprise products) |
| `vault` | The container; `Personal vault` named as the default | "folder", "collection" (though `collection` now appears as a separate app-level grouping) |
| `Watchtower` | The named monitoring product, with published privacy properties | "breach alerts", "security dashboard" |
| `Linked to your account` | The label for the list of apps and browsers with access | "Devices", "Sessions", "Authorized clients" |
| `Unlink` / `Deauthorize Device` | **Two verbs for apparently one revocation action**, used in different articles — see T5 | |
| `human` (as a noun) | A first-class identity category along`AI agent` and `machine`: "Secure access for every human and AI agent" | "user", "person", "employee" |
| `Unified Access` | The enterprise platform brand | |
| `Credential Broker` | The runtime credential-delivery product | "secrets gateway", "vault proxy" |
| `Privileged Access` | The JIT/JEA product; `Zero standing privileges` as its solution page | "PAM" (the industry acronym, avoided) |
| `Device Trust (Kolide)` | The acquired product, with the acquired brand retained in parentheses | |
| `SaaS Manager` / `shadow IT` / `Shadow AI` | The discovery products and the problems they name | |
| `Off-by-1 Labs` | The research group; a programmer's pun as a public brand | "1Password Labs", "Security Research" |
| `labs` / `exploratory features` | The beta programme and its contents | "beta", "preview", "early access" |
| `AgileBits` | The legal entity, still used inside the security model page ("even us at AgileBits", "obtaining it from AgileBits") while every other surface says `1Password` | |
| `Switch` | A one-word nav label for competitor migration | "Import", "Migrate" |
| `Account Trust Log` | A named audit artefact with its own security article | |
| `zero-knowledge password manager` | Used once, on the pricing page, as a category self-description | |
| `dual-key encryption` | The coined name for account-password-plus-Secret-Key | |
| `Trust Center` / `Legal Center` | Two named destinations for verification and legal material | |

**The retirement of `Master Password` is the terminology finding of this file.** Across all twelve pages harvested — including the article whose entire subject is having forgotten it — the term is `account password`, never "master password". And the retirement is complete rather than transitional: there is no "(formerly Master Password)" gloss anywhere observed, and the lockout article defines the new term by its function ("The password you use to sign in… and unlock…") rather than by reference to the old one.

Two readings, and both are worth recording. Generously: "master password" is jargon that also carries a needless hierarchy metaphor, and `account password` is plainer and maps to what users call passwords everywhere else. Critically: `account password` is *less* distinctive, and a user searching the web for "1Password master password" from a competitor's help article or an old forum thread may not match. **The gain in plainness is paid for in searchability**, and 1Password has apparently accepted that trade without leaving a redirect term in the content.

**`AgileBits` leaking into the security model page** is the other notable inconsistency: the single most-read trust document on the site refers to the company by a legal name that appears nowhere in the navigation, three times ("never known to us at 1Password" in the lockout article versus "even us at AgileBits" in the security model article — **two different company names making the same promise, two clicks apart**).

**Register split by surface.** Marketing says `Unified Access`, `zero standing privileges`, `just-in-time, and just-enough`, `full-attribution audit trail`. Support says `item`, `vault`, `account password`, `Emergency Kit`, `If you see…`. The blog says `safe deposit box`, `cookie recipes`, `stay skeptical`. **Three vocabularies, and the blog's is the most concrete of the three** — which is the correct inversion, because the blog is where 1Password addresses the frightened non-specialist.

## T14 Voice, tone & accessibility

**This is the priority section for this product, and the finding is that "calm" is not a tone here — it is a set of five structural rules.**

### Rule 1: Reassurance before instruction, and the reassurance is specific

`If your device was lost or stolen` opens with `Your 1Password data is safe` — a complete declarative sentence as an H2 — and does not reach a procedure until the sixth section. `If a device you don't recognize has signed in` opens by allowing that nothing may need doing ("…secure your account, **if necessary**"). The breach blog post's second paragraph is: "Here's the good news: if you're a 1Password customer, **there's nothing you need to do and no reason for you to worry.**"

And the reassurance is always **concrete rather than categorical**. Not "your data is secure" but: "An intruder won't be able to see, for example, that you have an account for a specific hotel website, and figure out where you stay when you travel." Not "we encrypt metadata" but, in the blog: "they wouldn't know if they were cracking a vault with credit cards or **cookie recipes**."

`cookie recipes` is the single most-deliberate word choice in this harvest. A sentence about an attacker holding your encrypted vault ends on a domestic, faintly funny noun, and the effect is to reset the reader's adrenaline without denying the premise. **The threat is not minimised — the attacker still has the vault — but the consequence is made mundane.**

### Rule 2: Tell the user what *not* to do

`Don't change your 1Password account password` is an H2 in the lost-device article. The reflexive action of a worried user is pre-empted, with the reason, the exception ("unless you have specific reason to believe that someone else knows it"), the enumerated objections cleared one by one, and a footnote conceding the one case where the reassurance is weaker.

Most security content is additive — here are more things to do. 1Password's is **subtractive where it can be**, which is the only way to keep a frightened person's task list short enough to finish.

### Rule 3: Give explicit permission to stop

**"If you recognize the apps and browsers in the list, you can stop here."** — mid-procedure, in the unrecognised-device article, twice (once for each of the two places the reader might be checking). Plus the two routing callouts at the top that remove team users and SSO users from the article entirely.

A long incident-response article is only responsible if the people who do not need it can leave. This is the mechanism.

### Rule 4: State the bad news flat, once, without cushioning — and then give a route

The five-bullet "never / never / never / only / only" list, followed by:

> "This makes sure that your data is safe from intruders, but it also means that **no one can reset your password.** However, you might be able to recover access to your data."

And the ending:

> "If you tried all the steps above and still can't unlock 1Password, **you'll need to start over.** Contact 1Password Support."

**There is no apology anywhere in the lockout article.** No "unfortunately", no "we're sorry", no "we know this is frustrating", no exclamation mark. The worst outcome in the entire product — permanent loss of every password you own — is delivered in six words and followed by a human. Compare the amount of emotional padding most products apply to a failed payment.

The one emotive verb in the article, `rescue your data`, is used where urgency is genuinely load-bearing (biometric unlock is expiring), which is exactly where a register shift is earned.

### Rule 5: Reassurance and risk-acknowledgement in the same sentence, with the concession never omitted

The recurring construction is **benefit → `but it also means` / `unless` / `while` → cost**:

- "This makes sure that your data is safe from intruders, **but it also means** that no one can reset your password."
- "You don't need to change your account password if you lose a device, **unless** you have specific reason to believe that someone else knows it."
- "Export your data from 1Password **while you still have access.**"
- "Your ability to unlock the app with Touch ID or Apple Watch **will eventually expire.**"
- "Although your 1Password data is secure and private, other apps or services may not have been designed to safeguard your data in the same way."
- The Trusted Platform Module footnote, which partially undoes its own section's headline.

**So: does 1Password use reassurance, plain fact, or both?** Both, and in a fixed order — **reassurance first and specific, plain fact second and unhedged, cost disclosed in the same sentence as the benefit, and no apology at any point.** The reassurance is never allowed to stand without the concession, and the concession is never allowed to stand without a next step.

### Where the calm register breaks — and it is instructive

The blog post is the one surface with a visibly different voice, and it is **more emotive, more rhetorical, and more marketing-adjacent** than the support content:

- "As data breaches become increasingly common and **scary headlines** hit the news, you may be feeling **a bit uneasy.**"
- "you can **rest easy** knowing that…"
- "**Overkill? We don't think so.** It's the least we can do…"
- "**Stay skeptical**" — as an H2
- "At the end of the day, **trust is earned.** So while we could ask you to simply trust us, **we won't.**"
- "**We want you to stay skeptical**, and we love it when you ask us the tough questions about how everything works."
- "Whatever you do, **don't settle for "good enough"** – we certainly don't. Because when it comes to protecting your most precious information, **"good enough"...isn't good enough.**"
- "Ready to give 1Password a try?" → `Get started`

**`Stay skeptical` is the strongest move on the page and the riskiest.** A security vendor instructing the reader *not* to take its word, twice, and then listing the four verification routes (white paper, third-party audits, bug bounty, published assessments) — "In other words, when we say we protect your data, you don't have to take our word for it." That is trust-building by refusing the request for trust, and it is only credible because the four routes are real and linked.

But the same page closes on ellipses, a rhetorical repetition ("good enough"...isn't good enough), an em-dash aside, and a product CTA. **The calm register holds absolutely in the support content and relaxes into persuasion in the blog** — which is defensible (the blog's reader is evaluating, not panicking) and is worth recording as a deliberate gradient rather than a failure. The same three-part structure survives in both (reassure, explain, verify); only the ornamentation differs.

### Feedback micro-copy — the most distinctive strings in the file

Every support article ends with:

> `Was this article helpful?`
> `Yes, thanks!` / `Not really`

and then **two differentiated follow-ups**, one per branch:

> (Yes) "Glad to hear it! If you have anything you'd like to add, feel free to contact us."
> (No) "Sorry to hear that. Please contact us if you'd like to provide more details."

Four things here. The options are written **in the reader's voice, not the system's** — `Yes, thanks!` is what a person says, where every other product in this set ships a bare `Yes`. `Not really` is a **softened negative**, which lowers the cost of pressing it and therefore probably raises the response rate on the branch that matters. The follow-ups are **differentiated by branch** rather than a single generic thank-you. And the "no" follow-up asks for detail while the "yes" follow-up merely permits it — the invitation is calibrated to which answer is useful.

`Sorry to hear that.` is the one apology 1Password does issue, and it is for a bad *article*, not for a bad *outcome*. The register discipline is exact: apologise for your own content, never for the user's misfortune.

### Person, tense, and the treatment of the company

Second person throughout, and unusually possessive — `your data`, `your vaults`, `your devices`, `your Emergency Kit`, `your Secret Key`, `your account password`. The possessive is doing ownership work, and it pays off in `Your data is yours, and you can leave if ever you choose to.`

First-person plural for the company, and used in the *negative* commitments: "never known to us at 1Password", "1Password can warn you when a website has been hacked – without ever sending AgileBits a list of the websites you visit", "neither of which is ever seen (much less held) by 1Password", "we won't [ask you to trust us]". **The company appears in its own copy mainly at the moments it is promising not to do something**, which is the correct place for a zero-knowledge product to be visible.

Contractions used freely (`can't`, `won't`, `you'll`, `don't`, `Here's`, `wouldn't`). Sentences short. No exclamation marks in support content; three in the blog and one in `Yes, thanks!`.

### Accessibility content `[observed]`

- **`Accessibility` is a permanent footer link on every page**, pointing at `/legal/accessibility` — filed under legal rather than support, which suggests a conformance statement rather than a help resource. The page itself was not harvested.
- `Skip to Main Content` present and first in DOM on marketing and blog pages (`#main`). **Absent from the support site's server HTML** — the surface a distressed user actually reads is the one without the skip link. Flagged as a real defect.
- Support articles are **genuinely well structured for non-visual reading**: single H1, one-sentence deck, in-page anchor list before the body, semantic H2/H3 nesting, numbered procedures with one action per step, and — importantly — **every screenshot is supplementary rather than load-bearing**. Every instruction is complete in text; the images show what the text describes. A screen-reader user can complete the lost-device recovery without seeing anything.
- Alt text on support screenshots is descriptive of the state being illustrated: `1Password lock screen when the account password isn't accepted`, `1Password is trying to unlock`, `Select the Touch ID button on the lock screen`, `Touch ID button in 1Password for iOS`, `Unlock 1Password biometric prompt`, `Mac language settings`, `Windows language settings`, `Authenticate to unlock 1Password prompt`. **The alt text names the condition, not the widget** — consistent with the article titles.
- **Inline icon images inside step text carry alt describing the control**: "select ![the Windows Hello button]" and "select ![the unlock with fingerprint button]" — so a step that says "select this icon" still reads as a sentence.
- **Defect**: several procedure steps reference an unnamed icon with no textual fallback — "select the gear button next to your lost or stolen device" appears with a line break where an inline image sits, and in the unrecognised-device article the same pattern occurs twice. The word "gear" carries it, barely.
- **Defect**: the homepage's two hero screenshots carry **empty alt** despite being the only illustration of the product (`Dashboard__1_.webp` and a raw filename `Screenshot_2026-01-29_at_3.28.02 PM.png` — an unrenamed screenshot shipped to the homepage). Likewise all four product-card images (`01_2x.webp` … `04_2x.webp`) have empty alt. The marketing site's images are decorative-by-omission; the support site's are properly described. **The accessibility quality inverts against the commercial importance of the page.**
- Customer/partner logos on the homepage do carry alt (`Oracle Red Bull Racing vehicle`, `Oracle Red Bull Racing logo`) — but the second one's file is named `reddit-logo-2x.webp`, i.e. the Red Bull logo is being served from a Reddit logo's asset path. Cosmetic, but it suggests the alt text and the asset were not reviewed together.
- A **`Your browser is out of date` banner** with the image alt `Your browser is out of date` renders in the server HTML of every support page — a permanent, unconditional warning banner on the support site, shown regardless of browser. A false alarm on the surface where 1Password most needs to be believed.
- `?openChat` query-parameter links are used for the feedback follow-ups — a chat launcher triggered by URL, which is good for linkability and depends entirely on the chat widget's own accessibility (not inspected).
- **Locale inconsistency across surfaces** `[observed]` and worth recording as an internationalisation defect: the marketing footer offers ten locales (`Deutsch`, `Español`, `Français`, `Italiano`, `日本語`, `한국어`, `Português`, `简体中文`, `繁體中文`, `English`); the support site offers seven and **a different set** (`Deutsch`, `Español`, `Français`, `Italiano`, `日本語`, `Pусский`, `English`) — Russian exists in support but not marketing; Korean, Portuguese and both Chinese variants exist in marketing but not support. And at the *article* level the coverage collapses further: `forgot-account-password` and `emergency-kit` offer only `Français`; `lost-device` and `unrecognized-device` offer **no translation at all**. **The two articles a non-English-speaking user reads during a security incident are English-only**, on a product sold in ten languages.
- No published content style guide, voice-and-tone documentation, or design system was found. `[absent]` — notable, given that the `If …` title grammar and the `About the security of <feature>` programme are plainly the output of a written standard.

### Negative findings, recorded honestly

- `Deauthorize Device` (lost-device article) vs `Unlink` (unrecognised-device article) for what appears to be one revocation action, unexplained, in the two articles a compromised user reads.
- `AgileBits` vs `1Password` as the company making the same never-know-your-password promise, on two pages.
- `Master Password` fully retired with no bridging term left for searchers.
- The support site's navigation still advertises `Tour` and `Families` as top-level items the marketing site has retired.
- `Get help` is both a category name and a sub-section name inside it, producing the breadcrumb `Get help → Get help`.
- The two most consequential articles (`lost or stolen`, `unrecognized device`) are filed in the residual `Get help` sub-section next to `Find the version numbers…`.
- `Try 1Password FREE` with shouted caps, on the support site only.
- `Saving password and other items` — missing plural, on the status page.
- `Enterprise` listed as a peer of three geographic regions on the status page.
- Status incident timestamps in `EDT` where every comparable status page uses UTC.
- The `Resolved` incident note is bare boilerplate with no impact window, duration or cause.
- `Skip to Main Content` absent from support-site server HTML.
- Homepage product imagery has empty alt; one homepage asset is an unrenamed `Screenshot_2026-01-29_at_3.28.02 PM.png`.
- A permanent `Your browser is out of date` banner in every support page's HTML.
- Blog "Continue Reading" card renders **two headlines concatenated** — `We can do better: The tech industry and its response to data breaches December 6, 2021Secret Key: What is it, and how does it protect you?` — and links to `/blog/what-the-secret-key-does`, i.e. the card shows one article's title and navigates to a different article. A recommendation widget mismatching title and destination, on the page most likely to be read by a prospect verifying trust claims.
- The breach blog post is dated `January 10, 2023` and is still the canonical public breach explainer linked from a support article published `August 17, 2026` — three-year-old content in the trust-critical position, with `Published`/`modified_time` identical so no revision is claimed.
- Enterprise pricing is entirely quote-gated with `Pricing built for you` as the euphemism; the pricing FAQ omits data residency, certifications, SLA, and end-of-contract data handling.

---

## Transferable patterns

1. **`If <condition>` as the universal troubleshooting-title grammar.** `If you see "<literal string>"` for system messages, `If you can't <do thing>` for capability loss, `If <bad thing happened>` for events. Non-committal about blame, scannable as a list of testable predicates, and it handles symptoms and catastrophes in one register. For products whose failures frighten rather than annoy, this is the calmest available construction — and the cheapest of these patterns to adopt.
2. **Reassurance before instruction, and make the reassurance concrete.** Lead a crisis article with a complete declarative sentence (`Your 1Password data is safe`), then answer the specific inference the reader already has in their head ("they won't be able to see that you have an account for a specific hotel website, and figure out where you stay when you travel"), not the abstract claim.
3. **Tell the user what *not* to do, as a heading.** `Don't change your 1Password account password`, with the reason, the exception in the same sentence, every likely objection enumerated and cleared, and a footnote conceding the one case where the reassurance is weaker. Subtractive crisis content keeps the task list short enough to finish.
4. **Give explicit permission to stop, mid-procedure.** "If you recognize the apps and browsers in the list, you can stop here." Plus routing callouts at the top that remove the audiences the article is not for. A long incident-response article is only responsible if the people who do not need it can leave.
5. **State the worst outcome flat, once, and never apologise for it.** "no one can reset your password" · "you'll need to start over" · then a route to a human. No "unfortunately", no "we're sorry", no exclamation mark. Reserve your one apology for your own content quality (`Sorry to hear that.` on a "not helpful" vote), never for the user's misfortune.
6. **Benefit and cost in the same sentence, joined by `but it also means`.** "This makes sure that your data is safe from intruders, but it also means that no one can reset your password. However, you might be able to recover access to your data." Claim, cost, residual hope — three clauses, in that order, with the third correctly hedged (`you might be able to`).
7. **Name status-page components after the user's interrupted task.** `Syncing items between your devices` · `Saving password and other items` · `Access to passwords and other items`. A non-technical user can self-diagnose from the status page, which is otherwise the least usable artefact most consumer products ship. Condition: works for consumer-facing components; the API and admin components can keep system names, and 1Password's own page does exactly that.
8. **Ship a public security note per feature, at the feature's own name.** `About the security of <feature>` applied to ~30 features, including the subtle ones (`adding a location to 1Password items`, `rich icons`) and the newest ones (`1Password for Claude`). Use `About the design of X` for governance mechanisms and `About X privacy` where the concern is disclosure rather than compromise — three title verbs for three reader anxieties.
9. **Teach secure physical behaviour by analogy to documents the reader already protects.** "keep in a safe deposit box or with your passport or birth certificate" · "Give a copy to someone you trust, like your spouse or someone in your will." The reader does not need a threat model; they need a shelf they already use.
10. **When the right answer genuinely depends on the user's threat model, ask the question and decline to answer it.** `Should I write down my 1Password account password?` supplies the two considerations, refuses to prescribe, and then covers the riskier branch anyway ("If you don't write it down, it's still important to keep a copy of your Emergency Kit").
11. **Build the differentiation into a single physical analogy, so you never name a competitor.** Safe deposit box, one key versus two. The competitor's architecture becomes the naive version of your own image.
12. **Hedge a large security claim to make it credible.** "even using every computer on Earth today – would take, conservatively, several times the known age of the universe." The two hedges are what stop it reading as marketing. Then pre-empt the eye-roll: "Overkill? We don't think so."
13. **Refuse the request for trust, then list the verification routes.** "while we could ask you to simply trust us, we won't." · `Stay skeptical` as a heading · white paper, third-party audits, bug bounty, published assessments, all linked. Only works if the routes are real.
14. **Attach a feature's privacy guarantee to the same sentence as its benefit.** "1Password can warn you when a website has been hacked – without ever sending AgileBits a list of the websites you visit." Pre-empt the obvious objection with an em-dash and a `without ever`, then link to the dedicated article.
15. **Write feedback controls in the reader's voice, with a softened negative and branch-differentiated follow-ups.** `Yes, thanks!` / `Not really`, then "Glad to hear it! …feel free to…" versus "Sorry to hear that. Please… if you'd like to provide more details." The invitation is calibrated to which answer is useful.
16. **Name the product's exit right as a sentence, on the security page.** "Your data is yours, and you can leave if ever you choose to."
17. **Link out to competitors' and platform vendors' help pages when that is what the user needs.** The lost-device article sends the reader to Apple, Microsoft and Google's find-my-device tools, and tells them their real exposure is in their *other* accounts.

## Caveats & gaps

- **`1password.com/security` was not harvested.** The marketing security page — likely the most-read trust artefact after the support security model page — is unharvested, as is the **Security Design White Paper PDF** (`1passwordstatic.com/files/security/1password-white-paper.pdf`), which the brief named as a priority source. The white paper's register, structure, and audience calibration are therefore **not assessed**; the security *model* support article was used as the nearest public equivalent and is marked as such throughout.
- **`trust.1password.io` (Trust Center) and `/legal/accessibility` were not harvested.** The accessibility statement's contents, and whether a VPAT exists, are unknown.
- **Only the Enterprise pricing tab was harvested.** `/pricing/business` and `/pricing/personal` carry the actual per-seat and per-month figures, plan names, family-member allowances, and trial terms — all unharvested. T10's pricing analysis is therefore about the enterprise surface only, and the "no prices at all" finding should not be read as applying to the consumer tiers.
- **One breach-communication artefact, and it is three years old.** The post captured (`January 10, 2023`) is the canonical *hypothetical*-breach explainer. 1Password's public surfaces also reference `What if 1Password gets hacked?` (April 2020) and `We can do better: The tech industry and its response to data breaches` (December 2021), neither of which was opened. **No actual incident-disclosure post was harvested**, and 1Password states in the post that it "has never had a breach", so the harvest documents how it talks about a breach it has not had — which is a different content problem from post-incident disclosure. Any conclusion about 1Password's *actual* breach-notification register would need the 2023 secrets-automation incident communications or equivalent, which were not located.
- **All in-product copy is `[documented]`.** Control labels, the lock screen, toasts, Watchtower alert copy, the Emergency Kit PDF's own on-document text, and every authenticated empty state are quoted from support prose or not seen. The support site bolds UI strings consistently, making it a reliable second-hand record.
- **The support site's search was not exercised**, so its no-results empty state is unharvested.
- Eight of the ten support categories were not opened (`Using 1Password`, `Families`, `Billing and subscriptions`, `Businesses`, `Managed Service Providers`, `Developers`, `SaaS Manager`, `Device Trust`), as was `category/getting-started`. The T11 sub-section analysis rests on the two categories most relevant to the assigned focus.
- **`1password.dev` (developer documentation) was not harvested** — a significant gap for a `DEV`-domain product, since the CLI, Connect, Service Accounts and secrets-management docs live there and would carry their own error and status vocabulary. **No error codes are recorded in this file because none were observed**; 1Password's consumer surfaces expose literal error *strings* (via the `If you see "…"` titles) rather than codes.
- The `Deauthorize Device` / `Unlink` distinction is recorded as a suspected defect. It is possible the two operations are genuinely different (device authorisation vs. app/browser linkage) and that an unharvested article explains it; neither of the two articles that use the terms does.
- Accessibility findings on missing skip links, empty homepage alt, and inline-icon fallbacks are **confirmed from the extracted markup**; findings about the chat widget's accessibility and about ARIA handling are **not assessed** — no attributes, CSS, or accessible-name computation were inspected.
- Locale coverage was established from footer link inventories, not by loading translated pages. Whether the translated articles are complete, current, or machine-translated is unverified.

## Sources

1. https://1password.com/
2. https://1password.com/pricing
3. https://support.1password.com/
4. https://support.1password.com/category/troubleshooting/
5. https://support.1password.com/category/security/
6. https://support.1password.com/1password-security/
7. https://support.1password.com/forgot-account-password/
8. https://support.1password.com/lost-device/
9. https://support.1password.com/unrecognized-device/
10. https://support.1password.com/emergency-kit/
11. https://status.1password.com/
12. https://1password.com/blog/how-1password-protects-your-data
