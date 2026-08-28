# Actions, Consequences, Agency, and Consent Knowledge

This pack models whether interface content helps a person understand and control a consequential action. It informs evaluation and repair; it does not authorize product behavior, policy, consent validity, or publication.

## Core Model

An action is reviewable only when the interaction resolves this chain:

`actor → available choice → object → effect → material consequence → resulting state → recovery or exit`

Consent adds a stricter chain:

`specific purpose → relevant information → freely available accept/refuse → recorded scope → ongoing control → revocation effect`

Copy cannot repair a product that lacks a real choice, a safe refusal path, or the promised control.

## Key Concepts

### Action contract

The evidence-backed relationship between a control and what the system will do.

- Name the action from the person's perspective.
- Resolve the actor and affected object.
- Distinguish immediate, queued, pending, partial, and completed effects.
- Do not infer behavior from a familiar label.

### Material consequence

An outcome that could reasonably change a person's decision, such as a charge, disclosure, commitment, loss, delay, eligibility change, or effect on another person.

- Present it before commitment, at the moment it can inform choice.
- Include timing, scope, recurrence, reversibility, and affected parties when material.
- Do not bury it in secondary text or reveal it only after action.

### Real agency

The person's practical ability to understand, choose, refuse, correct, stop, or recover without disproportionate penalty.

Agency is a property of the complete interaction, not a friendly tone or the presence of multiple buttons.

### Consent

A governed decision about a specific purpose and scope. Interface content can support consent but cannot establish its validity without policy, legal, privacy, accessibility, and product evidence.

Required interaction qualities include:

- specific and understandable purpose;
- relevant scope, recipient, duration, and consequence;
- an unpressured accept/refuse choice;
- no unrelated purposes bundled into one decision;
- inspectable status and an available revocation route;
- a stated effect of refusal and revocation.

### Refusal and exit

Declining, leaving, or stopping must be a genuine path. A refusal is not genuine when it is missing, misleadingly labeled, repeatedly obstructed, or coupled to an undisclosed penalty.

### Reversibility and remedy

- **Reversibility** restores the prior state, such as undoing a deletion.
- **Correction** changes an erroneous input or decision.
- **Remedy** addresses harm that cannot simply be reversed.
- **Appeal or escalation** transfers a disputed decision to an accountable route.

Do not label an action reversible unless runtime behavior and time limits support that claim.

## Evidence Boundary

### Deterministic inputs

These facts can support structural evaluation when supplied by approved records:

- actor, object, action effect, and resulting state;
- material consequences and when they occur;
- available options and option provenance;
- whether refusal, edit, undo, revoke, appeal, support, and exit routes exist;
- default and preselection state;
- recurrence, timing, recipients, and affected parties;
- authoritative product-state and policy references.

### Contextual judgments

These require contextual review or research:

- whether order or emphasis exerts disproportionate pressure;
- whether benefit framing is understandable and proportionate;
- whether a disclosed consequence is sufficiently prominent;
- whether the effort to refuse is meaningfully greater than acceptance;
- how vulnerability, prior effort, stress, or power affect the choice.

### Specialist decisions

Escalate consent validity, required disclosures, sensitive data use, statutory rights, regulated claims, safety, accessibility conformance, locale adaptation, and remedies. Book-derived guidance cannot decide them.

## Temporal Review

Evaluate the entire sequence:

1. **Before choice:** purpose, options, material facts, default state, affected parties.
2. **At commitment:** specific control label, consequence, final scope, correction opportunity.
3. **While processing:** pending state, cancellation rules, duplicate-action risk.
4. **After completion:** truthful result, retained control, receipt or record, undo/revoke/appeal.
5. **On return:** current status, changed terms, expiry, and how to stop.

## Failure Semantics

- `pass`: all applicable structural requirements are evidenced and satisfied.
- `fail`: authoritative evidence proves a required control or disclosure is absent or contradicted.
- `unknown`: a missing fact could change choice, consequence, consent, or recovery.
- `not_applicable`: the rule's declared conditions do not match the interaction.
- `specialist_review`: a governed judgment lies outside deterministic authority.

Hard failure or material unknown blocks stylistic ranking and decision-ready drafting.

## Common Misconceptions

- **“The user clicked, so they consented.”** A click proves an event, not informed or freely made consent.
- **“Two buttons create a choice.”** Both controls may lead to the same result or one path may be obstructed.
- **“A confirmation dialog makes an action safe.”** Repetition without material information adds friction, not understanding.
- **“Positive language makes persuasion acceptable.”** Warmth cannot cure pressure, concealment, or a missing refusal.
- **“Undo always solves harm.”** Some effects are external, delayed, shared, or irreversible and require remedy.

## Lineage

Transformed from the cross-book synthesis sections **Convergent competency map** (1, 3–6, 10), **Contradiction-preserving pattern matrix** (Persuasion, Choice reduction, Personalization, Error prevention, Delight/habit), **Evidence-strength classification**, **Evaluation and escalation criteria**, and **Mandatory abstention or escalation**. The six-book corpus supplies practitioner evidence only; implementation authority remains `none`.
