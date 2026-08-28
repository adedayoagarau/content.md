# Controls, Forms, and State Messaging Rules

Proposed constraints and contextual guidance for interaction content. The supplied books corroborate these rules but do not authorize automatic enforcement.

> Status: knowledge-layer proposal; no runtime authority.

## Hard Candidate Constraints

Eligible for deterministic enforcement only with approved product, component, evidence, and state contracts.

### CF-H01: Bind every control to an exact action

- Resolve the action actor, object, prerequisite, effect, result state, and reversibility.
- Reject a label that maps to the wrong transition or an unresolved destination.
- Do not hide a material cost, commitment, recipient, deletion, or disclosure outside the action contract.

### CF-H02: Ground input constraints

- Requiredness, allowed values, units, length, format, transformation, and dependencies must come from approved evidence.
- Do not reject names, addresses, identifiers, scripts, or formats merely because they differ from an unapproved default.
- Identify sensitive inputs and apply governed retention and display behavior.

### CF-H03: Make validation recoverable

- Bind each error to the affected field, group, or submission and the failed governed rule.
- State the supported correction or alternative route without blame.
- Preserve valid input across recoverable failures unless an approved security or privacy rule requires clearing it.

### CF-H04: Confirm only authoritative state

- A pre-action confirmation must preserve the object, actor, material consequence, and available reversal or exit.
- A post-action confirmation must match the authoritative result state.
- Never turn queued, pending, partial, or unknown work into “done,” “sent,” “paid,” or “complete.”

### CF-H05: Represent progress truthfully

- Distinguish loading, queued, processing, paused, partial, delayed, failed, and outcome-unknown states.
- Use percentages, counts, or time estimates only when current runtime evidence supports them.
- Provide an evidence-backed next step, cancellation behavior, resumption path, or recovery when material.

### CF-H06: Classify empty-state cause

- Match the message to a declared cause: first use, true absence, completed work, filtered result, no match, permission, unavailable data, loading, offline, or failure.
- Do not present an error or hidden filter as an empty collection.
- Offer only actions actually available in that state.

### CF-H07: Bind notifications to governed events

- Resolve trigger, recipient, sender/operator, purpose, channel, sensitivity, action, destination, expiry, and current item state.
- Do not claim delivery, reading, or completion from an earlier transport state.
- Respect approved consent, entitlement, preference, quiet-period, deduplication, privacy, and revocation rules.

### CF-H08: Preserve semantic and cross-mode parity

- Keep actor, object, state, consequence, timing, option set, and recovery consistent across visible label, accessible name, description, error, status, notification, and destination.
- Do not rely on color, icon, sound, motion, placeholder text, or position as the sole carrier of material meaning.
- Treat focus, keyboard, speech, live-announcement, and assistive behavior as runtime contracts requiring current authority and verification.

### CF-H09: Gate style behind interaction correctness

Do not rank brevity, warmth, personality, or persuasion while the action, input, state, recovery, consent, accessibility structure, or notification contract is failed or materially unknown.

## Deterministic Interpretation

| Check | `pass` | `fail` | `unknown` | `not_applicable` |
|---|---|---|---|---|
| Action mapping | Label resolves to allowed transition | Maps to different/prohibited transition | Action evidence missing | No control in scope |
| Constraint mapping | Input rule resolves to approved constraint | Candidate contradicts constraint | Authority or value set unresolved | No input in scope |
| Error binding | Error points to failed rule and recovery | Wrong field/rule/action | Failure origin unresolved | No failed validation |
| Result fidelity | Confirmation/status matches state | Overstates or contradicts state | State missing/conflicting | No result claim |
| Empty cause | Message equals declared absence cause | Conceals another cause | Cause not observable | No empty rendering |
| Notification binding | Event, recipient, channel, action resolve | Any binding contradicts contract | Consent/delivery/state unresolved | No notification |

`unknown` remains blocking when it could change meaning, consequence, authorization, safety, accessibility, consent, or recovery.

## Contextual Guidance

- Place guidance near the decision or input moment where it prevents avoidable work.
- Use specific, predictive control labels; judge specificity within the component’s accessible context.
- Layer material detail by consequence rather than using a universal word limit.
- Validate at a moment that helps correction without constant interruption; test timing with users.
- Use confirmation when commitment or consequence justifies it; prefer undo or review when those provide better agency.
- Make waiting, preserved work, and safe next steps visible during delays.
- Give first-use empty states orientation and a relevant start action; avoid forced promotion.
- Notify only when the event is sufficiently material, timely, actionable, and welcome for the intended recipient.

## Human, Research, and Specialist Checks

- **Human judgment**: label prediction, information hierarchy, proportional confirmation, error usefulness, and notification relevance.
- **Research dependent**: constraint comprehension, validation timing, recovery under stress, empty-state discoverability, notification welcome and actionability.
- **Specialist dependent**: accessibility semantics/behavior, locale adaptation, consent, privacy, security, regulated fields, warnings, and domain claims.
- **Runtime/product authority**: state, transition, validation rule, progress value, action effect, delivery semantics, destination, retention, and recovery.

## Internal Lineage

- Cross-book synthesis competencies 3, 5, 6, 8, and 10.
- Evidence-strength hard constraints and contextual heuristics.
- Mandatory abstention triggers for unknown state/action/reversibility, unsafe retry, missing consent/accessibility/locale authority, and omitted rights or alternatives.
