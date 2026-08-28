# Context, Actors, Evidence, and Product-State Rules

Proposed constraints and guidance for grounded UX-content review. Books corroborate these rules but do not independently authorize enforcement.

> Status: knowledge-layer proposal; no runtime authority.

## Hard Candidate Constraints

These are eligible for deterministic enforcement only when the governing sources, state model, and rule scope are approved.

### CTX-H01: Do not invent material context

Do not create a product fact, policy, state, actor, capability, source, timing, recipient, consequence, or recovery path that is absent from approved evidence.

- Missing material evidence produces `unknown`, not a guessed value.
- The result must name the exact evidence required to continue.

### CTX-H02: Bind claims to evidence

Every material proposition must resolve to at least one in-scope, current evidence item.

- Reject circular support, such as treating the string under review as proof of itself.
- Preserve source scope, qualifications, confidence, effective dates, and conflicts.

### CTX-H03: Resolve material actors and referents

Identify the speaker/operator and each distinct action actor, subject, recipient, owner, affected party, accountable organization, and recovery owner when applicable.

- Pronouns and role words must resolve unambiguously within the declared scope.
- A human, automated, retrieved, generated, or hybrid turn must not be mislabeled.

### CTX-H04: Match authoritative product state

Do not declare success, failure, charge, deletion, publication, delivery, safety, or completion unless the authoritative state supports that proposition.

- `pending`, `partial`, and `outcome_unknown` must not be expressed as terminal states.
- Stale or conflicting state evidence yields `unknown` or escalation.

### CTX-H05: Validate action transitions

An action label or instruction must map to a defined transition with an actor, object, prerequisite, effect, result state, and known reversibility.

- Do not imply that a control can perform an unsupported transition.
- Do not hide a material consequence in surrounding content.

### CTX-H06: Preserve semantic invariants

A repair or rewrite must preserve approved actor, fact, certainty, commitment, option set, consequence, destination, timing, state, and remedy.

- Any intentional invariant change requires a new semantic decision and authority.
- Style improvement cannot compensate for semantic drift.

### CTX-H07: Preserve material uncertainty

When the product does not know an outcome, the content must communicate the bounded uncertainty and safe next step supported by evidence.

- Do not convert uncertainty into optimism, blame, or unconditional retry.
- If retry safety is unknown, request transaction or system evidence before recommending retry.

### CTX-H08: Gate expression behind hard planes

Do not score tone, charm, brevity, or distinctiveness while truth, evidence, state, action, actor, consequence, or recovery is failed or materially unknown.

## Deterministic Interpretation

| Check | `pass` | `fail` | `unknown` | `not_applicable` |
|---|---|---|---|---|
| Required context | All scoped required fields present | Required field explicitly contradicts scope | Requirement known, value missing/conflicting | Field excluded by approved scope |
| Evidence binding | Every material proposition has valid support | Proposition conflicts with approved support | Support absent, stale, or authority unresolved | Proposition is non-material for scope |
| Actor resolution | Every material role resolves uniquely | Candidate assigns wrong actor | Role or referent unresolved | Role does not exist in scenario |
| State fidelity | Candidate equals approved current state | Candidate contradicts state | State is missing/conflicting | No state claim is made |
| Transition validity | Action maps to allowed transition | Action maps to prohibited/different transition | Transition evidence missing | No action is offered |
| Invariants | Structured values are preserved | At least one invariant changes | Free-language equivalence unresolved | No rewrite comparison exists |

`unknown` is never silently coerced to `pass` or `fail`.

## Contextual Guidance

These recommendations require context and counterexample review; they are not universal hard rules.

- Start with the user purpose, prior effort, and desired outcome before drafting.
- Prefer concrete actors, verbs, objects, and consequences when they reduce ambiguity.
- Include predecessor, current state, next allowed state, and recovery for consequential interactions.
- Layer evidence-backed detail by moment and risk rather than optimizing for a universal length.
- Treat personas, stakeholder summaries, analytics, and existing copy as hypotheses or secondary evidence until their scope is established.
- Test actor and state interpretation in shared-account, delegated, interrupted, and adverse contexts.

## Human, Research, and Specialist Review

- **Human judgment**: Determine materiality, adequate contextual detail, clarity of a free-language referent, and whether a proposed invariant is correctly modeled.
- **Research dependent**: Validate population interpretation, task comprehension, and behavior under stress or interruption.
- **Specialist dependent**: Validate claims and state implications involving law, policy, medicine, finance, safety, privacy, security, accessibility, or locale.
- **Product authority dependent**: Approve sources, state transitions, action effects, timing, ownership, and operational recovery.

## Exceptions

- A low-risk preference may remain unspecified if it cannot change meaning, action, consequence, accessibility, or recovery; record it as a non-blocking unknown.
- A pronoun may be used when its referent is unique in the declared interaction scope; the underlying actor map is still required for consequential actions.
- An intentionally generalized status may be acceptable when approved evidence proves that greater precision is unavailable and the generalization preserves all material facts.

## Internal Lineage

- Cross-book synthesis competencies 1–4 and 10.
- Evidence-strength sections: Hard constraints and Contextual heuristics.
- Mandatory abstention triggers covering unknown state, unresolved authority, conflicting goals, unsafe retry, and unsupported roles.
