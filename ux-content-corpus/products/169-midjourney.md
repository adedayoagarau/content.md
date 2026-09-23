# 169. Midjourney

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Generative image (prompt-driven), now also generative video; Discord-native with a web client |
| Primary URL | https://www.midjourney.com/ |
| Corpus rank | 169 |
| Benchmark strength (source list) | Generation and parameter language |
| Locale / market observed | en-US |
| Platform observed | Web (marketing + app shell), Zendesk documentation site (`docs.midjourney.com`) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | No sector regulator. Two compliance artefacts published: `AB2013 Documentation` (California generative-AI training-data transparency law) and `Public Summary of Training Content`. Content provenance via an image ID tag and a public verifier. |
| Harvest date | 2026-09-21 |
| Pages inspected | 17 |
| Harvest completeness | Full for the flagged strength — the complete public parameter list, six individual parameter articles, the prompting guide, and the GPU-time billing model were all captured. Partial elsewhere: there is **no pricing page on midjourney.com** (pricing lives only in the docs), no marketing site to speak of, and no FAQ blocks outside the docs. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://www.midjourney.com/ | Company/manifesto page, not a product page |
| Docs home | https://docs.midjourney.com/hc/en-us | JS-rendered; only the heading was retrievable |
| Documentation (category) | https://docs.midjourney.com/hc/en-us/categories/32013335627533-Documentation | Six sections, article titles + teaser lines |
| **Parameter List** | https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List | **The flagship artefact — 30 parameters in a 3-column grid** |
| Prompt Basics | https://docs.midjourney.com/hc/en-us/articles/32023408776205-Prompt-Basics | Prompt-writing guidance, the six-dimension checklist |
| Aspect Ratio | https://docs.midjourney.com/hc/en-us/articles/31894244298125-Aspect-Ratio | `--ar` |
| Stylize | https://docs.midjourney.com/hc/en-us/articles/32196176868109-Stylize | `--stylize` |
| Chaos / Variety | https://docs.midjourney.com/hc/en-us/articles/32099348346765-Chaos-Variety | `--chaos`; the web/Discord naming split |
| Weird | https://docs.midjourney.com/hc/en-us/articles/32390120435085-Weird | `--weird` |
| No | https://docs.midjourney.com/hc/en-us/articles/32173351982093-No | `--no`; the moderation-tokenisation warning |
| GPU Speed (Fast, Relax, Turbo) | https://docs.midjourney.com/hc/en-us/articles/32016412137741-GPU-Speed-Fast-Relax-Turbo | **The billable-unit explainer + per-operation cost table** |
| Plan Information (section) | https://docs.midjourney.com/hc/en-us/sections/28005319720845-Plan-Information | 11 billing article titles |
| Comparing Midjourney Plans | https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans | Plan names, prices, entitlement matrix, revenue-threshold clause |
| Subscription Fast Time Expiration | https://docs.midjourney.com/hc/en-us/articles/27870521824653-Subscription-Fast-Time-Expiration | Expiry rule, two sentences |
| Community Guidelines | https://docs.midjourney.com/hc/en-us/articles/32013696484109-Community-Guidelines | Four rules + six rule blocks + Editor overlay |
| Midjourney Policies (section) | https://docs.midjourney.com/hc/en-us/sections/33329694407821-Midjourney-Policies | Ten policy titles |
| Content Authenticity | https://docs.midjourney.com/hc/en-us/articles/48207461163661-Content-Authenticity | Three-outcome verifier copy |

---

## T1 Navigation & IA labels

**There is almost no navigation.** `[observed]` The homepage nav is: `Midjourney` · `Sign Up` · `Log In` · `Documentation` · `Explore`. That is the entire global IA of a company with millions of users. No `Pricing`, no `Features`, no `Product`, no `Blog` in the nav (a `/updates/` path exists, surfaced only via the version banner). No footer navigation — the page ends with `Terms of Service`, `Privacy Policy`, `Privacy Settings`.

**Pricing has no page on the marketing site.** It exists only as a docs article (`Comparing Midjourney Plans`) inside a `Billing Support` category. For a subscription product this is close to unique in the corpus and is the single most distinctive IA fact about Midjourney: **the company does not sell on its website.**

**Documentation IA — six sections, teaching-order rather than object-order** `[observed]`

| Section | Contents (selected) |
|---|---|
| `Getting Started` | `Getting Started Guide` |
| `Prompting Basics` | `Prompt Basics`, `Modifying Your Creations`, `Aspect Ratio`, `Image Size & Resolution`, `Art of Prompting` |
| `Using Your Own Images` | `Video`, `Image Prompts`, `Style Reference`, `Edit Model`, `Omni Reference`, `Describe` (7 articles) |
| `Using the Website` | `Website Overview`, `Creating on Web`, `Organizing Your Creations`, `Using Folders`, `Draft & Conversational Modes`, `Personalization` (11 articles) |
| `Midjourney Controls` | `Parameter List`, `Chaos / Variety`, `Legacy Features`, `Multi-Prompts & Weights`, `No`, `Pan` (20 articles) |
| `Using Discord` | `Web vs Discord`, `Discord Quick Start`, `Discord Overview`, `Discord Direct Messages`, `Add Midjourney to Your Discord Server`, `Discord Command List` (12 articles) |

Two decisions are notable. First, `Aspect Ratio` is filed under **`Prompting Basics`**, not under `Midjourney Controls` with the other parameters — because aspect ratio is the one parameter a beginner must set immediately, so it is taught as part of prompting rather than as a control. Filing the same object in the section matching the *moment of need* rather than the *taxonomic category* is a deliberate and defensible violation of consistency.

Second, `Midjourney Controls` is the largest section (20 articles) and `Using Discord` the second largest (12). The documentation's centre of mass is parameters and the Discord surface, not features.

**A separate top-level category, `Billing Support`**, holds `Plan Information` (11 articles) including `Using Images & Videos Commercially`, `Stealth Mode`, `Keeping Your Creations Private` and `Free Trials`. Filing privacy and commercial-rights articles under *Billing* rather than under *Policies* is a real findability problem — `Stealth Mode` is a privacy feature documented in the billing section because it is a paid entitlement.

**`Midjourney Policies` section — ten titles** `[observed]`: `Terms of Service` · `Community Guidelines` · `Privacy Policy` · `Cookie Policy` · `Midjourney Trademark Policy` · `Data Deletion and Privacy FAQ` · `Purchase Order Terms and Conditions` · `AB2013 Documentation` · `Public Summary of Training Content` · `Content Authenticity`

The last three are the AI-era additions and are covered in T10.

## T2 Value proposition & headline patterns

**The homepage is a manifesto, not a product page.** `[observed]` Four H1s: `About`, `Projects`, `Careers`, `Contact`. There is no hero, no CTA beyond `Sign Up`, no screenshot, no feature list, no testimonial, no logo wall, no pricing, no FAQ.

> "We're a community-funded research lab of 60 people known for building the most beautiful AI models in the world."
>
> "We believe that we are all midjourney: that we have a rich past behind us and an unimaginable future ahead — and the question we want to most help answer is: what do we want to become?"

The brand name is used as a common noun mid-sentence ("we are all midjourney") — the whole positioning rests on that pun, and the closing line of the Projects section restates it: "we aren't at the end of time, or the beginning, but that we are all midjourney in a vast and great adventure."

**The product roadmap is presented as unlabelled icons with `TBA`** `[observed]`. Seven tiles — an eye, a pen, people, a face, a heart, a brain, a hand — captioned:

`Image and Video Models` · `TBA Software` · `TBA Software` · `TBA Software` · `Medical` · `TBA Hardware` · `TBA Hardware` · `TBA Hardware`

Six of eight tiles say nothing except their category. `Medical` is stated with no explanation whatsoever. This is deliberate scarcity-as-positioning, and it is only survivable because the product is already known — a new entrant could not ship this page. Recorded as an extreme case, not a pattern to copy.

**Themes are listed as abstract nouns** `[observed]`: "under the themes of imagination, coordination, reflection, beauty, and human flourishing."

**Version announcement is the only product messaging on the homepage** `[observed]`, and it appears twice in two forms (responsive duplication):

> `V8.2 is live!` `Learn more.`
> `V8.2 is live!` `Learn more in our blog post`

The only exclamation mark on the site is on the version number. **What Midjourney announces is the model version — that is the product news.**

**Documentation headlines carry the actual value propositions** `[observed]`. Every docs article opens with an H3 deck in the second person, promising a capability:

- `Control, customize, and enhance your images with parameters!`
- `A prompt is your creative starting point—learn how to turn words into unique and exciting images!`
- `Control the artistic flair in your images with the stylize parameter: --stylize or --s`
- `Add more variety to your image results with the chaos parameter: --c or --chaos`
- `Make your images quirky and unconventional with the weird parameter: --w or --weird`
- `Tell Midjourney what you don't want in your image using the no parameter: --no`
- `Midjourney images start as squares, but you can change this using the aspect ratio parameter: --ar or --aspect`
- `To change how fast your images and videos are made, adjust your GPU speed.`

**This is the single most systematic content pattern in the corpus batch.** The deck formula is:

> **\<Verb phrase naming the user benefit\> with the \<plain-English name\> parameter: `--flag` or `--shortflag`**

Benefit first, plain name second, syntax last, all in one line. A user who reads only the deck knows what the flag is for, what it is called in conversation, and exactly what to type. The aspect-ratio deck varies the formula to lead with the default state being changed ("images start as squares") — which is the right variation for the only parameter that has a visible default the user will want to override.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign Up` | Homepage nav (appears twice — desktop + mobile) | Title Case, unlike most of the corpus |
| `Log In` | Homepage nav (twice) | |
| `Explore` | Homepage nav (twice) | The gallery; a browse CTA placed as a peer of sign-up |
| `Documentation` | Homepage nav | Links off-site to `docs.midjourney.com` |
| `Learn more.` | Version banner | **With a trailing full stop inside the link** |
| `Learn more in our blog post` | Version banner (second variant) | Same destination, longer label |
| `Learn more.` | Careers block | |
| `Discord` | Contact block | |
| `help page` | Contact block | Lowercase inline link to `help.midjourney.com` |
| `Skip to main content` | Docs pages | Zendesk template |
| `Toggle navigation menu` | Docs pages | |
| `Midjourney Website` / `Midjourney Discord Server` | Foot of every docs page | The only two footer links in the docs |
| `Getting Started Guide` | Foot of some docs articles, under `Need Help Getting Started?` | |
| `Report` / `Report Job` / `Cancel Job` | Named in Community Guidelines as in-product controls | `[documented]` |

**Observations.** The CTA inventory is tiny — under a dozen distinct labels across the whole public surface. There is no `Try for free`, no `Get started`, no `Buy`, no `See pricing`. Acquisition is handled by `Sign Up` alone.

**Three defects.** `Learn more.` ships with a full stop inside the anchor. The same banner renders two different labels for one destination. And the homepage `Contact` block routes support to `Discord` or a lowercase `help page` at `help.midjourney.com` — a **different host from `docs.midjourney.com`**, which is where all the documentation actually lives. Two help domains, only one linked from the homepage.

## T4 Onboarding & getting-started

**The onboarding artefact is the prompting guide, and it is unusually good** `[observed]` — `Prompt Basics`.

It opens by defining the object before teaching the skill:

> "Creating with Midjourney starts with a prompt. A prompt is simply the text or phrase you use to tell Midjourney what kind of image or video you want."
>
> "Your prompt could be just one word or a complete phrase."

Then, immediately, the counter-intuitive rule stated as the section's first line:

> "Short and simple prompts typically generate the best images with Midjourney."

**A worked bad/good pair, with icons** `[observed]`:

- 👎 "Show me a picture of lots of blooming California poppies, make them bright, vibrant orange, and draw them in an illustrated style with colored pencils"
- 👍 "Colored pencil illustration of bright orange California poppies"

One example pair does more than a paragraph of guidance. The bad example is specifically the prompt a chat-LLM user would write — conversational, instruction-framed, polite — and the good example is the noun phrase that replaces it. The lesson is *you are not talking to an assistant, you are writing a caption*, and it is taught without ever saying so.

**Four named sub-rules, each a bolded imperative with a worked micro-example** `[observed]`:

| Rule | The teaching move |
|---|---|
| `Choose the Right Words` | "instead of 'big,' consider 'huge,' 'gigantic,' or 'enormous.'" — synonym specificity |
| `Be Specific with Numbers` | "Plural words like 'cats' can be vague. Instead, use specific numbers like 'three cats.' Or go for collective nouns like 'flock of birds'" |
| `Focus on What You Want` | "If you mention a party with 'no cake,' a cake might still appear." — then routes to `--no` |
| `Prompt Length and Details` | "Fewer details mean more variety, but you get less control over the outcome." |

The third rule teaches a genuinely non-obvious model behaviour — negation in natural language does not work — by showing the failure, then hands the user the tool that does work. **Failure → mechanism → control** in three sentences.

The fourth names the trade-off in one clause: fewer details = more variety = less control. A single sentence that gives the user a mental dial.

**The six-dimension checklist** `[observed]` — the most copied artefact in generative-AI UX writing, and this is its canonical form:

- **Subject:** "Who or what? (person, animal, character, location, object)"
- **Medium:** "In what form? (photo, painting, illustration, sculpture, doodle, tapestry)"
- **Environment:** "Where? (indoors, outdoors, on the moon, underwater, in the city)"
- **Lighting:** "What kind? (soft, ambient, overcast, neon, studio lights)"
- **Color:** "In what shades? (vibrant, muted, bright, monochromatic, colorful, black and white, pastel)"
- **Mood:** "Feelings to evoke? (playful, calm, gloomy, energetic)"
- **Composition:** "How is it framed? (portrait, headshot, closeup, birds-eye view)"

(Seven, despite "some areas to consider".) The format is **Label: short question (comma-list of concrete example values)**. The question makes the dimension actionable; the parenthetical supplies the vocabulary the user does not have. Providing example *values* rather than only the category name is the whole reason this works — "Lighting" alone is useless to someone who has never art-directed anything, but "neon, studio lights" is immediately usable.

**Progression is explicit** `[observed]` — the article closes with `Advanced Prompts` and a three-part anatomy of a full prompt:

`Text Prompt` + `Image Prompts` + `Parameters`

each with a one-paragraph definition, and parameters defined by their *position*: "Parameters get added to the end of your prompt." The user is handed the grammar of the input field as a three-slot structure before being shown any flag.

**Escalation route** `[observed]`: "Midjourney has a vibrant community that loves problem-solving and helping others!" → a link to the `Prompt Craft channel on Discord`. Craft help is routed to community, not to support.

## T5 Form & field labels

**PRIORITY SECTION.** This is Midjourney's strongest category and the reason it is in the corpus.

### The input surface has a name

`[observed]` The prompt field is called the **`Imagine bar`** on the web, and the Discord equivalent is the **`/imagine` command**. Every parameter article gives instructions for both surfaces, in a consistent two-bullet structure:

- "Add `--s #` to the end of your prompt in the Imagine bar."
- "Add `--s #` to the end of your prompt in Discord."

Naming the input field (rather than calling it "the prompt box" or "the text field") gives the documentation a referent it can use hundreds of times without ambiguity. The name also carries the verb — you *imagine* into the Imagine bar.

### Syntax rules are taught as three numbered tips plus four counter-examples

`[observed]` From `Parameter List`, the syntax section is the most transferable piece of input-design content in this batch:

> **Remember these tips for success:**
> 1. **Place Parameters at the End:** "Always put parameters after your prompt text."
> 2. **Watch the Spaces:** "Add a space between your prompt text and the dashes."
> 3. **No Punctuation:** "Don't use commas, periods, or other punctuation marks in your parameters."

Followed immediately by **four 👎 examples, each annotated with the specific mistake in bold parentheses**:

- 👎 `vibrant California poppies--ar 2:3` **(No space before the dashes)**
- 👎 `vibrant California poppies - - ar 2:3` **(Extra space between the dashes)**
- 👎 `vibrant California poppies --ar 2:3,` **(Using punctuation in parameters)**
- 👎 `vibrant California --ar 2:3 poppies` **(Prompt text after parameters)**

**This is the pattern to steal wholesale.** Three positive rules, then one negative example per rule, each showing the *exact* malformed string a user would type, with the error named in the annotation rather than left to be spotted. A user who has just had a prompt rejected can visually match their own string against the four bad examples and self-diagnose in seconds. Note that all four bad examples use the *same* base prompt, so the only thing varying is the error — which is what makes the visual diff work.

### The complete public parameter list

`[observed]` from `Parameter List`. **Only the parameters actually documented on that page are recorded here.** Presented as a 3-column grid; each cell is **bold plain-English name → one-sentence description → the flag(s)**.

| Plain-English name | Flag(s) | Documented description (verbatim or close) |
|---|---|---|
| `Aspect Ratio` | `--aspect` or `--ar` | "Midjourney images start as squares, but you can change this using the aspect ratio parameter" |
| `Chaos` | `--chaos` or `--c` | "Spice up your image results with the chaos parameter" |
| `Omni Reference` | `--oref` | "Want to use a person's likeness or the form of an object? You can provide Midjourney with an Omni Reference!" — noted as "(replaced by the Edit Model in V8.X)" |
| `No` | `--no` | "Tell Midjourney what you don't want in your image using the no parameter" |
| `Personalization` | `--profile` or `--p` | "Create custom image styles with personalized profiles and moodboards" |
| `Quality` | `--quality` or `--q` | "Control the detail and processing time of your images with the quality parameter" |
| `Repeat` | `--repeat` or `--r` | "Want to generate multiple image sets from a single prompt? Use the repeat parameter" |
| `Seed` | `--seed` | "Use the seed parameter for testing and experimenting" |
| `Stealth Mode` | `--stealth` | "Make your creations private on the Midjourney website" |
| `Raw Mode` | `--raw` | "Gain more control over your images with Raw Mode" |
| `Stylize` | `--stylize` or `--s` | "Control the artistic flair in your images with the stylize parameter" |
| `Style Reference` | `--sref` | "Want to match the look and feel of another image? You can provide Midjourney with a Style Reference!" |
| `Tile` | `--tile` | "Create seamless repeating patterns with the tile parameter" |
| `Version` | `--version` or `--v` | "Explore and switch between Midjourney's model versions using the version parameter" |
| `Draft` | `--draft` | "Generate draft images in V7 at half the GPU cost using --draft" |
| `Weird` | `--weird` or `--w` | "Make your images quirky and unconventional with the weird parameter" |
| `Fast Mode` | `--fast` | "Switch your GPU speed to Fast Mode" |
| `Image Weight` | `--iw` | "Control the impact of image prompts" |
| `Relax Mode` | `--relax` | "Switch your GPU speed to Relax Mode" |
| `Turbo Mode` | `--turbo` | "Switch your GPU speed to Turbo Mode" |
| `Niji` | `--niji` | "Use our model focused on anime and Eastern aesthetics" |
| `Public Mode` | `--public` | "Make your creations public on the Midjourney website" |
| `Motion Low/High` | `--motion low` / `--motion high` | "Motion settings for video generations" |
| `Video Looping & End Frames` | `--loop` / `--end` | "Create looping video generations with --loop and set a custom end frame using --end" |
| `Batch Size` | `--bs` | "Control the number of videos generated from each video prompt using --bs" |
| `Style Weight` | `--sw` | "Control the strength of your Style References with --sw" |
| `Style Reference Versions` | `--sv` | "Select your style reference version using --sv" |
| `Video` | `--video` | "Generate videos in Discord using --video" |
| `SD / HD Images` | `--hd` / `--sd` | "Generate V8.1 images at higher resolution (2048px) using --hd or in standard resolution (1024px) using --sd" |
| `Edit Model` | `--edit` | "Create and modify images using written instructions and up to four reference images using --edit" |

A pointer to `Legacy Features` closes the list: "For information about legacy parameters, visit our Legacy Features article." **Deprecated flags get their own article rather than being silently deleted** — so a user copying an old prompt from a forum can find out what happened to a flag that no longer works. This is the same instinct as Wise documenting a withdrawn capability.

### Value ranges and defaults, stated in one sentence each

`[observed]` The individual parameter articles each state default and range in a single sentence, always in the same shape:

- **Stylize:** "The default value for stylize is 100, and you can adjust it anywhere between 0 and 1000 with the latest Midjourney versions."
- **Chaos:** "By default chaos is set to 0... You can set the chaos value anywhere between 0 and 100"
- **Weird:** "By default, weird is set to 0, but you can add values up to 3000."
- **Aspect Ratio:** "The default aspect ratio is 1:1."

**Default → range → version caveat**, every time. Three facts, one sentence.

### The explanation grammar for a numeric parameter

`[observed]` Each numeric parameter is explained with the same four-move structure. `Stylize` is the cleanest instance:

1. **Metaphor** — "Think of stylize as a slider that changes how much artistic creativity is applied to your image."
2. **Low end, described as an experience** — "With a low stylize setting, it's like asking for an image that follows your prompt very closely—Midjourney sticks to the facts without much extra flair."
3. **High end, with the cost named** — "With a higher stylize setting, it's like giving Midjourney more freedom to interpret your idea. The image might look more artistic and visually interesting, **but it could stray from the exact details of your prompt.**"
4. **The choice restated as a single axis** — "So, stylize lets you choose if you want your image to be more literal (based on your prompt) or more creative and artistic."

`Chaos` follows the identical structure: metaphor is skipped, but the high end carries the same bounded warning — "higher values mean the images can be quite different and may not stick as closely to your prompt, giving you unpredictable results."

**The recurring move is: every increase is described together with what it costs you.** Stylize buys artistry at the price of prompt fidelity; chaos buys variety at the price of predictability; weird buys novelty at the price of seed compatibility ("Weird is also not fully compatible with seeds"). A content designer documenting any slider should copy this: **name the unit of the trade, not just the direction of the dial.**

`Weird` additionally concedes instability: "weird is an experimental feature, and what's 'weird' may change over time." Admitting the semantics of your own parameter will drift is a rare disclosure.

### The `--no` article contains the best moderation-interaction warning in the corpus

`[observed]` After teaching the flag, the article volunteers a failure mode nobody would guess:

> "Midjourney's moderation system reads every word you add to the `--no` parameter independently. This means if you prompt "--no modern clothing" it will read that as "no modern" and "no clothing"! This interpretation can accidentally trigger a warning, as it might seem like you're requesting an image of someone without clothing. In this case, include the type of clothing you do want in your prompt, rather than using `--no`."

A tokenisation detail of the safety classifier, explained to a non-technical audience, with the exact string that breaks, the reason the false positive fires, and the workaround. Most products would never admit their moderation system can be tripped by a grammatically innocent phrase. **This is the standout single passage in the file.**

The same article also gives the mechanism underneath the syntax — "Using the `--no` parameter is the same as weighing part of a multi-prompt to '-0.5'" — and routes to `Multi-Prompts & Weights`. Surface syntax first, underlying model second, for users who want it.

### Setting a value in two places, and where the default lives

`[observed]` Every parameter article includes the same paragraph pattern:

> "You can choose a default \<Parameter\> for all your images in the settings panel. To do this, click the settings button in the Imagine bar. Once you set it, this will apply to all your future prompts."

with a Discord equivalent using the `settings command` and preset buttons. The Discord presets are named with emoji: `🖌️ Stylize med` (stated as the default), `🐢 Relax Mode`, `🐇 Fast Mode`, `⚡ Turbo Mode`.

A discoverability caveat is disclosed for the presets: "You can see the exact value of each preset by selecting it and looking at 'Current suffix'". Named presets hide the number; the doc tells you where the number is. Honest, though `🖌️ Stylize med` mapping to an unstated value is itself a defect.

**Cross-surface sync is stated explicitly** `[observed]`: "Your website and Discord settings are synced. This means that if you change your settings in one place, they'll automatically change in the other—including your generation speed. Double-check your settings to make sure they're set the way you want them before you generate images and videos!" — a warning about invisible state carried between two clients, with the consequence (spending GPU time at the wrong speed) implied.

### Aspect ratio: converting the user's real-world units

`[observed]` The `--ar` article does something most parameter docs skip — it tells the user how to get from *their* numbers to the parameter's format:

> "if your image is 1920x1080 pixels, enter `--ar 1920:1080`, and Midjourney will simplify it to `--ar 16:9`. For something like 8.5x11 inches, remove the decimals (Midjourney doesn't accept them) and enter `--ar 85:110`."

Plus five ratios annotated by use, not by number: `1:1` "popular for social media profile pictures", `4:3` "older TV screens", `2:3` "printed photography and picture frame sizes", `16:9` "standard for HD videos", `9:16` "common for mobile content on social media".

And a highlighted correction of the likeliest misconception: "**Important:** Aspect ratio isn't the same as image dimensions."

Four constraint bullets close the article, including "`--ar` cannot contain decimals. Use 139:100 instead of 1.39:1." and "Extremely wide and tall aspect ratios are experimental and may produce unpredictable results."

## T6 Status & state language

**No status page exists at a discoverable URL.** `[absent]` — no `status.midjourney.com` link in the nav, footer, docs footer, or policies section. For a GPU-constrained service where queue time is the primary user experience, the absence of a public status page is a significant gap and the most conspicuous omission in this file.

**Generation-mode states are the real state vocabulary** `[observed]`:

`Fast Mode` · `Relax Mode` · `Turbo Mode` · `Draft Mode` · `Stealth Mode` · `Public Mode` · `Raw Mode` · `Conversational Mode`

Eight named modes, seven of which map to a `--flag`. State is expressed as a *mode the user chooses*, not as a system condition reported to them.

**Queue language** `[documented]`: "In Relax Mode, your prompt requests wait in line to be processed as GPUs free up. This means you might experience wait times ranging from 0 to 30 minutes. How long you wait can depend on how much you've used Relax Mode compared to other users. If you use Relax Mode less often, you'll typically have shorter wait times."

A range rather than an estimate (`0 to 30 minutes`), plus the **fairness algorithm explained to the user** — heavy users wait longer. Disclosing that your queue is usage-weighted, in plain language, is unusual and pre-empts the "why is mine slower than theirs" complaint.

**Graceful degradation is documented** `[documented]`: "If the Turbo GPUs aren't available or you're on an older version, your job will switch automatically to Fast Mode." The user is told in advance what silently happens on their behalf.

**Job as a countable unit** `[observed]` — the plan table uses `jobs` as the unit for concurrency limits: `Maximum Queued Jobs` `10 jobs`, `Maximum Repeat / Permutation Size` `4 jobs` / `10 jobs` / `40 jobs`, with a footnote "*Queue size will extend to accommodate repeat/permutation jobs." Also `Maximum Concurrent Prompts (images)` expressed as `12 Fast or 3 Relax`. The concurrency limit changes depending on which mode you are in, and the table expresses that as an either/or inside a single cell.

## T7 Error, failure & recovery

All `[documented]`; nothing observed live.

**Moderation is the primary failure class and is described honestly** `[observed]`, in Community Guidelines:

> "Midjourney will block some text and image inputs automatically. **An input not being automatically blocked does not necessarily mean that it is allowed.**"

The second sentence is the important one: it tells the user that passing the filter is not permission. Most products let silence imply consent; Midjourney explicitly removes that inference.

Enforcement ladder, stated as a sequence: "Users who violate the Terms of Service may be warned by a community moderator, given a time-out, or be blocked from the service." Three escalating states, named.

For the Editor specifically: "Anyone attempting to violate our Community Guidelines using the Editor will face suspension or banning without refund." — the financial consequence stated in the same clause as the account consequence.

**The `--no` false-positive warning** (T5) is the best recovery content on the site: it predicts a specific moderation warning, explains why it fires on innocent input, and gives the rewrite.

**Self-remediation controls are named** `[documented]`:

> "Occasionally prompts will unintentionally produce not safe for work content. Please self-police these images by using the ❌ emoji reaction or by right-clicking selecting Apps and then clicking **Cancel Job** to delete the image in Discord."

`Cancel Job` and `Report Job` (Discord) and `Report` under an `Options` button (web) are the named controls. Note the framing: "**Occasionally prompts will unintentionally produce**" — the system is conceded to sometimes generate violating content from non-violating input, and the user is given the tool rather than the blame.

**Content-verification failure states** `[observed]` — see T10; the verifier's three outcomes include an explicit "this is not evidence of absence" result.

**Billing recovery** `[documented]` — `Purchasing Extra Fast Time`: "If you run out of Fast time before your subscription renews, you can easily purchase more to continue creating without delays." Run-out has a named article and a named remedy.

## T8 Empty states

`[absent]`. No empty-state, no-results or first-run copy is reachable. The homepage has no search; the docs search is Zendesk-default and was not exercised. All app empty states sit behind sign-in.

## T9 Notifications & system messages

`[observed]`, sparse.

- **Version banner**, the only persistent notification on the site: `V8.2 is live!` + `Learn more.` Rendered twice with two different link labels (responsive duplication — see T14).
- **Inline version notices in the docs**, appearing at the head of nearly every parameter article: "For more information about V8.2, see our Version article." A version-currency notice injected into every control document, so the user always knows the docs are versioned. Worth copying for any rapidly-versioned product.
- **A stale variant of the same notice** appears on the GPU Speed article: "Turbo mode is not currently supported in **V8.1**. For more information about **V8.1**, see our Version article." — while every other article references V8.2 and the homepage announces V8.2. `[observed defect]`
- Balance checking is user-initiated, not pushed: "To check how much Fast time you have left, head to your Manage Subscription page and look at the usage details. If you're in Discord, you can use the `info` command to see your remaining Fast time." **No low-balance warning is documented.** `[absent]`
- No email, push, or toast copy is publicly reachable.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.**

### Metered-billing disclosure — GPU time, not credits

`[observed]` Midjourney is the only product in this batch that meters on **time on hardware** rather than an abstract credit, and it explains why in one analogy:

> "Midjourney uses powerful Graphics Processing Units (GPUs) to handle the prompts you give it and turn them into images and videos. When you subscribe to Midjourney, **you're actually buying time to use these GPUs. Think of GPU time like the data you get with a cell phone plan.**"

The mobile-data analogy does three jobs at once: it establishes that the resource is finite, that it depletes with use, and that it resets monthly — all borrowed from a billing model every reader already understands. **Borrowing an existing billing mental model wholesale is cheaper than teaching a new one**, and it is the right move when your unit is genuinely analogous.

Immediately after, the definition is bounded against the user's likely misreading:

> "==Note:== It's important to understand that GPU time is different from the time you're spending on our website or in Discord, and even from the actual time you wait for your creations. GPU time is only used when Midjourney is actively working to create images/videos for you."

Three things GPU time is *not*, before anything about what it is. The third — "even from the actual time you wait" — pre-empts the Relax-mode complaint that a 30-minute queue burned 30 minutes of allowance.

**A per-operation cost table is published** `[observed]`, with the disclaimer that these are approximations:

| Operation | Approximate GPU Cost |
|---|---|
| `SD Prompt` | 0.8 minutes |
| `HD Prompt` | 1.3 minutes |
| `Variation` | less than 1 minute |
| `Grid Upscale (Discord only)` | 0 (no cost) |
| `Creative/Subtle Upscale` | 2 minutes |
| `Edit Model SD Prompt` | 1 minute |
| `Edit Model HD Prompt` | 2.3 minutes |
| `Omni Reference Prompt (V7)` | 2 minutes |
| `Batch of 4 SD Videos` | 8 minutes |
| `Batch of 4 HD Videos` | 26 minutes |

Preceded by a rule of thumb — "Processing one image prompt usually takes about one minute of GPU time, and one video prompt about eight minutes" — and followed by the variables that move it: "Upscaling images, using nonstandard aspect ratios, or older model versions might require more time. Creating variations or using lower quality settings often uses less."

**The parameters are therefore also the cost controls**, and the docs say so: `--draft` is described as "Generate draft images in V7 at half the GPU cost", `--quality` as "Control the detail **and processing time** of your images", and Turbo carries "**Keep in mind that Turbo Mode uses double the Fast time for each image.**" in bold. A user reading the parameter list is simultaneously reading a price list. That coupling is unusual and good.

**Expiry rule, stated three times, never softened** `[observed]`:

- GPU Speed article: "any unused time doesn't carry over to the next month."
- Dedicated article `Subscription Fast Time Expiration`: "Keep in mind that any unused Fast time from your subscription will not carry over to the next month. Whether you're on a monthly or yearly plan, **unused Fast time vanishes at the end of each month**, so be sure to use it up before the month ends!"
- GPU Speed again: "Each time your subscription renews, your Fast time is reset. So, it's smart to use up your Fast time before the month ends"

"Vanishes" is a strong verb to choose for your own use-it-or-lose-it rule, and giving expiry its own two-sentence article rather than burying it in a table is a disclosure choice worth crediting. Contrast Runway (168), which discloses rollover well but at least *has* rollover; Midjourney has none and says so three times.

**Plan table** `[observed]` — `Basic Plan` / `Standard Plan` / `Pro Plan` / `Mega Plan`:

| Row | Basic | Standard | Pro | Mega |
|---|---|---|---|---|
| Monthly Price | $10 | $30 | $60 | $120 |
| Annual Price | $96 ($8/mo) | $288 ($24/mo) | $576 ($48/mo) | $1,152 ($96/mo) |
| `Fast GPU Time` | 3.3 hr/month (200 minutes) | 15 hr/month | 30 hr/month | 60 hr/month |
| `Relax GPU Time` | — | Unlimited Images | Unlimited Images & SD Video | Unlimited Images & SD Video |
| `Video Resolution` | SD | SD & HD | SD & HD | SD & HD |
| `Purchase Extra GPU Time` | $4/hr | $4/hr | $4/hr | $4/hr |
| `Stealth Mode` | — | — | ✓ | ✓ |
| `Maximum Concurrent Prompts (images)` | 3 Fast | 3 Fast or Relax | 12 Fast or 3 Relax | 12 Fast or 3 Relax |
| `Rate Images to Earn Free GPU Time` | ✓ | ✓ | ✓ | ✓ |

Note `3.3 hr/month (200 minutes)` — **the awkward number is disclosed in both units** rather than rounded, because 3.3 hours is hard to reason about against a table of per-operation costs in minutes. The top-up rate ($4/hr) is the same on every tier, stated in the table rather than at checkout. The annual discount is stated as a percentage *and* as a per-month equivalent: "You can get a 20% discount on your subscription by committing to an annual plan, where the full year fee is paid upfront."

**Unlimited is scoped precisely** `[observed]`. `Relax GPU Time` is not "Unlimited" but `Unlimited Images` on Standard and `Unlimited Images & SD Video` on Pro/Mega, with three bullets above the table restating the scope, and a limitations paragraph naming what Relax cannot do at all: "Permutation prompts, the repeat parameter, HD resolution videos, and Max Upscale... are not available while using Relax mode." Compare Runway (168), which ships a plan called `Unlimited` and then a help article explaining why it has credits. **Midjourney qualifies the word in the cell; Runway qualifies it in a support article.** The first is better.

**Free GPU time is earned by labour** `[observed]` — `Rate Images to Earn Free GPU Time`, available on every tier, with articles `Earning Free Fast Time` and "you may be able to complete tasks on our website to earn free Fast time." Users can pay in ratings instead of money. Disclosed in the plan table as an entitlement row rather than hidden.

**No free trial** `[observed]`, stated plainly in the article `Free Trials`: "A limited trial is available on the niji · journey app, available for iOS and Android devices. No free trial is currently available in Discord or..." (truncated in the teaser).

### Commercial rights and the revenue-threshold clause

`[observed]` The plan table's `Usage Rights` row reads `General Commercial Terms**` on all four tiers, with the footnote:

> "*If you have subscribed at any point, you are free to use your images/videos in just about any way you want. **You must purchase the Pro or Mega plan if you are a company making more than $1,000,000 USD in gross revenue per year.** For complete details, please see the Terms of Service.*"

A revenue-gated licensing tier stated in a footnote on a plan-comparison table. Also, from `Using Images & Videos Commercially`: "With Midjourney, you own all the images and videos you create, **even if you decide to cancel your subscription.**" — post-cancellation rights addressed explicitly, which is the question every subscriber eventually asks.

### Community Guidelines — four rules, then the long version

`[observed]` The page's structural move is to state everything twice, at two lengths.

Opening frame: "Midjourney is an open-by-default community. To keep the platform accessible and welcoming to the broadest number of users, content must be 'Safe For Work' (SFW)."

> **We have 4 main rules**
> 1. **Be kind and respect each other**
> 2. **SFW content only**
> 3. **Be thoughtful about how you share your creations**
> 4. **Unauthorized automation & third party apps are not allowed**

Four short imperatives a user can actually hold in memory, then the same four expanded into numbered sub-rules with definitions. **Rule 2 defines its own terms with a question-heading**, which is rare in policy writing:

- "What is Considered Gore? Gore includes images of detached body parts of humans or animals, cannibalism, blood, violence (images of shooting or bombing someone, for instance), mutilated bodies, severed limbs, pestilence, etc."
- "What is NSFW or Adult Content? Avoid nudity, sexual organs, fixation on such things, sexualized imagery, fetishes, people in showers, on toilets, etc."

Defining prohibited categories with concrete enumerations — including the oddly specific "people in showers, on toilets" — removes the argument about what counts.

**Likeness and real people** `[observed]` — the likeness rule is under Rule 1, framed by *effect* rather than by consent:

> "Do not create or use imagery of real people, famous or otherwise, that could be used to harass, abuse, defame, or otherwise harm."

Note this is a **harm-conditional** rule, not a consent requirement. Midjourney does not require permission to depict a real person; it prohibits depictions that could harm them. That is a materially weaker standard than ElevenLabs' consent requirement (170) or Runway's "without their permission" (168), and it is a meaningful divergence to record. Rule 2.5 adds: "This includes offensive or inflammatory images of celebrities or public figures."

**Elections and misinformation** `[observed]`, Rule 3:
- "Do not generate images to spread misinformation or disinformation."
- "Do not generate images for political campaigns or to try to influence the outcome of an election."
- "Do not generate images to attempt to or to actually deceive or defraud anyone."
- "Do not intentionally mislead recipients of generated images about their nature or source."

The last is the **AI-disclosure obligation placed on the user**: you may not conceal that an image is AI-generated. Placing the disclosure duty on the creator, in community guidelines rather than in terms of service, is a distinct approach.

**Editor overlay** `[observed]` — a separate block, `Specific Community Guidelines & Important Reminders for Editor`, opening: "The Editor is a powerful new tool for unleashing imagination. **It's not for creating images that might deceive, harass, or maliciously harm others.**" Three additional prohibitions follow, including "We will take especially strict action against anyone attempting to produce sexualized images of real people."

Shipping a policy overlay with the feature that raised new risk — rather than quietly widening the general policy — is good practice and mirrors Runway's `Characters & Game Worlds` overlay.

**Scope and governance honesty** `[observed]`, under `Overall Policy Notes`:

- "The above rules apply to all content, including images made in private servers, images deleted/hidden, using Stealth Mode, in direct messages with the Midjourney Bot, and Midjourney websites." — **Stealth Mode is named as not being an exemption**, closing the obvious loophole in a paid privacy feature.
- "Midjourney is both a product and community. We may revoke your access to the community separately from access to the product."
- "This is not an exhaustive list. We may take action against users that violate the spirit of these guidelines, even if their actions are not explicitly prohibited."
- "We are a small team striving to balance the needs of the broadest number of users in our community. **Our decision making process is not a democracy**, but we take feedback on moderation very seriously."
- Closing line: "Most importantly, have fun!"

"Our decision making process is not a democracy" is a remarkable sentence to publish, and it is doing real expectation-setting work for a community that argues about moderation. The tonal whiplash from that to "Most importantly, have fun!" two bullets later is jarring, and recorded as such.

Framing line before the rules: "Please use these incredible powers with joy, wonder, responsibility and respect."

### Content provenance — a verifier with three outcomes, one of which is a null result

`[observed]` `Content Authenticity`:

> "Go to midjourney.com/verify, upload an image, and we'll tell you if Midjourney made it. **It's free, you don't need an account, and we don't keep your image.**"

Three privacy/access facts in one clause, before the mechanism. Then the mechanism in plain language: "Every image Midjourney delivers has a small ID tag hidden inside the file. The checker looks for that tag and confirms it points to a real Midjourney image. A tag that was faked or copied from another image won't pass."

**The three outcomes, written as user-facing result strings:**

1. `This image was created with Midjourney.` — "The tag is there and it's real."
2. `The metadata doesn't check out.` — "The file has a tag, but it doesn't point to any real Midjourney image. Someone may have tampered with it."
3. `No Midjourney metadata found.` — "**That doesn't mean Midjourney didn't make it.** The tag is easily lost: Screenshots, edits, and most social media sites remove it."

**Outcome 3 is the most important disclosure in this file.** A provenance tool that tells you, in its own result copy, that a negative result is not evidence of absence — and names the three everyday actions that destroy the signal (screenshots, edits, social media) — is being honest about a limitation that undermines the tool's headline value. Followed by the practical instruction: "For the most reliable answer, check the original downloaded file and not a screenshot or a copy from social media." And a rate-limit disclosure: "There's a daily limit on checks so the service stays available for everyone."

Note Midjourney describes a proprietary "small ID tag" rather than claiming C2PA. Runway and ElevenLabs both claim C2PA explicitly; Midjourney does not use the term on this page.

### Training-data transparency

`[observed]`, as titles only — two dedicated policy articles exist:
- `AB2013 Documentation` — California's generative-AI training-data transparency statute
- `Public Summary of Training Content`

Publishing a training-content summary as a first-class item in the policy section, beside the Terms of Service, is a compliance-UX decision worth recording. Bodies were not opened. `[documented]` at title level only.

### Privacy as a paid feature — the significant negative finding

`[observed]` `Stealth Mode` ("Make your creations private on the Midjourney website") is **Pro and Mega only** — $60/month minimum. The default is public: "Midjourney thrives as an open-by-default community, which means that every image and video you create can potentially be found on the Explore page" (`Keeping Your Creations Private` teaser). Community Guidelines confirm the default framing: "Midjourney is an open-by-default community."

So: the default is publication, opting out costs $60/month, and both facts are documented only inside a `Billing Support` category. This is disclosed honestly but positioned badly — a privacy default of this consequence should not be findable only via the billing docs.

## T11 Help-centre architecture

Two sites, and the split is a defect. `docs.midjourney.com` holds all documentation; `help.midjourney.com` is referenced from the homepage `Contact` block and from Community Guidelines ("you can report it here" → `midjourney.com/help`). The homepage links only to the latter; the docs link only to the former.

**Docs structure**: two top-level categories observed — `Documentation` (six sections) and `Billing Support` (containing `Plan Information`) — with breadcrumbs on every article: `Midjourney > Documentation > Midjourney Controls > Parameter List`.

**Article structure is templated with unusual discipline** `[observed]`. Every parameter article runs the same five blocks in the same order:

1. H1 = the plain-English parameter name (`Stylize`, `Chaos / Variety`, `Weird`, `No`, `Aspect Ratio`)
2. H3 deck = benefit + flag syntax in one line
3. A header illustration
4. Version currency notice ("For more information about V8.2, see our Version article.")
5. `## What is <Parameter>?` → conceptual explanation with default and range
6. `## Setting the <Parameter> Value` → web instruction, then Discord instruction, then defaults-in-settings

`## What is X?` as a mandatory first section heading, in question form, on every control document. A user landing from search always sees the conceptual answer before the procedure.

Several articles close with a boxed prompt: `Need Help Getting Started?` → `Getting Started Guide`. The docs footer on every page is just two links: `Midjourney Website` and `Midjourney Discord Server`.

**Article-title grammar — four shapes:**

| Shape | Example |
|---|---|
| Bare parameter name | `Stylize`, `Weird`, `No`, `Seed`, `Pan`, `Video` |
| Plain-name + alias | `Chaos / Variety`, `GPU Speed (Fast, Relax, Turbo)`, `SD / HD Images` |
| Gerund task | `Using Images & Videos Commercially`, `Keeping Your Creations Private`, `Comparing Midjourney Plans`, `Earning Free Fast Time`, `Purchasing Extra Fast Time` |
| Noun-phrase concept | `Prompt Basics`, `Art of Prompting`, `Legacy Features`, `Content Authenticity`, `Subscription Fast Time Expiration` |

The `Chaos / Variety` title is the notable one — it carries **both names of the same control** because the web UI and the parameter disagree (see T13). Putting the naming conflict in the article title so both search terms resolve is the correct content-ops response to a UI inconsistency you cannot fix.

**No "Still need help?" block, no contact form, no ticket route** was found in the docs. Support routes to Discord or to the separate `help.midjourney.com` host. `[observed defect]`

## T12 FAQs

**No FAQ block exists on the homepage or on any marketing surface.** `[absent]`

`Data Deletion and Privacy FAQ` exists as a policy article title; the body was not opened. `[documented]` at title level.

The `Billing Support` → `Plan Information` section functions as a de facto billing FAQ, with each question given its own article rather than an accordion row. Titles verbatim:

| # | Article title (verbatim) |
|---|---|
| 1 | How to Subscribe |
| 2 | Comparing Midjourney Plans |
| 3 | GPU Speed (Fast, Relax, Turbo) |
| 4 | Subscription Fast Time Expiration |
| 5 | Purchasing Extra Fast Time |
| 6 | Earning Free Fast Time |
| 7 | Using Images & Videos Commercially |
| 8 | Stealth Mode |
| 9 | Keeping Your Creations Private |
| 10 | Free Trials |
| 11 | Discord Nitro Subscription |

Ordering: subscribe → compare → understand the unit → **expiry** → run out → earn more → rights → privacy → privacy → trials → disambiguation.

Item 4 (`Subscription Fast Time Expiration`) is placed *fourth*, immediately after the unit is explained and **before** the run-out and top-up articles. Most products bury expiry after the upsell. Item 11 exists purely to prevent a confusion between two unrelated subscriptions — "Discord Nitro is a Discord subscription with perks for your account, but it's different from a Midjourney subscription. Having Discord Nitro won't..." Writing an article whose only job is to disclaim a third party's product is a sign of a support queue that was drowning in one specific question.

**One-article-per-question, rather than an accordion**, means each billing question is independently linkable, searchable and citable by support. For a product whose entire commercial surface lives in its docs, that is the right structure.

## T13 Terminology & glossary

**PRIORITY SECTION.**

| Term | Midjourney's usage | The alternative it rejected |
|---|---|---|
| `prompt` | "the text or phrase you use to tell Midjourney what kind of image or video you want" | "query", "description", "input" |
| `Imagine bar` | The web prompt field | "prompt box", "input field" |
| `/imagine` | The Discord command | |
| `parameters` | "special instructions you can use to guide how your images turn out" | "flags", "arguments", "options", "settings" |
| `Text Prompt` / `Image Prompts` / `Parameters` | The three slots of a full prompt | |
| `Multi-Prompts & Weights` | Weighted prompt fragments | "prompt weighting" |
| `GPU time` / `Fast time` / `Relax time` | **The billable unit** — time on hardware | "credits", "tokens", "generations", "images" |
| `Fast Mode` / `Relax Mode` / `Turbo Mode` | The three speeds | "priority", "standard", "queue" |
| `job` | One unit of work; the unit for queue and concurrency limits | "task", "request", "generation" |
| `Variety` | **The web UI's name for `--chaos`** | — see below |
| `Stylize` | Artistic-freedom dial, 0–1000, default 100 | "creativity", "artistic strength" |
| `Weird` | Novelty dial, 0–3000, default 0 | "experimental", "unusual" |
| `Raw Mode` | Reduced default styling | "literal mode", "no style" |
| `Draft Mode` | "lightning-fast way to prototype images at a lower GPU cost" | "preview", "low-res" |
| `Stealth Mode` / `Public Mode` | Visibility states, expressed as modes | "private"/"public" |
| `Style Reference` (`--sref`) / `Style Weight` (`--sw`) / `Style Reference Versions` (`--sv`) | A three-flag family for one concept | |
| `Omni Reference` (`--oref`) | "a person's likeness or the form of an object" | "character reference", "subject lock" |
| `Personalization` / `profile` / `moodboards` (`--p`) | Learned per-user style | "fine-tune", "LoRA" |
| `Edit Model` (`--edit`) | Instruction-based image editing, up to four reference images | "inpainting", "img2img" |
| `Describe` | Image-to-prompt reversal | "reverse prompt", "caption" |
| `Pan` / `Zoom Out` | Canvas extension | "outpainting" |
| `Seed` | Reproducibility handle | "random seed" |
| `Repeat` (`--r`) / `Permutation` | Batch generation | "batch", "variations" |
| `Variation` | A re-roll of one image | |
| `Upscale` — `Grid Upscale`, `Creative/Subtle Upscale`, `Max Upscale` (legacy) | Three named upscalers with different costs | |
| `Niji` (`--niji`) | Anime-focused model, also a separate `niji · journey` app | |
| `V8.2`, `V8.1`, `V7`, `V6.1` | Model versions, user-selectable via `--v` | "model names" |
| `Explore page` | The public gallery | "community feed", "discover" |
| `Basic` / `Standard` / `Pro` / `Mega Plan` | Four tiers | "Free/Pro/Team/Enterprise" |
| `creations` | The output noun used throughout docs | "generations", "images", "assets", "outputs" |

**Four naming observations.**

1. **`Chaos` vs `Variety` is an admitted, unresolved split.** The docs state it outright: "Chaos (also called **Variety** on midjourney.com)". The Discord-era parameter name is `--chaos`; the web UI relabelled the control to `Variety`, and the flag was not renamed. The docs' response is to title the article `Chaos / Variety` so both terms resolve. This is the **clearest terminology defect in the file** and also the most instructive: when a UI rename cannot propagate to an API-like surface, dual-naming the documentation is the least-bad mitigation. The same problem appears with the Discord preset `🖌️ Stylize med`, which names a value the docs express numerically.

2. **Every parameter has a plain-English name that is *not* the flag.** `--s` is `Stylize`; `--oref` is `Omni Reference`; `--sw` is `Style Weight`; `--bs` is `Batch Size`. The Parameter List grid leads with the human name in bold and puts the flag last. This lets users talk about "turning up the stylize" in Discord and lets the docs be searchable by concept. The discipline is near-total: only `Niji`, `Seed` and `Tile` have names identical to their flags.

3. **Modes, not states.** Eight `X Mode` constructions (`Fast`, `Relax`, `Turbo`, `Draft`, `Conversational`, `Stealth`, `Public`, `Raw`). Everything the system can be in is framed as something the user chose. Combined with the absence of a status page, this means Midjourney's vocabulary has **no words for system conditions at all** — only for user selections. A striking and probably deliberate absence.

4. **`GPU time` is a hardware-honest unit.** Where Runway abstracts to `credits` and Descript to `AI credits`, Midjourney exposes the underlying resource and the physical reason it is scarce. The cost is that users must reason in minutes-per-image; the benefit is that the cost model is self-explaining — nobody asks "but what *is* a GPU minute?" the way they ask what a credit is. The cell-phone-data analogy carries the rest.

## T14 Voice, tone & accessibility

**Person and tense.** Second person throughout the docs ("your images", "you can adjust", "tell Midjourney what you don't want"). First-person plural in the manifesto and policies ("We're a community-funded research lab", "We have 4 main rules", "we'll tell you if Midjourney made it"). The product is addressed as an entity the user instructs — "tell Midjourney", "giving Midjourney more freedom", "Midjourney will simplify it" — which anthropomorphises the model as a collaborator with discretion. That framing is consistent and does real work in the stylize/chaos explanations, where the dial is described as how much latitude you grant.

**Register: enthusiastic, exclamatory, deliberately unintimidating.** Exclamation marks are everywhere in the docs and almost nowhere else: "Control, customize, and enhance your images with parameters!", "Weird is a fun tool that spices up your images", "Want your images super fast? Turbo Mode is for you!", "allowing your creative ideas to wander into new, exciting places!", "This helps Midjourney understand exactly what to leave out". The homepage manifesto by contrast is grave and slow ("we aren't at the end of time, or the beginning"). Community Guidelines sits between the two and ends on "Most importantly, have fun!"

**Tone does not flatten as stakes rise** — Community Guidelines is exclamatory in places while prohibiting CSAM, and the closing "have fun!" follows "Any violations of these rules may lead to bans from our services." Compare the Wise gradient. Recorded as a weakness.

**Metaphor is the primary teaching device**, used consistently for abstract controls: stylize is "a slider"; GPU time is "like the data you get with a cell phone plan"; `--no` is "like making a 'no entry' list". Three different domains, each chosen for a control whose behaviour has no visible referent.

**Thumbs-up / thumbs-down icons** are used as a formatting device across the docs (👍/👎) to mark good and bad examples in `Prompt Basics`, `Parameter List` and `No`. A consistent, language-independent visual grammar for "do this / not this" across the whole documentation set.

**Typographic conventions** `[observed]`: flags are always in `code formatting`; `==Important:==` and `==Note:==` highlight markers appear in the aspect-ratio and GPU-speed articles; bolded lead-ins introduce named rules; bullet sub-lists carry constraints.

**Accessibility content** `[observed]`

- `Skip to main content` is present on docs pages (Zendesk template) and **absent from midjourney.com**.
- Docs alt text is **filename-derived, not descriptive**: `![parameter-syntax.png]`, `![stylize-header.png]`, `![chaos-header2.png]`, `![web-imagine-prompt-stylize.png]`, `![discord-imagine-prompt-weird.png]`, `![thumb-down-icon.svg]`, `![settings-icon.svg]`. For a documentation set whose subject is *visual difference*, the images carrying the before/after comparisons have no textual description at all. The `--ar` article is the one exception: `![Examples of images in different aspect ratios overlaid on a grid]`, and `--no` has `![Examples of using --no in prompts]`.
- **This is the most serious accessibility finding in the batch**: a blind or low-vision user can read every word of the Stylize article and learn nothing about what stylize actually does to an image, because the demonstration is entirely in an untagged header image. The prose partly compensates by describing the effect in words, which is fortunate rather than designed.
- Homepage alt text is minimal: `![Eye]`, `![Pen]`, `![People]`, `![Face]`, `![Heart]`, `![Brain]`, `![Hand]`, `![Lips]` — the icons are named but their meaning (product categories, mostly `TBA`) is not conveyed.
- **No accessibility statement page exists.** No link in nav, footer or policies. `[absent]`
- The homepage's entire nav and content set is duplicated in the DOM (responsive variants) — `Sign Up`, `Log In`, `Explore` and the version banner each appear twice with slightly different link text. Screen-reader users may encounter the nav twice. Flagged as **suspected, not confirmed**, since CSS may hide one copy.
- Email addresses are obfuscated via Cloudflare email protection, rendering as `[email protected]` in the page source — so the billing and press contact addresses are **not readable without JavaScript**. For the only two contact routes on the homepage, this is a real accessibility and no-JS failure.

**Negative findings, recorded honestly**

- `Chaos` (flag, docs) vs `Variety` (web UI) — one control, two names, admitted in the docs and not fixed.
- `V8.1` referenced in the GPU Speed article's version notice while the rest of the site is on `V8.2`.
- `Learn more.` ships with the full stop inside the anchor; the same banner renders two different link labels.
- Two help hosts: `docs.midjourney.com` (all content) and `help.midjourney.com` (linked from the homepage).
- No status page anywhere, for a queue-based product.
- No pricing page on the marketing site; pricing lives in a docs article.
- `Stealth Mode` — a privacy control — is documented under `Billing Support`, and privacy is a $60/month upgrade over a public default.
- Docs images are filename-alt-texted; the visual comparisons that are the point of the parameter articles are inaccessible.
- Homepage contact emails are JS-obfuscated.
- The Parameter List grid includes `--oref` with a parenthetical noting it is "(replaced by the Edit Model in V8.X)" — a superseded parameter left in the primary list rather than moved to `Legacy Features`.
- "Our decision making process is not a democracy" and "Most importantly, have fun!" appear within six bullets of each other.

---

## Transferable patterns

1. **The parameter-deck formula.** "\<Benefit verb phrase\> with the \<plain name\> parameter: `--flag` or `--short`" — benefit, human name, syntax, one line, every time. A user who reads only decks can build a working mental index of thirty controls. Transfers to any product exposing flags, filters, modifiers or advanced options.
2. **Three syntax rules, four annotated counter-examples, one base string.** Hold the prompt constant and vary only the error, with the error named in bold beside it. This is the fastest self-diagnosis affordance in the corpus and costs four lines.
3. **Explain a dial by naming what each end costs you.** "it could stray from the exact details of your prompt"; "may not stick as closely to your prompt". Direction alone is not guidance — the trade is the guidance. Condition: requires you to actually know and be willing to state the downside.
4. **Give every flag a plain-English name that is not the flag.** `--s` is `Stylize`. Lets the concept be searched, spoken and taught independently of the syntax, and survives UI renames.
5. **Borrow an existing billing mental model rather than teaching a new one.** "Think of GPU time like the data you get with a cell phone plan." Condition: only when the analogy is genuinely structural (finite, depletes with use, resets monthly) — a false analogy is worse than no analogy.
6. **Give expiry its own article and say "vanishes".** Two sentences, repeated in three places, never softened. Any use-it-or-lose-it allowance should be this legible.
7. **Publish the null result of your verification tool.** "`No Midjourney metadata found.` — That doesn't mean Midjourney didn't make it." Naming the three everyday actions that destroy your provenance signal is the difference between a trust tool and a false-confidence tool.
8. **Document how your own moderation classifier misreads innocent input.** The `--no modern clothing` → "no modern" + "no clothing" warning. Costs nothing, prevents a support ticket and a user's sense of being unfairly flagged.
9. **State the four rules short, then state them long.** A memorable four-item list above the enforceable text. The short list is what users actually carry.
10. **Dual-name the doc when the UI and the API disagree.** `Chaos / Variety` in the title so both search terms land. The mitigation, not the fix — but the right mitigation.
11. **Counter-example — do not hide pricing in the docs.** Midjourney has no pricing page, no status page, and files its privacy control under billing. It survives this on reputation. Nothing here is transferable except the warning.

## Caveats & gaps

- **`docs.midjourney.com/hc/en-us` (the docs home) is client-rendered** and returned only a heading. The section and article pages render server-side and were captured normally. The docs home's own IA (search prompt, featured cards) is therefore unknown.
- **`help.midjourney.com` was not fetched.** It is a second, separately-hosted support surface referenced from the homepage and from Community Guidelines. Its IA, ticket forms and article set are unharvested, and it may contain the FAQ, contact and status content this file marks `[absent]`.
- **`midjourney.com/verify` was not exercised.** The three result strings are quoted from the `Content Authenticity` article describing them, not observed in the tool. They are `[documented]`, not `[observed]`.
- **Policy bodies not opened:** `Terms of Service`, `Privacy Policy`, `AB2013 Documentation`, `Public Summary of Training Content`, `Data Deletion and Privacy FAQ`, `Midjourney Trademark Policy`. Only titles are recorded.
- **Parameter articles not opened:** `Quality`, `Seed`, `Repeat`, `Tile`, `Version`, `Raw Mode`, `Image Weight`, `Style Reference`, `Omni Reference`, `Edit Model`, `Personalization`, `Draft & Conversational Modes`, `Multi-Prompts & Weights`, `Legacy Features`, `Pan`, `Video`. The flags and one-line descriptions for these are taken **verbatim from the Parameter List grid**; their value ranges, defaults and caveats are unknown and are **not** stated in this file. No parameter behaviour has been inferred or extrapolated.
- **No in-product strings.** The Imagine bar, settings panel, moderation warnings, job queue, error messages and empty states are all behind sign-in. T5's input design is reconstructed entirely from documentation.
- **No pricing localisation checked**; all figures USD.
- **Version volatility.** The site announces V8.2; the docs reference V8.2, V8.1, V7 and V6.1 in different articles. Parameter availability is version-dependent and several articles carry version caveats. Every parameter fact in this file should be treated as accurate for V8.2 as documented on 2026-09-21 and no later.
- **Discord-side copy** (bot responses, command output, `/info`, `/settings` menus) is not a public web surface and is unharvested, though several Discord strings are quoted secondhand in the docs.

## Sources

1. https://www.midjourney.com/
2. https://docs.midjourney.com/hc/en-us
3. https://docs.midjourney.com/hc/en-us/categories/32013335627533-Documentation
4. https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List
5. https://docs.midjourney.com/hc/en-us/articles/32023408776205-Prompt-Basics
6. https://docs.midjourney.com/hc/en-us/articles/31894244298125-Aspect-Ratio
7. https://docs.midjourney.com/hc/en-us/articles/32196176868109-Stylize
8. https://docs.midjourney.com/hc/en-us/articles/32099348346765-Chaos-Variety
9. https://docs.midjourney.com/hc/en-us/articles/32390120435085-Weird
10. https://docs.midjourney.com/hc/en-us/articles/32173351982093-No
11. https://docs.midjourney.com/hc/en-us/articles/32016412137741-GPU-Speed-Fast-Relax-Turbo
12. https://docs.midjourney.com/hc/en-us/sections/28005319720845-Plan-Information
13. https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans
14. https://docs.midjourney.com/hc/en-us/articles/27870521824653-Subscription-Fast-Time-Expiration
15. https://docs.midjourney.com/hc/en-us/articles/32013696484109-Community-Guidelines
16. https://docs.midjourney.com/hc/en-us/sections/33329694407821-Midjourney-Policies
17. https://docs.midjourney.com/hc/en-us/articles/48207461163661-Content-Authenticity
