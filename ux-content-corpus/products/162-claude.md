# 162. Claude

> Harvested on the same terms as every other product in this batch. This file
> was produced inside a Claude product; that is a reason for more scrutiny, not
> less. Defects are recorded at the same threshold applied to 161, 163, 164 and 165.

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | General-purpose LLM assistant / agentic work assistant (task hand-off, file production, connectors) |
| Primary URL | https://claude.ai/ (marketing served from https://claude.com/, corporate from https://www.anthropic.com/) |
| Corpus rank | 162 |
| Benchmark strength (source list) | Capability framing and project states |
| Locale / market observed | en (footer language selector offers English, 日本語, Deutsch, Français, 한국어, Italiano, Español; help centre adds Bahasa Indonesia, Português, Pусский, 简体中文, 繁體中文) |
| Platform observed | Web (marketing, pricing), help centre, legal |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | No sector regulator applies to the consumer product. Self-imposed regime visible in copy: a `HIPAA-ready offering` and BAA references on Enterprise; GDPR/DPA and an EU designated point of contact; EEA/UK 14-day withdrawal right; Australian DIS Standard reporting; NCMEC-equivalent commitment to report CSAM to authorities; `Responsible Scaling Policy` and `Claude's Constitution` published as governance artefacts |
| Harvest date | 2026-09-22 |
| Pages inspected | 8 reachable, 1 blocked |
| Harvest completeness | Partial — all in-product strings are `[documented]` from help prose or from marketing demo mock-ups; `anthropic.com/pricing` returned an empty body; status page, accessibility statement and most of the ~30 help collections unharvested |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Product overview | https://claude.com/product/overview | `anthropic.com/claude` 301s here. Hero, two numbered benefit sets, seven role tabs, ~18 scripted task demos, capability library, 8-question FAQ |
| Pricing | https://claude.com/pricing | Three individual plans, Team, Enterprise, two ~40-row comparison matrices, current + legacy model cards, 3-tab FAQ |
| Usage Policy (AUP) | https://www.anthropic.com/legal/aup | Effective 2025-09-15. Twelve `Do Not` standards, High-Risk Use Case Requirements, Additional Use Case Guidelines. **Served `noindex, nofollow`** |
| Usage limit best practices | https://support.claude.com/en/articles/9797557-usage-limit-best-practices | Eight numbered practices; the only page stating the five-hour session model in operational detail |
| Help collection: Troubleshooting | https://support.claude.com/en/collections/18032037-troubleshooting | Four articles. Two of them are hallucination articles |
| Claude is providing incorrect or misleading responses. What's going on? | https://support.claude.com/en/articles/8525154-… | The core accuracy article. Dated March 16, 2026 |
| Claude is producing links that don't work and falsely claiming that it has sent emails or produced external documents. What's going on? | https://support.claude.com/en/articles/8241188-… | Capability-hallucination article. Dated March 16, 2026 |
| Help collection: Privacy and legal | https://support.claude.com/en/collections/4078534-privacy-and-legal | 25 article titles |
| Help centre global sidebar | (rendered on every `support.claude.com` page) | ~30-node collection tree — the primary T11 artefact |
| Anthropic pricing | https://www.anthropic.com/pricing | **Blocked** — 200 with an empty body |

---

## T1 Navigation & IA labels

**Global nav — four items, deeply nested** `[observed]`

`Product` · `Developers` · `Enterprise` · `Resources`, plus `Login`, `Contact sales`, `Try Claude`.

Four labels is admirably restrained. What sits underneath is not: `Product` alone expands to **five sub-groupings** — `Products`, `Specialized`, `Capabilities`, `Extensions`, `Models` — holding 15 links, plus two standalone actions (`Import to Claude`, `Download apps`) and a third (`Login`). Twelve of those 15 links begin with the word "Claude".

| Sub-grouping | Items |
|---|---|
| `Products` | `Claude` · `Claude Code` · `@Claude` |
| `Specialized` | `Claude Security` · `Claude Science` |
| `Capabilities` | `Artifacts` · `Design` · `Connectors` · `Plugins` · `Skills` |
| `Extensions` | `Claude for Chrome` · `Claude for Microsoft 365` |
| `Models` | `Mythos` · `Fable` · `Opus` · `Sonnet` · `Haiku` |

Three observations. First, `Claude` appears as a child of `Products` under a parent nav item called `Product` — the brand is a sibling of its own sub-products, so the top-level entity has no distinct label. Second, `Capabilities` is the only grouping whose items drop the brand prefix, which makes `Design` and `Skills` read as generic nouns in a list of proper nouns. Third, **`Claude for Chrome` in the nav is `Claude in Chrome` everywhere else** — in the footer, in the capability library, in the help-centre sidebar, and in the pricing comparison table. One product, two prepositions, and the nav is the odd one out.

**Footer — 12 columns, and it renders twice** `[observed]`

`Products` · `Capabilities` · `Extensions` · `Models` · `Enterprise` · `Departments` · `Industries` · `Programs` · `Developers` · `Platform` · `Resources` · `Help and security` · `Company` · `Terms and policies`.

`Help and security` is a good grouping decision — `Availability`, `Check files`, `Regional compliance`, `Report abuse`, `Security and compliance`, `Status`, `Support center` in one place, with `Status` and `Report abuse` as first-class links (the same move Wise makes with `Service status`). `Check files` is an unexplained label: a bare imperative with no object, giving no indication that it is (presumably) a file-provenance tool.

**Defect:** on the pricing page the entire 12-column footer is emitted **twice** in the served markup, with the copyright line appearing both before and after the first copy. Flagged as suspected responsive duplication rather than confirmed, but a screen-reader user may traverse ~120 footer links twice.

**Help-centre sidebar — ~30 nodes, three levels, no visual separation of levels** `[observed]`

Top-level product groupings carry icons: `Claude`, `Pro and Max plans`, `Team and Enterprise plans`, `Identity management (SSO, JIT, SCIM)`, `Claude Cowork`, `Claude Code`, `Claude Desktop`, `Claude Mobile apps`, `Claude API and Console`, `Connectors`, `Claude in Chrome`, `Claude for Education`, `Privacy and legal`, `Safeguards`, `Amazon Bedrock`, `Claude for Government`.

Under `Claude`: `Account management` · `Conversation management` · `Features and capabilities` · `Personalization and settings` · `Troubleshooting` · `Usage and limits`.

This is a clean, activity-named set — six gerund-or-noun phrases that map to what a user is trying to do, closely comparable to Wise's six topics. `Conversation management` and `Usage and limits` in particular name things the user genuinely thinks about.

The problems are at the seams. **`Troubleshooting` appears three times in one sidebar** — as a child of `Claude`, as `Troubleshooting by identity provider` under Identity management, and as `API troubleshooting` under Claude API and Console. **`Get started` appears under `Team and Enterprise plans` only**, so the phrase that should route a new consumer routes an admin instead. And `Claude Cowork` is a top-level collection in a help centre reached from a site whose live banner reads `Claude Cowork is now just Claude.`

**Page-level affordances built for machines** `[observed]`

Both marketing pages carry, under a heading `Explore here`: `Ask questions about this page` and `Copy as markdown`. Every help article carries `Copy for LLM`. This is a genuinely new content pattern — **the page offering a machine-readable version of itself as a first-class UI affordance** — and it is the most forward-looking thing in this file. Note the label inconsistency across the two surfaces for the same idea (`Copy as markdown` vs `Copy for LLM`), and that neither is explained anywhere.

## T2 Value proposition & headline patterns

**PRIORITY SECTION.** Claude's capability framing is the strongest part of its public content and the one place where it clearly outperforms the other four products in this batch — but it also contains the file's sharpest overclaim.

**Hero** `[observed]`

> Headline: `Give Claude more`
> Subhead: "Hand Claude a task, not just a question. Tackle routines, tangled ideas, and big projects."

The headline is an imperative addressed to the user about the product's *capacity*, which is unusual and slightly opaque on its own — "more" has no antecedent until the subhead supplies it. The subhead does the real work with a **contrastive definition**: `a task, not just a question`. One clause repositions the entire category. "Tangled ideas" is the good word in the sentence — a concrete, unglamorous description of the actual input.

The headline is also a three-word imperative with no full stop, sitting above a subhead with two full stops. Minor, but the punctuation discipline is inconsistent within a four-line unit.

**First numbered set — 01/02/03, verb-first, each naming a user gain** `[observed]`

| # | Heading | Body opening |
|---|---|---|
| 01 | `Take tasks off your desk` | "Ask Claude for more than an answer: mine data, pull information together, or make a first draft. Get time back to make a call." |
| 02 | `Turn ideas into something real` | "Bring in a half-formed idea and get back a polished deck, working prototype, financial model, or draft you can edit and put your name on." |
| 03 | `Extend what you can do` | "Build on your ideas, clarify problems, uncover insights, expand logic, and take on work you couldn't get to before." |

01 and 02 are strong: both end on the human's residual role (`make a call`, `put your name on`), which is a deliberate and repeated move — the capability claim closes by handing authority back. 03 is the weak one: five abstract verb phrases in a row (`Build on`, `clarify`, `uncover`, `expand logic`, `take on`) with no object a reader can picture. `expand logic` in particular is not a thing anyone says.

**Second numbered set — 01/02/03, second person, each a reassurance** `[observed]`

| # | Heading | Body |
|---|---|---|
| 01 | `You don't need the right words` | "Say what you need, like you'd tell a colleague. Claude works out the steps, flags when it needs your attention, and hands back the file." |
| 02 | `You have control and the final say` | "In Word and Excel, changes show as tracked edits or highlighted cells so you review. Claude cites sources and asks before it acts, if you prefer." |
| 03 | `You don't start over` (rendered `You don't need to start over`) | "Claude keeps context, projects, and preferences, repeats a saved skill your way, and runs a scheduled task without being asked." |

Two of three headings are **negations of a user fear** (`You don't need the right words`, `You don't need to start over`). Naming the anxiety and cancelling it is a good pattern for a product whose interface is an empty box, and it is more honest than the usual "powerful and intuitive" framing. 01 directly addresses the prompt-engineering barrier that ChatGPT and Copilot instead address with *training curricula* (see 161 T4 and 165 T4) — Claude's answer to the same problem is to claim the barrier does not exist. Which of those is more honest is exactly the question a content designer should sit with.

**02 is where the overclaim is.** "Claude cites sources and asks before it acts, if you prefer" bundles two very different commitments into one sentence and then attaches a single trailing conditional to both. Read strictly, `if you prefer` modifies only the asking. Read naturally, it hangs over the citing too. Either way, **"Claude cites sources" is stated flatly on the marketing page while the help centre states that Claude may produce citations that are not grounded in fact** ("Claude can display quotes that may look authoritative or sound convincing, but are not grounded in fact" — see T10). The strongest sentence about reliability on the marketing site and the correction to it in the help centre are never brought into contact. That is the same structural failure recorded against Gemini in 164, and it deserves the same weight here.

`Claude keeps context, projects, and preferences` in 03 is also unhedged, on a page whose own pricing table shows `Memory` availability and behaviour varying by plan.

**Role tabs — seven audiences, each with a six-word scope line** `[observed]`

| Tab | Scope line |
|---|---|
| `Everyone` | "Hand off a task of any size." |
| `Marketing` | "Share an idea, get a draft back." |
| `Sales` | "More time with customers." |
| `Finance` | "Review more, reconcile less." |
| `Human resources` | "Focus on people, not ops." |
| `Legal` | "Claude drafts, you decide." |
| `Product` | "Less digging, more decisions." |

This is the best-constructed unit on the site. Four of the seven are **antithetical pairs** built on the same frame (`Review more, reconcile less`, `Focus on people, not ops`, `Claude drafts, you decide`, `Less digging, more decisions`) — a comparative or contrast in four or five words, no adjectives, no product nouns. `Sales` breaks the frame (`More time with customers` is a benefit, not a contrast) and `Everyone` is necessarily generic.

`Claude drafts, you decide.` is the single most quotable string in this file: three words of division of labour, in the highest-stakes department on the list, with the human as the subject of the second clause. Compare it against 02's `You have control and the final say` — same idea, half the words, and the role tab wins.

**Section headers** `[observed]`: `Put Claude to work` · `Change the way you work` · `See what Claude can do` · `Don't know where to start? Ask Claude.`

The last is the interesting one — a header that answers its own question by routing the user back into the product. It is an honest response to a blank-box product, and it is also a small abdication: the marketing page declines to answer "what is this for" and delegates to the thing being sold.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try Claude` | Global nav, hero, all three individual plan cards | Used **five-plus times on the pricing page alone**, on cards for three different plans, each to a different `?plan=` URL |
| `Login` | Nav | |
| `Login (opens in new tab)` | Product submenu | Accessible-name convention leaking into the visible label |
| `Contact sales` | Nav, Enterprise submenu, pricing, FAQ | |
| `Download for macOS` | Hero secondary | Platform-specific primary-adjacent CTA |
| `Download apps` | Product submenu | Plural |
| `Download app` | Footer | Singular. **Two labels for one destination** |
| `Import to Claude` | Product submenu | Links to `/import-memory` — label and destination disagree in specificity |
| `Try it in Claude` | Under every scripted task demo (~18 instances) | Each carries the demo prompt pre-filled in the URL |
| `Modify prompt` | Beside `Try it in Claude` on demo replays | |
| `Replay` | Demo controls | |
| `See all capabilities` | Capability library | Anchor link, not a page |
| `Ask Claude` | Page-foot CTA | Terminal CTA is a conversation, not a signup |
| `Get Team plan` / `Get Enterprise plan` | Pricing | `Get <plan>` pattern — inconsistent with `Try Claude` on the individual cards |
| `Create plan` | Team/Enterprise comparison-table headers | **Third label** for the same action as `Get Team plan` |
| `Chat with buying specialist` | Enterprise card | Human contact named by role, not by department |
| `Start building (opens in new tab)` | API model cards | |
| `Explore detailed pricing (opens in new tab)` | API model cards | Specific, not `Learn more` |
| `Learn more` | Batch processing, service tiers, legacy models, data residency, fast mode, prompt caching | **Six-plus bare `Learn more` links on the pricing page**, all to different destinations |
| `Read what changed (opens in new tab)` | Cowork rename banner | Good — names the payload |
| `Ask questions about this page` | Both marketing pages | |
| `Copy as markdown` | Both marketing pages | |
| `Copy for LLM` | Every help article | Third label for a closely related idea |
| `More information` | ~12 pricing-table feature names | Concatenates to the feature with no separator: `Create ArtifactsMore information`, `Incognito chatsMore information`, `Model trainingMore information` |
| `Skip to main content` | First in DOM on claude.com and anthropic.com | Present. **The help centre uses `Skip to main content` to `#docs-main`** — also present |
| `Cancel` | Settings > Billing | `[documented]` |
| `Get help` | In-app menu | `[documented]` — "open Get help from the menu, start a message, and choose Claude Refund Request" |
| `Claude Refund Request` | Support-flow option | `[documented]` — a named, self-service eligibility check for refunds |
| `report issues` thumbs down button | Named in the AUP | `[documented]` |
| `Disappointed Reaction` / `Neutral Reaction` / `Smiley Reaction` | Help-article feedback control | **Accessible names read as UI-internal descriptors**, not as actions or ratings |

**Observations.** `Try Claude` is doing too much: as the nav CTA it means "start using the product", and as the Free/Pro/Max card CTA it means "buy this specific plan". Three cards with identical button text differing only by an invisible query parameter is a real usability problem on a page whose entire job is plan selection — and it sits beside `Get Team plan`, proving the `Get <plan>` pattern was available and simply not applied to the individual tier.

`Learn more` appears at least six times bare on the pricing page. The API section does better (`Explore detailed pricing`, `Start building`), so the discipline exists on the same page and is unevenly applied.

`Chat with buying specialist` is worth stealing. It names a human by function in a place where most products write `Contact sales`, and "buying specialist" positions the person as the buyer's helper rather than the seller's agent. It is also missing an article ("a buying specialist"), which reads as a truncation rather than a style choice.

## T4 Onboarding & getting-started

`[observed]` for the marketing surface, `[documented]` for the product.

**There is no numbered how-it-works sequence.** In its place Claude ships roughly **18 scripted task demos**, each a four-part unit:

1. A verbatim user prompt, written in plausible workplace register — "Roll the H2 budget with the new headcount plan.", "I've got a call with Meridian at 2 and I know nothing about it.", "The Northfield MSA came back. Check it against our playbook and mark it up.", "Put together the QBR for Northfield."
2. A model badge: `Opus High`
3. A one-line statement of approach, then tool-by-tool steps
4. `Try it in Claude` with the prompt pre-filled

This is the most distinctive onboarding content in the batch and it substitutes **demonstration of register** for instruction. Where ChatGPT and Copilot teach prompt-craft in help articles, Claude shows ~18 prompts of varying length — from four words ("Put together the QBR for Northfield.") to 55 — and lets the user infer the range. The pre-filled `Try it in Claude` link converts the demo into the user's first prompt, which collapses the gap between example and attempt.

**Three demos contain a clarifying question from the model, and these are the best content on the site** `[observed]`:

> "There are two headcount plans in the folder — v3 is newer, but v2 still carries the contractor lines. Which is the plan of record?"
> "There are three Meridians in the CRM — the health one has a meeting on your calendar today. Want the whole account history, or just what's changed since the last call?"
> "Q2 just closed — that one, or the quarter in flight? And is this for their exec team or ours?"

Each states the ambiguity it found, supplies the evidence, and offers a bounded choice. None apologises. None says "I'm not sure". The construction — *observation em-dash discriminating detail, then a two-option question* — is directly reusable for any system that must disambiguate before acting. It also does capability framing by implication: a product that shows itself asking looks more reliable than one that shows itself answering.

Marketing **advertising the model's clarifying questions as a feature** is a notable inversion. Most products hide the fact that the system needed to ask.

**The pre-action reasoning lines are a second inventory worth recording** `[observed]`, all gerund-initial, all stating a decision made *before* the work:

`Splitting decisions from action items first` · `Matching themes to roadmap items before counting` · `Reading the brand guidelines before designing anything` · `Reading the cases before citing them, not the other way round` · `Deciding which moves clear the 10% bar` · `Working out which increases sit above guideline` · `Two exports, two different shapes — mapping them first` · `Sorting replies from chatter before counting anything` · `Chronology first — the questions fall out of the timeline` · `Checking this week against last before charting` · `Separating the price beat from the volume story` · `v2 differs from v1 in nine places — six of them substantive`

`Reading the cases before citing them, not the other way round` is a direct, unmistakable reference to lawyers sanctioned for filing AI-fabricated citations. Putting that joke — and it is a joke — on the legal role tab is a confident piece of writing and a form of disclosure: it concedes the failure mode by naming the correct order.

**The receipts pattern.** Demo output lines quantify and disclose restraint: `Draft 11 field updates, nothing saved` · `Re-phase H2, flag every cell I touched` · `Flag seven rows, hold four decisions` · `Mark seven changes, three leveling, four fairness` · `Redline four clauses, flag two the playbook doesn't cover` · `Convert EMEA at the July average, 1.088` · `Pull the cases, verify all three citations` · `Read 128 messages in #feedback, Aug 24–30`.

Three of these name **what was deliberately not done** (`nothing saved`, `hold four decisions`, `flag two the playbook doesn't cover`). `Convert EMEA at the July average, 1.088` exposes the assumption with its value, so the user can challenge the number rather than the result. This is the clearest articulation in the batch of what agentic-AI status copy should do: report the scope, the assumptions, and the abstentions.

**Caveat:** every string in this section is **marketing mock-up**, not observed product output. It is aspirational copy describing an intended behaviour. It is recorded here because the *writing* is the artefact of interest, but nothing here evidences that the product behaves this way.

## T5 Form & field labels

`[absent]` for observed pre-auth forms — there is no calculator, no quote form, no gated field on any harvested page. Settings paths quoted in help and FAQ prose `[documented]`:

| Label | Source | Note |
|---|---|---|
| `Settings > Usage` | Usage-limit article, pricing FAQ | Consistent `>` glyph across both |
| `Settings > Billing` | Cancellation FAQ | |
| `Organization settings > Billing` | Team/Enterprise cancellation | |
| `Billing > Manage subscription` | App-store cancellation path | |
| `Plan usage limits` | Usage settings section heading | |
| `Current session` | Usage meter label | "How much of your plan's five-hour session limit you've used thus far, plus the amount of time remaining in the session." |
| `Weekly limits` | Usage meter label | |
| `Usage credits` | Usage settings | |
| `Incognito chats` | Pricing matrix feature | |
| `User preferences` / `Instructions for Claude` | Pricing matrix / capability library | **Two labels for the same setting** — the capability library links `Instructions for Claude` to an article titled "Understanding Claude's personalization features" |
| `Set org instructions` | Team/Enterprise matrix | |
| `Restrict org creation` / `Migrate accounts using your domains` | Admin matrix | Verb-first admin controls |

The Usage settings vocabulary is the strongest of these. `Current session` and `Weekly limits` as the two top-level meters, with the session meter reporting **both consumption and time remaining**, is the right shape: a limit the user cannot count needs a clock as well as a bar.

## T6 Status & state language

**PRIORITY-ADJACENT** — "project states" is half of this product's flagged strength, and it is the weakest-evidenced claim in the file.

**Project states are `[absent]` from public surfaces.** `Projects` appears as a nav-adjacent capability, a pricing-matrix row (`Projects | Up to 5 | Yes | Yes | Yes`), a capability-library entry ("Keep context, instructions, and files organized by project"), and an article title (`What are projects?`, not opened). **No project state name — no active/archived/shared/draft vocabulary — is published anywhere reachable.** The benchmark strength attributed to this product is, on the public record, unevidenced. An authenticated pass is required.

What *is* observable is a different and more interesting state system.

**Usage states** `[observed]`, and unusually well-specified:

- The unit is a `rolling five-hour session window`, with `weekly limits` layered on paid plans.
- The pooling is stated: "Your activity across Claude on web, desktop, mobile, and Claude Code all draws from the same pool."
- The refusal to quantify is stated as a consequence, not an evasion: "How much you can do depends on the length and complexity of your conversations, the model you choose, and the features you use, so **there's no fixed message count**."
- Seven consumption factors are enumerated (`Message length`, `File attachment size`, `Current conversation length`, `Tool usage (e.g., Research, web search)`, `Model choice`, `Effort level`, `Artifact creation and usage`, plus multi-step tasks).
- Three exits are named in order of cost: "you can wait for it to reset, move to a higher plan, or, on paid plans, turn on usage credits to keep working at standard API rates."

Explaining *why* a limit cannot be expressed as a number, then listing the variables that move it, then naming the three ways out — is the right answer to the hardest disclosure problem in this category. Compare ChatGPT, which publishes multipliers against an undefined baseline and no factor list.

**Effort level is a state, and it is undocumented.** The badge `Opus High` recurs on every marketing demo. `Effort level` appears in the usage article as a consumption factor. Neither the pricing page, the capability library, nor any harvested page explains what `High` is, what the other levels are called, or where the control lives. A user-visible state name shipped in marketing with no public glossary entry.

**Model-persona change is treated as a state transition** `[documented]`: `Adapt to new model personas after deprecations` sits in the four-article Troubleshooting collection. Filing "the model's personality changed" as a *troubleshooting* topic — alongside error messages and hallucinations — is a real editorial judgement: it classifies persona drift as a fault condition the user needs help recovering from, not as a release note. (ChatGPT ships the same content with the opposite framing, as an empathy article; see 161 T14.)

**Cache state is exposed to the user** `[documented]`: "Caches expire after a period of inactivity. If you come back to a project after a long break, your first message counts that content in full again." An infrastructure state with a direct billing consequence, disclosed in plain language. Most products would never mention it.

## T7 Error, failure & recovery

`[documented]` only — no error string is observable pre-auth.

**The Troubleshooting collection is four articles**, and the composition is the finding:

| Article |
|---|
| `Troubleshoot Claude error messages` |
| `Claude is providing incorrect or misleading responses. What's going on?` |
| `Claude is producing links that don't work and falsely claiming that it has sent emails or produced external documents. What's going on?` |
| `Adapt to new model personas after deprecations` |

**Two of the four articles in the entire troubleshooting category are about the model being wrong.** Not the app failing — the model. Classifying hallucination as troubleshooting rather than as a disclaimer, an FAQ, or a policy footnote is the most consequential IA decision in this file, and the right one: it puts the content where a user goes when something has gone wrong, which is where they will be.

**The title grammar is `<Product> is <doing bad thing>. What's going on?`** — third person about the product, present continuous, followed by a four-word question. This is a fourth shape, distinct from Wise's first-person confession (`I sent the wrong amount`), from ChatGPT's `Why …?`, and from the neutral gerund. It works because the user's complaint *is* about the product, not about their own mistake, so first person would misassign blame and `Why …?` would presume the user already knows what happened. The construction lets the user recognise their symptom in the title and hands them a question that matches their tone.

It is also long. The second title runs 23 words and wraps to three lines in the collection list. Findability is bought at the cost of scannability.

**Error-message vocabulary is `[absent]`** — `Troubleshoot Claude error messages` was not opened, and no error string is quoted on any harvested page. One error string does appear, twice, as a Privacy-and-legal article title: `Why am I receiving an 'Output blocked by content filtering policy' error?` — a system-voice string ("Output blocked by content filtering policy") with no explanation, no next step, and no user-facing rewrite. It reads as a log line surfaced to a person.

**Two defects in this area:**

1. **The same article title appears twice in the Privacy and legal collection** with two different article IDs (`9205721` and `10023638`). One collection page, one title, listed twice. Whichever is stale, a user searching that error string finds two results and cannot tell them apart.
2. **The contact email on the hallucination article is broken in the served HTML.** The sentence "write to us at …" renders the address as the literal placeholder text `[email protected]` with a Cloudflare `cdn-cgi/l/email-protection` href. The single article a frustrated user is most likely to reach, on the single subject most likely to frustrate them, has no working contact address for a reader who does not have JavaScript running. Recorded as observed.

## T8 Empty states

`[absent]`. No no-data, no-results, first-run or caught-up copy is reachable on any public surface. The help centre's search is a `⌘K` command-palette trigger that was not exercised. `Projects | Up to 5` implies a project-list state that could not be observed.

## T9 Notifications & system messages

`[documented]` and `[observed]`, thinly.

**Site banner** `[observed]`, present on both marketing pages under the label `Latest news`:

> `Claude Cowork is now just Claude.`
> "Rolling out to Pro and Max, with more plans to follow."
> `Read what changed (opens in new tab)`

Three-part structure — the change, the rollout scope, a named link to detail. `is now just Claude` uses `just` to signal simplification rather than loss, which is the correct read on a consolidation. `with more plans to follow` is honest about partial availability. This is a well-built rename notice, and it is undercut by the rename being incomplete everywhere else (see T13).

**Scheduled-task confirmations** `[observed]` in the demos, and the phrasing is excellent: `Now standing: after every meeting this week` · `Now standing: Mondays before stand-up`. `Now standing` as a state label for a recurring instruction is a real coinage — two words, no jargon, conveys both "this is active" and "this will keep happening". It does not appear in the capability library, the pricing table, or any help title, so it exists only in marketing mock-ups.

**Email is named as a channel** `[documented]`: refund and cancellation flows route through in-app support; `Official Anthropic marketing email addresses` exists as a help article, which is an anti-phishing artefact rather than a notification explainer. There is **no public notification-model article** — nothing equivalent to Wise's "How do you notify me about a transfer?".

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.**

### Accuracy / hallucination wording — `[documented]`, the most direct in this batch

Claude publishes the plainest statement of model unreliability of the five products harvested, and it publishes it as help content rather than as legal text.

From `Claude is providing incorrect or misleading responses. What's going on?` (dated March 16, 2026):

> "In an attempt to be a helpful assistant, Claude can occasionally produce responses that are incorrect or misleading."
> "This is known as 'hallucinating' information, and it's a byproduct of some of the current limitations of frontier Generative AI models, like Claude."
> "Claude can display quotes that may look authoritative or sound convincing, but are not grounded in fact."
> "In other words, Claude can write things that might look correct but are very mistaken."
> "Users should not rely on Claude as a singular source of truth and should carefully scrutinize any high-stakes advice given by Claude."

Five things this does well. It **names the mechanism in the user's vocabulary** and puts the term in quotes on first use, teaching it rather than assuming it. It **attributes the failure to helpfulness** ("In an attempt to be a helpful assistant"), which explains why the output is confident rather than hedged — the most useful thing a user can understand about hallucination. It gives a **concrete failure instance** (authoritative-looking quotes) rather than a general caveat. It **restates in plainer words** ("In other words…"), a rare and generous move. And it **scales the obligation to the stakes** — not "always verify everything", which users ignore, but "carefully scrutinize any **high-stakes** advice".

A second paragraph extends this to cited search results and gives a non-obvious reason to click through: "Original websites may contain important context or details not included in Claude's synthesis. Additionally, the quality of Claude's responses depends on the underlying sources it references." That is a better argument for checking sources than "sources may be wrong", because it identifies *omission* as the failure mode, not just error.

The sibling article does the same job for capability hallucination: "Claude can sometimes hallucinate its capabilities. Even if it claims otherwise, Claude does not have access to other tools or software that are not explicitly integrated." `Even if it claims otherwise` is the load-bearing clause — it pre-empts the user believing the model over the documentation.

**Four criticisms, all real.**

1. **The disclosure is unlinked from the claim.** The marketing page says "Claude cites sources" without qualification (T2); the help centre says citations may not be grounded in fact. Neither page references the other. A user reading claude.com has no route to this article.
2. **The word "hallucination" never appears on the marketing site, the pricing page or the AUP.** It is confined to two help articles filed under Troubleshooting, reachable only by a user who already suspects a problem.
3. **The cross-link in the second article points at the old domain** (`support.anthropic.com/en/articles/8525154-…`) while the article itself is served from `support.claude.com`. The two hallucination articles are on different domains as far as the markup is concerned.
4. **The contact route in it is broken** (see T7).

### Data use and model training — `[observed]`, clear and tier-differentiated

The pricing comparison matrices carry a `Model training` row in the `Models and usage` section:

| Plan | Value |
|---|---|
| Free / Pro / Max 5x / Max 20x | `Opt-out` |
| Team / Enterprise (self-serve) / Enterprise (sales-assisted) | `None by default` |

Two-word values, in the grid, at feature weight — the same good decision ChatGPT makes. `None by default` is a better construction than "we don't train on your data" because it is precisely scoped: none, unless something changes it.

`Opt-out` as the consumer value is doing a lot of compression. It states the control exists without stating the default, and a reader unfamiliar with the term could plausibly read "Opt-out" as "you are opted out". The `More information` affordance beside it is the only remediation, and its label concatenates to the row name in the served markup (`Model trainingMore information`).

Related help titles `[documented]`: `Can I use my Outputs to train an AI model?` (the reciprocal question, from the user's side) and `Does Anthropic crawl data from the web, and how can site owners block the crawler?` — publisher-facing disclosure in a consumer help centre, and the only publisher-relations content located for this product. `How Claude marks AI-generated content` is the provenance article.

### Usage limits — `[observed]` and `[documented]`

- Pricing-page footnote, repeated verbatim under both the individual and the Team/Enterprise blocks: "Usage limits apply. Prices shown don't include applicable tax. **Price and plans are subject to change at Anthropic's discretion.**"
- Pro: `More usage*`. Max: `Choose 5x or 20x more usage than Pro*`. Both asterisked. **The asterisk's footnote is not present in the served text of either block** — the only footnotes are the "Usage limits apply" lines, which do not explain the multiplier baseline. Flagged as a suspected missing footnote.
- The FAQ discloses discretionary throttling explicitly: "To manage capacity and make sure all users have fair access, **we may limit your usage in other ways, such as weekly and monthly caps or model and feature usage, at our discretion.**" Publishing the reserved right to impose *undisclosed* additional limits is unusually candid and unusually unhelpful at the same time — the honesty is real, and its practical effect is that no stated limit is load-bearing.
- The `Fable` row reads `Usage credits` (Pro) and `50% of weekly limits*` (Max 5x, Max 20x) and `50% of weekly limits* on premium seats` (Team) — a percentage of a limit that is itself never stated numerically.

### Billing, refunds and cancellation — `[observed]`, thorough

- Refunds lead with the negative: "Payments are generally non-refundable, except where our Consumer Terms of Service say otherwise or where local law requires it."
- The route is a **named self-service eligibility check**: "open Get help from the menu, start a message, and choose `Claude Refund Request` to check your eligibility." Naming the flow, rather than "contact support", is good.
- Store purchases are disclaimed to the store: "If you subscribed through the App Store, Apple handles the refund, so you'll request it from Apple." Causal `so` makes the handoff legible rather than obstructive.
- EEA/UK withdrawal right stated as an in-app entitlement: "If you're in the European Economic Area and the United Kingdom, and within your 14-day withdrawal period, you can request a refund directly in the app." A jurisdictional right surfaced as a product affordance rather than a legal footnote.
- Cancellation gives the **operative deadline, not just the policy**: "To avoid the next charge, cancel at least 24 hours before your renewal date."
- And the reassurance most cancellation copy omits: "**Canceling doesn't delete your data.** Your chats, projects, and files stay with your account, though some features aren't available on the Free plan."

That last pair — data survives, features do not — answers the actual fear in two clauses. It is the best cancellation copy in this batch.

### Acceptable use — `[observed]`

The AUP (effective 2025-09-15) is structured in three tiers: `Universal Usage Standards`, `High-Risk Use Case Requirements`, `Additional Use Case Guidelines`.

Twelve universal standards, every one an imperative negation beginning `Do Not`:

`Do Not Violate Applicable Laws or Engage in Illegal Activity` · `Do Not Compromise Critical Infrastructure` · `Do Not Compromise Computer or Network Systems` · `Do Not Develop or Design Weapons` · `Do Not Incite Violence or Hateful Behavior` · `Do Not Compromise Privacy or Identity Rights` · `Do Not Compromise Children's Safety` · `Do Not Create Psychologically or Emotionally Harmful Content` · `Do Not Create or Spread Misinformation` · `Do Not Undermine Democratic Processes or Engage in Targeted Campaign Activities` · `Do Not Use for Criminal Justice, Censorship, Surveillance, or Prohibited Law Enforcement Purposes` · `Do Not Engage in Fraudulent, Abusive, or Predatory Practices` · `Do Not Abuse our Platform` · `Do Not Generate Sexually Explicit Content`

Every heading is a prohibition, title-cased, and each is followed by the identical stem "This includes using our products or services to:". The consistency is total, and it is the exact opposite of OpenAI's four positively-framed principles (`Protect people`, `Respect privacy`, `Keep minors safe`, `Empower people`). Claude's is more precise and much harder to remember; OpenAI's is memorable and vaguer. Neither is obviously right, and the contrast is the most useful thing in this comparison.

**The High-Risk section imposes content-design obligations on the customer**, which is the most transferable thing in the document:

> **Human-in-the-loop:** "a qualified professional in that field must review the content or decision prior to dissemination or finalization. You or your organization are responsible for the accuracy and appropriateness of that information."
> **Disclosure:** "If model outputs are presented directly to individuals or consumers, you must disclose to them that you are using AI to help produce your advice, decisions, or recommendations. **This disclosure must be provided at a minimum at the beginning of each session.**"

And the general rule, applied regardless of risk: "**All consumer-facing chatbots** … must **disclose** to users that they are interacting with AI rather than a human. This disclosure must be provided at a minimum at the beginning of each chat session."

Seven high-risk categories are enumerated — `Legal`, `Healthcare`, `Insurance`, `Finance`, `Employment and housing`, `Academic testing, accreditation and admissions`, `Media or professional journalistic content` — with a carve-out written into the Healthcare entry: "Wellness advice (e.g., advice on sleep, stress, nutrition, exercise, etc.) does not fall under this category." Drawing the wellness/medical line inside the definition, with examples, saves every downstream reader a judgement call.

Enforcement is stated up front with a graduated verb set — "we may **throttle, suspend, or terminate** your access" — and a second, rarely-published mechanism: "We may also block or modify model outputs when inputs violate our Usage Policy." Disclosing that outputs may be *modified*, not merely refused, is more than most providers say.

A reporting route is given in the same breath as the policy: "If you believe that our model outputs are potentially inaccurate, biased or harmful, please notify us at usersafety@anthropic.com, or report it directly in our product through the 'report issues' thumbs down button". **This is the only place on any harvested Claude surface where an accuracy-reporting route and a plain acknowledgement that outputs may be inaccurate appear on the same page as the product's primary rules** — and it is on a page served `noindex, nofollow`.

**Defect:** the AUP carries `meta-robots: noindex, nofollow`. The document that defines the acceptable-use boundary, names the disclosure obligations, and gives the safety-reporting address is excluded from search engines. OpenAI's equivalent is served `index, follow`. Whether deliberate or an artefact of the `/legal/` template, the practical effect is that a user searching for Anthropic's usage policy will not find this page.

### Other disclosure titles `[documented]`

`What is Anthropic's policy for handling governmental requests for user information?` · `Designated point of contact for users in the EU` · `Report a concern: Australian DIS Standard compliance` · `Covered Models` · `Covered Models under a Business Associate Agreement (BAA)` · `Using Claude for Legal Work: Privilege, Confidentiality, and How to Think About Configuration` · `Claude for Teachers: your data and our terms` · `Unauthorized Anthropic stock sales and investment scams` · `Report, block, and remove content from Claude` · `Online Safety Contacts`

`Using Claude for Legal Work: Privilege, Confidentiality, and How to Think About Configuration` is the standout title: it concedes in its own subtitle that configuration is a judgement the reader must make, rather than promising a setting. `Unauthorized Anthropic stock sales and investment scams` is a help article about scams impersonating the company — trust-and-safety content aimed at non-users.

## T11 Help-centre architecture

Three levels: ~16 icon-bearing product collections → sub-collections → articles, rendered as a persistent left sidebar on every page. The `Claude` collection's six children (`Account management`, `Conversation management`, `Features and capabilities`, `Personalization and settings`, `Troubleshooting`, `Usage and limits`) are a clean activity-named set.

**What the tree gets right.** Every node is a noun phrase naming a domain the user can recognise. Plan-based collections (`Pro plan`, `Max plan`, `Team and Enterprise plans`) sit alongside surface-based ones (`Claude Desktop`, `Claude Mobile apps`, `Claude in Chrome`) and concern-based ones (`Privacy and legal`, `Safeguards`), so a user can enter by plan, by device, or by worry. `Safeguards` as a top-level user-facing collection is unusual and good.

**What it gets wrong.**

- **Three `Troubleshooting` nodes** in one sidebar (T1). A user with a problem has three plausible entry points and no disambiguation.
- **`Get started` is nested under `Team and Enterprise plans`.** The consumer has no getting-started collection.
- **`Claude Cowork` is a live top-level collection** on a help centre whose product site announces that Cowork is now Claude.
- **Two identical article titles in `Privacy and legal`** (T7).
- **The sidebar has no collapsed state in the served markup** — all ~30 nodes render on every article page, ahead of the article content in DOM order. A screen-reader user traverses the entire product tree before reaching the body of every article they open.

**Article-title grammar — five shapes:**

| Shape | Examples |
|---|---|
| `<Product> is <problem>. What's going on?` | The two hallucination articles |
| `What is X?` / `What are X?` | `What is the Pro plan` · `What is Claude's memory?` · `What are projects?` |
| `How do I …?` | `How do I view and sign your Data Processing Addendum (DPA)?` · `How do I cancel my paid Claude subscription?` |
| `Why am I receiving …?` | `Why am I receiving an 'Output blocked by content filtering policy' error?` |
| Imperative | `Manage usage credits for paid Claude plans` · `Buy usage bundles` · `Report, block, and remove content from Claude` · `Adapt to new model personas after deprecations` |

The imperative shape is the most common in newer articles and the most scannable. The `Why am I receiving …?` shape is used once, and quotes the raw system string inside the title — which is correct for findability and a tacit admission that the string was never rewritten for humans.

**Routing furniture** `[observed]`: the help header offers `API docs`, `Release notes`, and `How to get support` — human contact is named in the top-level header rather than buried, which is a deliberate inversion of the ChatGPT pattern and of Wise's (contact last, smallest). Each article ends with `Did this answer your question?` and three reaction controls.

## T12 FAQs

Two FAQ sets were harvested.

**Pricing FAQ** `[observed]` — three tabs (`Plans and usage`, `Billing and payments`, `Managing your plan`), with the first tab expanded. Seven questions visible:

| # | Question (verbatim) |
|---|---|
| 1 | What do I get with Claude Pro? |
| 2 | How is Claude Max different from Pro? |
| 3 | What are the usage limits on each plan, and what happens when I hit them? |
| 4 | Is Claude Code included in my plan? |
| 5 | How much does the Claude Enterprise plan cost? |
| 6 | Does Claude offer refunds? |
| 7 | How do I cancel my Claude subscription? |

**Structural notes.** Q3 is a **compound question** — expectation paired with consequence ("what are the limits, **and what happens when I hit them**") — the same construction Wise uses. Pairing the rule with the failure in one question is the right shape for a limit the user cannot count.

Q1 and Q2 form a **ladder**: "what do I get with the lower tier" then "how is the higher tier different", so the comparison is made once rather than twice. Q6 and Q7 put refund before cancellation, which matches the order a leaving user actually needs.

The tab labels are well chosen and are a mild misdirection: `Managing your plan` is a euphemism whose contents, judging by Q7's presence in the expanded set, include cancellation. Only the first tab's contents were in the served HTML.

**Product-overview FAQ** `[observed]` — eight questions, answers inline:

| # | Question (verbatim) |
|---|---|
| 1 | What is Claude? |
| 2 | What kind of work can I hand off? |
| 3 | What happened to Claude Cowork? |
| 4 | What apps does Claude work with? |
| 5 | What kind of files can Claude read, create, edit, and analyze? |
| 6 | Do I need the desktop app? |
| 7 | Can I assign tasks from my phone? |
| 8 | How much does Claude cost? |

Q3 (`What happened to Claude Cowork?`) is a **rename-reassurance slot** and it is well answered — the answer leads with continuity ("Everything is where you left it: your chats, projects, artifacts, connectors, and skills") before explaining the change. Q6 (`Do I need the desktop app?`) opens with "No." and then gives the case for it anyway — answering the literal question first and upselling second is the correct order.

Q1's answer contains the file's most exposed marketing claim: "Claude is more than an AI assistant: it's a helpful, intuitive, and powerful collaborator". Three adjectives in a row, none falsifiable, in an answer to "what is this". The rest of the same answer is concrete and good ("give it a goal or an outcome you want in plain language… It can produce real files like documents, spreadsheets, and slides that you review, edit, and sign off on") — the adjectives add nothing the sentences after them do not earn.

Q2's answer closes with "Not sure where to start or what it can do? **Ask Claude.**" — the second instance of the marketing page delegating its own explanatory job to the product (see T2).

## T13 Terminology & glossary

**PRIORITY SECTION.**

### Model names — five families, four different version numbers, one family with no pricing

Nav and footer list five model families: `Mythos` · `Fable` · `Opus` · `Sonnet` · `Haiku`.

Pricing page, under `Latest models`:

| Model | Positioning line |
|---|---|
| `Fable 5.1` | "Next generation intelligence for long-running agents" |
| `Opus 5.5` | "Daily driver for agentic coding and enterprise work" |
| `Sonnet 5` | "High-performance model for coding and agents" |
| `Haiku 4.5` | "Fastest, most cost-efficient model" |

Under `Legacy models`: `Opus 5` ("Ideal for complex agentic coding and enterprise work"), `Fable 5` (**no positioning line at all** — the only card in either set without one), `Opus 4.8`, `Sonnet 4.6`, `Opus 4.7`, `Opus 4.6`, `Sonnet 4.5`.

**Five findings.**

1. **`Mythos` is in the nav and the footer as a model family, with its own page, and appears nowhere else.** Not in the pricing model cards, not in the `Models and usage` comparison rows (which list `Fable`, `Opus`, `Sonnet`, `Haiku`), not in any plan bullet. A model family is navigable but unpriced and unavailable — a user who clicks `Mythos` from the nav cannot learn from the pricing page whether they can use it.

2. **Four families sit on four different version numbers simultaneously** — 5.1, 5.5, 5, 4.5 — so the number carries no cross-family meaning. `Sonnet 5` is newer than `Opus 5` but older-numbered than `Opus 5.5`; `Haiku 4.5` is current while `Sonnet 4.5` is legacy. A user cannot rank models by number, by name, or by any combination of the two without reading the positioning lines.

3. **The legacy list is ordered non-monotonically**: `Opus 5`, `Fable 5`, `Opus 4.8`, `Sonnet 4.6`, `Opus 4.7`, `Opus 4.6`, `Sonnet 4.5`. Neither chronological, nor by family, nor by price. Four Opus versions are interleaved with two Sonnets and a Fable, and 4.8 precedes 4.7 precedes 4.6 while `Sonnet 4.6` is wedged between them. Seven cards, five of which carry identical prices ($5 in / $25 out), with no distinguishing copy.

4. **The poetic-form names carry no capability ordering**, by design — `Opus`, `Sonnet`, `Haiku` do encode a rough size intuition (long form, medium, short) that is genuinely elegant and the best thing about the scheme. But `Fable` and `Mythos` break it: neither is a poetic form, neither has an evident size, and `Fable 5.1` is positioned above `Opus 5.5` in the list while `Opus 5.5` is called the "Daily driver". The metaphor worked for three names and was not extensible to five.

5. **`Opus High`** — the effort-level badge from the marketing demos — introduces a *sixth* dimension (`High`) to a name that already carries family and version, and it is undocumented anywhere public (T6).

### Plan names

| Term | Line | Notes |
|---|---|---|
| `Free` | "Try Claude" · `$0` · "Free for everyone" | The tagline `Try Claude` duplicates the CTA on the same card |
| `Pro` | "For everyday work" · `$17` per month annual ($200 up front), `$20` monthly | |
| `Max` | "For people who work with Claude all day" · `From $100` per month | Split into `Max 5x` and `Max 20x` **in the comparison table only** — the card shows one Max |
| `Team` | "For teams of 2 to 150" · `Standard seat` $20/$25 · `Premium seat` $100/$125 | Seat-type naming, "Mix and match seat types" |
| `Enterprise` | "For large businesses operating at scale" · "Seat price + usage at API rates" · US$20/seat/month | Split into `Enterprise (self-serve)` and `Enterprise (sales-assisted)` in the table only |
| `Education plan` | University-wide | Not in either comparison matrix |

**The card/table mismatch is systematic.** Three plans (`Max`, `Enterprise`, and by extension `Team`'s seat types) are presented as one thing in the card and as two in the table. `Max` is the worst case: the card says `From $100` and "Choose 5x or 20x more usage than Pro", the table has separate `Max 5x` and `Max 20x` columns, and no price is attached to either column. A user cannot determine the 20x price from this page.

`Pro` at "$17 / Per month with annual subscription discount ($200 billed up front). $20 if billed monthly." is doing the right thing — the headline figure is the effective monthly rate, and the actual charge and the alternative are both in the same sentence rather than in a footnote.

### Feature and product terminology

| Term | Note |
|---|---|
| `Claude Cowork` / `Cowork` | **Half-renamed.** Banner says it "is now just Claude"; the footer still lists `Claude Cowork` as a product; the Team plan bullet on the pricing page reads "Claude Code and Claude Cowork"; the help centre has a top-level `Claude Cowork` collection; capability-library links point to article slugs `get-started-with-claude-cowork`, `schedule-recurring-tasks-in-claude-cowork`, `let-claude-use-your-computer-in-cowork`, `use-claude-cowork-safely`; a customer quote is rendered "Cowork (now Claude)". The rename reached banners and headings and not URLs, bullets, collections or slugs — **the same pattern recorded against Perplexity (thread→Session) and Microsoft (365→Copilot) in this batch.** |
| `@Claude` / `Claude Tag` | **Two names for one product on one page.** Nav and footer say `@Claude`; the capability library says `Claude Tag` ("Work with Claude directly in Slack. Tag Claude and it gets things done."); the pricing table row is `@Claude`. Neither page glosses the other |
| `Claude for Chrome` / `Claude in Chrome` | Nav vs everywhere else (T1) |
| `Artifacts` | Coined noun, given its own capability page. Defined operationally: "Shareable, on-brand designs, slides, and documents" |
| `Skills` | "Teach Claude new skills, record them, and share with your team" — `record` is the unusual verb |
| `Plugins` / `Connectors` / `Custom connectors and MCPs` / `Desktop extensions` | Four extension nouns; `Connectors` and `Plugins` are separate nav items with separate pages |
| `Projects` | State vocabulary unpublished (T6) |
| `Memory` / `Instructions for Claude` / `User preferences` / `Import to Claude` | Four personalisation labels; `Memory` in the capability library links to `/import-memory`, which is a different feature |
| `Incognito chats` | Borrowed from browsers. Clearer than ChatGPT's `Temporary chat` for the same idea, and less accurate — the browser metaphor implies local-only |
| `Effort level` / `Opus High` | Undocumented (T6) |
| `Usage credits` / `usage bundles` / `Extra usage` | Three nouns for paying past a limit, across pricing table, FAQ and help titles |
| `Research` | Capability name; also a matrix row where `Free = No`. Distinct from `Web search`, which is a separate row where `Free = Yes`, and from `Ability to search the web`, which is a **third row on the same table also reading `Yes` for Free** |
| `Frontier intelligence` | Capability-library entry with no page and no definition — "Access to Claude's latest models" |
| `Now standing` | Scheduled-task state label, marketing-only (T9) |
| `Check files` | Footer link, no object, unexplained (T1) |
| `Claude's Constitution` | Governance artefact published as a footer link |

**`Ability to search the web`, `Web search` and `Research` are three rows in one comparison table**, the first two carrying identical values across all plans. Whether they denote different things is not determinable from the page. This is the clearest single instance of the table being assembled from multiple feature inventories without reconciliation.

### Register split

Marketing uses long forms and coinages (`Frontier intelligence`, `@Claude`, `Give Claude more`); the help centre uses plain operational nouns (`Usage and limits`, `Conversation management`). Consistent with the Wise pattern — shorter and flatter where the user is inside the task. The exception runs the wrong way: the *help centre* carries the longest strings in the file (the 23-word article title in T7).

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user. `Claude` is consistently a third-person actor with agency — "Claude works out the steps", "Claude keeps context", "Claude cites sources and asks before it acts", "Claude reads each transcript". The company is `we` in the AUP and help ("we may throttle, suspend, or terminate", "we highly value your feedback") and `Anthropic` in commercial copy ("at Anthropic's discretion", "without prior authorization from Anthropic"). As with ChatGPT, the third-person company name clusters around refusal and discretion.

The **three-way split — you / Claude / we** is used to real effect in the reliability copy: "Claude can occasionally produce responses that are incorrect or misleading" puts the product, not the company, in the subject position of the failure, while "we highly value your feedback" puts the company in the subject position of the remedy. Whether that is careful grammar or convenient grammar is a fair question, and the same construction is recorded against Gemini in 164.

**Register.** Short, plain, contraction-heavy, unornamented. **No exclamation marks and no `Oops!` anywhere in this harvest.** Em-dashes are used structurally in demo lines. The workplace-fiction register of the demos ("I've got a call with Meridian at 2 and I know nothing about it.", "Enough that I don't look unprepared.") is the most naturalistic writing in the batch — it reads as overheard rather than composed, which is the point.

**Tone gradient.** As with Wise, the tone flattens as stakes rise: colloquial in demos and role tabs, neutral in the capability library, wholly flat in the AUP and the hallucination articles. The one place the gradient inverts is the hallucination article, which opens with a mitigating clause ("In an attempt to be a helpful assistant") before the bad news — a softening at the highest-stakes moment. Defensible as explanation; readable as excuse.

**Numbers as trust devices** are used very sparingly compared with Wise. There is no user count, no uptime figure, no accuracy claim. The only numbers on the overview page are inside the fictional demos (`128 messages`, `751 eligible staff`, `187 tagged documents`, `1.088`). The absence of substantiating statistics on an AI marketing page is itself a choice, and probably the right one — but it means the page's claims rest entirely on demonstration.

**Accessibility** `[observed]`

- `Skip to main content` is first in DOM on claude.com, anthropic.com **and** the help centre (`#docs-main`). Consistent across all three surfaces — better than ChatGPT, which lacks it on its marketing domain.
- The nav submenu item is labelled `Login (opens in new tab)` with the parenthetical **in the visible link text**, and the same pattern recurs on `Read what changed (opens in new tab)`, `Start building (opens in new tab)`, `Explore detailed pricing (opens in new tab)`. Announcing new-window behaviour is correct practice; putting it in the visible label rather than an accessible name means every sighted user reads it too. Defensible, slightly clumsy, and applied inconsistently — most external links on the same pages omit it.
- **The `More information` tooltip labels concatenate to their feature names with no separator** in the served markup: `Create ArtifactsMore information`, `Incognito chatsMore information`, `Model trainingMore information`, `Claude Design, Slides, DocsMore information`, `SkillsMore information`. A screen reader encounters a single run-on string. ~12 instances across two tables.
- **Cell values concatenate the same way**: `Up to 1Mvaries by model` in the `Context window` row, on all four columns of both matrices. The qualifier and the figure are fused into one unreadable token.
- **Help-article feedback controls have UI-internal accessible names**: `Disappointed Reaction`, `Neutral Reaction`, `Smiley Reaction`. These describe the icon, not the action or the rating. A screen-reader user is told there is a "Smiley Reaction" and not that activating it rates the article as helpful.
- **The help-centre sidebar renders all ~30 collection nodes ahead of the article body in DOM order on every page**, with no collapsed state in the served markup and no landmark visible in the extracted text beyond the skip link.
- **Every sidebar collection icon is an `<img>` with empty alt** adjacent to its text link — correct practice for decoration, and consistently applied.
- Marketing images are a mixed picture. Demo and card images carry meaningful alt (`Campaign readout preview`, `Asset creation preview`, `Google Calendar`, `Slack`, `Microsoft Excel` — tool marks named by tool). But **the hero image, the three numbered-benefit images, and roughly a dozen decorative webp assets carry no alt attribute at all** in the served markup, rendering as bare `![](…)`. Empty alt (`alt=""`) and missing alt are not equivalent; missing alt causes many screen readers to announce the filename. This is a straightforward defect on the product's primary marketing page.
- Footer duplication (T1) doubles ~120 links for linear traversal on the pricing page.
- No accessibility statement was located in the footer, the help centre or the `Help and security` grouping. **`[absent]`** — and this is a gap worth naming, since the same footer finds room for `Check files`, `Regional compliance` and `Report abuse`.

**Negative findings, recorded honestly**

- `Mythos` is navigable as a model family but appears in no pricing, no plan table and no availability statement (T13).
- Four model families on four unaligned version numbers; legacy list in no discernible order; `Fable 5` shipped with no description (T13).
- `@Claude` and `Claude Tag` are two names for one product, both live (T13).
- `Claude for Chrome` (nav) vs `Claude in Chrome` (everywhere else) (T1, T13).
- The Cowork rename reached banners and headings but not footers, bullets, help collections or article slugs (T13).
- `Try Claude` is the CTA on three different plan cards, differentiated only by an invisible query parameter (T3).
- `Get Team plan` vs `Create plan` for one action on one page (T3).
- Six-plus bare `Learn more` links on the pricing page (T3).
- `Download apps` (nav) vs `Download app` (footer) (T3).
- Three `Troubleshooting` nodes and no consumer `Get started` in the help sidebar (T1, T11).
- Duplicate article title with two IDs in `Privacy and legal` (T7).
- The hallucination article's contact email renders as the literal placeholder `[email protected]` (T7).
- The hallucination cross-link points at `support.anthropic.com` from a `support.claude.com` page; the footer likewise mixes `anthropic.com/terms` with `anthropic.com/legal/consumer-terms`, and `anthropic.com/aup` with `anthropic.com/legal/aup` (T7, T10).
- The AUP is served `noindex, nofollow` (T10).
- `More usage*` and `Choose 5x or 20x more usage than Pro*` carry asterisks with no matching footnote in the served text (T10).
- `Ability to search the web`, `Web search` and `Research` are three unreconciled rows in one comparison table (T13).
- Whole comparison-table blocks read `No` in every column (`Security and administration` on all individual plans; `Adding seats midterm` as `n/a n/a n/a n/a`), and `@Claude` reads `No` for Free, Pro, Max 5x and Max 20x alike (T13).
- Missing (not empty) alt attributes on the hero and numbered-benefit images (T14).
- `More information` and `Up to 1M` concatenate to adjacent text with no separator, ~16 instances (T14).
- Feedback-control accessible names describe icons, not actions (T14).
- No accessibility statement found (T14).
- Marketing states "Claude cites sources" unqualified while help states citations may not be grounded in fact, with no link between them (T2, T10).
- `expand logic` and "helpful, intuitive, and powerful collaborator" are the two pieces of unfalsifiable filler on an otherwise concrete site (T2, T12).
- The marketing page twice answers "what is this for" with `Ask Claude` (T2, T12).
- **Project states — half the benchmark strength attributed to this product — are entirely unevidenced on public surfaces** (T6).

---

## Transferable patterns

1. **Advertise the clarifying question.** "There are two headcount plans in the folder — v3 is newer, but v2 still carries the contractor lines. Which is the plan of record?" Observation, em-dash, discriminating evidence, two-option question, no apology. Any system that must disambiguate before acting should write its questions this way, and showing them in marketing builds more confidence than hiding them. Condition: the question must cite the evidence that caused it, or it reads as the system failing to try.

2. **Report scope, assumptions and abstentions, not just completion.** `Draft 11 field updates, nothing saved` · `Flag seven rows, hold four decisions` · `Convert EMEA at the July average, 1.088` · `Redline four clauses, flag two the playbook doesn't cover`. Naming what was *deliberately not done*, and exposing the assumed value so it can be challenged, is the correct shape for agentic status copy across every domain — payments reconciliation, fraud review, document processing.

3. **File hallucination under Troubleshooting.** Two of the four articles in Claude's troubleshooting category are about the model being wrong. Put the accuracy content where the user goes when something has gone wrong, not in a policy page or a one-line footer. This is the single most reusable IA decision in the file.

4. **Explain the failure by explaining the motive.** "In an attempt to be a helpful assistant, Claude can occasionally produce responses that are incorrect or misleading." Telling the user *why* the wrong answer sounded confident is more useful than telling them it might be wrong. Transferable to any automated system whose failures are plausible rather than obvious — scoring models, matching engines, recommendation systems.

5. **Scale the verification obligation to the stakes.** "carefully scrutinize any **high-stakes** advice" rather than "always verify". A blanket instruction to check everything is ignored; a conditional one is followed. Requires the product to say which cases are high-stakes, which Claude does via its AUP's seven categories but not in the consumer article.

6. **Name the two-clause cancellation truth.** "Canceling doesn't delete your data. Your chats, projects, and files stay with your account, though some features aren't available on the Free plan." What survives, then what does not, in that order. Answers the fear before the fact.

7. **Contrastive tagline pairs for audience segments.** `Review more, reconcile less.` · `Claude drafts, you decide.` · `Less digging, more decisions.` Five words, an antithesis, no product nouns, no adjectives. Works for any segmented landing page. Condition: apply the frame to every segment or the exceptions look like afterthoughts — `Sales: More time with customers` shows the cost of breaking it.

8. **Explain why a limit cannot be a number, then list what moves it.** "there's no fixed message count", followed by seven named consumption factors, followed by three named exits ordered by cost. Applies wherever usage is metered on a composite the user cannot observe.

9. **Publish the disclosure obligation you impose on your customers.** "All consumer-facing chatbots must disclose to users that they are interacting with AI rather than a human… at a minimum at the beginning of each chat session." A policy that prescribes *when* and *how often*, not just *that*. Directly reusable as an internal content standard, whoever the vendor is.

10. **Offer the page to machines.** `Copy as markdown` · `Ask questions about this page` · `Copy for LLM`. A genuinely new affordance class in 2026, and the most forward-looking pattern in this batch. Condition: pick one label. Three names for one idea across two surfaces of one brand is the failure mode already visible here.

## Caveats & gaps

- **The benchmark strength is half unevidenced.** "Capability framing" is richly supported by public content. "**Project states**" is not: no project state name, no state transition, no project empty state or project status copy is reachable on any public surface. An authenticated pass is required before this file can support any claim about Claude's project-state vocabulary.
- **Every string in T4, T6 and T9 that describes product behaviour comes from marketing mock-ups**, not from the product. The clarifying questions, the `Now standing` labels, the `Opus High` badge and the receipts lines are all scripted demo content. They evidence Anthropic's *writing*, not Claude's *behaviour*.
- **All in-product strings are `[documented]` or mock-up.** No error message, empty state, toast, validation string, model-picker label or composer disclaimer was observed. Notably, the in-product accuracy disclaimer widely understood to sit under the composer is not quoted on any public page and is therefore not recorded here.
- **`anthropic.com/pricing` returned an empty body** (HTTP 200, no content). `claude.com/pricing` served fully and is the source for all pricing content in this file.
- **Only eight pages were opened.** Unharvested: the status page (`status.anthropic.com`), the five model pages including `Mythos`, `Artifacts`, `Skills`, `Connectors`, `Plugins`, `Claude Code`, `Claude Science`, `Claude Security`, `Claude Academy`, the Consumer Terms, the Privacy Policy, `Claude's Constitution`, the trust portal, and roughly 28 of the ~30 help collections. Article *bodies* were opened for three articles only; everything else in T10 and T11 is titles and scope lines.
- **Model names, version numbers and prices are volatile** and are recorded as at 2026-09-22. Four families at four version numbers, seven legacy cards, and a `Mythos` family with no pricing are all point-in-time observations. Treat every figure in T13 as dated.
- The pricing comparison matrices were captured from server HTML with both the individual and Team/Enterprise views present. Whether the ~15 consecutive `No` rows in the individual `Security and administration` block are genuinely served or an artefact of the collapsed toggle state could not be determined; recorded as observed and flagged.
- The three-tab pricing FAQ served only the first tab's contents. `Billing and payments` and `Managing your plan` questions beyond the seven listed were not retrieved.
- Mobile and desktop app store copy is outside the public web surface.
- **Author's position.** This harvest was performed by a Claude model on Anthropic's own product. The defect list above was compiled against the same threshold used for 161, 163, 164 and 165 — concatenation defects, missing alt, duplicate titles, half-completed renames and unlinked disclosures are recorded here as they are there. A reader who wants an independent check should verify the five items most damaging to the product: the unevidenced project states (T6), the marketing/help contradiction on citations (T2/T10), the `noindex` AUP (T10), the broken contact email in the hallucination article (T7), and the missing alt attributes on the hero (T14).

## Sources

1. https://claude.com/product/overview (reached via https://www.anthropic.com/claude)
2. https://claude.com/pricing
3. https://www.anthropic.com/legal/aup
4. https://support.claude.com/en/articles/9797557-usage-limit-best-practices
5. https://support.claude.com/en/collections/18032037-troubleshooting
6. https://support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on
7. https://support.claude.com/en/articles/8241188-claude-is-producing-links-that-don-t-work-and-falsely-claiming-that-it-has-sent-emails-or-produced-external-documents-what-s-going-on
8. https://support.claude.com/en/collections/4078534-privacy-and-legal
9. https://www.anthropic.com/pricing — attempted, returned empty body
