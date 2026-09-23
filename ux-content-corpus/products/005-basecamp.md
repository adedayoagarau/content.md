# 005. Basecamp

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Project management for small teams and client work / opinionated all-in-one project hub (37signals) |
| Primary URL | https://basecamp.com/ |
| Corpus rank | 005 |
| Benchmark strength (source list) | Plain-language project organization |
| Locale / market observed | en-US only (no locale switcher; a help article titled `Using Basecamp in other languages` exists, so localisation is a supported condition rather than a site feature) |
| Platform observed | Web (desktop), Help Scout-hosted help centre, Atlassian Statuspage, support form, accessibility page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **WCAG 2.2 level AA** stated as the accessibility target with a documented testing process; 501(c)(3) non-profit and educational discount programmes with named eligibility evidence; self-owned hardware across multiple data centres (explicit cloud-exit posture); policies hosted at the parent company (`37signals.com/policies`). No SOC/ISO/HIPAA claims surfaced on the pages harvested |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Full for public surfaces. T6 and T8 are thin by product design rather than by harvest failure — Basecamp deliberately ships almost no status vocabulary (see T6), which is itself the finding |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://basecamp.com/ | Hero, a signed letter from the CEO, customer quotes, usage statistics, service and infrastructure sections |
| Pricing | https://basecamp.com/pricing | Five plans, per-bullet `?` tooltips, 8-question FAQ **with answers present** |
| Features | https://basecamp.com/features | Sixteen feature sections, each a headline + one paragraph |
| Hill Charts | https://basecamp.com/hill-charts | **Highest-value page** — a full conceptual model for progress reporting, argued rather than described |
| Support | https://basecamp.com/support | Contact form with a first-person issue-type picker — richest T5 source |
| Accessibility | https://basecamp.com/accessibility | Ten-point published accessibility process |
| Help version router | https://basecamp.com/help | One question, three answers |
| Help centre home (BC5) | https://5.basecamp-help.com/ | Seven categories with article counts and scope lines |
| Help category: Getting Started | https://5.basecamp-help.com/category/1053-getting-started | Six articles, role-split |
| Help category: Using Basecamp (p1) | https://5.basecamp-help.com/category/1041-using-basecamp | 20 article titles |
| Help category: Using Basecamp (p2) | https://5.basecamp-help.com/category/1041-using-basecamp/2 | 14 more titles |
| Help category: Troubleshooting & FAQs | https://5.basecamp-help.com/category/1042-troubleshooting-faqs | Nine articles |
| Status page | https://www.37status.com/ | Eight products; a full scheduled-maintenance narrative |

---

## T1 Navigation & IA labels

**There is no conventional nav.** `[observed]` Basecamp's header carries three items — `Have an account? Sign in` · `Want an account? Sign up free` · `Menu` — and the menu expands to seven links. No dropdowns, no mega-menu, no Products/Solutions/Resources tripartite.

**The two sign-in/sign-up labels are the pattern worth stealing.** `Have an account? Sign in` and `Want an account? Sign up free` are the only pair in this five-product corpus that **disambiguate the two by asking the user a question first**. Every other product ships bare `Log in` / `Sign up` and leaves the returning-versus-new distinction to the user's recall of which they are. Four extra words remove the most common first-click error on a SaaS homepage.

**Menu items carry a descriptive second clause, joined by an em dash** `[observed]`

| Item | Second clause (verbatim) |
|---|---|
| `Pricing & sign up` | "A free plan + paid upgrades" |
| `Basecamp 5 is here` | "A massive upgrade for 2026" |
| `Features` | "Remarkably simple, surprisingly capable" |
| `Paths` | "Why so many switch to Basecamp" |
| `API, CLI, Skills` | "Developer tools, AI Agent-ready" |
| `Reliable to the core` | "A multi-decade track record" |
| `Thousands of people in Basecamp now` | (expands to "Thousands of people are working in Basecamp right now") |

Same label-plus-gloss construction as Notion, Slack and Asana — but here **three of seven menu labels are themselves sentences rather than nouns** (`Basecamp 5 is here`, `Reliable to the core`, `Thousands of people in Basecamp now`). The nav is written as claims, not as a taxonomy. `Features — Remarkably simple, surprisingly capable` is the product's entire positioning in four words, placed in a menu.

`Paths` is the one opaque label, rescued entirely by its gloss ("Why so many switch to Basecamp") — without it, `Paths` means nothing.

**The footer is the actual IA, and it is a reading list** `[observed]`

Thirty-five links, unsectioned, ungrouped, in one run. Almost none are named for their content type:

`Basecamp 5 is here` · `Bring your AI agents to Basecamp` · `Where we came from` · `Features and benefits` · `Reliable to the core` · `Friendly folks, standing by` · `The people's path to Basecamp` · `Apps for every platform` · `Integrations` · `What changed for the better?` · `Learn Basecamp` · `With Basecamp, it's a Yes!` · `Come small, come all` · `We stand with the underdogs` · `Leaving the Cloud` · `How we make decisions` · `Group chat problems` · `Why we choose profit` · `Seven shipping principles` · `How we communicate` · `Night & day` · `Bootstrapped, profitable, & proud` · `Basecamp community` · `Free live classes` · `Books we've written` · `Kill overkill` · `Breakfast with Basecamp` · `Basecamp help` · `Discounts` · `Basecamp accessibility` · `Keyboard shortcuts` · `Can we stay in touch?` · `See where projects really stand` · `Getting Real` · `Shape Up` · `Manager Playbook` · `Employee Handbook`

**Every link is written as a phrase rather than a label.** `Where we came from` instead of "About". `Friendly folks, standing by` instead of "Support". `What changed for the better?` instead of "Customers". `Can we stay in touch?` instead of "Newsletter". `See where projects really stand` instead of "Hill Charts". Four of the thirty-five are questions.

This is the most distinctive IA decision in the corpus, and it cuts both ways. **The gain:** each link states its proposition, so a browsing reader knows why they would click. **The cost:** none of them is scannable for a user with a task. A user looking for pricing information finds `Discounts` and `Pricing & sign up` in two different places; a user looking for security finds `Security` only in the sub-footer. And a screen-reader user tabbing a link list hears thirty-five sentences instead of thirty-five labels.

It also means the footer contains **eight links that are not about Basecamp at all** — `Why we choose profit`, `How we make decisions`, `Seven shipping principles`, `How we communicate`, `Bootstrapped, profitable, & proud`, `We stand with the underdogs`, `Getting Real`, `Shape Up`, `Employee Handbook`. The footer of a project-management product is substantially a publisher's backlist. That is the company's strategy made structural: 37signals sells software by selling a worldview, and the IA carries the worldview.

**Sub-footer holds the functional links** `[observed]`: `Status` · `Support` · `Policies` · `Privacy` · `Security` · `Reliability` · `Sign in`. Seven conventional labels, quarantined from the thirty-five rhetorical ones. So the site does have a conventional IA — it is just demoted below the essay list.

**Help centre — seven categories, each with a scope line and an article count** `[observed]`

| Category | Scope line | Count |
|---|---|---|
| `Getting Started` | "Quick starts for those new to Basecamp" | 7 articles |
| `Using Basecamp` | "Every Feature, In Detail" | 34 articles |
| `Working With Your Team` | "Collaborating with your team and clients" | 18 articles |
| `Account, Billing, & Settings` | "For Admins and Account Owners" | 15 articles |
| `Personal Settings` | "Profile, appearance, notifications" | 8 articles |
| `Apps & Integrations` | "Mobile apps and extras" | 7 articles |
| `Troubleshooting & FAQs` | "Solving common problems" | 9 articles |

**Publishing the article count on every category is the useful move** — the reader can tell before clicking whether a category is a deep well (34) or a short shelf (7), and it sets expectations about how much is documented. Two of the scope lines name an *audience* rather than a subject (`For Admins and Account Owners`), which is the right disambiguation for the category most likely to be entered by the wrong person.

`Every Feature, In Detail` is Title Case where the other six are sentence case — one casing slip in seven.

**Defect:** the index says `Getting Started` has **7 articles**; the category page lists **6**. A count that is wrong is worse than no count.

**A second collection sits alongside the help docs** `[observed]`: `Learning Center` with three categories — `The 37signals Way` (6 articles), `Field Guides` (5), `Classes` (1, glossed "Learn Basecamp through live classes, Office Hours sessions, and short video tutorials"). Separating **how to operate the software** from **how to work** into two named collections is a real structural distinction, and `The 37signals Way` is the company's methodology shipped inside its own help centre.

Note the category slug and the label disagree: `The 37signals Way` lives at `/category/1124-the-basecamp-way` — a rename caught mid-flight.

**Help version router** `[observed]`: `basecamp.com/help` is a single page with one H1 — **`Which version of Basecamp can we help you with?`** — and three buttons: `Basecamp 5` · `Basecamp 2` · `Basecamp Classic`, each pointing at a separate help domain.

An entire page whose only job is to ask one disambiguating question. For a product with three concurrent live versions across two decades, this is the correct first question, and asking it explicitly is better than guessing from the user's session. The routing question is in the first person plural and the second person ("can *we* help *you*"), which keeps a dead-simple router from reading as a gate.

Note the first button's label renders as `Basecamp 5 Basecamp` — the version name followed by a bare product name, a duplication artefact in the button markup.

## T2 Value proposition & headline patterns

**Hero — a definition by negation** `[observed]`

> `Basecamp is project management without all the nonsense. Rock solid and famously easy to use.`

Two sentences, both claims, no verbs of benefit. The first defines the product by **what it has removed** ("without all the nonsense") rather than what it adds — a positioning available only to a product whose competitors are all adding. "famously" is doing unusual work: it asserts a reputation rather than a property, and it is unfalsifiable, which is either confident or slippery depending on your view.

`nonsense` is the register-setting word. Not "complexity", not "bloat", not "overhead" — a plainly rude word for other people's software, in the H1.

**The homepage is a signed letter from the CEO** `[observed]` — the most unusual structural choice in this corpus.

Below the hero sits a first-person letter signed "Jason Fried, jason@basecamp.com, Co-founder & CEO", with the CEO's actual email address in the signature. Its structure:

1. `Hey there—` (em-dash, no comma)
2. "Tell me if this sounds about right." — an invitation to disagree
3. A long sentence naming the reader's day: "Every day you're juggling people, projects, and expectations. There are tasks to do, discussions to have, decisions to make, files to share, deadlines to hit, relationships to manage, and work to deliver."
4. The problem: everything spread across apps, tabs, emails, chats — "You need a system."
5. The indictment: "most project management systems are bloated, complicated, and confusing. And software that's hard to use doesn't get used."
6. The origin: "20 years ago we were in the same boat… So we invented Basecamp"
7. The proof: "In software, longevity like this isn't luck — it's proof it works."
8. Social proof, then: "Thanks for checking us out. We invite you to give Basecamp a try. And ultimately, we'd be honored to have you as a customer."

**"And software that's hard to use doesn't get used"** is the whole argument in eight words, and it is the transferable line: it reframes ease-of-use from a nicety into a prerequisite for ROI, which is the objection a buyer actually has.

The seven-item list in step 3 ("tasks to do, discussions to have, decisions to make…") is **reused verbatim as the subhead of the Features page** — one carefully-built sentence deployed twice.

**The closing register is deferential rather than urgent**: "we'd be honored to have you as a customer." No scarcity, no deadline, no "join thousands". A sales close written as a courtesy.

**Feature headlines follow one strict template: `<Feature name> for <what it is for>`** `[observed]`

| Headline (verbatim) |
|---|
| `The Project page keeps it all together` |
| `Message Boards for announcements and discussions` |
| `To-do Lists for tracking all the little things` |
| `Hill Charts show you where things really stand` |
| `Card Tables for tracking work through stages` |
| `Campfire chats for quick, casual conversations` |
| `The Basecamp Calendar for big dates` |
| `Automatic Check-ins for recurring questions` |
| `Docs & Files for reference materials, assets, and links` |
| `My Tasks, Events, Today, Bookmarks, and Notes` |
| `Reports for high-level overviews` |
| `Everything Views are like having x-ray vision` |
| `The Lineup is your bird's eye view` |
| `API, CLI, SDK, Skills, and Integrations` |
| `Keyboard shortcuts speed everything up` |
| `Decide what clients get to see` |

Ten of sixteen use the bare `<Name> for <purpose>` construction. The pattern is almost mechanical, and that is the point: **the product name is always first, and the purpose is always a plain-English phrase, never a benefit claim.** `for big dates`, `for all the little things`, `for quick, casual conversations` — the purposes are described in the register of someone explaining the tool to a colleague.

Three headlines break into metaphor — `like having x-ray vision`, `your bird's eye view`, `show you where things really stand` — and all three are for the *overview* features, i.e. the ones whose value is hardest to state literally.

**Body copy under each headline is one paragraph, two to four sentences, and frequently ends with a direct address**: "You'll love it." · "It's a win-win." · "Interesting, `tell me more`." · "Perfect for real-time conversations, quick file sharing, random questions, stuff like that."

`Interesting, tell me more.` as link text — **the CTA is written as the reader's own reaction**, in the reader's voice, as a sentence the reader would say. It is the single most unusual link label in the corpus. (See T3 for why it is also a problem.)

**Competitor naming is direct** `[observed]`: "With Basecamp you don't need Slack, WhatsApp, or another chat app." Three named products in a feature paragraph. Basecamp is the only product in this five-product set that names competitors in its own feature copy.

**Pricing headline foregrounds the pricing model, not the product** `[observed]`

> `No per-user fees, everyone's included. Just clear, fixed prices.`

The headline is the **differentiator against the category's default billing model**, not a product claim. For a buyer who has been quoted per-seat pricing everywhere else, this answers the question before it is asked. `everyone's included` and `Just clear, fixed prices` are both reassurances, and `Just` is doing the work of "nothing else, no catch".

**Section headings on pricing are argumentative, not descriptive** `[observed]`: `The same core features are included with every package` · `A stable, well-run company is part of the deal, too` · `Risk-free, cancel anytime, no long-term lock-in` · `A big boost for bootstrappers & small businesses` · `Basecamp eliminates the Hassle Tax` · `I have pricing questions…`

**`A stable, well-run company is part of the deal, too`** sells the vendor as a feature, then substantiates it with six bullets (27 profitable years, zero debt, 99.99% uptime, service reputation, free learning library, "Direct access to our CEO via email"). The closing line is the argument: **"You can't build reliable software unless you build a reliable company."**

**`I have pricing questions…`** as an FAQ heading is written **in the reader's first person**, with an ellipsis, as an unfinished thought the page then completes. No other product in this corpus phrases its FAQ heading as the reader's utterance.

**Other headline register samples** `[observed]`: `Remember when companies cared about service?` (a rhetorical question, answered immediately with "We still do!") · `Have a great day!` (the standing heading above the newsletter block on every page) · `Where there's work, there's Basecamp` · `Features, benefits, benefits, and benefits` (the Features page's own `<title>` — a joke in a page title).

**Usage statistics are given at absurd granularity** `[observed]`: `84 million` accounts · `60 million` projects · `72 million` check-in answers · `350 million` messages · `1.7 billion` to-dos · `2.7 billion` comments · `2.2 billion` files · `2.3 billion` pings · `675 million` boosts · `5 petabytes` of data · `200 million` scheduled events · `180 million` to-do lists · `1 billion` @mentions · `545 million` to-dos completed · `15 billion` notifications · `233` countries · `52,000` cities · `99.99%` uptime.

Eighteen metrics, and the notable ones are the **product-specific units**: `check-in answers`, `pings`, `boosts`, `@mentions`, `to-dos completed`. Counting the things only your product has is a way of teaching your vocabulary while making a scale claim. `545 million to-dos completed` against `1.7 billion to-dos` is also, unintentionally, a 32% completion rate published on the homepage.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Have an account? Sign in` | Header | Question-first disambiguation |
| `Want an account? Sign up free` | Header | Pairs with the above; resolves to `/pricing`, not to a signup form |
| `Try Basecamp Free` | Homepage hero | Title Case |
| `Try Basecamp free` | Sticky footer CTA on every page | **Sentence case variant of the same label** |
| `Try Basecamp free` / `Sign up free` | Pricing (Free plan) | |
| `Start a 30-day free trial` | Freelancer, Studio, Pro plan cards | Duration inside the label |
| `Start a 45-day free trial` | Unlimited plan card | Different duration, same construction |
| `Take a 3-minute tour` | Homepage, above the hero video | Duration inside the label |
| `See how Basecamp works` | Homepage, twice | |
| `Play this 1-minute video` | Customer video | Duration inside the label |
| `tell me more` | Features page, Hill Charts paragraph | Lower-case, inside a sentence, in the reader's voice |
| `Check out over 1,000 more customer testimonials` | Homepage | Count inside the label |
| `See all upcoming classes` | Homepage | |
| `Book a personal demo` | Pricing | |
| `Subscribe` | Newsletter block, every page | |
| `Send support request` | Support form | |
| `Email us` | Pricing FAQ, three times with three different `mailto:` addresses | `nonprofits@`, `teachers@`, `students@` |
| `Get in touch` | Accessibility page | |
| `No, thanks` / `Yes, that's fine` | Cookie banner | See T10 |
| `Toggle Navigation` / `Toggle Search` | Help centre | Help Scout defaults |
| `Sort by Default` / `Sort A-Z` / `Sort by Popularity` / `Sort by Last Updated` | Help category pages | |
| `Contact` | Help centre nav, **rendered twice, both pointing at `#`** | Dead link, duplicated |
| `View historical uptime.` / `← Incident History` | Status page | Trailing full stop inside the link |
| `Menu` | Header | |

**Observations.** Basecamp's CTA set is the **smallest and most consistent** in this corpus — roughly two dozen distinct labels across twelve pages, against Asana's fifty-plus. There is no bare `Learn more` anywhere on any page harvested. That absence is the headline finding: Basecamp is the only one of the five products that never ships an unobjected link label.

**Duration and count are put inside the label** four times: `Take a 3-minute tour`, `Play this 1-minute video`, `Start a 30-day free trial`, `Check out over 1,000 more customer testimonials`. The reader can price the click before making it. This is the same discipline Asana applies to its video tutorials, applied here to every time-bound CTA on the site.

**`Start a 30-day free trial` / `Start a 45-day free trial`** encodes the plan differential in the button. The Unlimited plan's longer trial is not a footnote — it is visible in the CTA, so the benefit is attached to the action rather than to a comparison row.

Two defects. `Try Basecamp Free` (hero) and `Try Basecamp free` (sticky footer) differ in casing on the same page. And **`tell me more`**, charming as it is, is a three-word lower-case link in the middle of a sentence, which gives a screen-reader user no indication of the destination — the object is supplied only by the preceding clause. It is the counterpart failure to `Learn more`: too voicey rather than too generic, with the same outcome.

`Want an account? Sign up free` **resolves to the pricing page**, not to a signup form. The label promises an account; the destination is a price list. Defensible (the free plan is on that page) but the label overpromises by one step.

## T4 Onboarding & getting-started

**Onboarding is split three ways by relationship to the account, not by seniority** `[observed]`

The `Getting Started` help category, glossed "Quick starts for those new to Basecamp", contains six articles:

`Creating and setting up a Project` · `The Home Screen` · `The Basecamp Way To Work` · `Getting started as a client` · `Getting started as an owner` · `Getting started as a team member`

**The three-way role split is `owner` / `team member` / `client`** — and the inclusion of `client` is the distinguishing decision. Linear splits admin/member; Asana splits team lead/team member/admin; Slack splits admin/new user. Basecamp is the only one that writes an onboarding path for **someone who does not work at the company** and will use the product exactly once, under supervision, without choosing it.

For a product whose core use case is client work, that third path is where retention actually happens: a client who finds Basecamp confusing becomes a reason for the agency to leave. Writing onboarding for the non-buying, non-choosing participant is the transferable insight.

**`The Basecamp Way To Work` sits inside Getting Started** `[observed]` — methodology as a first-run article, before feature documentation. Paired with `The 37signals Way` as a whole Learning Center category (6 articles). The product teaches a way of working before it teaches its own buttons.

**`The Home Screen`** as a getting-started article is the small right decision: the first thing a new user sees gets its own article, named for what they are looking at.

**Four onboarding modes offered publicly** `[observed]`

- `Take a 3-minute tour` / `See how Basecamp works` — "No slides, no sales pitch. Just a real project, clicked through in real time. A wonderful way to get comfortable with Basecamp."
- `Free live classes` — "We'll show you how to set up Basecamp in minutes, how to roll it out to your team, and Q&A covering anything else you'd like to ask."
- `Book a personal demo` — "Want a walkthrough? Live Q&A session?"
- `Personalized onboarding` (Unlimited plan) — "One of our experts is happy to walk your team through Basecamp to get you up to speed."

**"No slides, no sales pitch. Just a real project, clicked through in real time."** — the demo is described by what it is *not*, twice, before what it is. The same negation structure as the hero ("without all the nonsense"). And "a real project, clicked through in real time" is a specific promise a reader can hold the video to.

The live-class description names the **three things an evaluator actually needs**: set up, roll out, and get questions answered. Roll-out is the one most products omit.

**Trial and credit-card policy stated three times in three registers** `[documented]`, from the pricing FAQ:

> `Do I need a credit card to try Basecamp?` — "**Nope.** We don't require a credit card on the Free account, or for any of the free trials… It's entirely up to you."
> `Will I automatically be charged when my free trial is up?` — "**No.** We don't ask for a credit card to try Basecamp, **so we couldn't charge you even if we wanted to.** If you want to continue once your trial is up, then you'd enter your credit card. **You're in complete control.**"

**"so we couldn't charge you even if we wanted to"** is the best sentence on the pricing page. It converts a policy promise ("we won't charge you") into a **structural impossibility** ("we can't"), which is a categorically stronger assurance and requires no trust. Any product that does not hold a card at trial start should be saying this.

`Nope.` and `No.` as the opening word of each answer, bolded, before the explanation — verdict first, reasoning second.

## T5 Form & field labels

**The support form is the richest field set in this harvest, and it is built around a first-person issue picker.** `[observed]`

Page H1: `Friendly folks, standing by`. Opening line: **"There are no stupid questions."**

| Field label (verbatim) | Helper text (verbatim) |
|---|---|
| `What do you need help with?` | "This helps make sure you get the right answer fast." |
| `What's your question, comment, or issue?` | "Share all the details. The more we know, the better we can help you." |
| `Send us a file, screenshot, or document` | "Hold the shift key to select multiple files." |
| `What's your email address?` | "This is where we'll get back to you. Double check that it's right." |
| `What's your account URL?` | "Example: https://app.basecamp.com/8675309" |

**Every field label is a question in the second person.** Five fields, five questions, no noun labels. Compare the conventional form (`Subject`, `Message`, `Attachment`, `Email`, `Account ID`) — Basecamp's version reads as a conversation and requires no interpretation.

**The issue-type options are written in the user's first person** `[observed]`

> `Please select one…`
> `I can't access my account`
> `I have a question before I sign up`
> `I want to request a feature`
> `I have a billing question`
> `I'm not receiving emails`
> `I'm confused about how something works`
> `I think something is broken`
> `Other`

Eight options, seven of them beginning `I`. This is the Wise confession pattern (see the exemplar's T7) applied to a **support form picker** rather than to article titles, and it is arguably the better application: the user is about to describe their problem anyway, and the picker hands them the sentence.

Three options deserve individual note. **`I'm confused about how something works`** legitimises confusion as a valid ticket type — most forms offer "How do I…?" which forces the user to have already formulated a question. **`I think something is broken`** hedges with "I think", so the user is not required to be certain they have found a bug before reporting one; it lowers the bar for the report that is hardest to get. And **`I have a question before I sign up`** puts the pre-sales path in the same form as support, with the same tone, rather than routing prospects to a sales team.

Together with `There are no stupid questions` at the top, the form is engineered to lower the shame cost of asking. For any support surface where under-reporting is the problem, this is the model.

**Helper text names the consequence of the field, not the format** `[observed]`: "This is where we'll get back to you. Double check that it's right." — the email field's helper explains *why it matters* and then issues the one instruction that prevents the failure. "Share all the details. The more we know, the better we can help you." — a reciprocity argument for verbosity, rather than a character minimum.

The account-URL example uses `8675309` — the Tommy Tutone phone number. A joke inside a placeholder.

**Only two fields are marked `Required`** of five — issue type, question text, and email (three, in fact); the file and account URL are optional. Marking the minority rather than the majority.

**Pricing-card bullets each carry a `?` disclosure** `[observed]` — every plan bullet has an expandable explanation attached:

- `Up to 3 active projects` → "Archived or deleted projects don't count against your total. You could have dozens of projects, but only 3 can be active at once."
- `20 users max, no per-user fees` → "Add up to 20 people to your account. If you want to invite more than 20 people, you'll need to upgrade to a higher package. STUDIO and higher include unlimited people."
- `UNLIMITED tools per project` → "Add multiple message boards, chat rooms, card tables, or other tools to a single project."
- `Project templates` → "Create reusable project and to-do list templates with the same structure, workflows, and setup across projects."
- `Enhanced admin features` → "Gives account owners and admins greater control over access, permissions, and more."
- `Priority 24/7/365 support` → "Jump to the front of the queue when you contact support."
- `Personalized onboarding` → "One of our experts is happy to walk your team through Basecamp to get you up to speed."
- `Annual billing + extra payment options` → "Annual billing by check, ACH, wire, or credit card."
- `Bring your own AI agents` → "CLI access and skills for AI agents you run on your computer."

See T10 for why the `active projects` explanation is the best disclosure in the corpus.

**Newsletter micro-flow** `[observed]`: heading `Have a great day!` → "Join more than 200,000 people who get our email newsletter. We'll share product updates, thoughts, new releases, and other tidbits we think you'll find interesting." → `Subscribe` → success state **`Thanks! You're in.`** / "Look out for our latest newsletter in the next few weeks."

`Thanks! You're in.` is three words for a confirmation, and the follow-up **sets the cadence expectation** ("in the next few weeks") so the subscriber does not conclude it failed. Both halves of a confirmation done right: acknowledge, then say what happens next and when.

## T6 Status & state language

**Basecamp ships almost no status vocabulary, and that is a deliberate product position.** `[observed]`

There is no project-status field, no health rating, no `On track / At risk / Off track`, no priority levels, no workflow states, no issue statuses. To-dos are **done or not done** — a checkbox. Card Tables have user-named columns. Nothing else on the public surface names a state.

This is the sharpest contrast in the five-product set. Linear ships six status categories plus five priorities plus six SLA states; Asana ships six project statuses; Basecamp ships a checkbox. The absence is consistent with the hero ("without all the nonsense") and it is the reason Basecamp is in this corpus.

**What replaces status is the Hill Chart — a status *model*, not a status *value*.** `[observed]`

The Hill Charts page is the most substantial conceptual argument in this corpus. Its model:

> "**Every piece of work has two phases.** First there's an **uphill** phase where you figure out your approach. You have a basic idea about the task, but you haven't figured out what the solution is going to look like or how to solve all the unknowns."
> "Eventually you reach a point where there aren't any more unsolved problems. That's like **standing at the top of the hill**. You can see clearly all the way down the other side. Then the **downhill** phase is just about execution."

Four position terms: `uphill` · `standing at the top of the hill` · `over the hill` · `downhill`. Plus the section heading that names the whole progression: **`Unknown to known, and known to done`**.

**`Unknown to known, and known to done`** is the transferable line. It names the two transitions most status systems collapse into one — figuring out *what* to do, and then doing it — and it explains why a percentage-complete bar lies: 80% of the tasks done tells you nothing if the remaining 20% is still unknown.

**The status is explicitly human-generated, and the page says so** `[observed]`

> "Note how that the status is *human* generated, not computer generated. This reflects a real person's feeling of the work at this moment. And because the status is attached to lists instead of individual To-dos, we get a big picture view of all the work."

Two design decisions defended in two sentences: the status is a **judgement**, not a calculation; and it attaches to a **list**, not a task, so it cannot be gamed by task granularity. Asana's project-status article makes the same first point implicitly ("Project statuses are updated manually—we do not do this automatically"); Basecamp explains *why*, which is the difference between a constraint and a philosophy.

("Note how that the status is" contains a stray "that" — see defects.)

**The chart is documented as a diagnostic, not just a display** `[observed]`. The page includes a worked example where a dot stopped moving:

> "That dot sat there for a few days without moving. Why weren't we making progress? After a short talk with the team, we realized that it was unclear where to place the dot because part of the work was figured out and part wasn't… **In a case like this, the hill is telling us to break up the list.**"

The resolution: rename the list to "Notification: Delivery", move it over the hill, and create two new lists for the still-uphill front-end work. Then: "Redefining the To-do Lists made it easier to see what was actually going on."

**"the hill is telling us to break up the list"** — the status instrument diagnoses a *structural* problem in how the work was described, not just a schedule problem. A status field that reveals bad decomposition is doing more than reporting. This is the single most reusable idea in the file for anyone designing a progress-reporting surface.

**Status history is a first-class object** `[documented]`: "Every time someone updates the Hill Chart, a new snapshot is saved to the project's history. This gives managers a ton of context about what's moving on the project and what isn't **without peppering the team with questions**." Updates can be annotated, commented on, and Boosted.

`without peppering the team with questions` names the behaviour being replaced — the status meeting — which is the benefit the buyer actually wants.

**Enabling the feature is documented with its exact menu path** `[observed]`: "navigate to any To-do List and choose 'Track this on the Hill Chart' from the Options menu (•••) in the top-right corner." The in-product string `Track this on the Hill Chart` is a full imperative phrase naming both the action and the destination.

**A second, separate progress indicator exists** `[documented]`: `Showing progress with The Needle` — a help article for a distinct mechanism. So Basecamp actually has two named progress instruments (`Hill Charts`, `The Needle`), neither of them a status field.

**Lifecycle states that do exist** `[documented]`, from help titles and pricing copy: `active` projects (the billable state, with `archived` and `deleted` explicitly not counting), `Archiving, Trash, and Restoring` (three states in one article title), `Drafts & Scheduled Posts` (two pre-publication states), `Client mode` (a visibility state applied per project).

**Service states** `[observed]`, 37status.com (Atlassian Statuspage defaults): `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Aggregate `All Systems Operational`.

Eight products listed on one status page: `Basecamp 5` · `HEY` · `Basecamp 2` · `Basecamp Classic` · `Highrise` · `Campfire` · `Backpack` · `Fizzy`. **Four of these are discontinued or legacy products still carried as monitored components** — a company that keeps reporting uptime on software it stopped selling. That is the "reliable company" argument (T2) rendered as an operational fact.

## T7 Error, failure & recovery

**`Troubleshooting & FAQs` — nine articles, glossed "Solving common problems"** `[observed]`

`Why do I keep getting a new sign-in notification?` · `System Requirements` · `Enabling microphone access` · `Browser Troubleshooting` · `Help Us Help You` · `Create a HAR file for troubleshooting performance issues` · `Using Basecamp with a VPN` · `How secure is Basecamp?` · `Using Basecamp in other languages`

**`Help Us Help You` is the standout title in this corpus's help-article set.** Four words, first person plural addressing second person, and it names a *reciprocal* obligation rather than instructing the user. It is almost certainly the article that tells you what information to include in a support request — the same content Slack delivers as "Step 3: Collect and send us your Net Logs" — but titled as a request for cooperation rather than as a procedure. For content that asks the user to do work on the vendor's behalf, framing it as mutual is the right move.

**`Why do I keep getting a new sign-in notification?`** is the only question-form title, and the `keep` is doing the work: it names the *repetition* that makes a benign notification alarming. A user seeing one sign-in alert does not search; a user seeing four does, and they type "keep".

Note what is **not** in the category: no error-message catalogue, no `I can't log in`, no `Something went wrong`. Nine articles, and four of them (`System Requirements`, `How secure is Basecamp?`, `Using Basecamp in other languages`, `Enabling microphone access`) are not troubleshooting at all. Like Asana's, this is a small catch-all rather than a diagnostic index — though at nine articles it is honest about its size.

**No error strings were observed or documented anywhere.** `[absent]` Searched: all four help category pages, the support page, the pricing page, the features page, the status page. Basecamp publishes no error-message list, and no help article quotes one. The only failure-adjacent product string captured is the support form's issue option `I think something is broken`.

**Recovery is named as a three-state article** `[documented]`: `Archiving, Trash, and Restoring` — one article covering the full removal-and-return path, so a user who deleted something finds the restore instructions in the same place as the delete instructions. Compare Notion, which splits these across several articles.

**`Where did that go in Basecamp 5?`** `[observed]` — a help article for users whose mental model broke at the version upgrade. A **migration-anxiety article**, titled as the question a returning user actually asks, with "that" deliberately unspecified so it catches every instance. For any product shipping a major redesign, this is the article that prevents churn, and titling it in the user's bewildered voice is why it gets found.

**Pre-emptive failure handling in the support form** `[observed]`: "This is where we'll get back to you. Double check that it's right." — the most common support-ticket failure (wrong reply address) addressed with one instruction at the field.

**Response-time honesty in the support meta description and page copy** `[observed]`: "We read and respond to every message, **though response times may be a bit longer than usual right now.**" A live caveat about current support load, shipped in the page copy and in the meta description. Setting the expectation before the user waits, rather than after they complain.

**Scheduled-maintenance narrative** — see T9.

## T8 Empty states

**Thin, and the thinness is honest.**

**Live empty state observed on the help centre** `[observed]`

> `No results found`

Rendered on the help-centre home and on every category page, in the search-results region, **before any search has been performed**. Three words, no query echo, no suggestion, no contact route. It is the same class of defect as Notion's `No results for` (rendered with an empty interpolation slot on first load) — a results container that renders its empty state unconditionally.

Basecamp's version is at least grammatically complete, which Notion's is not. But it is also less useful: there is no query term, no "try different keywords", and no link to `Contact` (which on this page is a dead `#` anyway).

**Status-page empty states** `[observed]`, Atlassian Statuspage defaults:

`No incidents reported today.` · `No incidents reported.` · `No downtime recorded on this day.` · `No data exists for this day.` · `No incidents or maintenance related to this downtime.`

The same five strings as Asana's status page, from the same vendor. The today/not-today tense distinction and the recorded-vs-no-data distinction are noted in 004-asana T8 and apply identically.

**Documented near-empty states** `[documented]`:

- Free plan project slot: "You can only run one project at time on the Free package, but if you complete a project, or just want to get rid of the one you're currently running, you can delete it and free up the slot to start a new one." — the empty-slot state described as a *recoverable resource* rather than as a wall. ("at time" is missing "a".)
- `Activity that's easy to absorb` — "Scroll back to see what happened yesterday, last week, or since the beginning of time. **Quiet stretches show too.**"

**`Quiet stretches show too.`** is a deliberately designed empty state described in marketing copy: Basecamp renders periods of *no activity* rather than collapsing them. For an activity feed, showing the gaps is a real decision — it tells a reader that nothing happened, rather than leaving them unable to distinguish silence from a filter. Four words naming an empty state as a feature.

**In-product empty states not reachable** `[absent]`. A new project with no tools, an empty To-do List, an empty Card Table column, an empty Docs & Files, a first-run Home Screen — all behind auth. The `The Home Screen` and `Creating and setting up a Project` help articles would document them; neither was opened.

## T9 Notifications & system messages

**A complete scheduled-maintenance narrative, captured verbatim** `[observed]` — the most useful T9 artefact in this file.

> ### Sep 15, 2026
> **`Basecamp 5 Database Maintenance`**
>
> **Completed** - The scheduled maintenance has been completed. — Sep 15, 03:17 UTC
> **In progress** - Scheduled maintenance is currently in progress. We will provide updates as necessary. — Sep 15, 03:00 UTC
> **Scheduled** - We're performing some routine database maintenance on Basecamp 5 that will make it inaccessible for roughly 2 minutes.
> Please bear with us while we make sure Basecamp 5 continues to run smoothly.
> Thanks! — Sep 13, 18:24 UTC

Three-stage lifecycle: **`Scheduled`** → **`In progress`** → **`Completed`**. (Distinct from Asana's incident lifecycle of `Investigating` → `Update` → `Resolved` on the same vendor platform — maintenance and incidents use different state sets.)

**The `Scheduled` post is the one worth studying.** Four things it does that most maintenance notices do not:

1. **Posted 33 hours ahead** (Sep 13, 18:24 for a Sep 15, 03:00 window). Actual advance notice, not a same-day warning.
2. **States the outage duration in the notice itself** — "inaccessible for roughly 2 minutes". `roughly` hedges honestly, and two minutes is short enough that stating it defuses the alarm entirely. The number is the message.
3. **Gives the reason, and it is the user's reason** — "while we make sure Basecamp 5 continues to run smoothly". Not "to apply security patches"; the benefit to the reader.
4. **Ends with `Thanks!`** on its own line. A maintenance notice signed off like a note from a colleague.

**"Please bear with us"** — asking for patience rather than apologising for the inconvenience. Apology implies fault; "bear with us" implies a shared, temporary inconvenience with a purpose. For planned work, this is the right register, and it is the difference between the notice reading as defensive and reading as collegial.

The `Completed` post is the weak one: "The scheduled maintenance has been completed" is a vendor default and adds nothing — no confirmation of actual duration, no all-clear phrasing. The narrative opens with Basecamp's voice and closes in Atlassian's.

**Notification vocabulary, from help titles and homepage statistics** `[documented]`: `Notifications Sidebar` · `Notification settings` · `Boosts` · `Pings` · `@mentions` · `Automatic Check-ins` · `Bubble Up` · `Drafts & Scheduled Posts` · `Email Forwards`.

Three of these are coinages for notification-adjacent actions:
- **`Boosts`** — lightweight reactions (675 million of them). Named for what they do to the recipient, not for the mechanism (compare "reactions", "likes", "emoji").
- **`Pings`** — direct messages, distinguished from `Campfire` group chat. 2.3 billion.
- **`Bubble Up`** — resurfacing something that has gone quiet. A phrasal verb naming a user intent that most products have no word for at all.

**`Automatic Check-ins` is a scheduled-question product** `[observed]`

> "Cut back on meetings by setting up Automatic Check-ins. Basecamp asks your team questions on a schedule, like **'What are you working on this week?'** every Monday at 9am, and saves everyone's answers in one place."

The example question is quoted in the marketing copy and is a real default. Note the framing: the benefit is stated first and it is a **subtraction** ("Cut back on meetings"), the mechanism second, and the mechanism is described as the *system asking*, not the manager. Removing the manager from the sentence is what makes a recurring status request tolerable.

`72 million check-in answers` on the homepage counts the responses rather than the prompts — measuring the thing that indicates the feature works.

**`Reports & Automatic Check-ins` are grouped on the pricing page under one bullet**: "for staying up on things" — a colloquial purpose statement for two reporting features.

**Newsletter confirmation** (see T5): `Thanks! You're in.` plus a cadence expectation.

**No status-page subscription controls were present** on 37status.com at harvest — unlike Asana's, Slack's and Notion's status pages, which all offer email/RSS/Slack subscription. The page offers only `View historical uptime` and `← Incident History`.

## T10 Disclosures, legal & compliance

**Five plans, flat-rate, with the differentiator in the H1** `[observed]`

| Plan | Price | Positioning line (verbatim) | Trial |
|---|---|---|---|
| `Free` | — | "One free project for personal use." | — |
| `Freelancer` | `$25/mo` | "Get organized, impress your clients." | 30-day |
| `Studio` | `$59/mo` | "A great place to start with room to grow." | 30-day |
| `Pro` | `$99/mo` | "Just about everything for just about everyone." | 30-day |
| `Unlimited Edition` | `$299/mo, billed annually` | "Top-of-the-line for those who want the best." | 45-day |

The plan selector carries **inline recommendation labels**: `Studio — Not sure? Start here` and `Pro — The sweet spot`. Two nudges, both written as advice rather than as badges ("Recommended", "Most popular"). **`Not sure? Start here`** addresses the reader's actual state — indecision — and gives a single instruction. `The sweet spot` is a value judgement the seller is making out loud.

Positioning lines are five to eight words each, and `Just about everything for just about everyone` uses the same hedge twice as a joke about comprehensiveness.

**The best disclosure in this corpus is the `active projects` tooltip** `[observed]`

> `Up to 3 active projects` → "**Archived or deleted projects don't count against your total. You could have dozens of projects, but only 3 can be active at once.**"

Three sentences that pre-empt the exact misreading: a prospective buyer sees "3 projects" and concludes the product is unusable. The tooltip **reframes the limit from a cap on history to a cap on concurrency**, gives a concrete counter-example ("dozens of projects"), and names the two states that are exempt. The Pro tier's version scales the example: "you could have a hundred projects, but only 25 can be active at once."

**Explaining a limit by naming what it does not limit** is the pattern. Directly applicable to any quota — storage, seats, API calls, transactions — where the headline number understates the real allowance.

**Per-bullet disclosure rather than footnotes** `[observed]`. Every pricing bullet carries a `?` expander, so the qualification sits at the claim rather than at the page foot. Nine distinct explanations captured (see T5). `20 users max, no per-user fees` → the tooltip immediately states the upgrade path *and* names which tiers remove the cap, so the constraint arrives with its resolution.

**`UNLIMITED` is set in caps as a deliberate signal** `[observed]`: `UNLIMITED users, no per-user fees` · `UNLIMITED tools per project` · `UNLIMITED projects`. The one word the buyer is scanning for is typographically shouted. Crude, effective, and consistent — it appears in caps every time and never in lower case.

**The FAQ is the strongest disclosure set in the corpus**, because unlike all four other products **the answers are present in the page** rather than collapsed behind an accordion. `[observed]`

Heading: `I have pricing questions…` — in the reader's first person.

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | Can we upgrade, downgrade, switch packages, or cancel whenever we want? | Yes to upgrade any time; yes to downgrade **only if current usage fits the lower package**, with two worked examples (5 projects can't fit Freelancer's 3; 145 GB can't fit a 25 GB plan); **no downgrade from paid to free** — you must sign up for a new free account; cancel any time, with annual plans prorated back |
| 2 | Do you offer non-profit or educational discounts? | 10% off for registered 501(c)(3); 100% free for K-12, homeschoolers and universities for class work only; three separate email addresses and three specific evidence lists; a `Note:` limiting discounts to one account, excluding retroactive refunds, and reserving the right to end the programme while grandfathering existing participants |
| 3 | Could we really add 500 users and run unlimited projects and still just pay $300/month total on the Unlimited Edition? | Yes; claims to have pioneered the all-inclusive unlimited-users package and offered it for over a decade |
| 4 | Are clients or contractors or guests included in the user count? | Yes, everyone counts — but Studio and above are unlimited, so it does not matter |
| 5 | Do I need a credit card to try Basecamp? | No, not for Free or any trial; card requested only at trial end if you continue |
| 6 | Will I automatically be charged when my free trial is up? | No — and structurally impossible, since no card is held |
| 7 | Can we buy more storage if we need it? How much is it? | Upgrade for more; Unlimited includes 1 TB; beyond that, 5 TB extra for $100/month, shared across the whole account |
| 8 | On the free one project package, can I delete the project and start another one? | Yes, but only one at a time — deleting frees the slot |

**Structural notes.** Every answer opens with a bolded verdict — `Yes`, `Absolutely.`, `Nope.`, `No.` — before any explanation. Eight questions, eight one-word openers. For a pricing FAQ this is exactly right: the reader wants the answer, not the reasoning, and the reasoning is there for the minority who need it.

**Q3 is written in the reader's incredulous voice** — "Could we *really* add 500 users and run unlimited projects and still just pay $300/month **total**?" with "really" and "total" both doing work. It is the question a skeptical buyer thinks but would not type, surfaced and answered. Naming the disbelief is more persuasive than restating the claim.

**Q1's downgrade answer is the most honest thing on the page.** It gives two concrete failure examples and then states a flat refusal — "We do not allow downgrading from a paid package to the free package. If you want to go back to free you'll need to sign up for another free account." No euphemism, no "reach out to our team". A restriction that will annoy some readers, stated plainly where they will see it before paying.

**Q2's `Note:` paragraph is a model of a bounded promise**: one account only, no retroactive refunds, and — crucially — "We reserve the right to end the discount program due to chronic abuse of the free accounts or other circumstances. **If we do, anyone who is already participating will continue to have their discounts applied.** We just won't offer up new free or discounted accounts." Reserving the right to withdraw a programme *and simultaneously grandfathering existing participants* is a genuinely fair construction, and publishing it pre-empts the fear that the discount evaporates.

**Cancellation is disclosed as an anti-pattern avoided** `[observed]`

> `Risk-free, cancel anytime, no long-term lock-in`
> "With Basecamp, cancellation is entirely self-serve, **no questions asked, no retention specialists trying to talk you out of it.** Cancel any time, no long-term contracts to lock you in. Simple, straightforward, and fair, just as it should be."

**"no retention specialists trying to talk you out of it"** names a specific competitor practice and promises its absence. Naming the dark pattern you do not use is more credible than claiming you are easy to cancel, because it demonstrates you know what the reader is afraid of.

**`Basecamp eliminates the Hassle Tax`** `[observed]` — a coined cost category: "There's no more paying separate bills, onboarding people in multiple places, training people how to use different tools, managing expenses across vendors, etc… the benefits of Basecamp go beyond price." Naming an unpriced cost so it can be compared against a priced one.

**The cookie banner is the shortest and most honest in the corpus** `[observed]`

> "We'd like to use cookies to help understand if our ads are working or not."
> `No, thanks` · `Yes, that's fine`

One sentence stating the **actual single purpose** (ad measurement), two plainly-worded buttons, and **no dark pattern** — `No, thanks` is listed first and is visually equal. Compare Asana's OneTrust panel, which runs to nine headings, four cookie categories, six untranslated developer placeholders and a `Confirm My Choices` button. Basecamp's banner is roughly 1% the length and gives the user the same actual choice.

`Yes, that's fine` as an affirmative label is conversational rather than transactional ("Accept All"), and `No, thanks` is polite rather than adversarial ("Reject"). Both read as a reply to the sentence above them — the banner is written as one turn of dialogue.

**Discount eligibility is disclosed as a process with named evidence** `[observed]`: non-profits email 501(c)(3) paperwork to `nonprofits@`; teachers email from a school account with school name, class taught and proof of employment to `teachers@`; students email with school name, field of study and expected graduation to `students@`. Three audiences, three addresses, three evidence lists, all "right after you sign up" — the sequencing is stated so nobody waits for approval before starting.

**Company-stability disclosures as a purchase consideration** `[observed]`: "27 profitable, financially responsible years in business" · "Zero debt, privately held, and **built to stay, not exit**" · "99.99% historical uptime, with full transparency" · "Direct access to our CEO via email".

`built to stay, not exit` is the disclosure a B2B buyer of a small vendor actually needs — it addresses acquisition and shutdown risk directly, which no other product in this corpus mentions at all. And the CEO's email address is printed on the homepage, substantiating the last bullet inline.

**Infrastructure disclosure is a positioning statement** `[observed]`: "Rather than rent cloud hosting, we own and run our hardware across multiple data centers. We specified the hardware, configured (and sometimes invented) the software, and optimized every detail for speed and reliability." Paired with a footer link, `Leaving the Cloud`.

**Defect — the pricing page's own meta description has broken interpolation** `[observed]`

> "Start free with Basecamp — one project, five users, forever free. Paid plans run  to /mo, all fixed price with no per-user fees."

**"Paid plans run  to /mo"** — two price values failed to render, leaving a double space and an orphan "/mo". This string ships in `<meta description>`, `og:description` and `twitter:description`, so it is what appears in search results and in every social share of Basecamp's pricing page. A broken template in the highest-visibility copy on the site, on the page whose entire premise is pricing clarity.

## T11 Help-centre architecture

**Shape:** version router → per-version help centre (Help Scout) → two collections → seven + three categories → flat article lists. No sub-sections within categories, no article-type labels, no breadcrumbs beyond the category nav, and **no search results page reachable** (the search field renders `No results found` unconditionally — see T8).

**The version router is the distinguishing structure** (see T1). One page, one question, three doors. For a vendor running three product generations simultaneously — Basecamp 5, Basecamp 2, Basecamp Classic — on three separate help domains, asking rather than guessing is correct. It also means each version's help centre is internally consistent and never contains "if you're on Classic…" caveats.

**Two collections encode a real distinction** `[observed]`: `Help Docs` (how the software works, 7 categories, ~98 articles) and `Learning Center` (how to work, 3 categories, 12 articles). `The 37signals Way` · `Field Guides` · `Classes`.

Separating product documentation from methodology at the *collection* level — rather than mixing guides into the reference set as Notion does — means a user looking for a button never wades through philosophy, and a user looking for philosophy knows where it lives.

**Article-title grammar — bare-noun dominance** `[observed]`

The `Using Basecamp` category (34 titles across two pages) is overwhelmingly **bare feature nouns**:

`Automatic Check-Ins` · `Chat` · `Card Tables` · `External Links` · `To-Dos and Lists` · `Hill Charts` · `Docs & Files` · `Message Board` · `References and Links` · `Calendar` · `Keyboard Shortcuts` · `My Bar` · `Email Forwards` · `Drafts & Scheduled Posts` · `Searching` · `Boosts` · `Moving & Copying` · `Notifications Sidebar` · `Templates` · `Printing` · `Bubble Up` · `Bookmarks` · `Lineup` · `Timesheets` · `Reports` · `Notification settings` · `Basecamp Help`

Twenty-seven of thirty-four are the feature's name and nothing else. The category is a **glossary of the product**, one article per noun, and it works because the product's object model is small enough that the noun is unambiguous.

The seven that break the pattern are the interesting ones:

| Title | Why it breaks |
|---|---|
| `Formatting text in Basecamp` | A cross-cutting capability with no object of its own |
| `Sharing items with Public Links` | Names the action, because "Public Links" alone would not explain the risk |
| `Showing progress with The Needle` | Names the purpose, because "The Needle" is opaque |
| `Archiving, Trash, and Restoring` | Three states in one article |
| `See Everything in your Projects` | Imperative, for a feature named `Everything` — the bare noun would be unreadable |
| `Where did that go in Basecamp 5?` | A question, for migration anxiety |
| `Creating and setting up a Project` | Two verbs, and **it appears in two categories** (Getting Started and Using Basecamp) |

**The rule is legible: use the bare noun unless the noun is opaque, in which case name the purpose.** `Showing progress with The Needle` and `See Everything in your Projects` are both rescues of coined names. Compare `Bubble Up` and `Boosts`, which ship as bare nouns despite being equally coined — an inconsistency in applying the same rule.

`Basecamp Help` as an article title inside the `Using Basecamp` category is a self-referential oddity.

**Sort controls are exposed** `[observed]`: `Sort by Default` · `Sort A-Z` · `Sort by Popularity` · `Sort by Last Updated`, with `Sort by Popularity` pre-selected on two of three category pages and `Sort by Default` on the third. Letting the reader re-sort a 34-item list by recency is genuinely useful for a product that ships changes; inconsistent defaults across categories are not.

**Routing furniture is minimal** `[observed]`: a logo link home, `Help Docs` / `Learning Center` collection links, `Contact` (dead), a search box, and a `Categories` list in the sidebar. No "was this helpful", no related articles, no prev/next, no breadcrumbs.

**`Contact` renders twice in the help-centre nav, both pointing at `#`.** A duplicated dead link, and it is the only escalation route the help centre offers — so a user who cannot find an answer in the help centre has no exit from it. The actual support form lives at `basecamp.com/support` and is not linked from the help centre at all.

That is the most significant IA failure in this file. Basecamp's support form is the best-written artefact on the site (T5), and the help centre does not link to it.

**The support form is itself a routing mechanism** (see T5): the eight first-person issue types perform the triage that a help-centre category tree would otherwise do, and they route in the user's own words. For a small help centre, an excellent intake form is a defensible substitute for a deep taxonomy — but only if the help centre links to it.

## T12 FAQs

**Two blocks, and unusually for this corpus, the main one has retrievable answers.**

### Block A — Pricing page, heading `I have pricing questions…`, 8 questions **with full answers** `[observed]`

Covered in detail in T10. Summary of the structural pattern:

- Heading in the reader's first person with an ellipsis.
- Every answer opens with a bolded one-word verdict (`Yes` / `Absolutely.` / `Nope.` / `No.`).
- Two answers contain **worked numeric examples** ("if you still had 5 projects, you couldn't downgrade to the Freelancer package which only allows 3 projects").
- One question is written in the reader's incredulous voice (Q3).
- One answer gives a flat refusal with no softener (Q1, paid→free downgrade).
- One answer makes a policy promise structurally impossible rather than merely committed (Q6).
- One answer carries a bounded-withdrawal clause with grandfathering (Q2).

The ordering is by decision-stage: change/cancel → discounts → the too-good-to-be-true check → who counts as a user → card required? → auto-charge? → storage → free-plan mechanics. Cancellation is answered **first**, before anyone has paid — the opposite of the usual burial.

### Block B — Help centre category `Troubleshooting & FAQs` `[observed]`

Nine articles, of which only one is in question form (`Why do I keep getting a new sign-in notification?`) and one more is question-shaped (`How secure is Basecamp?`). The category label promises FAQs and delivers mostly reference articles — the same label/content mismatch Asana has (see 004-asana T7), though at nine articles rather than thirteen it misleads less.

### No FAQ on the homepage, features page, or Hill Charts page `[absent]`

Objections are handled in body copy instead — the CEO letter answers "why not just use what I have", the pricing page's `A stable, well-run company` section answers "will you still exist", and `Risk-free, cancel anytime` answers "what if I hate it". Basecamp argues rather than FAQs, which is consistent with its footer-as-reading-list IA (T1).

## T13 Terminology & glossary

| Term | Basecamp's usage | The alternative it rejected |
|---|---|---|
| `project` | The top-level container; the billing unit; "Every project in Basecamp gets its own page" | `workspace`, `board`, `space` |
| `To-do` / `To-do List` | The task and its container, always hyphenated, always with the hyphen in the plural (`To-dos`) | `task`, `issue`, `item`, `card` |
| `tools` | The modules you add to a project (message board, chat, calendar, card table) | `apps`, `modules`, `features`, `widgets` |
| `Message Board` | Asynchronous posts; "Message Boards replace email" | `forum`, `announcements`, `discussions`, `posts` |
| `Campfire` | Group chat — a 20-year-old product name carried into the feature | `chat` (used alongside it), `channel` |
| `Pings` | Direct messages | `DMs`, `direct messages` |
| `Boosts` | Lightweight reactions | `reactions`, `likes`, `emoji` |
| `Card Table` | Kanban; "our take on Kanban" / "our take on kanban boards" | `board`, `kanban` (named but not adopted) |
| `Hill Chart` | The progress instrument | `status`, `progress bar`, `RAG`, `burndown` |
| `uphill` / `over the hill` / `downhill` | The three positions on it | `in progress`, `%complete` |
| `The Needle` | A second, separate progress indicator | |
| `Automatic Check-ins` | Scheduled recurring questions | `standup`, `pulse survey`, `status request` |
| `check-in answers` | The responses, counted as a metric | |
| `Bubble Up` | Resurfacing something that went quiet | `bump`, `remind`, `resurface` |
| `Everything Views` | Cross-project aggregation; "like having x-ray vision"; `All Files` given as an instance | `global view`, `search`, `filters` |
| `The Lineup` | The all-projects timeline; "your bird's eye view" | `roadmap`, `Gantt`, `timeline` |
| `My Bar` | The persistent personal strip at the bottom of the screen, holding `My Tasks`, `Events`, `Today`, `Bookmarks`, `Notes` | `sidebar`, `dock`, `tray` |
| `Client mode` | Per-project client visibility control | `guest access`, `external sharing`, `permissions` |
| `active project` | The billed state, distinguished from archived and deleted | |
| `Hassle Tax` | A coined name for the unpriced cost of multiple tools | |
| `Unlimited Edition` | The top plan, named as an edition rather than a tier | `Enterprise` — deliberately absent from the whole plan ladder |
| `package` | The word used for a plan throughout the FAQ, alongside `plan` and `Edition` | — three words for one concept |
| `The 37signals Way` / `The Basecamp Way To Work` | The methodology, named two ways | |

**Three observations.**

**The vocabulary is almost entirely non-technical.** `To-do`, `Message Board`, `Card Table`, `Calendar`, `Docs & Files`, `Chat`, `Reports` — a person who has never used project-management software can read the feature list and understand every item. There is no `issue`, no `ticket`, no `epic`, no `sprint`, no `backlog`, no `workflow`, no `status`, no `priority`. Where Linear's vocabulary assumes a software team and Asana's assumes a PMO, Basecamp's assumes nothing.

The three coinages that *are* opaque — `Boosts`, `Bubble Up`, `The Needle`, `My Bar`, `The Lineup` — are all for **actions and views that have no common name**, not for things that already do. Basecamp does not rename the calendar; it names the thing nobody has a word for.

**No `Enterprise` tier exists**, and its absence is a positioning statement. The ladder runs `Free` → `Freelancer` → `Studio` → `Pro` → `Unlimited Edition`, and three of those five are named after the customer (`Freelancer`, `Studio`, `Pro`) rather than after a feature level. A buyer picks the tier that describes them.

**Legacy names persist without embarrassment**: `Campfire` (a separate 37signals product from 2006, now a Basecamp feature, and still also listed as a standalone product on the status page), `Highrise` and `Backpack` (discontinued products still monitored on the status page). The company treats its own history as an asset rather than as debt to be hidden.

**Inconsistencies worth recording**: `To-do` vs `To-Do` (the help article is `To-Dos and Lists`, the marketing copy is `To-do Lists`); `Card Table` vs `Card Tables` vs `kanban` vs `Kanban` (both casings on the same two pages); `Check-in` vs `Check-In` (`Automatic Check-ins` on the features page, `Automatic Check-Ins` in the help title); `The 37signals Way` (label) vs `the-basecamp-way` (slug); `plan` / `package` / `Edition` used interchangeably for tiers.

## T14 Voice, tone & accessibility

**Person and tense.** First person singular in the CEO letter ("Tell me if this sounds about right"), first person plural everywhere else, second person for the reader throughout. Basecamp is the only product in this corpus whose homepage is written by **a named individual**, with his email address in the signature.

The `we` is used for opinions, refusals and admissions, not just service: "we invented Basecamp" · "We do not allow downgrading from a paid package to the free package" · "we'd be honored to have you as a customer" · "We reserve the right to end the discount program" · "We know your money's precious" · "We read and respond to every message, though response times may be a bit longer than usual right now."

**Register is conversational throughout, with no gradient.** This is the distinguishing feature. Where Wise flattens its tone as stakes rise and Slack switches register by surface, Basecamp uses **one voice on the marketing page, the pricing page, the support form and the maintenance notice**. `Nope.` appears in a billing FAQ. `Thanks!` ends a maintenance notice. `Please bear with us` is on the status page. `There are no stupid questions` opens the support form. `Have a great day!` heads the newsletter block on every page including the accessibility page.

The risk of a single register is that it reads as flippant at high stakes; Basecamp largely avoids this because the voice is *warm* rather than *jokey* — the humour is limited to two places (`Features, benefits, benefits, and benefits` in a page title, `8675309` in a placeholder) and never appears in a disclosure.

**Colloquialism is constant and deliberate**: "without all the nonsense" · "stuff like that" · "the little things" · "big dates" · "a ton of context" · "peppering the team with questions" · "in the same boat" · "Hey there—" · "You'll love it." · "It's a win-win." · "Just about everything for just about everyone." · "friendly folks, standing by".

**Direct address is used as punctuation**: seven feature paragraphs end with a sentence aimed at the reader ("You'll love it.", "It's a win-win.", "Interesting, tell me more.", "Perfect for real-time conversations, quick file sharing, random questions, stuff like that.").

**Negation as a rhetorical device** appears at least eight times across the site: "without all the nonsense" · "No slides, no sales pitch" · "no per-user fees" · "no questions asked, no retention specialists" · "no long-term contracts" · "There are no stupid questions" · "you don't need Slack, WhatsApp, or another chat app" · "Rather than rent cloud hosting". Basecamp defines itself by what it declines to do more consistently than by what it offers, and the construction is always **the absence stated first**.

**Numbers are exact and sometimes uncomfortable** `[observed]`: `99.99%` uptime (stated three times), `27 profitable, financially responsible years`, `2,026 organizations signed up last week`, `84 million accounts`, `545 million to-dos completed` against `1.7 billion to-dos`, `233 countries`, `52,000 cities`, `5 petabytes`. The signup figure (`2,026 organizations signed up last week`) is a **weekly** number rather than a cumulative one, which is a harder claim to make and easier to check.

`2,026` in the year 2026 is either a coincidence or a joke; there is no way to tell, which is itself a small credibility cost on an otherwise exact-numbers page.

**Accessibility content — the best published accessibility practice in this corpus** `[observed]`

The `/accessibility` page opens: "In step with the latest **WCAG 2.2 level AA** guidelines, we're working hard to make sure Basecamp is accessible for everyone" and "Inclusive and accessible design isn't a one-time checkbox, **it's a commitment to making sure everything we ship works well for all of our customers.**"

Then a **ten-point process**, each item a bolded claim plus an explanation:

1. Accessibility considered early and often, targeting WCAG 2.2 AA (linked)
2. **Direct customer interviews** to validate work
3. New features scanned with a browser extension — **axe named and linked**
4. Visible focus indicators checked
5. Headings checked for sequential order
6. Colour contrast checked against WCAG 2.2 AA (linked)
7. **Decorative elements hidden from assistive tech** — "Elements that are repetitive or purely decorative create excess verbosity for users of accessible tech"
8. A `skip to main content` link on every page
9. Keyboard navigation tested — "making sure that a mouse isn't required to perform any action throughout the app"
10. **`axe-core` running in the automated system test suite** — "Whenever a system test visits a page or clicks something on it, axe-core automatically scans the page to help guard against regressions"

Plus: "We regularly audit our apps… **`Get in touch` if you'd like a copy of the most recent review.**"

Three things make this the strongest accessibility page in the set. It publishes the **process, not the feature list** — Slack's page lists ten capabilities, Basecamp's lists ten practices, and a practice is falsifiable. It names the **specific tooling** (`axe`, `axe-core`) and its placement (in CI, not as a manual pass), which is the difference between a commitment and a mechanism. And it **offers the audit report on request**, which is a standing invitation to be checked.

Point 7 is the one most rarely stated: hiding decorative elements *because they create verbosity* shows the team understands the screen-reader experience as a listening experience with a time cost, not just as a text-alternative checklist.

**Screen-reader recommendations are specific**: desktop app plus preferred reader; VoiceOver with the iOS app; Talkback with the Android app. Platform-paired, like Slack's.

**A dedicated `accessibility@basecamp.com` address** under the heading `Questions? Concerns?` — a named channel rather than the general support queue.

**Keyboard access is a marketed feature, not only an accessibility one** `[observed]`: `Keyboard shortcuts speed everything up` — "Hit `SHIFT` and little keys appear next to everything you can navigate to. Add that letter to jump right there, no mouse required." And the `My Bar` paragraph notes "It's keyboard accessible too, so you can pop your assignments up without touching the mouse." Plus a `Keyboard shortcuts` footer link and a help article. Selling keyboard navigation as a speed benefit puts it in front of every user, not only those who need it.

**Alt text quality is mixed** `[observed]`. The features page uses **the section headline as the alt text** for each screenshot — "The Project page keeps it all together", "Hill Charts show you where things really stand" — which duplicates the adjacent H2 and describes the claim rather than the image. Correct-ish (the images are illustrative) but it produces a doubled announcement. The homepage's project-tool images carry labels like `Page: Message Board`, `Page: Docs & Files`, `Page: To-dos`, `Page: Card Table` — terse but accurate — while a dozen others in the same block have **empty alt** (`![](...)`). Video posters carry descriptive alt: `Meet Eron, our Head of Technical Ops`, `Breakfast with Basecamp: Chicago`.

The Hill Charts page — the most conceptually dense page on the site, carrying seven explanatory diagrams and GIFs — has **empty alt on every single image**. The entire visual argument (the hill shape, the dot positions, the before/after of splitting a list) is unavailable to a non-sighted reader, and the surrounding prose is good enough that it *nearly* stands alone but does not quite ("Note how that the status is human generated" refers to an image the reader cannot see).

**Negative findings, recorded honestly**

- **`Paid plans run  to /mo`** — broken price interpolation in the pricing page's meta description, og:description and twitter:description. The most visible string defect in this corpus.
- **`No results found`** rendered unconditionally in the help centre's search region on every page, before any search.
- **`Contact` rendered twice in the help-centre nav, both `href="#"`** — the help centre's only escalation route is a duplicated dead link, and it does not link to the excellent support form at all.
- **`Getting Started` article count is wrong**: index says 7, category lists 6.
- `Try Basecamp Free` (hero, Title Case) vs `Try Basecamp free` (sticky footer, sentence case) on the same page.
- `Want an account? Sign up free` resolves to `/pricing`, not to a signup form.
- **`tell me more`** — a three-word lower-case link with no destination cue in its own text.
- "Note how **that** the status is *human* generated" — stray "that" on the Hill Charts page.
- "You can only run one project **at time** on the Free package" — missing "a", in a pricing FAQ answer.
- The first help-router button renders as `Basecamp 5 Basecamp` — duplicated product name.
- `The 37signals Way` label vs `the-basecamp-way` slug.
- `To-do` / `To-Do`; `Check-ins` / `Check-Ins`; `Kanban` / `kanban`; `plan` / `package` / `Edition` — four naming inconsistencies across two pages each.
- `Creating and setting up a Project` appears in two help categories.
- `Basecamp Help` as an article title inside the `Using Basecamp` category.
- Sort default differs between category pages (`Popularity` on two, `Default` on one).
- Every image on the Hill Charts page has empty alt, including the seven diagrams that carry the argument.
- Features-page alt text duplicates the adjacent H2 verbatim on all sixteen sections.
- No status-page subscription controls, unlike the three other status pages in this corpus.
- `545 million to-dos completed` against `1.7 billion to-dos` publishes a 32% completion rate.
- `2,026 organizations signed up last week` in the year 2026 — unverifiable coincidence or unsignalled joke.
- The footer's thirty-five rhetorical link labels are unscannable for a user with a task, and produce thirty-five sentences in a screen-reader link list.

---

## Transferable patterns

1. **Disambiguate sign-in from sign-up by asking.** `Have an account? Sign in` / `Want an account? Sign up free`. Four extra words remove the most common first-click error on a SaaS homepage. Condition: only worth it where both audiences arrive at the same header.
2. **First-person issue-type pickers.** `I can't access my account` · `I'm confused about how something works` · `I think something is broken`. Hands the user the sentence they were about to construct, and the hedge in "I think" lowers the bar for the report that is hardest to get. Pair with `There are no stupid questions` at the top. The single most reusable artefact in this file.
3. **Second-person questions as form labels.** `What do you need help with?` · `What's your account URL?` — and helper text that names the *consequence* of the field, not its format: "This is where we'll get back to you. Double check that it's right."
4. **Explain a limit by naming what it does not limit.** "Archived or deleted projects don't count against your total. You could have dozens of projects, but only 3 can be active at once." Reframes a cap on history as a cap on concurrency, with a concrete counter-example. Applies to any quota — storage, seats, API calls, transactions.
5. **Make the promise structurally impossible rather than merely committed.** "We don't ask for a credit card to try Basecamp, **so we couldn't charge you even if we wanted to.**" Any product that does not hold a card at trial start should be saying this sentence.
6. **Name the dark pattern you do not use.** "no questions asked, no retention specialists trying to talk you out of it." More credible than claiming cancellation is easy, because it shows you know what the reader fears.
7. **Put the duration or count inside the CTA.** `Take a 3-minute tour` · `Start a 45-day free trial` · `Play this 1-minute video` · `Check out over 1,000 more customer testimonials`. The reader prices the click before making it.
8. **Model progress as uncertainty, not as percentage.** `uphill` / `over the hill` / `downhill`, and `Unknown to known, and known to done`. Then make the status **human-generated and attached to a group of work**, not computed and attached to items — and say so. And treat a stuck indicator as a diagnosis of bad decomposition: "the hill is telling us to break up the list."
9. **A scheduled-maintenance notice with the duration in it, posted 33 hours ahead.** "routine database maintenance… that will make it inaccessible for roughly 2 minutes." `roughly` hedges honestly; two minutes defuses the alarm entirely; `Please bear with us` asks for patience rather than apologising for fault; `Thanks!` signs off like a colleague.
10. **Bold the verdict, then explain.** Every one of eight pricing-FAQ answers opens `Yes` / `Absolutely.` / `Nope.` / `No.` before any reasoning. Write the FAQ heading in the reader's first person (`I have pricing questions…`) and at least one question in their incredulous voice ("Could we *really*… and still just pay $300/month **total**?").
11. **Reserve the right to withdraw, and grandfather in the same breath.** "We reserve the right to end the discount program… If we do, anyone who is already participating will continue to have their discounts applied." Bounded promise plus protected cohort, in two sentences.
12. **A one-sentence cookie banner stating the single actual purpose.** "We'd like to use cookies to help understand if our ads are working or not." — `No, thanks` / `Yes, that's fine`. Both buttons conversational, negative listed first and visually equal.
13. **Write onboarding for the participant who did not choose the product.** `Getting started as a client` — the person who will use it once, under supervision, and whose confusion becomes the buyer's reason to churn.
14. **Publish the accessibility *process*, not the feature list.** Ten named practices, the specific tooling (`axe`, `axe-core` in CI), the reasoning for the less obvious ones ("decorative elements create excess verbosity"), and a standing offer of the latest audit report on request.
15. **Sell keyboard navigation as speed.** "Hit `SHIFT` and little keys appear next to everything you can navigate to… no mouse required." Puts an accessibility affordance in front of every user rather than only those who need it.
16. **One register, top to bottom** — including in billing, status and support copy. Condition: only viable if the voice is *warm* rather than *jokey*, and if humour is kept out of every disclosure. Basecamp is the proof case for a single-register product voice; the other four products in this corpus all run gradients.

## Caveats & gaps

- **T6 and T8 are thin by product design, not by harvest failure.** Basecamp ships no status field, no priority levels, no workflow states and almost no observable empty states, because the product deliberately does not have them. This is recorded as the finding rather than as a gap. What replaces status — the Hill Chart model — was harvested in full from its dedicated page.
- **No error-message catalogue exists** (T7). No help article lists in-product error strings, and none was quoted on any of the twelve pages. Searched all four help category pages plus the support, pricing and features pages. A genuine absence, consistent with Linear and Asana and against Notion and Slack.
- **No help-article bodies were opened.** Roughly 70 article titles were captured across four category pages, plus the full Hill Charts marketing page. Titles are high-signal for IA and task phrasing but say nothing about answer structure, callout conventions, or in-article furniture. `The Basecamp Way To Work`, `Getting started as a client`, `Help Us Help You`, `Where did that go in Basecamp 5?`, `The Home Screen` and `Archiving, Trash, and Restoring` are the six highest-value follow-ups.
- **Three of seven help categories unharvested**: `Working With Your Team` (18 articles), `Account, Billing, & Settings` (15), `Personal Settings` (8), `Apps & Integrations` (7). The first would carry client-collaboration and permissions vocabulary; the second, billing-state language.
- **The `Learning Center` collection was not opened.** `The 37signals Way` (6 articles) and `Field Guides` (5) are where the methodology content lives and would be the richest remaining T13/T14 source.
- **Basecamp 2 and Basecamp Classic help centres unharvested.** Two additional live help properties for two legacy product generations; a comparison across the three would show a decade of terminology drift, which no other product in this corpus offers.
- **No published voice-and-tone guide or design system was found**, and unusually this is a substantive absence rather than a routine one — 37signals is a publisher of methodology (`Getting Real`, `Shape Up`, `Manager Playbook`, `Employee Handbook`, `How we communicate`, `Seven shipping principles`) and none of the eight guides in the footer was opened. `How we communicate` in particular is likely to contain writing principles. All T14 findings here are inferred from copy, not read off a stated standard, but the standard may well exist in an unharvested footer essay.
- **Eight footer essays unharvested**: `How we make decisions`, `Group chat problems`, `Why we choose profit`, `Seven shipping principles`, `How we communicate`, `Kill overkill`, `We stand with the underdogs`, `Leaving the Cloud`. Several would bear directly on the company's content philosophy.
- **`/paths`, `/5`, `/agents`, `/reliable`, `/live`, `/learn`, `/classes`, `/keyboard`, `/discounts`, `/security`, `/privacy` unharvested.** `/paths` ("Why so many switch to Basecamp") would carry competitive-migration language; `/keyboard` would complete the accessibility picture.
- **No live incident during harvest.** The status page yielded a complete *scheduled-maintenance* narrative (Sep 15) but no unplanned-incident copy, so Basecamp's `Investigating` / `Identified` / `Monitoring` / `Resolved` register is unobserved. The maintenance states (`Scheduled` / `In progress` / `Completed`) are a different set.
- **The status page carries no subscription controls**, so no notification-preference copy was available there.
- **In-product strings are documented at best.** Only three in-product strings were captured: `Track this on the Hill Chart`, `Update` (the Hill Chart button), and `All Files` (an Everything View instance). Everything else in T5 is from public forms and pricing tooltips.
- **Single locale, no localisation surface.** A help article titled `Using Basecamp in other languages` exists, implying the product has some language support, but the marketing site offers no locale switcher and no translated pages were found.
- **Mobile app copy not harvested** — out of the public web surface, though the accessibility page names the iOS and Android apps as the recommended screen-reader targets.
- **The homepage's CEO letter is signed with a real email address**; it is reproduced here only as the observation that it exists, not as contact data to act on.

## Sources

1. https://basecamp.com/
2. https://basecamp.com/pricing
3. https://basecamp.com/features
4. https://basecamp.com/hill-charts
5. https://basecamp.com/support
6. https://basecamp.com/accessibility
7. https://basecamp.com/help
8. https://5.basecamp-help.com/
9. https://5.basecamp-help.com/category/1053-getting-started
10. https://5.basecamp-help.com/category/1041-using-basecamp
11. https://5.basecamp-help.com/category/1041-using-basecamp/2
12. https://5.basecamp-help.com/category/1042-troubleshooting-faqs
13. https://www.37status.com/
