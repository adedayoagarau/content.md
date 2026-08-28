# UX-Writing Research and Governance Knowledge

This proposal-only pack defines how UX-writing knowledge is classified, tested, approved, released, observed, corrected, and retired. It makes decisions auditable without granting book notes, research findings, generated output, or metrics automatic authority.

## Evidence Lanes

### Deterministic evidence

Approved, scoped evidence for behavior that can be evaluated reproducibly.

Examples include required fields, exact state transitions, resolved references, approved terminology, resource presence, and semantic-invariant equality.

Deterministic does not mean universally true. The result is bounded by input, rule version, scope, source currency, and runtime verification.

### Specialist-governed evidence

Judgment owned by an accountable discipline, such as legal, medical, finance, safety, privacy, security, accessibility, policy, locale, or sensitive identity review.

A specialist decision should record owner, question, evidence, scope, conditions, expiry, and disposition. It cannot be replaced by practitioner consensus or model confidence.

### Research evidence

Observed evidence about people, tasks, contexts, interpretations, and outcomes.

Research can support or challenge a hypothesis about comprehension, findability, recovery, decision quality, trust calibration, modality fit, or harm. It does not prove product state, law, policy, or causation beyond the method's design.

### Preference evidence

Approved choices about rhythm, warmth, humor, voice, mechanics, or aesthetic economy after hard planes pass.

Preference is legitimate within its scope but cannot compensate for falsehood, missing material information, unsafe behavior, or failed accessibility structure.

## Hard-Before-Soft Evaluation

Evaluate in this order:

1. authority and evidence sufficiency;
2. factual and semantic fidelity;
3. product state and action accuracy;
4. safety and governed requirements;
5. accessibility and localization structure;
6. material information, agency, consequence, recovery, and remedy;
7. comprehension, findability, task success, and observed outcomes;
8. voice, tone, concision, coherence, and distinctiveness.

Unknown or failed evidence on planes 1–6 blocks stylistic selection. A higher conversion rate or stakeholder preference cannot waive a hard finding.

## Research Contract

A decision-grade study records:

- question, hypothesis, and decision it will inform;
- target population, affected parties, inclusion and exclusion criteria;
- task, journey state, channel, locale, risk, and adverse contexts;
- recruitment, consent, protocol, materials, instrumentation, and data handling;
- outcomes, countermetrics, stopping criteria, and analysis plan;
- observations, limitations, contradictory evidence, and unanswered questions;
- owner, reviewers, approval, retention, and disposition.

Qualitative and quantitative methods answer different questions. Counts do not explain interpretation; interviews do not establish prevalence; usability sessions do not prove production outcomes; correlations do not prove causation.

## Measurement Model

Measure the intended human and system outcome, not merely available clicks.

Possible outcome families:

- task completion and correct state;
- comprehension and decision quality;
- recovery, preserved work, and time to remedy;
- findability and capability discovery;
- error, regret, reversal, complaint, and abandonment;
- access and parity across affected populations;
- support demand, operational burden, and correction latency.

Every success metric needs countermetrics that can reveal coercion, exclusion, confusion, unsafe retries, or downstream harm. Metric definitions, windows, denominators, segmentation, and missing-data handling must be versioned.

## Review Roles

| Role | Accountable contribution |
|---|---|
| Request owner | Defines decision, scope, outcome, and non-goals |
| Evidence owner | Maintains authoritative source and currency |
| Research owner | Owns method, participants, analysis, and limitations |
| Rule author | Transforms evidence into a bounded proposal |
| Domain specialist | Decides governed questions within discipline |
| Evaluator | Tests applicability, fixtures, conflicts, and determinism |
| Approver | Accepts release scope and residual risk |
| Implementer | Maps approved record to product behavior |
| Operator | Monitors production behavior and incidents |
| Auditor | Reconstructs lineage and checks separation of duties |

One person may hold multiple roles only when the approval policy permits it and the conflict is recorded.

## Lifecycle and Lineage

Use the full chain:

`request → evidence → hypothesis → candidate → rationale → evaluation → decision → approval → implementation → build → release → observation → finding → correction or retirement`

Each record needs stable identity, version, owner, status, scope, locale, dependencies, source digest, effective and expiry dates, conflicts, approvals, and disposition.

## Rule Promotion

A concept becomes an approved rule only through:

`claim → synthesis → evidence classification → rule proposal → original fixtures → conflict/adverse review → accountable approval → versioned release`

Promotion requires current authority for anything that asserts law, policy, product behavior, accessibility, security, privacy, locale, or high-risk domain practice. Book evidence may motivate a proposal but cannot supply that authority.

## Versioning and Retirement

- Immutable released versions preserve replayability.
- Material logic, scope, severity, evidence, or output changes require a new version.
- Every new version records migration, compatibility, fixtures, and rollback.
- Expiry or invalidated evidence moves a rule to review, suspension, or retirement.
- Retirement preserves history, reason, successor, affected releases, and remediation status.

## Training and Learning Boundary

Generated candidates, accepted copy, user interactions, research recordings, reviewer decisions, and production outcomes do not become training, retrieval, examples, preferences, or new rules by use alone.

Any learning promotion requires purpose, authority, consent or other governing basis, rights, minimization, provenance, quality review, population scope, retention, deletion, security, bias/harm review, opt-out or nonuse behavior where required, and accountable approval.

## Failure Semantics

- `pass`: evidence proves the scoped gate.
- `fail`: evidence contradicts the gate.
- `unknown`: material evidence is missing, stale, conflicting, or out of scope.
- `not_applicable`: declared applicability conditions do not match.
- `specialist_review`: the decision requires governed expertise.
- `research_required`: the claim concerns an unobserved human outcome.

## Lineage

Transformed from **Operate content through lineage and lifecycle**, **Evaluate hard constraints before preferences**, **Evidence-strength classification**, **Competency and method map**, **Evaluation and escalation criteria**, **Remaining evidence gaps**, and **Promotion decision** in the cross-book synthesis. Proposal-only; implementation authority remains `none`.
