# 168. Runway

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Generative video (text/image-to-video foundation models, creative suite + API + robotics) |
| Primary URL | https://runwayml.com/ (canonicalises to https://runway.com) |
| Corpus rank | 168 |
| Benchmark strength (source list) | Generative-workflow prompts |
| Locale / market observed | en-US (site advertises `pt_BR` alternate locale) |
| Platform observed | Web (marketing), Zendesk help centre, Atlassian status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | No sector regulator. Self-imposed: C2PA Content Credentials, NCMEC reporting for CSAM, an EU-AI-Act-adjacent posture is not claimed. Enterprise data-security page exists but was not harvested. |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Partial. Marketing, pricing, safety/usage policy and credit mechanics are fully captured. The **prompt-writing guidance itself is not on runway.com** — it lives in Runway Academy (`academy.runwayml.com`), which was not harvested, so the flagged strength is covered via product-surface and app naming rather than via a prompt guide. In-product strings are unreachable. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://runwayml.com/ → https://runway.com | Three-platform architecture, research framing, model-release cards |
| Product (Creative) | https://runway.com/product | Model roster, Apps grid, edit-instruction vocabulary |
| Pricing | https://runway.com/pricing | Credit definitions, per-model rate table, 4-question FAQ |
| Safety | https://runway.com/safety | Four-stage safeguard model |
| Usage Policy | https://runway.com/safety/usage-policy | Six prohibited-content categories + product-specific rules |
| Help centre home | https://help.runwayml.com/hc/en-us | Six categories with scope lines |
| Help section: Credits | https://help.runwayml.com/hc/en-us/sections/25284018285459-Credits | Six article titles |
| Help article: How do credits work? | https://help.runwayml.com/hc/en-us/articles/15124877443219-How-do-credits-work | Rate, rollover, spend-order rules |
| Status | https://status.runwayml.com/ | Five components |

---

## T1 Navigation & IA labels

**Global nav is minimal to the point of austerity** `[observed]`: a logo link, then `Login` and `Try Runway`. There is no persistent top-level product menu on the marketing site. Navigation is pushed almost entirely into the footer.

**Footer is the real IA — seven groups, and the groups are audiences/products, not features** `[observed]`:

`Creative` · `Dev` · `Robotics` · `Enterprise` · `Research` · `Resources` · `Events & Programs` · `Company`

This is the most consequential structural observation about Runway's content. A generative-video product has organised its entire information architecture around **three platforms** — `Runway Creative`, `Runway Dev`, `Runway Robotics` — with `Research` as a fourth peer. The homepage states the unifying claim in the section header:

> `Three platforms built on-top of the same Real-World Intelligence models`

Selected footer labels worth recording: `Verify Content Credentials`, `Data Security`, `Video Model Licensing`, `Model Router`, `Recipes`, `Code of Conduct`, `System Status`, `Talent Network`, `Creative Partners Program`, `Gen:48`, `Runway Builders`, `Meetups`, `Academy`.

`Verify Content Credentials` sitting in the `Company` footer group, beside `Safety` and `Brand Guidelines`, is notable — provenance verification is treated as a corporate commitment with a permanent footer slot, not as a product feature.

**Help centre — six categories, each with a one-line scope** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Account & Billing` | "Manage your subscription and billing information." |
| `Creating with Runway` | "Learn how to use Runway's tools and features to create your projects." |
| `Enterprise` | "Information for business customers about Enterprise account management." |
| `Assets & Workspaces` | "Organize and manage your files and collaborative workspaces." |
| `Troubleshooting` | "Find solutions to common technical issues and error messages." |
| `Community & Programs` | "Information about Runway programs & community access." |

Sub-sections are exposed on the index page rather than hidden one click down. `Creating with Runway` → `Getting Started`, `Agent`, `Model Guides`, `Apps`, `Workflows`. `Troubleshooting` → `Account Troubleshooting`, `Platform Troubleshooting`, `Getting Technical Help`.

`Model Guides` as a help sub-section is a generative-product-specific IA slot with no analogue in conventional software help centres: each foundation model needs its own usage documentation because each behaves differently. Worth flagging as an emerging pattern.

## T2 Value proposition & headline patterns

**Homepage hero is a research claim, not a product claim** `[observed]`

> H1: `Building Real-World Intelligence`
> Body: "Runway is building foundational Real-World Intelligence that can understand, simulate and act in the world. We offer products and services built on-top of this intelligence to empower individuals and organizations to do more in the world."
> CTA: `Try Runway for free`

The word "video" does not appear in the hero. Neither does "create", "generate", or any user task. A product used by (its own claim) 60 million creatives leads with a phrase most of them would not recognise.

**The product page uses a completely different voice** `[observed]`

> H1: `A new frontier for video generation.`
> Sub-line: "Used by 60M+ users globally - try today and cancel anytime"
> Section header: `Every model you need to make anything you want.`
> Section header: `Dozens of tools. Endless ways to create.`
> Section header: `Build the Workflows That Work for You.`

`runway.com/` is written for investors, partners and the AI-research press. `runway.com/product` is written for the person who wants to make a video. **Two audiences, two registers, one click apart, with the research register occupying the front door.** Recorded as a deliberate positioning choice with a real cost: the homepage does the least work of any page in this batch to explain what the user can do.

**The "make anything you want" construction is a house formula** `[observed]`, appearing in at least three places with minor variation:

- `Your complete Creative Suite with everything you need, to make anything you want.` (homepage, Runway Creative)
- `Every model you need to make anything you want.` (product page)
- `All the resources you need to make anything you want.` (help centre home)

Three surfaces, one sentence skeleton: *\<thing\> you need to make anything you want*. Consistent, and it usefully avoids naming a use case — which is the correct choice for a general-purpose generative tool, where naming any one use case narrows the perceived scope.

**Platform one-liners are function-first, audience-second** `[observed]`:

- `Runway Creative` — "An all-in-one cloud-based creative platform that offers endless ways to generate and edit video, images and audio in one workspace. Built for individuals and teams of all sizes."
- `Runway Dev` — "The AI media platform for developers to build with the best models from Runway and other labs."
- `Runway Robotics` — "A complete toolkit to run policy inference through photorealistic simulation."

Note the third is written in language no creative user would parse, which is fine — it is a third audience and the label `Robotics` has already filtered.

**Research-release cards use a consistent grammar** `[observed]`: model name, then an em-dash-free appositive claim.

- `GWM-1` — "A state-of-the-art General World Model built to interact with the real world. And a major step towards universal simulation."
- `Gen-4.5` — "The world's best video model, featuring state-of-the-art motion quality, prompt adherence and visual fidelity."
- `Solaris` — "Our first Interface World Model: real-time AI that generates interactive interfaces frame by frame, with no code."
- `GWM Worlds 2` — "generates interactive worlds in real time: continuous 720p video at 24 fps and audio at 48,000 Hz, responding to your inputs as you explore."

`prompt adherence` is the load-bearing term in the Gen-4.5 line: it names the quality dimension that matters most to someone writing prompts, and it is the closest Runway's marketing gets to acknowledging prompting as a skill.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try Runway` | Global nav | |
| `Login` | Global nav | |
| `Try Runway for free` | Homepage hero | |
| `Try now` | Platform cards, model cards (repeated ~7× on product page) | The dominant CTA; deliberately low-commitment |
| `Learn more` | Beside almost every `Try now`, and on news cards | **Bare `Learn more` used extensively** — the opposite of the Wise practice |
| `Get Started` | Product page hero | |
| `For Enterprise` | Platform cards | Audience switch used as a CTA |
| `Get API Key` | Runway Dev card | |
| `View documentation` | Runway Dev card | |
| `Contact Sales` | Robotics card, footer | |
| `Buy tickets` | Site-wide event banner | |
| `Start Free` | Pricing, Free plan | |
| `Get Standard` / `Get Pro` / `Get Max` | Pricing cards | **`Get <PlanName>` pattern** — the button names the tier, so the plan name is repeated at the moment of commitment |
| `View more` | Pricing comparison table, per model category | Progressive disclosure inside a rate table |
| `Report content` | Safety page, usage policy | |
| `Go to Runway` | Help centre header | |
| `Get Help` | Help centre header | |
| `Go to Discord` | Help centre foot | Community placed before/beside formal support |
| `Learn on Runway Academy` | Help centre foot | |
| `See docs` | Help centre Agent block | |
| `Subscribe to Updates` | Status page | |
| `Skip to main content` | Help centre, status page | Present on Zendesk/Statuspage templates only |

**Two observations.**

`Try now` + `Learn more` as a paired unit appears on virtually every model and tool card. It is efficient but it means the product page ships perhaps a dozen identical, context-free `Learn more` links. Descript (167) ships one; Wise ships effectively zero. For a screen-reader user tabbing a link list, Runway's product page is a wall of `Learn more`.

`Get Standard` / `Get Pro` / `Get Max` is the better pattern and worth stealing: putting the tier name in the button means an autofilled or mis-scrolled click is self-evidently wrong, and the link text is meaningful out of context.

## T4 Onboarding & getting-started

No numbered how-it-works sequence exists on the marketing site. `[absent]` for a step-by-step onboarding narrative.

**Instead, the generation workflow is taught through three artefacts.**

**1. Apps — a named, single-purpose entry point per job** `[observed]`. Section framing: "Apps are an ever-growing collection of use case specific tools designed to make it easier than ever to get to great outputs."

| App name | Description (verbatim) |
|---|---|
| `Remove from Video` | "Remove anything from any video with a simple prompt." |
| `Reshoot Product` | "Transform product shots without reshooting. Just upload and describe." |
| `Upscale Video` | "Enhance any video to higher resolution with one click." |
| `Add Dialogue` | "Bring characters to life by typing what they should say." |
| `Change Image Style` | "Reimagine any image in different styles and artistic moods." |
| `Add Performance` | "Map your voice and expressions onto any image or character." |
| `Change Backdrop` | "Transform the background in any video." |
| `Change Time of Day` | "Adjust the time of the day in any video." |
| `Relight Scene` | "Change the lighting in any video instantly." |

Every app name is **Verb + Object**. Every description is one sentence naming the input gesture: "with a simple prompt", "Just upload and describe", "with one click", "by typing what they should say".

This is the answer to the hardest problem in generative UX — *what do I type?* Rather than teach prompt-writing, Runway pre-decides the prompt's job and lets the user supply only the variable part. `Change Time of Day` is a whole app because "adjust the time of day" is a thing people could never reliably phrase. **Converting a prompt pattern into a named app is the most transferable generative-workflow pattern in this file.**

**2. Edit instructions shown as literal lowercase phrases** `[observed]`. Under `Edit, Transform and Generate Video`, six chips are shown as the things you say to the model:

`change outfit` · `change art direction` · `remove background` · `remove elements` · `change object`

All lowercase, all verb-first, all two or three words, with a `Before` / `After` pair beside them. The instruction grammar is demonstrated rather than explained: the user learns that the model wants a terse imperative, not a paragraph. Prose alongside: "All just by telling the model what you're looking for."

**3. Agent and Workflows as the two ends of a control spectrum** `[observed]`:

- Help centre hero: `Runway Agent` — "Describe what you need. Agent handles the rest." Two sentences, two full stops, the second one doing the reassurance.
- Product page: `Runway Agent` — "Create end-to-end videos with simple conversations."
- `Workflows` — "Create your own custom node-based workflows that chain together multiple models, modalities and intermediary steps for even more control of your generations."

Conversational at one end, node graph at the other, with "even more control" naming the axis explicitly. Giving the user the vocabulary for the trade-off ("control") rather than just two products is good practice.

**Use-case vocabulary** `[observed]` — a tab strip of ten, which functions as a menu of things a newcomer might not know were possible:
`Transform Video` · `Mood Boards` · `Virtual Staging` · `Character Performance` · `Virtual Try-On` · `Design Explorations` · `Storyboarding` · `Animatics` · `Generate Yourself` · `Visual Effects`

`Generate Yourself` is the uncomfortable one — a likeness-generation use case presented in a list beside `Mood Boards`, with no adjacent consent or likeness note. The usage policy addresses likeness (see T10) but the marketing surface does not cross-reference it.

## T5 Form & field labels

**PRIORITY SECTION.** Thin on observed strings — no generation form is reachable pre-auth — but the input *design* is documented by proxy.

**The prompt is never labelled on public surfaces.** `[absent]` for an observed prompt-field label, placeholder or hint. No screenshot-derived label, no "describe your scene" placeholder, no character limit disclosed.

**What is observable about generation input** `[observed]`:

- Input modality is stated per model: `Seedance 2.5` — "Use text, image, video or audio to generate videos". Four input types named in the card copy, which is the closest thing to a field inventory on the site.
- `Multi-Shot Video App` — "Write a simple prompt, get a multiple shots video". The instruction to the user is "simple".
- `Reshoot Product` — "Just upload and describe." Two-field mental model: asset + instruction.
- `Add Performance` — "Map your voice and expressions onto any image or character." Input is a performance capture, not text.
- Parallel-generation limits are exposed as a plan entitlement and therefore as a UI concept: `Parallel generations: 5 videos & images` (Standard), `15` (Pro), `20` (Max).
- Duration is a first-class input, disclosed through pricing: Gen-4.5 is "12 credits **per second** of generated video" and "your total cost per generation would be either 60 or 120 credits, depending on if you chose a 5 or 10 second duration." The user therefore knows there is a duration control with two values before ever seeing it.
- Resolution is a first-class input, disclosed the same way: `Gen-4 Image1080p`, `Nano Banana Pro2K`, `Seedance 2.0 Pro1080p`, and `SD` / `HD` distinctions in the credit table. Studio-grade output formats are named on the Max plan: `HDR, ProRes, image sequences`.

**The pricing table is functioning as the parameter documentation.** Because Runway publishes per-model, per-second, per-image and per-minute rates, the pricing page is where a user learns that model, duration and resolution are the three levers. That is an accident of billing design that happens to do good explanatory work — but it means **the cost model is better documented than the creative controls**, which is the inverse of Midjourney (169).

**Named controls that do surface** `[observed]`: `Brand Kit` (1 on Pro, up to 3 on Max), `custom voice clone` (1 on Pro, up to 3 on Max), `4K upscaling` / `Unlimited 4K video upscaling`, `Topaz AI Upscale`, `Auto Refill` (credits), `Model Router` (Dev).

`1 custom voice clone` as a plan entitlement on a video product, with no adjacent consent copy anywhere on the pricing or product pages, is a notable omission. ElevenLabs (170) and Descript (167) both attach consent language to the voice-clone entitlement at the point of sale; Runway does not. The likeness/voice rule exists only in the usage policy.

## T6 Status & state language

**Status page** `[observed]` — five components only, far coarser than Descript's per-feature tree:

`App` · `Backend` · `Billing` · `Support` · `Public API`

State vocabulary: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`, with the daily-history variants `No downtime recorded on this day.` / `No data exists for this day.` / `had a major outage.` / `had a partial outage.` Overall banner: `All Systems Operational`. Standard Atlassian Statuspage vocabulary, unmodified.

The gap is worth stating: a generative product's most common user-visible failure is *a specific model being slow or refusing*, and `Backend: Operational` cannot express that. Descript's per-feature status tree (167) is strictly better for this product class.

**Generation states** `[documented]` and inferred:

- Credits are deducted and, on failure, returned — a help article exists titled `Why do I see a charge and a refund for the same generation?`, which documents a **charge-then-refund state pair** that users evidently find alarming enough to need an article.
- `Can I have credits refunded?` is a separate article — a failed generation is modelled as a billable event that may be reversed.
- `Generating in Unlimited Mode` is its own article, implying a distinct generation state where credits are not the limiting factor.
- Account states are named in the safety content: `suspensions`, and a dedicated page `Account suspensions` plus an appeals route ("If you believe your account has been wrongly suspended, you can appeal by emailing suspension@runwayml.com").

**Credit-balance language** `[documented]`: "Credits are added to your account within a few minutes of payment processing. **If you don't see them immediately, please allow up to a few hours for the system to update.**" A claim followed immediately by its own worst case, in bold. This is the Wise claim-and-bound pattern executed well, and it is the only place in Runway's content where it appears.

## T7 Error, failure & recovery

All `[documented]` via help-centre titles and policy text.

**The Troubleshooting category splits by locus of the problem** `[observed]`:
`Account Troubleshooting` · `Platform Troubleshooting` · `Getting Technical Help`

Naming a "where do I get a human" section as a peer of the two problem categories is a small but good IA decision — the escalation path is a sibling of the self-service paths, not buried under them.

**Billing-failure articles are written as user questions** `[observed]`:
- `Can I have credits refunded?`
- `Why do I see a charge and a refund for the same generation?`
- `Why does the Unlimited plan have credits?`

The third is the interesting one. It is not an error article; it is a **contradiction article** — the plan is called "Unlimited" and yet has credits, and rather than rename the plan Runway wrote the reconciling article. Structurally identical to Wise's "Why does it say my transfer's complete when the money hasn't arrived yet?". The existence of this article is prima facie evidence that the plan name is misleading, and it is worth recording as a naming defect that content is being asked to absorb.

**Moderation refusal** is the characteristic failure of a generative product, and Runway documents the *system* but not the *string* `[observed]`. The safety page says "We use AI-based classifiers to analyze user inputs and generated outputs to catch potentially harmful content before it reaches users" and describes "automatic suspensions for users who repeatedly trigger moderation systems". The user-facing refusal message is not published. `[absent]` for the refusal copy itself.

Recovery from enforcement is named and routed: a `suspension appeals` review process, human review of "user reports and suspension appeals", and a named email address. "catching what automated systems may miss **or get wrong**" — an explicit admission that the classifier produces false positives, which is the correct framing for an appeals path.

## T8 Empty states

`[absent]`. No empty-state copy is reachable. One near-miss: the product page references an asset at `edit-studio-empty-state.webm`, confirming that empty states exist as a designed surface, but the content is inside a video file and not extractable as text.

Status page zero-state strings are the only observed no-data copy: `No incidents reported today.` / `No incidents reported.` / `No incidents or maintenance related to this downtime.`

## T9 Notifications & system messages

`[observed]`, limited.

- **Site-wide event banner**, present on every marketing page: `Runway AI Summit: 9/30 in San Francisco.` followed by "Register now for the Runway AI Summit on 9/30 in San Francisco to hear from leaders at DeepMind, NVIDIA, Physical Intelligence and more." and `Buy tickets`. The banner restates the headline almost verbatim in the body — redundant, and it occupies the same slot on the usage policy and safety pages, where a ticket-sales banner sits directly above CSAM policy text. **That adjacency is a defect.**
- Status page: `Subscribe to Updates` with email, SMS, Slack and Atom/RSS channels. SMS disclosure: "Message and data rates may apply."
- `Changelog` maintained at `runway.com/changelog` as a footer link.
- Credit exhaustion notification: not documented. `Auto refill` exists "so generation continues without interruption once the monthly pool runs out", which implies a without-auto-refill interruption state that is never described. `[absent]`

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.**

### Metered-billing disclosure — the strongest in this batch `[observed]`

Runway defines its billable unit on the pricing page itself, in a FAQ, in one sentence, with a worked rate:

> Q: `How do credits work?`
> A: "Credits are the unit you spend to generate images, video, and audio on Runway. Each model uses a set number of credits per generation depending on the model, duration, and resolution — for example, Gen-4.5 uses 12 credits per second of generated video. Paid plans include a monthly credit allotment, and the Free plan includes a one-time deposit of 125 credits that doesn't expire."

Three variables named (`model, duration, and resolution`), one concrete rate given, and the Free-plan exception stated in the same breath. Compare Descript (167), which defines its two units but publishes no rate at all.

**Plan cards translate credits into output, per model, on the card** `[observed]`:

- Standard: "625 credits monthly = 52s of Gen-4.5, 104s of Gen-4 Turbo, or 78 Gen-4 Images (1080p)."
- Pro: "2250 credits monthly = 187s of Gen-4.5, 375s of Gen-4 Turbo, or 281 Gen-4 Images (1080p)."
- Max: "9500 credits = 791s of Gen-4.5, 791s of Gen-4, 1900s of Gen-4 Turbo, 1187 Gen-4 Images (1080p), or 475 Nano Banana Pro images (2K)."
- Free: "125 one-time credits to explore Runway's AI tools."

**This is the pattern to steal.** An abstract currency is immediately re-expressed in the units the buyer actually cares about — *seconds of video* and *number of images* — with the model named because the exchange rate differs per model. The Max card's five-way expansion is arguably too dense, but the principle holds: never state a credit allowance without converting it.

**A full per-model rate table is published pre-auth** `[observed]`, with rate and annual-yield columns:

| Model | Published rate |
|---|---|
| `Gen-4.5` | `60 credits/5s` (elsewhere stated as 12 credits per second) |
| `Aleph 2.0` | `140 credits/5s` |
| `Seedance 2.0 Pro1080p` | `160 credits/4s` |
| `Seedance 2.0 Fast` | `116 credits/4s` |
| `Gen-4 Image1080p` | `8 credits/image` |
| `Gen-4 Image Turbo` | `2 credits/image` |
| `Nano Banana Pro 22K` | `11 credits/image` |
| `Nano Banana Pro2K` | `20 credits/image` |
| `Seed Audio 1.0` | `15 credits/min` |
| `Lyria 3 Pro` | `8 credits/song` |
| `Lyria 3 Clip` | `4 credits/song` |
| `Text to Speech` | `1 credit/50 chars` |

Note the **denominator changes per modality**: per-5-seconds for video, per-image, per-minute for audio, per-song for music, per-50-characters for speech. Runway does not force a single unit; it uses the natural unit of each medium and lets credits be the common currency underneath. For a multi-modal metered product this is the right call.

**Rollover and expiry rules, stated three times with increasing precision** `[observed]` / `[documented]`:

- Plan card (Max only): `Credits roll over 1 mo.` and `Roll over unused credits for 1 month`
- Pricing FAQ: "On the Standard and Pro plans, monthly credits don't roll over — they reset within 24 hours of your billing date each cycle. On the Max plan, up to one month of unused credits rolls over to the following month. Any additional credits you purchase never expire."
- Help article, as a labelled list by credit *provenance*:
  - `Standard, Pro and Unlimited:` "Monthly credits expire on your billing date."
  - `Max:` "Up to one month of unused credits may roll over to the following month."
  - `Team:` "Up to one month of unused pooled credits may roll over to the following month."
  - `Purchased credits:` "Do not expire."
  - `Free plan (one-time deposit):` "Does not expire."

Then the rule almost no metered product publishes:

> "Credits are spent in a set order: the current month's plan credits first, then rollover credits, then additional purchased credits."

**Spend-order disclosure is the standout compliance-UX artefact in this file.** When a user holds three pools of credits with three different expiry rules, the consumption order determines how much value they lose. Publishing it, unprompted, in plain language, is exactly the kind of disclosure that most loyalty-points, wallet-balance and prepaid-credit products omit. Directly transferable to any product with multiple balances of differing expiry.

**Run-out and top-up** `[observed]`: "If you need more credits, you can purchase additional credits from the Plans & Billing page in your dashboard. The minimum purchase is 1,000 credits." The 1,000-credit floor is disclosed on the pricing page, not hidden in checkout. Free-plan users cannot buy credits ("Credit purchases are not available to Free plan users") — an exclusion stated plainly.

**Plan-change mechanics** `[observed]`: "upgrades are prorated, so you only pay the time-adjusted difference and receive the additional credits right away. If you downgrade, the unused balance is applied as a credit toward your next billing cycle and your current plan stays active until then." Both directions described; the downgrade answer explains what happens to money already spent.

**Credits are ring-fenced from the API** `[documented]`: "Credits or plans purchased in Runway are completely separate from credits purchased for the Runway API. Runway credits will never appear in your API credits, and vice versa." A same-name-different-wallet trap, disclosed before it bites.

**Tax disclosure** — not observed on the pricing page. `[absent]` (contrast ElevenLabs, which states "Prices exclude all taxes, levies and duties.")

### Usage policy — six prohibited categories `[observed]`

`runway.com/safety/usage-policy`, `Last updated March 6, 2026`, breadcrumbed under `Safety` with the eyebrow `Trust & Safety`. Opening frame:

> "Our usage policy — combined with our Standard Terms of Use and Enterprise Terms of Use — seeks to enable creative expression, while mitigating the risk of potential harm."

Categories, each introduced by the identical stem `We prohibit the following:`:

1. `Children's Safety`
2. `Violence & Gore`
3. `Sexually Explicit Content & Nudity`
4. `Hateful Conduct, Harassment, and Self-Harm`
5. `Content that May Violate the Rights of Others`
6. `Misleading Content`
7. `Additional Character & Game Worlds Policies`

**The rights-of-others category is the likeness rule, and it is broader than most** `[observed]`. Four bullets, summarised: using an image, video or audio of another person without permission; content compromising others' privacy; content that may violate IP rights; and — the unusual one — **"Attempts to create content in the style of a known, living artist."**

A style prohibition scoped to *living* artists is a specific, defensible line that few generative products draw in public policy text. It is also the rule most directly in tension with how image and video models are actually prompted, which makes publishing it a real commitment.

**Child-safety enforcement is specific and names the reporting body** `[observed]`: CSAM is reported to "the National Center for Missing and Exploited Children (NCMEC), which works with global law enforcement agencies around the world, and we indefinitely suspend all associated accounts." Also: "We also apply a stricter standard for potential harmful and inappropriate content (as outlined below) when a child is depicted."

**Product-specific overlay rules** `[observed]` — Characters & Game Worlds adds three prohibitions on top of the general policy, including "Characters based on the face or voice of a person under the age of 18" and characters "intended to provide medical, legal, or financial advice or mimic professional therapeutic or counseling interventions."

Stating that the general policy applies **and then adding product-specific rules in the same document** is a good structure — the user does not have to reconcile two policies.

**Self-scoping honesty** `[observed]`: "This list is not exhaustive, and these policies will continue to evolve over time as our products and their use changes." And a sentence that answers the question the policy provokes: "You can learn more about your content ownership and commercial rights here." Routing from prohibition to entitlement at the foot of the policy is thoughtful.

### Safety architecture — four named stages `[observed]`

`Prevent` → `Detect` → `Enforce` → `Transparency`, each with named sub-mechanisms:

- **Prevent**: `Usage policy` ("This policy sets the foundation for all of our safety work"), `Model-Level Safeguards` ("filtering data before training and applying post-training techniques"), `Red Teaming`, `Product-Level Safeguards`
- **Detect**: `Input & output detection`, `Human review`, `Continuous monitoring`
- **Enforce**: `Account enforcement`
- **Transparency**: `Provenance signals` — "We implement C2PA so that AI-generated content can be traced back to its source."

Framing sentences worth recording: "Safety is built into our products from the ground up, not bolted on after the fact." and "We focus on preventing the creation of content that is inherently harmful, while preserving the creative freedom that makes our tools valuable to creatives, brands, and frontier builders everywhere."

The second sentence names the trade-off explicitly rather than pretending safety is costless. ElevenLabs (170) uses a near-identical four-stage structure (`Inform`/`Enforce`/`Detect`/`Prevent`) — **the four-verb safeguard ladder appears to be an emerging house style across the generative sector**, and is worth noting as a convention rather than a Runway invention.

### AI-disclosure / provenance `[observed]`

C2PA is claimed, and a **verification tool is given a permanent footer slot**: `Verify Content Credentials` → `runway.com/safety/verify`. Reporting route: `Report content` → `runway.com/report-content`, offered on both the safety page and the usage policy with identical framing: "If you find content which raises concerns, and you believe it was created with our tools, please report it here."

**Gap:** no statement about whether outputs carry a visible watermark, and no free-tier watermark policy stated positively — it is inferable only from the Standard plan's `No watermarks` bullet, which implies the Free plan watermarks without ever saying so. `[absent]` for an explicit free-tier watermark disclosure.

### Commercial rights `[documented]`

Not stated on the pricing page. Routed to a help article, `Can I use the content I made in Runway for commercial purposes`, linked only from the foot of the usage policy. For a product sold to brands and agencies, commercial-rights language being absent from the pricing page and reachable only via the policy footer is a findability problem.

## T11 Help-centre architecture

Two-level: six categories → named sections → articles, with sections surfaced on the index (see T1).

**The help home leads with a product, not with help** `[observed]`. Before `Featured articles` or `All articles`, the page runs a hero for `Runway Agent` with its own video, the line "Describe what you need. Agent handles the rest.", and two CTAs: `Try now` and `See docs`. The help centre is being used as a marketing surface for the newest feature. Defensible if the feature genuinely reduces support load; risky in that a user arriving with a problem meets a promotion.

**`Featured articles` is scoped to recency** `[observed]`: "The latest models and features, with everything you need to start using them." — currently `Creating HDR videos with Runway Ruby` and `Editing images with Seedream 5.0 Layers`. The featured slot is a **release-notes surface**, which is correct for a product shipping models monthly: the most-needed help at any moment is for the thing that just launched.

`All articles` scope line: "Every help center article, organized by topic and product area."

**Article-title grammar — three shapes:**

| Shape | Example |
|---|---|
| Gerund task | `Creating with Runway Agent`, `Creating HDR videos with Runway Ruby`, `Generating in Unlimited Mode`, `Setting up Auto Refill for Credits` |
| `How do/can I …?` | `How do credits work?`, `Can I have credits refunded?` |
| `Why …?` | `Why does the Unlimited plan have credits?`, `Why do I see a charge and a refund for the same generation?` |

Gerund titles dominate for tasks; question titles are reserved almost entirely for **billing**, where the user's state is confusion rather than intent. That split is deliberate and worth copying.

**Routing furniture** `[observed]`: header offers `Go to Runway` and `Get Help`; the foot is headed `Need more help?` with `Go to Discord` and `Learn on Runway Academy`. Community and education are offered as the escalation path; a support-ticket route exists but only via the `Get Help` article (`How to submit a support request`). **Discord is more prominent than the ticket form** — a creator-product convention, but it means the formal channel is two clicks deeper than the informal one.

**Runway Academy is a separate property** (`academy.runwayml.com`) carrying `models-pricing` and meetups, and is where the actual craft/prompting education lives. Splitting "how the software works" (help centre) from "how to be good at this" (Academy) is a legitimate architecture, but it means a user searching the help centre for prompt guidance finds none. Recorded as the main reason this file's coverage of the flagged strength is partial.

## T12 FAQs

**Pricing page — 4 questions.** The only FAQ block found on Runway's marketing surfaces. Questions verbatim, answers summarised.

| # | Question (verbatim) |
|---|---|
| 1 | Can I change my plan after subscribing? |
| 2 | How do credits work? |
| 3 | What if I need more credits? |
| 4 | Do my credits roll over or expire? |

Four questions, all about money, sequenced as **commitment → unit → exhaustion → expiry**. That is exactly the anxiety order for a metered product: *am I locked in, what am I buying, what if I run out, what if I don't use it.* No product, quality, rights or safety questions appear in the FAQ at all.

Answer structure is consistent: direct answer first word ("Yes."), then mechanism, then the exception. Q1 answers both directions in one paragraph. Q4's answer is the densest, covering three plan behaviours and purchased credits in three clauses.

**No FAQ block exists on the homepage, product page, safety page or usage policy.** `[absent]`. The safety page has "Frequently asked questions" in neither name nor structure; ElevenLabs by contrast runs FAQ accordions on nearly every page. Runway's FAQ real estate is entirely spent on billing.

## T13 Terminology & glossary

**PRIORITY SECTION.**

| Term | Runway's usage | The alternative it rejected |
|---|---|---|
| `credits` | The single billable unit across video, image, audio, music and speech | "tokens", "generations", "renders", "minutes" |
| `generation` | One billable creative act; the unit a charge and refund attach to | "render", "job", "output" |
| `Parallel generations` | Concurrency, sold as a plan entitlement | "queue slots", "concurrent jobs" |
| `credit allotment` | The monthly grant | "quota", "allowance" |
| `one-time deposit` | The Free plan's non-expiring 125 credits | "trial credits", "free credits" |
| `Top-up credits` / `purchase additional credits` | Buying mid-cycle | "overage", "pay-as-you-go" |
| `Auto Refill` | Automatic top-up when the pool empties | "auto-recharge" |
| `pooled credits` / `shared across the workspace` | Team-plan balance model | "per-seat credits" |
| `Real-World Intelligence` | The umbrella research claim, capitalised | "AGI", "foundation models" |
| `General World Model` / `GWM-1` | The model class | "world simulator" |
| `Interface World Model` | Solaris's model class | |
| `Gen-4.5`, `Gen-4`, `Gen-4 Turbo`, `Gen-4 Image`, `Gen-4 Image Turbo` | The **Gen-series** naming spine: family → point version → variant | "v4.5", "Runway 4" |
| `Aleph 2.0`, `Ruby`, `Solaris`, `Act-Two` | Named non-numbered models, each for a distinct capability | |
| `prompt adherence` | The quality dimension for how closely output follows the prompt | "accuracy", "fidelity to prompt" |
| `Apps` | Named single-purpose generation tools | "presets", "templates", "recipes" |
| `Recipes` | Distinct concept, Dev-side only | |
| `Workflows` | User-built node graphs chaining models | "pipelines", "chains" |
| `Agent` | Conversational end-to-end creation | "assistant", "copilot" |
| `Brand Kit` | Brand-asset container, a plan entitlement | "brand studio" (Descript's word) |
| `Model Router` | Dev-side model selection layer | |
| `Content Credentials` | The user-facing name for C2PA provenance | "watermark", "metadata" |
| `Studio-grade quality generations` | Max-plan output formats: `HDR, ProRes, image sequences` | "professional export" |
| `Unlimited Mode` | A generation mode that coexists with credits — see the contradiction article in T7 | |
| `Characters` / `Game Worlds` | Real-time interactive products with their own policy overlay | |

**Naming observations.**

1. **The Gen-series is the clearest model-naming scheme in this batch.** `Gen-4` → `Gen-4.5` communicates a within-family improvement; `Gen-4 Turbo` and `Gen-4 Image Turbo` communicate speed/cost variants of a known quality level. A user reading the credit table can infer the trade-off structure from the names alone before reading a single rate. Contrast the named models (`Aleph`, `Ruby`, `Solaris`) which carry no such information — Runway uses numbered names where users must compare, and proper nouns where the capability is categorically new. That is a defensible rule, applied consistently.

2. **Third-party model names are surfaced to end users unmodified**: `Kling 3.0`, `Nano Banana Pro`, `Seedance 2.5`, `Seedream 5.0`, `FLUX.2 [max]`, `Gemini Omni`, `Claude Opus 4.8`, `Eleven v3`, `Lyria 3`, `Topaz AI Upscale`, `HappyHorse 1.0`. Runway does not rebrand them. A non-technical creator on the pricing page must therefore pick between `Seedance 2.0 Pro1080p` at 160 credits/4s and `Seedance 2.0 Fast` at 116 credits/4s with no plain-language guidance on the difference beyond the words "Pro" and "Fast". **This is the clearest usability cost of Runway's terminology strategy** and the strongest argument for the `Model Guides` help section existing.

3. **A concatenation defect runs through the pricing table**: `Gen-4 Image1080p`, `Nano Banana Pro2K`, `Seedance 2.0 Pro1080p`, `Nano Banana Pro 22K`. The resolution qualifier is being appended without a separator. `Nano Banana Pro 22K` is genuinely ambiguous — it reads as a model called "Pro 22K" rather than "Pro 2" at "2K". In a table whose entire purpose is letting users compare cost per output, an ambiguous model name is a material defect.

4. **`Unlimited` and `Max` coexist as plan names** — the pricing page shows `Free / Standard / Pro / Max`, while the help centre credit table lists `Standard / Pro and Unlimited / Max / Team / Enterprise`. Six plan names across two surfaces, with `Unlimited` appearing only in help and `Team` appearing only in help and a news post. The marketing pricing page and the help documentation do not agree on what plans exist.

## T14 Voice, tone & accessibility

**Person and tense.** First-person plural is used heavily and deliberately in safety and research contexts ("We are building foundational General World Models", "We prohibit the following", "We review user reports", "We're committed to"). Second person appears mainly in product and billing copy ("you can purchase", "your billing date"). The company is a visible, named actor precisely where accountability matters — which is the right distribution.

**Register.** Declarative, spare, unornamented. Very few contractions on the marketing pages. No jokes. No exclamation marks found. Sentence fragments used as headers (`Dozens of tools. Endless ways to create.`). The tone is closer to a research lab's than a creator tool's, and this is consistent even on the product page. Contrast Descript (167), which is relentlessly comic.

**Tone does not flatten as stakes rise — because it never rose.** The register on the usage policy is the same register as the homepage. For once this is a strength: there is no jarring gear-change between "Building Real-World Intelligence" and "We prohibit the following", because both are written flat.

**Numbers as trust devices** `[observed]`: `60M+ users globally`, `60m+ creatives around the world`, `Trusted by 60M+ creators and leading enterprises`, `720p at 24 fps`, `48,000 Hz`, `Save $36/year` / `$84/year` / `$228/year`. The savings figures are stated as absolute dollars per year rather than only as `-20% off`, which is more useful. Note the 60M figure appears three times with three different formattings (`60M+`, `60m+`, `60M+`) and two different nouns (`users`, `creatives`).

**Accessibility content** `[observed]`

- `Skip to main content` links are present on the **help centre and status page** (Zendesk and Atlassian templates respectively) and **absent from the marketing site**. The accessible skip-link is inherited from third-party platforms, not authored.
- Alt text on marketing pages is largely **absent or empty**: the hero image renders as `![](<>)`, background images as `![](...rectangle-bg.png)` with no alt. Model logos in the plan cards (`Gen-4.5`, `Kling 3.0`, `Nano Banana Pro`) are images with adjacent text labels, which is acceptable.
- App-grid entries use a repeated-name pattern — `Remove from Video IconRemove from Video...Remove from Video Thumbnail` — which suggests icon and thumbnail images carry alt text duplicating the visible link text. A screen-reader user would hear the app name three times per card. **Recorded as a suspected defect, not confirmed**, since this may be a text-extraction artefact.
- Large amounts of the product page's meaning are carried in **`.mp4` and `.webm` files with no captions, transcript or text equivalent** — the before/after demonstrations, the workflow explainer, the Agent hero. For a video-generation product this is an uncomfortable finding: the explanation of what the product does is itself inaccessible.
- **No accessibility statement page exists.** No `/accessibility` link in any footer group. `[absent]`
- A `Code of Conduct` link sits in the legal footer strip beside `Terms of Use` and `Privacy Policy` — community conduct given the same weight as contract terms.

**Negative findings, recorded honestly**

- Homepage does not say what the product does in plain language; the word "video" is absent from the hero.
- Bare `Learn more` used roughly a dozen times on one page.
- `Nano Banana Pro 22K` and `Gen-4 Image1080p` — model-name/resolution concatenation without a separator, in the cost-comparison table.
- Plan naming disagrees across surfaces: `Max` (pricing) vs `Unlimited` (help); `Team` absent from the pricing page's Individual tab.
- `Why does the Unlimited plan have credits?` — a help article that exists because a plan name is misleading.
- `Gen-4.5` rate stated as `60 credits/5s` in the table and `12 credits per second` in two FAQ answers. Arithmetically identical, but the user must do the conversion to notice.
- A ticket-sales banner sits above the CSAM section of the usage policy on every load.
- `1 custom voice clone` sold as a plan entitlement with no consent copy on the pricing or product page.
- Commercial-rights information is reachable only from the foot of the usage policy.
- Product page depends heavily on uncaptioned video to explain itself.

---

## Transferable patterns

1. **Never state a credit allowance without converting it into output.** "625 credits monthly = 52s of Gen-4.5, 104s of Gen-4 Turbo, or 78 Gen-4 Images (1080p)." The conversion belongs on the plan card, not in a FAQ. Condition: requires stable per-model rates you are willing to publish — which is itself the discipline.
2. **Publish the spend order when a user holds multiple balances.** "current month's plan credits first, then rollover credits, then additional purchased credits." Any product with tiered, promotional, or expiring balances should ship this sentence. It costs nothing and it is the difference between a user losing value knowingly and losing it silently.
3. **Use the natural unit of each modality, with one currency underneath.** `credits/5s`, `credits/image`, `credits/min`, `credits/song`, `credits/50 chars`. Do not force a single denominator across media types.
4. **Turn a recurring prompt pattern into a named app.** `Change Time of Day`, `Relight Scene`, `Reshoot Product`. Verb + Object naming, one-sentence description that names the input gesture. This is the highest-leverage answer to "what do I type?" and it transfers to any product where the user must author an instruction.
5. **Demonstrate instruction grammar instead of explaining it.** Six lowercase chips — `change outfit`, `remove background` — beside a before/after pair teach terseness faster than a prompt guide. Condition: only works when the model genuinely accepts that terseness.
6. **Name the trade-off axis, not just the two products.** Agent ("Describe what you need. Agent handles the rest.") vs Workflows ("for even more control of your generations"). Giving users the word "control" lets them self-select.
7. **Question-form help titles for billing, gerund-form for tasks.** Reserve "Why…?" for where the user's state is confusion rather than intent. Runway applies this split cleanly.
8. **Scope a style prohibition precisely.** "Attempts to create content in the style of a known, living artist." Narrow, checkable, defensible — better than a vague "respect IP" line.
9. **Counter-example — do not let the research voice own the front door.** Runway's homepage optimises for a non-purchasing audience and defers every user-comprehensible sentence to `/product`. If a product page and a homepage are written for different readers, the homepage should route, not substitute.

## Caveats & gaps

- **The flagged strength is only partially covered.** Runway's prompt-craft education lives on `academy.runwayml.com`, which was outside the fetch set. The prompt-writing guidance, model-specific prompting advice and the `Model Guides` help section were not opened. Anything in this file about prompt input is inferred from app naming, edit-instruction chips, and pricing-page parameter disclosure — not from a prompt guide.
- **`runway.com/safety` failed on first fetch** (aborted) and succeeded on retry. No content was lost, but the site was intermittently slow; other retries were needed for the usage policy and the credits article.
- **All in-product strings are unreachable.** The generation form, prompt field, moderation-refusal message, credit-balance display, progress states and empty states are all behind `app.runwayml.com`. T5, T7 and T8 are correspondingly thin and honestly marked.
- **Only nine pages inspected.** Not harvested: `/enterprise`, `/data-security`, `/terms-of-use`, `/privacy-policy`, `/coc`, `/use-cases`, `/workflows`, `/product/characters`, `/product/agent`, `/mcp`, `/changelog`, the Dev platform (`dev.runwayml.com`), the Dev docs (`docs.dev.runwayml.com`), Runway Academy, and all but one help article.
- **Marketing-page FAQ answers were retrievable** (server-rendered); they are summarised here per schema rules.
- **Locale.** en-US only; the site advertises a `pt_BR` alternate that was not checked. All prices USD.
- **Model roster is volatile.** The models and rates recorded here are a snapshot of 2026-09-21 and will be stale quickly — Runway ships model releases at a cadence its own help centre organises around. Treat every model name and credit rate in this file as dated.
- **The video-heavy product page** means some product explanation was not captured as text and could not be assessed.

## Sources

1. https://runwayml.com/ (redirects to https://runway.com)
2. https://runway.com/product
3. https://runway.com/pricing
4. https://runway.com/safety
5. https://runway.com/safety/usage-policy
6. https://help.runwayml.com/hc/en-us
7. https://help.runwayml.com/hc/en-us/sections/25284018285459-Credits
8. https://help.runwayml.com/hc/en-us/articles/15124877443219-How-do-credits-work
9. https://status.runwayml.com/
