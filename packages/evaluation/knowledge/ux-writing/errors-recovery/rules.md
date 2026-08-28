---
topic: errors-uncertainty-recovery-remedy
status: proposal-only
implementation_authority: none
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-6
  - ux-writing-cross-book-synthesis-2026-08-26.md#hard-constraints
  - ux-writing-cross-book-synthesis-2026-08-26.md#mandatory-abstention-or-escalation
---

# Errors, Uncertainty, Recovery, and Remedy Rules

These are candidate checks for governed implementation. Book synthesis alone does not activate enforcement.

## Deterministic hard-rule candidates

### ER-H01 — Do not contradict authoritative state

The message must not call an action successful, failed, charged, delivered, deleted, or published unless the scoped source establishes that state.

- If the state is pending, say pending.
- If the state is unknown, preserve uncertainty.
- If effects are partial, name the completed and incomplete effects separately.

### ER-H02 — Do not recommend unsafe retry

When the prior outcome is unknown and another attempt could duplicate material harm, do not present retry as the next action.

- Material duplication includes charges, transfers, submissions, bookings, messages, prescriptions, publication, or destructive changes.
- Provide a status or reconciliation path before a new attempt.
- If retry safety is not established, return `unknown` and request evidence.

### ER-H03 — Name the recoverable problem

For a known failure, state the condition at the narrowest supported level needed to act. Do not infer a cause the evidence does not establish.

### ER-H04 — Preserve work and value

When the system retains input, progress, funds, files, or selections, say so only if verified. When preservation is required but cannot be verified, escalate rather than promise it.

### ER-H05 — Provide an operable next action

A consequential blocked or failed state requires at least one real, available recovery action or an explicit escalation because none exists.

- The control label must predict its effect.
- The action must be valid for the current actor, permission, state, channel, and locale.
- Instructions must not shift an organization-owned failure onto the person.

### ER-H06 — Provide a fallback for consequential tasks

If the primary recovery can fail or remain unavailable, expose an applicable alternative, human route, appeal, or safe exit when one is required by policy or product evidence.

### ER-H07 — State timing when time changes behavior

If waiting, expiry, processing, lockout, or support response time affects the next safe action, provide the authoritative interval or admit that timing is unavailable.

### ER-H08 — Separate recovery from remedy

If harm already occurred, task resumption alone is insufficient. Surface the authorized correction, reversal, restoration, refund, appeal, incident, or escalation route.

### ER-H09 — Keep responsibility truthful

Identify the accountable operator or team when responsibility affects action. Do not use “we,” “I,” or “you” without a resolved referent, and do not blame the person for system or organization failure.

### ER-H10 — Block style scoring on hard failure

Do not let warmth, brevity, voice, humor, or reassurance select a candidate that fails state accuracy, retry safety, material information, recovery, or remedy.

## Deterministic evaluation outcomes

| Outcome | Use when |
|---|---|
| `pass` | Required evidence is present and the rule is satisfied |
| `fail` | Evidence establishes a contradiction or missing required behavior |
| `unknown` | Material evidence is absent or conflicting |
| `not_applicable` | The rule's declared conditions do not apply |

Each result should include rule ID, input evidence references, reason code, and repair requirement. Identical canonical inputs and rule versions should produce identical results and ordering.

## Contextual guidance

- Lead with the state and the safest useful next step; add cause only when supported and actionable.
- Use concrete actors, actions, objects, and consequences.
- Put corrective guidance near the affected control and preserve entered values where the product supports it.
- Layer technical detail behind task-level guidance unless the detail changes the decision.
- Acknowledge disruption proportionately; avoid cheerful or dramatic language in consequential states.
- Prefer prevention, reversible action, and early status over polishing downstream error text.

These are review prompts, not universal string formulas.

## Mandatory specialist escalation

Escalate rather than produce a decision-ready candidate when:

- the remedy depends on legal, medical, financial, safety, privacy, security, or regulated-policy authority;
- a denial, eligibility decision, consent flow, incident, or high-risk warning lacks an approved appeal or support contract;
- accessible announcement, focus, or assistive behavior cannot be verified in the rendered interface;
- locale-specific rights, timing, terminology, or cultural interpretation are unresolved;
- an accountable owner for correction or incident response is missing.

## Research and preference criteria

Research must determine whether intended people notice, understand, and successfully use recovery under realistic stress, interruption, repetition, and adverse conditions. Only after hard rules pass may reviewers compare tone, warmth, cadence, concision, or brand distinctiveness.
