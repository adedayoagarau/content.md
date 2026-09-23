# 175. Webflow

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Visual web development platform / no-code site builder with CMS, hosting and a published curriculum |
| Primary URL | https://webflow.com/ |
| Corpus rank | 175 |
| Benchmark strength (source list) | Complex-builder education |
| Locale / market observed | en-US |
| Platform observed | Web (marketing), Webflow University (university.webflow.com), Zendesk help centre (help.webflow.com), Atlassian Statuspage (status.webflow.com), The Webflow Way (webflow.com/webflow-way) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated product. Accessibility posture is the substantive compliance surface: a published statement claiming sites built with named elements "conform to levels as high as WCAG 2.1 Level AA", an admission that "the Webflow Designer does not fully support assistive technology", ATAG referenced, and a feedback channel at accessibility@webflow.com |
| Harvest date | 2026-09-22 |
| Pages inspected | 26 |
| Harvest completeness | Partial — **University lesson pages are video shells with no transcripts in the public HTML**, so the analogies and metaphors in the actual teaching live in video narration and were not retrievable; the glossary paginates and only page 1 (`404 page` → `CRLF`) was harvested, so terms D–Z are uncaptured; `/terms` was not fetched |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://webflow.com/ | Persona tabs, 19 slide headlines |
| Pricing | https://webflow.com/pricing | Four plan families, add-on ladders, 15 FAQs |
| University home | https://university.webflow.com/ | The curriculum entry points |
| Courses index | https://university.webflow.com/courses | **27 courses with levels and durations** |
| Learning paths | https://university.webflow.com/learning-paths | Three paths |
| Glossary | https://university.webflow.com/glossary | **Partial** — page 1 of ~9 |
| Course: Webflow 101 | .../courses/webflow-101 | 20 lessons, 2h 30m |
| Course: Build & structure your site | .../courses/build-and-structure-your-site | 9 lessons |
| Course: Lay out & style your site | .../courses/lay-out-style-your-site | 11 lessons |
| Course: CSS layout & positioning | .../courses/css-layout-and-positioning | 15 lessons; **the difficulty-acknowledgement sentence** |
| Course: CMS and dynamic content | .../courses/cms-and-dynamic-content | 8 lessons |
| Course: Getting started with Webflow | .../courses/getting-started-with-webflow | 7 lessons |
| Lesson: Intro to the box model | .../course-lesson/css-layout-intro-to-the-box-model | Video shell |
| Lesson: Working with classes | .../course-lesson/lay-out-style-working-with-classes | Video shell |
| The Webflow Way | https://webflow.com/webflow-way | Best-practice curriculum + exam + badge |
| Help centre index | https://help.webflow.com/hc/en-us | 15 categories |
| Help category/section/article pages ×6 | help.webflow.com | Including `Intro to the Webflow CMS`, `Style selectors panel`, `Building web layouts`, `Components overview` |
| Accessibility statement | https://webflow.com/accessibility/statement | Four scopes, candid admission |
| Status page | https://status.webflow.com | 13 components in 8 groups |

---

## T1 Navigation & IA labels `[observed]`

**Global nav:** `Platform` · `Source` · `Solutions` · `Resources` · `Enterprise` · `Pricing` · `Get started` · `Login` · `Contact Sales`

**`Platform` dropdown is grouped by verb, in four columns:**

| Group | Members |
|---|---|
| `Build` | Design, Edit content, Interactions, Collaboration, Page building |
| `Manage` | CMS, Hosting, Localize, Security, Shared Libraries |
| `Convert` | Analyze, Optimize, SEO, `AEO new` |
| `Extend` | Apps, Figma to Webflow, Webflow Cloud, DevLink, `MCP new` |

`Build / Manage / Convert / Extend` is the best platform-nav grouping in this batch. It maps to a site's lifecycle rather than to the org chart, and `Convert` in particular is a **buyer's** verb sitting among three builder verbs — Webflow has put the marketing outcome in the product nav.

**`Solutions` is grouped by discipline, not company size**: `Marketing` (Brand, Performance, Digital Experience, Ops) · `Engineering` (Engineering leaders, Developers) · `Service Providers` (Agencies, Freelancers, Global Alliances).

**Two unusual nav affordances** `[observed]`: a persona switcher labelled **`I'm a`** with options Marketer / Designer / Developer / Agency, and an **`Appearance`** control offering `Light mode` / `Dark mode` / `Auto (OS)`. The mobile nav labels one of its sections `Site Settings` — the same term Webflow uses for a product panel, reused here for webflow.com's own preferences. That is a small but real vocabulary collision between the marketing site and the product.

**Webflow University nav — three groups, and the third is the tell** `[observed]`:

- `Learn`: `Courses` · `Learning Paths` · `Videos` · `Docs ↗` · `Resources` · `Certifications` · `Interactive learning` · `The Webflow Way ↗` · `Glossary`
- `Engage`: `Support ↗` · `Community ↗`
- `Build`: `New site ↗` · `Dashboard ↗`
- Utility: `Log in` · `My learning` · `Search ⌘E` · `Try Webflow — it's free`

`Build` inside the education site's nav — with `New site` and `Dashboard` — means the curriculum never traps the learner. Every University page carries a two-click route into the product. Most education hubs treat "go do it" as the end of the funnel; Webflow treats it as a persistent nav item.

**And University ships an explicit `Accessibility` menu group** `[observed]`: `Switch to Light mode` · `Switch to Dark mode` · `High contrast`. An in-nav accessibility control set, labelled as such, is rare and worth recording as good practice.

Case inconsistency: desktop nav says `Interactive learning`, mobile nav says `Interactive Learning`, on the same page.

**Help Centre nav** `[observed]`: `Help Center` · `Dashboard` · `Product` (Designer, CMS, Ecommerce, Interactions, SEO, Hosting, Security) · `Marketplace` · `Learn` · `Resources` · `My requests` · `Get support` · `Get started — it's free`.

**Footer groupings:** `Source by Webflow` · `Product` · `Solutions` · `Resources` · `Company` · `Compare` · `Community` · `Get help`. Badges: `MCP new`, `AEO new`, `DevLink Labs`, `Figma to Webflow Labs`, `Careers We're hiring`. The University footer omits `Source by Webflow` and `Compare`, adds `Startups`, and points the identical label `Find a meetup near you` at a **different URL** from the one on webflow.com.

## T2 Value proposition & headline patterns `[observed]`

**Hero**

> H1: `Build for what's next`
> Subhead: `Webflow gives every team the tools to build, manage, and grow a website that drives real revenue.`

`every team` and `drives real revenue` are both doing enterprise work. The H1 is a three-word imperative with no product noun in it at all; the subhead supplies the audience, the verb triad (build/manage/grow — matching the `Build`/`Manage`/`Convert` nav groups), and the business outcome. Note `real revenue` — a defensive adjective, positioning against the assumption that a visual builder produces toy sites.

**Slide headlines are imperative or gerund-led, and every one names a rival cost being removed** `[observed]`:
`Build and launch websites without filing a ticket` · `Publish content without a developer` · `Optimize for conversion` · `Collaborate in a shared workspace` · `Drive traffic from traditional search & LLMs` · `Build with pixel-perfect precision` · `Create fully custom web experiences` · `Manage edits with branching and publishing workflows` · `Put agents to work on your site` · `Create rich interactions powered by GSAP` · `Keep every page on brand at scale with Shared Libraries` · `Hand off sites clients can actually run` · `Deploy full-stack apps on Webflow` · `Prove ROI with native analytics` · `Extend Webflow with code when you need it` · `Delegate billing to clients directly from Webflow` · `No-maintenance hosting, security, and updates` · `Focus on craft while AI handles the repetitive work` · `Optimize for conversion with AI-powered personalization`

Two of these are unusually candid. `Hand off sites clients can actually run` — the word `actually` concedes that handoffs normally fail. `Focus on craft while AI handles the repetitive work` divides the labour explicitly rather than claiming AI does everything.

**Customer stories use a `How X …` shape** `[observed]`: `How Copy.ai drove millions in pipeline with Webflow` · `How Arkose Labs migrated a 10-year-old site in 3.5 weeks` · `How Amazon accelerated innovation`. Every one carries a quantity or a named constraint.

**Webflow University headline** `[observed]`:
> H1: `Learn Webflow, straight from the source.`
> Subhead: `Free education. Practical resources. Verified accreditation.`

The three-fragment triad again (the same construction as Adobe's `Dream it. Make it. Easy.` and VEED's `Imagine it. Generate it. Brand it.`), but Webflow's version lists **nouns, not verbs** — because it is describing an institution rather than a workflow. `straight from the source` is positioning against the third-party Webflow-tutorial economy on YouTube.

**University section headers are questions and invitations** `[observed]`: `Recently added` · `New to Webflow?` (with `Get your bearings with an intro foundations course. No prior experience needed.`) · **`What are you here to do?`** (`Navigate directly to your goal.`) · `AI in Webflow` · `Work with the CMS` · `Your Webflow skills, verified.` · `Curated learning` / `For your role` · `Helpful resources` / `Checklists to keep you on track`

`What are you here to do?` as a section header on an education hub is the right question, and it is the one most documentation sites never ask. It admits that a learner arriving at a curriculum usually has a task, not an ambition.

**Pricing** `[observed]`: H1 `Our pricing` — deliberately flat, no value claim. Section headers: `Site plans` · `Platform plans` · `Add-ons` · `Add seats` · `Add AI credits` · `See the business impact of moving to Webflow` · `Frequently asked questions` · `Need help?` · `Get started for free`.

**The Webflow Way** `[observed]`: animated H1 `Design/Build/Collab/Scale … the Webflow Way`, with `Unlock the full potential of Webflow with best practices validated by experts` and card headers `Your performance blueprint` · `Crafted by real pros` · `Expert-approved templates` · `Earn your badge` · `Proven by industry pros, so you can build like one.`

**Help centre** `[observed]`: H1 `How can we help you today?` — note `today`, which Riverside's `How can we help you?` omits.

## T3 CTA inventory

| Label (verbatim) | Location |
|---|---|
| `Get started` | Home nav (desktop) |
| `Start for free` | Home nav ×3 (two → /signup, one → /dashboard); pricing Starter plans |
| `Get started — it's free` | Home sticky footer; help.webflow.com header; webflow-way nav |
| `Get started for free` | Pricing section header |
| `Talk to Sales` / `Talk to sales ->` / `Contact Sales` / `Talk to us` | Home hero, home mid-page, nav ×2, pricing |
| `Add plan` | Pricing, Basic & Premium Site plans |
| `Add ecommerce plan` | Pricing, all 3 ecommerce plans |
| `Upgrade Workspace plan` | Pricing, Core/Growth/Freelancer/Agency |
| `Buy seats` | Pricing — **including on the `$0` Free seat tier** |
| `Buy AI credits` / `Use the calculator` | Pricing |
| `Explore design` / `Explore CMS` / `Explore Optimize` / `Explore collaboration` / `Explore AEO` / `Explore Webflow MCP` / `Explore Interactions` / `Explore Shared Libraries` / `Explore page building` / `Explore Analyze` / `Explore hosting` / `Explore code components` / `Explore Webflow Cloud` / `Explore AI` / `Explore Source` | Home feature dialogs — **15 `Explore X`, all specific, none bare** |
| `Read the story` / `Read story` / `Read customer story` | Home customer cards — **three labels, one action** |
| `Enroll Now →` | University course pages |
| `Continue to next lesson →` | Lesson page (css-layout) |
| `Complete & continue →` | Lesson page (lay-out-style) — **inconsistent with the above, same control** |
| `Complete course ✓` | Both lesson pages |
| `Test your knowledge` | University course sidebar (`Assessment`); webflow-way exam |
| `Login with your Webflow account to track your progress` | University course pages |
| `All courses` | University breadcrumb |
| `Browse individual courses →` | /learning-paths |
| `Try Webflow — it's free` | University nav ×2 — **href is `#`** |
| `Go to courses` / `Go to quick help` / `Go to the Community` / `Go to Webflow Way` | help.webflow.com tiles |
| `Reset` / `Reset the filter` | /courses and /glossary filters |
| `Load more` / `Next` | /glossary |
| `Subscribe to Updates` / `Subscribe via Slack` / `Resend OTP` | status.webflow.com |
| `Watch the intro` / `Watch launch video` / `Watch it directly on YouTube` | webflow-way, home, lesson pages |
| `Skip to Main Content` (webflow.com) vs `Skip to main content` (help) | **Casing differs across properties** |

**The `Explore <specific thing>` family is the strongest CTA practice in this batch.** Fifteen instances, every one naming its destination, zero bare `Learn more`. Compare Wise, which "almost never ships a bare `Learn more`" — Webflow does better, shipping none at all in that slot. The failure is elsewhere: `Explore collaboration` appears on a *Design* card and on two *customer-story* cards, so the labels are specific but occasionally attached to the wrong destination.

## T4 Onboarding & concept teaching — PRIORITY

Webflow exposes the CSS box model, flexbox, grid, class selectors and a content model through a visual interface. Its education problem is not "how do I use this button" but "you must acquire a professional mental model you did not come here for". Webflow University is the published answer, and it is the most substantial teaching artefact in this corpus.

### (a) The structure

**Content types, each with its own index:** Courses · Learning Paths · Videos · Docs (redirects to the Help Center) · Resources · Certifications · Interactive learning · Glossary · plus `The Webflow Way`, hosted on webflow.com. Personal progress lives under `My learning`.

**Hierarchy:** Learning Path → Course → module/section → Lesson. Course pages present a `Table of contents` with numbered sections; each lesson row carries a number, a title and a duration.

**Only three Learning Paths exist** `[observed]`, and the scarcity is the decision:

| Path | Description | Size |
|---|---|---|
| `AI & the Webflow MCP` | "Set up and use AI agents with the Webflow MCP, from first prompts to full CMS builds." | `4 courses` (`1h 51m•Intermediate`) |
| `Webflow design basics` | "Learn to design and build professional Webflow sites." | `6 courses` |
| `Webflow visual developer` | "A curated learning path for visual developers preparing for certification or leveling up their expertise." | `13 courses` |

Three paths over 27 courses means Webflow is **not** trying to route every learner. It ships three opinionated sequences and leaves the rest as a browsable catalogue with filters.

**Course filter facets** `[observed]` — and there are three axes, not one:
- `Topics`: Migration, Fundamentals, Publishing & hosting, AI, Analytics & insights, SEO & AEO, Performance, Collaboration, CMS, Design & build, Localization, Extend & develop
- `Roles`: Admin, Content Editor, Designer, Developer, Marketer, Reviewer
- `Levels`: Beginner, Intermediate, Advanced

**Every course declares a level and a duration** — `Webflow 101 (Beginner, 2h 30m)`, `CSS layout & positioning (Intermediate, 1h 34m)`, `Webflow for Reviewers (Beginner, 11m)`. Twenty-seven courses, all labelled. Duration is stated to the minute, not bucketed, which lets a learner fit a course into a real gap in their day.

**Two parallel entry systems on the University home** `[observed]`, and this is the structural insight worth stealing:

**By role** — `Designer` ("Design and build sites from concept to launch") · `Visual developer` ("Own the architecture, systems, and performance") · `Marketer` ("Launch and iterate on pages without dev") · `Reviewer` ("Leave feedback without touching the design") · `Content editor` ("Edit and publish content directly") · `Admin` ("Manage members, workspaces, and settings").

**By task** — under the header `What are you here to do?`: `Onboard your team to Webflow` · `Edit and manage content` ("Work on a site someone else built →") · `Learn building fundamentals` ("Layout, styling, and the box model →") · `Get found in AI search` · `Add interactions and animations` · `Run A/B tests and personalize experiences`.

A learner who knows *who they are* uses the first; a learner who knows *what they need today* uses the second. Both resolve into the same 27 courses. The role descriptors are the better-written half — six roles, each defined in under nine words by the scope of what they touch, and `Reviewer` defined by what they do **not** touch ("without touching the design"). Defining a role by its negative boundary is the clearest way to tell someone a course is not for them.

**Checklists as a third content type** `[observed]`: `SEO checklist`, `Design system checklist`, `Pre-launch checklist` ("Review design, performance, SEO, and accessibility before you publish").

### (b) Lesson-title grammar — 66 titles captured

**Webflow 101** (Beginner, `2h 30m`, `20 Lessons`), modules `Getting started` / `Site build` / `Additional layout learning`:
`Welcome & resources 1:01` · `Intro to Webflow 101 2:16` · **`Intro to the box model 3:04`** · `Intro to HTML 5:17` · `Intro to CSS 5:22` · `Welcome to the Webflow UI 8:13` · `Recent updates to the Webflow Designer 1:32` · `Site build: Hero 15:01` · `Site build: Navigation 6:31` · `Site build: Logos 4:33` · `Site build: Cards 11:50` · `Site build: Form 15:07` · `Site build: Footer 8:46` · `Site build: Responsiveness 14:12` · `Site build: Interactions 14:07` · `Site build: Design review & accessibility 16:11` · `Site build: Publishing the site 6:19` · `Additional layout learning` · `Quick Stack 5:32` · `V Flex and H Flex 0:36`

**Build & structure your site** (Beginner, `30m`, `9 Lessons`): `Background & preview 2:00` · `Intro to HTML & CSS 5:17` · `Add elements panel 2:23` · `Essential elements 6:11` · **`Section vs. Container vs. Div 2:40`** · `Navigator panel 3:32` · `Review: Elements in Webflow 3:00` · `Add & manage assets 4:18` · `Additional resources 1:00`

**Lay out & style your site** (Beginner, `49m`, `11 Lessons`): `Background & preview 2:00` · `Intro to styling in Webflow 6:38` · `Style selectors 3:46` · **`Working with classes in Webflow 10:21`** · `Review: Style selector types 3:00` · `Viewing & managing selectors 2:00` · `Intro to the box model 3:04` · `Intro to CSS layout 10:48` · `Review: CSS layout 3:00` · `Bonus: Class naming convention 2:00` · `Additional resources 2:00`

**CSS layout & positioning** (Intermediate, `1h 34m`, `15 Lessons`): `Intro to the box model 3:04` · `Display settings 10:48` · `Spacing 6:28` · `Size 17:35` · `Position 16:51` · `Flexbox 8:08` · `Center elements with flexbox 1:20` · `Equal height layouts with flexbox 1:47` · `Grid 14:15` · **`Flexbox vs grid vs Quick Stack 5:32`** · `Enable relative position 1:43` · `Absolute Positioning 1:43` · `Apply a z-index value 1:49` · `Hide overflowing content 1:49` · `Fixed positioning 1:27`

**Design & manage CMS content in Webflow** (Beginner, `29m`, `8 Lessons`): `Background & preview 2:00` · **`Intro to the Webflow CMS 5:12`** · `Build, manage, & publish CMS content 6:16` · `Review: Webflow CMS basics 2:00` · `CMS Collection lists 5:07` · `CMS Collection pages 4:39` · `Review: CMS Collection Lists & Pages 2:00` · `Additional resources 2:00`

**Getting started with Webflow** (Beginner, `23m`, `7 Lessons`): `Introduction 1:30` · `Welcome to Webflow 3:10` · `Review: The Webflow platform 3:00` · `Navigating your Dashboard 2:00` · `Navigating the Webflow canvas 8:13` · `Working with your team 3:30` · `Keep learning 2:00`

**Recurring title shapes, with counts:**

| # | Shape | Count | Function |
|---|---|---|---|
| 1 | **`Intro to X`** | 8 | The hard-concept opener. `Intro to the box model` ×3, `Intro to HTML`, `Intro to CSS`, `Intro to HTML & CSS`, `Intro to CSS layout`, `Intro to styling in Webflow`, `Intro to the Webflow CMS`, `Intro to Webflow 101` |
| 2 | **`Review: X`** | 5 | Always a 2:00–3:00 consolidation lesson at the **end** of a module |
| 3 | **`Site build: X`** | 10 | Webflow 101 only — a prefixed serial signalling "you are building the same page across these lessons" |
| 4 | Bare noun / feature | many | `Flexbox`, `Grid`, `Spacing`, `Size`, `Position`, `Quick Stack`, `Typography` |
| 5 | Panel-named | 3 | `Add elements panel`, `Navigator panel`, `Style selectors` |
| 6 | Imperative task | 6+ | `Center elements with flexbox`, `Apply a z-index value`, `Hide overflowing content`, `Enable relative position` |
| 7 | Gerund | 5 | `Working with classes in Webflow`, `Navigating your Dashboard`, `Viewing & managing selectors` |
| 8 | **`X vs. Y`** | 2 | `Section vs. Container vs. Div`, `Flexbox vs grid vs Quick Stack` |
| 9 | Housekeeping, repeated verbatim across courses | 4 | `Background & preview`, `Additional resources`, `Getting started`, `Wrap up` |
| 10 | `Bonus: X` | 1 | `Bonus: Class naming convention` |

**Three of these shapes are the pedagogy, not just the naming.**

**`Review: X`** is the most copyable. Five two-to-three-minute lessons whose only job is consolidation, placed at module boundaries, and **named as such in the table of contents** so the learner can see the rhythm before starting. A learner scanning `Lay out & style your site` sees teach-teach-`Review`-teach-teach-`Review`. Most curricula bury the recap inside the last lesson; Webflow gives it a title, a duration and a slot.

**`X vs. Y`** exists because Webflow's own abstractions create ambiguity it must then resolve. `Section vs. Container vs. Div` and `Flexbox vs grid vs Quick Stack` are lessons that exist purely to arbitrate between three near-identical options the product offers. Shipping a comparison lesson is an honest response to having shipped three overlapping primitives. (Note the punctuation is inconsistent between the two: periods in one, none in the other.)

**`Site build: X`** solves the classic tutorial problem — ten disconnected lessons versus one long project video. The prefix turns ten independently-titled, independently-findable lessons into a visibly continuous build. And **`Site build: Design review & accessibility` (16:11) is the second-longest lesson in Webflow 101**, placed immediately before publishing. Accessibility is taught as a step in the build, at the point where it is actually performed, not as an optional module.

**Course-title grammar:** `Intro to X` (3), `X in Webflow` (5), `Webflow for <role>` (3), imperatives (`Lay out & style your site`, `Make your site responsive`, `Collaborate with your team`, `Prepare to publish your site`), and one numeric (`Webflow 101`).

**Progress and completion language** `[observed]`: `Progress` `0%` (course sidebar) · `Course progress` `0%` (lesson pages) · a `Details` block giving level, duration and count with the word `Lessons` on its own line · sidebar headings `Assets & links` and `Assessment` · `Test your knowledge` · `Login with your Webflow account to track your progress` · `Enroll Now →` · `Up next` · `Continue to next lesson →` / `Complete & continue →` · `Complete course ✓` · `My learning`.

Certification framing: `Your Webflow skills, verified.` / `Earn certifications validated at the source and recognized across the industry.` — `at the source` echoing the University H1.

### (c) How a hard concept is introduced

**A critical limitation, stated up front.** University lesson pages are **video-first shells**. A lesson page contains a breadcrumb, an embedded YouTube or Vimeo player, the title, a one-line description rendered twice, the course table of contents, and next-lesson navigation. **There is no lesson body prose and no transcript in the public HTML.** The analogies and metaphors live in video narration and were not retrievable by the permitted method. Everything below is drawn from lesson descriptions, course descriptions, the glossary, and the parallel Help Center articles — which is where Webflow's *textual* teaching actually lives.

#### 1. The box model — `Intro to the box model`

- **One asset, reused three times.** The identical lesson, same `3:04` runtime, appears at three URLs across Webflow 101, CSS layout & positioning, and Lay out & style your site. Webflow treats the box model as a single canonical explainer injected into every curriculum that needs it, rather than teaching it three ways.
- Framing sentence, used as both lesson and meta description: **`Learn about the box model and how it shapes web design.`**
- **Position is the pedagogical decision: it is the third lesson in Webflow 101, before `Intro to HTML` and before `Intro to CSS`.** Webflow teaches the box model *before* it teaches what HTML or CSS are. The reasoning is legible — a visual builder's user manipulates boxes on a canvas from minute one and never types a tag, so the spatial model is load-bearing and the languages are background.
- It is also the hook on the University home for the fundamentals track: `Learn building fundamentals` / `Layout, styling, and the box model →`.
- **The closest thing to an acknowledgement of difficulty in the entire corpus** is the course-level framing on `css-layout-and-positioning`:
  > `If you're used to working with static design tools that let you drag and drop elements anywhere, building for the web can be a tough transition.`

  This names **the learner's prior mental model as the obstacle** — not the learner, and not the subject. A designer arriving from Figma is told that the thing making this hard is a habit, which is both true and non-humiliating. It continues that the course "covers the core concepts you'll need to start building with confidence for the web."
- **No textual metaphor was found.** The glossary defines the parts atomically: `Bottom padding` → "Bottom padding is the space between the bottom of an element and its border."; `Bottom margin` → "The spacing between the bottom border of an element and the element(s) below it."; `Bounding box` → "a rectangular border around a website element … that appears during the design process."

#### 2. Classes, combo classes and inheritance — `Working with classes in Webflow` (`10:21`)

- Framing: `Learn how to create, manage, and reuse classes in Webflow — including combo and global classes.`
- Sits inside module 2, `Style selectors`, alongside `Style selectors` (`3:46`), `Review: Style selector types` (`3:00`) and `Viewing & managing selectors` (`2:00`).
- **Inheritance is taught as a learning outcome, not as a lesson.** The course objectives state that learners will know `How and when to use classes, combo classes, and global classes`, `How elements inherit styles from classes, tags, and other style selectors`, and `How to develop a class naming system that's scalable, clear, and easy to manage`. The third is a *maintenance* objective in a beginner styling course — Webflow teaches naming hygiene before the learner has enough classes to need it.
- **The Help Center article `Style selectors panel` teaches the same material through colour and icon, not metaphor** `[observed]`: tags "appear in pink at the top", classes "appear in blue below the tags in the order they were created", combo classes "appear in blue and are nested under each class with a \"plus\" icon to their left", nested tags "appear in pink and are nested under each class with an \"arrow\" icon". The abstraction is made learnable by being made **visible and colour-coded**, which is the only move available to a product whose users will never read a stylesheet.
- Hygiene is framed instrumentally rather than morally: deleting unused classes "reduce[s] the weight of your site's code, and improve[s] your site's performance."
- **A significant defect.** The glossary's entry for the bare word `Class` gives the **object-oriented programming** definition — "A class is a template that defines variables for objects with similar properties." — not the CSS one. `Combo class` is correctly defined ("A combo class combines multiple classes, allowing you to apply various visual styles to HTML elements."), but a learner searching the glossary for the single most important term in the product gets the wrong concept entirely.
- Glossary entries that do carry the inheritance model: `Ancestor` → "Any element that is further up the element hierarchy of the document tree. For example, the Body element is the ancestor of all elements on the Designer canvas."; `Child` → "A child element is an element nested within a parent element in a hierarchy."; `Common targets` → "All elements on the page targeted by the same selector."
- **And a deliberate redefinition:** `Cascading rules` → "The order in which a Webflow site's CSS styles flow from desktop to mobile breakpoints." Webflow has repurposed "cascade" to mean **breakpoint inheritance**, not CSS specificity. That is defensible — breakpoint cascade is the cascade a Webflow user actually experiences — but it means a Webflow-trained designer and a CSS-trained developer will use the word to mean different things.

#### 3. CMS Collections — `Intro to the Webflow CMS` (`5:12`)

The parallel Help Center article carries the actual conceptual teaching, and it is the most complete piece of concept writing in this corpus.

- Opening: `A Content Management System (CMS) lets you store and manage dynamic content with a shared structure.`
- **Sub-headings, in order** — and the order *is* the lesson plan: `Static content vs. dynamic content` · `How does the Webflow CMS work?` · `Example CMS workflow` · `About CMS Collections, Collection items, and Collection fields` · `How to reference dynamic content on your site` · `About Collection lists` · `About Collection pages`
- **The teaching device is a contrast pair, then a worked example — not a metaphor.** Static is "managed manually and only changes when you edit it", praised for infrequently-changing content and then flagged: "it's not scalable". Dynamic "references one source of truth (i.e., the CMS) and automatically updates if the source changes".
- The one analogy used is the **database**: "The CMS is a structured database that lets you store and manage content." A Collection "serves as a database for a specific topic or type of content."
- The worked example is always a blog — create a Collection with fields, design the Collection Page template, add items — and alternative content types are then enumerated concretely: `blog posts, testimonials, team members, job postings, or recipes`. Five examples spanning marketing, HR and consumer content, so no reader concludes the CMS is only for blogs.
- Two clarifying sentences that pre-empt the two classic confusions: Collection pages "are automatically created for every Collection item" and "these pages are hidden by default"; and "Elements added to Collection pages are static until you connect them to Collection fields."
- Course-level framing adds an **organisational** outcome to the technical ones: `Empower teammates to manage content without touching design`. The reason to learn the CMS is framed as a change in who can do what, not as a feature.

#### 4. Flexbox, grid and Quick Stack — taught as a *choice*, not a syntax

- The lesson `Flexbox vs grid vs Quick Stack` (`5:32`) exists specifically to arbitrate.
- The decision rule is stated in plain, non-numeric language in `Building web layouts`: "Use grid when you have a structured design along 2 dimensions…"; "Set flexbox on parent elements when you want a fluid design along 1 dimension". **The 1-D/2-D distinction is the whole conceptual payload**, and Webflow reduces it to one sentence each.
- **Webflow hides flexbox behind named elements so non-coders never set a CSS property**: "V flex is a div block that uses preset vertical flexbox display settings and H flex is a div block that uses preset horizontal flexbox display settings." And "The Quick Stack element uses CSS grid and has cells made of div blocks that use preset vertical flexbox display settings." There are `8 presets`.
- The article then **makes a default recommendation rather than leaving it open**: "We recommend you use Quick Stack for most layouts to streamline your design workflow."
- And closes permissively: "Ultimately, your layout design decisions are up to you — and we recommend you try different methods and find the one you like best!"

**Those last two sentences together are the model.** Give the default for the majority, then explicitly return authority to the user. A learner who wants to be told what to do is told; a learner who wants to decide is licensed to.

### The three moves, summarised

Across all four concepts Webflow uses the same three techniques, and none of them is a metaphor:

1. **Name the prior mental model as the obstacle.** "If you're used to working with static design tools…" — the difficulty is located in a habit, not in the learner and not in the subject.
2. **Pre-package the hard CSS behind an element name, then teach the property afterwards.** `V flex`, `H flex`, `Quick Stack` let a learner use flexbox and grid before understanding them. The course then explains what was underneath. This is a deliberate inversion of the usual sequence and it is only available to a product that owns the abstraction layer.
3. **Scope by role, explicitly, at the top of the course.** "This course is designed for website builders — those who lead or support the hands-on design and building of websites, and who have design permissions in Webflow." / "This course is designed for web designers, marketers, and content editors — anyone who builds or manages content-driven websites in Webflow…" Note the second clause in each: it names the *permission* or the *activity*, so a learner can self-exclude on a concrete test rather than on a job title.

## T5 Form & field labels `[observed]`

Public surfaces only.

- `Search ⌘E` (University global search); the home page renders a styled example as `Search"CMS" ⌘E`
- `/courses` filter panel: heading `Filter`, `Reset`, group labels `Topics` / `Roles` / `Levels`
- `/glossary`: `Filter`, `Reset`, an A–Z + `#` letter index, `Load more`, `Next`
- Pricing: `Monthly` / `Yearly (Save up to 40%)` with the accessible toggle label `Toggle between yearly and monthly pricing`; Workspace tab switch `For teams` / `For freelancers & agencies`; a bandwidth stepper offering `50 GB, 100 GB, 150 GB, 200 GB, 300 GB, 400 GB, 500 GB, 750 GB, 1 TB, 1.5 TB, 2 TB, 2.5 TB`
- status.webflow.com subscribe form: `Email address:`, `Enter OTP:`, `Resend OTP in: 30 seconds`, `Didn't receive the OTP?`, `Country code:`, `Phone number:`, `Change number`, `Webhook URL:` with helper `The URL we should send the webhooks to`, and `We'll send you email if your endpoint fails`
- Header persona selector `I'm a`; `Appearance` radio group `Light mode` / `Dark mode` / `Auto (OS)`

`Toggle between yearly and monthly pricing` as an accessible name on a billing-period switch is a small correct detail — the visible control is two words, the accessible name is a full description of what the toggle does.

## T6 Status & state language

### Status page `[observed]`

Banner: `All Systems Operational`. `Uptime over the past 90 days.`

**Components, in their groups:**
- `Hosted Websites` → `Site Pages`, `Localize`, `Ecommerce`, `Forms`, `Site search`, `SSL certificate provisioning`
- `Webflow Canvas`
- `Dashboard`
- `Publishing`
- `API & MCP Server` → `Data API`, `MCP Server`
- `Analyze & Optimize` → `Analyze`, `Optimize`
- `Email Notifications`
- `Webflow.com & Marketplace` → `Webflow.com`, `University`, `Support Portal`, `Marketplace`

Two decisions worth noting. **`Hosted Websites` is the first group** — Webflow leads its status page with its customers' *customers'* experience, not with its own app. And **`University` is a monitored component**, which is a statement about how the education surface is classified internally: it is infrastructure, not marketing.

**Status vocabulary:** `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Historical phrasing: `had a major outage.` / `had a partial outage.` / `No downtime recorded on this day.` / `No data exists for this day.` / `No incidents reported today.` / `No incidents or maintenance related to this downtime.`

**Incident lifecycle labels:** `Investigating` → `Identified` → `Update` → `Monitoring` → `Resolved`.

**Incident titles are prefixed with the resolved state in brackets and are consistently hedged**: `[RESOLVED] Reports of issues authorizing MCP for sites within Client Workspaces` · `[RESOLVED] Reports of 500 intermittent errors affecting some hosted sites` · `[RESOLVED] Reports of issues impacting multiple Webflow services`.

The grammar is invariably **`Reports of <symptom> affecting <scope>`** — observation-framed, never asserting fault, always bounding the blast radius. `Reports of` is doing careful work: it describes the evidence Webflow has rather than the condition of the system, which is honest during `Investigating` and stays accurate after `Resolved`.

Notification copy: "Get email notifications whenever Webflow creates, updates or resolves an incident." / "Get webhook notifications whenever Webflow creates an incident, updates an incident, resolves an incident or changes a component status." SMS is narrower — "whenever Webflow creates or resolves an incident", no "updates".

### Product state language `[documented]`

- Publish targets: `Webflow staging subdomain` (`yoursite.webflow.io`) vs `custom domains`; CTA sequence `Publish` → `Publish to select domains`
- `Site settings > Publishing tab > Staging`; `branch staging subdomain`; `custom staging domain`; `private staging`
- Content states: `Drafted pages`, `Save and publish Collection items`, `Scheduled publishing`, "Publish or unpublish individual CMS items without republishing your entire site.", "Schedule CMS items to publish at a specific date and time.", `Set static pages to "draft" or "publish" for a specific locale`
- Site lifecycle: `Duplicate, transfer, or archive a site`, `How do I unarchive my site?`
- Domain states: `"Update pending"` and `"Update needed"` — quoted inside an article title
- Component-instance state is taught by colour: selected instances are "highlighted and outlined in green"; in-context editing shows a "green banner"
- **Bandwidth overage state, and it is the most consequential state string on the pricing page**: "Covers temporary bandwidth spikes. Two consecutive months over the limit triggers an automatic plan upgrade." plus "surge protection included"

That overage rule deserves its own note. It names the grace condition (`temporary`), quantifies the threshold (`two consecutive months`), and states the automatic consequence (`plan upgrade`) — three facts in seventeen words, disclosing an automatic charge increase without burying it. Most usage-metered products state the overage rate and omit the auto-upgrade trigger.

## T7 Error, failure & recovery

**Webflow runs a distinct interrogative `Quick help` genre, separate from its declarative reference articles** `[observed]`:

`Why is my domain stuck in an "Update pending" or "Update needed" status?` · `Why is my site down?` · `How do I manually migrate my DNS records?` · `How to update DNS records when migrating a live site to Webflow` · `What happens if I don't update my DNS settings by the deadline?` · `Fix the too many redirects error` · `Why can't I archive my site?` · `How do I unarchive my site?` · `Can I transfer a site with a paid Site plan to my client?` · `How to fix CMS Collection items not displaying on Collection pages` · `404 error page` · `Does Webflow support IPv6?`

Grammar shapes: `Why is/can't my X …?` (symptom-first, first-person possessive), `How do I X?`, `How to fix X`, `Fix the X error`, `What happens if X?`.

`What happens if I don't update my DNS settings by the deadline?` is the standout — a **consequence-of-inaction** article. Most help centres document what to do; very few document what happens if you do nothing, which is the question a user procrastinating on a migration is actually asking.

**Recovery vocabulary** `[documented]`: `Save and restore backups` · `Unlink instance` · `Reset name` · `Remove` · `Delete unused classes` · `Restore` · `Request refund`.

**Publishing-failure wording, status page** `[observed]`:
> "We're investigating reports of publishing attempts failing for some customers. Some customers may also experience issues when making new purchases or upgrading their plans."

And a deflection-with-ownership construction: **"The issue appears to be related to an upstream provider, and our team is actively investigating."** — it names the external cause and retains responsibility in the same sentence, which is the correct shape for a third-party dependency failure.

**Webflow thanks rather than apologises.** Incident copy is consistently `Thank you for your patience.` / `We appreciate your continued patience` / `We sincerely appreciate your patience while our team worked through this issue.` **The word "sorry" was not found anywhere in the harvested incident copy.** That is a deliberate register — and a debatable one, since gratitude for patience is not an acknowledgement of harm.

**Third-party degradation message on lesson pages** `[observed]`: `Trouble with this video? YouTube may be blocking it for you.` + `Watch it directly on YouTube`. Blame placed on the third party, remedy offered inline, in eleven words. Good practice for any embedded dependency.

**Fallback:** `Your browser doesn't support HTML5 video tag.`

**Form strings — and this one is a self-inflicted defect** `[observed]`: the `/courses` and `/glossary` filter forms ship `Thank you! Your submission has been received!` and `Oops! Something went wrong while submitting the form.` These are **Webflow's own stock template strings, unedited, on Webflow's own site**, attached to filter forms that submit nothing. The company that ships those defaults to 300,000+ brands did not replace them on its own education site.

## T8 Empty states `[observed]`

- `/courses`: `Hmm…we couldn't find any results. Reset the filters or try searching for something specific.` + button `Reset the filter`
- `/glossary`: `Hmm…we couldn't find any results. Try a different search term or reset the filter.` + button `Reset the filter`

Both use the same `Hmm…` opener — a non-apologetic, non-blaming interjection that reads as the product thinking rather than failing. Both then offer two recovery routes, which is right for a filtered list (broaden, or search differently).

**But the two diverge and neither agrees with its button.** `/courses` says "Reset the filters" (plural) while its button says `Reset the filter` (singular); `/glossary` says "reset the filter" (singular, matching). Two empty states from one component, one of which is internally inconsistent.

- status.webflow.com: `No incidents reported today.` / `No incidents reported.` / `No downtime recorded on this day.` / `No data exists for this day.` / `No incidents or maintenance related to this downtime.`
- University course sidebars: the `Assets & links` heading renders with **no content on 4 of the 6 courses fetched** — an unstyled empty section rather than an empty state.

## T9 Notifications & system messages `[observed]`

- Home announcement bar: `The biggest announcements from Webflow Conf '26 - Read the recap↗`
- **help.webflow.com live incident banner**: `Active incident` / `Investigating` / `Updated 1 minute ago` / `View updates` — the status page's lifecycle label surfaced directly into the help centre header, with a relative timestamp. Cross-surfacing an incident into the place users go when something is broken is the correct integration and is frequently missed.
- University: `Login with your Webflow account to track your progress`
- University prompt: `New to Webflow?` / `Get your bearings with an intro foundations course. No prior experience needed.`
- **Pricing upsell prompts use one consistent construction**: `Everything in Basic, plus:` · `Everything in Premium, plus:` · `Everything in Team, plus:` · `Everything in Starter, plus:` · `Everything in Core, plus:` · `Everything in Freelancer, plus:` — six instances, identical shape, so a buyer scanning the ladder never has to re-read a tier they already understand. Plus `Need more?` and `1 included`.
- **Help-article inline callout labels — a consistent four-type system**: `Note`, `Pro tip`, `Good to know`, `Requirements`. Four named severity/purpose levels, used consistently. (Riverside runs a comparable three-type system: `IMPORTANT:`, `NOTE:`, `TIP:`.)
- Cross-promo appended to help articles: `The Webflow Way — Want to learn best practices for how to get the most out of this feature? Check out The Webflow Way article on this topic.`
- Certification prompt: `Earn your badge` / `Prove your mastery of Webflow best practices and unlock a badge to showcase your expertise.`
- Feedback prompt: `Have feedback on The Webflow Way?` / `Share your thoughts`

## T10 Disclosures, legal & compliance

### Pricing footnotes `[observed]`

- `All prices in USD, per site, per month, plus applicable taxes at checkout.` (ecommerce)
- `All prices in USD, plus applicable taxes at checkout.` (Workspace)
- `Annual contract required` (Team plan)
- **`billed yearly` and `billed annually` both appear on the same page for the same concept**
- `Yearly (Save up to 40%)`
- `Covers temporary bandwidth spikes. Two consecutive months over the limit triggers an automatic plan upgrade.`
- Overage: `Then $2 per 1M; surge protection included` — and roughly twelve sibling variants (`Then $2 per 5 CPU hours`, `Then $2 per 500 MB`, `Then $2 per 50M`, `Then $2/GB`, `Then $2/200k`, `Then $2 per million`). **The same overage concept is expressed in at least four syntaxes**: `$2 per 1M`, `$2/100M`, `$2 per million`, `$2 / million requests`
- Certification: `The Webflow Practitioner Certification exam is $100 USD. In some countries and regions, additional taxes (such as VAT) may apply.`
- **Cancellation, verbatim and unhedged**: `Yes, but you'll still pay the remainder of the term for the plan you signed up for.`
- Export caveat: `Dynamic content must be exported on a collection-by-collection basis and forms will stop working.` and `Export clean, semantic HTML and CSS files for your dev team. Dynamic content (CMS items/pages) can't be exported.`
- **Lock-in stated plainly**: `No, you can only develop websites in Webflow. If you export your code, it can't be reimported.`

Those last two are the most admirable disclosures on the page. `forms will stop working` and `it can't be reimported` are the two facts a prospective customer most needs and a vendor least wants to volunteer, and both are stated in a pricing FAQ in plain declarative sentences with no softening.

### Plans and figures actually seen `[observed]`

**Site plans:** `Starter` (Free) · `Basic` ($15/mo billed yearly) · `Premium` ($25/mo billed yearly, badged `New`)
- Starter: `Webflow.io domain`, `Limited Webflow CMS`, `2 static pages`, `1 GB bandwidth`, `50 form submissions`, `Webflow AI`, `MCP server`, `Webflow Cloud app hosting`, `Free Starter Workspace`
- Basic: `Custom domain`, `300 static pages`, `10 GB bandwidth`, `Unlimited form submissions`, `Password protection`
- Premium: `Everything in Basic, plus:` `Webflow CMS`, bandwidth selector `50 GB`–`2.5 TB`, `Code components`, `Site search`, `Form file upload`, `Well-known files`

**Platform plans:** `Team` ($2500/mo, `Annual contract required`) · `Enterprise` (`Talk to us`, no price). **Defect: the `Team` card is rendered twice, identically.**

**Ecommerce:** `Standard` $29/mo (`500 ecommerce items`, `2% transaction fee`) · `Plus` $74/mo (`5,000 items`, `0% transaction fee`, `Unbranded emails`) · `Advanced` $212/mo (`15,000 items`, `0% transaction fee`).

**Workspace — "For teams":** `Starter` (Free: `2 staging sites`, `2 pages per staged site`, `50 CMS items per staged site`, `200 AI credits`, `1 full seat`) · `Core` ($19/mo: `10 staging sites`, `300 pages per staged site`, `300 AI credits`, `Custom code`, `Code export`, `Shared Libraries`) · `Growth` ($49/mo: `Unlimited staging sites`, `400 AI credits`, `301 redirects`, `Site-level roles`, `Publishing permissions`).

**Workspace — "For freelancers & agencies":** `Starter` (Free) · `Freelancer` ($16/mo: `1 free client seat per site`, `Client payments`) · `Agency` ($35/mo: `3 free client seats per site`, `Unlimited Shared Libraries`).

**Seats:** `Full` $39/mo ("Design full sites or manage admin settings.") · `Limited` $15/mo ("Edit content or build pages with components.") · `Free` $0/mo ("Invite reviewers and commenters from the team page."). **All three tiers, including the $0 one, carry the CTA `Buy seats`.**

**AI credits add-on:** `2,000 credits/mo` for `$20/mo billed yearly`.

**Bandwidth add-on ladder (annual / monthly):** +50 GB $20/$30 · +100 GB $40/$60 · +150 GB $60/$90 · +250 GB $100/$150 · +350 GB $140/$210 · +450 GB $174/$260 · +700 GB $274/$410 · +950 GB $374/$560 · +1.450 TB $574/$860 · +1.950 TB $774/$1,160 · +2.450 TB $974/$1,460. Note `+1.450 TB` uses a decimal point where the rest of the page uses comma separators, and the ladder skips +200 GB.

**Webflow Cloud usage:** `Web app bandwidth — Pooled with site bandwidth` · `Web app requests — $2 / million requests` · `Web app CPU usage — $2 / 5 hours of CPU usage`.

**Localize tiers:** `Localize Essential`, `Localize Advanced`, at `10K words per locale per month` / `50K words per locale per month`, with `Preview Localize for free`.

**The `Workspace plan` vs `Site plan` distinction is Webflow's single most-explained pricing concept**, and it gets the first FAQ slot: "What's the difference between a Workspace and a Site plan?" Two orthogonal billing axes — seats and staging on one, publishing and hosting on the other — is genuinely hard to explain, and Webflow's answer is to define both, then answer four follow-up questions about how they interact.

### Accessibility statement `[observed]` — the most honest in this batch

Structured in two halves, `Conformance status` and `Our accessibility efforts`, each split into the same scopes: (1) `Websites built by you in Webflow`, (2) `The Webflow product`, (3) `Webflow's own websites and webpages`, plus `Internal efforts at Webflow`.

**Scoping the statement by who built what is the right structure for an authoring tool** and almost nobody does it. A site builder has three distinct accessibility obligations — the output, the tool, and its own marketing — and conflating them is how authoring tools make claims they cannot support.

- Named accessible elements: `Tabs, Dropdown, Image, Text Link, Link Block, Button, Section, List, List Item, Collection List, Navbar, and Slider`; sites using them "conform to levels as high as WCAG 2.1 Level AA"
- Responsibility explicitly transferred: **"when building an accessible site, the power lies in the hands of the builder."**
- **The candid admission**: **"Currently, the Webflow Designer does not fully support assistive technology, and we continue to work to improve support."**
- Own sites: "We aim to adhere our websites … to WCAG 2.1 Level AA." Transcripts described as in progress: "In Webflow University, we're continually adding transcripts to all lessons, and we're adding alternative (alt) text to all images in articles."
- Feedback: `accessibility@webflow.com`, plus the `Webflow Forum` and `Webflow Wishlist`
- Sibling pages: `Accessibility at Webflow`, `Statement`, `Checklist`

A visual design tool stating in public that it does not fully support screen readers is a real disclosure with a real cost, and it is more useful than a conformance badge.

**Staleness defect** `[observed]`: the page still says "We plan to share more specific information on our progress in the latter half of 2021" and references "Starting in January 2021", unchanged on a page footered `© 2026 Webflow, Inc.` It also links to `forum.webflow.com` while the rest of the site has migrated to `community.webflow.com`. A five-year-old commitment to provide an update, still displayed as forthcoming, undercuts the candour it sits beside.

### AI wording `[observed]`

`AI credits` are defined in the glossary as "the metered unit used to track usage of AI-powered features, with usage typically visible by user, project, or date range." `Agent Instructions` are "skills and rules that tell an AI agent how to work within a Webflow site or Workspace."

The governance framing is the notable part. The course `AI guardrails for teams` is described as: **"Manage team AI access, understand the reach of AI-assisted changes, and review what changed before your site goes live."** Three verbs — manage, understand, review — aimed at a *team lead*, not at the person using the AI. Homepage: "Build and manage your sites with AI tools like Claude and Cursor, without sacrificing the control and governance you need at scale."

Webflow sells AI to the person who is worried about AI. `understand the reach of AI-assisted changes` is a blast-radius concept, and `review what changed before your site goes live` names a gate. No other product in this batch frames AI adoption as a control problem.

## T11 Help-centre architecture `[observed]`

**Fifteen top-level categories:** `Getting started` · `AI` · `Accounts & Workspaces` · `Billing, plans, & pricing` · `Design & accessibility` · `Enterprise features` · `Hosting & domains` · `Site management & SEO` · `CMS & dynamic content` · `Analyze` · `Optimize` · `Localize` · `Forms & Logic` · `Ecommerce & User Accounts` · `Marketplace & integrations`

`Design & accessibility` as a single paired category is a deliberate statement — accessibility is not a separate concern to be found under compliance, it sits with design. Its sections: `Components` · `Accessibility` · `Layout & design` · `Interactions & animations` · `Custom Code` · `Elements` · `Pages` · `Fonts`.

Other sections observed: **Hosting & domains** → `Quick help` · `Hosting` · `Domains`. **Site management & SEO** → `Site Management` · `Site Settings` · `SEO` · `Collaboration` · `Quick help`. **CMS & dynamic content** → `Collections & items` · `Collection fields` · `Collection lists & pages` · `Quick help`.

**`Quick help` recurs as a section inside multiple categories** — the interrogative troubleshooting genre gets a reserved slot per domain rather than a single global troubleshooting bucket. That is the right call for a product where "why is my site down" and "why can't I archive my site" belong to different mental contexts. **But the cross-cutting `Quick Help` hub page renders as nine empty headings with zero links** — the page that would make the pattern navigable is broken.

Casing is inconsistent at the same nav level: `Custom Code`, `Site Management` and `Site Settings` are Title Case while `Layout & design`, `Interactions & animations`, `Collections & items` and `Collection lists & pages` are sentence case.

**Article-title grammar — eight shapes:**
1. Bare noun / feature — `Grid`, `Typography`, `Outlines`, `Comments`, `Page building`, `Style labels`, `Href prefix`, `Creator Credits`, `Grid areas`, `Overflow: hidden`
2. `X overview` — `Components overview`, `Collection items overview`, `Style panel overview`, `DevLink overview`, `Fractional unit overview`, `Webflow Localize overview`
3. `Intro to X` — `Intro to the Webflow CMS`, `Intro to Webflow Analyze`, `Intro to Webflow Optimize`, `Intro to Interactions with GSAP`
4. Bare imperative — `Add Google Fonts`, `Set robots.txt rules`, `Limit Collection lists`, `Nest components`, `Use unique element IDs`, `Use responsive text sizes`, `Use thoughtful motion and animation`, `Password protect your site or web pages`, `Migrate your site from WordPress to Webflow`
5. Gerund — `Building web layouts`, `Using a design system in Webflow`, `Understanding per page JavaScript…`
6. `X vs. Y` — `Dynamic vs. curated Collection lists`, `Interactions with GSAP vs. Classic Interactions`
7. Question form — reserved for `Quick help`
8. `Manage X` / `Set up X` / `Fix X`

**`Intro to X` is used in both the University and the Help Center for the same concepts** — `Intro to the Webflow CMS` exists as a lesson and as an article. That is the mechanism by which the two properties stay aligned: the University teaches the concept in video, the Help Center teaches the same concept in prose, under the same title. A learner who cannot watch a video has a textual path with the same name.

Every article carries an `Updated <Month DD, YYYY HH:MM>` timestamp, a `Requirements` block, and closing sections `Required plans` / `Required permissions` / `Related articles`. **`Required plans` and `Required permissions` as standard article furniture is excellent** — it answers "can I even do this?" before the reader invests in the procedure. (Riverside's `Who: / Plan: / Device:` tri-line does the same job at the top rather than the bottom; the top is better.)

## T12 FAQs

**`webflow.com/pricing`, group `Workspace and Site plans`:**
1. `What's the difference between a Workspace and a Site plan?`
2. `How many Workspaces can I have?`
3. `How many paid Site plans can I have in my Workspace?`
4. `Can I cancel my Site and/or Workspace at any time?`
5. `What is a Platform plan?`
6. `What Premium plan add-ons are available?`

**Group `Capabilities and support`:**
7. `What kind of support does Webflow offer?` (email support with a 48-hour target, plus Help Center, University, Community)
8. `Can I host my website somewhere else?`
9. `Can my clients or coworkers upload their own content?`
10. `How much traffic can Webflow hosting handle?`
11. `How does Webflow Cloud pricing work?`
12. `Can I import my website or my code?`
13. `Are Webflow websites SEO-friendly?`
14. `Does Webflow have an API?`
15. `How much does a Webflow Certification exam cost?`

**Two groups, and the split is the pattern worth noting**: the first six are *how the billing model works*, the last nine are *what the product can and cannot do*. Q8 and Q12 are the exit questions — can I leave, can I bring something in — and both are answered against Webflow's commercial interest (Q12: "No"). A pricing FAQ that answers the lock-in question honestly in the second group is making a credibility trade, and it is the right one for a platform asking for a $2,500/month Team commitment.

Q15 sits on the pricing page because certification is a separately-priced product — the education surface has its own line item.

**`help.webflow.com` `Common questions` heading renders with no questions under it** — a second broken block on the help home, alongside the empty `Quick Help` hub.

## T13 Terminology & glossary — PRIORITY

Webflow's vocabulary problem is the inverse of CapCut's and VEED's. Those products have inconsistent names for stable concepts. Webflow has **stable names for concepts it invented**, plus **three generations of renames whose old names survive in URLs**, plus **two glossary entries that define the wrong concept entirely**.

Capitalisation below is exactly as Webflow renders it. "WF" = Webflow coinage or Webflow-specific redefinition.

### Workspace / account layer

| Term | Maps to |
|---|---|
| `Workspace` (WF) | Tenant container: "A Workspace is a space where you stage sites — and where you can invite teammates and clients to work on sites together." |
| `Workspace plan` vs `Site plan` (WF) | Two orthogonal billing axes — seats/staging vs publishing/hosting |
| `Platform plan` (WF) | Bundle of "a site, Workspace, add-ons" |
| `Full seat` / `Limited seat` / `Free seat` (WF) | Permission tiers, each defined by the action it permits |
| `Client seat` (WF) | Seat used by an agency's client |
| `Agency/freelancer guests` (WF) | Free non-seat collaborators |
| `Client payments` (WF) | "hand off site billing to your clients" |
| `AI credits` (WF) | Metered AI usage unit |
| `Staging site` (WF) | An unpublished site counted against Workspace limits |

### Designer / canvas layer

| Term | Maps to |
|---|---|
| `Designer` (WF) | The visual CSS/HTML authoring app |
| `Webflow Canvas` / `canvas` (WF) | The live-rendered editing surface — **and a status-page component, and a standard HTML term.** The glossary's `Canvas` entry defines only the HTML5 `<canvas>` tag, not Webflow's canvas. A collision Webflow created and did not resolve |
| `Component Canvas` (WF) | "Designing a main component (and component variants) outside the page" |
| `Editor` (WF) | Content-editing mode; the *role* is now `Content editor` |
| `Build mode` (WF) | Marketer-facing page-building mode |
| `Navigator` / `Navigator panel` (WF) | Visual DOM tree |
| `Add panel` / `Add elements panel` (WF) | Element library — **two names for one panel**, glossary vs lesson title |
| `Style panel` (WF) | CSS property editor |
| `Style selectors panel` (WF) | Site-wide list of "classes, combo classes, and tags"; opened with the `"three droplets"` icon or `G` |
| `Selector field` (WF) | Where a class is applied |
| `Basic section` (WF) | "A section of the Add panel that contains the elements that act as a website's fundamental building blocks (e.g., div block, list, button, etc.)" |
| `Component Module` (WF) | "A section in the Add Panel that houses pre-built Webflow elements such as sliders, tabs, and lightboxes." — **glossary slug is `/widgets-module`** |

### Structure and styling layers

| Term | Maps to |
|---|---|
| `Element` | An HTML element as a draggable object |
| `Section` / `Container` / `Div block` | Webflow packaging of `<section>`, a max-width wrapper, and `<div>` — the three the `Section vs. Container vs. Div` lesson exists to separate |
| `V flex` / `H flex` (WF) | "a div block that uses preset vertical [or horizontal] flexbox display settings" |
| `Quick Stack` (WF) | "uses CSS grid and has cells made of div blocks that use preset vertical flexbox display settings"; `8 presets` |
| `Columns` (WF) | "sections of content that sit side by side … **like the columns in newspapers**" — **the one genuine simile in the glossary** |
| `Body` | Root element; "the ancestor of all elements on the Designer canvas" |
| `Bounding box` (WF) | Editor-time element outline |
| `Breakpoint` / `main breakpoint` | Responsive viewport threshold |
| `Cascading rules` (**WF redefinition**) | "The order in which a Webflow site's CSS styles flow from desktop to mobile breakpoints" — *breakpoint* inheritance, not CSS specificity |
| `Class` | CSS class — **but the glossary gives the OOP definition** |
| `Combo class` (WF coinage) | "combines multiple classes" = a chained class selector |
| `Global class` (WF coinage) | A reusable class not scoped to a combo |
| `Style selector` / `Style selector types` (WF) | Umbrella for "classes, combo classes, and tags" |
| `Nested tag` (WF) | Descendant tag selector scoped to a class |
| `Common targets` (WF) | "All elements on the page targeted by the same selector." |

### The component layer, and the renames

| Term | Note |
|---|---|
| `Component` / `Main component` / `Component instance` | "The component definition, including structure, styles, and configurability." / "An individual references to a main component." *(sic — grammar defect, live)* |
| `Properties (props)` (WF, borrowed from React) | "let you define specific elements within a component that can be modified with unique values on a component instance" |
| `Slots` (WF, borrowed from web components) | "placeholders for other components" |
| `Variants` / `Unlink instance` | Predefined options; detach from main |
| **`Symbol` → `Component`** | **No occurrence of `Symbol` was found anywhere on the pages harvested.** Migration appears complete on public surfaces. *Caveat: only glossary page 1 was read, so a `Symbol` entry further into the alphabet cannot be ruled out.* |
| **`Widgets module` → `Component Module`** | Renamed; the old name survives in the URL `/glossary/widgets-module` |
| **`Interactions 1.0` → `Classic Interactions` → `Interactions with GSAP`** | **Three generations visible simultaneously**: `Legacy Interactions 1.0`, `Interactions with GSAP vs. Classic Interactions`, `Intro to Interactions with GSAP` — with no single disambiguation page surfaced in the category listing |
| **`Dynamic list` → `Collection list`** | Renamed; old names survive in URLs — `/glossary/dynamic-list`, `/glossary/dynamic-list-limits`, `/glossary/dynamic-list-layout` |
| **`project` → `site`** | Mostly migrated but leaking: `Migrate CMS Collection content to another project`, `Clone the completed project`, and the glossary's `AI credits` entry says usage is "visible by user, project, or date range" |

**The rename record is the most instructive part of this section.** Webflow has renamed at least four core concepts, and in every case the old name survives in a URL slug while the new name is displayed. That is the correct trade — breaking a URL costs SEO and inbound links, so the slug is frozen and the label moves — but it produces a durable archaeological layer that anyone auditing the vocabulary will trip over. `Interactions` is the worst case: three names are live simultaneously and two of them (`Legacy Interactions 1.0`, `Classic Interactions`) both mean "the old one".

### CMS and publish layers

`CMS Collection` / `Collection` ("A content type (blog posts, recipes, etc.) represented by a group of fields you define") · `Collection item` ("An individual item within a Collection") · `Collection field` · `CMS field groups` ("named, labeled sections") · `Collection list` ("a Webflow element that lets you dynamically display content from a CMS Collection") · `Collection list layout` (`2, 3, 4, or 6 columns`) · `Collection limits` · `CMS Collection page` ("A dynamic page that Webflow automatically creates for each Collection item") · `Collection URL` · `Collection page template` · `Dynamic vs. curated Collection lists` · `Conditional visibility` · `Static content` vs `dynamic content`.

The CMS naming is Webflow's cleanest system: **one root noun (`Collection`) with four consistent compounds** (item, field, list, page). A learner who acquires `Collection` gets the other four for free. Compare the styling layer, where `class`, `combo class`, `global class`, `style selector`, `nested tag` and `common targets` are six terms with no shared root.

Publish layer: `Publish` / `Publish to select domains` · `Webflow staging subdomain` · `Custom staging domain` · `private staging` · `branch staging subdomain` · `Page branching` ("a safe space to design without affecting the original page"; `branch`, `merge`, `Resolve conflicts`) · `Site Activity log` · `Scheduled publishing` · `Single-page publishing` · `Creator Credits` · `Webflow branding` · `Cloneable site` ("open source (made available under the CC0 (\"no rights reserved\") license)") · `Made in Webflow` · `Libraries` / `Shared Libraries` / `Starter Library` · `Webflow Cloud` · `DevLink` / `DevLink Export` · `Code components` / `AI code components` · `MCP` / `Webflow MCP` / `MCP Server` · `Agent Instructions` · `AEO` ("Answer Engine Optimization") · `Analyze` / `Optimize` / `Localize` / `Source` · `The Webflow Way` · `Webflow Practitioner Certification`.

**And one genuine curiosity:** `Automagically` has its own glossary entry — "describes complex content or functions that appear as if they were created using magic." Webflow has formally defined a jargon word in the glossary it uses to teach beginners professional vocabulary.

## T14 Voice, tone & accessibility

**Person and register.** Second person throughout (`you`, `your site`, `your team`), first-person plural for Webflow (`we recommend`, `our team is actively investigating`). Marketing uses imperative headlines almost exclusively. University uses **future-perfect learner framing**: `By the end of this course, you'll know:` and `By the end of this course, you'll have the skills to:` — **two different formulations of the same slot across sibling courses**, which is the kind of drift that matters in a curriculum, because the two promise different things (knowledge vs capability).

**Does it apologise for complexity? No — it reframes.** The nearest thing is the "tough transition" sentence and the permissive `Ultimately, your layout design decisions are up to you`. In incidents it thanks rather than apologises.

**Jargon-introduction habit is strong and consistent.** Nearly every acronym or term is expanded at first use: `A Content Management System (CMS) lets you…` · `Properties (props)` · `AEO (Answer Engine Optimization)` · `Authoring Tool Accessibility Guidelines (ATAG)` · `Asynchronous JavaScript and XML (AJAX)` · `Using Cloudflare Orange-to-Orange (O2O)` · `Cloneable sites are open source (made available under the CC0 ("no rights reserved") license)`.

Help articles also gloss with `(i.e., …)` and `(e.g., …)` at very high frequency — `selectors (i.e., classes, combo classes, and tags)`, `individual entries (i.e., individual entries, like a single blog post)`. The habit is correct in principle and **over-applied to the point of redundancy**; that second example glosses a phrase with itself.

**UI-object naming convention in docs — a genuinely distinctive house style** `[observed]`. Panels and buttons are bolded and named as proper nouns (`**Components panel**`, `**Style panel**`, `**Site settings** > **Publishing** tab > **Staging**`). Icons that carry no label are **quoted descriptively rather than named**: the `"three droplets"` icon, `"wrench"`, `"trash"`, `"broom"`, `"plus"`, `"arrow"`, `"list"`, the `"more options"` dots, `"new component"`, `"edit component"`, `"open component"`, `"back"` arrow.

That convention solves a real documentation problem — how do you tell a user to click a thing that has no name? — and Webflow's answer is to describe the glyph in quotation marks, consistently, so the quotes signal "this is what it looks like, not what it is called". It is directly copyable by any team documenting an icon-dense interface.

**Accessibility** `[observed]`:
- Skip links present: `Skip to Main Content` (webflow.com, `#main`) and `Skip to main content` (help, `#main-content`) — **inconsistent casing across properties**, and **no skip link was found in the extracted content of university.webflow.com**
- University exposes an explicit in-nav `Accessibility` group with `Switch to Light mode`, `Switch to Dark mode`, `High contrast` — rare and commendable
- **Alt text is uneven.** Good descriptive examples: "Linda Tong presents the opening keynote at Webflow Conf '26." · "Glowing green panel with a document icon, part of a series of dark glassmorphic panels receding into the background." · "Purple CMS symbol (deconstructed stack of cylinders) overlaid on MCP icon." · "Badge that reads, \"Proud to build the Webflow Way.\"" · "Video frame of Sophia Silver giving an overview of the Webflow Way." But **large numbers of decorative and content images on the home page, pricing page and University carry empty alt**, including several customer-logo images, every `#MadeinWebflow` showcase thumbnail, and all University course thumbnails on `/courses`
- **Video captions and transcripts are not available on the public lesson pages fetched.** Lessons embed `youtube-nocookie.com/embed/…` or Vimeo with no transcript text in the page. The accessibility statement confirms this is a known gap: "we're continually adding transcripts to all lessons." **For a curriculum that is video-first, the absence of transcripts is both an accessibility gap and the reason this harvest could not capture the actual teaching**
- `Trouble with this video? YouTube may be blocking it for you.` is a thoughtful degradation message
- **Accessibility is also taught as content** — course `Accessibility on the web` ("Learn about accessibility on the web and how to create inclusive and accessible sites without writing code." Intermediate, 39m); lesson `Site build: Design review & accessibility` (`16:11`); help section `Accessibility` with articles `Text zoom preview tool`, `Use responsive text sizes`, `Use unique element IDs`, `Use thoughtful motion and animation`, `Ensure your text meets color contrast standards`; and a homepage claim "Adapt designs for reduced motion so sites are accessible."

**Negative findings, recorded honestly**

- **Unresolved template variables shipped to production**: `Components overview` and `Intro to the Webflow CMS` render the literal strings `wfw-design-systems` and `wfw-cms` under `Requirements`, `Required plans` and `Required permissions` — raw feature flags as user-facing text
- **Empty required-field headings** on `Building web layouts` and `Style selectors panel`
- Grammar errors in the Components doc: `An individual references to a main component.` and `choose which which variant to use`
- **Duplicate `Team` plan card** on /pricing
- **Glossary `Class` gives the OOP definition**, actively misleading for the primary learner audience
- **Glossary `Canvas` defines the HTML5 tag only**, colliding with Webflow's own product noun
- Same control, two labels: `Continue to next lesson →` vs `Complete & continue →`
- Same action, three labels: `Read the story` / `Read story` / `Read customer story`
- Same panel, two names: `Add panel` vs `Add elements panel`
- **`Buy seats` CTA on the `$0` Free seat tier**
- `billed yearly` and `billed annually` used interchangeably; overage in four syntaxes; `+1.450 TB` decimal vs comma; ladder skips `+200 GB`
- **Lowercase brand in a section heading**: `What marketing teams love about webflow`
- **Stray `Coming soon` string on every lesson row** of every course table of contents, on fully published courses
- **`Quick Help` hub page is empty** — nine headings, zero links
- **`Common questions` heading on the Help Center home has no questions under it**
- **Empty `Assets & links` section** on 4 of 6 University course sidebars
- **Accessibility statement is stale** — promises a progress update "in the latter half of 2021" on a 2026 page, and links to the retired `forum.webflow.com`
- `Interactive learning` / `Interactive Learning` casing differs between desktop and mobile nav on one page
- Help Center section casing mixed at one nav level
- Dead and placeholder links: `Try Webflow — it's free` on University points to `#`; multiple home feature cards have empty `<>` hrefs; `Business Value Calculator` links to `#`
- Wrong CTA on card: `Explore collaboration` on a Design card and on two customer-story cards
- Legacy slugs contradict current terms: `/glossary/dynamic-list` titled `Collection list`; `/glossary/widgets-module` titled `Component Module`
- Empty-state copy diverges between /courses and /glossary with a singular/plural mismatch against the shared button
- Two different "by the end of this course" formulations across sibling courses
- **Stock Webflow form strings unedited on Webflow's own site**: `Thank you! Your submission has been received!` / `Oops! Something went wrong while submitting the form.`

---

## Transferable patterns

1. **Name the prior mental model as the obstacle.** "If you're used to working with static design tools that let you drag and drop elements anywhere, building for the web can be a tough transition." The difficulty is located in a *habit*, not in the learner and not in the subject. This is the single most reusable sentence in the batch for any product asking a professional to unlearn something — a designer learning constraints, an accountant learning double-entry in a new system, a developer learning a new deployment model.
2. **Teach the spatial model before the underlying technology.** The box model is lesson 3 of Webflow 101, before `Intro to HTML` and `Intro to CSS`. Order the curriculum by *what the user manipulates*, not by what the system is built from. Condition: only correct where the abstraction genuinely holds — teaching the wrong-but-useful model first creates debt if the leak is common.
3. **`Review: X` as a named, timed, visible lesson at every module boundary.** Two to three minutes, titled in the table of contents so the learner sees the rhythm before starting. Consolidation as a first-class unit rather than a paragraph at the end of the last lesson.
4. **Pre-package the hard concept behind a named object, then teach the property afterwards.** `V flex`, `H flex`, `Quick Stack` let a learner ship flexbox and grid layouts before understanding either. Available only to a product that owns the abstraction — but where you own it, naming it is cheaper than explaining it.
5. **Give the default, then return authority.** "We recommend you use Quick Stack for most layouts" followed by "Ultimately, your layout design decisions are up to you." Serves the learner who wants instruction and the one who wants agency, in two sentences.
6. **Ship a `X vs. Y` lesson wherever you shipped overlapping primitives.** `Section vs. Container vs. Div`, `Flexbox vs grid vs Quick Stack`. An arbitration lesson is the honest response to an ambiguous product surface — and its existence in the table of contents is a signal to the product team about where to simplify.
7. **Scope an accessibility statement by who built what.** Three separate conformance claims — sites built by users, the product itself, the company's own marketing — and a candid admission on the middle one ("the Webflow Designer does not fully support assistive technology"). Any authoring, embedding or white-label product has the same three-way obligation and almost all of them conflate it.
8. **Answer the exit question in the pricing FAQ.** "If you export your code, it can't be reimported." / "forms will stop working." Volunteering the lock-in facts costs a small number of deals and buys the credibility needed to ask for a $2,500/month commitment.
9. **Quote unlabelled icons descriptively rather than naming them.** The `"three droplets"` icon, `"broom"`, `"wrench"`. The quotation marks signal *appearance, not name* — a consistent convention for documenting an icon-dense UI.
10. **`Required plans` / `Required permissions` as standard article furniture.** Answer "can I even do this?" before the procedure. Riverside's `Who: / Plan: / Device:` at the *top* is the better placement of the same idea.
11. **Surface the status-page incident into the help centre header.** `Active incident` / `Investigating` / `Updated 1 minute ago` / `View updates` — placed where users go when something is broken, not only on a page they must know to visit.
12. **Anti-pattern: freeze slugs, move labels, and you get a durable archaeology.** Four renames, four surviving old slugs, and three simultaneous live names for Interactions. The trade is correct; the mitigation (one disambiguation page, surfaced in the category listing) is missing.

## Caveats & gaps

- **University lesson pages are video shells with no transcripts.** This is the central limitation of this harvest. The analogies, metaphors and actual explanation of the box model, inheritance and combo classes live in video narration and are not retrievable by the permitted tools. Everything in T4(c) comes from lesson descriptions, course objectives, the glossary and the parallel Help Center articles. **The claim "no textual metaphor was found" is bounded to the text; the videos may be full of them.**
- **The glossary is paginated and only page 1 was harvested** (`404 page` → `CRLF`). Terms from D through Z are uncaptured — including `Designer`, `Editor`, `Flexbox`, `Grid`, `Interactions`, `Publish`, `Slug`, `Style panel`, `Staging` and `Variables`. **The finding that `Symbol` no longer appears anywhere cannot be fully verified** for this reason.
- **`webflow.com/terms` and the hosting/publishing terms were not fetched.** No data on them here.
- **`university.webflow.com/interactive-learning`, `/videos`, `/certifications` and `/resources` were not fetched**; their structure is known only from nav labels.
- **No public content or brand style guide was found.** The closest artefact is `The Webflow Way`, which is a *product best-practice* curriculum (topics: Design systems, CMS, SEO, Localization, Optimize & Analyze, Collaboration), authored by named Webflow PMs and designers, carrying an exam and a badge — not a content style guide.
- **In-product states are documented, not observed.** Publish states, draft states, branching, component-instance highlighting and all empty states are reconstructed from help articles. Marked `[documented]` throughout.
- **Only ~70 help-article titles were captured** across six category and section pages; the full Help Center inventory is larger.
- **Status-page incident copy is represented by three historical incidents.** The live register during an active incident was not observed.
- **Course assessment content was not reached.** `Test your knowledge` and the certification exam sit behind login, so the question grammar of Webflow's assessments — potentially the richest concept-testing artefact — is unharvested.

## Sources

1. https://webflow.com/
2. https://webflow.com/pricing
3. https://university.webflow.com/
4. https://university.webflow.com/courses
5. https://university.webflow.com/learning-paths
6. https://university.webflow.com/glossary
7. https://university.webflow.com/courses/webflow-101
8. https://university.webflow.com/courses/build-and-structure-your-site
9. https://university.webflow.com/courses/lay-out-style-your-site
10. https://university.webflow.com/courses/css-layout-and-positioning
11. https://university.webflow.com/courses/cms-and-dynamic-content
12. https://university.webflow.com/courses/getting-started-with-webflow
13. https://university.webflow.com/course-lesson/css-layout-intro-to-the-box-model
14. https://university.webflow.com/course-lesson/lay-out-style-working-with-classes
15. https://webflow.com/webflow-way
16. https://help.webflow.com/hc/en-us
17. https://help.webflow.com/hc/en-us/articles/33961307099027-Intro-to-the-Webflow-CMS
18. https://help.webflow.com/hc/en-us/articles/33961365722899 — Style selectors panel
19. https://help.webflow.com/hc/en-us/articles/33961378749715 — Building web layouts
20. https://help.webflow.com/hc/en-us — Components overview, plus category and section pages for Design & accessibility, Hosting & domains, Site management & SEO, CMS & dynamic content, and the Quick Help hub
21. https://webflow.com/accessibility/statement
22. https://status.webflow.com
