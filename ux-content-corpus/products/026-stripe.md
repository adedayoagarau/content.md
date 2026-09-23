# 026. Stripe

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Payments infrastructure / PSP (payment service provider), plus billing, issuing, treasury |
| Primary URL | https://stripe.com/ |
| Corpus rank | 026 |
| Benchmark strength (source list) | API documentation, onboarding, errors |
| Locale / market observed | en-US (`meta-request-country: US`; footer reads `United States(English)`) |
| Platform observed | Web (marketing), docs (`docs.stripe.com`, served as `text/markdown`), support centre |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | PCI DSS Service Provider Level 1; PA-DSS and EMVCo L1/L2 for Terminal; SOC 1 / SOC 2 Type II (on request) and a public SOC 3; NIST CSF alignment; APEC CBPR and PRP; EU-US DPF, UK Extension, Swiss-US DPF; PSD2/SCA referenced via 3DS docs; global money-transmission licences listed at `/spc/licenses` |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 usable (13 attempted) |
| Harvest completeness | Partial — `status.stripe.com` returns only `Loading...` to a server fetch (fully client-rendered), so incident-communication vocabulary and component names were not retrievable. Everything else full. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://stripe.com/ | Hero, nav, stat blocks, customer bento, footer taxonomy |
| Pricing | https://stripe.com/pricing | Two-tier plan naming, per-product fee IA, 5-question FAQ |
| Docs index | https://docs.stripe.com/ | Product grouping, task-first top shelf |
| Get started | https://docs.stripe.com/get-started | Onboarding step language, agent-addressed copy |
| **Error codes** | https://docs.stripe.com/error-codes | ~190 machine-readable codes with developer-facing resolution prose. Highest-value single page in this batch. |
| **Decline codes** | https://docs.stripe.com/declines/codes | Card decline table (code / description / next steps) + LPM table with four register columns |
| Card declines | https://docs.stripe.com/declines/card | `advice_code` taxonomy, network codes, on-session vs off-session recovery |
| Error handling | https://docs.stripe.com/error-handling | Language-variant index page only (see Caveats) |
| PaymentIntent lifecycle | https://docs.stripe.com/payments/paymentintents/lifecycle | The canonical seven-state model |
| Security | https://docs.stripe.com/security | Compliance disclosure language, certification naming |
| Stripe Apps style | https://docs.stripe.com/stripe-apps/style | Design-token vocabulary (layout/colour/spacing). No content guidance — see T14. |
| Support centre home | https://support.stripe.com/ | Ten "Popular articles" with title grammar + embedded resolution rates |
| Status page | https://status.stripe.com/ | **Not retrievable** — server response is `Loading...` |

---

## T1 Navigation & IA labels `[observed]`

**Global nav — five items, one of which is an audience-agnostic role label**

`Products` · `Solutions` · `Developers` · `Resources` · `Pricing` · `Sign in`

Notable: `Developers` sits at the same level as `Products` and `Solutions`. The developer is treated as an audience segment in the top-level IA, not as a footer destination. Compare Wise, where the three top-level items are all buyer personas.

A persistent nav affordance reads `See all products` with the scope line `Explore our full product catalog` — the label and its explainer are separated rather than combined.

**Footer — seven groupings, with a compound label**

`Products and pricing` · `Solutions` · `Developers` · `Integrations and custom solutions` · `Resources` · `Company` · `Support`

`Products and pricing` merges two concerns into one heading, which is unusual and works because the pricing page is organised *by product* rather than by plan. `Support` is its own top-level grouping holding exactly two links: `Get support` and `Managed support plans` — free and paid support are surfaced adjacently, which is an honest but blunt juxtaposition.

Under `Developers` the footer ships six links that together form a complete developer surface map:
`Documentation` · `API reference` · `API status` · `API changelog` · `Libraries and SDKs` · `Stripe Projects` · `Developer blog`

Note `API status` in the footer rather than `Status` — Stripe scopes the status page to the API in its label even though the page covers Dashboard and other services.

**Docs index — two-level IA: task shelf, then product grid**

The top shelf is nine *outcomes*, not nine products:
`Accept payments online` · `Collect payments with invoices` · `Accept payments in-person` ·
`Sell subscriptions` · `Offer usage-based pricing` · `Set up the customer portal` ·
`Set up your development environment` · `Build on Stripe with AI` · `Integration quickstarts`

Only below that does `Browse by product` appear, grouped as:
`Payments` · `Revenue` · `Platforms and marketplaces` · `Money management` · `Prebuilt components`

`Prebuilt components` as a peer of `Payments` is a content-design decision worth flagging: it groups by *how much you build* rather than by what the thing does.

**Pricing page internal nav** — three anchors only:
`Standard pricing` · `Custom pricing` · `FAQs`

## T2 Value proposition & headline patterns `[observed]`

**Hero** — headline and subhead are welded into one block, with the first sentence italicised:

> `Financial infrastructure to grow your revenue.` Accept payments, offer financial services, and implement custom revenue models—from your first transaction to your billionth.

Two patterns. First, the headline is an **abstract category claim** ("financial infrastructure"), the opposite of Wise's task-naming headline ("International money transfers"). Stripe is selling a layer, not an action. Second, the subhead closes with a **scale-range flourish** — "from your first transaction to your billionth" — which does the work of saying "startup and enterprise" without segmenting the reader.

Above the hero sits a bare fragment used as a live-data label: `Global GDP running on Stripe:`. A colon-terminated label with the figure rendered dynamically.

**Section headers are full sentences with terminal full stops**

`Flexible solutions for every business model.` ·
`Powering businesses of all sizes.` ·
`Reliable, extensible infrastructure for every stack.` ·
`The backbone of global commerce` (no full stop — inconsistent with its neighbours) ·
`What’s happening`

The mixed punctuation across sibling section headings is a real defect: three of five carry a full stop, two do not.

**Capability headers are imperative-verb phrases naming what you can build**

`Accept and optimize payments globally—online and in person` ·
`Enable any billing model` · `Monetize through agentic commerce` ·
`Create a card issuing program` ·
`Access borderless money movement with stablecoins and crypto` ·
`Embed payments in your platform`

Six headers, six different verbs (`Accept`, `Enable`, `Monetize`, `Create`, `Access`, `Embed`). The verb is doing the differentiation, not the object.

**Audience blocks use "Transform / Build / Make" + your-noun**

`Transform your enterprise with agile financial infrastructure` (enterprises) ·
`Build a foundation for your startup that enables faster growth` (startups) ·
`Make your SaaS platform a complete financial operating system` (platforms)

**Benefit sub-headers are two-to-four-word imperatives with full stops**

`Get to market faster.` · `Grow new lines of revenue.` · `Manage platform risk.` ·
`Connect to existing systems.` · `Scale with confidence.` · `Choose an integration path.` ·
`Don’t code?` · `Use a pre-integrated platform.` · `Build your own integration.`

`Don’t code?` is the standout — a two-word negative question used as a card heading, sitting in a row with two declarative imperatives. It addresses a self-identification rather than a benefit, and it is the only question mark in the set.

**Pricing headline** — `Pricing built for businesses of all sizes`, then the tier is named by a bare adjective (`Standard`, `Custom`) rather than by a marketing tier name.

**Numbers-as-proof block** (`The backbone of global commerce`):
`135+` currencies and payment methods supported · `$1.9T` in payments volume processed in 2025 ·
`99.999%` historical uptime for Stripe services · `200M+` active subscriptions managed on Stripe Billing

The uptime figure is hyperlinked to the status page — the claim carries its own audit trail. Elsewhere on the site a *different* uptime figure appears (`99.9999%` for Black Friday–Cyber Monday 2025, and `99.999% average historical uptime` on the pricing page). Three different nine-counts for uptime across three surfaces; each is scoped differently, but the inconsistency is a genuine risk.

Developer-scale numbers get their own block: `500M+` API requests per day · `10K+` API requests per second · `150K+` transactions per minute. The pricing page states `250 million+ API requests a day` for the same metric the homepage puts at `500M+`. **Contradictory figures for one metric across two pages.**

## T3 CTA inventory `[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start now` | Homepage nav, homepage foot | Primary acquisition |
| `Get started` | Hero, Payments pricing block, docs | **Second label for the same register destination** |
| `Create account` | `get-started` docs page | Third label for the same destination |
| `Sign up with Google` | Hero, beside `Get started` | Federated-signup CTA named after the provider |
| `Contact sales` | Nav, hero foot, pricing, Custom tier | Consistent everywhere |
| `Sign in` | Nav (rendered twice: `Sign inSign in`) | Duplicated in DOM — see T14 |
| `Become a partner` | Nav drawer | |
| `See all products` | Nav drawer | Paired with `Explore our full product catalog` |
| `Explore our full product catalog` | Nav drawer | Sub-label, not an independent CTA |
| `Watch now` | Sessions promo | |
| `Read the story` | Customer cards (×6) | Highly repeated; object supplied by the card |
| `Read Lovable’s story` · `Read Gamma’s story` · `Read Supabase’s story` | Startup carousel | **Named-object variant of the same CTA** — better practice than the bare form above it, on the same page |
| `Watch the video` | ElevenLabs card | |
| `Stripe for enterprises` · `Stripe for startups` · `Stripe for platforms` | Section links | CTA text = destination page title |
| `View services` · `View partners` · `View plans` | Professional services trio | Parallel construction, three objects |
| `Apply now` | Stripe Startups program | Gated-programme verb, distinct from `Start now` |
| `Start your company` | Atlas card | Outcome-named, not product-named |
| `Read the guide` (×3) | Platform benefit cards | |
| `View developer docs` · `View Stripe’s GitHub` | Developer section | |
| `Explore no-code` | No-code card | |
| `See directory` | Marketplace card | |
| `Read the letter` · `See the numbers` · `Get the data` · `Watch video` · `Learn how` · `View announcement` · `Read more` · `Get the report` | "What’s happening" carousel, 8 cards | Eight cards, eight distinct CTA labels. No bare `Learn more` anywhere in the set. |
| `Pricing details` | Homepage foot card | |
| `Integration options` | Homepage foot card | |
| `Contact sales to learn more.` | Inline, 3DS pricing row | **Terminal full stop inside a link** — inconsistent with every other CTA |
| `Read more` | Pricing FAQ answer (tax) | |
| `More details on fees by payment method` | Pricing FAQ answer | Fully specific inline link |

**Observations.** Stripe's CTA discipline on *content* links is excellent — eight news cards carry eight distinct labels and the object is always named. Its discipline on the *primary conversion* CTA is poor: `Start now`, `Get started`, and `Create account` all point at `dashboard.stripe.com/register`, and `Ready to get started?` / `Ready to get started? Get in touch or create an account.` appear as two different closing headings on two pages.

`Read the story` is used six times in a row on the enterprise accordion while the startup carousel directly below uses the named form `Read Lovable’s story`. The better pattern is present on the page and not applied consistently.

## T4 Onboarding & getting-started `[observed]`

**No numbered step sequence.** Stripe's `get-started` page is a *branch selector*, not a linear flow. The heading is `Get started`, the scope line is "Create an account and learn how to build on Stripe," and the body is three groups of unnumbered task links:

`Start building` — six links, each a verb phrase followed by a colon and a one-sentence outcome:

| Link (verbatim) | Scope line |
|---|---|
| `Create a Stripe account` | "Create and activate a Stripe account." |
| `Set up your development environment` | "Get familiar with the Stripe CLI and our core SDKs." |
| `Get your API keys` | "Get your API keys and learn about authentication." |
| `Quickstarts` | "Review a list of all Stripe integration quickstart guides." |
| `Use Stripe without writing code` | "Accept payments with Stripe by using shareable links or sending an invoice." |
| `Build on Stripe with AI` | "Use AI agents in your Stripe integration workflow." |

The `label: sentence` construction is used throughout Stripe docs and is the single most consistent pattern in the whole docs corpus: **every link is a verb phrase, every scope line restates the verb.** `Create a Stripe account` → "Create and activate a Stripe account." The redundancy is deliberate — the link works as a nav label and the sentence works as a search snippet.

`Common use cases` — five links phrased as *role + goal* rather than as features:
`Accept simple payments as a startup` · `Sell subscriptions as a SaaS startup` ·
`Accept in-person payments for a direct retail business` ·
`Send invoices to collect payments for an online business` · `Migrate to Stripe`

The `as a <role>` / `for a <business type>` suffix lets a reader self-select without a persona picker.

**Time-to-value promise** `[observed]`: `Get up and running with Stripe in as little as 10 minutes.` and, on the docs product page, the Le Monde stat `Less than 3 months to implement and go live`. Two timescales for two audiences, neither hedged with a footnote (contrast Wise, which bounds every timing claim).

**Agent-directed onboarding copy — a genuinely new content pattern** `[observed]`

Every Stripe docs page opens with a block addressed to *AI agents as a reader class*:

> `Start here: Integrate with Stripe using skills and plugins`
> "Stripe provides skills and plugins for agents to build faster and more accurately."
> `Quickstart`: "Install the Stripe CLI with `npm install -g @stripe/cli` and run `stripe agent setup`."

And on several pages, second-person instructions aimed at the agent rather than the human:

> "Coding agents should install the Stripe CLI (`npm i -g @stripe/cli`) and run the command `stripe sandbox create --help` to provision an anonymous Stripe sandbox with working API keys. No account registration required."

> "Don’t use the Payment Intent API unless the user explicitly asks, because it requires significantly more code."

That second string is remarkable: the docs contain a **directive to the agent about what to recommend to its own user**, phrased in the imperative. Stripe is writing prescriptive guidance into reference documentation, addressed to a non-human reader, about how to advise a human. Whatever one thinks of it, it is the most novel content-design artefact in this batch.

Also present on every docs page: `Read this page in your terminal: install the Stripe CLI (v1.43.3+) and run stripe docs.` — the documentation offers itself in a second delivery channel and version-gates the offer.

## T5 Form & field labels `[absent] / [documented]`

No public pre-auth form of substance. The signup form is behind `dashboard.stripe.com/register` and was not entered.

Field-level vocabulary is recoverable indirectly from the error codes, which is itself a useful technique — the error table names the fields:

`postal_code` · `expiration date` · `security code` (chosen over "CVV" in customer-facing prose while `cvc` is the machine term) · `card number` · `routing number` · `sort code and account number` · `clearing code` · `tax ID number` · `phone_number` · `confirmation_number` (Konbini) · `BLIK code` · `microdeposit amounts` · `descriptor code`

**Register split inside one product.** Stripe's machine field is `incorrect_cvc`; the human-facing description is "The card’s security code is incorrect." It never says "CVC" to the cardholder. Similarly `incorrect_zip` is described as "The card’s postal code is incorrect" — the code retains the US-centric `zip` while the prose uses the international `postal code`. Both `incorrect_zip` and `incorrect_postal_code` exist as separate error codes, the former scoped to cards and the latter to payment methods generally — a legacy split preserved for API compatibility and papered over in the prose.

## T6 Status & state language `[observed]` — richest category, with T7

### The PaymentIntent / SetupIntent state machine — seven states, named as requirements

| State (display form) | API value |
|---|---|
| `Requires payment method` | `requires_payment_method` |
| `Requires confirmation` | `requires_confirmation` |
| `Requires action` | `requires_action` |
| `Processing` | `processing` |
| `Succeeded` | `succeeded` |
| `Canceled` | `canceled` |
| (branch state) | `requires_capture` |

**This is the most transferable naming pattern on the page.** Four of the seven states are named `requires_<x>`. They describe **what is still needed**, not what has happened. A conventional payment state machine would name these `created`, `pending`, `authenticating` — states of the object. Stripe names them as *outstanding obligations*, which means the state string doubles as the next-action instruction. A UI can render the state name and the user learns what to do.

The terminal states break the pattern deliberately: `processing`, `succeeded`, `canceled` are past-participle or present-progressive object states, because at that point nothing is required of anyone.

Note `canceled` uses the single-L US spelling, while the same docs use `cancellation` (double L) in prose on the same page — an internal inconsistency, though both are defensible in US English.

**Documented state-transition semantics worth stealing.** Stripe writes the *loop* explicitly rather than leaving it implied:

- "If the payment attempt fails (for example, due to a decline), the PaymentIntent’s status returns to `requires_payment_method` so that the payment can be retried."
- "Cancellation invalidates the PaymentIntent for future payment attempts, releases any held funds, and can’t be undone."
- "PaymentIntents might also automatically transition to `canceled` if they’re confirmed too many times."

Each of these is a sentence a content designer would otherwise have to reverse-engineer from engineering. The third one — auto-cancellation on excessive confirmation — is the kind of silent state change that generates support tickets, and Stripe documents it.

**Two-plane status mapping.** Stripe explicitly acknowledges that the Dashboard shows different status words than the API and ships a reconciliation table: "To understand the mapping between payment statuses in the Dashboard and the PaymentIntent `status`, see Payment status mapping." Naming the mismatch and documenting the mapping, rather than forcing one vocabulary, is the mature move. (The mapping page itself was not fetched.)

### Charge outcome vocabulary `[documented]`

The LPM decline table exposes a third status field, `Charge outcome reason`, which is neither the decline code nor the error message. Observed values include:
`partner_generic_decline` · `generic_decline` · `invalid_customer_account` · `payment_limit_exceeded` ·
`invalid_billing_agreement` · `partner_expired_card` · `partner_processing_error` ·
`partner_insufficient_funds` · `partner_invalid_currency` · `partner_invalid_amount` ·
`invalid_business_account` · `partner_high_risk_customer` · `compliance_violation` ·
`payment_disputed` · `invalid_authorization` · `invalid_payment_information` ·
`partner_payment_not_found` · `expired_payment_information` · `partner_duplicate_transaction` ·
`recurring_not_supported_by_bank` · `partner_action_not_supported` · `lost_or_stolen_card` ·
`card_already_activated` · `invalid_track_data`

The `partner_` prefix is a **provenance marker in the status name**: it tells the reader the failure came from a downstream provider rather than from Stripe or the issuer. Attribution encoded in the identifier.

### Other state vocabularies observed

- Source states: `pending`, `failed`, `consumed` (from `invalid_source_usage`)
- `advice_code` is a *separate* status axis: `do_not_try_again` · `try_again_later` · `confirm_card_data` (see T7)
- Payment-mode states: `on session` / `off session`, with inline definitions
- Webhook event name as a state announcement: `payment_intent.payment_failed`
- Payout timing states, from support titles: `Late or missing payouts`, "expected delivery date", `upcoming payouts`, `expected deposit dates`, `payout history`
- Capability states: `capability_not_active`, "missing the active capabilities"
- Account/product activation states: `stripe_tax_inactive`, `payment_method_unactivated`, `product_inactive`, `sku_inactive`, `financial_connections_account_inactive`, `invalid_business_account` ("deactivated")
- Terminal hardware states: `terminal_reader_busy`, `terminal_reader_offline`, `terminal_reader_hardware_fault`, `terminal_reader_timeout`
- Mode states: `livemode_mismatch`, `testmode_charges_only`, `testmode_decline`

**Status-page vocabulary: not retrievable.** `status.stripe.com` renders client-side. Component names and incident severity labels are a real gap in this file.

## T7 Error, failure & recovery `[observed]` — the headline finding

### The three-register separation — the most transferable pattern in the corpus for payments work

Stripe does not have one error string per failure. It maintains **distinct, independently authored registers for distinct readers**, and it labels them as columns in a published table. On `docs.stripe.com/declines/codes`, the LPM table header is literally:

> `Decline code` | `Charge outcome reason` | `Seller message` | `API error message`

Worked example, `code_expired`:

| Register | String |
|---|---|
| Machine-readable code | `code_expired` |
| Charge outcome reason | `generic_decline` |
| **Seller message** (merchant-facing) | "The BLIK code has expired, was already used, or exceeded its lifetime." |
| **API error message** (developer-facing) | "The code passed has expired. BLIK codes expire after 2 minutes, please request another code from the customer." |

Note what differs. The seller message is **diagnostic and exhaustive** — it lists all three causes because the merchant is triaging. The API error message is **prescriptive and specific** — it gives the exact TTL and the exact next instruction, because the developer is coding a retry. Same event, two deliberately different pieces of information. A single shared string would have to be either vague or over-long.

Second example, `invalid_customer_account`:
- Seller message: "We can’t charge the customer’s account."
- API error message: "We can’t charge the customer’s account. Retry attempts might succeed after the customer takes action to resolve the issue with their account."

Here the API message is the seller message **plus a retryability clause**. Stripe's pattern is not "rewrite per audience" but "extend per audience" — the shorter register is a prefix of the longer one, which keeps them from drifting.

### The recommended customer-facing register, stated as a suppression rule

The third register — what the cardholder may be told — is defined mostly by **prohibition**, and this is the crucial half of the pattern. On the card decline table, five codes carry an explicit instruction *not* to surface the true reason:

| Decline code | Instruction (verbatim) |
|---|---|
| `fraudulent` | "Don’t report more detailed information to your customer. Instead, present it in the same manner as `generic_decline`." |
| `merchant_blacklist` | "Don’t report more detailed information to your customer. Instead, present it in the same manner as `generic_decline`." |
| `stolen_card` | "Don’t report more detailed information to your customer. Instead, present it in the same manner as `generic_decline`." |
| `lost_card` | "The specific reason for the decline shouldn’t be reported to the customer. Instead, present it as `generic_decline`." |
| `lost_or_stolen_card` (LPM) | "The specific reason for the decline shouldn’t be reported to the customer. Instead, present it as `partner_generic_decline`." |

So Stripe's three registers are:

1. **Machine-readable code** — stable, snake_case, never shown to a human. `fraudulent`.
2. **Developer/merchant-facing message** — truthful, specific, includes retryability and the real cause. "The payment was declined because Stripe suspects that it’s fraudulent."
3. **Recommended customer-facing message** — deliberately *less* informative than register 2, because full disclosure would arm a fraudster or defame a cardholder. Collapse to `generic_decline`.

The direction matters. Most products treat the customer-facing string as a *friendlier* version of the developer string. Stripe treats it as a *deliberately degraded* version, and gives the reason: "For privacy and security reasons, card issuers discuss the specifics of a decline only with their cardholders."

Two phrasings are used for the same rule ("Don’t report more detailed information to your customer" vs "The specific reason for the decline shouldn’t be reported to the customer") — a minor consistency defect in the single most important instruction on the page.

### `advice_code` — prescription separated from diagnosis in the data model

Stripe ships a second machine field alongside the decline code whose only job is to say what to do:

| Advice code | Meaning (verbatim, first clause) |
|---|---|
| `do_not_try_again` | "The card was declined and you shouldn’t use it again for the same transaction." |
| `try_again_later` | "The card issuer declined the transaction, but you can retry it." |
| `confirm_card_data` | "The card issuer declined the transaction because some of the provided information is incorrect." |

Stripe states the division of labour explicitly: "The `reason` in the `outcome` uses decline codes to tell you why the card issuer declined the authorization. The `advice_code` in the `outcome` tells you what to do next." **Why and what-next are two fields, not one string.** For a content designer this is the structural insight: if the recovery action is a separate field, the recovery copy can be centrally authored and reused across ~50 decline reasons instead of written 50 times.

Note the defect: `do_not_try_again` and `try_again_later` exist as *advice codes* and also existed as *decline codes*, where both are now marked `(Deprecated)`. The same two strings occupied two different fields with different meanings. Stripe deprecated the decline-code usages rather than renaming, so the collision is preserved in the docs.

### Card decline table — the "Next steps" column and its two subjects

Fifty-one card decline codes, each with a `Description` and a `Next steps` cell. The `Next steps` copy is written with an explicit subject, and the subject tells you who owns the recovery:

**"The customer needs to…"** — recovery is the cardholder's. Used for ~30 codes:
- `call_issuer`, `do_not_honor`, `generic_decline`, `no_action_taken`, `revocation_of_authorization`, `security_violation`, `service_not_allowed`, `stop_payment_order`, `transaction_not_allowed`: "The customer needs to contact their card issuer for more information."
- `card_not_supported`: "…to make sure their card can be used to make this type of purchase."
- `currency_not_supported`: "The customer needs to check with the issuer whether the card can be used for the type of currency specified."
- `insufficient_funds`, `withdrawal_count_limit_exceeded`: "The customer needs to use an alternative payment method."
- `expired_card`: "The customer needs to use another card."
- `incorrect_cvc` / `invalid_cvc`: "The customer needs to try again using the correct CVC."
- `incorrect_zip`: "The customer needs to try again using the correct billing postal code."
- `pin_try_exceeded`: "The customer must use another card or payment method." (**`must`, not `needs to` — the only modal shift in the table**)

**"Attempt the payment again" / "Ask the customer to…"** — recovery is the integrator's:
- `approve_with_id`: "Attempt the payment again. If you still can’t process it, the customer needs to contact their card issuer."
- `issuer_not_available`: same construction
- `processing_error`: "Ask the customer to attempt the payment again. If it still can’t be processed, the customer needs to contact their card issuer."
- `duplicate_transaction`: "Check to see if a recent payment already exists." (no customer involvement at all)
- `reenter_transaction`: "The payment needs to be attempted again." (**passive voice — the only cell with no named actor**)

**Hardware-specific recovery** — recovery is physical:
- `offline_pin_required`: "The customer needs to try again by inserting their card and entering a PIN."
- `online_or_offline_pin_required`: a conditional — "If the card reader supports Online PIN, prompt the customer for a PIN without creating a new transaction. If the card reader doesn’t support Online PIN, the customer needs to try again by inserting their card and entering a PIN."
- `mobile_device_authentication_required`: "Ask the customer to retry the payment by tapping their mobile device again."

**Anti-recovery** — recovery is refused:
- `testmode_decline`: "A genuine card must be used to make a payment."

The `Next steps` column is a **three-way ownership taxonomy expressed purely through grammatical subject**: "the customer needs to", "attempt / ask / check" (you), and passive. No badge, no icon, no field — just who the sentence is about. That is a cheap and highly portable technique.

### The retryability sentence — a bounded vocabulary

Across the LPM table, retryability is stated in exactly four recurring forms, which function as a controlled vocabulary:

- `Retries won’t succeed.` — terminal. Used for `currency_not_supported`, `invalid_amount`, `invalid_billing_agreement`, `compliance_violation`, `invalid_authorization`, `invalid_payment_information`, `partner_action_not_supported`, `card_already_activated`
- `Retry attempts might succeed after the customer takes action to resolve the issue with their account.` — conditional on the customer
- `Retry attempts might succeed after the customer updates their payment information.` — conditional on a specific customer action
- `If the account is reactivated, retry attempts might succeed.` / `If the dispute resolves in favor of the business, retry attempts might succeed.` — conditional on an external event

Note `might`, never `may` or `will`. And note that the terminal case is stated **positively as a fact about retries** ("Retries won't succeed") rather than as a prohibition ("Do not retry"). The former survives translation and gives the developer a reason; the latter is an order.

### Error-codes reference: ~190 codes, resolution-first prose

The error-codes page is not a glossary — every entry's description ends in a resolution. The dominant shapes:

**Imperative fix** — `amount_too_large`: "The specified amount is greater than the maximum amount allowed. Use a lower amount and try again." Also `amount_too_small`, `resource_already_exists` ("Use a different, unique value for `id` and try again"), `parameter_unknown` ("Remove these and try again"), `token_already_used` ("You must create a new token before you can retry this request").

**Fix-or-substitute, offered as a pair** — the card-detail family all take the identical shape "Check the X or use a different card.": `expired_card`, `incorrect_cvc`, `incorrect_number`, `incorrect_address`, `incorrect_zip`, `invalid_cvc`, `invalid_number`, `invalid_expiry_month`, `invalid_expiry_year`. **Nine codes, one sentence template, one swapped noun.** This is templated error copy done well — the reader learns the shape once.

**Route to a named surface** — `payment_method_unactivated`: "Activate the payment method in the Dashboard, then try again." `api_key_expired`: "Obtain your current API keys from the Dashboard and update your integration to use them." `stripe_tax_inactive`: "See the setup documentation to get started."

**Route to a human, with the escalation named** — `charge_exceeds_transaction_limit`: "Contact us to request a higher processing limit." Also `customer_max_subscriptions`: "Contact us if you’re receiving this error." — note that this one carries **no diagnosis the user can act on**, only an escalation, and Stripe says so plainly rather than inventing advice.

**Explain the design, not just the failure** — `card_decline_rate_limit_exceeded`: "This card has been declined too many times. You can try to charge this card again after 24 hours. We suggest reaching out to your customer to make sure they’ve entered all of their information correctly and that there are no issues with their card." Gives the exact cooldown (24 hours) rather than "try again later".

**Deprecation-as-error** — a small set of codes exist only to say a capability was withdrawn: `alipay_upgrade_required` ("This method for creating Alipay payments isn’t supported anymore. Upgrade your integration to use Sources instead."), `bitcoin_upgrade_required`, `tls_version_unsupported` ("Your integration is using an older version of TLS that’s unsupported. You must be using TLS `1.2` or above."). Migration instructions delivered through the error channel.

**Errors that name the exact Dashboard path** — `anomalous_money_movement_request`: "…disable anomaly detection in your Dashboard settings by going to **Settings** > **Developers** > **Manage API keys** > **Anomaly detection**." Breadcrumb-in-error-string, bolded. Brittle to reorganisation but unambiguous for the reader.

**Errors that recommend a product change** — `insufficient_funds` on the declines/card page: "To help minimize declines due to insufficient funds, consider adding a buy now, pay later (BNPL) option." Cross-sell inside failure documentation, framed as mitigation.

### Recovery framing by session state `[documented]`

Stripe splits recovery guidance by whether the human is present, with its own headings:

- `On-session declines`: "If your customer is present in your website or application’s checkout flow, prompt them to try their payment method again or ask for a new payment method."
- `Off-session declines`: "If your customer isn’t available to make a payment or update a payment method, notify them (for example, send them an email or in-app notification) to visit your website or application."

Both `on session` and `off session` carry an inline definition on first use: "A payment is described as off-session if it occurs without the direct involvement of the customer, using previously-collected payment information." Defining the *presence condition* rather than assuming it is the right call, because the whole recovery pattern hinges on it.

### Error taxonomy self-documentation

The error-codes page and the declines page each open with a callout that routes to the other:

> `Card decline errors` — "If a card issuer declines a charge and you get an API error, the error includes a `decline_code` that describes the reason. Stripe decline codes are more specific than card issuer decline codes."

> `Other API errors` — "Some API errors include a `code` attribute to help you resolve them."

Two overlapping error vocabularies, each page pointing at the other with a one-line rule for which is which. This is the cheapest possible solution to the "which error table do I need" problem and Stripe ships it as a boxed callout, not buried in prose.

Every error code carries a `doc_url` back to its own table row: "When an API error has a `code` value, its `doc_url` attribute contains a link to that error code’s entry in the table." **Deep-linkable error documentation as an API field** — the error carries its own help link.

## T8 Empty states `[absent]`

No no-data, no-results, or first-run states were reachable. The Dashboard, Workbench, and support search are all authenticated or client-rendered. Two documented near-misses:

- `invoice_upcoming_none`: "There is no upcoming invoice on the specified customer to preview. Only customers with active subscriptions or pending invoice items have invoices that can be previewed." — an empty state delivered as an API error, and notably it explains *the eligibility condition* for non-emptiness rather than just reporting absence. That second sentence is exactly what a good empty state does.
- `invoice_no_customer_line_items` / `invoice_no_subscription_line_items`: "…there are no pending invoice items. Verify that the correct customer is being specified or create any necessary invoice items first." — absence plus two hypotheses (wrong object, or genuinely empty) plus the fix. Again, the shape of a good empty state, delivered as an error.

Recording these as the closest available evidence; true UI empty states need an authenticated pass.

## T9 Notifications & system messages `[documented]`

- **Security email trigger, documented to the user**: "For time-sensitive activities, specifically logins from unknown IPs and devices, Stripe sends automatic email notifications to the user, so they don’t need to manually review the logs." Stripe explains *why* the notification exists (so you needn't read the audit log) — the notification is positioned as a labour saving, not an alarm.
- **Proactive outbound on credential leak**: "We proactively scan the internet for our merchants’ API keys. If we find a compromised key, we take appropriate action, advising the user to roll their API key." The verb `roll` is the developer-register term for rotate.
- **Off-session failure notification is delegated, not sent by Stripe**: "notify them (for example, send them an email or in-app notification) to visit your website or application." Stripe tells the merchant to write the copy; it does not supply a template. A gap a content designer would have to fill.
- **Webhook as notification channel**: `payment_intent.payment_failed` — "the `payment_intent.payment_failed` event triggers when a payment attempt is unsuccessful."
- **In-Dashboard decline message** `[documented via alt text]`: the declines page embeds a screenshot whose caption/alt text reads `Declined payment due to insufficient purchase funds` — rendered on the page as "Declined payment due to insufficient funds". The surrounding prose describes the pattern: "When a payment gets declined, Stripe offers a reason for the decline and briefly suggests a resolution path." **Reason plus resolution, explicitly stated as the in-product convention** — the same two-part structure as the docs table. The convention is consistent across the docs surface and the product surface.
- **Support-request authentication as a message policy**: "You must authenticate user support requests by sending them from the Dashboard after login, or by verifying account access before we offer a support response."

Status-page incident notices: **not retrievable** (see Caveats).

## T10 Disclosures, legal & compliance `[observed]`

**Pricing disclosure — the load-bearing adjective.**

> `2.9% + 30¢` — "per successful transaction for domestic cards"

`successful` is doing the disclosure work, exactly as "exactly" does in Wise's `You send exactly`. One word tells the reader that failed attempts are not billed, and it is repeated verbatim in every fee row on the page.

Two scope qualifiers are stacked into the same line: `successful` (outcome scope) and `domestic cards` (instrument and geography scope). Additive rates are then presented with a literal `+` as a standalone element between blocks:

`2.9% + 30¢` `+` `0.5%` "for manually entered cards" `+` `1.5%` (international, per the truncated section)

**Rendering the fee stack as arithmetic** rather than as a table of totals means the reader can see which surcharge applies to them and ignore the rest. It also means no row ever states a misleading all-in figure.

**Negative-space disclosure.** "No setup fees, monthly fees, or hidden fees." and, in the FAQ: "Stripe does not charge setup fees, monthly fees, or any other hidden fees like closure fees. All fees for businesses on standard pricing are listed on our website." The FAQ version adds a specific example of the category (`closure fees`) and a completeness claim. Naming one concrete instance of "hidden fee" is more credible than the abstract denial in the hero.

**Conditional-by-tier disclosure.** The refund FAQ answers *twice*, once per pricing tier, with different answers:
- standard pricing: refunds are generally free, but bank-transfer refunds may carry fees, and — the important clause — the original processing, Connect, and FX fees are not returned
- custom pricing: depends on your negotiated fee schedule

Splitting one answer by contract type, and stating plainly that custom-pricing customers must consult their own schedule, avoids the usual trap of writing an answer that is true for only one cohort.

**Tax disclosure is scoped to the reader's own attributes**: tax on Stripe fees depends on location and business/tax status, which determine both taxability and rate. Stated as a dependency chain rather than a rate.

**Jurisdictional hedging as a standard suffix**: `Eligibility varies by market.` (discounts) · `Custom pricing available for standalone 3DS.` · `(Pricing differs for Connect users)` in parentheses inline · `In select regions, get paid out in your preferred currencies.` · `Terminal is currently only available in some countries.` (error `terminal_location_country_unsupported`)

**Compliance certification naming — full formal names, then the plain-language stake.** The security page never states a certification without stating what it means:
- `PCI Service Provider Level 1` + "This is the most stringent level of certification available in the payments industry."
- `SOC 1` / `SOC 2 Type II` + "produced annually and can be provided upon request" (availability stated, not just existence)
- `SOC 3` + "a public report of internal controls over security, availability, and confidentiality" + a direct PDF link
- `EMVCo Level 1 and 2`, `PA-DSS` + "the global security standard that aims to prevent payment applications developed for third parties from storing prohibited secure data"
- `NIST Cybersecurity Framework` — alignment claimed, not certification: "aligned with"
- `CBPR` and `PRP` with live validation links; `EU-US DPF`, `UK Extension to the EU-US DPF`, `Swiss-US DPF` with a link to the government participant search

**The verb gradient is the disclosure.** `certified us to` (PCI, audited by a third party) vs `regularly audited as part of our compliance programs` (SOC) vs `aligned with` (NIST) vs `complies with` (DPF). Four different strengths of claim, differentiated by verb, never conflated into a single "we are compliant". This is precise, legally defensible, and readable — a genuinely good model for a trust page.

**Shared-responsibility framing for PCI.** Stripe does not claim to make the merchant compliant; it lists what it does *toward* the merchant's compliance:
- "We analyze the user’s integration method and dynamically inform them of which PCI validation form to use."
- assistance completing the `Self-Assessment Questionnaire` in the Dashboard, conditional on using Elements/Checkout/Terminal SDKs
- a published `PCI Compliance Guide`

The obligation stays with the merchant; Stripe's contribution is enumerated. Compare the pricing page's blunter one-liner: "PCI compliant — Use our libraries to collect payment information without sensitive data ever hitting your servers." The marketing surface flattens the shared-responsibility model that the docs surface carefully preserves. **A register inconsistency with compliance consequences**, and worth flagging as a defect.

**Security recommendations that rank their own options and disparage one.** "We recommend passkeys or hardware security keys because they’re resistant to phishing. SMS-based MFA is vulnerable to SIM-swapping and interception, so use it only as a last resort." Stripe ships a supported feature and tells you not to use it, with the threat named. Very few products will say "use it only as a last resort" about their own option.

**Data-minimisation stated as policy with the tension acknowledged**: "we have a data retention policy that reduces the data we keep while complying with regulatory and business requirements." The "while complying with" clause concedes the limit rather than over-promising deletion.

**Restricted-business disclosure** is a first-class footer link: `Prohibited and restricted businesses`, alongside `Licenses` and `Your privacy choices`.

## T11 Help-centre architecture `[observed]`

Support home is a single question as the H1: `How can we help?` — no category tree above the fold, just `Popular articles` (ten). This is a search-and-popularity-first architecture, the inverse of Wise's six-topic tree.

**Article-title grammar — four shapes, and one that is unusually good**

| Shape | Examples |
|---|---|
| Elliptical question, no auxiliary | `Trouble signing in?` · `Can’t complete two-step authentication?` · `Charge you don't recognize from Stripe?` |
| Bare problem noun-phrase | `Late or missing payouts` |
| `How to <verb>` | `How to handle disputes` · `How to refund a customer` |
| Imperative task | `Add a bank account for payouts` · `Activate a new payment method` |

The elliptical-question shape is the notable one. `Trouble signing in?` and `Can’t complete two-step authentication?` drop the subject and auxiliary entirely — not "Are you having trouble signing in?" and not "Fixing two-step authentication problems". The result reads as the support agent's opening line and matches what a user types into search. `Charge you don't recognize from Stripe?` goes further and is grammatically a fragment, but it is precisely the phrase a confused cardholder would use, and — critically — it is aimed at a **non-customer** (the merchant's cardholder), who is the person most likely to arrive at Stripe's support site by accident. The article's own first line says so: "This page is for customers of businesses that use Stripe."

That is the pattern worth stealing: **write a support article for the audience you did not sell to.** An infrastructure company's support site inevitably receives the end consumers of its customers, and Stripe puts an article for them in the top ten.

**Anticipatory titling.** One title contains its own expectation-setting: `Waiting on your first Stripe payout? What you need to know`. Question plus promise, addressed at the point of anxiety rather than after the failure. The body then leads with the concrete number — a 7–14 day waiting period for the first payout — and gives the reason (risk review) rather than just the duration.

**Resolution rate published inside the article body** `[observed]`

- "This article helped 95% of Stripe users solve their issue." (`Waiting on your first Stripe payout?`)
- "This article helped 93% of Stripe users solve their issue." (`Add a bank account for payouts`)

This is the strongest single finding in Stripe's help architecture. The article **opens by telling you the probability that it will work**, as its first sentence, before any content. It sets expectation, it implicitly licenses the 5% to escalate, and it is a self-imposed quality metric published to users. Only two of the ten popular articles carry it, so it appears to be conditional on sample size or on exceeding a threshold — the absence on the other eight is itself informative, and a reader could reasonably infer that unbadged articles perform worse.

**Scoping disclaimers as opening lines.** Several articles open by narrowing their audience before answering: "This article is for Stripe Direct and Standard Connect users. For platforms working on 1099 tax forms for connected accounts, see Stripe Documentation…" (`1099-K tax forms`) and "This page is for customers of businesses that use Stripe." Route-then-answer, with the misrouted reader handled in sentence one.

**Answer-first snippets.** Every popular-article preview begins with the answer, not a restatement of the question: `Trouble signing in?` → "Forgot username? Your username is the email address you used to register." A nested question inside the snippet, answered immediately.

**Escalation is gated, and the gate is explained** (from the security page): support requests must originate from the authenticated Dashboard or be verified, "By requiring authentication, we minimize the risk of providing any information to non-authorized people." The friction is justified by the reason.

## T12 FAQs `[observed]`

One FAQ block found, at the foot of the pricing page under the heading `FAQs` (abbreviated and pluralised — not `Frequently asked questions`). Five questions, all answers present in server HTML.

| # | Question (verbatim) | Answer — summarised |
|---|---|---|
| 1 | How are payment fees calculated? | Per-transaction fee varying by the payment method the end customer chose; routes to a by-method fee page. Two sentences. |
| 2 | Will I be charged tax? | Yes in some cases; taxability and rate depend on the reader's location and business/tax status. Routes to a support article. |
| 3 | Are there additional fees for refunds? | Split into two bullets by pricing tier. Standard: generally none except bank-transfer refunds; original processing, Connect, and FX fees are not returned. Custom: per your fee schedule. |
| 4 | Do you have setup fees or monthly fees? | No, and no other hidden fees such as closure fees; all standard-pricing fees are published. |
| 5 | Do you offer any discounts? | Custom pricing exists for large volumes; eligibility varies by market. Two sentences, no figures. |

**Structural notes.** Very short list, and every question is a **cost question the reader is suspicious about**. The ordering is: how the headline number is computed → a cost you didn't expect (tax) → a cost on an adverse event (refunds) → the absence of costs → whether the number is negotiable. Q1–Q3 concede costs; Q4 denies them; Q5 offers to reduce them. Concede, deny, offer.

Q2 (`Will I be charged tax?`) uses `Will I` — future tense, first person. Q4 and Q5 use `Do you` — second person addressed at Stripe. The FAQ switches who the grammatical subject is depending on whether the answer is a fact about the reader or a fact about Stripe's policy. That is a coherent rule, applied consistently across five questions.

No FAQ block on the homepage, docs index, or security page. `[absent]` there.

## T13 Terminology & glossary `[observed]`

| Term | Stripe's usage | The alternative it rejected |
|---|---|---|
| `financial infrastructure` | The top-line category noun, in the hero | "payment processor", "gateway", "PSP" |
| `Intent` (`PaymentIntent`, `SetupIntent`) | The central object noun: a declared intention that accrues state | "transaction", "charge" as the primary object |
| `Charge` | Retained as the lower-level object beneath Intents | |
| `decline code` vs `error code` | Two separate published vocabularies with a routing rule between them | one merged "error" namespace |
| `advice_code` | A field whose only content is the recommended next action | folding advice into the error message |
| `Charge outcome reason` | A third status axis distinct from both code and message | |
| `Seller message` | The merchant-facing register, named as such in a table header | "merchant", "user", "customer" |
| `customer` | Always the *merchant's* end buyer, never the Stripe account holder | Stripe calls its own account holder `user` or `business` |
| `user` | The Stripe account holder ("our users trust Stripe") | "merchant", "client" |
| `security code` (prose) vs `cvc` (code) | Deliberate register split | "CVV" |
| `postal code` (prose) vs `zip` (code) | Deliberate register split; both `incorrect_zip` and `incorrect_postal_code` exist as codes | |
| `on session` / `off session` | Named presence states, each glossed inline on first use | "customer-initiated" / "merchant-initiated" (the card-network terms) |
| `mandate` | Retained regulatory term for a stored-payment agreement | "authorization", "consent" |
| `Card Data Vault` (`CDV`) | Named internal system disclosed publicly | |
| `roll` (an API key) | Developer-register verb | "rotate", "regenerate" |
| `sandbox` | The isolated test environment | Stripe still also uses `test mode` / `livemode` — two vocabularies coexist |
| `livemode` / `test mode` | One word vs two words for the paired concepts | |
| `Smart Retries` / `Real-time retries` / `Adaptive Acceptance` / `Authorization Boost` | Four capitalised proper-noun features in the decline-recovery space | |
| `Radar` / `Radar Lite` | Fraud product; `Lite` as the bundled tier suffix | |
| `Link` | Accelerated checkout, named with an ordinary English word — high collision risk in prose | |
| `keyline` | Design-token word for a border | "border", "stroke" |
| `stack` (`'x'`, `'y'`, `'z'`) | The layout primitive, replacing flex/grid vocabulary | |
| `Agentic Commerce Protocol` (`ACP`) | Coined protocol name | |
| `IC+ pricing` | Interchange-plus, abbreviated without expansion on the pricing page | **Unglossed jargon** — see T14 |
| `Like-for-like settlement` | Payout in the currency received | "same-currency settlement" |
| `buy-rates` | Platform wholesale pricing, on the Custom tier list | |
| `Skills` / `plugins` / `agents` | New vocabulary for machine consumers of the docs | |

**The `Intent` decision is the deep one.** By naming the central object an *Intent*, Stripe made a state machine of requirements grammatically natural: an Intent can `require_payment_method` because intentions have prerequisites, whereas a "transaction" cannot coherently "require" anything. The object noun and the state vocabulary were designed together. That is rare and it is why the `requires_*` states read so cleanly.

**Unglossed terms, recorded as defects.** `IC+ pricing` appears in the Custom-tier feature list with no expansion and no link. `buy-rates` likewise. Both sit on a public marketing page whose stated audience includes businesses with "unique business models" — plausibly sophisticated, but the same page carefully glosses `3D Secure` and `Adaptive Pricing`. Inconsistent glossing discipline.

By contrast the docs surface glosses aggressively with **inline parenthetical definitions on first use**, rendered in the markdown as `*term* (definition)`:
- `3D Secure` — "provides an additional layer of authentication for credit card transactions that protects businesses from liability for fraudulent card payments"
- `asynchronous payment method` — "can take up to several days to confirm whether the payment has been successful. During this time, the payment can't be guaranteed"
- `FSA or HSA` — "debit cards use pre-tax funds to cover certain types of purchases… restricted only to businesses that directly provide eligible products and services"
- `TLS` — "the process of securely transmitting data between the client… and your server"

The `asynchronous payment method` gloss is the best of these: it defines the term by its **user-visible consequence** (days of uncertainty, no guarantee) rather than by its mechanism. A reader who has never heard the term now knows what it will do to their UI.

## T14 Voice, tone & accessibility `[observed]`

**Person.** Second person for the reader throughout, including in docs. First-person plural for Stripe, and Stripe is a named actor in adverse copy: "Stripe shares some of the decline information it receives", "we take appropriate action", "We can’t charge the customer’s account", "Stripe didn’t receive a response from the destination endpoint." Note the last one — Stripe names itself as the party that failed to receive, then immediately reassigns cause: "This typically indicates a problem with the destination endpoint, rather than with Stripe."

**Blame attribution is explicit and repeated.** Three error codes carry near-identical exculpatory clauses: `forwarding_api_upstream_connection_error`, `forwarding_api_upstream_connection_timeout`, and `forwarding_api_retryable_upstream_error` all say the problem is the destination, not Stripe. One of them adds an honest uncertainty admission rather than a clean verdict: "You might want to investigate the state of the request on the third party because bytes might have been sent and the third-party state could be indeterminate." **"Could be indeterminate" in a production error message** is unusually candid — most products would say "the request failed."

**Register gradient, the same phenomenon as Wise but inverted in placement.** Marketing copy carries the colour ("vibe-coding juggernaut", "best day ever", "the backbone of global commerce", "Book of the week"); docs and error prose carry none. Zero exclamation marks observed across any surface, including marketing. No `Oops!`, no `Uh oh`, no anthropomorphised failure. The tone does not so much flatten as switch cleanly at the docs boundary.

**Contractions.** Used freely in docs ("doesn’t", "isn’t", "can’t", "won’t", "you’ll"), including in error strings. Avoided in compliance prose on the security page, which shifts to full forms and longer sentences.

**Modals are used as a precision instrument, not for politeness.** In the decline tables: `needs to` (default), `must` (once, `pin_try_exceeded`), `might` (all retry conditionals), `shouldn’t` (the suppression rule), `won’t` (terminal retries). The choice between `might succeed` and `won’t succeed` is load-bearing — it is the difference between a retry loop and a hard stop — and Stripe never blurs it with "may".

**Sentence shape in reference tables.** Overwhelmingly two sentences: cause, then action. `expired_card`: "The card has expired. Check the expiration date or use a different card." The consistency across ~190 entries is the achievement; a reader scanning the table learns after three rows that the second sentence is always theirs to act on.

**Accessibility content**

- **Alt text is genuinely descriptive and interpretive**, and on the homepage it explains the *visual conceit* rather than just the contents: "Aerial view of a street intersection where the crosswalks form a slanted parallelogram, imitating the Stripe logo." · "Exterior view of a clothing boutique with a large window display showcasing garments, where the window frame forms Stripe's parallelogram logo." · "Overhead view of a door stoop with a grocery delivery bag containing flowers, bread, olive oil, and produce, where the bag's shape forms Stripe's parallelogram logo." · "Street view of a traditional Parisian newspaper kiosk with yellow-framed windows displaying publications, where the window frame forms Stripe's parallelogram logo." Four images, four alt texts that convey the brand joke a sighted reader would get. This is the best alt-text practice in the batch.
- Docs images carry a functional caption that doubles as alt: `Declined payment due to insufficient funds`.
- Carousel position is announced in text: `Item 1 of 8: Businesses on Stripe generated $1.9T in 2025.` — a live-region-style string exposed in the DOM.
- Many logo images carry only the text `BMW logo`, `Amazon logo`, `Maersk logo`, `Twilio logo` — correct and minimal.
- **Defect:** a large number of homepage decorative and product-screenshot images have entirely empty alt (`![]`) *including* images that appear to carry product-illustration meaning (the payment bento background, the Connect card background, the dataviz static image). For purely decorative backgrounds this is correct; the `DatavizStatic3x.png` case is the one that looks wrong, since a data visualisation presumably carries information.
- **Defect:** the hero headline block appears twice in the DOM (responsive variants), and the nav sign-in link renders as `Sign inSign in` — a doubled accessible name. Both are likely responsive-duplication artefacts; a screen-reader user may encounter the headline twice.
- **Defect:** `CA residents: +1 888 926 2289` is a bare label-and-number with no link markup and no explanation of why California residents specifically get a phone number (it is a CCPA requirement, but the copy does not say so). The disclosure is present and the reason is missing.
- `meta-format-detection: telephone=no, email=no` is set, which suppresses automatic tel/mailto linkification on mobile — a deliberate choice that works against that phone number.

**No published content style guide.** This is the significant negative finding. Stripe publishes `docs.stripe.com/stripe-apps/style` and `docs.stripe.com/stripe-apps/components`, but these are **purely visual and structural** — design tokens for colour, typography (`font: 'heading'`), spacing (`xxsmall` 2px through `xxlarge` 48px), fractional sizing, and a stack-based layout model. There is no voice-and-tone documentation, no error-message writing guidance, and no content checklist in the published design system, despite Stripe operating one of the most disciplined error-copy systems in the industry. The rules are visibly *applied* across ~190 error entries and nowhere *stated*. A content designer must reverse-engineer them from the reference tables, which is precisely what this file does.

The closest thing to published content guidance is the suppression rule in the decline table ("present it in the same manner as `generic_decline`") — a content rule shipped as a data-reference footnote.

---

## Transferable patterns

1. **Separate the machine code, the operator message, and the recommended end-user message — and treat the last one as deliberately *less* informative.** Stripe publishes all three as named columns. The direction is the insight: for fraud, lost, stolen, and blocklist declines the customer-facing string is a *degradation* of the truth, not a friendlier paraphrase, because the honest string would arm a fraudster or defame a cardholder. Directly applicable to PayPal decline, risk-hold, and limitation copy, where the temptation is to write one string and soften it. Condition: only works if you also publish the rule about *which* reasons collapse, or teams will collapse the wrong ones.

2. **Make "what to do next" a separate field from "what went wrong."** `advice_code` (`do_not_try_again` / `try_again_later` / `confirm_card_data`) means three recovery strings serve ~50 decline reasons. The content cost of a new decline reason drops to one diagnosis sentence. Condition: requires the taxonomy to be genuinely small — three or four values. If it grows to fifteen you have rebuilt the error table.

3. **Name states as outstanding requirements, not as object conditions.** `requires_payment_method`, `requires_confirmation`, `requires_action` — four of seven PaymentIntent states say what is still needed, so the state name is also the instruction and the UI can render it directly. This depends on the object being named an *Intent*; the noun and the state vocabulary have to be designed together. Highly transferable to any multi-step money-movement or verification flow.

4. **State retryability in a bounded vocabulary, positively.** `Retries won’t succeed.` / `Retry attempts might succeed after the customer takes action…` — four fixed forms, `might` never `may`, and the terminal case phrased as a fact about the world rather than as a prohibition. Gives the integrator a reason instead of an order and survives translation.

5. **Encode recovery *ownership* in the grammatical subject.** "The customer needs to…" vs "Attempt the payment again" vs passive voice. No badge, no icon, no field — the sentence's subject tells the reader who acts. Free to implement, and it exposes the cases where nobody owns recovery (Stripe's `reenter_transaction` passive cell is exactly such a gap, visible only because the rest of the column is consistent).

6. **Publish the article's resolution rate as its first sentence.** "This article helped 95% of Stripe users solve their issue." Sets expectation, licenses the failing minority to escalate, and commits the content team to a measured outcome. Condition: you must be willing to show low numbers too, and readers will infer badly about unbadged articles — decide the display threshold deliberately.

7. **Write support content for the audience you did not sell to.** `Charge you don't recognize from Stripe?` is in the top ten popular articles and is aimed at the *merchant's* cardholder, not the customer. Any infrastructure or white-label product inherits its customers' customers as an unplanned support audience. Directly applicable to PayPal's branded-vs-unbranded surfaces.

8. **Differentiate compliance claims by verb.** `certified us to` / `regularly audited` / `aligned with` / `complies with` — four strengths of claim, never collapsed into "we are compliant". Precise, defensible, and readable. Note the counter-example on the same product: Stripe's own pricing page flattens this into a bare "PCI compliant", losing the shared-responsibility model the docs page carefully preserves. The pattern only holds if marketing observes it too.

9. **Gloss a term by its user-visible consequence, not its mechanism.** `asynchronous payment method` is defined as "can take up to several days to confirm whether the payment has been successful. During this time, the payment can't be guaranteed." The reader now knows what it does to their UI. Better than any definition of the mechanism would be.

## Caveats & gaps

- **`status.stripe.com` not retrievable.** The server response body is the single word `Loading...`; the page is fully client-rendered. Component names, severity labels, and incident-update vocabulary are therefore `[absent]` from this file. This is a real gap for T6 and T9 — Stripe hyperlinks its `99.999%` uptime claim to this page, so the incident vocabulary is load-bearing for the trust story. A browser-rendered pass is needed.
- **`docs.stripe.com/error-handling` returned only a language-variant index** (`?lang=ruby`, `?lang=python`, `?lang=php`, `?lang=java`, `?lang=node`, `?lang=go`, `?lang=dotnet`). The prose on error-class naming and try/catch guidance lives behind one of those variants and was not fetched. Error *class* names (`CardError`, `InvalidRequestError`, etc.) are therefore not recorded here — I did not want to state them from memory.
- **Pricing page was truncated in transit** (~70K characters). The Standard-tier headline rate, feature grid, product anchor list, Custom tier, and the full FAQ block were all captured; the per-product fee detail for roughly twenty products between the `Payments` block and the `Custom pricing` section was not read line by line. Any per-product fee figure should be re-verified before use.
- **All in-product UI is unobserved.** Dashboard states, Workbench error views, Checkout's customer-facing decline messaging, validation messages, toasts, and every empty state are behind auth. Where I record in-product copy it is `[documented]` from a docs description or an image caption, and marked as such.
- **T5 (form and field labels) is effectively empty.** No pre-auth form exists on the public surface. Field vocabulary was reconstructed from error-code prose, which tells you the *names* of fields but nothing about their labels, placeholders, hint text, or validation-requirement copy.
- **T8 (empty states) is `[absent]`** in the true sense. The two API errors I record (`invoice_upcoming_none`, `invoice_no_customer_line_items`) are structurally empty-state-shaped but are not UI empty states.
- **Error-code table read in full; decline tables read in full.** These are complete. The `network-codes` page (`docs.stripe.com/declines/network-codes`) was referenced but not fetched, so the 2–4 digit network decline and advice codes are not enumerated here — only the fact of their existence and Stripe's warning that their meaning varies by card brand.
- **No published content style guide found.** Searched; `stripe-apps/style` and `stripe-apps/components` are visual/structural only. If a voice-and-tone document exists it is not public. Marked as a negative finding in T14 rather than a harvest failure.
- **Locale:** en-US throughout (`meta-request-country: US`). Stripe serves localised sites (`/en-ca/` paths observed in a link); no non-US locale was harvested, so US-centric strings such as `incorrect_zip` and the `30¢` fee are not evidence about other markets.
- **Conflicting figures recorded, not resolved:** `99.999%` vs `99.9999%` uptime; `500M+` vs `250 million+` API requests per day. Both pairs appear on Stripe's own pages. I have not determined which is current.
- Support-article *bodies* were not opened; only the ten popular-article titles and their preview snippets. The snippets are unusually informative (answer-first), but nothing here describes full answer structure.

## Sources

1. https://stripe.com/
2. https://stripe.com/pricing
3. https://docs.stripe.com/
4. https://docs.stripe.com/get-started
5. https://docs.stripe.com/error-codes
6. https://docs.stripe.com/declines/codes
7. https://docs.stripe.com/declines/card
8. https://docs.stripe.com/error-handling
9. https://docs.stripe.com/payments/paymentintents/lifecycle
10. https://docs.stripe.com/security
11. https://docs.stripe.com/stripe-apps/style
12. https://support.stripe.com/
13. https://status.stripe.com/ — attempted, not retrievable (client-rendered)
