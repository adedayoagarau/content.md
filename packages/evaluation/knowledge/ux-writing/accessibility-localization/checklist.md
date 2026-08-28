# Accessibility and Localization Checklist

Use for each consequential locale or mode projection. Record `pass`, `fail`, `unknown`, or `not_applicable` with evidence; an unchecked item is not a pass.

> Status: proposal-only review aid; no conformance, runtime, or publication authority.

## Canonical Meaning and Parity

- [ ] Canonical actor, fact, certainty, action, option set, consequence, timing, destination, state, right, remedy, and recovery are declared.
- [ ] Every supported locale and mode maps to the same material invariants.
- [ ] Qualifications, warnings, prices, recipients, refusal, appeal, correction, and deadlines remain available.
- [ ] Any material change is routed as a new semantic decision with accountable authority.
- [ ] Brevity, layout, tone, or fluency has not removed material information.

## Locale Contract

- [ ] Source locale, target locale, jurisdiction, script, and reading direction resolve.
- [ ] Grammar, morphology, plural/number behavior, dates, times, units, terminology, pronunciation, and cultural authority are identified where applicable.
- [ ] Source messages are complete semantic units rather than English-dependent fragments.
- [ ] Layout supports approved expansion, reflow, and direction without clipping content or controls.
- [ ] Fallback language, scope, currency, and limitations are explicit and policy-approved.
- [ ] No law, regulated term, cultural effect, or material fact has been invented during adaptation.

## Accessible Semantics

- [ ] Programmatic name, role, state, value, and relationships are defined where the component contract requires them.
- [ ] Visible label and accessible name preserve the same action and object.
- [ ] Instructions, descriptions, errors, groups, status, and controls have the required associations.
- [ ] Icon, color, sound, motion, position, shape, or gesture is not the sole material cue.
- [ ] Keyboard and speech access, names, target sizes, and interaction states follow current approved contracts.

## State, Focus, and Announcements

- [ ] Material insertion, error, dialog, progress, completion, and recovery events have declared focus behavior.
- [ ] Focus begins, moves, remains, and restores according to the task and approved component contract.
- [ ] Announced content matches authoritative state and certainty.
- [ ] Announcement priority, timing, repetition, interruption, and deduplication are specified.
- [ ] Rendered behavior is verified in supported browser/platform/assistive combinations.

## Multimodal Equivalence

- [ ] Captions, transcripts, audio descriptions, text alternatives, labels, or other projections are assigned by content and task need.
- [ ] Each required alternative preserves material facts, controls, sequence, state, consequence, and recovery.
- [ ] Time-based alternatives preserve speaker, timing, critical sound, and decision-relevant visual events where applicable.
- [ ] Visual, auditory, speech, keyboard, pointer, touch, and fallback paths do not create materially different option sets.
- [ ] Reading aloud is recorded only as a craft check, never as assistive-runtime proof.

## Perception and Layout Runtime

- [ ] Contrast, forced colors, zoom, reflow, text spacing, orientation, motion, animation, and media behavior are tested as required by current authority.
- [ ] Logical reading order, visual order, focus order, and spoken order remain coherent for declared directions and layouts.
- [ ] Truncation, overlap, clipping, or off-screen controls do not remove material content.
- [ ] Disabled state, loading state, error state, and recovery remain perceivable and operable.

## Qualified Review and Research

- [ ] Current accessibility standards and platform/component contracts are identified by qualified reviewers.
- [ ] Locale content has in-market language/cultural review for the declared jurisdiction and population.
- [ ] Disabled participants representing material access needs test consequential task paths.
- [ ] Research covers first use, repetition, interruption, error, recovery, and adverse contexts.
- [ ] Findings record population, method, limitations, conflicts, and unresolved gaps.

## Deterministic Gates

| Gate | Pass evidence | Blocking result |
|---|---|---|
| Invariant parity | Structured values match canonical set | `fail` or material `unknown` |
| Resource coverage | Required projection IDs resolve | `fail` |
| Locale integrity | Locale/direction/term/fallback refs resolve | `fail` or specialist escalation |
| Semantic completeness | Required fields and relationships resolve | `fail` or runtime escalation |
| State parity | Visible/announced state equals product state | `fail` or material `unknown` |
| Review evidence | Required authority/test refs resolve and are current | `unknown` until reviewed |

## Stop Conditions

- A locale or mode omits or changes material meaning, agency, consequence, right, remedy, or recovery.
- Locale, jurisdiction, direction, terminology, fallback, or cultural authority is unresolved for consequential content.
- Programmatic semantics, focus, announcements, operation, or rendered behavior cannot be verified.
- A source depends on fixed English word order, length, case, punctuation, or directional position.
- Content claims accessibility or localization quality from plain language, alt text, translation presence, reading level, automated scanning, or read-aloud review alone.
- Required disabled-participant, in-market, specialist, or runtime evidence is missing.

## Required Disposition

- **Proceed** only when deterministic parity and resource gates pass and required authority/testing is complete.
- **Repair brief** for a bounded parity or source-structure defect whose canonical meaning is approved.
- **Abstain** when adaptation would require inventing terminology, law, culture, behavior, or material facts.
- **Escalate** for conformance, runtime behavior, consequential locale decisions, or unresolved specialist evidence.

## Internal Lineage

- Cross-book synthesis competency 8, evaluation planes 4–6, and hard-before-preference rule.
- Specialist-reviewed, research-dependent, and deterministic evaluation criteria.
- Mandatory escalation and remaining evidence gaps 2–4.
