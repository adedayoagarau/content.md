# Accessibility and Localization Smells

Warning patterns for semantic parity, locale readiness, and accessible runtime review. A smell triggers investigation, not an automatic conformance verdict.

## AL-S01: Material Parity Drift

**What it is**: A locale or mode loses or changes a fact, choice, consequence, state, right, remedy, or recovery path.

**Detection**:
- Structured invariant sets differ across projections.
- A warning, refusal, appeal, deadline, price, or qualification exists in only one projection.

**Impact**: People make materially different decisions based on locale or mode.

**Repair**: Restore canonical invariants, then adapt expression with qualified review.

**Synthetic pair**: Visual “Cancel without charge until Friday” vs spoken “Cancel booking” → include the no-charge deadline in both task paths.

## AL-S02: English-Shaped Source

**What it is**: Content structure assumes English word order, length, grammar, casing, or punctuation.

**Detection**:
- Concatenated fragments, fixed token order, or plural logic tied to English.
- Layout clips expansion or relies on title case as meaning.

**Impact**: Target content becomes ungrammatical, incomplete, or materially misleading.

**Repair**: Author complete semantic messages, structured variables, governed locale rules, and flexible layouts.

**Synthetic pair**: “1 item(s) removed” → locale-aware complete-message variants.

## AL-S03: Direction-by-Position

**What it is**: Meaning or instruction depends on left/right placement, visual order, or an unverified directional assumption.

**Detection**:
- “Click left,” “see right,” or arrow meaning changes when layout mirrors or stacks.
- DOM, visual, focus, and spoken orders diverge materially.

**Impact**: RTL, reflow, zoom, and assistive journeys point to the wrong control or sequence.

**Repair**: Refer to governed names and logical relationships; verify direction, reading order, and focus order in runtime.

## AL-S04: Accessible-Name Divergence

**What it is**: Programmatic and visible projections identify different actions, objects, or states.

**Detection**:
- Visible label and accessible name have different invariant mappings.
- Icon tooltip, speech command, and control name use inconsistent governed terms.

**Impact**: A person cannot predict or refer to the same control across modes.

**Repair**: Align semantic invariants and verify exposed name, role, state, value, and relations.

## AL-S05: Silent State Change

**What it is**: A material insertion, error, progress update, dialog transition, or completion has no governed focus or announcement behavior.

**Detection**:
- Visual status changes while assistive state remains unchanged.
- Focus is lost, trapped, moved unexpectedly, or not restored.
- Repeated announcements interrupt or conceal the current task.

**Impact**: Users miss results, cannot recover, or lose their place.

**Repair**: Define the temporal focus/announcement contract and verify it in supported runtime/assistive combinations.

## AL-S06: Single-Technique Conformance Claim

**What it is**: One content technique or proxy is presented as proof of accessibility or localization quality.

**Detection**:
- “Has alt text,” “plain language,” “passes automated scan,” “translated,” or “sounds good aloud” is the complete evidence.

**Impact**: Missing semantics, operation, perception, parity, and user outcomes remain hidden.

**Repair**: Scope the evidence narrowly and collect current standards, specialist, runtime, and participant evidence.

## AL-S07: Silent or Stale Locale Fallback

**What it is**: Missing target content is replaced without exposing language, age, limitations, or material mismatch.

**Detection**:
- Resource exists but is expired, partial, wrong-jurisdiction, or wrong-language.
- Fallback removes current rights, warnings, options, or recovery.

**Impact**: A structurally complete interface presents materially invalid content.

**Repair**: Apply the approved fallback policy or abstain; request current locale and domain authority.

## AL-S08: Modality Decoration

**What it is**: An alternative conveys atmosphere or a summary but not the task’s material information and controls.

**Detection**:
- Captions omit speaker or critical sound meaning.
- Transcript omits controls, timing, or state.
- Audio description or text alternative omits a decision-relevant visual event.

**Impact**: The alternative exists but does not support equivalent action or recovery.

**Repair**: Map canonical invariants and task controls to every required projection; test task completion.

## Quick Detection Table

| ID | Key indicator | Default response |
|---|---|---|
| AL-S01 | Invariants differ across projections | Block and restore parity |
| AL-S02 | English fragments or fixed length/order | Redesign source and layout |
| AL-S03 | Meaning depends on position/direction | Use names and logical order |
| AL-S04 | Visible/programmatic meaning differs | Align semantics and test runtime |
| AL-S05 | State changes without focus/announcement contract | Escalate to runtime verification |
| AL-S06 | One technique claimed as proof | Narrow claim; gather full evidence |
| AL-S07 | Fallback is stale, partial, or silent | Apply policy or abstain |
| AL-S08 | Alternative omits task meaning/control | Restore multimodal parity |

## Internal Lineage

- Cross-book synthesis competency 8 and evidence gaps 2–4.
- Pattern matrix: brevity, plain language, read aloud, choice reduction, and real-time participation.
