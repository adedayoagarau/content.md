---
title: Practitioner research plan
status: proposed
updated: 2026-08-17
---

# Practitioner research plan

Desk research can identify documented standards and public practices. It cannot reliably reveal tacit judgment, organizational negotiation, unofficial workarounds, or the gap between published guidance and daily work. Those questions require primary research with practitioners and their collaborators.

## Research objectives

1. Reconstruct what content designers actually do before, during, and after writing.
2. Identify decisions and artifacts that public style guides omit.
3. Understand how authority, risk, approval, and implementation differ across organizations.
4. Find recurring failure modes in code, design tools, localization, and content governance.
5. Test which parts of the work practitioners would trust an agent to observe, advise on, apply, or enforce.
6. Collect anonymized decision examples suitable for an evaluation set.

## Participant matrix

Recruit across role, domain, organization, language, and maturity rather than relying on one title.

### Core practitioners

- product content designers and UX writers
- content strategists and information architects
- conversation designers
- content-system and content-operations leads
- localization and globalization specialists
- accessibility and inclusive-design specialists
- content researchers or content-focused user researchers

### Close collaborators

- product and service designers
- product managers
- frontend and localization engineers
- researchers and data analysts
- legal, compliance, policy, clinical, security, or safeguarding reviewers
- customer support and operations staff
- brand, marketing, editorial, and technical-writing partners

### Domain coverage

- public services
- financial services, payments, credit, and insurance
- healthcare and wellbeing
- commerce and marketplaces
- education
- enterprise software, developer tools, and cybersecurity
- consumer social, community, entertainment, and games
- travel, mobility, and logistics
- AI assistants and agent-mediated products
- children, family, crisis, and other high-consequence services

### Geographic and linguistic coverage

Include practitioners responsible for:

- English-language products in more than one market
- multilingual and bidirectional products
- translation, transcreation, and source-content quality
- markets with different legal, cultural, literacy, and device contexts

## Recommended study sequence

### Phase 1: Exploratory interviews

Begin with 20 to 30 semi-structured interviews across the matrix. This is a purposive maximum-variation starting range, not a statistically representative sample or a guaranteed saturation point. Review coverage after each batch of five: extend recruitment when new decision structures, negative cases, or underrepresented language/domain/organization strata continue to appear. Use recent real projects instead of asking only for abstract philosophy.

Ask participants to reconstruct:

- the request they received
- what was missing or misleading in the request
- evidence they sought
- people and sources they consulted
- artifacts they created
- decisions they challenged
- alternatives considered and rejected
- approval and implementation path
- how they knew the work succeeded or failed
- what they would and would not delegate to an agent

### Phase 2: Artifact walkthroughs

With permission and redaction, review examples such as briefs, journey maps, content models, taxonomies, prototypes, decision logs, string inventories, terminology records, test plans, review comments, locale notes, and production QA reports.

The purpose is to identify fields, relationships, and states that a repository contract would need—not to collect proprietary copy.

### Phase 3: Contextual observation

Aim initially to observe 6 to 10 content tasks from intake through implementation where feasible, sampled across materially different risk and operating contexts. Continue or narrow only with a documented coverage review; task count alone does not establish saturation. Pay particular attention to:

- unrecorded questions and side conversations
- source switching and evidence gathering
- moments when the practitioner changes the design rather than the wording
- negotiations over scope, risk, metrics, and approval
- handoff loss between design, code, localization, and production
- rework caused by missing product facts or late review

### Phase 4: Diary study

Begin with 10 to 15 practitioners logging content decisions for two working weeks, then assess diary completeness, missing strata, and whether two successive review batches add new decision types. A lightweight entry should capture trigger, surface, user need, evidence, collaborators, decision, uncertainty, approval, implementation location, and outcome.

This can reveal small, frequent decisions that interviews underreport.

### Phase 5: Concept and trust testing

Test proposed `CONTENT.md`, evidence, plan, diff, and review artifacts with builders and content practitioners. Evaluate:

- whether the artifact reflects their mental model
- what they believe is authoritative
- whether uncertainty and risk are visible
- which recommendations feel justified
- whether review is faster than doing the work manually
- whether rejected suggestions improve future behavior safely

## Interview prompts

- Tell me about the last time someone asked you to “write the copy.” What did you do before writing?
- What would have gone wrong if you had simply rewritten the words?
- Which facts were essential? Where did they come from? Which source won when sources disagreed?
- What did you change outside the string itself?
- Which terms were controlled, sensitive, localized, or legally reviewed?
- What event or user state was evidenced, what cognitive or emotional load was reasonably foreseeable, and how did that alter tone without claiming to know an individual's emotion?
- Which artifacts helped the team decide or remember?
- Where did the approved content live, and where did it drift?
- How was implementation checked in design, code, localization, and production?
- What evidence changed your mind?
- What work is repetitive enough to automate? What judgment would you not delegate?
- What would an agent need to show before you trusted it to make a change?

## Analysis method

- Code transcripts and artifact observations against the foundational research questions.
- Develop a codebook with definitions and counterexamples; have at least two researchers independently code a meaningful subset, discuss disagreement, revise the codebook, and retain consequential disagreement rather than reporting only a single consensus code.
- Keep a reflexivity log covering researcher assumptions, professional background, product thesis, and moments when interpretation changed.
- Report recruitment channels, refusals, attrition, missing groups, organizational self-selection, and other sampling bias.
- Separate frequency from consequence: a rare high-risk decision may deserve more control than a common low-risk one.
- Compare documented process with observed process.
- Identify stable cross-domain structures and domain-specific extensions.
- Actively seek and record negative cases where a proposed common rule fails; preserve minority and domain-specific structures rather than forcing thematic saturation.
- Convert validated recurring decisions into candidate schema fields or workflow steps.
- Convert failure cases into benchmark fixtures.

## Ethics and handling

- Obtain informed consent and permission for recording or artifact review.
- Compensate participants fairly for time and specialist expertise, and document when organizational policy prevents payment.
- Provide accessible recruitment, consent, interview, diary, and withdrawal routes; ask about accommodations without requiring disclosure of diagnosis.
- Do not collect customer data, secrets, unpublished product strategy, controlled legal text, or personally identifying information unless a separately approved research protocol requires it.
- Redact organizations, products, users, and proprietary strings from shared notes.
- Define collection minimization, encryption, access roles, storage location, retention period, deletion schedule, and breach/escalation handling before recruitment.
- Explain any transcription service, AI/model processing, cross-border transfer, subprocessor, and future benchmark use separately; obtain specific consent rather than treating recording consent as model-processing consent.
- Give participants a practical withdrawal and deletion window and explain what cannot be withdrawn after de-identification or aggregate publication.
- Stop and escalate sensitive artifacts involving customer data, legal privilege, security vulnerabilities, safeguarding, clinical data, or imminent harm under a separately approved protocol.
- Separate participant report, researcher observation, and researcher inference.
- Let participants review attributed claims before publication.

## Minimum validation threshold

Do not call the eventual workflow representative of professional practice based on desk research alone. Before stabilizing a public v1 ontology, seek:

- multiple practitioners from at least six materially different domains
- both individual contributors and content leaders
- practitioners working outside US-only English contexts
- accessibility and localization specialists
- at least 50 mapped content decisions drawn from at least 12 recent projects or tasks, spanning the required domains and contexts
- at least three of those tasks observed end to end, with the remainder permitted to use artifact-backed reconstruction
- explicit review of the proposed evidence, governing-instrument, ownership, approval, and escalation model

This is a starting threshold for model validation, not a claim of global representativeness.
