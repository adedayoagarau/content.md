---
title: Research protocol
status: active
started: 2026-08-17
updated: 2026-08-17
---

# Research protocol

## Objective

Build an evidence-backed model of professional content-design work broad enough to inform a repository-native protocol and agent workflow, without collapsing the discipline into generic writing advice or assuming that one company's practice is universal.

## Coverage model

Research must cover the relationships among:

1. Product and user understanding
2. Information architecture and content modeling
3. Interaction and UX writing
4. Voice, tone, terminology, and mechanics
5. Accessibility, inclusion, localization, and culture
6. Domain, industry, risk, policy, and regulation
7. Research, testing, measurement, and iteration
8. Collaboration, approval, governance, and content operations
9. Source-code, design-tool, CMS, localization, and agent integration
10. Maintenance, decision memory, drift detection, and organizational learning

The model must include web, mobile, conversational, notification, transactional, support, and agent-mediated experiences. It must consider both greenfield adoption and takeover of an existing product.

## Source hierarchy

Prefer sources in this order when the claim permits:

1. Laws, regulations, standards, and official specifications
2. Primary organizational guidance and documented design systems
3. Peer-reviewed research and established professional bodies
4. First-person practitioner talks, case studies, and books
5. High-quality secondary synthesis
6. Vendor claims and community commentary, used mainly for landscape evidence

A company's public writing guide proves that company's documented practice. It does not prove a universal rule.

## Required source record

Each material source note should capture:

- title, author or organization, URL, and publication or update date when available
- source type, evidentiary role/fitness, and limitations; record any governing-instrument applicability, accountable owner, or approver separately
- scope: domain, geography, language, audience, channel, and product surface
- claims supported
- practices or artifacts described
- limitations, commercial incentives, or missing context
- whether the source was read directly, transcript-reviewed, abstract-only, or metadata-only
- the research questions it informs

## Claim discipline

- Separate observed practice from recommendation.
- Preserve conflicts instead of averaging them into a false rule.
- Label inferred voice or terminology; never promote it to approved guidance automatically.
- Treat implemented strings as evidence of current behavior, not proof of approval or quality.
- Treat legal, policy, medical, financial, eligibility, pricing, consent, privacy, and safety claims as controlled facts requiring fit evidence, applicable governing instruments where relevant, accountable owners, and authorized approval routes.
- Avoid deterministic claims about detecting AI authorship. Research observable content-quality patterns and provenance instead.
- Record geography and language because regulation, convention, tone, and inclusion are not globally uniform.

## Canonical claim and source vocabulary

Use claim labels to describe what the research is asserting:

- **Sourced fact:** a factual statement directly supported by the cited source within its scope.
- **Documented practice:** what a named organization or practitioner says it does; not a universal rule.
- **Research finding:** a study result within its stated method, sample, and limitations.
- **Cross-source finding:** a pattern supported by more than one independent source, with direct citations.
- **Inference:** the research team's interpretation of evidence; not directly asserted by a source.
- **Proposal** or **product hypothesis:** a candidate design choice to validate; `product hypothesis` is a proposal subtype.
- **Open question:** an uncertainty with a stated method or owner needed to resolve it.

Source-type labels describe the material, not the strength of the claim: law, regulation, normative standard, model law, official guidance, discussion paper, enforcement action, original research, professional body, documented organizational practice, practitioner account, vendor documentation, or commentary.

Markdown typography is a human-reading aid in this desk corpus, not a machine-readable claim protocol: some prose uses a bold label at the start and some bounded source notes use bracketed source-type tags. A parser must not infer epistemic class or governing applicability from punctuation, emphasis, or source type. Operational records require an explicit typed `claim_label`/epistemic-role field plus separate evidence, applicability, ownership, approval, decision, delivery, and evaluation records, as modeled by the [source record template](../sources/source-record-template.md).

Workstream shorthand maps to the canonical labels: `[ORG-PRACTICE]` and `[DOCUMENTED PRACTICE]` mean documented practice; `[RESEARCH]` means research finding when reporting a study and source type when describing the record; `[SYNTHESIS]` must be stated as inference or proposal in the surrounding sentence. `[LAW]`, `[STANDARD]`, `[MODEL LAW]`, `[OFFICIAL GUIDANCE]`, `[DISCUSSION PAPER]`, and `[ENFORCEMENT]` identify source type and never establish applicability beyond the cited scope.

## Analysis axes

Every workflow, rule, or artifact should be tested against these axes where relevant:

- user and job
- journey stage and interaction state
- surface and channel
- product object or content type
- domain and industry
- risk and consequence of error
- emotional or cognitive context
- locale, language, and culture
- accessibility needs
- evidence sources, governing instruments, accountable owners, approvers, and applicability
- orthogonal evidence dimensions, independent decision and delivery states, and evaluation records

## Quality gate

Before a research synthesis becomes a product requirement:

- material claims have direct citations
- current or mutable facts have been checked recently
- at least one counterexample or boundary condition has been considered
- domain-specific practice is not mislabeled as universal
- inference and recommendation are explicit
- unresolved conflicts remain visible
- practitioner validation needs are recorded

## Planned outputs

- annotated source index
- content-design discipline and competency map
- pre-writing decision workflow
- artifact and governance map
- domain, risk, voice, tone, and terminology matrix
- surface, state, and channel inventory
- technology and agent-interoperability map
- evaluation framework and benchmark requirements
- prior-art and naming analysis
- synthesized content.md ontology plus evidence, control, and decision-rights model
- research gaps and practitioner-interview plan
