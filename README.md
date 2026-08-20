---
title: content.md research program
status: active-research
started: 2026-08-17
updated: 2026-08-20
foundation_draft: 0.2
implementation_status: foundation-workspace-in-progress
---

# content.md

`content.md` is being investigated as a repository-native content-design system: a durable content contract plus an agent workflow that can understand a product, make governed content decisions, change implementation safely, and keep the product's language coherent over time.

This workspace begins with research. A first foundational desk-research corpus is assembled and under review, but the coverage gate is not closed. No schema, CLI behavior, authority claim, or product promise is canonical until it survives the primary research and benchmark program.

## Implementation status

The [universal-agent architecture](docs/superpowers/specs/2026-08-20-contentmd-universal-agent-design.md) is approved for implementation planning, and the [foundation vertical-slice plan](docs/superpowers/plans/2026-08-20-contentmd-foundation-vertical-slice.md) is now being executed on `feature/contentmd-foundation`. The repository contains the initial TypeScript workspace and package boundaries. It does not yet contain a functional `contentmd` CLI or retained agent workflow.

## Start here

1. [Foundational findings](research/08-synthesis/foundational-findings.md) — the cross-workstream answer and current product implications.
2. [Candidate content-decision system model](research/08-synthesis/candidate-system-model.md) — the ontology, orthogonal evidence dimensions, independent decision and delivery states, typed control records, scope, and compiler boundary to test.
3. [Research gap register](research/08-synthesis/research-gap-register.md) — the evidence still required before a responsible public specification.
4. [Research index](research/INDEX.md) — every current artifact and source record in this working corpus.

## What the current synthesis supports

- Content design is an end-to-end decision discipline, not string polishing or a voice prompt.
- A leading candidate for the auditable aggregate is a **message in context**: a semantic content decision linked to user, journey, event, state, behavior, consequence, recovery, expressions, implementation occurrences, and evidence. Its minimum identity is not yet stabilized.
- Content modeling and information architecture belong before expression: concepts, objects, relationships, hierarchy, navigation, search, retrieval, and mappings to code, CMS, API, and component systems must remain distinguishable.
- Interaction patterns and channels are behavior, state, delivery, and recovery contracts—not containers to fill with generic copy.
- There is no defensible universal industry voice. Brand voice, situational tone, domain constraints, controlled terminology, locale, accessibility, and risk are separate inputs.
- Existing code, design, CMS, help, and live content are evidence, not automatic canon.
- The agent needs bounded Discover, Advise, Draft, Apply, and Enforce modes. A mode never grants capability; enforcement can act only on approved deterministic rules within the separately granted scope.
- Static discovery, model analysis, connected reads, isolated drafting, local edits, remote publication, controlled runtime verification, and enforcement are separate capability phases; each needs its own trust boundary, task-specific grant, and passing release gate.
- A portable system will likely need a compact `CONTENT.md` contract, structured working data, an on-demand skill, deterministic tooling, native host bridges, and external connectors.
- Accessibility, localization, verification, maintenance, and measurement belong in the architecture from the beginning.
- Cognitive ergonomics must be evidence- and context-bound: named effects are not universal writing rules, individual cognitive or emotional states must not be inferred from proxies, and business outcomes cannot compensate for failures in truthfulness, non-deception, material comprehension, valid consent, accessibility, user autonomy, or safety.

## What is not built yet

This repository does not yet contain the public `CONTENT.md` format, a CLI, a production skill, domain packs, or a claim of universal agent compatibility. Those decisions remain deliberately open until practitioner studies, annotated repositories, adversarial tests, and a hands-on comparison with the closest prior art establish the safe minimum.

## Research question

What knowledge, evidence, decisions, artifacts, workflows, constraints, and verification methods would a capable content designer need in order to work responsibly across a software product—and how can those practices become a portable repository contract and agentic workflow?

## Research map

| Area | Primary question | Location |
| --- | --- | --- |
| Method | How will claims be sourced, classified, and reviewed? | `research/00-method/` |
| Discipline | What is content design, and where are its boundaries? | `research/01-discipline/` |
| Workflow | What happens before, during, and after a string is written? | `research/02-workflow/` |
| Domains | How do industry, risk, audience, culture, and regulation change decisions? | `research/03-domain-matrix/` |
| Surfaces | Where does product content appear, and through which states and channels? | `research/04-surfaces/` |
| Technology | How can repositories, design tools, localization systems, and agents interoperate safely? | `research/05-technology/` |
| Evaluation | How is content quality, safety, and effectiveness tested? | `research/06-evaluation/` |
| Landscape | What standards, tools, competitors, and naming collisions already exist? | `research/07-landscape/` |
| Synthesis | What should content.md become, based on the evidence? | `research/08-synthesis/` |
| Experimental | How will practitioner decisions, competing products, voice/tone measurement, judge agents, and a bounded journey be tested? | `research/09-experimental/` |
| Cognitive ergonomics | How should cognition, behavioral influence, accessibility, culture, manipulation risk, and scientific-claim hygiene change content decisions? | `research/10-cognitive-ergonomics/` |

## Evidence labels

- **Sourced fact:** directly supported by a cited source within its scope.
- **Documented practice:** a named organization or practitioner's account; not automatically universal.
- **Research finding:** a study result within its method, sample, and limitations.
- **Cross-source finding:** supported by more than one independent source with direct citations.
- **Inference:** a conclusion drawn from evidence and labeled as such.
- **Proposal:** a candidate design choice; not yet validated.
- **Product hypothesis:** a proposal subtype that states a behavior or outcome to test.
- **Open question:** an uncertainty that requires more evidence or a named decision path.

Labels such as law, standard, official guidance, research, practitioner, or vendor describe the source type. They do not by themselves prove that a requirement applies to a particular product. The canonical vocabulary and legacy-label mapping are in the [research protocol](research/00-method/research-protocol.md#canonical-claim-and-source-vocabulary).

## Current boundary

Research artifacts are working material with an evidence cutoff of 17 August 2026. They are not yet a `CONTENT.md` specification and must not be treated as production-ready content, psychology, behavioral-science, legal, clinical, regulatory, localization, accessibility, security, or safety guidance. In particular, the repository has no executable, connector, credential, or write path; proposed controls have not been implemented or security-tested.

## Next evidence phase

The first conforming primary, product, calibration, fixture, and benchmark studies are designed but not yet executed. A synthetic field-kit tabletop and nonconforming environment reconnaissance have run only to test methods and boundaries; they provide no practitioner, product-comparison, or user-outcome evidence. The conforming studies will reconstruct recent content decisions with practitioners; review the cognitive-ergonomics claim register with qualified scientific and accessibility specialists; test the cognitive-context packet and influence boundaries with practitioners and affected users; model real multilingual and high-risk work; implement the first inherited-product checkout-recovery fixture; benchmark its specified discovery, proposal, and evaluation tasks; and recollect direct-product observations under the conforming desktop protocol. The current shared fixture independently covers workflow stages 3, 5, and 6. Greenfield fixtures, safe round-trip mutation, rendered implementation verification, instruction-host loading, and a complete discovery-to-release journey remain later experiments rather than current design coverage.

The executable sequence is defined by the [practitioner decision-reconstruction protocol](research/09-experimental/practitioner-decision-reconstruction-protocol.md), [field kit](research/09-experimental/practitioner-field-kit.md), [cognitive-ergonomics practitioner protocol](research/10-cognitive-ergonomics/practitioner-review-and-validation-protocol.md), [product desktop study protocol](research/09-experimental/product-desktop-study-protocol.md), [product-study and judge-agent system](research/09-experimental/product-study-and-judge-agent-system.md), [voice/tone graph and measurement model](research/09-experimental/voice-tone-graph-and-measurement.md), and [shared benchmark fixture specification](research/09-experimental/shared-benchmark-fixture-specification.md). The [field-kit tabletop rehearsal](research/09-experimental/practitioner-field-kit-tabletop-rehearsal-2026-08-17.md) traces the synthetic control paths without creating participant evidence. The [human calibration instrument](research/09-experimental/voice-tone-human-calibration-instrument.md) defines hard-before-style admission, pairwise judgments, uncertainty, held-out testing, and multilingual boundaries without assigning gold labels. The [materials and access register](research/09-experimental/materials-and-access-register.md) records what is present, missing, or authorization-gated across phases 1–6; the [dated public-product refresh](research/09-experimental/public-product-source-refresh-2026-08-17.md), [public-source product baseline](research/09-experimental/public-source-product-study-and-judge-baseline-2026-08-17.md), and [public voice-system corpus](research/09-experimental/public-voice-and-tone-systems-corpus-2026-08-17.md) keep official-source claims separate from desktop-observed behavior. The [browser-isolation options paper](research/09-experimental/desktop-research-browser-isolation-options-2026-08-17.md) defines the next action-time environment decision. The underlying priorities and unresolved evidence remain in the [practitioner research plan](research/00-method/practitioner-research-plan.md) and [gap register](research/08-synthesis/research-gap-register.md).

No executable harness has been built. The exact proposed planning boundary is now in the [v0 architecture and bounded-build decision packet](research/09-experimental/v0-architecture-and-build-decision-packet.md). A user direction alone does not close its authority gate: implementation planning begins only after the recorded repository/product-owner decision, research/system-architecture-owner decision, and security/privacy consultation are present and compatible. Executable work then retains its applicable security, privacy, runtime, supply-chain, and task-specific authorization controls.
