# 142. Netflix

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Subscription video on demand (SVOD), with ad-supported tier, games, and live events |
| Primary URL | https://www.netflix.com/ |
| Corpus rank | 142 |
| Benchmark strength (source list) | Profiles, playback, recovery |
| Locale / market observed | en-US (`help.netflix.com/en`, US pricing, MPA/TV Parental Guidelines ratings). Maturity-rating article serves a **North-America-only language set** (English, French, French-Canada, Spanish-LatAm) |
| Platform observed | Web (marketing), signup step 1, help centre (Sprinklr-hosted), error-code article library |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated financial/health product. Visible regimes: CCPA (`Do Not Sell or Share My Personal Information`), MPA film ratings + FCC/TV Parental Guidelines TV ratings (US), COPPA-adjacent Kids-profile ad exclusion, `Legal Notices` / `Corporate Information` footer. `This page is protected by Google reCAPTCHA` disclosed on the homepage. |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Full for T7 / T9 / T10. The error-code library is vast (the `tvq-pb-101` family alone has 10+ variant articles); 2 error articles were read in full and 17 distinct codes were observed as help-centre article titles. Individual error-article bodies beyond those 2 are unread. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.netflix.com/ | Hero, email capture, ad-tier banner, `Trending Now`, 4-benefit grid, 6-question FAQ, reCAPTCHA disclosure |
| Signup step 1 | https://www.netflix.com/signup/planform | Step counter + plan-choice framing (plan cards are client-rendered) |
| Help home | https://help.netflix.com/en | `How can we help?`, Quick Links, language set (32 languages) |
| `Netflix isn't working` (error index) | https://help.netflix.com/en/troubleshooting | The error-code entry point — search-first, five `Common Issues` |
| Error NW-2-5 | https://help.netflix.com/en/node/14424 | **Read in full.** Best specimen of the recovery-step grammar |
| Error tvq-pb-101 | https://help.netflix.com/en/node/59985 | **Read in full.** Device-branched; the sub-code routing instruction |
| Parental controls | https://help.netflix.com/en/node/264 | 7-step control list + troubleshooting trio |
| Maturity ratings | https://help.netflix.com/en/node/2064 | The rating-label table and its three-band grouping |
| Plans and Pricing | https://help.netflix.com/en/node/24926 | Plan matrix, extra-member pricing, discontinued-plan line |
| Profiles | https://help.netflix.com/en/node/10421 | Profile object model (16 per-profile properties) |
| Recommendations system | https://help.netflix.com/en/node/100639 | Algorithm explainer written for consumers |
| Accessibility on Netflix | https://help.netflix.com/en/node/116022 | 10 named features + 4 feedback routes |
| How to cancel Netflix | https://help.netflix.com/en/node/407 | Cancellation + pause state machine |
| Ads on Netflix | https://help.netflix.com/en/node/126831 | Ad-tier disclosure, including the honest limitations |

**Attempted, empty body:** `help.netflix.com/en/node/100604`.

---

## T1 Navigation & IA labels

**The homepage has almost no navigation.** `[observed]` Header is `Netflix` logo · `Select Language` (`English` / `Español`) · `Sign In`. That is the whole global nav. No products menu, no pricing link, no help link in the header. The entire page is a conversion funnel and navigation is treated as leakage.

**Footer carries the real IA — a flat 20-item list, no groupings** `[observed]`

`FAQ` · `Help Center` · `Account` · `Netflix House` · `Media Center` · `Investor Relations` · `Jobs` · `Netflix Shop` · `Redeem Gift Cards` · `Buy Gift Cards` · `Ways to Watch` · `Terms of Use` · `Privacy` · `Cookie Preferences` · `Corporate Information` · `Contact Us` · `Speed Test` · `Legal Notices` · `Only on Netflix` · `Do Not Sell or Share My Personal Information`

Ungrouped and unordered by category — commerce (`Netflix Shop`, gift cards), corporate (`Jobs`, `Investor Relations`), utility (`Speed Test`), and legal are interleaved. `Speed Test` in a consumer footer is a notable inclusion: a **diagnostic tool promoted to top-level navigation**, which tells you how much of Netflix's support load is bandwidth.

`FAQ` and `Help Center` are separate footer links pointing at different things — the on-page FAQ anchor and `help.netflix.com`. Two support entry points with no stated difference.

**Help centre nav is even thinner** `[observed]`: `Netflix` · `Help Center` · `Join Netflix` · `Sign In`. The help home has **no browsable category tree in server HTML** — only `Search`, an `Explore Topics` anchor, `Quick Links`, and `Contact Us`. The topic tree is client-rendered.

**`Quick Links` — five links, four of them account-recovery** `[observed]`

1. `Reset password` 2. `Update email` 3. `Get help signing in` 4. `Update payment method` 5. `Request TV shows or movies`

The fifth is the outlier and the interesting one: a **content-request channel** promoted to the same shelf as password reset. Netflix treats "the thing I want isn't here" as a first-class support task.

**Article-level nav** `[observed]`: a single `Back to Help Home` breadcrumb — no intermediate level. Every article is one hop from the root; there is no visible category path. Then, at the foot, `Related Articles` rendered **twice, identically** (a duplication defect present on every help article observed).

**Language set** `[observed]`: 32 languages on the help home; but individual articles serve **narrower, article-specific language sets** — `Plans and Pricing` offers only English and Spanish (LatAm); `Maturity ratings` offers English, French, French (Canada), Spanish (LatAm); `tvq-pb-101` offers English and Spanish (LatAm). The language selector is scoped to *where the article's content is regionally valid*, which is unusually honest IA — but it also means the selector silently shrinks as you navigate, with no explanation.

## T2 Value proposition & headline patterns

**Hero — one noun phrase, one price, one escape clause** `[observed]`

> Headline: `Unlimited movies, TV shows, and more`
> Sub: `Starts at $8.99. Cancel anytime.`
> Capture: `Ready to watch? Enter your email to create or restart your membership.`

Nine words of headline, six of subhead. `Starts at` does the tier hedging; `Cancel anytime` is the risk reversal; and `create or restart` in the capture line is the standout — Netflix's hero copy explicitly addresses **churned users returning**, on the primary acquisition surface. Most products write the hero for first-timers only and handle win-back in email.

**Ad-tier banner — price repeated, framing inverted** `[observed]`

> `The Netflix you love for just $8.99.`
> `Get our most affordable, ad-supported plan.`
> CTA: `Learn More`

`The Netflix you love` presupposes familiarity — this banner is aimed at existing or lapsed members downgrading, not new joiners. And `our most affordable` is the euphemism doing work; `ad-supported` is stated second, as the mechanism. Compare Disney+ (143), which puts `(With Ads)` inside the plan name itself.

**Benefit grid — `More Reasons to Join`, four items, label + one sentence** `[observed]`

| Label | Sentence |
|---|---|
| `Enjoy on your TV` | "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more." |
| `Download your shows to watch offline` | "Save your favorites easily and always have something to watch." |
| `Watch everywhere` | "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV." |
| `Create profiles for kids` | "Send kids on adventures with their favorite characters in a space made just for them — free with your membership." |

Three of four are verb-first imperatives; `Watch everywhere` is the odd one out (adverbial). The kids item is the only one with a **price clause appended** (`— free with your membership`), and the only one using narrative language (`Send kids on adventures`). Kids is being sold emotionally and then de-risked commercially in the same sentence.

**Section headers are utilitarian** `[observed]`: `Trending Now` · `More Reasons to Join` · `Frequently Asked Questions`. No slogans. The hero does all the positioning work; everything below is functional.

**Help-centre headline** `[observed]`: `How can we help?` — first person plural, question, no product name. And the error index headline is `Netflix isn't working` — a **declarative admission of failure as a page title**, in the user's words, not "Troubleshooting" or "Error codes". The `<title>` tag is `Netflix isn't working | Netflix Error Codes | Netflix Help Center`, stacking the human phrasing first and the searchable term second.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Started` | Homepage hero, homepage foot (×2) | Paired with `Email address` field both times |
| `Learn More` | Ad-tier banner | The only bare `Learn More` |
| `Sign In` | Header, all surfaces | |
| `Join Netflix` | Help-centre header | **Inconsistent with `Get Started`** on the marketing page — same action, two labels, and a third (`Sign up for Netflix`) inside help-article bodies |
| `Next` | Signup step 1 | |
| `Contact Us` | Help home + every article foot | Under the heading `Need more help?` |
| `Explore Topics` | Help home | Anchor to `#topics-section` |
| `Cancel` | Manage-membership page | Step 1 of cancellation |
| `Finish Cancellation` | Cancellation confirm | Step 2 — the irreversible one |
| `Pause for 1 Month` | Cancellation page | Offered *on the cancel page*, as the retention alternative |
| `Extend Pause` | Account banner | |
| `Unpause Now` | Account banner | |
| `Add Profile+` | TV profile-selection screen | `+` appended to the label rather than a separate icon |
| `Add Profile` | Web / mobile | **Inconsistent with `Add Profile+`** on TV |
| `Manage Profiles` | Profile menu | |
| `Delete Profile` | Profile edit | |
| `Adjust parental controls` | Account › Profiles | Sentence-case verb phrase |
| `Kids` | Profile-creation toggle | A one-word label that creates an entire restricted experience |
| `Add Email` / `Change Email` / `Delete Email` | Secondary-profile contact | Three explicit verbs rather than one `Edit` |
| `More Details` | **Error screen on TV** | The universal escape hatch from an error state |
| `Check your network` | Error screen › More Details | A diagnostic offered inside the error |
| `Sign out` / `Reset` / `Deactivate` | Error screen › More Details | Three labels for the same recovery, varying by device |
| `Reset Netflix` / `Restart Netflix` | Xfinity X1 / Contour remote menu | Partner-device labels quoted verbatim |
| `Remove app` / `Remove` / `Add channel` / `Go to channel` | Roku | |
| `Begin Review` → `Start Appeal` → `Next` → `Submit` | Termination appeal (Studio) — *n/a, that is YouTube; see 144* | — |
| `Speed Test` | Footer | Diagnostic as navigation |
| `Request TV shows or movies` | Help Quick Links | Content-gap channel |
| `Redeem Gift Cards` / `Buy Gift Cards` | Footer | Two separate links, correctly |

**Observations.** The two-step cancellation (`Cancel` → `Finish Cancellation`) is worth noting: the second label **restates the noun**, so the confirm button cannot be misread as "finish (something else)". Compare a bare `Confirm`.

`Pause for 1 Month` appearing *on the cancellation page* is a retention pattern executed with unusual honesty — it is not a dark-pattern interstitial, it is a labelled alternative state with its own documented lifecycle (see T6).

Netflix ships essentially **zero marketing CTAs**. One `Get Started`, one `Learn More`, one `Sign In`. No "See plans", no "Compare", no "Watch trailer". The email field *is* the funnel.

## T4 Onboarding & getting-started

**Signup is explicitly counted** `[observed]`:

> `Step 1 of 3`
> `Choose your plan`
> `No commitments, cancel anytime.`
> then three reassurance lines: `Endless entertainment for one low price.` · `Enjoy Netflix on all your devices.`
> CTA: `Next`

Three steps, numbered, with the risk reversal restated at step 1 (`No commitments, cancel anytime.` — a *third* variant of the same promise, after `Cancel anytime.` in the hero and `There are no cancellation fees` in the FAQ). Netflix states the cancellation promise **four distinct ways across three surfaces**; the wording is never reused exactly.

**Personalisation onboarding is documented, and disclosed as optional** `[documented]` (`How Netflix's Recommendations System Works`):

> Section heading: `"Jump starting" the recommendations system`
> "When you create your Netflix account, or add a new profile in your account, we ask you to choose a few titles that you like… **Choosing a few titles you like is optional.** If you choose to forego this step then we will start you off with a diverse and popular set of titles to get you going."

Two things are unusual. The section heading uses **scare quotes around the company's own internal metaphor** (`"Jump starting"`), acknowledging it as jargon. And the optionality of the taste-picker is stated plainly along with the consequence of skipping it — most onboarding taste-pickers do not tell you what happens if you decline.

Then the decay model is disclosed: "Once you start engaging with titles on the service, this will 'supersede' any initial preferences you provided us. As you continue to enjoy Netflix over time, the titles you engage with more recently will **outweigh** titles you engaged with in the past."

**Parental-control onboarding is a numbered 7-step sequence** `[observed]` (`Parental controls on Netflix`), under the heading `Start using parental controls:` — each step is a link to its own article:

1. `Create a profile for kids`
2. `Set profile maturity ratings or block titles`
3. `Lock your profile or other profiles on your account`
4. `Require a PIN to add a new profile`
5. `Turn autoplay previews on or off`
6. `Adjust autoplay settings for TV shows`
7. `Access viewing history for a profile`

A **checklist as IA**. The ordering is the content design: identity (1) → content limits (2) → access limits (3–4) → attention limits (5–6) → oversight (7). Steps 5 and 6 are the notable inclusion — autoplay is classified as a *parental control*, not a playback preference. And step 7 frames viewing history as a supervision instrument rather than a privacy feature.

Getting-started articles named in `Related Articles` across the centre `[documented]`: `Getting started with Netflix` · `What is Netflix?` · `How to sign up for Netflix` · `How to search and browse Netflix` · `Ways to Watch`.

## T5 Form & field labels

Pre-auth, exactly one field exists `[observed]`:

| Label | Context |
|---|---|
| `Email address` | Homepage hero and homepage foot, twice on one page, both paired with `Get Started` |

Its helper text is the headline above it, not a hint: `Ready to watch? Enter your email to create or restart your membership.` So the instruction, the motivation and the two-outcome framing (`create or restart`) all live in one sentence above a single input. No placeholder, no validation copy, no privacy microcopy at the field.

**reCAPTCHA disclosure** `[observed]`, last line of the homepage body: `This page is protected by Google reCAPTCHA to ensure you're not a bot.` Plain-language gloss of the mechanism *and* its purpose, in the user's terms ("you're not a bot"). A good model for third-party-protection disclosure.

Post-auth field and control labels quoted in help `[documented]`: `Viewing Restrictions` · `Maturity Rating` · `Profile Lock` · `Manage Profiles` · `Profiles` · `Membership` · `Payment History` · `Sign out of all devices` (checkbox) · `Ready to watch?` (account banner) · `Active copyright strikes` — *no, that is YouTube*. Verification prompts: "Verify your identity by entering your Netflix account password." / "entering a code sent to your email or mobile phone number".

**Defect** `[observed]`: capitalisation of the same control is inconsistent across articles — `Viewing Restrictions` / `Maturity Rating` (title case, mobile steps) vs `Adjust parental controls` (sentence case, web steps) vs `Maturity Rating level` (mixed). And the maturity-rating article instructs `Tap Viewing Restrictions` then `Tap Maturity Rating` as two nested steps while rendering the **same icon asset** for both, which suggests the illustration set has not kept up with the nesting.

## T6 Status & state language

Netflix's state vocabulary is unusually rich because membership, playback, profile and title availability are all separately stated.

**Membership states** `[documented]`:

| State | Copy evidence |
|---|---|
| active | "As a Netflix member, you are charged monthly on the date you signed up." |
| cancelled, still usable | "If you cancel with time left in your billing period, you can use Netflix until the account **cancels automatically** at the end of the billing period." |
| `on hold` | "**Canceling when account is on hold** — If there's a hold on your account, it will **close immediately** when you cancel." |
| `paused` | "your membership will be paused for 1 month… You will not be able to stream or download when your membership is paused, **but you can still browse Netflix and add to My List.**" |
| pause-extended | "A week before your account is automatically unpaused, you will have the option to extend pause for an additional month." Cap: "Accounts can only be paused for a total of **3 months**." |
| closed, recoverable | "We keep your Viewing Activity for **24 months** after your account closes, so it will be available if you restart within that time." |
| covered by balance | "you can continue to use Netflix for as many months of service that the remaining balance of your Netflix gift card or promotion covers." |

The `paused` state is the best-specified: it names what still works (browse, My List) as well as what doesn't (stream, download). Naming the *residual capability* of a degraded state is rare and directly transferable.

`on hold` is the one state whose behaviour **inverts** the normal rule (cancellation is immediate rather than end-of-period) and it gets its own sub-heading rather than a footnote — correct, because it is the case that would otherwise surprise.

**Title-availability states** `[documented]`: the `lock icon` is a named UI state with its own article (`Lock icon on a profile or title`), used for two different meanings — titles unavailable on the ad tier, and PIN-locked profiles. One glyph, two semantics, two articles.

**Profile states** `[documented]`: `main profile` (cannot be deleted) · `secondary Adult profile` (can hold its own email) · `Kids profile` (feature-restricted) · `extra member` account (1 profile only, cannot create more) · locked profile.

**Playback and plan-state constraints** `[documented]`: `Watch on 2 supported devices at a time` / `Watch in 1080p (Full HD)` / `Watch in 4K (Ultra HD) + HDR` / `Download on 6 supported devices at a time`. Device-concurrency is phrased `at a time`, which is the plain-language form of a concurrency limit.

**Recommendation-system state, disclosed** `[documented]`: `Continue Watching` is named as a *personalised row choice*, not a fixed row — "in a row, we may personalize the following: the choice of row (such as Continue Watching), which titles appear in the row, and the order of those titles." Three layers of personalisation disclosed at once.

## T7 Error, failure & recovery — **PRIORITY SECTION**

This is the best consumer-facing error taxonomy in the corpus so far, and the consumer counterpart to a developer error-code reference.

### The code format

Netflix codes observed follow **three families**, each with a distinct shape `[observed]` (all captured as help-centre article titles; two bodies read in full):

| Family | Prefix meaning (inferred from article content, not stated) | Codes observed |
|---|---|---|
| `NW-` | network / connectivity | `NW-2-5`, `NW-2-4`, `NW-1-19`, `NW-3-6` |
| `tvq-` | TV-client queue/playback | `tvq-pb-101`, `tvq-st-131`, `tvq-st-103` |
| `ui-` | client UI layer | `ui-113` |

Structural notes:

- **Casing is inconsistent across families.** `NW-2-5` is upper-case; `tvq-pb-101` and `ui-113` are lower-case. Both render that way in the article titles (`Netflix Error NW-2-5`, `Netflix Error ui-113`, `Netflix Error tvq-pb-101`). Netflix has not normalised its own code casing.
- **`NW-` codes are three hyphen-separated segments** (`NW-2-5`); `tvq-` codes are three hyphen-separated *words/segments* with a semantic middle (`pb` = playback, `st` = start/stream, inferred).
- **The `tvq-` family carries an optional parenthetical sub-code**, and this is the most distinctive feature of the whole taxonomy. Variants observed as separate help articles:

  `tvq-pb-101` · `tvq-pb-101 (0)` · `tvq-pb-101 (1.8)` · `tvq-pb-101 (5.2.5)` · `tvq-pb-101 (5.6.2)` · `tvq-pb-101 (8.1)` · `tvq-pb-101 (E100)` · `tvq-pb-101 (3.1.11)` · `tvq-pb-101 (3.1.undefined)` · `tvq-pb-101 (3.3.Permanent failure)`

  One base code, **ten+ separately-authored articles**, each addressing a different underlying cause. This is the content-ops decision worth flagging: rather than one article with ten branches, Netflix ships one article per code+sub-code pair so that the user's exact on-screen string matches a search result exactly.

- **Two sub-codes are defects leaking into published content** `[observed]`:
  - `tvq-pb-101 (3.1.undefined)` — the literal JavaScript `undefined` has propagated from client code into an error string, into an error-code variant, and into a **published help-article title**.
  - `tvq-pb-101 (3.3.Permanent failure)` — mixes numeric sub-code segments with a human-readable English phrase, so the sub-code namespace is not typed. `Permanent failure` is also a bleak string to surface to a consumer verbatim.

  These are genuine negative findings. They show what happens when you commit to "one article per exact string": you inherit your client's string bugs into your content taxonomy, permanently and publicly.

### The on-screen error string

`[documented]`, quoted in the NW-2-5 article:

> `Netflix has encountered an error. Retrying in [X] seconds.`
> `Code: NW-2-5`

Three components: a generic sentence, an **auto-retry countdown**, and the code on its own line labelled `Code:`. Notes:

- The error announces that the system is already retrying — the user is told to wait before being told to act. Auto-recovery is the default and the article is the escalation.
- The help article reproduces the placeholder literally as `[X] seconds`, so the documentation exposes the interpolation token. Defensible (the value varies) but it means the quoted string never matches what the user sees, which is the one thing code-matching was supposed to fix.
- `Netflix has encountered an error` is third-person-about-itself — the company as the subject of the failure. Not "Something went wrong" (Spotify), not "We're having trouble".

### The article structure

Both error articles read in full share a fixed skeleton:

1. **Where you'll see it.** "You might see this message on your TV or TV streaming device when you try to open Netflix:" then the verbatim string + code.
2. **What it means, in one sentence, cause-first.** `NW-2-5`: "Error code NW-2-5 means your device took too long to connect to Netflix. This usually points to an internet connection problem on your device or home network." `tvq-pb-101`: "This error happens when an issue with data stored on your device stops Netflix from playing."
   The grammar is `Error code <X> means <plain-language cause>.` followed by `This usually points to <likely locus>.` — **cause and blame-locus in two sentences, before any instruction.**
3. **Where the path ends, stated up front.** "Follow the steps below to fix the issue. If it isn't fixed after doing these steps, you'll need to contact your internet service provider (ISP)." The user is told the destination of the unhappy path *before* step 1. Exceptional practice — it prevents the "I did six steps and now what" cliff.
4. **Numbered steps, cheapest-first, each with a named heading.** NW-2-5: `1. Check your internet connection` → `2. Restart your device` → `3. Restart your home network` → `4. Move your Wi-Fi router` → `5. Set DNS to automatic (PlayStation/Xbox only)` → `6. Contact your ISP`.
5. **Device branching** where the fix differs. `tvq-pb-101` branches into `Smart TV` / `Streaming media player` / `Comcast Xfinity X1 set-top box` / `Contour set-top box` / `Roku` / `Xbox 360` / `All other devices` — seven device classes, each with its own step set, two of them **named partner set-top boxes** with the partner's own remote-button labels quoted (`press the Xfinity button`, `press the Contour button`, `choose Reset Netflix`).
6. **Escalation script.** Not just "contact your ISP" but what to say: "While talking with your ISP, ask them to: Make sure your device is able to connect to these Netflix addresses: `secure.netflix.com` / `appboot.netflix.com` / `uiboot.netflix.com` / `fast.com`; Check for DNS issues…; Try using a different DNS server…". And what to tell them: "Whether the issue happens only on one device, or other devices on the same network. Whether your device connects using Wi-Fi or directly using a cable."
7. **Exit verification.** "Before you finish talking with your ISP, we recommend trying Netflix again to make sure the problem is fixed." Repeated at each escalation boundary.

### Recovery-step grammar

Extremely consistent. Bare imperative, one action per line, **with the wait duration as its own numbered step**:

> 1. `Unplug your device from power.`
> 2. `Wait at least 15 seconds. If you use a cable box, wait 3 minutes instead.`
> 3. `Plug your device back in.`
> 4. `Turn your device on, then try Netflix again.`

And for the network:

> 1. `Turn off your device, then unplug your modem and router from power.`
> 2. `After 30 seconds, plug in your modem and router.`
> 3. `Wait 1 minute, then turn on your device.`
> 4. `Try Netflix again.`

Four rules visible in this grammar:

- **Every step ends in a verifiable physical state.** No "make sure" assertions (contrast Spotify, T7 of 141).
- **Waiting is a step with a number and an exception.** `Wait at least 15 seconds. If you use a cable box, wait 3 minutes instead.` The exception is inline, not a footnote.
- **`try Netflix again` terminates every block.** It appears 14+ times across the two articles. A single fixed verification phrase, never varied, so the reader stops re-reading it.
- **Each step has a rationale sentence above it**, explaining why it might work: "Restarting your device lets Netflix start over and can fix common errors and issues." / "Restarting your network boxes will make your device request a fresh connection, clear old data, and fix common connectivity issues." / "If your DNS settings are wrong, your device might not be able to find the Netflix servers, which can cause network timeout errors."

### Scope-limiting and blame-placing

Three moves worth stealing:

- **Explicit refusal of scope**, boxed as a Note: "**Note:** Netflix Customer Service **can't assist with connecting a device to the internet** because the steps are often unique for each device and home network. For help connecting your device, check the device's instruction manual or contact the company that made it." Netflix states the boundary of its support, gives the reason, and names the alternative owner. No apology, no hedge.
- **Permission to skip a step**, with the condition: "You should skip this step if moving your router is too difficult or impossible or if your device connects using an ethernet cable."
- **Naming third-party network types as the likely cause**: "Public or shared Wi-Fi networks like hotels or apartment complexes might have too many people using them at the same time, or streaming video services like Netflix might be blocked. Try contacting the network owner or administrator for help." / "Some cellular, satellite, or mobile hotspot connections might be too slow for stable streaming."
- **Hardware end-of-life as the terminal outcome**: "If they can't fix the problem or these steps don't work, you'll need to **use a different device** to watch Netflix." A help article that concludes "your TV cannot run this product". Brutal and correct.
- **A vendor-specific carve-out inside a generic article**: "If you use a **Vizio Smart TV** and get this issue after following the steps above: Contact the device manufacturer". Like Wise's named-issuer decline article, this is a content-ops choice to ship copy for one vendor's misbehaviour.

### The sub-code routing instruction

`[observed]`, top of `tvq-pb-101`, before any content:

> `Check the error code on your TV. If there are additional numbers or letters inside parentheses ( ), search for that exact error code in our Help Center. There might be an article with steps that fix your exact error code.`

This one paragraph is the keystone of the whole taxonomy. It teaches the user the **syntax of the error-code namespace** — that the parenthetical is a distinct, searchable token — and it hedges honestly (`There might be an article`). Note `search for that exact error code` and `your exact error code`: the word `exact` twice in three sentences, because string-matching precision is the entire mechanism.

### The error index

`[observed]`, `help.netflix.com/en/troubleshooting`:

> H1: `Netflix isn't working`
> Instruction: `If Netflix isn't working, enter the error code/message or describe the problem in the search bar.`
> then `Search`

**Search-first, browse-second.** The instruction offers three input modes in one sentence — code, message, or natural-language description — which covers the user who can read a code, the user who can only read the sentence, and the user who can describe neither.

Then five `Common Issues`, and these are the other half of the taxonomy — **symptom titles for errors that have no code**:

- `Black screen with no sound`
- `Black screen with sound`
- `Netflix freezes, stops responding, or gets stuck loading, but device isn't frozen`
- `Video freezes but sound keeps playing`
- `Can't sign in to Netflix`

The audio/video decomposition is the craft here. Four of the five titles distinguish failures by **which sensory channel survived**: black screen + no sound, black screen + with sound, video frozen + sound continuing. That is exactly how a user on a sofa would describe the fault, and it maps to genuinely different causes. And title three pre-empts the misdiagnosis in the title itself — `but device isn't frozen` — so the user does not go looking for a TV problem.

### The undocumented recovery gesture

`[observed]`, in `tvq-pb-101`, offered when the normal menu is unreachable:

> `If you can't find Get Help or Sign out:`
> 1. `Using your remote, press these buttons in this order: Up, Up, Down, Down, Left, Right, Left, Right, Up, Up, Up, Up.`
> 2. `On the menu that appears, select Sign out, Reset, or Deactivate.`

A twelve-press directional cheat code, published in the help centre, as the documented fallback for reaching a hidden reset menu. Worth recording as a genuine artefact: when the UI has no reachable exit, Netflix's answer is a **secret gesture promoted to documentation**. The three-way label (`Sign out, Reset, or Deactivate`) also tells you the button text differs by device build and Netflix has given up normalising it — so the article names all three variants rather than one.

### Other T7 observations

- **In-error diagnostics**: "On the error screen, select `More Details` > `Check your network`. If a red X appears anywhere on the screen, your device likely isn't connected." The error screen contains a network test, and the article tells you how to read its output (`a red X`).
- **Fallback isolation test**, offered before escalation: "Try another app that needs the internet, or run a network test from the settings menu if there is one."
- A system string leaks onto unauthenticated help articles `[observed]`: **`A country must be selected to view content in this article.`** appears at the top of `Parental controls`, `Maturity ratings`, `Plans and Pricing`, `Profiles`, `How to cancel`, `Ads on Netflix`, and `tvq-pb-101`. It is a machine-voiced precondition ("must be selected") with **no selector adjacent to it and no explanation of who selects it**, rendered above content that then displays anyway. A clear defect and a useful negative example: a gating message that neither gates nor offers the action it demands.

## T8 Empty states

`[absent]` — no empty state was reachable pre-auth. Search-no-results was not triggered.

Two adjacent artefacts `[observed]`:

- The `Request TV shows or movies` Quick Link functions as the **routing target for a catalogue empty state** — "the thing you want isn't here" is given a channel rather than a dead end.
- The recommendations article documents the cold-start empty state's resolution: "If you choose to forego this step then we will start you off with a diverse and popular set of titles to get you going." — i.e. the no-data state is filled with popularity rather than left blank, and this is disclosed to the user.

## T9 Notifications & system messages

**No public status page.** `[observed]` `status.netflix.com` was not reached; nothing in the footer, help home, or error index points to a status or incident page. The escalation ladder for a suspected outage ends at *your ISP*, not at Netflix. For a product whose error taxonomy is this sophisticated, the absence of a service-status surface is the notable gap — Netflix's content design assumes the fault is always local. Compare Spotify (141), which at least routes to an `Ongoing issues` board.

**`fast.com` as the diagnostic surface** `[observed]`: "Using a web browser, go to `fast.com` to test your internet speed and connection **directly to Netflix**." Netflix operates and promotes its own speed-test property, linked from the footer (`Speed Test`) and from error articles. This is the substitute for a status page — an instrument rather than a statement.

**Notification copy documented** `[documented]`:

- Cancellation: "That's it! A confirmation email will be sent to the email on the account." — the only exclamation mark observed in the Netflix help corpus, placed at the end of a *cancellation* flow.
- Account banner: `Ready to watch?` with `Extend Pause` / `Unpause Now` — one banner, two different CTAs depending on state.
- Ad-break signalling in the player: "Ad breaks are shown on the progress bar when playback is paused. When an ad break starts, **the number of ads that will be shown appears in the upper-right corner.**" Disclosing the count up front converts an unbounded interruption into a bounded one. Strong, transferable.
- Rating flash on playback start: "When first playing a title, the rating will appear briefly in the top corner of your screen." And for series: "For TV shows with more than one season, we show the ratings for the season you're watching… These may differ from the show's overall rating or mature content themes."
- Identity-verification prompts: "verify your identity by entering a code sent to your email or mobile phone number, or by entering your Netflix account password" with the note "**Codes will be sent to the primary account email or phone number.**" — i.e. a secondary profile holder cannot self-verify. Stated, not hidden.
- Phone support surfaced on the marketing page: `Questions? Call 1-844-569-7700`, and on signup: `Questions? Call 1-844-569-7700 (Toll-Free)`. The `(Toll-Free)` qualifier appears on the signup page only.

## T10 Disclosures, legal & compliance — **PRIORITY SECTION**

### Plan and ad-tier disclosure

**Three plans, named by ad state and quality tier** `[observed]`:

| Plan | Price (USD) | Disclosure inside the feature cell |
|---|---|---|
| `Standard with ads` | `$8.99 / month` | "Ad-supported, all games and **most** movies and TV shows are available. A **lock icon** will appear on **unavailable** titles." |
| `Standard` | `$19.99 / month` | "Unlimited ad-free movies, TV shows, and games" + "Option to add 1 extra member who doesn't live with you" |
| `Premium` | `$26.99 / month` | 4K + HDR, `Netflix spatial audio`, up to 2 extra members |

`Standard with ads` is the plan *name*, so the ad state is unavoidable at the point of choice — unlike the marketing banner, which leads with `our most affordable`. Two framings of the same tier on two surfaces, and the honest one is in the help centre.

**The catalogue-hole disclosure is the standout** `[observed]`. Netflix states, in the plan table and again in the ads article, that the cheap tier has *missing content*:

> "While the vast majority of TV shows and movies are available with an ad-supported experience, **a small number are not due to licensing restrictions**. These titles will appear with a **lock icon** when you search or browse Netflix."

Cause named (licensing), magnitude bounded (`a small number`, `the vast majority`), and — critically — **the UI signal for the gap is named** (`lock icon`) with its own help article. Most products disclose tier differences as a feature matrix; Netflix additionally tells you what the absence will *look like* in the interface. Directly transferable to any entitlement-gated catalogue.

**Ad-tier limitations stated as their own headings** `[observed]`, in `Ads on Netflix`:

`Ad-supported experience` · `How ads are shown` · **`Skip/fast-forward not available`** · `How to report an issue with an ad` · `How ads are selected` · `What information Netflix collects` · `Ads during live events` · `Ads on Kids profiles` · `Ads on Netflix games`

`Skip/fast-forward not available` as a **heading** rather than a buried caveat is the right call. Its body then grants the one thing that *is* allowed: "You can't skip or fast-forward ads while watching TV shows and movies, **but you can pause playback during an ad.**" Restriction, then residual capability — the same construction as the `paused` membership state (T6).

Quantity is bounded: "you can expect to see **a few short ads per hour**. We aim to place ads during natural plot breaks for a more seamless experience." `a few` is vague, but `We aim to` is honest hedging on the placement claim rather than asserting it.

**Two carve-outs stated flatly**: `Ads are not currently shown on Kids profiles.` · `Ads are not currently shown on games.` The adverb `currently` in both — a deliberate non-commitment, repeated identically, which at least makes the temporariness consistent.

**Live-event ad asymmetry disclosed** `[observed]`: "Ad-free experiences don't have commercial breaks in TV shows and movies, **but they can have other types of commercial content.**" So `ad-free` is scoped to TV/film, not to the service. That is the sentence a regulator would ask for and Netflix wrote it unprompted.

**Ad-targeting disclosure** `[observed]`: signals listed (interactions, genre, "your general location (such as city and state)"), then behavioural advertising named as such with the opt-out consequence stated: "If you opt-out of receiving behavioral ads, **you will still see ads, but they will not be selected using behavioral advertising information.**" Data collected named explicitly: "we may ask for your **date of birth and gender**."

**Device-compatibility exclusion** `[observed]`: "A few supported devices can't be used with an ad-supported experience because the Netflix app or software on the device cannot be updated." — a plan the user cannot buy because of their hardware, disclosed, with a `plan compatibility` checker linked.

**Discontinued plan, stated in one line** `[observed]`: `The Basic plan has been discontinued. You can change your plan at any time.` No explanation, no migration guidance in situ, but the withdrawal is acknowledged in the pricing article rather than silently removed. (Compare Wise's `Why can't I set up guaranteed rate transfers anymore?` — Netflix states the fact, Wise explains it.)

**Extra-member pricing and its odd economics** `[observed]`: `$7.99 / month with ads or $9.99 / month without ads` — **cheaper than the $8.99 Standard-with-ads plan**, with a note explaining the relationship: "Extra members have their own account and password, but their membership is paid for by the person who invited them to share their Netflix account." Identity is separate, billing is not. The household rule is stated before pricing: "A Netflix account is for people who live together in a single household."

**Tax and partner caveats** `[observed]`: "Depending on where you live, you may be charged taxes in addition to your membership price." · "Plan prices and extra member eligibility may vary if you have Netflix through a package or add-on."

### Cancellation disclosure

**The anti-misconception note is the best sentence in the article** `[observed]`:

> **Note:** This is the **only** way to cancel your account and end your membership. **Signing out of your account or deleting the Netflix app doesn't cancel your account.**

It names the two things users actually do believing they have cancelled, and negates both. Pre-emptive negation of the specific wrong mental model — the same technique as Spotify's authorization-hold note, applied to churn.

Then a **payment-partner fallback**: "If you don't see the cancellation option in your account, you'll need to cancel the account with your payment partner… You'll see either a link to guide you through the cancellation process or instructions to contact your payment partner to cancel." The article admits Netflix cannot always cancel its own subscription.

And a security recommendation appended to cancellation `[observed]`, under `Preventing others from restarting your account`: "we recommend that you change your password after canceling your membership, making sure to check the box that says `Sign out of all devices`." Cancellation treated as a household-security event, not just a billing one.

### Content-rating and parental-control disclosure

**How ratings are produced, disclosed** `[observed]`:

> - "Maturity ratings are **either set by Netflix or by a local standards organization.**"
> - "Netflix sets maturity ratings **by the frequency and impact of mature content** in a title, such as the amount of violence, sex, adult language, nudity, or substance use that may be present."
> - "Netflix also provides details on the mature content found within a TV show or movie, if applicable."
> - "Maturity ratings and advisories found on a TV show's details page reflect the **overall or highest** maturity level of the series."
> - "TV and movie ratings **may vary by region.**"

Five bullets covering provenance, methodology, granularity, aggregation rule, and locale variance — before any label is shown. The aggregation rule (`overall or highest`) is the one most products omit and the one that causes most parental surprise.

**The rating labels, grouped into three audience bands** `[observed]` — **locale: US (en-US; the article's language set is English / French / French-Canada / Spanish-LatAm only)**:

`Recommended for Kids`
| Label | Gloss (verbatim) |
|---|---|
| `TV-Y` | Designed to be appropriate for all children |
| `TV-Y7` | Suitable for ages 7 and up |
| `G` | Suitable for General Audiences |
| `TV-G` | Suitable for General Audiences |
| `PG` | Parental Guidance suggested |
| `TV-PG` | Parental Guidance suggested |

`Recommended for Teens`
| Label | Gloss |
|---|---|
| `PG-13` | Parents strongly cautioned. May be inappropriate for ages under 13. |
| `TV-14` | Parents strongly cautioned. May not be suitable for ages under 14. |

`Recommended for Adults`
| Label | Gloss |
|---|---|
| `R` | Restricted. May be inappropriate for ages under 17. |
| `TV-MA` | For Mature Audiences |
| `NC-17` | Inappropriate for ages 17 and under |

Netflix inherits two incompatible external systems (MPA film ratings, TV Parental Guidelines) and **overlays its own three-band grouping** on top. That is the content-design move: the user does not have to know whether `TV-14` is stricter than `PG-13`, because both sit under `Recommended for Teens`. A translation layer over legacy taxonomies, which is a genuinely reusable pattern for any product forced to surface third-party classification schemes.

Note the glosses are **not normalised**. `G` and `TV-G` share a gloss; `PG` and `TV-PG` share a gloss; but `PG-13` says "May be inappropriate" while `TV-14` says "May not be suitable" for the equivalent position, and `R` says "May be inappropriate for ages under 17" while `NC-17` says "Inappropriate for ages 17 and under" — the same boundary expressed as *under 17* and *17 and under*, which are different sets. These are quoted from the source systems, so the inconsistency is inherited, but it is inconsistency the user sees side by side in one table.

**Where the rating is surfaced, stated** `[observed]`: "When first playing a title, the rating will appear briefly in the top corner of your screen." · "On a TV show or movie's details page. The location of this information may vary by device." Plus: "In addition to the rating, you'll also find details about the content that determined the rating (for example: sex, language, violence, nudity)." — the **advisory descriptors**, named.

**Coverage gap disclosed** `[observed]`: "**Note:** Podcast titles don't include advisories at this time." A new content type shipped without the safety metadata, and Netflix says so.

**Games ratings deferred, not duplicated** `[observed]`: "Game ratings correspond to the show or movie maturity settings set for the profile." One control, two media types.

**Profile-type and control vocabulary** `[documented]`:

| Term | Usage |
|---|---|
| `Kids profile` | The profile type |
| `the Netflix Kids experience` | The experience the profile type delivers — a **separate noun from the profile itself** |
| `main profile` | Cannot be deleted; holds the account PIN |
| `secondary Adult profile` | Capitalised `Adult` mid-sentence; can hold its own email |
| `extra member` | A separate *account* with 1 profile, paid by the inviter |
| `Profile Lock` | Per-profile PIN gate |
| `account-level PIN` | Distinct from Profile Lock — a separate article |
| `Viewing Restrictions` | The settings group |
| `Maturity Rating` / `Maturity Rating level` | The slider inside it |
| `Adjust parental controls` | The web entry point |
| `game handle` | Per-profile gaming identity |

`Kids profile` vs `the Netflix Kids experience` is a deliberate two-noun split: the profile is the container, the experience is the content environment. It lets Netflix write troubleshooting like `Why can't I use the Netflix Kids experience?` (an entitlement question) separately from profile mechanics.

**PIN copy** `[documented]`: `Lock your profile or other profiles on your account` · `Require a PIN to add a new profile` · `Managing your account-level PIN` · and the troubleshooting title **`I'm not being prompted to enter a Profile Lock PIN`** — first-person, present-progressive, naming a *missing* prompt as the fault. A control that silently fails open is the scariest parental-control bug and it has its own article titled from the parent's position.

**A real capability cliff, stated as a Note** `[observed]`: "**Note:** To edit the Maturity Rating level for a Kids profile, **you have to use a web browser.**" And again: "**Note:** Changes to maturity rating cannot be made on a TV or streaming device." So the parent watching on the TV where the problem occurred must switch devices to fix it. Disclosed twice, in two articles, which is the right handling of a bad constraint — but it is still a bad constraint, and it is accompanied by a third article, `I can't change the maturity rating limits in the Netflix Kids experience`, which exists largely because of it.

**Identity verification before changing controls** `[observed]`: "Verify your identity by entering your Netflix account password" (mobile) or "entering a code sent to your email or mobile phone number, or by entering your Netflix account password" (web), with the constraint "Codes will be sent to the primary account email or phone number." Step-up auth on parental settings, with the channel limitation disclosed.

**Recommendation-system disclosure** `[observed]` — `How Netflix's Recommendations System Works`, an article whose stated purpose is "This article provides a high level description of our recommendations system **in plain language**." Contents:

- Signals listed in three groups (your interactions; similar members; title metadata), then four more (`the time of day you're enjoying Netflix`, `the languages you prefer`, `the devices you are enjoying Netflix on`, `how long you enjoyed a Netflix title`).
- An **inline definition of "algorithm"** in parentheses: "(An algorithm is a process or set of rules followed in a problem solving operation.)" Netflix glosses the word rather than assuming it.
- A **negative disclosure**: "The recommendations system does **not** include demographic information (such as age or gender) as part of the decision making process." Stating what is *not* used — the strongest move in the article, and notable because the *ads* article says Netflix "may ask for your date of birth and gender." Two systems, two data postures, disclosed separately and consistently.
- Layout personalisation disclosed, including the RTL rule: "The most strongly recommended titles start on the left of each row and go right — **unless you have selected Arabic or Hebrew as your language** in our systems, in which case these will go right to left."
- An escape hatch offered: "If you're not seeing something you want to watch, you can always search the entire catalog available to you." — note `available to you`, a two-word entitlement caveat inside a reassurance.

## T11 Help-centre architecture

**Flat, search-first, one level deep.** `[observed]` Server HTML exposes no category tree at all — only `Search`, an `Explore Topics` anchor (client-rendered), `Quick Links`, and `Contact Us`. Every article breadcrumb is a single `Back to Help Home`. Netflix has essentially **replaced browse with search**, and the error-code namespace is the browse substitute: the taxonomy lives in the codes, not in the IA.

**Article-title grammar — six shapes** `[observed]`:

| Shape | Examples |
|---|---|
| `Netflix Error <code>` | `Netflix Error NW-2-5` · `Netflix Error ui-113` · `Netflix Error tvq-pb-101 (5.2.5)` |
| `How to <verb>` | `How to cancel Netflix` · `How to create, edit, or delete profiles` · `How to download titles to watch offline` · `How to set profile maturity ratings or block titles` · `How to hide titles from viewing history` |
| Symptom sentence | `Black screen with sound` · `Video freezes but sound keeps playing` · `Netflix freezes, stops responding, or gets stuck loading, but device isn't frozen` · `Audio Descriptions won't turn off` · `Audio descriptions are missing from downloaded TV shows or movies` |
| `Can't <verb>` | `Can't sign in to Netflix` |
| `I <first person>` | `I'm not being prompted to enter a Profile Lock PIN` · `I can't change the maturity rating limits in the Netflix Kids experience` |
| Topic noun | `Plans and Pricing` · `Ads on Netflix` · `Parental controls on Netflix` · `Accessibility on Netflix` · `Billing and Payments` |

The `How to <verb>` titles are notable for **enumerating every verb**: `How to create, edit, or delete profiles`, `How to add, edit, or remove a profile PIN`, `How to add, change or delete a phone number`, `How to set profile maturity ratings or block titles`. Three-verb titles, so one article serves three search intents. (Also note `add, change or delete` — **missing Oxford comma**, against `create, edit, or delete` in the sibling title. Inconsistent within one help centre.)

The `Audio Descriptions won't turn off` / `Audio descriptions won't turn on` pair is exemplary: **both failure directions of one toggle get their own article**, and the pair is discoverable as a pair. Also `Audio Descriptions` (capitalised) vs `Audio descriptions` (not) in the two sibling titles — a real casing inconsistency in adjacent articles.

**Routing furniture** `[observed]`: `Search` (largest, first) → `Explore Topics` → `Quick Links` → `Related Articles` (×2, duplicated) → `Need more help?` / `Contact Us` → language selector → legal footer. `Contact Us` is present on **every** page including the home — Netflix does not hide human contact, in contrast to Spotify (141).

## T12 FAQs

**Placement:** accordion block on the homepage under `Frequently Asked Questions`, with answers **present in server HTML** (fully retrievable). Six questions. Also linked separately as `FAQ` in the footer.

| # | Question (verbatim) | Answer summarised |
|---|---|---|
| 1 | What is Netflix? | Defines the category (streaming service), lists content types and device reach, then the flat-fee promise and cadence of new additions. Ends on novelty: new titles weekly. |
| 2 | How much does Netflix cost? | Leads with devices, **not price** — then states the range `Plans range from $8.99 to $26.99/month (pre-tax)`. |
| 3 | Where can I watch? | `Watch anywhere, anytime.` then browser + device list, then downloads for offline. |
| 4 | How do I cancel? | Opens `Netflix is flexible.` Claims `two clicks`, states `There are no cancellation fees`, and `start or stop your account anytime`. |
| 5 | What can I watch on Netflix? | Catalogue breadth restated; overlaps heavily with Q1. |
| 6 | Is Netflix good for kids? | Names the `Netflix Kids experience`, frames it as parental control + kids' own space, then the concrete mechanism: `Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see.` |

**Structural notes.** Six questions, ordered: definition → price → access → **cancellation (4th of 6)** → content → children. Putting *how do I cancel* fourth on the acquisition page, above two content questions, is a deliberate friction-removal choice.

Q2 is a defect worth recording: the question asks the price and the answer's **first sentence is about devices** ("Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee"), with the actual number in sentence two. The FAQ answer does not lead with the answer.

Q4's `two clicks` claim is also checkable against the help centre, where cancellation is documented as `Cancel` → `Finish Cancellation` — two clicks, after navigating to `Manage your membership` and possibly signing in. Technically true, rhetorically generous.

Q6 is the strongest answer in the set: three concrete controls named in one sentence (`PIN-protected`, `restrict the maturity rating`, `block specific titles`), in the parent's own framing (`content kids can watch`, `titles you don't want kids to see`). It is the only answer that names a mechanism rather than a benefit.

Q1 and Q5 substantially duplicate each other — a redundancy the six-slot format could have spent on ads, profiles, or household rules, none of which appear.

## T13 Terminology & glossary

| Term | Netflix's usage | The alternative it rejected |
|---|---|---|
| `member` / `membership` | The customer and the relationship | "subscriber", "subscription" — Netflix uses `membership` in billing, `member` in copy throughout |
| `title` | Any unit of content — film, series, game, podcast | "content", "show", "video" |
| `profile` | Per-person personalisation container, 5 per account | "user", "sub-account" |
| `the Netflix Kids experience` | The restricted content environment | "kids mode" |
| `extra member` | A separate account in a different household, paid by the inviter | "additional user", "guest" |
| `household` | The entitlement boundary | "family", "home" |
| `Maturity Rating` | The per-profile ceiling | "age rating", "content rating" |
| `Viewing Restrictions` | The settings group containing it | "Parental controls" (used for the *topic*, not the setting) |
| `advisories` | The descriptor list (sex, language, violence, nudity) | "content warnings", "content descriptors" |
| `Profile Lock` | Per-profile PIN | "profile PIN" (which Netflix also uses, in a sibling article) |
| `game handle` | Per-profile gaming identity | "gamertag", "username" |
| `Standard with ads` | The ad-supported plan, ads in the name | "Basic with Ads" (the previous name, now discontinued) |
| `ad-supported experience` | The state, distinct from the plan | "ad tier" |
| `lock icon` | The UI signal for an unavailable title or locked profile | "unavailable badge" |
| `Continue Watching` | The resume row | "Resume" |
| `My List` | Saved titles | "Watchlist", "Favorites" |
| `Viewing Activity` / `viewing history` | **Two terms for the same object** — `Viewing Activity` in the cancellation/retention article, `viewing history` in the profiles and parental-control articles | — |
| `Netflix spatial audio` | Premium-only audio feature, lowercase after the brand | "Dolby Atmos" (which Disney+ names directly) |
| `qualified watch hours` | *n/a — YouTube; see 144* | — |
| `pause` (membership) | A named, bounded, 3-month-capped membership state | "snooze", "hold" (`hold` is used for the *involuntary* payment-failure state) |
| `hold` | The involuntary suspended state after payment failure | — |

**`pause` vs `hold` is the sharpest terminological distinction in the file**: `pause` is the state the *user* chooses and it preserves the account; `hold` is the state the *system* imposes and it makes cancellation immediate. Two words, opposite agency, different consequences, never conflated.

**`Viewing Activity` / `viewing history` is a real glossary defect** — the same object under two names in two adjacent articles, with `Viewing Activity` capitalised as a UI label and `viewing history` lowercase as a concept. A user searching one will not reliably find the other.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, and — distinctively — **Netflix names itself in the third person inside error strings** (`Netflix has encountered an error`) and inside articles (`Netflix Customer Service can't assist with…`, `Netflix will email you`). So the company is `we` when explaining and `Netflix` when failing or enforcing. That is a defensible split; it makes the error string device-agnostic and the enforcement sentences unambiguous about who acted.

**Register.** Flat, procedural, contraction-light in the error and disclosure copy (`can't`, `isn't`, `doesn't` appear, but no colloquialism). Marketing copy is warmer but still restrained. **One exclamation mark** found in the entire help corpus: `That's it!` at the end of the cancellation steps. No `Oops!`, no `Uh oh`, no apology for errors — the error articles never say "sorry".

**Register gradient.** Compare within one article set: `Send kids on adventures with their favorite characters` (homepage) against `Netflix Customer Service can't assist with connecting a device to the internet` (error article) against `If they can't fix the problem or these steps don't work, you'll need to use a different device to watch Netflix.` The tone flattens and hardens as the news worsens, ending in a sentence that simply tells the user their hardware is finished.

**Numbers are used as precision, not persuasion** `[observed]`: `15 seconds` · `3 minutes` · `30 seconds` · `1 minute` · `8 MB of free space` · `2 supported devices at a time` · `24 months` · `3 months` · `5 profiles` · `before 2013` (device cutoff). Netflix uses almost no trust-signal numbers (no subscriber counts, no "X billion hours"). Every number in the help corpus is an instruction parameter.

**Accessibility content** `[observed]` — substantial, and structured as a **feature inventory rather than a statement**. `Accessibility on Netflix` opens with a values sentence ("we want everyone to enjoy great stories, no matter their language, device, internet connection, or abilities") and a provenance claim ("guided by **international accessibility standards and relevant legal frameworks**"), then lists ten features alphabetically, each a heading with one sentence and a link:

`Assistive listening systems` · `Audio descriptions` · `Brightness controls` · `Font size controls` · `Keyboard shortcuts` · `Playback speed controls` · `Screen readers` · `Subtitles & closed captions` · `Voice commands`

Notes on craft:

- **Audio description is defined, not just named**: "give more detail about what's happening on screen, including facial expressions, physical actions, and changes in scene." Three concrete examples.
- **Subtitles vs closed captions are distinguished inline**, in parentheses, in one sentence: "`subtitles` (dialog turned into readable text on your screen) and `closed captions` (dialog, **plus a description of sounds** you'd hear)." This is the clearest consumer-facing gloss of that distinction in the corpus.
- The feature list is **alphabetical**, which is neutral but means the two highest-impact features (audio description, subtitles) are not prioritised.
- **Four separate feedback routes** offered: `voice or chat customer support`, the `Report a Problem tool`, a dedicated `Accessibility Feedback form` (a JotForm), and a how-to article (`How to share accessibility-related feedback`). Netflix also publishes `Netflix accessibility release notes` — an **accessibility changelog**, which is rare and excellent practice.
- Co-design is claimed with a named counterparty class: "we ask for feedback from members and **accessibility and disability advocacy groups**."

**Gaps** `[observed]`: like Spotify, **no WCAG conformance level is stated** and no known-limitations section exists. The statement is embedded in the help centre rather than published as a standalone accessibility statement, so it carries no date, no version, and no scope declaration. `Report a Problem tool` and the JotForm are two separate mechanisms with no stated difference. And the dedicated accessibility form is hosted on a third-party domain (`netflix.jotform.com`) — functional, but off-brand and off-domain for a compliance artefact.

**Alt text** `[observed]` — the help centre's instructional images carry genuinely descriptive, procedural alt text:

- `Resetting modem and device, 30-sec timer, cable unplugged.`
- `Illustration of a TV with a power button symbol, a power strip, and a 15-second timer, suggesting a restart device process`
- `Netflix Manage your membership page with "Cancel" option being tapped to cancel membership.`
- `Netflix account page with "Extend Pause" button being tapped to extend paused membership.`

These describe **the action being illustrated**, not the objects in the frame — which is the correct standard for instructional imagery and better than most. The two styles are inconsistent (`Resetting modem and device, 30-sec timer, cable unplugged.` is a telegraphic fragment; the others are full clauses), but both convey the procedure.

Inline icon alt is weaker: `icon-notes-square.png` and `note-text.svg` appear as **filename-as-alt or empty alt** on the recurring `Note:` callout glyph, and `icon-back-en.png`, `icon_home_en.png`, `icon-roku-remote-star_en.png` likewise. The adjacent text supplies the meaning (`press the back button`, `Press Star on your Roku remote`), so this is defensible, but the filenames are leaking into the accessibility tree on dozens of articles.

**Negative findings, recorded honestly**

- `A country must be selected to view content in this article.` renders on 7+ articles with no adjacent selector and no explanation — a gating message that neither gates nor offers the action
- `tvq-pb-101 (3.1.undefined)` — a JavaScript `undefined` promoted into a published help-article title
- `tvq-pb-101 (3.3.Permanent failure)` — untyped sub-code namespace mixing digits and English prose
- Error-code **casing is not normalised**: `NW-2-5` vs `tvq-pb-101` vs `ui-113`
- `Get Started` (marketing) vs `Join Netflix` (help) vs `Sign up for Netflix` (article body) — three labels, one action
- `Add Profile+` (TV) vs `Add Profile` (web/mobile)
- `Sign out, Reset, or Deactivate` — three device-dependent labels for one recovery, documented rather than normalised
- `Viewing Activity` vs `viewing history` for the same object
- `Audio Descriptions won't turn off` vs `Audio descriptions won't turn on` — casing differs between sibling articles
- `create, edit, or delete` vs `add, change or delete` — Oxford comma inconsistent between sibling titles
- `Related Articles` block duplicated verbatim on every article page
- `FAQ` and `Help Center` as separate footer links with no stated difference
- FAQ Q2 (`How much does Netflix cost?`) does not lead with the price
- FAQ Q1 and Q5 substantially duplicate each other
- Maturity-rating glosses inherit inconsistent boundary phrasing (`under 17` vs `17 and under`) and are displayed side by side
- Maturity ratings for a Kids profile **cannot be changed on a TV** — disclosed twice and given a third troubleshooting article, but still a device cliff at the moment of need
- No public status or incident page; the outage ladder terminates at the user's ISP
- No WCAG conformance claim in the accessibility article; feedback form on a third-party domain

---

## Transferable patterns

1. **One article per exact error string, including the sub-code.** `tvq-pb-101 (5.2.5)` gets its own page so the user's on-screen text matches a search result verbatim. Then teach the namespace syntax explicitly: *"If there are additional numbers or letters inside parentheses ( ), search for that exact error code."* Condition: you must be willing to inherit your client's string bugs into your public content (see `undefined`) and to maintain dozens of near-duplicate articles.
2. **State where the unhappy path ends, before step 1.** "Follow the steps below to fix the issue. If it isn't fixed after doing these steps, you'll need to contact your internet service provider." Eliminates the "I did everything and now what" cliff. The single most reusable move in this file.
3. **Cause and blame-locus in two sentences, before any instruction.** `Error code <X> means <plain cause>. This usually points to <likely locus>.` Users triage on locus, not on cause.
4. **Make waiting a numbered step with its inline exception.** `Wait at least 15 seconds. If you use a cable box, wait 3 minutes instead.` Users skip un-numbered waits.
5. **One fixed verification phrase, never varied.** `try Netflix again` closes every step block, 14+ times. Varying it would make readers re-read it.
6. **Give every step a rationale sentence.** "Restarting your network boxes will make your device request a fresh connection, clear old data, and fix common connectivity issues." Compliance with tedious steps rises when the mechanism is named.
7. **Refuse scope explicitly, with a reason and a named alternative owner.** "Netflix Customer Service can't assist with connecting a device to the internet because the steps are often unique for each device… contact the company that made it." No apology, no hedge.
8. **Decompose symptoms by which sensory channel survived.** `Black screen with no sound` / `Black screen with sound` / `Video freezes but sound keeps playing`. That is how users describe faults and it maps to different causes. Applies to any multi-channel failure (payment: card declined vs bank timeout vs 3DS fail).
9. **Pre-emptively negate the specific wrong mental model.** "Signing out of your account or deleting the Netflix app doesn't cancel your account." Name the two things users actually do believing they have acted.
10. **Name the residual capability of a degraded state.** Paused: "you can still browse Netflix and add to My List." Ad tier: "you can pause playback during an ad." Restriction, then what still works.
11. **Overlay your own audience bands on inherited third-party taxonomies.** `Recommended for Kids / Teens / Adults` above MPA and TV ratings, so the user never has to compare `PG-13` with `TV-14`. Directly applicable to any product surfacing external classification schemes.
12. **Disclose what the entitlement gap will look like in the UI.** "A lock icon will appear on unavailable titles" — not just *that* content is missing, but the visual signal for it, with its own help article.
13. **Disclose what your algorithm does *not* use.** "The recommendations system does not include demographic information (such as age or gender)." Negative disclosures are more trustworthy than positive ones, and Netflix keeps it consistent by disclosing separately that the *ads* system does ask for DOB and gender.
14. **Gloss the jargon you cannot avoid, in parentheses, inline.** "(An algorithm is a process or set of rules followed in a problem solving operation.)" and the subtitles/closed-captions distinction. Both cost one clause.
15. **Distinguish user-chosen from system-imposed states with different words.** `pause` (user, preserves account, capped at 3 months) vs `hold` (system, makes cancellation immediate). Never conflate agency.
16. **Publish an accessibility changelog.** `Netflix accessibility release notes` — rare, cheap, and it converts an accessibility statement from a claim into a record.

## Caveats & gaps

- **Error-code library only sampled.** 17 distinct codes were observed (4 `NW-`, 3 `tvq-`, 1 `ui-`, plus 10 `tvq-pb-101` parenthetical variants), of which **14 were observed only as article titles via site-restricted search**, not as opened pages. Two bodies (`NW-2-5`, `tvq-pb-101`) were read in full. The real library is very likely an order of magnitude larger; no public index of all codes was found. Any claim here about codes not listed would be invention and is not made.
- **`Explore Topics` / help category tree is client-rendered** and was not retrieved, so T11's category labels are absent. The IA description is based on server HTML only, and the "search-first, no browse" characterisation may understate a client-side tree.
- **All in-product UI strings are `[documented]`, not observed** — profile screens, PIN prompts, `Viewing Restrictions`, the error screen's `More Details` menu, the ad-break counter, and the rating flash are quoted from help articles, never seen.
- **Signup plan cards are client-rendered.** Only `Step 1 of 3`, `Choose your plan`, `No commitments, cancel anytime.` and `Next` were retrievable; the plan-card copy at the point of purchase is unharvested and may differ from the help-centre plan table.
- **Empty states not reachable** (T8 `[absent]`) — all are post-auth.
- **No status page found.** Absence recorded as the finding; `status.netflix.com` was not fetched.
- **Locale is en-US only.** Prices, rating labels (MPA + TV Parental Guidelines), and CCPA links are US artefacts. The maturity-rating article's own language set (English / French / French-CA / Spanish-LatAm) indicates the rating table is North-America-scoped; the equivalent EU (age-number), UK (BBFC) and Brazil (ClassInd) tables were not harvested and **must not be assumed**.
- **The `tvq-` prefix semantics** (`pb` = playback, `st` = start/stream) are **inferred from article content, not stated anywhere by Netflix**. Flagged as inference.
- Netflix's games, live-events, and podcast surfaces are unharvested beyond incidental mentions.

## Sources

1. https://www.netflix.com/
2. https://www.netflix.com/signup/planform
3. https://help.netflix.com/en
4. https://help.netflix.com/en/troubleshooting
5. https://help.netflix.com/en/node/14424 — Netflix Error NW-2-5
6. https://help.netflix.com/en/node/59985 — Netflix Error tvq-pb-101
7. https://help.netflix.com/en/node/264 — Parental controls on Netflix
8. https://help.netflix.com/en/node/2064 — Maturity ratings for TV shows and movies on Netflix
9. https://help.netflix.com/en/node/24926 — Plans and Pricing
10. https://help.netflix.com/en/node/10421 — How to create, edit, or delete profiles
11. https://help.netflix.com/en/node/100639 — How Netflix's Recommendations System Works
12. https://help.netflix.com/en/node/116022 — Accessibility on Netflix
13. https://help.netflix.com/en/node/407 — How to cancel Netflix
14. https://help.netflix.com/en/node/126831 — Ads on Netflix

**Error-code article titles observed via site-restricted search (titles only, bodies unread):**
https://help.netflix.com/en/node/12977 (`NW-3-6`) · /12233 (`NW-1-19`) · /13197 (`NW-2-4`) · /62405 (`tvq-st-131`) · /51932 (`tvq-st-103`) · /14423 (`ui-113`) · /111824 (`tvq-pb-101 (E100)`) · /126617 (`(8.1)`) · /134191 (`(0)`) · /100069 (`(3.1.11)`) · /59709 (`(5.2.5)`) · /120333 (`(3.3.Permanent failure)`) · /58817 (`(1.8)`) · /134194 (`(5.6.2)`) · /64893 (`(3.1.undefined)`)
