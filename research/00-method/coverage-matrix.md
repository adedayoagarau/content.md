---
title: Research coverage and exit criteria
status: active
started: 2026-08-17
updated: 2026-08-17
---

# Research coverage and exit criteria

This matrix prevents a large source collection from being mistaken for a complete model. A workstream is **coverage-scoped and ready for its next evidence phase** when its decision-relevant questions, negative cases, and validation needs are visible. It is complete only when it meets the stated exit criterion and required cumulative maturity target.

## Coverage matrix

| Research area | Evidence needed | Negative cases to seek | Primary validation still required | Exit criterion before v1 stabilization |
| --- | --- | --- | --- | --- |
| Discipline and boundaries | Public capability frameworks, practice descriptions, role definitions, artifacts | Organizations where content design is absent, differently named, centralized, or split across roles | Practitioners and close collaborators across organization sizes | Stable ownership, influence, and escalation map that does not depend on one job title |
| Preconditions to writing | Documented workflows, intake artifacts, service standards, implementation examples | Work done with missing research, incomplete product facts, emergencies, and late-stage requests | Reconstruction of recent real tasks and observed source gathering | A minimum context model plus explicit stop, qualify, and escalation conditions |
| Problem framing | Discovery methods, user-needs practices, journey and service-design methods | Requests where changing words is sufficient; requests where wording masks a product defect | Artifact walkthroughs and contextual observation | Reliable distinction among writing, content design, product design, policy, and service problems |
| Users and inclusion | Accessibility standards, inclusive-design guidance, cognitive-accessibility guidance, multilingual practice | Conflicting needs, proxy users, low-data populations, trauma and crisis contexts | Research with accessibility, inclusion, and affected-community specialists | User-context fields and rules that avoid demographic or emotional stereotypes |
| Cognitive ergonomics and behavioral influence | Primary research, research syntheses, accessibility standards, governing sources, contradiction-preserving claim records, and manipulation counterexamples | Null/heterogeneous effects, myths, safe defaults/reminders, necessary complexity, non-Western/non-English contexts, disabled-user cases, and business lifts paired with user-protection failures | Independent scientific review, content-practice observation, accessibility/locale/risk review, blind fixture adjudication, and affected-user product studies | Guidance remains context-bound; prohibited inference/manipulation is explicit; observable rules pass counterexamples; product claims have appropriate-user evidence; no psychology score or universal effect rule |
| Content models and IA | CMS schemas, content-model guidance, taxonomy and navigation practice, search evidence | Products with code-only content, generated interfaces, unstructured documents, or no CMS | Information architects, content engineers, search, and CMS practitioners | Model supports objects, relationships, hierarchy, findability, and rendered instances without treating every unit as a string |
| Voice, tone, terminology, mechanics | Public voice systems, terminology governance, language and locale standards | Products with multiple brands, white-labeling, regulated language, user-generated content, and no approved voice | Brand, product-content, localization, and domain reviewers | Voice identity, situational tone, controlled terminology, and language mechanics remain separately governable |
| Interaction patterns and states | Design systems, component guidance, production flows, state models | Partial failure, irreversible action, unavailable recovery, asynchronous work, offline states | Journey critiques and implementation walkthroughs | Pattern model covers coordinated slots, states, transitions, consequence, and recovery |
| Channels and modalities | Cross-channel service guidance, notification standards, conversation and voice guidance | Handoffs among UI, email, support, policy, physical service, and autonomous agents | Practitioners responsible for multi-channel journeys | Channel constraints can vary without breaking journey-level meaning, governing applicability, or accountable ownership |
| Domain, industry, and risk | Law, regulation, professional guidance, domain design systems, safety literature | Similar products in different jurisdictions; low-risk moments inside regulated domains; high-risk moments outside them | Legal, compliance, clinical, policy, security, safeguarding, and domain experts | Risk and review derive from the decision and consequence, not an industry stereotype |
| Localization and globalization | Unicode, W3C internationalization, localization standards, bilingual and multilingual workflows | Inflected, gendered, bidirectional, non-segmenting, and culturally adapted languages | Translators, localization engineers, language leads, and non-English product practitioners | Source intent, variables, context, locale scope, parity, review, and linguistic QA are first-class |
| Collaboration and decision control | Governance models, governing instruments, evidence sources, ownership, approval workflows, decision records, source-of-truth practices | Conflicting owners, emergency overrides, stale policy, external regulators, distributed teams | Cross-functional decision reconstruction | Evidence, applicability, ownership, and approval are claim-specific; evidence, decision, and delivery cannot collapse into one status |
| Implementation and content operations | Source extraction, i18n catalogs, CMS and design-tool APIs, release and rollback mechanisms | Runtime-generated content, dead code, tests, hidden layers, feature flags, experiments, and third-party UI | Engineers, localization operations, content operations, and QA | Every managed expression can be traced from decision to exact runtime location and back without mutating behavior silently |
| Research, testing, and measurement | Usability and comprehension methods, analytics, experiments, QA, longitudinal governance | Metric gaming, dark-pattern conversion gains, low-volume flows, inaccessible test methods | Research and analytics practitioners plus benchmark adjudicators | Evaluation is multidimensional, task-specific, harm-aware, and resistant to a single quality score |
| Ethics, safety, and failure | Deceptive-design guidance, privacy, security, AI-risk and high-consequence standards | Manipulative but high-performing copy; false reassurance; over-disclosure; unsafe personalization | Ethics, privacy, security, policy, legal, and affected-user review | Refusal, escalation, least-privilege, provenance, and harm tests are executable requirements |
| Agentic content design | Agent instruction specs, tool interfaces, static analysis, diff workflows, approval systems | Unsupported repositories, hallucinated routes, prompt injection, stale context, and cross-agent conflicts | Builder trust tests and adversarial repository fixtures | Clear boundary among deterministic discovery, model judgment, human authority, and safe execution |
| Standard and ecosystem | Existing file formats, loaders, skills, CLIs, package names, licenses, governance models | Name collisions, case sensitivity, monorepos, proprietary agents, offline and enterprise environments | Maintainers and early implementers across agent ecosystems | Portable core, extension model, compatibility adapters, migration policy, and open governance are explicit |
| Adoption and value | Workflow studies, competitive products, setup tests, willingness-to-pay research, time and quality baselines | Solo projects, mature enterprises, no-design teams, content-led teams, greenfield and legacy products | Concept tests, pilots, and longitudinal adoption studies | The product proves a concrete outcome with bounded setup, review burden, and risk rather than relying on generated-copy volume |

## Representation checks

Each workstream should record whether its evidence includes:

- more than one organization and operating model
- public, private, and regulated contexts where relevant
- small teams and mature enterprises
- greenfield and inherited products
- web, mobile, conversational, messaging, support, and offline handoffs
- low-consequence and high-consequence tasks
- English and non-English practice
- left-to-right and right-to-left contexts
- disabled and cognitively diverse users
- policy, legal, privacy, security, and accessibility review
- design, code, content-management, localization, and production states
- successful patterns, failures, exceptions, and reversals

Absence must be recorded as a gap rather than silently generalized away.

## Research-maturity classification

Use the following cumulative research-maturity classifications for each major finding. This is a derived corpus-level assessment, not a record state. It never substitutes for orthogonal evidence dimensions, an independent decision or delivery state, or a separate evaluation record. A later classification retains the applicable evidence and acceptance criteria of earlier classifications; documentation alone cannot outrank practitioner or product validation.

1. **Candidate:** found in one source or local precedent.
2. **Corroborated:** supported by multiple independent, fit evidence sources; where a governing instrument is relevant, its applicability to the exact claim and scope is recorded separately. A source type, publisher, or custodian does not itself establish applicability or approval.
3. **Boundary-tested:** checked against at least one conflicting case, domain, locale, or operating model.
4. **Practitioner-validated:** reviewed against recent real work, artifacts, or observation.
5. **Product-tested:** represented in a prototype and evaluated on realistic repository fixtures.
6. **Stabilized:** applicable prior practitioner and product validation has met predefined acceptance criteria, and the result is documented with version, scope, migration path, and known limitations.

## Current coverage snapshot

This table applies the research-maturity classification instead of treating the exit-criteria template above as proof of completion. Maturity is evaluated per workstream; no area is yet practitioner-validated, product-tested, or stabilized.

| Research area | Current desk coverage | Supporting artifacts | Current maturity | Main remaining gate |
| --- | --- | --- | --- | --- |
| Discipline and boundaries | Broad role/competency synthesis across public frameworks, research, and practitioner accounts | [Discipline and competencies](../01-discipline/discipline-and-competencies.md), [foundation source notes](../sources/foundations-source-notes.md) | Corroborated | Small-team, non-Anglophone, differently named, and adjacent-role practice |
| Preconditions to writing | Detailed knowledge contract and gated workflow | [Discipline](../01-discipline/discipline-and-competencies.md), [workflow](../02-workflow/end-to-end-workflow.md) | Corroborated | Reconstruction and observation of recent real tasks |
| Problem framing | Reframing, outcome, non-goal, and escalation model | [Workflow](../02-workflow/end-to-end-workflow.md), [foundational findings](../08-synthesis/foundational-findings.md) | Corroborated | Negative cases where a bounded wording edit is sufficient and cases where product/policy must change |
| Users and inclusion | Accessibility, audience, vulnerability, and non-stereotyping requirements are represented | [Discipline](../01-discipline/discipline-and-competencies.md), [domain matrix](../03-domain-matrix/domain-risk-matrix.md), [voice/tone](../03-domain-matrix/voice-tone-terminology.md) | Corroborated for standards; candidate for lived practice | Disabled-user, cognitively diverse, affected-community, trauma-informed, and linguistic-justice research |
| Cognitive ergonomics and behavioral influence | A 49-source desk register, 31 bounded claims, context schema, influence-risk model, 26 adversarial fixtures, candidate rules, and a staged validation protocol now cover all 16 requested domains | [Cognitive synthesis](../10-cognitive-ergonomics/cognitive-ergonomics-and-behavioral-influence.md), [claim register](../10-cognitive-ergonomics/psychology-claim-register.md), [source notes](../sources/cognitive-ergonomics-source-notes.md), [validation protocol](../10-cognitive-ergonomics/practitioner-review-and-validation-protocol.md) | Corroborated/candidate desk foundation; no practitioner, specialist, rule-performance, affected-user, or product validation | Independent scientific review and targeted full-text acquisition where current detail remains access-limited; practitioner task observation; accessibility/locale/ethics/domain review; blinded fixture evaluation; product-specific affected-user evidence |
| Content models and IA | Dedicated desk synthesis covers content models, taxonomy, relationships, navigation, search, structured validation, provenance, repository context, and retrieval boundaries; the product ontology remains a candidate | [Content modeling and IA](../01-discipline/content-modeling-and-information-architecture.md), [IA source notes](../sources/ia-source-notes.md), [candidate system model](../08-synthesis/candidate-system-model.md) | Corroborated desk foundation; candidate product model | Practitioner validation, representative product models, search testing, CMS/code round trips, multilingual cases, and retrieval evaluation |
| Voice, tone, terminology, mechanics | Voice/tone/domain separation and governed terminology model are detailed | [Voice, tone, and terminology](../03-domain-matrix/voice-tone-terminology.md), [domain sources](../sources/domain-source-notes.md) | Corroborated; some boundary testing | Comparative organizational voice systems, multi-brand/white-label/UGC, language-specific mechanics, and practitioner validation |
| Interaction patterns and states | Dedicated desk synthesis covers 12 recurring pattern families, their pre-writing inputs, coordinated slots, states, recovery, accessibility/localization/security boundaries, counterexamples, evaluation, and agent implications | [Interaction-pattern practice](../04-surfaces/interaction-pattern-content-practice.md), [surfaces and states](../04-surfaces/surfaces-states-entry-points.md), [pattern/channel sources](../sources/patterns-channels-source-notes.md) | Corroborated desk guidance; candidate product contracts | Practitioner walkthroughs, product-specific fixtures, user research, implementation tests, and boundary cases across domains/locales |
| Channels and modalities | Dedicated desk synthesis covers 14 channel/modality families, semantic continuity, delivery/attempt states, privacy, handoffs, recovery, accessibility/localization, evaluation, and agent implications | [Channel and modality practice](../04-surfaces/channel-and-modality-content-practice.md), [surfaces and states](../04-surfaces/surfaces-states-entry-points.md), [pattern/channel sources](../sources/patterns-channels-source-notes.md) | Corroborated desk guidance; candidate product contracts | Channel-owner and user research, delivery/provider fixtures, cross-channel journey tests, multilingual practice, and physical-service validation |
| Domain, industry, and risk | Fourteen bounded domain playbooks plus cross-jurisdiction/risk axes | [Domain risk matrix](../03-domain-matrix/domain-risk-matrix.md), [domain source notes](../sources/domain-source-notes.md) | Corroborated; some boundary testing | Specialist applicability review, additional industries, non-US/UK/EU evidence, and incident-protocol validation |
| Localization and globalization | Standards, source-context, locale, grammar, direction, parity, and review requirements are represented | [Technology](../05-technology/repository-and-agent-integration.md), [voice/tone](../03-domain-matrix/voice-tone-terminology.md) | Corroborated for standards | Non-English-first design, translators/localization engineers, in-market testing, and cultural adaptation evidence |
| Collaboration and decision control | Artifacts, review types, and the distinctions among evidence sources, governing instruments, accountable owners, authorized approvers, decision states, delivery states, and evaluation records are detailed | [Artifacts and collaboration](../02-workflow/artifacts-and-collaboration.md), [candidate model](../08-synthesis/candidate-system-model.md) | Corroborated | Real cross-functional decision reconstruction and conflict/override cases |
| Implementation and content operations | Adapter, traceability, extraction, localization, safe-diff, and verification requirements are modeled | [Technology](../05-technology/repository-and-agent-integration.md), [surfaces](../04-surfaces/surfaces-states-entry-points.md) | Candidate | Gold repositories, safe round trips, CMS/TMS/design connectors, runtime-state coverage, and rollback experiments |
| Research, testing, and measurement | Multilayer quality model, methods, benchmark families, and pilot thresholds exist | [Evaluation and benchmarks](../06-evaluation/evaluation-and-benchmarks.md) | Corroborated methods; candidate benchmark | Expert adjudication, user studies, multilingual/accessibility evaluation, baselines, and holdouts |
| Ethics, safety, and failure | Controlled claims, deceptive design, refusal/escalation, provenance, consequence-based risk, and a 26-threat security/privacy model are represented | [Domain matrix](../03-domain-matrix/domain-risk-matrix.md), [security/privacy study](../05-technology/security-privacy-and-trust-boundaries.md), [evaluation](../06-evaluation/evaluation-and-benchmarks.md) | Corroborated standards and threat sources; candidate system controls | Affected-user and specialist review, data-flow decisions, malicious fixtures, adversarial evaluation, and independent security testing |
| Agentic content design | Layered architecture, operating modes, host matrix, candidate ontology, trust zones, capability phases, and P0 release gates exist | [Technology](../05-technology/repository-and-agent-integration.md), [security/privacy study](../05-technology/security-privacy-and-trust-boundaries.md), [candidate model](../08-synthesis/candidate-system-model.md) | Candidate architecture grounded in corroborated sources | Host conformance harness, realistic and malicious fixtures, data/provider decisions, and safe read/write experiments by capability phase |
| Standard and ecosystem | Current instruction/specification landscape, naming collisions, prior art, standards boundaries, and proposed distribution/update controls are documented | [Prior art](../07-landscape/prior-art-and-open-standards.md), [security/privacy study](../05-technology/security-privacy-and-trust-boundaries.md), [systems source notes](../sources/systems-source-notes.md) | Corroborated landscape; candidate supply-chain design | Hands-on competitor tests, name/IP clearance, release provenance implementation, extensions, migrations, and governance |
| Adoption and value | Entry points and value hypotheses are documented | [Foundational findings](../08-synthesis/foundational-findings.md), [gap register](../08-synthesis/research-gap-register.md) | Candidate | Concept tests, willingness-to-pay/buyer research, time/review burden, pilots, and longitudinal adoption evidence |

## Document status vocabulary

Frontmatter `status` describes the role and maturity of a document; it does not certify the whole workstream.

| Status | Meaning |
| --- | --- |
| `active-research` / `active` | Governing research artifact that remains open to evidence and revision |
| `proposed` | Planned method or study not yet executed |
| `research-synthesis` | Evidence-linked synthesis with explicit gaps; not practitioner-validated |
| `working-research` | Substantive research draft still subject to source and specialist review |
| `working-synthesis` | Cross-source synthesis still being reconciled across workstreams |
| `working-note` | Bounded supporting note, not a public generalization |
| `research-candidate` | Testable model or ontology proposal, not a stable schema |
| `research-notes` / `working-source-log` | Structured source records supporting one or more syntheses |
| `template` | Reusable blank structure with no evidentiary claim |

## Stop conditions

Do not stabilize a public specification if any of these remain true:

- the proposed schema assumes that style guidance is the whole discipline
- voice is inferred from industry without organization-specific evidence and approval
- code, design files, or existing copy are treated as unquestioned canon
- one status is used for proposed, approved, implemented, verified, and live content
- non-English content is modeled as an English string plus translation
- user-facing content cannot be mapped to journey state and exact implementation location
- the agent can invent behavior, eligibility, pricing, policy, consent, legal, medical, or safety claims
- any capability phase lacks passing evidence for its applicable P0-A–G gate, including the separate controlled-runtime-verification gate before browser, device, emulator, build, server, or process execution
- a requested operating mode, evidence strength, content approval, repository instruction, or model output is allowed to substitute for an independently constructed task-specific capability grant
- review authority cannot vary by claim type, risk, jurisdiction, and locale
- quality is represented by one score or by alleged AI-authorship detection
- a psychology or behavioral-science effect is applied as a universal rule, an individual cognitive/emotional state or vulnerability is inferred from proxies, or an organizational outcome can compensate for failure in truthfulness, non-deception, material comprehension, valid consent, accessibility, user autonomy, or safety
- the workflow has not been tested on both a new product and an inherited product
