# 170. ElevenLabs

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Generative voice and TTS (voice cloning, dubbing, music, ASR, conversational voice agents) |
| Primary URL | https://elevenlabs.io/ |
| Corpus rank | 170 |
| Benchmark strength (source list) | Voice creation and consent |
| Locale / market observed | en (site offers a language switcher and an `/india` regional page) |
| Platform observed | Web (marketing), Fern-built docs (`elevenlabs.io/docs`), Zendesk help centre (`help.elevenlabs.io`), incident.io status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **The most regulated posture in this batch.** Named in public copy: EU AI Act (Regulation (EU) 2024/1689, with prohibited/high-risk classification duties), EU DSA-style appeals and out-of-court dispute settlement, GDPR, SOC 2, HIPAA (BAAs offered), C2PA, US tax withholding under W-8/W-9 with Form 1042-S issuance, Stripe Connect payout jurisdictions, COPPA-adjacent age gating (under-13 prohibited, 13–18 with guardian consent), and a Government Entity use restriction. |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Full for the flagged strength — consent, verification, prohibited use, AI-disclosure, provenance and marketplace payout language were all captured verbatim at the string level. Partial elsewhere: marketing-page FAQ **answers** are client-rendered accordions and were not retrieved (questions captured verbatim); the help centre directory exceeded fetch limits. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://elevenlabs.io/ | Two-platform architecture, model timeline, three-principle safety block |
| Pricing | https://elevenlabs.io/pricing | Seven tiers, credits, 11-question FAQ (questions only), comparison matrix |
| Safety | https://elevenlabs.io/safety | Five principles, four-stage safeguard ladder, reporting routes |
| Voice Cloning (marketing) | https://elevenlabs.io/voice-cloning | IVC vs PVC comparison, responsible-use block, 10-question FAQ |
| **Prohibited Use Policy** | https://elevenlabs.io/use-policy | **Nine prohibition categories + disclosure and human-in-the-loop requirements** |
| Docs: Voice Cloning overview | https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning | Recording guidance, 14 expanded FAQs including the consent refusal |
| Docs: Professional Voice Cloning | https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/professional-voice-cloning | **Seven-step creation flow including verification** |
| Docs: Voice Library | https://elevenlabs.io/docs/eleven-creative/voices/voice-library | **Notice period, Live Moderation, naming/description guidelines, publishing consent step** |
| Docs: Payouts | https://elevenlabs.io/docs/eleven-creative/voices/payouts | **Voice Actor Payouts, thresholds, W-8/W-9, 60-country list** |
| AI Speech Classifier | https://elevenlabs.io/ai-speech-classifier | Provenance detection tool, three-step explainer, a stated blind spot |
| Status | https://status.elevenlabs.io/ | Component tree by platform |

---

## T1 Navigation & IA labels

**Global nav — five items, three of them dropdowns** `[observed]`:

`Products` · `Solutions` · `Customers` · `Resources` · `Enterprise` · `Pricing`, with `Log in`, `Sign up` and `Contact sales`.

**A second, product-scoped nav appears on product pages** `[observed]`. On `/voice-cloning` and `/ai-speech-classifier` the global nav is replaced by an `ElevenCreative`-branded bar: `Platform` · `Models` · `Docs` · `Customers` · `Pricing`. The site switches into a sub-brand context once you enter a product area — the same pattern Runway (168) uses with its three platforms, but implemented as a nav swap rather than as separate sites.

**The footer is the substantive IA — four groups plus socials and company** `[observed]`, organised by the two-platform-plus-API structure:

- **`ElevenCreative`** — `Text to Speech`, `Speech to Text`, `Voice Changer`, `Text to Sound Effects`, `Voice Cloning`, `Voice Isolator`, `AI Music Generator`, `Studio`, `Voice Design`, `AI Voice Generator`, `AI Image Generator`, `AI Video Generator`, `Ads Engine`
- **`ElevenAgents`** — `Voice Agents`, `Conversational AI`, `Integrations`, then seven **verticals**: `Telecommunications`, `Financial Services`, `Healthcare`, `Government`, `Technology`, `Retail & E-commerce`, `Travel & Hospitality`, plus `Customer Support`, `Chatbots`
- **`ElevenAPI`** — `API Reference`, `Agents API`, `Speech Engine`, `Dubbing API`, `Text to Speech API`, `Speech to Text API`, `Sound Effects API`, `Music API`, `API Key`
- **`Resources`** — `Blog`, `Iconic Marketplace`, `Impact Program`, `Startup Grants`, `Help Center`, `Webinars`, `Docs`, `Enterprise`, `Trust Center`, `India`
- **`Company`** — `About`, `Careers`, `Safety`, `Brand & Press Kit`, `ElevenLabs Summit`, `Policies`, `Cookie Settings`

`Safety` has a permanent footer slot under `Company`, and `Trust Center` (a compliance portal at `compliance.elevenlabs.io`) sits under `Resources`. `Iconic Marketplace` — licensing of historical and celebrity voices — is filed under `Resources` rather than under products, which under-weights a product with significant likeness implications.

**Docs IA — the cleanest structure in the batch** `[observed]`. Six top-level tabs: `Overview` · `ElevenCreative` · `ElevenAgents` · `ElevenAPI` · `Reception.ai` · `API reference` · `Changelog` · `Help Center`. Within ElevenCreative, seven sections:

`Get started` · `Playground` · `Products` · `Voices` · `Audio tools` · `Services` · (unlabelled) `Troubleshooting`

`Playground` as a named section — `Text to Speech`, `Voice Changer`, `Sound Effects`, `Speech to Text`, `Image & Video` — separates "try a model" from "use a product". `Voices` is its own section containing `Voice library`, `Voice cloning` (with `Instant` and `Professional` children), `Voice Design` and **`Payouts`**. Filing the monetisation doc inside the *Voices* section, beside the cloning docs, rather than under billing, is correct: the person reading about cloning their voice is the person who may monetise it.

**Docs are LLM-addressable** `[observed]`: "For AI agents: a documentation index is available at the root level at /llms.txt. Append /llms.txt to any URL for a page-level index, or .md for the markdown version of any page." Same practice as Descript (167).

## T2 Value proposition & headline patterns

**Hero — three words, no product noun** `[observed]`

> H1: `Bringing technology to life`
> Sub: "Powering the best enterprises, creators, and developers. From ElevenAgents for customer experience, ElevenCreative for content creation, to the leading AI voice generator."

Like Runway (168), the H1 says nothing about what the product does; unlike Runway, the sub-headline immediately names all three sub-brands and their jobs. The meta description does the plain-language work the hero declines to: "Create lifelike speech with our AI voice generator and voice agents platform. Access 5,000+ voices in 70+ languages with secure APIs and SDKs."

**Note the number conflict:** the meta description says `5,000+ voices`; the voice-cloning page says `10,000+ voices from the library`; the AI Speech Classifier page says `11,000+ voices` in a CTA and `10,000+ voices` in two headings on the same page. **Four different voice counts across three pages, two of them on one page.** Recorded as a defect.

**Platform framing repeats the Runway formula** `[observed]`: `Two platforms built on the same research foundation`, then one line each:

- `ElevenCreative` — "Generate ultra-realistic speech, videos, music, and sound effects."
- `ElevenAgents` — "Configure, deploy and monitor conversational agents."

Both are **verb-triplets**. The agents line — "Configure, deploy and monitor" — is the lifecycle, not the capability, which correctly signals an ops product rather than a creative one.

**Section headers are capability claims with a scope clause** `[observed]`:

- `Create, edit, and localize in one AI platform`
- `Deploy agents that talk, type, and take action`
- `Or build anything with a powerful host of APIs`
- `Research that redefines human technology interaction`
- `Showcasing the global impact of AI audio research`
- `Safety, built in`

`Safety, built in` — two words and a comma, given the same header weight as the product sections, sitting on the homepage above the fold-equivalent of the latest-updates block. Compare Runway's "Safety is built into our products from the ground up, not bolted on after the fact." Same claim; ElevenLabs compresses it to a homepage section header.

**The research timeline as a value-proposition device** `[observed]` — eleven dated model releases rendered as a chronology, each with a one-line superlative and a month:

`Eleven Multilingual v2` (Aug 2023) "Our most consistent and lifelike Text to Speech model" · `Eleven Turbo v2` (Nov 2023) · `Eleven Flash v2.5` (Dec 2024) "Our ultra-low latency Text to Speech model" · `Scribe` (Feb 2025) "The original Scribe model, later surpassed by Scribe v2" · `Eleven v3` (Jun 2025) "The most expressive Text to Speech model ever released" · `Eleven Music` (Aug 2025) · `Scribe v2 Realtime` (Nov 2025) · `Scribe v2` (Jan 2026) · `Expressive Mode for Agents` (Feb 2026) · `Music v2` (May 2026) · `Dubbing v2` (May 2026)

The `Scribe` entry is the notable one: **a superseded model is left on the timeline with its own obsolescence written into the description** — "later surpassed by Scribe v2". Most vendors delete the predecessor. Keeping it, and saying why it is gone, makes the timeline read as a record rather than a brochure.

**Model one-liners optimise on a named axis** `[observed]`: `Eleven Flash` — "75ms latency for conversational usecases"; `Eleven Multilingual` — "Best lifelike consistent speech"; `Eleven v3` — "Our most expressive model yet"; `Eleven Scribe` — "98% accuracy". Four models, four different optimisation targets, each stated as the only differentiator. The TTS API block frames the choice explicitly: "Choose a model to optimize for consistency, latency or emotional control." Naming the three axes before listing the models is the right order.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Nav, hero, repeated ~8× site-wide | Dominant acquisition CTA |
| `Log in` | Nav | |
| `Contact sales` | Nav, hero, page foot | |
| `Talk to sales` | Page-foot block on home, pricing, safety | **Inconsistent with `Contact sales`** — same destination |
| `Build for free` | Pricing, Free tier | "Build", not "Start" — developer-framed |
| `Choose Starter` / `Choose Creator` / `Choose Pro` / `Choose Scale` / `Choose Business` | Pricing cards | `Choose <PlanName>` — tier named in the button, same good pattern as Runway's `Get <Plan>` |
| `Contact us` | Pricing, Enterprise tier | A third label for sales contact |
| `Clone your voice` | Voice-cloning page, repeated 3× | Verb + object, imperative |
| `Try free • Trusted by 1M+ creators` | Voice-cloning banner | **CTA with social proof concatenated into the label** |
| `Upload samples` / `Record yourself` | Voice-cloning page (mirrors in-product) | The two input paths surfaced as CTAs pre-auth |
| `Explore the docs` / `Explore docs` | Voice-cloning, API block | Two labels, one action |
| `Create an AI agent` | Page-foot block | |
| `Get API key` / `Get the app` / `Learn more` | API and mobile blocks | |
| `Read all stories` | Customer block | |
| `Explore Voice Library` / `View Iconic voices` / `Explore 11,000+ voices` | Classifier page | Three labels for browsing voices |
| `Use Voice` | Voice cards | |
| `Upload` | Classifier tool | The only functional control on a public page |
| `Report Content` | Safety page | Title Case |
| `View Policy` | Safety page → Prohibited Use Policy | |
| `Learn More` / `Learn more` | Safety page, inconsistently cased in adjacent cards | |
| `Skip to content` | First in DOM, every marketing page | Accessibility |
| `Copy page` | Every docs page | Copies the page as markdown for LLM use |
| `Subscribe to updates` / `Help Centre` | Status page | Note **British spelling** `Centre` here vs `Help Center` in the footer |

**Observations.** `Choose <PlanName>` is the strongest pattern here — seven pricing CTAs, each naming its tier, so no button is ambiguous out of context.

Three labels for contacting sales (`Contact sales`, `Talk to sales`, `Contact us`) and two for docs (`Explore the docs`, `Explore docs`) are live inconsistencies. `Help Center` / `Help Centre` is an en-US/en-GB split across two properties.

`Try free • Trusted by 1M+ creators` packs a claim into the button label. It reads oddly as link text and would be announced in full by a screen reader.

## T4 Onboarding & getting-started

**The voice-cloning flow is documented as seven numbered steps** `[documented]` — the highest-value onboarding sequence in this batch because step 5 is a consent gate.

| Step | Heading (verbatim) |
|---|---|
| 1 | `Navigate to the Professional Voice Cloning page` |
| 2 | `Upload your audio` |
| 3 | `Check the feedback on sample length` |
| 4 | `Process your audio` |
| 5 | **`Verify your voice`** |
| 6 | `Wait for your voice to complete fine tuning` |
| 7 | `Use your voice clone` |

Three things to note. Step 3 exists solely to tell the user the system is **giving them feedback on their input quality before they commit** — "Once your audio has been uploaded, you will see feedback on the length of your samples. For the best results, we recommend uploading at least an hour of training audio, and ideally as close to three hours as possible." A numbered step whose only content is "read the system's assessment of what you just gave it" is unusual and good.

Step 6 is a **waiting step given equal billing to the action steps**, because the wait is hours long and users would otherwise think the flow had failed.

Step 2 carries an inline constraint at the moment of upload: "Professional Voice Clones do not currently support singing. Audio recordings must consist of spoken voice only."

**A simplified three-step version exists on the marketing page** `[observed]` — `Upload Your Audio Sample` → `AI Analyzes Your Voice` → `Generate Natural Speech`, with step 2 written from the system's point of view ("Our artificial intelligence processes your audio files, learning the unique characteristics of your voice"). **The marketing three-step omits verification entirely.** The consent gate that is step 5 of 7 in the docs does not appear in the pre-signup narrative at all. Recorded as a significant content defect: the most distinctive and trust-building element of the flow is invisible to prospects.

**The mode choice is framed before the flow** `[observed]` — `Select the cloning mode based on your needs`, with a two-column comparison:

| Instant Voice Cloning | Professional Voice Cloning |
|---|---|
| "Clone any voice with 1-5 minutes of audio" | "Requires 30+ minutes of clean audio samples" |
| "Voice replica ready in seconds" | "Captures subtle intonation and emotion" |
| "Ideal for content creators and podcasters" | "Perfect for audiobooks and video games" |
| "Supports 32+ languages automatically" | "Enterprise-grade security and voice verification" |
| "Full control over pitch and speaking pace" | "Dedicated support and priority processing" |

Five rows, parallel construction, and the trade-off named in the intro: "Choose between instant voice cloning for speed, or professional voice cloning for high-level realism and long-term use."

**The IVC/PVC distinction is explained mechanically in the docs, not just by outcome** `[documented]`:

> "Creating an Instant Voice Clone (IVC) does not train or create a custom AI model. Instead, it relies on prior knowledge from training data to make an educated guess rather than training on the exact voice."

Telling a user that the fast option is an "educated guess" and not a trained model — and naming when that fails ("if you are trying to clone a very unique voice, or a voice with an accent that the AI might not have experienced extensively during training") — sets a correct expectation that the marketing comparison table cannot.

**A full beginner's recording guide is embedded in the cloning docs** `[documented]` — `Beginner's guide to audio recording`, with sections `Recording location`, `Microphone, pop-filter, and audio interface`, `Digital Audio Workstation (DAW)`, `Positioning`, `Performance`. It recommends named hardware (Audio-Technica AT2020, Rode NT1, Focusrite), named software (REAPER, Audacity), gives price bands ($150–$300 for a mic; $300–$500 for a setup), gives a distance ("about two fists away from the microphone, which is approximately 20cm (7-8 in)"), and gives levels ("Aim for peaks of -6 dB to -3 dB and an average loudness of -18 dB"). The PVC page repeats the levels in RMS terms ("between -23dB and -18dB RMS with a true peak of -3dB").

The `Performance` section is the one that matters for content design:

> "The AI will try to clone everything about your voice to the best of its ability, which is very high. This means that it will attempt to replicate your cadence, tonality, performance style, the length of your pauses, whether you stutter, take deep breaths, sound breathy, or use a lot of 'uhms' and 'ahs' – it can even replicate those."

Listing the flaws the model will faithfully reproduce — stutters, breaths, filler words — is the clearest possible way to explain "garbage in, garbage out" without saying it. Then the rule: "Consistency is key to a proper clone!"

**Register note:** this section drops into lowercase, uncapitalised sentences ("if you are recording a voice either keep it very animated throughout...") mid-document. An editing lapse in an otherwise tightly-written docs set.

## T5 Form & field labels

**PRIORITY SECTION.**

**Voice-creation controls** `[documented]` / `[observed]`:

- Entry: `Voices` → `Create Voice` → `Professional Voice Clone`
- Input paths, offered as two buttons: `Upload samples` and `Record yourself`
- Per-clip processing: `Audio settings` (background-noise removal, speaker separation)
- Post-creation: `Voices` → `Personal` tab → `Use`
- On the marketing page, a voice-attribute panel is shown with four labelled fields: `Language`, `Accent`, `Gender`, `Age` (example values `English`, `Canadian`, `Female`, `Young`)

**Script provision is part of the input design** `[documented]`: "We've included sample scripts for narrative, conversational and advertising purposes. You can also upload your own script." Supplying three genre-matched scripts solves the blank-page problem at the exact moment the user must perform for 30+ minutes.

**Voice Library filters — the taxonomy users search by** `[observed]`:

`Language` · `Accent` · `Category` · `Gender` · `Age` · `Notice period` · `Live Moderation enabled` · `Quality`

with enumerated values:
- **Category:** `Conversational`, `Narration`, `Characters`, `Social Media`, `Educational`, `Advertisement`, `Entertainment`
- **Gender:** `Male`, `Female`, `Neutral`
- **Age:** `Young`, `Middle Aged`, `Old`
- **Quality:** `Any`, `Studio Quality`
- **Sort:** `Trending` ("voices ranked by popularity"), `Latest`, `Most users`, `Character usage`

Two of the eight filters — `Notice period` and `Live Moderation enabled` — are **governance filters exposed as product filters**. A buyer can filter the marketplace by how much contractual warning they will get if the voice is withdrawn, and by whether the voice owner has opted into content moderation. Surfacing terms-of-supply as a shopping facet is the standout input-design decision in this file, and it generalises to any marketplace where supply can be withdrawn.

Each filter carries an explanatory paragraph rather than a tooltip. The `Language` filter's note is a small masterclass in setting expectations: "The language filter returns voices that have been trained on a specific language. While all voices can be used with any supported language, voices tagged with a specific language will perform best in that language."

**Search accepts audio as a query** `[observed]`: "You can also search by uploading or dragging and dropping an audio file. This will help you find the original voice, if available, along with similar voices." Audio-as-search-input is both a discovery feature and, per the help FAQ `How can I identify the voice used to generate audio?`, an **attribution tool** — the same control serves finding a voice and identifying one you have heard in the wild.

**Naming and description guidelines for marketplace listings** `[observed]` — a genuine content style guide published as product documentation:

> "The naming pattern should be a name followed by **key voice traits** or a **voice persona**, separated by a hyphen (-)."
> "The name must be 40 characters or fewer."

Prohibited in names: "Names of public individuals or entities (company names, band names, influencers or famous people, etc)", "Social handles", "ALL CAPS WORDS", "Emojis and any other non-letter characters", "Explicit or harmful words", and — pointedly — "The word 'voice'."

Worked examples given: `Serena - Calm, Friendly, Warm` · `Olivia - Upbeat podcast host` · `Jasper - Deep, Encouraging, Serious` · `Maya - Terror narrator` · `Nelson - Scary villain` · `Harmony - High-energy, High-pitch`

Description guidelines add an anti-spam rule with the enforcement stated: "Do not list unrelated use cases to increase visibility. Voices with misleading or spammy descriptions will not be approved." Followed by a full worked example description ending in two labelled sub-sections, `Best use cases:` and `Key qualities:`.

**Publishing a naming convention, six worked examples, a prohibition list and a model description — as product UI documentation — is directly transferable** to any UGC marketplace, app store listing flow, or template gallery. It is content design shipped as a feature.

**Emotional control syntax** `[observed]` — on the homepage TTS demo, square-bracket audio tags appear inline in the sample text: `[sarcastically]`, `[giggles]`, `[whispers]`. The classifier page names the concept: `Add emotion with audio tags` — "Precise emotional control, embedded directly into every audio tag." **Note the direct conflict with Descript (167)**, which consumes ElevenLabs models and has *deprecated* square brackets in favour of parentheses, blocking generation if brackets are found. The same underlying capability has two incompatible syntaxes depending on which product surface you are in — a real problem for users who move between them.

**Custom voice preview constraint** `[observed]`: "Any generations you've made of 70–150 characters will be available." A character range stated as an eligibility rule for a dropdown.

## T6 Status & state language

**Status page** `[observed]` — organised by the three sub-brands, not by infrastructure:

`ElevenAPI` (3 components: `Text to Speech`, `Speech to Text`, `Other`) · `ElevenAgents` (7 components: `Conversations`, `Telephony`, `RAG`, `Quality`, `Other API endpoints`, `UI`, `Integrations`) · `ElevenCreative` (1 component)

Overall state: `We're fully operational` / "We're not aware of any issues affecting our systems." (Identical incident.io template and wording to Descript's, which uses the same vendor.)

**`Quality` as a monitored status component** is notable — ElevenAgents reports model output quality as something that can degrade independently of availability. For a generative product that is the right thing to monitor, and almost nobody exposes it publicly.

Imbalance worth recording: `ElevenAgents` has seven components and `ElevenCreative` has one. The creator-facing platform — voice cloning, dubbing, music, Studio — is a single undifferentiated status line, while the enterprise agent product is broken out in detail. Contrast Descript (167), whose per-AI-feature tree is far more useful to a creator.

**The richest state vocabulary is the Professional Voice Clone lifecycle** `[documented]`, with user-visible status strings quoted in the docs:

| State | String / description |
|---|---|
| `Draft` | "your voice is incomplete. Generally this is either because you haven't completed creating the voice, or you haven't verified the voice yet." |
| queued | `The training run has been scheduled` — "waiting for a slot to open up so it can be trained" |
| training | `Creating dataset` and `Running fine-tuning` — "You'll see how far through each step in the training process your voice is, indicated by a percentage." |
| retried | `We are sorry the training run experienced issues and has been retried. No further action is required.` |
| ready | `Voice is ready to be used with the model` |
| action needed | `Click to start fine-tuning` — "Some models do not train automatically" |

Two of these deserve attention.

**`We are sorry the training run experienced issues and has been retried. No further action is required.`** — an error message that apologises, states what broke, states that recovery already happened automatically, and closes the loop by telling the user to do nothing. Four jobs in two sentences. "No further action is required" is the sentence most retry messages omit, and its absence is what generates the support ticket.

**Status is per-model, not per-voice.** A single voice clone carries a separate state for each model it is being fine-tuned on (`Flash v2.5`, `Turbo v2.5`, `Multilingual v2`, plus `Flash v2`/`Turbo v2` for English audio), each with its own icon — "Models that the voice has already been fine-tuned on will be displayed with a tick icon, and models that are available for fine-tuning will be displayed with a plus icon." A one-to-many state model surfaced through hover states and icons.

**Voice-type states expressed as icons** `[documented]` — in `My Voices`:
- `Yellow tick:` Professional Voice Clone
- `Black tick:` Studio Quality Professional Voice Clone
- `Lightning icon:` Instant Voice Clone
- `No icon:` voice created with Voice Design

Four provenance states encoded in three icons and an absence. Documenting "no icon" as a meaningful state is correct and frequently forgotten.

**Marketplace withdrawal state** `[documented]`: "Once a notice period is active, users can see in the app when the voice will be disabled." Exposed to developers as `disable_at_unix` on the Get Voice endpoint, with a documented null case: "If the voice has not had its notice period active, this key will not exist or it will say `null`." A contractual state given an API field — and a webhook: "you can also set up a webhook notification for voice removal."

**Timing expectations, stated as ranges with causes** `[documented]`: "Generally fine-tuning takes 3-6 hours to complete, but it can sometimes take a bit longer, depending on the number of other PVCs queued for fine-tuning." Elsewhere "between 6-24 hours" and "it can take up to 24 hours". **Three different upper bounds (3-6, 6-24, up to 24) appear across the cloning docs** — an inconsistency in the single most-asked question about the feature.

## T7 Error, failure & recovery

All `[documented]`; rich.

**Verification failure has a cooling-off period, an escalation, and a checklist** `[documented]` — `What can I do if I failed to verify my Professional Voice Clone (PVC)?`:

> "If you fail all your verification attempts during the creation of your professional voice clone, you can wait 24 hours, after which time you will be able to retry the process."

with a four-item recommendation list, including the non-obvious one: "**Read each verification line only once, then press Stop to stop recording. Reading the line more than once can cause the verification process to fail.**" A failure caused by the user trying *harder* — re-reading for a better take — is exactly the failure a user cannot self-diagnose, and it is documented.

**An irreversible state is disclosed plainly** `[documented]` — `How can I delete my unverified Professional Voice Clone (PVC)?`:

> "Unfortunately, this is not possible. As mentioned during the setup process of your Professional Voice Clone (PVC), once you advance to the verification stage, you are locked in until you've verified your voice."

"you are locked in" — a trap door, named as one, with a note that it was disclosed in-flow. The honesty is good; the design is not, and the article cannot fix it.

**A specific error string is given a whole article** `[documented]` — `What does the error 'No model found for this voice. Please select another voice' mean?` The article explains the cause (using a PVC before fine-tuning completes), the timing, where to check progress, and what notification will arrive. **Titling a help article with the verbatim error string** means a user pasting the message into search lands exactly on the explanation. Simple, and under-used.

**Failure modes are traced to input, with a fix** `[documented]`:
- `Why does my voice or accent not sound correct after cloning?` — "You cannot change the accent or tone of a clone after it is created. To improve the result, change the audio samples you use. Small changes to the samples can make a large difference." Names the irreversibility, then redirects effort to the one lever that works.
- `My professional voice clone failed or is delayed, what can I do?` — a graduated remedy: wait, then delete and re-upload ("This has been shown to help some users"), then review the training audio, then email support.

**Free-tier refusal string** `[documented]`: "If you're on the free plan and you try to use one of these voices, you'll see the message: **'This voice is not available for free users.'**" A gating message quoted verbatim in the docs so users can search it.

**Enforcement and appeals** `[observed]`. The Prohibited Use Policy's `Complaints Handling` section: "If you believe your account has been incorrectly banned, or your material has been incorrectly removed, you can let us know by contacting us here." The safety page's FAQ list includes `What is the appeals system for EU users?` and `How can EU users settle disputes out-of court?` — jurisdiction-specific appeal routes named as FAQ questions.

The Voice Library docs add a graduated consequence for repeat listing violations: "Your request may be declined if it doesn't meet our guidelines, and **repeated uploads that consistently violate our guidelines may lead to restrictions on uploading and sharing voices.**"

**The classifier's own failure is disclosed on the tool** `[observed]`: "Does not reliably classify audio generated with the Eleven v3 model." — see T10.

## T8 Empty states

`[observed]`, minimal. Two strings from the docs search UI: `No results` and `Show all`. Everything else is behind sign-in. `[absent]` for product empty states.

## T9 Notifications & system messages

`[documented]`, and unusually complete for a pre-auth harvest.

**Dual-channel completion notification is stated repeatedly** `[documented]`: "You will receive an email notification once your Professional Voice Clone is ready." / "you will be notified both in-app and by email" / "you will see a pop-up notification, and will also be notified by email". Three statements of the same fact across three articles — consistent, if repetitive.

**Model-availability notification uses an icon convention** `[documented]`: "In the future, if new models are released that support fine-tuning, you will receive a notification. This is shown by an **exclamation icon**, which will appear to the right of your voice in the voice list in My Voices. Hovering over this icon will display the notification." A passive, non-interrupting notification pattern documented down to the hover.

**Marketplace withdrawal notification — the best-specified notification in this batch** `[documented]`:

> "If the voice's owner stops sharing their voice, you'll receive advance notice through email and in-app notifications. These notifications specify **when the voice will become unavailable** and **recommend similar voices from the Voice Library**."

The notification carries a deadline *and* a remedy. A supply-withdrawal message that arrives with replacement candidates attached is the correct design, and it is documented before the user ever depends on the voice. Enterprise users additionally get a webhook so they can notify their own customers: "This can be very useful if you need to be informed as soon as the voice is removed, for example if you need to notify your customers." Cascading the notification obligation down the supply chain is thoughtful.

**Payout notification** `[documented]`: "The W-8/W-9 certification will be requested when your first payout is processed. At this point, you will be notified that you need to complete the certification before you can receive your payouts."

**Status page** offers `Subscribe to updates`.

**Announcement surface**: the homepage `Latest updates` block and a research timeline, both with dated entries. No persistent banner observed.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION. This is the richest disclosure content in the corpus batch and the reason ElevenLabs is the high-value target here.**

### Consent: the hard rule is a refusal

`[documented]` The central consent position is stated as an answer to a question users evidently ask, and it goes further than the question:

> **Q: `Can I create a Professional Voice Clone of someone else's voice?`**
> "No. You can only create a Professional Voice Clone of your own voice. **Even with their consent, you cannot clone someone else's voice.** All Professional Voice Clones require a verification process to confirm that the voice belongs to you."

**"Even with their consent, you cannot clone someone else's voice"** is the single most important string in this file. ElevenLabs does not accept third-party consent for its high-fidelity product at all. Consent is not a form to be signed; it is a verification the speaker must perform in person, on their own account.

The alternative route is given in the same answer: "If someone wants to share their voice with you, they can create and verify a Professional Voice Clone on their own account, then share it with you privately using a sharing link." **The consent is moved into the voice owner's own account and expressed as a sharing permission they can revoke** — which is a materially stronger model than a consent artefact held by the person doing the cloning.

Compare Descript (167), which explicitly supports third-party clones via a portable recorded consent statement ("have them send you a recording of the consent statement"). Two credible products, opposite answers, and the divergence is the most instructive comparison available in this batch.

Restated on the marketing page as a principle `[observed]`: "**Voice cloning is only possible with explicit permission from the voice owner.** Built-in safeguards help prevent misuse while supporting legitimate use cases like voiceovers, audiobooks, and accessibility." And in the docs: "For now, we only allow you to clone your own voice. You will be asked to go through a verification process before submitting your fine-tuning request."

**Note the gap:** the hard rule applies to **Professional** Voice Cloning. Instant Voice Cloning — 1–2 minutes of audio, available from the $6 Starter tier — has **no documented verification step**. The marketing page's "only possible with explicit permission" is therefore a policy statement for IVC and a technical control only for PVC. The policy text (below) does the work for IVC; the product does not. **This is the most significant consent gap in the file and it is not acknowledged anywhere in the consent copy.**

### Verification: Voice CAPTCHA

`[documented]` The mechanism is named in the Payouts documentation:

> "After uploading your samples, you'll complete a **Voice Captcha** verification by reading a short text prompt within a set timeframe. Once verified, your voice will be added to the training queue."

Also named in the Prohibited Use Policy as something you may not evade: "Evade product guardrails, including voice verification mechanisms such as Voice CAPTCHA." And in the safety page's safeguards: "requiring technological verification for access to our Professional Voice Cloning tool."

The user-facing guidance for passing it is written in the docs: "please try to verify your voice using the same or similar equipment used to record the samples and in a tone and delivery that is similar to those present in the samples. If you do not have access to the same equipment, try verifying the best you can."

**Naming the verification step (`Voice CAPTCHA`) gives users, policy and support a shared referent.** The same string appears in a consumer help article, a legal policy and a monetisation doc.

### Celebrity and high-risk voices are blocked at the model

`[observed]` From the safety page's `Prevent` stage: "We also embed product features to deter bad or irresponsible actors, including **blocking the cloning of celebrity and other high risk voices**, and requiring technological verification for access to our Professional Voice Cloning tool."

A categorical technical block, stated as a product feature rather than as a policy. Note the separate `Iconic Marketplace` product exists for licensed celebrity and historical voices — so the block is enforced on unlicensed cloning while licensed likeness is a paid channel. That is a coherent position, but the two facts are never stated together on any single page.

### Children's voices: a named, reasoned prohibition

`[documented]` — `Can Children's or Child-Like Voices Be Added to the Voice Library?`

> "No, children's voices or voices that sound child-like cannot be added to the Library. **This policy applies to voices of minors as well as adult voices designed to mimic or sound like children.**"

The reasoning is given rather than asserted: the decision aligns with the Prohibited Use Policy, "Voices resembling children could be misused in harmful or exploitative ways, and this restriction helps ensure that our platform remains a safe and responsible space for creators and users alike."

Closing the adult-mimicking-a-child loophole in the *second sentence* — before anyone asks — is the move worth copying. A prohibition scoped only to the literal case invites the workaround.

### AI-generated voices cannot be resold as human ones

`[documented]` — `Can I share an AI-generated voice in the Voice Library?`

> "No. **We only allow the sharing of professional cloned voices verified by a human.** Instant Voice Clones, synthetic voices created using Voice Design, AI-generated or AI-enhanced voices cannot be shared in the Voice Library."

With the enforcement stated: "Users attempting to share voices generated with ElevenLabs or other AI tools into the library might be prohibited from sharing any voices in the future or suspended from the platform."

The marketplace is therefore restricted to voices with a verified human behind them — which is what makes the payout system coherent (there must be a person to pay) and prevents laundering synthetic voices as licensable human ones.

### Prohibited Use Policy — nine categories

`[observed]` `elevenlabs.io/use-policy`, `Last Updated 17 August 2026`, explicitly scoped: "applies to your access and use of our Services, **including any Inputs you provide and Outputs you create**. It also applies to your use within and outside our Website and our Services, whether directly or indirectly, **as well as any attempts to engage in such use.**"

Scoping to inputs, outputs, off-platform use and *attempts* closes four loopholes in one sentence.

Category headings, each an imperative:

1. `Do not threaten child safety.`
2. `Do not engage in illegal behavior.`
3. `Do not use the Services to facilitate activities that may significantly affect the wellbeing of others.`
4. `Do not engage in fraudulent, predatory, or abusive practices.`
5. **`Do not engage in unauthorized, deceptive or harmful impersonation.`**
6. `Do not engage in voter suppression, candidate impersonation, or unauthorized political campaigning in the context of elections:`
7. `Do not engage in unauthorized network access or surveillance...`
8. `Do not create violent, hateful, or harassing material outside of fictional contexts.`
9. `Do not use our Services in any manner contrary to ElevenLabs' policies, purpose or mission.`

Every heading is a **second-person negative imperative**, and each is followed by the identical stem "For example, this includes accessing or using our Services to:". Uniform, scannable, and the examples are explicitly non-exhaustive.

**Category 5 is the impersonation rule and it has three limbs** `[observed]` — "this includes creating or using ElevenLabs audio output to intentionally replicate the voice of another person:"

> a) "without consent or legal right, including to take unauthorized action on behalf of such individual;"
> b) "in a way that harasses or causes harm to that person, including via unauthorized sexualization;"
> c) "**in a manner intended to deceive others about whether the voice was generated by artificial intelligence.**"

Limb (c) is the one to note: **concealing the synthetic origin of a voice is prohibited independently of consent and independently of harm.** A user with full permission from the voice owner, causing no harm, still violates the policy by passing the output off as a real recording. That is a disclosure duty placed on the user, and it is stricter than most comparable policies. Midjourney (169) has an analogous user-side rule ("Do not intentionally mislead recipients of generated images about their nature or source"); Runway (168) frames it as impersonation only.

**Category 6 goes further than consent on elections** `[observed]`: "Impersonate political candidates or elected government officials, **regardless of whether authorization was obtained.**" A consent-proof prohibition — the candidate's own permission does not unlock it.

**Category 4 names the guardrail-evasion prohibition** including `Voice CAPTCHA`, and bans "unauthorized robocalling", defined inline: "the use of automated dialing systems or artificial/pre-recorded voice messages to place phone calls to individuals or businesses without direct human intervention."

**Category 3 imposes a two-condition gate on professional advice** `[observed]` — financial, legal, and health/medical advice require "(i) a qualified professional in that field reviewing the Output before it is made available to a consumer or the general public, and (ii) **clear disclosure regarding the use and limitations of AI.**" Restated at the foot of the policy as its own requirement heading, `Human in the loop`.

**Category 9 contains the commercial and AI-governance restrictions** `[observed]`, of which the notable ones are:
- Free users may not use the Services "for any commercial purpose"
- Sound Effects output may not be sold standalone "as isolated files, audio samples, music or sound, libraries, or other collections of sounds"
- Output may not be used "as input for any machine learning or training of artificial intelligence models" or "as part of a dataset" — a model-training prohibition on your own outputs
- **EU AI Act named directly:** prohibited or high-risk uses "under applicable law, including Applicable AI Laws. 'Applicable AI Laws' means applicable legislation or regulations related to artificial intelligence and/or automated decision-making, including the European Union's Artificial Intelligence Act, Regulation (EU) 2024/1689." With the responsibility allocated: "customers/users are nevertheless responsible for: (i) as a deployer, independently conducting an analysis of their classifications under Applicable AI Laws"
- **A downstream-terms flow-down clause:** B2B2B and B2B2C resellers may not offer terms "less restrictive or more permissive than the terms under which our Services and their Output have been made available to you"
- **A Government Entity restriction**, with a definition running to supranational bodies and state-owned enterprises
- **Age gating:** "Making our Services available to anyone under the age of 13, or anyone between the ages of 13-18 without first obtaining parental or guardian consent"
- **An anti-gaming clause aimed at the marketplace:** "manipulating credits/characters/tokens, creating multiple accounts to exploit our free plans or evade enforcement of this Policy, or **attempting in any way to artificially inflate financial rewards from our Voice Library.**"

### The AI-disclosure requirement, as a standalone obligation

`[observed]` After the nine prohibitions, a separate section headed `Other requirements`:

> **1. Disclosure**
> a) "Organizations using our Services, including without limitation ElevenAgents, to power AI agents must **clearly and prominently disclose to their users they are interacting with AI rather than a human.** For clarity, this includes any approved use in patient-facing healthcare products, including mental health services."

"clearly and prominently" is a standard of *presentation*, not just of fact — it is a content-design requirement imposed contractually on customers. The healthcare carve-in is added as a clarification, closing the "but therapeutic contexts are different" argument in advance.

Echoed as a safety principle on both the homepage and the safety page: `Transparency` — "People should know when they're interacting with AI." and `Provenance` — "We believe that you should know if audio is AI-generated."

**Enforcement, with a concession** `[observed]`: "Enforcement of this Policy is at ElevenLabs' sole discretion, and any failure of ElevenLabs to enforce this Policy in every instance does not constitute a waiver... This Policy does not create any right or private right of action on the part of any third party or **any reasonable expectation that our Services will not contain any material that is prohibited by this Policy** or that objectionable material will be promptly removed after it has been posted."

Stating outright that the policy does not guarantee a clean platform is unusually candid, if legally motivated.

### Safety architecture: four stages, with an admission

`[observed]` `Inform` · `Enforce` · `Detect` · `Prevent` — the same four-verb ladder Runway uses, in a different order.

Preceded by a framing paragraph that concedes the failure modes in both directions:

> "We strive to maximize friction for bad actors attempting to misuse our tools, while maintaining a seamless experience for legitimate users. **We recognize that no safety system is perfect: on occasion, safeguards may mistakenly block good actors or fail to catch malicious ones.**"

And the defence-in-depth rationale: "If one layer is bypassed, the additional layers that lay beyond it are in place to capture the misuse."

Five named principles: `Safety by Design`, `Traceability & Accountability`, `Transparency`, `Agility`, `Collaboration`. `Traceability` carries the strongest claim: "Our systems are designed to **trace generated content back to the user who generated it**, allowing us to detect and respond to abuse—while preserving the privacy of users who act in good faith." Repeated in the cloning FAQ: "All audio generated by our models can be instantly traced back to the user responsible for the generation."

Founder quote used as a commitment device: "AI safety is inseparable from innovation at ElevenLabs." — Mati Staniszewski. And: "The volume of AI-generated content will keep growing. We want to provide the needed transparency, helping verify the origins of digital content." — Piotr Dąbkowski.

Enforcement stance in one line: `Accountability` — "**We believe misuse must have consequences.**" and "We refer criminal and other illegal activity to law enforcement."

### Provenance: C2PA, a classifier, and a published blind spot

`[observed]` "We incorporate third-party standards such as **C2PA** and support external efforts to enhance deepfake detection tools. We have publicly released any industry leading AI Audio Classifier to help others determine whether a piece of content was generated using ElevenLabs." (The phrase "any industry leading" is a live typo for "an".)

The classifier is a free, no-login public tool: "We use only the first minute of your sample, and no login is required." Three-step explainer: `Upload your audio` → `Get a match score` ("We return the probability that the audio was generated with ElevenLabs AI voice technology") → `See similar voices`.

**And directly beneath the upload control, in the tool itself:**

> "Does not reliably classify audio generated with the Eleven v3 model. If you come across any content that raises concerns, please report it here."

**A detection tool that states, at the point of use, that it cannot detect output from the company's own flagship expressive model.** This is the most consequential honest disclosure in the batch. It is placed correctly — on the control, not in a FAQ — and it is paired with the fallback action (report it). Compare Midjourney's verifier, which discloses that a negative result is not evidence of absence; ElevenLabs goes further by naming which of its own models defeats the check.

The failure-mode disclosure also has a cost the copy does not acknowledge: a user who runs v3 audio through the classifier and gets a negative result may not read the grey note above the button.

**Reporting routes** are given three separate entry points — a `Report Content` card on the safety page, a link in the Prohibited Use Policy's enforcement section, and a link in the classifier's own disclaimer — all resolving to the same Zendesk ticket form with a dedicated `ticket_form_id`. Multiple doors, one room.

### Voice-marketplace payout language

`[observed]` / `[documented]` — the fullest creator-monetisation disclosure in the corpus.

**What it is:** "**Voice Actor Payouts** let you earn cash rewards when paid users generate audio with your Professional Voice Clone shared in the Voice Library. Earnings are calculated based on usage by paid users and **exclude use by free users.**"

The exclusion is stated in the definition, not in a footnote.

**Access:** "A paid ElevenLabs subscription is not required to receive these rewards." — repeated three times across the payouts documentation. The most likely blocking assumption, removed repeatedly.

**Rate mechanism — the notable one:** "Your default rate is determined by your selected notice period" and "Voice owners receive **increased financial rewards for selecting a longer notice period.**"

The voice actor is paid more for granting buyers a longer withdrawal warning. **The commercial incentive and the buyer-protection mechanism are the same lever.** A supplier who wants higher earnings must accept a longer lock-in; a buyer can filter for exactly that. This is the most elegant piece of marketplace mechanism design in the batch, and the copy explains it in one clause without jargon.

**Notice period, defined for both sides** `[documented]`:

> "The notice period in the Voice Library is designed to give users advance warning if the owner of a voice they've saved, or used previously, decides to stop sharing their voice. This ensures a smooth transition for users who rely on that voice."
>
> "If no notice period is set, their voice will be removed immediately if they decide to stop sharing it, and anyone who has saved the voice will immediately lose access."
>
> "The minimum notice period is 30 days, and the maximum is 2 years."

(An internal inconsistency: the Payouts FAQ says the range runs "from immediate removal up to a two-year period", while the Voice Library doc says "The minimum notice period is 30 days". Both describe a no-notice-period option, so the "minimum is 30 days" statement is at best ambiguous. `[observed defect]`)

Consequence for the owner, disclosed: "If you did agree a notice period, you will need to wait for this to expire before you can remove your voice." And a trap: "**if you share your voice with the Voice Library again in the future this will reset your notice period.**"

**Live Moderation — an opt-in the supplier controls** `[documented]`: "You can enable **live moderation** for your voice to prevent it from being used in restricted or sensitive content categories." With the cost disclosed on both sides: "using a voice model with Live Moderation enabled may result in extra latency" and, in the filter documentation, "This may introduce extra latency when using the voice."

A voice actor can restrict what their voice may say; a buyer can see that the restriction exists and filter it out; and both are told it costs milliseconds. Three-party disclosure of one setting.

**Payout mechanics** `[documented]`:
- Processor: `Stripe Connect`
- Cadence: "payouts typically happen once a week as long as your accrued payouts exceed the minimum threshold" — and, in the Payouts FAQ, "**Payouts are processed automatically every 6–8 days**". Two different cadences in one document. `[observed defect]`
- Threshold: "In most cases this is **$10**, but some countries may have a higher threshold."
- Accrual: "Rewards accumulate frequently throughout the day"
- 60 supported countries enumerated in full, with the limitation stated first: "Currently, Stripe Connect is not supported in all countries. We are constantly working to expand our reach"
- Tracking: `My Voices` → `View` → sharing icon → `View Metrics`; all-time earnings on the Payouts page
- A separate reward stream for the reader app, with its own reporting: "Rewards for ElevenReader are reported separately – to view your Reader App rewards, check the 'ElevenReader' box on your 'View Metrics' screen."

**Tax disclosure is the most thorough in the corpus** `[documented]` — the `What is W-8/W-9 certification?` FAQ is structured as five sub-questions in the voice actor's own words:

- "**Why do I have to complete this form?**" — US tax law requires it; W-9 for US tax residents, W-8 otherwise
- "**Why are you withholding tax on payments to me?**" — "By default, the U.S. requires a 30% withholding tax on certain types of payments to non-U.S. persons — including royalties." With the scope limited: "We will withhold U.S. taxes on earnings from **U.S. customer usage only** (not your entire payout)."
- "**What will I receive from you?**" — "Each year, we will issue a **Form 1042-S**... This form is sent by **March 15 of the following calendar year**"
- "**I already pay taxes in my own country why should I also pay U.S. tax?**" — explains US-sourced income and points to foreign tax credits "depending on your local laws"
- "**Can I skip the form if I don't live in the U.S?**" — "No" + the consequence: "we may have to apply maximum withholding (30%)"

Plus a transparency feature: "Your payout dashboard will now include a column showing tax withheld for each past payout."

Writing the objection ("I already pay taxes in my own country why should I also pay U.S. tax?") as the FAQ question verbatim, grammar and all, is the Wise confession-title pattern applied to tax. It is also worth noting that this is a **creator-economy tax burden disclosed in plain language before the creator earns anything**, which is more than most platforms manage.

A final practical disclosure most platforms omit: "Where do my payouts come from, and will they show as domestic or international on my bank statement?" — with a rule for predicting it: "compare the connected account's country and currency with your external bank account's country and currency—when they match, expect domestic; when they don't, expect international."

**Publishing consent step** `[observed]` — step 6 of the publish flow: "Review and accept the **Voice Library Addendum** to our Terms of Service and provide the required consents and confirmations. **Do this carefully and make sure you understand the service before sharing.** If you have questions, contact legal@elevenlabs.io."

A publishing flow that tells the user to slow down, and gives them the legal team's email address. Rare.

### Metered-billing disclosure

`[observed]` The billable unit is **credits**, stated per plan: `10k credits per month` (Free), `30k` (Starter), `121k` (Creator), `600k` (Pro), `1.8M` (Scale), `6M` (Business), "Custom number of credits and seats" (Enterprise).

**The credit is never defined on the pricing page.** The definition sits behind an accordion — `How do text characters and credits work?` — which is client-rendered and was not retrievable. Compare Runway (168), which defines its credit in an open FAQ answer with a worked rate.

What *is* open on the pricing page is arguably better: a comparison matrix converting credits into minutes and dollars:

| Plan | `Minutes included` | `Extra minute` |
|---|---|---|
| Free | ~10 | ~$0.36 |
| Starter | ~30 | ~$0.20 |
| Creator | ~121 | ~$0.18 |
| Pro | ~600 | ~$0.17 |
| Scale | ~1,800 | ~$0.17 |
| Business | ~6,000 | ~$0.17 |

**Publishing the marginal cost per extra minute, per tier, is unusual and useful** — it lets a buyer compute the break-even for upgrading. The tilde prefix on every figure is honest about approximation. The Business tier adds "Low-latency TTS as low as 5c/minute" as a card bullet, which is a different unit again and is not reconciled with the `~$0.17` in the table.

Also on the matrix: `Custom voice slots` (`3 / 10 / 30 / 160 / 660 / 2,200`), `Professional Voice Cloning` slots (`— / — / 1 / 1 / 3 / 10`), `Concurrent requests` (`2 / 3 / 5 / 10 / 15 / 25`), `Audio quality` (`128 kbps, 44.1kHz` rising to `128 & 192 kbps`), `Languages` (`74` on every tier).

Tax stated: "**Prices exclude all taxes, levies and duties.**" — the only such statement in this batch.

**Credit multipliers — a per-voice price variance disclosed as a tag** `[documented]`: "Some voices in the Voice Library have a **credit multiplier** in place. This is because the voice's owner set a **custom rate**... When you use a voice with a custom rate to generate audio, this will have a credit multiplier in effect, meaning that it will cost more credits to generate with this voice." Disclosed in two places in the UI — "this will be displayed as a tag in the Voice Library" and "In Speech Synthesis, you will see a notification that the voice has a credit multiplier in place" — and deprecated: "Custom rates are a legacy feature that is no longer available for newly shared voices."

A per-item price multiplier in a marketplace, surfaced both at browse time and at point of use, with the legacy status disclosed. Correct on all three counts.

**What is not disclosed publicly:** credit rollover and expiry (behind the accordion `When do my credits reset, and do unused credits roll over?`), per-product credit consumption (`How many credits does each product use?`), single-request limits, and whether failed generations are charged (`Am I charged for every generation?`). **All four of the highest-value metered-billing questions are asked by the page's own FAQ and answered behind client-side rendering.** `[absent]` for the answers.

**Slot mechanics** `[documented]` — an unusual earn-more-capacity rule: "You can earn additional PVC slots when a Professional Voice Clone you have shared with the Voice Library is marked as **Studio Quality**." With the qualification process stated: "Studio Quality review only applies to voices you have shared with the Voice Library. After your voice is accepted into the Voice Library, Studio Quality review happens automatically. It is not immediate." And the downgrade consequence: "If you downgrade below the Creator tier, your PVC will remain on your account, but you won't be able to use it until you upgrade to Creator or above." A paid asset that persists but is disabled, rather than deleted, on downgrade — disclosed before purchase.

**Data residency and compliance claims** `[observed]`: "Data is encrypted in transit and at rest, with support for SOC 2, HIPAA, and GDPR compliance. **EU Data Residency and Zero Retention modes** are available for stricter data control." Enterprise tier bullets name "Custom terms & assurance around DPA/SLAs" and "BAAs for HIPAA customers".

**Export restriction** `[documented]`: "You cannot download or export your voice clones as standalone files. Voice clones stay in your ElevenLabs account." With mitigation: "If you want to recreate a clone later, keep the original audio samples you used to create it. **Each clone will sound slightly different, even when you use the same audio.**" A lock-in disclosed, with the non-determinism of the workaround disclosed too.

## T11 Help-centre architecture

**Three documentation properties**, which is one too many:

1. `elevenlabs.io/docs` — Fern-built product documentation, the primary surface
2. `help.elevenlabs.io/hc/en-us` — Zendesk, used for ticket forms and abuse reporting, linked from the footer as `Help Center`
3. `elevenlabs.io/docs/help-center/help-center-directory` — a help-centre directory *inside* the docs, which mirrors Zendesk content

The mirroring is visible in the docs' own cross-links: the voice-cloning FAQ links to `elevenlabs.io/docs/help-center/product/voices/voice-cloning/...` while the safety page links to `help.elevenlabs.io/hc/en-us/requests/new`. **The same help content exists under two hosts with two URL schemes**, and several links in the docs point to a third, older scheme (`/docs/product-guides/voices/voice-cloning`). At least three generations of help URLs are live and cross-linked.

**The docs structure itself is excellent** `[observed]`. Every page carries:
- A left tab bar by platform, a left tree by section
- An `On this page` right-rail anchor list
- A one-line italic deck under the H1
- A `Copy page` control (markdown for LLMs)
- A `Was this page helpful? Yes / No` footer
- Prev/next cards naming the neighbouring page **and its deck** — e.g. "Instant Voice Cloning — Learn how to clone your voice instantly using our best-in-class models."

**The FAQ-at-the-foot-of-the-doc pattern is the defining structural choice** `[observed]`. Each major docs page ends with a `## FAQ` section containing 8–17 expandable questions, each of which is a full help article. The `Voice Cloning` page carries 14; `Professional Voice Cloning` carries 15; `Voice Library` carries 11; `Payouts` carries 5.

This means the conceptual guide and its entire support long-tail live at one URL. The user does not have to know whether their question is "documentation" or "support". The cost is enormous page length — the Voice Library page runs to tens of thousands of words — and substantial duplication: the same FAQ (`What is the difference between Instant Voice Cloning and Professional Voice Cloning?`, `What files do you accept for voice cloning?`, `Can I create a Professional Voice Clone of someone else's voice?`) appears in full on multiple pages. **Duplication is the deliberate trade for single-URL completeness**, and it is defensible, but it is also where the timing inconsistencies (3-6 vs 6-24 hours) crept in: the same fact is maintained in several places.

**Article-title grammar — four shapes:**

| Shape | Example |
|---|---|
| Noun-phrase concept | `Voice Cloning`, `Voice Library`, `Payouts`, `Voice Design` |
| `What is/does …?` | `What is a notice period?`, `What is Live Moderation?`, `What is W-8/W-9 certification?`, `What does the status of my Professional Voice Clone mean?` |
| `Can I …?` | `Can I export my voice clones?`, `Can I create a Professional Voice Clone of someone else's voice?`, `Can Children's or Child-Like Voices Be Added to the Voice Library?` |
| Verbatim error string | `What does the error 'No model found for this voice. Please select another voice' mean?` |

The `Can I …?` family carries almost all of the consent and rights questions. Users ask permission questions in that form, and the titles match. The one title in Title Case (`Can Children's or Child-Like Voices Be Added to the Voice Library?`) breaks the sentence-case convention of every other title — a small inconsistency on an important article.

## T12 FAQs

FAQ blocks appear on nearly every marketing page. **Marketing-page accordions are client-rendered and their answers were not retrievable; docs-page FAQs are server-rendered and were captured in full.** Questions verbatim below; answers summarised where retrieved.

**Pricing — 11 questions** `[observed, questions only]`

| # | Question (verbatim) |
|---|---|
| 1 | How much does each plan cost and what is included? |
| 2 | How do text characters and credits work? |
| 3 | How many credits does each product use? |
| 4 | When do my credits reset, and do unused credits roll over? |
| 5 | Do you offer annual billing, and what does it cost? |
| 6 | Is there a limit on how many credits I can use in a single request? |
| 7 | Am I charged for every generation? |
| 8 | What happens if I upgrade, downgrade, or cancel my subscription? |
| 9 | When can I cancel my subscription? |
| 10 | How do I check how many credits I have remaining? |
| 11 | What kind of payment do you accept? |

Q2–Q4 and Q6–Q7 are the metered-billing core, and **all five are unanswerable from the public page.** Q7 (`Am I charged for every generation?`) is the question a generative-product user most needs answered before subscribing — whether a bad output costs money. Runway (168) answers the equivalent question in an open help article.

Ordering is coherent: cost → unit → consumption → expiry → billing period → limits → failure charging → plan changes → cancellation → balance → payment method.

**Voice Cloning (marketing) — 10 questions** `[observed, questions only]`

| # | Question (verbatim) |
|---|---|
| 1 | What is AI voice cloning and how does it work? |
| 2 | Are there any quality free AI voice cloning tools available? |
| 3 | How do I use an AI voice cloning tool? |
| 4 | What is the difference between instant and professional voice cloning? |
| 5 | How secure is AI voice cloning technology? |
| 6 | Is AI voice cloning legal for creating audio content? |
| 7 | Can AI voice cloning be used to mimic any voice? |
| 8 | How much audio do I need for high-quality voice cloning? |
| 9 | Which languages does AI voice cloning support? |
| 10 | Can AI voice cloning be used for creating realistic voiceovers? |

Note the SEO framing — every question says "AI voice cloning" rather than "ElevenLabs", so the block is written for search rather than for the visitor. Q6 (`Is AI voice cloning legal...?`) and Q7 (`Can AI voice cloning be used to mimic any voice?`) are the two consent-adjacent questions, and **both answers are behind the accordion**. The most legally consequential answers on the page are the ones not in the HTML.

**Safety — 4 questions** `[observed, questions only]`

| # | Question (verbatim) |
|---|---|
| 1 | How can users contact us about their concerns? |
| 2 | How do we cooperate with governmental authorities? |
| 3 | What is the appeals system for EU users? |
| 4 | How can EU users settle disputes out-of court? |

**Q1 and Q2 are written in the first person plural from the company's side** ("How can users contact **us**", "How do **we** cooperate") while Q3 and Q4 are written about the user in the third person. Neither is second person. A FAQ whose questions are phrased from the company's point of view reads as a compliance disclosure list rather than as help, which is arguably what it is — two of the four map to EU DSA obligations.

**AI Speech Classifier — 6 questions** `[observed, questions only]`

| # | Question (verbatim) |
|---|---|
| 1 | What is the AI Speech Classifier? |
| 2 | How accurate is the AI Speech Classifier? |
| 3 | Which files and lengths are supported? |
| 4 | Does it detect audio from other AI voice tools? |
| 5 | What happens to the audio I upload? |
| 6 | What should I do if I find concerning AI-generated content? |

Q2 and Q4 are the two questions that bound the tool's usefulness — accuracy, and whether it works on competitors' output (it does not, by design). Q5 is the privacy question, partly pre-answered above the fold ("We use only the first minute of your sample, and no login is required").

**Docs FAQs** — retrieved in full and quoted throughout T4–T10 above. The `Voice Cloning` set alone runs to 14 questions covering IVC/PVC difference, accepted files, accent failure, upload restrictions, export, quality tips, non-English cloning, third-party cloning, unverified-clone deletion, model upgrades, slot counts, sample counts, failure/delay, verification failure, error strings, status meanings and readiness timing.

## T13 Terminology & glossary

**PRIORITY SECTION.**

| Term | ElevenLabs' usage | The alternative it rejected |
|---|---|---|
| `credits` | The billable unit across all products | "characters", "tokens", "minutes" |
| `characters` | Legacy/parallel unit, surviving in the FAQ `How do text characters and credits work?` and the Startup Grant offer (`33M Characters`) | — see below |
| `Minutes included` / `Extra minute` | Credits converted into audio minutes, per tier, with a marginal price | |
| `credit multiplier` / `custom rate` | Per-voice price variance set by the voice owner; legacy | "premium voice pricing" |
| `Custom voice slots` | Capacity for user-created voices | "voice limit" |
| `Professional Voice Clone slots` / `PVC slots` | Capacity for trained clones, earnable via Studio Quality | |
| `Concurrent requests` | Parallelism, sold per tier | "rate limit" |
| `Instant Voice Cloning` / `IVC` | Fast, few-minute clone; "does not train or create a custom AI model" | "quick clone" |
| `Professional Voice Cloning` / `PVC` | Trained, verified, dedicated model | "premium clone", "studio clone" |
| `Voice Design` | Voice generated from a text prompt — **not shareable, not a clone** | "synthetic voice" |
| `Voice Remixing` | Named in a help answer as a distinct creation route | |
| `Voice CAPTCHA` | The verification challenge | "voice verification", "liveness check" |
| `notice period` | Contractual warning before a marketplace voice is withdrawn; 30 days to 2 years; **drives payout rate** | "deprecation window", "sunset period" |
| `Live Moderation` | Owner-enabled content filtering on their own voice | "content restrictions" |
| `Studio Quality` | A reviewed quality tier that earns an extra PVC slot | "verified", "premium" |
| `Voice Library` | The marketplace | "marketplace", "voice store" |
| `My Voices` | The user's collection | "my library" |
| `Handpicked Collections` | Curated marketplace groupings | "featured", "staff picks" |
| `Voice Actor Payouts` / `Payouts` | Creator monetisation — note **"Voice Actor"**, a profession, not "creator" | "royalties", "creator fund" |
| `Iconic Marketplace` / `Iconic voices` | Licensed celebrity and historical voices | "celebrity voices" |
| `audio tags` | Bracketed emotional direction: `[sarcastically]`, `[giggles]`, `[whispers]` | "SSML", "tone tags" (Descript's word) |
| `ElevenCreative` / `ElevenAgents` / `ElevenAPI` | The three sub-brands, prefix-compounded | "Creative Suite", "Agents Platform" |
| `Eleven v3` / `Eleven Flash` / `Eleven Multilingual` / `Eleven Turbo` / `Eleven Music` | Models, all prefixed `Eleven` | |
| `Scribe` / `Scribe v2` / `Scribe v2 Realtime` | The ASR family — the one model line **not** prefixed `Eleven` in short form | |
| `Studio` | The multi-track editor | "editor", "workspace" |
| `Flows` | Newer composition product | |
| `Productions` | Human-assisted service tier ("Fully managed dubbing with Productions") | "managed services" |
| `Dubbing Studio` vs `Automatic Dubbing` | Two named dubbing depths | |
| `AI Speech Classifier` / `Audio Detector` | **Two names for detection** — marketing uses the former, docs the latter | |
| `Speech Engine` | API-side capability name | |
| `ElevenReader` | The consumer reader app; a separate reward stream | |
| `Zero Retention` / `EU Data Residency` | Enterprise data modes | |
| `Government Entity` | A defined term in the use policy, restricting sales | |
| `Applicable AI Laws` | Defined term citing the EU AI Act | |

**Five naming observations.**

1. **`Voice Actor Payouts` chooses a profession over a platform word.** Not "creator earnings", not "royalties" — the people being paid are named as voice actors, which is what they are, and which signals that the marketplace is displacing (and compensating) a real trade. The most value-laden naming decision in the file.

2. **`notice period` is borrowed from employment law** and applied to model supply. It arrives with the correct connotations already attached: a contractual courtesy, a wind-down, a period during which the relationship still functions. Far better than "deprecation window", and it makes the payout-rate coupling (longer notice = higher rate) intuitively fair.

3. **`credits` and `characters` coexist.** The pricing FAQ question is `How do text characters and credits work?`; the Startup Grant is denominated in `33M Characters`; the plan cards are in credits; the anti-gaming clause in the use policy names "credits/characters/tokens". The product has migrated from characters to credits and the older unit persists in at least three places. `[observed defect]`

4. **The detection tool has two names.** `AI Speech Classifier` (marketing page, safety page) vs `Audio Detector` (docs left-nav, under Audio tools). Two names for the product whose entire purpose is authoritative identification.

5. **`Eleven`-prefix compounding is applied to sub-brands and models but not consistently to the ASR line.** `ElevenCreative`, `ElevenAgents`, `ElevenAPI`, `Eleven v3`, `Eleven Flash`, `Eleven Music` — then `Scribe`, `Scribe v2`, though the API block does say `Eleven Scribe` once. The exception is undocumented.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user in product and docs ("Clone your voice", "you'll complete a Voice Captcha"). First person plural for the company, used heavily and deliberately in safety, policy and payouts ("We prohibit", "We refer criminal and other illegal activity to law enforcement", "We build safety into everything we do", "We will withhold U.S. taxes"). The company is a named, accountable actor exactly where accountability matters — the same distribution as Runway (168), and the correct one.

**Register: flat, declarative, professional.** Almost no contractions in policy text; some in marketing. No jokes found anywhere. Exclamation marks appear only inside the recording-guide's lapse ("Consistency is key to a proper clone!"). The register is closest to enterprise SaaS, which is consistent with a customer list that runs to telcos, banks and governments.

**Tone does flatten as stakes rise**, and the gradient is well-managed: the homepage says "Bringing technology to life", the safety page says "We believe misuse must have consequences", and the Prohibited Use Policy says "Do not threaten child safety." Three registers, correctly ordered.

**Numbers as trust devices** `[observed]`: `70+ languages`, `29+ languages`, `32+ languages`, `74` (languages, pricing matrix), `75ms latency`, `98% accuracy`, `1M+ creators`, `5,000+ / 10,000+ / 11,000+ voices`, `60 countries`, `$10 threshold`, `30% withholding`, `-23dB to -18dB RMS`. The technical figures are precise and useful. The language and voice counts are a mess — **at least four language counts (29+, 32+, 70+, 74) and three voice counts appear across the pages harvested**, sometimes on the same page.

**Accessibility content** `[observed]`

- `Skip to content` is present and **first in the DOM** on every marketing page. The only product in this batch with an authored skip link on its marketing site.
- Alt text on the marketing site is genuinely descriptive and scene-level, not filename-derived:
  - "ElevenCreative app interface showing options for voiceover, flow creation, and voice cloning."
  - "ElevenAgents app interface showing call statistics and two high severity alerts on error and resolution rates."
  - "A woman with long, wavy brown hair and fair skin, wearing a pink blazer and a neutral expression."
  - "AI Speech Classifier showing a 98 percent match score"
  - "Similar AI voices matched from the voice library"
  - "Audio tags adding emotion to AI generated speech"
  - "Voice Cloning UI cover displaying IVC & PVC UI"
  - "Title slide displaying 'Studio 4.0' over a blue, gray, and gold textured background."

  **This is the best alt text in the batch by a distance.** The portrait description is notable: it describes appearance without asserting identity, which is the right call for a photo illustrating a voice sample. Decorative gradients carry empty or near-empty alt.
- Docs alt text is weaker and more functional ("Instant voice cloning", "Payouts overview", "Create a new Professional Voice Clone") — the same marketing-better-than-docs split as Descript, but inverted.
- Accessibility is named as a **legitimate use case** in the consent copy: "Built-in safeguards help prevent misuse while supporting legitimate use cases like voiceovers, audiobooks, **and accessibility**." And in the safety mission: "to bring voices back for people who have lost the ability to speak due to accident or illness". Framing voice cloning's restorative use as a first-class justification, in the safety statement rather than in marketing, is the strongest possible argument for the product and it is placed where it does the most good.
- **No accessibility statement page exists.** No `/accessibility` link in the footer, nothing under `Company`. `[absent]` — the same gap as all three other products in this batch, and the most conspicuous here given the product's disability-restoration positioning.
- Docs pages carry `Was this page helpful? Yes / No`, `Copy page`, a `Light` theme toggle, and keyboard-shortcut hints (`/` for search).
- Audio demos on the marketing pages have their script text rendered as page text beside the player, so the audio content is available to non-hearing users — good practice, likely incidental.

**Negative findings, recorded honestly**

- Voice counts: `5,000+` (meta description), `10,000+` (voice-cloning page, classifier headings), `11,000+` (classifier CTA). Two of these are on one page.
- Language counts: `29+`, `32+`, `70+`, `74` across four surfaces.
- PVC fine-tuning duration: `3-6 hours`, `6-24 hours`, `up to 24 hours` — three upper bounds in one docs set.
- Payout cadence: "once a week" and "every 6–8 days" in the same document.
- Notice period minimum: "immediate removal up to a two-year period" vs "The minimum notice period is 30 days".
- `Contact sales` / `Talk to sales` / `Contact us` — three labels, one destination.
- `Help Center` (footer) vs `Help Centre` (status page).
- `AI Speech Classifier` (marketing) vs `Audio Detector` (docs).
- `Explore the docs` / `Explore docs`; `Learn More` / `Learn more` on adjacent safety cards.
- "We have publicly released **any** industry leading AI Audio Classifier" — typo for "an", on the safety page.
- The recording-guide `Performance` section drops into uncapitalised sentences mid-document.
- Three live help URL schemes (`help.elevenlabs.io/hc/...`, `/docs/help-center/...`, `/docs/product-guides/...`), cross-linked.
- The marketing three-step cloning explainer **omits the verification step entirely**.
- Instant Voice Cloning has no documented verification, while the marketing consent claim ("only possible with explicit permission from the voice owner") is stated unconditionally.
- Five of the eleven pricing FAQ answers — including `Am I charged for every generation?` and the credit rollover rule — are unreachable without JavaScript.

---

## Transferable patterns

1. **Refuse third-party consent rather than collecting it.** "Even with their consent, you cannot clone someone else's voice." The alternative offered — the voice owner creates and verifies on their own account, then shares a revocable link — relocates consent to the only party who can genuinely give it, and makes it withdrawable. Condition: only viable where the subject can plausibly hold an account. For deceased, incapacitated or institutional subjects this model has no answer, and ElevenLabs simply does not serve those cases.
2. **Name the verification mechanism.** `Voice CAPTCHA` appears in a help article, a legal policy and a monetisation doc. A named gate can be referenced, prohibited from being evaded, and taught. An unnamed one cannot.
3. **Close the mimicry loophole in the second sentence.** "This policy applies to voices of minors **as well as adult voices designed to mimic or sound like children.**" Any prohibition scoped to a literal category should state its functional-equivalent extension immediately.
4. **Make disclosure of AI origin a standalone violation.** Impersonation limb (c): deceiving others about whether a voice was AI-generated is prohibited *independently* of consent and harm. Consent does not license concealment.
5. **Expose governance terms as marketplace filters.** `Notice period` and `Live Moderation enabled` as shopping facets. Buyers can price supply risk; suppliers can advertise reliability. Transfers to any marketplace where supply can be withdrawn or restricted.
6. **Couple the supplier's incentive to the buyer's protection.** "Voice owners receive increased financial rewards for selecting a longer notice period." One lever, both sides, no enforcement required. The best mechanism-design content in the corpus batch.
7. **Ship the withdrawal notification with the remedy attached.** Advance notice that "specify when the voice will become unavailable and recommend similar voices". Plus a webhook so downstream businesses can cascade the warning. A deprecation notice without a replacement candidate is half a notice.
8. **Publish the marginal cost, not just the allowance.** `Extra minute: ~$0.36 / ~$0.20 / ~$0.18 / ~$0.17` per tier. Lets a buyer compute their own break-even. The tilde is honest.
9. **Disclose your detection tool's blind spot on the tool.** "Does not reliably classify audio generated with the Eleven v3 model." On the control, above the button, with the fallback action attached. Any verification, fraud-check or authenticity feature should state where it fails at the point of use.
10. **Write the retry message so the user does nothing.** "We are sorry the training run experienced issues and has been retried. No further action is required." Apology, cause, automatic recovery, explicit instruction to stop worrying.
11. **Title a help article with the verbatim error string.** `What does the error 'No model found for this voice. Please select another voice' mean?` Pasted-error search resolves in one hop.
12. **Ship a naming and description style guide as product UI.** 40-character limit, hyphen pattern, six worked examples, a six-item prohibition list, and a model description with labelled sub-sections. Content design shipped as a feature, for a UGC marketplace.
13. **Disclose the creator's tax burden before they earn anything**, in their own words, including the objection ("I already pay taxes in my own country why should I also pay U.S. tax?"). Plus a withheld-tax column in the dashboard.
14. **Counter-example — do not hide your billable-unit answers behind client-side accordions.** Five of eleven pricing questions, including "Am I charged for every generation?", are invisible to anyone without JavaScript, to search engines, and to the LLM agents ElevenLabs otherwise courts with `llms.txt`. The questions are visible; the answers are not. That is worse than omitting the block.

## Caveats & gaps

- **All marketing-page FAQ answers are unretrieved.** Pricing (11), Voice Cloning (10), Safety (4) and AI Speech Classifier (6) render questions in server HTML and answers client-side. Questions are captured verbatim; **no answer from those four blocks is reported in this file.** This is the same limitation the Wise exemplar records, and it is load-bearing here because the metered-billing answers are among them.
- **`elevenlabs.io/docs/help-center/help-center-directory` exceeded the fetch size limit** and was not read. The help-centre category tree is therefore partially inferred from the docs left-nav and from cross-links; T11's account of the three-property split is based on observed URLs, not on the directory itself.
- **`help.elevenlabs.io` was not fetched.** Its IA, ticket forms, article set and the abuse-report form's own copy are unharvested.
- **All in-product strings are `[documented]`.** The voice-creation modal, the Voice CAPTCHA challenge itself, consent checkboxes, the Voice Library Addendum acceptance UI, credit-balance displays and moderation refusals were not observed. The PVC status strings quoted in T6 are quoted from documentation describing them.
- **The Voice Library Addendum (`elevenlabs.io/vla`) was not fetched.** It is the actual consent instrument for marketplace publishing and is referenced five times in the docs. Everything this file says about publishing consent comes from the docs' description of the flow, not from the addendum.
- **Terms of Service, Privacy Policy and the Trust Center were not fetched.**
- **Instant Voice Cloning docs page was not opened** (only the overview's account of it). Any IVC-specific consent step, if one exists, would be there and is unrecorded. The finding that IVC has no documented verification is therefore based on absence across four pages, not on a positive statement.
- **`/iconic-marketplace` was not fetched**, despite being the licensed-celebrity-voice product and therefore the most likeness-sensitive surface on the site.
- **Not harvested:** `/enterprise`, `/agents`, `/creative`, `/music`, `/studio`, `/voice-design`, `/text-to-speech`, `/dubbing`, `/government`, `/impact`, `/startup-grants`, `/india`, the blog, the changelog, the API reference, and the ElevenAgents docs tree.
- **Locale.** `en` only. A language switcher and an `/india` page exist and were not checked. All prices USD, tax-exclusive as stated.
- **Volatility.** Model names, credit allowances, tier prices and the supported-country list will date quickly; the Prohibited Use Policy is stamped `17 August 2026` and the docs are undated. Treat all figures as of 2026-09-21.

## Sources

1. https://elevenlabs.io/
2. https://elevenlabs.io/pricing
3. https://elevenlabs.io/safety
4. https://elevenlabs.io/voice-cloning
5. https://elevenlabs.io/use-policy
6. https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning
7. https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/professional-voice-cloning
8. https://elevenlabs.io/docs/eleven-creative/voices/voice-library
9. https://elevenlabs.io/docs/eleven-creative/voices/payouts
10. https://elevenlabs.io/ai-speech-classifier
11. https://status.elevenlabs.io/
