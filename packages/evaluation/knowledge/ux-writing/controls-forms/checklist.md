# Controls, Forms, and State Messaging Checklist

Use for a complete form or stateful interaction, not an isolated string. Record `pass`, `fail`, `unknown`, or `not_applicable` with evidence.

> Status: proposal-only review aid; no runtime or publication authority.

## Controls

- [ ] Every control resolves to an approved action, actor, object, prerequisite, effect, and result state.
- [ ] The label predicts the action within its accessible component context.
- [ ] Duplicate labels do not lead to different destinations or transitions in scope.
- [ ] Material cost, commitment, recipient, disclosure, deletion, timing, and reversibility appear before action.
- [ ] Available inspect, edit, decline, cancel, undo, revoke, appeal, or alternate controls match approved agency requirements.

## Inputs and Guidance

- [ ] Field purpose, data owner, allowed values, requiredness, format, unit, transformation, and dependency have authoritative sources.
- [ ] Constraint rules do not encode unsupported assumptions about language, identity, address, name, phone, date, or culture.
- [ ] Required and optional status is explicit and consistent across modes.
- [ ] Guidance appears where it can prevent avoidable work and does not replace a persistent programmatic label.
- [ ] Sensitive-input display, retention, clearing, and correction follow approved privacy and security rules.

## Validation and Recovery

- [ ] Each error binds to the affected field, group, or submission and a governed rule.
- [ ] The message states a supported correction or alternative without blame.
- [ ] Valid input remains available after recoverable failure unless an approved rule requires clearing it.
- [ ] Summary, focus, keyboard, speech, and announcement behavior are specified and runtime-verified where applicable.
- [ ] Retry appears only when the outcome and retry safety are known.

## Confirmation and Commitment

- [ ] Pre-action review identifies object, actor, material consequence, and reversal or exit.
- [ ] Post-action confirmation matches authoritative state and certainty.
- [ ] Queued, pending, partial, or unknown work is not presented as complete.
- [ ] Receipt, timing, correction, undo, next step, and recovery are included where material and supported.
- [ ] Confirmation is proportionate; an approved undo or review pattern is considered when it offers better agency.

## Loading and Progress

- [ ] Loading, queued, processing, paused, delayed, partial, failed, and outcome-unknown states are distinguished.
- [ ] Percentages, counts, and time estimates derive from current runtime evidence.
- [ ] Status is not conveyed only by animation, icon, color, sound, or position.
- [ ] Safe navigation away, cancellation, resumption, preserved work, and re-entry behavior are accurate where applicable.
- [ ] Accessible status and focus behavior are tested in the rendered product, not inferred from copy.

## Empty States

- [ ] Absence is classified as first use, true empty, completed, filtered, no match, permission, unavailable, loading, offline, or failure.
- [ ] The message matches the observable cause and does not conceal existing data.
- [ ] Counts, filters, permission boundaries, and state-changing events are accurate.
- [ ] Offered actions are available, relevant, and non-coercive.
- [ ] First-use orientation and re-entry guidance are tested for comprehension where material.

## Notifications

- [ ] Trigger, recipient, sender/operator, purpose, materiality, channel, sensitivity, and current state resolve.
- [ ] Consent or service entitlement, preferences, quiet periods, frequency, deduplication, and revocation follow approved policy.
- [ ] The message does not disclose more than the verified channel and recipient allow.
- [ ] Action, destination, authentication, expiry, and re-entry state are current and operable.
- [ ] Queued, delivered, displayed, opened, and acted-on states are not conflated.
- [ ] Timing, welcome, interruption cost, and actionability are validated with intended and adversely affected populations.

## Deterministic Gates

| Gate | Pass evidence | Blocking result |
|---|---|---|
| Reference integrity | Control/input/event references resolve uniquely | `fail` or material `unknown` |
| Action fidelity | Label maps to approved transition | `fail` |
| Constraint fidelity | Rule maps to approved value contract | `fail` or specialist escalation |
| State fidelity | Confirmation/progress/empty copy matches state | `fail` or material `unknown` |
| Recovery presence | Required correction/alternative reference resolves | `fail` |
| Cross-mode parity | Structured invariants match across projections | `fail` or runtime escalation |

## Review Boundaries

- [ ] **Human judgment** reviews label prediction, hierarchy, proportionality, and usefulness.
- [ ] **Research** tests comprehension, validation timing, recovery, interruption, and notification actionability.
- [ ] **Specialists** review accessibility, locale, consent, privacy, security, regulated inputs, and domain claims.
- [ ] **Runtime/product authority** verifies state, transitions, values, delivery semantics, focus, announcements, preservation, and destinations.

## Stop Conditions

- An action effect, recipient, consequence, result, reversibility, or recovery is unknown.
- A field constraint lacks product/domain/locale authority.
- A pending or unknown outcome is presented as final or paired with unsafe retry.
- An empty state may actually be failure, loading, hidden filters, or missing permission.
- A notification lacks resolved consent/entitlement, recipient, sensitivity, current destination, or state.
- Accessibility or localized behavior is claimed from text alone without current contract and runtime evidence.

## Internal Lineage

- Cross-book synthesis competencies 3, 5, 6, 8, and 10.
- Deterministic, specialist-reviewed, and research-dependent evaluation criteria.
- Mandatory abstention and escalation triggers.
