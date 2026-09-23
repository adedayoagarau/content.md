# 179. Carrd

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Single-page site builder (one-page personal sites, landing pages, link-in-bio) |
| Primary URL | **https://carrd.com/** — see the domain note below |
| Corpus rank | 179 |
| Benchmark strength (source list) | Radically concise setup |
| Locale / market observed | en-US |
| Platform observed | Web (marketing, pricing, documentation) |
| Regulatory posture | n/a — no regulator named on any page inspected. Terms, Privacy and a Content Policy exist as documentation pages; no GDPR, CCPA or cookie-consent copy observed anywhere |
| Auth state | Unauthenticated public surfaces only. **No form was submitted.** |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Partial by nature of the target — Carrd's documentation is deliberately shallow and most category pages are pure link lists with one-line descriptions. Leaf articles were sampled, not exhausted. There is no status page, no changelog fetched, no FAQ page, and no help-search surface. |

## Domain verification

**The brief asked to verify and record the real domain. It is `carrd.com`, not `carrd.co`.**

`https://carrd.co/` issues a redirect to `https://carrd.com` (observed at harvest). Every canonical tag on every page inspected reads `carrd.com`; every internal link, every demo-site link and every documentation URL uses `carrd.com`. The `.co` domain still resolves and still redirects, so both work, but **the product's own canonical is `.com`.**

One residue of the older domain survives: the demo sites linked from the home page are hosted on the **`.co` subdomain space** — `johnsmith-demo.carrd.co`, `caycepollard-demo.carrd.co`, `janeanderson-demo.carrd.co`, `randomapp-demo.carrd.co`, `showcase-demo.carrd.co`. So **user sites live at `*.carrd.co` while the company site lives at `carrd.com`.** That is a coherent split (marketing on one TLD, user content on another) but it is nowhere explained, and a user reading the docs sees `carrd.com` throughout while their own published site will be `something.carrd.co`. Recorded as an undocumented inconsistency.

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://carrd.co/ → https://carrd.com | Entire marketing site is this one page |
| Go Pro! (pricing) | https://carrd.com/pro | 15 plans in one grid |
| Documentation index | https://carrd.com/docs | Six categories, one line each |
| Docs: General | https://carrd.com/docs/general | Six articles |
| Docs: Sites | https://carrd.com/docs/sites | 28 articles — the largest category |
| Docs: Building | https://carrd.com/docs/building | 22 articles |
| Docs: Forms | https://carrd.com/docs/forms | Six articles |
| Docs: Forms → Custom | https://carrd.com/docs/forms/setting-up-a-custom-form | Destination taxonomy |
| Docs: Forms → Troubleshooting | https://carrd.com/docs/forms/troubleshooting | **The one page where the concision breaks — see T7** |
| Docs: Account | https://carrd.com/docs/account | 11 articles |

---

## T1 Navigation & IA labels

**There is no global navigation bar.** `[observed]` The header carries a wordmark and a single control labelled `Menu`. Everything else is behind it.

**The menu — six items, each with a one-line gloss** `[observed]`

| Label | Gloss (verbatim) |
|---|---|
| `Log In` | "Log in to an existing account" |
| `Sign Up` | "Create a free Carrd account" |
| `Documentation` | "Get answers and instructions" |
| `Changelog` | "Learn what's new (and changed)" |
| `Go Pro!` | "Upgrade your Carrd experience" |
| `Contact` | "Send your questions and comments" |

Closing control: `Close`.

**Six menu items is the entire information architecture of the company.** No Solutions, no Resources, no Blog, no Customers, no Community, no Compare, no Careers, no About. Framer's footer alone carries 70+ links; Typeform's nav opens three multi-column panels. Carrd has six.

**The glosses are the notable content decision.** Every item, including `Log In` and `Sign Up` — labels no user has ever misunderstood — carries an explanatory line. `Log In` / "Log in to an existing account" is redundant on its face, but it does one thing: it distinguishes `Log In` from `Sign Up` for a user who is not sure which they need, at the only moment both are visible. `Changelog` / "Learn what's new (and changed)" is the one that earns its gloss — the parenthetical `(and changed)` signals that this is not only a feature-announcement feed but a record of things that are no longer as they were. **Three words in brackets doing real expectation-setting.**

**Footer — four links, on every page** `[observed]`: `Home` · `Terms` · `Privacy` · `Contact`. Plus `© Carrd Inc. All rights reserved.`

**A four-link footer is the most concise in this corpus by a wide margin**, and it is a legitimate finding rather than a gap: Carrd has no status page, no trust centre, no security page, no accessibility statement, no community, no careers page, no cookie banner. There is nothing else to link.

**Documentation IA — six categories, one line each** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `General` | "Basic information about Carrd" |
| `Sites` | "Managing and configuring sites" |
| `Building` | "Working with the site builder" |
| `Forms` | "Building and using Form elements" |
| `Account` | "Managing your Carrd account" |
| `Pro` | "Upgrade your Carrd experience" |

Five of six are gerund phrases naming an activity (`Managing`, `Working`, `Building`, `Managing`), which is the Wise pattern. The odd one out is `Pro`, whose scope line is **copied verbatim from the `Go Pro!` menu item** — a commercial CTA line reused as a documentation category description. It is the only category whose gloss does not say what is in the category.

**The two-level object model is clean and visible in the category names:** a *site* is the thing you manage (domain, title, analytics, deletion); *building* is what you do inside one (elements, sections, columns, code); *forms* is a sub-domain of building large enough to be split out. **`Sites` (28 articles) and `Building` (22) are the two real categories; `General` (6), `Forms` (6) and `Account` (11) are small; `Pro` is commercial.**

**A persistent sidebar on every docs page lists all six categories, and expands the one you are in to show every article as a short-form label.** `[observed]` The expanded labels are *shorter than the article titles* — the index lists `Setting up SSL`, the sidebar lists `SSL`; the index lists `Working With Custom Templates`, the sidebar lists `Custom Templates`; the index lists `Protecting Forms from Spam and Bots`, the sidebar lists `Spam Protection`.

**Two labels for every article — a full task title in the index and a bare noun in the sidebar — is the most disciplined piece of IA in this file.** The index is for finding; the sidebar is for orienting. A user who knows what they want scans the sidebar; a user who does not reads the index. Most documentation sites ship one label and compromise.

**Breadcrumb** `[observed]`: `Documentation` › `Forms` › page title. Two levels, no home link, no separator noise.

## T2 Value proposition & headline patterns

**The entire marketing site is one page, and it is short.** `[observed]`

> H1: `Carrd`
> Tagline: `Simple, free, fully responsive one-page sites for pretty much anything.`
> Section H2: `Build one-page sites for pretty much anything`
> Body: "Whether it's a personal profile, a landing page to capture emails, or something a bit more elaborate, Carrd has you covered. Simple, responsive, and yup — totally free."

**`for pretty much anything` appears twice, in the tagline and in the section header**, and it is the whole positioning: Carrd refuses to name a vertical. Framer says `landing pages`, `portfolio maker`, `AI website builder`; Typeform says `lead generation`, `employee onboarding`; Tally says `Creators`, `Product`, `Marketing`, `HR`, `Office`, `Personal`. Carrd says *pretty much anything* and then gives exactly three examples in a subordinate clause.

**`pretty much` is a hedge doing positioning work.** It is casual, it is slightly self-deprecating, and it is honest — a one-page site builder genuinely cannot do everything. A more confident product would say "for anything". Carrd's hedge is more credible than the confident version would be.

**The three value pillars are single adjectives** `[observed]`

| Header | Body (verbatim) |
|---|---|
| `Simple` | "Start with one of dozens of templates (or a blank page) and make it your own." |
| `Responsive` | "Look great at every screen size right out of the box, from phones to tablets to desktops." |
| `Free` | "Build up to three sites per account and use all of Carrd's core features – for free!" |

**One-word headers.** Not `Simple setup`, not `Radically simple` — `Simple`. Compare Wise's `Low fees` / `Lightning fast` / `Perfectly predictable` (two words each, one adjectival, one intensified) and Typeform's `High Response Rate` / `Deeper Insights` (Title Case noun phrases). **Carrd's are the shortest benefit headers in the corpus and they carry the same information**, because the body sentence immediately below does the qualifying.

Note that the `Free` body does the bounding in the same breath as the claim: "Build up to **three sites** per account and use **all of Carrd's core features** – for free!" The limit (`three`) and the scope (`core features`) are both in the sentence that makes the claim. **`core features` is the load-bearing hedge** — it is never defined on the home page, and the reader must go to `/pro` to discover what is not core.

**The Pro section header names itself as optional** `[observed]`: `Optional: Go Pro!`

**Prefixing an upsell section with the word `Optional:` is the single most Carrd-ish decision on the site.** It is a colon-prefixed label rendered as part of the heading, and it tells the reader they may skip this. No other product in this batch does anything comparable — Tally's `Do more with Tally` is gentle, but it does not say *you don't have to*.

**The price is given with a joke about the billing period** `[observed]`:

> "Upgrade your Carrd experience! Go Pro from just **\$19 / year** (yup, per *year*) and get access to Pro-exclusive features like:"

**`(yup, per year)` with `year` italicised** is a parenthetical anticipating the reader's misreading. The price is so low relative to the category that Carrd assumes you will assume it is monthly, and pre-empts it. This is the same move as the `Free` bounding — say the number, then immediately address what the reader is about to get wrong.

`yup` appears twice on the home page (`Simple, responsive, and yup — totally free.` and `(yup, per year)`). It is the site's only real verbal tic.

**Closing header** `[observed]`: `Sound good?` — "Click below to get started. **No signup required.**"

A two-word question as the final section header, and the same three-word friction-removal line Tally uses (`No signup required`). **Two independent products in this batch place the identical three-word string under their primary CTA.** Carrd's is phrased "No signup required." with a full stop; Tally's is "No signup required" without. Both sit directly beneath the button.

**What is absent from the marketing page** `[absent]`, and the absence is the finding:

No customer logos. No testimonials. No user count. No "trusted by". No case studies. No comparison table. No integrations wall. No awards. No blog. No newsletter capture. No chat widget. No cookie banner. No video. **The only social proof on the entire site is five clickable demo-site thumbnails**, each labelled with a fictional name: `"John Smith" demo site preview`, `"Cayce Pollard" demo site preview`, `"Jane Anderson" demo site preview`, `"Random App" demo site preview`, `"Showcase" demo site preview`.

Two of those names are worth a note. `John Smith` and `Jane Anderson` are deliberate placeholder-people. **`Cayce Pollard` is the protagonist of William Gibson's *Pattern Recognition*** — a character defined by an allergy to branding and logos. On a marketing page that carries no logos, no testimonials and no brand noise, naming the demo persona after fiction's most famous brand-averse character is either a very dry joke or a coincidence. Recorded as observed; the intent is not stated anywhere.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Menu` | Header, every page | The nav is a CTA |
| `Close` | Open menu | |
| `Choose a Starting Point` | Hero (primary), closing section | **The primary CTA — see below** |
| `Log In` | Hero secondary, menu | |
| `Sign Up` | Menu | |
| `What is Carrd?` | Below the hero pair | A question as a scroll anchor |
| `Learn More` | Home, Pro section | One bare `Learn more` on the site |
| `Go Pro!` | Menu | Exclamation mark in a nav label |
| `Select Plan` | `/pro`, on each of 15 plan cards | Identical across all 15 |
| `Start Pro Trial` | `/pro`, trial section | |
| `Documentation` · `Changelog` · `Contact` | Menu | |
| `get in touch` | Docs index, inline | Lowercase, mid-sentence |

**`Choose a Starting Point` is the most interesting CTA in this batch and possibly the best.**

It is the primary button in the hero, repeated as the only button in the closing section. It does not say `Get started`, `Sign up`, `Try it free`, or `Create a site`. It describes **the literal next screen** — a gallery of templates and a blank option — and it frames the whole act as a choice among options rather than as a commitment.

Three things it achieves at once. It removes the account-creation implication entirely (compare `Get started for free`, which still means "make an account"). It sets an accurate expectation of what happens on click. And it uses the phrase `Starting Point`, which is the same noun the documentation uses for templates (`Start with one of dozens of templates (or a blank page)`), so the CTA and the destination share vocabulary.

**The cost:** `Choose a Starting Point` is four words and four syllables longer than `Get started`, and it is Title Cased in a way that reads slightly dated. A conversion team would test it out. It would probably lose on click-through and win on activation.

**`What is Carrd?` as a secondary CTA** is a scroll anchor to the `#about` section, placed below the primary/secondary button pair. Offering "explain yourself first" as a named third action, beneath the two doors, is a small courtesy to a cold visitor and almost nobody ships it.

**`Select Plan` appears fifteen times on `/pro`, identically.** Fifteen plans, one CTA label, no plan name inlined. Compare Typeform's `Get Basic` / `Get Plus` / `Get Business`. With fifteen cards the repetition is arguably correct — inlining the name would produce `Select Pro Standard 1000` — but a user who scrolls back up loses track of which button belongs to which card. **The one place where Carrd's concision costs clarity.**

**`Go Pro!` carries an exclamation mark in a navigation label**, and the same string with the same punctuation is the `/pro` page's H1. A punctuated nav item is unusual; it is the only exclamation mark in Carrd's navigation.

## T4 Onboarding & getting-started

**There is no onboarding content on the marketing site.** `[absent]` No how-it-works, no step count, no numbered sequence, no tour, no video, no prompt starters. The home page goes hero → three adjectives → Pro list → `Sound good?` → button.

**Onboarding is the CTA.** `Choose a Starting Point` → template gallery. The instruction and the mechanism are the same object.

**In documentation, onboarding is two articles** `[observed]`: `Overview` — "Brief overview of the builder interface" and `Basics` — "Step by step instructions for basic builder tasks", both in the `Building` category, positions one and two.

**`Brief overview`** — the word `Brief` is in the description of the overview article. Carrd flags the shallowness of its own documentation in the documentation's own summary line. That is either admirable or a warning, depending on what you needed.

**`Keyboard Shortcuts`** is the third article in `Building` — the same high placement Tally gives it. Both products put keyboard shortcuts in the first three getting-started articles; neither Framer, Typeform nor Ghost does.

**The documentation index's welcome paragraph is the closest thing to an onboarding statement** `[observed]`:

> "Welcome to the official Carrd documentation! We've tried to provide answers and instructions for the most common questions and tasks, but if you can't find what you're looking for here please get in touch."

**`We've tried to`** is the operative phrase. It is a hedge on the completeness of the documentation, in the first sentence of the documentation, followed immediately by the escape route. Most products write "Everything you need to know". Carrd writes *we tried*. **This is the concision thesis stated as a disclaimer: the docs are short, we know they are short, here is how to reach a human.**

**Trial onboarding** `[observed]`:

> `Try Pro free for 7 days` — "Test drive Pro's top features (like custom domains and advanced forms) free for a full **7 days** – **no payment or credit card required.** Upgrade to a full Pro plan at any time during or after your trial."

Four facts in two sentences: duration, two named example features, the precondition (none), and what happens after (nothing automatic — you upgrade "at any time during or after"). **`no payment or credit card required` states the negative twice** (payment, card) because users read past one of them. And crucially: **there is no auto-conversion.** Compare Typeform's `Try free for 14 days` + `Credit card required` + `379USD/mo after 14 days`. Carrd's trial cannot charge you; Typeform's will.

**`Test drive`** as the verb, and `for a full 7 days` with the intensifier — the only marketing-register phrasing on the `/pro` page.

## T5 Form & field labels

**Carrd is a site builder, not a form product, but forms are a named documentation category and a paid feature.** Everything below is `[documented]` from the Forms category pages.

### Forms are typed by destination, not by field

**This is the structural finding.** Carrd's forms taxonomy is organised around *where the data goes*, not around *what the fields are*. There are four form types:

| Form type | Documented purpose | Plan gate |
|---|---|---|
| `Contact Form` | "Allow visitors to send feedback via email" | Pro Standard+ |
| `Signup Form` | "Capture emails to Mailchimp, Sendy, and more" | Pro Standard+ |
| `Custom Form` | "Build a custom form with any combination of fields" | **Pro Plus+** |
| `Payment-Enabled Form` | "Enable Stripe payments on any form" | Pro Standard+ |

Plus two support articles: `Protecting Forms from Spam and Bots` and `Troubleshooting`.

**Three of the four form types are named by their outcome (`Contact`, `Signup`, `Payment-Enabled`) and only one is named by its composition (`Custom`).** A user who wants a contact form picks `Contact Form`; a user who wants three text fields and a dropdown must know that this is `Custom` and that it costs more. **The taxonomy is optimised for the 90% case and charges for the 10%.**

`Payment-Enabled Form` is the one clumsy name — a compound adjective doing work that `Payment Form` would do more cleanly, presumably because payments are an *addition* to another form type ("Enable Stripe payments on **any** form") rather than a type of their own. The name is technically more accurate and less readable.

### Field types are named only in passing

`[documented]` The `Custom Form` page names field types in a single sentence and nowhere else on the pages inspected:

> "Custom forms allow you to build forms with *any* combination of supported fields (including **text fields**, **select fields**, and even **file upload fields**)."

**Three field types named, with "including" signalling the list is partial.** Compare Tally's 21 named input blocks with slash commands and Typeform's 31 named question types in six groups. **Carrd names three, in a parenthesis, in one sentence, and does not publish a complete field-type list on any page inspected.** `[absent]`

Further field-type vocabulary surfaces only in the troubleshooting article, where it appears as incidental detail rather than as documentation:

| String | Source | Note |
|---|---|---|
| `Select` fields | Troubleshooting, Airtable section | Title-cased in scare quotes: "if your form uses \"Select\" fields" |
| `Hidden` field | Troubleshooting, custom-form section | "try using a **Hidden** field for that instead" |
| `Fixed Value` | Troubleshooting | A field property, not a type |
| `Name` (field property) | Troubleshooting, Airtable | "Verify each of your fields' **Name** values match up *exactly*" |
| `ID` (field property) | Troubleshooting | "Try assigning explicit IDs to each of your fields" |
| label (field property) | Troubleshooting | "Ensure each of your fields have unique **labels**" |
| `First Name` | Troubleshooting, Mailchimp | Given as an example of a merge-tag-mapped field |
| `Spam Protection` | Troubleshooting | A form-level setting with named options |
| `Filter messages` | Troubleshooting | A contact-form-only option |
| `Cloudflare Turnstile` | Troubleshooting | A named spam-protection method |

**So Carrd's field vocabulary is: text, select, file upload, hidden — four types, three of which are only discoverable by reading the troubleshooting page.** A designer trying to answer "what controls does Carrd offer?" from public documentation cannot.

**The three-field-name split is documented, though, and it is precise** `[documented]`: every field has a **label** (respondent-facing, must be unique), an **ID** (optional, must be unique, letters/numbers/hyphens/underscores only), and — for integration targets — a **Name** value that must match the destination exactly. Compare Tally's `question title` / `question field name` split (T5 in 178-tally.md) and Typeform's `Question reference` / `refs`. **All three products have independently arrived at a two-or-three-name model for one field, and all three document it only in a troubleshooting or advanced context.**

### The ID character rule is stated as a fix, not as a rule

`[observed]`

> "Try assigning explicit IDs to each of your fields using only **letters, numbers, hyphens, and underscores**."

The same character class Typeform documents for `Question reference` ("any alpha character (a-z, A-Z), any digit (0-9), '-' (dash), and '_' (underscore)"). **Typeform states it as a constraint with its error message named (`Argh`); Carrd states it as a remedial suggestion inside a troubleshooting bullet.** The rule is identical, the placement is not: a Carrd user encounters it after the form has already failed.

### Exact-match warnings are the dominant content pattern in Carrd's form docs

`[observed]` Four separate instances, all in the troubleshooting article, all emphasising exactness:

- "Verify **Table Name** is set to the *exact* table you're wanting to use (eg. `Table1`). Note that the name expected here is what's shown in the table's tab at Airtable and *not* what's shown at the top of the page."
- "Verify each of your fields' **Name** values match up *exactly* with their counterparts at Airtable – right down to their **casing and spacing**. **Any differentiation at all will cause your form to throw an error.**"
- "if your form uses \"Select\" fields, ensure their options match up *exactly* with their counterparts at Airtable."
- "Double check both to ensure they match up exactly with what's shown over at Mailchimp"

**`right down to their casing and spacing` and `Any differentiation at all will cause your form to throw an error` are the two most useful strings in Carrd's form documentation.** They name the failure mode (silent whitespace or case mismatch) and state the consequence absolutely. The third-party UI trap — "what's shown in the table's tab… and *not* what's shown at the top of the page" — is the kind of specific, hard-won detail that only appears in documentation written by whoever answers the support email.

### Signup-form destinations are named exhaustively

`[observed]` The `/pro` page lists 20 named email-service integrations for `Signup` forms: `ActiveCampaign`, `beehiiv`, `Brevo`, `Buttondown`, `EmailOctopus`, `GetResponse`, `Ghost`, `HubSpot`, `Kit`, `Klaviyo`, `Loops`, `Mailchimp`, `MailerLite`, `Mailjet`, `Omnisend`, `Resend`, `Sender`, `SendFox`, `SendGrid`, `Sendy`.

**Twenty named services, alphabetised, rendered as inline links in a single sentence.** This is the longest list on the Carrd marketing site and it is the one place the concision is abandoned — because for a signup form, "and many more" is not an answer; the user needs to see their own provider's name or leave.

Note that **`Ghost` (corpus #180) appears in Carrd's signup-form list, and `Typeform` (#177) appears in Carrd's widgets list.** The small-tool ecosystem is visible across this batch.

**The home page's older version of this list names six services** (`Mailchimp`, `Kit`, `ActiveCampaign`, `EmailOctopus`, and "many more"); the `/pro` page names twenty. **The home page list is a stale subset.** Recorded as a defect.

### Custom-form destinations

`[observed]` Seven named destinations, each with its own article and a two-label treatment (index title / sidebar label):

| Index title | Sidebar label | Purpose |
|---|---|---|
| `Setting up a Custom Airtable Form` | `Send to Airtable` | "Add records to a table at Airtable" |
| `Setting up a Custom Email Form` | `Send Email` | "Send messages to an email address" |
| `Setting up a Custom Make Form` | `Send to Make` | "Send data to a Make scenario" |
| `Setting up a Custom n8n Form` | `Send to n8n` | "Send data to an n8n workflow" |
| `Setting up a Custom URL Form` | `Send to URL` | "Send data to a custom URL" |
| `Setting up a Custom Zapier Form` | `Send to Zapier` | "Send data to a Zapier Zap" |
| `Setting up a Custom Code Form` | `Run Code` | "Process forms with your own custom JS code" |

**The sidebar labels are imperative verb phrases (`Send to Airtable`, `Run Code`) and the index titles are gerund noun phrases (`Setting up a Custom Airtable Form`).** Same two-register split as the rest of the docs, applied consistently. And note that **each destination gets the partner's own unit noun** — a Zapier `Zap`, a Make `scenario`, an n8n `workflow`, an Airtable `record` in a `table`. Carrd uses each integration's native vocabulary rather than flattening them all to "send data".

**The HTTP contract is documented in one sentence** `[observed]`: "make sure your URL responds with **200** to indicate success, and any other code to indicate failure." A complete integration spec in seventeen words.

### Payment forms

`[observed]` `Setting up a Payment-Enabled Form` — "Enable Stripe payments on any form". One sentence, one processor named, no further detail on the pages inspected. `[absent]` for field-level payment vocabulary.

### Does the concision hold up at the form failure points?

**The brief asked this specifically. The answer is: no on setup, yes on failure.**

- **Field types: fails.** Three named in a parenthesis; no complete list anywhere public. A user cannot evaluate whether Carrd can build their form without signing up.
- **Form troubleshooting: holds, and then some.** The troubleshooting article is the longest, densest, most specific page on the entire Carrd site (T7). The concision is abandoned precisely where abandoning it helps.

## T6 Status & state language

Thin, because a one-page static site has few states. `[documented]` from documentation article titles and glosses.

**Site lifecycle states** `[observed]`

| String | Source and meaning |
|---|---|
| `Archiving a Site` | "Move a site to or from your account's archive" — a reversible removal state |
| `Deleting a Site` | "Permanently delete a site from your account" — `Permanently` in the gloss |
| `Cloning a Site` | "Make a duplicate copy of a site" |
| `Transferring a Site` | "Transfer a site to another user" |
| `Downloading a Site` | "Download a site's unminified HTML, CSS, and JS" |
| `Sharing Sites` | "Share access to your sites and templates" |
| `Changing Update Frequency` | "Manually adjust the update frequency of a site" |

**`Archiving` and `Deleting` are separate documented articles and the difference is in the glosses: `Move a site to or from your account's archive` (reversible, stated bidirectionally) vs `Permanently delete a site from your account`.** The word `Permanently` appears in the delete gloss and in the account-deletion gloss (`Permanently delete an account and its data`). **Carrd puts the irreversibility word in the one-line summary, before the user opens the article.** That is the right placement and it is cheap.

**`Move a site to or from your account's archive` is phrased bidirectionally in a single clause** — the un-archive path is in the same sentence as the archive path, so the reader learns it is reversible without reading further.

**`Understanding Site Slots`** `[observed]` — "Learn about site slots and how they work". A coined concept with its own article in the `Account` category. **`site slot` is Carrd's term for the capacity unit**: a Pro Standard plan has 10 sites, which is 10 slots, and archiving presumably frees one. The relationship between slots, archiving and the plan limit is the one piece of state logic in the product that genuinely needs explaining, and Carrd gives it a dedicated article. See T13.

**Publish states: not named anywhere on the pages inspected.** `[absent]` There is no `Draft`, no `Published`, no `Live`, no staging concept. `Changing Update Frequency` — "Manually adjust the update frequency of a site" — implies a publish/propagation mechanism, but the states are not named. For a one-page builder that publishes instantly this may genuinely be a two-state system (exists / doesn't), but the documentation does not say so.

**`Update Frequency` is a Pro Plus feature** and appears in the plan feature lists. A user-adjustable cache-refresh cadence, named in three words, explained nowhere in the pages fetched.

**Trial state** `[observed]`: "Upgrade to a full Pro plan **at any time during or after your trial**." The `during or after` phrasing establishes that the trial does not lapse into anything — there is no expired state that blocks you.

**No status page exists.** `[absent]` No `status.carrd.com`, no uptime page, no incident history, no link from the footer. **Carrd is the only product in this batch with no public system-status surface.** For a hosting product this is a real gap; it is also consistent with a company that has a four-link footer.

## T7 Error, failure & recovery

**This is the section where Carrd's concision collapses, deliberately and correctly, and it is the most interesting finding in the file.**

There are **four `Troubleshooting` articles**, one per major category `[observed]`: `Sites → Troubleshooting` ("Common site issues and solutions"), `Building → Troubleshooting` ("Common building issues and solutions"), `Forms → Troubleshooting` ("Common form issues and solutions"), `Account → Troubleshooting` ("Common account issues and solutions").

**Four parallel troubleshooting articles with four near-identical glosses, one per category, always last in the category.** The pattern is mechanical and completely predictable — a user learns after the first one that every category ends in a troubleshooting page. Framer has one `Troubleshooting` category with 31 articles; Carrd has four articles, one per domain, each sitting at the foot of the category it serves. **Carrd's model keeps the fix next to the feature; Framer's gathers all fixes in one place.** Carrd's is better for a user who knows what they were doing; Framer's is better for a user who does not.

### The Forms troubleshooting article, in full structure

`[observed]` Nine problems, each titled as a **first-person symptom statement** and each answered in one to four sentences or bullets.

| # | Problem title (verbatim) |
|---|---|
| 1 | My form is getting spam submissions |
| 2 | New signups aren't appearing in my Mailchimp audience |
| 3 | I'm receiving an error when submitting my Mailchimp form |
| 4 | Certain required fields are showing up blank in my Mailchimp audience |
| 5 | Double opt-in isn't working on my MailerLite form |
| 6 | I'm not receiving messages from my contact form (or "Send Email" custom form) |
| 7 | I'm receiving an error when submitting my custom form |
| 8 | I'm receiving an error when submitting my "Send to Airtable" custom form |
| 9 | I'm receiving an error when submitting my "Send to URL" custom form |

**Every one of the nine is written in the user's first person, present tense, describing a symptom.** `My form is getting spam submissions`. `I'm not receiving messages from my contact form`. `New signups aren't appearing in my Mailchimp audience`.

**This is the Wise confession-title pattern applied to system failures rather than user errors**, and it is the strongest piece of help writing in this file. Wise writes `I sent money to the wrong person` (the user's fault). Carrd writes `I'm receiving an error when submitting my custom form` (not the user's fault). Same grammatical person, same present-tense symptom description, opposite blame. **Carrd demonstrates that the first-person-symptom title works for both cases** — the caveat in the Wise exemplar (only use it where the user genuinely erred) is too narrow. What matters is that the title is the sentence the user would type.

**Four of nine name a specific third party** (Mailchimp ×3, MailerLite ×1) and three name a specific Carrd form destination (`Send Email`, `Send to Airtable`, `Send to URL`, in scare quotes matching the sidebar labels exactly). **The titles are diagnostic: a user who knows they are using Mailchimp can skip six of the nine.**

**Three of nine are Mailchimp-specific.** One integration accounts for a third of the form troubleshooting surface. That is a support-load map published as documentation, and it should tell a content designer exactly where the product's integration UX is weakest.

### The answers

`[observed]` Brevity is preserved even here — the longest answer is four bullets — but the *specificity* is extreme.

**On spam:** "All forms provide basic spam and bot mitigation measures by default. However, if your form is still receiving unwanted submissions, try switching to a different **Spam Protection** method (such as Cloudflare Turnstile) or if you're working with a contact form, enable its **Filter messages** option." — Baseline behaviour stated first, then two escalation options, one of them conditional on form type.

**On delayed signups:** "New signups can sometimes take a little while to appear in your Mailchimp audience (particularly if you've enabled double opt-in). However, **if you still aren't seeing anything after 24 hours** please get in touch." — A wait-time threshold given before the escalation route. The user knows exactly when to stop waiting.

**On the Mailchimp error:** "…make sure you aren't submitting your form with a **\"test\" email** (eg. `test@test.com`), or an email you've previously subscribed to your audience but manually deleted." — Two causes that only someone who has read hundreds of support tickets would know. The second one (previously subscribed then manually deleted) is completely non-obvious and would otherwise cost an hour.

**On missing contact-form emails:** "The messages from your form *might* be landing in your spam/junk folder. If that's the case, marking those messages as \"not spam\", or simply **allowlisting all messages sent from `@mail.carrd.site`** should address the issue." — **The sending domain is published so the user can allowlist it.** `@mail.carrd.site` is a fourth Carrd domain (after `.com`, `.co`, and user subdomains) and this is the only place it is named.

**On merge tags:** "If you've changed any of your audience merge tags from their defaults (for example, your **First Name** field's merge tag is no longer `FNAME`), reverting back to those defaults should allow those fields to populate correctly." — The default value is quoted so the user can check theirs.

### The pattern

**Carrd's troubleshooting articles are where the site's word budget goes.** The marketing page has one sentence per pillar. The docs index has one line per category. The forms troubleshooting page has nine named symptoms, four named third parties, a 24-hour threshold, a sending domain, a merge-tag default value, an HTTP status code, and an explicit warning about casing and spacing.

**This is the correct allocation and it is the transferable lesson.** Concision is a budget, not a virtue. Carrd spends almost nothing describing what the product does and almost everything describing what to do when it doesn't. A user who is browsing gets six menu items; a user who is stuck at 11pm with a broken Airtable form gets the exact tab the table name is displayed in.

**What is missing:** no error strings are quoted. The articles say "I'm receiving an error" and "will cause your form to throw an error" without ever reproducing the error text. `[absent]` A user cannot search for the string they saw — they must match on symptom instead. Given that the titles are symptom-shaped, this is internally consistent, but it means Carrd's actual error copy is entirely unobserved.

## T8 Empty states

`[absent]` — no empty-state copy reachable. There are no product screenshots on the Carrd marketing site at all (only five demo-site thumbnails), and the documentation pages fetched contain no UI imagery in the served markup.

**Carrd is the only product in this batch with no product screenshots on its marketing page.** Framer, Typeform, Tally and Ghost all lead with interface imagery. Carrd shows five finished websites and nothing of the builder. That is consistent with `Choose a Starting Point` — the pitch is about the output, not the tool.

## T9 Notifications & system messages

Very thin. `[documented]`

**Email-delivery notification, and the one string that matters** `[observed]`:

> "allowlisting all messages sent from `@mail.carrd.site`"

**The sending domain for all contact-form notifications, published in documentation.** This is the single most operationally useful notification-related string on the site, and it is in a troubleshooting bullet.

**Notification routing, documented** `[observed]`: "ensure the recipient you've assigned to your form (or if you haven't assigned an explicit recipient, **your Carrd account email**) is working correctly and doesn't have any deliverability issues." The fallback recipient is named in a parenthesis.

**Double opt-in** is referenced as a third-party behaviour (`Mailchimp`, `MailerLite`) with a cross-platform gotcha documented: "you may need to also **enable double opt-in for API access** over at MailerLite if you haven't done so already." A setting in someone else's product that Carrd's users must change — named, with a link.

**No in-product toast, banner, alert, or system-message copy observed.** `[absent]` No notification-preferences documentation. No email-template copy. No status subscriptions (there is no status page).

## T10 Disclosures, legal & compliance

**The pricing page is the disclosure surface, and it is a grid of fifteen plans.** `[observed]`

**Three plan families, five to eight size variants each:**

| Family | Variants and prices |
|---|---|
| `Pro Lite` | `Pro Lite` \$9/yr (3 sites) · `Pro Lite 10` \$14 (10) · `Pro Lite 25` \$29 (25) |
| `Pro Standard` | `Pro Standard` \$19/yr (10 sites) · `25` \$39 · `50` \$69 · `100` \$119 · `250` \$249 · `500` \$399 · `1000` \$599 |
| `Pro Plus` | `Pro Plus` \$49/yr (25 sites) · `50` \$89 · `100` \$159 · `250` \$349 · `500` \$599 · `1000` \$999 |

**Fifteen plans, priced annually, with the site count in the plan name.** The naming convention is `<Family> <SiteCount>`, with the base variant unnumbered. It is machine-legible and completely unhelpful for a human comparing across families — `Pro Lite 25` (\$29) and `Pro Plus` (\$49) both give 25 sites, and nothing in either name signals the capability difference.

**The capability tiers are legible only from the feature lists**, and the differences are precise:

- `Pro Lite` → `Premium URLs`. No forms, no widgets, no analytics, no custom domain.
- `Pro Standard` → adds `Custom Domain URLs`, `Forms`, `Widgets`, `Embeds`, `Analytics`, `Meta Tags`, `Local Fonts`.
- `Pro Plus` → upgrades `Forms` to `Advanced Forms` and adds `Advanced Settings`, `Download Sites`, `Redirects`, `Password Protection`, `Variables`, `Site Files`, `Framing`, `Update Frequency`, `Canonical URL`.

**`Forms` (Standard) vs `Advanced Forms` (Plus) is the one feature name that changes rather than appears**, and the difference is documented elsewhere: `Custom Form` requires "Pro Plus or higher", the other three form types require "Pro Standard or higher". **So `Advanced Forms` means "custom forms". It is never defined on the pricing page.** A user comparing `Pro Standard` and `Pro Plus` cannot tell what they are buying.

**Plan-gate disclosure in the documentation is exemplary** `[observed]`. Every gated docs page carries a single line immediately below the H1, before any body copy:

> `Requires Pro Standard or higher` (Forms troubleshooting)
> `Requires Pro Plus or higher` (Custom forms)

**The gate is stated above the fold, in a fixed position, linked to the plan definition.** A user reading about custom forms learns in the first line that they cannot have them. Compare Typeform, which scatters `Enterprise only` into comparison-table cells, and Framer, which has no equivalent in-docs gate marker at all. **This is the best plan-gating pattern in the batch.**

**Payment methods disclosed twice** `[observed]`: "**Try it free for 7 days**. PayPal and all major credit and debit cards accepted." (home) and "Choose your plan, then instantly upgrade using PayPal or any major credit or debit card." (`/pro`).

**Billing model stated as a choice** `[observed]`: "**Automatically renew yearly or simply pay as you go** – whichever works for you."

**This is the only auto-renewal opt-out stated on any pricing page in this batch.** Framer, Typeform, Tally and Ghost all assume recurring billing; Carrd offers non-renewal as a peer option in the same clause, with `– whichever works for you` as the closer. For a subscription product, publishing "you don't have to auto-renew" on the pricing page is unusual and user-favourable.

**Related: `Saving Payment Methods`** — "Save payment methods for auto-renewals + more". Saving a card is documented as a separate, optional account action tied to auto-renewal, not as a checkout requirement.

**Trial disclosure** `[observed]`: "free for a full **7 days** – **no payment or credit card required**." No card, no auto-conversion. See T4.

**Cancellation, refund, proration, downgrade: absent from the pricing page.** `[absent]` `Deleting Your Account` — "Permanently delete an account and its data" — is the only termination-adjacent article, and it is account deletion rather than subscription cancellation. **All five products in this batch omit cancellation copy from the pricing page**; Carrd is the only one that also offers a non-renewing billing option, which partly mitigates it.

**Content Policy exists as a documentation article** `[observed]`: `Content Policy` — "What content is (and isn't) allowed on Carrd". **The `(and isn't)` parenthetical** is the same construction as `Changelog` / "Learn what's new (and changed)" — a bracketed negative clause that signals the page covers the unwelcome half too. Two instances of the same device on the same site; it looks like a house habit.

**Legal documentation is in the docs, not only in the footer** `[observed]`: `Terms of Use` — "Our complete terms of use" · `Privacy Policy` — "Our complete privacy policy" · `Content Policy`. Both terms and privacy are also footer links (`Terms`, `Privacy`) pointing at `/terms` and `/privacy`, while the docs list them at `/docs/general/terms` and `/docs/general/privacy`. **Two URL paths for each legal document.** Whether these are duplicates or redirects was not verified. Recorded as a suspected defect.

**What is absent, and notably so** `[absent]`: no GDPR page, no CCPA notice, no cookie banner, no cookie policy, no data-processing addendum, no sub-processor list, no security page, no trust centre, no SOC/ISO reference, no accessibility statement, no uptime commitment, no SLA, no abuse-reporting route.

**Carrd is the only product in this batch with no cookie consent mechanism observed** and the only one with no GDPR-related copy of any kind. For a US company (`Carrd Inc.`) serving a global audience and hosting user sites that collect form submissions, the absence of a published data-processing position is the most significant gap in this file. Its absence is recorded, not interpreted — a policy may exist inside `/privacy`, which was not fetched.

**Partner-programme disclosures** `[observed]`: `Referral Program` — "Refer users and earn **30%** on their Pro purchases" · `Maker Program` — "Sell your custom templates directly through Carrd" · `Requesting a Balance Payout` — "Request a payout for partner program earnings". The referral rate (30%) is in the one-line gloss, not hidden in the article.

**Third-party certificate authority named** `[observed]`: "full SSL support (via **Let's Encrypt**)". The CA is named on the marketing page, twice.

## T11 Help-centre architecture

**There is no help centre, no search, no FAQ, no article feedback, no related-articles module, and no contact widget.** `[absent]` There is `Documentation`, and a `Contact` link.

**Two levels: six categories → articles. No sub-sections except in `Forms`,** where the seven custom-form destinations sit under `Custom` in the sidebar.

**The two-label system (index title / sidebar label) is the defining feature** and is applied to all 73+ articles observed. Examples:

| Index title | Sidebar label |
|---|---|
| `Using a Custom Domain` | `Domains` |
| `Setting up SSL` | `SSL` |
| `Changing a Title or Description` | `Title and Description` |
| `Adding a Site Icon` | `Site Icon` |
| `Working With Custom Templates` | `Custom Templates` |
| `Protecting Forms from Spam and Bots` | `Spam Protection` |
| `Organizing Elements into Columns` | `Columns` |
| `Optimizing Elements for Mobile` | `Mobile Optimization` |
| `Enabling Two-Factor Authentication` | `Two-Factor Authentication` |
| `Requesting a Balance Payout` | `Payouts` |
| `Understanding Site Slots` | `Site Slots` |

**Index titles are gerund task phrases; sidebar labels are bare nouns.** The transformation is consistent enough to be a rule: strip the verb, strip the article, keep the object. **This is a genuinely reusable documentation pattern and almost nobody does it** — most products pick one register and live with the consequences.

**Article-title grammar — three shapes, cleanly segregated by category:**

| Shape | Where used | Examples |
|---|---|---|
| `<Gerund> <object>` | Sites, Building, Account, Forms — i.e. all task docs | `Using a Custom Domain` · `Adding Meta Tags` · `Generating a QR Code` · `Embedding Custom Code` · `Deleting Your Account` |
| `Understanding <concept>` | One instance only | `Understanding Site Slots` |
| Bare noun | General, plus reference articles | `Overview` · `Basics` · `Keyboard Shortcuts` · `URL Types` · `Content Policy` · `Changelog` · `Troubleshooting` |

**The gerund shape accounts for roughly 60 of the ~73 article titles.** It is the most rigidly consistent title grammar in this batch — Framer mixes five shapes, Typeform six, Tally four. Carrd essentially has one.

**`Understanding Site Slots` is the single exception**, and it marks the one article that teaches a concept rather than a task — exactly the same convention Framer uses (`Understanding contrast ratio`, `Understanding HTML Tags`), applied once. Two independent products reserving `Understanding <X>` for conceptual articles is a convention worth treating as established.

**One-line glosses accompany every article in every index, and they are genuinely informative rather than restatements.** Compare:

- `Using Scroll Points` → "Link to specific points of a site" (defines the concept in different words — good)
- `Setting a Timezone` → "Specify the timezone of a site's content" (near-restatement — weak)
- `Customizing Site Files` → "Customize the contents of supporting site files." (restatement, and **the only gloss in the entire docs set that ends with a full stop**)
- `Changing Update Frequency` → "Manually adjust the update frequency of a site." (also full-stopped)

**Punctuation defect:** glosses are almost universally unpunctuated fragments, but at least two in the `Sites` index carry terminal full stops (`Customizing Site Files`, `Changing Update Frequency`, and `Adding Password Protection` → "Restrict access to a site using a password."). Three of 28 in one category.

**Routing furniture** `[observed]`: the docs index welcome paragraph ends "…but if you can't find what you're looking for here please **get in touch**." That is the entire escalation path — one inline lowercase link, once, on the index page only. **Individual articles offer no contact route, no feedback control, and no "was this helpful".**

**No search.** For 73+ articles across six categories this is defensible; the two-label sidebar does the work search would. But a user who does not know Carrd's vocabulary (`site slot`, `scroll point`, `element style`) has no way to find the article.

## T12 FAQs

`[absent]` — **Carrd has no FAQ anywhere.** No FAQ page, no FAQ block on the home page, no FAQ on `/pro`, no FAQ in documentation, no accordion of common questions.

**This is the clearest structural expression of the concision thesis in the file.** Every other product in this batch carries at least one FAQ surface; Typeform and Tally carry three each. Carrd's position appears to be that a question common enough to FAQ is a question that should be answered in the one-line gloss, or in the troubleshooting article, or not asked because the feature is simple.

**Two FAQ-shaped strings exist and neither is in an FAQ:**

- `What is Carrd?` — a CTA/scroll anchor on the home page, pointing at the `#about` section
- `Sound good?` — a section header before the final CTA

**`What is Carrd?` as a *navigation control* rather than an FAQ entry** is the substitution: the question a first-time visitor has is answered by scrolling, not by opening an accordion.

**Assessment of the gap.** For the marketing site, no FAQ is a defensible and even elegant choice — the product is simple enough that the three-adjective pillar block covers it. For `/pro`, with **fifteen plans, three families, an undefined `Advanced Forms` label, no cancellation policy and no refund policy**, the absence of an FAQ is a real cost. The questions a user will have at that page (what happens at renewal, can I downgrade, what counts as a site, what is the difference between Lite and Standard beyond URLs) are not answered anywhere public.

## T13 Terminology & glossary

**No glossary page.** `[absent]` But Carrd's vocabulary is unusually small and unusually consistent, so one is less needed than for Typeform.

| Term | Carrd's usage | The alternative it rejected |
|---|---|---|
| `site` | The unit of product, the unit of pricing, and the top-level object. Used ~40 times across docs | "page", "project", "website" |
| `one-page site` | The product category, hyphenated, used in the tagline and the section header | "landing page", "single-page site", "link in bio" |
| `element` | The unit of composition inside a site | "block" (Tally), "component", "layer" |
| `Background element` / `Page element` | Two named special elements with their own articles | |
| `Element Styles` | "Link multiple elements to a single shared style" | "classes", "design tokens" |
| `section` | A page-like division within the single page | "block", "fold" |
| `Section View` | "Quickly navigate a site's sections" | "outline", "layers" |
| `Scroll Points` | "Link to specific points of a site" | "anchors", "jump links" |
| `Starting Point` | A template or blank page; used as the primary CTA | "template" (used interchangeably elsewhere) |
| `site slot` | The capacity unit against the plan limit; has its own article | "seat", "license", "site count" |
| `Site Files` | "Customize the contents of supporting site files" | "robots.txt / humans.txt", "static files" |
| `Site Icon` | Favicon; **glossed as `("favicon")` in the article description** | "favicon" |
| `Share Image` | The OG/social preview image | "OG image", "social card" |
| `Framing` | A Pro Plus feature, undefined on any page inspected | "iframe embedding"? |
| `Variables` | "Insert dynamic content into supported elements" | "merge tags", "tokens" |
| `Widgets` | Third-party embeds | |
| `Embeds` | Distinct from Widgets in the plan lists, undistinguished in the docs | |
| `Advanced Forms` | Pricing-page name for custom forms; never defined there | |
| `Custom Form` | Documentation name for the same thing | |
| `Contact Form` / `Signup Form` / `Payment-Enabled Form` | The three outcome-named form types | |
| `Premium URLs` | A Pro Lite feature; a `*.carrd.co` subdomain, presumably | |
| `Custom Domain URLs` | A Pro Standard feature | |
| `Maker Program` | Template-selling partner scheme | "marketplace", "creator program" |
| `Pro Lite` / `Pro Standard` / `Pro Plus` | Three plan families, all prefixed `Pro` | |

**`site` is the load-bearing noun and it never wavers.** A site is what you build, what you publish, what you archive, what you delete, what you clone, what you transfer, what you download, what you count against your plan, and what you pay for. **Compare Framer, which uses `site`, `project` and `file` for what appears to be the same object across three surfaces.** Carrd's discipline here is total and it is the main reason a six-category, no-search documentation site is navigable.

**`element` vs Tally's `block`.** Both products have one universal composition noun. Tally's `block` is genericised almost to meaninglessness (input block, text block, logic block, Title block, Label block); Carrd's `element` is used with the same breadth but the docs then name only two specific ones (`Background element`, `Page element`) rather than a dozen. The rest are referred to generically. **Carrd has a smaller vocabulary because it has a smaller product, and the documentation does not invent names it does not need.**

**`Starting Point` is a coined term used exactly twice** — as the primary CTA (`Choose a Starting Point`) and in the `Simple` pillar copy ("Start with one of dozens of templates (or a blank page)"). The second instance does *not* use the coined term, so **the CTA introduces a noun the rest of the page does not use.** `Starting Point` is a better name than `template` (it covers the blank page too) and Carrd does not commit to it.

**Two undefined terms appear only in plan feature lists** `[absent]`: `Framing` (Pro Plus) and the `Widgets` / `Embeds` distinction. Both appear as bare labels in a bulleted list, with no gloss, no link and no documentation article that obviously corresponds. A user comparing plans encounters capability names they cannot resolve.

**`Site Icon ("favicon")` is the one in-line gloss in the vocabulary.** Carrd picks the plainer name and then gives the technical one in parentheses, once, in the article description. Exactly the right treatment for a term where the jargon is more widely known than the plain word.

**Register:** there is effectively no marketing/documentation register split. The marketing page says `one-page sites`, `templates`, `forms`, `custom domains`; the docs say the same. The only marketing-only vocabulary is `Go Pro!`, `Test drive`, and `yup`.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user. First-person plural for the company, used sparingly and only where the company is genuinely the actor: "We've tried to provide answers and instructions", "Our complete terms of use", "please get in touch". **Carrd's `we` appears roughly four times across every page inspected** — a far lighter company presence than Wise, Framer or Tally.

**Register.** Terse, dry, occasionally wry. Sentences are short. Documentation glosses are fragments. The tone shifts register exactly twice: up into casual warmth in the marketing copy (`yup`, `Sound good?`, `(yup, per year)`, `Go Pro!`), and down into precision in the troubleshooting articles (`right down to their casing and spacing`, `respond with 200 to indicate success`).

**The tone modulates by *function*, not by stakes or audience.** Wise flattens as risk rises; Typeform splits by buyer seniority; Tally has one voice everywhere; **Carrd has a marketing voice and a support voice and nothing in between.** With six menu items and no blog, there is no middle ground to occupy.

**The parenthetical-negative is a house device**, used at least three times:
- `Changelog` — "Learn what's new **(and changed)**"
- `Content Policy` — "What content is **(and isn't)** allowed on Carrd"
- `Simple` — "Start with one of dozens of templates **(or a blank page)**"

Each bracket adds the case the reader might not expect: things get removed, some content is forbidden, you can start empty. **A three-word parenthesis that covers the negative case is the cheapest honesty device in this corpus** and Carrd uses it as a habit.

**Intensifiers and hedges are both rationed and both deliberate:** `pretty much anything` (hedge, ×2) · `totally free` (intensifier) · `for a full 7 days` (intensifier) · `right out of the box` · `simply pay as you go` · `We've tried to` (hedge) · `Brief overview` (hedge) · `might be landing in your spam/junk folder` (hedge, italicised).

**Exclamation marks: four observed.** `Go Pro!` (×2, nav and H1) · "for free!" (Free pillar) · "Welcome to the official Carrd documentation!" (docs index). No `Oops!`, no `Great news!`, no emoji anywhere on any page.

**Numbers as trust devices: essentially none.** `[absent]` No user count, no site count, no uptime figure, no funding, no year founded, no "trusted by N". **Carrd is the only product in this batch that publishes no scale metric of any kind.** The only numbers on the marketing site are prices, the three-site free limit, the seven-day trial, and the 30% referral rate — every one of them a fact about what the user gets, not a claim about Carrd's size.

For a benchmark corpus this is worth stating plainly: **a product can market itself entirely without social proof.** Whether that is a strength or a consequence of being a small independent company is not determinable from the site.

**Accessibility content** `[observed]` / `[absent]`

- **No accessibility statement, no VPAT, no WCAG reference, no accessibility documentation category, and no accessibility article.** `[absent]` The word does not appear on any page inspected. For a site builder — a product whose output is consumed by the public — this is the same gap Typeform has and the direct opposite of Framer (12-article category) and Tally (a full published position with named defects).
- **No accessibility guidance for the sites users build.** Framer teaches alt tags, ARIA labels, semantic tags, tab order and contrast; Tally teaches labels, helper text and colour independence. Carrd's `Building` category has 22 articles and none of them mentions alt text, headings, contrast, or keyboard navigation. **A user can build and publish a Carrd site with no prompt of any kind toward accessibility.**
- **Alt text on the marketing page is present and adequate for the five demo thumbnails**: `"John Smith" demo site preview`, `"Cayce Pollard" demo site preview`, `"Jane Anderson" demo site preview`, `"Random App" demo site preview`, `"Showcase" demo site preview`. Descriptive of function (it is a preview of a demo site) rather than of content. Acceptable.
- **The four `/pro` feature images carry empty alt** (`![](…/domains.png)`, `![](…/forms.png)`, `![](…/widgets.png)`, `![](…/sites.png)`), which is correct — each sits directly above a heading and paragraph that convey the same information.
- **`meta-viewport: width=device-width,initial-scale=1.0,user-scalable=no`** on every page. **`user-scalable=no` disables pinch-zoom**, which is a documented WCAG 1.4.4 (Resize Text) failure and a well-known mobile accessibility defect. It is present on the home page, the pricing page and every documentation page. **This is the most concrete accessibility defect found in this entire batch** — not an omission, an active suppression of a user's assistive behaviour, shipped site-wide by a company that markets `fully responsive` as one of three value pillars. Modern browsers increasingly ignore `user-scalable=no`, which mitigates the impact but not the intent.
- **`meta-color-scheme: light only`** on every page — dark-mode preference is explicitly refused site-wide.
- **No `Skip to content` link found in the fetched markup.** `[absent]`
- The menu is a `#menu` fragment link with a `Close` counterpart, suggesting a CSS-only disclosure pattern. Whether it is keyboard-operable and correctly labelled could not be determined from server HTML.

**Negative findings, recorded honestly**

- **`user-scalable=no` on every page** — pinch-zoom disabled site-wide; a WCAG 1.4.4 failure
- **`color-scheme: light only`** — dark mode refused site-wide
- **No accessibility statement, no accessibility documentation, no a11y guidance for user-built sites**
- **No GDPR, CCPA, cookie policy, cookie banner, or data-processing copy of any kind**
- **No status page, no uptime figure, no incident history** — the only product in this batch with none
- **No FAQ anywhere**
- **No cancellation, refund, downgrade or proration copy**
- **No complete field-type list** for forms; three types named in a parenthesis, four more discoverable only in troubleshooting
- **`Advanced Forms` (pricing) vs `Custom Form` (docs)** — two names for the paid form capability, neither cross-referenced
- **`Framing`, `Widgets` vs `Embeds`, `Premium URLs`** — plan-list capability labels with no gloss and no obvious documentation article
- **The home page names six signup-form integrations; `/pro` names twenty** — stale subset
- **`carrd.co` redirects to `carrd.com`, but user sites are published at `*.carrd.co`**, and a fourth domain (`mail.carrd.site`) appears only in a troubleshooting bullet. Four domains, none explained
- **Terms and Privacy exist at two URL paths each** (`/terms` and `/docs/general/terms`) — suspected duplication, unverified
- **Terminal full stops on three of 28 `Sites` glosses**, none elsewhere
- **`Starting Point`** coined in the primary CTA and not used again
- **`Select Plan` × 15**, identical, with no plan name inlined
- **No error strings quoted** in any troubleshooting article
- No search in documentation
- No article feedback, no related articles, no per-article contact route

---

## Transferable patterns

1. **Name the destination, not the commitment, in the primary CTA.** `Choose a Starting Point` describes the literal next screen (a template gallery) and implies no account, no payment and no lock-in. Compare `Get started for free`, which is vaguer and still means "create an account". Condition: only works when the next screen genuinely is a low-stakes choice — naming a destination that turns out to be a signup wall is worse than a generic label.
2. **Label the upsell section `Optional:`.** `Optional: Go Pro!` as a section heading tells the reader they may skip it. Costs one word, buys a great deal of goodwill, and is available to any product whose free tier is genuinely usable.
3. **Spend the word budget on failure, not on features.** Carrd's marketing page gives one sentence per value pillar; its forms troubleshooting article gives nine first-person symptoms, a named sending domain, a 24-hour wait threshold, a merge-tag default value and an explicit warning about casing and spacing. **Concision is a budget to allocate, not a virtue to apply uniformly.** The place to be verbose is the place where the user is already stuck.
4. **First-person symptom titles work for system failures, not only user errors.** `I'm receiving an error when submitting my "Send to Airtable" custom form` · `New signups aren't appearing in my Mailchimp audience`. The Wise exemplar cautions that confession titles only suit genuine user error; Carrd shows the grammar is about *matching the sentence the user would type*, and applies cleanly to failures that are nobody's fault.
5. **Two labels per article: a task title for the index, a bare noun for the sidebar.** `Protecting Forms from Spam and Bots` / `Spam Protection`. `Working With Custom Templates` / `Custom Templates`. Strip the verb and the article; keep the object. The index supports finding, the sidebar supports orienting, and neither has to compromise.
6. **Put the plan gate in the first line of the gated article, in a fixed position.** `Requires Pro Plus or higher`, immediately below the H1, linked to the plan definition, before any body copy. Better than comparison-table cells and far better than discovering the gate in the product.
7. **Put the irreversibility word in the one-line summary.** `Permanently delete a site from your account` vs `Move a site to or from your account's archive` — the reversible action states both directions in one clause, the irreversible one leads with `Permanently`. The user chooses correctly from the index without opening either article.
8. **Bracket the negative case.** "Learn what's new (and changed)" · "What content is (and isn't) allowed" · "one of dozens of templates (or a blank page)". A three-word parenthesis that names the case the reader would not have assumed. Cheapest honesty device available.
9. **Offer non-renewal as a peer option on the pricing page.** "Automatically renew yearly or simply pay as you go – whichever works for you." The only product in this batch to do so. For any subscription where a one-off purchase is technically possible, saying so on the pricing page converts a suspicion into a choice.
10. **Anticipate the misreading of your own number.** "\$19 / year (yup, per *year*)". When a figure is far outside category expectations, the parenthetical costs nothing and prevents the reader dismissing the page as a typo.

## Caveats & gaps

- **Ten pages inspected, and most were index pages.** Only three leaf articles were opened (`Custom Form`, `Forms → Troubleshooting`, plus the Pro page). The other ~70 articles are represented by their titles and one-line glosses only. Everything in T5, T6 and T13 that derives from a category index is title-and-gloss evidence, not body evidence.
- **The three other `Troubleshooting` articles** (`Sites`, `Building`, `Account`) were not opened. Given that the Forms one turned out to be the densest page on the site, these are the most likely location of further error and recovery copy, and the T7 findings should be treated as a sample rather than a survey.
- **`Changelog` was not fetched**, so the deprecation and change-communication register is unobserved.
- **`Terms`, `Privacy` and `Content Policy` were not fetched.** The finding that Carrd publishes no GDPR or cookie copy is based on the absence of any such link or banner across ten pages; **a data-processing position may exist inside `/privacy`** and this file should not be cited as evidence that it does not.
- **No status page, no FAQ, no glossary, no search, no accessibility statement** — each recorded as `[absent]` after looking, not assumed.
- **No in-product strings observed at all.** There are no product screenshots on the marketing site and none in the served markup of the documentation pages fetched. Every UI string in this file is `[documented]` — quoted inside a documentation sentence — and no error message, empty state, validation message, toast or button label from inside the builder was seen. **T8 is genuinely empty rather than thin.**
- **The field-type finding in T5 is a negative one and should be reported as such:** Carrd names three field types in a parenthesis and four more incidentally in troubleshooting. It is possible a complete field list exists in an unfetched leaf article (`Setting up a Contact Form`, `Setting up a Signup Form`). **The claim here is that no complete list is reachable from the Forms category index**, which is what was verified.
- **The `Cayce Pollard` observation is an inference about intent** and is flagged as such in the text. The name is observed; the Gibson reference is not stated anywhere by Carrd.
- **The pricing-page plan grid is large and the feature lists are long.** Prices and site counts are transcribed verbatim; the feature-list contents are transcribed for the three base variants only, on the assumption that the numbered variants differ only in site count. **That assumption is based on the visible pattern and was not independently verified for all fifteen plans.**
- **`user-scalable=no` is read from the served `<meta>` tag.** Its practical effect varies by browser (iOS Safari has ignored it since iOS 10). The defect is in the markup; the user impact is mitigated and not zero.

## Sources

1. https://carrd.co/ (redirects to https://carrd.com)
2. https://carrd.com/pro
3. https://carrd.com/docs
4. https://carrd.com/docs/general
5. https://carrd.com/docs/sites
6. https://carrd.com/docs/building
7. https://carrd.com/docs/forms
8. https://carrd.com/docs/forms/setting-up-a-custom-form
9. https://carrd.com/docs/forms/troubleshooting
10. https://carrd.com/docs/account
