# 183. Mailchimp

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Email marketing and automation (SMB marketing platform; Intuit-owned) |
| Primary URL | https://mailchimp.com/ |
| Corpus rank | 183 |
| Benchmark strength (source list) | Distinctive voice and sending guidance |
| Locale / market observed | en-US (site offers ES, FR, PT-BR, DE, IT) |
| Platform observed | Web (desktop), published content style guide, help centre, status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | CAN-SPAM, CASL (Canada), GDPR (dedicated `/gdpr/` hub and footer badge), SMS carrier/age-gating rules by country; no financial regulator |
| Harvest date | 2026-09-21 |
| Pages inspected | 18 |
| Harvest completeness | Full for the published style guide (all major sections retrieved); partial for live product — in-app strings, empty states, and error dialogs are behind auth and are reconstructed from help-article titles only |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Style guide — home | https://styleguide.mailchimp.com/ | Section index, licence statement, audience split |
| Style guide — Writing Goals and Principles | https://styleguide.mailchimp.com/writing-principles/ | Five goals, four quality criteria |
| Style guide — Voice and Tone | https://styleguide.mailchimp.com/voice-and-tone/ | Four voice attributes, tone model, Freddie rule |
| Style guide — Writing about Mailchimp | https://styleguide.mailchimp.com/writing-about-mailchimp/ | Brand-name mechanics, chimp-imagery ban |
| Style guide — Grammar and Mechanics | https://styleguide.mailchimp.com/grammar-and-mechanics/ | Longest section; punctuation, numbers, capitalisation |
| Style guide — Web Elements | https://styleguide.mailchimp.com/web-elements/ | Buttons, forms, links, nav, headings, SEO |
| Style guide — Writing Legal Content | https://styleguide.mailchimp.com/writing-legal-content/ | Plain-language legal rewrite example |
| Style guide — Writing for Accessibility | https://styleguide.mailchimp.com/writing-for-accessibility/ | Nine guidelines, five self-check questions |
| Style guide — Word List | https://styleguide.mailchimp.com/word-list/ | Three lists: spellings, use-carefully, avoid |
| Style guide — TL;DR | https://styleguide.mailchimp.com/tldr/ | Condensed restatement of all sections |
| Marketing homepage | https://mailchimp.com/ | Hero, nav, inline pricing widget, disclaimers |
| Pricing — marketing plans | https://mailchimp.com/pricing/marketing/ | Four tiers, contact-tier selector, 11 FAQs, 21 disclaimers |
| Help centre home | https://mailchimp.com/help/ | 18 topics with scope lines |
| Help — Getting Started | https://mailchimp.com/help/getting-started/ | 12 article titles |
| Help — Audiences | https://mailchimp.com/help/audiences/ | ~130 article titles; richest task-phrasing source |
| Help — Email Delivery | https://mailchimp.com/help/delivery/ | ~57 article titles; failure/suspension vocabulary |
| Help article — About Additional Charges | https://mailchimp.com/help/about-additional-charges/ | Overage model, feedback widget |
| Status page | https://status.mailchimp.com/ | Component list, incident lifecycle |

---

## T1 Navigation & IA labels

**Global nav — four items, one of which is a competitive-switch CTA** `[observed]`

`Industries and Solutions` · `Integrations` · `Resources` · `Switch to Mailchimp` · `Pricing`

`Switch to Mailchimp` sitting in primary nav beside `Pricing` is the notable decision: a migration offer is treated as a top-level destination rather than a campaign page. It is reinforced in help IA by three named-competitor articles — `Migrate Your Hubspot Account to Mailchimp`, `Migrate Your Constant Contact Account to Mailchimp`, `Migrate Your Klaviyo Account to Mailchimp`.

**Solutions sub-nav — noun-phrase feature names, sentence case** `[observed]`

`Email marketing` · `SMS marketing` · `AI marketing tools` · `Marketing automations` · `Content creation tools` · `Social media marketing` · `Reporting and analytics` · `Lead generation platform` · `Templates` · `All audience tools` · `See all features and solutions`

Sub-nav is sentence case, which matches the guide's own rule ("Use sentence case for subnavigation"). Sub-nav *group headings* are title case (`Solutions`, `Your Tech Stack`, `For Developers`, `Professional Services`) — also compliant.

**Integrations categories use ampersands** `[observed]`: `Booking & Scheduling` · `Forms & Surveys` · `E-commerce` · `Subscription management` · `Customer service` · `Developer tools`

**Footer — five groupings** `[observed]`: `Products` · `Resources` · `Community` · `Company` · `Help`

`Status` and `GDPR Compliance` are first-class footer links under `Products`. `Accessibility` sits under `Company` but points off-domain to `https://www.intuit.com/accessibility/` — Mailchimp no longer publishes its own accessibility statement.

**Help centre — 18 topics, each with a scope line** `[observed]`

| Topic | Scope line (verbatim) |
|---|---|
| `Accounts` | "Set up your account, learn about billing, and stay up-to-date on compliance policies." |
| `Audiences` | "Import contacts, create signup forms, and manage your Mailchimp audiences." |
| `Automation` | "Automatically send purchase emails, welcome messages, and more." |
| `Data Privacy` | "Find answers to commonly asked questions related to Mailchimp's privacy practices." |
| `Email Delivery` | "Learn how we deliver email and how you can ensure contacts get your campaigns." |
| `Getting Started` | "Learn how to set up your account, import contacts, and create your first campaign." |
| `Merge Tags` | "Personalize your campaigns with contact names, social media buttons, blog posts, and more." |

Also: `Edit and Design` · `Emails` · `Google Remarketing Ads` · `Integrations` · `Landing Pages` · `Mailchimp & Co` · `Mobile Apps` · `Reports` · `Templates` · `Transactional Email` · `Websites`.

Pattern: topics are **object-named, not activity-named** (`Audiences`, `Emails`, `Reports`), the inverse of Wise's gerund categories. The scope line carries all the verbs. Eighteen top-level topics is a flat, wide IA with no intermediate grouping — the user must scan the full list.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Email & SMS marketing minus the learning curve`
> Subhead: "Drive revenue with intuitive marketing analytics, automations, and AI tools."

The headline names the category then negates the objection (`minus the learning curve`) rather than asserting a benefit. The second half is set in italics in the DOM, so the negation is visually a separate clause.

**Section headers are declarative claims, not questions** `[observed]`

`Recommended for your business` · `Make Mailchimp work for you` · `Businesses like yours are thriving with Mailchimp` · `One marketing platform to unite 300+ apps` · `Millions of users trust us with their email marketing. You can too.` · `Work with a trusted industry leader` · `Get started easily with a personalized product tour`

`Millions of users trust us with their email marketing. You can too.` is the only two-sentence header; the second sentence is a direct address doing CTA work inside a heading.

**Pricing page headline** `[observed]`: `Marketing plans that grow with you` (og:title), with page H1 rendering as the tier comparison. Supporting headers: `Under 250 contacts? It's free.` · `Rates for nonprofits and charities` · `Prefer to pay as you go?` · `Basic plans for smaller businesses` · `Not sure how to choose?`

Three of five pricing section headers are **questions addressed to the user's state** rather than descriptions of the offer. `Under 250 contacts? It's free.` compresses eligibility test and answer into six words — the strongest single line on the page.

**Help centre hero** `[observed]`: `Know More, Do More with Mailchimp` — title case, parallel imperatives. This violates the guide's own heading rule (see T14).

**Claim substantiation is footnoted, not inline** `[observed]`: the homepage and pricing page carry **21 numbered disclaimers** under a `*Disclaimers` heading, each keyed to a marketing claim (`#1 email marketing and automation platform`, `27X ROI Standard Plan`, `8x orders`, `9x revenue`, `16x SMS ROI`, `58% Higher Click Rate`, `Up to 141% more revenue`, `2x More Revenue with Predictive Segments`). Each disclaimer names a measurement window. This is the opposite of Wise's inline claim-bounding: the qualifier is exiled to the page foot.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start Free Trial` | Global nav (×2 in DOM), hero, footer of homepage | Primary acquisition |
| `Start Today — no credit card required.` | Site-wide promo bar | Full sentence with terminal full stop, used as link text |
| `Log In` | Global nav | Title case |
| `Log in` | Help centre "Contact our Support team" block; help article sidebars | **Sentence case — same action, two labels, two surfaces** |
| `Sign Up` | Pricing table, Free plan | |
| `Sign up free` | Help centre contact block | Third variant of the same action |
| `Buy Now` | Pricing table, Premium and paid tiers | |
| `Try for free` / `Try free for 14 days` | Pricing table, Standard and Essentials | Two labels stacked in one DOM node |
| `Find my plan` | Pricing quiz entry | First person — unusual and good |
| `Customize my experience` | Homepage personalisation modal | First person, matches `Find my plan` |
| `No thank you` | Homepage personalisation modal, decline | Polite decline rather than `Skip` or `×` |
| `See all plans` | Homepage pricing widget | |
| `Compare all features` | Pricing comparison table | |
| `Request a demo` / `Request Demo` / `Get a demo: +1 (800) 315-5939` | Pricing, homepage, nav | Three forms of one action; one embeds a phone number |
| `Contact sales` / `Talk to Sales` / `Contact Sales` | Pricing, footer | |
| `Learn more` | Pricing, free-plan overage note | |
| `Learn More` | Pricing, tier disclaimers (×4) | **Both casings on the same page** |
| `Learn more about onboarding` | Pricing, onboarding block | The one fully specific variant |
| `Get started` | Nonprofit discount block | |
| `See how it works` | Pricing FAQ, pay-as-you-go answer | |
| `Browse the directory` | Help centre, experts block | |
| `Hire A Partner` | Help-article sidebar promo | **Capitalises the article "A"** |
| `Hire an Expert` | Footer, nav | Same action, lowercase article |
| `Contact us` | Help centre, "Still have questions?" | Placed last |
| `Copy Article URL` | Help article toolbar | Object-specific, with tooltip "Copy URL to clipboard." |
| `Submit Feedback` | Help article feedback widget | |
| `Subscribe to Updates` | Status page | |
| `Skip to main content` | Top of DOM | Accessibility |

**Observation.** The same three actions (log in, sign up, request a demo) each carry **three distinct labels** across the site. The most disciplined CTAs are the two first-person ones (`Find my plan`, `Customize my experience`), which are also the two that appear exactly once each.

## T4 Onboarding & getting-started

**Pre-signup personalisation quiz** `[observed]` — a modal titled `Make Mailchimp work for you`, opening "Got a second to answer a couple questions? We can personalize your visit with the info that matters most to you and your business." (Note the missing "of" in "a couple questions".)

Two questions, both verbatim:

1. `What's your industry?` → `Professional services` · `Retail & e‑commerce` · `Community org or non‑profit` · `Content or digital products` · `Hospitality, dining, events, etc.` · `Other`
2. `What are the top 4 things you want to achieve? Select up to 4`

Goal options are all **verb-first user outcomes**, not feature names: `Get more sales` · `Save time with automation` · `Attract more customers` · `Optimize your marketing` · `Send SMS campaigns` · `Manage customer relationships` · `Design better emails` · `Connect your store and other apps` · `Get 24/7 support` · `Switch from another tool`

`Switch from another tool` as a stated *goal* rather than a migration feature is the notable one — it lets a competitor's user self-identify before signup.

**Pricing quiz** `[observed]`: `Not sure how to choose?` → "We've got your back. Answer a few quick questions and we can make a personalized recommendation for you." → `Find my plan` → results state headed `Here are your results`, with the legend "Indicates features that you selected in the quiz that are important to you."

**Help centre getting-started sequence** `[observed]`, all Title Case: `Getting Started with Mailchimp` · `How to Create an Account` · `Import Contacts to Mailchimp` · `Getting Started with Campaigns` · `Troubleshooting Your First Email` · `Best Practices for Switching to Mailchimp`

The Getting Started category **includes troubleshooting and migration** (four of its twelve articles are migration or first-failure articles). Onboarding IA anticipates the switch and the first failure rather than assuming a clean start.

**Paid onboarding is a named product** `[observed]`: `Personalized onboarding` (nav), `Dedicated Onboarding Specialist`, `4 Sessions` / `1 Session` / `Not included` as plan entitlements, and the framing line "An onboarding specialist is here to help you get started with confidence—it's included with Standard and Premium plans.*"

## T5 Form & field labels

**Pricing configurator — the primary pre-auth form** `[observed]`

| Label | Notes |
|---|---|
| `Contacts` | The billable unit, exposed as a dropdown of 20 bands from `0-500` to `1,000,000+` |
| Currency selector | 16 currencies, symbol + ISO code (`$ USD`, `€ EUR`, `¥ JPY`, `R ZAR`) |
| `Customize plans & offers` | Section title for the configurator |

The contact bands are unevenly spaced (`0-500`, `501-1,500`, `1,501-2,500`, then `2,501-5,000` … `250,001-500,000`, `500,001-1,000,000`, `1,000,000+`), which makes the pricing granularity itself a piece of content — the user learns where Mailchimp expects its customers to cluster.

**Help article feedback form** `[observed]` — a two-branch structured survey, the best-designed form on the public site.

Positive branch: `Awesome! Can you tell us more about your experience today?` with six selectable statements written in the user's first person:
`It was easy to find what I was looking for.` · `I could easily scan a help article to find the information I needed.` · `The help articles are easy to read.` · `The help articles helped me resolve my issue.` · `Mailchimp is easy to use.` · `I just love Mailchimp!` · `Other.`

Negative branch: `Sorry we couldn't be more help. Can you tell us about your experience today?`
`The help articles don't make sense.` · `I wish there was a video that showed me how to do this.` · `What I'm trying to do in Mailchimp doesn't work the way I think it should.` · `It was hard to find what I was looking for.` · `I never found what I was looking for at all.` · `I have to contact Support to resolve my issue (for example, an account or billing problem).` · `Other.`

Free-text prompt: `Anything else we can do to improve our site?`

Two things worth stealing. The negative options **separate "hard to find" from "never found at all"** — a distinction most feedback widgets collapse. And `What I'm trying to do in Mailchimp doesn't work the way I think it should.` gives the user a slot to report a *product* problem inside a *documentation* survey, which is where that complaint actually originates.

**Style-guide form rules** `[documented]`: "Use title case for form titles and sentence case for form fields." · "Only request information that we need and intend to use. Don't ask for information that could be considered private or personal, including gender. If you need to ask for gender, provide a field the user can fill in on their own, not a drop-down menu."

## T6 Status & state language

All in-product states are `[documented]` from help-article titles and bodies; none observed live.

**Contact lifecycle states** — five named statuses, each with its own explanatory article:
`Subscribed` · `Unsubscribed` · `Non-Subscribed` · `Cleaned` · `Archived`

Supporting articles: `About Cleaned Contacts` · `About Non-Subscribed Contacts` · `About Unsubscribes` · `Archive or Unarchive Your Contacts` · `Archive Inactive Contacts` · `Resubscribe a Contact` · `Reconfirm Contacts` · `View Unsubscribed Contacts`

`Cleaned` is a Mailchimp coinage for an address the system removed after hard bounces or repeated soft bounces — the euphemism does real work (it attributes the removal to hygiene, not to failure) but is opaque on first encounter, which is why it needs a dedicated article. `Non-Subscribed` (a contact who transacted but never opted in) is a genuinely useful fourth state most ESPs lack.

**Billing states** `[observed]` on the pricing page and the overage article:
`contact tier` · `peak contact total` · `add-on contact block` · `overages` · `Contact limit exceeded` · `You've selected more contacts than this plan allows` · `Limit of 250 contacts` · `Sending will be paused if contact or email send limit is exceeded.`

The overage article defines the billable measure explicitly: "We calculate your monthly bill based on your feature plan and pricing tier, as well as the peak contact total during your billing period." — i.e. the billed quantity is the **high-water mark**, not the end-of-period count. Stating that plainly, in its own subheading (`About peak contact total`), is good disclosure practice.

**Sending and deliverability states** `[documented]`:
`soft bounce` vs `hard bounce` · `Bounce Suspension` · `Unsubscribe Suspension` · `Suspension` · `Bounce Warnings` · `Unsubscribe Warnings` · `stale` addresses · `spam traps` · `Omnivore` (Mailchimp's abuse-detection system, named as a product) · `Denylists`

Mailchimp operates a **two-stage escalation vocabulary** — a warning state before a suspension state, each documented separately for each cause (`About Bounce Warnings` → `About Bounce Suspension`; `About Unsubscribe Warnings` → `About Unsubscribe Suspension`). Naming the warning tier separately gives the user a recoverable state to act in.

**Campaign states** `[documented]`: schedule / pause / cancel are all documented (`Schedule or Pause a Regular Email`, `Cancel a Campaign`), and there is an explicit terminal-state article — `Why We Can't Stop or Edit Sent Campaigns`. Like Wise's "complete" article, this exists because the system state and the user's hope diverge.

**Status page states** `[observed]`: `All Systems are Online` (banner) and `Good Service` (per component). Components are enumerated per shard — `US1 Admin` through `US21 Admin`, `US1 API` through `US21 API`, plus `Mailchimp Transactional`. Incident states: `Investigating` → `Resolved`. Empty day: `There are no reported events.`

Note `All Systems are Online` uses lowercase "are" in an otherwise title-cased banner, and `Good Service` is a noun phrase where every other status page in this corpus uses an adjective (`Operational`, `Degraded`).

## T7 Error, failure & recovery

The Email Delivery category is the strongest failure-content artefact on the site. `[documented]` unless noted.

**First-person symptom titles** — the Wise pattern, in sentence case:
- `My subscribers aren't receiving my campaigns`
- `My campaigns are going to spam folders`
- `My unsubscribe rate is really high`
- `My subscriber received multiple copies of my campaign`
- `My campaign links trigger "possible fraud" alerts`
- `My Email From Name Shows "mailchimpapp.net" or "mcsv.net"`
- `I know this email address is valid, but it hard bounced`
- `I Received Spam from Mailchimp`
- `Gmail is clipping my email`

`I know this email address is valid, but it hard bounced` is the standout: it opens by **conceding the user's premise** before correcting it. `I Received Spam from Mailchimp` is a help article written for a non-customer complaining about a customer — an unusual and honest audience to serve inside a product help centre.

**Troubleshooting-prefixed titles** (Title Case, gerund):
`Troubleshooting Contact Imports` · `Troubleshooting Test Email Delivery Failures` · `Troubleshooting Advanced Segments` · `Troubleshooting the Embedded Signup Form` · `Troubleshooting Your First Email` · `Troubleshoot the Opt-in Confirmation Email` · `Troubleshoot the Address Field`

Note the split between `Troubleshooting X` (gerund) and `Troubleshoot X` (imperative) inside the same corpus, with no discernible rule.

**Policy-explanation titles that say no** `[documented]`:
`Why We Can't Stop or Edit Sent Campaigns` · `Why We Require an Unsubscribe Link` · `Why We Verify Imported Contacts` · `Limits on Role-Based Addresses` · `Limits on Bulk Actions` · `About Prohibited Content`

Six articles whose entire purpose is to explain a refusal. The `Why We…` construction puts Mailchimp in the first person as the actor doing the refusing, which is more honest than passive "X is not supported."

**Recovery affordance** `[documented]`: `Undo a Contact Import` — a named undo for the single most destructive self-service action.

## T8 Empty states

`[absent]` for in-product empty states — all behind auth.

`[observed]` on the status page: `There are no reported events.` repeated per day. Plain, italicised, no exclamation, no "All clear!" — correct register for an operational surface.

`[observed]` defect on the marketing pages: several DOM nodes render **unpopulated interpolation tokens and concatenated button states**, which is the nearest public equivalent of a broken empty state:

- `Hi, %s` — a raw printf token in the served nav markup on the homepage, pricing page, help home, and every help category page.
- `Send up to 6,000 emails each month. sends for the rest of your free trial.` — a sentence with a missing leading value, leaving a lowercase orphan verb.
- `Then, starts at **0/month†per month†**` — two variant strings collapsed into one node.
- `[Start Free Trial Start Free Trial Buy Now Buy Now Contact limit exceeded Limit]` — four mutually exclusive button labels concatenated into a single anchor's accessible name.

The last one is the most serious: a screen-reader user encounters all four CTA states as one link label. Recorded as a negative finding, not a quibble — it is the same class of defect as Wise's empty-quotes no-results string, and it is present on the highest-traffic commercial page.

## T9 Notifications & system messages

`[observed]` — site-wide promo bar: `Join Mailchimp with a risk-free 14-day trial.` followed by the link `Start Today — no credit card required.` Two sentences, the qualifier carried inside the link text rather than as a footnote.

`[observed]` — in-widget eligibility banners in the pricing table: `Contact limit exceeded` with the explanation `You've selected more contacts than this plan allows`. Title + plain-language cause, no recovery action offered in the banner itself.

`[observed]` — promotional banners: `Try risk-free` · `Save 15% on 10,000+ contacts` · `Best value` · `Recommended` · `Mailchimp Recommends`. The last two are near-duplicates serving the same badge slot.

`[documented]` — notification model is itself documented as a user-facing topic: `Change Subscribe and Unsubscribe Notifications` · `Manage notifications from the HubSpot mobile app` (n/a — HubSpot) · pricing FAQ `Will I get billing reminders before the free trial ends?` answered with a commitment to send reminders with "upcoming billing estimates" before the trial ends.

`[observed]` — status page incident copy, September 17 2026, `Delayed Deliveries via Mandrill`:
- `Investigating`: states scope ("a subset of customers"), names the affected rail, names the acting team ("Our Engineering team"), promises further updates.
- `Resolved`: "The cause of the delayed deliveries has been mitigated. Thanks for your patience while we resolved this matter and please contact Support if you have any additional questions."

Note the incident title uses `Mandrill`, the retired product name for what the same status page's component list calls `Mailchimp Transactional`. The legacy name survives in incident copy.

## T10 Disclosures, legal & compliance

**Disclaimer architecture** `[observed]`: a numbered `*Disclaimers` block (21 items on the pricing page, 5 on the homepage) plus a separate `*Free Trial Terms` block. Each numbered item is **bold-labelled with the claim it qualifies** — `**#1 email marketing and automation platform:**`, `**27X ROI Standard Plan:**`, `**SMS Marketing**:`, `**Personalized onboarding:**` — so a reader can match footnote to claim without a superscript hunt. That labelling convention is the reusable part.

**Measurement windows are always stated** `[observed]`: "based on December 2023 publicly available data on competitors' number of customers" · "from 12/1/24-11/30/25" · "for Jan 1 2022 - Jul 1 2023 period" · "from 8/1/23 to 5/14/24". Dated, not "recent".

**Product-rename disclosure inside a disclaimer** `[observed]`: "Customer Journey Builder (CJB) was rebranded to Marketing Automation Flows (MAF) effective as of June 2025. Any references to 'Automation Flows' refers to the same features previously available under CJB." A terminology migration documented in a legal footnote — unusual, and useful, though the sentence has a subject/verb disagreement ("references … refers").

**Beta and availability bounding** `[observed]`: "Intuit Intelligence (beta) has limited availability to customers on paid plans. Intuit Intelligence can make mistakes; user is responsible for reviewing and approving AI-generated content before sending." · "Certain AI features and functionality available in English only." · "All calls with the Mailchimp support team are currently only available in English." · "**Popup forms (beta):** Very limited availability to new and existing Mailchimp users and on web browsers only."

The AI disclaimer places responsibility on the user in the same sentence as the capability admission. The English-only support disclosure is repeated three times across separate disclaimers (phone support, customer success, onboarding) rather than consolidated.

**A CTA-proximity rule leaked into the public disclaimer list** `[observed]`, item 5 on the homepage:
> `**CTA proximity:**"Terms apply" / "14-day trial terms apply" next to Start Free Trial.`

This is an internal content-governance instruction — the rule about where to place the terms link — published as if it were a disclaimer. A compliance artefact shipped by mistake. Notable because it reveals the internal rule while failing to execute it.

**Style-guide legal doctrine** `[documented]` — three stated goals for legal content: `Accuracy`, `Clarity`, `Succinctness`. The guide's position on plain-language summaries is the interesting one: "We don't summarize our legal content, but instead try to write the terms themselves in plain language. We use a sidebar to provide examples or links to further reading." That is a deliberate rejection of the two-column "legal text / plain summary" pattern, on the grounds that a summary that is not the contract is a second document to maintain.

The guide also ships a before/after rewrite (authority-to-bind clause) and a definitions pattern that converts "The Corporation"/"The User" into "we"/"you", plus an explicit ruling that "Contracting words doesn't affect the validity of an agreement."

**Compliance topics in help** `[documented]`: `Anti-Spam Requirements for Email` · `About Compliance for Email Marketing` · `Stay Compliant with the Canada Anti-Spam Law (CASL)` · `Examples of Compliant and Non-Compliant Lists` · `The Importance of Permission` · `Single Opt-in vs. Double Opt-in` · `About Double Opt-in` · `About Age-Gating Requirements for SMS by Country` · `Import Suppression Lists`

`Examples of Compliant and Non-Compliant Lists` is the best of these as a title: it promises worked examples rather than a rule statement.

**Nonprofit pricing** `[observed]`: "Mailchimp offers a 15% discount to nonprofits and charities. To request the discount, sign up for a free account, and contact our Billing team with your username and a link to your organization's website." — eligibility, process, and required evidence in two sentences.

## T11 Help-centre architecture

Two levels only: 18 topics → flat article list. No sub-sections. The `Audiences` category alone lists roughly 130 articles in a single undifferentiated column, ordered by an opaque popularity signal rather than task sequence. This is the weakest part of Mailchimp's content system and the clearest contrast with Wise's 11 named sub-sections inside one topic.

**Article-title grammar — five shapes, applied inconsistently:**

| Shape | Example | Prevalence |
|---|---|---|
| Imperative, Title Case | `Import Contacts to Mailchimp`, `Create a Mailchimp Audience`, `Delete Contacts` | Dominant |
| `About X`, Title Case | `About Cleaned Contacts`, `About Spam Filters`, `About Geolocation` | ~20 in Audiences alone |
| `Getting Started with X` | `Getting Started with Tags`, `Getting Started with Segments`, `Getting Started with Groups` | Consistent |
| First-person symptom, sentence case | `My campaigns are going to spam folders` | Delivery category only |
| `Why We…` policy | `Why We Require an Unsubscribe Link` | Delivery category only |

The `About X` family is doing conceptual-explainer duty and the imperative family is doing procedural duty — a clean split that Mailchimp never signposts. Surfacing that split as a filter or a sub-heading would cost nothing and would let a user choose between "explain this" and "show me how."

**Routing furniture** `[observed]`, in page order: `Search Help Center` → `Popular guides and tutorials` (6 cards with one-sentence descriptions) → `Quick start video tutorials` (with runtimes, e.g. `▶ 2:50`) → `Contact our Support team` → `Help by topic` → `Get help from an expert` → `Still have questions?` → `Contact us`.

Human contact appears **twice**, once mid-page (`Contact our Support team`, gated: "Customers with paid plans can log in and email or chat with us.") and once at the foot. The gating is stated plainly rather than hidden behind a disabled control — good practice. The article-level sidebar repeats it: "Paid users can log in to access email and chat support."

`Get help from an expert` routes to a paid partner directory, positioned *between* self-service and contact-us — a third tier most help centres don't have.

## T12 FAQs

Placement: accordion near the foot of `/pricing/marketing/`, under the heading `FAQs`. **Answers were retrievable here** (unlike Wise), so both are recorded: questions verbatim, answers summarised.

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | How long is the free trial? | 14 days for Standard or Essentials; gives a worked date example (Aug 29 → Sep 12). |
| 2 | Can I upgrade or downgrade my plan during the free trial? | Yes; upgrades prorate the difference for remaining trial days, downgrades take effect at period end, no refund but access retained to period end. |
| 3 | What happens if I pause or cancel during the free trial? | No charge; pause or delete via the Settings tab in Account & Billing. |
| 4 | Will I get billing reminders before the free trial ends? | Yes, with upcoming billing estimates; then charged at the then-current rate. |
| 5 | How do I get access to SMS? | Select markets, paid plan, agree to terms, submit an application, get approved, then buy credits from one of four named entry points. |
| 6 | How do SMS credits work? | Bought in blocks as an add-on, auto-repurchased monthly, unused credits expire and do not roll over, mid-cycle top-up available. |
| 7 | Can I buy email credits instead of a monthly or annual marketing plan? | Yes — pay-as-you-go for infrequent senders. |
| 8 | How do I switch to a different plan? | Via the Billing page; new features available immediately. |
| 9 | What payment methods do you offer? | Major cards, PayPal, direct debit in select countries, multiple currencies. |
| 10 | What happens if I hit the contact or sending limit? | Auto-billed for overages; campaigns are not stopped if overages are paid on time; Mailchimp may upgrade your contact tier during the trial to put you in a cheaper tier. |
| 11 | Do you have pricing for high-volume email senders? | Yes above 200,000 contacts; routes to contact sales. |

**Structural notes.** Ordering is trial (Q1–4) → SMS add-on (Q5–6) → alternative billing (Q7) → plan change (Q8) → payment (Q9) → limits (Q10) → enterprise (Q11). The trial cluster occupying four of eleven slots tells you what the conversion friction actually is.

Q10 is the most interesting answer in the set. It leads with reassurance ("we will not stop your campaigns"), then discloses that Mailchimp may **unilaterally change your tier during a free trial** — framed as being in the user's interest ("so you are in a more economical tier when billing begins"). That is a real and defensible framing, but it is buried in the second half of the longest answer on the page, and it is the only place on the public site where automatic tier changes are disclosed.

Q6 answers the question nobody asks until it costs them: `unused credits expire each month and do not roll over`, stated in the answer body and repeated verbatim in disclaimer 3. Repetition across two surfaces for the one genuinely adverse term is deliberate and good.

Register check: only Q2 opens with `Yes!` and only Q11 opens with the colloquial `We do indeed.` Nine of eleven answers are flat. Same register gradient Wise shows — informality survives only where the news is good.

## T13 Terminology & glossary

| Term | Mailchimp's usage | The alternative it rejected |
|---|---|---|
| `Audience` | The top-level container of contacts; one of the 18 help topics | `List` — the industry-standard term, deliberately retired; `Combine Audiences` and `Audience ID` show the rename went all the way down |
| `Contact` | The individual record | `subscriber` — but **not fully retired**: `Identify Inactive Subscribers`, `Add Subscribed Contacts to Groups`, `Best Practices for E-commerce Subscribers`, `Manage International Subscribers in Mailchimp` all survive in help titles |
| `Cleaned` | A contact removed after repeated bounces | "bounced out", "removed", "suppressed" |
| `Non-Subscribed` | Transacted but never opted in | "customer without consent" |
| `Tags` vs `Groups` vs `Segments` | Three distinct organising concepts, each with its own `Getting Started with…` article | A single "labels" concept |
| `Marketing Automation Flows` | Current name for journey builder | `Customer Journey Builder` (CJB), renamed June 2025 — legacy name still in disclaimers |
| `Merge Tags` | Personalisation tokens; a top-level help topic | "variables", "dynamic fields" |
| `Omnivore` | Named abuse-detection system, exposed to users | An unnamed "our systems" |
| `Freddie` | The chimp mascot; style guide forbids writing in his voice | — |
| `Mailchimp & Co` | The agency/freelancer partner programme | "Partner Program" |
| `Denylist` / `Allowlist` | Replaced the previous terms; the word list bans `blacklist, whitelist` explicitly | `blacklist` / `whitelist` |
| `add-on contact block` | The overage billing unit | "overage bundle" |
| `peak contact total` | The high-water-mark measure used for billing | "average contacts", "end-of-month contacts" |
| `contact tier` | The pricing band | "plan size" |
| `Pay As You Go` | Credit-based alternative to subscription | — |
| `The Rocket Science Group, LLC` | Legal entity; guide restricts it to contracts only | — |

**The word list is itself the artefact** `[observed]`. Three sections:

- **Standardized spellings** — ~40 entries, mostly resolving the noun/verb hyphenation problem: `add-on (noun, adjective), add on (verb)` · `login (noun, adjective), log in (verb)` · `signup (noun, adjective), sign up (verb)` · `opt-in (noun, adjective), opt in (verb)` · `pop-up (noun, adjective), pop up (verb)` · `drop-down (noun, adjective), drop down (verb)` · `back end (noun), back-end (adjective)` · `third party (noun), third-party (adjective)`. Plus flat rulings: `email (never hyphenate, never capitalize unless it begins a sentence)` · `internet (never capitalize unless it begins a sentence)` · `checkbox` · `homepage` · `OK` · `WiFi` · `e-commerce (the industry)`. A nested sub-list fixes the email-composer field labels: `To name` · `From name` · `Reply-to name` · `Subject line` · `Cc, Bcc`.
- **Words to use carefully** — ten marketing-jargon terms permitted *only* in educational contexts with a definition: `buyer journey` · `conversion` · `customer lifecycle` · `integrated marketing` · `lead generation` · `marketing funnel` · `multichannel marketing` · `omnichannel marketing` · `product-market fit` · `value proposition`. A conditional-permission tier between "use" and "ban" is rare in published style guides and is the most reusable structural idea in the word list.
- **Words to avoid** — includes the self-deprecating `automagical (we used to say this a lot, and we're embarrassed about it)`, the roster `ninja, rockstar, wizard, unicorn (unless referring to a literal ninja, rockstar, wizard, or unicorn)`, the ableism/racism ban on `blacklist, whitelist, grandfathered, slave, master, deaf, blind`, plus `young, old, elderly, or any other word describing a person's age`, `crushing it, killing it`, `crazy, insane`, `best-in-breed`, and `Silicon Valley cliches like rise and grind, or disruptor/disruption`.

## T14 Voice, tone & accessibility

**This is the priority section for this product. The guide is the artefact; the live site is the test.**

### The published guide — structure

Seventeen sections, ordered from principle to reference: `Writing Goals and Principles` → `Voice and Tone` → `Writing about Mailchimp` → `Writing About People` → `Grammar and Mechanics` → `Web Elements` → `How to Write Educational Content` → `Writing Legal Content` → `Writing Email Newsletters` → `Writing for Social Media` → `Writing for Accessibility` → `Writing for Translation` → `Creating Structured Content` → `Copyright and Trademarks` → `Word List` → `Further Reading` → `TL;DR`.

Licence: Creative Commons Attribution-NonCommercial 4.0, with source on GitHub, and an explicit invitation — "We invite you to use and adapt this style guide as you see fit." The guide addresses two audiences in two sections on its landing page (`If you work at Mailchimp` / `If you work at another organization`), which is why it travelled. Copyright line reads `© Mailchimp 2023`.

The `TL;DR` section is a genuine structural innovation: a one-page condensation of the whole guide, placed last so it reads as a summary but usable first as a quick reference. Most guides have a "principles" page; almost none ship an explicit abbreviated edition.

### Voice — four named attributes

`[documented]`, each a first-person-plural declarative with a stated rationale:

1. **`We are plainspoken.`** — "We strip all that away and value clarity above all."
2. **`We are genuine.`** — "we relate to customers' challenges and passions and speak to them in a familiar, warm, and accessible way."
3. **`We are translators.`** — "it's our job to demystify B2B-speak and actually educate."
4. **`Our humor is dry.`** — "We prefer winking to shouting. We're never condescending or exclusive—we always bring our customers in on the joke."

The framing sentence for the whole section is the best line in the guide: "marketing technology is a minefield of confusing terminology. That's why we speak like the experienced and compassionate business partner we wish we'd had way back when." A voice defined by the absence the founders felt, not by adjectives.

The `TL;DR` restates voice as four *different* adjectives — `Human` · `Familiar` · `Friendly` · `Straightforward` — which do not map cleanly onto the four attributes above. `Plainspoken`, `genuine`, `translators`, `dry humour` versus `human`, `familiar`, `friendly`, `straightforward`: "dry humour" has no counterpart in the short list, and "friendly" has none in the long list.

### Tone — the model, and what is missing

`[documented]`. The guide's tone model is the classic one it popularised: "You have the same voice all the time, but your tone changes… Your tone also changes depending on the emotional state of the person you're addressing."

**The tone-by-context guidance the brief asked for is largely `[absent]` from the current guide.** The guide states the principle ("consider the reader's state of mind. Are they relieved to be finished with a campaign? Are they confused and seeking our help on Twitter?") but does not supply the per-context examples that made Mailchimp's separate, now-retired `voiceandtone.com` microsite famous. What survives is:

- **One hard rule for failure states**, in Grammar and Mechanics: `Never use exclamation points in failure messages or alerts. When in doubt, avoid!` — with the self-aware exclamation mark on the instruction itself.
- **One rule for humour restraint**: "don't go out of your way to make a joke—forced humor can be worse than none at all. If you're unsure, keep a straight face."
- **One rule extending tone to system copy**, in Writing Goals and Principles: "All of our content, from splashy homepage copy to system alerts, should be warm and human."
- **One register exception for a whole content class**, in Writing Legal Content: "Legal content is serious business, so the tone is slightly more formal than most of our content."
- **The exclamation-point calibration**: "Use exclamation points sparingly, and never more than one at a time. They're like high-fives: A well-timed one is great, but too many can be annoying."

So: bad news gets a register shift (legal, formal) and failure gets a punctuation ban, but there is no worked example of a success message, an error message, or a bad-news message in the current public guide. That absence is worth recording, because the industry's mental model of "the Mailchimp voice and tone guide" is largely based on a microsite that is no longer part of the published artefact.

### Accessibility guidance — nine rules plus five self-checks

`[documented]`. The section opens with a scope statement that is unusually broad: "Accessibility includes users of all mental and physical capacities, whether situational (broken glasses!) or more permanent."

Five self-check questions the writer is told to ask:
- `Would this language make sense to someone who doesn't work here?`
- `Could someone quickly scan this document and understand the material?`
- `If someone can't see the colors, images or video, is the message still clear?`
- `Is the markup clean and structured?`
- Whether it works on mobile devices with accessibility features.

Nine named guidelines: `Avoid directional language` · `Use headers` · `Employ a hierarchy` · `Label forms` · `Use descriptive links` · `Use plain language` · `Use alt text` · `Make sure closed captioning is available` · `Be mindful of visual elements`

Highest-value specifics:
- Directional language, with a paired example: Yes — "Select from these options," (with the steps listed after the title); No — "Select from the options in the right sidebar."
- `Links should provide information on the associated action or destination. Try to avoid "click here" or "learn more."`
- A **three-branch alt-text rule** keyed to image purpose: decorative/supporting photo → describe in a brief caption; functional image → "People who don't see the image should come away with the same information as if they had"; chart or graph → "include the data in the alt text."
- `Headers should always be nested and consecutive. Never skip a header level for styling reasons.`
- `Make true lists instead of using a paragraph or line breaks.`
- On required fields: "Think carefully about what fields are necessary, and especially which ones you mark as required."

The three-branch alt-text rule is the most transferable single item in the accessibility section: it replaces "write good alt text" with a decision the writer can actually execute.

### Does Mailchimp follow its own guide? Mostly not, on the marketing surface.

This is the question the corpus wanted answered. The honest answer is that **the guide governs the help centre reasonably well and the marketing site barely at all**, and that the guide contradicts itself in two places before the site even gets a chance to.

**A. The guide contradicts itself — two direct conflicts between `Web Elements` and `TL;DR`.**

| Rule | Web Elements says | TL;DR says |
|---|---|---|
| Buttons | "Keep things clear and concise, and use **sentence case**." Standard examples: `Log in`, `Sign up free`, `Subscribe`, `Email us` | "**Capitalize every word, including articles.**" |
| Headings | "Headings and subheadings are written in **sentence case**." | "Use **title case** for **headings** and sentence case for subheadings." |

These are not ambiguities; they are opposite instructions for the same element, in the same document, one of which is the official summary of the other. Any writer who reads the TL;DR (its stated purpose: "It may be more information than you need. Here are the most important things to know.") will produce copy that violates the full section, and vice versa. This alone explains a large share of the site's inconsistency.

**B. Ampersands.** Grammar and Mechanics: `Don't use ampersands unless one is part of a company or brand name.` Web Elements carves out one exception: "It's OK to use an ampersand in button copy."

Live ampersands **outside** button copy and outside brand names:
- Hero H1: `Email & SMS marketing minus the learning curve`
- Nav categories: `Booking & Scheduling`, `Forms & Surveys`
- Pricing sub-nav: `Email & SMS`
- Pricing table section headings: `Services & Support`, `Email Marketing & Segmentation`
- Pricing table cells: `Phone & Priority Support`, `24/7 Email & Chat Support`
- Footer: `Agencies & Freelancers`
- Help article: `Account & Billing`

The violation includes the single most prominent string on the site.

**C. The word list vs the product's own feature name.** Word list: `pop-up (noun, adjective), pop up (verb)`.

Live usage of the same feature, on the same pages:
- `Popup Forms` (pricing comparison table, homepage benefit list)
- `Customizable Popup forms` (homepage — inconsistent internal capitalisation in a three-word phrase)
- `Create a Popup Form`, `Design Your Popup Form`, `Manage Your Popup Form` (help article titles)
- `Add a Mini Quiz to Your Pop-up Form` (help article title, **same category page as the three above**)
- `**Popup forms (beta):**` (pricing disclaimer 16)

Four spellings of one feature — `Popup`, `Popup`/`popup` mid-phrase, `Pop-up`, and the word-list-mandated `pop-up` used only in the one help title. This is the clearest self-violation in the set because it is a named entry in the guide's own word list, contradicted on the marketing page, the pricing page, the disclaimer, and three of four help titles.

**D. `e-commerce` vs `ecommerce`.** Word list: `e-commerce (the industry)`. Live: `E-commerce` (nav — acceptable, list-initial), `Best Practices for E-commerce Subscribers` (help — compliant), but disclaimer 17 reads "connected ecommerce stores" and disclaimer 2 reads "all e-commerce revenue". Both spellings inside the same numbered disclaimer block.

**E. Feature-name capitalisation.** Grammar and Mechanics: "Don't capitalize descriptive product or feature names, like email or landing pages," with worked examples `templates`, `Mailchimp's mobile app`, `Essentials plan`.

Live pricing comparison table, title-cased throughout: `Marketing Automation Flows` · `Generative AI Features` · `Custom-coded Templates` · `Premium Migration Services` · `Monthly Email Sends` · `Role-based Access` · `Popup Forms` · `Pre-built Email Templates` · `Email Scheduling` · `Branded Templates` · `Custom Reports` · `Dynamic Content` · `Predictive Segmentation` · `Personalized Onboarding` · `Dedicated Onboarding Specialist`.

Plan names (`Premium`, `Standard`, `Essentials`, `Free`) *are* correctly capitalised per the guide's explicit carve-out — so the rule is known and half-applied.

**F. `Learn more`.** Accessibility section and TL;DR both say: avoid `learn more` as link text. Live: `Learn more` (pricing, free-plan note), `Learn More` (pricing, ×4 in tier disclaimers), `Learn More` (homepage disclaimer), `Learn more` (help, related links). Six instances on two pages, in two casings, plus one compliant variant (`Learn more about onboarding`).

**G. Exclamation points.** "Use exclamation points sparingly." Live: `Try our Standard plan for *free*!` appears twice (homepage and pricing page), `Yes!` opens FAQ answer 2. Defensible as "sparing," but the promotional exclamation is on the two highest-traffic pages.

**H. Where the guide *is* followed.** Worth stating, because the picture is not uniformly bad:
- `Mailchimp` capitalisation (big M, little c) is correct everywhere observed.
- Mailchimp is consistently referred to as "we," never "it."
- Contractions are used freely throughout marketing, help, and FAQ copy, as instructed.
- Plan names are capitalised per the carve-out.
- The banned-word list appears genuinely enforced — no `ninja`, `rockstar`, `leverage`, `disrupt`, `learnings`, `crushing it`, or `automagical` observed anywhere on the 18 pages harvested.
- `Denylists` is used in the help title `About Denylists`, correctly replacing the banned term.
- Sub-navigation is sentence case and main navigation is title case, exactly as specified.
- Em dashes are used unspaced (`—`) as the guide requires: "included with Standard and Premium plans", "exclusive to the Premium plan", "Custom-coded Templates — Create and Send".

**Verdict for the corpus.** This is a third data point on "does the publisher follow the standard," and it lands differently from Twilio and Atlassian. Mailchimp's violations are **concentrated by surface, not distributed at random**: the help centre and the legal/disclaimer register are largely compliant; the marketing and pricing pages are not. That pattern is consistent with a guide that was written by and for a content team who no longer own the acquisition surface. The `© Mailchimp 2023` copyright, the retired `Customer Journey Builder` name still in disclaimers, and the guide's total silence on the Intuit rebrand, on AI copy, and on the `Intuit Intelligence` / `Intuit Assist` naming all point the same way: **the standard is no longer maintained in step with the product it governs.** The two internal contradictions between `Web Elements` and `TL;DR` are the strongest evidence — they would have been caught by any active review cycle.

### Observed accessibility practice on the live site

`[observed]`

- `Skip to main content` present, first in DOM on every page. Style-guide-compliant.
- Alt text is descriptive on scene images: "A small business owner reaching out to her Mailchimp Onboarding Specialist." · "A group of friends…" pattern. Compliant with the guide's photo branch.
- **Alt-text defect:** the homepage star-rating graphic carries alt `Four yellow filled stars and one yellow outlined empty star, representing a 4 out of 5 star rating.` while the adjacent visible text reads `Mailchimp has a four and half star rating`. A sighted user is told 4.5; a screen-reader user is told 4 out of 5. The alt text is well-written and describes the wrong value.
- **Internal CMS tokens leaking into alt text:** `[KB] Download the Mailchimp app on the App Store`, `[KB]` alone as the alt for three help-centre illustrations, and `[KB] How to Create a New Audience for Smarter Growth ▶ 2:50` as link text. The `[KB]` prefix is an internal content-type marker read aloud verbatim.
- **Numeric or empty alt on meaningful images:** the homepage hero and several pricing-page award badges carry empty alt while adjacent text does not supply the equivalent (`![]` on the hero; one G2 badge with empty alt among five with descriptive alt).
- **Concatenated accessible names on the primary CTA** (see T8): four mutually exclusive button labels in one anchor.
- Video links are exposed as raw `.mp4` URLs in the served markup with `Play video` as the only label on some instances.
- No published Mailchimp accessibility statement; the footer `Accessibility` link goes to Intuit's corporate page.

---

## Transferable patterns

1. **Ship a TL;DR of your own standard — but review it as a normative document, not a summary.** Mailchimp's one-page condensation is the most-copied structural idea in the guide and is also where two of its rules invert. If you publish an abbreviated edition, treat it as a second source of truth with equal review weight, or generate it mechanically from the full text.
2. **A three-tier word list beats a two-tier one.** `Standardized spellings` / `Words to use carefully (only with a definition, in educational contexts)` / `Words to avoid`. The middle tier is the useful innovation: it gives writers a licensed path to necessary jargon instead of an unenforceable ban. Directly applicable to PayPal's financial and regulatory vocabulary, where terms like *chargeback*, *authorization*, *settlement* are unavoidable but need first-use glossing.
3. **Branch alt-text guidance by image purpose, not by image type.** Decorative → caption; functional → "same information as if they had seen it"; data → put the data in the alt. Three branches, each executable without judgement calls.
4. **Name the warning state separately from the suspension state.** Mailchimp documents `Bounce Warnings` before `Bounce Suspension` and `Unsubscribe Warnings` before `Unsubscribe Suspension` — four articles where two would do, so that the user has a named, recoverable state to act in. Transfers directly to account-limitation and risk-hold copy, where the gap between "we noticed something" and "we've restricted you" is where most trust is lost.
5. **Bold-label every disclaimer with the claim it qualifies.** `**27X ROI Standard Plan:**` beats a superscript. The reader can match footnote to claim without scanning. Condition: only works when the number of disclaimers is large enough that superscript-hunting is actually a burden — which, at 21, it is.
6. **Write the terms in plain language instead of writing a plain-language summary.** Mailchimp's stated position is that a summary is a second document to keep in sync and is not the contract. Their alternative is a sidebar for examples and further reading. Relevant wherever a compliant artefact and a comprehensible artefact are currently being maintained as two documents.
7. **Give the feedback widget a "never found it at all" option distinct from "hard to find."** And give the user a slot to report a product problem inside a documentation survey. Two cheap additions that route two very different signals.
8. **Interpolation defects are a content-design problem, not an engineering one.** `Hi, %s`, the orphaned "sends for the rest of your free trial", and the four-labels-in-one-anchor CTA are all string-assembly failures visible on the highest-traffic commercial pages. A string inventory that includes the *empty* and *concatenated* states of every dynamic slot would catch all three.

## Caveats & gaps

- **No authenticated pass.** Every in-product state — campaign statuses, contact-status chips, validation messages, toasts, empty states, error dialogs, the send-confirmation flow — is reconstructed from help-article *titles*. Article bodies were opened for only one article (`About Additional Charges`). Titles are high-signal for IA and task phrasing and say nothing about answer structure or in-product string wording.
- **The famous tone-by-context examples are not in the current published guide.** `voiceandtone.com`, the separate microsite that carried per-emotional-state examples (success, error, bad news), is not part of `styleguide.mailchimp.com` and was not harvested. Anything a reader remembers about "Mailchimp's tone-by-context guidance" should not be attributed to the artefact recorded here. T14 marks this `[absent]` explicitly.
- **Five style-guide sections not harvested**: `Writing About People`, `How to Write Educational Content`, `Writing Email Newsletters`, `Writing for Social Media`, `Creating Structured Content`, `Copyright and Trademarks`, `Further Reading`. `Writing About People` in particular is summarised only via the TL;DR restatement (person-first perspective, singular "they", preferred pronouns) rather than read in full.
- **Pricing figures are promotional, not list.** The `$20`, `$13`, `$350` figures observed are all discounted ("/mo for 12 months", "Save 15% on 10,000+ contacts") and the undiscounted rate renders as a broken interpolation (`Then, starts at **/month†**`). No list price was retrievable. Do not cite these as Mailchimp's standard pricing.
- **Style-guide version is 2023.** The guide's copyright line reads `© Mailchimp 2023` and it contains no reference to Intuit ownership, to the `Intuit Intelligence` / `Intuit Assist` product naming, to AI-generated content, or to the 2025 `Customer Journey Builder` → `Marketing Automation Flows` rename. The self-violation analysis in T14 should be read with that staleness in mind: some of the divergence is drift, not disregard.
- **Self-violation analysis is bounded by the 18 pages harvested.** A wider crawl of `/resources/`, `/features/`, and the blog would almost certainly change the ratios. The claim made here is about concentration by surface (help compliant, marketing not), which held across every page in the set, not about a global compliance rate.
- **Locale.** en-US only. The six translated locales were not checked, so nothing here speaks to whether the `Writing for Translation` rules are followed.
- **Status page is third-party** (StatusCake-hosted), so its state vocabulary (`Good Service`, `All Systems are Online`) may be vendor-default rather than a Mailchimp content decision. Flagged as suspected, not confirmed.

## Sources

1. https://styleguide.mailchimp.com/
2. https://styleguide.mailchimp.com/writing-principles/
3. https://styleguide.mailchimp.com/voice-and-tone/
4. https://styleguide.mailchimp.com/writing-about-mailchimp/
5. https://styleguide.mailchimp.com/grammar-and-mechanics/
6. https://styleguide.mailchimp.com/web-elements/
7. https://styleguide.mailchimp.com/writing-legal-content/
8. https://styleguide.mailchimp.com/writing-for-accessibility/
9. https://styleguide.mailchimp.com/word-list/
10. https://styleguide.mailchimp.com/tldr/
11. https://mailchimp.com/
12. https://mailchimp.com/pricing/marketing/
13. https://mailchimp.com/help/
14. https://mailchimp.com/help/getting-started/
15. https://mailchimp.com/help/audiences/
16. https://mailchimp.com/help/delivery/
17. https://mailchimp.com/help/about-additional-charges/
18. https://status.mailchimp.com/
