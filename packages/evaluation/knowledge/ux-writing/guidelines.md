# Core UX-writing intelligence routing guidelines

Load only the smallest relevant pack. These files explain and audit the integrated runtime intelligence; they do not independently create runtime authority.

## Workflows

| Task | Workflow |
|---|---|
| Review existing UI content and create a repair brief | `workflows/review-repair.md` |
| Promote researched knowledge into a versioned rule | `workflows/promote-knowledge.md` |

## By task

| Task | Primary files | Add when needed |
|---|---|---|
| Establish facts, actors, authority, or state | `context-state/rules.md` | `context-state/checklist.md` |
| Review consent, cancellation, defaults, or choices | `agency-consent/rules.md` | `agency-consent/smells.md` |
| Review failure, blocked, partial, or unknown outcomes | `errors-recovery/rules.md` | `errors-recovery/checklist.md` |
| Review forms, controls, validation, progress, or notices | `controls-forms/rules.md` | `controls-forms/examples.md` |
| Review headings, links, navigation, lists, or tables | `structure-navigation/rules.md` | `structure-navigation/checklist.md` |
| Review chat, voice, generated answers, or handoff | `conversation-ai/rules.md` | `conversation-ai/smells.md` |
| Review terminology, voice, tone, clarity, or concision | `voice-expression/rules.md` | `voice-expression/examples.md` |
| Review locale, direction, semantics, or multimodality | `accessibility-localization/rules.md` | `accessibility-localization/checklist.md` |
| Design research, review, measurement, or rule promotion | `research-governance/rules.md` | `research-governance/checklist.md` |

## By symptom

| Symptom | Load |
|---|---|
| The copy assumes facts or uses unresolved “we/you/it” | `context-state/smells.md` |
| The interface pressures, bundles, or hides refusal | `agency-consent/smells.md` |
| The error blames, guesses, loops, or strands the user | `errors-recovery/smells.md` |
| A label is detached from component state | `controls-forms/smells.md` |
| A link or structure changes its promise across views | `structure-navigation/smells.md` |
| A system implies human identity, certainty, or relationship | `conversation-ai/smells.md` |
| Style deletes meaning or tone trivializes consequence | `voice-expression/smells.md` |
| Plain language or alt text is treated as conformance proof | `accessibility-localization/smells.md` |
| A heuristic, metric, or generated result is treated as authority | `research-governance/smells.md` |

## Decision tree

```text
Start
├─ Is fact, actor, authority, or state unresolved? → context-state
├─ Is there commitment, consent, loss, or refusal? → agency-consent
├─ Is the state failed, partial, blocked, or unknown? → errors-recovery
├─ Is the content bound to a control or input? → controls-forms
├─ Is the problem findability or information structure? → structure-navigation
├─ Is the interaction conversational or generated? → conversation-ai
├─ Is meaning sound and the remaining issue expression? → voice-expression
├─ Does mode, disability, locale, or direction change delivery? → accessibility-localization
└─ Is this about evidence, measurement, promotion, or lifecycle? → research-governance
```

Hard-plane packs run before `voice-expression`. If a deterministic fact is missing, stop with `unknown`; do not load stylistic guidance to compensate.

## Complete file index

Each pack contains the same five focused files:

| Pack | Files | Purpose |
|---|---|---|
| `context-state/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Facts, actors, evidence, states, and invariants |
| `agency-consent/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Choice, consequence, refusal, consent, and exit |
| `errors-recovery/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Failure origin, uncertainty, retry, recovery, and remedy |
| `controls-forms/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Controls, inputs, validation, confirmation, progress, and notification |
| `structure-navigation/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Hierarchy, routes, links, lists, tables, and task structure |
| `conversation-ai/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Turns, identity, grounding, privacy, repair, and handoff |
| `voice-expression/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Terminology, voice, tone, clarity, concision, and personality |
| `accessibility-localization/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Meaning parity across locale, mode, and access needs |
| `research-governance/` | `knowledge.md`, `rules.md`, `examples.md`, `smells.md`, `checklist.md` | Evidence lanes, evaluation, approval, versioning, and retirement |

Use `knowledge.md` for concepts, `rules.md` for decisions, `examples.md` for original synthetic comparisons, `smells.md` for diagnosis, and `checklist.md` for execution.
