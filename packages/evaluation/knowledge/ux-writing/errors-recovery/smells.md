---
topic: errors-uncertainty-recovery-remedy
status: proposal-only
implementation_authority: none
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-6
  - ux-writing-cross-book-synthesis-2026-08-26.md#hard-constraints
---

# Errors, Uncertainty, Recovery, and Remedy Smells

Smells are diagnostic signals. A match prompts evidence review; it does not by itself prove a violation unless a governed rule says so.

## ER-S01: Blame displacement

**Smell:** The message assigns fault or repair work to the person when the source of failure is the product, organization, dependency, or an unresolved state.

**Detect:** “You failed,” “you forgot,” “your mistake,” commands to repeat work, or second-person framing without evidence of user-correctable input.

**Impact:** Obscures accountable ownership and can add harm under stress.

**Repair:** Name the supported condition, preserve prior effort, and identify the actor responsible for recovery.

## ER-S02: False certainty

**Smell:** The message converts pending, conflicting, partial, or unknown evidence into a definite success, failure, cause, or completion time.

**Detect:** Absolute state verbs or promises without an authoritative state reference.

**Impact:** Can trigger duplicate action, missed deadlines, or misplaced trust.

**Repair:** State what is known, what remains unknown, and how the state will be reconciled.

## ER-S03: Unsafe retry

**Smell:** Retry is offered before establishing whether the first consequential action completed and whether repetition is idempotent.

**Detect:** “Try again” after timeouts or unknown outcomes involving money, messages, submissions, bookings, publication, or destructive action.

**Impact:** May duplicate irreversible or costly effects.

**Repair:** Block repeat action, expose status/reconciliation, and offer retry only after safety is verified.

## ER-S04: Missing recovery

**Smell:** The interface announces a block or failure but provides no operable next step, fallback, escalation, or safe exit.

**Detect:** Dead-end dialogs, disabled controls without explanation, support mentioned without a route, or instructions unavailable to the current actor.

**Impact:** Leaves the task stranded and makes the message informational rather than restorative.

**Repair:** Add a real state-valid action; if none exists, escalate to the product owner rather than inventing one.

## ER-S05: Vague failure

**Smell:** Generic wording hides a known, actionable state or consequence.

**Detect:** “Something went wrong,” “invalid,” “error occurred,” or “unable to process” when scoped evidence supports greater specificity.

**Impact:** Forces guessing and may prompt ineffective or harmful attempts.

**Repair:** Name the narrowest supported condition, affected object, preserved work, and available action. Do not speculate about cause.

## ER-S06: Tone replacing remedy

**Smell:** Apology, reassurance, enthusiasm, humor, or empathy claims substitute for restoration, correction, appeal, refund, or support.

**Detect:** Emotion-heavy copy with no concrete action or accountable owner.

**Impact:** Polishes organizational failure while leaving material harm unresolved.

**Repair:** Define the remedy contract first; then add proportionate acknowledgment if appropriate and approved.

## Quick detection table

| Signal | First question |
|---|---|
| Person is blamed | Who actually owns the failure and recovery? |
| State sounds definite | Which source proves it? |
| Retry appears | Could repetition duplicate harm? |
| Message is a dead end | What can this actor do now? |
| Copy says little | What actionable fact is known? |
| Apology dominates | What restores or remedies the outcome? |
