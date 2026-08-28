---
topic: structure-navigation
status: proposal-only
implementation_authority: none
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-2
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-3
  - ux-writing-cross-book-synthesis-2026-08-26.md#hard-constraints
  - ux-writing-cross-book-synthesis-2026-08-26.md#evaluation-and-escalation-criteria
---

# Structure and Navigation Rules

These candidate rules require approved project evidence before enforcement. The book synthesis supplies practitioner rationale, not runtime authority.

## Deterministic hard-rule candidates

### SN-H01 — Resolve every destination

Every link or navigation control must resolve to a declared route, resource, state transition, download, or external handoff. Broken, circular, unauthorized, expired, or unspecified destinations fail.

### SN-H02 — Keep label and destination semantically aligned

The label must predict the declared destination or effect without changing material meaning.

- A download must not present itself as ordinary navigation.
- An external handoff must not imply the person remains in the same service when that difference is material.
- An action that commits, deletes, pays, publishes, or submits must identify its effect.

### SN-H03 — Preserve material information before commitment

Do not place a material cost, consequence, eligibility condition, data use, right, exception, or recovery route only behind optional disclosure after the decision it affects.

### SN-H04 — Preserve the governed option set

Navigation and menus must include required alternatives, refusal, exit, edit, undo, appeal, escalation, or human routes declared by the scoped interaction contract. Presentation may not silently remove them.

### SN-H05 — Preserve semantic hierarchy

Each structural node must have a defined parent and role. Headings, lists, groups, and tables must not rely on visual appearance alone to express relationships.

### SN-H06 — Keep headings and sections aligned

A heading must identify the governed scope of the content it introduces. Content that materially belongs to another scope requires restructuring or a new heading, not stylistic concealment.

### SN-H07 — Use the correct structured form

- Ordered sequences retain order.
- Unordered peers do not imply rank unless rank is governed.
- Tables declare row/column meanings and preserve relationships.
- Layout structures do not impersonate data tables.

### SN-H08 — Provide orientation and continuation

For multi-step or resumable consequential tasks, expose the declared current step or state, completion condition, and next or return route. Do not declare progress or completion without authoritative state.

### SN-H09 — Preserve cross-mode and cross-locale meaning

Canonical material information, destinations, option sets, and relationships must remain equivalent across supported locales and modes. Missing resources follow the explicit fallback policy; they are not silently omitted.

### SN-H10 — Block preference scoring on structural hard failure

Scannability, brevity, visual elegance, voice, and tone cannot legitimize a candidate that changes destination, state, consequence, option set, material information, or required recovery.

## Deterministic outcomes

| Outcome | Condition |
|---|---|
| `pass` | Required scoped evidence exists and the rule is satisfied |
| `fail` | Evidence establishes a contradiction, omission, or invalid relation |
| `unknown` | Route, effect, authority, or materiality evidence is absent or conflicting |
| `not_applicable` | The rule's declared applicability conditions are false |

Each result should retain rule ID, node or route identifier, evidence references, reason code, and repair requirement. Identical canonical inputs and rule versions should produce identical ordering and results.

## Advisory guidance

- Begin pages and sections with the question or task they answer.
- Prefer concrete, predictive headings and labels over category jargon.
- Put the most decision-relevant information before supporting detail, not automatically the shortest text first.
- Break genuine sets into lists; preserve prose when sequence or argument depends on connections between sentences.
- Use summaries and disclosures to stage complexity while keeping material facts in the decision path.
- Keep navigation labels stable enough to support recognition and resumption.
- Avoid unnecessary duplicate routes that make the same label behave differently.
- Design first use, repeat use, interruption, narrow viewports, and adverse states together.

## Specialist escalation

Escalate when rendered accessibility behavior, table semantics, focus order, live state, keyboard/speech operation, localization, jurisdictional disclosure, policy-mandated routes, or sensitive terminology is unresolved. Do not infer conformance from plain language or semantic-looking markup alone.

## Research and preference criteria

Research must validate whether intended populations can find, interpret, traverse, resume, and complete the task. Only after hard rules pass may reviewers prefer a hierarchy for aesthetic economy, rhythm, brand character, or visual distinctiveness.
