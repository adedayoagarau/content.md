# Accessibility and Localization Knowledge

Concepts for preserving meaning, agency, and operability across locales, modes, and assistive interactions.

> Status: transformed practitioner knowledge; proposal-only, with no conformance or runtime authority.

## Overview

Accessibility and localization are transformations of an interaction contract, not finishing passes on strings. Every supported projection must preserve material facts, actors, choices, consequences, state, and recovery while adapting grammar, direction, terminology, modality, and behavior for its actual context.

Deterministic review can compare structured invariants, required resources, and declared semantic properties. It cannot prove rendered accessibility, cultural fitness, legal adequacy, or user comprehension without current standards, specialists, runtime tests, and affected-user evidence.

## Key Concepts

### Canonical meaning

**Definition**: The approved proposition set and interaction invariants that every supported locale and mode must preserve.

Common invariants include actor, object, state, certainty, action, option set, consequence, timing, destination, remedy, and recovery.

### Material-information parity

**Definition**: Every supported projection communicates the information and controls needed for an equivalent consequential decision.

Parity does not require identical word count, syntax, visual layout, or modality. It requires that adaptation does not remove rights, qualifications, warnings, prices, recipients, state, or recovery.

### Locale profile

**Definition**: The governed context for a language-market projection.

It includes source and target locale, jurisdiction, script, reading direction, expansion behavior, grammar, morphology, plural and number behavior, date/time/unit conventions, terminology, pronunciation, fallback, and cultural/domain authority.

### Semantic projection

**Definition**: One expression of canonical meaning in a locale, channel, or modality.

Visible text, programmatic labels, speech output, captions, transcripts, audio descriptions, haptics, icons, sound, and motion can be separate projections. Each needs a declared purpose and invariant mapping.

### Accessible name, role, state, value, and relationship

**Definition**: Programmatic semantics that let assistive technology identify an interface element, its function, current condition or value, and connections to instructions, errors, or other elements.

These semantics are part of the component contract. Correct wording cannot compensate for an incorrect or missing role, state, relationship, or operable behavior.

### Focus contract

**Definition**: The governed rule for where interaction focus begins, moves, returns, or remains after a state change.

Focus behavior must reflect task sequence, error recovery, modal transitions, inserted content, and restoration. It is verified in the rendered product, not inferred from source order or copy.

### Announcement contract

**Definition**: The governed mapping from a material state change to assistive or spoken status output.

It includes trigger, message, priority, timing, repetition, interruption, deduplication, and current state. Visual appearance alone does not prove that a change is announced—or that an announcement is useful.

### Multimodal equivalence

**Definition**: Equivalent task meaning and agency across visual, auditory, speech, touch, keyboard, pointer, and other supported modes.

Equivalence may require different structures. A video may need captions, transcript, audio description, and a text alternative for a complex action; one technique does not automatically cover every need.

### Fallback policy

**Definition**: An approved response when a resource, mode, or locale is unavailable.

Fallback must be explicit about language and limitations and must not silently replace a material localized or accessible experience with incomplete content.

## What Can Be Deterministic

| Plane | Deterministic with governed inputs | Boundary |
|---|---|---|
| Resource coverage | Required locale/mode resource identifiers exist | Presence does not prove quality or conformance |
| Invariant parity | Structured invariants match across projections | Free-language equivalence needs qualified review |
| Terminology | Approved term IDs resolve consistently | Contextual appropriateness needs locale expertise |
| Semantic fields | Required name/role/state/value/relation fields exist | Rendered exposure and behavior need runtime tests |
| Direction/fallback | Projection declares supported direction and fallback | Layout, reading order, and cultural effect need testing |
| State messaging | Announced/visible structured state equals product state | Timing, interruption, and comprehension need testing |

## Human, Research, Specialist, and Runtime Boundaries

- **Human judgment**: information hierarchy, free-language equivalence, and whether an alternative carries the same task meaning.
- **Disabled-participant research**: discoverability, comprehension, control, fatigue, recovery, and multimodal task completion.
- **In-market review**: grammar, terminology, cultural effect, pronunciation, direction, expansion, transcreation, and material parity.
- **Specialist review**: current accessibility standards, assistive semantics, legal/domain terminology, captions, transcript, and audio-description sufficiency.
- **Runtime verification**: keyboard and speech operation, focus, announcements, semantic exposure, zoom/reflow, contrast, forced colors, reduced motion, media alternatives, and platform fallbacks.

## Common Misconceptions

- **Myth**: Plain language proves accessibility.
  **Reality**: It may aid comprehension, but it cannot prove semantics, operation, focus, announcements, perception, or conformance.
- **Myth**: Alt text makes an interface accessible.
  **Reality**: One text alternative cannot establish keyboard access, state, relationships, media equivalence, layout behavior, or user success.
- **Myth**: Translation parity means identical wording.
  **Reality**: Parity preserves material meaning and agency while allowing locale-appropriate expression.
- **Myth**: Reading a string aloud tests screen-reader use.
  **Reality**: It is a craft check, not evidence of semantic exposure or assistive runtime behavior.
- **Myth**: English length, case, punctuation, or tone rules transfer universally.
  **Reality**: Scripts, grammar, morphology, direction, conventions, and cultural authority differ.

## Internal Lineage

- Cross-book synthesis competency 8: accessibility/localization as meaning preservation.
- Competencies 2, 3, 5, 6, and 10: invariants, temporal state, agency, recovery, and hard-before-style evaluation.
- Evidence gaps: non-English-first, RTL, morphology-heavy locales, AAC, captions, speech, low vision, switch access, and disabled-led evidence.
