# 174. Riverside

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Remote recording studio / browser-based multi-track podcast and video production with local recording |
| Primary URL | https://riverside.fm/ (301-redirects to https://riverside.com/) |
| Corpus rank | 174 |
| Benchmark strength (source list) | Recording readiness and status |
| Locale / market observed | en-US. Site language switcher offers English / Deutsch; help centre offers English (United States), Deutsch, Español, Français, Português |
| Platform observed | Web (marketing), Zendesk help centre at support.riverside.com, Atlassian Statuspage at status.riverside.fm |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated product. Compliance signals in copy: SOC 2 Type II, ISO 27001, an AICPA SOC badge in the footer, and a CCPA question answered in the AI help article ("Is customer personal data sold or shared as such terms are defined under the CCPA?" — "No."). **No consent-to-record string was found on any public surface** |
| Harvest date | 2026-09-22 |
| Pages inspected | 17 |
| Harvest completeness | Partial — the terms and privacy pages were not fetched, so cancellation, refund and retention terms are uncaptured; studio-creation form fields and all in-product empty states are behind auth. The pricing page carries **two mutually irreconcilable sets of recording-hour entitlements plus a stale legacy comparison table**, so no plan limit in this file should be treated as canonical |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://riverside.com/ | Hero, 5-step flow, section headers |
| Pricing | https://riverside.com/pricing | Plans, compare table, FAQ. **Two conflicting entitlement sets** |
| FAQ | https://riverside.com/faq | Five groups, ~28 questions |
| Help centre index | https://support.riverside.com/hc/en-us | Eight categories, each with a scope line |
| Recordings status guide | .../articles/5457425335965 | **The canonical four-state lifecycle** |
| Has my recording finished uploading? | help article | Upload-completion strings |
| Join a studio as a guest | .../articles/5252042203037 | **The guest flow, computer and mobile** |
| Guest checklist and tips | help article | Pre-recording readiness copy |
| Partial high quality tracks | help article | The recovery state |
| My track is stuck uploading | .../articles/19135749320093 | **The highest-stakes warning in the batch** |
| I can't record… browser errors | .../articles/5947545867805 | Four verbatim error strings |
| I see the error 'Your connection is unstable' | .../articles/5601441044125 | Bandwidth thresholds |
| Guests can't enter the studio… | .../articles/9187798779805 | Three access-denied strings |
| Reset mic and camera permissions | .../articles/5252093048221 | Permission-denied wording |
| I see the error 'Device storage is running low' | .../articles/18254718741149 | Storage state |
| Glossary | .../articles/5599382543389 | **The coined-vocabulary source** |
| AI at Riverside | .../articles/20173322157341 | Opt-in vs built-in AI |
| Status page | https://status.riverside.fm | 13 components |

**Domain-migration finding.** `riverside.fm` now 301-redirects to `riverside.com`, and the help centre lives at `support.riverside.com`. Both domains coexist in live copy: hundreds of in-article links still point at `support.riverside.fm` and `riverside.fm/mac-app`, invite emails come from `notifications@Riverside.fm`, the status page is still `status.riverside.fm`, and one article contains the typo'd URL **`Riverside.con/upload`**. The footer reads `© 2024 RiversideFM, Inc.` on a 2026 page.

---

## T1 Navigation & IA labels `[observed]`

**Global nav:** `Platform` · `Solutions` · `Resources` · `For Business` · `Pricing` · `Contact Sales` · `Login` · `Start for Free`

**`Platform › Products` — six products, each with a sub-descriptor, and the descriptors do the disambiguation:**

| Product | Descriptor |
|---|---|
| Recording | "4K video and audio recorder." |
| Editing | "AI, text-based video editor." |
| Live Streaming | "For livestreams in full HD." |
| Webinars | "Host, record, and repurpose." |
| Hosting | "Podcast publishing and analytics." |
| Newsletters | "Create and send newsletters." |

Five of six descriptors state a *capability with a quality bound* (`4K`, `full HD`) or a *verb chain*. That is a good pattern for a multi-product nav: the label says what it is, the descriptor says what it does *and* how good it is, in under eight words.

`Platform › Features`: All AI Tools, Magic Clips, Transcribing, Magic Audio, AI Co-Creator, AI Translation, AI Twin, Captions, AI Show Notes, Social Scheduling. `Platform › Apps`: Mac App, MCP, Mobile Apps.

**Help-centre top-level categories — all eight verbatim, each with a scope line.** This is the strongest IA artefact in the file:

| Category | Scope line (verbatim) |
|---|---|
| `Setting up your recording session` | "Learn how Riverside works, adjust your virtual Studio's settings, and configure live streaming." |
| `Recording equipment and setup guides` | "Gain insights and recommendations on how to use your equipment with Riverside." |
| `Recording in the studio` | "Learn best practices, join a studio, manage the recording session, and participate as a guest." |
| `Editing your content` | "Customize your clips with our in-house editing suite." |
| `Hosting, sharing, and publishing` | "Download your content and share it for the world to hear." |
| `iOS, MacOs, and Android app` | "Record on Riverside using the mobile or desktop app." |
| `Account, subscription, and billing` | "Manage account and billing, change your subscription plan, and become an affiliate." |
| `Riverside for Business` | "Gather your team, set up SSO, and use the features exclusive to Riverside's enterprise-level plan." |

The tree is ordered as a **production timeline** — before, equipment, during, after, distribute — with apps, account and business appended. Three of the eight are gerund phrases naming the user's activity (`Setting up`, `Recording in`, `Editing your`, `Hosting, sharing, and publishing`), which is the Wise pattern. The scope lines are comma-runs of verbs, also the Wise pattern. And critically, **`Recording in the studio` explicitly names the guest as an audience in its scope line** — "and participate as a guest" — which is the first signal that Riverside models guests as a distinct population.

Casing defect in category 6: `MacOs`.

Help-centre H1 and search prompt: `How can we help you?` · utility link `Go to Riverside` · `Toggle navigation menu`.

**Footer defects** `[observed]`, and there are many: `Blog` appears twice (one is `#`), `Press` appears twice (one `#`, one pointing at a Comeet *jobs* URL), `Apps` appears twice, `Support` and `Impressum` are `#` dead links, and `Product Videos` also points at the jobs URL.

## T2 Value proposition & headline patterns `[observed]`

**Hero**

> H1: `Create your best content yet`
> Subhead: `Riverside is the AI-powered platform that lets you record, edit, repurpose, and distribute studio-quality content as easily as if you had a crew behind you.`
> Under-CTA footnote: `*No credit card needed. Free plan available.`
> Chips: Podcasts · Interviews · Webinars · Live streams · Social clips · Video marketing · Transcriptions

`as easily as if you had a crew behind you` is the load-bearing clause. Riverside's whole promise is **replacing absent people**, not replacing equipment — and the subhead says so in nine words. Compare the section header `Studio-level quality. No studio required.` which makes the equipment claim, and `Your all-in-one studio. Ready when you are.` which makes the availability claim. Three different absences resolved: crew, studio, schedule.

**The recurring headline construction is `<Aspiration>. <Negation of its usual cost>.`** `[observed]`:
- `Studio-level quality. No studio required.`
- `Powerful editing. Purposefully simple.`
- `End to end content creation. All in one flow.`
- `Stream everywhere. All at once.`
- `Your all-in-one studio. Ready when you are.`
- `Clips. Posts. Thumbnails. Headlines. Done.`

Two beats, the second one removing the thing the first normally requires. It is a tight, repeatable template and Riverside uses it at least six times.

**The five-step flow named as five words** `[observed]`: under `End to end content creation. All in one flow.` — `Record` / `Edit` / `Repurpose` / `Stream` / `Publish`. `Repurpose` sitting as a peer of `Edit` is the positioning choice: it asserts that turning one recording into many assets is a first-class stage of production, not a post-process.

**Section headers** `[observed]`: `From concept to content, without ever leaving Riverside.` · `Made with Riverside` · `Let AI make you sound like a pro` · `Want to speed things up? Let AI jump in.` · `Your episode's ready` · `Hours of editing, done in seconds.` · `Edit recordings like a doc` · `Captions that match your vibe` · `Podcast hosting built right in` · `Turn one webinar into weeks of content` · `Built for marketers and producers`

`Edit recordings like a doc` is the best concept-teaching headline in the file — six words that hand the user an existing mental model (word processor) for an unfamiliar operation (transcript-based video editing). `Turn one webinar into weeks of content` converts a feature into a unit-economics claim.

**Social proof** `[observed]`: `4.8` / `On G2 with 1,582 reviews` — an unrounded review count, which is the Wise trust-number practice.

**Pricing page** `[observed]`: `Not sure which plan you need? Let us help you` · `Find your right plan in 60 seconds.` — a plan-chooser framed by time cost rather than by question count.

## T3 CTA inventory

| Label (verbatim) | Location |
|---|---|
| `Start for Free` | Nav ×2, hero, after most sections, final CTA |
| `Get Started` | Homepage, after the Colin & Samir quote — **inconsistent case** with `Get started` on pricing |
| `Get started` | Pricing, Free column |
| `Book a demo` | Homepage business section; pricing Business column |
| `Learn More` | Homepage business section |
| `Contact Sales` | Global nav |
| `Start 14-day free trial` | Pricing plan cards |
| `Start free trial` | Pricing compare table — **inconsistent with the card above it** |
| `Cancel` / `Confirm` | Pricing plan-switch modal |
| `See full comparison →` | `/faq` |
| `Skip to main content` | Marketing (`#main`) and help centre (`#page-container`) |
| `See all articles` | Help-centre category blocks |

**In-product CTAs quoted in help articles — the high-value set** `[documented]`:

`Join session` (invite email, computer) · `Join Session` (invite email, mobile — **casing conflict on the same button across two platforms**) · `Request Camera Permissions` · `Allow camera and mic` · `Allow` · `Allow while visiting this site` · `Allow access` → `While using the app` (mobile) · `Join Studio` · `Join` (mobile lobby) · `Done` (mobile lobby) · `Leave` · `Stop` · `Send instructions` · `Send` · `Notify` · `View Recordings` · `People` (sidebar toggle) · `Use as a second camera` · `My Uploads` (Android settings).

**`Request Camera Permissions` is the most interesting CTA in the batch.** It is a button the *product* renders before the *browser* renders its own permission prompt — a deliberate pre-prompt. The user clicks a Riverside button whose label states exactly what is about to happen, and only then sees the Chrome dialog. That converts an unexplained OS-level interruption into a user-initiated action, which is the standard fix for permission-denial rates, and Riverside has it as a named, labelled control rather than as a modal with a paragraph of explanation.

Note also `Send instructions` (in-studio) and `Notify` (recordings dashboard) — **two labels for the same job**, emailing a guest their upload-recovery instructions.

## T4 Onboarding & getting-started

**Homepage how-it-works** `[observed]`: `Record` → `Edit` → `Repurpose` → `Stream` → `Publish`.

**Getting-started help titles** `[observed]`: `Riverside basics: Overview` · `Record and edit on Riverside: Overview` · `Participant roles: Overview` · `Glossary` · `Community guidelines` · `AI at Riverside: Everything you need to know` · `How does Riverside work differently than other recording platforms?`

That last title is doing real work. It is a help article whose entire job is **correcting the mental model a user brings from Zoom** — and putting it in the getting-started set rather than in troubleshooting means Riverside expects the wrong model to be the first obstacle, not a later one.

**Help articles carry a metadata tri-line** `[observed]`: `Who:` / `Plan:` / `Device:` — e.g. "Hosts and producers" / "All plans" / "Computer browser, mobile app, MacOS app". Three-axis scoping at the top of every article, so a guest on a phone on the free plan knows in one glance whether an article applies. This is the single cheapest, most copyable thing in the file.

### The guest join flow — computer, verbatim steps `[documented]`

Opening reassurance: `You're almost ready to join the virtual studio and start recording with your host on Riverside.`

1. Click the **Join session** button in an invite email or click a studio access link.
2. Under **Let's check your devices**, enter your **name**.
3. If new to Riverside, click **Request Camera Permissions** … Click **Allow**.
4. Use the menus to select the correct **camera**, **microphone**, and **speaker**.
5. Select whether you are using **headphones**.
6. On the left side of the page, preview your video.
7. Click **Join Studio**. If you see **Waiting for host to accept**, the Host or Producer must let you in. "The studio opens in a new tab."
8. "After the recording ends, please leave your browser tab open until you see the **Successfully uploaded ✔** confirmation."

A `Good to know` note follows: "When the host starts recording, your computer automatically saves your high-quality audio and video and begins uploading the data to Riverside."

**Three things to extract.**

First, **the flow opens with the finish line, not the first step.** `You're almost ready` is said to someone who has done nothing yet. It is a deliberate effort-underclaim aimed at a non-user who did not choose this product and may be minutes from a live call.

Second, **step 5 is `Select whether you are using headphones` — a question about the physical world, mid-form.** Most products detect or ignore this. Riverside asks, because the answer determines echo cancellation, and asking is cheaper than getting it wrong. It is the clearest example in the batch of a form field that exists to prevent a downstream failure the user could not diagnose.

Third, **step 8 extends the flow past the end of the task.** The guest's job is not finished when the recording stops; it is finished when a checkmark appears. Riverside puts that in the numbered join instructions, at the top of the session, before the guest has any reason to care — because afterwards they will not be reading.

### The guest join flow — mobile `[documented]`

Download app → tap link or tap **Join Session** in the invite email (from `notifications@Riverside.fm`) → on the **lobby screen**, preview video and enter **Your Name**, tap **Done** → tap **Allow access**, then **While using the app** → toggle camera/mic → choose orientation → rotate icon for front/back camera → `•••` → **Use as a second camera** (iOS only) → tap **Join** → "keep the app open until you see **Upload complete!** Relaunch the app if you closed it too early."

Note the mobile flow's closing clause — **`Relaunch the app if you closed it too early`** — pre-empts the failure in the same sentence as the instruction. The computer flow does not carry an equivalent.

**Host setup flow, titles only** `[observed]`: `Invite your participants: Overview` → `Invite participants to record in your studio` → `Schedule a studio session` → `Generate a QR code` of the studio invite → `Send recording invite from Google Calendar`.

## T5 Form & field labels `[documented]`

**The lobby heading is the pre-recording check, and its name is a sentence:**

> **`Let's check your devices`**

First-person plural, contraction, present tense, and it frames a technical gate as a shared task. Not "Device settings", not "Check your setup", not "Audio & video". The `Let's` does the work of making a compliance step feel collaborative — and it appears at the exact moment a guest is most likely to bail.

| Field / control | String | Note |
|---|---|---|
| Name (computer) | `name` | |
| Name (mobile) | `Your Name` | **Inconsistent with computer** |
| Device selectors (guest article) | `camera`, `microphone`, `speaker` | |
| Device selectors (permissions article) | `camera`, `microphone`, `audio output` | **Third device labelled two ways** |
| Headphones | "Select whether you are using **headphones**." | |
| Chrome permissions | toggle on **Microphone** and **Camera** | |
| Edge permissions | dropdown next to **Camera** or **Microphone** → **Allow** | |
| Upload-recovery form | "Enter the guest's email address" → **Send** (studio) / **Notify** (dashboard) | Two labels, one job |
| Live stream | `Stream URL`, `Stream Key` | |

**Recording-quality settings referenced by name** `[documented]`: `Change default resolution in the studio`, **standard resolution**, `Change audio sample rate in the studio` (default 44.1 kHz, changeable to 48 kHz), `About Riverside frame rates`, `About auto volume control (audio normalization)`, `Noise Reduction`, `Echo Cancellation`, `Smart Mute`, `Upload control`.

Two related lobby articles name the readiness checks Riverside expects a guest to perform: `Select mic and camera inputs in lobby` and **`Check your framing and lighting in the studio lobby`**. The second is a *craft* check, not a technical one, and it is in the lobby documentation — Riverside treats "do you look right" as part of readiness alongside "does your mic work".

**Not observed:** studio-creation form fields (behind auth).

## T6 Status & state language — PRIORITY

### The canonical track lifecycle — four named states, published as a sequence

From the Recordings status guide `[documented]`:

> "Before you can download a high-quality track, it goes through these statuses: **1) Recording**, **2) Uploading**, **3) Processing**, **4) Ready**."

That sentence is the artefact. A product whose core failure mode is invisible to the user has published **the full state machine, numbered, in one sentence, on a public page**. Each state then gets a definition and, crucially, a failure hint:

| State | Definition / failure hint |
|---|---|
| **`Recording`** | "The participant is still recording in the studio." If it still says Recording after the call ends, "the host may have closed the studio without stopping the recording." Recovery: host returns and stops it |
| **`Uploading`** | Hosts and producers open **People** in the studio sidebar and "see an upload percentage next to each participant's name." After the recording ends "all participants can see an upload progress bar at the bottom of the screen where each **take** is displayed that shows a time estimate for each participant" |
| **`Processing`** | "Riverside is encoding and syncing the participant's track data. Your recording has been successfully uploaded, and your guests are free to close Riverside." Tracks can be at different stages simultaneously |
| **`Ready`** | High-quality track available in the editor; downloadable as **CFR MP4** or **WAV** |

**The `Processing` definition is the best single state string in this batch.** It does three jobs in two sentences: says what the system is doing in technical terms, restates the user-relevant fact ("has been successfully uploaded"), and then issues a permission ("your guests are free to close Riverside"). The whole anxiety of remote recording is "can I close the tab yet", and this state answers it inside the state definition.

**Two additional terminal states** `[documented]`:
- **`Error`** — "If a participant's tile shows an incomplete upload, it might be due to them leaving the studio early."
- **`Couldn't be processed`** — and the only instruction is "Contact Riverside support for more help processing the track." **No self-serve recovery is offered for the one state a user cannot cause.** That is a gap worth recording: the four documented states each have a fix, and the fifth, which is Riverside's own failure, routes straight to a human.

### Upload-completion confirmation — four different strings for one state

| String | Where |
|---|---|
| `Successfully uploaded` with ✔ | Recordings status guide; Join a studio as a guest |
| `Uploaded` with a check icon, top of the Studio page | Has my recording finished uploading? |
| `Upload Complete` **or** `100% Uploaded` | Guest checklist and tips |
| `Upload complete!` | Join a studio as a guest (mobile) |

**This is the single clearest inconsistency in the corpus.** The most safety-critical confirmation in the product — the string a guest is told to watch for before closing a tab that holds an unrecoverable recording — is written four ways across four guest-facing pages. A guest instructed to wait for `Successfully uploaded` who sees `Uploaded` has no way to know these are the same thing.

### "Do not close" instructions — also four variants `[documented]`

- "Participants should keep their browser window or mobile app open until they see the **Successfully uploaded** ✔ status, even after the recording stops."
- "please leave your browser tab open until you see the **Successfully uploaded ✔** confirmation."
- "keep the app open until you see **Upload complete!** Relaunch the app if you closed it too early."
- "**Leave the Riverside browser window open** until you see **Upload Complete** or **100% Uploaded**."
- "It's important that your local file is 100% uploaded before closing the Studio."

Reassurance qualifier, repeated: "tracks do continue to upload even if your computer is in sleep mode."

The *instruction* is right in every variant — name the exact stop condition rather than saying "wait a moment". The failure is that the stop condition is named differently each time.

### Mobile completion state — the richest status copy found `[documented]`

> "When everything finishes uploading and processing, the status bar updates to **Your recording is ready!** and you'll see a checklist for **Files uploaded**, **Transcribed**, **Magic Clips created**, and **Polished up**."

A four-item post-processing checklist with named, user-legible stages — and the last one is `Polished up`, which is plain language for an opaque automated pass. Also: "Keep the app open until all tracks reach 100%." Android settings expose **`My Uploads`**; the Mac app has an **`Upload Status`** screen.

### Partial and recovery states `[documented]`

**`partial high quality track`** — defined as "a recording that hasn't finished uploading after a studio session… Riverside only has part of a participant's recording." Casing is unstable: lowercase in the article title, `Partial High Quality Tracks` in the H2.

The auto-recovery behaviour is quantified:
> "Fifteen minutes after the call ends or the recording stops, Riverside will automatically begin uploading and processing the partial high-quality track. The participant's tile will indicate the amount of hours and minutes of high-quality track available."

And the consequences are spelled out rather than hidden:
- "after 30 minutes, you can edit the recording with partial tracks, however it's *highly recommended* to wait"
- Missing segments "appear as a black video with silent audio" and "are omitted from the transcript"
- "the Editor will be temporarily unavailable to ensure you're creating content with full high quality tracks"
- "If you begin editing with a partial track, **you will need to start a *new edit*** once all the tracks are uploaded."

That last one is the important disclosure: it states the **cost of acting early** in the same paragraph as the permission to act early. The product deliberately blocks the editor to protect the user, then unblocks it at 30 minutes with a warning about rework. Naming the rework — "you will need to start a new edit" — is what makes the warning actionable rather than vague.

Manual controls: `Manually pause or resume a participant's upload`. Glossary: **`Upload control`** = "Setting that allows the host or producer to pause the automatic track upload of a participant to preserve their internet bandwidth during the studio session."

### Local vs cloud vocabulary `[documented]`

- **`High-Quality Track`** — "Media files that are locally recorded by a participant's computer or device." Written four ways across the site: `High-Quality Track`, `high-quality track`, `High Quality Track`, `high quality track`
- **`Cloud Recording`** — "Internet-based files… useful as a backup. (Also called an **internet backup track**.)" Plus **`All Participants Cloud Recording`** = one MP4 with everyone
- **`Local Recording`**, **`Separate track`**, **`Aligned Track File (MP4 / WAV)`**, **`Constant Frame Rate`** (CFR)

Riverside's own framing of the background upload, from `/faq`: "As the session progresses, Riverside uploads everything to the cloud in the background, in real-time." **The term "progressive upload" appears nowhere on the site** — Riverside describes the mechanism and declines to name it, which is arguably correct for a guest-facing product.

### Status page — status.riverside.fm `[observed]`

Overall banner: **`All Systems Operational`**. "Uptime over the past 90 days." / `View historical uptime.`

**All 13 components verbatim:**
`Studio/ Dashboard` · `Recording upload and processing` · `Recording accessibility` · `Editor` · `Studio Access for Hosts` · `Video/Audio availability and quality` · `Studio Access for Guests` · `Mobile availability and recordings quality` · `Homepage` · `Registration` · `Payments` · `Third Party Services in Use` · `Live streaming/ Webinars`

**The host/guest split is enshrined in the status model itself** — `Studio Access for Hosts` and `Studio Access for Guests` are separate components. That is a genuine design decision: Riverside can tell the world that guests cannot get in while hosts can, which is a real and distinct failure mode for a product where the guest is not the customer. Very few status pages model a non-customer population as a first-class component.

Note also `Recording upload and processing` as a single component — the two states the product cares most about, monitored together and named in the user's vocabulary rather than as "media pipeline" or similar.

Two components carry a stray space before the slash: `Studio/ Dashboard`, `Live streaming/ Webinars`.

**Incident-state vocabulary** `[observed]`: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Day-cell copy: `No downtime recorded on this day.` / `No data exists for this day.` / `had a major outage.` / `had a partial outage.` Section labels: `Past Incidents` / `No incidents reported today.` / `Incident History`.

Subscription copy: "Get email notifications whenever RiversideFM Status Page **creates**, **updates** or **resolves** an incident." The SMS variant omits "updates" — a deliberate channel-appropriate narrowing.

## T7 Error, failure & recovery — PRIORITY

### Verbatim error strings

**Browser or device blocking recording** `[documented]`, from the browser-errors article — four strings for one condition:

`"Your computer is not allowing Riverside to record"` · `"Browser preventing recording"` · `"Browser issue"` · `"Browser not allowing to record"`

The first is the best of the four: it names the blocker (`your computer`), the blocked party (`Riverside`), and the blocked action (`record`), in seven words, with no jargon and no blame on the user. The fourth is ungrammatical.

The recovery ladder is **twelve steps, ordered cheapest-first**: restart browser → restart computer → update Chrome/Edge → create a new browser profile → clear cache → switch Chrome↔Edge → confirm mic/camera permission → close other programs "especially any that could be using your camera or microphone" → disable VPN/adblocker/extension/firewall → choose standard resolution → ensure 5 GB free browser space → try another computer or mobile.

And embedded in step 5, italicised, is the most important sentence in the whole ladder:

> "*Do not clear your browser's cache if you have local tracks that have not uploaded yet.*"

A destructive-action warning placed inside a routine troubleshooting step. Riverside knows that the standard advice ("clear your cache") will destroy unrecovered recordings, and has inlined the exception at the exact step rather than in a preamble.

**Connection and bandwidth** `[documented]`: `"Your connection is unstable"` — "Hosts and producers see this as a banner above a guest's name in the **People** panel while the issue persists." Mobile variants: `"Getting studio information"`, `"Connecting you to studio"`, `"Unable to connect to studio"`.

The article then does the thing that defines Riverside's whole content strategy:

> "However, your connection bandwidth does not impact the local **high quality track** you record in the studio."

**That single sentence is the most valuable string in this file.** The product's architecture — record locally, upload in the background — means the scary visible symptom (a lagging call) is *decoupled* from the thing the user actually cares about (the recording). Riverside states the decoupling at the exact moment the symptom appears. Most products would reassure vaguely ("this won't affect your recording"); Riverside names the mechanism and the artefact.

Thresholds published: upload > 5 Mbps, download > 10 Mbps. Pre-call test tool: `test-connectivity.riverside.fm`, with an article `Troubleshooting: System connectivity test`.

**Guest can't get in** `[documented]`: `"Studio isn't live yet"` · `"Live stream locked"` · `"Private studio"`. Diagnosed cause: the invite link was an *audience* link, not a *guest* link. Recovery: the host resends the invite "as **plain text**, like in the body of a new email" — a fix aimed at email clients mangling the link, stated without explaining why, which is defensible for a panicking host two minutes before a call.

**Permission denied** `[documented]`: "you may see an alert ('**Permission Denied**') and need to enable this in your computer's settings"; if accidentally denied, "reset your camera and microphone permissions", with a dedicated article `Troubleshooting: Reset mic and camera permissions for live call`. Device-missing errors get their own titles: `I don't see my camera in the menu of the lobby or studio` and `I don't see my microphone in the menu of the lobby or studio` — two near-identical articles rather than one combined, which is a findability decision, not redundancy.

**Storage** `[documented]`: `"Device storage is running low"` — and the cause is explained in plain terms most products would omit: "As the files are uploaded, or if the upload cannot happen immediately, they are temporarily stored on your device." A user who understands *why* a video call is consuming disk space can act on it; a user who just sees the warning cannot.

### The stuck-upload warning — the highest-stakes string in the batch

`[documented]`, verbatim:

> **IMPORTANT:** **Do not uninstall, delete, update, or log out** of the Riverside app before the upload finishes. This will delete your recording data and it cannot be recovered.

Four prohibited verbs, one consequence, stated as an absolute with no hedge. `it cannot be recovered` is the clause most products soften to "may not be recoverable". Riverside does not soften it, because softening it would cost users their recordings.

Note that two of the four forbidden actions — **update** and **log out** — are things a user would never guess were destructive, and one, **update**, is something the product itself may prompt.

Causes named: "weak or dropped internet connection, or if the app got closed too early." Web recovery: reopen `riverside.com/upload` "Using the same **computer**, **browser**, and **browser profile you used to record**" → close other Riverside tabs → instead open a studio and join it → disable content blockers. Mac: reopen (check the **Upload Status** screen), reboot, update, check the device clock is automatic, try a different WiFi. Mobile: reopen ("Be sure the app is open on your screen, and not just running in the background"), reboot, update, check clock, switch network.

"Using the same computer, browser, and browser profile you used to record" is a three-part precondition that most recovery instructions would compress to "on the same device" — and the third part, browser profile, is the one that actually breaks it.

### Browser support — stated as an explicit exclusion list `[documented]`

"**Edge and Chrome mobile browsers** cannot be used to record with Riverside. Chromebooks and other tablets are not yet supported." / "*Please note:* **Mobile browsers cannot be used to record**".

Unsupported browsers enumerated: beta Chrome/Edge (e.g. Chrome Canary), all mobile browsers, Firefox, Internet Explorer, Chromium-based browsers, Brave, Arc, Opera, Vivaldi. Unsupported computers: Linux, ChromeOS/Chromium, Chromebooks/Chromebox, remote-desktop sessions, ARM with Snapdragon 8cx Gen 3, Apple Vision Pro (with a partial carve-out). Safari caveat: "Safari **cannot** be used to log in or access the dashboard or editor… you must join using a studio link and **stay on the Riverside tab while recording**." And: "Do not use **Incognito/Private** mode."

Publishing the exclusion list rather than only the inclusion list is the right call for a product where the wrong browser is a silent total failure. `Arc`, `Brave` and `Vivaldi` named individually shows the list is maintained against real support volume.

### Troubleshooting title grammar — first-person symptom, consistently `[observed]`

`My live stream isn't working` · `I can't see my scheduled live stream audience, or they can't see me` · `I can't stream to Facebook / LinkedIn / X (Twitter) / YouTube` · `I can't share my screen` · `My Riverside recording has a flickering effect in Final Cut Pro` · `My video frame in the studio is black, green, or blank` · `My video has uneven temperature, inconsistent colors, or looks grainy` · `My video is disrupted, pixelated, flickering, or glitchy` · `My video is not synced with the audio` · `Audio is loud, quiet, distorted, or clipping` · `I can't hear the other person in the studio` · `I hear a hissing sound or hum` · `I hear an echo in the studio` · `I hear static, pops, wind, or glitchy noises` · `My voice is a different pitch in the high-quality track` · `Animations in my studio are freezing` · `Guests can't enter the studio with the studio invite link` · `I can't join a session as a guest or audience member` · `I can't record in the studio due to browser errors` · `I see the error 'Your connection is unstable'` · `I updated Chrome but still get an error` · `I see the error 'Device storage is running low'` · `My track is stuck uploading` · `Configure firewall to connect to Riverside: Guide for IT teams`

**The audio and video symptom titles are the standout.** `I hear static, pops, wind, or glitchy noises` and `My video has uneven temperature, inconsistent colors, or looks grainy` enumerate **four descriptive alternatives per title**, because a user with an audio problem does not know whether their problem is called static, popping or a glitch. The title is written to match whichever word the user would reach for. `uneven temperature` even supplies the technical term alongside the plain ones.

This is Wise's first-person-confession pattern (`I sent the wrong amount`) applied to *symptoms* rather than *mistakes* — and the multi-synonym construction is Riverside's own addition, appropriate to a domain where users lack the vocabulary.

Every troubleshooting article uses the same three-part scaffold: `Follow these steps when:` / `Likely causes:` / `Suggested troubleshooting steps`. Standard sign-off: *"If the issue persists, please contact Support."*

## T8 Empty states `[absent]`

None observed — all empty-state surfaces are behind login. The only near-equivalents are the status page's `No incidents reported today.` / `No data exists for this day.` / `No incidents or maintenance related to this downtime.`

## T9 Notifications & system messages

**The best notification-permission rationale in the batch** `[documented]`, from the guest checklist. Riverside asks guests to **Allow Notifications**, and explains:

> "*This ensures that Riverside can properly process your recordings. You will not receive any notifications from us, unless we detect a recording issue.*"

Two clauses. The first gives the functional reason, the second gives the **negative promise** — we will not use this. "You will not receive any notifications from us, unless we detect a recording issue" converts a permission request from a cost into an insurance policy. Directly reusable for any permission prompt where the honest answer is "we only need this for failures".

**Other** `[documented]`:
- Invite emails come from `notifications@Riverside.fm` with a `Join session` / `Join Session` button
- Upload-recovery email: host clicks `Send instructions` / `Notify`; article `Send upload instructions to a guest`
- Guest reminders: `Do guests get an email reminder before a scheduled recording starts?`
- Webinar registrants "receive a confirmation email with a unique join link and calendar links for Google, Outlook, or Yahoo… reminder emails before the session, a follow-up afterward, and notifications about any changes"
- In-studio banner: `Your connection is unstable`, shown "as a banner above a guest's name in the People panel"
- Post-recording: "look for the upload progress pop-up"
- **No cookie or consent banner appeared** in the fetched HTML

## T10 Disclosures, legal & compliance

### Plans and prices `[observed]`

| Plan | Monthly | Annual | Positioning line | CTA |
|---|---|---|---|---|
| `Free` | `$0` `/month` | | "Jump in and create something" | `Get started` |
| `Pro` | `$29` | `$24/mo`, `Billed $288 annually` | "Create polished, high-quality content" | `Start 14-day free trial` |
| `Grow` | `$39` | `$34/mo`, `Billed $408 annually` | "Go live, engage and grow your audience" | |
| `Webinar` | `$99` | `$79/mo`, `Billed $408 annually` | "Plan, host & repurpose webinars" | |
| `Business` | `Custom` | | "Produce at scale with full control" | `Book a demo` |

**Defect:** `Grow` and `Webinar` both show `Billed $408 annually` despite different monthly rates. And in the compare table the same plans are labelled `Pro + Live Studio`, `Grow+ Live Studio`, `Webinar+ Live Studio` — different names for the same tiers on one page, with inconsistent spacing around the `+`.

### The recording-hour entitlements do not reconcile `[observed]`

- Free card: "Try **2 hours** of multi-track recordings (Separate audio and video tracks)"
- Plan cards: Pro `15 hrs of separate track downloads`; Grow `20 hrs`; Webinar `25 hrs`
- Compare-table row `Separate audio & video tracks`: `2 hours (one-off)` / `5 hours per month` / `15 hours per month` / `Unlimited` / `Unlimited`

**Two sets of numbers, neither labelled as superseding the other, on one page.** A prospective Pro subscriber reads either 15 hours or 5 hours depending on which block they look at. There is also a **stale second compare block** on the same page with legacy column headers `Free / Pro / Tab / Standard / Business` — including a literal column called `Tab` — and `/faq` still refers to "our Free, **Standard**, and Pro plans", a plan name that no longer exists.

Other footnotes `[observed]`: "Annual billing saves you up to 20% - Pro drops from $29 to $24/month, Grow from $39 to $34, and Webinar from $99 to $79." · "Pro gives you 1 studio, Grow gives you 2, Webinar gives you 3, and Business gives you unlimited." · "On Pro, Grow, and Webinar, an additional editor seat is available as an add-on. Business is the only plan with collaborative editing and custom roles built in." · Plan-switch modal: "You will switch to the pro plan for $288 per year." with `Cancel` / `Confirm`.

**AI usage limits** `[observed]`: "Pro users start with 2000 free credits; Business starts with 12000. Once credits are used, you can purchase more." Credits apply to "AI Translation, AI B-Roll, and Animated Clips". The page renders "Al" with a capital i in places.

**No storage quota or retention period was found on the pricing page.** The only storage figures are *device* requirements, not account quotas: "at least **5 GB** of free space on your browser" / "at least **5 GB** of free space on your device" / Mac "only filling up **¾ of your device's total storage space**". A policy article `Inactive Account Policy` exists and was not fetched.

**Recording and export specifications actually seen** `[observed]`: up to **4K** = `3840 x 2160` (glossary: "often referred to as '2160p (4K) video'"), Full HD `1920 × 1080`, Standard HD `1280 × 720`; livestream max **1080p Full HD**; audio **uncompressed 48kHz WAV**, Linear PCM "up to a 16 bit depth", default sample rate 44.1 kHz; downloads as **CFR MP4** or **WAV**; frame rates 24, 25, 29.97 FPS; Business can export **XML**.

### AI data handling — a genuinely good disclosure structure `[documented]`

Riverside splits its AI features into two named classes:

- **"Opt-in AI features"** — "you must actively choose to use them by clicking a button… To opt-out, simply avoid applying the feature."
- **"Built-in AI features"** — "not optional, as they are fundamental to the platform's architecture" — Transcriptions and the Made for You suite. Business users can disable Made for You.

**Naming the non-optional class and saying plainly that it is not optional is the honest move most AI disclosures avoid.** The usual pattern is to present all AI as opt-in and bury the always-on processing. Riverside names both, and then scopes the exception (Business can disable one of them).

Sub-processor commitments are summarised with **per-vendor retention caps**: OpenAI 30 days; Eleven Labs "no longer than needed" then a 28-day archive; Heygen auto-delete after 30 days; Auphonic, Hedra and Pika for the contract duration. Vendors must not use customer data to train their own models. CCPA: "Is customer personal data sold or shared as such terms are defined under the CCPA?" — "No." Ownership claim on `/faq`: "we don't own or use your content in any way." Certifications: SOC 2 Type II, ISO 27001, AICPA SOC badge.

**Consent-to-record wording: none found.** No "this session is being recorded" string appears on any public page. For a product whose entire function is recording other people — including non-users who join by link — the absence of any public consent copy is the most notable compliance gap in this file.

**Cancellation and refund wording: not captured** — it lives in the Account/billing help category, which was not fetched.

## T11 Help-centre architecture `[observed]`

**Tree observed:**
- **Setting up your recording session** › `Riverside basics` · `Studio settings` · `Setup FAQs`
- **Recording in the studio** › `Best recording practices` · `Join the studio` · `Invite participants` · `Host and producer guides` · `Guest and audience guides` · `Share screen and media` · **`Upload recorded tracks`** · `Host a webinar` · `Live streaming` · `Live stream FAQs` · `Recording in the studio FAQs` · `Troubleshoot live streaming` · `Troubleshoot video` · `Troubleshoot audio` · `Troubleshoot studio connection and live recording session` · **`Troubleshoot uploading`**
- Five further categories (equipment, editing, hosting, apps, account, business) with sections not enumerated

`Recording in the studio` carries **seventeen sections**, five of them troubleshooting and two of them dedicated to uploading. The IA tells you where the product breaks: **upload gets its own how-to section *and* its own troubleshooting section**, and troubleshooting is split four ways by symptom domain (live streaming / video / audio / connection) rather than pooled. A user with a hiss knows to open `Troubleshoot audio`.

`Guest and audience guides` as a named section, parallel to `Host and producer guides`, is the IA expression of the guest/host content split.

**Article-title grammar — four clean families:**

1. **`<Topic>: Overview`** — `Join a studio session: Overview` · `Track file uploading: Overview` · `Invite your participants: Overview` · `Studio sidebar: Overview` · `Studio settings: Overview` · `Studio privacy: Overview` · `Public chat: Overview` · `Live streaming: Overview` · `Media Board and screen sharing: Overview` · `Audience member role: Overview` · `Live call-in: Overview` · `Best recording practices: Overview` · `Studio teleprompter: Overview` · `Studio visual effects and virtual backgrounds: Overview`
2. **`<Role>: Details`** — `The host role: Details` · `The producer role: Details` · `The guest role: Details`
3. **Imperative task** — `Add markers while recording` · `Adjust microphone input volume` · `Enable screen share on a Mac` · `Finish uploading a local recording track (computer)` · `Send upload instructions to a guest` · `Check your framing and lighting in the studio lobby`
4. **First-person question or symptom** — `Can I…?` for FAQs, `I can't… / My… / I see the error '…'` for troubleshooting

Plus prefix conventions `Webinar: …`, `Troubleshooting: …`, `Equipment index: …`, and a `Promoted article` tag in listings.

The **`: Overview` / `: Details`** pair is worth noting as a deliberate two-depth convention: `Overview` for a concept, `Details` for a role. A user can tell from the suffix alone whether they are about to read orientation or specification.

## T12 FAQs

**`/faq` is grouped by production stage** — Recording / Editing / Live streaming & Webinars / Business plans / More questions? Questions verbatim; answers in one clause.

*Recording:* `What does "locally recorded" mean?` (per-device recording, background real-time cloud upload) · `So, what recording quality should I expect with Riverside?` · `What happens if my or my guest's browser crashes during a session?` (files survive crashes) · `Can I record with multiple participants?` (up to 10 on separate tracks) · `Do guests need a Riverside account to join the session and be recorded?` (no — link only) · `Can I share my screen while recording?` · `Can I record audio-only sessions?`

The first question is the right first question: **the product's central mechanism, asked in the user's quotation marks.** `What does "locally recorded" mean?` concedes that the term is jargon by putting it in quotes, then defines it. And `What happens if my or my guest's browser crashes during a session?` is the fear question, placed third.

*Editing:* `How do I edit my recording?` · `Do I need to download my recordings to edit them?` · `Can I correct the transcript if something's wrong?` (yes; VideoDub regenerates and lip-syncs) · `Are editing changes destructive?` (no) · `Can I create social clips from my recording?` · `What other AI features does Riverside have?` · `Can I add visuals, music, or branding to my video?`

`Are editing changes destructive?` uses the professional term unglossed — the one place `/faq` assumes domain knowledge.

*Live streaming & Webinars:* `Can I stream and record at the same time?` · `What's the maximum quality for live streaming?` · `Is there a waiting room or backstage area for live sessions?` (answered: "That would be the studio lobby.") · `Can I customize how my livestream looks…?` · `What engagement features are available during live streams?` · `Which platforms can I stream to from Riverside?` · **`Oh, I can run a webinar in Riverside?`** · `Does Riverside support registration and calendar invites?` · `Can I sync with CRMs like HubSpot?` · `Can the audience see how many people are watching?`

`Oh, I can run a webinar in Riverside?` is a self-interviewing question written in an interjection — the FAQ breaking character to announce a newer product line. It is charming and slightly dishonest as an FAQ, since no user has ever asked it that way.

The waiting-room question is the more useful one: it takes the **user's word** (`waiting room`, `backstage`) as the question and answers with the **product's word** (`studio lobby`). That is the correct direction for an FAQ — index on the term the user has, resolve to the term the product uses.

*More questions?:* `Can I try Riverside for free?` · `Is there a time limit on recordings?` (no per-track limit; multi-track hours are plan-capped) · `Can I use Riverside on mobile?` · `Is my content private and secure?`

**`/pricing` FAQ:** `What is a studio?` · `What happens if I go over my monthly separate track download hours?` · `Can I add more editors without upgrading my plan?` · `What are AI Credits and which features use them?` · `Do I need the Webinar plan just to run a webinar, or can I get by with Grow?` · `Should I pay monthly or annually?` · `When does it make sense to talk to Sales about Business?` · `What if I need help choosing the right Riverside plan?` · `What is the Riverside MCP?`

Two of these are unusually candid for a pricing page: `Do I need the Webinar plan just to run a webinar, or can I get by with Grow?` explicitly invites the cheaper purchase, and `When does it make sense to talk to Sales about Business?` frames the enterprise conversation as conditional rather than aspirational.

**Help-centre FAQ sections** — `Setup FAQs`, `Live stream FAQs`, `Recording in the studio FAQs`. The readiness-relevant ones `[observed]`: `Are the recording files kept on my computer?` · `Has my recording finished uploading?` · `Can I leave the session before the recording is over and still have a locally recorded track?` · `Can I host a studio but not be recorded?` · `Can I do a test recording of a screen share, presentation, or with the teleprompter?` · `Can I do a live stream test recording?` · `How can I check my internet bandwidth and set-up?` · `How can I check how many core processors my computer has?` · `What happens if I get disconnected from the studio during a recording?` · `Why do I need to turn off my VPN, browser extensions, or firewall when I record?`

That last one is the model: rather than only instructing the user to disable their VPN, Riverside ships an article answering **why**, which is the question that determines whether they actually do it.

## T13 Terminology & glossary — PRIORITY

Source for most definitions: the help-centre **Glossary**.

### The spatial metaphor is the core naming decision

Riverside names its product surfaces as a **physical broadcast facility**, and it commits:

| Riverside term | Alternative rejected | Evidence |
|---|---|---|
| **`Studio`** | room, meeting, call | Glossary: "you can think of your studio as a 'place'" |
| **`Lobby`** | waiting room | Glossary records the tolerated synonym explicitly: "**Lobby** … (Also known as the **Green Room**.)" |
| **`Take`** | attempt, session #2 | "Record multiple takes" |
| **`Track`** | file, stream | The atomic recorded unit; `Track ID`, `Track file uploading` |
| **`Producer`** | moderator, admin | A named participant role |
| **`Teleprompter`**, **`Lower thirds`**, **`Multicam mode`**, **`Media Board`**, **`Script`** | | All borrowed intact from broadcast |

**`Green Room` is not the primary UI term anywhere.** The glossary names it as an alias; `/faq` answers "Is there a waiting room or backstage area?" with "That would be the studio lobby."; and a separate article is titled `Require guests to wait in lobby (waiting room)` — parenthetically glossing the plain-language term. `Backstage` survives only as a Webinar feature: "Backstage speaker management (hide/show participants)". **`Producer Mode` was not found** — the role is simply `Producer`.

The metaphor is doing real work: it gives a non-professional guest a frame in which "wait in the lobby until the host lets you in" is obviously normal, and it gives the host a frame in which "producer" is obviously a different job from "host". A `waiting room` implies a delay; a `lobby` implies a place you are supposed to be.

### Recording-domain terms and what they reject

- **`Separate track`** = "Audio/video that is recorded locally on each participant's device and is not affected by their internet connection." Note the definition **includes the benefit**, not just the mechanism. Marketing writes it as `Separate audio & video tracks` and `separate track downloads`; the homepage says "Download separate tracks". Rejects *isolated track*, *stem*, *multitrack* — though "multi-track recordings" appears once on the Free plan card
- **`Local recording`** vs **`Cloud recording`** — the product's central opposition, and Cloud Recording's glossary entry names its own rival term: "(Also called an **internet backup track**.)"
- **`Edit`** (noun) = "A media file generated after each recording session" — a risky noun-ification, since `edit` is also the verb the user performs
- **`Project`** = "stores all the content and assets you create from a recording in one place, like a folder" — the simile is supplied
- **`Production`** = Business-only top-level container
- So the hierarchy is **Production › Project › Recording › Edit › Export**
- **`Video frame`** = "Each participant's video is displayed in a frame (or 'tile')" — **the glossary itself admits the competing word**, and the Recordings status guide then uses `tile`, not `frame`: "If a participant's tile shows an incomplete upload…". A live term collision, documented by the product and then lost to it
- **`Upload page`** (`riverside.com/upload`) and **`Upload control`** (host-side pause/resume)
- **Participant roles:** `Host`, `Guest`, `Producer`, `Audience Member`, plus `Registered audience member` and Business roles `Account Owner`, `Admin`, `Director`, `Editor`
- Coined feature names: `Magic Clips` · `Magic Audio` · `Magic Segments` · `Magic Episodes` · `Hooks` · `Made for You` · `AI Co-Creator` · `AI Twin` · `AI Voice` · `AI Show Notes` · `AI Translation` · `AI B-roll` · `VideoDub` · `Find Fluff` · `Filler Words` · `Eye Contact` · `AI Chapters` · `Smart Layouts` · `Smart Mute` · `Async Recording` · `Audiogram` · `Live Call-In` · `Brand Kit` · `Content planner` · `Private Podcasts` · `Riverside University` · `Riverside MCP`
- **`Omnichat`** — but `/faq` calls the same feature **"multichat"**, and the glossary heads it `Omnichat (Live stream chat)`. **Three names for one feature.**
- Notably honest glossary entry: **`Input Monitoring`** — "Riverside does not (yet!) support the ability to hear the audio as you record." A glossary entry that exists to say the feature does not exist.

**Capitalisation is genuinely unstable.** Glossary entries are Title Case (`High-Quality Track`, `Cloud Recording`, `Separate track`, `Upload control`) while body copy uses sentence case (`high-quality track`, `partial high quality track`). `AI B-roll` (lowercase r) in help vs "Generate B-roll" on the homepage vs `AI B-Roll` (capital R) on pricing. `Transcription` is the feature noun in help, `Transcribing` in the nav, `Transcriptions` in the footer.

## T14 Voice, tone & accessibility

### The host/guest split is the headline finding

This is the most distinctive thing about Riverside's content, and it is deliberate.

**Guest-facing copy** is second person, reassuring, and front-loads the finish line. `You're almost ready to join the virtual studio and start recording with your host on Riverside.` It never asks a guest to understand the architecture; it gives them **one job** — "leave your browser tab open until you see Successfully uploaded ✔". Jargon is avoided ("Under **Let's check your devices**, enter your **name**"). The app-side copy is warm to the point of exclamation: `Upload complete!`, `Your recording is ready!`

**Host-facing copy** is diagnostic and grants visibility into *other people's* states: upload percentages beside each name in the `People` panel, `Send instructions`, `Notify`, `Manually pause or resume a participant's upload`, `Confirm that participants' tracks are uploading`.

**Hosts are told to monitor; guests are told to wait.** That asymmetry is enforced all the way down to the status page, which ships `Studio Access for Hosts` and `Studio Access for Guests` as separate components.

The reason this matters as a transferable pattern: **the guest is not the customer, cannot be trained, cannot be emailed beforehand, and only has to succeed once.** Riverside's response is to reduce the guest's model to a single observable condition and give the host all the instrumentation. Any product with a one-shot non-user participant — a payee, an applicant's referee, a document signer, a verification subject — has the same problem.

**Marketing voice** is second person, confident, fragment-heavy, with a running "you don't need X" promise. `/faq` is chattier still, answering with interjections — "Of course.", "Not at all.", "Nope —", "Yep —", "Definitely.", "Absolutely."

### Reassurance patterns worth cataloguing

1. **Name the fear, then neutralise it** — "Your files are safe, even if something goes wrong."
2. **Decouple the visible from the recorded** — "your connection bandwidth does not impact the local high quality track"
3. **Pre-empt the post-call anxiety** — "tracks do continue to upload even if your computer is in sleep mode"
4. **Tell them when you will interrupt** — "You will not receive any notifications from us, unless we detect a recording issue."
5. **Manage live-vs-file expectations** — "your locally recorded track will be higher quality than what you see and hear during the live call."

Number five is the subtlest and most necessary: it tells the user in advance that the call will look worse than the recording, so that a degraded live experience does not read as a failed recording.

**Formatting conventions** `[observed]`: standardised callout labels `IMPORTANT:`, `NOTE:`, `TIP:`, plus recurring headings `Step by step`, `Good to know`, `Learn more`, `Related articles`, `Articles in this section`. `Good to know` is used consistently for the non-blocking mechanism explanation — the thing that is useful but not required to complete the step.

**Accessibility** `[observed]`:
- Skip links on both properties: `Skip to main content` → `#main` (marketing), → `#page-container` (help centre). `Toggle navigation menu` is labelled
- Substantive alt text on homepage photography — "Close-up of a woman with curly hair wearing black headphones and a brown sweater vest over a white turtleneck." · "Central black circle with a waveform icon surrounded by six circles with logos of YouTube, Spotify, Apple Podcasts, Podcast Addict, Pocket Casts, and Castbox arranged in orbit-like dashed lines."
- But **a large number of decorative and functional images carry empty alt**, including the checkbox and check icons in the hero, every FAQ accordion chevron, all the plan-feature check icons on `/pricing`, and the footer logo strip. One homepage image renders as `![](<>)`
- **Help-centre screenshots use raw filenames as alt text** — "Screenshot 2025-11-19 at 13.08.18.png", "web-Partial-Upload.png", "Together multi track.png". This is a consistent defect **across exactly the upload and status articles**, i.e. the most safety-critical content in the product is the least accessible
- Status-page checkmark icons referenced by filename ("check_mono.svg")
- **No accessibility statement or VPAT page was found** in nav, footer, or help-centre categories

**Negative findings, recorded honestly**

- **Four strings for `Successfully uploaded`**, across four guest-facing pages, for the most safety-critical confirmation in the product
- **Four strings for the browser-blocking error**, one of them ungrammatical (`Browser not allowing to record`)
- `Join session` vs `Join Session` on the same email button across platforms; `name` vs `Your Name`; `speaker` vs `audio output`; `Send` vs `Notify`
- `Omnichat` / `multichat` / `Omnichat (Live stream chat)` — three names, one feature
- Four casings of `high-quality track`
- **Pricing page carries two irreconcilable entitlement sets** plus a stale legacy compare table with a column literally headed `Tab`
- `/faq` refers to a `Standard` plan that no longer exists
- `Grow` and `Webinar` both show `Billed $408 annually` at different monthly rates
- Footer: `Blog`, `Press` and `Apps` each appear twice; `Support` and `Impressum` are `#` dead links; `Press` and `Product Videos` point at a Comeet jobs URL
- `© 2024 RiversideFM, Inc.` on a 2026 page
- Typo'd URL **`Riverside.con/upload`** in the Recordings status guide
- Hundreds of live links still point at the migrated-from `support.riverside.fm` domain
- `MacOs` in a help-centre category name; stray spaces in `Studio/ Dashboard` and `Live streaming/ Webinars`
- `Al` rendered for `AI` in places on the pricing page
- **`Couldn't be processed` offers no self-serve recovery** — the only state the user cannot cause is the only one with no fix
- **No consent-to-record copy anywhere on public surfaces**

---

## Transferable patterns

1. **Publish the state machine as a numbered sentence.** "Before you can download a high-quality track, it goes through these statuses: 1) Recording, 2) Uploading, 3) Processing, 4) Ready." Where a process is invisible and slow, naming every state in order — and giving each a failure hint and a recovery — converts "is it broken?" into "which state am I in?". Transfers directly to payment settlement, KYC review, dispute lifecycle, refund processing.
2. **Decouple the scary symptom from the real outcome, at the moment the symptom appears.** "your connection bandwidth does not impact the local high quality track you record in the studio." Any product where a visible degradation does not affect the underlying result should say so inside the warning, not in a FAQ.
3. **Name the stop condition, not a duration.** "leave your browser tab open until you see the Successfully uploaded ✔ confirmation" beats "wait a few moments". Condition: **the stop condition must have exactly one name.** Riverside's own execution fails here — four strings for one checkmark — which is what makes it the clearest cautionary example in the batch.
4. **A pre-prompt button for OS permissions.** `Request Camera Permissions` is a product-rendered control whose label states what the browser is about to ask. It converts an unexplained system interruption into a user-initiated action.
5. **The negative promise in a permission request.** "You will not receive any notifications from us, unless we detect a recording issue." Give the functional reason, then state what you will *not* do with the permission.
6. **State the cost of acting early in the same breath as the permission to act early.** "after 30 minutes, you can edit… however it's highly recommended to wait" plus "you will need to start a new edit once all the tracks are uploaded." Naming the specific rework makes the warning actionable.
7. **Multi-synonym symptom titles for domains where users lack vocabulary.** `I hear static, pops, wind, or glitchy noises`. Four alternatives in one title, so the article matches whichever word the user reaches for. Riverside's extension of the Wise first-person pattern, and the better version for technical symptoms.
8. **Scope every help article on three axes at the top.** `Who:` / `Plan:` / `Device:`. Cheap, and it stops a guest on a phone reading a host-only desktop procedure.
9. **Write the one-shot non-user a different product.** Guests get one job and a single observable success condition; hosts get instrumentation into everyone else's state. Model the two populations separately — in the copy, in the help IA (`Guest and audience guides` vs `Host and producer guides`), and even in the status page components.
10. **Inline the destructive exception inside the routine step.** "*Do not clear your browser's cache if you have local tracks that have not uploaded yet.*" — placed at step 5 of a cache-clearing ladder, not in a preamble nobody reads.

## Caveats & gaps

- **Terms and privacy pages were not fetched.** All legal and AI-data content in T10 comes from the help centre's AI article and `/faq`. **Cancellation, refund and retention terms are uncaptured.**
- **The plan-hour figures are reported as conflicting, not resolved.** Two entitlement sets appear on one pricing page and a third stale table sits below them. Do not treat either set as canonical without a logged-in check.
- **All in-product states are documented, not observed.** Every state name, error string, permission label and form field in T5–T7 is quoted from a help article, not seen rendered. The lobby, the `People` panel, the upload progress bar and `riverside.com/upload` all require an authenticated session or an active recording.
- **Empty states are entirely unobserved** (T8) — they are all behind login.
- **No consent-to-record string was found**, and its absence is reported as a finding about the public surface, not as proof that no such string exists in-product.
- **The features page (`/recording`) and the blog were not fetched**; homepage sections were used instead.
- **Status-page incident copy is unobserved beyond two examples.** The page read `All Systems Operational` at harvest, so the live incident register — where a status page's real voice lives — is only represented by the two quoted publishing-failure and upstream-provider strings.
- **The Account/billing, Editing, Hosting, Equipment and Business help categories were not enumerated** below category level. The section lists in T11 are complete only for `Setting up your recording session` and `Recording in the studio`.
- **Domain migration is mid-flight.** `riverside.fm` → `riverside.com`, with the status page and notification emails still on the old domain and hundreds of in-article links unmigrated. Any URL in this file should be re-checked before citation.

## Sources

1. https://riverside.com/
2. https://riverside.com/pricing
3. https://riverside.com/faq
4. https://support.riverside.com/hc/en-us
5. https://support.riverside.com/hc/en-us/articles/5457425335965-Recordings-status-guide
6. https://support.riverside.com/hc/en-us/articles/5252042203037-Join-a-studio-as-a-guest
7. https://support.riverside.com/hc/en-us — Guest checklist and tips
8. https://support.riverside.com/hc/en-us — Has my recording finished uploading?
9. https://support.riverside.com/hc/en-us — Partial high quality tracks
10. https://support.riverside.com/hc/en-us/articles/19135749320093 — My track is stuck uploading
11. https://support.riverside.com/hc/en-us/articles/5947545867805 — I can't record in the studio due to browser errors
12. https://support.riverside.com/hc/en-us/articles/5601441044125 — I see the error 'Your connection is unstable'
13. https://support.riverside.com/hc/en-us/articles/9187798779805 — Guests can't enter the studio with the studio invite link
14. https://support.riverside.com/hc/en-us/articles/5252093048221 — Reset mic and camera permissions
15. https://support.riverside.com/hc/en-us/articles/18254718741149 — I see the error 'Device storage is running low'
16. https://support.riverside.com/hc/en-us/articles/5599382543389-Glossary
17. https://support.riverside.com/hc/en-us/articles/20173322157341 — AI at Riverside
18. https://status.riverside.fm
