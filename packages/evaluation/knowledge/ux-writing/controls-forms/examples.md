# Controls, Forms, and State Messaging Examples

Original synthetic examples for review and repair. These are not production-approved strings or book examples.

## 1. Input Constraint That Rejects Valid Names

**Known context**: The identity service accepts Unicode letters, spaces, apostrophes, and hyphens. The form pattern allows only ASCII letters.

### Bad

Field label: **Legal name**
Error: **Use letters A–Z only.**

**Problems**:
- The UI constraint contradicts the approved input contract.
- It rejects valid scripts and name forms.

### Grounded repair

Field label: **Name on your identity document**
Error: **Enter the name exactly as it appears on your identity document.**

**Boundary**: Identity and locale specialists must validate matching, normalization, privacy, and script support.

## 2. Field-Level Validation

**Known context**: A delivery date must be today or later; the entered date is yesterday. The user’s other entries remain stored.

### Bad

> Invalid input.

### Grounded repair

> Choose today or a later date.

**Why it works**:
- Identifies the failed rule and supported correction.
- Does not blame the person or erase valid work.

## 3. Consequential Control

**Known context**: Submitting sends the final roster to a regulator. The organization cannot edit it afterward but may file a correction request.

### Bad

Button: **Continue**

### Grounded repair

Button: **Submit final roster**
Supporting content: **You can’t edit the roster after submission. You can file a correction request later.**

**Boundary**: Regulatory and product authorities must verify finality and correction rights.

## 4. Post-Action Confirmation

**Known context**: The system has queued a bulk message but has not sent it. The owner can cancel while it remains queued.

### Bad

> Messages sent!

### Grounded repair

> 420 messages queued. You can cancel before sending begins.

**Why it works**:
- Preserves the current state and count.
- Identifies the supported recovery window.

## 5. Indeterminate Processing

**Known context**: A data export is processing. The product cannot estimate completion time. The user may leave and return.

### Bad

> Almost done—just a few seconds left.

### Grounded repair

> Preparing your export. You can leave this page; we’ll keep it available here when it’s ready.

**Boundary**: Runtime tests must prove persistence, re-entry, and availability.

## 6. Filtered Empty State

**Known context**: Twelve invoices exist, but none match the active “Overdue” filter.

### Bad

> You don’t have any invoices yet. Create one now.

### Grounded repair

> No invoices match the Overdue filter. Clear the filter to see all 12 invoices.

**Why it works**:
- Names the actual absence cause.
- Does not misrepresent existing data or promote an irrelevant action.

## 7. Failure Disguised as Empty

**Known context**: The team list failed to load; previously stored records may exist.

### Bad

> No team members.

### Grounded repair

> We couldn’t load team members. Your saved records haven’t been changed. Try again when you’re online.

**Boundary**: Product evidence must support preservation and the connectivity diagnosis before using this repair.

## 8. Sensitive Notification

**Known context**: A shared lock-screen channel is enabled. A private lab result is ready, but the notification contract permits only a generic alert.

### Bad

> Your hepatitis test result is ready. View positive result.

### Grounded repair

> A new health record is available. Sign in to view it.

**Why it works**:
- Preserves minimum actionable meaning without exposing sensitive detail.
- Does not claim that the device holder is the intended recipient.

**Boundary**: Privacy, security, accessibility, clinical, and locale authorities must approve channel content and authentication.

## 9. Bundled Consent

**Known context**: Transactional updates are required for service delivery. Marketing alerts are optional.

### Bad

Checkbox: **Send me updates and offers**
Button: **Agree and continue**

### Grounded repair

> Service updates are required to manage your booking.

Optional checkbox: **Send me promotional offers**
Buttons: **Continue** and **Cancel booking**

**Boundary**: Consent and legal authority must determine the required notice, lawful basis, controls, and revocation path.

## Repair Walkthrough

### Before

> Success! We’re notifying everyone now.

### Evidence questions

1. Did the submission succeed, or was it only accepted into a queue?
2. Who is included in “everyone”?
3. Which channels are authorized for each recipient?
4. Can the sender inspect, cancel, or correct the notification?
5. What does the delivery system actually report?

### After, if evidence proves only scheduling

> Notice scheduled for 09:00 tomorrow for 18 opted-in members. Review or cancel it before 08:55.

### Changes made

- Replaced vague success with the supported scheduled state.
- Named recipient scope, timing, consent basis, and recovery window.

## Internal Lineage

- Cross-book synthesis: temporal interaction, agency, error/recovery, accessibility/localization, and hard-before-soft evaluation.
- Pattern matrix: error prevention, choice reduction, persuasion, personalization, and brevity.
- All scenarios and wording above are newly authored synthetic material.
