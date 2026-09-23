# 066. Warby Parker

| Field | Value |
|---|---|
| Domain | `COMM` — Commerce and delivery |
| Industry / sub-vertical | DTC eyewear (vertically integrated optical retail + telehealth) |
| Primary URL | https://www.warbyparker.com/ |
| Corpus rank | 066 |
| Benchmark strength (source list) | Guided shopping and home try-on |
| Locale / market observed | en-US (a `/country/ca` switcher exists; not harvested) |
| Platform observed | Web (desktop, server-rendered HTML); several flagship flows are iOS-app-only |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **HIPAA-covered entity** — Warby Parker Inc. and affiliated eye practices publish a Notice of Privacy Practices; Washington My Health My Data consumer-health-data policy; state-by-state telehealth optometry restrictions gating the Virtual Vision Test; CCPA/CPRA; California Transparency in Supply Chains Act; CA AB 1305 |
| Harvest date | 2026-09-21 |
| Pages inspected | 26 (23 with server-rendered content, 3 empty/404) |
| Harvest completeness | **Partial, and the named benchmark is discontinued.** The Home Try-On programme has ended. The Help Centre, all FAQ answers, quiz steps 2–8 and the eye-exam booking flow are client-rendered and unreachable. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.warbyparker.com/ | Hero, value bar, Advisor and VTO modules |
| Home Try-On | https://www.warbyparker.com/home-try-on | **Deprecation notice** — the programme has ended |
| Home Try-On quiz (orphan) | https://www.warbyparker.com/home-try-on-quiz-LTK | **Still live and indexable, still selling the ended programme** |
| 5 reasons (orphan) | https://www.warbyparker.com/5-reasons-to-shop-at-warby-parker | Also still promotes Home Try-On; `noindex` |
| Virtual Vision Test | https://www.warbyparker.com/virtual-vision-test | Three-phase telehealth flow, eligibility gating — best T10 source |
| How to get a prescription | https://www.warbyparker.com/get-a-prescription | Decision matrix; **a second, different eligibility list** |
| Measure your PD | https://www.warbyparker.com/pd/instructions | Three-step measurement instructions |
| Style quiz | https://www.warbyparker.com/quiz/frames | Step 1 only; "1 of 8" |
| Advisor / VTO quiz | https://www.warbyparker.com/vto-quiz | "Meet your Advisor" |
| Eyeglasses PLP | https://www.warbyparker.com/eyeglasses | Filters, FAQ block |
| PDP — Durand, Rose Water | https://www.warbyparker.com/eyeglasses/durand/rose-water | Configuration controls, prescription routing |
| Lens guide | https://www.warbyparker.com/eyeglasses/lenses | The clearest terminology system on the site |
| Insurance | https://www.warbyparker.com/insurance | Benefit-check form, in/out-of-network |
| Flexible spending | https://www.warbyparker.com/flexible-spending-accounts | FSA/HSA hedges; Help deep-link pattern |
| Buy a Pair, Give a Pair | https://www.warbyparker.com/buy-a-pair-give-a-pair | Mission FAQ |
| How our glasses are made | https://www.warbyparker.com/how-our-glasses-are-made | Process glossary |
| Intelligent Eyewear | https://www.warbyparker.com/intelligent-eyewear | Smart-glasses line |
| Eyewear A to Z | https://www.warbyparker.com/learn | 51-page education blog |
| Accessibility | https://www.warbyparker.com/accessibility | Soft conformance commitment |
| Notice of Privacy Practices | https://www.warbyparker.com/notice-of-privacy-practices | HIPAA notice |
| Washington health data policy | https://www.warbyparker.com/washington-health-data-policy | Names VTO and lens guide as health-data surfaces |
| Terms of Use | https://www.warbyparker.com/terms-of-use | Defers the return window to Help |
| Sitemap | https://www.warbyparker.com/sitemap | Full category IA |
| Help Centre | https://www.warbyparker.com/help | **Spinner only**; `noindex` |
| Eye-exam booking | https://www.warbyparker.com/appointments/eye-exams/booking | **Completely empty body** |
| Returns | https://www.warbyparker.com/returns | **404** |

---

## T1 Navigation & IA labels

**Primary nav — five dropdown triggers, three direct links** `[observed]`

`Eyeglasses` · `Sunglasses` · `Contacts` · `Eye exams` · `Insurance` · `Accessories` ·
`Style quiz` · `Intelligent Eyewear`

The first five are dropdown triggers with no server-side href. The notable inclusion is
`Insurance` as a **top-level nav item** — a payment method promoted to peer status with
product categories. For an optical retailer that is a considered decision: the single largest
barrier to purchase is "will my benefits cover this", and the IA answers it before the user
has to ask.

`Style quiz` also sits in the top nav *and* in the sticky secondary bar
(`Eyeglasses` | `Sunglasses` | `Contacts` | `Style quiz`) — the guided-shopping entry point is
given the same persistence as the three product categories.

**Promo strip above nav, sitewide** `[observed]`: `Premium eyewear, starting at $95`

**Footer column headings** `[observed]`, and they are unusually task-shaped:

`Products` · `Shop Online` · **`Get a prescription`** · `Visit a store` · **`Ways to save`** ·
`Education` · `About us` · `Need a hand?`

Three of the eight are named for a user job rather than a content type. `Get a prescription`
groups `Book an eye exam`, `Renew a prescription` and `Measure your PD` — the three things
standing between a visitor and a purchase, collected into one heading. `Ways to save` groups
`Insurance`, `Flexible spending`, `20% off contacts`, `Add a pair and save`. This is the
strongest IA decision in the file: **the footer is organised around the obstacles, not the
inventory.**

**IA defects, recorded** `[observed]`

- Both `Advisor` and `Virtual Try-On` in the footer point at `/ios-app`. **Two named products
  in the primary IA have no web destination at all.**
- The sitemap lists `Virtual Try-On` under `Getting a Prescription`, pointing at `/vto-quiz` —
  which renders an **Advisor** landing page, not a Virtual Try-On page. One label, three
  destinations, none of them a VTO flow.
- Support-row accessible names literally contain the word "Icon": `FAQ Icon FAQ`,
  `Chat Icon Chat`.
- The main-site footer exposes two contact channels (FAQ, Chat); the blog footer exposes five
  (phone, chat, SMS, email, FAQ). **Two footers, materially different support affordances.**

**Sitemap taxonomy** `[observed]`: a consistent `Shop by X` pattern — `Shop by Shape`,
`Shop by Color`, `Shop by Material`, `Shop by Features`, `Shop by Brand`,
`Shop by Manufacturer`, `Shop by Lens Type`. Top-level sections are `Eyeglasses`, `Contacts`,
`Sunglasses`, and — flatly — `Others`.

## T2 Value proposition & headline patterns

Four distinct headline shapes coexist, and they are used by page purpose rather than mixed.

**1. Price-anchored** `[observed]`
`Premium eyewear, starting at $95` (global strip) · `Glasses starting at $95` ·
`Everything included for $95` (PDP) · `Included with every pair, at no additional cost`
(lens guide)

`Everything included for $95` is the load-bearing one. In a category built on optional
add-ons, the headline claims *inclusion* rather than a low price.

**2. Editorial, with no product claim** `[observed]`
`A new take on timeless shapes` · `Highly detailed (and in high demand)` ·
`Spike Jonze sees things differently` · `Everyday eyewear, made extraordinary`

`Highly detailed (and in high demand)` shows the house device: a product attribute, then a
parenthetical that converts it into social proof, with the pun doing the join.

**3. Objection-handling** `[observed]`
`Yes, you can pay with insurance!` · `It's easy to use your insurance` ·
`Don't let your FSA or HSA go to waste!` · `We've got your eyes covered` · `Better with both`

`Yes, you can pay with insurance!` is a headline that **answers a question the user has not
yet typed**, opening with the affirmative word. Two of the four carry exclamation marks — and
both are about money the user might lose. Tone rises with urgency, not with delight.

**4. Mission** `[observed]`
`Buy a Pair, Give a Pair` · `Vision for all`

The Buy a Pair, Give a Pair page's `h1` is **a statistic, not a brand line**:
"Approximately one billion people around the world need glasses but lack access to them."
The mission page leads with the problem's scale and makes the programme name the `h2`-level
answer. Compare Patagonia (068), whose values headlines are always first-person-plural company
commitments. Warby Parker states the world's problem; Patagonia states its own promise.

**Kicker pattern on the telehealth flow** `[observed]` — all-caps conversational kickers above
each step heading: `AFTER YOU DOWNLOAD THE APP...` · `ELIGIBLE? GREAT! HERE'S WHAT'S NEXT:` ·
`LAST BUT DEFINITELY NOT LEAST`. The kicker carries the *state* ("eligible?"), the heading
carries the *action*. A two-line construction that lets a conditional branch be announced
without a branching UI.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start with a quiz` | Homepage hero | |
| `Start with a style quiz` | Eyeglasses PLP; FSA page | **Variant 2 of the same action** |
| `Start the quiz` | 5-reasons; orphaned HTO page | **Variant 3** |
| `Select lenses and buy` | PLP tiles and PDP, primary buy CTA | **Not "Add to cart"** — names the configuration step first |
| `Try on` / `Try On` / `Try on virtually` | PLP badge; PDP carousel | **Three casings of one control on adjacent surfaces** |
| `Download for free` | Virtual Vision Test hero and close | Price stated as free at the download, $15 at the outcome |
| `Download Virtual Vision Test` | get-a-prescription; PDP | |
| `Download the App` / `Download our app` / `Download for iOS` | learn / footer / homepage | Three variants |
| `Get started with Advisor` | /vto-quiz | |
| `Book an eye exam` / `Book an exam` / `Schedule an eye exam` / `Schedule an exam` | Four surfaces | **Two verbs × two lengths for one action** |
| `Sign in to measure your PD` | PD instructions, hero | Auth gate stated in the CTA |
| `Ready? Sign in to Measure PD` | PD instructions, after step 3 | Second CTA, different wording and casing |
| `Check my benefits` | Insurance form; PDP module | First person |
| `Check your benefits here` | FSA page | Second person — **person switches between surfaces** |
| `Upload now` | PDP, "Already have a non-expired prescription?" | |
| `Learn how to submit a claim` | Insurance, out-of-network | Fully specific |
| `Learn more` | BAPGAP, FSA, Pupils Project, PDP protection plan | **Bare, used roughly six ways** |
| `Learn more >` | Homepage Intelligent Eyewear | With chevron — seventh variant |
| `See all lens options` / `View all lens types` / `Learn more in our lens guide` | Homepage / PDP / PDP | **Three routes, three labels, one destination** |
| `Find your store` / `Find a location` / `Find a store near you` | Three surfaces | |
| `I'm not sure. Let's skip it.` | Style quiz, step 1 | **A soft-exit written as a sentence** |
| `Questions? See FAQ` / `Visit our FAQ` | Two surfaces | Both → `/help` |
| `Show Filters` / `Hide filters` | PLP | Casing differs between the pair |
| `Skip to main content` | Every page, first link | |

**Observation.** Warby Parker's CTA inventory is the least disciplined in this batch. The quiz
has three labels, the eye exam has four, the lens guide has three, and `Learn more` ships bare
in at least six places. `Select lenses and buy` is the standout in the other direction — it
warns the user that a configuration step sits between the button and the purchase, which is
exactly the disclosure a first-time prescription buyer needs.

`I'm not sure. Let's skip it.` is the best single string on the site. It is written as two
sentences, admits uncertainty on the user's behalf, and then takes the action *with* them
("Let's"). Most quizzes ship `Skip`.

## T4 Onboarding & getting-started — guided shopping

The brief named Home Try-On as the flagship. **It has been discontinued** (see the dedicated
section below). What survives is a portfolio of four guided flows, three of which are strong.

### 4a. Style quiz — https://www.warbyparker.com/quiz/frames `[observed, partial]`

- Progress indicator: `1 of 8` — **an 8-step quiz**
- Step 1 question: `What are you looking for?` Options: `Eyeglasses`, `Sunglasses`
- Escape hatch: `I'm not sure. Let's skip it.`
- The shell renders **without the site header or footer** — a deliberately chrome-free flow
- Expectation-setting sits in the meta description rather than on the page: a quick quiz that
  will "suggest some great-looking options"

Steps 2–8 are client-hydrated and **were not captured**. `[absent]`

### 4b. Advisor — https://www.warbyparker.com/vto-quiz `[observed]`

- H1: `Meet your Advisor`
- Expectation-setting, one sentence, and it names both stages and the output:
  "After a quick face scan and a virtual style quiz, we'll curate a list of frames just for you."
- CTA: `Get started with Advisor`
- Also `noindex`, also chrome-free

Advisor is described elsewhere as `Curated frame picks, at your fingertips`, with the
in-store analogy made explicit: recommendations "just like you're shopping in-store—all from
your phone." **The comparison class for the digital flow is the physical store**, which is the
same substitution Home Try-On used to make.

**Naming collision, recorded** `[observed]`: the homepage retail module says customers can
"get styled by a friendly advisor" — lowercase, meaning a human employee — on the same page
that sells `Advisor`, the AI product. One word, two referents, one page.

### 4c. Measure your PD — https://www.warbyparker.com/pd/instructions `[observed]`

Three numbered steps, each a **complete imperative sentence with a full stop**, each followed
by a one-line hint:

1. `Take your glasses off for your photo.` — "It also helps to be in a well-lit area with a
   clean background."
2. `Adjust your screen and look directly at the camera.` — "It should be positioned straight
   on with your face centered."
3. `Place any card (approximately the size of a credit card) under your nose and snap a pic.`
   — `Be sure the card is touching your face. (Do not show the side of your card with numbers.)`

Step 3's hint is the finding. A measurement flow that asks the user to hold a credit card to
their face, on camera, **tells them not to show the number side** — in a parenthetical, in the
hint, at the exact moment of the action. That is privacy microcopy written by someone who
imagined the photograph. It is also, notably, not framed as a warning; it is framed as
part of the instruction.

The page opens by defining the term before using it: "PD is the distance between your pupils,
and it's used to help center a prescription correctly in your frames." Definition, then
purpose, then "review the steps below" — and only then the auth gate,
`Sign in to measure your PD`, which **states the gate inside the CTA** rather than springing
it.

### 4d. Virtual Vision Test — https://www.warbyparker.com/virtual-vision-test `[observed]`

The strongest flow on the site, and the one most worth studying. Three phases, each a
kicker + heading + body, each with a **duration promised in the heading or the body**.

| Phase | Kicker | Heading | Time promised |
|---|---|---|---|
| 1 | `AFTER YOU DOWNLOAD THE APP...` | `We'll see if you're eligible` | "This part only takes about 5 minutes" |
| 2 | `ELIGIBLE? GREAT! HERE'S WHAT'S NEXT:` | `Take a 5-minute vision test` | 5 minutes |
| 3 | `LAST BUT DEFINITELY NOT LEAST` | `A qualified eye doctor will review your results` | "you'll hear back within 48 hours" |

Hero: "Seeing well out of an expired glasses or contacts prescription? If you're eligible,
renew yours from home in just 10 minutes." — a rhetorical question that **describes the user's
exact situation**, then a conditional, then a total duration that equals the sum of phases 1
and 2.

**Phase 1 is an eligibility check, and it is step one of the flow, not a footnote.** The
product's first action is to tell some users they cannot use it.

**Phase 3 prices both outcomes.** "the doctor will renew it, and you'll be charged $15. (They
may instead recommend you get an in-person, comprehensive eye exam; in that case, you will not
be charged.) Either way, you'll hear back within 48 hours." Success is priced, failure is
explicitly free, and the timing commitment covers both branches. The hero states the same rule
in six words: `$15 only if your prescription is renewed.`

**A pre-flight requirements list**, headed `What you'll need to use the app`:
`A copy of your current prescription` · `Your current glasses or contacts` ·
`An iPhone 6s or above` · `Around 10 feet of space` · `A quiet, well-lit place`

Five items, mixing document, object, device, *physical space* and *environment*. Listing
"around 10 feet of space" before the user downloads the app prevents the most likely
mid-flow abandonment.

### 4e. The prescription decision aid — https://www.warbyparker.com/get-a-prescription `[observed]`

H1: `How to get a prescription`. Two qualifying lists written as sentence stems the user
completes: `Book a comprehensive eye exam if you…` and `Renew it from home in minutes if you…`

Then a comparison matrix headed `Which service is right for me?`, columns
`Virtual Vision Test` and `Eye exam`, with **eight rows written in the user's first person**:

1. `My vision hasn't changed, but my last glasses or contacts prescription has expired`
2. `My vision has changed since I got my last prescription`
3. `I don't have any eye health concerns`
4. `I'm concerned about my eye health or get headaches`
5. `I need to renew my current prescription fast or from home`
6. `I need a new prescription for progressives`
7. `I've never worn glasses, but think I should get my eyes checked`
8. `I live in one of these states: AK, CT, DC, GA, ID, KY, NJ, NM, SC, SD, WA, WV`

This is a **first-person situation matrix** rather than a feature-comparison table. The rows
are not attributes of the two services; they are descriptions of the reader. Row 4 is the one
that matters — a symptom ("get headaches") routes the user away from the cheap, fast,
self-service option toward the clinical one. Row 8 turns a regulatory restriction into just
another row about the user's life.

The parallel to Wise's first-person confession help titles (041) is exact, moved from recovery
to selection. **Condition for reuse: the rows must be mutually exclusive enough that a reader
recognises exactly one.**

### 4f. PDP prescription routing `[observed]`

Module `Need a prescription?` offers three routes as sub-headings:

- `Book an in-person eye exam`
- `Renew your prescription at home`
- `Already have a non-expired prescription?` — "Upload it now or during checkout. If it's not
  handy, have us contact your doctor to retrieve it, or send it after you place your order."

That last sentence offers **three deferral options in one sentence**, ordered by effort. A
user without their prescription to hand is told, before committing, that not having it is not
a blocker. This is the single best piece of friction-removal copy on the site.

### 4g. Eye-exam booking `[absent]`

https://www.warbyparker.com/appointments/eye-exams/booking returns a **completely empty
body** — no header, no footer, no spinner. No booking step names, field labels or progress
language exist server-side.

## T5 Form & field labels

**Insurance benefit check** `[observed]` — https://www.warbyparker.com/insurance

Intro: "Enter your information to see if you have eligible benefits for frames, contacts, or
eye exams. If you do, we'll apply them automatically." — states what is collected, why, and
what happens next, in two sentences. The homepage variant appends the hedge
"This may vary by state or plan."

| Field / control | Notes |
|---|---|
| `First name`, `Last name`, `Date of birth`, `Zip code` | Four fields — no policy or member number required |
| `I am a dependent on this insurance policy` | Checkbox; handles the commonest edge case inline |
| `Check my benefits` | Submit |
| `In-network` / `Out-of-network` | Tabs |
| `Have an Eyemed or Cigna plan?` | Homepage-only escape hatch, naming two carriers |

Asking for four low-sensitivity fields rather than a member ID is the design decision; the
dependent checkbox is what makes it work for families.

**PDP configuration controls** `[observed]`

`Color` (value shown inline) · `Width` with a helper link `Width guide`, options
`Extra narrow`, `Narrow`, `Medium`, `Wide`, `Extra wide` · accordions `About the frame`,
`Materials`, `Measurements`, `Frame details` (bodies client-rendered) ·
`Starting at $95` / `From $95` / `or pay over time with Affirm`

**PLP filters** `[observed]`, under the group heading `Shop by`:
`Shape` · `Gender` · `Frame width` · `Color` · `Material` · `Frame price` · `Prescription` ·
`Features` · `Nose bridge`

Quick-filter chips are merchandised rather than structural: `Bestsellers`,
`Trending: 90s minimalism`, `Good for progressives`, `New arrivals`.
`Good for progressives` is the useful one — a chip that answers a prescription-driven
question with a merchandising control.

**Prescription entry fields** (sphere, cylinder, axis, ADD, PD) `[absent]` — the lens
configuration flow and the prescriptions area of the account are behind checkout and auth.

**Negative finding** `[observed]`: the PLP filter panel's close control has the accessible
name `Filters list close button` — an internal spec string shipped as user-facing copy.

## T6 Status & state language

`[observed]`

- Progress: `1 of 8` (quiz) · `Slide 1 of 3` / `Slide 1 of 4` / `Slide 1 of 10` (carousels) ·
  **`Slide 0 of 5`** on the PDP carousel — an off-by-one state string that a screen reader
  will announce
- Included-benefit chips on the PDP: `Free shipping`, `Free returns`,
  `Free returns or exchanges`
- Merch/provenance badges on PLP tiles: `Made in Italy`, `Try on`
- Proximity: `4.5 miles away` beneath a geolocated store name
- Eligibility expressed **conditionally rather than as a status**:
  "If you're eligible, renew yours from home in just 10 minutes."
- Result count: `240 frames`

**The site has one undifferentiated loading state** `[observed]`: a spinner image whose alt
text is the bare word `Spinner`. It appears on the insurance widget, the style quiz, the Help
Centre, the Intelligent Eyewear signup, every product tile, and the PDP reviews block. A
screen-reader user encounters the same meaningless token across six unrelated waits, with no
indication of what is loading or how long it will take.

## T7 Error, failure & recovery

Very little is publicly reachable, and what exists is instructive in one place only.

**The 404 page is itself client-rendered** `[observed]`. `https://www.warbyparker.com/returns`
returns a 404 whose `<title>` is `404 | Warby Parker`, but the **body contains no error
headline, no explanation and no recovery link** in server HTML. The 404 copy could not be
captured. `[absent]`

**The one strong recovery pattern is a priced non-outcome** `[observed]` — Virtual Vision
Test: "(They may instead recommend you get an in-person, comprehensive eye exam; in that case,
you will not be charged.) Either way, you'll hear back within 48 hours."

Three things happen in one parenthetical. The unwanted outcome is named as a clinical
recommendation rather than a failure. The financial consequence is removed. And `Either way`
reattaches both branches to the same timing promise, so the user's next-step expectation is
unchanged regardless of result. **A rejection written so that only the medical content
differs.**

Other recovery-shaped copy `[observed]`:

- Terms of Use, on order modification: "although We will try our best to accommodate order
  modifications, We cannot guarantee them" — a hedge, followed by a route to the Help Centre
- Privacy-rights denial with an appeal path stated in the policy, ending in instructions to
  contact the state Attorney General

Inline validation strings: `[absent]` — all forms are client-validated.

## T8 Empty states

`[absent]`. Cart, favourites, search results, order history and account are auth-gated or
client-rendered. The PLP returned 240 results on every fetch, so no zero-results filter state
was observed.

The nearest reachable equivalents `[observed]`:

- The deprecation page at `/home-try-on` — `Looking for Home Try-On?` — which functions as an
  empty state for a removed product (see below)
- A blog signup confirmation: `Thanks! Catch you later, alligator (in your inbox).`

## T9 Notifications & system messages

`[observed]`

- Global promo strip, every page: `Premium eyewear, starting at $95`
- Homepage value bar: `20% off first contacts order` · `Free shipping` ·
  **`Free 30-day returns`** · `Vision benefits accepted`, condensing on mobile to
  `Free shipping and free 30-day returns`
- PDP upsell: `Protect your new pair` — "Even with perfect vision, you can't see every accident
  coming—that's why we offer an optional, one-year paid protection plan." The pun carries the
  argument, and `optional` and `paid` are both in the sentence.
- Live chat trigger anchored at `#livechat`, labelled `Chat Icon Chat`

**Promotional copy lives inside images, and its alt text is the only text layer** `[observed]`.
This is both a copy source and an accessibility failure, because the **legal qualifiers are in
there too**:

- "Buy one prescription pair of glasses and save 20% on additional pairs. Restrictions apply."
- "Yes, we take insurance! See how much you could save. Check in seconds. Coverage may vary."
- "Instantly see what's covered. Check your insurance. Coverage may vary by plan."

`Restrictions apply.` and `Coverage may vary by plan.` exist only as alt text on a JPEG. A
user with images disabled, or a screen-reader user whose software skips decorative images,
never receives the qualifier attached to the offer.

**Support hours are published two different ways** `[observed]`: the accessibility page says
`888.492.7297 (8 a.m.–11 p.m. ET, every day)`; the blog footer says
"We're available by phone (888.492.7297) and chat today from 9 a.m.–11 p.m. ET." One hour of
disagreement about when a customer can reach a human.

## T10 Disclosures, legal & compliance — eligibility gating and medical copy

This is the richest category in the file, and the one with the most serious defect.

### Virtual Vision Test eligibility — two published lists that disagree `[observed]`

On **https://www.warbyparker.com/virtual-vision-test**, under the heading
`Virtual Vision Test is great for anyone who:`

- "sees well with their current glasses or contacts"
- "has a single-vision distance prescription"
- "has no eye health concerns"
- `is between 18 and 65 years old`
- does not live in one of **27 named states**

The same page restates the geography inside step 1 with the regulatory reason attached:
`Due to state-level regulations, these states are currently ineligible to use Virtual Vision
Test:` followed by the same 27.

On **https://www.warbyparker.com/get-a-prescription**, the identical sentence stem is followed
by **12 states** — and the decision matrix repeats the 12-state version.

**Fifteen states are gated on one page and not on the other.** Both lists are published
simultaneously, on the same domain, for the same regulated telehealth product. This file
records both verbatim and reconciles neither; which is current is not determinable from public
copy. It is the most consequential inconsistency found anywhere in this batch, because a user
in one of the fifteen can read an authoritative page telling them they qualify and another
telling them they do not.

Two age gates are published for two services: `between 18 and 65 years old` for the Virtual
Vision Test, and `are 4 years of age or older` for an in-person eye exam.

### The medical disclaimer, and a tone collision `[observed]`

Carried near-identically on both prescription pages:

> "Virtual Vision Test is not a comprehensive eye health exam and it isn't meant to replace
> visits to your eye doctor. It's important to get your eye health examined periodically even
> if you aren't experiencing any vision problems, so please follow the advice of your doctor.
> **Good to keep those peepers in check.**"

Four sentences. The first three are exactly the right register — plain, declarative, naming
what the product is not before what it is. The fourth is a joke. A regulatory scope disclaimer
that closes on "peepers" is the clearest register failure in this file, and it is worth
recording precisely because everything before it is well written. On `/get-a-prescription` the
same block is prefixed `Quick note:`, which further softens a passage whose purpose is to be
unmissable.

Compare the Wise pattern (041): tone flattens as stakes rise. Warby Parker's tone **does not
flatten** — the jokes persist into the HIPAA notice ("even if you're currently reading it
electronically!") and into the medical disclaimer. A defensible house voice, applied
uniformly, into places where uniformity is the wrong answer.

### Pricing disclosure on a conditional service `[observed]`

`$15 only if your prescription is renewed.` — eight words, in the hero, above the fold. The
condition precedes the price in the sentence. Expanded in phase 3 with the non-charge branch in
parentheses. This is the cleanest conditional-pricing string in the batch.

### Insurance and FSA/HSA `[observed]`

The limitation is given its own bolded heading rather than a footnote:

> `Important limitations: Benefits cannot be combined with promo codes or discounts—and may be
> limited. Check your plan for details.`

In-network is written as three steps, out-of-network as three steps, and the difference is
legible at a glance:

| `In-network` | `Out-of-network` |
|---|---|
| `Coverage automatically applied at checkout` | `Pay full price at checkout` |
| `Pay copay or remaining balance (if any)` | `Obtain an itemized receipt (either from your account or by contacting us)` |
| `No reimbursement paperwork needed` | `Submit a claim form and your itemized receipt to your carrier` |

Parallel three-step structures where the *content* carries the contrast. Row 3 is the
persuasion: "No reimbursement paperwork needed" versus "Submit a claim form".

**Every savings claim is hedged with "on average"** `[observed]`: `Save $100 on average`
(glasses), `Save $115 on average` (contacts), `Save $40 on average` (eye exams), and on the
PDP "Save an average of $100 when you use insurance". The FSA page adds a second hedge to the
same number: "(This may vary by state or plan.)"

Accessory eligibility carries an unusually honest deferral: select accessories "may be FSA or
HSA eligible (we recommend checking with your account's provider before ordering an
accessory)" — the brand declines to answer a question it cannot answer per-plan.

### Lens and prescription gating `[observed]` — https://www.warbyparker.com/eyeglasses/lenses

Recommendation rules are stated as thresholds the user can check against their own
prescription:

- `If there's an 'ADD' value on your prescription, progressives may be right for you.`
- Thinner: "Recommended for anyone with a strong prescription (+/-4.0 or higher total power)"
- Thinnest: "Recommended for those with especially strong prescriptions (+/-8.0 or higher
  total power)… `Note: These lenses are not suitable for children under 18.`"
- Readers: "simple magnification (up to +2.75) for, well, reading—no prescription necessary."

The `ADD` rule is the pattern: **name the field on the physical document, then the
conclusion.** A user holding a prescription can act on it without understanding what ADD means.
The age restriction on a lens *material* is a safety disclosure sitting inside a merchandising
tier.

Warranty, stated in a parenthetical inside the benefits list: "(And if scratches appear, we'll
replace your prescription lenses for free within six months of purchase.)" Repeated on the PDP
as `Free scratched lens replacement` / "Guaranteed for prescription lenses within six months
of purchase."

### Returns `[observed]`

The window is stated in marketing surfaces — `Free 30-day returns` (homepage),
`Free returns or exchanges` / `Within 30 days of purchase` (PDP), and in the PLP category
description — but:

- The **Terms of Use do not state a return window**. §h defers entirely: "For more information
  about returns and exchanges and replacing your lenses, check out the Orders section of our
  Help page."
- **`/returns` is a 404.**
- The Help Centre where the policy actually lives is `noindex` and client-rendered.

So the authoritative return policy is **not reachable on any public, indexable, server-rendered
surface**. The window is asserted in promotional copy and nowhere else. Recorded as a finding,
not a reconstruction.

### HIPAA — Notice of Privacy Practices `[observed]`

Effective 13 October 2025. Carries the statutorily mandated all-caps header. Section headings
follow the regulatory template (`Our Use and Disclosure of Your PHI Without an Authorization`,
`Your HIPAA Rights with Respect to Your PHI`, `Complaints`), and the **rights are labelled in
plain verb form**: `Inspect and copy` · `Amend` · `Accounting of disclosures` ·
`Restrictions on certain uses and disclosures` · `Confidential Communication` · `Paper copy` ·
`Choose someone to act for you`.

`Choose someone to act for you` is the one worth stealing — it renders "personal
representative" as an action the reader can take.

**Naming inconsistency** `[observed]`: the Terms of Use call this the
`HIPAA Notice of Privacy Practices`; the page's own `h1` and the footer link both say
`Notice of Privacy Practices`. Three references, two names.

### Washington My Health My Data `[observed]`

Effective 6 May 2025. Rights labelled `Right to Confirm`, `Right to Access`,
`Right to Deletion`, `Right to Withdraw Consent`, `Right to Obtain Sharing Information`.

**The directly UX-relevant disclosure** is a sentence that exists nowhere else on the site: it
names which product features generate consumer health data — "when you use our
**Virtual Try-On** feature, access blog articles that include information about healthcare, and
review our **lens guidance** to identify the best glasses lenses for your eyes."

A try-on tool and a merchandising guide are classified as health-data-generating surfaces, and
**the only place a user learns this is a state-specific privacy policy.** Neither the VTO
entry points nor the lens guide carries any indication. That is a genuine finding about where
disclosure obligations and product surfaces fail to meet.

Also: "At this time, we do not Sell Consumer Health Data." — present-tense, bounded, and
preceded by the conditional authorisation clause.

### Other regulatory `[observed]`

- Intelligent Eyewear: `Compatibility, availability, and age restrictions vary. Some features
  require setup or subscription.`
- Terms of Use carve-out: the Terms "do not apply to professional optometry or medical services
  furnished by our employed, affiliated, or independent optometrists or ophthalmologists" —
  the retail contract explicitly stops at the clinical boundary
- The Terms still reference a legacy product name, `Prescription Check`, with its own terms —
  evidence of the Virtual Vision Test's previous name surviving in legal copy
- Consent is Ketch-managed via URL parameters; the main site says
  `Do Not Sell or Share My Personal Information`, the blog says `Do Not Sell`. **Two CCPA
  control labels on one domain.**
- Footer carries `CA Transparency Act` and `CA AB 1305 Disclosure` (neither fetched)
- Mission claims are sourced: "*Source: VisionSpring" and a cited 2021 *JAMA Ophthalmology*
  study

## T11 Help-centre architecture

`[absent]` in substance, but several structural facts are recoverable.

- Canonical URL `https://www.warbyparker.com/help`. The `<title>` is `Help Center | Warby
  Parker`; the rendered `<h1>` is `Help Page`. **Two names for one page.**
- `meta-robots: noindex` — the Help Centre is deliberately excluded from search indexing, so
  article text is not discoverable externally either
- Body is a spinner plus the `Help Page` heading. Supplying a deep-link parameter does not
  trigger server rendering.
- The only server-side description of its scope is the meta description:
  "Find answers about orders, shipping, prescriptions, insurance, returns, and more in the
  Warby Parker Help Center."
- **Deep-link pattern**, recovered from an outbound link on the FSA page:
  `/help?a=<Question-Title-Hyphenated>---id--<opaque-id>`. Article slugs are derived from the
  question title, so the URL exposes the article's name even though the page does not.
  This yields one Help title verbatim:
  `What if I still have questions about my FSA or HSA?`
- **Named sections**, recovered from six cross-references in the Terms of Use:
  `the Lenses section of our Help page` · `the Prescriptions section of our Help page` ·
  `the Orders section of our Help page` (cited four times, covering shipping and delivery,
  changing or cancelling an order, returns and exchanges, and special orders)

So the taxonomy contains at minimum **Lenses**, **Prescriptions** and **Orders**, with the meta
description implying orders, shipping, prescriptions, insurance and returns as the user-facing
groupings.

**Structural finding.** A `noindex`, client-rendered Help Centre is the sole authoritative home
for the return window, the order-cancellation process and the lens-replacement policy — all of
which the Terms of Use explicitly defer to it. For a HIPAA-covered retailer, placing
policy-of-record behind a JS-only, unindexed surface is worth flagging as a content-strategy
risk, not merely a harvesting inconvenience.

A separate `/checkout/faq` page exists and is indexed, but returns an empty body.

## T12 FAQs

**Every FAQ answer on the site is client-rendered.** Questions are server-rendered as accordion
headings and are captured verbatim below; answers `[absent]`.

**Eyeglasses PLP — `Eyeglasses FAQs`** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Why is Warby Parker ending the Home Try-On program? |
| 2 | Does Warby Parker take insurance? |
| 3 | How long will it take to get your glasses? |
| 4 | What kinds of lenses does Warby Parker offer? |
| 5 | What will your glasses come with? |
| 6 | Can you return Warby Parker eyeglasses? |

Q1 is the notable one: **a product-withdrawal question published as the first FAQ on the main
category page.** The brand is fielding the objection at the top of the funnel rather than
hiding it on the deprecation page. Note the tense — "is ending", present progressive — which
contradicts the `/home-try-on` page's past tense ("has come to an end").

**Insurance — `Insurance FAQs`** `[observed]`, ten questions: How do I know what vision
insurance I have? · What's the difference between vision and medical insurance? · Is Warby
Parker in my insurance network? · Can I use my FSA or HSA funds? · How often can I use vision
insurance? · How do I file for out-of-network reimbursement? · What can I purchase with my
insurance? · Can I use my benefits to pay for an eye exam? · Can I use my benefits for
sunglasses? · Do I need an insurance card?

Ten questions on a payment method, versus six on the entire eyeglasses category. The FAQ
volume is a direct map of where the friction is.

**Buy a Pair, Give a Pair — `FAQ`** `[observed]`, eight questions, including two the brand did
not need to ask itself: `Can I, or my school, receive donated glasses?` and
`Can I donate used glasses to the Buy a Pair, Give a Pair program?` — **FAQ slots for the
recipient and the donor, not just the customer.** Also `How is the impact of a pair of glasses
measured?`, which invites scrutiny of the brand's own claim.

**Three different FAQ voices coexist** `[observed]`. The Eyeglasses set uses second person
about the reader's possessions ("How long will it take to get *your* glasses?"); the Insurance
set uses first person ("How do *I* know what vision insurance I have?"); Buy a Pair mixes both.
One site, three question grammars.

## T13 Terminology & glossary

| Term | Warby Parker's usage | The alternative it rejected |
|---|---|---|
| `Buy a Pair, Give a Pair` | The giving programme, always in full | "one-for-one", "donation programme" |
| `Vision for all` | Mission phrase | — |
| `Pupils Project` | School-based vision programme | "school screenings" |
| `Advisor` | In-app AI guided shopping | "assistant", "recommender" — **collides with human "advisor"** |
| `Virtual Try-On` | App-only AR try-on; "VTO" in URLs | "AR try-on" |
| `Home Try-On` | The discontinued mail-out programme; "HTO" in URLs | "try before you buy" |
| `Virtual Vision Test` | At-home prescription renewal | "online eye exam" — deliberately avoided, see the disclaimer |
| `Prescription Check` | **Legacy name for the above**, still live in the Terms of Use | |
| `Intelligent Eyewear` | Smart-glasses line | "smart glasses" |
| `Eyewear A to Z` | The education blog | "glossary", "resources" |
| `Signature progressives` / `Precision progressives` | Two progressive tiers | "standard/premium" |
| `Low-Bridge Fit` | Frame fit category | "Asian fit" |
| `Scout by Warby Parker` | Own-brand contact lens | |
| `Light-responsive` | Preferred term for photochromic lenses | "photochromic", "transitions" (generic) |
| `Classic` / `Thinner` / `Thinnest` | Lens materials | **polycarbonate / 1.67 high-index / 1.74 high-index** |

**`Classic` / `Thinner` / `Thinnest` is the best terminology decision on the site.** Three
refractive-index grades renamed as a comparative sequence, so that the ranking is legible
without any optical knowledge, and the attribute in the name is the one the user actually
cares about. Compare Patagonia's `Excellent` / `Great` / `Good condition` (068) — same device,
different domain: a comparative adjective ladder where the label ranks and a gloss explains.

Note `Virtual Vision Test` over "online eye exam". The product name **avoids the word the
disclaimer then has to deny** ("not a comprehensive eye health exam"). Naming and disclosure
were coordinated.

`Low-Bridge Fit` is a quietly good rename of an industry term that names an ethnicity; Warby
Parker names the anatomy instead.

**The lens guide is the clearest system** `[observed]`, organised into four named tiers:
*lens benefits* (`Impact-resistant lenses`, `Scratch-resistant coating`,
`Anti-reflective coating`, `Smudge-resistant coating`, `UV protection`), *prescription types*
(`Single-vision`, `Signature progressives`, `Precision progressives`, `Readers`,
`Non-prescription`), *lens types* (`Blue-light-filtering`, `Anti-fatigue`, `Light-responsive`)
and *lens materials* (`Classic`, `Thinner`, `Thinnest`). Four axes, each internally consistent,
each a different kind of choice.

**`Eyewear A to Z` is a blog, not a glossary** `[observed]` — 51 paginated pages across six
categories, one of which is `Uncategorized`. The article titles do the glossary work:
`Glasses Styles and Shapes: The Frame Names You Need To Know` ·
`Different Types of Lenses for Glasses: Which Is the Best Lens for You?` ·
`Is Anti-Reflective Coating Worth It? When It Really Matters` ·
`Do Your Glasses Feel Wrong With Your New Prescription?` ·
`What to Do When Glasses Don't Fully Clear Up Your Vision`

The last two are the interesting ones — **post-purchase-doubt articles**, written for a user
who has already spent the money and is unhappy. Compare Wise's "Why does it say my transfer's
complete when the money hasn't arrived yet?" (041): both brands write the article for the gap
between what the system delivered and what the user expected.

**The manufacturing page doubles as a process glossary** `[observed]`, with captions in the
passive voice, in sequence: "Acetate is cut into small chips" · "24 hours later, chips have
fused into one block" · "Face fronts are polished in tumbling barrels filled with wood chips" ·
"Logos are carefully applied by hand" · "Glasses are sent for a final review, where the
prescription is checked one last time" · and then, breaking the register entirely,
`Good to go!`

## T14 Voice, tone & accessibility

**Register.** Conversational-premium. First-person plural for the company, second person for
the reader, contractions throughout, and **the parenthetical aside as the primary humour
device**: "for, well, reading" · "(High-index? Blue-light-filtering? Light-responsive? You name
it.)" · "(even if you're currently reading it electronically!)" ·
"Catch you later, alligator (in your inbox)."

Other signatures: rhetorical-question openers that describe the reader's situation
("Seeing well out of an expired glasses or contacts prescription?"); affirmation-as-headline
(`Yes, you can pay with insurance!`); self-aware positioning ("Shopping for eyewear is not an
activity historically associated with goosebump-inducing delight…").

**The register does not modulate by stakes.** The jokes appear in the HIPAA notice and in the
medical scope disclaimer. This is the single most reviewable tone decision in this batch and is
recorded as a negative finding, not a style preference: a disclaimer whose function is to be
taken seriously should not close on "peepers".

**Accessibility statement** `[observed]` — https://www.warbyparker.com/accessibility

Four paragraphs. It commits to assessing and increasing accessibility, to complying with
"applicable state and federal accessibility requirements as well as best practices", and to
using the W3C Web Accessibility Initiative guidelines **"as a model"**, reviewing the site
against them with "recognized accessibility evaluation tools". Three report channels are given:
phone with hours, an obfuscated email, and a postal address.

**No conformance target is named.** No WCAG version, no Level A/AA claim, no VPAT, no audit
date. "As a model" is a deliberately soft formulation — weaker than Patagonia's "WCAG 2.1,
Level A and AA" with a named audit partner (068), stronger than Allbirds' statement, which
names no standard at all (067).

**The accessibility page's own meta description still advertises "our free Home Try-On
program."** An accessibility statement whose metadata sells a discontinued service.

**Accessibility observations from the markup** `[observed]`

Genuinely good:
- `Skip to main content` is the first element on every server-rendered page
- **Alt text on editorial and product imagery is unusually long and descriptive** — e.g. a
  light-responsive lens demo is described as "lenses fading from clear to solid grey in a loop
  showing a digital example for how light-responsive lenses transition…", which describes the
  *motion and its purpose*, not just the object. Well above average.

Genuinely bad:
- **Promotional copy, including legal qualifiers, exists only as alt text on images** (see T9)
- **Copy–alt mismatches**: the alt string "Girl Posing with Head Resting on Hand" is reused for
  an Rx symbol, a rebate icon, a no-fees icon, a lens photo, a job-tray photo and a contact-lens
  icon across three pages. A CMS default never overwritten — which means six images announce a
  photograph that is not there.
- Several hero images carry **empty alt and no source**
- The four utility-nav icon links have empty alt; their accessible name is the bare URL path
- Accessible names that read as internal spec: `Filters list close button`, `FAQ Icon FAQ`,
  `Chat Icon Chat`, `footer image`
- Heading-level anomalies from responsive dual-rendering: most pages emit each heading twice,
  and on the Buy a Pair page the `h1` is a statistic while the `h2` is a full sentence of body
  copy
- `Slide 0 of 5` — an off-by-one carousel announcement
- Email addresses are Cloudflare-obfuscated and render to screen readers as
  "[email protected]" — including on the accessibility page, where the email is offered as an
  accessibility-report channel. **The page that invites accessibility feedback hides one of its
  three feedback channels from assistive technology.**

---

## HOME TRY-ON — the named benchmark, and its afterlife

The brief named Home Try-On as this product's flagship. **The programme has ended.**

**What `/home-try-on` says now** `[observed]`:

> `Looking for Home Try-On?`
> "Our Home Try-On program has come to an end, but here's some good news: It's still easy and
> free to try on five frames (or as many as you like), at home and on the go."

CTAs: `Start with a quiz`, `Shop eyeglasses`. Section: `Three ways to shop and try on frames at
home` — `Virtual Try-On`, `Advisor`, `Style quiz`.

The deprecation copy is competently structured: question-as-headline (matching the search query
that brought the user there), the bad news in the first clause, `but here's some good news:` as
the pivot, then a replacement that **preserves the two specific promises of the original** —
five frames, and free — while quietly upgrading one ("or as many as you like"). The old
programme's constraint becomes the new one's benefit.

But the meta description on that same page still reads: "Pick five frames and we'll send them
your way to try on at home. It's all completely free—including your preprinted return shipping
label." **The deprecation page's own metadata still sells the programme.**

**What is still published, and should not be** `[observed]`:

1. **A complete, un-updated Home Try-On marketing page is live and indexable** at
   `/home-try-on-quiz-LTK` (`meta-robots: index,follow`). It still reads:
   `Take the Home Try-On quiz and build your box` · `Get a box of your 5 favorites (for free)` ·
   "With Home Try-On, you get to pick five frames to test out for five days. And it's all free!
   Even your preprinted return shipping label." It offers `Start the quiz`,
   `Shop Home Try-On frames`, `Browse Women`, `Browse Men`, and a testimonial. It also carries
   a badly stale mission figure ("15 million pairs and counting") against the current page's
   "Over 25 million pairs distributed to people in need".
2. **A second live page sells Home Try-On as a current reason to shop** —
   `/5-reasons-to-shop-at-warby-parker`, reason 2, headed `Try before you buy`:
   "Test out five pairs with a free Home Try-On—our style quiz can help you pick them out."
   This page is `noindex`, so it is unlinked-but-live.
3. **Three legal pages still advertise the programme in their meta descriptions** — the
   accessibility statement, the Terms of Use and the HIPAA Notice of Privacy Practices all
   carry "Find a new pair today with our free Home Try-On program." All three are indexable,
   so a discontinued free offer is still being served to search engines from the site's
   legal estate.
4. **The deprecation is acknowledged in exactly one FAQ** — `Why is Warby Parker ending the
   Home Try-On program?` on the eyeglasses PLP, in the **present progressive**, contradicting
   the deprecation page's past tense. The answer is client-rendered and unreachable.
5. HTO URL infrastructure persists (`/eyeglasses/hto`, `/eyeglasses/women/hto`,
   `/eyeglasses/men/hto`). Whether those still render was not determined.

**What is genuinely gone:** no Home Try-On entry point exists in the nav, the footer, the
sitemap, the homepage, the PLP, the PDP or the Terms of Use body. Every navigable surface now
routes to Virtual Try-On, Advisor or the Style quiz.

**The corpus lesson.** This is the same failure mode as Allbirds' retired carbon labels (067),
in a different shape. A flagship programme was withdrawn, the primary navigation was cleaned
up, and **the long tail was not**: campaign landing pages, `noindex` evergreens, and meta
descriptions on legal pages. Search engines and direct-URL visitors are still being told the
programme exists, in its original, specific, promissory language. A deprecation is a content
inventory problem, not a page-replacement problem.

---

## Transferable patterns

1. **The first-person situation matrix.** `Which service is right for me?` with rows written as
   the reader's own sentences (`I'm concerned about my eye health or get headaches`) rather than
   as feature comparisons. The user recognises themselves in a row instead of evaluating
   attributes. Condition: rows must be mutually exclusive enough that exactly one feels true.
   Directly applicable to product-tier selection, plan choice and routing between self-service
   and assisted channels.
2. **Price the non-outcome.** `$15 only if your prescription is renewed.` — condition before
   price, in eight words, above the fold; then the not-charged branch in a parenthetical inside
   the step that produces it. Transfers to any assessment, application or eligibility-gated
   service where the user fears paying for a "no".
3. **Put the eligibility check in step one, and name it as such.** `We'll see if you're
   eligible` is the Virtual Vision Test's first phase, with its own duration promise. A product
   whose first action is to disqualify some users, stated up front, converts a rejection from a
   failure into a completed step.
4. **Attach a duration to every step, including the waiting one.** 5 minutes, 5 minutes,
   48 hours. The asynchronous review — the step with no user activity — is the one that most
   needs the number.
5. **Privacy microcopy at the moment of the action.** `(Do not show the side of your card with
   numbers.)` sits in the hint for the step where the camera fires, not in a policy. Any flow
   that asks a user to photograph, upload or share something should say what *not* to include,
   in the instruction itself.
6. **Rename a technical ladder as a comparative one.** `Classic` / `Thinner` / `Thinnest` for
   refractive indices. The name carries the ranking and the attribute the user cares about.
   Same device as Patagonia's condition grades (068).
7. **Name the product so the disclaimer does not have to fight it.** `Virtual Vision Test`, not
   "online eye exam" — because the disclaimer must then say it is "not a comprehensive eye
   health exam". Naming and legal review coordinated.
8. **Negative pattern — do not let legal qualifiers live in alt text.** `Restrictions apply.`
   and `Coverage may vary by plan.` exist only inside JPEGs. Any qualifier that bounds an offer
   must be in the text layer.
9. **Negative pattern — one eligibility rule, one source of truth.** Two published state lists
   for one regulated service, 15 states apart, is a content-governance failure with a
   regulatory edge.

## Caveats & gaps

- **The named benchmark strength is discontinued.** Home Try-On no longer operates. This file
  documents the deprecation copy and the orphaned pages rather than the live programme. Its
  step language and prescription gating are `[absent]` as live product copy.
- **The Help Centre is entirely unharvested.** `/help` is `noindex` and renders a spinner. The
  category tree in T11 is reconstructed from Terms of Use cross-references and one deep-link
  URL. **No help-article body was read, and only one article title was recovered.**
- **Every FAQ answer on the site is client-rendered.** All 24 questions in T12 are verbatim;
  none of their answers were captured.
- **Style quiz steps 2–8 were not captured** — only step 1 is server-rendered. The quiz's
  question grammar, option wording and progress copy beyond `1 of 8` are unknown.
- **The eye-exam booking flow returned a completely empty body.** No booking step names, field
  labels or confirmation copy exist in this file.
- **The 404 page's copy could not be captured** — the 404 body is itself client-rendered.
- **Two contradictory eligibility lists are published**; both are recorded verbatim and neither
  is treated as canonical. Any state-eligibility claim from this file must be re-verified
  before use.
- **The authoritative return policy is not publicly reachable.** The 30-day window appears only
  in promotional copy; `/returns` 404s and the Terms defer to an unindexed Help Centre. The
  window is recorded as asserted, not as policy-of-record.
- `/process/ca-ab-1305-disclosure`, `/process/ca-transparency-act` and `/sunglasses/lenses`
  were not fetched (harvest budget). A transient HTTP 429 rate limit occurred once mid-run.
- Cart, favourites, search, account, `/pd/webcam` and the lens-configuration flow were not
  attempted — auth-gated, or would have required entering a purchase flow.
- **The iOS app is where Advisor and Virtual Try-On actually live**, and app copy is out of the
  public web surface. The two most prominent guided-shopping products in the IA are therefore
  documented only by their marketing descriptions.
- Canadian storefront and in-store copy unharvested.

## Sources

1. https://www.warbyparker.com/
2. https://www.warbyparker.com/home-try-on
3. https://www.warbyparker.com/home-try-on-quiz-LTK
4. https://www.warbyparker.com/5-reasons-to-shop-at-warby-parker
5. https://www.warbyparker.com/virtual-vision-test
6. https://www.warbyparker.com/get-a-prescription
7. https://www.warbyparker.com/pd/instructions
8. https://www.warbyparker.com/quiz/frames
9. https://www.warbyparker.com/vto-quiz
10. https://www.warbyparker.com/eyeglasses
11. https://www.warbyparker.com/eyeglasses/durand/rose-water
12. https://www.warbyparker.com/eyeglasses/lenses
13. https://www.warbyparker.com/insurance
14. https://www.warbyparker.com/flexible-spending-accounts
15. https://www.warbyparker.com/buy-a-pair-give-a-pair
16. https://www.warbyparker.com/how-our-glasses-are-made
17. https://www.warbyparker.com/intelligent-eyewear
18. https://www.warbyparker.com/learn
19. https://www.warbyparker.com/accessibility
20. https://www.warbyparker.com/notice-of-privacy-practices
21. https://www.warbyparker.com/washington-health-data-policy
22. https://www.warbyparker.com/terms-of-use
23. https://www.warbyparker.com/sitemap
24. https://www.warbyparker.com/help (spinner only)
25. https://www.warbyparker.com/help?a=What-if-I-still-have-questions-about-my-FSA-or-HSA---id--Q8fjBtnqThqBZls-ceqRnQ
26. https://www.warbyparker.com/appointments/eye-exams/booking (empty body)
27. https://www.warbyparker.com/checkout/faq (empty body)
28. https://www.warbyparker.com/returns (404)
