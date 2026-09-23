# 122. Khan Academy

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | K-12 non-profit learning platform (with AI tutor subscription) |
| Primary URL | https://www.khanacademy.org/ |
| Corpus rank | 122 |
| Benchmark strength (source list) | Instructional scaffolding and progress |
| Locale / market observed | en-US |
| Platform observed | Web — help centre (Zendesk-backed) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | US non-profit serving minors; COPPA and FERPA obligations implied by parent/teacher/district account structure. Not verified from a published statement in this pass. |
| Harvest date | 2026-09-22 |
| Pages inspected | 4 |
| Harvest completeness | **Partial** — harvested via the Claude browser pane. Help-centre index and two category pages captured. Article *bodies* not opened (see Caveats). `khanacademy.org/about/our-content` returned Page Not Found. |
| Harvest method | Claude browser pane (JS-rendered), not raw fetch |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Help centre home | https://support.khanacademy.org/hc/en-us | Eight category tiles + 14 featured articles |
| Category: Bugs and Troubleshooting | https://khanacademy.zendesk.com/hc/en-us/categories/200190460 | Three sub-sections |
| Category: Common Questions & Resources | https://khanacademy.zendesk.com/hc/en-us/categories/200175860-Common-Questions | Eleven sub-sections |
| (attempted) About our content | https://www.khanacademy.org/about/our-content | `Page Not Found` — recorded as a live broken path |

---

## T1 Navigation & IA labels

**Help-centre top level — eight categories, organised by WHO not by WHAT** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Bugs & Troubleshooting` | "Find information and workarounds for technical issues" |
| `Frequently asked questions` | "Common questions and resources about using Khan Academy" |
| `Ask the Community` | "Get Khan Academy tips, tricks, and help from your fellow community members" |
| `Learners` | "Guides and resources for learners and students" |
| `Teachers & Coaches` | "Guides and resources for teachers and coaches" |
| `Parents` | "Guides and resources for parents" |
| `School and District Administrators` | (no scope line observed) |
| `SAT` | (no scope line observed) |

Five of eight categories are **audience names**, not topics. This is the
defining IA decision: Khan Academy has four distinct user roles with genuinely
different jobs (learn / teach / supervise / administer), so it routes on
identity first and topic second. Compare Wise, which routes on activity
(`Sending money`, `Holding money`) because it has one role.

Note the register inconsistency in the scope lines: `Learners` and
`Teachers & Coaches` and `Parents` all use the identical frame
"Guides and resources for X", which is efficient but says nothing — whereas
`Bugs & Troubleshooting` and `Ask the Community` describe an actual outcome.
Three of eight scope lines are load-bearing; three are filler.

**The `*NEW*` marker** `[observed]` — `*NEW* Khan Academy Reimagined` appears in
the category strip with literal asterisks around the word NEW. Typographic
emphasis done in plain text rather than as a styled badge; brittle, and it will
be stale the moment it isn't new.

**Category sub-sections — `Bugs and Troubleshooting`** `[observed]`

`Reporting new issues and feedback` · `General Site & Networking` ·
`Accounts & Login Issues`

**Category sub-sections — `Common Questions & Resources`** `[observed]`

`Creating and managing a Khanmigo subscription` ·
`Khanmigo Safety and Security Information` · `Managing Existing Accounts` ·
`Exercise and Video questions` · `Volunteers & Donations` · `Press` ·
`Careers` · `About Khan Academy` · `News and Updates` · `Content Updates`

**Finding:** this single category mixes user support (`Managing Existing
Accounts`, `Exercise and Video questions`) with corporate communications
(`Press`, `Careers`) and product changelog (`News and Updates`,
`Content Updates`). A learner looking for help and a journalist looking for the
press office arrive in the same category. That is an IA compromise worth
recording — it is what happens when a non-profit's institutional pages have
nowhere else to live.

## T2 Value proposition & headline patterns

`[absent]` for marketing surfaces — `khanacademy.org` itself was not captured in
this pass, and `/about/our-content` returned `Page Not Found`. The only
value-carrying headline observed is the help-centre H1.

**Help-centre H1** `[observed]`: `How can we help?`

First person plural, question form, no product name. Persistent across every
help page including the 404. Compare Wise's `Hi, how can we help?` — Khan drops
the greeting, keeping the offer.

## T3 CTA inventory

| CTA (verbatim) | Context |
|---|---|
| `See all articles` | Foot of every sub-section, repeated ~14 times |
| `Take me back to the home page` | 404 page |
| `Return Home` | Main-site 404 page (appears **twice**, stacked) |
| `Menu` | Mobile nav toggle |
| `Close` | Cookie banner |
| `Donate` | Inside `Volunteers & Donations` |
| `Volunteer` | Inside `Volunteers & Donations` |

**`Take me back to the home page`** `[observed]` is the notable one — first
person, from the *user's* mouth, on the error page. It reads as the sentence the
user would say, not the instruction the system gives. Compare the main site's
`Return Home`, which is the conventional imperative. **Two different 404 pages
on two Khan Academy properties word the same recovery action in two different
registers**, and the main site additionally renders the button twice.

## T4 Onboarding & getting-started

`[documented]` — from featured-article titles only; bodies not opened.

- `How do I set up my account?`
- `How do I get started using Khan Academy as a teacher?`
- `Khan Academy for Parents: Quick Start Guide`
- `Quick start guide: Student login, account and password instructions for teachers`
- `What options does Khan Academy offer for early learners?`

**Pattern:** there is no single getting-started article. There are **four
parallel onboarding paths**, one per role, and the naming makes the role explicit
in the title rather than relying on the category to carry it
(`…as a teacher`, `…for Parents`, `…for teachers`). Redundant with the category
label, and correct — the title has to survive being found by search, where the
category is not visible.

Note the fourth title's audience inversion: `Student login, account and password
instructions **for teachers**` — an article about students, addressed to
teachers. The title resolves the ambiguity that the topic alone would create.

## T5 Form & field labels

`[observed]` — one only:

- Search placeholder: `Start your search here...`

An instruction rather than an example or a noun. Compare Wise's silent search
field. "Start your search here" tells the user what the box is for but gives no
hint about what a good query looks like — a missed opportunity in a help centre
where query formulation is the main failure point.

## T6 Status & state language

`[documented]` — the mastery-progress vocabulary is the flagged strength for this
product, and it is **named in help titles but not captured in this pass**:

- `Update: How mastery percentage is calculated on Khan Academy`
- `Update: See your course progress at a glance in Khan Academy Reimagined`
- `What's changing for students on the reimagined Khan Academy?`

So the corpus records that Khan Academy publishes its progress-calculation
methodology to users — which is itself the finding, and parallels Oura
publishing its score methodology (103) — but **the actual mastery-level labels
are not evidenced here.** They are widely reported to be a four-step ladder, and
that is exactly why this file does not state them: reporting is not observation.
Flagged in Caveats as the priority gap for this product.

**One state term is observed** `[observed]`, in the Khanmigo safety context:
`Why did Khanmigo flag my conversation?` — `flag` as the AI-moderation state,
with a dedicated article explaining it to the person who was flagged.

## T7 Error, failure & recovery

`[observed]` — the 404 page, in full:

> `oops`
> `The page you were looking for doesn't exist`
> "You may have mistyped the address or the page may have moved"
> `Take me back to the home page`

Four-part structure: interjection, plain statement, **two causes offered without
assigning blame between them**, recovery. The causes line is the good part —
"You may have mistyped the address **or** the page may have moved" gives the user
an equally likely non-culpable explanation alongside the culpable one. Most 404s
either blame the user or say nothing.

The `oops` is lowercase and sits above the statement as a separate line. Set
against Notion's three competing generic errors (001) and Wise's calm register
(041), `oops` is the mildest possible acknowledgement — and Khan Academy is
writing for children, where a light touch is defensible.

**Recovery article titles** `[documented]`

- `How do I reset my password?`
- `What can I do if my student forgot their password?`
- `What can I do if I didn't receive the email to verify my Khan Academy account?`
- `What devices and browsers work best for Khan Academy?`
- `Browser Issues & Troubleshooting`
- `Video Player Issues & Troubleshooting`
- `Issues with Videos`
- `Issues with Exercises`
- `What information do I need to include to submit an effective bug report or help request?`

Two patterns. `What can I do if …?` is the **conditional-capability** shape — it
presupposes the failure and asks only about the remedy, which is gentler than
Wise's first-person confession (`I sent the wrong amount`) and better suited to
an audience that includes children and their teachers.

And `What can I do if **my student** forgot their password?` is the
proxy-recovery case: the person who needs the fix is not the person who failed.
Khan Academy writes the article from the helper's position. That is a genuinely
distinctive artefact — most products have no vocabulary for recovering on
someone else's behalf.

`What information do I need to include to submit an effective bug report…` is
the inverse: Khan Academy teaching the user how to ask for help well, promoted
to the **first** featured article on the help home.

## T8 Empty states

`[observed]` — one, and it is a defect:

The `Managing Existing Accounts` sub-section lists exactly one item,
`Account Settings`, then `See all articles`. Several sub-sections
(`Managing Existing Accounts`, `Exercise and Video questions`) render as a bare
list of *section* names rather than article titles, so the user cannot tell
whether they are looking at articles or at another level of nesting. No
empty-state copy is shown for thin sections; the layout simply collapses.

No genuine no-results or no-data state was reached in this pass. `[absent]`

## T9 Notifications & system messages

`[observed]` — the changelog-as-notification pattern:

`News and Updates` and `Content Updates` are **help-centre categories used as a
product changelog addressed to users**, with titles prefixed `Update:` or phrased
as changes:

- `Update: See your course progress at a glance in Khan Academy Reimagined`
- `Update: How mastery percentage is calculated on Khan Academy`
- `Update: The reimagined Khan Academy Classroom experience`
- `Updates to 6th Grade reading and vocab`
- `Changes to Illustrative Math Algebra 1 - Back to school 2025`
- `Changes to the AP® World History course`

**Content Updates is the interesting one.** Khan Academy publishes a changelog
for *curriculum* — telling teachers that the Algebra 1 course changed before the
school year. That is a content-operations commitment almost no product makes,
and it is aimed at the user who would otherwise be blindsided mid-term. Note the
date stamp in the title itself (`Back to school 2025`), which makes staleness
visible rather than hidden.

Cookie banner present `[observed]`, with a `Close` control.

## T10 Disclosures, legal & compliance

`[documented]` — titles only:

- `Guidelines and Legal` (sub-section under `About Khan Academy`)
- `What is Khan Academy's approach to responsible AI development?`
- `What safety features does Khanmigo have?`
- `Why did Khanmigo flag my conversation?`
- `Does Khanmigo have a read-aloud or Text-to-speech feature?`
- `CSV Data Dictionary for Administrator Reports`

**The AI-safety disclosure cluster is the notable finding.** Khan Academy ships
an entire help sub-section, `Khanmigo Safety and Security Information`, whose
first three articles are an ethics statement, a features statement, and a
*moderation-explanation* article. For a product serving children with an LLM
tutor, publishing "why did it flag my conversation" as a first-class help article
is the right call — it treats the moderation event as something owed an
explanation rather than an unexplained refusal.

`CSV Data Dictionary for Administrator Reports` is the enterprise-transparency
artefact: a published schema so districts can interpret their own export.

No accessibility statement, COPPA notice or FERPA statement was reached in this
pass. `[absent]` — but see Caveats; absence here means not-reached, not
not-published.

## T11 Help-centre architecture

Three levels: **category → sub-section → article**, with `See all articles`
truncating each sub-section to roughly three visible titles.

**The truncation is the architectural decision.** Every sub-section shows about
three articles then `See all articles`. It keeps a category page scannable, but
it means the visible three are doing enormous work — they are effectively an
editorial pick. And the pick is inconsistent: under `Bugs and Troubleshooting`,
`Accounts & Login Issues` surfaces one article; `General Site & Networking`
surfaces two section-like titles with no articles at all.

**Federated across two domains** `[observed]` — the help centre is served at
`support.khanacademy.org`, but every category link resolves to
`khanacademy.zendesk.com`. The user's address bar changes vendor mid-journey.
Recorded as a finding; it matches the pattern the corpus already logged for Coda
(008), whose inline links resolve to `coda-docs.zendesk.com`.

**`Ask the Community` as a peer of the official categories** — Khan Academy
places volunteer peer support at the same level as its own documentation, with an
honest scope line ("from your fellow community members") that sets the
expectation that this is not staff. Compare Reddit's federated-moderation
boundary problem (147, pending).

## T12 FAQs

`Frequently asked questions` is a **top-level help category**, not a page — so
there is no discrete FAQ artefact with Q&A pairs to capture. The fourteen
`Featured Articles` on the help home are the functional FAQ.

**Featured Articles, verbatim, in published order** `[observed]`

| # | Title |
|---|---|
| 1 | What information do I need to include to submit an effective bug report or help request? |
| 2 | How do I reset my password? |
| 3 | What do administrators need to know about the Khan Academy reimagined experience? |
| 4 | What's changing for students on the reimagined Khan Academy? |
| 5 | What's changing for teachers in the reimagined Khan Academy experience? |
| 6 | CSV Data Dictionary for Administrator Reports |
| 7 | How do I set up my account? |
| 8 | Does Khanmigo have a read-aloud or Text-to-speech feature? |
| 9 | Khan Academy for Parents: Quick Start Guide |
| 10 | What options does Khan Academy offer for early learners? |
| 11 | How do I get started using Khan Academy as a teacher? |
| 12 | Quick start guide: Student login, account and password instructions for teachers |
| 13 | What can I do if my student forgot their password? |
| 14 | What devices and browsers work best for Khan Academy? |

**Structural reading.** Positions 3, 4 and 5 are all "what's changing" articles
for three different roles — a migration is live and it has taken three of the top
five slots. Position 1 is meta (how to ask for help). Only position 2 is a
classic universal task.

So this featured list is **not a stable FAQ, it is a release-communication
surface**, and it currently reads as an organisation mid-migration. Compare
Wise's FAQ (041) leading on a live regulatory change: same mechanism, different
trigger. Worth noting that three near-identical titles differing only by audience
(`administrators` / `students` / `teachers`) sit adjacent — findable, but the
list is hard to scan because the differentiator is the last word.

Note position 4 vs 5 wording drift: `on the reimagined Khan Academy` vs
`in the reimagined Khan Academy experience`. Same construction, two prepositions,
one with `experience` appended. Small, but it is the kind of inconsistency that
appears when three articles are written to a template by three people.

## T13 Terminology & glossary

| Term | Usage | Note |
|---|---|---|
| `Khanmigo` | The AI tutor product | Portmanteau of Khan + *amigo*. Carries its own subscription, safety docs and help sub-section — a named product inside a free platform |
| `Khan Academy Reimagined` | The in-flight platform redesign | A *named migration*, addressed to users as a proper noun. Unusual and useful — it gives the change a handle so help content can reference it |
| `Learners` | The primary audience noun | Chosen over `Students`, then immediately undercut: the scope line says "for learners **and students**", treating them as two things without saying how they differ |
| `Teachers & Coaches` | Paired audience | `Coach` is Khan's term for a non-classroom supervising adult |
| `Coaches` vs `Parents` | Separate categories | So `Parents` are not `Coaches`, despite the overlap |
| `mastery percentage` | The progress metric | Methodology published to users |
| `flag` | AI-moderation state | `Why did Khanmigo flag my conversation?` |
| `Classroom` | The teacher's class container | `The reimagined Khan Academy Classroom experience` |
| `early learners` | Youngest cohort | Euphemism-free, age-free — avoids naming a grade or age band |
| `Programming Challenge Council` | A volunteer body | Sits under `Volunteers & Donations` |

**`Learners and students`** is the recorded terminology defect. Khan Academy
names its audience category `Learners`, which is the inclusive choice (it covers
adults self-studying), then adds `and students` in the scope line, which
re-imports the word it had just avoided. Either they are synonyms, in which case
one is redundant, or they are not, in which case the distinction is undefined.

## T14 Voice, tone & accessibility

**Register.** Plain, short, institutional-warm. Question-form titles dominate.
Second person for the user, first-person plural for Khan Academy
(`How can we help?`). No exclamation marks observed. The one interjection
(`oops`) is lowercase and unpunctuated — deliberately small.

**Writing for a mixed-age audience.** Khan Academy's hardest constraint is that a
nine-year-old, a teacher and a district administrator read the same help centre.
Its solution is **role-partitioned IA plus role-explicit titles**, rather than
tone-shifting within a single stream. The vocabulary stays uniformly simple and
the *routing* does the work. That is a genuinely transferable answer to
multi-literacy audiences, and a different answer from Uber/Lyft's approach
(089, 090), which uses different words for the same event per audience.

**Reading level** is not measurable from titles alone with any rigour. Titles are
short (median roughly 8 words) and use common vocabulary; two exceptions carry
institutional register — `CSV Data Dictionary for Administrator Reports` and
`Feedback, Feature Requests, Other Support Community Questions`, the latter being
a comma-run with no conjunction that reads as a tag list rather than a title.

**Accessibility content** `[observed]`, thin:

- `Does Khanmigo have a read-aloud or Text-to-speech feature?` promoted into the
  top 14 featured articles — an assistive-technology question treated as a
  mainstream FAQ rather than buried in an accessibility annexe. That placement is
  the accessibility finding.
- A cookie banner with a reachable `Close` control.
- **No accessibility statement, VPAT or WCAG claim was reached.** Given Khan
  Academy's scale and its school-district customers, one very likely exists;
  this pass did not find it. Recorded as not-reached.

**Negative findings**

- `Learners` and `students` used as if distinct, undefined
- Two 404 pages, two registers (`Take me back to the home page` vs `Return Home`),
  and `Return Home` rendered twice on one page
- `khanacademy.org/about/our-content` is a live broken path
- `*NEW*` as literal asterisk emphasis in a category label
- Three adjacent featured articles differentiated only by their final word
- Preposition drift between two sibling articles written to one template
- Help centre spans two vendor domains visibly
- Support and corporate content (`Press`, `Careers`) share a category with
  learner support
- Three of eight category scope lines are the same empty frame

---

## Transferable patterns

1. **Route on identity before topic when roles differ more than tasks do.** Khan
   Academy's five audience categories beat a topic taxonomy because a teacher's
   password problem and a student's password problem need different answers. For
   PayPal, the consumer/merchant/developer split is the analogue — and the lesson
   is to make the role explicit *in the article title too*, not just the category,
   because search bypasses the category.
2. **Proxy-recovery copy.** `What can I do if my student forgot their password?`
   — write the recovery article for the person helping, not only the person who
   failed. Directly applicable to any surface where an agent, admin, or family
   member acts for the account holder.
3. **`What can I do if …?` as a gentler confession frame.** Where Wise's
   `I sent the wrong amount` suits an adult who made a financial error, the
   conditional form presupposes the failure without making the user own it in the
   first person. Choose by audience and by whose fault it actually was.
4. **Publish the changelog for the thing the user depends on, dated.**
   `Changes to Illustrative Math Algebra 1 - Back to school 2025` warns teachers
   before the term. The PayPal analogue is versioned changes to fee schedules and
   dispute windows — Monzo (043) already does this with 12 archived fee schedules.
5. **Explain the moderation event.** `Why did Khanmigo flag my conversation?` as
   a first-class help article. Any automated decision that blocks a user — risk
   holds, limitations, declines — deserves the same treatment rather than an
   unexplained refusal.
6. **Give the migration a name.** `Khan Academy Reimagined` as a proper noun lets
   every help article reference the change unambiguously. Cheap, and it prevents
   the "new experience"/"updated version"/"the redesign" drift that the corpus has
   already logged at Coda, Grab and Lyft.
7. **Promote the assistive-technology question into the main FAQ.** Read-aloud at
   position 8 of 14, not in an accessibility ghetto.

## Caveats & gaps

- **Method.** Harvested through the Claude browser pane. Four pages reached. This
  is materially shallower than the Wise exemplar's depth and far below the 8-15
  page target — the file should be read as a strong IA-and-titles analysis and a
  weak body-content analysis.
- **Article bodies were not opened.** Every `[documented]` claim rests on a title.
  Titles are high-signal for IA, task phrasing and error framing, and say nothing
  about answer structure, length or accuracy.
- **The flagged strength is only partly evidenced.** "Instructional scaffolding
  and progress" is the reason Khan Academy is in the corpus, and the mastery-level
  vocabulary — the single most valuable artefact here — is **not captured**. It is
  named in `Update: How mastery percentage is calculated on Khan Academy`, which
  was located but not opened: the link is rendered as a non-interactive element in
  the accessibility tree and a click on it did not navigate. **Priority gap.**
- **The main marketing site was not captured.** `khanacademy.org` itself, the
  course/exercise UI, and the Khanmigo product pages are all unharvested, so T2 is
  effectively empty and T3 is help-centre-only.
- **`khanacademy.org/about/our-content` returned `Page Not Found`** — recorded as
  an observed broken path, not as a fetch failure.
- **No accessibility statement, COPPA notice, FERPA statement, or pricing page
  reached.** Khanmigo has a paid subscription whose pricing and cancellation copy
  is unharvested — a real gap given how central cancellation wording has been
  across the EDU and HLTH domains.
- **Six of fourteen taxonomy categories rest on thin evidence** (T2, T5, T6, T8,
  T10 partially, T12 as titles-only). The file clears the schema's six-category
  bar, but only just.
- All in-product states, empty states, validation messages and notification copy
  are behind authentication and were not attempted.

## Sources

1. https://support.khanacademy.org/hc/en-us
2. https://khanacademy.zendesk.com/hc/en-us/categories/200190460
3. https://khanacademy.zendesk.com/hc/en-us/categories/200175860-Common-Questions
4. https://www.khanacademy.org/about/our-content (returned `Page Not Found`)
