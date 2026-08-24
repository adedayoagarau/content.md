---
title: Voice, situational tone, and terminology across domains
status: working-research
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
geographic_coverage:
  - United States
  - United Kingdom
  - European Union
  - international web and public-health guidance
legal_notice: Research material only; not legal, regulatory, medical, financial, security, or safety advice
source_notes: ../sources/domain-source-notes.md
---

# Voice, situational tone, and terminology across domains

## Core finding

**Voice is not an industry preset. Tone is not a synonym for voice. Terminology is not a list of stylistic preferences.**

The research supports a system in which:

- **brand voice** expresses an organization's stable relationship with people;
- **situational tone** adapts that voice to a user's moment, consequence, urgency, and emotional/cognitive context;
- **domain conventions** provide recognizable concepts and information structures;
- **controlled terminology** preserves legal, policy, product, technical, and locale-specific meaning;
- **mechanics** set house rules for grammar, capitalization, punctuation, numbers, and formatting;
- **accessibility and localization** change how content is structured, encoded, translated, rendered, and tested;
- **risk controls** determine evidence, approval, confirmation, recovery, and escalation.

No reviewed primary source says every organization in finance, healthcare, government, education, gaming, or another domain should share one personality. Regulators and standards constrain clarity, truth, disclosure, timing, prominence, rights, recovery, and accessibility. They do not supply a brand voice.

This separation is the foundation a repository-native content agent needs. Without it, the agent will turn weak stereotypes—`fintech is reassuring`, `healthcare is compassionate`, `developer tools are terse`, `games are playful`—into global rules that fail precisely when stakes rise.

## Evidence boundary

Claims use the canonical labels defined in the [research protocol](../00-method/research-protocol.md): **[Sourced fact]**, **[Documented practice]**, **[Research finding]**, **[Cross-source finding]**, **[Inference]**, **[Proposal]**, and **[Open question]**. Law, standard, official guidance, organizational guidance, research, and practitioner or vendor material are source-type qualifiers recorded separately in [domain source notes](../sources/domain-source-notes.md); a source type does not establish applicability, ownership, approval, or universality.

Current primary anchors include WCAG 2.2, W3C internationalization guidance, the EU Accessibility Act, GDPR transparency requirements, the FCA Consumer Duty, FTC digital-disclosure guidance, the CDC Clear Communication Index and CERC framework, NHS England's Accessible Information Standard, the EU Digital Services Act and AI Act, and child-privacy/safety guidance. Direct URLs, dates, scope, and limitations are recorded in the source notes.

# Part I — The voice model

## 1. Voice is an organizational decision

Voice answers:

> What consistent relationship should people experience when this organization communicates and acts?

It should be derived from evidence about the organization, product, audiences, operating model, and intended relationship—not from a generic adjective generator.

A usable voice system needs:

- a small set of distinct principles;
- the product or relationship reason for each principle;
- observable writing and interaction behaviors;
- counter-behaviors and failure examples;
- scope and exceptions;
- examples across several surfaces and risk levels;
- an accountable owner, authorized approver and approval record, independent decision state, version, and review date;
- user research showing whether people actually perceive and understand it as intended.

`Friendly, clear, and concise` is too generic to govern decisions. It does not tell a writer whether to use humor in a failed payment, first person in a policy decision, or celebration after taking on debt.

### Voice is also behavioral

A product cannot claim to be `transparent` while hiding fees, `empowering` while removing a meaningful choice, or `human` while sending people into a support dead end. [Inference]

Voice therefore needs evidence in both words and product behavior:

| Claimed principle | Content behavior | Product behavior needed for credibility |
| --- | --- | --- |
| Transparent | Names material limits and consequences near the decision | The product exposes the relevant facts and does not hide them behind defaults or hierarchy. |
| Respectful | Does not shame, blame, infantilize, or presume emotion | People can decline, correct, appeal, and get help without punishment or needless friction. |
| Direct | Leads with the decision, state, or required action | The flow has a real next step and does not route users through irrelevant screens. |
| Calm | Uses proportionate urgency and concrete language | The system is stable enough to provide status, recovery, and a next update. |
| Expert | Explains necessary concepts accurately and at the audience's level | Claims and advice boundaries are supported by fit evidence, constrained by applicable instruments, maintained by accountable qualified owners, and approved by authorized roles for the stated scope. |

## 2. Voice discovery in a new or existing repository

When `content.md` enters a greenfield project, voice can be proposed from intended audience, brand strategy, research, and product principles. When it takes over an existing product, it must distinguish evidence sources and their dimensions from applicable governing instruments, accountable owners, authorized approvers and approval records, decision states, delivery states, and evaluation records.

### Evidence to inspect

1. Approved brand and product strategy.
2. User research, support transcripts, complaints, and comprehension findings.
3. Current product surfaces across happy, error, denial, recovery, and high-risk states.
4. Marketing, sales, help, policy, legal, notification, and lifecycle communication.
5. Existing style guides, glossaries, design-system patterns, localization memories, and content decision logs.
6. Product behavior: choice architecture, defaults, escalation, support, and recovery.
7. Domain rules and approved claims for each market.

### Required independent evidence and state systems

These are separate fields, not one lifecycle enum [Inference]:

| Record/system | Dimensions or states | What it can establish | Enforcement implication |
| --- | --- | --- | --- |
| Evidence | observation: unobserved/observed/corroborated; challenge: undisputed/disputed; freshness: current/stale; lineage: active/superseded; epistemic qualifier: none/inferred/assumed | What was found, how well it is supported, whether it is challenged/current, and its lineage/qualification | Observation, corroboration, freshness, or lack of dispute never creates canon. |
| Decision | question, option, proposed, approved, rejected, superseded, deprecated, retired | Whether a named authorized approver accepted a decision version for a defined scope | Only a current approved decision can supply an enforceable language rule, and only within scope. |
| Delivery | unmapped, mapped, patched, built, verified, released, observed-live, rolled-back, removed | Where and how an expression exists in delivery | Implementation or live presence does not prove approval or quality. |
| Evaluation record | method, version, population/context, result, limitation, date | What was tested or measured | A result informs later decisions; it is not a universal rule by itself. |

Keeping these records independent prevents frequent or live strings from becoming `canonical` merely because they exist. The canonical candidate definitions are in [candidate-system-model.md](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records).

## 3. Model voice with dimensions, not domain adjectives

A voice profile can describe calibrated dimensions without pretending every message uses the same intensity. Proposed dimensions [Inference]:

| Dimension | Question | Examples of evidence |
| --- | --- | --- |
| Directness | How quickly do we state action, consequence, or answer? | Front-loaded instructions; limited preamble. |
| Social distance | How formal or familiar is the relationship? | Forms of address, contractions, first/second person. |
| Warmth | How explicitly do we acknowledge effort, difficulty, or care? | Acknowledgment patterns, not generic enthusiasm. |
| Expressiveness | How much metaphor, rhythm, humor, or personality appears? | Surface- and risk-bounded examples. |
| Communicative stance | Do we instruct, recommend, facilitate, decide, or report—and is that role true? | Modals and role truth: `must`, `can`, `we recommend`, `the agency decided`. |
| Technical density | Which concepts may remain specialized, and how are they explained? | Audience expertise and glossary rules. |
| Optimism | How strongly do we frame possibility or progress? | Evidence-backed encouragement without outcome promises. |
| Anthropomorphism | To what degree does software use human traits or first person? | Explicit AI/automation limits and action attribution. |

These are not numerical brand scores to apply mechanically. They make tradeoffs discussable and testable.

## 4. Voice-rule record

Each proposed voice rule should include [Inference]:

```yaml
id: voice.direct-about-consequences
decision_state: proposed
principle: Be direct about consequences
reason: People should understand what will happen before they commit
behaviors:
  - Lead with the material outcome
  - Name money, access, data, time, or other affected objects
avoid:
  - Euphemisms that hide a loss or commitment
  - Reassurance not supported by product behavior
applies_to: [all-product-surfaces]
exceptions:
  - Security-safe messages may withhold exploitable detail but still need recovery
risk_behavior:
  R0: normal expression permitted
  R3: remove humor and require verified consequence
evidence_sources: [research-id-or-approved-strategy]
governing_instruments: []
accountable_owner: content-design
required_approver_role: product-language-owner
approval_records: []
effective_from: null
review_on: null
```

The future schema may differ; the important finding is that a rule needs rationale, scope, exceptions, risk behavior, evidence provenance, governing applicability, an accountable owner, and explicit approval—not only `do/don't` prose.

# Part II — Situational tone

## 5. Tone is computed from the moment

Tone answers:

> Given our approved voice, what does this person need from us in this specific state?

The minimum tone inputs are [Inference]:

- user goal and role;
- journey stage and entry point;
- what just happened and who caused it;
- consequence and reversibility;
- urgency and deadline;
- emotional/cognitive load and vulnerability;
- claim certainty, evidence strength, and governing applicability;
- privacy of the channel;
- relationship and audience expertise;
- locale, language, and cultural context;
- whether the product is informing, requesting, recommending, deciding, enforcing, or acting.

### Tone controller

| Condition | Increase | Reduce or remove |
| --- | --- | --- |
| Routine orientation | Clarity, helpful context, progressive disclosure | Unnecessary urgency. |
| Learning/exploration | Encouragement, examples, permission to try | False praise and outcome guarantees. |
| Genuine completion | Specific acknowledgment and next step | Confetti for consequential debt, health, legal, or loss-related actions. |
| Waiting/pending | State, expected timing, safe exit, update method | Empty reassurance such as `Hang tight` without operational facts. |
| User-correctable error | Specific cause, retained work, correction | Blame, `invalid`, or unexplained codes. |
| System failure | Ownership, persisted state, retry safety, alternative | Telling the user to `try again` when duplication or loss is possible. |
| Denial/ineligibility | Decision, reason at permitted specificity, effect, evidence/appeal | Cheerfulness, euphemism, persuasion, or unsupported finality. |
| Loss/bereavement/hardship | Respect, direct service language, flexible help | Celebration, blame, forced optimism, emotional presumption. |
| Security/fraud | Calm urgency, exact action, trusted channel, safe detail | Humor, panic, sensitive data, or attacker-useful enumeration. |
| Moderation/enforcement | Neutrality, affected object, rule/ground, duration, review | Taunting, moral judgment, or ambiguous `something went wrong`. |
| AI uncertainty | Calibrated uncertainty, source/limit, verification path | Confident fluency, fake citation, human identity, or `I know` without evidence. |
| Immediate danger/crisis | Source, area, hazard, time, action, next update | Brand flourish, marketing, slow preamble, or unsupported certainty. |

### The consequence rule

As likely harm, irreversibility, uncertainty, or urgency increases, the content should generally become [Inference]:

- more explicit about state, evidence, consequence, and next action;
- less playful, metaphorical, promotional, anthropomorphic, or celebratory;
- more specific about owner, time, scope, recovery, and human escalation;
- more demanding of evidence fitness, governing-applicability checks, accountable review, accessible alternatives, and rendered-context verification.

This is not a mandate to become cold. Empathy and directness can coexist: acknowledge the difficulty, then provide the operative fact and path.

## 6. Emotional context is evidence, not a script

A product can know that a situation is commonly stressful without claiming to know how one person feels. Prefer:

- `This may be difficult to deal with.`
- `You can stop and return before 5 September.`
- `If you need help, you can…`

Avoid unverified emotional narration:

- `We know you're devastated.`
- `Don't worry.`
- `Great news!` when the outcome may have mixed consequences.

Content research should include people experiencing the relevant situation; team intuition about `empathetic tone` is not enough. [Inference]

## 7. Tone across channels

Tone and content density change by channel, but truth and consequence do not.

| Channel | Tone/content constraint |
| --- | --- |
| UI | Adjacent hierarchy and action label carry meaning; test the complete state and next state. |
| Push/lock screen | Protect privacy; identify only what is safe before authentication; stale alerts need expiry handling. |
| SMS | Sender trust, compact action, link safety, timing, consent, and language support matter. |
| Email | Subject, preview, sender, body, CTA, footer, and reply route form one message; do not bury the decision. |
| Voice/conversation | Turn-taking, repetition, confirmation, pronunciation, uncertainty, interruption, and transcript/privacy need design. |
| CLI | Brevity must preserve affected target, environment, consequence, safe retry, and recovery; never rely on color alone. |
| API/error payload | Stable machine code and localized human message have different jobs; do not make clients parse display text. |
| Document/notice | Required elements, version/effective date, layering, navigation, and accessible format are part of meaning. |
| Status page/incident alert | Timestamp, time zone, affected scope, known/unknown, user action, and next update outrank brand expression. |

# Part III — What domains constrain

## 8. Domain overlay, not domain voice

| Domain | Domain constrains | Tone changes at | Terms that need particular control |
| --- | --- | --- | --- |
| Finance/payments | Price/rate/fee truth, decision reasons, authorization, status, disclosure, dispute, timing | Commitment, decline, fraud, debt, loss | pending, completed, reversed, refund, dispute, unauthorized, approved, rate/APR |
| Insurance | Coverage structure, exclusions, restrictions, obligations, claims, appeal | Purchase, loss, evidence request, denial | quote, premium, cover, exclusion, deductible/excess, claim, settlement |
| Healthcare | Clinical evidence, risk/benefit, privacy, consent, health literacy, escalation | Results, diagnosis-adjacent states, treatment, crisis | screening, diagnosis, normal, positive/negative, side effect, emergency |
| Government | Policy, eligibility, evidence, legal effect, deadlines, assisted/offline routes | Denial, sanction, hardship, bereavement, emergency | eligible, entitled, required, evidence, decision, appeal |
| Legal/privacy | Rights, duties, legal basis, consent, waiver, deadlines, remedies | Commitment, rights refusal, complaint, dispute | consent, authorize, acknowledge, delete, confidential, legal advice |
| Education | Learning objective, assessment validity, student privacy, age, accommodations | Feedback, failure, grading, discipline | practice, score, grade, pass, credit, certificate, integrity |
| Ecommerce | Claim substantiation, total price, fees, recurrence, delivery, cancellation, platform role | Checkout, delay, cancellation, refund, recall | free, sale, verified, sponsored, total, trial, renew, refund |
| Travel | Role and itinerary, local time, conditions, disruption rights, assistance | Booking, delay/cancellation, injury/crisis | confirmed, ticketed, reroute, refund, credit, compensation, assistance |
| B2B/devtools/security | Resource model, permissions, environment, blast radius, safe defaults, audit/incident truth | Destructive action, privilege change, outage, incident | revoke, rotate, delete, region, role, severity, resolved |
| Social/community/gaming | Visibility, moderation, safety, monetization, odds, appeals, age | Enforcement, abuse/self-harm, spend, account loss | public/private, block, mute, report, suspend, appeal, odds, currency |
| AI/agents | Capability, uncertainty, source, permission, human role, action status, provenance | Recommendation, external action, partial failure, high-consequence output | assistant, agent, autonomous, verified, understands, decided, sent |
| Children/family | Age, developmental needs, safeguarding, data/consent roles, spend, family safety | Data collection, social contact, report, purchase, crisis | child, parent, guardian, permission, private, location, parental control |
| Nonprofit | Recipient/intermediary, fee, delivery, tax, impact evidence, dignity/safeguarding | Donation commitment, beneficiary story, urgent appeal | donation, direct, matched, 100%, verified, anonymous, impact |
| Emergency/crisis | Competent authority, location, hazard, time, protective action, uncertainty, updates | Warning, escalation, correction, all-clear | warning/watch, evacuate, shelter, all clear, severity, official |

The full fact, approval, recovery, accessibility, localization, and jurisdiction matrix is in [domain-risk-matrix.md](domain-risk-matrix.md).

## 9. Industry terms can be necessary without being user-ready

The goal is not to eliminate every specialized term. Some concepts have no safe plain-language substitute; insurance model guidance explicitly recognizes necessary medical, statutory, and insurance terminology. The correct sequence is [Inference]:

1. Determine whether the term is legally/technically necessary or merely internal habit.
2. Preserve the canonical term when its exact identity matters.
3. Explain it at the point of need in the user's context.
4. Use it consistently after introduction.
5. Provide a glossary only as support, not as a substitute for in-flow understanding.
6. Test comprehension, including with the target locale and accessibility needs.

# Part IV — Terminology as governed product infrastructure

## 10. A glossary is not enough

A simple `term → definition` file cannot resolve product language safely. A terminology record needs evidence sources, applicable governing instruments, accountable ownership, authorized approvers and approval records, scope, independent decision and delivery states, behavior, and locale.

Proposed term record [Inference]:

```yaml
id: term.payment.refund
canonical_term: refund
concept_definition: Money returned through the applicable payment process
user_definition: null
concept_id: payment-return-001
domain: payments
product_objects: [payment, order]
journey_states: [cancelled, returned, disputed]
audiences: [consumer, merchant, support]
locales:
  en-US:
    preferred: refund
    governing_instrument: null
  en-GB:
    preferred: refund
part_of_speech: noun-verb
approved_variants: []
prohibited_or_confusable:
  - term: reversal
    reason: A reversal is a different transaction event
  - term: credit
    reason: Could mean account credit rather than return to original method
behavioral_contract:
  trigger: system has initiated the applicable return of funds
  completion: processor confirms the defined completed state
  timing_evidence_source: payments-service
required_context: [amount, currency, destination, expected timing]
do_not_translate: false
translator_note: Confirm market-specific payment terminology and grammatical role
evidence_sources:
  - id: implemented-payments-state-model
    version: null
governing_instruments:
  - id: payments-policy
    version: null
decision_state: proposed
accountable_owner: payments-content
required_approver_roles: [payments-product, locale-owner]
approval_records: []
effective_from: null
review_on: null
```

This example is deliberately not canonical payment guidance. It demonstrates the fields needed to stop `refund`, `reversal`, and `credit` from drifting into synonyms.

## 11. Terminology classes

| Class | Examples | Typical evidence or representation | Potential governing instrument | Accountable owner and approval route |
| --- | --- | --- | --- | --- |
| Product object | project, workspace, policy, trip, claim | Product model, behavior evidence, research, observed use | Approved product model or product-language system | Accountable product/domain owner and scoped term approver |
| User role | owner, admin, guardian, trader, patient | Permissions/relationship model, user research, operational evidence | Approved permissions model plus applicable policy/legal constraints | Accountable product/policy owner and any required specialist approver |
| Domain/regulatory | adverse action, deductible, consent, diagnosis | Primary instruments, current domain evidence, specialist interpretation | Applicable law, regulation, policy, or professional standard | Accountable qualified domain/policy owner and authorized approver |
| Transaction/state | pending, complete, failed, reversed, suspended | Executable behavior, state model, operations evidence | Approved system-state or service-operation contract | Accountable product/engineering/operations owner and state-term approver |
| Technical/syntactic | command, flag, endpoint, ID, error code | Technical specification and implementation | Approved engineering/API contract; often do-not-translate | Accountable engineering owner and declared interface approver |
| Brand/proper name | company, plan, feature, program | Naming research, trademark evidence, current brand use | Approved naming/brand system and applicable trademark constraints | Accountable brand/product-language owner and authorized naming approver |
| Local institution | postcode/ZIP code, GP/primary care physician, tribunal/court | In-market research, institutional usage, local-language evidence | Applicable local requirements and approved locale terminology | Accountable locale/language owner and relevant local/specialist approver |
| Inclusive/self-identification | disability, identity, relationship terms | Affected-community research, current usage, locale evidence | Approved inclusive-language policy where one applies | Accountable inclusion/content role with affected-community and locale review |
| Safety/emergency | warning levels, evacuation terms, hotline names | Current competent-body evidence and incident operations | Applicable emergency standard, order, or approved incident protocol | Accountable safety/incident owner and authorized specialist approver |

## 12. Term control and conflict resolution

Frequency does not establish governing status, accountable ownership, or approval, and there is no universal source-precedence list. Resolve the specific property or claim [Inference]:

| Decision property | Fit evidence sources | Governing instrument and recorded applicability, when present | Accountable owner and approval route |
| --- | --- | --- | --- |
| Legally required label or meaning | Primary legal text, scoped interpretation, and implementation evidence | Applicable law, order, contract, or approved policy for the jurisdiction and claim | Accountable legal/policy owner; authorized approver and exact approval record for the scope |
| Product object, role, action, or state meaning | Product/state models, executable behavior, technical specifications, research, and recorded conflicts | Applicable approved product or interface policy, if one exists | Accountable product/domain owner; engineering supplies behavior evidence; authorized term approver records the decision |
| Clinical, financial, safety, or other specialist meaning | Current primary domain material and qualified specialist evidence | Applicable regulation, professional standard, contract, or approved policy | Accountable qualified specialist and any required compliance/policy approver |
| Brand or product naming | Naming research, observed use, and trademark evidence | Applicable approved naming/brand policy and trademark constraints | Accountable brand/product-language owner and authorized naming approver |
| Locale expression | Approved semantic decision, terminology memory, locale research, and in-market evidence | Applicable local requirement or approved locale policy | Accountable locale/language owner and relevant authorized specialist approver |
| User-facing comprehension and findability | Direct research, search/support language, and task evidence | Any applicable controlled-meaning or disclosure requirement | Accountable content/IA owner; authorized decision route within those constraints |
| Current implementation | Exact code, design, CMS, localization, and runtime occurrence | None implied by implementation | Evidence only until reconciled with separately recorded instruments, owner, decision, and approval |
| Corpus frequency | Repeated observed usage with source coordinates and evidence dimensions | None implied by frequency | Candidate evidence only; never sufficient for ownership or approval |

The system should identify what each evidence source supports or challenges, record its five evidence dimensions, identify any separately applicable governing instrument, and apply only a declared resolution rule for that claim type. A statutory term may need an adjacent user explanation; research may show an approved label is not understood; code may reveal behavior differs from policy. When these cannot be reconciled, record the conflict, affected surfaces, accountable owner, authorized decision route, independent decision and delivery states, evaluation links, interim instruction, and resolution needed rather than silently choosing.

### Conflict record

```yaml
concept: account-closure
evidence_sources:
  - evidence_source_id: policy-observation-17
    source_type: policy-document
    term: close account
    evidence_dimensions:
      observation_strength: observed
      challenge: disputed
      freshness: current
      lineage: active
      epistemic_qualifier: none
  - evidence_source_id: runtime-observation-31
    source_type: runtime-observation
    implementation_occurrence_id: settings-delete-account-label
    term: delete account
    evidence_dimensions:
      observation_strength: observed
      challenge: undisputed
      freshness: current
      lineage: active
      epistemic_qualifier: none
governing_instrument:
  instrument_id: retention-policy-4
  applicability: requires retention of specified records after account closure
conflict: Product also retains legally required records, so delete may overpromise
affected_surfaces: [settings, confirmation-email, help]
risk: R3
accountable_owner: product-owner-for-account-lifecycle
required_review_routes: [privacy, legal]
authorized_approver: null
approval_record: null
decision:
  decision_id: account-closure-term-v1
  state: question
delivery_occurrences:
  - occurrence_id: settings-delete-account-label
    state: observed-live
evaluation_records: []
interim_rule: Do not apply a new label until retention and user-visible outcome are verified
```

## 13. Terms must bind to behavior

For actions and states, the content contract should connect the term to:

- trigger and preconditions;
- actor and target;
- actual system state;
- effect and scope;
- timing and expiry;
- reversibility;
- downstream dependencies;
- user-visible confirmation;
- recovery and support.

Without this binding, a content agent may improve `Delete workspace` to `Remove workspace` while unknowingly changing the perceived consequence. [Inference]

## 14. Acronyms, abbreviations, and expert audiences

- Expand an unfamiliar acronym at first meaningful use, unless the audience demonstrably uses the acronym as the primary term.
- Do not expand syntactic tokens, protocol names, or product identifiers into invented phrases.
- Record audience and surface exceptions rather than declaring an acronym universally `allowed`.
- Ensure screen-reader pronunciation does not turn obscured sensitive data or repeated symbols into noise.
- Localization may require a localized expansion with the original acronym retained, a local acronym, or no acronym.

WCAG 2.2 includes success criteria and guidance relevant to unusual words, abbreviations, labels, language metadata, and understandable input help [STANDARD: U-ACC-1].

# Part V — Localization, culture, and accessibility

## 15. Locale is more than language

The W3C distinguishes localization from translation and includes numeric/date/time formats, currency, keyboard use, sorting, symbols, colors, names, addresses, legal requirements, and cultural expectations [OFFICIAL GUIDANCE: U-I18N-1].

A locale profile therefore needs [Inference]:

- BCP 47 language tag and script/direction;
- market/jurisdiction and legal entity;
- preferred language and fallback behavior;
- number, decimal, currency, date, time, time-zone, calendar, and unit conventions;
- personal names, honorifics, pronouns, family/relationship structures, addresses, phone numbers, and identifiers;
- local institutions and domain terminology;
- reading level and literacy assumptions supported by research;
- accessibility formats and language/communication support;
- prohibited stereotypes, sensitive histories, imagery/symbol/color risks, and community review;
- official/approved translations and terms that must not be translated;
- local support, emergency, complaint, appeal, and rights channels.

## 16. Repository rules for localizable strings

Minimum proposed controls [Inference], grounded in W3C internationalization guidance:

- Do not build sentences by concatenating fragments. Grammar, word order, gender, case, and pluralization differ.
- Give translators the complete string plus surface, state, audience, intent, screenshot/rendered context, variable meanings, and related strings.
- Use locale-aware plural/select mechanisms; do not encode English `one/other` assumptions globally.
- Preserve placeholders with typed examples and state whether they contain user text, dates, money, counts, or identifiers.
- Separate syntactic values and machine codes from displayable text. W3C advises that syntactic values should not be treated as user-facing display strings [OFFICIAL GUIDANCE: U-I18N-2].
- Store or transmit language and base direction metadata for natural-language strings; do not guess direction from characters [OFFICIAL GUIDANCE: U-I18N-2].
- Design for bidirectional isolation around variables and mixed-script content.
- Avoid character-count `solutions` that delete essential meaning; design responsive space and test realistic expansion.
- Keep legal, clinical, safety, and regulated translations versioned and approved for the applicable market.
- Test in context with assistive technology and native/local expert review; back-translation alone does not prove quality.

## 17. Cultural adaptation boundaries

The agent may surface likely cultural questions, but should not infer a culture-wide preference from nationality, language, or an internet style guide. [Inference]

Escalate when content depends on:

- forms of address, hierarchy, honorifics, kinship, gender, or identity;
- humor, idiom, taboo, metaphor, color, symbol, gesture, or imagery;
- health, death, debt, disability, religion, sexuality, conflict, migration, or political history;
- local trust in institutions, channels, payment methods, charities, or emergency authorities;
- a claim that `users in country X prefer…` without current local research.

The safe output is a research question and provisional alternative—not a cultural rule.

## 18. Accessibility changes the content object

WCAG 2.2 treats accessibility across perceivable, operable, understandable, and robust interactions, including text alternatives, headings/labels, language, errors, help, legal/financial/data error prevention, authentication, and status messages [STANDARD: U-ACC-1].

Content records therefore need more than visible copy:

- programmatic name, visible label, description, hint, error, and status announcement;
- semantic role and heading relationship;
- focus and reading order assumptions;
- icon/non-text alternative;
- audio/caption/transcript/sign-language or Easy Read requirements where applicable;
- timing, timeout, interruption, reauthentication, and redundant-entry behavior;
- color-independent state language;
- user preference for format or communication support where the service records it.

NHS England's 2025 Accessible Information Standard shows an operational model of identifying, recording, flagging, sharing, meeting, and reviewing communication needs [STANDARD: HEALTH-UK-1]. That is stronger than producing one `accessible version` and forgetting the preference.

### Accessibility and language access are related but not identical

A person may need Braille in English, British Sign Language, Easy Read, a qualified interpreter for a community language, captions, or several supports. NHS England explicitly notes that community-language translation is outside the Accessible Information Standard's scope, which demonstrates why an agent must not collapse all needs into `localization` or `accessibility`. [STANDARD with stated scope: HEALTH-UK-1]

# Part VI — Operational governance for an agent

## 19. What the agent may infer, propose, and enforce

**[Proposal]** Every autonomous enforcement action requires all of these independent prerequisites: a current deterministic rule in canonical `approved` decision state with an exact authorized semantic-decision approval record and scope; a passing P0-F result; and an independently constructed task-specific capability grant for the exact actor, rule version, resource, operation, environment, and duration. P0-A or P0-B and an exact read grant apply to its inputs; P0-G and a separate exact runtime grant apply if the check launches or attaches to a build, test, browser, device, emulator, server, process, or runtime instrumentation; P0-D or P0-E, a separate exact write grant, and mandatory mutation/change approval apply if it mutates or publishes; publication additionally requires release approval when policy requires residual-risk acceptance. Neither a row below nor any approval grants those capabilities.

| Object | May infer from repository? | May propose? | Candidate for deterministic enforcement after every prerequisite above? |
| --- | --- | --- | --- |
| Current string inventory | Yes, with exact source location and orthogonal evidence dimensions | Yes | No; inventory validation is discovery, not enforcement, and creates no authority claim. |
| Candidate voice pattern | Yes, with the underlying evidence permanently labeled inferred and contradictions preserved | Yes | Only a separately approved, current deterministic voice rule in its exact scope; probabilistic style judgment is not a blocker. |
| Situational tone need | Yes from state/risk evidence | Yes | Only an approved deterministic rule in a bounded low-risk scope; context-fit judgment remains advisory. |
| Domain terminology | Candidate only | Yes with source | No new controlled meaning. An existing rule also needs an applicable governing instrument where relevant, accountable owner, authorized approver, and exact approval record. |
| Product behavior/fact | Observe from code/docs; do not treat as policy truth | Ask or flag conflict | Only compare against an applicable governing instrument and current approved decision with typed evidence/control records; implementation presence is insufficient. |
| Legal/clinical/financial/safety requirement | Retrieve current source and applicability questions | Surface to accountable qualified owner and authorized approver | No autonomous applicability determination or claim approval. |
| Mechanics rule | Infer convention cautiously | Yes | Only a current deterministic rule with exact scope/version and approval record. |
| Localization rule | Detect engineering risks | Yes | Structural checks can run; linguistic/cultural judgment needs review. |

## 20. Agent workflow for voice and terminology takeover

1. **Discover:** after P0-A for local reads and P0-B for model egress or connected reads, use an independently constructed exact read grant to inventory strings, terms, content objects, states, channels, variants, and source locations; do not mutate.
2. **Cluster:** group by concept, product object, journey state, audience, domain, and locale—not wording similarity alone.
3. **Trace evidence and control:** find evidence sources, governing instruments, accountable owners, and approvers across brand, product, policy, legal, technical, clinical, localization, accessibility, and research.
4. **Expose contradictions:** record different names, definitions, behaviors, decision states, and approval records without averaging them.
5. **Model risk:** classify the specific decisions and states; load all applicable domain overlays.
6. **Draft candidate voice:** after P0-C and an isolated-draft-target grant, derive principles and counterexamples from evidence; label inference and gaps. Drafting grants no source mutation.
7. **Build concept terminology:** connect canonical concepts to behavior, roles, locale terms, aliases, and prohibited confusions.
8. **Define tone profiles:** create state/risk/channel rules, especially for error, denial, loss, consent, enforcement, security, and crisis.
9. **Validate:** obtain named approvals and research with intended users/locales; verify accessibility and localization in rendered context.
10. **Apply a bounded plan:** require mandatory scoped mutation/change approval for the exact transaction, plus P0-D for local mutation or P0-E for remote mutation/publication and an independently issued grant bound to the exact actor, operation, target, expected-current value or base revision, environment, expiry, and rollback. Record semantic-decision approval separately when the target contains releasable governed meaning; require a separate release approval when release policy requires residual-risk acceptance. A proposed semantic decision may be patched only to an isolated nonrelease review target under the exact mutation/change approval. Preserve required text and behavior and produce reviewable diffs.
11. **Verify:** use the applicable P0-A or P0-B read gate and exact read grant for static or connected inspection. Any build, test, browser, device, emulator, server, process, or rendered-state execution additionally requires a passing P0-G result and a separately constructed exact runtime-verification grant covering the executable or tool, actions, environment, filesystem/network/data boundary, duration, and cleanup. A finding does not authorize a corrective write.
12. **Monitor drift:** under a scoped read grant, detect new ungoverned terms, expired sources, behavior/content mismatch, untranslated strings, and approval/version divergence. Any autonomous blocking action additionally requires P0-F and its own exact enforcement grant.

## 21. Lintable rules versus judgment

### Good candidates for deterministic checks

- prohibited term used in a defined scope;
- approved capitalization or product name mismatch;
- missing locale key or untranslated fallback;
- string concatenation or untyped placeholder;
- visible label/accessibility-name mismatch;
- internal identifier or raw error exposed;
- missing required content field in a known pattern;
- missing evidence provenance, governing applicability, accountable owner, decision state, effective date, or review date;
- CTA verb inconsistent with an approved action contract;
- time, currency, count, or date not passed through locale-aware formatting.

### Findings that should remain advisory or human-reviewed

- whether warmth is appropriate;
- whether a sentence could be shaming, coercive, culturally unsafe, or overconfident;
- whether a term is understood by a specific audience;
- whether information hierarchy is genuinely clear;
- whether empathy feels credible;
- whether an explanation preserves legal, clinical, instructional, or technical meaning;
- whether a translated phrase is natural, inclusive, and locally appropriate;
- whether humor, anthropomorphism, celebration, or urgency fits the moment.

An LLM can identify evidence and propose a critique; it should not manufacture approval. [Inference]

## 22. Review packet for a voice or terminology change

Every material change should show [Inference]:

- before and proposed content in rendered context;
- concept/action/state being represented;
- user, job, entry point, surface, locale, and risk;
- rationale tied to approved voice/tone/term rules;
- product behavior and controlled facts;
- domain sources and applicability decision;
- accessibility and localization impact;
- contradictions and unresolved questions;
- required approver roles, approval records, and decision state;
- recovery/appeal/support path;
- implementation locations and verification evidence;
- planned measure of comprehension or outcome.

# Part VII — Failure patterns

## 23. Voice failures

- **Industry costume:** `bank voice = sober`, `health voice = caring`, `game voice = fun`.
- **Adjective fog:** `friendly, clear, concise` without behavioral distinctions.
- **Voice over truth:** preserving charm while hiding a fee, denial, or uncertainty.
- **Uniform intensity:** using the same personality at discovery, error, enforcement, loss, and crisis.
- **Fake empathy:** narrating emotion or saying `we understand` without providing help.
- **Behavior contradiction:** claiming transparency, safety, or control the product does not deliver.
- **Anthropomorphic overclaim:** software says it knows, decided, cared, or completed an action without factual basis.

## 24. Tone failures

- celebration at borrowing, spending, health results, legal commitments, or mixed outcomes;
- urgency without a real deadline or action;
- reassurance without evidence;
- apology that replaces status and recovery;
- blame in validation or system errors;
- euphemism at denial, loss, suspension, or deletion;
- excessive legal or technical density used as a shield against comprehension;
- crisis language that starts with organizational reputation rather than protective action.

## 25. Terminology failures

- choosing the most frequent term as canonical;
- changing a defined term because it sounds `simpler`;
- exposing internal state or code vocabulary to users;
- using several words for one product object or one word for distinct states;
- treating `refund`, `reversal`, `credit`, and `chargeback` as variants;
- localizing code, IDs, variables, or proper names without an explicit rule;
- keeping an English term everywhere because translation is hard;
- storing a preferred word without its concept and behavior, jurisdiction and scope, evidence sources and evidence dimensions, applicable governing instruments, accountable owner, authorized approver and approval record, decision state, delivery state, or review trigger;
- declaring `approved` without specifying the authorized approver and approval record, exact decision version and state, locale, surface, scope, conditions, and effective date.

# Research gaps and validation agenda

Before this becomes executable `CONTENT.md` behavior:

1. Interview content designers across product, government, regulated services, trust and safety, localization, crisis, and developer experience.
2. Test the voice/tone separation with real cross-domain projects and compound-risk states.
3. Research how organizations operationalize terminology across design systems, code, CMS, translation management, support, search, analytics, and APIs.
4. Add local-language primary evidence and community review beyond the current English-heavy US/UK/EU corpus.
5. Define a versioned concept/term schema that can interoperate with repository strings and translation systems without forcing one toolchain.
6. Determine which tone controls can be evaluated reliably and which require user research or accountable human judgment.
7. Build adversarial evaluations for false authority, legal/clinical meaning loss, culturally unsafe inference, manipulative warmth, inaccessible errors, and translation-context failure.
8. Establish how the system responds when approved voice conflicts with user comprehension or product behavior.
9. Test governance for AI-generated content provenance and agent action attribution under the EU AI Act's current, recently updated implementation context. Sources: law/official guidance `AI-EU-1`, `AI-EU-2`.

Until validated, this document is a research synthesis. It supports design of the future system; it is not yet the system's canonical voice, tone, or terminology policy.
