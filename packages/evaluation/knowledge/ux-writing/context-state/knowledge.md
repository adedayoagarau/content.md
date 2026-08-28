# Context, Actors, Evidence, and Product-State Knowledge

Concepts for deciding whether UX content has enough grounded context to be reviewed or repaired safely.

> Status: transformed practitioner knowledge. This file has no runtime or policy authority.

## Overview

UX content is an expression of a product interaction, not an isolated string. A review must first establish who is involved, what the product actually knows, which source supports each material claim, and what state transition an action can cause.

The deterministic opportunity is structural: the system can require explicit fields, resolve references, compare content with approved state, and return `unknown` when evidence is missing. It cannot infer product truth, policy, human intent, or legal sufficiency from wording.

## Key Concepts

### Context envelope

**Definition**: The bounded set of facts needed to interpret a UX-content target.

It includes the population, purpose, surface, channel, journey stage, current state, prior event, available actions, risk, locale, accessibility context, and authoritative sources.

**Key points**:
- Context is material when changing it could change meaning, consequence, consent, safety, authorization, or recovery.
- Missing low-risk style preferences may remain explicit unknowns; missing material context blocks a decision-ready candidate.

### Actor map

**Definition**: A typed account of every party who speaks, acts, owns, receives, decides, or is affected.

Useful roles include speaker, operator, user actor, delegate, subject, recipient, owner, affected party, accountable organization, and recovery owner. One person may hold several roles; one label must not silently collapse distinct parties.

### Evidence item

**Definition**: A scoped, attributable source that supports a proposition or state assertion.

Evidence needs an identifier, owner or authority, scope, currency, status, and the proposition it supports. A generated candidate, stakeholder preference, analytics correlation, or existing interface string is not automatically product truth.

### Proposition

**Definition**: A normalized claim the interface communicates, independent of wording.

Examples include “the transfer is queued,” “the owner can cancel,” or “the document will be deleted after 30 days.” Separating propositions from expression allows the evaluator to detect meaning changes beneath fluent rewrites.

### Product state

**Definition**: An authoritative representation of what is known about the interaction at a specific time.

A state model includes the current state, prior state or triggering event, allowed transitions, transition actor, effect, certainty, timing, and recovery. `submitted`, `processing`, `completed`, `failed`, and `outcome_unknown` are materially different.

### Semantic invariant

**Definition**: A material meaning that every acceptable expression must preserve.

Actors, facts, certainty, commitment, option set, consequence, destination, state, timing, and remedy are common invariants. Changing one requires a new semantic decision, not a style edit.

### Material unknown

**Definition**: Missing or conflicting information that could alter a claim, action, consequence, right, safety outcome, or recovery path.

A material unknown produces abstention or escalation plus a precise evidence request. It must not be converted into reassuring language.

## Terminology

| Term | Definition |
|---|---|
| Authoritative state | State supplied by an approved system or accountable owner for the relevant scope and time |
| Claim source | Evidence item that supports a proposition |
| Referent | The resolved entity denoted by “we,” “you,” “your,” “it,” or another expression |
| State transition | An allowed change from one known state to another caused by an identified event or actor |
| Evidence gap | Required support that is missing, stale, conflicting, or out of scope |
| Evidence laundering | Presenting weak, inferred, generated, or circular support as authoritative fact |
| Decision-ready | Supported well enough for the stated review scope; not publication authority |

## What Can Be Deterministic

| Plane | Deterministic when inputs are governed | Boundary |
|---|---|---|
| Completeness | Required fields and identifiers exist | Cannot decide whether omitted facts are harmless without a risk model |
| Reference resolution | Actor, source, and state references resolve uniquely | Cannot invent the intended referent |
| State fidelity | Candidate state equals approved state | Cannot establish whether the approved source is correct |
| Transition validity | Action maps to an allowed transition | Cannot authorize a transition absent product evidence |
| Invariant preservation | Structured candidate values equal required invariant values | Free-language equivalence may require human review |
| Currency | Evidence is within its declared effective period | Cannot choose an appropriate validity period generically |

## Human and Specialist Boundaries

- **Human judgment**: Is the context sufficient for a low-risk stylistic review? Is a referent understandable to the intended population? Does the hierarchy communicate the right emphasis?
- **Research dependent**: Will the population interpret the claim, actor, or transition correctly under realistic conditions?
- **Specialist dependent**: Does the evidence establish legal, medical, financial, safety, privacy, security, accessibility, locale, or policy sufficiency?
- **Product authority dependent**: Is the state model, action effect, timing, recipient, or recovery path true in the running product?

## Common Misconceptions

- **Myth**: Existing interface copy proves product behavior.
  **Reality**: It is a candidate expression until linked to authoritative state and action evidence.
- **Myth**: A confident sentence is a complete claim.
  **Reality**: Confidence in expression cannot fill a source, actor, scope, or currency gap.
- **Myth**: “You” and “we” are always clear in product content.
  **Reality**: Delegated, shared, household, and multi-organization contexts make referents material.
- **Myth**: An evaluator can turn `unknown` into the most likely state.
  **Reality**: Material uncertainty must remain visible and block unsupported outcomes.

## Internal Lineage

- Cross-book synthesis: “Frame the problem before drafting”; “Treat meaning and expression as separate”; “Design the whole temporal interaction”; “Make claims, actors, and responsibility explicit.”
- Competency map: Problem framing, Semantic modeling, Interaction writing, Evaluation.
- Evidence classification: Hard constraints, Contextual heuristics, Mandatory abstention or escalation.
