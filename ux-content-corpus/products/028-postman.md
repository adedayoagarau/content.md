# 028. Postman

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | API development platform — API client, spec design, testing, mocking, monitoring, and API governance |
| Primary URL | https://www.postman.com/ |
| Corpus rank | 028 |
| Benchmark strength (source list) | API-workflow onboarding |
| Locale / market observed | en-US (`og:locale: en_US`; a `ja_JP` alternate exists at `/jp/` on every page) |
| Platform observed | Web (marketing), docs (`learning.postman.com`, Fern-built, every page available as `.md`), Zendesk support centre, Statuspage status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | SOC 2 Type II, PCI DSS, HIPAA, GDPR, CCPA / CPRA, CSA STAR, TX-RAMP, ISO 27001, **ISO 42001** (AI management systems), US Data Privacy Framework; EU data residency option; published shared-responsibility model; HackerOne bug bounty |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 usable (11 attempted) |
| Harvest completeness | Partial — (a) support-centre *category* pages were not opened, so article titles are `[absent]`; (b) the pricing comparison table's ~80 feature rows were truncated in transit; (c) `/docs/getting-started/troubleshooting/troubleshooting-apps/` returned an empty body; (d) the enterprise contact form requires JavaScript and its field labels were not retrievable. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Product / platform page | https://www.postman.com/product/ | Hero, nine capability groups, three-benefit block, stat block. Reached via `/product/what-is-postman/`, which redirects. |
| Pricing | https://www.postman.com/pricing/ | Four-tier plan naming, AI-credit metering, comparison table (partly truncated) |
| Docs index | https://learning.postman.com/docs/introduction/overview/ | **Ten single-verb top-level categories** — the standout IA finding |
| Quick start | https://learning.postman.com/docs/getting-started/quick-start | Three-task onboarding, "How it works" interleave |
| **Debug API requests** | https://learning.postman.com/docs/use/send-requests/response-data/troubleshooting-api-requests.md | 14-row `Issue` / `Resolving the issue` table; `Debug with AI`; three-tier escalation |
| **Troubleshoot vault secrets** | https://learning.postman.com/docs/use/postman-vault/troubleshoot-vault-secrets.md | Two named failure states with cause→action pairs bound to real buttons |
| Troubleshoot app issues | https://learning.postman.com/docs/getting-started/troubleshooting-inapp | OS-branched instructions, log-retrieval copy, routing table |
| Security / trust | https://www.postman.com/security/ | Nine-question FAQ with answers, nine certifications, shared-responsibility model, three-layer secret model |
| Status page | https://status.postman.com/ | Regional component groups, 5-value legend, 5-stage incident lifecycle, 90-day empty history |
| Support Center home | https://support.postman.com/hc/en-us | Six routing cards plus a three-option `Still need help?` block |
| Troubleshooting apps (docs) | https://learning.postman.com/docs/getting-started/troubleshooting/troubleshooting-apps/ | **Returned empty body** |

---

## T1 Navigation & IA labels `[observed]`

### Docs IA — ten single-verb categories, each with a scope sentence

This is the strongest finding in the file and the clearest answer to the brief's "API-workflow onboarding" framing.

| Category (verbatim) | Scope line (verbatim) |
|---|---|
| `Quick start` | "Get up and running with Postman. Learn how to use Postman to send requests, and write tests." |
| `Install` | "To get started, download and install the Postman desktop app." |
| `Navigate` | "Once you're in Postman, check out how to navigate the interface." |
| `Account` | "Create a Postman account. Then, learn how to set up and customize Postman and your profile." |
| `Use` | "Send API requests, group them in collections, and secure your data with Postman Vault." |
| `Test` | "Write scripts to add dynamic behavior to requests and collections. Perform API tests, add dynamic parameters, pass data between requests, and more." |
| `Design` | "Use Spec Hub to design your API's structure, or use types in collections to design your API with the Postman Collection format." |
| `Collaborate` | "Collaborate with your team on API projects. Create internal workspaces, where team members can share, version, and discuss their work and collaborate on API projects." |
| `Administer` | "Deploy Postman at scale to your team. Customize and secure your team's experience, and manage your team and plan." |
| `Troubleshoot` | "Having trouble? Learn how to troubleshoot app issues." |

Seven of the ten labels are **a single bare verb**: `Install`, `Navigate`, `Use`, `Test`, `Design`, `Collaborate`, `Administer`, `Troubleshoot`. Not `Using Postman`, not `API Testing`, not `Administration`. One word, imperative mood, no object.

Three consequences worth naming. First, the labels are **maximally scannable** — a reader looking for the testing docs finds `Test` in one saccade. Second, the single verb **forces the scope line to do all the specification work**, which is why every scope line is a full sentence enumerating what the category contains. Third, and most interesting, the sequence is **the user's journey, not the product's structure**: `Install` → `Navigate` → `Account` → `Use` → `Test` → `Design` → `Collaborate` → `Administer` → `Troubleshoot`. The order tracks time-since-first-download, from "I have not installed it" to "I run this for a 500-person org", and ends at failure. `Design` sits *after* `Test`, which inverts the logical API lifecycle but matches the empirical order in which a Postman user encounters the features — they send a request long before they write a spec.

`Troubleshoot` last, and its scope line is the only one that opens with a question: **"Having trouble?"** Two words, in the user's voice, at the one place in the IA where the user is not in a good mood. The category itself is a neutral verb; the empathy is in the scope line. That split — flat label, warm scope line — is a reusable division of labour.

Note `Account` is the one non-verb in the set (it is a noun), and its scope line has to supply the verb ("Create a Postman account"). A ten-item set with one exception, and the exception is visible.

### Marketing nav — grouped by lifecycle stage, using ampersands

`Product` → four groups: `Platform` · `Explore` · `Design & Build` · `Test & Validate` · `Manage & Operate`, plus `More from Postman`

The three stage groups are **verb pairs joined by an ampersand**: `Design & Build`, `Test & Validate`, `Manage & Operate`. Six verbs, three groups, and each group name reads as a phase of work. This is the same journey logic as the docs IA rendered as a nav taxonomy.

`More from Postman` holds five products on *other domains* (`Fabric`, `Fern` → buildwithfern.com, `Astro AI` → astropods.com, `Orbit` → buildwithorbit.ai, `Passport` → app.usepassport.ai). A nav group whose function is to leave the site — honest labelling of a portfolio that has outgrown one domain.

Each `More from Postman` and AI entry carries a **concatenated label-plus-tagline**, which is how the extracted DOM renders them:
`FabricRoute, govern, and observe your AI traffic` · `FernInstantly generate API docs and SDKs` ·
`AstroAIManage and control AI agents in production` · `OrbitTurn any task into the right API calls` ·
`PassportSecure API access for agents, humans and machines` ·
`Agent ModeAutomate API workflows with native AI` · `Postman CLIWork with Postman from the command line` ·
`Postman MCP ServerGive API context to your AI agents` ·
`AI EngineerScale velocity with agents. Keep quality and security.`

The taglines are uniformly good: each is a **verb-first phrase naming the job**, five to nine words, no adjectives. `Give API context to your AI agents` and `Turn any task into the right API calls` both name a transformation rather than a feature.

**Defect:** the concatenation means the accessible name of each nav link is `FabricRoute, govern, and observe your AI traffic` — the product name runs into the tagline with no separator. A screen-reader user hears "Fabric route govern and observe". See T14.

`Solutions` — four entries, each a problem-plus-promise pair:
`API GovernanceEnforce API standards at scale` · `Partner API ManagementOnboard partners in days, not months` ·
`API Lifecycle ManagementRun every stage as one connected system` · `SDLC AutomationEmbed quality into every delivery stage`

`Onboard partners in days, not months` is the only one with a **contrast construction**, and it is the most persuasive of the four.

`Resources` → `Learn` · `Connect` · `Get Support` · `Postman` · `Tools` (badged `new`)

`Get Support` groups four links that together form a support surface map: `Support Center` · `Release Notes` · `Postman Status` · `Security`. Putting release notes and the status page inside *support* rather than inside *developers* is a choice — it treats "what changed" and "what's broken" as the same class of question, which is how a user in trouble actually experiences them.

### Footer — five groupings, and one is a marketplace taxonomy

`Product` · `API Network` · `Resources` · `Legal and Security` · `Company`

`API Network` is twelve **industry categories** for the public API marketplace: `App Security` · `Artificial Intelligence` · `Communication` · `Data Analytics` · `Database` · `Developer Productivity` · `DevOps` · `E-Commerce` · `eSignature` · `Financial Services` · `Payments` · `Travel`. Postman ships a *content taxonomy for other companies' APIs* in its own footer — an unusual IA obligation for a tools vendor, and note that `Payments` and `Financial Services` are separate categories.

**Defect:** footer inconsistency across pages. The docs footer's `Resources` group includes `Templates`; the marketing footer's does not. The support-centre footer's `Product` group lists `Postbot`, `VS Code Extension`, `Tools`, and `API Governance` — four entries absent from the marketing footer, which instead lists `Agent Mode`, `API Catalog`, and `Fern`. The support footer also reads `© 2024 Postman, Inc.` where every other page reads `© 2026`. **A two-year-stale copyright line and a stale product list on the support site** — the surface a user reaches when something is already wrong.

Also inconsistent: the support footer uses `Trust and Safety` → `postman.com/trust/` while the marketing footer uses `Security` → `postman.com/security/`, and the support-centre body links to "Trust Center" at `postman.com/trust/` while the security page links to "Customer Trust Portal" at `security.postman.com`. **Three names (`Trust Center`, `Trust Portal`, `Customer Trust Portal`) and two URLs for the trust surface.**

## T2 Value proposition & headline patterns `[observed]`

**Product-page hero — a definition, not a claim**

> `Postman API Platform`
> "Postman is a unified platform for designing, testing, distributing, documenting, and monitoring APIs. It provides the governance enterprises require in a platform developers already know and love, enabling teams to collaborate seamlessly throughout API development."

The H1 is literally the product name. The positioning is entirely in the first sentence, and it is a **five-gerund enumeration** (`designing, testing, distributing, documenting, and monitoring`) — the scope stated as a list rather than as an abstraction. Contrast Stripe's `Financial infrastructure to grow your revenue` and Twilio's `The platform for conversations in the AI era`, both of which lead with a category claim. Postman leads with a definition.

The second sentence carries the actual strategic argument in a clause: **"the governance enterprises require in a platform developers already know and love."** Two buyers, two needs, one sentence, with the tension (governance vs. developer affection) named rather than papered over. This is the load-bearing sentence on the site and it is reused, compressed, twice more:

- Security-page hero: `Developers love us. CISOs trust us.`
- Security-page closing: `The platform your developers love. The security controls your CISO trusts.`

**`Developers love us. CISOs trust us.`** is the best headline in this batch. Six words, two sentences, two audiences, two different verbs — and the verb choice is the whole argument. *Love* is what an individual feels about a tool they chose; *trust* is what an accountable executive extends to a vendor. Postman is claiming bottom-up adoption and top-down approval simultaneously, and the asymmetry of the verbs makes the claim credible in a way "loved and trusted by everyone" never could.

Note the closing variant restores the objects (`The platform your developers love` / `The security controls your CISO trusts`) — the same idea in a longer, calmer register at the point of conversion. Short and punchy at the top, specific and concrete at the bottom.

**The section-header pattern: state the tradeoff, then refuse it**

`Ensure API quality at scale without adding more tools to your stack` ·
`Eliminate the speed vs. quality vs. security tradeoff` ·
`Your data doesn't train our models. Your team controls who uses AI and how.` ·
`Compliance isn't a checkbox it's a proof point. Ours are downloadable.` ·
`Every developer. Every account. One governance layer.` ·
`Stop credential sprawl at the source` ·
`Privacy by design globally compliant` ·
`Postman is now AI-native and so is our security model.`

Three constructions recur. **(a) `<goal> without <cost>`** — "without adding more tools to your stack". **(b) Negation-then-assertion** — "Compliance isn't a checkbox it's a proof point." **(c) Anaphoric tricolon** — "Every developer. Every account. One governance layer."

Construction (c) is used twice and is worth isolating: `Every developer. Every account. One governance layer.` The rhythm is two-plus-one — two instances of scope, then the single thing that covers them. It scans in under a second and it states an architectural claim.

**Defect, and a conspicuous one:** two of these headings have **missing punctuation at the clause boundary**. `Compliance isn't a checkbox it's a proof point.` needs an em-dash or a semicolon. `Privacy by design globally compliant` needs a dash. `Postman is now AI-native and so is our security model.` needs a comma. On the same page, a customer quote reads "credentials stay where they belong environment variables keep secrets out of collection files" — again a missing dash, and this one is inside quotation marks attributed to Adobe, which means Postman has published a misquote or has stripped punctuation from a real one. The security page is the most punctuation-damaged surface observed in this batch, and it is the page whose entire job is to convey rigour.

**Benefit-block headers are imperative-plus-mechanism, in bold**

`Reduce rework with unified API workflows` ·
`Eliminate the speed vs. quality vs. security tradeoff` ·
`Build APIs ready for both humans and AI agents`

Each body paragraph then opens with a **`Stop <bad current behaviour>` or `Eliminate <bad thing>` sentence** before describing the product: "Eliminate tool fragmentation and costly handoffs." · "Stop sacrificing security for speed or slowing delivery for compliance." · "Stop retrofitting APIs for AI compatibility." Three of three bodies open by naming the reader's current bad practice. Aggressive, consistent, and it means the product description always arrives as a resolution rather than as a list.

**Stat block — three numbers, three units**
`40M+` developers worldwide use Postman · `500K+` organizations · `98%` of Fortune 500 companies use Postman

Note `500K+ organizations` has no verb where its two neighbours do ("use Postman"). Three parallel slots, two parallel sentences, one fragment.

**Pricing headline**
> `Pricing built for how you work`
> "Clear plans for individuals, teams, and enterprises"

`for how you work` rather than `for every business size` — segmenting by working style rather than by headcount, which then justifies having both a `Solo` and a `Free` tier for the same single user.

## T3 CTA inventory `[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign Up for Free` | Global nav, every page | Primary; price in the label |
| `Sign In` | Global nav | |
| `Get Started` | Pricing, all four tiers + comparison table | **Different label for the same signup action** as the nav's `Sign Up for Free` |
| `Contact Sales` | Global nav, marketing | |
| `Contact Sales` (Enterprise tier) | Pricing | Title-case here; `Contact sales for pricing` appears as the price-slot text directly above it — two casings, adjacent |
| `Buy with AWS` | Pricing, Team tier only | Marketplace procurement route, named |
| `Chat with a Postman Expert` / `Chat with a Postman expert` | Product page hero CTA / the section heading it scrolls to | **Same string, two casings, one page, linked to each other** |
| `Talk to our team` | Security hero and foot | Third label for "contact sales" |
| `Visit Trust Portal` / `Access the Customer Trust Portal` / `Visit Trust Portal →` | Security page, three placements | Three labels, one destination |
| `Download Postman →` | Nav and footer | Arrow in the label |
| `Launch Postman` | Support centre nav only | The only "open the app" CTA; absent from marketing nav |
| `See all tools →` | Nav, Tools group | |
| `Learn more →` | Announcement bar (`Introducing Postman.ai`), and support-centre status card | Bare `Learn more` — see below |
| `Read customer story →` | Product page | |
| `Read the report →` | Security page, AI section | **Mis-targeted** — sits under an AI-security block but links to the State of API report |
| `See AI security controls` | Security page | Anchor CTA, fully specific |
| `Read the best practices` | Shared-responsibility block | |
| `View reporting guidelines` | Bug bounty | |
| `View secrets documentation →` · `View docs →` (×8) | Security page, governance rows | Eight rows, eight identical `View docs →` labels |
| `Read blog post →` | Security page, two blog cards | |
| `Read articles →` | Support centre, three category cards | Three identical labels for three different categories |
| `Go to the Learning Center →` · `Go to the GitHub issue tracker →` · `Go to the Trust Center →` · `Go to Postman answers →` | Support centre | `Go to <named destination>` — fully specific, four variants |
| `Join our Discord →` | Support centre, `Still need help?` | |
| `Submit a request →` / `Submit a request` | Support centre card / docs prose | |
| `Subscribe to Updates` / `Subscribe` | Status page | Rendered `Subscribe to UpdatesSubscribe` |
| `Subscribe via Slack` | Status page | |
| `Change number` · `Resend OTP` | Status subscription form | |
| `View historical uptime.` | Status page | Terminal full stop inside the link |
| `← Incident History` | Status page | Back-arrow prefix |
| `Debug with AI` | **In-product, inside the error message** | See T7 — the most interesting CTA here |
| `Send` · `Save` · `New Collection` · `Add` · `Snippets` · `Clear` · `Enable Secret` · `Update Domains` · `Access Vault` · `Restore Default` · `Feedback` · `Submit a request` | In-product, documented in docs | |
| `Ask a question` · `Copy page` · `View as Markdown` · `More actions` | Docs page chrome | See T13 |
| `Was this page helpful?` → `Yes` / `No` | Docs, every page foot | |
| `Scroll to top` | Docs sidebar | |
| `Skip to main content` | Marketing pages | |

**Observations.** Postman's CTA discipline is strongest on the support centre, where `Go to the Learning Center`, `Go to the GitHub issue tracker`, and `Go to Postman answers` all name their destination exactly, and weakest on the signup path, where `Sign Up for Free`, `Get Started`, and `Launch Postman` all point at identity.getpostman.com or go.postman.co. Contact-sales has **four** labels (`Contact Sales`, `Talk to our team`, `Chat with a Postman Expert`, `Contact Sales for pricing`).

The eight identical `View docs →` links in the security page's governance grid are the accessibility problem: eight adjacent links, one name, and the distinguishing information (`Single Sign-On (SSO)`, `SCIM Provisioning`, `Audit Logs`, `Data Residency`…) sits in a separate element.

`Debug with AI` is the standout. It is a CTA **inside an error message**, and its label names the method rather than the outcome — not "Get help", not "Fix this", but the specific thing that will happen. See T7.

## T4 Onboarding & getting-started `[observed]` — the brief's focus

### The quick start: three tasks, and the first one needs no account

`Postman quick start` → `Send an API request` → `Create a collection and save your request` → `Write a test for your API request`

The sequencing decision is the finding. **Step 1 requires no account, no install, and no API of your own.**

> 1. Click **Add** in the workbench to open a new tab.
> 2. Enter `postman-echo.com/get` for the request URL.
> 3. Click **Send**.

Three clicks and a URL to a first success. Postman supplies the API to call (`postman-echo.com`, "the Postman Echo API"), so the user does not need credentials, a base URL, or a working service. The account requirement is deferred to step 2 and stated conditionally: "If you haven't already, install the Postman desktop app and sign in to Postman." **Sign-in is introduced as a prerequisite of *saving*, not of *doing*** — which is the honest reason for it and therefore the persuasive one.

Compare Twilio, whose step 1 is "Sign up for Twilio", and Stripe, whose `get-started` page leads with `Create account`. Postman's first step is a working request.

### `How it works` as an interleaved explainer, in the system's voice

Immediately after step 3, a subsection headed `How it works` narrates what just happened in three numbered sentences:

> 1. "Postman sent a GET request to the Postman Echo API server located at `postman-echo.com`."
> 2. "The API server received the request, processed it, and returned a response to Postman."
> 3. "Postman received the response and displayed it in the **Response** pane."

Three things to note. The steps are **past tense** (`sent`, `received`, `displayed`), so they read as a report of the user's own action rather than as theory. The **grammatical subject rotates** — Postman, then the server, then Postman — so the reader learns the request/response round trip as a three-actor sequence. And it is placed *after* success, not before, so the conceptual model arrives when the reader has something to attach it to.

**Do it, then explain what you did, in the past tense, with the actors named.** That is the most transferable onboarding pattern in this file, and it is cheap: three sentences.

### Step language: bolded UI targets, numbered actions, `click` throughout

Steps are terse imperatives with UI targets in bold: "In the request builder, click **Save**." · "Click **New Collection**. Name the collection." · "In your request, click the **Scripts** tab, then click **Post-response**." · "Click **Snippets** at the lower right of the code editor, then select **Status code: Code is 200**."

Note `Name the collection.` — a three-word instruction with no field label, no placeholder guidance, and no example. The one step where the user must supply a string of their own invention is the least specified step in the flow.

`Status code: Code is 200` is a **snippet name** and it is doing real teaching work: it names the assertion in plain English (`Code is 200`) under a category (`Status code`), so a user who has never written a test can pick the right one from a list. Naming code snippets as sentences rather than as function names is a good content-design decision buried in a picker.

Postman uses `click` throughout, and `select` for list choices — a consistent internal rule (`click` for buttons and tabs, `select` for options), though it diverges from the device-agnostic `select`-for-everything convention that Twilio's design system prescribes.

### Escalating onboarding surfaces, each named

`Quick start` (docs) · `Learning Hub` · `Postman Academy` · `Enterprise Onboarding` (an Academy page titled "enterprise-implementation-onboarding-guide") · `Postman Best Practices` · `Templates` · `Postman answers` ("Code samples for most commonly asked questions") · `Intergalactic` (the events brand)

`Postman answers` is notable: a **public workspace containing runnable code samples for the most-asked questions**, offered from the support centre's `Still need help?` block. The escalation path from "I'm stuck" includes "here is executable code", not only "here is an article."

### Time-to-value language

No "in 10 minutes" or "in 5 steps" claim was found anywhere. Postman does not promise a duration; it just makes step 1 short. The only velocity claim is a customer stat: `Sling TV improves deployment cycles by 70% with Postman`.

## T5 Form & field labels `[observed] / [documented]`

The most reachable form is the **status-page subscription flow** (Statuspage-hosted, identical in structure to Twilio's — see the Twilio file for the shared-vendor analysis):

| Label / string (verbatim) | Notes |
|---|---|
| `Email address:` | |
| `Enter OTP:` | `OTP` unexpanded |
| `Resend OTP in:  seconds` | **Double space — empty interpolation**, same defect as Twilio's instance |
| `Resend OTP in: 30 seconds` | The populated variant, on the SMS step |
| `Didn't receive the OTP? Resend OTP` | Pre-emptive recovery beside the field |
| `Country code:` · `Phone number:` · `Change number` | |
| `Webhook URL:` + hint `The URL we should send the webhooks to` | **Hint text in first-person plural** — "the URL *we* should send" |
| `Email address:` + hint `We'll send you email if your endpoint fails` | **The best field hint observed in this batch** |
| `Message and data rates may apply.` | Carrier-cost disclosure on the SMS step only |
| `By subscribing you agree to our Privacy Policy` | Consent, varied per channel — see T10 |

`We'll send you email if your endpoint fails` is worth isolating. It is a hint on a *secondary, optional* email field inside a webhook form, and it answers the exact question a reader would have ("why does a webhook subscription want my email?"). Nine words, future tense, states the trigger condition. Most products would label this `Notification email (optional)` and explain nothing.

**Documented in-product field and control vocabulary** `[documented]` — recovered from docs:

`URL builder` · `Params` tab · `Authorization` tab · `Headers` tab · `Scripts` tab · `Post-response` · `Settings` tab · `App settings` · `Certificates` · `HTTP version` dropdown (`Auto` / `HTTP/1.x` / `HTTP/2`) · `Request timeout` · `SSL certificate verification` · `Variables` pane · `Variables in request` · `Response` pane · `All Logs` · `Current` (history selector) · `Restore Default` · `Enable Hardware Acceleration` / `Disable Hardware Acceleration` · `Clear Cache and Reload` · `View Logs in Finder` / `in Explorer` / `in File Manager`

The `HTTP version` dropdown's three options are each given a one-line explanation in docs, and the `Auto` explanation states the decision rule: "Postman automatically selects HTTP version 1.0, 1.1, or 2.0, depending on which version the API supports and prefers." **Explaining what "Auto" will actually do** — rather than leaving it as trust-us magic — is the right treatment for a setting whose whole purpose is to be ignored.

`Enable Hardware Acceleration` / `Disable Hardware Acceleration` as **two separate menu items whose label depends on current state** is documented explicitly ("Click **Postman > Enable Hardware Acceleration** or **Postman > Disable Hardware Acceleration**"), and the docs then add the consequence: "Turning off hardware acceleration may affect performance or CPU usage." A toggle whose downside is stated in the docs rather than hidden.

The three OS-specific log paths differ only in the file-manager name (`Finder` / `Explorer` / `File Manager`) — Postman writes three strings rather than one generic "file manager", which is correct and is the kind of thing that gets collapsed to save translation cost.

## T6 Status & state language `[observed]`

### Severity legend — five values, plus Statuspage's lower-cased duplicates

`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`

and, on the uptime graph: `Major outage` · `Partial outage`

Identical to Twilio's, because both are Atlassian Statuspage. The casing inconsistency between the legend (title case) and the graph (sentence case) is therefore a **vendor-level defect replicated across every Statuspage customer** — a useful thing to know if you are evaluating the vendor.

Overall status summary: `All Systems Operational` — title case, three words, and it is the page's H2. At harvest every one of ~29 components was `Operational`.

### Component naming — regional grouping with an asymmetric component set

Two regional groups, `US` and `Europe`, each carrying a rollup status.

**`US` (23 components):** `Postman Platform on Desktop` · `Postman Platform on Browser` · `Postman Login` · `Postman Monitors` · `Postman Mocks` · `Postman API` · `Postman API Network (API Explore)` · `Run Button` · `Postman Search` · `Public Collection Documentation` · `Newman` · `Postman Learning Center and Documentation` · `Postman Support and Community Forum` · `Postman Integrations` · `Postman Interceptor` · `Marketing Website` · `Postbot` · `Postman VS Code extension` · `API Builder` · `API Specifications` · `Collection Runner` · `Postman CLI` · `Agent Mode`

**`Europe` (6 components):** `Postman Platform on Desktop` · `Postman Platform on Browser` · `Postman Login` · `Postman Mocks` · `Postman API` · `Postman Search`

**The asymmetry is the content finding.** Europe carries six of the twenty-three components. A European customer reading this page learns — by absence, not by any statement — that `Monitors`, `Postbot`, `Agent Mode`, `Collection Runner`, and eighteen other capabilities are not independently monitored in their region. Whether that means "not deployed in Europe", "served from the US", or "not separately instrumented" is **unstated and unknowable from the page**. For a vendor advertising `Data Residency` as an enterprise feature, the gap between the two regional component lists is exactly the question a data-protection reviewer would ask, and the status page raises it without answering it. Recorded as the most consequential ambiguity in Postman's status content.

Naming discipline is otherwise good but inconsistent about the `Postman` prefix: `Postman Monitors`, `Postman Mocks`, `Postman API`, `Postman Search`, `Postman Login`, `Postman Interceptor`, `Postman CLI` all carry it; `Run Button`, `Marketing Website`, `Collection Runner`, `API Builder`, `API Specifications`, `Agent Mode`, `Newman`, `Postbot` do not. Fifteen prefixed, eight not, no visible rule.

Two components carry a **parenthetical or compound disambiguator**, both useful:
- `Postman API Network (API Explore)` — maps the public brand name to the internal/URL name
- `Postman Learning Center and Documentation` — one component covering two things a user might name differently
- `Postman Support and Community Forum` — likewise

`Marketing Website` as a monitored component is a small honesty: the site you are reading can itself be down, and it is scoped separately from the product.

**Defect:** ~26 of 29 components render a bare `?` between name and status (`Postman Monitors ?` … `Operational`), the same tooltip-trigger defect as Twilio's. Only `Postman Interceptor`, `Collection Runner`, `Postman CLI`, and `Agent Mode` lack it — so the majority of component names read as questions.

### Product state vocabulary from docs `[documented]`

- **Variable and secret states** — the richest named-state set found. `Empty` and `Unresolved` are defined as distinct states with a formal definition each (see T7).
- **Response history states**: the `History` dropdown "displays a list of the sent request's timestamps and the status code the system returned", with `Current` as the selector for the live configuration. So a request configuration has a version history and the current one is named `Current`.
- **Agent states**: `Postman Desktop Agent` vs `Postman Cloud Agent` vs `Browser Agent` — three named execution contexts, and the docs tie capability differences to them ("The supported 1.x HTTP version is used in the following scenarios: … The request is sent with the Postman Cloud Agent").
- **Console log levels**, exposed as user-writable API: `console.log()` · `console.info()` · `console.warn()` · `console.error()` · `console.clear()` — Postman adopts the JavaScript console's level vocabulary wholesale rather than coining its own.
- **Console retention stated numerically**: "The Console logs the last 5,000 messages and 24 hours by default." Two bounds, both explicit.
- **Vault secret persistence caveat, browser-specific**: "If you're using the Postman web app with Safari, vault secrets stored in your local vault are deleted after seven days of inactivity." A named browser, a named duration, and a named consequence.
- **Data-retention state**: "We keep your data in secure offline backups for 15 days after you delete your account or end your relationship with us. After that period, Postman permanently deletes your data from the product." Deletion is a two-stage state with a stated interval.

### Incident lifecycle — five stages, including a generic `Update`

From the one incident in the 90-day window (`Api Builder flows are affected for US customers`, 10 Sep 2026), read newest-first:

| Stage | Body (verbatim) | Time |
|---|---|---|
| `Resolved` | "All scenarios have recovered and the issue is mitigated." | 11:26 PDT |
| `Monitoring` | "A fix for the db resources has been applied and team is monitoring the service health" | 11:17 PDT |
| `Identified` | "The issue has been identified and a fix is being implemented." | 11:17 PDT |
| `Update` | "The team has identified an issue with the database and is working on a fix." | 11:16 PDT |
| `Investigating` | "We are currently investigating this issue." | 11:01 PDT |

Five stages, 25 minutes, five updates. The cadence is genuinely good — an update roughly every five minutes at the critical moment.

The content is much weaker than Twilio's, and the contrast is instructive:

- **No blast radius in the body.** The *title* says "for US customers"; no update body says who is affected or what they would observe. Twilio's every update opens with the affected population and symptom.
- **No next-update commitment.** Not one of the five updates says when the next will arrive. Twilio's every update does.
- **`Update` as a stage label is content-free.** It sits between `Investigating` and `Identified` and its body ("The team has identified an issue with the database") is the `Identified` content, posted one minute before the `Identified` stage whose body is the *generic* template ("The issue has been identified and a fix is being implemented"). So the specific information arrived under the vague label and the vague information arrived under the specific label. A stage/body inversion.
- **Internal vocabulary leaks**: `db resources` in a customer-facing update. Also `team is monitoring` with the article dropped, and the `Monitoring` update has **no terminal full stop** where the other four do.
- **The title is mis-cased and ambiguous**: `Api Builder flows are affected for US customers` — `Api` not `API`, and it conflates two named products (`API Builder` and `Flows`) into "Api Builder flows", which a reader cannot map to either component.
- **`Resolved` says "recovered and the issue is mitigated"** — *mitigated*, not *fixed*. That is a meaningful hedge and it is the one genuinely careful word in the set, but nothing tells the reader whether a permanent fix is pending.

**Empty-history strings** `[observed]`, and these are good:
- `No incidents reported today.` (today's date)
- `No incidents reported.` (every prior date)

Two strings differing only by `today`, correctly distinguishing "nothing so far today, and the day is not over" from "nothing happened on that closed day". A one-word difference doing real tense work. Thirteen of the fourteen days shown carry the second string.

Plus the Statuspage uptime-graph set, identical to Twilio's: `No downtime recorded on this day.` / `No data exists for this day.` / `had a major outage.` / `had a partial outage.` / `No incidents or maintenance related to this downtime.`

**`Scheduled Maintenance` section is absent from the page** — no maintenance was scheduled at harvest, and unlike the incident history there is no "no maintenance scheduled" string. The section simply does not render. `[absent]`

## T7 Error, failure & recovery `[observed]` — longest category

Postman has **no numbered error-code dictionary**. This is the structural contrast with Stripe and Twilio, and it is a defensible design: Postman is a client, so most errors it surfaces originate in *the user's own API* or in the user's network, not in Postman. Its error taxonomy is therefore organised by **cause**, not by code.

### The `Issue` / `Resolving the issue` table — a cause taxonomy

`Debug API requests in Postman` carries a `Common issues` table with exactly two columns: **`Issue`** and **`Resolving the issue`**. Fourteen rows, each `Issue` cell a bolded noun phrase:

`Connectivity` · `Firewalls` · `Proxy configuration` · `SSL certificates` · `Client certificates` · `Wrong request URLs` · `Wrong protocol` · `Short timeouts` · `Invalid responses` · `TLS version` · `Postman errors` · `Empty variables` · `CORS`

Three observations.

**(a) The row names are hypotheses, not symptoms.** The user arrives with one symptom ("my request failed") and the table gives them thirteen candidate *causes* to test. `Wrong protocol`, `Short timeouts`, `Empty variables` — each names a thing the user may have done. This is the right shape for a tool whose failure modes are overwhelmingly configuration, and it inverts the usual error-doc structure (symptom → cause).

**(b) Each resolution names the diagnostic instrument, repeatedly.** The `Console` is cited as the resolution mechanism in four separate rows (`Proxy configuration`, `SSL certificates`, `Wrong request URLs`, and by cross-reference), each time linked. The content is teaching one tool through many problems rather than giving fourteen unrelated fixes.

**(c) One row admits Postman may be at fault, and routes accordingly.**

> `Postman errors` — "It's possible that Postman might be making invalid requests to your API server. You can confirm this by checking your server logs, if available. If you believe this is happening, contact the Postman team using the GitHub issue tracker."

A row in the user's troubleshooting table whose content is "this might be our bug", with a verification method (check your server logs) and a **public** escalation route (GitHub issues, not a private support ticket). Naming yourself as a candidate cause, inside the table of causes, is rare and it is the single most trust-building paragraph on Postman's docs surface.

Two more rows are notable for what they refuse:

> `Firewalls` — "Some firewalls may be configured to block non-browser connections. If this happens you'll need to contact your network administrators for Postman to work."

Postman states plainly that the fix is outside both its control and the reader's, and names who owns it. No workaround is invented. Compare the temptation to write "try disabling your firewall."

> `Invalid responses` — "If your server sends the wrong response encoding errors, or invalid headers, Postman may fail to interpret the response."

This one is a **defect**: the sentence is garbled (a missing comma after "encoding" turns "encoding errors" into a noun phrase), and it offers no resolution at all despite sitting in a column headed `Resolving the issue`. One of fourteen rows fails its own column contract.

`Wrong protocol` is the shortest and best row: "Check if you're using "https\://" instead of "http\://" in your URL (or the opposite)." It shows both literals and the parenthetical covers the symmetric case in three words.

### `Debug with AI` — an AI escape hatch placed inside the error message

> "If you get an unexpected error when you send a request, you can ask Agent Mode for help. Click **Debug with AI** in the error message. Agent Mode tells you about any problems it can identify, and offers possible solutions for fixing the issue."

Three content decisions here.

The **button lives in the error message**, so the escalation is at the point of failure rather than in a help menu. The **label names the method** (`Debug with AI`) rather than the outcome (`Fix this`, `Get help`) — which is honest, because it does not promise resolution. And the **capability is bounded twice in one sentence**: "any problems it can identify" and "offers *possible* solutions". Postman describes its AI debugger as a hypothesis generator, not an oracle, in the same breath as offering it.

That bounded framing is the transferable part. An AI assist button in an error state invites over-promising; `possible solutions` for `problems it can identify` is the minimum-viable honest description.

### Named failure states with cause→action pairs bound to real buttons

`Troubleshoot vault secrets` is the best-engineered recovery page found. It opens by **defining two states**:

> - **Empty vault secret** — "A vault secret that doesn't have a value but is referenced in your request."
> - **Unresolved vault secret** — "A vault secret reference in your request that can't resolve a value, either because the vault secret can't be accessed or because it no longer exists."

Two failure states, formally distinguished: *no value* versus *cannot reach the value*. The distinction matters because the fixes are completely different, and most products would call both "invalid".

Then each state gets a list of causes, and — the key move — **each cause is a bolded imperative naming the fix, followed by the diagnosis, followed by the exact in-product control**:

`Fix empty vault secrets`:
- **`Enter a value`** — "The vault secret doesn't have a value."
- **`Update the vault secret's key name`** — the key was renamed in the vault but the reference still uses the old name.

`Fix unresolved vault secrets`:
- **`Turn on a vault secret`** — "The vault secret is turned off in Postman Vault. Hover over the reference to the secret or **Error** in the variables pane, then select **Enable Secret**."
- **`Update allowed domains`** — "The vault secret isn't allowed to be in requests to the domain. … select **Update Domains**."
- **`Enter your vault key`** — "You haven't entered your vault key since signing in to Postman. … enter your vault key, then select **Access Vault**."
- **`Select a supported Postman Agent`** — use Desktop or Browser Agent instead.
- **`Use a supported browser for local vault persistence`** — Safari deletes local vault secrets after seven days of inactivity.

And a second tier for external-vault integrations: **`Use the Postman desktop app`** · **`Reauthenticate with your external vault`** · **`Reconfigure your external vault`** · **`Grant permission to access your external vault`** (which resolves to "Contact the Admin for your external vault provider").

**The structure is `fix name → why it happened → the button to press`, and the fix name comes first.** A reader scanning bold text sees only the nine possible actions, picks the one matching their situation, and the prose supplies the confirmation and the control. This is the inverse of the usual "symptom → explanation → buried instruction" order, and it is measurably faster to scan.

Note that three of these causes are **not fixable inside Postman** (`Use a supported browser`, `Grant permission…` → contact your admin, `Use the Postman desktop app`), and they are listed alongside the fixable ones with the same grammar. Postman does not segregate "things you can fix here" from "things you must fix elsewhere", which is arguably a miss — but it does name the external owner every time.

The page also names the *visual* error signal in words, which is useful for anyone writing or testing it: "Postman highlights empty and unresolved vault secret text in red in the **URL builder**, the **Params** tab, the **Authorization** tab, and the **Headers** tab. If your HTTP request has an empty or unresolved vault secret, an exclamation point displays on the **Variables** icon." Colour plus an icon plus a location list — and the icon is a non-colour redundant cue, which is correct for accessibility.

### App-level troubleshooting: OS-branched, log-first, escalation-aware

`Troubleshoot issues with the Postman app` opens by scoping itself and routing elsewhere twice before offering any content — a triple route-out in the first three paragraphs (Help Center for FAQs, Support Center to submit a request, and a separate page for installation problems). Aggressive routing before content.

Its five sections are `Locating Postman logs` · `Accessing the DevTools console` · `Checking Postman's status` · `Hardware acceleration` · `Connection issues`, then a seven-link `Other issues` routing table.

Two patterns worth extracting:

**(a) Log retrieval is framed as a favour to the support agent, with the reason given.**
> "Postman automatically captures log messages in the event something goes wrong with Postman."
> "After locating your log file, attach it to your Postman Support Center request. This helps the support team troubleshoot your issue."

The instruction explains *why* the attachment matters. Users skip evidence-gathering steps when the payoff is unstated.

**(b) Instructions branch by OS with the platform bolded and the menu path spelled out.**
> - **macOS** - Click **View > Developer > View Logs in Finder**.
> - **Windows** - Click **View > Developer > View Logs in Explorer**.
> - **Linux** - Click **View > Developer > View Logs in File Manager**.

Three strings rather than one generic, with the platform-native file-manager name in each. The same treatment is applied to hardware acceleration, where macOS uses the `Postman` menu and Windows/Linux use `Help` — a real divergence Postman does not paper over.

**`Checking Postman's status`** deserves its own note: the troubleshooting guide tells the user to check the status page and enumerates what they would learn — "which lets you know if Postman is experiencing degraded performance, outages, or is undergoing maintenance." **The three status-page severity concepts are named inside the troubleshooting prose**, so the vocabulary is taught before the user needs to read the legend.

The `Connection issues` sequence is a three-step escalating protocol, then two fallbacks:
> 1. Force close the Postman app in your operating system. 2. Relaunch the Postman desktop app. 3. In the task menu, click **Help > Clear Cache and Reload**.
> "If the problem persists, check your Postman account in the web app. If you have connection issues in the web app, turn off your VPN or any proxies, then connect to a different network."
> "If you're still unable to connect to Postman's servers, you can allowlist Postman's domains."

Three conditionals, each opening with the failure of the previous step (`If the problem persists`, `If you have connection issues in the web app`, `If you're still unable to connect`). A decision tree written as prose, with each branch's precondition stated. No flowchart needed.

### The `Troubleshoot`-prefixed content family

Postman has standardised a page-title prefix and applies it across at least nine surfaces:
`Troubleshoot test errors` · `Troubleshoot app issues` · `Troubleshooting requests` · `Troubleshooting monitors` · `Agent Mode troubleshooting` · `Troubleshoot WebSocket requests` · `Troubleshoot vault secrets` · `Troubleshooting proxy configurations` · `Troubleshoot DNS issues` · `Diagnose and troubleshoot Insights errors` · `Debug performance test errors` · `Troubleshoot your Postman installation` · `Memory errors` · `Traffic errors` · `Errors tab`

**Defect:** the prefix is unstable across the family — `Troubleshoot <X>` (7), `Troubleshooting <X>` (3), `<X> troubleshooting` (1), `Diagnose and troubleshoot <X>` (1), `Debug <X>` (2). Five grammatical shapes for one content type. And the canonical page is titled `Debug API requests in Postman` while every link to it says `Troubleshooting requests` or `Troubleshoot API requests` — **link text and page title disagree** for the flagship troubleshooting page. A user searching "troubleshoot requests" will not match the H1.

### Escalation: three tiers, with a confidentiality routing rule

`Getting help`, at the foot of the debug page:

> - "Ask for community help in the Postman Discord."
> - "If you think the problem is with Postman itself, search the issue tracker on GitHub to check if someone has already reported the issue and whether there is a known solution."
> - "**If you need to include confidential data, file a support ticket with Postman support, including your Console logs.**"

Three tiers ordered community → public bug tracker → private ticket, and the third is gated on a **content criterion rather than a severity criterion**. Postman does not say "if it's urgent" or "if you're on a paid plan"; it says *if your evidence is confidential*. That is the actual reason a developer needs a private channel, and stating it stops people from opening tickets for things that belong in Discord while making sure the ones with secrets in their logs do not paste them into a public issue.

**Routing rule based on the sensitivity of the evidence, not the severity of the problem.** Directly transferable to any support IA that has both public and private channels.

The support centre repeats the pattern under `Still need help?` with three cards: `Postman Discord` ("Ask questions, leave feedback, and learn from other users"), `Support request` ("Submit a support request and our support teams will get back to you ASAP"), `Postman answers` ("Code samples for most commonly asked questions"). Note `ASAP` — an unbounded response-time promise, which is the weakest string in the block.

### Error strings not found

No error-message inventory, no error-code list, no validation-message reference exists publicly. Every in-product error string in this file is `[documented]` via a docs description of it (e.g. "you'll get a message with details about the error"), never quoted. The one in-product error affordance quoted verbatim is the `Debug with AI` button and the `Error` label in the variables pane. This is a genuine limit of an unauthenticated pass on a desktop application.

## T8 Empty states `[observed]`

Two sets, both from the status page, and one pair is genuinely good:

**Incident history:**
- `No incidents reported today.`
- `No incidents reported.`

The `today` variant handles an open day; the bare variant handles closed days. One word, correct tense logic.

**Uptime graph** (Statuspage-supplied):
- `No downtime recorded on this day.` vs `No data exists for this day.` — *nothing broke* separated from *we don't know*
- `No incidents or maintenance related to this downtime.` — enumerates both relation types it checked for

`[documented]` near-misses from the docs — the vault page's `Empty vault secret` is structurally an empty state surfaced as an error, and `Fix empty variables` is a whole documented recovery flow for a referenced-but-valueless variable. Postman treats "empty" as a first-class, named, documented condition rather than a rendering edge case, which is the right posture for a product where an empty variable silently breaks a request.

The `Scheduled Maintenance` section renders **no empty-state string at all** when nothing is scheduled — the heading simply disappears. A missing empty state, recorded as a small defect. `[absent]`

All in-product empty states (empty workspace, no collections, no test results, empty Console) are behind the desktop app. `[absent]`

## T9 Notifications & system messages `[observed]`

**Four channels, four different event sets** — and unlike Twilio, Postman's webhook channel gets a fourth event:

| Channel | Promise (verbatim) |
|---|---|
| Email | "Get email notifications whenever Postman **creates**, **updates** or **resolves** an incident." |
| SMS | "Get text message notifications whenever Postman **creates** or **resolves** an incident." |
| Slack | "Get incident updates and maintenance status messages in Slack." |
| Webhook | "Get webhook notifications whenever Postman **creates** an incident, **updates** an incident, **resolves** an incident or **changes** a component status." |

Read across the rows: **3 events on email, 2 on SMS, 4 on webhook.** The webhook channel alone receives `changes a component status` — a high-frequency machine event that would be intolerable as email and absurd as SMS. And the webhook row is the only one that **repeats the object** ("creates an incident, updates an incident, resolves an incident") rather than eliding it, which reads clumsily but is unambiguous for someone implementing a handler.

Slack is the odd one out: it describes the *content* ("incident updates and maintenance status messages") rather than enumerating events. Three enumerated channels, one described channel. Inconsistent, though arguably right for a human-facing channel.

**The event-set-per-channel table is the reusable artefact.** Publishing it at the point of opt-in lets a user choose by tolerance for noise. (This is the same finding as Twilio's, on the same vendor, so it is a Statuspage pattern rather than a Postman invention — but Postman's webhook row shows the pattern extended to a fourth event, which Twilio's does not.)

**Webhook failure notification** `[observed]`: the webhook form's optional email field carries the hint `We'll send you email if your endpoint fails` — **a notification about the failure of your notifications**, offered at setup. Good second-order thinking.

**Documented feedback and telemetry messages** `[documented]`:
- Docs feedback, on every page: `Was this page helpful?` → `Yes` / `No`
- And the docs index explains the mechanism rather than just shipping the widget: "Share your thoughts on the Postman Docs and help the Postman team continue improving them for the Postman community. To submit feedback, scroll to the bottom of any document and choose thumbs up or thumbs down, then provide more details (optional) and click **Feedback**." — the widget's location, its control, the optionality of the detail field, and the reason it exists. Instructions for a feedback widget, which most products assume is self-evident.
- `Positive Feedback` / `Negative Feedback` labels appear on Twilio's docs but Postman's render as `Yes` / `No` — the shorter and better pair.

**Breach notification, documented as policy** `[documented]` from the security FAQ: "our leadership team is notified automatically in the event of a customer-reported breach. In accordance with Postman's corporate policies, we respond to the report within a few hours." A stated internal SLA for breach response, published. `within a few hours` is vague but it is a commitment.

**Announcement bar** `[observed]`: `Computing is changing, so is Postman – Introducing Postman.ai  Learn more →` — present on every marketing page. Note the en-dash with spaces (Postman's other headings drop punctuation entirely), the double space before `Learn more`, and the bare `Learn more` CTA.

## T10 Disclosures, legal & compliance `[observed]`

### Pricing: four tiers, and the AI credit is the new disclosure problem

| Tier | Qualifier (verbatim) | Price |
|---|---|---|
| `Free` | "For individuals building and testing APIs" | `$0` `per month` |
| `Solo` | "For individuals who want to move faster with AI and automation" | `$9` `per month (billed annually)` |
| `Team` | "For teams building and shipping APIs together" | `$19` `per user/month (billed annually)` |
| `Enterprise` | "For organizations building, managing, and distributing APIs at scale" | `Contact sales for pricing` |

Every qualifier is `For <who> <doing what>` — a gerund phrase naming the activity, not the headcount. `Free` and `Solo` are both single-user tiers distinguished purely by whether you want AI, which is why the headline had to be `Pricing built for how you work` rather than `for every size`.

Feature lists use **`Everything in <previous tier>, and:`** as the first bullet of each paid tier — a three-word inheritance statement that removes the need to repeat twenty rows. `Everything in Free, and:` / `Everything in Solo, and:` / `Everything in Team, and:`

**The AI-credit disclosure is the most interesting pricing content and the least resolved.** Four different allowance shapes across four tiers:

`50 / month` (Free) · `400 / month` (Solo) · `400 / user / month` (Team) · `800 / user / month (pooled)` (Enterprise)

And overage pricing as a separate row, `Postman AI overages (Pay-as-you-go)`:
`Unavailable` (Free) · `$0.05 / credit` (Solo) · `$0.04 / credit` (Team) · `$0.035 / credit (volume pricing available)` (Enterprise)

Four things are being disclosed in one cell: the quantity, the period, whether it is per-user, and whether it pools. `(pooled)` is doing enormous work in one parenthesised word — it is the difference between 800 credits your individual developer can burn and 800× N credits your organisation shares. **`(pooled)` is under-explained for a term that changes the economics.** And the Free tier's overage cell renders as an icon with alt text `Unavailable` rather than the word "None" or "Not available" — a red X standing in for a pricing fact.

Nowhere on the pricing page is **what a credit buys** stated. The credit count links to `/docs/billing/agent-mode-usage/` (not fetched), so the unit of consumption — the thing a buyer must estimate to forecast cost — lives one click away in the docs. For usage-based AI pricing this is the central disclosure and it is not on the pricing page.

**Billing-period disclosure** is handled with a toggle (`Pay monthly` / `Pay annually (Save up to 25%)`) and the annual assumption is then **restated inside every price line**: `per month (billed annually)`, `per user/month (billed annually)`. Repeating the billing basis in the price string rather than relying on the toggle state is correct — a user who arrives at a screenshot or a scroll position still sees the condition. `Save up to 25%` uses `up to`, which is the honest hedge for a discount that varies by tier.

**Add-on labelling**: `Simple Security (add-on)` (Team) and `Advanced Security Administration (add-on)` (Enterprise). The `(add-on)` suffix appears inside the included-features list, which is a deliberate and slightly uncomfortable choice — it advertises a capability in the list of what you get while parenthetically saying you must pay extra. Honest, but the placement invites misreading.

### The compliance page: nine certifications, and one is new

`SOC 2 Type II` · `PCI DSS` · `HIPAA` · `GDPR` · `CCPA / CPRA` · `CSA STAR` · `TX-RAMP` · `ISO 27001` · `ISO 42001`

**`ISO 42001` — the AI management systems standard — is the notable one.** Postman is displaying an AI-governance certification alongside its security certifications, which is a 2026 development and exactly the kind of thing a corpus like this should capture. Image alt text carries the verdict word for each: `SOC 2 Type II certified.` · `PCI DSS compliant.` · `HIPAA compliant.` · `GDPR compliant.` · `CSA STAR Registry certified.` · `TX-RAMP certified.` · `ISO 27001 certified.` · `ISO 42001 certified.` — note the **alt text distinguishes `certified` from `compliant`**, which is the same verb-gradient discipline Stripe applies in prose. Whether the split is accurate per standard I cannot verify, but the distinction is being drawn.

**The framing sentence is the best compliance headline in this batch:**
> `Compliance isn't a checkbox it's a proof point. Ours are downloadable.`

Three moves in fifteen words: reject the checkbox framing, substitute "proof point", then immediately make the proof retrievable. And it is not a bluff — the page enumerates what is available: "SOC 2 Type II reports, penetration test summaries, security questionnaire responses, architecture diagrams, and more available on demand for your security review team." **Naming `architecture diagrams` and `security questionnaire responses`** speaks directly to the person who has to fill in a vendor assessment, which is the real reader of a trust page.

(The missing punctuation in that headline is discussed in T2. It is a shame, because the sentence is otherwise excellent.)

### Shared responsibility, stated plainly and briefly

> `Shared responsibility model`
> "We rely on our users to help safeguard their data and credentials in Postman. We strongly encourage customers, security teams, and developers to use Postman securely."
> `Read the best practices`

Two sentences. `We rely on our users` puts the dependency first and in the active voice, with Postman as the subject of a sentence about its own limits. For a product whose core function is *holding API credentials*, having a named, linked shared-responsibility page is close to mandatory, and Postman gives it its own section rather than a footnote. `We strongly encourage` is weaker than it should be — encouragement is not an allocation of responsibility — but the page it links to presumably does the work.

### The three-layer secret model as a disclosure device

> `Stop credential sprawl at the source`
> "Credential abuse causes 22% of all data breaches. Postman sits where developers first test API calls; stopping secrets before they spread, and catching anything that slips through."

- `Layer 1` `Local Secret Protection` — "Keep secrets out of Postman Cloud and Git."
- `Layer 2` `Cloud Secret Detection` — "Find and mitigate secrets in Postman Cloud."
- `Layer 3` `Secret Resolution at Runtime` — "Vault references are resolved just-in-time at the moment of request."

Plus five named mechanisms: `Local Vault` ("Encrypted on-device only with no secrets synced to Postman Cloud") · `Shared Vault` ("Per-workspace vault for secure team collaboration") · `Vault Integrations` ("HashiCorp, AWS Secrets Manager, Azure Key Vault, 1Password") · `Bring Your Own Key` ("Supply your own encryption key revocable at any time").

The **`Layer 1 / 2 / 3` numbering is the disclosure structure**: it tells a security reviewer that there are exactly three interception points and names what each catches. Layer 1 *prevents*, Layer 2 *detects what got through*, Layer 3 *avoids storing at all*. "catching anything that slips through" is an explicit admission that Layer 1 is imperfect — the architecture concedes its own leak rate, which is why the three-layer story is credible.

`revocable at any time` on BYOK is the one clause a CISO actually needs, and it is there.

### AI-specific disclosures — negation-first

> `Your data doesn't train our models. Your team controls who uses AI and how.`

The most important AI disclosure led with a negation, in the section heading, before any capability claim. Repeated as a card: `AI & Data Protection` — "Your data doesn't train our models."

Seven AI-governance cards, each a label plus a fragment:
`Credential Protection` — "Secret scanning before it reaches any LLM." ·
`PII Protection` — "PII data redaction via third-party guardrails." ·
`CISOs Control AI Access` — "Govern who can use AI in your org." ·
`MCP Governance` — "Control how MCP is used in your org." ·
`Admin Controls` — "You decide if the Autonomous API Engineer runs." ·
`Humans stay in the loop` — "Auto-run is off by default"

**`Auto-run is off by default`** is the single most valuable string in Postman's compliance copy. Five words stating the safe default for an autonomous agent, under a heading (`Humans stay in the loop`) that names the principle. And `You decide if the Autonomous API Engineer runs` puts the reader in the grammatical subject position of the permission decision.

Note `PII data redaction via third-party guardrails` — **the mechanism is disclosed as third-party**, which is more honest than implying it is Postman's own and is exactly the detail a data-protection reviewer needs. Also note it has no terminal full stop while its five siblings mostly do (`Auto-run is off by default` also lacks one). Six cards, inconsistent punctuation.

### Privacy and data handling, from the security FAQ `[documented]`

- **No sale, no "share" under CCPA**: "Postman does not sell your data for commercial purposes or share it as defined under CCPA and CPRA." The `as defined under` qualifier is the legally precise form — "share" is a term of art in CPRA and Postman scopes its denial to that definition.
- **Vendor gating**: "All third-party vendors are required to execute Postman's standard vendor DPA before any data is shared" and "undergo a privacy risk assessment". Plus a **published sub-processor list**.
- **No customer data in testing**: "Postman does not use customer data in internal testing. All validation and QA efforts are conducted on a production-mirrored internal stack using fictitious data only."
- **Encryption specifics named**: `AES-256-GCM` at rest, TLS in transit, application-layer encryption for "environment variables, secrets, and access tokens", `KMS` for key management, and BYOK keys "never accessible by Postman, and all encryption events are logged for compliance and auditing."
- **No own data centres, stated as a fact about the supply chain**: "Postman has no in-house data centers and uses AWS… Our company's product data and backups are hosted on AWS servers in the EU and the U.S."
- **Deletion timeline** (quoted in T6): 15 days of offline backup, then permanent deletion.
- **Bug bounty numbers**: "paid out over $350,000 to more than 800 researchers since 2017" — and, unusually, a **dated scope statement about a specific new feature**: "Agent Mode was subjected to internal AppSec testing and its first third-party penetration test in early 2026 results available on the Trust Portal." Naming which feature has been pen-tested and when is more useful than a blanket "we pen-test".
- **Vulnerability SLA framing**: "All findings are scored with CVSS, assigned an owner, and tracked to resolution against internal SLAs." Score, owner, deadline — three commitments, and the same triple is repeated in the FAQ answer.

### Consent and cookie language `[observed]`

- Per-channel consent on the status form, escalating with the channel's legal complexity: email gets "By subscribing you agree to our Privacy Policy"; SMS adds "Message and data rates may apply." plus Atlassian's terms and privacy policy; Slack uses **"By subscribing you acknowledge our Privacy Policy. In addition, you agree to the Atlassian Cloud Terms of Service and acknowledge Atlassian's Privacy Policy."** Note the deliberate `acknowledge` / `agree to` split within one sentence — two different legal verbs for two different instruments.
- Footer: `Cookie Preferences` · `| Tracking Cookies Used.` · `Do Not Sell or Share My Personal Information`

**Defect:** `| Tracking Cookies Used.` renders with a leading pipe character and reads as a bare declarative fragment. It appears on every page footer in this state.

## T11 Help-centre architecture `[observed]`

Support Center home: H1 `Postman support center` (sentence case), deck **`Need help? Check out our FAQ, documentation or submit a request.`** — the same string is reused as the page's meta description and OG description, so the deck and the search-result snippet are one sentence. Economical.

**Six routing cards, each a label plus a scope line plus a destination-named CTA:**

| Card | Scope line (verbatim) | CTA |
|---|---|---|
| `Getting started` | "Get started with Postman with our docs, tutorials, videos, and more!" | `Go to the Learning Center →` |
| `Resolve issues` | "Get help with common issues and unexpected behavior in Postman." | `Read articles →` |
| `GitHub issue tracker` | "GitHub repository of known issues and feature requests reported by the Postman community." | `Go to the GitHub issue tracker →` |
| `FAQs` | "Find the answer to your question in our the FAQs." | `Read articles →` |
| `Billing` | "Get help with billing, subscriptions and payments." | `Read articles →` |
| `Trust and security` | "Our Trust Center provides you with access to information about security, compliance, privacy, and reliability at Postman." | `Go to the Trust Center →` |

Three observations.

**`Resolve issues` as a category name.** Not "Troubleshooting", not "Problems", not "Known issues" — a **verb phrase naming what the user wants to achieve**, consistent with the docs IA's single-verb discipline. And its scope line names two distinct things: "common issues *and unexpected behavior*". "Unexpected behavior" is the honest category for the failures that are not errors — the thing worked, just not as you expected. Most support taxonomies have no home for that, and it is where a large share of real tickets live.

**Three of six cards route off the support site entirely** — to the Learning Center, to GitHub, and to the Trust Center. The support centre is substantially a router rather than a content repository, and the GitHub card is the striking one: a **public issue tracker for "known issues and feature requests reported by the Postman community"** given equal billing with the FAQ. Postman is directing users to a surface where its unfixed bugs are visible and searchable.

**`Find the answer to your question in our the FAQs.`** — `our the`. A typo on the support centre home page, in one of six cards. Also `and more!` in the `Getting started` card is the only exclamation mark in the set.

`Still need help?` closes the page with three options (Discord, support request, Postman answers) — the same community-then-private ordering as the docs, and the same `Still need help?` heading that Wise uses.

**Support-centre category tree** `[partial]`. Category URLs are visible but the pages were not opened, so **article titles are `[absent]`**. Observable category slugs: `Resolve-issues-` (id 8177562535703 — note the trailing hyphen in the slug, a defect), `FAQs` (8180165300503), `Billing` (115000609205 — a numeric-only legacy Zendesk id, unlike its two siblings, suggesting the billing category predates the current IA).

**Three sibling destinations are named at the top of the support page** as a row of cards, which is the clearest statement of Postman's three-surface content model:
- `Learning Center` — "Learn about how to get started using Postman, and read more in the product docs."
- `Support Center` — "Need help? Check out our FAQ, documentation or submit a request."
- `Blog` — "The Postman blog is your hub for API resources, news, and community…"

Docs / support / blog, each with a one-line scope, presented as a choice. Naming the three content surfaces and their division of labour *to the user* is rare and helpful.

**Defects in the support surface, collected:** `our the FAQs` typo · `© 2024` copyright · a stale footer product list (`Postbot`, `VS Code Extension` where marketing lists `Agent Mode`, `Fern`) · a `Learn more →` CTA under a heading-less block that links to the status page with no label explaining it · `Trust and Safety` vs `Security` vs `Trust Center` vs `Trust Portal` naming drift · and the H1 is duplicated (`# Postman` immediately above `# Postman support center`). The support centre is measurably the least maintained surface in Postman's estate, which is the inverse of where maintenance effort should go.

## T12 FAQs `[observed]`

**Nine questions on the security page, all answers present and substantial.** This is Postman's only real FAQ block found and it is aimed squarely at a security reviewer, not a developer.

| # | Question (verbatim) | Answer — summarised |
|---|---|---|
| 1 | What are Postman's data encryption and key management practices? | Four paragraphs. Names AES-256-GCM at rest and TLS in transit; application-layer encryption for environment variables, secrets, and tokens; KMS for keys; BYOK as an Enterprise option with keys inaccessible to Postman and all encryption events logged. Then two paragraphs that answer questions not asked: no customer data in internal testing (fictitious data on a production-mirrored stack), and a 15-day backup retention followed by permanent deletion. |
| 2 | How does Postman protect data centers? | States there are none of its own; AWS operates them; product data and backups in EU and US regions; links to AWS's own controls page. |
| 3 | How does Postman secure its applications? | Per-layer and per-phase: latest stable Node.js, containerisation, architectural guidelines, code review, OWASP testing across the SDLC, annual third-party validation, bug bounty. Second paragraph covers automated and manual review for policy violations, and OS-level auto-patching. |
| 4 | What are Postman's vulnerability management processes? | VAPT per release; scans at network, application, and OS layers throughout the year; every finding gets a CVSS score, an owner, and an SLA deadline; "We may also remove and turn off services"; automated source-code analysis pre-release covering open-source dependencies, with a link to third-party licences. |
| 5 | Does Postman share customer data with any of its third-party partners or sub-processors? | Sharing limited to operating, supporting, and marketing the service; explicit no-sale and no-"share"-as-defined-under-CCPA/CPRA; all vendors pass privacy risk assessment and execute the standard DPA; links to a full sub-processor list. |
| 6 | How does Postman manage attack prevention and mitigation? | Logging from individual API requests up to infrastructure config changes, aggregated and archived in vaulted storage; anti-tampering measures; automated anomaly detection on access and network-flow patterns; per-release third-party-library scans; automatic leadership notification on a customer-reported breach with response "within a few hours". |
| 7 | What is Postman's incident response policy? | A six-item bulleted list of what teams are trained to do: respond to alerts, assess severity, contain, communicate (including customer notification and contractual obligations), preserve forensic evidence, and "Conduct and document a postmortem while developing a permanent triage plan". Closes by noting the policies are SOC 2-audited. |
| 8 | How can I contact Postman Security to report potential abuse or vulnerabilities? | Routes by reporter type: customers to support or `security@postman.com` for abuse; researchers to HackerOne plus the guidelines page; offers a PGP public key for encrypted contact. |
| 9 | Does Postman have a bug bounty program? | Yes; private, via HackerOne; links to the vulnerability-reporting page for scope, eligibility, and submission. |

**Structural notes.** Every question is `What/How/Does <Postman> …` — **Postman is the grammatical subject or object of all nine**, never the reader. Compare Stripe's pricing FAQ, where the subject alternates between reader and company depending on the answer. Here the uniformity is right: a vendor-assessment FAQ is a set of questions *about the vendor*, and the consistency signals that.

The ordering is: encryption → physical → application → vulnerability management → third parties → attack detection → incident response → how to report → bug bounty. That is close to the running order of a standard security questionnaire, which strongly suggests the FAQ was written from real questionnaires. **An FAQ whose ordering mirrors the buyer's own form** is a better artefact than one ordered by popularity, because the reader can work down it alongside their template.

Q1 is the only answer that **volunteers information beyond its question** (internal testing practices, data retention). Placing the two most commonly forgotten disclosures inside the first and most-read answer is a reasonable trade, though it makes Q1 four paragraphs against a two-paragraph average.

Q7's six bullets are the strongest single answer. Note the last one: "Conduct and document a postmortem while developing a permanent triage plan." The word `permanent` distinguishes the durable fix from the incident-time mitigation — and it connects to the status page's `Resolved` update saying "the issue is mitigated" rather than fixed. The FAQ and the status page use a consistent mitigation-versus-permanent-fix distinction, which is a sign of real vocabulary discipline across surfaces.

Q8 answers a routing question with **three routes by reporter type** (customer/abuse, researcher/vulnerability, general/policy) plus an encryption option — the most carefully segmented answer in the set.

**No pricing FAQ was retrievable.** The pricing page's comparison table was truncated and no question-shaped headings survived the fetch. `[absent]` for pricing.

## T13 Terminology & glossary `[observed]`

No public glossary page was found — a notable absence for a product that has coined as much vocabulary as Postman has. `[absent]` for a glossary; terminology below is inferred from consistent usage.

| Term | Postman's usage | The alternative it rejected |
|---|---|---|
| `Collection` | The central object: an ordered, shareable group of requests. The whole product's data model hangs off this noun. | "project", "suite", "folder" |
| `Workspace` | The collaboration container, with four named scopes: `Internal`, `Partner`, `Multi-Partner`, `Public` | "team", "org", "project" |
| `Partner Workspace` / `Multi-Partner` | A named tier of external collaboration, with `multi-partner mode` as a toggle | "external workspace", "guest access" |
| `workbench` | The main editing surface (lower-case, used in prose: "Click **Add** in the workbench") | "editor", "canvas", "main pane" |
| `request builder` | The request-editing region (lower-case) | "request editor" |
| `Runner` / `Collection Runner` | The batch execution engine | "test suite runner", "CI" |
| `Newman` | The CLI runner, a **proper name with no descriptive content** — a status-page component and a docs section, and a reader cannot guess what it is | "Postman CLI" (which now exists separately, alongside Newman — two CLIs, one named after a person) |
| `Postbot` | The AI assistant | |
| `Agent Mode` | The autonomous mode; distinct from `Postman Agent` | |
| `Postman Agent` (`Desktop`, `Cloud`, `Browser`) | The request-execution proxy for the web app | **Collides with `Agent Mode`** — see below |
| `AI Engineer` / `Autonomous API Engineer` | **Two names for one thing** on the same site: the nav says `AI Engineer`, the security page says `Autonomous API Engineer` | |
| `Spec Hub` | The spec-design surface, replacing the older `API Builder` (which survives as a status component and in docs URLs) | |
| `Flows` | The visual workflow builder; `Manual Flows` is the Free-tier variant | |
| `Vault` (`Local Vault`, `Shared Vault`) | Secret storage, with `vault key` as the unlock credential and `vault secret` as the item | "secrets manager", "keychain" |
| `vault secret reference` / `direct vault secret references` | The syntax for using a secret in a request | "variable", "placeholder" |
| `Empty` / `Unresolved` | The two formally defined failure states for variables and secrets | "invalid", "missing" |
| `Run in Postman button` / `Run Button` | **Two names for one feature** — docs say the former, the status page the latter | |
| `Postman Echo` | The sandbox API used for the first request | "test endpoint", "httpbin" |
| `Postman answers` | A public workspace of runnable code samples for common questions (lower-case `answers`) | "cookbook", "recipes" |
| `Public API Network` / `Private API Network` | The two directory scopes | "marketplace", "catalog" — though `API Catalog` also exists as a separate Enterprise product |
| `API Catalog` vs `API Network` vs `Application Inventory` vs `Context Graph` | **Four discovery/inventory products** whose names do not distinguish their scopes from one another | |
| `Interceptor` | The traffic-capture browser extension | "proxy", "recorder" |
| `Insights` | API traffic observability | |
| `Snippets` | Pre-written code fragments, named as sentences (`Status code: Code is 200`) | |
| `Intergalactic` | The conference brand | |
| `Postmanaut` | The mascot, surfaced only in alt text: "Postmanaut shining flash light at object helping another Postmanaut." | |
| `Fabric`, `Fern`, `Astro AI`, `Orbit`, `Passport` | Five sibling products on five external domains | |
| `AI credits` | The AI metering unit, with `pooled` as an unexplained modifier | "tokens", "requests" |

**The `Agent` collision is the terminology defect worth flagging.** Postman uses `Agent` for three unrelated things: `Postman Agent` (the Desktop/Cloud/Browser request proxy), `Agent Mode` (the AI automation feature), and `AI agents` (the customer's own LLM agents, as in `Give API context to your AI agents`). All three appear in the same documentation set, and the vault troubleshooting page contains the sentence "**Select a supported Postman Agent** — If you're using an unsupported Postman Agent to send requests from the Postman web app…" three paragraphs from prose about Agent Mode. A reader debugging a secret resolution failure must disambiguate two `Agent` concepts from context. This is the predictable cost of adopting an industry buzzword for a feature when you already own the word for infrastructure.

Similarly `API Network` (public directory), `API Catalog` (Enterprise inventory), `Application Inventory`, and `Context Graph` are four products in adjacent territory whose names do not encode their differences, and the nav taglines for two of them (`Know every API and service` for `API Catalog`, `Track every endpoint` for `Insights`) are close enough to be interchangeable.

### Machine-readable documentation — a first-class terminology artefact

Postman ships an unusually complete set of affordances for non-human readers, and this is a genuine finding for a 2026 corpus:

- **Every docs page is available as Markdown by appending `.md`**, and every page says so in its own first line: "For clean Markdown content of this page, append .md to this URL."
- **`llms.txt`** — "For the complete documentation index, see https://learning.postman.com/llms.txt." A machine-readable index of the entire documentation set, announced on every page.
- **Every marketing page ends with a line addressed to machines**: `For AI agents: the clean markdown version of this page is available at https://www.postman.com/security.md` (and `/product.md`). Note the vocative: **`For AI agents:`** — the marketing page explicitly addresses a non-human reader class and hands it a cleaner artefact.
- **Docs page chrome** offers `Ask a question` · `Copy page` · `View as Markdown` (title attribute: "View this page as plain text") · `More actions`.

Compare Stripe, which addresses agents with *instructions* ("Coding agents should install the Stripe CLI…"), and Twilio, which offers `Open in ChatGPT` / `Open in Claude` / `Open in Cursor` / `Open in Perplexity`. Three different 2026 solutions to the same problem: Stripe writes *to* the agent, Twilio *routes* to the agent's host, Postman *publishes a parallel artefact* and tells both readers it exists. Postman's is the most content-designerly of the three — same content, two renderings, one announcement line serving both audiences.

## T14 Voice, tone & accessibility `[observed]`

**No published content style guide or voice-and-tone documentation was found.** Postman publishes no design-system content guidance comparable to Twilio's Paste. `[absent]`. The observations below are inferred from shipped copy.

**Person.** Second person for the reader throughout docs ("If you're having trouble with the Postman app…", "you'll get an error message"). First-person plural for Postman, and used freely in security copy where it carries accountability: "We rely on our users", "We only share information with third parties to help us operate", "we respond to the report within a few hours", "We may also remove and turn off services." The last one is notable — Postman states a drastic unilateral remedy in the first person rather than the passive.

One odd construction recurs in the security FAQ: **"Our company"** as the subject, four times ("Our company's product data and backups are hosted on AWS", "Our company further implements measures", "Our company has incident response policies", "Our company's automated and manual code review processes"). Alongside "we" and "Postman" this makes three self-references in one page, and "our company" is the most distant of the three — it reads like a security questionnaire answer pasted in, which it very likely is.

**Register gradient.** Marketing is punchy and tricolon-heavy. Docs are flat, procedural, and second-person. Security copy is the most rhetorically worked surface on the site (`Developers love us. CISOs trust us.`, `Compliance isn't a checkbox it's a proof point.`) — unusual, since security pages are normally the driest. Support-centre copy is warmest ("Get started with Postman with our docs, tutorials, videos, and more!"). Status-page copy is terse to the point of unhelpfulness.

**Exclamation marks** are rationed: two found in total (`and more!` on the support centre; `sometimes it just looks wrong!` does not occur here — that was Twilio). None in docs, none in errors, none on the status page.

**Contractions** used freely in docs ("you're", "doesn't", "can't", "you'll", "It's possible") and in security copy ("isn't", "doesn't"). Absent from the FAQ answers, which shift to formal register.

**Sentence case** is the dominant heading convention (`Postman support center`, `Common issues`, `Getting help`, `Fix empty vault secrets`) but **title case appears on marketing** (`Sign Up for Free`, `Contact Sales`, `Buy with AWS`, `Chat with a Postman Expert`, `Talk to our team` — that last one sentence case, adjacent to the others). No consistent rule; the boundary is roughly docs-versus-marketing but `Chat with a Postman Expert` and `Chat with a Postman expert` appear on the *same page*, linked to each other.

**Punctuation is the weakest area.** Collected defects:
- Missing clause punctuation in four headings and one attributed customer quote (see T2)
- Double space in the announcement bar and in `Resend OTP in:  seconds`
- Terminal full stops inside link text (`View historical uptime.`, `Contact sales to learn more.` is Stripe's but Postman has the pattern too)
- Inconsistent terminal punctuation across six sibling AI cards
- `our the FAQs` on the support centre
- `| Tracking Cookies Used.` with a leading pipe in every footer
- `Api Builder` mis-cased in an incident title
- `Resolve-issues-` with a trailing hyphen in a category slug

**Accessibility content**

**Strong:**
- `Skip to main content` on marketing pages; `Skip to content` / `Skip to navigation` / `Skip to topbar` on docs
- **Alt text is descriptive and names the illustration's narrative**: "Postmanaut shining flash light at object helping another Postmanaut. Illustration." · "Postman Platform Diagram. Illustration." · "Mouse pointer clicking in the web browser. Icon." · "Magic wand icon representing API design" · "Two wrenches crossed to depict API testing. Icon." · "Monitor with a heart rate line. Icon." · "Career growth. Icon." The `. Icon.` / `. Illustration.` suffix is a consistent convention that tells a screen-reader user what kind of graphic it is — useful, though it technically duplicates the role.
- **Compliance badge alt text carries the verdict**: `SOC 2 Type II certified.`, `PCI DSS compliant.`, `HIPAA compliant.` — so the certification list is fully available non-visually, and the certified/compliant distinction survives.
- Logo alt text is minimal and correct: `Microsoft logo`, `PayPal logo`, `Mastercard logo`.
- **Non-colour redundant error cue documented**: empty/unresolved secrets are shown in red *and* with "an exclamation point… on the **Variables** icon". Colour is not the sole carrier.
- **Icons in docs prose are given accessible names inline**: `![Console icon](…)` renders as `Console icon` followed by the bolded control name `**Console**`, so the instruction reads "Click Console icon **Console** in the Postman footer" — verbose, but the control is named in text rather than depicted only.
- The docs include a `Screen reader`-adjacent concern in the form of the `.md` alternative rendering, which is incidentally the most accessible version of any docs page.
- `Was this page helpful?` / `Yes` / `No` — a two-option feedback control with a real question as its label.

**Defects:**
- **Nav link names are concatenated label-plus-tagline**: `FabricRoute, govern, and observe your AI traffic`, `Agent ModeAutomate API workflows with native AI`, `API GovernanceEnforce API standards at scale`, and about fifteen others. The accessible name of each nav item runs the product name into its description with no separator. Also `Spec Hub Manage specifications`, `API Client Send API requests` on the support-centre nav (with a space, which is better but still one name for two pieces of information).
- **Eight identical `View docs →` links** in the security page's governance grid; **three identical `Read articles →`** on the support centre.
- **~26 of 29 status components render a bare `?`** as a tooltip trigger's accessible text.
- `Subscribe to UpdatesSubscribe` — doubled accessible name on the status page's primary control.
- **Duplicated H1** on the support centre (`# Postman` immediately above `# Postman support center`).
- **Marketing nav is served twice in the DOM** (desktop and mobile variants, identical content), so a screen-reader user may traverse the entire ~60-item product menu twice.
- **Customer logos are served three times** on the pricing page — once with alt text, once with empty alt, once with alt text again — so the six-logo rail may be announced twice.
- `Resend OTP in:  seconds` — visible empty interpolation.
- `OTP` unexpanded in a field label.
- **`This form requires JavaScript to function. Please enable JavaScript for the best experience on this site.`** and a second variant, `This form is prevented from loading because JavaScript is disabled…` — two different strings for one condition, both rendered simultaneously in the no-JS case, and neither offers an alternative route to contacting sales. A hard dead end for a JS-disabled user on the primary enterprise conversion path.
- Icon-only disclosure triggers on the pricing page (`Info. Icon.`, `Question. Icon.`) attached to ~40 feature rows — the alt text names the icon type but not what it will reveal, so a screen-reader user learns there is an explanation available but nothing about its subject.
- `Unavailable` as alt text on a red X in a pricing cell — the fact is conveyed, but a table cell whose content is an image is fragile.

---

## Transferable patterns

1. **Name top-level documentation categories with a single bare verb, ordered by time-since-first-use, and put the empathy in the scope line.** `Install` · `Navigate` · `Use` · `Test` · `Design` · `Collaborate` · `Administer` · `Troubleshoot`, with `Troubleshoot` last and its scope line opening `Having trouble?`. Maximally scannable, and it forces every scope line to be a real sentence. Condition: only works if you accept that the ordering will contradict your product's logical architecture — Postman puts `Design` after `Test` because that is the order users meet them.

2. **Make step 1 of onboarding require no account, no install, and no asset of the user's own.** Postman supplies the API to call (`postman-echo.com`), so the first success is three clicks deep and sign-in is deferred to the moment it is genuinely needed — saving, not doing. Then state the reason: "sign in to Postman" appears as a prerequisite of `Save`, not of `Send`.

3. **Do it, then explain what you did — past tense, actors named, placed after success.** The `How it works` block narrates the round trip in three past-tense sentences with a rotating grammatical subject (Postman → server → Postman). The conceptual model arrives when the reader has a concrete event to attach it to, which is when it sticks.

4. **Organise a troubleshooting reference by candidate *cause*, not by symptom or code — and include a row that says "this might be our bug".** Postman's `Issue` / `Resolving the issue` table gives thirteen hypotheses for one symptom, and the `Postman errors` row names Postman as a suspect, supplies a verification method, and routes to a *public* issue tracker. Right shape for any product whose failures are mostly configuration, and the self-incriminating row buys more trust than a page of assurances.

5. **Define your failure states formally and distinctly before listing fixes.** `Empty vault secret` ("doesn't have a value but is referenced") versus `Unresolved vault secret` ("can't resolve a value, either because it can't be accessed or because it no longer exists"). Two states most products would both call "invalid", with completely different remedies. Then structure each remedy as **bolded fix-name → why it happened → the exact button**, fix-name first so a scanner sees only the available actions.

6. **Route escalation on the sensitivity of the evidence, not the severity of the problem.** "If you need to include confidential data, file a support ticket with Postman support, including your Console logs." That is the real reason a developer needs a private channel, and saying it keeps low-stakes traffic in the community tier while stopping people pasting secrets into public issues.

7. **State the safe default for autonomous behaviour, in five words, under a principle heading.** `Humans stay in the loop` → "Auto-run is off by default", beside "You decide if the Autonomous API Engineer runs." For any agentic feature, the default is the disclosure. Postman also discloses that PII redaction runs "via third-party guardrails" rather than implying it is first-party — the pattern is to name the mechanism's provenance when it is not yours.

8. **Publish a parallel machine-readable rendering and announce it to both readers.** Every docs page opens with "append .md to this URL" and points at `llms.txt`; every marketing page closes with `For AI agents: the clean markdown version of this page is available at …`. One content source, two renderings, one line serving the human and the agent. Cleaner than writing instructions *to* agents inside reference prose.

9. **Two audiences, two verbs, six words.** `Developers love us. CISOs trust us.` The asymmetry of *love* (what an individual feels about a chosen tool) and *trust* (what an accountable executive extends to a vendor) is the entire bottom-up-plus-top-down argument, and the asymmetry is what makes it credible. Then restore the objects in the longer variant at the point of conversion: `The platform your developers love. The security controls your CISO trusts.`

10. **Order a vendor-trust FAQ to mirror the buyer's own questionnaire.** Encryption → physical → application → vulnerability management → third parties → detection → incident response → reporting → bug bounty. The reader can work down it beside their template. And make one answer volunteer the two things people always forget to ask (internal testing practices, data retention).

11. **The anti-pattern: an incident update with no blast radius and no next-update commitment.** Postman's five-stage lifecycle has good cadence (five updates in 25 minutes) and almost no content — no affected population, no observable symptom, no "next update in N minutes", internal vocabulary (`db resources`) leaking, and a stage/body inversion where the specific information arrived under the generic `Update` label. Compare Twilio's template in file 027. Cadence without content is not communication.

## Caveats & gaps

- **No error-code or error-message reference exists publicly.** Postman is a client, so most errors it displays originate in the user's own API or network; there is no equivalent of Stripe's `error-codes` or Twilio's error dictionary. Every in-product error string here is `[documented]` via a docs *description* of it, never quoted. The two exceptions are the `Debug with AI` button label and the `Error` label in the variables pane. This is a real limit of an unauthenticated pass on a desktop application, not a gap in Postman's practice.
- **Support-centre category pages were not opened.** Three category URLs were captured (`Resolve-issues-`, `FAQs`, `Billing`) but no article titles were retrieved, so T11's article-title grammar is `[absent]`. This is the largest single gap in the file — the help-centre IA is described from its six routing cards only.
- **The pricing comparison table was truncated in transit.** Four tier cards, their qualifiers, prices, and headline feature bullets were captured in full, along with the two AI-credit rows. Roughly eighty further feature rows were not read, so any specific per-tier feature claim beyond those listed should be re-verified. The `Pay monthly` / `Pay annually` toggle was observed but only annual prices were rendered in the fetch.
- **What an AI credit buys is not on the pricing page** and the linked `/docs/billing/agent-mode-usage/` page was not fetched. The `(pooled)` modifier on the Enterprise allowance is therefore recorded as under-explained without my having read the explanation that may exist downstream.
- **`/docs/getting-started/troubleshooting/troubleshooting-apps/` returned an empty response body.** The reachable equivalent (`/docs/getting-started/troubleshooting-inapp`) was harvested instead; the two may or may not be the same page under a redirect I could not confirm.
- **The enterprise contact form requires JavaScript** and rendered only its two no-JS fallback strings, so its field labels, validation copy, and required-field marking are `[absent]`. Noted as an accessibility defect in T14 on the evidence available.
- **No published content style guide or voice-and-tone documentation was found.** Searched the design-system, docs, and marketing surfaces. Postman has nothing comparable to Twilio's Paste content foundations. All T14 findings are inferred from shipped copy, and I have not claimed a rule where I only observed a tendency.
- **No glossary page was found**, which for a product with this much coined vocabulary (`Collection`, `Workspace`, `workbench`, `Newman`, `Postbot`, `Vault`, `Flows`, `Spec Hub`) is a notable absence. T13's terminology table is my inference from consistent usage, not a transcription of Postman's own definitions.
- **Status-page capture is a point-in-time snapshot** (2026-09-21) with every component `Operational` and exactly one incident in the 90-day window. The **five-stage incident lifecycle is therefore generalised from a single incident** — a 25-minute database issue on 10 September 2026. The stage *labels* are Statuspage-standard and reliable; my characterisation of Postman's update *content* rests on five update bodies and should be treated as indicative rather than proven. A longer history (`/history`) was not fetched.
- **The `US` / `Europe` component asymmetry is reported as observed, not interpreted.** I record that Europe lists 6 components against the US's 23 and that the page does not explain why. I have not inferred what the absence means — three readings (not deployed, served from US, not separately instrumented) are all consistent with the evidence and the page distinguishes none of them.
- **Statuspage-supplied strings are shared with Twilio (file 027).** The severity legend, uptime-graph empty states, subscription-form copy, and the `Resend OTP in:  seconds` defect are vendor copy, not Postman's authorship. I have flagged them as such; the finding that they are off-voice on the outage page is still Postman's governance issue.
- **All in-product UI is unobserved.** The desktop app, Console, Collection Runner, Agent Mode, and every empty state and toast are behind download and auth. Where in-product copy appears here it is `[documented]` from a docs instruction (`Send`, `Save`, `Enable Secret`, `Update Domains`, `Access Vault`) and marked as such.
- Locale: en-US only. A `ja_JP` alternate exists at `/jp/` on every marketing page and was not harvested.
- The nine-question security FAQ was read in full; answers are summarised per the schema and no answer body is quoted at length. Short factual strings inside answers (encryption algorithm names, retention periods, bug-bounty figures) are quoted because they are the substance.

## Sources

1. https://www.postman.com/product/ — reached via https://www.postman.com/product/what-is-postman/ (redirects)
2. https://www.postman.com/pricing/ — comparison table truncated in transit
3. https://learning.postman.com/docs/introduction/overview/
4. https://learning.postman.com/docs/getting-started/quick-start
5. https://learning.postman.com/docs/use/send-requests/response-data/troubleshooting-api-requests.md
6. https://learning.postman.com/docs/use/postman-vault/troubleshoot-vault-secrets.md
7. https://learning.postman.com/docs/getting-started/troubleshooting-inapp
8. https://www.postman.com/security/
9. https://status.postman.com/
10. https://support.postman.com/hc/en-us
11. https://learning.postman.com/docs/getting-started/troubleshooting/troubleshooting-apps/ — attempted, empty response body
