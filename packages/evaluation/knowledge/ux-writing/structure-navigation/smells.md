---
topic: structure-navigation
status: proposal-only
implementation_authority: none
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#contradiction-preserving-pattern-matrix
  - ux-writing-cross-book-synthesis-2026-08-26.md#contextual-heuristics
  - ux-writing-cross-book-synthesis-2026-08-26.md#evaluation-and-escalation-criteria
---

# Structure and Navigation Smells

Smells trigger investigation. They are not deterministic failures unless a governed rule and scoped evidence establish one.

## SN-S01: Visual hierarchy without semantic hierarchy

**Smell:** Size, boldness, indentation, color, or position carries a relationship that the content structure does not represent.

**Detect:** Styled paragraphs used as headings; nested-looking groups with no declared parent; reading order that changes when styles are removed.

**Impact:** Relationships may disappear across modes, devices, or assistive technology.

**Repair:** Model scope and parent-child relationships first, then render them and verify the implementation.

## SN-S02: Mystery destination

**Smell:** A link or control label does not predict where it goes or what it does.

**Detect:** Repeated “Learn more,” “Here,” “Continue,” or “Details” labels whose destinations differ materially.

**Impact:** Forces context reconstruction and can conceal commitment or external handoff.

**Repair:** Name the destination or effect using approved task terminology.

## SN-S03: Destination drift

**Smell:** A label stays stable while its target, effect, eligibility, or route meaning changes.

**Detect:** Redirects, reused labels, stale navigation records, or localized links pointing to non-equivalent resources.

**Impact:** Breaks predictability and can change a person's decision.

**Repair:** Reconcile label, route, effect, locale, and version from governed records.

## SN-S04: Disclosure trap

**Smell:** Progressive disclosure hides a fact that is material to the current choice.

**Detect:** Cost, commitment, data use, eligibility, right, exception, destructive effect, or recovery revealed only after action.

**Impact:** Converts information staging into concealment.

**Repair:** Move material facts into the decision path; disclose only supporting detail.

## SN-S05: Organization-first maze

**Smell:** Navigation mirrors internal departments, systems, or document ownership rather than governed user questions and tasks.

**Detect:** Category labels meaningful only to staff; a single task split across unrelated sections; handoffs without orientation.

**Impact:** Makes people translate their goal into provider structure.

**Repair:** Map tasks and questions to routes while retaining accountable ownership in metadata.

## SN-S06: Choice compression

**Smell:** A simplified menu removes a material alternative, refusal, appeal, recovery, or exit.

**Detect:** Provider-preferred paths remain visible while other governed options move behind ambiguous links or disappear.

**Impact:** Reduces agency and may create coercive navigation.

**Repair:** Restore the governed option set and record ordering rationale.

## SN-S07: Structure mismatch

**Smell:** Prose, lists, steps, and tables are chosen for appearance rather than the relationships in the information.

**Detect:** Sequential steps in a paragraph; single-column data tables; comparison facts scattered through prose; layout tables.

**Impact:** Obscures order, grouping, or comparison and can degrade across viewports and modes.

**Repair:** Choose the form that expresses the governed relationship, then validate rendered behavior.

## SN-S08: Fragmented task

**Smell:** Prerequisites, action, consequence, completion, and recovery are separated without reliable routes or resumption context.

**Detect:** Dead ends, unexplained handoffs, lost progress, duplicate entry, or return links that discard state.

**Impact:** Breaks temporal continuity and increases abandonment or error.

**Repair:** Model the full journey and provide explicit state, return, completion, and recovery routes.

## Quick detection table

| Signal | First question |
|---|---|
| Styling carries meaning | What semantic relationship does it express? |
| Generic link label | Can the destination be predicted alone? |
| Important detail is collapsed | Does it affect this decision? |
| Menu looks “simpler” | Which governed options disappeared? |
| Table/list feels decorative | What relationship requires this form? |
| Task crosses pages | Can the person orient, resume, and exit? |
