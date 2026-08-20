---
title: Foundational research questions
status: active
started: 2026-08-17
updated: 2026-08-17
---

# Foundational research questions

These questions define the research field. They are intentionally broader than the initial product description so that the proposed system is not built around an incomplete model of content-design work.

## 1. Discipline and boundaries

- How do practitioners and organizations distinguish content design, UX writing, product content, content strategy, information architecture, content engineering, content operations, technical writing, editorial design, conversation design, service design, and marketing copy?
- Which distinctions are stable across organizations, and which are title or maturity differences?
- What does a content designer own, influence, advise on, or escalate?
- How does the role change in startups, agencies, public services, regulated enterprises, design-system teams, and localization-led organizations?
- Which capabilities are individual craft skills, and which require organizational infrastructure?

## 2. Preconditions to writing

- What must be known about the user, their task, prior knowledge, credible situational consequence or strain, accessibility needs, language, culture, and environment without diagnosing or inferring an individual's emotional or cognitive state?
- What must be known about product behavior, state transitions, data, permissions, failure causes, recovery, business rules, policy, and risk?
- What evidence is sufficient to write, and what missing evidence should stop or qualify a decision?
- Which evidence sources are fit for each claim, which governing instruments apply, who is the accountable owner, who is authorized to approve the exact decision, and how are contradictions preserved and resolved?
- How do practitioners distinguish a product fact, design assumption, policy requirement, precedent, preference, and approved decision?

## 3. Problem framing and discovery

- How are requests for “copy” reframed into user, product, journey, and system problems?
- What intake questions, briefs, workshops, research, analytics, support evidence, and competitive review are used?
- How are success, harm, non-goals, constraints, and open questions defined?
- When should a content designer challenge the flow, component, information architecture, or product concept instead of editing words?

## 4. Users, audiences, and inclusion

- How are audience segments, jobs, mental models, literacy, numeracy, domain knowledge, stress, disability, age, and trust represented without stereotyping?
- How do inclusive language, trauma-informed practice, cultural context, and linguistic justice affect decisions?
- How are accessibility requirements turned into content behavior rather than a final checklist?
- What requires research with affected communities rather than rule-based inference?

## 5. Content models and information architecture

- How do content designers define objects, attributes, relationships, labels, navigation, hierarchy, sequencing, disclosure, and findability?
- What is the relationship between semantic content models, UI components, routes, data models, CMS schemas, and API responses?
- How are taxonomy, ontology, metadata, controlled vocabularies, naming systems, and search language governed?
- When is a string the wrong unit of analysis?

## 6. Voice, tone, terminology, and mechanics

- How is voice derived, evidenced, expressed, tested, and maintained?
- How does tone change by observable situation, consequence, affected-user evidence, relationship, channel, and stage without changing identity or claiming to know an individual's emotional state?
- Which rules are global, language-specific, market-specific, domain-specific, surface-specific, or product-area-specific?
- How should preferred, protected, forbidden, deprecated, ambiguous, and controlled terms be represented?
- How are grammar, capitalization, punctuation, numbers, dates, currency, units, names, pronouns, and reading level handled across locales?

## 7. Interaction patterns and states

- What content decisions recur across navigation, onboarding, forms, permissions, authentication, search, filters, empty states, loading, errors, warnings, confirmations, success, destructive actions, billing, settings, notifications, help, and offboarding?
- How should content represent system status, uncertainty, irreversible outcomes, partial failure, asynchronous work, and unavailable recovery?
- How do action labels communicate consequence, commitment, and the next state?
- How are cross-screen coherence and journey-level narrative evaluated?

## 8. Channels and modalities

- How does practice change across web, mobile, desktop, wearable, voice, chat, email, SMS, push, in-product education, support, documentation, physical-digital services, and AI-agent interactions?
- What is the content relationship among UI, transactional messages, lifecycle messaging, help, policy, and marketing?
- How are handoffs and consistency governed when multiple systems generate language?
- What new content contracts are needed when an AI agent acts for a user or explains another agent's action?

## 9. Domain, industry, and risk

- Which content requirements derive from law, regulation, policy, safety, product mechanics, professional convention, or brand preference?
- How do financial, medical, legal, governmental, educational, security, commerce, travel, social, children's, crisis, and AI products differ?
- Which decisions require subject-matter, legal, compliance, clinical, policy, security, or safeguarding review?
- How should the system scale caution and evidence requirements with consequence of error?
- How do geography and jurisdiction alter terminology, disclosures, consent, accessibility, and user rights?

## 10. Localization and globalization

- What information must be preserved for translators: intent, variables, grammatical role, screen context, constraints, screenshots, and state?
- How should plural, gender, case, inflection, word order, expansion, bidirectionality, date/number/currency, and address/name formats be handled?
- Which voice and tone properties can travel across languages, and which must be recreated locally?
- How are source-content quality, pseudo-localization, linguistic QA, transcreation, and market approval integrated?

## 11. Collaboration, accountability, and decision rights

- How do content designers work with product design, research, engineering, product management, brand, marketing, legal, compliance, accessibility, localization, support, data, and subject-matter experts?
- Who can propose, approve, implement, publish, override, and deprecate a content decision?
- How are disagreements, applicability exceptions, and emergency changes recorded, and how are waivers limited to deterministic rules predeclared waiver-eligible whose actual finding severity is `Medium` or `Low`, without changing that severity or ever bypassing `High`/`Critical` findings, `SEC-P0`, control failures, or task-grant boundaries?
- Which content decisions, factual accountabilities, approval routes, custodial responsibilities, and implementation responsibilities should be centralized, federated, or local?

## 12. Implementation and content operations

- Where does content live: design files, code, locale catalogs, CMSs, design systems, spreadsheets, tickets, documents, APIs, or runtime services?
- How are strings inventoried, identified, versioned, reused, reviewed, localized, released, rolled back, and retired?
- How are variables, markup, ICU or MessageFormat syntax, pluralization, and component constraints preserved?
- What drift occurs between design, code, localization, documentation, policy, and production?
- What evidence proves that an approved decision is implemented and live?

## 13. Research, testing, and measurement

- Which methods test comprehension, findability, actionability, trust, memory, completion, error recovery, cognitive load, and emotional impact?
- When are readability formulas useful or misleading?
- How are qualitative findings combined with behavioral and business metrics?
- What baselines, gold sets, rubrics, expert review, user studies, experiments, telemetry, and longitudinal measures are appropriate?
- How are content regressions detected without reducing quality to a single score?

## 14. Ethics, safety, and failure

- What harms can content cause through coercion, obscurity, exclusion, false certainty, manipulative consent, shame, over-personalization, or inaccessible recovery?
- How should dark patterns, deceptive design, unsafe reassurance, blame, disclosure overload, and sensitive personalization be identified?
- When should the agent refuse to write or require human review?
- How should uncertain, conflicting, stale, or missing evidence be surfaced?
- How are privacy and security protected while inspecting repositories and product data?

## 15. Agentic content design

- What belongs in a portable repository contract, an on-demand skill, executable tooling, a decision store, and external source systems?
- How should native agent instruction hierarchy and nested repository scope work?
- How can an agent discover user-facing content without mistaking tests, logs, fixtures, developer text, hidden layers, or dead code for live experience?
- How can the system reason across screens and state transitions rather than linting isolated strings?
- What can be deterministic, what requires a model, and what requires a human?
- How should the independent decision states—`question`, `option`, `proposed`, `approved`, `rejected`, `superseded`, `deprecated`, and `retired`—branch and retain history?
- How should the independent delivery states—`unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, and `removed`—branch and retain history without implying approval or effectiveness?
- How should evidence observation strength, challenge, freshness, lineage, and epistemic qualifier remain orthogonal to decision and delivery states, with approval, release, and evaluation retained as separate records?
- How does the system learn from approved, rejected, superseded, or retired decisions without treating precedent as an applicable governing rule?

## 16. Standard and ecosystem design

- Is the primary artifact a protocol, manifest, or generated view, and which typed evidence, governing-instrument, decision, approval, implementation, release, and evaluation records does it reference rather than collapsing them into one canonical field?
- Should one `CONTENT.md` scale into nested files or a `.content/` directory, and what is the precedence model?
- What minimum schema enables interoperability without flattening the discipline?
- Which extensions should remain open and organization-defined?
- How will schemas, migrations, lint rules, adapters, and compatibility be versioned?
- What governance, licensing, security review, and contribution model would support an open standard?
- How should the project interoperate with existing uses of `CONTENT.md`, `VOICE.md`, `content-md`, `AGENTS.md`, `DESIGN.md`, Agent Skills, and tool-specific instruction files?

## 17. Adoption and value

- What are the entry points for greenfield products, existing products, redesigns, new features, design systems, localization programs, audits, incidents, and migrations?
- What is the smallest proof that demonstrates genuine content-design judgment rather than fluent rewriting?
- What trust, privacy, setup, and workflow barriers prevent adoption?
- Which outputs are useful to solo builders, startups, product teams, content designers, enterprises, and agencies?
- What should remain free/open, and what operational capabilities could form a sustainable product?

## 18. Cognitive ergonomics and behavioral influence

- What exact population, sample, task, environment, comparison, outcome, study design, corroboration, moderators, accessibility limits, cultural limits, harms, and freshness support each psychology claim?
- Which repeated UX or behavioral claims are primary findings, research syntheses, conceptual/narrative models, practitioner hypotheses, governing requirements, myths, or unresolved provenance gaps?
- What must a content designer know about the user's declared goal, prior knowledge, terminology, memory and comparison demands, material information, consequence, choices, defaults, reversibility, situational pressure, access needs, language, locale, and organization/user-goal conflict before proposing content?
- How can the system distinguish assistance, influence requiring review, manipulation risk, prohibited intervention, and unknown context from observable conditions without inferring creator intent or an individual's susceptibility?
- Which interventions—such as social proof, scarcity, urgency, authority, progress, feedback, defaults, reminders, multimodality, or aesthetic/emotional treatment—are truthful, proportionate, user-aligned, accessible, reversible, and adequately evaluated in a declared scope?
- Which requests must be refused rather than tested, including fabricated claims, material concealment, vulnerability-targeted persuasion, coercive defaults, compulsion loops, or conversion-over-autonomy optimization?
- Which candidate checks inspect observable facts, which require contextual human judgment, and which psychological, emotional, cultural, accessibility, or outcome inferences must never be automated?
- How should findability, comprehension, recall, decision quality, task/recovery success, actual/perceived effort, accessibility, trust calibration, emotional appropriateness, autonomy, reversibility, business outcome, and potential harm remain separate?
- Which outcomes are noncompensable, and how do actual severity, waiver eligibility, potential harm, and release disposition remain separate from an expected fixture or rule result?
- What independent scientific, practitioner, accessibility, locale/culture, privacy/ethics, safeguarding, domain-risk, affected-user, and governance evidence is required before a claim becomes guidance, a rule becomes deterministic, or a product intervention is released?
