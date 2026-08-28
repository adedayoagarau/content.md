---
topic: errors-uncertainty-recovery-remedy
status: proposal-only
implementation_authority: none
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-6
  - ux-writing-cross-book-synthesis-2026-08-26.md#evidence-strength-classification
  - ux-writing-cross-book-synthesis-2026-08-26.md#evaluation-and-escalation-criteria
---

# Errors, Uncertainty, Recovery, and Remedy Knowledge

This pack treats failure content as an interface contract: it must represent the current state faithfully and help the person reach a safe, available outcome. It does not authorize product behavior, policy, support commitments, or publication.

## Core model

An error experience is complete only when the interface can answer the applicable questions:

1. **State** — What happened, and what state is the task in now?
2. **Certainty** — Which facts are confirmed, unknown, pending, or inferred?
3. **Impact** — What changed, what did not, and what work or value is at risk?
4. **Responsibility** — Which system, organization, dependency, policy, or person owns the next step?
5. **Recovery** — What safe action is available now?
6. **Alternative** — What route remains if the primary recovery fails or is unavailable?
7. **Timing** — When should the person wait, retry, check again, or expect help?
8. **Remedy** — How can harm be corrected, reversed, appealed, refunded, restored, or escalated?

Tone is an expression layer over this contract. Warm wording cannot compensate for absent recovery or an inaccurate state.

## Failure taxonomy

| Failure class | Diagnostic question |
|---|---|
| Input or validation | Is the value invalid, incomplete, ambiguous, or only unsupported by the interface? |
| Authentication or permission | Is identity unverified, a session expired, or authority missing? |
| Eligibility or policy | Which governed criterion prevents progress, and is review or appeal available? |
| Conflict or concurrency | Did another actor, version, or process change the object? |
| Network or dependency | Is the request unsent, interrupted, delayed, or rejected downstream? |
| Service or capacity | Is the service unavailable, overloaded, rate-limited, or under maintenance? |
| Data, model, or inference | Is the result unavailable, low-confidence, unsupported, or inconsistent? |
| Transaction | Is the outcome failed, pending, partial, duplicated, or unknown? |
| Content or source | Is required information missing, stale, contradictory, or unauthoritative? |
| Organization or human handling | Is a manual process delayed, incomplete, or incorrectly performed? |
| Security, privacy, or safety incident | Is protective action or specialist incident handling required? |

The class constrains the recovery. For example, a validation failure may permit immediate correction, while an unknown transaction outcome may make immediate retry unsafe.

## State and certainty

Do not collapse these states into a generic failure:

| State | Meaning | Typical next-step constraint |
|---|---|---|
| Failed | Authoritative evidence says the action did not complete | Retry only if retry is safe and available |
| Pending | Processing is still active | Give timing and a status route; avoid duplicate submission |
| Unknown | Completion cannot be established | Preserve ambiguity; reconcile before retry when duplication could harm |
| Partial | Some effects completed and others did not | Name completed and incomplete effects separately |
| Duplicate | The effect may have occurred more than once | Stop further attempts and provide correction or support |
| Blocked | A known prerequisite or rule prevents progress | Explain the condition and available correction, review, or appeal |

## Recovery and remedy

**Recovery** resumes or safely exits the task. Examples include correcting an input, reconnecting, checking status, using another verified route, saving work, or contacting an accountable team.

**Remedy** addresses an adverse consequence that already occurred. Examples include undo, restoration, reversal, refund, correction, appeal, incident response, and formal escalation.

Recovery must be operable, not merely described. A control must map to a real action available in the current state, and its label must predict the effect.

## Evidence boundaries

### Deterministic candidates

When scoped authoritative data exists, machines can check required fields, known-state consistency, retry-safety declarations, presence of required recovery controls, action-to-transition mappings, approved terminology, and semantic invariant preservation.

### Specialist-reviewed

Legal, medical, financial, safety, privacy, security, regulated-policy, accessibility-runtime, and locale-specific error experiences require appropriate authority. The system may identify the need; it must not invent the decision.

### Research-dependent

Comprehension under stress, recovery success, discoverability, trust calibration, and effects on low-frequency high-consequence populations require observation with the intended people and rendered product.

### Preference-only

Warmth, rhythm, charm, humor, and stylistic economy are considered only after state, safety, material information, agency, recovery, and remedy pass.

## Common misconceptions

- **“An apology fixes a bad error.”** An apology may acknowledge impact; it does not restore work or supply a next step.
- **“Retry is always helpful.”** Retry can duplicate a charge, submission, message, booking, or deletion when the first outcome is unknown.
- **“Errors belong to users.”** Failures may originate in the interface, organization, dependency, policy, data, or operation.
- **“We should hide uncertainty.”** False certainty can cause unsafe action. Bounded uncertainty plus a reconciliation path is more useful.
- **“Shorter is clearer.”** Removing state, consequence, timing, or recovery can make a short message materially incomplete.

## Related packs

- Context and product state determine what the interface may claim.
- Actions and agency determine whether retry, dismissal, or escalation is safe and voluntary.
- Accessibility and localization determine whether status and recovery remain perceivable, operable, and semantically equivalent.
- Voice and tone govern expression only after the recovery contract is sound.
