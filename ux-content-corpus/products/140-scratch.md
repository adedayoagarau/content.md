# 140. Scratch

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Children's visual programming (non-profit); block-based coding tool plus a moderated creative community for ages ~8–16, operated by the Scratch Foundation with the MIT Media Lab |
| Primary URL | https://scratch.mit.edu/ |
| Corpus rank | 140 |
| Benchmark strength (source list) | Child-friendly creation guidance |
| Locale / market observed | en; the editor is translated into "40+ languages" by volunteers, and the help centre offers **41 languages** |
| Platform observed | Web — `scratch.mit.edu` server-rendered info pages, `scratchfoundation.org` marketing site, `mitscratch.freshdesk.com` help centre |
| Auth state | Unauthenticated public surfaces only. No community feature was used; no individual child's profile, project, studio or comment was viewed or collected. All findings come from Scratch's own published guidance pages. |
| Regulatory posture | **COPPA-shaped by design** rather than by declaration: the account requires only a username, password, and email for verification; `gender, age (birth month and year), country` plus email are the stated collection set; teacher-created student accounts require **no email at all**; and an offline `Scratch app` is offered explicitly so a child can create "without submitting any Personal Information to us". **EU Digital Services Act** — dedicated `EU Digital Services Act Trusted Flaggers` and `EU Digital Services Act (DSA) Single Point of Contact` articles. A `Law Enforcement Requests` help folder. `Scratch Terms of Service`, `Scratch Privacy Policy`, `Scratch Cookies Policy` published. US privacy-law compliance answered with a **deliberately bounded** claim (see T10). All projects are licensed **Creative Commons Attribution-ShareAlike** by default. Safeguarding is delivered as moderation plus a `Report` button plus a filter, not as background checks (there are no paid teachers). |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | **Partial — the main application is blocked.** `scratch.mit.edu/` (homepage), `/about`, `/parents`, `/educators`, `/educators/faq`, `/terms_of_use`, `/privacy_policy`, `/accessibility` and `/info/help` all returned **empty bodies** (client-rendered React). The two `scratch.mit.edu` pages that *are* server-rendered — `/community_guidelines` and `/info/faq` — are fortunately the two most valuable for this benchmark, and both were captured in full. Parent/educator content was recovered from `scratchfoundation.org` and the Freshdesk help centre instead |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Community Guidelines | https://scratch.mit.edu/community_guidelines | **The central artefact of this file** — six rules written to a child, full text plus alt text |
| FAQ | https://scratch.mit.edu/info/faq | Nine sections, ~60 questions; the richest single source in this batch |
| Ideas (tutorials) | https://scratch.mit.edu/ideas | Tutorial titles, grouping, the no-YouTube fallback |
| Homepage & app pages (blocked) | https://scratch.mit.edu/ , `/about`, `/parents`, `/educators`, `/terms_of_use`, `/privacy_policy`, `/accessibility`, `/info/help` | Empty bodies |
| Scratch Foundation home | https://www.scratchfoundation.org/ | Mission copy, `Getting Started` trio, community framing |
| Scratch Foundation: For Families | https://www.scratchfoundation.org/learn/for-families | Parent-facing register, `Online Safety & Privacy` block |
| Scratch Foundation: Learning Library | https://www.scratchfoundation.org/learn/learning-library | The four-audience `Learn` nav |
| Help centre knowledge base | https://mitscratch.freshdesk.com/en/support/solutions | 8 categories, ~40 folders, ~160 articles — full IA |
| Help: How can I stay safe on Scratch? | https://mitscratch.freshdesk.com/en/support/solutions/articles/4000156778-how-can-i-stay-safe-on-scratch- | The child-facing PII list |
| Help: How do I limit the interactions my child has with other Scratchers? | https://mitscratch.freshdesk.com/en/support/solutions/articles/4000211810 | Parent-facing; an honest "we don't offer that" |
| Help: Accessibility folder | https://mitscratch.freshdesk.com/en/support/solutions/folders/4000040849 | Five articles, **all about translation** — see T14 |

---

## T1 Navigation & IA labels

**Main-site navigation** `[absent]` — blocked. The signed-out header (`Create`, `Explore`, `Ideas`, `About`, `Join Scratch`, `Sign in`) is client-rendered and was not observable.

**Observable IA — the Foundation site's `Learn` menu, split four ways by reader** `[observed]`

`Learning Library` · `For Kids` · `For Families` · `For Educators`

Four audiences, named as three different relationships to a child plus one library. `For Kids` is the notable entry — Scratch is the only product in this batch with a **top-level navigation item addressed to the child**. Outschool (file 139) routes everything through the parent; Scratch gives the child their own door, at the same level as their parent's and their teacher's.

Each of the three audience pages carries a one-line scope in the cross-link block:

| Label | Scope line (verbatim) |
|---|---|
| `Learning Library` | "Find Scratch-approved activities, lesson plans, and more!" |
| `For Kids` | "Supporting youth with coding tools and leadership." |
| `For Educators` | "Access resources, create Teacher Accounts, and connect with peers." |

`Supporting youth with coding tools and **leadership**` is worth flagging: the child-facing page is described in terms of agency, not consumption.

**Foundation footer** `[observed]`: `About` (`Leadership` · `Careers` · `News` · `Blog`) · `Get Involved` (`Donate` · `Shop` · `Partner with Us`) · `Help Center` (`Get Help` · `Give Feedback` · `Scratch & AI` · `Site Map`). `Scratch & AI` as a first-class footer item is a 2020s addition and sits in the *help* group rather than in `About` — positioned as something a user needs explained, not as a brand claim.

**Help centre — eight categories, each with a scope line and a count** `[observed]`

| Category | Scope line (verbatim) | Folders |
|---|---|---|
| `Questions about Scratch` | "Here you can find answers to questions about accessibility, system requirements, the Scratch Foundation, and more!" | 8 |
| `ScratchJr` | "All your questions about ScratchJr can be found here!" | 1 |
| `Editor and Projects` | "Questions about blocks, sprites, sound, and other project components are found here!" | 8 |
| `Account Management` | "Here you will find answers to questions about signing up for Scratch, logging in and out, password recovery, account deletion, and other account-based settings or actions!" | 5 |
| `Educator Tools` | "Questions about teacher and student accounts, as well as educator resources, can be found here!" | 2 |
| `Privacy, Trust, and Safety` | "Question about comment filtering, Scratch's reporting system, content moderation policies, community guidelines, and any community security concerns are found here!" | 9 |
| `Scratch Membership` | *(none)* | 1 |
| `Scratch Shop` | "Questions about the Scratch Shop can be found here!" | 3 |

**Every scope line ends in an exclamation mark**, including the one on the Privacy, Trust and Safety category. That is a register decision applied uniformly by a template rather than judged per-category, and on the trust-and-safety card it reads slightly wrong. (It also contains a grammatical error — "Question about comment filtering" — singular where plural is needed.)

**The `Privacy, Trust, and Safety` folder tree is the IA finding** `[observed]` — nine folders, and the *mix* of audiences inside one category is the point:

`Banned and Blocked Accounts` (2) · `Community Guidelines and Moderation` (3) · `Copyrighted Materials` (5) · `EU Digital Services Act` (2) · `Filter` (2) · `Law Enforcement Requests` (1) · `Reporting` (6) · `Safety` (8) · `Legal Documents` (9)

A single category holds `How can I help my friend get unbanned?` (a nine-year-old's question), `How do I limit the interactions my child has with other Scratchers?` (a parent's), `EU Digital Services Act (DSA) Single Point of Contact` (a regulator's) and `How can law enforcement, and others legally authorized to seek information, contact Scratch?` (a police officer's). **Four audiences with radically different reading ages in one folder tree, and Scratch does not segment them.** Compare Outschool's rigorous `: For Parents` / `: For Teachers` suffixing. Scratch's approach is riskier and, on the evidence of the article titles, works — because each *title* is written in its own audience's voice, so the reader self-selects on the title rather than on the category.

## T2 Value proposition & headline patterns

**The Foundation hero, and a mission line that sits above the nav** `[observed]`

> `Helping kids everywhere create what they imagine`

Eight words, and every one of them load-bearern: **kids** (audience), **everywhere** (free and global), **create** (the verb), **what they imagine** (ownership of the idea). No mention of coding, programming, STEM, careers or skills. On a coding platform for children, the value proposition does not contain the word "code" — because the buyer here is a parent or donor who needs to be told this is about the child's imagination, not about employability.

**The three-word product tagline** `[observed]`: `Imagine, create, share!`

Three verbs, imperative, in the order of the actual workflow, ending in the social act. This is the most economical statement of a product model in the whole 200-product corpus so far. It is also **the child's version of the mission line above** — the Foundation says "helping kids create what they imagine" to adults; the product says "Imagine, create, share!" to children. One idea, two registers, three words.

**The one-sentence description** `[observed]`

> "Scratch is the world's largest creative learning community for kids, where young people bring their stories, games, and animations to life and share them with peers around the world in a **safe, moderated online community**."

Note where "safe, moderated" falls: at the **end**, after the creative promise. A parent needs both; Scratch leads with the reason to want it and closes with the reason to allow it. Contrast the FAQ's own description, which Scratch supplies for third parties to reuse:

> "Scratch is a coding language and online community where you can create your own interactive stories, games, and animations -- and share your creations with others around the world. As young people create and share Scratch projects, they learn to think creatively, reason systematically, and work collaboratively."

**`think creatively, reason systematically, and work collaboratively`** is the pedagogical claim, and it appears verbatim in both the FAQ and the brochure boilerplate — a triplet held stable across a decade of copy. It is also the answer to "why should a school allow this", stated in the vocabulary a curriculum committee uses.

**Section headings on the Foundation site** `[observed]`: `Creating with Scratch` · `Our Community` · `Research-Backed & Kid-Centered` · `Getting Started` · `See What Scratchers are Making!` · `Imagine, create, share!`

`Research-Backed & Kid-Centered` is the compound the whole positioning rests on — and the body earns it by naming the research lineage ("developed at the MIT Media Lab in 2007 by a team of educational experts and researchers led by Professor Mitchel Resnick") and then making a continuity claim: "While technology has changed in the last 20 years, Scratch's values have not… we continue to design **with and for** our community of young people." `with and for` is the distinction that separates designing for children from designing with them, and it is stated in three words.

**The "no barrier" framing** `[observed]`, from `Creating with Scratch`:

> "Kids bring Scratch projects to life using a simple, block-based coding interface that they can drag and snap together: **no tricky syntax required.**"

`drag and snap` is the physical verb pair a child understands; `no tricky syntax required` names the thing a child fears using the adjective a child would use (**tricky**, not "complex" or "error-prone"). Then the permission clause: "Scratch is built on free expression, experimentation, and play – whether children are excited about visualizing math equations or **making their doodles dance and sing**, Scratch can help them make their ideas a reality." Putting "visualizing math equations" and "making their doodles dance and sing" in the same sentence, as equals, is the sentence that tells a child their frivolous idea is allowed.

**Funding appeal, aimed at parents, repeated five times on the homepage** `[observed]`

> `Scratch is free for everyone. Supporters make that possible.`
> "200 million kids create on Scratch for free, because of support from families like yours. You can help a child make something amazing today."

The construction — **fact, then dependency, then a single-child ask** — moves from 200 million to "a child" in two sentences. `make something amazing` is the child's vocabulary used in an adult's donation appeal, which keeps the appeal about the outcome rather than about the organisation. (The block is duplicated five times in the DOM, which is a responsive-variant artefact rather than a design decision.)

**The remix invitation, and the pun** `[observed]`:

> "Don't want to "start from Scratch"? Try remixing and make this dance party project your own!" → `Remix!`

The brand name is also an English idiom, and Scratch uses it — in scare quotes, so a child who does not know the idiom is signalled that something is going on. The CTA is one word and an exclamation mark.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Create` | Foundation header and footer; links straight into the editor with `?tutorial=getStarted` | **One word, and it bypasses signup entirely** |
| `Remix!` | Getting-started trio | One word plus an exclamation mark |
| `Explore Ideas` | Getting-started trio | |
| `Discover Tutorials` | Getting-started trio | |
| `Explore` | Under each featured project | Not "View project" — invites poking around |
| `View Project` | Under each project on the Families page | **Inconsistent with `Explore` on the homepage for the same action** |
| `Donate` / `Donate Now` | Homepage (×5), footer | |
| `Getting Started` | Families page | |
| `Scratch Shop` | Header | |
| `Report` | The reporting affordance, named in the guidelines and the FAQ in quotes: `click "Report"` | See T7 |
| `Report this` | The cloud-variable reporting control — **a second, different label for reporting** | Flagged |
| `Contact Us` | "available at the bottom of every page" | Explicitly located for the child |
| `Join` | Documented in the FAQ: "Just click "Join" on the Scratch home page." | Not "Sign up" |
| `Download the guide for more details!` | Foot of the Community Guidelines | |
| `Get Help` / `Give Feedback` | Foundation footer | |
| `Submit a ticket` | Help centre nav | |
| `Print` | Foot of each help article | |
| `Skip to main content` | Help centre, top of DOM | |

**Observation.** The two most important CTAs are single words — `Create` and `Remix!` — and `Create` links directly into the editor with a tutorial parameter, so **a child can begin making something without an account, a plan, or a decision.** That routing choice is the strongest content-adjacent decision on the platform: the FAQ confirms it in words ("Even without an account, you can play other people's projects, read comments and forums, and even create your own projects"), so the no-account path is both built and documented.

Two inconsistencies: `Explore` vs `View Project` for the same action on two Foundation pages, and `Report` vs `Report this` for the same function in two places.

## T4 Onboarding & getting-started

**Three named entry points, each with a one-line pitch, ordered by commitment** `[observed]`

| Entry | Copy (verbatim) |
|---|---|
| `Learning Library` | "Learn Scratch tips and tricks from our team with video tutorials, printable guides, and beyond." |
| `Ideas Page` | "Get started with beginner-friendly tutorials and starter projects **right inside of the Scratch editor**." |
| `Remixing` | "Don't want to "start from Scratch"? Try remixing and make this dance party project your own!" |

The third is the pedagogically distinctive one. **Remixing is offered as an onboarding route** — start from someone else's finished thing and change it — which removes the blank-canvas problem entirely. It is placed third, as the option for the child who bounced off the first two, and it is framed as a *preference* ("Don't want to…?") rather than as a fallback.

**The tutorial library, grouped by what a child wants to do** `[observed]`, from the Ideas page:

| Group | Sample tutorial titles (verbatim) |
|---|---|
| `Sprites & Vector Drawing` | `Create a Sprite with the Scratch Paint Editor` · `Remix and Re-imagine Scratch Sprites` · `Bring Your Drawings Into Scratch` · `Sounds in Scratch: Add, Record, and Use Text to Speech Blocks` |
| `Tips & Tricks` | `Scratching the Surface: Adjust Block Language and Contrast` · `Scratching the Surface: Direction and Costume Drawing` · `Scratching the Surface: Costume Center` · `Scratching the Surface: X & Y` |
| `Advanced Topics` | `Conditional Statements: Make Interactive Projects (Part 1)` · `What Are Variables and Lists in Scratch? (Part 1)` · `Scratch My Blocks, Part 1: Create Custom Blocks` · `Turtle Graphics: Using Pen Blocks in Scratch` |

Every title carries a **running time** (`2:16`, `1:00`, `4:33`, `6:33`) — a child gets the cost before the click, and the `Tips & Tricks` series is deliberately pinned at one minute each.

**The two title patterns are worth separating:**

- `Bring Your Drawings Into Scratch` — **imperative verb + the child's own possession.** "Your drawings", not "images" or "assets". The tutorial is named after the thing the child already has and wants to use.
- `Conditional Statements: Make Interactive Projects` — **concept colon outcome.** The computer-science term is not hidden, but it is immediately followed by what it lets you make. `What Are Variables and Lists in Scratch?` uses the question form for the same job.

`Scratching the Surface` as a series name is a pun on the product name doing double duty as a difficulty signal (surface-level = quick tips).

**The FAQ names the in-editor tutorial library and quotes its titles** `[observed]`: "You'll find tutorials for entire projects (like `"Make a Chase Game"`) or specific blocks and features (such as `"Record a Sound"` or `"Make it Spin"`). More tutorials will be added soon (such as `"Pong Game"` and `"Make It Fly"`)."

**`Make a Chase Game` · `Record a Sound` · `Make it Spin` · `Pong Game` · `Make It Fly`** — five tutorial names, four of which are imperative verb phrases, all of them naming a *made thing* or an *observable effect*. `Make it Spin` is three syllables and describes a result a child can see in two seconds. This is the clearest evidence in the file of a deliberate naming rule: **a child-facing tutorial is named after the thing that happens, not after the mechanism that makes it happen.** (`Make It Fly` and `Make it Spin` capitalise "It" differently — a small casing inconsistency inside one sentence.)

**The account-progression narrative** `[observed]`, and this is an onboarding artefact in its own right:

> "When you create an account, you'll be labelled as a `"New Scratcher."` To make the transition to `"Scratcher"`, you should make and share projects, comment helpfully on other Scratchers' projects, and **be patient!** After you've met the requirements, a link will appear on your profile page inviting you to become a Scratcher, and you'll have some additional capabilities on the Scratch website. (Note that we don't promote New Scratchers to Scratcher on request )"

Three things. The progression is **behavioural, not temporal** — make things, comment helpfully — so the status is earned by doing the thing the community exists for. `be patient!` is an instruction to a child about their own impatience, stated as a step in the list. And the parenthetical closes the loophole a child will immediately try, in the child's own framing ("on request"), which is the sentence that saves the moderation team a thousand messages. The requirements themselves are deliberately not published — a defensible anti-gaming choice, undermined slightly by the fact that the FAQ lists two of them anyway.

**Defect:** a stray space before the closing parenthesis, and the sentence has no full stop — `"…on request )"`.

## T5 Form & field labels

`[absent]` for the signup, project-editor and profile forms — blocked. What follows is documented in the FAQ.

**Documented field and setting names** `[documented]`

| Name | Role / notes |
|---|---|
| `Join` | The signup entry, on the home page. "You'll need to respond to a few questions, and provide an email address. It takes just a couple minutes, and it's totally free!" — **three reassurances about the form: it's short, it's quick, it's free** |
| `Account Settings` | The settings root |
| `Email tab` / `Email Settings page` | Where confirmation state lives |
| `Password Settings page` | |
| `Password Reset page` | Accepts "your username **or** email address" |
| `"I want to delete my account"` | The deletion control, quoted verbatim as a **first-person sentence** at the bottom of settings |
| `Make a Variable` | Editor control |
| `Cloud variable (stored on server)` | **A checkbox label that contains its own privacy explanation in a parenthetical** |
| `Extensions` | Editor control, bottom-left |
| `"credits" section` | Where a child attributes borrowed work |
| `Tutorials` link | Top navigation bar of the editor |
| `Report` / `Report this` | Two labels for reporting |
| `globe` icon | The language selector, named by its shape because a child recognises the shape before the word |

**`Cloud variable (stored on server)` is the best field label in this file.** A nine-year-old ticking a checkbox is told, inside the label, where the data goes. The FAQ then reinforces it ("The data associated with your cloud variable will be stored on the server, preserved over time, and **accessible to anyone who opens the project**") and constrains the data type to numbers only, which is a privacy control implemented as a type restriction rather than as a warning.

**`"I want to delete my account"` as a control label** is the first-person-confession pattern applied to a destructive action. The FAQ's follow-up is written for a child who might click it impulsively: "But you should only do this if you are **absolutely sure** that you want to delete your account." — and a separate help article exists for the aftermath (`I want my deleted account back. Can you restore it?`).

## T6 Status & state language

**Account and membership states** `[observed]` / `[documented]`

| State | Copy / notes |
|---|---|
| `New Scratcher` | The entry state, in quotes in the FAQ. Restricted: cannot use cloud variables |
| `Scratcher` | The earned state, with "some additional capabilities" |
| `unconfirmed` | "you will see the text `"Your email address is unconfirmed"` in **orange**" |
| confirmed | "Confirmed email addresses will show a small **green checkmark**" |
| `blocked` | Account state — see below |
| `banned` | Used interchangeably with "blocked" in help titles (`My account is banned. What should I do?`) — **two words for one state** |
| `muted` | Comment state after filter action (`Why did my comment get blocked by the filter or muted?`) |
| `shared` / `unshared` | Project visibility, and the whole privacy model rests on it |
| `remix` | A derived project, with lineage |
| `paused` | `Scratch Membership` programme state (`What will happen to membership perks while the program is **paused**?`) |

**The confirmed/unconfirmed pair is worth recording as a pattern**: the FAQ tells the child **the colour and the shape** of the state indicator, not just its meaning — orange text, green checkmark. For a reader who may struggle with the word "unconfirmed", "the orange text" and "the small green checkmark" are more findable than the label. Colour is used as a locator in prose, which is legitimate (the state is also in text), though it would fail for a colour-blind child if the prose were the only route.

**`What happens when an account is blocked?` — the clearest consequence copy on the platform** `[observed]`

> "When an account is blocked, the owner can no longer access their account, use it to create projects, or post new comments. When they login, they see a page that explains why the account was blocked, along with a **web form they can use to request to be unblocked**. If the owner can show that they understand why their account was blocked, and promises to follow the Scratch Community Guidelines in the future, they will be unblocked."

Four sentences that do the whole job: what stops working (three specific things), what the child will see, what they can do about it, and **the exact condition for reversal**. That last sentence is the important one — the path back is *demonstrating understanding and promising future compliance*, not serving time. For a child, a sanction with a stated, achievable exit is the difference between a lesson and a punishment. And the platform is telling the child, in advance, that the blocked screen will explain itself — so the eventual error state is pre-announced here.

**The multi-account consequence, stated as a warning to the innocent party** `[observed]`

> "It's fine to have a few accounts on the Scratch website, as long as none of them are used to break the Community Guidelines. In that case, **all related accounts may be blocked or deleted.**"
> "If you share an account with someone who does something bad with it, this means your accounts can be blocked for what the other person did."

The second sentence restates a technical enforcement rule (network/account linkage) as a personal consequence in the second person, with "the other person" as the agent. A child who reads only that sentence understands the risk of lending their login to a friend. `does something bad` is the register — not "violates the guidelines", not "engages in prohibited conduct".

## T7 Error, failure & recovery

**The reporting instruction, stated three times in three registers** `[observed]`

In the Community Guidelines (to a child, mid-rule):

> "If you think something on Scratch is mean, insulting, too violent, or otherwise disruptive to the community, click `"Report"` to let us know about it. Please use the `"Report"` button rather than engaging in fights, spreading rumors about other people's behavior, or otherwise responding to any inappropriate content. The Scratch Team will look at your report and take the appropriate action."

In the FAQ (`What do I do if I see something that's inappropriate?`):

> "You can click the link that says `"report"` on any project, comment, discussion post, studio, or profile page where you see something that isn't ok for Scratch. If the situation is complicated, you can use the `Contact Us` link (available at the bottom of every page) to explain. Be sure to include as much detail as you can, with links to relevant pages."

In the FAQ (`What do I do if I see someone being mean or disrespectful?`):

> "**Don't add to the flames!** Responding to mean comments with more mean comments just makes things worse, and could result in your account being blocked. Instead, simply report anything that is disrespectful or unconstructive, and we'll follow up with the author. We check reports every day, multiple times per day - **so rest assured, we'll sort things out.**"

**This third one is the best piece of children's UX writing in the corpus so far, and it is worth taking apart clause by clause.**

- `Don't add to the flames!` — a metaphor, three words, and it names the impulse before the rule. A child about to type an angry reply recognises themselves.
- "Responding to mean comments with more mean comments just makes things worse" — the reason, stated as cause and effect with no jargon and a repeated word (`mean comments` twice) so the sentence is easy to parse.
- "and could result in your account being blocked" — the self-interested consequence, second, after the moral reason.
- "Instead, simply report anything that is disrespectful or unconstructive" — the alternative action, with `simply` doing the work of "this is easy".
- "and we'll follow up with the author" — the platform takes over. The child is relieved of the duty.
- "We check reports every day, multiple times per day" — **a specific, checkable service-level claim.**
- "so rest assured, we'll sort things out" — and then the reassurance, last, once it has been earned by the fact above it.

**Impulse → reason → consequence → alternative → handover → SLA → reassurance.** Seven moves in four sentences, addressed to an upset child. Most adult-facing conflict copy manages three of the seven.

**What moderation actually does, published** `[observed]`, `What does the Scratch team do when something is reported or flagged?`:

> "The Scratch Team reviews reported comments and projects every day. If something breaks the Scratch Community Guidelines, we will remove it and **send a warning to the account**. We may also block the accounts or networks that were used to share it, depending on what was shared and if the person has been sent warnings before"

An escalation ladder — remove + warn → block account or network — with the two factors that decide it named (severity and prior warnings). Note the modal discipline: "we **will** remove it and send a warning" (certain) versus "We **may** also block" (discretionary). Same correct modal split as Skillshare's self-harm ladder. **Defect:** the sentence has no closing full stop.

**The hardest article on the platform, and it holds its nerve** `[observed]`, `Someone got access to my account and got my account blocked. What do I do?`:

> "**You are responsible for keeping your password secure.** If someone you know took control of your account and did bad things, **tell the adults in charge of the computer they used.** If you think someone you don't know has access to your account, change the password and / or use the `Contact Us` link to explain the situation. If your account was blocked for doing something that you did which broke the Scratch Community Guidelines, **please don't tell us that someone else did it.** When people tell us someone else used their account to do something bad, we then need to try and talk to that person before we can restore the account. This means your account will just stay blocked for a lot longer than if you are honest with us about what happened."

This is a platform telling a child, in plain words, **not to lie to it** — and then giving the child a *self-interested* reason rather than a moral one ("your account will just stay blocked for a lot longer"). The escalation to `tell the adults in charge of the computer they used` is the safeguarding move: for a school or library computer, the remedy is not technical and the child is pointed at a nearby adult. And the three cases are cleanly separated: someone you know, someone you don't know, and it was actually you. A child can find their own case in three sentences.

Compare Wise's `I sent money to the wrong person`. Scratch's version is the same first-person-confession architecture, but written for a reader who may be *motivated to conceal*, which is a harder problem, and it solves it with incentive rather than with instruction.

**Other recovery article titles, all in the child's voice** `[observed]`:
`Why can't I save my project?` · `Why did I get signed out?` · `Why do I become signed out immediately after signing in?` · `What do I do if I can't log in with my password?` · `I forgot my password or username. How can I reset it?` · `My project code isn't working, what do I do?` · `I need help making a project.` · `I never received a confirmation email. What should I do?` · `Why can't I see my project when I search for it?` · `Why can't I create a studio?` · `Why can't I share projects on Scratch?` · `Why did my comment get blocked by the filter or muted?` · `My account is banned. What should I do?` · `How can I help my friend get unbanned?` · `I want my deleted account back. Can you restore it?` · `My friend's account was hacked!` · `I didn't change my password, but I received an email about a password change request. What should I do?` · `How come math with decimals gives me results with too many digits?`

Four of these deserve comment. **`I need help making a project.`** is a statement, not a question, and it has a full stop — a child who does not know what to ask still finds it. **`How can I help my friend get unbanned?`** anticipates that the child arriving is the *friend of* the sanctioned user, which is a real and otherwise unserved intent. **`My friend's account was hacked!`** carries the child's exclamation mark into the title. And **`How come math with decimals gives me results with too many digits?`** uses `How come` — spoken-register, not written-register — for a floating-point question that in any adult product would be titled "Floating-point precision".

**Pre-emptive failure handling on the Ideas page** `[observed]`:

> `Computer doesn't allow Youtube? Download written guides for these topics.`

Six words of question, six of remedy. It anticipates the **school or library network that blocks YouTube** — the single most common environmental failure for this audience — and supplies an alternative format rather than an apology. This is the same family as Udemy's "Issues with the Contact Us button?" but aimed at a constraint the child cannot fix, which makes the alternative essential rather than merely helpful.

## T8 Empty states

`[absent]` — no true empty state was observable; the editor, profile, studios and search are all behind the blocked client-rendered app.

**Observed — help-centre search scaffolding** `[observed]`

> `Recent Searches` → `Clear all` → `No recent searches`
> `Popular Articles` (heading, populated client-side)
> `Sorry! nothing found for` *(interpolated query follows)*
> `![no results]` (an illustrated no-results asset)

`No recent searches` is correct and clean. The no-results string is the **same defect recorded for Udemy in file 137** — lower-case after an exclamation mark, a fragment ending in a dangling preposition awaiting interpolation, and an exclamation mark on a failure. Both are Zendesk/Freshdesk-family help centres, so this is a vendor-template defect inherited rather than authored — worth recording precisely because it shows where a platform's own voice stops.

**Documented empty-state-adjacent copy** `[observed]`: the FAQ's answer to `Why is it useful to have a Scratch account?` functions as an anonymous-user empty state in prose — "Even without an account, you can play other people's projects, read comments and forums, and even create your own projects. But you need an account to save and share projects, write comments and forum posts, and participate in other "social" activities in the community (like "loving" other people's projects)." **Three things you can do, then four things you cannot, then the reason to sign up** — the FutureLearn negation-list pattern, written for a child, with `"loving"` glossed in quotes because it is product jargon.

## T9 Notifications & system messages

**Documented email and system messaging** `[observed]`

- Account confirmation: "you'll receive an email message with a link. Just click the link to confirm your account." Then the realistic caveats: "If you cannot find the email with the confirmation link, check your **Spam folder**." and "**Please note that it may take up to an hour for the email to arrive.** If you still don't see the email after an hour, let us know." — **a stated latency (an hour) and a stated next step after it elapses.** For a child who will refresh their inbox every ten seconds, "up to an hour" is the single most useful sentence available.
- Confirmation unlocks named capabilities: "Once you confirm your account, you'll be able to share projects, write comments, and create studios. Confirming your account also lets you receive email updates from the Scratch Team."
- Security notification handled as its own article: `I didn't change my password, but I received an email about a password change request. What should I do?` — the unexpected-security-email case, titled as the child's experience.
- **Phishing, with the legitimate domains named** `[observed]`: "The Scratch Team's emails may come from addresses at `scratch.mit.edu` or `scratch.org`. Any emails you may get from other email addresses are not coming from the Scratch Team. **Do not open the email** and let us know about it at `Contact Us`!" Two domains, one rule, one action. Telling a child the exact two domains is more usable than any amount of advice about "checking the sender".
- Warnings are a named notification type in the moderation ladder ("send a warning to the account").
- `Scratch Membership` programme pause documented as two public articles (`What is happening to the Scratch Membership program?` / `What will happen to membership perks while the program is paused?`) — a **product being paused, explained publicly, in advance**, with the consequence for existing holders given its own article. Same for `What is happening to the Scratch Shop?`.

**Help-article feedback control** `[observed]`

> `Was this article helpful?` `No` / `Yes`
> `That's Great!` / `Thank you for your feedback`
> `Sorry! We couldn't be helpful` / `Thank you for your feedback`
> then a reason picker: `Need more information` · `Difficult to understand` · `Inaccurate/irrelevant content` · `Missing/broken link`
> `Select at least one of the reasons` · `Please give your comments` · `Your e-mail address *`
> `We appreciate your effort and will try to fix the article`

**`Difficult to understand` as a first-class feedback reason on a children's platform is the right option to offer** — it is the failure mode that matters most for this audience, and putting it second in the list makes it easy to pick. Against that: the negative branch demands an email address and a CAPTCHA before the feedback can be sent, which on a site for eight-to-sixteen-year-olds is a meaningful barrier and sits oddly with the platform's own guidance not to share email addresses. Flagged. (`No` is also rendered before `Yes` in the DOM — an unusual order.)

## T10 Disclosures, legal & compliance

### The Community Guidelines — six rules written to a child

`[observed]` This is the artefact the brief asks for and it deserves a full structural account.

**Frame (two sentences, before any rule):**

> "Scratch is a friendly and welcoming community for everyone, where people create, share, and learn together."
> "We welcome people of all ages, races, ethnicities, religions, abilities, sexual orientations, and gender identities."

The second sentence is a seven-item enumeration of identity categories in a document a nine-year-old reads. Scratch does not abstract it to "everyone is welcome" — it lists the axes, which is how a child in one of those categories learns they are specifically included.

**The six rules.** Each is an **imperative sentence terminated with a full stop**, used as a heading; followed by a one-line expansion; followed by one to three short paragraphs; followed by an illustration.

| # | Rule (verbatim heading) | One-line expansion (verbatim) |
|---|---|---|
| 1 | `Treat everyone with respect.` | "Scratchers have diverse backgrounds, interests, identities, and experiences." |
| 2 | `Be safe: keep personal and contact information private.` | "For safety reasons, don't give out any information that could be used for private communication, in person or online." |
| 3 | `Give helpful feedback.` | "Everyone on Scratch is learning." |
| 4 | `Embrace remix culture.` | "Remixing is when you build upon someone else's projects, code, ideas, images, or anything else they share on Scratch to make your own unique creation." |
| 5 | `Be honest.` | "It's important to be honest and authentic when interacting with others on Scratch, and remember that there is a person behind every Scratch account." |
| 6 | `Help keep the site friendly.` | "It's important to keep your creations and conversations friendly and appropriate for all ages." |

**Six rules is the whole policy.** No numbering, no sub-clauses, no "including but not limited to", no enforcement schedule, no definitions section. Compare FutureLearn's fifteen numbered rules and Skillshare's three-part structure with a twelve-item prohibition list. The FAQ tells the child this explicitly and uses it as a reason to read them: "Check out the Scratch Community Guidelines - **they're brief and don't include a lot of legal stuff.** There's a link at the bottom of every page on Scratch." Announcing the *brevity* of your policy, and its *location*, in the FAQ answer to "how do I know what's okay", is a content-design decision about compliance-by-readability.

**Rule 1 — the sentence that does the work** `[observed]`:

> "Everyone on Scratch is encouraged to share things that excite them and are important to them—we hope that you find ways to **celebrate your own identity** on Scratch, and **allow others to do the same.** It's **never OK** to attack a person or group's identity or to be unkind to someone about their background or interests."

The rule is expressed as a *positive permission* first (celebrate your own identity) and only then as a prohibition, and the prohibition uses the absolute child-register construction **"never OK"** rather than "is prohibited" or "violates our policy". `allow others to do the same` converts the permission into the obligation in five words — reciprocity taught rather than asserted.

**Rule 2 — the concrete list** `[observed]`. This is the only rule with an enumeration, and every item is a thing a child possesses:

> "This includes sharing real last names, phone numbers, addresses, hometowns, school names, email addresses, usernames or links to social media sites, video chatting applications, or websites with private chat functionality."

Note the scope: not "personal information" but **"any information that could be used for private communication"**. The rule is defined by the *risk mechanism* rather than by a data category, which is why the list can include "websites with private chat functionality" — a thing a child would not think of as personal information at all. `hometowns` and `school names` are the two a child would most naturally volunteer.

**Rule 3 — a three-part feedback formula, in one sentence** `[observed]`:

> "When commenting on a project, remember to **say something you like about it, offer suggestions, and be kind, not critical.**"

Three moves in fourteen words, and the third is a contrast pair (`kind, not critical`) rather than an adjective. Preceded by the reason, which is four words long and disarms the whole problem: **"Everyone on Scratch is learning."** Then the invitation: "We encourage you to try new things, experiment, and learn from others."

**Rule 4 — the licence explained without the word "licence"** `[observed]`:

> "You are encouraged to use anything you find on Scratch in your own creations, **as long as you provide credit to everyone whose work you used and make a meaningful change to it.** And when you share something on Scratch, **you are giving permission to all Scratchers to use your work in their creations, too.**"

This is a Creative Commons Attribution-ShareAlike licence, restated for a nine-year-old, in two sentences, with the reciprocal obligation in the second. `make a meaningful change to it` is the originality threshold; the FAQ gives the lenient version ("We consider even a minor change to be a valid remix, as long as credit is given"), so the guideline sets the aspiration and the FAQ sets the rule. The `too` at the end of the second sentence is doing the emotional work — it frames the obligation as fairness rather than as a term of service.

**Rule 5 — an unusual specific prohibition** `[observed]`:

> "Spreading rumors, impersonating other Scratchers or celebrities, or **pretending to be seriously ill** is not respectful to the Scratch Community."

`pretending to be seriously ill` is a named, child-specific harm that no adult platform's guidelines would think to include, and its presence is evidence that this document was written from moderation data rather than from a template. Naming the specific deception pattern your community actually produces is the same content-ops decision as Wise's named-issuer decline article.

**Rule 6 — the reporting rule** (quoted in full in T7).

**Closing** `[observed]`: `Want to learn more?` → "Download the guide for more details!" → a paragraph describing the guides ("designed to help you navigate and thrive as a Scratcher, revealing everything from setting up your profile to connecting with like-minded individuals"). Two downloadable artefacts are referenced from the help centre — **`ScratchCommunityGuidelinesPoster8x11.pdf`** and **`scratch-community-guide.pdf`**. A printable 8×11 poster of the community guidelines is a genuinely distinctive delivery format: it is how a rule reaches a child in a classroom or a bedroom rather than on a page they will not revisit.

### Privacy and data — a compliance posture built into the product

`[observed]`

**What is collected, stated plainly to a teacher** (`What data does Scratch collect about students?`):

> "When a student first signs up on Scratch, we ask for basic demographic data including **gender, age (birth month and year), country, and an email address for verification.** This data is used (in aggregated form) in research studies intended to improve our understanding of how people learn with Scratch. When an educator uses a Scratch Teacher Account to create student accounts in bulk, **students are not required to provide an email address for account setup.**"

Four fields, the purpose named (aggregated research), and a **bulk-creation path that requires no child email at all** — which is the COPPA-shaped design decision, stated as a feature. `age (birth month and year)` rather than a date of birth is the minimisation choice, disclosed in a parenthetical.

**The US privacy-law answer, and its careful bounding** `[observed]`:

> "Scratch cares deeply about the privacy of students and of all individuals who use our platform. We have in place physical and electronic procedures to protect the information we collect on the Scratch website. **Although we are not in a position to offer contractual guarantees with each entity that uses our free educational product**, we are in compliance with all United States federal laws that are applicable to MIT and the Scratch Foundation…"

A non-profit giving a product away cannot sign a data-processing agreement with every school district, and it says so rather than implying otherwise. The claim is then bounded twice — **federal** laws, applicable to **MIT and the Scratch Foundation** — against a question that asked about "local and federal". The answer does not claim what it cannot deliver, and the reader is pointed at the Privacy Policy. Notably the question is titled `Is the online version of Scratch compliant with United States local and federal data privacy laws?` and the answer addresses only the federal half. That is either an honest limit shown by omission or an unanswered question; recorded as observed either way.

**The zero-data escape hatch, offered in the same answer** `[observed]`:

> "If you would like to build projects with Scratch without submitting any Personal Information to us, you can download the Scratch app. Projects created in the Scratch app are **not accessible by the Scratch Team**, and using the Scratch app does not disclose any personally identifying information to Scratch unless you upload these projects to the Scratch online community."

A privacy remedy that is a *different build of the product*, offered inside the compliance answer. It reappears three more times in this harvest — in `Can I turn off the online community for my students?`, in `How do I limit the interactions my child has with other Scratchers?`, and in the FAQ's offline section. **The offline app is Scratch's answer to every "can you restrict this?" question, and it is the same answer each time**, which is at least consistent.

**And the honest refusal that goes with it** `[observed]`, from the parent-facing article:

> "At this time, **we do not provide parental settings** that would allow you to disable your child's ability to share or comment on Scratch. However, there are a few options you may consider…"

Then three workarounds, ranked: create an account and **don't** confirm the email (which blocks sharing and commenting); turn off commenting on the child's profile and project pages (which limits inbound contact "outside of 'loving' and 'favoriting'" but does not stop the child commenting elsewhere); or use the offline app.

**This is the most valuable piece of parent-facing writing on the platform, because it says no first.** The feature does not exist; the article leads with that, does not apologise, and then gives three real mechanisms with their exact limits stated ("Though, it will not stop your child from sharing projects or commenting on Scratch"). The first workaround — deliberately leaving an email unconfirmed as a permissions mechanism — is a hack, and disclosing it is a considerable act of good faith. A product page would have buried all of this behind "we take safety seriously".

The same article states the moderation model to the parent in four clauses: "We use an automated filter system and also review all user reports of inappropriate content. Our team of moderators locate and remove any content which violates our `Community Guidelines`. We monitor usage and block any accounts and networks posting inappropriate content." Filter + report review + moderator removal + account/network blocking — four controls, one sentence each.

### Licensing, and the consequence of sharing

`[observed]` Scratch's licensing content is unusually thorough for a children's product, because sharing a project has irreversible consequences and the platform says so.

- "All projects shared on the Scratch website are covered by the `"Creative Commons Share Alike"` license, which means that you can remix any project you see on the Scratch website -- and everyone else can remix any of the projects that you share on the website."
- `What if I don't want others to remix my projects?` → "Remixing is an important part of the Scratch community. If you don't want others to view or remix your creations, you can still create projects on the Scratch website, **but don't share them on the website.**" A blunt, correct answer: the only privacy control is non-publication.
- `Can I sell my Scratch projects?` → "Yes: Your Scratch project is your creation. **But keep in mind** that once you share your project on the Scratch website, everyone is free to download, remix, and reuse the project… So if you intend to sell your project, you may want to un-share it." Permission granted, then the irreversible consequence explained, then the practical mitigation.
- Trademarks are carved out by name, and the names are characters a child knows: "the Scratch Logo, **Scratch Cat, Gobo, Pico, Nano, Giga, and Tera** are Scratch trademarks, and can not be used without explicit permission from the Scratch Team."
- Third-party media: "If you choose to integrate someone else's work into your own, be sure to give them credit on the project `"credits"` section, and include a link back to the original." Then a route to legally reusable material (Creative Commons search).
- `Is Scratch free? Can I use it wherever I want?` → "Yes! Scratch is available free of charge. You can use it in your school, and you can teach a course about it (**even a course that costs money**). You don't need to buy a license: it's free!" The parenthetical pre-empts the exact question a workshop operator would otherwise email about.
- `How much does Scratch cost? Do I need a license?` → "**Scratch is and always will be free.**" followed immediately by the funding model ("paid for by grants and donations") and the donation ask. A permanence commitment with its dependency attached in the next clause.
- Attribution boilerplate is supplied for reuse, twice, in full — so anyone writing about Scratch has the sentence to paste.

### Safety rules for the child, as a numbered list

`[observed]` `How can I stay safe on Scratch?` gives three numbered rules. Rule 1 defines the concept before listing it:

> "Do not share personally identifiable information on Scratch. Personally identifiable information is information that could enable someone else to figure out **who you are in real life.**"

**`who you are in real life` is the definition of PII rewritten for a child**, and it is better than any legal formulation for this reader because it names the risk rather than the data class. The list that follows is twelve concrete items:

city/town or address · school's name · IP address · real first name · real last name · school's location · **school's initials, mascot, or other fairly unique traits** · birthday · student ID number · **teacher's, guardian's, or friend's real name** · phone number · email address

Two of those twelve are the reason this list is good. **`Your school's initials, mascot, or other fairly unique traits`** anticipates the child who knows not to name their school and mentions the mascot instead — it closes the obvious workaround, in the child's own frame of reference. And **`Your teacher's, guardian's, or friend's real name`** extends the rule to *other people's* identifying information, which a child would not infer.

Rule 2 covers password sharing with an in-product threat model: "If a Scratch Project asks for your password, do not enter it (and use the `"Report"` button to let the Scratch Team know that they should remove the project)." A child-authored phishing project is a real attack on this platform, and the instruction pairs the defensive action with the community action.

Rule 3 is the domain-naming phishing rule (quoted in T9).

**Cloud variables — a chat prohibition with the mechanism disclosed** `[observed]`:

> `Can I make chat rooms with cloud variables?` → "While it is **technically possible** to create chat rooms with cloud variables, they are **not allowed** on the Scratch website."

Conceding the technical possibility before stating the prohibition is the right move for a reader who will otherwise assume the rule is a limitation to be worked around. Reinforced by a type restriction ("Only numbers can be stored in cloud variables") and a reporting route with a specific instruction: "Make sure that you mention `"cloud variables"` when you type your reason in the report." Telling a child what word to include so the report routes correctly is a tiny, excellent piece of triage design. There is also a separate help article, `Cloud Chat Projects`, and a `Filter` folder covering blocked and muted comments.

**Other compliance surface** `[observed]`: `EU Digital Services Act Trusted Flaggers` and `EU Digital Services Act (DSA) Single Point of Contact`; `How can law enforcement, and others legally authorized to seek information, contact Scratch?`; `I don't think my content should have been removed, how do I dispute it?` (an appeal route, in the child's voice); `What information am I allowed to share on Scratch?` (the permissive framing of rule 2); `What do you do with the gender, date of birth, and location information you collect?`; a **`Face Sensing` folder with 17 articles** for a camera-based feature, led by `Is Face Sensing safe and private?` — a new AI/camera capability on a children's platform shipped with a safety-first FAQ; `Is Scratch free? Can I use it wherever I want?`; the `Legal Documents` folder (9) holding `Scratch Terms of Service`, `Scratch Privacy Policy`, `Scratch Cookies Policy`; and a `Scratch Shop` returns/refunds/cancellation/shipping set for the merchandise arm.

**Teacher-facing controls** `[observed]`: `What is a Scratch Teacher Account?` — "additional features to manage student participation on Scratch, including the ability to create student accounts, organize student projects into studios, and **monitor student comments**." Monitoring disclosed as a named capability. Verification is disclosed too: "We ask for additional information during the registration process **in order to verify your role as an educator**." And `Can I prevent my students from commenting/disable commenting on students' accounts?` exists as a teacher article where the equivalent parent article had to say no — so the class-managed context gets a control the home context does not.

**And the honest answer to the question a school actually asks** `[observed]`, `Can I turn off the online community for my students?`:

> "The Scratch online community provides a way for young people to share, collaborate, and learn with their peers within a moderated community governed by the Scratch Community Guidelines. **However, we understand that some educators prefer that their students not participate in an online community.** These educators may wish to install the Scratch app…"

Defend the community, concede the objection without arguing with it, provide the alternative. Three sentences.

## T11 Help-centre architecture

**Two help systems, and that is itself a finding.** `[observed]`

1. **`scratch.mit.edu/info/faq`** — a single long server-rendered page, nine sections, roughly 60 Q&As, written in Scratch's own voice. Sections: `General Questions` · `Scratch 3.0` · `Remixing and Copying` · `Accounts` · `Licensing and Permissions` · `Inappropriate Content` · `Scratch Extensions` · `Cloud Variables` · `Scratch in Schools`.
2. **`mitscratch.freshdesk.com`** — a vendor help centre, 8 categories → ~40 folders → ~160 articles, with search, feedback widgets, 41 languages and a `Submit a ticket` route.

The two **overlap substantially and diverge in places**. `Can I have more than one account?`, `Is it okay for more than one person to share an account?`, `What happens when an account is blocked?`, `What do I do if I see someone being mean or disrespectful?`, `Can I use images / sounds / media from the internet in my projects?`, `Can I use screenshots of Scratch in a book or presentation?` and `What are the system requirements for Scratch?` all exist in both, sometimes with different phrasing. **Two canonical answers to one question is a content-ops defect**, and on a policy question it is a real risk. The FAQ page appears to be the older artefact and the richer read; the Freshdesk centre is the maintained one (articles carry `Modified on <date>`, mostly 2024).

**The `/info/faq` single-page format is the right choice for this audience** and worth defending: a child cannot reliably guess a search term, and a long page with nine plain section headings can be scanned, `Ctrl+F`'d by an older child, or scrolled by a younger one. It also survives a blocked or JS-limited browser, which the React app does not.

**Article-title grammar — six shapes, and the mix is deliberate:**

| Shape | Example |
|---|---|
| `How do I …?` | `How do I delete my account?`, `How do I report a project, comment, studio, or profile?` |
| `Why can't I …?` / `Why did …?` | `Why can't I save my project?`, `Why did I get signed out?` |
| `Can I …?` | `Can I have more than one account?`, `Can I make a cloud chat room project?` |
| **`I <situation>.`** (statement) | `I need help making a project.`, `I have a suggestion for Scratch.`, `I want my deleted account back. Can you restore it?` |
| **`My <thing> <problem>!`** | `My account is banned. What should I do?`, `My friend's account was hacked!`, `My project code isn't working, what do I do?` |
| `What is / What are …?` | `What is Scratch, and what can I do with it?`, `What are cloud variables?` |

**The `My <thing> <problem>!` shape is the child-specific one.** `My friend's account was hacked!` keeps the exclamation. `My project code isn't working, what do I do?` is a comma-spliced run-on — grammatically wrong, and exactly how a child types. Scratch is willing to ship titles in the child's actual syntax rather than in edited English, and that is a findability decision, not sloppiness. (It does mean the title set is stylistically inconsistent; `How come math with decimals…` sits beside `What are the system requirements for Scratch?`.)

**Folder names inside `Editor and Projects`** `[observed]`: `Sounds & Music` · `Saving, Loading and Restoring Projects` · `Project Sharing & Remixing` · `Extensions & Modifications` · `Cloud Data` · `Sprites & Stage` · `Blocks & Code Creation` · `Face Sensing`. These are the **editor's own object names** used as taxonomy, so a child who knows the tool knows the help centre. `Sprites & Stage` and `Blocks & Code Creation` are only meaningful to someone who has used Scratch — which is the right assumption for a help centre and the wrong one for a landing page.

**Routing furniture** `[observed]`: `Skip to main content` first in DOM; `Home` / `Knowledge base` / `Submit a ticket` as the three nav items; search with `All` / `Articles` scopes and a four-way result split (`Popular Articles` / `Articles` / `Topics` / `Tickets`); breadcrumbs with a `[...]` collapse for deep paths; `Articles in this folder -` and `You may like to read -` blocks at the foot of every article; a `Print` control; and a cookie manager. Forty-one languages on every article, rendered as a full inline list — which is an accessibility burden on the page but a genuine reach commitment.

## T12 FAQs

**`/info/faq` — nine sections, ~60 questions.** Verbatim selection, chosen to show the range of readers the single page serves:

**`General Questions`**

| # | Question (verbatim) |
|---|---|
| 1 | What is Scratch, and what can I do with it? |
| 2 | How do I make a game or animation with Scratch? |
| 3 | Who uses Scratch? |
| 4 | What are the system requirements for Scratch? |
| 5 | Do you have a downloadable version so I can create and view projects offline? |
| 6 | Can I still upload projects created with older versions of Scratch to the website? |
| 7 | How much does Scratch cost? Do I need a license? |
| 8 | Who created Scratch? |

**`Remixing and Copying`**: `What is a remix?` · `Why does the Scratch Team require that all projects be "remixable"?` · `What if I don't want others to remix my projects?` · `Can I use images / sounds / media from the internet in my projects?`

**`Accounts`**: `Why is it useful to have a Scratch account?` · `How can I create an account?` · `How do I confirm my account?` · `Do I have to confirm my account?` · `I forgot my username or password. How can I reset it?` · `How do I transition from 'New Scratcher' to 'Scratcher'?` · `Can I have more than one account?` · `Is it OK to have more than one person logged into an account?` · `Can I change my username?` · `What information can I share on / with my account?` · `How do I delete my account?`

**`Inappropriate Content`**: `How do I know what is or isn't okay to share on the Scratch website?` · `What do I do if I see something that's inappropriate?` · `What do I do if I see someone being mean or disrespectful?` · `What does the Scratch team do when something is reported or flagged?` · `What happens when an account is blocked?` · `Someone got access to my account and got my account blocked. What do I do?`

**`Cloud Variables`**: `What are cloud variables?` · `Who can see the data stored in cloud variables?` · `What types of data can be stored in cloud variables?` · `If I see someone post inappropriate content using cloud variables, how do I report it?` · `Can I make chat rooms with cloud variables?` · `How can I make a cloud variable?` · `Who can change the information in a cloud variable?` · `I am logged in, but I cannot use projects with cloud variables. What is going on?`

**`Scratch in Schools`**: `How is Scratch used in schools?` · `Is there a way for students to use Scratch without an internet connection?` · `Can I turn off the online community for my students?` · `What is a Scratch Teacher Account?` · `How do I request a Scratch Teacher Account?` · `What data does Scratch collect about students?` · `Is the online version of Scratch compliant with United States local and federal data privacy laws?`

**Structural notes.**

**The nine sections serve at least four different readers and the page does not warn you when it switches.** `General Questions` and `Accounts` are written to a child; `Licensing and Permissions` is written to a teacher, author or conference speaker; `Scratch in Schools` is written to a school administrator; `Scratch Extensions` is written to a developer. `Inappropriate Content` and `Cloud Variables` are written to a child and then, mid-section, to an adult. A single FAQ page whose register shifts from "Don't add to the flames!" to "we are not in a position to offer contractual guarantees with each entity that uses our free educational product" without a section break or an audience label is **the main content defect in this file** (see T14).

**The `Inappropriate Content` section is a complete moderation-transparency sequence in six questions**, ordered as the child experiences it: how do I know the rules → what do I do about content → what do I do about a person → what will you do → what happens to them → what if it happens to me. Read as a whole it is a public moderation policy written as a child's journey, and the ordering is the achievement.

**`Cloud Variables` is the technical-and-safety hybrid** — eight questions in which `Who can see the data…?`, `What types of data…?`, `how do I report it?` and `Can I make chat rooms…?` (four of eight, all safety) are interleaved with `How can I make a cloud variable?` (mechanics). Safety and how-to in one section, so a child learning the feature meets its constraints in the same read.

**Question 3, `Who uses Scratch?`, carries the age statement** — see T14.

**Not found:** an FAQ block on the (blocked) homepage; a parent-specific FAQ page. Parent content is distributed between `scratchfoundation.org/learn/for-families` and the Freshdesk `Safety` folder. `[absent]`

## T13 Terminology & glossary

| Term | Scratch's usage | The alternative it rejected |
|---|---|---|
| `Scratcher` | **A member of the community, and also an earned status.** Used by children about themselves; used by the Foundation in attributions ("Scratcher `Queen_Bee_12`") | "user", "member", "student" |
| `New Scratcher` | The entry status | "unverified", "basic" |
| `Scratch Team` | The humans who moderate and build, named as an actor throughout | "moderators", "support", "we" |
| `project` | The unit of creation — never "program", "app" or "game" | "program" |
| `remix` / `remix culture` | A derived project, and the norm around it | "fork", "copy", "derivative" |
| `sprite` | An on-screen character or object | "object", "actor" |
| `costume` | A sprite's appearance | "skin", "image" |
| `backdrop` | The stage background | "background" |
| `Stage` | The performance area | "canvas", "viewport" |
| `block` | A code statement, physically | "command", "statement" |
| `My Blocks` | Custom blocks | "functions", "procedures" |
| `Extensions` | Optional block collections | "plugins", "libraries" |
| `studio` | A curated collection of projects | "album", "playlist", "folder" |
| `curator` | A studio contributor | "collaborator" |
| `loving` / `favoriting` | The two appreciation actions, glossed in quotes as jargon | "liking", "bookmarking" |
| `share` / `unshare` | Publication state — **and the entire privacy model** | "publish", "make public" |
| `cloud variable` | Server-stored data, with the storage in the label | "server variable", "global state" |
| `Report` | The reporting control (also rendered `Report this`) | "Flag", "Abuse" |
| `blocked` / `banned` | Account sanction — **two words for one state** | |
| `muted` | Comment-filter state | |
| `filter` | The automated moderation system, named plainly to children | "automated moderation" |
| `Scratch app` | The offline build — the answer to most privacy and restriction questions | "Offline Editor" (the **former** name, disclosed in the FAQ) |
| `ScratchJr` | The 5–7 product, "a simplified version of Scratch" | |
| `Scratch Cat`, `Gobo`, `Pico`, `Nano`, `Giga`, `Tera` | Named characters, protected as trademarks | |
| `Scratching the Surface` | A quick-tips tutorial series (pun) | |
| `Imagine, create, share!` | The product tagline | |
| `Lifelong Kindergarten` | The MIT research group, named in public copy | |
| `Face Sensing` | The camera-based feature | "face tracking", "computer vision" |

**`Scratcher` is the most successful coined term in this batch.** It is an identity noun that children apply to themselves, it doubles as a **status** in a progression system, and the Foundation uses it in third-person attributions on its marketing site ("Scratcher `leahcimto`", "*Featuring projects from Scratchers Hobson-TV, taffygirl13, Aquasplash…*"). One word functioning as community identity, product status and credit line. Compare FutureLearn's `FutureLearner`, which appears only inside the code of conduct.

**The editor's vocabulary is drawn from theatre and dress-up, not from computing**: `sprite`, `costume`, `backdrop`, `Stage`. A child renaming a character's appearance is changing its *costume*. That metaphor set is the reason the interface is learnable without prior knowledge, and it is a terminology decision with a pedagogical purpose. Against it, the `Advanced Topics` tutorials reintroduce the real computer-science terms — `Conditional Statements`, `Variables and Lists`, `Custom Blocks`, `Turtle Graphics` — so the vocabulary **escalates deliberately from metaphor to discipline** as the child progresses. That gradient is the single best terminology decision on the platform.

**`share` / `unshare` carries the entire privacy model** and the copy leans on it hard: the answer to "how do I stop people remixing my work" is "don't share them on the website"; the answer to "can I sell my project" is "you may want to un-share it". A one-word state doing the work of a permissions system, explained by consequence rather than by setting.

**Inconsistency:** `blocked` and `banned` are used for the same account state in adjacent articles (`What happens when an account is blocked?` / `My account is banned. What should I do?` / `How can I help my friend get unbanned?`). For a child trying to find out what happened to them, that is two search terms where there should be one.

## T14 Voice, tone & accessibility

### Reading level — estimate and evidence

**The stated audience** `[observed]`: "Scratch is designed especially for **young people ages 8 to 16**, but people of all ages create and share with Scratch. Younger children may want to try `ScratchJr`, a simplified version of Scratch designed for **ages 5 to 7**."

An 8-to-16 band is a reading-age span of roughly US grade 3 to grade 11 — a four-to-five-year gap in decoding ability at the bottom end. No single register can serve it, and the evidence is that Scratch runs (at least) two.

**Estimate: the Community Guidelines sit at approximately US grade 5–6 (UK Year 6–7; reading age ~10–12).** This is an estimate from sentence-length and syllable-density inspection, not a tool-computed score, and it should be treated as indicative.

The evidence:

- **Sentence length.** Measured across the guidelines' body sentences, the mean is roughly **11–13 words**, with a tight distribution. Headings are 2–8 words (`Be honest.` = 2; `Give helpful feedback.` = 3; `Treat everyone with respect.` = 4). The longest sentence in the document is 21 words ("It's never OK to attack a person or group's identity or to be unkind to someone about their background or interests."), and it is the only one over 20.
- **Syllable density.** The overwhelming majority of content words are one or two syllables: *kind, safe, share, learn, honest, friendly, mean, rumors, fights, credit, change, hands*. Polysyllabic vocabulary is confined to a small set, and almost all of it is either **identity vocabulary that cannot be simplified** (*ethnicities, orientations, identities, religions, abilities*) or **immediately defined in the next clause** (*remixing* → "is when you build upon someone else's projects…"; *personally identifiable information* → "information that could enable someone else to figure out who you are in real life").
- **One clause per idea.** Almost no sentence carries a subordinate clause plus a coordinate clause. Where two ideas must join, they join with `and` or a dash, not with *although*, *whereas* or *provided that*.
- **Contractions throughout** (`don't`, `It's`, `you're`, `we'll`, `isn't`) — the spoken register, which lowers decoding cost.
- **No conditionals of the legal kind.** There is no "if… then… unless…" construction anywhere in the guidelines. The closest is "as long as you provide credit… and make a meaningful change to it", which is a single condition in plain words.

**By contrast, `/info/faq` runs materially harder — an estimated US grade 8–10 in several sections**, and the same page contains both. Evidence:

- Long, multi-clause sentences: "Python's design philosophy…" (n/a) — in Scratch's case: "**The structure of the Scratch website depends on having a consistent account name, so it's not possible to change your username.**" (21 words, nominalisation, abstract subject); "**Although we are not in a position to offer contractual guarantees with each entity that uses our free educational product, we are in compliance with all United States federal laws that are applicable to MIT and the Scratch Foundation, the organizations that have created and maintained Scratch.**" (**46 words**, one sentence, two subordinate clauses, three nominalisations).
- Abstract vocabulary with no gloss: *backwards compatibility, transpiling, aggregated form, contractual guarantees, prototypal*, *specifications and guidelines*, *experimental testbed*, *synchronization issues*.
- Register collisions within one page: `Don't add to the flames!` (grade ~4) and the 46-word compliance sentence above (grade ~16) are on the same URL, with no section boundary warning the reader.

**Verdict, stated honestly: Scratch has one excellent child register and one ordinary adult register, and it does not always label which is which.** The Community Guidelines, the safety articles and the tutorial titles are written for a ten-year-old with real craft. The FAQ's `Licensing and Permissions`, `Scratch Extensions` and `Scratch in Schools` sections are written for adults and are not marked as such. A nine-year-old who lands on `/info/faq` from a link and scrolls will hit unreadable prose within two sections. The fix is trivial (audience labels on sections, as the Foundation site already does with `For Kids` / `For Families` / `For Educators`) and its absence is the clearest actionable defect in this file.

### The specific techniques used to reach a child reader

Enumerated, with the evidence:

1. **Imperative sentence as heading, punctuated with a full stop.** `Treat everyone with respect.` · `Be honest.` · `Give helpful feedback.` · `Help keep the site friendly.` A heading that is a complete, terminated command reads as an instruction rather than as a topic label — and it is the whole rule, so a child who reads only the headings has the policy.
2. **Direct second-person address, with no intermediary.** "you find ways to celebrate your own identity"; "don't give out any information"; "remember to say something you like about it"; "Don't add to the flames!" The child is the reader. Contrast Outschool (file 139), which addresses the parent and refers to the child in the third person throughout.
3. **Concrete verbs and physical metaphors.** `drag and snap`, `build upon`, `bring… to life`, `make their doodles dance and sing`, `add to the flames`, `Make it Spin`, `Make It Fly`, `Bring Your Drawings Into Scratch`. Abstractions are avoided in favour of things a body does.
4. **The child's own vocabulary for the child's own experience.** `mean`, `unkind`, `fights`, `spreading rumors`, `did bad things`, `tricky syntax`, `something amazing`, `How come`. `never OK` instead of "prohibited". `mean or disrespectful` instead of "in breach of conduct standards".
5. **Reason before rule, and the reason is short.** Rule 3's entire justification is **"Everyone on Scratch is learning."** Rule 1's is "Scratchers have diverse backgrounds, interests, identities, and experiences." Four to eight words, placed above the instruction, so the rule arrives already motivated.
6. **Permission before prohibition.** Every rule that restricts also grants: celebrate your identity → don't attack others'; use anything you find → credit it and change it; you may share your first name, hobbies, pets *(Outschool's version)* / here is what you may do without an account → here is what needs one. A child told only what is forbidden becomes silent.
7. **Name the impulse, then the alternative.** `Don't add to the flames!` → "Instead, simply report…". `please don't tell us that someone else did it` → and the reason it costs you. The tempting wrong action is named so the child recognises themselves in it.
8. **Self-interested reasons alongside moral ones.** "could result in your account being blocked"; "your account will just stay blocked for a lot longer than if you are honest". Scratch does not rely solely on virtue.
9. **Close the workaround in the child's own terms.** "Your school's initials, mascot, or other fairly unique traits"; "(Note that we don't promote New Scratchers to Scratcher on request )"; "While it is technically possible to create chat rooms with cloud variables, they are not allowed". The loophole a child will find is pre-closed, using the child's framing of it.
10. **Gloss jargon inline, in quotes, on first use.** `"loving"`, `"favoriting"`, `"asynchronous"` *(Outschool)*, `"remix"`, `"New Scratcher"`, `"Scratcher"`, `"Creative Commons Share Alike"`. Quotation marks signal "this is a word we use", which is a low-cost way to tell a child that unfamiliarity is expected.
11. **Give a latency and a next step.** "it may take up to an hour for the email to arrive. If you still don't see the email after an hour, let us know." Children have no patience model; supply one.
12. **State a checkable service level.** "We check reports every day, multiple times per day". A promise a child can hold you to.
13. **Deliver the rules in a child-native format.** A printable `ScratchCommunityGuidelinesPoster8x11.pdf`, a `scratch-community-guide.pdf`, video tutorials with times, and written guides for when video is blocked. The rule is not only a web page.
14. **Illustration paired with rich alt text** — see below.

### Tone

Warm, plain, unfailingly non-condescending. Scratch never says "kids", "little", "easy-peasy" or anything that talks down; the copy assumes a competent reader with limited vocabulary, which is the correct model of a nine-year-old. Exclamation marks are used freely and, unusually, they survive into policy and moderation copy (`Don't add to the flames!`, `be patient!`, `Scratch is and always will be free!`, `it's totally free!`) — the only product in this batch that exclaims in its trust-and-safety content, and here it reads as encouragement rather than as false brightness. The tone does **not** flatten as stakes rise, which breaks the pattern recorded for Wise, FutureLearn and Skillshare — and on this evidence that is correct, because the highest-stakes copy (blocking, reporting, honesty) is the copy a child most needs to be able to read.

First person plural for the team, and the team is a named actor with a human character: "The Scratch Team will look at your report", "we'll sort things out", "we hope that you find ways to celebrate your own identity", "let us know", "we'll follow up with the author".

**Numbers as trust devices** `[observed]`: `ages 8 to 16`, `ages 5 to 7`, `200 million kids`, `over a billion Scratch projects`, `40+ languages` (editor) / `41 languages` (help centre), `2007`, `January 2, 2019`, `every day, multiple times per day`, `up to an hour`, `a couple minutes`, `at least 5` *(Skillshare)*, `Chrome (63+)`, `Safari (11+)`.

### Accessibility content

**Strongest single finding: the alt text on the Community Guidelines illustrations.** `[observed]` Each of the six rules carries an illustration, and each illustration carries a **long, scene-level, colour-and-composition-inclusive description**:

> "A graphic of two hands grasping each other in a handshake, with a pink heart above them."
> "A graphic of a blue combination lock lock on a yellow background. Inside the lock is the shape of a head with a question mark printed on the face."
> "A graphic of a piece of paper on top of a pink background. On the paper, there is a Scratch project with a white cat on a blue background. A pink pen with a heart on the cap is drawing a heart and a pencil is writing a comment."
> "A graphic of the Scratch "remix" swirl on a green background. Two hands move orange, blue, and purple Scratch blocks around. A paintbrush paints a green streak."
> "A graphic of a light blue compass on a purple background. There is a pink heart in the "North" position."
> "A graphic of 5 hands with different skin tones using their pointer and middle fingers to create a star on a pink background with a pink star and yellow star in the center."

These are the best alt strings in the corpus so far. They describe **composition, colour and metaphor**, not just subject — "a pink heart in the 'North' position" conveys the *meaning* of the compass illustration (honesty as a moral direction), which a subject-only alt ("compass") would lose. The sixth explicitly notes **"5 hands with different skin tones"**, so a blind child learns that the illustration depicts a diverse community — the inclusion signal is carried in the alt text, not only in the pixels. The second contains a typo (**"combination lock lock"**), which is the only flaw across six strings.

**Other accessibility positives** `[observed]`

- **`Scratching the Surface: Adjust Block Language and Contrast`** — a one-minute tutorial teaching a child to change the editor's **contrast** and block language. An accessibility setting taught as a tip, to the person who needs it, in sixty seconds. That is a better delivery mechanism than a settings page or a statement.
- **`Computer doesn't allow Youtube? Download written guides for these topics.`** — a text alternative to video content, offered for an environmental constraint, not only for a sensory one.
- The whole no-account creation path, and the offline `Scratch app`, function as accessibility routes for children on restricted, filtered or low-connectivity machines.
- The language selector is identified by its shape (`the "globe" icon`) in prose, because a child may not read the word.
- Volunteer translation is a first-class programme with four help articles (`Can I help to translate Scratch?`, `Can I help review Scratch translations?`, `Can I help translate the Scratch Coding Cards?`, `How do I change the language in Scratch?`) — the editor is in 40+ languages and the help centre in 41.
- `Skip to main content` present on help-centre pages.
- State is conveyed in text as well as colour (`"Your email address is unconfirmed"` plus orange; a green checkmark plus the concept "confirmed").
- The FAQ documents **why the blocks are bigger in Scratch 3.0**, and one of the two reasons is a motor-accessibility reason: "blocks are slightly bigger in Scratch 3.0 to help address issues we observed with new users having trouble clicking and dragging small interface elements." Touch-target sizing explained publicly, from observed user difficulty.
- `Is Face Sensing safe and private?` leads a 17-article folder — a camera feature on a children's platform introduced safety-first.
- Physical-computing extensions (`micro:bit`, `MakeyMakey`) are promoted with a purpose line — "Turn anything into a key that connects with your Scratch project!" — and MakeyMakey in particular is widely used as an adaptive input device.

**Accessibility gaps and defects** `[observed]`

- **`scratch.mit.edu/accessibility` returned an empty body.** A route exists; its content was not retrievable. **No accessibility statement was readable in this harvest.** Given that Scratch is an MIT-originated non-profit serving children with disabilities at scale, and that the brief expected one, this is recorded as a significant unresolved gap rather than as an absence.
- **The help centre's `Accessibility` folder contains five articles and every one of them is about translation and localisation**: `Can I help to translate Scratch?` · `Can I help review Scratch translations?` · `Why aren't the tutorial images available in my language in the offline editor?` · `Can I help translate the Scratch Coding Cards?` · `How do I change the language in Scratch?`. **There is no article in the Accessibility folder about screen readers, keyboard navigation, contrast, motor accessibility, captions, or assistive technology.** Language access has been filed as the whole of accessibility. The one genuine accessibility artefact found in this harvest — the contrast tutorial — lives in `Tips & Tricks` on the Ideas page, not here. This is a real and specific IA defect on a platform whose child-facing craft is otherwise exemplary, and it is the finding I would take to a content team first.
- The unhelpful-feedback branch requires an email address and a CAPTCHA from a child, on a platform that tells children not to share email addresses.
- Freshdesk's 41-language inline list renders as ~1,500 characters of link text between the page header and the content on every article.
- Two labels for reporting (`Report` / `Report this`), two for the sanction (`blocked` / `banned`), two for the offline build (`Scratch app` / the disclosed former name `Offline Editor`), two CTAs for opening a project (`Explore` / `View Project`).
- Two overlapping help systems with duplicate answers to the same questions.

**Negative findings, recorded honestly**

- **The `Accessibility` help folder contains only translation articles.**
- `scratch.mit.edu/accessibility`, `/about`, `/parents`, `/educators`, `/terms_of_use`, `/privacy_policy` and `/info/help` all return empty bodies — **seven of the platform's own information pages are unreadable without JavaScript**, on a product whose users are disproportionately on school machines and old hardware, and which elsewhere goes to real trouble to support exactly those users.
- `/info/faq` mixes a child register and an adult register on one page with no audience labelling. The 46-word compliance sentence and `Don't add to the flames!` share a URL.
- `"…on request )"` — stray space, no terminal full stop.
- `"…if the person has been sent warnings before"` — no terminal full stop.
- `"A graphic of a blue combination lock lock on a yellow background"` — duplicated word in alt text.
- `Make it Spin` / `Make It Fly` — inconsistent capitalisation within one sentence.
- "Question about comment filtering…" — singular/plural error in a help-category scope line.
- Every help-category scope line ends in an exclamation mark, including `Privacy, Trust, and Safety`.
- `Sorry! nothing found for` — inherited vendor no-results defect (identical to Udemy's, file 137).
- `blocked` vs `banned`; `Report` vs `Report this`; `Explore` vs `View Project`.
- `40+ languages` (FAQ) vs 41 offered in the help centre — trivially inconsistent.
- `Is the online version of Scratch compliant with United States local and federal data privacy laws?` is answered for federal law only.
- The donation block is duplicated five times in the homepage DOM.
- The `Scratch Membership` category has no scope line; `Background Checks…` *(Outschool)* likewise. Here, the paused-programme articles are the only content, and the category name still implies an active product.

---

## Transferable patterns

1. **An imperative sentence, full-stopped, as the heading — and the heading is the whole rule.** `Be honest.` · `Treat everyone with respect.` A reader who scans only the headings has the complete policy. Works for any audience; essential for a low-reading-age one.
2. **Reason before rule, in under eight words.** "Everyone on Scratch is learning." → "say something you like about it, offer suggestions, and be kind, not critical." The reason is what makes the rule survive contact with the moment.
3. **Name the impulse, then the alternative.** `Don't add to the flames!` → "Instead, simply report…". Address the action the reader is about to take, not the action you wish they would take.
4. **Pair the moral reason with the self-interested one.** "could result in your account being blocked"; "your account will just stay blocked for a lot longer than if you are honest with us". Do not rely on virtue alone, and put the moral reason first.
5. **Close the workaround in the reader's own framing.** "Your school's initials, mascot, or other fairly unique traits." "(Note that we don't promote New Scratchers to Scratcher on request )" "While it is technically possible… they are not allowed." Anticipating the loophole is the difference between a rule and a rule that works.
6. **Define the risk, not the data class.** "Personally identifiable information is information that could enable someone else to figure out who you are in real life." Reusable verbatim for any privacy notice aimed at a non-expert.
7. **Put the storage location inside the field label.** `Cloud variable (stored on server)`. Then constrain the data type so the worst case cannot occur. Privacy by type restriction plus in-label disclosure.
8. **Give a sanction a stated, achievable exit.** "If the owner can show that they understand why their account was blocked, and promises to follow the Scratch Community Guidelines in the future, they will be unblocked." A consequence with a published route back is a lesson; one without is a punishment.
9. **State the latency, then the next step after it elapses.** "it may take up to an hour… If you still don't see the email after an hour, let us know." Supply a patience model to readers who have none.
10. **Publish a checkable moderation service level.** "We check reports every day, multiple times per day." Then earn the reassurance that follows it.
11. **Restate the licence as reciprocity, not as terms.** "when you share something on Scratch, you are giving permission to all Scratchers to use your work in their creations, **too**." The final "too" converts an obligation into fairness.
12. **Lead with the refusal.** "At this time, we do not provide parental settings that would allow you to disable your child's ability to share or comment." Then three workarounds with their exact limits. Saying no first buys the credibility for the alternatives.
13. **Name the two legitimate domains.** "The Scratch Team's emails may come from addresses at scratch.mit.edu or scratch.org. Any emails you may get from other email addresses are not coming from the Scratch Team." More usable than any amount of "check the sender" advice. Directly transferable to payments and account-security comms.
14. **Escalate vocabulary deliberately from metaphor to discipline.** `sprite`/`costume`/`backdrop` for beginners; `Conditional Statements`/`Variables and Lists`/`Turtle Graphics` in `Advanced Topics`. Give the learner the real word once they have the concept, not before.
15. **Name a tutorial after the thing that happens.** `Make it Spin` · `Make It Fly` · `Make a Chase Game` · `Bring Your Drawings Into Scratch`. Never after the mechanism, and use the reader's own possessions ("Your Drawings") where you can.
16. **Teach the accessibility setting as a sixty-second tip.** `Scratching the Surface: Adjust Block Language and Contrast`. Reaches the person who needs it; a statement page does not.
17. **Ship a text alternative for an environmental constraint, not only a sensory one.** "Computer doesn't allow Youtube? Download written guides for these topics."
18. **Write alt text that carries the metaphor and the inclusion signal.** "a pink heart in the 'North' position"; "5 hands with different skin tones". If the picture means something, the alt must mean it too.
19. **Deliver the rules in the reader's native format.** A printable 8×11 poster of the community guidelines. The rule that reaches a child in a classroom is not a web page.

## Caveats & gaps

- **Blocked: nine `scratch.mit.edu` routes returned empty bodies** — `/`, `/about`, `/parents`, `/educators`, `/educators/faq`, `/terms_of_use`, `/privacy_policy`, `/accessibility`, `/info/help`. The main application is client-rendered. **No in-editor copy, no signup form, no signed-out navigation, no project page, no studio, no search, no empty state and no error state was observed.** The two most valuable pages for this benchmark (`/community_guidelines`, `/info/faq`) are fortunately server-rendered and were captured in full.
- **No accessibility statement readable.** `/accessibility` is a live route with an empty body. The absence in this file is a harvest failure, not necessarily a platform failure — but the separate finding that the help centre's `Accessibility` folder contains only translation articles stands on its own evidence.
- **Reading-level figures are estimates, not tool-computed scores.** They are derived from inspection of sentence length, syllable density and clause structure on the two captured `scratch.mit.edu` pages, and the evidence is set out in T14 so the estimate can be checked or replaced.
- **The parent surface is under-harvested.** `scratch.mit.edu/parents` is blocked; parent content was recovered from `scratchfoundation.org/learn/for-families` and one Freshdesk `Safety` article. The `Safety` folder's other five articles — including `What do you do with the gender, date of birth, and location information you collect?` and `My friend's account was hacked!` — were not opened.
- **`For Kids` and `For Educators` pages on the Foundation site were not fetched**, so the child-facing marketing register (as distinct from the child-facing *policy* register, which is well evidenced) is thin here.
- **The Terms of Service, Privacy Policy and Cookies Policy were not read.** They exist as Freshdesk articles (`4000219182`, `4000219339`, `4000219342`) and the FAQ's privacy answers point at them. The COPPA and parental-consent mechanics recorded here are inferred from the FAQ's description of the data model, not from the policy text — an important limit on the `Regulatory posture` row.
- **`Face Sensing` (17 articles) not opened.** A camera-based feature on a children's platform is the highest-value unharvested vein in this file, and `Is Face Sensing safe and private?` is the article to read first.
- `Community Guidelines and Moderation` (3), `Reporting` (6), `Banned and Blocked Accounts` (2), `Filter` (2) and `EU Digital Services Act` (2) folders were read at title level only.
- The two referenced PDFs — `ScratchCommunityGuidelinesPoster8x11.pdf` and `scratch-community-guide.pdf` — were not fetched. The poster in particular is a distinctive child-facing artefact.
- `ScratchJr` (17 articles) is a separate product for ages 5–7 with, presumably, a distinct and even simpler register. Unharvested, and arguably worth its own corpus entry.
- The in-editor tutorial library was not observed; its titles are quoted from the FAQ's description of it.
- The Scratch Wiki (`en.scratch-wiki.info`) is linked from help articles but is **community-run**, not platform-authored, and was deliberately excluded.
- Per the brief and per Scratch's own guidelines, **no community feature was used and no individual child's profile, project, studio or comment was viewed or collected.** Project and Scratcher names appearing in this file are those Scratch itself publishes on its marketing pages as credits.

## Sources

1. https://scratch.mit.edu/community_guidelines
2. https://scratch.mit.edu/info/faq
3. https://scratch.mit.edu/ideas
4. https://scratch.mit.edu/ *(empty body)*
5. https://scratch.mit.edu/accessibility *(empty body)*
6. https://scratch.mit.edu/parents *(empty body)*
7. https://scratch.mit.edu/educators *(empty body)*
8. https://scratch.mit.edu/terms_of_use *(empty body)*
9. https://scratch.mit.edu/privacy_policy *(empty body)*
10. https://scratch.mit.edu/info/help *(empty body)*
11. https://www.scratchfoundation.org/
12. https://www.scratchfoundation.org/learn/for-families
13. https://www.scratchfoundation.org/learn/learning-library
14. https://mitscratch.freshdesk.com/en/support/solutions
15. https://mitscratch.freshdesk.com/en/support/solutions/articles/4000156778-how-can-i-stay-safe-on-scratch-
16. https://mitscratch.freshdesk.com/en/support/solutions/articles/4000211810-how-do-i-limit-the-interactions-my-child-has-with-other-scratchers-
17. https://mitscratch.freshdesk.com/en/support/solutions/folders/4000040849
