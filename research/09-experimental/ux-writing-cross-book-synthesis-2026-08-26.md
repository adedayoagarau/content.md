---
title: UX-writing cross-book synthesis
status: synthesis-complete-proposal-only
updated: 2026-08-26
corpus_cutoff: Six user-supplied books; 1,574 bounded records
implementation_authority: none
---

# UX-writing cross-book synthesis

## Scope and authority

This synthesis covers the six user-supplied books that have complete page-addressable ledgers and disposition audits:

| Book ID | Work | Records | Distinctive contribution |
|---|---|---:|---|
| `BOOK-UXW-001` | Torrey Podmajersky, *Strategic Writing for UX*, 2nd ed. | 86 | Strategy-to-string workflow, measurement, operational maturity, AI-era practice |
| `BOOK-UXW-002` | Michael J. Metts and Andy Welfle, *Writing Is Designing* | 95 | Writing as design, stress cases, inclusion, organizational practice |
| `BOOK-UXW-003B` | Kinneret Yifrah, *Microcopy: The Complete Guide*, 2nd ed. | 378 | Detailed interface situations, motivation/action/feedback/recovery patterns |
| `BOOK-UXW-004` | Tham, Howard, and Verhulsdonck, *UX Writing: Designing User-Centered Content* | 272 | Integrated curriculum across research, genres, analytics, structured authoring, and AI |
| `BOOK-UXW-005` | Erika Hall, *Conversational Design* | 155 | Pragmatics, temporal turns, cooperation, role, repair, collaborative process |
| `BOOK-UXW-006` | Janice Redish, *Letting Go of the Words*, 2nd ed. | 588 | Task-oriented web content, hierarchy, links, media, review, and testing |

Total: **1,574 bounded source-position records**. Each record separates locator, documented practitioner position, candidate implication, boundary, and promotion status.

This is the completed **supplied-book corpus**, not every book named in the acquisition plan. Sarah Richards’s *Content Design*, Scott Kubie’s *Writing for Designers*, and Carrie Hane and Mike Atherton’s *Designing Connected Content* remain `needed-full-text`; no claim is attributed to them here. Their absence particularly limits corroboration for user-needs practice, assignment/delivery workflow, and formal connected-content modeling.

The books provide practitioner evidence. They do not authorize product facts, law, policy, accessibility conformance, security behavior, privacy practice, locale decisions, publication, mutation, model training, or automatic enforcement. Current primary standards, repository evidence, organization-approved records, domain authority, locale expertise, affected-user research, and runtime validation remain controlling.

## Convergent competency map

### 1. Frame the problem before drafting

All six works reject an isolated-string starting point. The request must establish:

- person or population, purpose, situation, prior effort, and desired outcome;
- organization purpose and any conflicts with user or public outcomes;
- surface, channel, modality, component, journey stage, and runtime state;
- known facts, authoritative sources, missing facts, assumptions, and prohibited inference;
- actions, prerequisites, permissions, material consequences, reversibility, and recovery;
- risk, vulnerability, affected parties, locale, accessibility, and operational capacity.

**Transfer decision:** retain as a hard request-completeness gate when a missing input could change truth, consequence, consent, safety, accessibility, authorization, or recovery. Treat lower-risk stylistic gaps as explicit unknowns rather than invented context.

### 2. Treat meaning and expression as separate but connected layers

The corpus converges on a semantic sequence:

`source evidence → proposition → message intent → interaction contract → channel expression → rendered behavior → observed outcome`

Voice, tone, terminology, mechanics, layout, icons, sound, motion, and character are expressions. They cannot change actor, fact, certainty, commitment, option set, consequence, destination, state, or remedy without a new semantic decision.

**Transfer decision:** require semantic invariants and an expression-to-meaning diff for every candidate. Style evaluation runs only after truth, state, safety, accessibility structure, and product behavior pass.

### 3. Design the whole temporal interaction

Across the books, UX writing covers more than labels:

- introduction and identity;
- orientation, scope, navigation, and resumption;
- choice, input, action, confirmation, and commitment;
- loading, progress, queued, pending, partial, and completion states;
- guidance, help, disclosure, and reference;
- warning, prevention, error, denial, empty, offline, and unavailable states;
- recovery, retry, undo, escalation, appeal, correction, and closure;
- notification, handoff, re-entry, expiry, retention, and archive.

**Transfer decision:** represent interaction state and allowed transitions explicitly. A candidate string without its predecessor, current state, action effect, result state, and recovery is incomplete for consequential tasks.

### 4. Make claims, actors, and responsibility explicit

The works repeatedly use grammar as interaction diagnosis: subjects, verbs, objects, pronouns, voice, modality, and links reveal who acts and what happens.

**Transfer decision:** each candidate must identify:

- speaker/operator and whether the turn is human, deterministic, generated, retrieved, or hybrid;
- user actor, delegate, subject, recipient, owner, affected party, and accountable organization where distinct;
- claim source, confidence, scope, currency, qualification, and correction route;
- action actor/object/effect and responsible recovery owner.

No “we,” “I,” “you,” “your,” “my,” assistant, advisor, partner, or expert role is allowed without a resolved referent and authority.

### 5. Preserve real agency

The corpus supports explicit choices, understandable actions, relevant defaults, reversibility, and respectful exits. It also contains commercial persuasion and engagement advice that must be constrained.

**Transfer decision:** require option provenance, material alternatives, ordering rationale, equal refusal where consent is involved, inspect/edit/decline/reset/revoke/undo/appeal/escalate controls, and successful exit. Reject:

- illusory control;
- hidden commitment or cost;
- guilt, shame, urgency, scarcity, or relational pressure without factual authority;
- conversion, retention, habit, or engagement as sufficient user benefit;
- promotion that interrupts task completion or necessary-service access.

### 6. Treat error and recovery as product behavior

All six books converge on non-blaming, specific, contextual recovery. The combined model expands fault attribution beyond user error.

**Transfer decision:** type failures by origin and state:

- input/validation;
- permissions/authentication;
- eligibility/policy;
- conflict/concurrency;
- network/dependency;
- service/capacity;
- data/model/inference;
- transaction unknown/partial/duplicate;
- content/source/currency;
- organization/human handling;
- security/privacy/safety incident.

Every consequential failure candidate needs what happened, what is known and unknown, preserved work, safe next action, retry safety, alternative route, human support, timing, and remedy. Tone never substitutes for restoration or incident handling.

### 7. Govern voice and situational tone

The books agree that voice should be coherent and tone context-sensitive. They disagree in degree about personality, humor, warmth, and human likeness.

**Transfer decision:** integrate with the repository’s existing voice/tone model:

- stable organization voice is evidence-linked and approved;
- tone derives from state, consequence, responsibility, certainty, urgency, agency, prior effort, power, channel, locale, and evidenced context;
- personality, character, humor, idiom, emoji, and audible affect are optional expression layers;
- systems need not be gendered or personified;
- automation, operator, capability, data use, and human recourse remain explicit;
- no system claims feelings, consciousness, empathy, listening, understanding, friendship, or professional authority it cannot substantiate.

### 8. Design for accessibility and localization as meaning preservation

Every book touches accessibility or global use, but none supplies a complete current standard. Several contain dated or overly narrow advice.

**Transfer decision:** require:

- canonical meaning and material-information parity across locales and modes;
- source locale, target locale, jurisdiction, reading direction, expansion, grammar, morphology, terminology, pronunciation, and cultural authority;
- programmatic name, role, state, value, relationship, live announcement, focus, keyboard, speech, captions, transcript, audio description, motion, contrast, zoom/reflow, and fallback as applicable;
- disabled-participant and in-market review for consequential patterns;
- no inference that plain language or alt text alone proves accessibility;
- no universal English word-count, casing, punctuation, reading-level, or tone rule.

### 9. Operate content through lineage and lifecycle

The corpus converges on research, drafting, review, implementation, measurement, and maintenance rather than one-time copy delivery.

**Transfer decision:** preserve:

`request → evidence → assumptions → candidates → rationale → evaluation → decision → approval → implementation → build → release → observation → finding → correction/retirement`

Every record needs owner, status, scope, version, locale, dependencies, effective/expiry dates, conflicts, approvals, and disposition. Generated output never becomes a fact, policy, voice rule, or learning example by use alone.

### 10. Evaluate hard constraints before preferences

The books propose many useful evaluation dimensions but also weak proxies and arbitrary scoring. The repository already implements a hard-before-soft approach.

**Transfer decision:** evaluation order is:

1. authority and evidence sufficiency;
2. factual and semantic fidelity;
3. product-state and action accuracy;
4. safety, legality/domain authority, privacy, security, consent, nondiscrimination;
5. accessibility and localization structure;
6. material information, agency, consequence, recovery, and remedy;
7. comprehension, findability, task success, and outcome evidence;
8. terminology, voice, tone, concision, coherence, scannability, and distinctiveness.

Failure on planes 1–6 prevents stylistic scoring from selecting or legitimizing a candidate. Preferences do not compensate for hard failure.

## Contradiction-preserving pattern matrix

| Topic | Useful convergence | Material disagreement or risk | Transfer decision |
|---|---|---|---|
| Conversation | Cooperation, turn clarity, relevance, repair | Can imply reciprocity, listening, relationship, or personhood | Retain as interaction diagnostic; prohibit deceptive agency claims |
| Personality | Consistent role and behavior aid prediction | Some books imply every system needs or inevitably has one | Optional; accountable identity and operational consistency precede personality |
| Brevity | Remove avoidable work and layer detail | Word counts, shortness, and “less is more” can delete material information | Optimize sufficient information for task and risk; no universal length target |
| Plain language | Concrete, familiar, direct language often aids comprehension | Familiarity varies; specialist and legal terms may be necessary | Preserve governed terms and explanations; validate with intended populations |
| User language | Research vocabulary, questions, tasks, and mental models | Mimicry, stereotypes, personas-as-truth, privacy, sample-size folklore | Store evidence and population scope; personas/scenarios remain hypotheses |
| Positive tone | Warmth may reduce distance | Positivity can trivialize denial, grief, loss, debt, illness, or system fault | Tone follows state and consequence; truth and remedy precede reassurance |
| Humor | Can support recognition or relieve low-stakes tension | Culture, repetition, disability, offense, manipulation, high-stakes harm | Optional, tested, removable; prohibited in defined high-risk contexts |
| Persuasion | Explain value and next action | Conversion and engagement framing can authorize coercion | Permit truthful benefit explanation; enforce equal refusal and anti-coercion controls |
| Choice reduction | Timely options reduce work | Menus hide alternatives and encode provider power | Require option provenance, missing-path analysis, and escape/escalation |
| Personalization | Stored context can reduce recall and repetition | Surveillance, sensitive inference, shared devices, stale or wrong profiles | Purpose-specific, inspectable, correctable, revocable, minimized memory only |
| Error prevention | Constraints, validation, confirmation, undo | Overconstraint rejects valid diversity; confirmation fatigue | Risk-proportionate prevention with valid exception and accessible recovery paths |
| Delight/habit | Feedback can teach mastery | Retention, variable reward, compulsion, and novelty fatigue | Measure intentional benefit, regret, and ability to stop; no habit optimization default |
| Read aloud | Reveals cadence and awkward phrasing | Sometimes presented as cross-mode proof | Craft check only; never accessibility or speech-runtime assurance |
| Real-time collaboration | Earlier exchange reduces handoff loss | Synchronous defaults exclude and weaken records | Require participation parity across synchronous/asynchronous modes and decision lineage |
| AI assistance | Useful for candidates, transformation, and scale | Fabrication, rights, privacy, prompt injection, automation bias, labor impact | Typed task, bounded inputs/tools, provenance, evaluation, human authority, nonuse option |

## Evidence-strength classification

### Hard constraints

Only when independently supported by current governing or repository evidence:

- do not invent product state, fact, policy, authority, source, or capability;
- preserve material information and semantic invariants;
- do not declare success, failure, charge, deletion, publication, delivery, or safety without authoritative state;
- do not recommend unsafe retry when outcome may be unknown;
- provide operable recovery for consequential blocked or failed states;
- keep automation/operator identity and responsibility truthful;
- honor current accessibility, privacy, security, legal/domain, consent, and locale requirements;
- abstain or escalate when missing evidence could materially change the result.

Books corroborate the direction but cannot independently make these executable rules.

### Contextual heuristics

- begin with purpose and user question;
- prefer concrete actors, verbs, objects, and consequences;
- use familiar terms and predictive labels;
- layer information by moment and risk;
- keep action labels specific;
- preserve input and support repair;
- make status, waiting, and next steps visible;
- adapt tone to state and consequence;
- test first use, repetition, interruption, and adverse contexts;
- use concept, temporal script, and spatial representation together.

These require context, counterexample testing, and human judgment.

### Organization-specific practices

- voice dimensions, character, humor, preferred terminology, mechanics;
- review and approval workflow;
- notification strategy and channel mix;
- content ownership and operating model;
- measurement targets and maturity model;
- collaboration tools and meeting practices.

These require organization evidence and approval and never become generic defaults.

### Hypotheses and open questions

- emotional effects of particular words or punctuation;
- causal effects on conversion, trust, loyalty, support cost, or retention;
- universal scanning, memory, attention, or choice behavior;
- benefit of personality, anthropomorphism, or conversational form;
- cross-cultural equivalence of humor, warmth, informality, or transcreation;
- adequacy of current probabilistic models for broad natural-language interaction.

## Competency and method map

| Competency | Required method evidence | Candidate outputs | Escalation trigger |
|---|---|---|---|
| Problem framing | user purpose, organization purpose, affected parties, risk, scope | request brief, open questions, non-goals | purpose conflict or missing material facts |
| Content research | protocol, population, consent, observations, analysis, limitations | vocabulary evidence, task/question map, findings | unrepresented high-consequence population |
| Semantic modeling | authoritative concepts, entities, relationships, states, policies | proposition set, term map, state model | conflicting sources or unclear authority |
| Interaction writing | journey state, action behavior, consequences, recovery | labels, guidance, status, errors, confirmations | backend behavior or state unknown |
| Information structure | user questions, hierarchy, routes, records, search evidence | headings, pathways, links, summaries, tables | required record or material detail would be lost |
| Voice and tone | approved voice, tone context, locale and role | expression variants and rationale | no approved voice or high-risk emotional context |
| Accessibility | semantic/runtime contract and disabled-user evidence | names, descriptions, announcements, alternatives | rendered behavior cannot be verified |
| Localization | canonical meaning, locale authority, terminology, jurisdiction | locale-ready source and localized candidates | legal/cultural/material parity unresolved |
| Evaluation | acceptance criteria, facts, state, tasks, guardrails, method | hard findings, advisory findings, abstention | hard plane unknown or failed |
| Operations | owner, approval, implementation, release, monitoring, correction | decision packet, lineage, rollback/retirement plan | no accountable owner or release authority |

## Evaluation and escalation criteria

### Deterministic candidates

Eligible only with approved scoped sources and machine-verifiable behavior:

- required fields and identifiers are present;
- action label maps to an exact state transition;
- known state is not contradicted;
- prohibited generic or duplicate labels in a defined component scope;
- approved terminology consistency;
- locale resource presence and explicit fallback policy;
- required recovery/action link presence;
- semantic invariant equality across known projections.

### Specialist-reviewed criteria

- legal, financial, medical, safety, policy, privacy, security, and regulated claims;
- locale and cultural adaptation;
- accessibility semantics and assistive behavior;
- sensitive identity terminology;
- high-risk warnings, denials, consent, and remedies;
- voice-character and stereotype review.

### Research-dependent criteria

- comprehension, interpretation, findability, decision quality, trust calibration;
- discoverability of available actions or capabilities;
- error recovery under stress or interruption;
- effects on affected and low-frequency high-consequence populations;
- notification welcome, timing, and actionability;
- conversational versus graphical modality fit.

### Preference-based criteria

- rhythm, charm, humor, warmth, distinctiveness, and aesthetic economy after all hard planes pass.

### Mandatory abstention or escalation

The capability must not draft a decision-ready candidate when any of the following could change meaning or harm:

- product state, action effect, charge, deletion, publication, recipient, timing, or reversibility is unknown;
- governing source, owner, operator, speaker, or policy authority is unresolved;
- user and organization goals materially conflict without a decision;
- consent, privacy, security, safety, accessibility, locale, or legal/domain requirement is missing;
- an error outcome is pending or unknown and retry could duplicate harm;
- a professional or human-like role would overstate authority or capability;
- localization would require inventing law, terminology, cultural effect, or material facts;
- available options omit a required right, alternative, appeal, or human route;
- the proposed output depends on unsupported emotional inference or sensitive profiling.

## Remaining evidence gaps

1. The three unsupplied core books remain unread; no page-level claims may be made from them.
2. The required Developer Index interface was unavailable during the later book studies, so current primary implementation contracts for focus, live announcements, notifications, speech, AI disclosure, and platform behavior must be refreshed before implementation.
3. Non-English-first design, RTL, morphology-heavy locales, speech recognition, AAC, captions, and in-market transcreation need stronger practitioner and user evidence.
4. Disabled-led evidence is still thinner than standards evidence, especially for cognitive disability, speech disability, low vision, switch access, and multimodal conversational systems.
5. High-risk domain examples need authority-reviewed synthetic scenarios for health, finance, government benefits, employment, education, safety, and identity.
6. Multi-actor, delegated, shared-account, household-device, subject/bystander, and worker experiences need explicit model testing.
7. Contemporary generative and agentic interfaces require current evidence for uncertainty, citations, tool state, confirmation, prompt injection, memory, delegation, and human handoff.

## Promotion decision

The six-book corpus is sufficient to propose structured UX-writing capability contracts and synthetic evaluation cases. It is **not** sufficient to activate new autonomous rewrite, publication, enforcement, provider-training, or learning-promotion behavior.

The next artifact is the implementation decision packet. It maps these findings to `@contentmd/schemas`, `@contentmd/writer`, `@contentmd/evaluation`, `@contentmd/agent`, and CLI surfaces and identifies which changes are safe proposal work versus which require new current authority or external verification.
