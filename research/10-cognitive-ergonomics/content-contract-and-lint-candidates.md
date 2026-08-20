---
title: Candidate CONTENT.md additions and cognitive-influence lint rules
status: proposed
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
execution_status: design-only-no-rule-approved-no-linter
scope: Candidate repository-contract fields and advisory or deterministic checks for cognitive ergonomics and behavioral influence
source_documents:
  - README.md
  - pre-writing-cognitive-context-schema.md
  - adversarial-behavioral-influence-fixtures.md
  - psychology-claim-register.md
  - ../08-synthesis/candidate-system-model.md
  - ../05-technology/repository-and-agent-integration.md
  - ../06-evaluation/evaluation-and-benchmarks.md
---

# Candidate `CONTENT.md` additions and cognitive-influence lint rules

## Result and boundary

**[Proposal]** A future repository contract needs a small, explicit boundary for cognitive ergonomics and behavioral influence. It should route an agent to current evidence and decision records, define prohibited uses, and identify which observable conditions may be checked. It should not embed a library of psychology effects, a user-typing system, an emotion detector, universal design formulas, or a behavioral-optimization score.

This file is a proposal, not the public `CONTENT.md` format. No rule below is approved, implemented, tested, or enforcement-eligible. Nothing in this file authorizes model use, repository reading, mutation, experimentation, publication, or autonomous blocking. A future deterministic rule still needs current evidence, exact applicability, an accountable owner, semantic decision and approval, counterexamples, false-positive tests, versioning, and `SEC-P0-F` eligibility plus an exact task grant before enforcement.

## Candidate repository-contract section

The fragment below illustrates responsibilities and references. It is not stable syntax.

```yaml
cognitive_ergonomics:
  policy_version: proposed-0.1
  accountable_owner_id: null
  authorized_approver_ids: []

  boundaries:
    diagnose_individual_state: prohibited
    infer_vulnerability_for_persuasion: prohibited
    fabricate_social_proof_scarcity_urgency_authority: prohibited
    silent_material_defaults: prohibited
    hide_material_information: prohibited
    optimize_conversion_over_informed_choice: prohibited
    universal_psychology_rules: prohibited

  evidence_routes:
    psychology_claim_register: research/10-cognitive-ergonomics/psychology-claim-register.md
    cognitive_context_schema: research/10-cognitive-ergonomics/pre-writing-cognitive-context-schema.md
    governing_instruments: []
    product_research_sources: []
    accessibility_sources: []
    locale_and_cultural_review_sources: []

  required_pre_writing_checks:
    - user_goal_and_decision
    - material_information
    - misunderstanding_consequence
    - memory_and_effort_demands
    - choice_default_and_reversibility
    - influence_claim_truth_and_denominator
    - accessibility_language_and_locale
    - user_organization_goal_conflict
    - evaluation_and_harm_plan

  noncompensable_outcomes:
    - truthfulness
    - non_deception
    - material_comprehension
    - valid_consent
    - accessibility
    - user_autonomy
    - safety

  rules:
    deterministic_rule_ids: []
    advisory_rule_ids: []
    prohibited_rule_ids: []

  escalation_routes:
    product_behavior_owner_id: null
    research_owner_id: null
    accessibility_owner_id: null
    privacy_owner_id: null
    legal_or_policy_owner_id: null
    ethics_or_risk_owner_id: null
    safeguarding_owner_id: null
    domain_risk_or_specialist_owner_ids: []
    affected_user_or_community_review_route_ids: []
    locale_owner_ids: []

  validation:
    last_reviewed_at: null
    evidence_cutoff: null
    supported_products_surfaces_locales: []
    unsupported_scopes: [all-unvalidated-scopes]
```

The contract should contain IDs and routes, not unbounded study summaries. Psychology evidence belongs in typed source and claim records; product-specific facts belong with their owners; evaluated rules belong in a versioned rule bundle; detailed fixtures belong outside the always-loaded contract.

## Rule record contract

Every candidate lint rule needs:

| Field | Requirement |
| --- | --- |
| Identity | Rule ID/version, predecessor/successor, status, owner |
| Type | `deterministic`, `advisory`, or `prohibited-automation` |
| Observable condition | Exact source/configuration/rendered facts the evaluator may inspect |
| Non-observable inference | Psychological, emotional, cultural, or outcome claims the rule must not make |
| Evidence | Source IDs and five evidence dimensions; psychology-claim IDs with population/task/outcome/limits |
| Applicability | Product, journey, state, surface, channel, actor role, locale, jurisdiction, risk, effective/expiry dates |
| Disposition | Finding type, actual severity method, explanation, safe next step |
| Counterexample | A similar safe case that must not match |
| False-positive tests | Inputs that challenge condition, scope, data flow, and rationale |
| False-negative tests | Adversarial encodings, indirection, dynamic content, locale, visual hierarchy, timing |
| Required controls | Approved rule decision, semantic approval, current enforcement eligibility, exact gate/grant, privacy/control records |
| Evaluation | Precision/recall by scope, unrateable cases, reviewer burden, harms, disagreement, drift trigger |

Rule status is independent from evidence, decision, delivery, and evaluation states. A rule cannot promote itself from advisory to deterministic because it matched frequently or because a model was confident.

## Deterministic candidates

These rules inspect observable factual or structural conditions. They remain candidates until the full rule record and validation gate pass.

### `CE-D001` — unsupported scarcity or countdown claim

| Field | Candidate definition |
| --- | --- |
| Condition | Scarcity/urgency expression exists but has no linked current claim source, denominator/event, scope, refresh/expiry, or stale-state behavior |
| Finding | `unsupported-influence-claim` |
| Safe next step | Remove the claim or obtain the exact current fact record and review its user relevance |
| Counterexample | Server-sourced capacity or deadline with defined scope/timezone/expiry and truthful recovery |
| False positives | Security timeout; appointment capacity; real policy deadline; non-urgent stock-status label |
| Prohibited inference | “The author intended to manipulate” |

### `CE-D002` — unsupported social-proof claim

| Field | Candidate definition |
| --- | --- |
| Condition | Popularity/norm claim has no population, denominator, event definition, time window, scope, current source, or limitation |
| Finding | `unsupported-influence-claim` |
| Counterexample | Current bounded statistic that helps comparison and preserves material terms and decline paths |
| False positives | Aggregate service status; factual usage count unrelated to a material choice; research result clearly labeled with scope |
| Prohibited inference | “Social proof always changes behavior” |

### `CE-D003` — unsupported authority claim

| Field | Candidate definition |
| --- | --- |
| Condition | Content says or implies an expert, regulator, standard, certification, or institution recommends/approves a choice without a current exact source and applicability record |
| Finding | `unsupported-controlled-claim` |
| Counterexample | Named current source applies to the exact scope and limitations remain visible |
| False positives | Authorship credit; support-agent identity; neutral link to optional guidance |
| Escalation | Controlled-claim owner and applicable legal/compliance route |

### `CE-D004` — misleading progress denominator

| Field | Candidate definition |
| --- | --- |
| Condition | Progress number or step total omits required conditional stages or implies outcome probability/time without a defined denominator |
| Finding | `undefined-or-false-progress` |
| Counterexample | “Step 3 of 4 in this form” with later review clearly separate |
| False positives | Indeterminate progress accurately labeled; local subsection progress; completed checklist with user-controlled optional items |

### `CE-D005` — material term appears after commitment

| Field | Candidate definition |
| --- | --- |
| Condition | A price, recurring charge, consent scope, eligibility constraint, privacy consequence, irreversible effect, right, or supported exit condition is mapped only after the committing action |
| Finding | `material-information-too-late` |
| Counterexample | Nonmaterial technical detail remains discoverable through progressive disclosure before commitment |
| False positives | Post-action receipt details; information created only by the transaction; optional help |
| Required inputs | Product behavior, materiality decision, exact occurrence/state map, applicable governing and approval records |

### `CE-D006` — silent material preselection

| Field | Candidate definition |
| --- | --- |
| Condition | A preselected value is linked to a declared material consequence—price, consent, privacy, eligibility, commitment, or another governed effect—and the selection or consequence has no mapped pre-commit occurrence or is mapped only after the committing action |
| Finding | `silent-material-default` |
| Counterexample | Reversible display preference sourced from an explicit saved preference and changing no material consequence |
| False positives | Protective configuration with accurate explanation; required fixed value that is not a choice; accessible default focus |
| Advisory evaluation | Whether the visible consequence is understandable requires contextual comprehension and accessibility evaluation; it is not part of the deterministic match |
| Escalation | Product, research, accessibility, privacy/legal, and risk owner as applicable |

### `CE-D007` — supported decline, exit, undo, or recovery is concealed

| Field | Candidate definition |
| --- | --- |
| Condition | Product behavior supports a material alternative or recovery, but its content occurrence is absent, falsely unavailable, or materially less operable without an approved rationale |
| Finding | `autonomy-or-recovery-path-concealed` |
| Counterexample | Unsupported action is omitted truthfully; destructive action uses proportionate hierarchy while remaining accessible |
| False positives | Safety lockout; role/eligibility restriction; irreversible operation with no true undo |

### `CE-D008` — unsupported psychology statement in governed rationale

| Field | Candidate definition |
| --- | --- |
| Condition | An enforceable rule or approved rationale contains a universal/myth statement from the claim register—such as a fixed optimal choice count or memory limit, universal F/Z scan, universal color/shape meaning, or “visuals 60,000x faster”—without a scoped evidence/applicability record |
| Finding | `unsupported-psychology-claim` |
| Counterexample | Bounded product study result linked to exact population/task/outcome/limits and used only within scope |
| False positives | Phrase appears in a research-critique, quotation, negative fixture, or source note rather than an active rule/rationale |
| Prohibited inference | The construct is false in every possible context |

## Advisory candidates

These findings require contextual or human judgment and may never be converted into simple string-pattern blockers.

| Rule ID | Question | Required inputs | Unsafe automated conclusion | Evaluation route |
| --- | --- | --- | --- | --- |
| `CE-A101` | Does the task impose avoidable recall across steps? | Task/state map, security limits, visible/recoverable info, user research | “Users cannot remember more than N items” | Task analysis, errors/backtracking, comprehension, accessibility |
| `CE-A102` | Are choices poorly differentiated, redundant, dependent, or missing necessary control? | Option model, material attributes, user goals, eligibility, reversibility | “There are too many/few choices” from count alone | Decision quality, comparison behavior, effort, segment/locale review |
| `CE-A103` | Does progressive disclosure preserve the current decision's material information? | Materiality, timing, hierarchy, discoverability, assistive access | “Progressive disclosure reduces cognitive load” | Findability, comprehension, task and accessibility evaluation |
| `CE-A104` | Is tone appropriate to consequence, uncertainty, and supported recovery? | Observable state/consequence, affected-user research, product facts | Diagnosed user emotion or vulnerability | Qualified content, affected-user, accessibility and domain review |
| `CE-A105` | Does an influence intervention support the user's declared goal and autonomy? | Factual claim, user value, organizational incentive, reversibility, harm plan | Effectiveness equals ethical acceptability | Mixed outcome evaluation and ethics/risk review |
| `CE-A106` | Is a visual/verbal representation helpful for this task and population? | Content roles, accessibility equivalents, task/locale evidence | Dual coding or visual superiority as universal law | Comprehension, memory where relevant, accessibility, false-positive test |
| `CE-A107` | Does speech, text, or multimodal delivery fit the context? | Channel, privacy, pace, persistence, literacy, language, disability, task | Speech or reading is universally better | Comparative task and comprehension study |
| `CE-A108` | Does the interface calibrate trust rather than merely increase it? | System capability/error states, claims, uncertainty, reliance consequence | More trust, warmth, polish, or aesthetics is always better | Appropriate reliance, comprehension, recovery and harm evaluation |
| `CE-A109` | Could a reminder/reward/streak support or undermine a self-declared goal? | User-selected goal, frequency/control, inference basis, incentive, exit, harm | Repeated use proves a healthy habit | Longitudinal autonomy, well-being, task outcome and opt-out study |
| `CE-A110` | Could research setup or wording shape the response? | Moderator relationship, script, observation setting, demand cues, evidence sources | Every observed change is a Hawthorne effect | Method review, neutral/blinded comparison, triangulation |

## Prohibited automation candidates

A future agent must never perform these actions from content or behavioral data alone:

| Rule ID | Prohibited action | Allowed safer response |
| --- | --- | --- |
| `CE-P201` | Diagnose or label an individual's anxiety, stress, confusion, vulnerability, literacy, disability, culture, motivation, intent, or susceptibility | Record observable task conditions and request appropriate research or support |
| `CE-P202` | Personalize persuasion using inferred emotional or cognitive vulnerability | Refuse; route protective-use proposals to privacy/ethics/research and affected-user governance |
| `CE-P203` | Fabricate or embellish popularity, scarcity, urgency, authority, progress, consensus, or outcome probability | Require the exact current claim source or remove the claim |
| `CE-P204` | Optimize a business metric while making truthfulness, non-deception, material comprehension, valid consent, accessibility, user autonomy, or safety compensable | Preserve the exact seven hard outcomes independently and report business outcome separately |
| `CE-P205` | Promote a psychology hypothesis, frequent match, accepted edit, or model judgment into a deterministic rule | Keep advisory; require evidence, owner, approval, fixtures, false-positive tests, and enforcement gate |
| `CE-P206` | Assign universal cultural meaning to a color, shape, gesture, metaphor, direction, reading path, emotional cue, or voice trait | Request qualified local evidence and redundant semantics |
| `CE-P207` | Create compulsion, shame, threat, loss, or FOMO loops around a person's inferred vulnerability | Refuse and propose an explicit user-controlled reminder or support path if appropriate |

## Lint output contract

Every lint result should return a typed record rather than a replacement string:

```yaml
finding_id: FIND-CE-D006-001
rule_id: CE-D006
rule_version: proposed-0.1
rule_type: deterministic-candidate
status: unvalidated
object_refs: []
evidence_source_ids: []
psychology_claim_ids: []
governing_instrument_id: null
applicability_record_id: null
actual_severity: null
finding: silent material preselection may be present
observed_condition: null
unknowns: []
counterexample_checks: []
false_positive_risks: []
safe_next_step: inspect the exact default, consequence, visibility, source, preference, and reversibility
required_owner_ids: []
required_approver_ids: []
evaluation_record_ids: []
decision_effect: none
delivery_effect: none
execution_effect: none
```

If the required object, behavior, materiality, evidence, or applicability fields are missing, the result is `insufficient_evidence`, not a definitive accusation of manipulation.

## False-positive test families

Every deterministic candidate must be tested against:

- quotation, research discussion, fixture, comment, test, and documentation contexts;
- stale/dead code versus reachable occurrences;
- variable, ICU, CMS, API, design, server, and runtime-generated expressions;
- security, safety, accessibility, and legal reasons for constrained choices or redisplay;
- genuine capacity, inventory, deadline, policy, certification, or progress facts;
- locale and language changes that alter phrasing but not the claim structure;
- user-declared saved preferences versus inferred preferences;
- protective defaults versus commercial defaults;
- optional detail versus material decision information;
- unsupported actions versus concealed supported actions; and
- content-only limitation versus behavior or visual-hierarchy evidence the scanner cannot observe.

Unsupported evidence results must remain visible; they are not silently excluded from precision denominators.

## Promotion and enforcement gate

Before any candidate becomes an approved deterministic rule:

1. Its psychology and product claims have current traceable evidence and counterevidence.
2. Applicability, owner, and authorized approver are recorded separately.
3. The semantic rule decision is `approved` for the exact scope with an exact approval record.
4. The adversarial fixture set contains positive, negative, counterexample, boundary, stale, locale, accessibility, and false-positive cases.
5. Human adjudication reports precision, recall, abstention/unrateable rate, actual severity, reviewer burden, and harm by scope.
6. The rule checks an observable condition without diagnosing a person or inferring intent.
7. An independent security/privacy review confirms the scanner does not collect unnecessary behavioral or personal data.
8. Current enforcement eligibility passes the applicable deterministic-rule gate; execution has its exact task grant and any read/runtime controls.
9. The result format preserves evidence, decision, delivery, evaluation, and approval states independently.
10. A versioned rollback, waiver eligibility, expiry, drift trigger, and removal process exist. High/Critical, nonwaivable, privacy, authorization, integrity, and autonomy hard failures cannot be suppressed by a convenience baseline.

Until those conditions pass, deterministic candidates produce development findings only. Advisory candidates may guide a qualified review but cannot block, rewrite, personalize, experiment, or publish.

## Open research and validation needs

- Map every myth/universal statement in `CE-D008` to a reviewed claim-register record rather than a phrase list alone.
- Test whether the proposed materiality/default rules can be evaluated from static source or require rendered behavior and visual hierarchy.
- Validate the influence record with content designers, researchers, accessibility specialists, locale/culture experts, privacy/legal/ethics owners, and affected users.
- Build malicious and ambiguous fixtures that try to hide claims in variables, images, timing, animation, personalization, or server responses.
- Define severity by consequence and affected actor, not rule name or industry.
- Measure whether findings improve informed choice and reduce harm without creating prohibitive review burden or chilling benign assistance.
- Keep legal/regulatory applicability separate; this file is not legal advice or a substitute for counsel.
