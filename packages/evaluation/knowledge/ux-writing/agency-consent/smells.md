# Actions, Consequences, Agency, and Consent Smells

Smells trigger investigation. They become deterministic failures only when approved evidence and an applicable rule prove the defect.

## AC-S01: Coercion

**What it is:** Pressure unrelated to the decision's factual consequence.

**Detect:**

- guilt, shame, fear of exclusion, status loss, or relational obligation;
- unsupported urgency or scarcity;
- refusal framed as selfish, foolish, disloyal, or harmful;
- repeated prompts after a clear refusal without new context.

**Impact:** A recorded choice may not reflect the person's intention.

**Repair:** State the purpose and consequence factually; restore a direct refusal; validate pressure and vulnerability with affected users and specialists.

## AC-S02: Hidden Commitment

**What it is:** A control appears exploratory or procedural but causes a charge, enrollment, disclosure, publication, or other commitment.

**Detect:**

- generic final labels such as “Continue” or “Finish”;
- recurrence, recipient, timing, or loss disclosed after action;
- trial language that omits automatic conversion;
- default selections that create an undisclosed commitment.

**Impact:** The person cannot predict the action at the decision point.

**Repair:** Put material facts before commitment and name the action on the committing control.

## AC-S03: Illusory Control

**What it is:** The interface presents choice language without distinct, operable outcomes.

**Detect:**

- two controls lead to the same state;
- “manage,” “undo,” “revoke,” or “cancel” has no working route;
- a setting changes presentation but not the promised data or service behavior;
- the person may choose, but the system ignores or immediately reverses the choice.

**Impact:** Apparent agency masks provider control.

**Repair:** Verify state transitions and runtime behavior; remove unsupported promises; escalate product defects that copy cannot solve.

## AC-S04: Bundled Consent

**What it is:** One response governs multiple purposes or recipients that should be independently understood or controlled.

**Detect:**

- unrelated purposes joined by “and” under one checkbox;
- service-essential and optional uses presented as one decision;
- multiple recipient classes hidden under a broad collective noun;
- one revocation action with materially different effects left unexplained.

**Impact:** The record cannot show which purpose the person intended to accept.

**Repair:** Obtain an authoritative purpose inventory, separate governed choices, and explain individual effects. Route validity to privacy/legal specialists.

## AC-S05: Absent Refusal

**What it is:** Acceptance is available but decline, dismiss, or exit is missing or obstructed.

**Detect:**

- only an affirmative control is visible;
- refusal is disguised as “Maybe later” when it is durable;
- closing the surface accepts or preserves a preselected option;
- refusal requires substantially more unexplained steps;
- declining blocks a service that evidence says remains available.

**Impact:** Acceptance may be the only practical path.

**Repair:** Add a direct refusal and successful exit; disclose any evidenced consequence of declining; test effort and comprehension.

## AC-S06: Concealed Consequence

**What it is:** A decision-relevant effect is omitted, vague, late, or visually detached from the action.

**Detect:**

- affected people, cost, duration, recurrence, data recipient, or irreversibility is absent;
- a euphemism replaces a concrete loss or disclosure;
- critical detail sits behind an optional link without a summary;
- confirmation claims completion while the state is pending or partial.

**Impact:** The person cannot make or verify an informed choice.

**Repair:** Restore the exact evidenced consequence at the appropriate moment and preserve state distinctions.

## AC-S07: Loaded Alternative

**What it is:** Option language evaluates the person rather than describing the outcome.

**Detect:**

- “No, I prefer…” constructions that shame refusal;
- acceptance framed as safe, smart, or caring without evidence;
- one option uses a concrete action while another uses a moral judgment;
- benefits are vivid while costs and refusal effects are abstract.

**Impact:** Labels manipulate identity and reduce comparability.

**Repair:** Label each option by its distinct action or result.

## AC-S08: Pronoun Collapse

**What it is:** “You,” “your,” “we,” or “they” merges actors with different roles or authority.

**Detect:**

- shared, delegated, household, guardian, or employer-managed contexts;
- the payer, recipient, subject, and account owner differ;
- “we” could mean platform, vendor, human operator, or partner;
- responsibility for correction or remedy is unclear.

**Impact:** The wrong person may appear to act, consent, own, or bear a consequence.

**Repair:** Name actors and roles until the referent and authority are unambiguous.

## Quick Detection Table

| Signal | Investigate |
|---|---|
| Generic final CTA | Hidden commitment |
| Only affirmative route | Absent refusal |
| Multiple purposes, one toggle | Bundled consent |
| “Undo” without verified transition | Illusory control |
| Shame, countdown, peer pressure | Coercion |
| Cost or loss after click | Concealed consequence |

## Lineage

Derived from **Preserve real agency**, the contradiction rows on persuasion, choice reduction, personalization, error prevention, and delight/habit, plus **Contextual heuristics** and **Mandatory abstention or escalation**. Smells are diagnostic, not autonomous enforcement authority.
