# 171. Adobe Express

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Consumer design and template graphics / browser-based creative suite with generative AI |
| Primary URL | https://www.adobe.com/express/ |
| Corpus rank | 171 |
| Benchmark strength (source list) | Template-led creation |
| Locale / market observed | en-US (some pages served en-GB spellings and one JPY price set — see Caveats) |
| Platform observed | Web (desktop), helpx help centre, Adobe Trust Center, legal pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated financial/health product. Disclosure regimes visible in copy: **California AI Transparency Act** and **EU AI Act** (both named in Content Credentials material); accessibility conformance against **revised Section 508**, **WCAG 2.2 Level AA** and **EN 301 549**, published as ITI VPAT 2.x ACRs; C2PA / Content Authenticity Initiative as a voluntary provenance standard |
| Harvest date | 2026-09-22 |
| Pages inspected | 18 attempted, 16 usable |
| Harvest completeness | Partial — `status.adobe.com` is fully client-rendered and yielded no status vocabulary; the generative-credits FAQ truncates before six of its own TOC answers, including the two most load-bearing ones; the Firefly page geo-resolved to Japan so only JPY prices were observable; `/express/pricing` renders its plan cards client-side so no prices appear on the pricing page itself |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.adobe.com/express/ | Hero, benefit captions, feature cards, plan cards, footnotes. **Carries the empty-state defect** |
| Pricing | https://www.adobe.com/express/pricing | Four audience tabs, FAQ ×4 sets, footnotes. No prices rendered |
| Pricing comparison fragment | https://www.adobe.com/express/fragments/pricing-table/individuals-ff-bundle | The real feature/credit table the pricing page embeds |
| Help hub | https://helpx.adobe.com/express/user-guide.html → `/express/web.html` | 27 top-level nav groups, 279 article links |
| Get started (help) | https://helpx.adobe.com/express/get-started.html | Resolves to the same hub — byte-identical |
| Templates | https://www.adobe.com/express/templates/ | Search, filters, sort, ~60 template cards |
| AI template generator | https://www.adobe.com/express/create/ai/template-generator | The clearest 4-step "how it works" in the corpus |
| Features index | https://www.adobe.com/express/feature | Quick Actions hub, 5-step how-it-works |
| Why choose Express | https://www.adobe.com/express/why-choose-express | Competitor comparison tables, individuals vs teams |
| Remove background | https://www.adobe.com/express/feature/image/remove-background | The only real error-string set in the corpus |
| Adobe Firefly | https://www.adobe.com/products/firefly | Model picker, commercial-safety claims, 20-question FAQ |
| Generative credits FAQ | https://helpx.adobe.com/creative-cloud/apps/generative-ai/generative-credits-faq.html | **Partial** — truncated |
| Generative AI User Guidelines | https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html | Six numbered sections |
| Accessibility | https://www.adobe.com/accessibility.html → `/trust/accessibility.html` | Three named principles |
| Accessibility compliance | https://www.adobe.com/accessibility/compliance.html | ACR index; three Express ACRs published |
| Content Credentials (help) | https://helpx.adobe.com/creative-cloud/help/content-credentials.html → `.../adobe-content-authenticity/content-credentials/overview.html` + 4 siblings | Overview, view, troubleshoot, training preferences |
| Content Credentials (standard) | https://contentcredentials.org/ | C2PA-hosted; the "pin" vocabulary |
| Adobe status | https://status.adobe.com/ | **BLOCKED** — client-rendered shell only |

---

## T1 Navigation & IA labels

**Express local nav — seven tabs, and the split is by *verb*, not by feature** `[observed]`

`Overview` · `Create` · `Edit` · `Print` · `Business` · `Education` · `Plans`, plus utility `Go to Adobe Express`, `App switcher`, `Sign in`.

The interesting decision is that `Create` and `Edit` are separate top-level tabs carrying almost entirely different vocabularies. `Create` groups by **output artefact** (`Instagram Story`, `Business Card`, `Poster`, `Resume`, `Invoice`); `Edit` groups by **operation** (`Remove Background`, `Resize Image`, `Trim Video`, `Merge Video`). A user arriving with "I need a flyer" and a user arriving with "I need to cut this video down" are routed through different mental models on purpose. Wise splits its nav by audience tier; Adobe splits it by intent direction — make something new vs. change something you have.

Sub-groupings, all `[observed]`:

- `Create › Social Media` — `Instagram Story`, `Instagram Reel`, `Instagram Post`, `TikTok Video`, `Facebook Story`, `Facebook Post`, `YouTube Video`, `YouTube Thumbnail`, `YouTube Banner`, `Meme`, `Content Scheduler`
- `Create › Marketing` — `Business Card`, `Flyer`, `Logo`, `Advertisement`, `Collage`, `Presentation`, `Profile Picture`, `Create a QR code`
- `Create › Document` — `Poster`, `Brochure`, `Invitation`, `Menu`, `Card`, `Certificate`, `Resume`, `Invoice`
- `Create › Design with AI` — `Generate Template`, `Generate Text Effect`, `Generate Image`, `Generate Logo`, `Generate Presentation`, `AI Drawing`
- `Edit › Image Quick Actions` — `Remove Background`, `Resize Image`, `Convert to JPG`, `Convert to PNG`, `Convert to SVG`, `Crop Image`, `Change Background`
- `Edit › Video Quick Actions` — `Convert Video to GIF`, `Crop Video`, `Trim Video`, `Resize Video`, `Merge Video`, `Convert Video to MP4`, `Animate Characters`, `Caption Video`, `Remove Video Background`, `Clip Maker`
- `Print › Apparel & Lifestyle` — `T-shirts`, `Hoodies`, `Pillows`, `Mugs`, `Tote bags`
- `Plans › Compare plans` — `Individuals`, `Businesses`, `Students`, `Educators`, `Why Choose Adobe Express`

Every `Design with AI` label is a bare imperative verb + object (`Generate Template`), while every `Quick Actions` label is also a bare imperative verb + object (`Remove Background`). The two systems are grammatically identical but sit in different tabs under different coined umbrellas — a user cannot tell from the label whether an operation is generative or deterministic. That is a real IA cost of the `Create`/`Edit` split.

**Defect in the nav itself** `[observed]`: the `Edit` group's first item renders as `Adobe Express Adobe Express` — a doubled label. `Convert to SVG` appears twice pointing at two different destinations, and `Remove Video Background` points at an **image** path.

**Help-centre chrome** `[observed]`: breadcrumb `Adobe Help Center` › `Adobe Express Web Help`; header `Adobe Express Help`; a platform switcher `Mobile` / `Web`; CTA `Open on Web`. There is **no search field label or placeholder and no bypass link** anywhere in the helpx hub rendering.

**Trust Center nav** `[observed]`: `Security`, `Responsible AI`, **`Accessibilty`** (misspelled, in both the desktop and mobile copies), `Transparency Center`, `Compliance`, `Privacy`, `Fraud Prevention`, `Product/Service Status`, `Hosting Locations`, `Resources`. A company that publishes three accessibility conformance reports for one product has a typo in the word "Accessibility" in its own left nav.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The quick and easy create-anything app.`
> Subhead: "Make stunning social posts, images, videos, flyers, and more with Adobe Express. Dream it. Make it. Easy."

`create-anything` as a hyphenated compound adjective is doing the positioning work: it refuses to name a category. Compare the meta title, which does the opposite and names all three (`Free Design, Photo, and Video Tool`). The rendered hero is deliberately category-free; the SEO title is deliberately category-dense.

**The signature construction is the three-fragment imperative triad** `[observed]`: `Dream it. Make it. Easy.` — two verbs and then an adjective in the verb slot. The grammatical break on the third beat is the whole rhetorical move, and it recurs: `Create easier. Dream bigger.` · `Real businesses. Unreal results.` · `The power of Adobe Firefly. Pocket-sized.`

**Headlines are sentence case with a terminal full stop, even as fragments** `[observed]`: `Video made easy.` · `Resize any asset.` · `Create anytime, anywhere.` · `Easily stay on brand.` · `Content creation made easy.` · `Nobody does it like Adobe Express.` · `Edit images, videos, and PDFs in just a few clicks.`

Exceptions are visible and look unintentional: `Switch To Adobe Express.` (stray capital "To"), `Designed to level up your business` and `Compare Features` (no full stop), and four Firefly benefit H3s (`Production-ready results`, `Time-saving automation`) that drop the period their siblings carry.

**Benefit captions are noun-phrase, not sentence** `[observed]`: `Create anything, quickly and easily` · `Edit with one click` · `Create fast with generative AI` · `Start from standout content`. The fourth is the template-led one and it is the only one that does not name an action — it names a *starting position*.

**Section headers on the features page are all imperative + possessive** `[observed]`: `Edit your images.` · `Edit your videos.` · `Edit your files.` — a three-beat parallel that then breaks into `Explore features.` and `Create fast with generative AI.`

**Pricing headline** `[observed]`: `Stand out with Adobe Express. Pick your plan.` — benefit first, instruction second, in one line. The FAQ block is headed twice on different pages with two different strings: `Frequently asked questions` and `Questions? We have answers.`

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Adobe Express Free` | Hero, ×3 on homepage, pricing, features | The primary acquisition label |
| `Start 30-day free trial` | Hero, pricing, why-choose | Premium trial |
| `Start 7-day free trial` | Firefly Pro card, Creative Cloud Pro card | **Two different trial lengths on one page, unlabelled as to why** |
| `Get free plan` | Free plan card | vs `Get Adobe Express Free` two cards away |
| `Get free app` | Mobile fork sheet | Fifth variant of the same action |
| `Download App` | `meta-cta-1-text` on all pages except homepage | Sixth variant |
| `Create now` | `meta-main-cta-text`, homepage/pricing/templates | |
| `Create your design now` | Same meta slot on `/express/feature` | Same slot, different string, sibling pages |
| `Create in web now` | `meta-cta-1-text`, homepage only | |
| `Browse all templates` | `meta-cta-2-text` | |
| `Start from scratch` | `meta-cta-3-text`; also a **rendered cell** in the templates grid | The blank-canvas escape hatch given equal visual weight |
| `Edit this template` | Templates grid, ~60× | **The template-framing decision — see T4** |
| `Search 1000's of templates` | Templates hero + toolbar, ×4 | Incorrect apostrophe in a plural numeral |
| `Generate now` | Template generator hero + floating CTA | |
| `Use this prompt` | ×4, beside each example on template generator | Teaches by donation rather than instruction |
| `Try AI Assistant` | Homepage feature card | |
| `Upload your image` | remove-background, ×4 | |
| `Upload image to start` | Features page | Seventh start-verb variant |
| `Remove background` / `Remove background now` | Same destination, same page | Duplicate |
| `Edit in Firefly` | remove-background result state | Hands the user to a different product mid-task |
| `Discover brand kits` / `Discover templates` / `Discover effects` / `Discover design elements` / `Discover assets` / `Discover PDF Quick Actions` | Features page | Six `Discover X` in one page |
| `Explore templates` | Features page, `Remix it.` card | Competes with `Discover templates` on the same page |
| `View All` | ×4 carousels, features page | |
| `User Guidelines` | Occupies the `View All` slot on the AI carousel only | A legal link in a browse affordance |
| `Compare Plans` / `Compare all plans` / `Compare Features` / `Compare Firefly plans` | Nav / homepage / pricing / Firefly | Four labels, one job |
| `Request Information` / `Request more info` | Enterprise cards | |
| `Chat with Sales` (Express nav) vs `Chat with sales` (global footer) | Same page | Casing conflict |
| `Terms apply` / `See terms` | Promo banners | |
| `Show more` | Country/plan lists | |

**Observation.** Adobe Express ships **seven distinct "start the action" labels** (`Try now`, `Generate`, `Generate now`, `Upload image to start`, `Create now`, `Create your design now`, `Create video`/`Create videos`) and **six "get the app" labels**. The duplication is not random — it tracks page authorship. The `meta-*` slots show the same semantic role being filled with a different string per page template, which means the inconsistency is a content-ops artefact of a decentralised CMS rather than a deliberate register choice. Contrast Wise, whose duplication (`Sign up` vs `Register`) is limited to two surfaces.

## T4 Onboarding & getting-started `[observed]`

### The central question: is a template a starting point or a finished thing you modify?

Adobe hedges, and the hedge is legible in the strings.

**The per-card verb on the templates page is `Edit this template`** — not "Use this template", not "Start with this template", not "Customize". `Edit` positions the template as an **already-complete artefact you alter**, which is the opposite of the "starting point" framing the rest of the site uses. And `Start from scratch` is given **its own cell inside the template grid**, sitting among the template cards as a peer rather than as a secondary link — so the blank canvas is presented as one more template.

**The strongest template-first copy on the site never renders.** The templates page carries, in metadata only:
- `meta-long-text-heading`: `Bring your idea to life with templates from Adobe Express.`
- `meta-hero-title`: `Editable free Adobe Express templates.`
- `meta-long-text-content` opening: "Start inspired with thousands of free, professionally designed templates you can fully customize right from your browser."

`Start inspired` is the sharpest template-as-starting-point phrase in the whole corpus and **it is invisible to users** — the rendered hero instead says `Create anything—quickly and easily.`, which is capability-first and template-neutral. This is a genuinely instructive failure: the best framing was written, then buried in an SEO slot.

**Elsewhere the two modes are explicitly equalised** — `/express/feature` step 1 is literally `Start with a blank canvas or a template.`

**`Remix it.`** appears exactly once, as a card header on `/express/feature` (body: "Customize premade templates, graphics, and text to make them your own.", CTA `Explore templates`). The word does **not appear on the templates page at all**. Firefly uses it independently for a different concept: `Remix content from the community.` So the single most modern framing of template use — remix — is orphaned on a page that is not the templates page.

Homepage benefit caption: `Start from standout content`. Template generator subhead: "Choose the design you like best, customize with your own branding and text, and download when you're done."

### Three incompatible step-labelling conventions on one product

**Template generator — 4 steps, bolded imperative sentences with terminal periods:**
1. `Get started for free.`
2. `Enter your prompt.` — carries the only prompt-length guidance in the corpus: "Start with 5 words or more, such as \"promotional poster for plant-themed coffee shop.\" The more descriptive, the better."
3. `Generate your template.` — "Click Generate." … "Click Generate more results to see more options."
4. `Customize your new template.` — closes with the reassurance "No previous design experience is required."

**Features page — 5 steps, numbered 1–5, no `Step` prefix:**
`Start with a blank canvas or a template.` · `Customize with ease.` · `Leverage a rich library of assets.` · `Animate your creations.` · `Share and collaborate.`

**Remove background — 4 steps, each explicitly prefixed `Step N`:**
`Step 1 Open Firefly.` · `Step 2 Upload a photo.` · `Step 3 Select Remove Background.` · `Step 4 Download.`

**No page anywhere uses "Step 1 of N" progress language.** The only progress strings observed in the entire corpus are `0%` and the broken `Loading % Completed` on remove-background.

Step 2 of the template generator is worth stealing independently: it is the only place Adobe quantifies a prompt (`5 words or more`), gives a worked example inline, and then states the heuristic (`The more descriptive, the better.`) in that order — constraint, example, principle. Most generative products give the principle and omit the constraint.

**Help-centre onboarding is absent.** `get-started.html` does not serve its own page; it resolves to the same product hub as `user-guide.html`. The `Get started` nav group contains only reference articles (`Adobe Express on desktop web technical requirements`, `Enable hardware acceleration`, `Keyboard shortcuts`, `Switch to dark mode in Adobe Express`). **There are no numbered onboarding steps anywhere in the help centre** — all sequencing lives in marketing.

## T5 Form & field labels `[observed]`

**Firefly generate widget** — the product's primary pre-auth form:

| Element | String |
|---|---|
| Field label | `Enter prompt and select model` |
| Placeholder | `Describe what you want to generate` |
| Mode toggle | `image` / `video` (lowercase) |
| Model group headers | `Adobe models` / `Partner models` |
| Group taglines | `Commercially safe` / `Models created by others` |
| Model options | `Firefly Image 5` (default), `Gemini 3.1 (w/ Nano Banana 2)`, `GPT Image 1.5`, `FLUX.2 [pro]` |
| Submit | renders as `Generate image Generate` — label and accessible name concatenated |

The two group taglines are the highest-value strings on the page. `Commercially safe` / `Models created by others` is a **binary risk label applied at the point of model selection**, not buried in terms. The second tagline is a masterclass in defensible negative framing: it does not say "not commercially safe", it says who made them, and lets the contrast do the work.

**Templates page:**
- Result count `230,803 Adobe Express templates`
- Search field has **no visible placeholder** — icons only. The only search copy is the CTA `Search 1000's of templates`
- Filter groups `Free vs Premium` → values `Premium & Free`, `Free`, `Premium`; `Static vs Animated` → values `Static & Animated`, `Static`, `Animated`. **The value order contradicts the group label in both cases**
- Sort values `Most Relevant`, `Most Viewed`, `Rare & Original`, `Newest to Oldest`, `Oldest to Newest`
- Trending chips `Resume`, `Business Card`, `Certificate`, `Brochure`, `Photo Collage`, `Medical Certificate`
- View-density selector is **icon-only, three unlabelled buttons**

**remove-background upload control:**
- Button `Upload your image`; helper `Or drag and drop here` (desktop) / `Or tap here` (mobile)
- Constraint `File must be JPEG (JPG), PNG, or WEBP and up to 40MB.`
- Consent line, stated *before* upload: "By uploading your image or video, you agree to the Adobe Terms of Use and Privacy Policy and confirm you are 18 years of age or older."
- Post-result chips `Upscale`, `Remove`, `Generate new background`, `Studio lighting`

The consent line is good practice — age attestation and terms acceptance placed at the upload control rather than at account creation. The defect is that the same page's FAQ says the limit is `up to 100MB` while the control and the error both say `40MB`.

## T6 Status & state language

**Generation and upload states** `[observed]`, remove-background:
- `Uploading image, loading remove background` with `0%`
- `Processed image` (result alt)
- `One moment as we take you to Firefly` with `[[progress-bar]] Loading % Completed` and `Cancel`

That second string ships an **unrendered template token and an empty percentage** to production. The pattern it was meant to express — narrate the handoff (`One moment as we take you to Firefly`) rather than show a bare spinner — is worth keeping; the implementation is broken.

**Clipboard state** `[observed]`: `Copied to clipboard`, repeated once per template card (~60 instances on one page), with a green check. The only toast-style string in the Express marketing corpus.

**Generative-credit state is the substantive state system, and it is documented rather than observed** `[documented]`:

- Balance location: "You can view your generative credit count in your Account menu." · "Select your profile avatar image located in the upper-right corner of the page."
- Counter semantics, verbatim callout key: `A. Number of generative credits left in the current billing cycle B. Number of generative credits included in your plan` — a two-number display, remaining over allocated
- Photoshop surface: a `Generative Credits Usage` panel, described as a "centralized in-app destination to check generative credit balance", reachable from four named places including "In the dialogs, under Generative AI features (for example, Generative Upscale, AI Sharpen, AI Denoise)."
- Reset: "For paid plans, generative credit counts reset each month based on the billing date of your plan." · "These credits expire one month from allocation." (free plans) · "These limits refresh each day so you can continue to explore" (free users, daily)
- Rollover: "No, generative credits do not roll over to the next month."
- Failure refund: "credits are typically refunded to your credit balance within minutes" (up to 24 hours for video)
- Unlimited states: `Unlimited access` / `Does not deduct credits` / `Deducts credits` / `Limited complimentary generations`

**The single best string in this category is `Credits vary`** `[documented]` — a label shown next to the Run button in Firefly Graph where the cost cannot be computed in advance. "Graph replaces the usual credit estimate with the Credits vary label" and "Credits will be consumed based on real usage and deducted from your account when the run completes."

This is a metered-product content pattern worth generalising: when you normally show a price estimate and cannot, **replace the estimate with a named uncertainty state rather than hiding the estimate or showing zero**. Two words, states the uncertainty, and the adjacent sentence states when the real number arrives. The defect is that the FAQ prose calls it `Credits varies`, so the doc and the UI disagree.

**Credit exhaustion — every documented outcome is commercial** `[documented]`:
> "Once you reach your monthly generative credit limit, you can either wait until your credits reset the next month or purchase additional generative credits with Adobe Firefly or credit add-on plans."

Followed by five plan-specific branches (Creative Cloud paid → buy a Firefly plan; Firefly Standard → upgrade or add-on; free users → subscribe; business → "reach out to your Account Manager or Partner"; Photoshop → buy in the panel).

**Explicit negative finding:** case-insensitive sweeps of the retrievable text returned **zero matches for `slow`, `slower`, `reduced`, `throttl` and `priority`**. There is no slowed-, throttled-, degraded- or lower-priority-generation language anywhere in the corpus. Every exhaustion path is "wait or pay". The page's own TOC lists a question `What does it mean if I am able to queue beyond my credit limit?` — the one place a degraded state could live — and **its answer sits past the fetch truncation and was not retrieved**. Recorded as unknown, not as absent.

**Publish, schedule and sync states** `[absent]` as live UI. Evidence exists only as help-article titles (`Content Scheduler overview`, `Unpublish previously shared files`, `Share files as Published links on Individual plans`) and as pricing-table values (`1 account per social network` / `3 accounts per social network`).

## T7 Error, failure & recovery

**The remove-background error set is the only real one in the corpus — four strings, no title/body split** `[observed]`:

- `Your media must be smaller than 40MB. Please upload a new file.`
- `Your media must be a JPEG, JPG, PNG, or WebP file. Please upload a new file.`
- `Only one file can be uploaded at a time.`
- `Unable to process the request`

The pattern is `<what's wrong>. <what to do>.` — two short sentences, no apology, no "Oops", second person, imperative recovery. Three of four follow it. `Unable to process the request` follows neither: no period, no recovery action, no cause. It is the one string in the set that describes the *system's* failure rather than the *user's* input, and it is the one that abandons the pattern. That correlation is worth flagging as a general risk: teams write good recovery copy for user error and fall back to passive system-voice for their own failures.

**Firefly generate widget** `[observed]`:
- `Please describe what you want to generate.`
- `Prompt exceeds the max length of 750 characters`
- `Unable to process the request`
- `Close error toast`
- `Alert Text` — **a placeholder string shipped to production**

**Content Credentials error set** `[documented]` — three error headings: `File format does not meet the requirements` / `Incompatible file properties` / `Connectivity issues`. Constraints stated as a single sentence: "Content Credentials can only be applied to JPG or PNG files, with a maximum of 50 files at a time. Each file must not exceed 20MB." Failure conditions enumerated as bullets beginning with verbs — `Are corrupted` / `Are less than 256x256px in dimension` / `Uses a color space other than RGB (CMYK)`. Recovery: "Try again after the connection is restored." and an escalation path "If someone else has applied Content Credentials to your content, contact us at abuse@adobe.com."

**A genuine recovery feature with its own vocabulary** `[documented]`: `Search for possible matches`, under the heading `Recover Content Credentials through possible matches` — "If Content Credentials are stored in the Adobe Content Credentials cloud, they can be recovered even from a screenshot." Adobe built, and named, a recovery path for provenance metadata stripped by screenshotting. That is a real unhappy-path investment.

**Prompt-refusal wording** `[absent]`. No page surfaces a refusal message. The closest is the disclosure in the Generative AI User Guidelines: "Your prompts and inputs to, and the results generated by, generative AI features in Adobe products may be reviewed through both automated (such as machine learning) and manual methods for abuse prevention and content filtering purposes."

**Troubleshoot help titles are symptom statements, not questions** `[observed]`: `Adobe Express not loading on desktop` · `Error notification when accessing prior files` · `Video upload is slow on Chromebook` · `Video playback is slow on Chromebook` · `Unable to view the Open in Photoshop or Open in Illustrator button` · `File isn't reflecting the updates made in Photoshop or Illustrator` · `Favorites unavailable after Adobe Express for teams upgrade` · `Personal profile missing after Adobe Express for teams upgrade` · `Profile mismatch in Adobe Express` · `Unable to access assignments`.

Compare Wise's first-person confessions (`I sent the wrong amount`) and Riverside's first-person symptoms (`My track is stuck uploading`). Adobe uses **third-person state descriptions with no actor** — `Favorites unavailable after…`. It is scannable and neutral, but it never names who did what, so it is harder to match against the sentence a user would type.

## T8 Empty states

**CONFIRMED DEFECT, and it is worse than a single bad string** `[observed]`.

The homepage renders, inside the plan-comparison block:

> `Your search for  did not yield any results`

— with the double space where a search term should interpolate. It appears **six times**, twice in each of the three plan tabs. No search has been performed on this page.

Adjacent to it, in all three tabs, the same component leaks its **untranslated i18n key set as visible body text**: `coll-no-results-text` · `coll-result-mobile-text` · `1 result in` · `results in` · `results for` · `REFINE YOUR RESULTS` · `filter by category` · `RESOURCES` · `Special Offers - opens in a new window`.

So this is three defects compounded in one component: a rendering-state bug (no-results state rendering *while* three populated plan cards render), a string-interpolation bug (empty value, double space), and an i18n-key leak. Checked and clean on `/express/pricing`, `/express/templates/`, `/express/feature`, `/express/why-choose-express` and remove-background — the defect is specific to the homepage's plan-comparison collection.

This is the same class of failure as the Wise help-search empty-query string, and on a far more trafficked page. The generalisable lesson: **the no-results state is where interpolation bugs surface, and it is the state least likely to be exercised in review.**

**Two unintentional empty states** `[observed]`: the `Learn with Adobe Express` section on the helpx hub renders a heading and a `View more tutorials` CTA with nothing between them. The templates page renders the label `Suggestions` with no suggestions beneath it — an orphaned label.

**First-run and zero-state copy** `[absent]` — behind auth.

## T9 Notifications & system messages `[observed]`

- **Global promo banner**, every adobe.com page: `Save 50% off on Creative Cloud Pro.` / "Start creating and save for the first 3 months. New subscribers only. Terms apply." / CTA `Save today`
- **Firefly sticky promo bar**: "Save on our biggest Firefly plans until Oct 21. And get unlimited generations in Firefly on select models for the first year." / `Buy now`
- **Plan badges**: `Best value` (Adobe Firefly Pro), `Introductory Offer` (Adobe Express Teams), `Limited-time offer` (Firefly Pro Plus), `New` — and, in the pricing fragment, the value `In development` used as an entitlement state for `AI Assistant (Beta)` on the Free plan. `In development` as a *table cell value* rather than a dash or "Not included" is a small, good choice: it tells a free user the feature is coming, not withheld.
- **Mobile app-fork sheet**: `Get the full experience in the app.` with `Get free app` / `Web version` / `Continue`
- **Chat widgets**: `Chat with us`, `Questions? Get help from our experts.`
- **Trial prompts**: `Start 30-day free trial`, `Start 7-day free trial`, and on Firefly a bare `Free trial` with **the duration never stated**

**Status page** `[absent — blocked]`. `https://status.adobe.com/` returns only "You need to enable JavaScript to run this app." No component names, no severity vocabulary, no incident phrasing could be extracted. Adobe does publish an accessibility conformance report for `Adobe Status`, which confirms the surface exists and is considered in scope for a11y — but its content vocabulary is unreachable by this method.

## T10 Disclosures, legal & compliance

The richest category for this product, and the one with the clearest transferable practice.

### Pricing footnotes — verbatim, and self-inconsistent `[observed]`

The same footnote 1 exists in two forms on the same page:
> `1If you have signed up for a free trial, billing begins when free trial ends. Cancel before free trial ends and you won't be charged. Subscription automatically renews until you cancel.`
> `1Billing begins when free trial ends. Cancel anytime. Cancel before free trial ends and you won't be charged. Subscription automatically renews until you cancel.`

The second adds `Cancel anytime.` and drops the conditional opener. Footnote 2 likewise appears with `webpage` in one instance and `web page` in another, on one page.

Homepage set `[observed]`:
> `1 Billing begins when your free trial ends. Cancel before free trial ends and you won't be charged. Subscription automatically renews until you cancel. Cancel anytime.`
> `2 Limited beta availability: Adobe Express Premium, Desktop and English (US) only.`
> `3 Available on the Premium plan.`

Footnote 2 is the strongest of the three: it bounds a beta on **three axes at once** — plan, platform and locale — in eleven words. Most products bound a beta on one axis and let users discover the other two by failing.

Teams terms `[observed]`: `2 seat minimum required. See terms.` · `Discount offer first year only, then US$7.99/moper license.` (missing space is in the source) · `Annual, billed monthly` · `No annual commitment, billed monthly.` · `Free to use. No credit card required.`

**Competitive-comparison footnote** `[observed]`, on why-choose-express:
> "Feature comparisons based on publicly available information as of May 2026. Features are subject to change; please visit adobe.com/express for the most up to date information on Adobe Express."

Dating a competitor comparison and stating the evidence basis ("publicly available information") is a defensible practice worth copying wherever a product publishes a rival matrix.

### Generative credits — the entitlement disclosure `[documented]`

Allocations actually seen: Adobe Express Premium `250`/month; Adobe Firefly Pro `4,000`/month; Firefly Standard `2,000`, Pro Plus `10,000`, Premium `50,000`; Creative Cloud Pro `4,000 for premium generations + unlimited standard`; Creative Cloud Standard `25`; Photography 1TB `1,000`; Adobe Express and Firefly site licence `1,200`; Shared Device Access `10`.

Costs actually seen: standard features `1 credit per generation`; Generate Video 1080p@24 `100 credits per second`, 720p `50`, 540p `20`; Generative Extend 4K@30 `175 credits/sec`; Generate Sound Effects `10 credits per generation`; Generate Music `20 credits per minute`; Generate Speech `10 credits per 1000 characters with Firefly Speech`, `15` with ElevenLabs Multilingual v2; Firefly Image 5 `10 credits per generation`, Image 4 Ultra `20`; Firefly Custom Models (beta) `500 credits per training`.

Two modelling notes. First, **the unit changes per feature type** — per generation, per second, per minute, per 1000 characters, per object, per training — which is honest to the underlying cost but means no user can hold a single conversion rate in their head. Second, Firefly publishes a **plain-language conversion example beside the abstract number**: "Generate up to 20 five-second videos or translate up to 6 minutes of audio or video". That pairing — abstract unit plus a concrete "this many of the thing you actually want" — is the single most reusable disclosure move on the page.

### Commercial safety and training data — one claim, five phrasings `[observed]`

Adobe's differentiator is that Firefly is safe to use commercially. It says so in five different ways:

| Phrasing | Where |
|---|---|
| `designed to be commercially safe` | homepage, pricing FAQ, template generator (×2) |
| `commercially-safe generative AI` (hyphenated) | why-choose-express hero |
| `Commercially safe` | Firefly model-picker group tagline |
| `safe for commercial use` | template generator FAQ question |
| `Adobe Firefly models are commercially safe.` (unhedged) | Firefly FAQ 12 |

Note the hedge collapses on the last one. Everywhere Express speaks, the claim is `designed to be` — a process claim. On the Firefly product page the claim becomes flat and absolute. **Same company, same model, two different liability postures depending on which product page you land on.**

The training-data claim is consistent in substance: models "were trained on a dataset of licensed content, such as Adobe Stock, and public domain content where copyright has expired." Firefly FAQ 14 (`Does Adobe train Adobe Firefly on my personal content?`) answers no, and extends the promise to partner models.

### IP indemnification — stated as enterprise-only, and missing where it matters `[observed]`

- Pricing fragment row `Protect your brand` — "IP indemnification for Adobe Firefly generated content." Value: `-` for Express Free, Express Premium **and** Firefly Pro
- Second row `Firefly output indemnification` — "Select plans eligible for IP indemnification for Firefly generated images." Also `-` across all three
- why-choose-express row value: `Available for Enterprise plans` in all four columns
- **Zero occurrences of "indemnify" or "indemnification" on the Firefly product page** — the page a buyer evaluating commercial risk is most likely to read

So the commercial-safety *claim* is on every page and the commercial-safety *guarantee* is on three, always as a dash. That gap between "designed to be commercially safe" (everywhere) and "indemnified" (enterprise only, mentioned thrice) is the most consequential disclosure finding in this file.

### Content Credentials `[documented]`

- Definition, and the best analogy in the corpus: "Content Credentials are a durable, industry-standard metadata type that acts like a **digital nutrition label** for content."
- Tamper-evidence: "Unlike other types of metadata, Content Credentials are cryptographically signed, making them tamper-evident. Any changes made after its application can be detected and flagged to viewers."
- Persistence and versioning: "As content is edited over time, new Content Credentials can be added at each stage, creating a transparent version history…"
- Automatic application: "Adobe automatically applies Content Credentials to content made with Adobe Firefly and its APIs…"
- Prohibition, in the Generative AI User Guidelines §6: "You must not remove, alter, or disable any Content Credentials."
- Do-not-train preference, named `Content Credentials generative AI training and usage preference`; checkbox label `I request that generative AI models not train on or use my content,`; scope statement "This preference is currently supported by Adobe Firefly and Spawning."; and an honest consequence disclosure: "If this preference is enabled, your work can't be uploaded to Adobe Stock, as Firefly is trained only on licensed content, such as Adobe Stock assets."
- Viewer instruction: `Hover over the Cr icon on the image to view the Content Credentials`
- Regulatory framing: "New and emerging laws, including the California AI Transparency Act and the EU AI Act, require transparency for content generated or modified using generative AI."

The C2PA-side vocabulary `[observed]` at contentcredentials.org adds the consumer-facing term: **"It all starts with the pin"** — "The Content Credentials pin signals that the content contains information about its provenance." So the standard body names the affordance `pin`; Adobe's help names it the `Cr icon`. **Two names for the same mark, from the two organisations that must both teach it.**

**The decisive negative finding: Content Credentials is never mentioned on any Adobe Express marketing page in this corpus** — not the homepage, pricing, templates, template generator, `/express/feature`, or why-choose-express. It does not appear in the Express help-centre nav either. Adobe co-founded the standard, publishes extensive documentation, cites the EU AI Act, applies the credentials automatically — and says none of this on the surfaces where the largest number of its generative users actually are.

### Accessibility statement `[observed]`

Three named principles, each with a one-sentence definition:
- **`Accountability`** — "We take ownership of our work's impact by maintaining processes and resources dedicated to receiving and responding to internal and external concerns."
- **`Responsibility`** — "We collaborate with people with disabilities to design and develop technologies that account for diverse abilities and improve product accessibility."
- **`Transparency`** — "We openly share our accessibility approach with customers and regularly report on our progress."

Method statement names the practice concretely: "We use **blueline annotations** for wayfinding and engineer for assistive technologies like screen readers and keyboards… we combine automated and manual testing, and we conduct external audits to verify conformance."

Three support cards: `Disability Help Desk` ("The team is available Monday-Friday, 9AM-5PM PST."), `Conformance Reports`, `Compliance Standards`. Reports use the `ITI VPAT 2.x® template` against revised Section 508, `Web Content Accessibility Guidelines 2.2 level AA` and `EN 301 549`. Fallback routing: "If you do not see a document for a particular product, please request the conformance document on the accessibility feedback form."

**Adobe Express has three published ACRs** — desktop web/iPadOS, iOS, Android, all 2025. Firefly has one (2024). Naming a staffed help desk with stated hours, and publishing per-platform conformance reports rather than one product-level claim, is the strongest accessibility disclosure pattern in this batch.

## T11 Help-centre architecture `[observed]`

`user-guide.html` 302-redirects to `/express/web.html`, the "Adobe Express Web Help" hub. The left nav carries **27 top-level groups, 21 second-level headings and 279 article links**, and is rendered twice verbatim in the markup.

**Top-level groups, in order** — and the ordering is the artefact:

1. `What's new` · 2. `Get started` · 3. `Bring in assets from other apps` · 4. `AI Assistant` · 5. `Video creation and editing` · 6. `Image creation and editing` · 7. `Documents and presentations` · 8. `Design webpages` · 9. `Create with templates` · 10. `Create drawings` · 11. `Audio and animation` · 12. `Create and customize text` · 13. `Add images and visuals` · 14. `Arrange layers and pages` · 15. `Bulk create and automate` · 16. `Brands, libraries, and projects` · 17. `Invite and collaborate` · 18. `Publish and share` · 19. `Print and export` · 20. `Add-ons and integrations` · 21. `Adobe Express subscription` · 22. `Adobe Express for education` · 23. `Troubleshoot` · 24. `Set roles and permissions`

The tree is ordered as a **production pipeline** — import, generate, edit by media type, compose, brand, collaborate, publish, print — with account and troubleshooting appended at the end. Compare Wise, whose help tree is ordered by *user anxiety* (`Where is my money?` as a category). Adobe's is ordered by *workflow stage*. Both are defensible; the difference is that Adobe's assumes the user knows where in the pipeline their problem sits, which is exactly what a confused user does not know.

Note that `Create with templates` is **ninth**, after four media-type groups. For a product whose benchmark strength is template-led creation, templates are not a first-class entry point in the help IA.

**Article-title grammar — five shapes, used inconsistently:**

| Shape | Share | Examples |
|---|---|---|
| Bare imperative verb phrase | ~60% | `Trim videos`, `Add comments`, `Create brands`, `Align elements` |
| Imperative + `in Adobe Express` | ~20% | `Create videos in Adobe Express`, `Spellcheck content in Adobe Express`, `Print designs in Adobe Express` |
| Noun + `overview` | ~8% | `AI Assistant overview`, `Content Scheduler overview`, `Custom fonts overview` |
| Symptom statement | troubleshoot only | `Video upload is slow on Chromebook`, `Unable to access assignments` |
| Noun + `FAQ` | small | `AI Assistant FAQ`, `Rewrite FAQ`, `Assignments and classrooms FAQs` — note `FAQ` vs `FAQs` |

The shape-1 / shape-2 split is unexplained: `Trim videos` and `Create videos in Adobe Express` sit in the same nav group. Two title-case outliers break the sentence-case convention entirely (`Overview of the New Adobe Express Home for Education`).

## T12 FAQs

Placement is the notable thing: Adobe runs **four separate FAQ sets on one pricing page**, keyed to the audience tab. Questions verbatim, answers summarised.

**`/express/pricing` — Individuals tab (7):**
1. Where can I check out all the templates available?
2. What is Creative Cloud Libraries?
3. Can I set up more than one brand?
4. How does Adobe Express work with other Adobe Creative Cloud products?
5. Can customers make commercial use of the images generated with AI tools powered by Firefly?
6. What does "designed to be commercially safe" mean for Adobe Firefly in Adobe Express?
7. Can businesses train their own Firefly models in Adobe Express?

**Businesses tab (7):** adds `What do I get with a business plan that I don't get with an individual subscription?`, `What are the differences between the Adobe Express business plans?`, `I want my organization to start using Adobe Express. How do I get it for my business?`, `I would like to try Adobe Express for free before making a purchase. What are my options?`, and `Can customers currently use the images generated from Adobe Firefly in Adobe Express commercially?` — then **repeats Individuals Q6 and Q7 verbatim**.

**Students tab (3):** `Can I get Adobe Express Premium for free through my university?` · `What's the right plan for me if I'm a student?` · `Where can I check out all the templates available?` (**duplicate of Individuals Q1 with a different link target**).

**Educators tab (6):** `How is Adobe Express for K-12 Education different from the commercial version of Adobe Express?` · `What happened to Adobe Spark?` · `What's the difference between Adobe Creative Cloud and Adobe Express?` · `Does my K-12 district need an Adobe Creative Cloud license to use Adobe Express in the classroom?` · `Where do I go to learn how to use Adobe Express?` · `How does Adobe Express protect safety and privacy in K–12 education?`

**Structural notes.** Q5/Q6 (commercial use, commercial safety) appear on **both** the Individuals and Businesses tabs, in near-identical wording — Adobe has decided the commercial-safety question is the one every audience asks, and has chosen duplication over a shared block. Q1 on Individuals and Q3 on Students are the same question with different destinations, which is duplication without a decision behind it.

`What happened to Adobe Spark?` is a **product-death FAQ** kept alive on the Educators tab years after the rename. That is a real pattern: name the retired product in a question, on the tab where the longest-tenured users are.

**Template generator (6):** `Is the Adobe Express AI template generator safe for commercial use?` · `What is an AI template generator?` · `How can I best use the template generator?` · `What can I create with the Adobe Express AI template generator?` · `How is the AI template generator different from the AI presentation generator in Adobe Express?` · `Can I get Adobe Express for free? If so, what's included?`

Note the ordering: **commercial safety first, definition second.** A FAQ that leads on licensing risk before explaining what the thing is tells you exactly what the support load looks like.

**remove-background (12)** and **Firefly (20)** are SEO-shaped comparison sets — `What is the best background remover?`, `What is the best AI image and video generator?`, `How does Adobe Firefly compare to other AI image, video, and audio generators?` — i.e. the FAQ block is being used as a ranking surface, not a support surface. The two that are not: `Is Adobe Firefly commercially safe?` and `Does Adobe train Adobe Firefly on my personal content?`

**Pages with no FAQ at all:** templates, why-choose-express (its accordion holds three *statements*, not questions: `Easily make standout content.` / `Empower anyone to create quickly.` / `Work across your favorite Adobe apps.`), and the Content Credentials overview.

## T13 Terminology & glossary

Adobe Express's terminology problem is not vocabulary choice — the coinages are good — it is **casing governance**. Almost every coined term exists in three or four capitalisations across the site.

| Term | Casings observed | Where they conflict |
|---|---|---|
| `Quick Actions` | `Quick Actions` · `Quick Action` · `Quick actions` · `quick actions` | Marketing uses Title Case; helpx article titles use `Quick actions`; helpx CTA uses `quick actions`. Four forms |
| `Brand kit` | `Brand Kits` · `brand kits` · and help uses neither, saying `Brands` | The pricing fragment row is labelled `Brand Kits` and its own description says "one brand kit" — **the cell disagrees with itself** |
| `generative credits` | always lowercase in prose, except the Photoshop panel `Generative Credits Usage` | `Account menu` vs `Account Menu` on the same page |
| `AI Assistant` | `AI Assistant (beta)` · `AI Assistant (Limited Beta)` · `AI Assistant (Beta)` · `Firefly AI Assistant` · bare `AI Assistant` | Five forms, and only one carries the `Limited` qualifier |
| `Content Scheduler` | `Content Scheduler` (nav, tables) · `content scheduler` (features body + its own CTA) | Same page |
| `Firefly` | `Adobe Firefly` · `Firefly` · `Adobe Firefly AI` · **`Adobe Fire fly`** (typo) | `Powered by Adobe Firefly` vs `Powered By Adobe Firefly` in one comparison |
| `Partner models` | `Partner generative AI models` · `partner models` · `Partner Models` · `Partner models` | Four |
| `Clip Maker` | consistent — but the qualifier is not: `Clip Maker (Based on video transcript, English only)` vs `Clip Maker (Based on video transcript)` | **The English-only constraint silently disappears in the teams table** |
| `Content Credentials` | consistent across 13 occurrences; icon is `Cr icon` on one page and `cr icon` on its sibling | |

**Six vocabularies for one entitlement system** `[observed]`. The thing a user spends is called, across Adobe's own pages: `generative credits` · `free daily generations` · `Free daily generations` · `2 free lifetime uses` / `5 free lifetime uses` · `limited generative AI credits` · `more AI credits` · `4,000 credits`. And `generative credits` — the canonical term — **never appears on `/express/feature`, why-choose-express, templates, or remove-background**, all of which describe the entitlement using one of the other five.

`free lifetime uses` is the most interesting of the six and the least used: it is a *non-renewing* allowance, semantically different from a monthly credit, and Adobe correctly gave it a different noun. That distinction is then lost everywhere else.

**Register split by surface** `[observed]`:
- Marketing says `Firefly`, `generative AI`, `Brand Kits`, `AI Assistant (beta)`
- Help says `generative AI` and `AI Assistant` but **never says `Firefly` at all** — Firefly is not mentioned in the Express help-centre nav or body copy
- Help says `Brands`, never `brand kit`
- Legal says `generative AI features` and `Content Credentials`, never `Firefly`

So a user who learns the word `Firefly` from marketing cannot find it in help, and a user who learns `Brand Kits` from the pricing table cannot find it in help either. The register split is not a considered gradient (as with Wise's `Wise Multi-Currency Card` → `Wise card`); it is three teams naming the same things independently.

**Other coined terms observed with casing** `[observed]`: `Generate Presentations`, `Generate Text Effect`, `AI Drawing`, `Insert & Remove Objects`, `Firefly Boards` / `Adobe Firefly Boards` / `Boards`, `Custom Models` / `Firefly Custom Models`, `Animate All`, `Dynamic Animations`, `Enhance Speech`, `Safe Zones` (URL slug `social-safezones`), `Caption Writer`, `Social Mentions`, `Shared Calendars`, `Quick replace`, `Published links`, `Custom Home`, `Asset reclamation`, `Basic Shapes`, `Credits vary`, `Generative Fill`, `Generative Extend`, `Prompt to Edit`, `Turntable`, `Text to Avatar (beta)`, `Metricool Add-On` vs `TikTok Symphony Assistant Add-on` (**Add-On vs Add-on in one table**).

**Plan names have two systems.** `Adobe Express for teams` / `for enterprise` / `for Education` (lowercase after "for", pricing FAQ) vs `Adobe Express for Teams` / `for Enterprise` / `for Education` (title case, helpx CTAs). Same three plans, two conventions, split by property.

## T14 Voice, tone & accessibility

**Person and mood.** Second person throughout body copy, present tense, heavy imperative in headings and CTAs. First-person plural appears only in institutional voice — `Questions? We have answers.`, "We believe that when people feel respected…", "We reserve the right to disable accounts…". Adobe is not a visible actor in the product copy the way Wise is; it appears only in the legal and accessibility registers.

**Sentence fragments are the dominant headline form** and are punctuated as sentences. `Video made easy.` · `Resize any asset.` · `Real businesses. Unreal results.` · `Content creation made easy.`

**Punctuation habits.** Em dashes set closed, no spaces (`Create anything—quickly and easily.`), though two strings on `/express/feature` use a spaced hyphen instead. Apostrophes mix curly and straight, sometimes within three lines. Superscript footnote markers are set without a space, producing `AI Assistant2` and `brand kits3` as rendered text.

**Locale voice defect** `[observed]`: the templates page hero uses British `Customise social media posts…` on a page hard-coded to `locale=en-US&contentRegion=us`, while the same page's metadata uses American `fully customize right from your browser`. The page contradicts itself within one screen.

**Alt text — mostly poor** `[observed]`:
- `fill_gift` — a raw internal asset filename used as alt text on the helpx hub
- `card coverGenerate sound effects`, `card coverSwitch to dark mode in Adobe Express` — decorative alt concatenated into the link's accessible name
- `Resize images using Quick actions link icon` (×6) — icon alt bleeding into the link name
- `PhotoshopPhotoshop`, `Adobe ExpressAdobe Express` — doubled accessible names in the app switcher; screen readers announce each app twice
- `Open link in a new window` ×3, identical and non-descriptive
- Good examples exist, and they are all in the Content Credentials documentation: "Hover over the Cr icon on the image you want to inspect to view the attached Content Credentials." — an alt string that is also an instruction
- `![Processed image](<>)` — alt present, source empty

**No `Skip to main content` or any bypass link was observed on any page in this corpus** — marketing, help, Trust Center or legal. For a company publishing WCAG 2.2 AA conformance reports, that is the sharpest negative finding in the file. Icon-only controls with no text label: the templates grid-density selector (3 buttons), the per-card share button, the search-clear button, the why-choose accordion toggles.

**Heading-structure defect** `[observed]`: the helpx hub renders `#### Web` (H4) immediately above `# Adobe Express Help` (H1) — an H4 before the H1, with the H1 additionally wrapped in bold.

**Negative findings, recorded honestly**

- The homepage no-results defect, ×6, with leaked i18n keys beside it
- `Alert Text` and `[[progress-bar]] Loading % Completed` shipped to production
- A **staging-environment URL** (`www.stage.adobe.com/legal/...`) shipped in the `User Guidelines` legal link on `/express/feature`
- Japanese copy on the English Firefly page (the `Students and teachers` nav description)
- Authoring/CMS tokens rendered as visible body text on nearly every page: `style`, `Toggle`, `padding`, `none`, `anchor`, `tab-1`, `rgb(248, 248, 248)`, `s-spacing`, `Grid-width-12`
- **40MB vs 100MB** upload limit contradiction on one page, and three spellings of the format list on that same page
- Four quantity claims for templates on one page: `dozens` (meta), `1000's` (CTA), `thousands` (metadata prose), `230,803` (rendered count) — plus `220,000+` on why-choose and `268,000+` / `519,000+` on the pricing fragment
- `/express/feature/image/remove-background` is an **Express URL serving Firefly-branded content** with a Firefly canonical, Firefly nav and Firefly page title, while linked from the Express nav as an Express Quick Action
- `Search 1000's of templates` — incorrect apostrophe, rendered ×4
- Every template card emits `[Edit this template](url)` immediately followed by the raw URL rendered as its own link label, ~60 times
- The Express local nav and the helpx left nav are each rendered **twice, verbatim**, in the served markup

---

## Transferable patterns

1. **Name the uncertainty instead of hiding the estimate.** `Credits vary` — shown in the slot where a cost estimate normally sits, with one adjacent sentence saying when the real figure arrives. Transfers directly to any metered or variable-fee surface: an FX quote that cannot be locked, a shipping cost pending dimensions, an interchange-dependent fee. Condition: only works if the adjacent sentence states *when* the number resolves. A named uncertainty with no resolution point is worse than no label.
2. **Pair the abstract unit with a concrete conversion.** "4,000 monthly generative credits" beside "Generate up to 40 five-second videos or translate up to 13 minutes". Any product that bills in an invented unit — credits, points, tokens, API calls — should ship the conversion in the same card, in the units the user came for.
3. **Bound a beta on every axis at once.** "Limited beta availability: Adobe Express Premium, Desktop and English (US) only." Plan, platform and locale in eleven words. Most beta labels bound one axis and let the user discover the rest by failing.
4. **Risk-label at the point of choice, and frame the risky option by provenance, not by warning.** `Commercially safe` / `Models created by others` in the model picker. It never says "unsafe"; it says who made them. Transfers to any surface offering a first-party and a third-party path with different liability.
5. **Date and source a competitor comparison.** "Feature comparisons based on publicly available information as of May 2026." Cheap, and it converts an attack surface into a credibility signal.
6. **The no-results state is where interpolation bugs ship.** Adobe's homepage renders a no-results string six times on a page with no search box. Wise has the same class of bug. Test the empty-query and the zero-result paths explicitly; they are the least-exercised states in review and the most likely to leak template tokens.
7. **Do not let your best framing live only in metadata.** `Start inspired with thousands of free, professionally designed templates` is the strongest template-led sentence Adobe has written and no user will ever see it. Audit for copy that exists only in `meta-*` slots — it is often the clearest, because it was written to be understood by a machine.
8. **A claim's hedge should not vary by page.** `designed to be commercially safe` on Express and `Adobe Firefly models are commercially safe.` on Firefly are two different legal postures for one model. Pick the hedge once and enforce it, or the strongest version becomes the one you are held to.

## Caveats & gaps

- **`status.adobe.com` is fully client-rendered** and returned only a JavaScript notice. No component names, severity labels or incident phrasing were captured. T9's status subsection is `[absent — blocked]`, not absent from the product.
- **The generative-credits FAQ truncates.** Six questions listed in the page's own table of contents were never retrieved, including `What does it mean if I am able to queue beyond my credit limit?` — the single place a degraded-generation state would plausibly be documented — and `Can I use Adobe Firefly-generated outputs commercially?`. The claim "no throttling language exists" is therefore bounded: it is true of everything retrieved, and one unretrieved answer could contradict it.
- **`helpx.adobe.com/firefly/.../firefly-faq.html` was unreachable** after seven attempts across five URL variants (alternating timeouts and empty 200s).
- **Firefly prices are JPY only.** The Firefly page geo-resolved to Japan during harvest. No USD Firefly prices were observed and none are reported. Any Firefly price in this file is a JPY figure and must be re-verified before use as US precedent.
- **`/express/pricing` renders no prices.** Plan cards are client-side `merch-card-collection` fragments. All USD figures in this file come from the homepage (rendered) and the `individuals-ff-bundle` fragment (rendered), not from the pricing page.
- **All in-product states are documented, not observed.** Credit counters, the `Generative Credits Usage` panel, publish and schedule states, empty states and validation messages are reconstructed from help articles and pricing tables. Marked `[documented]` throughout.
- **Help-article bodies were not opened; titles only** — 279 titles are high-signal for IA and task phrasing but say nothing about answer structure.
- **Mobile and iPad app copy not harvested.** Adobe publishes separate ACRs for iOS and Android, so those surfaces have distinct string sets outside the public web.
- **Localised sites not harvested.** Adobe serves Express in 19 languages; the en-GB/en-US mixing found on the templates page suggests locale QA is worth a dedicated pass.

## Sources

1. https://www.adobe.com/express/
2. https://www.adobe.com/express/pricing
3. https://www.adobe.com/express/fragments/pricing-table/individuals-ff-bundle
4. https://helpx.adobe.com/express/user-guide.html (→ https://helpx.adobe.com/express/web.html)
5. https://helpx.adobe.com/express/get-started.html
6. https://www.adobe.com/express/templates/
7. https://www.adobe.com/express/create/ai/template-generator
8. https://www.adobe.com/express/feature
9. https://www.adobe.com/express/why-choose-express
10. https://www.adobe.com/express/feature/image/remove-background
11. https://www.adobe.com/products/firefly
12. https://helpx.adobe.com/creative-cloud/apps/generative-ai/generative-credits-faq.html
13. https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html
14. https://www.adobe.com/accessibility.html (→ https://www.adobe.com/trust/accessibility.html)
15. https://www.adobe.com/accessibility/compliance.html
16. https://helpx.adobe.com/creative-cloud/help/content-credentials.html (→ .../adobe-content-authenticity/content-credentials/overview.html, plus view, troubleshoot and generative-AI-training-preferences siblings)
17. https://contentcredentials.org/
18. https://status.adobe.com/ (blocked)
