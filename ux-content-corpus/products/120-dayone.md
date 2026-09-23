# 120. Day One

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Private journaling app (reflective writing, memory-keeping; adjacent to mental wellbeing but **not** a health service) |
| Primary URL | https://dayoneapp.com/ |
| Corpus rank | 120 |
| Benchmark strength (source list) | Reflective prompts and privacy |
| Locale / market observed | en-US |
| Platform observed | Web marketing site, plans page, help-guide index, blog; apps for iOS, Android, macOS, Windows, watchOS and web (app UI not entered) |
| Regulatory posture | **Not a health product and does not claim to be** — a standing disclaimer on mental-health blog content states the services "are not intended, designed, or implied to diagnose, prevent, or treat any condition or to be a substitute for professional medical care". No HIPAA, no clinical licensure, no regulated status. **EU Accessibility Act** — the accessibility statement is explicitly scoped to the EAA (effective 28 June 2025) and to WCAG 2.1 AA, with named platform-by-platform conformance and an approval date. **US state privacy** — `Privacy Notice for California Users` and a `Do not sell or share my personal information` control are footer-level on every page. **Law enforcement** — a published position on legal process, an emergency-disclosure exception, and a link to Automattic's `Transparency Report`. **Encryption policy** — an explicit anti-backdoor commitment, inherited from parent company Automattic Inc. **GDPR** — not separately named on the pages inspected; the EAA scoping and Automattic ownership imply an EU posture but this was not verified. |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Partial — marketing, plans, encryption, privacy pledge, privacy FAQs, help-guide IA, accessibility and one prompt-library artefact captured in full. In-app UI, the actual Daily Prompt library, and the AI feature copy (`Daily Chat`, `Go Deeper Prompts`) are `[documented]` or `[absent]`. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://dayoneapp.com/ | Hero, five benefit sections, press quotes, user testimonials |
| Features | https://dayoneapp.com/features/ | Six themed groups, caption-led rather than prose-led |
| Plans / Pricing | https://dayoneapp.com/plans/ | Three tiers, 9-group comparison matrix, 9-question FAQ incl. cancellation |
| End-to-End Encryption | https://dayoneapp.com/features/end-to-end-encryption/ | **The privacy-explanation artefact** |
| Privacy Pledge | https://dayoneapp.com/privacy-pledge/ | Five numbered commitments |
| Privacy & Security FAQs | https://dayoneapp.com/privacy-faqs/ | Nine questions incl. law enforcement and data sale |
| Help Guides | https://dayoneapp.com/guides/ | 19 categories with article counts |
| Accessibility Statement | https://dayoneapp.com/accessibility-statement/ | WCAG 2.1 AA, per-platform, dated and approved |
| 5 Types of Journaling Prompts for Anxiety | https://dayoneapp.com/blog/journaling-prompts-for-anxiety/ | **The prompt-design artefact**; clinician-authored, with a standing disclaimer |

---

## T1 Navigation & IA labels `[observed]`

**The primary nav is five items and nothing else:**
`Features` · `Pricing` · `What's New` · `Blog` · `Get the App`

No `Sign in` in the header (login is a footer/CTA item, `Login now`), no search,
no mega-menu. For a product with 19 help-guide categories and three price tiers,
this is aggressive restraint — and it matches the product's own promise
("a layout that has everything you need and nothing you don't").

**`What's New`** as a top-level nav item is unusual: release notes promoted to
peer status with Features and Pricing. It signals an actively maintained product
to a user being asked to store a decade of their life in it.

**Footer is four columns plus a legal line:**

| Column | Members |
|---|---|
| `Get The App` | `iPhone/iPad/Watch` · `Android` · `Mac` · `Windows` · `Browser Extensions` · `Web` |
| `Offers` | `Features` · `Pricing` · `Book Printing` · `Send a gift` · `Redeem a gift` |
| `About` | `About Day One` · **`Privacy Pledge`** · `Release Notes` · `Podcast` · `Blog` · `Press` |
| `Help` | `Help Guides` · `Forum` · `Contact Us` · `Terms` · `Privacy` · `Accessibility Statement` |
| Legal line | `Privacy Notice for California Users` · `Do not sell or share my personal information` · `© Automattic Inc.` |

**`Privacy Pledge` sits in `About`, not in `Help` or in the legal line.** That is
the IA decision worth recording: privacy is positioned as **part of the company's
identity**, alongside `About Day One` and `Press`, rather than as a compliance
document. The actual `Privacy` policy is separately in `Help`. Two artefacts, two
locations, two jobs — one persuasive, one legal.

**Help Guides — 19 categories, every one with a scope sentence and an article
count.** The counts are the notable part; they set expectation before the click:

| Category | Articles | Scope line (verbatim, abbreviated) |
|---|---|---|
| `Contact Support` | 1 article | "Need help? We offer several resources to assist you…" |
| `Getting Started` | 12 articles | "Welcome to Day One! This series of guides will help you begin your journaling journey with ease." |
| `Day One for iOS` | 15 articles | |
| `Day One for Android` | 8 articles | |
| `Day One for Mac` | 11 articles | |
| `Day One on the Web` | 5 articles | |
| `Day One Classic` | 13 articles | "Documentation for Day One Classic, the now-retired version of the app." |
| `Day One Premium` | 8 articles | |
| `Day One Sync` | 8 articles | |
| `Settings` | 26 articles | |
| `Tips and Tutorials` | 53 articles | |
| `Release Notes` | 5 articles | |
| `Troubleshooting` | 36 articles | |
| `Paper Journal` | 1 article | |
| `Day One for Windows` | 2 articles | |
| `Import and Export` | 3 articles | |
| `Shared Journals` | 4 articles | "…share your personal stories and experiences with up to 30 selected individuals, while keeping your individual entries private and secure." |
| `Labs` | 2 articles | "Get early access to experimental features and help shape the future of journaling." |
| `AI Features` | 7 articles | **No scope line** — see below |

Three observations. **(a) The IA is platform-first, not task-first** — six of
nineteen categories are "Day One for [platform]". That is a sync-heavy
cross-platform product organising by where the user is stuck.
**(b) `Day One Classic` is documented as a retired product**, with 13 articles
still maintained — a product that does not abandon its legacy users.
**(c) `AI Features` is the only category with no scope line** — 7 articles and a
bare label, in a product whose entire pitch is privacy. The absence is
conspicuous and is recorded as a gap, not read into.

The Shared Journals scope line is the best-written in the set because it states
the **boundary inside the feature description**: share with up to 30 people
"**while keeping your individual entries private and secure**". The limit and the
reassurance are in the same sentence as the capability.

## T2 Value proposition & headline patterns `[observed]`

**The hero is four words and a possessive:**

> `Your journal for life.`
> `The #1 journaling app.`

`for life` is a deliberate double reading — *lifelong* and *for your life*. The
same line is the site's `og:site_name`, so it is the anchor phrase everywhere.

**Section headers on the homepage are all promises about the user's experience,
and every one is a complete sentence with a full stop:**

- `Beautiful, award-winning design.`
- `Quickly revisit moments from the past.`
- `Tell your story, words optional.`
- `You own the data, we keep it safe.`
- `On your lap and in your pocket.`
- `Capture life's moments, anytime, anywhere.`
- `People ❤️ Day One.`

**`Tell your story, words optional.`** is the strongest line on the estate. It
removes the single biggest barrier to journaling — the blank page and the
expectation of prose — in three words, and does it as a *permission* rather than
a feature announcement ("Add photos, videos, drawings, or audio recordings").

**`You own the data, we keep it safe.`** is a two-clause ownership/custody split
that becomes the spine of the entire privacy argument (see T10).

**The features page abandons prose entirely** and runs on italic captions under
images — `Unlimited number of text entries.` · `Automatic backups to our private
servers keep your journal safer than safe.` · `Time, date, weather, step count,
and other key data is magically added to every entry.` Its section headers are
the interesting layer, because each is a *user anxiety answered*:

- `Simple to use, easy to love`
- `A journal that goes with you everywhere without the risk of going anywhere` — the standout: portability and privacy resolved in one antithesis
- `Bring your journal to life with more than just words`
- `Start an entry on one device, finish on another`
- **`A journal you actually go back and read`** — naming the known failure of journaling (you never re-read it) as the header for the retrieval features
- `Get in the habit. Stay in the habit.`
- `Type less, record more`

**Pricing headline is three imperative fragments in ascending depth:**
`Start journaling. Stay consistent. Reflect more deeply.` — which maps exactly
onto the three tiers (Basic / Silver / Gold). The tier ladder and the behavioural
ladder are the same ladder, stated in one line.

**Third-party quotation used as the privacy proof point.** A *New York Times*
pull-quote sits on the homepage in place of a self-claim:
> *"It feels almost sacred: A completely private digital space."*

Letting an external outlet make the sacredness claim, rather than the brand,
is a defensible way to use emotive language about privacy without over-promising
in the first person.

## T3 CTA inventory `[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `App Store` / `Android` / `Mac` | Hero, footer, modals | **Platform names used as button labels** — no verb at all |
| `Download now` | Hero | |
| `Download the free Day One journal app…` | Recurring block | Sentence-as-CTA |
| `Get the App` | Nav | |
| `Sign up` | Basic tier | The free tier's verb |
| `Get Started` | Silver and Gold tiers | The paid tiers' verb — **different verb for paid vs free** |
| `Go Premium` | Encryption page | Legacy tier name — see T13 |
| `Login now` / `Login Now` / `Login` | Hero, modals, footer | Three casings |
| `Learn more →` | Mac section | Bare `Learn more` with an arrow |
| `Read the blog →` | Inspiration block | |
| `Read our privacy pledge` | Encryption page | **CTA text = destination title** |
| `Answer these prompts` | Blog, ×5 | **Deep-links straight into a pre-filled new entry** — see T4 |
| `Get in touch` | Help guides | |
| `Send a gift` / `Redeem a gift` | Footer | |
| `Book Printing` | Footer | |
| `Clear chat` | Help-guide assistant | |
| `Ask` / `Search` | Help-guide tabs | |
| `Skip to content` | First in DOM | Accessibility |
| `Do not sell or share my personal information` | Footer legal | |

**Finding: the download CTAs have no verbs.** `App Store`, `Android`, `Mac` are
destination names used as buttons. It works because the surrounding sentence
supplies the verb ("Download the free Day One journal app on iPhone, Android…"),
and it sidesteps having to repeat "Download" five times. Recorded as a deliberate
economy rather than an omission.

**`Sign up` for free vs `Get Started` for paid** is a small but real signal —
the free tier is framed as account creation, the paid tiers as beginning
something.

**`Answer these prompts` is the most interesting CTA in this batch.** It appears
five times in the anxiety-prompts blog post and each instance is a
`dayone.me/newentry?...&content=<gzipped, base64 payload>` deep link — i.e. the
CTA does not route the reader to a marketing page or to the App Store; it opens
a new journal entry **pre-populated with the seven prompts they have just read**.
The distance between reading a prompt and writing an answer is reduced to one
tap. See T4.

## T4 Onboarding & getting-started `[observed]` / `[documented]`

**There is no how-it-works sequence.** Day One's onboarding argument is that
there is nothing to learn: "Focus on your writing with a layout that has
everything you need and nothing you don't."

Onboarding work is done instead by three mechanisms:

**(1) A bounded free trial with an explicit safety net**, stated in one
two-line block at the top of the pricing page:

> "Start your **free 1 month trial** inside the app.
> **Cancel anytime without losing your data.**"

The loss-fear is answered in the same breath as the trial offer, before any
price is shown. For a product holding a decade of someone's life, `without
losing your data` is the operative phrase, and it is repeated in the FAQ
(`Will I lose my journal if I cancel?` → "No. Your entries remain yours.").

**(2) Habit scaffolding named as a product area.** `Prompts & Habit Building` is
a pricing-matrix group in its own right, containing `Daily prompt`,
`Prompt Gallery`, `Journal templates`, `On this Day memories`,
`Journaling Reminders`, `Journal streaks` — **all six available on the free
tier**. The mechanisms that build the habit are deliberately not paywalled.

Supporting copy: "With custom journaling reminders, **'I forgot' will never be an
excuse again.**" — naming the user's own excuse back to them, lightly.
And "With journal streaks, track your journaling streak to keep your momentum
going."

**(3) Prompt-to-entry deep links** (see T3). The blog's five
`Answer these prompts` links carry the prompt set into a new entry. This
collapses inspiration and action into one step and is the most reusable
acquisition/activation mechanic in this file.

**Documented habit guidance** `[documented]`, from the clinician-authored blog —
notable because it *lowers* the bar rather than raising it:

> "Building a journaling habit every day is ideal, but it's **not absolutely necessary**."
> "Making things too complicated or forcing yourself into an impractical schedule will result in frustration. You may quit journaling before you've had a chance to enjoy its benefits fully."
> "If you skip a few days or even weeks of journal writing, **it doesn't mean you've failed. Simply start again.**"

A product that sells streaks also publishes "skipping doesn't mean you've
failed". Those two sit in tension and Day One resolves it by putting the streak
in the app and the forgiveness in the editorial — worth noting as a deliberate
split of voice by surface.

## T5 Form & field labels `[observed]` / `[documented]` — the prompt as the field label

Day One has almost no conventional forms. **Its "field labels" are its prompts** —
and since the brief asks how a private journaling product words invitations to
disclose, that is the artefact recorded here.

### The prompt architecture `[documented]`

Four named prompt surfaces appear in the pricing matrix and features copy:
`Daily prompt` (free) · `Prompt Gallery` / `Prompt Library` (free) ·
`Journal templates` (free) · `Go Deeper Prompts` (Gold, AI) ·
`Reflective AI summaries & prompts` (Gold).

**The prompt is explicitly framed as non-binding**, which is the single most
important content decision in the whole prompt system:

> "Journal prompts are questions, thoughts, or suggestions that give you a **starting point** for writing."
> "When using prompts, remember that they are **just suggestions** to get you going."
> "If one idea sparks another and takes you off on a different topic, **that's OK. The prompt did its job.**"
> "Journaling prompts are meant to **inspire and never limit** your journaling experience."

`The prompt did its job` is the line to steal. It redefines success as *departure
from the prompt*, which pre-emptively removes the "I answered it wrong" failure
mode that kills prompt-based products.

### The prompts themselves — five categories, 34 prompts, observed verbatim

Authored by a named licensed clinician (`Hannah Van Horn, MCMHC, LPC-C`).
Grouped and sampled here; grammar analysis below.

**1. Prompts for Self-Reflection**
`What makes me feel in control?` · `What are my biggest strengths?` ·
`What's a failure I experienced recently? How did I learn and grow from it?` ·
`What can I accomplish today that I would not have been able to do a year ago?` ·
`Do I trust myself to make big decisions? If not, how can I learn to trust myself more?` ·
`What are five things I can do to calm myself in a stressful situation?` ·
`What is a choice I can make today that will help me reach my goals?`

**2. Prompts for Emotional Awareness**
`What am I feeling right now?` · `Which emotions do I try hardest to avoid?` ·
`What can I do to be kinder to myself when I'm feeling anxious?` ·
`How do I typically express my emotions?` · `How do I suppress my emotions?` ·
`Do I believe some emotions are negative or bad? If so, how did I come to that belief?` ·
`The last time I felt anxiety, what did I do about it?`

**3. Prompts for Gratitude and Positivity**
`What are five things I take for granted but am very thankful for?` ·
`What can I do to better express my gratitude to those I love?` ·
`Where is my "happy place" — the place I feel most relaxed? Describe this place in detail.` ·
`I am thankful to myself for …` · `One thing I am most looking forward to today is …` ·
`What's a friendship that I really cherish?` · `Describe a time recently when I really laughed.`

**4. Prompts for Self-Care and Coping Strategies**
`What is the biggest source of stress in my life right now, and what is one thing I can do about it?` ·
`Make a list of things (beliefs, habits, commitments, etc.) that no longer serve me, and write about how I can release them.` ·
`Describe a perfect day of self-care.` · `Write a self-love letter listing all my best qualities.` ·
`Write about a person who inspires me…` · `What is something I really love doing? How can I make time to do it more?`

**5. Prompts for Mindfulness and Relaxation**
`What are my current surroundings? Describe them in detail.` ·
`What was a stillness or silence I experienced today? How did it make me feel?` ·
`What brought me joy today?` · `Write about one positive new habit I would like to explore.` ·
`What are five things I noticed outside today?` ·
`Where am I holding tension in my body, and how can I release it?` ·
`What is something I thought was a failure but turned out to be a wonderful gift?`

### Prompt grammar — the design rules, derived

**(a) First person throughout — `I`, `my`, `me`.** Not "you". The prompt is
written as the user's own thought, so answering it is continuing a sentence
rather than replying to an interrogator. In a product about private disclosure,
removing the second-person questioner from the page removes the sense of being
asked.

**(b) Present tense and today-bounded.** `What am I feeling right now?` ·
`What brought me joy today?` · `What are five things I noticed outside today?`
The time window is small, which makes the ask answerable.

**(c) The two-part construction: open question + concrete follow-up.**
Roughly a third pair an unbounded question with a bounded second clause —
`What's a failure I experienced recently? **How did I learn and grow from it?**` ·
`Do I trust myself to make big decisions? **If not, how can I learn to trust
myself more?**` · `What was a stillness or silence I experienced today?
**How did it make me feel?**` The first clause opens the disclosure; the second
gives the user somewhere to land. This is the highest-value pattern in the set.

**(d) Numbers bound the effort.** `five things I take for granted` ·
`five things I can do to calm myself` · `five things I noticed outside today`.
A countable ask is finishable; "what are you grateful for?" is not.

**(e) Sentence stems for the hardest asks.** `I am thankful to myself for …` ·
`One thing I am most looking forward to today is …` Both are in the
*gratitude toward the self* category — the hardest thing to write unprompted —
and both are the only two prompts given as fill-in-the-blank stems rather than
questions. **The format softens precisely where the ask is most exposing.**

**(f) `Describe` and `Write about` replace `Why`.** `Describe this place in
detail` · `Describe a perfect day of self-care` · `Write a self-love letter`.
Descriptive verbs invite narration; `Why do you…` invites self-justification.
**There is not a single `Why do I…?` prompt in the set.**

**(g) Painful territory is entered obliquely, and always with an exit.**
`Which emotions do I try hardest to avoid?` and `How do I suppress my emotions?`
are genuinely searching, but they ask about *strategy* rather than about the
painful content itself. `Do I believe some emotions are negative or bad? If so,
how did I come to that belief?` interrogates a belief, not an event.
`What is something I thought was a failure but turned out to be a wonderful gift?`
routes a failure memory through a reframe before asking for it.

**(h) One technique is explicitly designed for the un-shareable** —
`Unsent Letter Journaling`, described with an unusually careful set of endings:
> "Sometimes the people you need to speak with aren't emotionally available or have already passed away… After writing, you can **tear the letter up, delete it, share it with your therapist or trusted friend, or just keep it private.**"

Four disposal options offered, including deletion, including sharing with a
clinician. The product tells the user what to do with the thing it just asked
them to write. Very few products that invite disclosure close the loop.

### Other observable "fields"

- `Journal templates` — "a great way to add structure and consistency to your entries."
- Privacy controls have named labels: `passcode`, `biometric lock`, `conceal content`, `Hidden Entries`.
- Help-guide assistant: `Ask` / `Search` tabs, placeholder `Ask me something...`, `Clear chat`.
- AI usage limits produce a message `[documented]`: "If you reach the limit, you'll see a message letting you know." (Copy not published.)

## T6 Status & state language `[observed]` / `[documented]`

- `streak` — the headline state. Surfaced in testimonials with real numbers ("a 1,469 day journaling streak").
- `On This Day` — a named retrieval state, italicised as a product noun throughout.
- `Journal streaks` · `Journaling Reminders` · `Calendar view` · `Map view` · `Media views` — the named views.
- `entry` is the atomic unit; `journal` is the container; `Collections` (Silver+) groups journals.
- Tier states: `Basic` / `Silver` / `Gold`, with downgrade explicitly defined: "You'll keep access to your entries. Features included in higher tiers may become limited, but your content remains safe and accessible."
- Trial state: "If you cancel before the trial ends, you won't be charged."
- Encryption state: "turned on by default" for new journals post-4.2 on iOS/Mac; pre-4.2 and Android journals require the user to "turn on" E2EE.
- Sync state: "It is encrypted for the entire time it is syncing between your devices."
- Device limits are stated as states, not errors: `1 device` (Basic) vs `Unlimited devices` (Silver/Gold); `Photos: 1 per entry` vs `30 per entry`.

**The downgrade-state copy is the strongest here.** Three of the nine pricing
FAQs are about losing access (`What happens if I downgrade?`, `Will I lose my
journal if I cancel?`, `Can I switch between Silver and Gold later?`) and all
three answer with continuity first. In a memory product, the state that matters
is *what survives*.

## T7 Error, failure & recovery `[observed]` / `[documented]`

- `Troubleshooting` is the second-largest help category (36 articles) after `Tips and Tutorials`.
- **The free-trial eligibility failure is disclosed pre-emptively**, in bold, in the pricing FAQ:
  > "Please note: **free trial eligibility is controlled by the App Stores.** If you've already used a Day One free trial (for example, Silver), the App Store may not allow another free trial when upgrading to Gold."

  Naming the external party responsible, and describing the exact scenario that
  triggers the failure, before the user hits it. Model disclosure of a
  third-party-caused limitation.
- **The cross-platform billing failure is handled the same way:**
  > "Upgrades and billing changes must be made on the platform where you originally subscribed (Apple, Google, etc.). **If you're unsure, our support team can help you find the right place to manage your plan.**"

  The constraint plus a human fallback for the user who cannot remember where
  they bought it — a real and common confusion.
- Encryption-key loss is pre-empted rather than errored: "Because it's important to keep your encryption key safe, we store the encryption key in iCloud or Google Drive by default so you don't lose access to it. You can choose to print the key or save it to a PDF instead." The catastrophic-failure mode of E2EE (lost key = lost decade) is addressed by default behaviour plus two manual escape hatches.
- `Day One Classic` retains 13 troubleshooting-era articles for a retired product.
- No in-app error strings are reachable. `[absent]`

## T8 Empty states `[absent]`

None reachable. The help-guide search renders `Search For :` with no result
state in server HTML; all first-run and no-data states are in-app.

The nearest observable analogue is the AI limit message, documented but not
quoted: "If you reach the limit, you'll see a message letting you know."

## T9 Notifications & system messages `[documented]`

- **`Journaling Reminders`** — a named, customisable feature, free tier. The only user-facing notification product, and it is framed as habit support: "'I forgot' will never be an excuse again."
- **`On This Day`** — a resurfacing mechanism that behaves like a notification, described emotively: "Use *On This Day* to take a trip back in time. **No time machine needed.**" A user testimonial characterises its effect: "Constant source of joy: @dayoneapp's 'On this Day' feature which offers up memories from years past."
- **Marketing email is disclosed with examples**, in the privacy FAQ:
  > "If you're subscribed to marketing communications, we'll use your email address and usage information to send timely and relevant messages, which you can always opt-out of. This might look like **an email celebrating when you've made your 100th entry**, or letting you know when a new feature drops."

  Naming a concrete example of the email a user will receive — and disclosing
  that it is driven by *usage information* — inside the privacy FAQ rather than
  in a marketing settings page is honest placement.

**A content-design risk worth flagging:** `On This Day` resurfaces past entries
without knowing their emotional content. A journaling product that invites
disclosure of grief, trauma and anxiety (see T5) and then algorithmically
re-presents those entries on their anniversary has an obvious duty-of-care
surface. **No copy governing this was found** — no "sensitive memory" handling,
no opt-out wording, no content warning language on any public page. Recorded as
`[absent]`, and as a question for an authenticated pass.

## T10 Disclosures, legal & compliance `[observed]` — PRIORITY

### The privacy explanation — a three-layer architecture

Day One publishes **three separate privacy artefacts with three different jobs**,
and the separation is the lesson:

| Artefact | Job | Register |
|---|---|---|
| `Privacy Pledge` (in `About`) | Persuasion and identity — five numbered commitments | Warm, first person plural, emotive |
| `Privacy & Security FAQs` | Answering the specific fear | Direct Q&A, technical where needed |
| `End-to-End Encryption` (a *feature* page) | Explaining the mechanism | Metaphor-led, illustrated |
| `Privacy Policy` (in `Help`) | Legal | Not inspected |

**The framing sentence, repeated verbatim across all three persuasive surfaces:**

> "**Privacy is the literal foundation upon which Day One is built.**"

and the pledge proper:

> "**What you put in Day One will always be *your* data, but we pledge to protect it like it's our own.**"

That sentence is doing the ownership/custody split from the homepage
(`You own the data, we keep it safe.`) in contractual language.

### The encryption explanation — how a hard mechanism is made legible

The E2EE page is structured as **four escalating claims with an illustration
each**, and the sequence is the craft:

1. `Your journal is safeguarded from the start.` — establishes *when*
2. `Meet the power duo of data security: Asymmetric and Symmetric Encryption.` — names the mechanism, personifies it
3. **`Only *you* have the master key.`** — the payload
4. `Access your encrypted content across multiple devices.` — resolves the obvious objection (if it's encrypted, how does sync work?)

**The load-bearing sentence, and the best privacy string in this batch:**

> "This key remains beyond the reach of even Day One's servers, so **even if we wanted to read what's in your journal (we *don't*), we *couldn't*.** And if someone maliciously got into our system, they wouldn't be able to read what's in your journal, either. **Only *you* have the encryption key.**"

Three things make it work. **(a) It states incapability, not intention.**
"We couldn't" is verifiable in a way that "we won't" never is. **(b) The
parenthetical `(we don't)` pre-empts the reader's next thought** — that the
company might want to — and dismisses it in two words without dwelling.
**(c) It immediately extends the guarantee to the attacker case**, which is the
user's real fear.

The same construction is reused verbatim in the Privacy Pledge, so it is a
governed sentence rather than a happy accident.

**Metaphor discipline.** The page uses `military-grade`, `impenetrable shield`,
`layers of cryptographic algorithms`, `master key`, `power duo` — and then the
FAQ supplies the actual specification, `AES-GCM-256`. Metaphor on the feature
page, specification in the FAQ. Both audiences served without either being
patronised or lost.

**Local-only is offered as a choice, parenthetically:**
> "Unless you choose to only store your data locally (**yes, this is an option**), your data syncs with our servers."

`(yes, this is an option)` anticipates disbelief — a small, well-judged
conversational interjection in an otherwise formal paragraph.

### The five-point Privacy Pledge

1. `Military-grade encryption` — the incapability sentence above, closing with "**your content is 100% private.**"
2. `Passcode + Biometrics` — "If someone gets their hands on your phone (**children are the most common culprits**), they shouldn't have access to your journal." The threat model is named and it is domestic, not criminal — which is the honest one for a journal.
3. `Hidden Entries` — "no one wants **Stranger Steve** looking over their shoulder at the juicy details in their journal." A named cartoon threat actor for shoulder-surfing.
4. `Our Track Record of Trust` — tenure and scale as evidence: since 2011, 4 million journals, 200,000 5-star reviews.
5. `Continued Privacy Innovation` — a forward commitment.

**The threat modelling is the transferable part.** Most privacy copy defends
against hackers and governments. Day One's first two threats are **your children
and the person next to you on the train** — the threats that actually apply to a
diary, described in the vocabulary of the people experiencing them.

### Privacy FAQs — the nine questions, and three notable answers

| # | Question (verbatim) |
|---|---|
| 1 | Where is my data stored? |
| 2 | How can I be sure my data is safe? |
| 3 | Who owns my data? |
| 4 | What happens to my data if I delete the app? |
| 5 | Will Day One ever sell my journal data? |
| 6 | What exactly is end-to-end encryption, and what does it mean for my data? |
| 7 | Why aren't my journals end-to-end encrypted? |
| 8 | **Can law enforcement request my journal data?** |
| 9 | Why should I trust you? |

**Q5 — the business-model answer.** "**No, never!** Day One is funded by revenue
from Premium subscriptions and printed journals. We have no incentive to sell
your journal data. **Plus, we couldn't do so anyway, thanks to end-to-end
encryption.**" Three layers: refusal, *economic rationale for the refusal*, and
technical impossibility. Explaining how you make money is the most convincing
part of a promise not to sell data.

**Q8 — the law-enforcement answer, and the strongest disclosure in this file.**
Summarised with key phrases quoted:
- Process: "We carefully review every law enforcement request we receive and **we push back if we believe the request is invalid or over-broad.**"
- Threshold: "We require valid U.S. legal process before producing information; **the only exception is for emergency situations if we believe that there is an immediate threat of death or serious physical injury.**"
- Minimisation: "**we only share the least amount of information possible**", with concrete examples of what that would be (email address, device).
- The guarantee: "**We can't view your encrypted journal content or decrypt it, even if we received valid legal process requesting it.**"
- Accountability: links to Automattic's public `Transparency Report` and notes "These requests are rare, and we do not produce information in every case."

**This is a complete disclosure**: the process, the legal threshold, the named
exception, the minimisation principle, the technical limit, and third-party
verification. Almost no consumer product publishes all six.

**The anti-backdoor commitment**, inherited and stated:
> "As part of the Automattic family of products, we support and promote the encryption of user data, and **we do not provide access to user data through 'back doors' in our systems.**"

**Q7 is the honest one.** `Why aren't my journals end-to-end encrypted?` — a FAQ
written from the position of a user who discovered the feature is *off*. The
answer states the version and platform conditions plainly: default for new
journals after 4.2 on iOS and Mac; "For journals created prior to 4.2 or for
those on Android, **you can turn on** end-to-end encryption." Publishing the gap
in your own flagship protection, as a question in the user's voice, is creditable.

**Q9 — `Why should I trust you?` — answers with a refusal to demand trust:**
> "**We can't make you trust us**, but we've been around since 2012 and have had over 4 million journals created… We're always available to chat if you'd like to learn more."

(Note: the pledge says 2011, this FAQ says 2012. Recorded as an inconsistency.)

### Data ownership and exit

> "You own your data, not us."
> "We offer a variety of export options to ensure your data goes wherever you do, **regardless of your subscription status.**"

Export is free on every tier: `Export to PDF` ✓ Basic ✓ Silver ✓ Gold;
`Data export (CSV/JSON)` ✓ on all three. **Un-paywalled export is the practical
test of a data-ownership claim**, and Day One passes it in the pricing matrix
where it is checkable, not only in the prose where it is assertable.

**Defect recorded:** Q4 (`What happens to my data if I delete the app?`) is
rendered on the page with `==highlight==` markdown showing as literal text, and
**its answer does not address the question** — it discusses analytics collection,
backup, and marketing email instead of what happens on deletion. A question about
deletion is answered with a paragraph about retention. Recorded as a content
defect in an otherwise exemplary privacy set.

### Pricing and cancellation

Three tiers, stated annually, with a one-line positioning for each:

| Tier | Price | Positioning line (verbatim) |
|---|---|---|
| `Basic` | `$0 per year` | "Best for getting started with journaling" |
| `Silver` | `$49.99 per year` | "Everything you need for consistent, daily journaling" |
| `Gold` | `$74.99 per year` | "A deeper journaling experience, designed for reflection" |

**`$0 per year` rather than "Free"** — using the same unit for the free tier
makes the ladder legible at a glance. The free tier is genuinely substantial
(`Unlimited journal entries`, `Unlimited journals`, `End-to-end encryption`,
`Daily Prompt & Prompt Library`, `Journal Templates`, `On This Day`,
`Journal Streaks`, web access, export).

**Encryption is on every tier.** Not upsold. For a privacy-positioned product
that is the necessary proof, and it is visible in the `Privacy & Security` group
of the matrix where all four rows are ✓ ✓ ✓.

**Cancellation and retention copy — four separate reassurances:**
> "Cancel anytime **without losing your data.**" (pricing hero)
> "If you cancel before the trial ends, you won't be charged." (FAQ)
> "**Will I lose my journal if I cancel?** No. Your entries remain yours. If you cancel a paid plan, you'll revert to the free version with access to your journal, subject to free plan limits." (FAQ)
> "**What happens if I downgrade?** You'll keep access to your entries. Features included in higher tiers may become limited, but your content remains safe and accessible." (FAQ)

The qualifier `subject to free plan limits` is present and correct — the
reassurance is bounded rather than absolute.

**Auto-renewal wording: `[absent]` from the pricing page.** There is no statement
that subscriptions renew automatically, no renewal-date language, and no
cancellation deadline. Billing is delegated to Apple/Google
("Upgrades and billing changes must be made on the platform where you originally
subscribed"), which is presumably why — but the consequence is that **a user on
dayoneapp.com cannot learn from the pricing page that their plan will renew.**
Recorded as a gap. The `Terms` page was not inspected and may carry it.

### AI disclosure

AI features are confined to Gold and are named individually in the matrix:
`Daily Chat` · `Go Deeper Prompts` · `Entry Summaries` · `Title Suggestions` ·
`Image Generation` · `Apple Intelligence Features` · `Day One Labs`.

The framing sentence is careful:
> "**Optional** tools that support deeper reflection through chat, personalized prompts, and summaries."

`Optional` is the first word of the group description — in a product whose
entire proposition is that no one else can read your journal, leading the AI
section with optionality is the right instinct.

**But the disclosure stops there.** On the pages inspected there is **no
statement of how AI features interact with end-to-end encryption** — whether
entries are decrypted client-side or server-side for `Entry Summaries`, whether
any content leaves the device, or which model or provider is used. The
`AI Features` help category (7 articles) carries no scope line and was not
opened. The only AI-related limit published is commercial: "Day One's AI features
have daily usage limits to ensure fair access for all users."

Recorded factually as `[absent]` on the public marketing and privacy surfaces
harvested. This is the most significant disclosure gap in an otherwise
best-in-batch privacy estate, and it is precisely the question a privacy-
motivated buyer of the Gold tier would ask. See Caveats.

### Health-content disclaimer

The mental-health blog carries a standing disclaimer, bolded in part:

> "This content is not professional advice, diagnosis, or treatment. **You understand and agree that the services, products, and any other information you learn from Day One are not intended, designed, or implied to diagnose, prevent, or treat any condition or to be a substitute for professional medical care**. Always seek the advice of your mental health professional or other qualified health provider with any questions you may have."

### Crisis signposting `[observed]` — with a material accuracy finding

A crisis instruction is published **on the mental-health blog post**, immediately
following the disclaimer. Recorded exactly as published:

> "If you are in crisis or you think you may have an emergency, call your doctor or 911 immediately. If you're having suicidal thoughts, call 1-800-273-TALK (8255) to talk to a skilled, trained counselor at a crisis center in your area at any time (National Suicide Prevention Lifeline). If you are located outside the United States, call your local emergency line immediately."

**Three factual observations, recorded without substituting any resource.**

**(a) The number given is the legacy 1-800-273-TALK line and the service is named
by its former name (`National Suicide Prevention Lifeline`).** The US service was
rebranded and the three-digit `988` code introduced in 2022; both BetterHelp and
Talkspace (records 117 and 118) publish `988` prominently, and Talkspace renders
it as a one-tap `tel:` link. Day One's crisis copy on this page does not
reference `988`.

**(b) The article carries `Last updated Sep 17, 2026`** in its byline while the
crisis block references pre-2022 naming — i.e. the article has been updated
without the safety block being reviewed. A dated article with an undated,
un-reviewed safety footer.

**(c) Placement and prominence.** The crisis copy is in the *footer of one blog
post*, below the author bio and above the social-share buttons. It is **not** in
the global site footer, **not** on the app marketing pages, and **not** adjacent
to the anxiety prompts themselves — which are 900 words higher up the same page
and are the part of the article a user in distress is most likely to act on.

**No corrected number, alternative resource or substitute wording is offered
here.** These are observations about the page as retrieved on the harvest date.
Anyone relying on this content should verify it against the live page.

**A mitigating observation:** the same article does route users toward
professional help in body copy, more than once, and does so without stigma:
"Anxiety disorders often require treatment from a mental health professional." ·
"share it with your therapist or trusted friend" · "With the possible exception
of sharing with a therapist, keep your journal private" · "Self-care can
encompass everything from your skin-care routine to seeing a therapist for help
with your anxiety." Therapy is positioned as ordinary and adjacent throughout —
the journal is repeatedly framed as *complementary to* care rather than as a
substitute for it: "journaling can be an important part of your **overall
self-care plan**", "Many mental health professionals recommend that clients keep
a journal as part of their treatment program."

## T11 Help-centre architecture `[observed]`

Headed `Advice and answers from the Day One Team` — a warmer framing than
"Support" or "Help Center".

**Two-mode entry: `Ask` and `Search` tabs**, with an AI assistant
(`Ask me something...`, `Clear chat`) offered *before* the category grid. A
conversational-first support IA with keyword search demoted to a second tab.

**19 categories, each with an article count** (see T1). Counts range from 1
(`Contact Support`, `Paper Journal`) to 53 (`Tips and Tutorials`).

**Routing furniture is short and honest:**
> `Contact Support` — "Premium users have access to priority support."
> `Support Forum` — "If you can't find an answer in our Help Guides, please post your question on the Day One Forum…"

Disclosing that paid users get faster support, plainly, in the support hub, is
creditable. Routing the dead-end to a **community forum** rather than to a ticket
form is a small-company economy stated without embarrassment.

**Gaps:** the categories are platform-shaped rather than task-shaped, so a user
with a question about, say, privacy must guess between `Settings` (26),
`Day One Sync` (8), `Tips and Tutorials` (53) and `Troubleshooting` (36). And
`AI Features` has no scope line at all.

## T12 FAQs `[observed]`

Two FAQ sets, on `/plans/` and `/privacy-faqs/`. The privacy nine are listed in
T10. The pricing nine:

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Is there a free version of Day One? | "Yes." Enumerates what free includes, ending with end-to-end encryption. |
| 2 | What's the difference between Basic, Silver, and Gold? | Three one-line summaries mapping to the three-verb headline. |
| 3 | Can I try Silver or Gold before subscribing? | Yes, plus the bolded App-Store trial-eligibility caveat. |
| 4 | How do I upgrade my plan? | Platform-of-origin rule. |
| 5 | I subscribed on iPhone. Can I upgrade on the web or Android? | The same rule restated as a scenario, with a human fallback. |
| 6 | What happens if I downgrade? | Continuity first: "You'll keep access to your entries." |
| 7 | Will I lose my journal if I cancel? | "No. Your entries remain yours." |
| 8 | Can I switch between Silver and Gold later? | Yes, both directions. |
| 9 | Are there any limits to the AI features? | Daily usage limits "to ensure fair access for all users"; a message on reaching the limit. |

**Structural reading.** Questions 1–3 are acquisition; **4–8 are all about
changing or leaving**, which is five of nine. For a product asking for a decade
of commitment, weighting the FAQ toward exit reassurance is correct. Q5 is the
notable construction: it is Q4 **restated as a first-person scenario**
("I subscribed on iPhone…") because the abstract rule in Q4 does not help
someone who already has the problem. Two questions, one rule, two levels of
concreteness.

Q9 is the only AI question, and it is commercial (usage limits) rather than
privacy. See T10.

## T13 Terminology & glossary `[observed]`

| Term | Day One's usage | The alternative it rejected |
|---|---|---|
| `journal` | Both the container and the act | "diary" — used only in the App Store title (`Day One Journal - Private Diary`) for search, never in the site's own voice |
| `entry` | The atomic unit | "post", "note" |
| `On This Day` | The memory-resurfacing feature, italicised as a proper noun | "Memories", "Flashback" |
| `Prompt Gallery` / `Prompt Library` | **Two names for one feature** — `Gallery` in the matrix, `Library` in the tier bullets | |
| `Go Deeper Prompts` | Gold AI prompts | "advanced prompts" |
| `Daily Chat` | Gold AI conversational reflection | "AI assistant", "chatbot" |
| `Journal streaks` | The consistency metric | "habit tracker" |
| `Collections` | Silver+ grouping above journals | "folders", "tags" |
| `Shared Journals` | Multi-person journals, capped at 30 | "collaborative journals" |
| `Hidden Entries` / `conceal content` | The shoulder-surfing defence | "private entries" — avoided, because *everything* is private |
| `master key` | The user-held encryption key | "private key" (used once, technically) |
| `military-grade` | The encryption adjective in marketing | `AES-GCM-256` — which is used in the FAQ |
| `Basic` / `Silver` / `Gold` | The current tier names | **`Premium`** — the legacy name, still live in `Go Premium` CTAs, `/premium/` URLs, the `Day One Premium` help category (8 articles), `premium-label.svg` assets, and "Premium users have access to priority support" |
| `Labs` | Experimental-feature programme | "beta" |
| `Paper Journal` / `Book Printing` | The physical products | |
| `Automattic` | Parent company, named in the footer and in the encryption position | |

**The `Premium` residue is the governance finding.** A three-tier rename has
shipped on the pricing page while `Premium` survives in CTAs, URLs, a help
category, asset filenames and support copy. A user clicking `Go Premium` on the
encryption page does not know which of Silver or Gold they are buying.

**`Prompt Gallery` vs `Prompt Library`** is a second, smaller instance of the
same problem — on the same page.

## T14 Voice, tone & accessibility `[observed]` — PRIORITY

**Person.** Second person for the user throughout; first-person plural for the
company, used heavily in the privacy copy where agency matters
("we pledge", "we push back", "we couldn't", "we don't"). Prompts break the rule
deliberately and use **first person singular** (see T5) — the only surface where
the voice is the user's own.

**Register: warm, short, unafraid of emotion, and disciplined about where it
stops.** Contractions throughout. Em-dashes and sentence fragments used freely.
Three distinct registers, cleanly separated by surface:

1. **Marketing — lyrical.** `Your journal for life.` · `Tell your story, words optional.` · `capturing life as you live it` · `No time machine needed.` · `the pages of your life story` · "all those thoughts, emotions, and big feelings swirling around in your head (and heart)".
2. **Privacy — conversational but precise.** `(yes, this is an option)` · `(we don't)` · `children are the most common culprits` · `Stranger Steve` — humour deployed *inside* security copy, which normally kills credibility, and here does not, because every joke is immediately followed by a specific technical or procedural fact.
3. **Editorial (the blog) — clinical and hedged.** Authored by a named licensed counsellor; cites UC Davis, NCBI, Frontiers, APA; hedges consistently ("journaling **may** allow you to identify behavioral patterns", "Anxiety disorders **often** require treatment from a mental health professional").

**Tone under emotional load — where it is strongest.** The product invites
disclosure of grief, anxiety, trauma and shame, and the copy that surrounds that
invitation is consistently **permissive rather than prescriptive**:

- "they are just suggestions to get you going" · "that's OK. The prompt did its job."
- "meant to inspire and never limit"
- "There's nothing wrong with opening your journal and writing down whatever's on your mind."
- "do what works for you"
- "it doesn't mean you've failed. Simply start again."
- "You don't have to worry about finding something to write about or wondering if you're **'doing it right.'**"
- "Stream-of-consciousness writing (SOC) is a good technique for people who are **hypercritical of themselves**" — a technique recommended *for* a specific self-directed cruelty
- "write without stopping **or correcting grammar or spelling mistakes**"

**`wondering if you're "doing it right"`** — in scare quotes — names the exact
anxiety a prompt can induce and disarms it. This is the emotional-load pattern
worth extracting: **a product that asks for disclosure must also publish
permission to do it badly.**

**Practical care instructions accompany the emotional ask** — the blog's habit
tips are unusually protective:
- "Write in a **private, quiet space where you won't worry others are looking over your shoulder**"
- "Give yourself **five to 10 minutes of reflection time after writing** before rushing off to other responsibilities"
- "With the possible exception of sharing with a therapist, **keep your journal private**"
- "Use a timer so you don't have to divert your attention to check a clock"

The second of these — decompression time after writing — is aftercare advice, and
it is the kind of thing almost no product publishes about its own use.

**Where the tone slips, recorded honestly:**

- **The carrot analogy.** A 70-word vegetable metaphor ("Carrots are good for you, but if carrots are the only vegetable you eat, it won't take long to become tired of them…") sits in the middle of an article about anxiety prompts. Register mismatch with the surrounding clinical content.
- **`military-grade` and `impenetrable shield`** are marketing absolutes applied to security. `impenetrable` is not a claim any system can make, and it sits three paragraphs from the page's genuinely careful incapability sentence.
- **`your content is 100% private`** — an absolute, in a pledge, on a page that elsewhere correctly bounds itself.
- **The streak/forgiveness tension** (T4): the app ships streaks, the blog says skipping isn't failure. Defensible as a surface split, but unresolved.
- **Two founding dates** (2011 in the pledge, 2012 in the FAQ) and **two prompt-feature names** on one page.
- **`==highlight==` markdown rendering as literal text** in the privacy FAQ, on a question whose answer does not match the question.

**Numbers as trust devices:** `4 million` journals, `over 150,000 5-star reviews`
(homepage) vs `over 200,000 5-star reviews` / `200k 5-star ratings` (pledge and
FAQ) — **three different review counts across three pages**. `#1 journaling app`,
`App of the Year`, `Apple Editors' Choice`, `Apple Design Award`, `Time`,
`The Verge`, `Washington Post`, `Wired`, `NYT`.

**Testimonials are real users with handles and specifics**, and the specifics are
the persuasion: "riding a 1,469 day journaling streak", "thousands of entries
going back to 2014", "if 72,000 words wasn't telling enough", "10 years digital
yearbook and counting". Duration and volume, not sentiment.

### Accessibility `[observed]` — best in this batch

- `Skip to content` link, first in DOM, on every page inspected.
- **A dated, approved, scoped accessibility statement** — "approved by the Day One product team on **June 13th, 2025**". A named approver and a date; almost unique in this corpus.
- **Names the conformance target and the regulation**: WCAG 2.1 Level AA, and the EU Accessibility Act (effective 28 June 2025).
- **Scopes its own claim honestly rather than over-claiming.** The statement says compliance work focused on "specific user flows that involve consumer transactions… Subscription upgrade, subscription management and cancellation flows", and then: "While our compliance efforts have focused on these specific flows, other areas of our apps and website **may also meet accessibility standards to varying degrees**". A precisely bounded claim is more useful than a blanket one — though it also means **the journaling experience itself is not covered by the conformance claim**, which is the part a disabled user would care most about. Both facts recorded.
- **Per-platform conformance detail** for iOS, macOS, Android and Web, each with eight named criteria: `Text & Media Alternatives`, `Keyboard Navigation & Focus`, `Contrast & Visual Clarity` (4.5:1 named), `Resizable & Adaptable Text` (200% named), `Clear & Descriptive Labels`, `Error Handling & Feedback`, `Forms & Interactive Elements`, `Assistive Technology Compatibility`, `Touch & Interaction Readability`. VoiceOver and TalkBack named by platform.
- **`Limitations and Alternatives` is a published section**: "a few minor issues may remain in edge cases. Some third-party login flows or embedded content might not fully expose elements to assistive tech. On older browsers, some features may degrade. **When content cannot be made fully accessible, we strive to provide alternatives or support.**"
- `Technical Specifications` names HTML5, CSS, JavaScript, WAI-ARIA and platform accessibility APIs, and commits that "All new code is reviewed for accessibility."
- Feedback channel: `support@dayoneapp.com`, with an explicit invitation.
- Alt text on the marketing site is descriptive where it matters: "You own the data, we keep it safe image." · "Automatic backups to our private servers keep your journal safer than safe image." · "Privacy protected with industry leading end-to-end encryption image." · "A person writes in their journal" · "Answering journaling prompts for anxiety with the Day One app".
- **Defect:** many of those alt strings **end with the literal word "image"** ("…keep your journal safer than safe image.") — a screen reader will announce "image" twice. A systematic, easily fixed flaw.
- **Defect:** several decorative and product images carry empty or filename alt.
- No VPAT published; no audit vendor named; no remediation timetable.

---

## Transferable patterns

1. **State incapability, not intention.** "even if we wanted to read what's in your journal (we *don't*), we *couldn't*" is the strongest privacy sentence in this corpus. Design the system so the promise is structural, then say so — and pre-empt the reader's suspicion in a two-word parenthetical rather than a paragraph.
2. **Model the threat the user actually has.** `children are the most common culprits` and `Stranger Steve looking over their shoulder` beat "unauthorised access" because they are the threats a diary faces. Write security copy for the user's threat model, not the security team's.
3. **Write prompts in the first person.** `What am I feeling right now?` not "What are you feeling?" Removing the second-person questioner makes answering a continuation of thought rather than a reply to an interrogator. Directly transferable to reflective, onboarding and research questions.
4. **Pair the open question with a concrete second clause.** "What's a failure I experienced recently? **How did I learn and grow from it?**" The first clause opens; the second gives somewhere to land. And bound the effort with a number (`five things`) when the ask is vague.
5. **Use sentence stems where the ask is most exposing.** `I am thankful to myself for …` is the only stem-format prompt in a set of 34, and it is on the hardest topic. Change the format, not just the wording, at the point of maximum difficulty.
6. **Publish permission to do it badly.** "that's OK. The prompt did its job." · "wondering if you're 'doing it right'" · "it doesn't mean you've failed. Simply start again." Any product that asks for disclosure or habit must explicitly license imperfect participation.
7. **Tell the user what to do with what they just wrote.** Unsent Letter Journaling offers four endings — tear it up, delete it, share it with a therapist, keep it private. Closing the loop after inviting disclosure is a duty-of-care move almost no product makes.
8. **Answer "what do I keep?" five times.** Five of nine pricing FAQs concern downgrade, cancellation and data retention, and `Cancel anytime without losing your data` sits above the first price. In any product holding irreplaceable user content, exit reassurance *is* the pricing copy.
9. **Un-paywall the proof.** End-to-end encryption and full data export are ✓ on the free tier, visible in the comparison matrix. A data-ownership claim is only credible where the matrix agrees with the prose.
10. **Negative pattern: date your safety copy.** A crisis block referencing a pre-2022 service name sits in an article stamped `Last updated Sep 17, 2026`. Safety-critical content needs its own review cadence, independent of the article that contains it — and ideally its own visible review date, as BetterHelp does.

## Caveats & gaps

- **The in-app experience was not entered.** No account was created and no journal, prompt or AI feature was used. The actual `Daily Prompt` rotation, the full `Prompt Gallery`, `Go Deeper Prompts`, `Daily Chat`, `Entry Summaries`, journal templates, streak/milestone copy, reminder wording and all empty and error states are `[absent]`. The 34 prompts recorded in T5 are from **one blog article about anxiety** and are not necessarily representative of the in-app library.
- **AI privacy disclosure is `[absent]` from the public surfaces harvested.** No statement was found on how `Daily Chat`, `Entry Summaries`, `Go Deeper Prompts` or `Image Generation` interact with end-to-end encryption, whether entry content is decrypted server-side, whether it leaves the device, or which provider is used. The `AI Features` help category (7 articles) and `/guides/ai-features/` were **not opened** and may contain exactly this. Recorded as the principal gap; not inferred either way.
- **`On This Day` duty-of-care copy is `[absent]`.** No wording governing the resurfacing of distressing entries was found. Flagged as a question, not a defect.
- **Crisis-copy accuracy finding is scoped to one page** (`/blog/journaling-prompts-for-anxiety/`) as retrieved on the harvest date. No corrected number or substitute resource is offered anywhere in this file. Verify against the live page before relying on it. Whether other blog articles carry updated safety blocks was not checked.
- **Auto-renewal wording not found** on `/plans/`. The `Terms of Use` and `Privacy Policy` were **not inspected**; both may carry renewal, billing and data-retention terms that would change T10.
- **Help-guide article bodies not opened** — 19 category labels, scope lines and article counts only.
- **Three unresolved inconsistencies recorded**: founding year (2011 vs 2012); 5-star review count (150,000 vs 200,000 vs 200k); `Prompt Gallery` vs `Prompt Library`. Plus the live `Premium` tier-name residue across CTAs, URLs, a help category and support copy.
- **Content defects recorded as found**: `==highlight==` markdown rendering literally in the privacy FAQ, on a question whose answer does not address the question asked; alt text systematically ending with the word "image".
- **Accessibility assessed from markup and the published statement only.** No assistive-technology testing was performed. Note that the statement's own conformance claim covers only purchase and subscription-management flows — the journaling experience is explicitly outside the scoped claim.
- **Only `en-US` harvested.** No other locale surfaces were identified.
- **Classification note:** Day One is filed under `HLTH` on the strength of its reflective-wellbeing positioning, its clinician-authored mental-health editorial, and this batch's brief. It is a productivity/memory product that does not claim to be a health service, and its own disclaimer says so explicitly. Read its patterns as transferable to wellbeing contexts, not as those of a regulated health provider.

## Sources

1. https://dayoneapp.com/
2. https://dayoneapp.com/features/
3. https://dayoneapp.com/plans/
4. https://dayoneapp.com/features/end-to-end-encryption/
5. https://dayoneapp.com/privacy-pledge/
6. https://dayoneapp.com/privacy-faqs/
7. https://dayoneapp.com/guides/
8. https://dayoneapp.com/accessibility-statement/
9. https://dayoneapp.com/blog/journaling-prompts-for-anxiety/
