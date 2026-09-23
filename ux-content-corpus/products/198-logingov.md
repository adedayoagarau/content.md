# 198. Login.gov

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Federal identity and authentication service (shared single sign-on + identity proofing for US government agencies) |
| Primary URL | https://www.login.gov/ |
| Corpus rank | 198 |
| Benchmark strength (source list) | Identity verification and recovery |
| Locale / market observed | en-US, with full site mirrors in `es`, `fr` and `zh` (Simplified Chinese) — four-language toggle on every page |
| Platform observed | Web (desktop). Marketing site + help centre. `secure.login.gov` (the actual product) not entered. |
| Auth state | Unauthenticated public surfaces only. **No account created, no sign-in attempted, no identity verification started, no personal, identity or biometric data entered anywhere.** All in-product flows below are `[documented]` from the help centre. |
| Regulatory posture | Operated by **Technology Transformation Services (TTS)** within the **U.S. General Services Administration (GSA)**. Accessibility governed by **Section 508 of the Rehabilitation Act**; conformance evidence is published as **VPAT 2.5 Rev 508** (Authentication) and **VPAT 2.4 Rev 508** (Identity Verification), both dated 2025-02-26. Accessibility statement defers to the GSA Accessibility Statement. Footer carries **No FEAR Act**, **FOIA** and Office of the Inspector General links. Identity proofing is performed against "public and proprietary records"; in-person proofing is delivered through the **United States Postal Service**. |
| Harvest date | 2026-09-22 |
| Pages inspected | 16 |
| Harvest completeness | Full for the public marketing and help surfaces, which are unusually detailed — Login.gov documents its own in-product strings, step sequences and failure states in the help centre, so T5–T9 are richer here than for most products in the corpus. Everything past the sign-in page is `[documented]`, never `[observed]`. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.login.gov/ | Three-audience split; tagline |
| What is Login.gov? | https://www.login.gov/what-is-login/ | The explainer; "two pieces of information" model |
| Help centre home | https://www.login.gov/help/ | Six-category IA with scope lines |
| Authentication methods | https://www.login.gov/help/create-account/authentication-methods/ | The More/Less secure taxonomy |
| Face or touch unlock | https://www.login.gov/help/create-account/authentication-methods/face-or-touch-unlock/ | Passkey copy; the account-deletion warning |
| How do I create a Login.gov account | https://www.login.gov/help/create-account/how-do-i-create-an-account/ | 7 steps; password rules |
| Trouble signing in? | https://www.login.gov/help/trouble-signing-in/overview/ | 5 steps; recovery framing |
| Why isn't my email or password working? | https://www.login.gov/help/trouble-signing-in/forgot-your-password/ | 8-step reset; personal-key path; the hard dead-end |
| How do I sign in if I lost my phone or personal key? | https://www.login.gov/help/trouble-signing-in/how-to-sign-in/ | Personal key definition |
| Why is my account locked? | https://www.login.gov/help/trouble-signing-in/why-is-my-account-locked/ | Two lockout regimes |
| Security check failed (reCAPTCHA) | https://www.login.gov/help/trouble-signing-in/security-check-failed/ | |
| Why is my account deactivated? | https://www.login.gov/help/manage-your-account/deactivated/ | Stub page |
| How do I delete my account? | https://www.login.gov/help/manage-your-account/delete-your-account/ | Two paths; 24-hour gate |
| Verify my identity | https://www.login.gov/help/verify-your-identity/overview/ | The 4-step proofing sequence |
| Verify in person | https://www.login.gov/help/verify-your-identity/verify-your-identity-in-person/ | USPS flow; barcode expiry |
| Fraud and security | https://www.login.gov/help/fraud-concerns/overview/ | Account History; compromise recovery |
| Accessibility | https://www.login.gov/accessibility/ | Two sections; VPAT downloads |

---

## T1 Navigation & IA labels

**Marketing nav — five items, mixed grammar** `[observed]`

`What is Login.gov?` · `Who uses Login.gov?` · `Create an account` ·
`New Login.gov Experience` · `Help center` · `Contact us` ·
`Sign in with Login.gov` (primary button, repeated top and in the menu)

Two of five are questions about the product; one is a task; one is a release announcement
(`New Login.gov Experience`) permanently occupying a top-level nav slot.

**Audience split on the homepage — three tiers, each with its own CTA** `[observed]`

| Tier | Scope line (verbatim) | CTA |
|---|---|---|
| `Individuals` | "Use one account for secure, private access to participating government agencies." | `Learn about Login.gov` |
| `Agency partners` | "Protect your users' information with the highest standards of digital security and user experience…" | `Become a partner` |
| `Agency developers` | "Developer resources, real-time support and modern tools…" | `See developer guide` |

**Help centre — six categories, first person, with scope lines** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Create my account` | "Create your account. Learn about authentication options and more account features." |
| `Trouble signing in` | "Forgot your password? Locked out of your account? We'll help you resolve access issues." |
| `Manage my account` | "Change your account settings including your password, phone number, email, and more." |
| `Verify my identity` | "Learn about options for verifying your identity." |
| `Help with agencies` | "Get help with Trusted Traveler Programs (TTP) and SAM.gov." |
| `Fraud concerns` | "Learn how to protect yourself and your Login.gov account from fraud." |

**The category labels are first person (`my`) and the scope lines are second person
(`your`).** A systematic voice split between navigation and prose — `Verify my identity` in
the nav, "verify your identity" in every sentence. It is consistent enough to be deliberate
(nav = the user's mental utterance; prose = the service addressing them) but it is never
stated, and it produces mismatched pairs on the same screen.

**`Trouble signing in` is a category label written as a symptom, not a system object.**
Alongside `Fraud concerns`, that is two of six top-level categories named from the user's
anxiety. Compare Wise's `Where is my money?`.

**Scope-line pattern worth stealing** `[observed]`: the `Trouble signing in` line is
*two questions then a promise* — "Forgot your password? Locked out of your account? We'll
help you resolve access issues." The user self-identifies on the symptom before reading the
category name.

**`Popular topics` block** `[observed]`: `I'm having trouble authenticating` ·
`Issues verifying your identity` · `Help with Social Security Administration (SSA)` ·
`Help with Trusted Traveler Programs (TTP)`. Note the first item is first person and the
second is second person, in the same four-item list.

**Footer, three groups** `[observed]`: `For agencies` (`Become a partner`,
`Developer guide`) · `Learn` (`About us`, `Accessibility`, `Join us`, `Privacy & security`) ·
`Support` (`Contact us`, `Help center`), then `Login.gov system status` as a standalone link,
then the GSA block (`About GSA`, `Accessibility support`, `FOIA requests`,
`No FEAR Act data`, `Office of the Inspector General`, `Performance reports`,
`Privacy policy`), then `Looking for U.S. government information and services?` →
`Visit USA.gov`.

**Defect** `[observed]`: the Fraud section has **three names** — nav label `Fraud concerns`,
page H1 `Fraud and security`, URL `/fraud-concerns/`.

## T2 Value proposition & headline patterns

**Homepage H1 — a noun phrase with a full stop** `[observed]`

> `The public's one account for government.`
> "Use one account and password for secure, private access to participating government agencies."

The headline is a *definite article claim* — not "an account", "**the** public's **one**
account". It asserts singularity, which is the whole product thesis. The subhead then names
the three attributes in order: `one` → `secure` → `private`. Those same three words recur
across the site as the value triad.

**Explainer standfirst uses an em-dash reversal** `[observed]`:
`What is Login.gov?` → "Signing in to government agencies should be simple — and secure."
The dash concedes the tension (simple *versus* secure) rather than pretending it away. It is
also the site's only meta description; the other eleven help pages ship with empty
`meta-description`.

**The mechanism is explained in one sentence, twice** `[observed]`

- "Login.gov is a safe way to sign in to many U.S. government websites using just one account."
- "It helps protect your information by asking you to take extra steps to make sure it's really you when you log in."

The second sentence is the whole of MFA, explained without the acronym, without "factor", and
with the user's own scepticism voiced ("make sure it's really you"). The acronym arrives
only later and parenthetically: "This is referred to as multi-factor authentication (MFA)."

**Section headers** `[observed]`: `One account and password` · `How does it work?` ·
`Secure and private access for the public` · `Login.gov is your one account for government` ·
`Already have an account?` · `Your one account for government`.

Note the tagline mutates across the page: `The public's one account for government.` (H1) →
`Login.gov is your one account for government` (H3) → `Your one account for government`
(banner). Third person → second person → possessive fragment. Three variants of one line on
one page.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign in with Login.gov` | Header, every page; also inside the collapsed menu | Names the identity provider, not the action alone |
| `Create an account` | Marketing nav; also step 1 of the face-unlock instructions | |
| `Learn about Login.gov` | Individuals tier | |
| `Learn how to create an account` | Homepage banner | |
| `Become a partner` | Agency partners tier; footer | |
| `See developer guide` | Agency developers tier | |
| `Help center` | Nav and footer | Two words, US spelling |
| `Contact us` | Nav and footer | |
| `Search` | Help centre, twice per page | Rendered as a duplicated label |
| `Back to top` | Foot of every help article | Anchors to `#main-content` |
| `Choose another security option` | **In-product**, quoted in help | The escape-hatch label |
| `Reactivate your profile now` | **In-product**, quoted in help | |
| `I have my key` | **In-product**, quoted in help | First-person button label |
| `Forgot your password?` | **In-product**, quoted in help | "near the bottom of the page" |
| `Reset your password` | Email button, quoted in help | |
| `Change password` | **In-product** submit | |
| `Confirm your email address` | Email button, quoted in help | |
| `Submit` | **In-product**, email step | |
| `Continue` | **In-product**, password-reset step 4 | Two different submit labels in one flow (see defects) |
| `Delete account` | **In-product**, menu item and confirm | Same label twice in one path |
| `Yes, continue deletion` | **In-product** | Affirmative-restatement confirm |
| `deleting your account` | **In-product** link, described by scroll position | |
| `Events` | **In-product**, Account History | |
| `Menu` | **In-product**, small screens | |
| `Visit USA.gov` | Footer | |
| `Login.gov system status` | Footer | Status page as a first-class footer link |
| `Skip to main content` | First in DOM | |

**Observation.** Login.gov ships almost no marketing verbs — no `Get started`, no
`Sign up free`, no `Try`. The primary CTA is `Sign in with Login.gov`, which reads as a
federated-identity button because that is literally what it is. The site's persuasion budget
goes entirely into `one`, `secure`, `private`.

## T4 Onboarding & getting-started — `[documented]`

**Account creation — seven numbered steps** `[documented]`

1. `Enter your email address at https://secure.login.gov/sign_up/enter_email to begin.` — with a durability caution: "Choose an email address that you'll always be able to access."
2. `Click the "Submit" button.`
3. `Check your email for a message from Login.gov.`
4. `Click the "Confirm your email address" button in the message. This will take you back to the Login.gov website.`
5. `Create your Login.gov password.`
6. `Set up a second layer of security.`
7. `Success! Once you have authenticated, you have created your Login.gov account.`

Step 1's parenthetical is the notable one: the service tells you, before you type, that this
choice is permanent-ish — because losing access to that mailbox is one of the two
unrecoverable states (see T7). Guidance placed at the point of decision rather than in the
recovery article.

Step 6 is labelled **`Set up a second layer of security`** in the step heading and only then
glossed: "Login.gov requires you set up an authentication method to keep your account
secure. This is referred to as multi-factor authentication (MFA)." Plain metaphor first,
term of art second.

**Identity verification — four numbered steps** `[documented]`

1. `Take photos of your ID online.` — with the in-person alternative offered in the same step: "If you have trouble taking photos, you may also be able to verify your identity in person at a United States Post Office near you."
2. `Enter your Social Security number and we will verify your personal information against public and proprietary records.`
3. `Verify your phone number and send a one-time code to your phone.` — with the fallback in the same step: "If that doesn't work, we may be able to verify your address by mail instead."
4. `Re-enter your password to store your verified information in your account, and connect your information to the partner agency you are trying to access.`

**Every step carries its own fallback inline.** Steps 1 and 3 each name the alternate route
at the moment the user might fail, not in a troubleshooting article. That is the single
best structural decision in this file.

Entry conditions are stated as a bulleted requirement list under the heading
`What do I need to verify my identity?` — "U.S. Driver's license, mobile driver's license
(mDL), state ID, or passport book/card" · "Social Security number" ·
"U.S. phone number or mailing address" — followed by a clean exit:
"If you don't have all of these requirements, contact the agency you are trying to access to
find out what you can do instead."

**Consent is named as a step** `[documented]`: "We ask for your consent before we share your
verified information with the partner agency." And the scope of the service is bounded:
"We only use the documents and photos to confirm your identity. **Login.gov does not make
any determination on eligibility for agency services.**" A sentence whose whole job is to
tell you what the product will *not* decide.

## T5 Question & form design — **PRIORITY** — mostly `[documented]`

**Password requirements, quoted verbatim in two places** `[documented]`

Positive framing first, under "To help prevent identity theft, consider strengthening your
password by using:"
- "Unique phrases that only you recognize"
- "Multiple words with spaces to get to 12 characters"
- "Numbers and special characters"

Then the constraint, under "Your password must have 12 or more characters and avoid
combinations such as:"
- "Common phrases or repeated characters, like abc or 111"
- "Parts of your email address or personal dates, like your birthday"
- "The same password, or parts of it, that you use for other accounts, such as your bank account or email"

Three things worth stealing. **Advice precedes constraint** — the "consider strengthening"
list comes before the "must have" list, so the user reads a suggestion before a rule.
**Each prohibition carries a concrete example** — "like abc or 111", "like your birthday" —
rather than an abstract class. And the third prohibition is about *other* systems
("your bank account or email"), i.e. the rule is justified by cross-service risk, which is
the actual threat model.

**Field-level copy quoted from the product** `[documented]`:
`Enter your email address` · `Enter your password` · `Enter your new password` ·
`Re-enter your password` · `Enter your most recent personal key` ·
`Choose a device nickname` · `Secure your account` (page name) · `Your account` (menu name) ·
`History` (menu item).

`Choose a device nickname` is notable — a naming field for a credential, which shifts the
mental model from "a passkey" to "this phone", and makes the later revoke/manage screen
legible.

**Answer-option labels** `[documented]`: `This device` / `Use a phone or tablet` (desktop
passkey flow), rendered as `This device` / `Phone or tablet` in the mobile paragraph of the
same page. Two labels for one pair on one page.

**Question-form headings used as navigation** `[observed]` — the help centre's H1s are
almost all user questions, which is also the form-question inventory of the service:
`Why isn't my email or password working?` · `How do I sign in if I lost my phone or personal
key?` · `Why is my account locked?` · `Why is my account deactivated?` ·
`How do I delete my account?` · `What is Login.gov?` · `How does it work?` ·
`How do I access my account?` · `What do I bring to the Post Office?` ·
`Which Post Office can I visit to verify my identity?` ·
`What happens when I go to the Post Office?` · `Already have an account?`

**Defect** `[observed]`: `How do I create a Login.gov account` is the one interrogative H1
with **no question mark**, and the nav label repeats the omission.

**No published content standard.** Unlike NHS, Canada.ca and NSW, Login.gov publishes no
style guide, no voice-and-tone document and no error-message specification on its public
site. The `developers.login.gov` guide was out of scope. So all T5/T7 evidence here is
*reverse-engineered from the help centre's own quotations of the product*, which is an
unusual and useful source type but is not a standard. `[absent]` for published guidance.

## T6 Status & state language — `[documented]`

Login.gov runs **two distinct adverse account states with separate pages and separate
recovery paths**, and the distinction is never explicitly contrasted for the user:

| State | Trigger | Recovery |
|---|---|---|
| `locked` (sign-in) | "You may have entered your password incorrectly too many times." / "…requested too many security codes for the time period." / "…entered your security code too many times." | "Please wait 10 minutes and try again." |
| `locked` (identity verification) | "we limit the number of times that you can attempt to verify your ID, personal information, or phone number online" | "You'll need to wait six hours before you can try to verify your identity again." |
| `deactivated` | "If you verified your identity and reset your password without your personal key, your account might be deactivated temporarily, requiring you to verify your identity again." / "Login.gov may revoke access if it detects fraud or other violations of our Rules of Use." | Reactivate with personal key, or re-verify identity. **For the fraud case: nothing stated.** |

**Two lockout durations — 10 minutes and 6 hours — sit on the same page under near-identical
headings**, distinguished only by the clause "when you attempted to sign in" vs "during
identity verification". A 36× difference in consequence, signalled by a subordinate clause.

Other states named `[documented]`: `verified` (of information) · `unsuccessful` /
`successful` (of an in-person visit) · `expired` (of a barcode) · `compromised` (of an
account) · `duplicate accounts` · `relink` (of an account-to-agency connection) ·
`pilot` is not used; `New Login.gov Experience` serves that purpose in nav.

**Timing strings inventory** `[documented]`: `wait 10 minutes` · `six hours` ·
`24 hour waiting period` · `24 hours` (post-office result email) · `7 days` (barcode
expiry). All absolute counts; no weekday names, no "business days", no relative phrases
like "shortly".

## T7 Error, failure & recovery — **PRIORITY** — `[documented]`

This is the richest category for this product, and the corpus's best example of
**recovery content that must be secure and reassuring simultaneously**.

### 7a. Recovery headings are symptoms, in the user's own words

`Trouble signing in?` · `Why isn't my email or password working?` ·
`My email or password isn't working` · `How do I sign in if I lost my phone or personal key?`
· `Forgot or lost your personal key` · `If you lost your phone` · `Why is my account locked?`
· `Why is my account deactivated?` · `Security check failed (reCAPTCHA)` ·
`I got an unsuccessful email result after going to the Post Office` ·
`I didn't get an email from Login.gov after going to the Post Office` ·
`I'm having a problem with my barcode` · `I'm having trouble authenticating` ·
`I'm receiving one-time codes that I didn't request`

Four of these are **first-person past-tense confessions** in the Wise mould
(`I didn't get an email…`, `I'm having a problem with my barcode`). They cluster on the
in-person verification page, i.e. exactly where the user has physically travelled somewhere
and it has not worked. The register is calm and blame-free; there is no "Oops", no
exclamation mark anywhere in the harvested set.

### 7b. The reassurance-before-instruction pattern

`Trouble signing in?` opens: "Forgot your password? Locked out of your account? We'll help
you resolve account access issues." Then, before any step:
**"Depending on the authentication methods you've set up, you may still be able to access
your Login.gov account."** Hope is offered first, conditionally and honestly, then the
procedure.

And the follow-through, after recovery: "After you're able to sign in, make sure you've set
up more than one authentication method to avoid losing access to your account." The
prevention advice is placed at the end of the recovery article, when the user is motivated —
not at setup, when they are not. Both placements exist; that is the point.

### 7c. The hard dead-ends — quoted exactly, because they are the product's sharpest edges

These are the strings that make Login.gov's recovery content instructive. A federal identity
service **cannot** social-engineer its way around a lost credential, so it has to say so.

1. **Lost email + forgotten password = the account is gone.**
   > "If you don't have access to the email you used to create your account and you do not remember your password, you need to create a new account with an email address you have access to and re-verify your personal information."
   With the operational detail: "To create a new account, use a different email address than you did when you created your first account."
   And an urgent-case escape: "For urgent matters — for example, to check the status of an in-progress application — directly contact the government agency."

2. **Login.gov states plainly that it cannot help.**
   > "Login.gov cannot grant you access to your account if you get locked out and/or lose your authentication method. **If you get locked out, you'll have to delete your account and create a new one.**"
   Bolded, on the authentication-methods page — i.e. *at the point of choosing*, not only in the recovery article.

3. **The personal key is single-use and is the only key.**
   > "A personal key is a 16-character code that encrypts your personal information with your account."
   > "Your personal key is the only way to access your information if you lose or forget your password."
   > "Personal keys can only be used one time. If you've used a personal key to reset your password before, you have a new personal key."
   > "You'll need to verify your identity again if you reset your password without your personal key."

4. **An expired barcode destroys the in-person progress.**
   > "Your barcode expires 7 days after you verify your information online." / "You'll have to restart the process from the beginning to get a new barcode."

5. **A "more secure" method can force account deletion.**
   > "This is to help prevent you from failing face or touch unlock in the future and forcing an account deletion, especially if your device does not have cloud sync capability."

6. **Fraud revocation has no stated recourse.**
   > "Login.gov may revoke access if it detects fraud or other violations of our Rules of Use."
   No appeal, no contact, no next step. This is the one place the pattern breaks — see defects.

### 7d. Deletion as a recovery route, with a deliberate delay

Login.gov treats "delete your account" as a legitimate outcome of lockout and lists it as one
of three reasons to delete: "You are locked out of your account and have lost access to your
authentication methods."

The no-access deletion path is gated: "As a security measure, Login.gov requires a two-step
process and 24 hour waiting period if you have lost access to your authentication methods and
need to delete your account." Step 5 is a content step, not an interaction step:
"Read through all the information carefully to make sure deleting your account is your only
option." Then:
"You will receive two emails." — "The first email confirms we received your request.
**Your account is not yet deleted. Additional action is required.**" / "The second email is
sent to you 24 hours later."

**Consequences are stated as a three-bullet list before the steps**, under
`If you delete your account:` — "We'll delete your email address, password, and phone
number" / "You won't be able to sign into partner agencies that require a Login.gov account"
/ **"You won't lose your information saved with partner agencies, but you will need to create
a new Login.gov account"**. The third bullet is the reassurance bullet: it separates what is
destroyed (the credential) from what survives (the agency records), which is exactly the
distinction a frightened user cannot make for themselves.

### 7e. Wait-and-retry and alternate-path recovery

- "Please wait 10 minutes and try again." (×3, one per lockout cause)
- "You'll need to wait six hours before you can try to verify your identity again."
- "When it asks you for the security code sent to your phone, select 'Choose another security option'." / "Select any of the other security options you have previously configured, then follow the steps to sign in."
- **"Sign in with your email address, password, and authentication method. Do not create a new account."** — the post-lockout re-verification path.
- "You can try to verify your identity again, either online or in person. Make sure that you are using a valid ID type that is not expired."

The post-lockout step list is itself failure-preventive: each of steps 4, 5 and 6 tells the
user what to *check* before resubmitting — "make sure that your name, address, and other
information on your ID can be easily read before you submit it"; "check that all of your
information is correct on the confirmation screen. If your address or Social Security number
are wrong, you can update that information before you submit it". Retry guidance that
addresses the likely cause of the first failure.

### 7f. The reCAPTCHA page — the weakest recovery content on the site

`Security check failed (reCAPTCHA)` opens with a reassurance-as-justification:
"Login.gov uses reCAPTCHA and other security tools to help make sure it's really you
accessing your account, not someone else." Then, under `How do I access my account?`, a
lead-in "To increase your chances of passing reCAPTCHA try the following:" and six bullets,
every one of which is an instruction to change the user's environment:
"Use the same device and browser you created your Login.gov account with." ·
"Turn off any VPN, ad blockers, and clear your cache." ·
"Try a different time of day, a different browser or update your browser to the latest
version." · "We recommend installing and running antivirus software on your device in case
malware is interfering with Login.gov's security checks." ·
"If none of the above help, contact Login.gov support."

"Increase your chances of passing" concedes that the gate is probabilistic. Recommending the
user install antivirus software is an unusual thing for a federal sign-in service to put in
its help centre, and it relocates the fault to the user's machine.

## T8 Empty states

`[absent]`. No empty state was reachable. The nearest documented no-data surface is
`Account History` — "In Account History, you can see when someone might have signed into your
Login.gov account, as well as the devices used to sign in" — but its zero-state is not
described.

## T9 Notifications & system messages — `[documented]`

**Email is a first-class step, named in the procedure** `[documented]`:
"Check your email for a message from Login.gov." · "Click the 'Confirm your email address'
button in the message." · "Click the 'Reset your password' button in the message." ·
"Check your email for a message from **no-reply@login.gov**." — the sender address is
published, which is itself an anti-phishing control.

**Two-email deletion sequence** `[documented]`, with the interim state spelled out:
"The first email confirms we received your request. Your account is not yet deleted.
Additional action is required." / "The second email is sent to you 24 hours later."

**In-product alerts quoted in help** `[documented]`:
- "You will see a message on your account page alerting you that your account was recently deactivated due to a password reset."
- "If you try to set up face or touch unlock as your only MFA method, you will see an alert advising you to set up a second method immediately after setting up face or touch unlock."

The second is a *nudge against a choice the user has just made*, fired at the moment of
making it. It is also the only place the account-deletion risk surfaces in-product.

**Bolded warnings — the full inventory** `[observed]`. Login.gov bolds very little, and the
selection is revealing:
- `Warning`: "We don't recommend backup codes are your only authentication method. If you ever lose your backup codes, you will not be able to sign in to your account."
- `More secure:` / `Less secure:`
- `There might be different reasons why you need to delete an account:`
- `If you delete your account:`
- `After six hours:`
- `The same ID that you used to enter your information on Login.gov.`
- `The barcode that Login.gov emailed to you.`
- "**If you get locked out, you'll have to delete your account and create a new one.**"

**Anti-phishing / fraud messaging** `[documented]` — a dedicated six-article section whose
titles are the user's actual utterances: `I'm receiving one-time codes that I didn't request`
· `How do I make sure the messages I'm receiving are real?` ·
`How do I protect my account from fraud?` · `What are some common scams?` ·
`How do I report suspicious activity?`. The compromise-recovery actions are three
imperatives: "Immediately change your password" / "Review your authentication methods to
ensure they are up to date and secure" / "Contact Login.gov using the contact form or phone
number on our Contact us page."

**`Login.gov system status`** sits in the footer of every page as a named link, and the
homepage carries `meta-system-status: Login.gov site up and running` in the page metadata —
machine-readable status in the head of every document.

## T10 Disclosures, legal & compliance

**The `.gov` banner** `[observed]` — the US federal government's standard trust disclosure,
rendered on every page as a progressive-disclosure widget:

> "An official website of the United States government" → `Here's how you know` →
> "**Official websites use .gov** — A **.gov** website belongs to an official government organization in the United States."
> "**Secure .gov websites use HTTPS** — A **lock** or **https://** means you've safely connected to the .gov website. Share sensitive information only on official, secure websites."

`Here's how you know` is the string worth stealing: a trust claim followed by an
expandable *proof*, rather than a trust badge. The second panel also teaches a transferable
security habit ("Share sensitive information only on official, secure websites") rather than
only asserting this site's safety.

**Scope limitation, stated twice** `[observed]`:
"We only use the documents and photos to confirm your identity. Login.gov does not make any
determination on eligibility for agency services." And: "Login.gov is a secure, government
website that adheres to the highest standards in data protection. We ask for your consent
before we share your verified information with the partner agency."

**Data source disclosed in the step** `[documented]`: "we will verify your personal
information against **public and proprietary records**." The word "proprietary" is not
glossed — a user is told a commercial data broker is involved without being told that.

**Provenance** `[observed]`: "Login.gov is provided by Technology Transformation Services
(TTS)." and "An official website of the General Services Administration".

**Accessibility statement** `[observed]` — two sections only, `Our commitment` and
`Evaluation`:
- "Login.gov is committed to being accessible for all of our users. Our focus is to continuously improve how people of all abilities are able to use Login.gov to easily access government applications and services."
- "Login.gov is regularly evaluated through a series of semi-automated evaluation tools and manual evaluation by expert reviewers. After each evaluation, we develop a plan to address any areas of improvement."
- Four downloadable conformance reports, with format and size in the link text: `Authentication report [DOCX, 168KB]` · `Authentication report [PDF, 259KB]` · `Identity verification report [DOCX, 354KB]` · `Identity verification report [PDF, 220KB]` — filenames dated `2025-02-26`, `VPAT2.5Rev508` and `VPAT2.4Rev508`.

**Assessment**: this is the *weakest* accessibility statement in the batch as a piece of
content, and the *strongest* as an evidence trail. It names no WCAG version, no conformance
level, no known defects, no remediation dates, no feedback route and no enforcement body —
it defers all of that to the GSA statement. But it publishes two separate VPATs, in two
formats each, with the product split into its two regulated surfaces
(Authentication / Identity Verification). NHS publishes prose and criterion numbers;
Login.gov publishes artefacts. Neither publishes both.

**Also defective**: the two VPATs are at different revisions (2.5 and 2.4) despite carrying
the same date, so the two halves of one product were assessed against two versions of the
template.

## T11 Content architecture & page templates — **PRIORITY**

**Help-centre architecture: six categories → articles → sub-articles, three levels deep**
`[observed]`. The `Create my account` and `Trouble signing in` branches both nest a third
level under the authentication-method axis, and the two third levels **mirror each other
exactly**:

| Setup branch (`Create my account`) | Failure branch (`Trouble signing in`) |
|---|---|
| `Face or touch unlock` | `Issues with face or touch unlock` |
| `Authentication application` | `Issues with authentication applications` |
| `Security key` | `Issues with security keys` |
| `Text/SMS or phone call` | `Issues with text/SMS or phone call` |
| `Backup codes` | `Issues with backup codes` |
| `Government employee ID` | `Issues with government employee ID` |

**Every authentication method has a matching `Issues with…` article.** A one-to-one
setup/failure IA is the most reusable structural pattern in this file: the failure tree is a
mirror of the capability tree, so no method can ship without its troubleshooting page. It is
also self-auditing — a missing mirror is visible in the nav.

**The `Help with agencies` axis is a second, orthogonal tree** `[observed]`:
`Internal Revenue Service (IRS)` · `Medicare.gov` · `Social Security Administration (SSA)` ·
`Trusted Traveler Programs (TTP)` · `OPM Retirement Services Online` ·
`System for Award Management (SAM)`. Login.gov ships per-partner help pages, i.e. it accepts
support load for journeys it does not own. That is a content-ops decision with real cost,
comparable to Wise writing a help article for one bank's decline behaviour.

**Article template** `[observed]`: H1 → standfirst → H2 sections (procedural H2s are
`How to <verb>`) → numbered steps with inline sub-bullets → `Related articles` →
`Back to top`. Every page ends with `Related articles`, a 3–4 item list.

**Defect** `[observed]`: **four of twelve articles have no standfirst at all** —
`Why isn't my email or password working?`, `How do I sign in if I lost my phone or personal
key?`, `Why is my account locked?` and `How do I delete my account?` jump from H1 straight
to an H2 or a bolded list lead-in. These are precisely the four highest-anxiety pages, and
they are the four that skip the orienting sentence.

**Defect** `[observed]`: several H2s are sentence fragments ending in a colon —
`If your account was locked when you attempted to sign in:`,
`Follow these steps to delete your account if you do NOT have access to your authentication
methods:` — which reads badly in a screen-reader heading list, and is inconsistent with the
noun-phrase H2s elsewhere (`How to verify in person`). The second also shouts `NOT` in caps,
a device used nowhere else.

## T12 FAQs

`[observed]` There is no FAQ accordion. The help centre *is* the FAQ: H1s are questions,
and the article body is the answer. Question inventory, verbatim, with placement:

| Question | Placement |
|---|---|
| `What is Login.gov?` | Marketing nav + page H1 |
| `Who uses Login.gov?` | Marketing nav |
| `How does it work?` | H2, What is Login.gov |
| `Already have an account?` | H3, What is Login.gov |
| `Why isn't my email or password working?` | Help H1 |
| `How do I sign in if I lost my phone or personal key?` | Help H1 |
| `Why is my account locked?` | Help H1 |
| `Why is my account deactivated?` | Help H1 |
| `How do I delete my account?` | Help H1 |
| `How do I access my account?` | H2, reCAPTCHA page |
| `What do I bring to the Post Office?` | H3, verify in person |
| `Which Post Office can I visit to verify my identity?` | H3, verify in person |
| `What happens when I go to the Post Office?` | H3, verify in person |
| `How do I change or add email addresses associated with my account?` | Help nav |
| `How do I change the phone number associated with my account?` | Help nav |
| `How do I change the email address shared with a partner agency?` | Help nav |
| `How do I add or change the authentication method on my account?` | Help nav |
| `How do I relink my account with a partner agency?` | Help nav |
| `How do I fix duplicate accounts?` | Help nav |
| `How do I make sure the messages I'm receiving are real?` | Help nav, fraud |
| `What are some common scams?` | Help nav, fraud |
| `How do I report suspicious activity?` | Help nav, fraud |

**Four title shapes**: `How do I …?` (task), `Why …?` (adverse outcome),
`I <experienced problem>` (confession), `What …?` (orientation). Identical to the Wise
taxonomy, arrived at independently — which is evidence the shape is general rather than
brand-specific.

The three Post Office questions are the best cluster: they are exactly the three things a
person walking into a physical building needs, in the order they need them (what to carry,
where to go, what will happen).

## T13 Terminology & glossary

| Term | Login.gov's usage | Note |
|---|---|---|
| `personal key` | "a 16-character code that encrypts your personal information with your account" | Coined; defined once, on a troubleshooting page rather than on the create-account page |
| `partner agency` | The relying party | Also `participating agency` and `government agency` — three labels, one entity |
| `one-time code` | The OTP | Also `security code` in the same journey — see defects |
| `authentication method` | The MFA factor | Also `security option` (the actual button), `MFA method`, `second layer of security`, `another method` |
| `multi-factor authentication (MFA)` | Expanded once, then abbreviated | Never leads with the acronym |
| `identity verification` | The proofing process | Consistently used over "identity proofing" — the industry term is rejected |
| `face or touch unlock` | The passkey/biometric method | Chosen over "biometrics", "passkey" (which appears only in the technical paragraphs) and "Face ID" |
| `device nickname` | User-supplied credential label | |
| `backup codes` | Always paired with `(less secure)` in the list | |
| `Government employee ID` | Public-facing name | `PIV or CAC card for federal government employees or military` in the taxonomy; `PIV/CAC` in nav |
| `deactivated` vs `locked` | Two distinct states, two pages | Never contrasted for the user |
| `Rules of Use` | Named policy, invoked for revocation | Not linked from the page that invokes it |
| `Account History` / `History` / `Events` | Three labels across one feature | |
| `retail associate` | The USPS clerk | Notably specific; helps the user say the right thing |
| `barcode` | The in-person credential | |
| `relink` / `duplicate accounts` | Account-repair vocabulary | |
| `Technology Transformation Services (TTS)` | The provider | |

**The authentication taxonomy is graded, in the label itself** `[observed]`:

> **More secure:** `Security key` · `Face or touch unlock` · `Authentication application` · `PIV or CAC card for federal government employees or military`
> **Less secure:** `Text message` · `Phone call` · `Backup codes`

Publishing a security *ranking* on the choice screen — rather than presenting seven equal
options — is the strongest terminology decision on the site. The list page reinforces it in
prose: "some authentication methods like face or touch unlock, security keys, and PIV/CAC
cards are more secure against phishing and theft", and the method list itself carries an
inline qualifier: `Backup codes (less secure)`.

**The sentence that does the most work** `[observed]`:
"We encourage you to add two authentication methods to your account. If you lose access to
your primary authentication method (e.g. losing your phone), you'll have a second option to
use to access your account." — recommendation, mechanism, and the concrete failure it
prevents, in two sentences, before the options are listed.

## T14 Voice, tone & accessibility

**Person.** Second person for the user throughout; first-person plural for the service
("We encourage you", "We don't recommend", "we will verify your personal information",
"We ask for your consent", "we may be able to verify your address by mail instead").
The exception is the help-centre navigation, which is first person (`Create my account`,
`Verify my identity`) — an unstated and systematic split.

**Register.** Flat, procedural, unhurried. Contractions used freely (`don't`, `you'll`,
`isn't`, `didn't`, `we'll`). **No exclamation marks except one**: `Success!` at step 7 of
account creation — a single celebratory token, placed at the only genuinely good moment in
the flow. Everything else is level.

**Hedging is honest and consistent**: "you **may** still be able to access your Login.gov
account", "we **may** be able to verify your address by mail instead", "your account
**might** be deactivated temporarily", "In-person identity verification is only available
for **some** partner agencies", "To **increase your chances** of passing reCAPTCHA". The
service does not promise outcomes it does not control.

**Tone under adversity.** The deletion and lockout pages are the test, and they hold up:
no apology, no blame, no reassurance that is not true. "Login.gov cannot grant you access to
your account" is stated flatly, in bold, in the setup article where it can still change the
user's behaviour. That is the correct place for it, and most services would bury it.

**Language access** `[observed]`: four full site mirrors — `English` · `Español` ·
`Français` · `中文 (简体)` — with **path-mirrored URLs** (`/es/help/create-account/…`), so
every help article exists in four languages at a predictable address. The toggle appears
twice per page (desktop header and mobile menu), labelled `Language` with a globe icon.

**Accessibility practice observed** `[observed]`: `Skip to main content` first in DOM;
`Back to top` at the foot of every help article anchoring to `#main-content`; a text
alternative on the close icon (`Close`); the flag image carries `U.S. flag` alt text;
download links carry format and size in the link text (`[DOCX, 168KB]`).

**Responsive instructions are written, not assumed** `[documented]`:
"On larger screens, the menu is on the left sidebar." / "On smaller screens or mobile
devices, you may need to navigate to a button labeled 'Menu' first." Help content that
accounts for two viewports in the same step is rare and correct.

### Negative findings, recorded honestly

- **Direct contradiction between two recovery pages.** `Why is my account locked?` step 2: "Sign in with your email address, password, and authentication method. **Do not create a new account.**" `Why isn't my email or password working?`: "you need to create a new account with an email address you have access to and re-verify your personal information." Opposite instructions, no cross-reference explaining which case applies.
- **`one-time code` vs `security code`** for the same artefact, inside one journey. The overview says "Entering a one-time code that you receive by text or by phone call"; the lost-phone page says "your phone must be present to get the security code to sign in"; the lockout page says "requested too many security codes".
- **`authentication method` in every sentence, `Choose another security option` on the button.** The help text and the UI use different nouns at the exact moment the user is looking for the escape hatch.
- **`Government employee ID` / `PIV or CAC card for federal government employees or military` / `Using your federal government employee or military ID (PIV or CAC)` / `PIV/CAC`** — four labels for one method across four surfaces.
- **`Face or touch unlock` is listed under `More secure:` while carrying the strongest self-warning on the site** ("forcing an account deletion"). The risk is disclosed in step 5 of a sub-page, not beside the label where the choice is made.
- **The `deactivated` page is a stub** — one standfirst, two bullets, no H2 except `Related articles`, no steps, and no recourse at all for the fraud-revocation case it introduces. Users arriving from an in-product "your account was recently deactivated" message get nothing actionable.
- **Password rules exist in three versions**: full (create-account), full again verbatim (forgot-password), and a one-line reduction on the face-unlock page ("It must be at least 12 characters long") with none of the other constraints.
- **Two submit labels in one flow**: `Submit` at the email step of account creation, `Continue` at the email step of password reset.
- **`deleting your account` is located by scroll position, not by label**: "Scroll to the bottom and click on the 'deleting your account' link" — a brittle instruction for a lowercase mid-sentence link.
- **Mobile and desktop passkey option labels disagree on one page**: `"This device" or "Phone or tablet"` (mobile paragraph) vs `"This device", or "Use a phone or tablet"` (desktop paragraph).
- **Support explicitly declines to help on a recommended method**: "The Login.gov help desk unfortunately does not provide specific instructions for this pathway as this flow is by a third party. We recommend the vendor's instructions, or contacting the vendor directly for assistance. (e.g. Apple for macOS)."
- **Three escalation targets, no routing rule**: "contact Login.gov support" (reCAPTCHA, in-person), "directly contact the government agency" (forgot password), "Contact Login.gov using the contact form or phone number on our Contact us page" (fraud).
- **The in-person page contradicts the accepted-ID page by its own admission**: "Although they are an accepted ID type, you cannot currently use a U.S. passport book/card nor mobile driver's license (mDL) to verify in person at the Post Office."
- **Eleven of twelve help pages ship with empty `meta-description`, `og:description` and `twitter:description`.** Every link preview and search snippet for the recovery content is blank.
- **`How do I create a Login.gov account`** omits its question mark, in both H1 and nav.
- **Fraud section has three names** (`Fraud concerns` / `Fraud and security` / `/fraud-concerns/`).
- **The two published VPATs use different template revisions** (2.5 and 2.4) for one product, both dated 2025-02-26.
- **`Search` renders as a doubled label** on help pages, and `Sign in with Login.gov` appears twice in the mobile menu markup.

---

## Transferable patterns

1. **Mirror the failure tree onto the capability tree.** Every authentication method has a
   matching `Issues with <method>` article, one-to-one. The IA makes a missing
   troubleshooting page visible, and it gives support content a shipping gate. Directly
   applicable to payment methods, KYC document types, and integration surfaces.
2. **Put the fallback inside the step, not in the troubleshooting article.** "If you have
   trouble taking photos, you may also be able to verify your identity in person" appears in
   step 1, at the moment of possible failure. Steps 1 and 3 of identity verification each
   name their alternate route inline.
3. **Grade the options in the label.** `More secure:` / `Less secure:` / `Backup codes (less
   secure)`. When options differ in risk, say which, on the choice screen. Do not present
   seven equal radio buttons.
4. **State the unrecoverable case at the point of choosing, in bold.** "Login.gov cannot
   grant you access to your account if you get locked out… you'll have to delete your account
   and create a new one" sits on the setup page, where the user can still add a second
   method. Recovery copy in the recovery article is too late.
5. **Separate what is destroyed from what survives.** "We'll delete your email address,
   password, and phone number" / "You won't lose your information saved with partner
   agencies, but you will need to create a new Login.gov account." The user cannot make that
   distinction alone, and it is the difference between panic and a decision.
6. **Reassure conditionally, then instruct.** "Depending on the authentication methods you've
   set up, you may still be able to access your Login.gov account" — hope offered honestly,
   before the steps, without promising an outcome.
7. **Put the prevention advice at the end of the recovery article.** "After you're able to
   sign in, make sure you've set up more than one authentication method" — the user is
   motivated exactly once, and it is not at setup.
8. **Publish the sender address.** "Check your email for a message from no-reply@login.gov"
   is anti-phishing content disguised as a procedural step.
9. **`Here's how you know`** — a trust claim followed by an expandable proof, rather than a
   badge. And the proof teaches a general habit, not just this site's safety.
10. **Say what the product will not decide.** "Login.gov does not make any determination on
    eligibility for agency services." One sentence that prevents a whole class of misdirected
    support contacts and misplaced blame.
11. **Prohibitions carry concrete examples.** "Common phrases or repeated characters, like
    abc or 111" beats "avoid common patterns" every time.
12. **Write the responsive variant into the instruction.** "On larger screens, the menu is on
    the left sidebar. On smaller screens… a button labeled 'Menu'."

## Caveats & gaps

- **Everything past `secure.login.gov` is `[documented]`, never observed.** No account was created, no sign-in attempted, no identity verification started, no photo taken, no SSN or phone number entered. In-product strings quoted here are quoted *by the help centre*, which is a reliable but second-hand source — the live rendering, ordering and error behaviour were not seen.
- **Login.gov publishes no content style guide, voice-and-tone document or error-message specification** on its public site. Unlike the other four products in this batch, there is no standard to compare the live copy against, so T14's "rules" are observed regularities, not published policy. `developers.login.gov` was out of scope and may contain UX-writing guidance.
- **The `accessibility-statement` URL returned empty**; the live statement is at `/accessibility/` and was harvested. The four VPAT documents were not downloaded or read — their conformance findings are unknown, so no WCAG claim can be attributed to Login.gov here.
- **No Spanish, French or Chinese page was read as content.** Multilingual coverage is documented structurally (path-mirrored URLs across four locales) but nothing is claimed about translation quality, register, or whether the four mirrors stay in sync.
- **`New Login.gov Experience`, `Who uses Login.gov?`, `Privacy & security`, `About us`, `Contact us` and `status.login.gov` were not fetched.** The privacy/security page in particular would likely carry the data-handling disclosures only summarised here.
- **The `Help with agencies` sub-pages (IRS, Medicare, SSA, TTP, OPM, SAM) were not opened.** Six per-partner help pages are a significant unharvested surface and the best available evidence of how Login.gov writes about journeys it does not own.
- **No empty state, no search-results page, no zero-data surface** was reachable. `[absent]`
- **Notification/email bodies not seen** — only the buttons and subjects as quoted in help articles.

## Sources

1. https://www.login.gov/
2. https://www.login.gov/what-is-login/
3. https://www.login.gov/help/
4. https://www.login.gov/help/create-account/authentication-methods/
5. https://www.login.gov/help/create-account/authentication-methods/face-or-touch-unlock/
6. https://www.login.gov/help/create-account/how-do-i-create-an-account/
7. https://www.login.gov/help/trouble-signing-in/overview/
8. https://www.login.gov/help/trouble-signing-in/forgot-your-password/
9. https://www.login.gov/help/trouble-signing-in/how-to-sign-in/
10. https://www.login.gov/help/trouble-signing-in/why-is-my-account-locked/
11. https://www.login.gov/help/trouble-signing-in/security-check-failed/
12. https://www.login.gov/help/manage-your-account/deactivated/
13. https://www.login.gov/help/manage-your-account/delete-your-account/
14. https://www.login.gov/help/verify-your-identity/overview/
15. https://www.login.gov/help/verify-your-identity/verify-your-identity-in-person/
16. https://www.login.gov/help/fraud-concerns/overview/
17. https://www.login.gov/accessibility/
18. https://www.login.gov/accessibility-statement/ *(blocked — empty body; the live statement is source 17)*
