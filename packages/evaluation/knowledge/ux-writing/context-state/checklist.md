# Context, Actors, Evidence, and Product-State Checklist

Use before stylistic review, candidate generation, or repair. Record every item as `pass`, `fail`, `unknown`, or `not_applicable`; never treat unchecked as passed.

> Status: deterministic review design aid; no runtime or publication authority.

## 1. Scope and Context

- [ ] The target content and component or surface are identified.
- [ ] The user purpose, prior event or effort, and desired outcome are recorded.
- [ ] The organization purpose and any known conflict with user or public outcomes are recorded.
- [ ] Channel, modality, journey stage, predecessor, and current runtime state are identified.
- [ ] Risk, affected parties, locale, accessibility context, and operational capacity are scoped where material.
- [ ] Assumptions, prohibited inferences, and open questions are explicit.

## 2. Actors and Referents

- [ ] Speaker and operator are identified and distinguished where necessary.
- [ ] Human, deterministic, retrieved, generated, or hybrid origin is truthful.
- [ ] User actor, delegate, subject, recipient, owner, and affected party resolve where applicable.
- [ ] Decision authority, accountable organization, and recovery owner resolve.
- [ ] Every material “we,” “I,” “you,” “your,” “my,” “it,” “this,” and role label has one in-scope referent.
- [ ] Shared, delegated, guardian, household, and multi-organization cases have been considered.

## 3. Evidence and Claims

- [ ] Each material proposition is enumerated independently of its wording.
- [ ] Each proposition resolves to an approved evidence identifier.
- [ ] Source type, owner, scope, currency, confidence, qualifications, and conflicts are preserved.
- [ ] No candidate, existing string, model output, persona, metric, or stakeholder preference is treated as self-validating truth.
- [ ] Missing, stale, conflicting, or out-of-scope evidence is recorded as an evidence gap.
- [ ] Legal, policy, medical, financial, safety, privacy, security, accessibility, and locale claims are routed to appropriate authority.

## 4. Product State and Transitions

- [ ] Current state comes from an authoritative source for the relevant entity and time.
- [ ] Candidate content does not overstate certainty or turn an intermediate state into a terminal one.
- [ ] Every offered action has a defined actor, object, prerequisite, effect, and result state.
- [ ] Material consequence, recipient, timing, reversibility, and recovery are represented.
- [ ] Partial and unknown outcomes remain explicit.
- [ ] Retry is recommended only when product evidence establishes that it is safe.

## 5. Semantic Invariants

- [ ] Required actor, fact, certainty, commitment, option set, consequence, destination, state, timing, and remedy are declared.
- [ ] Each candidate expression maps to the same declared invariants.
- [ ] Any changed invariant is treated as a new semantic decision, not a wording improvement.
- [ ] Material information has not been removed for brevity, warmth, or scannability.
- [ ] Expression scoring remains blocked while a hard plane is failed or materially unknown.

## Deterministic Gates

| Gate | Machine-checkable with governed inputs | Stop condition |
|---|---|---|
| Completeness | Required paths and identifiers exist | Material required input missing |
| Reference integrity | Actor, evidence, state, and action references resolve uniquely | Missing, duplicate, or cyclic reference |
| Evidence validity | Scope/status/effective dates satisfy declared rule | Unsupported or stale material proposition |
| State fidelity | Structured proposition matches authoritative state mapping | Contradictory or overstated state |
| Transition validity | Action maps to allowed transition | Unsupported action or result |
| Invariant equality | Candidate structured values equal approved invariants | Material invariant changed |

## Judgment and Escalation Gates

- [ ] **Human judgment** confirms materiality, free-language equivalence, hierarchy, and adequate context.
- [ ] **Research** validates interpretation with intended and adversely affected populations when misunderstanding could matter.
- [ ] **Specialists** validate domain, accessibility, privacy, security, locale, or policy sufficiency where applicable.
- [ ] **Product authority** validates runtime state, action effect, timing, operator, and recovery behavior.

## Required Outcome

- **Proceed to expression review** only when all material deterministic gates pass and required authorities are resolved.
- **Repair brief** when a supported correction can preserve all invariants; include failed rule, consequence, required evidence, and acceptance criteria.
- **Abstain** when missing context could change truth, state, action, consent, consequence, safety, accessibility, authorization, or recovery.
- **Escalate** when evidence conflicts or specialist/product authority must decide.
- **Not applicable** only with an explicit scoped reason.

## Red Flags

Stop and address:

- Unsupported success, failure, charge, deletion, publication, delivery, or safety language.
- A material pronoun or role with multiple possible actors.
- A pending, partial, or unknown outcome expressed as final.
- Existing or generated copy used as its own source.
- A proposed action whose effect, recipient, reversibility, or recovery is unknown.
- Style scoring offered despite a failed or unknown hard plane.

## Internal Lineage

- Cross-book synthesis competencies 1–4, 9, and 10.
- Evaluation criteria: Deterministic candidates, Specialist-reviewed criteria, Research-dependent criteria.
- Mandatory abstention or escalation section.
