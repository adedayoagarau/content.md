# Accessibility and Localization Rules

Proposed constraints and contextual guidance for locale and mode projections. The supplied books do not establish conformance, platform behavior, or locale authority.

> Status: knowledge-layer proposal; no runtime, standards, or publication authority.

## Hard Candidate Constraints

Eligible for deterministic enforcement only with current governing standards, approved locale/mode contracts, and runtime evidence.

### AL-H01: Preserve canonical material meaning

- Keep actor, fact, certainty, action, option set, consequence, timing, destination, state, right, remedy, and recovery across every supported projection.
- Treat a changed material invariant as a new semantic decision, not a translation or style edit.
- Do not remove qualifications, costs, warnings, refusal, appeal, or correction to fit space.

### AL-H02: Declare locale and fallback context

- Resolve source locale, target locale, jurisdiction, script, reading direction, terminology set, and fallback policy.
- Do not invent law, regulated terms, cultural effect, grammar, pronunciation, or material facts.
- Never silently substitute a partial or unsupported fallback for consequential content.

### AL-H03: Bind accessible semantics to the interaction contract

- Provide governed name, role, state, value, and relationship data where the component requires them.
- Keep visible label and programmatic name semantically consistent; preserve the action and object.
- Associate instructions, errors, descriptions, groups, and controls using the approved component/runtime contract.

### AL-H04: Preserve state through focus and announcements

- Define focus and announcement behavior for material insertions, errors, dialogs, progress, completion, and recovery.
- Announced state must match authoritative product state and must not turn pending or partial work into completion.
- Verify timing, priority, repetition, interruption, restoration, and operability in the rendered product.

### AL-H05: Provide multimodal material parity

- Do not use color, icon, sound, motion, position, shape, or gesture as the sole carrier of material meaning or action.
- Provide governed captions, transcripts, audio descriptions, text alternatives, labels, or other projections as required by the content and current standard.
- Preserve controls, choices, timing, state, and recovery—not only informational summaries.

### AL-H06: Support direction, expansion, and structure

- Keep logical reading and interaction order correct for the declared direction.
- Do not build meaning from string concatenation, fixed English order, or layout position when locale grammar or direction can change it.
- Treat truncation of material content or controls as a hard failure; expansion capacity and reflow require rendered verification.

### AL-H07: Do not claim conformance from content techniques alone

- Plain language, alt text, captions, a reading-level score, or a successful automated scan is evidence for a bounded check only.
- No single technique or proxy proves accessibility, localization quality, or user success.
- Conformance claims require current governing authority and scoped technical evidence.

### AL-H08: Require qualified review for consequential patterns

- Route accessibility semantics and assistive behavior to qualified review and runtime verification.
- Route locale adaptation to in-market language/cultural authority.
- Include disabled participants and affected populations in research when misunderstanding or exclusion could cause material harm.

### AL-H09: Gate style behind parity and operability

Do not rank brevity, fluency, personality, or aesthetic economy while material parity, locale authority, semantics, state, recovery, or runtime behavior is failed or materially unknown.

## Deterministic Interpretation

| Check | `pass` | `fail` | `unknown` | `not_applicable` |
|---|---|---|---|---|
| Invariant parity | Structured invariants equal canonical values | Material value omitted/changed | Equivalence unresolved | Projection outside declared scope |
| Resource coverage | All required resource IDs resolve | Required projection missing | Requirement/locale unresolved | Resource not required by approved contract |
| Terminology | Approved term IDs used | Prohibited/wrong ID used | Authority or mapping missing | No governed term in scope |
| Semantic fields | Required fields and relations resolve | Missing/contradictory field | Component/runtime contract unresolved | Field not required for component |
| State parity | Visible and announced structured state match | Projection contradicts state | Runtime state/effect missing | No state change in scope |
| Direction/fallback | Declared value matches locale policy | Contradicts approved policy | Locale or policy unresolved | Single approved context has no fallback case |

`unknown` remains blocking whenever it could change meaning, access, action, consequence, consent, safety, authorization, or recovery.

## Contextual Guidance

- Write locale-ready source around concepts and complete messages, not fragment assembly.
- Use concrete actors, actions, and consequences when they improve translation and comprehension.
- Allow layout and content expansion instead of enforcing universal length limits.
- Layer explanation while preserving a direct route to every material fact and action.
- Test first use, repetition, interruption, error, zoom, reflow, and adverse contexts.
- Prefer modality combinations based on task and evidence; do not assume visual, conversational, or spoken form is inherently superior.

## Review Boundaries

- **Human judgment**: hierarchy, free-language parity, clarity, and alternative usefulness.
- **Research dependent**: task completion, comprehension, fatigue, recovery, and discoverability with disabled and affected participants.
- **Specialist/in-market**: current standards, assistive semantics, captions/audio description, grammar, terminology, culture, law, and jurisdiction.
- **Runtime/product authority**: semantic exposure, focus, announcements, keyboard/speech operation, contrast, zoom/reflow, motion, media behavior, state, and fallback.

## Internal Lineage

- Cross-book synthesis competency 8 and evaluation planes 4–6.
- Deterministic, specialist-reviewed, and research-dependent criteria.
- Mandatory escalation for missing accessibility, locale, legal/domain authority, unsupported profiling, or invented material facts.
