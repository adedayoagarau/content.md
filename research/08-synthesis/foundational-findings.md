---
title: Foundational findings for content.md
status: working-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
---

# Foundational findings for content.md

This document synthesizes the first cross-disciplinary research pass. It is not a frozen file specification or implementation plan. Statements are labeled as **cross-source finding**, **inference**, or **product hypothesis** so that observed practice is not silently converted into a universal rule.

## Executive finding

**Cross-source finding:** Content design is not the act of making a string sound better. It is the evidence-led design of meaning, structure, sequence, interaction, and expression across an end-to-end experience. Writing is one output of that work.

The Canadian Digital Service documents content-design responsibility from strategy through surface, including policy constraints, journey mapping, content modeling, information architecture, interaction concepts, language, bilingual parity, implementation, and evaluation. Its workflow starts with purpose, users, facts, constraints, terminology, and an audit before drafting ([CDS content design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)). The UK capability framework likewise describes content architecture, evidence, inclusive design, strategic work, collaboration, and iteration rather than only writing ([UK content-designer capability framework](https://ddat-capability-framework.service.gov.uk/role/content-designer)).

**Product hypothesis:** `content.md` should be a content-decision system that can produce and govern expressions, not a voice prompt that owns a list of strings.

## 1. The working aggregate is a message in context

**Cross-source finding:** A literal string is not enough to evaluate intent, accuracy, usability, tone, accessibility, or risk. The same words can be correct in one state and dangerously wrong in another. CDS places language inside strategy, scope, structure, skeleton, and surface work, while Portmann documents UX language production as distributed across people, artifacts, technical constraints, and code rather than isolated text ([CDS content design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/), [Portmann, *Designing Words*](https://doi.org/10.1017/9781009540605.004)).

**Inference:** A useful auditable aggregate should connect a semantic message decision, its expressions, and its implementation occurrences with:

- the person or actor and their goal;
- the journey, event, trigger, and current state;
- prior knowledge, expectations, evidenced event context, and possible cognitive or emotional load without claiming an individual's emotion;
- the product behavior, consequence, next state, and available recovery;
- the content object, pattern, component, and slot;
- the visible and assistive expression, including variants and variables;
- the channel, device, locale, language, and jurisdiction;
- the evidence sources, governing instruments, accountable owners, and approvers;
- exact design, code, CMS, localization, or runtime occurrences; and
- orthogonal evidence dimensions; independent decision and delivery states; evaluation records; and review triggers.

`message-in-context` remains a candidate aggregate, not a stable identifier. The [candidate system model](candidate-system-model.md#message-and-expression-identity) separates semantic message/decision identity from expression and occurrence identity; the [content-modeling and IA study](../01-discipline/content-modeling-and-information-architecture.md) tests how that identity relates to concepts, objects, taxonomies, navigation, search, retrieval, and system mappings; and the [surface model](../04-surfaces/surfaces-states-entry-points.md#proposed-inventory-record) shows the linked inventory fields.

## 2. What has to happen before a string

**Cross-source finding:** The exact workflow varies, but strong documented practices repeatedly establish user need, service behavior, facts and constraints, terminology, the wider journey, and an evaluation path before treating wording as final. GOV.UK says needs should come from research and be framed as user problems rather than presumed solutions ([learning user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)). CDS explicitly investigates users, subject-matter facts, legal and technical constraints, terminology, current content, and bilingual context before drafting ([CDS content design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)).

**Inference:** A content agent needs twelve pre-writing gates. A gate can be satisfied, explicitly assumed for exploration, or blocked; it must not disappear.

| Gate | Required decision |
| --- | --- |
| 1. Request | What triggered the work, and is content actually the intervention? |
| 2. Outcome | What should a person be able to understand, decide, or do? What harm must be avoided? |
| 3. People | Who is affected, what do they know, and what constraints or access needs shape the moment? |
| 4. Whole journey | What happened before, what happens next, and which actors and channels participate? |
| 5. Behavior | What does the product do in every relevant branch, delay, failure, and recovery state? |
| 6. Facts and control | Which claims are known, uncertain, disputed, jurisdictional, or time-bound; which evidence supports them; which governing instrument applies; who is accountable; and who may approve the scoped decision? |
| 7. Meaning and structure | What concepts, objects, relationships, hierarchy, sequence, and disclosure are needed? |
| 8. Language system | Which voice, situational tone, terminology, and mechanics are approved for this scope? |
| 9. Delivery context | Which pattern, component, slot, channel, variables, limits, and assistive representations apply? |
| 10. Locale and culture | Which languages, scripts, formats, linguistic behaviors, and local approvals are required? |
| 11. Risk and review | What is the consequence of error, and which specialists must review which claims? |
| 12. Evidence of success | How will comprehension, actionability, recovery, inclusion, and production correctness be tested? |

**Product hypothesis:** The CLI should compile a visible context and unknowns report before it generates a content plan. Fluent output cannot substitute for an unsatisfied gate.

The detailed desk syntheses operationalize two frequently under-specified parts of those gates: [content modeling and information architecture](../01-discipline/content-modeling-and-information-architecture.md) and the distinct contracts for [recurring interaction patterns](../04-surfaces/interaction-pattern-content-practice.md) and [channels and modalities](../04-surfaces/channel-and-modality-content-practice.md). Their guidance remains candidate practice until tested with practitioners, products, users, locales, and implementation fixtures.

## 3. The workflow is a lifecycle, not generation followed by linting

**Cross-source finding:** Documented workflows span investigation, setup, structure, drafting, critique, language parity or localization, user testing, specialist review, implementation, production proofreading, release, evaluation, and maintenance. CDS publishes one end-to-end example from investigation through implementation and evaluation; the detailed synthesis compares that and other practices in [end-to-end workflow](../02-workflow/end-to-end-workflow.md) ([CDS content design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/)).

**Inference:** The reusable workflow is:

1. **Intake and triage** — locate the real problem, scope, consequence, and missing participants.
2. **Discover** — gather user, product, domain, policy, language, implementation, and performance evidence.
3. **Model** — map concepts, content objects, journey events, states, entry points, channels, and ownership.
4. **Frame** — state the content problem, desired outcome, risks, assumptions, and non-goals.
5. **Design** — decide hierarchy, sequence, disclosure, patterns, actions, recovery, terminology, voice, and tone.
6. **Draft in context** — create coordinated expressions and variants inside representative interactions.
7. **Critique and resolve** — compare alternatives, test coherence, route controlled claims, and preserve dissent or open questions.
8. **Prototype and evaluate** — test behavior and comprehension with appropriate users and methods.
9. **Approve and localize** — record claim-specific approval; adapt for locales without making source language the universal structure.
10. **Implement** — change only authorized sources while preserving variables, logic, accessibility semantics, and traceability.
11. **Verify** — inspect the built and localized experience across relevant states and channels.
12. **Release and observe** — distinguish shipped from live and monitor intended and unintended outcomes.
13. **Maintain** — respond to product, policy, user, locale, and system changes; deprecate decisions explicitly.

The lifecycle can loop backward at any step. A fact check can reopen design; implementation constraints can reopen the content model; production evidence can overturn an approved pattern.

## 4. Content design owns coherence, not every source of truth

**Cross-source finding:** Content design work is distributed across product, policy, research, design, engineering, accessibility, localization, operations, and other specialist collaborators, with responsibility varying by organization. CDS explicitly describes overlap with service, interaction, research, policy, translation, and development work; Portmann documents distributed UX-language production across organizational and technical actors ([CDS content design](https://digital.canada.ca/service-digital-toolkit/user-centred-design/content-design-at-cds/), [Portmann, *Designing Words*](https://doi.org/10.1017/9781009540605.004)).

**Inference:** Evidence, governing applicability, ownership, and approval are claim-specific; they cannot be reduced to one global precedence list.

| Decision or claim | Typical evidence sources | Governing instrument or approved system, if applicable | Accountable owner and approval route | Content-design responsibility |
| --- | --- | --- | --- | --- |
| User goal, vocabulary, comprehension | Direct research, behavior, search, support, analytics | Research ethics, consent, or organizational research policy where applicable | Local research/product responsibility; approval of the resulting decision remains organization-specific | Frame, synthesize, test, and preserve uncertainty |
| Product behavior and state | Executable behavior, tests, telemetry, accepted specifications | Approved product/state specification or service policy for the exact scope | Accountable product/service owner and declared product-decision approver | Make behavior visible, find contradictions, never invent it |
| Policy, eligibility, rights, pricing | Current policy, commercial records, claim evidence, operational data | Applicable policy, contract, terms, pricing instrument, or rule | Accountable policy/commercial/product owner and authorized claim approver | Translate and structure accurately; escalate gaps |
| Law, regulation, clinical or safety fact | Primary instruments, current professional evidence, specialist analysis | Applicable law, regulation, standard, order, or approved clinical/safety policy | Accountable specialist with the qualified approval route required for the claim | Preserve required meaning, scope, jurisdiction, and approval |
| Brand voice | Organization/product research, existing expressions, customer evidence | Approved voice or brand-language system | Accountable brand/product-language owner and declared approver | Operationalize it in product contexts; do not infer canon silently |
| Product terminology | Research, support/search language, taxonomy, executable object/state evidence | Approved glossary, taxonomy, product/state model, or naming system | Accountable product/domain/language owner and scoped term approver | Govern meaning, scope, confusables, maintenance, and use |
| Accessibility behavior | Platform semantics, disabled-user research, manual and assistive-technology evidence | Applicable accessibility target, standard, platform contract, or organizational policy | Accountable product/accessibility role and the declared implementation/release approval route | Design and verify content semantics and recovery in context |
| Locale expression | Local research, translator/linguist evidence, in-market testing, implementation observation | Applicable local requirements, approved locale terminology, and internationalization contract | Accountable locale/language owner and authorized local/specialist approver | Preserve intent and parity; support adaptation rather than word substitution |
| Runtime presence | Built product, accessibility tree, telemetry, release/configuration records | Release policy and environment configuration where applicable | Accountable engineering/release role; runtime observation itself supplies no content approval | Verify what is observable; do not equate existence with approval |

The entries in these columns are non-equivalent inputs and illustrative routes, not a universal RACI. Every implementation must discover the actual source, applicability, ownership, and approval model for its scope.

**Product hypothesis:** `content.md` should route each property to typed evidence sources, applicable governing instruments, accountable owners, and authorized approvers. It should not duplicate every fact into Markdown and call that file the master truth.

## 5. Voice, tone, domain, and industry are separate systems

**Inference:** Across the reviewed corpus, voice should be modeled as approved organization- or product-specific principles, while tone should adapt to the task and situation. The domain sources reviewed constrain claims, terminology, disclosures, consent, recovery, accessibility, and review; none establishes a universal industry personality. This separation still requires comparative study of public voice systems and practitioner validation. See [voice, tone, and terminology](../03-domain-matrix/voice-tone-terminology.md) and [domain risk matrix](../03-domain-matrix/domain-risk-matrix.md).

**Inference:** The system should model at least these independent layers:

- **voice identity:** approved product or organization characteristics and examples;
- **situational tone:** modulation by task, consequence, emotion, relationship, urgency, and channel;
- **domain language:** technical and professional meanings, controlled claims, and conventional terms;
- **product terminology:** names and concepts specific to the product and user mental model;
- **locale language:** grammar, register, cultural adaptation, formats, and local constraints;
- **mechanics:** capitalization, punctuation, numbers, dates, currencies, units, and formatting;
- **pattern behavior:** what a message must accomplish in a particular interaction and state.

**Product hypothesis:** An installer may infer candidate voice evidence from the existing product, but the underlying evidence record must retain its `inferred` epistemic qualifier permanently. A separate proposed voice decision may later enter the canonical `approved` decision state only for an exact scope through an authorized approver and approval record. Industry is never sufficient evidence for voice.

## 6. Domain is a risk, evidence, and control overlay

**Inference:** Cross-domain sources show that consequence and governing requirements vary by decision within an industry. For example, electronic-transfer disclosures and error procedures, adverse-credit decisions, prescription-drug promotion, and routine product preferences are governed by different facts and controls; an industry label alone cannot select the workflow ([CFPB Regulation E](https://www.consumerfinance.gov/rules-policy/regulations/1005/), [CFPB adverse-action circular](https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/), [FDA OPDP FAQs](https://www.fda.gov/about-fda/center-drug-evaluation-and-research-cder/opdp-frequently-asked-questions-faqs)). Conversely, account recovery or abuse reporting can be high-consequence in an otherwise lightly regulated product.

**Inference:** Classify each content decision across independent axes:

- consequence of misunderstanding or action;
- reversibility and available recovery;
- factual, legal, financial, health, safety, privacy, security, or rights sensitivity;
- vulnerability, power imbalance, stress, urgency, and disclosure burden;
- automated-decision, consent, personalization, or child/dependent involvement;
- jurisdiction, locale, channel, and public/private context; and
- required evidence dimensions, applicable governing instruments, accountable owners, authorized approvers, retention, and auditability.

**Product hypothesis:** Domain packs can provide issue-spotting, required questions, source adapters, terminology structures, and review gates. They must not pretend to replace counsel, clinicians, compliance, policy, security, safeguarding, or local-language experts.

## 7. Accessibility and localization are architecture

**Cross-source finding:** Accessibility involves headings, labels, instructions, error identification, status communication, accessible names, focus behavior, and complete processes—not a final readability check ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)). Multilingual delivery involves grammar, plural and select behavior, word order, script direction, formats, and contextual meaning—not an English string passed downstream. MessageFormat 2 and Unicode locale data exist because dynamic language behavior must be structured ([Unicode MessageFormat](https://messageformat.unicode.org/), [Unicode CLDR](https://cldr.unicode.org/)).

**Product hypothesis:** Visible text, accessible representations, variable grammar, locale variants, and translation context should be linked parts of one decision. The tool should block unsafe concatenation and expose when a static source-language string is not the whole message.

## 8. Existing product content is evidence, not canon

**Inference:** Documented practice and system boundaries show that takeover work can begin with code, design files, CMS entries, localization catalogs, support content, policies, research, and live behavior that contradict one another. No reviewed source type is universally authoritative for every claim: executable behavior can establish what a build does, while policy, legal meaning, user understanding, locale quality, and approval require different evidence and owners. See [artifacts and collaboration](../02-workflow/artifacts-and-collaboration.md) and Portmann's account of language work distributed across artifacts and code ([Portmann, *Designing Words*](https://doi.org/10.1017/9781009540605.004)).

**Inference:** Every discovered item needs at least:

- source and exact location;
- access mode and observation date;
- scope and runtime conditions;
- evidence observation strength, challenge, freshness, lineage, and epistemic qualifier;
- applicable governing instrument, accountable owner, authorized approver, and exact approval record where applicable; and
- independent decision and delivery states plus separate evaluation and conflict records.

**Product hypothesis:** Existing-product takeover must begin in read-only discovery. The first deliverable is an evidence-linked baseline plus a map of governing instruments, evidence sources, accountable owners, and approvers—not a bulk rewrite.

## 9. The agent needs bounded operating modes

**Inference:** A practical model has five modes with progressively higher action scope and risk: Discover, Advise, Draft, Apply, and Enforce. A mode describes intent; it never grants capability. Every action requires a separately constructed, least-privilege capability grant and the applicable phase gate, plus every applicable current connection-authorization, data-processing, durable-memory, and telemetry record (or an explicit not-applicable rationale), scope lock, and provenance. Typed semantic-decision, mutation/change, and release approvals, preview, rollback, readback, and verification are required only when their decision or operation class applies; none of those controls or approvals grants capability. The canonical candidate definitions are in [Agent operating modes](candidate-system-model.md#agent-operating-modes).

## 10. Reading, reasoning, writing, publishing, and enforcing are different security products

**Cross-source finding:** Agentic risk grows through excessive functionality, permissions, or autonomy; prompt injection and untrusted inputs can affect downstream action; and authorization must be enforced outside the model. OWASP recommends minimizing extensions and permissions, requiring approval for high-impact actions, and treating model output as untrusted, while NIST frames AI risk work as contextual governance, measurement, and management rather than a blanket safety property ([OWASP excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/), [OWASP prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/), [NIST AI RMF](https://airc.nist.gov/airmf-resources/airmf/0-ai-rmf-1-0/)).

**Inference:** Static local discovery, model-assisted analysis, connected reads, draft generation, local apply, remote publication, controlled runtime verification, and autonomous enforcement require separate capability envelopes, credentials, data boundaries, approvals, tests, and release claims. Starting a build, server, browser, device, emulator, or process is not static read-only discovery and requires its own gated, task-bounded executor. A read-only milestone cannot provide evidence that a future execution or write path is safe.

**Product hypothesis:** The first executable release should statically inspect explicitly scoped, allowlisted files without running repository code, installing repository packages, using connectors, writing files, or sending content to a model by default. Later capabilities should unlock only after their own threat, privacy, authorization, provenance, rollback, and verification gates pass. See [security, privacy, and trust boundaries](../05-technology/security-privacy-and-trust-boundaries.md).

## 11. The repository artifact is a system of layers

**Sourced fact:** `AGENTS.md` is a widely supported free-form repository instruction surface with nested-file precedence, while Google Labs' `DESIGN.md` is an alpha structured visual-identity format with a CLI. Agent Skills uses a `SKILL.md` plus optional scripts, references, and assets with progressive disclosure ([AGENTS.md](https://agents.md/), [Google Labs DESIGN.md](https://github.com/google-labs-code/design.md), [Agent Skills specification](https://agentskills.io/specification)). These citations are an ecosystem convention and project specifications. Existing coding agents do not all auto-load arbitrary `CONTENT.md` files in the same way.

**Product hypothesis:** The likely portable architecture is:

| Layer | Responsibility |
| --- | --- |
| `CONTENT.md` | Compact, human-readable, approved repository contract and router |
| `.content/` | Structured evidence, content models, terminology, patterns, journeys, decisions, waivers, inventory, and evaluation fixtures |
| `content-design/SKILL.md` | On-demand research, design, review, implementation, and maintenance workflow |
| CLI and libraries | Deterministic discovery, adapters, validation, diff, traceability, migration, and CI checks |
| Agent adapters | Install or reference the contract through each tool's native instruction mechanism |
| External connectors | Read current policy, design, CMS, localization, analytics, or research sources without pretending copied data is canonical |

This separation also limits context size: approved rules stay concise while evidence and procedures load only when required.

**Inference:** Ditto is the closest current direct precedent found in this landscape review.

**Sourced fact:** Ditto's vendor documentation describes an agent setup package, always-on instructions, MCP, audits, and alpha repository-local `workspace.ditto.md` and `*.ditto.md` component specs. Those specs declare text surfaces and synchronize style, terminology, locale, and length rules; its audit workflow resolves inline, i18n/plural, and Ditto-managed text and flags computed values it cannot resolve ([Ditto agent setup](https://developer.dittowords.com/agent-setup-package/overview), [Ditto Specs](https://developer.dittowords.com/ditto-specs-cli-reference/overview), [Ditto agent skills](https://developer.dittowords.com/ditto-specs-cli-reference/agent-skills)). These are documented vendor mechanics, not independently benchmarked outcomes.

**Inference:** “Repository-native copy governance” is not an unoccupied category. The proposed system has to prove a wider or better job—such as evidence and authority resolution, user and product understanding, IA/journey/state design, high-risk escalation, safe multi-source implementation, and outcome evaluation—and should test interoperability with Ditto rather than ignore it.

## 12. `CONTENT.md` is not a vacant name

**Sourced fact:** Vendor and project documentation shows that GitCMS already uses root `CONTENT.md` for site-wide AI writing instructions, `content-md` is a separate draft specification and CLI for serving page-level Markdown representations to web agents, and `VOICE.md` is an alpha voice-and-lexicon specification with linting. These are adjacent or overlapping precedents, not evidence that the proposed lifecycle already exists ([GitCMS CONTENT.md](https://gitcms.dev/docs/ai-mcp/content-instructions/), [content-md](https://contentmd.org/), [VOICE.md](https://github.com/efeoncepro/voice.md)).

**Inference:** The on-disk contract may still use `CONTENT.md`, but the public project, CLI package, and domain need a deliberate naming and interoperability decision. See [prior art and open standards](../07-landscape/prior-art-and-open-standards.md).

## 13. “AI content detection” is the wrong promise

**Cross-source finding:** Authorship detectors do not provide a reliable foundation for declaring that product content was written by AI. OpenAI withdrew its own classifier for low accuracy and warned of limitations; published detector research also documents evasion and spoofing risks ([OpenAI classifier notice](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/), [Sadasivan et al.](https://arxiv.org/abs/2303.11156)).

**Product hypothesis:** Evaluate observable defects instead:

- unsupported or overconfident claims;
- generic, vague, repetitive, or context-free language;
- false empathy, canned enthusiasm, unnecessary metaphor, or inappropriate informality;
- terminology, voice, mechanics, and pattern violations;
- missing state, consequence, recovery, source, or locale context;
- suspicious unreviewed provenance or unexplained bulk change.

The system can report provenance that exists; it cannot infer authorship as fact from style.

## 14. Quality cannot collapse into one score

**Cross-source finding:** Content quality spans multiple outcomes and constraints rather than one prose score. ISO 9241-11 ties usability to specified users, goals, and context; NIST combines task performance with qualitative evidence; WCAG requires accessibility evidence beyond readability; internationalization standards add language and locale behavior ([ISO 9241-11:2018](https://www.iso.org/standard/63500.html), [NIST usability testing](https://www.nist.gov/programs-projects/usability-testing), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [W3C internationalization](https://www.w3.org/International/quicktips/index)). Some objectives can conflict: legal completeness can increase cognitive load, while a conversion gain can result from coercive design.

**Product hypothesis:** Evaluation should combine:

- deterministic structural and terminology checks;
- traceability, source-fitness, governing-applicability, and approval checks;
- state, journey, accessibility, and localization coverage;
- expert adjudication and controlled-claim review;
- task-based user research and comprehension testing;
- product telemetry with harm and guardrail metrics;
- build, rendering, i18n, and production verification; and
- longitudinal drift, staleness, exception, and maintenance checks.

See [evaluation and benchmarks](../06-evaluation/evaluation-and-benchmarks.md).

## 15. Entry points are product moments and adoption moments

The surface inventory covers how people enter or resume a product: navigation, search, links, identity, invitations, notifications, interruptions, recovery, partner handoffs, APIs, CLIs, agents, and assistive navigation.

**Inference:** The product itself also has multiple adoption entry points:

- greenfield product foundation;
- inherited-product discovery and baseline;
- one new feature or journey;
- redesign or migration;
- design-system pattern creation;
- localization expansion;
- rebrand or terminology change;
- legal, policy, pricing, or regulatory change;
- content debt and consistency audit;
- accessibility remediation;
- incident, trust, abuse, or recovery work;
- merger, acquisition, white-label, or multi-brand integration;
- CMS, framework, or localization-platform migration;
- agent-generated experience governance; and
- continuous review of changed strings in development.

Each entry point changes the evidence available, risk, governing instruments, accountable owners, acceptable automation, and definition of done.

## 16. The first build should prove judgment and safe execution

**Inference:** Repository-wide “take over all content” is a product destination, not a safe first benchmark. A bounded journey can still exercise discovery, IA, terminology, interaction content, states, accessibility, localization, domain constraints, implementation, and governance.

**Product hypothesis:** The first end-to-end benchmark should require the system to:

1. select one real journey and explicit scope;
2. discover its content across source files, resources, rendered states, and adjacent channels;
3. compile user, behavior, evidence, governing instruments, ownership, approval, risk, language, and locale context;
4. expose unknowns and conflicting evidence;
5. create a journey-level content plan and coordinated expressions;
6. obtain scoped human approval;
7. apply only the approved content/resource changes;
8. preserve logic, variables, accessibility semantics, and localization structure;
9. verify build, runtime states, content rules, and exact source mapping; and
10. record accepted, rejected, and amended decision dispositions separately from the evaluation methods, samples, results, and limitations that informed them—neither becomes automatic canon.

## 17. Cognitive ergonomics is a context and evaluation layer, not a behavior-hack library

**[Cross-source finding]** The cognitive-ergonomics desk review found no defensible path from a named psychology effect to a universally better string, layout, choice count, color, shape, modality, tone, or persuasion tactic. The 31 claim records retain their populations, tasks, outcomes, moderators, counterevidence, accessibility and cultural limits, harms, and product-validation needs; several popular rules—fixed memory counts, universal F/Z scanning, universally fewer choices, and the `60,000 times faster` visual claim—are unsupported as product rules. See the [cognitive-ergonomics synthesis](../10-cognitive-ergonomics/cognitive-ergonomics-and-behavioral-influence.md), [claim register](../10-cognitive-ergonomics/psychology-claim-register.md), and [source notes](../sources/cognitive-ergonomics-source-notes.md).

**[Inference]** Before proposing content, the system should resolve or expose as unknown the exact user goal and material decision; prior knowledge and terminology evidence; memory and comparison demands; credible situational consequence without diagnosing a person; choices, defaults, reversibility, and recovery; factual progress, scarcity, social, and authority claims; accessibility, language, locale, and culture; user versus organizational benefit; and independent outcome and harm plans. It must refuse inferred-vulnerability persuasion, fabricated influence claims, concealed material information, coercive defaults, compulsion loops, and any optimization that makes truthfulness, non-deception, material comprehension, valid consent, accessibility, user autonomy, or safety compensable.

**[Product hypothesis]** A future compiler can deterministically inspect only observable, approved conditions such as a missing claim source/denominator, a material term mapped after commitment, a silent material preselection, a false progress denominator, or a supported recovery path concealed from the experience. Comprehension, emotional appropriateness, decision quality, cognitive effort, trust calibration, cultural fit, autonomy, and potential harm remain separate contextual or user-research outcomes. The [candidate rules](../10-cognitive-ergonomics/content-contract-and-lint-candidates.md), [adversarial fixtures](../10-cognitive-ergonomics/adversarial-behavioral-influence-fixtures.md), and [validation protocol](../10-cognitive-ergonomics/practitioner-review-and-validation-protocol.md) are proposed and unexecuted; none authorizes enforcement, personalization, experimentation, or product change.

## Research boundary

This first synthesis establishes a broad model and exposes product implications. It does not establish global representativeness. Public sources overrepresent Anglophone government and large technology organizations; tacit work, internal conflict, non-English practice, small-team realities, and specialist decision-making require primary practitioner research. The [practitioner research plan](../00-method/practitioner-research-plan.md) defines the next evidence phase.
