# 019. Canva

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Consumer design / template graphics (prosumer visual suite) |
| Primary URL | https://www.canva.com/ |
| Corpus rank | 019 |
| Benchmark strength (source list) | Novice-friendly creation guidance |
| Locale / market observed | en-US (site offers ~110 locales; accessibility page cross-links into `/en_au/`) |
| Platform observed | Web (desktop marketing), in-house help centre, Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | WCAG 2.1 AA with published VPAT/ACR, ISO 27001, SOC 2 Type II, MFA on all plans, data residency and SSO/SCIM on Enterprise, US/Canada sales-tax handling disclosed, AI output indemnity (`Canva Shield`) as a paid tier |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Partial — help-centre article *bodies* are client-rendered and `/help/get-in-touch/` returns an empty document; category and article titles fully reachable |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / product | https://www.canva.com/ | Hero, two tab-carousels, feature cards, ecosystem block, ~110-locale switcher |
| Pricing | https://www.canva.com/pricing/ | Four plans, audience toggle, ~80-row matrix, six footnote classes, 20-question FAQ with full answers |
| Help centre home | https://www.canva.com/help/ | `Try asking` pill row, four routing cards — **richest onboarding artefact** |
| Help: All topics | https://www.canva.com/help/topics/ | Ten top-level topics with scope lines |
| Help: Sharing, presenting, managing designs | https://www.canva.com/help/share-present-manage-designs/ | Four sub-topics |
| Help: Sharing | https://www.canva.com/help/sharing/ | Five sub-topics |
| Help: Sharing permissions | https://www.canva.com/help/sharing-permissions/ | Five article titles — see T7/T10 |
| Help: Get in touch | https://www.canva.com/help/get-in-touch/ | **Renders as an empty document** — see T8 |
| Accessibility | https://www.canva.com/accessibility/ | WCAG target, VPAT, tool inventory, four-question FAQ |
| Status | https://status.canva.com/ → https://www.canvastatus.com | ~40 components in seven groups |

---

## T1 Navigation & IA labels

**Global nav — six items, each a mega-menu** `[observed]`

`Design` · `Product` · `Plans` · `Business` · `Education` · `Help`, with
`Sign up` and `Log in`.

`Design` is the entry point and it is **cut by output artefact, not by tool** —
four sub-groups:

| Group | Sample members |
|---|---|
| `Digital design` | `Sheets` `Docs` `Whiteboards` `Presentations` `Social` `Photo Editor` `Videos` `Print` `Websites` `PDF Editor` |
| `Print design` | `Business cards` `Invitations` `Flyers` `Brochures` `T-shirts` `Mugs` `Stickers` `Hoodies` `Labels` `Posters` |
| `Images and photos` | `Background remover` `Photo collages` `Mockups` `Image enhancer` `AI image generator` `Logos` |
| `Videos and audio` | `Video trimmer` `Convert videos to MP4` `Text to speech voiceover` `AI music generator` `AI voice generator` |

**`Mugs`, `Hoodies`, `T-shirts`, and `Stickers` are top-level navigation items.**
That is the whole Canva positioning in one observation: the nav is organised
around *the thing the user wants to end up holding*, not around the capability
required to make it. A novice arrives knowing "I need a flyer" and finds
`Flyers`; they do not have to know that a flyer is a print artboard with bleed.
Compare Figma, whose nav lists ten *tools*, and Miro, whose nav lists *formats*.

**`Education` is a full sixth of the nav**, sub-grouped by institution tier and
role: `K-12 education` / `K-12 teachers` / `Higher education`, with
`Eligibility guidelines`, `Teaching resources`, `Teacher communities`,
`Contact Campus Sales`. A nav that reserves a top-level slot for teachers is a
statement about who the product is for.

**`Help` nav contains two things, and the second is not help** `[observed]`:
`Help Center` and `Design School`, plus a `Create guides` group
(`Logos` · `Flyers` · `Banners` · `Posters` · `Resumes` · `Photo collages` ·
`YouTube thumbnails`, then `All create guides`).

So Canva splits assistance three ways: **fix a problem** (Help Center),
**learn design** (Design School), **make this specific thing** (Create guides).
The third is the novice-specific one and it is keyed to the artefact again —
`/create/resumes/` exists because someone searched "how to make a resume", not
"how to use Canva".

**Help centre top level — ten topics, each with a scope line** `[observed]`

| Topic | Scope line (verbatim) |
|---|---|
| `Account settings` | "Change your email or password, delete your account, and set up SSO" |
| `Editing and designing` | "Design with templates, photos, text, videos, and more" |
| `Billing, payments, and plans` | "Manage plans or payments, and fix card errors" |
| `Teams, groups, and orgs` | "Create, manage, and delete teams, groups, and orgs" |
| `Brand` | "Create Brand Kits and Brand Templates, and set up Brand Controls" |
| `Downloading, previewing, and uploading` | "Download to your device, create mockups, and upload files" |
| `Sharing, presenting, and managing designs` | "Share or present designs, and manage your designs and folders" |
| `Websites` | "Create and publish websites" |
| `Print and delivery` | "Order prints, track order status and delivery times" |
| `Commercial use, copyright, and legal` | "Learn about selling designs made on Canva and using paid elements" |

Every scope line is a **comma-run of concrete verbs**, and — the Wise pattern —
several end on the unhappy path: `delete your account`, `fix card errors`,
`delete teams, groups, and orgs`, `track order status`. The user can self-route
on the scope line alone without opening the topic.

Two are notable. `Commercial use, copyright, and legal` is a top-level *support*
category, which tells you Canva's users routinely need to know whether they may
sell what they made — a question a professional tool would push into terms of
service. And `Print and delivery` puts a **physical logistics** category beside
software categories, because Canva ships objects.

**The tree is three levels deep and every level carries a scope line**
`[observed]`:
`Sharing, presenting, and managing designs` → `Sharing`
("Share designs to other people or social media, manage design access
permissions") → `Sharing permissions`
("Give, request, or remove design access permissions") → articles.

Sibling sub-topics at level two: `Sharing` · `Presenting`
("Present your designs in different modes") · `Commenting`
("Comment on designs to leave feedback for collaboration") · `File management`
("Manage designs and files using folders and starring"). At level three under
`Sharing`: `Sharing designs` · `Sharing permissions` ·
`Share instantly to social media` · `Schedule in advance to social media` ·
`Share and send emails`.

**A description at every node, all the way down**, is a real content-ops
commitment and it is the single most consistent thing in this harvest.

**URL slug defect** `[observed]`: the `Billing, payments, and plans` topic lives
at `/help/biling-payment-plans/` — **`biling`**, one `l`. A typo baked into a
canonical, linked, top-level help URL.

**Footer — seven groupings** `[observed]`: `Product` · `Plans` · `About` ·
`Community` · `Inspiration` · `Help` · `Tools`.

`Inspiration` is the unusual one, and it is aimed squarely at the novice:
`Design Trends` · `Learn blog` · `Font pairing` · `Color wheel` · `Colors` ·
`Color palette generator`. **Colour theory and font pairing as footer
navigation.** `Tools` is an eight-link SEO shelf
(`QR code generator`, `Signature generator`, `Business name generator`,
`Graph maker`…). `Accessibility`, `Trust Center`, `Canva Safe AI`, `Security`,
and `Sitemap` all sit under `Help`.

## T2 Value proposition & headline patterns

**Hero — a question addressed to the user** `[observed]`

> `What will you design today?`
> "Make AI-powered social posts, videos, presentations, and more with Canva."
> CTA: `Start designing`

This is the flagged strength in one line. The headline is **second person,
future tense, interrogative** — it does not describe the product, claim a
category, or name a benefit. It asks the visitor what they are going to make,
which presupposes that they *can*. Compare Figma's
`The intelligent canvas for infinite creativity` (a claim about the tool) and
Miro's `Human collaboration at the speed of AI` (a claim about the market).
Canva's headline has no subject but *you*.

The question construction recurs as a section header — `What will you create?` —
so the interrogative-to-the-user is a deliberate pattern, not one line.

**Section headers are short, concrete, and mostly non-aspirational** `[observed]`
- `Tools to power your best work`
- `What will you create?`
- `All the tools. All in one place.`
- `Templates for absolutely anything`
- `Unlock Canva's creative ecosystem`
- `Start designing with Canva`

`All the tools. All in one place.` is a two-sentence parallel with full stops —
the same construction Figma uses (`Powerfully expressive. Incredibly precise.`)
but with concrete nouns instead of adjectives. `Templates for absolutely
anything` uses `absolutely` as the only intensifier on the page, and it is
carrying a scale claim (1.6M+ / 3.6M+ templates) rather than a quality claim.

**Feature cards — imperative verb + outcome + named feature, in that order**
`[observed]`

| Headline (verbatim) | CTA |
|---|---|
| `Turn your image into an editable layout with Magic Layers` | `Explore Magic Layers` |
| `Clean up photos with Magic Eraser` | `Explore Magic Eraser` |
| `Remove image and video backgrounds in one click` | `Explore Background Remover` |
| `Elevate your writing with Magic Write` | `Explore Magic Write` |

Three of four follow **`<verb> <object> with <FeatureName>`** — the benefit
leads, the brand name trails, so a reader who does not know what "Magic Layers"
is still understands the sentence. The fourth drops the feature name from the
headline entirely and replaces it with the **effort promise**: `in one click`.
That is the novice-facing variant of the same construction — for a
background remover, the differentiator is not what it is called but how little
work it is.

`Elevate your writing` is the weakest of the four (abstract verb, no mechanism),
and notably it is the one for the text feature rather than an image feature.

**Effort language is the consistent register** `[observed]`:
`in one click` · `Easy drag-and-drop editor` · `to start fast` ·
`No cost, just creativity` · `Get started fast`. Canva's benefit vocabulary is
about *reduced effort*, where Figma's is about *increased precision* and Miro's
about *increased alignment*. Three products, three axes, each legible from the
adjectives alone.

**Plan descriptors are one sentence each, and the verb escalates** `[observed]`

| Plan | Descriptor (verbatim) | List-header verb |
|---|---|---|
| `Free` | "Design anything and bring your ideas to life. No cost, just creativity." | `With Free, get:` |
| `Pro` | "Unlock premium content, more powerful design tools, and AI features." | `With Pro, unlock:` |
| `Business` | "Create content faster, market smarter, and grow your business with advanced tools." | `With Business, power growth with:` |
| `Enterprise` | "Empower your organization with end-to-end visual communication." | `With Enterprise, scale with:` |

The **list-header verb changes per tier** — `get` → `unlock` → `power growth
with` → `scale with`. A four-step verb ladder from passive receipt to active
scaling, tracking the buyer's sophistication. Most pricing pages use one header
("What's included") for all four columns. This is a small, cheap, genuinely good
piece of differentiation.

Audience labels above each card do the same job in nouns: `Individuals` ·
`Individuals` · `Individuals and teams` · `Organizations`. And the pricing hero
toggle splits `Individuals and business` from `Education` before any plan is
shown.

**`Recommended`** is the only badge on the pricing page — one word, on Business.
No "Most popular", no "Best value", no urgency.

**Social proof is minimal** `[observed]`: `6+ million TEAMS USE Canva` on
pricing, above five logos. No stat wall, no testimonial carousel on the home
page. Notably the *home* page carries **no user-count claim at all** — unusual
for a product this large, and it avoids the Loom problem of four conflicting
figures.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start designing` | Home hero, mid-page | The verb is the product's core action |
| `Start designing for free` | Templates section | |
| `Get started for free` | Home page foot | **Third label for the same signup link** |
| `Get started` | Pricing, Free plan; comparison matrix | Fourth label |
| `Sign up` / `Log in` | Nav | |
| `Explore Magic Layers` · `Explore Magic Eraser` · `Explore Background Remover` · `Explore Magic Write` | Home feature cards | Each names its feature |
| `Explore Social` · `Explore Video` · `Explore Photo Editor` · `Explore Docs` · `Explore Presentations` · `Explore Print Shop` · `Explore Email` · `Explore Sheets` · `Explore Whiteboards` · `Explore Websites` | Home tool carousel | Ten object-specific CTAs — **but nine of ten link to `/signup/`**, not to the tool page |
| `Explore Canva World Tour` · `Explore the collection` · `Explore Canva Enterprise` · `Explore Canva Business` | Ecosystem block | |
| `Browse all templates` | Templates section | |
| `Start a free trial` | Pricing, Pro and Business | |
| `Try for free` | Comparison matrix, Pro column | **Different label for the same trial** |
| `Contact Sales` | Pricing Business and Enterprise, nav | |
| `Book a demo` | Pricing Enterprise | |
| `Let's talk` | Pricing Enterprise, in the price slot | A CTA occupying the price field |
| `Get in touch to learn more` | Pricing Enterprise, under `Let's talk` | |
| `Choose a plan` / `No options selected` | Comparison matrix third column | **A prompt rendering as a CTA**, repeated ~80 times down the matrix |
| `Differences only` | Comparison matrix filter | |
| `Compare plans` | Pricing | |
| `Learn more` | Pricing ×3 (AI Pass banner, Canva Business card, AI Pass card) | Bare `Learn more`, three times |
| `Learn more about Design Accessibility` · `Learn more about alt-text` · `Learn more about captions` · `Learn more about shortcuts` · `Learn more about improving PDF accessibility` | Accessibility page | **Correctly specific — five object-named variants** |
| `Explore accessibility tools` | Accessibility page | |
| `Try it out` | Accessibility page | No object |
| `Ask a question` | Help centre, all levels | The search affordance, phrased as an instruction |
| `View all topics` | Help centre home | |
| `Find solutions to common issues here` | Help centre, `Solve your issue` card | Full-phrase link |
| `Tell us` | Help centre, `Submit a wish` card | Two-word link inside a sentence |
| `submit a request to get help` | Help centre, account recovery | Sentence-cased link |
| `Subscribe to Updates` | Status page | |
| `Skip to main content` | All pages | |

**Observation: Canva's CTA discipline is split cleanly by surface.** The
accessibility page ships five correctly-specific `Learn more about X` links; the
pricing page ships three bare `Learn more`. The home page ships fourteen
`Explore <Name>` labels, which read as excellent — until you notice that the
ten tool-carousel `Explore` links all point at `/signup/` rather than at the
tool they name. **The label names a destination the link does not go to.** For
the flagged novice audience this is the most consequential defect in the file: a
user who clicks `Explore Whiteboards` expecting to read about whiteboards hits a
signup wall.

**Four labels for signup** (`Start designing`, `Start designing for free`,
`Get started for free`, `Get started`) and two for the trial
(`Start a free trial`, `Try for free`).

**`Choose a plan` / `No options selected`** in the comparison matrix is a
labelling failure: an empty third plan-selector column renders a placeholder
prompt in every one of ~80 rows, so the matrix reads as if `Choose a plan` were a
feature value.

## T4 Onboarding & getting-started

*The flagged benchmark strength, and the help centre is where it actually lives.*

**`Try asking` — seven pre-written user questions as clickable pills**
`[observed]`, directly under the help-centre hero:

> `Get help with anything Canva`
> "Ask questions. Find answers. Get back to designing."
> `Try asking`

| Pill (verbatim) |
|---|
| `How do I upload photos?` |
| `How do I print my design?` |
| `How do I resize my design?` |
| `How do I remove a background on a photo?` |
| `How do I manage my subscription?` |
| `Why was I charged?` |
| `How do I recover my account?` |

This is the best single artefact in the Canva harvest. Five decisions in it are
worth stealing:

1. **The questions are pre-written in the user's grammar** — `How do I …?` five times, then `Why …?`, then `How do I …?`. A novice who does not know the product's vocabulary does not have to invent a search term; they recognise their own question.
2. **They teach the search interface by example.** The label is `Try asking`, not "Popular searches" — it models the *mode* of interaction (ask a question) rather than listing results.
3. **The order is task → task → task → task → money → money → access.** Four creation questions first, so the default framing is "you are here to make something", then the two commercial anxieties, then the catastrophic one.
4. **`Why was I charged?`** is on the front door of the help centre, in the user's voice, four words, no hedging. A company willing to put its own most resented event on the help home in the customer's own phrasing.
5. **`How do I recover my account?`** links not to a search result but **directly to the recovery flow** (`/help/report-login-issues/?source=hc-home-pill`), with the entry point tracked. The one question where search is the wrong answer is short-circuited.

And the hero subhead — "Ask questions. Find answers. Get back to designing." —
is a three-beat sentence whose third beat names the *exit*. Help is framed as an
interruption to be ended, not a destination. Three sentences, nine words,
and the user's actual goal is the last one.

**Four routing cards, each with its own register** `[observed]`

| Card | Copy (verbatim) |
|---|---|
| `Solve your issue` | "Need help fast? [Find solutions to common issues here](…)." |
| `Submit a wish` | "[Tell us](…) what you'd love to see in Canva next!" |
| `Design School` | "The [Design School](…) has design tips and inspiration for everyone." |
| `Recover your account` | "If you can't access your account, [submit a request to get help.](…)" |

`Submit a wish` is a coined label for the feature-request channel — not
"Feedback", not "Feature requests", not "Product suggestions". It reframes an
unmet need as a wish, which lowers the emotional cost of admitting the product
cannot do what you want, and it is the only exclamation mark in Canva's help
copy. `Design School … for everyone` explicitly disclaims expertise as a
prerequisite.

`Recover your account` is conditional-first — "If you can't access your
account" — so a reader who *can* access their account skips it in three words.

**No numbered how-it-works sequence on the home page** `[absent]`. Canva's
onboarding is not a sequence; it is a **choice of artefact**. The home page
offers two tabbed carousels — `AI` / `Presentations` / `Social` / `Video` /
`Print Shop`, then a ten-way `What will you create?` selector — and the whole
proposition is "pick the thing you want and we will start you inside it."
For a novice, choosing an output is a lower-anxiety first step than following a
tutorial.

**`Create guides` as a third assistance genre** `[observed]`, nav-level:
`/create/logos/`, `/create/flyers/`, `/create/banners/`, `/create/posters/`,
`/create/resumes/`, `/create/photo-collages/`,
`/create/youtube-thumbnails/`. Keyed to the artefact a search-engine visitor
named. Not opened in this harvest. `[absent]` for their internal copy.

**`Design School`** `[observed]` — named as a destination in nav, footer, and a
help-home card, positioned as tips and inspiration "for everyone". Not fetched.
`[absent]` for its curriculum labels.

## T5 Form & field labels

**Pricing controls** `[observed]`
- Audience toggle: `Individuals and business` / `Education`, each with an icon whose alt text is the icon's own name (`Headphone`, `Grad Cap`) — see T14
- Billing toggle: `Monthly` / `Yearly`, with `Save from 16%` beside it

**`Save from 16%`** is the notable string. Not "Save 16%" but **`from`** — the
saving varies by plan and the preposition says so in one word, without a
footnote. Compare Loom's `SAVE UP TO 17%` (ceiling framing) and Miro's
`Yearly (save 20%)` (flat claim). `from` is the honest one: it promises a floor,
so no user can be disappointed.

**Help centre search** `[observed]`: the affordance is labelled
`Ask a question` and it appears identically at every level of the topic tree.
Instruction-as-label, and it primes natural-language input rather than keywords —
consistent with the `Try asking` pills.

**Price display** `[observed]`: `US$0`, `US$144`, `US$250`, with units
`/year for one person` (Free and Pro) and `/year per person` (Business).
Currency prefixed with country code (`US$`) rather than a bare `$` — useful on a
site serving 110 locales. And the unit spells out **`for one person`** rather
than "per seat" or "per user" on the individual plans, then switches to
`per person` at the team tier. The plain-English unit is doing eligibility work:
`for one person` pre-empts the "can I share my Pro account?" question that the
FAQ then answers explicitly (see T12).

**Share-dialog and permission labels** `[absent]` — Canva's help article bodies
are client-rendered and returned no body text in this harvest. Permission
*concepts* are attested from article titles only (T10).

## T6 Status & state language

**Status page: ~40 components in seven named groups** `[observed]`, and the
grouping is the artefact:

| Group | Components |
|---|---|
| *(ungrouped top level)* | `Administration and settings` · `Billing and subscriptions` · `Help and support` · `Home page` · `Login and signup` · `Media uploads` · `Print and delivery` · `Search` |
| `Apps and Integrations` | `Admin API` · `Apps` · `Apps SDK` · `Blackboard` · `Canvas` · `Connect API` · `D2L` · `Google Classroom` · `Moodle` · `MS Teams` · `Remind` · `Schoology` |
| `Canva AI Platform` | `Canva AI Connector` |
| `Designs` | `Downloading designs` · `Editing designs` · `Importing designs` · `Offline designs` · `Saving designs` · `Sharing designs` · `Viewing designs` |
| `Mobile and Desktop Applications` | `Android app` · `iOS app` · `iPad app` · `macOS app` · `Windows app` |
| `Publish and Scheduling` | `Publishing websites` · `Scheduling posts` |

The `Designs` group is the best status naming in the corpus so far. Seven
components, each a **gerund + the object**: `Editing designs`,
`Saving designs`, `Viewing designs`, `Sharing designs`, `Downloading designs`,
`Importing designs`, `Offline designs`. A user whose export is failing finds
`Downloading designs`; a user whose work is not persisting finds
`Saving designs`. No service names, no architecture leaking. Compare Miro's
`Application` (one component for the whole product) and Figma's product-name
components.

The LMS block (`Blackboard`, `Canvas`, `D2L`, `Moodle`, `Google Classroom`,
`Schoology`, `Remind`) is a second observation about audience: seven of Canva's
~40 status components are education integrations.

**Severity scale**, five values, Statuspage default: `Operational` ·
`Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`.
Roll-up `All Systems Operational`.

**`About This Site` pre-empts the green-but-broken case** `[observed]`:

> "If you are seeing an error on Canva but there are no current issues shown here, please visit our Help Center"

And the link is **pre-filtered** —
`/help/get-in-touch/contact-support/?issue_category=editing-and-design`. The
status page not only anticipates the false-green case but routes the user into
support with a category already selected. Miro pre-empts the same case with a
plain contact form; Canva pre-fills the triage.

**Content lifecycle states** `[documented]`, from help titles only:
`starring` (`Manage designs and files using folders and starring`),
`Revoke all access`, `Restrict design sharing`, `Request design access`,
`Offline designs`, `track order status` (print). Specific state *values* —
what a design's sharing state is called in the UI, what a print order's statuses
are — are behind client rendering. `[absent]`

**Plan-state vocabulary** `[observed]`: `Unavailable` is Canva's word for
"not in this plan" throughout the matrix, against `Included`. And there are two
further values doing finer work:
- `No allowance used³` — the feature is present *and* metered at zero
- `Select issues` — support access exists but only for some issue types
- `Excludes mock up templates` — present with a named carve-out
- `Up to 5` — present with a cap

Six distinct matrix values, where most products manage two. `No allowance used`
is the interesting one: it distinguishes *included* from *included and free to
use heavily*, which for a metered-AI product is the distinction that matters.

**Sunset state, named and dated** `[observed]`, pricing FAQ
`What happened to Canva Teams?`: Canva Teams is closed to new sign-ups and
upgrades, existing users stay unless they switch or cancel, and — the honest
clause — **new paid features exclusive to Canva Business will not be added to
Teams**. A grandfathered plan with an explicit statement that it will not receive
future value. Compare Loom's `Creator Lite` deprecation notice, which is dated
but does not say what the holder stops receiving.

## T7 Error, failure & recovery

`[observed]` as titles; bodies client-rendered and unread.

**The five `Sharing permissions` article titles are the sharpest set captured**

- `Update folder permissions in Canva`
- `Request design access`
- `Revoke all access to your design even from shared folders`
- `Restrict design sharing`
- `Can't edit shared design`

Two are exceptional. **`Revoke all access to your design even from shared
folders`** is fourteen words and every one is load-bearing: it names the action
(`Revoke all access`), the object (`your design`), and — critically — the
**exception the user is worried about** (`even from shared folders`). The title
answers the anxiety that motivated the search. A user who has realised a design
is exposed through a folder they forgot about finds this title and knows before
clicking that it covers their case. Compare Miro, which handles the same
composed-permission problem with a warning repeated four times inside one
article, and Figma, which states an inheritance rule. **Canva puts the exception
in the title.**

**`Can't edit shared design`** is the first-person-ish failure title (subjectless
`Can't`, as in Loom), and it is the most common collaboration failure in any
shared-document product.

**`Why was I charged?`** `[observed]` — on the help-centre home page as a
`Try asking` pill. Four words, first person, past tense, no softening, no
"understanding your invoice". This is the Wise confession-title pattern applied
to a *company-caused* event rather than a user error, and it works because the
user genuinely does not know why. Recorded as the strongest single error string
in this file.

**Failure and recovery signalled in the IA rather than in article titles**
`[observed]`:
- `Billing, payments, and plans` — scope line ends "and fix card errors"
- `Recover your account` — a named routing card with a conditional opener
- `Solve your issue` — "Need help fast?"
- `Account settings` scope line includes `delete your account`
- `Teams, groups, and orgs` scope line includes `delete teams, groups, and orgs`

**Support tiering is disclosed as a plan feature, including its floor**
`[observed]`, pricing matrix: `Access to support tickets` and
`Access to live chat support` are both `Select issues` on Free and `Included`
from Pro. Then `Access to faster priority support`,
`Access to dedicated Enterprise Support experts`,
`Access to tailored design support`, `Access to customer success manager` as
higher tiers. **Telling free users, on the pricing page, that they can only
raise tickets for *some* issues** is an unflattering but honest disclosure —
`Select issues` rather than a blank cell or an unqualified `Included`.

**No dedicated troubleshooting category** `[absent]`. Unlike Loom
(`Knowledge Base` = troubleshooting) and Figma (`Troubleshoot` section), Canva
distributes failure articles inside the ten task topics. The `Solve your issue`
card on the help home is the compensating device.

## T8 Empty states

**`/help/get-in-touch/` returns a document with no body content at all**
`[observed]` — recorded as a defect. The page serves a full `<head>` with title
`Get In Touch - Canva Help Center` and a meta description
("Need help? Explore from here for what you can do to fix a problem with your
Canva design, account, subscription plan, print order, and more.") and then
**nothing**. No nav, no footer, no skip link, no loading message, no error.

This is the page the help-home `Solve your issue` card points at
("Find solutions to common issues here"), the page the `Submit a wish` card
points into (`/get-in-touch/general-feedback/`), and the page the **status
page's false-green pointer** routes to
(`/get-in-touch/contact-support/?issue_category=editing-and-design`). Three
separate surfaces send a user who has already failed to a URL that, in this
harvest, rendered empty. Whether it is client-rendered and merely invisible to a
server fetch cannot be determined here — but every other Canva help page in this
harvest server-rendered its content fine, which makes this one anomalous.

**`Loading`** `[observed]` — the bare word appears near the top of the DOM on
every single Canva page fetched (home, pricing, help home, all topic pages,
accessibility). One word, no ellipsis, no context. It is presumably replaced on
hydration, but it is what sits in the server HTML of every page.

**Status page clear states** `[observed]`: `All Systems Operational`, then
`No incidents reported today.` / `No incidents reported.` — the same two-string
Statuspage pattern as Loom and Figma.

**Browser-support notice** `[observed]`, accessibility page only:
`Your browser is not supported and may not give the best experience.` A
degradation warning with a hedge (`may not`) and no action offered. It appeared
on the accessibility page and no other page in this harvest, which is either a
per-page script difference or a false positive.

In-product empty states (empty projects list, no search results, empty folder)
are behind auth. `[absent]`

## T9 Notifications & system messages

**A promotional banner above the pricing hero** `[observed]`:

> "Fast-track your creative vision with AI Pass, available as an add-on to any Canva Pro or Business plan." → `Learn more`

Placed above `Plans and pricing`, so the first thing a price-comparing visitor
reads is an upsell for an add-on to plans they have not yet chosen. The same
copy then reappears as a card lower on the page. Recorded as a negative finding —
same category as Loom's status-page banner and Miro's Miroverse promo in a
permissions article, though less egregious because a pricing page is a
commercial surface.

**Billing notification promises, stated as commitments** `[observed]`, pricing
FAQ `How does the billing work when I add new members to my team?`:
- monthly billing: adjust team size any time, charged for members held at next renewal
- annual billing: **"we'll email the team admin to let them know about any upcoming charges and give them a notice period to update their team size"**

A named pre-billing notification with a stated notice period, disclosed on the
pricing page. Structurally the same safeguard as Figma's legacy
"Team admins will have the chance to adjust permissions before payment is
collected" — and the direct answer to the problem Miro documents only after the
fact as `Accidentally added seats`.

**Tax disclosure at the point of purchase** `[observed]`, FAQ
`Will I be charged tax with my subscription?`: prices exclude tax; if tax
applies it is calculated from billing details and the rate at charge time; and —
the operative promise — **"You'll see the total amount, including the current tax
amount, before you confirm your purchase."** A commitment about what a future
screen will show, made on the pricing page.

**Status page subscription** `[observed]`: email covers `creates`, `updates` or
`resolves`; **webhook covers a fourth event — `changes a component status`** —
which email and SMS do not. Per-channel scoping again, and here the machine
channel gets the *finer* granularity, which is the right way round.

In-product toasts, banners, and email templates `[absent]`.

## T10 Disclosures, legal & compliance

**Six distinct footnote classes on one pricing page** `[observed]`, which is
either rigorous or a symptom, and probably both: `^` (AI allowance rates),
`+` (fair use), `**` (print discount conditions), `†` (Enterprise support
threshold), and superscripts `¹` `²` `³` inside the comparison matrix.

The footnote texts themselves are careful:

- **`^`** — "Standard, Premium, and Ultra AI tools use your shared AI allowance at different rates. Usage estimates assume simple tasks and lower-consumption AI tools within each tier. More advanced AI tools and complex tasks use more allowance, so actual usage may be lower."
- **`†`** — "For enterprise customers with 150+ contracted seats"
- **`**`** — "Available only where Canva Print is offered. Cannot be combined with other print offers."
- **`+`** — "Fair use limits apply."
- Standalone: **"Prices exclude applicable tax."**
- Standalone: **"Canva's features and offerings may evolve over time. Each plan includes everything in the previous plans - plus more."**

The `^` footnote is the flagship and it is a genuinely hard disclosure done well.
Canva sells AI in "uses", which is a unit the user can count — and then admits,
in the same breath, that **the unit is not constant**: the headline numbers
assume simple tasks and cheap tools, and "actual usage may be lower." It states
the direction of the error (lower, never higher), so the number on the card is a
ceiling. That is the Wise *claim-then-bound* pattern applied to a metered
resource.

**The AI-allowance FAQ then does the arithmetic the footnote promised**
`[observed]`, under `How does AI usage work across Canva plans?`. Summarised:
AI tools fall into two classes — ones that can be used "abundantly" and do not
draw down the allowance (all `Standard AI` tools on paid plans, with a named
exception for a `Pro Lite` plan), and ones that share a monthly pool that resets
each month. Total uses depend on three stated variables: tool tier, task
complexity, and whether you mix tools. Then per-plan ranges are given
explicitly — Free up to 20 Standard *or* Premium uses and **no Ultra access**;
Pro up to 200 Premium *or* 20 Ultra; Business and Enterprise up to 400 Premium
*or* 40 Ultra — with the bounding sentence: the ranges show "what's possible if
you use one type of AI tool… not a mix", and mixing or complex work "may reduce
your total uses to the lower end of the range."

Three things worth taking. The **`or` is doing the work** — the numbers are
alternatives, not a budget you get both of, and the copy uses `or` rather than
listing them as separate allowances. The **exclusion is stated in bold**
(no Ultra on Free) rather than shown as a blank cell. And the **trial case is
disclosed separately**: "AI allowance during trial is the same as Canva Free.
Access the full allowance (10x more) when you start your paid plan." A trialist
who assumed they were testing the paid allowance is corrected before they
conclude the product is stingy.

**A numeric inconsistency inside that same disclosure** `[observed]`: the Pro
plan card says `10x more AI than Canva Free`, Business says `20x more AI than
Canva Free`, and the FAQ's own figures are 20 → 200 Premium uses (10×) and
20 → 400 (20×), so the multipliers reconcile for Premium. But the `AI Pass`
card claims `40x more AI than Canva Pro - or 20x more than Canva Business`, while
the comparison matrix row for Pro reads `40x more AI allowance²`. Two baselines
for one multiplier in adjacent copy; a reader cannot tell whether 40× is
relative to Pro or absolute.

**Privacy default stated as an absolute, in the FAQ** `[observed]`, under
`If I add a team member, will they be able to see all my designs?`:

> "Your designs are always private, unless you explicitly choose to share them or save them as templates for your team."

One sentence. `always private` as the default, `explicitly` as the only exit, and
— the useful part — **two named exits, not one**: sharing *and* saving as a team
template. The second is the non-obvious one, and it is the mechanism by which a
user could expose work without thinking they had shared it. Naming both in the
same sentence as the privacy promise is the disclosure.

**Permission and access-control vocabulary** `[documented]`, from titles and
matrix rows only: `Update folder permissions`, `Request design access`,
`Revoke all access`, `Restrict design sharing`, `Share links to designs`,
`Personalize share links` (capped `Up to 5` on Pro),
`Manage content and sharing controls` (Enterprise), `Set Brand Controls™️`,
`Get Design Approvals`, `Access domain report`,
`Access Design Activity report`, `Access data residency`.

`Brand Controls™️` carries a trademark symbol **inside a comparison-matrix row
label**, which is the only ™ in Canva's harvested copy and sits oddly in a
feature table.

**AI indemnity sold as a plan feature** `[observed]`:
`Access to AI output indemnity (Canva Shield)` and
`Access to AI admin controls (Canva Shield)`, both `Unavailable` below the top
tiers, plus a footer link to `Canva Safe AI`. **Legal risk transfer as a priced
line item in a consumer-facing feature matrix**, named as a product
(`Canva Shield`) rather than as a contract term. Worth flagging for any
PayPal work where an indemnity or guarantee is being productised.

**Commercial-use rights as a top-level help topic** `[observed]`:
`Commercial use, copyright, and legal` — "Learn about selling designs made on
Canva and using paid elements". For a template product whose users resell output,
the licence question is a support question, and Canva files it as one rather than
leaving it to the ToS.

**Billing mechanics disclosed in the FAQ** `[observed]`, summarised:
- `pay-as-you-grow` — "you only pay for the team members who accept your invitation. There's no immediate charge; billing is adjusted monthly, or quarterly if you're on an annual subscription." **Acceptance, not invitation, is the billing trigger** — stated plainly, and it is the exact inverse of Miro's silent-seat-consumption default.
- Payment methods enumerated (PayPal, Visa, Mastercard, American Express, plus other systems in some countries)
- Tax handled per jurisdiction with two worked cases: US sales tax by billing address, Canada GST plus provincial taxes by postal code; tax-exempt users routed to a certificate article
- Nonprofits: free Pro-equivalent for one team of up to 50 users, additional seats 50% off on Enterprise
- Education eligibility routed to `Eligibility guidelines` rather than asserted
- Enterprise trial refused outright: "we don't offer a free trial for Canva Enterprise" — a plain no, with a demo offered instead

**Accessibility conformance stated with its scope** `[observed]`:

> "Today, Canva supports WCAG 2.1 AA compliance across our core product experiences, as documented in our VPAT."

`across our core product experiences` is the bound, and it is doing real work —
the claim is scoped to core experiences rather than the whole platform. Then:
"We go beyond compliance by embedding accessibility into everyday tools —
enabling anyone, not just experts, to create more inclusive content." The
conformance report is published at `trust.canva.com` and feedback goes to
`accessibility@canva.com`. Compare Miro's `WCAG 2.2 AA` target with an annual
VPAT and a public changelog; Canva claims a lower version, present tense, with a
scope qualifier.

## T11 Help-centre architecture

**Platform:** in-house (not Zendesk or Intercom), under `canva.com/help/`, with
build hashes in meta tags. Three levels of topic before articles, and **a scope
line on every node at every level** — the most consistent descriptive discipline
in the corpus.

**Shape:** 10 topics → sub-topics → sub-sub-topics → articles. Observed path:
`Sharing, presenting, and managing designs` (4 children) → `Sharing`
(5 children) → `Sharing permissions` (5 articles).

**Topic-title grammar — two shapes, cleanly split:**

| Shape | Used for | Example |
|---|---|---|
| Gerund phrase | Activities | `Editing and designing`, `Sharing, presenting, and managing designs`, `Downloading, previewing, and uploading`, `Sharing`, `Presenting`, `Commenting` |
| Bare noun | Domains | `Account settings`, `Brand`, `Websites`, `File management`, `Print and delivery` |

The gerund families are **comma-runs of up to three activities**
(`Downloading, previewing, and uploading`), which is unusual — most help IA
picks one verb per category. Canva groups by *moment in the workflow* rather
than by object, so three adjacent verbs share a category because they happen at
the same point.

**Article-title grammar — four shapes** (from the one article list captured):

| Shape | Example |
|---|---|
| Imperative verb-first | `Update folder permissions in Canva`, `Request design access`, `Restrict design sharing` |
| Imperative + stated exception | `Revoke all access to your design even from shared folders` |
| Subjectless failure | `Can't edit shared design` |
| `How do I …?` / `Why …?` (in the `Try asking` pills) | `How do I resize my design?`, `Why was I charged?` |

The second shape is the distinctive one and it recurs in the `Try asking` pills
and in matrix values (`Excludes mock up templates`) — Canva's house habit is to
**put the caveat in the label**.

**Routing furniture** `[observed]`: `Ask a question` at every level;
`Help` breadcrumb root; numbered breadcrumb trail; `View all topics`;
four routing cards on the home page; `Design School` cross-sell. The article-
level feedback widget was not reachable (bodies client-rendered) — `[absent]`.

**Notable absence:** there is **no "Contact support" in the help nav**. Contact
is reachable only through the `Solve your issue` card → `/get-in-touch/` (the
page that rendered empty) or through `Recover your account`. Human support is
gated behind a self-service card, and on this harvest that card led nowhere.

**An `AI help assistant` is a plan feature** `[observed]`, matrix row
`Access to AI help assistant` — `Included` from Free. So the primary help
interface is conversational, which explains `Ask a question` and `Try asking`:
the pills are prompt suggestions for an assistant, not search shortcuts. That
reframes the whole help IA as a **fallback behind a chat surface**, which is
worth flagging as the direction of travel.

## T12 FAQs

**Pricing FAQ — 20 questions, verbatim, in order** `[observed]`, headed
`Frequently Asked Questions`, answers in server HTML:

| # | Question (verbatim) |
|---|---|
| 1 | Can I use Canva for free? |
| 2 | How does AI usage work across Canva plans? |
| 3 | How can I get more AI on my plan? |
| 4 | Is Canva Pro available for teams? |
| 5 | What is the difference between Canva Business and Canva Pro? |
| 6 | Can I invite other team members during my trial? |
| 7 | What is the difference between Canva Business and Canva Enterprise? |
| 8 | How can I request a trial of Canva Enterprise? |
| 9 | What if I work for a nonprofit? |
| 10 | What if I am a student or teacher? |
| 11 | What payment methods can I use? |
| 12 | Will I be charged tax with my subscription? |
| 13 | How does the billing work when I add new members to my team? |
| 14 | If I add a team member, will they be able to see all my designs? |
| 15 | How can I contact the sales team? |
| 16 | Is Canva AI available in my country? |
| 17 | What happened to Canva Teams? |
| 18 | How do I get access to Flourish that is included in Canva Business? |
| 19 | Where can I see the price of my subscription? |

**Structural notes.** The arc is: free? → **AI (×2)** → plan boundaries (×4) →
discounts (×2) → payment → tax → team billing → **privacy** → sales → AI
availability → sunset → bundled product → where to check.

Q2 and Q3 at positions two and three is the tell: for Canva in 2026 the most
confusing thing about the plans is **how much AI you get**, and the FAQ answers
it before explaining any plan difference. Two consecutive questions, one on
mechanics and one on remedy (`How can I get more AI on my plan?`) — the second
exists because the first answer will leave people short.

**Q4 is a question the user asks and the company would rather not answer**:
`Is Canva Pro available for teams?` The answer is a flat no with the reason —
"Only one person can use a Canva Pro account" — followed by the upsell. Sitting
this at position four, in the user's words, rather than burying it in a seat
definition, is the right call; the alternative is a support ticket after
purchase.

**Q14 is the best-placed question in the set.**
`If I add a team member, will they be able to see all my designs?` is a
*privacy* question inside a *pricing* FAQ, asked in the conditional, at the exact
moment a user is deciding whether to upgrade to a team plan. The answer (T10) is
one sentence with the default and both exits. Privacy anxiety is a purchase
blocker and Canva treats it as one.

**Q17 `What happened to Canva Teams?`** — past tense, about a product that no
longer sells. A pricing FAQ used as a **migration-communication surface**, in the
voice of a confused returning customer.

**Q19 `Where can I see the price of my subscription?`** is the most mundane and
one of the most useful: the answer gives the click path (account menu →
Settings → Billing). A user who cannot remember what they are paying is told
where to look, on the public page, without logging in.

Q16 (`Is Canva AI available in my country?`) is answered with a **language list
rather than a country list** — 18 languages enumerated. The question and the
answer are about different things, and a user in an unlisted-language country
cannot resolve their question from it. Recorded as a defect.

**Accessibility FAQ — four questions** `[observed]`:

| # | Question (verbatim) |
|---|---|
| 1 | How are you making Canva more accessible? |
| 2 | Is accessibility part of Canva's Two-Step plan? |
| 3 | How do I improve the accessibility of my Canva designs? |
| 4 | Do you run screen reader compatibility tests? |

Q1's answer is a numbered four-part commitment: accessibility embedded from day
one; internal education via workshops and talks; regular audits with a **named
external partner (Intopia)**; and research with the disability community via a
**named partner (Fable)**. Naming the auditors makes the claim checkable.

Q4's answer is the most specific and the most quotable practice: Canva declines
to recommend a screen reader and states it tests on **VoiceOver, NVDA and JAWS**.
Naming the three and refusing to endorse one is the correct posture.

Q3 is the pivot from company to user — "How do I improve the accessibility of
**my** designs" — routed to the `Design Accessibility Tool`. Q2 is the only
inward-facing one, tying accessibility to Canva's `Two-Step Plan`
(Step One: become one of the world's most valuable companies; Step Two: do the
most good we can). An FAQ slot spent on corporate strategy in an otherwise
user-facing set.

## T13 Terminology & glossary

| Term | Canva's usage | The alternative it rejected |
|---|---|---|
| `design` | The universal object noun — a poster, deck, video, and website are all "designs" | "file", "document", "project" |
| `Visual Suite` | The product family umbrella | "platform", "workspace" |
| `Magic <verb>` | The AI feature-naming convention: `Magic Layers` `Magic Eraser` `Magic Write` `Magic Resize` `Magic Animate` `Magic Insights` `Magic Formulas` | "AI <feature>" — used only for the generic generators (`AI image generator`) |
| `Brand Kit` | Container for colours, fonts, logos; counted as a plan unit (1 / 5 / 100 / 1000) | "style guide", "theme" |
| `Brand Templates` / `Brand Controls™️` | Locked-down templates and the governance over them | "locked templates", "brand governance" |
| `Components` | Reusable design elements | |
| `Print Shop` | The physical-goods surface, named as a shop | "Print", "Merchandise" |
| `Content Planner` | Social scheduling | "Calendar", "Scheduler" |
| `Canva Shield` | The AI indemnity and admin-controls bundle | "AI indemnification" |
| `Canva Code` | Prompt-to-interactive-design | |
| `AI allowance` / `uses` / `AI Pass` / `AI top-ups` | The metered-AI vocabulary: a pooled monthly allowance, spent in "uses", extended by a recurring `Pass` or a one-off `top-up` | "credits" (Miro's word), "tokens" |
| `Standard AI` / `Premium AI` / `Ultra AI` | Three consumption tiers, used as row prefixes in the matrix | "basic/advanced" |
| `pay-as-you-grow` | Billing model where acceptance triggers the charge | "prorated seats" |
| `Submit a wish` | The feature-request channel | "Feedback", "Feature request" |
| `Design School` | The learning destination | "Academy" (Miro's word), "University" |
| `Create guides` | Artefact-keyed how-to content | "Tutorials" |
| `Design Accessibility` | The in-product accessibility checker | "Accessibility checker" (Miro's word) |
| `alt-text` | Hyphenated, lowercase, used consistently | "alternative text" (used once, in prose) |
| `Two-Step Plan` / `Step One` / `Step Two` | Company strategy, surfaced in a user-facing FAQ | |
| `Canva Teams` | Retired plan name, retained in the FAQ | |
| `Affinity` / `Flourish` | Acquired products referenced as bundled access | |

**The `Magic <verb>` convention is the most transferable naming decision here.**
Seven features share the prefix, each pairing it with a **plain verb or noun the
user already understands** — `Eraser`, `Write`, `Resize`, `Animate`, `Layers`,
`Insights`, `Formulas`. The magic word carries the "this is the AI one" signal
and the second word carries the meaning, so a novice can predict what an unseen
`Magic X` does. Contrast Loom's `Auto-` prefix (same function, duller) and
Miro's `Sidekicks` / `Flows` (evocative, unpredictable). Canva's is the only one
of the three where the name **teaches the feature**.

The convention has a boundary, and Canva respects it: generic capabilities that
are not differentiated get literal names (`AI image generator`,
`AI voice generator`, `Background remover`, `Image enhancer`). `Magic` is
reserved for the proprietary ones. That is a discipline, not an accident.

**`design` as the universal object noun** is the second structural choice. A
Canva user never learns that a presentation and a t-shirt are different kinds of
file; both are `designs`, both live in `folders`, both have `sharing
permissions`. One noun collapses ten product surfaces into one mental model,
which is exactly what a novice needs and exactly what Figma's ten-product nav
does not do.

**Register split.** Marketing says `Visual Suite`, `creative ecosystem`,
`Fast-track your creative vision`. Help says `design`, `folder`, `share`,
`permissions`, `fix card errors`. The help vocabulary is plainer than the
marketing vocabulary, as with all four products in this batch — but Canva's gap
is the narrowest, because the marketing copy is already built from concrete
object nouns (`Mugs`, `Flyers`, `Resumes`).

**Locale-spelling defect** `[observed]`: the pricing page footnotes link to
"`Help Centre`" (British) **twice**, on a page whose every other reference,
including the nav, the footer, and the page title, reads `Help Center`
(American). Two spellings of the same destination on one en-US page. Compounding
this, the en-US accessibility page's six `Learn more` links all point into
`/en_au/help/…` — Australian-locale URLs served from the US page.

## T14 Voice, tone & accessibility

**Person and tense.** Second person throughout, and Canva uses the **interrogative
second person** more than any product in this batch: `What will you design
today?`, `What will you create?`, `Try asking`, `Need help fast?`. First-person
plural for the company, warm and declarative — "Our mission is to empower
everyone in the world to design", "we'll email the team admin", "We accept
PayPal and credit cards", "we test on a range of screen readers".

**Register.** Plain, short, encouraging, and almost entirely free of jargon on
the consumer surfaces. The distinctive move is **permission-granting language**:
`Design anything and bring your ideas to life`, `No cost, just creativity`,
`Templates for absolutely anything`, `for everyone`, `enabling anyone, not just
experts`. Canva's tone problem is not over-claiming; it is that a novice might
not believe they belong, and the copy is engineered against that.

The register hardens correctly as stakes rise. The AI-allowance footnote, the tax
FAQ, and the accessibility conformance statement are all flat, hedged, and
precise (`may be lower`, `if tax applies`, `across our core product
experiences`). The gradient is the same as Wise's and steeper than Loom's.

**Exclamation marks: exactly one** in the harvested copy —
"Tell us what you'd love to see in Canva next!" on the `Submit a wish` card,
which is the one genuinely low-stakes invitation on the page. Zero in pricing,
zero in disclosures, zero in the help topic tree. Disciplined.

**No emoji** anywhere in the harvested copy.

**Reading level.** Consumer-facing copy is one clause per sentence. The
pricing matrix and AI-allowance FAQ are the exception and they are dense — three
AI tiers × four plans × two metering behaviours × two add-on types, with six
footnote classes. Canva's mitigations are the `Differences only` matrix filter,
the tier prefixes in row labels (`Ultra AI`, `Premium AI`, `Standard AI`), and
the FAQ that restates the whole model in prose. Three devices, and the material
is still the hardest thing on the site to read.

**Accessibility content — strong, and the strongest part is the *author*-side
tooling** `[observed]`

Claim: `WCAG 2.1 AA` "across our core product experiences, as documented in our
VPAT", report published at `trust.canva.com`, feedback to
`accessibility@canva.com`. Audited with **Intopia**; user research with
**Fable**; screen-reader testing on **VoiceOver, NVDA and JAWS** with an explicit
refusal to recommend one.

Six named features, each with an object-specific `Learn more`:

| Feature | What the copy says (summarised) |
|---|---|
| `Design Accessibility` | Finds and applies accessibility improvements; "detects issues with color contrast, typography, alternative text (alt-text), and more" |
| `Alt-text for images and elements` | "Add alt-text or let AI suggest for you" |
| `PDF Accessibility` | Canva PDFs are readable by screen readers |
| `Captions for audio and video` | Auto captions per design or globally |
| `Accessibility settings` | User preferences for shortcuts, contrast, captions |
| `Keyboard shortcuts` | Navigate and design by keyboard |

The framing sentence is the reusable one: "These tools in Canva do not only help
anyone design with equal ease. They also help everyone create accessible designs
for all." **Two audiences named in two sentences** — the disabled creator and
the creator of content for disabled audiences. And the positioning claim,
"enabling anyone, not just experts, to create more inclusive content", is the
accessibility-specific version of Canva's whole proposition.

For a product whose users produce billions of public artefacts, shipping a
contrast-and-alt-text checker to *every* user (including Free) is a larger
accessibility contribution than the platform's own conformance, and the page
says so.

**Skip-link architecture is the most thorough in the corpus** `[observed]`.
Beyond `Skip to main content`, Canva emits **section-level bidirectional skip
links**:
`Skip to end of footer` / `Skip to start of footer` ·
`Skip to end of template list` / `Skip to start of template list` ·
`Skip to end of "Accessibility at our core" section` /
`Skip to start of "Accessibility at our core" section`, with matching
`Start of section: …` / `End of section: …` landmarks.

Long carousels and repeated grids are exactly where keyboard users get trapped,
and Canva fences each one at both ends with a named link. Loom and Figma ship one
skip link; Miro ships none in server HTML. This is a real differentiator and
directly copyable.

**Alt text quality is mixed** `[observed]`
- Good, scene-and-purpose level: "A visual demonstration of an image separated into distinct layers including a bottle, flowers, and mountain background." · "A split-screen comparison showing two men taking a selfie with the original background removed and replaced by a pink-and-white checkered pattern." · "Magic Write menu showing writing options like Apply brand voice, Keep writing, and Shorten over blurred document text."
- Good, UI-state level: "A spreadsheet with columns for images of people, status labels like 'In review' and 'Done', and budget amounts." · "Woman updating a task status to In review, on a project spreadsheet with team avatars and budget columns."
- Weak, filename- or icon-name-level: `![Headphone]` and `![Grad Cap]` on the pricing audience toggle — the alt text names the *icon*, not the *choice it represents* (`Individuals and business` / `Education`). Also `![Quotation mark](<>)` — decorative alt text on an image with an empty src, where empty alt would be correct.
- `![ ]` (single space) on two ecosystem-card images

**Negative findings, recorded honestly**

- **Ten `Explore <Tool>` CTAs on the home page link to `/signup/`, not to the tool they name** — the most consequential defect for the novice audience
- `/help/get-in-touch/` renders an empty document; three surfaces (help `Solve your issue` card, `Submit a wish`, and the status page's false-green pointer) route to it
- Help topic URL slug contains a typo: `/help/biling-payment-plans/`
- `Help Centre` (British) twice in pricing footnotes on a page that otherwise says `Help Center`
- en-US accessibility page's six `Learn more` links all point into `/en_au/` URLs
- Four labels for signup (`Start designing`, `Start designing for free`, `Get started for free`, `Get started`); two for the trial (`Start a free trial`, `Try for free`)
- Bare `Learn more` three times on the pricing page, on a site that demonstrates the correct specific pattern five times on the accessibility page
- `Choose a plan` / `No options selected` renders as a value in ~80 matrix rows
- `40x more AI` given against two different baselines in adjacent copy (vs Pro on the AI Pass card, vs unclear in the matrix row)
- `Canva Offline` listed as a `New features` item under **all four** plans, so the "new" badge distinguishes nothing
- `mock ups` (two words) in one matrix row and `mockups` (one word) in the nav and a help scope line
- `Brand Controls™️` carries a trademark symbol inside a comparison-matrix row label
- Q16 asks about country availability and is answered with a list of languages
- `Loading` sits in the server HTML of every page fetched, unqualified
- `Your browser is not supported and may not give the best experience.` on the accessibility page, with no action offered
- The `accessibility@canva.com` contact is linked as `https://www.canva.com/accessibility/accessibility@canva.com` — a mailto address rendered as a relative path, producing a dead link on the accessibility page itself
- Pricing audience-toggle icons carry the icon's name as alt (`Headphone`, `Grad Cap`) rather than the option's meaning
- A promotional `AI Pass` banner sits above the pricing hero and repeats as a card lower down

---

## Transferable patterns

1. **Ask the user what they will make, not what the product is.**
   `What will you design today?` — second person, future tense, interrogative,
   and it presupposes capability. Reprised as `What will you create?`. The
   cheapest confidence-building move available to a product with novice users.
2. **Pre-write the user's questions as clickable pills, in their grammar.**
   Seven `Try asking` items, five `How do I …?`, ordered task-first then money
   then access, with the catastrophic one short-circuited straight to the
   recovery flow. The label `Try asking` teaches the interaction mode. Directly
   applicable to any help surface fronting a search box or an assistant.
3. **Put your most resented event on the help home in the user's words.**
   `Why was I charged?` — four words, first person, no softening. Applies
   verbatim to PayPal.
4. **Name the exit in the help promise.** "Ask questions. Find answers. Get back
   to designing." Three beats; the third is the user's real goal. Help is an
   interruption, and saying so respects the user's time.
5. **Organise navigation by the artefact the user wants, not the capability
   required.** `Flyers`, `Mugs`, `Resumes`, `T-shirts` as nav items. A novice
   arrives with an output in mind and finds it by name.
6. **Put the exception in the title.** `Revoke all access to your design even
   from shared folders` — fourteen words that answer the anxiety which motivated
   the search. Same habit visible in `Excludes mock up templates` and
   `Select issues`. Where Miro repeats a warning four times and Figma states an
   inheritance rule, Canva labels the edge case.
7. **Reserve one prefix for AI features and pair it with a plain word.**
   `Magic Eraser`, `Magic Write`, `Magic Resize` — the prefix signals the
   category, the second word teaches the function, and a user can predict what an
   unseen `Magic X` does. Crucially, do not extend it to undifferentiated
   capabilities: those get literal names (`Background remover`).
8. **One universal object noun.** Everything is a `design` — poster, deck, video,
   t-shirt, website. Ten surfaces, one mental model, one set of folder and
   sharing semantics to learn.
9. **`Save from 16%`, not `Save 16%` or `Save up to 17%`.** `from` promises a
   floor, so the claim cannot disappoint. One preposition doing disclosure work.
10. **Vary the plan-list header verb by tier.** `get` → `unlock` →
    `power growth with` → `scale with`. Four words, and the buyer's
    sophistication is mirrored back.
11. **When you meter a resource in a countable unit, say the unit is not
    constant, and say which way the error runs.** "Usage estimates assume simple
    tasks… so actual usage may be lower." The headline number becomes a ceiling
    rather than a promise. Then disclose the trial case separately.
12. **Make acceptance, not invitation, the billing trigger — and say so.**
    "you only pay for the team members who accept your invitation", with an email
    and a notice period before any annual adjustment. The direct fix for the
    invite-silently-bills-me failure.
13. **Answer the privacy question inside the pricing FAQ.** "Your designs are
    always private, unless you explicitly choose to share them **or save them as
    templates for your team**." Default, exit, and the *second* non-obvious exit,
    in one sentence, at the moment of purchase decision.
14. **Fence long carousels and grids with named bidirectional skip links.**
    `Skip to end of template list` / `Skip to start of template list`, plus
    matching landmarks. Keyboard users get trapped in repeated grids; one link
    per boundary, named after the region, fixes it.
15. **Name your auditors and your test targets.** Intopia for audits, Fable for
    disability-community research, VoiceOver/NVDA/JAWS for screen readers, with
    an explicit refusal to endorse one. Named third parties make a conformance
    claim checkable.
16. **Ship the accessibility checker to the free tier.** For a product whose
    users generate public artefacts at scale, author-side tooling
    (`Design Accessibility`, AI-suggested alt text, auto captions) does more good
    than the platform's own conformance — and the copy says so: "enabling anyone,
    not just experts, to create more inclusive content."

## Caveats & gaps

- **Help-article bodies are client-rendered and were not captured.** Every Canva
  help *topic* page server-rendered its children and scope lines cleanly, but no
  article body text was retrievable. So T5 (share-dialog labels), T6 (state
  values), and T9 (in-product messages) rest on titles and matrix rows only.
  Marked `[documented]` or `[absent]` throughout.
- **`/help/get-in-touch/` returned an empty document.** Recorded as a finding in
  T8, but it may be client-rendered rather than broken. Its child paths
  (`/contact-support/`, `/general-feedback/`) were not separately fetched.
- **Only one article list captured.** `Sharing permissions` (5 titles) is the
  sole article-level list in this harvest. The other nine top-level topics were
  not drilled to article level, so T7's error inventory is much thinner than it
  could be. Drilling `Billing, payments, and plans` and `Editing and designing`
  to article level is the highest-value follow-up.
- **`Design School` not fetched.** It is named in nav, footer, and a help-home
  card, and is the primary novice-education surface — i.e. arguably the single
  most relevant page to this product's flagged benchmark strength. `[absent]`.
- **`Create guides` not fetched** (`/create/logos/` etc.) — seven artefact-keyed
  how-to pages that would supply the novice task-phrasing directly. `[absent]`.
- **`trust.canva.com`, `/security/`, and `/safe-ai-canva-shield/` not fetched.**
  The substantive security and AI-governance disclosure copy lives there; T10
  rests on the pricing matrix, footnotes, and FAQ.
- **Comparison matrix read with only Free and Pro columns populated.** The third
  column rendered as `Choose a plan`, so Business and Enterprise values are
  captured only from the plan cards and the FAQ, not from the matrix. Any claim
  about a specific Business or Enterprise matrix value would be unreliable.
- **Prices observed at default (yearly, en-US, `US$`).** `US$0` / `US$144` /
  `US$250` per year. The monthly figures were not rendered.
- **No published content style guide or voice-and-tone documentation found.**
  Canva publishes brand and design guidance (Design School, `Learn blog`,
  `Font pairing`, `Color wheel`) but nothing that governs UX copy surfaced on the
  pages inspected. `[absent]`
- **Status observed fully operational.** No live or historical incident text, so
  incident-communication register is `[absent]`.
  `www.canvastatus.com/history` would supply it.
- **Locale.** en-US only, from a site offering ~110 locales. Nothing is claimed
  about translated register — though the `Help Centre` / `Help Center` split and
  the `/en_au/` cross-links suggest locale hygiene is imperfect even within
  English.
- Mobile app strings, email templates, print-order flows, and the signup
  sequence are outside the unauthenticated web surface.

## Sources

1. https://www.canva.com/
2. https://www.canva.com/pricing/
3. https://www.canva.com/help/
4. https://www.canva.com/help/topics/
5. https://www.canva.com/help/share-present-manage-designs/
6. https://www.canva.com/help/sharing/
7. https://www.canva.com/help/sharing-permissions/
8. https://www.canva.com/help/get-in-touch/ (returned an empty document)
9. https://www.canva.com/accessibility/
10. https://status.canva.com/ (redirects to https://www.canvastatus.com)
