# 164. Google Gemini

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Multimodal LLM assistant / platform-embedded AI (consumer assistant bundled into an OS, browser, search engine and productivity suite) |
| Primary URL | https://gemini.google.com/ |
| Corpus rank | 164 |
| Benchmark strength (source list) | Multimodal task prompts and feedback |
| Locale / market observed | en-US (US region selector active on `gemini.google`; `one.google.com` served US pricing) |
| Platform observed | Web (marketing, pricing, help centre, policy). Desktop/"Computer" help variant unless noted |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR / UK GDPR (legal-bases section published; Google Ireland Limited as EEA+CH controller, Google LLC elsewhere); EU/UK/EEA age floor of 18 for paid plans; DSA-style "Report legal issue" route; C2PA / Content Credentials conformance; no financial or health regulator named — instead an explicit *anti*-regulatory-reliance disclaimer ("Don't rely on Gemini Apps for diagnosis, treatment, medical advice, or legal, financial, or other professional help") |
| Harvest date | 2026-09-22 |
| Pages inspected | 17 |
| Harvest completeness | Partial — all in-product UI is auth-gated; every UI string below is `[documented]` from help articles rather than observed. `gemini.google.com/about` returned an auth-gated empty shell. Marketing, pricing, help IA and policy surfaces fully reachable |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Gemini overview (explainer) | https://gemini.google/overview/ | Signed, dated capability-and-limitations explainer; six named limitations; four-stage "how it works"; contains a leaked `localhost:4007` link |
| Subscriptions / pricing | https://gemini.google/subscriptions/ | Four plan cards with prices, feature lists, 3-question FAQ, 9 footnotes |
| Google AI plans (Google One) | https://one.google.com/about/google-ai-plans/ | Second, competing pricing surface for the same plans; different CTA strategy, different model names |
| Gemini web app (marketing shell) | https://gemini.google.com/about | **Blocked** — auth-gated shell, body is `Sign in` plus tag-manager noscript. Only meta description usable |
| Help centre home | https://support.google.com/gemini/ | 13 topic categories + `Popular articles`; the full IA |
| Use Gemini Apps | https://support.google.com/gemini/answer/13275745?hl=en | Richest single source of in-product string names, model descriptions, example prompts, signed-out limits |
| Gemini Apps limits & upgrades | https://support.google.com/gemini/answer/16275805?hl=en | Usage-limit model, context windows, feature-availability matrix, model table |
| Learn about responses from Gemini Apps | https://support.google.com/gemini/answer/16279220 | The hallucination article; six-bullet responsible-use list |
| View related sources | https://support.google.com/gemini/answer/14143489?hl=en | Citation and `Sources` panel behaviour |
| Send feedback or report a problem | https://support.google.com/gemini/answer/13275746?hl=en | `Good response` / `Bad response`, `Report legal issue` |
| Gemini Apps Privacy Hub | https://support.google.com/gemini/answer/13594961 | Privacy Notice + ~35-question FAQ; retention periods; human review; Keep Activity |
| Verify AI-generated media | https://support.google.com/gemini/answer/16722517?hl=en | SynthID and Content Credentials vocabulary, result states, error states |
| Malicious content & prompt injection | https://support.google.com/gemini/answer/16188217?hl=en | The only article describing a blocking/warning state |
| Personalization with memory of past chats | https://support.google.com/gemini/answer/16598469 | `Memory` toggle, correction/deletion model |
| Customize Gemini's responses with your instructions | https://support.google.com/gemini/answer/16598625?hl=en | `Instructions for Gemini`, locale-divergent label |
| An overview of the Gemini app (help) | https://support.google.com/gemini/answer/17216260?hl=en | **Stub** — article body is one link repeating its own title |
| Generative AI Prohibited Use Policy | https://policies.google.com/terms/generative-ai/use-policy | Four numbered prohibitions; last modified December 17, 2024 |

---

## T1 Navigation & IA labels

**Three unrelated top-level navigations for one product** `[observed]`

Gemini has no single site. It has a marketing site (`gemini.google`), a pricing site owned by another business unit (`one.google.com`), a help centre (`support.google.com/gemini`), and a policy site (`policies.google.com`) — each with its own nav grammar and none of which links to the others' nav.

Marketing nav (`gemini.google`): `For Students` · `Features` · `Explore` · `Subscriptions` · `What's New`, with `Try Gemini` as the persistent CTA.

`Features` expands to ten items, all **noun phrases naming a capability, not a task**:
`Gemini Live` · `Image Generation` · `Video Generation` · `Music Generation` · `Deep Research` · `Gemini Spark` · `Personal Intelligence` · `Daily Brief` · `Canvas` · `Gemini in Chrome`

This is the inverse of the Wise pattern (verb-first task names). Gemini names the *thing it built*; the user has to infer the job it does. `Personal Intelligence` in particular is a settings surface, not a feature, and the name gives no clue.

**The footer has six capabilities the nav doesn't** `[observed]`

Footer group `What Gemini Can Do` carries sixteen items — the ten above plus `Storybook`, `Apps`, `Gems`, `Long Context`, `Students`, `Import your memory`. `Gems` — arguably the product's best-known coined feature — is reachable from the footer but not from the `Features` menu. Footer groupings: `What Gemini Can Do` · `About Gemini` · `Social Media`.

`About Gemini` contains `Overview` · `Our Approach` · `Policy Guidelines` · `Gemini Drops` · `Latest News` · `Subscriptions` · `Release Notes` · `Gemini for desktop` · `YouTube`.

**Google One nav** `[observed]`: `Overview` · `Google AI` · `Plans & Pricing`, CTA `Sign up`. Note `Plans & Pricing` here versus `Subscriptions` on the Gemini site — two labels, one concept, two Google properties.

**Help centre header nav — Privacy promoted to a peer of Help** `[observed]`

`Help Center` · `Community` · `Privacy Hub`

Putting `Privacy Hub` in the primary help nav on every article page is a genuinely unusual IA decision and the strongest signal in the file about where Google expects consumer anxiety to sit. It sits above the fold on a page about changing your voice.

**Help centre top level — thirteen categories** `[observed]`

| # | Category (verbatim) |
|---|---|
| — | `Popular articles` |
| 1 | `Get started with Gemini Apps` |
| 2 | `Use the Gemini mobile app` |
| 3 | `Create, learn & research with Gemini Apps` |
| 4 | `Use Connected Apps & other integrated services in Gemini Apps` |
| 5 | `Manage your tasks with Gemini Spark, schedules & skills` |
| 6 | `Create, use, & share Gems` |
| 7 | `Set up & control personalization in Gemini Apps` |
| 8 | `Use Gemini Apps with a work or school Google Account` |
| 9 | `Double-check, modify, or share responses & more` |
| 10 | `Change your settings` |
| 11 | `Use Gemini in other Google products` |
| 12 | `Fix a problem` |
| 13 | `Privacy & security` |

Analysed in T11.

**Platform tabs at article foot** `[observed]`: `Computer` · `Android` · `iPhone & iPad`. "Computer" is the user-facing word; the URL parameter behind it is `GENIE.Platform=Desktop`. The plain word won at the surface and the engineering word survived in the query string — a small, clean example of register split between UI and system.

## T2 Value proposition & headline patterns

**The flagship explainer's H1 is a document label, not a proposition** `[observed]`

> `An overview of the Gemini app`

This is the headline of `gemini.google/overview/`, the page linked from the help centre as the answer to "what is Gemini". It is a filing label. Compare the meta description on the auth-gated app shell, which does carry a proposition: "Meet Gemini, Google's AI assistant." (`gemini.google.com/about`, meta only — never rendered as visible copy in the fetched page).

**In-page anchor labels do not match the section headings they point to** `[observed]`

| Anchor label | Actual section heading |
|---|---|
| `Limitations` | `Known limitations of LLM-based interfaces like Gemini` |
| `What's next` | `How we're continuing to develop Gemini` |

The anchor is blunt and the heading is softened. The softening happens at exactly the two points where the page admits weakness: "Limitations" becomes "limitations of LLM-based interfaces *like* Gemini" — the class absorbs the blame for the instance. Worth recording as a deliberate, and slightly evasive, headline pattern.

**Capability framing: three C-words, all hedged** `[observed]`

`Productivity` · `Creativity` · `Curiosity`

Every claim under them carries a modal: "Gemini can save you time", "Gemini can also help bring your ideas to life", "it can explain a complex concept simply". Then: "Of course we rigorously train and monitor Gemini so that its responses are **likely** to be reliable" — the hedge is applied even to the reassurance. This is the most disciplined non-overclaiming copy in the corpus so far.

**And it is completely abandoned one URL away** `[observed]`

On `gemini.google/subscriptions/`, the same company writes:

> "Just describe it and Gemini will create it."

Unhedged future indicative, no modal, no caveat, no footnote. Also on that page: `Your ideas generator` · `Your study partner` · `Your code generator` · `Your budget planner` as rotating carousel captions — Gemini as a possessive noun the user owns, not a tool that "can help".

**This is the central finding of the file.** Gemini maintains a rigorous, hedged, limitation-forward voice on its explainer and help surfaces and an unhedged, superlative, deterministic voice on its pricing surfaces, and the two are 20 words apart in the same footer. The hedging discipline is not a house style; it is a property of the *team that owns the page*.

**Plan value sentences — parallel construction, escalating adverb** `[observed]`

| Plan | Sentence (one.google.com) |
|---|---|
| `Google AI Plus` | "Unlock essential tools to boost productivity with 2x access* to Gemini" |
| `Google AI Pro` | "Create faster and get more done with 4x access* to Gemini" |
| `Google AI Ultra` | "Accelerate your workflows with up to 20x access* to Gemini" |

The multiplier does the differentiating; the verb phrase is decoration. Note "access" is being used as a countable quantity ("2x access"), which is not English — the underlying metric is usage limits, and the page will not say so in the headline.

**Benefit-group labels — imperative verb + object, until they run out** `[observed]`

`Boost productivity` · `Unleash creativity` · `Study smarter` · `Code faster` · `And more`

Four disciplined imperatives, then `And more`, which is a list-continuation marker wearing a category label's clothes. `And more` contains cloud storage, family sharing and the Google Home bundle — i.e. everything that isn't AI. The taxonomy is "AI benefits, plus the legacy Google One product we're now selling through this page".

**Hero headlines** `[observed]`
- `Power your everyday with a Google AI plan` (one.google.com)
- `Get more out of Gemini` (subscriptions), subhead: "Not on a paid plan yet? Choose an option below to unlock Gemini Omni, Daily Brief, and more."
- `Discover a universe of possibilities` (one.google.com section header) — the one place in the whole harvest that reaches for a slogan, and it says nothing.
- `Get access to Google's most capable AI models` / `Tackle your most complex projects with Gemini Pro and Ultra`

**Control language inside a capability claim** `[observed]`

> "Gemini Spark is your 24/7 personal AI agent that helps you navigate your digital life, takes action on your behalf, and **is under your direction**."

The reassurance is welded into the value sentence rather than footnoted. For an agentic feature this is the right structural choice — the user reads the risk and the mitigation in one breath — even though the marketing page never repeats the privacy notice's much blunter version of the same point ("Supervise Gemini's web browsing and tasks closely and interrupt if needed").

## T3 CTA inventory

| CTA (verbatim) | Surface / context | Notes |
|---|---|---|
| `Try Gemini` | Marketing nav, persistent | Deep-links to mobile app download, not the web app — label says "try", destination says "install" |
| `Get started` | Subscriptions, **all four** plan cards | Same label on Free, Plus, Pro and Ultra cards, pointing to three different destinations. The one place a differentiating label matters most |
| `Get Plus` / `Get Pro` / `Get Ultra` | one.google.com plan cards | The *other* Google pricing page solves the identical problem correctly. Two Google-owned pricing pages, opposite CTA strategies, same three products |
| `Sign up` | one.google.com nav | |
| `Sign up for a Google AI plan` | one.google.com hero | |
| `Compare plans` | one.google.com | |
| `View plan benefits` / `Hide plan benefits` | one.google.com plan cards | Paired disclosure toggle; verb changes, object repeats |
| `See offers` / `See student plans` | Student promo banner / section | |
| `Learn more` | one.google.com and subscriptions, **at least 6 occurrences** | Bare, object-less, on benefit cards for Gmail, storage, Notebook, YouTube Premium. Directly contrary to the Wise discipline |
| `Try Gemini Enterprise app` | Foot of both pricing pages | Audience escape hatch. The link's own UTM parameter is `utm_content=escapehatch` — the internal name for the pattern leaks into the public URL |
| `Upgrade your creativity` / `Upgrade your learning` / `Upgrade your productivity` / `Upgrade your development` | Subscriptions section CTAs | Four instances of one template; "upgrade your X" where X is an abstract noun, all going to the same URL |
| `Skip to main content` | Help pages, first in DOM | Two different anchor targets — see T14 |
| `Sign in` | Help header | |
| `Submit feedback` / `Send feedback on...` | Help header | |
| `Post to the help community` | Foot of every help article | **The only contact route offered anywhere.** See T11 |
| `Expand all` / `Collapse all` | Privacy Hub | |
| `Create a request` | Privacy Hub, GDPR objection/rectification | A compliance action styled as a button |

**In-product CTAs, documented not observed** `[documented]`

`New chat` · `Temporary chat` · `Add files` · `Upload Files` · `More Uploads` · `Add from Drive` · `Submit` · `Edit text` · `Update` · `View other drafts` · `Show drafts` · `Copy` · `Sources` · `Good response` · `Bad response` · `More` · `Report legal issue` · `Send` · `Add +` · `Update location` · `Settings & help` · `Usage Limits` · `Menu` · `Edit` · `Delete`

Two defects in that list. **`View other drafts` and `Show drafts` are given as alternatives for the same control in a single sentence** ("click **View other drafts** or **Show drafts**", 13275745) — the help centre is documenting an unresolved A/B or an unmigrated string rather than a real choice. And `Submit` does triple duty: send a prompt, send feedback, save an instruction. `Send` is used for the general feedback form. Two verbs, four jobs, no rule.

## T4 Onboarding & getting-started

**`What you need` is a standardised module, and it is the strongest pattern here** `[observed]`

Nearly every substantive help article opens with an `## What you need` section listing eligibility as a bulleted precondition list before any instruction. Examples:

- (13275745) "A personal Google Account" / "A work Google Account with a qualifying Workspace edition. You must also be 18 or over." / "A school Google Account. The service must be enabled by your institution's administrator."
- (16598469) "Be 18 or over." / "Sign in with a personal Google Account." / "Have Keep Activity on. This feature isn't available when this setting is off."
- (16722517) "A personal account or qualified Workspace account" / "The latest version of the Gemini App..."

Each bullet is **bolded lead-in + unbolded consequence**, and the consequence is usually a negation. A user can fail out of a feature in three seconds without reading a procedure. Highly reusable.

**"How it works" explains the model, not the journey** `[observed]`

The overview page's four numbered stages are `Pre-training` · `Post-training` · `Responses to user prompts` · `Human feedback and evaluation`. This is a numbered-steps component — the shape users read as onboarding — repurposed to explain an ML pipeline. It works because the fourth stage loops back to the user's thumbs-down, but a user arriving to learn "how do I start" gets a Transformer history instead.

**Example prompts are the real onboarding** `[documented]`

Five inline, then a `More examples` disclosure with eight more. All written as the user's own imperative, in the user's voice, with concrete nouns:

- "Outline my blog post about summer mocktail recipes."
- "Debug this error message: \"FileNotFoundError: [Errno 2] No such file or directory: 'data.csv'\""
- "I love video games and drawing. What are some jobs that I might like when I grow up?"
- "Show my monthly expenses in a pie chart: Rent 1200, Groceries 300, Gas 60, Electricity 80, and Internet 50."
- "Help me finish my art studio tagline: craft, create, and ..."

Note the deliberate spread: professional, technical, adolescent, numeric, playful. The list is doing audience-signalling as much as capability-teaching. Also note the pie-chart example ships raw data inline — it teaches prompt *structure*, not just topic.

**A file-generation onboarding written as prompts, not as a menu** `[documented]`

> "Do research on King Charles Cavalier Spaniels and put it in a doc."
> "Create a spreadsheet for my students' math progress with weekly scores."

Followed by a supported-format list (`Workspace files (Docs & Sheets)`, `.pdf`, `.docx`, `.xlsx`, `.csv`, `LaTeX`, `Plain Text (TXT)`, `Rich Text Format (RTF)`, `Markdown`). The pattern — teach the natural-language affordance first, list the machine constraint second — is right, and worth stealing.

**Numbered procedures are strictly 3–5 steps, and always end with the commit action** (`Click Submit`, `Tap Submit`, `At the bottom, click Send`). No procedure in the harvest ended on a confirmation state, which is consistent with the total absence of observable post-action copy.

## T5 Form & field labels

Almost entirely `[documented]`. Sparse, because the product's primary input is a single unlabelled text box.

| Label | Surface | Notes |
|---|---|---|
| "enter your question or prompt" | Composer instruction | The composer is described, never named. No placeholder string is published |
| `Instructions for Gemini` | Personalization settings | See below |
| `Saved Info` | Same control, "in some locales" | The Privacy Notice writes the field as `Instructions for Gemini ("Saved Info" in some locales)` — a **public admission of unresolved label drift, printed inside a legal notice** |
| `Memory` | Personalization toggle | Capital-M product noun for a setting |
| `Personal Intelligence` | Settings parent node | Container for Memory, Instructions, Connected Apps |
| `Keep Activity` | Activity setting | The single most consequential control in the product |
| `Usage Limits` | Settings sub-page | Title case, unlike neighbouring `Settings & help` |
| `Offensive / Unsafe` | Feedback reason chip | Spaced slash; the only feedback reason published |
| `Standard thinking` / `Extended thinking` / `Deep think` | Thinking-level selector | See T13 on the casing |
| `Add +` | Instruction-creation button | Word plus glyph in the label itself |

**Auto-delete option set** `[documented]`: default `18 months`, changeable to `3 months`, `36 months`, or `indefinite`. Note the set is not monotonic in the obvious way — 3, 18, 36, forever — and the odd one out (18) is the default. A user scanning the options cannot infer the default from the ordering.

**Upload constraints stated as field-level limits** `[documented]`: "file size of 100 MB or less"; "Videos need to be less than 90 seconds each, and audio files need to be less than 1 hour each". Expressed as sentences rather than hint text, because no hint text is published.

## T6 Status & state language

**Usage state is the product's dominant state machine** `[documented]`

`Standard limits` is the name of the free-tier state. Above it: `2x higher than standard limits`, `4x higher than standard limits`, `5x or 20x higher than AI Pro limits depending on your subscription`. Note the Ultra row changes its comparison base mid-table — Plus and Pro compare to "standard", Ultra compares to "AI Pro". A user cannot compute Ultra's multiple against free from the table alone.

The metering unit is named abstractly: "**compute-based usage limits**", then explained by its inputs — "These limits factor in the complexity of your prompt, the models and features you use, and the length of your chat." Refresh cadence: "Your limit refreshes every 5 hours until you reach your weekly limit." A nested two-tier limit stated in one sentence, which is efficient and also the kind of sentence a user has to read twice.

**Degradation is named, not just the failure** `[documented]`

> "If you have a Google AI subscription and reach your limit, you can continue your conversation with Flash-Lite."

The limit state has a *fallback* rather than a wall. Naming the cheaper model as the graceful-degradation path is good state design; wording it as a tip ("**Tip:** If you have a Google AI subscription and hit your limit, you can continue chats with Flash-Lite") demotes it below its importance, and the two phrasings differ ("reach"/"hit", "conversation"/"chats") across two articles.

**Verification result states** `[documented]` — three-valued, with the third value named honestly:

- SynthID watermark **detected** → "all or part of the image or video was created or edited by Google's AI models"
- **not detected** → "it wasn't created or edited by Google AI, **but it could have been created by other AI systems**"
- **unclear**, with two published reasons rendered as quoted strings: "Not enough details to watermark" and "Likely too small an edit"

The negative case refuses to be read as an all-clear. That is the correct and rare choice, and it is stated in the same sentence as the negative result rather than in a footnote.

**Content Credentials error states** `[documented]`: `Incorrectly modified` · `Incompatible or unsupported` · `Unrecognized` — bolded adjective labels, each followed by a mechanism sentence. Adjectival state names (not "Invalid credential 3") are a good pattern for a provenance feature where the fault may be third-party.

**A colour-only state** `[documented]`

> "If the dot is blue, gemini.google.com has access to and is using your precise location. If the dot is gray, gemini.google.com isn't using your precise location."

Location access — a privacy state — is carried by hue alone, with no published text label or icon difference. Recorded as an accessibility defect in T14.

**Temporary chat state** `[documented]`: "When you're in a temporary chat, the temporary chat icon will be at the top of the screen." Again an icon-only persistent state indicator, with no string.

## T7 Error, failure & recovery

**The product's headline failure mode is named, and it is the model itself** `[documented]` — see T10.

**The only documented blocking/warning state is prompt injection** `[documented]`

Article 16188217 describes three outcomes when suspicious content is detected:

- "Gemini Apps provides a warning notification that the content has security risks"
- "Sometimes none of the content can be used to generate a response"
- "Sometimes only some of the content is used to generate a response, with the suspicious content excluded by Gemini"

**The warning string itself is never quoted.** The help centre documents that a warning exists, describes its meaning, and withholds its wording — so a user searching the string they actually saw cannot find this article. That is a real findability defect and a common one.

The partial-exclusion case is the interesting one: Gemini will answer with a silently redacted input set. The help text acknowledges it; nothing in the documented UI says which part was dropped.

**`Fix a problem` contains no fixes** `[observed]`

The help centre's dedicated troubleshooting category has exactly two articles:

1. `Send feedback or report a problem with Gemini Apps`
2. `Manage or delete the Gemini app on your Android device`

The two remedies on offer are *tell us* and *uninstall*. There is no "Gemini isn't responding", no "my chat disappeared", no "why was my prompt blocked", no "response stopped generating". For a product whose own documentation says it "can make mistakes", an empty troubleshooting category is the single starkest negative finding in this file.

**Recovery is reframed as purchase** `[documented]`: "If you reach your five hour or weekly usage limits you can upgrade to a Google AI subscription with higher limits or wait until your model limit is refreshed." Upgrade first, wait second. Compare the honest bit two paragraphs later: "If capacity changes, limits for users without a Google AI plan may be limited before users with a plan." Google states, in plain language, that free users degrade first under load. Unflattering and published — credit where due.

**Recovery for a bad memory** `[documented]` — a genuinely difficult recovery task, well handled:

> "You must complete both steps because: If you only disconnect the app, Gemini might still use the info if it's in a past chat. If you only delete the chats, Gemini might still find the info in the connected app."

Two-step recovery with the failure mode of each half spelled out. This is the best-written recovery passage in the harvest. It is undercut immediately by "While Gemini continues to improve, it might not always get it right" and by "Instructions for Gemini to forget or avoid topics in chats doesn't always work perfectly" — a correction mechanism that documents its own unreliability.

## T8 Empty states

`[absent]` — all first-run, no-data and cleared states are behind authentication and none are quoted in help.

One adjacent construction is worth recording, because it is an *absence explained in documentation instead of in the UI* `[documented]`:

> "If you don't have the Sources button below a response, Gemini Apps didn't provide any links for that particular response."

Placed under a collapsed heading, `Why you might not be able to find the Sources button`. The missing-affordance case gets a whole disclosure section in the help centre and, by implication, zero pixels in the product. For a citation feature this matters: the user cannot distinguish "no sources exist" from "sources failed to load" from "this response type doesn't support sources" without leaving the product.

## T9 Notifications & system messages

**A stale in-article notification banner, in the wrong tense** `[observed]`

Article 16275805 opens with a block literally headed `Notification`:

> "Starting on May 17, 2026 there will be changes to usage limits for Gemini Apps."

Harvested 2026-09-22. The date is four months in the past and the verb is future ("there will be"). Either the change slipped and the notice wasn't updated, or it shipped and the notice wasn't retired. Its `Learn more` points at article 17004136, which is also the destination of the pricing page's footnote 2 on `AI credits` — a concept that appears in neither the limits article nor anywhere else in the harvest. So: a stale banner is the only public pointer to a live billing mechanism.

**Five change-communication surfaces, four names** `[observed]`

`Product updates` (help `Popular articles`, → gemini.google.com/updates) · `Release Updates` (overview page prose, same destination) · `Release Notes` (marketing footer) · `Gemini Drops` (marketing nav and footer) · `Latest News` (marketing nav and footer) · `What's new for Gemini Spark` (help, feature-specific).

The same destination is called `Product updates` on one page and `Release Updates` on another. A user cannot form a mental model of where change is announced.

**Notification behaviour described without strings** `[documented]`

- "Gemini Apps will notify you when you're close to your limit based on your plan's level. When you reach your limit, Gemini Apps gives you another notification that tells you when your limit will refresh."
- "If you reach these limits, the Gemini App will notify you." (verification quota)
- Prompt-injection warning (above)

Three notification systems described, zero notification strings published. Consistent with the auth gate but also with a documentation practice that describes behaviour rather than surfacing copy.

**Proactive, memory-driven suggestions** `[documented]` — a notification class most assistants don't document:

> "Suggest next steps for a project you're working on" · "Offer to help plan a trip you've mentioned" · "Ask if you want help comparing products you've discussed."

Three examples, all framed as offers ("Suggest", "Offer", "Ask") rather than actions. The verb choice is the whole consent posture.

## T10 Disclosures, legal & compliance

**The hallucination sentence, and the fact that there are two of them** `[observed]`

Help centre, article 16279220, under the question heading `Is Gemini able to explain how it works?`:

> "Gemini can hallucinate and present inaccurate information as factual."

Privacy Hub, under `How can I object to the processing of my data...`:

> "LLM experiences (Gemini Apps included) can hallucinate and present inaccurate information as factual."

Same sentence, re-scoped. On the consumer help page the subject is **Gemini**. On the privacy/legal page the subject is **LLM experiences**, with Gemini demoted to a parenthetical. The admission is identical; the party holding it changes with the surface's audience. That is the most instructive single pair of strings in this file.

Both are unusually direct. Neither says "may sometimes produce content that is not accurate". Both use the technical term `hallucinate` without glossing it, and both use the construction "present X as factual", which names the *confidence*, not just the error. Most competitors describe the error and omit the confidence; the confidence is the part that harms users.

**The self-referential limitation** `[observed]`

> "One example is that Gemini can misrepresent how it works, including in response to prompts asking how it was trained or how it carries out various functions (like citing sources, or providing fresh information)."

A product documenting that it is unreliable *about itself*, including about its own citation behaviour — i.e. warning the user that the trust affordance may lie about the trust affordance. Then: "We want to be as transparent as possible about the limitations of LLMs, including providing disclaimers within the Gemini experience."

**Six named limitation categories** `[observed]` (gemini.google/overview/) — each a bold noun label plus one hedged sentence:

`Accuracy` · `Bias` · `Multiple Perspectives` · `Persona` · `False positives and false negatives` · `Vulnerability to adversarial prompting`

`Persona` is the standout: "Gemini's responses might incorrectly suggest it has personal opinions or feelings." An anthropomorphism risk treated as a first-class product limitation with its own section. Also honest on mechanism: "they are neither information databases nor deterministic information retrieval systems" and "LLMs can generate plausible-sounding responses that can at times contain factual errors — not ideal when factuality matters but potentially useful for generating creative or unexpected outputs." Reframing the defect as occasionally a feature is a move worth watching; it is defensible here and would not be in a payments context.

**The professional-advice carve-out is written three different ways** `[observed]`

| Surface | Enumeration |
|---|---|
| 13275745 | "don't rely on responses from Gemini Apps for professional advice" |
| 16279220 | "Don't rely on responses from Gemini Apps as medical, legal, financial or other professional advice." |
| Privacy Notice | "Don't rely on Gemini Apps for diagnosis, treatment, medical advice, or legal, financial, or other professional help. Its output is for informational purposes only." |

Three scopes, three lists, one product. The third adds `diagnosis` and `treatment` — the two words a medical-safety reviewer would insist on — and the first omits every domain. The version a user is most likely to read (the getting-started article) is the weakest.

**Attribution and liability disclaimers** `[observed]`
- "Responses from Gemini Apps don't represent Google's views, and should not be attributed to Google."
- "You are responsible for your use of code generated by Gemini Apps, which may be subject to an open source license."
- "Gemini Apps may provide inaccurate or inappropriate responses about people, so double-check its responses."

The third is the one that matters for defamation exposure, and it is bullet five of six in a list headed `Tips for using Gemini Apps responsibly` — a liability disclaimer dressed as a usage tip.

**Human review, disclosed in full** `[observed]`

- "Human reviewers (including trained reviewers from our service providers) review some of the data we collect for these purposes. *Please don't enter confidential information that you wouldn't want a reviewer to see or Google to use to improve our services, including machine-learning technologies.*" — the warning is italicised in the source.
- "Reviewers assess if Gemini Apps' responses were low-quality, inaccurate, or harmful. They also suggest better responses."
- "Chats are disconnected from your account before being sent to service providers."
- "Reviewed chats are retained for up to three years."
- "Chats reviewed by human reviewers (and related data like your language, device type, location info, or feedback) are not deleted when you delete your activity."

That last one is the disclosure most products bury. Google states plainly that deletion is not total, names the collateral data, and gives the period. It appears twice (Privacy Notice and FAQ) with consistent wording.

**Retention numbers, all `[observed]`**

| Data | Period |
|---|---|
| Gemini Apps Activity, default | 18 months (changeable to 3, 36, or indefinite) |
| Temporary chats / chats with Keep Activity off | 72 hours |
| Context window used to answer in those modes | "the last 24 hours of your chat" |
| Human-reviewed chats + related data | up to 3 years, "disconnected from your Google Account" |
| Feedback + associated conversation | up to 3 years |
| Usage-frequency data | until you delete your Google Account |

The 72-hour figure with its stated reason — "so it is available in case of a potential system failure" — is a good example of a retention period justified by mechanism rather than by "legitimate interest".

**The Keep Activity setting, and its published limits** `[observed]`

> "Even if your Keep Activity setting is off or you use temporary chats, Google still uses your chats to respond to you and help protect Google, our users, and the public, including with help from human reviewers."

The opt-out's boundary is stated in the same breath as the opt-out, twice on the page. Also: "Your Gemini settings don't control processing of your chats to create anonymized data to improve Google services." Also: "Temporary chats are not used to train Google's AI models." Three separate carve-outs, three separate places. A reader has to assemble the actual guarantee from fragments — but every fragment is there.

**A negative commitment with a change promise** `[observed]`

> "Your Gemini Apps chats are not being used to show you ads. If this changes, we will clearly communicate it to you."

Present-tense denial plus an explicit undertaking to announce reversal. Rare, quotable, and structurally better than a silent present-tense claim.

**Agentic-risk disclosure** `[observed]`
- "Take care when using these features since Gemini can make mistakes, like making purchases or sharing your data with third parties unexpectedly."
- "Supervise Gemini's web browsing and tasks closely and interrupt if needed."
- "Google does not monitor or secure data from custom third-party Connected Apps. Choosing to connect them may expose your data, passwords, devices, and accounts to unauthorized access."
- Canvas: "Be cautious and only share data with Canvas apps you trust."

The purchase example is notable: Google names *unauthorised spending* as a concrete consequence of its own agent's error, in a privacy notice, without hedging. Meanwhile the marketing page for the same capability says only "is under your direction."

**Prohibited-use boundary** `[observed]` — four numbered top-level rules, each an imperative "Do not…", each expanded into sub-clauses introduced by "This includes generating or distributing content that:":

1. `Do not engage in dangerous or illegal activities, or otherwise violate applicable law or regulations.`
2. `Do not compromise the security of others' or Google's services.`
3. `Do not engage in sexually explicit, violent, hateful, or harmful activities.`
4. `Do not engage in misinformation, misrepresentation, or misleading activities.`

Then an escape valve: "We may make exceptions to these policies based on educational, documentary, scientific, or artistic considerations, or where harms are outweighed by substantial benefits to the public."

Two clauses deserve flagging for transferability. 1.8 prohibits automated decisions "that have a material detrimental impact on individual rights without human supervision in high-risk domains — for example, in employment, healthcare, finance, legal, housing, insurance, or social welfare" — an AI-Act-shaped clause written in plain English. And 4.5 prohibits "Misrepresenting the provenance of generated content by claiming it was created solely by a human, in order to deceive" — a provenance rule that pairs directly with the SynthID feature. Most of the sub-clauses end "in order to deceive", making intent, not content, the test.

**Staleness of the policy** — "Last Modified: December 17, 2024", twenty-one months before harvest. It governs `Gemini Spark`, `Chrome auto browse`, `Project Genie`, `screen automation` and remote-browser agents, none of which existed at that date and all of which raise obligations (acting on a user's accounts, browsing on their behalf) the four rules do not address. Flagged as a real gap, not a formatting nit.

**Corporate entity and territory** `[observed]`: "Gemini Apps are provided by Google Ireland Limited in the European Economic Area and Switzerland and by Google LLC everywhere else." EU/UK legal bases are enumerated as `Performance of a contract`, `Google and third parties' legitimate interests with appropriate safeguards to protect your privacy`, `Legal obligations`, `Your consent` — with consent scoped explicitly to `Voice Match`, `Memory`, and audio/Live recording improvement, and a stated right of withdrawal.

**Age gating contradicts itself across surfaces** `[observed]`

| Source | Claim |
|---|---|
| 16275805 | "To use Gemini Apps with a Google AI plan in most countries, you must be 13 (or the applicable age in your country) or over." |
| 16275805 | "…in the European Economic Area, Switzerland, or the United Kingdom, you must be 18 years of age or older." |
| gemini.google/subscriptions legal strip | "Google AI plans and Gemini for Gmail, Docs, and more are only available for ages 18+." |
| subscriptions FAQ | "Our Google AI Pro plan is available for over 18 users" |
| subscriptions footnote 1 | "Certain AI benefits are only available for those aged 18+." |

The help centre says 13+ for paid plans outside the EEA/CH/UK; the pricing page says 18+ globally with no territorial qualifier. These cannot both be right, and the one a purchasing user reads is the pricing page. Also note the ungrammatical "available for over 18 users".

**Billing disclosure** `[observed]`: "Cancel anytime. No refunds for partial billing periods, except as required by applicable law." Terse, complete, and buried in a grey legal strip beneath nine footnotes.

**Asterisk semantics conflict** `[observed]`: one.google.com marks all three multipliers with `*` resolving to "* In comparison to non-AI subscribers", so Ultra reads as "up to 20x" versus free. The subscriptions page states "$199.99 / month: 20x higher usage limits vs. AI Pro", and the help centre agrees ("5x or 20x higher than AI Pro limits"). So the same "20x" is anchored to two different baselines on two Google pricing pages. Since AI Pro is itself 4x free, the two readings differ by a factor of four. This is the most materially misleading inconsistency found.

## T11 Help-centre architecture

Two levels: 13 topic categories → flat article lists. No third level, no scope sentences under category names (contrast Wise, where the scope line carries the routing).

**`Double-check, modify, or share responses & more` — analysed** `[observed]`

This category name is the most interesting IA artefact in the file, and it does not survive contact with its contents.

*What's right:* it is verb-first, and the **first verb is `Double-check`**. An AI assistant putting *verify my output* ahead of *reuse my output* in its own information architecture is a real editorial position, and it matches the repeated in-body instruction "double-check responses" (13275745) and "so double-check its responses" (16279220). The verb is consistent across three surfaces, which is how you know it is a deliberate term and not a coincidence.

*What's wrong:* the five articles underneath are

1. `View related sources from Gemini Apps`
2. `Regenerate or modify responses from Gemini Apps`
3. `Share your chats from Gemini Apps`
4. `Export responses from Gemini Apps`
5. `Learn about responses from Gemini Apps`

Only #1 serves `Double-check`. #2 serves `modify`, #3 serves `share`, and #4 and #5 are the `& more`. The article containing the hallucination disclosure — the most safety-critical text Google publishes about this product — is #5, **last**, under the flattest possible title (`Learn about responses from Gemini Apps`), which is indistinguishable from a marketing explainer and carries no signal of its contents.

So the category heading promises scepticism and the article titles retreat from it. A user who wanted the "can I trust this" article would click #1 (sources), find a mechanical explanation of a side panel, and leave. The fix is one word in a title.

Note also that `& more` appears in two of thirteen category names (`Double-check, modify, or share responses & more`, `Use Connected Apps & other integrated services in Gemini Apps`) — a catch-all suffix doing the work a fourth verb should do.

**Three comma policies in three adjacent category names** `[observed]`

- `Create, learn & research with Gemini Apps` — no serial comma, `&` conjunction
- `Create, use, & share Gems` — serial comma *and* `&`
- `Double-check, modify, or share responses & more` — serial comma, `or` conjunction, then `&`

Three variants, one help centre, one screen. `&` is otherwise the consistent house conjunction in headings (`Privacy & security`, `Change your settings`, `Fix a problem`, `Quizzes & flashcards`, `Manage & delete your activity`).

**Article-title grammar — six shapes** `[observed]`

| Shape | Example |
|---|---|
| Imperative verb-first | `Use Gemini Apps` · `Generate videos with Gemini Apps` · `Verify AI-generated images, videos, and audio` |
| `Get started with …` | `Get started with the Gemini mobile app` · `Get started with Gems in Gemini Apps` |
| `Learn about …` | `Learn about responses from Gemini Apps` · `Learn about generative AI` |
| `What you need / What you can do` | `What you need to sign in to Gemini Apps` · `What you can do with your Gemini mobile app` |
| `Where you can …` | `Where you can use the Gemini web app` |
| Declarative sentence (**one only**) | `How Gemini Apps help protect users from malicious content & prompt injection` |

The single declarative title is the security article — the one place Google states a claim rather than naming a task. And there is one orphan shape: `An overview of the Gemini app`, the only indefinite-article noun-phrase title in the centre, which is also the stub described below.

**A help article whose body is a link to its own title** `[observed]`

`An overview of the Gemini app` (answer/17216260) renders as an H1 followed by exactly one line: the same text, hyperlinked to `gemini.google/overview/`. It is listed in `Popular articles`. A published, indexed, zero-content help article — the clearest single defect in the harvest, and a redirect that was implemented as a page.

**Zero human contact routes** `[observed]`

Every article ends with:

> `Need more help?` → `Try these next steps:` → `Post to the help community` ("Get answers from community members")

That is the entire escalation ladder. There is no `Contact us`, no chat, no email, no phone, for a product with paid tiers up to $199.99/month. Compare the Wise ladder (personalised support → self-service → contact us). Gemini's ladder terminates at *other users*. For a $200/month subscription this is the file's second-starkest negative finding.

**Progressive disclosure via question-shaped collapsed headings** `[observed]` — the best micro-pattern in the help set. Collapsed sections are labelled with the question the user would ask, not the content's topic:

`Why you might not be able to find the Sources button` · `What you can't do with a temporary chat` · `How to tell if you're close to a limit & when it refreshes` · `What you can do when you reach a usage limit` · `Usage limit changes` · `Why you might want a larger context window` · `What Gemini Apps features are not available when signed out?` · `How you can control what's shared with reviewers`

Note the mix: most are declarative fragments, a few carry question marks. Inconsistent punctuation, consistent stance.

**Routing furniture** `[observed]`: every article carries a numbered sibling list (`1 of 18`, `2 of 18`…) exposing the full topic contents at the foot of each article — a cheap, effective "where am I in this topic" device that most help centres omit.

**Typos found** `[observed]`: "Learn more about availalble subscriptions" (16275805); "What happens to my data when when I use Notebooks in Gemini?" (Privacy Hub table of contents). Both in high-traffic articles.

## T12 FAQs

**Pricing FAQ — three questions, all selling** `[observed]` (`gemini.google/subscriptions/`, heading `Frequently asked questions`)

| # | Question (verbatim) |
|---|---|
| 1 | What is Google AI Pro? |
| 2 | What is Google AI Ultra? |
| 3 | Will Google AI Pro work in the Gemini mobile app? |

Three. Two are "what is this product" (answered as feature lists, not definitions) and one is a compatibility check. **There is no question about what happens when you hit a limit, how to cancel, what data the plan changes, or why you'd choose Plus over Pro** — even though the page sells four tiers and the help centre has substantial answers for all four. The FAQ block is positioned after the plan cards and functions as a second pass at the pitch. Compare Wise's twelve questions opening on a live regulatory change: that FAQ absorbs doubt, this one amplifies desire.

Q3's answer is worth noting for its honesty: "Yes, however, there might be some feature differences between the Gemini mobile app and Gemini web app." Concede-then-qualify inside a two-word answer.

**Privacy Hub — the real FAQ, ~35 questions** `[observed]`

Structured under `Privacy questions` with sub-groups `General`, `Location & other permissions information`, `Uploads`, `Connected Apps in Gemini`, `Gemini Spark`, `Gemini Live`, `Gemini in Chrome`, `Screen automation in Android apps`, `Shopping`, `Gems from Google Labs`, `Imported data from other AI platforms`, `Notebooks`, `Avatars`, `Canvas`, `Gemini on macOS`, `Terms of service`.

Selected questions verbatim:

- `What are Gemini Apps?`
- `Do you use my Gemini Apps chats to show me ads?`
- `Who has access to my chats, and how does human review improve Gemini for everyone?`
- `How long does Google retain my temporary chats and chats I have when Keep Activity is off, and what does Google do with this data?`
- `What does the Keep Activity setting control?`
- `How can I control whether Gemini Apps use my past chats to personalize my experience?`
- `How does Google handle my data when I use Gemini Apps while signed out?`
- `What happens when you turn off Gemini Spark?`
- `What happens to my data when I add items to the Google shopping cart from Gemini?`

**Two structural observations.**

First, the questions are written in the user's first person (`my chats`, `my data`) *except* `What happens when you turn off Gemini Spark?`, which flips to second person mid-list. One inconsistency in thirty-five.

Second, and more interesting: several questions **pre-load the answer's justification into the question**. `Who has access to my chats, and how does human review improve Gemini for everyone?` is two questions welded together, and the second half supplies the defence before the first half has been answered. A user asking "who reads my chats" is handed a question that already assumes the reading is beneficial and collective. Compare the neutral alternative — "Who can read my chats?" — which the page does not ask. This is a persuasion pattern operating at the level of FAQ question-writing, and it is worth naming because it is easy to do accidentally.

Counter-example, well handled: `Do you use my Gemini Apps chats to show me ads?` is short, blunt, asks the thing users actually fear, and gets a direct denial.

**Feature-level FAQs** `[observed]` — the verification article embeds two labelled FAQ blocks, `Common questions about SynthID` and `Common questions about Content Credentials`:

`What is SynthID?` · `Why did Google create SynthID?` · `Can SynthID still be used if the original AI-generated file is changed?` · `What is the difference between digital watermarks and metadata added to AI-generated content?` · `Is there a limit to the number of checks per day?` · `What are Content Credentials?` · `How do Content Credentials help me make informed decisions?` · `How does Content Credentials info work in Gemini Apps?` · `What do these Content Credential errors mean?`

Note `How does Content Credentials info work` (singular verb, plural subject) and `Content Credential errors` (singular attributive) against `Content Credentials` everywhere else — the term hasn't settled its own number.

## T13 Terminology & glossary

This is the section where Gemini is most distinctive, and the distinction is that **the naming system does not hold**. The confusion is the finding.

### The three-name problem, conceded in writing

| Term | Meaning | Where |
|---|---|---|
| `Gemini Apps` | The legal/help umbrella. Eleven enumerated surfaces: Gemini web app, Gemini mobile apps (Android/iOS), Gemini app on MacOS, Gemini in Google Messages, Gemini in Android Auto, Gemini in Google Built-in, Gemini in Maps, Gemini in Chrome, Gemini on Android XR | Privacy Hub, all help titles |
| `Gemini app` | The singular consumer product | Marketing, `An overview of the Gemini app` |
| `Gemini` | The assistant, the model family, and the brand | Everywhere |

The Privacy Hub resolves this by giving up:

> "'Gemini Apps' are also sometimes referred to as the 'Gemini app' or 'Gemini.'"

A product formally documenting that its three names are interchangeable, inside the notice whose whole job is precision about scope. Every "What you need" eligibility rule in the help centre is scoped to one of these three, and the reader has just been told they may be the same thing.

### Model names: three numbering schemes, live simultaneously, 2026-09-22

| Surface | Names used |
|---|---|
| Help 13275745 & 16275805, prose | `Gemini Flash-Lite` · `Gemini Flash` · `Gemini Pro` |
| Help 16275805, section heading | `About Gemini 3 models` |
| Help 16275805, Model Access table | `Gemini 3 Flash-lite` · `Gemini 3 Flash` · `Gemini 3 Pro` |
| Help 13275745, one sentence | "response time for Gemini 3 Pro prompts" |
| one.google.com | `Gemini 3.1 Pro` (in Gemini) **and** `Gemini 3 Pro` (in AI Mode for Search), in adjacent bullets |
| gemini.google/subscriptions, Free card | `3.6 Flash` · `3.1 Pro` — **brand dropped entirely** |
| gemini.google/subscriptions, Pro card | `Gemini 3 Pro` (Search), `Gemini Omni Flash` (Flow) |
| gemini.google/subscriptions, prose | "our leading model, **3.1 Pro**" |

So on one day: version `3`, version `3.1` and version `3.6` are all current; `Flash-Lite` and `Flash-lite` differ by one capital inside a single article; and the pricing page — the page a buyer reads before paying $19.99/month — refers to the product's flagship model as a bare decimal, `3.1 Pro`.

Compounding it, the Model Access table in 16275805 shows **Yes in all twelve cells** — every plan gets every model. A four-row, three-column table conveying zero information, sitting directly above the table that actually differentiates the plans. And its column headers are `Gemini 3 Flash-lite / Gemini 3 Flash / Gemini 3 Pro` while its first column reads `Without an AI Plan` — against `Without an AI plan` in the table above it and `Without a Google AI plan` in the table below it. **Three casings of the free tier's name in one article.**

### The four "Deep" products

| Term | What it is | Where it lives |
|---|---|---|
| `Deep Research` | Multi-source report generation | Gemini app |
| `Deep Search` | Multi-source search | AI Mode in Google Search |
| `Deep Think` | Maximum-parallel reasoning mode, Ultra only | Gemini app |
| `Deep think` | The same thing, lowercase, in the thinking-level list | Gemini app, same article as `Deep Think` |

Three near-identical names for three different things on three different surfaces, plus a casing split inside one article (`Use Deep Think in Gemini Apps` as an article title; "**Deep think** (AI Ultra only) provides maximum parallel reasoning" in body copy, followed two words later by "Deep Think queries generally can take a few minutes"). The body sentence contains both casings.

### Orphaned and superseded terms still in public copy

| Term | Status | Where found |
|---|---|---|
| `Agent Mode` | Appears exactly once, in the `What is Google AI Ultra?` FAQ answer ("including Agent Mode"). Appears nowhere else in the harvest; `Gemini Spark` occupies the same slot everywhere else | gemini.google/subscriptions |
| `Gemini Advanced` | A retired plan name. "recently uploaded files (Gemini Advanced only)" | gemini.google/overview/ |
| `extensions` | Superseded by `Connected Apps`, but survives in prose ("turn on/off access to extensions (e.g., Workspace, Maps, YouTube)") **and in the Privacy Hub's own anchor, `#extensions`, under the heading `Connected Apps in Gemini`** | overview, Privacy Hub |
| `Bard` | Correctly historicised: "We initially launched Gemini (then called Bard) as an experiment in March 2023" | overview |

`Bard` is handled well — named, dated, past-tensed. `Agent Mode` and `Gemini Advanced` are not handled at all; they are leftovers a user can find and cannot resolve.

### Plan and commercial vocabulary

`Free` · `Google AI Plus` · `Google AI Pro` · `Google AI Ultra`, shortened in help tables to `AI Plus` / `AI Pro` / `AI Ultra`. Sold under **Google One** ("Gemini Apps upgrades are part of select Google One paid plans for personal accounts") but never called a Google One plan on the Gemini site. Ultra is a single name covering two prices and two limit levels ($99.99 = 5x Pro, $199.99 = 20x Pro), with no sub-name for either — so "I'm on Ultra" is not a statement of what you have.

`AI credits` appears once, in footnote 2 of the subscriptions page: "You can extend your limits by purchasing AI credits." A consumable currency layered on top of a subscription, introduced in a footnote, absent from the limits article.

### Coined and chosen terms

| Term | Gemini's usage | The alternative it rejected |
|---|---|---|
| `Gems` | User-authored custom assistants | "custom GPTs", "assistants", "personas" |
| `Skills` | Reusable instruction sets, with a `Skills Manager` | "prompts", "macros", "workflows" |
| `Gemini Spark` | "your 24/7 personal AI agent" | `Agent Mode` (its own earlier name) |
| `Keep Activity` | The training/history opt-out | "Improve the model", "Data controls", "History" |
| `Connected Apps` | Integrations, incl. third-party MCP servers | `extensions` (superseded), "plugins" |
| `Personal Intelligence` | The settings container for Memory + Instructions | "Personalization settings" |
| `Instructions for Gemini` | Standing user preferences | `Saved Info` (the same thing, other locales) |
| `Memory` | Cross-chat recall, as a named, toggleable object | "chat history personalization" |
| `thinking level` | User-selectable reasoning depth | "reasoning effort", "model quality" |
| `context window` | Glossed inline: "like the reading capacity" | left untranslated |
| `compute-based usage limits` | The metering unit | "messages", "tokens", "credits" |
| `temporary chat` | Non-retained session | "incognito", "private mode" |
| `Nano Banana 2` / `Nano Banana Pro` | Image generation models | a serious name |
| `Gemini Omni` / `Gemini Omni Flash` | Multimodal generation, subscriptions page only | absent from help |
| `Chrome auto browse` | Agentic browsing | "autonomous browsing" |
| `Daily brief` / `Daily Brief` | Personalised digest — both casings, help vs marketing | |
| `drafts` | Alternate responses | "variants", "regenerations" |
| `response` / `prompt` / `chat` | The core triad, consistently used | "answer" / "query" / "conversation" |

`temporary chat` over "incognito" is a good call — it names the retention property rather than borrowing a browser metaphor that would overpromise. `compute-based usage limits` is simultaneously the most candid metering language in the category (it admits the unit is cost, not messages) and the least actionable (a user cannot count compute).

`Nano Banana` deserves one line of analysis rather than a smirk: it is a codename that escaped into the pricing page, the help centre (`Image generation with Nano Banana 2`, `Redo images with Nano Banana Pro`) and the plan comparison matrix. It now sits in a purchase-decision table next to `Gemini 3 Pro` and `Veo 3.1`, and a buyer has no way to rank it. Codename-to-product-name promotion without a renaming pass is the general failure; this is a vivid instance.

## T14 Voice, tone & accessibility

**A three-way grammatical split, and it is doing legal work** `[observed]`

- **Second person** for the user: "you can", "your chats", "don't rely on"
- **First-person plural** for Google: "We retain your data", "We want to be as transparent as possible", "we do not sell your personal information"
- **Third person** for the product: "Gemini can hallucinate", "Gemini Apps may provide inaccurate…", "its responses"

Google is a `we`; Gemini is an `it`. The grammar keeps the company and the model in different persons, which is precisely what the disclaimer "Responses from Gemini Apps don't represent Google's views, and should not be attributed to Google" requires. The pronoun choice enforces the legal position before the disclaimer restates it. This is the most transferable voice observation in the file.

The one place the split breaks: "Gemini, **your personal AI assistant from Google**" (Privacy Notice) — the possessive attaches the model to the user and to Google in the same phrase, in the document that elsewhere works hardest to keep them apart.

**Register fragments by surface owner, not by stakes** `[observed]`

| Surface | Register |
|---|---|
| `gemini.google/subscriptions` | Unhedged, superlative, imperative. "Just describe it and Gemini will create it." "Unlock the highest level of access." "Write the scene you want to watch." |
| `one.google.com` | Benefit-bullet, multiplier-driven, asterisked |
| `gemini.google/overview` | Hedged, first-person-plural, essayistic, signed |
| `support.google.com/gemini` | Procedural, modal-heavy ("may", "might", "for now", "generally") |
| Privacy Hub / policy | Bare declarative + imperative warnings, no hedging at all |

Wise's tone *flattens as stakes rise* — a single voice with a defensible gradient. Gemini's tone **switches at the org-chart boundary**. The privacy notice is blunter than the help centre, which is more hedged than the explainer, which is far more cautious than the pricing page. The same risk (agentic error) is "can make mistakes, like making purchases" in one place and "is under your direction" in another.

**`Important:` is overused into meaninglessness** `[observed]`

The bolded inline label `Important:` appears in nearly every help article, frequently three or more times, and carries loads of wildly different weight:

- "**Important:** To switch between models in Gemini Apps, you must be signed in." (an eligibility gate)
- "**Important:** Model names, versions, and availability may change." (a disclaimer)
- "**Important:** Instructions for Gemini to forget or avoid topics in chats doesn't always work perfectly." (a safety-relevant reliability warning)
- "**Important:** You can only choose a single image, video, or audio file to verify at a time…" (a UI constraint)

Same typography for "sign in first" and "the forget function may not forget". Where everything is important, the warning channel has no capacity left for the thing that actually is. `Tip:` is the only other inline label, and it carries both genuine tips and, in at least one case, the graceful-degradation path for hitting a paid limit — load-bearing information demoted to a tip.

**The `For now` hedge** `[observed]`: "**Important:** For now, this feature is: Only available in the Gemini mobile app…" — a temporal qualifier with no date, used repeatedly. It ages invisibly: unlike a dated notice, nothing ever flags it as stale.

**Accessibility findings** `[observed]`

*Present:* `Skip to main content` first in DOM on every help page. `Enable Dark Mode` control in the help footer. A published accessibility *feature* article, `Get audio descriptions with Guided Vision in Gemini Live`. Decorative chevrons carry meaningful alt (`![and then](…)`), which correctly preserves step sequencing for screen-reader users reading "click Menu *and then* Settings & help".

*Defects:*

1. **`Skip to main content` targets two different anchors.** Most articles use `#hcfe-content`; articles 13275746 (feedback) and 16188217 (prompt injection) use `#search-form`. On those two pages the skip link drops a keyboard user into the search box rather than the article body. A template inconsistency on exactly the two pages a user in trouble is most likely to land on.

2. **In the plan feature-availability matrix, "yes" is announced and "no" is silent.** The available state renders as `![Checkmark](…)` — alt text "Checkmark". The unavailable state renders as `![](…)` — empty alt. A screen-reader user traversing a five-column, sixteen-row purchase-decision table hears "Checkmark" in the affirmative cells and nothing at all in the negative ones, and cannot distinguish "not available" from "cell failed to render" from "end of row". This is the most consequential accessibility defect found, because the table's only job is comparison and comparison requires both polarities.

3. **Colour-only state for location access** (T6): blue dot = precise location in use, gray dot = not. No text alternative published.

4. **Toggle state icons carry empty alt**: "turn Memory off ![] or on ![]" collapses to "turn Memory off or on" with no indication which glyph is which. Recoverable from context, but the instruction loses its referent.

5. `Instructions for Gemini` vs `Saved Info` — a control whose accessible name differs by locale while the documentation for both points at one article.

*Not found:* no accessibility statement, conformance report or VPAT anywhere on `gemini.google` or in the help centre. `[absent]` No public status or incident page for Gemini. `[absent]`

**Numbers as trust and capacity devices** `[observed]`: `32k tokens` / `128k tokens` / `1 million tokens`, glossed as "up to 1,500 pages of text or 30,000 lines of code"; `100 MB or less`; `less than 90 seconds`; `less than 1 hour`; "approximately 10 image checks, 10 video checks (up to 5 minutes total), and 10 audio checks (up to 3 hours total) within any 24-hour rolling window"; `72 hours`; `18 months`; `three years`. The token-to-pages gloss is reused consistently across help and marketing ("up to 1,500 pages of file uploads") — a rare case of a translated metric staying stable across surfaces.

**Signed, dated, and contradicted** `[observed]`

The overview page carries named authorship — `James Manyika, SVP, Research, Technology and Society` and `Sissie Hsiao, Vice President and General Manager, Google Assistant and Gemini App` — and an `Editor's note`:

> "This is a living document and will be updated periodically… This overview was last updated on July 25, 2024."

A living document that has not moved in twenty-six months, on the page Google's own help centre nominates as the answer to "what is Gemini". Its contents confirm the staleness: `Gemini Advanced`, `extensions`, "coming soon with Gems" (Gems shipped long ago and now has four help articles), and "soon, you'll be able to point your phone's camera at an object" (shipped as Gemini Live). The self-description and the timestamp contradict each other in adjacent sentences.

**A production page linking to localhost** `[observed]`

Inside the `Responses to user prompts` modal on `gemini.google/overview/`, the phrase "policy guidelines" is hyperlinked to:

`http://localhost:4007/policy-guidelines/?preview=true&v=2`

A developer's local preview URL, complete with `preview=true` query string, shipped to production on Google's flagship AI explainer, in the sentence describing the safety check applied to every response. The same page links correctly to `https://gemini.google/policy-guidelines/` twice elsewhere. A dead link is trivial; a dead link in the sentence "each potential response undergoes a safety check to ensure it adheres to predetermined policy guidelines" is not.

---

## Transferable patterns

1. **Name the confidence, not just the error.** "Gemini can hallucinate and **present inaccurate information as factual**" is stronger than any "may produce inaccurate results" because it warns about the tone of the wrong answer, which is the part that causes harm. Transfers to any surface where a system produces an assertive output it cannot guarantee — fraud scores, eligibility estimates, BNPL affordability messages. Condition: only works if the surrounding copy is otherwise plain; one euphemism nearby and it reads as boilerplate.

2. **`What you need` as a standard pre-procedure module.** A bulleted eligibility list with bolded lead-in and unbolded negative consequence, before any step. It lets users fail out in three seconds instead of at step four. Directly transferable to any gated flow — verification states, market availability, account-type restrictions.

3. **Put the sceptical verb first in your IA — then make the articles keep the promise.** `Double-check, modify, or share responses` is the right instinct and Gemini fails to follow through: the safety-critical article is last and neutrally titled. The transferable lesson is the pair, not the heading. If a category leads with verification, the first article in it must be the one that teaches distrust.

4. **Keep the company and the system in different grammatical persons.** Google is `we`; Gemini is `it`. This does the attribution disclaimer's work structurally, before the disclaimer is read. Applies wherever an automated decision must not read as an institutional opinion.

5. **State the opt-out's boundary in the same breath as the opt-out.** "Even if your Keep Activity setting is off… Google still uses your chats to respond to you and help protect Google, our users, and the public." Better than a complete-sounding promise plus a distant carve-out. Transfers to marketing-preference, data-sharing, and cookie copy.

6. **Make a negative commitment reversible in public.** "Your Gemini Apps chats are not being used to show you ads. **If this changes, we will clearly communicate it to you.**" A present-tense denial plus an undertaking to announce reversal is more durable than a bare denial and more honest than silence.

7. **Do not promote a codename.** `Nano Banana 2` now appears in a paid-plan comparison matrix beside `Gemini 3 Pro`. Once a codename reaches a purchase-decision table, it is a product name and it should have survived a naming pass. The general rule: the surface where a user spends money is the last place a term can be renamed cheaply.

8. **Anti-pattern to avoid: one product, two pricing pages, two CTA strategies.** `Get Plus` / `Get Pro` / `Get Ultra` on one Google page versus four identical `Get started` buttons on another, plus a 20x claim anchored to two different baselines. Where two orgs sell the same SKU, the multiplier baseline and the CTA label must be owned in one place.

## Caveats & gaps

- **Nothing in-product was observed.** Every UI string in this file is `[documented]` from help-article prose. No error text, no empty state, no toast, no validation message, no placeholder, and no onboarding screen was seen. `gemini.google.com/about` returned an auth-gated shell (title, meta, `Sign in`, tag-manager noscript) and is recorded as blocked.
- **T8 is genuinely empty.** No empty-state copy is published anywhere in the public surface.
- **T7 is thin by the product's own doing,** not by harvest failure: the `Fix a problem` category has two articles and neither fixes anything. The prompt-injection warning string is described but not quoted, so it could not be captured.
- **Locale is US-only.** Both pricing pages served the US region; prices ($4.99 / $19.99 / $99.99 / $199.99 per month) and the 18+/13+ age claims are US-surface readings. The EEA/UK variants will differ and the age contradiction noted in T10 may resolve differently there. Re-verify before using any age or price string as precedent.
- **Model names are volatile and were captured on one day.** `3`, `3.1` and `3.6` were all live on 2026-09-22. Treat every model string here as a dated snapshot, not a stable name.
- **The `AI credits` mechanism could not be characterised.** It appears only in footnote 2 of the subscriptions page and points at article 17004136, which was not fetched. Flagged rather than guessed.
- **Not fetched, and relevant:** `gemini.google/our-approach/`, `gemini.google/policy-guidelines/`, article 13954172 (`Learn about generative AI`), article 14554984 (mobile getting-started), article 17094507 (`Gemini Spark`), article 16345172 (`Deep Think`), article 15236321 (`Gems`), article 17004136 (limit changes / AI credits), and the Workspace-account variants. The Privacy Hub's Spark, Live, Chrome, Shopping and Canvas FAQ *answers* were not read — only their question text from the table of contents.
- **Help-article bodies were read for 10 of ~90 articles.** Category names and article titles are complete; answer structure beyond those ten is not characterised.
- **The mobile app, Android Auto, Android XR, Google Messages, Maps and Chrome surfaces** carry their own strings and are outside the public web harvest.
- One fetch of article 16279220 was served from a session cache; it was re-fetched at a variant URL to obtain the body, and the content matched the cached title. Noted for provenance completeness.

## Sources

1. https://gemini.google/overview/
2. https://gemini.google/subscriptions/
3. https://gemini.google.com/about *(blocked — auth-gated shell)*
4. https://one.google.com/about/google-ai-plans/
5. https://support.google.com/gemini/
6. https://support.google.com/gemini/answer/13275745?hl=en
7. https://support.google.com/gemini/answer/13275746?hl=en
8. https://support.google.com/gemini/answer/13594961
9. https://support.google.com/gemini/answer/14143489?hl=en
10. https://support.google.com/gemini/answer/16188217?hl=en
11. https://support.google.com/gemini/answer/16275805?hl=en
12. https://support.google.com/gemini/answer/16279220
13. https://support.google.com/gemini/answer/16598469
14. https://support.google.com/gemini/answer/16598625?hl=en
15. https://support.google.com/gemini/answer/16722517?hl=en
16. https://support.google.com/gemini/answer/17216260?hl=en
17. https://policies.google.com/terms/generative-ai/use-policy
