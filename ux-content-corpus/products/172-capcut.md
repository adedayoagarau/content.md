# 172. CapCut

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Consumer video editor (ByteDance) / mobile-first short-form editing suite with generative AI |
| Primary URL | https://www.capcut.com/ |
| Corpus rank | 172 |
| Benchmark strength (source list) | Editing labels and creator onboarding |
| Locale / market observed | en-US. The privacy policy served is titled "CapCut US Privacy Policy" and is explicitly US-scoped |
| Platform observed | Web (marketing, help centre, Trust Center, legal). In-product strings only where quoted inside help articles |
| Auth state | Unauthenticated public surfaces only |
| **Ownership — corrected finding** | CapCut is a ByteDance product by origin, and `capcut.support@bytedance.com` survives as a live support address on `/tools/desktop-video-editor`. **However, ByteDance is not named as the operator in either the US Terms of Service or the US Privacy Policy.** The Privacy Policy states verbatim: "The Services are operated by TikTok USDS Joint Venture LLC (“we”, “us” or “our”)." US Premium Services are provided by "TT Commerce & Global Services LLC and its affiliates". Both documents repeatedly cite "including Executive Order 14352 and any compliance obligations thereunder." US address given as 5800 Bristol Pkwy, Suite 300, Culver City, CA 90230 |
| Regulatory posture | Executive Order 14352 (named repeatedly in ToS and Privacy Policy); CCPA-era US state privacy framing; a footer link labelled `Digital Services Act` pointing off-domain. **No EU/UK entity, establishment, or counterpart privacy policy was located.** Age floor stated in the Materials License Agreement: "individuals 13 years old and over" |
| Harvest date | 2026-09-22 |
| Pages inspected | 33 attempted, 28 usable |
| Harvest completeness | Partial — **no public pricing page exists** (`/pricing` and `/en-us/pricing` both return empty 200s); **no CapCut-operated status page exists**; help categories paginate and the pagination links are malformed on the live site, so only page 1 of each category was reachable; the in-product UI layer (real form labels, live error toasts, empty states) is behind auth and is reconstructed from help prose |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.capcut.com/ | Hero, numbered accordion, stat strip |
| Tools index | https://www.capcut.com/tools | H1 `CapCut Editing Tools`, 3 FAQs |
| Online video editor | https://www.capcut.com/tools/online-video-editor | 3-step how-to, 12 FAQs |
| AI caption generator | https://www.capcut.com/tools/ai-caption-generator | 3-step how-to, 8 FAQs |
| Desktop video editor | https://www.capcut.com/tools/desktop-video-editor | Legacy nav, 5 FAQs |
| AI video generator | https://www.capcut.com/tools/ai-video-generator | Two how-tos (3 and 4 steps), 11 FAQs |
| Text to speech | https://www.capcut.com/tools/text-to-speech | Two how-tos, 12 FAQs, the fullest recovery ladder |
| Video background remover | https://www.capcut.com/tools/video-background-remover | 13 FAQs; the only `Chroma key` sighting |
| Online video converter | https://www.capcut.com/tools/online-video-converter | 12 FAQs, format lists |
| Free video compressor | https://www.capcut.com/tools/free-video-compressor | 12 FAQs, `Pro Tip:` pattern |
| AI image generator | https://www.capcut.com/tools/ai-image-generator | Three how-tos, 11 FAQs, live mojibake bug |
| Creative suite | https://www.capcut.com/creative-suite | Legacy template, 5-slide rotator |
| Templates | https://www.capcut.com/template | **Partial** — truncated mid-page |
| Help centre index | https://www.capcut.com/help | 10 flat categories, ~49 article titles |
| Help: Editing & Exporting | https://www.capcut.com/help/editing-and-exporting | Page 1 of 7 |
| Help: AI Features | https://www.capcut.com/help/ai-features | Page 1 of 2 |
| Help: Payment & Billing | https://www.capcut.com/help/payment-billing | Page 1 of 2 |
| Help: Account Settings | https://www.capcut.com/help/account-settings | Page 1 of 3 |
| Help: Thinking phase | https://www.capcut.com/help/stuck-at-the-thinking-phase | **The single richest status/error artefact** |
| Help: Pro export | https://www.capcut.com/help/join-capcut-pro-for-exporting | Three export-gating modal strings |
| Help: pricing articles ×4 | /help/monthly-and-yearly-plans, /help/new-capcut-subscription-pricing, /help/how-much-does-capcut-pro-cost, /help/capcut-teams-price | The only place plan names appear |
| Trust Center | https://www.capcut.com/trust | Four pillars |
| Trust: Using AI responsibly | https://www.capcut.com/trust/trustworthy-ai | The AI-labelling commitment |
| Trust: Safety | https://www.capcut.com/trust/safety | Reporting flow |
| Terms of Service | https://www.capcut.com/clause/terms-of-service | Entity, licence grant, billing |
| Privacy Policy | https://www.capcut.com/clause/privacy-policy | "Last Updated: April 15, 2026" |
| Community Guidelines | https://www.capcut.com/clause/community-guideline | "Last updated, May 2024" |
| Materials License Agreement | https://www.capcut.com/clause/material-license-agreement | "Last Updated: January 22, 2026" |
| Pricing | https://www.capcut.com/pricing and /en-us/pricing | **BLOCKED** — empty 200 |
| Status page | https://status.capcut.com/ | **BLOCKED** — no such page exists |

---

## T1 Navigation & IA labels `[observed]`

**There are two different global navs on the same site, and two different footers.**

- Current nav (homepage, `/tools`, `/template`, `/help/*`, `/trust`): `Products` · `Features` · `Blog` · `Templates` · `Discover` · `Try online` · `Download`
- Legacy nav (`/creative-suite`, `/tools/desktop-video-editor`): `Home` · `Products` · `AI tools Hot` · `Solutions` · `Resources`

That is not a cosmetic split. The two navs use different grouping vocabularies for the same product surface — current `Features` groups are `AI creation` / `Text & Audio` / `Image` / `Video`; legacy `Products` groups are `Platforms` / `Video & Audio` / `Text & Assets` / `AI magic tools`. A user who lands on a legacy page learns a taxonomy that does not exist on the rest of the site.

**Products dropdown — label plus a tagline, and the taglines do the positioning** `[observed]`:

| Label | Tagline |
|---|---|
| `CapCut Desktop` | "Powerful editing tool" |
| `CapCut Online` | "Online video editor" |
| `CapCut Pad` | "Edit anywhere, anytime" |
| `CapCut Mobile` | "Unlimited templates" |
| `Plugin` | "CapCut × Codex" |
| `Dreamina AI` | "Image & video maker" |
| `Pippit AI` | "Smart creative agent" |
| `Hypic` | "AI photo editor" |

Four platforms and four sibling brands presented in one flat list. Nothing in the label or tagline distinguishes "another surface of CapCut" from "a different product". `Plugin` is labelled by *what it is* while its tagline is *what it connects to* — the one entry whose two lines answer different questions.

**Discover group headings** `[observed]`: `About` · `Initiatives` · `Help` · `Newsroom`. Both `Trust Center` and `Help Center` sit under `Help`, which puts the legal and safety hub in a support slot.

**Footers** `[observed]`. Current: `Products` · `AI Features` · `Image & Video` · `Discover` · `Company`. Legacy: `Tools` · `Create` · `Resource` · `About`. Footer tagline: "AI-Powered Video Editor for Everyone". Legal row: `Terms of Service` · `Privacy Policy` · `Cookies Policy` · `License Agreement` · `Creator Terms of Service` · `Digital Services Act` · `Community Guidelines` · `Your Privacy Choices`.

**IA defects worth logging** `[observed]`:
- Footer label `License Agreement` points to a document titled "CapCut Materials License Agreement" — the footer drops the word that says *what* is licensed, which is the whole distinction
- Trust Center card `Using AI responsibly` has slug `/trust/trustworthy-ai` — label and slug are different concepts
- Newsroom item reads `Capcut World Singapore` — mis-cased own brand
- The Discord footer href is a concatenation bug on every `/tools` and `/help` page: `https://discord.com/inhttps:/discord.com/invite/...`
- Help category `Account Setting` (singular label) has slug `account-settings` (plural)
- `/help/` returns an **empty HTTP 200 for a bad slug rather than a 404**, so a mistyped help URL renders a blank page with no error

## T2 Value proposition & headline patterns `[observed]`

**Homepage H1** renders as `AI-Powered Photo & Video Editorfor Everyone` — a missing space at a line-break artefact, shipped live.

> Subhead: "CapCut has everything you need to create trending content for YouTube, Instagram, and beyond."
> Under the CTA: `No credit card required`

The subhead's differentiator is **trending**, not quality, speed or cost. That single word is the positioning: CapCut sells proximity to what is currently working on platforms, not craft. Every other headline pattern serves it.

**Section headers** `[observed]`: `Smart Editor & Generator` · `AI Editing Tools` ("The reliable and essential AI editing features from CapCut for text, audio, and video.") · `Templates for Everything` · `Voice of Our Users`. The AI Editing Tools block is a **numbered accordion** — `01 Image`, `02 Video`, `03 Text & Audio`, `04 Creative Templates` — numbering a browse affordance as if it were a sequence.

**Stat strip** `[observed]`: `100M Downloads` · `100K Creators` · `4.7 App Store Ratings` · `20 Languages`. Note `100M` downloads against only `100K` creators, and `20 Languages` against a caption FAQ claiming 20+ language support — the numbers are rounded to the point of being non-specific, the opposite of the Wise practice of unrounded trust numbers (`18.9 million`, `301,144 reviews`).

**The signature headline shape is the two-sentence fragment pair** `[observed]`: `One-stop tools. Professional videos.` · `Online video editor. Lightweight, yet powerful.` · `Online graphic design. Intelligent and innovative.` · `Edit smarter, create faster`. Category noun first, adjective pair second.

**Aspirational closers** `[observed]`: `Your ideas deserve smarter tools` · `Start your next viral video today` · `Inspire your creativity and create like a pro` · `Unleash the power of CapCut's web video editor` · `Never starting from a blank screen again.`

**Tool-page H1 pattern is SEO-keyword-first** `[observed]`: `Free Online Video Editor` · `Smart AI Caption Generator` · `CapCut Editing Tools` · `Explore Trending Templates on CapCut` · `CapCut Help & Support`. The one outlier is `/tools/desktop-video-editor`, whose H1 is `Enhance your videos and Dreamina Seedance 2.5 generations` — a model name in an H1 on a page most visitors reach looking for a desktop editor.

`/creative-suite` runs a **5-slide rotator on one stem**: "Online creative suite for everyone to create stunning videos / make high-quality images / start with templates / simplify workflow with AI / collaborate with team". The last clause is ungrammatical ("with team").

**Live typo in production copy** `[observed]`: "Turn you creative ideas into reality with CapCut video editor online." (`/tools/online-video-editor`).

## T3 CTA inventory

The headline finding: **the free-trial CTA has at least seven surface forms, several differing only in casing.** `[observed]`

| CTA (verbatim) | Where |
|---|---|
| `Try online for free` | Homepage hero; footer card on `/tools`, `/tools/online-video-editor` |
| `Try online` | Global nav (all current-nav pages); homepage section CTAs ×3 |
| `Try it Online` | `/help/monthly-and-yearly-plans`, `/help/capcut-teams-price` |
| `Try Online for Free` | `/help/new-capcut-subscription-pricing`, `/help/how-much-does-capcut-pro-cost`, `/help/join-capcut-pro-for-exporting` |
| `Try for free` | `/creative-suite` smart-tool cards ×7; `/tools/online-video-editor` |
| `Try CapCut Online` | `/tools/desktop-video-editor` nav |
| `Sign up for free` | `/creative-suite` ×3; `/tools/online-video-editor` ×5; `/tools/ai-caption-generator` ×5 |

`Try it Online` and `Try Online for Free` appear on **sibling help articles built from the same template** — pure drift, not a register decision. `/creative-suite` uses `Sign in`, `Sign up for free` and `Try for free` simultaneously on one page.

**Tool-page hero CTAs are verb + object, consistently** `[observed]`: `Generate AI Video` · `Generate AI Image` · `Generate AI Voice` · `Remove Online` · `Try Video Converter`. `Remove Online` is the outlier — an adverb where every sibling has an object, producing a CTA that does not say what is removed.

**Other CTAs** `[observed]`: `Download` (nav, hero); `Download for free` (×10 on `/tools/desktop-video-editor`); `View all` (×7, once per help category and per template section); `Read now` (help cards); `More AI features`; `Learn more` ×3; `Upload image`; `Create with CapCut`; `Edit video online` / `Create images online` / `Work together` (`/creative-suite`); `contact our support team`.

**In-product CTAs quoted inside help copy** `[documented]`: `Export` · `Join` · `Start Free Trial` · `Try 7 Days Free` · `Subscribe` · `Upgrade` · `Pro` · `Join CapCut Pro`.

**Persistent microcopy** `[observed]`: `*No credit card required` with an asterisk on every help article and on `/tools/ai-caption-generator`, `/tools/online-video-converter`, `/tools/free-video-compressor` — but rendered **without** the asterisk on the homepage. The asterisk points to nothing on any page.

## T4 Onboarding & concept teaching

**The standard shape is a 3-step sequence: upload → act → export.** `[observed]` Eleven how-to sequences were captured across seven tool pages; nine are 3-step and two are 4-step.

| Page / platform | Steps |
|---|---|
| Online video editor | `Step 1: Upload video` · `Step 2: Edit or create a video` · `Step 3: Export & share` |
| AI caption generator | `Step 1: Upload the video` · `Step 2: Generate auto captions` · `Step 3: Export and share` |
| Text to speech (Desktop) | `Step 1: Upload video` · `Step 2: Convert text to speech` · `Step 3: Export & share` |
| Text to speech (Online) | `Step 1: Open CapCut and access the text-to-speech tool` · `Step 2: Enter your text and choose a voice style` · `Step 3: Generate and apply the voiceover` |
| Video background remover (PC & Online) | `Step 1: Upload video` · `Step 2: Remove the video background` · `Step 3: Export & share` |
| Video converter | `Step 1: Upload Video` · `Step 2: Edit the Video` · `Step 3: Export and Convert Video` |
| Video compressor | `Step 1: Upload video` · `Step 2: Compress video size` · `Step 3: Export and share` |
| AI video generator (Online) | `Step 1: Open CapCut Web and access the Seedance 2.5 AI video generator` · `Step 2: Enter your script into the Seedance 2.5 AI video generator and choose a style` · `Step 3: Generate your Seedance 2.5 AI video, edit, and export your video` |
| AI video generator (Desktop) | `Step 1: Launch the AI video editor` · `Step 2: Generate or write your script` · `Step 3: Build your video scene-by-scene` · `Step 4: Export your finished video` |
| AI image generator (Online) | `Step 1: Access & Sign In` · `Step 2: Create Your Image` · `Step 3: Refine & Export` |
| AI image generator (PC) | `Step 1: Launch & Access AI Image Generator` · `Step 2: Input Prompt & Configure Settings` · `Step 3: Generate & Refine Image` · `Step 4: Export Your AI Image` |

Three observations worth extracting.

**First, the step-3 label is never stable.** `Export & share` / `Export and share` / `Export and Convert Video` / `Export Your AI Image` / `Refine & Export`. Ampersand and "and" alternate within the same site, sometimes on adjacent pages.

**Second, casing is split by page vintage** — sentence case on the TTS and background-remover pages, Title Case on the converter and image-generator pages. Same component, two conventions.

**Third, and most damaging to comprehension: the AI video generator steps name the model three times in three steps.** "Open CapCut Web and access the **Seedance 2.5** AI video generator" → "Enter your script into the **Seedance 2.5** AI video generator" → "Generate your **Seedance 2.5** AI video". A step heading should carry the user's action; these carry the SEO keyword. Contrast the same product's TTS Online steps, which are clean action headings.

**Four different step-labelling conventions coexist across the site** `[observed]`: `Step N:` headings (tool pages), plain numbered lists (`/help/capcut-teams-price`), unnumbered bullets under platform sub-headings `On the Web:` / `On the PC:` / `On the Mobile App:` (`/help/how-much-does-capcut-pro-cost`), and inline prose sequencing ("First, … Second, … Then, … Finally, …" in the `/tools/online-video-editor` FAQ). `/help/capcut-teams-price` renders its ordered-list markers buggily as "11. 22. 33." and "31.".

### How CapCut teaches an editing operation to a non-professional

Three consistent moves, all `[observed]`:

1. **Name the on-screen control in quotation marks rather than the concept.** `Click the "Captions" option on the left panel and select "Auto captions." Choose the spoken language used in your video and hit "Generate."` The user is given a click path, not a model. This works for a single task and transfers to nothing — the user learns where a button is, not what captioning is.
2. **Chain verbs into one undifferentiated list.** "you can trim, crop, split, reverse, or mirror clips". Five operations with materially different mental models presented as interchangeable options.
3. **Attach a reassurance clause to every AI step.** "no manual typing needed" · "No learning curve" · "with near-perfect accuracy" · "100% trustworthy and free."

**The through-line is that difficulty is denied rather than scaffolded.** Compare Webflow (175 in this batch), which opens its hardest course by naming the obstacle: "If you're used to working with static design tools… building for the web can be a tough transition." CapCut never concedes that anything is hard. The consequence shows up in its own help centre, where the dominant article shape is `Why Can't I …?` — the questions a user asks when a product has told them there is no learning curve and they have hit one anyway.

The one place CapCut does teach rather than assert is the **video compressor page, where each of the three steps ends with a `Pro Tip:`** — a consistent slot for the caveat the step body could not carry. That is a reusable structure, and it is used on exactly one page.

## T5 Form & field labels

Almost everything here is `[documented]` — quoted inside marketing prose as a click path rather than rendered as a live control. Live page elements are marked `[observed]`.

**Live controls on tool pages** `[observed]`: `Upload image` (hero, AI video generator); `Auto` (a toggle beside the hero prompt box on both the AI video and AI image generators — an unlabelled mode control whose only text is the word `Auto`); the five hero CTAs listed in T3.

**Hero prompt chips are the real prompt-teaching device** `[observed]` — clickable exemplars rather than placeholder text:
- `🛸 UFO above farmland` · `🐉 dragon flying over cliffs` (online video editor)
- `🏃‍♂️ dynamic fitness app promo video` · `✈️ japan travel memory video` (AI video generator)
- `🎙️ Create a podcast of a two-person conversion` — **typo live: "conversion" for "conversation"** · `📖 Tell a funny anecdote or joke` (text to speech)
- `🎨Pop art woman with cat` · `🤧Pixar-style rooftop sneeze selfie chaos` (AI image generator)

Note the chips are inconsistent in grammar: three are noun phrases, two are imperative sentences. And the emoji spacing varies (`🎨Pop art` has no space, `🛸 UFO` does).

**In-product labels quoted in prose** `[documented]`: `Enter script` · `Generate script` · `Create one with AI` · `New project` / `Create` · `AI video maker` > `Instant AI video` · panel names `Scenes`, `Voiceover`, `Elements`, `Music` · `Add Text` > `AI writer` > `Text to speech` > `Generate speech` · `AI tools` > `Text to speech` · `Create project`, `Import`, `+` · `Video` > `Remove BG` > `Auto removal` · `Smart tools` > `Remove background` · `Chroma key` · `AI tools > AI design` · `AI media > AI image` · `Media` > `AI Image` · `Send` (submit, web) vs `Generate` (submit, mobile) · `Download`, `Export`, `Edit More` · `Media` > `Upload` · `Advanced Settings`.

**Settings named but values not enumerated** `[documented]`:
- Pre-generation, AI video: "the aspect ratio, voiceover, and duration"
- Aspect-ratio examples given only once: "1:1 for Instagram, 16:9 for YouTube"
- Video export, web: "the quality, frame rate, and format" plus "resolution"
- Video export, desktop: "resolution, frame rate, codec, and bitrate"
- Image export: "format, quality, and resolution (up to 8K)"
- TTS parameters: "speech rate, pitch, tone, and volume", plus "voice volume, fade in and fade out", and **`the speed slider` — the only slider named anywhere in the harvest**
- Voice selection facets: "gender, age, style, or language"
- Chroma key controls: "tolerance and edge softness"
- Caption customisation: "font style, size, color, and position"
- Teams purchase variables: `Billing frequency`, `Number of seats`, `Region`

**Pro-locked export controls, named verbatim** `[documented]`: `4K`, `60fps`, `No Watermark` — "appear grayed out or locked if you're not a Pro user".

**Output formats actually enumerated** `[observed]`: TTS audio `AAC, FLAC, MP3, and WAV`; video converter output `MP4 or MOV` only.

**Not seen, not invented:** no bitrate field label, no aspect-ratio preset list (`16:9`/`9:16` as strings never appear), no prompt-field placeholder, no language-selector label, no duration selector values, no credit or quota selector, no named toggle other than `Auto`.

## T6 Status & state language

**The richest finding in this category is a single named state with an explicitly scoped definition.** `[documented]`, from `/help/stuck-at-the-thinking-phase`:

> **`Thinking…`**

And, unusually, CapCut documents both its scope and its contrast:

- Scope: "The 'Thinking…' status appears only when using generative AI features in CapCut"
- Contrast rule, verbatim: "Unlike rendering or timeline playback—which show 'Processing' or progress bars—only AI-driven actions display 'Thinking…' on Desktop."

So CapCut runs a **two-state vocabulary keyed to determinism**: `Processing` plus a progress bar for work whose duration is computable, and `Thinking…` with no progress indicator for work whose duration is not. That is a genuinely good model — it uses the *absence* of a progress bar as a signal rather than faking one — and CapCut has written the article that names the distinction, which most products never do.

The features that trigger `Thinking…` are enumerated: "AI Script-to-Video, AI Image Generation, 'Magic Design,' or chat-based creation tools"; on desktop "AI Image Animation, Text to Video, and cloud-enhanced Smart Cutout".

The article also coins a failure noun in its own heading: `General Tips to Avoid 'Stuck Thinking'`. And it gives a duration expectation in prose: "Wait 30–60 seconds—occasional delays are normal during peak hours."

**Export-gating states** `[documented]`, `/help/join-capcut-pro-for-exporting` — three platform-specific modals for one condition:
- Online: "This video uses CapCut Pro content. Subscribe to export without restrictions."
- Desktop: "CapCut Pro is required to export this video. Join now to unlock full export capabilities."
- Mobile: "This video uses CapCut Pro features. Subscribe to export without a watermark."

Three strings, three different diagnoses of the same block — `Pro content` vs `Pro features` vs an unexplained requirement — and three different promised outcomes: "without restrictions" / "full export capabilities" / "without a watermark". Only the mobile string tells the user what actually changes. This is a clean example of platform teams writing the same modal independently.

**Other state-adjacent copy** `[observed]`: "Preview the voice for 5 seconds" · "wait a few seconds for CapCut to remove the background from the video automatically" · "Click 'Send' to generate four AI image results in seconds" (the only place an output count is stated).

**Negative findings, recorded explicitly:**
- **No completion copy.** No "your video is ready" or equivalent string appears anywhere in the harvest.
- **No percentage or numeric progress wording.** `progress bars` is named as an affordance; no progress string was seen.
- **No credit, token or balance language anywhere** — despite a help article stating "AI credits increased from 550 to 1200".
- **No uploading state, no queued state.**
- **No status page.** `status.capcut.com` does not exist; only third-party monitors do, which are deliberately excluded. **No CapCut-authored status vocabulary (`Operational`, `Degraded`, `Outage`) exists in public.** Compare Riverside and Webflow in this batch, both of which run Statuspage instances with published component taxonomies.

Help-article card metadata uses a uniform pattern: `<Mon D, YYYY> · <N> min`.

## T7 Error, failure & recovery

**Limits stated as guidance, not as enforced ceilings** `[documented]`, all from the Thinking-phase article:
- "Avoid uploading >10 images at once or sending >3 rapid AI requests in succession—this can trigger rate limits."
- "compress input images to under 10 MB for faster, more reliable AI processing"
- "Use JPEG instead of HEIC"
- "You've hit daily usage limits (common for free accounts)."
- "Rapid successive AI requests trigger rate-limiting."

Note the register: these are written as *user habits to avoid*, using mathematical operators (`>10`, `>3`) in consumer help copy. The product never states the actual limit; it states a behaviour that may cross it.

**Supported-format lists, and they contradict each other** `[observed]`:
- Background removal: "MP4, MOV, AVI, and WMV"
- Converter inputs: "MP4, 3GP, MPEG, MOV, AVI, WMV, FLV, and more" — and in the FAQ on the same page, "3GP, FLV, MP4, M4V, MKV, AVI, WMV, WEBM, and more"
- Compressor: "MOV, MP4, AVI, MKV, and more"; also "3GP, MPEG, WMV, and FLV"
- **Marketing claim on the converter page that contradicts its own enumerations: "It supports 1000+ formats including MP4, MOV, and WebM"**

**Error and failure titles are help-article headings — the user-facing symptom phrasing** `[observed]`:
`Why Did My Payment Fail?` · `How Should I Address Credit or Debit Card Errors?` · `Why Am I Stuck at the 'Thinking' Phase?` · `Why Am I Seeing Garbled Text When I Use AI Design?` · `Why Can't I Use Auto Cut?` · `Why Is My Video Not Showing in CapCut?` · `Why Are Templates Not Appearing in CapCut?` · `Why Does My CapCut Template Play in Slow Motion?` · `Why Can't I See Transitions in CapCut?` · `Why Can't I Find the Lip Sync Feature in CapCut?` · `Why Is the Text-to-Speech Feature Not Working in CapCut?` · `Why Are Effects Not Applying in CapCut?` · `How Can I Fix the Chroma Key Feature Not Working in CapCut?` · `Why Are Transitions Lagging in CapCut?`

`Why Am I Seeing Garbled Text When I Use AI Design?` is worth quoting for its definition, which is the best plain-language error description in the file: garbled text is 'random symbols like "#@!%", distorted characters, or unreadable glyphs'. Naming the symptom in three concrete registers — literal example, category, and a technical term the user might not know — is a reusable move for any article about visual corruption.

**Two quoted in-product strings** `[documented]`: `You don't meet the age requirement` (the article notes the user is *logged out* when it appears — a state change with no explanation attached to the message) and the account states `Age Restriction` / `Appeal Age Restriction`.

**The fullest recovery ladder in the corpus** `[documented]`, TTS page, for a missing voice option — six ordered steps: check available voices and refresh; update CapCut; clear the cache or app data and restart; sign out and back in; try another network; contact Support with a screenshot. Stated causes given *before* the ladder: maintenance, a gradual rollout, or an outdated version. Naming "a gradual rollout" as a cause is unusually candid — most products let staged releases present as bugs.

**A second, platform-split ladder** `[documented]` in the Thinking-phase article: Web (wait, refresh and rephrase the prompt, use a desktop browser, check connection, try incognito or log out/in); Desktop (check connection, update, restart, try later, check template compatibility, recreate the project); Mobile (close background apps, switch Wi-Fi, simplify the request, force-close, update, wait). "Rephrase the prompt" and "simplify the request" are the only generative-specific recovery actions in the batch.

Sign-off: "Thank you for your patience—and happy creating!"

**Recovery-title grammar is standardised into two shapes** `[observed]`: `What Should I Do If <failure condition>?` and `Why Can't I <verb>?`

### The watermark contradiction — the single biggest content-integrity defect

Marketing says `[observed]`:
- "all the necessary tools to make a video online without a watermark for both commercial use and personal needs" (`/tools/online-video-editor` FAQ 4)
- "unlimited conversions without watermarks" (converter)
- "CapCut Desktop allows complete background removal with no watermark on exported videos"
- "CapCut provides a professional, watermark-free experience" (compressor)
- Homepage tool blurbs: "No watermark required" / "Without Watermark"

The help centre says `[documented]`:
- `No Watermark` is a Pro-locked export control that "appear[s] grayed out or locked if you're not a Pro user"
- "Even if you choose 1080p, you may still be blocked from removing the watermark"
- "If you cancel, you can still export—but with a CapCut watermark, even at 1080p."
- Mobile free exports are blocked "longer than 15 minutes (free limit varies by region)"

And a third position, from a help article about templates: "In most cases, the watermark comes from a default ending clip or built-in template element—not from the export itself."

Three surfaces, three incompatible accounts of when a CapCut watermark appears. No in-product watermark warning or banner string was found anywhere.

## T8 Empty states `[absent]`

No authored empty-state copy was found on any page.

Three near-misses worth recording:
- An **unhandled** empty state: the help category `Creator Level & Incentives` renders as a heading with **no articles and no `View all` link**, while every other populated category carries one. This is a zero-state with no zero-state copy.
- A confirmed empty state that exists but whose string is unreachable: an alt text on the AI image generator page reads "CapCut Projects panel showing a Create button and an empty state with no projects listed". The copy is inside the screenshot.
- A documented no-results path: `What Should I Do If Template Search Doesn't Show Any Content?` confirms template search has a zero-results state on Mobile and Web. Desktop has no search at all.

## T9 Notifications & system messages

- Upgrade prompts: the three export-gating modals under T6 `[documented]`
- **Trial length is stated in exactly one place, and conditionally**: `Try 7 Days Free` "(if eligible)" on the mobile modal. `Start Free Trial` on the web modal names no duration. **No marketing page states a trial length at all.** `[documented]`
- "Free trials may be available for new Teams accounts." and "Auto-renewal is enabled by default" `[documented]`
- `*No credit card required` — persistent under-CTA microcopy, asterisk pointing nowhere `[observed]`
- Sticky footer card on `/tools` and `/tools/online-video-editor`: "CapCut / Edit smarter, create faster / Easy to use / Try online for free" `[observed]`
- **No banners, no trial-expiry copy, no in-app notification strings, and no status-page incident wording were observed anywhere.**

## T10 Disclosures, legal & compliance

### The operator is no longer ByteDance, at least in the US

The brief flagged CapCut's ByteDance ownership. The public legal documents as harvested say something different, and the discrepancy is itself the finding.

- Privacy Policy, verbatim: **"The Services are operated by TikTok USDS Joint Venture LLC (“we”, “us” or “our”)."**
- The ToS refers throughout to **"TikTok USDS Joint Venture"**
- Premium Services are provided by **"TT Commerce & Global Services LLC and its affiliates"**, described as receiving shared data "to facilitate a global and interoperable experience"
- Statutory hook, recurring verbatim: **"including Executive Order 14352 and any compliance obligations thereunder."**
- The **only surviving ByteDance reference found anywhere**: the support address `capcut.support@bytedance.com` in the `/tools/desktop-video-editor` FAQ

From a content-design standpoint, the interesting thing is that **the marketing surface is silent about the change entirely.** A user who knows CapCut as a ByteDance product will find no mention of the restructuring anywhere except in the operator clause of a policy document, and will still be emailing a bytedance.com address for desktop support.

**Region split.** The `?lang=en` privacy URL resolves to a document titled **"CapCut US Privacy Policy"**, explicitly scoped to "personal information of US users and other US individuals". **No EU/UK entity, establishment, or counterpart policy was located** — only a footer link labelled `Digital Services Act` pointing off-domain to an ibytedtos.com-hosted page. An EU variant likely exists at a region-specific URL; its existence is not asserted here either way.

### The licence you grant over your content — ToS §9

The section **leads with a reassurance and then grants a very broad licence**, which is the structural pattern worth recording:

> Lead-in, verbatim: **"We don't own your User Content."**

Then:

> "you grant TikTok USDS Joint Venture and our affiliates, agents, services providers, partners and other connected third parties an **unconditional, non-exclusive, royalty-free, fully transferable, sub-licensable, perpetual and worldwide license** to use your User Content."

Scope: "modify, adapt, reproduce, make derivative works of, display, publish, transmit, distribute and/or store your User Content" — "for the purposes of operating, developing and providing the Services, subject to your Platform settings."

Separate name-and-likeness grant: a "royalty-free fully transferable (including sub-licensable), worldwide license to use your **username, image and likeness**" to identify you as the source — **"including for use in sponsored content."**

Also: "All User Content will be considered non-confidential." And the ToS reserves the right to remove content "at our discretion for any reason or no reason."

`We don't own your User Content.` is technically accurate and functionally misleading as a section opener, because ownership is not the operative question — the licence scope is. This is the inverse of the Wise pattern of stating what you are *not* first: CapCut states what it does not take, then takes nearly everything else.

### Data collected — US Privacy Policy, "Last Updated: April 15, 2026"

Three parent buckets, each with named sub-headings `[observed]`:
- **"Information You Provide"** → `Account Information.` · `User Content.` · `Purchase Information.` · `Marketing and Research Information.` · `Communication Information.`
- **"Automatically Collected Information"** → `Technical Information.` · `Location Information.` · `Usage Information.` · `Content Characteristics and Features.` · `Cookies.`
- **"Information From Other Sources"** → `Third-Party Platforms.` · `Our Corporate Group.` · `Advertising, Analytics, and Other Partners.` · `Payment Service Providers.` · `Others.`

`User Content.` is summarised as covering created, imported, uploaded and generated content plus metadata, **AI prompts and AI outputs**, and clipboard access.

**Biometric and voice** `[observed]`. The collection clause is blunt — "the existence and location of a face and other body parts" — and is immediately followed by two mitigations: "We do not use any face or body information to identify you in your User Content." and "Once an effect that uses face or body information has been applied to your User Content, that information is deleted and not retained." Audio: "the nature of the audio; and the text of the words spoken in your User Content" — "(for example, if you use the auto caption function)". **No voiceprint heading and no voice-cloning clause was found**, despite `Custom voices` and `AI voice changer` being shipped features.

**AI training** `[observed]`. The purpose list contains "train, test, and improve technology, such as machine learning models and algorithms"; "scanning, analyzing, and reviewing User Content"; "prompts, files, and other types of information that you submit to our AI-powered interfaces"; "as well as the final AI-generated responses we make available to you". **The policy never joins these in a single sentence** — the collection of User Content and the training purpose sit in separate sections, and the reader must combine them. Contrast Adobe (171), whose Firefly FAQ asks and answers `Does Adobe train Adobe Firefly on my personal content?` in one place.

### Billing, renewal, cancellation, refund — ToS §6

Section titled `Service Plans, Renewal, Cancellation and Refund`, with groupings `Free Services` / `Premium Services` / `Service Plans`. Plan tiers named in the ToS: **"CapCut Standard (where applicable), CapCut Pro, Pippit Starter"**.

- Auto-renewal: "your subscription will automatically renew for an additional period equal in duration to your preceding subscription term"; cancel "before the end of the then-current subscription period"; after cancellation "you will be downgraded to the Free Services automatically"
- Price changes: "will not take effect immediately at the time of renewal of your subscription, unless you explicitly agree otherwise"
- **Refund window: "a full refund within 14 calendar days following the start of your subscription"** — conditional on "you do not have any usage of the Premium Services in any form whatsoever"
- Help centre adds the operative deadline: "If you forget to cancel your subscription at least 24 hours before the renewal date, your account will be charged"
- Cloud Space (§7): storage "will be suspended automatically" after expiry, with the instruction "You should always back up your content."
- Liability cap (MLA §10): "THE HIGHER OF (A) THE AMOUNT YOU HAVE PAID TO US WITHIN TWELVE (12) MONTHS … OR (B) FIFTY US DOLLARS (USD $50)"
- Dispute resolution (MLA §12): 60-day informal process, California law, LA venue, one-year limitation — **no arbitration clause and no class-action waiver on that page**

The 14-day refund conditioned on *zero usage of any kind* is effectively a no-refund policy for a product whose first action is editing. Worth recording as a case where a stated consumer protection is nullified by its condition.

### Commercial use, materials and the badge labels — Materials License Agreement

Section heading verbatim: **"Platform Materials may be used for commercial or non-commercial purposes"**. Two defined classes: **`Non-commercial Use Materials`** and **`Dual Use Materials`**.

The in-product surfacing is the key UX string: **"Dual Use Materials will be made available with specific marks (e.g., “commercial use”, “commercial” marks) on the Platform."** So the asset badges read `commercial use` / `commercial`.

**The best plain-language move in CapCut's entire legal corpus** is the inline glossing of licence terms:
- "non-exclusive (which means CapCut can grant other users the right to use such Platform Material)"
- "non-transferable (which means you cannot give the right to someone else)"
- "non-sublicensable (which means you cannot sublicense the right to others)"

Legal term, then a parenthetical in the second person saying what it costs you. Directly reusable.

Two heavy rules stated as headings: **"The license of Platform Materials is granted on a per-exported content basis"** — re-editing an exported video means paying for the paid material again — and a contamination rule: if any Non-commercial Use Material is included, "you can only use such content for the personal and non-commercial use, but not for any commercial use or purpose". A single free sticker taints a commercial export, and that consequence is stated only in the MLA.

Music splits into `Sounds` vs `Commercial Sounds`, with a platform restriction: "Commercial Users may show or share their video that includes a Commercial Sound within CapCut, TikTok and TikTok for Business ("Permitted Plaforms")" — typo "Plaforms" in the source.

**The MLA contains no watermark rules at all.** The words "watermark" and "CapCut logo" do not appear in it. Scope: "applies to United States users". Age floor: "individuals 13 years old and over."

### AI disclosure — the commitment is real but hedged, and the mechanism is post-hoc

Trust Center section headings `[observed]`: `Using AI responsibly` (H1) · `Transparent AI by Design` · `Prioritizing Safety in Every AI Experience` · `Building AI with Privacy in Mind` · `End-to-End Intelligent Solutions` · `Keeping Our Community Safe`. Phrases: "proactive transparency", "safe, transparent, and trustworthy for everyone", "privacy-by-design".

The labelling commitment, verbatim:

> "We inform users when they use AI-powered features and work to provide labels or watermarks to ensure users are informed when content is generated or assisted by AI."

Two things to flag. **"work to provide" is aspirational, not a guarantee** — materially weaker than "we label AI-generated content". And the sentence is about informing *the user of the tool*; the labels/watermarks clause is the only part that reaches a downstream viewer. There is no statement that a label is applied by default, no description of what it looks like, and no in-product disclosure string was found on any page.

The one concrete mechanism is **post-hoc and external**, placing the burden on the person encountering the content rather than the person generating it:

> "Images and videos generated or edited with CapCut AI can be identified on this website" — linking to a separate detection site.

**And the Community Guidelines contain no AI, synthetic-media, deepfake, or AI-labelling section at all.** Synthetic media is handled only obliquely by folding "digitally created or manipulated" into pre-existing bans — "digitally created or manipulated content, of nudity or sexual activity" and "including animation or digitally created or manipulated media". So the document that governs what users may post says nothing about disclosing AI generation, while the Trust Center promotes a whole pillar about it.

Third-Party AI Services (ToS §9) names integrated providers verbatim: **"(e.g., Runway, Stable Diffusion, Google, YouTube, FLUX, Luma)"**, with three user duties headed `Licenses and Permissions:` · `Respect for Rights:` · `Prohibited Conduct:`, and a disclaimer that CapCut makes no promises "regarding the legality or appropriateness of any content inputted or generated by you based on your inputs."

**Three date stamps, three formats, wildly different currency** `[observed]`: Community Guidelines "Last updated, May 2024"; MLA "Last Updated: January 22, 2026"; Privacy Policy "Last Updated: April 15, 2026". The guidelines governing user conduct are roughly two years staler than the policies governing CapCut's rights.

### Pricing — there is none

**No publicly viewable pricing page exists.** `/pricing` and `/en-us/pricing` both return empty 200s. No plan table, no billing toggle, no feature-comparison rows, no per-seat label exists on the public site.

Plan names seen, all from help-article prose rather than a table `[documented]`: `CapCut Pro` · `Monthly Plan` · `Yearly Plan` · `Upgraded CapCut Pro Plan` · `Newly Introduced Standard Plan` (body says "A new Standard plan") · `CapCut Teams` · `SVIP Membership` · `Diamond-Icon Items` (an entitlement tier). ToS adds `CapCut Standard (where applicable)`, `Pippit Starter`.

**The only numeric price string on any public page** is hedged prose, not a table: "typical starting prices range from $15–$30 per seat per month when billed annually", prefaced "As of 2026, typical… exact figures depend on your location".

Quantified entitlements seen: "100GB of cloud storage"; "Cloud storage expanded from 100GB to 1TB"; "AI credits increased from 550 to 1200"; Teams "annual plans typically offer ~20% savings" with seat examples "3, 5, 10, or custom team sizes".

**CapCut's own help centre states that no canonical price exists.** Four separate articles exist to explain price inconsistency: `Why is the Price Lower on My Other Account?` · `Why In-App Price Inconsistency with Payment Price?` · `Why Is the Price Different on My Account Compared to Others?` · `Why Do CapCut Pro's Prices Vary?` · `Why Do Your Prices Always Change?`. The stated causes are region, platform, applicable taxes, promotions, and "limited-time promotional campaigns that are currently being tested and optimized for selected users."

That is a content-design signal in its own right. A product that price-tests per user cannot publish a price, so it publishes five articles explaining why the price it cannot publish is different for everyone.

## T11 Help-centre architecture `[observed]`

`https://www.capcut.com/help` — H1 `CapCut Help & Support`; intro "Find FAQs, video tutorials, and troubleshooting articles. Learn how to make the most of every CapCut feature with ease." Breadcrumb `Home` / `Help Center`. **No search input exists in the served markup** — a help centre for a 100M-download consumer product with no search field.

**Flat, one-level tree, ten headings, no subcategories:**
`Help Center` · `Account Setting` · `User Interface and Settings` · `Templates & Trends` · `AI Features` · `Editing & Exporting` · `Download & Install` · `Payment & Billing` · `Creator Level & Incentives` (renders empty) · `CapCut Pro Plans` (has articles but no `View all` link, so its category page is unreachable).

A flat tree with no search puts the entire findability burden on the ten category labels and the ~6 recent articles surfaced per category. Categories paginate up to 7 pages deep (Editing & Exporting), so the real inventory is roughly 150+ articles — and **the pagination links are malformed on the live site**, rendering as `https://www.capcut.com/?pageNo=2` with the category path dropped. Most of the help centre is unreachable by navigation.

**Article-title grammar — 48 of 49 observed titles are questions, in Title Case, in the user's first person:**

| Shape | Count | Examples |
|---|---|---|
| `Why …?` | ~18 | Two sub-shapes: `Why Can't I <verb>?` (blocked action) and `Why Is/Does <object> <symptom>?` (unexpected behaviour) |
| `How Do I …?` / `How Can I …?` / `How to …?` | ~14 | **Three interchangeable stems for one job**, and `How to …` titles inconsistently keep or drop the question mark |
| `What Is / What Are / What Should I Do If …?` | ~9 | |
| `Can I …?` (entitlement), `Is X Safe …?` (trust), `Will …?` (roadmap), `Where Can I Find …?`, `Which … Are Trending …?` | remainder | The last is SEO/discovery, unique to Templates & Trends |

The product name is appended for SEO throughout ("… in CapCut", "… on PC", "(CapCut PC)"), which makes titles longer without making them more findable inside a help centre that has no search.

Representative titles: `How Can I Log In to CapCut?` · `Is CapCut Safe to Use?` · `Is CapCut AI Safe to Use?` · `Is CapCut Appropriate for Kids?` · `Why Can't I Use Auto Cut?` · `How Can I Remove the Watermark When Exporting a CapCut Template Video?` · `What Happens If I Forget to Cancel My Subscription?` · `Can I Access Diamond-Icon Items with the Standard Plan?` · `How to Find My UID / DID in CapCut?` · `What Is the Age Restriction in My Country or Region?`

**Source-grammar defect** `[observed]`: `What The Videos I Can See on Other CapCut Users' Profile?` — ungrammatical, live.

Three trust questions sit at the top of two different categories: `Is CapCut Safe to Use?`, `Is CapCut AI Safe to Use?`, `Is CapCut Appropriate for Kids?`. A help centre whose most-promoted articles are all "is this safe" is telling you what its inbound queries look like.

## T12 FAQs

CapCut runs an FAQ block on nearly every tool page and uses it as an SEO surface. Questions verbatim, answers in one clause.

**`/tools/online-video-editor` (12):** What is the best free online video editor? (CapCut) · How can I edit a video like a Pro? (no pro software needed) · Which video editor is best for beginners? (no learning curve) · Is there any free online video editor without a watermark? (**claims yes — contradicts the help centre**) · What is the best online video editor free with effects and music? · What is the best AI video editor online? · Does the MP4 video editor online offer AI features to speed up my workflow? · What export settings are available in the online video editor? (Advanced Settings → resolution, quality, frame rate, format) · How do I collaborate on an online video project? · How can I make an online video edit feel more cinematic? · Can I start an online video project with stock footage? · Can I edit a video online without installing software?

**`/tools/ai-caption-generator` (8):** Can I customize the style of AI captions on CapCut Web? · How can I upload my own SRT caption file on CapCut Web? · Does CapCut Web's AI caption generator support multiple languages? (**answer contains a duplicated sentence fragment — copy defect**) · Can I use AI captions for commercial projects? · Is the AI caption feature free to use in CapCut Web? · Can an AI caption generator handle fast, casual, or overlapping speech? · How can I caption an interview or podcast for people watching without sound? · Can I add automatic captions to tutorials, courses, or presentations?

**`/tools/ai-video-generator` (11)** — notable entries: `What settings can I choose before generating an AI video?` (aspect ratio, voiceover, duration) · `What visual styles can I use for an AI-generated video?` (realistic film, cartoon 3D, cinematic) · `Should I use CapCut Web or Desktop for a Seedance 2.5 video?` (Web for script-led, Desktop for scene-by-scene). Also a live grammatical defect in a question: `What is an Seedance 2.5 AI video Maker from the text?`

**`/tools/text-to-speech` (12)** — the most substantive set. `Is the voice realistic or robotic?` (claims natural) · `What can I customize after generating speech from text?` · `What formats can I download the audio in?` (AAC, FLAC, MP3, WAV) · `Can I generate several voice versions from the same text?` · `How many AI voices can I choose from in CapCut text to speech?` (200+) · `What can I do when a text-to-speech voice option is missing in CapCut?` (the six-step recovery ladder). That last one is a **failure question inside a marketing FAQ**, which is rare and good.

**`/tools/video-background-remover` (13)** — includes the only chroma-key teaching in the corpus: `When should I use chroma key instead of automatic video background removal?` (chroma key for consistent colour screens). A marketing FAQ that tells you when *not* to use the AI feature.

**`/tools/free-video-compressor` (12)** — includes the most honest answer in the file: `Can a video compressor reduce a file to a specific number of megabytes?` — **no exact-MB promise; export and check.** A generative-adjacent product declining to promise a deterministic outcome.

**`/tools/ai-image-generator` (11)** — includes `Are images created by the CapCut AI image generator copyrighted?` answered "typically not copyrighted in the traditional sense" with a direction to review licensing terms. And a **live production encoding bug**: the question `How do I animate an image created with CapCut['s] AI image generator?` renders with mojibake ("CapCut閳ユ獨") where an apostrophe-s should be, appearing twice.

**`/trust/trustworthy-ai` (4):** `Does CapCut use generative Al?` — **"Al" with a lowercase L, not "AI", live on the page** · `How does generative AI work?` · `How does CapCut prioritize safety and privacy?` · `How do I identify content made with CapCut AI?`

**`/creative-suite` and `/template` have no FAQ section.** Help-article H1s are themselves FAQ questions, so the help centre and the tool FAQs are the same genre in two places with no cross-linking.

## T13 Terminology & glossary — the editing-label system

This is the priority section for CapCut, and the finding is that **there is no governed label system at all.** CapCut has more named operations than any other product in this batch and less consistency in naming them.

### Core editing operations, exact capitalisation as written `[observed]`

Lowercase verbs in prose: `trim` · `crop` · `split` · `reverse` · `mirror` · `resize`
Title Case in feature cards: `Cut, Trim, Add Transitions & Subtitles` · `Crop, trim, and resize` · `Edit with multiple tracks` · `Keyframes and graphs` · `Color wheel and auto adjust` · `Color correction` · `Massive effects` · `Powerful searching tools` · `Speed panel` · `Pitch Changer` · `Multi-sized canvas` · `Color theme` · `Speed ramp`

### Tool names — capitalisation is inconsistent *within a single menu* `[observed]`

| Features menu group | Members |
|---|---|
| AI creation | `AI Design` · `Video Studio` · `AI video generator` · `AI image generator` · `AI image enhancer` · `Dreamina Seedance 2.5` · `Nano Banana Pro` · `Gemini Omni` |
| Text & Audio (sentence case) | `Auto captions` · `Caption templates` · `Speech recognition` · `Text to speech` · `Custom voices` · `Enhance voice` · `Reduce noise` |
| Image (Title Case) | `Remove image BG` · `Image merge` · `Image Enhancer` · `Resize Image` · `Online Photo Editor` · `Meme Generator` · `AI Text Remover` · `AI People Remover` · `AI Inpainting` · `Face Cutout` |
| Video (mixed within the group) | `Remove video BG` · `Enhance quality` · `Video Editor` · `Trim Video` · `Add Subtitles To Video` (capitalises the preposition) · `Video Converter` |
| Ungrouped | `Seedream 5.0` |

One group is sentence case, the next is Title Case, the next is mixed, and one item capitalises a preposition. This is a single dropdown.

**Legacy menu adds** `[observed]`: `Video background remover` · `Video stabilization` · `Slow motion video editor` · `Transcript-based editing` · `AI voice generator` · `AI voice changer` · `Text editor` · `Add text to video` · `Video effects & filters` · `Sound effects` · `Video transitions` · `Custom stickers` · `AI dubbing` · `Long video to short videos` · `AI video upscaler` · `AI relight` · `AI avatar generator` · `AI sticker generator`.

**Elsewhere** `[observed]`: `Green screen editor` · `AI Movement Tracking` · `AI-Powered Filler Word Remover` · `Free AI Lip Sync Generator` · `AI Color Matcher` · `Create Viral Clips from Long Video` · `Image upscaler` · `Old photo restoration` · `AI portrait generator` · `Photo colorizer` · `Image style transfer` · `Low-light image enhancer` · `AI Tattoo Generator` · `AI Logo Generator` · `AI Art Generator` · `AI dialogue scene` · `AI Character Generators` · `Transparent Background` · `Compress Video` · `Transcribe Video To Text` · `Auto Cut` · `Braces Filter` · `AI Hairstyle Changer` · `AI Landscape Design` · `AI anime generator` · `AI Cartoon Character Generator` · `AI Image Combiner` · `AI Image-to-image Generator` · `AI image outpainting` · `Image prompt writer`.

**Umbrella and coined labels** `[observed]`: `Smart tools` ("Smart tools, work magic") · `AI magic tools` (legacy menu) · `magic-tools/` (URL namespace) · `Magic tool` (FAQ prose) · `Magic Design` (in-product) · `Smart Editor & Generator` · `AI Editing Tools` · `AIGC` · `Script to video` · `AI writer` · `Creative cloud` · `Smart Cutout` · `Teamspace`.

**Coined model and brand names** `[observed]`: `Dreamina AI` · `Dreamina Seedance 2.5` / `2.0` / `2.0 mini` · `Seedance 1.0 AI Video Generator` · `Seedance 1.5 Pro` · `Seedream 5.0` / `4.0` · `Seedamusic 1.0` · `Nano Banana Pro` · `Gemini Omni` · `GPT Image 2` · `Happy Horse` · `Pippit AI` · `Hypic` · `CapCut × Codex`.

**These model names are surfaced as first-class user-facing vocabulary** — three separate nav entries (`Video Studio`, `AI video generator`, `Dreamina Seedance 2.5`) all point at the identical URL `/tools/ai-video-generator`. Three names, one destination, one of them a model version number.

### The consumer word chosen over the professional term

This is the part of CapCut's system that genuinely works, and it is worth extracting as a translation table:

| CapCut says | Professional term rejected |
|---|---|
| `Remove background` / `Remove video BG` / `Cutout` (alt text) | rotoscope, matte, key |
| `Green screen editor` | chroma key — **except** the video-background-remover page, which is the only place `Chroma key` appears, and it appears as an *advanced alternative* the user might choose |
| `Enhance quality` / `Image Enhancer` / `Image upscaler` | super-resolution |
| `Reduce noise` / `Remove Background Noise` | denoise, NR |
| `Color wheel and auto adjust` / `Color correction` / `AI Color Matcher` | grade, LUT, match grade |
| `Slow motion video editor` + a `Speed` panel showing "0.5x" | speed curve (the term is not used anywhere) |
| `AI-Powered Filler Word Remover` | disfluency removal |
| `Auto Cut` | rough cut, assembly |
| `Keyframes and graphs` | **the one place a professional term survives intact** |
| `Transcript-based editing` (legacy menu only) | the most professional label in the set, and it is on the deprecated nav |

The strategy is coherent: name the *outcome* (`Remove background`, `Enhance quality`) rather than the *technique* (`rotoscope`, `super-resolution`). It fails only where CapCut needs the user to choose between two techniques — which is exactly why `Chroma key` had to surface on the background-remover page, and why that page carries the only "when should I use X instead of Y" FAQ in the corpus.

### The same feature under different names across surfaces `[observed]`

- Captions: `Auto captions` (nav) vs `Auto Subtitles` (online video editor) vs `Add Subtitles To Video` vs `AI Caption Generator` vs `Auto Caption Generator` — **five**
- Repurposing: `Long video to short videos` vs `Long video to shorts` vs `Create Viral Clips from Long Video`
- The web product: `CapCut Online` vs `Online creative suite` vs `CapCut Web version` vs `CapCut Web`
- The mobile product: `CapCut Mobile` vs `CapCut App` vs `CapCut APP`
- `Record` (template chip) vs `Recap templates` (nav) for the same URL
- `Social` vs `Social media templates`
- A section labelled "Online graphic design" sits under a tab labelled "Online image editor"

Compare Wise's deliberate register split (`Wise Multi-Currency Card` in marketing, `Wise card` in help — short forms where the user is already inside the task). CapCut's variation has no such logic: `Auto captions` and `AI Caption Generator` are not a register gradient, they are two teams naming one feature.

## T14 Voice, tone & accessibility

**Person.** Consistent second person to the user, first-person plural for CapCut. Legal documents switch to the defined entity, producing extremely long repeated chains ("TikTok USDS Joint Venture and our affiliates, agents, services providers, partners and other connected third parties…") that dominate the ToS and make the licence clause hard to parse at exactly the point where parsing matters.

**Register.** Enthusiastic consumer marketing, heavy on absolutes and reassurance: "No learning curve. 100% trustworthy and free." · "Never starting from a blank screen again." · "without spending a dime" · "just at your fingertips" · "near-perfect accuracy" · "Lightweight but powerful." · "work magic".

**Exclamation marks appear in marketing and FAQ copy and never in legal or help-centre copy** `[observed]`: "Start your free trial right now!" · "Absolutely not!" · "Use CapCut Web's AI caption generator to enhance viewer engagement today!" · testimonial "The auto editing feature is like magic!". The one exception is the help sign-off "Thank you for your patience—and happy creating!", which is the only exclamation in the support register and lands on the article about a stuck generation.

**Imperative habits.** Headers are overwhelmingly verb-first and aspirational — `Explore`, `Unleash`, `Inspire`, `Restyle`, `Streamline`, `Make`, `Turn`, `Discover`, `Bring your footage to life`. Step bodies are imperative and control-literal — `Click the "Captions" option`, `hit the "Generate"`, `Drag and drop your media files to the editing timeline`.

**Accessibility — the surprising finding is that the alt text is unusually good.** `[observed]` It is clearly hand-written and describes layout and function rather than repeating the heading:
- "Man in sunglasses above an audio waveform converting into text for CapCut speech-to-text"
- "Woman isolated from a checkerboard background with the Cutout control for background removal"
- "CapCut online editor upload menu with Local, Dropbox, and Google Drive options above project media"
- "A skiing clip sits in a video editor while the Speed panel displays a 0.5x setting and timeline frames"
- "CapCut Projects panel showing a Create button and an empty state with no projects listed"

These alt strings **leak real in-product UI vocabulary that does not appear in any visible copy** — `Cutout`, `Local`, `Speed`, `HD and UHD`, and the existence of a Projects empty state. For a harvest constrained to unauthenticated surfaces, the alt text is the most accurate window into the product's actual label set. That is a reusable research technique and, separately, an accidental disclosure.

**Accessibility is framed as an audience-reach benefit, never as a right** `[observed]`: "Boost accessibility" · "Make your content accessible" · "which makes your videos more impactful and viewer-friendly" · "viewers who are deaf or hard of hearing to ensure inclusivity". Captions are sold as reach; the deaf viewer appears as a market segment.

**No accessibility statement, no VPAT, no skip link, and no conformance claim was found anywhere.** The Trust Center has four pillars — legal, privacy, safety, AI — and accessibility is not one of them. This is the weakest accessibility posture in the batch, and it belongs to the product whose flagship feature is captions.

**Negative findings, recorded honestly**
- Homepage H1 renders without a space: `AI-Powered Photo & Video Editorfor Everyone`
- Live typo `Turn you creative ideas into reality`
- Live typo in a prompt chip: `two-person conversion`
- Live mojibake in an FAQ question on `/tools/ai-image-generator`, twice
- `Does CapCut use generative Al?` — lowercase L in "AI" on the Trust Center
- `Capcut World Singapore` — mis-cased brand in the Newsroom
- Ungrammatical live help title: `What The Videos I Can See on Other CapCut Users' Profile?`
- Ungrammatical live FAQ: `What is an Seedance 2.5 AI video Maker from the text?`
- Duplicated sentence fragment inside a caption-generator FAQ answer
- Ordered-list markers render as "11. 22. 33." and "31." on `/help/capcut-teams-price`
- Discord footer href concatenation bug on every `/tools` and `/help` page
- Help pagination links drop the category path, rendering as `capcut.com/?pageNo=2`
- Bad `/help/` slugs return an empty 200, not a 404
- Typo `Permitted Plaforms` inside the Materials License Agreement
- `*No credit card required` — asterisk with no corresponding note, on multiple pages

---

## Transferable patterns

1. **Use the absence of a progress bar as a deliberate signal, and name the state accordingly.** `Thinking…` for non-deterministic generative work, `Processing` plus a progress bar for computable work — with a help article that states the contrast explicitly. Most products fake a progress bar for generative work and lose the user's trust when it stalls. Condition: this only works if you publish the rule, as CapCut does. An unexplained bar-less state reads as a hang.
2. **Gloss a legal term inline, in the second person, with what it costs the reader.** "non-transferable (which means you cannot give the right to someone else)". Three of these in one clause turn an unreadable licence sentence into a readable one, at no legal cost.
3. **Name the outcome, not the technique — but surface the technique where the user must choose.** `Remove background` everywhere, `Chroma key` only on the page where picking the right method matters. The translation table in T13 is directly portable to any pro-tool-for-consumers product.
4. **Put a failure question inside the marketing FAQ.** `What can I do when a text-to-speech voice option is missing in CapCut?` sits among eleven sales questions and gives a six-step ladder plus honest causes including "a gradual rollout". Naming staged releases as a cause of a missing feature is candid and pre-empts a bug report.
5. **Decline to promise a deterministic outcome you cannot deliver.** "Can a video compressor reduce a file to a specific number of megabytes?" — answered no, export and check. A rare instance of a marketing FAQ lowering an expectation.
6. **Anti-pattern: do not let the export-gate modal be written per platform.** Three strings for one condition, offering three different outcomes ("without restrictions" / "full export capabilities" / "without a watermark"), only one of which is specific. Where a paywall blocks the same action on three surfaces, write one string.
7. **Anti-pattern: a claim in marketing that the help centre contradicts is worse than no claim.** "without a watermark" in a tool-page FAQ against "you can still export—but with a CapCut watermark, even at 1080p" in help. This is the failure that converts a support query into a refund request.
8. **A help centre with no search needs a shallow tree and working pagination.** CapCut has a flat ten-item tree, no search field, seven pages of articles per category, and broken pagination links. Any one of those is survivable; together they make ~150 articles unreachable.

## Caveats & gaps

- **No public pricing page exists.** `/pricing` and `/en-us/pricing` return empty 200s. All plan names come from help-article prose. The single price range in this file is hedged prose, not a published figure, and CapCut's own help says prices are A/B tested per user — so no price in this file should be treated as canonical.
- **No CapCut-operated status page exists.** `status.capcut.com` does not resolve. Third-party monitors were found and deliberately excluded, so **no CapCut-authored status vocabulary is recorded**. T6's status-page subsection is genuinely absent, not blocked.
- **Only page 1 of each help category was reachable.** Categories run to 7 pages and the pagination links are malformed on the live site (they drop the category path). The ~49 article titles captured are a sample of roughly 150+.
- **`/help/capcut-pro-plans` has no category page.** Unlike every other category it carries no `View all` link, so its full article list is unreachable by URL. Six titles from the index are all that is exposed.
- **`/template` was truncated mid-page** inside the "Holiday" section. Later section headers and any page FAQ were not seen.
- **Trust Center sub-pages `/trust/legal` and `/trust/privacy` were not fetched**, nor `/trust/safety/moderation` or the AI-detection site referenced from `/trust/trustworthy-ai`. The moderation page is the most likely home of any further AI-labelling commitment.
- **No EU/UK privacy policy was located.** The `?lang=en` URL resolves to the US-only document. Existence is not confirmed either way, so all entity, licence and refund findings in T10 are **US-scoped only**.
- **The in-product layer is reconstructed from prose.** Almost every "UI string" in T5 is quoted inside a how-to sentence, not rendered as a live control. Real form labels, live error toasts, validation messages and empty states are behind auth. Marked `[documented]` throughout.
- **CapCut times out frequently.** Nearly every page aborted or timed out 1–4 times before succeeding (the help index needed 4 attempts, the privacy policy 5). Anyone repeating this should budget for retries rather than treating a first failure as a block.
- **Mobile app copy not harvested.** CapCut is mobile-first; the app string set is the majority of the real product and is outside the public web surface.

## Sources

1. https://www.capcut.com/
2. https://www.capcut.com/tools
3. https://www.capcut.com/tools/online-video-editor
4. https://www.capcut.com/tools/ai-caption-generator
5. https://www.capcut.com/tools/desktop-video-editor
6. https://www.capcut.com/tools/ai-video-generator
7. https://www.capcut.com/tools/text-to-speech
8. https://www.capcut.com/tools/video-background-remover
9. https://www.capcut.com/tools/online-video-converter
10. https://www.capcut.com/tools/free-video-compressor
11. https://www.capcut.com/tools/ai-image-generator
12. https://www.capcut.com/creative-suite
13. https://www.capcut.com/template
14. https://www.capcut.com/help
15. https://www.capcut.com/help/editing-and-exporting
16. https://www.capcut.com/help/ai-features
17. https://www.capcut.com/help/payment-billing
18. https://www.capcut.com/help/account-settings
19. https://www.capcut.com/help/stuck-at-the-thinking-phase
20. https://www.capcut.com/help/join-capcut-pro-for-exporting
21. https://www.capcut.com/help/monthly-and-yearly-plans
22. https://www.capcut.com/help/new-capcut-subscription-pricing
23. https://www.capcut.com/help/how-much-does-capcut-pro-cost
24. https://www.capcut.com/help/capcut-teams-price
25. https://www.capcut.com/trust
26. https://www.capcut.com/trust/trustworthy-ai
27. https://www.capcut.com/trust/safety
28. https://www.capcut.com/clause/terms-of-service
29. https://www.capcut.com/clause/privacy-policy
30. https://www.capcut.com/clause/community-guideline
31. https://www.capcut.com/clause/material-license-agreement
32. https://www.capcut.com/pricing (blocked — empty 200)
33. https://status.capcut.com/ (blocked — does not exist)
