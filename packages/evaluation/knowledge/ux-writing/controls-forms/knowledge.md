# Controls, Forms, and State Messaging Knowledge

Concepts for reviewing controls, inputs, validation, confirmations, progress, empty states, and notifications as parts of a temporal interaction.

> Status: transformed practitioner knowledge; proposal-only, with no runtime or policy authority.

## Overview

A form is a sequence of commitments, not a collection of field labels. Content must help a person predict what a control does, provide valid information, understand current state, recover without losing work, and recognize when an outcome remains incomplete or unknown.

Determinism comes from comparing structured content with approved component, state, action, constraint, and notification contracts. Wording alone cannot prove focus behavior, announcements, delivery, consent, validation correctness, or product state.

## Key Concepts

### Control contract

**Definition**: The governed mapping between a control’s accessible name, actor, object, action, prerequisites, consequence, result state, and recovery.

A label should predict the action within its component scope. Surrounding content may carry detail, but it cannot contradict or conceal material consequences.

### Input contract

**Definition**: The information a field accepts and the conditions under which that information is valid.

It includes purpose, data owner, allowed values, requiredness, format, units, examples, privacy sensitivity, transformation, retention, and correction. Product and domain evidence—not a convenient input mask—determine valid diversity.

### Validation event

**Definition**: A check of supplied information against an approved input or domain rule at a declared interaction moment.

Validation may occur during entry, on field exit, on submission, or after an external check. The event must not be represented as a final business or policy decision unless it is one.

### Confirmation

**Definition**: A pre-action review or post-action acknowledgement tied to a specific state transition.

Pre-action confirmation supports informed commitment. Post-action confirmation reports only the state the product can prove and provides a receipt, correction, undo, or next step when applicable.

### Progress state

**Definition**: A non-terminal state that communicates ongoing, queued, delayed, partial, paused, or outcome-unknown work.

Progress can be determinate or indeterminate. Percentages and time estimates are claims requiring runtime evidence; animation alone is not status content.

### Empty state

**Definition**: A rendered absence whose cause is explicitly classified.

Possible causes include first use, completed work, filters, search with no matches, missing permission, unavailable data, loading, offline state, failure, or true absence. These causes must not share a misleading generic message.

### Notification contract

**Definition**: A governed event-to-message relationship across a channel and time boundary.

It includes trigger, recipient, sender/operator, purpose, materiality, sensitivity, channel, consent or entitlement, delivery semantics, action, destination, expiry, deduplication, quiet-period behavior, and re-entry state.

### Recovery-preserving input

**Definition**: User-provided data retained or reconstructable after a recoverable validation or service failure, subject to approved privacy and security rules.

Preservation reduces repeated effort but is not universal: sensitive values, shared devices, or security controls may require deliberate clearing.

## Interaction Sequence

`orientation → input → validation → review → commitment → processing → result → recovery or closure`

Each visible message belongs to a state in this sequence. A candidate is incomplete when it omits the predecessor, current state, allowed next action, result state, or recovery needed to interpret it.

## Deterministic, Judgment, and Authority Boundaries

| Concern | Deterministic with governed inputs | Requires more authority |
|---|---|---|
| Control label | Resolves to declared action/object and is not duplicated in scope | User comprehension and prediction research |
| Field contract | Required metadata, term, unit, and constraint identifiers exist | Product/domain approval of valid values |
| Validation | Error maps to failed rule and recovery action | Timing, cognitive burden, and population validity research |
| Confirmation | Expressed state equals authoritative result | Whether confirmation is proportionate and usable |
| Progress | State and numeric value match runtime evidence | Runtime behavior, timing, and accessible announcement verification |
| Empty state | Declared cause matches rendered state | Helpfulness and next-action research |
| Notification | Trigger, recipient, channel, action, and destination references resolve | Consent, privacy, platform, locale, and delivery authority |

## Common Misconceptions

- **Myth**: A short button label is automatically clear.
  **Reality**: Clarity depends on the action, object, component scope, and consequence.
- **Myth**: “Invalid input” explains a form error.
  **Reality**: A recoverable message identifies the affected value, failed rule, and supported correction.
- **Myth**: A spinner proves work is progressing.
  **Reality**: It may only prove that an animation is running.
- **Myth**: “No results” is a safe universal empty state.
  **Reality**: It can conceal filters, permissions, loading, connectivity, or failure.
- **Myth**: Sending a notification proves delivery or attention.
  **Reality**: Queued, delivered, displayed, opened, and acted-on are distinct states.

## Internal Lineage

- Cross-book synthesis: temporal interaction, real agency, error and recovery, accessibility/localization, hard-before-preference evaluation.
- Pattern matrix: choice reduction, error prevention, persuasion, personalization, and brevity.
- Competency map: Interaction writing, Accessibility, Localization, Evaluation.
