# 139. Outschool

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Live online classes for children (ages 1–18), marketplace model with independent educators; homeschool and public-funding channel |
| Primary URL | https://outschool.com/ |
| Corpus rank | 139 |
| Benchmark strength (source list) | Parent and learner decision content |
| Locale / market observed | en (US-centric: ESA, charter schools, DCFSA, ClassWallet, Pacific time); help centre serves `/en/` only on the paths harvested |
| Platform observed | Intercom help centre (`support.outschool.com`) — **the marketplace itself is client-rendered and returned empty bodies** |
| Auth state | Unauthenticated public surfaces only. No community feature was interacted with; no individual learner's profile, class or content was viewed or collected. All findings are from Outschool's own published guidance. |
| Regulatory posture | **COPPA** named directly (`Using Third-Party Tools with Learners` — "Information for educators on COPPA-compliant resources"); parental consent implicit in the account model (the parent holds the account, the child is a "learner" under it); mandatory annual criminal background checks for all educators via named vendors (Persona/Yardstik in the US, Checkr in CA/MX/ES/AU/NZ/KR, Accurate in the UK) with an explicit statement that non-Outschool **DBS** screenings are not accepted; US public-funding compliance (ESA, charter, Purchase Orders, ClassWallet, DCFSA); class recordings and visual identity verification as safeguarding controls; law-enforcement contact committed to in the learner-conduct policy. **No GDPR-K / UK-specific children's-code content was observed on the harvested paths** — recorded as absent, not as non-existent |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | **Partial — blocked on the marketplace.** `outschool.com` (homepage, `/online-classes/*` category pages) returns a valid response with an **empty body**: only `<title>` and meta tags are in server HTML. No class listing page, age-range chip, price, teacher card, review, filter label or enrolment CTA was observable. Everything about the buying surface in this file is `[documented]` from the help centre or from the one observed `<title>`. The dual-audience question this product is in the corpus for is therefore answered from Outschool's *policy and guidance* copy rather than from its *product* copy |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage (blocked) | https://outschool.com/ | Empty body; `<title>` captured |
| Category page (blocked) | https://outschool.com/online-classes/math | Empty body; identical `<title>` to the homepage |
| Help centre home | https://support.outschool.com/en/ | 14 collections with scope lines and article counts |
| Collection: What is Outschool? | https://support.outschool.com/en/collections/2923466-what-is-outschool | Parent-facing decision content, 18 articles |
| Collection: Class Formats and Standards | https://support.outschool.com/en/collections/2923452-class-formats-and-standards | Teacher-facing listing requirements |
| Collection: Policies and Security Information | https://support.outschool.com/en/collections/2923472-policies-and-security-information-for-outschool-users | 23 articles across Policies / Security / Teacher Policies |
| Collection: Payments, Refunds, and Offers | https://support.outschool.com/en/collections/2923552-payments-refunds-and-offers | 17 articles, four sub-sections |
| Collection: Background Checks and Identity Verification | https://support.outschool.com/en/collections/2923448-background-checks-and-identity-verification | 2 articles |
| Article: How do Outschool Classes Work? | https://support.outschool.com/en/articles/19491-how-do-outschool-classes-work | **The class-format vocabulary — the core artefact** |
| Article: Learner Safety and Privacy: For Parents | https://support.outschool.com/en/articles/579976-learner-safety-and-privacy-for-parents | The parent-duties contract |
| Article: Community Standards | https://support.outschool.com/en/articles/16039-community-standards | **Three separate codes of conduct in one document** |
| Article: Class Cancellation Policy and Refund Eligibility Guidelines | https://support.outschool.com/en/articles/4626920-class-cancellation-policy-and-refund-eligibility-guidelines | 24-hour rule, full/prorated tiers, no-show rules |
| Article: Learning Experience Pledge | https://support.outschool.com/en/articles/16379-learning-experience-pledge | Voucher remedy with first-person eligibility examples |
| Article: Educator Background Checks | https://support.outschool.com/en/articles/2701506-educator-background-checks | Vendor names, screening scope, annual renewal |
| Article: FAQ for Outschool Families | https://support.outschool.com/en/articles/4321090-faq-for-outschool-families | 12 questions across three sections |

---

## T1 Navigation & IA labels

**Marketplace navigation** `[absent]` — blocked (see Harvest completeness).

**The one observable string from the marketplace, and it is a defect** `[observed]`

> `<title>`: `Outschool - Live Online Classes for Kids | 140,000+ Subjects, Ages 3-18`

The title is well-built for a dual audience — **format** (`Live Online Classes`), **beneficiary** (`for Kids`), **scale** (`140,000+ Subjects`), **eligibility** (`Ages 3-18`) in four segments. A parent scanning search results gets the whole offer in one line, and `Ages 3-18` is doing the single most important job on the page: telling them whether this product is for their child at all.

But the help centre says, in four separate places and in bold, **ages 1–18**: "Outschool classes are only open to children ages 1-18 (no adults)"; "**Only children 1-18 may take Outschool classes.**"; "live, small-group classes for kids and teens ages 1–18"; "Outschool brings together learners ages 1–18".

**`Ages 3-18` in the marketplace title versus `ages 1-18` in the policy and FAQ copy is the most consequential content inconsistency in this batch.** It is an eligibility boundary on a child-safety product, it appears in the highest-traffic string the company owns, and the two numbers cannot both be the rule. The most likely explanation is that the title is stale (a lower bound was extended downward, or upward, and one surface was not updated). Either way a parent of a two-year-old gets a different answer depending on which page they read, and a parent of a two-year-old is exactly the reader for whom that boundary matters most.

**Help centre — 14 collections, each with a scope line and an article count** `[observed]`

| Collection | Scope line (verbatim) | Articles |
|---|---|---|
| `What is Outschool?` | "Get to know our live, online classes and whether they're a good fit for your learner(s)." | 18 |
| `Account Settings & Features` | "How to manage your Outschool account." | 15 |
| `Background Checks and Identity Verification` | *(none)* | 2 |
| `Payments, Refunds, and Offers` | "Information on class payment methods, refund policies, and other Outschool offers." | 17 |
| `Memberships` | "How to purchase, manage, and enroll in classes with an Outschool membership." | 1 |
| `Information for Prospective Educators` | "Learn more about what it's like to teach on Outschool, and how to apply." | 7 |
| `Getting Started as an Outschool Educator` | "Information for newly approved educators about setting up their teaching accounts…" | 9 |
| `Educators: Using the Outschool Website` | "Using the Outschool Classroom and other website tools to teach your classes." | 24 |
| `Educators: Teaching Classes on Zoom` | "How to use Zoom and information on the features offered in Outschool's Zoom version." | 4 |
| `Class Formats and Standards` | "Understanding Outschool's different class types and the requirements to teach them." | 10 |
| `Public Funding` | "Information for families and teachers about public funding programs." | 14 |
| `Listing Classes` | "How educators can submit new classes for publication." | 6 |
| `Policies and Security Information for Outschool Users` | "Standards and guidelines for all Outschool users." | 23 |
| `Outschool Support Resources` | "Contacting the Outschool Support team." | 1 |

**The IA is the dual-audience finding.** Note the naming discipline: four collections are explicitly prefixed or scoped to educators (`Information for Prospective Educators`, `Getting Started as an Outschool Educator`, `Educators: Using…`, `Educators: Teaching…`), and the rest are audience-neutral or family-facing. Outschool does **not** use an audience toggle the way Udemy and Skillshare do — instead it **puts the audience in the collection title**, so a parent scanning a flat list of 14 can self-exclude at a glance without clicking a tab. On a flat Intercom help centre that is the right choice, and the `Educators:` colon prefix is the mechanism.

Three collections are deliberately mixed-audience and say so: `Public Funding` — "for families **and** teachers"; `Policies and Security Information` — "for **all** Outschool users"; `Class Formats and Standards` — "Outschool's different class types **and** the requirements to teach them". The last is the interesting one: the same collection teaches a parent what a "Camp" is and teaches a teacher what they must do to list one. One vocabulary, two readings, one place.

**The parallel-article pattern — Outschool's signature dual-audience device** `[observed]`

The platform repeatedly ships **the same topic twice, with the audience named in the title after a colon**:

| Parent/family version | Teacher version |
|---|---|
| `Learner Safety and Privacy: For Parents` | `Learner Safety and Privacy: For Teachers` |
| `Learner Content Moderation: For Parents` | *(teacher equivalent implied by `Class Moderation` policies)* |
| `Outschool Payment Options: FAQs for Parents` | `Outschool Payment Options: FAQs for Teachers` |
| `Self-Paced Classes for Families` | `Self-Paced Classes for Teachers` |
| `Tutoring Classes for Parents` | *(teacher equivalent in educator collections)* |
| `Zoom Basics for Parents` | `Educators: Teaching Classes on Zoom` |
| `Refund Policies for Teachers` | ← counterpart of `Class Cancellation Policy…` (family-facing) |
| `Private Group Classes - For Educators` | *(parent request path documented separately)* |
| `Information for Teachers on Learner Verification` | ← counterpart of `Outschool Alternative Learner Verification Program` |

**`<Topic>: For Parents` / `<Topic>: For Teachers` is a reusable solution to the dual-audience problem, and it is better than a toggle** for this product, because the two audiences have *different duties* on the same subject, not different views of the same information. A toggle implies one truth filtered two ways; the paired-article pattern admits that the parent's obligations and the teacher's obligations on learner safety are genuinely different documents. The cost is maintenance drift between pairs, and the `Ages 3-18` / `ages 1-18` split is evidence that drift happens here.

**Sub-collection nesting** `[observed]`: `What is Outschool?` contains `Taking Classes on Zoom`, `Choosing Classes`, `Finding the Classes You Want`, `Class Types`. `Payments, Refunds, and Offers` contains `Paying for Classes`, `Refunds`, `Outschool Offers`. `Policies and Security Information` contains `Policies`, `Security`, `Teacher Policies`. So the third level exists but is used sparingly and consistently.

**Help-centre footer** `[observed]`: `Outschool Home` · `Website Status Page`. Two links. Surfacing a status page in a two-item footer, on a product whose failure mode is *a live class not starting*, is correct prioritisation.

## T2 Value proposition & headline patterns

Marketing headlines are `[absent]` — blocked. What follows is from the `<title>` and from help-centre value copy.

**The four-segment title pattern** `[observed]` — analysed in T1. `140,000+ Subjects` is the noun choice worth noting: not "classes", not "courses", but **subjects**. On a platform whose catalogue includes "Fortnite or world dance", claiming subject breadth rather than class count reframes the long tail as coverage rather than as volume.

**The value proposition as written for parents** `[observed]`, from `FAQ for Outschool Families`:

> "Outschool is an online learning platform offering live, small-group classes for kids and teens ages 1–18."

Four qualifiers in one sentence: **live**, **small-group**, **for kids and teens**, **ages 1–18**. Each is a purchase criterion a parent actually applies, and `small-group` is the one that distinguishes this product from every other item in this batch.

The next paragraph makes the long-tail catalogue a virtue rather than a risk:

> "We offer live and asynchronous classes on a wide range of topics, from math and science to art, languages, and even unique interests like Fortnite or world dance. We aim to help families find classes that spark curiosity and match each learner's passions."

**`Fortnite or world dance` is the most important pair of words in Outschool's value copy.** It is the platform pre-empting the parent's suspicion ("is this serious?") by naming its two most eyebrow-raising categories itself, in the same sentence as math and science, and then reframing them with `spark curiosity` and `match each learner's passions`. Owning the weird end of your catalogue in your own FAQ is the same move Udemy makes with `What are the limitations of Python?`.

**The dual-audience sentence, in one construction** `[observed]`:

> "Get to know our live, online classes and whether they're a good fit for your **learner(s)**."

The collection's scope line addresses the **parent** in the second person and refers to the **child** in the third person, with a parenthesised plural for families with more than one. `your learner(s)` is the grammatical solution to the dual-audience problem: one sentence, one reader, one beneficiary, and the possessive linking them. Outschool uses this construction consistently and it is the single most transferable string pattern in this file.

**Benefit framing is emotional-then-practical** `[observed]`: "classes that spark curiosity and match each learner's passions"; "a place where learning truly comes to life"; "inspiring online classes that spark curiosity, build confidence, and fit your family's schedule." That last triplet is precisely calibrated for the buyer: **curiosity** (for the child), **confidence** (for the child, but it is the parent's worry), **fits your family's schedule** (purely the parent's constraint). One sentence, two audiences, three benefits, ordered child-first.

**Section headings in the family FAQ are the parent's questions verbatim** `[observed]`: `About Outschool` → `Taking Classes` → `Programs and Funding`. Three sections in the order a parent moves through: what is this, how does it work for my child, how do I pay for it.

## T3 CTA inventory

Marketplace CTAs `[absent]` — blocked. No enrolment, membership, search or filter control was observable.

**Observed in help copy and referenced UI** `[observed]` / `[documented]`

| CTA / control (verbatim) | Context | Notes |
|---|---|---|
| `Start Live Meeting` | Teacher control that begins a class; rendered in help as "the green ***Start Live Meeting*** button" | The single named control in the safety policy — see T10 |
| `withdraw` | Parent control on the enrolment-management page | **Deliberately not "cancel"** — see T6 |
| `stop subscription` | Replaces `withdraw` on recurring weekly classes after the first meeting | Two different controls for two different commitment types |
| `Help` | "click *Help* on the Outschool website" — the support entry point | |
| `Contact us` | Refund escalation, repeated per refund tier | |
| `Did this answer your question?` | Foot of every help article | With three emoji reactions, see T9 |
| `Outschool Home` / `Website Status Page` | Help footer | |
| `Search for articles...` | Help search placeholder | |
| `All Collections` | Breadcrumb root | |

**Observation.** The two controls that matter commercially — `withdraw` and `stop subscription` — are both **honest about their effect rather than about the user's intent**. `withdraw` removes the learner from the class; it does not promise a refund, and the help copy says so explicitly (see T6). A button labelled "Cancel" would imply undoing the purchase. This is a good example of naming a control after what the system does rather than after what the user hopes.

## T4 Onboarding & getting-started

**Two onboarding paths, and the product documents both** `[observed]`

> "Families can start learning on Outschool by joining with a `membership` or using `education funds` through an approved public program."

A consumer path and a **public-funding path**, given equal billing in the answer to "How do I get started on Outschool?". The funding path is then supported by a 14-article `Public Funding` collection covering ESA, charter, Purchase Orders, organisation admin accounts, ClassWallet and class buyouts. For a US homeschooling audience this is not a payment method, it is the *reason they are here*, and treating it as a first-class onboarding route rather than a checkout option is the correct read.

**The first-class preparation sequence is a four-part parent duty list** `[documented]`, from `How to prepare for your first class` (titled "4 ways to help your learners have fun and safe online learning experiences"). The **number is in the subtitle**, so a parent knows the size of the ask before opening it.

**Homeschool onboarding as content marketing with a real artefact** `[observed]`: `Homeschool 101 eBook`, plus a blog article `How to start homeophooling: 10 steps to start your homeschool journey` [*sic* — the FAQ's own link text reads "How to start homeschooling: 10 steps…"]. The FAQ question is phrased in the parent's voice: **`I'm just getting started with homeschooling. Can you offer some advice?`** — a statement of the reader's situation followed by a request, which is the Wise "first-person confession" pattern applied to a non-failure state.

**Special-needs fit, answered as a routing instruction** `[observed]`. The question is `My learner has special needs. Is Outschool a fit?` and the answer's operative sentence is:

> "If there is a class you're excited about, we encourage you to message the teacher directly to see how their classroom style may fit your learner based on their needs."

**Rather than promising accommodation, the platform routes the parent to the individual teacher.** That is honest for a marketplace — the platform cannot commit on a teacher's behalf — and it gives the parent an action. The answer also names the two directions of fit ("gifted learners to extend their learning **and** learners needing academic support to get the remediation they need") and makes a careful, bounded claim: learners with neurodivergencies "can also gain access to resources, experiences, interventions, and support on Outschool that may **not be available in your local setting**". The comparison class is the family's local provision, which is the comparison the parent is actually making.

Terminology note: `neurodivergencies` and "learners of all abilities" are used in preference to clinical or deficit framing.

## T5 Form & field labels

`[absent]` for marketplace forms — blocked. No enrolment, learner-profile, age-entry, parental-consent or payment field was observable, which is a material gap for a COPPA-relevant product.

**Documented field and page names** `[documented]`

| Name | Role |
|---|---|
| `enrollment management page` | Where withdrawal and subscription-stop happen |
| `schedule` | The parent's calendar view (`outschool.com/learn/schedule?view=classes&tab=enrolled`) — note the URL exposes `view=classes` and `tab=enrolled` as the state vocabulary |
| `account transactions page` | Where vouchers and expiry dates are listed |
| `Parent Conversations Tabs` / `parent messaging platform` | The parent↔teacher channel, named twice with two different labels |
| `Conversations tab` | The same thing again, singular |
| `Transcripts` | A parent-generated proof-of-enrolment artefact (`outschool.com/account/transcripts`) |
| `Private Settings` (teacher `Account Settings`) | Where a teacher renews their background check |
| `National Identification Number` | Background-check field; with a per-market instruction ("For Australian background checks, please enter your passport number under the National Identification Number field") |
| `Supporting Information box` | *(FutureLearn — n/a)* |

**`Parent Conversations Tabs` / `Conversations tab` / `parent messaging platform` — three labels for one channel, in two adjacent articles.** Flagged. On a product where "keep all communication on Outschool" is a *safety rule*, the channel the parent is required to use should have exactly one name.

The Australian passport instruction is the kind of per-market field hint the Wise exemplar praises: rather than renaming the field for one country, Outschool tells that country's users what to put in it.

## T6 Status & state language

### The class-format vocabulary — the artefact this product is in the corpus for

`[observed]`, from `How do Outschool Classes Work?`. Outschool separates **delivery mode** from **length/cadence** and names each independently.

**Delivery mode (2):**

| Format | Definition (paraphrased; quoted fragments verbatim) |
|---|---|
| `Live Online Classes` | Live meetings over video chat at scheduled times; "A class could meet just once, or many times over a semester." Crucially: "These classes are more than just the live meetings - most of these classes also involve independent work before or after the live meetings." |
| `Self-Paced Classes` | No scheduled live meetings; pre-recorded lessons, asynchronous messaging with the teacher in the Outschool Classroom |

**Length and cadence (5, under the heading `Class Length: One-Time, Short, Semester, Recurring Weekly`):**

| Format | Mechanics | The decision it is written to support |
|---|---|---|
| `One-Time Classes` | "meet once in a video chat session" | "great for exploring new interests and **discovering whether a teacher's style works well for your learner before committing to a longer course**" |
| `Short Courses` | "meet 1 or more times each week for 2-7 weeks" | "great for developing a new skill or diving deep into a topic, **even if your schedule doesn't permit a full semester course**" |
| `Camps` | "multi-day classes that meet two or more times within the same week" | *(no rationale given)* |
| `Semester Courses` | "meet 1 or more times each week for 8 or more weeks" | "Longer courses create more opportunities for real-time activities, engaging projects, and interaction with diverse classmates from other states and countries." |
| `Recurring Weekly Classes` | "meet weekly and are charged weekly as a subscription on Sunday mornings" | "a way for learners to study a certain topic with the same teacher **without a set end date**… works well for art classes, book clubs, music lessons" |

**Plus a sixth format that is neither:**

| `Groups` | "online communities that allow learners to pursue their interests and connect with other learners anytime, anywhere. Groups are similar to a forum and are fully 'asynchronous'" — "perfect for families with busy schedules" |

**Why this is the best format taxonomy in the batch.** Every format is defined by **a number** (once / 2–7 weeks / two or more times in a week / 8+ weeks / weekly with no end date) and then justified by **the constraint it solves for the parent**. `One-Time` is explicitly positioned as a *low-risk trial of the teacher* — "discovering whether a teacher's style works well for your learner before committing" — which is a marketplace-trust mechanic disguised as a class length. `Short Courses` and `Groups` are both justified by the family's *calendar*, not by pedagogy. `Semester Courses` is the only one justified pedagogically, and even then the benefit named is social ("diverse classmates from other states and countries"), because that is what a homeschooling parent is short of.

The disclosure inside `Live Online Classes` — "more than just the live meetings… also involve independent work before or after" — is expectation-setting at exactly the right moment: a parent budgeting a 45-minute slot is told, before booking, that the commitment is larger than the calendar entry.

**Three defects in this taxonomy, all recorded** `[observed]`:

1. **The section heading does not match its contents.** `Class Length: One-Time, Short, Semester, Recurring Weekly` lists four; the section contains five (`Camps` is omitted from the heading) and is followed by a sixth (`Groups`) outside it.
2. **The anchor IDs preserve two abandoned names.** `#class-length-one-time-short-semester-ongoing` and `#flexible-schedule-classes` are live anchors on the page, and one inline link still resolves to `…articles/2272596-ongoing-classes-for-learners` while its link text says "Recurring Weekly classes". So `Recurring Weekly` was formerly **`Ongoing`**, and something was formerly **`Flexible Schedule`**. A rename executed in the copy but not in the URLs, anchors or link slugs — and the old vocabulary is still what a search engine sees.
3. **`Camps` gets no rationale sentence** while all four of its siblings get one. The pattern is broken for the one format a parent is most likely to be buying as childcare.

**Other named states** `[observed]` / `[documented]`

| State / term | Context |
|---|---|
| `enrolled` | URL state (`tab=enrolled`) |
| `withdraw` | Removes the learner; **does not necessarily refund** — "if you are outside a policy's refund window, the *withdraw* button will only remove your learner from class and not issue a refund" |
| `stop subscription` | Replaces `withdraw` after the first meeting of a recurring weekly class |
| `transfer` / `transferred into` | Moving between sections; carries its own refund-clock rule |
| `section` | A dated instance of a class (the unit the refund clock attaches to) |
| `missed meeting` | A named state with consequences (no refund; 10-minute no-show may be cancelled at teacher discretion) |
| `visual verification` / `check in` | The mandatory start-of-class identity step |
| `Alternative Learner Verification` | The named exception programme for learners who cannot or will not use a camera |
| `Tutoring Classes` · `Private Group Classes` · `Class Buyouts` | Three further commercial formats, each with its own article |

**`withdraw` is the most carefully written state label in this file.** The platform needed a word that means "remove my child from this class" without implying "give me my money back", because those two things are governed by different rules and the parent will often be entitled to only the first. `withdraw` does that, and the help copy then states the separation in one sentence. Compare `Cancel membership` (Skillshare) and `cancel the free trial` (Udemy) — both correctly imply a commercial reversal. Outschool's control is not a commercial reversal, and its label does not pretend to be.

## T7 Error, failure & recovery

**The failure modes of this product are physical and time-bound**, and the help IA reflects that. `[observed]` / `[documented]`

`Classroom & Zoom Troubleshooting Tips` — "Common fixes for trouble connecting to your live video meeting or resolving website issues". The scope line names the two failure classes in order of urgency: **the class is starting and I cannot get in**, then everything else.

`Zoom Basics for Parents` — "Getting started with Zoom and enhancing your learners' online classroom experience". A whole article on a third party's software, written for the parent, because the parent is the one who will be troubleshooting it while a class is live.

**A pre-emptive anti-phishing instruction placed inside the safety policy** `[observed]`:

> "**Never ask teachers for login information or exchange Zoom links with a teacher via Outschool messaging.** It is against Outschool's policy for teachers to share Zoom links, meeting IDs, or passcodes, as all class meetings should begin with the green ***Start Live Meeting*** button for security purposes. If you have problems logging into your classroom, please double-check that you are logged into the Outschool website or App."

The construction is: **prohibit the request** → **state that the other party is also prohibited from complying** → **name the legitimate mechanism, by its button label and colour** → **give the first troubleshooting step for the case that made you ask**. Naming the green `Start Live Meeting` button gives the parent a positive recognition cue, so they are not only told what not to do. This is the same inoculation pattern as FutureLearn's WhatsApp/Telegram warning, but tighter, because it ends with the real fix for the real underlying problem ("I can't get into class") that would otherwise drive the unsafe behaviour.

**Recovery article titles** `[observed]`: `Classroom & Zoom Troubleshooting Tips` · `Extenuating Circumstances for Teachers` ("How Outschool works with teachers when emergencies arise") · `My friend's account was hacked!` *(Scratch — excluded)* · `Teacher restriction and removal` ("How we address activity that does not meet Outschool's Terms").

`Extenuating Circumstances for Teachers` is the notable one: a named policy for *the supplier's* emergencies, published where parents can read it. On a live-class product, the teacher's sick child is the parent's failure mode, and documenting the platform's posture toward it publicly is a trust decision.

## T8 Empty states

`[absent]` — no empty state was observable. The marketplace is blocked, so no zero-results search, empty schedule, or no-enrolments state could be seen. Help-centre search returned no queries during harvest.

This is a genuine gap for this file: a class-discovery product for children will have consequential empty states (no classes at this age, no classes at this time, no classes in this subject for this age) and none of that copy is in this harvest.

## T9 Notifications & system messages

**Article-feedback control — three labelled emoji** `[observed]`

> `Did this answer your question?`
> `Disappointed Reaction😞` · `Neutral Reaction😐` · `Smiley Reaction😃`

The three options carry **text labels alongside the emoji** (the accessible names are `Disappointed Reaction`, `Neutral Reaction`, `Smiley Reaction`), so the control is not emoji-only. The middle option existing at all is worth noting — a three-point scale admits "this partly helped", which a binary yes/no does not. Against that: `Smiley Reaction` names the *face* rather than the *sentiment* ("Disappointed" and "Neutral" name sentiments; "Smiley" names a glyph), so the three labels are not parallel.

**Documented notification and timing commitments** `[observed]`

- Recurring weekly classes bill "as a subscription on **Sunday mornings**", and the article repeats "rolls over Sunday mornings **Pacific time**" when it matters for the cancellation deadline. A named weekday plus a named time zone for a recurring charge is the correct precision; naming it twice, once loosely and once precisely, is the correct escalation.
- Refund settlement times are given **per rail**: "Refunds processed to credit cards typically appear within 1-3 business days. Refunds to ClassWallet balances may take up to 14 business days due to varying processing times." The 14-day case is explained ("due to varying processing times") rather than left as an outlier.
- Voucher expiry: "The voucher will expire after 90 days from the date of issuance. You can review your voucher, along with the date of expiration, on your `account transactions page`." Expiry plus the place to check it.
- Background-check renewal: "our team will send you an email prompting you to begin the process" — a named prompt with a named consequence for ignoring it (see T10).
- **Daylight saving is addressed as a notification failure** `[observed]`: "If your learner's meeting time changes because of daylight saving time starting or ending for several world regions, you are not entitled to a refund if they cannot attend. Please review your learner's schedule beforehand to ensure you know when classes are meeting." A platform that sells scheduled live sessions across time zones to children has a real DST problem, and it has written a policy line and a parent instruction for it. Most products discover this in support tickets.

`[absent]` for transactional email, push and in-class notification copy.

## T10 Disclosures, legal & compliance

### Age, and who the account belongs to

`[observed]` The eligibility rule is stated in bold and repeated:

> "Outschool classes are only open to children ages 1-18 (**no adults**), and learner safety is our top priority."
> "**Only children 1-18 may take Outschool classes.** No one will be allowed in class unless a teacher can visually verify their identity at the start of each class."

`no adults` as a parenthetical exclusion is doing real safeguarding work: it is the sentence that makes an adult-in-a-children's-class an eligibility violation rather than a judgement call. The rule is then operationalised through three mechanics — **name matching** ("Names must match your learner's Outschool name, so please ensure your learner's name is correctly displayed on your Zoom account"), **visual check-in at the start of every session**, and an explicit prohibition on enrolment-sharing ("It violates the Outschool policy for a learner to use their sibling's or another learner's enrolment to attend class").

The camera requirement is stated with its reason and its exception, in that order:

> "**For security reasons, please ensure your child has their video camera on as they log in to class.** Your learners will be required to connect with their teacher at the beginning of every class, so they must be prepared to enable their video to allow the teacher to confirm your learner's identity. If your family does not have a camera or feels uncomfortable showing their face on camera, please contact [support] to inquire about our `Alternative Learner Verification Program`."

**Naming the exception programme, and naming two distinct reasons for needing it — no camera, or discomfort with being on camera — is the disclosure that makes the mandate acceptable.** The second reason is the one that matters: the platform concedes in writing that a child may not want to be seen, and has a named programme for it rather than a discretionary "contact us". The FAQ repeats the concession in the child's own terms: "those learners who may not want (or be able) to turn their cameras on".

Post-check-in, the requirement relaxes and the copy says so: "we encourage all learners to enable their audio/video during class to create a social class experience; however, this is **not required** unless a teacher chooses to make that a requirement of a class, **as stated in their class listing**." Mandatory for identity, optional for participation, with teacher-level variation disclosed at the point of purchase. That is three tiers of camera policy written in one paragraph without ambiguity.

### The parent's duties, written as a contract

`[observed]` `Learner Safety and Privacy: For Parents` opens by naming the shared responsibility — "We rely on Outschool parents/legal guardians and `teachers` to help us promote a safe and positive online learning environment" — and then lists what the parent must do. The list is the dual-audience artefact of this file, because **every item is an instruction to the adult about the child**:

- **"Help your learners learn and practice positive classroom behaviors before class starts."**
- Review the `Learner Code of Conduct` and `Learner Content Moderation for Parents` **with** your learners before their first class
- **"Supervise your learners (from a comfortable distance 🙂) while they attend class until you're confident they can participate safely and respectfully on their own."**
- Adults should not have on-camera conversations with other learners; logistical questions go through the parent messaging channel, not into class time
- Only children 1–18 may attend; identity must be verifiable
- Camera on at log-in
- Never request or exchange login information or Zoom links
- Personal information "should never be shared or requested except in cases to assist with educational needs"; off-platform contact between children must be brokered **parent-to-parent**

**The supervision instruction is the best-written sentence on this platform**, and it is worth taking apart:

> "Supervise your learners (from a comfortable distance 🙂) while they attend class until you're confident they can participate safely and respectfully on their own. **You know your children best!** For older learners, this may take just a few minutes. For younger learners or those with behavioral challenges, you may need to be nearby for every class."

It sets a duty, softens the intrusiveness with a parenthetical and an emoji, **hands the judgement back to the parent explicitly** ("You know your children best!"), and then — critically — gives two calibration points at opposite ends ("a few minutes" for older learners; "every class" for younger or behaviourally challenged ones). A duty with no calibration produces either over- or under-compliance; two anchors let a parent locate their own child on the scale. And "those with behavioral challenges" is named without euphemism, which the parent of such a child will read as being seen rather than excluded.

The adjacent rule is then stated from the *other* families' point of view: "Parents and non-registered siblings should be reasonably off-camera **as a courtesy to other learners** to maintain a comfortable learning environment". The justification is other people's children, not platform policy. That is the right lever for this reader.

Two hard prohibitions sit in the same list with their reasons attached: "listening to or watching class from a separate device is against Outschool's policies; teachers are instructed to remove duplicate logins" — a rule plus the enforcement mechanism, so the parent knows it is not advisory. And private parent–teacher tutoring meetings are permitted but bounded: "these discussions must be **child-centered**" and "these sessions are recorded for safety purposes; no personal information should be shared to maintain privacy and professional boundaries."

### Community Standards — three codes in one document

`[observed]` The structure is the finding: `Teacher Code of Conduct` → `Parent Code of Conduct` → `Learner Code of Conduct`, in that order, in one article, with a shared preamble.

**The preamble does something unusual — it states the platform's own obligations first:**

> "Outschool supports this shared commitment by maintaining clear community policies, responding promptly when questions or concerns arise, and listening to feedback from teachers, parents, and learners. We use that feedback to identify where the platform, policies, or community experience may need to improve. In turn, we ask all community members to assume the best intentions of others and share concerns constructively…"

Three platform duties, then the reciprocal ask, with `In turn` as the hinge. A code of conduct that begins by binding the platform rather than the user is rare and it earns the instructions that follow.

**Teacher Code of Conduct** — four sub-sections: `Class Content and Preparation` · `Professional Conduct During Class` · `Communication with Families and Learners` (plus inclusion). Notable clauses: teachers should offer classes "only in subjects where they have the appropriate background or expertise"; content must be "secular, objective, and age-appropriate"; teachers "must not teach while impaired by alcohol or drugs **or model behavior that learners age 18 or younger are restricted from doing**". That last clause is the one to note — it is not a list of banned behaviours, it is a **delegated standard**: anything a minor is not permitted to do, a teacher may not model. One clause, unbounded coverage, and a child-safety rule expressed as a mirror.

On communication, the rule is stated with its four justifications: "For the safety of learners, families, and teachers, all communication must take place on the Outschool platform. Keeping conversations on Outschool helps protect learner privacy, maintain appropriate boundaries, and allows Outschool to provide support if safety concerns or other issues arise." Then the uncomfortable line: "Outschool does not encourage or endorse in-person meetings with families outside of designated Outschool-sponsored events." A negative commitment about the highest-risk scenario, stated plainly.

**Parent Code of Conduct** — `Enrollment and Class Participation` · `Communication with Teachers`. The clause worth quoting is the attendance one, because of its justification:

> "Once a learner is enrolled, parents and guardians should help the learner attend scheduled classes whenever possible. Because **many classes rely on group participation, an absence can affect the experience for others.**"

A no-show rule justified by its effect on other children, not by the platform's economics. That is the same lever as the off-camera courtesy rule, and on a small-group product it is the honest reason.

The feedback clause closes the quality loop and names both beneficiaries: "Thoughtful feedback can help the teacher improve **and give other families useful information when choosing classes.**" Reviews framed as a duty to other parents.

**Learner Code of Conduct — the child-facing layer inside a parent-facing document** `[observed]`

> "Outschool summarizes these expectations in three guiding rules: **be kind, be safe, and be respectful.**"
> "Parents and guardians should review these rules with their learner, including what information and content are appropriate to share on Outschool."
> "Parents and guardians can watch Outschool's learner code of conduct **video** with their learner for an engaging and informative review of each rule."

**Three words, three rules, delivered to the child by the parent, with a video as the child-native format.** This is Outschool's answer to the dual-audience problem at its hardest point: the rules bind a six-year-old, the document is read by an adult, and the platform does not attempt to write for both in one register. It writes the *rule set* for the child (three words, memorable, alliterative in structure if not in sound), writes the *delivery instruction* for the adult ("review these rules with your learner"), and ships a *video* as the actual child-facing artefact. Compare Scratch (file 140), which writes its community rules directly to the child in the child's own reading register — a genuinely different solution to the same problem, and the contrast between the two is the most instructive pairing in this batch.

The enumerated prohibitions that follow are written in plain, concrete, child-legible language even though the audience is the parent — "Bully, insult, belittle, threaten, harass, intimidate, or **call other people names**"; "Make jokes or comments intended to embarrass or demean someone"; "Share inappropriate references to violence, weapons, or killing"; "Share pictures, videos, or depictions of another person **without their permission**". `call other people names` is the seven-year-old's vocabulary sitting at the end of a list of adult verbs, which is exactly the right place for it.

**The share/don't-share list is the strongest privacy copy in the batch** `[observed]`, because it is *permissive first*:

> "learners may share general information such as their first name, hobbies, favorite books or foods, pets, grade level, country, region, or time zone."

Then the prohibition list: full names · home or mailing addresses · email addresses or phone numbers · **school names** · social media accounts · **gaming usernames or gamer tags** ("unless sharing one with the teacher is necessary for an approved class activity") · websites or other ways to communicate outside Outschool · photos or recordings of another person without permission.

Telling a child what they *may* share, before what they may not, is the difference between a rule a child can follow and a rule that makes them silent. `favorite books or foods, pets` is concrete enough to be actionable. And `gaming usernames or gamer tags` with a named exception is the 2020s addition that most children's-platform policies still lack — on a platform that sells Fortnite classes, it is load-bearing.

**Enforcement, written with an explicit assumption of innocence** `[observed]`:

> "Outschool recognizes that learners may make mistakes or act without understanding how their behavior could affect others. When a concern arises, the response will depend on the nature and frequency of the conduct."

Then the ladder: notify the family → remove the material → ask the family to review the standards and the video with the learner → suspension or removal for serious or repeated violations → "When necessary, Outschool will take immediate action or contact law enforcement to protect learner safety or the integrity of the platform."

**A four-step remediation ladder whose first three steps are educational, opening with a sentence that presumes the child did not mean it.** The first remedy is *the parent and child re-watching the video together*, which treats a violation as a teaching moment and keeps the parent in the loop by design. The final tier is unhedged. Getting that progression right — presume innocence, educate, escalate, commit — is the whole craft of children's moderation copy.

### Teacher vetting

`[observed]` `Educator Background Checks` states the mandate in one sentence: "all approved Outschool educators must complete an `identity verification` and criminal background check **before they can teach on the platform**."

Then, unusually, it **names the vendor per region**: Persona (US, with screening partner Yardstik named too), Checkr (Canada, Mexico, Spain, Australia, New Zealand, South Korea), Accurate (UK). And states who pays: "Outschool pays all associated fees regardless of region." And where it cannot operate: "we are unable to perform background checks for applicants residing in Puerto Rico, Guam, or other U.S. territories."

**The screening scope is disclosed**, which almost no platform does: checks screen for "violent offenses and/or trust and safety offenses"; trust-and-safety charges "include, but are not limited to" fraud and deception, internet crimes, statutory crimes, criminal intent; and — the line that shows this is a real policy rather than a marketing claim — "Due to the virtual nature of Outschool classes, **we do not consider vehicle or traffic violation offenses.**" A named exclusion, with its reason. It tells a parent that the check is calibrated to the risk of *this* product, and it tells them the platform has thought about what a background check is for.

Individualised assessment is disclosed too: "For teachers with a criminal record, Outschool will consider the nature of the offense and the time since the offense." Discretion, admitted as discretion.

**Annual renewal, with a stated grace period and a stated cliff** `[observed]`: renewal required one year after the last clear check, with a one-month window; "Enrollments are not interrupted during the one-month window." Then:

> "For learner safety, if you fail to renew your background check or fail the renewal, your account will be **immediately suspended without advance notice**, and you will not be able to teach on the platform. This includes any active enrolments prior to renewal."

An unhedged consequence, justified by the beneficiary ("For learner safety"), applying retroactively to classes already sold. Written to the teacher, but the audience that needs to read it is the parent — and it is on a public page.

Finally: "Outschool does **not** accept other DBS screenings not completed through Outschool." Refusing to accept a UK statutory check obtained elsewhere is a defensible control-integrity decision, stated in one sentence without justification. A parent in the UK might reasonably want the reason.

**What the vetting content does *not* claim** `[observed]`, from `FAQ for Outschool Families`: the answer to `How do you ensure high-quality classes?` says teachers must apply "with details about their professional background and education", that the team reviews applications "to ensure that all Outschool teachers have **teaching experience, subject matter expertise, or a unique passion they want to share**", and that classes must be submitted for approval against standards for "unique content, learning goals, teacher expertise, class experience".

**`teaching experience, subject matter expertise, or a unique passion` — a three-way disjunction, and the third disjunct is the honest one.** Outschool is telling parents, in its own FAQ, that a teacher may qualify on passion alone. No teaching credential is claimed or implied. Whether that reassures or alarms a given parent is beside the point; it is the accurate description of an open-supply model, published where the decision is made. The related teacher-side article title makes the same admission from the other side: `Using Lived Experience as Educator Expertise` — "How to create classes that accurately reflect your experiences."

### Refunds and cancellation — four regimes

`[observed]` `Class Cancellation Policy and Refund Eligibility Guidelines`.

**The base rule, stated twice — once as policy, once as three cases:**

> "Cancel within 24 hours of purchase to receive a refund. If the class meets or access begins within 24 hours of enrollment, cancel before it begins to receive a refund."

Then the same rule as three bulleted cases: cancel within 24 hours of enrolment or of the Sunday recurring renewal; **or** cancel before the class meets, if it meets inside that 24 hours; **or** cancel before content access begins, for self-paced. **A 24-hour cooling-off period on a product that may start in two hours needs a "whichever comes first" clause, and Outschool writes it out as cases rather than as a conditional.** This is the same two-start-rules problem FutureLearn solves for cooling-off periods, solved differently: FutureLearn defines when the clock *starts*; Outschool defines when it *ends*.

**The `withdraw`-is-not-`refund` separation** `[observed]`: "if you are outside a policy's refund window, the *withdraw* button will only remove your learner from class and not issue a refund." The control's limits stated in the policy that governs it.

**Transfer interaction, with a worked example** `[observed]`: "If you transfer into a class section and then withdraw, the timing of the Class Cancellation Policy will apply based on the start time of the **earliest** class section you enrolled in", followed by a dated example (December 1st → December 15th; the December 1st date governs). An edge case most products would leave to support, resolved in two sentences plus an example.

**Full refunds — three teacher-fault cases** `[observed]`: teacher cancels before the first meeting; teacher misses a one-time meeting ("parents may request a full refund **or wait for the teacher to reschedule**" — a choice, not an imposition); teacher changes the date or time before the class starts.

**Prorated refunds — three partial-failure cases** `[observed]`: part of the class rescheduled (prorated on meetings not attended); teacher doesn't teach the number of meetings listed; teacher cancels mid-course (prorated on the percentage of cancelled meetings paid for). Each is "upon request" and routed through Support, and the basis of the proration is named in each case ("based on the number of live meetings in a class's section").

**`Additional Policies` — the no-refund cases, stated without softening** `[observed]`:

- Learner misses a meeting → no refund. "If you miss 3 consecutive class meetings without communicating with the teacher, you forfeit the class fee, and the teacher may cancel the class or withdraw your learner." The escape hatch is named — the teacher *may*, at discretion, transfer the learner or supply a recording.
- **"If your learner does not join the meeting 10 minutes after the class starts, the teacher may cancel it at their discretion. This is considered a missed meeting, and you are not entitled to a refund."** A numeric lateness threshold, with the consequence named.
- Schedule conflicts, daylight saving, donations → no refund.
- "in rare cases, if a parent requests an excessive number of refunds, they may be **disqualified from receiving future refunds**." Discretionary, unquantified, and disclosed — the same construction as Udemy's refund-abuse clause.

**The `Learning Experience Pledge` — a voucher remedy with first-person eligibility examples** `[observed]`

This is the most distinctive refund artefact in the batch. It sits *outside* the cancellation policy and covers the case the policy cannot: you attended, and it was wrong for your child.

Mechanics, all verbatim or near: contact Support "within one week of attending your first live class or accessing self-paced content"; voucher equal to the full enrolment value; **90-day expiry**, checkable on the transactions page; **up to three (3) times per calendar year per Parent**; US customers in good standing only; excluded for classes paid with public funds (ESA, Microgrant, charter — in which case the refund goes back to the funding source's original payment method); membership credits return to the balance while the membership is active; Chat Groups excluded; vouchers non-refundable and non-transferable, void where prohibited.

**The eligibility section is written as four first-person parent sentences**, and this is the part worth stealing:

> - "I expected my learner to enjoy a live group class, but tutoring would better match their learning style."
> - "While the instructor was enthusiastic, I found the teaching style too fast-paced for my child's preferred learning speed."
> - "I registered for an Algebra 1 class, but the content covered more introductory-level skills than I expected, which my learner has already mastered."
> - "My child had an engaging class, but there were some disruptions from other learners that affected their overall experience."

Four worked examples in the **parent's own voice**, each naming a specific, non-blaming mismatch — format wrong, pace wrong, level wrong, cohort wrong. Three of the four explicitly *compliment the teacher* before stating the problem ("the instructor was enthusiastic", "My child had an engaging class"), which models a complaint that does not require the parent to accuse anyone. This is the Wise first-person-confession pattern inverted: instead of "I sent money to the wrong person", it is "I chose the wrong class, and here is how to say so without it being anyone's fault." On a marketplace where the seller is a named individual whom your child will see again, that framing is not politeness — it is the mechanism that makes the remedy usable.

The honest limits are equally clear: it is a **voucher**, not cash; three per year; 90-day expiry; and the public-funding exclusion is explained rather than merely stated.

### Other compliance surface

`[observed]`

- **COPPA named**: `Using Third-Party Tools with Learners` — "Information for educators on COPPA-compliant resources". So third-party tools in class are governed by an approval process with COPPA as the stated standard, and the base article confirms teachers may use Canvas, Edmodo, Khan Academy, Remind "**with approval**".
- `Class Recordings` — "Video recordings of live online classes", as a named policy in the top-level Policies collection.
- `Outschool Alternative Learner Verification Program` — its summary line enumerates its own scope, which is unusually helpful: "Camera Policy, Classroom Check-in Procedures, Visual Verification, Alternative Learner Verification, Access to Recordings, Age Verification".
- `Learner Content Moderation: For Parents` — "Information for parents about **how we monitor what information learners share**". Monitoring disclosed to the parent as a parent-facing article, not buried in privacy.
- `Learner Privacy Guide` — "Outschool takes privacy seriously - and you should too!" A privacy article that assigns the reader a share of the duty in its subtitle.
- `How to Review Your Learner's Data on Outschool` — a data-access right surfaced as a parent task.
- `How AI Enhances Your Family's Outschool Experience` — "Outschool uses AI to help you stay connected to your learners' experience. Every feature is designed with your family's privacy in mind." AI disclosed with a privacy commitment attached, in family register. Plus `AI Policy for Teachers on Outschool`.
- `Keep All Communication on Outschool` · `Teacher Social Media Policy` · `Teacher Guidelines for Sharing Personal Information for Educational Purposes & Live Conferencing With Parents` — three separate boundary policies for teacher↔family contact.
- `Teacher restriction and removal` · `Policies for hosting Groups on Outschool` · `Outschool's Policies for Organizations` · `Information for Teachers on Working with School Organizations`.
- `Understanding Multiple Perspectives` — "How presenting a broad range of viewpoints can enhance your classroom experience", alongside the requirement that content be "secular, objective, and age-appropriate". Viewpoint balance as a listing standard on a children's platform.
- Public-funding compliance articles name the instruments: ESA, Microgrant, charter funds, Purchase Orders, organisation admin accounts, ClassWallet, DCFSA (with the honest limit "Outschool cannot fill out or sign DCFSA reimbursement request forms on behalf of families").
- **Credit disclaimed plainly** `[observed]`: "While Outschool does not offer credit for classes, you can receive credit for classes depending on your school's requirements." The platform states what it is not before explaining the workaround, and then hands the parent a tactic ("You might also show an Outschool class listing to someone at your school to ensure it fits credit requirements"). Teacher-issued certificates are disclosed as discretionary and inconsistent: "Not all teachers offer this, so if your learner will need a grade, certain types of assessment, or other specifications… it's best to communicate with their Outschool teacher beforehand."

## T11 Help-centre architecture

Three levels: collection → sub-collection → article, on Intercom. Fourteen collections, flat, with audience encoded in the collection title rather than in a toggle (see T1). Article counts are displayed on every collection card, which lets a reader judge depth before clicking.

**Article-title grammar — five shapes:**

| Shape | Example |
|---|---|
| `<Topic>: For Parents` / `: For Teachers` / `for Families` | `Learner Safety and Privacy: For Parents`, `Self-Paced Classes for Families`, `Outschool Payment Options: FAQs for Teachers` |
| `How do/does …?` | `How do Outschool Classes Work?`, `How Payments Work on Outschool` |
| `Understanding <thing>` | `Understanding Recurring Weekly Classes`, `Understanding Multiple Perspectives` |
| `Class Policies: <aspect>` | `Class Policies: Listing Requirements`, `Class Policies: Content Guidelines`, `Class Policies: Class Types and Settings` |
| Imperative / bare noun | `Keep All Communication on Outschool`, `Community Standards`, `Class Recordings` |

**Every article carries a subtitle**, and the subtitles do the disambiguation the titles cannot. Examples: `Community Standards` → "How teachers, parents, and learners help keep Outschool safe, respectful, and inclusive"; `Class Policies: Content Guidelines` → "Outschool classes should be objective, secular, and age-appropriate" (the subtitle *is* the policy); `Learning Experience Pledge` → "Terms and guidelines for receiving an Outschool voucher if you discover a class is not the right fit for your learner"; `Extenuating Circumstances for Teachers` → "How Outschool works with teachers when emergencies arise."

**The `Class Policies:` prefix is worth noting** — four articles share it, so a teacher can recognise the governing-document family by its prefix. It is the same device as `Educators:` on collections.

**Routing furniture** `[observed]`: search placeholder `Search for articles...`; breadcrumb rooted at `All Collections`; `Related Articles` block at the foot of each article (five items, and on the harvested pages the related links were genuinely adjacent rather than generic); `Did this answer your question?` reaction control; footer with `Outschool Home` and `Website Status Page`.

**Defects** `[observed]`: several inline links resolve to slugs that no longer match their link text — `2272596-ongoing-classes-for-learners` labelled "Recurring Weekly classes"; `4063624-learner-verification` labelled `Alternative Learner Verification Program`; `579553-managing-live-class-enrollments-on-outschool` appearing elsewhere as `Enrollment Management Policies for Outschool Teachers`; `427452-charter-school-funds` vs `427452-help-for-families-using-charter-school-funds-on-outschool`. Intercom preserves old slugs on redirect, so this is cosmetic — but it is a visible record of at least four renames, and one of them (`ongoing` → `Recurring Weekly`) is a user-facing class-format name.

## T12 FAQs

**`FAQ for Outschool Families` — 12 questions in three sections** `[observed]`

**`About Outschool`**

| # | Question (verbatim) |
|---|---|
| 1 | What is Outschool, and how does it work? |
| 2 | How do I get started on Outschool? |
| 3 | I'm just getting started with homeschooling. Can you offer some advice? |
| 4 | My learner has special needs. Is Outschool a fit? |

**`Taking Classes`**

| # | Question (verbatim) |
|---|---|
| 5 | How do you ensure high-quality classes? |
| 6 | How do you ensure safety in classes? |
| 7 | What does my learner need to join a class? |

**`Programs and Funding`**

| # | Question (verbatim) |
|---|---|
| 8 | Can Outschool classes count as credit at my school? |
| 9 | Are you a homeschool charter school vendor? |
| 10 | Are you an approved vendor for ESA programs? |
| 11 | Can I use my Dependent Care Flexible Spending Account to enroll in Outschool classes? |

**Structural notes.** The ordering is: what is this → how do I start → **who I am** (homeschooler, special-needs parent) → **can I trust it** (quality, safety) → what do I need → how do I pay for it with someone else's money.

Questions 3 and 4 are the distinctive ones. Both are phrased as **a statement about the parent's own situation followed by a question** — "I'm just getting started with homeschooling. Can you offer some advice?" and "My learner has special needs. Is Outschool a fit?" That is the Wise first-person pattern applied to *identity* rather than to error, and it does something a topic-shaped FAQ cannot: it lets a parent recognise themselves in the list. A parent of a neurodivergent child scanning eleven questions finds one that names them.

Questions 5 and 6 are the dual-audience pair that matters most, and they are **parallel in grammar** (`How do you ensure X in classes?`) and **sequential in the reader's anxiety** (is it any good / is it safe). Both are addressed to `you`, the platform, demanding an account of itself. Note which one comes first: quality, then safety. Arguably the wrong order for this product.

Question 11 is the one no other product in this batch has: a US tax-advantaged childcare account. Its presence, alongside 9 and 10, tells you that a material share of Outschool's buyers are spending **institutional or pre-tax money**, and that the FAQ's job includes procurement, not just persuasion. The answer's honesty is notable — it declines to advise ("Eligible expenses and procedures can vary by individual Dependent Care FSA plans, so we recommend checking your plan's terms") and states a hard limit ("Outschool cannot fill out or sign DCFSA reimbursement request forms on behalf of families").

**Not found:** an FAQ block on the marketplace itself (blocked), and a learner-facing FAQ. There is no "FAQ for Outschool Learners" counterpart to `FAQ for Outschool Families` — **the child has no FAQ.** `[absent]` and worth recording: the child's entire content allocation on the harvested surface is the three guiding rules and a video, both delivered through the parent.

## T13 Terminology & glossary

| Term | Outschool's usage | The alternative it rejected |
|---|---|---|
| `learner` | **The child, always** — in policy, FAQ, class formats, safety, refunds | "student", "child", "kid" |
| `kids and teens` | The child, in marketing-register copy only | |
| `Kids` | The child, in the page `<title>` | |
| `parents/legal guardians` | The account holder, in policy | "parents" alone |
| `families` | The buying unit; used in article titles (`for Families`) and value copy ("your family's schedule") | "customers", "members" |
| `your learner(s)` | **The dual-audience possessive** — parent addressed, child referenced | |
| `educator` / `teacher` | Used interchangeably across collections (`Educators: Using…` vs `Teacher Policies`) | |
| `class` | The unit of purchase, always | "course" (used once, in "a full semester course") |
| `section` | A dated instance of a class; the refund clock attaches to it | "cohort", "run" |
| `meeting` | One live session | "lesson", "session" |
| `One-Time Class` | Single-session format | "taster", "trial class" |
| `Short Course` | 2–7 weeks | |
| `Camp` | Multi-day within one week | |
| `Semester Course` | 8+ weeks | |
| `Recurring Weekly Class` | Weekly subscription, no end date — **renamed from `Ongoing`** (old slug still live) | "Ongoing", "open-ended" |
| `Self-Paced Class` | Asynchronous, pre-recorded | "on-demand" |
| `Group` | Asynchronous forum-like community | "club", "forum" |
| `Outschool Classroom` | The per-class homepage ("a homepage for each class") | "class page" |
| `check in` / `visual verification` | The mandatory identity step | "attendance" |
| `Alternative Learner Verification` | The named no-camera exception programme | |
| `withdraw` | Remove the learner; **not** a refund | "cancel", "unenrol" |
| `stop subscription` | End future weekly charges | "pause", "cancel" |
| `Learning Experience Pledge` | Post-attendance voucher remedy | "satisfaction guarantee", "money-back" |
| `voucher` | The remedy's currency — explicitly not cash | "credit", "refund" |
| `Class Buyout` | An org or family purchasing a whole section | "private hire" |
| `Private Group Class` | Parent-requested closed class | |
| `Public Funding` | The umbrella for ESA / charter / microgrant | "financial aid", "subsidy" |
| `lived experience` | An accepted form of educator expertise, named in a policy title | "personal background" |
| `be kind, be safe, be respectful` | The three learner rules | |

**`learner` is the most disciplined single word in this file, and it is doing dual-audience work.** It is used in every register — safety policy, refund policy, class formats, FAQ, teacher policy — for the child. `student` would import a school relationship the platform does not have; `child` would foreground age over agency and would read oddly for a seventeen-year-old on the same platform as a five-year-old; `kid` is too casual for a refund policy. `learner` covers ages 1–18 in one noun and describes the person by what they are doing rather than by how old they are. The marketing surface reverts to `Kids` and `kids and teens` because those are what a parent types into Google — a defensible register split, though it means the product's own core noun never appears in its page title.

**`your learner(s)` is the construction to steal.** Two words that encode the whole dual-audience relationship: second-person possessive for the buyer, third-person noun for the user, optional plural for the family. Any product where the purchaser and the beneficiary differ — children's services, dependent care, employee benefits, pet products, care for elderly relatives — can use it directly.

**`Learning Experience Pledge` over "satisfaction guarantee"** is the other choice worth noting. "Guarantee" would promise money; "Pledge" promises effort, and the remedy is a voucher. The noun matches what is actually being offered.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the parent; third person for the learner; first person plural for the platform. The consistency of that triangle across ten documents is the platform's main tonal achievement. Where the child is addressed at all, it is **through** the parent ("Parents and guardians should review these rules **with** their learner").

**Two registers, cleanly separated:**

- **Parent register** — warm, calibrated, slightly conversational, willing to use an emoji in a safety instruction ("from a comfortable distance 🙂") and an exclamation mark in a reassurance ("You know your children best!"). Short sentences, bolded lead clauses, reasons attached to rules. This is the register the whole platform is written in.
- **Policy register** — flat, enumerated, unhedged where it matters ("your account will be immediately suspended without advance notice"), and precise about numbers, time zones and thresholds. No exclamation marks, no emoji.

**There is effectively no child register on the harvested surface.** The child's rules are three words plus a video; the child's prohibitions are written in child-legible vocabulary but addressed to the parent. **That is a deliberate architectural choice and it is the finding: Outschool solves the dual-audience problem by refusing to write for two audiences at once.** Each document has exactly one reader, the audience is in the title, and the child is reached through video and through the parent's voice rather than through platform prose. The cost, recorded honestly, is that a twelve- or sixteen-year-old learner — perfectly capable of reading a code of conduct and increasingly the one actually navigating the classroom — has no document addressed to them. Compare Scratch (file 140), which writes directly to an eight-year-old and does not route through the parent at all.

**Reading level.** Parent-facing copy is comfortably adult-general — short paragraphs, one idea per bullet, few subordinate clauses, technical terms glossed on first use (`Groups` → "similar to a forum and are fully 'asynchronous'", with the jargon word in scare quotes *and* glossed). Policy copy is denser but still plain; the refund policy is the hardest read and it is structured into five labelled tiers to compensate. Nothing in this harvest requires a parent to decode legalese, which for a document set this compliance-heavy is a real achievement.

**Numbers as trust devices** `[observed]`: `ages 1-18`, `140,000+ Subjects` / `Ages 3-18` (contradictory), `2-7 weeks`, `8 or more weeks`, `24 hours`, `10 minutes` (lateness threshold), `3 consecutive class meetings`, `one week` (Pledge notification), `three (3) times per calendar year`, `90 days` (voucher expiry), `1-3 business days` / `up to 14 business days` (refund rails), `one year` + `one month` (background-check renewal), `at least 6 months out of the year` (residency), `10 days` (UK background-check response window), `Sunday mornings Pacific time`. Almost every rule in this platform is a number with a unit, and the units are the ones a parent can act on.

**Accessibility content**

`[absent]` — **no accessibility statement was found on any harvested surface**, and the marketplace itself was unobservable, so no skip link, alt text, ARIA behaviour or caption content could be assessed. This is the largest single gap in the file.

What *is* observable is help-centre and policy-level accessibility-adjacent content `[observed]`:

- `Skip to main content` present at the top of every help-centre page.
- The article-feedback control pairs emoji with **text accessible names** (`Disappointed Reaction`, `Neutral Reaction`, `Smiley Reaction`) rather than shipping emoji alone.
- `Learning with Special Needs at Outschool` — "Advice for parents and teachers" — a **dual-audience article on disability**, and the FAQ answer routes the parent to the individual teacher rather than making a platform-level accommodation claim.
- The `Alternative Learner Verification Program` is, in effect, an accessibility accommodation for camera requirements, named as a programme with a contact route, and justified on two grounds including the child's discomfort.
- Several images in the harvested articles (screenshots of the `withdraw` and `stop subscription` buttons, the code-of-conduct video thumbnail) carry **empty `alt`**, so the instructional screenshots that show a parent which button to press are unavailable to a screen-reader user. The surrounding prose does name the buttons in italics, which mitigates it. Flagged.

**Negative findings, recorded honestly**

- **`Ages 3-18` (marketplace `<title>`) vs `ages 1-18` (policy, FAQ, Community Standards, safety) — a contradicted eligibility boundary on a child-safety product.** The most serious defect in this batch.
- `Class Length: One-Time, Short, Semester, Recurring Weekly` as a heading over five formats, with a sixth immediately after.
- `Camps` is the only class format with no "this is good for…" rationale.
- Live anchors and slugs preserving abandoned names: `#class-length-one-time-short-semester-ongoing`, `#flexible-schedule-classes`, `ongoing-classes-for-learners`, `learner-verification`, `charter-school-funds`.
- Three labels for the parent↔teacher channel: `Parent Conversations Tabs`, `Conversations tab`, `parent messaging platform` — on a channel whose use is a safety requirement.
- `educator` and `teacher` used interchangeably at collection level (`Educators: Using the Outschool Website` beside `Teacher Policies`).
- `Smiley Reaction` names a glyph where its two siblings name sentiments.
- `Background Checks and Identity Verification` is the only collection with **no scope line**, and it is arguably the one a nervous parent most wants described.
- FAQ orders `How do you ensure high-quality classes?` before `How do you ensure safety in classes?`.
- **No learner-facing document.** No FAQ, no code of conduct written to the child, no getting-started page for a teenager.
- No accessibility statement found.
- Instructional screenshots with empty `alt`.
- The DBS-refusal sentence gives no reason.
- `Skillshare Explores…`-style benefit framing appears once here too: `How AI Enhances Your Family's Outschool Experience` leads with "Enhances" for a feature whose privacy implications are the reason the article exists.

---

## Transferable patterns

1. **`your learner(s)` — put the buyer in the possessive and the user in the noun.** Two words that resolve a dual-audience sentence: second person for who is reading, third person for who benefits, parenthetical plural for households with several. Directly reusable for dependent care, employee benefits, family plans and any purchase made on someone else's behalf.
2. **Ship the same topic twice, with the audience in the title after a colon.** `Learner Safety and Privacy: For Parents` / `: For Teachers`. Use this instead of an audience toggle when the two readers have genuinely *different duties* rather than different views of one truth. Cost: pairs drift — budget for the maintenance.
3. **Give a duty two calibration anchors at opposite ends.** "For older learners, this may take just a few minutes. For younger learners or those with behavioral challenges, you may need to be nearby for every class." A duty without calibration produces over- or under-compliance; two anchors let the reader locate themselves. Pair it with an explicit handback of judgement ("You know your children best!").
4. **Define each format by a number, then by the constraint it solves.** `Short Courses` = "1 or more times each week for 2-7 weeks" + "great for… even if your schedule doesn't permit a full semester course." The number makes it comparable; the constraint makes it choosable.
5. **Name a control after what the system does, not what the user hopes.** `withdraw` removes the learner; it does not refund, and the policy says so in the next sentence. Resist "Cancel" when cancellation is not what happens.
6. **Write refund eligibility as first-person examples in the customer's voice, and let three of four compliment the seller.** "While the instructor was enthusiastic, I found the teaching style too fast-paced…" On any marketplace where the seller is a named person the buyer will meet again, model the blameless complaint or the remedy will go unused.
7. **Justify a rule by its effect on other customers, not on you.** "Because many classes rely on group participation, an absence can affect the experience for others." Also: off-camera "as a courtesy to other learners". Stronger than platform-policy framing wherever the product is genuinely multi-party.
8. **Disclose what your background check does *not* cover, and why.** "Due to the virtual nature of Outschool classes, we do not consider vehicle or traffic violation offenses." A named exclusion with a reason converts a vetting claim into evidence of thinking.
9. **Mandate, reason, exception — in that order, with the exception named as a programme.** Camera on / for identity verification / `Alternative Learner Verification Program` for families without a camera *or* uncomfortable being seen. Naming both reasons for needing the exception is what makes the mandate acceptable.
10. **Open an enforcement ladder by presuming innocence, and make the first remedy educational.** "Outschool recognizes that learners may make mistakes or act without understanding how their behavior could affect others" → notify family → remove content → re-watch the rules together → suspend → law enforcement. Four educational steps before a punitive one, and an unhedged final tier.
11. **Bind yourself before you bind the user.** The Community Standards preamble lists three platform duties, then pivots on `In turn`. A conduct policy that starts with its own obligations earns the instructions that follow.
12. **Publish the honest disjunction about supplier quality.** "teaching experience, subject matter expertise, **or** a unique passion they want to share." If your third disjunct is the weak one, publishing it where the purchase decision is made is what makes the other two believable.

## Caveats & gaps

- **Blocked domain: `outschool.com`.** The homepage and `/online-classes/math` both returned HTTP-valid responses with **empty bodies** (title and meta only) — the marketplace is fully client-rendered. No class listing, age-range chip, price, teacher card, review, rating, filter label, search UI, enrolment CTA or checkout string was observable. **The single most important artefact for this product's benchmark — how one class listing page serves a parent and a child simultaneously — is therefore unharvested**, and everything in T1–T3, T5 and T8 that would come from it is marked `[absent]`. A browser-rendered pass is required before this file can be cited on Outschool's product copy.
- **Age-range contradiction unresolved.** `Ages 3-18` vs `ages 1-18`. I have recorded both verbatim with their sources and have not guessed which is current.
- **All in-product copy is documented, not observed**: the Outschool Classroom, the Zoom check-in flow, the enrolment-management page (including the `withdraw` / `stop subscription` controls, seen only as screenshots with empty alt), the schedule, Conversations, Groups, transcripts, and every transactional email.
- **No learner-facing surface harvested or found.** The learner code-of-conduct **video** is the child's primary artefact and it is a video — its script is not in this harvest, and it is the thing a content designer would most want. `Learner Content Moderation: For Parents` (which would describe what monitoring the child experiences) was also not opened.
- **`Learner Safety and Privacy: For Teachers`** — the paired counterpart to the file's central document — was not opened. Reading the pair side by side is the obvious next step for the dual-audience question.
- Not opened, and all high-value for this benchmark: `Signing Up For Classes`, `Finding Classes`, `Class Policies: Listing Requirements`, `Class Policies: Content Guidelines`, `Class Policies: Class Types and Settings`, `How to prepare for your first class`, `How to Choose the Right Membership Plan for Your Family`, `Cancellation Policies for Outschool Members`, `Teacher Identity Verification`, `Outschool Alternative Learner Verification Program`, `Learner Privacy Guide`.
- **Memberships under-harvested.** The `Memberships` collection holds one article and membership pricing lives on the blocked marketplace, so the subscription-versus-per-class decision content — explicitly a dual-path decision the FAQ raises — is only partially evidenced.
- **No GDPR-K, UK Age Appropriate Design Code, or EU children's-privacy content observed.** The compliance copy harvested is US-centric (COPPA, ESA, charter, DCFSA, ClassWallet) despite the platform operating teachers in the UK, Australia, New Zealand, Canada, Mexico, Spain and South Korea. Recorded as absent from the harvested paths, not as non-existent.
- **No accessibility statement found**; no marketplace accessibility characteristics assessable.
- `outschool.com/policy/users` and `outschool.com/policy/teachers` (the full User and Teacher Policies referenced from Community Standards) were not fetched and are likely on the blocked client-rendered domain.
- Per the brief's instruction and its own safeguarding rules, **no community feature was used and no individual child's profile, project, class or content was viewed or collected.** All findings derive from Outschool's own published guidance.

## Sources

1. https://outschool.com/ *(empty body; `<title>` only)*
2. https://outschool.com/online-classes/math *(empty body)*
3. https://support.outschool.com/en/
4. https://support.outschool.com/en/collections/2923466-what-is-outschool
5. https://support.outschool.com/en/collections/2923452-class-formats-and-standards
6. https://support.outschool.com/en/collections/2923472-policies-and-security-information-for-outschool-users
7. https://support.outschool.com/en/collections/2923552-payments-refunds-and-offers
8. https://support.outschool.com/en/collections/2923448-background-checks-and-identity-verification
9. https://support.outschool.com/en/articles/19491-how-do-outschool-classes-work
10. https://support.outschool.com/en/articles/579976-learner-safety-and-privacy-for-parents
11. https://support.outschool.com/en/articles/16039-community-standards
12. https://support.outschool.com/en/articles/4626920-class-cancellation-policy-and-refund-eligibility-guidelines
13. https://support.outschool.com/en/articles/16379-learning-experience-pledge
14. https://support.outschool.com/en/articles/2701506-educator-background-checks
15. https://support.outschool.com/en/articles/4321090-faq-for-outschool-families
