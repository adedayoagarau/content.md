# 173. VEED

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Browser-based video editor / AI-first video generation and editing for marketers and solo creators |
| Primary URL | https://www.veed.io/ |
| Corpus rank | 173 |
| Benchmark strength (source list) | Approachable video workflows |
| Locale / market observed | en — mixed en-GB and en-US on the same site (see T14). Entity is UK: "Veed Limited … incorporated in England and Wales (with company number 11264311)" |
| Platform observed | Web (marketing), Intercom-hosted help centre at support.veed.io, Statuspage at status.veed.io, legal pages on a separate Webflow front end |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | UK GDPR — the terms page opens with a B2B Personal Data Processing Agreement citing "Article 28(3) of the retained EU law version of the General Data Protection Regulation (EU) 2016/679) (UK GDPR)" followed by full Standard Contractual Clauses. VAT GB354412222. No AI-specific regulatory disclosure found |
| Harvest date | 2026-09-22 |
| Pages inspected | 19 |
| Harvest completeness | Partial — **the pricing page renders no plan names and no prices in served HTML**, and all nine of its FAQ answers are empty; the screen-recorder page's seven FAQ answers are likewise empty; the terms page truncates before clause 7, which is where cancellation and refund live. Every plan, price, export limit and watermark rule in this file comes from help articles or marketing FAQ copy, not from a pricing table |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.veed.io/ | Hero, three brand cards, example tabs |
| Pricing | https://www.veed.io/pricing | **Client-rendered — no plans, no prices, 9 empty FAQs** |
| Tools index | https://www.veed.io/tools | The full operation inventory |
| Video editor | https://www.veed.io/tools/video-editor | 3-step how-to, 8 FAQs |
| Auto subtitle generator | https://www.veed.io/tools/auto-subtitle-generator-online | 3-step how-to, 10 FAQs |
| AI video generator | https://www.veed.io/tools/ai-video | 3-step how-to, 6 FAQs, model names |
| Text to speech | https://www.veed.io/tools/text-to-speech-video | 3-step how-to, 6 FAQs |
| Screen recorder | https://www.veed.io/tools/screen-recorder | **Older template** — diverges on every pattern |
| Help centre index | https://support.veed.io/en (via 301 from help.veed.io) | 17 collections |
| Help collections ×6 | support.veed.io collection pages | Article-title inventory |
| Help: Export | https://support.veed.io/en/articles/10531327 | **The export-limit source** |
| Help: Download | https://support.veed.io/en/articles/10531489 | Embedded `Q:` FAQ |
| Help: Watermark | https://support.veed.io/en/articles/7056370 | **The watermark-rule source** |
| Terms of Use | https://www.veed.io/terms-of-use | **Partial** — truncated before clause 7 |
| Privacy Policy | https://www.veed.io/privacy | Ten numbered sections |
| Status page | https://status.veed.io | Component taxonomy |

**URL corrections found during harvest:** `/tools/auto-subtitle-generator`, `/tools/ai-video-generator`, `/tools/text-to-speech` and `/terms` do not exist. The live equivalents are `/tools/auto-subtitle-generator-online`, `/tools/ai-video`, `/tools/text-to-speech-video` and `/terms-of-use`. `help.veed.io` 301s to `support.veed.io`.

---

## T1 Navigation & IA labels `[observed]`

**A five-item global nav, and the first item is not a link.**

`Create with AI` (dropdown only, no destination) · `Ads & templates` · `Tools` · `Enterprise` · `Pricing`, with `Login` and `Sign Up` on the right.

The decision worth recording: VEED's top-left nav slot — the most valuable position — is occupied by a **capability** (`Create with AI`) rather than a destination, and it cannot be clicked. Everything generative is behind a hover. Meanwhile `Tools`, which holds the deterministic editing operations, *is* a page. The nav therefore encodes a hierarchy: generation is a menu of choices, editing is a catalogue you browse.

**Dropdown groupings:**
- `Create with AI` → `AI Video` · `AI Avatars & Lip Sync` · `AI Voice & Audio` · `AI Image`
- `Ads & templates` → `Make Ads` · `Templates` · `By Platform` · `Scale & Workflow`
- `Tools` → `Edit Video` · `Convert` · `Subtitles & Translation` · `Transcribe & Record`

The `Tools` groupings are the clearest IA in the product: four verbs covering change, format-change, language, and capture. `Ads & templates` is the weakest — `Scale & Workflow` is an abstraction sitting beside three concrete groupings.

**Footer groupings:** `Generation` · `Video Editing` · `API` · `Product` · `Resources` · `Company` · `Connect`. Note that the footer splits `Generation` from `Video Editing`, which the nav does not — the nav says `Create with AI` and `Tools`. Two different names for the same split, on the same page.

**Breadcrumb on tool pages:** `Home` › `VEED Tools` › `<Tool Name>` — `VEED Tools` is a breadcrumb-only label that appears nowhere else.

**Help-centre collections, complete list in sidebar order** `[observed]`:

1. Getting Started with VEED (9)
2. Creating your first project
3. How to edit your video (23)
4. Our tools (5)
5. Subtitles and Translation (5)
6. AI tools (23)
7. How to generate with AI (8)
8. How to repurpose with AI (2)
9. How to use our AI Avatars (2)
10. VEED for Teams (6)
11. APIs (3)
12. iOS App Helpcenter (24)
13. Captions
14. Payments and subscriptions in the iOS app
15. Account and Subscription (11)
16. Legal, Security and T&Cs (6)
17. FAQ & Issues (8)

Sub-collections exist: under *How to edit your video* → `The basics of editing` (13), `Our tools` (5), `Subtitles and Translation` (5). Under *AI tools* → `How to edit with AI` (11), `How to generate with AI` (8), `How to repurpose with AI` (2), `How to use our AI Avatars` (2).

**IA defect** `[observed]`: the sidebar is flat, so five sub-collections (`Our tools`, `Subtitles and Translation`, `How to generate with AI`, `How to repurpose with AI`, `How to use our AI Avatars`) appear **both** as top-level entries and as children of their parents. The same node occupies two positions in one tree. Also note `Captions` is a top-level collection while `Subtitles and Translation` is a separate one — the product publishes an article defining the difference between captions and subtitles and then splits its own help centre along that line without cross-referencing.

**IA defect 2** `[observed]`: `/privacy` and `/terms-of-use` run on a different (Webflow) front end with an entirely different, stale global nav — `Product` (Create / Edit / Publish), `Training`, `Contact Sales` — that matches no other page on the site. A user clicking a footer legal link lands in a different information architecture.

## T2 Value proposition & headline patterns `[observed]`

**Hero**

> Eyebrow: `1500+5 star reviews` — **rendered with no separator; a defect**
> H1: `AI video creation, made for social`
> Subhead: `Imagine it. Generate it. Brand it. AI videos worth posting, in minutes.`

The three-verb triad (`Imagine it. Generate it. Brand it.`) is the same construction Adobe Express uses (`Dream it. Make it. Easy.`), and VEED's is the stronger version because all three beats are verbs and the third one — `Brand it` — is the differentiator rather than a throwaway. Then the payoff clause does two jobs: `worth posting` sets the quality bar in the reader's terms, `in minutes` sets the cost.

**`worth posting` is VEED's core phrase and it recurs** `[observed]`: "AI videos worth posting, in minutes." · "Turn any idea into a video worth posting" · footer tagline "Finally, AI video worth posting." That last one — `Finally,` — is doing competitive positioning by implication: it says the category has been failing.

**Section headers, homepage:** `Powering millions of teams globally` · `Generate videos that look like your brand, not AI` · `Generate feed-ready videos that get your business seen` · `G2 Best AI software company 2026` · `Discover more:`

`Generate videos that look like your brand, not AI` is the most useful headline in the batch for a content designer. It names the actual anxiety of the AI-video buyer — that the output will be recognisable as AI — and positions against it without ever using a word like "quality" or "realistic". Compare "AI videos don't have to look generic." and "No more robotic-sounding voiceovers." elsewhere on the site. **VEED consistently sells against the failure mode of its own category**, which is a rare and confident stance.

**Three brand cards, each a claim plus a mechanism:**
- "Generate videos in minutes. Turn any idea into a video worth posting — no camera needed"
- "Keep people watching. The best subtitles on the internet — designed to make your videos unskippable."
- "Make every video look like your brand. Your colours, fonts, logos and voice — applied instantly, every time."

`unskippable` is a coined benefit adjective aimed at the platform metric, not at the craft.

**Tool pages follow a strict H1 = tool name, subhead = one-sentence benefit template:**

| Page | H1 | Subhead |
|---|---|---|
| video-editor | `Free Online Video Editor` | "Make pro videos in minutes with AI. Auto-cut filler words, add captions, clean audio, and more" |
| auto-subtitle-generator-online | `Auto Subtitle Generator Online` | "Automatically generate subtitles to make your video accessible to all audiences" |
| ai-video | `Free AI Video Generator` | "Generate videos from text, scripts, or images using AI models…" |
| text-to-speech-video | `AI Text to Speech Video` | "Instantly convert text to voice and add it to any video…" |
| tools | `VEED Tools` | "Online video editing made simple. Cut, trim, crop, add subtitles, progress bars, transcribe and more!" |

**`/tools/screen-recorder` has no H1 in served HTML at all** — only hero feature chips (`Free Online Recorder`, `Share, without downloading`, `1080p High-res recordings`, `Simple Editor`). It is running an older template and diverges on nearly every pattern in this file.

**The repeated section-header template on tool pages:** `FAQ` · `Loved by creators.` · `Loved by the Fortune 500` · `Discover more` · `Explore related tools` · `More from VEED` · `Trusted by 1M+ creators` · `When it comes to amazing videos, all you need is VEED` · and the reliable closer **`More than a/an <tool name>`** — `More than an auto subtitle generator`, `More than video editing software`, `More than a screen recorder`, `More than an AI video generator`, `More than an AI text-to-speech video maker`.

That `More than a X` slot is a genuinely reusable structure: the page arrives for a single-tool search query, satisfies it, and then uses one templated header to widen the frame to the platform. It works because it concedes the user's narrow intent before expanding it.

The screen-recorder page uses `What they say about VEED` where every other page uses `Loved by creators.` — confirming the template split.

## T3 CTA inventory

| Label (verbatim) | Location |
|---|---|
| `Login` / `Sign Up` | Global nav, every marketing page |
| `Create AI video` | Homepage hero |
| `AI Edit`, `Character` | Homepage hero secondary tabs |
| `Get the prompt` | Homepage, on each hero example |
| `Start for free` | `/pricing` subhead |
| `See all features` | `/pricing` — the only surviving string in the plan area |
| `Edit a video` | video-editor, hero + bottom |
| `Generate subtitles` | auto-subtitle-generator, mid-page + bottom |
| `Generate video` **and** `Create Video Now` | ai-video hero — **two CTAs side by side, sentence case vs Title Case** |
| `Convert text to speech` | text-to-speech |
| `Start Recording` (hero) vs `Start recording` (page bottom) | screen-recorder — **case conflict on one page** |
| `Learn More` | End of every "How to…" step block; also every `More from VEED` blog card |
| `Discover more:` (homepage, with colon) vs `Discover more` (tool pages) | |
| `Explore related tools` | Tool pages |
| `Previous` / `Next` | Testimonial carousel |
| `Previous example` / `Next example` | Homepage hero carousel |
| `Cookie Settings` | **screen-recorder footer only** — absent from newer tool pages |
| `Report a problem` | status.veed.io (mailto) |
| `Skip to main content` | Help centre only |
| `Search for articles...` with `⌘K` hint | Help centre |
| `Copy for LLM` | Every help article |
| `Did this answer your question?` + `Disappointed Reaction` / `Neutral Reaction` / `Smiley Reaction` | Every help article foot |
| `Go to iOS Lite App Help Center` | Help centre header |
| `All Collections` | Help centre breadcrumb |
| `Download` → `MP4` / `MP3` / `GIF` | Video page download menu `[documented]` |
| `Allow` | Browser permission step, screen recorder |
| `Done` | Editor export confirm `[documented]` |

**Reassurance microcopy under CTAs:** `No credit card required` on video-editor, ai-video, text-to-speech and the auto-subtitle bottom CTA — **absent from the homepage hero and from screen-recorder.** The single most conversion-relevant piece of microcopy is applied to four of six primary CTAs.

**`Copy for LLM` on every help article is a notable 2026 artefact** — VEED has shipped a first-class affordance for feeding its own documentation to a language model. That is a content-strategy decision, not a UI one: it treats the help article as a portable context object rather than a page to be read.

**Duplication note.** The same hero CTA appears two or three times per page with an *identical* label but different destination URLs (one carries a `flow=` JSON payload, the other a plain `?tool=` param). And `Learn More` serves both product tutorials and blog articles — the one place VEED ships a genuinely context-free CTA.

## T4 Onboarding & concept teaching

**VEED reuses a rigid 3-step template on every tool page.** Step labels render as `Step 01` / `Step 02` / `Step 03` with an H3 heading. The step count is **always 3**. `[observed]`

| Tool | Header | Step 1 | Step 2 | Step 3 |
|---|---|---|---|---|
| video-editor | "How to edit a video online:" | `Upload your video` | `Edit and enhance` | `Export and share` |
| auto-subtitle | "How to add subtitles to a video:" | `Auto-generate subtitles` | `Change subtitle styles, personalize, animate, and more` | `Export your video or download the subtitle file` |
| text-to-speech | "How to convert text to speech with AI:" | `Upload video or start from scratch` | `Convert text to voice` | `Export or keep creating` |
| ai-video | "How to generate AI videos:" | `Describe your video` | `Customize your video` | `Export or keep creating` |
| screen-recorder | "How to record your screen:" | `Select a layout` | `Record your screen` | `Edit, correct eye movements, and export` |

### The grammar analysis, since this is the benchmark strength

All five are imperative verb phrases and all are 3 steps — the frame holds. What varies is instructive.

**Step 1's verb does change per tool, and correctly so.** `Upload` / `Auto-generate` / `Describe` / `Select`. VEED did not force "Upload" onto tools that do not require an upload. The one place it slips is text-to-speech, where step 1 is `Upload video or start from scratch` — "Upload" leads even though the tool's premise is that you have no video, and "or start from scratch" is bolted on as a rescue clause. A better step 1 for that tool would lead with the text.

**Step 3 is export-flavoured every time and phrased differently every time.** `Export and share` / `Export your video or download the subtitle file` / `Export or keep creating` (×2) / `Edit, correct eye movements, and export`. Only two of five match. Worse, step 3 mixes `Export` and `Download` as if interchangeable — **while VEED's own help centre treats them as two distinct sequential states with two separate articles** (`How to Export your project` and `How to Download your project`, with an explicit rule that a draft cannot be downloaded until exported). The marketing model and the product model disagree on the last step of every flow.

**Step 2 is where the template breaks down.** Headings run from two words (`Edit and enhance`) to eight (`Change subtitle styles, personalize, animate, and more`). The screen-recorder's step 3 is a three-verb compound (`Edit, correct eye movements, and export`), breaking the one-action-per-step rule the other pages hold — and "correct eye movements" is a specific AI feature smuggled into a generic step label.

**What VEED does well here:** the frame is genuinely consistent at the level a user perceives — three steps, always, with `Step 01` numerals and imperative headings. A user who has used one VEED tool can predict the shape of any other. That predictability is the whole value of a template, and VEED gets it at the structural level while losing it at the string level.

**Instructional register inside step bodies is second person imperative with a reassurance aside** `[observed]`: "Drag and drop your video file or paste a link. VEED supports MP4, MOV, AVI, and other major formats." and, on the screen recorder, "Don't worry if you mess up; you have unlimited retakes."

That last clause is the single best piece of onboarding microcopy in the batch. It names the fear (`you mess up`), uses the register a person would actually use (`Don't worry`), and resolves it with a concrete entitlement (`unlimited retakes`) rather than encouragement. Six words of fear, four words of fix.

**Getting-started help** `[observed]` — the collection `Getting Started with VEED` (9 articles) exists, with titles including `How to Sign-up and Login to VEED` and `How VEED's dashboard works`. There is no numbered onboarding sequence in the help centre; all sequencing lives on marketing pages.

## T5 Form & field labels

Mostly `[documented]` via help articles; live strings marked `[observed]`.

- Upload: "Drag and drop your video file or paste a link" — the only URL-paste affordance surfaced publicly `[observed]`
- Editor left-menu panels cited in FAQs: `Subtitles`, `Audio`, `Elements`, `Style`, `Settings` `[documented]`
- Subtitles panel: `Auto Subtitle`, `Add translation` / `Add Translation` (**cased two ways within one page's FAQ set**), `Auto-subtitle with Translation`, `Edit` (on a preset), settings > `Download` `[documented]`
- **Language selector has no canonical label.** Three phrasings across pages: "choose a language" / "Select the language being spoken in your video" / "select your target language" `[documented]`
- Text to speech: `Text to Speech` (panel), `Generate` (button), `Generate Voice` (tools-index alt text) `[documented]`
- Export flow, help article: `Settings` tab → `Export Settings` → `Quality` (preset list) → `Advanced` ("for additional options, such as adjusting the resolution before exporting") → `Done` `[documented]`
- Download menu: `MP4`, `MP3`, `GIF` `[documented]`
- Privacy: Dashboard > workspace name > `Privacy & Security` > `Project Privacy`, value `'Anyone with the link can view'` `[documented]`
- Canvas: `Preset Canvas Sizes` `[documented]`

**Counts stated, and they disagree** `[observed]`: 125+ languages (subtitles/captions), "over 125 languages" (video editor page), 50+ languages (text-to-speech). Two of these describe the same subtitle capability.

## T6 Status & state language

**The product's real state model is `draft` → exported → downloaded, and it is only visible in the help centre.** `[documented]`

- `Hang tight...` — a loading state served in `/tools/screen-recorder` HTML `[observed]`
- `Loading...` — status.veed.io calendar `[observed]`
- Export flow: "**Rendering Process:** wait for a few seconds while VEED renders your project. You will be redirected to the video page where you can monitor the rendering progress." → "Once rendering is complete, click on the **Download** icon"
- Project states named: `draft` (pre-export), "rendered video", "exported"
- Transcription: "the AI will start transcribing"
- Support SLA: "Paid customers can expect a response within 2–8 hours."

**The Export / Download distinction is the most important state fact about VEED and it is invisible on marketing.** Export renders to VEED's servers; Download saves to the device. They are two separate actions, in two separate articles, with a hard dependency: "If your project is still in **draft**, you won't be able to download it. The project must be exported first." And a staleness rule: "If you make further edits to the project, you will need to export it again to apply the new changes before downloading."

That is a genuinely two-state pipeline with a cache-invalidation rule attached, and the tool pages collapse it into one step labelled `Export and share`. A user who edits after exporting and then downloads gets the old file, and nothing on the marketing surface prepares them for it.

**Status page** `[observed]` — `status.veed.io`, with overall states "We're fully operational" / "We're not aware of any issues affecting our systems."

**The status-page component list is the closest thing VEED has to a canonical internal taxonomy**, and it does not match the nav:

`AI Studio` (AI Video generator, AI Image generator, AI Playground, Fabric, Voice Clone, AI Video editing) · `Login` · `Dashboard` · `Asset management` · `Payments and Subscriptions` · `Editor Tools` (Subtitles, Clean Audio, Dubbing, Stock media, Magic tools) · `Mobile iOS app` · `Project exporting` · `APIs` (Fabric API, Subtitle API).

Note `AI Studio` and `Editor Tools` as the two product halves — a cleaner split than either the nav (`Create with AI` / `Tools`) or the footer (`Generation` / `Video Editing`). **Three parts of VEED name the same binary three different ways, and the engineering-facing one is the clearest.**

**Not observed:** no upload state, no transcribing progress wording, no queue language, no percentage strings, no completion toast.

## T7 Error, failure & recovery

**The one exact error string published anywhere** `[documented]`:

> `We're sorry, your device isn't supported.`

Quoted inside the help title `Why am I getting a 'device isn't supported' error?`, with the cause given as hardware acceleration being disabled in the browser. Note the error apologises and names nothing actionable; the recovery lives only in the article.

**Mobile gate** `[observed]`, screen recorder:
> `Currently we don't support recording from mobile devices. Try it from your tablet or desktop!`

This is **the only exclamation mark in VEED's entire error and constraint copy**, and it lands on a blocking message. First person plural, states the limitation, offers two alternatives — the structure is right; the exclamation is a register misfire on a message that stops the user.

**The watermark-removal dead end — the sharpest unhappy-path copy in the file** `[documented]`:

> "You cannot download the video with the watermark already on it, upload that video into a new project, and export that new project to remove the watermark. The watermark is hardcoded into the video."

VEED has written a help paragraph that pre-empts a specific workaround the user is about to attempt, describes that workaround in full, and then kills it in four words (`The watermark is hardcoded`). Most products say "the watermark cannot be removed" and let the user waste twenty minutes discovering why. **Naming the workaround you are refusing is a reusable unhappy-path pattern.**

**Limits published as behaviour rules, not as errors** `[documented]`:
- FPS: "FPS limits only apply when the uploaded video has an FPS higher than **60**." If the source FPS is lower than the export setting, VEED uses the original.
- Resolution: "If the original video quality is lower than the chosen export resolution, VEED will not enhance it beyond its original quality."
- Text to speech: "Pro users can convert 5,000 characters of text to speech per audio clip."

Those first two are worth noting as a pair: both explain that a *setting* will be silently overridden by the *source*, which is the class of behaviour that generates the most "is this broken?" tickets in media tools. VEED documents both.

**Recovery affordance** `[observed]`: "you have unlimited retakes" (screen recorder).

**Negative finding:** **no file-size limit, no video-duration limit, and no unsupported-format error string is published anywhere in the public corpus.** Supported formats are stated positively only ("MP4, MOV, AVI, and other major formats"; audio "MP3, WAV"). A user cannot discover what will be rejected until it is rejected.

## T8 Empty states `[absent]`

None observable — all empty states sit behind auth. The two nearest artefacts: the dashboard project list has a `Recents` section with a `View all` escape hatch `[documented]`, and the screen recorder's pre-permission screen renders as `Hang tight...` rather than as a state with guidance about what is about to be asked for.

That second one is a small missed opportunity. The moment before a browser permission prompt is the moment to explain why it is coming; VEED ships a loading string.

## T9 Notifications & system messages `[observed]`

**Help-centre banner, headed `Quick update`:**
> "We've updated the VEED dashboard. Some features have moved, and there are some new ways to create videos. Read our guide to the new dashboard to find your way around" → link `How VEEDs Dashboard works`

Good instincts: it names the change, warns that things have moved, and routes to a guide. Two defects in one banner — **no terminal full stop**, and the link text drops the apostrophe (`VEEDs`) while the destination article title uses it (`How VEED's dashboard works`).

**Upgrade prompts** `[documented]`, FAQ-embedded rather than UI banners:
- "Upgrade for watermark-free exports in 1080p to 4K quality."
- "Upgrade to a premium plan for 4K exports, unlimited AI features, and watermark-free videos."
- "Upgrade to a paid plan to subtitle longer videos and download subtitle files."
- "Try automatic translation for free, and upgrade to a Pro plan to keep using the tool."

Note the fourth: it grants the trial and names the upgrade in one sentence, with `to keep using` rather than `to unlock` — continuation framing rather than gating framing. That is the better of the two constructions and VEED uses it once.

**Watermark notice:** "Free exports include a watermark."

**Support-channel notice on every help page footer** `[observed]`:
> "Our live support team is available via chat and email Monday–Friday… you'll first connect with our AI agent, who will escalate your query to a live agent if needed."

Disclosing up front that the first responder is an AI agent, and naming the escalation condition, is current good practice and worth recording as a dated benchmark.

## T10 Disclosures, legal & compliance

### Plan names and prices — there is no authoritative source

Plan names observed across help articles and FAQ copy: `Free`, `Creator`, `Lite`, `Pro`, `Studio`, `Enterprise`. **The pricing page renders none of them server-side.**

**Export limits** `[documented]`, from the export help article:
- "**Free Plan**: Export in **720p** only."
- "**Creator Plan**: Export up to **1080p**."
- "**Pro, Studio, and Enterprise Plans**: Export up to **4K**."

**Watermark rules** `[documented]`, from the watermark help article:
- "All projects exported while you weren't logged into an account or used a free account will have a VEED.IO watermark."
- "The only way to export a project without our watermark is to have a paid subscription. **The Lite, Pro, and Enterprise plans** allow you to export projects without a watermark."
- "You won't be able to edit or move the watermark, which will appear in your video as an image that will, after some time, appear in a different section of the video."
- Audio: "the same limits apply as to video exports, except there won't be a watermark on the audio file."

**Direct contradiction, and it is consequential.** The watermark article lists the watermark-free plans as **Lite / Pro / Enterprise**. The export article lists the paid tiers as **Creator / Pro / Studio / Enterprise**. `Creator` and `Studio` are silently missing from the watermark rule; `Lite` appears nowhere in the export article. **A Creator-plan subscriber cannot determine from VEED's own help centre whether their exports carry a watermark** — which is the single thing they are paying to remove.

That third watermark sentence is also unusual and worth flagging on its own: the watermark *moves position over the course of the video*. VEED documents an anti-crop measure in a help article, in the same breath as explaining you cannot move it.

**Prices observed — mutually inconsistent** `[documented]`:
- auto-subtitle FAQ: "A Creator plan starts at **$20/month**."
- video-editor FAQ: "Plans start at **$9/month (billed yearly)** and **$19/month (billed monthly)**."

These two "starting price" claims cannot both be the entry price. Both are in marketing FAQ answers on tool pages; neither is on the pricing page, which has no prices at all.

**Other limits** `[documented]`: "Pro users can convert 5,000 characters of text to speech per audio clip. Monthly audio limits vary per subscription plan." · Downloads: "There are no limits. You can download it as many times as you want."

**No storage limit, no export-minutes limit, and no AI-credit allowance number is published anywhere.** The pricing FAQ questions that would answer this — `How do AI credits work?`, `Can I add more AI credits to my plan?`, `What are the limits on subtitles and translations?` — **render with question text and no answer body.**

**AI credits, qualitative only** `[documented]`: "The AI video generator runs on AI credits, and each model costs a different amount per generation. You can try certain models for free with a set quota. Once you have used your free allowance, upgrade to a paid plan with AI credit add-ons."

Per-model variable pricing with no published rate card. Compare Adobe (171), which publishes per-feature credit costs to the second and the character.

**Content ownership and commercial use** `[observed]`, ai-video FAQ:
> "Yes, you retain rights to videos you create with VEED and can use them commercially. Avoid generating content that infringes existing copyrights or trademarks."

Two sentences: the grant, then the user's duty. Short, unhedged, and notably it does **not** claim the output is safe — it transfers the infringement question to the user in eight words. Contrast Adobe's `designed to be commercially safe` plus enterprise-only indemnification.

**AI training data — a notable absence.** **No statement was found.** The privacy policy contains no reference to training AI or machine-learning models on user content. Every "train" match in the page source is the stale nav item `Training`. For a product whose hero headline is "AI video creation", and which runs named third-party models on user uploads, the absence of any training-data disclosure is the most significant compliance gap in this file.

**UK GDPR posture** `[observed]`. Entity: "Veed Limited ("VEED", "we", "us" or "our" in these Terms), a company incorporated in England and Wales (with company number 11264311)", registered office "320d High Road, Benfleet, Essex, SS7 5HB, England", VAT "GB354412222".

The `/terms-of-use` page **opens with a B2B Personal Data Processing Agreement** citing Article 28(3) UK GDPR, followed by full Standard Contractual Clauses, then privacy-rights sections, and only then the consumer Terms. A consumer clicking "Terms of Use" from the footer reads several thousand words of processor-to-controller contract before reaching anything that applies to them.

Privacy policy section tree: 1. Important information and who we are · 2. The personal data we collect about you · 3. How is your personal data collected · 4. How we use your personal data · 5. Disclosures of your personal data · 6. International transfers · 7. Data security · 8. Data retention · 9. Your legal rights · 10. Glossary. Verbatim: "We do not sell your personal data to third parties." and "The Applications are not intended for children and we do not knowingly collect data relating to children." — **no age is stated.** Retention answers the heading "How long will you use my personal data for?" with a reasonably-necessary standard and no fixed periods.

**Cancellation and refund are effectively unreadable.** The consumer terms say "If this situation does unfortunately arise then you may want to cancel your subscription (see clause 7 below)" — **and the page served ends before clause 7 renders.** The only retrievable refund language is the reverse case: if VEED ends the contract, "we will refund, pro-rata (where applicable), any sums you have paid in advance for the Services in respect of the period after we end the contract" with "at least 24 (twenty-four) hours" notice. The pricing FAQ questions `Can I really cancel anytime?` and `What is your refund policy?` render with no answer text.

**Content defect in the terms** `[observed]`: clause 1.3 tells the reader "You should also read the [Terms of Use], [Privacy Policy] and [Cookie Policy]" — the square-bracket placeholders are unresolved in production, and the sentence instructs the reader to go and read the page they are already on.

## T11 Help-centre architecture `[observed]`

Platform: Intercom. Structure: Collections → sub-Collections → Articles. Every article carries `Copy for LLM`, a last-updated date, an "On this page" mini-TOC, `Related Articles`, and a three-emoji feedback row (`Disappointed Reaction` / `Neutral Reaction` / `Smiley Reaction`).

**Article-title grammar — five shapes:**

| Shape | Share | Examples |
|---|---|---|
| `How to <verb> <object>` | ~80% | `How to Cut and Trim your videos`, `How to use the Clean Audio tool`, `How to use our Magic Cut tool`, `How to Export your project`, `How to cancel your subscription`, `How to use the Eye Contact correction tool`, `How to Use the AI Dubbing Tool` |
| `How <thing> works` | small | `How VEED's dashboard works`, `How collaborator charges are calculated`, `How does VEEDs Referral Program work?` |
| `Why…? / Will…? / Can…?` troubleshooting | small | `Why am I getting a 'device isn't supported' error?`, `Why is watermark still showing if I am a paid subscriber?`, `Will the videos I created have a VEED watermark on them?`, `Are Stock files copyright free?` |
| Noun-phrase reference | small | `Supported languages for Dubbing`, `VEED Code of Conduct` |
| Long compound question (outlier) | 1 | `How do VEED subscriptions work across mobile and web platforms, and how can I access features on both?` |

Two trust-shaped titles are worth pulling out: `How can I ensure I am talking with an official VEED representative?` and `How do I report a bug?`. The first is an anti-impersonation article in a video editor's help centre — a security-adjacent concern most creative tools do not document.

**Capitalisation is not governed.** Within one 11-article collection: `How to use Text to Speech` (Title Case object) sits beside `How to use the silence remover tool` (all lower) and `How to Use the AI Dubbing Tool` (Title Case verb *and* object). Apostrophes are inconsistently dropped: `VEEDs Referral Program`, `VEEDs Recorder`, `How to crop an Image or video using VEEDs editor`, against `How VEED's dashboard works`.

## T12 FAQs

**`/pricing` — nine questions, all rendering with no answer text** `[observed]`. This is the most consequential defect in the file:

`Do you offer a trial for paid plans?` · `Can I really cancel anytime?` · `What currencies and payment options are available?` · `Can I add more AI credits to my plan?` · `How do AI credits work?` · `What are the limits on subtitles and translations?` · `How do you charge for multiple users?` · `What is your refund policy?` · `Do you offer plans for educational institutions?`

These are exactly the right nine questions. Every one of them is a purchase-blocking commercial question, and every one of them is empty. The page ships the FAQ *structure* — the question list is a well-designed artefact in itself — with none of the content. **`/tools/screen-recorder` has the same defect** across seven questions.

**`/tools/video-editor` (8):** `What is the best free video editing software?` · `Why should I choose VEED over other video editors?` · `Is VEED's video editor really free?` (free tier = basic edits, 720p, one-time AI trials, watermark) · `Can I export videos without a watermark?` (paid only; quotes the $9/$19 figures) · `Which video editing software is best for beginners?` · `How do I trim or shorten a video online?` (drag handles **or delete transcript words**) · `Does the video maker have stock videos and audio?` · `What is the best editing software for PC? What browsers are supported?` — **two questions in one FAQ item.**

**`/tools/auto-subtitle-generator-online` (10)** — the strongest set, because it includes a definitional question rather than only how-tos: `What are closed captions vs. subtitles?` (CC adds non-verbal audio and is viewer-toggleable). Also `How to make subtitles for a video?` · `Can I generate subtitles from audio only?` · `Is VEED's auto subtitle generator free?` · `How do I make animated subtitles?` · `How do I add aesthetic subtitles to my video?` · `How do I generate an SRT file from a video?` · `How can I translate captions into another language?` · `How do I add English subtitles to a video?` · `How do I add subtitles to an Instagram video?`

**`/tools/ai-video` (6):** `What are the best AI video makers?` · `Is the AI video generator free?` · `What AI can generate videos?` · `Which AI video model works best for talking head videos?` (Fabric 1.0, up to 60s) · `Can an AI video generator work from an existing video?` · `Can I use AI-generated videos for commercial purposes?`

**`/tools/text-to-speech-video` (6):** including `Is there a limit to how much text I can convert to speech?` (5,000 characters per clip for Pro) — a limit disclosed in a marketing FAQ rather than a pricing table.

**Help-article embedded FAQs**, prefixed `Q:` `[documented]`: `My download speed is slow. Why?` · `Why is the GIF quality bad?` · `How many times can I download a project?` · `Can I set the thumbnail of the video when I download it?` · `Is there a limit on audio downloads?` · `I downloaded on my phone but can't find the file. Where is it?` · `I have a plan, but the watermark is still on the video.` (**not a question — a declarative statement in a `Q:` slot**) · `The exported video has a much smaller file size. Is it lower quality?` · `Who can view my exported projects?` · `Can anyone view my project if it is set to 'Anyone with the link can view'?` · `Can I export from the mobile apps?`

`I have a plan, but the watermark is still on the video.` is the only first-person confession-shaped entry VEED ships, and it sits mislabelled in a question slot. It is also, given the Creator/Lite contradiction in T10, probably the most-needed article on the site.

**FAQ grammar note:** two competing shapes coexist — user-voice (`How do I screen record with sound?`) and SEO-voice (`How to make subtitles for a video?`). The second is not grammatically a question but is punctuated with a question mark.

## T13 Terminology & glossary — the editing-label system

### Named AI operations, exact capitalisation `[observed]`

`Auto Edits` · `Auto Subtitle` · `Auto-subtitle with Translation` · `Magic Cut` · `Magic B-roll` · `Magic tools` (status-page component) · `Clean Audio` · `AI B-roll` · `AI Voice Clone` · `AI Analysis` · `Eye Contact` / `Eye Contact AI` / `Eye Contact correction tool` / `Eye Contact Correction` · `AI transitions` · `AI rephrase` · `AI Background Expand` · `AI Filter` · `Silence remover` · `Filler Remover` · `Dynamic Subtitles` · `Brand Kit` · `Text Based Video Editing` · `OpenEdit` ("VEED's Agent-Driven Video Editor") · `VEED MCP` · `Add Translation`

### Plain operations `[observed]`

Trim · Crop · Cut · Split · Resize · Rotate · Flip · Loop · Join · Compress · Convert · Censor · Enhance · Upscale · Zoom · Detach audio · Mute · Increase Volume · Progress bar · Sound wave · Title page · CTA button · Transitions · Animations · Stickers · Emojis · Frames · Filters · Overlay · Green Screen · Templates · Timeline · Layout · Retakes

### Generation features `[observed]`

`AI Video Generator` · `Text to Video` · `Image to Video` · `Images to Video` · `Video to Video AI` · `Image to Image AI` · `Audio to Audio AI` · `VideoGPT` / `Video GPT` · `AI Video Editor` · `AI Clip Generator` · `AI Script Generator` · `AI Avatars` / `AI Avatar Generator` · `AI Lip Sync` / `Lip Sync AI` · `Talking Photo` · `Talking Characters` · `AI Voice Generator` · `AI Voice Cloning` · `AI Voice Mimic` · `Text to Speech` · `Text to Speech Avatar` · `AI Music Generator` · `AI Voice Cleaner` · `AI Audio Enhancer` · `AI Image Generator` · `AI Image Editor` · `AI Image Extender` · `AI Image Resizer` · `AI Background Remover` · `AI Art Generator` · `Image Upscaler` · `AI Ad Generator` · `AI UGC Ads` · `AI Reel Generator` · `AI Animation` · `AI Presentation Maker` · `AI Movie Generator` · `AI Dubbing` / `Dubbing AI` / `Voice Dubber` · `Video Translator` · `Subtitle Translator` · `Fabric 1.0` · `AI Playground` · `Voice Clone` · `AI Studio` · `Repurpose Video` / `Create Clips`

**Third-party model names are surfaced as first-class UI terms** `[observed]`: Veo 3 / Veo 3.1 · Sora 2 / Sora 2 Pro · Kling AI / Kling 3.0 / Kling O1 · PixVerse · Hailuo AI / MiniMax / Hailuo 2.3 · Seedance 2.5 · Lightricks LTX · Fabric 1.0. VEED asks a consumer user to choose between named foundation models by version number — the same decision CapCut makes.

### The approachable word chosen over the professional term

This is VEED's strongest terminology work, and it is more coherent than CapCut's because VEED consistently names the **user-visible symptom**, not the process:

| VEED says | Professional term rejected | Why it works |
|---|---|---|
| `Clean Audio` | noise reduction, denoise, audio restoration | "Clean" is the desired state, not the operation |
| `Magic Cut` | automated rough cut, jump-cut assembly | Glossed in body copy as "let AI splice your clips" |
| `Magic B-roll` / `AI B-roll` | cutaway, insert footage | Keeps the one industry term creators already know |
| `Eye Contact` | gaze correction, gaze redirection | Names what the viewer perceives. "Eye tracking" survives only in a URL slug and a legacy page title |
| `Filler Remover` | disfluency removal | Glossed in plain speech: removes "filler words (like 'er' or 'um')" |
| `Silence remover` | dead-air trimming | |
| `Auto Edits` | batch or preset processing | |
| `Character` (homepage) | avatar, presenter | A **fourth** word for one concept — see below |

**`Burn` and `hardcode` are used for the same subtitle operation, and VEED glosses one with the other** `[observed]`: "you can 'burn' or add the subs permanently to your video." Both terms appear in scare quotes, which is the right instinct — flagging a term of art as a term of art — but the product then uses `hardcoded` unglossed in the watermark article.

### Terminology inconsistencies `[observed]`

- **Subtitles / Captions / Transcription** are used interchangeably in nav and titles, despite VEED publishing the definition that distinguishes them. The help centre has a top-level `Captions` collection *and* a `Subtitles and Translation` collection.
- `VideoGPT` vs `Video GPT` — one product, two spellings, both live (nav vs tools index)
- `Dubbing AI` vs `AI Dubbing` vs `Voice Dubber` — three names, one capability, across nav, footer and tools index
- `Eye Contact AI` vs `Eye Tracking Software` vs `webcam eye tracker` vs `AI eye contact` — **four labels on pages that link to each other**
- `Fabric 1.0` / `Fabric 1.0 API` / `Fabric API` / `VEED Fabric 1.0 API` — four renderings, two URL slugs
- `AI Avatars` / `AI Presenter` / `Talking Characters` / `Character` — four words for the synthetic-person concept
- `Export` vs `Download` — two real product states, collapsed into one on every marketing page (T6)
- `AI Lip Sync` in the nav links to `/tools/lip-sync-api` — a **developer** page behind a consumer label

The pattern here is the same as CapCut's: the coined terms are good, the governance is absent. VEED's variation is concentrated in the newest features (Fabric, Eye Contact, Dubbing, Avatars), which suggests naming drift tracks shipping velocity.

## T14 Voice, tone & accessibility

**Person and register.** Second person to the user, first-person plural for VEED. Marketing register is clipped, fragment-heavy and confident: `Imagine it. Generate it. Brand it.` · `Finally, AI video worth posting.` · `AI videos don't have to look generic.` · `No more robotic-sounding voiceovers.` · `No need for green screens!`

Note how many of those are **negations of a category failure** — "don't have to look generic", "no more robotic-sounding", "no need for". VEED's brand voice is built on naming what the competition gets wrong, which is unusual and effective for a challenger, and would not transfer to an incumbent.

Help-centre register shifts to neutral procedural instruction with a warmer aside (`Don't worry if you mess up`).

**Exclamation marks are rare and confined to older templates** `[observed]`: `No need for green screens!` (video-editor), `Try it from your tablet or desktop!` (screen-recorder), `…transcribe and more!` (tools H1 subhead). Absent from all newer 2026-template tool pages and from every help article. This looks like a deliberate move away from exclamatory tone that has not been retrofitted to the legacy pages — a register migration visible in the artefacts.

**British vs American spelling — confirmed mixing, on a UK company** `[observed]`:
- The homepage brand card uses en-GB **`colours`** ("Your colours, fonts, logos and voice")
- Every tool page uses en-US **`colors`** ("brand colors", "font, color, size")
- en-GB `Media Enquiries` in the footer on all pages, alongside en-US `Trust Center`, `Help Center`, "personalize", "customize", "emphasize"
- Date format is US-order ("August 21, 2026") in the help centre
- **`70.000+ recordings created last week`** on the screen-recorder page — a European decimal point used as a thousands separator, which reads as *seventy* in both en-GB and en-US

So the single most impressive stat on the screen-recorder page is rendered as a two-digit number. That is the clearest localisation defect in this batch.

**Accessibility** `[observed]`:
- **Skip link:** `Skip to main content` on the help centre (an Intercom default). **No skip link on any www.veed.io marketing page.**
- **Alt text is unusually rich on the marketing site** — "Meta company logo with infinity symbol and text 'Meta' in gray." · "Woman smiling during a screen capture video recording session with control settings visible on the bottom menu." · "VEED's AI Video Generator creating a high-energy launch video for a new brand called Lime Zero."
- **But quality is uneven.** Several `/tools` index cards carry **filenames as alt**: `Dictation Software.png`, `Twitch Downloader.png`, `Video Podcast.png`; others carry the label duplicated: `Progress Bar Generator Progress Bar Generator`, `Flip Video Flip Video`, `Loop Video Loop Video`, `Audio to Audio AI Audio to Audio AI`
- **Mislabelled alt:** on the auto-subtitle page, a logo-carousel image with alt `Visa logo` is attached to a file named `p_and_g_1_….png`, while a separate `Procter & Gamble logo` exists. **Screen-reader users are told the wrong brand.**
- Three consecutive decorative avatars in the "Trusted by 1M+ creators" cluster carry empty alt — correct
- Keyboard hint `⌘K` shown on help search with **no Windows equivalent**

**Accessibility statement: none found.** Accessibility appears on VEED's site only as a *marketing* benefit — "make your video accessible to all audiences", "Create accessible content using our AI automatic subtitle generator", "for viewers who can't hear the audio at all" — and never as a commitment about VEED's own product. Like CapCut, VEED sells captions as accessibility and publishes no conformance claim about itself.

**Negative findings, recorded honestly**

- **Pricing page ships zero plan names and zero prices**, and all nine of its FAQs render questions with no answers; same on screen-recorder (seven empty FAQs)
- **Watermark rule contradicts export rule** — Lite/Pro/Enterprise vs Creator/Pro/Studio/Enterprise
- **Two conflicting "starting price" claims** — $20/month vs $9/$19
- **Cancellation and refund terms are unreachable** — the terms page points to clause 7 and stops before rendering it
- `/terms-of-use` contains unresolved placeholders `[Terms of Use], [Privacy Policy] and [Cookie Policy]`
- `/privacy` and `/terms-of-use` serve a stale, different global nav
- **No AI training-data disclosure anywhere** in the privacy policy
- No published file-size limit, duration limit, storage limit, export-minute limit, or AI-credit quantity
- Typo `choppping` in the Michael Glover testimonial, **replicated on at least four tool pages**; lowercase `i created` in the Travis Tyler testimonial, also replicated
- `70.000+ recordings created last week` — wrong thousands separator
- `1500+5 star reviews` — homepage eyebrow renders with no separator
- `Generate video` / `Create Video Now` side by side with mismatched case; `Start Recording` vs `Start recording` on one page
- Language-count claims disagree: 125+ / "over 125" / 50+
- `Add translation` vs `Add Translation` in adjacent FAQs on one page
- `VEEDs Dashboard` (banner link) vs `How VEED's dashboard works` (article title); apostrophe dropped in three more titles
- Help sidebar duplicates five sub-collections as top-level entries
- No skip link and no accessibility statement on the marketing site

---

## Transferable patterns

1. **Name the fear, then resolve it with an entitlement, not with encouragement.** "Don't worry if you mess up; you have unlimited retakes." Ten words. The resolution is a concrete product fact, not reassurance. Transfers to any first-attempt-anxiety moment — a first transfer, a first KYC upload, a first recording.
2. **Name the workaround you are refusing.** VEED's watermark article describes, in full, the export-reimport trick a user is about to try, then kills it: "The watermark is hardcoded into the video." Pre-empting the specific wrong path is more useful than restating the rule.
3. **Position against your own category's failure mode.** "Generate videos that look like your brand, not AI." · "No more robotic-sounding voiceovers." VEED names the thing buyers fear about AI video and sells the absence of it. Condition: only available to a challenger. An incumbent saying this indicts itself.
4. **`More than a <tool name>` as a templated widening header.** The page satisfies the narrow search intent, then uses one consistent header to expand to the platform. Reusable on any SEO landing page that must convert a single-task visitor.
5. **Keep the step frame rigid even when the step verbs must vary.** Three steps, always, with `Step 01` numerals — but `Upload` / `Describe` / `Select` as step 1 depending on the tool. The predictability lives in the count and the shape, not in the words. VEED gets this right structurally and then fails to govern step 3's wording.
6. **Disclose that the first responder is an AI agent, and name the escalation condition.** "you'll first connect with our AI agent, who will escalate your query to a live agent if needed."
7. **Anti-pattern: the pricing FAQ is the right nine questions with none of the answers.** VEED's empty pricing FAQ is a rare case where the *information architecture* is exemplary and the content layer is absent. The question list — trial, cancellation, currency, credits, limits, seats, refunds, education — is worth copying verbatim as a checklist of what a pricing page must answer, even though VEED answers none of it.
8. **Anti-pattern: two help articles defining the same entitlement differently.** A paying Creator-plan user cannot determine whether they get a watermark. Where two articles both enumerate plan tiers, they must be generated from one source.

## Caveats & gaps

- **The pricing page is client-rendered and yielded nothing.** Plan names, prices, feature rows and all nine FAQ answers are absent from the served HTML. Every price, plan name and limit in this file comes from help articles and tool-page FAQ copy, and two of those sources contradict each other. Nothing here should be treated as canonical pricing.
- **`/tools/screen-recorder` FAQ answers are likewise client-rendered** — seven questions captured, zero answers.
- **`/terms-of-use` truncates** at 1,578 lines, before clause 7. Cancellation and refund terms were not readable. This is a real gap in T10, not an omission.
- **Four URLs in the original brief do not exist** (`/tools/auto-subtitle-generator`, `/tools/ai-video-generator`, `/tools/text-to-speech`, `/terms`). Live equivalents were harvested instead and are listed in Pages inspected.
- **All in-product states are documented, not observed.** The draft/export/download pipeline, editor panel names, export settings and the download menu are reconstructed from help articles. No empty state, validation message or toast was directly observed. Marked `[documented]` throughout.
- **Help-article bodies were read for four articles only**; the remaining ~150 titles were captured as an inventory. Title grammar is well-evidenced; answer structure is not.
- **The iOS app has its own 24-article help collection and its own payments collection**, neither of which was harvested. VEED's mobile string set is a separate corpus.
- **No status-page incident history was captured** — the page was "fully operational" at harvest, so the incident-copy register (which is where a status page's real voice lives) is unobserved.
- **`Copy for LLM` was not exercised.** It may serve a different, cleaner text representation of each article than the rendered page; that is worth a dedicated pass.

## Sources

1. https://www.veed.io/
2. https://www.veed.io/pricing
3. https://www.veed.io/tools
4. https://www.veed.io/tools/video-editor
5. https://www.veed.io/tools/auto-subtitle-generator-online
6. https://www.veed.io/tools/ai-video
7. https://www.veed.io/tools/text-to-speech-video
8. https://www.veed.io/tools/screen-recorder
9. https://help.veed.io/ (301 → https://support.veed.io/en)
10. https://support.veed.io/en — help centre index and six collection pages
11. https://support.veed.io/en/articles/10531327 — How to Export your project
12. https://support.veed.io/en/articles/10531489 — How to Download your project
13. https://support.veed.io/en/articles/7056370 — watermark
14. https://www.veed.io/terms-of-use
15. https://www.veed.io/privacy
16. https://status.veed.io
