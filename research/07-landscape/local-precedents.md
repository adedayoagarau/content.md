---
title: Local precedents and reusable lessons
status: working-note
updated: 2026-08-17
source_scope: local-read-only
publication: private-local-only
---

# Local precedents and reusable lessons

This note records relevant structures found in adjacent local work. These artifacts are evidence of prior design thinking and implementation experience. They are not universal content-design rules and must not be copied into a public specification without separating company-specific doctrine, confidential context, and generalizable structure.

## Carter content-design system

**Private source read directly:** local Carter content-contract repository, `content-design-system/README.md`.

The system already separates several knowledge types:

- terminology entries
- product briefs and product registry
- pattern contracts
- playbook or domain rules
- harvest metadata that maps design evidence to products and patterns

**Inference:** A general repository content system will probably need separate contracts for product facts, terminology, interaction patterns, and evidence provenance. Combining them into one undifferentiated voice guide would lose important authority and lifecycle differences.

## Pattern slot contracts

**Private source read directly:** local Carter content-contract repository, `content-design-system/patterns/full_page_error.yaml`.

The full-page error pattern defines:

- a stable pattern identifier and human name
- applicable surfaces
- related terminology and backing doctrine
- example evidence references
- required and optional slots
- slot-specific constraints for headline, body, primary action, and secondary action

**Inference:** The unit of content work is often a structured interaction pattern with relationships among slots, not a free-standing string. A future protocol should be able to express required slots, coordinated meaning, component constraints, recovery behavior, and applicable states.

## Terminology decisions

**Private source read directly:** local Carter content-contract repository, `content-design-system/terminology/glossary_entries/continue-cta.md`.

The terminology entry records historical local fields that must be translated into the public candidate model rather than copied as canonical vocabulary:

- canonical identifier and customer-facing term
- type, proximity to customers, a local status field, ambiguity, and legal sensitivity
- a locally named owner and last-reviewed date
- surfaces and locally designated sources
- semantic meaning, usage, examples, and terms it must not be confused with

The entry also demonstrates that superficially generic labels can carry product-specific state-transition meaning. “Continue” and “Pay now” are not interchangeable style preferences when they signal different commitments and outcomes.

**Inference:** A portable terminology contract needs semantics, scope, evidence sources with orthogonal observation/challenge/freshness/lineage/epistemic dimensions, applicable governing instruments, accountable owners, authorized approvers and approval records, independent decision and delivery states, evaluation links, review dates, sensitivity, and confusion relationships—not only preferred and forbidden word lists. The local fields above cannot be imported without this typed translation.

## Domain and risk rules

**Private source read directly:** local Carter content-contract repository, `content-design-system/playbook/domains/p1_compliance_limitations.yaml`.

The domain extract scopes rules by surface and slot, records regulatory class, bans unsupported promissory language, and requires clear next steps only when a recovery path actually exists.

**Inference:** Domain guidance should primarily constrain evidence, claims, terminology, disclosure, and recovery. It should not be reduced to an industry personality such as “finance sounds trustworthy.”

## Live doctrine and staleness

**Private source read directly:** local Carter content-contract repository, `content-design-system/playbook/README.md`.

The local playbook explicitly identifies repository YAML as an offline fallback and points to live organizational sources as the intended current reference.

**Inference:** A repository contract must represent each retrieved artifact as untrusted data and record its evidence role plus observation strength, challenge, freshness, lineage, and epistemic qualifier. Separately, it must record any applicable governing instrument, accountable owner, authorized approver and approval record, decision state, delivery state, and evaluation result. Local words such as “canonical,” “mirrored,” “cached,” or “authority” are historical vocabulary, not substitutes for those typed records. Version control alone does not make a copied guideline governing, approved, or current.

## Agent separation

**Private source read directly:** local Carter repository, `docs/a2a/agent-cards/ux-writing.json`.

The agent card separates drafting and critique tasks, defines input and output contracts, and distinguishes a planned contract from a shipped implementation.

**Inference:** The public system should distinguish declared capability, installed capability, invoked workflow, verified result, and production state. A named agent or skill is not proof that its behavior ran successfully.

## Generalizable structural candidates

These are research candidates, not approved specification fields:

- stable identifiers
- scope by product, journey, surface, state, locale, and slot
- human-readable rationale plus machine-readable constraints
- evidence sources and their observation-strength, challenge, freshness, lineage, and epistemic dimensions
- separately applicable governing instruments and recorded applicability
- independent decision and delivery states plus maintenance/supersession records
- accountable owner, authorized approver, exact approval record, and review date
- legal, policy, accessibility, localization, and safety sensitivity
- preferred, forbidden, protected, deprecated, and confusable terminology
- structured pattern slots and cross-slot coherence
- examples and counterexamples
- exception and waiver handling
- observed implementation links
- live-occurrence observations and evidence freshness metadata, without treating liveness as governing authority

## Boundary

PayPal- and Carter-specific wording, product taxonomy, internal source locations, approval claims, and domain rules remain local precedent. This note is excluded from a public export; only validated, de-identified structural lessons may inform the public research synthesis.
