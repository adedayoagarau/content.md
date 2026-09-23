# 161. ChatGPT

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | General-purpose LLM assistant / consumer conversational AI (multi-surface: web, desktop, mobile, embedded) |
| Primary URL | https://chatgpt.com/ |
| Corpus rank | 161 |
| Benchmark strength (source list) | Prompt onboarding, tools, transparency |
| Locale / market observed | en-US (footer locale selector reads `English` / `United States`) |
| Platform observed | Web (marketing + pricing), help centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a as a sector regulator, but the copy carries a self-imposed disclosure regime: EU/UK-style AI-act vocabulary appears in the Usage Policy ("real-time remote biometric identification in public spaces", "inference regarding an individual's emotions in the workplace"), plus HIPAA/BAA language in healthcare workspaces, COPPA-adjacent teen/parental-control copy, NCMEC reporting, and SOC 2 / ISO 27001 / 27017 / 27018 / 27701 claims on business tiers |
| Harvest date | 2026-09-22 |
| Pages inspected | 11 reachable, 1 blocked |
| Harvest completeness | Partial — all in-product strings are `[documented]` from help articles, not observed; **the pricing page rendered plan cards with no price values in server HTML**, so no consumer price is recorded from that page; `status.openai.com` did not return |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Product overview | https://chatgpt.com/overview/ | `openai.com/chatgpt/overview` 301s here. Hero, three-surface model, eight use-case cards, safety block |
| Pricing | https://chatgpt.com/pricing/ | Four individual plan cards, ~70-row comparison matrix, four footnotes, eight-question FAQ. **Price figures absent from server HTML** |
| Usage policies | https://openai.com/policies/usage-policies/ | Effective 2025-10-29. Four-principle preamble, four-verb prohibition set, 11-entry changelog |
| Help centre index | https://help.openai.com/en/ | 15 top-level collections, each with a scope line |
| Help collection: ChatGPT | https://help.openai.com/en/collections/3742473-chatgpt | ~80 article titles plus 12 sub-collections — the richest single source of task phrasing |
| How your data is used to improve model performance | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance | The training-opt-out article. Updated "19 hours ago" at harvest |
| About ChatGPT Pro tiers | https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers | Two Pro tiers, a live subscription pause, 10-question pause FAQ |
| Troubleshooting ChatGPT Error Messages | https://help.openai.com/en/articles/7996703-troubleshooting-chatgpt-error-messages | Nine verbatim error strings as H2s — the single best T7 source in this batch |
| What to expect when models change | https://help.openai.com/en/articles/20001053-what-to-expect-when-models-change | Model-deprecation grief copy. Unusual and important |
| Memory in ChatGPT | https://help.openai.com/en/articles/8590148-memory-in-chatgpt | Memory control vocabulary, Sources, deletion propagation |
| ChatGPT Free Tier FAQ | https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq | Free-tier limits, two screenshot alt texts describing limit-reached states |
| Status page | https://status.openai.com | **Blocked** — fetch aborted, no body returned |

---

## T1 Navigation & IA labels

**Global nav — feature-led, not audience-led** `[observed]`

`About` · `Features` · `Learn` · `Codex` · `Business` · `Pricing` · `Download`, with `Log in` and `Sign up for free` at the right.

This is the opposite of the Wise pattern (audience tiers first). ChatGPT puts *capabilities* at level one and hides the audience split inside `Learn` and `Business`. The consequence is a level-two menu that mixes grammatical kinds freely.

**`Features` submenu — all noun phrases, no verbs** `[observed]`

`ChatGPT Work` · `Deep Research` · `Health` · `Images` · `Plugins` · `Remote` · `Shopping` · `Study Mode` · `Voice` · `Voice with Video`

Note the casing inconsistency inside a single ten-item list: `Deep Research` and `Study Mode` are title-cased, `Plugins`, `Images`, `Voice`, `Shopping`, `Health` are single words, and `Voice with Video` uses sentence case for the preposition. `Remote` is the odd one — a bare adjective with no noun, and the only item in the list whose label does not tell you what it is.

**`Learn` submenu — three grammatically distinct groupings** `[observed]`

| Grouping label | Items |
|---|---|
| `ChatGPT for` | `Students` · `University Educators` · `Teachers` · `Science and Medicine` · `Parents` · `Veterans` |
| `Inspiration` | `Fitness, Wellness, and Health` · `Money and Finances` · `Recipes and Cooking` · `Travel and Exploration` |
| `Ways to Use` | `Canva in ChatGPT` · `Spotify in ChatGPT` · `ChatGPT for PowerPoint` · `Chat with PDFs` · `Chat with Presentations` · `Chat with Spreadsheets` |

`ChatGPT for` is a **sentence-stem grouping label** — the heading completes into the item ("ChatGPT for Students"). That is a genuinely good pattern and worth stealing. But it is undercut in the third group, where `ChatGPT for PowerPoint` sits under `Ways to Use` rather than under `ChatGPT for`, so the same construction lives in two groups.

Also note `University Educators` and `Teachers` as sibling audiences, with `K–12 Teachers` as a *third* teacher label in the `Pricing` submenu. Three labels, an unclear boundary between two of them.

**Help centre — 15 collections, each with a scope line** `[observed]`

| Collection | Scope line (verbatim) |
|---|---|
| `Account, login and billing` | "Refund requests, billing and login issues" |
| `API` | "Common questions related to our APIs and models" |
| `ChatGPT` | "All things about ChatGPT" |
| `ChatGPT Ads` | "Learn how to set up, launch, and manage campaigns for ChatGPT Ads." |
| `ChatGPT Atlas` | "Learn more about our browser, ChatGPT Atlas" |
| `Privacy and policies` | "Details on data privacy and usage policies" |
| `Secure sign in` | "Signing into connected apps" |

The scope lines are inconsistently punctuated (some end with a full stop, most do not) and inconsistently constructed (some are noun lists, some are imperative "Learn how…"). `ChatGPT Sites` carries **no scope line at all** — a bare label in a list where every sibling is explained.

`All things about ChatGPT` is the weakest line in the set: it is the largest collection by far (~80 articles plus 12 sub-collections) and its scope line tells the user nothing that would let them route.

**Footer — two different footers on two surfaces** `[observed]`

The `chatgpt.com` footer is short: `OpenAI` (`Research`, `Safety`, `API`, `News`) and `Terms & Policies` (`Terms of Use`, `Privacy Policy`, `Usage Policy`, `Other policies`). The `openai.com` footer is 11 columns. `Terms of Use` points to `/policies/row-terms-of-use/` from `chatgpt.com` and to `/policies/terms-of-use/` from `openai.com` — **two different terms documents behind one label**, depending which site you were on.

## T2 Value proposition & headline patterns

**Hero — a claim about place, not about capability** `[observed]`

> `Now you can chat, work & code all in one place.`

The headline leads with `Now`, which dates the page and frames the proposition as a consolidation announcement rather than a benefit. The ampersand is used mid-sentence in a headline where the rest of the page uses "and". This is a *product-architecture* headline: it describes the merge of three surfaces, which is an internal fact.

**Three-surface framing — noun label + "For…" scope line** `[observed]`

| Surface | Scope line |
|---|---|
| `Chat` | "For questions, learning, and everyday help." |
| `Work` | "For completing work tasks from start to finish." |
| `Codex` | "For coding and technical work." |

Consistent construction, full stops throughout, and each scope line answers "when do I use this one". This is the strongest content unit on the page: three sibling labels disambiguated by a single preposition phrase each. Compare the nav, where no such discipline is applied.

The mismatch is that two of the three surfaces (`Chat`, `Work`) are generic English words and the third (`Codex`) is a coined product name, so the set does not read as a set.

**Eight use-case cards — bare nouns plus an imperative sentence** `[observed]`

`Writing` · `Images` · `Work` · `Coding` · `Voice` · `Health` · `Finance` — each followed by two sentences opening with an imperative verb ("Turn rough notes and thoughts into clear, polished writing.", "Create images from a prompt…", "Write, debug, and improve code.", "Talk with ChatGPT in real time when speaking is easier than typing.").

`Work` appears **twice on one page** — once as a top-level surface with the scope line "For completing work tasks from start to finish." and again as one of eight peer capability cards ("Connect to your internal work files and apps like Gmail and Slack…"). Same word, two different levels of the information hierarchy, on one screen.

**Capability framing is hedged in exactly one place** `[observed]`

Almost every capability line is unqualified. The two that are hedged are the two with the highest exposure:

- `Health`: "Explore fitness, wellness, and health-related questions with clear explanations and practical guidance." — note `Explore`, not "get answers about", and `practical guidance`, not "advice".
- `Finance`: "Ask about budgeting, planning, financial concepts, and market context." — note `market context`, not "market analysis", and the four nouns are all descriptive rather than prescriptive.

This is a deliberate verb-and-noun downgrade in the two regulated-adjacent categories, achieved without a visible disclaimer. It is the best transferable move on the marketing page: **hedge in the verb, not in a footnote.** Contrast `Coding`: "Write, debug, and improve code. Build something new, fix what's broken" — fully imperative, no hedge.

**Safety section — possessive, second person, choice-framed** `[observed]`

> `Designed to keep you safe`
> `User privacy` — "You choose how your data is used, and we make it easy to control your privacy choices."
> `Teen safety` — "Tools like Parental Controls in ChatGPT ensure parents can set safeguards for teen users."

`ensure` is doing too much work in the teen line — it asserts a guarantee about an outcome the tooling cannot deliver, in a section whose whole purpose is trust. Compare the privacy line one row above, which correctly claims only about the control surface ("we make it easy to control"), not the outcome.

**Asterisked hero CTA** `[observed]`: `Try it now*`, with the footnote at the foot of the page: "*Available to all plans on macOS and Windows desktop, and to Plus, Pro, Business, Enterprise, and Edu on web and mobile." The asterisk is on the *primary hero CTA* and the footnote is roughly two thousand words further down. An availability caveat attached to the single most-clicked element, resolved nowhere near it.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up for free` | Global nav, right | Price in the label |
| `Log in` | Global nav | |
| `Try it now*` | Hero primary | Asterisked; footnote ~2,000 words away |
| `Download the app` | Hero secondary | |
| `Download app` | Page-foot CTA | **Article dropped** vs the hero's `Download the app` — same action, two labels, one page |
| `Learn more` | Plans-and-pricing block | Bare `Learn more`, object supplied only by the preceding sentence |
| `Learn more` | Under `User privacy` | Second bare `Learn more` on the same page, different destination |
| `Learn more` | Under `Teen safety` | Third bare `Learn more`, third destination |
| `Get Free` | Pricing, Free card | Odd construction — "Get" + an adjective used as a plan noun |
| `Get Go` / `Get Plus` / `Get Pro` | Pricing cards | Consistent `Get <PlanName>` pattern |
| `Get Plus` | Comparison-table header | **Different destination** from the card's `Get Plus`: the card links to a `?ifpazk=…&highlight_plan=plus#pricing` URL, the table links to `/explore/plus`. One label, two hrefs, one page |
| `See billing help⁠` | Free card footnote | |
| `Limits apply⁠` | Plus card footnote | A link whose label is the caveat |
| `Contact sales` | Pricing FAQ, repeatedly | |
| `Contact our team` | Education FAQ answer | Near-duplicate of `Contact sales` |
| `Contact our sales team` | Nonprofit FAQ answer | **Third** variant of the same action, in adjacent FAQ answers |
| `Regenerate` | Error-recovery step | `[documented]` — quoted inside the troubleshooting article |
| `Stop generating` | Error-recovery step | `[documented]` |
| `Get Plus` | Free-tier limit-reached notice | `[documented]` via screenshot alt text |
| `Delete and turn off memory` | Memory settings | `[documented]` — a compound destructive action in one label |
| `Don't mention this again` | Memory summary | `[documented]` — first-person-user phrasing for a suppression control |
| `Try improved memory` | Memory settings | `[documented]` |
| `Improve the model for everyone` | Data controls toggle | `[documented]` — the training opt-out, named as an altruistic act |
| `Do not train on my content` | Privacy Portal | `[documented]` — **the same setting, named as a refusal** |
| `Skip to main content` | openai.com, first in DOM | Accessibility. **Absent from `chatgpt.com`** |

**Observation.** `Learn more` appears three times bare on the overview page with three different destinations. This is the exact failure Wise avoids. The pricing page does better — `See billing help`, `Limits apply` — where the link text *is* the caveat.

**The most interesting pair in this file** is `Improve the model for everyone` (in-product) versus `Do not train on my content` (Privacy Portal). Both set the same flag. One is opt-*out* framed as switching off a public good; the other is opt-*in* framed as an instruction to the company. The help article explicitly reconciles them — "Either option is sufficient… You don't need to do both" — which is good remediation of a problem that should not exist.

## T4 Onboarding & getting-started

`[documented]` — no pre-auth step sequence, no numbered "how it works" on the marketing page. This is a notable absence for a product whose flagged strength is *prompt onboarding*: the marketing site shows outcomes, never a first-run sequence.

Onboarding content lives entirely in the help centre, as a **prompt-craft curriculum** rather than a product tour:

- `How do I create a good prompt for an AI model?`
- `Prompt engineering best practices for ChatGPT`
- `How to Ask ChatGPT About Its Features`
- `The ChatGPT home page` — "Try ChatGPT before creating an account."

`How to Ask ChatGPT About Its Features` is the standout. Its scope line — "This article explains the best way to interact with ChatGPT when you're unsure about what it can do." — concedes the core discoverability problem of a blank text box: the product cannot reliably describe itself, so the help centre teaches you how to interrogate it. (Gemini documents the same failure mode more bluntly; see the Gemini file.) Note the title's inconsistent capitalisation — `How to Ask ChatGPT About Its Features` is title-cased in a collection where nearly every sibling is sentence-cased.

`Try ChatGPT before creating an account.` is a good, plain statement of a signup-deferral affordance, and it is buried as an article scope line rather than surfaced on the marketing page.

## T5 Form & field labels

`[documented]` — no substantive pre-auth form exists. Settings-path labels quoted inside help articles:

| Label | Source article | Note |
|---|---|---|
| `Settings > Data controls` | Data-use article | |
| `Settings → Personalization → Memory` | Memory article | **Arrow glyph differs**: `>` in one article, `→` in another, for the same navigation construction |
| `Settings → My Plan` | Pro tiers article | |
| `Improve the model for everyone` | Data controls | |
| `Reference saved memories` / `Reference chat history` | Memory settings | Verb-first toggle names |
| `Memory summary` / `Saved memories` / `Manage` | Memory settings | |
| `Include environments` | Codex settings | |
| `Unpersonalized` | Temporary-chat pre-flight choice | A coined negation used as a button label |
| `Use improved memory` | Enterprise role permission | |

`Unpersonalized` is the one worth arguing about. It is not a standard English word, it names the option by what it lacks, and it is presented at a moment the user cannot revisit — the help text says "You cannot change this choice after the conversation starts." A one-way door labelled with a neologism.

## T6 Status & state language

`[documented]` — three distinct state vocabularies, none reconciled with each other.

**Generation states**, quoted in the troubleshooting article as things the user may be `Stuck on`: `Thinking…` · `Generating…` · `Working…`. Three progress words for one waiting state, with the article itself treating them as interchangeable. No documentation of which appears when.

**Plan-capability states**, from the comparison matrix: `Unlimited*` · `Expanded` · `Limited` · `Varies` · `Fast` · `Limited on bandwidth & availability` · `Limited (desktop app)` · `Limited access in Work and Codex on desktop`. Eight distinct values in what is presented as a yes/no grid. `Varies` (Free's reasoning context window) is an admission rendered as a cell value. `Expanded` is a comparative with no stated baseline — expanded relative to what is never said.

**Limit states**, `[documented]`: a model "may be temporarily unavailable until the allowance resets", and "ChatGPT displays the reset time when available". The hedge `when available` inside a sentence about showing the user when their access returns is a quiet admission that the reset time is sometimes not shown.

The Pro-tiers article does one thing unusually well — it **separates two states the user would conflate**:

> "Reaching a model's allowance does not by itself mean that your account was restricted or that your subscription ended."

That is a direct answer to the panic reading of a limit message, and it is the kind of sentence most products never write.

## T7 Error, failure & recovery

The strongest observed category for this product. Nine error strings are published verbatim as H2 headings, so the help article is searchable by pasting the error.

| Error string (verbatim) | Framing |
|---|---|
| `"Something went wrong."` | Agentless, no cause |
| `"A network error occurred."` | Agentless, passive |
| `"An error occurred while connecting to the websocket."` | **Leaks implementation** — "websocket" is meaningless to most users |
| `"We detect suspicious activity."` | First person plural, **present tense**, accusatory |
| `"Unusual Activity Detected"` | Passive, title-cased, no full stop — a second string for the same condition |
| `"There was a problem preparing your chat."` | Possessive, names the stage |
| `"There was an error generating a response."` | Names the stage |
| `"Download failed" / "File Not Found"` | Two strings, one heading |
| `"Phone number required"` | Bare requirement, no explanation |

**Pattern analysis.** The set has no consistent grammar. Four constructions coexist: bare noun phrase (`Phone number required`), passive report (`A network error occurred.`), existential (`There was a problem…`), and first-person-plural assertion (`We detect suspicious activity.`). Punctuation is inconsistent — some strings carry a terminal full stop inside the quotes, `Unusual Activity Detected` does not. Casing is inconsistent — one title-case string in a sentence-case set.

`We detect suspicious activity.` is the worst string in the inventory. Present-tense first-person-plural puts the company in the sentence as an accuser, the object is the user, and there is no remedy in the string. Compare Wise's calm first-person-*user* recovery titles. The two labels for the same condition (`We detect suspicious activity.` and `Unusual Activity Detected`) also mean a user who searches the exact string may or may not find the article.

**Recovery is generic and repeated.** Six of the nine errors resolve to the same list: disable VPN, disable extensions, try incognito, try another browser, try another network. The article does not differentiate which remedy applies to which cause, so the content shape is *one remedy list, nine entry points*. The escalation path is unusually technical for a consumer help centre: "collect a HAR file and browser console errors with timestamps, note the model used and the conversation URL or ID". Asking a consumer for a HAR file is a real content-design failure — there is no plain-language alternative offered.

**Help-title grammar for failure** `[observed]` — three shapes across the ChatGPT collection:

| Shape | Examples |
|---|---|
| `Why …?` | `Why can't I log in to ChatGPT?` · `Why is my ChatGPT taking so long to respond?` · `Why am I being asked to verify my age?` |
| `I'm <experiencing> …` | `I'm seeing unrecognized activity on my OpenAI account.` |
| Gerund/noun topic | `Troubleshooting GPTs` · `Troubleshooting Model Feature Access Issues` · `Network recommendations for ChatGPT errors on web and apps` |

`I'm seeing unrecognized activity on my OpenAI account.` is the only first-person title in the set and the only one with a terminal full stop. It is also the best of them: it is the sentence a worried user would type. The pattern exists but is used exactly once. Wise, by contrast, runs a whole first-person family.

`Troubleshooting Model Feature Access Issues` has the scope line "Users have lost access to model versions" — a **scope line written in the third person about users**, in a help centre otherwise addressed to "you". It reads like an internal ticket summary that shipped.

## T8 Empty states

`[absent]` — no no-data, no-results, first-run or caught-up copy is reachable on public surfaces. The help-centre search UI was not exercised. One adjacent string is `[documented]` via screenshot alt text: a state where "the free image creation limit has been reached", which is a limit state rather than an empty state.

## T9 Notifications & system messages

`[documented]`, and thinner than expected.

- Limit notices are described but not quoted: "ChatGPT will notify you when you reach an applicable limit." The two screenshots in the Free Tier FAQ carry alt text describing the notices — "ChatGPT notice that the free image creation limit has been reached, with a Get Plus upgrade button" and "ChatGPT notice that the free-tier daily limit for GPTs has been reached, with a Get Plus button". **The alt text is the only textual record of these notices**; the strings themselves are in the images. A screen-reader user gets a better description of the notice than a sighted reader gets of the string.
- Email is named as a recovery channel: on a failed Pro renewal "we'll send you an email to the address associated with the account with information on options you have to renew".
- The pricing page carries an in-card advisory on the Go plan: `This plan may include ads. Learn more⁠` — placed in the plan card rather than in terms. Advertising disclosure at the point of purchase decision is good practice and worth noting.

There is no public notification-model explainer (nothing equivalent to Wise's "How do you notify me about a transfer?").

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** ChatGPT's disclosure content is strong in the help centre and conspicuously thin on the marketing and pricing surfaces.

### Accuracy / "can make mistakes" wording — `[absent]` on public marketing surfaces

**This is the headline negative finding of the file.** Across the product overview, the pricing page and the usage policies, **there is no statement that ChatGPT's output may be wrong.** No hallucination disclaimer, no "can make mistakes" string, no accuracy caveat. The in-product footer disclaimer (widely known to exist under the composer) is behind the app shell and was not observable, and — more tellingly — it is not quoted in any help article harvested here.

The closest the public surfaces come are three indirect moves:

1. The verb-level hedging in the `Health` and `Finance` cards (see T2) — implicit, not stated.
2. A Usage Policy prohibition that pushes the accuracy obligation onto the *customer*: "provision of tailored advice that requires a license, such as legal or medical advice, without appropriate involvement by a licensed professional", and "automation of high-stakes decisions in sensitive areas without human review", followed by a 13-item list of those areas (`critical infrastructure`, `education`, `housing`, `employment`, `financial activities and credit`, `insurance`, `legal`, `medical`, `essential government services`, `product safety components`, `national security`, `migration`, `law enforcement`).
3. A help article whose scope line is "Assessing links that ChatGPT generates for you" (`ChatGPT generated links`) — an oblique acknowledgement that generated links need assessing.

So the model-fallibility problem is addressed as a *permissible-use* question ("don't automate high-stakes decisions") rather than as a *user-expectation* question ("this may be wrong"). Compare Gemini, which says plainly that it "can hallucinate and present inaccurate information as factual", and Claude, which publishes a help article titled `Claude is providing incorrect or misleading responses. What's going on?`. On the specific content problem this batch was assembled to examine, ChatGPT's public surfaces are the least forthcoming of the five.

### Training / data-use and the opt-out — `[observed]`, and well done

The pricing matrix carries a dedicated `Privacy` section with a single row, `Content is used to train our models`, whose value on all four individual plans is `Opt-out available` with a `Learn more` link. Putting training posture in the feature-comparison grid, at the same visual weight as `Voice` or `Projects`, is a strong and reusable decision: it makes data use a *plan attribute* the user compares rather than a policy they must go and find.

The article behind it is precise and unusually candid about the edges:

- Default for individuals: "we may use your content to train our models."
- Two equivalent controls, named oppositely: `Improve the model for everyone` (Settings > Data controls) and `Do not train on my content` (Privacy Portal), with "Either option is sufficient… You don't need to do both."
- Default for business: "By default, we don't use inputs or outputs from ChatGPT Business, ChatGPT Enterprise, ChatGPT Edu, or our API to improve our models."
- **The carve-out is stated twice, once in the body and again as the article's only FAQ:** `What if I submit feedback after opting out?` — if you use thumbs up or thumbs down, "the entire conversation associated with that feedback may be used to train our models, even if you've opted out."

That repetition is the best disclosure decision in the file. The single most counter-intuitive consequence of the control — that a one-click feedback gesture overrides your opt-out for the whole conversation — is stated in the body *and* promoted to the FAQ slot. Most products state such a carve-out once, in a subclause.

Three further carve-outs are disclosed rather than buried: Codex has a separate `Include environments` setting that account-level opt-out does not reach; OpenAI Support conversations are in scope if the setting is on; and Temporary chats are out of scope "while they remain temporary" — with the reversal named explicitly ("If you save a temporary chat, it becomes a regular chat and follows your account's… settings").

### Memory, deletion and retention — `[documented]`

The Memory article is the most disclosure-dense page harvested. Notable constructions:

- Scope hedged up front: "Memory does not retain every detail from every conversation."
- Availability hedged: "Memory features and controls can vary by plan, region, platform, and workspace settings. If a setting described here is not visible, it may not be available for your account yet."
- A suppression control distinguished from a deletion control, explicitly: "Don't mention this again reduces future references to the information. It does not delete the original source."
- Deletion is described as *incomplete by default*, with a five-source checklist (memory summary, saved memories, regular and archived chats, files in Library, connected apps) and the warning "Deleting a chat alone does not necessarily delete a separate saved memory created from that chat."
- Retention stated numerically: deleted saved memories may be retained "for up to 30 days for safety and debugging purposes"; turning off `Reference chat history` schedules deletion "within 30 days".
- A safety override disclosed rather than hidden: "Turning off Memory or personalization does not disable limited safety and security uses of context in rare, high-risk situations."

The `Sources` affordance is the transparency mechanism: "When ChatGPT uses relevant personal context, Sources may appear below the response" — immediately bounded by "Sources may not show every factor that shaped a response." Claim, then bound the claim, in adjacent sentences. That is the Wise pattern, applied to explainability.

### Usage limits — `[observed]` and `[documented]`

- `Unlimited*` is used as a matrix value with the footnote "*Usage must be reasonable and comply with our policies". The asterisk does real work: `Unlimited` never appears unqualified in the matrix.
- The Free card repeats the bound twice on one card: "Unlimited text chats subject to abuse guardrails. Learn more⁠", and the Pro card carries "Unlimited subject to abuse guardrails."
- No numeric message caps are published anywhere. Limits are expressed as multipliers against an undefined baseline (`5x more usage`, "Pro $100 unlocks 5x higher usage than Plus, while Pro $200 unlocks 20x usage than Plus" — note the dropped "higher" in the second clause).
- Enforcement is stated in the second person and de-escalated: "OpenAI uses guardrails to help prevent misuse. These guardrails may occasionally result in a temporary usage restriction. ChatGPT will notify you if this happens." with an appeal route and the reassurance "If OpenAI does not find policy-violating behavior, access will be restored."
- And the flat refusal, given its own H2: `Can Support reset my usage limits?` → "No. OpenAI Support does not reset ChatGPT or Codex usage limits." A one-word answer to the question users actually ask. Good.

### Context-window disclosure — `[observed]`, genuinely unusual

The longest footnote on the pricing page explains why the advertised context window is not the usable one: ChatGPT "manages a shared context window", the portion available for user input "is smaller than the total window, as space is also used for system instructions (including tools and personality), memories (if enabled), and internal processing", and "The reported space for user input is an approximation and may change dynamically".

Publishing the fact that your own headline number overstates what the user gets — and naming the consumers of the difference, including *personality* — is a rare disclosure. It is also translated for the non-technical reader in the matrix itself, which expresses the same quantity twice: `27K` / `54K` / `128K` alongside `~12 pages of text` / `~40 pages of text` / `~250 pages of text`. **Dual-unit disclosure — the technical number and the human-scale equivalent side by side — is the single most reusable pattern on the pricing page.**

### Acceptable use — `[observed]`

The Usage Policy (effective 2025-10-29) is structured as **four imperative principles**, each a two-word verb phrase, each followed by a rationale sentence and then a bulleted prohibition list:

`Protect people` · `Respect privacy` · `Keep minors safe` · `Empower people`

Three of the four are positively framed — the document tells you what to uphold before what not to do. `Empower people` as the header over prohibitions on fraud, academic dishonesty and election interference is a stretch, but the construction is defensible and more memorable than a numbered prohibition list.

The preamble is four bolded assertions with an explicit posture: `We empower users to innovate with AI` · `Responsible use is a shared priority` · `We build with safety first` · `We update as we learn`. "We assume the very best of our users" is a notable line — a stated presumption of good faith inside an enforcement document.

Two structural decisions worth stealing: an **11-entry dated changelog** at the foot of the policy, running back to 2021-02-26 and describing each change in plain language; and a subscribe affordance for policy changes ("If you'd like to keep up with Usage Policies updates, complete this form"). Treating a policy as a versioned, subscribable artefact rather than a static page is good compliance UX. Wise's dual-format fee disclosure is the analogue.

An appeal route is named inline: "You can appeal⁠ if you think we have made a mistake enforcing policy, and we will work to make things right."

### Billing and cancellation — `[observed]`

- "You can change or cancel your subscription anytime from Settings → My Plan."
- Upgrade/downgrade asymmetry stated plainly: "If you upgrade to an available plan, your new plan takes effect immediately and your billing cycle starts over. If you move to a lower tier, the change takes effect at your next renewal and you keep your current plan until then."
- No annual option, stated as a flat negative: "Currently, we do not support annual billing or the option to pay for multiple months in advance for ChatGPT Go, Plus, or Pro subscriptions."
- **A live commercial restriction is disclosed in a dated note at the top of the plan article**, not buried: "As of September 10, 2026, we're temporarily pausing new sign-ups and upgrades to the ChatGPT Pro $200 plan (Pro 20X)." The note goes on to define a `one-time return` right with a 30-day window and an eligibility date, and the article then carries a **ten-question pause FAQ** covering refund, promotion, downgrade, failed payment and workspace-join interactions.

That pause FAQ is the most thorough piece of commercial-edge-case content in this batch. It anticipates the combinatorics ("What happens if claiming a promotion changes my Pro $200 subscription?", "What happens if my Pro $200 renewal payment fails?") rather than leaving the user to reason about them. It also demonstrates a content operation that can ship a temporary policy with its full consequence set on day one.

**Security claims** `[observed]`, from the pricing FAQ: encryption "in transit (TLS 1.2)" and "at rest (AES-256)", a 24/7/365 on-call security rotation, a `Bug Bounty Program`, and a `Trust Portal`. Specific, checkable, and attached to named artefacts rather than adjectives.

## T11 Help-centre architecture

Three levels: 15 collections → sub-collections → articles. The `ChatGPT` collection alone holds ~80 loose articles plus 12 sub-collections (`Android app`, `Apps with Sync`, `ChatGPT for Kakao`, `Connected apps`, `Data Controls`, `File uploads`, `GPTs`, `Memory`, `Search`, `Trusted Access for Cyber`, `Trusted contact`, `Voice`, `Windows app`, `iOS app`, `macOS app`).

**The IA defect is that the loose articles and the sub-collections are peers on the page.** ~80 articles are listed flat above the sub-collection groupings, so `Why can't I log in to ChatGPT?` sits at the same level as an entire `Memory` collection. There is no ordering principle visible in the flat list beyond rough alphabetisation, which puts `1-800-ChatGPT` first and `Your Year with ChatGPT - FAQs` last.

**Article-title grammar — five shapes, unevenly applied:**

| Shape | Examples |
|---|---|
| Noun phrase / product name | `Memory in ChatGPT` · `Projects in ChatGPT` · `Skills in ChatGPT` · `Images in ChatGPT` |
| `What is X?` | `What is ChatGPT?` · `What is ChatGPT Plus?` · `What is ChatGPT Go?` |
| `How do I / How to …` | `How do I create a good prompt for an AI model?` · `How to change your language setting in ChatGPT` |
| `Why …?` | `Why can't I log in to ChatGPT?` · `Why am I being asked to verify my age?` |
| Gerund | `Deleting and archiving chats in ChatGPT` · `Using study mode in ChatGPT` · `Searching the web with ChatGPT` |

The `<Feature> in ChatGPT` construction is the dominant and best pattern — it disambiguates against the API and against third-party surfaces, and it scales. Its cost is repetition: on one screen the phrase "in ChatGPT" appears more than 30 times, which makes the list hard to scan precisely because every title ends the same way.

**Notable individual titles.** `About ChatGPT Pro tiers` uses `About`, a shape used nowhere else. `What is ChatGPT: FAQ` (in the Kakao collection) duplicates `What is ChatGPT?` in the main collection — **two articles answering the same question under near-identical titles in different collections**. `Retiring GPT-4o and other ChatGPT models` and `Custom GPT retirement and migration FAQ` and `What to know about the Sora discontinuation` form an unusual sub-genre: three articles documenting the *withdrawal* of things. Publishing deprecation as first-class help content is genuinely good practice (and the direct parallel to Wise's removed-feature article).

**Support routing** `[observed]`: the help centre offers only a search box and the collection grid. No `Contact us` is visible on the index; contact is reached through an article (`How can I contact support`) referenced from inside other articles, and through "the chat widget at help.openai.com". Human contact is therefore *two levels deeper than Wise's*, which is either admirable deflection or a wall, depending on where you stand. There is no community forum link for consumers (the developer forum is on openai.com only).

Each article ends with `Was this article helpful?` and a `Submit` button — a feedback control with no visible rating input in the server HTML.

## T12 FAQs

**Placement:** foot of the pricing page, under the heading `FAQ`, eight questions, answers rendered inline (unlike Wise, they are in the HTML).

| # | Question (verbatim) |
|---|---|
| 1 | How does ChatGPT's pricing work? |
| 2 | Is ChatGPT free to use? |
| 3 | Does OpenAI offer a ChatGPT plan for educational institutions? |
| 4 | Does OpenAI offer a discount for nonprofits? |
| 5 | How many users are supported on each subscription plan? |
| 6 | What are my payment options? |
| 7 | How secure is ChatGPT? |
| 8 | How does ChatGPT use my data? |

**Structural notes.** Ordering runs: pricing model → free tier → two discount audiences → seat counts → payment → security → data. Q1 and Q2 overlap substantially (both answer "the free version is available to everyone"), and Q2's answer is largely a restatement of Q1's first sentence plus an upsell. Q7 and Q8 are the only two that are not commercial, and they are last.

Two are answered in the **third person about the company** (`Does OpenAI offer…`) while the rest are second person (`What are my payment options?`). Mixing "Does OpenAI…" and "my" within one eight-item list is a register inconsistency.

**The plan-enumeration defect.** Three different lists of "the paid plans" appear on this one page:

- Page meta description: "Paid plans (**Plus, Pro, Business, and Enterprise**)"
- FAQ Q1 answer: "Paid plans (**Go, Plus, Business, and Enterprise**)"
- Plan cards actually displayed: **Free, Go, Plus, Pro**

The meta description omits Go; the FAQ omits Pro; neither matches the cards. The FAQ answer then says monthly plans exist "for Go, Plus and Business" — again omitting Pro, which is displayed as a monthly plan two screens above. This is a content-ops failure of exactly the kind a corpus should record: the enumeration was updated in one place when a plan was added and not in the other two.

A second, smaller one: Q4's answer is rendered with stray italic markers around part of the sentence ("*Yes. Through OpenAI for Nonprofits, nonprofits can now access up to a 75% discount on ChatGPT Business or* ChatGPT Enterprise.") — emphasis that breaks mid-sentence, a paste artefact shipped to production.

**Article-level FAQ.** The Free Tier FAQ and Pro Tiers article use H1-level questions as section headings (`How do rate limits work on the Free tier?`, `Can Support reset my usage limits?`). The Pro pause FAQ's ten questions are the most complete edge-case set in the batch.

## T13 Terminology & glossary

**PRIORITY SECTION.** The model and plan vocabulary is the densest, least stable naming system in this batch.

### Plan names

| Term | Usage | Notes |
|---|---|---|
| `Free` | Plan noun | Used as a proper noun in `Get Free` |
| `Go` | Plan noun | "Expanded access". Ad-supported: "This plan may include ads." |
| `Plus` | Plan noun | "Do more with advanced intelligence" |
| `Pro` | Plan noun | "Maximize your productivity", priced "From / month" |
| `Pro $100` / `Pro $200` | Sub-tiers of Pro | **Price-as-name.** Only appear in the help article, never on the pricing page, which shows one `Pro` card |
| `Pro 20X` / `Pro 20x` | Alias for Pro $200 | Casing differs within one paragraph of the same article |
| `Business` / `Enterprise` / `Edu` | Org plans | |
| `ChatGPT for Teachers` / `ChatGPT Edu` / `K–12 Teachers` / `Higher Education` | Education plans | Four education labels across nav and FAQ |

**`Pro $100` / `Pro $200` is the finding.** Embedding a price in a tier name is unusual and has a real cost: the name stops being true in any other currency, breaks on any price change, and cannot be localised. It also means the pricing page and the help centre use *different names for the same products* — the page shows one `Pro`, the article discusses two named tiers plus two aliases (`Pro 20X`, `Pro 20x`). A user who reads "From /month" on the card has no way to learn from that page that two tiers exist.

### Model names — eight in the matrix, on two generations, with three suffix families

`GPT-6 Astra` · `GPT-6 Sol` · `GPT-6 Luna` · `GPT-5.6 Sol` · `GPT-5.6 Sol Pro` · `GPT-5.6 Terra` · `GPT-5.6 Luna` · `GPT-5 Thinking Mini` · plus a catch-all row, `Legacy models`.

The system is three-part: family (`GPT`), version (`6`, `5.6`, `5`), and a **celestial/elemental codename** (`Astra`, `Sol`, `Luna`, `Terra`). The codenames carry no ordinal information — nothing in `Luna` versus `Sol` versus `Astra` tells a non-technical user which is more capable, and the matrix confirms they are not ranked consistently across versions (`GPT-5.6 Luna` is the Free default; `GPT-6 Luna` is Plus-and-above). A user therefore cannot reason about `Luna` as a concept; they must read the grid.

A fourth suffix family appears alongside: `Pro` as a model suffix (`GPT-5.6 Sol Pro`) *and* as a plan name (`ChatGPT Pro`) — so "Pro" denotes both a subscription and a model variant, and `GPT-5.6 Sol Pro` is available on the `Pro` plan but not the `Plus` plan, making the collision maximally confusing at exactly the decision point.

**Capability categories cut across the model names** and are not the same vocabulary: `GPT Instant` and `GPT Reasoning` appear only as context-window row labels (`GPT Instant total context window`, `GPT Reasoning input maximum`), never as selectable model names, and no page maps which of the eight named models is "Instant" and which is "Reasoning". A third capability word, `Thinking`, appears inside one model name (`GPT-5 Thinking Mini`), as a feature row (`Image generation with Thinking`), and as a Free-tier menu item (`On mobile, open the + menu and select Think` — note **`Think`, not `Thinking`**). Four words — `Instant`, `Reasoning`, `Thinking`, `Think` — for what is presumably two or three underlying behaviours.

**An internal contradiction in the tier story** `[observed]`: the Plus card says `Advanced reasoning models with GPT-6` and the Pro card says `Pro reasoning powered by GPT-6 Astra` — framing Astra as the Pro differentiator — while the comparison matrix two screens below gives `GPT-6 Astra` as `Yes` on Plus and `Expanded` on Pro. The card implies exclusivity; the table says access differs only in degree.

**A stale reference** `[observed]`: the Pro-tiers article, updated "4 hours ago" at harvest, says "The ChatGPT Pro plan includes access to **GPT-5** and legacy models" — naming a generation that the pricing page no longer lists as a current model and that the help centre elsewhere documents as partly deprecated (`Retiring GPT-4o and other ChatGPT models`, deprecation dated 2026-02-13). A recently-updated article carrying an out-of-date model name is exactly the staleness risk this corpus should flag.

### Feature terminology

| Term | Note |
|---|---|
| `GPTs` | Custom assistants. Now in withdrawal: `Custom GPT retirement and migration FAQ`, and "New GPT creation and publishing are not available on personal ChatGPT accounts" |
| `Plugins` | Revived label — nav item, feature row, and help articles (`Plugins in ChatGPT and Codex`), alongside `Connected apps` and `Apps with Sync` for overlapping concepts |
| `Apps` / `Interactive apps` / `Apps with Sync` / `Connected apps` / `Connectors` | **Five "app" labels** for adjacent concepts, across nav, matrix and help |
| `Skills beta` | Matrix row carries the beta tag *in the feature name* |
| `Projects` / `Shared projects` | |
| `Canvas` | Not present in this harvest — absent from nav, matrix and the ChatGPT collection |
| `Codex` | Coding surface; also a plan-comparison row and a separate pricing page |
| `Study mode` / `Study Mode` | Casing differs between the nav (`Study Mode`) and the matrix and help article (`Study mode`, `Using study mode in ChatGPT`) |
| `Deep research` / `Deep Research` | Same casing split — `Deep Research` in nav, `Deep research` in matrix |
| `Memory` / `Improved Memory` / `legacy saved memories` / `Saved memories` / `Memory summary` / `Memory sources` | Six memory nouns; the article has to define the relationships between them |
| `Temporary chat` | Well-named; behaviour matches the word |
| `Unpersonalized` | Coined negation (see T5) |
| `Usage credits` / `credits` / `Gifting credits` | |
| `Trusted contact` | A person-shaped safety feature with its own four-article collection |
| `Lockdown Mode` | Named after the Apple feature; scope line names the threat: "reduce data exfiltration risk from prompt injection attacks" |
| `Luna Reserve` | Capacity mechanism named after a model codename — a third use of `Luna` |
| `Characteristics` / `Personality` | Two separate articles (`Characteristics in ChatGPT`, `Customizing Your ChatGPT Personality`) for adjacent settings |

**The register split** is the opposite of Wise's. Wise uses the long form in marketing and the short form in help. ChatGPT uses the *shorter, title-cased* form in marketing (`Deep Research`, `Study Mode`) and the longer sentence-cased form in help (`Deep research`, `Using study mode in ChatGPT`). Both are defensible; neither is applied consistently within its own surface.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout. The company is `we` in policy and help ("we may use your content", "We assume the very best of our users", "we're temporarily pausing"), but switches to the third person `OpenAI` inside the same articles ("OpenAI uses guardrails", "OpenAI Support does not reset… usage limits", "OpenAI may retain logs"). The alternation appears to track formality — `we` for intent and commitment, `OpenAI` for enforcement and refusal — which distances the company from its own no. `ChatGPT` is used as a third-person actor with agency ("ChatGPT decides which available information is relevant", "ChatGPT will notify you", "ChatGPT displays the reset time"), so three grammatical persons are in play in a single article.

**Register.** Flat, declarative, unornamented. Contractions used ("we don't", "you'll", "isn't"). **No exclamation marks and no `Oops!` anywhere in this harvest** — the register discipline is real and consistent. Sentences in the help centre are short and often single-clause, and procedures are numbered.

**The register breaks once, deliberately, and it is the most interesting copy in the file.** `What to expect when models change` abandons the flat register for something close to a condolence note:

> "These model transitions can sometimes feel disruptive."
> "…we understand that some people grow accustomed to a particular model's conversational style or way of responding. When a familiar experience changes or ends, that adjustment can feel frustrating or disappointing—especially if it played a role in how you thought through ideas or navigated stressful moments."
> "If you notice that this transition is affecting you emotionally and you need additional support, resources are available, including crisis support in ChatGPT."

A **deprecation notice that routes to a crisis line** is, so far as this corpus records, unique. It is a content designer's response to a genuinely new problem: users form attachments to a model persona, and retiring it is a bereavement event for some fraction of them. The article validates the feeling twice before explaining the mechanism, names the mitigation (context carries over, "While tone or style may change, that retained context helps the conversation remain attentive"), and only then closes on the business rationale. The sequencing — feeling, mitigation, rationale — inverts the usual deprecation-notice order.

Two criticisms of it. First, it never names the models being retired or links the article that does (`Retiring GPT-4o and other ChatGPT models`), so the user with a practical question leaves empty-handed. Second, "Your experience matters to us" is the one hollow sentence in an otherwise specific piece.

A sibling article extends the pattern: `Adapt to new model personas after deprecations` exists in the Claude help centre for the same problem (see the Claude file) — two competitors independently shipping model-bereavement content is a signal about the category, not about either company.

**Accessibility** `[observed]`

- `Skip to main content` is present and first in DOM on `openai.com`. **It is absent from `chatgpt.com`** — the marketing and pricing pages that carry the purchase decision have no skip link in the served HTML, while the policy pages do. Two sites, one brand, different accessibility baselines.
- **The pricing comparison matrix is the significant accessibility finding.** Every cell carries a redundant text label of the form `Plan: Free, Feature: Everyday text chats, Unlimited*`, repeated for ~70 rows × 4 columns. This appears to be a deliberate screen-reader accommodation for a wide grid — each cell announces its own row and column context rather than relying on header association. It is defensible and arguably generous. But the same text is present for `Yes`/`No` cells as `Plan: Free, Feature: Access on web, iOS, Android, Yes`, which means a screen-reader user hears roughly 280 such strings in sequence. The accommodation is real; the volume makes it close to unusable. Recorded as an ambitious attempt with a bad outcome rather than as neglect.
- Hero and card images carry descriptive, scene-level alt text: "ChatGPT app showing a sustainable materials research workflow", "Prompt to design a modern community farmers market flyer, overlaid on a generated green poster featuring colorful produce and event details.", "Plugin menu listing Gmail, Google Drive, Slack, Notion, and Outlook, with one plugin connected." These are unusually good — they describe *what the screenshot demonstrates*, not just what is depicted.
- Several decorative SVGs (`star-large-light.svg`, `merge-chat-shape.svg`) carry **empty alt but are still emitted as image elements** in the served markup, and the hero's chat-scribble PNG likewise has empty alt. Correct practice for decoration.
- **Duplicated hero content**: the `Chat` / `Work` / `Codex` block and its images appear twice in the DOM (responsive variants), so the three scope lines and their alt text may be encountered twice. Flagged as suspected, not confirmed — CSS handling was not inspected.
- The help centre has `Was this article helpful?` with a `Submit` button and no visible input control in the server HTML; the rating widget is client-rendered, so keyboard/screen-reader behaviour was not assessable.
- The Free Tier FAQ's screenshot alt text (see T9) is better written than the surrounding body copy and is the only textual record of two in-product notices.

**Negative findings, recorded honestly**

- No accuracy or hallucination disclaimer on any public marketing, pricing or policy surface (T10).
- Three mutually inconsistent enumerations of "the paid plans" on the pricing page (T12).
- `Get Plus` resolves to two different URLs on one page (T3).
- `Download the app` (hero) vs `Download app` (page foot) (T3).
- Three bare `Learn more` links with three destinations on the overview page (T3).
- `Contact sales` / `Contact our team` / `Contact our sales team` in adjacent FAQ answers (T3).
- `We detect suspicious activity.` and `Unusual Activity Detected` as two strings for one condition (T7).
- `Study Mode`/`Study mode` and `Deep Research`/`Deep research` casing splits between nav and matrix (T13).
- `Pro` as both a plan name and a model suffix, colliding at the purchase decision (T13).
- A four-hours-old help article naming `GPT-5` as the Pro plan's model while the pricing page lists GPT-6 and GPT-5.6 variants (T13).
- `Terms of Use` points to two different documents depending on which site's footer you use (T1).
- `ChatGPT Sites` is the only help collection with no scope line (T1).
- `Troubleshooting Model Feature Access Issues` has a third-person scope line in a second-person help centre (T7).
- Duplicate `What is ChatGPT?` / `What is ChatGPT: FAQ` articles in different collections (T11).
- Stray italic markers mid-sentence in the nonprofit FAQ answer (T12).
- Escalation path asks consumers for a HAR file with no plain-language alternative (T7).
- Suspected asterisk-count mismatch between the matrix footnote markers (`***` on two rows) and the footnote text (`****`). Flagged as suspected — the markdown conversion may have mangled emphasis markers.

---

## Transferable patterns

1. **Dual-unit disclosure for abstract quantities.** Publish the technical figure and the human-scale equivalent in the same cell: `54K` / `~40 pages of text`. Any product that exposes a limit the user cannot intuit — storage, tokens, API calls, transaction caps, statement retention — should do this. The condition: the human-scale unit must be honestly approximate and marked as such (`~`), or it becomes a new promise.

2. **State the carve-out twice: once in the body, once as the only FAQ.** The single most counter-intuitive consequence of the training opt-out (thumbs-up/down overrides it for the whole conversation) is promoted out of the body into the FAQ slot. Applies wherever a control has one surprising exception — the exception deserves its own addressable heading, not a subclause.

3. **Put data-use posture in the plan comparison grid.** `Content is used to train our models → Opt-out available`, at the same weight as any feature row. This converts a policy the user must go and find into an attribute they compare while deciding. Directly transferable to any product where data handling varies by tier.

4. **Hedge in the verb, not in the footnote.** `Explore` health questions and get `practical guidance`; `Ask about` financial `concepts` and `market context`. The regulated-adjacent categories are bounded by word choice, with no visible disclaimer. Cheaper, less alarming, and more honest than an asterisk — but only when the surrounding claims are also modest, otherwise the hedge is invisible.

5. **Sentence-stem grouping labels.** `ChatGPT for` → `Students` / `Teachers` / `Parents`. The heading completes into each item, so the menu reads as sentences. Cheap to implement, scales well. Condition: apply it exhaustively, or the items that escape the stem (here, `ChatGPT for PowerPoint` filed under `Ways to Use`) break the pattern for everyone.

6. **Publish withdrawal as first-class help content.** `Retiring GPT-4o and other ChatGPT models`, `Custom GPT retirement and migration FAQ`, `What to know about the Sora discontinuation`. Most products silently drop capabilities. Naming the retirement, dating it, and writing a migration path is a content-ops commitment worth arguing for.

7. **Deprecation copy that acknowledges attachment.** `What to expect when models change` validates the loss before explaining the mechanism, and routes to support for users affected emotionally. Transferable to any sunset of a long-lived, habitual interface — but only where the attachment is real. Used cynically, it reads as manipulation, and the article's one weak line ("Your experience matters to us") shows the edge.

8. **Version your policy and let users subscribe to it.** An 11-entry dated changelog in plain language, plus a form to be notified of updates. A policy treated as a living artefact rather than a wall.

9. **Answer the unaskable question with one word.** `Can Support reset my usage limits?` → "No." Then explain. The refusal comes first and the reasoning second, which respects the reader who only needed the answer.

10. **Separate the two states the user will conflate.** "Reaching a model's allowance does not by itself mean that your account was restricted or that your subscription ended." Wherever a benign limit and a punitive suspension produce similar surface symptoms, write the sentence that tells them apart.

## Caveats & gaps

- **No in-product strings were observed.** Everything in T5-T9 is `[documented]` from help-article prose or from image alt text. The composer-adjacent accuracy disclaimer, the actual limit-reached notice strings, model-picker labels, empty states and toasts all require an authenticated pass.
- **The pricing page rendered no prices.** Plan cards show "/ month" with the numeral absent from server HTML. **No consumer price is recorded in this file from the pricing page.** The only prices recorded (`$200`, `$100`) are the ones embedded in the tier *names* on the help article. Do not read plan pricing out of this file.
- **`status.openai.com` did not return.** The fetch aborted with no body. No incident-communication vocabulary was harvested. Recorded as blocked; the status page is linked from the foot of every help page and would be the natural T9 source.
- **Model names and usage allowances are volatile.** The eight model names, the `Pro $100`/`Pro $200` split and the subscription pause are all dated to this harvest (2026-09-22) and several help pages were updated within hours of it. Treat every model name, tier name and multiplier in T13 as a point-in-time observation. The `GPT-5` reference in a four-hour-old article is direct evidence that OpenAI's own pages do not stay in sync.
- **Article bodies were opened for six articles only**; the remaining ~75 in the ChatGPT collection are recorded as titles and scope lines. Titles are high-signal for IA and task phrasing and say nothing about answer structure.
- The `Business`, `Enterprise`, `Edu`, `Codex`, `Atlas` and `ChatGPT Ads` surfaces are unharvested, as are 13 of the 15 help collections.
- No accessibility statement was located for ChatGPT specifically; `openai.com` has no accessibility link in the footer columns observed. Recorded as not found rather than absent.
- Mobile and desktop app store copy is out of the public web surface and was not harvested.
- The pricing matrix contains roughly 30 consecutive rows reading `No` across all four individual plans (the entire `Security & Administration` and `Customer Service` blocks). Whether this is a rendering artefact of the Individual/Business toggle or genuinely served content could not be determined from the server HTML; it is recorded as observed but flagged as possibly a toggle-state artefact.

## Sources

1. https://chatgpt.com/overview/ (reached via https://openai.com/chatgpt/overview)
2. https://chatgpt.com/pricing/ (reached via https://openai.com/chatgpt/pricing)
3. https://openai.com/policies/usage-policies/
4. https://help.openai.com/en/
5. https://help.openai.com/en/collections/3742473-chatgpt
6. https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance
7. https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers
8. https://help.openai.com/en/articles/7996703-troubleshooting-chatgpt-error-messages
9. https://help.openai.com/en/articles/20001053-what-to-expect-when-models-change
10. https://help.openai.com/en/articles/8590148-memory-in-chatgpt
11. https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq
12. https://status.openai.com — attempted, blocked, no body returned
