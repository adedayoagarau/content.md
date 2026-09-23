# 167. Descript

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Transcript-based audio/video editor (creator tooling, generative speech) |
| Primary URL | https://www.descript.com/ |
| Corpus rank | 167 |
| Benchmark strength (source list) | Transcript-based editing guidance |
| Locale / market observed | en-US |
| Platform observed | Web (marketing), help centre (Mintlify-rendered docs), status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a as a regulated sector. Self-declared compliance posture only: SOC 2 Type II, GDPR, SAML SSO / SCIM. Voluntary membership of the Content Authenticity Initiative. No AI-specific regulator named. |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | Full for the flagged strength (transcript editing, named AI features, voice-clone consent). Partial elsewhere — in-product error/empty/toast strings are `[documented]` via help docs, not observed. Two legacy/current marketing templates coexist and were both captured. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://www.descript.com/ | Hero, five-stage workflow, feature naming, 7-question FAQ block |
| Pricing | https://www.descript.com/pricing | Plan names, dual billable units (media hours + AI credits), 100+ row comparison table, 7-question FAQ |
| Video editing (product) | https://www.descript.com/video-editing | 14-question FAQ — richest FAQ on the site; names Overdub lineage |
| Underlord (AI agent) | https://www.descript.com/underlord | Agent positioning, a rotating carousel of ~17 example user prompts |
| Studio Sound | https://www.descript.com/studio-sound | Named AI effect; "regenerative" vs "subtractive" explanation |
| Regenerate | https://www.descript.com/regenerate | Audio-repair feature page |
| Ethics Statement | https://www.descript.com/ethics | Consent-verification principle, 2-question FAQ |
| Help centre home | https://help.descript.com/hc/en-us (serves `help.descript.com/.md`) | Task-question IA, four activity groups |
| Help: Edit like a doc | https://help.descript.com/getting-started/edit-like-a-doc | The core mental-model article |
| Help: Generate text-to-speech audio | https://help.descript.com/ai-speech/tts | Tone tags, model selection, known limitations |
| Help: Create a custom voice clone | https://help.descript.com/ai-speech/custom-speaker | **Verbatim consent statement and refusal list** |
| Help: How billing works in Descript | https://help.descript.com/billing-payments-plans/overview | Drive-level billing, proration worked examples |
| Status | https://status.descript.com | Component tree mirrors the AI feature taxonomy |

---

## T1 Navigation & IA labels

**Global nav — three dropdowns plus two flat items** `[observed]`

`Features` · `Solutions` · `Resources` · `Underlord` · `Pricing` · `Contact sales` · `Sign in` · `Sign up`

Underlord (the AI agent) is promoted **out of the Features dropdown into the top level**, sitting beside `Pricing`. The agent is being treated as a peer of the pricing page rather than as a feature.

**A second, older nav template is still live on `/ethics`** `[observed]` — same site, different IA:
`Features` · `For Work` · `Pricing` · `Contact sales` · `Resources`, with feature groupings named by *user outcome* rather than function:

- `Use Cases`
- `AI Features` → sub-grouped `Market / Promote`, `Look Good`, `Sound Good`

`Look Good` / `Sound Good` is the most quotable IA decision on the site: the AI features are filed under the two things a nervous on-camera person actually worries about, not under "Video" and "Audio". This grouping **does not survive** into the current nav, which is a regression worth recording.

**Footer groupings** `[observed]`: `Features` · `Product` · `Resources` · `Company` · `Guides` · `Tools`, then two standalone links `Descript for teams` / `Descript for enterprise`. `Status`, `Changelog` and `Feature Requests` all sit under `Product` as first-class links. `Ethics` sits under `Company` beside `Privacy` and `Terms` — an ethics statement given the same footer weight as a legal document.

**Help centre — activity groups, not product areas** `[observed]`

Four left-hand group labels, each a bare verb: `Edit` · `Create` · `Repurpose` · `Manage`.

| Group | Cards inside |
|---|---|
| `Edit` | `Script editing`, `Visual editing` |
| `Create` | `Record`, `Text to speech` |
| `Repurpose` | `Translate & lip-sync`, `Create clips` |
| `Manage` | `Billing & plans`, `Login & access`, `Team & workspace` |

Three feature cards are hoisted above the groups as coloured tiles with eyebrow labels: `Your AI co-editor` → `Underlord`, `Connect your tools` → `MCP`, `Programmatic access` → `API`. The eyebrow answers "why would I care", the heading gives the noun.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> H1: `AI Video Editor`
> H2: `AI-editing for every kind of video`
> Body: "Direct your AI co-editor to do your video editing for you, or do it yourself with intuitive editing tools. With Descript, video editing is as easy as typing."

The H1 is the search term, not a slogan — a visible SEO/brand compromise where the H1 is a category label and the actual positioning lives in the H2 and body. The differentiating claim is the final clause, deferred to last position.

**The workflow spine — five one-word stages, numbered** `[observed]`

`Record` → `Edit` → `Refine` → `Share` → `Multiply`, presented as `01`–`05` with a section header `The whole workflow, right here`.

`Multiply` is the coined one. Four of the five are standard post-production verbs; the fifth invents a stage for repurposing one asset into many. Naming distribution as a *production stage* rather than a downstream chore is the structural move.

Each stage body is written in fragments with a conversational cadence:
- `Record` — "Some footage you shot. A script you wrote. A Zoom call. Whatever you've got, drop it in."
- `Edit` — "Edit your words to edit your video." then "The timeline's there if you need it."
- `Share` — "Export like *snap*."

**Headline pattern: claim, then immediate deflation** `[observed]`

- `Studio Sound. No studio required.`
- `Don't re-record. Regenerate.`
- `Can't find the perfect B-roll? Generate it.`
- `Every size, every shape, every platform.`
- `Make impossible edits possible`
- `Rather do it yourself? That's easy too.`

The dominant shape is **two beats separated by a full stop or question mark**, where beat one names the old pain and beat two names the product. This is used consistently enough to read as a house rule.

**Self-deprecating / anti-hype register** `[observed]`

- "Enterprise teams at Amazon, Canva, Salesforce, and tons of others use Descript. Is that good enough for you?"
- "These companies use Descript. Not bad!"
- "turn your long-form video or podcast into clips that (might) go viral (maybe)."
- "Surely there's one for you" (pricing section header)
- "It's as easy as it sounds."

The nested parentheticals in "(might) go viral (maybe)" are a deliberate hedge on the one claim the product cannot control. Compare the Wise pattern of bounding a claim with a footnote: Descript bounds it with a joke instead. Cheaper, but it does the same disclosure work.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Global nav | |
| `Sign in` | Global nav | |
| `Get started for free` | Hero, page foot | Price stated in the CTA |
| `Get started` | Pricing cards (paid tiers) | `for free` dropped on paid tiers — the differentiator is carried by the button text |
| `Get started for free` | Pricing card (Free tier) | |
| `Book a demo` | Business section, page foot | |
| `Talk to sales` | Enterprise pricing card | **Inconsistent with** `Contact sales` (nav) and `Contact us to learn more` (enterprise block) — three labels, one destination |
| `Contact sales` | Global nav | |
| `Contact us to learn more` | Enterprise block, pricing page | |
| `Edit video now` | AI-tools section | Verb + object + urgency |
| `Clean up your audio` | Studio Sound block | |
| `Start editing with Underlord` | Underlord block | |
| `Make clips now` | Clips block | |
| `Generate some video` | Generative block | The indefinite "some" is doing tone work — low commitment |
| `Start your podcast` | Use-case carousel | |
| `Try Studio Sound for free` | Studio Sound page hero | |
| `See templates` | Templates block | |
| `Learn more` | Underlord block on feature pages | The one bare `Learn more` found |
| `Report a problem` | Status page | |
| `Subscribe to updates` | Status page | |

**Observation.** Every mid-page CTA is an **imperative naming the specific job** (`Clean up your audio`, `Make clips now`), while every top-of-funnel CTA is generic (`Get started for free`). The specificity increases as the user gets deeper into a feature page — the opposite of the common pattern where a site opens specific and ends generic.

**Defect:** three labels for "talk to a human" on adjacent surfaces.

## T4 Onboarding & getting-started

**The core mental model is taught in one sentence, then in one action** `[documented]` — help article `Edit like a doc`:

> "Edit audio and video the way you'd edit a doc: change the transcript, and Descript updates the underlying media automatically—no timeline required."

The teaching sequence is worth copying:

1. **Analogy first** — "the way you'd edit a doc".
2. **Mechanism second** — "This transcript isn't just a reference — it's directly linked to your media."
3. **Consequence, twice, as parallel clauses** — "Delete a word from the transcript, and that word disappears from your audio or video. Cut and paste a sentence, and the media moves with it."
4. **Instructions only after the model is set** — numbered steps for delete and move, using the keyboard shortcuts the user already knows (`⌘X`, `⌘V`).

Step 4 is the payoff of steps 1–3: the article never teaches a new interaction, it only claims that an existing one now has a new effect. For an unfamiliar mental model this is the whole trick — **reassign meaning to a known gesture rather than introduce a gesture.**

**Anxiety is pre-empted inline, not in a FAQ** `[documented]` — immediately after the delete instructions, a callout headed `Need to bring back deleted content?`:

> "Editing in Descript is non-destructive. Even after you delete something, the media is still there — just hidden from your composition."

then names the exact menu item, `Restore removed media`. The reassurance is placed at the exact moment the user would feel the fear, and it resolves to a named control rather than a promise.

**Distinguishing near-identical operations** `[documented]` — the article names four edit operations and separates them by *effect on each surface*, not by mechanism:

| Operation | What it does (as written) |
|---|---|
| Delete | removes from transcript and media |
| `Remove from transcript` | "Keeps the audio or video but hides the text from your script, captions, and exported transcripts." |
| `Ignore` | "Crosses out the text but keeps it visible in the script." |
| `Correct your transcript` | fixes typos, words, speaker labels |

Descript also ships a dedicated help article named `Deleting vs ignoring script text`. Writing an explicit disambiguation article for two adjacent destructive-looking controls is a content-ops decision worth flagging.

**Marketing restates the same model three different ways** `[observed]`:
- "Edit your words to edit your video."
- "If you know how the backspace key works, or how to copy-and-paste, then you already know how to make video in Descript."
- "It's a total game-changer for speed and sanity." (user quote, doing the emotional register)

The middle one is the strongest: it defines the prerequisite skill as something the reader definitionally already has.

## T5 Form & field labels

Pre-auth form surfaces are thin; the substantive input design is `[documented]`.

**Voice-clone creation flow** `[documented]` — labels in order:
`Add speaker` → `Create speaker` → `Enable speech generation` → `Choose your microphone` → `Record` → `Submit`

`Enable speech generation` is the label that gates consent. Note it is phrased as a *capability toggle*, not as "Create voice clone" — which arguably under-signals the gravity of what follows. The consent script only appears after this click.

**Text-to-speech / tone-tag input** `[documented]` — the highest-value input pattern on this product:

- Mode label: `Write mode`; exit control: `Done writing`
- Speaker assignment: press the **`@` key** on a highlighted paragraph
- Tone control: a `Tone` button (wave icon) in the selection toolbar
- Tone presets named: `serious`, `sigh`, `laugh`, `long pause`, plus `Custom`
- Syntax: tags are written **in parentheses**, rendered as grey text in the script
- Constraint stated: "Custom tone tags can't be longer than 150 characters."

**Where a tag is visible is documented as a table** `[documented]`:

| Surface | Visible? |
|---|---|
| Your script (in the editor) | "Yes — gray text in parentheses" |
| Generated audio | "Interpreted by the model, not spoken aloud" |
| Exported transcripts | "Yes — included as text" |
| Captions | "No" |
| Share page transcript | "No" |

This is the single most reusable artefact in the file. A control whose output leaks unevenly across five downstream surfaces is exactly where users get burned, and Descript resolves it with a five-row table instead of prose. Any product with annotations, internal notes, or prompt fragments that may or may not export should copy this shape.

**A deprecated syntax is handled as a blocking validation, and the migration is written out** `[documented]`:

> Warning heading: `Square brackets no longer supported for tone`

The body states that `[whispers]` / `[sigh]` are not supported on v3 or v4, that "Descript will block AI speech generation and prompt you to fix it", and gives the migration ("replace any square-bracket prompts with parentheses, or use the **Tone** button"). Naming the old syntax verbatim so a user searching for their own broken string lands on the fix is good practice.

**Inline notes** `[documented]` — same parenthesis syntax, different purpose: "Inline notes let you annotate non-speech content like "\[cough]" or "\[laughter]"". Note the doc's own example uses square brackets *inside* the parenthesis convention, which reads as a small internal inconsistency against the tone-tag warning above.

## T6 Status & state language

**Status page component tree = the AI feature taxonomy** `[observed]`. Descript's status page does not list "API", "Web", "Database". It lists user-facing AI capabilities, grouped under the agent's name:

`Desktop App` · `Web App` · `Project Editor` (`Editing`, `Live Collaboration/Project Sync`, `Media Playback`, `File upload/sync`) · `Underlord - Audio` (`Transcription`, `Generated speech`, `Cleanup`, `Studio sound`, `Roomtone extraction`) · `Underlord - Video` (`Automatic multicam`, `Avatars`, `Center active speaker`, `Eye contact`, `Green screen`, `Image generation`, `Video Regenerate`) · `Underlord - Other` (`Create clips and reels`, `Translate`, `Suggestions`, `Agent`) · `Recording` (`Rooms`, `Recorder`, `Squadcast`) · `Publishing` · `Integrations` · `Account Management` · `Infrastructure` · `API / MCP`

Two things follow. First, **each AI feature can fail independently and the user is told so** — `Avatars` at `99.83%` while `Green screen` sits at `100%`. Second, third-party dependencies are named in the open under `Infrastructure`: `Google Kubernetes Engine`, `Stripe`, `PubNub`, `Stytch`, `Zendesk`. Publishing your vendor list on the status page is unusually candid and lets a user attribute an outage correctly.

Overall state line, first person plural: `We're fully operational` / "We're not aware of any issues affecting our systems." The hedge in the second sentence ("not aware of") is honest about the limits of monitoring.

**Generation states** `[documented]` — TTS docs describe generation as an operation with a completion gesture (`Done writing`) rather than a progress state. A named post-generation state change exists: AI speech must be `convert[ed] to a standard audio layer` before timeline edits, fades or crossfades work. The doc states this as a behavioural difference — "AI-generated speech behaves differently from recorded audio" — which is a state distinction the user cannot see but must know.

## T7 Error, failure & recovery

All `[documented]`; nothing observed live.

**Help articles use plain symptom titles in the user's voice** `[documented]`:

- `Audio isn't generating`
- `Mispronounced words`
- `Black frames appear after generating TTS`
- `Unexpected background noise`
- `I'm not happy with my voice clone. How can I improve it?`
- `My voice doesn't match my accent`
- `Can I create different styles of the same voice?`

Two patterns. Symptom-first fragments (`Black frames appear after generating TTS`) for things the system did; first-person sentences (`I'm not happy with my voice clone`) for things the user is dissatisfied with. The split maps to blame: the system's fault gets a neutral description, the subjective complaint gets the user's voice. This is a cleaner version of the Wise confession-title pattern.

**A generative-AI-specific failure class is documented as limitations, not errors** `[documented]` — the TTS page carries a `Known limitations` section listing four items in plain language:

- generation with v3 is "slightly slower" than Multilingual v2
- "**Tone and voice continuity.** You may notice inconsistencies in how the output from this model sounds across paragraphs. This can include shifts in tone, volume, accent, or even speaker identity."
- "**Custom tone tags are experimental.**" — with the failure mode named: longer descriptive prompts "may be spoken aloud instead of treated as direction"
- "**Tone tag scope.**" — "The model decides how long the effect lasts — Descript doesn't control which exact words a tag applies to."

The last two are the standout. Descript states, in user-facing docs, **which parts of the behaviour it does not control**, and gives a workaround for each ("try shortening it"; "Use paragraph breaks to reset the delivery"). For probabilistic features this is the honest alternative to pretending determinism. The phrase "or even speaker identity" is remarkably unvarnished — it concedes the voice may stop sounding like the person.

**Recovery is offered as a multi-step manual workaround where no fix exists** `[documented]` — the `Black frames appear after generating TTS` answer opens with the cause ("TTS and Regenerate don't work over sequences") then gives a five-step **Workaround:** including keyboard shortcuts and the named `Blade tool`. Labelling it "Workaround" rather than "Solution" is accurate and unusual.

**Root-cause attribution back to the user's input** `[documented]` — `Unexpected background noise`: "Artifacts usually come from the original training audio", then a bulleted list of what to avoid. The failure is traced to the input the user supplied without blaming them for it.

## T8 Empty states

`[absent]` — no no-data, no-results, or first-run strings reachable on public surfaces. All editor empty states sit behind sign-in. The help home's search field placeholder (`Try 'Eye Contact' or 'update my billing'`) is the closest pre-auth analogue: it seeds the empty input with one AI feature and one account task, which is a reasonable proxy for "the two things people come here for".

## T9 Notifications & system messages

`[documented]`, thin.

- Voice clone: "You'll receive a confirmation once your AI Speaker is ready (typically within minutes)." — completion notification with an expectation attached.
- Status page offers `Subscribe to updates`.
- Announcement bar (legacy template, `/ethics`): `Introducing Underlord` / "A new AI-powered editing assistant, right inside Descript" — eyebrow-plus-sentence banner format.
- Homepage V-bar equivalent on the current template is absent; the launch banner only survives on the stale page.

No toast, push, or transactional-email copy is publicly reachable. `[absent]` for those.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** Strongest content in this file.

### Voice-cloning consent — the verbatim artefact `[documented]`

From `Create a custom voice clone`, the full consent statement the speaker must read aloud, reproduced here because it *is* the UI string:

> "I want Descript to create an artificial version of my voice that I can use to create speech that sounds like me. I am training my voice by reading the following statement. Imagine a big blue ball spinning in space. That's our Earth. On it, there are tall mountains, deep oceans, and huge forests with animals. In cities, people talk, play, and work."

Structurally this is two documents welded together. Sentences 1–2 are the **consent**, written in the first person, present tense, naming the exact thing being made ("an artificial version of my voice") and the exact use ("to create speech that sounds like me"). Sentences 3–6 are the **training sample** — deliberately banal, phonetically varied, emotionally neutral prose about a blue ball and mountains.

Welding them means **the consent cannot be separated from the biometric sample**: you cannot produce usable training audio without having spoken the authorisation, and you cannot fake the authorisation without producing audio in the voice being cloned. The consent *is* the proof of consent. That is the transferable idea, and it generalises well beyond voice — any consent that can be embedded in the artefact it authorises is harder to forge than a checkbox.

Note also: the statement must be read **in English** "even if you're creating non-English text-to-speech audio", and delivery quality during the consent read *shapes the clone* ("your delivery during the consent script directly shapes how your AI Speaker sounds"). The compliance step and the quality step are the same step, so the user is motivated to do the compliance step well. Elegant, though it does mean non-English speakers must read an English legal sentence.

### The refusal list, written as a list `[documented]`

> "Descript cannot create voice clones for:"
> - `A deceased individual`
> - `A non-consenting person`
> - `Someone unable to record the consent statement`
> - `Audio from an AI or artificial source`

Four bullets, no hedging, no "we reserve the right to". The verb is `cannot`, not "may not" or "will not permit" — framed as a product limitation rather than a policy the company chooses to enforce. Bullet three is the operationally honest one: it concedes that anyone who cannot physically speak is excluded, which is a real accessibility cost stated plainly rather than hidden. Bullet four closes the recursive loophole (cloning a clone).

Enforcement stated in one sentence: "Any attempt to bypass this process is a breach of Descript's Terms of Service."

### Third-party consent has its own named path `[documented]`

Sub-heading: `Create an AI Speaker for a third-party` — "If your collaborator can't record directly in the app, have them send you a recording of the consent statement." The consent artefact is portable; the requirement is not waived. Compare ElevenLabs (product 170), which refuses third-party professional clones outright. Two defensible answers to the same problem, and the divergence is worth noting in any comparative work.

### Ethics statement `[observed]`

Page title `Descript Ethics Statement`, meta-description "With great innovation comes great responsibility." The page opens by naming the thing most vendors avoid naming:

> "Generative media — the field of research that relates to "deep fakes" and other forms of synthesized audio and video —"

Putting "deep fakes" in the first line of your ethics page, in quotes, as a definition, rather than burying it. The page then states the ownership principle in one sentence — "We believe you should own and control the use of your digital voice" — and ties it to the mechanism: training "depends on verbal consent verification, ensuring that our customers can only create text to speech models that have been authorized by the voice's owner."

Two FAQs, both of which decline to claim more than is true:

- `What is preventing other individuals/organizations from using similar technology with malicious intent?` — answer concedes nothing prevents it, and expresses a hope that competitors adopt similar constraints.
- `What can be done to detect deep fakes?` — answer opens **"It's unclear."** and states that generation quality may outpace detection.

"It's unclear" as the first two words of an answer on a company's own ethics page is the most striking single string in this harvest. It is the correct answer and almost nobody writes it.

**Defect / staleness:** the ethics page footer reads `© Descript 2024` while every other page reads `© Descript 2026`, and the page runs the previous nav template. An ethics statement that has visibly not been touched in two years, on a page whose subject changed substantially in that window, undercuts the content itself.

### Metered-billing disclosure `[observed]`

Descript meters on **two** units simultaneously and defines both in a pricing FAQ:

> Q: `What are media hours and AI credits?`
> A (summarised): media hours count uploaded and in-app-recorded media regardless of whether it is transcribed; AI credits count usage of AI features — Underlord, Studio Sound, Green Screen, Eye Contact, and AI-generated media and avatars.

The media-hours definition contains the important carve-out — metered on **ingest, not on transcription** — so the parenthetical "(though you still have the option to transcribe them)" pre-empts the natural assumption that you are paying for the AI step. Good, and placed in the definition rather than a footnote.

**What is not disclosed publicly.** There is no published credit cost per operation. The pricing page states only entitlements (`400 AI credits / month`) and the FAQ names which features consume credits, but no rate table exists on the marketing site — a user cannot calculate, pre-purchase, how far 400 credits goes. Contrast Runway (168), which publishes per-model credit rates on the pricing page itself. **This is the single largest disclosure gap in Descript's pricing content.**

**Run-out behaviour** is disclosed only obliquely, via the comparison-table row `Top up media minutes` / `Top up AI credits` (excluded on Free and Hobbyist, included on Creator and Business) and the card bullet `Access to top ups for more media hours and AI credits`. What actually happens when a Free or Hobbyist user hits zero is never stated. **Rollover/expiry is not stated anywhere on public surfaces.** Both are `[absent]`.

**Billing mechanics are disclosed well** `[documented]`, in the help centre rather than on the pricing page:

- `Each drive has its own subscription` — "If you own more than one drive, you'll see multiple charges on your account from Descript—one for each drive's plan." Pre-empts the duplicate-charge support ticket by name.
- `Billing is processed at the start of the cycle` — with the non-obvious rule spelled out: the date "is determined by when the drive subscription was created, not when payment was last collected."
- `Upgrades take effect immediately; downgrades occur at the end of your current billing cycle` — the heading itself carries the whole rule.
- Two worked numerical examples, labelled `Example scenario A` and `Example scenario B`, each running date → action → cost → next renewal. Proration explained with real figures ($65 / $32.50 / $130) rather than the word "prorated" alone.

The worked-example pattern is directly transferable to any proration or fee-change disclosure.

**Enterprise AI-governance controls, as named bullets** `[observed]`: `AI and data controls: opt-out of training, custom retention` and `Custom AI Controls`. Training opt-out is sold as an enterprise entitlement, which implicitly discloses that it is not available below Enterprise. Also on the homepage FAQ: "Your Project Information is confidential, even from Descript."

**AI output honesty, on the marketing page** `[observed]` — homepage FAQ `Will the AI edits look obviously AI?`:

> "They shouldn't. The goal is footage that looks like you shot it in the room, not something that looks processed. you control how far the AI goes, or turn it off."

"They shouldn't" — a hedge, not a promise — followed by a user-control escape hatch. (The lowercase "you" mid-answer is a live typo.)

**Provenance** `[documented]`: membership of the Content Authenticity Initiative is stated on the ethics page as an intent to "create a set of industry standards to combat misinformation". **No C2PA implementation, watermark, or output-labelling claim is made anywhere.** Compare Runway and ElevenLabs, both of which claim C2PA in product. This is a real gap for a product that ships voice cloning and lip-sync.

## T11 Help-centre architecture

Two-layer: four activity groups (`Edit` / `Create` / `Repurpose` / `Manage`) → cards → articles. The help home headline is a question in the user's voice:

> `What are you trying to do?`

with the search placeholder `Try 'Eye Contact' or 'update my billing'` and a `Popular:` row of five pills: `Billing & plans`, `Captions`, `Underlord`, `Text to speech`, `Studio Sound`.

The headline is the whole IA thesis — routing by intent, not by product area — and the card descriptions carry it through. Each card pairs a noun title with a sentence of *effect*:

| Card | Description (verbatim) |
|---|---|
| `Script editing` | "Edit your recording by editing the transcript. Delete a word, or every um, and the footage goes with it." |
| `Visual editing` | "Move, resize, and style what appears on screen." |
| `Record` | "Record your screen, or bring in remote guests with Descript Rooms." |
| `Text to speech` | "Turn a script into a voiceover with AI voices. No mic needed." |
| `Translate & lip-sync` | "Translate your video into other languages, and match the speaker's lips to the new language." |
| `Create clips` | "Pull the best moments from long videos into short, shareable clips." |
| `Billing & plans` | "Payments, invoices, and plan changes." |
| `Login & access` | "Reset your password, or fix sign-in trouble." |
| `Team & workspace` | "Add teammates, set their roles, and manage shared projects." |

Note `Login & access` leads with the failure case ("fix sign-in trouble") inside the description, and `Script editing` re-teaches the core model *in the card description* — "Delete a word, or every um, and the footage goes with it." The mental model is repeated at every level of the IA, which is correct for an unfamiliar model and would be over-explaining for a familiar one.

**Article-title grammar — three shapes:**

| Shape | Example |
|---|---|
| Imperative task | `Generate text-to-speech audio`, `Create a custom voice clone` |
| Declarative explainer | `How billing works in Descript`, `Edit like a doc` |
| Comparison | `Deleting vs ignoring script text` |

Every article carries a one-line italic subtitle that restates the scope in plainer words — e.g. `Create a custom voice clone` → "Enable speech generation by authorizing a custom AI Speaker that speaks in your own voice in Descript." Title for scanning, subtitle for confirming.

**Routing furniture** `[observed]`: every article ends with a `Related topics` list of 4–5 links. There is no visible "Still need help? / Contact us" block on the help home — human contact is reached via a `Get Help / Contact Descript` article linked from the status page. Human support is harder to find here than on most comparable help centres.

**Docs are LLM-addressable** `[observed]`: every page serves a markdown twin (`.md` suffix) and the header advertises `https://help.descript.com/llms.txt` as a complete index. Publishing an agent-readable index of your help centre is a content-distribution decision that will matter more each year.

## T12 FAQs

Three distinct FAQ blocks, differently pitched. Questions verbatim, answers summarised.

**Homepage — 7 questions, objection-handling order** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What is Descript? |
| 2 | How does editing by text work? |
| 3 | Is Descript free? |
| 4 | Is Descript good for beginners? |
| 5 | What files can I bring into Descript? |
| 6 | Will the AI edits look obviously AI? |
| 7 | Is it secure enough for my team or company? |

Ordering: definition → mechanism → price → competence → input → **output quality** → security. Q6 and Q7 are the two AI-era additions. Q6 is the credibility question ("will people be able to tell") and Q7 the procurement question; placing them last means the FAQ escalates from individual curiosity to organisational risk.

Q4's answer is the best on the page: it names the time to first success ("most people make their first cuts within minutes") and then concedes the timeline exists but is optional ("you can make a whole video without touching it"). Answering a "is it for beginners" question by describing what the beginner does *not* have to do is stronger than an adjective.

**Video-editing page — 14 questions, the deepest block** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How does Descript's AI video editor work? |
| 2 | Can Descript automatically edit my video for me? |
| 3 | Can I edit video like a document in Descript? |
| 4 | Does Descript remove filler words automatically? |
| 5 | How does Studio Sound improve my audio quality? |
| 6 | How does Descript's Regenerate feature work? |
| 7 | What is Underlord, and how does it help me edit? |
| 8 | Can I make videos without being on camera? |
| 9 | Does Descript support translation and captions? |
| 10 | Can I collaborate with others in Descript? |
| 11 | What makes Descript different from other video editors like Premiere Pro or CapCut? |
| 12 | Is Descript good for YouTube creators and social media videos? |
| 13 | Does Descript work on Mac, Windows, and the web? |
| 14 | Is Descript free to use? |

Q4–Q7 are a **named-feature run**: each question is "how does \<ProperNoun\> work", and each answer bolds the feature name in its first clause. The FAQ is being used as a glossary with question marks — a legitimate pattern when your product's value is carried by coined feature names the visitor has heard but cannot define.

Q11 names two competitors in the question text, and Q6's answer names the feature's own predecessor: "It's powered by the same technology behind Descript's **Overdub** voice model." That is the only surviving reference to `Overdub` found in this harvest — the brand has been retired and absorbed into `Regenerate`, with the lineage preserved in exactly one FAQ answer. **Anyone searching for Overdub documentation will find only this sentence.**

**Pricing page — 7 questions** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What are media hours and AI credits? |
| 2 | I'm interested in setting up an Enterprise plan for my business. Where can I learn more? |
| 3 | Do I need to enter a credit card to try Descript? |
| 4 | How are subscription payments processed? |
| 5 | Do you offer special rates for students, educators, and non-profits? |
| 6 | How does Descript protect my privacy? |
| 7 | How do I cancel my subscription? |

Q1 is correctly first: the billable units are defined before anything else, because the plan cards are meaningless without them. Q7's answer volunteers more than asked — it names cancellation *and* "delete your account and permanently wipe your data from our servers." Offering the harder exit unprompted, at the end of the pricing page, is a trust move.

**Ethics page — 2 questions** `[observed]`, both covered in T10.

## T13 Terminology & glossary

**PRIORITY SECTION.**

| Term | Descript's usage | The alternative it rejected |
|---|---|---|
| `Underlord` | The AI agent. Also a **status-page namespace** (`Underlord - Audio`, `Underlord - Video`, `Underlord - Other`) and a plan entitlement row | "Assistant", "Copilot", "AI" |
| `AI co-editor` | The role Underlord plays; used more often than "assistant" | "assistant", "copilot" |
| `video agent` | Newer framing on the Underlord page: "Your all-in-one video agent" | co-editor (the two coexist — see below) |
| `vibe editing` | Coined on the Underlord page: "This is vibe editing." | — |
| `Text-based editing` / `Script editing` | Marketing says the former, help centre says the latter | "transcript editing" |
| `Studio Sound` | Noise removal + voice enhancement | "noise reduction", "audio cleanup" |
| `Regenerate` | Audio/voice repair and replacement | `Overdub` — the **retired** predecessor brand |
| `Video Regenerate` | The video-side sibling; appears as its own status component and plan bullet | |
| `Overdub` | Deprecated. Survives in one FAQ answer and one pricing-adjacent phrase | |
| `Remove Retakes` | Cutting duplicate attempts | "remove duplicates" |
| `Shorten Word Gaps` | Pause compression | "trim silence" |
| `Edit for Clarity` | AI content-level edit | "summarise", "tighten" |
| `Eye Contact` | Gaze correction | "gaze redirection" |
| `Create Clips` | Long-to-short repurposing | "shorts", "highlights" (`Highlights` exists separately) |
| `Multiply` | The fifth workflow stage — distribution/repurposing | "Distribute", "Publish" |
| `Scenes` and `layouts` | Visual composition units, explicitly analogised to slides | "templates", "compositions" |
| `composition` | The editable document object | "project", "timeline", "sequence" |
| `drive` | The billing and permission boundary — "Each drive has its own subscription" | "workspace", "team", "org" |
| `Editor` (capital E) | A **paid seat role**, not the app: "1 Editor on a Business drive" | "seat", "user", "member" |
| `AI Speaker` | A voice identity (cloned or stock) | "voice", "voice model" |
| `custom voice clone` / `Custom voice clones` | The cloned-voice product | "voice double", "digital twin" |
| `Stock AI speakers` | Pre-made voices | "library voices" |
| `tone tags` | Delivery-direction markup in parentheses | "SSML", "prompts", "audio tags" (ElevenLabs' word) |
| `Write mode` / `Done writing` | Script-composition state and its exit | "compose", "finish" |
| `Wordbar` | Word-timing control strip | "timing editor" |
| `Media hours` / `media minutes` | Billable unit 1 — **inconsistently pluralised in hours on cards, minutes in the table** | "storage", "processing time" |
| `AI credits` | Billable unit 2 | "tokens", "generations" |
| `Top up` | Buying more of either unit mid-cycle | "overage", "add-on" |
| `Brand Studio` | Team-wide brand control surface | "brand kit" |
| `Rooms` | Remote multi-participant recording | "studio", "sessions" |
| `Roomtone extraction` | Named on the status page only | |

**Three register notes.**

1. **`co-editor` vs `agent` is an unresolved split.** The homepage and pricing pages say `AI co-editor` (and once `agentic video co-editor`); the Underlord page's own H1 says `Your all-in-one video agent`. The homepage's own Underlord block also says `Your all-purpose video agent`. Three phrasings for the product's central concept, on pages that link to each other. This is the clearest terminology defect in the file.

2. **`media hours` vs `media minutes`.** Plan cards say `10 media hours / month`; the comparison table row is `Media minutes (per editor)` with values `600 minutes (10 hrs) / month`. The table's dual notation is the right fix, but the row label and the card label disagree, and the pricing FAQ question uses the *hours* form. A user scanning for "minutes" on the cards finds nothing.

3. **Feature names are Title Case imperatives.** `Remove Filler Words`, `Remove Retakes`, `Shorten Word Gaps`, `Edit for Clarity`, `Center Active Speaker`, `Add chapters`, `Generate video`. The feature *is* the command — there is no gap between the button label and the product name, so the pricing table doubles as a command reference. Cheap, and it makes the entitlement table legible.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout, first-person plural for the company but used sparingly — mostly in the ethics statement ("We believe you should own and control the use of your digital voice", "we will remain in conversation with...") and the status page ("We're not aware of any issues"). On marketing pages the company is largely invisible; the product is the subject.

**Register.** Short, fragmentary, comic. Sentence fragments used as full sentences ("Some footage you shot. A script you wrote."). Contractions everywhere. Frequent rhetorical questions to the reader ("Is that good enough for you?", "Rather do it yourself?"). Em-dash asides. Italic single-word emphasis ("Export like *snap*").

**Humour is load-bearing and occasionally over-reaches.** "make yourself sound smarter (even if you're not)" is a joke at the user's expense in a feature description. "Silence your neighbor's leaf blower" and "Leaf blowers, barking dogs, and other maddening disturbances" are the same gag reused across two pages. The register does *not* flatten as the stakes rise the way Wise's does: the pricing page still says "Surely there's one for you". It does flatten correctly in two places — the consent documentation and the billing help articles are entirely straight — which suggests the gradient exists but is applied at the help-centre boundary rather than by topic.

**Numbers as trust devices** `[observed]`: `4.6 Average Rating`, `837 Reviews`, `More than 6 million creators & teams`, `reduced post-production time by up to 50%`, `saved 116 hours`, `increased content production by 100%`. Each attached to a named company. Note "up to 50%" — the only hedged one, and correctly so.

**Accessibility content** `[observed]`

- Accessibility is treated as a **user benefit of a feature**, not as a product property: "Add captions — and accessibility, and views, and pizazz — in a couple clicks." Bundling accessibility between "views" and "pizazz" sells it, but frames it as an audience-reach feature rather than an obligation.
- `Translate captions` and `Translate audio (dubbing)` are separate entitlement rows; `Translation proofread` is Business-only — so the accuracy check on accessibility output is a paid upgrade.
- Alt text on marketing pages is mostly **the feature name repeated** (`![Record](...)`, `![Smooth over awkward edits](...)`, `![Eye Contact](...)`) — functional for logos, thin for the screenshots where the image carries the explanation. Customer-logo images use the brand name as alt, which is correct.
- Help-centre screenshots carry real descriptive alt: "Done writing button in Write mode", "Animated screen recording showing the addition of inline notes in Descript", "Convert to audio option in the clip context menu". **Docs alt text is markedly better than marketing alt text** — a common split, recorded here as a finding.
- **No `Skip to content` link found** on the marketing pages inspected. ElevenLabs (170) has one.
- **No accessibility statement page exists.** `[absent]` — no `/accessibility` link in the footer, nothing under `Company`. For a product whose captions feature is marketed on accessibility grounds, the absence of its own accessibility statement is a notable gap.

**Negative findings, recorded honestly**

- `Contact sales` / `Talk to sales` / `Contact us to learn more` — three labels, one destination.
- `AI co-editor` / `video agent` / `all-purpose video agent` / `agentic video co-editor` — four framings of Underlord across four pages.
- `media hours` (cards, FAQ) vs `Media minutes` (table row).
- `/ethics` runs a stale nav template and reads `© Descript 2024`.
- Homepage FAQ answer contains a lowercase sentence start: "you control how far the AI goes".
- The `Edit like a doc` help article contains an unresolved placeholder link: `https://help.descript.com/hc/en-us/articles/[insert-id]` — a published broken link in the single most important onboarding article.
- Studio Sound's feature grid mentions "stock AI speakers in 20+ languages" while the TTS help doc lists 19 named languages and the pricing table says `25 languages` for transcription and `30+ languages` for translation. Three different language counts for three different things, none cross-referenced.
- No per-operation AI-credit rate published anywhere public.
- No rollover, expiry, or exhaustion behaviour published for either billable unit.

---

## Transferable patterns

1. **Teach an unfamiliar mental model by reassigning a familiar gesture, not by introducing a new one.** "If you know how the backspace key works... you already know how to make video in Descript." Condition: only works when the new behaviour genuinely maps onto the old gesture one-to-one. Where the mapping is partial, this backfires — which is exactly why Descript needs the separate `Deleting vs ignoring script text` article.
2. **Weld the consent to the artefact it authorises.** The spoken consent statement doubles as the voice-training sample, so the authorisation cannot be separated from the biometric it authorises. Generalises to any high-stakes consent that can be embedded in the thing being consented to rather than collected as a separate checkbox.
3. **State refusals as a bulleted list using "cannot".** Four bullets naming exactly who a voice clone cannot be made for, including the accessibility-costly case. Directly transferable to eligibility, KYC, and product-limitation copy where a paragraph currently hides the exclusions.
4. **Publish a visibility matrix for any annotation that leaks across surfaces.** The five-row tone-tag table (script / audio / transcript / captions / share page) resolves the exact confusion that generates support tickets. Any product with notes, tags, internal comments, or prompt fragments should ship this table.
5. **Name what the model does not control.** "The model decides how long the effect lasts — Descript doesn't control which exact words a tag applies to." For probabilistic features, documented non-determinism plus a workaround beats implied determinism.
6. **"It's unclear."** as a legitimate opening to an ethics FAQ answer. Condition: only credible when the surrounding page has already committed to concrete mechanisms — the honesty reads as confidence because the consent flow behind it is specific.
7. **Worked numerical examples for proration.** Labelled scenarios running date → action → cost → next renewal, with real figures. Directly reusable for any mid-cycle plan change, fee change, or partial refund disclosure.
8. **Make the status page mirror the feature taxonomy, and name your vendors.** Per-AI-feature uptime lets a user attribute a failure correctly; a public `Infrastructure` list (Stripe, Zendesk, PubNub, Stytch) pre-empts "is it you or me".
9. **Counter-example — do not meter on two units without publishing the rate of either.** Descript names `media hours` and `AI credits`, defines both, and never says what an operation costs. The definitions create the expectation of a rate table; its absence is more conspicuous than a single opaque unit would be.

## Caveats & gaps

- **All in-product strings are `[documented]`, not observed.** Error toasts, validation messages, empty states, progress copy, and the actual consent-flow UI were reconstructed from help articles. The consent statement text is quoted from documentation and should be re-verified in-product before use as precedent.
- **T8 Empty states is genuinely empty.** Nothing public.
- **FAQ answers on marketing pages were retrievable** (unlike the Wise exemplar) because Descript renders accordion bodies server-side. Answers are summarised here per schema rules; the underlying text is available at the source URLs.
- **Two marketing templates are live simultaneously.** `/ethics` serves an older nav, older footer and a 2024 copyright. Any nav or footer claim in this file should be checked against which template served it — both are recorded above.
- **Not harvested:** `/enterprise`, `/teams`, `/security`, `/terms`, `/privacy`, `/research`, the templates gallery, the changelog, the blog, the API/MCP docs, and the majority of the help centre (only four articles opened).
- **No pricing localisation checked.** All figures observed are USD on a US-served session.
- **Mobile app and desktop-app in-product copy** are out of the public web surface.
- **Descript's help centre serves markdown twins and an `llms.txt` index**, which made extraction unusually clean here. Findings about article structure may therefore be *better* than what a human browsing the rendered HTML experiences; the rendered help home was not visually inspected.

## Sources

1. https://www.descript.com/
2. https://www.descript.com/pricing
3. https://www.descript.com/video-editing
4. https://www.descript.com/underlord
5. https://www.descript.com/studio-sound
6. https://www.descript.com/regenerate
7. https://www.descript.com/ethics
8. https://help.descript.com/hc/en-us (served as https://help.descript.com/.md)
9. https://help.descript.com/getting-started/edit-like-a-doc
10. https://help.descript.com/ai-speech/tts
11. https://help.descript.com/ai-speech/custom-speaker
12. https://help.descript.com/billing-payments-plans/overview
13. https://status.descript.com
