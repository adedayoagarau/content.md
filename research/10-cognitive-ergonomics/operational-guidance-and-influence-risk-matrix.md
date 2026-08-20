---
title: Operational cognitive-ergonomics guidance and influence-risk matrix
status: proposed
created: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
practitioner_validation: not-validated
normative_status: non-normative
execution_status: design-only-not-implemented-not-run
claim_coverage: CER-C001-C031
claim_count: 31
scope: Proposed pre-writing, risk-routing, evaluation, and claim-specific guidance for cognitive ergonomics and behavioral influence
source_documents:
  - README.md
  - psychology-claim-register.md
  - ../sources/cognitive-ergonomics-source-notes.md
  - pre-writing-cognitive-context-schema.md
  - content-contract-and-lint-candidates.md
  - adversarial-behavioral-influence-fixtures.md
---

# Operational cognitive-ergonomics guidance and influence-risk matrix

## Result, evidence, and authority boundary

**[Proposal]** This working matrix translates the bounded claims in the [psychology claim register](psychology-claim-register.md#claim-records) into questions, safe candidate interventions, counterexamples, evaluation needs, and escalation routes that may be considered before writing. It does not turn a psychology finding into a universal writing rule, diagnose a person, establish legal applicability, approve a semantic decision, or authorize personalization, experimentation, implementation, mutation, enforcement, publication, or release.

**[Sourced fact]** The underlying [source notes](../sources/cognitive-ergonomics-source-notes.md#status-and-evidence-boundary) are working research with an evidence cutoff of 17 August 2026; they are not practitioner-validated or normative and do not prove product effectiveness. The WCAG-related records in this guide preserve the difference between a normative statement, its product-specific applicability, implementation conformance, and content guidance.

**[Cross-source finding]** The registered choice, feedback, social-proof, default, modality, aesthetics, color, shape, and multimedia evidence contains moderators, nulls, reversals, or outcome splits. Behavioral change is also distinct from comprehension, preference fit, accessibility, autonomy, lawfulness, and user benefit. See the [cross-register conclusions](psychology-claim-register.md#cross-register-conclusions).

**[Proposal]** Every example and counterexample below is synthetic and illustrative. None is approved copy, practitioner evidence, product truth, a gold answer, or an observed result. An agent may use this document only to ask better questions, abstain, propose bounded options, and route decisions under the repository's independent evidence, applicability, ownership, approval, delivery, evaluation, security, privacy, and capability controls.

## How to read the guide

| Element | Meaning | Must not be inferred |
| --- | --- | --- |
| Registered claim | A direct link to one `CER-C…` record with its canonical claim label, source IDs, population, task, outcome, moderators, and limitations | Product applicability, approval, implementation, or user state |
| Evidence strength | A descriptive evidence shape such as `primary-bounded`, `synthesis-bounded`, `normative-instrument-bounded`, or `provenance-gap-hard-abstention` | A universal rank, probability, quality score, or permission to act |
| May apply | A bounded context in which the claim can generate a question or product hypothesis | That the effect is present for an individual or the target product |
| Do not apply | A source-to-product transfer that the registered evidence cannot support | That the underlying construct is false in every context |
| Safe candidate | A least-invasive proposal that retains controlled facts, material information, choice, accessibility, and evaluation | Semantic approval, release eligibility, or proven benefit |
| Unsafe intervention | A prohibited or high-risk use evidenced by observable content, structure, timing, data use, consequence, or missing controls | The author's intent, a legal conclusion, or a person's internal state |
| Counterexample | A similar-looking case that should prevent an overbroad finding | Global safety, effectiveness, or approval |

The evidence-strength descriptors are non-ordinal:

- `primary-bounded`: one original study or research program within its exact sample, task, and outcome;
- `synthesis-bounded`: a systematic review or meta-analysis with its heterogeneity and source dependence retained;
- `cross-source-bounded`: multiple records triangulate a bounded claim but do not automatically replicate one another;
- `normative-instrument-bounded`: a standard or regulation states a requirement within an applicability scope that still must be determined;
- `official-guidance-bounded`: official guidance informs a review but does not itself establish product conformance;
- `inference-transfer-gap`: the product use is an explicit inference requiring direct validation;
- `risk-triangulation-bounded`: empirical and official or normative records answer different occurrence, effect, and governance questions; and
- `provenance-gap-hard-abstention`: the claimed source or operational definition is missing, so the claimed rule must not be used.

## Assistance, influence, and manipulation-risk conditions

**[Proposal]** Classify the observable intervention and its decision conditions, not the author's intention and not an individual's inferred emotion, cognition, culture, literacy, disability, motivation, vulnerability, or susceptibility. Assistance and influence can coexist: a truthful comparison aid may influence a choice while supporting the person's goal. The classification therefore does not form a single ladder or score.

**[Proposal]** Keep packet disposition, candidate gate result, escalation, and execution authorization as four independent records. The fixture calls hard, advisory, unknown, and escalation outputs “candidate dispositions”; this matrix calls them candidate gate results so they cannot be confused with the packet-disposition vocabulary.

| Record namespace | Allowed values or content | Boundary |
| --- | --- | --- |
| Packet disposition | Only `ready_for_bounded_advice`, `insufficient_evidence`, `human_decision_required`, `prohibited_intervention`, or `not_applicable` from the [pre-writing schema](pre-writing-cognitive-context-schema.md#packet-disposition) | Controls what non-mutating advice may be produced; never records approval, implementation, release, or capability |
| Candidate gate result | An exact `HARD_FAIL_*`, `ADVISORY_*`, `PRESERVE_REPORTED_OBSERVED_CONFLICT`, `METHOD_REVISE_BEFORE_COLLECTION`, `PROHIBITED_INTERVENTION`, `INSUFFICIENT_EVIDENCE`, or `NO_FINDING` value from the [synthetic fixture vocabulary](adversarial-behavioral-influence-fixtures.md#candidate-disposition-vocabulary) | Proposed candidate review output whose hard, advisory, preservation, method, unknown, or no-finding type remains explicit; not an observed product result, deterministic production finding, actual severity, waiver, or packet disposition |
| Escalation | Exact decision question, evidence, affected actors, accountable owner, authorized reviewer, scope, due/expiry condition, and optionally `ESCALATE_HIGH_RISK_INFLUENCE` as the candidate escalation result | Routing is not approval and does not resolve missing evidence |
| Execution authorization | Independent current gates, exact grants, mutation/change approval, semantic approval, release approval, controls, and target scope as applicable | This working note grants none; a packet or candidate gate result never authorizes research, mutation, delivery, or release |

| Class | Observable operational test | Packet disposition | Candidate gate result | Escalation | Execution authorization | What is explicitly out of scope |
| --- | --- | --- | --- | --- | --- | --- |
| Assistance candidate | Makes a supported task easier to understand, compare, complete, decline, defer, undo, or recover without hiding material facts, changing a material default, adding unsupported pressure, or removing a supported choice | `ready_for_bounded_advice` only when required facts and review routes resolve; `not_applicable` when no behavioral hypothesis is needed | No finding from the class alone; record any independently triggered exact result | None from the class alone | None; separate approvals and exact grants remain required | Claiming zero influence, universal benefit, approval, or implementation |
| Influence condition | Changes salience, framing, order, default, timing, social information, authority cue, progress, reward, or friction in a way that could affect attention, evaluation, or action | `ready_for_bounded_advice` for a bounded proposal when required inputs and routes resolve; `human_decision_required` when material ownership or policy is unsettled | `ADVISORY_RESEARCH_REQUIRED` when the contextual effect cannot be settled by inspection; no result from influence alone otherwise | `ESCALATE_HIGH_RISK_INFLUENCE` when a high-risk owner decision is required | None; evaluation or rollout requires separate authorization | Inferring a persuasion “route,” susceptibility, intent, or effectiveness from the interface alone |
| Persuasive-information candidate | Supplies material reasons or evidence for a choice while preserving meaningful alternatives, source scope, deliberation, and correction | `human_decision_required` while a material controlled claim or high-stakes decision is unresolved; otherwise `ready_for_bounded_advice` within scope | Record an exact hard or advisory result only if independently triggered | Record `ESCALATE_HIGH_RISK_INFLUENCE` only if its high-risk decision condition is independently triggered | None; approval of facts or content does not authorize delivery | Withholding evidence because a user appears disengaged or substituting pressure for reasons |
| Coercion-risk condition | A credible penalty, threat, forced continuation, inaccessible exit, or materially worse treatment is attached to declining or delaying where the product or governing decision supports a real alternative | `prohibited_intervention` for a requested nonwaivable tactic; `insufficient_evidence` if the supported alternative or consequence is unknown; otherwise `human_decision_required` for the qualified determination | `HARD_FAIL_AUTONOMY_OR_REVERSIBILITY` when its exact fixture condition holds | `ESCALATE_HIGH_RISK_INFLUENCE` for the required high-risk owner decision | None | Declaring legal coercion or author intent without the applicable evidence and qualified determination |
| Manipulation-risk condition | Observable deception, material concealment, false or unverifiable claims, silent material defaults, asymmetric obstruction, fabricated urgency, shame, lock-in, or vulnerability-targeted pressure may materially impair free and informed choice | `prohibited_intervention` for a requested tactic that crosses a nonwaivable boundary; `human_decision_required` where applicability or the qualified decision remains unresolved | Preserve the exact observed facts and record only the applicable hard failure or `PROHIBITED_INTERVENTION` result | Record `ESCALATE_HIGH_RISK_INFLUENCE` separately when its owner-decision condition holds | None | Diagnosing a person, asserting malicious intent, or making a final legal finding from content inspection |

An `assistance candidate` is not safe merely because it is described as help. An `influence condition` is not automatically harmful merely because behavior may change. A `manipulation-risk condition` is a fail-closed operational finding about observable conditions and missing controls, not a statement about the creator's motive or the affected person's mental state.

## Independent, non-additive risk axes

**[Proposal]** Record each axis as `clear_for_declared_scope`, `concern`, `fail`, `unknown`, or `not_applicable`, with evidence and scope. Never add, average, weight, or convert the axes into a psychology, manipulation, vulnerability, persuasion, ethics, or release score. A pass on one axis cannot offset a failure on another.

| Axis | Required question | Fail-closed trigger |
| --- | --- | --- |
| `IR-01 product_truth` | Is every product state, capability, consequence, eligibility, timing, price, and recovery claim linked to a fit evidence source with the exact current value and version, declared scope, freshness, lineage, and separately applicable control records? | A material claim is false, unverifiable, stale for use, or contradicted by behavior |
| `IR-02 influence_claim_truth` | Does social proof, scarcity, urgency, authority, progress, or outcome probability have an exact source, denominator or event, scope, time window, refresh behavior, and expiry? | Any required element is absent or the interface implies more than the source supports |
| `IR-03 materiality_and_timing` | Is every fact needed for choice, consent, commitment, price, privacy, eligibility, safety, right, or recovery available before the relevant action? | Material information is hidden, delayed, minimized, or created only after commitment without a valid reason |
| `IR-04 user_goal_and_value` | Does the intervention help the declared user goal, and is the organizational incentive separately visible? | The user goal is unknown while a material behavior is optimized, or organizational benefit is substituted for user value |
| `IR-05 consent_and_choice` | Are meaningful alternatives, consequences, decline, defer, and active consent available where required? | Consent is bundled, assumed, obscured, or made materially harder to refuse |
| `IR-06 default_and_preselection` | Is any default sourced, visible, preference-fit, proportionate, and changeable before and after commitment as applicable? | A silent preselection changes price, privacy, eligibility, commitment, rights, or another material consequence |
| `IR-07 symmetry_control_and_recovery` | Can a person compare, correct, exit, undo, cancel, and recover through supported paths without materially asymmetric obstruction? | A supported path is concealed, falsely unavailable, inaccessible, or materially less operable without approved justification |
| `IR-08 pressure_and_compulsion` | Does timing, loss, shame, streak, reward, repetition, or friction create pressure beyond the truthful consequence? | Fabricated urgency, threat, shame, FOMO, punitive streak loss, or compulsion is used to drive action |
| `IR-09 vulnerability_and_state_inference` | Does the proposal avoid inferring or targeting individual emotion, cognition, disability, literacy, culture, intent, or susceptibility? | Such a state is inferred or used for persuasion; protective use lacks explicit purpose, consent, minimization, reversibility, and qualified approval |
| `IR-10 accessibility_and_equivalence` | Are information, controls, timing, modalities, programmatic meaning, assistance, and recovery available across relevant access needs? | Critical meaning is single-cue or inaccessible, timing excludes needed access, or an equivalent route is removed |
| `IR-11 language_locale_and_culture` | Are terminology, direction, modality, symbol, color, norm, authority, and tone claims supported for the exact locale and community? | A universal cultural or language inference substitutes for qualified local evidence |
| `IR-12 privacy_and_data_use` | Are data source, purpose, minimization, consent or other valid route, inference boundary, retention, processor, and deletion independently authorized? | Behavioral or proxy data is repurposed for vulnerability inference or persuasion without the required controls |
| `IR-13 consequence_and_affected_actor` | What can go wrong, for whom, at what severity, exposure, reversibility, and time horizon? | High-consequence or safeguarding facts are unknown, or a convenience metric is used to waive a material risk |
| `IR-14 evidence_and_transfer` | Do population, task, environment, outcome, counterevidence, freshness, and product scope match the proposed use? | A myth, out-of-scope average, association, proxy, or missing primary source is presented as a product rule |
| `IR-15 governance_and_approval` | Are applicable instruments, accountable fact and risk owners, authorized approvers, decision versions, and expiry recorded independently? | A material controlled decision has no current owner/applicability/approval route, or evidence is treated as approval |
| `IR-16 evaluation_and_monitoring` | Are direct user outcomes, subgroup harms, adverse events, reversal, drift, and stop conditions defined independently of business metrics? | Only conversion, attention, clicks, completion, recall, trust rating, or another proxy is measured for a material intervention |

### Fail-closed decision classes

Evaluate in the order below. Multiple findings may coexist and remain independently visible.

| Priority | Condition | Packet disposition | Candidate gate result | Escalation | Execution authorization |
| ---: | --- | --- | --- | --- | --- |
| 1 | Individual vulnerability or internal state is inferred and targeted for persuasion; compulsion, shame, threat, deception, or fabrication is requested | `prohibited_intervention` | `PROHIBITED_INTERVENTION` and any separately applicable exact hard result | Route only a separately proposed protective use through its required owners | None |
| 2 | A proposed material claim is false, stale, contradicted, or unverifiable; material information is concealed; a material default is silent; or a supported exit, undo, or recovery path is removed or misrepresented | `prohibited_intervention` for the requested tactic; `insufficient_evidence` only when the underlying material fact is unknown rather than shown false or contradicted | The applicable `HARD_FAIL_FALSE_OR_UNVERIFIABLE_CLAIM`, `HARD_FAIL_MATERIAL_CONCEALMENT`, `HARD_FAIL_SILENT_MATERIAL_DEFAULT`, or `HARD_FAIL_AUTONOMY_OR_REVERSIBILITY` | Route the exact missing fact or qualified decision without weakening the hard finding | None |
| 3 | A disputed, mythical, or source-mismatched psychology statement is asserted as fact or rule | `prohibited_intervention` until the unsupported rule is removed or bounded; `insufficient_evidence` for a separate unresolved factual proposition | `HARD_FAIL_UNSUPPORTED_PSYCHOLOGY_CLAIM` | Route any remaining contextual hypothesis to research | None |
| 4 | A material fact, denominator, applicability decision, owner, evidence scope, or required outcome is unknown | `insufficient_evidence` | `INSUFFICIENT_EVIDENCE` | Route the exact missing input to its accountable owner | None |
| 5 | Evidence exists but a high-risk product, policy, accessibility, locale, ethics, privacy, legal, safeguarding, security, or domain decision is unresolved | `human_decision_required` | No exact hard or advisory result from unresolved ownership alone | `ESCALATE_HIGH_RISK_INFLUENCE` when its exact candidate escalation condition holds; record the exact question, owner, authorized reviewer, scope, and expiry | None |
| 6 | A truthful, reversible, evidence-linked influence condition remains within scope and required review routes exist | `ready_for_bounded_advice` | `ADVISORY_RESEARCH_REQUIRED` only when a contextual effect hypothesis cannot be settled by inspection; otherwise no result from influence alone | Route any material evaluation or owner decision separately | None; propose alternatives and evaluation only |
| 7 | The intervention supports a known goal without a material influence condition or unresolved hard axis | `ready_for_bounded_advice`, or `not_applicable` when no behavioral hypothesis is needed | No finding from the class alone | None unless another independent axis requires it | None; advice remains proposed, unapproved, unimplemented, and unevaluated |

## Required pre-writing inputs

Use the complete [pre-writing cognitive-context assessment schema](pre-writing-cognitive-context-schema.md#required-packet). The minimum routing view below does not replace that packet.

| Input group | Required record | When missing |
| --- | --- | --- |
| Bounded context | Product, journey, event/state, actor role, declared user goal or decision, surface/channel, language, locale, jurisdiction, consequence, and time window | Create a scoped unknown; do not reuse an industry stereotype or global packet |
| Product behavior and controlled facts | Current states, transitions, eligibility, prices, timing, commitments, supported actions, decline, exit, undo, recovery, source IDs, and controlled unknowns | `insufficient_evidence`; route to the product-behavior or policy fact owner |
| User and research context | Represented population, prior knowledge evidence, terminology familiarity, task observations, mental-model hypotheses, conflicts, and missing strata | Do not infer from persona, demographic, locale, clickstream, sentiment, or model confidence |
| Observable task demand | Cross-step information, required recall, visible context, concurrent material facts, branching, interruption, errors, backtracking, assistance, and perceived effort kept separate | Describe the demand and required method; never manufacture a cognitive-load score or item threshold |
| Material information | Exact proposition, affected decision and actor, required timing, omission consequence, recovery, governing applicability, owner, approver, and comprehension method | Fail closed before drafting a committing action or disclosure pattern |
| Choice architecture | Supported options, material differentiators, dependencies, default, preselection source, beneficiary, visibility, reversibility, compare, defer, decline, exit, undo, and recovery | Preserve alternatives and request the missing decision; do not optimize option count |
| Contextual stress or urgency | Observable event, consequence, real deadline, task-level barriers, uncertainty, support route, and ethical research need | Do not infer an individual's emotion, capacity, vulnerability, or persuasion receptivity |
| Influence-claim inventory | Exact social-proof, scarcity, urgency, authority, progress, reward, loss, or habit proposition; source; denominator; time window; scope; expiry; user value; organizational incentive | Do not generate the claim |
| Accessibility | Applicable criteria, content and control equivalence, cognitive-access needs, timing, memory support, assistive paths, disabled-user evidence, and accessibility owner | `human_decision_required` for material access; do not use conformance as usability proof |
| Language, locale, and culture | Language/script/direction, terminology, locally meaningful cue evidence, translation lineage, in-language reviewer, nontransfer boundaries, and locale-specific law/policy | `insufficient_evidence`; never infer culture or individual behavior from language or nationality |
| Privacy and inference | Data fields, purpose, legal/consent route, processors, retention/deletion, allowed inferences, prohibited secondary use, and reversibility | `prohibited_intervention` for unapproved vulnerability targeting; otherwise privacy/ethics escalation |
| Goal conflict and consequence | User outcome, organizational outcome, incentive conflict, affected actors, severity, exposure, reversibility, uncertainty, and safeguarding needs | Preserve the conflict; business preference cannot resolve it |
| Governance and lifecycle | Governing-instrument and applicability IDs, fact/risk owners, approver authorization, exact semantic decision and approval, evaluation, expiry, implementation occurrence, release, and monitoring records | No approval, implementation, release, or enforcement claim |
| Evaluation plan | Direct outcomes, sample and access needs, method, baseline, falsifier, adverse-event and stop rules, subgroup analysis, delayed effects, and business metric as a separate plane | No effectiveness, safety, comprehension, or user-benefit claim |

## High-risk owner and approval routes

**[Proposal]** Owners supply or remain accountable for facts and risks; authorized approvers accept an exact decision within scope; evaluators produce evidence; implementers deliver an approved change; none of those roles substitutes for another. Review or approval never creates a capability grant.

| Trigger | Required accountable inputs | Independent decision or approval route | Packet disposition while unresolved | Candidate gate result | Escalation | Execution authorization |
| --- | --- | --- | --- | --- | --- | --- |
| Unknown material product state, consequence, recovery, eligibility, price, or timing | Product-behavior, service, policy, or domain fact owner | Exact fact or policy decision with scope, date, evidence, and expiry | `insufficient_evidence` while the fact is missing; `human_decision_required` when evidence exists but the policy decision is unsettled | `INSUFFICIENT_EVIDENCE` only for the missing-input condition | Route the exact fact or policy decision to its accountable owner | None |
| Consent, privacy, recurring charge, financial, legal, eligibility, rights, or other material default | Product owner; privacy and policy/legal owners; research and accessibility owners; affected domain owner | Exact semantic decision plus every separately applicable privacy, legal/policy, consent, and risk approval | `human_decision_required` while the decision or approval is unresolved; `prohibited_intervention` if a silent material default is requested | `HARD_FAIL_SILENT_MATERIAL_DEFAULT` when its exact condition holds | Use `ESCALATE_HIGH_RISK_INFLUENCE` only when its high-risk owner-decision condition holds; otherwise route the exact approval question | None |
| Scarcity, urgency, social proof, authority, progress, or outcome-probability claim | Fact/data owner; product owner; research; accessibility; applicable legal/compliance and ethics/risk owner | Claim-source and applicability decision, exact content decision, expiry/refresh owner, and qualified approval where required | `insufficient_evidence` when source, denominator, scope, or freshness is missing; `human_decision_required` when evidence exists but applicability or approval is unsettled | `INSUFFICIENT_EVIDENCE` or an applicable exact hard claim result, according to the independent condition | `ESCALATE_HIGH_RISK_INFLUENCE` when its high-risk owner-decision condition holds; otherwise route the exact claim decision | None |
| High-consequence health, safety, emergency, financial, legal, safeguarding, or irreversible state | Domain specialist and fact owner; safety/safeguarding; legal/policy; accessibility; research; affected-user route | Exact scoped high-risk semantic approval and any separately applicable release-risk acceptance | `human_decision_required`; use `insufficient_evidence` only for specifically missing material inputs | No exact gate result from consequence level alone; retain any separately triggered hard or advisory result | `ESCALATE_HIGH_RISK_INFLUENCE` | None |
| Individual-state or vulnerability inference, profiling, or protective personalization | Privacy/data governance; ethics; research; accessibility; safeguarding; affected-user representatives | Persuasive targeting remains prohibited; a protective use needs explicit purpose, minimization, valid authorization, consent or other applicable route, reversibility, and independent approval | `prohibited_intervention` for persuasive targeting; `human_decision_required` for a separately bounded protective proposal with complete evidence and unresolved approvals | `PROHIBITED_INTERVENTION` for persuasive targeting | `ESCALATE_HIGH_RISK_INFLUENCE` for the separately bounded protective proposal | None |
| Cognitive-access or authentication decision | Accessibility owner; disabled users or qualified inclusive researcher; security and identity owner where relevant | Applicable criterion decision, threat model, exact behavior/content decision, accessibility and security approvals as required | `insufficient_evidence` when required access or threat-model evidence is missing; `human_decision_required` when the evidence exists but the decision is unsettled | No conformance finding from this matrix; retain any independently triggered exact result | Route the exact accessibility, security, or identity decision; use `ESCALATE_HIGH_RISK_INFLUENCE` only when its high-risk condition holds | None |
| Locale-, culture-, language-, script-, color-, shape-, norm-, authority-, or tone-sensitive decision | In-language locale/culture expert; terminology owner; accessibility; applicable policy/legal owner | Locale-specific decision and approval with transfer/nontransfer scope | `insufficient_evidence` when qualified local evidence is missing; `human_decision_required` when evidence exists but the locale decision or approval is unsettled | `INSUFFICIENT_EVIDENCE` for the missing-input condition | Route the locale-specific decision; use `ESCALATE_HIGH_RISK_INFLUENCE` only when its high-risk condition holds | None |
| Automation reliance, explanation, uncertainty, or override | System-capability owner; safety/security; domain-risk; research; accessibility; policy/legal where applicable | Exact capability/limit claims, reliance policy, semantic decision, and high-risk approval | `insufficient_evidence` for missing capability or risk facts; `human_decision_required` for an unresolved policy or approval | Retain any independently triggered exact hard or advisory result; do not maximize trust | `ESCALATE_HIGH_RISK_INFLUENCE` for the required high-risk owner decision | None |
| Reminder, streak, reward, re-engagement, or habit intervention | Product owner; research; ethics/well-being or safeguarding; privacy; accessibility; locale owner | User-goal and frequency/control decision, harm plan, exact semantic approval, and experiment approval if applicable | `human_decision_required` while a complete proposal awaits the required decision; `prohibited_intervention` for compulsion, shame, fabricated loss, or vulnerability targeting | `PROHIBITED_INTERVENTION` when its exact condition holds | `ESCALATE_HIGH_RISK_INFLUENCE` for the required high-risk owner decision | None |
| Research or experiment involving influence | Research owner; ethics/privacy; accessibility; domain and locale specialists; affected-user route | Approved protocol, consent/data-processing route, preregistration where appropriate, stop rules, adverse-event owner, and separate release decision | `insufficient_evidence` when protocol or material input is missing; `human_decision_required` when evidence exists but protocol, ethics, privacy, accessibility, or domain approval is unresolved | `METHOD_REVISE_BEFORE_COLLECTION` only for its exact method defect | `ESCALATE_HIGH_RISK_INFLUENCE` for the required high-risk decision | None; this matrix supplies no experiment, mutation, delivery, or release authorization |

## Independent outcome and stop-condition matrix

**[Proposal]** Report every applicable outcome separately. Truthfulness, material comprehension, valid consent, accessibility, autonomy, non-deception, and safety are non-compensable. No conversion, completion, attention, recall, preference, trust, or engagement lift can offset their failure.

| Outcome plane | Example method | Must remain separate from | Candidate stop or escalation condition |
| --- | --- | --- | --- |
| Truthfulness and state accuracy | Source-of-truth comparison across current, stale, failure, and boundary states | Persuasiveness or conversion | Any material false, stale, or unsupported claim |
| Non-deception | Structural review of omissions, asymmetry, framing, defaults, timing, source implication, and supported alternatives, plus task-matched participant explanation | Literal claim truth, autonomy/pressure, or business intent | Material deception, concealment, false implication, or asymmetry is present or cannot be bounded for a high-risk decision |
| Findability and notice | Scenario search, first action plus explanation, state-change detection | Comprehension | Material information not found before action |
| Material comprehension | Teach-back, scenario choice with rationale, paraphrase coding | Exposure, recall, or click | Misunderstanding of price, consent, eligibility, consequence, safety, right, or recovery |
| Valid consent | Scope- and task-specific check of information, comprehension, voluntariness, affirmative choice, authorization basis, refusal equivalence, and withdrawal or revocation | Notice, acceptance click, autonomy/pressure, or legal review alone | Consent is uninformed, bundled, assumed, coerced, out of scope, expired, non-withdrawable where withdrawal is required, or otherwise invalid under the applicable decision |
| Recall | Delayed task-matched recall or recognition | Comprehension and decision quality | No universal stop threshold; escalate when product need is unmet or deception is remembered well |
| Decision quality and preference fit | Choice aligned with participant-stated goal and understood facts | Organization-preferred choice | Choice changes while understanding or preference fit worsens |
| Task and recovery success | Complete, correct, decline, defer, undo, cancel, and recover scenarios | Funnel completion alone | Supported safe path cannot be completed |
| Actual effort | Errors, time, backtracking, assistance, interruption recovery | Perceived ease | Meaningful subgroup burden or error rises without justified benefit |
| Perceived effort | Accessible self-report with context | Observed behavior | Large report/behavior conflict triggers inquiry, not erasure |
| Accessibility | Standards testing plus disabled-user and specialist evaluation | General usability average | Critical information or control lacks an equivalent accessible path |
| Trust calibration | Appropriate acceptance, rejection, verification, override, and recovery under true, false, and uncertain states | Trust rating or warmth | Overreliance or disuse creates material harm |
| Emotional appropriateness | Qualified review and affected-user research | Sentiment detection or assumed emotion | Shame, minimization, misplaced delight, or false reassurance in a high-consequence state |
| Autonomy and pressure | Decline/defer/exit behavior, perceived pressure, reasoned choice, cancellation and reversal | Conversion | Material choice becomes pressured, hidden, or asymmetric |
| Reversibility and regret | Actual undo/correction success, delayed reversal, regret, support contact | Immediate completion | Material reversal is unavailable, misrepresented, or inaccessible |
| Privacy and inference harm | Data-flow audit, consent or other valid route, inference audit, withdrawal/deletion test | Personalization lift | Prohibited inference, secondary use, or unapproved processing occurs |
| Locale and subgroup effects | Disaggregated outcomes with translation/context lineage and nonresponse | Pooled average | A material subgroup or locale harm is hidden by aggregation |
| Potential and observed harm | Predefined harm scenarios, adverse events, incident and safeguarding review | Absence of harm in a small sample | Nonwaivable harm occurs or stop threshold is reached |
| Safety | Safety-critical task and failure-mode testing, boundary and degraded-state checks, incident review, adverse-event monitoring, and qualified domain assessment | General task success, absence of observed harm, or business outcome | A safety-critical path fails, a nonwaivable safety condition is breached, or a high-consequence safety boundary remains unknown |
| Business outcome | Conversion, completion, retention, support load, cost | Every user and safety outcome above | Never a compensating pass; report separately |

## Claim-by-claim operational guide

The following records cover every registered claim from `CER-C001` through `CER-C031`. “May apply” means the record may generate a bounded question; it does not assert that the effect exists in the product or for an individual.

### CER-C001 — inattentional blindness is task-dependent

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C001`](psychology-claim-register.md#cer-c001--inattentional-blindness-is-task-dependent), canonical label `research finding`; source-register record `CE-S001`; strength `primary-bounded`, with no evaluated exact replication or disabled-user sample |
| When it may apply; when not | May frame a question when a critical, unexpected change competes with a demanding task. Do not use it to predict that a person missed content, set a universal visibility threshold, or certify one placement or animation. |
| Contextual inputs; surfaces and states | Exact task and attentional demand, expected versus unexpected event, consequence, timing, repetition, reading order, modality, distraction, and recovery. Candidate surfaces include commitment screens, errors, warnings, asynchronous status changes, interrupted flows, and monitoring views. |
| Safe; unsafe intervention | Safe: put a material state change near the affected object and action, state it explicitly, expose a durable recovery path, and use programmatic notification where applicable. Unsafe: hide it in peripheral content or claim salience guarantees notice. |
| Accessibility and localization | Test screen-reader announcement, focus, magnification, reflow, motion settings, and redundant nonvisual meaning. Do not transfer left-to-right visual-attention assumptions across scripts or locales. |
| Evaluation; escalation | Measure notice, factual comprehension, correct action, delayed recall, false alarms, and subgroup effects under realistic interruption. Escalate unknown materiality to the product/domain owner and critical access behavior to accessibility and safety owners. |
| Illustrative example; counterexample | Example: an expired quote is stated beside the total and next action and announced as a status. Counterexample: an optional nonmaterial tip may remain secondary; the claim does not require every detail to interrupt the task. |

### CER-C002 — F- and Z-shaped reading patterns are not universal laws

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C002`](psychology-claim-register.md#cer-c002--f--and-z-shaped-reading-patterns-are-not-universal-laws), canonical label `cross-source finding`; `CE-S002` and `CE-S003`; strength `cross-source-bounded`, based on dated desktop tasks with no primary universal Z-pattern evidence |
| When it may apply; when not | May motivate testing of hierarchy and scan behavior for a versioned layout. Do not reorder material content, infer reading sequence, or approve discoverability from an F/Z overlay. |
| Contextual inputs; surfaces and states | User goal, content type, responsive viewport, navigation structure, visual and DOM order, language/script/direction, device, familiarity, and assistive mode. Candidate surfaces include landing pages, search results, dashboards, comparison pages, and long-form instructions. |
| Safe; unsafe intervention | Safe: preserve logical order, make headings and link purpose explicit, and test the actual task. Unsafe: place required information only in a presumed hot zone or force a Z path over semantic order. |
| Accessibility and localization | Include keyboard order, landmarks, screen-reader sequence, reflow, zoom, low vision, right-to-left, vertical-script, and bidirectional cases; eye tracking is not an accessibility proxy. |
| Evaluation; escalation | Measure findability, correct route, comprehension, recovery, and false-positive clicks, with gaze only as an optional bounded measure. Escalate layout/DOM conflict to design and engineering and locale-direction questions to qualified reviewers. |
| Illustrative example; counterexample | Example: test whether Arabic and English users find cancellation in their actual responsive layouts. Counterexample: bounded eye-tracking evidence may inform one tested hierarchy without becoming a universal scan law. |

### CER-C003 — memory numbers do not set interface item counts

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C003`](psychology-claim-register.md#cer-c003--memory-numbers-do-not-set-interface-item-counts), canonical label `cross-source finding`; `CE-S004` and `CE-S005`; strength `cross-source-bounded`, foundational memory models with different tasks, controls, and chunk definitions |
| When it may apply; when not | May prompt review of avoidable recall, grouping, and cross-step context. Do not set menu, option, field, step, or word limits at four, seven, or any other universal number. |
| Contextual inputs; surfaces and states | Items that must be remembered, meaningful grouping, expertise, rehearsal, interruption, dependencies, information already known by the system, secrets that must not be redisplayed, and complete task demands. Candidate surfaces include navigation, comparisons, forms, recovery, authentication, and multistep setup. |
| Safe; unsafe intervention | Safe: keep needed context visible or recoverable, group by user meaning, and remove avoidable recall. Unsafe: delete required options, deepen navigation, or hide material facts to meet a magic count. |
| Accessibility and localization | Include cognitive disability, aging, fatigue, stress, literacy, numeracy, language, and learned grouping; never treat a pooled average as an individual capacity. Preserve secure alternatives when information cannot be displayed. |
| Evaluation; escalation | Measure comprehension, comparison error, time, backtracking, assistance, abandonment, recovery, and access-needs subgroups. Escalate secure-display limits to security and accessibility owners and necessary-option removal to the product owner. |
| Illustrative example; counterexample | Example: keep a generated case reference visible across recovery steps. Counterexample: a secret may remain hidden when redisplay creates security risk and a usable alternative and truthful explanation exist. |

### CER-C004 — extraneous demand can impair learning, but less is not always better

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C004`](psychology-claim-register.md#cer-c004--extraneous-cognitive-demand-can-impair-learning-but-less-is-not-always-better), canonical label `cross-source finding`; `CE-S006` and `CE-S038`; strength `cross-source-bounded`, with educational problem-solving and learning outcomes rather than product-flow proof |
| When it may apply; when not | May guide a test of demonstrably irrelevant decoration, incoherent sequencing, or avoidable search. Do not equate shorter copy or lower density with lower effort, or remove controlled facts and necessary explanation. |
| Contextual inputs; surfaces and states | Material information, prior knowledge, learning versus action goal, content roles, pacing, task complexity, next-step dependencies, search demand, and consequence of omission. Candidate surfaces include onboarding, instructions, help, disclosures, comparison, and error recovery. |
| Safe; unsafe intervention | Safe: remove irrelevant detail, connect dependent information, stage complexity, and retain all decision-critical content. Unsafe: conceal fees, conditions, safety information, eligibility, or recovery under “reduce cognitive load.” |
| Accessibility and localization | Explicit context may be essential for cognitive disability, unfamiliar users, and translated content; decorative media may add distraction. Test reading level and structure without treating either as a complete access model. |
| Evaluation; escalation | Compare complete variants for comprehension, error, transfer to the next step, search, recall where needed, and actual/perceived effort. Domain owners verify completeness; accessibility and locale owners review removal or staging. |
| Illustrative example; counterexample | Example: remove an unrelated promotional illustration from a safety instruction while retaining consequence and recovery. Counterexample: a concise legal summary does not permit omitting a material exception needed before consent. |

### CER-C005 — recognition support is useful only when cues are recognizable

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C005`](psychology-claim-register.md#cer-c005--recognition-support-is-useful-only-when-cues-are-recognizable), canonical label `inference`; `CE-S007`, `CE-S025`, and `CE-S048`; strength `inference-transfer-gap` combining a foundational laboratory task with bounded accessibility sources |
| When it may apply; when not | May prompt visible context, labels, examples, or alternatives to avoidable memory tests. Do not infer that an icon, picture, familiar-looking control, or object-recognition task is self-explanatory or universally easier. |
| Contextual inputs; surfaces and states | Prior exposure, label clarity, cue distinctiveness, number and similarity of alternatives, security constraints, visible prior values, accessible names, language, and first-time versus returning use. Candidate surfaces include navigation, multistep forms, authentication, recovery, and selection controls. |
| Safe; unsafe intervention | Safe: pair controls with meaningful labels, retain task context, support paste/password managers where permitted, and offer accurate alternatives. Unsafe: replace precise text with icon-only controls or weaken security from a memory slogan. |
| Accessibility and localization | Validate screen-reader names, speech input, magnification, cognitive access, symbols, language, script, literacy, and cultural familiarity. A visible cue may remain inaccessible or require recall. |
| Evaluation; escalation | Test identification, selection error, assistance, comprehension, confidence, and recovery with new and returning users. Authentication changes require security, identity, accessibility, and applicable conformance review. |
| Illustrative example; counterexample | Example: label a saved payment method with recognizable text and relevant last digits. Counterexample: an unlabeled star icon is not proven recognizable because participants remembered pictures in a laboratory study. |

### CER-C006 — expert and novice mental models can differ

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C006`](psychology-claim-register.md#cer-c006--expert-and-novice-mental-models-can-organize-the-same-material-differently), canonical label `research finding`; `CE-S008`; strength `primary-bounded`, from one technical domain and era with no product-domain replication |
| When it may apply; when not | May justify researching different concept organizations among new, occasional, expert, and support users. Do not type an individual as novice/expert, infer competence, or simplify consequential information from a role label. |
| Contextual inputs; surfaces and states | Actual concepts and relationships, user goal, terminology familiarity, domain training, internal versus user taxonomy, task frequency, errors, and handoffs. Candidate surfaces include navigation, setup, complex forms, admin tools, help, and support content. |
| Safe; unsafe intervention | Safe: bridge user language to underlying concepts, preserve required expert terms, and support multiple valid routes where evidence warrants. Unsafe: expose only internal system structure or stereotype all newcomers as incapable. |
| Accessibility and localization | Expertise intersects with language, disability, literacy, profession, and local practice. Keep acronyms, aliases, and translated terms explicit; ensure navigation works without specialist vocabulary. |
| Evaluation; escalation | Use card sorting, concept mapping, interviews, and task tests; retain divergent models rather than averaging. Terminology and ontology owners decide controlled meanings; locale experts and accessibility owners review expressions and routes. |
| Illustrative example; counterexample | Example: connect “money received” to the controlled settlement concept in help and status content. Counterexample: an expert-facing diagnostic console may appropriately retain precise domain terms with explanations. |

### CER-C007 — information scent is a model, not proof that a label works

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C007`](psychology-claim-register.md#cer-c007--information-scent-is-a-model-not-proof-that-a-label-works), canonical label `inference`; `CE-S009`; strength `inference-transfer-gap`, based on a foundational information-foraging model rather than validation of any literal |
| When it may apply; when not | May frame whether a cue communicates destination, object, and expected result for a declared goal. Do not call clickthrough proof of adequate scent or use curiosity gaps and misleading promises to raise clicks. |
| Contextual inputs; surfaces and states | User goal, domain vocabulary, competing paths, destination content, cost of a wrong route, information value, backtracking, language, and navigation structure. Candidate surfaces include menus, links, search results, cards, notifications, and help indexes. |
| Safe; unsafe intervention | Safe: name the object and outcome, keep destination consistent, and provide recovery. Unsafe: vague “Learn more” where alternatives differ materially, or a label that promises a result the destination cannot provide. |
| Accessibility and localization | Link purpose, headings, landmarks, accessible names, reading order, and multiple navigation methods must agree. Metaphors and category terms need locale-specific evidence. |
| Evaluation; escalation | Run first-click plus end-to-end tasks; measure correct route, comprehension, recovery, false-positive clicks, and abandonment. Product/IA owners resolve destination structure; terminology and locale owners resolve labels. |
| Illustrative example; counterexample | Example: “Compare repayment options” opens the stated comparison. Counterexample: a high first-click rate on “Unlock savings” does not establish findability if users reach an ineligible or unrelated offer. |

### CER-C008 — choice overload is conditional

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C008`](psychology-claim-register.md#cer-c008--choice-overload-is-conditional-fewer-choices-are-not-inherently-better), canonical label `cross-source finding`; `CE-S010`, `CE-S011`, and `CE-S012`; strength `cross-source-bounded`, retaining a near-zero meta-analytic mean, heterogeneity, and moderators |
| When it may apply; when not | May prompt review of differentiation, redundancy, dependency, comparison support, uncertainty, and decision goals. Do not decide from option count or remove choices because fewer converts better. |
| Contextual inputs; surfaces and states | Supported option model, eligibility, material differentiators, user goals, preference certainty, stakes, dominance, grouping, filters, defaults, reversibility, and omitted alternatives. Candidate surfaces include plan, consent, privacy, configuration, recovery, and marketplace selection. |
| Safe; unsafe intervention | Safe: improve labels, grouping, comparison, and progressive disclosure while retaining necessary control. Unsafe: bury a supported decline or accessible alternative, or impose a universal maximum. |
| Accessibility and localization | Some users need reduced search; others need choices that reflect access, language, payment, or support needs. Validate translation length, category fit, keyboard/screen-reader comparison, and local market availability. |
| Evaluation; escalation | Measure informed choice, comprehension, comparison error, time, confidence, reversal, regret, assistance, and subgroup/locale outcomes. Product owners validate supported options; research, accessibility, and ethics/risk review material steering. |
| Illustrative example; counterexample | Example: group twelve distinct plans by user-relevant attributes and preserve comparison. Counterexample: reducing twelve necessary access settings to three bundles may lower clicks while removing control. |

### CER-C009 — goal-gradient effects are bounded

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C009`](psychology-claim-register.md#cer-c009--goal-gradient-effects-are-bounded-to-salient-progress-toward-a-valued-goal), canonical label `product hypothesis`; `CE-S013`; strength `primary-bounded`, from reward programs and without general product or ethics validation |
| When it may apply; when not | May support a hypothesis about accurate progress toward a user-chosen, valued goal. Do not assume every progress bar motivates, invent progress, or use near-completion pressure for consent, spending, data disclosure, or an involuntary task. |
| Contextual inputs; surfaces and states | User goal and ability to stop, true completed and remaining work, conditional stages, denominator, outcome versus form progress, interruption, expiry, correction, reward, organizational incentive, and material consequence. Candidate surfaces include applications, onboarding, setup, learning, loyalty, and recovery. |
| Safe; unsafe intervention | Safe: show truthful scoped progress and remaining work with pause, exit, and correction. Unsafe: omit review steps, add hidden stages, imply approval probability, or manufacture endowed progress. |
| Accessibility and localization | Provide text-equivalent status, understandable units, noncolor cues, controllable motion, and no time-pressure assumption. Number and progress conventions need localization. |
| Evaluation; escalation | Compare accurate progress with no indicator; measure comprehension, task success, pressure, abandonment, error, interruption recovery, and control. Fact/data owner validates denominator; high-stakes progress needs product, accessibility, research, and risk review. |
| Illustrative example; counterexample | Example: “Step 3 of 4 in this form; review follows” when both scopes are true. Counterexample: an indeterminate upload accurately labelled “Uploading” is not false merely because it lacks a percentage. |

### CER-C010 — feedback can improve or reduce performance

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C010`](psychology-claim-register.md#cer-c010--feedback-can-improve-or-reduce-performance), canonical label `research finding`; `CE-S014`; strength `synthesis-bounded`, with heterogeneous tasks and more than one-third of interventions reducing performance |
| When it may apply; when not | May frame whether feedback is timely, specific, actionable, and focused on the task. Do not assume more, faster, redder, public, comparative, or more negative feedback improves behavior. |
| Contextual inputs; surfaces and states | Exact behavior and consequence, error source, actionability, timing, frequency, persistence, public/private context, authority relationship, correction path, and user goal. Candidate surfaces include validation, error, status, coaching, moderation, support, and performance dashboards. |
| Safe; unsafe intervention | Safe: state what happened, why it matters, and the supported next step without blame. Unsafe: shame, vague failure, repeated alerts, public ranking, or feedback with no recovery. |
| Accessibility and localization | Ensure perceivable persistent status, noncolor meaning, accessible focus/announcement, usable timing, and directness appropriate to locale without hiding the fact. Avoid idioms and face-threatening generalizations. |
| Evaluation; escalation | Measure corrected performance, repeat error, comprehension, help-seeking, stress, alert burden, and subgroup effects. Product/domain owner confirms facts and recovery; accessibility and locale reviewers assess delivery; safeguarding/HR routes apply to people evaluation. |
| Illustrative example; counterexample | Example: “Two fields need attention” with each issue identified and editable. Counterexample: a neutral confirmation need not become more negative because feedback has a positive mean effect. |

### CER-C011 — peak-and-end weighting is not a universal journey rule

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C011`](psychology-claim-register.md#cer-c011--peak-and-end-weighting-is-not-a-universal-journey-rule), canonical label `research finding`; `CE-S015`; strength `primary-bounded`, from one aversive laboratory task rather than a product-journey formula |
| When it may apply; when not | May remind a team to evaluate the end state alongside the whole journey. Do not intentionally worsen or prolong an experience, discount cumulative burden, or claim a pleasant ending repairs prior harm. |
| Contextual inputs; surfaces and states | Full journey duration, momentary burden, worst state, end state, outcome confirmation, prior errors, reversibility, delayed consequences, return/support behavior, and affected actors. Candidate surfaces include onboarding completion, checkout confirmation, cancellation, recovery, claims, and support resolution. |
| Safe; unsafe intervention | Safe: truthfully confirm outcome, next steps, recovery, and support while improving earlier harmful steps. Unsafe: add friction or distress because the final moment scores well, or celebrate an unresolved outcome. |
| Accessibility and localization | Pain, fatigue, trauma, cognitive disability, language, and cultural expectations may alter experience and retrospective report. Ensure confirmation and support work across modalities and do not rely on celebratory affect. |
| Evaluation; escalation | Measure momentary experience, total burden, task success, errors, delayed recall, trust, support demand, and return behavior. High-consequence journeys need affected-user, domain, accessibility, ethics/risk, and safeguarding review. |
| Illustrative example; counterexample | Example: a cancellation confirmation states the effective date and restoration path after a low-friction journey. Counterexample: a warm closing cannot offset hidden fees or an obstructive cancellation path. |

### CER-C012 — aesthetics can bias perceived usability without improving performance

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C012`](psychology-claim-register.md#cer-c012--aesthetic-appeal-can-bias-perceived-usability-without-improving-performance), canonical label `cross-source finding`; `CE-S016` and `CE-S017`; strength `cross-source-bounded`, separating subjective perception from task performance |
| When it may apply; when not | May require perceived ease, visual appeal, and objective performance to be measured independently. Do not treat polish, delight, preference, or a usability rating as proof of comprehension, accessibility, trustworthiness, or task success. |
| Contextual inputs; surfaces and states | Visual system, hierarchy, contrast, motion, actual task, prior use, consequence, error states, performance data, perceived ease, device, and audience. Candidate surfaces include dashboards, financial or health choices, onboarding, mobile controls, and high-trust flows. |
| Safe; unsafe intervention | Safe: improve clarity and emotional fit while preserving hierarchy, exact facts, and task performance. Unsafe: mask ambiguity, unavailable actions, poor contrast, or false confidence with visual polish. |
| Accessibility and localization | Include contrast, zoom, reflow, motion, color vision, screen modes, cognitive access, and culturally variable aesthetics. Disabled-user task evidence cannot be replaced by general preference scores. |
| Evaluation; escalation | Run balanced comparisons with errors, time, comprehension, accessibility, perceived ease, and calibrated reliance. Escalate conflicts between polish and operability to design/accessibility owners and material trust claims to product/domain owners. |
| Illustrative example; counterexample | Example: a polished transfer form is tested for amount comprehension and error correction. Counterexample: a visually plain but accessible high-performing form is not inferior solely on an aesthetics rating. |

### CER-C013 — acute-stress effects are heterogeneous

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C013`](psychology-claim-register.md#cer-c013--acute-stress-can-affect-executive-function-but-effects-are-heterogeneous), canonical label `research finding`; `CE-S018`; strength `synthesis-bounded`, based on laboratory stressors and inconsistent function-specific effects |
| When it may apply; when not | May prompt protective clarity when an observable service state is plausibly high pressure, such as an outage, decline, emergency, bereavement, or time-critical recovery. Do not diagnose stress, infer capacity, or reduce agency for an individual. |
| Contextual inputs; surfaces and states | Observable event, real consequence and deadline, uncertainty, required action, safe delay, support, recovery, information persistence, represented-population evidence, and ethical research constraints. |
| Safe; unsafe intervention | Safe: state the situation, consequence, next step, timing, and recovery plainly; keep information available and allow help. Unsafe: exploit urgency, narrow supported choices without authority, use fear, or provide false reassurance. |
| Accessibility and localization | Consider cognitive disability, trauma, anxiety, pain, fatigue, literacy, translation, culturally variable stress expression, timing accommodations, and human support. Never create a “stressed user” segment from proxies. |
| Evaluation; escalation | Use ethically designed realistic scenarios; measure comprehension, error, time pressure, recovery, perceived pressure, and adverse events. Route high-risk states to domain/safety, accessibility, research/ethics, locale, and safeguarding owners. |
| Illustrative example; counterexample | Example: an outage message states what is unavailable, what is safe, and when to check again. Counterexample: a routine optional setting does not need crisis-style simplification because stress effects exist in laboratories. |

### CER-C014 — appropriate reliance, not maximum trust, is the target for automation

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C014`](psychology-claim-register.md#cer-c014--appropriate-reliance-not-maximum-trust-is-the-design-target-for-automation), canonical label `inference`; `CE-S019`; strength `inference-transfer-gap`, from a foundational review predating current generative AI |
| When it may apply; when not | May guide disclosure of capability, limits, uncertainty, provenance, verification, override, and recovery. Do not optimize trust, warmth, acceptance, or anthropomorphism without measuring whether reliance is correct. |
| Contextual inputs; surfaces and states | Actual system capability and error modes, confidence validity, task risk, human verification, alternatives, reversibility, time pressure, data provenance, accountability, and escalation. Candidate surfaces include AI suggestions, automated decisions, moderation, diagnostics, and copilots. |
| Safe; unsafe intervention | Safe: say what the system did, what it used, material limits, what needs checking, and how to override or recover. Unsafe: overconfident certainty, human-like authority, hidden automation, or alarmism that drives blanket rejection. |
| Accessibility and localization | Explanations, uncertainty, controls, and alternatives must be understandable across access needs and languages. Local institutional trust and authority conventions cannot be assumed. |
| Evaluation; escalation | Compare stated confidence and user reliance with actual accuracy under true, false, and uncertain states; measure appropriate acceptance/rejection, verification, override, and recovery. System-capability, domain-risk, safety/security, accessibility, policy, and research owners review material use. |
| Illustrative example; counterexample | Example: an AI draft is labelled as unverified with cited inputs and an editable review step. Counterexample: increasing a trust rating is not a success if users accept more incorrect recommendations. |

### CER-C015 — social proof and credible-source effects are conditional

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C015`](psychology-claim-register.md#cer-c015--social-proof-and-credible-source-effects-are-conditional), canonical label `cross-source finding`; `CE-S020`, `CE-S021`, and `CE-S049`; strength `cross-source-bounded`, from two low-stakes norm field contexts plus a systematic review/meta-analysis of credible-source effects on performed behavior |
| When it may apply; when not | May support review of a verified, relevant norm statistic or accurately scoped credential that helps a current decision. Do not invent counts or expertise, cherry-pick a group, imply recommendation or jurisdictional authority, or assume a positive behavioral direction. |
| Contextual inputs; surfaces and states | Exact proposition, population, denominator, event, time window, locale, baseline behavior, reference-group relevance, source identity, expertise/trustworthiness in the exact domain, credential/applicability evidence, delivery mode, exclusions, data source, expiry, user value, organizational incentive, stakes, and decline path. Candidate surfaces include comparisons, conservation feedback, expert guidance, onboarding, and purchase decisions. |
| Safe; unsafe intervention | Safe: present a current bounded statistic or credential neutrally, explain its basis and limitations, retain material evidence, and preserve nonconformity. Unsafe: “most people choose this” or “experts recommend this” without exact support, or any authority pressure in consent, financial, health, legal, or safety decisions. |
| Accessibility and localization | Explain numbers, denominators, credentials, scope, and time periods in accessible language and formats. Group identity, institutional trust, privacy, authority, and norm meaning require local review and may create stereotype or deference harm. |
| Evaluation; escalation | Verify provenance, credentials, and applicability; measure comprehension, pressure, calibrated trust, both-direction behavior, and outcomes among people already doing the target behavior. Fact/data, domain/source, research, privacy, accessibility, locale, ethics/risk, and applicable legal owners review. |
| Illustrative example; counterexample | Example: a current energy comparison names the household set and period and offers explanation; a medical source is named only for advice within that source's verified domain. Counterexample: a truthful aggregate service-status count unrelated to a material choice is not automatically manipulative, and a title alone does not establish recommendation or applicability. |

### CER-C016 — argument quality does not define a fixed persuasion-route persona

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C016`](psychology-claim-register.md#cer-c016--argument-quality-matters-more-under-some-elaboration-conditions-not-for-a-fixed-route-persona), canonical label `research finding`; `CE-S022`; strength `synthesis-bounded`, with methodological moderators and no stable person type |
| When it may apply; when not | May support clear material reasons, evidence, and time to deliberate. Do not classify a person as a central/peripheral processor or replace reasons with emotion, scarcity, or authority because analytics suggest low engagement. |
| Contextual inputs; surfaces and states | Decision stakes, material facts, evidence quality, prior knowledge, time, literacy, attention constraints, alternatives, source credibility, comprehension need, and organizational incentive. Candidate surfaces include consent, plan choice, financial/health information, policy explanation, and recommendations. |
| Safe; unsafe intervention | Safe: make evidence understandable, show limitations and alternatives, and support review. Unsafe: withhold substantive facts, use weak claims, or target emotional shortcuts based on a proxy. |
| Accessibility and localization | Provide accessible evidence, controllable pacing, plain explanations without deleting precision, translation lineage, and locally credible sources. Ability constraints do not prove low motivation. |
| Evaluation; escalation | Measure argument comprehension, evidence recall, reasoned preference, delayed stability, pressure, and access-needs outcomes. Controlled-claim owners and domain/legal reviewers validate facts; research, accessibility, and locale owners validate presentation. |
| Illustrative example; counterexample | Example: a plan recommendation shows eligibility, tradeoffs, evidence, and how to choose differently. Counterexample: a short summary may be appropriate if full material evidence remains accessible before action. |

### CER-C017 — defaults influence decisions and require separate ethical review

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C017`](psychology-claim-register.md#cer-c017--defaults-influence-decisions-but-vary-and-require-separate-ethical-review), canonical label `research finding`; `CE-S023` and `CE-S024`; strength `synthesis-bounded`, with heterogeneous, null, and negative effects and no ethical permission from effectiveness. `CE-S024` is part of, and is not independent from, the broader defaults literature synthesized by `CE-S023`. |
| When it may apply; when not | May frame a review when the system preselects, inherits, recommends, or preserves an option. Do not default consent, privacy, financial, medical, legal, eligibility, or rights choices merely to increase uptake. |
| Contextual inputs; surfaces and states | Exact option and consequence, materiality, saved preference source, beneficiary, preference evidence, endorsement implication, visibility, active change, pre/post-commit reversibility, stakes, jurisdiction, and alternatives. Candidate surfaces include checkout, subscriptions, consent, settings, enrollment, and security. |
| Safe; unsafe intervention | Safe: a visible, justified, reversible default aligned to explicit preference or protective policy with accessible explanation. Unsafe: silent paid renewal, data sharing, or material enrollment. |
| Accessibility and localization | Defaults may reduce interaction burden but can hide choice. Ensure labels, consequences, focus, review, and change controls are accessible; consent and institutional norms require locale/legal review. |
| Evaluation; escalation | Measure informed preference fit, comprehension, active changes, later reversal, regret, subgroup harm, and support burden. Product, research, accessibility, privacy, policy/legal, ethics/risk, and domain owners decide material defaults. |
| Illustrative example; counterexample | Example: a saved display preference is visibly restored and easily changed without material consequence. Counterexample: a protective security default is not automatically manipulation if accurate costs and permitted opt-out are clear. |

### CER-C018 — reversibility and confirmation are scoped protections

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C018`](psychology-claim-register.md#cer-c018--reversibility-and-confirmation-are-scoped-protections-not-decorative-reassurance), canonical label `sourced fact`; `CE-S025`; strength `normative-instrument-bounded` for WCAG 2.2 Success Criterion 3.3.4, with applicability and conformance unestablished |
| When it may apply; when not | May apply to covered legal, financial, data-modifying, and test-response web submissions at the applicable conformance level. Do not universalize the criterion or claim conformance from copy alone. |
| Contextual inputs; surfaces and states | Submission type, exact criterion scope and exceptions, jurisdiction/policy target, editable data, checking/correction, review/confirmation, actual undo, persistence, timing, accessible names/states, and recovery. |
| Safe; unsafe intervention | Safe: accurately explain consequence and the real review, correction, or reversal mechanism. Unsafe: “You can change this later” when the capability is absent, time-limited without disclosure, or inaccessible. |
| Accessibility and localization | Test the complete mechanism with keyboard, screen reader, zoom/reflow, cognitive access, error identification, and localized legal/financial meaning. WCAG conformance is not proof of lived usability. |
| Evaluation; escalation | Perform criterion-specific conformance testing plus complete-task recovery evaluation. Accessibility owner determines criterion interpretation; product/engineering verify behavior; legal/policy/domain owners determine separate applicability and meaning. |
| Illustrative example; counterexample | Example: a transfer review shows recipient and amount and allows correction before submission. Counterexample: a post-transaction receipt is not an undo mechanism merely because it restates the action. |

### CER-C019 — habit formation is variable; simple loops and fixed-day rules are unsupported

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C019`](psychology-claim-register.md#cer-c019--habit-formation-is-variable-simple-loops-and-fixed-day-rules-are-unsupported), canonical label `cross-source finding`; `CE-S026` and `CE-S027`; strength `cross-source-bounded`, with wide trajectories and no validated commercial three-stage loop |
| When it may apply; when not | May inform a user-requested routine with stable context, adjustable cues, and long-term evaluation. Do not promise 21 or 66 days, infer a healthy habit from repetition, or engineer compulsion and punitive retention. |
| Contextual inputs; surfaces and states | Self-declared goal, behavior complexity, cue source, frequency, context stability, reward, pause/opt-out, missed-day recovery, notification burden, adverse-use risk, organizational incentive, and longitudinal outcome. Candidate surfaces include reminders, streaks, learning, wellness, finance, and re-engagement. |
| Safe; unsafe intervention | Safe: adjustable reminders, easy pause, nonpunitive recovery, and honest progress for a chosen goal. Unsafe: shame, status loss, FOMO, escalating prompts, or vulnerability-targeted messages. |
| Accessibility and localization | Episodic disability, executive-function variability, caregiving, access limitations, schedules, and cultural routines make streak assumptions exclusionary. Localize timing and permit multiple modalities and quiet periods. |
| Evaluation; escalation | Measure sustained user-valued outcome, burden, opt-out, adverse use, subgroup effects, automaticity only with a valid method, and persistence after prompts stop. Product, research, privacy, accessibility, ethics/well-being, locale, and safeguarding owners review. |
| Illustrative example; counterexample | Example: a user schedules a medication reminder that can be paused without penalty under clinical review. Counterexample: not every recurring service reminder is a habit loop when it communicates a real due event neutrally. |

### CER-C020 — observer and demand effects are heterogeneous

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C020`](psychology-claim-register.md#cer-c020--the-hawthorne-effect-is-not-one-stable-observer-effect-constant), canonical label `cross-source finding`; `CE-S028` and `CE-S029`; strength `cross-source-bounded`, combining a heterogeneous systematic review with a theory/model |
| When it may apply; when not | May require documentation of researcher presence, demand cues, repeated measurement, social desirability, and facilitator relationship. Do not apply a universal correction or discard self-report because participants knew they were studied. |
| Contextual inputs; surfaces and states | Study purpose and disclosure, moderator relationship, script, praise/prompts, observation and recording, repeated tasks, setting, incentives, accommodations, deviations, behavioral logs, and delayed outcomes. Applies to research sessions rather than a content surface alone. |
| Safe; unsafe intervention | Safe: neutral questions, retained limitations, ethical comparison conditions, blinded coding where feasible, and report/behavior separation. Unsafe: leading prompts, coaching “correct” actions, or labeling all disagreement as reactivity. |
| Accessibility and localization | Accommodations, fatigue, assistive setup, interpreter presence, deference, face, privacy, and authority norms can affect both experience and measurement; record rather than erase them. |
| Evaluation; escalation | Triangulate moderated and unmoderated tasks, interviews, behavioral evidence, delayed outcomes, and independent coding. Research-method owner approves design; accessibility, locale, ethics/privacy, and affected-user routes review participation conditions. |
| Illustrative example; counterexample | Example: record that the moderator authored the copy and compare a neutral unmoderated task. Counterexample: observed behavior is not invalid merely because a researcher was present. |

### CER-C021 — color effects are contextual and color cannot be the sole semantic cue

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C021`](psychology-claim-register.md#cer-c021--color-effects-are-contextual-and-color-cannot-be-the-sole-semantic-cue), canonical label `cross-source finding`; `CE-S025`, `CE-S030`, and `CE-S031`; strength `risk-triangulation-bounded`, separating context-sensitive research from a scoped normative accessibility requirement |
| When it may apply; when not | May guide redundant state signaling and local testing of a color system. Do not assign universal emotion, trust, danger, competence, or behavior to a hue or infer an individual's state from response. |
| Contextual inputs; surfaces and states | Intended semantic role, hue/saturation/brightness, contrast, ambient/display modes, learned system convention, task, state, noncolor equivalent, locale meaning, and color-vision variation. Candidate surfaces include errors, success, selection, risk, charts, status, and alerts. |
| Safe; unsafe intervention | Safe: use color with text, icon, pattern, position, and programmatic state as appropriate. Unsafe: red-only errors, green-only success, or “blue creates trust” as a decision rationale. |
| Accessibility and localization | Test contrast, color-vision conditions, forced colors, dark mode, magnification, screen readers, and noncolor identification. Political, religious, institutional, and cultural meanings require local review. |
| Evaluation; escalation | Measure state identification, task performance, errors, contrast, noncolor access, and local interpretation rather than emotion alone. Accessibility owner assesses criterion scope; design-system and locale owners approve meanings within their domains. |
| Illustrative example; counterexample | Example: an error uses a heading, icon, field relationship, text, and color. Counterexample: a consistent green token may be valid inside a tested system without proving green universally means success. |

### CER-C022 — cognitive-access guidance is supplemental and needs disabled-user validation

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C022`](psychology-claim-register.md#cer-c022--cognitive-access-guidance-is-supplemental-and-needs-disabled-user-validation), canonical label `sourced fact`; `CE-S048` and `CE-S025`; strength `official-guidance-bounded` plus `normative-instrument-bounded`, with COGA explicitly supplemental and separate from WCAG conformance |
| When it may apply; when not | May supply candidate patterns for clear purpose, familiar structure, understandable content, memory support, focus, help, and recovery. Do not present COGA as a conformance requirement or claim universal accessibility without affected-user evidence. |
| Contextual inputs; surfaces and states | Relevant access needs, task, language, literacy, distraction, memory demand, error consequence, help, adaptation, complete journey, applicable WCAG criteria, and accommodation needs. Applies across forms, navigation, authentication, errors, support, and complex decisions. |
| Safe; unsafe intervention | Safe: co-design a complete path, keep purpose and recovery explicit, and test patterns as candidates. Unsafe: use a cognitive-disability persona as proof or reduce content to a reading score while behavior remains inaccessible. |
| Accessibility and localization | Recruit by access need, provide accommodations, retain divergent results, and validate “clear,” “familiar,” literal, concise, and supportive language in each locale; translation alone is insufficient. |
| Evaluation; escalation | Combine applicable standards checks with complete-task disabled-user research, assistance, error recovery, and adverse-event evidence. Accessibility owner and affected users lead; locale, product, research, and domain owners support. |
| Illustrative example; counterexample | Example: a recovery flow preserves entered data, labels the problem, and offers human help where supported. Counterexample: following a COGA pattern does not by itself establish WCAG conformance or usability. |

### CER-C023 — shape and sound-shape effects are aggregate, not universal semantics

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C023`](psychology-claim-register.md#cer-c023--shape-preferences-and-sound-shape-correspondences-are-reliable-in-aggregate-not-universal-semantics), canonical label `cross-source finding`; `CE-S032`, `CE-S033`, and `CE-S034`; strength `cross-source-bounded`, with material task, phonology, language, and sample variation |
| When it may apply; when not | May support a bounded hypothesis about preference or identification for a tested stimulus set. Do not infer friendliness, danger, trust, personality, or universal meaning from curvature or bouba/kiki correspondence. |
| Contextual inputs; surfaces and states | Exact shape, label, task, presentation time, expertise, forced-choice effects, phonology/phonotactics, language, script, culture, convention, device, tactile/programmatic equivalents, and consequence. Candidate surfaces include icons, controls, diagrams, brands, and state indicators. |
| Safe; unsafe intervention | Safe: use conventional tested shapes with labels and redundant cues. Unsafe: shape-only critical states, universal affect claims, or naming based on an aggregate correspondence without local evidence. |
| Accessibility and localization | Test text, tactile, programmatic, contrast, and nonvisual equivalents; include target languages/scripts and avoid assuming forced-choice findings transfer to open interpretation. |
| Evaluation; escalation | Measure label-shape identification, selection error, preference separately, accessibility, and locale differences. Design-system, accessibility, terminology, brand, and qualified locale/culture owners review scoped uses. |
| Illustrative example; counterexample | Example: a warning icon is paired with an explicit label and programmatic status. Counterexample: rounded controls can be a consistent visual style without claiming they make every culture feel safe. |

### CER-C024 — speech and reading have no universal comprehension winner

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C024`](psychology-claim-register.md#cer-c024--speech-and-reading-have-no-universal-comprehension-winner), canonical label `cross-source finding`; `CE-S035`, `CE-S036`, and `CE-S039`; strength `cross-source-bounded`, with null overall differences and pacing/material moderators |
| When it may apply; when not | May guide comparison of speech, text, and combined modes for the exact task and environment. Do not remove text, captions, transcripts, audio, or user control because one modality is described as natural or superior. |
| Contextual inputs; surfaces and states | Task, material length and complexity, pacing, persistence, review need, privacy, interruption, hearing, vision, literacy, language, accent, device, environment, and alternative modalities. Candidate surfaces include voice UI, tutorials, support, warnings, media, and agent responses. |
| Safe; unsafe intervention | Safe: equivalent accessible modes, playback/pacing control, captions/transcripts, persistent text, and modality appropriate to context. Unsafe: voice-only material terms or unreviewable audio in a noisy/private setting. |
| Accessibility and localization | Include deaf, hard-of-hearing, blind, low-vision, cognitive-access, literacy, screen-reader, speech-rate, accent, translation, and signed-language needs. Equivalence concerns meaning, not literal duplication alone. |
| Evaluation; escalation | Test comprehension, navigation, retention where needed, time, interruption recovery, privacy, preference, and access-needs performance. Accessibility, localization, channel, privacy, and product owners decide the supported modes. |
| Illustrative example; counterexample | Example: an audio explanation includes synchronized captions, transcript, and pace control. Counterexample: speech may be the appropriate primary mode while a complete text alternative remains available. |

### CER-C025 — dual coding does not mean any visual improves understanding

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C025`](psychology-claim-register.md#cer-c025--dual-coding-does-not-mean-any-visual-improves-understanding), canonical label `cross-source finding`; `CE-S037`, `CE-S038`, and `CE-S039`; strength `synthesis-bounded`, across educational multimedia tasks with small/moderated benefits and harms from irrelevant detail |
| When it may apply; when not | May support a hypothesis that a task-relevant, integrated representation helps comprehension or transfer. Do not add decoration, icons, images, narration, or motion merely to claim dual coding or visual superiority. |
| Contextual inputs; surfaces and states | Information role, relevance, text-picture relation, integration signal, prior knowledge, pacing, duration, dynamism, redundancy, search demand, learning/task objective, and accessible equivalent. Candidate surfaces include instructions, diagrams, education, onboarding, data explanation, and complex recovery. |
| Safe; unsafe intervention | Safe: use a visual that carries or clarifies required meaning, connect it explicitly to text, and preserve accessible alternatives. Unsafe: stock imagery, contradictory modality order, or replacing controlled text with ambiguity. |
| Accessibility and localization | Meaningful visuals need equivalent text or tactile/programmatic representation; audio/text/image sequences must not overload or conflict. Diagram conventions and narration require language and culture review. |
| Evaluation; escalation | Compare relevant, irrelevant, text-only, and equivalent-modal variants for comprehension, transfer, search, effort, and accessibility. Content, instructional/domain, design, accessibility, and locale owners review meaning and alternatives. |
| Illustrative example; counterexample | Example: a labelled diagram shows which part to replace and a text procedure conveys the same operation. Counterexample: a decorative photo may be harmless when noninterfering, but it cannot be credited with improved understanding without evidence. |

### CER-C026 — the 60,000-times visual-processing claim is unsupported

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C026`](psychology-claim-register.md#cer-c026--the-60000-times-faster-visual-processing-claim-is-unsupported), canonical label `open question`; `CE-S040`; strength `provenance-gap-hard-abstention`, because the registered rapid-image study contains no text comparison, common unit, or 60,000 multiplier |
| When it may apply; when not | Applies as a source-hygiene stop when the ratio is stated or used as rationale. Do not treat the missing source as evidence that visuals are ineffective or use it to prohibit a bounded product comparison. |
| Contextual inputs; surfaces and states | Exact claimed source, modalities, unit of speed, sample, task, image and text complexity, comprehension outcome, replication, accessibility equivalence, and intended product decision. Any surface or rationale can carry the myth. |
| Safe; unsafe intervention | Safe: remove the ratio, retain the provenance gap, and describe only a genuinely relevant bounded finding. Unsafe: publish, lint, rank, remove labels, or replace text because the brain allegedly processes visuals 60,000 times faster. |
| Accessibility and localization | The myth can devalue precise, searchable, translatable text and exclude blind, low-vision, or image-processing-disabled users; reading systems and literacy make the comparison underspecified. |
| Evaluation; escalation | First resolve provenance. Any remaining product hypothesis needs an equivalent-format comprehension and task study; research-method and accessibility owners review. No product intervention is authorized from the ratio. |
| Illustrative example; counterexample | Example: reject “icons need no labels because visuals are 60,000× faster.” Counterexample: a tested diagram may improve one maintenance task without validating the ratio or removing text alternatives. |

### CER-C027 — neural coupling is not a copywriting formula

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C027`](psychology-claim-register.md#cer-c027--neural-coupling-is-associated-with-comprehension-not-a-copywriting-formula), canonical label `research finding`; `CE-S041`; strength `primary-bounded`, from one speaker and 11 listeners with an association rather than a writing intervention |
| When it may apply; when not | May be cited only as a bounded communication study. Do not score strings for brain synchrony, infer mental state, claim a technique causes coupling, or treat neuroimaging as a product-quality outcome. |
| Contextual inputs; surfaces and states | Exact causal question, language, narrative, sample, behavioral comprehension, privacy, data sensitivity, scanner/task limits, alternative explanations, preregistration, and independent outcomes. No ordinary content surface requires a neural metric. |
| Safe; unsafe intervention | Safe: evaluate comprehension and task success directly. Unsafe: neuromarketing claims, pseudoscientific copy scores, biometric personalization, or “neurologically proven” messaging. |
| Accessibility and localization | The narrow neurotypical spoken-story evidence does not represent deaf, hard-of-hearing, neurodivergent, aphasic, translated, signed, captioned, or assistive-mediated communication. |
| Evaluation; escalation | No product study is authorized from this evidence. Any proposed neuroscience study requires research ethics, privacy/data governance, specialist methods, accessibility, preregistration, and independent behavioral outcomes. |
| Illustrative example; counterexample | Example: use teach-back to evaluate whether a support explanation is understood. Counterexample: a bounded neuroscience study can investigate a mechanism without becoming a copywriting prescription. |

### CER-C028 — scarcity evidence does not supply product permission

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C028`](psychology-claim-register.md#cer-c028--scarcity-can-affect-perceived-value-permission-and-policy-are-separate), canonical label `cross-source finding`; `CE-S042`, `CE-S044`, `CE-S045`, and `CE-S046`; strength `risk-triangulation-bounded`, with older value research and separate experimental, official, and normative risk boundaries; the no-fabrication rule below is a proposed internal policy, not a universal legal conclusion |
| When it may apply; when not | May permit a verified material constraint that a person needs to decide. Never invent low stock, countdowns, demand, exclusivity, expiry, or urgency; perceived value does not establish benefit, consent, or ethics. |
| Contextual inputs; surfaces and states | Source-of-truth, quantity or event denominator, inventory/capacity scope, timezone, refresh, stale behavior, expiry, consequence at zero, user relevance, alternative, time needed for access, stakes, jurisdiction, and organizational incentive. Candidate surfaces include purchase, booking, applications, security timeouts, and service capacity. |
| Safe; unsafe intervention | Safe: state a current constraint with scope and update behavior, sufficient time, and alternatives. Unsafe: reset timers, static “only 2 left,” fabricated demand, or hiding the basis. |
| Accessibility and localization | Timers and pressure can exclude users needing translation, assistance, motor/cognitive access, or more time. Local consumer law, number/time formats, and economic context require review. |
| Evaluation; escalation | Verify source and expiry; test comprehension, pressure, regret, accessibility, subgroup harm, stale/error states, and applicable law. Fact/data, product, accessibility, research, ethics/risk, and legal/compliance owners review. |
| Illustrative example; counterexample | Example: a real application deadline states date, timezone, source, and what happens after it. Counterexample: an accurate security timeout with recovery is not a scarcity tactic merely because time is limited. |

### CER-C029 — deceptive design is observable and regulated in bounded contexts

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C029`](psychology-claim-register.md#cer-c029--deceptive-design-is-observable-and-regulated-in-bounded-contexts), canonical label `cross-source finding`; `CE-S043`, `CE-S044`, `CE-S045`, and `CE-S046`; strength `risk-triangulation-bounded`, separating occurrence, behavioral effect, official synthesis, and jurisdiction-specific law |
| When it may apply; when not | May trigger an audit of deception, material omission, asymmetric choice, obstruction, defaults, timers, social claims, cancellation, and recovery. Do not call every friction point or nudge unlawful manipulation, and do not infer author intent. |
| Contextual inputs; surfaces and states | Exact pattern and occurrence, controlled facts, materiality, choice symmetry, consequence, user goal, decline/exit/cancel/undo, accessibility, vulnerability impact, data use, jurisdiction, entity/service scope, current law, and counterexample. Candidate surfaces span commerce, subscriptions, consent, privacy, onboarding, and account closure. |
| Safe; unsafe intervention | Safe: least-coercive truthful design with material facts before action and operable decline/cancellation. Unsafe: deception, obstruction, confusing negatives, shame, hidden terms, false claims, or impaired free and informed choice. |
| Accessibility and localization | Visual interference, confusing negatives, asymmetric controls, and hidden terms can disproportionately harm disabled users. Legal definitions, disclosure norms, and language require jurisdiction and locale review. |
| Evaluation; escalation | Combine expert pattern audit, comprehension/autonomy research, cancellation/reversal tests, accessibility, source-of-truth checks, and legal applicability. Route to product, legal/policy, privacy, ethics/risk, accessibility, research, locale, and affected-domain owners. |
| Illustrative example; counterexample | Example: cancellation is as findable and operable as sign-up and states the consequence. Counterexample: proportionate confirmation for an irreversible deletion is not obstruction when it is accessible and does not conceal exit. |

### CER-C030 — population and locale boundaries belong to every psychology claim

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C030`](psychology-claim-register.md#cer-c030--population-and-locale-boundaries-are-part-of-every-psychology-claim), canonical label `cross-source finding`; `CE-S030`, `CE-S032`, `CE-S033`, `CE-S034`, and `CE-S047`; strength `cross-source-bounded`, showing both aggregate commonality and meaningful population variation |
| When it may apply; when not | Applies whenever a psychology claim transfers across population, language, script, culture, institution, or environment. Do not build cultural profiles or infer individual behavior from nationality, language, demographic group, or an average effect. |
| Contextual inputs; surfaces and states | Source population and sampling, target population, language/script/direction, education, socioeconomic access, disability intersections, institution, task, response format, familiarity, translation lineage, local sources, and nontransfer scope. It applies to every surface and state. |
| Safe; unsafe intervention | Safe: attach scope to each claim, seek local expertise, test locally authored/translated materials, and retain nulls/conflicts. Unsafe: universal color, shape, norm, trust, tone, or reading-pattern prescriptions. |
| Accessibility and localization | Culture intersects with disability, literacy, age, technology, and access; a single-axis locale review remains incomplete. Qualified in-language review and accessible recruitment are required. |
| Evaluation; escalation | Recruit target locales and intersections, disaggregate outcomes, document nonresponse/accommodations, and preserve variation. Locale/culture, accessibility, research, terminology, domain, privacy, and policy/legal owners review transfer. |
| Illustrative example; counterexample | Example: test warning terminology with Arabic-speaking screen-reader users in the target market. Counterexample: a cross-cultural aggregate can support a bounded research question without proving uniform individual response. |

### CER-C031 — accessible authentication limits cognitive-function tests in scope

| Operational field | Proposed guidance |
| --- | --- |
| Registered evidence | [`CER-C031`](psychology-claim-register.md#cer-c031--accessible-authentication-limits-cognitive-function-tests-in-a-defined-scope), canonical label `sourced fact`; `CE-S025` and `CE-S048`; strength `normative-instrument-bounded` plus `official-guidance-bounded`, with criterion exceptions and product conformance unestablished |
| When it may apply; when not | May apply to web authentication at WCAG 2.2 Level AA when a cognitive-function test is required and no allowed alternative, assistance, object-recognition, or personal-content exception resolves it. Do not treat it as a blanket ban on every memory or recognition action. |
| Contextual inputs; surfaces and states | Authentication boundary, exact test, alternative method, password-manager/paste support, assistance, exception, recovery, accessible name/state, secret handling, threat model, technology, policy target, and complete journey. |
| Safe; unsafe intervention | Safe: specify allowed assistance and accessible alternatives with truthful recovery and security controls. Unsafe: block paste, require puzzle-only authentication, expose secrets, or weaken controls from a slogan. |
| Accessibility and localization | Test cognitive and learning disability access, password managers, screen readers, speech input, keyboard, zoom, translated instructions, identity conventions, and support/recovery. Security and accessibility are joint constraints. |
| Evaluation; escalation | Perform criterion-specific conformance testing and complete authentication/recovery tasks with appropriate participants and threat cases. Accessibility, identity/security, product/engineering, privacy, locale, and policy owners determine the exact solution and applicability. |
| Illustrative example; counterexample | Example: authentication permits a password manager and offers a conforming alternative with clear recovery. Counterexample: a permitted object-recognition or personal-content case is not automatically nonconforming; test the exact exception and implementation. |

## Promotion, implementation, and unresolved validation

**[Proposal]** These records may remain research hypotheses, advisory candidates, or candidate hard findings only. Before any item becomes a repository rule, product policy, experiment, personalized intervention, or release requirement, it needs the promotion evidence in the [psychology-claim register](psychology-claim-register.md#promotion-gate), the counterexample and false-positive controls in the [candidate lint contract](content-contract-and-lint-candidates.md#promotion-and-enforcement-gate), and qualified practitioner and specialist review.

**[Open question]** The matrix itself has not been tested for reviewer agreement, usability, review burden, false positives, false negatives, multilingual transfer, disabled-user coverage, or whether its distinctions reliably protect benign assistance while detecting high-risk influence. Resolve those questions with independent content designers, researchers, affected users, accessibility specialists, locale/culture experts, privacy/legal/ethics owners, safeguarding and domain specialists, and an adversarial review that retains disagreement.

No schema, parser, score, classifier, linter, model prompt, personalization system, experiment, product integration, mutation, publication path, or enforcement mechanism was built or run. Completing this document does not advance the cognitive-ergonomics workstream, establish a gold set, or satisfy any implementation, security, privacy, approval, release, or product-validation gate.
