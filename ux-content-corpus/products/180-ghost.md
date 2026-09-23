# 180. Ghost

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Open-source publishing platform with built-in memberships and paid subscriptions; sold both as software you host and as managed hosting (Ghost(Pro)) |
| Primary URL | https://ghost.org/ |
| Corpus rank | 180 |
| Benchmark strength (source list) | Publishing and membership workflows |
| Locale / market observed | en-US, USD pricing |
| Platform observed | Web (marketing, pricing, Ghost-hosted help centre, incident.io status page) |
| Regulatory posture | No financial regulator — Stripe is the merchant of record for member payments and Ghost charges 0% on top. Cookie-consent obligation is disclaimed to the operator (see T10). Ghost Foundation is a non-profit; `Non-Profit Foundation`, `Open Source` and `Carbon Neutral` badges appear in the footer |
| Auth state | Unauthenticated public surfaces only |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Good. Ghost's help centre is a Ghost site and fully server-rendered, so article bodies were readable — T5, T6 and T13 rest on article text, not titles alone. Not harvested: docs.ghost.org (the developer/self-hosting documentation), the changelog, the resources library, `/creators`, `/publishers`, `/business`, and most of the 60+ manual articles. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://ghost.org/ | Hero, four capability sections, three audience bands |
| Pricing | https://ghost.org/pricing/ | Four Ghost(Pro) plans, 8-section feature comparison with tooltip prose |
| Help centre home | https://ghost.org/help/ | Three-topic entry with four curated links each |
| The Ghost Manual | https://ghost.org/help/manual/ | **The full topic tree — 9 groups, 50 articles** |
| Publishing and scheduling | https://ghost.org/help/publishing-content/ | Publish-state vocabulary |
| Create paid tiers | https://ghost.org/help/tiers/ | Tier model and archiving |
| Setting up members | https://ghost.org/help/setup-members/ | The four access states |
| Member management | https://ghost.org/help/member-management/ | **The filter taxonomy — richest state source** |
| Creating discount and trial offers | https://ghost.org/help/offers/ | Offers, trials, retention offers |
| FAQ topic | https://ghost.org/help/topic/faq/ | 38 articles with summaries |
| Status | https://status.ghost.org/ → ghoststatus.org | Seven components, plus a live phishing warning |

---

## T1 Navigation & IA labels

**Global nav — three items, and the first two open panels** `[observed]`

`Product` · `Explore` · `Resources` · `Pricing` · `Sign in` · `Get Started — free`

**`Product` expands to four audience segments, not four features** `[observed]`

| Label | Gloss (verbatim) |
|---|---|
| `For Creators` | "YouTubers, bloggers, podcasters, musicians & artists" |
| `For Publishers` | "Writers, journalists, local news and new media outlets" |
| `For Business` | "Modern brands & companies with ambitious content marketing" |
| `For Developers` | "Source code, documentation, guides and tutorials" |

**The `Product` menu contains no products.** It contains four reader-identities, each glossed with a list of concrete job titles. A visitor self-selects by *who they are* before seeing a single feature name. That is the clearest expression of the two-operator problem this brief asked about — except it is four operators, not two, and the fourth (`For Developers`) routes off-site to `docs.ghost.org`.

**Note the gloss-list construction:** every one is a comma-run of three-to-five concrete nouns ending in an ampersand pair (`musicians & artists`, `companies with ambitious content marketing`). No abstractions. A podcaster reads "podcasters" and stops looking.

**A second set of glosses exists for the same four links in the mobile menu, and they are different** `[observed]`:

| Label | Desktop gloss | Mobile gloss |
|---|---|---|
| `For Creators` | "YouTubers, bloggers, podcasters, musicians & artists" | "Join thousands of creators using Ghost to share their work" |
| `For Publishers` | "Writers, journalists, local news and new media outlets" | "The platform for independent publishers" |
| `For Business` | "Modern brands & companies with ambitious content marketing" | "Content marketing for modern business" |

**Desktop glosses list who you are; mobile glosses make a claim.** Two descriptions for one link, differing by viewport. Whether this is deliberate (more room to enumerate on desktop) or drift is not determinable, but the desktop versions are strictly more useful and the mobile ones are closer to advertising copy.

**`Resources` panel — eight entries, all with glosses** `[observed]`: `Marketplace` ("Professional themes, custom integrations and qualified experts") · `Start here` **New** ("A huge library of guides, stories, interviews and tips for success") · `Themes` · `Help center` ("Get help with product features and answers to common questions.") · `Integrations` · `Product updates` ("All the latest changes and improvements to Ghost") · `Experts` ("Get help building your site from certified Ghost developers") · `About us` ("Learn more about the people behind the platform (**We're hiring!**)").

**`(We're hiring!)` inside a navigation gloss** is a recruiting message in the IA. Same bracketed-aside habit Carrd has, used for a different purpose.

**`Explore` is a top-level nav item pointing off-domain** to `explore.ghost.org` — a public directory of sites running on Ghost. **A discovery network promoted to peer status with `Product` and `Pricing`.** It reappears in the pricing table as a feature: `Ghost Explore network` — "Your site will be featured in the Ghost Explore directory, so that more new readers can discover your content." **Distribution is sold as a platform benefit, and the nav makes it browsable before you buy.**

**Footer — five groupings, and the shape is the tell** `[observed]`

| Grouping | Contents |
|---|---|
| `Product` | `Creator platform` · `Theme marketplace` · `Integrations` · `Experts` · `Ghost for news` |
| `Developers` | `How to install Ghost` · `Core concepts` · `Ghost hosting` · `API documentation` · `Security overview` · `Source code` |
| `Resources` | `Ghost tutorials` · `Resources` · `Ghost reviews` · `Open Subscription Platforms` |
| `Comparisons` | `Ghost vs Substack` · `Ghost vs BeeHiiv` · `Ghost vs WordPress` · `Ghost vs Medium` · `Ghost vs Patreon` · `Ghost alternatives →` |
| `Support` | `Help center` · `Community forum` · `Status ▲ 99.9%` |

**`Developers` is a top-level footer grouping whose first link is `How to install Ghost` and whose last is `Source code` (GitHub).** This is the self-hosting audience given equal footer real estate to the paying one — and note that `Ghost hosting` (the commercial product) is listed *inside* the Developers grouping, pointing at `/pricing/`. **The commercial offer is presented to developers as one deployment option among several, in a list that starts with "install it yourself".** See T13 for how this shapes the whole vocabulary.

**`Ghost alternatives →`** is a footer link. **Ghost publishes a page of its own alternatives.** Combined with `Ghost vs Patreon` (a membership platform, not a publishing one), the comparison set defines the category as *audience-monetisation* rather than *blogging*.

**`Open Subscription Platforms`** links off-domain to `opensubscriptionplatforms.com` — a manifesto/standard Ghost co-authored. A movement link in the footer.

**Status link carries live data as its label** `[observed]`: `Status ▲ 99.9%`. The uptime figure is in the footer link text on every page.

**Three trust badges, rendered as images with alt text** `[observed]`: `Non-Profit Foundation` · `Open Source` · `Carbon Neutral` (linking to a Stripe Climate page). **Governance, licence and environmental posture as footer badges**, in the slot most products use for SOC 2 and PCI.

**Help centre — three topics only** `[observed]`

| Topic | Scope line (verbatim) |
|---|---|
| `Ghost manual` | "Everything you need to know to customize your site, publish content & launch memberships." |
| `Ghost(Pro)` | "Help articles for Ghost(Pro) customers for billing, login issues, custom domains, and more." |
| `FAQ` | "Answers to some of the most commonly asked questions about Ghost." |

**The three-topic split is the self-hosting-vs-managed split, made structural.** `Ghost manual` documents *the software*, which everyone has. `Ghost(Pro)` documents *the hosting service*, which only paying customers have. `FAQ` covers both. **A user who self-hosts knows, from the top-level IA, that exactly one of three topics does not apply to them** — and the scope line says so explicitly ("Help articles for Ghost(Pro) customers").

This is the cleanest solution in the corpus to a genuinely hard problem: one product, two commercial relationships, one help centre. Compare Framer and Typeform, which have one audience and still produce muddled category scopes.

**Each help topic surfaces four curated links on the home page rather than a full list** `[observed]`:

- Manual → `Setting up your site →` · `Intro to the editor →` · `Setting up members →` · `Customize Portal →` · then `Read the manual`
- Ghost(Pro) → `Manage your Ghost(Pro) subscription →` · `Change ghost.io subdomain →` · `Transfer site ownership to another user →` · `Adding a custom domain →` · then `Read more`
- FAQ → `Are there any transaction fees? →` · `Can I use embeds in email newsletters? →` · `Why is my member's email disabled? →` · `Do I need to add a cookie notice to my site? →` · then `Read the FAQ`

**Four hand-picked entry points per topic, then the full list.** The four FAQ picks are revealing: a commercial question, a technical limitation, a member-health question, and a legal-obligation question. That is a support-load map in four links.

**The Ghost Manual's topic tree — nine groups, 50 articles** `[observed]`, and it is the best-organised IA in this batch:

| Group | Articles |
|---|---|
| `Getting started` | `Site setup` · `Invite your team` · `Importing content` · `Site navigation` |
| `Publishing` | `Intro to the editor` · `Cards` · `Posts` · `Pages` · `Tags` · `Protected content` · `Snippets` · `Post settings` · `Publishing and scheduling` · `Organizing content` · `Markdown guide` · `Keyboard shortcuts` · `Ghost Bookmarker` |
| `Memberships` | `Setting up members` · `Customizing Portal` · `Importing members` · `Embeddable signup forms` · `Welcome pages` · `Welcome emails` · `Comments` · `Member management` · `Member impersonation` · `Recommendations` |
| `Payments` | `Connecting Stripe` · `Creating paid tiers` · `Tips & donations` · `Free trials` · `Complimentary plans` · `Offers` · `Gift subscriptions` · `Google Pay` · `Apple Pay` |
| `Newsletters` | `Setting up email newsletters` · `Newsletter template settings` · `Audience feedback` · `Delivering emails` · `Updating links in newsletters` · `Deliverability tips` |
| `Design` | `Design settings` · `Installing themes` · `Site search` · `Announcement bar` · `Adding styles with code injection` |
| `Advanced settings` | `History log` · `Redirects` · `Integrations` · `Exports` · `SEO` · `Spam filters` · `Reset authentication` |
| `Growth & analytics` | `Native analytics` · `Post analytics` · `Member sources` · `Disabling analytics` |
| `Labs` | `Automations (beta)` |

**`Memberships`, `Payments` and `Newsletters` are three separate top-level groups.** Most publishing tools would fold all three into "Monetisation" or "Audience". Ghost separates *who your people are* (Memberships), *how money moves* (Payments), and *how content is delivered* (Newsletters) — and the separation is correct, because a Ghost operator can have members with no payments, payments with no newsletter, or a newsletter with no members.

**`Labs` as a group containing exactly one beta feature** is a small, honest structure: unreleased work gets its own named shelf rather than being mixed into the manual.

**The full topic tree is rendered as a persistent left sidebar on every help article**, so a user reading about `Offers` can see `Free trials`, `Complimentary plans` and `Gift subscriptions` three lines away. **Adjacency is doing disambiguation work** — the four near-synonymous payment concepts are legible as a set.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `Turn your audience into a business.`

**Five words, one imperative, a full stop.** No subhead in the heading slot — the explanatory paragraph sits below the video:

> "Ghost is a powerful app for professional publishers to create, share, and grow a business around their content. It comes with modern tools to build a website, publish content, send newsletters & offer paid subscriptions to members."

**Sentence two is a four-item capability list joined by commas and an ampersand**, and it is the product definition: website, content, newsletters, paid subscriptions. Those four map exactly onto four of the manual's nine groups. **The marketing sentence and the help IA are the same taxonomy.**

`Turn your audience into a business` is the strongest hero in this batch because it names a *transformation between two things the reader already has words for*. Not a feature, not a category, not a claim — a conversion. Compare Framer's definition sentence and Typeform's continuity headline.

**Section headers follow a two-line pattern: a short imperative label, then a benefit sentence** `[observed]`

| Label | Headline beneath |
|---|---|
| `Easy site design` | `Complete control over *your* website and branding.` |
| `Advanced creator tools` | `Publish by web & email newsletter.` |
| `Grow your audiences` | `Transform those clicks into contacts.` |
| `Run your business` | `Manage your memberships.` |
| `Integrations` | `Works with everything.` |
| `Built to last` | `A product you can depend on.` |

**Six two-part headers. Every second line ends in a full stop; every first line does not.** The label is a category, the sentence is a promise. And note `Complete control over *your* website` — the possessive is italicised in the source, the only emphasised word in the marketing copy.

`Transform those clicks into contacts.` is the membership thesis in five words, and it is reused almost verbatim on the Business band (`Turn clicks into contacts with native lead gen & analytics`). **Same metaphor, two audiences, one substitution.**

**The three audience bands are the clearest audience-segmented copy in the corpus** `[observed]`

| Band | Header | Sub-line |
|---|---|---|
| `Publishers` | `A newsletter is just the start` | "Build your own independent media business" |
| `Creators` | `Escape the algorithm` | "Your audience, brand, and revenue – owned entirely by you" |
| `Businesses` | `Content marketing you can measure` | "Turn clicks into contacts with native lead gen & analytics" |

**`Escape the algorithm` is the best three-word value proposition in this batch.** It names the enemy (platform distribution), assumes the reader's grievance, and requires no explanation to anyone who has posted anything online since 2018. The sub-line then converts the negative into three owned nouns: `Your audience, brand, and revenue – owned entirely by you`.

Each band carries four named customers with a category and a metric `[observed]`: `404 Media` (Technology, 123K members) · `Tangle` (Politics, **\$281K MRR**) · `Platformer` (Technology, 197K members) · `The Lever` (Politics, 149K members) · `Gone With The Wynns` (Travel, 27K members) · `Creator Science` (Business, **\$39K MRR**) · `DESK Magazine` (Design, 29K members) · `Jeff Su` (Productivity, 15K members) · `YCombinator`, `Kickstarter`, `Buffer`, `Unsplash` (no metric).

**Publishing named customers' monthly recurring revenue, by name, on the marketing page** is unusual and aggressive social proof. Two of eight creator/publisher cards show MRR; the rest show member counts. Businesses show neither. **The metric shown is the one the audience segment cares about**, and for businesses neither number is the point.

**The closing positioning statement** `[observed]`

> `Built to last` — "A product you can depend on. Ghost is open source, independent, and funded 100% by its users.
> **No investors. No bullshit.**"

**`No investors. No bullshit.` is the bluntest line in this entire corpus batch**, and it is on the home page of a company in the AI/creator category. Two two-word negations, both full-stopped. It works because the first is a verifiable structural fact (non-profit foundation, no VC) and the second is the conclusion the reader draws from it — Ghost states the premise and the inference in six words.

Note how the rest of the sentence earns it: `open source`, `independent`, `funded 100% by its users`. Three claims, all checkable, then the swear.

**Revenue-scale claim** `[observed]`: `$100,000,000+` — "Revenue earned each year by publications running on Ghost, **with 0% payment fees**." The claim and the differentiator in one caption.

**Closing CTA block** `[observed]`

> `Launch your big idea`
> "Last week, **29,074** brand new publications got started with Ghost. **Today, it's your turn.**"

A precise, recent, rolling number plus a second-person turn. `29,074` rather than "thousands" — the specificity is the trust device, and `Last week` makes it current rather than cumulative.

**Pricing page framing** `[observed]`

> Eyebrow: `Ghost(Pro) plans & pricing`
> H1: `Launch your creative business`
> Sub: `No payment fees — upgrade, downgrade, or cancel anytime.`

**`upgrade, downgrade, or cancel anytime` is in the pricing page's subheading, above the fold, before any plan.** Ghost is **the only product in this batch that states cancellation on the pricing page at all**, and it states it in the second line, in the same breath as the fee claim, with `downgrade` named alongside `cancel`. Framer, Typeform, Tally and Carrd all omit it entirely. See T10.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Started — free` | Global nav, every page | Em-dash + lowercase qualifier; **bolded in source** |
| `Sign in` | Global nav | |
| `Existing customer? Sign in` | Mobile menu | The question pre-empts the wrong door |
| `Try Ghost completely free for 14 days →` | Home, below hero paragraph | Full sentence with duration |
| `Try for free` | Pricing, all four plan cards | Identical across four plans |
| `Get in touch` | Pricing, Custom plan | A `mailto:` with a pre-filled subject |
| `Start publishing now →` | Closing CTA, home and pricing | Verb names the activity, not the signup |
| `Explore Ghost themes →` | Home, design section | |
| `Explore the integrations library →` | Home, integrations | |
| `Learn more →` | Home, ×3 (one per audience band) | Each carries a distinct `title` attribute — see below |
| `Read the manual` / `Read more` / `Read the FAQ` | Help centre, one per topic | Three variants, one pattern |
| `Read more` | Home manual cards, ×4 | |
| `Continue →` | Referral banner | |
| `Give us some feedback` | Foot of every help article, under `Was this article helpful?` | |
| `Next up →` | Foot of every help article | **Broken — see below** |
| `View history` | Status page | |
| `Support center` | Status page header | |

**`Learn more →` appears three times on the home page and is disambiguated by `title` attributes, not by link text** `[observed]`: `title="Learn more about Ghost for Publishers"`, `"Learn more about Ghost for Creators"`, `"Learn more about Ghost for Businesses"`.

**This is a partial fix and worth recording as such.** The `title` attribute is not announced by all screen readers, is invisible to sighted users until hover, and is not exposed in a links list. Three identical `Learn more` links on one page is the exact failure the Wise exemplar praises Wise for avoiding. Ghost knew the problem existed (it wrote the titles) and solved it in the wrong attribute. **`Learn more about Ghost for Creators` as visible link text would have cost nothing.**

**`Next up →` is broken on every help article inspected** `[observed]`. On `The Ghost Manual` it points to `/help/manual/` (itself). On `Publishing and scheduling` it points to `/help/publishing-content/` (itself). On `Create paid tiers`, `Setting up members`, `Member management` and `Offers` — the same, each to itself. **A "next article" control that links to the current article, on at least six pages.** This is the most concrete functional defect found in this batch.

**`Get Started — free`** uses an em-dash and drops to lowercase for the qualifier, matching Typeform's `Get started—it's free`. Two products, same construction.

**`Start publishing now →`** as the closing CTA names the activity rather than the account action. Same family as Carrd's `Choose a Starting Point` — describe what you will be doing, not what you will be signing.

**`Existing customer? Sign in`** in the mobile menu is a two-word pre-emption placed beside the signup button. The same move as Wise's `Trouble logging in?` beside `Log in` — anticipate the wrong-door user at the door.

**`Try for free` ×4 on the pricing page**, identical across Starter, Publisher, Business. Like Carrd's `Select Plan` ×15 and Tally's `Get started` ×2, the CTA carries no plan information. Typeform's `Get Basic` / `Get Plus` remains the better pattern.

## T4 Onboarding & getting-started

**No numbered how-it-works on the marketing site.** `[absent]` The four capability sections function as an implicit sequence (design → publish → grow → run) but are not numbered or labelled as steps.

**Onboarding lives in the manual's `Getting started` group, and it is four articles** `[observed]`: `Site setup` · `Invite your team` · `Importing content` · `Site navigation`.

**`Importing content` is third, before `Site navigation`.** Ghost assumes you are arriving from somewhere else — WordPress, Substack, Medium — and puts migration ahead of configuration. That assumption is confirmed by a dedicated FAQ article (`Importing Content to Ghost` — "Ghost has built-in tools to migrate content **and subscribers**") and by a `mailto:migrations@ghost.org` address used as the Custom-plan contact. **There is a named migrations function with its own email address, surfaced as a pricing CTA.**

**The manual's home page surfaces four onboarding cards with two-sentence blurbs** `[observed]`:

- `Using the Editor in Ghost` — "Create your best work with a powerful visual editor that has familiar formatting options and the flexibility to add dynamic content like images, videos, buttons, embeds and more."
- `Setting up memberships` — "Turn anonymous visitors into a thriving engaged community with memberships — build a loyal readership, offer exclusive content, and generate recurring revenue with subscriptions."
- `Sending emails` — "Keep your audience in the loop with email newsletters. Learn how to segment your audience, create multiple newsletters, and create a branded email template."
- `Custom domains` — "Find out how to map any branded domain you own directly to your **Ghost(Pro)** publication…"

**The fourth card is Ghost(Pro)-only and says so in bold, inside the manual.** The two-operator split is enforced at the article level, not just the topic level.

**Trial onboarding** `[observed]`: `Try Ghost completely free for 14 days →`. Duration named, `completely` as the intensifier. **No statement anywhere on the pricing page about whether a card is required.** `[absent]` Compare Typeform (`Credit card required`, stated) and Carrd (`no payment or credit card required`, stated). Ghost says neither.

**A referral onboarding state exists on the home page** `[observed]`, as a conditional block:

> `You've been referred!` — "A special offer has automatically been applied to this visit." → `Continue →`
> `[Name] has gifted you [offer]` — "Your discount will be automatically applied when you purchase a paid plan." → `Continue →`

Two variants of a referral-arrival banner in the served markup. **`has gifted you`** rather than "referred you" — the gift framing on an inbound discount. And `automatically been applied to this visit` tells the user the state is session-scoped, which is the thing they would otherwise worry about.

## T5 Form & field labels

Ghost is not a form product, but it ships **signup forms as a core membership surface** and a **members filter builder** that is effectively a query form. `[documented]` throughout.

**Portal is the named signup surface** `[observed]`:

> "Ghost makes it easy, with **native signup forms** that turn anonymous views into logged-in members."

`Portal` is documented as the configurable container for signup, sign-in, and account management. Help articles: `Customizing Portal` · `Embeddable signup forms`. Pricing tooltip language treats `Portal` as the place tiers are displayed: "The quickest way to make your new tiers available to visitors of your website is to use Portal."

**Portal configuration vocabulary** `[documented]`, from the tiers article: `Settings` → `Memberships` → `Portal settings` → `Customize`; then a `Links` section — "shows links for each available tier. These links can be used on social media, in emails, and anywhere else you might want to share your **sign-up form** directly."

**Sign-in is password-less and the two methods are both named** `[documented]`, from the FAQ:

> `How do members sign in to my site?` — "Sign-in to your Ghost site is **password-less** for members. Members can choose to click the secure **magic link**, or enter a **one-time login code** for access."

**Two named alternatives for one action, both in one sentence, with the choice given to the member.** `magic link` (the click path) and `one-time login code` (the type path) — the second exists because magic links break in in-app browsers and email clients that rewrite URLs. Naming both, as a member choice rather than a fallback, is the right framing. Directly transferable to any OTP/magic-link flow.

**The member-record fields are documented** `[observed]`, from Member management: each member profile carries `Name & notes`, `Email stats and activity`, `Subscribed to newsletter`, `Labels`, `Quick access billing in Stripe`, `Signup info`.

**`Name & notes`** — "You can add a member's name and additional notes about their subscription or any other useful information that you want to save for later in the **basic info** section." A free-text operator-only note field on a customer record, documented as a first-class part of the profile.

**The filter builder is the richest "form" in Ghost and it is a 28-field taxonomy** `[observed]`. Members can be filtered by, grouped in four documented columns:

| `Basic` | `Newsletters` | `Subscription` | `Email` |
|---|---|---|---|
| Name | Subscribed | Membership tier | Emails sent (all time) |
| Email | Unsubscribed | Member status | Emails opened (all time) |
| Label | Email disabled | Billing period | Open rate (all time) |
| Newsletter subscription | | Stripe subscription status | Received email |
| Last seen | | Paid start date | Opened email |
| Created | | Next billing date | Clicked email |
| Signed up on post/page | | Subscription started on post/page | Responded with feedback |

**Four column headers, 25 filter names, all verbatim.** Two observations.

**`Signed up on post/page` and `Subscription started on post/page` are two separate, parallel filters** — one for the free conversion, one for the paid conversion, each attributed to the specific piece of content the member was reading. **Attribution is modelled twice because the two conversion events are different.** That distinction is the entire basis of content-led growth analysis and Ghost puts it in the filter list rather than in a separate analytics product.

**`Responded with feedback`** is a filterable member property, tied to the `Audience feedback` newsletter feature. A member's *reaction to an email* is a first-class segmentation dimension.

**The `all time` qualifier is repeated on three of four Email filters** (`Emails sent (all time)`, `Emails opened (all time)`, `Open rate (all time)`) and absent from the other four (`Received email`, `Opened email`, `Clicked email`). The parenthetical distinguishes lifetime aggregates from per-email predicates — a real semantic difference, marked with three words rather than a separate group. Neat, and slightly under-explained.

**The ambiguous-terms gloss is the best piece of field documentation in this file** `[observed]`:

> When filtering "All newsletters," here's what the terms mean:
> - "**Subscribed to at least one**": Members who can receive at least one newsletter
> - "**Unsubscribed from all**": Members who have turned off all newsletters
> - "**Email disabled**": Email addresses that have been disabled by Ghost because they are unreachable or because messages have been marked as spam

**Three filter values that look self-explanatory and are not, glossed in one line each, at the point of use.** `Subscribed` and `Unsubscribed` are quantified (`at least one`, `all`) because with multiple newsletters those words are genuinely ambiguous. And `Email disabled` names *who* disabled it (Ghost, not the member) and *why* (unreachable, or marked as spam) — which converts a scary state into an explained one. See T6.

**Bulk actions are named** `[observed]`: "clicking the '...' icon in the top right corner opens the bulk action options, which allow you to **export, apply labels, remove labels, and unsubscribe** selected members from email". Plus `Save view` — "click **Save view**, to name and save the filtered view" — and `Add filter`.

**A destructive-action confirmation is documented with its safety net** `[observed]`:

> "Confirm that you'd really like to delete the selected segment of members to begin the bulk delete action."
> "Bulk deletions have no effect on active Stripe subscriptions, and **a backup of the members you have deleted will automatically be downloaded to your device before deletion takes place.**"

**Two consequences of bulk deletion stated in one sentence: one thing it does not do (cancel Stripe subscriptions) and one thing it does automatically (download a backup first).** The first is a genuine trap — deleting a member does not stop them being charged — and Ghost names it. The automatic pre-deletion export is the kind of safety behaviour that should be announced in the confirmation dialog; the documentation at least records it.

**Post settings fields** `[documented]`, from the publishing article: the editor's `Preview` link, a `Post settings` menu containing a `Delete post` button, and tier-access controls ("you can control access to your content and newsletters by selecting specific tiers from the post settings within the editor").

**No validation messages, no placeholder text, no error-state field copy observed.** `[absent]`

## T6 Status & state language

**This is Ghost's strongest category by a distance, and the reason it anchors this brief.** Ghost maintains at least five separate state vocabularies — post states, member states, subscription states, email states, and offer states — and documents all five.

### Post and page states

`[documented]` from `Publishing and scheduling`.

**Preview is a state with three audience modes** `[observed]`:

> "You can preview your content as a **public visitor**, **free member**, or **paid member**."

**Three named preview personae matching the three access levels.** An operator publishing gated content can see exactly what each tier sees before publishing. This is the single most transferable idea in Ghost's publishing model: **the access-control taxonomy and the preview taxonomy are the same three words.**

Preview also spans channels: "live previews for **desktop, mobile, email and social**" — four render targets, with email as a peer of web.

> "Post previews generate a **unique shareable URL** that can be viewed by anyone you choose to send it to."

A pre-publish share link, named as a capability rather than buried.

**Publish states and the publishing decision** `[observed]`:

> "Flexible publishing options offer the option to **publish a post, deliver as an email newsletter, or both.**"

**Three publish outcomes, not two.** Web-only, email-only, or both — the `newsletter vs post` distinction the brief asked about. In Ghost, **a post and a newsletter are the same object with different delivery**, and the operator chooses delivery at publish time rather than choosing an object type at creation time. That is the architectural decision the entire membership model rests on, and it is stated in one sentence at the top of the publishing article.

The states themselves: `Preview`, `Publish`, `Schedule for later`, `Delete post`. Plus the implicit draft state (the manual has no `Drafts` article; drafts are simply unpublished posts).

**Scheduling copy names the timezone source** `[observed]`:

> "Use the **Schedule for later** option to schedule a post or newsletter to be published at a later date. The scheduling time uses the timezone configured in your **Settings → General** options within Ghost Admin."

**`Schedule for later` is a verb phrase, not a noun.** Compare "Schedule" as a bare label. And the timezone ambiguity — the one thing that makes scheduling go wrong — is resolved in the second sentence with the exact settings path.

**Deletion is documented with its irreversibility first** `[observed]`:

> "Deleting posts is **permanent, once deleted it cannot be recovered.** Click the **Delete post** button at the bottom of the Post settings menu. A confirmation will open to make sure you want to complete this action."

Consequence → control location → confirmation behaviour, in that order. The comma splice in the first sentence is a defect; the ordering is correct.

**An editor shortcut disclosed as a state trick** `[observed]`: "Quickly switch to editing any post or page by adding `/edit` to the end of the post or page URL." A URL-level state transition, documented in a tip callout.

### Member access states

`[documented]` from `Setting up members` — four site-level subscription-access options, each with a gloss:

| State | Gloss (verbatim) |
|---|---|
| `Anyone can sign up` | "member sign up and sign in is available to all visitors **(default)**" |
| `Paid-members only` | "visitors can only sign up for paid membership" |
| `Only people I invite` | "if you'd prefer an invite-only community, use this option to prevent member sign up, **imported members can still log in**" |
| `Nobody` | "turn off all subscription and sign in functionality on your site" |

**Four options, the default marked, and the one edge case that matters stated inline.** `imported members can still log in` under `Only people I invite` is exactly the clause an operator needs — switching to invite-only does not lock out people you already imported. It is nine words and it prevents a support ticket and a panic.

**`Only people I invite` is first-person from the operator's point of view**, in a settings dropdown. Not "Invite only", not "By invitation" — the operator's own sentence. And `Nobody` as the fourth option is a bare, blunt, unambiguous word where most products would write "Disabled".

### Member status and subscription states

`[documented]` from the filter taxonomy and the FAQ.

| State family | Named values |
|---|---|
| Access levels | `public visitor` · `free member` · `paid member` |
| Member filters | `Member status` · `Membership tier` · `Billing period` · `Stripe subscription status` |
| Newsletter states | `Subscribed` · `Unsubscribed` · `Email disabled` |
| Comment gating | "members only or paid members only" |
| Paid-tier states | active, archived (`Archive tier`) |
| Subscription actions | paused, cancelled at period end, cancelled immediately |

**`Email disabled` is the standout state name and it has its own FAQ article** `[observed]`: `Why is my member's email disabled?` — "Ghost helps to keep your email list clean by **automatically disabling accounts that can no longer receive emails.**"

**The state is named from the system's action (`disabled`), the actor is named (`Ghost`), and the rationale is framed as a benefit to the operator (`keep your email list clean`).** Three moves in one sentence for a state that would otherwise read as a punishment. And the filter gloss adds the two causes: "because they are unreachable or because messages have been marked as spam."

**Subscription lifecycle, documented across three FAQ articles** `[observed]`:

- `How do I pause member subscriptions?` — "Paid member subscriptions can be **paused temporarily, or indefinitely**, directly from within your Stripe account"
- `How do I cancel member subscriptions` — "Member subscriptions can be **cancelled immediately** from within your Stripe account, or **cancelled at the end of the member's billing cycle** within Ghost Admin."
- `What happens when a member payment fails?` — "When a member's subscription renewal fails, what happens next will vary based on your **Stripe account retry settings.**"

**Two cancellation timings named as distinct operations in distinct tools.** Immediate cancellation happens in Stripe; end-of-cycle cancellation happens in Ghost. **The tool boundary is disclosed as part of the state definition**, which is honest about a genuinely split architecture and saves the operator from looking in the wrong place. Note that `How do I cancel member subscriptions` is **missing its question mark**, unlike the two articles either side of it.

**A duplicate-state warning exists as a documented feature** `[observed]`: `Duplicate active subscription warnings` — "Ghost shows a warning when one or more of your members has **more than one active paid subscription at the same time.**" A product that detects and surfaces a billing anomaly on the operator's behalf, with a named warning and its own article.

**Member identity states** `[observed]`: `Registered members` (the metered unit), `unconfirmed members` — "It's not possible to see a list of unconfirmed member email addresses, as **Ghost requires double opt-in**." The double opt-in requirement is stated as the *reason* for a missing capability rather than as a feature.

**Staff roles are a separate state family** `[observed]`, from the pricing tooltip: "Staff users are people who can log into Ghost Admin and publish posts, which includes **Author**, **Editor**, **Administrator** and **Owner** roles. **Contributors** and Suspended users are always free, they won't count towards your plan limits."

**Six staff states — `Author`, `Editor`, `Administrator`, `Owner`, `Contributor`, `Suspended` — and the pricing consequence of two of them stated in the same breath.** `Contributors and Suspended users are always free` is a billing rule expressed through the role vocabulary, in a tooltip on a pricing table. That is exactly where an operator sizing a plan needs it.

### Offer and trial states

`[documented]` from the Offers article.

| Concept | Definition (summarised) |
|---|---|
| `Free trial` | Set duration, "the most common duration being 7 days"; attachable to paid tiers |
| Discount offer | Percentage or dollar; "applied **once, over multiple months, or forever**" |
| `Retention offer` | Presented at the point of cancellation |
| Archived offer | "Archiving an offer makes sure it is no longer available, and moves the offer to the **archived folder**" |

**Trial-to-paid transition, stated plainly** `[observed]`: "Once the free trial has expired, members will be **charged for the tier and billing frequency they've selected and converted to a paid membership.**"

**Trial cancellation, stated with the outcome named** `[observed]`: "If a member cancels their free trial prior to expiry, they will be **converted to a 'free' member and their card will not be charged.** Members can cancel their free trial from within their account settings."

**A cancelled trial produces a named state (`'free' member`), not an absence.** The member does not vanish; they become a different kind of member. That is the correct model for a membership product and the copy says so explicitly, in quotes.

**Retention offers are the most sophisticated state logic documented** `[observed]`:

> "When a paid member goes to cancel their subscription they will be presented with a special retention offer **before they confirm their decision.**"
> "Retention offers are **cadence-based**, meaning that they will apply to *all* tiers, based on the member's billing frequency."
> "Retention offers are only offered to paid members who are about to cancel, **except when:**
> - The member is currently on a trial offer
> - The member is already utilizing an active offer (such as a signup offer for example)
> - The member has previously redeemed a retention offer"

**Three named exclusion conditions for a save-offer, published in operator documentation.** The third — `has previously redeemed a retention offer` — is the anti-abuse rule, and publishing it is a choice: it tells the operator the offer will not fire twice, which they need to know, and it also tells anyone reading how to avoid being shown one. **Ghost chose operator clarity over exploit-resistance**, and for a self-hosted open-source product where the code is public anyway, that is the right call.

**`cadence-based`** is a coined adjective meaning "keyed to billing frequency rather than to tier". Defined in the same sentence it appears in.

**Archiving is documented with the member consequence stated** `[observed]`, from Create paid tiers:

> "**Members who have subscribed to a tier that's been archived remain subscribed and will continue to renew.** You can still send content to members subscribed to an archived tier."

**Archiving a tier does not touch existing subscribers, and Ghost says so in the paragraph that introduces archiving.** This is the single most important sentence in the tiers article — an operator retiring a price point needs to know whether they are about to cancel 400 people's subscriptions. Stated, unprompted, adjacent.

### Status page

`[observed]` Seven components: `Ghost.org` · `Ghost(Pro) Websites` · `Ghost(Pro) Admin` · `Social web` · `Analytics` · `Email delivery` · `Stripe payments`.

Overall state: **`We're fully operational`** — "We're not aware of any issues affecting our systems."

**`We're fully operational` in the first person plural, with a second line that says what the statement actually rests on.** Compare Typeform's `All Systems Operational` and Tally's `All services are online`. **`We're not aware of any issues` is the only honest version of this sentence** — a status page reports what monitoring has detected, not ground truth, and Ghost is the only one of the three that says so.

**`Stripe payments` and `Email delivery` are listed as Ghost components** even though both are third-party dependencies. For a membership product, a Stripe outage *is* a Ghost outage from the operator's point of view, and the status page reflects the operator's reality rather than the service boundary.

**A live security warning is the top item on the status page** `[observed]`:

> ⚠️ **Active Phishing Campaign "Billing / Verification-Related Suspension"**
> "Some customers have reported receiving emails with subject lines like '**Billing / Verification-Related Suspension**' from senders not associated with Ghost. The emails use Ghost's logo and link to a fraudulent website that is designed to look like Ghost.
> **Do not open the link**
> These emails are not associated with Ghost.org or from Ghost(Pro) support. If in doubt, contact us directly at support@ghost.org."

**Using the status page as a phishing-alert channel is the best single decision on any status page in this batch.** The structure: name the campaign by its actual subject line so recipients can match it, describe the deception (logo, lookalike site), give the single imperative instruction as a standalone bolded line (`Do not open the link`), then supply the verified contact route. **Quoting the phishing subject line verbatim is the move** — it converts "be careful of scams" into "if your email says this, it is fake."

Directly and urgently transferable to any financial or account-bearing product.

## T7 Error, failure & recovery

`[documented]` — no live error strings observed; failures are documented as conditions.

**The FAQ topic is where Ghost's failure documentation lives**, and it is organised around member-side failures the operator cannot see:

- `Why is my member's email disabled?` — automatic disabling of unreachable addresses
- `What should I do if my member is not receiving emails?` — "Follow these steps to troubleshoot delivery issues, and **help point members to the most common solutions.**"
- `My member isn't receiving signup emails, what should I do?` — "steps you can take to **support your members** who aren't receiving sign up emails"
- `Why does my email go to the promotions tab?` — "Find tips on how to help maximise your email delivery, when newsletters land in the Promotions tab."
- `What happens when a member payment fails?`
- `Duplicate active subscription warnings`

**Four of six are written for the operator to help a third party.** `help point members to the most common solutions` and `support your members who aren't receiving sign up emails` — the article's job is to equip the operator to do support, not to fix something themselves. **This is the B2B2C help pattern and Ghost is the clearest instance of it in this batch.** Carrd has it too (`allowlisting @mail.carrd.site`); Typeform has one article (`Troubleshooting for form respondents`); Ghost has a cluster.

**The Promotions-tab article is the one worth flagging.** Landing in Gmail's Promotions tab is not an error, not a bug, and not fixable by Ghost — it is a third-party classifier decision. Writing a help article about it anyway, framed as "tips to help maximise delivery", is the correct response to a problem that generates support load and has no fix.

**Recovery articles exist for authentication** `[observed]`: `Reset authentication` (manual, Advanced settings) · `Does Ghost use Two-factor Authentication?` — "Ghost uses **device verification** and **email 2FA** for staff user login". Plus the pricing tooltip: "If a login from an unknown device is detected, the user will be prompted to **verify their device before logging in via a code sent to their email address.**"

**Two named auth mechanisms with distinct triggers** — device verification fires on an unknown device, 2FA is an account setting. Both described in operator-facing terms.

**A refusal article, phrased as a security reassurance** `[observed]`:

> `Is it possible to get around the login system using incognito mode, or disabling JavaScript?` — "Ghost's access levels are **set on the server**, which means that your content is fully protected."

The question is one an operator asks nervously; the answer gives the mechanism (`set on the server`) before the conclusion. **Mechanism-then-reassurance, not reassurance-alone.**

**A second one** `[observed]`: `Is protected content indexed by search engines?` — "URLs with protected content **are available to be indexed, but protected content can't be accessed or crawled.**" A precise, two-clause answer to a question with a genuinely split answer. Most products would say "no" and be wrong.

**Capability refusals, stated plainly** `[observed]`:

- `Can Ghost help me write code and customize my theme?` — "**While we aren't able to write code for you**, there are other options available for customizing themes."
- `Can I see a list of unconfirmed members emails?` — "**It's not possible** to see a list of unconfirmed member email addresses, **as Ghost requires double opt-in.**"
- `Can I use Ghost for Ecommerce?` — "You can sell products on your Ghost site, **however, Ghost is primarily a platform to create, publish and email content to your audience.**"
- `How do I build a custom homepage?` — "Ghost supports creating a custom homepage, **though it requires custom development to achieve.**"

**Four refusals, all with the limit stated before or instead of a workaround, and none with a roadmap promise.** The Ecommerce one is the most interesting: a qualified yes followed by a scope statement that discourages the use case. Ghost tells a prospect the product is the wrong fit rather than selling into it.

**No error titles, error bodies, validation messages, or toast strings observed.** `[absent]`

## T8 Empty states

`[absent]` — no empty-state copy reachable. Every product screenshot in the marketing site and the help centre shows a populated state: a full members dashboard, a filtered member list, a populated offers page, a posts list with content.

**One near-miss** `[observed]`: the status page's `We're not aware of any issues affecting our systems` is functionally the empty state of an incident log — a no-data state written as a reassurance rather than as an absence. It is the only "nothing here" string in the harvest and it is well written.

## T9 Notifications & system messages

**Email is Ghost's primary notification surface and it is a product, not a channel**, so most of the vocabulary sits in T6 and T13. What is notification-specific:

**Welcome emails and welcome pages are two separate named concepts with two separate articles** `[observed]`: `Welcome pages` and `Welcome emails`, adjacent in the Memberships group. **A post-signup page and a post-signup email are distinct artefacts with distinct copy needs**, and Ghost splits them rather than bundling them into "onboarding". Plus an FAQ: `How do I send a welcome email to new members?` — "Read more on how to create a **customized member signup experience.**"

**Transactional emails are delegated to Stripe, and the delegation is documented** `[observed]`:

- `How do I send receipts to my paid members?` — "You can enable sending automated receipts to your paid members, by **managing your customer email settings in Stripe.**"
- `How do I send renewal reminders to my paid members?` — "You can enable sending renewal reminders to your paid members, **directly within your Stripe account.**"

**Two operator-facing articles whose entire content is "do this in Stripe".** Ghost does not pretend to own the billing-email surface. Naming the other tool in the answer's first clause is better than a vague "check your payment provider's settings".

**Newsletter is the operator's own notification channel** `[observed]`, from the home page: "Deliver posts by email newsletter to your audience, so they'll be **in the loop whenever something new goes live.** **Segment your audience and send multiple different newsletters based on preference.**"

**`Newsletters` is a metered quantity** `[observed]`: 1 / 3 / 10 / Unlimited by plan, with the tooltip: "Multiple newsletters in Ghost allow you to create more than one newsletter, each with its own subscriptions and design settings. This allows you to give your audience **the option of what content they'd like to subscribe to.**"

**Multiple newsletters are framed as reader choice, not operator capability.** The tooltip explains why the feature exists from the subscriber's side. That framing is what makes "10 newsletters" mean something to a buyer.

**`Updating links in newsletters` / `Edit links after sending`** `[observed]` — "Update links in your email newsletters even after they've been sent, allowing you to **fix broken links or update destinations without resending.**"

**A post-send correction mechanism for a channel that is normally irreversible**, named, documented, and available on every plan including Starter. For anyone who has sent a newsletter with a broken link, this is the feature. The framing — `without resending` — names the alternative it saves you from.

**`Announcement bar`** is a named site-wide notification surface with its own manual article, in the Design group.

**`Audience feedback`** — a named newsletter feature producing the `Responded with feedback` member filter (T5). Reader reaction as a notification *back* to the operator.

**Status-page notification** — no subscription controls observed on the incident.io page; `View history` only.

## T10 Disclosures, legal & compliance

### The cancellation line

**Ghost is the only product in this batch to state cancellation on its pricing page.** `[observed]`

> "No payment fees — **upgrade, downgrade, or cancel anytime.**"

Second line of the pricing page, above every plan. Three actions named — and `downgrade` is the one the other four products all omit even where they mention cancellation. Framer: no cancellation copy. Typeform: none. Tally: none. Carrd: none (but offers non-renewal). **Ghost states all three in six words, in the subheading.**

### The transaction-fee disclosure

`[observed]` The `0%` claim appears four times across three pages, and it is bounded every time:

- Home: "with **0% payment fees**"
- Pricing table row `Transaction fees`: "Process payments for your premium subscriptions without any additional transaction fees from Ghost. **Payment processor fees still apply.**"
- Pricing cell values: `0% Yes`
- FAQ: `Are there any transaction fees?` — "**Yes, really!** Ghost charges 0% transaction fees."

**`Payment processor fees still apply` is the bound, and it sits in the same tooltip as the claim.** Ghost takes nothing; Stripe still does. This is the Wise claim-then-bound pattern applied correctly — the qualifier is adjacent, in smaller text, and it names the party that does charge.

**The FAQ answer opens `Yes, really!`** — the question is phrased as disbelief (`Are there any transaction fees?`) and the answer acknowledges the disbelief before confirming. Same move as Tally's `Is Tally really free?`. **Both products whose core claim is "we don't charge for the thing everyone charges for" open the FAQ answer by acknowledging that nobody believes them.**

**The pricing cell value `0% Yes` is a defect** — two tokens concatenated, presumably a checkmark plus a value, rendering as nonsense.

### Plan structure and limits

`[observed]` Four plans, a member-count slider (`Based on an audience up to [N] members`, 0 → 100k+), and a monthly/yearly toggle.

| Plan | Price | Tagline | Headline features |
|---|---|---|---|
| `Starter` | `$18` USD / mo, `Billed yearly` | "For solo blogs & newsletters" | Your own website · Free custom domain **NEW** · Email newsletter · Simple design settings · 1,000 members |
| `Publisher` | `$29` USD / mo, `Billed yearly` | "For custom publications" | 3 staff users · Custom themes · 8,000+ integrations · Paid subscriptions · Advanced analytics · 1,000 members |
| `Business` | `$199` USD / mo, `Billed yearly` | "For teams scaling up" | 15 staff users · Priority support · Higher usage limits · Early access to features · 1,000 members |
| `Custom` | `$Custom` | "For more complex needs" | Unlimited staff users · Advanced configurations · Dedicated IP address · 99.9% uptime SLA · Unlimited members |

**`1,000 members` appears on Starter, Publisher *and* Business** in the card summaries, while the comparison table gives `Registered members` as 1,000 / 1,000 / **10,000** / Unlimited. **The Business card contradicts the Business row.** Recorded as a defect, and a consequential one — it is the primary scaling metric.

**The member-count slider is the pricing mechanic** and it means the displayed price is a function of audience size. The four card prices are the slider's value at some default position; the page does not state what that position is. `[absent]`

**Limits disclosed in the comparison table**, all verbatim:

| Row | Starter | Publisher | Business | Custom |
|---|---|---|---|---|
| `Staff users` | 1 | 3 | 15 | Unlimited |
| `File uploads` | 5mb | 100mb | 250mb | 1gb |
| `Registered members` | 1,000 | 1,000 | 10,000 | Unlimited |
| `Premium tiers` | – No | 3 | 10 | Unlimited |
| `Special offers` | – No | 15 | 50 | Unlimited |
| `Newsletters` | 1 | 3 | 10 | Unlimited |
| `Email Sends` | Unlimited | Unlimited | Unlimited | Unlimited |
| `Third-party services` | Basic | Yes | Yes | Yes |
| `Custom SSL certificate` | – No | – No | **+ \$50/mo** | Yes |
| `Custom subdirectory install` | – No | – No | **+ \$50/mo** | Yes |
| `Uptime SLA` | – No | – No | – No | 99.9% |
| `Product help` | Email support | Email support | Priority support | Account manager |

**`Email Sends: Unlimited` across every plan, with the tooltip "All plans include unlimited email sends with no restrictions."** For a newsletter product this is the headline commercial disclosure — the metered unit is *members*, not *sends*. An operator with 900 members can email them daily. **The thing that costs money is the size of the list, not the use of it**, and that is the opposite of most email platforms.

**Two `+ $50/mo` add-ons are priced inside the comparison table** rather than in a separate add-ons section, which keeps the true cost of the Business plan visible at the row where it is incurred.

**Upgrade prompting is disclosed in a tooltip** `[observed]`: "As your publication grows over time **you'll be notified to upgrade your plan whenever needed, based on the number of members you have.**" The mechanism by which you will be asked for more money, stated before purchase.

### The self-hosting disclosure

**Ghost's most distinctive disclosure is that the product is free if you run it yourself, stated on the commercial pages.** `[observed]`

- Footer, `Developers` group: `How to install Ghost` · `Source code` (GitHub) · `Ghost hosting` → `/pricing/`
- Nav: `For Developers` — "Source code, documentation, guides and tutorials"
- Home: "Ghost is **open source**, independent, and funded 100% by its users."
- A GitHub star-count widget embedded in the footer of every page

**The route to not paying is in the footer of the page that asks you to pay.** And the Ghost(Pro) value proposition is then argued on operational grounds rather than on capability — pricing tooltip:

> `Threat & uptime management` — "When you're under attack or the servers catch fire, **if you self-host then you're the one who loses sleep. With Ghost(Pro), we lose sleep!**"

**That is the entire managed-hosting pitch in two clauses, written as a joke about sleep.** It concedes that the software is identical and sells the operational burden transfer. It is the single best piece of positioning copy in this batch, and it appears in a tooltip on a comparison-table row.

A second instance, on subdirectory installs `[observed]`: "this requires customers to run their own **self-hosted reverse proxy** with a custom configuration. Supporting this setup is **non-trivial**, and is a \$50/month addon… **We only recommend this setup for teams who are very comfortable with complex technical infrastructure and are willing to put in the time and resources needed to maintain it.**"

**Ghost discourages a paid add-on in the add-on's own description.** `non-trivial`, `only recommend`, `willing to put in the time` — three hedges warning a buyer off a \$50/mo purchase.

### Compliance obligations delegated to the operator

`[observed]` `Do I need to add a cookie notice to my site?` — "Read more on how to implement a cookie consent notice on your publication **if required.**"

**The cookie obligation is the operator's, and Ghost frames its help as implementation assistance conditional on `if required`.** No GDPR page, no DPA link, no sub-processor list observed on the pages inspected. `[absent]` For a self-hostable product this is coherent — the data controller is whoever runs the instance — but Ghost(Pro) customers are in a processor relationship and no processor documentation was found.

**Fair use** `[observed]`: "File uploads are subject to our **Fair Use Policy**", linked from the pricing tooltip. Same pattern as Tally: the unlimited-adjacent claim carries a policy link.

**Security posture, disclosed in a tooltip** `[observed]`: "All **Ghost(Pro)** installs are integrated with **Fastly**, with 24/7 DDoS mitigation, a sophisticated Web Application Firewall, brute force protection and automatic rate limiting." Vendor named, four protections enumerated.

**Whitelabel framing is a competitive disclosure** `[observed]`: "**Other platforms put their logo all over your website and email newsletters to try and capture your audience.** With Ghost, your brand is front and center. Your logo. Your colors. Your publication."

Names the competitor behaviour, names the motive (`to try and capture your audience`), then three two-word possessive fragments. This is in a *pricing-table tooltip*, which is an unusual place for an attack line.

**Domain promotion, with the renewal trap disclosed** `[observed]`:

> "All **Ghost(Pro)** sites include a one-year free domain registration using the .link TLD. **Domains registered through this promotion renew at standard rates after the first year.**"

**The post-promotion renewal price change is stated in the same tooltip as the free offer.** This is the disclosure most free-domain promotions bury.

## T11 Help-centre architecture

Three topics → nine groups (in the manual) → 50 articles, plus a flat 38-article FAQ topic and a Ghost(Pro) topic. Ghost-hosted, search present, persistent left sidebar showing the whole manual tree on every article page.

**Article-title grammar — four shapes, segregated by topic:**

| Shape | Where | Examples |
|---|---|---|
| Bare noun / feature name | Manual | `Cards` · `Posts` · `Pages` · `Tags` · `Snippets` · `Offers` · `Redirects` · `Comments` |
| `<Gerund> <object>` | Manual | `Setting up members` · `Creating paid tiers` · `Installing themes` · `Importing content` · `Publishing and scheduling` |
| Direct question | FAQ only | `Are there any transaction fees?` · `Why is my member's email disabled?` · `Can I disable memberships on my site?` |
| First-person problem | FAQ only | `My member isn't receiving signup emails, what should I do?` |

**The manual uses nouns and gerunds; the FAQ uses questions.** Clean segregation, same principle as Framer's `Understanding <X>` reservation. A user can tell from the title shape which topic they are in.

**Manual titles are strikingly short.** `Cards`, `Posts`, `Pages`, `Tags`, `Offers`, `Comments`, `Redirects`, `Exports`, `SEO`, `History log`. Eleven of 50 are single words. Compare Carrd's uniformly gerund titles and Framer's `How to <verb>` sprawl. **Ghost's manual reads like a reference index, which is what it is** — the gerund titles are reserved for the multi-step procedures.

**`Was this article helpful? / Give us some feedback`** appears at the foot of every article. Ghost is the only product in this batch with an article-level feedback control.

**`Related articles` appears at the foot of every article — and on all six articles inspected, it shows the same two articles**: `Publisher Gift Links` and `Automations (beta)`. **The related-articles module is not related to anything; it is showing the two most recent posts.** Combined with the broken `Next up →` (T3), **the help centre's two navigation-continuation features are both non-functional.** Recorded as the most significant defect in this file.

**`Automations (beta)`'s summary text is truncated mid-sentence** in the related-articles module on every page: "💡Currently in beta. Automations is a new feature in active" — cut off, with the emoji rendered as a literal character at the start.

**Further-reading links are inline and hand-picked**, and they work `[observed]`. The Member management article ends with a `Further Reading` block linking `What should I do if my member is not receiving emails?`; the Offers article ends with two links to Ghost's own newsletter (`Proven discount strategies for publishers`, `How to price your offers: Conversion versus retention`), each credited to an author (`David Ramos`) and a source (`Ghost Newsletter`).

**Routing strategy documentation into a newsletter** is worth noting: Ghost's help articles link *out* to editorial content about *how to run the business*, not just how to use the software. `How to price your offers: Conversion versus retention` is business advice published by a software company and linked from its product documentation.

**Support routing** `[observed]`: `Help center` · `Community forum` · `Status ▲ 99.9%` in the footer; `Support center` on the status page; `support@ghost.org` given in the phishing warning. **Plan-gated support is disclosed in the pricing table** (`Email support` / `Priority support` / `Account manager`) rather than discovered at the point of asking.

**Breadcrumb** `[observed]`: `Help /` `Ghost manual` `Ghost(Pro)` `FAQ` — the three topics rendered as a persistent tab row rather than a path. A user always sees the other two topics.

## T12 FAQs

**Two surfaces.**

**1. No FAQ block on the pricing page or the home page.** `[absent]` The pricing page carries an 8-section comparison table with ~50 tooltips instead, which do much of the same work (see T10) but are hover-dependent and not linkable.

**2. The `FAQ` help topic carries 38 articles**, each with a one-line summary. Titles verbatim:

| # | Question / title (verbatim) |
|---|---|
| 1 | Duplicate active subscription warnings |
| 2 | How do members sign in to my site? |
| 3 | Does Ghost use Two-factor Authentication? |
| 4 | Importing Content to Ghost |
| 5 | What happens when a member payment fails? |
| 6 | How do I pause member subscriptions? |
| 7 | How do I cancel member subscriptions |
| 8 | How do I send receipts to my paid members? |
| 9 | How do I send renewal reminders to my paid members? |
| 10 | What are TK reminders? |
| 11 | Where can I find my RSS feed? |
| 12 | Can I run a headless site with Ghost(Pro)? |
| 13 | How do I disable the feature image and title of a page? |
| 14 | How do I login to Ghost Admin? |
| 15 | Can I use more than one domain with my site? |
| 16 | How do I build a custom homepage? |
| 17 | Can I use Ghost for Ecommerce? |
| 18 | Can Ghost help me write code and customize my theme? |
| 19 | How do I send a welcome email to new members? |
| 20 | How do I update an official theme to the latest version? |
| 21 | Has Ghost got any funding? What's your business model? |
| 22 | Can I use Ghost to sell paid courses? |
| 23 | Can I see a list of unconfirmed members emails? |
| 24 | My member isn't receiving signup emails, what should I do? |
| 25 | Why does my email go to the promotions tab? |
| 26 | Is it possible to get around the login system using incognito mode, or disabling JavaScript? |
| 27 | Are there any transaction fees? |
| 28 | Where can I find my FirstPromoter referral tracking ID? |
| 29 | Is protected content indexed by search engines? |
| 30 | Can I use embeds in email newsletters? |
| 31 | Can I disable memberships on my site? |
| 32 | Why is my member's email disabled? |
| 33 | What should I do if my member is not receiving emails? |
| 34 | Accepting member's payments using Patreon |
| 35 | Accepting member's payments using PayPal |
| 36 | Alternative payment gateways |
| 37 | Modifying robots.txt |
| 38 | What permissions do staff users have? |

**Structural notes.**

**Nineteen of 38 concern members, subscriptions or member emails.** The FAQ is, by volume, a membership-operations manual. Publishing questions (RSS, feature image, robots.txt, theme updates) are a minority.

**`Has Ghost got any funding? What's your business model?`** is a compound question about the *company* in a product FAQ, answered "Our business model is to make a product people love and provide world-class infrastructure and management for it." **Ghost answers governance questions in the product FAQ** because its governance is part of its pitch (`No investors. No bullshit.`). No other product in this batch has a corporate-structure question in its help centre.

**Three articles document alternative payment gateways** (Patreon, PayPal, `Alternative payment gateways`) despite Stripe being the native integration. **Ghost documents how to take money through a competitor's rails** — Patreon is listed in the footer as a comparison (`Ghost vs Patreon`) and in the help centre as an integration path. Adversary and integration simultaneously.

**`What are TK reminders?`** is the only coined-term question — "The TK Reminder feature in Ghost allows you to insert a reminder, to come back to a specific section within your content to continue editing." **`TK` is journalism jargon** ("to come", used by editors to mark a gap). Ghost has shipped a newsroom convention as a product feature and then had to write an FAQ explaining it to everyone who is not a journalist. See T13.

**Two punctuation defects:** `How do I cancel member subscriptions` has no question mark, though the 12 questions around it do. `Accepting member's payments using Patreon` and `...using PayPal` use a singular possessive (`member's`) where the plural (`members'`) is meant — twice.

**Summary lines do real work.** `Are there any transaction fees?` → "Yes, really! Ghost charges 0% transaction fees." The answer is *in the summary*, so the user never opens the article. Several others do the same (`Is protected content indexed…?` → the full two-clause answer). **A FAQ index where a third of the answers are complete in the summary line** is a genuinely efficient structure.

## T13 Terminology & glossary

**No glossary page.** `[absent]` But Ghost's vocabulary is the most systematic in this batch, because it has to name the same object from two operator positions (self-host and Ghost(Pro)) and from two commercial positions (free member and paid member).

### The membership vocabulary — the core artefact

| Term | Ghost's usage | The alternative it rejected |
|---|---|---|
| `member` | Anyone with a free or paid account on the operator's site | "subscriber", "user", "customer" |
| `Registered members` | The metered unit on the pricing table | "contacts", "audience size" |
| `free member` / `paid member` | The two member classes | "subscriber"/"premium" |
| `public visitor` | The pre-member state, used as a preview mode | "anonymous", "guest" |
| `tier` | A membership product with its own price, benefits and access level | "plan", "level", "membership" |
| `Premium tiers` | The pricing-table name for the same object | |
| `subscription` | The recurring payment relationship | |
| `Portal` | The named signup/signin/account surface, capitalised | "member modal", "auth widget" |
| `Offers` | Discounts and free trials, as one object type | "coupons", "promos" |
| `Retention offer` | The save-offer shown at cancellation | "win-back", "churn offer" |
| `Complimentary plans` | Comped paid access | "free upgrade", "gifted subscription" |
| `Gift subscriptions` | Purchased-for-someone-else access | |
| `Tips & donations` | One-time payments | "support", "buy me a coffee" |
| `Labels` | Operator-applied member segmentation tags | "tags" (reserved for content) |
| `Member impersonation` | Viewing the site as a specific member | "view as", "sudo" |
| `Recommendations` | Cross-publication promotion | |
| `Publisher Gift Links` | "full access to a single members-only post or page, without requiring sign up or payment" | "unlock link", "paywall bypass" |

**`member` vs `subscriber` is the load-bearing distinction and Ghost holds it absolutely.** A `member` is a person with an account. A `subscriber` (where the word appears at all) is about newsletters — `Subscriber engagement`, `Subscribed`, `Unsubscribed`. **The two axes never collide: you are a `member` of the site and `subscribed` to a newsletter.** Compare Substack, where "subscriber" means both. This separation is what makes the filter taxonomy (T5) legible — `Newsletter subscription` and `Member status` are different columns because they are different things.

**`Labels` (members) vs `Tags` (content)** — the same underlying mechanism, two nouns, kept apart so the filter vocabulary and the content vocabulary never overlap. Deliberate and disciplined.

**`tier` is the product noun and it is used consistently in nine places** — `Creating paid tiers`, `Premium tiers`, `Membership tier`, `Archive tier`, `Publishing for specific tiers`, "each tier can have its own name, description, monthly and yearly prices, and list of benefits". The pricing table's own plans are called `plans` and the operator's products are called `tiers`, **so the word never means two things at once on one page.** That is a real problem for a platform that sells plans to people who sell tiers, and Ghost solved it by using different words.

### The publishing vocabulary

| Term | Usage |
|---|---|
| `post` | The dated content object |
| `page` | The undated content object |
| `card` | The rich-content block inside the editor — "image galleries, gifs, video, audio, products, info boxes, accordion toggles, downloadable files, bookmarks" |
| `Snippets` | Reusable content fragments |
| `Tags` | Content taxonomy |
| `Protected content` | Members-only or paid-only content |
| `Schedule for later` | The scheduling action |
| `publication` | The whole site, used in operator-facing copy ("your publication", "29,074 brand new publications") |
| `Ghost Admin` | The authenticated back-end, always in full |
| `newsletter` | The email delivery of a post |
| `TK reminder` | A journalism-jargon editorial placeholder, shipped as a feature |

**`publication` rather than "site" or "blog" for the whole thing** is the register choice that signals the audience. Ghost's operator is a publisher, and the noun says so. `blog` appears essentially nowhere in the product vocabulary despite being in the meta description (`The best open source blog & newsletter platform`) — **the SEO title says `blog`, the product says `publication`.**

**`card` for editor blocks** — where Tally says `block` and Carrd says `element`, Ghost says `card`. Three products, three universal composition nouns, no overlap.

**`TK reminder` is the one piece of borrowed jargon** and Ghost paid for it with an FAQ entry. It is the right call for the core audience (journalists know TK instantly) and a small tax on everyone else. **A rare, legible instance of a product choosing its primary audience's in-group vocabulary over the general term** and accepting the documentation cost.

### The two-operator vocabulary

**This is the part the brief asked about, and Ghost's solution is typographic.**

| Term | Refers to |
|---|---|
| `Ghost` | The open-source software. Free, self-hostable, on GitHub |
| **`Ghost(Pro)`** | The managed hosting service. Paid |
| `Ghost Foundation` | The non-profit entity (footer copyright) |
| `Ghost Admin` | The back-end UI, present in both |
| `ghost.io` | The default Ghost(Pro) subdomain |
| `self-host` / `self-hosted` | The verb and adjective for the other path |

**`Ghost(Pro)` — no space, parenthesised, and rendered in bold in nearly every documentation instance.** The typography is the disambiguator. In the pricing tooltips it appears as `**Ghost(Pro)**` a dozen times, always bolded, so a reader scanning a paragraph can see at a glance whether the sentence applies to them.

**The rule is applied consistently and it is the whole solution:** an unqualified `Ghost` statement is true for everyone; a `Ghost(Pro)` statement is true only for hosting customers. `Ghost has built-in tools to migrate content` (everyone). `All Ghost(Pro) sites come with a free ghost.io subdomain` (customers only). `Ghost's access levels are set on the server` (everyone).

**This is cheaper and more reliable than Framer's approach** (no marker — `site`/`project`/`file` drift freely) **and than Typeform's** (plan-family names scattered across five surfaces). One bolded parenthetical, applied everywhere, and the reader self-filters.

**Where it breaks:** the help-centre topic is `Ghost(Pro)` but the pricing page H1 is `Launch your creative business` with the eyebrow `Ghost(Pro) plans & pricing`, and the nav item is just `Pricing`. A self-hoster clicking `Pricing` gets a page about a product they may not want, and only the eyebrow tells them. Minor.

### Operator-vocabulary observations

**`staff users`** vs **`members`** — the two human categories, never confused. Staff log into Ghost Admin; members log into the site. Six staff roles (T6), two member classes.

**`Owner`** is a named staff role *and* a transferable state (`Transfer site ownership to another user`).

**`Social web`** is a status-page component and a pricing feature (`Social web distribution` — "Connect your publication to the social web with **ActivityPub** integration, allowing readers to discover, follow and interact with your content across Ghost, WordPress, BlueSky, Threads, Flipboard, Mastodon, and more").

**`the social web` as a noun phrase, with ActivityPub named and seven destinations enumerated.** Ghost has adopted an ideological term (`the social web` rather than "social media") and grounded it in a named protocol and a concrete list. Compare `Escape the algorithm` in the marketing headline — **the same position stated as a slogan on the home page and as a protocol integration in the feature table.**

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the operator, third person for the member (`your members`, `your audience`, `readers`), first-person plural for Ghost. The three-party grammar is the same as Typeform's and Tally's, but Ghost's `we` is more present and more opinionated: `we lose sleep!`, `We're not aware of any issues`, `Our business model is to make a product people love`, `While we aren't able to write code for you`.

**Register.** Direct, declarative, short-sentenced, with a strong editorial voice in marketing and a plain procedural voice in documentation. **Ghost is the only product in this batch that swears** (`No bullshit.`) and the only one whose marketing copy takes a political position (`Escape the algorithm`, `Your audience, brand, and revenue – owned entirely by you`, `the social web`).

**Distinctive tonal moves:**

- **Fragment stacking.** "Your logo. Your colors. Your publication." · "No investors. No bullshit." · "Hello, new friends." · "Today, it's your turn." Four instances of two-or-three-fragment sequences, all terminal-punctuated.
- **`Yes.` as a standalone bolded sentence** at the end of the integrations paragraph: "Social, referral programs, push notifications, social sharing, payment gateways, A/B testing, desktop editors, mobile apps, comments, recommendations. **Yes.**" A one-word answer to an unasked question.
- **The negative-space sell.** "No more suffering through clumsy toolbars or **drag & oops**." — a coined pun naming the competitor's failure mode. "Until now, building an indie publication with memberships and subscriptions has been difficult and complicated."
- **Understatement in high-stakes copy.** "if you self-host then you're the one who loses sleep. With Ghost(Pro), **we lose sleep!**" · "or the servers catch fire".
- **`Calm by design`** — the editor description opens "An editor built from the ground-up for professionals. **Calm by design**, with advanced workflows by default… Immerse yourself in the story with an interface that's **invisible until you need it, and powerful when you do.**" Two balanced clauses describing an absence.

**Tone modulation.** Ghost's register is *flatter in documentation and sharper in marketing*, which is the conventional arrangement — but the sharpest lines appear in an unconventional place: **pricing-table tooltips.** `we lose sleep!`, `Other platforms put their logo all over your website…`, `Yes, really!`. The tooltips are where Ghost argues, and they are hover-only and unlinkable.

**Numbers as trust devices** `[observed]`: `$100,000,000+` annual publisher revenue · `29,074` new publications last week · `123K`, `197K`, `149K`, `29K`, `27K`, `15K` member counts · `$281K MRR`, `$39K MRR` · `8,000+ integrations` · `5,000+ apps` via Zapier · `99.9%` uptime (footer and SLA) · `0%` transaction fees · a live GitHub star count.

**Every one of these is either checkable or attributed to a named third party**, and the two most striking (`$281K MRR` for Tangle, `$39K MRR` for Creator Science) are named customers' revenue figures published with their consent. `29,074` is precise and time-bounded (`Last week`). **Ghost's numbers are the most falsifiable in this batch** — which is the point.

**Accessibility content** `[observed]` / `[absent]`

- **No accessibility statement, no VPAT, no WCAG reference, no accessibility help article, and no accessibility guidance for the sites operators publish.** `[absent]` The word does not appear on any page inspected. Ghost joins Typeform and Carrd in this batch's majority; Framer (12-article category) and Tally (a published position with named defects) are the exceptions.
- This is a notable gap for a themeable publishing platform — Ghost ships `hundreds of custom themes` through a marketplace and publishes no accessibility requirement or guidance for theme authors on the pages inspected.
- **Marketing-page alt text is mostly absent or minimal.** Dozens of integration logos carry alt text equal to the service name (`MailChimp`, `Discourse`, `Stripe`, `Zapier`) — acceptable, since the name is the content. Theme-gallery images carry **empty alt** (`![](…/gallery/31.png)` ×13), correct for a decorative grid. Customer-logo images carry the publication name (`404 Media`, `Tangle`, `Platformer`), correct.
- **Feature screenshots carry short functional alt**: `Rich media & dynamic cards`, `Newsletters`, `Native analytics`, `Offers & promotions`, `Graph`, `Ghost screenshot`. **`Ghost screenshot` is the weak one** — it describes the file, not the content.
- **Help-centre images carry no alt at all.** Every screenshot in `Publishing and scheduling`, `Create paid tiers`, `Setting up members`, `Member management` and `Offers` is `![](https://storage.ghost.io/…)` with an empty alt attribute — roughly 25 instances across five articles. **Several of these screenshots are the only place a piece of information appears** (the tier-creation fields, the Portal settings panel, the offers configuration form), so a non-sighted reader gets the surrounding prose and nothing else. Compare Typeform, whose help screenshots carry detailed functional alt.
  - Partial mitigation: Ghost captions several images in italic body text (`*Preview how your post appears on desktop.*`, `*Check how your content will look in your members' inboxes*`, `*Segment your list using any number of filter parameters*`, `*Additional filters can be added by clicking "Add filter" and selecting your criteria*`, `*An example of a Portal offers a page*`). **The captions do some of the work alt text should**, and they are available to everyone — but they are not programmatically associated with the images.
  - `*An example of a Portal offers a page*` contains a grammar error (`offers a page`).
- **`svg.ghost-orb-logo { background-size: 100% 100%; … }`** — a raw CSS rule is rendered as the accessible name of the site logo link in the served markup on the home page and pricing page. **A screen reader encountering this announces a CSS declaration where the site name should be.** On the help centre the same link correctly reads `Ghost Logo`. Recorded as a defect on the two highest-traffic pages.
- **No `Skip to content` link found** in the fetched markup of any page. `[absent]`
- Three `Learn more →` links on the home page disambiguated only by `title` attributes (T3).

**Negative findings, recorded honestly**

- **`Next up →` links to the current article on every help page inspected** (six instances)
- **`Related articles` shows the same two articles on every page inspected** — the module is not related to anything
- **`Automations (beta)` summary truncated mid-sentence** in that module, on every page
- **The Business plan card says `1,000 members`; the comparison table says `10,000`** — a contradiction on the primary scaling metric
- **`0% Yes`** as a comparison-table cell value — two tokens concatenated
- **Raw CSS rendered as the logo link's accessible name** on the home and pricing pages
- **~25 help-centre screenshots with empty alt**, several carrying information that appears nowhere else
- **No accessibility statement, no a11y guidance for themes or for published sites**
- **No `Skip to content` link found**
- Three identical `Learn more →` links, disambiguated only in `title` attributes
- **`Try for free` ×4**, carrying no plan information
- **Desktop and mobile nav glosses differ** for the same three links
- `How do I cancel member subscriptions` — missing question mark
- `Accepting member's payments using Patreon` / `...using PayPal` — singular possessive where plural is meant, twice
- `*An example of a Portal offers a page*` — garbled caption
- "Deleting posts is permanent, once deleted it cannot be recovered." — comma splice
- **Meta title says `blog`; the product vocabulary never does** (`publication`)
- No card-required / no-card statement for the 14-day trial
- The member-count slider's default position is not stated, so the four card prices are unanchored
- No GDPR page, DPA, sub-processor list or cookie policy observed; the cookie obligation is delegated to the operator with `if required`
- No FAQ on the pricing page; the ~50 tooltips that substitute are hover-only and unlinkable

---

## Transferable patterns

1. **Use one typographic marker to separate "the software" from "the service", and apply it everywhere.** `Ghost` vs **`Ghost(Pro)`**, bolded in every documentation instance. A reader scanning a paragraph can see instantly whether a sentence applies to them. Any product with two commercial relationships to one codebase — open-core, self-hosted vs cloud, free vs licensed — should steal this outright. It is cheaper than two documentation sites and more reliable than hoping context disambiguates.
2. **Make the preview personae identical to the access levels.** `public visitor` / `free member` / `paid member` — the same three words name both what a reader can be and what the operator can preview as. Anywhere content is gated, the gate vocabulary and the preview vocabulary should be the same list. Applies directly to tiered content, role-based UIs and feature-flagged experiences.
3. **State the non-effect of a destructive action in the same sentence as the action.** "Bulk deletions have no effect on active Stripe subscriptions, and a backup… will automatically be downloaded to your device before deletion takes place." · "Members who have subscribed to a tier that's been archived remain subscribed and will continue to renew." Both name what *doesn't* happen, which is the thing the operator is actually anxious about. Directly applicable to account closure, subscription cancellation, and data deletion copy.
4. **Gloss the ambiguous filter values at the point of use.** "Subscribed to at least one": Members who can receive at least one newsletter. "Email disabled": addresses disabled by Ghost because they are unreachable or marked as spam. Three one-line glosses under a filter control, naming who acted and why. Any segment builder, audience filter or eligibility rule needs this and almost none have it.
5. **Quote the phishing subject line on your status page.** Name the campaign by the exact string recipients will see, describe the deception, give a standalone bolded imperative (`Do not open the link`), then the verified contact route. Converts generic scam-awareness into a matchable test. Urgent and direct for any product with account or payment exposure.
6. **Publish the exclusion conditions for your save-offer.** Ghost names three cases where a retention offer will not fire, including "has previously redeemed a retention offer". The operator needs to know the offer won't repeat; publishing the rule is a choice to serve them over exploit-resistance. Applies to any discount, win-back or promotional eligibility logic.
7. **Sell the managed tier on burden transfer, and concede that the software is identical.** "if you self-host then you're the one who loses sleep. With Ghost(Pro), we lose sleep!" One sentence, no feature claims. The corollary is the pattern too: Ghost *discourages* a \$50/mo add-on in its own description (`non-trivial`, `we only recommend this setup for teams who are very comfortable…`). Discouraging the wrong buyer is cheaper than supporting them.
8. **Put `upgrade, downgrade, or cancel anytime` in the pricing subheading.** Six words, second line, above every plan. The only product in this batch to do it, and the only one to name `downgrade` alongside `cancel`. Removes the largest unspoken objection before the reader reaches a price.
9. **Bound the zero-fee claim with the party who does charge.** "0% payment fees" + "Payment processor fees still apply." The qualifier names Stripe's role rather than hedging vaguely. Any "no fees" claim in a payments context needs the adjacent sentence naming the fees that remain.
10. **Separate `member` from `subscriber`, and `Labels` from `Tags`.** Ghost keeps the account axis and the newsletter axis in different vocabularies, and the people axis and the content axis in different words for the same mechanism. The filter taxonomy is legible *because* the nouns never collide. Where two taxonomies could plausibly share a word, pick two words.

## Caveats & gaps

- **Eleven pages inspected, all on `ghost.org`.** `docs.ghost.org` — the entire developer and self-hosting documentation set, which is the primary surface for one of Ghost's two operator audiences — was **not harvested at all.** Every finding in this file about the self-hosting operator derives from marketing pages, footer links and the `Ghost(Pro)` disambiguation pattern. **The self-hoster's actual documentation experience is unobserved**, which is a real limitation given that the brief asked specifically about the two-operator split.
- **Six of ~50 manual articles were opened.** The `Publishing` group (17 articles) is represented by one; `Newsletters` (6) by none; `Design`, `Advanced settings` and `Growth & analytics` by none. The publish-state vocabulary in T6 is therefore drawn from a single article plus the pricing table, and `Cards`, `Posts`, `Pages`, `Post settings` and `Organizing content` — the five articles most likely to contain further state names — are unread.
- **The 38 FAQ articles are represented by titles and summary lines only.** Answer bodies were not opened. Where a summary carries the full answer (roughly a third of them) the finding is solid; where it does not, only the question is evidence.
- **All in-product strings are `[documented]`**, quoted inside help articles or pricing tooltips describing the UI. No error messages, empty states, validation messages, toasts or button microcopy from inside Ghost Admin were observed. T8 is genuinely empty.
- **The member-facing experience was not observed.** Portal, the signup form, the magic-link email, the account-settings page, the retention-offer screen and the welcome email are all described by Ghost and none was seen. The retention-offer copy — arguably the highest-value string in the whole membership flow — exists only as a video on the offers page.
- **Pricing figures are the slider's default state.** The member-count slider governs price and its default position is not stated on the page, so `$18` / `$29` / `$199` are the values at an unknown audience size. The `1,000 members` vs `10,000 members` contradiction between the Business card and the Business row is recorded as observed; **neither is treated as authoritative.**
- **Pricing tooltips are the source for roughly a third of T10 and T13.** They are hover-revealed, unlinkable, and were recovered from the served markup. Whether all of them render to a sighted user in the same form is unverified.
- **No accessibility statement was found**, and the accessibility findings here are based on observed alt text, the `title`-attribute pattern, and the DOM. No assistive-technology testing was performed. The raw-CSS-as-logo-name defect is read from markup and its screen-reader behaviour is inferred, not tested.
- **The `Next up →` and `Related articles` defects were observed on six pages and are presented as such.** They are almost certainly site-wide, but only six were checked.
- **Status page was fetched at one moment** and showed 100% uptime across all seven components plus an active phishing warning. The warning is quoted as published; its currency at time of reading is not guaranteed.

## Sources

1. https://ghost.org/
2. https://ghost.org/pricing/
3. https://ghost.org/help/
4. https://ghost.org/help/manual/
5. https://ghost.org/help/publishing-content/
6. https://ghost.org/help/tiers/
7. https://ghost.org/help/setup-members/
8. https://ghost.org/help/member-management/
9. https://ghost.org/help/offers/
10. https://ghost.org/help/topic/faq/
11. https://status.ghost.org/ (redirects to https://ghoststatus.org)
