# 135. LinkedIn Learning

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Professional skills video learning (enterprise L&D platform + consumer subscription), embedded in a professional social network |
| Primary URL | https://www.linkedin.com/learning/ — **returned an empty body; blocked** (see Caveats). Harvested surface: https://business.linkedin.com/learn |
| Corpus rank | 135 |
| Benchmark strength (source list) | Course discovery and progress |
| Locale / market observed | en-US (`og:locale: en_US`; content claimed in 7 native languages + 46 via subtitles) |
| Platform observed | B2B marketing microsite (Adobe AEM, `meta-pageKey: microsites_business_content`) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a as a sector. Relevant posture is **credentialing**: CEU issuance via named accrediting bodies (NASBA, PMI), Professional Certificates issued in partnership with named vendors, and certification-exam preparation — i.e. the product's claims are anchored to third-party accreditation regimes rather than to self-assertion. Microsoft-owned; footer carries `Your California Privacy Choices` (CCPA/CPRA) and `Cookie Policy`. |
| Harvest date | 2026-09-21 |
| Pages inspected | 4 reachable + 3 blocked |
| Harvest completeness | **Partial — blocked.** Every `www.linkedin.com` URL attempted returned an empty body: `/learning/`, `/legal/accessibility`, `/help/learning`. `accessibility.linkedin.com` and `about.linkedin.com/accessibility` also returned empty. So the learner-facing product surface, the help centre, and the accessibility statement — **including the substantial accessibility statement the brief anticipated** — are all unreachable. Everything below is harvested from the B2B microsite on `business.linkedin.com`, which is a **buyer-facing surface, not a learner-facing one.** |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| LinkedIn Learning home (B2B) | https://business.linkedin.com/learn | Reached via redirect from `learning.linkedin.com`. Hero, four-pillar model, stat band, customer logos |
| Product overview | https://business.linkedin.com/learn/product-overview | Four-pillar tabbed deep dive, ~17 named feature blocks, per-pillar stat |
| Compare plans | https://business.linkedin.com/learn/compare-plans | Two enterprise SKUs + two self-serve tiers, feature-comparison matrix |
| Courses & Learning Paths | https://business.linkedin.com/learn/content-library | Discovery taxonomy, sample course cards with descriptions, Learning Paths list, ROI stat |
| Certifications and Credentials | https://business.linkedin.com/learn/certifications-and-credentials | Three credential types, partner logos, CEU framing — the certificate-of-completion anchor |
| **Learner product surface** | https://www.linkedin.com/learning/ | **BLOCKED — empty body** |
| **Help centre** | https://www.linkedin.com/help/learning | **BLOCKED — empty body** |
| **Accessibility statement** | https://www.linkedin.com/legal/accessibility · https://accessibility.linkedin.com/ · https://about.linkedin.com/accessibility | **ALL BLOCKED — empty bodies** |

---

## T0 Harvest-surface finding — a buyer-facing corpus, not a learner-facing one

**Recorded first because it constrains every section below.** `[observed]`

`learning.linkedin.com` **redirects to `business.linkedin.com/learn`**, and `www.linkedin.com/learning` returns nothing to an unauthenticated fetch. The consequence is that the harvested corpus is **enterprise sales copy addressed to an L&D buyer**, not product copy addressed to a learner.

That shows up everywhere:

- The dominant CTA is **`Contact sales`** (14+ instances across four pages), not `Start learning`.
- The second-person `you` in this corpus means **the buyer**, not the learner: "Grow **your people**", "Develop **your employees'** skills", "**Empower every employee**", "customized to **your org**".
- Learners are referred to in the **third person** throughout — `employees`, `learners`, `talent`, `your workforce`, `every professional`.
- Pricing exists only as a plan-comparison matrix with no numbers for the enterprise SKUs, and a `Start free trial` link for the self-serve tiers that leads to `www.linkedin.com/learning/subscription/products` — i.e. the blocked domain.

So the two things the brief asked for most — **how courses are surfaced against a professional-identity context**, and **certificate-of-completion framing** — are partly answerable (the B2B pages describe both) and partly not (the actual learner-facing discovery UI and the completion artefact's own copy are behind the block). Sections T4, T6, T7, T8, and T9 are correspondingly thin or absent, and are marked honestly rather than padded.

## T1 Navigation & IA labels

**Microsite nav — a four-group mega-nav, plus a wordmark lockup** `[observed]`

Brand lockup: `LinkedIn logo` + `| Learning` — a pipe separator between the parent brand and the product noun, so the product is presented as a *division* rather than as a standalone brand. (Compare 134 Elevate, which is a sub-page of a parent; LinkedIn Learning is a named tier of a platform.)

| Group | Items |
|---|---|
| `Products` | `Overview` — "Develop your employees' skills and careers" · `Compare Plans` — "Find the best plan for your company" |
| `Featured Solutions` | `For Business` · `For Higher Education` · `For Government Agencies` · `For Libraries` · `For Technology` |
| `Courses` | `AI Learning Content` · `Business` · `Technology` · `Creative` · `Certification Programs` |
| `Resources` | `AI Upskilling` · `Customer Stories` · `Learning Resources` · `Blog` · `Integration Partners` · `2026 LinkedIn Talent Report` · `Customer Success Center` · `Support` |

Two patterns worth extracting.

**`Featured Solutions` is segmented by institution type, not by company size or job function.** `For Business` / `For Higher Education` / `For Government Agencies` / `For Libraries` / `For Technology` — five audience doors, of which four are sector and one (`For Technology`) is a content vertical masquerading as an audience. `For Libraries` as a first-class nav item is the interesting one: it names a procurement channel (public library systems buying seats for cardholders) that most edtech treats as a footnote.

**The `Products` group items carry scope lines**, in the Wise manner: `Overview` → "Develop your employees' skills and careers"; `Compare Plans` → "Find the best plan for your company". Two items, two one-line descriptions of the job each does. The other three groups get bare labels.

**`Courses` uses a three-bucket content taxonomy**: `Business` · `Technology` · `Creative`. Three words covering 24,000+ courses. This is the top of the discovery hierarchy and it is remarkably coarse — see T13 for why three is the right number for this product.

**Defect** `[observed]`: the nav lists `Support` pointing at `www.linkedin.com/help/learning` and the footer lists `Accessibility` pointing at `www.linkedin.com/accessibility` — both on the domain that returns nothing to an unauthenticated request. From this microsite, **help and accessibility are advertised and unreachable.**

**Footer — the parent platform's footer, not the product's** `[observed]`

The footer is LinkedIn's business-solutions footer, and Learning is one of four columns:

| Group | Items |
|---|---|
| `Hire` | `Recruiter` · `Recruiter Lite` · `Referrals` · `Job Slots` · `Job Posts` · `Career Pages` · `Work With Us Ads` · `Talent Blog` |
| `Advertise` | `Sponsored Content` · `Message Ads` · `Dynamic Ads` · `Text Ads` · `Marketing Blog` |
| `Sell` | `Sales Navigator` · `Sales Blog` |
| `Learn` | `For businesses` · `For higher education` · `For government agencies` · `For libraries` · `See all products` · `Learning Blog` |

**Three-verb grouping — `Hire` · `Advertise` · `Sell` · `Learn`** — is the cleanest top-level IA in this batch. Four imperative verbs naming the buyer's job, each expanding to product nouns. It also situates Learning inside a talent-lifecycle argument: you hire, you learn (develop), and the product pages then explicitly close the loop by feeding learning data back into internal mobility (T2).

**Defect** `[observed]`: the footer's `Learn` group duplicates the nav's `Featured Solutions` with **different capitalisation and different destinations** — nav says `For Higher Education` → `business.linkedin.com/learn/for-higher-education`, footer says `For higher education` → `learning.linkedin.com/for-higher-education/`. And the footer's `For government agencies` points at **`learning.linkedin.com/for-governments-old`** — a URL with `-old` in the slug, shipped live in the footer of every page. Two URL generations coexisting, one of them self-labelled as stale.

**`See More` / `View more business solutions`** `[observed]` — progressive disclosure in the footer, then an escape hatch to the full portfolio.

**Legal row** `[observed]`: `About` · `Cookie Policy` · `Privacy Policy` · `Your California Privacy Choices` · `User Agreement` · **`Accessibility`** · `Sitemap` · `© LinkedIn Corporation 2026`

`Accessibility` is a first-class footer link on every page — the correct practice, and better than Elevate's compound `Privacy Policy & Accessibility`. Its destination was unreachable here (see Caveats), but the IA decision is right.

**Persistent sales furniture** `[observed]` — a dismissible bottom bar on every page:

> `Contact sales now` · "An experienced sales specialist is here to help find the best solution for you." · `Contact sales` · `dismiss`

Note the string is **duplicated in the DOM** (`Contact sales now Contact sales now`, and the whole block appears twice) — a responsive-variant duplication that screen-reader users may encounter twice. Same class of defect as noted in the Wise exemplar.

## T2 Value proposition & headline patterns

**PRIORITY-adjacent** — this is where the professional-identity framing lives.

**Hero — the promise is *the network*, not the library** `[observed]`

> Eyebrow: `LinkedIn Learning`
> H1: `Personalized career guidance for every employee`
> Subhead: "**The only career development platform that's powered by your internal talent data and insights from LinkedIn's 1 billion professionals.**"

This is the defining positioning move and it is worth dwelling on. The headline does not claim courses, quality, breadth, or price. It claims **career guidance**, and the subhead's differentiator is a *data asset* — "your internal talent data" crossed with "LinkedIn's 1 billion professionals."

So the product is positioned as **the only learning platform that knows what careers actually look like**, because it sits on the world's largest résumé corpus. Restated on the product-overview page as a standalone section header:

> `You can't build the future of work without the network that powers it.`
> "Built on the career journeys of over 1 billion members, LinkedIn Learning taps LinkedIn's unmatched network to reveal **how careers grow**—so you can guide your workforce with insight you can trust."

`reveal how careers grow` is the cleanest four-word statement of the value proposition anywhere in the corpus. No other product in this batch can make a claim of this shape, and it is the direct answer to the brief's question about surfacing courses against a professional-identity context: **LinkedIn Learning does not recommend courses against a stated interest (Memrise's "reasons", Headway's goal grid, Blinkist's interest picker) — it recommends them against an observed career trajectory drawn from a billion actual career histories.** That is a categorically different recommendation substrate and the marketing copy is built entirely on it.

**Section headers are outcome triads and imperatives** `[observed]`

- `Grow your people for what's next with the world's most dynamic talent network` (home)
- `Grow your people for what's next` (product overview H1) — **the same phrase, once with a 9-word qualifier and once without**
- `Faster skill growth. Greater mobility. Stronger retention.` — three comparative noun phrases, full stops, no verbs
- `Organizations using LinkedIn Learning see:` — a colon-terminated header that hands off to a stat band
- `LinkedIn Learning is designed to build the most in-demand skills for every professional.`
- `The career development platform trusted by enterprise organizations worldwide`
- `Jumpstart AI upskilling across your organization`
- `Career paths are no longer straight lines`
- `Grow your people, evolve your strategy, and unlock what's next`
- `Help learners discover the right content to build the skills they need` (content-library page title)
- `Find the right courses for you`
- `Courses taught by industry leaders`
- `Certifications, Credentials, and Credits`
- `See what LinkedIn Learning can do for you.`

`Faster skill growth. Greater mobility. Stronger retention.` is the house triad: three comparatives, each naming a metric an L&D buyer is measured on. Note it is **retention**, not learner satisfaction — the third benefit is an HR outcome, not an education outcome.

`Career paths are no longer straight lines` is the best-written headline in the corpus: a five-word observation about the world that the product then answers. It is followed by "Discover how top **B2B leaders are rethinking talent architecture** to empower employees and unlock their career goals" — and `talent architecture` is the coined term doing the work (T13).

**The four-pillar model — verb-first, and used as both nav and headline** `[observed]`

The product is structured around four pillars, and the same four phrases serve as tab labels, section headings, and feature-group headers across two pages:

| Pillar (verbatim) | One-line promise | Supporting stat |
|---|---|---|
| `Deliver trusted expertise` | "Real skill building starts with enterprise-grade, expert-led content." / "24,000+ expert-led courses built for today's fast-changing skills landscape" | "Organizations with LinkedIn Learning see **over 3x growth in AI skills developed** by employees year over year vs organizations that don't." |
| `Personalize learning experiences` | "Grow the right skills, faster with personalization at scale." / "Interactive learning with AI-driven coaching and role-play" | "Learners who engage with AI-powered coaching **spend 25% more time learning**." |
| `Apply real-time skills intelligence` | "Skills change fast - your skill development strategy should too." / "Personalized skill suggestions to inform your talent architecture" | "Employees of organizations that customize roles **spend 20% more time learning**." |
| `Activate career pathways` | "Mobilize talent with intelligent career paths." / "Smart career pathing to support talent mobility and retention" | "Customers who engage with LinkedIn's career development features **come back to learn 5x more often and spend 2x more time learning**." |

Four verbs — `Deliver` · `Personalize` · `Apply` · `Activate` — abbreviated on the product-overview tab strip to exactly those single words (`1. Deliver  2. Personalize  3. Apply  4. Activate`). **A four-verb spine that works as a numbered tab label, a section heading, and a feature-group header simultaneously** is the most disciplined information architecture in this batch. A content designer can reuse the construction directly: pick four verbs, make them the product's narrative, and let them serve every level of the hierarchy.

**The claim-with-comparator pattern** `[observed]` — every pillar stat is stated *against a control group* or a behavioural comparison:

- "**vs organizations that don't**"
- "Learners **who engage with** AI-powered coaching spend 25% more..."
- "Employees of organizations **that customize roles** spend 20% more..."
- "Customers **who engage with** LinkedIn's career development features come back 5x more often..."

Every one of these is a **correlational claim stated correlationally.** None says "LinkedIn Learning makes employees learn 25% more" — each names the sub-population and the behaviour. That is materially more careful than anything in 134 Elevate (`Proven to reduce stress, sharpen focus, and build skills`, unsourced) or 132 Headway (`82% passed vs. only 64%`, uncited). See T10.

**The market-anxiety opener** `[observed]`

> "With **49% of Talent Development leaders reporting a growing AI-driven skills crisis**, companies risk a **stagnant, disengaged workforce**. LinkedIn Learning helps you build the agility to keep pace at scale — **driving a more skilled, engaged, and successful business**."

A stat about the buyer's peers → a named risk → the product as remedy. `skills crisis` and `stagnant, disengaged workforce` are the fear terms; the stat is unattributed on this page (no source note, though a `2026 LinkedIn Talent Report` exists in the nav).

**Plan-card benefit lines characterise the buyer's *situation*, not the buyer** `[observed]`

Compare 133 Blinkist, whose cheap tier is labelled `For casual learners` (a mildly deflating identity). LinkedIn Learning instead uses `Best for:` and describes the organisation's posture:

- LinkedIn Learning → "Organizations looking to develop critical skills at scale and support continuous learning across the workforce."
- Career Hub → "Organizations focused on strategic talent management - connecting learning to careers, talent to internal opportunities and accelerating skill agility."
- For Individuals → `Who it's best for:` "If you are the **only learner** and want comprehensive, high-quality content..."
- For Small Teams → "If you have 20 or less learners that want comprehensive, high-quality content and want access to dashboards..."

**`Best for:` / `Who it's best for:` / `Key Features:` as a repeated three-slot card template** is a clean, reusable plan-card structure: who, why, what. And `If you are the only learner` is a gentler way of saying "individual" than any adjective would be.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| **`Contact sales`** | Nav, hero, every pillar, every section foot, persistent bottom bar — **14+ instances across 4 pages** | The dominant CTA by an order of magnitude. Title-case variant `Contact Sales` also appears on two pages |
| `Contact Sales` | Content-library hero, certifications hero, `Stay ahead of the tech skills revolution` | **Title-case variant of the same label**, on the same site |
| `Contact sales now` | Persistent bottom bar heading | Third form, with urgency adverb |
| `Sign in` | Nav, top right | → `www.linkedin.com/learning-login` (blocked domain) |
| `Post a job` | Nav, far left, **as an unlabelled icon link** | `title="Post a job"` with empty link text — a cross-sell to Talent Solutions, unlabelled visually |
| `Start free trial` | Compare-plans, both self-serve tiers | **The only learner-facing conversion CTA on the entire microsite**, and it points at the blocked domain |
| `Buy for your team` | Certifications page foot | → `linkedin.com/learning/subscription/products?trk=vanity_for_teams` |
| `Learn more` | Home (×3), product overview (×4), compare-plans | **Bare `Learn more`, 7+ instances**, mostly to `/learn/product-overview` — the same destination, so at least it is consistent even if unlabelled |
| `Explore tech content →` | In-demand-skills block | **Arrow-suffixed, object-specific** — the good pattern |
| `Explore AI content →` | In-demand-skills block | |
| `Explore leadership content →` | In-demand-skills block | |
| `Explore certifications →` | In-demand-skills block | |
| `Discover AI Skill Pathways` | AI block | Names the destination artefact |
| `Explore now` | AI Skill Pathways card | Bare, same destination as the above — **two labels, one destination, on one page** |
| `Explore the course` | Sample course cards (×12) | Appended to each course description as the link text |
| `Learn more about our business courses` / `...technology courses` / `...creative courses` | Content-library tabs | Fully specific — the best-written CTAs on the site |
| `Explore the entire LinkedIn Learning Library` | Content-library, after sample cards | → `www.linkedin.com/learning` (blocked) |
| `See more` | Learning Paths list; footer | Progressive disclosure |
| `See all Professional Certificates Partners` | Certifications | Count-implying, fully specific |
| `Explore All Certification Prep Content` | Certifications | |
| `Show all CEU courses` | Certifications | `Show` rather than `Explore` — a fourth verb for the same action type |
| `Become a certificate partner` | Certifications, `Partner with us` | A B2B2B CTA — content partners, not buyers |
| `Compare plans` | Product overview | Lowercase; nav says `Compare Plans` |
| `View more business solutions` | Footer | |
| `dismiss` | Persistent bottom bar | Lowercase, bare |

**Observations.**

**The verb inventory for "go look at content" is `Explore` / `Learn more` / `Discover` / `Show` / `See`** — five verbs for one intent, sometimes on the same page. `Explore now` and `Discover AI Skill Pathways` point at the same AI Skill Pathways destination from adjacent blocks.

**`Contact sales` in three capitalisations** (`Contact sales`, `Contact Sales`, `Contact sales now`) across four pages, for the single most important action on the site.

**Bare `Learn more` 7+ times** — the exact anti-pattern Wise avoids. Mitigated slightly by most instances resolving to one destination, but a screen-reader user tabbing through links hears "Learn more" seven times.

**The best CTAs on the site are the arrow-suffixed specific ones** (`Explore tech content →`) and the fully-qualified ones (`Learn more about our business courses`). Both patterns exist alongside the bare ones, so the house style is inconsistent rather than absent.

**`Explore the course`** as the link text on every sample course card is a notable micro-decision: the card's course *title* is the heading, the description is the body, and `Explore the course` is a separate, consistent affordance label. It avoids making the title itself the only link target, which helps both scanning and screen-reader link lists — though 12 identical `Explore the course` strings on one page is the trade-off.

## T4 Onboarding & getting-started

`[absent]` for the learner; `[observed]` for the buyer.

**There is no learner onboarding copy on the harvested surface** — no how-it-works sequence, no first-run narrative, no quiz, no interest picker, no step-count. The learner-facing product (`www.linkedin.com/learning`) is blocked.

**What exists instead is a buyer-facing `How it works:` section** `[observed]`, on the home page, and it is the four pillars again (T2) rather than a sequence of user actions. Note the colon in the heading (`How it works:`) — it functions as a label for the tab strip that follows, not as a question.

The closest thing to an onboarding claim is the **personalisation chain**, assembled from feature descriptions across pages `[observed]`:

- `AI-powered search & course companion` — "Learners can quickly find content for their unique needs, deepen course comprehension and apply learnings."
- `Personalized learning plans (based on career goal)` — "Tie career goals to personalized plans to help build the skills employees need."
- `AI-powered Learning Plans` — "Personalized plans help build the skills employees need for their next role and career moves."
- `Next Role Explorer (career path exploration tools)` — "Help employees **visualize real, personalized career paths** powered by internal data and LinkedIn insights."
- `Role Guides` — "Help employees gain clarity on **what it takes to succeed in a role** – and how to get there."
- `Trending Skills Insights` — "Maintain your talent architecture by adding the **fastest growing skills** based on LinkedIn insights."

So the *documented* learner journey is: **declare a career goal → get a role guide → get a learning plan → see internal jobs → signal interest to recruiters.** That is an onboarding sequence anchored to a destination role rather than to a subject, and it is the structural answer to the brief's question about professional-identity context. But **every one of these strings is written to the buyer about the employee** ("Help employees...", "help build the skills employees need"), so none of it is the learner-facing copy.

**The `Interested Internal Candidates` mechanic** `[observed]` is the most distinctive thing in the model:

> "Help employees **signal interest** in internal roles and get noticed faster by internal recruiters."
> Compare-plans matrix: "Interested Internal Candidates (employees can indicate interest to internal recruiters)"

A learning platform that surfaces a **declared-interest signal from the learner to their own employer's recruiters** is a genuinely unusual loop: the progress artefact is not a score or a streak but *visibility to a hiring manager*. The content-design implication is significant — it means every progress surface in this product is potentially read by the learner's employer, which is a different privacy and tone context from any other product in this batch. Nothing on the harvested surface addresses that from the learner's side.

**`AI Skill Pathways` — the one named programme with a stated structure** `[observed]`

> "AI-ready organizations require AI-ready talent. **AI Skill Pathways** empowers your workforce with the critical AI skills they need, guided by LinkedIn's unique data and learning expertise and **Microsoft's technological leadership**."
> "AI Skill Pathways from LinkedIn Learning and Microsoft offers **learning paths and credentials** to empower orgs and learners across roles to develop the skills needed to excel in the AI economy."

Note the parent-company invocation (`Microsoft's technological leadership`) used as a credibility asset — the only place the ownership is surfaced as a benefit.

**`Learning Paths` as the multi-course unit** `[observed]`

> "With **Learning Paths**, you can explore broader topics in a structured way, **combining courses and resources** for a richer learning experience."

The definition is short and does two things: names the scope (`broader topics`), and names the composition (`courses and resources`). The list of 17 paths is analysed in T13. **Defect** `[observed]`: this entire block — heading, definition, and 17-item list — is **rendered three times consecutively** in the served HTML of the content-library page, with identical content. A responsive-variant duplication, and a substantial one (three copies of a 17-item list).

## T5 Form & field labels

`[absent]` — **no form of any kind exists on the harvested surface.** No search box, no email capture, no contact form inline (the `Contact sales` CTAs all route to a separate page that was not fetched), no plan-configurator, no seat-count input.

The only interactive-looking elements are the tab strips (`1. Deliver / 2. Personalize / 3. Apply / 4. Activate`; `1. Business / 2. Technology / 3. Creative`; `1. For Businesses / 2. For Individuals & Small Teams`) and the `dismiss` control on the sales bar. Tab labels are captured in T2 and T13.

The learner-facing search — which for a 24,000-course library is the single most important form in the product, and is described in the feature list as `AI-powered search & course companion` — is behind the block. `[absent]`

## T6 Status & state language

**Partly `[absent]` — this is the section most damaged by the block.** Course-progress states, completion states, and enrolment states all live in the learner product.

What the harvested surface names, `[observed]`:

| Concept | Copy | Notes |
|---|---|---|
| Credential held | "**12M LinkedIn members feature a credential on their profile today**" | The terminal state of the learning journey is a **profile attribute**, not an in-product badge — see T10 |
| Credential growth | "**+44% more members featuring** a credential from 2020-2022" | `featuring` as the verb for displaying a credential |
| Skill gap | "Help learners **close skill gaps** confidently with credentials, prep courses, and assessments" · "Keep your talent architecture current and relevant **before gaps appear**" | `gap` is the deficit state, and `before gaps appear` is a predictive framing |
| Currency of credentials | "**Keep employee certifications and licenses current** with online courses that can count towards continuing education units (CEUs)" | A **maintenance** state — credentials expire and must be kept current. No other product in this batch has an expiring artefact |
| Skill currency | "Skills change fast - your skill development strategy should too" · `Trending Skills Insights` — "the **fastest growing skills**" | Skills themselves have a freshness state |
| Engagement | "**5x** more engagement" · "come back to learn **5x more often**" · "spend **2x more time learning**" · "spend **25% more time learning**" | Engagement is the measured state, reported to the buyer |
| Mobility | "**20%** higher internal mobility" | |
| Tenure | "**22%** longer tenure" | |
| Career-goal reporting | "**Reporting on career goals and interests**" (Career Hub feature) | So a learner's declared career goal is a **reportable state visible to their employer** |
| Internal-candidate interest | "employees can **indicate interest** to internal recruiters" | A learner-set state with an external audience |

**The most interesting finding here is that the product's terminal states are all external to the product**: a credential on your LinkedIn profile, a signal to a recruiter, a role you moved into, a tenure you extended. Memrise's terminal state is `Wordlist Completed`; Blinkist's is a streak of consecutive weeks; Elevate's is `Master` at 4,750+ EPQ. **LinkedIn Learning's terminal state is a job.** That is the deepest structural difference between this product and the other four, and it explains why its progress vocabulary is borrowed from HR (`mobility`, `tenure`, `talent architecture`) rather than from gaming or fitness.

**`Certifications, Credentials, and Credits`** `[observed]` — three states in one heading, in ascending granularity: a certification (the achievement), a credential (the displayable artefact), a credit (the unit that maintains it).

**Absent** `[absent]`: in-course progress language (percent complete, resume, watched), enrolment states, assignment/due-date states, completion-certificate copy, expiry warnings, dashboard state labels, admin-report state names. All behind the block.

## T7 Error, failure & recovery

`[absent]` — no error, failure, or recovery copy is reachable. The help centre (`www.linkedin.com/help/learning`) is blocked, so there are no article titles to read as a failure map either.

The only adjacent copy is the **deficit framing** in T6 (`close skill gaps`, `before gaps appear`, `companies risk a stagnant, disengaged workforce`) — organisational failure states used as sales motivation, not user-facing error copy.

Notably, this is the **only product in this batch with no observable failure vocabulary at all.** For the other four, help-article titles supplied a rich recovery corpus (`I was double-charged`, `Why am I losing EPQ?`, `I'm having trouble completing the purchase`, `Why was I charged twice?`). LinkedIn's equivalent exists — `linkedin.com/help/learning` is a large public help centre — and is simply unreachable from this harvest. Recorded as a gap requiring a second pass, not as an absence in the product.

## T8 Empty states

`[absent]` — entirely behind the block. No empty-state copy, no no-results copy, no first-run copy. For a 24,000-item library with AI search, the no-results state would be a high-value artefact and is unharvested.

## T9 Notifications & system messages

Nearly `[absent]`. The harvested surface names two notification-adjacent features `[observed]`:

- **`Internal job boards with recommendations and alerts`** (Career Hub key features) and `Internal job board (including alerts)` (compare-plans matrix) — so **job alerts** are a notification class inside a learning product.
- **`AI-powered Feature Reporting`** — "Understand how learners are engaging with AI-powered features to inform how you promote and customize these tools for your organization." An **admin-facing** reporting surface, not a learner notification.

The `dismiss` control on the persistent `Contact sales now` bar is the only in-page message control observed `[observed]`.

No learner-facing notification, digest, reminder, nudge, or email copy is reachable. Given that the other four products in this batch all documented their reminder mechanics in detail, this is a meaningful gap — and it is worth noting that LinkedIn Learning's engagement claims (`5x more engagement`, `come back to learn 5x more often`) imply a substantial notification apparatus whose copy is entirely unobserved.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** No consumer-subscription cancellation copy was reachable (the self-serve tiers' terms live on the blocked domain), so this section covers what *is* observable: **claim substantiation and credential framing**, which is where this product's disclosure burden actually sits.

### Part A — Claim substantiation: the best-hedged efficacy copy in this batch

**Recorded factually from the pages.**

**Every outcome claim on this microsite is stated with a comparator, a named sub-population, or a cited source.** That is not true of any other product in this batch. The inventory:

| Claim | Hedge / comparator | Source |
|---|---|---|
| "**5x** more engagement" · "**3.4x** faster AI skill growth" · "**20%** higher internal mobility" · "**22%** longer tenure" | Framed under the header **`Organizations using LinkedIn Learning see:`** — attributed to a population, not asserted as causation | None stated |
| "Organizations with LinkedIn Learning see over **3x growth in AI skills developed** by employees year over year **vs organizations that don't**" | **Explicit control group** | None stated |
| "Learners **who engage with** AI-powered coaching **spend 25% more time learning**" | **Named behavioural sub-population**; outcome is time-on-task, not ability | None stated |
| "Employees of organizations **that customize roles** spend **20% more time learning**" | Named organisational-behaviour sub-population | None stated |
| "Customers **who engage with** LinkedIn's career development features **come back to learn 5x more often and spend 2x more time learning**" | Named sub-population; two outcomes, both behavioural | None stated |
| "LinkedIn Learning customers experience a **695% return on investment after three years.***" | Asterisked | **`* Source: IDC White Paper, 2024`** — a **named third-party analyst house and year** |
| "**49% of Talent Development leaders** reporting a growing AI-driven skills crisis" | Population named | None stated on page (a `2026 LinkedIn Talent Report` exists in nav) |
| "**12M LinkedIn members** feature a credential on their profile today" | First-party platform data, verifiable in principle | Implicitly LinkedIn's own data |
| "**+44% more members featuring** a credential **from 2020-2022**" | **Date-bounded** | Implicitly LinkedIn's own data |
| "**Over 2k courses** to prep for over 120 different exams available for 4 different credential types" | Counted, specific | — |

**Assessment.** Two things distinguish this from 134 Elevate and 132 Headway:

1. **The outcomes claimed are behavioural and organisational, not cognitive.** `time learning`, `engagement`, `return visits`, `internal mobility`, `tenure`, `ROI`. Not one claim asserts that a learner became more capable, smarter, or better at their job. `3.4x faster AI skill growth` is the closest, and even that is framed as *skills developed* (a count of learning activity) rather than as demonstrated competence. **A learning product that declines to claim learning outcomes** is doing something deliberate, and it is the safest claim architecture in the batch.
2. **The one claim with a hard financial figure is the one with a named source.** `695% return on investment` → `* Source: IDC White Paper, 2024`. The asterisk-and-source-note construction is applied precisely where the claim is most quantified and most consequential to a purchase decision. Compare Elevate's `90% of Elevate users improved their vocabulary` with no footnote at all, and Headway's `82% passed vs. only 64%` with no citation.

**Where it is weaker, recorded honestly:**

- **The four home-page stats (`5x` / `3.4x` / `20%` / `22%`) carry no source note.** They sit under `Organizations using LinkedIn Learning see:` which is a correlational frame, but four unsourced multipliers in a stat band is still four unsourced multipliers.
- **`The only career development platform that's powered by...`** — an **exclusivity claim** (`the only`), unqualified and unsourced. It is narrowly constructed (the qualifier is the specific data combination, which is plausibly unique) but `the only` is the boldest unhedged word on the site.
- **`the world's most dynamic talent network`** and **`The world's largest collection of content, covering tools and skills for creative, design, and engineering professionals`** — two superlatives, one scoped (`creative, design, and engineering`), one not.
- **`We vet every instructor to ensure you're learning real-world skills from the very best`** — a process claim (`we vet every instructor`) supporting a quality claim (`the very best`), with three named instructors as the proof (`Seth Godin`, `Daniel Pink`, `Tsu-Jae Liu`). Naming individuals is stronger evidence than an adjective, and the three names span business, writing, and engineering, which supports the breadth claim implicitly.
- **`49%` of Talent Development leaders** is presented without a source on the page it appears on, though the nav offers a `2026 LinkedIn Talent Report`. A link from the stat to the report would close the loop and does not exist.

### Part B — Course-count inconsistency

**The most conspicuous defect in this file.** `[observed]` The library size is stated **seven different ways across four pages**:

| Figure | Location |
|---|---|
| `24,000+ expert-led courses` | Home, `Deliver trusted expertise` pillar |
| `24,000+ curated courses` | Home and product-overview, LinkedIn Learning plan card |
| `24,000+ courses` | Compare-plans, `For Individuals` — "comprehensive, high-quality content with over 24,000 courses from industry experts" |
| **`22,000+ expert-led courses`** | Compare-plans, `For Individuals` **key features** — "Unlimited access to 22,000+ expert-led courses for you" |
| **`22,000+ expert-led courses`** | Compare-plans, `For Small Teams` key features |
| **`25,000+ courses`** | Compare-plans, feature matrix — "25,000+ courses globally accessible in 7 native languages & 46 via subtitles" |
| **`over 25K courses`** | Product overview, `Best-in-Class Learning Library` — "Includes over 25K courses taught by experts in various formats in over 46+ languages" |
| **`over 16,000 online courses`** | Content-library page **`og:description`** — "Over 16,000 online courses taught by industry experts." |
| `over 24,000 courses and certifications` | Content-library H1 subhead — "Build skills with over 24,000 courses and certifications" |

**Nine statements, five distinct figures: 16,000 / 22,000 / 24,000 / 25,000 / 25K.** And the `For Individuals` card on the compare-plans page manages to say **both `24,000` and `22,000` within the same card** — the `Who it's best for` paragraph says 24,000, the `Key Features` bullet immediately below says 22,000.

The language count is equally unstable: `7 native languages & 46 via subtitles` (matrix) versus `over 46+ languages` (product overview) versus `25 languages` (home page: "expert-led, up-to-date learning content across 25 languages"). **Three different language counts**, and `over 46+` is doubly redundant.

For an enterprise product where catalogue size and localisation breadth are primary purchase criteria and appear in RFPs, a five-way swing on course count within one microsite is a material content-governance failure. It is the same class of defect as Headway's `1,700+` vs `2,500+` and Blinkist's `31M` / `32M` / `44M`, but larger in spread and worse in context (B2B procurement rather than consumer browsing).

### Part C — Certificate-of-completion framing

**PRIORITY for this product.** This is the strongest and most carefully constructed part of LinkedIn Learning's disclosure copy, and the direct contrast with the rest of the batch.

**The framing decision: credentials derive their value from third parties, not from LinkedIn.** `[observed]`

> `Certifications and Credentials`
> "**Close skill gaps confidently** with a variety of credential content on LinkedIn Learning."
> "Enables learners to earn credentials for in-demand skills with courses and assessment options **across 3 credential types**"

**Three named credential types, each defined by who validates it:**

| Type | Definition (verbatim) | Validating party |
|---|---|---|
| `Professional Certificates` | "Enable your org to learn, assess, and prove new skills all on the same platform. Confidently close in-demand skills gaps with Professional Certificates on LinkedIn Learning, featuring courses and assessments **offered in partnership with leading and trusted certificate providers.**" | Named partners: Microsoft, GitHub, Adobe, ServiceNow, Atlassian, **American Nurses Association**, Docker, Snowflake |
| `Certification Preparation` | "**Prepare employees for certification exams** with courses and practice exams taught by experts in their fields." | CompTIA, Microsoft, Atlassian University, ISC2, Cisco, AWS — **the exam is theirs, not LinkedIn's** |
| `Continuing Education` | "**Keep employee certifications and licenses current** with online courses that can count towards continuing education units (CEUs) at partners like **NASBA (National Association of State Boards of Accountancy), PMI (Project Management Institute)**, and more." | Accrediting bodies, **spelled out in full on first use** |

Three observations, all reusable.

**1. The verb for preparation is `prep`, never `certify`.** `Certification Preparation`, `certification prep`, `practice exams`, `prep courses`, `hands-on practice prep`. LinkedIn Learning consistently positions itself as the **preparation layer**, and the certification as something conferred elsewhere. "Prepare employees **for** certification exams" — the preposition is doing the compliance work. A product that could easily have implied it issues certifications instead names, six times across two pages, that it prepares you for someone else's.

**2. CEU language is precise and the accrediting bodies are expanded.** "courses that **can count towards** continuing education units (CEUs) at partners like NASBA (National Association of State Boards of Accountancy), PMI (Project Management Institute)". `can count towards` is a permission claim, not a guarantee — the hedge is exactly right, because CEU acceptance is determined by the accrediting body and by jurisdiction, not by the content provider. And expanding the acronyms on first use is correct practice for a document a compliance officer may read.

**3. The credential's value is stated as profile display, with numbers.** "**12M LinkedIn members feature a credential on their profile today**" and "**+44% more members featuring a credential from 2020-2022**". The proof that a certificate is worth earning is **how many people display it on the platform where employers look** — which only LinkedIn can say, and which converts the certificate from a completion artefact into a labour-market signal.

**Contrast with the rest of the batch.** Memrise answers the same question with a flat refusal and a joke: "We do not offer certificates for learning with us. However, we're sure that the locals actually understanding you is all the street cred you'll need!" Headway, Blinkist, and Elevate offer no completion credential at all. **LinkedIn Learning is the only product in this batch where the credential is a first-class, third-party-validated, profile-displayed artefact — and the only one whose entire value proposition depends on an external labour market recognising it.** The care in the copy follows directly from that dependency.

**The B2B2B layer** `[observed]`:

> `Partner with us`
> "**Host or build your own certificate** on LinkedIn Learning, leveraging our content partnership and robust assessment tools — so you can **broaden the reach of your content to the world's largest talent marketplace.**"
> CTA: `Become a certificate partner`

So the certificate programme is also a **platform play**: third parties bring their credential, LinkedIn brings distribution. This is why the credential copy is so careful — the partners' accreditation reputations are the asset being borrowed, and overclaiming would damage the supply side as well as the demand side.

### Part D — Pricing and subscription disclosure

**No price appears anywhere on the harvested surface.** `[observed]` The enterprise SKUs have no price by design (`Contact sales`). The self-serve tiers (`For Individuals`, `For Small Teams`) show `Start free trial` but **no price, no trial length, no renewal terms, and no cancellation copy** — all of which live on `www.linkedin.com/learning/subscription/products`, on the blocked domain.

What is disclosed `[observed]`:

- **Seat scope, precisely**: `For Individuals` = "1 learning account"; `For Small Teams` = "Up to 20 learning accounts", with the eligibility restated in prose ("If you have 20 or less learners...").
- **A language-availability limitation on a specific SKU**: "Career Hub is available in English, Spanish, German, Japanese and French" — five languages, named, on the page where Career Hub is sold. A capability bound stated at the point of consideration rather than in a footnote.
- **Feature-matrix differentiation** between `LinkedIn Learning` and `LinkedIn Learning Career Hub`, with `Flagship Product` labelling the former.

**`Flagship Product`** is an odd label in a two-product comparison — it tells the buyer which one the vendor prefers to sell, not which one fits. And note the comparison matrix lists Career Hub features (`Next Role Explorer`, `Internal job board`, `AI-powered Learning Plans`, `Intelligent Talent Architecture Customization`) in a column structure that the served HTML flattens into an unlabelled list, so which features belong to which SKU is **not determinable from the text alone** — a real accessibility and comprehension defect on the single page whose job is comparison (see T14).

**Defect** `[observed]`: both self-serve tiers' `Start free trial` links carry `?product=teams` — including the `For Individuals` tier. An individual clicking "start free trial" is sent to a teams product URL.

**Trial length, renewal terms, auto-renewal disclosure, and cancellation instructions: `[absent]`** — not reachable. No claim about them is made in this file.

## T11 Help-centre architecture

`[absent] / blocked.` `www.linkedin.com/help/learning` returned an empty body. The microsite advertises it twice (`Support` in the `Resources` nav group, and `Customer Success Center` as a separate item) but neither was reachable for the help centre proper.

What the nav reveals about the **support IA's shape**, `[observed]`:

| Support-adjacent nav item | Destination | Audience |
|---|---|---|
| `Support` | `www.linkedin.com/help/learning` (blocked) | Presumably both |
| `Customer Success Center` | `business.linkedin.com/learn/customer-success-center` (not fetched) | Buyer / admin |
| `Learning Resources` | `business.linkedin.com/learn/resources` (not fetched) | Buyer |
| `Integration Partners` | `business.linkedin.com/learn/partners` (not fetched) | Buyer / IT |
| `Customer Stories` | `business.linkedin.com/learn/elearning-case-studies` (not fetched) | Buyer |
| `Blog` / `Learning Blog` | Two different blog destinations in nav and footer | Buyer |

**A two-track support model is visible in the IA even without the content**: `Support` (product help, on the main domain, learner-oriented) versus `Customer Success Center` (account management, on the microsite, buyer-oriented). Separating the two is correct for a product with a purchaser who is not the user — the admin needs adoption reporting and rollout guidance, the learner needs "how do I resume a course". Most of the other products in this batch have one help centre serving one audience.

**Recorded as a gap requiring a second pass**, not as an absence. LinkedIn operates a large public help centre and the article-title grammar there would be the single most valuable unharvested artefact for this product.

## T12 FAQs

`[absent]` — **no FAQ block appears on any of the four harvested pages.** No embedded accordion, no `Frequently asked questions` heading, no objection-handling Q&A.

This is consistent with the surface being enterprise sales copy: objections are handled by a salesperson, not by a page. The `Contact sales` CTA appearing 14+ times is the FAQ's functional replacement.

Compare the rest of the batch: Memrise ships three FAQ blocks, Headway four (~55 questions), Blinkist two, Elevate none. LinkedIn Learning joins Elevate in shipping none — but for the opposite reason. Elevate has no FAQ because conversion happens on the App Store; LinkedIn Learning has none because conversion happens in a sales conversation. **Both end up publishing no public answer to "will this work for me?"**, and in both cases the absence is a strategy rather than an oversight.

Whether the learner-facing surface or the blocked help centre carries an FAQ is unknown.

## T13 Terminology & glossary

**PRIORITY SECTION.** LinkedIn Learning's coinages come from **HR and talent management**, not from education, gaming, or fitness. That is the defining lexical fact about the product and the clearest differentiator in this batch.

| Term | LinkedIn Learning's usage | The alternative it rejected / note |
|---|---|---|
| **`talent architecture`** | The central coined term. "Intelligent talent architecture customization including insights on trending skills"; "Build, maintain, and activate your organization's talent architecture at scale"; "Keep your talent architecture current and relevant before gaps appear"; "Reflect your existing talent architecture & maintain with real-time insights"; "top B2B leaders are rethinking talent architecture" | `skills taxonomy`, `competency framework`, `job architecture`. **`architecture` implies a designed structure you own and maintain**, which is exactly the thing being sold (and the thing that requires an HRIS integration). Used 5+ times across two pages — the most-repeated coinage on the site |
| **`Career Hub`** | The premium SKU: "Give your organization the tools to build skills agility and mobilize talent where it's needed most" | `Career Portal`, `Talent Marketplace`. `Hub` implies a destination rather than a tool |
| **`Next Role Explorer`** | "career path exploration tools"; "Help employees **visualize real, personalized career paths** powered by internal data and LinkedIn insights" | `Career Pathing`, `Job Explorer`. **`Next Role`** is the strongest naming decision on the site: it scopes ambition to one step rather than to a whole career, which is both more actionable and less over-promising |
| **`Role Guides`** | "Help employees gain clarity on **what it takes to succeed in a role** – and how to get there" | `Job profiles`, `Competency maps` |
| **`Interested Internal Candidates`** | "employees can indicate interest to internal recruiters"; "Help employees **signal interest** in internal roles and get noticed faster" | `Internal applicants`, `Talent pool`. A three-word noun phrase naming a *state a person is in*, used as a feature name — clumsy as a label, precise as a concept |
| **`Learning Paths`** | "explore broader topics in a structured way, **combining courses and resources**" | `Curricula`, `Tracks`, `Programs`, `Playlists`. The most conventional coinage here, and the only content-unit term |
| **`AI Skill Pathways`** | The Microsoft-partnered AI programme: "learning paths and credentials to empower orgs and learners across roles" | **Note `Pathways` vs `Paths`** — two closely-related coined terms one letter apart, for a programme *made of* the other thing. `AI Skill Pathways` contains `Learning Paths`, and the names do not signal the containment |
| **`skills agility`** / **`skill agility`** | "build skills agility and mobilize talent"; "accelerating skill agility" | **Two forms, singular and plural, in adjacent paragraphs on the same page** |
| **`Trending Skills Insights`** | "Maintain your talent architecture by adding the fastest growing skills based on LinkedIn insights"; "understand fastest-growing skills and compare to gaps in your org" | `Skills forecasting`, `Market intelligence` |
| **`skills intelligence`** | Pillar 3: `Apply real-time skills intelligence` | Borrowed from `business intelligence` |
| **`internal mobility`** / **`talent mobility`** | "20% higher internal mobility"; "Smart career pathing to support talent mobility and retention" | Two forms for one concept; both are standard HR terms rather than coinages |
| **`upskilling`** / **`reskilling`** | `AI Upskilling`, and the URL path `/resources/upskilling-and-reskilling/` | Category-standard, not coined, but note **`reskilling` appears only in a URL slug** and never in visible copy |
| **`AI-powered Coaching`** / **`AI-driven coaching`** / **`AI-powered coaching`** | "Role play practice with AI-powered Coaching"; "Interactive learning with AI-driven coaching and role-play"; "Learners who engage with AI-powered coaching" | **Three capitalisation/hyphenation variants of one feature name** |
| **`Role play practice`** / **`role-play`** / **`immersive role-play experiences`** | "An interactive space to practice and build confidence for **challenging conversations** with real-time feedback" | **Three forms.** `challenging conversations` is a good euphemism-free-but-gentle phrase for the use case |
| **`AI-powered search & course companion`** | "Learners can quickly find content for their unique needs, deepen course comprehension and apply learnings" | **`course companion`** is the interesting half — a coined name for an in-course assistant, and a warmer noun than "assistant" or "tutor" |
| **`AI-assisted Content Curation`** | "Admins can find the right content, faster with seamless search and quick click curation" | Note **`quick click curation`** — an unhyphenated triple-word compound that reads as a typo for "quick-click" |
| **`AI-powered Learning Plans`** / **`Personalized learning plans`** / **`personalized plans`** / **`AI-powered development plans`** | The learner's curriculum artefact | **Four names for one artefact** — the same defect as Headway's five names for its plan (132 T13). Apparently endemic: the personalised-curriculum object is the hardest thing in edtech to name once |
| **`Hands-on Practice`** | "Build real-world skills through multiple methods of hands-on practice like **sandboxes, labs and project-based courses**"; elsewhere "hands-on practice with **GitHub Codespaces and Models, Code Challenges & project courses**" | Three named sub-modalities in one list, and `GitHub Codespaces` invoked as a parent-company capability |
| **`nano learning`** | A content format, listed twice: "audio, text, office hours, nano learning" and "text, audio, nano learning" | **Never defined anywhere on the site.** The category's other products say `microlearning` (Headway markets it as a whole page) or `bite-sized`. `nano learning` is smaller-than-micro, undefined, and appears only inside format lists |
| **`office hours`** | A content format, listed once alongside audio, text, and nano learning | Borrowed from academia; undefined here. Presumably live sessions |
| **`Credible Credentials`** | A feature-block heading: "Prove in-demand skills with Professional Certificates, certification prep, and CEUs from hundreds of trusted providers" | Alliterative, and `Credible` is doing the hedging that `Certified` would not allow |
| **`Professional Certificates`** / **`Certification Preparation`** / **`Continuing Education`** | The three credential types | Capitalised as proper nouns; see T10 Part C |
| **`CEUs`** | "continuing education units (CEUs)" — expanded on first use, with accrediting bodies also expanded | Correct practice |
| **`Learning`** (as a division name) | The wordmark: `LinkedIn logo | Learning` | A gerund as a product name, matching `Recruiter`, `Sales Navigator`, `Talent Solutions` — LinkedIn's house convention is agent-noun or activity-noun |
| **`talent network`** / **`talent marketplace`** | "the world's most dynamic talent network"; "the world's largest talent marketplace" | Two different metaphors for the same asset on two pages — a `network` (relational) versus a `marketplace` (transactional) |
| `learners` / `employees` / `talent` / `your people` / `every professional` / `your workforce` | The human being being trained | **Six terms**, chosen by context: `learners` when discussing the product, `employees` when discussing the buyer's org, `talent` when discussing mobility, `your people` in warm headlines, `your workforce` in risk framing. This one is defensible — the register shifts deliberately — but it means no single term is the product's name for its user |

**Register and system analysis.**

LinkedIn Learning's lexicon is **borrowed from HR, not coined from scratch**: `talent architecture`, `internal mobility`, `skills agility`, `talent marketplace`, `upskilling`, `skills intelligence`, `HRIS`, `LMS/LXP`. Only two terms are genuinely proprietary coinages — **`Next Role Explorer`** and **`Career Hub`** — and both name *destinations* rather than mechanics.

That is the opposite of every other product in this batch. Memrise coins domestic possessives (`My Words`, `Pronunciation Buddy`). Blinkist coins short concrete nouns (`Blink`, `Guides`, `Spaces`). Elevate coins across three incompatible registers (`Elevate Proficiency Quotient`, `workout`, `Bronze`→`Diamond`). LinkedIn Learning mostly **doesn't coin at all** — it speaks the buyer's existing professional vocabulary back to them.

**The strategic reason is legible**: the buyer is an L&D or HR leader who already uses these words in board decks. Speaking `talent architecture` and `internal mobility` signals category fluency to a procurement audience in a way that a coined term would not. The cost is that the *learner-facing* lexicon is invisible from this surface — there is no equivalent of `Blink` or `blink`-as-a-verb, nothing a learner would say to a colleague.

**The `Paths` / `Pathways` collision** is the notable naming failure: `Learning Paths` (the content unit) and `AI Skill Pathways` (a programme composed of learning paths) differ by three letters and do not signal their relationship. Combined with four names for the personalised plan and three capitalisations of AI coaching, the pattern is clear: **the AI-era features are the least consistently named**, exactly as in Blinkist (`Blinkist AI` / `Blinkist AI Assistant`) and Headway.

### Course discovery vocabulary

**PRIORITY for this product.** The discovery taxonomy, as harvested `[observed]`:

**Top level — three buckets.** `Business` · `Technology` · `Creative`

Each with a one-sentence scope line, and the grammar differs by bucket:

| Bucket | Scope line (verbatim) |
|---|---|
| `Business` | "**Your curated guide to professional success**: learn to manage projects, boost productivity with tech, and lead effectively across roles and career milestones." |
| `Technology` | "**Deep coverage of the platforms, applications, and programming languages** that are driving economic growth around the globe." |
| `Creative` | "**The world's largest collection of content**, covering tools and skills for creative, design, and engineering professionals, covering a diverse range of topics." |

Note that `Business` is framed as a *guide to an outcome* (professional success), `Technology` as *coverage of objects* (platforms, applications, languages), and `Creative` as a *superlative about scale*. Three buckets, three rhetorical strategies — inconsistent, but arguably matched to how each audience shops.

The `Creative` line also has a **doubled word**: "covering tools and skills for creative, design, and engineering professionals, **covering** a diverse range of topics." A live copy defect, and `engineering professionals` under `Creative` is a taxonomy oddity inherited from the Lynda.com CAD/engineering catalogue.

**Skill-demand axis — four `in-demand skills` categories**, cutting across the three content buckets `[observed]`:

`Technology` · `AI-readiness` · `Leadership` · `Certifications`

Under the header "LinkedIn Learning is designed to build the most in-demand skills for every professional." So `Technology` appears in **both** taxonomies with different sibling sets — once as a content bucket (vs Business, Creative) and once as a skill-demand category (vs AI-readiness, Leadership, Certifications). Two taxonomies sharing a node name.

**`Learning Paths` — 17 named paths, and the list is the artefact** `[observed]`:

`Career Management` · `Data Analysis` · `Generative AI` · `Artificial Intelligence` · `Hiring & Interviewing` · `Electronics` · `Communication` · `Job Search` · `Construction Management` · `Job Searching` · `Spreadsheets` · `AI Productivity Tools` · `Leadership Skills` · `AI for Design` · `Electrical Engineering` · `Microcontrollers` · `Project Management`

Three findings in this list:

1. **`Job Search` and `Job Searching` both appear** — two paths, one concept, adjacent in the same list. A straightforward duplication defect.
2. **`Generative AI` and `Artificial Intelligence` both appear**, as do `AI Productivity Tools` and `AI for Design` — **four AI-adjacent paths** out of 17, with no stated hierarchy between the general (`Artificial Intelligence`) and the specific (`Generative AI`, `AI for Design`).
3. **The range is extraordinary**: `Microcontrollers` and `Electrical Engineering` sit beside `Communication` and `Career Management`. `Construction Management` beside `Spreadsheets`. This is a list assembled by demand signal, not by editorial design, and it shows.

`Career Management` and `Job Search`/`Job Searching` as first-class learning paths is worth isolating: **the platform teaches you how to leave**, and sells that capability to the employer who is paying. The `Activate career pathways` pillar resolves the tension by reframing job-seeking as *internal* mobility ("Empower employees to explore career possibilities... and connect to new opportunities"), and the `22% longer tenure` stat is the argument that teaching mobility retains people. That is a genuinely clever positioning of an obvious conflict, and it is entirely carried by copy.

**Course-title grammar — four shapes** `[observed]`, from the 12 sample cards:

| Shape | Examples |
|---|---|
| `<Tool>: <Scope>` | `Excel: Advanced Formulas and Functions` |
| `<Gerund> with <Quality>` | `Communicating with Confidence` |
| `<Domain> Foundations` / `<Tool> Essential Training` | `Project Management Foundations` · `Photoshop 2025 Essential Training` · `Illustrator 2024 Essential Training` |
| `How to <Verb> ...` / `<Topic>: <Audience>` | `How to Boost Your Productivity with AI Tools` · `The New AI Tech Stack: AI literacy for Tech Leaders` · `Complete Guide to AI and Data Science for SQL` · `Advanced Python Projects: Build AI Applications` · `SQL Hands-On Practice: Solve Business Problems` · `Advanced QGIS Analysis with AI and Machine Learning` · `Generative AI Skills for Creative Content` |

Two conventions are clearly institutional: **`Essential Training`** (with a year for versioned software — `Photoshop 2025`, `Illustrator 2024`) and **`Foundations`**. Both are inherited Lynda.com conventions and both are doing real work: `Essential Training` signals comprehensiveness-without-advancement, `Foundations` signals entry level, and the **year in the title is a freshness signal for tool-version-sensitive content** — a small but excellent decision for a catalogue where a 2019 Photoshop course is worse than useless.

The colon-suffix pattern (`SQL Hands-On Practice: Solve Business Problems`, `The New AI Tech Stack: AI literacy for Tech Leaders`) puts the **outcome or audience after the colon**, so the title is scannable as topic-then-promise. `AI literacy for Tech Leaders` is lowercase-`l` `literacy` against the title-cased rest — a capitalisation inconsistency inside one title.

**Course descriptions are one sentence, verb-first, and enumerate scope** `[observed]`:

> "Learn a wide range of advanced Excel formulas and functions, **including XLOOKUP, dynamic arrays, and statistical functions.**"
> "Build confidence in communication by learning foundational skills, managing your message, mastering vocal and body language, and handling nervousness."
> "Understand the fundamentals of project management, including how to establish goals, build plans, manage resources, meet deadlines, and close projects, **with insights into both traditional and agile methodologies.**"
> "Practice advanced SQL techniques like **CTEs, CASE, UNION, self joins, and window functions**, with hands-on coding exercises and real-time feedback."

The house pattern is: **imperative verb + object + `including`/`like` + a named-specifics list.** The named specifics are the trust device — `XLOOKUP`, `CTEs`, `window functions`, `GitHub Codespaces` — because a buyer or learner who knows the domain can verify the course covers what they need from the description alone. No adjectives, no "comprehensive", no "master". This is the best-disciplined body-copy pattern in the corpus and is directly transferable to any catalogue of technical content.

## T14 Voice, tone & accessibility

**Person and tense.** Second person addressed to **the buyer** throughout (`your people`, `your employees`, `your organization`, `your workforce`, `your talent architecture`, `your tech stack`). The learner is third person (`learners`, `employees`, `talent`). First-person plural for the company is rare and appears mostly in process claims ("**We vet every instructor**"). Present and future tense; imperative in headings (`Grow your people`, `Jumpstart AI upskilling`, `Prove in-demand skills`).

**The pronoun structure is the single most important voice observation**: this corpus never says "you" to a learner. Every warm, aspirational sentence is addressed to someone buying on a learner's behalf. "Empower employees to explore career possibilities, get personalized guidance to reach their goals, and connect to new opportunities" — the empowerment is a capability sold to an employer.

**Register — enterprise-confident, noun-heavy, low on warmth** `[observed]`

- **Compound-noun density is high**: `intelligent talent architecture customization`, `real-time skills intelligence`, `AI-powered feature reporting`, `HRIS talent architecture integrations`, `LMS and LXP content and reporting integrations`. `Intelligent Talent Architecture Customization via CSV or HRIS Integration` is a nine-word feature name containing three acronyms.
- **Acronyms used without expansion**: `LMS`, `LXP`, `HRIS`, `CSV`, `CEUs` (expanded once, correctly), `B2B`, `CPO`. Defensible for an HR-buyer audience; `LXP` in particular is jargon even within HR.
- **Almost no contractions** (`that's`, `can't`, `you're` appear; most sentences avoid them), **no exclamation marks anywhere**, no emoji, no colloquialism. Compared to Memrise ("keep your brain *buzzing*") and Elevate ("reach the top!"), this is a flat, formal voice throughout.
- **Where warmth appears, it is in headlines only**: `Grow your people for what's next`, `Career paths are no longer straight lines`, `unlock what's next`. Body copy immediately returns to compound nouns.
- **One quoted customer voice**, attributed with name, title, and company: "LinkedIn Learning connects personal aspirations with business goals, driving growth for success and impact." — **Nirit Peled Muntz, CPO at HiBob**. And a second: "Our employees are looking for more detail on career paths at our organization, and LinkedIn Learning Career Hub allows us to bring it to them." — **Bree Sykes, Senior Learning and Organizational Development Business Partner, TripAdvisor**. Full attribution with role and employer is the correct B2B practice and is better than Blinkist's segment-labelled anonymous quotes.

**The tone does not modulate by stakes** — there is no gradient because there is no adverse copy on this surface. No pricing disclosure, no cancellation terms, no error states, no limitations. The one bound stated (`Career Hub is available in English, Spanish, German, Japanese and French`) is in the same flat register as everything else.

**Numbers as trust devices — dense, and mostly unsourced** `[observed]`: `1 billion` members/professionals (used twice) · `24,000+` / `22,000+` / `25,000+` / `25K` / `16,000` courses · `25` / `7` / `46` / `46+` languages · `12M` members with credentials · `+44%` credential growth · `2k` courses / `120` exams / `4` credential types / `3` credential types *(**3 vs 4 credential types on the same page** — the section header says "across 3 credential types", the stat block says "4 different credential types")* · `5x` / `3.4x` / `20%` / `22%` / `25%` / `2x` · `695%` ROI (**sourced: IDC 2024**) · `49%` of TD leaders · `20` seats · `1` learning account.

**One sourced number out of roughly twenty.** And two of the counts contradict themselves within a single page (`3` vs `4` credential types; `24,000` vs `22,000` courses in one card).

**Accessibility — the section most damaged by the block, and the one with the clearest observable defects** `[observed]`

- **The `Accessibility` footer link is present on every page** — correct IA, and better than Elevate's compound `Privacy Policy & Accessibility` label. **Its destination (`www.linkedin.com/accessibility`) was unreachable**, as were `www.linkedin.com/legal/accessibility`, `accessibility.linkedin.com`, and `about.linkedin.com/accessibility`. The brief anticipated a substantial statement; **it could not be harvested and nothing is asserted about its contents.** `[absent]`
- **No `Skip to content` link** in the served HTML of any of the four microsite pages. `[absent]`
- **Alt text is genuinely strong on illustrations**, and descriptive in a way that conveys the *scene*:
  - `illustration of a person working on a laptop at a table.` (with a terminal full stop and five leading spaces in the attribute)
  - `Illustration of an individual sitting on a couch using their laptop with the LinkedIn Learning platform on the side.`
  - `Illustration of an individual working on their laptop and two documents each with a certification badge.`
  - `illustration of two people working at a table and discussing a white board`
  - `An individual smiling and sitting down with a notepad and laptop.`
  - `photo of a person checking themself in a mirror` · `photo of a person working on a laptop in the park` · `photo of a person walking down the street`
  - `Professional headshot of Nirit Peled Muntz`
  - `UI animation of LinkedIn delivering a trusted expertise` *(grammatically broken — "a trusted expertise")*, `UI animation of LinkedIn personalizing learning experiences`, `UI animation of LinkedIn applying real-time skills intelligence`, `UI animation of LinkedIn activating career pathways`
  - `mosaic of industry leaders and instructors`
  - `graph showing a 695% increase ` *(trailing space; and note it says `increase` where the claim is `return on investment`)*
- **Serious alt-text failures on the stat graphics.** The four pillar statistics are delivered as **images whose alt text is the number alone**: `three times`, `25%`, `20%`, `five times`, `12 million`, `44%`, `2 thousand `. A screen-reader user hears "three times" with no indication of what is three times what — the surrounding text does supply it in most cases, so this is degraded rather than lost, but `2 thousand ` (with a trailing space) as the alt for a stat graphic is uninformative by itself. The `One Billion` SVG alt is likewise a bare quantity.
- **Brand trust claims delivered as single composite images** — the same defect as Blinkist:
  - `Logos of Levi's, Lego, Kelloggs's, HP, EllieMae, Estee Lauder, Autodesk, and Siemens.` — **eight brand claims in one alt string**, and note the typo `Kelloggs's`
  - `company logos for Microsoft, Atlassian, Cisco, AWS, ISC2, and CompTIA` — six certification-partner claims in one image
  - The home page's customer logos are individual images with individual alts (`Autodesk logo`, `Kellogg's logo`, `Lego logo`, `Levi's logo`, `Siemens logo`, `Tripadvisor logo`) — **so the same claim is handled correctly on one page and as a composite on another.**
- **The Professional Certificates partner logos are links with brand names as link text — and three of them are wrong** `[observed]`: the list renders as `Microsoft` → `/topics/microsoft-18674489`, `Microsoft` → `/topics/github-22825882`, `Microsoft` → `/topics/adobe-20300786`. **Three consecutive links labelled `Microsoft` pointing at Microsoft, GitHub, and Adobe topic pages.** A screen-reader user encounters three identical `Microsoft` links leading to three different vendors. Meanwhile the remaining partners are labelled `servicenow logo`, `Atlassian logo`, `American Nurses Association Logo`, `docker logo`, `snowflake logo` — i.e. **link text that is an image description (`... logo`) rather than a destination name**, with inconsistent capitalisation (`servicenow` / `Atlassian` / `Logo` / `logo`).
- **Severe DOM duplication.** Content is repeated in the served HTML, apparently as responsive variants:
  - The `Learning Paths` heading, definition, and full 17-item list appear **three times consecutively** on the content-library page.
  - "The skill development platform trusted by enterprise organizations worldwide" appears **six times** (three pairs), each followed by the same logo image.
  - The `Contact sales now` bar and its body copy appear **twice**.
  - Several hero images and illustration assets appear twice (before and after their heading).
  - Every pillar's video and icon on the product-overview page appears twice.
  This is the same class of defect flagged as *suspected* in the Wise exemplar; here it is **confirmed and extensive**, and a screen-reader user would encounter the Learning Paths list three times.
- **The compare-plans feature matrix flattens to an unlabelled list.** In the served text, the two-column comparison (`LinkedIn Learning` | `LinkedIn Learning Career Hub`) is followed by ~16 feature rows rendered as bare sentences with **no indication of which SKU each belongs to** — e.g. `AI-powered search & course companion`, `Next Role Explorer (career path exploration tools)`, `Internal job board (including alerts)`. The comparison is conveyed by visual column position only. On the one page whose entire purpose is comparison, **the comparison is not available to anyone reading the text linearly.** This is the most consequential accessibility defect found.
- **`Post a job`** in the nav is an **empty-text link with only a `title` attribute** — an unlabelled icon link, first in the nav order.
- **Vidyard-hosted videos with no captions or transcripts** in the served markup: five `play.vidyard.com` embeds across the home and product-overview pages, none with a `<track>`, transcript link, or description. Recorded as suspected-uncaptioned rather than confirmed, since the player may supply captions client-side. Worth noting given the product *is* video.
- **Long runs of `&nbsp;`-only and whitespace-only content blocks** in the served HTML (visible as repeated blank lines and stray spaces between sections), which produce empty text nodes in the accessibility tree.
- **Localisation breadth is claimed but inconsistently**: `25 languages` / `7 native languages & 46 via subtitles` / `over 46+ languages` (T10 Part B). Subtitle availability across 46 languages is a substantive accessibility capability and is stated three different ways.

**Negative findings, recorded honestly**

- **`www.linkedin.com` is entirely unreachable** for unauthenticated fetch: the learner product, the help centre, and every accessibility-statement URL tried. The brief's priority items for this product — learner-facing course discovery UI and the accessibility statement — are therefore unharvested.
- **Course count stated five ways** (16,000 / 22,000 / 24,000 / 25,000 / 25K) across nine statements, **including `24,000` and `22,000` inside the same plan card.**
- **Language count stated three ways** (25 / 7+46 / 46+), and `over 46+` is redundant.
- **Credential types stated as `3` and `4` on the same page.**
- **`Job Search` and `Job Searching` both appear** as separate Learning Paths in one list.
- **Three consecutive partner links all labelled `Microsoft`**, pointing at Microsoft, GitHub, and Adobe.
- **Partner link text is image-description-shaped** (`servicenow logo`, `docker logo`) with inconsistent capitalisation.
- **`Contact sales` in three capitalisations** (`Contact sales` / `Contact Sales` / `Contact sales now`).
- **Bare `Learn more` 7+ times**; five different verbs (`Explore` / `Learn more` / `Discover` / `Show` / `See`) for one intent; `Explore now` and `Discover AI Skill Pathways` to the same destination from adjacent blocks.
- **Four names for the personalised-plan artefact** (`AI-powered Learning Plans`, `Personalized learning plans`, `personalized plans`, `AI-powered development plans`).
- **Three forms of the AI coaching feature name** (`AI-powered Coaching` / `AI-driven coaching` / `AI-powered coaching`) and three of role-play.
- **`skills agility` / `skill agility`** in adjacent paragraphs.
- **`Learning Paths` vs `AI Skill Pathways`** — three letters apart, containment relationship not signalled.
- **`nano learning` and `office hours` are named as content formats and never defined.**
- **`Grow your people for what's next`** used as an H1 on one page and as a qualified H2 on another.
- **The `For Individuals` free-trial link carries `?product=teams`.**
- **Footer `For government agencies` points at a URL slug containing `-old`.**
- **Footer and nav duplicate the same five audience solutions with different capitalisation and different domains** (`business.linkedin.com/learn/...` vs `learning.linkedin.com/...`).
- **`Flagship Product`** as a label in a two-product comparison tells the buyer which one the vendor prefers, not which one fits.
- **The compare-plans feature matrix is not readable as text** — column membership is visual only.
- **Extensive DOM duplication**, including the Learning Paths block three times and one trust sentence six times.
- **`Post a job`** is an unlabelled icon link.
- **Stat graphics have bare-quantity alt text** (`three times`, `2 thousand `, `One Billion`).
- **Eight-brand and six-brand claims delivered as single composite images**, while the same claim type is handled as individual images on another page.
- **`Kelloggs's`** typo in alt text; **`covering ... covering`** doubled word in the Creative scope line; **`quick click curation`** unhyphenated; **`UI animation of LinkedIn delivering a trusted expertise`** grammatically broken; `graph showing a 695% increase ` describes an ROI figure as an "increase".
- **Nineteen of roughly twenty statistics are unsourced**; the one sourced claim (`695% ROI`, IDC 2024) is the one with a hard financial figure.
- **`The only career development platform that's...`** — an unqualified exclusivity claim.
- **No FAQ, no pricing, no trial terms, no cancellation copy** on any harvested page.
- **Five Vidyard video embeds with no captions or transcripts** in the served markup, in a product whose content is video.
- **No `Skip to content`** on any harvested page.

---

## Transferable patterns

1. **Recommend against observed trajectories, not declared interests.** "Built on the career journeys of over 1 billion members... to **reveal how careers grow**." Where every other product in this batch asks the user to state a goal, LinkedIn Learning infers the path from a corpus of real outcomes. Condition: requires an actual behavioural corpus — the pattern is not the copy, it is having something to say that nobody else can. Where such an asset exists, lead with it in the subhead and let the headline stay plain.
2. **A four-verb spine that serves as tab label, section heading, and feature group.** `Deliver` · `Personalize` · `Apply` · `Activate`, expanded to `Deliver trusted expertise` / `Personalize learning experiences` / `Apply real-time skills intelligence` / `Activate career pathways`, reused verbatim across two pages and three hierarchy levels. The most disciplined IA-plus-copy construction in this batch, and cheap to adopt.
3. **State correlational claims correlationally.** "Learners **who engage with** AI-powered coaching spend 25% more time learning"; "**vs organizations that don't**." Naming the sub-population and the comparator costs four words and converts an implied causal claim into a defensible observed one. The direct fix for the Elevate (`Proven to...`) and Headway (`82% vs 64%`) failure modes.
4. **Claim only the outcomes you can measure.** Every stat here is behavioural or organisational — `time learning`, `engagement`, `mobility`, `tenure`, `ROI`. Not one asserts that a learner became more capable. **A learning product that declines to claim learning outcomes** is the safest claim architecture available, and it still supports a purchase decision because the buyer is measured on those same metrics.
5. **Asterisk the number that carries the purchase decision.** `695% return on investment after three years.*` → `* Source: IDC White Paper, 2024`. If only one claim gets a source note, make it the financial one.
6. **Anchor credentials to third-party validators and never claim to be one.** `Certification Preparation`, `prepare employees **for** certification exams`, `courses that **can count towards** CEUs at partners like NASBA (National Association of State Boards of Accountancy)`. Six separate places where the copy could have implied LinkedIn issues the certification and does not. Expand accrediting-body acronyms on first use. Directly applicable to any product adjacent to a licensing, accreditation, or regulatory regime.
7. **Prove a credential's worth with display data, not adjectives.** "**12M LinkedIn members feature a credential on their profile today**" and "+44% more members featuring a credential from 2020-2022." The certificate is valuable because the labour market sees it — a claim made with counts rather than with "industry-recognised".
8. **Name the next step, not the whole journey.** **`Next Role Explorer`** scopes ambition to one move. `Career Path Planner` would over-promise and under-deliver; `Next Role` is actionable and honest about horizon.
9. **`Best for:` / `Who it's best for:` / `Key Features:` as a three-slot plan card.** Who, why, what — and describe the buyer's *situation* ("If you are the only learner...") rather than labelling their identity. Contrast Blinkist's `For casual learners`, which characterises the person and mildly deflates them.
10. **Put the year in the title of version-sensitive content.** `Photoshop 2025 Essential Training`, `Illustrator 2024 Essential Training`. A freshness signal in the one place a user cannot miss it. Applies to any catalogue where the underlying tool moves.
11. **Course descriptions: imperative verb + object + `including` + named specifics.** "Practice advanced SQL techniques like **CTEs, CASE, UNION, self joins, and window functions**, with hands-on coding exercises and real-time feedback." The named specifics are the trust device, because a domain-literate reader can verify coverage from the description alone. No adjectives, no "comprehensive", no "master". The best body-copy discipline in the corpus.
12. **Bound a capability at the point of consideration, not in a footnote.** "Career Hub is available in English, Spanish, German, Japanese and French" — stated on the page where Career Hub is sold, in the same size as the benefits.
13. **Reframe a conflict of interest rather than hiding it.** The platform sells `Job Search` and `Career Management` paths to the employers whose staff might leave, and resolves it by making mobility *internal* (`Internal job board`, `Interested Internal Candidates`) and pairing it with `22% longer tenure`. An entirely copy-borne resolution of a structural tension.
14. **Counter-example: the number in the RFP.** Course count stated five ways, including two figures inside one plan card, on a B2B surface where catalogue size is a procurement criterion. Treat every quantitative claim as a single-source-of-truth string with a named owner — the same lesson as Headway's 24-hour window, at a different scale.
15. **Counter-example: a comparison table that is not text.** The compare-plans matrix conveys SKU membership by visual column alone, so the page's entire purpose is unavailable to linear reading. Any comparison must survive being read as a list.

## Caveats & gaps

- **`www.linkedin.com` returned an empty body on every attempt** — `/learning/`, `/legal/accessibility`, `/help/learning`. `accessibility.linkedin.com` and `about.linkedin.com/accessibility` likewise. Per the brief's instruction, no alternative retrieval route was attempted. **Recorded as blocked.** The practical effect is that this file documents the *buyer-facing* product and not the learner-facing one.
- **The accessibility statement — the brief's explicit priority for this product — is unharvested.** LinkedIn publishes one and links it from every footer; four candidate URLs were tried and all returned empty. **Nothing in T14 asserts anything about its contents.** The T14 findings are about the microsite's own markup and about the IA decision to link it. A second pass from an authenticated or browser-rendered session is required.
- **The help centre is unharvested.** `www.linkedin.com/help/learning` is a large public help centre whose article-title grammar would be the single most valuable missing artefact — it is the source that supplied T6, T7, T8, T9, and T11 for all four other products in this batch. T7, T8, and T11 are correspondingly `[absent]` here, and that is a harvest limitation, not a product deficiency.
- **No learner-facing surface was reached.** Course discovery UI, search, filters, the no-results state, in-course progress language, the completion certificate's own copy, enrolment states, and every notification are unobserved. The brief's question about "how courses are surfaced against a professional-identity context" is answered here **from the marketing description of the mechanism**, not from the mechanism.
- **No pricing, trial length, auto-renewal, or cancellation copy exists on the harvested surface**, and the self-serve terms live on the blocked domain. **T10 Part D asserts nothing about them.** For a corpus file whose T10 is meant to be a priority section, this is the largest single gap — and it is worth stating plainly that LinkedIn Learning's consumer-subscription disclosure quality is **unassessed**, not good.
- **Four of roughly a dozen microsite pages were fetched.** Unharvested and likely substantive: `for-entire-companies`, `for-higher-education`, `for-governments`, `for-libraries`, `for-technology` (five audience pages, each with its own value-prop copy), `content-library/online-business-courses` / `-technical-courses` / `-creative-courses` (three catalogue pages with fuller taxonomy), `certifications-and-credentials/partners`, `resources`, `elearning-case-studies`, `customer-success-center`, `partners`, `product/ai`, `elearning-solutions-contact-us` (the destination of 14+ CTAs, containing the only form on the site).
- **`AI Skill Pathways` not harvested** — `learning.linkedin.com/resources/upskilling-and-reskilling/ai-skill-pathways` is the destination of two CTAs and is the product's flagship programme.
- **The `2026 LinkedIn Talent Report`** (nav item) is the probable source of the unsourced `49%` stat and was not fetched.
- **The `695% ROI` IDC white paper** was not obtained. The claim is recorded as sourced-on-page; no judgement is offered on the study.
- **No judgement is offered on whether any efficacy or ROI claim is supported.** T10 Part A records what the pages say, how each claim is bounded, and which carry sources.
- **Video captioning recorded as suspected, not confirmed.** Five Vidyard embeds and four GIF assets carry no `<track>` or transcript in the served HTML; the player may supply captions client-side. Given the product is video and the site claims 46 subtitle languages, this is worth confirming rather than assuming either way.
- **The compare-plans matrix column membership was inferred** from adjacency and from the two SKUs' `Key Features` lists. The served text does not attribute features to SKUs, so any statement here about which feature belongs to which plan should be re-verified visually.
- **Only en-US.** The product claims 7 native content languages and 46 subtitle languages; Career Hub is stated as five UI languages. No locale variant of the microsite was inspected, so localisation of `talent architecture`, `Next Role Explorer`, `Career Hub`, and `nano learning` is unknown.
- **DOM duplication may inflate some observations.** The repetition of the Learning Paths block, the trust sentence, and several assets is recorded as a defect, but it is possible a browser-rendered pass would show only one instance visible. The accessibility-tree consequence is real either way.

## Sources

1. https://www.linkedin.com/learning/ *(attempted — empty body, blocked)*
2. https://learning.linkedin.com/ *(redirects to 3)*
3. https://business.linkedin.com/learn
4. https://business.linkedin.com/learn/product-overview
5. https://business.linkedin.com/learn/compare-plans
6. https://business.linkedin.com/learn/content-library
7. https://business.linkedin.com/learn/certifications-and-credentials
8. https://www.linkedin.com/legal/accessibility *(attempted — empty body, blocked)*
9. https://accessibility.linkedin.com/ *(attempted — empty body, blocked)*
10. https://about.linkedin.com/accessibility *(attempted — empty body, blocked)*
11. https://www.linkedin.com/help/learning *(attempted — empty body, blocked)*
