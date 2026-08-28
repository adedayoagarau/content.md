# Accessibility and Localization Examples

Original synthetic UX examples illustrating parity and escalation. They are not book examples or conformance claims.

## 1. Visible and Programmatic Action Diverge

**Known context**: A destructive control deletes one saved beneficiary. The visible label names the action; the programmatic name is inherited from a generic component.

### Bad

Visible label: **Delete beneficiary**
Programmatic name: **Continue**

**Problems**:
- Different modes communicate different actions.
- Assistive users cannot predict the destructive transition.

### Grounded repair

Visible label: **Delete beneficiary**
Programmatic name: **Delete beneficiary**

**Boundary**: Runtime and assistive-technology tests must verify the exposed name, role, focus, and confirmation behavior.

## 2. State Change Without an Announcement Contract

**Known context**: After a form submission, an error summary is inserted above the form while keyboard focus remains on the submit button.

### Bad

Visible message: **Three fields need attention.**
Runtime contract: no focus or announcement behavior defined.

### Repair brief

- Preserve the visible summary and field-specific errors.
- Define an approved focus/announcement sequence for submission failure.
- Verify that users can reach each associated field and return without losing input.

**Why no final string is enough**: The defect is temporal and programmatic, not merely verbal.

## 3. Premature Spoken Completion

**Known context**: A transfer is queued, but the spoken status says it completed.

### Bad

Visible: **Transfer queued**
Spoken announcement: **Transfer complete**

### Grounded repair

Visible: **Transfer queued**
Spoken announcement: **Transfer queued**

**Boundary**: Product evidence must define later completion, failure, and duplicate-announcement behavior.

## 4. Material Detail Lost to Expansion

**Known context**: In one target locale, the denial reason and appeal control exceed a fixed card height; the implementation clips both.

### Bad outcome

The localized card shows only: **Request denied**

### Repair brief

- Allow reflow or an approved expanded structure.
- Preserve the reason, deadline, appeal control, and alternate assistance route.
- Test at target-locale expansion and zoom/reflow settings.

**Why it matters**: Visual compactness cannot remove a right or remedy.

## 5. Fixed Left-to-Right Instruction

**Known context**: A verification instruction is localized for a right-to-left interface, but the copy identifies a control as “on the right.” The responsive layout can mirror or stack it.

### Bad

> Select the button on the right to verify your address.

### Grounded repair

> Select **Verify address**.

**Why it works**:
- Uses the control’s governed name rather than unstable position.
- Survives direction and responsive layout changes.

**Boundary**: In-market and runtime review must verify terminology, direction, reading order, and placement.

## 6. Fragment Concatenation Breaks Grammar

**Known context**: The source assembles “Delete” + item name + “permanently” from three fragments. Target languages require different word order and inflection.

### Bad source design

> Delete + {recordName} + permanently

### Locale-ready repair

Use one complete message with structured variables and a declared meaning:

> Permanently delete {recordName}?

**Boundary**: This English source is only a semantic reference; qualified locale authors decide target grammar and terminology.

## 7. Color-Only Validation

**Known context**: Invalid fields receive a red border; no error text, relationship, or correction is supplied.

### Bad

> Fields outlined in red are invalid.

### Repair brief

- Provide a field-specific error stating the failed governed rule and correction.
- Define programmatic error association and submission-summary behavior.
- Preserve the red border only as a redundant cue if approved.

**Boundary**: Contrast, perception, semantics, focus, and recovery require current standards and runtime tests.

## 8. Alt Text Used as a Complete Chart Alternative

**Known context**: A chart communicates monthly costs, a threshold breach, and exact values needed for a filing decision.

### Bad

Alt text: **Line chart of monthly costs rising.**

### Grounded alternative set

- Concise accessible name: **Monthly operating costs**
- Summary: **Costs exceeded the filing threshold in June and July.**
- Structured data alternative containing every month, amount, unit, and threshold.

**Boundary**: Specialists and disabled participants must validate navigation, relationships, verbosity, and task equivalence.

## 9. Silent Fallback for Consequential Content

**Known context**: A newly changed consent notice is unavailable in the selected locale. The platform silently displays an older translated notice.

### Bad

> Continue

**Problems**:
- Conceals stale material content and locale mismatch.
- Cannot establish informed consent.

### Required disposition

Abstain from a decision-ready localized flow. Request a current approved notice and an explicit fallback decision from legal, locale, and product authorities.

## 10. Read-Aloud Check Presented as Conformance

### Bad review note

> The instructions sound clear when read aloud, so the screen-reader experience passes.

### Grounded review note

> Read-aloud review found no obvious cadence issue. Semantic order, names, roles, states, relationships, focus, announcements, and task completion remain unverified.

## Internal Lineage

- Cross-book synthesis competency 8, hard/contextual evidence classifications, and mandatory escalation.
- Pattern matrix: brevity, plain language, read aloud, and real-time participation.
- All scenarios and wording above are newly authored synthetic material.
