# 191. DocuSign

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | E-signature and agreement management (IAM / CLM) |
| Primary URL | https://www.docusign.com/ |
| Corpus rank | 191 |
| Benchmark strength (source list) | Agreement status and legal actions |
| Locale / market observed | en-US (site offers 15 locale variants from a footer switcher) |
| Platform observed | Web (desktop marketing), e-commerce pricing subdomain, status subdomain, a DocuSign-generated ERSD PDF hosted by a customer |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | US ESIGN Act + state UETA; eIDAS in the EU (SeS / AeS / QeS tiers exposed as a pricing-table row); FedRAMP Moderate + DoD IL4; HIPAA via BAA; 21 CFR Part 11; ISO 27001; SOC 2 Type II; PCI DSS; GDPR; Section 508; WCAG 2.2 AA claimed on the accessibility hub, WCAG 2.0 AA claimed on the pricing table |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 fetched successfully, 8 attempted and blocked or empty |
| Harvest completeness | **Partial** — the entire help centre (`support.docusign.com`) is a client-rendered Salesforce Experience Cloud app that returns only a `Loading` / `CSS Error` shell to a server-side fetch, and `developers.docusign.com` is a Gatsby site that returned metadata with an empty body on every attempt. The two richest sources of envelope-state vocabulary are therefore unreachable, and T6 is reconstructed from a pricing FAQ sentence, the features page, and search-result listings |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.docusign.com/ | Global nav, hero, bento-card section headings, trust numbers, footer |
| eSignature product | https://www.docusign.com/products/electronic-signature | Sub-nav, benefit sections, 7-question FAQ accordion (answers present in HTML) |
| eSignature features | https://www.docusign.com/products/electronic-signature/features | ~70 named features across 12 groupings — the single richest terminology source |
| Plans and pricing | https://ecom.docusign.com/plans-and-pricing/esignature | Plan names, prices, envelope allowances, 9-question pricing FAQ, cancellation and refund wording |
| eSignature Legality Guide (US) | https://www.docusign.com/products/electronic-signature/legality | ESIGN/UETA explainer, permitted/caution document lists, case-law list, disclaimer |
| Trust Center | https://www.docusign.com/trust | Seven-tab sub-nav, alerts feed with three live notices |
| Accessibility Hub | https://www.docusign.com/accessibility | Conformance claims, programme description, per-product VPAT index |
| Safety Center | https://www.docusign.com/safety | Fraud taxonomy, report-abuse routing, 4-question safety FAQ |
| How it works (legacy) | https://www.docusign.com/how-it-works/electronic-signature | Stale page: old brand capitalisation, contradicted statistics, 6-question FAQ |
| Status page | https://status.docusign.com/ → https://health.docusign.com/status | Shell only: tab labels captured, incident list is `Loading...` |
| Default ERSD (customer-hosted) | https://assets.edfed.org/img/www/legal/disclosures/general/DocuSign%20Legal%20Disclosure.pdf | DocuSign's **default** Electronic Record and Signature Disclosure template, merged with a customer name. Verbatim source for T10 |
| Support Center | https://support.docusign.com/ | **Blocked** — client-rendered shell |
| eSignature User Guide | https://support.docusign.com/en/guides/ndse-user-guide-welcome | **Blocked** — redirects into the same shell |
| Envelope status codes (dev) | https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/envelopes/status-codes/ | **Empty body** — Gatsby, metadata only |
| Envelopes resource (dev) | https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/ | **Empty body** |
| Access Documents | https://apps.docusign.com/sign/access | **Empty body** — the unauthenticated "enter your security code" surface was not retrievable |
| Legacy pricing path | https://www.docusign.com/products/electronic-signature/pricing | **Empty body** — dead path still linked internally |

---

## T1 Navigation & IA labels

`[observed]`

**Global nav is four items plus two utility rails.** Top utility rail: `Sales 1-877-720-2040` · `Search` · `Support` · `Access Documents`. Main rail: `Products` · `Solutions` · `Resources` · `Enterprise` · `Plans & Pricing`.

`Access Documents` in the top utility bar is the notable one. It is the *signer's* entry point — a person who received an envelope and lost the email — sitting at the same level as `Support`, above the product nav, on every marketing page. DocuSign has given the non-customer, one-time recipient a permanent global nav slot. Most SaaS products bury this.

**Product mega-menu is grouped by platform layer, and every item carries a verb-phrase gloss** `[observed]`

| Group | Item | Gloss (verbatim) |
|---|---|---|
| IAM platform | `Intelligent Agreement Management` | "Create, commit to, and manage agreements with IAM" |
| | `Contract Lifecycle Management` | "Automate your contract lifecycle" |
| | `Iris` | "Turn agreement data into action" |
| | `Agreement Preparation` | "Intuitively prepare new agreements" |
| | `Agreement Manager` | "Find, analyze, and act on agreements" |
| | `eSignature` | "Send, sign, and track documents" |
| | `Agents` | "Draft, review, and orchestrate agreements with AI" |
| | `Electronic Notarization` | "Send, sign, and notarize remotely" |
| | `Workflow Builder` | "Automate agreement processes" |
| | `Web Forms` | "Collect data and speed up signing" |
| Integrations, APIs, and more | `App Center` | "Extend your Docusign experience" |
| | `Integrations` | "1000+ pre-built integrations" |
| | `APIs` | "Integrate Docusign technologies" |
| | `Mobile App` | "Get more done on the go" |

Two patterns. First, the gloss is always a **verb-first imperative naming what the user does**, not what the product is — even for the AI products (`Turn agreement data into action`). Second, the **three-verb triad** recurs structurally: `Create, commit to, and manage`, `Send, sign, and track`, `Find, analyze, and act on`, `Draft, review, and orchestrate`, `Send, sign, and notarize`. Five of ten items are built on the same rhythm. It reads as deliberate house style and it does make the menu scannable, but it also flattens genuine differences — `Agreement Manager` and `Iris` end up sounding like near-synonyms.

**Solutions menu splits by audience twice over** `[observed]`: `IAM for departments` (`IAM Core`, `Sales`, `Customer Experience`, `Human Resources`, `Legal`, `Procurement`, `View All Departments`) and `IAM for industries` (`Financial Services`, `Insurance`, `Real Estate`, `Government`, `Healthcare`, `Life Sciences`, `View All Industries`). The `IAM for X` prefix is repeated in the menu heading *and* in several item labels (`IAM for Sales`, `IAM for CX` appear as CTA text on the homepage), so the same token appears at two levels of the hierarchy.

**Resources menu uses four verb-phrase group headings, not nouns** `[observed]`: `Learn` · `Get support` · `Build + extend` · `Connect`. `Build + extend` uses a literal plus sign as a conjunction — the only place in the nav where punctuation substitutes for a word.

**Product sub-nav is a consistent four-tab strip** `[observed]`, seen on the eSignature pages: `Overview` · `Features` · `Use Cases` · `Resources`. Trust Center gets a seven-tab strip: `Overview` · `Legal` · `Alerts` · `Compliance` · `Privacy` · `Security` · `System Status` · `Trust Portal`. Safety Center gets four: `Overview` · `Alerts` · `Fraud resources` · `Platform safety`.

**Defect:** Trust Center and Safety Center both have an `Alerts` tab, pointing at two different feeds (`/trust/alerts` and `/trust/safety-alerts`). Both are called simply `Alerts`. A user who has seen one will reasonably assume the other is the same page.

**Footer is unusually thin** `[observed]`: locale switcher, four social links, two app-store badges, and six legal links — `Terms of Use` · `Privacy Notice` · `Notice to California Residents` · `Cookie Settings` · `Intellectual Property` · `Modern Slavery Act Statement`. There is no sitemap-style footer. Everything routes through the mega-menu. `Modern Slavery Act Statement` surfacing in a US footer is a UK-statute artefact left global.

## T2 Value proposition & headline patterns

`[observed]`

**Homepage hero is a bare noun phrase.**

> Headline: `AI-powered agreement management`
> Subhead: "Analyze agreements with AI, sign documents electronically, and automate workflows with the Intelligent Agreement Management (IAM) platform."
> CTA: `Explore Docusign IAM`

Note what is *not* here. The word "signature" does not appear in the headline of the world's best-known e-signature company. The subhead lists three capabilities in the order analyze → sign → automate, putting signing second. The company has repositioned around a platform noun and the hero copy is the clearest evidence of it.

**Section headings on the homepage are imperative benefit clauses, one per bento card** `[observed]`

`Find, analyze, and act on agreements powered by AI` · `Send, sign, and track documents` · `Automate agreement processes` · `Build and scale with developer tools and APIs` · `Bring people, agreements, and information together` · `Optimize your contract lifecycle` · `Close faster with automated agreements` · `Seamless approval routing` · `Simplify complex contracting processes` · `Generate documents within Salesforce` · `Streamline your customer onboarding` · `Quickly collect signatures` · `Verify signer information instantly` · `Accelerate supplier agreement cycles` · `Never miss a renewal` · `Streamline your process from intake-to-procurement` · `Invest in your people` · `From PDFs to insights: Drive smarter HR strategies` · `Speed up hiring with web forms` · `Verify signer identity` · `Secure agreements with best-in-class compliance tools` · `Proactively manage renewals` · `Accelerate legal reviews and enhance productivity` · `Use AI to identify potential high-risk agreements`

`Send, sign, and track documents` appears **six times** on the homepage, once per audience tab, with identical body copy each time. The audience tabbing is real (Sales / CX / Procurement / HR / Legal each get bespoke cards) but eSignature is bolted into every tab unchanged. A screen-reader user tabbing linearly through the page encounters the same heading and the same paragraph six times.

**Parenthetical-intensifier construction** `[observed]`: `Do (much) more with IAM` on the homepage and `Unlock (much) more agreement value with IAM` on the pricing page. Bracketing the intensifier is a distinctive tic — it performs an aside, as if the claim were being understated. It appears only in upsell contexts.

**Verb-noun cost framing on the eSignature page** `[observed]`: `Improve your customers' experience` · `Boost business efficiency and reduce costs` · `Increase security and make compliance easier` · `Connect with all of the tools you already use` · `Extend the power of eSignature` · `How organizations use eSignature` · `Go beyond eSignature. Add intelligence to your agreements.`

**Pricing page headline is three words and abstract**: `Agreements made effortless`. The pricing page does *not* lead on price, saving, or plan. Compare the eSignature page's opening, which is a definition rather than a pitch: `What is an electronic signature?` — "An electronic signature (or e-signature) is a legally binding way to sign documents online from any device." Leading a *product* page with a dictionary definition is a search-intent decision showing through into UX copy.

**Numbers as trust devices, with visible inconsistency** `[observed]`

Current pages: `1 billion people and 1.9 million customers use Docusign` · `95% of Fortune 500 companies` · `44 languages available for signers, plus 14 for senders` · `Used in 180+ countries` · `99.99% uptime with no maintenance downtime` · `$36 saved per document on average` · `84% of signers are more likely to continue doing business` · `15 minutes or less to complete 41% of agreements` · `1 day or less to complete 76% of agreements`.

The legacy `/how-it-works/electronic-signature` page, still live and still linked, says `more than 50 million users in 188 countries`, `13 sending languages (including U.S. English)`, and `43 localized languages`. Three of those four figures contradict the current pages, and the country count is *higher* on the stale page (188 vs 180+). See T14 for the brand-capitalisation problem on the same page.

## T3 CTA inventory

`[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Explore Docusign IAM` | Homepage hero, footer band | Primary platform CTA; "Explore" not "Learn more" |
| `Start for Free` | Homepage footer band, features footer band | → `trial.docusign.com` |
| `Try for Free` | eSignature product page, beside `Buy Now` | **Near-duplicate of `Start for Free` for the same destination** |
| `Start Free Trial` | eSignature product page, features page hero | **Third label for the same trial destination on the same page set** |
| `Buy Now` | Pricing cards (×3), eSignature "Recommended plans" (×3) | Direct-to-checkout |
| `View Plans and Pricing` | Homepage, eSignature footer band | |
| `Contact Sales` | Enhanced plans card, legality page, pricing | |
| `1 (877) 720-2040` | Enhanced plans card, twice | A phone number used *as* a CTA button, beside `Contact Sales` |
| `Explore All Products` | Products menu, homepage | |
| `Explore eSignature` / `Explore Agreement Manager` / `Explore Workflow Builder` / `Explore CLM` / `Explore Workspaces` / `Explore Integrations` / `Explore Trust Center` / `Explore Developer Center` / `Explore Templates` / `Explore Multi-channel Delivery` / `Explore Data Verification` / `Explore Identify` / `Explore Faster Contract Solutions` / `Explore Procurement Templates` / `Explore HR Templates` / `Explore Solutions for Legal Teams` / `Explore Solutions for HR Teams` / `Explore IAM for Sales` / `Explore IAM for CX` / `Explore Gen for Salesforce` | Bento cards throughout | `Explore <Object>` is the house pattern — always names the destination, never a bare "Learn more" |
| `Learn More` | Why Docusign card, SMS/WhatsApp card, Web Forms card, add-on cards, several feature accordions | **The bare form does still ship**, in at least eight places, contradicting the `Explore <Object>` discipline |
| `Learn About Custom Branding` / `Learn About Docusign Platform Safety` / `Learn How to Report Abuse` / `Learn About Bulk Send` / `Learn More About PowerForms` / `Learn About Multi-channel Delivery` / `Learn More About Radio Buttons and Checkboxes` / `Learn How to Use Templates for Contracts and Forms` / `Learn How Comments Improve Collaboration` / `Learn More About Web Forms` | Feature accordions | The specific form. Note `Learn More About Web Forms` and `Learn More` both link to the same Web Forms page from the same page |
| `Create Free Signature` | eSignature page, under the definition | → signature generator; a genuinely free non-account tool used as a lure |
| `Send a Free Sample Agreement` | Features page, under `Not ready to send your first agreement?` | Deep link with `deeplinkAction=send-sample-agreement`. A **try-before-you-commit CTA placed against a stated objection**, which is the strongest CTA construction on the site |
| `Access Documents` | Global utility nav | Signer entry point |
| `Support` | Global utility nav | |
| `Skip to main content` | First in DOM on every `www` page | Accessibility |
| `Read the Full Story` | Customer story cards | |
| `Browse Customer Stories` / `Explore More Stories` | Section footers | Two verbs for one action |
| `Download the IDC report` | Resources mega-menu | Names the artefact |
| `See All` | Trust Center alerts | Bare, but adjacent list supplies the object |
| `Follow Us on X` / `Subscribe to the RSS Feed` | Trust Center alerts | Names the channel |
| `See Safety Alerts` / `Report Abuse Feature` / `Alternative Reporting` / `Submit an Appeal` | Safety Center | |
| `See Updates and Alerts` / `View System Status` | Trust Center hero | |
| `Go to subscription instructions` | Status page | |
| `See All Features` | Pricing cards (×5) | |
| `Save the Date` / `Dive In Now` | Event and community cards | The only two colloquial CTAs on the site |
| `Download the Docusign Mobile App on Google Play` / `…on the Apple App Store` | Footer | Full-sentence accessible labels on store badges — good practice |

**Observation.** DocuSign has an explicit and mostly-kept rule that a CTA names its destination (`Explore <Object>`, `Learn About <Object>`). It then breaks the rule with a bare `Learn More` roughly eight times, and ships three different labels — `Start for Free`, `Try for Free`, `Start Free Trial` — for one destination across three adjacent pages. The trial-label inconsistency is the most visible content-governance defect on the marketing site.

## T4 Onboarding & getting-started

`[observed]`

The current product pages do **not** carry a how-it-works sequence — they carry a video (`See eSignature in action`) and an embedded interactive demo. The three-times-three step model survives only on the stale `/how-it-works/electronic-signature` page, which is worth recording precisely because it is the older, plainer, and arguably better artefact.

**Three parallel three-step sequences, one per role**, each with a role-framed section heading:

*Sender* — "Easily upload and send documents for electronic signature"
1. `Upload your documents`
2. `Add who needs to sign`
3. `Place tags and send`

*Signer* — "Quickly access and sign documents that require your signature"
1. `Click the link in email`
2. `Follow the DocuSign tabs`
3. `Finish, and you're done`

*Manager* — "Readily check a document's status, send reminders, view audit trails, and securely store online"
1. `Full visibility`
2. `Documents are saved automatically – securely`
3. `Easy to administer`

Three things to note. The **step labels change grammatical mood between the three sequences**: sender steps are imperatives, signer steps are imperatives, manager steps are noun phrases. The manager sequence is the weakest and it is the one that stopped being a sequence. Second, `Finish, and you're done` names the literal button (`Finish`) inside the step label and then reassures — the body repeats it: "Once you're done signing, click Finish. You're done!" That is the only exclamation mark found in the whole harvest. Third, the signer sequence is written in **second person addressed to someone who is not the customer** — the person reading is the recipient, not the buyer. Splitting how-it-works by role rather than by chronology is the transferable move here.

**Empty-account onboarding is addressed by a single objection-handling block** `[observed]`, on the features page:

> `Not ready to send your first agreement?`
> "Try sending a sample agreement with a free account."
> `Send a Free Sample Agreement`

Heading is the user's hesitation phrased as a question; body offers the lower-commitment substitute; CTA restates it. Three lines, complete pattern.

## T5 Form & field labels

`[documented]` — no live form was retrievable. `apps.docusign.com/sign/access`, the unauthenticated signer entry point, returned an empty body, and the checkout is gated.

What *is* publicly enumerated is the **field-type vocabulary**, from the features page `[observed]`:

- The sender-facing objects are called **`tags`** on the legacy page and **`fields`** on current pages. The features page hedges by using both in one sentence: "20+ standard and custom tags and fields". A second alias appears in the signer instructions: "Follow the DocuSign tabs". So the same object is a **tag**, a **field**, and a **tab** depending on surface. This is the single worst terminology inconsistency in the product.
- Named field types `[observed]`: "signatures, initials, names, titles, company names, text, numbers, currency, notes". Plus `Drawing`, `checkboxes`, `radio buttons`, `dropdown tags`.
- Validation vocabulary `[observed]`, from the Data validation feature: "text, email, phone number, date, 5-digit ZIP code, 9-digit ZIP code, social security number and regular expression masking". Note `5-digit ZIP code` and `9-digit ZIP code` as two distinct named validators — US-only framing hard-coded into a field-type list on a site serving 180+ countries.
- Field-behaviour terms `[observed]`: `conditional fields`, `calculated fields`, `Locked fields`, `linked fields`, `Pre-filled fields`, `Third-party data fields`, `Envelope custom fields`, `AutoPlace (formerly Anchor Tags)`.

`AutoPlace (formerly Anchor Tags)` is a documented rename carried inline in the feature copy — DocuSign keeps the dead term in parentheses for users who learned it. The same courtesy is extended to the legal artefact: `Electronic Record and Signature Disclosure (formerly Consumer Disclosure)`. Two visible renames, both handled the same way, both worth copying.

**Accessible tooltips** are a named field property `[documented]` — the accessibility hub links a page titled `Field Properties (Accessible Tooltips)`, which implies the tooltip string on a field is the accessible name for the input. That makes sender-authored tooltip text a screen-reader-critical field label authored by a non-specialist. Notable risk surface; not verifiable without the blocked page.

## T6 Status & state language

**PRIORITY SECTION.** Mixed evidence — read the markers carefully.

### The one verbatim state list on a reachable page `[observed]`

From the pricing FAQ, answering `What are 'envelopes' and how do they relate to my service subscription plan?`:

> "Envelopes have statuses (e.g., sent, delivered, completed, voided)"

That is the complete set DocuSign chooses to show a **prospect**: four states, lower-cased, given as an open-ended example (`e.g.`). The selection is telling — `sent`, `delivered`, `completed` are the happy path; `voided` is the one failure state a buyer is told about, because voiding is the action a *sender* performs. `declined`, the failure state a *signer* performs, is omitted from the buyer-facing list.

### States and state-transitions named elsewhere on reachable pages `[observed]`

| String | Source page | What it tells us |
|---|---|---|
| `Correct documents` | features | The verb for editing an in-flight envelope is **correct**, not "edit" — a word with evidentiary connotation |
| "Make changes to a document, even if it's incomplete" | features | `incomplete` used as the implicit complement of `completed` |
| `void, correct and resend` | features (Bulk send) | The three in-flight sender actions, as a set |
| "draft, send, void, correct or even organize envelopes" | features (Shared access) | Adds `draft` as a pre-send state and `organize` as a housekeeping verb |
| `Real-time document status updates` | features | The system's own name for the status stream |
| `Real-time status` | features (Reporting) | "every signature, approval and related recipient actions are logged and viewable" — so `signature` and `approval` are distinct recipient act types |
| "viewing, printing, sending, signing or declining to sign a document" | features (Audit trail) | **The audit-trail event vocabulary.** `declining to sign` is written as a gerund phrase, not as the state name `declined` |
| `Certification of completion` (heading) vs `certificate of completion` (body) vs `Certificate of completion & electronic record disclosure` (pricing row) | features, pricing | **Three forms of one artefact name.** The legally operative document is inconsistently titled across DocuSign's own pages |
| `Authoritative copy` | features, twice | "a single copy of a document—known as the 'authoritative copy'—that is unique, identifiable and unalterable without detection" — DocuSign scare-quotes its own term of art, then glosses it |
| `expire untouched documents or transactions` | features (Reminders) | **`untouched`** is the word for an envelope no recipient has opened. Vivid, non-systemic, and not a formal state name |
| `Watermarks` — "differentiate draft documents from completed documents" | features | Confirms `draft` / `completed` as the two poles, and shows state rendered *visually inside the artefact*, not just as a label |
| `Delayed routing`, `Conditional routing`, `Serial, parallel and mixed routing` | features | The routing model that generates intermediate states |
| `Recipient permissions` — "who can sign, edit, or approve" | features | Three recipient act types |
| `Document custody management`, `Custody transfer` | features, pricing | Ownership is a tracked state separate from signing state |

### States named only in search-result listings and snippets `[documented — unverified]`

The help-centre article titles below were returned by search as literal result titles, so the **titles** are reliable; the state names inside the generated summaries are **not** verified against a page I fetched. I record them flagged, and a reader should re-verify any of them before use.

Article titles (literal, from search listings): `Envelope Status` · `Recipient Status` · `Correct Envelopes` · `How Correct Works` · `Void or cancel a Docusign envelope` · `Envelope Status Report` · `Send Reminders From the Envelope Status Component` · `Use the Docusign Status Tab to View the Status of an Envelope`.

State names reported inside search summaries, **unverified**: `Waiting for Others` · `Needs to Sign` · `Action Required` · `Delivery Failure` · `Partial delivery` · `Authentication Failed` · `Correcting`.

If those are accurate they are highly interesting, because they show a **two-vocabulary system**: a machine/legal register (`sent`, `delivered`, `completed`, `voided`, `declined`) and a user-facing folder register (`Action Required`, `Waiting for Others`, `Needs to Sign`). The second set is framed entirely around *whose move it is* rather than what happened to the object. That is the right instinct for a multi-party workflow and it is the design decision most worth stealing from this product — but I cannot confirm the strings.

### Analysis: why the words matter here

E-signature is the rare product where a status label is evidence. `delivered` in DocuSign means the recipient's system received the notification; it does not mean a human read it. `completed` means every recipient finished every required action, at which point the envelope becomes immutable and the certificate of completion is generated. `voided` is a sender act and is only available pre-completion. `declined` is a recipient act and terminates the envelope with a recorded reason. Each of these has to survive being read aloud in a dispute.

DocuSign's handling of that pressure is visible in two choices. First, **`correct` over "edit"** — an edit is a change, a correction implies the prior state was wrong, and the feature copy is careful to add that corrections are tracked ("The transaction history tracks all finalized changes") and that downstream parties re-initial ("requests the initials of other parties before accepting a change"). Second, **`authoritative copy` in scare quotes with an immediate gloss** — DocuSign imports the term of art from negotiable-instruments law rather than inventing a friendlier word, and then defines it in twelve words. Both are the correct trade-off: when the word will end up in a legal filing, keep the legal word and gloss it, rather than substituting a plain-English word that will not survive cross-examination.

The cost of that discipline shows in the certificate naming (`Certification of completion` / `certificate of completion` / `Certificate of completion`) — the discipline is applied to the *concepts* but not to the *strings*, which drift.

## T7 Error, failure & recovery

`[observed]` on marketing surfaces; in-product error copy is `[absent]` because the help centre is blocked.

**Failure is framed almost entirely as fraud, not as system error.** The Safety Center is the only substantial failure-content surface reachable, and it is organised as a taxonomy of things done *to* the user:

| Category | Definition (summarised) |
|---|---|
| `Email abuse` | Phishing that impersonates DocuSign or a DocuSign account |
| `In product abuse` | Suspected fraud or illegal activity inside real customer accounts |

Then a second taxonomy of attack vectors, each a coined or semi-coined noun with a one-line gloss `[observed]`: `Phishing` · `Smishing` · `Vishing` · `Quishing`. All four are defined inline. `Quishing` (QR-code phishing) is glossed as "where fake QR codes are used to steal information" — DocuSign is teaching a term most users have never met, which is the right call given the attack is new.

**Recovery routing is three named paths, and each is a distinct kind of remedy** `[observed]`: `Report email abuse` (forward to `verify@docusign.com`) · `Report in product abuse` (in-product `Report Abuse` feature, or the `Report Email` link in the notification footer, or a fallback form) · `Appeals form` — "If you believe your account was deactivated by mistake". Including an appeals route for the product's *own* enforcement error, on a public page, is unusual and good. The copy accepts that DocuSign deactivates accounts wrongly.

**The strongest single instruction on the site** `[observed]`, from the safety FAQ: "If you receive a suspicious envelope, do not click any links. Instead, use the 'Report Abuse' feature found inside the envelope or email." Negative instruction first, positive alternative second, exact control named in quotes. Four clauses.

**Verification heuristics are given as a checklist the user can run** `[observed]`, summarised: confirm the sender domain is `@docusign.net`; look for the unique security code in the email and use it on the official site instead of clicking the link; be suspicious of attachments because "Docusign never sends signature requests as a file"; expect a Certificate of Completion afterwards. The "never sends X" formulation is the useful one — a **stated absolute about the product's own behaviour** gives the user a falsifiable test.

**Failure-adjacent product features named on the features page** `[observed]`: `Delivery Failure` is not named, but `Fax-back` exists as an explicit fallback rail ("recipients need the option to return a document via fax"), `Offline sending` and `Offline signing` both promise "sync and send once connectivity is restored", and `Spam protection` describes the access-code workaround for users who distrust the email. DocuSign ships a named fallback for each delivery channel. That is a failure-design posture expressed in the feature list rather than in error strings.

**Gap.** No error titles, no validation messages, no toast copy, no "something went wrong" strings were retrievable. Everything a designer would want from T7 sits inside the blocked help centre and the authenticated product.

## T8 Empty states

`[absent]` — with one near-miss.

No no-results, no-data, or first-run copy was retrievable. The closest artefact is the objection-framed block on the features page, which functions as a **pre-empty state** — it addresses the user who has an account and no agreements before they ever see a real empty inbox:

> `Not ready to send your first agreement?` / "Try sending a sample agreement with a free account." / `Send a Free Sample Agreement`

The status page's incident area rendered as the literal string `Loading...` rather than either a populated list or an "All systems operational" state. That is a **loading state leaking as content** to any client that does not execute the JavaScript, including search-engine crawlers and any assistive setup that reads early. Recorded as a defect, not as an empty state.

## T9 Notifications & system messages

`[observed]` for public system messaging; in-product toasts `[absent]`.

**Notification design is named as a product capability** rather than described to the user: `Notifications and reminders` (pricing row, all four tiers), `Reminders and notifications` (features) — "Set up automated email reminders for your signers to complete the signing process and add deadline notifications to expire untouched documents or transactions", `Real-time comment notifications`, `Service alerts and notifications`, `Email archiving`.

**Delivery channels are themselves a named feature family** `[observed]`: `Multi-channel delivery`, `SMS and WhatsApp delivery`, `Send with SMS`. Marketing copy: "Deliver agreements to your customers' preferred channels, whether it's text, WhatsApp, or email." And "Get signatures 65% faster with real-time notifications sent to your signers' phones."

**The Trust Center alerts feed is the best observable system-message corpus** `[observed]`. Three live notices at harvest, and they share a strict template:

1. Title = event type + system + date: `Planned Disaster Recovery Exercise for eSignature Azure Australia Production - October 17, 2026`; `Planned Maintenance for CLM IL4 US13 - September 19, 2026`; `UPDATE: Subprocessor List for Docusign Services`
2. Body states the window in **two time zones** — "from 8:00 PM PST to 10:00 PM PST (Sunday, October 18, 2026, 3:00 AM to 5:00 AM UTC)"
3. Body states expected impact explicitly, including when there is none: "This exercise is not expected to cause downtime or impact eSignature services, however we are notifying customers as a precautionary measure." And: "some services might be briefly unavailable for up to 5 minutes."
4. Body closes with a fixed routing sentence: "Please contact Docusign Support if you have any questions or concerns, and check back here for any updates regarding the schedule."

Two transferable moves. **Notifying about a non-event** — announcing a DR exercise that is not expected to cause downtime, and saying so in the same sentence — buys credibility cheaply. And **bounding the impact numerically** ("up to 5 minutes") rather than saying "brief".

The subprocessor notice adds a fourth element: an **objection procedure written as a single actionable sentence**, listing exactly the six items the objection email must contain and the exact subject line (`"Subprocessor Objection"`). A GDPR right rendered as a fillable instruction rather than a statement that the right exists.

**`UPDATE:` as a title prefix** marks a revision to a standing artefact. Worth noting as a lightweight versioning convention in a notification stream.

**Status page** `[observed]`, shell only: tabs `Current Status` · `History` · `Subscribe`; heading `Current status`; section label `Incidents`; a welcome banner — "Welcome to Docusign's new status center. Make sure to subscribe for notifications."; resource headings `Docusign Support Center` and `Docusign Release Notes`. Subscription instructions are routed to a support article titled `System Status Alerts`.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.**

### The consent artefact: Electronic Record and Signature Disclosure (ERSD) `[observed]`

The ERSD is the document a signer must accept before any legally significant action, and it is the highest-stakes consent screen in the product. DocuSign's *default* template is not published on docusign.com, but customer-hosted copies of the generated default are public; the one harvested here is the standard template with a credit union's name merged in.

**Section headings, verbatim** — these are DocuSign's, not the customer's:

1. `Getting paper copies`
2. `Withdrawing your consent`
3. `Transaction speed will be slower if you elect to receive notices and disclosures only in paper format`
4. `All notices and disclosures will be sent to you electronically`
5. `How to contact <Company>:`
6. `To advise <Company> of your new email address`
7. `To request paper copies from <Company>`
8. `To withdraw your consent with <Company>`
9. `Required hardware and software`
10. `Acknowledging your access and consent to receive and sign documents electronically`

**The consent string itself, verbatim:**

> "select the check-box next to 'I agree to use electronic records and signatures' before clicking 'CONTINUE'"

And the three things the checkbox is stated to confirm are enumerated as bullets, summarised: that you can access and read the disclosure; that you can print it or save/send it somewhere printable; and that until you say otherwise you consent to transact exclusively electronically — with the final clause that your electronic signature "will be relied upon … as your original signature".

**Analysis — what this artefact gets right, and what it gets wrong.**

Right: **the withdrawal right is given a heading of its own and is placed second**, before the operative consent. ESIGN requires consent to be informed and withdrawable; most implementations bury withdrawal. Here it is heading #2 and it recurs as heading #8 with the actual procedure. Right again: **withdrawal is offered as an in-flow action**, not only as an email — "Decline to sign a document from within your signing session, and on the subsequent page, select the check-box indicating you wish to withdraw your consent". The unhappy path has a UI affordance, not just a postal address.

Right, and rare: **heading #3 states the cost of exercising the right.** "Transaction speed will be slower if you elect to receive notices and disclosures only in paper format" is a full-sentence heading — the longest in the document — that tells the user the consequence of choosing paper before they choose it. The body is explicit: "you will no longer be able to use the DocuSign system to receive or sign notices and electronic documents from us." That is honest, and it is also coercive framing; both readings are fair and a content designer should be aware they are the same sentence.

Wrong: the document opens with "may be required by law to provide you with certain written notices or disclosures" and never plainly says *this is your consent to do business electronically, and you can say no*. The plain-language summary that a GOV.UK-style writer would put first does not exist. Wrong also: the fee line renders as "for a charge of $0.00 per-page" when the customer sets no fee — a template variable producing a legalistic non-statement where "free" would do. And the retention line is hedged twice in nine words: "for a limited period of time (usually 30 days)".

**Document structure worth copying regardless:** every procedural heading is phrased as an infinitive of the *user's* goal — `To request paper copies…`, `To withdraw your consent…`, `To advise <Company> of your new email address`. The user scans for their intent, not for a clause number.

### Consent as a configurable product surface `[observed]`

From the features page: `Electronic record and signature disclosure` — "Configures and updates the Electronic Record and Signature Disclosure (formerly Consumer Disclosure) to be compliant with company policy, requiring signers to consent or **re-consent**". Two points. The rename from `Consumer Disclosure` is carried in parentheses. And **`re-consent` is a named product event** — consent has a version, and changing the disclosure re-triggers it. That is the correct model and most products lack a word for it.

### Legality guide `[observed]`

`/products/electronic-signature/legality` is a per-country legal encyclopaedia with a fixed five-section template: `E-Signature Legality Summary` · `Types of Permitted Electronic Signature` · `Documents That May be Signed Electronically` · `Further Guidance` · `Seminal Case Law`, plus a `Resources` link list and a `Last updated:` date (`January 20, 2026`). A 68-entry country selector sits at the top.

The notable editorial decision is `Further Guidance`, which is a **list of transaction types where DocuSign tells you to be careful about its own product**: Corporate Resolutions, Procurement, Bills of Lading, Healthcare, FDA Clinical Trials, Banking, Wire Transfer Agreements, Lending, Real Estate, Chattel Paper, Insurance, Documents to be Notarized, Documents to be Recorded, Government Filings. Framed as "While the use of electronic signatures is not prohibited for the following transaction types, caution should be exercised". Publishing a fourteen-item do-not-assume list, on a product page, in the sales funnel, is a real trust move.

Closing disclaimer is a single all-caps-led paragraph: "DISCLAIMER: The information on this site is for general information purposes only and is not intended to serve as legal advice…" It states that laws change quickly and DocuSign cannot guarantee currency — undercutting the page's own authority, immediately below a list of 2025 case citations.

### Pricing and billing disclosures `[observed]`

- Price displays as a large numeral with the period beneath: `$` `11` `/month`, then the binding total in bold: **"This is an annual commitment of $132."**, then "Additional tax may apply". Three lines: unit price, true commitment, tax caveat. Stating the annual commitment in bold directly under a monthly figure is the correct anti-dark-pattern construction.
- Billing-mode label: `Annual | Billed monthly`, with its own FAQ entry explaining it (see T12).
- Envelope allowances, verbatim: `Send 5 envelopes per month` (Personal); `Send a total of 100 envelopes per user per year` (Standard and Business Pro — identical text on both, and the Business Pro card lists it under "All Standard benefits, plus:" even though it is not a plus); `Customize your envelope limits to fit your exact business needs` (Enhanced). Comparison table row `Envelope sends`: `5 per month` / `100/user/year` / `100/user/year` / `Custom limit`.
- The consumption rule is stated twice and plainly: "Once an Envelope is sent, it will count toward this allowance **whether or not the Envelope is signed or completed**."
- Overage: "each Envelope used in excess is considered an 'additional' Envelope that will be billed in a 'Pay-As-You-Go' manner". Justified as continuity: "This ensures you can continue using your Docusign eSignature service without interruption to your business." No per-envelope overage *rate* is published — it is deferred to a blocked support article.
- Cancellation, verbatim and materially important: "You may cancel within 30 days of purchase without penalty by selecting Cancel Subscription in your Account Settings. If you cancel after the 30-day period, **you'll be required to pay the remaining balance on your annual subscription**, including any taxes or overage costs."
- Refund: 30 days for named annual plans, with the footnote "The 30-day refund option may only be used once per customer."
- Auto-renewal is stated affirmatively in answer to its own question (`Will my subscription renew automatically?` → "Yes").
- Compliance is priced: the table has rows for `eIDAS` with the values `SeS` / `SeS` / `SeS` / `AeS, SeS, QeS`, and rows for `HIPAA support through BAA`, `21 CFR part 11`, `FedRAMP moderate authorization & DOD IL4`, `Data residency` — all `Contact sales`. **Regulatory assurance level as a pricing tier** is the compliance-UX fact of this page, and it is presented as three bare acronyms with no gloss anywhere on the page.
- Footnote markers are typographic: `*`, `§`, `Δ`. `Δ` marks `SMS & phone authentication`; the footnote list does not visibly contain a `Δ` entry.

**Defect, material:** the eSignature product page's "Recommended plans for you" module lists `Personal $10 /month — $120 billed annually`, `Standard $25/month per user — $300 billed annually`, `Business Pro $40/month per user — $480 billed annually`. The pricing page lists `$11`, `$30`, `$45` and annual commitments of `$132`, `$360`, `$540`. **Two live pages, two different price sets, three plans each, with `Buy Now` links carrying different plan-billing IDs.** It also lists "900+ integrations" against the homepage and nav's "1000+".

### Other disclosure copy `[observed]`

- Sender identity, stated to prospects in the pricing FAQ: "Your agreement will be sent by email from dse@docusign.net." A specific, verifiable anti-phishing fact given as an answer to a different question.
- Recipients do not need an account — stated as its own FAQ (see T12).
- Footer legal set includes `Notice to California Residents` as a distinct link (an anchor into the privacy notice) and `Modern Slavery Act Statement`.
- Patent notice in the pricing footer: `Docusign Patents: US 8,239,496 B2`.

## T11 Help-centre architecture

`[documented]` — `support.docusign.com` is **blocked**. What follows is assembled from links on reachable pages and from literal search-result titles, and should be treated as a partial skeleton, not an IA map.

**Support is split across five distinct destinations**, each named separately in the Resources mega-menu `[observed]`: `Support Center` · `Customer Success` · `Docusign University` · `Trust Center & System Status` · `Safety Center`. Plus `Community` under a different group heading (`Connect`), and `Developer Center` under a third (`Build + extend`). A user with a problem has seven plausible front doors, grouped under three headings that do not distinguish them by problem type. This is the weakest IA decision visible in the harvest.

**Documentation is bundle-based.** Every support URL takes the form `/s/document-item?bundleId=<opaque>&topicId=<opaque>.html`. The bundle IDs are random strings (`ulp1643236876813`, `oeq1643226594604`, `gbo1643332197980`). There are no human-readable slugs and no browsable path segments, so the URL carries zero information and cannot be guessed, shared meaningfully, or crawled into a tree. Legacy readable URLs (`/en/guides/ndse-user-guide-welcome`, `/guides/signer-guide-signing-system-requirements`) still exist and 301 into the opaque form — evidence of a migration that traded IA legibility for a CMS.

**Guide names recoverable from links and search titles** `[documented]`: `Docusign eSignature User Guide` · a signer-facing guide covering `System Requirements for Signing` · role-partitioned landing pages titled `Administrators` and `Signers` · `Docusign eSignature Signing Process` · `Working With Templates` · `Add Fields` · `Field Properties (Accessible Tooltips)` · `AutoPlace Fields` · `Correct Envelopes` · `How Correct Works` · `Envelope Status` · `Recipient Status` · `Envelope Status Report` · `Sample Default Legal Disclosure` · `Enable the Electronic Record and Signature Disclosure for…` · `System Status Alerts` · `Accessibility at Docusign` · `Docusign Remote Online Notary Accessibility Statement`.

**Article-title grammar, from the sample available** — three shapes:

| Shape | Example |
|---|---|
| Bare object noun | `Envelope Status`, `Recipient Status`, `Correct Envelopes` |
| Imperative task | `Void or cancel a Docusign envelope`, `Enable the Electronic Record and Signature Disclosure` |
| `How do I …?` | `How do I upgrade or change my DocuSign plan?`, `How do I cancel or downgrade my account?` |
| `FAQ: <topic>` | `FAQ: Docusign Developer Templates, Envelopes, and Connect`, `FAQ Docusign overage charges` |

Contrast with Wise, which writes recovery articles in the user's first person (`I sent the wrong amount`). DocuSign's titles are overwhelmingly **system-object-first**. `How Correct Works` names the feature, not the situation; a user whose problem is "I sent it to the wrong email address" has to already know that the feature is called Correct.

**Note:** two of the three `How do I …?` titles reached me only as link text *on the pricing page*, and both are cancellation/downgrade articles — DocuSign links directly to its own churn documentation from the pricing FAQ rather than routing to a retention flow. That is a genuine, if small, good-faith signal.

**`community.docusign.com` is a separate high-volume surface** whose thread titles are visible in search and which is clearly where real failure language lives (`Completed envelopes still showing in action required`, `Signer said she signed. My account says still waiting for signature.`). Not harvested — user-generated content is out of scope for verbatim extraction, but the thread titles are a reliable index of where the status vocabulary confuses people, and they cluster almost entirely on the gap between `Completed` and the folder labels.

## T12 FAQs

`[observed]` — three separate FAQ blocks with fully expanded answers in server HTML, which is unusual and welcome.

### Block A — eSignature product page, heading `Electronic signature FAQs`, subhead "Learn e-signature definitions, what you can esign, and more."

| # | Question (verbatim) |
|---|---|
| 1 | What is an electronic signature? |
| 2 | What is a digital signature? |
| 3 | What's the difference between an electronic signature and a digital signature? |
| 4 | Are e-signatures legally enforceable? |
| 5 | What types of documents can be signed electronically? |
| 6 | How do recipients sign documents with Docusign eSignature? |
| 7 | What document formats does Docusign eSignature support? |

Structure: **definition → definition → disambiguation → legality → scope → recipient experience → file formats.** Four of seven questions are about the *category*, not the product. Q3 exists purely to resolve a confusion the FAQ itself created by asking Q1 and Q2 separately — and the answer opens by naming the confusion ("often conflated"). Q6 is the only question written from the recipient's side, and its answer opens with the reassurance "signing is always free".

### Block B — pricing page, heading `eSignature plans and pricing FAQ`

| # | Question (verbatim) |
|---|---|
| 1 | How do Intelligent Agreement Management (IAM) applications differ from eSignature plans? |
| 2 | What are 'envelopes' and how do they relate to my service subscription plan? |
| 3 | How do I purchase add-ons and how much do they cost? |
| 4 | How many envelopes can I send for signatures each month or year? |
| 5 | How do I upgrade, downgrade, or cancel my plan? |
| 6 | Will my subscription renew automatically? |
| 7 | Does everyone signing an agreement need to have a Docusign account? |
| 8 | How does Docusign protect my data? |
| 9 | Does Docusign offer a money-back guarantee? |
| 10 | What is "Annual | Billed monthly"? |

Ordering: upsell → **terminology** → add-ons → limits → lifecycle → renewal → recipient eligibility → security → refund → billing-mode. Q2 is placed second, before any commercial question, because `envelope` is the billing unit and the whole price list is unreadable without it. **Defining the coined term before quoting the price is the right order** and most pricing pages get it backwards.

Q4's answer is structurally the most interesting thing on the page: it is subdivided with its own `###` headings by plan (`eSignature Personal`, `eSignature Standard and Business Pro`, `Enhanced Plans`) — an FAQ answer that becomes a three-section document because the honest answer is conditional.

Q10 is a **glossary entry disguised as an FAQ** — the answer explains that you enrol for a year and pay monthly, and then, unprompted, supplies the cancellation penalty. Putting the worst-case consequence inside the definition of a billing label is good practice.

Q7 (`Does everyone signing an agreement need to have a Docusign account?`) is the one question in the set written from the *buyer's worry about their counterparty*. Answer leads with "No", then names the sending domain.

### Block C — Safety Center, heading `Frequently asked safety questions`

| # | Question (verbatim) |
|---|---|
| 1 | What does Docusign do to protect my data and defend against online threats? |
| 2 | How can I verify the authenticity of a Docusign transaction? |
| 3 | What's the best way to report a suspicious Docusign document or email? |
| 4 | What is phishing and how can I spot a fraudulent email? |

Only four, and note the sequence: capability → **user-executable verification** → reporting → education. Q2 and Q4 both hand the user a procedure rather than a reassurance. Q3 is a compound "what's the best way" framing that lets the answer lead with a prohibition ("do not click any links") rather than with the mechanism.

### Block D — legacy how-it-works page, heading `eSignatures FAQs`

Six questions, several now factually stale: `Are DocuSign's electronic signatures legally binding?` · `Are DocuSign's electronic signatures secure?` · `Are DocuSign's electronic signatures available outside of the U.S.?` · `What languages does DocuSign support?` · `Can I use DocuSign eSignatures on my smartphone or tablet?` · `Are digital signatures the same as electronic signatures?`

The answers reference "50 million users in 188 countries", "13 sending languages", "43 localized languages", "Windows Phone, and Windows stores", and the "European Directive 1999/93 EC" — which eIDAS repealed in 2016. **A public FAQ still citing a repealed directive as the compliance basis for a legally operative product** is the most serious content defect found in this harvest.

**Cross-block observation.** Q6 in Block A and Q7 in Block B ask essentially the same thing (does the recipient need an account / how do recipients sign) and answer it differently — Block A says signing is always free and describes the click-through; Block B says no account is needed and names `dse@docusign.net`. Neither answer contains the other's most useful fact.

## T13 Terminology & glossary

`[observed]`

| Term | DocuSign's usage | The alternative it rejected |
|---|---|---|
| `envelope` | The billing unit and the transaction container. Defined in the pricing FAQ: an electronic record containing one or more documents, with statuses, a sender, and timestamps | "transaction", "document", "request" — critically, **not** "document", because an envelope can hold many |
| `recipient` | The umbrella for anyone in the routing, signer or not | "signer" (which is a *recipient role*, not the general term) |
| `signer` | A recipient whose required action is signing | |
| `sender` | The account holder who dispatches | "requester", "originator" |
| `tag` / `field` / `tab` | **Three names for the drop-in element.** `tags` on legacy pages and in "20+ standard and custom tags and fields"; `fields` on current pages and in `Add Fields`; `tabs` in the signer instruction "Follow the DocuSign tabs" (and `tabs` is the API's term) | A single word |
| `correct` (verb) | Editing an in-flight envelope | "edit" — deliberately avoided; correction implies error and triggers re-initialling |
| `void` (verb) | Sender-side termination pre-completion | "cancel", "delete" — note the support article title hedges with both: `Void or cancel a Docusign envelope` |
| `decline to sign` | Recipient-side termination | "reject", "refuse" |
| `authoritative copy` | The unique, unalterable instance, scare-quoted then glossed | No plain-English substitute attempted — correctly |
| `certificate of completion` | The evidentiary artefact | Appears as `Certification of completion` in one heading |
| `Electronic Record and Signature Disclosure` / `ERSD` | The consent artefact | `Consumer Disclosure`, the prior name, retained in parentheses |
| `re-consent` | The event when a changed disclosure re-triggers acceptance | Unnamed in most products |
| `AutoPlace` | Anchor-text-relative field placement | `Anchor Tags`, retained in parentheses |
| `PowerForms` | Self-service, sender-less signable forms | "public form", "shareable link" |
| `Web Forms` | Data-collection front end that populates an agreement | Distinct product from PowerForms, with confusingly adjacent naming |
| `Bulk Send` | One document, many unique copies | "mail merge" |
| `Signing groups` | A pool where any member can act | |
| `Delegated signing` / `Shared access` / `Custody transfer` | Three distinct delegation models, separately named | A single "permissions" concept |
| `Delayed routing` / `Conditional routing` / `Serial, parallel and mixed routing` | The routing vocabulary | |
| `Supplemental documents` | Read-and-acknowledge attachments inside an envelope | "terms", "attachments" |
| `Signer attachments` | Files the *signer* uploads | Near-collision with the above; the only distinguisher is the possessive |
| `Responsive signing` | Mobile-reflowed document rendering | |
| `Agreement actions` | Post-signature automations | |
| `IAM` / `Intelligent Agreement Management` | The platform umbrella | "contract management" |
| `Iris` | The AI engine, a proper name | "Docusign AI" |
| `Agreement Manager` | Repository + analysis app. Note the accessibility hub still lists a VPAT for **`Docusign Navigator`**, the product's previous name, and one bento image filename is `ui-docusign-navigator-search.png` | |
| `Maestro` | Appears only in a VPAT filename and an image filename (`ui-docusign-maestro-workflow.png`); the user-facing name is now `Workflow Builder` | |
| `Quishing` | QR-code phishing, defined inline | Left undefined by most vendors |
| `Docusign` | Current house style: capital D, lowercase s | `DocuSign` — the pre-2024 form, still live on the legacy how-it-works page and in several PDF filenames |

**Two live renames leaking.** `Navigator` → `Agreement Manager` and `Maestro` → `Workflow Builder` are both visible in the same harvest, in VPAT titles, image filenames, and the accessibility hub's section headings. The accessibility hub has a section literally headed `### Navigator`. Product renames are normal; leaving the old name as a *section heading on a compliance page* is not.

**The rename that was handled well** is `Anchor Tags` → `AutoPlace` and `Consumer Disclosure` → `ERSD`, both carried as inline parentheticals in body copy. That is the pattern: keep the dead term visible in prose where users search for it, retire it from headings and labels.

## T14 Voice, tone & accessibility

`[observed]`

**Person and tense.** Second person for the customer throughout ("your agreements", "you can"), first-person plural for the company and used freely in the trust and safety copy ("We build safety directly into the platform's core architecture", "We take abuse very seriously", "We go the extra mile"). The company is a visible actor. Notably, the ERSD switches to first-person-plural *as the customer* ("we, us or Company"), so a signer reading the disclosure is being addressed by the DocuSign customer, not by DocuSign — a two-party voice that the artefact never explains.

**Register is corporate-declarative and largely humourless.** Contractions appear but sparingly ("it's", "you'll", "What's the difference"). Exactly one exclamation mark found in the entire harvest, on the stale legacy page: "You're done!". No `Oops!`, no jokes. The two colloquial CTAs (`Save the Date`, `Dive In Now`) are both on event/community cards, i.e. the lowest-stakes surface — the same stakes-gradient Wise shows.

**Tone flattens as stakes rise**, and the gradient is steep. Marketing: "Do (much) more with IAM", "Agreements made effortless", "Close faster with automated agreements". Compliance: "caution should be exercised before using electronic signatures". Consent: "your electronic signature will be relied upon … as your original signature". The ERSD contains no adjectives of enthusiasm at all.

**Sentence-case vs Title Case is not governed.** Same page, same component type: `Getting paper copies` (sentence case) beside `All notices and disclosures will be sent to you electronically` (sentence case) is consistent, but across the site `Plans & Pricing` / `Trust Center` / `Safety center` / `Accessibility Hub` / `Fraud resources` / `Platform safety` mix Title Case and sentence case in a single sub-nav strip. Safety Center's own four tabs are `Overview` · `Alerts` · `Fraud resources` · `Platform safety` — two Title Case, two sentence case.

**Accessibility content is genuinely strong and unusually specific** `[observed]`, from the Accessibility Hub:

- Named standards: `Web Content Accessibility Guidelines (WCAG) 2.2 Level AA` and `U.S. Government's Section 508 of the Rehabilitation Act of 1973 (amended 2018)`.
- **Contradiction:** the pricing comparison table's compliance section lists the row `WCAG 2.0 Level AA` as `Includes` for all four tiers. The hub claims 2.2; the price sheet claims 2.0. Two versions of the standard, two pages, no reconciliation.
- Programme is described as a list of nine concrete mechanisms rather than a values statement: annual auditing, developer and general training, an `Accessibility Champions Program`, a governance programme, user research with `Fable`, "Role-based Tasks guidance for content, development and design teams", `WCAG Interpretation documentation`, standardised linting, and an in-house `"A11Y Kit"` annotation tool. Naming the design system (`Ink Design System`) and the external auditor (`TPGi`) is checkable specificity.
- **Recommended browser and screen reader combinations** are published as concrete pairs: NVDA with Chrome or Firefox on Windows; VoiceOver with Safari on Mac and iOS. Telling a disabled user which combination the vendor actually tested is more useful than a conformance badge, and very few vendors do it.
- Per-product VPAT index with **ten separate conformance reports** (Signing, Sending, Navigator, CLM, Workspaces, Agreement Desk, Web Forms, Maestro, Notary, iOS). Publishing per-surface rather than per-company is honest — it admits the surfaces differ.
- Reporting route with a stated response time: "contact us at accessibility@docusign.com… We will review your feedback and get back to you within 3-5 business days." A committed SLA on accessibility feedback is rare.
- Opening framing includes ageing users, not only disability: "Our aging population and people with disabilities should have an experience that is as enjoyable as it is for those who don't rely on assistive technology."
- The features page's own accessibility entry is weaker and dated, citing only "the Americans with Disabilities Act (ADA) and Section 508 standards" and "sight- and hearing-impaired signers" — a narrower, older framing than the hub's, on a more-trafficked page.

**Other accessibility observations** `[observed]`: `Skip to main content` is first in DOM on every `www` page. Alt text on marketing imagery is descriptive and scene-level ("A man in a mustard-colored shirt sits indoors, engaged in a discussion about Docusign. Green plants are visible in the background."), and UI screenshots get functional alt ("UI displaying the Docusign Agreement Manager Search feature", "A configurable workflow in Docusign eSignature allows the user to set who an agreement routes to when criteria in other fields are met."). Several customer-logo images carry only the brand name as alt and at least one (`logo-2_1-remax.svg`) carries empty alt while its siblings carry names — inconsistent within one carousel. App-store badges carry full descriptive labels including the rating.

**Negative findings, recorded honestly**

1. Three labels for one trial destination: `Start for Free`, `Try for Free`, `Start Free Trial`.
2. Two live price sets for the same three plans: `$10/$25/$40` on the product page vs `$11/$30/$45` on the pricing page.
3. `900+ integrations` (product page) vs `1000+ pre-built integrations` (nav, homepage, pricing).
4. WCAG `2.2 AA` (accessibility hub) vs WCAG `2.0 AA` (pricing table).
5. One artefact, three names: `Certification of completion` / `certificate of completion` / `Certificate of completion`.
6. One object, three names: `tag` / `field` / `tab`.
7. `Alerts` used as a tab label in two different sub-navs for two different feeds.
8. Retired product names live on a compliance page: section heading `### Navigator`, VPAT titled `Docusign Maestro`.
9. `Send, sign, and track documents` repeated six times verbatim on the homepage.
10. The legacy `/how-it-works/electronic-signature` page is fully live and internally linked, uses the pre-2024 `DocuSign` capitalisation throughout, contradicts four current statistics, references Windows Phone, and cites **European Directive 1999/93/EC** — repealed by eIDAS in 2016 — as a compliance basis.
11. `/products/electronic-signature/pricing` is still linked but returns an empty body.
12. Status page renders `Loading...` as its incident content to non-JS clients.
13. A `Δ` footnote marker is used on the pricing table with no visible `Δ` entry in the footnote list.
14. `5-digit ZIP code` / `9-digit ZIP code` hard-coded as named validator types on a globally-served feature list.

---

## Transferable patterns

1. **Keep the legal word, gloss it in twelve words, scare-quote it once.** `authoritative copy`, `void`, `correct`, `decline` are all retained rather than plain-Englished, because each must survive being read in a dispute. The gloss goes inline the first time and then never again. Condition: this only transfers where the word has *evidentiary* weight. Do not import legalese into copy that will never be litigated — that is the failure mode this pattern enables.
2. **Split the status vocabulary in two: object-state for the record, whose-move-is-it for the UI.** `sent / delivered / completed / voided / declined` is what the audit trail needs; `Action Required / Waiting for Others / Needs to Sign` is what the human needs. Maintain both deliberately and map them explicitly, rather than letting one leak into the other's surface. Directly applicable to disputes, refunds, and any multi-party PayPal flow where "pending" currently does the work of five different states.
3. **Name the withdrawal right, place it second, and state its cost.** The ERSD's heading #3 — `Transaction speed will be slower if you elect to receive notices and disclosures only in paper format` — tells the user the consequence of exercising a right *before* they exercise it. Be aware this is simultaneously honest and coercive; the same sentence does both jobs. Relevant to any consent or opt-out screen.
4. **Give consent a version and a name for re-triggering it.** `re-consent` as a first-class product event means a changed disclosure is a state change, not a silent overwrite. Most consent implementations have no word for this and therefore no behaviour for it.
5. **Carry a rename as an inline parenthetical in prose, and purge it from headings.** `AutoPlace (formerly Anchor Tags)`, `Electronic Record and Signature Disclosure (formerly Consumer Disclosure)`. DocuSign does this well in body copy and badly in headings (`### Navigator`), which demonstrates both halves of the rule.
6. **Answer the objection as a heading, offer the smaller commitment, and restate it as the CTA.** `Not ready to send your first agreement?` → "Try sending a sample agreement with a free account." → `Send a Free Sample Agreement`. Three lines, zero persuasion, one lowered step.
7. **Publish a do-not-assume list inside the sales funnel.** The legality guide's `Further Guidance` names fourteen transaction types where DocuSign advises caution about its own product. Costly, credible, and rarely copied.
8. **Notify about non-events and bound the impact numerically.** "not expected to cause downtime … however we are notifying customers as a precautionary measure" and "briefly unavailable for up to 5 minutes". Announcing maintenance that will not hurt, and quantifying the maintenance that might, both buy trust cheaply.
9. **Publish the browser/screen-reader pairs you actually tested.** More useful to a disabled user than a conformance percentage, and it converts an accessibility claim into a checkable statement.
10. **Split how-it-works by role, not by chronology** — sender, signer, manager, each with its own three steps. Keep the grammatical mood consistent across all three, which is where DocuSign's own version fails.

## Caveats & gaps

- **The help centre is completely unreachable.** `support.docusign.com` is a Salesforce Experience Cloud app that returns a `Loading` / `Sorry to interrupt` / `CSS Error` shell to any server-side fetch, on both the modern `/s/document-item` URLs and the legacy `/en/guides/` and `/guides/` paths. Since that is where the entire envelope-status, recipient-status, error-message, and validation-message documentation lives, T5, T7, T8, and most of T6 and T11 are severely under-evidenced. A browser-rendered pass is required.
- **Developer docs returned empty bodies.** `developers.docusign.com` is Gatsby; both `/esign101/concepts/envelopes/status-codes/` and `/reference/envelopes/envelopes/` returned full metadata and no content. The canonical machine-readable status enumeration — which is the single artefact most worth having for this product — was not retrieved.
- **Some T6 state names are unverified.** `Waiting for Others`, `Needs to Sign`, `Action Required`, `Delivery Failure`, `Partial delivery`, `Authentication Failed`, and `Correcting` reached me only through search-result summaries, not through a page I fetched. The help-article *titles* they came from are literal search-result titles and are reliable; the state strings are not. They are marked in T6 and must be re-verified before use as precedent.
- **The ERSD quoted in T10 is a customer-hosted instance of DocuSign's default template**, not a copy served by DocuSign. The headings and the consent string are DocuSign-generated boilerplate (the company name is merge-filled), but an account administrator can edit the text, and a fee value in the harvested copy renders as `$0.00`, which is that customer's setting. Treat the *structure* as DocuSign's and the *values* as the customer's.
- **The signer experience is almost entirely unobserved.** `apps.docusign.com/sign/access` returned nothing, and the actual signing session — the ceremony screen, the adopt-signature dialogue, the `CONTINUE` / `FINISH` buttons, the decline flow, the disclosure modal — is the highest-value content surface in this product and was not reachable at all. Everything in T10 about the consent *interaction* is inferred from the disclosure's own description of it.
- **The status page is a shell.** Incident-language conventions, severity labels, and component names were not retrievable.
- **No email copy.** Envelope notification emails, reminder emails, completion emails, and the `Report Email` footer link are all invisible from the public web, and they are arguably where DocuSign's most-read UX copy lives.
- **Pricing observed at en-US only**, on the `ecom` subdomain with `x-app-geo: US`. Plan structure and envelope allowances differ by market and none of the 15 other locales were checked.
- **CLM, Iris, Agents, Notary, Workspaces, and Web Forms** were not harvested as products. IAM pricing (`/plans-and-pricing/iam`) was not fetched.
- No mobile-app strings, no in-product empty states, no toasts, no validation messages.

## Sources

1. https://www.docusign.com/
2. https://www.docusign.com/products/electronic-signature
3. https://www.docusign.com/products/electronic-signature/features
4. https://ecom.docusign.com/plans-and-pricing/esignature
5. https://www.docusign.com/products/electronic-signature/legality
6. https://www.docusign.com/trust
7. https://www.docusign.com/accessibility
8. https://www.docusign.com/safety
9. https://www.docusign.com/how-it-works/electronic-signature
10. https://status.docusign.com/ (redirects to https://health.docusign.com/status) — shell only
11. https://assets.edfed.org/img/www/legal/disclosures/general/DocuSign%20Legal%20Disclosure.pdf — DocuSign default ERSD, customer-hosted
12. https://support.docusign.com/ — blocked
13. https://support.docusign.com/en/guides/ndse-user-guide-welcome — blocked
14. https://support.docusign.com/s/document-item?language=en_US&bundleId=oeq1643226594604&topicId=wdm1578456348227.html — blocked
15. https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/envelopes/status-codes/ — empty body
16. https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/ — empty body
17. https://apps.docusign.com/sign/access — empty body
18. https://www.docusign.com/products/electronic-signature/pricing — empty body
