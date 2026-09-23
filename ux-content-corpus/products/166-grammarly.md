# 166. Grammarly

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Writing assistant / inline grammar-and-style coaching (now bundled into the Superhuman platform) |
| Primary URL | https://www.grammarly.com/ |
| Corpus rank | 166 |
| Benchmark strength (source list) | Inline coaching and explanations |
| Locale / market observed | en-US (site defaulted to US pricing in USD) |
| Platform observed | Web (marketing), Zendesk help centre, Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for financial/health. Visible compliance surface: SOC 2 (Type 2) attestation cited in pricing FAQ; CA Notice at Collection; GDPR-style personal-data-report right referenced in Account Hub docs; enterprise DLP / BYOK / audit-log controls listed as plan features |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Full for the flagged strength. Three pages timed out repeatedly and are recorded in Caveats. The suggestion card itself is behind auth; its copy is `[documented]` from the Editor user guide, not `[observed]` |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.grammarly.com/ | Hero, feature carousel, embedded pricing cards, responsible-AI block |
| Pricing / plans | https://www.grammarly.com/plans | Three-plan cards, four comparison tables, 4-question FAQ |
| Help centre home | https://support.grammarly.com/hc/en-us | Six top-level categories, featured articles |
| Get started with Grammarly | https://support.grammarly.com/hc/en-us/articles/19812297751053-Get-started-with-Grammarly | **Names the four suggestion categories** |
| Help category: Tips & Tutorials | https://support.grammarly.com/hc/en-us/categories/115000018631-Tips-Tutorials | 17 sections, richest source of article-title grammar |
| Help category: Resolve Issues | https://support.grammarly.com/hc/en-us/categories/115000018072-Resolve-Issues | 14 sections; error-message titles quoted verbatim in the IA |
| Grammarly Editor user guide | https://support.grammarly.com/hc/en-us/articles/360003474732-Grammarly-Editor-user-guide | **The inline-coaching source** — suggestion-card actions, underline system, Goals |
| Introducing generative AI assistance | https://support.grammarly.com/hc/en-us/articles/14528857014285-Introducing-generative-AI-assistance | Feature framing, Go/agents |
| How many generative AI prompts do I have? | https://support.grammarly.com/hc/en-us/articles/17775763102989-How-many-generative-AI-prompts-do-I-have | **Billable-unit definition and refill rule** |
| Error message: "You're out of prompts" | https://support.grammarly.com/hc/en-us/articles/17776038294285-Error-message-You-re-out-of-prompts | Exhaustion state + per-plan allocations |
| How do Grammarly's tone suggestions work? | https://support.grammarly.com/hc/en-us/articles/10674801783309-How-do-Grammarly-s-tone-suggestions-work | Tone-suggestion vs tone-detector distinction |
| Responsible AI | https://www.grammarly.com/ai/responsible-ai | Five principles, 9-question FAQ, user-agency framing |
| Accessibility Statement | https://www.grammarly.com/accessibility-statement | Measures, AT compatibility matrix, response SLA |
| Status page | https://status.grammarly.com/ | 22 components, live incident captured |

---

## T1 Navigation & IA labels

**Global nav — audience-first, then feature** `[observed]`

Five top-level items: `Product` · `Work` · `Education` · `Pricing` · `Resources`.

The interesting decision is that only `Pricing` is a flat link; the other four are menus, and two of them (`Work`, `Education`) are **audiences** while two (`Product`, `Resources`) are **artefact types**. The mixed axis is visible in the sub-headings, which are explicitly labelled with their sort key:

- Under `Product`: `Learn` and `Use Grammarly`
- Under `Work`: `By team size` and `By team function`
- Under `Resources`: `Learn`, `Tools`, `AI agents`

`Learn` appears twice, in two different menus, pointing at different link sets. That is a genuine IA defect — the same group label denotes "conceptual pages about the product" under `Product` and "blog and guides" under `Resources`.

**`Education` is the only menu with no sub-heading at all** — its container renders as an empty group label followed by two links (`Students`, `Institutions`). In the served markup the empty heading is present but blank, which suggests a CMS field left unfilled rather than a design decision.

**Help centre top level — six categories, noun-phrase, no scope lines** `[observed]`

`About Superhuman` · `Billing & Subscription` · `Resolve Issues` · `Account Basics` · `Tips & Tutorials` · `Business & Schools`

Compare the Wise pattern: Grammarly gives no one-line scope description under any category, so the user must infer coverage from a two-word noun phrase. `Resolve Issues` is the one verb-first label and the only one that names a user state rather than a subject area. `About Superhuman` sitting first, above `Billing`, is a corporate-narrative placement rather than a demand-ranked one.

**Second-level IA is product-surface-shaped, not task-shaped** `[observed]`. Inside `Tips & Tutorials` the seventeen sections are almost all named after a binary: `Superhuman Go for Windows and Mac`, `Superhuman Go Browser Extension`, `Superhuman Go for Android`, `Superhuman Go for iOS`, `Grammarly for Windows and Mac`, `Grammarly Editor (classic)`, `Grammarly Browser Extension`, `Grammarly for iPhone`, `Grammarly for iPad`, `Grammarly for Android`, `Grammarly for Microsoft Office`, `Grammarly for Microsoft Word on Mac`. Only four are task- or concept-shaped: `Agents`, `Docs`, `Generative AI assistance`, `Questions about Grammarly features`, plus the catch-all `Other Tips & Tutorials`.

This means a user with a task ("change my dialect") must first know which client they are in. The one concession is the catch-all section name `Questions about Grammarly features`, which is where the genuinely cross-surface articles live.

**`(classic)` as an IA suffix** `[observed]` — `Grammarly Editor (classic)` marks a deprecated-but-live surface inside the category name itself, without removing it. A cheap and honest deprecation signal.

**Footer groupings** `[observed]`: `Get Grammarly` · `Learn more` · `Features` · `Company` · `Connect`. The `Features` column carries 30 links, most of them SEO tool pages (`Word Counter`, `Character Counter`, `Paragraph Counter`, `Sentence Counter` are four separate entries). `Accessibility` and `Security` sit in `Company`, not in `Connect`.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Think big. We'll take care of the details.`
> Subhead: "Work with an AI partner that helps turn your thoughts into writing that's clear, credible, and impossible to ignore."

Two-sentence headline with a division-of-labour promise: the user keeps the ambition, the product takes the drudgery. `We'll` puts the company in first person as the actor. The subhead runs a tricolon (`clear, credible, and impossible to ignore`) where the third term breaks the adjective pattern into a phrase — a deliberate rhythm break on the benefit that is hardest to measure.

Note the word `partner`. Grammarly consistently avoids `tool` in hero copy while using `tool` freely in the footer nav (`AI Writing Tools`).

**Section headers use a two-line break with an internal pivot** `[observed]`

- `Better writing, better results`
- `Keep your voice, make it clear`
- `Get a read on your writing`
- `This is responsible AI`
- `Choose the right Grammarly plan`
- `Great writing gets work done`

`Keep your voice, make it clear` is the load-bearing one: it names the user's fear (losing their voice) before the benefit. This is the writing-assistant category's core objection and Grammarly puts it in a section header rather than an FAQ.

`Get a read on your writing` is a pun (a reading / a read on) doing double duty for the Reader Reactions agent.

**Feature carousel — noun label + one-sentence mechanism** `[observed]`

| Label | Body |
|---|---|
| `Paragraph rewrites` | "Improve clarity and flow with one click." |
| `Tone suggestions` | "Adapt your message for the context." |
| `Proofreading` | "Refine grammar, structure, clarity, and more." |
| `Humanizer agent` | "Give your writing personality." |
| `AI Detector agent` | "Spot AI-generated text and areas to revise." |

Every body line is an imperative verb phrase under 8 words. Two of the five carry the suffix `agent` in the label — a new product-noun being taught by repetition rather than by definition.

**Numbers as trust devices, but rounded** `[observed]`: `50,000 organizations`, `40 million people`, `17x`, `$5,000 per employee per year`, `20 days saved annually per user`, `50% fewer writing and editing hours`, `$210K saved in the first nine months`, `3x faster editing process`, `66% improvement of writing quality`, `92% style-guide feature adoption`, `4.9/5 customer satisfaction rating`.

Contrast Wise, whose numbers are deliberately unrounded (`18.9 million`, `301,144 reviews`). Grammarly's are rounded and every one is attributed to a named customer with a job title, which trades statistical specificity for social proof. The ROI claim (`17x`) is stated without a stated basis on the page.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Grammarly` / `It's free` | Global nav, primary | Two-part button: label plus a smaller price qualifier |
| `Sign up` / `It's free` | Hero and page-foot | Same two-part construction, different verb |
| `Request a demo` | Global nav, secondary | Sales path kept visually equal to self-serve |
| `Log in` | Global nav | |
| `Sign in` | Help centre nav | **Inconsistent with `Log in`** — same action, two labels, two surfaces |
| `Create Account` | Homepage Free plan card | Title case |
| `Create account` | Plans-page Free plan card | Sentence case — **same button, two casings, two pages** |
| `Get started` | Homepage Pro card | |
| `Try for free` | Plans-page Pro card | Different label for the same plan's CTA than the homepage uses |
| `Try for $0.00` | Plans-page Pro card, below `Try for free` | **Two CTAs stacked for one action**, one naming the offer, one naming the charge |
| `Contact Sales` | Enterprise card, both pages | Only consistently-labelled plan CTA |
| `Explore Enterprise` | ROI section | |
| `Learn more` | Responsible-AI block, Trust Center card | Bare `Learn more`, twice — the object is only in the adjacent heading |
| `Get the report` | Responsible AI, gated asset | |
| `Buy a license` | Help-centre category headers | Odd placement: a purchase CTA pinned beside `Resolve Issues` |
| `Can't find your answer? Contact us` | Help centre foot | Question-then-action, one control |
| `Submit a request` | Article foot, under `Have more questions?` | |
| `Subscribe to Updates` / `Subscribe` | Status page | |
| `SUBMIT` | Article feedback form | All-caps, the only all-caps CTA found |
| `Yes` / `No` | Article foot, under `Was this article helpful?` | |

**In-product CTAs** `[documented]` from the Editor user guide: `New document` · `Upload file` · `Accept` · `Dismiss` · `Learn more` · `More Actions` · `Add to dictionary` · `Turn off suggestions like this` · `Check for AI text & plagiarism` · `Goals` · `Done` · `Overall score` · `Download PDF Report` · `Correct with Assistant` · `Write with generative AI` · `Download` · `Provide feedback` · `Editor settings`.

**Observation.** The acquisition funnel has five distinct labels for "start using the free product" (`Get Grammarly`, `Sign up`, `Create Account`, `Create account`, `Try for free`) across two pages. The `It's free` qualifier appended in smaller type beneath the button label is a reusable pattern — it lets the button stay a verb while the price objection is answered in the same tap target.

## T4 Onboarding & getting-started

**The getting-started article is a five-step numbered contract, stated up front** `[observed]`

The article opens with `This article covers:` and an ordered list, then repeats each item as an H3. The five:

1. `Creating and accessing your Grammarly account`
2. `Installing Grammarly`
3. `Using Grammarly to check your writing`
4. `Upgrading to Grammarly's paid plan`
5. `Personalizing your Grammarly experience`

All five are gerund phrases. Step 4 — the upsell — is placed as a *numbered onboarding step* rather than a banner, which normalises it as part of setup. Step 5 exists only to enumerate the four Account Hub sections (`Profile Settings`, `Writing`, `Subscription`, `Security`), so the onboarding article doubles as a settings map.

**Tone of the opener** `[observed]`: "Welcome!" then "we're excited for you to embark on your writing journey with Grammarly by your side." Register is warmer here than anywhere else in the corpus of pages inspected; the marketing hero is cooler than the help-centre welcome, which is an unusual inversion.

**A constraint stated as a plain fact in onboarding** `[observed]`: "Grammarly is cloud-based software and cannot be used offline." Placed inside the install step rather than in a system-requirements page, so the user meets the limitation before they hit it. Good practice worth stealing.

**Superhuman Go onboarding is a separate, parallel track** `[documented]`: `Get Started with Superhuman Go for Android`, `Get started with Superhuman Go for iOS`, `Get started with Inline Intelligence`. Note the casing split — `Get Started` (Android) vs `Get started` (iOS) in adjacent sections of the same category listing.

## T5 Form & field labels

Pre-auth forms are minimal; the Editor's input surfaces are `[documented]`.

**Signup** `[observed]`: the hero offers `Sign up with Google` as a labelled alternative path, with the consent line below rather than as a checkbox — see T10.

**Status page subscription** `[observed]`: `Email address:` · `Enter OTP:` · `Resend OTP in: seconds` · `Didn't receive the OTP? Resend OTP`. The colon-suffixed labels are Statuspage defaults; the OTP step is Grammarly-added and unusual for a status subscription.

**Prompt input** `[documented]` — the generative-AI field is described as "the prompt field", and the article gives a definition of what goes in it rather than a placeholder: a prompt "can be a question, statement, or command" and "can be a few words or up to several paragraphs in length." The documentation supplies one verbatim example of a canned prompt: `Improve it`.

**Goals** `[documented]` — a pre-writing configuration panel opened by `Goals` and committed by `Done`. The help article names one setting axis explicitly, `Domains`, and gates it to paid plans. The remaining axes are not named on any public page. `[absent]` for the full goal vocabulary.

**Language preference** `[documented]` — the setting is phrased as a first-person sentence-completion: the dropdown sits next to the label `I write in`. This is a notably good pattern: the field label is the first half of the user's own sentence, so the selected value completes it. The five values are named in the article title: American, British, Canadian, Australian, Indian English.

**Editor settings** `[documented]`, expressed as four toggle descriptions rather than labels:
- "Turn off auto-jumping to the next alert"
- "Prevent Grammarly from checking quoted text"
- "Increase the document's font size"
- "Activate the colorblind mode"

Each is an imperative describing the *effect of switching it on*, which avoids the classic toggle-polarity ambiguity. `colorblind mode` is the accessibility affordance and is listed as a peer of font size rather than segregated into an accessibility panel.

## T6 Status & state language

**Status-page component states** `[observed]` — a five-value scale, listed as a legend: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Twenty-two components each carry one, and the roll-up headline was `All Systems Operational`.

The component list is itself a product inventory and shows the Superhuman migration mid-flight: `Grammarly for Windows`, `Grammarly for Mac`, `Grammarly Editor`, `Grammarly's Browser Extension`, `Grammarly for Android`, `Grammarly for iPhone`, `Grammarly for iPad`, `Superhuman Go & Agents`, `Superhuman Go for Windows`, `Superhuman Go for Mac`, `Superhuman Go browser extension`, `Login`, `Billing Service`, `Writing Suggestions`, `Generative AI assistance`, `Snippets and Knowledge Share`, `AI detection`, `Plagiarism Detection`, `Account Management`, `Email Preference Management`, `Help Center`, `Email delivery`, `Grammarly for Microsoft Office`.

Casing is inconsistent within the list: `Superhuman Go for Windows` vs `Superhuman Go browser extension`; `AI detection` vs `Plagiarism Detection`.

**Incident lifecycle states** `[observed]` — `Identified` → `Monitoring` → `Resolved`, each stamped with a timestamp. Standard Statuspage vocabulary, used correctly.

**Suggestion state is encoded as underline colour** `[documented]`: "you'll see a red, blue, green, or purple underline," plus "gray underlines" for a team style guide. Four colours map onto the four suggestion categories, but **no public page states which colour is which category** — see the defect note in T14.

**Account-type state** `[documented]`: "The type of account you currently have (Free or Paid) is indicated every time you log in." The binary shown to the user (`Free` / `Paid`) is coarser than the plan vocabulary used everywhere else.

## T7 Error, failure & recovery

The strongest observable category after T13, because **Grammarly puts the verbatim error string in the help-article title**.

**Error-string-as-title pattern** `[observed]` in the Resolve Issues IA:

- `Error message: "You're out of prompts"`
- `Error message: "Can't help with this text"`
- `Error message: "Something went wrong"`
- `Error message: "Hmm, don't know that language"`
- `Error message: "Couldn't Generate Text"`
- `Error: Hm, something went wrong`
- `Error: A small error has occurred, causing an interruption of service`
- `Error: Your Internet Connection Is Unstable`
- `Error: "Whoops! Adjust the cursor's position and try again"`
- `Error: "We found a problem. Your doc is safe, and we have been notified."`
- `Error: "Text too short" or "No actions available"`
- `Error: "Can't connect right now"`
- `Error: "No connection," "Something went wrong," loading, or other connectivity issues`
- `Error: "Superhuman Go is temporarily unavailable. There is an issue connecting to your organization security settings."`

This is a deliberate findability decision: the user copy-pastes the string they see and lands on the article. It also, incidentally, publishes the entire in-product error inventory, which is why this category is unusually rich for an authenticated product.

**What the error strings reveal about Grammarly's error register:**

- Two filler-word openers, `Hmm,` and `Whoops!`, both in generative-AI or mobile contexts. These are the only exclamation marks and the only interjections found. Grammarly is willing to be cute when the failure is low-stakes and the system is at fault.
- `Hm, something went wrong` and `Something went wrong` coexist as **two distinct errors with two distinct articles** — one spelled `Hm`, one with no interjection. This is a real inconsistency, not a surface variant.
- `Error: "Text too short" or "No actions available"` — two strings share one article because they share one cause. Sensible content-ops consolidation.
- `We found a problem. Your doc is safe, and we have been notified.` is the best string in the set: three clauses doing three jobs — acknowledge, reassure about the thing the user actually fears (data loss), and remove the reporting burden. No apology, no jargon, no action required of the user.
- `A small error has occurred, causing an interruption of service` is the worst: passive, self-minimising (`small`), and it describes the system's experience rather than the user's.
- `Superhuman Go is temporarily unavailable. There is an issue connecting to your organization security settings.` leaks an admin-domain cause to an end user who cannot act on it.

**Recovery-article titles are first-person and symptom-shaped** `[observed]`

- `I can't log in to Grammarly for Windows and Mac or it logs me out all the time`
- `Grammarly logs me out`
- `I don't see the Grammarly icon on my keyboard`
- `I do not see suggestions in Google Docs or they are not applied`
- `I don't see the full list of suggestions when using the Grammarly browser extension`
- `Grammarly shows up, but it's not checking my writing (no suggestions)`
- `Grammarly is slow or makes my phone lag`
- `Grammarly for Windows or Grammarly for Mac disappeared`
- `Grammarly doesn't recognize my paid account`
- `I can't uninstall Grammarly for Mac`
- `I experience issues in Microsoft Word`
- `Grammarly shows I had no activity`

Two grammars coexist: first person (`I can't …`, `I don't see …`) and product-as-subject (`Grammarly logs me out`, `Grammarly disappeared`). The product-as-subject form is used where the product is the agent of the annoyance — `Grammarly logs me out` assigns blame to the product in the title, which is unusually candid.

`Grammarly shows up, but it's not checking my writing (no suggestions)` uses a parenthetical to add the search term the user would more likely type. A pragmatic SEO-in-the-title move.

`I do not see` and `I don't see` both appear in adjacent sections — contraction policy is not enforced.

**Deprecation is written as its own article type** `[observed]`: `Grammarly for Microsoft Office will be discontinued soon` and `Grammarly for Microsoft Word on Mac was discontinued`. Note the tense pair — the same content shape is shipped in future and past tense as the removal lands. Like Wise, Grammarly documents withdrawal rather than silently dropping it.

**`Known issues` as a published article type** `[observed]`: `Known issues on websites`, `Known issues with Superhuman Go browser extension on websites`. A standing admission-of-defect page, maintained.

## T8 Empty states

`[absent]` on public surfaces. All editor and dashboard empty states are behind auth.

Two near-adjacent states were captured:

- **Status page, no-incident day** `[observed]`: `No incidents reported.` repeated per date. Terse, past tense, no celebratory framing — compare products that write "All clear!" here.
- **Zero-balance state** `[documented]`: "if you are indeed out of prompts, you should see a notice that indicates there are '0 prompts' remaining." The quoted in-product string is `0 prompts`, i.e. the counter renders the zero rather than swapping to an empty-state message; the message is carried by the separate `You're out of prompts` error.
- **Plagiarism zero-result** `[observed]` as an article title only: `No plagiarism was detected`. That the product ships a help article explaining a *negative* result implies the empty state itself was not self-explanatory — a useful signal that "nothing found" states in detection products need an in-place explanation.

## T9 Notifications & system messages

**Live incident copy** `[observed]`, Sep 22 2026, captured verbatim from the `Identified` update:

> "Some users might see this error while using chat at go.superhuman.com: 'Darn, looks like we're unable to load this page.' We're working on a fix. Thanks for your patience!"

Four moves in three sentences: bound the blast radius (`Some users`), quote the exact string the user is seeing, state the action, thank. The nested product error string `Darn, looks like we're unable to load this page.` is a third interjection variant (`Darn`) alongside `Hmm` and `Whoops` — three different filler-word registers across three surfaces.

`Resolved - This incident has been resolved.` is tautological boilerplate, Statuspage default, left unedited.

**Trial-expiry notification promised on the pricing card** `[observed]`: `Email reminder 2 days before trial ends.` Stated as a plain declarative *inside the purchase card*, next to `$0 payment today`. Pre-committing to the reminder at the moment of decision is a genuinely good dark-pattern-avoidance move and is one of only two places Grammarly volunteers a future notification.

**Prompt-refill countdown** `[documented]`: "Hover over the number of prompts to see how many days until your next refill." The remaining balance is always-on; the refill date is progressive disclosure on hover. For a free-tier user hitting the wall, the article notes they will see "a message that indicates the number of days before your next prompt refill date, as well as the option to Upgrade" — i.e. the exhaustion message pairs a wait with a buy.

**Weekly Progress Reports** `[observed]` as a help section name — an email product with its own troubleshooting section (`Grammarly shows I had no activity`), confirming an emailed engagement digest exists.

**Feedback micro-survey** `[observed]` — after `Was this article helpful?` / `Yes` / `No`, a five-option reason picker: `This didn't answer my question` · `This didn't solve my problem` · `This information is incorrect and outdated` · `This article is confusing` · `Other`. Note the first two are distinguished (question vs problem) — a distinction most help centres collapse. The confirmation toast is `Thank you! Your feedback helps us improve.` and the intro line above the picker makes a commitment: "We promise to act on your feedback."

## T10 Disclosures, legal & compliance

### Metered-billing disclosure — the weakest area

The billable unit is the **prompt**, and its treatment is inconsistent across three pages harvested on the same day.

| Source | Free | Premium | Pro | Plus / Business / Education | Enterprise |
|---|---|---|---|---|---|
| Plans page comparison table `[observed]` | `100 prompts / month` | — | `2,000 prompts / member / month` | — | `Unlimited prompts / member / month` |
| Homepage plan cards `[observed]` | "Generate text with 100 AI prompts" | — | "Generate text with 2,000 AI prompts" | — | "Unlimited generative AI prompts" |
| `You're out of prompts` article `[documented]` | 100 / month | 1000 / month | 2000 / month | 2000 / month | not stated |
| `How many prompts do I have?` article `[documented]` | not stated | "1000 generative AI prompts per month" | not stated | not stated | not stated |

**Defects:** (a) `Premium` is quoted as a current allocation in two help articles but is not a purchasable plan on the pricing page, where the plans-page FAQ simultaneously explains how to migrate *off* Premium; (b) the help article tells a Free user hitting the wall to "Upgrade to Grammarly Premium", a plan they cannot buy; (c) the plans page qualifies the allocation as per-`member`, the homepage does not; (d) no rollover or expiry rule is stated anywhere for unused prompts.

**What is stated well** `[documented]`, and is the transferable part:

- **A definition of the unit, in the user's terms**: "A prompt is a sentence or phrase that is used to initiate a response or action from Grammarly's generative AI. It can be a question, statement, or command."
- **A definition of the consumption event**: "Each time you enter something in the prompt field or use a provided suggestion like 'Improve it,' you use one of your allocated generative AI prompts." This closes the gap most metered AI products leave open — that clicking a preset button also spends.
- **A size-independence statement**: "A prompt can be a few words or up to several paragraphs in length." One unit regardless of length, said plainly.
- **A non-calendar refill anchor**: the allocation refills monthly "determined by the day generative AI assistance first became available within your account" — not the calendar month, not the billing date. Stated twice, identically, on two pages.
- **A recovery path for paying users**: "If you're on a Grammarly paid plan and run out of prompts before your next refill, contact us for assistance." An explicit human escape hatch for the exhaustion state, offered only to payers.

Compared with the monday.com worked-example approach, Grammarly defines the unit and the consumption event well but never shows the arithmetic — there is no "a typical email uses N prompts" calibration anywhere public, so 2,000 remains an unanchored number.

### Trial and payment disclosure `[observed]`

Clustered on the Pro card rather than in a footnote: `Try for free` · `Email reminder 2 days before trial ends.` · `$0 payment today` · `Try for $0.00`. Three separate statements of zero cost on one card is over-insurance, but the reminder commitment is the substantive one.

Pricing shown as `$12 USD / member / month, billed annually` with `$30 when billed monthly` in bold beneath — the monthly price is displayed as the strike-comparison, so the annual commitment is the default frame. The homepage toggle labels are `Monthly` / `Yearly` with the badge `Save up to 60%`; `up to` is the hedge, and the 60% figure does not reconcile with the 12/30 pair shown (which is 60% exactly), so the hedge appears to be covering other plan pairs not displayed.

### AI disclosure, user agency and content policy `[observed]`

Grammarly's responsible-AI page organises around five named pillars, given verbatim as: `transparency, fairness, user agency, accountability, and privacy and security`.

The four principle headings are gerund-led: `Innovating to serve the needs of people` · `Developing a product with intention` · `Safeguarding user data and trust` · `Ensuring user autonomy`.

The user-agency section is the one that bears directly on inline coaching: "We give users the context to choose whether to accept or reject a suggestion, and users can always choose to turn off various AI features." Repeated almost verbatim in two FAQ answers. The explicit claim is that **the explanation exists to enable refusal**, not to drive acceptance — which is the opposite of how suggestion tooltips are usually justified, and is the single most quotable line for a content designer arguing for explanation copy.

**Negative commitments, stated as promises** `[observed]`: "We do not sell or monetize user content, or provide it for advertising purposes, or allow our third party service providers to train their models on user content." Deployed on the homepage, not buried in the privacy policy. The section heading `Promising to never sell user data` uses the verb `Promising`, which is a stronger and more legally exposed word than the usual "commitment to".

**Harmful-content reporting is given a physical location** `[observed]`: "please report them by clicking the flag in the lower-right corner of the Grammarly window." A policy page that tells you which corner of the UI to click is doing content design, not legal drafting.

**Academic-integrity disclosure** `[observed]` — the education paragraph stops short of a rule and delegates: institutions "can help clarify the role of AI-enabled technology in their classrooms, and students should maintain their commitment to academic integrity." Grammarly names the tools it supplies for disclosure (`AI detector`, `Authorship report`) but declines to state a policy. Defensible, and worth noting as the position a vendor takes when its product is the contested object.

**AI limitations named** `[observed]`: `AI hallucinations`, misinformation, bias, security and privacy risks — enumerated in an FAQ answer on the company's own marketing site, with a link out to an explainer on hallucinations.

**Signup consent** `[observed]` — no checkbox; a declarative line under the button: "By signing up, you agree to the Terms and Conditions and Privacy Policy." Followed by a separate California line: "California residents, see our CA Notice at Collection." **Defect:** the phrase `Terms and Conditions` is split across two adjacent links (`Terms and` / `Conditions`) pointing at the same URL, which produces two focusable link stops and two fragmentary announcements for a screen-reader user. That CA link points at a `superhuman.com` anchor from a `grammarly.com` page while the footer's equivalent link points at a `grammarly.com` anchor — two destinations for one notice.

**Accessibility commitment with a response SLA** `[observed]`: "We aim to respond to accessibility feedback within 5 business days and to propose a solution within 14 business days." A named mailbox (`accessibility@grammarly.com`) and two numbers. Rare and worth copying.

## T11 Help-centre architecture

Three levels: **6 categories → named sections → articles**, Zendesk-standard.

**Routing furniture** `[observed]`: the search prompt is `Hi! How can we help?` — greeting plus first-person-plural offer, with the exclamation mark carried over from the onboarding register. Four `FEATURED ARTICLES` sit above the category grid, each annotated with its breadcrumb path (e.g. `Account Basics` / `Sign-in Help`), so the user sees where an answer lives before clicking. That breadcrumb-on-the-card treatment teaches the IA while answering the question.

Contact is last and doubled: `Can't find your answer? Contact us` and then a longer restatement, "Can't find your answer? Please use our contact form and we will help you as soon as possible." The duplication is likely a responsive-variant artefact.

**Featured-article selection is revealing** `[observed]` — three of four featured articles are failure or privacy articles (`Privacy and security FAQs`, `Problems signing in to Grammarly`, `Grammarly doesn't recognize my paid account`), with only `Get started with Grammarly` representing the happy path. The featured slot is being used as a deflection queue for the top support drivers, not as an editorial pick.

**Article-title grammar — six shapes:**

| Shape | Example |
|---|---|
| `Error message: "<verbatim string>"` | `Error message: "Can't help with this text"` |
| `I <symptom>` | `I can't activate the plagiarism checker` |
| `Grammarly <misbehaves>` | `Grammarly logs me out` |
| `How do I / How to <task>` | `How to install Grammarly for Android` |
| `Introducing <feature>` | `Introducing paragraph-level rewrites` |
| `<Product> user guide` | `Grammarly for iPad user guide` |

`Introducing …` as a persistent help-article prefix is distinctive: seven articles carry it (`Introducing generative AI assistance`, `Introducing strategic suggestions`, `Introducing Authorship`, `Introducing Multilingual Suggestions`, `Introducing paragraph-level rewrites`, `Introducing speech-to-text`, `Introducing document sharing in docs`). Launch-announcement framing is frozen into the evergreen help IA, so articles read as new indefinitely. A maintenance liability — `Introducing generative AI assistance` describes a feature several years old.

**`user guide` as a title suffix** is used consistently for the per-surface reference article, which gives the client-shaped IA a predictable entry point.

**Eligibility notes are inline, not gated** `[documented]`: sections open with `**Available in:** …` or `**Note:** This feature is available only with Grammarly Pro, Grammarly Plus, Grammarly for Business, and Grammarly for Education.` The plan list is spelled out in full every time rather than abbreviated to "paid plans" — verbose, but it removes the "does my plan count" question at the point of doubt.

## T12 FAQs

**Placement A — pricing page**, under `Frequently Asked Questions`, four questions, each an anchor link.

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What will happen to my Premium subscription if I switch to Pro? | Switching cancels Premium and refunds pro rata; Pro contains everything Premium had plus former Business team features. Leads with the cancellation, then the refund, then the reassurance. |
| 2 | How secure is Grammarly? | Two sentences: a general claim with a link out to the security page, then the SOC 2 (Type 2) attestation named with its four trust criteria. |
| 3 | What forms of payment do you accept? | Card brands enumerated, PayPal named, invoicing gated at 10+ members on annual, invoice rails listed, then a `Note:` carve-out that PayPal cannot pay invoices. |
| 4 | Do you offer discounts for educational institutions? | `Yes!` then a link. Two words of substance. |

Ordering is migration → trust → payment → discount. Q1 exists purely to service a plan-rename migration, which dates the block and confirms the FAQ is being used as a change-management surface. Q3 is the best-structured answer on the page: it states the rule, then the exception, in a visually separated `Note:`.

**Placement B — Responsible AI page**, nine questions, accordion, answers present in the served markup.

| # | Question (verbatim) |
|---|---|
| 1 | What is Grammarly's AI? |
| 2 | What key principles guide Grammarly's responsible AI development, and how were they formed? |
| 3 | What process does Grammarly use to evaluate the risks associated with developing AI features? |
| 4 | What are ways in which Grammarly fosters user agency? |
| 5 | What is Grammarly's approach to embracing accountability in responsible AI development? |
| 6 | What are ways in which Grammarly preserves privacy and security? |
| 7 | What actions is Grammarly taking to assess and mitigate bias in its generative AI models to avoid potential harm, ensure fairness and equity, and promote responsible and ethical use? |
| 8 | What are the potential limitations of generative AI systems? |
| 9 | How can I customize my user experience and AI recommendations, report issues, or turn off specific features? |

**Structural note.** Eight of nine are third-person questions *about* Grammarly, phrased as a procurement questionnaire would phrase them (`What process does Grammarly use to …`), not as a user would ask. Q7 runs to 32 words. Only Q9 is in the second person and only Q9 is actionable — and it is placed last. This block is written for an enterprise buyer's AI-governance review, wearing an FAQ's clothes.

Seven of the nine answers end with the same call to download the same white paper. That repetition is the tell: the FAQ is a lead-generation funnel for a gated asset.

Q9's answer is nonetheless the most useful content on the page, because it is structured as three bolded sub-headings (`Customize your experience`, `Report issues and feedback`, `Turn off specific features`) with a deep link for each — the only place the off-switch path is spelled out.

## T13 Terminology & glossary

### The suggestion-category vocabulary — the flagged strength

`[documented]`, stated once, in the Get started article:

> "Our suggestions are split into four categories: correctness, clarity, engagement, and delivery."

The four names, verbatim and in Grammarly's order: **`correctness` · `clarity` · `engagement` · `delivery`**. They are current as of this harvest. A fifth, unnamed band exists for team style guides, surfaced as `gray underlines`.

Analysis of the naming scheme, which is the transferable artefact:

- All four are **abstract nouns naming a property of the writing**, never of the error. Not "Grammar", not "Mistakes", not "Spelling" — `correctness` absorbs all of those into a single quality dimension. The user is being told what their text could *be*, not what they got wrong.
- The four are ordered **by rising subjectivity and falling objectivity**: `correctness` is checkable against a rule, `clarity` against a reader, `engagement` against a reader's attention, `delivery` against a reader's feelings. That ordering is also the confidence ordering, and it is the order the categories appear in every listing.
- `delivery` is the coinage doing the most work. It names tone, formality and politeness without using the word "tone" (which Grammarly reserves for the separate `Tone suggestions` and `Tone detector` features) and without moralising.
- **They are written in lower case in help prose** but function as proper product nouns elsewhere. No public page inspected renders them as a capitalised set, and no public page maps them to the four underline colours.

**Defect:** the four underline colours (`red, blue, green, or purple`) and the four category names are documented in two different articles and never joined. A user who sees a purple underline has no public route to learning what purple means. For a product whose entire proposition is explaining its suggestions, the colour legend being absent from public documentation is a notable miss.

### The suggestion-card explanation grammar `[documented]`

The card exposes five controls, and the split between them is the design lesson:

| Control | Function |
|---|---|
| `Accept` | Applies the change; "Grammarly will apply it automatically to your text" |
| `Dismiss` | The refusal verb. Not "Ignore", not "No thanks", not an ✕ |
| `Learn more` | "see a detailed explanation behind each suggestion" — the persuasion layer, **behind a click** |
| `More Actions` | Two different menus depending on card position: upper = "flag the suggestion as incorrect or offensive"; lower = `Turn off suggestions like this` |
| `Add to dictionary` | Teaches the system rather than dismissing the instance |

The architecture is a graduated refusal ladder: reject once (`Dismiss`) → reject this word forever (`Add to dictionary`) → reject this rule forever (`Turn off suggestions like this`) → report the rule as wrong (`flag … as incorrect or offensive`). Four distinct strengths of "no", each with its own label and its own scope. Most products ship one.

Note that the explanation is **not** shown by default — the card leads with the fix and hides the rationale behind `Learn more`. Grammarly's stated philosophy (explanations enable informed refusal) and its implemented default (fix first, reason on demand) are in tension. Honest finding: the coaching is opt-in.

**`Dismiss` over `Ignore`** is the single best word choice in the set. `Ignore` frames the user as negligent; `Dismiss` frames them as the authority ruling on a submission.

### Product and plan terminology

| Term | Grammarly's usage | The alternative it rejected |
|---|---|---|
| `suggestion` | The universal unit; never "error", never "correction", never "issue" in user-facing copy | "error", "mistake", "problem" |
| `writing issue` | Used once, only in the Editor guide's system-side description of detection | |
| `prompt` | The billable unit *and* the input; one word for both | "credit", "generation", "request" |
| `prompt refill` | The monthly reset event | "renewal", "reset", "top-up" |
| `Goals` | Pre-writing configuration of audience and intent | "Settings", "Preferences" |
| `Domains` | A goal axis, paid-gated | "Genre", "Document type" |
| `Overall score` | The document-level quality number | "Grade", "Rating" |
| `personal dictionary` | The user's word allowlist | "custom dictionary", "exceptions" |
| `Authorship` | The provenance-reporting feature | "AI disclosure", "provenance" |
| `Humanizer agent` / `AI Detector agent` | `agent` as a product-noun suffix | "tool", "feature" |
| `strategic suggestions` | A paid suggestion tier, described as "increase the impact of your text" | |
| `Inline Intelligence` | A named Superhuman Go capability | |
| `Knowledge Share` / `Snippets` | Team reuse features | "templates", "canned responses" |
| `Brand Tones` / `Style guide` | Org-level constraint objects | |
| `product offerings` | The internal term for clients/platforms, which leaks into help copy repeatedly: "Grammarly's product offerings" | "apps", "platforms", "integrations" |
| `Effective Communication Score` | Enterprise analytics metric | |

**`product offerings` is the clearest register leak.** It appears at least six times across help articles where "apps" would read naturally. It is procurement vocabulary in a consumer help centre.

**Plan-name sprawl is the terminology defect.** Nine plan names are live across the pages inspected: `Free`, `Pro`, `Enterprise`, `Premium`, `Plus`, `Grammarly for Business`, `Grammarly Business`, `Grammarly for Education`, `Teams & businesses`. Only three are sold. The homepage Enterprise card reads `Everything in Plus, and more` while the plans-page Enterprise card reads `Everything in Pro, plus:` — the homepage references a tier it does not display, and the word `plus` appears as both a plan name and a connective in the same sentence pattern.

**The Superhuman transition is visible and unfinished** `[observed]`: the marketing footer reads `2026 © Superhuman Platform`, the help-centre footer reads `© Grammarly Inc.`, and the help IA now carries paired articles like `How to use Grammarly and Superhuman Go for Windows and Mac together` — a help article whose existence is a product-architecture confession.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout, first-person plural for the company, and the company is a visible actor in both good and bad news: "We do not sell", "we filter", "we get better", "we have been notified", "We promise to act on your feedback". No passive-voice hiding in the responsible-AI copy. The one conspicuous passive is in an error string (`A small error has occurred`), where it is doing exactly the concealing work the rest of the copy avoids.

**Register gradient — inverted relative to Wise.** Grammarly's *help centre* is warmer than its marketing ("Welcome!", "Hi! How can we help?", "embark on your writing journey"), while the hero is cool and declarative. Interjections (`Hmm`, `Whoops!`, `Darn`) appear only in generative-AI and mobile error states — the lowest-stakes, most-clearly-system-fault failures. They are absent from billing, security, plan, and consent copy. So the gradient exists and is correctly signed, but the baseline is set by surface rather than by stakes.

**Contractions** used freely and inconsistently: `don't`, `you'll`, `we're`, `It's free`, alongside `do not` and `I do not see` in adjacent contexts. No enforced policy.

**Exclamation marks** are rationed to five observed instances: `Welcome!`, `Hi! How can we help?`, `Yes!` (education discount FAQ), `Whoops!` (error), `Thanks for your patience!` (incident). None in pricing, none in disclosures.

**Accessibility content** `[observed]`

The published statement is unusually concrete for the genre. Rather than asserting a WCAG conformance level, it enumerates six process commitments, and three of them are about *people* rather than code: "Include people with disabilities in our design personas", "Include people with disabilities in our research and user testing", "Include accessibility within our 'definition of done' processes for work". Naming the definition-of-done is an engineering-process commitment that can actually be audited internally.

It also publishes a **per-platform assistive-technology compatibility matrix** — web and extensions against Firefox/NVDA, Chrome/JAWS, Safari/VoiceOver; desktop against NVDA/JAWS/VoiceOver; iOS against `VoiceOver in Keyboard and Editor`, `VoiceControl in Keyboard and Editor`, `Full Keyboard Access in Editor`. The iOS entries scope the support claim to specific surfaces, which is more honest than a blanket claim and more useful to a user deciding whether to buy.

**Notable omission:** the statement never names a conformance target (no WCAG 2.1 AA, no Section 508, no EN 301 549) and never links a VPAT or accessibility conformance report. It states measures and technologies (`HTML`, `WAI-ARIA`, `CSS`, `JavaScript`) "relied upon for conformance with the accessibility standards used" — a sentence that refers to standards without ever naming them. That circularity is the statement's main weakness.

**In-product accessibility affordances** `[documented]`: two dedicated help articles, `Can I use screen readers with the Grammarly Editor?` and `Can I use my keyboard to navigate the Grammarly Editor?`, both phrased as the user's yes/no question. `Activate the colorblind mode` sits in the ordinary editor settings list. Colourblind mode matters disproportionately here because, as noted in T13, **suggestion category is encoded primarily in underline colour** — so the mode is not a nicety but the alternative channel for the product's core signal. Neither the mode's behaviour nor the colour legend is described publicly.

**Alt text** `[observed]`. Quality is mixed but the good examples are very good — the homepage videos carry full scene-and-purpose descriptions rather than labels: "An animation of Grammarly's product shows an example of rephrased text where typos from the original text are fixed, and the sentence is made more concise." and "An animation shows Grammarly within a Zendesk text box providing suggestions to follow the brand style guide, and achieve a more confident tone." These describe what the demo *demonstrates*, not what is on screen, which is the right call for a product animation.

Against that:
- Customer-logo images use the bare brand name as alt (`Zoom`, `Databricks`) — acceptable.
- **Defect:** on the plans page, the testimonial headshots and customer logos carry the alt text `Feature is unavailable`. The comparison-table cell icon's alt string has been applied to unrelated images, so a screen-reader user hears `Feature is unavailable` announced beside each customer quote. This is a clear, reportable bug and the most concrete accessibility failure found.
- Help-centre article screenshots use raw filenames as alt (`Screenshot 2024-02-01 at 17.07.22.png`, `Screenshot 2024-02-02 at 12.54.03 AM.png`), and several inline icon images in the Editor guide carry empty alt while being the *only* identifier of the control being described — the sentence "Click **More Actions** (icon)" degrades acceptably because the label precedes it, but "Click **Add to dictionary** (icon)" has the same pattern with no fallback if the label is missed.
- `Harmful content product animation` as the alt for a video on the responsible-AI page is a filename-grade label on the page that most needs comprehension.

**Negative findings, recorded honestly**

- `Log in` (marketing) vs `Sign in` (help centre) for one action.
- `Create Account` vs `Create account` for one button across two pages.
- `Try for free` and `Try for $0.00` stacked as two CTAs for one action.
- `Get Started` vs `Get started` in adjacent help sections.
- `Hm, something went wrong` and `Something went wrong` as two separate documented errors.
- `Learn` used as a sub-nav group label in two different top-level menus with different contents.
- Prompt allocations disagree across three pages; `Premium` quoted as current in help, unsellable in pricing.
- Enterprise card says `Everything in Plus` on a page with no Plus tier.
- `Terms and Conditions` split across two links to one URL.
- `Feature is unavailable` as alt text on customer photographs.
- Underline colours documented; colour-to-category legend absent.
- `Introducing …` prefix frozen on multi-year-old features.
- Statuspage boilerplate (`Resolved - This incident has been resolved.`) left unedited beneath carefully written incident copy.

---

## Transferable patterns

1. **Name the quality, not the defect.** `correctness / clarity / engagement / delivery` are all properties the writing could have, ordered from objective to subjective. Nothing in the taxonomy names an error. Any product that critiques user work — code review, design lint, compliance check, KYC document review — can borrow the substitution wholesale. Condition: it only works if the categories are genuinely graded by confidence, because the user will calibrate trust per category.
2. **Build a graduated refusal ladder, not a dismiss button.** `Dismiss` (this instance) → `Add to dictionary` (this token, forever) → `Turn off suggestions like this` (this rule, forever) → `flag as incorrect or offensive` (this rule is wrong). Four scopes of "no", separately labelled. Directly transferable to PayPal risk-flag and fraud-alert surfaces, where "not fraud" currently collapses several different user intents into one control.
3. **`Dismiss`, never `Ignore`.** `Ignore` casts the user as negligent; `Dismiss` casts them as the deciding authority. A one-word change that reassigns who is in charge of the judgement.
4. **Publish the verbatim error string as the help-article title.** `Error message: "You're out of prompts"` makes copy-paste search work and forces the error inventory to be maintained as content. The cost is that the whole error inventory becomes public; the benefit is deflection at the exact moment of failure.
5. **Define the billable unit *and* the consumption event.** "Each time you enter something in the prompt field **or use a provided suggestion like 'Improve it'**, you use one of your allocated prompts" closes the gap every metered AI product leaves open — that the one-click preset also spends. Condition: it must then be kept consistent across pricing, help, and error copy, which is exactly where Grammarly fails.
6. **Pre-commit to the trial reminder inside the purchase card.** `Email reminder 2 days before trial ends.` stated next to `$0 payment today` removes the standard free-trial anxiety at the point of decision rather than in a confirmation email.
7. **Field label as the first half of the user's sentence.** `I write in` [dropdown] beats "Language preference". Works anywhere a setting is a statement about the user rather than a system parameter.
8. **Constraints inside onboarding, not in a spec page.** "Grammarly is cloud-based software and cannot be used offline" placed in the install step means the user meets the limitation before it bites.
9. **Accessibility statements should commit to a response time.** Five business days to respond, fourteen to propose a solution, plus a named mailbox. Two numbers make the commitment testable. Counter-lesson from the same page: do not describe "the accessibility standards used" without naming one.

## Caveats & gaps

- **The suggestion card was never observed.** Every string in the inline-coaching analysis (`Accept`, `Dismiss`, `Learn more`, `Turn off suggestions like this`, the underline colours) is `[documented]` from the Editor user guide. The actual explanation text inside `Learn more` — the persuasive copy that is Grammarly's flagged strength — is **not reproduced on any public page** and could not be captured. An authenticated pass is required to harvest even one real explanation body. This is the single largest gap in the file.
- **The colour-to-category legend is absent publicly**, so which of red/blue/green/purple maps to which of correctness/clarity/engagement/delivery is unknown and was deliberately not guessed.
- **Goal-setting vocabulary is largely absent.** Only `Goals`, `Done`, and `Domains` were documented. The audience/formality/intent option values that constitute the goal-setting copy are behind auth.
- **Three pages could not be retrieved** after repeated attempts, each aborting on timeout: `https://www.grammarly.com/tone`, `https://support.grammarly.com/hc/en-us/categories/115000018591-Billing-Subscription`, and `https://support.grammarly.com/hc/en-us/articles/25351804320397-Introducing-strategic-suggestions`. No alternative retrieval route was attempted. Billing/refund/cancellation language is therefore thin in T10, and `strategic suggestions` is described only from its one-line mention in the Editor guide.
- **The Superhuman merger makes plan and product naming a moving target.** Copy harvested on 2026-09-21 spans at least two naming regimes. Any Grammarly string cited from this file should be re-verified before use as precedent.
- **Pricing observed in USD on a US-defaulted session only.** No other locale was checked; the `$12`/`$30` pair and the `Save up to 60%` badge may not hold elsewhere.
- **Mobile app copy not harvested** beyond help-article titles.
- **Help-article bodies opened selectively** — five of roughly two hundred visible titles. Title-level analysis is high-signal for IA and error inventory but says nothing about answer structure in the articles not opened.

## Sources

1. https://www.grammarly.com/
2. https://www.grammarly.com/plans
3. https://support.grammarly.com/hc/en-us
4. https://support.grammarly.com/hc/en-us/articles/19812297751053-Get-started-with-Grammarly
5. https://support.grammarly.com/hc/en-us/categories/115000018631-Tips-Tutorials
6. https://support.grammarly.com/hc/en-us/categories/115000018072-Resolve-Issues
7. https://support.grammarly.com/hc/en-us/articles/360003474732-Grammarly-Editor-user-guide
8. https://support.grammarly.com/hc/en-us/articles/14528857014285-Introducing-generative-AI-assistance
9. https://support.grammarly.com/hc/en-us/articles/17775763102989-How-many-generative-AI-prompts-do-I-have
10. https://support.grammarly.com/hc/en-us/articles/17776038294285-Error-message-You-re-out-of-prompts
11. https://support.grammarly.com/hc/en-us/articles/10674801783309-How-do-Grammarly-s-tone-suggestions-work
12. https://www.grammarly.com/ai/responsible-ai
13. https://www.grammarly.com/accessibility-statement
14. https://status.grammarly.com/
