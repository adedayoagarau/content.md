# 192. Dropbox Sign

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | E-signature (standalone product inside a file-storage portfolio) |
| Primary URL | https://sign.dropbox.com/ |
| Corpus rank | 192 |
| Benchmark strength (source list) | Signature guidance and status |
| Locale / market observed | en-US (help centre offers 23 locale variants per article) |
| Platform observed | Web (Webflow marketing site), Dropbox AEM help centre, Fern-hosted developer docs |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | US ESIGN Act (named explicitly in the pricing FAQ); eIDAS including QES as a shipped feature; GDPR; SOC 2 Type II; ISO 27001; ISO 9001; HIPAA and CPA badges in the footer; data residency as a Premium feature |
| Harvest date | 2026-09-21 |
| Pages inspected | 15 fetched successfully, 3 attempted and empty |
| Harvest completeness | **Full for the priority sections, partial elsewhere.** The developer documentation at `developers.hellosign.com` is unusually complete — it publishes a seven-part domain glossary, a full warning/error catalogue, and a full callback-event inventory in plain HTML with `.md` variants — so T6, T7, T10 and T13 are exceptionally well evidenced. The Zendesk-era help centre at `faq.hellosign.com` returns empty bodies for its index and category pages; the content has migrated to `help.dropbox.com`, which is fully readable |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Features | https://sign.dropbox.com/features | Global nav, hero, feature cards, three-tier comparison table with tooltip glosses, 5-question FAQ, footer |
| Plans and pricing | https://sign.dropbox.com/products/dropbox-sign/pricing | Plan names, prices, promo banner, ~30 feature rows with tooltips, 8-question FAQ, offer terms |
| Help centre — Dropbox Sign index | https://help.dropbox.com/sign | 36 category headings, ~250 article titles |
| Help — check status | https://help.dropbox.com/share/check-signature-request-status | Observed in-product nav labels |
| Help — decline | https://help.dropbox.com/share/how-to-decline-a-signature-request | Observed decline flow, warning note, irreversibility copy |
| Help — payment failure | https://help.dropbox.com/plans/what-happens-when-my-dropbox-sign-payment-fails | Dunning timeline, limited-access feature matrix, cancellation consequences |
| Legacy help article (Zendesk) | https://faq.hellosign.com/hc/en-us/articles/115010744688-How-to-check-the-status-of-a-signature-request | Still live, duplicates the `help.dropbox.com` article |
| Dev — Signature Request | https://developers.hellosign.com/api/signature-request | Endpoint inventory, warning callout |
| Dev — Glossary: Core Objects | https://developers.hellosign.com/api/manual-reference-pages/glossary/core-objects | Object definitions with explicit "Important Distinctions" |
| Dev — Glossary: Signers & Roles | https://developers.hellosign.com/api/manual-reference-pages/glossary/signers-roles | Signer/Sender/CC/Role/Signing Order |
| Dev — Glossary: Workflows | https://developers.hellosign.com/api/manual-reference-pages/glossary/workflows | Embedded signing, unclaimed drafts, bulk send, OAuth, test mode |
| Dev — Glossary: Callbacks & Events | https://developers.hellosign.com/api/manual-reference-pages/glossary/callbacks-events | **Full 13-event signature-request lifecycle inventory** |
| Dev — Glossary: Security & Compliance | https://developers.hellosign.com/api/manual-reference-pages/glossary/security-compliance | Audit-trail event table, QES comparison, quotas |
| Dev — Warnings and Errors | https://developers.hellosign.com/api/manual-reference-pages/warnings-and-errors | 20 warnings, 20 errors, 5 async error events, each with cause/remediation/retryability |
| Dev — Expiration | https://developers.hellosign.com/api/manual-reference-pages/expiration | Expiry semantics, signature `status_code` values, reminder cadence, email set |
| Pricing (short path) | https://sign.dropbox.com/pricing | **Empty body** — the live path is `/products/dropbox-sign/pricing` |
| Legacy help index | https://faq.hellosign.com/hc/en-us | **Empty body** |
| Legacy help category | https://faq.hellosign.com/hc/en-us/categories/200353538-Dropbox-Sign | **Empty body** |

---

## T1 Navigation & IA labels

`[observed]`

**Global nav is five items, and two of the five are grouped by user intent rather than by product** `[observed]`:

`Why Dropbox Sign?` · `Products` · `Resources` · `Developers` · `Pricing`, plus `Contact sales` · `Sign up` · `Sign in` · `Free trial`.

`Why Dropbox Sign?` is the only nav label on the site that is a **question with a question mark**, and it opens onto two sub-groups whose headings are both user-framed:

- `## What you can do` → `Sign documents online` · `Create electronic signatures` · `Choose or create templates` · `Fill and sign PDFs` · `Complete online contracts` · `Document management` · `Explore features`
- `## Use cases` → `Sales and business development` · `Human resources` · `Startups` · `Financial technology` · `Real estate` · `On-demand services`

Six of the seven "What you can do" items are **verb phrases in the user's voice**. The seventh, `Document management`, is a noun phrase — the odd one out, and notably the least concrete.

**Product menu items carry a one-line gloss** `[observed]`: `Sign` — "Make it easy to send and sign"; `Sign API` — "Integrate eSign in your workflow"; `Fax` — "Send faxes without a fax machine"; `Integrations` — "We meet you where you work".

`Send faxes without a fax machine` is the most efficient gloss on the site: it names the product, the task, and the objection it removes, in six words. `We meet you where you work` is a first-person-plural promise used as a product description, and it is reused verbatim as body copy on the features page.

**Resources menu** `[observed]`: `Blog` — "Workflow expertise & product news"; `Customer stories` — "Real-world stories with real results"; `Help center` — "In-depth guidance for our products"; `Resource library` — "Reports, videos, and info sheets".

**Pricing menu** `[observed]`: `Dropbox Sign pricing` — "Find the right plan for you"; `Dropbox Sign API pricing` — "Real-world stories with real results".

**Defect.** The API pricing gloss is "Real-world stories with real results" — a **copy-paste of the Customer stories gloss**, in the pricing menu, describing a price list. It appears identically on both the features page and the pricing page, so it is not a rendering artefact.

**Footer group headings** `[observed]`: `Products` · `Why Dropbox Sign` · `Support` · `Resources` · `Partners` · `Company`, plus `Accepted payment methods` and `Select language:`.

**Defect, and a significant one.** The `Why Dropbox Sign` footer group links to seven pages whose URL path segment is `/what-is-hellosign/` — `sign.dropbox.com/what-is-hellosign/electronic-signatures`, `/what-is-hellosign/sign-word-document`, and five more. The same pages are reachable from the top nav under `/features/`. The retired brand is preserved in live, linked, indexable production URLs.

**Worse defect.** The pricing page footer closes with a compliance sentence — "Dropbox Sign electronic signatures are legally binding in the United States, European Union, United Kingdom, and in many countries around the world." — whose two links point at **`hellosign-prod.webflow.io/terms` and `hellosign-prod.webflow.io/privacy`**. A Webflow staging preview domain, carrying the legacy brand, serving the Terms and Privacy links directly beneath a legal-effect claim. This is the single most serious finding in this file.

**Help-centre IA is Dropbox's, not Dropbox Sign's** `[observed]`. `help.dropbox.com/sign` renders inside the generic Dropbox help shell whose primary nav is `Account` / `Using Dropbox` / `Products` / `Get started`, with Dropbox Sign as one of seven entries under `Products` alongside `Dash`, `Protect`, `DocSend`, `Backup`, `Replay`, `Transfer`. The URL slugs betray this: the "how to decline a signature request" article lives at `/share/`, and the "check status" article also lives at `/share/` — the same top-level bucket as file sharing. See T11 for the full consequence.

## T2 Value proposition & headline patterns

`[observed]`

**Features page hero** — headline names the outcome in money and time, not the capability:

> `eSignature features that save you time and money`
> "Discover the eSignature features that let you sign documents online in seconds."
> CTA: `Try it free`

**Pricing page hero** — headline is a promise plus a negation:

> `Unlimited signature requests with no hidden fees`

The `with no hidden fees` clause is doing the work. Dropbox Sign's whole commercial positioning is *per-seat, not per-envelope*, which is the direct opposite of DocuSign's envelope-allowance model. The headline states the differentiator as an absence. The pricing table then repeats it as a feature row, `Unlimited signature requests`, with a tooltip that argues the point out loud: "Send without limits! With Dropbox Sign, there is no worrying about overages or sending out too many signature requests—you'll always have as much as you need."

That tooltip is the one place on the site with an exclamation mark and a colloquial register, and it is placed precisely where the competitor comparison happens. Tone is being used as a differentiator marker.

**Section headings are declarative sentences with full stops** `[observed]`:
`Your data is safe, secure, and certified.` · `Dropbox Sign is ranked #1 by G2` · `Digitize your business with eSignature today.` · `Start signing today.` · `Discover what you can do with Dropbox Sign` · `Spend less time context switching and more time working from the apps you already use`

The full stops on `Your data is safe, secure, and certified.` and `Start signing today.` are inconsistent with `Dropbox Sign is ranked #1 by G2` and `Dropbox Sign features` on the same page. Punctuation of headings is ungoverned.

**The four headline features, each a noun phrase plus a benefit-first paragraph** `[observed]`: `Reusable templates` · `No-code integrations` · `Customizable experiences` · `Qualified electronic signatures`.

Putting **QES fourth in a four-card set on a general marketing page** is a notable positioning choice — it is an EU regulatory instrument presented as a consumer-grade feature, glossed as "the most secure form of eSignature under eIDAS".

**Proof framing is third-party and specific** `[observed]`: "G2 customer reviews ranked Dropbox Sign #1 for ease of use four years in a row." The claim is attributed, scoped to one dimension (ease of use, not overall), and time-bounded. Compare DocuSign's unattributed internal statistics.

**The "spend less time" construction recurs**: "Spend less time context switching and more time working from the apps you already use" (pricing), "Spend less time recreating frequently used documents" (features tooltip), "you'll spend up to 80% less time pushing paper and more time cultivating your business" (FAQ answer). A three-times-repeated *less X / more Y* frame.

## T3 CTA inventory

`[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try it free` | Features hero, features page footer band | |
| `Start free trial` | Pricing cards, Essentials and Standard | |
| `Start your free trial` | Pricing page footer band | **Fourth variant** |
| `Try for free` | Features page plan cards | **Fifth variant** |
| `Get started` | Features page, API plan cards only | Used for the API product specifically |
| `Get started for free` | Features FAQ answer, inline | |
| `Free trial` | Global nav, right-hand slot | |
| `Sign up` | Global nav, twice (desktop + mobile) | |
| `or purchase now` | Pricing cards, **below** `Start free trial`, lowercase | Secondary path for buyers who do not want a trial, deliberately de-emphasised by lowercase and by starting with "or" |
| `Purchase Now` | Pricing page, mobile variant of the same control | **Title Case where the desktop variant is lowercase** — same action, two casings, one page |
| `Contact sales` / `Contact Sales` | Nav, Premium card, footer | **Both casings appear in the same nav block** |
| `Sign in` | Global nav | |
| `View pricing` | Features page plan cards | |
| `View all Dropbox Sign features` / `View all Dropbox Sign API features` | Features page anchors | Names the object |
| `Visit our features page` | Pricing page cross-sell card | |
| `Check out API pricing` | Pricing page cross-sell card | |
| `Try our free plan` | Pricing page, under `Just need to sign a document?` | **Objection-as-heading pattern**, same shape as DocuSign's |
| `Explore features` | Nav sub-menu | |
| `See all integrations` | Nav sub-menu | |
| `Learn more` | Features page, security section | The one bare instance found |
| `Skip to main content` | First in DOM | Accessibility |
| `Email our support team` | Features/pricing FAQ, last question | Deliberately last and inline, not a button |
| `Review & Sign` | Signature-request email → signer entry | `[documented]` — the recipient's primary CTA, named in the decline article |
| `Decline` | Signer overflow menu, and the confirm button | `[documented]` — **the same word labels both the menu item and the destructive confirm**, which removes the confirmation step's ability to differentiate itself |
| `Submit feedback` | Help-article feedback widget | |
| `Yes, thanks!` / `Not really` | Help-article "Was this article helpful?" | See T14 |

**Observation.** Five distinct labels for the free trial — `Try it free`, `Start free trial`, `Start your free trial`, `Try for free`, `Free trial` — plus `Get started` and `Get started for free` for the adjacent API trial. Seven trial-adjacent labels across two pages. This is a worse case than DocuSign's three, and it is on a smaller site.

**The one genuinely good CTA decision**: `or purchase now` set in lowercase beneath `Start free trial`. It offers the high-intent buyer a bypass without competing visually with the primary path, and the leading "or" makes the relationship between the two explicit. Undermined by the mobile variant being `Purchase Now`.

## T4 Onboarding & getting-started

`[documented]` for the product flow; `[observed]` for the marketing description.

There is no numbered how-it-works sequence on the marketing pages. The process is described once, in a single FAQ answer `[observed]`, and the description is notably mechanical:

> `How does Dropbox Sign work?` — summarised: upload a document, use drag-and-drop so signing areas are highlighted, add the signer's email address, click to send; signatories get regular reminders until they sign; document history is managed in one place.

The answer ends by routing to a video rather than to a step list. The absence of a step sequence on a product whose whole proposition is procedural simplicity is a real gap.

**The named flow inside the product is `Prep and Send`** `[documented]`, from the developer glossary: "A user prepares documents, places fields, adds signers, and sends directly from the Dropbox Sign UI (the 'Prep and Send' flow)." That is a coined name for the core task that appears nowhere on the marketing site.

**Four documented ways to create a request** `[documented]`, from the Workflows glossary: via the web app (`Prep and Send`), via API direct send, via API with Template, via Unclaimed Draft. The fourth is the interesting one — see T13.

**Getting-started routing is split and duplicated** `[observed]`, in the footer `Support` group: `Getting started: Dropbox Sign` → a help article; `Getting started: Dropbox Sign API` → the API quickstart. Two products, two entry points, parallel naming. Clean.

## T5 Form & field labels

`[observed]` for the field-type vocabulary; `[documented]` for in-product labels.

**The drop-in elements are called `signer fields`, consistently** `[observed]`. Unlike DocuSign, Dropbox Sign has one word for this object and uses it everywhere: the pricing row is `Signer fields w/ data validation`, the features row is `Signer fields`, the help article is `Signer fields in Dropbox Sign`, the API glossary calls them `Form Fields`. Only the developer surface diverges, and it diverges once.

**Field types named** `[observed]`, from the pricing tooltip: "signature blocks, text fields, checkboxes, dates, and more". Features tooltip: "Drag-and-drop signature blocks, text fields, checkboxes, dates, and more onto your documents."

**Advanced field vocabulary** `[observed]`, pricing tooltip for `Advanced signer fields`: "conditional logic, drop-downs, masked fields, clickable links, and more".

**`Signature types`** `[observed]` is the named concept for how a signature is produced: "Add legally binding eSignatures to your documents by typing, drawing, or uploading." Three verbs. The API confirms the same three plus a fourth as configuration flags — `draw`, `type`, `upload`, `phone`, with a `default_type` — so `phone` is a fourth signature type not mentioned on the marketing site.

**Data validation** `[observed]`: "Validate signer fields in real-time based on criteria that you determine to make sure you're collecting accurate data." Note the second-person possessive ("criteria that you determine") — the sender is told the rules are theirs, which is doing responsibility-allocation work.

**Merge fields vs form fields is an explicitly maintained distinction** `[documented]`: a Template "May contain Merge Fields for dynamic content" and separately "Contains one or more Documents with pre-placed Form Fields". Two named field families with different lifecycles.

**Field-related help-article titles** `[documented]`: `How to group checkboxes in Dropbox Sign` · `How to use custom regex in Dropbox Sign` · `How to Auto-Fill fields in Dropbox Sign` · `How to align fields in Dropbox Sign` · `How text flows in Dropbox Sign text boxes` · `Mask fields in a document with Dropbox Sign` · `Retrieve and view masked data in Dropbox Sign` · `Add merge fields to a template in Dropbox Sign` · `How to use AI Auto-place Fields in Dropbox Sign` · `Adding clickable links to requests in Dropbox Sign`.

`How text flows in Dropbox Sign text boxes` is a good title — it documents a *behaviour* the user will observe and be puzzled by, rather than a task.

**Placeholder text, hint text, and validation messages** were not retrievable. `[absent]`

## T6 Status & state language

**PRIORITY SECTION.** Unusually well evidenced, because Dropbox Sign publishes its full lifecycle event set and signature status codes as developer documentation in plain HTML.

### The signature-level status codes `[documented]`, from the Expiration reference

Four values appear verbatim in the published JSON examples and prose:

| `status_code` | Meaning as stated |
|---|---|
| `awaiting_signature` | The default in-flight state, shown in the published Signature Request response example |
| `signed` | "Signers that completed signing before expiration will be marked with `"status_code": "signed"`" |
| `expired` | "for each signer who has yet to sign the signature request, they will be marked `"status_code": "expired"`" |
| `declined` | Named as a peer final status: "it is considered to be in a final status like `declined` and `completed` signature requests" |

Plus `completed` at the request level, and three boolean flags on the request object that together encode its state: `is_complete`, `is_declined`, `has_error`.

**The most important structural fact:** status lives at **two levels** and they are named differently. Each *signature* carries a `status_code`; the *request* carries booleans and a derived overall status. The docs state this explicitly — after expiry, "each signature on the signature request that is not been completed will enter the expired status, and the overall signature request will be considered expired." (Note the grammar error in DocuSign's competitor's own sentence: "that is not been completed". Recorded verbatim; it is theirs.)

### The 13-event signature-request lifecycle `[documented]`

This is the complete inventory, from the Callbacks & Events glossary:

| Event type | Description (verbatim) | When it fires (verbatim) |
|---|---|---|
| `signature_request_sent` | Request was sent to signers | Initial send or resend |
| `signature_request_prepared` | Request is ready for signers | Setup/processing complete |
| `signature_request_viewed` | A signer viewed the request | Signer opens the signing page |
| `signature_request_signed` | A signer completed signing | One signer finishes their fields |
| `signature_request_all_signed` | All signers have signed | Last signer completes required fields |
| `signature_request_downloadable` | Final PDF is ready | Document generation is complete |
| `signature_request_declined` | A signer declined | Signer explicitly declines |
| `signature_request_reassigned` | Request reassigned to new signer | Signer reassigns to someone else |
| `signature_request_remind` | A reminder was sent | Sender triggers a reminder |
| `signature_request_canceled` | Request was cancelled | Sender cancels the request |
| `signature_request_email_bounce` | Signer email bounced | Email delivery failed |
| `signature_request_invalid` | Request has an error | Processing or validation error |
| `signature_request_expired` | Request passed expiration date | Expiration date reached |

And the documented happy path, published as an ordering diagram:

`signature_request_sent` → `signature_request_viewed` (per signer) → `signature_request_signed` (per signer) → `signature_request_all_signed` → `signature_request_downloadable`

### Analysis: the `all_signed` / `downloadable` split is the key design decision

Dropbox Sign refuses to collapse "everyone has signed" and "the document is ready" into one state. The docs argue the case at length and in three separate places:

- On the Core Objects page, as an Important Distinction: "`is_complete` does not mean files are immediately downloadable. Wait for the `signature_request_downloadable` callback event before attempting to download."
- On the Callbacks page: "`signature_request_downloadable` means Dropbox Sign has finished generating the final files. Document generation can take extra time after all signers finish, especially for larger or more complex documents."
- Implicitly in the `conflict` (409) error, whose cause is "the target resource is in a state incompatible with the request (e.g. a signature request is still being set up)".

This is exactly the gap Wise papers over with a help article ("Why does it say my transfer's complete when the money hasn't arrived yet?"). Dropbox Sign instead **models the gap as two named states** and tells integrators which one to trust for which purpose. For a content designer the lesson generalises: where the system-true moment and the user-true moment differ, naming both is better than renaming one.

The cost is that `all_signed`, `is_complete`, and `completed` are three near-synonyms for overlapping-but-distinct things, and the docs never fully reconcile them.

### Terminal states and their asymmetric consequences `[documented]`

Three terminal states — `completed`, `declined`, `expired` — plus `canceled`. Expiration is documented as having **the same access semantics as decline**: "All parties to the signature request will still have access to the document including audit trail, similar to `declined` signature requests. They will not be able to sign or modify the signature request additionally at that time, and won't have access via the Signer App."

Deliberately preserving read access after a failure state, and saying so, is the right call for an evidentiary product: a declined agreement is itself evidence.

### Decline is the richest state transition `[observed]`, from the help article

The full documented decline flow: open the email → `Review & Sign` → the `⁝` vertical-ellipsis menu → `Decline` → "Fill out your reason for declining" → `Decline`.

The warning, verbatim:

> "You're required to fill out a reason for declining to sign. Declining to sign the document will clear anything you've entered and notify the sender. You won't be able to go back and view or make edits to the document after declining the signature request."

Three consequences in three clauses, in order of increasing severity: your input is discarded → the other party is told → you cannot return. Then the resolution sentence: "The document is now closed. You and the sender will receive an email notification confirming your decision."

`The document is now closed.` is a good state-change sentence — present tense, four words, states the new state rather than the action taken. And **the reason is mandatory**, which is a state-design decision with evidentiary consequence: a declined agreement in Dropbox Sign always carries a recorded reason, which the Audit Trail table confirms ("Request declined | Timestamp, reason (if provided)" — though note the audit-trail table's "(if provided)" contradicts the help article's "You're required").

### Other observed state vocabulary

`[observed]` from the help articles: the left sidebar is `Documents`; the mobile home screen item is `Signature requests`; the mobile-web list is `Pending your signature`. **Three different names for the same object in three surfaces of one product** — the request is a *document* on web, a *signature request* on the mobile app, and something *pending your signature* on mobile web.

`[observed]` from the pricing table, `Performance dashboards` tooltip: "what percentage get **completed, declined, or canceled**". That is the buyer-facing three-state summary, and it drops `expired` — the same selective-disclosure pattern DocuSign shows.

`[documented]` non-signature states: `on hold` (a request from an unconfirmed account is "placed on hold until the user confirms their email address", released via `Release On-Hold Signature Request`); `Unclaimed Draft` with its own lifecycle `Created (Draft) → Claimed → Active Signature Request`, plus `Expired (if not claimed in time)`; `has_error` as a distinct request state.

**Fax states** `[documented]` are worth recording because they are a rare example of a product naming *telephony* failure modes precisely: `fax_received` · `fax_sent` · `fax_on_hold` · `fax_busy` · `fax_no_answer` · `fax_disconnected` · `fax_blacklisted`. Four distinct failure states for one delivery attempt, each with a physical-world cause. Most products would ship one "delivery failed".

### Audit-trail event vocabulary `[documented]`

Fourteen recorded event types, each with stated captured details: Request created · Document uploaded (with SHA-256 hash) · Request sent · Signer viewed (timestamp, IP, user agent) · Signer signed (timestamp, IP, signature image) · Signer authenticated · Signer delegated · Signer email/name updated · Request completed · Request declined · Request cancelled · Request expired · Request edited and resent · Signer removed · QES sent/declined.

This is the *evidentiary* vocabulary, and it differs from the callback vocabulary — `delegated` and `removed` appear here but not as callback events; `reassigned` appears as a callback but the audit trail calls it `delegated`. **Two names for one act across two artefacts of the same product.**

## T7 Error, failure & recovery

`[documented]`, and unusually complete.

### The published error catalogue is the artefact

Dropbox Sign publishes 20 warnings and 20 errors, and for **every error** it publishes six fields: HTTP code, description, cause, remediation, retryability, and backoff guidance. The retryability values are themselves a small controlled vocabulary with published definitions:

> **No** — "retrying the same request will not succeed; fix the request or state first."
> **Yes** — "the request can be retried as-is after waiting."
> **Conditional** — "retry only after resolving the underlying state (and with backoff)."

**This is the transferable artefact.** Most error documentation gives a code and a description. Dropbox Sign gives, for each error, *what the user should do* and *whether doing it again will help* — and defines "whether doing it again will help" as a three-value enum rather than leaving it to prose. A content designer writing in-product error messages has, in principle, a machine-readable answer to the hardest question in error copy: is the recovery action "try again" or "change something"?

It is also published as structured data — `x-error-codes` and `x-error-events` extensions in the OpenAPI spec — with the stated rationale "so you can branch on errors without scraping this page". The error catalogue is treated as a product surface with consumers.

### Selected errors, verbatim descriptions

| Error | Code | Description (verbatim) | Retryable |
|---|---|---|---|
| `bad_request` | 400 | The request contained invalid or malformed parameters. | No |
| `payment_required` | 402 | The account must be credited or upgraded to perform this action. | No |
| `conflict` | 409 | The request was well-formed but conflicts with the current state. | Conditional |
| `deleted` | 410 | The request was cancelled or deleted. | No |
| `unprocessable_entity` | 422 | The request was understood but the target entity cannot be processed. | Conditional |
| `exceeded_rate` | 429 | Your account's API request rate limit has been exceeded. | Yes |
| `max_faxes` | 429 | Too many fax transmissions are currently pending or transmitting. | Yes |
| `unavailable` | 503 | The service is temporarily unavailable. | Yes |
| `maintenance` | 503 | The request could not be completed because the site is under maintenance. | Yes |
| `invalid_reminder` | 400 | The signature request reminder was invalid. | No |
| `signature_request_cancel_failed` | 400 | The signature request could not be cancelled. | No |
| `signature_request_remove_failed` | 400 | Access to the signature request could not be removed. | No |
| `signature_request_expired` | 400, 403 | The signature request has expired. | No |
| `unknown` | 500 | An unexpected error occurred. | Conditional |

Three of these deserve comment.

**`deleted` (410)** has the remediation "Do not retry; the resource is permanently gone." A four-word absolute in a remediation field. Most products hedge here.

**`signature_request_remove_failed`** is a state-ordering error with a genuinely useful remediation: "Wait until all parties have signed, or call `/signature_request/cancel` to cancel incomplete requests instead." It names the *alternative action* for the state the user is actually in, rather than only saying no.

**`signature_request_expired`** returns two different HTTP codes depending on endpoint — "Most endpoints return 400; final-copy/download endpoints return 403" — and the docs say so rather than picking one and hiding the exception.

### Asynchronous errors are a separate, named category

Five events that arrive as webhooks rather than responses: `signature_request_invalid` · `template_error` · `file_error` · `sign_url_invalid` · `unknown_error`. Introduced with the explanatory sentence "Some errors are not returned as an HTTP response. Instead they are delivered asynchronously to your callback URL as a webhook". **Separating synchronous from asynchronous failure and giving each its own table** is a taxonomy decision worth copying anywhere a system has deferred processing.

### Warnings are a distinct severity with distinct grammar

All 20 warnings describe a **request that succeeded with a caveat**, and the grammar is consistent: state what happened, then state the consequence. Examples:

- `parameter_ignored` — "One of the request parameters was ignored because it wasn't being used correctly"
- `deprecated_parameter` — "A parameter was provided which we no longer support. The value will be ignored."
- `parameter_conflict` — "Two parameters have been provided which are in conflict. One parameter will be ignored."
- `parameter_missing` — "An essential parameter was missing from the request and has been set to a default value."
- `partial_success` — "The operation succeeded, but at least one non-essential part of the request failed."
- `form_fields_overlap` — "Two or more of the form fields specified are overlapping, which may prevent signers from completing the document."
- `custom_field_value_too_long` — "The value provided for a custom field is too long. The custom field will extend beyond the limits of its container and may not display the way you intended."
- `non_pdf_text_tags` — "Text Tags were enabled for a file that is not a PDF, which may result in imprecise positioning."
- `test_mode_only` — "A parameter was provided which will affect your app in test mode but will not affect it in production. Upgrade your account to use in production."
- `value_too_precise` — "The value for the parameter had a level of precision too high"

`custom_field_value_too_long` and `form_fields_overlap` are the standouts because they describe a **downstream human consequence**, not a technical one: the field will overflow its container and "may not display the way you intended"; overlapping fields "may prevent signers from completing the document". The warning is written from the position of the signer who will hit the problem, not the developer who caused it.

The documented example warning message is also good: `"This SignatureRequest will be placed on hold until the user confirms their email address."` — future tense, states the state change and the unblocking condition in one sentence.

### Human-facing failure: the dunning sequence `[observed]`

From the payment-failure article, and this is the best-structured failure narrative in the harvest:

- "If your payment fails, you have 17 days to update your payment details **with no consequences to your account**."
- "First, we'll try to bill you for three days after your renewal date. You'll then enter a 14-day grace period, during which we'll keep trying to bill you." — 3 + 14 = the 17 already promised. The total is given first, then decomposed.
- "We'll also send email notifications to flag the failed payment. A banner alert will appear on your account when you or your team log in, telling you to update your billing details or contact your admin." — the article tells the user in advance **which notification surfaces they will see**.
- "After this 17-day period, your account will be kept open but you'll only have limited access."

Then `limited access` is defined as a concrete feature matrix, split three ways by role (individual user / team admin / team member), each a bullet list of what you **can** do. Leading with capability rather than restriction in a punitive state is a deliberate and unusual choice.

And the resumption rules are stated as a two-branch conditional: "If you resume your plan within 17 days of the failed payment, the billing period stays the same. If you resume after 17 days, the billing period changes and starts on the date your billing information is updated."

**Defects in this otherwise strong article.** The team-member list contains both "Create new templates" and, four bullets later, "Can't create more templates" — a direct self-contradiction in one bulleted list. And the sentence "Your billing period may change after the update.:" ends with a full stop followed by a colon.

**Irreversibility is stated plainly** `[observed]`: "**Note:** Canceled subscriptions can't be retrieved or reinstated." Six words after the note label. No softening.

### Troubleshooting IA `[documented]`

Help-centre category `Troubleshooting signature and fax issues`, plus `Troubleshooting access issues` and `Troubleshooting sync issues`. Article titles include `Troubleshoot template links in Dropbox Sign` and `Where is the scroll bar in Dropbox Sign?`.

`Where is the scroll bar in Dropbox Sign?` is the best help title in this harvest. It is the user's literal question, in their words, about a UI element that is missing — and shipping a help article rather than fixing the scroll bar is itself a recorded finding.

## T8 Empty states

`[absent]` for real product empty states — with two accidental-string findings that are more interesting.

**Webflow default form strings are rendering as page content** `[observed]`. The pricing page HTML contains, immediately after the hero and before the plan cards:

> `Thank you! Your submission has been received!`
> `Oops! Something went wrong while submitting the form.`

These are Webflow's out-of-the-box success and error strings for a form component. There is no visible form at that point in the page. Both strings are in the served HTML, meaning they are exposed to crawlers and potentially to assistive technology depending on how they are hidden. The `Oops!` is the only instance of that word in the entire harvest and it is not authored copy — it is a CMS default that nobody removed from a **pricing page**.

**Help-widget conditional strings are all present in the served HTML simultaneously** `[observed]`, on every help article: `Was this article helpful?` / `Yes, thanks!` / `Not really` / `Let us know how why it didn't help:` / `Thanks for letting us know!` / four reason options / `Please enter feedback before submitting.` / `Submit feedback` / `Thanks for your feedback!`. The full state machine of a widget — prompt, both branches, validation error, and both confirmations — is emitted flat, in order, in the document. A screen-reader user encountering this without the JavaScript state management sees a contradictory sequence: a question, then both thank-yous, then a validation error.

Note `Please enter feedback before submitting.` — a **validation message captured verbatim on a public unauthenticated page**, which is rare in this corpus.

And note the typo: `Let us know how why it didn't help:` — two interrogatives, one sentence. It appears on every help article in the Dropbox help centre.

## T9 Notifications & system messages

`[observed]` and `[documented]`.

**Notification design is described to the buyer as a feature** `[observed]`, pricing tooltip: "Track responses, receive email notifications, and send automatic email reminders to your recipients." Features tooltip adds the benefit clause: "...so you can spend less time chasing signatures." **"chasing signatures"** is the most honest phrase on the marketing site — it names the actual emotional problem.

**The expiration email set is documented in full** `[documented]`, and it is a three-email sequence with stated triggers:

| Email | Trigger and content, as stated |
|---|---|
| Send and Update | "the signer will receive an email including the signature request expiration date in the subject and body of the email" |
| Reminder | "sent to the signer **3 and 7 days before** the signature request expires, this is in addition to our other current automated reminders. If a signer was already reminded within 24 hours, we will skip the automated reminder." |
| Expired | "sent to all signers and the requester when a signature request expired stating the requester has expired the signature request at the expiration date specified" |

Three notable things. The expiry date goes in the **subject line**, not just the body. There is a documented **anti-spam suppression rule** — skip the automated reminder if the signer was reminded within 24 hours — which is a notification-design decision published as user-facing documentation. And the expired email goes to "all signers **and the requester**", so the sender is notified of their own request's death.

**Timezone handling is stated explicitly** `[documented]`: in-product, "The time will be the users local timezone at the time of signing"; in email, "The date and time will be displayed in their preferred timezone based on their Dropbox Sign account settings." **Two different timezone sources for the same datetime depending on channel**, documented rather than hidden. That is honest and also a latent confusion the docs do not resolve.

**Notification suppression in embedded flows is given its own callout** `[documented]`: heading `No emails in embedded signing`, body — "Emails are muted in all embedded signing flows. Integrations using embedded signing must consume the `signature_request_expired` event." The word **`muted`** rather than "disabled" or "not sent" is a small good choice: it implies the events still happen.

**The signer-facing in-product notice** `[documented]`: "During signing, the signer will see the signature request expiration date in the banner next to the number of required fields to sign." Two facts in one banner — the deadline and the remaining work — which is the right pairing.

**The webhook acknowledgement string is an exact-match requirement** `[documented]`: the receiving server "must respond with exactly: `Hello API Event Received`", and the debugging tip adds "(no extra whitespace or formatting)". A cheerful sentence used as a protocol constant, with a 25-second timeout and ~3 days of exponential-backoff retries.

**Notification of a failed payment** `[observed]`: email plus "A banner alert will appear on your account when you or your team log in, telling you to update your billing details or contact your admin." The banner's routing branches by role, and the article says so.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.**

### The ESIGN consent artefact was not reachable — state this plainly

Dropbox Sign does **not** publish an equivalent of DocuSign's Electronic Record and Signature Disclosure on any reachable public page, and the signing ceremony is not accessible unauthenticated. The consent copy a signer must accept is therefore `[absent]` from this harvest. That is itself a finding: DocuSign's default disclosure is trivially findable in customer-hosted copies; Dropbox Sign's is not.

What Dropbox Sign publishes instead is a **legal-effect assertion**, repeated in three places, with no accompanying consent mechanics:

- Pricing FAQ, `Are Dropbox Sign's eSignatures legally binding?` — summarised: legally binding under the ESIGN Act of 2000, with "the same legal standing as pen and paper alternatives", and a non-editable audit trail affixed to every request ensuring every action is tracked and time-stamped.
- Features FAQ, `What is Dropbox Sign used for?` — summarised: eSignature is legally binding, "making it an essential part of any process that is obliged to stand up in a court of law".
- Pricing footer: "Dropbox Sign electronic signatures are legally binding in the United States, European Union, United Kingdom, and in many countries around the world."

The footer sentence is the load-bearing one and, as recorded in T1, **its Terms and Privacy links point at `hellosign-prod.webflow.io`** — a Webflow staging domain under the retired brand. A user who clicks through from a legal-effect claim to verify the terms lands on a preview host.

### The evidentiary artefact: the Audit Trail

`[documented]`, and this is where Dropbox Sign's compliance content is strongest. From the Security & Compliance glossary:

- Definition: "A tamper-evident record of all actions taken on a Signature Request, proving who did what and when."
- "It is embedded in the final PDF as additional pages and provides legal evidence of the signing process. Automatically generated and cannot be modified."
- Four stated key facts: tamper-evident ("any modification invalidates the audit trail"); "Merged into the final pages of the completed PDF document"; "Includes SHA-256 document hash proving the document wasn't altered after signing"; "Captures signer IP addresses at each interaction".

**"proving who did what and when"** is a seven-word definition of an evidentiary concept, in plain English, with three interrogatives. It is better than anything DocuSign publishes for the same artefact.

The pricing tooltip gives the buyer-facing version: "Non-editable audit trails ensure that every action on your documents is tracked and time stamped." Features tooltip gives a third, motive-first version: "Audit trails are associated with transactions to ensure actions are tracked and time-stamped so you can minimize contractual arguments and protect yourself." **`minimize contractual arguments`** names the actual commercial fear.

### QES is explained by comparison table, not by definition

`[documented]`, from the Security & Compliance glossary. Rather than defining QES, the docs contrast it with standard e-signature on five dimensions:

| Aspect | Standard E-Signature | QES |
|---|---|---|
| Legal standing | Valid but may be challenged | Presumed valid (highest legal weight) |
| Identity verification | Email-based | Government ID + video/in-person verification |
| Certificate | Not required | Qualified certificate from TSP |
| EU-wide recognition | Varies by country | Recognized in all EU states |
| Use cases | General business | Regulated industries, high-value contracts |

**"Valid but may be challenged"** in the *standard* column is the notable entry — the vendor states the weakness of its own default product in the comparison table it wrote. And "Presumed valid" is the legally precise term for what QES buys, given in two words.

The marketing version is compressed to one clause `[observed]`: "the most secure form of eSignature under eIDAS with qualified electronic signatures (QES), where identity verification is handled through our integration with trusted eID providers, ensuring signers are validated according to eIDAS standards."

### Pricing and billing disclosures `[observed]`

- **Plan names and prices**: `Essentials` (Individual) `$15 USD / mo`, `$180 USD billed yearly`; `Standard` (Small team) `$25 USD / user / mo`, "Starting at $600 USD billed yearly"; `Premium` (Large team) "Get a custom quote." Each plan carries a two-word audience descriptor — Individual / Small team / Large team — which is a cleaner segmentation label than DocuSign's sentence-length ones.
- **A promotional price is shown simultaneously with list price**: `$15 USD / mo` and `$10.05 USD / mo` / `$120.60 USD billed yearly` for Essentials; `$25` and `$17.50 USD / user / mo` / "Starting at $420 USD billed yearly" for Standard.
- **Arithmetic discrepancy.** Offer terms footnote 1 states "You'll receive 15% off your first three months of an eligible monthly plan, or **30% off for the first year** of an eligible annual plan." $15 → $10.05 is a 33% reduction; $180 → $120.60 is likewise 33%. $25 → $17.50 is 30%. The two plans are discounted at different rates and only one matches the stated 30%. Recorded as observed figures; the inference is mine and should be re-checked.
- **String glitch**: `$180 USD billed yearly Starting at` — the "Starting at" qualifier renders *after* the figure it qualifies on the Essentials card, and *before* it on the Standard card.
- **Legacy plan name in a live promo banner**: `Coupon code: **Enterprise994** 99% off HelloSign Enterprise for 4 months`. `HelloSign Enterprise` is not a plan in the plan table (`Essentials` / `Standard` / `Premium`), and `HelloSign` is the retired brand. A live, dismissible promotional banner on the production pricing page offering 99% off a product that is not sold under that name.
- **Offer terms are stated in full and include the loss condition**: "After that and until you cancel your subscription, billing will resume at the regular price until you cancel. This offer cannot be combined with other promotions... **If you change your plan, you'll lose this promotion.** Previous charges won't be refunded when you cancel unless legally required."

  "unless legally required" is the honest clause — it concedes that statutory refund rights override the stated policy without pretending the policy is absolute.
- **Auto-renewal** `[observed]`, FAQ: "Yes, your subscription will automatically be renewed unless you change or cancel your account, which you can do in a matter of seconds from your account settings." The "in a matter of seconds" is friction-reduction reassurance attached to a renewal disclosure — an unusual and effective pairing.
- **Trial terms** `[observed]`: "30-day trials give you access to features only available in our paid plans... If you decide to end your trial within 30 days, we won't charge you." Restated in the features FAQ with the free-tier fallback: "we have a free package available, allowing for **up to three signature requests a month**."
- **Recipient cost is disclaimed emphatically** `[observed]`, FAQ `Do the people I send documents to need to pay anything?` — "No, nothing. Ever." Three words, three sentences.
- **Feature-limit values**: Templates `5` (Essentials) / `15` (Standard) / `Unlimited` (Premium). Users `1` / `2 or more` / `5 or more`, with the tooltip "The number of people that can send out signature requests. For more than 5 users, contact our sales team."
- **Footnote 2**: "Additional cost add-on, contact sales for details." Marked with a money icon whose alt text is `Feature available at additional cost` — a paid-feature marker that is legible to screen readers. Good.
- **Compliance badges** in the footer: CPA, HIPAA, Sky High Enterprise Ready, ISO 9001, each with descriptive alt text.

### Quotas and rate limits as user-facing policy `[documented]`

Three quota types named — `Signature Request quota`, `Template quota`, `API rate limit` — with stated behaviours: "Quotas reset monthly"; "Test mode requests do NOT count against quotas"; "Rate limits return HTTP 429"; "Exceeded quotas return HTTP 402". The capitalised `NOT` appears twice.

**Internal contradiction.** The Security & Compliance page says rate-limit handling should "respect the `Retry-After` header". The Warnings and Errors page says for `exceeded_rate`: "Honor `X-Ratelimit-Reset` (Unix epoch); otherwise exponential backoff with jitter. **No `Retry-After` header is sent.**" Two pages of one documentation set, published together, giving contradictory instructions about a header that determines retry behaviour.

### Test mode is a legal-status disclosure

`[documented]`, and this is a genuinely interesting compliance-UX artefact. The Test Mode comparison table has a row **`Legally binding` — Test Mode: `No`, Production: `Yes`**, and documents that test documents are "watermarked as 'TEST'". A developer-facing table that includes legal enforceability as a row alongside "Emails sent to signers" and "Counts against quota". Putting the legal consequence in the same table as the operational consequences is the right move for a product where the two are separated only by a boolean flag.

## T11 Help-centre architecture

`[observed]` — fully readable at `help.dropbox.com/sign`.

**36 category headings** appear on the Dropbox Sign landing page. The Sign-relevant ones, in page order:

1. `Creating signatures, templates, and forms`
2. `Sending and receiving a fax`
3. `Dropbox Sign plans`
4. `Cancellations, downgrades, and refunds`
5. `Viewing files and faxes`
6. `Sending and receiving signature requests`
7. `Editing signatures, templates and documents`
8. `Requesting support`
9. `Viewing billing history`
10. `Managing fax settings`
11. `Troubleshooting signature and fax issues`
12. `Managing team access`
13. `Managing account access`
14. `Searching for files and folders`
15. `Managing payments`
16. `Troubleshooting access issues`
17. `Managing account settings`
18. `API integration`
19. `Restoring/deleting signatures and templates`
20. `Protecting your account`

The remaining sixteen — `Uploading images, photos, videos, and more`, `Signing in and out`, `Dropbox integrations`, `Managing passwords`, `Troubleshooting sync issues`, `Google integrations`, `Microsoft integrations`, `Dropbox policies and agreements`, `Organizing files and folders`, `Using Dropbox applications`, `Dropbox add-ons`, `Securing your data`, `Other third-party integrations`, `Understanding taxes`, `Security policies`, `File and folder settings`, `Security regulations`, `Managing team security`, `Other ways to get help` — are generic Dropbox categories with little or no Sign content, presented on a page titled `# Dropbox Sign`.

**The central IA finding: Dropbox Sign's help centre is not Dropbox Sign's.** The product page inherits the parent product's full category tree. Consequences:

- **Category naming is gerund-led and consistent** (`Creating…`, `Sending…`, `Viewing…`, `Managing…`, `Troubleshooting…`, `Requesting…`, `Protecting…`, `Searching…`, `Understanding…`) — which is good practice, the same gerund-phrase pattern Wise uses. But the gerunds are Dropbox's activities, not Dropbox Sign's.
- **Sign and Fax are merged into single categories**: `Sending and receiving a fax`, `Viewing files and faxes`, `Troubleshooting signature and fax issues`, `Managing fax settings`. A user looking for signature troubleshooting must read past fax. Four of the top categories are fax-dominated on a Dropbox Sign page.
- **URL slugs are Dropbox's buckets, not Sign's.** `How to decline a signature request` lives at `/share/`. `Expiration date for Dropbox Sign requests` lives at `/view-edit/`. `Dropbox Sign account hold policy` lives at `/plans/pause-dropbox-fax-membership` — a **Sign article at a Fax URL**. Breadcrumbs reinforce it: the decline article's trail reads `Dropbox Help Center` → `Share` → `How to decline a signature request in Dropbox Sign`.
- **Serial-comma inconsistency within the category list itself**: `Creating signatures, templates, and forms` (Oxford comma) beside `Editing signatures, templates and documents` (no Oxford comma). Two adjacent categories with near-identical structure, punctuated differently.

**Article-title grammar — five shapes, and the distribution is revealing:**

| Shape | Examples | Rough share |
|---|---|---|
| `How to <verb>…` | `How to create a template link in Dropbox Sign`, `How to add signers in Dropbox Sign`, `How to send signature requests in bulk` | Dominant |
| Imperative | `Cancel a signature request in Dropbox Sign`, `Decline a signature request in Dropbox Sign`, `Download signed documents in Dropbox Sign`, `Mask fields in a document with Dropbox Sign` | Common |
| `What is X?` | `What is Dropbox Sign? An eSignature company`, `What is a signature request in Dropbox Sign?`, `What is Dropbox Forms?`, `What is Dropbox Sign Essentials?` | Definition tier |
| Yes/no question | `Do signers need a Dropbox Sign account?`, `Can I use Dropbox Sign for free?`, `Is Dropbox Fax free?`, `Can I schedule faxes in Dropbox Fax?`, `Can I receive faxes for free in Dropbox Fax?` | Eligibility tier |
| Noun phrase / comparison | `Dropbox Sign templates vs template links`, `Dropbox Sign senders explained`, `Signer fields in Dropbox Sign`, `Dropbox Sign free document limits` | Concept tier |

**`Dropbox Sign templates vs template links`** is the best-shaped title in the set — an explicit disambiguation article for two similarly-named objects, titled as the comparison rather than as either object. Dropbox Sign also ships `Dropbox Sign senders explained` (concept), `Who is a sender?` and `Who is not a sender?` (FAQ) for the same concept: three artefacts across two surfaces for one definition.

**Duplicate titles for one task** `[observed]`, all live in the same category: `How to send a signature request on Dropbox Sign` · `How to send Dropbox Sign signature requests` · `How to send a signature request using the Dropbox Sign API` · `Request signatures using a template link` · `How to send signature requests in bulk`. The first two are near-identical strings with different slugs (`how-to-send-a-dropbox-sign-signature-request` and `send-signature-request-using-template`) — the second one's *title* does not mention templates but its *slug* does.

**The title glitch**: `What is Dropbox Sign? An eSignature company` — a question-plus-appositive that answers "what is the product" with "a company". The product and the vendor are conflated in the title of the article that defines the product.

**Routing furniture** `[observed]`: every article ends with `Was this article helpful?` → `Related Articles` (four) → `Community answers` (five community threads with view/reply counts and post age) → `Other ways to get help` (`Contact support`, `Community`, `Social media support`).

Surfacing **five community threads with engagement metrics** directly on the official help article is unusual. On the "check signature request status" article, four of the five surfaced threads are unrelated problems (login redirects, being logged off, an email-validation error). The relevance is poor and the effect is to put "here are other people's unsolved problems" beneath the official answer.

`Social media support` as a named support channel with its own help article is also worth recording.

**Legacy help centre still live.** `faq.hellosign.com/hc/en-us/articles/115010744688-...` serves the same "check the status" content as `help.dropbox.com/share/check-signature-request-status`, with a Zendesk-style footer (`Comments` / `0 comments` / `Article is closed for comments.`). The index and category pages on that domain return empty bodies, so the old help centre is half-decommissioned: articles live, navigation dead. The pricing FAQ still routes support requests there — `Email our support team` links to `faq.hellosign.com/hc/en-us/requests/new`.

## T12 FAQs

`[observed]` — two blocks, both with answers in server HTML.

### Block A — pricing page, heading `Frequently asked questions`

| # | Question (verbatim) |
|---|---|
| 1 | Are Dropbox Sign's eSignatures legally binding? |
| 2 | Will my monthly/annual subscription be renewed automatically? |
| 3 | Who is not a sender? |
| 4 | Who is a sender? |
| 5 | What is a template? |
| 6 | What does the 30-day free trial mean? |
| 7 | I still need help. Where can I go? |
| 8 | Do the people I send documents to need to pay anything? |

**Q3 precedes Q4.** `Who is not a sender?` is asked and answered *before* `Who is a sender?`. Defining the term by exclusion first is either a striking editorial choice or an ordering error, and I cannot tell which. The negative definition is the commercially load-bearing one — "Someone who just receives and responds to a signature request isn't considered a sender. They don't need a Dropbox Sign account prior to signing and it doesn't cost them anything to sign a document." — because `sender` is the billing unit, so "who is not a sender" is really "who you are not paying for". Answering the pricing question before the definitional one is defensible. Presenting it as a definition rather than as a pricing fact is not.

Q8 then asks essentially the same thing from the other side (`Do the people I send documents to need to pay anything?`) and answers "No, nothing. Ever." **The same fact is delivered three times in one eight-question block** — Q3, Q8, and implicitly in Q5's framing.

Q7, `I still need help. Where can I go?`, is the only question in the first person and the only one with two sentences. It is placed seventh of eight, not last. Its answer is two sentences: "Didn't find an answer to your question? Email our support team. We're happy to help!" — a question answered with a question.

### Block B — features page, heading `Frequently asked questions`

| # | Question (verbatim) |
|---|---|
| 1 | How does Dropbox Sign work? |
| 2 | What does Dropbox Sign integrate with? |
| 3 | What is Dropbox Sign used for? |
| 4 | Is Dropbox Sign free? |
| 5 | How do you get started with Dropbox Sign? |

Five questions, all beginning `How`/`What`/`Is`, and **every single one contains the product name**. This is SEO-shaped question writing: a user already on the features page does not phrase their question as "What is Dropbox Sign used for?" — they phrase it as "can I do X?". The questions are written for the search engine and the answers are written for the search engine too (Q3's answer runs to roughly 130 words and contains four internal links).

**Cross-block observation.** Q4 in Block B (`Is Dropbox Sign free?`) and Q6 in Block A (`What does the 30-day free trial mean?`) both answer the trial question, and only Block B mentions the permanent free tier of "up to three signature requests a month". The pricing page — the page a buyer evaluating cost is actually on — never states the free-tier limit in its FAQ; it appears only as a card CTA (`Just need to sign a document?` → `Try our free plan`). The most price-relevant fact is on the wrong page.

### Block C — help-article feedback widget (present on every help page)

Not a conventional FAQ but a fixed question set `[observed]`: `Was this article helpful?` → `Yes, thanks!` / `Not really` → `Let us know how why it didn't help:` → four fixed reasons: `The article didn't answer my question` · `The steps in the article didn't work for me` · `I found this article confusing and difficult to read` · `Other`.

The three named failure reasons map cleanly onto **coverage, accuracy, and comprehensibility** — the three things content can fail at. That taxonomy is genuinely good and directly reusable as a content-quality instrument.

## T13 Terminology & glossary

`[observed]` and `[documented]`. Dropbox Sign publishes an actual **seven-part domain glossary** on its developer site — `Core Objects`, `Signers & Roles`, `Fields & Templates`, `Workflows`, `Callbacks & Events`, `Features`, `Security & Compliance` — with each entry structured as **Brief / Description / Relationships / Important Distinctions**. Very few products in this corpus ship anything comparable.

| Term | Dropbox Sign's usage | The alternative it rejected |
|---|---|---|
| `Signature Request` | The central object. "A formal request for one or more people to electronically sign one or more documents." Also the billing unit on some plans | **`envelope`** — DocuSign's term. Dropbox Sign names the *speech act*, DocuSign names the *container* |
| `Document` | A single file inside a Signature Request | Not used for the whole transaction — except in the web UI, where the sidebar is `Documents` |
| `Sender` | "The Account that initiates and owns a Signature Request" — and the **billing unit** for per-seat plans | "requester" (which the API nonetheless uses in `requester_email_address`) |
| `Signer` | A person required to sign, initial, or fill fields | |
| `CC Recipient` | "receives a copy of the completed documents but does not sign" | DocuSign's `recipient` umbrella. Dropbox Sign has **no umbrella term** for signer + CC; it enumerates instead |
| `Signer Role` / `CC Role` | Named placeholders in a Template, e.g. "Client", "Contractor", "Witness" | "party", "slot" |
| `Signing Order` | "also called 'ordered signing'" — the docs give both names in one clause | "routing", "sequence" |
| `Template` vs `Template link` | Two distinct objects with a dedicated disambiguation help article | |
| `Unclaimed Draft` | A pre-created request that "hasn't been 'claimed' yet", with three subtypes `send_document` / `request_signature` / `edit_and_resend` | **The most distinctive coined term in the product.** "Unclaimed" implies a waiting object with no owner, which is exactly the model |
| `claim_url` vs `sign_url` | Two short-lived URLs with different purposes, and the docs flag the confusion explicitly: "The `claim_url` (for draft preparation) is different from `sign_url` (for signing)" | One "magic link" |
| `Prep and Send` | The name of the web-app creation flow | Appears only in developer docs, never in marketing |
| `Embedded Signing` / `Embedded Requesting` / `Embedded Unclaimed Draft` | Three named embedding modes | |
| `Bulk Send` | N separate requests from one Template, up to 250 | The docs pre-empt the confusion: "Bulk send creates N separate Signature Requests. This is different from a multi-signer request, which is one request with N signers." |
| `Bulk Send Job` | The wrapper object for a bulk send | |
| `Signer reassignment` (marketing, help) vs `reassigned` (callback) vs `delegated` (audit trail) | **Three names for one act** across three surfaces | |
| `Variable signing` | Named feature with its own help article | "dynamic signers" |
| `Merge Field` | Dynamic content placeholder in a Template | |
| `Form Field` | The generic placed field, in API docs | `Signer field` — the term used everywhere else |
| `Tamper-proof` (marketing) vs `tamper-evident` (developer docs) | **Two different claims, not two words for one.** Marketing says documents are "tamperproof" and "Tamper-proof documents"; the Audit Trail glossary says "tamper-evident" | These are technically different assertions. Tamper-*evident* is the accurate one |
| `Audit Trail` | "proving who did what and when"; merged into the final PDF | "certificate of completion" (DocuSign's term for the equivalent artefact) |
| `QES` / `Qualified Electronic Signatures` | Expanded on first use, then abbreviated | |
| `Hanko stamp` | A Japanese seal type with its own help article | Localisation surfacing as product vocabulary — notable |
| `Test Mode` | Sandbox with a `Legally binding: No` row | "sandbox" (used once, in the Brief) |
| `Organization` / `Team` / `Sub Team` | A three-level hierarchy with a published depth limit and an ASCII tree diagram. "An Organization is simply the root team — it is not a separate entity type." | A flat "workspace" |
| `Account` vs `Subscription` | A distinction the glossary states three separate times: "Account ≠ Subscription. An Account is a user identity; a Subscription is the billing/plan entity." | One "account" concept |
| `HelloSign` | The retired brand. Still live in: the API host `api.hellosign.com`, the docs host `developers.hellosign.com`, the app host `app.hellosign.com`, the legacy help host `faq.hellosign.com`, the URL segment `/what-is-hellosign/`, the SDK example emails `lawyer1@dropboxsign.com` alongside `me@hellosign.com` in the same docs page, the pricing promo `HelloSign Enterprise`, and the footer legal links `hellosign-prod.webflow.io` | `Dropbox Sign` |

### The rename is the defining terminology story

The HelloSign → Dropbox Sign rename is **incomplete across nine distinct surfaces**, listed above. Some of it is defensible — changing an API hostname breaks every integration, and `api.hellosign.com` is arguably correct to preserve. Some of it is not: a promotional banner selling "HelloSign Enterprise", a footer legal link to a Webflow staging host under the old brand, and `/what-is-hellosign/` as a live public URL segment for seven marketing pages.

Notice also that the docs themselves are inconsistent *within one code sample*: the Expiration page's example request has `requester_email_address` implied as `me@hellosign.com` in the response JSON while the CC addresses in the request are `lawyer1@dropboxsign.com`. Both brands in one JSON blob.

### The "Important Distinctions" pattern

Every glossary entry ends with a block headed `Important Distinctions` containing two to four statements of the form *X is not Y*. Examples:

- "A Signature Request is not the same as an Unclaimed Draft."
- "Templates cannot be signed directly."
- "Account ≠ Subscription."
- "API Key (used for authentication) ≠ Client ID (used for embedded/OAuth app identification)."
- "The `cancel` event means the signer closed the iframe without signing — this is not the same as declining."
- "Each signer on a request must have a unique email address."
- "Role matching is exact and case-sensitive."

**This is the single most transferable structure in this file.** A glossary that, for every term, explicitly names the term it is most likely to be confused with, and states the difference. It is the inverse of how glossaries are normally written (definition only) and it directly attacks the actual failure mode (mis-mapping, not ignorance).

The `cancel` vs `decline` distinction is the best instance: closing the iframe and refusing to sign produce different events with different legal meaning, and the docs say so in one sentence.

## T14 Voice, tone & accessibility

`[observed]`

**Person and tense.** Second person for the user throughout; first-person plural for the company, used freely and warmly ("We meet you where you work", "We're happy to help!", "we'll keep trying to bill you", "we won't charge you"). The dunning article is written entirely in first-person plural — "First, **we'll** try to bill you for three days" — which keeps the company as the visible actor in a punitive process rather than hiding behind passive voice. That is a good decision and it is applied consistently.

**Register is warmer than DocuSign's and more colloquial.** `Send without limits!` · `No, nothing. Ever.` · `We're happy to help!` · `Digitize your business with eSignature today.` · `Start signing today.` · "you'll spend up to 80% less time pushing paper". Exclamation marks appear at least three times in authored copy, plus the un-authored Webflow `Oops!`.

**The tone gradient is real but shallower than Wise's.** Marketing is enthusiastic; the developer glossary is flat and precise; the decline warning is flat and severe. But the pricing page mixes registers within a single component — the `Unlimited signature requests` tooltip ("Send without limits!") sits in the same table as `Data residency` ("Allows companies to store completed documents in one of our global data residency options").

**Tooltips carry most of the copy weight.** On the pricing page, roughly thirty feature rows each have a one-to-two-sentence tooltip, and those tooltips are where the product is actually explained. They are consistently structured: what it is, then what it gets you. E.g. `Bulk send` — "Send out individual signature requests to a large list of different recipients with a single click." `Branding` — "Keep your signature requests on brand by adding your company logo and custom messaging." `Reporting` — "View reports on usage statistics, like how many signature requests have been sent and signed."

Two tooltips break the pattern by addressing an objection rather than describing: the `Unlimited signature requests` one, and `Customer support` — "All customers have access to email and chat support with our **caring and knowledgeable** customer support team." The adjectives in the support tooltip are unearned and are the weakest line on the pricing page.

**Sentence case is used for headings and buttons, mostly.** Violations found: `Contact sales` vs `Contact Sales` in one nav; `or purchase now` vs `Purchase Now` for one control; `Try for free` vs `Try it free` vs `Start free trial`.

**Accessibility content** `[observed]`

- `Skip to main content` is first in DOM on both `sign.dropbox.com` pages checked.
- **Image alt text is functional and informative on the pricing table**: the check/cross/money icons carry `Feature available`, `Feature available at additional cost`, and the accordion arrows carry `Expand or collapse accordion`. A pricing comparison grid where the availability icons are named for screen readers is genuinely good practice and rarer than it should be. The cross/unavailable icon, however, carries **empty alt** — so a screen-reader user hears `Feature available` on included rows and *nothing* on excluded rows, which is ambiguous rather than negative. Recorded as a real defect.
- Help-centre icon alt text is descriptive: `Icon depicting a speech bubble Contact support`, `Icon depicting two people Community`, `Twitter Icon Social media support` — though these read as alt-text-plus-label concatenations, i.e. the icon's alt duplicates the adjacent link text, producing "Icon depicting a speech bubble Contact support" as the accessible name.
- Marketing logo alt text is bare brand names (`logo google drive`, `logo hubspot`, `logo dropboxsign`, `logo vehiculum`) — lowercase, prefixed with the word "logo", which screen readers will announce redundantly alongside the image role.
- The help centre publishes **23 language variants per article**, with three (`English (Australia)`, `English (United Kingdom)`, `Українська`, `ไทย`) resolving to `?fallback=true` on the US article — i.e. **the locale switcher offers languages that do not exist and silently serves English**. A user selecting Українська gets US English with no notice.
- `Was this article helpful?` with a structured failure taxonomy (see T12 Block C) is the strongest accessibility-adjacent content instrument here: it gives users of the help content a channel to report comprehensibility problems specifically.
- **No accessibility statement or VPAT was found** for Dropbox Sign on any reachable page. `[absent]` The features page and pricing page make no accessibility claim. This is a clear gap relative to DocuSign, which publishes ten per-product VPATs.

**Negative findings, recorded honestly**

1. **Footer legal links on the production pricing page point at `hellosign-prod.webflow.io`** — a Webflow staging host under the retired brand — directly beneath a legal-binding claim. The most serious defect in this harvest.
2. A live promo banner sells `HelloSign Enterprise`, a plan name absent from the plan table.
3. Seven marketing pages served from live `/what-is-hellosign/` URLs.
4. `Real-world stories with real results` used as the gloss for **API pricing** in the nav — a copy-paste from the Customer stories gloss, present on at least two pages.
5. Webflow default strings `Thank you! Your submission has been received!` and `Oops! Something went wrong while submitting the form.` rendered in the pricing page HTML with no visible form.
6. `Let us know how why it didn't help:` — a two-interrogative typo on every help-centre article.
7. The payment-failure article's team-member list contains both `Create new templates` and `Can't create more templates`.
8. `Your billing period may change after the update.:` — full stop followed by colon.
9. Seven distinct labels for trial/signup across two pages.
10. `or purchase now` (lowercase, desktop) vs `Purchase Now` (Title Case, mobile) for one control.
11. `Contact sales` and `Contact Sales` in the same nav block.
12. One object, three surface names: `Documents` (web sidebar), `Signature requests` (mobile app), `Pending your signature` (mobile web).
13. One act, three names: `signer reassignment` / `reassigned` / `delegated`.
14. `tamper-proof` (marketing) vs `tamper-evident` (docs) — not synonyms.
15. The decline reason is `required` per the help article but `(if provided)` per the audit-trail table.
16. `Retry-After` header: the Security page says honour it; the Errors page says it is not sent.
17. Offer terms say 30% off annual; Essentials is discounted 33%.
18. `$180 USD billed yearly Starting at` — qualifier renders after the figure.
19. Oxford comma present in `Creating signatures, templates, and forms`, absent in the adjacent `Editing signatures, templates and documents`.
20. `What is Dropbox Sign? An eSignature company` — the product-definition article defines a company.
21. A Dropbox Sign article served from `/plans/pause-dropbox-fax-membership`.
22. Locale switcher offers four languages that resolve to English via `?fallback=true`.
23. Excluded-feature icons carry empty alt while included-feature icons are labelled.
24. Published grammar error in the Expiration reference: "each signature on the signature request that is not been completed".
25. No accessibility statement or VPAT found.

---

## Transferable patterns

1. **Write the glossary as disambiguations, not definitions.** Every entry in Dropbox Sign's domain glossary ends with `Important Distinctions` naming the term it is most confusable with: "A Signature Request is not the same as an Unclaimed Draft"; "the `cancel` event... is not the same as declining"; "Account ≠ Subscription". Users rarely fail because they don't know what a word means; they fail because they've mapped it to the wrong neighbour. This is the highest-value pattern in this file and it transfers to any product with an internal object model.
2. **When the system-true moment and the user-true moment differ, name both states.** `signature_request_all_signed` and `signature_request_downloadable` are deliberately separate, and the docs explain why in three places. Compare Wise, which keeps one `complete` state and writes a help article apologising for it. Directly applicable to payment "settled" vs "available", dispute "closed" vs "refunded".
3. **Publish retryability as a controlled vocabulary, not as prose.** `No` / `Yes` / `Conditional`, each with a one-sentence published definition, attached to every error. This gives every error message a defensible answer to "should the CTA say *Try again* or *Change something*?" and makes that answer auditable rather than a writer's judgement call.
4. **Write warnings from the position of the person who will suffer the consequence.** `custom_field_value_too_long` — "The custom field will extend beyond the limits of its container and may not display the way you intended." `form_fields_overlap` — "may prevent signers from completing the document." The warning is addressed to the sender but describes the *signer's* experience. Condition: this only works where the actor and the victim are different people.
5. **Sequence destructive-action warnings by increasing severity, then state the new state in the present tense.** "clear anything you've entered" → "notify the sender" → "You won't be able to go back". Then: "The document is now closed." Four words, present tense, states the state not the action.
6. **Give the total before the decomposition in a dunning timeline.** "you have 17 days... with no consequences" then "three days... then a 14-day grace period". And tell the user in advance which notification surfaces they will see. Directly applicable to any failed-payment or account-restriction sequence.
7. **Define the degraded state as a list of what the user still can do, split by role.** Dropbox Sign's `limited access` section is three capability lists, not a restriction list. Even in the punitive state the copy leads with capability.
8. **Put legal enforceability in the same table as the operational differences.** Test Mode's comparison table has `Legally binding: No / Yes` alongside `Counts against quota` and `Documents watermarked`. Where a boolean flag changes legal status, the legal consequence belongs in the operational table, not in a separate disclaimer.
9. **Publish a notification suppression rule as user-facing documentation.** "If a signer was already reminded within 24 hours, we will skip the automated reminder." Telling users the anti-nag logic exists is cheap and buys a lot of trust in a reminder-heavy product.
10. **Use a three-reason failure taxonomy on help feedback**: didn't answer / steps didn't work / confusing and difficult to read. Coverage, accuracy, comprehensibility. Reusable as-is.

## Caveats & gaps

- **The ESIGN/eIDAS consent artefact was not found.** Dropbox Sign does not publish a default Electronic Record and Signature Disclosure equivalent on any reachable page, and the signing ceremony is behind a per-request link. The consent copy a signer must accept — the single most important artefact in this product for the brief's purposes — is `[absent]`. T10 records the legal-effect *claims* instead and says so.
- **The signing ceremony is entirely unobserved.** `Review & Sign`, the `⁝` menu, the decline dialogue, the reason field, the signature adoption UI, and the completion screen are all reconstructed from one help article's step list. No verbatim in-product strings beyond the control labels named in that article.
- **The legacy help centre is half-decommissioned.** `faq.hellosign.com` serves individual articles but returns empty bodies for its index (`/hc/en-us`) and its Dropbox Sign category (`/hc/en-us/categories/200353538-Dropbox-Sign`), so the old IA could not be compared with the new one. The pricing FAQ still routes new support requests to that domain.
- **`sign.dropbox.com/pricing` returns an empty body**; the live pricing URL is `/products/dropbox-sign/pricing`. If `/pricing` is linked anywhere, it is broken.
- **Plan feature values are approximate in places.** The pricing and features comparison tables render as long runs of icon images with the row labels detached from the values in the extracted text. Template counts (`5` / `15` / `Unlimited`) and user counts (`1` / `2 or more` / `5 or more`) were recoverable with confidence; individual tick/cross assignments for the ~30 other rows were not, and are not asserted here.
- **API pricing not harvested.** `sign.dropbox.com/products/dropbox-sign-api/pricing` was not fetched, so API-specific quotas and per-request pricing are unknown.
- **Status page not harvested.** `status.hellosign.com` was identified in search results as "Dropbox Sign and Fax Status" but not fetched. T9's incident-communication conventions are therefore incomplete.
- **Trust centre and the legality guide were not retrieved.** `sign.dropbox.com/trust` and `sign.dropbox.com/esignature-legality/united-states` were both hit by the fetcher's session-level deduplication and their content was not available to me. Compliance claims in T10 come from the pricing FAQ, the features page, and the developer glossary only.
- **No email copy.** The three expiration emails are described in the docs and shown as screenshots; their subject lines and bodies were not retrievable as text.
- **No accessibility statement or VPAT was found** for Dropbox Sign. If one exists it is not linked from the features page, the pricing page, or the help centre landing page.
- **Help-centre coverage is a sample.** ~250 article titles were captured from the Dropbox Sign landing page but only three article bodies were opened. Article-title grammar in T11 is well evidenced; answer structure is not.
- **Locale observed is en-US only.** The 23-language switcher was not exercised beyond noting the four fallback entries.

## Sources

1. https://sign.dropbox.com/features
2. https://sign.dropbox.com/products/dropbox-sign/pricing
3. https://help.dropbox.com/sign
4. https://help.dropbox.com/share/check-signature-request-status
5. https://help.dropbox.com/share/how-to-decline-a-signature-request
6. https://help.dropbox.com/plans/what-happens-when-my-dropbox-sign-payment-fails
7. https://faq.hellosign.com/hc/en-us/articles/115010744688-How-to-check-the-status-of-a-signature-request
8. https://developers.hellosign.com/api/signature-request
9. https://developers.hellosign.com/api/manual-reference-pages/glossary/core-objects
10. https://developers.hellosign.com/api/manual-reference-pages/glossary/signers-roles
11. https://developers.hellosign.com/api/manual-reference-pages/glossary/workflows
12. https://developers.hellosign.com/api/manual-reference-pages/glossary/callbacks-events
13. https://developers.hellosign.com/api/manual-reference-pages/glossary/security-compliance
14. https://developers.hellosign.com/api/manual-reference-pages/warnings-and-errors
15. https://developers.hellosign.com/api/manual-reference-pages/expiration
16. https://sign.dropbox.com/pricing — empty body
17. https://faq.hellosign.com/hc/en-us — empty body
18. https://faq.hellosign.com/hc/en-us/categories/200353538-Dropbox-Sign — empty body
