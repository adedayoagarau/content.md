---
topic: voice-expression
status: proposal-only
implementation_authority: none
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#contradiction-preserving-pattern-matrix
  - ux-writing-cross-book-synthesis-2026-08-26.md#evidence-strength-classification
  - ux-writing-cross-book-synthesis-2026-08-26.md#evaluation-and-escalation-criteria
---

# Voice and Expression Smells

Smells prompt evidence review. They become failures only when governed rules and scoped evidence establish a violation.

## VE-S01: Semantic drift

**Smell:** A rewrite adds, removes, weakens, or strengthens a fact, actor, certainty, state, option, consequence, destination, or remedy.

**Detect:** Expression-to-meaning diff contains an unexplained invariant change.

**Impact:** A stylistic edit becomes an unauthorized product or policy decision.

**Repair:** Restore the invariant or return the change for a new semantic decision.

## VE-S02: Brevity amputation

**Smell:** Shortening removes a material condition, cost, right, warning, recovery route, or qualification.

**Detect:** Word-count targets or “less is more” arguments appear without a material-information audit.

**Impact:** Reduces effort by hiding what people need to decide safely.

**Repair:** Optimize for sufficient information at the moment and risk; layer only supporting detail.

## VE-S03: Tone laundering

**Smell:** Warm, positive, reassuring, or playful language makes an adverse state sound acceptable without changing the outcome.

**Detect:** Celebration, gratitude, exclamation, or upbeat framing around denial, loss, debt, illness, danger, or provider fault.

**Impact:** Obscures responsibility and can trivialize harm.

**Repair:** Lead with state, consequence, agency, and remedy; add proportionate acknowledgment only if supported.

## VE-S04: Empathy theater

**Smell:** The system claims understanding, feelings, care, listening, friendship, or shared experience it cannot substantiate.

**Detect:** “I understand,” “I feel,” “we’re with you,” or relationship claims without a truthful operator and capability contract.

**Impact:** Simulates reciprocity and may overstate human involvement.

**Repair:** Describe the supported situation and provide useful action or human recourse.

## VE-S05: Personality impersonation

**Smell:** Character or first-person language implies human identity, professional authority, gender, or decision ownership.

**Detect:** Assistant, advisor, expert, partner, clinician, or named persona roles without approved referent and authority.

**Impact:** Miscalibrates trust and accountability.

**Repair:** State the operator, automation type, scope, limitations, and accountable human route.

## VE-S06: Jargon purge

**Smell:** “Plain language” replaces a necessary governed term with a familiar but inaccurate one.

**Detect:** Legal, medical, financial, policy, technical, or identity terms disappear without specialist approval.

**Impact:** Changes rights, roles, or precision while appearing simpler.

**Repair:** Preserve the approved term and explain it in task context.

## VE-S07: Humor carrying the contract

**Smell:** Joke, emoji, idiom, sound, or character supplies essential state, action, warning, or recovery meaning.

**Detect:** Removing the flourish leaves an incomplete or ambiguous message.

**Impact:** Meaning may fail across repetition, culture, locale, disability, or high-stakes context.

**Repair:** Make the neutral contract complete; treat character as optional and removable.

## VE-S08: Mechanics as truth

**Smell:** A casing, punctuation, reading-level, or length convention is treated as universal proof of clarity or accessibility.

**Detect:** Context-free numeric thresholds or English rules enforced across locales and surfaces.

**Impact:** Produces false certainty and may damage meaning in another language or mode.

**Repair:** Scope mechanics to approved organization, locale, surface, and version; validate outcomes separately.

## Quick detection table

| Signal | First question |
|---|---|
| Copy sounds better but differs | Which invariant changed? |
| Copy is shorter | What material information disappeared? |
| Tone is very positive | What state or responsibility is being softened? |
| System sounds human | Who actually speaks and decides? |
| Specialist term vanished | Did meaning or authority change? |
| Rule cites a word count | What population, locale, task, and evidence support it? |
