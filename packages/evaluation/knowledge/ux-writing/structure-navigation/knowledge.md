---
topic: structure-navigation
status: proposal-only
implementation_authority: none
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-2
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-3
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-5
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-8
  - ux-writing-cross-book-synthesis-2026-08-26.md#competency-and-method-map
---

# Structure and Navigation Knowledge

Structure turns governed meaning into routes, hierarchy, labels, lists, tables, and staged detail. It should help people locate the right task, predict destinations, understand relationships, act, and resume without changing or hiding material meaning.

## The structural contract

The content model should preserve this sequence:

`authoritative concepts → user questions and tasks → route model → page hierarchy → component structure → labels and links → rendered behavior → observed findability`

Layout is an expression layer. Visual size, placement, color, icons, disclosure, tabs, and navigation patterns may emphasize or sequence meaning, but they must not silently alter actor, option set, consequence, destination, state, right, or remedy.

## Core concepts

### Task content

Task content contains the information and actions needed to reach a defined outcome. A useful task unit establishes orientation, prerequisites, steps or choices, consequences, completion state, recovery, and onward route as applicable.

### Hierarchy

Hierarchy expresses scope and relationships among a title, sections, subsections, controls, and supporting detail. A heading should describe the content it introduces; hierarchy should remain meaningful without relying only on appearance.

### Navigation

Navigation is the system of routes by which a person enters, moves among, resumes, or exits tasks and reference material. Global organization, local context, task progress, search, and recovery routes solve different problems and should not be treated as interchangeable menus.

### Link contract

A link has at least four governed properties:

- **label** — what the person is told;
- **destination** — the exact route, resource, or action reached;
- **context** — the surrounding task and current state;
- **effect** — navigation, download, state change, external handoff, or another transition.

Predictiveness is semantic, not merely stylistic. A label must not promise a destination or effect different from what occurs.

### Progressive disclosure

Progressive disclosure stages detail by moment, need, and risk. It reduces simultaneous load only when essential information remains available before the decision it affects.

Do not hide costs, commitments, eligibility, destructive effects, data use, rights, exceptions, or recovery behind optional disclosure when those facts are material to the immediate choice.

### Lists and tables

Use a list for comparable items or ordered steps. Use a table when people need relationships across rows and columns. Structured presentation must preserve labels, order, grouping, header relationships, and material information across supported modes and locales.

## Temporal structure

Structure covers a journey, not only a page:

1. entry and orientation;
2. task selection or resumption;
3. prerequisites and preparation;
4. input, choice, or action;
5. confirmation and commitment;
6. status, completion, or failure;
7. recovery, appeal, handoff, exit, or return.

A route is incomplete when a person can enter but cannot identify current location, next action, successful completion, or a safe way out.

## Evidence boundaries

### Deterministic candidates

With approved route and semantic records, machines can check identifier presence, destination resolution, exact action-transition mappings, required recovery links, duplicate or prohibited generic labels in a defined scope, heading-parent relations, approved terminology, locale resource presence, and semantic invariant parity.

### Advisory criteria

Task-first ordering, concrete headings, familiar terms, layered detail, short sections, lists, summaries, and scannable presentation are context-dependent heuristics. There is no universal word count, heading count, menu depth, or “less is more” rule.

### Specialist-reviewed

Rendered semantics, keyboard and screen-reader behavior, focus, reflow, table relationships, locale directionality, jurisdiction-specific disclosures, policy routes, and sensitive terminology require current authority and specialist validation.

### Research-dependent

Findability, interpretation, route choice, task completion, resumption, decision quality, and effects on underrepresented or high-consequence populations require testing with intended people in realistic contexts.

## Common misconceptions

- **“People scan, so detail is bad.”** People use different strategies. Structure should make required detail findable without removing it.
- **“A short label is automatically clear.”** A compact label can conceal destination or effect.
- **“Everything important belongs above the fold.”** Priority depends on task sequence and risk, not a fixed viewport boundary.
- **“A table is always more efficient.”** Tables help comparison but can impede linear reading, small-screen use, speech, and localization.
- **“More choices mean more agency.”** Agency depends on relevant, honest, complete options and an escape route—not raw menu size.

## Related packs

- Context and product state supply authoritative tasks, routes, actors, and transitions.
- Actions and agency govern option provenance, ordering, alternatives, and exits.
- Accessibility and localization govern semantic and material parity across renderings.
- Errors and recovery govern blocked routes, status, and safe return paths.
