# Controls, Forms, and State Messaging Smells

Review signals for controls and temporal interaction content. A smell prompts investigation; governed context determines the outcome.

## CF-S01: Generic Action Label

**What it is**: A control such as “Continue,” “Submit,” “Yes,” or “Done” does not predict its material action in scope.

**Detection**:
- Label lacks an action or object and accessible context does not supply it.
- Duplicate labels lead to different transitions.
- Surrounding copy conceals a cost, commitment, disclosure, or deletion.

**Impact**: Users cannot anticipate the transition or distinguish controls.

**Repair**: Map the exact action and object; expose material consequence before commitment.

**Synthetic pair**: “Continue” → “Send application to Harbor Housing.”

## CF-S02: Constraint Without Authority

**What it is**: A field restricts values based on implementation convenience or assumed norms rather than an approved input contract.

**Detection**:
- Hard-coded English-only, fixed-length, casing, punctuation, date, phone, address, gender, or name assumptions lack evidence.
- Placeholder examples are treated as the only valid format.

**Impact**: Valid people or data are excluded; correction becomes impossible.

**Repair**: Restore the governed value set, transformation, unit, and locale rules; provide an exception or alternate path when supported.

**Synthetic pair**: “Phone number must have 10 digits” → “Include country code,” when the approved field supports international numbers.

## CF-S03: Orphaned Error

**What it is**: An error is not tied to the affected input, failed rule, or supported correction.

**Detection**:
- “Something went wrong” or “Invalid” appears without field/group/submission association.
- The message recommends retry when outcome or retry safety is unknown.
- Valid input disappears after a recoverable failure.

**Impact**: The person cannot diagnose or recover and may repeat work or duplicate harm.

**Repair**: Bind origin, known state, preserved work, safe correction, alternative, and recovery.

**Synthetic pair**: “Form error” → “End date must be after 12 October. Your other changes are saved.”

## CF-S04: Premature Confirmation

**What it is**: Completion language describes queued, pending, partial, or unknown work.

**Detection**:
- “Sent,” “paid,” “saved,” or “deleted” conflicts with authoritative state.
- A success animation appears before backend acknowledgement.
- A transport event is treated as delivery or attention.

**Impact**: Users leave, retry, or miss corrective action based on false finality.

**Repair**: Name the actual state, remaining step, timing if known, and safe recovery.

**Synthetic pair**: “Report delivered” → “Report handed to the delivery service.”

## CF-S05: Decorative Progress

**What it is**: Motion, percentage, or reassurance implies progress without evidence.

**Detection**:
- Percentage does not derive from measurable work.
- Countdown or “almost done” has no current estimate source.
- No non-visual status or re-entry behavior is defined.

**Impact**: Waiting expectations and accessibility are misrepresented.

**Repair**: Classify the state, expose only supported measures, and provide verified cancellation, resumption, or return guidance.

**Synthetic pair**: “90% complete” → “Upload processing; 6 of 8 files verified,” if file count is authoritative.

## CF-S06: False Empty

**What it is**: One generic absence message masks filters, permissions, loading, offline state, unavailable data, or failure.

**Detection**:
- Empty copy is identical across multiple causes.
- A creation prompt appears when records may already exist.
- Active filters or permission boundaries are omitted.

**Impact**: Users form an incorrect model of their data and take irrelevant actions.

**Repair**: Bind the message and available action to the observable absence cause.

**Synthetic pair**: “No records” → “Records are hidden by the Archived filter.”

## CF-S07: Notification Without a Contract

**What it is**: A message is sent without resolved event, recipient, purpose, channel, consent/entitlement, state, action, or expiry.

**Detection**:
- Notification is optimized for engagement rather than a declared user purpose.
- Sensitive data appears on an unverified or shared channel.
- Destination state is stale, action unavailable, or duplicate suppression absent.

**Impact**: The notification can coerce, expose data, interrupt unnecessarily, or lead to a dead end.

**Repair**: Define the event-to-message contract, minimize channel content, verify recipient and destination, and preserve opt-out or required-service distinctions.

**Synthetic pair**: “You’re missing out!” → “Price alert paused. Resume it in notification settings.”

## Quick Detection Table

| ID | Key indicator | Default response |
|---|---|---|
| CF-S01 | Label does not predict action | Resolve action contract |
| CF-S02 | Constraint lacks approved source | Request domain/product evidence |
| CF-S03 | Error lacks binding or recovery | Preserve input and add correction |
| CF-S04 | Terminal claim exceeds state | Replace with authoritative state |
| CF-S05 | Progress value lacks measure | Remove claim or bind runtime evidence |
| CF-S06 | Absence cause unresolved | Classify empty state |
| CF-S07 | Trigger/recipient/channel unresolved | Define or suppress notification |

## Internal Lineage

- Cross-book synthesis competencies 3, 5, 6, 8, and 10.
- Pattern matrix: choice reduction, error prevention, persuasion, personalization, and delight/habit.
