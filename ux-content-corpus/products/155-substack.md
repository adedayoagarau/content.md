# 155. Substack

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Newsletter publishing platform / creator-subscription media |
| Primary URL | https://substack.com/ |
| Corpus rank | 155 |
| Benchmark strength (source list) | Author and subscriber workflows |
| Locale / market observed | en-US |
| Platform observed | Web (marketing + Zendesk help centre); app behaviour documented in help articles |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **EU Digital Services Act** (single point of contact `dsa@substackinc.com`; legal representative Lionheart Squared (Europe) Ltd, Dublin; Coimisiún na Meán named); **UK Online Safety Act 2023** (priority illegal content per Schedule 7, priority harmful content per Schedules 4–5; `osa@substackinc.com`); **Australian Online Safety Act 2021** (Class 1A / Class 1B content categories); COPPA (16+ age floor); California law and JAMS arbitration; payments via **Stripe** (Stripe Service Agreement and restricted-business list incorporated by reference); Stripe Tax integration; NCII removal policy; DMCA |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Partial — `substack.com/pricing` and `substack.com/content-guidelines` return empty bodies (see Caveats). Writer-side vocabulary is well covered; reader-side subscription microcopy is documented rather than observed, and the in-app reading surfaces are unharvested. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://substack.com/ | Hero, three-pillar value prop, `Substack basics` FAQ block |
| About Substack | https://substack.com/about | Revenue calculator, four claim tiles, tool sections, Defender |
| Go paid / revenue calculator | https://substack.com/going-paid | Calculator, the ad-model contrast, creator case studies |
| Accessibility at Substack | https://substack.com/accessibility | **A real accessibility statement — three sentences** |
| Terms of Use | https://substack.com/tos | Creator/Reader dual role, paid-subscription clause, deletion |
| Content Guidelines | https://substack.com/content | **The contested moderation position, in full** |
| Help centre home | https://support.substack.com/hc/en-us | Seven FAQ items, four `Getting Started` tiles |
| Help category: Creators | https://support.substack.com/hc/en-us/categories/360002403472-Creators | **Twelve sections — the writer IA** |
| Help section: Payments help | https://support.substack.com/hc/en-us/sections/4413195985684-Payments-help | 16 articles |
| Help section: Publishing a post | https://support.substack.com/hc/en-us/sections/360007361292-Publishing-a-post | 66 articles (3 pages) |
| Article: How do payouts work on Substack? | https://support.substack.com/hc/en-us/articles/360037833691 | Payout timing, Boost discount disclosure, GARR/MRR |
| Article: How do readers subscribe…? | https://support.substack.com/hc/en-us/articles/360037830631 | **The four plan types, /subscribe flow** |
| Article: How do I offer a complimentary subscription…? | https://support.substack.com/hc/en-us/articles/360037465612 | **`Comp`, `Set to Founding`, expiry emails** |
| Article: Report content on Substack | https://support.substack.com/hc/en-us/articles/50310628916500 | **Ten violation categories, three report classes** |

---

## T1 Navigation & IA labels

**Global nav — four items, three of them dropdowns** `[observed]`

`Resources` · `Creators` · `Explore` · `Start publishing` · `Sign in`

**`Explore` is the only reader-facing item**, and it is third. `Creators` and `Resources` are both writer-facing. `Start publishing` is the primary CTA. The nav is 3:1 weighted toward the supply side before a single dropdown opens.

**`Explore ▾`** `[observed]`: `Substack App` · `Discover` · `Featured` · `Substacks around the world`

Four items, and note `Substacks` used as a **countable plural common noun** — the brand name pluralised into the object it describes.

**`Creators ▾` — twelve items, and eight are audience segments** `[observed]`

`Switch to Substack` · `Go paid` · `Grow your audience` · `For live video` · `For video` · `For podcasts` · `For bloggers` · `For finance writers` · `For authors` · `For food writers` · `For local news` · `For media founders`

**Nine consecutive `For <audience>` items.** `For finance writers`, `For food writers`, `For local news`, `For media founders` — Substack has built a landing page per vertical and put all nine in the global dropdown. That is a sales-org IA surfaced as product navigation, and it makes the dropdown scan as a list of who Substack thinks you are rather than what you can do.

`Switch to Substack` in position one is a **competitor-migration CTA in the global nav**, ahead of `Go paid`. The footer goes further with `Substack vs. beehiiv` and `Substack vs. Patreon` as permanent links.

**`Resources ▾`** `[observed]`: `How to start a Substack` · `Going paid guide` · `Resource center` · `Community & programs` · `Help center` · `Brand assets`

**Footer — four groupings** `[observed]`

| Group | Notable items |
|---|---|
| `Discover` | `Explore` · `Get the app` · `Substack Reader` · then **nine `Top in <category>` leaderboard links** (`Top podcasts`, `Top in culture`, `Top in food & drink`, `Top in finance`, `Top in sports`, `Top in politics`, `Top in technology`, `Top in faith`, `Top in business`) · `Topics` |
| `Creators` | The twelve `Creators` items plus `Get started`, `Substack vs. beehiiv`, `Substack vs. Patreon` |
| `Company` | `About` · `Help` · `Jobs` · `Blog` · `Vulnerability Policy` · `Contact` · `Sitemap` |
| `Resources` | `Resource center` · `Guide to going paid` · `Help center` · `Community and programs` · `Brand assets` · `Features` · `Brand Partnerships` |

**Nine leaderboard links in the footer.** `Top in faith` as a footer-level category is a real editorial signal. And the footer's `Discover` group is essentially a ranked-content index — Substack is using its global footer as a discovery surface, not just as a legal/company shelf.

**`Help center` appears in both `Resources` and `Company`**, with `Help` as the label in one and `Help center` in the other, pointing at the same URL with a `?s=support%40substack.com` query parameter in one case. Two labels, one destination, one of them carrying a stray email query string.

`Guide to going paid` (footer, Resources) vs `Going paid guide` (nav, Resources) — **the same page, two word orders.**

**Footer legal strip** `[observed]`: `Privacy` · `Terms` · `Accessibility` · `Collection notice` — and `Accessibility` as a first-class global-footer link is notable; only Substack and Wise ship one in this corpus.

Tagline in the footer: `Substack is the home for great culture`.

**Legal-document index, exposed as a nav list on every legal page** `[observed]`

`Terms of Use` · `Privacy Policy` · `Publisher Agreement` · `Content Guidelines` · `Copyright Dispute Policy` · `Copyright Repeat Infringer Policy` · `CCPA Policy` · `Support Chatbot Terms`

Eight named documents under a `**Documents**` heading. **`Publisher Agreement` as a document distinct from `Terms of Use` is the structural expression of the two-sided model** — readers and writers are bound by different contracts, and both are listed. `Copyright Repeat Infringer Policy` as its own document (separate from `Copyright Dispute Policy`) is unusually granular. `Support Chatbot Terms` is a 2026 artefact.

**Help centre IA — two visible categories, twelve writer sections** `[observed]`

The `Creators` category (with the scope line "If you're creating on Substack, get help with all your publishing, payments, and people questions here.") contains:

`Intro to Substack` · `Your account` · `Publications 101` · `Publishing a post` · `Intellectual Property 101` · `Payments help` · `Subscriber help` · `Stats and traffic` · `Notes` · `Podcasts` · `Video` · `Chat`

Plus a `General` category containing `Standards & Enforcement`.

**Two sections use a `101` suffix** — `Publications 101` and `Intellectual Property 101`. A course-catalogue convention inside a help centre, applied to exactly two of twelve sections. `Intellectual Property 101` is the more interesting one: Substack ships a **copyright-education curriculum** (`What is a copyright?`, `What is fair use?`, `What should I know about fair use?`, `How can creators avoid copyright infringement?`, `What are limitations and exceptions to copyright?`) as a help section. That is a platform teaching law to its writers rather than only prohibiting infringement.

**`Subscriber help` is a section inside `Creators`** — i.e. "help for managing your subscribers", not "help for subscribers". The label is ambiguous and a reader who *is* a subscriber will land in the wrong place. Recorded as an IA defect, and it is the clearest symptom of the help centre's writer-first construction.

**Help home `Getting Started on Substack` tiles — four, and two are mislinked** `[observed]`

| Tile label | Scope line | Destination |
|---|---|---|
| `Video` | "Record, upload, or go live on Substack" | **`/sections/360007506971-Stats-and-traffic`** |
| `Going paid` | "Enabling payments and Stripe questions" | **`/sections/4413195985684-Payments-help`** |
| `Podcasts` | "How to publish episodes on Substack" | `/sections/4413195997588-Podcasts` ✓ |
| `Publishing` | "How to draft, edit, and publish posts" | `/sections/360007361292-Publishing-a-post` ✓ |

**The `Video` tile links to the Stats and traffic section.** A broken destination on the help centre's front door, on the tile for Substack's newest product line. And `Going paid` links to `Payments help` — arguably fine, but the tile label and the section label differ.

**Help chrome** `[observed]`: `Help Center` · `How can we help?` · `Popular:` · `Frequently Asked Questions` · `Skip to main content` · `Return to top` · `See all N articles` · `Next ›` / `Last »` · `Articles in this section` · `See more` · `Need more help? Submit a request to Support and we'll be glad to help!`

Plus two persistent footers on every help page: "Looking for advice on how to make the most of Substack? Check out our **writer resources**." and "Is Substack down or are you having a service issue? Check out our **status page**."

**Every help page routes to writer resources.** Even the reader-facing articles. The help centre does not have a reader escalation path in its furniture.

## T2 Value proposition & headline patterns

**Homepage hero — two lines, and the second is the pitch** `[observed]`

> `The home for great culture`
> `Publish on Substack and own your work`

**`culture`, not "writing", "newsletters", or "media".** The noun has broadened — Substack in 2026 positions as a culture platform, and the footer tagline confirms it (`Substack is the home for great culture`). The subhead is an imperative plus a promise, and the promise is **ownership**, stated as the very first benefit on the property.

**Three-pillar value prop, each a declarative headline plus mechanism** `[observed]`

1. `You made it, you own it.` — "You always own your intellectual property, mailing list, and subscriber payments. With full editorial control and no gatekeepers, you can do the work you most believe in."
2. `Grow your audience.` — "Marketing isn't all on your shoulders. More than 50% of all new free subscriptions and 25% of paid subscriptions to Substacks come from within our network."
3. `Let us handle everything else.` — "A Substack combines a website, blog, podcast, video tools, payment system, and customer support team — all integrated seamlessly in a simple interface. We handle the admin, billing, and tech so you can focus on making your best work."

**`You made it, you own it.` is the single best string on the property.** Six words, two clauses, parallel construction, and it states a legal position as a moral one. It then enumerates the three owned assets — `intellectual property`, `mailing list`, `subscriber payments` — which is exactly the anxiety a writer leaving another platform has.

Each pillar is followed by the same CTA (`Create your Substack`) — **repeated seven times on the homepage**, identically.

**The counting inconsistency across three pages** `[observed]`

The network-growth claim is stated three different ways on three surfaces:

| Page | Claim |
|---|---|
| Homepage (pillar 2) | "More than 50% of all new free subscriptions and **25%** of paid subscriptions" |
| Homepage (`Substack basics`) | "More than 50% of all new free subscriptions and **25%** of paid subscriptions" |
| About | "**More than half** of new subscribers come from Substack's built-in network" |
| About (stats block) | "**30%+** Of paid subscriptions come from within Substack's network" |
| Going paid | *(not repeated)* |

**25% on the homepage, 30%+ on the About page, for the same metric.** And "more than 50%" rendered as "more than half" on one page. Recorded as a substantive numerical inconsistency in a marketing claim — not a rounding difference but two different figures for one statistic, live simultaneously.

**About page hero** `[observed]`

> `Make money doing the work you believe in.`
> "Old media models are broken. Substack is building a new one that puts writers, creators, and subscribers in charge."

An enemy in four words (`Old media models are broken`), then a three-party beneficiary list that **includes subscribers** — the reader is named as a party the new model empowers, not just as a payer.

**Four claim tiles, each a two-to-three-word label plus one flat sentence** `[observed]`

- `Free to start` — "No platform fees, no tiers, no contracts—Substack is free to start and free to leave"
- `Earn money right away` — "90% goes to you. The rest powers the platform that supports your work."
- `Build your audience` — "Tap into a platform with 5 million paid subscriptions and counting"
- `Grow faster` — "More than half of new subscribers come from Substack's built-in network"

**`free to start and free to leave`** is the differentiator sentence, and the triple negation before it (`No platform fees, no tiers, no contracts`) is the same negation-as-feature move BeReal uses. `free to leave` is doing lock-in-anxiety work that no positive claim could.

**`90% goes to you. The rest powers the platform that supports your work.`** — the fee stated as the writer's share, in the first sentence, with the remainder euphemised in the second (`the rest`, `powers`). Substack never writes "we take 10%" on a marketing surface; the homepage FAQ does (`Substack will keep a 10% cut`), so the same fact is framed as a gift on About and as a deduction in the FAQ.

**The revenue calculator is the central marketing device, on two pages** `[observed]`

> `Estimate what you could earn on Substack` (About)
> `Estimate what you could make on Substack` (Going paid)

**`earn` on one page, `make` on the other**, for the same widget. Two subscriber/price sliders, defaulting to `800 subscribers` at `$7/month`, outputting `$4,638per month` (rendered with **no space before "per month"** — a concatenation defect on the single most persuasive number on the site).

And immediately beneath it, on both pages, the caveat: **"Writers keep 90% of their revenue minus credit card fees."**

**That caveat is the best disclosure on the property.** The calculator shows gross; the line beneath states the two deductions (`90%` and `minus credit card fees`) that make the displayed figure wrong. `minus credit card fees` is the honest part — most platforms disclose their own cut and let the processor fee surprise you.

**The framing sentence above the calculator does the aspiration work** `[observed]`: "A few hundred paid subscribers at $5/month can replace a salary. A few thousand makes it a real business." Two thresholds, two outcomes, `salary` then `business`. Then the alignment claim: "Our entire business model depends on your success—we only make money when you do." (Repeated on the homepage FAQ as "we only make money when publishers do.")

**The ad-model contrast, quantified** `[observed]`

> `A better model for creators.`
> "The ad model demands that writers and creators attract **40,000 page views every day** to earn just **$1,000 a month**. With the Substack model, a steady base of **1,000 subscribers paying $5 each month** earns you **$60,000 per year**."

Two competing business models, both expressed in the same units (inputs → monthly/annual output), side by side. Naming the competitor mechanism with its own arithmetic and then beating it on the same axis is an unusually rigorous comparison for a marketing page.

**Section headers on About are capability nouns, and the audience-segment headers are job titles** `[observed]`: `A network that grows with you` · `Built for every kind of creator` · `Built-in tools` · `Who's here` · then `Media companies` · `Writers and journalists` · `Podcasters and video creators` · `Experts, educators, creative voices`.

`Experts, educators, creative voices` — a three-item list as a segment name, because the segment has no single word. Honest, if clumsy.

**`Write and publish without fear.`** — the writers-and-journalists tile closes on this, and it is the thesis that the `Substack Defender` section then operationalises (see T10).

**Closing CTA header** `[observed]`: `You deserve to make money  doing the work you love.` — with a **double space** before "doing", and `deserve` doing moral rather than commercial work. CTAs beneath: `Start your Substack` and `Talk to our team about Enterprise`.

## T3 CTA inventory

### Observed live UI

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Create your Substack` | Homepage, ×7 | **Seven identical instances on one page** |
| `Get started in minutes` | Homepage foot | A CTA with a duration claim |
| `Start your Substack` | About, ×4 | **Different verb from the homepage's `Create your`** |
| `Get started` | Going paid, ×2 | **Third label** |
| `Start publishing` | Global nav | **Fourth label** |
| `Switch to Substack` | Nav and footer | Competitor-migration entry |
| `Talk to our team about Enterprise` | About foot | The only sales-contact CTA; `Enterprise` appears nowhere else |
| `Sign in` | Nav | |
| `Go paid` | Nav and footer | Two words, imperative |
| `Grow your audience` | Nav | A CTA that is also a benefit header |
| `Get the app` | Footer | |
| `Explore` | Nav dropdown and footer | |
| `Learn more about Substack for media founders →` | About | **Fully specific, with a trailing arrow** |
| `Substack Defender` | About | Product name as link text |
| `Skip to main content` | Help centre | Present on help; **absent on substack.com** |
| `Submit Feedback` | Help article foot | |
| `Return to top` | Help foot | |
| `See all 68 articles` | Help category | **Count included in the label** |
| `See more` | Help article sidebar | Same function, no count |
| `Next ›` / `Last »` | Help pagination | Chevron entities as labels |
| `Refresh` | n/a | — |
| `turn on JavaScript` | Every marketing page foot | "This site requires JavaScript to run correctly. Please turn on JavaScript or unblock scripts" |

**Four labels for "make a Substack": `Create your Substack` / `Start your Substack` / `Get started` / `Start publishing`** — one per surface, all pointing at signup. The homepage uses one label seven times and the About page uses a different one four times, so the inconsistency is between pages rather than within them, which is the more forgivable version. Still recorded.

### Documented in-product CTAs

**Publishing** `[documented]`

`Subscribe now` (insertable button) · `Subscribe with caption` · `Buttons` (editor menu) · `Publish` · `Settings` · `Payments` · `Website editor` · `Welcome page` · `Edit` · `Save` · `Boost` · `Enable Boost` (toggle)

**Subscriber management** `[documented]`

`Subscribers` (page) · `Comp` (the action, in a three-dot menu) · `Set to Founding` (checkbox) · `Paid subscription expired email` · `Edit` · `Save` · `View account` (Stripe link) · `View Creator Stats` · `Total earnings` · `Transactions` → `Payouts` (Stripe)

**`Comp` as a user-facing verb-button is the standout.** Not "Give free access", not "Grant subscription", not "Gift" — `Comp`, the industry contraction for a complimentary ticket. Selected subscribers → three dots → `Comp`. It is jargon, it is four characters, and it is exactly what a publisher would say. See T13.

**`Set to Founding` is the other one** — a checkbox that converts a comped reader into the top tier, phrased as an imperative fragment with the tier name truncated (`Founding`, not `Founding Member`).

### Reader-facing CTA vocabulary

`[documented]` mostly, and thinner:

`Subscribe` · `Subscribe now` · `read it first` (the decline option — "They'll be prompted to subscribe or have the option to read it first") · `Free` / `Monthly` / `Annual` / `Founding Member` (plan selection)

**`have the option to read it first`** is the notable phrasing for the paywall-decline path. Not "Maybe later", not "No thanks", not "Continue without subscribing" — the help copy describes the affordance as *reading first*, which frames the decline as a trial rather than a refusal.

## T4 Onboarding & getting-started

**No step-numbered signup flow is publicly reachable**, and there is no product tour. `[absent]` for observed onboarding.

**The onboarding promise is a duration, repeated** `[observed]`

> `Get started in minutes` (homepage section header)
> "Getting started is easy. Set up paid subscriptions in just a few minutes." (Going paid)
> "Launch in minutes and build a sustainable business on your own terms." (About)
> "No tech knowledge is required." (homepage FAQ)
> "that requires zero technical experience" (About)
> "All you need is something to say; Substack handles the rest." (About)

**Six statements of the same reassurance across three pages**, cycling between a time claim (`in minutes`, `a few minutes`), a skill claim (`No tech knowledge`, `zero technical experience`), and a reductive claim (`All you need is something to say`). The last one is the strongest: it reduces the entire prerequisite list to a single non-technical thing.

**Migration is the real onboarding path, and it is named per source** `[observed]`

> "If you already have an audience on Wordpress, Mailchimp, Beehiiv, Ghost, Medium, Tumblr, or another platform, you can easily import your posts and your email list in the Substack setup process."

**Seven named competitors in one sentence on the homepage FAQ**, plus dedicated help articles (`How do I move from Mailchimp to Substack?`, `How do I move from Ghost to Substack?`, `How do I move from Beehiiv to Substack?`, `How do I move from my current platform to Substack?`, `How do I move my podcast to Substack?`) and two comparison pages in the footer (`Substack vs. beehiiv`, `Substack vs. Patreon`).

Substack's onboarding content strategy is **almost entirely migration-shaped**. There is no "starting from nothing" guide in the nav; there is `Switch to Substack` in position one of the Creators dropdown.

**`Resources` as a parallel onboarding system** `[observed]`: `How to start a Substack` · `Going paid guide` · `Resource center` · `Community & programs`. A separate content estate from the help centre, linked from every help page ("Looking for advice on how to make the most of Substack? Check out our writer resources.").

**Two onboarding systems, unreconciled**: `support.substack.com` (procedural) and `substack.com/resources` (advisory), with the help centre pointing at resources on every page and resources presumably pointing back. A reader cannot tell which to use for which question.

**The reader's first-visit experience is documented, with a testing instruction** `[documented]`

> "Readers can directly subscribe to your Substack on their first visit to your publication. They'll be prompted to subscribe or have the option to read it first."

And then, for the writer:

> "**Tip:** To see exactly what a brand-new reader sees, open your **/subscribe** link in a private or incognito browser window. A private window isn't signed in and doesn't carry a recent visit, so it always shows the first-time view."

**Substack teaches writers how to QA their own funnel**, with the mechanism explained (`isn't signed in and doesn't carry a recent visit`). That is help copy doing product-empathy work — it tells the writer that the thing they see is not the thing the reader sees, and gives them the two-step fix.

**The recognition branch is disclosed** `[documented]`

> "If Substack doesn't recognize them yet, they'll be asked for their email address first."
> "If they're signed in or their email is already known from a recent visit, they'll go straight to your subscription plans."

Two states of the same page, both described, so the writer knows the funnel has a fork.

## T5 Form & field labels

Thin on observed; Substack's forms are behind auth.

**Observed** `[observed]`: `How can we help?` (help search) · `Popular:` · the calculator's slider values (`50 subscribers` … `50,000 subscribers`; `$5/month` … `$75/month`) · `Coupon` — no, that's Letterboxd.

**Help-article feedback form, observed in full** `[observed]`

> `Was this article helpful?` → `Yes` / `No`
> `We're sorry to hear that. Can you tell us what went wrong?`
> `These steps didn't help`
> `I couldn't find what I was looking for`
> `The content is confusing or unclear`
> `Something else`
> `Submitting feedback will not open a ticket with our Support team. For help with your account, please select "Need more help?" in an article.`
> `Submit Feedback`
> `Thank you! Your feedback helps us improve this article for everyone.`

**This is the best-designed micro-form in the whole cohort.** Four reasons why:

1. **The four reason options are a genuine diagnostic taxonomy**, not a satisfaction scale. `These steps didn't help` (the article was right but wrong), `I couldn't find what I was looking for` (the article was wrong), `The content is confusing or unclear` (the writing was wrong), `Something else`. Those map to three different content-ops remedies.
2. **The empathy line is conditional** — `We're sorry to hear that` fires only on `No`, so the apology is earned rather than pre-emptive.
3. **The expectation-setting line is the critical one**: `Submitting feedback will not open a ticket with our Support team.` It closes the "I told them and nobody replied" loop before it opens, and it routes to the correct channel in the same sentence.
4. **The thank-you is other-directed**: `Your feedback helps us improve this article for everyone.` Not "thanks for your feedback" — it names the beneficiary.

**Documented field labels** `[documented]`

`Set to Founding` (checkbox) · `Paid subscription expired email` (a settings row label, with an `Edit` beside it) · `Buttons` → `Subscribe now` / `Subscribe with caption` (editor dropdown options) · `Enable Boost` (toggle, quoted in the article as `"Enable Boost."` **with the full stop inside the quotes**) · `type is "Paid"` (a subscriber filter value) · `Welcome page` (a website-editor section)

**The comp duration picker, documented as an enumerated list** `[documented]`: "You'll have a choice of **7 days, 30 days, 90 days, 6 months, 1 year, or forever**."

**`forever` as a duration option in a dropdown** is a real and delightful choice. Six values, five numeric, one absolute — and `forever` in lowercase beside `7 days`.

## T6 Collection & publication states — PRIORITY (two-sided)

Substack has **two state systems that must stay in sync**: a reader's subscription state and a post's publication/paywall state. The vocabulary is where the two meet.

### Reader-side: the four plan types

`[documented]` — from `How do readers subscribe to my Substack publication?`:

> "On Substack, there are four types of plans:"

| Plan | Definition (verbatim) |
|---|---|
| `Free` | "Free subscribers will receive free posts via email and the Substack app." |
| `Monthly` | "Subscribers will automatically be charged each month and can access paid posts." |
| `Annual` | "Subscribers will make a one-time payment and this rate will automatically renew. Readers or listeners can access paid posts like monthly subscribers." |
| `Founding Member` | "Subscribers can access founding member only posts." |

**Two of the four are named by billing cadence and two by relationship.** `Monthly` and `Annual` are periods; `Free` and `Founding Member` are statuses. That is a mixed taxonomy — the reader choosing between them is comparing a price schedule against an identity.

**`Annual` carries an internal contradiction in its own definition**: "will make a **one-time payment** and this rate will **automatically renew**." One-time and recurring in one sentence. What is meant is "one charge per year" but what it says is both. Recorded as a defect on a billing disclosure.

**`Founding Member` is defined entirely by content access** — "can access founding member only posts" — which is the *weakest* possible definition of the tier. Its actual purpose is stated only in a separate article: the founding option "allows readers to pay more than the listed price as an extra show of support, similar to a donation." So the tier that exists as a **donation mechanism** is defined in the primary article as a **content gate**. The generous motive is documented in the wrong place.

Note the lowercase compound in the definition: `founding member only posts` — unhyphenated, three words, against `Founding Member` capitalised in the plan name. Two forms in one row.

### Reader-side: derived and granted states

`[documented]`

| State | Wording |
|---|---|
| `Paid` | A subscriber filter value — "apply a filter where type is 'Paid'" |
| comped | "complimentary paid subscription", set via `Comp` |
| comped + founding | "To grant a subscriber Founding Member status, check the box next to 'Set to Founding'." |
| comp expiring | Reminder emails "one week before and the day before the complimentary subscription ends" |
| comp expired | "an email letting them know that their paid subscription has ended" |
| cancelled | `How do I cancel my paid subscription on Substack?` |
| disputed | `What happens when a subscriber disputes a paid subscription on Substack?` |
| refunded | `How do I cancel a subscription and issue a refund for a paid subscriber on Substack?` |
| following (not subscribed) | `What is following on Substack?` — a distinct, non-subscription relationship |
| section-subscribed | `How do I see who is subscribed to a section on my Substack publication?` |
| segmented | `What are subscriber segments on Substack?` |
| tagged | `How do I add tags to a subscriber on Substack?` |

**`following` as a state distinct from `subscribing`** is a significant addition — Substack now has a social-graph relationship that does not involve email delivery, and it has its own help article. That is the Notes product bleeding into the subscription model.

**The comp expiry sequence is documented with timing and a customisation boundary** `[documented]`

> "The subscriber will receive reminder emails from your publication **one week before and the day before** the complimentary subscription ends with the option to continue as a paid subscriber. **This email is not customizable.**"

Two reminders, at named intervals, and then the constraint — `This email is not customizable` — stated bluntly. Then the contrast: the *expired* email **is** customisable, with a three-step path to edit it ("Next to 'Paid subscription expired email', select 'Edit'"). So one email in the sequence is locked and one is editable, and Substack says which.

**Telling a writer which of your system emails they cannot change is a good and rare disclosure.** It pre-empts the support ticket and it respects the writer's need to know the boundary of their own voice.

### Writer-side: post and paywall states

`[documented]` from the `Publishing a post` section titles and the payout article:

| State / control | Evidence |
|---|---|
| draft | `How can I add space and align certain text in a draft post on Substack?` |
| published | `How to publish a post from the Substack app` |
| scheduled | "schedule publications" (About, editor tools) |
| free | `How do I change a post from paid to free?` |
| paid / paywalled | same; plus `How do I paywall my archive of free posts on Substack?` |
| `teaser post` | `What is a teaser post on Substack?` — **a named partial-paywall state** |
| audience-specific | `How do I add audience-specific content to a post on Substack?` |
| paywalled mid-item | "you can use a paywall for: the whole podcast; select episodes; or **at any point in a particular episode**" |
| paywalled mid-video | "make videos available to everyone, or use a paywall for a whole or part of a video" |
| restacked | `What happens when someone restacks my post?` |
| archived | "manage your archive within a single CMS" |
| tagged | `How do I add tags to Substack posts?` |

**The paywall has a granularity vocabulary, and it is the most precise thing in this file** `[observed]`

> "You can make your show free to everyone or you can use a paywall for: **the whole podcast; select episodes; or at any point in a particular episode.**"

Three scopes, semicolon-separated, escalating in precision — whole / selected / **mid-item**. And the video equivalent: "use a paywall for **a whole or part of** a video."

`at any point in a particular episode` is the notable one. Substack has a time-indexed paywall and describes it with a locative phrase rather than a feature name. Most platforms would call this "mid-roll gating"; Substack says where the wall goes.

**`teaser post` is the one named partial state** and it has its own article (`What is a teaser post on Substack?`, unopened). The name is from publishing, not from software — a teaser is a trade term for an excerpt published to sell the whole.

**`restack` is the coined sharing verb** and it has a consequence article written from the *recipient's* perspective: `What happens when someone restacks my post?` — i.e. the help centre answers "someone did a thing to my work, what now" rather than "how do I restack".

### The two-sided sync point

**`How do I add audience-specific content to a post on Substack?`** is where the two state systems meet — a single post rendering differently per subscription tier. Named, articled, and unopened in this harvest.

And the reverse: `How do I send an email to one or a select group of subscribers on Substack?` and `How do I change what subscribers see on their bank or credit card statements?` — the writer controlling what a specific reader-state cohort receives, including on their bank statement.

**`How do I change what subscribers see on their bank or credit card statements?`** is the most under-appreciated article title here. The publisher's brand name appearing on a stranger's card statement is a chargeback-prevention problem, and Substack has made it a writer-editable field with a help article. That is two-sided thinking extended into the payment rail.

### Account deletion state

`[observed]` from Terms:

> "When you delete your account, any Posts associated with that account will also be deleted. **However, any Post that you have made public may remain available.**"
> "You understand and agree that it may not be possible to completely delete your content from Substack's records or backups, and that your Posts may remain viewable elsewhere to the extent that they were copied or stored by other users."
> "If you have deleted your account by mistake, contact us immediately at tos@substackinc.com – we will try to help, but unfortunately, **we can't promise that we can recover or restore anything.**"

**Three escalating honesty statements about deletion**: public posts may persist, backups may persist, and recovery is not promised. `we will try to help, but unfortunately, we can't promise` — the hedge is explicit rather than implied. Compare Letterboxd's 90/30-day machinery; Substack has no windows and admits it.

## T7 Error, failure & recovery

**The best-observed failure copy is the help-article feedback path** — see T5. `We're sorry to hear that. Can you tell us what went wrong?` is the only conditional apology observed in this corpus.

**Failure-shaped article titles, in the reader's or writer's own words** `[observed]`

| Title (verbatim) | Notes |
|---|---|
| `I subscribed to a Substack publication but am not receiving any emails. What can I do?` | **Reader's first person, with the situation before the question.** The most prominent FAQ item on the help home. |
| `A subscriber told me they aren't getting my emails. What should I do?` | **The same failure from the writer's side, reported second-hand.** |
| `What can I do if I'm having issues with my custom domain and can't access my Substack publication?` | Conditional first person, compound failure |
| `Why is my Stripe payout less than what my paid subscribers paid for?` | The money-is-wrong question, named |
| `Why aren't my notes showing up in the Notes tab on my Substack publication?` | |
| `What happens when a subscriber disputes a paid subscription on Substack?` | |
| `Stripe is asking for additional business information for my Stripe account. What do I need to do?` | Third-party-initiated failure, quoted as an event |
| `Stripe asked me to verify my domain. What should I do?` | Same shape |
| `What do I need to do if Stripe requires extra verification to accept direct debit or non-credit card payment methods on my Substack?` | 27 words |
| `I'm being asked to verify my age on Substack. What options do I have?` | Passive voice for a gate, then `What options do I have?` |

**The two-sided failure pairing is the finding.** `I subscribed … but am not receiving any emails` and `A subscriber told me they aren't getting my emails` are the same deliverability failure, written twice, from the two parties' vantage points, in the two different help surfaces each party will reach. Neither article assumes the other's knowledge. That is the correct way to document a failure in a two-sided product and almost nobody does it.

**The title grammar is consistently `<situation>. <question>?`** — a statement of the problem followed by a separate interrogative (`What can I do?`, `What should I do?`, `What do I need to do?`, `What options do I have?`). Four variants of the same closing question across ten titles. The pattern is good; the four variants are a consistency defect.

**`Why is my Stripe payout less than what my paid subscribers paid for?` — answered with a cause the writer opted into** `[documented]`

> "If your payouts are lower than you expected, it's possible that you have **Substack Boost** enabled. Substack Boost will automatically show discounts and special offers at the right moment to your subscribers to maximize your revenue."
> "Your free subscribers may've been offered a **20% discount** to a paid subscription plan. If you'd no longer like to offer a 20% discount to engaged readers, you can disable this option."

**Substack discounts the writer's own subscriptions by default and the writer discovers it by noticing a shortfall.** The article discloses the mechanism, names the percentage, explains the rationale ("to maximize your revenue"), and gives the three-step opt-out path (`Settings` → `Boost` → toggle off `Enable Boost`).

This is honest *after the fact* and it is the more interesting finding: the disclosure exists only in a troubleshooting article titled around the symptom. A writer who never checks their payout against expectations never learns that a 20% discount is running. Recorded as a **disclosure-placement defect** — the content is good, the location is reactive.

Note `may've` — a written contraction of "may have" in a help article. Informal to the point of error.

**Latency stated as a range** `[documented]`: "Payments usually arrive in your bank account within **48 hours** of each transaction". `usually` plus a number.

**A metric-mismatch article** `[documented]`: `Why is there a difference between my Substack GARR and Stripe MRR?` — a whole article reconciling two revenue metrics from two systems with two acronyms. And a companion: `Changes to your Substack Gross Annualized Revenue`.

**Report-abuse failure handling** `[observed]`

> "Reports submitted through our reporting tools must be made in good faith… **We reserve the right to close reports that are frivolous, vexatious, or manifestly unfounded without taking action.** Repeated misuse of our reporting system, including submitting reports intended to harass, suppress, or disadvantage other users, may result in restrictions on your ability to submit further reports or on your account more broadly."

Three named bad-faith categories (`frivolous`, `vexatious`, `manifestly unfounded`) and a two-stage consequence (report-throttling, then account action). **A moderation system documenting its own abuse-of-process rules** — rare, and directly relevant to Substack's contested position.

## T8 Empty states

`[absent]` for observed in-product empty states.

Two adjacent observations:

- **`substack.com/pricing` and `substack.com/content-guidelines` both return completely empty bodies.** Not a 404, not a redirect — a blank response. These are guessable, linkable-looking URLs (and `/content-guidelines` is the natural guess for the page that actually lives at `/content`). A zero-content response where a page is expected is the worst available empty state, and it ships. Recorded as a defect.
- **Every marketing page carries a JavaScript-required notice in the fetched body** `[observed]`: "This site requires JavaScript to run correctly. Please **turn on JavaScript** or unblock scripts". A no-JS fallback exists, it is one sentence, it links to a third-party explainer (`enable-javascript.com`), and it offers no degraded content path. Better than Goodreads' `CSS Error`; still a dead end.

## T9 Notifications & system messages

**The email-and-notification estate is a documented product area** `[documented]`, though mostly as article titles:

| Article title | What it implies |
|---|---|
| `How do I set up welcome emails on Substack?` | Onboarding email, writer-authored |
| `How can I edit the Substack Boost upsell email?` | **A Substack-generated upsell email that the writer can edit** |
| `Paid subscription expired email` | Editable system email |
| comp-expiry reminders | **Not** editable — stated explicitly |
| `How do I test different titles for email newsletters on Substack?` | Subject-line A/B testing |
| `How do I change my email sender name?` | |
| `How do I turn off direct messaging notifications on Substack?` | |
| `How can I filter spam to my Substack address?` | |
| `A subscriber told me they aren't getting my emails. What should I do?` | Deliverability |
| `I subscribed to a Substack publication but am not receiving any emails. What can I do?` | Same, reader side |

**Substack's notification model has three authorship layers**, and the help centre distinguishes them: writer-authored (welcome emails, posts), writer-editable-Substack-authored (`Boost upsell email`, `Paid subscription expired email`), and Substack-authored-and-locked (comp expiry reminders). **Naming which system emails a publisher may put their voice into is the notable practice**, and it is the two-sided problem in miniature — the reader receives a message whose author is ambiguous, and the platform decides per-message whose voice it carries.

**Revenue tooling described as a lifecycle of messages** `[observed]`

> `Revenue tools` — "Built to convert. Every feature—**welcome sequences, win-back campaigns, boosts, analytics**—is designed to turn free subscribers into paying ones and keep them coming back."

`welcome sequences` and `win-back campaigns` are named as first-class features on the marketing page. `win-back` is marketing-ops jargon exposed to writers. And the stated purpose — "turn free subscribers into paying ones" — is unusually blunt about what the messaging estate is for.

**Community surfaces as notification channels** `[observed]`: "Comments, Chat, Notes, direct messaging, and community threads connect you and your subscribers directly." Five named channels in one sentence. Plus `Subscriber chats, comment threads, and moderation tools turn a publication into a community.`

**Status page surfaced on every help page** `[observed]`: "Is Substack down or are you having a service issue? Check out our **status page**." Phrased as the user's two possible hypotheses (it's them / it's me) before routing.

## T10 Disclosures, legal & compliance — TWO-SIDED PAYMENT MODEL

### Writer side — the fee, and the three places it is worded differently

| Surface | Wording |
|---|---|
| Homepage FAQ | "Substack will keep a **10% cut** of revenues for operating costs like building growth tools to help publishers, developing new features, and providing world-class customer support. **There are no hidden fees** and we only make money when publishers do." |
| About tile | "**90% goes to you.** The rest powers the platform that supports your work." |
| About calculator caveat | "Writers keep **90%** of their revenue **minus credit card fees**." |
| About stats block | "Writers keep 90% of their revenue minus credit card fees." |
| Going paid | "Keep **90%** of the revenue." |

**One fee, three framings: a cut we keep, a share you get, and a share you get minus a third-party deduction.** The most complete version (`90% … minus credit card fees`) appears only beneath the calculator. The `Keep 90% of the revenue` version on `/going-paid` omits the card fees entirely, on the page whose whole purpose is estimating earnings.

**`There are no hidden fees` is doing a lot of work** and it is defensible only because of the calculator caveat elsewhere. On the homepage FAQ, `no hidden fees` sits in the same sentence as the 10% figure and **without** the card-fee qualifier. A reader of the FAQ alone would conclude 90% is net. Recorded as the most consequential disclosure inconsistency in this file.

**The justification for the fee is itemised** `[observed]`: "operating costs like **building growth tools** to help publishers, **developing new features**, and **providing world-class customer support**." Three named uses. And the alignment claim, stated twice in slightly different words: "we only make money when publishers do" (homepage) / "Our entire business model depends on your success—we only make money when you do" (About).

**Payout mechanics** `[documented]`

- Rail: Stripe, named and linked to Stripe's own docs
- Timing: "Payments usually arrive in your bank account within 48 hours of each transaction"
- Where to look: Stripe → `Transactions` → `Payouts` tab
- Detail: "Click on the individual payout to view a detailed ledger of payment details, such as **fees and the ETA for the payout**."
- In-product: `/publish/stats/earnings` for "**Lifetime earnings** and a breakdown of payments by each payout period"
- App: `View Creator Stats` → `Total earnings` → "a total **net revenue** and a breakdown of your payouts **after all applicable fees (Substack and Stripe fees)**"
- **A commingling warning**: "These payouts will mirror the payouts on your Stripe account and may include activity from sources other than Substack **if you use your Stripe account for multiple businesses or projects**."

**`after all applicable fees (Substack and Stripe fees)`** — the parenthesis naming both fee-takers, in the app's own stats description. This is the honest version of the 90% claim and it lives in a payout troubleshooting article.

**The commingling warning is good practice**: telling a writer that the number they are looking at may include income from elsewhere, because they control the Stripe account, pre-empts a reconciliation panic.

**Tax and jurisdiction** `[documented]`: `How do I file taxes on the money I've made on Substack?` · `How can I export my invoice data for tax purposes?` · `Does Substack integrate with Stripe Tax?` · `How do I find the billing country of a paid subscriber?` (which exists **twice**, as two different articles with identical titles — one in `Payments help`, one in `Subscriber help`)

**Restricted businesses disclosed by reference** `[observed]`

> `People restricted from making money on Substack`
> "Substack's payments are processed through Stripe, which excludes certain types of businesses from using their service. Please refer to the Stripe Service Agreement (see the US agreement here) and Stripe's restricted businesses for more information about restricted business categories and practices."

**A section heading in the Content Guidelines about who cannot earn**, attributing the restriction entirely to the payment processor and linking out twice rather than restating. Honest about the source of the constraint, and it means Substack's monetisation eligibility is governed by a document Substack does not control — stated plainly.

**Currency and local payment** `[documented]`: `Can readers pay for subscriptions using their local currency on Substack?` · `How can readers pay for a subscription on my Substack publication?`

### Reader side — what you pay and how you leave

`[documented]` — and this is thinner than the writer side.

- `How do I cancel my paid subscription on Substack?` is the **third** of seven items in the help home's `Frequently Asked Questions` block — cancellation surfaced on the front door
- Four plan types (see T6)
- Proration disclosed for upgrades: "If you upgrade your subscription plan from annual to founding member, you'll be charged a **prorated** amount, and your renewal date will change to the date you made the upgrade."
- Dispute path documented from the writer's side (`What happens when a subscriber disputes a paid subscription on Substack?`)
- Refunds documented from the writer's side only (`How do I cancel a subscription and issue a refund for a paid subscriber on Substack?`) — **there is no reader-side refund article in the harvested set**
- Bank-statement descriptor is writer-controlled (`How do I change what subscribers see on their bank or credit card statements?`)
- `What are Substack funded gifts?` — **Substack paying for gift subscriptions**, a named programme
- `What are Subscriber Perks on Substack?` · `What are subscriber segments on Substack?`

**Terms of Use is explicit that Substack will not adjudicate reader-writer disputes** `[observed]`

> "A Creator may offer their publications for free or for a subscription fee, **to be determined in the Creator's discretion**."
> "Creators will set prices for their publications, and may change the prices at their sole discretion through their Creator account, **though no price changes shall apply retroactively.**"
> "In the event that a Reader has a dispute with a Creator, you agree, as either/both a Reader and a Creator, that **Substack is under no obligation to become involved** other than to direct any inquiries regarding a Creator's publication to the appropriate Creator pursuant to the Publisher Agreement."

**`no price changes shall apply retroactively` is the one reader protection in the clause**, and it is the only one. Everything else devolves to the Creator's discretion and Substack's non-involvement. The dual-role framing (`as either/both a Reader and a Creator`) is how the Terms handle a single account being both parties.

**The Creator/Reader dual role is stated as a definition** `[observed]`

> "As a Substack account holder, you are **both a Creator and a Reader**. As a Creator, subject to the terms of our Publisher Agreement, you can use Substack to publish content to the web, directly to a list of subscribers that you control, and to our platform. As a Reader, you can use your Substack account to subscribe to or follow other Creators' Substack content."

**One account, two capacities, two contracts, defined in one paragraph.** This is the cleanest articulation of a two-sided identity model in the corpus. It also means every user is bound by the Publisher Agreement whether they publish or not.

**Ownership, stated in Terms as well as marketing** `[observed]`

> "First and foremost, **you own what you create.**"
> "That includes publications, subscriber lists, any other text or photos you upload to your subdomain on Substack, and any information that you provide to obtain a Substack username and account. It also includes any comments posted on any current or future discussion board features on Substack."

Then the licence, with the grant **explained by example**: "You understand and agree that we may need to make changes to your Posts to conform and adapt those Posts to the technical requirements of networks, devices, services, or media, and this license includes the rights to do so. **For example, we may need to modify your publication to make sure it is viewable on an iPhone as well as a computer.**"

**A content licence clause with a worked example in plain language.** That single sentence does more to defuse "why are you taking rights to my work" than any amount of hedging, and the licence terms are then stated flatly: "royalty-free, perpetual, irrevocable, and worldwide. **This is a license only – your ownership in Posts is not affected.**"

The marketing claim and the legal clause agree, which is the point: `You made it, you own it.` on the homepage and `you own what you create` in Terms.

**But the removal right sits immediately after** `[observed]`: "We reserve the right to remove any content from Substack at any time, for any reason (including, but not limited to, if someone alleges you contributed that content in violation of these Terms), in our sole discretion, and without notice."

`at any time, for any reason … in our sole discretion, and without notice` — four unbounded qualifiers, adjacent to the ownership promise. Worth recording as the seam.

### The moderation position — publicly contested

**Substack's Content Guidelines (`substack.com/content`) state the position in three sentences, and the balancing language is the whole controversy** `[observed]`

> "Substack is a place for independent writers, podcasters, and creators. **We host and celebrate a diverse range of thought and discussion.** The following guidelines outline what is and is not acceptable on Substack. **We have the exclusive right to interpret and enforce these guidelines**, although we may consult outside experts, research, and industry best practices in doing so."

And then, under the heading `In General`:

> "We want Substack to be a safe place for discussion and expression. **At the same time, we believe that critique and discussion of controversial issues are part of robust discourse, so we work to find a reasonable balance between these two priorities.** In all cases, Substack does not allow credible threats of physical harm."

**This paragraph is the contested text and it is worth reading closely.**

- It names **two competing priorities** (safety; robust discourse) and commits to neither, promising instead a `reasonable balance`.
- `reasonable balance` is undefined and unappealable — there is no stated test, no factor list, no examples of where the balance falls.
- The one hard floor is stated last and narrowly: `In all cases, Substack does not allow credible threats of physical harm.` **`credible`** and **`physical`** are both doing limiting work. Threats that are not credible, and harms that are not physical, are outside the absolute prohibition.
- The document opens by *celebrating* diversity of thought ("host and celebrate") before stating any rule, which sets the interpretive frame before the reader reaches a single prohibition.

**The `Hate` section is where the narrowness becomes concrete** `[observed]`

> "Substack cannot be used to publish content or fund initiatives that **incite violence** based on protected classes. Offending behavior includes **credible threats of physical harm** to people based on their race, ethnicity, national origin, religion, sex, gender identity, sexual orientation, age, disability or medical condition."

**The hate rule is an incitement-to-violence rule.** The protected-class list is long and modern (gender identity, sexual orientation, medical condition included), but the prohibited *act* is `incite violence`, and the stated example is `credible threats of physical harm`. There is **no prohibition on hate speech as such** — no dehumanisation clause, no slur clause, no stereotype clause, no denial clause.

**Contrast Medium (154)**, whose `Hateful content` rule prohibits "content that constitutes or promotes violence, harassment, or **hatred**", plus slurs, tropes, dehumanisation, "calls for intolerance, exclusion, or segregation", "targeted or intentional misgendering or deadnaming", and "harmfully ableist language". And **contrast BeReal (151)**, whose `Hate Speech` rule prohibits "incitement to hatred, violence, **or discrimination**", plus "discriminatory slurs", "dehumanising comparisons or stereotypes", and genocide denial.

**Three platforms in one domain, three thresholds: incitement-to-violence only (Substack), hatred-and-harassment-and-dehumanisation (Medium), hatred-violence-or-discrimination (BeReal).** Substack's is by a wide margin the narrowest, and that narrowness is the documented basis of the public contest. This file records the text and the comparison; it takes no position beyond that.

**The `Comments, Notes & Community Surfaces` section devolves moderation to writers and readers** `[observed]`

> "These guidelines also apply to Substack comments, notes, and other community surfaces. **We believe that writers are responsible for moderating their own communities as they see fit and readers for curating their own experiences on the platform.** Don't create accounts for the sole purpose of circumventing boundaries like blocks and bans imposed by other users. We may intervene to remove accounts engaged in artificial or inauthentic activity on community surfaces."

**A stated devolution of moderation responsibility to the two user classes**, with Substack reserving intervention for *inauthenticity* rather than for content. The reserved power is anti-bot, not anti-harm. That is a coherent editorial philosophy and it is exactly what critics describe.

**The jurisdictional additions are where the hard prohibitions actually live** `[observed]`

This is the structurally revealing part. Substack's global rules are narrow; its **country-specific appendices are broad**, and each is explicitly attributed to a statute:

> `Additional restrictions for users in Australia`
> "On top of the rules above, users in Australia must not post the following types of content. **These restrictions reflect our obligations under the Australian Online Safety Act 2021**: – pro-terror material (Class 1A); – crime and violence material (Class 1A and Class 1B); – drug-related material (Class 1B); and – content that depicts shocking, gratuitous, or exploitative real violence against people or animals, or gore, including images presented as if they are real ('high-impact violence material'). **These rules apply to content accessible to people in Australia.**"

> `Additional restrictions for users in the UK`
> "…**These restrictions reflect our obligations under the UK Online Safety Act 2023 (OSA) in respect of priority illegal content (Schedule 7 to the OSA) and priority harmful content (Schedules 4 and 5 to the OSA)**: – terrorism content…; – content that encourages or assists serious violence…; – content that promotes, facilitates, or assists fraud or financial crime, including scams targeting other users; – content that facilitates human trafficking or modern slavery; and – content that encourages, promotes, or provides instructions for suicide or self-harm. **These rules apply to content accessible to people in the UK.**"

**Terrorism, suicide-instruction, trafficking and fraud content are prohibited for UK and Australian readers and are not in the global rule set.** The global document has no terrorism section at all — where BeReal has `Terrorism or Violent Extremism` as prohibition 4 of 13, Substack has it only in the UK appendix.

**This is a geo-scoped content policy, stated as such**, with the scope sentence repeated verbatim at the end of each appendix (`These rules apply to content accessible to people in the UK` / `…Australia`). It is legally precise and legible. It also means the answer to "is this allowed on Substack" is "where is the reader".

**What the global rules *do* prohibit unconditionally** `[observed]`

`Legal` (IP, privacy, "You and you alone are responsible for the content you publish… and liable for any harm caused") · `Private information` (with the notable presumption: "we will presume in most cases that the publication of a private home address or phone number is a violation") · `Plagiarism` · `Impersonation` (including of Substack itself) · `Harmful and illegal activities` (self-harm/harm depiction, **CSAM**, **NCII** — "sharing, or threatening to share, sexual images of a person without their consent") · `Spam and phishing` · `Marketing and Promotion` · `Nudity, porn, erotica`

**The `Spam and phishing` rule is the most prescriptive in the document** `[observed]`

> "We are **vehemently** anti-spam and anti-phishing. If you are importing a mailing list from another platform, you are **required to ensure it's made up of people who explicitly opted-in** to receive emails from your specific publication. We don't allow imports of email addresses that were **purchased, scraped, or harvested** from third party websites. Don't add people to your mailing list without their consent, and **don't import your contacts list or social graphs.**"

`vehemently` is the strongest adverb in the whole document, and it is attached to spam rather than to any harm category. Four specific prohibited sources named. This is where Substack's enforcement energy visibly sits — consent to *email*, precisely specified; consent to *speech*, left to `reasonable balance`.

**`Marketing and Promotion` prohibits a business model** `[observed]`: "Substack is intended for **high quality editorial content, not conventional email marketing.** We don't permit publications whose primary purpose is to advertise external products or services, drive traffic to third party sites, distribute offers and promotions, enhance search engine optimization, or similar activities. Brands and commercial organizations publishing on Substack may be subject to additional verification."

**`Nudity, porn, erotica` draws three lines in one paragraph** `[observed]`: porn prohibited ("any visual depictions of sexual acts for the sole purpose of sexual gratification"); nudity permitted conditionally ("for artistic, journalistic, or related purposes"); erotic **literature** permitted; profile images absolutely restricted ("we have a strict no nudity policy for profile images"); and discovery de-ranked rather than removed ("We may hide or remove explicit content from Substack's **discovery features**, including search and on Substack.com"). Five different treatments calibrated by medium, purpose, and surface. It is the most carefully drafted section in the document.

**Enforcement remedies, stated once and vaguely** `[observed]`: "If we determine that any content is in breach of these guidelines, we may **remove it, hide it from public view, or impose other restrictions.**" Three remedies, the third open-ended. **There is no appeal process in the Content Guidelines**, no statement of reasons, no notification commitment — compare BeReal's five-item statement-of-reasons entitlement and Medium's `Appeals` section with an email address and two named grounds. Substack's only documented recourse channel is `tos@substackinc.com` for questions about the guidelines. Recorded as a significant gap.

**And the document declares its own instability** `[observed]`: "This is an **evolving document**: we reserve the right to update these Content Guidelines at our discretion and **without notice.**"

### The reporting system — well built, and better than the policy it enforces

**Ten violation categories, each with a one-sentence definition, as a selectable list** `[observed]`

| Category | Definition (verbatim) |
|---|---|
| `Spam` | "Content that is repetitive, misleading, or primarily intended to manipulate or advertise." |
| `Impersonation` | "Content or accounts pretending to be another person, brand, or organization in a misleading way." |
| `Hate, Abuse, Harassment` | "Content that attacks, threatens, or intimidates people or groups, including abuse, harassment, hate, or violent speech." |
| `Child Safety` | "Content that sexualizes, exploits, endangers, or otherwise harms children." |
| `Explicit Media` | "Content that shows explicit sexual material or promotes sexually exploitative content." |
| `Illegal & Regulated Behaviors` | "Content that may be illegal or require review under applicable online safety laws." |
| `Plagiarism` | "Content that reproduces another creator's work without attribution or permission." |
| `Private or Non-consensual Content` | "Content that shares someone's personal or sensitive information without permission, including intimate imagery." |
| `Suicide & Self Harm` | "Content that promotes, encourages, or depicts suicide or self-harm." |
| `Terrorism & Violent Extremism` | "Content that promotes, supports, or glorifies terrorism or violent extremist ideologies." |

**The report taxonomy is broader than the Content Guidelines it enforces.** `Hate, Abuse, Harassment` accepts reports of "hate, or violent speech"; the Guidelines prohibit only incitement to violence. `Terrorism & Violent Extremism` is a global report category; the Guidelines prohibit terrorism content only for UK users.

**A user can report things the global policy does not prohibit.** That gap between the reporting taxonomy and the rule set is the most concrete finding in this section — the report form promises a review against a standard that the published guidelines do not contain.

**Three report classes, grouped by heading** `[observed]`

| Heading | Purpose | Routes |
|---|---|---|
| `Violation Categories` | "Choose the category that best fits the content you're reporting." | Ten in-product categories |
| `Regulatory Safety Reports` | "Use these forms for reports covered by regional online safety and platform accountability laws." | `UK Online Safety Act`, `EU Digital Services Act` |
| `Content Potentially Violating the Law` | "Use these forms for intellectual property or legal complaints that require formal documentation." | `Copyright` (DMCA takedown or counter-notice), `Trademark` |

Plus a fourth: `Resources for Law Enforcement`, with two dedicated addresses (`ler@substackinc.com`, `osa@substackinc.com`) and a cooperation statement.

**Three report classes distinguished by the standard applied rather than by the harm** — community guidelines, statute, and IP law — each with its own scope line telling the reporter which to pick. That is good routing. And `counter-notice` offered alongside `takedown request` on the copyright route means the accused party has a form too.

**Reporter privacy stated up front** `[observed]`: "All reports are reviewed by our **Standards & Enforcement team** and are **not visible to the reported user**." The team is named, and anonymity is guaranteed in the same sentence.

**DSA and OSA contact points published in the Content Guidelines** `[observed]`: single point of contact under Articles 11 & 12 (`dsa@substackinc.com`), the named regulator (`Coimisiún na Meán`), the Article 13 legal representative with full postal address and phone (`Lionheart Squared (Europe) Limited`, Dublin), and a language requirement ("Please ensure that any communications sent to us are submitted in English or accompanied by an English translation"). Complete and compliant.

### Substack Defender — legal support as a content feature

`[observed]`

> `Legal support for your work`
> "**Substack Defender** provides publishers access to legal support, including **legal fees, advice, and pre-publication review**, so you can publish your best work **without fear**. Since its launch in 2020, Defender has supported **dozens of creators** facing alleged **defamation, claims of trademark and copyright infringement**, and more."

Three named services, a launch year, a quantified track record (`dozens`, deliberately imprecise), and three named claim types. `without fear` echoes the `Write and publish without fear.` tile above it.

**A platform indemnifying its publishers' legal exposure, named as a product, on the About page.** For a company whose editorial position is contested, funding writers' defamation defence is the positive expression of the same philosophy — and it is a genuinely differentiating disclosure.

### Age and identity

`[observed]` / `[documented]`

- Terms: "you may not and must not use Substack if you are **under 16 years old**" — and COPPA framed at 16, not 13: "We do not knowingly collect or solicit personally identifiable information from children **under 16**"
- `I'm being asked to verify my age on Substack. What options do I have?`
- `Substack 18+ Content policy`
- `Can I write anonymously on Substack?` — pseudonymity permitted, with its own article
- `Nonconsensual Intimate Image Removal Policy` — a named standalone policy
- `Substack and the Australian Online Safety Act` — a country-specific explainer article

**A 16 age floor is higher than the COPPA minimum of 13** and higher than BeReal's 13. Notable and unexplained.

### Accessibility statement

`[observed]` — and it is three sentences:

> `Accessibility at Substack`
> "Substack is committed to improving the accessibility of our platform. We continuously work to enhance our services with guidance from accessibility standards, **including WCAG 2.1.**"
> "While **user-generated content is created and managed by individual publishers**, we strive to provide tools that enable accessible publishing."
> "For accessibility feedback or to report barriers, please contact us using the following **form**."

**Substack is one of only two products in this cohort with a real accessibility statement in the global footer**, and the middle sentence is the interesting one: it **disclaims responsibility for the accessibility of the content on its platform** while claiming responsibility for the tools. For a platform whose product is other people's HTML, that division is defensible and honestly stated.

`report barriers` is the right verb. No conformance level is claimed (`with guidance from … including WCAG 2.1` is carefully not a conformance statement), no VPAT is linked, and no remediation timeline is given. Thin, honest, and present — which puts it ahead of BeReal, Letterboxd, Medium and Goodreads, all of which have nothing.

## T11 Help-centre architecture

**Platform: Zendesk. Three levels: category → section → article.** Two visible categories (`Creators`, `General`), twelve sections under `Creators`, and article counts in the hundreds (`See all 68 articles` on `Publications 101`; `See all 66 articles` on `Publishing a post`, paginated across three pages).

**Article-title grammar — overwhelmingly one shape** `[observed]`

**`How do I <verb> …?`** dominates: `How do I set up my custom domain on Substack?` · `How do I add alt text to an image on a Substack post?` · `How do I paywall my archive of free posts on Substack?` · `How do I embed a code block in a Substack post?` · `How do I start a Chat thread?` · `How do I turn off direct messaging notifications on Substack?` — dozens of instances.

Variants: `How can I <verb>…?` (`How can I detect AI on Substack?`, `How can I add recipes to a post on Substack?`, `How can readers flip to a new post?`) · `What is/are <noun>?` (`What is a teaser post on Substack?`, `What are Substack leaderboards?`, `What are subscriber segments on Substack?`) · `What happens when <event>?` (`What happens when someone restacks my post?`, `What happens when a subscriber disputes a paid subscription on Substack?`) · `Can I <verb>…?` (`Can I write anonymously on Substack?`, `Can I search in a Chat on Substack?`, `Can I limit note replies to paying subscribers?`) · Bare noun/gerund (`Getting started on the Substack app`, `A guide to Substack metrics`, `Report content on Substack`, `Understanding your Substack Podcast dashboard`)

**`How do I` vs `How can I` is not allocated to any distinction** — both appear for capability questions, on the same section pages. Two stems, one meaning.

**Almost every title ends with `on Substack` or `on a Substack post`.** `How do I add tags to Substack posts?` · `How do I add a drop cap to my Substack post?` · `How do I embed Datawrapper charts in a Substack post?` · `Can I add a cashtag to a Substack post?`

**The brand name appears in roughly 80% of article titles.** Inside a help centre at `support.substack.com`, under a breadcrumb reading `Substack, Inc`, every title repeats "Substack". It is transparently SEO-motivated (these titles rank for "how do I X on Substack") and it costs scannability badly — a section page becomes forty near-identical strings whose distinguishing words are buried mid-title. Recorded as the largest titling defect in the file.

**Two articles share an identical title**: `How do I find the billing country of a paid subscriber?` exists twice, at two article IDs, in two sections (`Payments help` and `Subscriber help`). A duplicate with no disambiguation.

**A typo in a shipped title** `[observed]`: `How to do I hide my phone number or email on Stripe?` — "How to do I". It appears on both the section listing and the article sidebar, so it is the canonical title.

**Third-party integrations named in titles** `[observed]`: `How do I embed Polymarket odds on Substack?` · `How do I embed Datawrapper charts in a Substack post?` · `How do I upload my Substack video clips to LinkedIn?` · `How can I distribute my paid Substack podcast on Spotify?` · `How do I receive a verification email from Spotify for my Substack podcast?`

Naming specific third parties in help titles (Polymarket, Datawrapper, Spotify, LinkedIn) is a content-ops commitment — each is a maintenance liability when the partner changes. It is the same specificity decision as Wise's per-issuer decline article.

**Article body structure** `[observed]`

1. Title, then `Updated <date> <time>` — **with a timestamp to the minute** (`Updated January 30, 2026 14:00`, `Updated September 10, 2026 21:43`)
2. Bolded question-headings as sub-sections (`**Why is my Stripe payout less than what my paid subscribers paid for?**`) — so an article about payouts contains three further questions as its own sections
3. Numbered steps with UI labels in bold
4. **Inline screenshots with filename-shaped alt text** (`Screenshot 2026-01-22 at 15.44.14.png`, `Screenshot_2023-01-27_at_2.53.22_PM.png`)
5. `**Tip:**` callouts
6. `Was this article helpful?` + the four-reason form (see T5)
7. `Articles in this section` (ten siblings) + `See more`
8. `Need more help? Submit a request to Support and we'll be glad to help!`
9. A **raw Google Forms URL rendered as visible link text** (see defects)
10. Two persistent footers (writer resources; status page)

**The minute-precision `Updated` timestamp is unusual and useful** — it signals active maintenance more credibly than a date alone.

**`**Tip:**` is the consistent callout label**, used for QA advice ("open your /subscribe link in a private or incognito browser window"), workflow shortcuts ("To extend all of your paying subscribers' benefits, first apply a filter where type is 'Paid'"), and Stripe navigation ("Click on the individual payout to view a detailed ledger"). One label, three functions, consistently applied.

**A leaked internal URL on every article** `[observed]`: each article foot renders a full `https://docs.google.com/forms/d/e/1FAIpQLS…/viewform?usp=pp_url&entry.422178912=<article-url>&embedded=true` string **as visible link text**. A pre-filled Google Form, with its entry-field ID and the encoded article URL, printed in the page body. It appears on all four articles harvested, so it is systemic. This is the clearest technical defect in the file and it exposes the feedback plumbing to every reader.

**Help home structure** `[observed]`: `How can we help?` → `Popular:` → `Frequently Asked Questions` (seven items, each with a **truncated answer preview ending mid-word** — "Do you have a custom domain you'd like to use f...", "At Substack, we're building a world-class suppo...") → `Getting Started on Substack` (four tiles, two mislinked).

**The truncated previews cut mid-word with an ellipsis** (`suppo...`, `f...`, `tha...`), which is a character-count truncation rather than a word-boundary one. Minor, and it makes the front page look unfinished.

## T12 FAQs

**Two FAQ constructs, one marketing and one support, with different jobs.**

### 1. `Substack basics` — the homepage FAQ

`[observed]` — five questions, and the ordering is a funnel:

| # | Question (verbatim) | Answer leads with |
|---|---|---|
| 1 | What is a Substack? | Category expansion — "much more than a newsletter platform" |
| 2 | Do I need to pay for Substack? | "It's free to get started" → then the 10% cut |
| 3 | Do I own what I publish on Substack? | "You will always own your work" |
| 4 | Will Substack help me grow my audience? | "Yes." then the 50%/25% figures |
| 5 | How do I move my past work to Substack? | Seven named competitors |

**Definition → price → ownership → growth → migration.** Every question is a prospective *writer's* objection, in order of likely appearance. **There is not one reader-facing question on the homepage FAQ.** For a two-sided marketplace, the public-facing FAQ addresses only the supply side.

**Q4 is the only one answered with a bare `Yes.`** — a one-word answer followed by the statistic. Confident, and it works.

**Q1's answer contains a visible defect** `[observed]`: "A Substack is an all-encompassing publication that accommodates text, video, audio, **and video.**" — **`video` listed twice** in a four-item list. And "Without ads or gatekeepers  in the way" carries a **double space**. Two errors in the answer to "what is a Substack", which is the first question on the homepage.

**Q1 also does the category-repositioning work**: "Substack is much more than a newsletter platform." The company's own FAQ opens by rejecting the label everyone uses for it.

### 2. `Frequently Asked Questions` — the help-centre front page

`[observed]` — seven items, and this one **is** two-sided:

| # | Question (verbatim) | Audience |
|---|---|---|
| 1 | How do I set up my custom domain on Substack? | writer |
| 2 | I subscribed to a Substack publication but am not receiving any emails. What can I do? | **reader** |
| 3 | How do I cancel my paid subscription on Substack? | **reader** |
| 4 | How to contact Substack Support | both |
| 5 | How can I publish on Substack? | writer |
| 6 | Getting started on the Substack app | both |
| 7 | Report content on Substack | both |

**Three of seven are reader-facing or reader-inclusive, and items 2 and 3 are the two things a paying reader most urgently needs** — my emails stopped, and how do I stop paying. Placing cancellation third on the support front page, above "How can I publish on Substack", is a genuine act of user-first prioritisation on a platform whose entire nav is writer-weighted.

**Item 4 breaks the title pattern**: `How to contact Substack Support` is the only non-question in a block headed `Frequently Asked Questions`. Items 6 and 7 do too (`Getting started on the Substack app`, `Report content on Substack`). **Four of seven items in the FAQ block are not questions.** The heading is wrong for its contents.

**The two FAQs together are the two-sided finding.** Marketing FAQ: five writer questions, zero reader questions. Support FAQ: three of seven reader-inclusive. Substack sells to writers and supports readers, and the FAQ placement reflects exactly that.

## T13 Terminology & glossary — PRIORITY

There is **no glossary page**. Terms are defined in situ, in help-article bodies and in the Content Guidelines.

### Writer-facing publishing vocabulary

| Term | Substack's usage | The alternative it rejected |
|---|---|---|
| `a Substack` | **The publication, as a countable noun** — "What is a Substack?", "Start your Substack", "Create your Substack", "your Substack channel" | "newsletter", "publication", "blog" |
| `Substacks` | Plural — "Substacks around the world", "paid subscriptions to Substacks" | — |
| `to Substack` | Implied by `Switch to Substack`, `move to Substack` | — |
| `publication` | The formal/legal term, used in Terms, the Publisher Agreement, and help ("your publication's Settings page") | — |
| `post` | The unit of published content. Never "story", never "article", never "issue" | **"story"** (Medium), "article", "newsletter issue" |
| `Notes` | **A public short-form feed** with its own section, leaderboards, and reply controls | "microblog", "shorts", "statuses" |
| `Chat` | A subscriber group-messaging surface, paywallable, threaded | "community", "forum", "Discord" |
| `thread` | Both a Chat thread and a "community thread" | — |
| `restack` | The sharing verb — "What happens when someone restacks my post?" | "reshare", "repost", "retweet" |
| `teaser post` | A partial-paywall post type | "excerpt", "preview" |
| `paywall` | Used as **both noun and verb** — "use a paywall for", "How do I paywall my archive" | "gate", "members-only" |
| `Founding Member` | The top paid tier / donation mechanism | "patron", "supporter", "VIP" |
| `Founding` | The truncated form, in `Set to Founding` | — |
| `founding member only posts` | The content class, **lowercase and unhyphenated** | — |
| `Comp` | The verb-button for granting free paid access | "Gift", "Grant", "Free access" |
| `complimentary subscription` | The formal form of the same thing | — |
| `Boost` | **Two meanings**: a discount-automation feature (`Enable Boost`, `Substack Boost upsell email`) **and** a growth/recommendation mechanic ("boosts" in the revenue-tools list) | — |
| `Substack Defender` | The legal-support programme | "legal fund", "insurance" |
| `Substack Recording Studio` | Native video/podcast recording | "studio", "recorder" |
| `Substack Reader` | The reading app/surface | — |
| `Creator Kit` | `How do I set up a Creator Kit on Substack?` | "media kit", "press kit" |
| `Subscriber Perks` | `What are Subscriber Perks on Substack?` | "benefits", "rewards" |
| `subscriber segments` / `subscriber tags` | Audience slicing | "lists", "groups" |
| `welcome sequences` / `win-back campaigns` | Named lifecycle messaging | "drip", "reactivation" |
| `leaderboards` | Ranked-publication charts, nine in the footer | "charts", "top lists" |
| `GARR` | **Gross Annualized Revenue**, Substack's own metric, with an acronym | — |
| `Creator` / `Reader` | **Capitalised as defined contractual roles** in Terms | "publisher/subscriber" |
| `publisher` | Used in Terms, the Publisher Agreement, and the fee justification ("growth tools to help publishers") | — |
| `Post` | Capitalised as a defined legal term in Terms — "referred to as a 'Post' in these Terms" | — |
| `Standards & Enforcement team` | The moderation function, named | "Trust & Safety" |
| `cashtag` | `Can I add a cashtag to a Substack post?` | — |
| `drop cap` / `callout block` / `kicker`-equivalent | Typographic features named in help titles | — |

### The three lexical findings

**1. `a Substack` — the brand name as a common countable noun, and the platform teaching it.**

The homepage FAQ's first question is literally `What is a Substack?`. Substack is running a campaign to establish its own trademark as the generic noun for the thing — "a Substack" the way one says "a blog". `Substacks around the world`, `paid subscriptions to Substacks`, `Start your Substack`, `your Substack channel`, `Switch to Substack`.

This is the same over-loading problem BeReal has with `a BeReal` (post / app / company), and Substack has it worse: **`Substack` is the company, the platform, the publication, and — via `Substack Reader`, `Substack Notes`, `Substack Chat`, `Substack Defender`, `Substack Boost`, `Substack Recording Studio` — a prefix on six sub-products.** Hence article titles like `How do I embed Substack posts or notes on a website?` where the brand appears once and has to serve two referents.

**2. `Comp` — trade jargon chosen over plain language, deliberately.**

The button is `Comp`. Not "Gift subscription", not "Grant free access". A comp is a complimentary ticket, and the word belongs to publishing, theatre and hospitality. Substack's audience is publishers, so the product speaks publisher. `Set to Founding` does the same thing — a truncated tier name in an imperative fragment, legible only to someone who already knows the tier.

The formal register exists alongside it (`complimentary subscription` in the article body, `complimentary paid subscriptions` in the intro), so Substack uses the plain form in prose and the jargon form on the control. **That is the right allocation** — the control is used by someone who has already read the article.

**3. `Notes` collides head-on with Medium.**

On Substack, `Notes` is a **public short-form feed** with leaderboards, a publication tab, reply-gating, and nineteen help articles. On Medium (154), `Note` is defined in the published glossary as a "**Private** way of commenting on someone's story. Notes are between you and the author of the post."

**Same coined word, opposite meanings, in two competing products in the same domain.** Anyone writing in this space needs to know which `Notes` they mean, and a writer moving between the two platforms will get it wrong.

### Other terminology defects

- **`Boost` has two unrelated meanings in live use** — a subscriber-discount automation (`Enable Boost`, `Substack Boost upsell email`, the 20% discount) and a growth/discovery mechanic (`boosts` in the revenue-tools list, `Boost` in Substack's growth vocabulary). One word, two features, both on the writer's settings surface.
- `Founding Member` / `Founding` / `founding member only posts` — three forms, one hyphenation decision unmade.
- `Going paid guide` vs `Guide to going paid` — same page, two word orders, nav vs footer.
- `Help` vs `Help center` — same destination, two labels, two footer groups.
- `Create your Substack` / `Start your Substack` / `Get started` / `Start publishing` — four signup labels.
- `earn` vs `make` in the calculator headings on two pages.
- `Subscriber help` means "help managing subscribers", not "help for subscribers".
- `Substack, Inc` is the help centre's breadcrumb root and `<title>` — a legal entity name as a site title.

### Register split by surface

- **Marketing**: moral and declarative. `You made it, you own it.` · `You deserve to make money doing the work you love.` · `Write and publish without fear.` · `Make money doing the work you believe in.` The dominant mode is *entitlement* — `deserve`, `own`, `believe in`, `without fear`.
- **Help**: procedural, second person, `**Tip:**`-punctuated, occasionally too informal (`may've`).
- **Content Guidelines**: balanced-sounding and deliberately unspecific at the top (`reasonable balance`), then precise and statute-cited in the appendices. **The document gets more concrete as it gets more legally compelled.**
- **Terms**: plain-language legal with worked examples ("we may need to modify your publication to make sure it is viewable on an iPhone"), opening with `Welcome to Substack!` and an exclamation mark, and using `you promise` as a contractual verb ("You promise to provide us with accurate, complete, and up-to-date registration information").

`You promise` in a contract is a notable register choice — it is the second-person-informal version of "you represent and warrant", and Substack uses **both**, sometimes in adjacent paragraphs.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company. Substack's "we" makes **commitments and alignment claims** rather than descriptions: "We handle the admin, billing, and tech", "we only make money when you do", "Our entire business model depends on your success", "We are vehemently anti-spam", "We host and celebrate a diverse range of thought".

**The dominant rhetorical mode is moral rather than functional.** `deserve`, `own`, `believe in`, `without fear`, `true independence`, `you made it`. Substack sells a position, not a feature set — and the Content Guidelines' `reasonable balance` language is the same register applied to a place where specificity was needed.

**Register.** Declarative, short-sentence, full-stop-heavy on marketing (`You made it, you own it.` / `True Independence.` / `A better model for creators.` — headers punctuated as sentences). Warm and slightly loose in help (`may've`, `we'll be glad to help!`). Exclamation marks are rationed: `Welcome to Substack!` in Terms, `we'll be glad to help!` in help furniture, `Thank you!` in the feedback confirmation. None on the homepage.

**Tone flattens correctly at the payout and hardens at the statute.** The fee caveat is one flat clause (`minus credit card fees`). The DSA/OSA contact blocks are pure compliance prose with postal addresses and phone numbers. The NCII clause is one unhedged sentence. But it does **not** flatten at the moderation position, which is where `reasonable balance` lives — the one place the marketing register leaks into a document that needed a test rather than a posture.

**Numbers as trust devices** `[observed]`: `90%` · `10%` · `50%` · `25%` · `30%+` · `5 million paid subscriptions` · `Tens of millions` · `1 million+ posts` · `20% discount` · `48 hours` · `40,000 page views` · `$1,000 a month` · `1,000 subscribers` · `$60,000 per year` · `$4,638per month` · `16 years old`. Mostly specific; `Tens of millions` and `dozens of creators` are the two deliberately vague ones, and both are in claims where precision would invite scrutiny.

**Accessibility content** `[observed]`

Present and correct:
- **A real accessibility statement in the global footer** (`substack.com/accessibility`) — one of only two in this cohort. WCAG 2.1 named as guidance, the user-generated-content boundary stated, and a `report barriers` form. See T10.
- **Alt text is a documented writer capability with its own help article**: `How do I add alt text to an image on a Substack post?` — in the `Publishing a post` section. The tool exists and is documented.
- `Skip to main content` on help-centre pages, first in DOM
- App-store badge alt text is descriptive: `Download the Substack app on the App Store`, `Get the Substack app on Google Play`
- Marketing illustration alt text is genuinely descriptive: `Illustration of creator earnings and Substack's revenue share model`, `Subscriber chat, threads, and community tools in the Substack app`, `Revenue and subscriber metrics, growth chart, and conversion tools on Substack`, `App discovery, publication recommendations, and growth tools on Substack`. These describe the **content and purpose** of each screenshot, not just its subject — the best alt text found in this cohort.
- Video/audio accessibility partly addressed by product: "produce voiceovers and narrations for your text posts"
- A no-JS notice exists (even if it is a dead end)

Absent or defective:
- **No `Skip to content` on `substack.com`** marketing pages.
- **Help-article screenshots carry filename alt text** — `Screenshot 2026-01-22 at 15.44.14.png`, `Screenshot_2023-01-27_at_2.53.22_PM.png`, `Screenshot 2026-01-29 at 15.18.12.png`. These are procedural screenshots inside numbered instructions, which is exactly where a non-sighted user needs a description, and they announce as timestamps. **Marketing alt text is excellent and help alt text is filenames** — the gradient is backwards.
- **The nine-item `For <audience>` dropdown and the nine-item `Top in <category>` footer list** are long, flat, near-identically-prefixed link sets — hard to skim by screen reader.
- **Raw Google Forms URL rendered as visible link text** on every help article — a ~200-character URL as an announced link name.
- **`$4,638per month`** — the calculator output has no space before "per month", so the most important number on the site announces as a run-together token.
- **Truncated FAQ previews cut mid-word** (`suppo...`, `f...`, `tha...`) on the help front page.
- **No conformance level is claimed** and no VPAT is linked in the accessibility statement.
- **`substack.com/pricing` and `/content-guidelines` return empty bodies** — blank responses where pages are expected.

**Negative findings, recorded honestly**

- **`25%` (homepage) vs `30%+` (About) for the same network-conversion statistic**, live simultaneously
- **`and video` listed twice** in the four-item media list answering "What is a Substack?"
- `There are no hidden fees` stated on the homepage FAQ **without** the `minus credit card fees` qualifier that appears on About
- `Keep 90% of the revenue` on `/going-paid` omits card fees on the earnings-estimate page
- The 20% Boost discount on the writer's own subscriptions is disclosed **only** in an article titled around the symptom
- `Annual` plan definition says both `one-time payment` and `automatically renew`
- `Founding Member` defined by content access in the primary article and by its donation purpose only in a different article
- **Double spaces** in `You deserve to make money  doing the work you love.` and `Without ads or gatekeepers  in the way`
- `How to do I hide my phone number or email on Stripe?` — typo in a canonical article title
- `How do I find the billing country of a paid subscriber?` exists **twice**, two IDs, two sections
- `Video` tile on the help home links to the **Stats and traffic** section
- `Subscriber help` sits inside `Creators` and means the opposite of what it says
- Four labels for signup; two for the going-paid guide; two for the help centre
- `Boost` names two unrelated features
- `Notes` means the opposite of Medium's `Notes`
- ~80% of help titles end in `on Substack`, destroying scannability
- `How do I` / `How can I` used interchangeably
- Four of seven items under `Frequently Asked Questions` are not questions
- Raw Google Forms URL with entry-field ID printed on every help article
- `may've` in a help article
- **The report taxonomy is broader than the Content Guidelines it enforces** — a user can report hate speech and terrorism content that the global rules do not prohibit
- **The Content Guidelines contain no appeal process, no statement of reasons, and no notification commitment** — compare BeReal's five-item DSA entitlement and Medium's named appeal grounds
- **The global hate rule is an incitement-to-violence rule only**; terrorism, suicide-instruction, trafficking and fraud prohibitions exist only in the UK and Australia appendices
- `at any time, for any reason … in our sole discretion, and without notice` (content removal) sits adjacent to `you own what you create`
- Content Guidelines are `evolving` and changeable `without notice`
- No reader-side refund article in the harvested set
- Zero reader-facing questions on the homepage FAQ

---

## Transferable patterns

1. **Put the deduction directly beneath the estimate.** The revenue calculator shows gross; the line below it reads "Writers keep 90% of their revenue minus credit card fees." Naming *both* deductions — yours and the processor's — under the persuasive number is the honest version of an earnings estimate. Transfers to any calculator, quote, or projection. (Condition: Substack then omits the card-fee clause on two of three surfaces, which is the cautionary half.)

2. **Compare business models in the same units.** "The ad model demands 40,000 page views every day to earn just $1,000 a month. With the Substack model, a steady base of 1,000 subscribers paying $5 each month earns you $60,000 per year." Inputs → output, twice, same axis. More persuasive than any adjective and it is falsifiable.

3. **State the exit as a feature.** `free to start and free to leave`, preceded by `No platform fees, no tiers, no contracts`. Lock-in anxiety answered before it is raised, in eight words.

4. **Define one account as two contractual capacities.** "As a Substack account holder, you are both a Creator and a Reader." One paragraph, two roles, two agreements named. The cleanest two-sided identity model in the corpus, and it makes every downstream clause easier to draft.

5. **Explain a content licence with a worked example.** "For example, we may need to modify your publication to make sure it is viewable on an iPhone as well as a computer." One concrete instance defuses the whole "you're taking my rights" objection that fifty words of hedging would not.

6. **Document the same failure twice, once per side.** `I subscribed to a Substack publication but am not receiving any emails. What can I do?` and `A subscriber told me they aren't getting my emails. What should I do?` — same deliverability bug, two vantage points, two articles, neither assuming the other's knowledge. Mandatory practice for two-sided products and almost nobody does it.

7. **Tell writers which system emails they cannot change.** "This email is not customizable." beside a three-step path to edit the one that is. Naming the boundary of a user's own voice pre-empts the ticket and respects the need to know.

8. **Build a four-option diagnostic into "was this helpful?".** `These steps didn't help` / `I couldn't find what I was looking for` / `The content is confusing or unclear` / `Something else` — three distinct content-ops remedies, not a satisfaction scale. Plus the conditional apology (fires only on `No`) and the expectation-setter (`Submitting feedback will not open a ticket with our Support team`).

9. **Teach users to QA their own funnel, with the mechanism.** "To see exactly what a brand-new reader sees, open your /subscribe link in a private or incognito browser window. A private window isn't signed in and doesn't carry a recent visit, so it always shows the first-time view." The instruction and the reason, so the user can generalise it.

10. **Route reports by the standard applied, not by the harm.** `Violation Categories` / `Regulatory Safety Reports` / `Content Potentially Violating the Law`, each with a scope line, plus a law-enforcement channel. Different evidentiary burdens deserve different forms, and telling the reporter which is which reduces misrouting.

11. **Publish your abuse-of-reporting rules.** "We reserve the right to close reports that are frivolous, vexatious, or manifestly unfounded without taking action. Repeated misuse… may result in restrictions on your ability to submit further reports." Three named bad-faith categories, two-stage consequence. Any reporting system large enough to be weaponised needs this and almost none publish it.

12. **Geo-scope content rules explicitly, and cite the statute.** "These restrictions reflect our obligations under the UK Online Safety Act 2023 (OSA) in respect of priority illegal content (Schedule 7…)" plus "These rules apply to content accessible to people in the UK." Legally precise and legible to a user. The pattern is good; the **anti**-pattern is what it reveals — see caveat 3 below.

13. **Ship an accessibility statement that states its boundary.** "While user-generated content is created and managed by individual publishers, we strive to provide tools that enable accessible publishing." Three sentences, WCAG named as guidance not conformance, a `report barriers` channel, and an honest division of responsibility for a platform whose product is other people's HTML.

14. **Write help-article alt text the way you write marketing alt text.** `Illustration of creator earnings and Substack's revenue share model` is excellent; `Screenshot 2026-01-22 at 15.44.14.png` is on the same site, inside numbered instructions. The gradient should run the other way.

## Caveats & gaps

- **`substack.com/pricing` and `substack.com/content-guidelines` return empty response bodies.** Neither is a 404 or a redirect. `/content-guidelines` in particular is the natural guess for the page that lives at `/content`. Recorded as blocked; the pricing surface (if it exists) is unharvested, and all pricing vocabulary in this file comes from `/about`, `/going-paid`, the homepage FAQ, and help articles.
- **Reader-side subscription microcopy is `[documented]`, not observed.** The `/subscribe` page, the plan-selection screen, the paywall interstitial, the cancellation flow, and the reader's account settings were not seen. The four plan types and the `read it first` decline option are described in a writer-facing help article, not observed in the reader's UI.
- **No individual publication, post, note, comment or newsletter content was read or quoted**, per brief. The publisher names and one-line descriptions on `/about` and `/going-paid` are **Substack's own marketing copy about its publishers** and are treated as such; no writer's published work was opened. The three testimonial quotations are Substack-published marketing attributions, quoted as marketing copy.
- **`Publisher Agreement` (`substack.com/pa`) was not harvested.** It is the writer-side contract and the document the Terms defer to on every creator-economics question. Its absence is the largest single gap in T10.
- **`Privacy Policy`, `CCPA Policy`, `Copyright Dispute Policy`, `Copyright Repeat Infringer Policy`, `Support Chatbot Terms`, and `Vulnerability Policy` not harvested.**
- **The moderation analysis rests on `substack.com/content` plus the reporting article.** `Standards & Enforcement` section articles beyond `Report content on Substack` were not opened — including `Substack 18+ Content policy`, `Nonconsensual Intimate Image Removal Policy`, `Substack and the Australian Online Safety Act`, and the DM/chat reporting articles. Any appeal mechanism that exists outside the Content Guidelines would be found there, and its absence from the Guidelines is recorded as a documentation gap rather than a confirmed absence of process.
- **The `Notes`, `Chat`, `Video`, `Podcasts`, and `Stats and traffic` sections were seen only as article-title listings.** ~19 Notes articles, ~11 Chat, ~15 Video, ~15 Podcast, ~9 Stats — none opened. Notes and Chat in particular would carry the community-moderation microcopy that the Content Guidelines devolves to writers.
- **`Publications 101` (68 articles) and `Publishing a post` (66 articles, 3 pages) were sampled, not read.** Page 1 of 3 of `Publishing a post` was captured; pages 2 and 3 were not. `What is a teaser post on Substack?`, `How do I add audience-specific content to a post on Substack?`, `How do I paywall my archive of free posts on Substack?` and `How can I detect AI on Substack?` are all named and unopened — the first two are the two-sided sync points identified in T6.
- **`Can I set up another subscription plan for readers who want to pay more?`** (the article that actually explains the Founding Member donation mechanic) was identified via search but not fetched; its content here is reported at one remove and is flagged accordingly in T6.
- **`substack.com/resources` and the `Going paid guide` were not harvested** — a whole parallel content estate, linked from every help page.
- **The `25%` / `30%+` discrepancy** could not be resolved; both figures were live at harvest and both are reported.
- **All in-product states are `[documented]`.** Empty states, toasts, validation messages, the editor, the paywall interstitial, and the Notes/Chat surfaces require an authenticated pass.
- **Percentages, subscriber counts, and calculator defaults are a snapshot** at harvest.

## Sources

1. https://substack.com/
2. https://substack.com/about
3. https://substack.com/going-paid
4. https://substack.com/accessibility
5. https://substack.com/tos
6. https://substack.com/content
7. https://support.substack.com/hc/en-us
8. https://support.substack.com/hc/en-us/categories/360002403472-Creators
9. https://support.substack.com/hc/en-us/sections/4413195985684-Payments-help
10. https://support.substack.com/hc/en-us/sections/360007361292-Publishing-a-post
11. https://support.substack.com/hc/en-us/articles/360037833691-How-do-payouts-work-on-Substack
12. https://support.substack.com/hc/en-us/articles/360037830631-How-do-readers-subscribe-to-my-Substack-publication
13. https://support.substack.com/hc/en-us/articles/360037465612-How-do-I-offer-a-complimentary-subscription-to-a-reader-on-Substack
14. https://support.substack.com/hc/en-us/articles/50310628916500-Report-content-on-Substack

**Blocked / empty:** https://substack.com/pricing · https://substack.com/content-guidelines · https://substack.com/content-guidelines-and-moderation · https://support.substack.com/hc/en-us/articles/360037461672-What-is-a-founding-member-subscription
