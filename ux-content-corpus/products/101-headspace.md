# 101. Headspace

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Meditation and mental wellness (subscription app + adjacent regulated care: therapy, coaching, EAP) |
| Primary URL | https://www.headspace.com/ |
| Corpus rank | 101 |
| Benchmark strength (source list) | Calm onboarding, tone, progress |
| Locale / market observed | en-US (site offers Deutsch / English / Español / Français / Português switchers) |
| Platform observed | Web (desktop), Zendesk help centre, legal/privacy pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Split-entity posture.** The consumer meditation app is positioned as a wellness product, not a medical device or treatment — stated explicitly in FAQ copy: Headspace is "not intended to diagnose, treat, or prevent any mental health condition". Separately, **Headspace Medical** delivers clinical care and its data is PHI under **HIPAA**, with its own `HIPAA Notice of Privacy Practices`. A standalone `Consumer Health Data Privacy Policy` addresses **Washington My Health My Data Act, Connecticut Data Privacy Act, Nevada SB 370**; `CA Privacy Notice` covers CCPA. No FDA/medical-device claim anywhere observed. GDPR not named on the en-US surfaces inspected. |
| Harvest date | 2026-09-21 |
| Pages inspected | 18 |
| Harvest completeness | Partial — marketing FAQ accordions were retrievable (unlike many peers), but the main Privacy Policy body exceeded the fetch size limit and was not read in full; onboarding question set, in-app empty/error states, and push copy sit behind auth |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.headspace.com/ | Hero, goal picker, library tabs, 8-item FAQ accordion, full footer |
| Our Plans / Subscriptions | https://www.headspace.com/subscriptions | Trial and auto-renew disclosure, cancellation link, two live rendering defects |
| Anxiety product page | https://www.headspace.com/mental-health/anxiety | Richest single source for health-claim boundary language |
| Ebb AI companion | https://www.headspace.com/ai-mental-health-companion | Safety/crisis disclaimer, AI-specific FAQ |
| Mental health resources (crisis) | https://www.headspace.com/mental-health-resources | ~190 country crisis directory, dated, with non-endorsement footnote |
| Consumer Health Data Privacy Policy | https://www.headspace.com/consumer-health-data | Categories of consumer health data, sharing list, state rights |
| Privacy Policy | https://www.headspace.com/privacy-policy | **Fetched but body exceeded size limit — not read in full** |
| Accessibility Statement | https://www.headspace.com/accessibility-statement | WCAG 2.2 AA, named third-party auditor, published VPATs |
| Help centre home | https://help.headspace.com/hc/en-us | 10 top-level categories, each with a scope sentence |
| Help: Top FAQ → Account & Subscription | https://help.headspace.com/hc/en-us/articles/115008364988-How-do-I-cancel-my-subscription- | Cancellation copy, also exposes sibling article list |
| Help: run streak | https://help.headspace.com/hc/en-us/articles/215730567-How-does-the-run-streak-feature-work | Progress mechanic documented in unusual detail |
| Help: Subscriptions & Billing | https://help.headspace.com/hc/en-us/categories/202463337-Subscriptions-Billing | Four-audience sub-tree |
| Help: Getting Started | https://help.headspace.com/hc/en-us/categories/19497864665243-Getting-Started | Five-product sub-tree |
| Help: New to Meditation | https://help.headspace.com/hc/en-us/sections/203589058-New-to-Meditation | 10 beginner-anxiety article titles |
| Help: Troubleshooting | https://help.headspace.com/hc/en-us/categories/200347477-Troubleshooting | |
| Help: Privacy | https://help.headspace.com/hc/en-us/categories/360000586073-Privacy | Employer-visibility and data-sharing-consent articles |
| Help: Crisis / Emergency Resources | https://help.headspace.com/hc/en-us/categories/19787419210651-Mental-Health-Resources-Crisis-Emergency-Resources | Top-level help category; contains exactly one article |
| Help: Mental Health Resources article | https://help.headspace.com/hc/en-us/articles/19825079194011-Mental-Health-Resources | Thin routing stub to the marketing-site directory |

---

## T1 Navigation & IA labels

**Global nav — six items, one of which is an audience switch** `[observed]`

`For You` · `For Business` · `For Providers` · `Our Plans` · `Resources` · `About`
· right-hand utilities `Log in` · `Help` · `Try for free`

The notable structural choice is inside `For You`, which splits into three
sub-groupings that answer three different user questions:

| Sub-group heading | What it lists |
|---|---|
| `What we offer` | `Meditation` · `Online therapy` · `Mindfulness` · `Sleep` · `Mental health coaching` · `Ebb AI companion` |
| `How we help` | `Anxiety` · `Stress` · `Sleep better` · `Mental health` · `Mindful families` |
| `Explore our library` | `New and popular` · `Guided courses` · `Beginning meditation` · `Calming everyday anxiety` · `Mindful parenting` · `Mindfulness at work` · `Sleep music` · `White noise` |

`What we offer` is **modality-named** (nouns: meditation, therapy, coaching).
`How we help` is **symptom-named** (anxiety, stress, sleep). The same underlying
content is reachable from both, and a user who does not know what "mindfulness"
is can still self-route on "Anxiety". This dual-axis nav is the single most
reusable IA decision on the site: it does not force the anxious user to learn
the product's vocabulary before finding help.

Note `Sleep better` in `How we help` and `Sleep` in `What we offer` point at the
**same URL** — the label is re-cast as a verb phrase for the symptom axis.

**Help centre top level — ten categories, each with a scope sentence** `[observed]`

| Category | Scope line (verbatim, first clause) |
|---|---|
| `Top FAQ` | "Get quick answers to the most frequently asked questions…" |
| `Getting Started` | "Whether you're a new member looking to explore, or you just need a refresher…" |
| `Subscriptions & Billing` | "You're in control of your subscription and billing details." |
| `Account Management` | "This is where you can manage your account and profile settings." |
| `Troubleshooting` | "Having issues with the app or website?" |
| `Scheduling Care` | "…step-by-step instructions, essential info, and troubleshooting tips…" |
| `Family Plan & Dependents` | "Whether you're setting up a new family plan or making updates…" |
| `Our Approach to Care/Meditation` | "Learn more about our approach and commitment to mental health…" |
| `Privacy` | "Your peace of mind is our priority." |
| `Mental Health Resources / Crisis / Emergency Resources` | "If you or someone you know is experiencing a crisis…" |

Two findings. First, `Privacy` opens with **"Your peace of mind is our
priority."** — the brand's own product noun ("peace of mind") recruited into a
data-governance category. That is on-voice and slightly slippery: peace of mind
is what the app sells, not what a privacy policy delivers.

Second, **crisis is a top-level help category, not a footer link.** It sits
tenth of ten, which is a defensible position (a user in crisis is unlikely to
be browsing a help index), but its presence in the category tree at all is
above market practice. Its slash-separated name
`Mental Health Resources / Crisis / Emergency Resources` reads as **three
synonym sets concatenated for findability** rather than as an edited label — a
deliberate keyword-stuffing of the category name so that a search for any of
"crisis", "emergency", or "resources" hits it.

**Footer groupings** `[observed]`: `Get some Headspace` · `Our content` ·
`About us` · `Support` · `My Headspace` · `Get the app`. `Mental health
resources` (the crisis directory) and `Accessibility Statement` both sit under
`Support` on every page.

**Persistent site-wide banner** `[observed]`, above the nav:
`Sword is acquiring Headspace to shape the future of mental healthcare. Learn more →`
— an M&A notice given the top strip of a consumer mental-health site.

## T2 Value proposition & headline patterns

**Hero — rotating, two-slide** `[observed]`

Slide 1 headline is a two-part construction: `Stress less` / `all with Headspace`,
subhead "Mental health app with expert-led meditations and tools", CTA
`Try for $0`, badge `HSA/FSA Eligible`.

Slide 2 headline: `Online therapy that accepts insurance`, CTA
`Check your coverage`, same `HSA/FSA Eligible` badge.

The hero pattern is **outcome verb first, product second**. `Stress less` is an
imperative in the user's voice. Compare the anxiety page hero, which is the
strongest line on the site:

> `Anxious days happen.` / `Headspace helps.`

Two three-word sentences. The first **normalises** ("happen" — not "your
anxiety", not "suffering"), the second is a modest claim verb ("helps", not
"fixes", "cures", "beats"). Subhead: "Whether you're worried about work,
relationships, or life, feel less anxious with just two weeks of Headspace."
Note the claim is time-bounded and cited later in the page.

**Section headers are the user's own question** `[observed]`

`What kind of headspace are you looking for?` — followed by six self-selection
chips that are all verb phrases: `Stress less` · `Sleep soundly` ·
`Manage anxiety` · `Process thoughts` · `Practice meditation` · `Start therapy`.

This is the public, pre-auth version of an onboarding goal-picker. Five of six
are things the user does; only `Start therapy` names a service. `Process
thoughts` is unusually abstract for a chip label but avoids pathologising.

**Subscriptions page** `[observed]`: eyebrow `Find some headspace today`,
headline `Be kind to your mind`, then "A healthier, happier you starts right
here." `Be kind to your mind` is the brand's recurring line and also appears
inside the Accessibility Statement's opening sentence.

**Benefit sections avoid superlatives and use possessive framing** `[observed]`:
`Unlock everything` · `Get a coach that gets it` · `The everyday app for feeling
better` · `Get your headspace` (final CTA) · `Feel-good library` ·
`Always-there support` · `Bedtime essentials` · `Talk it out with Ebb`.

`Get a coach that gets it` and `Talk it out with Ebb` are the two most colloquial
strings on the site; both attach to the *human-ish* services (coaching, AI
companion), not to the meditation library.

**Evidence framing** `[observed]` — outcome claims are stated as time-to-effect
and each carries an inline academic citation link:

- `Just 2 weeks of Headspace reduces anxiety.` → *Journal of Behavioral Addictions (Quinones 2019)*
- `Just 10 days of Headspace decreases stress and increases happiness.` → *PLoS One (2018)*, *Journal of Happiness Studies (2014)*
- `Headspace improves sleep efficiency after just 7 days.` → *Journal of Cognitive Enhancement (2021)*

The grammar is identical across all three: `Just <N> <units> of Headspace
<verb>s <outcome>.` The section is labelled `Outcomes`, not "Results" or
"Benefits" — a clinical register word used as a marketing header. Critically the
verbs are all **directional, not curative**: reduces, decreases, increases,
improves. None says "eliminates", "treats", or "cures".

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try for free` | Nav (sticky), hero variants, every tab panel | The default |
| `Try for $0` | Homepage hero slide 1 | Price-as-CTA variant |
| `Try 14 days for free` | Nav dropdown footers | |
| `Try 14-days free` | Site footer | **Hyphenation differs from the nav variant** |
| `Start your free trial` | Subscriptions page primary | |
| `Get your headspace` | Homepage final CTA | Brand-noun close |
| `Talk to Ebb` | Ebb page, repeated four times | Same label on all four panels |
| `Check your coverage` | Hero slide 2 (therapy) | Insurance-specific, not "Get started" |
| `Learn more` | Coaching card, business section | Bare `Learn more` does ship here |
| `Request a demo` | B2B sections | |
| `View Student Pricing` / `View Family Pricing` | Subscriptions | Paired, parallel |
| `Redeem a code` · `Send a gift` · `Share Headspace` | Footer | |
| `Cancel anytime` | Subscriptions page, **beside** `Terms & conditions` | Links directly to the cancellation help article |
| `Submit a request` | Help centre, top right and article foot | |
| `Was this article helpful?` → `Yes` / `No` | Every help article | With raw counts exposed |
| `See more` / `See all 9 articles` | Help lists | |
| `Check out all of our different subscription plans` | Homepage FAQ body | Inline |
| `Skip to main content` | Not observed on headspace.com | See T14 |

**Five distinct labels for one free trial** (`Try for free`, `Try for $0`,
`Try 14 days for free`, `Try 14-days free`, `Start your free trial`) all
resolving to the same checkout URL with the same voucher code
`B2C14DANNUAL2022`. This is a real consistency finding, not a variant test:
the hyphenation difference between `Try 14 days for free` and `Try 14-days free`
appears on the *same rendered page*, in nav and footer respectively.

**`Cancel anytime` as a CTA is the standout.** It is placed on the pricing page
directly adjacent to `Terms & conditions`, below the auto-renew sentence, and it
is a live link to the cancellation instructions — not a reassurance phrase in
body copy. Given the regulatory scrutiny of subscription-cancellation friction,
putting the cancellation *route* (not just the promise) on the purchase page is
the defensible pattern to copy.

## T4 Onboarding & getting-started

The in-app onboarding question set is behind auth. `[absent]` What is publicly
observable:

**Pre-auth goal picker** `[observed]` — `What kind of headspace are you looking
for?` with six chips (listed in T2). This is the public analogue of the
onboarding intake and uses the same six-way taxonomy that `How we help` uses in
the nav.

**Documented first-run path** `[documented]`, from the help IA. The beginner
journey is named `The Basics`, a course, and the help centre carries a dedicated
`New to Meditation` section whose ten article titles are almost entirely
**pre-emptions of beginner anxiety**:

- `Do I need a Teacher?`
- `What kind of meditation is Headspace?`
- `When Should I Meditate?`
- `How do I sit during meditation?`
- `Can I Meditate Lying Down?`
- `Is There a Particular Way I Should Breathe?`
- `How do I Find Time to Meditate?`
- `How do The Basics work and why are they there?`
- `How Long Does Meditation Take to learn?`
- `I've completed Basics. Now what?`

Read as a set, eight of ten are "am I doing this wrong?" questions. The content
strategy is to answer *permission* questions (`Can I Meditate Lying Down?`)
before capability questions. `I've completed Basics. Now what?` is the only
forward-looking one and closes the loop.

`How do The Basics work and why are they there?` is a compound question that
explains a product decision to the user — the "why are they there" half is a
rationale article, not a how-to.

**Title-case is inconsistent within this section** (`Do I need a Teacher?` vs
`When Should I Meditate?` vs `How do I sit during meditation?`) — three
different capitalisation conventions in ten adjacent titles.

## T5 Form & field labels

Pre-auth form surface is minimal. `[observed]`

- Newsletter: label `Email address`, button `Subscribe`, with consent copy below
  the field: "By signing up, you're agreeing to receive marketing emails from
  Headspace. You can unsubscribe at any time." followed by a `Privacy Policy` link.
  Consent statement precedes the action's consequence and states the exit before
  the user commits.
- Help centre search: heading `How can we help?` pattern not used; Headspace's
  help centre exposes only `Submit a request`.
- Checkout fields are on `checkout.headspace.com` and were not entered. `[absent]`

## T6 Status & state language

The product's principal "state" is **progress**, and it is documented in unusual
detail. `[documented]`

**`run streak`** — the coined term. Definition given to the user: "Your run
streak records the number of sessions you have completed in a row/consecutively."
Adjacent metric: **`minutes meditated`**.

Counting rules, as published:

- increments by 1 per meditation completed within 24 hours of the previous one
- multiple sessions inside an 8-hour window count as **one** day
- sessions more than 8 hours apart in one day count as **two**
- only three content types count: `Today's Meditation` (under `Daily Essentials`
  on the `Today` tab), content from a **meditation course**, and a
  **single meditation**

Reset causes are published as a list, and this is the interesting part — three of
five reset causes are **not the user's fault**:

1. 24+ hours since the last completed session
2. device in "Airplane Mode" for an extended period, or flying between time zones
3. "You experienced a technical hiccup and couldn't complete a meditation."
4. played a Sleepcast, Sleep Music, Focus Music, The Wake Up, Mindful Activity or
   Movement session instead of a meditation
5. completed only non-qualifying content (Sleepcasts, Sleep Music, Focus Music,
   Expert Guidance, Movement Workouts, Videos, Mindful Activity, The Wake Up)

The register is notably flat and mechanical for a motivational feature — "runs
the risk of being reset to 0" rather than "you'll lose your streak". No loss
language, no emotive framing. And the article ends with two escape hatches:

> "We offer the capability to disable your run streak from your Profile."

> "If you think your run streak might have been reset to 0 in error, send us a
> note to help@headspace.com and let us know where it should be. We can update it for you."

See T14 — this pair is the most transferable finding in the file.

**Other named states** `[documented]` from help titles: account `locked`
(`Why is my account still locked?`), subscription `auto-renew` as a toggleable
state, org-provided subscriptions which "will automatically expire based on the
date of the agreement" (expiry as a state requiring no user action).

## T7 Error, failure & recovery

`[documented]` — help IA only; no live error strings observed pre-auth.

**Troubleshooting** is a top-level category with a three-way split
(`App Support`, `Desktop Support`, `Troubleshooting Tips`) replicated per product
line (Headspace, Headspace Care, Headspace for Employers), plus
`Enrollment Troubleshooting`, `Single Sign On (SSO)`, `Multi-Factor Authentication`.

**Recovery-article grammar is question-shaped, not confession-shaped** (contrast
Wise): `What happens if I am not receiving a code, lost my recovery code, or
cannot access my email?` · `How can I reset the password on my account?` ·
`Why is my account still locked?` · `I am a teacher/educator in the US but my
email address isn't being accepted`.

The educator one is the only first-person confession title observed, and it names
a specific failing input (email not accepted). Note it is long and fully
specific — the site prefers a 14-word findable title over a short elegant one.

**Named failure content outside troubleshooting** `[observed]`:
`A Warning About Phishing Scams` appears in the Calm help centre; Headspace's
equivalent is the `Trust Center` and `Security` footer links. Headspace also
publishes `Why is my account still locked?` — documenting a punitive state
rather than hiding it.

**Escalation string** `[observed]`, repeated at the foot of every help article:
`Need more help? Email us at help@headspace.com.` then
`Have more questions? Submit a request`. Two contact routes offered in sequence,
email first.

## T8 Empty states

`[absent]` for in-app empty states — all behind auth.

Two **live rendering defects** on public pages function as accidental empty
states and are worth recording as negative examples `[observed]`:

1. Subscriptions page, under the plan selector:
   > "After your free trial, the annual subscription is **null** USD and automatically renews each year."

   The price token failed to interpolate and rendered the literal string `null`
   inside a **disclosure sentence about what the user will be charged**. This is
   the highest-stakes possible location for an interpolation failure: the
   auto-renew price disclosure. A content designer's takeaway is that
   price-disclosure strings need a non-rendering fallback, not a default value.

2. Same page, social-proof block: `0.0 Stars` / `Average rating`,
   `0.0K Ratings` / `On iOS and Google Play`, `0M+ Downloads` / `Across all platforms`.
   Three statistics rendering as zero. Note the unit suffixes (`K`, `M+`) still
   render, so the shape of the claim survives while the claim itself is void.

Both were present on the same fetch of the same page and are almost certainly the
same client-side data-fetch failure.

## T9 Notifications & system messages

`[observed]` — limited pre-auth.

- Site-wide acquisition banner (T1), styled as a dismissible-looking strip.
- Marketing-email consent block, `Stay in the loop` / "Be the first to get updates
  on our latest content, special offers, and new features."
- `[documented]`: `Is the Headspace app tracking my location?` implies a
  permissions prompt exists; wording not observable.
- `[documented]`: push/reminder copy is not documented publicly. `[absent]`

## T10 Disclosures, legal & compliance

**This is the priority section and Headspace's strongest.** Three distinct
disclaimer registers, deployed at different stakes.

### (a) The wellness-not-treatment boundary `[observed]`

The clearest statement sits **inside a marketing FAQ answer** on the anxiety page,
not in a footer:

> "Headspace is **not intended to diagnose, treat, or prevent any mental health
> condition**, including anxiety."

Immediately followed by a referral: speak with a licensed mental health
professional who can offer a diagnosis and guide treatment. The same page's
final FAQ repeats the boundary in a different register — "our app is not a
substitute for medical care" — and routes severe or persistent anxiety to a
licensed professional.

**The placement is the finding.** The disclaimer is not a footnote under the page
and not a separate legal page; it is the *last paragraph of the answer to the
question a worried user would actually click* (`How do I calm my anxiety and
stress?`). It is reached by the people who need it, in the flow of reading, at
the moment the product has just been recommended.

Note also the third FAQ, `How do I know if I have anxiety?`: the answer describes
symptoms in lay terms, then normalises ("everyone experiences some anxiety"),
then sets a threshold ("when symptoms become overwhelming"), then refers out.
The sequence is **describe → normalise → threshold → refer** and it never uses
the word "you have". That four-beat structure is directly transferable to any
product that must describe a condition without diagnosing it.

### (b) The AI safety disclaimer `[observed]`

Ebb carries a dedicated, repeated block. It appears **twice** on the page — once
under the `Safety` pillar and again inside the FAQ answer to `Can Ebb replace my
therapist or mental health coach?`. Its structure, in order:

1. what it is not — not a substitute for human care, no clinical services
2. **not monitored in real time by a human** (an operational fact most AI
   products omit)
3. data boundary — not shared with your care team unless you elect to
4. referral — talk with a licensed provider
5. emergency escalation — local emergency services or nearest emergency room
6. named crisis line — call or text **988**, the Suicide and Crisis Lifeline
   (scoped to US and Canada)
7. link out for international resources

The escalation ladder goes **general referral → immediate danger → specific
number → international fallback**. Each rung is more urgent and more specific
than the last. The geographic scoping ("If you are located in the United States
or Canada") before naming 988 is correct practice and frequently botched
elsewhere.

The product-page pillar that introduces this is labelled `Safe by design`, with:
"Ebb has built-in safeguards and can connect you to crisis support if you ever
need extra help." Note `if you ever need extra help` — the euphemism softens
"crisis" for a browsing user while the hard disclaimer sits directly below.

### (c) Crisis signposting `[observed]`

The directory at `/mental-health-resources` is the most substantial
crisis-signposting artefact in this batch of five products.

- Title: `Mental health resources`. Dated: *Last updated: October 8, 2025*.
- Opening line: **`Need help right now? You're not alone.`** Question, then
  reassurance. Four words then four words.
- Then the scope sentence, then the critical operational instruction:
  > "Please do not attempt to access emergency care through Headspace Products and Services."

  This is a **negative instruction about the product's own capability**, placed
  above the resource list. It tells a person in crisis not to waste time inside
  the app. Unhedged, imperative, and leading with "Please".
- ~190 jurisdictions, alphabetical, each with `Emergencies: <number>` first, then
  named services with hours where they vary.
- Footnote: Headspace "assumes no responsibility or liability for the professional
  ability, reputation, or quality of services provided" by the listed entities,
  and "Inclusion on this list does not constitute an endorsement". The liability
  disclaimer is at the **bottom**, in italics, after the help — not gating it.

**Placement audit.** The directory is reachable from: the footer `Support` column
on every marketing page (`Mental health resources`); a top-level help category;
and inline from the Ebb disclaimer. It is *not* in the primary nav and not on the
homepage above the fold. So: persistently available, never interruptive.

### (d) Data and privacy disclosure `[observed]`

Four-document structure, cross-linked from a `PRIVACY LINKS` block at the top of
each: `Privacy Policy` · `Consumer Health Data Privacy Policy` ·
`HIPAA Notice of Privacy Practices` · `Cookie Policy`.

The Consumer Health Data policy opens with an **accessibility and language
accommodation** offer before any substance:

> "If you are visually impaired, have another disability, or seek support in
> other languages, you may access this privacy policy by emailing us…"

It then enumerates eleven categories of consumer health data it may hold —
including biometric data, reproductive or sexual health information,
gender-affirming care information, and "any inferences of the above categories…
derived or extrapolated from non-health information". Naming *inference* as a
collected category is unusually candid.

Sharing is disclosed as **nine named categories of recipient** (service providers,
your integrations, other users, business partners, payment processors, affiliates,
government agencies, business transfer, other third parties), each with a
one-sentence plain example. "Business transfer" is disclosed as its own bullet —
materially relevant given the acquisition banner at the top of every page.

Rights are split by state (Nevada/Washington vs Connecticut) with different
response windows (45 days + 45-day extension; Connecticut appeals within 60 days)
and a named Attorney General complaint URL per state. Giving the regulator's
complaint link inside your own policy is the same "route to the escalation you'd
rather users didn't need" pattern seen in the crisis directory.

**Employer-visibility disclosure** `[documented]`, as a help-article title —
this is the anxiety a benefits-enrolled user actually has:

- `Will my Benefit Sponsor or people I work with know that I'm using Headspace?`
- `Will my dependents or family members know when I'm using Headspace, or will I be notified of my dependent's usage?`
- `I don't want to share my data to my sponsoring partner anymore. What can I do?`
- `Is the Headspace app tracking my location?`
- `Where is my personal information stored?`

Note the third is phrased as **withdrawal of consent in the user's own voice**,
and the section it sits in is named `Member Consent for Data Sharing` — consent
framed as a revocable member decision, with its own help section.

### (e) Subscription and billing disclosure `[observed]`

On the pricing page, the auto-renew sentence, `Terms & conditions`, and
`Cancel anytime` sit as a single cluster directly under the plan selector and
above the CTA. Homepage FAQ `Does my Headspace subscription automatically renew?`
answers **"Yes"** as its first word, then states the renewal cadence for both
plans, then "Your subscription can be canceled at any time."

The cancellation article's substance: cancellation route differs by purchase
channel (Headspace web / Apple / Google Play); the web route is
`https://www.headspace.com/subscription/manage` → the `CANCEL MEMBERSHIP` link;
and a fallback if the control is missing — email help@headspace.com, "We can
help." Refunds are stated as non-refundable for all three channels, with a
**discretionary carve-out** for direct purchases: special circumstances can be
reviewed individually. Apple and Google purchases are explicitly handed off to
those platforms' policies with links.

Helpfulness counter on that article: **7,292 of 16,376 found this helpful** — a
44% helpfulness rate on the cancellation article, publicly displayed. Worth
recording as evidence that the article is both heavily trafficked and widely
found insufficient.

## T11 Help-centre architecture

Zendesk, **three levels**: Category → Section → Article. Ten categories (T1).

The distinguishing structural choice: most categories fan out **by product line
first, then by task**. `Subscriptions & Billing` contains `Headspace Mental
Health Coaching`, `Headspace`, `Care at Headspace`, `Headspace for Employers`,
`Headspace for Educators` — five audiences, each with its own billing sub-tree,
and *three* of them contain a section literally named `Billing Questions`.

The same shape repeats in `Getting Started` (Coaching / EAP / Headspace / Care /
Employers) and `Troubleshooting` (Headspace / Care / Employers).

**Consequence:** the user must know which Headspace product they have before they
can find their billing answer. For a company selling through employers, health
plans, and direct consumer channels simultaneously, this is a real IA cost. It is
the inverse of the dual-axis marketing nav (T1), which lets users route by symptom
*or* by modality. The help centre only offers the product axis.

**Article-title grammar — five shapes:**

| Shape | Example |
|---|---|
| `How do I …?` | `How do I cancel my subscription?` |
| `How can I …?` | `How can I turn off the auto-renew feature for my subscription?` |
| `What/Why …?` | `Why is my account still locked?` · `What price will I be charged for my subscription renewal?` |
| `Will <third party> know …?` | `Will my Benefit Sponsor or people I work with know that I'm using Headspace?` |
| Long compound sentence | `What happens if I am not receiving a code, lost my recovery code, or cannot access my email?` |

`How do I` and `How can I` are used interchangeably for the same act — cancelling
uses `How do I`, turning off auto-renew uses `How can I`, and the two are the
same operation for most users. Recorded as a consistency gap.

**Routing furniture** `[observed]`: `Submit a request` appears top-right on every
help page — human contact is offered *first*, not last. This inverts the Wise
pattern (contact last and smallest). `Was this article helpful? Yes / No` with a
visible raw count appears on every article.

## T12 FAQs

**Placement 1 — homepage accordion**, heading `Frequently asked questions`,
eight questions. Answers retrievable in server HTML (unlike many peers).
Questions verbatim:

| # | Question |
|---|---|
| 1 | What is Headspace? |
| 2 | What is Headspace's mission? |
| 3 | How do I download the Headspace app? |
| 4 | What is included in a Headspace app subscription? |
| 5 | How much does Headspace cost? |
| 6 | Does my Headspace subscription automatically renew? |
| 7 | How do I cancel my Headspace subscription? |
| 8 | How can I support my team's mental health at work? |

Ordering: identity → mission → access → contents → price → **renewal → cancellation**
→ B2B upsell. Questions 6 and 7 are adjacent and sit *before* the commercial
upsell. Putting auto-renew and cancellation consecutively on the homepage, rather
than burying them in help, is the defensible pattern given regulatory attention on
this exact sequence. Answer 7 is a one-line routing stub to the help article — it
does not attempt the instructions inline, which keeps a single source of truth.

**Placement 2 — anxiety page accordion**, five questions, answered at length:

| # | Question |
|---|---|
| 1 | Does the Headspace app help with anxiety? |
| 2 | What are the benefits of Headspace for anxiety? |
| 3 | How do I know if I have anxiety? |
| 4 | How do I calm my anxiety and stress? |
| 5 | What makes Headspace different from other meditation apps for anxiety? |

Q3 and Q4 are **not about the product** — they are health-information questions,
answered in a clinical-lay register, with the product mentioned only after the
general answer. Both close on a referral. Q1 answers "Yes" then immediately
qualifies with "can be a useful tool" — the hedge is in the same sentence as the
affirmation.

**Placement 3 — Ebb page accordion**, eight AI-specific questions:
`What is Ebb?` · `How do I use Ebb?` · `Who can use Ebb?` ·
`Who can see information entered into Ebb?` · `I don't see Ebb in my Headspace app, why is that?` ·
`Can Ebb replace my therapist or mental health coach?` ·
`Who can see the conversations I have with Ebb?` ·
`Is your new AI feature Ebb able to mitigate bias?`

Two of eight are privacy questions asked twice in different words (`Who can see
information entered into Ebb?` and `Who can see the conversations I have with
Ebb?`) — redundant as an index, but it means a user scanning for "conversations"
and a user scanning for "information" both land. `Is your new AI feature Ebb able
to mitigate bias?` is an awkward, unnatural question that reads as written by the
answerer rather than asked by a user; the answer is a process description (routine
testing, monitoring, expert collaboration) with no claim of success.

## T13 Terminology & glossary

| Term | Headspace's usage | The alternative it rejected |
|---|---|---|
| `headspace` (lowercase, common noun) | "Get your headspace", "What kind of headspace are you looking for?", "Find some headspace today" | The brand name is used as a mass noun for a mental state — the product *is* the outcome |
| `run streak` | The consecutive-day counter | "streak", "chain", "consistency score" |
| `minutes meditated` | Cumulative practice metric | "total practice time", "session count" |
| `Today's Meditation` / `Daily Essentials` / `Today` tab | Named daily surface | "Recommended", "For you" |
| `The Basics` | The beginner course, capitalised as a proper noun | "Intro", "Onboarding", "Level 1" |
| `Sleepcast` | Coined portmanteau for narrated sleep audio | "sleep story", "bedtime audio" |
| `Wind downs` | Pre-sleep sequence | "evening routine" |
| `The Wake Up` | Named daily morning programme | "Morning briefing" |
| `Move Mode` | In-product movement surface — "Meet Move Mode, work out anywhere" | "Workouts", "Fitness" |
| `Instant Breathers` | Short breathing exercises (anxiety library tile) | "quick breaths", "SOS" |
| `Mindful Activity` | A counted content type | |
| `Expert Guidance` | Content type (video/advice), explicitly *excluded* from streak | |
| `Ebb` | The AI companion's given name — "empathetic AI companion", "AI mental health companion" | "assistant", "bot", "coach" |
| `member` | The person, throughout help and legal | "user", "customer", "patient" |
| `Benefit Sponsor` / `sponsoring partner` | The employer or health plan paying | "employer" alone |
| `consumer health data` | Retained as the statutory term, then enumerated | paraphrasing it away |
| `Care` (as in `Headspace Care`, `Scheduling Care`, `Starting Clinical Care`) | Umbrella for the clinical side | "treatment", "services" |
| `Be kind to your mind` | Standing brand line, reused verbatim in the Accessibility Statement | |

**Register split.** Marketing says `mental health app`; the clinical side says
`clinical care`, `licensed provider`, `diagnosis`, `treatment plan`. The words
`patient`, `therapy session`, `symptom`, and `disorder` appear only where a real
clinician is involved or where the copy is referring the user *out*. The boundary
between the two vocabularies is the same boundary as the wellness/medical
boundary in T10 — the terminology enforces the regulatory posture.

**Notable avoidance:** the word `anxiety` is used freely as a *feeling*
("feel less anxious", "anxious thinking", "Anxious days happen") and only becomes
`an anxiety disorder` in the one sentence that discusses diagnosis. The adjective
is for the user; the noun phrase is for the clinician.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout. First-person plural
for the company, and the company is a visible actor in adverse copy too:
"We can help.", "We can update it for you.", "We encourage you to connect with a
licensed mental health professional." Imperatives are used for outcomes the user
wants (`Stress less`, `Sleep soundly`) and never for compliance instructions.

**Register.** Short declaratives, contractions throughout, minimal exclamation.
The one exclamation-adjacent construction observed is `Absolutely!` in a Calm
answer, not here. Headspace's homepage and anxiety page carry **no exclamation
marks at all**.

**Sentence-length gradient by stakes** — the same gradient Wise shows, running
the other way round:

| Surface | Typical sentence |
|---|---|
| Hero | 3 words (`Anxious days happen.`) |
| Benefit copy | 10–18 words |
| Help articles | 15–25 words, numbered steps |
| Crisis page | 6–20 words, imperative |
| Consumer health data policy | 25–50 words, statutory register |

**Copy that risks encouraging unhealthy behaviour — findings in both directions.**
This is the section the brief asks for, and Headspace lands mostly on the good side.

*Mitigations observed:*

1. **The streak can be switched off.** "We offer the capability to disable your
   run streak from your Profile." A toggle (`the eye toggle`, under a `Run Streak`
   section) that hides the metric entirely. Shipping an off-switch for your own
   engagement mechanic is the single most transferable anti-pattern-avoidance
   move in this batch.
2. **Streak resets can be reversed by a human.** Users are invited to email and
   have the number restored. The streak is explicitly *not* treated as sacred data.
3. **Reset causes are attributed to the system, not the user.** "You experienced
   a technical hiccup", time-zone travel, airplane mode. Three of five documented
   causes exonerate the user.
4. **No loss-aversion verbs.** "runs the risk of being reset to 0" rather than
   "you'll lose your streak" or "don't break your chain". No fire emoji, no
   "protect your streak", no freeze/repair currency.
5. **Outcome claims are time-bounded and cited** rather than open-ended
   (`Just 2 weeks…`, with a journal link), which caps the implied promise.
6. **Normalising framing before any symptom talk** — `Anxious days happen.` and
   "everyone experiences some anxiety". The copy declines to pathologise the
   browsing reader.
7. **The crisis page tells you not to use the product.** "Please do not attempt to
   access emergency care through Headspace Products and Services."

*Risks observed:*

1. **The streak is counted in a way most users will not predict.** The 8-hour rule
   means two sessions in one day can count as two streak days — a mechanic that
   rewards frequency, not just consistency, and that a user optimising the number
   could exploit into over-practice. The rule is documented but not, as far as is
   publicly visible, surfaced in-product.
2. **Streak exclusions push toward one content type.** Sleepcasts, sleep music,
   focus music, movement, videos and `The Wake Up` do not count. A user maintaining
   a streak is steered away from the sleep and movement content they may actually
   need that night, toward a qualifying meditation. The incentive and the wellbeing
   goal diverge, and the help article states this plainly without addressing it.
3. **`minutes meditated` is a cumulative-quantity metric** presented alongside the
   streak, which is a quantity framing rather than a quality or wellbeing framing.
4. **Five labels for one free trial** (T3) is a low-grade trust cost on a
   subscription product under regulatory scrutiny for exactly this kind of
   commercial copy.
5. **`null USD` in the auto-renew price disclosure** (T8). Not tone, but the most
   serious observed content failure on the site.

**Accessibility content** `[observed]`

- Public `Headspace Accessibility Statement`, linked from the `Support` footer
  column on every marketing page.
- Conformance target stated as **W3C WCAG 2.2 Level AA**, "to the maximum extent
  possible" — a hedge, but the version and level are both named.
- **Named third-party auditor** (Accessible by Design LLC) and the scope of what
  they provide: user and expert reviews, ongoing support, ACRs/VPATs, standards
  guidance.
- **Two dated VPATs published as PDFs** — one for Mobile App, one for Web App,
  February 2026. Publishing the conformance report rather than only asserting
  conformance is the strong move here, and it mirrors Wise's "dual-format
  disclosure" pattern: the compliant artefact offered alongside the readable one.
- Dedicated feedback channel: `accessibility@headspace.com`, with an explicit
  invitation — "We want to hear from you if you encounter accessibility barriers".
- The Consumer Health Data policy opens with a disability and language
  accommodation offer before its first substantive clause.
- **Gaps:** no `Skip to content` link was observed in the fetched markup of
  headspace.com (the Calm site does carry `Skip to main content`); several
  decorative images carry alt text that is the raw Contentful asset filename
  (`Frame 370079`, `Group 229`, `maxresdefault (1)`, `2@2x`, `fa-solid_users`,
  `Anxiety-Basics-Icons 2x`) rather than being empty or descriptive. This is a
  real and common CMS failure — decorative assets inheriting filenames into the
  alt attribute — and it sits on a site whose accessibility statement is
  otherwise best-in-batch. Several images also render twice in the DOM with and
  without alt, suggesting responsive duplication.
- The Accessibility Statement's own scope sentence says "our **mobile** products",
  while the VPAT set covers both mobile and web — a scope mismatch between the
  prose and the artefacts.

---

## Transferable patterns

1. **Dual-axis navigation: modality and symptom.** Ship `What we offer`
   (what the thing is) beside `How we help` (what's wrong with me), pointing at
   overlapping content. A distressed or novice user should never have to learn
   your product vocabulary before finding the right door. Transfers to any
   product where the user's problem and the product's feature set use different
   words — disputes, fraud, hardship, and accessibility routing all qualify.

2. **Put the disclaimer in the answer, not the footer.** Headspace's
   wellness-not-treatment boundary sits in the last paragraph of the FAQ a worried
   user actually clicks. The people who need the boundary are the people reading
   that answer. Condition: only works if the FAQ is genuinely the high-traffic
   surface — audit before relying on it, and keep the footer version too.

3. **The four-beat structure for describing a condition without diagnosing it:**
   describe in lay terms → normalise ("everyone experiences some…") → set a
   threshold ("when it interferes with daily life") → refer to a professional.
   Never "you have". Directly transferable to financial-distress, hardship, and
   fraud-victim copy, where the same describe/normalise/threshold/refer shape
   avoids both alarm and negligence.

4. **Ship an off-switch for your own engagement mechanic.** The run streak can be
   hidden from the Profile, and a reset can be reversed by emailing support. If a
   progress metric can create pressure, give the user a way to stop seeing it and
   a way to appeal it. Condition: the off-switch must be findable in settings, not
   buried — Headspace's is, per its own documentation, one tap from the Profile tab.

5. **Attribute failure to the system in progress copy.** Three of the five
   documented streak-reset causes are technical or travel-related, not
   user-behavioural. Writing the exoneration into the mechanic's documentation
   pre-empts the "I failed" reading of a reset.

6. **Escalate in rungs, and scope the number geographically.** referral →
   "if you are in immediate danger" → named line (988) → international fallback
   link. Each rung more urgent and more specific. Never name a national crisis
   number without stating the country it serves.

7. **Tell the user what your product cannot do, above the help you can give.**
   "Please do not attempt to access emergency care through Headspace Products and
   Services." placed above the resource directory. The negative capability
   statement comes first; the liability disclaimer comes last, after the help.

8. **Put the cancellation route, not just the promise, on the pricing page.**
   `Cancel anytime` as a live link to instructions, sitting beside
   `Terms & conditions` under the auto-renew sentence. And put the renewal and
   cancellation questions adjacent on the homepage FAQ, before any upsell.

9. **Publish the conformance report, not just the conformance claim.** Dated
   VPATs as PDFs, plus the auditor's name and the scope of their engagement. Same
   logic as Wise's regulator-format fee table: offer the compliance artefact as a
   deeper view rather than asserting compliance in prose.

## Caveats & gaps

- **Privacy Policy body not read.** The page was fetched but exceeded the size
  limit and only its head/metadata was returned. All privacy findings here derive
  from the Consumer Health Data Privacy Policy, the Privacy help category, and
  footer links. GDPR posture in particular is **unverified** — it is not named on
  any page read in full, but is likely addressed in the unread main policy
  (Headspace Meditation Limited is a UK entity). Re-fetch before treating "GDPR
  not addressed" as a finding.
- **Onboarding question set is behind auth.** The public goal picker
  (`What kind of headspace are you looking for?`) is treated here as its analogue,
  not as the real intake. The real onboarding sequence, its question wording, and
  its progress language are unobserved.
- **All in-product states are `[documented]`, not observed** — streak UI, the
  `Run Streak` eye toggle, `Today` tab, `Daily Essentials`, empty states,
  validation, toasts, push and reminder copy. The streak mechanics are known only
  from one help article.
- **The two rendering defects** (`null USD`, `0.0 Stars`) were observed on a
  single fetch and may be transient or fetch-artefact rather than a live user-facing
  bug. Flagged as suspected-live; re-verify in a browser before citing as a defect.
- **Crisis-page placement was audited by link inventory, not by user journey.**
  Whether a distressed in-app user is routed to it, and how fast, is unobservable
  pre-auth. Ebb's real crisis-detection behaviour and the strings it produces are
  unobserved — only the marketing description of them.
- **Alt-text findings are from fetched markup**, which may not reflect what an
  assistive technology receives after client-side rendering. The filename-as-alt
  pattern is clear enough to record; the duplicate-DOM issue is suspected only.
- **Headspace Medical / HIPAA Notice of Privacy Practices not fetched.** The
  clinical-side disclosure regime is described here from cross-references only.
- **B2B surfaces (organizations.headspace.com) unharvested**, as are the therapy,
  coaching, meditation, sleep, mindfulness, science, and Trust Center pages.
- **Non-English locales unharvested** — the register of the crisis and disclaimer
  copy in Deutsch/Español/Français/Português is unknown and is exactly where this
  kind of copy most often degrades.

## Sources

1. https://www.headspace.com/
2. https://www.headspace.com/subscriptions
3. https://www.headspace.com/mental-health/anxiety
4. https://www.headspace.com/ai-mental-health-companion
5. https://www.headspace.com/mental-health-resources
6. https://www.headspace.com/consumer-health-data
7. https://www.headspace.com/privacy-policy (head only — body exceeded fetch limit)
8. https://www.headspace.com/accessibility-statement
9. https://help.headspace.com/hc/en-us
10. https://help.headspace.com/hc/en-us/articles/115008364988-How-do-I-cancel-my-subscription-
11. https://help.headspace.com/hc/en-us/articles/215730567-How-does-the-run-streak-feature-work
12. https://help.headspace.com/hc/en-us/categories/202463337-Subscriptions-Billing
13. https://help.headspace.com/hc/en-us/categories/19497864665243-Getting-Started
14. https://help.headspace.com/hc/en-us/sections/203589058-New-to-Meditation
15. https://help.headspace.com/hc/en-us/categories/200347477-Troubleshooting
16. https://help.headspace.com/hc/en-us/categories/360000586073-Privacy
17. https://help.headspace.com/hc/en-us/categories/19787419210651-Mental-Health-Resources-Crisis-Emergency-Resources
18. https://help.headspace.com/hc/en-us/articles/19825079194011-Mental-Health-Resources
