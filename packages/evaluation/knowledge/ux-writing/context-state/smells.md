# Context, Actors, Evidence, and Product-State Smells

Warning patterns for review and repair. A smell triggers investigation; it is not automatically a defect without scoped evidence.

## CTX-S01: Missing Actor

**What it is**: Content describes an action, decision, obligation, or recovery without identifying the responsible party.

**How to detect**:
- Material verbs have no resolved actor.
- “We,” “you,” “they,” “your,” or role labels resolve to multiple entities.
- Passive voice hides who decided, sent, charged, denied, or will repair.

**Why it matters**:
- Users may act without authority or pursue the wrong organization for recovery.
- Accountability becomes unclear in delegated or multi-party experiences.

**How to repair**:
- Build the actor map and assign speaker, action actor, subject, recipient, accountable organization, and recovery owner.
- Name the material actor in the expression where ambiguity remains.

**Synthetic example**:
- Smell: “Your request was rejected.”
- Repair: “The licensing board declined Samir’s renewal request.”

**Detection boundary**: Unique reference resolution can be machine-checked; whether readers understand the referent requires human or research review.

## CTX-S02: Invented State

**What it is**: Content expresses a state or transition that approved product evidence does not establish.

**How to detect**:
- “Done,” “sent,” “paid,” “deleted,” “safe,” or “approved” conflicts with the authoritative state.
- A pending, partial, queued, or unknown outcome becomes terminal.
- A control promises an unsupported result state.

**Why it matters**:
- Users may retry, leave, disclose information, or miss recovery based on a false outcome.

**How to repair**:
- Use the exact supported state and bounded certainty.
- Request state or transition evidence when the authoritative value is absent or conflicting.

**Synthetic example**:
- Smell: “Refund complete” when the state is `refund_requested`.
- Repair: “Refund requested. We’ll show the result here after the card network responds.”

**Detection boundary**: Comparison is deterministic only with an approved state-to-proposition mapping.

## CTX-S03: Unsupported Claim

**What it is**: A material proposition lacks an in-scope, current, attributable source.

**How to detect**:
- Claim references are missing, expired, unresolved, or outside their declared scope.
- Qualifications in the source disappear from the expression.
- A model, stakeholder, or analytics result is presented as domain fact.

**Why it matters**:
- Fluent language can make uncertain or local information appear universal and authoritative.

**How to repair**:
- Bind the proposition to valid evidence and preserve qualifications.
- Remove it, mark it unknown, or escalate if evidence cannot be obtained.

**Synthetic example**:
- Smell: “This plan covers every emergency visit.”
- Repair: “Coverage depends on the provider and reason for the visit. Check your plan record.”

**Detection boundary**: Source presence and currency are machine-checkable; substantive sufficiency is specialist dependent.

## CTX-S04: Unresolved Referent

**What it is**: A noun, pronoun, demonstrative, label, or link target can denote more than one material entity.

**How to detect**:
- “It,” “this,” “that account,” or “continue” has multiple plausible objects or destinations.
- “My” or “your” appears in a shared, delegated, guardian, or representative flow.
- Identical labels lead to different destinations in the same scope.

**Why it matters**:
- The user cannot predict which record, account, person, or action the content concerns.

**How to repair**:
- Resolve the entity identifier, then use a specific label or nearby accessible context.
- Preserve privacy by naming only the minimum necessary distinction.

**Synthetic example**:
- Smell: “Remove it” beside two saved addresses.
- Repair: “Remove shipping address ending in 021.”

**Detection boundary**: Duplicate and unresolved identifiers can be flagged deterministically; contextual clarity needs human validation.

## CTX-S05: Evidence Laundering

**What it is**: Weak, inferred, generated, circular, or preference-based input is relabeled as authoritative evidence.

**How to detect**:
- Existing copy cites itself or another derivative string.
- Generated content becomes the source for its own claim.
- A persona, meeting note, benchmark, or metric is recorded as a verified user or product fact.
- A source’s owner, scope, currency, or approval state is stripped during transformation.

**Why it matters**:
- The evidence graph can look complete while every downstream proposition rests on an unsupported premise.

**How to repair**:
- Trace each proposition to the earliest accountable source.
- Restore evidence type, scope, qualifications, conflicts, and approval state.
- Classify unverifiable material as hypothesis, preference, or unknown.

**Synthetic example**:
- Smell: “Users prefer instant approval” supported only by a product goal document.
- Repair: Record “instant approval” as an organization objective; commission user research before asserting user preference.

**Detection boundary**: Provenance cycles and missing metadata are machine-checkable; authority adequacy requires accountable review.

## Quick Detection Table

| ID | Key indicator | Default response |
|---|---|---|
| CTX-S01 | Material verb lacks a unique actor | Resolve actor map |
| CTX-S02 | Expression contradicts or exceeds known state | Preserve state or return `unknown` |
| CTX-S03 | Material proposition lacks valid support | Request evidence or escalate |
| CTX-S04 | Expression maps to multiple entities | Name or disambiguate referent |
| CTX-S05 | Derivative or weak input is treated as authority | Restore provenance and classification |

## Internal Lineage

- Cross-book synthesis competencies 1–4 and 9–10.
- Contradiction matrix: user language, personalization, choice reduction, and AI assistance.
- Mandatory abstention: unresolved state, authority, operator, recipient, or material facts.
