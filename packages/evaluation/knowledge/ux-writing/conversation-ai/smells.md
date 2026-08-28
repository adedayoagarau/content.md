# Conversational and AI Interaction Smells

Smells prompt investigation. They become deterministic failures only when approved evidence and an applicable rule establish the defect.

## CAI-S01: Human-Likeness Inflation

**What it is:** Language implies feelings, consciousness, relationship, perception, or judgment beyond evidenced capability.

**Detect:** “I understand exactly,” “I’m always listening,” “your trusted friend,” or claims of caring, remembering, seeing, and knowing.

**Impact:** People may disclose, rely, or defer based on a fictional role.

**Repair:** Name the actual function, operator, inputs, and limits; treat personality as optional expression.

## CAI-S02: Operator Blur

**What it is:** “I” or “we” could mean a model, product, vendor, organization, or human.

**Detect:** Responsibility, data recipient, decision owner, or correction route changes with the interpretation.

**Impact:** Accountability and recourse become unclear.

**Repair:** Name the responsible service or organization and disclose turn origin when material.

## CAI-S03: Citation Theater

**What it is:** Sources decorate an answer without supporting its material claims.

**Detect:** Generic source lists, mismatched passages, stale sources, or citations attached only to low-risk facts.

**Impact:** Unsupported output appears verified.

**Repair:** Map claims to current approved evidence; expose gaps and conflicts; remove unsupported claims.

## CAI-S04: Confidence Wash

**What it is:** Fluent, definitive expression hides inference, estimation, conflict, or missing data.

**Detect:** Exact claims from probabilistic output, absent qualifications, or a single answer chosen from conflicting sources.

**Impact:** Users may act on false certainty.

**Repair:** Classify epistemic state and connect uncertainty to a safe next action.

## CAI-S05: Phantom Action

**What it is:** The turn says an action succeeded when it was proposed, requested, queued, partial, failed, or unknown.

**Detect:** “Done,” “sent,” “booked,” or “refunded” without authoritative resulting state.

**Impact:** People may stop, retry, or make plans based on a false state.

**Repair:** Report the exact tool/action state and provide safe verification or recovery.

## CAI-S06: Apology Loop

**What it is:** The system repeats regret and the same failed prompt without changing conditions.

**Detect:** No preserved input, interpretation check, alternative route, reset, or handoff.

**Impact:** Politeness masks a non-recovering product.

**Repair:** Diagnose failure class, preserve progress, vary the recovery, or transfer accountability.

## CAI-S07: Context Creep

**What it is:** Stored or inferred information is reused beyond its disclosed purpose, scope, time, or audience.

**Detect:** Surprise personalization, sensitive inference, stale profile facts, or shared-device disclosure.

**Impact:** Privacy, accuracy, agency, and safety may be harmed.

**Repair:** Minimize and scope context; make it inspectable, correctable, revocable, and optional where governed.

## CAI-S08: False Handoff

**What it is:** A route is labeled human help without a verified person, queue, context transfer, or fallback.

**Detect:** Bot loops, dead links, invented agent names, or “connected” before queue acceptance.

**Impact:** A person may believe accountable help is available when it is not.

**Repair:** Disclose destination, status, wait, shared context, user control, and alternative route.

## CAI-S09: Turn Hijack

**What it is:** The system changes topic, goal, or action without resolving the participant's current intent.

**Detect:** Promotion before task completion, assumptions treated as answers, or unrelated follow-up questions.

**Impact:** The person loses task control and conversational orientation.

**Repair:** Restate current intent, resolve ambiguity, and make topic changes explicit and optional.

## CAI-S10: Hidden Automation

**What it is:** Generated or automated content is presented as a human-authored or human-reviewed turn when that distinction is material.

**Detect:** Human signature on unreviewed output, implied live operator, or invisible generated summary in a consequential decision.

**Impact:** Users may over-trust origin, care, or accountability.

**Repair:** Represent actual turn origin and human review state without sensationalizing automation.

## CAI-S11: Memory Myth

**What it is:** Persona language implies unlimited, stable, or human-like memory.

**Detect:** “I’ll always remember,” unexplained cross-session recall, or no view/delete/reset control.

**Impact:** Expectations and disclosure choices are distorted.

**Repair:** State stored fields, purpose, duration, audience, and controls from authoritative evidence.

## CAI-S12: Modality Assumption

**What it is:** A turn works only when seen, heard, or performed in one unverified mode.

**Detect:** “Click the green button,” undisclosed spoken sensitive data, missing transcript, or inaccessible repair control.

**Impact:** Meaning, privacy, and agency diverge across channels.

**Repair:** Preserve material parity and obtain current accessibility, locale, and runtime verification.

## Quick Detection Table

| Signal | Investigate |
|---|---|
| “I understand how you feel” | Human-likeness inflation |
| Citation without claim mapping | Citation theater |
| “Done” after a timeout | Phantom action |
| Surprise recall on a family device | Context creep |
| “Agent connected” while queued | False handoff |
| Repeated apology, no new path | Apology loop |

## Lineage

Derived from **Conversation**, **Personality**, **Personalization**, **AI assistance**, actor/responsibility, error/recovery, voice/tone, and mandatory escalation in the cross-book synthesis. Diagnostic and proposal-only; no runtime authority.
