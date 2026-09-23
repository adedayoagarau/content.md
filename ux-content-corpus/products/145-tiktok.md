# 145. TikTok

| Field | Value |
|---|---|
| Domain | `MEDIA` — Entertainment, media, and social |
| Industry / sub-vertical | Short-form video social platform (algorithmic feed, creation tools, under-13 separate experience) |
| Primary URL | https://www.tiktok.com/ |
| Corpus rank | 145 |
| Benchmark strength (source list) | Creation onboarding and safety cues |
| Locale / market observed | en (`/community-guidelines/en/`, `/safety/en/`). US-specific provisions called out inline (under-13 experience, NCMEC reporting, FTC/WiredSafety resources) |
| Platform observed | Web (Community Guidelines microsite, Safety Center resource pages). TikTok Help Center and the main Safety Center shell are client-rendered and blocked. |
| Auth state | Unauthenticated public surfaces only. **No feed viewed, no individual user content accessed, no social feature used.** |
| Regulatory posture | The most explicitly framework-cited policy set in this domain. Named instruments: **UN Guiding Principles on Business and Human Rights**, **International Bill of Human Rights**, **Convention on the Rights of the Child**, **Santa Clara Principles**, **Universal Declaration of Human Rights**; **NCMEC** reporting for youth sexual abuse/exploitation and youth sex trafficking; COPPA-driven separate under-13 US experience with a dedicated Privacy Policy and third-party content curation (**Common Sense Networks**); independent fact-checking partners; regional **Advisory Councils**; app-store age ratings (`12+` Apple, `Teen` Google Play) |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 attempted / 9 usable |
| Harvest completeness | **Partial.** Community Guidelines and one Safety Center resource page retrieved in full and are rich. **Blocked:** `support.tiktok.com` (Help Center, client-rendered), `tiktok.com/safety/en` (shell), `Guardian's Guide`, Safety Center `Tools` page, and two CG sections (`sensitive-mature-themes`, `account-integrity`) returned empty bodies. On the CG pages that did render, the `NOT ALLOWED` / `ALLOWED` bullet lists are **client-rendered on some sections and present on others** — so several policy sections were captured as prose-plus-empty-headers. **The brief's "creation-flow copy" is largely `[absent]`** — no creation UI, no upload flow, and no in-app string set was reachable. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Community Guidelines (canonical) | https://www.tiktok.com/community-guidelines/en/ | **Serves the superseded March 2023 version** with a banner announcing the April 2024 replacement — see T9 |
| CG — Overview | https://www.tiktok.com/community-guidelines/en/overview | Current (Released 17 Apr 2024, Effective 17 May 2024). The four-pillar moderation model |
| CG — Community Principles | https://www.tiktok.com/community-guidelines/en/community-principles | Framework citations; **the eight principles themselves did not render** |
| CG — Enforcement | https://www.tiktok.com/community-guidelines/en/enforcement | **Priority artefact.** Public-interest exceptions, detection, notice and appeals |
| CG — Youth Safety and Well-Being | https://www.tiktok.com/community-guidelines/en/youth-safety | **Priority artefact.** Age gates + the full `RESTRICTED (18 years and older)` quick guide |
| CG — Safety and Civility | https://www.tiktok.com/community-guidelines/en/safety-civility | Six policy sections with full definition blocks; band lists empty |
| CG — Integrity and Authenticity | https://www.tiktok.com/community-guidelines/en/integrity-authenticity | **Still dated `Last updated, March 2023`.** Full four-band lists rendered |
| CG — Mental and Behavioral Health | https://www.tiktok.com/community-guidelines/en/mental-behavioral-health | Prose + definitions; band lists empty |
| Safety Center — For Parents | https://www.tiktok.com/safety/resources/for-parents | **Priority artefact.** Family Pairing control inventory, under-13 experience, reporting |
| Help Center | https://support.tiktok.com/en | **Blocked** — empty body |
| Safety Center home | https://www.tiktok.com/safety/en | **Blocked** — empty body |
| Guardian's Guide | https://www.tiktok.com/safety/en/tools-and-guides/guardians-guide | **Blocked** — empty body |
| Safety Center — Tools | https://www.tiktok.com/safety/resources/tools | **Blocked** — empty body |

Also attempted, empty: `/community-guidelines/en/sensitive-mature-themes`, `/community-guidelines/en/account-integrity`, `/community-guidelines/en/privacy-security-services`, `/safety/en/policies-and-engagement/protecting-teens`, `/safety/en/family-pairing`, `/safety/en/screen-time`.

---

## T1 Navigation & IA labels

**No global product navigation was reachable** `[observed]`. `tiktok.com`'s app shell is client-rendered. The Community Guidelines microsite renders only a logo and a `Skip to main content` link, with inter-section navigation via a `Next article` / `Read next` pager at the foot.

**Community Guidelines section names — the IA is the policy taxonomy** `[observed]`

Confirmed section slugs and titles:

| Section | Status |
|---|---|
| `Overview` | retrieved |
| `Community Principles` | retrieved (prose only) |
| `Safety and Civility` | retrieved |
| `Mental and Behavioral Health` | retrieved |
| `Sensitive and Mature Themes` | slug confirmed, body empty |
| `Integrity and Authenticity` | retrieved (stale-dated) |
| `Youth Safety and Well-Being` | retrieved |
| `Enforcement` | retrieved |

The section names are **paired abstract nouns** — `Safety and Civility`, `Integrity and Authenticity`, `Mental and Behavioral Health`, `Youth Safety and Well-Being`, `Sensitive and Mature Themes`. Five of the eight follow the `X and Y` shape. This is values-framing rather than prohibition-framing: compare YouTube's `Spam & deceptive practices` / `Violent or dangerous content` / `Regulated goods`, which name the *banned thing*. TikTok names **the value being protected** and derives the prohibition from it inside the section.

`Youth Safety and Well-Being` is the clearest case — YouTube's equivalent is `Child safety policy` (a rule), TikTok's is a state to be maintained. The trade-off is scannability: a user looking for "what happens if I post X" cannot route from these labels.

**The pager is the only navigation** `[observed]`: `Next article` → `Community Principles` → `Read next`. A linear document, not a browsable tree — which works for a policy read-through and fails for lookup.

**Safety Center IA, from the one page that rendered** `[observed]`: the URL scheme reveals two coexisting structures — `/safety/resources/for-parents` and `/safety/en/tools-and-guides/guardians-guide`, i.e. a `resources/` tree and an `en/tools-and-guides/` tree. Section labels observable from link text and headings: `Safety Center`, `For Parents: Safety Center`, `Tools page`, `Youth Portal`, `Guardian's Guide`, `in-app Safety Center`, `safety toolkit`, `Transparency Center`.

**`in-app Safety Center` vs `Safety Center` (the website) is a naming collision** `[observed]`. The enforcement page says "You can view the status of your appeal in the **in-app Safety Center**", while the marketing site is also called `Safety Center`. Two different surfaces, one name, distinguished only by the modifier `in-app`.

**Defect** `[observed]`: the for-parents page ends with a resource list containing **an unlabelled item** — "A program of the Federal Trade Commission that provides practical tips from the government and technology industry on protecting against internet fraud." The description renders with **no link name** (the FTC programme, presumably OnGuardOnline/`consumer.ftc.gov`, is unnamed). A bare description with no title, as the final item in a child-safety resource list.

Similarly, the under-13 contact instruction renders as: "If you learn that your child under the age of 13 has registered for a 13+ TikTok account, contact us at: We will promptly take appropriate action." — **`contact us at:` followed by nothing.** The email address or form has not rendered. This is the most serious defect in the file: the sole stated route for a parent to report an underage account is a dangling colon.

## T2 Value proposition & headline patterns

**Mission statement used as the opening of a policy document** `[observed]`. Both CG versions open on it:

> 2024: "TikTok is a source of entertainment and enrichment where you can discover, create, and connect with others across the world. **Our mission is to inspire creativity and bring joy.**"
> 2023: "**Our mission is to inspire creativity and bring joy.** We aspire to unlock human imagination by enabling creative expression and being a source of entertainment and enrichment everywhere."

`inspire creativity and bring joy` is the load-bearing brand line and it appears in the Community Guidelines, the Safety Center parent page, and the moderation framing. A **mission statement doing work inside a rulebook** — the guidelines are positioned as instrumental to the mission rather than as a constraint on it.

The 2024 rewrite is the interesting comparison. The 2023 opening is aspirational and abstract (`unlock human imagination`); the 2024 opening is functional and second-person (`where you can discover, create, and connect`). The mission sentence moved from first position to second. Over one revision the document became less manifesto and more product.

**Section openings are all value-first, prohibition-second** `[observed]`. The construction is remarkably consistent — a sentence of principle, then `We do not allow…`:

| Section | Value sentence | Prohibition |
|---|---|---|
| Safety and Civility | "Physical and psychological safety form the foundation of individual well-being, and civility is key to a thriving community. Being civil does not mean you must always agree, but rather it is about recognizing everyone's inherent dignity…" | "**We do not allow** any violent threats, promotion of violence, incitement to violence…" |
| Hate speech | "TikTok is enriched by the diversity of our community. Our differences should be embraced, rather than a cause for division." | "**We do not allow** any hate speech, hateful behavior, or promotion of hateful ideologies." |
| Harassment | "We welcome the respectful expression of different viewpoints, and want to ensure that anyone can share their voice **without the fear of being degraded or bullied**." | "**We do not allow** harassing, degrading, or bullying statements or behavior. This includes responding to such acts with **retaliatory harassment**." |
| Suicide/self-harm | "We want TikTok to be a place where you can discuss emotionally complex topics **in a supportive way without increasing the risk of harm**." | "**We do not allow** showing, promoting, or sharing plans for suicide or self-harm." |
| Body image | "We want TikTok to be a place that **encourages self-esteem and does not promote negative social comparisons**." | "**We do not allow** showing or promoting disordered eating…" |
| Dangerous challenges | "We welcome opportunities to participate in fun and creative trends. Most activities or challenges are suitable for everyone and bring people together, **but some pose a risk of significant injury**." | "**We do not allow** showing or promoting dangerous activity and challenges." |
| Misinformation | "In a global community, it is natural for people to have different opinions, **but we seek to operate on a shared set of facts and reality**." | "**We do not allow** inaccurate, misleading, or false content that may cause significant harm…" |
| Synthetic media | "**We welcome the creativity that new artificial intelligence (AI) and other digital technologies may unlock.** However, AI can make it more difficult to distinguish between fact and fiction…" | "Synthetic or manipulated media that shows realistic scenes **must be clearly disclosed**." |

`We do not allow` is the fixed prohibition formula across every section — never "is prohibited", never "users may not", never passive. One actor, one verb, every time. That consistency is the single most reusable feature of this document set: a reader learns the formula once and can then scan for it.

And the value sentences are doing real work rather than decorating. `Being civil does not mean you must always agree` pre-empts the most common objection to a civility rule *inside the rule*. `We welcome the creativity that new AI… may unlock` concedes the upside before restricting. `Most activities or challenges are suitable for everyone` narrows the scope before prohibiting.

**Safety Center headline** `[observed]`: `For Parents: Safety Center` — then the opening is a direct address: "**Hello, parents!**" Followed by scope ("On this page you'll find information and resources to help you understand TikTok, the tools and controls you and your teen can turn on together…") and then, notably, a piece of parenting advice rather than product guidance: "More generally, we encourage you to take an active role in your teen's online experience overall. Start the conversation early about internet safety, online privacy, and the options available to them. **Your guidance can be invaluable!**"

Two exclamation marks in two paragraphs, on a child-safety page. The register is warm to the point of chirpy, and it is the only place in the harvested TikTok corpus where that voice appears — the Community Guidelines are entirely flat.

## T3 CTA inventory

Extremely thin — the reachable surfaces are documents, not interfaces.

| CTA / link label (verbatim) | Context | Notes |
|---|---|---|
| `Skip to main content` | CG canonical page, first in DOM | Accessibility |
| `Check out the new Community Guidelines here.` | Stale-CG banner | `here` as the link target — weak link text on the one link that matters |
| `More information` | Every CG policy section | The progressive-disclosure toggle; described in the document's own instructions: "Under each section you can click **More information** for definitions, examples, and clarifications" |
| `Next article` / `Read next` | CG pager | Two labels for one control, adjacent |
| `Tools page` | For-parents foot | |
| `Youth Portal` / `Guardian's Guide` | For-parents, youth-safety | Two named destinations |
| `Transparency Center` | Enforcement foot | "Learn more about our enforcement efforts through our Transparency Center." |
| `report it` / `report a specific video, user, or comment` | Multiple sections | Reporting as the recurring CTA |
| `file a copyright report` / `a trademark report` | Integrity section | Two named report types |
| `appeal the decision` | Enforcement, youth safety | The remedy, stated as a verb phrase not a button |
| `block` | Safety tools | "Block another from contacting them at any time" |
| `restricting options for comments, duet, stitch, and messaging` | Repeated ×2 | Four named controls offered as the harassment remedy |

**Observation.** TikTok's only real CTA across the whole harvested set is **`report it`**, and it appears in six sections. The second is `appeal`. This is a policy corpus whose interaction model is *notice → report → appeal*, and its CTA inventory reflects exactly that.

**`Check out the new Community Guidelines here.`** is the worst string in the file: a stale document's only route to its own replacement, with `here` as the link text and a breezy `Check out` for a governing-policy change.

## T4 Onboarding & getting-started — creation flow

**`[absent]` for the creation flow itself.** No upload screen, no camera UI, no editor, no publish flow, and no in-app string set was reachable. `support.tiktok.com` is client-rendered and blocked.

What *is* observable is **the creation feature vocabulary, as it appears inside safety copy** `[observed]` — which is a genuinely interesting angle: TikTok's creation tools are named in the Community Guidelines primarily as **context-provision and harm-mitigation instruments**.

> "To help us in our review, we encourage you to **clearly show context** using features such as **captions, voice over, or stickers.**" (Enforcement — public interest exceptions)
> "Synthetic or manipulated media that shows realistic scenes must be clearly disclosed. This can be done through the use of a **sticker or caption**…" (Integrity)
> "we use objective indicators to help us understand it, such as **captions and hashtags**." (on doxxing intent)
> "Content that may appear neutral, such as featuring a quote from a hateful organization or individual, **must make clear that there is no intent to promote it.**"

So four creation features — `captions`, `voice over`, `stickers`, `hashtags` — are framed as the creator's mechanism for signalling intent to a moderation system. The creation-flow content design problem is therefore inverted from what you would expect: the copy's job is not to help you make a video, it is to tell you that **your captions and stickers are read as evidence**.

**Named creation and interaction features, from safety copy** `[observed]`: `duet` · `stitch` · `comments` · `messaging` / `direct messaging` · `captions` · `voice over` · `stickers` · `hashtags` · `QR codes` · `watermark` (in "content with someone else's visible watermark or superimposed logo") · `For You feed (FYF)` · `profile` (photo, username, bio) · `Liked Videos` · `TikTok analytics tool`.

`duet` and `stitch` are both **lowercase in every occurrence** — "restricting options for comments, duet, stitch, and messaging" — treating the coined feature names as common nouns rather than proper ones. Consistent, and a deliberate de-branding of features that are otherwise TikTok's most distinctive verbs.

**The age-gated onboarding path is documented** `[documented]`:

> "This starts by **being old enough to use TikTok. You must be 13 years and older to have an account.** There are additional age limitations based on local law in some regions."
> "If you create a new account in the United States with a birthdate that shows you are under the age of 13, **you will automatically enter into this experience.**"

So the signup birthdate is a routing decision, not a gate — an under-13 US registrant is *diverted* into a different product rather than refused. `automatically enter into this experience` is the operative phrase and it is the clearest statement of a **dual-product age architecture** in this domain set.

**Family Pairing setup is specified as a two-device physical ritual** `[observed]`:

> "To turn on Family Pairing, **two devices are required**: a parent or guardian's logged-in TikTok account as well as the teen's logged-in TikTok account. On both devices, navigate to the **Content & Activity** settings to begin the Family Pairing process. **Teens must scan a QR code that is displayed from their parent or guardian's account in-app** to pair the accounts and turn on Family Pairing features."

Both parties must be present and consenting, with a QR handshake. Compare Spotify's managed-account flow (141), which also includes a physical-world step ("hand the device to their parent or guardian") but for reporting rather than setup. Both products encode **co-presence into the onboarding of a supervision feature** — a pattern worth naming: the control cannot be established remotely or unilaterally.

## T5 Form & field labels

`[absent]` — no forms reachable. The only field-adjacent labels are the Family Pairing control names (see T10) and `Content & Activity` as the settings location.

## T6 Status & state language — the four-band content state model

**This is TikTok's defining content artefact and the strongest section in the file.** `[observed]`

Every policy in the Community Guidelines resolves content into **one of four states**, rendered as caps-lock band labels:

| Band label (verbatim) | Meaning |
|---|---|
| `NOT ALLOWED` | Removed |
| `RESTRICTED (18 years and older)` | Visible only to adults |
| `FYF INELIGIBLE` | Stays up, stays on your profile, but is not recommended |
| `ALLOWED` | Permitted |

The bands are **rendered as headings under each policy**, so a creator reading any rule sees the same four slots. In the sections where the lists rendered (`Integrity and Authenticity`), the effect is a per-policy decision table:

> **Misinformation**
> `NOT allowed` — "Misinformation that poses a risk to public safety or may induce panic about a crisis event or emergency, including **using historical footage of a previous attack as if it were current**, or incorrectly claiming a basic necessity (such as food or water) is no longer available in a particular location" · "Medical misinformation…" · "Climate change misinformation that undermines well-established scientific consensus…" · "Dangerous conspiracy theories that are violent or hateful…" · "Specific conspiracy theories that name and attack individual people" · "Material that has been edited, spliced, or combined… in a way that may mislead a person about real-world events"
> `FYF ineligible` — "**General** conspiracy theories that are unfounded and claim that certain events or situations are carried out by covert or powerful groups, such as 'the government' or a 'secret society'" · "Unverified information related to an emergency or unfolding event where the details are still emerging" · "**Potential high-harm misinformation while it is undergoing a fact-checking review**"
> `Allowed` — "Statements of personal opinion (as long as it does not include harmful misinformation)" · "Discussions about climate change, such as the benefits or disadvantages of particular policies or technologies… (as long as it does not undermine scientific consensus)"

Three things make this the best state model in the corpus.

**1. `FYF INELIGIBLE` is a named, disclosed, third state between allowed and removed.** Most platforms demote content silently; TikTok gives the demotion a name, publishes the criteria, and — critically — **tells the creator where to see it**: "If you have posted content that is ineligible for the For You feed (FYF), or is otherwise restricted, **this information will appear in the TikTok analytics tool.**" Shadow-demotion converted into an inspectable state. That is a genuinely significant piece of content design and it is the single most transferable idea in this file.

**2. The bands are graduated by specificity, not just by severity.** `general conspiracy theories` → FYF ineligible; `specific conspiracy theories that name and attack individual people` → not allowed. Same subject matter, band determined by whether a real person is targeted. Similarly `dangerous conspiracy theories that are violent or hateful` → not allowed. The taxonomy discriminates on the dimension that actually predicts harm.

**3. A temporary band is disclosed.** "Potential high-harm misinformation **while it is undergoing a fact-checking review**" is FYF-ineligible — i.e. content is demoted *pending* review and the pendency is published. Elsewhere: "To be cautious, content that warrants fact-checking is also **temporarily ineligible** for the FYF while it is undergoing review." Naming a provisional state, and calling the caution what it is, is rare.

**Per-region banding** `[observed]`: "Content is restricted (18 years and older), and **ineligible for the FYF in some regions**, if it shows cosmetic surgery and does not include risk warnings." So a single piece of content can hold different bands in different territories — the same per-territory state problem YouTube discloses for Content ID claims (144).

**Account-level states** `[documented]`:

| State | Copy |
|---|---|
| `banned` (account) | "If someone has **severe or repeated violations**, we will also ban the account." · "If we learn someone is below the minimum age to have an account on TikTok, **we will ban that account.**" |
| `banned` (person, multi-account) | "If we become aware an account holder has a severe violation or has committed a sexual offense against a young person, **we will ban the account, as well as any other accounts belonging to that person.**" |
| restricted from a feature | "If any of your accounts have been banned, **or restricted from using a feature**, you must not set up or use a different account to get around the ban or restriction." |
| circumvention | "Attempting to avoid an account ban by spreading content violations across multiple accounts" · "Using an alternative account (either a new or existing one) to continue the violating behavior that previously resulted in a ban" · "Opening a new account after an account has been banned for a **severe violation**" |
| appeal pending | "You can view the **status of your appeal** in the in-app Safety Center, as well as the **status of any reports you have filed** about other content or accounts." |

**`severe or repeated`** is the recurring account-ban formula — two independent grounds, one formula, used consistently. Compare YouTube's three named termination grounds (repeated / single severe / dedication to violation); TikTok has two and does not distinguish intent.

**A small but important verb** `[observed]`: "if your account was banned, **or your content was violated**, made ineligible for the FYF, or otherwise restricted". `your content was violated` — TikTok uses `violate` transitively with the *content* as object, meaning "found to be in violation". Internal-tooling grammar ("this video was violated") leaking into consumer copy, where it reads as though something was done *to* the content. A genuine defect in the highest-stakes sentence in the appeals section.

## T7 Error, failure & recovery

**`[absent]`** — no error codes, no error strings, no troubleshooting content reachable. `support.tiktok.com` is blocked. Nothing on the policy microsite addresses technical failure.

The only failure-recovery copy is enforcement recovery (see T9) and one safety fallback `[observed]`:

> "TikTok's parental controls are **only available for the TikTok mobile app and are not available on mobile web or desktop browsers.** We recommend familiarizing yourself with the parental controls available to you based on the device or browser you're using."

A capability gap disclosed plainly, with a routed workaround — and then named again at the foot of the page with concrete third-party routes: "**Google's family center** gives advice on how to set screentime for Android and Chrome. **Apple's parental controls page** advises how to set controls on iPhones, iPads, Macs and Safari." Telling a parent that your own controls do not cover the browser, and sending them to two OS vendors, is honest handling of a real hole.

## T8 Empty states

`[absent]` — none reachable.

## T9 Notifications & system messages — enforcement notice

**TikTok's notice model, stated as a procedural-fairness commitment** `[observed]`. The `Notice and Appeals` section of the enforcement page is short and every sentence carries a mechanism:

> "**In keeping with our commitment to ensuring procedural fairness, we seek to provide notifications if you have violated our rules.**"
> - "If you have posted content that we do not allow, **we will notify you and share the reason for the removal.**"
> - "If your account has been banned because of a violation, **you will receive a banner notification when you next open the app**, informing you of this account change."
> - "If you have posted content that is ineligible for the For You feed (FYF), or is otherwise restricted, **this information will appear in the TikTok analytics tool.**"
> - "If your account was banned, or your content was violated, made ineligible for the FYF, or otherwise restricted, **and you believe it was an error, then you can appeal the decision.**"
> - "You can view the **status of your appeal in the in-app Safety Center**, as well as the **status of any reports you have filed** about other content or accounts."

**Three different notification channels, matched to three different enforcement outcomes:**

| Outcome | Channel |
|---|---|
| content removal | a notification with the reason |
| account ban | a **banner on next app open** |
| FYF ineligibility / restriction | a **value in the analytics tool** |

That mapping is the craft. An account ban cannot be delivered in-product to a user who can no longer use the product, so it is a banner on next open. A demotion is a *statistical* outcome, so it is surfaced where the creator already inspects statistics. And the removal notice carries the reason. Three outcomes, three appropriate surfaces, no over-notification.

**`procedural fairness` is named as the governing principle** — a term of art from administrative law, used in consumer-facing policy copy, and cross-referenced to the **Santa Clara Principles** in the Community Principles section. Very few consumer platforms name the standard they hold themselves to; TikTok names three (UN Guiding Principles, Convention on the Rights of the Child, Santa Clara Principles).

**One unified appeal-status surface** `[observed]`: the `in-app Safety Center` shows *both* the status of appeals you have filed **and** the status of reports you have filed about others. Combining "my enforcement" and "my reports" into one tracker is unusual and sensible — the user's relationship with moderation is bidirectional, so the status surface is too.

**But the notice commitment is hedged twice** `[observed]`: "**we seek to** provide notifications" and "we cannot guarantee that all content shared complies with our guidelines". `we seek to` is doing real work — the commitment is to effort, not to delivery. Compare YouTube's flat "When you get a strike, you're told via email."

**What is missing, compared with YouTube (144)** — recorded as a gap, since both are two-sided UGC platforms with published enforcement: TikTok publishes **no strike ladder, no penalty schedule, no expiry periods, no appeal windows, no appeal limits, and no statement of what happens if an appeal fails.** The formula is `severe or repeated violations → ban`, with no intermediate states named and no clocks. YouTube's `Warning / First Strike / Second Strike / Third Strike` with 90-day expiries and 6-month/1-year appeal windows is a materially more legible system. TikTok's `Information on account-level enforcement can be found here` (2023 version) points to a page not reachable in this harvest, so the ladder may exist and be unharvested — but it is not on the enforcement page.

**Platform-level message: the moderation pipeline, disclosed** `[observed]`

> "We aim to remove content or accounts that violate our rules **before they are viewed or shared**. Content **first goes through an automated review process**. If content is identified as a potential violation, it will be **automatically removed, or flagged for additional review by our moderators**. Additional review will occur **if content gains popularity or has been reported.** To support moderation accuracy, we apply additional quality assurance processes to some accounts that have **already gone through additional validation processes, such as verified accounts.**"

Four disclosures: automated-first, two automated outcomes (remove or escalate), the **two triggers for human review** (popularity, reports), and — the notable one — that **verified accounts get extra quality assurance**. TikTok discloses a two-tier moderation-accuracy regime in which some accounts receive more careful review. Stated plainly, unhedged, in the enforcement page. Whether one approves or not, publishing it is the honest move.

**Content labelling and interstitial vocabulary** `[observed]` — TikTok's in-feed message types, named consistently across four sections:

`labels` · `"opt-in" screens` · `warnings` / `warning information`

> "For certain content, we add **labels**, **'opt-in' screens**, or **warnings** to provide more context or notice." (2023)
> "We may add **labels**, **'opt-in' screens**, or **warnings** to provide more context." (2024)
> "we add **warning labels** to content related to unfolding or emergency events which have been assessed by our fact-checkers but cannot be verified as accurate, and **we prompt people to reconsider sharing such content**."
> "we also apply **warning information** to this type of content, as well as to content showing **professionals performing extreme sports and stunts**."
> "We may add extra safety measures to some content allowed under a public interest exception, such as making it ineligible for the FYF or adding a **label, 'opt-in' screen, or warning information**."

`"opt-in" screen` is TikTok's term for the tap-to-reveal interstitial, and it is **always in scare quotes**, in every occurrence, across two document versions. A coined term the writers never fully committed to.

**`we prompt people to reconsider sharing such content`** is the one behavioural-nudge string in the corpus, and it is attached to a precise condition: content assessed by fact-checkers but *not verifiable either way*. A friction prompt for the epistemically-undetermined case, rather than for the false case. Good targeting.

**The stale-document banner — a real defect, and the most consequential one in this file** `[observed]`

`https://www.tiktok.com/community-guidelines/en/` — the canonical, shortest, most-linked URL for TikTok's Community Guidelines — serves the **March 2023 document**, footer-dated `Last updated, March 2023`, under this banner:

> "On **April 17, 2024**, we are updating our Community Guidelines to help keep TikTok safe, inclusive, and welcoming for everyone. **Check out the new Community Guidelines here.**"

Harvested 2026-09-21: two and a half years after the replacement took effect, the primary URL still serves the superseded text, and the banner is still written in the **future tense** (`we are updating`). Three separate problems compound:

1. The governing policy at the canonical URL is out of date by two versions' worth of time.
2. The banner's tense was never updated, so it reads as an advance notice of something that happened years ago.
3. The only route to the current document is the word `here`.

And the inconsistency propagates: **`/community-guidelines/en/integrity-authenticity` also renders `Last updated, March 2023`** while its siblings render `Released April 17, 2024 / Effective May 17, 2024`. So one section of the *current* guidelines is stale-dated, and a reader comparing two sections sees two different provenance claims for one document.

**The dual date stamp is otherwise a good pattern** `[observed]`: `Released April 17, 2024` / `Effective May 17, 2024` — publication and commencement as two separate, labelled dates, giving a 30-day notice period. Every current section carries both. Any product changing terms should copy this: one date is ambiguous, two are a commitment.

**Version comparison, 2023 → 2024** `[observed]`. The four moderation pillars were reworded, and the changes are instructive:

| 2023 | 2024 |
|---|---|
| `Remove violative content from the platform that breaks our rules` | `Remove content that we do not allow` |
| `Age-restrict mature content so it is only viewed by adults (18 years and older)` | `Restrict content that is not suitable for youth` |
| `Maintain For You feed (FYF) eligibility standards to help ensure any content that may be promoted by our recommendation system is appropriate for a broad audience` | `Make ineligible for the FYF content that does not meet our recommendation standards` |
| `Empower our community with information, tools, and resources` | `Empower our community with information, tools, and resources` |

Pillar 1 drops `violative` (internal jargon) for `that we do not allow` (the document's own formula). Pillar 2 flips the framing from **the content's property** (`mature`) to **the audience's protection** (`not suitable for youth`) — and drops the explicit `(18 years and older)` from the pillar, though it survives as the band label. Pillar 3 shortens from 24 words to 12 and inverts subject and object. One revision, measurably plainer.

**No status page found** `[observed]`.

## T10 Disclosures, legal & compliance — **PRIORITY SECTION (safety, age assurance, teen controls)**

### Age architecture — four thresholds

`[observed]` TikTok discloses **four distinct age gates**, each attached to a different capability:

| Age | Gate | Copy |
|---|---|---|
| **under 13 (US)** | Separate product | "In the United States, there is a **separate under-13 TikTok experience** that offers additional safeguards, including **restricting interactive features, content suitability assessments from Common Sense Networks, and a dedicated Privacy Policy.**" · "The environment for younger users **does not permit the sharing of personal information**, and users **cannot do things like share their videos on TikTok, comment on others' videos, message with users, or maintain a profile or followers.**" |
| **13** | Account minimum | "You must be 13 years and older to have an account. There are additional age limitations based on local law in some regions." |
| **16** | Direct messaging **and** FYF eligibility of your own content | "the ability to send and receive direct messaging is restricted to registered accounts **ages 16 and older**" · "direct messaging is **automatically turned off** for registered accounts between the ages of **13 and 15**" · "Setting minimum age requirements for access to certain product features, including **being 16 years and older to have your content be eligible for the FYF**" |
| **18** | Restricted content | `RESTRICTED (18 years and older)` band |

**The 16-and-older FYF rule is the most striking of these** and it is easy to miss: a 13–15-year-old can post, but their content **cannot be recommended** by the algorithm. A distribution gate rather than a publication gate, disclosed in a bullet inside a three-item list. It is arguably the most consequential teen-safety mechanism TikTok operates and it gets one sub-clause.

**The under-13 experience is described by what it removes** `[observed]` — five capability negations in one sentence (`share their videos`, `comment`, `message`, `maintain a profile`, `followers`), plus no personal-information sharing. Defining a child product by subtraction from the adult product is clear and verifiable. And it names a **third-party content curator** (`content suitability assessments from Common Sense Networks`) — outsourcing child-appropriateness judgment to a named external body, and saying so.

**Three default-posture disclosures for youth** `[observed]`:

> "To provide young people with an experience that is developmentally suitable and a safe space for self-exploration, we take several steps including:
> - Setting minimum age requirements for access to certain product features, including being 16 years and older to have your content be eligible for the FYF
> - **Using restrictive default privacy settings**
> - **Developing content levels** to restrict content that may not be suitable for people under the age of 18, and **providing you with content filtering options**"

`restrictive default privacy settings` — safe-by-default stated as policy. `content levels` is a named but undefined internal construct (the mechanism behind the `RESTRICTED` band, presumably); it appears once and is not glossed.

**`developmentally suitable` and `a safe space for self-exploration`** — the youth framing is developmental-psychology vocabulary rather than protective vocabulary. `self-exploration` in particular concedes that teens use the platform for identity work, which is a more honest premise than "keeping kids safe from content".

**Terminology choice, stated explicitly** `[observed]`: "people under the age of 18 (**we refer to them as 'youth' or 'young people'**)". TikTok declares its own term of art in a parenthetical, in sentence two of the section. Declaring your terminology inside the document is a small, excellent practice — compare Spotify's `young listener`, which is used consistently but never announced.

**Underage-account reporting, and its broken route** `[observed]`: "If we learn someone is below the minimum age to have an account on TikTok, we will ban that account. **If you believe you were incorrectly banned, you can appeal the decision. Anyone can report accounts that they suspect are under the minimum age, either in-app or online.**"

Three good moves — ban, appeal for false positives, and open reporting by anyone. But the parent-facing route on the Safety Center page renders as **`contact us at:` followed by nothing** (see T1). The policy is sound and the mechanism has not rendered.

### Family Pairing — the parental-control inventory

`[observed]` **Eight named controls**, each a label plus a one-sentence scope. This is the richest parental-control string set in this domain harvest:

| Control (verbatim label) | Scope copy |
|---|---|
| `Screen Time Management` | "Decide how long your teen can spend on TikTok each day. You can set your teen's screen time limit **directly from your own account**, and **if your teen has multiple devices, the set time limit will apply to each device individually.**" |
| `Restricted Mode` | "Restrict the appearance of content that may not be appropriate for all audiences." |
| `Search` | "Decide whether your teen can **search for content, accounts, hashtags, or sounds.**" |
| `Discoverability` | "Decide whether your teen's account is **private** (your teen decides who can see their content) or **public** (anyone can view their content)." |
| `Suggest account to others` | "Decide whether your teen's account can be **recommended to others**." |
| `Direct Messages` | "TikTok users become eligible for direct messages at 16. Parents may restrict who can send messages to the connected account, or turn off direct messaging completely. **Please note: direct messaging is automatically turned off for registered accounts between the ages of 13 and 15.**" |
| `Liked Videos` | "Decide who can view the videos your teen liked." |
| `Comments` | "Decide who can comment on your teen's videos." |

Five of the eight scope sentences begin with the same verb — **`Decide whether…` / `Decide how long…` / `Decide who…`**. A single parallel construction across a control panel, with the parent as the deciding subject. That is exactly the right grammar for a delegated-authority feature and it is held consistently.

**The multi-device disclosure is the best line in the set**: "if your teen has multiple devices, **the set time limit will apply to each device individually.**" This is a genuine limitation — a teen with a phone and a tablet gets double the time — and TikTok discloses it inside the control's own description rather than in a FAQ. Naming the loophole in your own parental control is unusual candour.

**The Direct Messages entry is doing three jobs in three sentences**: it states the platform-wide eligibility age (16), the parental control available above it (restrict or disable), and the automatic default below it (off for 13–15). Control, threshold, and default in one block, so a parent cannot mis-set it.

**`Discoverability` as the label for the public/private toggle** is a notable coinage — it names the *consequence* (whether you can be found) rather than the setting (`Private account`). And `Suggest account to others` is a second, separate control for algorithmic recommendation of the account, distinct from public/private visibility. Splitting "can be seen if found" from "will be suggested" is a real distinction that most products collapse.

**Private-account behaviour explained, with the residual exposure named** `[observed]`:

> "With a private account, your teen can **approve or deny followers** and restrict their uploaded content and incoming messages to followers only. If your teen has a public profile, anyone signed into TikTok can view that user's public videos. **However, only approved followers can send them a message.**"
> "**Please remember: Even with a private account, profile information – including profile photo, username, and bio – will be visible to all users.** Counsel your teen not to reveal personal information such as age, address, or phone number in his/her profile."

`Even with a private account…` is the critical disclosure: private is not private at the profile layer. Stated as a bolded `Please remember`, followed by concrete advice naming the three fields at risk (`age, address, or phone number`). This is the single most important parental-control caveat on the page and it is placed correctly — immediately after the reassurance it qualifies.

(`his/her` is dated construction on a 2026 page, and inconsistent with the gender-neutral `your teen` / `they` used everywhere else on the same page.)

**Two capability limits disclosed against TikTok's own interest** `[observed]`:

> "TikTok's parental controls are **only available for the TikTok mobile app and are not available on mobile web or desktop browsers.**"
> "Most of these features are only available to access and change through the TikTok mobile app. It's important to note that **a limited version of TikTok is available on mobile web or desktop browsers.** If your teen accesses TikTok via a browser as well as via the mobile app, you may want to use the parental controls available on the browser or on your teen's device."

Then routed out to Google and Apple. A parental-control page that tells you its controls do not cover a whole platform, twice, and sends you to competitors' tooling.

**Device-level blocking offered as an alternative to the product** `[observed]`, under the question `Can I prevent my teen from downloading TikTok?`:

> "Both iOS and Android provide parental controls that let you block or limit specific apps… Because the full TikTok experience is for users 13 and over, TikTok has a **12+ age rating on the Apple App Store and a Teen content rating on the Google Play Store.** **This allows you to use parental controls built-in to the device, to simply block our apps from your child's phone.**"

TikTok publishes its own app-store age ratings and then explains how to use them to **block TikTok**. Note the ratings disclosure incidentally reveals a mismatch: the platform minimum is **13**, the Apple rating is **12+**. TikTok states both facts in one paragraph without reconciling them.

### Content-restriction disclosure — the `RESTRICTED (18 years and older)` quick guide

`[observed]` The youth-safety section publishes a **consolidated cross-policy list of everything gated to adults** — "Here is a consolidated 'quick guide' of content restricted from younger audiences." Eight categories, each with 1–4 specific behaviours. Abridged, with the mechanism-naming intact:

| Category | Representative restricted items |
|---|---|
`Disordered Eating and Body Image` | "Restrictive low-calorie diets, such as extended intermittent fasting" · "Using medication or supplements for weight loss or muscle gain, such as anabolic steroid use" · "Exercises designed for rapid and significant weight loss, such as cardio routines that promise to help you lose a waist size in a week" · "Promoting weight loss or muscle gain products, such as sharing a **before-and-after transformation**" · "Promoting body types as ideal or perfect, when associated with potentially harmful weight management behaviors" · "Showing or promoting cosmetic surgery that **does not include risk warnings**" |
| `Dangerous Activity and Challenges` | "Showing activity that involves visible or imminent **moderate** physical harm" · "Showing activity that is likely to be **imitated**" |
| `Nudity and Body Exposure` | "Showing semi-nudity of adults, such as wearing only nipple covers or underwear that does not cover the majority of the buttocks" |
| `Sexually Suggestive Content` | "Showing adults engaging in intimate kissing, sexualized framing, or sexualized behavior" · "Showing sex products" |
| `Shocking and Graphic Content` | "Showing human or animal blood" · "Showing extreme physical fighting" · "Showing graphic or potentially distressing footage of events that are **in the public interest to view**, such as clashes with law enforcement or the aftermath of a bombing or natural disaster" |
| (gambling) | "Showing or glamorizing gambling or gambling-like activities, such as filming someone gambling **or making any general positive statements about gambling**" |
| `Alcohol, Tobacco, and Drugs` | "Discussing drugs or other regulated substances (**as long as the substances are not being used or shown**)" · "Showing the consumption of excessive amounts of alcohol by adults" · "Promoting tobacco products" · "Showing the consumption of tobacco products by adults" · "Promoting alcohol products" |

**A single cross-policy index of the adult-only band** is the right artefact for a parent, and it is placed in the youth section rather than left distributed across six policy pages. Any product with graduated content restrictions should ship this view.

**Defect** `[observed]`: the gambling block renders **with no category heading** — the four other categories have `###`-level titles, the gambling items appear as an orphan bullet list between `Shocking and Graphic Content` and `Alcohol, Tobacco, and Drugs`. One missing heading in a safety index.

### The definition apparatus

`[observed]` Every policy section ends in a `More information` block containing **term definitions**, and this is where TikTok's compliance rigour actually lives. Selected definitions, verbatim:

> `Moderate physical harm` — "harm that is unlikely to require professional medical treatment and does not pose a risk of disability or disfigurement. This includes **small cuts with minimal blood loss and minor bruising on the body.**"
> `Significant physical harm` — "harm that usually requires professional medical treatment and poses a risk of temporary or permanent disability or disfigurement. This includes **dislocated or broken bones, poisoning, loss of consciousness, serious burns, electrocution, concussion, and choking.**"
> `Semi-nudity` — "being mostly unclothed and close to (but not actually) nude, such as implied nudity or wearing clothes that minimally cover intimate body parts."
> `Intimate body parts` — "genitalia, buttocks, and breasts (including nipple and areola)."
> `Sexualized framing` — "content that **intentionally emphasizes clothed intimate body parts** through techniques, such as filming, editing, or positioning of the body in front of the camera."
> `Gambling` — "betting money (**including digital currencies, such as bitcoin**) or something of monetary value on an event with an uncertain outcome, for a financial gain."
> `Gambling-like activities` — "activities that do not rise to the level of gambling, but are similar in behavior and carry similar risks, such as **social casinos and gambling-related software**."
> `Tobacco products` — "vaping products, smokeless or combustible tobacco products, synthetic nicotine products, E-cigarettes, and other **Electronic Nicotine Delivery Systems**."
> `Regulated substances` — "prescription drugs, over-the-counter drugs, **compressed air canisters (whippets)**, and nitrite poppers."
> `Doxxing` — "publishing personal information about someone online **with a malicious intent**. **We recognize intent can be subjective, so we use objective indicators to help us understand it, such as captions and hashtags.**"
> `Public figures` — "adults (18 years and older) with a significant public role, such as a government official, politician, business leader, or celebrity. **We do not identify people under the age of 18 as public figures.**"
> `Private figures` — "**all people under the age of 18**, and adults (18 years and older) who are not public figures."
> `Protected attributes` — "personal characteristics that you are either born with, are immutable, or **it would cause severe psychological harm if you were forced to change them** or were attacked because of them."
> `Material support` — "giving financial contributions, goods, or services to promote violent organizations or individuals, or their cause. This includes recruitment, fundraising, selling merchandise, and promoting training materials."
> `CSAM` — "any sexualized material of a young person that is shared or created by anyone, including **self-generated CSAM, or highly realistic-appearing digital or AI-generated content**."
> `Grooming` · `Sextortion` · `Image-based sexual abuse` · `Non-consensual sexual acts` · `Human trafficking` · `Human smuggling` · `Synthetic media` · `Conspiracy theories` · `Significant harm` — all defined.

Four things worth extracting.

**Harm is operationalised into two tiers with clinical examples.** `moderate` (small cuts, minor bruising) vs `significant` (dislocated bones, poisoning, electrocution, choking) — and those tiers then *drive band assignment* (`moderate` → FYF ineligible / 18+; `significant` → not allowed). A definition that does mechanical work rather than rhetorical work.

**`We recognize intent can be subjective, so we use objective indicators`** — the platform admits that the element of its own rule is unknowable and states the proxy it uses. That sentence is a model for any policy that turns on intent.

**Youth are categorically excluded from the reduced-protection class.** `We do not identify people under the age of 18 as public figures` and `Private figures are all people under the age of 18`. A minor can never be demoted to "public figure" and lose harassment protection, regardless of fame. Stated twice, in two definitions, in the same section.

**`self-generated CSAM` and `AI-generated content` are inside the CSAM definition**, not appended as edge cases — the definition is written for 2024 rather than patched for it.

### Synthetic media disclosure — actual suggested label strings

`[observed]` The most directly transferable disclosure copy in this file:

> "Synthetic or manipulated media that shows realistic scenes **must be clearly disclosed**. This can be done through the use of a sticker or caption, such as **'synthetic', 'fake', 'not real', or 'altered'**."

TikTok publishes **four acceptable disclosure words** rather than mandating a format or leaving it to the creator's judgment. A creator reading this knows exactly what to type. For any product requiring user-applied disclosure — AI content, sponsored content, affiliate links — publishing the accepted strings is the move.

The prohibition then discriminates by subject:

> "We do not allow synthetic media that contains the likeness of **any real private figure**. While we provide more latitude for public figures, we do not want them to be the subject of abuse, or for people to be misled about political or financial issues."
> `NOT allowed` — "Synthetic media that contains the likeness (**visual or audio**) of a real person, including: (1) **a young person**, (2) **an adult private figure**, and (3) **an adult public figure when used for political or commercial endorsements**, or if it violates any other policy"
> `Allowed` — "Synthetic media showing a public figure in certain contexts, including artistic and educational content, such as **a video showing a celebrity doing a popular TikTok dance**, and a historical figure featured in a history lesson"

A three-tier likeness rule (youth / private adult / public adult-with-purpose-test), with `visual or audio` explicitly scoped, and two worked examples of what remains permitted. The celebrity-dance example is the useful one: it tells creators the rule is not a blanket likeness ban.

### Public-interest exceptions

`[observed]` **Six named exception categories**, listed:

> `Documentary` · `Educational` · `Medical and Scientific` · `Counterspeech` · `Satirical` · `Artistic`

With a definition of the standard: "Public interest refers to topics that **inform, inspire, or educate the community and enhance deliberation about matters of broad collective significance.**"

Then the operative test and the two limits:

> "Our approach to content moderation uses the same criteria, **no matter who creates it.** The most important factor we consider… is **context**, such as whether the content is **raising awareness or criticizing harmful behaviors**."
> "We may add extra safety measures to some content allowed under a public interest exception, such as making it **ineligible for the FYF** or adding a label, 'opt-in' screen, or warning information."
> "**We do not provide exceptions for public interest content if it may cause extreme harm, such as showing a suicide or sexual abuse of a young person.**"

Compare YouTube's `EDSA` (Educational, Documentary, Scientific, Artistic — 144). TikTok's list is **the same four plus `Medical and Scientific` split out and `Counterspeech` added**. `Counterspeech` is the meaningful addition: content that reproduces hateful material *in order to rebut it*. YouTube handles this inside its hate-speech policy; TikTok elevates it to a named exception category. That is the better structural choice, because counterspeech is the single most common false-positive class in hate-speech enforcement.

And TikTok's exception carries **two things YouTube's does not**: a disclosed downgrade (an exception may still cost you FYF eligibility — so the exception is partial, not total) and a **hard floor** (no exception for suicide or child sexual abuse imagery, whatever the context). Both are improvements on an unbounded exception.

`Our approach to content moderation uses the same criteria, no matter who creates it` — an equal-application claim, which sits in tension with the disclosed extra quality-assurance for verified accounts three paragraphs later (see T9). Both statements are on the same page. Recorded as an observed inconsistency; the two may be reconcilable (same *criteria*, different *review depth*) but the copy does not reconcile them.

### Named external frameworks and partners

`[observed]` — unusually dense and worth recording in full, because almost no consumer product cites this much:

> "These considerations are informed by **international legal frameworks and industry best practices, including the UN Guiding Principles on Business and Human Rights, the International Bill of Human Rights, the Convention on the Rights of Children, and the Santa Clara Principles.** We also seek input from **our community, safety and public health experts, and our Advisory Councils.**"
> "The attributes listed above are informed by the **Universal Declaration of Human Rights** and international conventions."
> "We rely on **independent fact-checking partners and our database of previously fact-checked claims** to help assess the accuracy of content."
> "we may consider other protected attributes when we have additional context, such as **specific regional information provided to us by a local non-governmental organization (NGO)**."
> "We report incidents of youth sexual abuse and exploitation to the **National Center for Missing and Exploited Children (NCMEC)**." (stated 3×, including for youth sex trafficking)
> "**content suitability assessments from Common Sense Networks**" (under-13 experience)
> Third-party safety resources named: `Family Online Safety Institute` · `ConnectSafely` · `WiredSafety` · Google's family center · Apple's parental controls
> TikTok's own named resources: `TikTok's Top 10 Tips for Parents` · `TikTok Parental Guide` · `TikTok Family Safety Toolkit for South East Asia (English)`

**`Violent extremists` defined by reference to a designating body** `[observed]`: "non-state groups, **including those designated by the United Nations**, that threaten or use violence against civilians for political, religious, ethnic, or ideological reasons." Outsourcing part of a prohibited-entity definition to a named international designation list, rather than maintaining a private list silently.

**Law-enforcement escalation threshold, stated identically four times** `[observed]`: "We also report to relevant law enforcement authorities when there is a **specific, credible, and imminent threat to human life or serious physical injury.**" A three-adjective test (`specific, credible, and imminent`), repeated verbatim in four sections. Identical phrasing for an identical threshold is the correct discipline — it signals one rule, not four.

### Support-resource copy

`[observed]` Every harm section that touches self-harm, abuse or bullying ends with a **help-offer block**, and the construction is consistent:

> "If you or someone you know has had thoughts of suicide or self-harm, **support is available.** Contact a suicide prevention helpline in your region or your local emergency services."
> "If you or someone you know is experiencing concerns about body image, food, or exercise, **support is available.** Contact a helpline in your region."
> "If you or someone you know has experienced youth sexual abuse or exploitation, **support is available.** Contact a helpline or service provider in your region. **If you are in immediate danger, contact your local emergency services.**"
> "If you or someone you know is being bullied, **help is available.** We offer support resources, as well as tools that can help limit harmful interactions…"

Four elements, in fixed order: **the `you or someone you know` framing** (which lowers the cost of self-identifying), the fixed reassurance (`support is available` / `help is available`), a regional route (`in your region` — no US helpline number is hard-coded, correctly for a global document), and an emergency escalation where the risk is acute.

`you or someone you know` appearing four times is the detail worth stealing: it lets a reader take the information without admitting the need.

**But the routes are generic.** `Contact a helpline in your region` with no link, no directory, and no in-app route named. Compare the specificity elsewhere in the same document — four suggested AI-disclosure strings, a named NCMEC reporting path, four named third-party safety organisations for parents — and the helpline routing is the weakest link in the safety copy. The one place a user is in acute distress is the one place TikTok does not name a destination.

## T11 Help-centre architecture

**`[absent]` — blocked.** `support.tiktok.com/en` returned an empty body. The Help Center's category tree, article titles and task phrasing are unharvested.

Two URL patterns were observed in search results, recording the scheme only: `support.tiktok.com/en/safety-hc/account-and-user-safety/family-pairing` (a `safety-hc` sub-centre with a two-level path) and `www.tiktok.com/support/faq_detail?id=…&category=web_account` (a numeric-ID FAQ system on the main domain, with a `category` parameter). **Two separate help systems on two domains**, one slug-based and one ID-based. Neither was retrievable.

What substitutes for a help centre on the reachable surfaces is the **Community Guidelines' own instruction for how to read it** `[observed]`:

> "To help you read through the guidelines, we organize them by topic area, and **highlight each rule in bold**. Under each section you can click **More information** for definitions, examples, and clarifications to common questions. **The examples do not cover everything (we are telling you this now so that you do not have to repeatedly read the phrase 'including, but not limited to').**"

A policy document that explains its own typography and interaction model in its preamble — bold means *this is the rule*, `More information` means *definitions and examples* — is a genuinely good piece of document design. And the parenthetical is the best sentence in the entire TikTok corpus: **TikTok explains that it has removed `including, but not limited to` from the document and tells you why, once, so the phrase never has to appear again.** A non-exhaustiveness disclaimer amortised across a whole document by a single aside, written with visible impatience at legalese.

(Compare YouTube's solution to the same problem: `This list isn't complete.`, stated per-list. TikTok's is a global declaration; YouTube's is local. Both beat the boilerplate.)

The 2023 version carried the same aside plus a values instruction the 2024 version drops: "If you are ever in doubt about what to share, keep in mind this core value — **'be kind and treat others the way that you would want to be treated.'**" The 2024 version keeps the sentiment but demotes it: "If you are ever in doubt about what to share, **please remember to be kind and treat others the way that you would want to be treated.**" The golden rule loses its quotation marks and its framing as a *core value*, becoming a polite reminder. A small de-escalation of the document's moral register between versions.

## T12 FAQs

**Placement:** the `For Parents` Safety Center page is structured as **eight question headings**, and the CG `More information` blocks answer "common questions" without posing them. No separate FAQ page was reachable.

**For Parents — 8 questions, all in the parent's voice** `[observed]`

| # | Question (verbatim) | Answer summarised |
|---|---|---|
| 1 | What is TikTok? | Category definition (`a destination for short-form mobile videos`), mission restated, then an eight-item list of content genres from `dance challenges` to `internet memes` |
| 2 | Who is TikTok intended for? | 13+; the broken `contact us at:` route for underage accounts; then the US under-13 experience defined by its five capability negations |
| 3 | Can I prevent my teen from downloading TikTok? | Yes, via OS controls — with TikTok's own app-store age ratings disclosed and used as the blocking mechanism; then the mobile-only caveat for TikTok's own controls |
| 4 | How can I help keep my teen safe on TikTok? | Private accounts + Family Pairing; then the 16+ DM restriction |
| 5 | What is Family Pairing? | The eight-control inventory + the two-device QR setup ritual |
| 6 | How can my teen control who sees their videos and sends them messages? | Private-account mechanics, then the `Even with a private account…` profile-exposure caveat |
| 7 | How can my teen report inappropriate content or behavior? | Report a video, user or comment in-app; block |
| 8 | Accessing TikTok from a browser. | **Not a question** — a statement used as a heading. The mobile-only limitation restated and routed to Google/Apple |

**Structural notes.**

**Seven of eight are phrased as the parent's question, and the eighth breaks the pattern.** `Accessing TikTok from a browser.` is a noun phrase with a full stop, sitting in a list of questions — and it is the heading over the most important limitation on the page (TikTok's parental controls do not work in a browser). The one item that most needs to be found is the one item not phrased as a question.

**Question 3 answers against TikTok's interest**, in full, with mechanism: how to block TikTok using its own published age ratings. That is a real editorial choice and it is not hedged.

**Question 1 defines the product before the parent's actual concern**, which is correct for this audience — a parent arriving here may not know what TikTok is. The eight content genres (`dance challenges`, `lip-syncing`, `DIY tutorials`, `historical parodies`, `internet memes`) do orientation work that a mission statement cannot.

**`How can my teen…` framing on Q6 and Q7** puts agency with the teen rather than the parent, mid-way through a parent-facing FAQ. Combined with Q4's `How can I help keep my teen safe` (help, not make), the page's stance is **co-management rather than control** — which matches the opening advice ("the tools and controls **you and your teen can turn on together**"). Consistent and deliberate.

**Gap:** there is no question about the algorithm, about screen-time effects, about what the teen's data is used for, or about what happens when a teen turns 18 and Family Pairing presumably ends. The last of these is the obvious missing question — Spotify names its equivalent transition (`Graduating to a self-managed account`, 141) and TikTok does not address it.

## T13 Terminology & glossary

| Term | TikTok's usage | The alternative it rejected |
|---|---|---|
| `For You feed (FYF)` | The algorithmic feed, always with the acronym on first use then `FYF` | "For You Page", "FYP" (the user-community term TikTok does **not** use in policy) |
| `FYF INELIGIBLE` | The disclosed demotion state | "reduced reach", "limited distribution", silence |
| `RESTRICTED (18 years and older)` | The adult-only band | "age-gated", "mature" |
| `NOT ALLOWED` / `ALLOWED` | The two terminal bands | "prohibited" / "permitted" |
| `We do not allow` | The universal prohibition formula | "is prohibited", "users may not" |
| `youth` / `young people` | Under-18s — **declared in a parenthetical** | "minors", "children", "kids" |
| `content levels` | The under-18 restriction mechanism — **named once, never defined** | — |
| `"opt-in" screen` | The tap-to-reveal interstitial — **always in scare quotes** | "content warning", "sensitive content screen" |
| `warning information` | The label applied to risky-but-allowed content | "advisory", "disclaimer" |
| `safety toolkit` | The user-side filtering and restriction feature set | "safety settings" |
| `Family Pairing` | The parent–teen account link | "parental controls" (used generically, but the feature has its own name) |
| `Screen Time Management` | The time-limit control | "screen time limit", "downtime" |
| `Discoverability` | The public/private toggle, named by consequence | "Private account" |
| `Suggest account to others` | Account-level algorithmic recommendation, **separate** from public/private | — |
| `Restricted Mode` | The content filter | "safe mode", "family filter" |
| `procedural fairness` | The stated standard for notice and appeals | "due process", "fair review" |
| `public interest exception` | The carve-out, with six named categories | `EDSA exception` (YouTube's term for the overlapping concept) |
| `Counterspeech` | An exception category in its own right | folded into hate-speech policy (YouTube's approach) |
| `moderate physical harm` / `significant physical harm` | Two operationalised harm tiers with clinical examples | "minor" / "serious" |
| `protected attributes` / `protected groups` | The discrimination classes, defined by immutability-or-psychological-harm | "protected characteristics" |
| `public figures` / `private figures` | The harassment-protection classes; **under-18s are always private** | "notable persons" |
| `hateful ideologies` / `hateful organizations` / `violent extremists` / `violent criminal organizations` / `violent political organizations` | Five separately-defined actor classes | one "dangerous organizations" bucket |
| `material support` | Assistance to prohibited actors | "promotion", "endorsement" |
| `covert influence operations` | Coordinated inauthentic behaviour | "information operations", "astroturfing" |
| `circumvention` | Ban evasion via other accounts | "ban evasion" |
| `synthetic media` | AI-created/modified content | "deepfake", "AI content", "generative content" |
| `duet` / `stitch` | Collaboration features — **always lowercase** | `Duet` / `Stitch` |
| `violated` (transitive, content as object) | "your content was violated" — internal tooling grammar | "was found in violation" |
| `Advisory Councils` | Regional external advisory bodies | "trust and safety board" |
| `in-app Safety Center` | The appeal- and report-status surface | — collides with the `Safety Center` website |
| `Youth Portal` / `Guardian's Guide` | Two named educational destinations | — |

**`FYF INELIGIBLE` is the most important term in this file**, for the reason given in T6: it names, publishes criteria for, and gives an inspection surface to a state that other platforms leave undisclosed. `For You feed` is also notable for what it rejects — TikTok's own user base universally says "FYP" (For You Page), and TikTok's policy documents consistently say `For You feed (FYF)`. The institutional term and the vernacular term have diverged and TikTok has not adopted the vernacular.

**`Discoverability` and `Suggest account to others` as two separate controls** is the best terminological distinction in the parental-control set: visibility-if-found and recommendation-to-strangers are genuinely different exposures, and almost every other product collapses them into one privacy toggle.

**`your content was violated`** is the one clear terminology defect (see T6) — and it is in the sentence that introduces the appeals right.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for TikTok, used consistently and at the points of decision — `We do not allow`, `we will ban that account`, `we seek to provide notifications`, `We recognize intent can be subjective`, `We report incidents… to NCMEC`, `we are telling you this now`. Like YouTube (144) and unlike Disney+ (143), TikTok is a visible agent in its own enforcement copy.

The `we` is also used for **concession and self-correction**, which is rarer: `We recognize that sometimes these principles will be in tension with each other` · `We recognize that some content that would otherwise violate our rules may be in the public interest to view` · `We understand how important it is for survivors of human trafficking and smuggling to share their stories` · `We recognize that public figures are in a position of public attention, have ways to counter negative speech` · `Although we work hard to enforce our guidelines, we cannot guarantee that all content shared complies`. Five concessions across five sections, each preceding a limitation on TikTok's own rule.

**Register — two completely different voices on two surfaces.**

The Community Guidelines are **flat, declarative, and close to statutory**: fixed formulas (`We do not allow`, `specific, credible, and imminent`), defined terms, caps-lock band labels, no contractions in the rule sentences, no exclamation marks, no colloquialism. The value sentences carry the only warmth, and it is measured.

The Safety Center `For Parents` page is **warm, chatty, and advisory**: `Hello, parents!` · `Your guidance can be invaluable!` · `Counsel your teen not to reveal…` · `Please remember:` · `It's important to note that…`. Two exclamation marks, a direct salutation, and imperative parenting advice. Same company, same week, two registers — appropriately, because the audiences differ, but the seam is abrupt and unbridged.

**One flash of authorial voice in the policy document** `[observed]`: "(we are telling you this now so that you do not have to repeatedly read the phrase 'including, but not limited to')". A parenthetical aside, in the first person plural, about the document's own drafting, expressing mild contempt for legal boilerplate. It is the only sentence in the Community Guidelines where a writer is visible, and it is the best sentence in it.

**Formula discipline is the defining stylistic feature.** Four phrases repeat verbatim across sections:
- `We do not allow …` (8+ sections)
- `specific, credible, and imminent threat to human life or serious physical injury` (4×, identical)
- `If you or someone you know … support is available.` (4×)
- `We report incidents of … to the National Center for Missing and Exploited Children (NCMEC).` (3×)

Identical wording for identical meaning, rather than synonym variation. This is correct for a policy document and it is the opposite of what most content teams' style guides encourage.

**Numbers are all thresholds** `[observed]`: `13 years and older` · `16 years and older` · `18 years and older` (many) · `ages 13 and 15` · `12+` (Apple rating) · `eight guiding community principles`. No persuasive numbers — no user counts, no removal statistics (those are routed to the `Transparency Center`).

**Accessibility content** `[absent]`. **No accessibility statement, conformance claim, or accessibility feedback route was found on any reachable surface.** Weaker than Netflix (142) and Spotify (141), comparable to Disney+ (143) and YouTube (144). `Skip to main content` is present on the CG canonical page only.

**Accessibility and rendering defects observed** `[observed]`:

- **Band lists silently missing.** On `safety-civility` and `mental-behavioral-health`, the `NOT ALLOWED` / `RESTRICTED (18 years and older)` / `FYF INELIGIBLE` / `ALLOWED` headings render **with no items beneath them** (the lists are client-side). A reader with scripting unavailable receives a policy document containing empty prohibition headings — i.e. the rules are the part that fails to load. On `integrity-authenticity` the same lists render fully. Inconsistent within one document set.
- **The eight community principles did not render.** `Community Principles` states "TikTok has **eight guiding community principles**… They are centered on these themes:" — and then the themes do not appear. The page promises a list and delivers a colon. The principles are **not recorded here** because they were not observed.
- **`contact us at:` renders with no destination** (T1, T10) — the underage-account reporting route.
- **An unnamed FTC resource** renders as a bare description with no title (T1).
- **The gambling category in the restricted-content quick guide has no heading** (T10).
- **Section titles render twice** on some pages: `Youth Safety and Well-Being` appears as both a standalone line and an `<h1>` on `/youth-safety`; `Integrity and Authenticity` likewise.
- **Logo alt text duplicated**: `TikTok LogoTikTok Logo` on every CG page — two logo images with identical alt, rendering as a doubled announcement.
- **`his/her`** on the for-parents page, inconsistent with `your teen` / `they` elsewhere on the same page.
- **`Next article` and `Read next`** as two adjacent labels for one pager control.
- **No `Skip to main content`** on the section pages (`/overview`, `/enforcement`, `/youth-safety` etc.) — only on the canonical CG page.

**Negative findings, recorded honestly**

- **The canonical Community Guidelines URL serves the superseded March 2023 document**, two and a half years after its replacement took effect, under a banner still written in the future tense (`we are updating`), whose only route to the current text is the word `here`
- **`/community-guidelines/en/integrity-authenticity` is dated `Last updated, March 2023`** while its sibling sections are dated April 2024 — one section of the current guidelines carries the previous version's provenance
- **`contact us at:` renders with no email address or form** — the sole stated route for reporting an underage account
- **The eight community principles do not render** on the page that announces them
- **`NOT ALLOWED` / `ALLOWED` lists render empty** on at least two policy sections, so the enforceable content is the part that fails
- `your content was violated` — internal tooling grammar in the sentence that grants the appeal right
- `in-app Safety Center` and `Safety Center` (website) share a name
- `Our approach to content moderation uses the same criteria, no matter who creates it` sits three paragraphs from a disclosure that verified accounts receive additional quality assurance
- TikTok's platform minimum is **13**; its disclosed Apple App Store rating is **12+**. Both facts in one paragraph, unreconciled
- `content levels` named once, never defined
- `"opt-in" screen` permanently in scare quotes
- Helpline routing is generic (`Contact a helpline in your region`) with no directory, link, or in-app route — the least specific copy in an otherwise highly specific safety document
- `Accessing TikTok from a browser.` — a statement used as a heading in a list of questions, over the page's most significant limitation
- No strike ladder, penalty schedule, expiry period, appeal window, appeal limit, or appeal-failure consequence is published (cf. YouTube 144)
- An unnamed FTC resource, and a missing heading in the restricted-content quick guide
- `TikTok LogoTikTok Logo` duplicated alt on every CG page; section titles doubled on several
- `his/her` on a 2026 page
- **No accessibility statement**; no status page
- **Help Center, Safety Center home, Guardian's Guide and Tools page all blocked** — the creation-flow copy the brief asked for is unreachable

---

## Transferable patterns

1. **Name your demotion state, publish its criteria, and give the user somewhere to see it.** `FYF INELIGIBLE`, with the rule lists per policy and "this information will appear in the TikTok analytics tool." Converting silent algorithmic suppression into an inspectable, named, appealable state is the best idea in this file and it generalises to any ranked or recommended surface — marketplace listings, search results, feed content.
2. **Use a four-band content model, not a binary.** `NOT ALLOWED` / `RESTRICTED (18+)` / `FYF INELIGIBLE` / `ALLOWED`, rendered as the same four headings under every policy so the reader learns the frame once.
3. **Band by the dimension that predicts harm, not by topic.** `General conspiracy theories` → demoted; `specific conspiracy theories that name and attack individual people` → removed. Same subject, different band, because the discriminator is whether a real person is targeted.
4. **Disclose provisional states.** "Potential high-harm misinformation **while it is undergoing a fact-checking review**" is demoted, and the pendency is published. Users experience provisional enforcement; almost nobody documents it.
5. **One fixed prohibition formula, used everywhere.** `We do not allow …` — active, first person, identical across eight sections. Resist synonym variation in policy copy; readers scan for the formula.
6. **Open each rule with the value, and pre-empt the obvious objection inside it.** "Being civil does not mean you must always agree." "We welcome the creativity that new AI… may unlock. However…"
7. **Operationalise harm into named tiers with clinical examples, and let the tiers drive the bands.** `moderate physical harm` (small cuts, minor bruising) vs `significant physical harm` (broken bones, poisoning, electrocution). Definitions that do mechanical work.
8. **When a rule turns on intent, admit the subjectivity and name your proxy.** "We recognize intent can be subjective, so we use objective indicators to help us understand it, such as captions and hashtags."
9. **Publish the accepted disclosure strings, not just the disclosure duty.** For synthetic media: "a sticker or caption, such as 'synthetic', 'fake', 'not real', or 'altered'." Applies to any user-applied disclosure — AI, sponsorship, affiliate.
10. **Match the notification channel to the shape of the outcome.** Removal → notice with reason. Account ban → banner on next app open (the only surface still reachable). Demotion → a value in the analytics tool (where the creator already looks). Three outcomes, three surfaces.
11. **Give appeals and your own reports one shared status surface.** The `in-app Safety Center` tracks both appeals you have filed and reports you have made about others.
12. **Amortise the non-exhaustiveness disclaimer once, with an explanation.** "(we are telling you this now so that you do not have to repeatedly read the phrase 'including, but not limited to')". Then never write it again.
13. **Explain your document's own typography in its preamble.** Bold = the rule; `More information` = definitions and examples.
14. **Use two dates for a policy change: `Released` and `Effective`.** A 30-day gap, both labelled, on every section. One date is ambiguous.
15. **Parallel `Decide whether / Decide how long / Decide who` across a parental-control panel.** Five of eight controls; the parent is the grammatical subject of every one.
16. **Split visibility-if-found from recommendation-to-strangers.** `Discoverability` and `Suggest account to others` as two controls. Most products collapse these and lose a real distinction.
17. **Disclose the loophole in your own parental control.** "if your teen has multiple devices, the set time limit will apply to each device individually."
18. **State the residual exposure immediately after the reassurance it qualifies.** "Even with a private account, profile information – including profile photo, username, and bio – will be visible to all users." Then name the three fields at risk.
19. **Name the age threshold, the parental control, and the default, in one block.** The `Direct Messages` entry: eligible at 16, parent may restrict or disable above that, automatically off for 13–15.
20. **Publish a single cross-policy index of your adult-only band.** The `RESTRICTED (18 years and older)` quick guide, placed in the youth section rather than distributed across six policy pages.
21. **Categorically exclude minors from reduced-protection classes, and say so twice.** "We do not identify people under the age of 18 as public figures."
22. **Add `Counterspeech` to your public-interest exceptions as a named category.** It is the largest false-positive class in hate-speech enforcement and it deserves a slot, not a paragraph.
23. **Bound your own exception two ways: a disclosed downgrade and a hard floor.** An exception may still cost FYF eligibility; and no exception exists for suicide or child sexual abuse content whatever the context.
24. **Use `you or someone you know` in every support-resource block.** It lets a reader accept help without self-identifying. Four uses, identical framing. Condition: pair it with a *specific* destination, which TikTok does not.
25. **Counter-example: never let the canonical URL of a governing policy serve a superseded version.** Two and a half years, future-tense banner, `here` as the only route. The single worst content-operations failure in this harvest.
26. **Counter-example: `your content was violated`** — do not let internal tooling grammar reach the sentence that grants a user their appeal right.

## Caveats & gaps

- **The Help Center is blocked**, so **T7 (errors) and T11 (help architecture) are `[absent]`** and the brief's **creation-flow copy is largely `[absent]`**. `support.tiktok.com/en` returned an empty body. Two coexisting help systems were identified by URL scheme only (`support.tiktok.com/en/safety-hc/…` and `tiktok.com/support/faq_detail?id=…`); neither was retrievable. Per the harvest rules no alternative retrieval route was attempted.
- **The Safety Center home, `Guardian's Guide`, and the `Tools` page are blocked** (empty bodies). `Youth Portal`, `TikTok's Top 10 Tips for Parents`, `TikTok Parental Guide` and the `Transparency Center` are named but unharvested. **The screen-time and wellbeing prompt copy the brief asked for is therefore `[absent]`** beyond the `Screen Time Management` control label and its two-sentence scope.
- **Two Community Guidelines sections returned empty bodies**: `Sensitive and Mature Themes` and `Account Integrity` (slug confirmed but unconfirmed as the live section name — `privacy-security-services` also returned empty). So the `Sensitive and Mature Themes` policy family — which is where nudity, sexual content and graphic-content rules live in full — is unharvested, and only its cross-referenced `RESTRICTED` items are recorded.
- **On two of the sections that did render, the `NOT ALLOWED` / `ALLOWED` / `RESTRICTED` / `FYF INELIGIBLE` lists were empty** (client-rendered). `safety-civility` and `mental-behavioral-health` are therefore captured as prose, definitions and band *headings* only. Any specific prohibited or permitted item for those policies is **not recorded here**, and none is inferred.
- **The eight community principles are not recorded** — the page names them and the list did not render. They exist; they were not observed.
- **All in-product strings are `[documented]` or inferred from policy prose.** No app UI, no creation flow, no `Content & Activity` settings screen, no `Restricted Mode` toggle, no Family Pairing setup screen, no `"opt-in" screen`, no report flow, and no appeal form was observed. The Family Pairing control *labels* are quoted from the Safety Center page, not seen in the product.
- **No feed was viewed and no individual user content was accessed**, per the brief. No social feature was used.
- **No enforcement ladder was found.** TikTok publishes `severe or repeated violations → ban` with no intermediate states, expiry periods, appeal windows, appeal limits, or appeal-failure consequences. The 2023 document points to "Information on account-level enforcement can be found **here**" — a destination not reachable in this harvest. A ladder may exist and be unharvested; **its absence from the enforcement page is recorded as observed, its non-existence is not claimed.**
- **The stale-canonical-URL finding is recorded as observed on 2026-09-21.** It may be a caching artefact rather than a permanent state; re-verification is advised before citing.
- **`content levels`, `Advisory Councils`, and the `safety toolkit`'s contents are named but undefined** in observed copy. No definition is inferred.
- **Locale is `en` only**, with US-specific provisions (under-13 experience, NCMEC, FTC/WiredSafety resources) called out inline. TikTok operates materially different age-assurance and teen-default regimes in the EU (DSA) and UK (Online Safety Act / Children's Code), entirely unharvested. The document itself flags variance: "There are additional age limitations based on local law in some regions." The `TikTok Family Safety Toolkit for South East Asia` is named and unharvested.
- **No accessibility statement and no status page** were found; both recorded as absence.
- The `Transparency Center`, `Youth Portal`, TikTok's IP-reporting flows, the Creator/monetisation surfaces (Creator Rewards, TikTok Shop) and the advertising policies are all out of scope or unreached.

## Sources

1. https://www.tiktok.com/community-guidelines/en/ — *serves the superseded March 2023 version*
2. https://www.tiktok.com/community-guidelines/en/overview
3. https://www.tiktok.com/community-guidelines/en/community-principles — *prose only; the eight principles did not render*
4. https://www.tiktok.com/community-guidelines/en/enforcement
5. https://www.tiktok.com/community-guidelines/en/youth-safety
6. https://www.tiktok.com/community-guidelines/en/safety-civility — *band lists did not render*
7. https://www.tiktok.com/community-guidelines/en/integrity-authenticity — *dated `Last updated, March 2023`; band lists rendered*
8. https://www.tiktok.com/community-guidelines/en/mental-behavioral-health — *band lists did not render*
9. https://www.tiktok.com/safety/resources/for-parents

**Attempted and blocked (recorded in Caveats):**
10. https://support.tiktok.com/en — empty body
11. https://www.tiktok.com/safety/en — empty body
12. https://www.tiktok.com/safety/en/tools-and-guides/guardians-guide — empty body
13. https://www.tiktok.com/safety/resources/tools — empty body

Also attempted, empty: `/community-guidelines/en/sensitive-mature-themes` · `/community-guidelines/en/account-integrity` · `/community-guidelines/en/privacy-security-services` · `/safety/en/policies-and-engagement/protecting-teens` · `/safety/en/family-pairing` · `/safety/en/screen-time`
