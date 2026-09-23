# 165. Microsoft Copilot

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Enterprise-embedded AI assistant / productivity-suite copilot (chat + agents layered onto Word, Excel, PowerPoint, Outlook, Teams) |
| Primary URL | https://copilot.microsoft.com/ |
| Corpus rank | 165 |
| Benchmark strength (source list) | Task scaffolding across modes |
| Locale / market observed | en-US (`/en-us/` support paths; `meta-awa-market: en-US`) |
| Platform observed | Web — support.microsoft.com help articles, privacy docs, copilot.com marketing/sign-in surface |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for financial regulation. Visible regimes: Microsoft Responsible AI Standard; C2PA content credentials; US CSEAI reporting to NCMEC; minimum age 13 (higher in some regions); California privacy choices; consumer health privacy notice |
| Harvest date | 2026-09-22 |
| Pages inspected | 18 |
| Harvest completeness | Partial — all in-product strings are `[documented]` via help/privacy articles, never observed. `copilot.microsoft.com` (the assigned primary URL) was not directly reachable in this pass; `copilot.com` served the public marketing shell instead. Pricing page, `/microsoft-copilot/privacy-faq-for-microsoft-copilot`, and the legacy-app privacy set were not opened. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help hub (single, merged) | https://support.microsoft.com/en-us/microsoft-365-copilot/ | `…/microsoft-copilot` **302s here**; canonical is the `/microsoft-365-copilot/` path. Four-block IA + "The art of asking" |
| Conversation modes | https://support.microsoft.com/en-us/microsoft-copilot/conversation-modes-in-microsoft-copilot | Mode inventory. `ms.date: 07/07/2025` — the stalest article in the set |
| Diagnose output | https://support.microsoft.com/en-us/microsoft-365-copilot/diagnose-copilot-output | Decisions / Risks / Context / Specificity / Freshness |
| Iterate output | https://support.microsoft.com/en-us/microsoft-365-copilot/iterate-copilot-output | Goal / Audience / Constraints / Evidence / Structure |
| Evaluate output | https://support.microsoft.com/en-us/microsoft-365-copilot/evaluate-copilot-output-for-clarity-accuracy-tone-and-coverage | Clarity / Accuracy / Tone and audience fit / Context. URL says "coverage", title says "context" |
| Validate output | https://support.microsoft.com/en-us/microsoft-365-copilot/validate-copilot-output | Source / Verified / Context / Resilient |
| Decide (delegate) | https://support.microsoft.com/en-us/microsoft-365-copilot/decide-when-copilot-or-an-agent-is-the-right-tool-for-your-work | Repeatability / Impact / Error detectability / Time sensitivity |
| Design boundaries | https://support.microsoft.com/en-us/microsoft-365-copilot/design-copilot-boundaries-and-checkpoints | Goal / Freshness / Context / Audience / Checkpoints |
| Worked example: diagnose a proposal | https://support.microsoft.com/en-us/microsoft-365-copilot/diagnose-issues-in-a-copilot-generated-draft | Scenario twin of the abstract Diagnose article |
| Prompting essentials | https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot | Four-part prompt framework |
| Get better results | https://support.microsoft.com/en-us/microsoft-365-copilot/write-a-great-prompt-in-microsoft-365-copilot | Three-step prompt guide + "Helpful hints" |
| Get started with the app | https://support.microsoft.com/en-us/microsoft-365-copilot/what-is-microsoft-copilot-app | Reached via `…/what-is-the-microsoft-365-copilot-app`, which **302s**. Carries the rename note. Left-rail = full product IA |
| Privacy overview (individuals) | https://support.microsoft.com/en-us/privacy/microsoft-copilot/overview | New-app privacy set, dated 18 Aug 2026 |
| Privacy controls | https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls | Six named toggles |
| Copilot for young people | https://support.microsoft.com/en-us/privacy/microsoft-copilot/young-people | Age limits, parental controls, "AI is a tool, not a friend" |
| Transparency Note (individuals) | https://support.microsoft.com/en-us/privacy/microsoft-copilot/transparency-note | 4,493 words. The formal limitations register |
| Supported regions and languages | https://support.microsoft.com/en-us/microsoft-copilot/supported-regions-and-languages-in-microsoft-copilot | 170+ markets; two language lists |
| Public product home | https://copilot.com/ | Hero, audience tabs, "Did you know?" accordion incl. the rename table |

---

## T1 Navigation & IA labels

### The two-namespace problem — the single biggest IA finding `[observed]`

Microsoft Copilot's help is authored in **three separate documentation depots** that surface on one domain:

| Depot (`meta-depot_name`) | URL namespace | What lives there |
|---|---|---|
| `Learn.EndUser-Microsoft-Copilot` | `/en-us/microsoft-copilot/…` | Conversation modes, supported regions, Edge/Windows/macOS entry points, the *legacy* privacy set |
| `Learn.EndUser-Microsoft-365-Copilot` | `/en-us/microsoft-365-copilot/…` | The app, Chat, Cowork, agents, Pages, Notebooks, Create, and the entire skill ladder |
| `Learn.EndUser-Privacy` | `/en-us/privacy/microsoft-copilot/…` | Overview, privacy controls, activity history, feedback, young people, Transparency Note |

As of this harvest the **two hubs have been merged into one page but the two article namespaces have not**. `https://support.microsoft.com/en-us/microsoft-copilot` redirects (302) to `https://support.microsoft.com/en-us/microsoft-365-copilot/`, which declares `canonical: https://support.microsoft.com/en-us/microsoft-365-copilot/` and renders under the H1 `Microsoft Copilot help & learning`.

The consequence is a live contradiction in the global support nav, present on every page in this harvest: the Products menu item labelled `Microsoft Copilot` links to `https://support.microsoft.com/en-us/microsoft-copilot/` — a URL that immediately bounces the user to a path named after a *different* product. A user who copies the nav URL is handed the "365" address.

The coordinator's brief described these as two hubs for one brand. The stronger finding is the reverse: **one hub now serves two article trees**, and the article trees were never reconciled. Consumer-register articles (`conversation-modes-in-microsoft-copilot`, `supported-regions-and-languages…`) and work-register articles (`validate-copilot-output`, `design-copilot-boundaries-and-checkpoints`) sit in different repos, are written by different authors (`ktsuji`/`dansimp` vs `dansimp`/`camillepack`/`danismith`), and diverge in voice, tense, and update cadence — but are now linked from the same four blocks on one landing page.

### Help hub — four blocks, each with a mood rather than a category name `[observed]`

| Block heading | Scope line (verbatim) |
|---|---|
| `Meet Copilot` | "Chat through a problem, organize your work, create something new, or hand off a task entirely." |
| `The art of asking` | "Small changes to how you ask make a big difference in what you get back." |
| `Your data and privacy` | "Learn about privacy and feedback in Copilot." |
| `Keep learning` | "Guided paths, courses, and libraries to take you from curious to fluent." |
| `Where you'll find Copilot` | "Copilot works where you already work. Pick an app to see what it can do there." |

Three sub-cards under `Meet Copilot`: `Get started` · `Chat` · `Agents`. The Agents scope line is the sharpest sentence on the page — "Hand off repetitive work so you can focus on what matters." It names delegation without naming autonomy.

Two things are notable. First, **no block is named after a system object**. There is no "Features", no "Settings", no "Troubleshooting". Compare Wise's help IA, which names the user's *activity* (`Sending money`); Microsoft names the user's *posture* (`The art of asking`, `Keep learning`). Second, **there is no unhappy-path block at all** — no "Fix a problem", no "Troubleshooting", no "Contact us". The hub assumes the user's problem is skill, not failure. That is a defensible choice for a probabilistic product where most dissatisfaction is prompt quality rather than a broken feature, but it leaves genuine defects with no route.

### Product IA — the left rail on the app article `[observed]`

The richest single artefact in this harvest. Sixteen top-level groups, each a noun or a bare verb:

`Get started` · `Search` · `Use Chat` · `About Chat` · `Cowork` · `Use agents` · `Create agents` · `Pages` · `Notebooks` · `Create` · `Apps` · `Microsoft Copilot mobile app` · `Try Frontier`

Note the register split *within one rail*: `Use Chat` / `About Chat` is a how/what pair for the same object, and `Use agents` / `Create agents` is a consume/produce pair. The product distinguishes **using** a capability from **understanding** it, and gives each its own group. That is unusual and good — most products bury the "about" content inside the "how".

`Try Frontier` is the only imperative-with-hedge label. It marks a preview tier without using the word "preview" or "beta".

### copilot.com global nav — five items `[observed]`

`Home` · `Features` · `Download` · `Plans and Pricing` · `More`

`Features` expands to five destinations, each on a **different hostname**: `Chat` → copilot.cloud.microsoft · `Create` → m365.cloud.microsoft/create · `Prompts` → m365.cloud.microsoft/copilot-prompts · `Cowork` → microsoft.com/microsoft-365-copilot/cowork · `Work IQ` → microsoft.com/microsoft-365/work-iq. A five-item feature menu spanning four hostnames is a domain-estate problem leaking into the nav.

### Microsoft global chrome `[observed]`

The `All Microsoft` mega-menu lists `Copilot` under **Global** pointing at `https://copilot.com/`. The footer's What's new column carries two audience-split entries: `Copilot for organizations` and `Copilot for personal use`. So the brand's *own* chrome performs the consumer/work split that the help hub has just merged away.

## T2 Value proposition & headline patterns

### Hero — a greeting, not a claim `[observed]`

> `Welcome to Copilot`
> "Chat to find answers, create content, and complete tasks with AI that understands your work."

CTA: a single `Sign in`.

This is the most restrained hero in the AI cohort and worth dwelling on. There is no superlative, no number, no speed claim, no "most advanced". The subhead is a **three-verb list with a relative clause** — find / create / complete, then one differentiator ("understands your work"). The differentiator is a *scope* claim, not a *quality* claim, which is materially harder to falsify and therefore easier to defend. Compare Wise, which bolds `as low as 0.1%` in its subhead and then immediately footnotes it.

The page title, however, is `Microsoft Copilot | Sign in` — the marketing homepage is titled as an auth page. In search results and browser tabs the product's front door reads as a login screen. Recorded as a defect.

### Section headers on copilot.com `[observed]`

`One Copilot for every part of your day` — followed by three audience tabs: `Work` · `Life` · `School`.

The tabs do not change the product; they change the *verbs*. Same three-card grid, re-voiced per audience:

| Tab | Card 1 | Card 2 | Card 3 |
|---|---|---|---|
| Work | `Get started with chat` | `Find what you need` | `Create with AI` |
| Life | `Chat with Copilot` | `Find trusted information` | `Create from imagination` |
| School | `Learn with Copilot Chat` | `Find what you need` | `Create with AI` |

Two observations. `Create from imagination` (Life) versus `Create with AI` (Work/School) is the only place the copy lets itself be lyrical, and it is on the lowest-stakes tab — the same stakes-gradient Wise uses. And the Work and School tabs **share two of three card labels verbatim**, which means the tab mechanism promises more differentiation than the copy delivers. A user toggling Work → School sees the middle and right cards not change at all.

### Capability framing without overclaiming — the house pattern `[observed]`

Nearly every capability sentence in the help set is built as **capability + immediate bound**:

- Help hub, Agents: "Hand off repetitive work so you can focus on what matters." — delegation framed as *your* refocus, not the agent's competence
- What-is article: "Copilot connects to the Microsoft 365 apps and content you use every day…" then, in the same paragraph, "…your experience adapts to your account"
- Transparency Note, intended uses: "Copilot **may** retrieve, analyze, and summarize information from available sources. **Some advanced features may be available only to users with eligible subscriptions.**"
- copilot.com, item 06: "Copilot AI helps you research, create, and get answers, **with some capabilities subject to usage limits** and more available through paid plans."

The modal verb "may" and the entitlement caveat do heavy lifting. The transparency note goes further and refuses the accuracy frame outright:

> "We broadly consider performance to mean that the application performs as users expect."

That is an explicit redefinition of "performance" away from correctness, stated in a public document. It is honest and it is also convenient; a content designer should note both readings.

### The one place the tone breaks `[observed]`

Diagnose article, closing: "Copilot accelerates thinking—but speed can hide gaps." And Validate: "That speed is useful—but speed is not the same as readiness."

The same rhetorical figure — *concede the benefit, then undercut it with an em dash* — recurs across four articles. It is the closest thing Copilot has to a house sentence, and it is the mechanism by which the product warns about itself without a disclaimer. See T10.

## T3 CTA inventory

| CTA / link label (verbatim) | Context | Notes |
|---|---|---|
| `Sign in` | copilot.com hero, and global chrome on every support page | The only CTA on the marketing hero |
| `Go to Chat` | copilot.com audience cards (Work, Life, School) | Destination-named, appears 3× |
| `Start exploring` | copilot.com, Search card (Life, School) | |
| `Start creating` | copilot.com, Create card (Life, School) | |
| `For Windows` / `For Mac` | copilot.com download block | Platform-as-CTA, no verb |
| `Expand all` / `Collapse all` | copilot.com "Did you know?" accordion | |
| `What is Copilot?` | Help hub, Get started | CTA text = question |
| `Where can I get Copilot?` | Help hub, Get started | Second question CTA in the same card |
| `Try Copilot now` | Help hub, Get started | → `copilot.cloud.microsoft`, **not** copilot.com |
| `Get instant answers` | Help hub, Chat | |
| `Write a great prompt` | Help hub, Chat | |
| `Connect your services` | Help hub, Chat | Only link in the block crossing to `/microsoft-copilot/` |
| `Get started with agents` | Help hub, Agents | |
| `Learn how to use Researcher agent` | Help hub, Agents | Fully specific, names the agent |
| `Prompting essentials` · `Use and adapt examples` · `Get better results` · `Review and refine` | Help hub, "The art of asking" cards | Four-card skill ladder entry |
| `New to Copilot? Start here` | Help hub, Keep learning | Question + imperative stacked |
| `Register for courses` | Help hub, Keep learning | |
| `Copilot Academy` · `Scenario Library` · `AI learning hub` | Help hub, Keep learning | Proper-noun destinations |
| `Next step: Iterate on Copilot output to get better results` | Foot of Diagnose | Full-sentence sequential CTA |
| `Next step: Evaluate Copilot output for clarity, accuracy, tone, and context` | Foot of Iterate | |
| `Next step: Design boundaries and checkpoints` | Foot of Decide | **Shorter form than the destination's own title** |
| `Next step: Validate Copilot output` | Foot of Design boundaries | |
| `Download the … quick reference guide` | Every skill article, in a `Tip` callout | Repeated twice per article — once inline, once in the Tip |
| `More ways to build this skill with Copilot` | Section header, every skill article | Not a CTA but functions as one |
| `Yes` / `No` | Feedback widget, every support page | Under `Was this information helpful?` |
| `Submit feedback` | Feedback widget | |
| `Skip to main content` | First in DOM, every page | Accessibility |

**Observations.** Copilot almost never ships a bare `Learn more` — the one near-miss is `Get more agents`. The `Next step:` prefix is the strongest CTA pattern here: it converts a link into a position in a sequence, which is exactly what a skill ladder needs. But the prefix is applied inconsistently — `Next step: Design boundaries and checkpoints` links to a page titled `Design boundaries and checkpoints for Copilot work`, while `Next step: Evaluate Copilot output for clarity, accuracy, tone, and context` reproduces its destination title in full. Two shapes for one mechanism.

The `Try Copilot now` → `copilot.cloud.microsoft` mismatch is part of a larger defect: see T13.

## T4 Onboarding & getting-started

### "The art of asking" — a four-card ladder with alt-text-as-copy `[observed]`

The hub block is the product's stated prompt-craft curriculum. Each card's label and scope line:

| Card | Scope line (verbatim) |
|---|---|
| `Prompting essentials` | "Learn the simple ingredients of an effective prompt." |
| `Use and adapt examples` | "Start from proven examples and tailor them to your work." |
| `Get better results` | "Use practical techniques to guide Copilot toward more useful answers." |
| `Review and refine` | "Check, improve, and build on what Copilot generates." |

The progression is **learn → borrow → tune → audit**. Card 4 routes to `diagnose-copilot-output`, which is the entry point to the whole skill ladder — so the prompt-craft block and the output-quality block are wired as one continuous path, not two topics. That wiring is the single most transferable structural decision in this file.

Each card's image carries long descriptive alt text that *repeats the card label inside it* — e.g. "Illustration of a checklist-style card, representing reviewing and refining prompts to improve Copilot responses. Review and refine Check, improve, and build on what Copilot generates." The label and scope line are inside the alt attribute as well as in the DOM. Screen-reader users will hear the card text twice, once wrapped in a description of the decoration. Recorded as an accessibility defect in T14.

### The four-part prompt framework — and its ordering defect `[observed]`

`get-started-writing-prompts…` states:

> "Prompts can include four parts: the goal, context, expectations, and source"

Required minimum is stated plainly: "all that's required is a clear goal. If you want to be more specific, add the other parts."

Two worked prompts are given, labelled by which parts they contain — goal + source, then goal + context + expectations. The pedagogy is *additive*: name the parts, show a two-part prompt, show a three-part prompt.

But the four parts are named in **three different orders on two sibling pages**:

| Source | Order |
|---|---|
| `get-started-writing-prompts…` body text | goal, context, expectations, source |
| `get-started-writing-prompts…` image alt | "goal+context+tone+data" |
| `write-a-great-prompt…` image alt | "Goal, Context, Source, and Expectations" |

The second row is worse than a reorder — it renames two of the four parts ("tone" for expectations, "data" for source). A user who cannot see the image gets a different framework than a user who can. For a product whose flagship teaching artefact is a four-part mnemonic, having the mnemonic unstable across two pages is a first-order content defect.

### The three-step prompt guide `[observed]`

`write-a-great-prompt…` uses numbered headings that are imperatives of increasing abstraction:

1. `Tell Copilot what you need`
2. `Include the right prompt ingredients`
3. `Keep the conversation going`

Step 1 is a six-row table of **use case → example prompt**, with the use cases as gerund-or-imperative labels: `Track industry news:` · `Summarize information:` · `Edit text:` · `Create engaging content:` · `Transform documents:` · `Catch-up on missed items:`. Note `Catch-up` hyphenated as a noun in a label position where the other five are verbs — an inconsistency, and "catch up" appears unhyphenated as a verb elsewhere in the same doc set.

Step 3 gives six follow-up patterns, each a two-move sequence: `Generating content ideas` — "Lead with broader requests, then give specific details". The repeated **"do X, then Y"** shape teaches iteration as a rhythm before the skill ladder teaches it as a discipline.

### "Helpful hints to keep in mind" — the weakest content in the harvest `[observed]`

Five bolded hints:

- `Know Copilot's limitations` — "Copilot is limited to your current conversation, so give lots of details."
- `Be professional` — "Using polite language improves Copilot's response."
- `Communicate clearly` — "Pay attention to punctuation, grammar, and capitalization."
- `Use quotation marks` — "This helps Copilot know what to write, modify, or replace for you."
- `Start fresh` — "Avoid interrupting and type "new topic" when switching tasks."

Flag three problems. (a) "Using polite language improves Copilot's response" is an **unsourced behavioural claim** stated as fact; nothing elsewhere in the doc set, including the Transparency Note, substantiates it. (b) "Copilot is limited to your current conversation" directly contradicts the privacy-controls article, which documents a persistent `Saved memories` feature and `Chat history`. (c) The article is dated `Last updated: February 2026` on-page while its `ms.date` is `02/12/2026` and `updated_at` is `2026-08-18` — three dates, one of them user-visible and seven months behind the last edit.

This page also carries the typo `"Rewrite withCopilot."` (missing space).

## T5 Form & field labels

`[documented]` — no live product form was reachable. Settings labels are documented in the privacy set as exact UI strings:

| Label (verbatim) | Control type | Location documented |
|---|---|---|
| `Personalization` | Settings section | Settings → Personalization |
| `Saved memories` | Toggle | Personalization |
| `Delete all memories` | Button | Personalization → Manage |
| `Manage` | Link/button beside the toggle | Personalization |
| `One shared experience` | Toggle | Personalization |
| `Web search` | Toggle | Personalization |
| `Allow ads personalization` | Toggle | Personalization |
| `Web browsing` | Settings section | Settings |
| `Import browser data` | Button | Web browsing |
| `Bring over your browsing data from Microsoft Edge` | Toggle | Web browsing → Import browser data |
| `...More` | Overflow control beside a chat | Chats list |
| `Chats` | Left-nav list label | Navigation pane |
| `Work` / `Personal` | Account badge beside profile | Navigation pane |

The toggle-label register is worth extracting. Four of the six are **bare noun phrases** (`Saved memories`, `Web search`), one is a **permission sentence fragment** (`Allow ads personalization`), and one is a **coined product noun** (`One shared experience`). `Bring over your browsing data from Microsoft Edge` is a full imperative clause as a toggle label — eight words, second person, naming the source system. That is the most explicit toggle in the set and it governs the most sensitive import (cookies, history, payment info, passwords, autofill). **Label length tracks stakes**, deliberately.

Feedback-widget options are the other observable form `[observed]`, a two-column checkbox set under `What affected your experience?`: positive column `Resolved my issue` · `Clear instructions` · `Easy to follow` · `No jargon` · `Pictures helped` · `Other`; negative column `Didn't match my screen` · `Incorrect instructions` · `Too technical` · `Not enough information` · `Not enough pictures` · `Other`. `No jargon` as a *praise* option is a notable admission that jargon is the expected failure.

## T6 Status & state language

`[documented]`, and thinner than the category deserves — because Copilot's design decision is to have **almost no system states exposed to the user**. There is no job queue, no "processing", no "failed" in any public string here.

What state vocabulary exists is about the *output*, not the system:

- **Mode state.** "The selected mode will remain active until you disable it." Mode is a sticky per-conversation state, and the article says so explicitly rather than leaving the user to discover it.
- **Thinking state.** "Think Deeper and Smart may take some additional time… During that time, Copilot will share its chain of thought while evaluating your prompt and preparing a response." The latency is named (`up to 10 seconds` for Think Deeper) and the wait is filled with visible reasoning rather than a spinner.
- **Access state.** `Standard and priority access` is a named left-rail topic. Think Deeper: "Use of Think Deeper in Copilot is not limited, but Microsoft 365 Personal, Family, and Premium users have priority access whenever capacity is limited." This is a **degradation state described in advance** — the user learns what happens under load before it happens.
- **Approval state (Cowork).** "You review and approve sensitive actions before it happens." A named pre-execution hold. The left rail labels it `Take control of actions before they run`.
- **Safety state.** "the system disengages from the conversation and instead provides crisis support resources". `disengages` is the verb chosen for the hardest state transition in the product.
- **Enforcement state.** "Copilot may block your request or limit your access to Copilot or certain features." Three severities in one sentence: block, limit, suspend ("temporarily or permanently suspended from the service").

**Pattern worth stealing:** for a probabilistic product, the states that matter are not *pending/complete* but *how confident, how constrained, how degraded*. Copilot names capacity-based degradation, mode persistence, and pre-action holds — and names them in help before the user meets them. What it does not do is give any of these a short UI-ready state word. There is no `Limited`, no `Held`, no `Under review` in the public copy.

## T7 Error, failure & recovery

`[absent]` as conventional error strings. **This absence is itself the finding**, and it is the most interesting thing about Copilot's content architecture.

There is no troubleshooting category on the help hub, no "Fix a problem" IA node, no error-title inventory, and no first-person recovery articles of the Wise `I sent the wrong amount` kind. Search the harvested set for an error title and you find none.

What Copilot has instead is a **four-article skill ladder that treats bad output as the normal case and diagnosis as the user's job**. Failure is not modelled as a system event with a message; it is modelled as a quality gap the user detects, names, and repairs. The recovery vocabulary is therefore *diagnostic*, not *apologetic*:

| Framework | The four or five names the user is taught | Article |
|---|---|---|
| Diagnose | `Decisions` · `Risks` · `Context` · `Specificity` · `Freshness` | diagnose-copilot-output |
| Iterate | `Goal` · `Audience` · `Constraints` · `Evidence` · `Structure` | iterate-copilot-output |
| Evaluate | `Clarity` · `Accuracy` · `Tone and audience fit` · `Context` | evaluate-copilot-output… |
| Validate | `Source` · `Verified` · `Context` · `Resilient` | validate-copilot-output |
| Decide | `Repeatability` · `Impact` · `Error detectability` · `Time sensitivity` | decide-when-copilot-or-an-agent… |
| Boundaries | `Goal` · `Freshness` · `Context` · `Audience` · `Checkpoints` | design-copilot-boundaries… |

Six frameworks, twenty-eight criterion names, and `Context` appears in four of the six with a different definition each time (completeness in Diagnose, background in Boundaries, missing-caveats in Validate, audience-fit in Evaluate). For a taxonomy this deliberate, reusing the highest-traffic word four ways is a real terminology failure — recorded again in T13.

**The recovery move is a prompt, not a button.** Every criterion row terminates in an `Ask Copilot` cell containing a verbatim prompt the user is meant to paste:

- *"What decisions are clearly stated in this output?"*
- *"Where might this output sound overconfident or incomplete?"*
- *"What in this output might be outdated, assumed, or no longer current?"*
- *"Cross-check this response against the source material and highlight any mismatches, unsupported claims, or missing qualifications."*
- *"What scenarios, exceptions, or alternate interpretations could make this response incorrect or misleading?"*

This is the product's answer to "the output is wrong": **turn the model on its own output**. The Validate article names the four roles Copilot plays in that move — `Reviewer` · `Challenger` · `Gap finder` · `Stress tester` — and then bounds the move immediately: "Copilot can help you validate its output—but it can't certify its own correctness." and "Use Copilot's feedback as a signal—not as the final authority."

The iterate-vs-restart decision is given its own two-column table with a plain-language rule:

> `Iterate when` — "The output is mostly useful." / `Start over when` — "The response misses your goal entirely." Closing line: "If the foundation is off, refining it might not help. Resetting the request can be faster."

Telling a user to **discard the AI's work and start over** is a recovery instruction most AI products avoid, because it concedes a wasted turn. Naming the threshold ("misses your goal entirely", "the direction or structure is fundamentally wrong") is the honest version.

**Signals of weakness** — the diagnose article ships a column of *example bad output*, which is close to an error-message inventory in reverse:

- "The team discussed timeline options." (decision unclear)
- "Everything is on track and ready to move forward." (risk hidden)
- "Next steps were identified, but owners and timelines were not specified." (context missing)
- "Several updates were shared." / "Key topics were discussed." / "Next steps were outlined." (specificity)

Publishing specimens of your own product's weak output, verbatim, in the help centre, is rare and reusable.

## T8 Empty states

`[absent]`. No empty-state copy was reachable on any public surface. The support search field renders `No results` as a placeholder list item in the unpopulated nav search dropdown `[observed]`, but this is Microsoft support chrome, not Copilot.

The nearest analogue is documented rather than observed: the Transparency Note describes a first-run affordance — "Each time users interact with the Copilot experience they will see a set of cards that they can click to start chatting with Copilot about useful and interesting topics." Suggestion cards, personalised over time from chat history, with a stated opt-out. No card strings are published.

## T9 Notifications & system messages

`[documented]`, sparse but two entries are unusual enough to be worth the whole section.

**Extended usage notification** — Transparency Note, under Manage:

> "Copilot may remind users to take a break if they've been engaging in continuous conversation for an extended period of time. Users are also regularly informed that AI is not human and can make mistakes."

A **time-on-task nudge** and a **recurring AI-disclosure reminder**, both committed to in a public governance document. No threshold is published, no string is published. This is the only place in the harvest where Copilot describes interrupting the user for the user's own benefit.

**Crisis interruption** — same document:

> "When such content is detected, the system disengages from the conversation and instead provides crisis support resources (for example, the Suicide and Crisis Lifeline at 988 in the United States), encouraging users to seek professional help. Copilot does not provide counseling; its role is limited to detection and referral to ensure user safety."

Two content decisions here. The system **withdraws** rather than redirects ("disengages"), and the doc states the scope limit in the negative first — "does not provide counseling" — before stating what it does. That is the same *state-what-you-are-not-first* construction Wise uses for FDIC status, applied to a safety boundary.

**Other documented notices**: an AI-disclosure surface ("Copilot is also designed to inform people that they are interacting with an AI system… various touchpoints"); a one-time Vision upload notice ("The first time a user uploads an image to Copilot Vision, they will be provided with information on how their image is processed"); and proactive research suggestions with an opt-out. Feedback-submission confirmation is `[observed]`: `Thank you for your feedback!`

`[absent]`: no toast strings, no banner strings, no email or push copy.

## T10 Disclosures, legal & compliance

**The priority section, and the headline finding is structural: Microsoft Copilot has no meaningful one-line "AI can make mistakes" disclaimer on any surface harvested. It has a curriculum instead.**

### The disclaimer is distributed across ~8,000 words of skills content

Where a competitor ships a persistent footer string, Copilot ships six framework articles whose entire purpose is to teach the user that fluent output may be wrong. The key strings:

> "a polished response isn't always a complete one" — diagnose-copilot-output, second sentence of the article

> "**Prevent false confidence.** Clear language can mask missing decisions, risks, or assumptions." — diagnose-copilot-output, "Why diagnosing output matters"

> "A response can sound polished and still be wrong, incomplete, or risky to use. Validation is the step between getting a response and trusting it." — validate-copilot-output

> "Polished language can sometimes hide a lack of substance." — iterate-copilot-output, Evidence lens

> "Many AI mistakes are really omissions. The output might sound complete because it is smooth and well organized, but the missing context is what makes it misleading." — validate-copilot-output, Context check

> "A polished draft can create false confidence." — diagnose-issues-in-a-copilot-generated-draft

The recurring claim is specific and non-obvious: **fluency is the failure mode**. Not "AI sometimes hallucinates" but "smoothness is what makes the gap invisible". That is a genuinely better mental model to give a user, and it cannot be delivered in a footer line — which is presumably why it isn't one.

### Accountability, stated four times in four articles

> "Using AI doesn't transfer accountability. If Copilot output influences a recommendation, shapes a decision, or gets shared with other people, you still own the outcome." — validate-copilot-output

> "Delegating work to AI doesn't transfer accountability." — decide-when-copilot-or-an-agent…

> "Agents expand what you can do, not what you are responsible for." — decide-when-copilot-or-an-agent…

> "Work produced by Copilot or an agent is still your work." — decide-when-copilot-or-an-agent…, under the H2 `Accountability stays with you`

`Accountability stays with you` appears as a **section heading in two separate articles**. The doc set has elevated liability allocation to an IA node.

Two supporting constructions are worth extracting. The collaboration model is rendered as an arrow sentence: "*You* set direction and boundaries → *AI* drafts, summarizes, and analyzes → *You* review, refine, and approve the result before it's used." And the reframe: "The key question is not *'Can AI do this?'* but *'Where should AI support the work—and where should humans lead or review before decisions are made?'*" — a question substitution, not an answer.

The three delegation tiers are named as full clauses rather than labels: `Automate with human review` · `Support with Copilot but keep human-led` · `Keep fully human-led`. And the carry-forward triage: `Carry forward` · `Carry forward carefully` · `Leave out`. Three-state classifications with a hedged middle term are rare; most products offer binary allow/deny.

### The formal limitations register — Transparency Note `[observed]`

The Transparency Note is where the unhedged admissions live. Eight named limitations, each with a mechanism and a mitigation:

`Stereotyping` · `Overrepresentation and underrepresentation` · `Inappropriate or offensive content` · `Information reliability` · `Multilingual performance` · `Audio limitations` · `AI is not a replacement for professional help` · `Dependence on Internet connectivity` · `Exercise caution when creating or using agents`

Key strings:

> "generative AI models like those behind Copilot are probabilistic and can make mistakes, meaning mitigations may occasionally fail to block harmful user prompts or AI-generated responses"

> "It could potentially generate nonsensical content or fabricate content that might sound reasonable but is factually inaccurate."

> "there could be variations in performance across languages, with English performing best at the time of releasing Copilot"

The stereotyping entry is unusually concrete for a corporate transparency document — it supplies a reproducible example (Turkish back-translation flipping "He is a nurse"/"She is a doctor") and a second one about the prompt "Fatherless children" generating a single ethnicity. Naming your own reproducible bias cases is a defensible and rare practice.

The agent-caution entry is the newest-sounding and the most tangled: "agents may not work well for all use cases, and may make mistakes, misinterpret instructions, or **be deceived by malicious hidden instructions**". Prompt injection, named in consumer-facing help. It is also the sentence carrying the most typographical damage in the harvest (see defects below).

### Data use, training, and privacy controls `[observed]`

Six named controls, each with click-path steps: `Memory` · `Shared experiences` · `Chat history` · `Web search` · `Personalized advertising` · `Import browser data from Microsoft Edge`.

Notable disclosures:

- **Memory persistence is stated against the user's likely assumption**: "Turning off Copilot Memory doesn't automatically delete already saved memories." The gap between *stop collecting* and *delete what's collected* is named explicitly. Most products leave this to inference.
- **Cross-product data flow is bidirectional and stated as such**: Bing/Edge/MSN activity personalises Copilot, and "your Copilot chats can be used to help personalize your interactions on Bing, Edge, and MSN", with a worked example (vacation chat → travel content in Bing and MSN).
- **Setting-scope disambiguation**: "The shared experiences setting doesn't control whether you're shown personalized ads in Copilot, which is a separate choice you can make." Pre-empting a reasonable wrong inference about one's own settings model is good practice and rare.
- **Ads are disclosed by tier**: "If you use Microsoft Copilot and don't have a Microsoft 365 subscription, you might see advertising in Copilot." Generic-vs-personalised is then defined: generic ads use "the most recent content of your current conversation" only; personalised ads "might use your chat history, saved memories, and other Microsoft data".
- **Age-gated ad floor**: "Regardless of your settings, Copilot doesn't show personalized advertising to users under the age of 18." Stated as an override, not a setting.
- **Human review is admitted**: "Humans may review your conversations in Copilot for safety, legal, product improvement, or troubleshooting." In the *young people* article, in the second person, unhedged.
- **Retention figure**: Vision images "are deleted within 30 days after the conversation ends."
- **Geo-limited feature**: browser-data import "is only available to individuals whose Microsoft account is based in the United States."

**Model-training use is `[absent]` from every page harvested.** No page in this set states whether consumer conversations are used to train models. The privacy-controls article covers personalisation, ads, and history; the Transparency Note covers evaluation pipelines and red teaming but not training data provenance for user conversations. For a corpus benchmarking AI-product disclosure this is a significant negative finding and should be re-checked against the Microsoft Privacy Statement, which is linked but out of scope here.

### Age limits and minors `[observed]`

> "You must be at least 13 years old to use Copilot, and in some countries or regions, the minimum age may be higher depending on regional requirements."

The young-people article is written **to the young person in second person**, not to the parent — a deliberate and unusual addressee choice. Its strongest lines:

> "As an AI, Copilot can be helpful, but remember that it's not a person. Copilot doesn't have feelings, life experience, or human judgement."

> "AI is a tool, not a friend, and shouldn't be a substitute for receiving advice from a trusted adult."

> **"Remember:** AI isn't a substitute for seeking help from trusted adults in your life."

That third line is set as a standalone bolded paragraph — the article's only typographic emphasis — and it restates the "not a friend" point a second time within four paragraphs. The repetition is not an editing miss; it is the one message the article will not risk being skimmed past.

Minor-specific behaviour differences are enumerated: no personalisation from conversation history, no personalised ads. Parental controls are listed as **three capabilities with named third-party tools** (Microsoft Family Safety, Google Family Link, Apple Family Sharing): block access, set time limits, and "Choose which features are available to you, such as image generation, voice mode, group chat, or **AI companions**." `AI companions` is named as a parental-control-gated feature category and appears nowhere else in this harvest — an unexplained term surfacing only in the minors context.

### Usage and rate limits `[observed]`

Deliberately vague, and in two places mutually loose:

- copilot.com item 06: "some capabilities subject to usage limits and more available through paid plans"
- copilot.com footnote: "* Copilot features require eligible Microsoft 365 subscriptions. Availability varies."
- Conversation modes: "Use of Think Deeper in Copilot is not limited, but Microsoft 365 Personal, Family, and Premium users have priority access whenever capacity is limited."
- What-is article: "Feature availability varies by subscription type."
- Sign-in incentive: "Signing in unlocks more, including your chat history, more image creation, longer conversations, extended voice sessions, and other features."

No number is published anywhere. `more image creation` and `longer conversations` are comparatives without a baseline. This is the weakest disclosure area in the file and stands in direct contrast to the precision of the privacy controls. Note also the near-contradiction: Think Deeper is "not limited" *and* subject to priority access "whenever capacity is limited" — both true, but the sentence asks the reader to hold two senses of "limited" at once.

### Acceptable-use boundary `[observed]`

- "Use Copilot in a respectful, ethical, and lawful manner. Avoid using Copilot for any purpose that might cause harm to yourself or others."
- "Microsoft does not allow Copilot to be used in connection with illegal activities or for any purpose intended to promote illegal activity."
- "Users that commit serious or repeated violations may be temporarily or permanently suspended from the service."
- System-message example published verbatim: "do not provide information or create content that could cause physical, emotional, or financial harm."
- CSEAI detection with mandatory NCMEC reporting, named as a US legal requirement.
- C2PA content credentials on all generated images, with a public verification link.
- Shopping neutrality disclosure: "Except where identified, Microsoft doesn't receive commissions or other compensation for product suggestions or search results provided in Copilot."

Publishing a line of the actual system message is the most transparent single act in the document set.

## T11 Help-centre architecture

### Shape: a hub with no topic tree

Unlike a conventional help centre, there is no category → subcategory → article-list hierarchy. The hub is a **card grid of five blocks** (T1) and articles are reached either from a card or from an in-article `Related topics` rail. There is no browsable index, no article count, no search scoped to Copilot.

### The `Related topics` rail — the real IA `[observed]`

Every skill-ladder article carries an identical four-group rail. This is the product's actual curriculum structure and it is the strongest artefact here:

| Group heading | Items |
|---|---|
| `Get better Copilot results` | `Diagnose what's missing` · `Iterate for better results` · `Evaluate before you use it` |
| `Example - Improve a proposal` | `Diagnose gaps in the draft` · `Strengthen the draft` · `Evaluate draft readiness` |
| `Make smarter Copilot decisions` | `Decide what to delegate` · `Set boundaries and checks` · `Validate before you act` |
| `Example - Stress-test a brief` | `Delegate decision brief tasks` · `Set content guardrails` · `Validate before sharing` |

**This is a 2×2: two skill tracks, each paired with a worked example track, each exactly three steps.** The abstract article and its scenario twin are separate documents with parallel structure — `Diagnose what's missing in Copilot output` has the twin `Diagnose issues in a Copilot-generated proposal`, and they share the same five criteria, the same visual organiser, and the same downloadable guide.

Pairing every concept article with a same-shaped worked example, and exposing both tracks side by side in the nav, is the most reusable IA decision in this file. A reader can choose theory or specimen at every step without leaving the rail.

But the rail labels and the article titles are **different strings for the same destinations**:

| Rail label | Destination H1 |
|---|---|
| `Diagnose what's missing` | Diagnose what's missing in Copilot output |
| `Iterate for better results` | Iterate on Copilot output to get better results |
| `Evaluate before you use it` | Evaluate Copilot output for clarity, accuracy, tone, and context |
| `Validate before you act` | Validate Copilot output before you act on it |
| `Set boundaries and checks` | Design boundaries and checkpoints for Copilot work |
| `Decide what to delegate` | Decide when Copilot or an agent is the right tool for your work |

The rail versions are consistently shorter, verb-first, and drop the word "Copilot". That is a defensible compression *if* it is a deliberate nav register — and the consistency of the compression across all twelve items suggests it is. Worth extracting as a pattern: **nav labels as clipped imperatives, titles as full self-describing sentences**. The risk is that `Set boundaries and checks` and `Design boundaries and checkpoints` will read to a returning user as two different articles.

### Article-title grammar — three shapes

| Shape | Examples |
|---|---|
| Bare imperative + object | `Diagnose what's missing in Copilot output` · `Validate Copilot output before you act on it` · `Iterate on Copilot output to get better results` |
| `Get started with X` | `Get started with agents` · `Get started with Cowork` · `Get started with Pages` · `Get started with Notebooks` · `Get started with search` (appears 9× in the left rail) |
| `How X works` | `How Copilot Pages works` · `How Copilot Notebooks works` · `How Copilot Chat works with and without a Microsoft 365 license` |

The `Get started with X` / `How X works` pairing is applied systematically: nearly every major surface has both a do-it article and an understand-it article. Compare the Wise model, where the how/why split is emotional (`Where is my money?`); here it is epistemic.

### Routing furniture `[observed]`

Every article ends with the same three-part foot: `Next step: …` → `More ways to build this skill with Copilot` (3 links, one of which is always a Microsoft Learn training path) → `Was this information helpful?`. There is no `Contact us`, no `Still need help?`, no escalation path anywhere in the Copilot help set. The only human route offered on the whole hub is an IT-admin sidebar: "**Are you an IT admin?** Explore deployment, adoption, and management resources…". A consumer with a broken Copilot has no documented next step.

### The duplicated privacy tree — a documented fork `[observed]`

The `/privacy/microsoft-copilot/` set has six siblings: `Overview` · `Privacy controls` · `Activity history` · `Providing feedback` · `Copilot for young people` · `Transparency Note`. Three of the four inspected open with the same `Important` callout:

> "An updated version of the Microsoft Copilot app for web, desktop, and mobile devices is available as of August 18, 2026. If you haven't updated to or downloaded the new version of the Microsoft Copilot app, this article does *not* apply to you. Instead, see [older article]."

Each routes to a differently-named legacy twin in the `/microsoft-copilot/` namespace:

| New article | Legacy twin named in the callout |
|---|---|
| `…/privacy/microsoft-copilot/overview` | `Privacy FAQ for Microsoft Copilot` |
| `…/privacy/microsoft-copilot/privacy-controls` | `Microsoft Copilot privacy controls` |
| `…/privacy/microsoft-copilot/young-people` | `Microsoft Copilot for Young People` |

So **two complete parallel privacy doc sets are live simultaneously**, discriminated not by account type or region but by *whether the reader's app has auto-updated* — a condition the reader cannot reliably self-assess, since copilot.com item 02 says "The updated experience rolls out automatically" with no way given to check. Each new article additionally carries a two-bullet `Note` routing Microsoft 365 app users and Entra users to two *further* privacy articles. A consumer opening the privacy overview must answer three routing questions (app version, which surface, which account type) before reading a sentence.

Version-gated documentation is a legitimate technique. Gating on an invisible condition is not.

## T12 FAQs

### copilot.com "Did you know?" — a numbered accordion, not a Q&A `[observed]`

Seven items, numbered `01/` through `07/`, each headed by a **declarative statement rather than a question**:

| # | Heading (verbatim) |
|---|---|
| 01 | One Microsoft Copilot experience across work and life |
| 02 | No download or reinstall is required |
| 03 | Your conversations move with you while remaining separate by account |
| 04 | Several Copilot features have new names |
| 05 | Copilot Chat helps you ask questions, explore ideas, and get things done |
| 06 | Microsoft Copilot is free with a signed-in Microsoft account |
| 07 | You're in control of your data and AI experiences |

Answers summarised: 01 asserts cross-device continuity; 02 says the update arrives automatically with no user action; 03 says history and files carry over while work and personal stay partitioned; 04 supplies the rename table (below); 05 tells former Bing AI / Bing Chat users their product became this one; 06 states a free tier with unnamed usage limits and paid upgrades; 07 asserts privacy-by-design and defers to the Privacy Statement.

**Structural read.** This block is doing migration comms, not support. Ordering: continuity → no action needed → your stuff is safe → things got renamed → your old product is now this product → pricing → privacy. Items 01–05 all manage a *change*; only 06 and 07 answer an evergreen question. A user arriving cold, having never used Bing Chat, would find five of seven items answering a question they never had.

The `Did you know?` framing is a deflection device. Every one of these items is a *change notice* dressed as a piece of trivia. "Did you know several features have new names?" — no, and the phrasing implies a pleasant discovery rather than a breaking rename. Recorded as a tone finding, not a defect.

No FAQ block was found on the help hub or on any article. `Frequently asked questions about Microsoft 365 Copilot Pages` and `…Notebooks` exist as left-rail entries but were not opened.

## T13 Terminology & glossary

**The priority section. Copilot's naming system is mid-migration, publicly, in at least four directions at once.**

### The rename table Microsoft published about itself `[observed]`

copilot.com item 04, `Several Copilot features have new names`: "We've aligned feature names across experiences to create a more consistent Microsoft Copilot experience."

| Old name | New name |
|---|---|
| Project | Notebook |
| Tasks | Cowork |
| Deep Research | Researcher |
| Study and Learn mode | Guided Learning |

Publishing your own rename mapping on the marketing homepage is good practice. **But the fourth row is contradicted by a live help article on the same domain.** `conversation-modes-in-microsoft-copilot` still documents the mode as `Study and learn`, devotes a full section and six example prompts to it, and never mentions `Guided Learning`. That article's `ms.date` is `07/07/2025` — the only 2025 date in this harvest, over a year behind its siblings. The mode inventory a user reads in help is the pre-rename one.

### The app rename, stated in a note and contradicted by its own URL `[observed]`

`what-is-microsoft-copilot-app`, first content on the page:

> "The Microsoft 365 Copilot app is now called Microsoft Copilot app. If you previously used the Microsoft 365 Copilot app for work, look for the updated name and icon. Your experience in the app is the same."

Clean, short, does the three things a rename note must (old name, new name, reassurance). But:

- The URL the user typed — `…/what-is-the-microsoft-365-copilot-app` — **302s** to `…/what-is-microsoft-copilot-app`.
- The entire surrounding namespace is still `/microsoft-365-copilot/`.
- Sibling articles keep "365" in their slugs while their H1s have dropped it: `write-a-great-prompt-in-microsoft-365-copilot` renders as **`Write a great prompt in Microsoft Copilot`**; `get-started-writing-prompts-in-microsoft-365-copilot` renders as **`Get started writing prompts in Microsoft Copilot`**.
- The iOS store link on copilot.com resolves to `apps.apple.com/us/app/**microsoft-365-copilot**/id541164041`.
- The left rail still labels items `Get started with Chat` but links to `get-started-with-microsoft-365-copilot-chat`.

So the brand has been renamed in **display strings only**. Every durable identifier — URL, package name, store listing, depot name — still says 365. A content designer reading this file should note the pattern and its cost: display-layer renames are cheap and ship fast, but they guarantee a long tail of URL/label mismatch that users see in every address bar and every shared link.

### Four web front doors `[observed]`

| Host | Where it is offered | Label used |
|---|---|---|
| `copilot.microsoft.com` | This corpus entry's assigned primary URL | — |
| `copilot.com` | Global Microsoft nav (`Copilot`); what-is article, Install → Web: "Go to www.copilot.com" | `Copilot` |
| `copilot.cloud.microsoft` | Help hub CTA `Try Copilot now`; what-is article, "Where to find" → **Web: "Go to copilot.cloud.microsoft"** | `Try Copilot now` |
| `m365.cloud.microsoft/chat` | What-is article body ("starting a new chat"); every copilot.com card CTA | `Go to Chat` |

**The what-is article gives two different web addresses in two sections of the same page** — `copilot.cloud.microsoft` under "Where to find the Copilot app" and `www.copilot.com` under "Install the Copilot app → Web". Neither is flagged as an alias of the other. This is a hard defect, not a register difference.

### Coined and product terms

| Term | Usage | The alternative it rejected |
|---|---|---|
| `Copilot` | The assistant, and the app, and the brand | "assistant", "AI" |
| `Cowork` | Multi-step delegated task execution; a left-rail peer of Chat. "Copilot Cowork carries out tasks on your behalf." | "Tasks" (its own previous name), "agent mode" |
| `Work IQ` | Named in copilot.com nav and in "understands your job and company through Work IQ" | "organizational context", "enterprise graph" |
| `Researcher` / `Analyst` / `Workflows` | Named first-party agents, each with a `Get started with` article | "Deep Research" (Researcher's previous name) |
| `agent` (lowercase) | The generic; capitalised only in nav (`Agents`) | "assistant", "bot", "automation" |
| `Pages` / `Notebooks` / `Library` / `Create` / `Search` / `Chat` | Capitalised bare nouns as app surfaces | Verb-named surfaces |
| `Frontier` | Preview tier — `Try Frontier` | "Preview", "Labs", "Beta" |
| `Guided Learning` | New name for the study mode | "Study and learn" (still live in help) |
| `grounding` | Technical term retained, then glossed: "Copilot centers its response on high-ranking content from the web" | "sourcing", "citations" |
| `System message` / `metaprompt` | Both given, with the second parenthesised | — |
| `Classifiers` · `Red teaming` · `Mitigation` · `LLMs` · `SLMs` · `MMMs` | A formal `Key terms` glossary in the Transparency Note | Plain-language equivalents |
| `Saved memories` / `Copilot Memory` | Two forms in one article — the toggle is `Saved memories`, the prose says "Copilot Memory" | — |
| `One shared experience` | Toggle governing cross-product personalisation | "Personalization across Microsoft" |
| `AI companions` | Appears **only** in the parental-controls list, undefined | — |
| `Microsoft Entra ID` / `Microsoft Account (MSA)` | The account duality, glossed twice on one page | "work login" / "personal login" |

### Mode names — five, with three capitalisation styles `[observed]`

Verbatim from `conversation-modes-in-microsoft-copilot`:

- `Quick response:` "Provides straightforward, instantaneous responses."
- `Think Deeper:` "Takes up to 10 seconds to provide a more thoughtful response."
- `Study and learn:` "Optimized to explain concepts and guide you to an answer, rather than just providing direct answers."
- `Smart:` "Use the GPT-5 model to respond. Thinks deeply or quickly depending on the task."
- `Search:` "Brings you the most up-to-date answers from the web, with citations."

Three capitalisation conventions in a five-item list: title case (`Think Deeper`), sentence case with a capitalised head (`Quick response`, `Study and learn`), and single capitalised words (`Smart`, `Search`). The article's own body then writes "study and learn mode" in lower case in running text while the H2 is `Study and learn`. The coordinator's brief recorded these as "Quick Response, Think Deeper, Smart mode" — the actual strings are `Quick response`, `Think Deeper`, `Smart`.

The mode-selection instruction is also revealing: "Press (or tap) "Quick response" under your prompt and select an appropriate mode". **The mode picker's affordance is labelled with the name of the default mode**, so a user hunting for "modes" must know to click the words "Quick response". The help article compensates for a UI label that doesn't name its own function.

### `Context` — one word, four incompatible definitions `[observed]`

| Framework | What `Context` means there |
|---|---|
| Diagnose | Whether the output can stand alone without the source conversation — owners, timelines, dependencies |
| Evaluate | Whether it includes what the audience needs "and nothing they don't" |
| Validate | Missing caveats, assumptions, dependencies, risks that would change the outcome |
| Design boundaries | Whether each point has enough background, rationale, and ownership |

Plus `Context` is one of the four prompt ingredients, where it means background *supplied by the user going in* rather than found in output coming out. Five uses, five definitions, all in one curriculum a user is expected to traverse in sequence. For a doc set this disciplined about naming, this is the most consequential terminology failure in the file.

`Freshness` appears in two frameworks (Diagnose, Design boundaries) with consistent meaning — showing the reuse *can* be done well. `Goal` and `Audience` also recur consistently. It is specifically `Context` that has been overloaded.

## T14 Voice, tone & accessibility

### Person and tense

Second person throughout for the user; first-person plural for Microsoft, but **only in the privacy and transparency documents** ("we give you control", "we implement safeguards", "We remind users"). The skill articles have no corporate first person at all — Copilot is a third-person object the user operates, not a party to a relationship. That is a meaningful split: Microsoft speaks as "we" when it is accountable and vanishes when it is teaching.

Headings in the skill set are **user questions in the first person**, which is the most distinctive voice feature here:

`How do I iterate on Copilot output effectively?` · `How do I diagnose what's missing in Copilot output?` · `How do I validate Copilot output before using it?` · `How do I iterate without starting over?` · `When should I iterate—and when should I start over?` · `What questions should I ask before using AI for this task?` · `Can I use Copilot prompts to evaluate output?` · `How do I turn boundaries into clear decisions?`

Every criterion sub-head is also a question, but in the second person or elided: `Are decisions clearly stated, or just discussed?` · `What risks, blockers, or uncertainties might be missing?` · `Is this written for the right audience?` · `Would this response hold up in different scenarios?` The article is structured as an interrogation the user conducts, and the headings supply the questions. It is the closest thing in this corpus to Wise's `Where is my money?` — an IA built out of the user's sentences — applied to a skill rather than an anxiety.

### Register

Flat, declarative, professional. **Zero exclamation marks** across eighteen pages except the feedback confirmation (`Thank you for your feedback!`). No `Oops!`, no `Great news!`, no personality voice for Copilot itself. Contractions used freely ("doesn't", "isn't", "you'll"). Em dashes used structurally for the concede-then-undercut figure.

The register does **not** flatten as stakes rise — it starts flat. The young-people article is the only tonal departure, and it goes *warmer and simpler*, not more legalistic: "Your safety and privacy matter." / "Think of it as a smart software that can learn…" Reading level drops visibly. This is the correct direction and rarer than the reverse.

Numbers are sparse and unglamorous: `up to 10 seconds`, `over 170 markets`, `at least 13 years old`, `30 days`, `988`, `18`. No adoption statistics, no "millions of users", no benchmark scores anywhere. For an AI product in 2026 the complete absence of capability numbers is a deliberate posture.

### Repetition as a teaching device

Every skill article closes with a `Quick readiness checklist` using the same `✔️ **Term:** sentence` format, restating the framework terms a third time (heading → table → checklist). Across six articles that is a fixed three-pass structure. It is repetitive by design and it works — a user who skims lands on the checklist and still gets the vocabulary.

### Accessibility `[observed]`

- `Skip to main content` first in DOM on every page. **But it is `href="javascript:void(0)"`** on both support.microsoft.com and copilot.com, not an anchor to a content landmark. A skip link that does not link is a defect; whether JS restores the behaviour was not verifiable from server HTML.
- Alt text on the framework diagrams is genuinely descriptive and carries the information content: "Visual organizer for Diagnose what's missing in Copilot output. A five-part framework helps identify gaps in AI-generated content by checking Decisions, Risks, Context, Specificity, and Freshness before revising the output." A non-sighted user gets the five criteria from the alt text alone. This is the strongest accessibility practice in the harvest.
- Context-card alt text is similarly complete, including licence and app context: "Goal: Spot proposal gaps. Microsoft Copilot license required. App: Microsoft Copilot."
- **But** the hub's "art of asking" card images embed the card's *visible* label and scope line inside the alt attribute, producing duplicated announcement. And the Evaluate article's two images have **swapped alt text** — the image under "What should I evaluate" is described as a "Three-step learning pathway… step 3, Evaluate" while the top-of-article image is described as an "Output evaluation context card". A sighted reader sees the right pictures; a screen-reader user gets them in the wrong order with the wrong descriptions.
- Prompt-card icons repeat identical alt across dozens of instances: "Icon depicting a document with sparkles". Decorative repetition that should carry empty alt.
- Layout: framework criteria are delivered as **HTML tables with meaningful headers** (`What to look for` / `Signal of weakness` / `Ask Copilot`), which is correct and navigable. Several tables, however, have empty or dash-only header rows for the single-cell prompt callouts — a table used purely as a visual box.
- Language: 42 text languages, 63 voice languages, "over 170 markets", with an explicit exception list (China excluding Hong Kong; embargoed markets) and a staged-rollout caveat.

### Defects inventory — recorded plainly

| Defect | Location |
|---|---|
| `"you can continue to the same conversation mode to ask to ask follow-up questions"` — duplicated "to ask" | conversation-modes |
| `"Where is human review is required before information is shared…"` — duplicated "is", in an H3-level question | design-copilot-boundaries |
| `"…is the right tool for your workquick reference guide"` — missing space in link text | decide-when-copilot-or-an-agent |
| `"Rewrite withCopilot."` — missing space | get-started-writing-prompts |
| `"The tone, level of detail, and appropriate for intended readers."` — missing word, in a readiness checklist | iterate-copilot-output |
| `"AI can be a useful tool for problem-solving and can seen empathetic"` — "can seen" | transparency-note |
| `"could have significant consequences,be irreversible"` — missing space after comma | transparency-note |
| `"…review important details Users may be restricted from…"` — missing sentence break | transparency-note |
| `"Synonyms for "response" include "completion," "generation, and "answer.""` — unbalanced quotation marks | transparency-note, Key terms |
| URL says `…tone-and-coverage`, title and body say "tone, and context"; the word "coverage" appears nowhere in the article | evaluate-copilot-output-for-clarity-accuracy-tone-and-coverage |
| Two web addresses given for one destination on one page | what-is-microsoft-copilot-app |
| Marketing homepage titled `Microsoft Copilot \| Sign in` | copilot.com |
| `Study and learn` (help) vs `Guided Learning` (copilot.com rename table) live simultaneously | conversation-modes vs copilot.com |
| `Transparency Note for Microsoft Copilot` linked to `/microsoft-copilot/transparency-note-for-microsoft-copilot`, while the live note is at `/privacy/microsoft-copilot/transparency-note` | supported-regions-and-languages, "Learn more" |
| On-page `Last updated: February 2026` against `updated_at: 2026-08-18` | write-a-great-prompt, get-started-writing-prompts |
| Prompt framework named in three different orders/vocabularies across two sibling pages | T4 |
| `Context` defined four incompatible ways across one curriculum | T13 |
| "Copilot is limited to your current conversation" contradicts the documented `Saved memories` and `Chat history` features | write-a-great-prompt vs privacy-controls |
| Unsourced behavioural claim: "Using polite language improves Copilot's response." | write-a-great-prompt |
| Work and School audience tabs share two of three card labels verbatim | copilot.com |
| `Skip to main content` href is `javascript:void(0)` | all pages |
| Swapped image alt text between two figures | evaluate-copilot-output |

---

## Transferable patterns

1. **Distribute the AI disclaimer as curriculum, not as a footer line.** Copilot's answer to "output may be wrong" is six articles, twenty-eight named criteria, and one repeated thesis — *fluency is the failure mode*. "a polished response isn't always a complete one" teaches a mental model that "AI can make mistakes" does not. Condition: this only works where the user has time and motive to learn. It is right for a work tool used daily; it would be wrong for a one-shot consumer flow, which still needs the inline string. Directly applicable to any PayPal surface where an AI-generated summary informs a decision.

2. **Pair every concept article with a same-shaped worked example and expose both in the nav.** The 2×2 rail (`Get better Copilot results` / `Example - Improve a proposal`; `Make smarter Copilot decisions` / `Example - Stress-test a brief`) lets the reader pick theory or specimen at each of three steps without leaving the page. Cheap to adopt, hard to retrofit — the parallel structure has to be designed in.

3. **Terminate every diagnostic criterion in a copy-pasteable prompt.** The `Ask Copilot` column turns an abstract quality dimension into an executable action. *"Where might this output sound overconfident or incomplete?"* is a better recovery affordance than a Retry button because it teaches while it fixes. Condition: requires that the model can actually do the self-check reasonably, and requires the honest bound Copilot supplies — "it can't certify its own correctness."

4. **Publish specimens of your own product's weak output.** The Diagnose article ships "Everything is on track and ready to move forward." as an example of hidden risk, and "Several updates were shared." as an example of vagueness. Naming what your product does badly, in your own help centre, in quotation marks, buys more trust than any accuracy claim.

5. **Set label length by stakes.** `Web search` is two words; `Bring over your browsing data from Microsoft Edge` is eight and names the source system. The privacy toggle governing cookies, passwords, and autofill gets a full imperative clause. Apply to consent and permission controls generally.

6. **Say what turning a setting off does *not* do.** "Turning off Copilot Memory doesn't automatically delete already saved memories." and "The shared experiences setting doesn't control whether you're shown personalized ads." Pre-empting a reasonable wrong inference about the user's own settings model is worth a sentence every time.

7. **Repeat the one line you cannot afford to have skimmed.** The young-people article states "AI is a tool, not a friend" and then, four paragraphs later, sets **"Remember:** AI isn't a substitute for seeking help from trusted adults in your life." as its only bolded standalone paragraph. Deliberate redundancy on the single highest-consequence message.

8. **Negative pattern — do not rename in the display layer alone.** Copilot renamed the app and four features in visible strings while URLs, slugs, store listings, and doc depots kept the old names. The result is a marketing page contradicting a help article about a mode name, two web addresses on one page for one destination, and a nav item whose link bounces to a differently-named path. If a rename cannot reach the identifiers, publish the mapping *and* freeze the old display strings until it can.

9. **Negative pattern — do not overload your framework vocabulary.** `Context` means five different things across one curriculum the user is told to traverse in order. A framework's terms are its API; reusing the most common word with a new definition at each step undoes the teaching the terms were introduced to do.

10. **Negative pattern — a help centre with no unhappy path.** Copilot's hub has five blocks, none of which is troubleshooting, and no article in the set ends with a contact route. Framing all dissatisfaction as a skill gap is a coherent thesis right up to the moment something is genuinely broken, at which point the user has nowhere documented to go.

## Caveats & gaps

- **`copilot.microsoft.com` — the assigned primary URL — was not fetched in this pass.** The coordinator recorded it as a near-empty SPA shell canonicalising to `copilot.com`; `copilot.com` was harvested instead and is what T2/T3/T12 describe. The relationship between the two hosts is unverified here.
- **No in-product string was observed.** Every settings label, mode name, toggle, and state word in T5/T6/T9 is `[documented]` from help or privacy articles describing the UI. They may be stale relative to the shipping product — `conversation-modes` carries a July 2025 `ms.date` and is already contradicted by copilot.com's rename table.
- **Pricing is entirely unharvested.** `microsoft.com/microsoft-365-copilot/pricing` and `/microsoft-365-copilot/personal` were not opened. No plan name, price, or tier boundary appears in this file. `Microsoft 365 Personal, Family, and Premium` and "the Microsoft Copilot subscription" are the only tier references captured, and the latter is vague in its own source.
- **Model-training disclosure is absent from all eighteen pages.** Whether consumer conversations train models is not stated anywhere harvested. Re-check the Microsoft Privacy Statement before drawing any conclusion.
- **No usage limit, rate limit, or quota number was published anywhere.** "some capabilities subject to usage limits", "more image creation", "longer conversations" are the entirety of it.
- **The legacy privacy set was not opened** — `/microsoft-copilot/privacy-faq-for-microsoft-copilot`, `/microsoft-copilot/microsoft-copilot-privacy-controls`, `/microsoft-copilot/microsoft-copilot-young-people`. Their existence and routing callouts are documented in T11; their contents are not compared against the new set, so the extent of divergence between the two live versions is unknown.
- **The work-side privacy tree is unharvested** — `/privacy/data-protection-when-using-microsoft-365-copilot-chat-for-work-or-school` and `/privacy/copilot-in-microsoft-365-apps-for-home-your-data-and-privacy` are both referenced from every new privacy article but were not followed. The enterprise data-protection register (EU Data Boundary, tenant isolation, admin controls) is therefore not represented.
- **Seven of the twelve skill-ladder articles were not opened** — the two worked-example tracks are represented by one article (`diagnose-issues-in-a-copilot-generated-draft`) only.
- **`copilot.com` renders as a client-side app.** Body text was retrieved, but the accordion answers and any below-fold content may be incomplete, and the `Plans and Pricing` destination was not followed.
- **Accessibility findings are from server HTML only.** The `javascript:void(0)` skip link, table header semantics, and alt-text duplication were read from markup; actual screen-reader behaviour, focus order, and contrast were not tested.
- **The `Study and learn` / `Guided Learning` contradiction and the two-web-address defect were captured on 2026-09-22 and may be resolved quickly** — both look like migration lag rather than settled decisions. Re-verify before citing as precedent.
- **Mobile and desktop app strings are out of scope** entirely.

## Sources

1. https://support.microsoft.com/en-us/microsoft-365-copilot/ (reached via `https://support.microsoft.com/en-us/microsoft-copilot`, 302)
2. https://support.microsoft.com/en-us/microsoft-copilot/conversation-modes-in-microsoft-copilot
3. https://support.microsoft.com/en-us/microsoft-365-copilot/diagnose-copilot-output
4. https://support.microsoft.com/en-us/microsoft-365-copilot/iterate-copilot-output
5. https://support.microsoft.com/en-us/microsoft-365-copilot/evaluate-copilot-output-for-clarity-accuracy-tone-and-coverage
6. https://support.microsoft.com/en-us/microsoft-365-copilot/validate-copilot-output
7. https://support.microsoft.com/en-us/microsoft-365-copilot/decide-when-copilot-or-an-agent-is-the-right-tool-for-your-work
8. https://support.microsoft.com/en-us/microsoft-365-copilot/design-copilot-boundaries-and-checkpoints
9. https://support.microsoft.com/en-us/microsoft-365-copilot/diagnose-issues-in-a-copilot-generated-draft
10. https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot
11. https://support.microsoft.com/en-us/microsoft-365-copilot/write-a-great-prompt-in-microsoft-365-copilot
12. https://support.microsoft.com/en-us/microsoft-365-copilot/what-is-microsoft-copilot-app (reached via `…/what-is-the-microsoft-365-copilot-app`, 302)
13. https://support.microsoft.com/en-us/privacy/microsoft-copilot/overview
14. https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls
15. https://support.microsoft.com/en-us/privacy/microsoft-copilot/young-people
16. https://support.microsoft.com/en-us/privacy/microsoft-copilot/transparency-note
17. https://support.microsoft.com/en-us/microsoft-copilot/supported-regions-and-languages-in-microsoft-copilot
18. https://copilot.com/
