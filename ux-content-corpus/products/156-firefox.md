# 156. Firefox

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Web browser (non-profit, privacy-led) |
| Primary URL | https://www.mozilla.org/firefox/ (302 → https://www.firefox.com/en-US/) |
| Corpus rank | 156 |
| Benchmark strength (source list) | Privacy and permission communication |
| Locale / market observed | en-US |
| Platform observed | Web (marketing: firefox.com; corporate/legal: mozilla.org; help: support.mozilla.org) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR / UK GDPR (named lawful bases per purpose, DPO in Brussels, EU SCCs for transfers, EDPB authority routing); CCPA/CPRA and named US state regimes (California, Colorado, Connecticut, Nevada, Utah, Virginia) via Global Privacy Control as a "Do Not Sell" mechanism; WCAG 2.2 + Revised Section 508 via a published VPAT 2.5 Accessibility Conformance Report |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 (2 blocked) |
| Harvest completeness | Partial — marketing, privacy-notice, permission, help-IA and content-style-guide layers all captured richly. Two URLs returned empty or aborted (`protocol.mozilla.org` copy-guidelines path; `support.mozilla.org/kb/site-permissions-panel`). All in-product chrome strings are `[documented]` from help articles, never observed live, since the browser UI is not a web surface. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Primary marketing (redirect target) | https://www.firefox.com/en-US/ | Hero, four-pillar value grid, switching steps, newsletter form, cookie banner |
| Data-protection explainer | https://www.firefox.com/en-US/user-privacy/ | Five-section privacy narrative with in-page anchor nav; the "plain-language layer" above the legal notice |
| Firefox Privacy Notice | https://www.mozilla.org/en-US/privacy/firefox/ | Two-part document: marketing "basics" preamble + formal notice with data-definitions and lawful-bases tables |
| Mozilla Privacy Policy (umbrella) | https://www.mozilla.org/en-US/privacy/ | Question-headed policy; index of eight product notices |
| Data Privacy Principles | https://www.mozilla.org/en-US/privacy/principles/ | Five named principles — the naming artefact |
| Enhanced Tracking Protection (desktop) | https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop | Standard/Strict/Custom vocabulary, shield states, blocked/allowed/none-detected panel labels |
| Camera & microphone permissions | https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions | Permission-prompt button labels and the four-state permission vocabulary |
| Permissions Manager (deprecated article) | https://support.mozilla.org/en-US/kb/permissions-manager-give-ability-store-passwords-set-cookies-more | Older permission-type naming; carries a staleness banner |
| Firefox help centre index | https://support.mozilla.org/en-US/products/firefox | 12 topic cards with article counts; featured-article block |
| SUMO Knowledge Base writing guide | https://support.mozilla.org/en-US/kb/writing-guide-knowledge-base-articles | Published content style guide — tone, title rules, copy rules, article typology |
| Accessibility features in Firefox | https://support.mozilla.org/en-US/kb/accessibility-features-firefox | Accessibility feature inventory + ACR/VPAT disclosure |
| Community Participation Guidelines v3.1 | https://www.mozilla.org/en-US/about/governance/policies/participation/ | Code of conduct; expected/prohibited behaviour structure |
| *Blocked* | https://protocol.mozilla.org/docs/fundamentals/copy-guidelines | Returned empty body |
| *Blocked* | https://support.mozilla.org/en-US/kb/site-permissions-panel | Fetch aborted twice |

---

## T1 Navigation & IA labels

**Marketing nav — three groups, and the privacy page is filed under "Resources"** `[observed]`

`Browser` · `Features` · `Resources`, plus a persistent `Get Firefox` button.

| Group | Children (verbatim) |
|---|---|
| `Browser` | `Mobile` · `Enterprise` · `What's New` · `What's Next` · `Extensions & Themes` · `Support` · `Download Firefox` |
| `Features` | `Protection` · `Control` · `Focus` · `About Firefox features` · `View all Firefox Features` |
| `Resources` | `Data Protection` · `Blog` · `Podcast` · `Newsletter` · `Release Notes` |

Two things worth recording. First, the three feature children — `Protection`, `Control`, `Focus` — are **abstract single nouns**, not features. They are the same three concepts the homepage hero grid uses, so the nav labels and the value-prop labels are the same three words. Second, the privacy explainer is labelled `Data Protection` in the nav but titled `How Firefox Protects Your Data` on the page and `How Firefox protects your data` as the homepage CTA — **three different strings for one destination** (firefox.com nav, `/user-privacy/` H1, homepage CTA). A mild but real inconsistency in the highest-stakes content area.

**`What's New` vs `What's Next`** `[observed]` — adjacent nav items differing by one letter. Findable-by-sight only; a genuine discriminability defect.

**Footer groupings** `[observed]`: `Download` · `Latest Builds` · `Firefox for Business` · `Community` · `Resources` · `Follow Us`, then a legal strip: `Website Privacy Notice` · `Terms of Use` · `Cookie Policy` · `Community Participation Guidelines` · `Logo Trademark Licensing`. Note `Community Participation Guidelines` — a code of conduct — sits in the **product** footer, not just a community site. The footer also carries `Powered by Mozilla` and `Ask us a question!`.

**Help centre IA — twelve topic cards, each with an article count** `[observed]`

`Backup, recovery, and sync` (10) · `Browse` (104) · `Performance and connectivity` (59) ·
`Accessibility` (6) · `Download and save` (4) · `Search, tag, and share` (15) ·
`Installation and updates` (39) · `Settings` (144) · `Privacy and security` (98) ·
`Passwords and sign in` (27) · `Accounts` (20) · `Artificial Intelligence (AI)` (12)

The grammar is mixed on purpose and inconsistently: some are **gerund-free noun pairs** (`Installation and updates`, `Passwords and sign in`), one is a bare verb (`Browse`), one is a serial triple (`Search, tag, and share`), and `Accessibility` is a single abstract noun. Note that `Search, tag, and share` and `Backup, recovery, and sync` use the **serial comma** — which the site's own published style guide explicitly forbids ("Don't use serial commas in a list of items"). A documented rule violated by the IA it governs.

`Artificial Intelligence (AI)` is spelled out with the initialism in parentheses — the only expanded-plus-abbreviation topic label, and a signal that the term was considered unfamiliar enough to gloss.

**Article-count transparency** `[observed]` — each card ends `View All N articles`. Exposing the count pre-click is an unusual and useful routing signal: `Settings` (144) tells the user this is the deep bucket before they commit.

**Cross-surface nav mismatch** `[observed]` — support.mozilla.org's own nav is a separate IA: `Explore Help Articles` · `Community Forums` · `Ask a Question` · `Contribute`, each expanding to a product list *and* a topic list. The topic list there is only six items (`Settings`, `Installation and updates`, `Email and messaging`, `Performance and connectivity`, `Privacy and security`, `Browse`) — a **six-topic global taxonomy sitting over a twelve-topic per-product taxonomy**. Two coexisting topic vocabularies.

**Breadcrumbs** `[observed]`: `Home > Firefox > Privacy and security > Enhanced Tracking Protection in...` — truncated with an ellipsis at the leaf, so the current page is the only unreadable crumb.

## T2 Value proposition & headline patterns

**Hero — a mission statement, not a feature claim** `[observed]`

> Headline: `Find your way back to a better internet`
> Subhead: "The web was meant to expand your world, not limit it. Firefox helps you shape a more personal internet that puts you back in control."

This is the notable choice. A browser could headline speed, privacy, or compatibility; Firefox headlines **a recovery narrative** — "back to", "back in control". The subhead's structure is *was meant to X, not Y* — an appeal to a prior, better state. No product noun appears until the second sentence.

**Four-pillar grid — eyebrow label, then a claim, then a mechanism-or-negation** `[observed]`

| Eyebrow (caps) | Heading | Body |
|---|---|---|
| `PRIVACY` | `Privacy as a standard` | "Blocks trackers automatically. No setup. No guesswork." |
| `FOCUS` | `Focus without distraction` | "Stay focused with tab groups, reader mode, and videos that stay in view." |
| `CHOICE` | `Control and choice built in` | "Customize how AI shows up, or turn it off entirely." |
| `Independence` | `Not owned by shareholders` | "We don't sell your personal data and we never will." |

The fourth pillar is the transferable one: the heading is a **negative claim about corporate structure** (`Not owned by shareholders`) used as a product benefit. And the body is a promise with a tense extension — "and we never will" — which converts a current-state disclosure into a forward commitment. Note the eyebrow casing breaks on the fourth (`Independence` in title case where the other three are uppercase) — a small defect.

**Section headers escalate from function to ideology** `[observed]`

`Fast to switch. Easy to settle in.` → `Privacy without the work` →
`All your stuff on desktop, mobile, and tablet` → `Built to benefit billions, not billionaires` →
`Stay focused without distractions` → `Your workspace, your rules` →
`AI, if and when you want it` → `Firefox protects your data`

`Built to benefit billions, not billionaires` is the alliterative-antithesis pattern; `AI, if and when you want it` is a **conditional-clause headline** that makes optionality the headline rather than a footnote. `Privacy without the work` names the cost the user is avoiding rather than the benefit they're getting.

**Two-sentence privacy pattern: negate the norm, then assert the exception** `[observed]` — used identically on the `/user-privacy/` page and inside the Privacy Notice:

> "Unlike many other browsers where sensitive user data is routinely collected and stored, Firefox is built on the principle that not even Mozilla should know which websites you visit or what you do there."

"not even Mozilla" is the load-bearing phrase — the company names **itself** as the party excluded. Compare the weaker generic "we don't track you".

**The four-line opening of both the explainer page and the Privacy Notice is identical** `[observed]`:
"Here's the big picture: Firefox is built with privacy and protection as the default. We don't know that much about you. What little we do know, we never sell." Deliberate single-sourcing of the top-line privacy promise across a marketing page and a legal document — the same words in both registers. That is rare and worth copying: **one canonical sentence set for the highest-stakes claim.**

"We don't know that much about you" is unusually casual and self-deprecating for a privacy claim; most products would write "we minimise data collection".

**Five-section anchor nav on the privacy explainer** `[observed]`:
`Privacy Online` · `Tracking Protection` · `Control Your Data` · `Advertising` · `Built Different`

Section headings under those anchors are all **second-person declaratives ending in a full stop**: `Your privacy always comes first.` · `You're automatically protected.` · `You're in control.` · `Ads? Totally up to you.` · `Privacy is a team effort.` — plus a closing `Private browsing that goes above and beyond.` The sentence-per-heading with terminal punctuation is a consistent house pattern.

`Ads? Totally up to you.` — a question-fragment heading on the page's most adversarial topic, softening the introduction of advertising into a privacy narrative.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Download Firefox` | Hero, repeated blocks, footer | Primary; the modal label |
| `Get Firefox` | Sticky nav button (desktop + mobile) | **Different verb for the same action as `Download Firefox`** on the same page |
| `Get Firefox on your phone` | Nav QR-code panel | Fully specific |
| `Download Firefox ESR 64-bit` / `Download Firefox ESR 32-bit` | Unsupported-OS block | Architecture in the label |
| `Download a different build` | Unsupported-OS block | "build", a developer term, in consumer copy |
| `Custom Download Options` | Footer | Title-cased; the rest of the footer list is not |
| `How Firefox protects your data` | Homepage privacy section | CTA text = destination H1 |
| `Read the Firefox Privacy Notice` | Foot of privacy explainer | Verb `Read` rather than `View` or `Learn more` |
| `Manage Your Privacy Settings` | Foot of privacy explainer | Title case; an in-product action offered from a web page |
| `See Firefox's data collection guidelines` | Privacy explainer, §1 | Links to developer docs from a consumer page |
| `More about Enhanced Tracking Protection` | Privacy explainer, §2 | `More about X` is the house pattern |
| `More about Total Cookie Protection` | Privacy explainer, §2 | |
| `More about on-device AI models` | Privacy explainer, §3 | |
| `More about AI chatbots` | Privacy explainer, §3 | |
| `More about ads and privacy` | Privacy explainer, §4 | |
| `Get to know Gecko` | Privacy explainer, §5 | Personifies the engine |
| `Read our Privacy Notice` | Privacy Notice preamble | vs `Read the Firefox Privacy Notice` elsewhere — **two labels, one destination** |
| `Take me back to the top` | Mid-Privacy-Notice | First person, imperative-to-the-system |
| `Get back to the Firefox privacy basics` | Mid-Privacy-Notice, after "Lost in the details?" | Pre-empts reader fatigue *inside* a legal document |
| `View all Firefox Features` | Features nav | |
| `About Firefox features` | Features nav | Adjacent to the above; near-duplicate |
| `Accept All Additional Cookies` / `Reject All Additional Cookies` | Cookie banner | **Symmetrical, equal-weight pair** |
| `Cookie settings` | Cookie banner, third option | |
| `Sign up` | Newsletter form | |
| `Ask us a question!` | Footer, every page | Only exclamation mark in the footer |
| `Ask the Community` | Help centre, under `Still need help?` | Names the answerer, not the channel |
| `Continue` | Help article, under `Ask a Question` | Bare; gated behind "Sign in to ask your question" |
| `Skip to main content` / `Skip to search` / `Switch language` | Top of DOM, support.mozilla.org | Three skip links, not one |
| `Learn More` | Help centre `Volunteer` / `Join Our Community` block | The one bare `Learn More` in the set; title-cased |
| `Allow` / `Block` | Permission prompt | `[documented]` |
| `See All` | Tracking-protection panel | `[documented]` |
| `Protection settings` / `Privacy Settings` | Shield panel | `[documented]` — **the article documents both, for different versions, in the same sentence** |
| `Protections dashboard` | Shield panel | `[documented]` |
| `Report broken site` / `Report Broken Site` | Shield panel and menu | `[documented]` — casing differs by entry point in the same article |
| `Forget About This Site` | Permissions Manager | `[documented]`; the most distinctive Firefox verb — see T13 |
| `Remove Website` / `Save Changes` | Permission settings dialog | `[documented]` |
| `Copy Clean Link` | Right-click context menu | `[documented]` |

**Observations.** The `More about X` construction is used five consecutive times on one page — a disciplined, fully-specified alternative to `Learn more` that Firefox applies consistently on the privacy surface and then abandons in the help centre (`Learn More`). The `Get Firefox` / `Download Firefox` split is the clearest CTA defect: the sticky nav and the hero disagree on the verb for the single most important action on the site.

## T4 Onboarding & getting-started

**Three numbered steps for switching, each a bare imperative fragment, no punctuation** `[observed]`

1. `Download Firefox`
2. `Select what you want to bring with you`
3. `Click import`

Two notes. Step 3's `Click import` has **lowercase "import"** where it is naming a UI button — the site's own style guide says to capitalise "the name of a key on the keyboard" and to "always use terms the way they appear in the Mozilla interface", so either the button is lowercase or this is a miss. And step 2 uses `bring with you` rather than `import` or `migrate` — the plain-language choice — only for the step *before* the step that says `import`. The vocabulary shifts mid-sequence.

**The switching narrative frames migration as automatic, then contradicts itself with a three-step manual sequence** `[observed]`:

> `Fast to switch. Easy to settle in.` — "When switching to Firefox, your bookmarks, passwords, and history come with you automatically, so you can get back to browsing right away."

"come with you automatically" sits directly above a numbered list whose step 2 is `Select what you want to bring with you`. A selection step is not automatic. Recorded as a defect: **the benefit copy over-promises relative to the adjacent procedure copy.**

**A second three-item "what you get" list, not sequenced** `[observed]`

1. `Over 30,000 extensions`
2. `Thousands of light & dark mode themes`
3. `Edit PDFs directly in Firefox`

Numbered but non-sequential — a numbered list used as a feature inventory. Note `&` in item 2 against "and" elsewhere.

**Help-centre onboarding is the `Popular Searches` row, not a getting-started track** `[observed]`:
`Update Firefox` · `Profiles` · `Firefox Sync` · `Windows 10`

Exposing four pre-baked queries as the first interactive element is a **search-scaffolding** pattern: the user is shown what other people needed rather than being asked what they need. `Windows 10` is there because of the EOS banner — so the popular-search row doubles as a live-issue surface.

## T5 Form & field labels

**Newsletter form — the only substantial pre-auth form** `[observed]`

| Label / placeholder | Notes |
|---|---|
| `Your email address` | Possessive determiner rather than `Email` |
| `Select country or region` | The word "region" carries political care |
| `Select language` | |
| `Please select a country or region` | First option in the select, doubling as the validation message |
| Footer note | "Firefox Terms of Use & Privacy Policy. We will only send you Firefox-related information. You can unsubscribe at any time." |

The mozilla.org variant of the same form adds an explicit consent checkbox labelled:
> `I'm okay with Mozilla handling my info as explained in this Privacy Notice`

"I'm okay with" is an unusually colloquial consent label — first person, contraction, informal register, for a GDPR consent artefact. Compare the standard "I agree to the processing of my personal data". This is the single most quotable Mozilla form string.

**Validation messages, pre-rendered in the DOM** `[observed]`

- `Please enter a valid email address`
- `Please select a country or region`
- `Please select a language`
- `Please check at least one of the newsletter options.`
- `You must agree to the privacy notice`
- `We are sorry, but there was a problem with our system. Please try again later!`

Note the punctuation inconsistency: four have no terminal full stop, one has a full stop, one has an exclamation mark. `You must agree to the privacy notice` shifts from `Please` (polite request) to `You must` (obligation) — correctly, since it is the only one that is a legal precondition rather than a format error. That register shift is deliberate and worth copying. The system-error string is the only one that apologises, and the only one that ends in an exclamation mark — an odd pairing of apology with exclamation.

**Success state** `[observed]`: heading `Thanks!` followed by a **hedged** confirmation — the user is told they *may* have to confirm a subscription and should check their inbox or spam filter. Conditional confirmation ("you may have to") rather than a definite next step; honest about a double-opt-in it cannot predict.

**In-product form labels** `[documented]` — permission settings dialog:
`Block new requests asking to access your camera` · `Block new requests asking to access your microphone` · `Use Default` (checkbox) · `Remember this decision` (prompt checkbox) · `Always use the cursor keys to navigate within pages` · `Search for text when you start typing` · `Show trackers blocked in address bar` · `Allow pages to choose their own fonts, instead of your selections above` · `Override the colors specified by the page with your selections above` · `Do not show this dialog again`

These are **full-sentence checkbox labels that state the effect of the checked state**, including the referent ("above"). `Block new requests asking to access your camera` is long but leaves nothing to infer — contrast the common "Block camera access". The pattern: *verb + object + the condition under which it applies*.

## T6 Status & state language

**Tracking-protection shield has three named states, each with a bolded state word and a plain gloss** `[documented]`

| State | Gloss (verbatim, trimmed) |
|---|---|
| `Blocking` | "Firefox **blocked** trackers and harmful scripts on a site." |
| `Active` | "Enhanced Tracking Protection is turned **on** on a site, but Firefox **didn't block** any trackers or scripts." |
| `Inactive` | "Enhanced Tracking Protection is turned **off** on a site." |

This is the best state-vocabulary artefact in the file. `Active` vs `Blocking` distinguishes *protection is running* from *protection has caught something* — two states most products collapse into one "protected" indicator. And `Active` is explicitly defined by what did *not* happen ("didn't block any"), so the absence of a count is given meaning rather than read as failure. The recovery action is appended to the failure state only: "Open the shield and toggle the switch to turn it back on."

**Panel content has three categories, including one for the negative case** `[documented]`

| Category | Meaning |
|---|---|
| `Blocked` | "Firefox blocked these trackers and scripts." |
| `Allowed` | Trackers permitted because the site needs them to function |
| `None Detected` | "Firefox looked for these trackers and scripts, but did not find them on this site." |

`None Detected` is the priority finding for T6/T8. Rather than hiding empty categories, Firefox **lists the tracker types it searched for and found nothing** — converting an empty row into evidence of work performed. "Firefox looked for these... but did not find them" is an audit statement, not an empty state. This is directly transferable to any security, fraud, or compliance scan UI where a clean result currently renders as blank space.

**`Allowed` carries its own justification inline** `[documented]`: the gloss explains that some sites require trackers to function and that "Firefox only allows trackers and scripts needed for the site to work and blocks the rest." A state that looks like a protection failure is pre-defended at the point of display.

**Permission states — four values, with temporality as a first-class dimension** `[documented]`

`Allowed` · `Allowed Temporarily` · `Blocked` · `Blocked Temporarily`

The cross-product of decision × persistence, each rendered as a distinct label with a clearing affordance (`Click the X next to...`). Most permission UIs expose only allow/block and hide session-scope in a tooltip. Also documented: `Always Ask` as a third default value alongside `Allow` and `Block`.

**Protection-mode names — the three-tier privacy vocabulary** `[documented]`

`Standard` · `Strict` · `Custom`

Naming analysis: the default is `Standard`, not "Balanced", "Recommended", or "Basic" — it asserts that the default *is* the norm rather than a compromise. `Strict` is the escalation and is honest about cost ("You may encounter breakage on some sites when you're in **Strict**"). `Custom` is the checkbox-level escape hatch, explicitly including "turn off all protections in **Custom** by deselecting all checkboxes" — the product documents how to disable its flagship feature entirely, in the same article that sells it.

**Count-in-chrome as status** `[documented]`: "If the shield icon appears without a number, Firefox didn't find any trackers to block. If a number appears next to the shield, Firefox found and blocked trackers." Absence of a numeral is given an explicit meaning — the same discipline as `None Detected`.

**Lifecycle / support states** `[observed]`
`EOS (end of support)` glossed on first use in the site-wide banner; `no longer supported` as the user-facing phrasing; `Extended Support Release` with `ESR` in parentheses. Release channels are named states: `Nightly` · `Beta` · `Developer Edition` · `ESR` · general release.
Article freshness is itself a state: `Last updated: 3 days ago`, and a separate banner state `This article is no longer maintained, so its content might be out of date.`
Rollout state is exposed to users: `This feature is experimental and is being introduced to the Firefox user base through a progressive rollout. It may not yet be available to all users.` — a **partial-availability disclosure inside a help article**, which most products omit and which is the reason users conclude the docs are wrong.

## T7 Error, failure & recovery

**The framing is inverted from the usual: the *protection* is treated as the probable cause of the user's problem** `[documented]`

Section heading: `What to do if a site seems broken`

Note `seems broken`, not "is broken" — the hedge keeps the diagnosis open. The recovery is a three-step toggle, and critically the copy **bounds the blast radius before the user acts**: "disabling Enhanced Tracking Protection might fix the issue by allowing trackers on just that site. Enhanced Tracking Protection will still prevent trackers on other sites." Scope of the concession is stated before the action, not after. And the reversal is documented symmetrically in the same breath: "Follow the same process to turn Enhanced Tracking Protection back on."

**Breakage is explained by mechanism, then by an enumerated list of where it bites** `[documented]`

Trackers are described as hidden inside content that must therefore also be blocked, and the affected content types are listed:
`Login fields` · `Forms` · `Payments` · `Comments` · `Videos`

Ordering is roughly by user pain — login and payments first. Naming the five places a privacy feature will break a site is a deliberate expectation-setting move rather than a support deflection.

**Failure routes to a report, and the report is a named product surface** `[documented]`

`Report a broken site` → the `Report broken site` panel, with the field `URL` pre-populated from the current tab ("you can change it if you wish"), then a dropdown labelled `What's broken` in one version and `What's not working?` in another. Two labels for the same field documented side by side in a single article — an honest artefact of versioned docs, but a live inconsistency.

**Named error-page families** `[observed]`, from the help-centre featured block:
`Secure connection and security warning error pages in Firefox` — summarised as explaining *why* Firefox blocks insecure connections and what to do when a warning appears. The title-level pattern is **cause + remedy in one string**, and the summary leads with "Learn why", not "Learn how".

Other failure-shaped article titles `[observed]`:
- `Fix problems that cause images to not show`
- `Fix Firefox using too much memory or CPU resources`
- `Websites look wrong or appear differently than they should`
- `Websites say cookies are blocked - Unblock them`
- `Use Troubleshoot Mode in Firefox`
- `Disable Firefox Sync on a lost phone or tablet`

`Websites say cookies are blocked - Unblock them` is the standout: **the symptom as reported by the third party, then a hyphen, then the imperative fix.** The user's search string is the website's own error message, and the title reproduces it. `Websites look wrong or appear differently than they should` is deliberately vague-in-the-user's-words rather than technically precise — "look wrong" is what the user would type.

Note `Fix problems that cause images to not show` — a split infinitive and awkward construction ("to not show"), against the same site's style guidance to keep it short and clear. And `Troubleshoot Mode` is a documented rename (formerly Safe Mode), with the article slug still reading `diagnose-firefox-issues-using-troubleshoot-mode` — a rename that left the URL behind, exactly the situation the SUMO writing guide addresses under slug policy.

**Crash recovery is consent-gated** `[documented]`, from the Privacy Notice: the Mozilla Crash Reporter **asks** whether to send additional information, which may include the sites open at the time of the crash; users may opt in to automatic sending; iOS sends smaller reports automatically by default. The platform asymmetry is disclosed rather than smoothed over.

## T8 Empty states

**PRIORITY SECTION.** Firefox's strongest empty-state work is the deliberate refusal to leave a zero-result state blank.

**`None Detected` — an empty state written as a completed audit** `[documented]`

> "Firefox looked for these trackers and scripts, but did not find them on this site."

Three moves in one sentence: names the actor (Firefox), names the action performed (looked for), names the negative result (did not find them), and scopes it (on this site). The category header is the two-word `None Detected` and the body is the justification. Contrast the default industry string "No trackers found", which is ambiguous between *nothing here* and *we didn't check*.

**The no-number shield — an empty state expressed as a missing glyph, then explained in prose** `[documented]`

> "If the shield icon appears without a number, Firefox didn't find any trackers to block."

Firefox ships an empty state that has **no visible copy at all** — the absence of a badge — and then documents its meaning in the help centre. Recorded as a mixed finding: the semantic is well-specified in docs, but the in-product state is unlabelled and its meaning is not discoverable in the UI. A user who has never read the article cannot distinguish "no trackers" from "protection off" without opening the panel.

**`Active` as a named zero-count state** `[documented]` — see T6. The product gives the empty case its own state name rather than reusing the populated one.

**The article-count IA as an anti-empty-state** `[observed]` — every help topic card shows a count (`View All 4 articles` for `Download and save`). The thinnest category in the help centre still renders as a number rather than as a sparse-looking list.

**Search no-results copy** `[absent]` — the help-centre search field was not exercised with a query, so the zero-result string was not captured. This is the one obvious gap in the priority section and would need a live search pass.

**First-run / new-tab empty states** `[absent]` — behind the browser chrome, not a web surface.

## T9 Notifications & system messages

**Site-wide persistent banner, carrying a third-party lifecycle event with a date** `[observed]`

> "Windows 10 reached EOS (end of support) on October 14, 2025. If you are on Windows 10, see this article."

Structure: *third party's event + exact date* → *conditional self-identification* → *route*. The initialism is glossed inline on first use. The conditional "If you are on Windows 10" lets 90% of readers dismiss it in three words.

**OS-conditional download blocks as inline notification** `[observed]`

> "**Firefox is no longer supported on Windows 8.1 and below.** Please download Firefox ESR (Extended Support Release) to use Firefox."

Two variants ship on the same page, one for Windows and one for macOS 10.14 and below. Both **hyperlink the phrase "no longer supported"** rather than appending a "learn more" — the explanation is attached to the words that would prompt the question. The remedy is stated as a `Please` request plus three concrete download buttons.

**Cookie consent banner** `[observed]`

> Heading: `Help us improve your Mozilla experience` (and `Help us improve your firefox.com experience` on firefox.com)
> Body: "In addition to Cookies necessary for this site to function, we'd like your permission to set some additional Cookies to better understand your browsing needs and improve your experience. Rest assured — we value your privacy."
> Actions: `Accept All Additional Cookies` · `Reject All Additional Cookies` · `Cookie settings`

Analysis. The accept/reject pair is **lexically and visually symmetrical** — same length, same construction, same prominence — which is the GDPR-compliant pattern most sites violate with a grey "Manage" link beside a coloured "Accept all". The word `Additional` appears in both buttons, correctly scoping the choice to non-essential cookies only and implicitly conceding that necessary cookies are not up for negotiation. "Rest assured — we value your privacy" is the weak line: reassurance without content, in a banner whose entire purpose is to ask for something. Capital-C `Cookies` mid-sentence is inconsistent with the same organisation's style guidance on capitalisation.

**Feedback micro-prompt on every help article** `[observed]`

> `Was this article helpful?` → `Yes👍` / `No👎`

Emoji baked into the button labels — the only emoji in the corpus of Firefox strings observed. Adjacent: `81% of users voted this helpful` / `67% of users voted this helpful` / `36% of users voted this helpful`. Publishing the helpfulness score, including a 36% one on the accessibility article, is a genuinely unusual transparency decision — the product shows the user that the page they are on is widely considered unhelpful.

**In-product messaging is disclosed as a data practice** `[documented]` — the Privacy Notice's `To communicate with you` section names `in-product messaging` as a channel alongside email, research invitations and support replies, and states that interaction data on those communications is processed to understand who received service announcements. Treating the notification channel itself as a disclosed data flow is good practice.

**Shield animation as a notification** `[documented]` — first visit to a site in a session, the shield "briefly animates and expands to show the number of trackers blocked", once per site per session, and is disableable via `Show trackers blocked in address bar`. A **rate-limited, per-session, user-suppressible ambient notification** with the suppression path documented in the same article, including a note that suppressing the animation does not suppress the protection.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** This is among the strongest disclosure sets in the corpus.

### The two-layer Privacy Notice

The page at `/privacy/firefox/` is **one URL containing two documents with two registers**, joined by explicit bidirectional links:

- **Layer 1 — "Firefox privacy basics."** Marketing register. H1 `Firefox Privacy Notice`, standfirst `You're in control of your data`, four illustrated principle cards, a `Privacy that works for you` block with platform-split setting links, and a `Read our Privacy Notice` CTA that jumps down the page.
- **Layer 2 — the notice proper.** Legal register, `Effective May 4, 2026`, ten-item contents list, purpose-by-purpose narrative, then two reference tables.

The joins are the artefact. Mid-document, two escape hatches:
> `Take me back to the top` of the Privacy Notice
> `Lost in the details?` Get back to the Firefox privacy basics.

`Lost in the details?` is a **reader-fatigue acknowledgement placed inside a legal document**. It concedes that the notice is hard, names the feeling, and offers a return path to the simplified layer. No other file in this corpus has a privacy notice that apologises for its own density mid-scroll.

The four Layer-1 cards are label + one-line gloss:

| Card | Gloss |
|---|---|
| `Transparency first` | "We're clear about what data we use and why. No surprises." |
| `Private by default` | Not even Mozilla should know which sites you visit |
| `Built-in control` | Fine-tune settings, separate work from personal, erase history |
| `Always protected` | Third-party trackers, social trackers, cryptominers, cookies, fingerprinting |

"No surprises" here is a direct quotation of the first Data Privacy Principle — the principles document and the product notice share vocabulary.

### The five Data Privacy Principles — the naming artefact

`[observed]` at `/privacy/principles/`, each a two-to-three-word noun phrase plus a one-sentence definition:

| # | Principle | Definition (verbatim) |
|---|---|---|
| 1 | `No surprises` | "Use and share information in a way that is transparent and benefits the user." |
| 2 | `User control` | "Develop products and advocate for best practices that put users in control of their data and online experiences." |
| 3 | `Limited data` | "Collect what we need, de-identify where we can and delete when no longer necessary." |
| 4 | `Sensible settings` | "Design for a thoughtful balance of safety and user experience." |
| 5 | `Defense in depth` | "Maintain multi-layered security controls and practices, many of which are publicly verifiable." |

`No surprises` as the *first* principle is the transferable naming decision: the top-line commitment is phrased as an **absence of a negative user experience**, not as a company virtue ("we respect your privacy"). `Limited data` compresses data minimisation, de-identification and retention limitation into nine words — "Collect what we need, de-identify where we can and delete when no longer necessary" is a better minimisation sentence than most privacy notices manage in a paragraph. `Sensible settings` openly names the **balance** rather than claiming maximal safety, which pre-authorises the existence of defaults that are not the most private possible.

### Purpose-based structure with per-purpose opt-out routing

The notice is organised by **what the data is for**, in thirteen `To <verb>` headings:

`To provide you with the Firefox browser` · `To adapt Firefox to your needs` · `To provide you with Firefox VPN` · `To provide and improve search functionality and suggestions` · `To serve relevant content and advertising on Firefox New Tab` · `To provide Mozilla accounts` · `To provide AI chatbots` · `To provide and enable add-ons (addons.mozilla.org)` · `To maintain and improve features, performance and stability` · `To improve security` · `To understand usage of Firefox` · `To market our services` · `To pseudonymize, de-identify, aggregate or anonymize data` · `To communicate with you` · `To comply with applicable laws, and identify and prevent harmful, unauthorized or illegal activity`

Most purposes end with an italicised standing subsection:
> *More details, including how to adjust your data settings:*

followed by deep links into specific help articles. The opt-out is **co-located with the disclosure**, per purpose, rather than gathered in a distant "your choices" section. A user reading about New Tab advertising is handed the New Tab settings link in the same paragraph. This is the single most reusable structural pattern in the file.

### Disclosure of the limits of the company's own privacy features

The VPN section is the exemplar of honest bounding `[documented]`. It states that the feature proxies Firefox network traffic to conceal the IP address, and then, unprompted, discloses three limits: it **does not** proxy other applications on the device; it does **not**, on its own, make browsing fully anonymous; and it **may degrade the experience**, including serving content not specific to the user's region. A product marketing a VPN volunteering "does not, on its own, make your website browsing fully anonymous" is the opposite of the industry norm.

Similarly, the ads section concedes the existence of programmatic advertising and names the limited signals shared (device type, IP-derived location, category of content viewed) rather than stopping at "we don't share personal data".

### Data definitions table — twelve named data types with concrete examples

`[documented]` The notice defines `Technical data`, `Settings`, `Location`, `Precise location`, `Language preference`, `Unique identifiers`, `System performance data`, `Interaction data`, `Browsing data`, `Search data`, `Content`, `Contact data` — each with a plain definition **and** an "Examples for Firefox users" column containing literal values (`Client_id`, `session_id`, `Country code, city`, `Memory usage, page rendering speed`, `search term ("current weather in Boston")`).

The example column is what makes it usable. `Search data` is illustrated with a real query string; `Location` is distinguished from `Precise location` by parenthetical precision ("within a few feet or meters"). Defining a controlled vocabulary of data types once and then referring to it by name throughout the document is a disclosure-architecture decision, not a writing decision — it lets every purpose row be expressed as a list of type names instead of re-describing data each time.

### Lawful-bases table — per-purpose legal basis, in bold, in plain English

`[documented]` Every purpose is mapped to `Contract`, `Legitimate interest`, `Consent`, or `Compliance with law`, with the basis **bolded and then explained in a clause**, e.g. "**Contract** to provide you with the necessary functionality for Firefox to operate", "**Consent**, when you choose to enable an AI chatbot", "**Consent** when you choose to send us crash reports, which may include browsing data."

The pattern — *basis + "to/when" + the specific thing* — makes GDPR Article 6 legible without naming Article 6. Multiple bases per purpose are stacked rather than averaged. A fourth column repeats the settings route.

### Retention stated as a number, with the exceptions named

`[documented]` "In general, we do not retain personal data for more than 25 months" — a specific, unusual figure rather than "as long as necessary". Then the exceptions are named concretely, including retaining a "first seen" date for the life of the user's Firefox use "so we know how long you've been a Firefox user". Deletion SLAs are given: Firefox data deleted within **30 days** of request; Interaction Data has a standard **90-day** retention and is auto-deleted at the end of it.

### Rights enumerated as a seven-item first-person list, with a joke

`[documented]` "As a Firefox user, you have the right to: 1. Be informed about what data we process about you, why and who it's shared with (**that's this Notice!**)". A parenthetical exclamation inside a rights enumeration, pointing the user at the document they are already reading. Right 7 (complaint) then says "**We'd prefer it if you contact us first**" before giving the EDPB and local-DPA routes anyway — a stated preference that does not obstruct the route. And: "we will never discriminate against anyone for exercising their privacy rights" — the CCPA non-retaliation commitment written as a sentence rather than a clause.

### Opt-out honesty: naming what an opt-out does *not* cover

`[documented]` The best single disclosure sentence in the file: deselecting "Allow Firefox to send technical and interaction data to Mozilla" **will not** affect the `Daily Usage Ping`, which is then explained (de-identified, not tied to other data, separately opt-outable). Most products let the global toggle imply totality. Firefox names the residual telemetry, explains its content, and gives its own separate opt-out — and repeats this caveat **twice** in the document (narrative and table) so it cannot be missed by a skimmer.

### Global Privacy Control, mapped to jurisdictions by name

`[documented]` GPC is described as automatically notifying websites not to sell or share information, and then explicitly mapped: operates as a "Do Not Sell" mechanism in California, Colorado and Connecticut; may indicate targeted-advertising opt-out or a general limit request in the EU, UK, Nevada, Utah and Virginia. Naming the eight jurisdictions and the differing legal effect in each, in consumer-facing copy, is rare.

### Version-scoped applicability

`[documented]` `Applicability (Firefox version)` states the notice covers the most recent general release from Mozilla, that a copy obtained elsewhere or an older version "may contain different privacy characteristics", and that pre-release channels (Nightly, Beta, Developer Edition, TestFlight) **by default may send certain types of web activity and crash data**. A privacy notice that disclaims its own applicability to redistributed builds and discloses that the beta channel is more invasive — both are honest and both are almost never done.

### Third-party disclosure by name, not by category

`[documented]` A `Privacy notices for select search providers` section links out to Google, Microsoft (Bing), DuckDuckGo, Amazon.com, eBay.com, Wikipedia and Perplexity. Named third parties with direct links to *their* notices, rather than "our search partners". Elsewhere: Disconnect is named as the tracker-list provider; Google's Safe Browsing Service is named; `OHTTP` and `DAP` are named privacy technologies with links; a `subprocessor list` is linked.

### Sharing table — four recipient classes

`[documented]` `Partners, service providers, suppliers and contractors` · `Authorities` · `Researchers` · `Mozilla controlled entities and successors`. The `Authorities` row leads with the constraint on the company ("Mozilla requires a valid Legal Process to compel the disclosure") before the disclosure itself. The `Researchers` row justifies openness by mission and bounds it to de-identified/aggregated formats. The umbrella Mozilla Privacy Policy goes further: it commits to notifying the user when asked to hand over personal data "unless we're legally prohibited from doing so".

### Cookie-consent and marketing disclosures

`[observed]` Newsletter footer: "We will only send you Firefox-related information. You can unsubscribe at any time." — a **scope limitation on content**, not just an unsubscribe promise. Campaign-measurement disclosure explicitly enumerates the *exclusions*: "Firefox does not share information like your browsing history, search queries, or saved passwords with marketing technology partners."

### Community Participation Guidelines as a product-footer legal artefact

`[observed]` Version-stamped (`Version 3.1 – Updated January 16, 2020`), CC-BY-SA licensed, with attribution to the Ubuntu, Rust, Citizen, LGBTQ in Technology and WisCon codes it adapts. Structure: protected dimensions (an 18-item list ending in the catch-all `Any other dimension of diversity`) → scope of application → `Expected Behavior` (six named virtues) → `Behavior That Will Not Be Tolerated` (six named harms) → `Consequences` → `Reporting`.

The six expected behaviours are imperative-verb headings: `Be Respectful` · `Be Direct but Professional` · `Be Inclusive` · `Understand Different Perspectives` · `Appreciate and Accommodate Our Similarities and Differences` · `Lead by Example`. `Be Direct but Professional` is the interesting one — it licenses hard feedback ("We cannot withhold hard truths") inside a code of conduct, pre-empting the reading that civility requirements suppress dissent.

Two policy-design details worth recording: abuse of the reporting process is itself named a violation ("False reporting, especially to retaliate or exclude, will not be accepted"); and the guidelines promise a **response SLA on questions** — "you will always get a response within 24 hours (or on the next weekday, if it is the weekend)". A code of conduct with a stated response time.

## T11 Help-centre architecture

**Three-layer structure with two competing taxonomies** `[observed]`

1. Global nav: product list × six-topic list (`Settings`, `Installation and updates`, `Email and messaging`, `Performance and connectivity`, `Privacy and security`, `Browse`)
2. Per-product landing: twelve topic cards with counts (see T1)
3. Article, with breadcrumb `Home > Firefox > <Topic> > <Article>`

The two topic vocabularies overlap but do not match — `Email and messaging` appears globally (for Thunderbird) but not on the Firefox page; `Accessibility`, `Accounts`, `Artificial Intelligence (AI)`, `Download and save`, `Backup, recovery, and sync`, `Search, tag, and share`, `Passwords and sign in` appear per-product but not globally. Recorded as a finding: **a shared-topic layer that does not survive contact with a specific product's needs.**

**Published article typology — four named content types** `[observed]`, from the SUMO writing guide:

| Type | Question it answers |
|---|---|
| `About` | "What is…" — essential information to understand a topic |
| `How-to` | "How to…?" — steps to achieve a goal |
| `Troubleshooting` | "How to…?" for problem-solving; identify, diagnose and resolve |
| `FAQ` | Concise answers to frequent questions that don't fit elsewhere |

And the guide prescribes a **different introduction pattern per type**: About articles lead with a definition plus why the user should care; How-to articles lead with the task plus its benefit; Troubleshooting articles lead with the **symptom** ("Describe the specific problem or symptoms users may encounter"). Symptom-first introductions for troubleshooting is the substantive rule here — it aligns the first line of the article with the words in the user's search box.

**Title grammar is governed by explicit published rules** `[observed]`, which is what distinguishes this help centre from most:

- Sentence case, not headline case — "The first word in the title should be capitalized, as well as proper nouns and names, not every major word."
- **"Avoid using titles containing 'How to…'"**
- **"Avoid using gerunds (words ending in 'ing') in titles"** — so no `Setting the home page`
- "Use action verbs when applicable"
- Target ~60 characters, with keywords in the first 60
- No colons in titles (for a stated technical reason — it breaks wiki links, with a bug number cited)
- "Try to vary the way you name articles. Don't use the same words or phrases in every title."

The anti-`How to` and anti-gerund rules are notable because most help centres do exactly the opposite. Compliance in the wild is partial: `How to save a web page`, `How to print web pages in Firefox`, `How to search IMDB, Wikipedia and more from the address bar` and `How to manage your camera and microphone permissions with Firefox` all violate the anti-`How to` rule; `Installation and updates` and `Passwords and sign in` are topic labels rather than titles so escape it. Recorded as a **documented-rule-versus-shipped-content gap**, which is a common and valuable negative finding.

**Slug governance is documented as a user-facing concern** `[observed]`: 50-character limit, spaces become dashes, keep the slug when retitling "unless the new title represents a significant change", explicitly to avoid broken links and preserve SEO value. Naming link-rot as the reason not to rename is content-ops discipline written down.

**Search summary is treated as a distinct content object with its own rules** `[observed]`. The guide names the metric — "We call this 'User Confidence' and it directly impacts click-through rates" — and prescribes: ≤140 characters (search engines truncate), important information first, no wiki markup, and **vary the opener**, with five sanctioned alternatives to "This article explains": `We'll show you` · `We'll explain` · `This page explains` · `This article describes` · `Learn how`. A published list of approved summary openers is an unusually concrete deliverable.

**Step-writing rules** `[observed]`
- Six-to-seven steps as the target range
- Parallel structure mandated across steps
- **Directional cues before the action**: "instead of saying *Click the button*, use *On the top-right corner, click the button*"
- Include expected results: "*Click 'OK' and the window will close.*"
- Include every action, including the confirming click
- Prefer the GUI path over the config-file path where both exist

The directional-cue-first rule is the most transferable single instruction in the whole guide: it matches the order in which a user must act (locate, then act) rather than the order in which a writer thinks (act, then where).

**Third-party-instruction policy** `[observed]` — do not transcribe another vendor's steps; link to their official documentation; explain why you are sending the user away; and disclaim the boundary. The sanctioned disclaimer is given verbatim as a model: "Following this link will redirect you to an external website that is not operated by Mozilla." Two reasons are given for the policy — third-party steps go stale, and maintaining them is resource-intensive — so the writer understands the rule rather than just obeying it.

**Routing furniture** `[observed]`, in order down the page:
`Topics` grid → `Still need help?` ("We're here for you. Post a question to our support forums and get answers from our community of experts.") → `Ask the Community` → `Featured Articles` → `Join Our Community` / `Volunteer`.

Self-service first, community second, and **no human-support channel at all** — the escalation terminates at a peer forum, which is the correct and honest representation of a free non-profit product's support model. On the article template, `Ask a Question` sits in the right rail with "Still need help? Sign in to ask your question on our forums." — the auth requirement is disclosed before the click.

**Article furniture** `[observed]`: `Customize this article` with version and OS selectors (a single article body conditionally rendered per Firefox version and platform via a documented `{for}` markup); `Last updated: <date>`; a helpfulness percentage; a `Share this article` short link (`mzl.la/...`); a named contributor list; `Related articles` (author-curated) and `Related Articles` (algorithmic, with summary snippets) — **two differently-cased blocks with the same name on one page.**

## T12 FAQs

**There is no FAQ page.** `[absent]` for a dedicated FAQ surface — no `/faq/` page and no accordion FAQ block on the marketing pages inspected. Instead, three substitutes:

**1. Question-headed sections in the umbrella Privacy Policy** `[observed]` — the Mozilla Privacy Policy is structured entirely as user questions:

| # | Question (verbatim) |
|---|---|
| 1 | What do we mean by "personal information?" |
| 2 | How do we learn information about you? |
| 3 | What do we do with your information once we have it? |
| 4 | When do we share your information with others? |
| 5 | How do we store and protect your personal information? |
| 6 | What if we change this privacy policy or any of our privacy notices? |

Answers summarised: Q1 defines personal information as anything that directly identifies or can reasonably be linked to identify, then defines everything else as "non-personal information", then commits that a combination of the two is treated as personal. Q2 gives four acquisition routes, each with a parenthetical example (crash reports; update checks; a third party such as an email provider; inference from data already given). Q3 is two sentences and defers to permission granted. Q4 is a six-bullet list ordered permission → processing → mission-driven open release → legal requirement → harm prevention → corporate change. Q5 pairs a security commitment with a breach-notification promise and a retention limit. Q6 states that continued use after the effective date constitutes acceptance.

The **first person plural in every question** is the pattern: `What do we mean`, `How do we learn`, not "What does Mozilla collect". The company asks itself the question on the user's behalf. Q1's placement is the other notable decision — the definitional question comes first, before any disclosure, so the term is fixed before it is used.

**2. `FAQ` as one of four sanctioned article types** `[observed]` — the writing guide defines FAQ articles as a residual container: "concise answers to frequently asked questions on a single topic, which may not fit within other individual KB articles". FAQ is explicitly the **overflow content type**, which is an honest description of what FAQs usually are.

**3. Question-shaped article titles across the KB** `[observed]`
`Can I use my screen reader with the new Firefox?` · `Where are my logins stored?` · `How do I report a broken site in Firefox desktop?` · `What Windows 10 end of support means for Firefox users` · `What are web compatibility exceptions?`

`Where are my logins stored?` is the most user-voiced of these — first-person possessive, present tense, the anxious question. And `What Windows 10 end of support means for Firefox users` is a **question-shaped statement with no question mark**, which the title rules would push toward.

**In-article FAQ-style headings** `[observed]`, from the Permissions Manager article: `How do I open the Permissions Manager?` · `How do I manage permissions for a single website?` · `How do I manage the default permissions for all websites?` · `What permissions can I manage?` — a single article structured as four first-person questions, which is the FAQ pattern applied inside a how-to.

## T13 Terminology & glossary

**PRIORITY SECTION.**

| Term | Firefox's usage | The alternative it rejected |
|---|---|---|
| `Enhanced Tracking Protection` / `ETP` | The umbrella protection product; abbreviated only after first full use | "tracker blocker", "ad blocker" |
| `Total Cookie Protection` / `TCP` | Cookie isolation, named as a distinct product from ETP | "cookie partitioning", "state partitioning" |
| `Standard` / `Strict` / `Custom` | The three protection tiers | "Basic / Balanced / Advanced"; "Recommended" |
| `Bounce Tracking Protection` | Named protection against redirect chains, glossed as `bounce trackers` | "redirect tracking" alone |
| `Enhanced Cookie Clearing` | Strict-mode third-party cookie clearing | |
| `SmartBlock` | The compatibility layer that substitutes stubs for blocked trackers | "tracker allowlist" |
| `WebCompat exceptions` | Trackers deliberately permitted so a site works, user-manageable | "whitelist", "allowlist" |
| `Copy Clean Link` | Context-menu action stripping tracking parameters from a URL | "Copy without tracking", "Copy sanitised URL" |
| `Protections Dashboard` | The weekly protection summary at `about:protections` | "Privacy report", "Security centre" |
| `Privacy Panel` / `Unified Trust panel` | The shield-click surface — **two names in one article** | |
| `Total Cookie Protection`'s metaphor | Cookies "confined to the website where it was created" | "isolated", "sandboxed" |
| `Forget About This Site` | Deletes everything stored for one site | "Clear site data", "Delete site" |
| `Private Window` | The incognito-equivalent mode, capitalised as a proper noun | "Incognito", "InPrivate", "private mode" |
| `Troubleshoot Mode` | Diagnostic mode with add-ons disabled | `Safe Mode` (the prior name, still in the slug) |
| `Primary Password` | The password protecting stored logins | `Master Password` (the prior industry term) |
| `Mozilla account` | Lowercase "a" **always**, except in headline-cased nav | `Firefox Account` (the prior name) |
| `Daily Usage Ping` | The minimal telemetry that survives opting out | "heartbeat", "basic telemetry" |
| `OHTTP` / `DAP` | Named privacy-preserving transport and aggregation technologies | "anonymisation" |
| `Suggestions from Firefox` vs `Search Suggestions` | Two distinct suggestion sources, distinguished by **attribution of origin** | one undifferentiated "suggestions" |
| `Firefox Labs` | Opt-in experimental features | "Beta features", "Early access" |
| `studies` | Server-controlled experiments users are enrolled in and can leave | "A/B tests", "experiments" |
| `Gecko` | The browser engine, named and personified in consumer copy | leaving the engine unnamed |
| `ESR` / `Extended Support Release` | The long-lived channel; glossed on first use | "LTS" |
| `shield` | The address-bar affordance, named by its shape | "privacy icon", "protection badge" |
| `Reader mode` · `Picture-in-picture` · `Tab groups` · `Firefox View` · `Smart Tab Groups` · `Link Previews` · `Shake to Summarize` | Feature nouns | |
| `sponsored content` / `sponsored suggestions` / `sponsored tiles` | Three scoped ad surfaces, separately named and separately disableable | one blanket "ads" |
| `de-identified` | Used consistently in the Privacy Notice | "anonymised" (which Mozilla reserves for a stronger claim, using both terms distinctly) |
| `Mozillians` | Community members, used in the CPG | "contributors" alone |

**`Forget About This Site` is the single best-named destructive action in this corpus.** "Forget" frames deletion as the browser's memory being cleared rather than the user's data being destroyed — which is both more accurate (this is local state) and less alarming. It is paired with a `Warning:` that enumerates *every* category removed: browsing and download history, cookies, cache, active logins, passwords, saved form data, and exceptions for cookies, images and pop-ups. A gentle verb with a brutally complete consequence list.

**The `Standard` / `Strict` / `Custom` triad analysed.** Calling the default `Standard` rather than "Recommended" or "Balanced" does real work: "Recommended" implies the others are ill-advised and invites suspicion of the default; "Balanced" concedes a trade-off up front. `Standard` asserts a baseline. `Strict` then reads as *more than standard* rather than *the safe option*, which correctly signals that it is the one with costs — and the docs confirm the cost in the same breath. `Custom` is a mode, not a settings link, so per-tracker choice is a named tier rather than buried configuration.

**Register split across surfaces.** Marketing writes `Data Protection` and `Firefox for mobile`; the Privacy Notice writes `Firefox browser` and `Firefox VPN`; the help centre writes `Firefox desktop`. The shortest forms live in the help centre, the most formal in the notice — the same gradient the Wise exemplar records.

**Documented terminology rules** `[observed]`, from the SUMO style guide — a rare case of a product publishing its own lexical decisions:

- `Plugins` has **no** hyphen; `Add-ons` **does**
- `Home page` is two words; `Website` is one word; `Web page` is two
- `email`, not `e-mail`
- `Log in` / `log out` and `sign in` / `sign out` are **verbs**; `login` / `logout` are nouns. Never "log into" or "sign into"
- "Sign up" is the CTA for creating an account
- The "a" in `Mozilla accounts` is always lowercase except in headline-cased nav
- Never `i.e.` or `e.g.` — use "in other words" / "for example"
- No serial commas
- Sanctioned initialisms: `HTTP`, `USB`, `URL`
- Spell out `backslash (\)` and `forward slash (/)`
- No slang or idioms, stated reason: they are ambiguous to non-native speakers and hard to localise
- **"Always use terms the way they appear in the Mozilla interface"** — the governing rule

That last rule is the interesting one: the style guide subordinates itself to the product UI rather than the reverse. The UI is the source of truth for terminology, and documentation follows.

## T14 Voice, tone & accessibility

### Published voice-and-tone guidance

`[observed]` The SUMO writing guide is a genuine content standard, and its tone section is explicitly **brand-derived**:

> "Write with the brand in mind. Mozilla is about user choice. We believe in freedom and flexibility. We value privacy and security. We are a community-driven non-profit..."

followed by the useful caveat: "You don't need to hammer this story in every time you write an article."

Four numbered writing principles, each with a name and a rationale:

1. **`Keep it short.`** "People come to the Knowledge Base looking for quick solutions... Go ahead and chop off some words. See how much you can convey with fewer words. It's like poetry!"
2. **`Keep it clear.`** "Avoid jargon. Be specific. Use words in the title and in the article that the reader would use. If your 13-year-old nephew won't understand it, write it so that he would."
3. **`Be friendly, fun and empathetic. (In short: Be human.)`** — and then the guardrail: "be careful not to sacrifice clarity by using fun metaphors or expressions. If you're not sure how to balance this, just write straightforward instructions and use the tone in the introduction or conclusion."
4. **`Tell a story.`** Beginning (context: "What is this article about and why should I care?"), middle (the instructions), end (next steps).

Principle 3 is the transferable one: it gives writers **a place to put personality** (intro and conclusion) and a place where personality is banned (the instructions). That is a far more actionable rule than "be friendly but clear", because it resolves the conflict by location rather than by judgement. The "13-year-old nephew" test is a concrete readability proxy in place of a Flesch score.

The comprehensive section adds `Conversational writing style`, `Humor and emotion` (with the honest constraint that humour "is sometimes hard or impossible to localize", and the suggestion to prefer surprise and "I didn't know that/Eureka!" which travel better), `Multiple learning styles`, `Repetition`, `Images and video` (with a **cost note** — too many images make localisation harder, so prefer "Click OK" over a screenshot of the OK button), and `Activities`.

Mandated register rules: active voice and present tense ("Restart Firefox to update" **not** "Firefox has to be restarted"); second person ("If you've lost your bookmarks", **not** "If a user's bookmarks have been lost"); no `click here` link text, with a do/don't pair given:
> **Do:** Go to your account settings to cancel your subscription.
> **Don't:** Click here to cancel your subscription.

Readability rules: subheadings to split semantic blocks, numbered or bulleted lists, short sentences, no large paragraphs, and — notably — "There is no limit to the amount of text. The more material, the better; however, you should not artificially expand it." A length policy that refuses a word count in both directions.

### Observed register

**Person and tense.** Second person for the user throughout; first-person plural for the organisation, and the organisation is a named actor in adverse copy: "We don't know that much about you", "we never sell", "We're clear about what data we use and why", "Mozilla requires a valid Legal Process". Critically, the Privacy Notice keeps `we` even where passive voice would be safer — "we may share limited, non-identifying information".

**Contractions used freely** in marketing and help, and **also in the legal notice** ("that's this Notice!", "we'll notify you", "We'd prefer it if you contact us first"). Most privacy notices drop contractions to signal seriousness; Firefox does not, and the notice is more readable for it.

**Exclamation marks are rationed but not absent.** `Ask us a question!`, `It's like poetry!`, `that's this Notice!`, and one in a system-error message ("Please try again later!"). No `Oops!` anywhere. No `Great news!`. The one in the error message is the misplaced one.

**Tone flattens as stakes rise** — and then unexpectedly does not. Colloquialism clusters in marketing (`Ads? Totally up to you.`, `Built to benefit billions, not billionaires`) and in the contributor guide; the fee-table-equivalent (the lawful-bases and data-definitions tables) is entirely flat. But the *narrative* half of the Privacy Notice keeps the conversational voice ("Here's the big picture", "Lost in the details?"), which is a deliberate decision to make the highest-stakes document the *most* human rather than the least. This is the inverse of the Wise gradient and worth recording as a second valid model: **flatten the reference tables, humanise the prose, and let the two coexist in one document.**

**Numbers as trust devices** `[observed]`: `Over 30,000 extensions`, `25 months` retention, `30 days` deletion, `90 days` interaction-data retention, `24 hours` CPG response SLA, `81%` / `67%` / `36%` article-helpfulness scores, `~60 characters` title target, `140 characters` summary limit, `six-seven` steps. Firefox publishes operational numbers (retention, SLA, helpfulness) rather than marketing numbers (users, speed).

### Accessibility

**Accessibility as a first-class help topic** `[observed]` — `Accessibility` is one of twelve Firefox help topics with six articles, not a footer link. Titles include `Accessibility features in Firefox - Make Firefox and web content work for all users` (a title-plus-subtitle joined by a hyphen, giving the benefit after the topic), `Can I use my screen reader with the new Firefox?` and `Accessibility not available during multi-process support`.

**Published Accessibility Conformance Report** `[observed]`:
> "We strive to be both compliant with accessibility standards and to create delightful experiences for our users."

The ACR is stated to be based on ITI VPAT 2.5 and to cover WCAG 2.2 and Revised Section 508, and is linked as a PDF (Firefox for desktop, Windows OS, April 2024). Naming the template version and both standards, and dating the report, is the correct disclosure shape. **Gap recorded:** the linked report is dated April 2024 and covers Firefox 124, against a current release of 156 — a 32-version, ~2-year gap between the shipped product and the published conformance claim, on a page last updated 6/2/26. That is a real and citable accessibility-content defect.

**Second gap:** the accessibility article's own helpfulness score is `36%` — the lowest observed in this harvest. The page telling disabled users how to use the browser is the page users rate least helpful, and Mozilla publishes that number. Honest, and an actionable signal.

**Three skip links, first in DOM** `[observed]`: `Skip to main content` · `Switch language` · `Skip to search`. Including the language switcher in the skip set is unusual and good — it treats locale change as an accessibility affordance, not a footer convenience.

**Accessibility-relevant feature and setting labels** `[documented]`:
`Caret Browsing` (with the plain gloss "a movable cursor on web pages", and the note that F7 toggles it behind a confirmation dialog), `Always use the cursor keys to navigate within pages`, `Search for text when you start typing`, `Zoom Text Only`, `Page Zoom`, `Text Zoom`, `Setting a Minimum Font Size`, `Override the colors specified by the page with your selections above`, `Website contrast` with the three values `Automatic (use system settings)` / `Off` / `Custom`, `High Contrast theme` detection, `Restore defaults`.

`Automatic (use system settings)` as the first and default contrast option — deferring to OS preference rather than asking the user to configure the browser separately — is the right default and the right label for it.

**Each override setting carries its own caveat** `[documented]`: "Note that some web pages may display incorrectly depending on your choice of minimum font size" / "...choice of a default font" / "some web pages may display incorrectly if you increase or decrease the text size". Three near-identical caveats attached individually to three settings rather than gathered once. Repetitive, but it means the warning is present at the moment of the decision.

**Screen-reader support is described honestly and partially** `[documented]`: NVDA, JAWS, ZoomText, Supernova, Orca, VoiceOver and others are listed by platform, and VoiceOver is qualified — "Firefox includes **basic** support for Voiceover". A hedged support claim rather than a checkmark. The screen-reader definition paragraph is explicitly attributed as adapted from Wikipedia under CC-BY-SA, which is correct sourcing practice inside a help article.

**Alt-text generation as a shipped accessibility feature** `[observed]` — `Add alt text to images in your PDFs using Firefox`, filed under the `Artificial Intelligence (AI)` topic, and disclosed in the Privacy Notice as running on a small on-device language model with content not sent to Mozilla. A product that both generates alt text and discloses how.

**Accessibility named in the lawful-bases table** `[documented]`: the browser-provision row cites "**Legitimate interest** in providing additional functionality, **accessibility services** and a more personalized experience." Accessibility appears as a named purpose of data processing in a privacy notice — an unusual and defensible place to find it.

### Negative findings, recorded honestly

- `Get Firefox` (sticky nav) vs `Download Firefox` (hero, footer) — two verbs, one action, same page
- `Data Protection` (nav) vs `How Firefox Protects Your Data` (H1) vs `How Firefox protects your data` (homepage CTA) — three strings, one destination
- `Read our Privacy Notice` vs `Read the Firefox Privacy Notice` — two labels, one destination
- `What's New` vs `What's Next` — adjacent nav items separated by one letter
- `About Firefox features` vs `View all Firefox Features` — adjacent nav items, near-duplicate, inconsistent casing
- `Related articles` vs `Related Articles` — two blocks, same name, different casing, one page
- `Privacy Panel` vs `Unified Trust panel` vs `Protections For Site` panel — the shield surface has at least three names in one article
- `Protection settings` vs `Privacy Settings` and `What's broken` vs `What's not working?` — version-forked strings shown inline in the same sentence; a versioned-docs artefact that reads as indecision
- `Report broken site` vs `Report Broken Site` — casing differs by entry point in one article
- Serial commas in `Search, tag, and share` and `Backup, recovery, and sync`, against the organisation's own published rule
- `How to…` titles shipped in quantity against the organisation's own published prohibition
- Step 3 `Click import` — lowercase UI label, against the "use terms as they appear in the interface" rule
- "come with you automatically" directly above a three-step manual sequence whose middle step requires selection
- Eyebrow casing breaks on the fourth homepage pillar (`Independence` vs `PRIVACY` / `FOCUS` / `CHOICE`)
- Validation-message punctuation is inconsistent across six adjacent strings; the system-error string is the only one that both apologises and exclaims
- The Permissions Manager article is served with "This article is no longer maintained" while still being the top result for permission terminology — good disclosure, bad content lifecycle
- The VPAT/ACR is 32 Firefox versions behind the current release
- The shield's zero-tracker state has no visible copy; its meaning exists only in documentation
- Capital-C `Cookies` mid-sentence in the consent banner, against the organisation's capitalisation rules

---

## Transferable patterns

1. **Give the empty state a name and a sentence, and make it evidence of work done.** `None Detected` — "Firefox looked for these trackers and scripts, but did not find them on this site" — converts a blank row into proof the scan ran. Transfers directly to fraud checks, risk screens, dispute searches, and any compliance scan where a clean result currently renders as nothing. Condition: only works where the system genuinely did check; otherwise it is a lie.
2. **Separate *protection is on* from *protection caught something*.** `Active` (on, nothing found) versus `Blocking` (on, something found) are two states most products collapse. Any monitoring, security, or limit-enforcement surface benefits from naming the quiet state so its silence is not read as failure.
3. **Co-locate the opt-out with the disclosure, per purpose.** The Privacy Notice attaches an italic *"More details, including how to adjust your data settings:"* to almost every purpose section, deep-linking the exact setting. Far more effective than a distant "Your choices" section. Transfers to consent and preference architecture wherever a notice and a settings surface exist separately today.
4. **Name the residual: say what the opt-out does *not* cover.** "deselecting 'Allow Firefox to send technical and interaction data to Mozilla' will not impact the Daily Usage Ping" — then explain the ping and give it its own toggle. Any product with a master privacy or notification switch that isn't total should copy this. It is also the cheapest trust win available.
5. **Publish the accept/reject pair as lexical and visual twins, and scope them with a modifier.** `Accept All Additional Cookies` / `Reject All Additional Cookies` — same length, same weight, and `Additional` doing the scoping work so the user understands what is not on offer. Directly applicable to any consent banner.
6. **Bound your own feature's claim in the notice, unprompted.** "does not, on its own, make your website browsing fully anonymous"; "may impact your browsing experience". Disclosing the limits of a privacy feature inside the privacy document is the highest-credibility place to do it. Transfers to BNPL eligibility, protection-programme coverage, and any "we protect you" promise with carve-outs.
7. **Put the personality in the introduction and conclusion, and ban it from the instructions.** The SUMO rule resolves the friendly-versus-clear conflict by *location* rather than by judgement, which makes it enforceable by reviewers. Adopt verbatim as a content-standard clause.
8. **Directional cue before the action.** "On the top-right corner, click the button", never "Click the button in the top-right". Matches the user's actual sequence (locate, then act). One line in a style guide, measurable reduction in step failures.
9. **Publish the article's helpfulness score, even when it is bad.** A visible `36%` on the accessibility article is a public admission and a public backlog item. Condition: only defensible if someone owns acting on it.
10. **`Forget About This Site`.** A gentle, accurate verb for a destructive local-data action, paired with an exhaustive consequence list. When the deletion is genuinely local and recoverable-by-revisiting, "forget" beats "delete" or "clear". Do not use it where data is unrecoverable.
11. **Name the default `Standard`, not `Recommended`.** `Recommended` invites the question "why would I not?"; `Balanced` concedes a trade-off; `Standard` asserts a baseline and lets `Strict` carry the cost honestly. Applies to any three-tier safety, privacy, or risk setting.
12. **Disclose partial rollout in the help article.** "This feature is experimental and is being introduced... It may not yet be available to all users." Prevents the most common trust failure in versioned docs — the user concluding the documentation is wrong.

## Caveats & gaps

- **All in-product chrome is `[documented]`, never `[observed]`.** Permission prompts, shield panel, protections dashboard, settings labels and the tracker lists are quoted from help articles describing them. Firefox's UI is not a web surface, so no amount of unauthenticated fetching reaches it. Every string in T6, and most of T5 and T8, carries this limitation.
- **Two URLs blocked.** `https://protocol.mozilla.org/docs/fundamentals/copy-guidelines` returned an empty body — the Protocol design system's content guidance was **not** captured, which is a material gap given the brief singled it out. `https://support.mozilla.org/en-US/kb/site-permissions-panel` aborted on two attempts; the Site Permissions panel's own labels are therefore known only via the camera/microphone article's references to them. The Acorn design system (acorn.firefox.com) was not reached at all.
- **Help-centre search no-results string not captured** — the search field was not exercised with a query. This is the most conspicuous hole in the priority T8 section.
- **Firefox's own error pages not observed.** `about:neterror`, certificate-warning pages, and the "Secure connection failed" family were identified by help-article title only; the article body was not opened, so the actual error titles, explanations and button labels are absent. A high-value target for a follow-up pass.
- **Article titles, not bodies, for most of the help centre.** Twelve topic cards' worth of titles were harvested from the index; only five article bodies were read in full.
- **Only en-US.** Firefox ships in 70+ locales on support.mozilla.org and ~20 on firefox.com; the register differences under localisation (which the style guide repeatedly anticipates) are unexamined.
- **Firefox Android and iOS strings unharvested** — the mobile Privacy Notice paths, the Focus browser, and platform-divergent behaviour (iOS crash reports sent by default) are documented in the notice but their own surfaces were not visited.
- **No status page found.** Mozilla does not appear to publish a consumer-facing Firefox service status page in the footer or help nav; `Service status`-equivalent links were looked for and not found. Marked `[absent]` rather than blocked — a browser has less need for one, but Sync, Mozilla accounts and Relay are hosted services that would justify it.
- **Pricing / membership page: `[absent]` by nature.** Firefox is free and has no subscription; the only adjacent commerce surfaces are Mozilla VPN, Relay and MDN Plus, which are separate products outside this file's scope. There is therefore no cancellation wording to capture for product 156.
- **`Protections Dashboard` copy unknown beyond its name** — `about:protections` is in-product.
- **Homepage content duplicates in the DOM** (responsive light/dark and desktop/mobile image variants, and the entire "Fast to switch" block rendered twice). Screen-reader users may encounter duplicated headings and CTAs depending on CSS handling. Flagged as suspected from the served markup, not confirmed with assistive technology.

## Sources

1. https://www.mozilla.org/firefox/ (302 → https://www.firefox.com/en-US/)
2. https://www.firefox.com/en-US/user-privacy/
3. https://www.mozilla.org/en-US/privacy/firefox/
4. https://www.mozilla.org/en-US/privacy/
5. https://www.mozilla.org/en-US/privacy/principles/
6. https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop
7. https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions
8. https://support.mozilla.org/en-US/kb/permissions-manager-give-ability-store-passwords-set-cookies-more
9. https://support.mozilla.org/en-US/products/firefox
10. https://support.mozilla.org/en-US/kb/writing-guide-knowledge-base-articles
11. https://support.mozilla.org/en-US/kb/accessibility-features-firefox
12. https://www.mozilla.org/en-US/about/governance/policies/participation/
13. https://protocol.mozilla.org/docs/fundamentals/copy-guidelines — **blocked (empty body)**
14. https://support.mozilla.org/en-US/kb/site-permissions-panel — **blocked (fetch aborted ×2)**
