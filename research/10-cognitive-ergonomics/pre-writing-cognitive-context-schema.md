---
title: Pre-writing cognitive-context assessment schema
status: proposed
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
execution_status: schema-proposal-not-implemented-not-validated
scope: Evidence and decision inputs required before applying cognitive or behavioral hypotheses to content-design work
source_documents:
  - README.md
  - ../08-synthesis/candidate-system-model.md
  - ../02-workflow/end-to-end-workflow.md
  - ../03-domain-matrix/voice-tone-terminology.md
  - ../04-surfaces/interaction-pattern-content-practice.md
  - ../05-technology/security-privacy-and-trust-boundaries.md
---

# Pre-writing cognitive-context assessment schema

## Result and boundary

**[Proposal]** Add a cognitive-context packet to the existing content-context compiler before an agent uses any cognitive, behavioral, persuasion, or accessibility hypothesis. The packet does not diagnose a person, assign a psychological type, or authorize an intervention. It assembles product facts, user-research evidence, material decision information, observable interaction demands, unknowns, risks, and the evaluation needed to test a bounded content decision.

The packet is an extension of the [candidate system model](../08-synthesis/candidate-system-model.md#content-context-compiler), not a parallel source of product truth. Evidence sources, governing instruments, accountable owners, authorized approvers, semantic decisions, mutation approvals, release approvals, delivery states, evaluation records, phase-gate results, task grants, and privacy/control records remain independent.

The assessment must return `insufficient_evidence`, `human_decision_required`, or `prohibited_intervention` when the context cannot support a safe proposal. It must not fill unknown fields from an industry stereotype, persona label, demographic proxy, clickstream, sentiment score, or model inference.

## Unit of assessment

One packet applies to one bounded decision context:

```text
product + journey + event/state + actor role + user goal/decision
+ surface/channel + locale/language + material consequence + time window
```

Changing a material consequence, target actor, jurisdiction, language/locale, decision, default, commitment, or recovery path requires a new packet or an explicitly linked scoped variant. One packet cannot certify every user, locale, or state in an industry.

## Status and evidence conventions

### Packet disposition

| Disposition | Meaning | Agent behavior |
| --- | --- | --- |
| `ready_for_bounded_advice` | Required facts and review routes exist for a non-mutating proposal | May propose options and an evaluation plan within scope |
| `insufficient_evidence` | A material input is unknown, stale, disputed, or missing | Surface the missing input; do not infer it |
| `human_decision_required` | Evidence exists but product, policy, accessibility, locale, ethics, or risk ownership is unsettled | Route the exact decision and affected options |
| `prohibited_intervention` | The requested tactic conflicts with a nonwaivable truthfulness, non-deception, material-comprehension, valid-consent, accessibility, user-autonomy, or safety boundary, or uses a separately prohibited manipulation mechanism | Refuse the tactic and explain the safer problem to solve |
| `not_applicable` | No cognitive or behavioral hypothesis is needed for the scoped content decision | Continue through the ordinary content-context compiler |

`ready_for_bounded_advice` is not semantic approval, permission to experiment, mutation approval, release approval, or execution capability.

### Evidence dimensions

Every factual or research input links evidence sources carrying the repository's five orthogonal dimensions:

- observation strength: `unobserved`, `observed`, or `corroborated`;
- challenge: `undisputed` or `disputed`;
- freshness: `current` or `stale`;
- lineage: `active` or `superseded`; and
- epistemic qualifier: `none`, `inferred`, or `assumed`.

An input may be corroborated, disputed, stale, and superseded at the same time. No dimension is an approval state. A cognitive hypothesis must link the applicable psychology-claim record and keep its population, task, outcome, moderators, and limits intact.

## Required packet

The illustrative YAML below is a proposed human-readable shape, not a frozen public schema.

```yaml
schema_version: cognitive-context-proposal-0.1
packet_id: CCP-SIBF-CHK-RECOVERY-001
packet_disposition: insufficient_evidence

scope:
  product_id: SIBF-CHK-001
  journey_id: guest-checkout-recovery
  event_id: payment-recovery
  state_id: payment-method-unavailable
  actor_role_ids: [buyer]
  user_goal: choose a truthful available recovery path
  decision_or_task: select another supported payment method
  surface_ids: [checkout-recovery-panel]
  channel_ids: [web-ui]
  language: en
  locale: en-US
  jurisdiction_ids: [fixture-only]
  risk_class: synthetic-commerce-choice

product_behavior:
  facts:
    - claim_id: CL-BF-RECOVERY-01
      evidence_source_ids: [EV-BF-RECOVERY-01]
      behavior: one payment method is unavailable and another supported path exists
  unknowns:
    - U-RECOVERY-PERSISTENCE
  prohibited_inventions:
    - eligibility
    - price
    - approval_probability
    - recovery_timing

user_and_research_context:
  represented_population_ids: [POP-SYNTHETIC-FIXTURE]
  prior_knowledge:
    status: unknown
    evidence_source_ids: []
  terminology_familiarity:
    status: unknown
    term_ids: [TERM-PAYMENT-METHOD]
    evidence_source_ids: []
  mental_model_hypotheses:
    - hypothesis_id: MMH-RECOVERY-01
      proposition: null
      status: not-permitted-to-infer
  emotional_or_vulnerability_state:
    status: not-assessed
    prohibited_use: no personalization or diagnosis

memory_and_effort:
  cross_step_items: []
  required_recall: []
  external_memory_support: [visible-order-summary]
  concurrent_information_units: null
  branching_and_dependencies: null
  time_or_interruption_constraints:
    status: unknown
  assessment_method_required: task-analysis-and-user-research

material_information:
  - material_item_id: MI-RECOVERY-01
    proposition: current payment method is unavailable
    decision_relevance: required-before-action
    presentation_requirement: visible-before-recovery-choice
    omission_or_delay_risk: user cannot interpret why another action is needed
    claim_id: CL-BF-RECOVERY-01

choice_architecture:
  option_ids: [OPT-USE-ANOTHER-METHOD]
  option_count: 1
  differentiating_attributes: [next-action]
  default_option_id: null
  preselection: none
  reversibility: supported-before-order-commitment
  exit_or_defer_path: unknown
  simplification_question: does the design remove incidental effort without removing a supported choice?

influence_claims:
  social_proof: {present: false, claim_ids: []}
  scarcity: {present: false, claim_ids: []}
  urgency: {present: false, claim_ids: []}
  authority: {present: false, claim_ids: []}
  progress: {present: false, claim_ids: []}
  reward_or_habit_trigger: {present: false, claim_ids: []}

accessibility_language_and_culture:
  accessibility_need_evidence_ids: []
  cognitive_accessibility_checks: [plain-purpose, visible-recovery, no-memory-only-instruction]
  literacy_or_numeracy_evidence: unknown
  locale_review_status: fixture-only-unreviewed
  cultural_interpretation_assumptions: prohibited
  assistive_expression_ids: []

goal_and_incentive_alignment:
  user_outcome: understand the failure and choose a supported recovery action
  organization_outcome: recover checkout when the user chooses to continue
  potential_conflicts: [conversion-could-pressure-continuation]
  autonomy_guardrail: stopping or leaving must not be misrepresented

psychology_claim_candidates: []
prohibited_tactics: [fake-urgency, unsupported-reassurance, forced-continuation]

evaluation_plan:
  truthfulness: required
  non_deception: required
  findability: proposed
  comprehension: required
  material_comprehension: required
  valid_consent: not_applicable
  valid_consent_reason: no-consent-event-in-synthetic-scope
  recall: not_applicable
  decision_quality: required
  task_success: required
  recovery_success: required
  actual_cognitive_effort: exploratory
  perceived_cognitive_effort: exploratory
  accessibility: required
  trust_calibration: exploratory
  emotional_appropriateness: qualified-review
  autonomy: required
  reversibility: required
  safety: required
  business_outcome: secondary-noncompensating
  potential_harm: required

open_questions:
  - question_id: CQ-RECOVERY-01
    question: Is leaving checkout a supported path in this exact state?
    accountable_owner_id: OWNER-CHECKOUT-BEHAVIOR
    resolution_method: implemented-behavior-and-policy-review

required_reviews:
  - review_type: product-behavior
    owner_id: OWNER-CHECKOUT-BEHAVIOR
  - review_type: accessibility
    owner_id: OWNER-ACCESSIBILITY
```

All fixture-specific values above are synthetic examples. They are not product facts, approved copy, gold labels, or implemented behavior.

## Field groups and decision questions

### 1. User goal, decision, and prior knowledge

| Field | Required question | Acceptable evidence | Unsafe shortcut |
| --- | --- | --- | --- |
| `user_goal` | What is the person trying to understand, decide, or accomplish in this event? | Current task research, service evidence, support evidence, declared intent in the active flow | Business funnel goal treated as user goal |
| `prior_knowledge` | What must be known before this step, and what evidence shows the represented population knows it? | Interview, comprehension study, observed task behavior, validated domain evidence | Persona, education, role, age, or locale used as a knowledge score |
| `terminology_familiarity` | Which terms are known, confusable, protected, or new in this context? | Terminology research, search/support evidence, qualified locale review | Frequency in existing copy treated as understanding |
| `mental_model_hypotheses` | Which predicted sequence, object relationship, or consequence is being tested? | Direct qualitative/behavioral evidence and explicit hypothesis | Claiming the interface reveals a person's mental model |

### 2. Memory and cognitive effort

The packet records observable task demands rather than one inferred `cognitive_load` number.

| Observable | Examples | Required response when unknown |
| --- | --- | --- |
| Cross-step information | Values, rules, or choices needed later | Identify the item and test whether it should remain visible or recoverable |
| Recognition support | Visible options, examples, summaries, contextual labels | Record whether the support is accurate and sufficient for the task |
| Recall demand | Remembering codes, prior values, hidden criteria, or earlier errors | Flag the demand; do not assert harm magnitude without evaluation |
| Concurrent information | Material terms, comparisons, variables, status and action | Map information roles; do not use a universal item-count limit |
| Branching/dependency | Conditional options, prerequisites, state changes | Represent the decision structure; do not equate branch count with difficulty |
| Actual effort | Time, errors, backtracking, assistance, physiological or interaction measure where ethically valid | Specify the method and limitations |
| Perceived effort | Participant-reported difficulty or confidence | Keep separate from observed behavior and comprehension |

### 3. Material information and misunderstanding cost

For every fact material to choice, consent, commitment, price, eligibility, privacy, safety, right, or recovery, record:

- the exact proposition and claim ID;
- who needs it and for which decision;
- when it must be available;
- whether disclosure can be delayed and on what evidence;
- the consequence of omission, ambiguity, or false reassurance;
- the supported recovery or clarification path;
- the applicable governing instrument, owner, and approver where present; and
- the evaluation needed to show comprehension rather than exposure alone.

Progressive disclosure is not automatically harmful or beneficial. It is prohibited when it hides or delays material information needed for the current decision; it may be useful when it removes nonmaterial detail while preserving discoverability, context, and control. The packet must make that distinction testable.

### 4. Stress, urgency, emotion, and trust

The packet may record contextual conditions evidenced at the task or service level, such as a timed deadline, service outage, declined transaction, bereavement flow, or emergency warning. It must not convert those conditions into a diagnosis of an individual.

Allowed records describe:

- the observable event and consequence;
- evidence that the represented population may face a barrier in that context;
- the uncertainty in the inference;
- content and interaction risks such as overload, false reassurance, misplaced delight, shame, or urgency;
- a safe default that does not exploit vulnerability; and
- qualified review and research needed.

Prohibited records include inferred anxiety scores, vulnerability segments, emotional susceptibility, persuasion receptivity, or personalized pressure derived from behavior, language, device, time, disability, or demographic proxies.

### 5. Choices, defaults, reversibility, and control

Record the options and consequences before asking whether there are too many or too few. Required fields include:

- option identities and eligibility source;
- material differentiators;
- dominance, redundancy, dependency, or incompatibility relationships;
- order and grouping rationale;
- default or preselection, if any;
- who benefits from the default;
- visibility and consequence of accepting it;
- whether it can be changed before and after commitment;
- supported exit, defer, compare, undo, and recovery paths; and
- evidence needed to test informed choice and decision quality.

No fixed option count is safe across tasks. Reducing choices can remove noise or remove autonomy; adding choices can enable control or create poorly differentiated burden. The packet must preserve that tradeoff.

### 6. Influence and factual-claim inventory

Any use of social proof, scarcity, urgency, authority, progress, reward, loss framing, or habit trigger requires a typed record:

| Field | Requirement |
| --- | --- |
| Claim | Exact factual proposition shown or implied |
| Evidence | Current source and five evidence dimensions |
| Denominator | Population, inventory, time window, comparison set, or progress total |
| Applicability | Product, state, audience, locale, jurisdiction, and expiry |
| User value | How the information helps the current user goal or decision |
| Organizational incentive | What business behavior the intervention is expected to change |
| Autonomy risk | Pressure, concealment, default, lock-in, shame, compulsion, or FOMO path |
| Reversibility | How the user can defer, decline, undo, or recover |
| Review | Accountable owner and required risk/legal/privacy/ethics/accessibility review |
| Evaluation | Truthfulness, comprehension, decision quality, autonomy, harm, and business outcome separately |

If the denominator, source, expiry, or user relevance is missing, the agent must not generate the influence claim.

## Deterministic versus advisory output

### Deterministic candidates

Only observable structural or factual conditions may become deterministic candidates, for example:

- a preselected option changes price, consent, privacy, commitment, or eligibility without a visible explanation;
- a countdown or scarcity statement lacks a current source, defined event, and expiry;
- social-proof text lacks a population, denominator, time window, or verifiable source;
- material terms appear only after the action that commits the user;
- a task requires recalling an unavailable value that the product already knows and could safely display;
- progress claims use a false or undefined denominator; or
- a recurring charge or irreversible consequence is not visible before confirmation.

Even these require scope, counterexamples, false-positive tests, a current approved rule, and enforcement eligibility before autonomous blocking.

### Advisory only

The following remain advisory questions unless a separate validated operational rule exists:

- whether an option set causes overload;
- whether a phrase feels trustworthy;
- whether a user is stressed, confused, motivated, or vulnerable;
- whether a color, shape, image, animation, reading pattern, or metaphor carries a meaning;
- whether progress, delight, social proof, or a default improves decision quality;
- whether a message is memorable; and
- whether one intervention changes a habit.

The system may identify the evidence needed to test those questions; it may not report the psychological conclusion from interface inspection alone.

## Required evaluation packet

Each proposed intervention links an evaluation record that declares:

| Outcome | Example method | Boundary |
| --- | --- | --- |
| Truthfulness | Compare every material claim and stated behavior with its exact current fact record and rendered behavior | Plausibility or reviewer confidence is not truth |
| Non-deception | Inspect material omissions, false implications, timing, hierarchy, choice symmetry, and supported exits in the complete path | A literal sentence can be true while the experience deceives |
| Findability | Search/navigation task, first-click with comprehension follow-up | First click is not comprehension |
| Comprehension | Teach-back, scenario choice with rationale, paraphrase coding | Exposure or recall alone is insufficient |
| Material comprehension | Explain price, consent scope, consequence, limitation, timing, and available alternatives relevant to the decision | General task comprehension cannot stand in for material terms |
| Valid consent | Complete consent-path review plus participant understanding and voluntary choice where consent applies | A checked control or completed action is not valid consent |
| Recall | Delayed recognition/recall task matched to the product need | High recall can coexist with deception or harm |
| Decision quality | Choice aligned with the participant's stated goal and material facts | Organization-preferred choice is not automatically quality |
| Task/recovery success | Bounded scenario completion and truthful recovery | Completion can be coerced |
| Actual effort | Errors, time, backtracking, assistance, task analysis | Speed is not universally better |
| Perceived effort | Self-report with accessible administration | Report and behavior remain separate |
| Accessibility | Standards checks plus appropriate disabled-user/specialist evaluation | Conformance alone is not lived usability |
| Safety | Declared hazard/unsafe-action scenarios, accurate instruction, stop/recovery success, and qualified review | Absence of an incident in a small study is not proof of safety |
| Trust calibration | Appropriate reliance under true, false, and uncertain system states | More trust is not always better |
| Emotional appropriateness | Qualified review and affected-user research | Do not diagnose emotion from sentiment |
| Autonomy/reversibility | Decline, defer, undo, exit, and recovery success | Conversion cannot compensate for failure |
| Potential harm | Predefined harm scenarios, incident signals, qualitative evidence | Absence of observed harm in a small study is not safety proof |
| Business outcome | Conversion, completion, retention, support load | Always reported separately and non-compensating |

## Escalation matrix

| Trigger | Required route | Agent disposition |
| --- | --- | --- |
| Controlled product fact or material consequence is unknown | Product/behavior or policy owner | `insufficient_evidence` |
| Default changes consent, price, privacy, eligibility, commitment, or rights | Product, legal/policy, privacy, research, and applicable risk owner | `human_decision_required`; never draft silent default copy |
| Individual vulnerability or emotion would be inferred or targeted | Privacy/ethics/research and affected-user route | `prohibited_intervention` unless a separately approved protective use exists |
| Scarcity, urgency, social proof, authority, or progress claim lacks source/denominator | Fact owner and risk/legal review | `insufficient_evidence`; do not generate claim |
| Accessibility or literacy demand is material and untested | Accessibility/inclusive-research owner | `human_decision_required` |
| Cultural or locale meaning is assumed | Qualified locale/culture reviewer | `insufficient_evidence` |
| Business and user outcomes conflict | Product, research, ethics/risk, and affected owner | Preserve conflict; no conversion-first optimization |
| Intervention could create compulsion, shame, fear, concealment, or lock-in | Ethics/risk, privacy, legal, safeguarding or domain specialist as applicable | `prohibited_intervention` or qualified review |

## Validation cases for the schema

The schema itself must be tested against at least:

1. a low-risk recognition aid with no influence claim;
2. a complex but necessary option set where reducing choices removes control;
3. a redundant option set where grouping may reduce incidental effort;
4. a preselected paid or consent-bearing option;
5. genuine inventory scarcity with a verifiable denominator and expiry;
6. fake or unverifiable social proof;
7. a high-stress failure/recovery state with no permission to infer individual emotion;
8. material information hidden in progressive disclosure;
9. a multilingual/RTL context whose reading and color assumptions are unknown;
10. a cognitively accessible path with visible memory support;
11. a research plan with leading questions or observer effects; and
12. a conversion increase paired with lower comprehension or autonomy.

For every case, tests must include a safe example, unsafe example, counterexample, false-positive challenge, expected packet disposition, missing-input path, reviewer route, and non-compensable outcomes.

## Research and implementation gaps

This proposal still needs:

- independent scientific review, access-gap resolution, and freshness review of the existing contradiction-preserving psychology-claim register and source notes;
- practitioner review of the field groups and burden;
- accessibility and cognitive-accessibility specialist review;
- cultural and in-language review across materially different locales;
- ethics, privacy, legal/regulatory, safeguarding, and domain-risk review for influence cases;
- real product and user evidence for thresholds, task demands, and outcome methods;
- independent authorship, blind adjudication, and measured false-positive/false-negative performance for the existing synthetic adversarial fixtures and proposed false-positive tests;
- mapping into the candidate compiler and evaluation records without a second status system; and
- a separately approved implementation design before any validator, lint rule, personalization, experiment, or enforcement path exists.

No amount of additional psychology literature alone closes those gaps.
